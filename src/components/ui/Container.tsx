import React from 'react';

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ children, className = '', ...props }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
