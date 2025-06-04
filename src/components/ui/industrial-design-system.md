# WorkLink Industrial Design System

## Overview

This document outlines the comprehensive Industrial Design System for WorkLink, designed to create a modern and engaging interface that reflects industrial precision and reliability.

## Design Philosophy

### Theme: Industrial Precision

**Inspiration:** Industrial precision meets raw human effort

**Core Principles:**

- Clean, functional layouts that prioritize usability
- Strong contrast and readability for industrial environments
- Consistent use of safety colors for important actions
- Metal-inspired UI elements (buttons, cards, borders)
- Grid-based layouts reminiscent of industrial blueprints
- Subtle gear and machinery iconography where appropriate

## Color Palette

### Primary Colors

- **Gunmetal Grey**: `industrial-gunmetal-800` (#2C3E50) - Primary brand color
- **Navy Blue**: `industrial-navy-800` (#1E3A8A) - Secondary brand color
- **Safety Yellow**: `industrial-safety-300` (#FDE047) - Accent and call-to-action color

### Color Usage Guidelines

```typescript
// Primary actions and headers
bg-industrial-gunmetal-800 text-white

// Secondary actions and navigation
bg-industrial-navy-800 text-white

// Accent actions (Apply, Submit, Confirm)
bg-industrial-safety-300 text-industrial-gunmetal-900

// Neutral backgrounds
bg-industrial-gunmetal-50 text-industrial-gunmetal-800

// Danger actions
bg-red-600 text-white
```

## Typography

### Font Families

- **Headings**: `font-industrial-heading` (Oswald, Bebas Neue, Arial Black)
- **Body Text**: `font-industrial-body` (Inter, Roboto, system-ui)
- **Monospace**: `font-industrial-mono` (JetBrains Mono, Fira Code, Consolas)

### Font Scale

```typescript
text-industrial-xs    // 0.75rem, weight: 600
text-industrial-sm    // 0.875rem, weight: 600
text-industrial-base  // 1rem, weight: 500
text-industrial-lg    // 1.125rem, weight: 600
text-industrial-xl    // 1.25rem, weight: 700
text-industrial-2xl   // 1.5rem, weight: 700
text-industrial-3xl   // 1.875rem, weight: 800
text-industrial-4xl   // 2.25rem, weight: 800
```

## Components

### 1. Industrial Cards

#### Variants

- `industrial` - Light background with metal grid pattern
- `industrial-dark` - Dark gunmetal background
- `industrial-accent` - Gradient background with navy/gunmetal
- `industrial-highlight` - Safety yellow accent background

#### Usage

```tsx
<IndustrialCard variant="industrial" size="default">
  <IndustrialCardHeader>
    <IndustrialCardTitle>Card Title</IndustrialCardTitle>
    <IndustrialCardDescription>Card description</IndustrialCardDescription>
  </IndustrialCardHeader>
  <IndustrialCardContent>Content goes here</IndustrialCardContent>
</IndustrialCard>
```

### 2. Industrial Buttons

#### Variants

- `industrial-primary` - Gunmetal background
- `industrial-secondary` - Navy background
- `industrial-accent` - Safety yellow background
- `industrial-outline` - Transparent with gunmetal border
- `industrial-ghost` - Transparent with hover effects
- `industrial-danger` - Red background for destructive actions

#### Sizes

- `sm` - Small (32px height)
- `default` - Default (40px height)
- `lg` - Large (48px height)
- `xl` - Extra large (56px height)

#### Usage

```tsx
<Button variant="industrial-accent" size="lg">
  Apply Now
</Button>
```

### 3. Industrial Icons

#### Available Icons

- `gear` - Settings and configuration
- `wrench` - Tools and utilities
- `factory` - Manufacturing
- `hardhat` - Safety and workers
- `bolt` - Energy and action
- `circuit` - Technology and innovation

#### Properties

- `size`: xs, sm, md, lg, xl
- `animated`: boolean (adds rotation animation)
- `className`: additional CSS classes

#### Usage

```tsx
<IndustrialIcon
  icon="gear"
  size="lg"
  animated
  className="text-industrial-accent"
/>
```

### 4. Industrial Layout

#### Components

- `IndustrialLayout` - Main page wrapper
- `IndustrialContainer` - Content container with proper spacing
- `IndustrialHeader` - Styled page headers

#### Usage

```tsx
<IndustrialLayout>
  <IndustrialContainer>
    <IndustrialHeader level={1}>Page Title</IndustrialHeader>
    {/* Content */}
  </IndustrialContainer>
</IndustrialLayout>
```

### 5. Industrial Inputs

#### Variants

- `industrial` - Standard industrial styling
- `industrial-dark` - Dark theme variant

#### Usage

```tsx
<IndustrialInput
  variant="industrial"
  placeholder="Enter value"
  className="h-12"
/>
```

## Background Patterns

### Metal Grid Pattern

```css
bg-metal-grid
```

Creates a subtle grid pattern reminiscent of industrial blueprints.

### Brushed Steel Pattern

```css
bg-brushed-steel
```

Creates a brushed metal texture effect.

## Shadows

### Industrial Shadows

```css
shadow-industrial     // Standard industrial shadow
shadow-industrial-lg  // Large industrial shadow
shadow-safety        // Safety yellow glow
shadow-inset-steel   // Inset steel effect
```

## Animations

### Gear Animations

```css
animate-gear-rotate   // Continuous rotation (20s)
animate-gear-spin     // Fast spin (8s)
animate-gear-reverse  // Reverse rotation (8s)
```

### Utility Animations

```css
animate-bounce-subtle    // Gentle bounce effect
animate-pulse-glow      // Pulsing glow effect
animate-industrial-pulse // Industrial-themed pulse
```

## Implementation Guidelines

### 1. Component Structure

- Always use Industrial components for new features
- Maintain consistent spacing with `space-y-6` for sections
- Use `gap-4` for grid layouts
- Apply proper motion animations with stagger effects

### 2. Color Application

- Use safety yellow sparingly for important actions
- Gunmetal should dominate the interface
- Navy blue for secondary elements and navigation
- Maintain sufficient contrast for accessibility

### 3. Animation Principles

- Use subtle, purposeful animations
- Stagger animations for lists and grids
- Apply entrance animations to cards and modals
- Use gear animations sparingly for loading states

### 4. Responsive Design

- Use industrial grid system for layouts
- Maintain readability on all screen sizes
- Scale typography appropriately
- Ensure touch targets are adequate on mobile

## Accessibility

### Color Contrast

- All text meets WCAG AA standards
- Safety yellow provides high contrast against dark backgrounds
- Alternative styling for users with color vision deficiencies

### Interactive Elements

- Minimum 44px touch targets on mobile
- Clear focus indicators using industrial colors
- Keyboard navigation support
- Screen reader friendly markup

## Examples

### Dashboard Card

```tsx
<IndustrialCard variant="industrial" className="hover:shadow-industrial-lg">
  <IndustrialCardHeader>
    <div className="flex items-center gap-2">
      <IndustrialIcon icon="gear" size="sm" />
      <IndustrialCardTitle>Active Machines</IndustrialCardTitle>
    </div>
  </IndustrialCardHeader>
  <IndustrialCardContent>
    <div className="text-industrial-3xl font-bold text-industrial-gunmetal-800">
      24
    </div>
  </IndustrialCardContent>
</IndustrialCard>
```

### Action Button

```tsx
<Button variant="industrial-accent" size="lg" className="w-full">
  <IndustrialIcon icon="bolt" size="sm" />
  Apply to Machine
</Button>
```

### Form Layout

```tsx
<IndustrialCard variant="industrial">
  <IndustrialCardHeader>
    <IndustrialCardTitle>Machine Details</IndustrialCardTitle>
    <IndustrialCardDescription>
      Configure your machine settings
    </IndustrialCardDescription>
  </IndustrialCardHeader>
  <IndustrialCardContent className="space-y-4">
    <div>
      <Label className="text-industrial-gunmetal-700">Machine Name</Label>
      <IndustrialInput variant="industrial" placeholder="Enter name" />
    </div>
    <Button variant="industrial-primary" className="w-full">
      Save Configuration
    </Button>
  </IndustrialCardContent>
</IndustrialCard>
```

## Future Enhancements

1. **Advanced Animations**: Implement more sophisticated gear-based loading animations
2. **Dark Mode**: Extend industrial theme for dark mode compatibility
3. **Component Variants**: Add more specialized industrial components
4. **Pattern Library**: Expand background patterns with more industrial textures
5. **Iconography**: Custom industrial icon set for domain-specific elements

---

This design system ensures consistency across the WorkLink platform while maintaining the industrial aesthetic that builds trust with manufacturers and skilled tradespeople.
