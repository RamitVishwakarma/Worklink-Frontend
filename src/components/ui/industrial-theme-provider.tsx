/**
 * Industrial Theme Provider
 * Comprehensive theme system for the WorkLink Industrial Design System
 * Integrates design tokens, accessibility, responsive design, and user preferences
 */

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { industrialDesignTokens } from './industrial-design-tokens';
import { IndustrialAccessibilityProvider } from './industrial-accessibility-enhanced';

// Theme configuration types
export interface IndustrialThemeConfig {
  variant: 'light' | 'dark' | 'auto';
  contrast: 'normal' | 'high' | 'auto';
  motion: 'full' | 'reduced' | 'auto';
  fontSize: 'normal' | 'large' | 'extra-large';
  density: 'compact' | 'normal' | 'spacious';
  colorPalette: 'default' | 'safety-focused' | 'high-contrast';
  typography: 'default' | 'large-text' | 'dyslexia-friendly';
}

// Default theme configuration
export const defaultIndustrialTheme: IndustrialThemeConfig = {
  variant: 'light',
  contrast: 'normal',
  motion: 'full',
  fontSize: 'normal',
  density: 'normal',
  colorPalette: 'default',
  typography: 'default',
};

// Industrial Theme Context
export interface IndustrialThemeContextType {
  config: IndustrialThemeConfig;
  updateTheme: (updates: Partial<IndustrialThemeConfig>) => void;
  resetTheme: () => void;
  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  isDarkMode: boolean;
  isHighContrast: boolean;
  isReducedMotion: boolean;
  cssVariables: Record<string, string>;
}

const IndustrialThemeContext = React.createContext<IndustrialThemeContextType | null>(null);

// Theme utilities
export const getIndustrialThemeClasses = (config: IndustrialThemeConfig): string => {
  const classes = [
    'industrial-theme',
    `theme-variant-${config.variant}`,
    `theme-contrast-${config.contrast}`,
    `theme-motion-${config.motion}`,
    `theme-font-size-${config.fontSize}`,
    `theme-density-${config.density}`,
    `theme-palette-${config.colorPalette}`,
    `theme-typography-${config.typography}`,
  ];

  return classes.join(' ');
};

export const getIndustrialCSSVariables = (config: IndustrialThemeConfig): Record<string, string> => {
  const { colors, typography, spacing, shadows } = industrialDesignTokens;
  
  const variables: Record<string, string> = {
    // Color variables
    '--industrial-primary': config.variant === 'dark' 
      ? colors.gunmetal[100] 
      : colors.gunmetal[800],
    '--industrial-background': config.variant === 'dark' 
      ? colors.gunmetal[900] 
      : '#ffffff',
    '--industrial-foreground': config.variant === 'dark' 
      ? colors.gunmetal[100] 
      : colors.gunmetal[800],
    
    // Typography variables
    '--industrial-font-size-base': typography.fontSizes[config.fontSize === 'large' ? 'lg' : config.fontSize === 'extra-large' ? 'xl' : 'base'],
    '--industrial-font-family-heading': typography.fontFamilies.heading.join(', '),
    '--industrial-font-family-body': typography.fontFamilies.body.join(', '),
    
    // Spacing variables (density-based)
    '--industrial-spacing-unit': config.density === 'compact' 
      ? '0.75rem' 
      : config.density === 'spacious' 
      ? '1.5rem' 
      : '1rem',
    
    // Motion variables
    '--industrial-animation-duration': config.motion === 'reduced' 
      ? '0.01ms' 
      : industrialDesignTokens.animations.durations.default,
  };

  // High contrast adjustments
  if (config.contrast === 'high') {
    variables['--industrial-contrast-ratio'] = '7:1';
    variables['--industrial-border-width'] = '2px';
  }

  return variables;
};

// Local storage utilities
const THEME_STORAGE_KEY = 'worklink-industrial-theme';

export const saveThemeToStorage = (config: IndustrialThemeConfig): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(config));
  }
};

export const loadThemeFromStorage = (): IndustrialThemeConfig | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// System preference detection
export const useSystemPreferences = () => {
  const [systemPreferences, setSystemPreferences] = React.useState({
    darkMode: false,
    highContrast: false,
    reducedMotion: false,
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updatePreferences = () => {
      setSystemPreferences({
        darkMode: darkModeQuery.matches,
        highContrast: contrastQuery.matches,
        reducedMotion: motionQuery.matches,
      });
    };

    updatePreferences();

    darkModeQuery.addEventListener('change', updatePreferences);
    contrastQuery.addEventListener('change', updatePreferences);
    motionQuery.addEventListener('change', updatePreferences);

    return () => {
      darkModeQuery.removeEventListener('change', updatePreferences);
      contrastQuery.removeEventListener('change', updatePreferences);
      motionQuery.removeEventListener('change', updatePreferences);
    };
  }, []);

  return systemPreferences;
};

