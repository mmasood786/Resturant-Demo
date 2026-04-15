-- ========================================
-- GIFT CARD SYSTEM - SUPABASE SETUP
-- ========================================
-- Run this SQL in your Supabase SQL Editor
-- ========================================

-- 1. GIFT CARDS TABLE
CREATE TABLE IF NOT EXISTS gift_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_code VARCHAR(16) UNIQUE NOT NULL,
  balance DECIMAL(10, 2) NOT NULL DEFAULT 0,
  original_amount DECIMAL(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  purchased_by_name VARCHAR(255),
  purchased_by_email VARCHAR(255),
  purchased_by_phone VARCHAR(50),
  recipient_name VARCHAR(255),
  recipient_email VARCHAR(255),
  personal_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  redeemed_at TIMESTAMP WITH TIME ZONE
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_gift_cards_code ON gift_cards(card_code);
CREATE INDEX IF NOT EXISTS idx_gift_cards_active ON gift_cards(is_active);
CREATE INDEX IF NOT EXISTS idx_gift_cards_created ON gift_cards(created_at);

-- 2. GIFT CARD TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS gift_card_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gift_card_id UUID NOT NULL REFERENCES gift_cards(id) ON DELETE CASCADE,
  transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('purchase', 'redeem', 'reload', 'refund')),
  amount DECIMAL(10, 2) NOT NULL,
  order_id VARCHAR(255),
  description TEXT,
  created_by VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_gc_transactions_card_id ON gift_card_transactions(gift_card_id);
CREATE INDEX IF NOT EXISTS idx_gc_transactions_type ON gift_card_transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_gc_transactions_created ON gift_card_transactions(created_at);

-- 3. GIFT CARD SETTINGS TABLE
CREATE TABLE IF NOT EXISTS gift_card_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO gift_card_settings (setting_key, setting_value, description) VALUES
  ('amounts', '{"preset": [25, 50, 100, 200], "min": 10, "max": 500}', 'Preset amounts and min/max limits') ON CONFLICT (setting_key) DO NOTHING,
  ('expiration', '{"enabled": false, "days": 365}', 'Expiration settings (enabled/disabled and days)') ON CONFLICT (setting_key) DO NOTHING,
  ('features', '{"allow_reload": true, "allow_partial_payment": true, "max_cards_per_order": 3}', 'Feature flags') ON CONFLICT (setting_key) DO NOTHING,
  ('design', '{"themes": ["classic", "modern", "festive"], "default_theme": "classic"}', 'Gift card design options') ON CONFLICT (setting_key) DO NOTHING;

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE gift_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_card_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_card_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC POLICIES (Anyone can check balance)
CREATE POLICY "Anyone can view active gift cards balance"
  ON gift_cards FOR SELECT
  USING (is_active = true);

-- Only authenticated users (admins) can create gift cards
CREATE POLICY "Authenticated users can create gift cards"
  ON gift_cards FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users (admins) can update gift cards
CREATE POLICY "Authenticated users can update gift cards"
  ON gift_cards FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Anyone can view transaction history for a specific card
CREATE POLICY "Anyone can view transactions with card code"
  ON gift_card_transactions FOR SELECT
  USING (true);

-- Only authenticated users can create transactions
CREATE POLICY "Authenticated users can create transactions"
  ON gift_card_transactions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Anyone can view settings
CREATE POLICY "Anyone can view settings"
  ON gift_card_settings FOR SELECT
  USING (true);

-- Only authenticated users can update settings
CREATE POLICY "Authenticated users can update settings"
  ON gift_card_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ========================================
-- DATABASE FUNCTIONS
-- ========================================

-- Function to generate unique gift card code
CREATE OR REPLACE FUNCTION generate_gift_card_code()
RETURNS VARCHAR(16) AS $$
DECLARE
  new_code VARCHAR(16);
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate random 16-digit code (format: XXXX-XXXX-XXXX-XXXX)
    new_code := LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0') || '-' ||
                LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0') || '-' ||
                LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0') || '-' ||
                LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM gift_cards WHERE card_code = new_code) INTO code_exists;
    
    -- Exit loop if code is unique
    EXIT WHEN NOT code_exists;
  END LOOP;
  
  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Function to validate gift card
