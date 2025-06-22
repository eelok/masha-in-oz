# SCSS Architecture Documentation

## Overview

This directory contains the modular SCSS architecture for the Multilingual Blog project. The styles are organized following **ITCSS (Inverted Triangle CSS)** methodology and modern **@use** syntax for better maintainability and performance.

## Directory Structure

```
src/assets/scss/
├── main.scss                 # Main entry point
├── abstracts/               # Variables, mixins, functions (no output)
│   ├── _variables.scss      # Design tokens and theme variables
│   ├── _mixins.scss         # Reusable mixins (media queries, interactions)
│   └── _functions.scss      # Utility functions (rem conversion, z-index)
├── base/                    # Base styles and resets
│   ├── _reset.scss          # CSS reset and box-sizing
│   ├── _typography.scss     # Typography system
│   └── _layout.scss         # Base layout containers
├── components/              # UI component styles
│   ├── _header.scss         # Site header and branding
│   ├── _burger-menu.scss    # Mobile hamburger menu
│   ├── _navigation.scss     # Navigation system (desktop/mobile)
│   ├── _language-selector.scss # Language switching components
│   ├── _post.scss           # Blog post layout and content
│   ├── _blog-list.scss      # Post listing components
│   └── _footer.scss         # Site footer
├── utilities/               # Utility classes
│   └── _utilities.scss      # Helper classes (show/hide, spacing)
└── themes/                  # Theme definitions
    ├── _light.scss          # Light theme CSS custom properties
    ├── _dark.scss           # Dark theme (prefers-color-scheme)
    └── _accessibility.scss  # Accessibility preferences
```

## Key Features

### Modern Sass Architecture
- **@use Syntax**: Uses modern `@use` instead of deprecated `@import`
- **Namespace Management**: Explicit namespacing prevents variable conflicts
- **Modular Organization**: Clear separation of concerns following ITCSS

### Design System Integration
- **CSS Custom Properties**: Runtime theming support
- **Design Tokens**: Centralized variables for consistency
- **Component-Based**: Each UI component has its own style file

### Responsive Design
- **Mobile-First**: Progressive enhancement approach
- **Breakpoint Mixins**: Consistent media query management
- **Touch-Friendly**: Optimized for touch interactions

### Performance Optimized
- **Modular Loading**: Only import what you need
- **Compressed Output**: Minified CSS for production
- **Source Maps**: Debugging support in development

## Build Process

### NPM Scripts

```bash
# Development (expanded CSS with source maps)
npm run sass:dev

# Watch mode (automatically recompile on changes)
npm run sass:watch

# Production build (compressed CSS, no source maps)
npm run sass:build

# Start development server with Sass compilation
npm start

# Production build with pre-compilation
npm run build
```

### Workflow Integration

The SCSS compilation is integrated into the Eleventy build process:
- **Pre-build**: SCSS is compiled before Eleventy starts
- **Development**: Watch mode runs alongside Eleventy serve
- **Production**: Compressed CSS is generated for optimal performance

## File Naming Conventions

### Partial Files
- All SCSS files except `main.scss` are prefixed with `_` (Sass partials)
- Use kebab-case for filenames: `_burger-menu.scss`

### Import Organization
Files are imported in a specific order following ITCSS methodology:
1. **Abstracts**: Variables, functions, mixins (no CSS output)
2. **Themes**: CSS custom properties for theming
3. **Base**: Resets, typography, base layout
4. **Components**: Specific UI components
5. **Utilities**: Helper classes
6. **Accessibility**: Accessibility-specific styles

## Variables and Design Tokens

### Color System
```scss
// Brand Colors
$color-primary: #2563eb;
$color-primary-light: rgba(37, 99, 235, 0.1);

// Text Colors
$color-text: #1f2937;
$color-text-light: #6b7280;

// Dark Theme
$color-primary-dark: #3b82f6;
$color-text-dark: #f9fafb;
```

### Typography Scale
```scss
$font-size-xs: 0.8rem;     // 12.8px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px
$font-size-lg: 1.1rem;     // 17.6px
$font-size-xl: 1.2rem;     // 19.2px
$font-size-2xl: 1.5rem;    // 24px
$font-size-3xl: 1.875rem;  // 30px
$font-size-4xl: 2.25rem;   // 36px
$font-size-5xl: 2.5rem;    // 40px
```

### Spacing System
```scss
$spacing-xs: 0.5rem;   // 8px
$spacing-sm: 1rem;     // 16px
$spacing-md: 1.5rem;   // 24px
$spacing-lg: 2rem;     // 32px
$spacing-xl: 3rem;     // 48px
```

## Mixins

### Media Queries
```scss
@include mobile {
  // Styles for mobile devices (max-width: 768px)
}

@include desktop {
  // Styles for desktop devices (min-width: 769px)
}
```

