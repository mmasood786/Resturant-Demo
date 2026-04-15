/* ========================================
   GIFT CARD ADMIN PANEL
   ======================================== */

const GiftCardAdmin = {
  allGiftCards: [],
  allTransactions: [],
  
  init() {
    console.log('🎁 Gift Card Admin initialized');
    this.loadStats();
    this.loadGiftCards();
    this.bindEvents();
  },
  
  // ========================================
  // LOAD DATA
  // ========================================
  
  async loadStats() {
    try {
      const stats = await GiftCardAPI.getGiftCardStats();
      
      document.getElementById('statTotalCards').textContent = stats.totalCards;
      document.getElementById('statActiveCards').textContent = stats.activeCards;
      document.getElementById('statTotalBalance').textContent = 
        `${SUPABASE_CONFIG.giftCard.currencySymbol}${stats.totalBalanceOutstanding.toFixed(2)}`;
      document.getElementById('statMonthlyTxns').textContent = stats.monthlyTransactions;
      
    } catch (error) {
      console.error('Error loading stats:', error);
      // Set default values on error
      document.getElementById('statTotalCards').textContent = '0';
      document.getElementById('statActiveCards').textContent = '0';
      document.getElementById('statTotalBalance').textContent = '$0.00';
      document.getElementById('statMonthlyTxns').textContent = '0';
    }
  },
  
  async loadGiftCards() {
    try {
      const tbody = document.getElementById('giftcardsTableBody');
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 40px;">
            <div class="spinner" style="margin: 0 auto;"></div>
            <p style="margin-top: 15px; color: var(--gray-dark);">Loading gift cards...</p>
          </td>
        </tr>
      `;
      
      this.allGiftCards = await GiftCardAPI.getAllGiftCards();
      this.renderGiftCardsTable();
      
    } catch (error) {
      console.error('Error loading gift cards:', error);
      this.showToast('Failed to load gift cards', 'error');
    }
  },
  
  async loadTransactions() {
    try {
      // Get transactions for all cards (limited to recent 50)
      const recentTransactions = [];
      
      for (const card of this.allGiftCards.slice(0, 10)) {
        const txns = await GiftCardAPI.getTransactionHistory(card.id);
        recentTransactions.push(...txns.map(t => ({...t, card_code: card.card_code})));
      }
      
      // Sort by date and take top 50
      this.allTransactions = recentTransactions
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 50);
      
      this.renderTransactionsTable();
      
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  },
  
  // ========================================
  // RENDER TABLES
  // ========================================
  
  renderGiftCardsTable() {
    const tbody = document.getElementById('giftcardsTableBody');
    const searchTerm = document.getElementById('searchInput')?.value?.toLowerCase() || '';
    const filterStatus = document.getElementById('filterStatus')?.value || '';
    
    // Filter cards
    let filteredCards = this.allGiftCards;
    
    if (searchTerm) {
      filteredCards = filteredCards.filter(card => 
        card.card_code.toLowerCase().includes(searchTerm) ||
        (card.recipient_name && card.recipient_name.toLowerCase().includes(searchTerm)) ||
        (card.purchased_by_name && card.purchased_by_name.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filterStatus !== '') {
      filteredCards = filteredCards.filter(card => 
        card.is_active === (filterStatus === 'true')
      );
    }
    
    if (filteredCards.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 40px;">
            <p style="color: var(--gray-dark);">No gift cards found</p>
          </td>
        </tr>
      `;
      return;
    }
    
    let html = '';
    filteredCards.forEach(card => {
      const created = new Date(card.created_at).toLocaleDateString();
      const expires = card.expires_at ? new Date(card.expires_at).toLocaleDateString() : 'Never';
      const statusClass = card.is_active ? 'active' : 'inactive';
      const statusText = card.is_active ? 'Active' : 'Inactive';
      
      html += `
        <tr>
          <td><code style="font-family: monospace;">${card.card_code}</code></td>
          <td><strong>${SUPABASE_CONFIG.giftCard.currencySymbol}${parseFloat(card.balance).toFixed(2)}</strong></td>
          <td>${SUPABASE_CONFIG.giftCard.currencySymbol}${parseFloat(card.original_amount).toFixed(2)}</td>
          <td><span class="status-badge ${statusClass}">${statusText}</span></td>
          <td>${card.recipient_name || '-'}</td>
          <td>${card.purchased_by_name || '-'}</td>
          <td>${created}</td>
          <td>${expires}</td>
          <td>
            <div class="admin-actions">
              <button class="admin-btn admin-btn-toggle ${!card.is_active ? 'inactive' : ''}" 
                      onclick="GiftCardAdmin.toggleCardStatus('${card.id}', ${!card.is_active})">
                ${card.is_active ? 'Deactivate' : 'Activate'}
              </button>
              <button class="admin-btn admin-btn-delete" onclick="GiftCardAdmin.viewTransactions('${card.id}')">
                View Txns
              </button>
            </div>
          </td>
        </tr>
      `;
    });
    
    tbody.innerHTML = html;
    
    // Load transactions after rendering
    this.loadTransactions();
  },
  
  renderTransactionsTable() {
    const tbody = document.getElementById('transactionsTableBody');
    
    if (this.allTransactions.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 40px;">
            <p style="color: var(--gray-dark);">No transactions to display</p>
          </td>
        </tr>
      `;
      return;
    }
    
    let html = '';
    this.allTransactions.forEach(txn => {
      const date = new Date(txn.created_at).toLocaleString();
      const typeClass = txn.transaction_type;
      
      html += `
        <tr>
          <td>${date}</td>
          <td><code style="font-family: monospace;">${txn.card_code || 'N/A'}</code></td>
          <td><span class="transaction-type ${typeClass}">${txn.transaction_type}</span></td>
          <td><strong>${SUPABASE_CONFIG.giftCard.currencySymbol}${parseFloat(txn.amount).toFixed(2)}</strong></td>
          <td>${txn.description || '-'}</td>
        </tr>
      `;
    });
    
    tbody.innerHTML = html;
  },
  
  // ========================================
  // ACTIONS
  // ========================================
  
  async toggleCardStatus(cardId, newStatus) {
    try {
      await GiftCardAPI.updateGiftCard(cardId, { is_active: newStatus });
      this.showToast(`Gift card ${newStatus ? 'activated' : 'deactivated'}`, 'success');
      this.loadGiftCards();
      this.loadStats();
    } catch (error) {
      console.error('Error toggling status:', error);
      this.showToast('Failed to update status', 'error');
    }
  },
  
  viewTransactions(cardId) {
    // Find the card
    const card = this.allGiftCards.find(c => c.id === cardId);
    if (!card) return;
    
    alert(`Transactions for card ${card.card_code}:\n\n${JSON.stringify(
      this.allTransactions.filter(t => t.gift_card_id === cardId),
      null,
      2
    )}`);
  },
  
  async createGiftCard(formData) {
    const submitBtn = document.getElementById('formSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Creating...';
    
    try {
      const result = await GiftCardAPI.createGiftCard(formData);
      
      if (result.success) {
        this.showToast('Gift card created successfully!', 'success');
        this.closeModal();
        this.loadGiftCards();
        this.loadStats();
        
        // Show the created card code
        setTimeout(() => {
          alert(`✅ Gift Card Created Successfully!\n\nCard Code: ${result.card_code}\nAmount: ${SUPABASE_CONFIG.giftCard.currencySymbol}${result.balance}\n\nPlease save this code securely.`);
        }, 500);
      } else {
        throw new Error(result.message);
      }
      
    } catch (error) {
      console.error('Error creating gift card:', error);
      this.showToast(error.message || 'Failed to create gift card', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Create Gift Card';
    }
  },
  
  exportToCSV() {
    if (this.allGiftCards.length === 0) {
      this.showToast('No data to export', 'error');
      return;
    }
    
    // Create CSV content
    const headers = ['Code', 'Balance', 'Original Amount', 'Status', 'Recipient', 'Buyer', 'Created', 'Expires'];
    const rows = this.allGiftCards.map(card => [
      card.card_code,
      card.balance,
      card.original_amount,
      card.is_active ? 'Active' : 'Inactive',
      card.recipient_name || '',
      card.purchased_by_name || '',
      new Date(card.created_at).toLocaleDateString(),
      card.expires_at ? new Date(card.expires_at).toLocaleDateString() : 'Never'
    ]);
    
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(val => `"${val}"`).join(',') + '\n';
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gift-cards-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    this.showToast('CSV exported successfully!', 'success');
  },
  
  // ========================================
  // MODAL MANAGEMENT
  // ========================================
  
  openCreateModal() {
    const modal = document.getElementById('createModal');
    modal.classList.add('active');
    document.getElementById('modalTitle').textContent = 'Create Gift Card';
    document.getElementById('formSubmitBtn').textContent = 'Create Gift Card';
    document.getElementById('giftcardForm').reset();
  },
  
  closeModal() {
    const modal = document.getElementById('createModal');
    modal.classList.remove('active');
  },
  
  // ========================================
  // EVENT BINDINGS
  // ========================================
  
  bindEvents() {
    // Form submit
    const form = document.getElementById('giftcardForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
          amount: document.getElementById('formAmount').value,
          buyerName: document.getElementById('formBuyerName').value,
          buyerEmail: document.getElementById('formBuyerEmail').value,
          recipientName: document.getElementById('formRecipientName').value,
          recipientEmail: document.getElementById('formRecipientEmail').value,
          personalMessage: document.getElementById('formMessage').value
        };
        
        this.createGiftCard(formData);
      });
    }
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        this.renderGiftCardsTable();
      });
    }
    
    // Filter status
    const filterStatus = document.getElementById('filterStatus');
    if (filterStatus) {
      filterStatus.addEventListener('change', () => {
        this.renderGiftCardsTable();
      });
    }
    
    // Close modal on outside click
    const modal = document.getElementById('createModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    }
  },
  
  // ========================================
  // UTILITIES
  // ========================================
  
  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    } else {
      alert(message);
    }
  }
};

// Make globally accessible
window.GiftCardAdmin = GiftCardAdmin;
window.openCreateModal = () => GiftCardAdmin.openCreateModal();
window.closeModal = () => GiftCardAdmin.closeModal();
window.exportToCSV = () => GiftCardAdmin.exportToCSV();
