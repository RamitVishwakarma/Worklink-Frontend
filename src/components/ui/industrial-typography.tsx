/**
 * Industrial Typography System
 * Comprehensive typography components with industrial theming, accessibility, and responsive design
 */

import * as React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Industrial Heading Component
const industrialHeadingVariants = cva(
  'font-industrial-heading tracking-tight transition-colors duration-200',
  {
    variants: {
      level: {
        1: 'text-industrial-4xl md:text-5xl lg:text-6xl font-black leading-tight',
        2: 'text-industrial-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
        3: 'text-industrial-2xl md:text-3xl lg:text-4xl font-bold leading-snug',
        4: 'text-industrial-xl md:text-2xl lg:text-3xl font-semibold leading-snug',
        5: 'text-industrial-lg md:text-xl lg:text-2xl font-semibold leading-normal',
        6: 'text-industrial-base md:text-lg lg:text-xl font-semibold leading-normal',
      },
      variant: {
        default: 'text-industrial-gunmetal-900',
        primary: 'text-industrial-gunmetal-800',
        secondary: 'text-industrial-navy-800',
        accent: 'text-industrial-safety-500',
        muted: 'text-industrial-gunmetal-600',
        destructive: 'text-red-600',
        contrast: 'text-white',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      spacing: {
        none: 'mb-0',
        sm: 'mb-2',
        md: 'mb-4',
        lg: 'mb-6',
        xl: 'mb-8',
      },
    },
    defaultVariants: {
      level: 1,
      variant: 'default',
      align: 'left',
      spacing: 'md',
    },
  }
);

export interface IndustrialHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof industrialHeadingVariants> {
  animated?: boolean;
  gradient?: boolean;
}

const IndustrialHeading = React.forwardRef<
  HTMLHeadingElement,
  IndustrialHeadingProps
>(
  (
    {
      className,
      level = 1,
      variant,
      align,
      spacing,
      animated = false,
      gradient = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = `h${level}` as keyof JSX.IntrinsicElements;

    const headingClass = cn(
      industrialHeadingVariants({ level, variant, align, spacing }),
      gradient &&
        'bg-gradient-to-r from-industrial-gunmetal-800 via-industrial-navy-800 to-industrial-safety-500 bg-clip-text text-transparent',
      className
    );

    if (animated) {
      return (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Component ref={ref as any} className={headingClass} {...props}>
            {children}
          </Component>
        </motion.div>
      );
    }

    return (
      <Component ref={ref as any} className={headingClass} {...props}>
        {children}
      </Component>
    );
  }
);

IndustrialHeading.displayName = 'IndustrialHeading';

// Industrial Text Component
const industrialTextVariants = cva(
  'font-industrial-body leading-relaxed transition-colors duration-200',
  {
    variants: {
      size: {
        xs: 'text-industrial-xs',
        sm: 'text-industrial-sm',
        base: 'text-industrial-base',
        lg: 'text-industrial-lg',
        xl: 'text-industrial-xl',
      },
      variant: {
        default: 'text-industrial-gunmetal-700',
        primary: 'text-industrial-gunmetal-800',
        secondary: 'text-industrial-navy-700',
        accent: 'text-industrial-safety-600',
        muted: 'text-industrial-gunmetal-500',
        destructive: 'text-red-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        contrast: 'text-white',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      spacing: {
        none: 'mb-0',
        sm: 'mb-2',
        md: 'mb-4',
        lg: 'mb-6',
      },
    },
    defaultVariants: {
      size: 'base',
      variant: 'default',
      weight: 'normal',
      align: 'left',
      spacing: 'none',
    },
  }
);

export interface IndustrialTextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof industrialTextVariants> {
  as?: 'p' | 'span' | 'div';
  animated?: boolean;
}

const IndustrialText = React.forwardRef<
  HTMLParagraphElement,
  IndustrialTextProps
>(
  (
    {
      className,
      size,
      variant,
      weight,
      align,
      spacing,
      as = 'p',
      animated = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as;

    const textClass = cn(
      industrialTextVariants({ size, variant, weight, align, spacing }),
      className
    );

    if (animated) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Component ref={ref as any} className={textClass} {...props}>
            {children}
          </Component>
        </motion.div>
      );
    }

    return (
      <Component ref={ref as any} className={textClass} {...props}>
        {children}
      </Component>
    );
  }
);

IndustrialText.displayName = 'IndustrialText';

// Industrial Label Component
const industrialLabelVariants = cva(
  'font-industrial-body font-medium leading-none transition-colors duration-200',
  {
    variants: {
      size: {
        sm: 'text-industrial-sm',
        base: 'text-industrial-base',
        lg: 'text-industrial-lg',
      },
      variant: {
        default: 'text-industrial-gunmetal-700',
        primary: 'text-industrial-gunmetal-800',
        secondary: 'text-industrial-navy-700',
        accent: 'text-industrial-safety-600',
        muted: 'text-industrial-gunmetal-500',
        contrast: 'text-white',
      },
      required: {
        true: 'after:content-["*"] after:ml-0.5 after:text-red-500',
        false: '',
      },
    },
    defaultVariants: {
      size: 'base',
      variant: 'default',
      required: false,
    },
  }
);

export interface IndustrialLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof industrialLabelVariants> {}

const IndustrialLabel = React.forwardRef<
  HTMLLabelElement,
  IndustrialLabelProps
>(({ className, size, variant, required, children, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        industrialLabelVariants({ size, variant, required }),
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
});

IndustrialLabel.displayName = 'IndustrialLabel';

// Industrial Caption Component
const IndustrialCaption = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    variant?: 'default' | 'muted' | 'accent';
  }
>(({ className, variant = 'muted', ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'font-industrial-body text-industrial-sm leading-relaxed',
      variant === 'default' && 'text-industrial-gunmetal-600',
      variant === 'muted' && 'text-industrial-gunmetal-500',
      variant === 'accent' && 'text-industrial-safety-600',
      className
    )}
    {...props}
  />
));

