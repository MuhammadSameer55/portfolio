// Main JavaScript file for Rizvi SEO Services website
// Handles all interactive functionality, animations, and user interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initTypewriter();
    initTestimonialSlider();
    initTimelineAnimation();
    initFormHandling();
    initSmoothScrolling();
    
    console.log('Rizvi SEO Services website initialized successfully');
});

// Navigation functionality
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
    
    // Sticky navigation with background change
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('shadow-lg');
            }
        });
    }
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Special handling for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal, .timeline-item');
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// Typewriter effect for hero section
function initTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                "Pakistan's #1 SEO Agency",
                "Guaranteed First Page Rankings",
                "Expert SEO Services",
                "Results-Driven SEO"
            ],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Testimonial slider initialization
function initTestimonialSlider() {
    const testimonialSlider = document.getElementById('testimonial-slider');
    if (testimonialSlider && typeof Splide !== 'undefined') {
        new Splide('#testimonial-slider', {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            arrows: false,
            pagination: true,
            breakpoints: {
                768: {
                    perPage: 1,
                    gap: '1rem'
                }
            }
        }).mount();
    }
}

// Timeline animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Animate timeline items with stagger
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 200);
    });
}

// Form handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showNotification('Thank you! Your message has been sent. We will contact you within 24 hours.', 'success');
                
                // Reset form
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300`;
    
    // Set notification style based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <p class="mr-4">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Parallax effect for hero backgrounds
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-bg, .service-hero, .pricing-hero, .about-hero');
    
    const handleParallax = debounce(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 10);
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', handleParallax);
    }
}

// Initialize parallax
initParallax();

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Initialize counter animation
animateCounters();

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Track Core Web Vitals if supported
        if ('web-vital' in window) {
            // This would integrate with actual web vitals library
            console.log('Core Web Vitals tracking initialized');
        }
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.active, .team-modal.active');
            modals.forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    });
    
    // Focus management for modals
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-trigger');
            const modal = document.getElementById(modalId);
            if (modal) {
                // Focus first focusable element in modal
                const firstFocusable = modal.querySelector('button, input, select, textarea, a[href]');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }
        });
    });
}

// Initialize accessibility features
initAccessibility();

// Export functions for global use
window.showNotification = showNotification;
window.debounce = debounce;