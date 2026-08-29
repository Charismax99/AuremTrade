'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { HERO } from '@/lib/constants';

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-charcoal-950 noise-overlay">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(198,149,59,0.075)_0%,rgba(14,14,14,0.18)_34%,transparent_68%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.12)_0%,transparent_36%,rgba(8,8,8,0.72)_100%)]" />
        <svg
          aria-hidden="true"
          focusable="false"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 900"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="hero-grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M64 0H0V64" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
            <linearGradient id="hero-gold-line" x1="40" y1="790" x2="1510" y2="125" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7A5A20" stopOpacity="0" />
              <stop offset="0.32" stopColor="#9A7228" stopOpacity="0.26" />
              <stop offset="0.74" stopColor="#C6953B" stopOpacity="0.42" />
              <stop offset="1" stopColor="#E2C47A" stopOpacity="0.06" />
            </linearGradient>
            <radialGradient id="hero-orbit-fill" cx="0" cy="0" r="1" gradientTransform="translate(1270 330) rotate(139) scale(418 360)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D4AF5E" stopOpacity="0.055" />
              <stop offset="1" stopColor="#D4AF5E" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hero-ribbon-fill" x1="300" y1="830" x2="1380" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C6953B" stopOpacity="0" />
              <stop offset="0.56" stopColor="#C6953B" stopOpacity="0.045" />
              <stop offset="1" stopColor="#E2C47A" stopOpacity="0" />
            </linearGradient>
            <mask id="hero-grid-mask">
              <rect width="1600" height="900" fill="url(#hero-grid-fade)" />
            </mask>
            <radialGradient id="hero-grid-fade" cx="0" cy="0" r="1" gradientTransform="translate(1120 430) rotate(180) scale(650 520)" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.8" />
              <stop offset="1" stopColor="black" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1600" height="900" fill="url(#hero-orbit-fill)" />
          <rect
            width="1600"
            height="900"
            fill="url(#hero-grid)"
            className="text-gold-500 opacity-[0.055]"
            mask="url(#hero-grid-mask)"
          />

          <g fill="none" className="text-gold-500 opacity-[0.08]">
            <ellipse cx="1260" cy="350" rx="370" ry="285" stroke="currentColor" strokeWidth="0.8" />
            <ellipse cx="1260" cy="350" rx="290" ry="220" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 13" />
            <path d="M1110 95V640M940 350H1535" stroke="currentColor" strokeWidth="0.55" strokeDasharray="2 12" />
          </g>

          <path
            d="M-90 836C184 815 304 721 520 747C746 774 842 586 1032 612C1238 640 1334 410 1580 268L1660 950H-90Z"
            fill="url(#hero-ribbon-fill)"
          />

          <g fill="none" strokeLinecap="round">
            <motion.path
              d="M-100 842C166 818 308 754 500 766C724 780 844 630 1030 652C1240 678 1388 468 1660 350"
              stroke="url(#hero-gold-line)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.28 }}
              transition={{ duration: 2.2, delay: 0.15, ease: 'easeOut' }}
            />
            <motion.path
              d="M-90 796C180 785 312 686 520 716C742 748 850 558 1040 592C1250 630 1376 384 1620 246"
              stroke="url(#hero-gold-line)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 2.4, delay: 0.22, ease: 'easeOut' }}
            />
            <motion.path
              d="M-72 742C196 736 334 624 536 674C746 726 872 486 1054 550C1242 616 1380 310 1552 170"
              stroke="url(#hero-gold-line)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.62 }}
              transition={{ duration: 2.6, delay: 0.3, ease: 'easeOut' }}
            />
            <motion.path
              d="M-42 682C216 678 360 576 552 630C750 686 894 432 1066 510C1238 588 1362 266 1486 126"
              stroke="url(#hero-gold-line)"
              strokeWidth="0.9"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2.7, delay: 0.38, ease: 'easeOut' }}
            />
          </g>

          <g fill="#D4AF5E">
            <circle cx="536" cy="674" r="3" fillOpacity="0.3" />
            <circle cx="1054" cy="550" r="3" fillOpacity="0.34" />
            <circle cx="1380" cy="310" r="3" fillOpacity="0.3" />
            <circle cx="536" cy="674" r="12" fillOpacity="0.025" />
            <circle cx="1054" cy="550" r="12" fillOpacity="0.025" />
          </g>

          <g className="text-gold-300 opacity-[0.12]" fill="currentColor">
            <circle cx="1260" cy="65" r="1.5" />
            <circle cx="1292" cy="65" r="1.5" />
            <circle cx="1324" cy="65" r="1.5" />
            <circle cx="1260" cy="97" r="1.5" />
            <circle cx="1292" cy="97" r="1.5" />
            <circle cx="1324" cy="97" r="1.5" />
          </g>
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal-950 to-transparent" />
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary tracking-tight"
        >
          {HERO.headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="text-text-secondary text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          {HERO.subheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center mt-10"
        >
          <Button href={HERO.primaryCta.href} variant="primary" size="lg">
            {HERO.primaryCta.label}
          </Button>
          <Button href={HERO.secondaryCta.href} variant="secondary" size="lg">
            {HERO.secondaryCta.label}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
