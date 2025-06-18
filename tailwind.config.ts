import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Default shadcn/ui colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },

        // Industrial Theme Colors (HSL Variable-based)
        'industrial-background': 'hsl(var(--industrial-background))',
        'industrial-foreground': 'hsl(var(--industrial-foreground))',
        'industrial-card': {
          DEFAULT: 'hsl(var(--industrial-card))',
          foreground: 'hsl(var(--industrial-card-foreground))',
        },
        'industrial-popover': {
          DEFAULT: 'hsl(var(--industrial-popover))',
          foreground: 'hsl(var(--industrial-popover-foreground))',
        },
        'industrial-primary': {
          DEFAULT: 'hsl(var(--industrial-primary))',
          foreground: 'hsl(var(--industrial-primary-foreground))',
        },
        'industrial-secondary': {
          DEFAULT: 'hsl(var(--industrial-secondary))',
          foreground: 'hsl(var(--industrial-secondary-foreground))',
        },
        'industrial-muted': {
          DEFAULT: 'hsl(var(--industrial-muted))',
          foreground: 'hsl(var(--industrial-muted-foreground))',
        },
        'industrial-accent': {
          DEFAULT: 'hsl(var(--industrial-accent))',
          foreground: 'hsl(var(--industrial-accent-foreground))',
        },
        'industrial-destructive': {
          DEFAULT: 'hsl(var(--industrial-destructive))',
          foreground: 'hsl(var(--industrial-destructive-foreground))',
        },
        'industrial-border': 'hsl(var(--industrial-border))',
        'industrial-input': 'hsl(var(--industrial-input))',
        'industrial-ring': 'hsl(var(--industrial-ring))',

        // Industrial Theme Colors
        industrial: {
          // Gunmetal Grey variants
          gunmetal: {
            50: '#f8f9fa',
            100: '#e9ecef',
            200: '#dee2e6',
            300: '#ced4da',
            400: '#adb5bd',
            500: '#6c757d',
            600: '#495057',
            700: '#343a40',
            800: '#2C3E50', // Primary gunmetal
            900: '#34495E', // Secondary gunmetal
          },
          // Navy Blue variants
          navy: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1E3A8A', // Primary navy
            900: '#1E40AF', // Secondary navy
          },
          // Safety Yellow variants
          safety: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#FDE047', // Primary safety yellow
            400: '#facc15',
            500: '#EAB308', // Secondary safety yellow
            600: '#ca8a04',
            700: '#a16207',
            800: '#854d0e',
            900: '#713f12',
          },
        },

        // Legacy Industrial color palette for backward compatibility
        'industrial-dark': '#2C3E50',
        'industrial-light': '#34495E',
        'industrial-navy': '#1E3A8A',
        'industrial-navy-light': '#1E40AF',
        'industrial-yellow': '#FDE047',
        'industrial-yellow-dark': '#EAB308',
      },

      fontFamily: {
        // Industrial Typography with CSS variables
        'industrial-heading': [
          'var(--font-industrial-heading)',
          'Oswald',
          'Bebas Neue',
          'Arial Black',
          'sans-serif',
        ],
        'industrial-display': [
          'var(--font-industrial-display)',
          'Bebas Neue',
          'Oswald',
          'Impact',
          'Arial Black',
          'sans-serif',
        ],
        'industrial-body': [
          'var(--font-industrial-body)',
          'Source Sans Pro',
          'Inter',
          'Roboto',
          'system-ui',
          'sans-serif',
        ],
        'industrial-secondary': [
          'var(--font-industrial-secondary)',
          'Inter',
          'Roboto',
          'system-ui',
          'sans-serif',
        ],
        'industrial-mono': [
          'var(--font-industrial-mono)',
          'JetBrains Mono',
          'Fira Code',
          'Consolas',
          'monospace',
        ],

        // Aliases for easier use
        body: [
          'var(--font-industrial-body)',
          'Source Sans Pro',
          'system-ui',
          'sans-serif',
        ],
        heading: ['var(--font-industrial-heading)', 'Oswald', 'sans-serif'],
        display: ['var(--font-industrial-display)', 'Bebas Neue', 'sans-serif'],
        mono: ['var(--font-industrial-mono)', 'JetBrains Mono', 'monospace'],
      },

      backgroundImage: {
        // Metal and industrial textures
        'metal-grid':
          'linear-gradient(90deg, rgba(44,62,80,0.1) 1px, transparent 1px), linear-gradient(rgba(44,62,80,0.1) 1px, transparent 1px)',
        'brushed-steel':
          'linear-gradient(90deg, rgba(108,117,125,0.1) 0%, rgba(108,117,125,0.05) 50%, rgba(108,117,125,0.1) 100%)',
        'industrial-gradient':
          'linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #1E3A8A 100%)',
        'safety-gradient': 'linear-gradient(135deg, #FDE047 0%, #EAB308 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'metal-pattern':
          'linear-gradient(45deg, #2C3E50 25%, transparent 25%, transparent 75%, #2C3E50 75%), linear-gradient(45deg, #2C3E50 25%, transparent 25%, transparent 75%, #2C3E50 75%)',
      },

      backgroundSize: {
        'grid-sm': '20px 20px',
        'grid-md': '40px 40px',
        'grid-lg': '60px 60px',
        metal: '20px 20px',
      },

      backgroundPosition: {
        metal: '0 0, 10px 10px',
      },

      boxShadow: {
        industrial:
          '0 4px 6px -1px rgba(44, 62, 80, 0.1), 0 2px 4px -1px rgba(44, 62, 80, 0.06)',
        'industrial-lg':
          '0 10px 15px -3px rgba(44, 62, 80, 0.1), 0 4px 6px -2px rgba(44, 62, 80, 0.05)',
        safety:
          '0 4px 6px -1px rgba(253, 224, 71, 0.3), 0 2px 4px -1px rgba(234, 179, 8, 0.2)',
        'inset-steel': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      },

      borderRadius: {
        industrial: '2px',
        gear: '50%',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      spacing: {
        grid: '1.5rem',
        industrial: '0.75rem',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'gear-rotate': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(253, 224, 71, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(253, 224, 71, 0.8)' },
        },
        'skeleton-shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gear-rotate': 'gear-rotate 20s linear infinite',
        'bounce-subtle': 'bounce-subtle 2s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'gear-spin': 'spin 8s linear infinite',
        'gear-reverse': 'spin 8s linear infinite reverse',
        'industrial-pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'skeleton-shimmer': 'skeleton-shimmer 2s infinite',
      },

      fontSize: {
        // Industrial Typography Scale
        'industrial-xs': [
          '0.75rem',
          { lineHeight: '1rem', fontWeight: '600', letterSpacing: '0.025em' },
        ],
        'industrial-sm': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            fontWeight: '600',
            letterSpacing: '0.025em',
          },
        ],
        'industrial-base': [
          '1rem',
          { lineHeight: '1.5rem', fontWeight: '500', letterSpacing: '0' },
        ],
        'industrial-lg': [
          '1.125rem',
          { lineHeight: '1.75rem', fontWeight: '600', letterSpacing: '0' },
        ],
        'industrial-xl': [
          '1.25rem',
          {
            lineHeight: '1.75rem',
            fontWeight: '700',
            letterSpacing: '-0.025em',
          },
        ],
        'industrial-2xl': [
          '1.5rem',
          { lineHeight: '2rem', fontWeight: '700', letterSpacing: '-0.025em' },
        ],
        'industrial-3xl': [
          '1.875rem',
          {
            lineHeight: '2.25rem',
            fontWeight: '800',
            letterSpacing: '-0.025em',
          },
        ],
        'industrial-4xl': [
          '2.25rem',
          {
            lineHeight: '2.5rem',
            fontWeight: '800',
            letterSpacing: '-0.025em',
          },
        ],
        'industrial-5xl': [
          '3rem',
          { lineHeight: '3rem', fontWeight: '900', letterSpacing: '-0.025em' },
        ],
        'industrial-6xl': [
          '3.75rem',
          {
            lineHeight: '3.75rem',
            fontWeight: '900',
            letterSpacing: '-0.025em',
          },
        ],
        'industrial-7xl': [
          '4.5rem',
          { lineHeight: '4.5rem', fontWeight: '900', letterSpacing: '-0.05em' },
        ],
        'industrial-8xl': [
          '6rem',
          { lineHeight: '6rem', fontWeight: '900', letterSpacing: '-0.05em' },
        ],
        'industrial-9xl': [
          '8rem',
          { lineHeight: '8rem', fontWeight: '900', letterSpacing: '-0.05em' },
        ],

        // Display Typography (for hero sections, banners)
        'display-sm': [
          '2.25rem',
          {
            lineHeight: '2.5rem',
            fontWeight: '900',
            letterSpacing: '-0.025em',
          },
        ],
        'display-md': [
          '2.875rem',
          {
            lineHeight: '3.25rem',
            fontWeight: '900',
            letterSpacing: '-0.025em',
          },
        ],
        'display-lg': [
          '3.5rem',
          { lineHeight: '4rem', fontWeight: '900', letterSpacing: '-0.025em' },
        ],
        'display-xl': [
          '4.5rem',
          { lineHeight: '5rem', fontWeight: '900', letterSpacing: '-0.05em' },
        ],
        'display-2xl': [
          '5.5rem',
          { lineHeight: '6rem', fontWeight: '900', letterSpacing: '-0.05em' },
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
