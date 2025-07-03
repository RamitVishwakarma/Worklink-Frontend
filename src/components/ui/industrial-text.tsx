'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface IndustrialTextProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'safety';
  as?: React.ElementType;
  className?: string;
}

/**
 * IndustrialText Component
 *
 * A component for rendering text with industrial-themed gradients
 * that ensures proper visibility on different backgrounds
 */
export const IndustrialText = ({
  children,
  variant = 'default',
  as: Component = 'span',
  className,
}: IndustrialTextProps) => {
  // Define gradient variants
  const gradients = {
    default:
      'bg-gradient-to-r from-industrial-gunmetal-800 to-industrial-navy-700',
    accent:
      'bg-gradient-to-r from-industrial-gunmetal-800 via-industrial-safety-500 to-industrial-navy-700',
    safety:
      'bg-gradient-to-r from-industrial-safety-500 to-industrial-safety-700',
  };

  return (
    <Component
      className={cn(
        gradients[variant],
        'bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </Component>
  );
};
