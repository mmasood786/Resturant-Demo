/* ========================================
   GIFT CARD SYSTEM - MAIN LOGIC
   ======================================== */

// ========================================
// GIFT CARD STATE MANAGEMENT
// ========================================

const GiftCardManager = {
  // Currently selected gift card amount
  selectedAmount: null,
  
  // Applied gift cards in cart
  appliedGiftCards: [],
  
  // Maximum gift cards per order
  maxCards: SUPABASE_CONFIG.giftCard.maxCardsPerOrder,
  
  // Initialize on DOM ready
  init() {
    console.log('🎁 Gift Card Manager initialized');
    this.loadAppliedGiftCards();
    this.bindEvents();
  },
  
  // ========================================
  // PURCHASE PAGE FUNCTIONS
  // ========================================
  
  /**
   * Select preset amount
   */
  selectPresetAmount(amount) {
    this.selectedAmount = parseFloat(amount);
    
    // Update UI
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.classList.remove('active');
      if (parseFloat(btn.dataset.amount) === amount) {
        btn.classList.add('active');
      }
    });
    
    // Clear custom amount
    const customInput = document.getElementById('customAmount');
    if (customInput) {
      customInput.value = '';
    }
    
    this.updatePreview();
  },
  
  /**
   * Set custom amount
   */
  setCustomAmount(amount) {
    amount = parseFloat(amount);
    
    const { minAmount, maxAmount } = SUPABASE_CONFIG.giftCard;
    
    if (amount < minAmount || amount > maxAmount) {
      this.showToast(`Amount must be between ${SUPABASE_CONFIG.giftCard.currencySymbol}${minAmount} and ${SUPABASE_CONFIG.giftCard.currencySymbol}${maxAmount}`, 'error');
      return;
    }
    
    this.selectedAmount = amount;
    
    // Clear preset selection
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    this.updatePreview();
  },
  
  /**
   * Update gift card preview
   */
  updatePreview() {
    const amountDisplay = document.getElementById('giftcardAmountDisplay');
    if (amountDisplay && this.selectedAmount) {
      amountDisplay.textContent = `${SUPABASE_CONFIG.giftCard.currencySymbol}${this.selectedAmount.toFixed(2)}`;
    }
  },
  
  /**
   * Validate purchase form
   */
  validatePurchaseForm() {
    const buyerName = document.getElementById('buyerName')?.value?.trim();
    const buyerEmail = document.getElementById('buyerEmail')?.value?.trim();
    const termsAccepted = document.getElementById('termsCheckbox')?.checked;
    
    if (!this.selectedAmount || this.selectedAmount <= 0) {
      this.showToast('Please select or enter a gift card amount', 'error');
      return false;
    }
    
    if (!buyerName) {
      this.showToast('Please enter your name', 'error');
      return false;
    }
    
    if (!termsAccepted) {
      this.showToast('Please accept the terms and conditions', 'error');
      return false;
    }
    
    return true;
  },
  
  /**
   * Process gift card purchase
   */
  async processPurchase() {
    if (!this.validatePurchaseForm()) {
      return;
    }
    
    const submitBtn = document.getElementById('purchaseSubmitBtn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Processing...';
    }
    
    try {
      const cardData = {
        amount: this.selectedAmount,
        buyerName: document.getElementById('buyerName')?.value?.trim(),
        buyerEmail: document.getElementById('buyerEmail')?.value?.trim(),
        buyerPhone: document.getElementById('buyerPhone')?.value?.trim(),
        recipientName: document.getElementById('recipientName')?.value?.trim(),
        recipientEmail: document.getElementById('recipientEmail')?.value?.trim(),
        personalMessage: document.getElementById('personalMessage')?.value?.trim()
      };
      
      // Try to create card in Supabase
      let result;
      try {
        result = await GiftCardAPI.createGiftCard(cardData);
        console.log('✅ Gift card created in Supabase:', result);
      } catch (dbError) {
        console.warn('⚠️ Supabase not available, using WhatsApp order:', dbError);
        // Fallback to WhatsApp order
        sendGiftCardOrderWhatsApp(cardData);
        this.showToast('Opening WhatsApp to complete your order...', 'info');
        
        setTimeout(() => {
          // Redirect to success with local data
          const successUrl = `giftcard-success.html?code=PENDING&amount=${this.selectedAmount}&method=whatsapp`;
          window.location.href = successUrl;
        }, 1500);
        return;
      }
      
      if (result.success) {
        this.showToast('Gift card created successfully!', 'success');
        
        // Redirect to success page
        setTimeout(() => {
          window.location.href = `giftcard-success.html?code=${encodeURIComponent(result.card_code)}&amount=${result.balance}`;
        }, 1000);
      } else {
        throw new Error(result.message || 'Failed to create gift card');
      }
      
    } catch (error) {
      console.error('❌ Purchase error:', error);
      this.showToast(error.message || 'Failed to create gift card. Please try again.', 'error');
      
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Complete Purchase';
      }
    }
  },
  
  // ========================================
  // BALANCE CHECK FUNCTIONS
  // ========================================
  
  /**
   * Check gift card balance
   */
  async checkBalance(code) {
    if (!code || code.trim().length < 16) {
      this.showToast('Please enter a valid gift card code', 'error');
      return;
    }
    
    const checkBtn = document.getElementById('checkBalanceBtn');
    if (checkBtn) {
      checkBtn.disabled = true;
      checkBtn.innerHTML = '<span class="spinner"></span> Checking...';
    }
    
    try {
      const details = await GiftCardAPI.getGiftCardDetails(code);
      
      if (details.success) {
        this.displayBalance(details);
      } else {
        this.displayBalanceError(details.message || 'Invalid gift card code');
      }
      
    } catch (error) {
      console.error('❌ Balance check error:', error);
      this.showToast('Failed to check balance. Please try again.', 'error');
      this.displayBalanceError('Unable to connect to server. Please try again later.');
    } finally {
      if (checkBtn) {
        checkBtn.disabled = false;
        checkBtn.innerHTML = 'Check Balance';
      }
    }
  },
  
  /**
   * Display balance result
   */
  displayBalance(details) {
    const resultContainer = document.getElementById('balanceResult');
    if (!resultContainer) return;
    
    const { currencySymbol } = SUPABASE_CONFIG.giftCard;
    
    let html = `
      <div class="balance-result valid">
        <div class="balance-result-header">
          <div class="balance-result-icon">✅</div>
          <div>
            <div class="balance-result-title">Valid Gift Card</div>
            <div style="color: var(--gray-dark); margin-top: 4px;">Code: ${details.card_code}</div>
          </div>
        </div>
        
        <div class="balance-details">
          <div class="balance-detail-item">
            <div class="balance-detail-label">Current Balance</div>
            <div class="balance-detail-value">${currencySymbol}${parseFloat(details.balance).toFixed(2)}</div>
          </div>
          <div class="balance-detail-item">
            <div class="balance-detail-label">Original Amount</div>
            <div class="balance-detail-value">${currencySymbol}${parseFloat(details.original_amount).toFixed(2)}</div>
          </div>
          ${details.expires_at ? `
          <div class="balance-detail-item">
            <div class="balance-detail-label">Expires On</div>
            <div class="balance-detail-value">${new Date(details.expires_at).toLocaleDateString()}</div>
          </div>
          ` : ''}
          ${details.recipient_name ? `
          <div class="balance-detail-item">
            <div class="balance-detail-label">Recipient</div>
            <div class="balance-detail-value">${details.recipient_name}</div>
          </div>
          ` : ''}
        </div>
    `;
    
    // Add transaction history if available
    if (details.transactions && details.transactions.length > 0) {
      html += `
        <div class="transaction-history">
          <h3>Transaction History</h3>
          <table class="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
      `;
      
      details.transactions.forEach(txn => {
        const date = new Date(txn.created_at).toLocaleDateString();
        const amount = `${currencySymbol}${parseFloat(txn.amount).toFixed(2)}`;
        
        html += `
          <tr>
            <td>${date}</td>
            <td><span class="transaction-type ${txn.type}">${txn.type}</span></td>
            <td><strong>${amount}</strong></td>
            <td>${txn.description || '-'}</td>
          </tr>
        `;
      });
      
      html += `
            </tbody>
          </table>
        </div>
      `;
    }
    
    html += `</div>`;
    
    resultContainer.innerHTML = html;
    resultContainer.style.display = 'block';
  },
  
  /**
   * Display balance error
   */
  displayBalanceError(message) {
    const resultContainer = document.getElementById('balanceResult');
    if (!resultContainer) return;
    
    resultContainer.innerHTML = `
      <div class="balance-result invalid">
        <div class="balance-result-header">
          <div class="balance-result-icon">❌</div>
          <div class="balance-result-title">Invalid Gift Card</div>
        </div>
        <p style="margin-top: 10px;">${message}</p>
      </div>
    `;
    resultContainer.style.display = 'block';
  },
  
  // ========================================
  // CART REDEMPTION FUNCTIONS
  // ========================================
  
  /**
   * Load applied gift cards from localStorage
   */
  loadAppliedGiftCards() {
    try {
      const stored = localStorage.getItem('appliedGiftCards');
      this.appliedGiftCards = stored ? JSON.parse(stored) : [];
    } catch (e) {
      this.appliedGiftCards = [];
    }
  },
  
  /**
   * Save applied gift cards to localStorage
   */
  saveAppliedGiftCards() {
    localStorage.setItem('appliedGiftCards', JSON.stringify(this.appliedGiftCards));
  },
  
  /**
   * Apply gift card to cart
   */
  async applyGiftCard(code) {
    if (!code || code.trim().length < 16) {
      this.showToast('Please enter a valid gift card code', 'error');
      return;
    }
    
    // Check if already applied
    if (this.appliedGiftCards.find(gc => gc.code === code)) {
      this.showToast('This gift card has already been applied', 'warning');
      return;
    }
    
    // Check max cards limit
    if (this.appliedGiftCards.length >= this.maxCards) {
      this.showToast(`Maximum ${this.maxCards} gift cards per order`, 'error');
      return;
    }
    
    const applyBtn = document.getElementById('applyGiftCardBtn');
    if (applyBtn) {
      applyBtn.disabled = true;
      applyBtn.innerHTML = '<span class="spinner"></span> Validating...';
    }
    
    try {
      const validation = await GiftCardAPI.validateGiftCard(code);
      
      if (!validation.is_valid) {
        this.showToast(validation.message || 'Invalid gift card', 'error');
        return;
      }
      
      if (validation.balance <= 0) {
        this.showToast('This gift card has no remaining balance', 'error');
        return;
      }
      
      // Add to applied cards
      this.appliedGiftCards.push({
        code: code,
        balance: validation.balance,
        expiresAt: validation.expires_at
      });
      
      this.saveAppliedGiftCards();
      this.renderAppliedGiftCards();
      this.updateCartTotal();
      
      this.showToast(`Gift card applied! Balance: ${SUPABASE_CONFIG.giftCard.currencySymbol}${validation.balance.toFixed(2)}`, 'success');
      
      // Clear input
      const input = document.getElementById('cartGiftCardInput');
      if (input) input.value = '';
      
    } catch (error) {
      console.error('❌ Apply gift card error:', error);
      this.showToast('Failed to validate gift card. Please try again.', 'error');
    } finally {
      if (applyBtn) {
        applyBtn.disabled = false;
        applyBtn.innerHTML = 'Apply';
      }
    }
  },
  
  /**
   * Remove gift card from cart
   */
  removeGiftCard(code) {
    this.appliedGiftCards = this.appliedGiftCards.filter(gc => gc.code !== code);
    this.saveAppliedGiftCards();
    this.renderAppliedGiftCards();
    this.updateCartTotal();
    this.showToast('Gift card removed', 'info');
  },
  
  /**
   * Get total gift card balance
   */
  getTotalGiftCardBalance() {
    return this.appliedGiftCards.reduce((sum, gc) => sum + gc.balance, 0);
  },
  
  /**
   * Render applied gift cards in cart
   */
  renderAppliedGiftCards() {
    const container = document.getElementById('appliedGiftCards');
    if (!container) return;
    
    if (this.appliedGiftCards.length === 0) {
      container.innerHTML = '';
      container.style.display = 'none';
      return;
    }
    
    container.style.display = 'block';
    
    let html = '';
    this.appliedGiftCards.forEach(gc => {
      html += `
        <div class="applied-giftcard">
          <div class="applied-giftcard-info">
            <div class="applied-giftcard-code">🎁 ${gc.code}</div>
            <div class="applied-giftcard-balance">Balance: ${SUPABASE_CONFIG.giftCard.currencySymbol}${gc.balance.toFixed(2)}</div>
          </div>
          <div class="applied-giftcard-amount">-${SUPABASE_CONFIG.giftCard.currencySymbol}${gc.balance.toFixed(2)}</div>
          <button class="applied-giftcard-remove" onclick="GiftCardManager.removeGiftCard('${gc.code}')" title="Remove">✕</button>
        </div>
      `;
    });
    
    container.innerHTML = html;
  },
  
  /**
   * Update cart total with gift card discount
   */
  updateCartTotal() {
    // This will be called from cart.html renderCartPage
    if (typeof updateCartTotalWithGiftCards === 'function') {
      updateCartTotalWithGiftCards(this.getTotalGiftCardBalance());
    }
  },
  
  /**
   * Process gift card redemption at checkout
   */
  async processCheckoutRedemption(orderId) {
    if (this.appliedGiftCards.length === 0) {
      return { success: true, message: 'No gift cards to redeem' };
    }
    
    const cartTotal = cart.getCartTotal();
    let remainingTotal = cartTotal;
    const results = [];
    
    for (const gc of this.appliedGiftCards) {
      if (remainingTotal <= 0) break;
      
      const redeemAmount = Math.min(gc.balance, remainingTotal);
      
      try {
        const result = await GiftCardAPI.redeemGiftCard(
          gc.code,
          redeemAmount,
          orderId,
          `Redeemed for order ${orderId}`
        );
        
        if (result.success) {
          results.push({
            code: gc.code,
            redeemed: redeemAmount,
            remaining: result.remaining_balance
          });
          remainingTotal -= redeemAmount;
        } else {
          console.error(`Failed to redeem ${gc.code}:`, result.message);
        }
      } catch (error) {
        console.error(`Error redeeming ${gc.code}:`, error);
      }
    }
    
    // Clear applied cards after successful redemption
    if (results.length > 0) {
      this.appliedGiftCards = [];
      this.saveAppliedGiftCards();
    }
    
    return {
      success: results.length > 0,
      results: results,
      remainingBalance: remainingTotal
    };
  },
  
  // ========================================
  // UI HELPERS
  // ========================================
  
  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    // Use existing toast system if available
    if (window.cart && window.cart.showToast) {
      window.cart.showToast(message);
    } else {
      // Fallback to alert
      alert(message);
    }
  },
  
  /**
   * Bind event listeners
   */
  bindEvents() {
    // Preset amount buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectPresetAmount(btn.dataset.amount);
      });
    });
    
    // Custom amount input
    const customInput = document.getElementById('customAmount');
    if (customInput) {
      customInput.addEventListener('input', (e) => {
        if (e.target.value) {
          this.setCustomAmount(e.target.value);
        }
      });
    }
    
    // Purchase form submit
    const purchaseForm = document.getElementById('giftcardPurchaseForm');
    if (purchaseForm) {
      purchaseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.processPurchase();
      });
    }
    
    // Balance check form
    const balanceForm = document.getElementById('balanceCheckForm');
    if (balanceForm) {
      balanceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = document.getElementById('giftCardCode')?.value;
        this.checkBalance(code);
      });
    }
    
    // Cart gift card apply
    const applyBtn = document.getElementById('applyGiftCardBtn');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        const code = document.getElementById('cartGiftCardInput')?.value;
        this.applyGiftCard(code);
      });
    }
  }
};

