# Multilingual Blog with Eleventy

A modern, multilingual blog built with [Eleventy](https://11ty.dev) supporting English, Russian, and German languages.

## Features

- **Multilingual Support**: Content in English, Russian, and German
- **Responsive Burger Menu**: Mobile-first navigation with accessibility support
- **Clean, Modern Design**: Responsive CSS with Inter font
- **SEO Optimized**: Open Graph and Twitter Card meta tags
- **Featured Images**: Support for blog post featured images
- **Language Switching**: Easy navigation between language versions
- **Markdown Support**: Write posts in Markdown with front matter
- **Automatic Collections**: Language-specific post collections
- **Social Media Ready**: Proper meta tags for sharing
- **Accessibility First**: WCAG 2.1 AA compliant navigation and interactions
- **Progressive Enhancement**: Works without JavaScript, enhanced with JS

## Project Structure

```
multilingual-blog/
├── src/
│   ├── _data/           # Global data files
│   ├── _includes/       # Templates and partials
│   │   ├── layouts/     # Page layouts
│   │   └── partials/    # Reusable components
│   ├── assets/          # Static assets
│   │   ├── css/         # Stylesheets
│   │   ├── js/          # JavaScript files
│   │   └── images/      # Images and graphics
│   ├── pages/           # Static pages for each language
│   │   ├── en/          # English pages
│   │   ├── ru/          # Russian pages
│   │   └── de/          # German pages
│   └── posts/           # Blog posts
│       ├── en/          # English posts
│       ├── ru/          # Russian posts
│       └── de/          # German posts
├── _site/               # Generated site (build output)
├── .eleventy.js         # Eleventy configuration
└── package.json         # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd multilingual-blog
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

```bash
npm run build
```

The generated site will be in the `_site` directory.

## Navigation System

### Responsive Burger Menu

The site features a modern, accessible burger menu that automatically adapts to different screen sizes:

- **Desktop**: Traditional horizontal navigation with language flags
- **Mobile**: Collapsible burger menu with full navigation and language selection
- **Accessibility**: Full keyboard navigation, screen reader support, and ARIA attributes
- **Progressive Enhancement**: Works without JavaScript, enhanced with smooth animations when JS is available

### Navigation Features

- **Multilingual Labels**: Menu buttons show appropriate text based on the current language
- **Keyboard Support**: Full keyboard navigation with Enter, Space, and Escape key support
- **Screen Reader Support**: Proper ARIA attributes and live region announcements
- **Focus Management**: Logical focus flow and visual focus indicators
- **Touch-Friendly**: Optimized for mobile and touch devices

## Creating Content

### Writing Blog Posts

Blog posts are written in Markdown with YAML front matter. Create your posts in the appropriate language directory:

- English: `src/posts/en/`
- Russian: `src/posts/ru/`
- German: `src/posts/de/`

#### Example Post with Featured Image

```markdown
---
title: "Your Post Title"
date: 2024-06-22
lang: en
layout: layouts/post.njk
tags: ["tag1", "tag2", "tag3"]
description: "A brief description of your post"
featured_image: "/assets/images/your-image.jpg"
featured_image_alt: "Alternative text for your image"
---

# Your Post Content

Write your post content here in Markdown.

![Image description](/assets/images/your-image.jpg)

Your post can include images, links, and all standard Markdown formatting.
```

#### Required Front Matter Fields

- `title`: The post title
- `date`: Publication date (YYYY-MM-DD format)
- `lang`: Language code (en, ru, or de)
- `layout`: Template to use (usually `layouts/post.njk`)
- `description`: SEO description for the post

#### Optional Front Matter Fields

- `tags`: Array of tags for categorization
- `featured_image`: Path to the featured image
- `featured_image_alt`: Alt text for the featured image

### Adding Images

1. Place your images in `src/assets/images/`
2. Reference them in your posts using `/assets/images/filename.ext`
3. The build process will automatically copy them to the output directory

## Configuration

### Site Configuration

Edit `src/_data/site.js` to update site-wide settings:

```javascript
module.exports = {
  title: {
    en: "My Blog",
    ru: "Мой блог",
    de: "Mein Blog"
  },
  description: {
    en: "A multilingual blog",
    ru: "Многоязычный блог",
    de: "Ein mehrsprachiger Blog"
  },
  url: "https://yourdomain.com",
  author: {
    name: "Your Name",
    email: "your.email@example.com"
  },
  languages: {
    en: {
      name: "English",
      flag: "🇺🇸"
    },
    ru: {
      name: "Русский",
      flag: "🇷🇺"
    },
    de: {
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
    // ... other languages
  }
};
```

### Eleventy Configuration

The `.eleventy.js` file contains:

- Custom filters for date formatting and content processing
- Language-specific collections
- Asset copying configuration
- Markdown processing setup

#### Available Filters

- `readableDate`: Format dates for display
- `localizedDate`: Format dates with locale-specific formatting
- `htmlDateString`: Format dates for HTML datetime attributes
- `currentYear`: Get the current year
- `limit`: Limit array items
- `excerpt`: Create post excerpts

## Styling

The site uses modern CSS with CSS custom properties (variables) for easy theming. The main stylesheet is located at `src/assets/css/main.css`.

### Key CSS Features

- **Mobile-First Responsive Design**: Progressive enhancement approach
- **CSS Custom Properties**: Consistent design system with CSS variables
- **Burger Menu Animations**: Smooth, accessible transitions
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Reduced Motion Support**: Respects user motion preferences
- **Clean Typography**: Inter font with proper contrast ratios

### CSS Architecture

- **Component-Based**: Modular, maintainable CSS structure
- **BEM-Inspired**: Clear naming conventions for CSS classes
- **Performance Optimized**: Minimal, semantic CSS
- **Accessibility First**: Focus states, contrast ratios, and screen reader support

## JavaScript Features

The site uses progressive enhancement with vanilla JavaScript:

### Burger Menu (`BurgerMenu` class)
- **Accessibility**: Full ARIA support and keyboard navigation
- **Screen Reader Support**: Live region announcements
- **Focus Management**: Proper focus flow and restoration
- **Event Handling**: Click, keyboard, and resize event handling

### Smooth Scrolling (`SmoothScroll` class)
- **Anchor Links**: Smooth scrolling to page sections
- **Header Offset**: Accounts for fixed header height
- **Accessibility**: Focus management for scrolled-to elements

### Utilities (`Utils` class)
- **Performance**: Loading states and print handling
- **Accessibility**: Motion preference detection
- **Device Detection**: Touch device support

## Deployment

### Building

```bash
npm run build
```

### Hosting Options

The generated static site in `_site/` can be deployed to:

- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Environment Variables

For production deployment, update the `site.url` in `src/_data/site.js` to your actual domain.

## Accessibility

This blog is built with accessibility as a first-class citizen:

### Navigation Accessibility
- **ARIA Attributes**: Proper labeling and state management
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Meaningful announcements and descriptions
- **Focus Management**: Clear focus indicators and logical flow

### Content Accessibility
- **Semantic HTML**: Proper heading hierarchy and landmark roles
- **Color Contrast**: WCAG 2.1 AA compliant color combinations
- **Alternative Text**: Required alt text for all images
- **Language Attributes**: Proper language identification for screen readers

### Technical Accessibility
- **Progressive Enhancement**: Core functionality without JavaScript
- **Reduced Motion**: Respects user motion preferences
- **High Contrast**: Support for high contrast mode
- **Zoom Support**: Layout remains functional at 200% zoom

## Customization

### Adding a New Language

1. Add the language to `src/_data/site.js`
2. Create language-specific directories:
   - `src/pages/[lang]/`
   - `src/posts/[lang]/`
3. Update `.eleventy.js` to add a collection for the new language
4. Create navigation files for the language
5. Translate static content and navigation labels

### Modifying the Design

- Edit `src/assets/css/main.css` for styling changes
- Modify templates in `src/_includes/layouts/` and `src/_includes/partials/`
- Update fonts by changing the Google Fonts import in the base layout

### Adding Features

The Eleventy configuration supports:

- Additional filters and shortcodes
- Custom collections
- Plugin integration
- Advanced Markdown processing

## Troubleshooting

### Common Issues

1. **Build Errors**: Check for syntax errors in front matter YAML
2. **Missing Images**: Ensure image paths start with `/assets/images/`
3. **Language Switching**: Verify language codes match in all configuration files
4. **Date Formatting**: Use YYYY-MM-DD format for post dates
5. **Navigation Issues**: Check JavaScript console for errors and verify HTML structure

### Development Tips

- Use `npm start` for development with hot reloading
- Check the browser console for JavaScript errors
- Validate your Markdown syntax
- Test language switching functionality
- Test navigation with keyboard only
- Verify accessibility with screen reader software

## Performance

### Optimization Features
- **Static Generation**: Pre-built HTML for optimal loading times
- **Minimal JavaScript**: Only essential JavaScript for functionality
- **CSS Variables**: Efficient styling with custom properties
- **Progressive Enhancement**: Core functionality without JavaScript
- **Image Optimization**: Responsive images with proper sizing

### Best Practices
- **Lazy Loading**: Images load as needed
- **Caching**: Static assets are cacheable
- **Minification**: CSS and JavaScript are optimized for production
- **Web Fonts**: Optimized font loading with font-display: swap

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (including accessibility)
5. Submit a pull request

### Testing Checklist
- [ ] Test on mobile and desktop
- [ ] Verify keyboard navigation
- [ ] Check with screen reader
- [ ] Validate HTML and CSS
- [ ] Test in multiple browsers
- [ ] Verify multilingual functionality

## License

MIT License - feel free to use this project as a template for your own multilingual blog.

## Support

For questions or issues, please check the [Eleventy documentation](https://11ty.dev/docs/) or create an issue in this repository.