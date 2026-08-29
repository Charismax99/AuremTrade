import type { Metadata } from 'next';
import { CTA, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_URL } from './constants';

// PLACEHOLDER — update these values when domain and brand assets are finalized

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Aurem Capital',
    'trading',
    'market research',
    'market insights',
    'trading education',
    'financial education',
    'lead generation',
    'trading inquiries',
    'financial markets',
    'forex',
    'indices',
    'commodities',
    'equities',
    'digital assets',
    'institutional trading',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD Structured Data — Organization schema
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  // PLACEHOLDER — replace with actual domain
  url: SITE_URL,
  logo: `${SITE_URL}/images/aurem-logo.png`,
  description: SITE_DESCRIPTION,
  email: CTA.contactEmail,
  // PLACEHOLDER — add sameAs URLs when social profiles are confirmed
  sameAs: [],
};
