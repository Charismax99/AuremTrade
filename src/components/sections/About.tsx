'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { ABOUT } from '@/lib/constants';

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-charcoal-900">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection>
            <SectionHeading title={ABOUT.heading} align="left" />
            <div className="space-y-5 mt-6 text-text-secondary leading-relaxed text-base lg:text-lg">
              {ABOUT.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="aspect-square lg:aspect-[4/3] bg-charcoal-800 rounded-2xl border border-charcoal-600/50 overflow-hidden relative shadow-2xl shadow-black/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(198,149,59,0.09),transparent_34%),linear-gradient(145deg,rgba(14,14,14,0.15),rgba(8,8,8,0.72))]" />
              <svg
                aria-hidden="true"
                focusable="false"
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 720 540"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <pattern id="about-minor-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M24 0H0V24" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                  <pattern id="about-major-grid" width="96" height="96" patternUnits="userSpaceOnUse">
                    <path d="M96 0H0V96" fill="none" stroke="currentColor" strokeWidth="0.75" />
                  </pattern>
                  <linearGradient id="about-gold-line" x1="64" y1="464" x2="654" y2="82" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7A5A20" stopOpacity="0.1" />
                    <stop offset="0.58" stopColor="#C6953B" stopOpacity="0.68" />
                    <stop offset="1" stopColor="#E2C47A" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="about-gold-fill" x1="180" y1="450" x2="550" y2="125" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C6953B" stopOpacity="0" />
                    <stop offset="0.7" stopColor="#C6953B" stopOpacity="0.09" />
                    <stop offset="1" stopColor="#E2C47A" stopOpacity="0.02" />
                  </linearGradient>
                  <radialGradient id="about-focus" cx="0" cy="0" r="1" gradientTransform="translate(536 142) rotate(132) scale(238 250)" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D4AF5E" stopOpacity="0.12" />
                    <stop offset="1" stopColor="#D4AF5E" stopOpacity="0" />
                  </radialGradient>
                  <filter id="about-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                </defs>

                <rect width="720" height="540" fill="url(#about-focus)" />
                <rect width="720" height="540" fill="url(#about-minor-grid)" className="text-gold-500 opacity-[0.035]" />
                <rect width="720" height="540" fill="url(#about-major-grid)" className="text-gold-400 opacity-[0.065]" />

                <g className="text-gold-500 opacity-[0.08]">
                  <path d="M80 454H650" stroke="currentColor" strokeWidth="1" />
                  <path d="M80 390H650" stroke="currentColor" strokeWidth="1" strokeDasharray="3 9" />
                  <path d="M80 326H650" stroke="currentColor" strokeWidth="1" strokeDasharray="3 9" />
                  <path d="M80 262H650" stroke="currentColor" strokeWidth="1" strokeDasharray="3 9" />
                </g>

                <motion.path
                  d="M58 470C154 445 186 383 270 394C365 406 394 312 474 314C560 316 586 220 660 146L660 500H58Z"
                  fill="url(#about-gold-fill)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />

                <g fill="none" strokeLinecap="round">
                  <motion.path
                    d="M56 470C144 448 184 402 264 408C356 416 400 343 472 342C556 340 596 256 662 190"
                    stroke="url(#about-gold-line)"
                    strokeWidth="1.2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.44 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.8, ease: 'easeOut' }}
                  />
                  <motion.path
                    d="M62 447C154 419 194 361 274 375C364 390 404 293 484 302C566 310 598 211 654 136"
                    stroke="url(#about-gold-line)"
                    strokeWidth="1.8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.72 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.9, delay: 0.08, ease: 'easeOut' }}
                  />
                  <motion.path
                    d="M74 418C160 383 210 327 284 344C366 363 420 254 496 276C574 298 604 178 638 100"
                    stroke="url(#about-gold-line)"
                    strokeWidth="2.4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.9 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 2, delay: 0.16, ease: 'easeOut' }}
                  />
                  <motion.path
                    d="M90 384C174 348 224 294 300 314C382 335 436 222 506 248C574 272 604 148 622 82"
                    stroke="url(#about-gold-line)"
                    strokeWidth="1.1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 2.1, delay: 0.24, ease: 'easeOut' }}
                  />
                </g>

                <path
                  d="M638 100L613 119L631 123Z"
                  fill="#E2C47A"
                  fillOpacity="0.72"
                />
                <path
                  d="M74 418C160 383 210 327 284 344C366 363 420 254 496 276C574 298 604 178 638 100"
                  stroke="#D4AF5E"
                  strokeOpacity="0.16"
                  strokeWidth="8"
                  fill="none"
                  filter="url(#about-soft-glow)"
                />

                <g fill="#D4AF5E">
                  <circle cx="284" cy="344" r="3" fillOpacity="0.72" />
                  <circle cx="496" cy="276" r="3" fillOpacity="0.72" />
                  <circle cx="284" cy="344" r="8" fillOpacity="0.06" />
                  <circle cx="496" cy="276" r="8" fillOpacity="0.06" />
                </g>

                <g className="text-gold-300 opacity-[0.16]" fill="currentColor">
                  <circle cx="592" cy="408" r="1.5" />
                  <circle cx="616" cy="408" r="1.5" />
                  <circle cx="640" cy="408" r="1.5" />
                  <circle cx="592" cy="432" r="1.5" />
                  <circle cx="616" cy="432" r="1.5" />
                  <circle cx="640" cy="432" r="1.5" />
                </g>
              </svg>

              <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[9px] uppercase tracking-[0.28em] text-gold-300/25">
                <span>Market perspective</span>
                <span>01 / 04</span>
              </div>
              <div className="absolute bottom-6 left-6 h-px w-16 bg-gradient-to-r from-gold-500/45 to-transparent" />
              <div className="absolute bottom-6 right-6 h-2 w-2 border-b border-r border-gold-400/20" />
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
