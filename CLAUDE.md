# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual travel blog built with Eleventy (11ty) that supports English, Russian, and German. The blog features posts about travel experiences in Switzerland, with images and embedded maps from Komoot.

## Development Commands

### Core Commands
- `npm start` - Start development server with Sass watching and hot reload on port 8080
- `npm run build` - Build for production (sets ELEVENTY_ENV=production)
- `npm run debug` - Run Eleventy with debug output

### Sass/CSS Commands
- `npm run sass:dev` - Compile Sass with expanded style and source maps
- `npm run sass:build` - Compile Sass for production (compressed, no source maps)
- `npm run sass:watch` - Watch Sass files and recompile on changes

### Utility Commands
- `npm run clean` - Remove build artifacts (_site, compiled CSS)

## Architecture

### File Structure
- `src/` - Source files for the site
- `src/_data/site.js` - Global site configuration (titles, navigation, analytics)
- `src/_includes/` - Nunjucks templates and partials
- `src/[lang]/` - Language-specific content (en, ru, de)
- `src/[lang]/posts/` - Blog posts organized by date (YYYY/MM/DD/)
- `src/assets/` - Static assets (images, CSS, JS)
- `src/assets/scss/` - Sass source files

### Key Components
- **Multilingual Support**: Content organized by language with collections for each
- **Date-based Organization**: Posts organized in folders by date (YYYY/MM/DD)
- **Sass Architecture**: Modular SCSS with abstracts, base, components, themes, utilities
- **Custom Shortcodes**: `youtube` and `komootembed` for embedding content
- **Analytics**: Google Analytics 4 integration with GDPR consent management

### Template Engine
- Uses Nunjucks (.njk) templates
- Markdown posts with YAML front matter
- Custom filters for date formatting and content processing

## Content Creation

### Blog Post Structure
Posts are located in `src/[lang]/posts/YYYY/MM/DD/` and require:
- `title` - Post title
- `date` - Publication date (YYYY-MM-DD)
- `lang` - Language code (en, ru, de)
- `layout` - Usually `layouts/post.njk`
- `description` - SEO description

### Image Organization
Images are stored in `src/assets/images/YYYY/MM/DD/` matching the post date structure.

### Shortcodes Available
- `{% youtube "video_id", "title" %}` - Embed YouTube videos
- `{% komootembed "tour_id", "token", "title" %}` - Embed Komoot tours

## Configuration Files

### Site Configuration (`src/_data/site.js`)
- Titles and descriptions for each language
- Navigation menus per language
- Analytics configuration (Google Analytics 4)
- GDPR consent management settings
- Language configuration with flags

### Eleventy Configuration (`.eleventy.js`)
- Custom filters for date formatting
- Language-specific collections (posts_en, posts_ru, posts_de)
- Markdown configuration with anchor links
- Shortcode definitions

## Development Notes

### Environment Variables
- `ELEVENTY_ENV=production` - Set for production builds
- `GA_MEASUREMENT_ID` - Google Analytics measurement ID
- Site URL automatically switches based on environment

### Sass Compilation
- Main stylesheet: `src/assets/scss/main.scss`
- Compiled to: `src/assets/css/main.css`
- Uses modern CSS with custom properties and responsive design

### Collections
- `posts_en`, `posts_ru`, `posts_de` - Language-specific post collections
- `featuredPosts` - Posts with featured images
- All collections are reverse-sorted (newest first)

### Asset Handling
- All files in `src/assets/` are copied to `_site/assets/`
- Images should be referenced as `/assets/images/...`
- CSS and JS are processed and copied during build

## Important Development Practices

### Content Organization
- Keep posts in date-based folders matching their publication date
- Store images in corresponding date folders under `src/assets/images/`
- Use consistent front matter across all posts

### Multilingual Considerations
- Always update all three languages when adding navigation items
- Ensure translations are consistent across site.js configuration
- Test language switching functionality

### Asset Management
- Optimize images before adding them to the repository
- Use descriptive filenames for assets
- Reference assets with absolute paths starting with `/assets/`