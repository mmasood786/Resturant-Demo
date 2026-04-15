/* ========================================
   SUPABASE CONFIGURATION TEMPLATE
   ========================================
   IMPORTANT: Replace the placeholder values below with your actual Supabase credentials.
   
   HOW TO GET YOUR SUPABASE CREDENTIALS:
   1. Go to https://supabase.com and create/sign in to your account
   2. Create a new project or select existing one
   3. Go to Project Settings > API
   4. Copy the following:
      - Project URL (under "Project URL")
      - anon/public key (under "Project API keys")
   
   HOW TO USE:
   1. Rename this file to "supabase-config.js" (remove -template)
   2. Replace the placeholder values with your actual credentials
   3. Save the file
   ======================================== */

const SUPABASE_CONFIG = {
  // Your Supabase project URL (format: https://xxxxx.supabase.co)
  url: 'YOUR_SUPABASE_PROJECT_URL',
  
  // Your Supabase anon/public key
  anonKey: 'YOUR_SUPABASE_ANON_KEY',
  
  // Gift Card Settings (customize these as needed)
  giftCard: {
    // Preset amounts for quick selection
    presetAmounts: [25, 50, 100, 200],
    
    // Minimum and maximum gift card amounts
    minAmount: 10,
    maxAmount: 500,
    
    // Default currency symbol
    currencySymbol: '$',
    
    // Currency code (for API integrations)
    currencyCode: 'USD',
    
    // Enable expiration
    enableExpiration: false,
    
    // Expiration period in days (only if enableExpiration is true)
    expirationDays: 365,
    
    // Allow reloading gift cards
    allowReload: true,
    
    // Maximum number of gift cards per order
    maxCardsPerOrder: 3,
    
    // WhatsApp number for order notifications (with country code, no + or spaces)
    // Example: 15551234567 for +1 (555) 123-4567
    whatsappNumber: '15551234567'
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SUPABASE_CONFIG;
}
