# AI Coding Instructions for Next.js Web Template

## Project Overview
This is a modern Next.js 15 application template using the App Router architecture with TypeScript, Tailwind CSS v4, and React 19. Built with `create-next-app@latest` using recommended defaults: TypeScript, Tailwind, App Router, and `@/*` import alias. Ready for integration with headless CMS solutions like Payload CMS.

## Architecture & Key Patterns

### App Router Structure (File-System Routing)
- Uses Next.js App Router (`src/app/`) - routes determined by folder structure
- **Required files**: `layout.tsx` (root layout with `<html>` and `<body>` tags), `page.tsx` (route component)
- **Server Components by default** - add `"use client"` directive only when client-side features needed
- **Metadata API**: Export `metadata` object from page/layout components (not `<head>` tags)
- **Font Optimization**: Uses `next/font/google` with CSS variables (`--font-geist-sans`, `--font-geist-mono`)

### Styling & Design System
- **Tailwind CSS v4** with `@theme inline` configuration in `globals.css`
- **Semantic Design Tokens**: `--background`, `--foreground` CSS custom properties
- **Automatic Dark Mode**: Uses `prefers-color-scheme: dark` media query
- **Responsive Design**: Mobile-first approach with `sm:`, `md:`, etc. breakpoints
- **Font System**: Geist fonts loaded via `next/font/google` with CSS variables (`--font-geist-sans`, `--font-geist-mono`)
- **Classes**: `font-sans`, `font-mono`, `antialiased` for optimized text rendering

### TypeScript Configuration
- **Path Alias**: `@/*` maps to `./src/*` - use for all internal imports (`import { Button } from '@/components/button'`)
- **Strict Mode**: Enabled with Next.js TypeScript plugin for enhanced type-checking
- **VS Code Integration**: Use "TypeScript: Select TypeScript Version" → "Use Workspace Version" for Next.js-specific features

## Development Workflow

### Commands (npm/yarn/pnpm/bun supported)
```bash
npm run dev       # Development server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint with Next.js + TypeScript rules
```

### Development Server
- **Default**: Uses standard Next.js dev server (`next dev`)
- **Hot Reload**: Automatic page refresh on file changes
- **TypeScript**: Real-time type checking integration

### Key Files to Modify
- `src/app/page.tsx` - Home page component 
- `src/app/layout.tsx` - Root layout, metadata, and global providers
- `src/app/globals.css` - Global styles and Tailwind theme tokens
- `next.config.ts` - Next.js configuration (currently minimal)

## Project-Specific Conventions

### Component Patterns
- Server components by default in `src/app/`
- Use `Image` component from `next/image` with proper sizing
- CSS classes follow Tailwind's responsive patterns (`sm:`, `dark:`)
- Font classes use CSS variables: `font-sans`, `font-mono`
- Example patterns from codebase:
  - SVG icons: `className="dark:invert"` for theme adaptation
  - Buttons: `rounded-full border border-solid` with semantic color tokens
  - Code blocks: `bg-black/[.05] dark:bg-white/[.06]` for subtle backgrounds

### Styling Approach
- Color system uses semantic tokens (`foreground`, `background`)
- Responsive design mobile-first with `sm:` breakpoints
- Dark mode handled automatically via CSS media queries
- Use `className` patterns from existing components for consistency

### File Organization
- Static assets in `public/` (SVG icons included)
- All source code in `src/` directory
- Components and pages use default exports
- TypeScript interfaces/types can be colocated or in separate files

## External Dependencies & Integration
- React 19 with concurrent features
- Next.js 15 with stable App Router
- Tailwind CSS v4 (note: different from v3 syntax)
- ESLint with Next.js and TypeScript rules
- PostCSS with Tailwind integration

## Payload CMS Integration Patterns

### Setup for Headless CMS
- **Payload Installation**: Use `npx create-payload-app` or add to existing Next.js app
- **Next.js Plugin**: Always wrap `next.config.ts` with `withPayload()` for compatibility
- **ESM Configuration**: Ensure ESM support with `.mjs` extension or `"type": "module"` in package.json
- **Route Structure**: Payload admin typically lives in `src/app/(payload)/` using route groups

### Common Integration Patterns
- **Admin Bar**: Use `@payloadcms/admin-bar` for in-context editing on frontend
- **Draft Mode**: Leverage Next.js `draftMode()` for content preview workflows
- **API Routes**: Payload handles REST/GraphQL APIs automatically via `src/app/api/[[...slug]]/route.ts`
- **Authentication**: Payload provides built-in auth that integrates with Next.js middleware
- **Live Preview**: Real-time content updates using Payload's preview functionality

### File Organization with CMS
- **Content Types**: Define collections and globals in `payload.config.ts`
- **Components**: Separate CMS field components from frontend UI components
- **API Calls**: Use Payload's Local API (`getPayload()`) for server-side data fetching
- **Media**: Configure file uploads and image optimization with Next.js Image component

When adding new features, follow the existing patterns for font usage, responsive design, and semantic color tokens. The project is optimized for Vercel deployment but works on any Node.js platform. Consider Payload CMS for content management needs.