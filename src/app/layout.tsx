import type { Metadata } from 'next'
import { playfair, inter } from '@/fonts'
import { siteMetadata, organizationJsonLd } from '@/lib/metadata'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className='font-sans bg-charcoal-950 text-text-primary'>
        <a href='#main' className='skip-to-content'>Skip to main content</a>
        <Navbar />
        <main id='main'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