IndustrialCaption.displayName = 'IndustrialCaption';

// Industrial Code Component
const IndustrialCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & {
    variant?: 'default' | 'accent';
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      'font-industrial-mono text-industrial-sm px-2 py-1 rounded-industrial border',
      variant === 'default' &&
        'bg-industrial-gunmetal-50 text-industrial-gunmetal-800 border-industrial-gunmetal-200',
      variant === 'accent' &&
        'bg-industrial-safety-50 text-industrial-safety-800 border-industrial-safety-200',
      className
    )}
    {...props}
  />
));

IndustrialCode.displayName = 'IndustrialCode';

// Industrial List Components
const IndustrialList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement> & {
    ordered?: boolean;
    variant?: 'default' | 'industrial';
  }
>(({ className, ordered = false, variant = 'default', ...props }, ref) => {
  const Component = ordered ? 'ol' : 'ul';

  return (
    <Component
      ref={ref as any}
      className={cn(
        'font-industrial-body space-y-2',
        variant === 'default' &&
          'list-disc list-inside text-industrial-gunmetal-700',
        variant === 'industrial' && 'list-none space-y-3',
        ordered && 'list-decimal',
        className
      )}
      {...props}
    />
  );
});

IndustrialList.displayName = 'IndustrialList';

const IndustrialListItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & {
    variant?: 'default' | 'industrial';
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      'text-industrial-base leading-relaxed',
      variant === 'default' && 'text-industrial-gunmetal-700',
      variant === 'industrial' &&
        'text-industrial-gunmetal-700 flex items-start gap-2 before:content-["▸"] before:text-industrial-safety-500 before:font-bold before:mt-0.5',
      className
    )}
    {...props}
  />
));

IndustrialListItem.displayName = 'IndustrialListItem';

// Typography Scale Showcase Component (for design system documentation)
export const IndustrialTypographyShowcase: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      <div className="space-y-4">
        <IndustrialHeading level={2} variant="accent">
          Typography Showcase
        </IndustrialHeading>

        <div className="space-y-6">
          <div>
            <IndustrialHeading level={3}>Headings</IndustrialHeading>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <IndustrialHeading
                  key={level}
                  level={level as 1 | 2 | 3 | 4 | 5 | 6}
                >
                  Heading Level {level}
                </IndustrialHeading>
              ))}
            </div>
          </div>

          <div>
            <IndustrialHeading level={3}>Text Variants</IndustrialHeading>
            <div className="space-y-2">
              <IndustrialText variant="default">
                Default text color
              </IndustrialText>
              <IndustrialText variant="primary">
                Primary text color
              </IndustrialText>
              <IndustrialText variant="secondary">
                Secondary text color
              </IndustrialText>
              <IndustrialText variant="accent">
                Accent text color
              </IndustrialText>
              <IndustrialText variant="muted">Muted text color</IndustrialText>
            </div>
          </div>

          <div>
            <IndustrialHeading level={3}>Text Sizes</IndustrialHeading>
            <div className="space-y-2">
              <IndustrialText size="xs">Extra small text</IndustrialText>
              <IndustrialText size="sm">Small text</IndustrialText>
              <IndustrialText size="base">Base text</IndustrialText>
              <IndustrialText size="lg">Large text</IndustrialText>
              <IndustrialText size="xl">Extra large text</IndustrialText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {
  IndustrialHeading,
  IndustrialText,
  IndustrialLabel,
  IndustrialCaption,
  IndustrialCode,
  IndustrialList,
  IndustrialListItem,
  industrialHeadingVariants,
  industrialTextVariants,
  industrialLabelVariants,
};
