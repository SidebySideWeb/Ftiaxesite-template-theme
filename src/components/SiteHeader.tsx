"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"
import Link from "next/link"

type HeaderData = {
  logo?: {
    type: 'text' | 'image'
    text?: string
    image?: {
      alt: string
    }
  }
  navigation?: {
    label: string
    linkType: 'section' | 'href'
    sectionId?: string
    href?: string
  }[]
  cta?: {
    label: string
    linkType: 'section' | 'href'
    sectionId?: string
    href?: string
  }
}

type HeaderProps = {
  data?: HeaderData | null
}

export default function SiteHeader({ data }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Ensure we're on the client side
    setMounted(true)
    
    // Only set up scroll listener after mount
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    // Check initial scroll position
    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
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

  const handleNavClick = (item: NonNullable<HeaderData['navigation']>[0]) => {
    if (item.linkType === 'section' && item.sectionId) {
      scrollToSection(item.sectionId)
    }
  }

  const handleCtaClick = () => {
    if (data?.cta?.linkType === 'section' && data.cta.sectionId) {
      scrollToSection(data.cta.sectionId)
    }
  }

  // Default data if none provided
  const defaultData: HeaderData = {
    logo: {
      type: 'text',
      text: 'ftiaxesite.gr'
    },
    navigation: [
      { label: 'Αρχική', linkType: 'section', sectionId: 'hero' },
      { label: 'Υπηρεσίες', linkType: 'section', sectionId: 'features' },
      { label: 'Διαδικασία', linkType: 'section', sectionId: 'process' },
      { label: 'Επικοινωνία', linkType: 'section', sectionId: 'contact' }
    ],
    cta: {
      label: 'Ξεκινήστε Σήμερα',
      linkType: 'section',
      sectionId: 'contact'
    }
  }

  const headerData = data || defaultData

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mounted && isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80">
              {headerData.logo?.type === 'image' && headerData.logo.image ? (
                <div className="h-8 w-8 relative">
                  <Globe className="h-6 w-6 text-navy" />
                </div>
              ) : (
                <Globe className="h-6 w-6 text-navy" />
              )}
              <span className="font-bold text-lg text-navy">
                {headerData.logo?.type === 'text' && headerData.logo.text 
                  ? headerData.logo.text 
                  : headerData.logo?.type === 'image' && headerData.logo.image?.alt
                  ? headerData.logo.image.alt
                  : 'ftiaxesite.gr'
                }
              </span>
            </Link>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {headerData.navigation?.map((item, index) => {
                if (item.linkType === 'section') {
                  return (
                    <button
                      key={index}
                      onClick={() => handleNavClick(item)}
                      className="group relative text-base font-medium text-gray-700 transition-all duration-300 hover:text-teal-high-contrast hover:scale-105 focus:outline-navy focus:ring-navy"
                    >
                      <span className="relative z-10">{item.label}</span>
                      <div className="absolute inset-0 -z-10 rounded-lg bg-teal/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"></div>
                    </button>
                  )
                }
                
                return (
                  <Link
                    key={index}
                    href={item.href || '#'}
                    className="group relative text-base font-medium text-gray-700 transition-all duration-300 hover:text-teal-high-contrast hover:scale-105 focus:outline-navy focus:ring-navy"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 -z-10 rounded-lg bg-teal/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"></div>
                  </Link>
                )
              })}
            </div>

            {/* CTA */}
            {headerData.cta && (
              <>
                {headerData.cta.linkType === 'section' ? (
                  <button
                    onClick={handleCtaClick}
                    className="hidden md:inline-flex bg-teal-high-contrast hover:bg-navy text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal/25 active:scale-95 focus:outline-navy focus:ring-navy"
                    aria-label={`Go to ${headerData.cta.label} section`}
                  >
                    {headerData.cta.label}
                  </button>
                ) : (
                  <Link
                    href={headerData.cta.href || '#'}
                    className="hidden md:inline-flex bg-teal-high-contrast hover:bg-navy text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal/25 active:scale-95 focus:outline-navy focus:ring-navy"
                    aria-label={`Navigate to ${headerData.cta.label}`}
                  >
                    {headerData.cta.label}
                  </Link>
                )}
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile CTA */}
      {headerData.cta && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-white via-white to-transparent pt-8 pb-2">
          {headerData.cta.linkType === 'section' ? (
            <button
              onClick={handleCtaClick}
              className="w-full bg-teal-high-contrast hover:bg-navy text-white font-semibold shadow-lg py-6 text-base rounded-none transition-all duration-300 active:scale-95 hover:shadow-xl focus:outline-navy focus:ring-navy"
              aria-label={`Go to ${headerData.cta.label} section`}
            >
              {headerData.cta.label}
            </button>
          ) : (
            <Link
              href={headerData.cta.href || '#'}
              className="block w-full bg-teal-high-contrast hover:bg-navy text-white font-semibold shadow-lg py-6 text-base rounded-none transition-all duration-300 text-center active:scale-95 hover:shadow-xl focus:outline-navy focus:ring-navy"
              aria-label={`Navigate to ${headerData.cta.label}`}
            >
              {headerData.cta.label}
            </Link>
          )}
        </div>
      )}
    </>
  )
}
