import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-navy-600 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Industrial variants
        'industrial-primary':
          'bg-industrial-gunmetal-800 text-white font-semibold shadow-industrial-md hover:bg-industrial-gunmetal-700 hover:shadow-industrial-lg border border-industrial-gunmetal-600 transition-all duration-200',
        'industrial-secondary':
          'bg-industrial-navy-800 text-white font-semibold shadow-industrial-md hover:bg-industrial-navy-700 hover:shadow-industrial-lg border border-industrial-navy-600 transition-all duration-200',
        'industrial-accent':
          'bg-industrial-safety-300 text-industrial-gunmetal-900 font-bold shadow-industrial-md hover:bg-industrial-safety-400 hover:shadow-industrial-lg border border-industrial-safety-500 transition-all duration-200',
        'industrial-outline':
          'border-2 border-industrial-gunmetal-600 text-industrial-gunmetal-800 font-semibold bg-transparent hover:bg-industrial-gunmetal-50 hover:border-industrial-gunmetal-700 transition-all duration-200',
        'industrial-ghost':
          'text-industrial-gunmetal-700 font-medium hover:bg-industrial-gunmetal-100 hover:text-industrial-gunmetal-900 transition-all duration-200',
        'industrial-danger':
          'bg-red-600 text-white font-semibold shadow-industrial-md hover:bg-red-700 hover:shadow-industrial-lg border border-red-500 transition-all duration-200',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-md px-8 text-base',
        xl: 'h-14 rounded-lg px-10 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