### Interactive Elements
```scss
@include interactive-element; // Adds transitions and focus states
@include hover-scale($scale); // Hover scale effect with mobile fallback
@include button-reset;        // Removes default button styles
```

### Layout Helpers
```scss
@include container;     // Max-width container with padding
@include flex-center;   // Flex container with center alignment
@include flex-between;  // Flex container with space-between
```

## Functions

### Utility Functions
```scss
rem(16px);        // Converts px to rem
z('mobile-menu'); // Gets z-index value from map
alpha($color, 0.5); // Creates rgba color with opacity
```

## Component Architecture

### Component Structure
Each component follows a consistent structure:

```scss
// Component header with purpose
// ==========================================================================
// COMPONENT NAME
// ==========================================================================

// Import dependencies
@use '../abstracts/variables' as *;
@use '../abstracts/mixins' as *;

// Component styles
.component-name {
  // Base styles
  
  // Element styles using BEM methodology
  &__element {
    // Element styles
  }
  
  // Modifier styles
  &--modifier {
    // Modifier styles
  }
  
  // State styles
  &:hover,
  &.active {
    // State styles
  }
  
  // Responsive styles
  @include mobile {
    // Mobile-specific styles
  }
}
```

### BEM Methodology
Components use BEM (Block, Element, Modifier) naming convention:
- **Block**: `.nav-link`
- **Element**: `.nav-link__icon`
- **Modifier**: `.nav-link--active`

## Theming System

### CSS Custom Properties
The theming system uses CSS custom properties for runtime theming:

```scss
:root {
  --color-primary: #{$color-primary};
  --color-text: #{$color-text};
  --spacing-sm: #{$spacing-sm};
}

.component {
  color: var(--color-text);     // Uses theme variable
  padding: var(--spacing-sm);   // Uses spacing variable
}
```

### Dark Theme Support
Dark theme is automatically applied based on user preference:

```scss
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #{$color-primary-dark};
    --color-text: #{$color-text-dark};
  }
}
```

## Accessibility Features

### Motion Preferences
```scss
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Management
```scss
@mixin focus-ring {
  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}
```

## Performance Optimizations

### Critical CSS
Navigation and above-the-fold styles are prioritized for initial render.

### Animation Performance
- Hardware acceleration with `transform` properties
- 60fps animations with optimized timing functions
- Reduced motion support for accessibility

### Bundle Size
- Modular imports prevent unused CSS
- Compressed output for production builds
- Optimized vendor prefixes

## Development Guidelines

### Adding New Components
1. Create new partial in `components/` directory
2. Follow BEM naming convention
3. Import required abstracts at the top
4. Add responsive styles using mixins
5. Include accessibility considerations
6. Import in `main.scss`

### Modifying Existing Styles
1. Identify the correct component file
2. Follow existing patterns and conventions
3. Test across different screen sizes
4. Verify accessibility compliance
5. Update documentation if needed

### Variable Usage
- Use design tokens from `_variables.scss`
- Prefer CSS custom properties for runtime values
- Follow semantic naming conventions
- Document any new variables added

## Browser Support

### Modern Features
- CSS Grid for layout where appropriate
- Flexbox for component layout
- CSS Custom Properties for theming
- Modern pseudo-selectors

### Fallbacks
- Graceful degradation for older browsers
- Progressive enhancement approach
- Vendor prefixes where necessary

## Maintenance

### Regular Tasks
- Update dependencies: `npm update sass`
- Review compiled CSS for optimization opportunities
- Audit for unused styles
- Validate accessibility compliance

### Debugging
- Use source maps in development
- Leverage browser dev tools
- Test across different devices and browsers
- Validate CSS with online tools

## Migration Notes

### From Original CSS
The SCSS architecture maintains the same visual output as the original CSS while improving:
- **Maintainability**: Modular organization and reusable components
- **Scalability**: Easy to add new components and themes
- **Developer Experience**: Better tooling and development workflow
- **Performance**: Optimized build process and output

### Breaking Changes
None. The compiled CSS maintains complete backward compatibility.

## Future Enhancements

### Planned Features
- Component library extraction
- Advanced animation system
- Additional theme variants
- CSS-in-JS integration options

### Extensibility
The modular architecture supports:
- Easy addition of new components
- Theme customization
- Integration with design systems
- Advanced build optimizations

## Contributing

When contributing to the SCSS architecture:
1. Follow existing patterns and conventions
2. Write meaningful commit messages
3. Test changes across browsers and devices
4. Update documentation for significant changes
5. Consider accessibility implications

## Resources

- [Sass Documentation](https://sass-lang.com/documentation)
- [ITCSS Methodology](https://itcss.io/)
- [BEM Naming Convention](http://getbem.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)