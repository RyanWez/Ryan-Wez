// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Preloader animation
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500);
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offset = 100; // Offset for fixed navbar
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-up animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Create intersection observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the delay from data attribute if exists
                const delay = entry.target.dataset.delay || 0;
                
                // Add visible class after delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                // Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-up class
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background to navbar when scrolled
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = '';
            navbar.style.backdropFilter = '';
        }
        
        lastScrollTop = scrollTop;
    });

    // Parallax effect for hero background orbs
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.01; // Different speed for each orb
            const x = (clientX - centerX) * speed;
            const y = (clientY - centerY) * speed;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Create ripple effect on hover
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.innerHTML;
    
    // Store original HTML and implement typing effect if desired
    // This is commented out but can be enabled for additional effect
    /*
    heroTitle.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.innerHTML = originalText.slice(0, i + 1);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing after preloader
    setTimeout(typeWriter, 1000);
    */
});

// Add smooth scroll behavior for mouse wheel
let isScrolling = false;

window.addEventListener('wheel', function(e) {
    if (!isScrolling) {
        isScrolling = true;
        
        // Smooth scroll implementation
        setTimeout(() => {
            isScrolling = false;
        }, 100);
    }
}, { passive: true });
