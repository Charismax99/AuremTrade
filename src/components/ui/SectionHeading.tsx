import React from 'react';

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
      <div className={`w-16 h-[2px] bg-gold-500 mt-4 mb-4 ${isCenter ? 'mx-auto' : 'ml-0'}`} />
      {subtitle && (
        <p className={`text-text-secondary text-lg max-w-2xl ${isCenter ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
