/**
 * Industrial Accessibility Enhancement System
 * Advanced accessibility features designed for industrial manufacturing environments
 * Addresses harsh lighting conditions, safety requirements, and operational needs
 */

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { industrialDesignTokens } from './industrial-design-tokens';

// High Contrast Mode Detection
export const useHighContrastMode = () => {
  const [isHighContrast, setIsHighContrast] = React.useState(false);
  const [userPreference, setUserPreference] = React.useState<'auto' | 'high' | 'normal'>('auto');

  React.useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const updateContrast = () => {
      if (userPreference === 'high') {
        setIsHighContrast(true);
      } else if (userPreference === 'normal') {
        setIsHighContrast(false);
      } else {
        setIsHighContrast(mediaQuery.matches);
      }
    };

    updateContrast();
    mediaQuery.addEventListener('change', updateContrast);

    return () => mediaQuery.removeEventListener('change', updateContrast);
  }, [userPreference]);

  return {
    isHighContrast,
    userPreference,
    setUserPreference,
    toggleHighContrast: () => setUserPreference(prev => 
      prev === 'high' ? 'normal' : 'high'
    ),
  };
};

// Industrial Focus Management for Heavy Machinery Environments
export const useIndustrialFocus = (options: {
  trapFocus?: boolean;
  restoreOnUnmount?: boolean;
  skipLinks?: boolean;
  emergencyEscape?: boolean;
} = {}) => {
  const {
    trapFocus = false,
    restoreOnUnmount = true,
    skipLinks = true,
    emergencyEscape = true,
  } = options;

  const containerRef = React.useRef<HTMLElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (restoreOnUnmount) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // Emergency escape - ESC + Ctrl for safety
      if (emergencyEscape && event.key === 'Escape' && event.ctrlKey) {
        (document.activeElement as HTMLElement)?.blur();
        return;
      }

      // Enhanced focus trapping for industrial environments
      if (trapFocus && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              event.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              event.preventDefault();
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (restoreOnUnmount && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [trapFocus, restoreOnUnmount, emergencyEscape]);

  return { containerRef };
};

// Industrial Announcement System for Critical Information
export interface IndustrialAnnouncementProps {
  message: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  duration?: number;
  persistent?: boolean;
  sound?: boolean;
  onDismiss?: () => void;
}

const industrialAnnouncementVariants = cva(
  'fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg border-2 font-medium shadow-2xl',
  {
    variants: {
      type: {
        info: 'bg-industrial-navy-50 border-industrial-navy-400 text-industrial-navy-800',
        warning: 'bg-industrial-safety-50 border-industrial-safety-400 text-industrial-gunmetal-900',
        error: 'bg-red-50 border-red-500 text-red-900',
        success: 'bg-green-50 border-green-500 text-green-900',
        emergency: 'bg-red-100 border-red-600 text-red-900 animate-pulse',
      },
      priority: {
        low: 'border-opacity-50',
        medium: 'border-opacity-75',
        high: 'border-opacity-100 shadow-xl',
        critical: 'border-opacity-100 shadow-2xl ring-4 ring-red-500/20',
      },
    },
    defaultVariants: {
      type: 'info',
      priority: 'medium',
    },
  }
);

export const IndustrialAnnouncement: React.FC<IndustrialAnnouncementProps> = ({
  message,
  type,
  priority,
  duration = 5000,
  persistent = false,
  sound = false,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (!persistent && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, persistent, onDismiss]);

  React.useEffect(() => {
    if (sound && priority === 'critical') {
      // In a real implementation, you'd play an appropriate sound
      console.warn('CRITICAL ANNOUNCEMENT:', message);
    }
  }, [sound, priority, message]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 300, scale: 0.9 }}
        className={cn(industrialAnnouncementVariants({ type, priority }))}
        role="alert"
        aria-live={priority === 'critical' ? 'assertive' : 'polite'}
        aria-atomic="true"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold mb-1">
              {priority === 'critical' && '🚨 CRITICAL: '}
              {priority === 'high' && '⚠️ HIGH: '}
              {type === 'emergency' && '🚨 EMERGENCY: '}
            </p>
            <p className="text-sm">{message}</p>
          </div>
          {!persistent && (
            <button
              onClick={() => {
                setIsVisible(false);
                onDismiss?.();
              }}
              className="ml-4 text-current opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Dismiss announcement"
            >
              ×
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Enhanced Color Contrast Utilities for Industrial Environments
export const getIndustrialContrastRatio = (foreground: string, background: string): number => {
  // Simplified calculation - in production, use a proper color library
  const getLuminance = (color: string): number => {
    // This is a placeholder - implement proper luminance calculation
    const rgb = color.match(/\d+/g);
    if (!rgb) return 0.5;
    
    const [r, g, b] = rgb.map(x => {
      const val = parseInt(x) / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(foreground);
  const lum2 = getLuminance(background);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

export const getIndustrialColorPair = (
  baseColor: string,
  targetContrast: number = 4.5
): { foreground: string; background: string } => {
  // Return high-contrast industrial color pairs
  const industrialPairs = [
    { foreground: '#FFFFFF', background: '#2C3E50' }, // White on Gunmetal
    { foreground: '#2C3E50', background: '#FDE047' }, // Gunmetal on Safety Yellow
    { foreground: '#FFFFFF', background: '#1E3A8A' }, // White on Navy
    { foreground: '#1E3A8A', background: '#F8F9FA' }, // Navy on Light Grey
  ];

  // Return the first pair that meets contrast requirements
  return industrialPairs.find(pair => 
    getIndustrialContrastRatio(pair.foreground, pair.background) >= targetContrast
  ) || industrialPairs[0];
};

// Industrial Status Indicator with Accessibility
export interface IndustrialStatusProps {
  status: 'operational' | 'warning' | 'error' | 'maintenance' | 'offline';
  label: string;
  description?: string;
  blinking?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  highContrast?: boolean;
}

const industrialStatusVariants = cva(
  'inline-flex items-center gap-2 font-medium',
  {
    variants: {
      status: {
        operational: 'text-green-700',
        warning: 'text-industrial-safety-600',
        error: 'text-red-700',
        maintenance: 'text-industrial-navy-700',
        offline: 'text-industrial-gunmetal-600',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      status: 'operational',
      size: 'md',
    },
  }
);

export const IndustrialStatus: React.FC<IndustrialStatusProps> = ({
  status,
  label,
  description,
  blinking = false,
  size = 'md',
  showText = true,
  highContrast = false,
}) => {
  const statusConfig = {
    operational: { 
      color: highContrast ? '#22c55e' : '#16a34a', 
      icon: '●', 
      ariaLabel: 'System operational' 
    },
    warning: { 
      color: highContrast ? '#EAB308' : '#ca8a04', 
      icon: '▲', 
      ariaLabel: 'Warning condition' 
    },
    error: { 
      color: highContrast ? '#ef4444' : '#dc2626', 
      icon: '■', 
      ariaLabel: 'Error condition' 
    },
    maintenance: { 
      color: highContrast ? '#3b82f6' : '#2563eb', 
      icon: '◆', 
      ariaLabel: 'Under maintenance' 
    },
    offline: { 
      color: highContrast ? '#6b7280' : '#4b5563', 
      icon: '○', 
      ariaLabel: 'System offline' 
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(industrialStatusVariants({ status, size }))}
      role="status"
      aria-label={`${label}: ${config.ariaLabel}`}
    >
      <motion.span
        className="inline-block font-bold"
        style={{ color: config.color }}
        animate={blinking ? { opacity: [1, 0.3, 1] } : {}}
        transition={blinking ? { duration: 1, repeat: Infinity } : {}}
        aria-hidden="true"
      >
        {config.icon}
      </motion.span>
      
      {showText && (
        <div>
          <span className="font-semibold">{label}</span>
          {description && (
            <span className="text-sm opacity-75 block">{description}</span>
          )}
        </div>
      )}
    </div>
  );
};

// Industrial Skip Links for Keyboard Navigation
export interface IndustrialSkipLinksProps {
  links: Array<{
    href: string;
    label: string;
  }>;
}

export const IndustrialSkipLinks: React.FC<IndustrialSkipLinksProps> = ({ links }) => {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <nav aria-label="Skip links" className="fixed top-0 left-0 z-50">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="block bg-industrial-gunmetal-800 text-white px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-industrial-safety-300 focus:ring-offset-2 transform -translate-y-full focus:translate-y-0 transition-transform"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

// Industrial Screen Reader Announcements
export const useIndustrialScreenReader = () => {
  const announce = React.useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  const announceStatus = React.useCallback((status: string, context?: string) => {
    const message = context ? `${context}: ${status}` : status;
    announce(message, 'assertive');
  }, [announce]);

  const announceNavigation = React.useCallback((destination: string) => {
    announce(`Navigated to ${destination}`, 'polite');
  }, [announce]);

  return {
    announce,
    announceStatus,
    announceNavigation,
  };
};

// Industrial Touch Target Enhancement
export const IndustrialTouchTarget: React.FC<{
  children: React.ReactNode;
  minSize?: number;
  className?: string;
}> = ({ children, minSize = 44, className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center',
        className
      )}
      style={{
        minWidth: `${minSize}px`,
        minHeight: `${minSize}px`,
      }}
    >
      {children}
    </div>
  );
};

// Export accessibility context and providers
export const IndustrialAccessibilityContext = React.createContext<{
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  announcements: boolean;
  toggleHighContrast: () => void;
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
}>({
  highContrast: false,
  reducedMotion: false,
  fontSize: 'normal',
  announcements: true,
  toggleHighContrast: () => {},
  setFontSize: () => {},
});

export const IndustrialAccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isHighContrast, toggleHighContrast } = useHighContrastMode();
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [fontSize, setFontSize] = React.useState<'normal' | 'large' | 'extra-large'>('normal');
  const [announcements, setAnnouncements] = React.useState(true);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = {
    highContrast: isHighContrast,
    reducedMotion,
    fontSize,
    announcements,
    toggleHighContrast,
    setFontSize,
  };

  return (
    <IndustrialAccessibilityContext.Provider value={value}>
      <div
        className={cn(
          isHighContrast && 'high-contrast',
          reducedMotion && 'reduce-motion',
          fontSize === 'large' && 'text-lg',
          fontSize === 'extra-large' && 'text-xl'
        )}
      >
        {children}
      </div>
    </IndustrialAccessibilityContext.Provider>
  );
};

export const useIndustrialAccessibility = () => {
  const context = React.useContext(IndustrialAccessibilityContext);
  if (!context) {
    throw new Error('useIndustrialAccessibility must be used within IndustrialAccessibilityProvider');
  }
  return context;
};