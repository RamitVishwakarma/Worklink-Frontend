'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Industrial Checkbox Variants
const industrialCheckboxVariants = cva(
  'peer h-5 w-5 shrink-0 rounded border-2 ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
  {
    variants: {
      variant: {
        default:
          'border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        industrial:
          'border-industrial-gunmetal-400 bg-white hover:border-industrial-gunmetal-500 focus-visible:ring-industrial-safety-300 data-[state=checked]:bg-industrial-safety-300 data-[state=checked]:border-industrial-safety-400 data-[state=checked]:text-industrial-gunmetal-900 data-[state=indeterminate]:bg-industrial-gunmetal-600 data-[state=indeterminate]:border-industrial-gunmetal-700 data-[state=indeterminate]:text-white',
        'industrial-dark':
          'border-industrial-gunmetal-500 bg-industrial-gunmetal-800 hover:border-industrial-gunmetal-400 focus-visible:ring-industrial-safety-300 data-[state=checked]:bg-industrial-safety-300 data-[state=checked]:border-industrial-safety-400 data-[state=checked]:text-industrial-gunmetal-900 data-[state=indeterminate]:bg-industrial-gunmetal-600 data-[state=indeterminate]:border-industrial-gunmetal-500 data-[state=indeterminate]:text-white',
        'industrial-accent':
          'border-industrial-navy-400 bg-industrial-navy-50 hover:border-industrial-navy-500 focus-visible:ring-industrial-safety-300 data-[state=checked]:bg-industrial-safety-300 data-[state=checked]:border-industrial-safety-400 data-[state=checked]:text-industrial-gunmetal-900 data-[state=indeterminate]:bg-industrial-navy-600 data-[state=indeterminate]:border-industrial-navy-700 data-[state=indeterminate]:text-white',
        success:
          'border-green-400 bg-white hover:border-green-500 focus-visible:ring-green-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-600 data-[state=checked]:text-white',
        warning:
          'border-orange-400 bg-white hover:border-orange-500 focus-visible:ring-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-600 data-[state=checked]:text-white',
        danger:
          'border-red-400 bg-white hover:border-red-500 focus-visible:ring-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-600 data-[state=checked]:text-white',
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

interface IndustrialCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof industrialCheckboxVariants> {
  indeterminate?: boolean;
}

const IndustrialCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  IndustrialCheckboxProps
>(({ className, variant, size, indeterminate, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(industrialCheckboxVariants({ variant, size }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      {indeterminate ? (
        <Minus className="h-3 w-3" />
      ) : (
        <Check className="h-3 w-3" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
IndustrialCheckbox.displayName = CheckboxPrimitive.Root.displayName;

// Enhanced Checkbox with Label and Description
interface IndustrialCheckboxFieldProps extends IndustrialCheckboxProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

const IndustrialCheckboxField = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  IndustrialCheckboxFieldProps
>(({ label, description, error, required, className, ...props }, ref) => {
  const id = React.useId();

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-start space-x-3">
        <IndustrialCheckbox
          ref={ref}
          id={id}
          {...props}
          aria-describedby={description ? `${id}-description` : undefined}
          aria-invalid={!!error}
        />
        {label && (
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={id}
              className="text-sm font-medium text-industrial-gunmetal-800 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {description && (
              <p
                id={`${id}-description`}
                className="text-xs text-industrial-gunmetal-600"
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
});
IndustrialCheckboxField.displayName = 'IndustrialCheckboxField';

// Checkbox Group for multiple selections
interface IndustrialCheckboxGroupProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

const IndustrialCheckboxGroup = React.forwardRef<
  HTMLDivElement,
  IndustrialCheckboxGroupProps
>(({ label, description, error, required, className, children }, ref) => {
  const id = React.useId();

  return (
    <div ref={ref} className={cn('space-y-3', className)}>
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
      <div
        className="space-y-2"
        role="group"
        aria-labelledby={label ? id : undefined}
      >
        {children}
      </div>
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
});
IndustrialCheckboxGroup.displayName = 'IndustrialCheckboxGroup';

export { IndustrialCheckbox, IndustrialCheckboxField, IndustrialCheckboxGroup };
