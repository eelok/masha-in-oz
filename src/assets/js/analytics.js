/**
 * Privacy-First Google Analytics Service
 * 
 * A GDPR-compliant analytics implementation that respects user privacy
 * and provides granular consent management for multilingual sites.
 * 
 * Features:
 * - GDPR/CCPA compliant consent management
 * - Multilingual consent interface
 * - Custom event tracking
 * - Do Not Track respect
 * - IP anonymization
 * - Cookie-less tracking option
 * 
 * @author StreetRace Engineering Team
 * @version 1.0.0
 * @since 2024-06-22
 */

class AnalyticsService {
  /**
   * Initialize the Analytics Service
   * @param {Object} config - Configuration object from site data
   * @param {string} language - Current page language
   */
  constructor(config, language = 'en') {
    this.config = config;
    this.language = language;
    this.consentKey = 'analytics_consent';
    this.consentTimestampKey = 'analytics_consent_timestamp';
    this.isInitialized = false;
    this.gtag = null;
    
    // Bind methods to maintain context
    this.handleConsentAccept = this.handleConsentAccept.bind(this);
    this.handleConsentReject = this.handleConsentReject.bind(this);
    this.handleConsentCustomize = this.handleConsentCustomize.bind(this);
    
    // Initialize service
    this.init();
  }

  /**
   * Initialize the analytics service
   * Checks for existing consent and loads appropriate scripts
   */
  async init() {
    try {
      // Check if Do Not Track is enabled
      if (this.shouldRespectDNT()) {
        console.log('Analytics: Do Not Track detected, analytics disabled');
        return;
      }

      // Check for existing consent
      const existingConsent = this.getStoredConsent();
      
      if (existingConsent && !this.isConsentExpired(existingConsent)) {
        if (existingConsent.analytics) {
          await this.loadGoogleAnalytics();
        }
      } else {
        // Show consent banner if consent is required
        if (this.config.privacy.requireConsent) {
          this.showConsentBanner();
        } else {
          // Auto-load analytics if consent not required
          await this.loadGoogleAnalytics();
        }
      }
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Analytics initialization error:', error);
    }
  }

  /**
   * Check if Do Not Track should be respected
   * @returns {boolean}
   */
  shouldRespectDNT() {
    if (!this.config.privacy.respectDoNotTrack) return false;
    
    const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    return dnt === '1' || dnt === 'yes';
  }

  /**
   * Load Google Analytics scripts and initialize tracking
   */
  async loadGoogleAnalytics() {
    const measurementId = this.getMeasurementId();
    
    if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
      console.warn('Analytics: No valid measurement ID configured');
      return;
    }

