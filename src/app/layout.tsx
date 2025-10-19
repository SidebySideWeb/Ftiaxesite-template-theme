import type { Metadata } from "next";
import "./globals.css";
import Performance from '@/components/Performance'
import { Roboto, Roboto_Condensed } from 'next/font/google';

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
  title: "ftiaxesite.gr – Website Development",
  description: "Professional website development services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className="scroll-smooth">
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Resource hints for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* SEO and language links */}
        <link rel="canonical" href="https://ftiaxesite.gr" />
        <link rel="alternate" hrefLang="el" href="https://ftiaxesite.gr/gr" />
        <link rel="alternate" hrefLang="en" href="https://ftiaxesite.gr/en" />
        <link rel="alternate" hrefLang="x-default" href="https://ftiaxesite.gr" />
        
        {/* Critical CSS inline for faster rendering */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html { scroll-behavior: smooth; }
            body { margin: 0; padding: 0; }
            .loading { opacity: 0; animation: fadeIn 0.3s ease-in forwards; }
            @keyframes fadeIn { to { opacity: 1; } }
          `
        }} />
      </head>
      <body className={`${roboto.variable} ${robotoCondensed.variable} loading font-sans antialiased`}>
        {/* Core Web Vitals monitoring */}
        <Performance />
        {children}
      </body>
    </html>
  );
}
