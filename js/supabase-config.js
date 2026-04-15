/* ========================================
   SUPABASE CONFIGURATION
   ========================================
   IMPORTANT: Update these values with your Supabase credentials!
   
   GET YOUR CREDENTIALS:
   1. Go to https://supabase.com
   2. Create/sign in to your project
   3. Go to Project Settings > API
   4. Copy Project URL and anon/public key
   ======================================== */

const SUPABASE_CONFIG = {
  // Your Supabase project URL (format: https://xxxxx.supabase.co)
  url: 'https://YOUR_PROJECT_ID.supabase.co',
  
  // Your Supabase anon/public key
  anonKey: 'YOUR_ANON_KEY_HERE',
  
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
