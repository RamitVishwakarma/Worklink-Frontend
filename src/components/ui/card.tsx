import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Industrial Card Variants
const industrialCardVariants = cva(
  'rounded-lg border transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground shadow border-border',
        industrial:
          'bg-white border-industrial-gunmetal-300 shadow-industrial-md hover:shadow-industrial-lg hover:border-industrial-gunmetal-400 bg-metal-grid',
        'industrial-dark':
          'bg-industrial-gunmetal-900 border-industrial-gunmetal-600 text-white shadow-industrial-md hover:shadow-industrial-lg',
        'industrial-accent':
          'bg-gradient-to-br from-industrial-navy-50 to-industrial-gunmetal-50 border-industrial-navy-300 shadow-industrial-md hover:shadow-industrial-lg',
        'industrial-highlight':
          'bg-industrial-safety-50 border-industrial-safety-300 shadow-industrial-md hover:shadow-industrial-lg hover:border-industrial-safety-400',
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof industrialCardVariants>
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(industrialCardVariants({ variant, size }), className)}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Industrial Card Components
interface IndustrialCardProps
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
      'flex flex-col space-y-2 pb-4 border-b border-industrial-gunmetal-200',
      className
    )}
    {...props}
  />
));
IndustrialCardHeader.displayName = 'IndustrialCardHeader';

const IndustrialCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'font-industrial-heading font-bold text-industrial-2xl text-industrial-gunmetal-800 leading-tight tracking-tight',
      className
    )}
    {...props}
  />
));
IndustrialCardTitle.displayName = 'IndustrialCardTitle';

const IndustrialCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-industrial-sm text-industrial-gunmetal-600 font-industrial-body',
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
  <div ref={ref} className={cn('pt-4', className)} {...props} />
));
IndustrialCardContent.displayName = 'IndustrialCardContent';

const IndustrialCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center pt-4 border-t border-industrial-gunmetal-200',
      className
    )}
    {...props}
  />
));
IndustrialCardFooter.displayName = 'IndustrialCardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  IndustrialCard,
  IndustrialCardHeader,
  IndustrialCardFooter,
  IndustrialCardTitle,
  IndustrialCardDescription,
  IndustrialCardContent,
};
