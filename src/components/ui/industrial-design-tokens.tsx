/**
 * Industrial Design Tokens
 * Centralized design system tokens for the WorkLink Industrial theme
 */

export const industrialDesignTokens = {
  // Color System
  colors: {
    // Primary Gunmetal Grey palette
    gunmetal: {
      50: '#f8f9fa',
      100: '#e9ecef',
      200: '#dee2e6',
      300: '#ced4da',
      400: '#adb5bd',
      500: '#6c757d',
      600: '#495057',
      700: '#343a40',
      800: '#2C3E50', // Primary brand color
      900: '#1a1e23',
    },
    
    // Navy Blue palette
    navy: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1E3A8A', // Secondary brand color
      900: '#1e40af',
    },
    
    // Safety Yellow palette
    safety: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#FDE047', // Primary accent color
      400: '#facc15',
      500: '#EAB308', // Secondary accent color
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
    },
    
    // Semantic colors
    semantic: {
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
      },
      warning: {
        50: '#fefce8',
        100: '#fef9c3',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
      },
      danger: {
        50: '#fef2f2',
        100: '#fee2e2',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
      },
    },
  },

  // Typography System
  typography: {
    fontFamilies: {
      heading: ['Oswald', 'Bebas Neue', 'Arial Black', 'sans-serif'],
      display: ['Bebas Neue', 'Oswald', 'Impact', 'Arial Black', 'sans-serif'],
      body: ['Inter', 'Source Sans Pro', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
    },
    
    fontSizes: {
      'xs': '0.75rem',   // 12px
      'sm': '0.875rem',  // 14px
      'base': '1rem',    // 16px
      'lg': '1.125rem',  // 18px
      'xl': '1.25rem',   // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
    
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      black: '900',
    },
    
    lineHeights: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Spacing System
  spacing: {
    0: '0px',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },

  // Border Radius System
  borderRadius: {
    none: '0px',
    sm: '0.125rem',     // 2px
    default: '0.25rem', // 4px (industrial-radius)
    md: '0.375rem',     // 6px
    lg: '0.5rem',       // 8px
    xl: '0.75rem',      // 12px
    '2xl': '1rem',      // 16px
    full: '9999px',
  },

  // Shadow System
  shadows: {
    industrial: {
      sm: '0 1px 2px 0 rgba(44, 62, 80, 0.05)',
      default: '0 1px 3px 0 rgba(44, 62, 80, 0.1), 0 1px 2px 0 rgba(44, 62, 80, 0.06)',
      md: '0 4px 6px -1px rgba(44, 62, 80, 0.1), 0 2px 4px -1px rgba(44, 62, 80, 0.06)',
      lg: '0 10px 15px -3px rgba(44, 62, 80, 0.1), 0 4px 6px -2px rgba(44, 62, 80, 0.05)',
      xl: '0 20px 25px -5px rgba(44, 62, 80, 0.1), 0 10px 10px -5px rgba(44, 62, 80, 0.04)',
      '2xl': '0 25px 50px -12px rgba(44, 62, 80, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(44, 62, 80, 0.06)',
    },
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Animation Presets
  animations: {
    durations: {
      fast: '0.2s',
      default: '0.3s',
      slow: '0.5s',
      slower: '0.8s',
    },
    
    easings: {
      // Industrial precision-inspired easing functions
      industrial: 'cubic-bezier(0.4, 0, 0.2, 1)',
      precision: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      mechanical: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    },
    
    // Common animation variants for Framer Motion
    variants: {
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
      
      slideUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
      },
      
      slideRight: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
      },
      
      scale: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
      },
      
      // Industrial-specific animations
      gearRotate: {
        animate: { 
          rotate: 360,
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }
        }
      },
      
      metalShimmer: {
        initial: { x: '-100%' },
        animate: { x: '100%' },
        transition: { 
          duration: 1.5, 
          repeat: Infinity, 
          ease: 'linear' 
        }
      },
    },
  },

  // Component Variants
  components: {
    // Button variants
    button: {
      variants: {
        'industrial-primary': {
          background: 'bg-industrial-gunmetal-800',
          text: 'text-white',
          border: 'border-industrial-gunmetal-800',
          hover: 'hover:bg-industrial-gunmetal-700',
          focus: 'focus:ring-industrial-gunmetal-500',
        },
        'industrial-secondary': {
          background: 'bg-industrial-navy-800',
          text: 'text-white',
          border: 'border-industrial-navy-800',
          hover: 'hover:bg-industrial-navy-700',
          focus: 'focus:ring-industrial-navy-500',
        },
        'industrial-accent': {
          background: 'bg-industrial-safety-300',
          text: 'text-industrial-gunmetal-900',
          border: 'border-industrial-safety-300',
          hover: 'hover:bg-industrial-safety-400',
          focus: 'focus:ring-industrial-safety-500',
        },
        'industrial-outline': {
          background: 'bg-transparent',
          text: 'text-industrial-gunmetal-800',
          border: 'border-industrial-gunmetal-300',
          hover: 'hover:bg-industrial-gunmetal-50',
          focus: 'focus:ring-industrial-gunmetal-500',
        },
      },
      
      sizes: {
        sm: 'px-3 py-1.5 text-sm',
        default: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
      },
    },
    
    // Card variants
    card: {
      variants: {
        industrial: {
          background: 'bg-white',
          border: 'border-industrial-gunmetal-200',
          shadow: 'shadow-industrial-md',
          text: 'text-industrial-gunmetal-800',
        },
        'industrial-dark': {
          background: 'bg-industrial-gunmetal-900',
          border: 'border-industrial-gunmetal-700',
          shadow: 'shadow-industrial-lg',
          text: 'text-white',
        },
        'industrial-accent': {
          background: 'bg-industrial-safety-50',
          border: 'border-industrial-safety-200',
          shadow: 'shadow-industrial-md',
          text: 'text-industrial-gunmetal-800',
        },
      },
    },
  },

  // Industrial Patterns
  patterns: {
    metalGrid: {
      backgroundImage: `linear-gradient(rgba(108, 117, 125, 0.1) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(108, 117, 125, 0.1) 1px, transparent 1px)`,
      backgroundSize: '20px 20px',
    },
    
    brushedSteel: {
      background: `linear-gradient(90deg, 
                   rgba(108, 117, 125, 0.1) 0%, 
                   rgba(108, 117, 125, 0.05) 50%, 
                   rgba(108, 117, 125, 0.1) 100%)`,
    },
    
    industrialGradient: {
      background: `linear-gradient(135deg, 
                   #2C3E50 0%, 
                   #34495E 25%, 
                   #1E3A8A 75%, 
                   #1E40AF 100%)`,
    },
  },
};

