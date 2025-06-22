module.exports = {
  title: {
    en: "My Blog",
    ru: "Мой Блог", 
    de: "Mein Blog"
  },
  description: {
    en: "A multilingual blog about life and technology",
    ru: "Многоязычный блог о жизни и технологиях",
    de: "Ein mehrsprachiger Blog über Leben und Technologie"
  },
  url: "https://yourdomain.com",
  author: {
    name: "Your Wife's Name",
    email: "email@example.com"
  },
  languages: {
    en: {
      code: "en",
      name: "English",
      flag: "🇺🇸"
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