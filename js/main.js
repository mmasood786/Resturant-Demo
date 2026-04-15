/* ========================================
   RESTAURANT WEBSITE - MAIN JAVASCRIPT
   ======================================== */

// --- CART ---
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    loadCart() {
        try {
            const cart = localStorage.getItem('restaurantCart');
            return cart ? JSON.parse(cart) : [];
        } catch(e) { return []; }
    }

    saveCart() {
        localStorage.setItem('restaurantCart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(id, name, price, image) {
        const existing = this.items.find(i => i.id === id);
        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({ id, name, price: parseFloat(price), image, quantity: 1 });
        }
        this.saveCart();
        const message = typeof i18n !== 'undefined' ? i18n.t('common.item_added') : '✓ ' + name + ' added to cart!';
        this.showToast(message);
    }

    removeItem(id) {
        this.items = this.items.filter(i => i.id !== id);
        this.saveCart();
    }

    updateQuantity(id, qty) {
        const item = this.items.find(i => i.id === id);
        if (!item) return;
        if (qty <= 0) {
            this.removeItem(id);
        } else {
            item.quantity = qty;
            this.saveCart();
        }
    }

    getCartTotal() {
        return this.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    }

    getCartCount() {
        return this.items.reduce((sum, i) => sum + i.quantity, 0);
    }

    updateCartCount() {
        const count = this.getCartCount();
        document.querySelectorAll('#cartCount').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'inline-flex' : 'none';
        });
    }

    clearCart() {
        this.items = [];
        this.saveCart();
    }

    showToast(msg) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMessage');
        if (toast && toastMsg) {
            toastMsg.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
    }
}

const cart = new ShoppingCart();

// Make cart globally accessible
window.cart = cart;

