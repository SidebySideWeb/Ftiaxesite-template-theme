# 🚀 Vercel Environment Variables Guide

This guide covers all the environment variables needed for your Next.js + Payload CMS deployment on Vercel.

## 📋 Required Environment Variables

### 🔐 Essential Variables (Required)

```bash
# Payload CMS Secret (REQUIRED)
PAYLOAD_SECRET=DimiGero1984!!!

# Database Connection (REQUIRED) 
DATABASE_URL=postgresql://postgres:KBKqi7e99bkzjGMz@db.gfpyhjsmopgocivxvtgr.supabase.co:5432/postgres

# Site URL (REQUIRED for SEO and CMS)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### 📊 Analytics & Tracking (Optional but Recommended)

```bash
# Google Tag Manager (for analytics)
NEXT_PUBLIC_GTM_ID=	GTM-M47BV33N

# Google Analytics (alternative to GTM)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 🎨 Additional Configuration (Optional)

```bash
# Node Environment (automatically set by Vercel)
NODE_ENV=production

# Next.js Debug (for troubleshooting)
DEBUG=next:*
```

## 🔧 How to Set Variables in Vercel

### Method 1: Vercel Dashboard
1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with the appropriate environment (Production, Preview, Development)

### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Set variables
vercel env add PAYLOAD_SECRET
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_SITE_URL
```

## 🗄️ Database Setup Options

### Option 1: Supabase (Recommended for PostgreSQL)
```bash
# Free tier available, easy setup
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres
```

**Setup Steps:**
1. Visit [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your actual password

### Option 2: Railway
```bash
DATABASE_URL=postgresql://postgres:PASSWORD@containers-us-west-XXX.railway.app:5432/railway
```

### Option 3: Neon
```bash
DATABASE_URL=postgresql://username:password@ep-XXX.us-east-2.aws.neon.tech/database_name
```

### Option 4: PlanetScale (MySQL - requires adapter change)
```bash
DATABASE_URL=mysql://username:password@aws.connect.psdb.cloud/database_name?sslaccept=strict
```

## 🔑 Generating Secure Values

### PAYLOAD_SECRET
Generate a secure secret:
```bash
# Option 1: OpenSSL
openssl rand -base64 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online generator
# Visit: https://generate-secret.vercel.app/32
```

### NEXT_PUBLIC_SITE_URL
```bash
# For production deployment
NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com

# For Vercel preview deployments
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
```

## 🏗️ Environment-Specific Configuration

### Production Environment
```bash
PAYLOAD_SECRET=your-production-secret
DATABASE_URL=your-production-database-url
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NODE_ENV=production
```

### Preview Environment
```bash
PAYLOAD_SECRET=your-preview-secret
DATABASE_URL=your-preview-database-url
NEXT_PUBLIC_SITE_URL=https://your-project-git-branch.vercel.app
NEXT_PUBLIC_GTM_ID=GTM-PREVIEW
NODE_ENV=production
```

### Development Environment
```bash
PAYLOAD_SECRET=dev-secret-key
DATABASE_URL=postgresql://localhost:5432/your_local_db
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GTM_ID=GTM-DEV
NODE_ENV=development
```

## 🔍 Verification Steps

After setting up your environment variables:

1. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

2. **Check CMS Access:**
   - Visit `https://your-domain.vercel.app/admin`
   - Verify you can access the admin panel

3. **Test Database Connection:**
   - Create a test post in the CMS
   - Verify it appears on the frontend

4. **Verify Analytics:**
   - Check Google Tag Manager/Analytics
   - Ensure tracking is working

## 🚨 Security Best Practices

### ✅ Do's
- Use different secrets for production/preview/development
- Store sensitive data only in environment variables
- Use strong, randomly generated secrets
- Regularly rotate secrets

### ❌ Don'ts
- Never commit secrets to Git
- Don't use simple passwords
- Don't share production secrets
- Don't use the same secret across environments

## 🛠️ Troubleshooting

### Common Issues

**"Payload secret is required"**
```bash
# Ensure PAYLOAD_SECRET is set
vercel env ls
```

**"Database connection failed"**
```bash
# Check DATABASE_URL format and credentials
# Ensure database server allows external connections
```

**"Site URL not working"**
```bash
# Verify NEXT_PUBLIC_SITE_URL matches your domain
# Check for trailing slashes (avoid them)
```

### Debug Commands
```bash
# Check all environment variables
vercel env ls

# Check specific variable
vercel env get PAYLOAD_SECRET

# View deployment logs
vercel logs your-deployment-url
```

## 📝 Complete Setup Checklist

- [ ] Generate secure `PAYLOAD_SECRET`
- [ ] Set up PostgreSQL database (Supabase recommended)
- [ ] Configure `DATABASE_URL`
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your domain
- [ ] Add Google Tag Manager ID (optional)
- [ ] Deploy to Vercel
- [ ] Test admin panel access
- [ ] Verify database connectivity
- [ ] Check frontend functionality
- [ ] Confirm analytics tracking

## 🔗 Quick Setup Commands

```bash
# 1. Set essential variables
vercel env add PAYLOAD_SECRET production
vercel env add DATABASE_URL production  
vercel env add NEXT_PUBLIC_SITE_URL production

# 2. Set optional analytics
vercel env add NEXT_PUBLIC_GTM_ID production

# 3. Deploy
vercel --prod
```

Your Next.js + Payload CMS application should now be successfully deployed to Vercel! 🎉