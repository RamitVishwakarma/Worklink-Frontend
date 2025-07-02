# Industrial Design System v2.0 - Enhanced

A comprehensive, accessibility-first design system built for industrial manufacturing environments with enhanced responsive design, advanced accessibility features, and centralized design tokens.

## 🏭 Overview

The Enhanced Industrial Design System provides a complete set of components, tokens, and utilities designed specifically for industrial and manufacturing applications. This system prioritizes accessibility, safety, and usability in demanding environments.

## 🚀 Key Features

### 🎨 Design Tokens

- **Centralized Color System**: Gunmetal grey, navy blue, and safety yellow palettes
- **Typography Scale**: Industrial-grade fonts with enhanced readability
- **Spacing System**: Consistent spacing based on manufacturing standards
- **Component Variants**: Pre-defined industrial component styles

### 📱 Responsive Grid System

- **IndustrialGrid**: Advanced responsive grid with container queries
- **IndustrialDashboardGrid**: Specialized grid for dashboard layouts
- **IndustrialTableGrid**: Optimized grid for data tables
- **Auto-responsive**: Automatic breakpoint detection and optimization

### ♿ Enhanced Accessibility

- **High Contrast Mode**: Industrial-grade contrast for harsh environments
- **Focus Management**: Enhanced focus indicators for safety-critical interfaces
- **Screen Reader Support**: Comprehensive announcements and landmarks
- **Emergency Controls**: Escape sequences for critical situations
- **Touch Targets**: Enhanced touch areas for industrial devices

### 🎭 Advanced Theming

- **Theme Provider**: Comprehensive theme management
- **System Preferences**: Auto-detection of user preferences
- **Local Storage**: Persistent theme settings
- **CSS Variables**: Dynamic theme switching

## 📦 Components

### Core Components

```tsx
import {
  IndustrialCard,
  IndustrialIcon,
  IndustrialInput,
  IndustrialButton,
} from '@/components/ui';
```

### Layout Components

```tsx
import {
  IndustrialLayout,
  IndustrialContainer,
  IndustrialHeader,
  IndustrialGrid,
} from '@/components/ui';
```

### Accessibility Components

```tsx
import {
  IndustrialAccessibilityProvider,
  IndustrialFocusManager,
  IndustrialAnnouncement,
  IndustrialSkipLinks,
} from '@/components/ui';
```

## 🛠 Setup

### 1. Install Dependencies

```bash
npm install framer-motion class-variance-authority clsx tailwind-merge
```

### 2. Configure Tailwind CSS

Update your `tailwind.config.js`:

```javascript
// Enhanced configuration is already included in the project
// See tailwind.config.ts for complete industrial setup
```

### 3. Wrap Your App

```tsx
import {
  IndustrialThemeProvider,
  IndustrialAccessibilityProvider,
} from '@/components/ui';

export default function App({ children }) {
  return (
    <IndustrialThemeProvider>
      <IndustrialAccessibilityProvider>
        {children}
      </IndustrialAccessibilityProvider>
    </IndustrialThemeProvider>
  );
}
```

## 🎯 Usage Examples

### Dashboard with Enhanced Grid

```tsx
import { IndustrialDashboardGrid } from '@/components/ui/industrial-grid-system';
import designTokens from '@/components/ui/industrial-design-tokens';

function Dashboard() {
  return (
    <IndustrialDashboardGrid
      layout="default"
      gap={designTokens.spacing['6']}
      className="w-full"
    >
      {/* Your dashboard cards */}
    </IndustrialDashboardGrid>
  );
}
```

### Accessible Form with Focus Management

```tsx
import { IndustrialFocusManager, IndustrialInput } from '@/components/ui';

function IndustrialForm() {
  return (
    <IndustrialFocusManager>
      <form className="space-y-4">
        <IndustrialInput
          placeholder="High priority field"
          data-focus-priority="high"
        />
        <IndustrialInput
          placeholder="Medium priority field"
          data-focus-priority="medium"
        />
      </form>
    </IndustrialFocusManager>
  );
}
```

### Theme-Aware Component

```tsx
import { useIndustrialTheme } from '@/components/ui/industrial-theme-provider';

function ThemeControls() {
  const { toggleHighContrast, preferences } = useIndustrialTheme();

  return (
    <button onClick={toggleHighContrast}>
      {preferences.highContrast ? 'Normal' : 'High'} Contrast
    </button>
  );
}
```

### Responsive Data Table