// --- RENDER CART PAGE ---
function renderCartPage() {
    const container = document.getElementById('cartContainer');
    const emptyCart = document.getElementById('emptyCart');
    if (!container) return;

    if (cart.items.length === 0) {
        container.innerHTML = '';
        emptyCart.style.display = 'block';
        return;
    }

    emptyCart.style.display = 'none';

    let html = '<div class="cart-container">';
    html += '<div class="cart-items">';

    cart.items.forEach(item => {
        const total = (item.price * item.quantity).toFixed(2);
        html += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1}); renderCartPage();">−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1}); renderCartPage();">+</button>
                </div>
                <div class="cart-item-total">$${total}</div>
                <button class="cart-item-remove" onclick="cart.removeItem(${item.id}); renderCartPage();" aria-label="Remove ${item.name}">✕</button>
            </div>
        `;
    });

    const subtotal = cart.getCartTotal();
    const delivery = subtotal > 40 ? 0 : 4.99;
    const tax = subtotal * 0.08;
    const total = subtotal + delivery + tax;

    html += '</div>';
    html += '<div class="cart-summary">';
    html += '<h3>Order Summary</h3>';
    html += '<div class="summary-row"><span>Subtotal</span><span>$' + subtotal.toFixed(2) + '</span></div>';
    html += '<div class="summary-row"><span>Delivery</span><span>' + (delivery === 0 ? 'FREE' : '$' + delivery.toFixed(2)) + '</span></div>';
    html += '<div class="summary-row"><span>Tax (8%)</span><span>$' + tax.toFixed(2) + '</span></div>';
    
    // Gift card discount will be added here by GiftCardManager
    html += '<div id="giftCardDiscountLine"></div>';
    
    html += '<div class="summary-row total"><span>Total</span><span>$' + total.toFixed(2) + '</span></div>';

    if (delivery > 0) {
        html += '<p style="font-size:0.85rem;color:var(--success);margin-top:12px;">🚚 Add $' + (40 - subtotal).toFixed(2) + ' more for FREE delivery!</p>';
    } else {
        html += '<p style="font-size:0.85rem;color:var(--success);margin-top:12px;">✓ FREE delivery included!</p>';
    }

    // Add gift card section
    html += '<div class="cart-giftcard-section">';
    html += '<h3>🎁 Apply Gift Card</h3>';
    html += '<div class="cart-giftcard-input">';
    html += '<input type="text" id="cartGiftCardInput" placeholder="Enter gift card code" maxlength="19">';
    html += '<button id="applyGiftCardBtn" onclick="GiftCardManager.applyGiftCard(document.getElementById(\'cartGiftCardInput\').value)">Apply</button>';
    html += '</div>';
    html += '<div id="appliedGiftCards" class="applied-giftcards" style="display: none;"></div>';
    html += '</div>';

    html += '<button class="btn btn-primary btn-lg" onclick="cart.showToast(\'Checkout coming soon!\')">Proceed to Checkout</button>';
    html += '<button class="btn btn-lg" style="background:#25D366;color:white;margin-top:12px;" onclick="orderOnWhatsApp()">📱 Order on WhatsApp</button>';
    html += '<a href="menu.html" class="btn btn-outline mt-2" style="display:block;text-align:center;">Continue Ordering</a>';
    html += '</div></div>';

    container.innerHTML = html;
    
    // Initialize gift card manager after HTML is rendered
    if (typeof GiftCardManager !== 'undefined') {
        GiftCardManager.renderAppliedGiftCards();
    }
}

// --- INIT ON DOM READY ---
document.addEventListener('DOMContentLoaded', function() {

    // Render cart page if on cart page
    if (document.getElementById('cartContainer')) {
        renderCartPage();
    }

    // NOTE: Language selector is handled by i18n.js

    // --- FLIP CARD CLICK HANDLER ---
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't flip if clicking add to cart button
            if (e.target.closest('.flip-add-btn') || e.target.closest('.flip-add-btn-back')) return;
            this.classList.toggle('flipped');
        });
    });

    // --- ADD TO CART FROM FLIP CARDS ---
    document.querySelectorAll('.flip-add-btn, .flip-add-btn-back').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.flip-card');
            const id = parseInt(card.dataset.id);
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);
            const image = card.dataset.image;

            cart.addItem(id, name, price, image);

            // Visual feedback
            const originalText = this.textContent;
            this.textContent = '✓ Added!';
            this.style.background = 'var(--success)';
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 1200);
        });
    });

    // --- HEADER SCROLL ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- MOBILE MENU ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- BACK TO TOP ---
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- MENU CATEGORY FILTER ---
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const cat = this.dataset.category;

            document.querySelectorAll('.menu-section').forEach(section => {
                if (cat === 'all' || section.dataset.section === cat) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    // --- RESERVATION FORM ---
    const resForm = document.getElementById('reservationForm');
    if (resForm) {
        const dateInput = document.getElementById('date');
        if (dateInput) {
            dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
        }
        resForm.addEventListener('submit', function(e) {
            e.preventDefault();
            this.style.display = 'none';
            const success = document.getElementById('reservationSuccess');
            if (success) success.style.display = 'block';
        });
    }

    // --- CONTACT FORM ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            this.style.display = 'none';
            const success = document.getElementById('contactSuccess');
            if (success) success.style.display = 'block';
        });
    }

    console.log('🍣 Restaurant website loaded!');
});

// --- WHATSAPP ORDER FUNCTIONALITY ---
function orderOnWhatsApp() {
    const phone = '+15551234567'; // Restaurant WhatsApp number
    let message = '';

    // If on cart page and cart has items
    if (cart.items.length > 0) {
        const subtotal = cart.getCartTotal();
        const delivery = subtotal > 40 ? 0 : 4.99;
        const tax = subtotal * 0.08;
        const total = subtotal + delivery + tax;

        message = `🍣 *NEW ORDER*\n\n`;
        message += `*Order Details:*\n`;
        message += `━━━━━━━━━━━━━━━━━━\n`;
        
        cart.items.forEach((item, index) => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            message += `${index + 1}. ${item.name}\n`;
            message += `   Qty: ${item.quantity} × $${item.price.toFixed(2)} = $${itemTotal}\n`;
        });
        
        message += `━━━━━━━━━━━━━━━━━━\n`;
        message += `\n*Subtotal:* $${subtotal.toFixed(2)}`;
        message += `\n*Delivery:* ${delivery === 0 ? 'FREE ✓' : '$' + delivery.toFixed(2)}`;
        message += `\n*Tax (8%):* $${tax.toFixed(2)}`;
        message += `\n*TOTAL: $${total.toFixed(2)}*\n\n`;
        message += `*Delivery Address:*\n[Please enter your address]\n\n`;
        message += `*Delivery/Pickup:* [Please specify]\n`;
        message += `*Preferred Time:* [Please specify]\n\n`;
        message += `Thank you! 🙏`;
    } else {
        // General inquiry message
        message = `🍣 *INQUIRY*\n\n`;
        message += `Hi! I'd like to place an order.\n\n`;
        message += `*Name:* [Your name]\n`;
        message += `*Order Details:* [Please describe your order]\n\n`;
        message += `Thank you! 🙏`;
    }

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');
}

// WhatsApp button click handler
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            orderOnWhatsApp();
        });
    }
});
