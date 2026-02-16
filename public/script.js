// ===================================
// EmailJS Configuration
// ===================================

// Initialize EmailJS with your public key
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
(function() {
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init("oSP1cweEPkOXGKP67");
        }
    } catch (error) {
        console.log('EmailJS initialization: ', error.message);
    }
})();

// ===================================
// Particle System for Hero Background
// ===================================

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity * 0.4})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
const particlesArray = [];
const numberOfParticles = 50;

for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
}

// Mouse interaction
let mouse = {
    x: null,
    y: null,
    radius: 150
};

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// Connect particles
function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const opacity = 0.1 * (1 - distance / 120);
                ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Mouse interaction with particles
function handleParticles() {
    particlesArray.forEach(particle => {
        if (mouse.x && mouse.y) {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (mouse.radius - distance) / mouse.radius;
                particle.x -= Math.cos(angle) * force * 3;
                particle.y -= Math.sin(angle) * force * 3;
            }
        }
        particle.update();
        particle.draw();
    });
}

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    connectParticles();
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ===================================
// Smooth Scroll Navigation
// ===================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// ===================================
// Active Link Highlight on Scroll
// ===================================

function highlightActiveSection() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===================================
// Sticky Navbar Effect
// ===================================

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===================================
// Mobile Menu Toggle
// ===================================

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// Scroll Reveal Animation
// ===================================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// ===================================
// Scroll to Top Button
// ===================================

const scrollTopBtn = document.getElementById('scrollTop');

function handleScrollTopButton() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Contact Form Handling with EmailJS
// ===================================

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Keerthiga' // Replace with your name
    };
    
    // Send email using EmailJS
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS IDs
    emailjs.send('service_8t8cgsc', 'template_qdol1mu', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            setLoadingState(false);
        }, function(error) {
            console.log('FAILED...', error);
            showFormMessage('Failed to send message. Please try again or contact me directly.', 'error');
            setLoadingState(false);
        });
});

// Show form message
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Hide message after 5 seconds for success, keep error visible
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
        }, 5000);
    }
}

// Set loading state for submit button
function setLoadingState(isLoading) {
    const submitText = submitBtn.querySelector('.submit-text');
    const submitLoading = submitBtn.querySelector('.submit-loading');
    
    if (isLoading) {
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        submitLoading.style.display = 'flex';
    } else {
        submitBtn.disabled = false;
        submitText.style.display = 'block';
        submitLoading.style.display = 'none';
    }
}

// ===================================
// Enhanced Cursor Trail Effect
// ===================================

let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, timestamp: Date.now() });
    
    // Keep trail limited
    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }
    
    // Create gradient trail
    if (Math.random() > 0.7) {
        createTrailParticle(e.clientX, e.clientY);
    }
});

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 3;
    const hue = 210 + Math.random() * 30; // Blue range
    
    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, hsla(${hue}, 80%, 60%, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        animation: trailFade 1.5s ease-out forwards;
        box-shadow: 0 0 10px hsla(${hue}, 80%, 60%, 0.5);
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1500);
}

// Custom cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

let cursorX = 0, cursorY = 0;
let cursorDotX = 0, cursorDotY = 0;

document.addEventListener('mousemove', (e) => {
    cursorDotX = e.clientX;
    cursorDotY = e.clientY;
});

function animateCursor() {
    cursorX += (cursorDotX - cursorX) * 0.15;
    cursorY += (cursorDotY - cursorY) * 0.15;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorDot.style.left = cursorDotX + 'px';
    cursorDot.style.top = cursorDotY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor interactions
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .contact-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-hover');
    });
});

// Add styles for custom cursor
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .custom-cursor,
    .cursor-dot {
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.2s ease, opacity 0.3s ease;
    }
    
    .custom-cursor {
        width: 40px;
        height: 40px;
        border: 2px solid rgba(59, 130, 246, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        backdrop-filter: blur(2px);
    }
    
    .cursor-dot {
        width: 6px;
        height: 6px;
        background: #3b82f6;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
    }
    
    .custom-cursor.cursor-hover {
        transform: translate(-50%, -50%) scale(1.5);
        border-color: rgba(59, 130, 246, 0.8);
    }
    
    .cursor-dot.cursor-hover {
        transform: translate(-50%, -50%) scale(2);
    }
    
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(0);
        }
    }
    
    @media (max-width: 968px) {
        .custom-cursor,
        .cursor-dot {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyles);

// ===================================
// Parallax Scrolling Effect
// ===================================

function parallaxEffect() {
    const scrolled = window.pageYOffset;
    
    // Parallax for gradient orbs
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = 0.3 + (index * 0.1);
        orb.style.transform = `translate(0, ${scrolled * speed}px)`;
    });
    
    // Parallax for geometric shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.05);
        shape.style.transform += ` translateY(${scrolled * speed}px)`;
    });
    
    // Parallax for floating icons
    const floatIcons = document.querySelectorAll('.float-icon');
    floatIcons.forEach((icon, index) => {
        const speed = 0.15 + (index * 0.03);
        icon.style.transform += ` translateY(${scrolled * speed * 0.5}px)`;
    });
}

