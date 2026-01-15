/* ============================================
   KOLHAPUR SPICE - JavaScript Interactions
   Smooth animations & user experience
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 0
    });

    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll behavior
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Check initial state

    // ===== Mobile Navigation Toggle =====
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== Smooth Scroll for Navigation Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Active Navigation Link Highlighting =====
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);

    // ===== Back to Top Button =====
    const backToTop = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);

    // ===== Gallery Lightbox =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const imgSrc = img.src.replace('w=400', 'w=1200').replace('w=800', 'w=1200');
            const imgAlt = img.alt;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                    <img src="${imgSrc}" alt="${imgAlt}">
                    <p class="lightbox-caption">${imgAlt}</p>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Animate in
            setTimeout(() => lightbox.classList.add('active'), 10);
            
            // Close lightbox
            const closeLightbox = () => {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }, 300);
            };
            
            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
            
            // Close on escape key
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });

    // ===== Menu Card Hover Animation Enhancement =====
    const menuCards = document.querySelectorAll('.menu-card');
    
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ===== Review Cards Carousel (Optional Auto-scroll for mobile) =====
    const reviewsGrid = document.querySelector('.reviews-grid');
    let isAutoScrolling = false;
    
    function autoScrollReviews() {
        if (window.innerWidth <= 768 && !isAutoScrolling) {
            isAutoScrolling = true;
            let scrollAmount = 0;
            const cardWidth = reviewsGrid.querySelector('.review-card').offsetWidth + 25;
            const maxScroll = reviewsGrid.scrollWidth - reviewsGrid.clientWidth;
            
            setInterval(() => {
                scrollAmount += cardWidth;
                if (scrollAmount > maxScroll) {
                    scrollAmount = 0;
                }
                reviewsGrid.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }, 4000);
        }
    }
    
    // Enable horizontal scroll on mobile for reviews
    if (window.innerWidth <= 768) {
        reviewsGrid.style.overflowX = 'auto';
        reviewsGrid.style.scrollSnapType = 'x mandatory';
        reviewsGrid.querySelectorAll('.review-card').forEach(card => {
            card.style.scrollSnapAlign = 'start';
            card.style.flexShrink = '0';
        });
    }

    // ===== Parallax Effect for Hero Section =====
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
        }
    });

    // ===== Number Counter Animation =====
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ===== Intersection Observer for Animations =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Animate experience badge number
                if (entry.target.querySelector('.experience-badge .years')) {
                    const yearsElement = entry.target.querySelector('.experience-badge .years');
                    animateValue(yearsElement, 0, 15, 1500);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about-image, .menu-card, .review-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });

    // ===== Form Validation (if contact form exists) =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form validation logic here
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // ===== Lazy Loading Enhancement =====
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== Scroll Progress Indicator =====
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(scrollProgress);
    
    const progressBar = scrollProgress.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    // ===== Preloader (Optional) =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ===== Touch Device Detection =====
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // ===== Keyboard Navigation Enhancement =====
    document.addEventListener('keydown', function(e) {
        // Tab navigation indicator
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });

    console.log('🌶️ Kolhapur Spice website initialized successfully!');
});

// ===== Add Lightbox & Scroll Progress Styles Dynamically =====
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    /* Lightbox Styles */
    .lightbox {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .lightbox.active {
        opacity: 1;
        visibility: visible;
    }
    
    .lightbox-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .lightbox.active .lightbox-content {
        transform: scale(1);
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 85vh;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-close {
        position: absolute;
        top: -50px;
        right: 0;
        font-size: 2.5rem;
        color: #fff;
        background: none;
        border: none;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .lightbox-close:hover {
        opacity: 1;
    }
    
    .lightbox-caption {
        text-align: center;
        color: #fff;
        margin-top: 15px;
        font-size: 1.1rem;
        font-weight: 500;
    }
    
    /* Scroll Progress Bar */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(139, 30, 63, 0.1);
        z-index: 9999;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #8B1E3F, #D4A84B);
        width: 0%;
        transition: width 0.1s ease-out;
    }
    
    /* Active navigation link */
    .nav-link.active {
        color: var(--secondary-color) !important;
    }
    
    .navbar.scrolled .nav-link.active {
        color: var(--primary-color) !important;
        background: rgba(139, 30, 63, 0.08);
    }
    
    /* Loaded image transition */
    img[loading="lazy"] {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    img[loading="lazy"].loaded,
    img[loading="lazy"]:not(.loaded) {
        opacity: 1;
    }
    
    /* Keyboard navigation focus styles */
    .keyboard-nav a:focus,
    .keyboard-nav button:focus {
        outline: 3px solid #D4A84B;
        outline-offset: 3px;
    }
    
    /* Touch device adjustments */
    .touch-device .menu-card:hover {
        transform: none;
    }
    
    .touch-device .gallery-overlay {
        opacity: 1;
        background: linear-gradient(to top, rgba(139, 30, 63, 0.7), transparent 60%);
    }
`;
document.head.appendChild(dynamicStyles);
