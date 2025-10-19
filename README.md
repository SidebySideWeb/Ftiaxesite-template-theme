# 🚀 Next.js 15 + Payload CMS - Core Web Vitals Optimized

A high-performance, fully accessible Next.js 15 application with integrated Payload CMS 3, optimized for Core Web Vitals and production-ready deployment.

## ✨ Features

### 🎯 Performance Excellence
- **Core Web Vitals Optimized**: Real-time monitoring with Google Analytics integration
- **Advanced Bundle Splitting**: Webpack optimization with 200KB chunk size limits
- **Image Optimization**: WebP/AVIF support with priority loading
- **Critical CSS**: Inlined critical styles for faster first paint
- **Resource Hints**: Preconnect and DNS prefetch for external resources

### ♿ Accessibility First
- **WCAG AA Compliant**: Full accessibility compliance with proper color contrast
- **Semantic Structure**: Proper landmarks, skip links, and ARIA labeling
- **Focus Management**: Keyboard navigation and screen reader support
- **High Contrast Colors**: Carefully designed color system for readability

### 🛠 Modern Tech Stack
- **Next.js 15.5.6**: Latest App Router with React 19
- **Payload CMS 3.59.0**: Headless CMS with full TypeScript support
- **Tailwind CSS v4**: Modern utility-first styling
- **TypeScript**: Full type safety across the application
- **ESLint**: Comprehensive linting with Next.js best practices

### 📊 Analytics & Monitoring
- **Real-time Core Web Vitals**: Track CLS, FCP, LCP, TTFB, INP
- **Bundle Analysis**: Built-in bundle analyzer for optimization
- **Performance Diagnostics**: Comprehensive monitoring tools
- **Error Tracking**: Enhanced error handling and logging

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

### First-Time Setup

1. **Create Admin User**:
   ```bash
   npm run create-user
   ```

2. **Seed Homepage Data**:
   ```bash
   npm run seed-homepage
   ```

3. **Access Admin Panel**: Visit `/admin` to manage content

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (frontend)/         # Public-facing pages
│   │   ├── (payload)/          # CMS admin routes
│   │   └── api/               # API endpoints
│   ├── components/            # Reusable UI components
│   ├── payload/              # CMS configuration
│   └── types/                # TypeScript definitions
├── public/                   # Static assets
└── scripts/                  # Utility scripts
```

## 🛠 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Create production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Bundle Analysis
npm run analyze          # Analyze bundle size

# CMS Management
npm run create-user      # Create admin user
npm run seed-homepage    # Seed sample data

# Performance
npm run lighthouse       # Run Lighthouse audit
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URI=mongodb://localhost:27017/my-app
# or use MongoDB Atlas, PostgreSQL, etc.

# Payload CMS
PAYLOAD_SECRET=your-secret-key-here

# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📊 Performance Optimizations

### Bundle Optimization
- **Code Splitting**: Automatic route-based splitting
- **Vendor Chunks**: Separate React and Payload bundles
- **Size Limits**: 200KB chunk size limits with warnings
- **Lazy Loading**: CMS components loaded on demand

### Image Optimization
- **Next.js Image**: Automatic WebP/AVIF conversion
- **Priority Loading**: Hero images loaded with priority
- **Responsive Images**: Optimized for different screen sizes
- **Caching**: Aggressive caching strategies

## ♿ Accessibility Features

### WCAG AA Compliance
- **Color Contrast**: Minimum 4.5:1 ratio for normal text
- **Focus Indicators**: Clear focus states for all interactive elements
- **Screen Readers**: Full ARIA labeling and semantic structure
- **Keyboard Navigation**: Complete keyboard accessibility

## 🚀 Deployment

Ready for production deployment on Vercel, Netlify, or any Node.js platform.

## 📚 Documentation

- [CORE_WEB_VITALS_OPTIMIZATION.md](./CORE_WEB_VITALS_OPTIMIZATION.md) - Performance guide
- [ACCESSIBILITY_FIXES.md](./ACCESSIBILITY_FIXES.md) - Accessibility details
- [CMS-USER-MANUAL.md](./CMS-USER-MANUAL.md) - Content management guide

---

**Optimized for Core Web Vitals and production-ready!** 🎉
