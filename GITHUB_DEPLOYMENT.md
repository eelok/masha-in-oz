# GitHub Pages Deployment Guide

This project includes automated GitHub Actions workflows for seamless deployment to GitHub Pages.

## Setup Instructions

### 1. Repository Configuration

**Enable GitHub Pages:**
1. Go to your repository Settings
2. Navigate to Pages section
3. Under "Source", select "GitHub Actions"
4. Save the settings

**Repository Permissions:**
- The workflows automatically handle permissions
- No additional setup required for public repositories
- For private repositories, ensure Actions are enabled

### 2. Automatic Deployment

#### Main Branch Deployment

When you push changes to the `main` branch:

**Build Process:**
- Installs Node.js dependencies
- Compiles Sass to CSS
- Builds the Eleventy site
- Verifies build output

**Deployment Process:**
- Uploads site artifacts to GitHub Pages
- Deploys to your GitHub Pages URL
- Provides deployment confirmation

#### Pull Request Testing

For pull requests targeting `main`:

**Validation:**
- Tests the build process
- Validates configuration files
- Checks for common issues
- Performs basic link validation

**Quality Assurance:**
- Ensures builds complete successfully
- Verifies all assets are generated
- Confirms HTML and CSS output

### 3. GitHub Actions Workflows

#### Deploy to GitHub Pages (`.github/workflows/deploy-pages.yml`)

- **Trigger:** Push to `main` branch or manual trigger
- **Purpose:** Build and deploy the site to GitHub Pages
- **Features:**
  - Node.js 18 environment
  - npm cache optimization
  - Sass preprocessing
  - Build verification
  - Automatic deployment
  - Deployment URL display

#### Test Build (`.github/workflows/test-build.yml`)

- **Trigger:** Pull requests to `main` branch or manual trigger
- **Purpose:** Validate builds before merging
- **Features:**
  - Configuration validation
  - Build testing
  - Artifact verification
  - Basic link checking
  - Quality assurance checks

### 4. Manual Deployment

To trigger a deployment manually:

1. Go to the "Actions" tab in your GitHub repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select the branch (usually `main`)
5. Click "Run workflow" to start

### 5. Deployment URLs

#### GitHub Pages URLs

- **User/Organization site:** `https://username.github.io`
- **Project site:** `https://username.github.io/repository-name`

#### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to `src/` directory with your domain
2. Configure DNS settings for your domain
3. Update the GitHub Pages settings to use the custom domain
4. Update `src/_data/site.js` with your domain URL

### 6. Configuration Updates

#### Site URL Configuration

Update `src/_data/site.js` with your deployment URL:

```javascript
module.exports = {
  // For GitHub Pages project site:
  url: "https://yourusername.github.io/multilingual-blog",
  
  // For custom domain:
  url: "https://yourdomain.com",
  
  // For user/organization GitHub Pages:
  url: "https://yourusername.github.io",
  
  // ... rest of configuration
};
```

#### Base Path Configuration (if needed)

For project sites with subdirectories, you may need to update:

1. **Asset paths** in templates
2. **Navigation URLs** in site configuration
3. **Internal links** in content

### 7. Monitoring Deployments

#### Viewing Deployment Status

1. **Actions Tab:** Monitor workflow progress
2. **Pages Section:** View deployment history
3. **Commit Status:** See deployment status on commits

#### Troubleshooting Deployments

**Build Failures:**
- Check workflow logs in Actions tab
- Verify package.json and dependencies
- Ensure all required files are present

**Deployment Failures:**
- Verify GitHub Pages is enabled
- Check repository permissions
- Ensure source is set to "GitHub Actions"

**Site Issues:**
- Verify asset paths are correct
- Check browser console for errors
- Validate HTML and CSS output

### 8. Best Practices

#### Development Workflow

1. **Feature Branches:** Create branches for new features
2. **Pull Requests:** Use PRs to trigger build tests
3. **Code Review:** Review changes before merging
4. **Testing:** Verify builds pass before deployment

#### Performance Optimization

1. **Asset Optimization:** Images and CSS are optimized
2. **Caching:** Static assets use appropriate cache headers
3. **Build Optimization:** Dependencies are cached between builds

#### Security Considerations

1. **Permissions:** Workflows use minimal required permissions
2. **Secrets:** No sensitive data in workflows
3. **Dependencies:** Regular dependency updates recommended

### 9. Advanced Configuration

#### Custom Build Steps

To add custom build steps, modify `.github/workflows/deploy-pages.yml`:

```yaml
- name: Custom build step
  run: |
    echo "Running custom build step..."
    # Add your custom commands here
```

#### Environment Variables

To add environment variables:

```yaml
- name: Build site
  run: npm run build
  env:
    NODE_ENV: production
    CUSTOM_VAR: value
```

#### Matrix Builds

For testing multiple Node.js versions:

```yaml
strategy:
  matrix:
    node-version: [16, 18, 20]
```

### 10. Support and Resources

#### GitHub Documentation
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Workflow Syntax](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions)

#### Eleventy Resources
- [Eleventy Documentation](https://11ty.dev/docs/)
- [Eleventy GitHub Pages Guide](https://11ty.dev/docs/deployment/#github-pages)

#### Troubleshooting
- Check the Actions tab for detailed logs
- Review the Pages section in repository settings
- Verify all file paths are correct
- Test builds locally before pushing

---

## Quick Start Checklist

- [ ] Repository Settings → Pages → Source: "GitHub Actions"
- [ ] Push to `main` branch to trigger first deployment
- [ ] Monitor deployment in Actions tab
- [ ] Verify site loads at GitHub Pages URL
- [ ] Update `src/_data/site.js` with correct URL
- [ ] Test navigation and functionality
- [ ] Configure custom domain (if desired)

Your multilingual blog should now be automatically deployed to GitHub Pages! 🚀