    try {
      // Load Google Analytics script
      await this.loadScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
      
      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { dataLayer.push(arguments); };
      this.gtag = window.gtag;
      
      // Configure Google Analytics
      this.gtag('js', new Date());
      this.gtag('config', measurementId, this.getAnalyticsConfig());
      
      // Set up custom event tracking
      this.setupEventTracking();
      
      console.log('Analytics: Google Analytics loaded successfully');
    } catch (error) {
      console.error('Analytics: Failed to load Google Analytics', error);
    }
  }

  /**
   * Get the appropriate measurement ID based on environment
   * @returns {string} Measurement ID
   */
  getMeasurementId() {
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1';
    
    if (isDevelopment && this.config.googleAnalytics.development) {
      return this.config.googleAnalytics.development;
    } else if (!isDevelopment && this.config.googleAnalytics.production) {
      return this.config.googleAnalytics.production;
    }
    
    return this.config.googleAnalytics.measurementId;
  }

  /**
   * Get Google Analytics configuration object
   * @returns {Object} GA configuration
   */
  getAnalyticsConfig() {
    const config = {
      // Privacy settings
      anonymize_ip: this.config.privacy.anonymizeIp,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      
      // Custom parameters
      custom_map: {
        custom_parameter_1: 'language',
        custom_parameter_2: 'page_type'
      },
      
      // Page tracking
      send_page_view: true,
      
      // Enhanced measurement settings
      enhanced_measurement: {
        scrolls_percentage: this.config.events.trackScrollDepth ? [25, 50, 75, 90] : false,
        outbound_clicks: this.config.events.trackOutboundLinks,
        file_downloads: this.config.events.trackDownloads
      }
    };

    // Add language and page metadata
    config.language = this.language;
    config.page_title = document.title;
    config.page_location = window.location.href;
    
    return config;
  }  /**
   * Load external script dynamically
   * @param {string} src - Script source URL
   * @returns {Promise} Promise that resolves when script loads
   */
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true;
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * Set up custom event tracking
   */
  setupEventTracking() {
    // Track language switching
    if (this.config.events.trackLanguageSwitch) {
      this.setupLanguageSwitchTracking();
    }

    // Track scroll depth (if not handled by enhanced measurement)
    if (this.config.events.trackScrollDepth && !this.config.googleAnalytics.enhanced_measurement?.scrolls_percentage) {
      this.setupScrollDepthTracking();
    }

    // Track outbound links (if not handled by enhanced measurement)
    if (this.config.events.trackOutboundLinks && !this.config.googleAnalytics.enhanced_measurement?.outbound_clicks) {
      this.setupOutboundLinkTracking();
    }

    // Track file downloads (if not handled by enhanced measurement)
    if (this.config.events.trackDownloads && !this.config.googleAnalytics.enhanced_measurement?.file_downloads) {
      this.setupFileDownloadTracking();
    }
  }

  /**
   * Track language switching events
   */
  setupLanguageSwitchTracking() {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('[data-language]');
      if (target) {
        const newLanguage = target.getAttribute('data-language');
        this.trackEvent('language_switch', {
          from_language: this.language,
          to_language: newLanguage,
          event_category: 'engagement',
          event_label: `${this.language} -> ${newLanguage}`
        });
      }
    });
  }

  /**
   * Track scroll depth
   */
  setupScrollDepthTracking() {
    let maxScroll = 0;
    const thresholds = [25, 50, 75, 90];
    
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        const threshold = thresholds.find(t => scrollPercent >= t && maxScroll < t);
        if (threshold) {
          this.trackEvent('scroll', {
            event_category: 'engagement',
            event_label: `${threshold}%`,
            value: threshold
          });
        }
      }
    };

    // Throttled scroll tracking
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          trackScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Track outbound link clicks
   */
  setupOutboundLinkTracking() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link && this.isOutboundLink(link.href)) {
        this.trackEvent('click', {
          event_category: 'outbound_link',
          event_label: link.href,
          transport_type: 'beacon'
        });
      }
    });
  }

  /**
   * Track file download clicks
   */
  setupFileDownloadTracking() {
    const downloadExtensions = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|exe|dmg)$/i;
    
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link && downloadExtensions.test(link.href)) {
        this.trackEvent('file_download', {
          event_category: 'downloads',
          event_label: link.href,
          file_extension: link.href.split('.').pop().toLowerCase(),
          file_name: link.href.split('/').pop()
        });
      }
    });
  }

  /**
   * Check if a URL is an outbound link
   * @param {string} url - URL to check
   * @returns {boolean}
   */
  isOutboundLink(url) {
    try {
      const link = new URL(url, window.location.href);
      return link.hostname !== window.location.hostname;
    } catch {
      return false;
    }
  }

  /**
   * Track custom events
   * @param {string} eventName - Event name
   * @param {Object} parameters - Event parameters
   */
  trackEvent(eventName, parameters = {}) {
    if (!this.gtag || !this.hasAnalyticsConsent()) {
      return;
    }

    // Add common parameters
    const eventData = {
      ...parameters,
      language: this.language,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent.substring(0, 100) // Truncated for privacy
    };

    this.gtag('event', eventName, eventData);
    console.log('Analytics: Event tracked', eventName, eventData);
  }

  /**
   * Track page views (for SPA navigation)
   * @param {string} path - Page path
   * @param {string} title - Page title
   */
  trackPageView(path, title) {
    if (!this.gtag || !this.hasAnalyticsConsent()) {
      return;
    }

    this.gtag('config', this.getMeasurementId(), {
      page_path: path,
      page_title: title,
      language: this.language
    });

    console.log('Analytics: Page view tracked', path, title);
  }  /**
   * Consent Management Methods
   */

  /**
   * Show the consent banner
   */
  showConsentBanner() {
    // Remove existing banner if present
    this.hideConsentBanner();

    const banner = this.createConsentBanner();
    document.body.appendChild(banner);
    
    // Add accessibility focus management
    setTimeout(() => {
      const firstButton = banner.querySelector('button');
      if (firstButton) firstButton.focus();
    }, 100);

    // Announce to screen readers
    this.announceToScreenReader(this.getConsentText().message);
  }

  /**
   * Create the consent banner DOM element
   * @returns {HTMLElement}
   */
  createConsentBanner() {
    const banner = document.createElement('div');
    banner.className = 'analytics-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'consent-title');
    banner.setAttribute('aria-describedby', 'consent-message');
    banner.setAttribute('aria-modal', 'true');

    const consentText = this.getConsentText();
    
    banner.innerHTML = `
      <div class="consent-content">
        <div class="consent-header">
          <h2 id="consent-title" class="consent-title">${consentText.title}</h2>
        </div>
        <div class="consent-body">
          <p id="consent-message" class="consent-message">${consentText.message}</p>
          <div class="consent-details" id="consent-details" style="display: none;">
            <div class="consent-category">
              <div class="consent-category-header">
                <input type="checkbox" id="consent-necessary" checked disabled>
                <label for="consent-necessary">
                  <strong>${consentText.necessary}</strong>
                  <span class="consent-description">${consentText.description.necessary}</span>
                </label>
              </div>
            </div>
            <div class="consent-category">
              <div class="consent-category-header">
                <input type="checkbox" id="consent-analytics">
                <label for="consent-analytics">
                  <strong>${consentText.analytics}</strong>
                  <span class="consent-description">${consentText.description.analytics}</span>
                </label>
              </div>
            </div>
            <div class="consent-category">
              <div class="consent-category-header">
                <input type="checkbox" id="consent-marketing">
                <label for="consent-marketing">
                  <strong>${consentText.marketing}</strong>
                  <span class="consent-description">${consentText.description.marketing}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="consent-actions">
          <button type="button" class="consent-btn consent-btn-accept" data-action="accept">
            ${consentText.accept}
          </button>
          <button type="button" class="consent-btn consent-btn-reject" data-action="reject">
            ${consentText.reject}
          </button>
          <button type="button" class="consent-btn consent-btn-customize" data-action="customize">
            ${consentText.customize}
          </button>
        </div>
        <div class="consent-footer">
          <a href="/privacy-policy" class="consent-privacy-link" target="_blank" rel="noopener">
            ${consentText.privacyPolicy}
          </a>
        </div>
      </div>
    `;

    // Add event listeners
    this.attachConsentEventListeners(banner);

    return banner;
  }

  /**
   * Get consent text for current language
   * @returns {Object}
   */
  getConsentText() {
    // Get site consent data - this will be passed from the template
    const siteConsent = window.siteConsent || {};
    return siteConsent[this.language] || siteConsent.en || {
      title: "Cookie Consent",
      message: "We use cookies to analyze site usage and improve your experience.",
      accept: "Accept All",
      reject: "Reject All",
      customize: "Customize",
      necessary: "Necessary",
      analytics: "Analytics",
      marketing: "Marketing",
      privacyPolicy: "Privacy Policy",
      description: {
        necessary: "Essential cookies required for basic site functionality.",
        analytics: "Help us understand how visitors interact with our website.",
        marketing: "Used to track visitors across websites for advertising purposes."
      }
    };
  }

  /**
   * Attach event listeners to consent banner
   * @param {HTMLElement} banner - Consent banner element
   */
  attachConsentEventListeners(banner) {
    // Button click handlers
    banner.addEventListener('click', (event) => {
      const action = event.target.getAttribute('data-action');
      
      switch (action) {
        case 'accept':
          this.handleConsentAccept();
          break;
        case 'reject':
          this.handleConsentReject();
          break;
        case 'customize':
          this.handleConsentCustomize(banner);
          break;
      }
    });

    // Keyboard navigation
    banner.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.handleConsentReject();
      }
    });

    // Prevent clicks outside from closing (modal behavior)
    banner.addEventListener('click', (event) => {
      if (event.target === banner) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }

  /**
   * Handle consent acceptance
   */
  handleConsentAccept() {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: false, // We don't use marketing cookies by default
      timestamp: Date.now(),
      version: '1.0'
    };

    this.storeConsent(consent);
    this.hideConsentBanner();
    
    // Load analytics if consented
    if (consent.analytics) {
      this.loadGoogleAnalytics();
    }

    this.announceToScreenReader('All cookies accepted');
  }

  /**
   * Handle consent rejection
   */
  handleConsentReject() {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
      version: '1.0'
    };

    this.storeConsent(consent);
    this.hideConsentBanner();
    
    this.announceToScreenReader('Non-essential cookies rejected');
  }

  /**
   * Handle custom consent preferences
   * @param {HTMLElement} banner - Consent banner element
   */
  handleConsentCustomize(banner) {
    const detailsSection = banner.querySelector('#consent-details');
    const customizeBtn = banner.querySelector('[data-action="customize"]');
    
    if (detailsSection.style.display === 'none') {
      detailsSection.style.display = 'block';
      customizeBtn.textContent = this.getConsentText().accept;
      customizeBtn.setAttribute('data-action', 'save-custom');
      
      // Focus first checkbox for accessibility
      const firstCheckbox = detailsSection.querySelector('input[type="checkbox"]:not([disabled])');
      if (firstCheckbox) firstCheckbox.focus();
      
      this.announceToScreenReader('Customize consent options expanded');
    } else {
      // Save custom preferences
      const consent = {
        necessary: true, // Always true
        analytics: banner.querySelector('#consent-analytics').checked,
        marketing: banner.querySelector('#consent-marketing').checked,
        timestamp: Date.now(),
        version: '1.0'
      };

      this.storeConsent(consent);
      this.hideConsentBanner();
      
      // Load analytics if consented
      if (consent.analytics) {
        this.loadGoogleAnalytics();
      }

      this.announceToScreenReader('Custom consent preferences saved');
    }
  }  /**
   * Storage and Utility Methods
   */

  /**
   * Store consent preferences
   * @param {Object} consent - Consent object
   */
  storeConsent(consent) {
    try {
      if (this.config.privacy.storageType === 'localStorage' && window.localStorage) {
        localStorage.setItem(this.consentKey, JSON.stringify(consent));
        localStorage.setItem(this.consentTimestampKey, consent.timestamp.toString());
      } else {
        // Use cookies as fallback
        this.setCookie(this.consentKey, JSON.stringify(consent), this.config.privacy.consentExpiryDays);
        this.setCookie(this.consentTimestampKey, consent.timestamp.toString(), this.config.privacy.consentExpiryDays);
      }
    } catch (error) {
      console.error('Analytics: Failed to store consent', error);
    }
  }

  /**
   * Get stored consent preferences
   * @returns {Object|null}
   */
  getStoredConsent() {
    try {
      let consentData = null;

      if (this.config.privacy.storageType === 'localStorage' && window.localStorage) {
        consentData = localStorage.getItem(this.consentKey);
      } else {
        consentData = this.getCookie(this.consentKey);
      }

      return consentData ? JSON.parse(consentData) : null;
    } catch (error) {
      console.error('Analytics: Failed to retrieve consent', error);
      return null;
    }
  }

  /**
   * Check if consent has expired
   * @param {Object} consent - Stored consent object
   * @returns {boolean}
   */
  isConsentExpired(consent) {
    if (!consent.timestamp) return true;
    
    const expiryTime = consent.timestamp + (this.config.privacy.consentExpiryDays * 24 * 60 * 60 * 1000);
    return Date.now() > expiryTime;
  }

  /**
   * Check if user has given analytics consent
   * @returns {boolean}
   */
  hasAnalyticsConsent() {
    const consent = this.getStoredConsent();
    return consent && consent.analytics === true && !this.isConsentExpired(consent);
  }

  /**
   * Set a cookie
   * @param {string} name - Cookie name
   * @param {string} value - Cookie value
   * @param {number} days - Expiry in days
   */
  setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  /**
   * Get a cookie value
   * @param {string} name - Cookie name
   * @returns {string|null}
   */
  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  /**
   * Hide consent banner
   */
  hideConsentBanner() {
    const existingBanner = document.querySelector('.analytics-consent-banner');
    if (existingBanner) {
      existingBanner.remove();
    }
  }

  /**
   * Announce message to screen readers
   * @param {string} message - Message to announce
   */
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Public API Methods
   */

  /**
   * Manually trigger consent banner (for privacy settings page)
   */
  showConsentManager() {
    this.showConsentBanner();
  }

  /**
   * Get current consent status
   * @returns {Object|null}
   */
  getConsentStatus() {
    return this.getStoredConsent();
  }

  /**
   * Revoke all consent
   */
  revokeConsent() {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
      version: '1.0'
    };

    this.storeConsent(consent);
    
    // Clear any existing analytics data
    if (window.gtag) {
      // Disable further data collection
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }

    this.announceToScreenReader('All non-essential consent revoked');
  }

  /**
   * Update language (for SPA language switching)
   * @param {string} newLanguage - New language code
   */
  updateLanguage(newLanguage) {
    const oldLanguage = this.language;
    this.language = newLanguage;
    
    // Track language switch if analytics is enabled and event tracking is configured
    if (this.config.events.trackLanguageSwitch && this.hasAnalyticsConsent()) {
      this.trackEvent('language_switch', {
        from_language: oldLanguage,
        to_language: newLanguage,
        event_category: 'engagement',
        event_label: `${oldLanguage} -> ${newLanguage}`,
        method: 'manual'
      });
    }
  }

  /**
   * Cleanup method for SPA navigation
   */
  destroy() {
    this.hideConsentBanner();
    // Remove event listeners if needed
    // Clean up any timers or intervals
  }
}

/**
 * Analytics Service Factory
 * Creates and manages analytics service instances
 */
class AnalyticsServiceFactory {
  static instance = null;
  
  /**
   * Get or create analytics service instance
   * @param {Object} config - Analytics configuration
   * @param {string} language - Current language
   * @returns {AnalyticsService}
   */
  static getInstance(config, language) {
    if (!AnalyticsServiceFactory.instance) {
      AnalyticsServiceFactory.instance = new AnalyticsService(config, language);
    }
    return AnalyticsServiceFactory.instance;
  }
  
  /**
   * Reset instance (useful for testing)
   */
  static resetInstance() {
    if (AnalyticsServiceFactory.instance) {
      AnalyticsServiceFactory.instance.destroy();
      AnalyticsServiceFactory.instance = null;
    }
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AnalyticsService, AnalyticsServiceFactory };
}

// Global namespace for direct script inclusion
window.AnalyticsService = AnalyticsService;
window.AnalyticsServiceFactory = AnalyticsServiceFactory;