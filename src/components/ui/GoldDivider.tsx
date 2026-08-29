'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface GoldDividerProps {
  className?: string;
  width?: 'sm' | 'md' | 'lg' | 'full';
}

export function GoldDivider({ className = '', width = 'md' }: GoldDividerProps) {
  const widths = {
    sm: 'w-12',
    md: 'w-24',
    lg: 'w-48',
    full: 'w-full',
  };

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto ${widths[width]} ${className}`}
    />
  );
}
