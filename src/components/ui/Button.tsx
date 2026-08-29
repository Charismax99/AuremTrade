import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  href, 
  className = '', 
  children, 
  ...props 
}: ButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  
  const baseClasses = "rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 inline-flex items-center justify-center min-h-[44px]";
  
  const variants = {
    primary: "bg-gold-500 text-charcoal-950 font-semibold hover:bg-gold-400 active:bg-gold-600",
    secondary: "border border-gold-500/40 text-text-primary hover:border-gold-500 hover:text-gold-300",
    ghost: "text-text-secondary hover:text-text-primary",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
