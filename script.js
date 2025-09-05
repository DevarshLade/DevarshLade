// Interactive Animated Background
class AnimatedBackground {
    constructor() {
        this.particleContainer = document.querySelector('.particle-container');
        this.sparkleContainer = document.querySelector('.sparkle-container');
        this.particles = [];
        this.sparkles = [];
        this.stars = [];
        this.mouse = { x: 0, y: 0 };
        this.connectionLines = [];
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.createSparkles();
        this.createStars();
        this.bindEvents();
        this.animate();
        this.startSparkleTimer();
    }
    
    createParticles() {
        const particleCount = window.innerWidth > 768 ? 30 : 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = this.createParticle();
            this.particles.push(particle);
            this.particleContainer.appendChild(particle.element);
        }
    }
    
    createParticle() {
        const element = document.createElement('div');
        element.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const speedX = (Math.random() - 0.5) * 0.5;
        const speedY = (Math.random() - 0.5) * 0.5;
        
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        
        return {
            element,
            x,
            y,
            speedX,
            speedY,
            size
        };
    }
    
    createSparkles() {
        const sparkleCount = window.innerWidth > 768 ? 15 : 8;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = this.createSparkle();
            this.sparkles.push(sparkle);
            this.sparkleContainer.appendChild(sparkle.element);
        }
    }
    
    createSparkle() {
        const element = document.createElement('div');
        element.className = Math.random() > 0.7 ? 'sparkle large' : 'sparkle';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const animationDelay = Math.random() * 3;
        
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        element.style.animationDelay = animationDelay + 's';
        
        return {
            element,
            x,
            y,
            delay: animationDelay
        };
    }
    
    createStars() {
        const starCount = window.innerWidth > 768 ? 25 : 12;
        
        for (let i = 0; i < starCount; i++) {
            const star = this.createStar();
            this.stars.push(star);
            this.sparkleContainer.appendChild(star.element);
        }
    }
    
    createStar() {
        const element = document.createElement('div');
        const sizes = ['small', 'medium', 'large'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        element.className = `star ${size}`;
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const animationDelay = Math.random() * 5;
        
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        element.style.animationDelay = animationDelay + 's';
        
        return {
            element,
            x,
            y,
            size
        };
    }
    
    createSparkleBurst(x, y) {
        const burst = document.createElement('div');
        burst.className = 'sparkle-burst';
        burst.style.left = x + 'px';
        burst.style.top = y + 'px';
        
        // Create 8 rays
        for (let i = 0; i < 8; i++) {
            const ray = document.createElement('div');
            ray.className = 'sparkle-ray';
            burst.appendChild(ray);
        }
        
        this.sparkleContainer.appendChild(burst);
        
        // Remove after animation
        setTimeout(() => {
            burst.remove();
        }, 1000);
    }
    
    startSparkleTimer() {
        // Create random sparkle bursts
        setInterval(() => {
            if (Math.random() > 0.7) {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                this.createSparkleBurst(x, y);
            }
        }, 2000);
    }
    
    bindEvents() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.createConnectionLine(e.clientX, e.clientY);
            
            // Create sparkle burst on mouse movement occasionally
            if (Math.random() > 0.98) {
                this.createSparkleBurst(e.clientX, e.clientY);
            }
        });
        
        // Click/tap sparkle burst
        window.addEventListener('click', (e) => {
            this.createSparkleBurst(e.clientX, e.clientY);
        });
        
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Touch events for mobile
        window.addEventListener('touchmove', (e) => {
            if (e.touches[0]) {
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
                this.createConnectionLine(e.touches[0].clientX, e.touches[0].clientY);
                
                // Create sparkle burst on touch movement occasionally
                if (Math.random() > 0.97) {
                    this.createSparkleBurst(e.touches[0].clientX, e.touches[0].clientY);
                }
            }
        });
        
        window.addEventListener('touchstart', (e) => {
            if (e.touches[0]) {
                this.createSparkleBurst(e.touches[0].clientX, e.touches[0].clientY);
            }
        });
    }
    
    createConnectionLine(x, y) {
        if (Math.random() > 0.95) { // Only create lines occasionally
            const line = document.createElement('div');
            line.className = 'connection-line';
            line.style.left = x + 'px';
            line.style.top = y + 'px';
            line.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            document.body.appendChild(line);
            
            setTimeout(() => {
                line.remove();
            }, 3000);
        }
    }
    
    animate() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off walls
            if (particle.x <= 0 || particle.x >= window.innerWidth) {
                particle.speedX *= -1;
            }
            if (particle.y <= 0 || particle.y >= window.innerHeight) {
                particle.speedY *= -1;
            }
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.element.style.opacity = 0.9;
                particle.element.style.transform = `scale(${1 + force * 0.5})`;
                
                // Repel particles
                particle.x -= dx * force * 0.01;
                particle.y -= dy * force * 0.01;
            } else {
                particle.element.style.opacity = '';
                particle.element.style.transform = '';
            }
            
            // Apply position
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        // Remove existing particles
        this.particles.forEach(particle => {
            particle.element.remove();
        });
        this.particles = [];
        
        // Remove existing sparkles and stars
        this.sparkles.forEach(sparkle => {
            sparkle.element.remove();
        });
        this.sparkles = [];
        
        this.stars.forEach(star => {
            star.element.remove();
        });
        this.stars = [];
        
        // Recreate all elements for new screen size
        this.createParticles();
        this.createSparkles();
        this.createStars();
    }
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile menu toggle with animation
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Enhanced scroll handling for mobile
function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = window.innerWidth <= 768 ? 100 : 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Active navigation link with smooth indicator
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Mobile-friendly contact form
function handleContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showMobileAlert('Please fill in all fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMobileAlert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission with loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showMobileAlert('Thank you for your message! I\'ll get back to you soon.');
            form.reset();
            submitBtn.classList.remove('loading');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Mobile-friendly alert
