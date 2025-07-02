'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Industrial Radio Group Variants
const industrialRadioGroupVariants = cva('grid gap-2', {
  variants: {
    orientation: {
      vertical: 'grid-cols-1',
      horizontal: 'grid-flow-col auto-cols-max gap-6',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

const industrialRadioItemVariants = cva(
  'aspect-square h-5 w-5 rounded-full border-2 text-primary ring-offset-background transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-primary focus-visible:ring-ring',
        industrial:
          'border-industrial-gunmetal-400 bg-white hover:border-industrial-gunmetal-500 focus-visible:ring-industrial-safety-300 data-[state=checked]:border-industrial-safety-400',
        'industrial-dark':
          'border-industrial-gunmetal-500 bg-industrial-gunmetal-800 hover:border-industrial-gunmetal-400 focus-visible:ring-industrial-safety-300 data-[state=checked]:border-industrial-safety-400',
        'industrial-accent':
          'border-industrial-navy-400 bg-industrial-navy-50 hover:border-industrial-navy-500 focus-visible:ring-industrial-safety-300 data-[state=checked]:border-industrial-safety-400',
        success:
          'border-green-400 bg-white hover:border-green-500 focus-visible:ring-green-300 data-[state=checked]:border-green-500',
        warning:
          'border-orange-400 bg-white hover:border-orange-500 focus-visible:ring-orange-300 data-[state=checked]:border-orange-500',
        danger:
          'border-red-400 bg-white hover:border-red-500 focus-visible:ring-red-300 data-[state=checked]:border-red-500',
      },
      size: {
        sm: 'h-4 w-4',
        default: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const industrialRadioIndicatorVariants = cva(
  'flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'text-current',
        industrial: 'text-industrial-safety-400',
        'industrial-dark': 'text-industrial-safety-400',
        'industrial-accent': 'text-industrial-safety-400',
        success: 'text-green-500',
        warning: 'text-orange-500',
        danger: 'text-red-500',
      },
      size: {
        sm: '[&>svg]:h-2 [&>svg]:w-2',
        default: '[&>svg]:h-2.5 [&>svg]:w-2.5',
        lg: '[&>svg]:h-3 [&>svg]:w-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface IndustrialRadioGroupProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
      'orientation'
    >,
    VariantProps<typeof industrialRadioGroupVariants> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

const IndustrialRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  IndustrialRadioGroupProps
>(
  (
    {
      className,
      orientation,
      label,
      description,
      error,
      required,
      children,
      ...props
    },
    ref
  ) => {
    const id = React.useId();

    return (
      <div className="space-y-3">
        {label && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-industrial-gunmetal-800">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {description && (
              <p className="text-xs text-industrial-gunmetal-600">
                {description}
              </p>
            )}
          </div>
        )}
        <RadioGroupPrimitive.Root
          className={cn(
            industrialRadioGroupVariants({ orientation }),
            className
          )}
          {...props}
          ref={ref}
          aria-labelledby={label ? id : undefined}
        >
          {children}
        </RadioGroupPrimitive.Root>
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);
IndustrialRadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface IndustrialRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof industrialRadioItemVariants> {
  label?: string;
  description?: string;
}

const IndustrialRadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  IndustrialRadioItemProps
>(
  (
    { className, variant, size, label, description, children, ...props },
    ref
  ) => {
    const id = React.useId();

    return (
      <div className="flex items-start space-x-3">
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(
            industrialRadioItemVariants({ variant, size }),
            className
          )}
          id={id}
          {...props}
        >
          <RadioGroupPrimitive.Indicator
            className={cn(industrialRadioIndicatorVariants({ variant, size }))}
          >
            <Circle className="fill-current" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        {(label || description || children) && (
          <div className="grid gap-1.5 leading-none">
            {label && (
              <label
                htmlFor={id}
                className="text-sm font-medium text-industrial-gunmetal-800 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-industrial-gunmetal-600">
                {description}
              </p>
            )}
            {children}
          </div>
        )}
      </div>
    );
  }
);
IndustrialRadioItem.displayName = RadioGroupPrimitive.Item.displayName;

// Radio Card - Enhanced radio item with card styling
interface IndustrialRadioCardProps extends IndustrialRadioItemProps {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const IndustrialRadioCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  IndustrialRadioCardProps
>(
  (
    {
      className,
      variant = 'industrial',
      size,
      icon,
      title,
      subtitle,
      children,
      ...props
    },
    ref
  ) => {
    const id = React.useId();

    return (
      <div className="relative">
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn('peer sr-only', className)}
          id={id}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            'flex items-start space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all duration-200',
            'border-industrial-gunmetal-300 bg-white hover:border-industrial-gunmetal-400',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-industrial-safety-300 peer-focus-visible:ring-offset-2',
            'peer-data-[state=checked]:border-industrial-safety-400 peer-data-[state=checked]:bg-industrial-safety-50',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
          )}
        >
          <div className="flex items-center">
            <div className={cn(industrialRadioItemVariants({ variant, size }))}>
              <RadioGroupPrimitive.Indicator
                className={cn(
                  industrialRadioIndicatorVariants({ variant, size })
                )}
              >
                <Circle className="fill-current" />
              </RadioGroupPrimitive.Indicator>
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center space-x-2">
              {icon && (
                <div className="text-industrial-gunmetal-600">{icon}</div>
              )}
              {title && (
                <h4 className="text-sm font-medium text-industrial-gunmetal-800">
                  {title}
                </h4>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-industrial-gunmetal-600">{subtitle}</p>
            )}
            {children}
          </div>
        </label>
      </div>
    );
  }
);
IndustrialRadioCard.displayName = 'IndustrialRadioCard';

export { IndustrialRadioGroup, IndustrialRadioItem, IndustrialRadioCard };
