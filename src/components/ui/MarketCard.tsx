'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, TrendingUp, Gem, Landmark, Hexagon } from 'lucide-react';

const ICONS: Record<string, React.ElementType> = {
  ArrowLeftRight,
  TrendingUp,
  Gem,
  Landmark,
  Hexagon,
};

export interface MarketCardProps {
  name: string;
  description: string;
  icon: string;
  index: number;
}

export function MarketCard({ name, description, icon, index }: MarketCardProps) {
  const IconComponent = ICONS[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-charcoal-800 border border-charcoal-600 rounded-xl p-6 lg:p-8 hover:border-gold-500/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold-500/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900"
      tabIndex={0}
    >
      {IconComponent && <IconComponent size={24} className="text-gold-500 mb-4" />}
      <h3 className="text-lg font-semibold text-text-primary mt-2">{name}</h3>
      <p className="text-sm text-text-secondary mt-2 leading-relaxed">{description}</p>
    </motion.div>
  );
}
