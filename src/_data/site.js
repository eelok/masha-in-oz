const isProduction = process.env.ELEVENTY_ENV === "production";

module.exports = {
  title: {
    en: "Masha in the land of Oz",
    ru: "Маша в стране Оз", 
    de: "Masha im Lande Oz"
  },
  description: {
    en: "Where fondue meets bortsch",
    ru: "Где фондю встречает борщ",
    de: "Wo Fondue auf Borschtsch trifft"
  },
  url: isProduction ? "https://masha-in-oz.petrius.ch" : "http://localhost:8080",  
  get fullUrl() {
    return this.url + this.baseUrl;
  },
  author: {
    name: "Masha",
    email: "email@example.com"
  },
  analytics: {
    // Google Analytics 4 Configuration
    // Replace with your actual GA4 Measurement ID
    googleAnalytics: {
      measurementId: process.env.GA_MEASUREMENT_ID || "G-XXXXXXXXXX",
      // Optional: Different tracking IDs per environment
      development: process.env.GA_DEV_ID || null,
      production: process.env.GA_PROD_ID || null
    },
    // Privacy and consent settings
    privacy: {
      // Enable GDPR-compliant consent management
      requireConsent: true,
      // Cookie consent banner timeout (in days)
      consentExpiryDays: 365,
      // Analytics-specific privacy settings
      anonymizeIp: true,
      respectDoNotTrack: true,
      // Additional privacy features
      cookielessTracking: false,
      storageType: 'cookies' // 'cookies' or 'localStorage'
    },
    // Custom tracking events configuration
    events: {
      // Track language switches
      trackLanguageSwitch: true,
      // Track scroll depth
      trackScrollDepth: true,
      // Track outbound links
      trackOutboundLinks: true,
      // Track file downloads
      trackDownloads: true
    }
  },
  // Privacy policy and consent management text
  consent: {
    en: {
      title: "Cookie Consent",
      message: "We use cookies to analyze site usage and improve your experience. You can choose which cookies to accept.",
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
    },
    ru: {
      title: "Согласие на использование файлов cookie",
      message: "Мы используем файлы cookie для анализа использования сайта и улучшения вашего опыта. Вы можете выбрать, какие файлы cookie принять.",
      accept: "Принять все",
      reject: "Отклонить все",
      customize: "Настроить",
      necessary: "Необходимые",
      analytics: "Аналитика",
      marketing: "Маркетинг",
      privacyPolicy: "Политика конфиденциальности",
      description: {
        necessary: "Основные файлы cookie, необходимые для работы сайта.",
        analytics: "Помогают нам понять, как посетители взаимодействуют с нашим сайтом.",
        marketing: "Используются для отслеживания посетителей на сайтах в рекламных целях."
      }
    },
    de: {
      title: "Cookie-Einwilligung",
      message: "Wir verwenden Cookies zur Analyse der Website-Nutzung und zur Verbesserung Ihrer Erfahrung. Sie können wählen, welche Cookies Sie akzeptieren möchten.",
      accept: "Alle akzeptieren",
      reject: "Alle ablehnen",
      customize: "Anpassen",
      necessary: "Notwendig",
      analytics: "Analytik",
      marketing: "Marketing",
      privacyPolicy: "Datenschutzrichtlinie",
      description: {
        necessary: "Wesentliche Cookies, die für die grundlegende Website-Funktionalität erforderlich sind.",
        analytics: "Helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.",
        marketing: "Werden verwendet, um Besucher über Websites hinweg für Werbezwecke zu verfolgen."
      }
    }
  },
  languages: {
    en: {
      code: "en",
      name: "English",
      flag: "🇬🇧"
    },
    ru: {
      code: "ru", 
      name: "Русский",
      flag: "🇷🇺"
    },
    de: {
      code: "de",
      name: "Deutsch", 
      flag: "🇩🇪"
    }
  },
  navigation: {
    en: [
      { text: "Home", url: "/en/" },
      { text: "Blog", url: "/en/blog/" },
      { text: "About", url: "/en/about/" }
    ],
    ru: [
      { text: "Главная", url: "/ru/" },
      { text: "Блог", url: "/ru/blog/" },
      { text: "О нас", url: "/ru/about/" }
    ],
    de: [
      { text: "Startseite", url: "/de/" },
      { text: "Blog", url: "/de/blog/" },
      { text: "Über uns", url: "/de/about/" }
    ]
  }
};