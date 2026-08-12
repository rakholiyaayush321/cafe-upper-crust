'use strict';

(function () {
    let preloaderHidden = false;

    function hidePreloader() {
        if (preloaderHidden) return;
        preloaderHidden = true;
        
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 400);
        } else {
            document.body.classList.add('loaded');
        }
    }

    // Core Initialization
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setTimeout(initApp, 0);
        setTimeout(hidePreloader, 400);
    } else {
        document.addEventListener('DOMContentLoaded', initApp);
    }

    // Hide preloader on window load OR max 500ms safety timer after DOM ready
    window.addEventListener('load', hidePreloader);
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(hidePreloader, 500);
    });
    // Extra safety timeout
    setTimeout(hidePreloader, 1000);

    function safeInit(fn) {
        try {
            if (typeof fn === 'function') fn();
        } catch (err) {
            console.warn('Initializer warning:', err);
        }
    }

    function initApp() {
        safeInit(initStickyHeader);
        safeInit(initMobileNav);
        safeInit(initActiveNavState);
        safeInit(initSmoothScrolling);
        
        safeInit(() => initFiltering('.filter-btn, .menu-filter-btn', '.menu-card', 'menu'));
        safeInit(() => initFiltering('.filter-btn, .bakery-filter-btn', '.bakery-card', 'bakery'));
        
        safeInit(initFormValidation);
        safeInit(initScrollAnimations);
        safeInit(initBackToTop);
        safeInit(initCounters);
        safeInit(initLazyLoading);
        safeInit(initLightbox);
        safeInit(initAccordion);
        safeInit(initGoogleMapsLinks);
        safeInit(initWhatsAppButton);
        safeInit(initAutoResizeTextarea);
        safeInit(initCurrentYear);
        
        // 100% Guaranteed Chatbot Widget Initialization
        safeInit(initChatWidget);
    }

    // 2. STICKY HEADER
    function initStickyHeader() {
        const header = document.querySelector('.header');
        if (!header) return;

        function checkScroll() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Initial check
    }

    // 3. MOBILE NAVIGATION
    function initMobileNav() {
        const navToggle = document.querySelector('.hamburger') || document.querySelector('.nav-toggle') || document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu') || document.querySelector('.navbar') || document.querySelector('.nav-links');
        if (!navToggle || !navMenu) return;

        function toggleNav(e) {
            if (e) e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        }

        function closeNav() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }

        navToggle.addEventListener('click', toggleNav);

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeNav();
            }
        });

        // Close on nav link click
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }

    // 4. ACTIVE NAVIGATION STATE
    function initActiveNavState() {
        const currentPath = window.location.pathname;
        const pageName = currentPath.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link, .nav-links a');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === pageName || (pageName === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 5. SMOOTH SCROLLING
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 6 & 7. CATEGORY FILTERING (Menu & Bakery)
    function initFiltering(filterBtnSelector, itemSelector, context) {
        const filterBtns = document.querySelectorAll(filterBtnSelector);
        if (!filterBtns.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                document.querySelectorAll('.menu-card, .bakery-item, .product-card').forEach(card => {
                    const category = card.getAttribute('data-category');
                    const type = card.getAttribute('data-type');
                    
                    let match = false;
                    if (filterValue === 'all') {
                        match = true;
                    } else if (filterValue === 'veg') {
                        match = type === 'veg' || card.querySelector('.veg-indicator') !== null;
                    } else if (filterValue === 'non-veg') {
                        match = type === 'non-veg' || card.querySelector('.nonveg-indicator') !== null;
                    } else if (filterValue === category) {
                        match = true;
                    }

                    if (match) {
                        card.style.display = '';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.classList.add('is-visible', 'animated');
                    } else {
                        card.style.display = 'none';
                    }
                });

                document.querySelectorAll('.menu-category').forEach(section => {
                    const sectionId = section.getAttribute('id');
                    if (filterValue === 'all') {
                        section.style.display = '';
                    } else if (filterValue === 'veg' || filterValue === 'non-veg') {
                        const visibleCards = section.querySelectorAll('.menu-card:not([style*="display: none"])');
                        section.style.display = visibleCards.length > 0 ? '' : 'none';
                    } else if (filterValue === sectionId) {
                        section.style.display = '';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }

    // 8. CONTACT FORM VALIDATION
    function initFormValidation() {
        const form = document.querySelector('#contact-form') || document.querySelector('#contactForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Name validation
            const nameInput = document.getElementById('contact-name') || document.getElementById('name');
            if (nameInput) {
                if (nameInput.value.trim().length < 2) {
                    showError(nameInput, 'Name must be at least 2 characters.');
                    isValid = false;
                } else {
                    showSuccess(nameInput);
                }
            }

            // Phone validation (Indian 10 digits)
            const phoneInput = document.getElementById('contact-phone') || document.getElementById('phone');
            if (phoneInput) {
                const phoneRegex = /^[6-9]\d{9}$/;
                if (!phoneRegex.test(phoneInput.value.trim())) {
                    showError(phoneInput, 'Please enter a valid 10-digit Indian phone number.');
                    isValid = false;
                } else {
                    showSuccess(phoneInput);
                }
            }

            // Email validation
            const emailInput = document.getElementById('email');
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    showError(emailInput, 'Please enter a valid email address.');
                    isValid = false;
                } else {
                    showSuccess(emailInput);
                }
            }

            // Message validation
            const messageInput = document.getElementById('message');
            if (messageInput) {
                if (messageInput.value.trim().length < 10) {
                    showError(messageInput, 'Message must be at least 10 characters.');
                    isValid = false;
                } else {
                    showSuccess(messageInput);
                }
            }

            if (isValid) {
                // Simulate form submission
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Sending...';
                btn.disabled = true;

                setTimeout(() => {
                    // Show success modal/message
                    const formContainer = form.parentElement;
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.innerHTML = '<h3>Thank You!</h3><p>Your message has been sent successfully. We will get back to you soon.</p>';
                    
                    form.style.display = 'none';
                    formContainer.appendChild(successMessage);
                    form.reset();
                    
                    // Reset inputs state
                    form.querySelectorAll('.form-control').forEach(input => {
                        input.classList.remove('success');
                        const errorMsg = input.parentElement.querySelector('.error-message');
                        if (errorMsg) errorMsg.remove();
                    });
                }, 1500);
            }
        });

        function showError(input, message) {
            const formControl = input.parentElement;
            input.classList.add('error');
            input.classList.remove('success');
            
            let errorElement = formControl.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('small');
                errorElement.className = 'error-message';
                formControl.appendChild(errorElement);
            }
            errorElement.textContent = message;
        }

        function showSuccess(input) {
            const formControl = input.parentElement;
            input.classList.remove('error');
            input.classList.add('success');
            
            const errorElement = formControl.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        }
    }

    // 9. SCROLL ANIMATIONS
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(el => {
            el.classList.add('animated');
            el.classList.add('is-visible');
        });
    }

    // 10. BACK TO TOP BUTTON
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 11. COUNTER ANIMATION
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));

        function startCounter(counterElement) {
            const target = +counterElement.getAttribute('data-target');
            const duration = 2000; // ~2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counterElement.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counterElement.innerText = target;
                }
            };
            
            updateCounter();
        }
    }

    // 12. IMAGE LAZY LOADING
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        if (!lazyImages.length) return;

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        
                        img.onload = () => {
                            img.classList.add('loaded');
                        };
                        
                        observer.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.getAttribute('data-src');
                img.onload = () => img.classList.add('loaded');
            });
        }
    }

    // 13. GALLERY / LIGHTBOX
    function initLightbox() {
        const galleryImages = document.querySelectorAll('.gallery-img');
        if (!galleryImages.length) return;

        // Create lightbox DOM elements dynamically
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-modal';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img class="lightbox-image" src="" alt="Gallery Image">
                <div class="lightbox-nav lightbox-prev">&#10094;</div>
                <div class="lightbox-nav lightbox-next">&#10095;</div>
            </div>
        `;
        document.body.appendChild(lightbox);

        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const overlay = lightbox.querySelector('.lightbox-overlay');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        let currentIndex = 0;
        const imagesArr = Array.from(galleryImages);

        function openLightbox(index) {
            currentIndex = index;
            updateImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function updateImage() {
            const imgSrc = imagesArr[currentIndex].getAttribute('src') || imagesArr[currentIndex].getAttribute('data-src');
            lightboxImage.src = imgSrc;
            
            // Hide arrows if only 1 image
            if (imagesArr.length <= 1) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            }
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % imagesArr.length;
            updateImage();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + imagesArr.length) % imagesArr.length;
            updateImage();
        }

        // Event Listeners
        imagesArr.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => openLightbox(index));
        });

        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }

    // 14. FAQ ACCORDION
    function initAccordion() {
        const accordionItems = document.querySelectorAll('.faq-item');
        if (!accordionItems.length) return;

        accordionItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // Close all other items
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const ans = otherItem.querySelector('.faq-answer');
                    if (ans) ans.style.maxHeight = null;
                });

                // Toggle current item
                if (!isOpen) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                }
            });
        });
    }

    // 15. GOOGLE MAPS LINKS
    function initGoogleMapsLinks() {
        const mapLinks = document.querySelectorAll('.btn-directions');
        mapLinks.forEach(link => {
            // Ensure they open in a new tab if they have a href
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }

    // 16. WHATSAPP BUTTON
    function initWhatsAppButton() {
        const waBtn = document.querySelector('.whatsapp-btn');
        if (waBtn) {
            waBtn.addEventListener('click', (e) => {
                // Number should ideally come from data attribute or backend, using placeholder as requested
                const phone = waBtn.getAttribute('data-phone') || '919825012345';
                const url = 'https://wa.me/' + phone;
                window.open(url, '_blank');
            });
        }
    }

    // 17. FORM AUTO-RESIZE TEXTAREA
    function initAutoResizeTextarea() {
        const textareas = document.querySelectorAll('textarea.auto-resize');
        
        textareas.forEach(textarea => {
            textarea.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
            // Trigger initially
            if(textarea.value) {
                textarea.style.height = (textarea.scrollHeight) + 'px';
            }
        });
    }

    // 18. CURRENT YEAR IN FOOTER
    function initCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

})();


    // 14. CAFÉ UPPER CRUST DUAL-ENGINE AI CHATBOT WIDGET
    // PAGE / SECTION SPECIFIC SUGGESTION CHIPS CONFIGURATION
    const pageSuggestionChips = {
        home: [
            { text: '🍕 Menu', msg: 'What is on your full menu?' },
            { text: '🍰 Bakery', msg: 'What bakery items do you have?' },
            { text: '🎉 Catering', msg: 'Tell me about your catering services' },
            { text: '📍 Outlets', msg: 'Where are your outlets?' },
            { text: '⏰ Timings', msg: 'What are your store timings?' },
            { text: '📞 Contact', msg: 'What are your contact details?' }
        ],
        menu: [
            { text: '🍕 Pizza Menu', msg: 'What pizzas do you have?' },
            { text: '🍝 Pasta Menu', msg: 'What pasta do you have?' },
            { text: '🍰 Cakes & Desserts', msg: 'What cakes and desserts do you have?' },
            { text: '🥤 Beverages', msg: 'What beverages do you have?' },
            { text: '💰 Prices', msg: 'What are your menu prices?' },
            { text: '📍 Outlets', msg: 'Where are your outlets?' }
        ],
        bakery: [
            { text: '🍰 Bakery Menu', msg: 'What bakery items do you have?' },
            { text: '🥐 Pastries', msg: 'What pastries do you have?' },
            { text: '🍞 Breads', msg: 'What fresh breads do you have?' },
            { text: '🎂 Cakes', msg: 'What cakes do you have?' },
            { text: '💰 Bakery Prices', msg: 'What are your bakery prices?' },
            { text: '📍 Bakery Outlets', msg: 'Where are your bakery outlets?' },
            { text: '⏰ Bakery Timings', msg: 'What are your bakery timings?' }
        ],
        catering: [
            { text: '🍽️ Catering Menu', msg: 'What catering menus do you offer?' },
            { text: '🎉 Catering Packages', msg: 'What catering packages do you have?' },
            { text: '💰 Catering Pricing', msg: 'What is your catering pricing?' },
            { text: '👥 Events & Parties', msg: 'Tell me about event and party catering' },
            { text: '📍 Catering Availability', msg: 'What is your catering capacity and availability?' },
            { text: '📞 Contact Catering', msg: 'How do I contact catering?' }
        ],
        contact: [
            { text: '📞 Contact Us', msg: 'What are your contact details?' },
            { text: '📍 Outlets', msg: 'Where are your outlets located?' },
            { text: '⏰ Opening Hours', msg: 'What are your opening hours?' },
            { text: '📧 Email', msg: 'What is your email address?' },
            { text: '🗺️ Location', msg: 'Where is your main office location?' }
        ],
        about: [
            { text: '🏠 About Us', msg: 'Tell me about Café Upper Crust' },
            { text: '📖 Our Story', msg: 'What is the story of Café Upper Crust?' },
            { text: '👨‍🍳 Our Team', msg: 'Who founded Café Upper Crust?' },
            { text: '📍 Outlets', msg: 'Where are your outlets?' },
            { text: '📞 Contact', msg: 'What are your contact details?' }
        ],
        outlets: [
            { text: '📍 All Outlets', msg: 'Where are your outlets in Ahmedabad?' },
            { text: '⏰ Store Timings', msg: 'What are your store timings?' },
            { text: '📞 Contact Us', msg: 'What are your contact details?' },
            { text: '🍽️ View Menu', msg: 'What is on your menu?' }
        ]
    };

    function getCurrentPageKey() {
        let p = window.location.pathname.split('/').pop().replace('.html', '').toLowerCase();
        if (!p || p === 'index' || p === 'home' || p === '') p = 'home';
        return p;
    }

    function getPageChips() {
        const pageKey = getCurrentPageKey();
        return pageSuggestionChips[pageKey] || pageSuggestionChips.home;
    }

    function initChatWidget() {
        if (document.getElementById('cafe-chat-container')) return;

        // Session ID management (Persistent per visitor)
        let sessionId = localStorage.getItem('cafe_chat_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
            localStorage.setItem('cafe_chat_session_id', sessionId);
        }

        // Context Memory
        let lastContextCategory = null;
        let lastDiscussedItem = null;

        const endpoints = [
            'https://ayush894.app.n8n.cloud/webhook/cafe-chat',
            'https://ayush894.app.n8n.cloud/webhook-test/cafe-chat',
            'http://localhost:5678/webhook/cafe-chat'
        ];

        // Inject DOM Elements
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'chat-widget-toggle';
        toggleBtn.setAttribute('aria-label', 'Open Café Upper Crust AI Assistant');
        toggleBtn.innerHTML = '💬';

        const chatContainer = document.createElement('div');
        chatContainer.id = 'cafe-chat-container';
        chatContainer.className = 'chat-widget-container';
        chatContainer.innerHTML = `
            <div class="chat-widget-header">
                <div class="chat-widget-title-area">
                    <div class="chat-widget-avatar">🍽️</div>
                    <div>
                        <h4 class="chat-widget-title">Café Upper Crust</h4>
                        <p class="chat-widget-subtitle">How can we help you?</p>
                    </div>
                </div>
                <button class="chat-widget-close" aria-label="Close Chat">&times;</button>
            </div>
            <div class="chat-widget-body" id="chat-widget-body">
                <div class="chat-message bot">
                    <p>Welcome to Café Upper Crust! 👋</p>
                    <p>I can help you with our menu, prices, outlets, bakery, catering and more. What would you like to know?</p>
                </div>
            </div>
            <div class="chat-suggestions-bar" id="chat-suggestions-bar">
            </div>
            <div class="chat-widget-footer">
                <input type="text" class="chat-input" id="chat-input" placeholder="Type your question..." aria-label="Type your message">
                <button class="chat-send-btn" id="chat-send-btn" aria-label="Send Message">➤</button>
            </div>
        `;

        // 1. Append to DOM first so elements exist
        document.body.appendChild(toggleBtn);
        document.body.appendChild(chatContainer);

        // 2. Query DOM references after elements are attached
        const closeBtn = chatContainer.querySelector('.chat-widget-close');
        const chatBody = document.getElementById('chat-widget-body');
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('chat-send-btn');
        const suggestionsBar = document.getElementById('chat-suggestions-bar');

        // 3. Render page-aware suggestion chips immediately
        updateSuggestionChipsBar(getPageChips());

        toggleBtn.addEventListener('click', () => {
            chatContainer.classList.toggle('active');
            if (chatContainer.classList.contains('active')) {
                chatInput.focus();
            }
        });

        closeBtn.addEventListener('click', () => {
            chatContainer.classList.remove('active');
        });

        // Delegate Suggestion Chip Clicks on permanent bar
        chatContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.suggestion-chip');
            if (chip) {
                const text = chip.getAttribute('data-msg') || chip.textContent.trim();
                if (text) sendMessage(text);
            }
        });

        sendBtn.addEventListener('click', () => {
            const text = chatInput.value.trim();
            if (text) sendMessage(text);
        });

        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const text = chatInput.value.trim();
                if (text) sendMessage(text);
            }
        });

        async function sendMessage(text) {
            appendMessage(text, 'user');
            chatInput.value = '';
            sendBtn.disabled = true;

            const typingEl = appendTypingIndicator();
            scrollToBottom();

            let reply = null;

            // Attempt remote n8n RAG cloud endpoints
            for (const ep of endpoints) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 3500);

                    const res = await fetch(ep, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action: 'sendMessage', chatInput: text, sessionId: sessionId }),
                        signal: controller.signal
                    });
                    clearTimeout(timeoutId);

                    if (res.ok) {
                        const data = await res.json();
                        reply = data.output || data.response || data.text;
                        if (reply) break;
                    }
                } catch (e) {
                    // Fallback to local RAG engine
                }
            }

            if (typingEl) typingEl.remove();

            if (!reply) {
                reply = generateLocalRAGResponse(text);
            }

            appendMessage(reply, 'bot');
            sendBtn.disabled = false;

            // Update permanent chips bar with contextual suggestions (keeps bar ALWAYS visible & clickable)
            const suggestions = getContextualSuggestions(text, reply);
            updateSuggestionChipsBar(suggestions);

            scrollToBottom();
        }

        function updateSuggestionChipsBar(suggestions) {
            if (!suggestionsBar) return;

            if (!suggestions || !suggestions.length) {
                suggestions = getPageChips();
            }

            suggestionsBar.innerHTML = suggestions.map(item => {
                const label = typeof item === 'string' ? item : item.text;
                const msg = typeof item === 'string' ? item : item.msg;
                return `<button class="suggestion-chip" data-msg="${msg}">${label}</button>`;
            }).join('');
        }

        function getContextualSuggestions(userMessage, botResponse) {
            const pageKey = getCurrentPageKey();
            const q = (userMessage || '').toLowerCase();

            // Strict Page-Aware Rule: If on Bakery, Catering, Contact, About, or Outlets page,
            // ALWAYS return page-relevant chips! NEVER show Pizza/Pasta chips on Bakery/Catering pages!
            if (pageKey === 'bakery') return pageSuggestionChips.bakery;
            if (pageKey === 'catering') return pageSuggestionChips.catering;
            if (pageKey === 'contact') return pageSuggestionChips.contact;
            if (pageKey === 'about') return pageSuggestionChips.about;
            if (pageKey === 'outlets') return pageSuggestionChips.outlets;

            // On Menu or Home page, provide dynamic category sub-chips
            if (q.includes('pasta') || q.includes('spaghetti') || q.includes('alfredo') || q.includes('arrabbiata') || q.includes('pesto') || q.includes('mac')) {
                return [
                    { text: '🟢 Vegetarian Pasta', msg: 'Which pasta is vegetarian?' },
                    { text: '🔴 Non-Vegetarian Pasta', msg: 'Which pasta is non-vegetarian?' },
                    { text: '💰 Pasta Prices', msg: 'What are your pasta prices?' },
                    { text: '🍕 Pizza Menu', msg: 'What pizzas do you have?' },
                    { text: '🍰 Desserts', msg: 'What desserts do you have?' }
                ];
            }

            if (q.includes('pizza') || q.includes('margherita') || q.includes('pepperoni')) {
                return [
                    { text: '🟢 Vegetarian Pizza', msg: 'Which pizza is vegetarian?' },
                    { text: '🔴 Non-Vegetarian Pizza', msg: 'Which pizza is non-vegetarian?' },
                    { text: '💰 Pizza Prices', msg: 'What are your pizza prices?' },
                    { text: '🍝 Pasta Menu', msg: 'What pasta do you have?' },
                    { text: '📍 Outlets', msg: 'Where are your outlets?' }
                ];
            }

            // Fall back to current page chips
            return getPageChips();
        }

        function scrollToBottom() {
            requestAnimationFrame(() => {
                chatBody.scrollTop = chatBody.scrollHeight;
            });
        }

        function generateLocalRAGResponse(query) {
            const rawQ = (query || '').toLowerCase().trim();
            let q = rawQ.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

            // Typo normalizations
            if (q.includes('magrita') || q.includes('margarita')) {
                q = q.replace('magrita', 'margherita').replace('margarita', 'margherita');
            }

            const items = window.menuItems || [];
            if (!q) return "Welcome to Café Upper Crust! Please ask about our menu, prices, outlets, bakery, timings, or catering services.";

            // Category words that should ALWAYS trigger category list views (NOT single items)
            const categoryKeywords = [
                'pasta', 'pastas', 'pizza', 'pizzas', 'sizzler', 'sizzlers', 
                'burger', 'burgers', 'dessert', 'desserts', 'cake', 'cakes', 
                'beverage', 'beverages', 'drink', 'drinks', 'bread', 'breads', 
                'cookie', 'cookies', 'soup', 'soups', 'starter', 'starters', 
                'chinese', 'thai', 'indian', 'menu', 'food'
            ];

            const isExactCategoryQuery = categoryKeywords.some(cat => q === cat || q === cat + 's' || q === 'view ' + cat || q === 'show ' + cat);

            // -------------------------------------------------------------
            // 1. SPECIFIC DISH ITEM MATCHING (ONLY when NOT a broad category query)
            // -------------------------------------------------------------
            let specificItemMatch = null;

            if (!isExactCategoryQuery) {
                specificItemMatch = items.find(i => {
                    const name = i.name.toLowerCase();
                    const id = i.id.toLowerCase();
                    const idWords = id.replace(/-/g, ' ');

                    // Exact full match
                    if (q === name || q === idWords) return true;

                    // Specific dish identifiers (NOT generic category words)
                    if (q.includes('margherita') && id === 'margherita-pizza') return true;
                    if (q.includes('pepperoni') && id === 'pepperoni-pizza') return true;
                    if (q.includes('paneer butter') && id === 'paneer-butter-masala') return true;
                    if (q.includes('dal makhani') && id === 'dal-makhani') return true;
                    if (q.includes('butter chicken') && id === 'butter-chicken') return true;
                    if (q.includes('alfredo') && id === 'chicken-alfredo-pasta') return true;
                    if (q.includes('arrabbiata') && id === 'penne-arrabbiata') return true;
                    if (q.includes('pesto') && id === 'pesto-pasta') return true;
                    if ((q.includes('mac cheese') || q.includes('mac and cheese') || q.includes('macaroni')) && id === 'mac-and-cheese') return true;
                    if (q.includes('bolognese') && id === 'spaghetti-bolognese') return true;
                    if (q.includes('rogan josh') && id === 'mutton-rogan-josh') return true;
                    if (q.includes('amritsari') && id === 'fish-amritsari') return true;
                    if (q.includes('truffle') && id.includes('truffle')) return true;
                    if (q.includes('tiramisu') && id === 'tiramisu') return true;
                    if (q.includes('brownie') && id === 'brownie-ice-cream') return true;
                    if (q.includes('gulab jamun') && id === 'gulab-jamun') return true;

                    // If query contains dish name but query is longer than category word
                    if (name.length > 5 && q.includes(name)) return true;

                    return false;
                });
            }

            if (specificItemMatch) {
                lastDiscussedItem = specificItemMatch;
                const emoji = specificItemMatch.category === 'pizza' ? '🍕' :
                              specificItemMatch.category === 'pasta' ? '🍝' :
                              specificItemMatch.category === 'sizzlers' ? '🥩' :
                              specificItemMatch.category === 'desserts' || specificItemMatch.category === 'cakes' ? '🍰' :
                              specificItemMatch.category === 'beverages' ? '🥤' : '🍽️';
                return `${emoji} **${specificItemMatch.name}**\n\n${specificItemMatch.description}\n\n💰 **₹${specificItemMatch.price}**\n${specificItemMatch.type === 'veg' ? '🟢 **Vegetarian**' : '🔴 **Non-Vegetarian**'}`;
            }

            // -------------------------------------------------------------
            // 2. CATEGORY LIST & GENERAL QUERIES
            // -------------------------------------------------------------

            // Pastas / Pasta Category List
            if (q.includes('pasta')) {
                lastContextCategory = 'pasta';
                return "🍝 **Café Upper Crust Pasta Menu:**\n\n• **Penne Arrabbiata** — ₹275 🟢 Veg\n• **Pesto Pasta** — ₹275 🟢 Veg\n• **Mac & Cheese** — ₹245 🟢 Veg\n• **Chicken Alfredo Pasta** — ₹345 🔴 Non-Veg\n• **Spaghetti Bolognese** — ₹325 🔴 Non-Veg\n\nType any specific pasta name (e.g. *'Chicken Alfredo'* or *'Penne Arrabbiata'*) for individual dish details & pricing!";
            }

            // Pizzas / Pizza Category
            if (q.includes('pizza')) {
                lastContextCategory = 'pizza';
                return "🍕 **Café Upper Crust Pizza Menu:**\n\n• **Margherita Pizza** — ₹295 🟢 Veg\n• **Pepperoni Pizza** — ₹395 🔴 Non-Veg\n\nFreshly baked thin crust with rich tomato sauce and melted mozzarella cheese.";
            }

            // Sizzlers / Sizzler
            if (q.includes('sizzler')) {
                lastContextCategory = 'sizzler';
                return "🥩 **Café Upper Crust Sizzler Platters:**\n\n• **Veg Sizzler** — ₹345 🟢 Veg\n• **Chicken Sizzler** — ₹395 🔴 Non-Veg\n• **Fish Sizzler** — ₹425 🔴 Non-Veg";
            }

            // Burgers / Burger
            if (q.includes('burger') || q.includes('sandwich') || q.includes('puff') || q.includes('roll')) {
                return "🍔 **Café Upper Crust Burgers & Rolls:**\n\n• **Baked Cheese Roll** — ₹50\n• **Veg Potato Puff** — ₹35\n• **Paneer Cottage Cheese Puff** — ₹45\n• **Grilled Cheese Sandwich** — ₹165";
            }

            // Desserts / Dessert
            if (q.includes('dessert')) {
                lastContextCategory = 'dessert';
                return "🍰 **Café Upper Crust Desserts:**\n\n• **Chocolate Truffle Cake** — ₹165\n• **Red Velvet Cake** — ₹175\n• **Brownie with Ice Cream** — ₹195\n• **Tiramisu** — ₹225\n• **Gulab Jamun** — ₹125";
            }

            // Cakes / Cake
            if (q.includes('cake')) {
                return "🎂 **Café Upper Crust Cakes:**\n\n• **Dutch Chocolate Truffle Cake** — ₹550/kg\n• **Red Velvet Cream Cheese Cake** — ₹650/kg\n• **Black Forest Cherry Cake** — ₹500/kg\n• **Fresh Pineapple Gateau** — ₹480/kg";
            }

            // Bakery / Breads / Cookies
            if (q.includes('bakery') || q.includes('bread') || q.includes('cookie') || q.includes('khari') || q.includes('toast')) {
                return "🥖 **Café Upper Crust Bakery Selection:**\n\n• **Fresh Breads:** Sandwich Bread (₹45), Brown Bread (₹55), Multigrain (₹65), Garlic Loaf (₹75)\n• **Cookies:** Butter Cookies (₹180/box), Choco Chip (₹200/box), Nan Khatai (₹160/box), Almond Cookies (₹220/box)\n• **Khari & Toast:** Layered Khari (₹120/box), Masala Khari (₹130/box), Milk Toast Rusks (₹110/box)";
            }

            // Beverages / Drinks
            if (q.includes('beverage') || q.includes('drink') || q.includes('coffee') || q.includes('chai') || q.includes('soda') || q.includes('lassi') || q.includes('mojito')) {
                return "🥤 **Café Upper Crust Beverages:**\n\n• **Masala Chai** — ₹65\n• **Cold Coffee** — ₹145\n• **Fresh Lime Soda** — ₹95\n• **Mango Lassi** — ₹125\n• **Virgin Mojito** — ₹155";
            }

            // Menu / Food / Detail Represented
            if (q === 'menu' || q.includes('full menu') || q === 'food' || q.includes('dishes') || q.includes('detail') || q.includes('categories')) {
                return "📋 **Café Upper Crust Full Menu Categories:**\n\n1. 🍢 **Starters:** Paneer Tikka, Chicken Tikka, Kebab (₹195 – ₹395)\n2. 🍲 **Soups:** Tomato Basil, Hot & Sour, Manchow (₹165 – ₹195)\n3. 🍛 **Indian Main Course:** Dal Makhani, Paneer Butter Masala, Biryani (₹245 – ₹425)\n4. 🥢 **Chinese:** Manchurian, Chicken Chilli, Noodles (₹195 – ₹295)\n5. 🍕 **Italian & Pizza:** Margherita, Pepperoni Pizza (₹295 – ₹395)\n6. 🍜 **Thai Cuisines:** Green Curry, Red Curry, Pad Thai (₹275 – ₹365)\n7. 🍝 **Pasta Specialties:** Penne Arrabbiata, Alfredo, Pesto (₹245 – ₹345)\n8. 🥩 **Sizzlers:** Veg, Chicken, Fish Sizzlers (₹345 – ₹425)\n9. 🍰 **Desserts & Cakes:** Truffle Cake, Tiramisu, Brownie (₹125 – ₹225)\n10. 🥤 **Beverages:** Masala Chai, Cold Coffee, Mojito (₹65 – ₹155)\n\nType any category or dish name for instant pricing and details!";
            }

            // Costliest / Premium
            if (q.includes('costliest') || q.includes('expensive') || q.includes('highest') || q.includes('premium')) {
                return "⭐ **Signature Premium Specialties:**\n\n• **Fish Sizzler:** ₹425 (🔴 Non-Veg)\n• **Mutton Rogan Josh:** ₹425 (🔴 Non-Veg)\n• **Fish Amritsari:** ₹395 (🔴 Non-Veg)\n• **Chicken Sizzler:** ₹395 (🔴 Non-Veg)\n• **Pepperoni Pizza:** ₹395 (🔴 Non-Veg)";
            }

            // Pricing / Price / Cost / Rate / Bhav
            if (q === 'pricing' || q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('rate') || q.includes('bhav')) {
                return "💰 **Café Upper Crust Price Overview:**\n\n• **Beverages:** starting at ₹65\n• **Desserts & Cakes:** ₹125 – ₹225\n• **Starters:** ₹195 – ₹395\n• **Pasta & Noodles:** ₹195 – ₹345\n• **Pizzas:** ₹295 – ₹395\n• **Indian Main Course:** ₹245 – ₹425\n• **Sizzlers:** ₹345 – ₹425\n\nType any dish name (e.g. *'Margherita Pizza'* or *'Paneer Tikka'*) to get exact pricing!";
            }

            // Non-Vegetarian
            if (q.includes('nonvegetarian') || q.includes('nonveg') || q.includes('non veg')) {
                return "🔴 **Popular Non-Vegetarian Specialties:**\n\n• **Butter Chicken** — ₹345\n• **Mutton Rogan Josh** — ₹425\n• **Chicken Tikka** — ₹345\n• **Chicken Sizzler** — ₹395\n• **Pepperoni Pizza** — ₹395\n• **Fish Amritsari** — ₹395\n• **Chicken Alfredo Pasta** — ₹345";
            }

            // Vegetarian
            if (q.includes('vegetarian') || q.includes('pure veg') || q.includes('veg')) {
                return "🟢 **Popular Vegetarian Dishes:**\n\n• **Paneer Butter Masala** — ₹295\n• **Dal Makhani** — ₹245\n• **Penne Arrabbiata** — ₹275\n• **Pesto Pasta** — ₹275\n• **Veg Sizzler** — ₹345\n• **Veg Biryani** — ₹265\n• **Chocolate Truffle Cake** — ₹165";
            }

            // Outlets / Locations / Address
            if (q.includes('outlet') || q.includes('location') || q.includes('branch') || q.includes('where') || q.includes('address')) {
                return "📍 **Café Upper Crust Outlets in Ahmedabad:**\n\n1. **Vastrapur:** Near Vastrapur Lake\n2. **Vijay Cross Road:** Near Commerce College, Navrangpura\n3. **Prahladnagar:** Parshwanath Business Park\n4. **Satellite:** Near Shivranjani Cross Roads\n5. **Bodakdev:** Near JUDGES Bungalow Road\n\nAll outlets are open daily from 11:00 AM to 11:00 PM.";
            }

            // Timings / Hours / Time
            if (q.includes('timing') || q.includes('hour') || q.includes('time') || q.includes('open') || q.includes('close') || q.includes('schedule')) {
                return "⏰ **Café Upper Crust Operating Hours & Timings:**\n\n• **Restaurant & Dine-in:** 11:00 AM – 11:00 PM (Daily)\n• **Bakery & Pastry Counter:** 8:30 AM – 11:00 PM (Daily)\n• **Takeaway & Online Orders:** 11:00 AM – 10:30 PM (Daily)\n• **Catering Enquiries:** 10:00 AM – 7:00 PM";
            }

            // Catering / Shagun / Lithosphere
            if (q.includes('catering') || q.includes('event') || q.includes('wedding') || q.includes('party') || q.includes('shagun') || q.includes('lithosphere')) {
                return "👥 **Shagun Catering by Café Upper Crust:**\n\n• **Capacity:** Outdoor catering up to 5,000 people.\n• **Staff:** Over 150 dedicated catering professionals.\n• **Services:** Corporate meetings, conferences, weddings, and private parties.\n• **Sister Brand:** Lithosphere (Pâtisserie, Boulangerie, Fine-Dine & Rooftop).";
            }

            // Contact / Phone / Email
            if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('email') || q.includes('call')) {
                return "📍 **Contact Information:**\n\n• **Phone:** +91 82381 37060 | +91 90999 77444 | +91 98240 22811\n• **Email:** contact@cafeuppercrust.com\n• **Office Address:** 1009, Parshwanath Business Park, Prahladnagar, Ahmedabad.";
            }

            return "Welcome to Café Upper Crust! 👋\n\nI can help you with:\n• **Dishes & Prices:** Type any food item (e.g., *'Paneer Tikka'*, *'Margherita Pizza'*, *'Mac & Cheese'*)\n• **Menu Categories:** Type *'Menu'* or *'Price list'*\n• **Dietary Options:** Type *'Veg'* or *'Non-Veg'*\n• **Outlets & Timings:** Type *'Outlets'* or *'Timings'*\n• **Contact & Catering:** Type *'Contact'* or *'Catering'*\n\nWhat would you like to know?";
        }

        function appendMessage(msg, sender) {
            const div = document.createElement('div');
            div.className = 'chat-message ' + sender;
            div.innerHTML = formatMarkdown(msg);
            chatBody.appendChild(div);
        }

        function appendTypingIndicator() {
            const div = document.createElement('div');
            div.className = 'chat-message bot typing-indicator-msg';
            div.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
            chatBody.appendChild(div);
            return div;
        }

        function formatMarkdown(str) {
            let s = (str || '').toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');
            s = s.replace(/\\n/g, '<br>').replace(/\n/g, '<br>');
            s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            s = s.replace(/•\s*(.*?)(<br>|$)/g, '<li>$1</li>');
            if (s.includes('<li>')) s = s.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
            return s;
        }
    }
