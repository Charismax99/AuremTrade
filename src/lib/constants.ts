// ============================================================
// AUREM CAPITAL — Site Constants & Placeholder Content
// ============================================================
// All company-specific copy is centralized here.
// PLACEHOLDER values must be replaced with verified information.
// ============================================================

export const SITE_NAME = 'Aurem Capital';
export const SITE_TAGLINE = 'Where Insight Meets Opportunity';

export const SITE_DESCRIPTION =
  'Trading, market research, market insights, and educational content for clients navigating global financial markets.';

// PLACEHOLDER — replace with actual domain
export const SITE_URL = 'https://auremcapital.com';

// ------------------------------------------------------------
// Navigation
// ------------------------------------------------------------

export const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Markets', href: '/#markets' },
  { label: 'Intelligence', href: '/#intelligence' },
  { label: 'Approach', href: '/#approach' },
  { label: 'Contact', href: '/#contact' },
] as const;

export const NAV_CTA = { label: 'Get Started', href: '/#lead-form' } as const;

// ------------------------------------------------------------
// Hero Section
// ------------------------------------------------------------

export const HERO = {
  headline: 'Precision. Perspective. Performance.',
  subheadline:
    'Institutional-grade trading and market research across global financial markets.',
  primaryCta: { label: 'Get Started', href: '#lead-form' },
  secondaryCta: { label: 'Explore Our Markets', href: '#markets' },
};

// ------------------------------------------------------------
// About Section
// ------------------------------------------------------------

export const ABOUT = {
  heading: 'About Aurem Capital',
  // PLACEHOLDER — replace with verified company description
  paragraphs: [
    'Aurem Capital is a trading and market research firm dedicated to navigating global financial markets with discipline, precision, and insight.',
    'Our approach is built on rigorous research, systematic analysis, and a commitment to informed decision-making across every market we operate in.',
    'We combine deep market expertise with a methodical framework designed to identify opportunities and manage risk with clarity and conviction.',
  ],
};

// ------------------------------------------------------------
// Markets Section
// ------------------------------------------------------------

export const MARKETS = {
  heading: 'Global Markets',
  subheading:
    "Comprehensive coverage across the world's most dynamic financial markets.",
  items: [
    {
      name: 'Forex',
      description:
        'Major, minor, and exotic currency pairs across global foreign exchange markets.',
      icon: 'ArrowLeftRight' as const,
    },
    {
      name: 'Indices',
      description:
        'Leading global equity indices spanning major economies and regions worldwide.',
      icon: 'TrendingUp' as const,
    },
    {
      name: 'Commodities',
      description:
        'Precious metals, energy, and agricultural commodities across global exchanges.',
      icon: 'Gem' as const,
    },
    {
      name: 'Equities',
      description:
        'Individual equities and sector exposure across established and emerging markets.',
      icon: 'Landmark' as const,
    },
    {
      name: 'Digital Assets',
      description:
        'Cryptocurrency and digital asset markets with institutional-grade research and analysis.',
      icon: 'Hexagon' as const,
    },
  ],
};

// ------------------------------------------------------------
// Market Intelligence Section
// ------------------------------------------------------------

export const INTELLIGENCE = {
  heading: 'Market Intelligence',
  subheading: 'Research-driven insights that inform every decision.',
  mainPanel: {
    title: 'Research & Analysis',
    description:
      'Our research framework combines fundamental analysis, technical study, and macroeconomic context to develop a comprehensive market perspective. Every position is supported by rigorous, multi-layered analysis.',
  },
  sidePanel: {
    title: 'Market Context',
    description:
      'Understanding the broader economic environment is essential. We continuously monitor global macro developments, policy shifts, and cross-market correlations to maintain an informed perspective.',
  },
  pillars: [
    { label: 'Fundamental Analysis', icon: 'BookOpen' as const },
    { label: 'Technical Research', icon: 'LineChart' as const },
    { label: 'Macro Context', icon: 'Globe' as const },
  ],
};

// ------------------------------------------------------------
// Approach Section
// ------------------------------------------------------------

export const APPROACH = {
  heading: 'Our Approach',
  subheading: 'A disciplined methodology built on four pillars.',
  steps: [
    {
      number: 1,
      title: 'Research',
      description:
        'Deep market research and comprehensive data gathering form the foundation of every decision we make.',
    },
    {
      number: 2,
      title: 'Analysis',
      description:
        'Rigorous fundamental and technical analysis to identify opportunities with clear conviction.',
    },
    {
      number: 3,
      title: 'Risk Management',
      description:
        'Disciplined risk frameworks and position management to protect capital and optimize outcomes.',
    },
    {
      number: 4,
      title: 'Execution',
      description:
        'Precise trade execution with continuous monitoring and systematic performance review.',
    },
  ],
};

// ------------------------------------------------------------
// CTA Section
// ------------------------------------------------------------

export const CTA = {
  heading: 'Elevate Your Market Perspective',
  description:
    'Connect with our team to learn how Aurem Capital can work for you.',
  primaryCta: { label: 'Get Started', href: '#lead-form' },
  contactEmail: 'info@aurem.trade',
};

// ------------------------------------------------------------
// Footer
// ------------------------------------------------------------

export const FOOTER = {
  tagline: 'Institutional-grade trading and market research.',
  disclaimer: 'Legal & Risk Disclosures',
  copyright: '\u00A9 2026 Aurem Capital. All rights reserved.',
  socialLinks: [
    // PLACEHOLDER — replace with actual social media URLs
    { label: 'LinkedIn', href: '#', icon: 'Linkedin' as const },
    { label: 'X', href: '#', icon: 'Twitter' as const },
  ],
};
