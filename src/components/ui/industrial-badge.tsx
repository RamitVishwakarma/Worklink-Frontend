'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { IndustrialIcon } from './industrial-icon';

const industrialBadgeVariants = cva(
  'inline-flex items-center gap-1 rounded-industrial border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-industrial-gunmetal-400 bg-industrial-gunmetal-100 text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-200',
        primary:
          'border-industrial-gunmetal-600 bg-industrial-gunmetal-800 text-white hover:bg-industrial-gunmetal-700',
        secondary:
          'border-industrial-navy-600 bg-industrial-navy-800 text-white hover:bg-industrial-navy-700',
        accent:
          'border-industrial-safety-500 bg-industrial-safety-300 text-industrial-gunmetal-900 hover:bg-industrial-safety-400',
        success:
          'border-green-600 bg-green-100 text-green-800 hover:bg-green-200',
        warning:
          'border-yellow-600 bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        danger: 'border-red-600 bg-red-100 text-red-800 hover:bg-red-200',
        outline:
          'border-industrial-gunmetal-400 text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-100',
        ghost:
          'border-transparent text-industrial-gunmetal-700 hover:bg-industrial-gunmetal-100',
        steel:
          'border-industrial-gunmetal-500 bg-industrial-gunmetal-200 text-industrial-gunmetal-900 metal-texture hover:bg-industrial-gunmetal-300',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
        xl: 'px-4 py-1.5 text-base',
      },
      shape: {
        default: 'rounded-industrial',
        rounded: 'rounded-full',
        square: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
    },
  }
);

export interface IndustrialBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof industrialBadgeVariants> {
  icon?: string;
  iconPosition?: 'left' | 'right';
  removable?: boolean;
  onRemove?: () => void;
}

const IndustrialBadge = React.forwardRef<HTMLDivElement, IndustrialBadgeProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      icon,
      iconPosition = 'left',
      removable,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    const iconSize =
      size === 'sm' ? 'xs' : size === 'lg' ? 'sm' : size === 'xl' ? 'md' : 'xs';

    return (
      <div
        className={cn(
          industrialBadgeVariants({ variant, size, shape }),
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <IndustrialIcon icon={icon} size={iconSize} className="shrink-0" />
        )}

        <span className="truncate">{children}</span>

        {icon && iconPosition === 'right' && (
          <IndustrialIcon icon={icon} size={iconSize} className="shrink-0" />
        )}

        {removable && (
          <button
            onClick={onRemove}
            className="ml-1 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-industrial-ring transition-colors"
            type="button"
          >
            <IndustrialIcon icon="x" size={iconSize} className="shrink-0" />
          </button>
        )}
      </div>
    );
  }
);

IndustrialBadge.displayName = 'IndustrialBadge';

export { IndustrialBadge, industrialBadgeVariants };
