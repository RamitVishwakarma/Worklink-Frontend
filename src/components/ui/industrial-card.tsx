'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Industrial Card Variants
const industrialCardVariants = cva(
  'rounded-industrial border transition-all duration-200 bg-metal-grid',
  {
    variants: {
      variant: {
        default:
          'bg-white border-industrial-gunmetal-300 shadow-industrial-md hover:shadow-industrial-lg hover:border-industrial-gunmetal-400',
        steel:
          'bg-industrial-gunmetal-50 border-industrial-gunmetal-400 shadow-industrial-md hover:shadow-industrial-lg metal-texture',
        dark: 'bg-industrial-gunmetal-900 border-industrial-gunmetal-600 text-white shadow-industrial-md hover:shadow-industrial-lg',
        accent:
          'bg-gradient-to-br from-industrial-navy-50 to-industrial-gunmetal-50 border-industrial-navy-300 shadow-industrial-md hover:shadow-industrial-lg',
        highlight:
          'bg-industrial-safety-50 border-industrial-safety-300 shadow-industrial-md hover:shadow-industrial-lg hover:border-industrial-safety-400',
        warning:
          'bg-red-50 border-red-300 shadow-industrial-md hover:shadow-industrial-lg hover:border-red-400',
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
        lg: 'p-8',
        xl: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface IndustrialCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof industrialCardVariants> {}

const IndustrialCard = React.forwardRef<HTMLDivElement, IndustrialCardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(industrialCardVariants({ variant, size }), className)}
      {...props}
    />
  )
);
IndustrialCard.displayName = 'IndustrialCard';

const IndustrialCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5 p-0 border-b border-industrial-gunmetal-200 pb-4 mb-4',
      className
    )}
    {...props}
  />
));
IndustrialCardHeader.displayName = 'IndustrialCardHeader';

const IndustrialCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-bold leading-none tracking-tight text-industrial-gunmetal-900 industrial-heading',
      className
    )}
    {...props}
  />
));
IndustrialCardTitle.displayName = 'IndustrialCardTitle';

const IndustrialCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-industrial-gunmetal-600 leading-relaxed',
      className
    )}
    {...props}
  />
));
IndustrialCardDescription.displayName = 'IndustrialCardDescription';

const IndustrialCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-0', className)} {...props} />
));
IndustrialCardContent.displayName = 'IndustrialCardContent';

const IndustrialCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center justify-between pt-4 mt-4 border-t border-industrial-gunmetal-200',
      className
    )}
    {...props}
  />
));
IndustrialCardFooter.displayName = 'IndustrialCardFooter';

export {
  IndustrialCard,
  IndustrialCardHeader,
  IndustrialCardTitle,
  IndustrialCardDescription,
  IndustrialCardContent,
  IndustrialCardFooter,
};
