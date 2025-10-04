// Sistema de carga dinámica para Estampados Fusion Cali
// Basado en la estructura de cfernandez-web

// Función para cargar secciones dinámicamente
async function loadSection(sectionName, containerId) {
    try {
        const response = await fetch(`sections/${sectionName}.html`);
        if (!response.ok) {
            throw new Error(`Error loading ${sectionName}: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading section ${sectionName}:`, error);
        document.getElementById(containerId).innerHTML = `<p>Error cargando la sección ${sectionName}</p>`;
    }
}

// Función para cargar todas las secciones
async function loadAllSections() {
    const sections = [
        { name: 'header', container: 'header-container' },
        { name: 'navigation', container: 'navigation-container' },
        { name: 'hero', container: 'hero-container' },
        { name: 'choose-garment', container: 'choose-garment-container' },
        { name: 'services', container: 'services-container' },
        { name: 'gallery', container: 'gallery-container' },
        { name: 'contact', container: 'contact-container' },
        { name: 'sublim-gran-formato', container: 'sublim-gran-formato-container' },
        { name: 'footer', container: 'footer-container' }
    ];

    // Cargar todas las secciones en paralelo
    await Promise.all(sections.map(section => 
        loadSection(section.name, section.container)
    ));
}

// Función para ocultar el loading indicator
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    const mainContent = document.getElementById('main-content');
    
    if (loadingIndicator) {
        loadingIndicator.style.opacity = '0';
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
            if (mainContent) {
                mainContent.style.opacity = '1';
            }
        }, 300);
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Cargar todas las secciones
        await loadAllSections();
        
        // Ocultar loading indicator
        hideLoadingIndicator();
        
        // Inicializar funcionalidades después de cargar las secciones
        initializeFeatures();
        
    } catch (error) {
        console.error('Error initializing application:', error);
        hideLoadingIndicator();
    }
});

// Función para inicializar todas las funcionalidades
function initializeFeatures() {
    // Mobile Navigation Toggle
    initializeMobileNavigation();
    
    // Smooth Scrolling
    initializeSmoothScrolling();
    
    // Scroll Animations
    initializeScrollAnimations();
    
    // Header Background on Scroll
    initializeHeaderScroll();
    
    // Gallery Hover Effects
    initializeGalleryEffects();
    
    // Button Click Effects
    initializeButtonEffects();
    
    // Typing Animation
    initializeTypingAnimation();
    
    // Dropdown Menu
    initializeDropdownMenu();
    
    // Active Navigation
    initializeActiveNavigation();
}

// Mobile Navigation Toggle
function initializeMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animation
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Header Background on Scroll
function initializeHeaderScroll() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#fff';
                header.style.backdropFilter = 'none';
            }
        }
    });
}

// Gallery Image Hover Effects
function initializeGalleryEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Button Click Effects
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Typing Animation for Hero Text
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
}

// Dropdown Menu
function initializeDropdownMenu() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdown && dropdownMenu) {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownMenu.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        });
    }
}

// Active Navigation
function initializeActiveNavigation() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add CSS for loading indicator and animations
const style = document.createElement('style');
style.textContent = `
    .loading-indicator {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loading-indicator p {
        color: white;
        font-size: 1.2rem;
        font-weight: 500;
    }
    
    .app-container {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .btn-primary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #e74c3c !important;
        font-weight: 600;
    }
    
    .fade-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