// ========================================
// CART INTEGRATION
// ========================================

/**
 * Update cart total with gift card discount
 * This function is called from cart.html
 */
function updateCartTotalWithGiftCards(giftCardBalance) {
  const subtotal = cart.getCartTotal();
  const delivery = subtotal > 40 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const giftCardDiscount = Math.min(giftCardBalance, subtotal + delivery + tax);
  const total = subtotal + delivery + tax - giftCardDiscount;
  
  // Update summary if on cart page
  const summaryContainer = document.querySelector('.cart-summary');
  if (summaryContainer && giftCardBalance > 0) {
    // Re-render with gift card line
    let html = summaryContainer.innerHTML;
    
    // Remove existing gift card line if present
    html = html.replace(/<div class="summary-row giftcard">.*?<\/div>/g, '');
    
    // Add gift card line before total
    const totalIndex = html.indexOf('class="summary-row total"');
    const giftCardLine = `<div class="summary-row giftcard"><span>🎁 Gift Cards</span><span style="color: var(--success);">-${SUPABASE_CONFIG.giftCard.currencySymbol}${giftCardDiscount.toFixed(2)}</span></div>`;
    
    html = html.substring(0, totalIndex) + giftCardLine + html.substring(totalIndex);
    
    // Update total
    html = html.replace(/<span>\$[\d.]+<\/span><\/div><\/div>$/, 
      `<span>${SUPABASE_CONFIG.giftCard.currencySymbol}${total.toFixed(2)}</span></div></div>`);
    
    summaryContainer.innerHTML = html;
  }
}

// ========================================
// INITIALIZATION
// ========================================

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  GiftCardManager.init();
  
  // Render applied gift cards if on cart page
  if (document.getElementById('appliedGiftCards')) {
    GiftCardManager.renderAppliedGiftCards();
  }
});

// Make globally accessible
window.GiftCardManager = GiftCardManager;
window.updateCartTotalWithGiftCards = updateCartTotalWithGiftCards;
