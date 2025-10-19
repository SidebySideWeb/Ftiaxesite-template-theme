import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  canonical?: string
  noindex?: boolean
  structuredData?: object
}

export function generateSEOMetadata({
  title = 'FtiAxesite.gr - Δημιουργία Ιστοσελίδων με AI | Professional Web Development',
  description = 'Δημιουργούμε επαγγελματικές ιστοσελίδες σε 48 ώρες με AI τεχνολογία. SEO-optimized, γρήγορα και responsive websites που αυξάνουν τις πωλήσεις σας.',
  keywords = 'κατασκευή ιστοσελίδων, web development, AI websites, SEO optimization, responsive design, Αθήνα, Ελλάδα',
  ogImage = '/images/og-image-ftiaxesite.jpg',
  ogType = 'website' as const,
  canonical,
  noindex = false,
}: SEOProps = {}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ftiaxesite.gr'
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`

  return {
    title,
    description,
    keywords,
    robots: noindex ? 'noindex,nofollow' : 'index,follow',
    alternates: {
      canonical: fullCanonical,
      languages: {
        'el': `${baseUrl}/gr`,
        'en': `${baseUrl}/en`,
        'x-default': baseUrl,
      },
    },
    openGraph: {
      type: ogType,
      locale: 'el_GR',
      alternateLocale: ['en_US'],
      url: fullCanonical,
      title,
      description,
      siteName: 'FtiAxesite.gr',
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullOgImage],
      creator: '@ftiaxesite',
      site: '@ftiaxesite',
    },
    other: {
      'facebook-domain-verification': 'your-facebook-domain-verification-code',
      'google-site-verification': 'your-google-site-verification-code',
    },
  }
}

// Structured Data Component
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Common structured data schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FtiAxesite.gr - Side by Side Web Studio",
  "url": "https://ftiaxesite.gr",
  "logo": "https://ftiaxesite.gr/images/logo-ftiaxesite.png",
  "description": "Επαγγελματική κατασκευή ιστοσελίδων με AI τεχνολογία. Δημιουργούμε γρήγορα, SEO-optimized websites που αυξάνουν τις πωλήσεις.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GR",
    "addressLocality": "Athens",
    "addressRegion": "Attica"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+30-123-456-7890",
    "contactType": "customer service",
    "areaServed": "GR",
    "availableLanguage": ["Greek", "English"]
  },
  "sameAs": [
    "https://www.facebook.com/ftiaxesite",
    "https://www.linkedin.com/company/ftiaxesite",
    "https://www.instagram.com/ftiaxesite"
  ]
}

export const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Κατασκευή Ιστοσελίδων με AI - FtiAxesite.gr",
  "description": "Δημιουργούμε επαγγελματικές ιστοσελίδες σε 48 ώρες με AI τεχνολογία. SEO-optimized, responsive design που αυξάνει τις πωλήσεις σας.",
  "url": "https://ftiaxesite.gr",
  "mainEntity": {
    "@type": "Service",
    "name": "AI-Powered Web Development",
    "description": "Κατασκευή ιστοσελίδων με τεχνητή νοημοσύνη",
    "provider": {
      "@type": "Organization",
      "name": "FtiAxesite.gr"
    }
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Αρχική",
        "item": "https://ftiaxesite.gr"
      }
    ]
  }
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Πόσο καιρό παίρνει να φτιαχτεί μια ιστοσελίδα;",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Με την AI τεχνολογία μας, δημιουργούμε επαγγελματικές ιστοσελίδες σε 48 ώρες. Περιλαμβάνει σχεδιασμό, ανάπτυξη, SEO optimization και testing."
      }
    },
    {
      "@type": "Question", 
      "name": "Τι περιλαμβάνει η υπηρεσία κατασκευής ιστοσελίδας;",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Responsive design, SEO optimization, Google Analytics, φόρμες επικοινωνίας, CMS για εύκολη διαχείριση περιεχομένου, και 6 μήνες δωρεάν υποστήριξη."
      }
    },
    {
      "@type": "Question",
      "name": "Οι ιστοσελίδες είναι mobile-friendly;",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ναι, όλες οι ιστοσελίδες μας είναι πλήρως responsive και βελτιστοποιημένες για mobile συσκευές. Χρησιμοποιούμε mobile-first approach για καλύτερη εμπειρία χρήστη."
      }
    }
  ]
}