# Google Analytics Deployment Checklist

## Pre-Deployment Setup

### 1. Google Analytics Configuration
- [ ] Create Google Analytics 4 property
- [ ] Get Measurement ID (G-XXXXXXXXXX)
- [ ] Configure data streams for your domain
- [ ] Set up goals and conversions (optional)

### 2. Environment Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Set `GA_MEASUREMENT_ID` in `.env`
- [ ] Configure production/development IDs if needed
- [ ] Update `site.url` in `src/_data/site.js`

### 3. Privacy Compliance
- [ ] Review privacy policy content
- [ ] Ensure consent banner translations are accurate
- [ ] Test consent management functionality
- [ ] Verify Do Not Track compliance

## Testing Checklist

### 1. Consent Management
- [ ] Consent banner appears on first visit
- [ ] "Accept All" button works
- [ ] "Reject All" button works
- [ ] "Customize" shows detailed options
- [ ] Consent preferences are saved
- [ ] Banner doesn't show after consent given
- [ ] Privacy policy links work

### 2. Analytics Tracking
- [ ] Page views are tracked after consent
- [ ] No tracking occurs without consent
- [ ] Language switch events fire
- [ ] Outbound link clicks tracked
- [ ] File download tracking works
- [ ] Scroll depth events fire

### 3. Privacy Features
- [ ] Do Not Track header respected
- [ ] IP anonymization enabled
- [ ] No marketing cookies by default
- [ ] Consent can be revoked via privacy policy
- [ ] Data collection stops after consent revocation

### 4. Multilingual Testing
- [ ] Consent banner appears in correct language
- [ ] Privacy policy accessible in all languages
- [ ] Language tracking works correctly
- [ ] Text translations are accurate

### 5. Accessibility
- [ ] Consent banner keyboard navigable
- [ ] Screen reader compatibility
- [ ] Focus management works
- [ ] ARIA attributes present
- [ ] High contrast mode support

## Production Deployment

### 1. Build Process
```bash
# Install dependencies
npm install

# Build CSS
npm run sass:build

# Build site
npm run build

# Verify build output
ls -la _site/
```

### 2. Environment Variables
Set these in your hosting platform:
- `GA_MEASUREMENT_ID=G-XXXXXXXXXX`
- `NODE_ENV=production`

### 3. Hosting Platform Specifics

#### Netlify
```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = "_site"

[build.environment]
  GA_MEASUREMENT_ID = "G-XXXXXXXXXX"
  NODE_ENV = "production"
```

#### Vercel
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "_site" }
    }
  ],
  "env": {
    "GA_MEASUREMENT_ID": "G-XXXXXXXXXX",
    "NODE_ENV": "production"
  }
}
```

## Post-Deployment Verification

### 1. Analytics Verification
- [ ] Check Google Analytics Real-Time reports
- [ ] Verify events are being received
- [ ] Test from different devices/browsers
- [ ] Confirm geographic data is anonymized

### 2. Privacy Compliance
- [ ] Test consent banner on fresh browser
- [ ] Verify privacy policy pages load
- [ ] Check cookie consent preferences persist
- [ ] Test consent revocation process

### 3. Performance
- [ ] Verify analytics scripts load asynchronously
- [ ] Check Core Web Vitals not affected
- [ ] Test on slow connections
- [ ] Verify no JavaScript errors

### 4. SEO
- [ ] Analytics doesn't affect page ranking
- [ ] Privacy policy pages indexed
- [ ] No duplicate content issues
- [ ] Proper hreflang tags

## Monitoring & Maintenance

### 1. Regular Checks
- [ ] Monitor analytics data quality
- [ ] Check for consent banner issues
- [ ] Verify privacy policy stays current
- [ ] Test across browser updates

### 2. Updates
- [ ] Keep Google Analytics library updated
- [ ] Review privacy regulations changes
- [ ] Update consent banner translations
- [ ] Monitor for new tracking requirements

### 3. User Feedback
- [ ] Monitor for privacy concerns
- [ ] Collect feedback on consent UX
- [ ] Address accessibility issues
- [ ] Update based on user needs

## Troubleshooting

### Common Issues
1. **Analytics not working**: Check measurement ID and consent
2. **Consent banner not showing**: Verify configuration and clear cookies
3. **Events not firing**: Check browser console for errors
4. **Privacy policy 404**: Ensure pages are built and deployed

### Debug Mode
Enable debug logging:
```javascript
// Temporarily add to analytics.js
console.log('Debug mode enabled');
```

### Contact Support
For technical issues:
- Check browser console errors
- Verify network requests in DevTools
- Test in incognito mode
- Check Google Analytics real-time reports

## Legal Compliance

### GDPR Requirements
- [ ] Consent is freely given, specific, informed
- [ ] Users can withdraw consent easily
- [ ] Data processing is transparent
- [ ] Privacy policy is accessible

### Documentation
- [ ] Privacy policy updated
- [ ] Cookie policy documented
- [ ] Data processing agreements
- [ ] User rights information

This checklist ensures a compliant and functional Google Analytics implementation that respects user privacy while providing valuable insights.