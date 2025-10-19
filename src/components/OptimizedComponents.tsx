import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load non-critical components for better performance
const Features = dynamic(() => import('./Features'), {
  loading: () => (
    <div className="py-24 animate-pulse">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  ssr: true, // Enable SSR for SEO
})

const Process = dynamic(() => import('./Process'), {
  loading: () => (
    <div className="py-24 animate-pulse">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  ssr: true,
})

const ContactForm = dynamic(() => import('./ContactForm'), {
  loading: () => (
    <div className="py-24 animate-pulse">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
            <div className="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false, // Contact form doesn't need SSR
})

// Critical component that should load immediately
import Hero from './Hero'

interface HeroData {
  badge?: string
  headline: string
  subheadline: string
  cta: {
    text: string
    linkType: 'section' | 'href'
    sectionId?: string
    href?: string
  }
  socialProof?: string
  image?: {
    url: string
    alt: string
  }
  stats?: Array<{
    value: string
    label: string
  }>
}

interface FeatureItem {
  icon: string
  title: string
  description: string
}

interface FeaturesData {
  title: string
  subtitle: string
  items: FeatureItem[]
}

interface ProcessStep {
  number: string
  icon: string
  title: string
  description: string
  color?: 'teal' | 'navy'
}

interface ProcessData {
  title: string
  subtitle: string
  steps: ProcessStep[]
}

interface ContactData {
  title: string
  subtitle: string
  form: {
    name: string
    email: string
    phone: string
    voicePrompt: string
    voiceListening: string
    voiceTranscript: string
    submit: string
  }
}

interface OptimizedComponentsProps {
  heroData: HeroData
  featuresData: FeaturesData
  processData: ProcessData
  contactData: ContactData
}

export default function OptimizedComponents({
  heroData,
  featuresData,
  processData,
  contactData,
}: OptimizedComponentsProps) {
  return (
    <>
      {/* Critical above-the-fold content */}
      <Hero data={heroData} />
      
      {/* Non-critical components with lazy loading */}
      <Suspense fallback={<div className="py-24 bg-gray-50 animate-pulse"></div>}>
        <Features data={featuresData} />
      </Suspense>
      
      <Suspense fallback={<div className="py-24 animate-pulse"></div>}>
        <Process data={processData} />
      </Suspense>
      
      <Suspense fallback={<div className="py-24 bg-gray-50 animate-pulse"></div>}>
        <ContactForm data={contactData} />
      </Suspense>
    </>
  )
}