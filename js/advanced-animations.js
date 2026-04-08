/* ========================================
   RESTAURANT WEBSITE - ADVANCED ANIMATIONS
   Conversion-Optimized Effects
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- CUSTOM CURSOR (Desktop Only) ---
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX - 3 + 'px';
            cursorDot.style.top = mouseY - 3 + 'px';
        });
        
        // Smooth cursor follow
        function animateCursor() {
            const speed = 0.15;
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effect on interactive elements
        const hoverElements = document.querySelectorAll('a, button, .dish-card, .feature-card, .testimonial-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
    
    // --- SCROLL PROGRESS BAR ---
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
    
    // --- FLOATING PARTICLES (Sushi Emojis) ---
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    const emojis = ['🍣', '🍱', '🥢', '🍙', '🍤', '🐟', '✨', '🌸'];
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 20000);
    }
    
    // Create initial particles
    for (let i = 0; i < 8; i++) {
        setTimeout(createParticle, i * 500);
    }
    
    // Continuously create particles
    setInterval(createParticle, 2500);
    
    // --- HERO TITLE ANIMATION (smooth fade-in, no line break issues) ---
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Ensure the title is already visible with proper line breaks from HTML
        // Just add a subtle fade-up animation
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // --- MAGNETIC BUTTON EFFECT ---
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    magneticButtons.forEach(btn => {
        btn.classList.add('magnetic-btn');
        
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            btn.style.setProperty('--mouse-x', (x / rect.width * 100) + '%');
            btn.style.setProperty('--mouse-y', (y / rect.height * 100) + '%');
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / centerX * 8;
            const moveY = (y - centerY) / centerY * 8;
            
            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
    
    // --- RIPPLE EFFECT ON BUTTON CLICK ---
    document.querySelectorAll('.btn, .add-to-cart').forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // --- SPOTLIGHT EFFECT ON CARDS ---
    document.querySelectorAll('.dish-card, .menu-item').forEach(card => {
        card.classList.add('spotlight');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--spotlight-x', x + 'px');
            card.style.setProperty('--spotlight-y', y + 'px');
        });
    });
    
    // --- TILT EFFECT ON FEATURE CARDS ---
    document.querySelectorAll('.feature-card, .value-card').forEach(card => {
        card.classList.add('tilt-card');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // --- COUNTDOWN TIMER (Urgency) ---
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const countdownHTML = `
            <div style="margin-top: 30px; color: rgba(255,255,255,0.9);">
                <p style="margin-bottom: 8px; font-size: 0.95rem;">⏰ Limited Offer: Free Delivery ends in:</p>
            </div>
        `;
        heroSection.querySelector('.hero-content').insertAdjacentHTML('beforeend', countdownHTML);
        
        const countdownContainer = document.createElement('div');
        countdownContainer.className = 'countdown-timer';
        countdownContainer.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number" id="hours">00</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number" id="minutes">00</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number" id="seconds">00</span>
                <span class="countdown-label">Seconds</span>
            </div>
        `;
        heroSection.querySelector('.hero-content').appendChild(countdownContainer);
        
        // Set countdown to 6 hours from now
        let countdownEnd = new Date();
        countdownEnd.setHours(countdownEnd.getHours() + 6);
        
        function updateCountdown() {
            const now = new Date();
            const diff = countdownEnd - now;
            
            if (diff <= 0) {
                // Reset countdown
                countdownEnd = new Date();
                countdownEnd.setHours(countdownEnd.getHours() + 6);
                return;
            }
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // --- FLOATING CTA BUTTON (Removed) ---
    // The floating 'Order Now' button has been removed to avoid overlap with WhatsApp and chatbot
    
    // --- SOCIAL PROOF POPUP ---
    const socialProofData = [
        { name: 'Sarah K.', action: 'ordered Dragon Roll', time: '2 minutes ago', initials: 'SK' },
        { name: 'Mike R.', action: 'reserved a table for 4', time: '5 minutes ago', initials: 'MR' },
        { name: 'Jennifer L.', action: 'ordered Rainbow Roll', time: '8 minutes ago', initials: 'JL' },
        { name: 'David C.', action: 'left a 5-star review', time: '12 minutes ago', initials: 'DC' },
        { name: 'Emily T.', action: 'ordered Tonkotsu Ramen', time: '15 minutes ago', initials: 'ET' }
    ];
    
    let popupIndex = 0;
    const socialPopup = document.createElement('div');
    socialPopup.className = 'social-proof-popup';
    document.body.appendChild(socialPopup);
    
    function showSocialProof() {
        const data = socialProofData[popupIndex % socialProofData.length];
        
        socialPopup.innerHTML = `
            <div class="avatar">${data.initials}</div>
            <div class="content">
                <h4>${data.name}</h4>
                <p>${data.action} • ${data.time}</p>
            </div>
            <button class="close-btn" onclick="this.parentElement.classList.remove('show')">×</button>
        `;
        
        setTimeout(() => socialPopup.classList.add('show'), 100);
        
        setTimeout(() => {
            socialPopup.classList.remove('show');
        }, 5000);
        
        popupIndex++;
    }
    
    // Show first popup after 8 seconds, then every 20 seconds
    setTimeout(() => {
        showSocialProof();
        setInterval(showSocialProof, 20000);
    }, 8000);
    
    // --- AUTO-ROTATING TESTIMONIAL CAROUSEL ---
    const testimonialGrid = document.querySelector('.testimonials-grid');
    if (testimonialGrid && window.innerWidth <= 768) {
        const testimonials = testimonialGrid.querySelectorAll('.testimonial-card');
        
        // Wrap in carousel structure
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'testimonial-carousel';
        testimonialGrid.parentNode.insertBefore(carouselContainer, testimonialGrid);
        carouselContainer.appendChild(testimonialGrid);
        testimonialGrid.className = 'carousel-track';
        
        testimonials.forEach(slide => {
            slide.classList.add('carousel-slide');
            slide.style.minWidth = '100%';
        });
        
        // Add carousel dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        carouselContainer.appendChild(dotsContainer);
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        let currentSlide = 0;
        function goToSlide(index) {
            currentSlide = index;
            testimonialGrid.style.transform = `translateX(-${index * 100}%)`;
            
            document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Auto-rotate every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            goToSlide(currentSlide);
        }, 5000);
    }
    
    // --- ANIMATED NUMBER COUNTERS ---
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    function animateCounter(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasK = text.includes('K');
        const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
        
        let current = 0;
        const increment = numericValue / 60;
        const duration = 2000;
        const stepTime = duration / 60;
        
        element.classList.add('counter-animate', 'counting');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
                setTimeout(() => element.classList.remove('counting'), 300);
            }
            
            let displayValue = Math.floor(current);
            if (hasK) displayValue = (current / 1000).toFixed(0) + 'K';
            if (hasPlus) displayValue += '+';
            
            element.textContent = displayValue;
        }, stepTime);
    }
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => counterObserver.observe(stat));
    
    // --- IMAGE REVEAL ON SCROLL ---
    document.querySelectorAll('.intro-image, .about-image').forEach(img => {
        img.classList.add('image-reveal');
    });
    
    // --- STAGGER ANIMATION FOR GRID ITEMS ---
    const gridItems = document.querySelectorAll('.dishes-grid .dish-card, .features-grid .feature-card, .values-grid .value-card');
    gridItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
    
    // --- SMOOTH PAGE TRANSITIONS ---
    document.querySelectorAll('a[href^="http"], a[href$=".html"]').forEach(link => {
        if (link.href.includes(window.location.hostname) || link.href.startsWith('http') === false) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && !href.startsWith('#') && !this.target) {
                    e.preventDefault();
                    
                    const transition = document.createElement('div');
                    transition.className = 'page-transition';
                    document.body.appendChild(transition);
                    transition.classList.add('active');
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        }
    });
    
    // --- CONFETTI ON ADD TO CART ---
    function createConfetti() {
        const colors = ['#E94560', '#F5A623', '#1A1A2E', '#FF6B81', '#FFD700'];
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }
    
    // Trigger confetti on first add to cart
    let confettiTriggered = false;
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!confettiTriggered) {
                confettiTriggered = true;
                createConfetti();
            }
        });
    });
    
    // --- URGENCY BANNER (Top of page) ---
    const urgencyBanner = document.createElement('div');
    urgencyBanner.className = 'urgency-banner';
    urgencyBanner.innerHTML = '🔥 <strong>Flash Sale:</strong> 20% OFF your first order! Use code: <strong>SUSHI20</strong>';
    document.body.insertBefore(urgencyBanner, document.body.firstChild);

    // Adjust header position for urgency banner
    const header = document.getElementById('header');
    if (header) {
        header.style.top = '44px';
    }
    
    // Adjust hero section for urgency banner
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.paddingTop = '44px';
    }
    
    // --- SMOOTH SECTION DIVIDERS ---
    const sectionDividers = document.querySelectorAll('.section');
    sectionDividers.forEach((section, index) => {
        if (index > 0) {
            const divider = document.createElement('div');
            divider.className = 'section-divider';
            section.parentNode.insertBefore(divider, section);
        }
    });
    
    // --- PARALLAX SCROLLING FOR SECTIONS ---
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.intro-image, .about-image');
        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const scrollPercent = rect.top / window.innerHeight;
            el.style.transform = `translateY(${scrollPercent * 30}px)`;
        });
    });
    
    // --- TEXT SPLIT ANIMATION FOR HEADINGS ---
    document.querySelectorAll('.section-title').forEach(heading => {
        const words = heading.textContent.split(' ');
        heading.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const wordSpans = entry.target.querySelectorAll('.word');
                    wordSpans.forEach((word, index) => {
                        setTimeout(() => {
                            word.style.opacity = '1';
                            word.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heading);
    });
    
    // --- CART BADGE BOUNCE ANIMATION ---
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const originalUpdateCartCount = cart.updateCartCount;
        cart.updateCartCount = function() {
            originalUpdateCartCount.call(this);
            cartCount.classList.add('bounce-in');
            setTimeout(() => cartCount.classList.remove('bounce-in'), 800);
        };
    }
    
    // --- FORM FIELD ANIMATIONS ---
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // --- LAZY REVEAL ON SCROLL (Non-blocking, content visible by default) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .zoom-in, .rotate-in');
    
    // Elements are already visible (CSS sets opacity:1), just add subtle animation on scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // --- GRADIENT TEXT ANIMATION FOR HERO ---
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        heroBadge.classList.add('float');
    }
    
    // --- MICRO-INTERACTION: Like Heart on Menu Items ---
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('dblclick', function(e) {
            const heart = document.createElement('span');
            heart.textContent = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = e.clientX - 15 + 'px';
            heart.style.top = e.clientY - 15 + 'px';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'slideUp 1s ease forwards';
            heart.style.zIndex = '100';
            this.style.position = 'relative';
            this.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1000);
        });
    });
    
    // --- DYNAMIC DISCOUNT POPUP (After 30 seconds) ---
    setTimeout(() => {
        const hasSeenDiscount = localStorage.getItem('sushiDiscountPopup');
        if (!hasSeenDiscount) {
            const discountPopup = document.createElement('div');
            discountPopup.className = 'social-proof-popup';
            discountPopup.innerHTML = `
                <div class="avatar" style="font-size: 1.5rem;">🎁</div>
                <div class="content">
                    <h4>Wait! Special Offer</h4>
                    <p>Get 15% OFF your first order. Use code: WARRIOR15</p>
                </div>
                <button class="close-btn" onclick="this.parentElement.classList.remove('show')">×</button>
            `;
            document.body.appendChild(discountPopup);
            
            setTimeout(() => discountPopup.classList.add('show'), 100);
            localStorage.setItem('sushiDiscountPopup', 'true');
            
            setTimeout(() => {
                discountPopup.classList.remove('show');
            }, 8000);
        }
    }, 30000);
    
    // --- KEYBOARD SHORTCUT (Press 'C' for Cart) ---
    document.addEventListener('keydown', function(e) {
        if (e.key === 'c' || e.key === 'C') {
            if (!e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                window.location.href = 'cart.html';
            }
        }
    });
    
    // --- PAGE LOAD SUCCESS MESSAGE ---
    console.log('%c🍣 Restaurant Website', 'font-size: 24px; font-weight: bold; color: #E94560;');
    console.log('%cWelcome! All animations loaded successfully.', 'font-size: 14px; color: #1A1A2E;');
    console.log('%cPro tip: Press "C" to quickly open your cart!', 'font-size: 12px; color: #F5A623;');
    
});

// --- SMOOTH SCROLL PERFORMANCE OPTIMIZATION ---
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // All scroll-based animations run here for better performance
            ticking = false;
        });
        ticking = true;
    }
});

// --- PRELOAD CRITICAL RESOURCES ---
window.addEventListener('load', function() {
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = 'style';
        document.head.appendChild(link);
    });
});

// ========================================
// DARK MODE TOGGLE
// ========================================
function initDarkMode() {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'dark-mode-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
    
    // Check for saved preference or default to light
    const savedTheme = localStorage.getItem('sushiTheme');
    const isDark = savedTheme === 'dark';
    
    toggleBtn.textContent = isDark ? '🌙' : '☀️';
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Add to navigation menu (inside nav-menu, not nav)
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.appendChild(toggleBtn);
    }
    
    toggleBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('sushiTheme', newTheme);
        this.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        
        // Fun rotation animation
        this.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
        
        console.log(`🌓 Switched to ${newTheme} mode`);
    });
    
    // Keyboard shortcut: Press 'D' for dark mode
    document.addEventListener('keydown', function(e) {
        if ((e.key === 'd' || e.key === 'D') && !e.ctrlKey && !e.metaKey) {
            if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                toggleBtn.click();
            }
        }
    });
}

// Initialize dark mode
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
    initDarkMode();
}

// ========================================
// 3D FLIP MENU CARDS
// (Handled in main.js now)
// ========================================

// ========================================
// AI CHATBOT WIDGET
// ========================================
function initChatbot() {
    const chatbotData = {
        greetings: [
            "Konnichiwa! 🍣 How can I help you today?",
            "Welcome! What can I assist you with?",
            "Hi there! Ready to order some amazing sushi?"
        ],

        responses: {
            hours: "⏰ We're open:\n• Mon-Thu: 11AM-10PM\n• Fri-Sat: 11AM-11PM\n• Sunday: 12PM-9PM",
            location: "📍 We're at 123 Main Street, Your City. Free parking available!",
            menu: "🍱 Check out our full menu! We have sushi rolls, sashimi, ramen, appetizers & desserts. What sounds good?",
            delivery: "🚀 We deliver in 30 mins or less! Free delivery on orders over $40. Order now!",
            reservations: "📅 You can book a table right here on our site! Just visit the Reservations page.",
            vegetarian: "🌱 Yes! We have amazing veggie rolls, tempura, edamame, and vegetable ramen. All fresh and delicious!",
            allergies: "⚠️ We take allergies seriously! Please mention any allergies when ordering or booking. We can accommodate most requests.",
            omakase: "👨‍🍳 Our Omakase (chef's choice) is available Thu-Sat. Limited guests. Book early!",
            catering: "🎉 Yes! We cater events and parties. Email us at info@yourrestaurant.com for custom quotes.",
            payment: "💳 We accept all major cards, Apple Pay, Google Pay, and cash.",
            discount: "🎁 Ask about our current promotions when you call or order!",
            bestseller: "🏆 Our signature rolls and sashimi are customer favorites! Try them if you haven't yet.",
            help: "I can help with:\n• Hours & Location\n• Menu recommendations\n• Delivery info\n• Reservations\n• Dietary options\n• Catering\nJust ask!",
            thanks: "You're welcome! 😊 Enjoy your meal!",
            bye: "See you soon! 👋 We look forward to serving you!"
        },
        
        suggestions: [
            "📍 Location",
            "⏰ Hours",
            "🍱 Menu",
            "🚀 Delivery",
            "👨‍🍳 Omakase",
            "🎁 Discounts"
        ]
    };
    
    // Create chat widget
    const widget = document.createElement('div');
    widget.className = 'chatbot-widget';
    widget.innerHTML = `
        <button class="chatbot-toggle" aria-label="Toggle chat">
            <span class="chat-icon">💬</span>
            <span class="close-icon" style="display: none;">✕</span>
        </button>
        <div class="chatbot-window">
            <div class="chat-header">
                <div class="chat-header-info">
                    <h4>🍣 Sushi Assistant</h4>
                    <p class="chat-status">Online • Replies instantly</p>
                </div>
                <button class="chat-close" aria-label="Close chat">✕</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-suggestions"></div>
            <div class="chat-input-container">
                <input type="text" class="chat-input" placeholder="Type your message..." />
                <button class="chat-send" aria-label="Send message">➤</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(widget);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        /* CHATBOT STYLES */
        .chatbot-widget {
            position: fixed;
            bottom: 100px;
            right: 30px;
            z-index: 9999;
        }

        .chatbot-toggle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--secondary), #FF6B81);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.6rem;
            box-shadow: 0 8px 32px rgba(233, 69, 96, 0.4);
            transition: var(--transition);
            animation: none;
        }

        .chatbot-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 40px rgba(233, 69, 96, 0.6);
        }
        
        .chatbot-window {
            position: absolute;
            bottom: 75px;
            right: 0;
            width: 360px;
            max-height: 550px;
            background: var(--white);
            border-radius: var(--radius-lg);
            box-shadow: 0 16px 64px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            overflow: hidden;
            animation: slideUp 0.4s ease;
        }
        
        .chatbot-window.open {
            display: flex;
        }
        
        .chat-header {
            background: linear-gradient(135deg, var(--primary), #16213E);
            color: var(--white);
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .chat-header h4 {
            margin: 0 0 4px 0;
            font-size: 1.1rem;
        }
        
        .chat-status {
            margin: 0;
            font-size: 0.8rem;
            opacity: 0.8;
        }
        
        .chat-close {
            background: none;
            border: none;
            color: var(--white);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            max-height: 300px;
            background: var(--gray-light);
        }
        
        .chat-message {
            margin-bottom: 12px;
            animation: slideUp 0.3s ease;
        }
        
        .chat-message.bot {
            display: flex;
            gap: 8px;
        }
        
        .chat-message.bot .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--secondary), var(--accent));
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-size: 0.9rem;
        }
        
        .chat-message .bubble {
            background: var(--white);
            padding: 12px 16px;
            border-radius: 16px;
            border-top-left-radius: 4px;
            max-width: 80%;
            font-size: 0.9rem;
            line-height: 1.5;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        
        .chat-message.user {
            display: flex;
            justify-content: flex-end;
        }
        
        .chat-message.user .bubble {
            background: var(--secondary);
            color: var(--white);
            border-radius: 16px;
            border-top-right-radius: 4px;
            max-width: 80%;
            padding: 12px 16px;
        }
        
        .chat-suggestions {
            padding: 12px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            background: var(--white);
            border-top: 1px solid var(--gray);
        }
        
        .suggestion-btn {
            background: var(--gray-light);
            border: 1px solid var(--gray);
            padding: 8px 14px;
            border-radius: 50px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .suggestion-btn:hover {
            background: var(--secondary);
            color: var(--white);
            border-color: var(--secondary);
        }
        
        .chat-input-container {
            padding: 16px;
            display: flex;
            gap: 8px;
            background: var(--white);
            border-top: 1px solid var(--gray);
        }
        
        .chat-input {
            flex: 1;
            padding: 12px 16px;
            border: 2px solid var(--gray);
            border-radius: 50px;
            font-size: 0.9rem;
            outline: none;
            transition: var(--transition);
        }
        
        .chat-input:focus {
            border-color: var(--secondary);
        }
        
        .chat-send {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: var(--secondary);
            color: var(--white);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            transition: var(--transition);
        }
        
        .chat-send:hover {
            background: #D63A52;
            transform: scale(1.05);
        }
        
        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 12px 16px;
        }
        
        .typing-indicator span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--gray-dark);
            animation: typing 1.4s infinite;
        }
        
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
            30% { transform: translateY(-8px); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .chatbot-widget {
                bottom: 20px;
                right: 20px;
            }

            .chatbot-window {
                width: calc(100vw - 40px);
                max-height: 70vh;
                right: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Chatbot logic
    let isOpen = false;
    const toggle = widget.querySelector('.chatbot-toggle');
    const chatIcon = widget.querySelector('.chat-icon');
    const closeIcon = widget.querySelector('.close-icon');
    const window = widget.querySelector('.chatbot-window');
    const closeBtn = widget.querySelector('.chat-close');
    const messagesContainer = widget.querySelector('.chat-messages');
    const input = widget.querySelector('.chat-input');
    const sendBtn = widget.querySelector('.chat-send');
    const suggestionsContainer = widget.querySelector('.chat-suggestions');
    
    function toggleChat() {
        isOpen = !isOpen;
        window.classList.toggle('open', isOpen);
        chatIcon.style.display = isOpen ? 'none' : 'inline';
        closeIcon.style.display = isOpen ? 'inline' : 'none';
        
        if (isOpen && messagesContainer.children.length === 0) {
            // First open - send greeting
            const greeting = chatbotData.greetings[Math.floor(Math.random() * chatbotData.greetings.length)];
            addBotMessage(greeting);
            showSuggestions();
        }
        
        if (isOpen) {
            input.focus();
        }
    }
    
    function addBotMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message bot';
        msgDiv.innerHTML = `
            <div class="avatar">🍣</div>
            <div class="bubble">${text.replace(/\n/g, '<br>')}</div>
        `;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message user';
        msgDiv.innerHTML = `<div class="bubble">${text}</div>`;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="avatar">🍣</div>
            <div class="bubble">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function removeTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }
    
    function showSuggestions() {
        suggestionsContainer.innerHTML = '';
        chatbotData.suggestions.forEach(suggestion => {
            const btn = document.createElement('button');
            btn.className = 'suggestion-btn';
            btn.textContent = suggestion;
            btn.addEventListener('click', () => handleInput(suggestion));
            suggestionsContainer.appendChild(btn);
        });
    }
    
    function findResponse(input) {
        const lower = input.toLowerCase();
        
        for (const [key, response] of Object.entries(chatbotData.responses)) {
            if (lower.includes(key)) {
                return response;
            }
        }
        
        // Keyword matching
        if (lower.includes('open') || lower.includes('time') || lower.includes('close')) {
            return chatbotData.responses.hours;
        }
        if (lower.includes('where') || lower.includes('address') || lower.includes('find')) {
            return chatbotData.responses.location;
        }
        if (lower.includes('food') || lower.includes('eat') || lower.includes('order')) {
            return chatbotData.responses.menu;
        }
        if (lower.includes('book') || lower.includes('reserve') || lower.includes('table')) {
            return chatbotData.responses.reservations;
        }
        if (lower.includes('vegan') || lower.includes('veggie') || lower.includes('plant')) {
            return chatbotData.responses.vegetarian;
        }
        if (lower.includes('cheap') || lower.includes('deal') || lower.includes('coupon')) {
            return chatbotData.responses.discount;
        }
        if (lower.includes('recommend') || lower.includes('popular') || lower.includes('good')) {
            return chatbotData.responses.bestseller;
        }
        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
            return chatbotData.greetings[Math.floor(Math.random() * chatbotData.greetings.length)];
        }
        
        return "I'm not sure about that, but I'd love to help! Try asking about our menu, hours, delivery, or reservations. Or call us at (555) 012-3! 😊";
    }
    
    function handleInput(text) {
        if (!text.trim()) return;
        
        addUserMessage(text);
        suggestionsContainer.innerHTML = '';
        
        // Show typing indicator
        showTyping();
        
        // Simulate response delay
        setTimeout(() => {
            removeTyping();
            const response = findResponse(text);
            addBotMessage(response);
            
            // Show suggestions again after response
            setTimeout(showSuggestions, 500);
        }, 800 + Math.random() * 700);
        
        input.value = '';
    }
    
    // Event listeners
    toggle.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);
    
    sendBtn.addEventListener('click', () => handleInput(input.value));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleInput(input.value);
    });
    
    console.log('💬 Chatbot initialized');
}

