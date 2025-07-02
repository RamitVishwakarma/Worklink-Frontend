/**
 * Industrial Responsive Grid System
 * Advanced responsive grid components with industrial theming and accessibility
 */

import * as React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { industrialDesignTokens } from './industrial-design-tokens';

// Enhanced breakpoint utilities
export const industrialBreakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const;

// Type definitions
export interface ResponsiveSpan {
  default?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  '2xl'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  '3xl'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
}

// Grid container variants
const industrialGridVariants = cva(
  'grid w-full',
  {
    variants: {
      variant: {
        default: 'gap-4',
        compact: 'gap-2',
        spacious: 'gap-8',
        industrial: 'gap-6 p-4 bg-gradient-to-br from-industrial-gunmetal-50/20 to-transparent',
        metal: 'gap-4 p-6 metal-texture border border-industrial-gunmetal-200 rounded-lg',
      },
      
      pattern: {
        none: '',
        grid: 'metal-grid',
        steel: 'brushed-steel',
        gradient: 'bg-gradient-to-br from-industrial-gunmetal-50 to-white',
      },
      
      responsive: {
        true: '',
        false: '',
      },
      
      animated: {
        true: '',
        false: '',
      },
    },
    
    defaultVariants: {
      variant: 'default',
      pattern: 'none',
      responsive: true,
      animated: false,
    },
  }
);

// Grid item variants
const industrialGridItemVariants = cva(
  'relative',
  {
    variants: {
      span: {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
        4: 'col-span-4',
        5: 'col-span-5',
        6: 'col-span-6',
        7: 'col-span-7',
        8: 'col-span-8',
        9: 'col-span-9',
        10: 'col-span-10',
        11: 'col-span-11',
        12: 'col-span-12',
        full: 'col-span-full',
      },
      
      offset: {
        0: 'col-start-1',
        1: 'col-start-2',
        2: 'col-start-3',
        3: 'col-start-4',
        4: 'col-start-5',
        5: 'col-start-6',
        6: 'col-start-7',
        7: 'col-start-8',
        8: 'col-start-9',
        9: 'col-start-10',
        10: 'col-start-11',
        11: 'col-start-12',
      },
      
      order: {
        first: 'order-first',
        last: 'order-last',
        none: 'order-none',
        1: 'order-1',
        2: 'order-2',
        3: 'order-3',
        4: 'order-4',
        5: 'order-5',
        6: 'order-6',
      },
    },
    
    defaultVariants: {
      span: 1,
      offset: 0,
      order: 'none',
    },
  }
);

// Responsive column definitions
export interface ResponsiveColumns {
  default?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
  '3xl'?: number;
}

export interface ResponsiveSpan {
  default?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  '2xl'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  '3xl'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
}

// Main Grid Container Component
export interface IndustrialGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof industrialGridVariants> {
  columns?: ResponsiveColumns;
  minItemWidth?: string;
  maxColumns?: number;
  autoFit?: boolean;
  autoFill?: boolean;
  equalHeight?: boolean;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  containerQuery?: boolean;
  density?: 'compact' | 'normal' | 'spacious';
}

