import { Metadata } from 'next'

export interface CMSSEOData {
  metaTitle?: string
  metaDescription?: string
  keywords?: string
  canonicalUrl?: string
  openGraph?: {
    title?: string
    description?: string
    image?: {
      url: string
      alt?: string
    }
    type?: 'website' | 'article' | 'profile'
  }
  twitter?: {
    cardType?: 'summary' | 'summary_large_image' | 'app' | 'player'
    title?: string
    description?: string
    image?: {
      url: string
      alt?: string
    }
  }
  structuredData?: {
    type?: string
    customSchema?: Record<string, unknown>
  }
  noIndex?: boolean
  noFollow?: boolean
}

export interface PageData {
  title?: string
  excerpt?: string
  content?: string | Array<{
    type: string
    text?: string
    children?: Array<{ text: string }>
  }>
  featuredImage?: {
    url: string
    alt?: string
    filename?: string
  }
  seo?: CMSSEOData
}

// Helper function to generate metadata from CMS data
export function generateMetadataFromCMS(
  data: PageData,
  fallbackTitle: string = 'FtiAxesite.gr',
  fallbackDescription: string = 'Κατασκευή επαγγελματικών ιστοσελίδων με AI τεχνολογία'
): Metadata {
  const seo = data.seo || {}
  
  // Generate title with fallbacks
  const title = seo.metaTitle || data.title || fallbackTitle
  
  // Generate description with fallbacks
  let description = seo.metaDescription || data.excerpt || fallbackDescription
  if (typeof description !== 'string' && data.content) {
    // Extract plain text from rich content
    if (typeof data.content === 'string') {
      description = data.content.replace(/<[^>]*>/g, '').substring(0, 160)
    } else if (Array.isArray(data.content)) {
      description = data.content
        .filter(block => block.type === 'paragraph' || block.type === 'text')
        .map(block => block.children?.map((child: { text: string }) => child.text).join('') || block.text || '')
        .join(' ')
        .substring(0, 160)
    }
  }

  // Get featured image
  const featuredImageUrl = seo.openGraph?.image?.url || data.featuredImage?.url
  const featuredImageAlt = seo.openGraph?.image?.alt || data.featuredImage?.alt || title

  // Generate canonical URL
  const canonicalUrl = seo.canonicalUrl || 'https://ftiaxesite.gr'

  // Generate robots directive
  let robots = 'index, follow'
  if (seo.noIndex) robots = 'noindex'
  if (seo.noFollow) robots += ', nofollow'

  const metadata: Metadata = {
    title,
    description,
    keywords: seo.keywords,
    robots,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.openGraph?.title || title,
      description: seo.openGraph?.description || description,
      url: canonicalUrl,
      type: seo.openGraph?.type || 'website',
      siteName: 'FtiAxesite.gr',
      locale: 'el_GR',
      ...(featuredImageUrl && {
        images: [
          {
            url: featuredImageUrl.startsWith('http') ? featuredImageUrl : `https://ftiaxesite.gr${featuredImageUrl}`,
            width: 1200,
            height: 630,
            alt: featuredImageAlt,
          },
        ],
      }),
    },
    twitter: {
      card: seo.twitter?.cardType || 'summary_large_image',
      title: seo.twitter?.title || seo.openGraph?.title || title,
      description: seo.twitter?.description || seo.openGraph?.description || description,
      site: '@ftiaxesite',
      creator: '@ftiaxesite',
      ...(seo.twitter?.image?.url || featuredImageUrl ? {
        images: [
          {
            url: (seo.twitter?.image?.url || featuredImageUrl || '').startsWith('http') 
              ? (seo.twitter?.image?.url || featuredImageUrl || '')
              : `https://ftiaxesite.gr${seo.twitter?.image?.url || featuredImageUrl || ''}`,
            alt: seo.twitter?.image?.alt || featuredImageAlt,
          },
        ],
      } : {}),
    },
  }

  return metadata
}

// Helper function to generate structured data from CMS content
export function generateStructuredDataFromCMS(data: PageData, type: string = 'WebPage') {
  const seo = data.seo || {}
  const title = seo.metaTitle || data.title || 'FtiAxesite.gr'
  const description = seo.metaDescription || data.excerpt || 'Κατασκευή επαγγελματικών ιστοσελίδων'
  const canonicalUrl = seo.canonicalUrl || 'https://ftiaxesite.gr'
  
  let baseSchema = {}

  switch (seo.structuredData?.type || type) {
    case 'Article':
      baseSchema = {
        '@type': 'Article',
        headline: title,
        description,
        url: canonicalUrl,
        author: {
          '@type': 'Organization',
          name: 'FtiAxesite.gr',
        },
        publisher: {
          '@type': 'Organization',
          name: 'FtiAxesite.gr',
          logo: {
            '@type': 'ImageObject',
            url: 'https://ftiaxesite.gr/logo.png',
          },
        },
        ...(data.featuredImage?.url && {
          image: {
            '@type': 'ImageObject',
            url: data.featuredImage.url.startsWith('http') 
              ? data.featuredImage.url 
              : `https://ftiaxesite.gr${data.featuredImage.url}`,
            alt: data.featuredImage.alt || title,
          },
        }),
      }
      break

    case 'Product':
    case 'Service':
      baseSchema = {
        '@type': seo.structuredData?.type || 'Service',
        name: title,
        description,
        url: canonicalUrl,
        provider: {
          '@type': 'Organization',
          name: 'FtiAxesite.gr',
        },
      }
      break

    default:
      baseSchema = {
        '@type': 'WebPage',
        name: title,
        description,
        url: canonicalUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: 'FtiAxesite.gr',
          url: 'https://ftiaxesite.gr',
        },
      }
  }

  const structuredData = {
    '@context': 'https://schema.org',
    ...baseSchema,
    // Merge with custom schema if provided
    ...(seo.structuredData?.customSchema || {}),
  }

  return structuredData
}