CREATE OR REPLACE FUNCTION validate_gift_card(code VARCHAR)
RETURNS TABLE (
  is_valid BOOLEAN,
  message TEXT,
  balance DECIMAL,
  is_active BOOLEAN,
  expires_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
  card_record RECORD;
BEGIN
  -- Find the card
  SELECT * INTO card_record FROM gift_cards WHERE card_code = code;
  
  -- Card not found
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 'Invalid gift card code', 0::DECIMAL, false, NULL::TIMESTAMP WITH TIME ZONE;
    RETURN;
  END IF;
  
  -- Card is inactive
  IF NOT card_record.is_active THEN
    RETURN QUERY SELECT false, 'This gift card has been deactivated', 0::DECIMAL, false, card_record.expires_at;
    RETURN;
  END IF;
  
  -- Card is expired
  IF card_record.expires_at IS NOT NULL AND card_record.expires_at < NOW() THEN
    RETURN QUERY SELECT false, 'This gift card has expired', card_record.balance, false, card_record.expires_at;
    RETURN;
  END IF;
  
  -- Card is valid
  RETURN QUERY SELECT true, 'Valid gift card', card_record.balance, true, card_record.expires_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to redeem gift card
CREATE OR REPLACE FUNCTION redeem_gift_card(
  code VARCHAR,
  redeem_amount DECIMAL,
  order_ref VARCHAR DEFAULT NULL,
  description TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  card_record RECORD;
  new_balance DECIMAL;
  result JSONB;
BEGIN
  -- Find the card
  SELECT * INTO card_record FROM gift_cards WHERE card_code = code AND is_active = true;
  
  -- Card not found or inactive
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'message', 'Invalid or inactive gift card');
  END IF;
  
  -- Check if expired
  IF card_record.expires_at IS NOT NULL AND card_record.expires_at < NOW() THEN
    RETURN jsonb_build_object('success', false, 'message', 'This gift card has expired');
  END IF;
  
  -- Check sufficient balance
  IF card_record.balance < redeem_amount THEN
    RETURN jsonb_build_object(
      'success', false, 
      'message', 'Insufficient balance',
      'available_balance', card_record.balance
    );
  END IF;
  
  -- Calculate new balance
  new_balance := card_record.balance - redeem_amount;
  
  -- Update card balance
  UPDATE gift_cards 
  SET balance = new_balance,
      redeemed_at = CASE WHEN new_balance = 0 THEN NOW() ELSE redeemed_at END
  WHERE id = card_record.id;
  
  -- Record transaction
  INSERT INTO gift_card_transactions (
    gift_card_id, 
    transaction_type, 
    amount, 
    order_id, 
    description
  ) VALUES (
    card_record.id, 
    'redeem', 
    redeem_amount, 
    order_ref, 
    COALESCE(description, 'Redeemed for order ' || order_ref)
  );
  
  -- Return success
  result := jsonb_build_object(
    'success', true,
    'message', 'Gift card redeemed successfully',
    'redeemed_amount', redeem_amount,
    'remaining_balance', new_balance,
    'card_code', code
  );
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create gift card
CREATE OR REPLACE FUNCTION create_gift_card(
  amount DECIMAL,
  buyer_name VARCHAR DEFAULT NULL,
  buyer_email VARCHAR DEFAULT NULL,
  buyer_phone VARCHAR DEFAULT NULL,
  recipient_name VARCHAR DEFAULT NULL,
  recipient_email VARCHAR DEFAULT NULL,
  message TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  new_code VARCHAR(16);
  new_card_id UUID;
  expiration_date TIMESTAMP WITH TIME ZONE;
  exp_setting JSONB;
  exp_days INTEGER;
  exp_enabled BOOLEAN;
BEGIN
  -- Get expiration settings
  SELECT setting_value INTO exp_setting 
  FROM gift_card_settings 
  WHERE setting_key = 'expiration';
  
  exp_enabled := COALESCE((exp_setting->>'enabled')::BOOLEAN, false);
  exp_days := COALESCE((exp_setting->>'days')::INTEGER, 365);
  
  -- Calculate expiration date
  IF exp_enabled THEN
    expiration_date := NOW() + (exp_days || ' days')::INTERVAL;
  ELSE
    expiration_date := NULL;
  END IF;
  
  -- Generate unique code
  new_code := generate_gift_card_code();
  
  -- Create gift card
  INSERT INTO gift_cards (
    card_code,
    balance,
    original_amount,
    purchased_by_name,
    purchased_by_email,
    purchased_by_phone,
    recipient_name,
    recipient_email,
    personal_message,
    expires_at
  ) VALUES (
    new_code,
    amount,
    amount,
    buyer_name,
    buyer_email,
    buyer_phone,
    recipient_name,
    recipient_email,
    message,
    expiration_date
  ) RETURNING id INTO new_card_id;
  
  -- Record transaction
  INSERT INTO gift_card_transactions (
    gift_card_id,
    transaction_type,
    amount,
    description
  ) VALUES (
    new_card_id,
    'purchase',
    amount,
    'Gift card purchased' || COALESCE(' by ' || buyer_name, '')
  );
  
  -- Return success with card details
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Gift card created successfully',
    'card_code', new_code,
    'balance', amount,
    'expires_at', expiration_date
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get gift card details with transaction history
CREATE OR REPLACE FUNCTION get_gift_card_details(code VARCHAR)
RETURNS JSONB AS $$
DECLARE
  card_record RECORD;
  transactions JSONB;
  validation_result RECORD;
BEGIN
  -- Validate card first
  SELECT * INTO validation_result FROM validate_gift_card(code);
  
  -- Get card details
  SELECT * INTO card_record 
  FROM gift_cards 
  WHERE card_code = code;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'message', 'Gift card not found');
  END IF;
  
  -- Get transaction history
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', t.id,
      'type', t.transaction_type,
      'amount', t.amount,
      'description', t.description,
      'order_id', t.order_id,
      'created_at', t.created_at
    ) ORDER BY t.created_at DESC
  ) INTO transactions
  FROM gift_card_transactions t
  WHERE t.gift_card_id = card_record.id;
  
  RETURN jsonb_build_object(
    'success', true,
    'card_code', card_record.card_code,
    'balance', card_record.balance,
    'original_amount', card_record.original_amount,
    'is_active', card_record.is_active,
    'created_at', card_record.created_at,
    'expires_at', card_record.expires_at,
    'purchased_by_name', card_record.purchased_by_name,
    'recipient_name', card_record.recipient_name,
    'personal_message', card_record.personal_message,
    'transactions', COALESCE(transactions, '[]'::jsonb),
    'validation', validation_result
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- SAMPLE DATA (Optional - for testing)
-- ========================================

-- Insert 5 sample gift cards for testing
-- Uncomment the lines below if you want to test with sample data

/*
INSERT INTO gift_cards (card_code, balance, original_amount, is_active, purchased_by_name, recipient_name, personal_message, expires_at) VALUES
  ('1234-5678-9012-3456', 100.00, 100.00, true, 'Admin', 'John Doe', 'Happy Birthday! Enjoy your meal!', NOW() + INTERVAL '180 days'),
  ('2345-6789-0123-4567', 50.00, 50.00, true, 'Admin', 'Jane Smith', 'Thank you for your support!', NOW() + INTERVAL '365 days'),
  ('3456-7890-1234-5678', 200.00, 200.00, true, 'Admin', 'Mike Johnson', 'Merry Christmas!', NOW() + INTERVAL '90 days'),
  ('4567-8901-2345-6789', 25.00, 25.00, true, 'Admin', 'Sarah Williams', 'Enjoy!', NULL),
  ('5678-9012-3456-7890', 0.00, 75.00, false, 'Admin', 'Tom Brown', 'Fully redeemed', NOW() - INTERVAL '30 days');

-- Add sample transactions
INSERT INTO gift_card_transactions (gift_card_id, transaction_type, amount, order_id, description) 
SELECT id, 'purchase', original_amount, NULL, 'Sample gift card purchased' 
FROM gift_cards WHERE card_code IN ('1234-5678-9012-3456', '2345-6789-0123-4567', '3456-7890-1234-5678', '4567-8901-2345-6789');

INSERT INTO gift_card_transactions (gift_card_id, transaction_type, amount, order_id, description) 
SELECT id, 'redeem', 75.00, 'ORDER-001', 'Redeemed for order' 
FROM gift_cards WHERE card_code = '5678-9012-3456-7890';
*/

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check if tables were created successfully
-- SELECT COUNT(*) FROM gift_cards;
-- SELECT COUNT(*) FROM gift_card_transactions;
-- SELECT COUNT(*) FROM gift_card_settings;

-- View all gift cards
-- SELECT card_code, balance, original_amount, is_active, created_at, expires_at FROM gift_cards ORDER BY created_at DESC;

-- View all transactions
-- SELECT t.*, g.card_code FROM gift_card_transactions t JOIN gift_cards g ON t.gift_card_id = g.id ORDER BY t.created_at DESC;
