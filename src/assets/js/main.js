/**
 * Multilingual Blog - Main JavaScript
 * Progressive enhancement for burger menu navigation and accessibility
 */

class BurgerMenu {
    constructor() {
        this.burger = document.querySelector('.burger-menu');
        this.nav = document.querySelector('.main-nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.body = document.body;
        
        // Only initialize if elements exist
        if (this.burger && this.nav) {
            this.init();
        }
    }
    
    init() {
        // Bind event listeners
        this.burger.addEventListener('click', (e) => this.toggleMenu(e));
        this.burger.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Close menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Handle escape key
        document.addEventListener('keydown', (e) => this.handleEscape(e));
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Initialize ARIA attributes
        this.setupAccessibility();
    }
    
    setupAccessibility() {
        // Ensure proper ARIA attributes are set
        this.burger.setAttribute('aria-expanded', 'false');
        this.nav.setAttribute('aria-label', 'Main navigation');
        
        // Add role to nav if not present
        if (!this.nav.getAttribute('role')) {
            this.nav.setAttribute('role', 'navigation');
        }
    }
    
    toggleMenu(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const isOpen = this.burger.getAttribute('aria-expanded') === 'true';
        
        if (isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        // Update button state
        this.burger.setAttribute('aria-expanded', 'true');
        this.burger.setAttribute('aria-label', this.getCloseMenuLabel());
        
        // Show navigation
        this.nav.classList.add('nav-open');
        
        // Prevent body scroll on mobile
        this.body.classList.add('menu-open');
        
        // Focus management - focus first nav link
        const firstNavLink = this.nav.querySelector('.nav-link');
        if (firstNavLink) {
            // Small delay to ensure menu is visible
            setTimeout(() => {
                firstNavLink.focus();
            }, 100);
        }
        
        // Announce to screen readers
        this.announceToScreenReader('Menu opened');
    }
    
    closeMenu() {
        // Update button state
        this.burger.setAttribute('aria-expanded', 'false');
        this.burger.setAttribute('aria-label', this.getOpenMenuLabel());
        
        // Hide navigation
        this.nav.classList.remove('nav-open');
        
        // Re-enable body scroll
        this.body.classList.remove('menu-open');
        
        // Return focus to burger button
        this.burger.focus();
        
        // Announce to screen readers
        this.announceToScreenReader('Menu closed');
    }
    
    handleKeydown(event) {
        // Handle Enter and Space keys for burger button
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.toggleMenu(event);
        }
    }
    
    handleEscape(event) {
        // Close menu on Escape key
        if (event.key === 'Escape' && this.nav.classList.contains('nav-open')) {
            event.preventDefault();
            this.closeMenu();
        }
    }
    
    handleOutsideClick(event) {
        // Close menu when clicking outside
        const isOpen = this.burger.getAttribute('aria-expanded') === 'true';
        
        if (isOpen && 
            !this.nav.contains(event.target) && 
            !this.burger.contains(event.target)) {
            this.closeMenu();
        }
    }
    
    handleResize() {
        // Close mobile menu when resizing to desktop
        if (window.innerWidth > 768 && this.nav.classList.contains('nav-open')) {
            this.closeMenu();
        }
    }
    
    getOpenMenuLabel() {
        // Get appropriate label based on page language
        const lang = document.documentElement.lang || 'en';
        const labels = {
            'en': 'Open menu',
            'ru': 'Открыть меню',
            'de': 'Menü öffnen'
        };
        return labels[lang] || labels['en'];
    }
    
    getCloseMenuLabel() {
        // Get appropriate label based on page language
        const lang = document.documentElement.lang || 'en';
        const labels = {
            'en': 'Close menu',
            'ru': 'Закрыть меню',
            'de': 'Menü schließen'
        };
        return labels[lang] || labels['en'];
    }
    
    announceToScreenReader(message) {
        // Create a live region for screen reader announcements
        let announcement = document.getElementById('menu-announcement');
        
        if (!announcement) {
            announcement = document.createElement('div');
            announcement.id = 'menu-announcement';
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.style.position = 'absolute';
            announcement.style.left = '-10000px';
            announcement.style.width = '1px';
            announcement.style.height = '1px';
            announcement.style.overflow = 'hidden';
            document.body.appendChild(announcement);
        }
        
        announcement.textContent = message;
        
        // Clear the announcement after a short delay
        setTimeout(() => {
            announcement.textContent = '';
        }, 1000);
    }
}

/**
 * Smooth Scrolling Enhancement
 */
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Add smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleAnchorClick(e));
        });
    }
    
    handleAnchorClick(event) {
        event.preventDefault();
        
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Calculate offset for fixed header
            const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Focus the target element for accessibility
            targetElement.focus();
        }
    }
}

/**
 * Performance and Accessibility Utilities
 */
class Utils {
    static prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    static isTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    static addLoadingStates() {
        // Add loading states for better perceived performance
        document.body.classList.add('js-enabled');
    }
    
    static handlePrintStyles() {
        // Ensure navigation is visible when printing
        window.addEventListener('beforeprint', () => {
            document.body.classList.add('printing');
        });
        
        window.addEventListener('afterprint', () => {
            document.body.classList.remove('printing');
        });
    }
}

/**
 * Initialize everything when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Multilingual blog with burger menu loaded');
    
    // Add utility classes
    Utils.addLoadingStates();
    Utils.handlePrintStyles();
    
    // Initialize components
    new BurgerMenu();
    new SmoothScroll();
    
    // Add touch device class
    if (Utils.isTouch()) {
        document.body.classList.add('touch-device');
    }
    
    // Handle reduced motion preference
    if (Utils.prefersReducedMotion()) {
        document.body.classList.add('reduced-motion');
    }
});

/**
 * Handle page visibility changes (for better performance)
 */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden - clean up any running processes
        console.log('Page hidden - cleaning up');
    } else {
        // Page is visible - reinitialize if needed
        console.log('Page visible - reinitializing');
    }
});

/**
 * Export classes for potential external use
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BurgerMenu, SmoothScroll, Utils };
}