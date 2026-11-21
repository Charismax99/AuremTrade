'use client';

import { motion } from 'framer-motion';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  title,
  subtitle,
  className = '',
  align = 'center',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  
  return (
    <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
        {title}
      </h2>
      <motion.div
        aria-hidden="true"
        className={`w-16 h-[2px] bg-gold-500 mt-4 mb-4 motion-reduce:transform-none! ${isCenter ? 'mx-auto origin-center' : 'ml-0 origin-left'}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      />
      {subtitle && (
        <p className={`text-text-secondary text-lg max-w-2xl ${isCenter ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