const IndustrialGrid = React.forwardRef<HTMLDivElement, IndustrialGridProps>(
  (
    {
      className,
      variant,
      pattern,
      responsive,
      animated,
      columns = { default: 1, sm: 2, md: 3, lg: 4 },
      minItemWidth,
      maxColumns = 12,
      autoFit = false,
      autoFill = false,
      equalHeight = false,
      gap,
      rowGap,
      columnGap,
      containerQuery = false,
      density = 'normal',
      children,
      ...props
    },
    ref
  ) => {
    // Generate responsive grid classes
    const gridClasses = React.useMemo(() => {
      if (minItemWidth) {
        return autoFit
          ? `grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`
          : autoFill
          ? `grid-cols-[repeat(auto-fill,minmax(${minItemWidth},1fr))]`
          : `grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`;
      }

      const classes: string[] = [];
      
      Object.entries(columns).forEach(([breakpoint, cols]) => {
        if (breakpoint === 'default') {
          classes.push(`grid-cols-${Math.min(cols, maxColumns)}`);
        } else {
          classes.push(`${breakpoint}:grid-cols-${Math.min(cols, maxColumns)}`);
        }
      });
      
      return classes.join(' ');
    }, [columns, minItemWidth, autoFit, autoFill, maxColumns]);

    // Generate gap classes
    const gapClasses = React.useMemo(() => {
      const classes: string[] = [];
      
      if (gap) classes.push(`gap-${gap}`);
      if (rowGap) classes.push(`row-gap-${rowGap}`);
      if (columnGap) classes.push(`col-gap-${columnGap}`);
      
      // Density-based gaps
      if (!gap && !rowGap && !columnGap) {
        switch (density) {
          case 'compact':
            classes.push('gap-2');
            break;
          case 'spacious':
            classes.push('gap-8');
            break;
          default:
            classes.push('gap-4');
        }
      }
      
      return classes.join(' ');
    }, [gap, rowGap, columnGap, density]);

    const gridContent = (
      <div
        ref={ref}
        className={cn(
          industrialGridVariants({ variant, pattern, responsive, animated }),
          gridClasses,
          gapClasses,
          equalHeight && 'auto-rows-fr',
          containerQuery && '@container',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (animated) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: industrialDesignTokens.animations.durations.default,
            ease: industrialDesignTokens.animations.easings.industrial,
          }}
        >
          {gridContent}
        </motion.div>
      );
    }

    return gridContent;
  }
);

IndustrialGrid.displayName = 'IndustrialGrid';

// Grid Item Component
export interface IndustrialGridItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  span?: ResponsiveSpan | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  offset?: number;
  order?: number;
  responsiveSpan?: ResponsiveSpan;
  aspectRatio?: string;
  minHeight?: string;
  maxHeight?: string;
  sticky?: boolean;
  animated?: boolean;
  animationDelay?: number;
  containerQuery?: boolean;
}

const IndustrialGridItem = React.forwardRef<HTMLDivElement, IndustrialGridItemProps>(
  (
    {
      className,
      span: spanProp,
      responsiveSpan,
      aspectRatio,
      minHeight,
      maxHeight,
      sticky = false,
      animated = false,
      animationDelay = 0,
      containerQuery = false,
      children,
      ...props
    },
    ref
  ) => {
    // Generate responsive span classes
    const spanClasses = React.useMemo(() => {
      const spanConfig = responsiveSpan || (spanProp && { default: spanProp }) || { default: 1 };
      const classes: string[] = [];
      
      Object.entries(spanConfig).forEach(([breakpoint, spanValue]) => {
        if (breakpoint === 'default') {
          classes.push(spanValue === 'full' ? 'col-span-full' : `col-span-${spanValue}`);
        } else {
          classes.push(spanValue === 'full' ? `${breakpoint}:col-span-full` : `${breakpoint}:col-span-${spanValue}`);
        }
      });
      
      return classes.join(' ');
    }, [spanProp, responsiveSpan]);

    const itemContent = (
      <div
        ref={ref}
        className={cn(
          'relative', // Base grid item class
          spanClasses,
          aspectRatio && `aspect-[${aspectRatio}]`,
          minHeight && `min-h-[${minHeight}]`,
          maxHeight && `max-h-[${maxHeight}]`,
          sticky && 'sticky top-4',
          containerQuery && '@container',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (animated) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: industrialDesignTokens.animations.durations.default,
            ease: industrialDesignTokens.animations.easings.industrial,
            delay: animationDelay,
          }}
        >
          {itemContent}
        </motion.div>
      );
    }

    return itemContent;
  }
);

IndustrialGridItem.displayName = 'IndustrialGridItem';

// Specialized Grid Components

// Dashboard Grid for analytics cards
export interface IndustrialDashboardGridProps extends Omit<IndustrialGridProps, 'columns'> {
  layout?: 'default' | 'compact' | 'wide' | 'mobile-first';
}