// Initialize chatbot
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}

// ========================================
// BONUS ENHANCEMENTS
// ========================================

// --- Loading Skeleton Screens ---
function showLoadingSkeleton(selector) {
    const container = document.querySelector(selector);
    if (!container) return;
    
    for (let i = 0; i < 3; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton';
        skeleton.style.height = '200px';
        skeleton.style.borderRadius = 'var(--radius-md)';
        skeleton.style.marginBottom = '20px';
        container.appendChild(skeleton);
    }
}

// --- Konami Code Easter Egg ---
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Trigger confetti explosion!
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = ['#E94560', '#F5A623', '#FFD700', '#FF6B81'][Math.floor(Math.random() * 4)];
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
        
        showToast('🎉 You found the secret! Enjoy 25% OFF: KONAMI25');
        konamiCode = [];
    }
});

// --- Animated Hamburger Menu Icon ---
const hamburger = document.getElementById('menuToggle');
if (hamburger) {
    hamburger.style.position = 'relative';
    const spans = hamburger.querySelectorAll('span');
    
    hamburger.addEventListener('click', function() {
        spans[0].style.transform = this.classList.contains('active') 
            ? 'rotate(45deg) translate(6px, 6px)' 
            : '';
        spans[1].style.opacity = this.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = this.classList.contains('active') 
            ? 'rotate(-45deg) translate(6px, -6px)' 
            : '';
    });
}

// --- Progress on Add to Cart Buttons ---
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.classList.contains('btn')) {
            const originalText = this.textContent;
            this.textContent = '✓ Added!';
            this.style.background = 'var(--success)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 1500);
        }
    });
});

console.log('%c🥢 Bonus features loaded!', 'font-size: 14px; color: #F5A623; font-weight: bold;');
console.log('%cTry the Konami Code: ↑↑↓↓←→←→BA', 'font-size: 12px; color: #E94560;');