function showMobileAlert(message) {
    if (window.innerWidth <= 768) {
        // Create custom mobile alert
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(26, 22, 37, 0.95);
            color: #E9E5FF;
            padding: 15px 20px;
            border-radius: 12px;
            border: 1px solid rgba(155, 126, 227, 0.3);
            z-index: 10000;
            font-size: 14px;
            max-width: 90%;
            text-align: center;
            backdrop-filter: blur(20px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    } else {
        alert(message);
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize scroll animations for elements
function initializeAnimations() {
    // Add fade-in class to elements that should animate
    const animateElements = [
        '.timeline-item',
        '.skill-card',
        '.interest-card',
        '.vision-content',
        '.contact-form'
    ];
    
    animateElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

// Smooth scroll for navigation links
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
}

// Parallax effect for hero section
function handleParallax() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
function initializeTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 80);
        }, 1500);
    }
}

// Smooth reveal for timeline items
function initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transition = 'all 0.8s ease';
        
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        
        observer.observe(item);
    });
}

// Add floating animation to profile image
function initializeProfileAnimation() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.animation = 'float 3s ease-in-out infinite';
    }
}

// CSS for floating animation
function addFloatingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// Mobile gesture support and resize handling
function initializeMobileSupport() {
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            window.scrollTo(0, window.scrollY);
        }, 100);
    });
    
    // Close mobile menu on resize
    window.addEventListener('resize', function() {
        const navMenu = document.querySelector('.nav-menu');
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Touch support for cards
    const cards = document.querySelectorAll('.skill-card, .interest-card, .timeline-content');
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Improve scroll performance on mobile
    let ticking = false;
    function updateOnScroll() {
        handleNavbarScroll();
        handleScrollAnimations();
        updateActiveNavLink();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animated background
    const animatedBg = new AnimatedBackground();
    
    // Initialize all components
    initializeAnimations();
    initializeNavigation();
    handleContactForm();
    initializeTypingEffect();
    initializeTimelineAnimation();
    initializeProfileAnimation();
    addFloatingAnimation();
    initializeMobileSupport();
    
    // Initial calls
    handleNavbarScroll();
    handleScrollAnimations();
    updateActiveNavLink();
});

// Scroll event listeners
window.addEventListener('scroll', function() {
    handleNavbarScroll();
    handleScrollAnimations();
    updateActiveNavLink();
    
    // Throttle parallax for performance
    requestAnimationFrame(handleParallax);
});

// Resize event listener
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Preloader (optional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add some interactive features
document.addEventListener('mousemove', function(e) {
    // Subtle mouse tracking for hero section
    const hero = document.querySelector('.hero');
    if (hero && e.clientY < window.innerHeight) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const rotateX = (mouseY - 0.5) * 10;
        const rotateY = (mouseX - 0.5) * -10;
        
        const profileContainer = document.querySelector('.profile-image-container');
        if (profileContainer) {
            profileContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    }
});

// Reset transform when mouse leaves hero
document.querySelector('.hero')?.addEventListener('mouseleave', function() {
    const profileContainer = document.querySelector('.profile-image-container');
    if (profileContainer) {
        profileContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
});

// Console welcome message
console.log(`
🚀 Welcome to Devarsh Lade's Portfolio
📧 Contact: Ready to connect!
💼 Status: Civil Engineering Student | Future Entrepreneur
🎯 Vision: Building innovative, sustainable solutions
`);