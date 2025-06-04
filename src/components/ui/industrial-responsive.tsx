/**
 * Industrial Responsive Utilities
 * Comprehensive responsive design utilities for the industrial design system
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Breakpoint definitions matching Tailwind CSS defaults
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Hook for detecting current breakpoint
export const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] =
    React.useState<string>('xs');

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;

      if (width >= breakpoints['2xl']) {
        setCurrentBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setCurrentBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setCurrentBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setCurrentBreakpoint('md');
      } else if (width >= breakpoints.sm) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint('xs');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return currentBreakpoint;
};

// Hook for media query matching
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

// Responsive Container Component
interface ResponsiveContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  center?: boolean;
  fluid?: boolean;
}

export const ResponsiveContainer = React.forwardRef<
  HTMLDivElement,
  ResponsiveContainerProps
>(
  (
    {
      className,
      maxWidth = 'lg',
      padding = 'md',
      center = true,
      fluid = false,
      children,
      ...props
    },
    ref
  ) => {
    const maxWidthClasses = {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    };

    const paddingClasses = {
      none: '',
      sm: 'px-4 sm:px-6',
      md: 'px-4 sm:px-6 lg:px-8',
      lg: 'px-6 sm:px-8 lg:px-12',
      xl: 'px-8 sm:px-12 lg:px-16',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          !fluid && maxWidthClasses[maxWidth],
          center && 'mx-auto',
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ResponsiveContainer.displayName = 'ResponsiveContainer';

// Responsive Grid Component
interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
}

export const ResponsiveGrid = React.forwardRef<
  HTMLDivElement,
  ResponsiveGridProps
>(
  (
    {
      className,
      cols = { default: 1, md: 2, lg: 3 },
      gap = 'md',
      alignItems = 'stretch',
      justifyItems = 'stretch',
      children,
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    };

    const buildGridClasses = () => {
      const classes = ['grid'];

      if (cols.default) classes.push(`grid-cols-${cols.default}`);
      if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
      if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
      if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
      if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
      if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`);

      return classes.join(' ');
    };

    return (
      <div
        ref={ref}
        className={cn(
          buildGridClasses(),
          gapClasses[gap],
          `items-${alignItems}`,
          `justify-items-${justifyItems}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ResponsiveGrid.displayName = 'ResponsiveGrid';

// Responsive Stack Component
interface ResponsiveStackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: {
    default?: 'horizontal' | 'vertical';
    sm?: 'horizontal' | 'vertical';
    md?: 'horizontal' | 'vertical';
    lg?: 'horizontal' | 'vertical';
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

export const ResponsiveStack = React.forwardRef<
  HTMLDivElement,
  ResponsiveStackProps
>(
  (
    {
      className,
      direction = { default: 'vertical', md: 'horizontal' },
      gap = 'md',
      align = 'stretch',
      justify = 'start',
      wrap = false,
      children,
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    };

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const buildDirectionClasses = () => {
      const classes = ['flex'];

      if (direction.default === 'vertical') classes.push('flex-col');
      if (direction.default === 'horizontal') classes.push('flex-row');

      if (direction.sm === 'vertical') classes.push('sm:flex-col');
      if (direction.sm === 'horizontal') classes.push('sm:flex-row');

      if (direction.md === 'vertical') classes.push('md:flex-col');
      if (direction.md === 'horizontal') classes.push('md:flex-row');

      if (direction.lg === 'vertical') classes.push('lg:flex-col');
      if (direction.lg === 'horizontal') classes.push('lg:flex-row');

      return classes.join(' ');
    };

    return (
      <div
        ref={ref}
        className={cn(
          buildDirectionClasses(),
          gapClasses[gap],
          alignClasses[align],
          justifyClasses[justify],
          wrap && 'flex-wrap',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ResponsiveStack.displayName = 'ResponsiveStack';

// Responsive Show/Hide Component
interface ResponsiveVisibilityProps
  extends React.HTMLAttributes<HTMLDivElement> {
  show?: ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')[];
  hide?: ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')[];
  as?: React.ElementType;
}

export const ResponsiveVisibility = React.forwardRef<
  HTMLDivElement,
  ResponsiveVisibilityProps
>(({ className, show, hide, as = 'div', children, ...props }, ref) => {
  const Component = as;

  const buildVisibilityClasses = () => {
    const classes = [];

    if (hide) {
      hide.forEach((breakpoint) => {
        if (breakpoint === 'xs') classes.push('hidden');
        else classes.push(`${breakpoint}:hidden`);
      });
    }

    if (show) {
      // Start with hidden by default
      classes.push('hidden');
      show.forEach((breakpoint) => {
        if (breakpoint === 'xs') classes.push('block');
        else classes.push(`${breakpoint}:block`);
      });
    }

    return classes.join(' ');
  };

  return (
    <Component
      ref={ref}
      className={cn(buildVisibilityClasses(), className)}
      {...props}
    >
      {children}
    </Component>
  );
});

ResponsiveVisibility.displayName = 'ResponsiveVisibility';

// Responsive Text Size Component
interface ResponsiveTextProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: {
    default?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    sm?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    md?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    lg?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  };
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const ResponsiveText = React.forwardRef<
  HTMLElement,
  ResponsiveTextProps
>(
  (
    {
      className,
      size = { default: 'base', md: 'lg' },
      as = 'div',
      children,
      ...props
    },
    ref
  ) => {
    const Component = as;

    const buildSizeClasses = () => {
      const classes = [];

      if (size.default) classes.push(`text-industrial-${size.default}`);
      if (size.sm) classes.push(`sm:text-industrial-${size.sm}`);
      if (size.md) classes.push(`md:text-industrial-${size.md}`);
      if (size.lg) classes.push(`lg:text-industrial-${size.lg}`);

      return classes.join(' ');
    };

    return (
      <Component
        ref={ref as any}
        className={cn('font-industrial-body', buildSizeClasses(), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

ResponsiveText.displayName = 'ResponsiveText';

// Responsive Spacing Component
interface ResponsiveSpacingProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: {
    default?: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
  margin?: {
    default?: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
}

export const ResponsiveSpacing = React.forwardRef<
  HTMLDivElement,
  ResponsiveSpacingProps
>(({ className, padding, margin, children, ...props }, ref) => {
  const buildSpacingClasses = () => {
    const classes = [];

    if (padding) {
      if (padding.default) classes.push(`p-${padding.default}`);
      if (padding.sm) classes.push(`sm:p-${padding.sm}`);
      if (padding.md) classes.push(`md:p-${padding.md}`);
      if (padding.lg) classes.push(`lg:p-${padding.lg}`);
    }

    if (margin) {
      if (margin.default) classes.push(`m-${margin.default}`);
      if (margin.sm) classes.push(`sm:m-${margin.sm}`);
      if (margin.md) classes.push(`md:m-${margin.md}`);
      if (margin.lg) classes.push(`lg:m-${margin.lg}`);
    }

    return classes.join(' ');
  };

  return (
    <div ref={ref} className={cn(buildSpacingClasses(), className)} {...props}>
      {children}
    </div>
  );
});

ResponsiveSpacing.displayName = 'ResponsiveSpacing';

// Responsive Image Component
interface ResponsiveImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  sizes?: string;
  priority?: boolean;
  aspectRatio?: 'square' | '4:3' | '16:9' | '3:2' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const ResponsiveImage = React.forwardRef<
  HTMLImageElement,
  ResponsiveImageProps
>(
  (
    { className, aspectRatio = 'auto', objectFit = 'cover', alt, ...props },
    ref
  ) => {
    const aspectRatioClasses = {
      square: 'aspect-square',
      '4:3': 'aspect-[4/3]',
      '16:9': 'aspect-video',
      '3:2': 'aspect-[3/2]',
      auto: '',
    };

    const objectFitClasses = {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down',
    };

    return (
      <img
        ref={ref}
        className={cn(
          'w-full h-auto',
          aspectRatioClasses[aspectRatio],
          objectFitClasses[objectFit],
          className
        )}
        alt={alt}
        {...props}
      />
    );
  }
);

ResponsiveImage.displayName = 'ResponsiveImage';

// Utility functions
export const isMobile = () => {
  return typeof window !== 'undefined' && window.innerWidth < breakpoints.md;
};

export const isTablet = () => {
  return (
    typeof window !== 'undefined' &&
    window.innerWidth >= breakpoints.md &&
    window.innerWidth < breakpoints.lg
  );
};

export const isDesktop = () => {
  return typeof window !== 'undefined' && window.innerWidth >= breakpoints.lg;
};

// Touch device detection
export const useTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouchDevice;
};

export default {
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveStack,
  ResponsiveVisibility,
  ResponsiveText,
  ResponsiveSpacing,
  ResponsiveImage,
  useBreakpoint,
  useMediaQuery,
  useTouchDevice,
  breakpoints,
  isMobile,
  isTablet,
  isDesktop,
};
