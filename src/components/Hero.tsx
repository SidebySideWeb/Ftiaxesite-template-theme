"use client"

import { Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type HeroProps = {
  data?: {
    badge?: string
    headline: string
    subheadline: string
    cta: {
      text: string
      linkType: 'section' | 'href'
      sectionId?: string
      href?: string
    }
    image?: {
      url: string
      alt: string
    }
    socialProof?: string
    stats?: { value: string; label: string }[]
  }
}

export default function Hero({ data }: HeroProps) {
  const handleCTAClick = () => {
    if (data?.cta.linkType === 'href' && data.cta.href) {
      // Handle external links
      window.open(data.cta.href, '_blank')
    } else if (data?.cta.linkType === 'section' && data.cta.sectionId) {
      // Handle section scrolling
      const element = document.getElementById(data.cta.sectionId)
      if (element) {
        const headerHeight = 80 // Account for fixed header height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  // Default data if none provided
  const defaultData = {
    badge: "✨ Νέα Υπηρεσία",
    headline: "Δημιουργούμε το ιστότοπό σας σε 48 ώρες",
    subheadline: "Μοντέρνα, γρήγορα και SEO-optimized websites με AI τεχνολογία. Ξεκινήστε τη διαδικτυακή σας παρουσία σήμερα.",
    cta: {
      text: "Ξεκινήστε Τώρα",
      linkType: 'section' as const,
      sectionId: 'contact'
    },
    image: undefined,
    socialProof: "Εμπιστεύονται από 250+ επιχειρήσεις",
    stats: [
      { value: "48h", label: "Παράδοση" },
      { value: "250+", label: "Πελάτες" },
      { value: "100%", label: "Ικανοποίηση" }
    ]
  }

  const heroData = data || defaultData
  const { badge, headline, subheadline, cta, image, socialProof, stats = [] } = heroData

  return (
    <section 
      id="hero"
      className="bg-gradient-to-br from-white via-cyan-50/50 to-white py-16 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {badge && (
              <div className="inline-flex items-center gap-2 text-teal font-medium text-sm md:text-base">
                <Sparkles className="w-5 h-5" />
                <span>{badge}</span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight text-balance">
              {headline}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-pretty">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {cta && cta.linkType === 'section' ? (
                <button
                  onClick={handleCTAClick}
                  className="bg-navy hover:bg-navy/90 text-white px-8 py-6 text-lg font-semibold rounded-full transition-colors"
                  aria-label={`${cta?.text} - Navigate to ${cta?.sectionId} section`}
                >
                  {cta?.text}
                </button>
              ) : cta ? (
                <Link
                  href={cta.href || '#'}
                  className="bg-navy hover:bg-navy/90 text-white px-8 py-6 text-lg font-semibold rounded-full transition-colors inline-block text-center"
                >
                  {cta.text}
                </Link>
              ) : null
              }

              {socialProof && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-teal border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-navy border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                  </div>
                  <span className="text-gray-600">{socialProof}</span>
                </div>
              )}
            </div>

            {/* Dynamic Stats */}
            {stats.length > 0 && (
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                {stats.map((item, index) => (
                  <div key={index}>
                    <div className="text-2xl md:text-3xl font-bold text-navy">
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Illustration */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-navy/10 rounded-3xl" />

              {image ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={600}
                    height={600}
                    className="w-full h-full object-contain p-8"
                    priority
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 bg-gradient-to-br from-teal/20 to-navy/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-24 h-24 text-teal" />
                  </div>
                </div>
              )}

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal rounded-2xl opacity-20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-navy rounded-2xl opacity-20 blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}