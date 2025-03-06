document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll with improved performance
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    // Enhanced animations with debouncing
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Improved scroll animations with better performance
    const animateOnScroll = document.querySelectorAll('.service, .benefit, .reason, .hero-overlay, .cta');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.parentElement.classList.contains('services-grid') ||
                    entry.target.parentElement.classList.contains('benefits') ||
                    entry.target.parentElement.classList.contains('reasons')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.setProperty('--animation-delay', `${index * 0.1}s`);
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '20px'
    });

    animateOnScroll.forEach(element => observer.observe(element));

    // Enhanced mobile menu with improved touch handling
    const menuBtn = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    const toggleMenu = (e) => {
        e?.stopPropagation();
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    };

    menuBtn.addEventListener('click', toggleMenu);
    
    // Improved touch handling for mobile
    document.addEventListener('touchstart', function(e) {
        if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        }
    }, { passive: true });

    // Enhanced navigation handling
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    // Modern hover effects for service cards
    const services = document.querySelectorAll('.service');
    services.forEach(service => {
        const handleHover = (e) => {
            const { clientX, clientY, currentTarget } = e;
            const rect = currentTarget.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            
            currentTarget.style.setProperty('--mouse-x', `${x}px`);
            currentTarget.style.setProperty('--mouse-y', `${y}px`);
        };

        service.addEventListener('mousemove', handleHover);
        service.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        service.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // Optimized parallax effect
    const hero = document.querySelector('.hero');
    if (hero) {
        const parallaxScroll = debounce(() => {
            const scrolled = window.pageYOffset;
            requestAnimationFrame(() => {
                hero.style.setProperty('--scroll-offset', `${scrolled * 0.5}px`);
            });
        }, 10);

        window.addEventListener('scroll', parallaxScroll, { passive: true });
    }

    // Add loading animation for page transitions
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Parallax Effect
    document.addEventListener('DOMContentLoaded', function() {
        const parallaxSections = document.querySelectorAll('.parallax-section');
        
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                parallaxSections.forEach(section => {
                    const speed = section.dataset.speed || 0.5;
                    const yPos = -(window.pageYOffset * speed);
                    section.style.backgroundPositionY = `${yPos}px`;
                });
            });
        });
    
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };
    
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    animateOnScroll.unobserve(entry.target);
                }
            });
        }, observerOptions);
    
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            animateOnScroll.observe(element);
        });
    
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    
        // Enhanced hover effects for service cards
        const services = document.querySelectorAll('.service');
        services.forEach(service => {
            service.addEventListener('mouseenter', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                this.style.setProperty('--mouse-x', `${x}px`);
                this.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    
        // Mobile menu handling
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        menuToggle?.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    
        // Close mobile menu on click outside
        document.addEventListener('click', (e) => {
            if (navMenu?.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQs
            faqTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    otherTrigger.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle current FAQ
            this.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });
});