const IndustrialDashboardGrid = React.forwardRef<HTMLDivElement, IndustrialDashboardGridProps>(
  ({ layout = 'default', ...props }, ref) => {
    const layoutColumns: ResponsiveColumns = React.useMemo(() => {
      switch (layout) {
        case 'compact':
          return { default: 1, sm: 2, md: 3, lg: 4, xl: 6 };
        case 'wide':
          return { default: 1, sm: 1, md: 2, lg: 3, xl: 4 };
        case 'mobile-first':
          return { default: 1, md: 2, lg: 3 };
        default:
          return { default: 1, sm: 2, md: 2, lg: 3, xl: 4 };
      }
    }, [layout]);

    return (
      <IndustrialGrid
        ref={ref}
        columns={layoutColumns}
        variant="industrial"
        pattern="grid"
        density="normal"
        equalHeight
        {...props}
      />
    );
  }
);

IndustrialDashboardGrid.displayName = 'IndustrialDashboardGrid';

// Table Grid for data display
export interface IndustrialTableGridProps extends Omit<IndustrialGridProps, 'columns'> {
  headers: string[];
  minColumnWidth?: string;
}

const IndustrialTableGrid = React.forwardRef<HTMLDivElement, IndustrialTableGridProps>(
  ({ headers, minColumnWidth = '120px', ...props }, ref) => {
    const tableColumns = headers.length;
    
    return (
      <IndustrialGrid
        ref={ref}
        minItemWidth={minColumnWidth}
        maxColumns={tableColumns}
        autoFit
        variant="default"
        density="compact"
        className="border border-industrial-gunmetal-200 rounded-lg overflow-hidden"
        {...props}
      />
    );
  }
);

IndustrialTableGrid.displayName = 'IndustrialTableGrid';

// Masonry Grid for dynamic content
export interface IndustrialMasonryGridProps extends Omit<IndustrialGridProps, 'columns'> {
  breakpointCols?: ResponsiveColumns;
}

const IndustrialMasonryGrid = React.forwardRef<HTMLDivElement, IndustrialMasonryGridProps>(
  ({ breakpointCols = { default: 1, sm: 2, md: 3, lg: 4 }, ...props }, ref) => {
    return (
      <IndustrialGrid
        ref={ref}
        columns={breakpointCols}
        variant="default"
        className="masonry-grid"
        {...props}
      />
    );
  }
);

IndustrialMasonryGrid.displayName = 'IndustrialMasonryGrid';

// Hook for responsive breakpoints
export const useIndustrialBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState<string>('xs');
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });

      if (width >= industrialBreakpoints['3xl']) {
        setCurrentBreakpoint('3xl');
      } else if (width >= industrialBreakpoints['2xl']) {
        setCurrentBreakpoint('2xl');
      } else if (width >= industrialBreakpoints.xl) {
        setCurrentBreakpoint('xl');
      } else if (width >= industrialBreakpoints.lg) {
        setCurrentBreakpoint('lg');
      } else if (width >= industrialBreakpoints.md) {
        setCurrentBreakpoint('md');
      } else if (width >= industrialBreakpoints.sm) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint('xs');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    breakpoint: currentBreakpoint,
    windowSize,
    isMobile: currentBreakpoint === 'xs' || currentBreakpoint === 'sm',
    isTablet: currentBreakpoint === 'md',
    isDesktop: ['lg', 'xl', '2xl', '3xl'].includes(currentBreakpoint),
    isLargeScreen: ['xl', '2xl', '3xl'].includes(currentBreakpoint),
  };
};

// Hook for container queries
export const useIndustrialContainerQuery = (ref: React.RefObject<HTMLElement>) => {
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return {
    containerSize,
    isSmallContainer: containerSize.width < 400,
    isMediumContainer: containerSize.width >= 400 && containerSize.width < 768,
    isLargeContainer: containerSize.width >= 768,
  };
};

export {
  IndustrialGrid,
  IndustrialGridItem,
  IndustrialDashboardGrid,
  IndustrialTableGrid,
  IndustrialMasonryGrid,
  industrialGridVariants,
  industrialGridItemVariants,
};
