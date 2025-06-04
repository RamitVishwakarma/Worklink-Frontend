/**
 * Industrial Accessibility Utilities
 * Comprehensive accessibility components and utilities for the industrial design system
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Screen Reader Only Text Component
export const ScreenReaderOnly = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
      className
    )}
    {...props}
  />
));

ScreenReaderOnly.displayName = 'ScreenReaderOnly';

// Skip to Content Link
export const SkipToContent: React.FC<{ href?: string }> = ({
  href = '#main-content',
}) => {
  return (
    <a
      href={href}
      className={cn(
        'absolute top-0 left-0 bg-industrial-safety-300 text-industrial-gunmetal-900',
        'px-4 py-2 font-industrial-body font-semibold',
        'transform -translate-y-full focus:translate-y-0',
        'transition-transform duration-300 ease-out',
        'z-50 focus:outline-none focus:ring-2 focus:ring-industrial-safety-500',
        'rounded-b-industrial'
      )}
    >
      Skip to main content
    </a>
  );
};

// Focus Trap Component
interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  restoreFocus?: boolean;
  className?: string;
}

export const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  active = true,
  restoreFocus = true,
  className,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!active) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [active, restoreFocus]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

// Accessible Button with Loading State
interface AccessibleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const AccessibleButton = React.forwardRef<
  HTMLButtonElement,
  AccessibleButtonProps
>(
  (
    {
      children,
      loading = false,
      loadingText = 'Loading...',
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center gap-2',
      'font-industrial-body font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'rounded-industrial border',
      // Size variants
      size === 'sm' && 'text-industrial-sm px-3 py-1.5 min-h-[2rem]',
      size === 'md' && 'text-industrial-base px-4 py-2 min-h-[2.5rem]',
      size === 'lg' && 'text-industrial-lg px-6 py-3 min-h-[3rem]',
      // Width
      fullWidth && 'w-full',
      // Touch targets (minimum 44px for accessibility)
      'min-h-[44px] min-w-[44px]'
    );

    const variantClasses = cn(
      variant === 'primary' && [
        'bg-industrial-gunmetal-800 text-white border-industrial-gunmetal-800',
        'hover:bg-industrial-gunmetal-700 focus:ring-industrial-gunmetal-500',
        'active:bg-industrial-gunmetal-900',
      ],
      variant === 'secondary' && [
        'bg-industrial-navy-800 text-white border-industrial-navy-800',
        'hover:bg-industrial-navy-700 focus:ring-industrial-navy-500',
        'active:bg-industrial-navy-900',
      ],
      variant === 'accent' && [
        'bg-industrial-safety-300 text-industrial-gunmetal-900 border-industrial-safety-300',
        'hover:bg-industrial-safety-400 focus:ring-industrial-safety-500',
        'active:bg-industrial-safety-200',
      ],
      variant === 'outline' && [
        'bg-transparent text-industrial-gunmetal-800 border-industrial-gunmetal-300',
        'hover:bg-industrial-gunmetal-50 focus:ring-industrial-gunmetal-500',
        'active:bg-industrial-gunmetal-100',
      ],
      variant === 'destructive' && [
        'bg-red-600 text-white border-red-600',
        'hover:bg-red-700 focus:ring-red-500',
        'active:bg-red-800',
      ]
    );

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses, className)}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            aria-hidden="true"
          />
        )}
        <span className={loading ? 'sr-only' : undefined}>
          {loading ? loadingText : children}
        </span>
        {loading && (
          <span aria-live="polite" className="sr-only">
            {loadingText}
          </span>
        )}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

// High Contrast Mode Detection Hook
export const useHighContrastMode = () => {
  const [isHighContrast, setIsHighContrast] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches);
    };

    setIsHighContrast(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isHighContrast;
};

// Reduced Motion Detection Hook
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Accessible Form Field Component
interface AccessibleFormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export const AccessibleFormField: React.FC<AccessibleFormFieldProps> = ({
  label,
  required = false,
  error,
  hint,
  children,
  className,
}) => {
  const id = React.useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={cn('space-y-2', className)}>
      <label
        htmlFor={id}
        className={cn(
          'block font-industrial-body font-medium text-industrial-gunmetal-700',
          required && 'after:content-["*"] after:ml-1 after:text-red-500'
        )}
      >
        {label}
      </label>

      {hint && (
        <p
          id={hintId}
          className="text-industrial-sm text-industrial-gunmetal-600"
        >
          {hint}
        </p>
      )}

      <div>
        {React.cloneElement(children as React.ReactElement, {
          id,
          'aria-describedby':
            cn(hint && hintId, error && errorId).trim() || undefined,
          'aria-invalid': error ? 'true' : undefined,
          'aria-required': required,
        })}
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-industrial-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
};

// Color Contrast Checker Utility
export const getContrastRatio = (color1: string, color2: string): number => {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd want to use a proper color library
  const getLuminance = (color: string) => {
    // This is a simplified version - use a proper color library in production
    return 0.5; // Placeholder
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

// Accessible Status Component
interface AccessibleStatusProps {
  status: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

export const AccessibleStatus: React.FC<AccessibleStatusProps> = ({
  status,
  children,
  showIcon = true,
  className,
}) => {
  const statusConfig = {
    success: {
      bgColor: 'bg-green-50 border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-500',
      icon: '✓',
      ariaLabel: 'Success',
    },
    warning: {
      bgColor: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-500',
      icon: '⚠',
      ariaLabel: 'Warning',
    },
    error: {
      bgColor: 'bg-red-50 border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-500',
      icon: '✕',
      ariaLabel: 'Error',
    },
    info: {
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-500',
      icon: 'ℹ',
      ariaLabel: 'Information',
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-industrial border',
        config.bgColor,
        className
      )}
      role="alert"
      aria-label={config.ariaLabel}
    >
      {showIcon && (
        <span className={cn('text-lg', config.iconColor)} aria-hidden="true">
          {config.icon}
        </span>
      )}
      <div className={cn('font-industrial-body', config.textColor)}>
        {children}
      </div>
    </div>
  );
};

// Keyboard Navigation Hook
export const useKeyboardNavigation = (
  items: React.RefObject<HTMLElement>[],
  options: {
    loop?: boolean;
    orientation?: 'horizontal' | 'vertical';
  } = {}
) => {
  const { loop = true, orientation = 'vertical' } = options;
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
      const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';

      if (event.key === nextKey) {
        event.preventDefault();
        setActiveIndex((prev) => {
          const next = prev + 1;
          return next >= items.length ? (loop ? 0 : prev) : next;
        });
      } else if (event.key === prevKey) {
        event.preventDefault();
        setActiveIndex((prev) => {
          const next = prev - 1;
          return next < 0 ? (loop ? items.length - 1 : 0) : next;
        });
      } else if (event.key === 'Home') {
        event.preventDefault();
        setActiveIndex(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        setActiveIndex(items.length - 1);
      }
    },
    [items.length, loop, orientation]
  );

  React.useEffect(() => {
    const currentItem = items[activeIndex]?.current;
    if (currentItem) {
      currentItem.focus();
    }
  }, [activeIndex, items]);

  return {
    activeIndex,
    setActiveIndex,
    handleKeyDown,
  };
};

export default {
  ScreenReaderOnly,
  SkipToContent,
  FocusTrap,
  AccessibleButton,
  AccessibleFormField,
  AccessibleStatus,
  useHighContrastMode,
  useReducedMotion,
  useKeyboardNavigation,
  getContrastRatio,
};
