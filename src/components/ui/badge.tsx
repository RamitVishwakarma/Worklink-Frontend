import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        // Industrial variants
        'industrial-primary':
          'border-transparent bg-industrial-gunmetal-800 text-white shadow-industrial-sm hover:bg-industrial-gunmetal-700 font-industrial-body font-bold',
        'industrial-secondary':
          'border-transparent bg-industrial-navy-800 text-white shadow-industrial-sm hover:bg-industrial-navy-700 font-industrial-body font-bold',
        'industrial-accent':
          'border-transparent bg-industrial-safety-300 text-industrial-gunmetal-900 shadow-industrial-sm hover:bg-industrial-safety-400 font-industrial-body font-bold',
        'industrial-success':
          'border-transparent bg-green-600 text-white shadow-industrial-sm hover:bg-green-700 font-industrial-body font-bold',
        'industrial-warning':
          'border-transparent bg-yellow-500 text-white shadow-industrial-sm hover:bg-yellow-600 font-industrial-body font-bold',
        'industrial-danger':
          'border-transparent bg-red-600 text-white shadow-industrial-sm hover:bg-red-700 font-industrial-body font-bold',
        'industrial-outline':
          'border-2 border-industrial-gunmetal-400 text-industrial-gunmetal-800 bg-transparent hover:bg-industrial-gunmetal-50 font-industrial-body font-semibold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