// Main theme provider component
export interface IndustrialThemeProviderProps {
  children: React.ReactNode;
  defaultConfig?: Partial<IndustrialThemeConfig>;
  enablePersistence?: boolean;
  enableSystemSync?: boolean;
}

export const IndustrialThemeProvider: React.FC<IndustrialThemeProviderProps> = ({
  children,
  defaultConfig = {},
  enablePersistence = true,
  enableSystemSync = true,
}) => {
  const systemPreferences = useSystemPreferences();
  
  // Initialize theme configuration
  const [config, setConfig] = React.useState<IndustrialThemeConfig>(() => {
    const stored = enablePersistence ? loadThemeFromStorage() : null;
    return {
      ...defaultIndustrialTheme,
      ...defaultConfig,
      ...stored,
    };
  });

  // Sync with system preferences
  React.useEffect(() => {
    if (!enableSystemSync) return;

    setConfig(prev => ({
      ...prev,
      variant: prev.variant === 'auto' 
        ? (systemPreferences.darkMode ? 'dark' : 'light')
        : prev.variant,
      contrast: prev.contrast === 'auto'
        ? (systemPreferences.highContrast ? 'high' : 'normal')
        : prev.contrast,
      motion: prev.motion === 'auto'
        ? (systemPreferences.reducedMotion ? 'reduced' : 'full')
        : prev.motion,
    }));
  }, [systemPreferences, enableSystemSync]);

  // Persist theme changes
  React.useEffect(() => {
    if (enablePersistence) {
      saveThemeToStorage(config);
    }
  }, [config, enablePersistence]);

  // Theme update functions
  const updateTheme = React.useCallback((updates: Partial<IndustrialThemeConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const resetTheme = React.useCallback(() => {
    setConfig({ ...defaultIndustrialTheme, ...defaultConfig });
  }, [defaultConfig]);

  const toggleDarkMode = React.useCallback(() => {
    setConfig(prev => ({
      ...prev,
      variant: prev.variant === 'dark' ? 'light' : 'dark',
    }));
  }, []);

  const toggleHighContrast = React.useCallback(() => {
    setConfig(prev => ({
      ...prev,
      contrast: prev.contrast === 'high' ? 'normal' : 'high',
    }));
  }, []);

  const toggleReducedMotion = React.useCallback(() => {
    setConfig(prev => ({
      ...prev,
      motion: prev.motion === 'reduced' ? 'full' : 'reduced',
    }));
  }, []);

  const increaseFontSize = React.useCallback(() => {
    setConfig(prev => ({
      ...prev,
      fontSize: prev.fontSize === 'normal' 
        ? 'large' 
        : prev.fontSize === 'large' 
        ? 'extra-large' 
        : 'extra-large',
    }));
  }, []);

  const decreaseFontSize = React.useCallback(() => {
    setConfig(prev => ({
      ...prev,
      fontSize: prev.fontSize === 'extra-large' 
        ? 'large' 
        : prev.fontSize === 'large' 
        ? 'normal' 
        : 'normal',
    }));
  }, []);

  // Computed values
  const isDarkMode = config.variant === 'dark' || 
    (config.variant === 'auto' && systemPreferences.darkMode);
  const isHighContrast = config.contrast === 'high' || 
    (config.contrast === 'auto' && systemPreferences.highContrast);
  const isReducedMotion = config.motion === 'reduced' || 
    (config.motion === 'auto' && systemPreferences.reducedMotion);

  const cssVariables = React.useMemo(() => 
    getIndustrialCSSVariables(config), [config]
  );

  const themeClasses = React.useMemo(() => 
    getIndustrialThemeClasses(config), [config]
  );

  const contextValue: IndustrialThemeContextType = {
    config,
    updateTheme,
    resetTheme,
    toggleDarkMode,
    toggleHighContrast,
    toggleReducedMotion,
    increaseFontSize,
    decreaseFontSize,
    isDarkMode,
    isHighContrast,
    isReducedMotion,
    cssVariables,
  };

  return (
    <IndustrialThemeContext.Provider value={contextValue}>
      <IndustrialAccessibilityProvider>
        <div
          className={cn(themeClasses)}
          style={cssVariables}
          data-theme={config.variant}
          data-contrast={config.contrast}
          data-motion={config.motion}
          data-density={config.density}
        >
          {children}
        </div>
      </IndustrialAccessibilityProvider>
    </IndustrialThemeContext.Provider>
  );
};

// Theme context hook
export const useIndustrialTheme = (): IndustrialThemeContextType => {
  const context = React.useContext(IndustrialThemeContext);
  
  if (!context) {
    throw new Error('useIndustrialTheme must be used within IndustrialThemeProvider');
  }
  
  return context;
};

// Theme controls component for settings pages
export interface IndustrialThemeControlsProps {
  showAdvanced?: boolean;
  className?: string;
}

export const IndustrialThemeControls: React.FC<IndustrialThemeControlsProps> = ({
  showAdvanced = false,
  className,
}) => {
  const {
    config,
    updateTheme,
    resetTheme,
    toggleDarkMode,
    toggleHighContrast,
    isDarkMode,
    isHighContrast,
  } = useIndustrialTheme();

  return (
    <div className={cn('space-y-6 p-6 border border-industrial-border rounded-lg', className)}>
      <div>
        <h3 className="text-lg font-semibold mb-4">Industrial Theme Settings</h3>
        
        {/* Basic Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="dark-mode" className="font-medium">
              Dark Mode
            </label>
            <button
              id="dark-mode"
              onClick={toggleDarkMode}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                isDarkMode ? 'bg-industrial-accent' : 'bg-industrial-gunmetal-300'
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="high-contrast" className="font-medium">
              High Contrast
            </label>
            <button
              id="high-contrast"
              onClick={toggleHighContrast}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                isHighContrast ? 'bg-industrial-accent' : 'bg-industrial-gunmetal-300'
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  isHighContrast ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
          </div>

          <div>
            <label className="font-medium block mb-2">Font Size</label>
            <select
              value={config.fontSize}
              onChange={(e) => updateTheme({ 
                fontSize: e.target.value as IndustrialThemeConfig['fontSize'] 
              })}
              className="w-full p-2 border border-industrial-border rounded"
            >
              <option value="normal">Normal</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra Large</option>
            </select>
          </div>

          <div>
            <label className="font-medium block mb-2">Layout Density</label>
            <select
              value={config.density}
              onChange={(e) => updateTheme({ 
                density: e.target.value as IndustrialThemeConfig['density'] 
              })}
              className="w-full p-2 border border-industrial-border rounded"
            >
              <option value="compact">Compact</option>
              <option value="normal">Normal</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>
        </div>

        {/* Advanced Controls */}
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-industrial-border space-y-4"
          >
            <div>
              <label className="font-medium block mb-2">Color Palette</label>
              <select
                value={config.colorPalette}
                onChange={(e) => updateTheme({ 
                  colorPalette: e.target.value as IndustrialThemeConfig['colorPalette'] 
                })}
                className="w-full p-2 border border-industrial-border rounded"
              >
                <option value="default">Default</option>
                <option value="safety-focused">Safety Focused</option>
                <option value="high-contrast">High Contrast</option>
              </select>
            </div>

            <div>
              <label className="font-medium block mb-2">Typography</label>
              <select
                value={config.typography}
                onChange={(e) => updateTheme({ 
                  typography: e.target.value as IndustrialThemeConfig['typography'] 
                })}
                className="w-full p-2 border border-industrial-border rounded"
              >
                <option value="default">Default</option>
                <option value="large-text">Large Text</option>
                <option value="dyslexia-friendly">Dyslexia Friendly</option>
              </select>
            </div>

            <div>
              <label className="font-medium block mb-2">Motion</label>
              <select
                value={config.motion}
                onChange={(e) => updateTheme({ 
                  motion: e.target.value as IndustrialThemeConfig['motion'] 
                })}
                className="w-full p-2 border border-industrial-border rounded"
              >
                <option value="full">Full Motion</option>
                <option value="reduced">Reduced Motion</option>
                <option value="auto">System Preference</option>
              </select>
            </div>
          </motion.div>
        )}

        {/* Reset Button */}
        <div className="mt-6 pt-6 border-t border-industrial-border">
          <button
            onClick={resetTheme}
            className="px-4 py-2 bg-industrial-gunmetal-600 text-white rounded hover:bg-industrial-gunmetal-700 transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

// CSS Variables Hook for components
export const useIndustrialCSSVariables = () => {
  const { cssVariables } = useIndustrialTheme();
  return cssVariables;
};

// Responsive theme utilities
export const useIndustrialResponsive = () => {
  const { config } = useIndustrialTheme();
  
  const getResponsiveValue = React.useCallback((
    mobile: any,
    tablet?: any,
    desktop?: any
  ) => {
    // This would integrate with the breakpoint system
    // For now, return mobile value as default
    return mobile;
  }, []);

  return { getResponsiveValue, density: config.density };
};