```tsx
import { IndustrialTableGrid } from '@/components/ui/industrial-grid-system';

function DataTable({ data }) {
  return (
    <IndustrialTableGrid
      headers={['Machine', 'Status', 'Efficiency']}
      responsive="auto"
      density="normal"
    >
      {data.map((item) => (
        <div key={item.id} className="contents">
          <div>{item.machine}</div>
          <div>{item.status}</div>
          <div>{item.efficiency}</div>
        </div>
      ))}
    </IndustrialTableGrid>
  );
}
```

## 🎨 Design Tokens

### Colors

```tsx
import designTokens from '@/components/ui/industrial-design-tokens';

// Access color tokens
const primaryColor = designTokens.colors.industrial.gunmetal[500];
const accentColor = designTokens.colors.industrial.accent;
const safetyColor = designTokens.colors.industrial.safety[400];
```

### Spacing

```tsx
// Access spacing tokens
const spacing = designTokens.spacing['4']; // 1rem
const gap = designTokens.spacing['6']; // 1.5rem
```

### Typography

```tsx
// Access typography tokens
const headingFont = designTokens.typography.fontFamily.heading;
const bodyFont = designTokens.typography.fontFamily.body;
```

## 📱 Responsive Breakpoints

The system includes enhanced responsive breakpoints:

```css
/* Default breakpoints */
xs: '320px'   /* Small mobile devices */
sm: '640px'   /* Mobile devices */
md: '768px'   /* Tablets */
lg: '1024px'  /* Laptops */
xl: '1280px'  /* Desktops */
2xl: '1536px' /* Large desktops */
3xl: '1920px' /* Ultra-wide displays */
```

## ♿ Accessibility Features

### Emergency Controls

- **Ctrl + Esc**: Emergency escape sequence
- **Focus Restoration**: Automatic focus management
- **High Contrast**: Industrial-grade contrast ratios

### Screen Reader Support

```tsx
import { useIndustrialAccessibility } from '@/components/ui/industrial-accessibility-enhanced';

function Component() {
  const { announceMessage } = useIndustrialAccessibility();

  const handleAction = () => {
    announceMessage('Action completed successfully', 'high');
  };
}
```

### Focus Management

```tsx
// Automatic focus priority
<IndustrialInput data-focus-priority="high" />
<IndustrialInput data-focus-priority="medium" />
<IndustrialInput data-focus-priority="low" />
```

## 🔧 Customization

### Theme Customization

```tsx
// Custom theme configuration
const customTheme = {
  colors: {
    primary: '#your-color',
    accent: '#your-accent',
  },
  spacing: {
    custom: '2.5rem',
  },
};
```

### Component Variants

```tsx
// Create custom component variants using CVA
const customVariants = cva('base-classes', {
  variants: {
    intent: {
      industrial: 'industrial-classes',
      custom: 'your-custom-classes',
    },
  },
});
```

## 🎭 Animation System

Enhanced animations with industrial easing:

```tsx
// Industrial easing curves
const industrialEasing = [0.25, 0.46, 0.45, 0.94];

// Staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};
```

## 📊 Performance

### Optimizations

- **Tree Shaking**: Only import what you need
- **CSS-in-JS**: Minimal runtime overhead
- **Container Queries**: Modern responsive design
- **Lazy Loading**: Components load on demand

### Bundle Size

- **Core Components**: ~15KB gzipped
- **Grid System**: ~8KB gzipped
- **Accessibility**: ~12KB gzipped
- **Theme Provider**: ~6KB gzipped

## 🔍 Testing

### Accessibility Testing

```bash
# Run accessibility tests
npm run test:a11y

# Check contrast ratios
npm run test:contrast

# Validate focus management
npm run test:focus
```

### Component Testing

```bash
# Test all components
npm run test:components

# Test responsive behavior
npm run test:responsive
```

## 📈 Roadmap

### Upcoming Features

- [ ] Advanced animation system
- [ ] Voice control integration
- [ ] AR/VR support for industrial environments
- [ ] Machine learning-based accessibility
- [ ] Multi-language support
- [ ] Advanced data visualization components

### Current Status

- [x] Core component library
- [x] Enhanced grid system
- [x] Advanced accessibility
- [x] Theme management
- [x] Design tokens
- [x] Responsive design
- [x] Documentation

## 🤝 Contributing

1. Follow the industrial design principles
2. Ensure all components meet WCAG 2.1 AA standards
3. Include comprehensive tests
4. Update documentation
5. Consider manufacturing environment constraints

## 📄 License

MIT License - Built for the WorkLink project

## 🆘 Support

For questions about the industrial design system:

1. Check the component documentation
2. Review the accessibility guidelines
3. Test in industrial environment simulators
4. Validate with real users in manufacturing settings

---

**Built with safety, accessibility, and industrial precision in mind.**

## Generated by AI
