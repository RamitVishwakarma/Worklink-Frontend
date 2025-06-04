import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Industrial Input Variants
const industrialInputVariants = cva(
  'flex w-full rounded-md transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:ring-1 focus-visible:ring-ring',
        industrial:
          'border-2 border-industrial-gunmetal-300 bg-white px-4 py-3 text-industrial-base font-industrial-body shadow-industrial-sm focus:border-industrial-navy-600 focus:ring-2 focus:ring-industrial-navy-200 hover:border-industrial-gunmetal-400',
        'industrial-dark':
          'border-2 border-industrial-gunmetal-600 bg-industrial-gunmetal-900 text-white px-4 py-3 text-industrial-base font-industrial-body shadow-industrial-sm focus:border-industrial-safety-300 focus:ring-2 focus:ring-industrial-safety-200',
      },
      size: {
        default: 'h-9 text-sm md:text-sm',
        sm: 'h-8 text-xs px-2',
        lg: 'h-12 text-base px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

// Industrial Input Component
interface IndustrialInputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof industrialInputVariants> {}

const IndustrialInput = React.forwardRef<
  HTMLInputElement,
  IndustrialInputProps
>(({ className, type, variant, size, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(industrialInputVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  );
});
IndustrialInput.displayName = 'IndustrialInput';

export { Input, IndustrialInput, industrialInputVariants };
