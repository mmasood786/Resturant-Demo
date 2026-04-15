/* ========================================
   SUPABASE CLIENT - GIFT CARD INTEGRATION
   ======================================== */

// Initialize Supabase client
let supabaseClient = null;

function initSupabase() {
  if (typeof window.supabase === 'undefined') {
    console.error('Supabase SDK not loaded. Please include the Supabase CDN script.');
    return null;
  }

  if (supabaseClient) {
    return supabaseClient;
  }

  try {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('✅ Supabase client initialized');
    return supabaseClient;
  } catch (error) {
    console.error('❌ Failed to initialize Supabase:', error);
    return null;
  }
}

// ========================================
// GIFT CARD API FUNCTIONS
// ========================================

const GiftCardAPI = {
  
  /**
   * Validate a gift card code
   * @param {string} code - Gift card code (format: XXXX-XXXX-XXXX-XXXX)
   * @returns {Promise<Object>} Validation result
   */
  async validateGiftCard(code) {
    try {
      const supabase = initSupabase();
      if (!supabase) throw new Error('Supabase not initialized');

      // Call the database function
      const { data, error } = await supabase
        .rpc('validate_gift_card', { code: code.replace(/\s/g, '') });

      if (error) {
        console.error('Validation error:', error);
        throw error;
      }

      return data[0] || { is_valid: false, message: 'Invalid card' };
    } catch (error) {
      console.error('Error validating gift card:', error);
      throw error;
    }
  },

  /**
   * Get full gift card details with transaction history
   * @param {string} code - Gift card code
   * @returns {Promise<Object>} Card details
   */
  async getGiftCardDetails(code) {
    try {
      const supabase = initSupabase();
      if (!supabase) throw new Error('Supabase not initialized');

      const { data, error } = await supabase
        .rpc('get_gift_card_details', { code: code.replace(/\s/g, '') });

      if (error) {
        console.error('Error fetching card details:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching gift card details:', error);
      throw error;
    }
  },

  /**
   * Create a new gift card
   * @param {Object} cardData - Gift card data
   * @returns {Promise<Object>} Created card details
   */
  async createGiftCard(cardData) {
    try {
      const supabase = initSupabase();
      if (!supabase) throw new Error('Supabase not initialized');

      const {
        amount,
        buyerName,
        buyerEmail,
        buyerPhone,
        recipientName,
        recipientEmail,
        personalMessage
      } = cardData;

      const { data, error } = await supabase
        .rpc('create_gift_card', {
          amount: parseFloat(amount),
          buyer_name: buyerName || null,
          buyer_email: buyerEmail || null,
          buyer_phone: buyerPhone || null,
          recipient_name: recipientName || null,
          recipient_email: recipientEmail || null,
          message: personalMessage || null
        });

      if (error) {
        console.error('Error creating gift card:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error creating gift card:', error);
      throw error;
    }
  },

  /**
   * Redeem a gift card for an order
   * @param {string} code - Gift card code
   * @param {number} amount - Amount to redeem
   * @param {string} orderId - Order reference
   * @param {string} description - Description (optional)
   * @returns {Promise<Object>} Redemption result
   */
  async redeemGiftCard(code, amount, orderId, description = null) {
    try {
      const supabase = initSupabase();
      if (!supabase) throw new Error('Supabase not initialized');

      const { data, error } = await supabase
        .rpc('redeem_gift_card', {
          code: code.replace(/\s/g, ''),
          redeem_amount: parseFloat(amount),
          order_ref: orderId || null,
          description: description || `Redeemed for order ${orderId}`
        });

      if (error) {
        console.error('Error redeeming gift card:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error redeeming gift card:', error);
      throw error;
    }
  },

  /**
   * Get all gift cards (admin only)
   * @param {Object} filters - Filter options
   * @returns {Promise<Array>} List of gift cards
   */
  async getAllGiftCards(filters = {}) {
    try {
      const supabase = initSupabase();
      if (!supabase) throw new Error('Supabase not initialized');

      let query = supabase
        .from('gift_cards')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters.isActive !== undefined) {
        query = query.eq('is_active', filters.isActive);
      }

      if (filters.limit) {
        query = query.limit(filters.limit);
      }

      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + filters.limit - 1);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching gift cards:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching gift cards:', error);
      throw error;
    }
  },

  /**
   * Update a gift card (admin only)
   * @param {string} cardId - Card UUID
   * @param {Object} updates - Update data
   * @returns {Promise<Object>} Updated card
   */
  async updateGiftCard(cardId, updates) {
    try {
      const supabase = initSupabase();
      if (!supabase) throw new Error('Supabase not initialized');

      const { data, error } = await supabase
        .from('gift_cards')
        .update(updates)
        .eq('id', cardId)
        .select()
        .single();

      if (error) {
        console.error('Error updating gift card:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error updating gift card:', error);
      throw error;
    }
  },

  /**
   * Get gift card statistics (admin only)
   * @returns {Promise<Object>} Statistics
   */
  async getGiftCardStats() {
    try {
      const supabase = initSupabase();
      if (!supabase) throw new Error('Supabase not initialized');

      // Get total cards
      const { count: totalCount } = await supabase
        .from('gift_cards')
        .select('*', { count: 'exact', head: true });

      // Get active cards
      const { count: activeCount } = await supabase
        .from('gift_cards')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      // Get total balance outstanding
      const { data: balanceData } = await supabase
        .from('gift_cards')
        .select('balance')
        .eq('is_active', true);

      const totalBalance = balanceData?.reduce((sum, card) => sum + parseFloat(card.balance), 0) || 0;

      // Get transactions this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count: monthlyTransactions } = await supabase
        .from('gift_card_transactions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfMonth.toISOString());

      return {
        totalCards: totalCount || 0,
        activeCards: activeCount || 0,
        totalBalanceOutstanding: totalBalance,
        monthlyTransactions: monthlyTransactions || 0
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {
        totalCards: 0,
        activeCards: 0,
        totalBalanceOutstanding: 0,
        monthlyTransactions: 0
      };
    }
  },

  /**
   * Get transaction history for a specific card
   * @param {string} cardId - Card UUID
   * @returns {Promise<Array>} Transaction history
   */
  async getTransactionHistory(cardId) {
    try {
      const supabase = initSupabase();
      if (!supabase) throw new Error('Supabase not initialized');

      const { data, error } = await supabase
        .from('gift_card_transactions')
        .select('*')
        .eq('gift_card_id', cardId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  /**
   * Get gift card settings
   * @returns {Promise<Object>} Settings
   */
  async getSettings() {
    try {
      const supabase = initSupabase();
      if (!supabase) throw new Error('Supabase not initialized');

      const { data, error } = await supabase
        .from('gift_card_settings')
        .select('*');

      if (error) {
        console.error('Error fetching settings:', error);
        throw error;
      }

      // Convert to key-value object
      const settings = {};
      data.forEach(item => {
        settings[item.setting_key] = item.setting_value;
      });

      return settings;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  }
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Format gift card code for display
 * @param {string} code - Raw code
 * @returns {string} Formatted code
 */
function formatGiftCardCode(code) {
  const cleaned = code.replace(/[^0-9]/g, '');
  const matches = cleaned.match(/(\d{4})(\d{4})(\d{4})(\d{4})/);
  if (matches) {
    return `${matches[1]}-${matches[2]}-${matches[3]}-${matches[4]}`;
  }
  return code;
}

/**
 * Validate gift card code format
 * @param {string} code - Code to validate
 * @returns {boolean} Is valid format
 */
function isValidGiftCardFormat(code) {
  const cleaned = code.replace(/[\s-]/g, '');
  return /^\d{16}$/.test(cleaned);
}

/**
 * Generate WhatsApp message for gift card order
 * @param {Object} orderData - Order data
 * @returns {string} WhatsApp message
 */
function generateWhatsAppMessage(orderData) {
  const {
    amount,
    buyerName,
    buyerPhone,
    recipientName,
    personalMessage
  } = orderData;

  let message = `🎁 *GIFT CARD ORDER*\n\n`;
  message += `*Amount:* ${SUPABASE_CONFIG.giftCard.currencySymbol}${amount.toFixed(2)}\n`;
  message += `━━━━━━━━━━━━━━━━━━\n\n`;
  
  if (buyerName) {
    message += `*Purchased by:* ${buyerName}\n`;
  }
  if (buyerPhone) {
    message += `*Phone:* ${buyerPhone}\n`;
  }
  if (recipientName) {
    message += `\n*Recipient:* ${recipientName}\n`;
  }
  if (personalMessage) {
    message += `\n*Message:* ${personalMessage}\n`;
  }
  
  message += `\n━━━━━━━━━━━━━━━━━━\n`;
  message += `\nPlease process this gift card order. Thank you! 🙏`;
  
  return message;
}

/**
 * Send gift card order via WhatsApp
 * @param {Object} orderData - Order data
 */
function sendGiftCardOrderWhatsApp(orderData) {
  const message = generateWhatsAppMessage(orderData);
  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = SUPABASE_CONFIG.giftCard.whatsappNumber;
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  window.open(whatsappURL, '_blank');
}

// ========================================
// EXPORTS
// ========================================

// Make available globally for browser usage
if (typeof window !== 'undefined') {
  window.GiftCardAPI = GiftCardAPI;
  window.initSupabase = initSupabase;
  window.formatGiftCardCode = formatGiftCardCode;
  window.isValidGiftCardFormat = isValidGiftCardFormat;
  window.generateWhatsAppMessage = generateWhatsAppMessage;
  window.sendGiftCardOrderWhatsApp = sendGiftCardOrderWhatsApp;
}
