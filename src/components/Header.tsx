"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type NavItem = {
  label: string
  href?: string
  linkType: 'section' | 'href'
  sectionId?: string
}

type HeaderProps = {
  data?: {
    logo?: {
      type: 'text' | 'image'
      text?: string
      image?: {
        url: string
        alt: string
      }
    }
    navigation?: NavItem[]
    cta?: {
      label: string
      linkType: 'section' | 'href'
      sectionId?: string
      href?: string
    }
  }
}

export default function Header({ data }: HeaderProps) {
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

  const handleNavClick = (item: NavItem) => {
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
  const defaultData = {
    logo: {
      type: 'text' as const,
      text: 'ftiaxesite.gr'
    },
    navigation: [
      { label: 'Αρχική', linkType: 'section' as const, sectionId: 'hero' },
      { label: 'Υπηρεσίες', linkType: 'section' as const, sectionId: 'features' },
      { label: 'Διαδικασία', linkType: 'section' as const, sectionId: 'process' },
      { label: 'Επικοινωνία', linkType: 'section' as const, sectionId: 'contact' },
    ],
    cta: {
      label: 'Επικοινωνία',
      linkType: 'section' as const,
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
                  <Image
                    src={headerData.logo.image.url}
                    alt={headerData.logo.image.alt || 'Logo'}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <Globe className="h-6 w-6 text-brand-teal" />
              )}
              <span className="font-bold text-lg text-brand-navy">
                {headerData.logo?.type === 'text' && headerData.logo.text 
                  ? headerData.logo.text 
                  : headerData.logo?.type === 'image' && headerData.logo.image?.alt
                  ? headerData.logo.image.alt
                  : 'MyWebsite'
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
                      className="group relative text-base font-medium text-gray-700 transition-all duration-300 hover:text-brand-teal hover:scale-105"
                    >
                      <span className="relative z-10">{item.label}</span>
                      <div className="absolute inset-0 -z-10 rounded-lg bg-brand-teal/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"></div>
                    </button>
                  )
                }
                
                return (
                  <Link
                    key={index}
                    href={item.href || '#'}
                    className="group relative text-base font-medium text-gray-700 transition-all duration-300 hover:text-brand-teal hover:scale-105"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 -z-10 rounded-lg bg-brand-teal/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"></div>
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
                    className="hidden md:inline-flex bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brand-teal/25 active:scale-95"
                  >
                    {headerData.cta.label}
                  </button>
                ) : (
                  <Link
                    href={headerData.cta.href || '#'}
                    className="hidden md:inline-flex bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brand-teal/25 active:scale-95"
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
              className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold shadow-lg py-6 text-base rounded-none transition-all duration-300 active:scale-95 hover:shadow-xl"
            >
              {headerData.cta.label}
            </button>
          ) : (
            <Link
              href={headerData.cta.href || '#'}
              className="block w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold shadow-lg py-6 text-base rounded-none transition-all duration-300 text-center active:scale-95 hover:shadow-xl"
            >
              {headerData.cta.label}
            </Link>
          )}
        </div>
      )}
    </>
  )
}