// Type definitions for design tokens
export type IndustrialColors = typeof industrialDesignTokens.colors;
export type IndustrialTypography = typeof industrialDesignTokens.typography;
export type IndustrialSpacing = typeof industrialDesignTokens.spacing;
export type IndustrialAnimations = typeof industrialDesignTokens.animations;

// Utility functions for accessing design tokens
export const getIndustrialColor = (path: string): string => {
  const parts = path.split('.');
  let value: any = industrialDesignTokens.colors;
  
  for (const part of parts) {
    value = value?.[part];
  }
  
  return value || path;
};

export const getIndustrialSpacing = (key: keyof typeof industrialDesignTokens.spacing): string => {
  return industrialDesignTokens.spacing[key];
};

export const getIndustrialShadow = (key: keyof typeof industrialDesignTokens.shadows.industrial): string => {
  return industrialDesignTokens.shadows.industrial[key];
};

// CSS-in-JS helper for industrial patterns
export const industrialPatterns = {
  metalGrid: {
    backgroundImage: industrialDesignTokens.patterns.metalGrid.backgroundImage,
    backgroundSize: industrialDesignTokens.patterns.metalGrid.backgroundSize,
  },
  
  brushedSteel: {
    background: industrialDesignTokens.patterns.brushedSteel.background,
  },
  
  industrialGradient: {
    background: industrialDesignTokens.patterns.industrialGradient.background,
  },
};

export default industrialDesignTokens;