// ===================================
// Magnetic Button Effect
// ===================================

const buttons = document.querySelectorAll('.btn, .project-btn, .form-submit');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// ===================================
// Text Reveal Animation on Scroll
// ===================================

const observerOptions2 = {
    threshold: 0.5,
    rootMargin: '0px'
};

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target;
            const letters = text.textContent.split('');
            text.textContent = '';
            
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.style.cssText = `
                    display: inline-block;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: letterReveal 0.5s ease forwards;
                    animation-delay: ${index * 0.03}s;
                `;
                text.appendChild(span);
            });
            
            textObserver.unobserve(text);
        }
    });
}, observerOptions2);

// Add letter reveal animation
const letterRevealStyle = document.createElement('style');
letterRevealStyle.textContent = `
    @keyframes letterReveal {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(letterRevealStyle);

// Observe section titles (optional - uncomment to enable)
// document.querySelectorAll('.section-title').forEach(title => {
//     textObserver.observe(title);
// });

// ===================================
// Project Cards Enhanced Interaction
// ===================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add subtle tilt effect
        this.style.transform = 'translateY(-10px) perspective(1000px) rotateX(2deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// ===================================
// Skill Tags Animation on Hover
// ===================================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        // Random color shift
        const hue = Math.random() * 60 + 200; // Blue range
        this.style.borderColor = `hsl(${hue}, 70%, 50%)`;
        this.style.color = `hsl(${hue}, 70%, 70%)`;
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.borderColor = '';
        this.style.color = '';
    });
});

// ===================================
// Stats Counter Animation
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    
    const aboutSection = document.getElementById('about');
    const aboutTop = aboutSection.getBoundingClientRect().top;
    
    if (aboutTop < window.innerHeight - 200) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            animateCounter(stat, target, 1500);
        });
        statsAnimated = true;
    }
}

// ===================================
// Form Input Focus Effects
// ===================================

const formInputs = document.querySelectorAll('.form-input, .form-textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateX(5px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = '';
    });
});

// ===================================
// Initialize Intersection Observer for Better Performance
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// ===================================
// Event Listeners
// ===================================

// Scroll events with throttling for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        highlightActiveSection();
        handleNavbarScroll();
        handleScrollTopButton();
        revealOnScroll();
        animateStats();
        parallaxEffect();
    });
});

// Initial calls
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    highlightActiveSection();
    
    // Add loaded class to body for initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Prevent default behavior for download resume button
// You can update this to link to your actual resume file
const downloadResumeBtn = document.querySelector('.btn-secondary[download]');
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
        // Uncomment and update the href when you have a resume file
        // e.preventDefault();
        // window.open('path/to/your/resume.pdf', '_blank');
        
        console.log('Resume download clicked - Add your resume file path');
    });
}

// ===================================
// Performance Optimization
// ===================================

// Debounce function for resize events
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

// Handle window resize
const handleResize = debounce(() => {
    // Reset mobile menu on resize
    if (window.innerWidth > 968) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}, 250);

window.addEventListener('resize', handleResize);

// ===================================
// Accessibility Enhancements
// ===================================

// Keyboard navigation for project cards
projectCards.forEach(card => {
    const link = card.querySelector('.project-link');
    if (link) {
        link.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    }
});

// Skip to main content (optional)
const skipLink = document.createElement('a');
skipLink.href = '#about';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent-primary);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 10000;
    border-radius: 0 0 4px 0;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ===================================
// Console Welcome Message
// ===================================

console.log('%c👋 Hello, Developer!', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to my portfolio. Feel free to explore the code!', 'color: #60a5fa; font-size: 14px;');
console.log('%c📧 Contact: keerthiga020@gmail.com', 'color: #9ca3af; font-size: 12px;');

// ===================================
// Error Handling
// ===================================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You can add custom error handling here
});

// ===================================
// Service Worker Registration (Optional - for PWA)
// ===================================

// Uncomment to enable service worker for offline functionality
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}
*/
