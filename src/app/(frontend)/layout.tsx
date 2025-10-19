import type { Metadata } from "next";
import { Roboto, Roboto_Condensed } from 'next/font/google';
import "../globals.css";
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import GoogleTagManager from '@/components/GoogleTagManager';
import { StructuredData, organizationSchema } from '@/components/SEO';
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Header as HeaderType, Footer as FooterType } from '../../../payload-types'

const roboto = Roboto({
  subsets: ['latin', 'greek'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
});

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin', 'greek'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FtiAxesite.gr - Κατασκευή Ιστοσελίδων με AI | Professional Web Development',
  description: 'Δημιουργούμε επαγγελματικές ιστοσελίδες σε 48 ώρες με AI τεχνολογία. SEO-optimized, γρήγορα και responsive websites που αυξάνουν τις πωλήσεις σας.',
  keywords: 'κατασκευή ιστοσελίδων, web development, AI websites, SEO optimization, responsive design, Αθήνα, Ελλάδα',
  robots: 'index,follow',
  alternates: {
    canonical: 'https://ftiaxesite.gr',
    languages: {
      'el': 'https://ftiaxesite.gr/gr',
      'en': 'https://ftiaxesite.gr/en',
      'x-default': 'https://ftiaxesite.gr',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    alternateLocale: ['en_US'],
    url: 'https://ftiaxesite.gr',
    title: 'FtiAxesite.gr - Κατασκευή Ιστοσελίδων με AI',
    description: 'Δημιουργούμε επαγγελματικές ιστοσελίδες σε 48 ώρες με AI τεχνολογία. SEO-optimized, γρήγορα και responsive websites.',
    siteName: 'FtiAxesite.gr',
    images: [
      {
        url: 'https://ftiaxesite.gr/images/og-image-ftiaxesite.jpg',
        width: 1200,
        height: 630,
        alt: 'FtiAxesite.gr - AI-Powered Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FtiAxesite.gr - Κατασκευή Ιστοσελίδων με AI',
    description: 'Δημιουργούμε επαγγελματικές ιστοσελίδες σε 48 ώρες με AI τεχνολογία.',
    images: ['https://ftiaxesite.gr/images/og-image-ftiaxesite.jpg'],
    creator: '@ftiaxesite',
    site: '@ftiaxesite',
  },
  other: {
    'google-site-verification': 'your-google-site-verification-code',
    'facebook-domain-verification': 'your-facebook-domain-verification-code',
  },
};

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get header and footer data from CMS
  let headerData = null;
  let footerData = null;
  
  try {
    const payload = await getPayload({ config })
    
    // Fetch header data
    const header = await payload.findGlobal({
      slug: 'header',
    }) as HeaderType
    
    if (header) {
      headerData = {
        logo: {
          type: header.logo?.type || 'text' as const,
          text: header.logo?.text || 'ftiaxesite.gr',
          image: typeof header.logo?.image === 'object' && header.logo?.image ? { alt: 'Logo' } : undefined
        },
        navigation: (header.navigation || []).map((item: { label: string; linkType?: string | null; sectionId?: string | null; externalUrl?: string | null; url?: string | null }) => ({
          label: item.label,
          linkType: item.linkType === 'external' ? 'href' as const : 'section' as const,
          sectionId: item.sectionId || undefined,
          href: item.url || item.externalUrl || undefined
        })),
        cta: header.cta?.enabled ? {
          label: header.cta.text || '',
          linkType: header.cta.linkType === 'external' ? 'href' as const : 'section' as const,
          sectionId: header.cta.sectionId || undefined,
          href: header.cta.url || header.cta.externalUrl || undefined
        } : undefined
      }
    }

    // Fetch footer data
    const footer = await payload.findGlobal({
      slug: 'footer',
    }) as FooterType
    
    if (footer) {
      footerData = {
        brand: {
          name: footer.company?.name || 'FtiAxesite.gr',
          tagline: footer.company?.description || 'Δημιουργούμε μοντέρνες ιστοσελίδες που φέρνουν αποτελέσματα.'
        },
        contact: {
          title: 'Επικοινωνήστε μαζί μας',
          email: footer.contact?.email || 'info@ftiaxesite.gr',
          phone: footer.contact?.phone || '+30 123 456 7890'
        },
        links: {
          title: 'Γρήγοροι Σύνδεσμοι',
          items: (footer.links?.quickLinks || []).map((link: { label: string; linkType?: string | null; sectionId?: string | null; externalUrl?: string | null; url?: string | null }) => ({
            label: link.label,
            href: link.url || (link.linkType === 'external' ? (link.externalUrl || '#') : `#${link.sectionId || 'top'}`)
          }))
        },
        social: {
          facebook: footer.social?.facebook || undefined,
          instagram: footer.social?.instagram || undefined,
          linkedin: footer.social?.linkedin || undefined,
          twitter: footer.social?.twitter || undefined
        },
        copyright: footer.company?.copyright || '© 2025 FtiAxesite.gr. Όλα τα δικαιώματα κατοχυρωμένα.'
      }
    }
  } catch (error) {
    console.log('Using default header/footer:', error)
  }

  return (
    <>
      {/* Structured data for this specific layout */}
      <StructuredData data={organizationSchema} />
      <GoogleTagManager />
      
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-navy focus:text-white focus:rounded focus:no-underline"
      >
        Skip to main content
      </a>
      
      <div className={`${roboto.variable} ${robotoCondensed.variable} min-h-screen pt-24`}>
        <SiteHeader data={headerData || undefined} />
        <main className="" aria-label="Main content" id="main-content">
          {children}
        </main>
        <Footer data={footerData || undefined} />
      </div>
    </>
  );
}