'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { IndustrialIcon } from './industrial-icon';
import { LucideIcon, AlertCircle } from 'lucide-react';

const industrialInputVariants = cva(
  'flex h-10 w-full border border-industrial-border bg-industrial-background px-3 py-2 text-sm text-industrial-foreground placeholder:text-industrial-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'rounded-industrial border-industrial-gunmetal-400 bg-white focus:border-industrial-navy-600 focus:ring-industrial-navy-200',
        steel:
          'rounded-industrial border-industrial-gunmetal-500 bg-industrial-gunmetal-50 focus:border-industrial-gunmetal-600 focus:ring-industrial-gunmetal-200 metal-texture',
        dark: 'rounded-industrial border-industrial-gunmetal-600 bg-industrial-gunmetal-900 text-white focus:border-industrial-safety-300 focus:ring-industrial-safety-200',
        accent:
          'rounded-industrial border-industrial-safety-400 bg-industrial-safety-50 focus:border-industrial-safety-500 focus:ring-industrial-safety-200',
      },
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-8 px-2 py-1 text-xs',
        lg: 'h-12 px-4 py-3 text-base',
        xl: 'h-14 px-5 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface IndustrialInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof industrialInputVariants> {
  label?: string;
  description?: string;
  error?: string;
  leftIcon?:
    | 'gear'
    | 'factory'
    | 'wrench'
    | 'cog'
    | 'hammer'
    | 'hardhat'
    | 'bolt'
    | 'circuit';
  rightIcon?:
    | 'gear'
    | 'factory'
    | 'wrench'
    | 'cog'
    | 'hammer'
    | 'hardhat'
    | 'bolt'
    | 'circuit';
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  isRequired?: boolean;
  containerClassName?: string;
}

const IndustrialInput = React.forwardRef<
  HTMLInputElement,
  IndustrialInputProps
>(
  (
    {
      className,
      variant,
      size,
      type,
      label,
      description,
      error,
      leftIcon,
      rightIcon,
      leftComponent,
      rightComponent,
      isRequired,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const hasLeftContent = leftIcon || leftComponent;
    const hasRightContent = rightIcon || rightComponent;

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <label className="text-sm font-medium text-industrial-foreground">
            {label}
            {isRequired && (
              <span className="text-industrial-safety-300 ml-1">*</span>
            )}
          </label>
        )}
        <div className="relative">
          {hasLeftContent && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
              {leftIcon && (
                <IndustrialIcon
                  icon={leftIcon}
                  size="sm"
                  className="text-industrial-muted-foreground"
                />
              )}
              {leftComponent}
            </div>
          )}

          <input
            type={type}
            className={cn(
              industrialInputVariants({ variant, size }),
              hasLeftContent && 'pl-10',
              hasRightContent && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-200',
              className
            )}
            ref={ref}
            {...props}
          />

          {hasRightContent && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              {rightIcon && (
                <IndustrialIcon
                  icon={rightIcon}
                  size="sm"
                  className="text-industrial-muted-foreground"
                />
              )}
              {rightComponent}
            </div>
          )}
        </div>
        {description && !error && (
          <p className="text-xs text-industrial-muted-foreground">
            {description}
          </p>
        )}{' '}
        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle size={16} />
            {error}
          </p>
        )}
      </div>
    );
  }
);

IndustrialInput.displayName = 'IndustrialInput';

export { IndustrialInput, industrialInputVariants };
