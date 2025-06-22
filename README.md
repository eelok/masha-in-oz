# Multilingual Blog with Eleventy

A modern, multilingual blog built with Eleventy (11ty) that supports English, Russian, and German languages. Features a clean, minimalistic design with full responsive support and dev container integration.

## Features

- **Multilingual Support**: Content in English, Russian, and German
- **Responsive Design**: Mobile-first, clean minimalistic theme
- **Dev Container**: Ready-to-use development environment with Docker
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **Fast Performance**: Static site generation with Eleventy
- **Modern Stack**: Node.js, Nunjucks templating, CSS custom properties

## Prerequisites

- Docker Desktop installed
- VS Code with Dev Containers extension
- Git

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd multilingual-blog
   ```

2. **Open in VS Code**:
   ```bash
   code .
   ```

3. **Reopen in Container**:
   - VS Code will prompt to "Reopen in Container"
   - Click "Reopen in Container" or use Command Palette: "Dev Containers: Reopen in Container"

4. **Start development server**:
   ```bash
   npm start
   ```

5. **Open in browser**: `http://localhost:8080`

## Project Structure

```
multilingual-blog/
├── .devcontainer/          # Dev container configuration
├── .vscode/               # VS Code settings
├── src/
│   ├── _data/             # Global data files
│   ├── _includes/         # Templates and partials
│   │   ├── layouts/       # Page layouts
│   │   └── partials/      # Reusable components
│   ├── assets/            # Static assets
│   │   ├── css/          # Stylesheets
│   │   └── js/           # JavaScript files
│   ├── posts/            # Blog posts by language
│   │   ├── en/           # English posts
│   │   ├── ru/           # Russian posts
│   │   └── de/           # German posts
│   ├── pages/            # Static pages by language
│   └── index.njk         # Root index page
├── .eleventy.js          # Eleventy configuration
├── package.json          # Dependencies and scripts
└── README.md
```

## Available Scripts

- `npm start` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run debug` - Debug mode with verbose logging
- `npm run clean` - Clean build directory

## Adding Content

### Creating a New Post

1. **Choose language directory**: `src/posts/en/`, `src/posts/ru/`, or `src/posts/de/`

2. **Create markdown file** with frontmatter:
   ```markdown
   ---
   title: "Your Post Title"
   date: 2024-01-01
   lang: en
   layout: layouts/post.njk
   tags: ["tag1", "tag2"]
   description: "Brief description for SEO"
   ---
   
   # Your content here
   ```

### Adding a New Language

1. **Update site data** in `src/_data/site.js`
2. **Add language collections** in `.eleventy.js`
3. **Create language directories** in `src/posts/` and `src/pages/`
4. **Update navigation** in site data
5. **Add translations** to layouts and partials

## Customization

### Styling

Edit `src/assets/css/main.css` to customize:
- CSS custom properties (variables) at the top
- Component styles
- Responsive breakpoints

### Configuration

Edit `src/_data/site.js` to customize:
- Site title and description
- Author information
- Navigation menus
- Language settings

### Templates

Edit files in `src/_includes/`:
- `layouts/base.njk` - Base HTML structure
- `layouts/post.njk` - Blog post layout
- `partials/header.njk` - Site header
- `partials/footer.njk` - Site footer

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `_site` directory with the static files.

### Deployment Options

- **Netlify**: Connect your Git repository
- **Vercel**: Import your project
- **GitHub Pages**: Use GitHub Actions
- **Traditional hosting**: Upload `_site` contents

### Environment Variables

Set `NODE_ENV=production` for production builds to enable optimizations.

## Development

### VS Code Extensions

The dev container includes useful extensions:
- Prettier for code formatting
- Path Intellisense for file paths
- Markdown All in One for editing
- Tailwind CSS IntelliSense

### File Associations

- `.njk` files are treated as HTML for syntax highlighting
- Emmet support for Nunjucks templates

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues and questions, please create an issue in the repository.