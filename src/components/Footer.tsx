import { Mail, Phone, Globe, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

type FooterProps = {
  data?: {
    brand?: {
      name: string
      tagline: string
    }
    contact?: {
      title: string
      email: string
      phone: string
    }
    links?: {
      title: string
      items: {
        label: string
        href: string
      }[]
    }
    social?: {
      facebook?: string
      instagram?: string
      linkedin?: string
      twitter?: string
    }
    copyright?: string
  }
}

export default function Footer({ data }: FooterProps) {
  // Default data to match ftiaxesite-starter
  const defaultData = {
    brand: {
      name: "Ftiaxesite.gr",
      tagline: "Κατασκευάζουμε Website με τη βοήθεια του AI"
    },
    contact: {
      title: "Επικοινωνήστε μαζί μας",
      email: "dgeronikolos@sidebysideweb.gr",
      phone: "+30215 530 7945"
    },
    links: {
      title: "Powered by",
      items: [
        { label: "Side by Side Web Studio", href: "https://www.ftiaxesite.gr/sidebysideweb.gr" }
      ]
    },
    social: {
      facebook: undefined,
      instagram: undefined,
      linkedin: undefined,
      twitter: undefined
    },
    copyright: "Copyright @2025"
  }

  const footerData = data || defaultData
  const { brand, contact, links, social, copyright } = footerData

  return (
    <footer className="bg-navy text-white py-16">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          {brand && (
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Globe className="h-6 w-6 text-teal" />
                <h3 className="text-xl font-bold">{brand.name}</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">{brand.tagline}</p>
              
              {/* Social Media */}
              {social && (social.facebook || social.instagram || social.linkedin || social.twitter) && (
                <div className="flex items-center justify-center md:justify-start gap-3">
                  {social.facebook && (
                    <a
                      href={social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-teal transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                  {social.instagram && (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-teal transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-teal transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {social.twitter && (
                    <a
                      href={social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-teal transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Contact */}
          {contact && (
            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-4 text-teal">{contact.title}</h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-teal transition-colors text-sm"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-teal transition-colors text-sm"
                >
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </a>
              </div>
            </div>
          )}

          {/* Links */}
          {links && links.items && (
            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-4 text-teal">{links.title}</h4>
              <ul className="space-y-2">
                {links.items.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-teal transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Copyright */}
        {copyright && (
          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  )
}
