import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Process from '@/components/Process'
import ContactForm from '@/components/ContactForm'
import { StructuredData, webPageSchema, faqSchema } from '@/components/SEO'
import { generateMetadataFromCMS, generateStructuredDataFromCMS } from '@/utils/seoHelpers'
import { sampleHeroData, sampleFeaturesData, sampleProcessData, sampleContactData } from '@/data/sampleData'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Metadata } from 'next'

// FtiAxesite.gr Greek landing page - Now connected to Payload CMS
// Content is editable through admin panel at /admin
/* eslint-disable @typescript-eslint/no-explicit-any */

export async function generateMetadata(): Promise<Metadata> {
  let homepageData;
  
  try {
    const payload = await getPayload({ config })
    homepageData = await payload.findGlobal({
      slug: 'homepage',
    })
  } catch (error) {
    console.log('Error fetching homepage SEO data:', error)
    homepageData = null
  }

  // Use CMS SEO data if available, otherwise fallback to hardcoded values
  const seoData = (homepageData as any)?.seo
  if (seoData) {
    return generateMetadataFromCMS(
      {
        title: 'FtiAxesite.gr - Κατασκευή Ιστοσελίδων με AI σε 48 Ώρες',
        excerpt: 'Δημιουργούμε επαγγελματικές ιστοσελίδες σε 48 ώρες με AI τεχνολογία. SEO-optimized, γρήγορα και responsive websites που αυξάνουν τις πωλήσεις σας. Ξεκινήστε σήμερα!',
        seo: seoData,
        featuredImage: (homepageData as any)?.hero?.heroImage && typeof (homepageData as any).hero.heroImage === 'object' ? {
          url: `/api/media/file/${(homepageData as any).hero.heroImage.filename || ''}`,
          alt: (homepageData as any).hero.heroImage.alt || 'FtiAxesite.gr Hero Image'
        } : undefined
      },
      'FtiAxesite.gr - Κατασκευή Ιστοσελίδων με AI σε 48 Ώρες | Professional Web Development',
      'Δημιουργούμε επαγγελματικές ιστοσελίδες σε 48 ώρες με AI τεχνολογία. SEO-optimized, γρήγορα και responsive websites που αυξάνουν τις πωλήσεις σας. Ξεκινήστε σήμερα!'
    )
  }

  // Fallback metadata
  return {
    title: 'FtiAxesite.gr - Κατασκευή Ιστοσελίδων με AI σε 48 Ώρες | Professional Web Development',
    description: 'Δημιουργούμε επαγγελματικές ιστοσελίδες σε 48 ώρες με AI τεχνολογία. SEO-optimized, γρήγορα και responsive websites που αυξάνουν τις πωλήσεις σας. Ξεκινήστε σήμερα!',
    keywords: 'κατασκευή ιστοσελίδων, web development, AI websites, SEO optimization, responsive design, Αθήνα, Ελλάδα, ftiaxesite',
    alternates: {
      canonical: 'https://ftiaxesite.gr',
    },
    openGraph: {
      title: 'Κατασκευή Ιστοσελίδων με AI σε 48 Ώρες - FtiAxesite.gr',
      description: 'Επαγγελματικές ιστοσελίδες με AI τεχνολογία. SEO-ready, responsive design που αυξάνει τις πωλήσεις σας.',
      url: 'https://ftiaxesite.gr',
      images: [
        {
          url: 'https://ftiaxesite.gr/images/og-image-homepage.jpg',
          width: 1200,
          height: 630,
          alt: 'FtiAxesite.gr - AI-Powered Website Development in 48 Hours',
        },
      ],
    },
  }
}

export default async function Home() {
  let homepageData;
  
  try {
    const payload = await getPayload({ config })
    homepageData = await payload.findGlobal({
      slug: 'homepage',
    })
    console.log('Homepage data fetched successfully:', !!homepageData)
    console.log('Homepage data keys:', homepageData ? Object.keys(homepageData) : 'no data')
  } catch (error) {
    console.log('Using sample data as fallback:', error)
    homepageData = null
  }

  // Generate dynamic structured data from CMS content
  const dynamicWebPageSchema = (homepageData as any)?.seo ? generateStructuredDataFromCMS(
    {
      title: 'FtiAxesite.gr - Κατασκευή Ιστοσελίδων με AI σε 48 Ώρες',
      excerpt: 'Δημιουργούμε επαγγελματικές ιστοσελίδες σε 48 ώρες με AI τεχνολογία',
      seo: (homepageData as any).seo,
      featuredImage: (homepageData as any)?.hero?.heroImage && typeof (homepageData as any).hero.heroImage === 'object' ? {
        url: `/api/media/file/${(homepageData as any).hero.heroImage.filename || ''}`,
        alt: (homepageData as any).hero.heroImage.alt || 'FtiAxesite.gr Hero Image'
      } : undefined
    },
    'WebPage'
  ) : webPageSchema

  // Transform CMS data to component format, with fallback to sample data

  const heroData = homepageData?.hero ? {
    badge: homepageData.hero.badge || '',
    headline: homepageData.hero.headline,
    subheadline: homepageData.hero.subheadline,
    cta: homepageData.hero.cta ? {
      text: homepageData.hero.cta.text,
      linkType: 'href' as const,
      href: homepageData.hero.cta.url || '#contact'
    } : {
      text: 'Ξεκίνα Τώρα',
      linkType: 'section' as const,
      sectionId: 'contact'
    },
  } : sampleHeroData

  const featuresData = homepageData?.features ? {
    title: homepageData.features.title,
    subtitle: homepageData.features.subtitle,
    items: (homepageData.features.items || []).map(item => ({
      icon: item.icon,
      title: item.title,
      description: item.description
    }))
  } : sampleFeaturesData

  // Use sample data for process since it's not in simplified config
  const processData = sampleProcessData

  const contactData = homepageData?.contact ? {
    title: homepageData.contact.title,
    subtitle: homepageData.contact.subtitle,
    form: sampleContactData.form // Use sample form data
  } : sampleContactData

  return (
    <>
      <StructuredData data={dynamicWebPageSchema} />
      <StructuredData data={faqSchema} />
      
      {/* Hero Section - Editable via CMS */}
      <Hero data={heroData} />
      
      {/* Features Section - Editable via CMS */}
      <Features data={featuresData} />
      
      {/* Process Section - Editable via CMS */}
      <Process data={processData} />
      
      {/* Contact Section - Editable via CMS */}
      <ContactForm data={contactData} />
    </>
  )
}