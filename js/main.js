// Zhigao Fanke - Main JavaScript
// ================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initIntersectionObserver();
    trackPageMetrics();
});

// ========== Navigation Toggle ==========
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger?.classList.remove('active');
            navbarMenu?.classList.remove('active');
            updateActiveNav(this);
        });
    });
}

// Update active navigation link
function updateActiveNav(currentLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    currentLink.classList.add('active');
}

// ========== Scroll Effects ==========
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }
    });
}

// ========== Intersection Observer for Animations ==========
function initIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);

    // Observe cards on page
    document.querySelectorAll('.feature-card, .model-card, .revenue-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========== Page Metrics & Analytics ==========
function trackPageMetrics() {
    // Track page load time
    window.addEventListener('load', function() {
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time: ' + pageLoadTime + 'ms');
        }
    });

    // Track user engagement
    let lastScrollTime = Date.now();
    window.addEventListener('scroll', function() {
        lastScrollTime = Date.now();
    });

    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Button clicked: ' + this.textContent);
        });
    });
}

// ========== Utility Functions ==========

// Smooth scroll to section
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Set active nav based on current page
function setActiveNavByPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes(currentPage) || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call on page load
setActiveNavByPage();

// ========== Performance Optimization ==========

// Lazy load images (if added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== SEO & Meta Tags ==========

// Update meta tags dynamically if needed
function updateMetaTags(title, description, image) {
    document.title = title;
    updateMetaTag('og:title', title);
    updateMetaTag('description', description);
    updateMetaTag('og:description', description);
    if (image) {
        updateMetaTag('og:image', image);
    }
}

function updateMetaTag(name, content) {
    let tag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        const attrName = name.startsWith('og:') ? 'property' : 'name';
        tag.setAttribute(attrName, name);
        document.head.appendChild(tag);
    }
    tag.content = content;
}

// ========== Mobile Optimization ==========

// Detect if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

console.log('Zhigao Fanke Website Loaded');
