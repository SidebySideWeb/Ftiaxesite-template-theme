# GitHub Actions Setup Guide

This guide explains how to configure GitHub Actions secrets and enable CI/CD pipeline for your repository.

## 🔐 Required GitHub Secrets

To enable the full CI/CD pipeline, you need to configure the following secrets in your GitHub repository:

### Repository Settings → Secrets and Variables → Actions

### 🚀 Vercel Deployment Secrets (Optional)
```
VERCEL_TOKEN          # Your Vercel API token
VERCEL_ORG_ID         # Your Vercel organization ID  
VERCEL_PROJECT_ID     # Your Vercel project ID
```

### 📊 Performance Monitoring (Optional)
```
LHCI_GITHUB_APP_TOKEN # Lighthouse CI GitHub App token
```

### 🧪 Testing Secrets (Optional)
```
PAYLOAD_SECRET_TEST   # Test secret for CI builds
DATABASE_URL_TEST     # Test database URL for CI
```

## 🛠️ Setup Instructions

### 1. Get Vercel Secrets

1. **Vercel Token**:
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Create a new token
   - Copy the token value

2. **Organization ID**:
   ```bash
   npx vercel teams ls
   ```

3. **Project ID**:
   ```bash
   npx vercel project ls
   ```

### 2. Configure GitHub Secrets

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the corresponding value

### 3. Enable GitHub Actions

1. Go to **Actions** tab in your repository
2. Enable workflows if prompted
3. The CI/CD pipeline will run automatically on:
   - Push to `main` branch
   - Pull requests to `main` branch

## 🔄 Current Workflow Status

### ✅ Currently Active
- **Code Quality**: Linting, type checking, security audit
- **Testing**: Unit tests and integration tests
- **Performance**: Bundle analysis and Lighthouse audits  
- **Security**: Vulnerability scanning
- **Notifications**: Success/failure reporting

### 💤 Currently Disabled (requires secrets)
- **Vercel Deployment**: Production and preview deployments
- **Lighthouse CI**: Advanced performance tracking

## 🚀 Enabling Deployment

To enable automatic deployments:

1. **Add Vercel secrets** (see above)
2. **Uncomment deployment jobs** in `.github/workflows/ci-cd.yml`:
   ```yaml
   # Remove the # comments from:
   # deploy-production:
   # deploy-preview:
   ```
3. **Update notification dependencies**:
   ```yaml
   needs: [quality, test, performance, security, deploy-production, deploy-preview]
   ```

## 📊 Performance Monitoring Setup

### Lighthouse CI

1. **Install Lighthouse CI GitHub App**:
   - Go to [Lighthouse CI GitHub App](https://github.com/apps/lighthouse-ci)
   - Install for your repository

2. **Get App Token**:
   - Follow [LHCI documentation](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md#github-status-checks)
   - Add token as `LHCI_GITHUB_APP_TOKEN` secret

3. **Uncomment in workflow**:
   ```yaml
   env:
     LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
   ```

## 🧪 Testing Configuration

For comprehensive testing in CI:

```bash
# Add these secrets for database testing
PAYLOAD_SECRET_TEST=test-secret-key-for-ci-environment
DATABASE_URL_TEST=postgresql://postgres:postgres@localhost:5432/test_db
```

## 🔍 Monitoring Workflows

### View Workflow Status
- Go to **Actions** tab in your repository
- Click on any workflow run to see details
- Check logs for each job

### Workflow Triggers
- **Push to main**: Full CI/CD including deployment
- **Pull Request**: CI/CD without production deployment  
- **Schedule**: Daily performance monitoring
- **Manual**: Workflow dispatch for on-demand runs

## 🚨 Troubleshooting

### Common Issues

**"Context access might be invalid"**
- Secrets are not configured in repository settings
- Secret names don't match workflow file

**"Build fails with database connection"**
- Add `DATABASE_URL_TEST` secret
- Ensure PostgreSQL service is running in CI

**"Vercel deployment fails"**
- Check Vercel token permissions
- Verify organization and project IDs
- Ensure Vercel CLI is authenticated

### Getting Help

1. Check workflow logs in Actions tab
2. Review secret configuration
3. Verify Vercel project settings
4. Test locally first: `npm run build`

## 📈 Next Steps

Once secrets are configured:

1. **Enable deployments** by uncommenting workflow sections
2. **Set up performance monitoring** with Lighthouse CI
3. **Configure notifications** (Slack, Discord, email)
4. **Add end-to-end testing** with Playwright
5. **Set up code coverage** reporting
6. **Configure dependency updates** with Dependabot

Your CI/CD pipeline will then provide:
- ✅ Automated quality checks
- 🚀 Automatic deployments  
- 📊 Performance monitoring
- 🔒 Security scanning
- 📧 Team notifications

Happy deploying! 🎉