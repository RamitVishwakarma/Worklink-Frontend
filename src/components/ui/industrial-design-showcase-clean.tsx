'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  IndustrialCard,
  IndustrialCardContent,
  IndustrialCardDescription,
  IndustrialCardHeader,
  IndustrialCardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  IndustrialLayout,
  IndustrialContainer,
  IndustrialHeader,
} from '@/components/ui/industrial-layout';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { IndustrialInput } from '@/components/ui/input';
import { IndustrialDashboardGrid } from '@/components/ui/industrial-grid-system';
import { IndustrialAccessibilityProvider, useIndustrialAccessibility } from '@/components/ui/industrial-accessibility-enhanced';
import { IndustrialThemeProvider, useIndustrialTheme } from '@/components/ui/industrial-theme-provider';
import designTokens from '@/components/ui/industrial-design-tokens';

// Sample data for demonstration
const demoStats = [
  { 
    id: 1, 
    title: 'Active Machines', 
    value: '47', 
    change: '+12%', 
    icon: 'factory', 
    description: 'Currently operational'
  },
  { 
    id: 2, 
    title: 'Applications', 
    value: '156', 
    change: '+8%', 
    icon: 'wrench', 
    description: 'Pending reviews'
  },
  { 
    id: 3, 
    title: 'Workers', 
    value: '23', 
    change: '+3%', 
    icon: 'hardhat', 
    description: 'Active employees'
  },
  { 
    id: 4, 
    title: 'Efficiency', 
    value: '94%', 
    change: '+2%', 
    icon: 'cog', 
    description: 'Overall performance'
  },
];

// Animation variants
const showcaseContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.12,
    },
  },
};

const showcaseItemVariants = {
  hidden: { opacity: 0, y: 20, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Theme Controls Component
const ShowcaseThemeControls: React.FC = () => {
  const { toggleHighContrast, toggleReducedMotion } = useIndustrialTheme();
  
  return (
    <IndustrialCard variant="industrial" className="mb-6">
      <IndustrialCardHeader>
        <IndustrialCardTitle className="flex items-center gap-2">
          <IndustrialIcon icon="cog" size="sm" className="text-industrial-accent" />
          Theme Controls
        </IndustrialCardTitle>
        <IndustrialCardDescription>
          Customize the industrial design system experience
        </IndustrialCardDescription>
      </IndustrialCardHeader>
      <IndustrialCardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="industrial-accent"
            onClick={toggleHighContrast}
            className="w-full"
          >
            Toggle High Contrast
          </Button>
          <Button
            variant="industrial-outline"
            onClick={toggleReducedMotion}
            className="w-full"
          >
            Toggle Reduced Motion
          </Button>
        </div>
      </IndustrialCardContent>
    </IndustrialCard>
  );
};

// Accessibility Demo Component
const ShowcaseAccessibilityDemo: React.FC = () => {
  const { highContrast, toggleHighContrast } = useIndustrialAccessibility();
  
  return (
    <IndustrialCard variant="industrial" className="mb-6">
      <IndustrialCardHeader>
        <IndustrialCardTitle className="flex items-center gap-2">
          <IndustrialIcon icon="hardhat" size="sm" className="text-industrial-safety-500" />
          Accessibility Features
        </IndustrialCardTitle>
        <IndustrialCardDescription>
          Industrial-grade accessibility for manufacturing environments
        </IndustrialCardDescription>
      </IndustrialCardHeader>
      <IndustrialCardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Badge variant={highContrast ? "industrial-accent" : "industrial-secondary"}>
              High Contrast: {highContrast ? 'ON' : 'OFF'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="industrial-outline"
              onClick={toggleHighContrast}
            >
              Toggle High Contrast
            </Button>
            <Button
              variant="industrial-secondary"
              disabled
            >
              Enhanced Focus Mode
            </Button>
          </div>
          
          <p className="text-sm text-industrial-muted-foreground">
            Industrial accessibility features including enhanced contrast and focus management.
          </p>
        </div>
      </IndustrialCardContent>
    </IndustrialCard>
  );
};

// Main showcase component
export const IndustrialDesignShowcase: React.FC = () => {
  return (
    <IndustrialThemeProvider>
      <IndustrialAccessibilityProvider>
        <IndustrialLayout>
          <IndustrialContainer>
            <motion.div
              variants={showcaseContainerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Header */}
              <motion.div variants={showcaseItemVariants} className="text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="inline-flex items-center gap-3 mb-4"
                >
                  <div className="p-3 bg-gradient-to-br from-industrial-accent/20 to-industrial-accent/10 rounded-xl border border-industrial-accent/30">
                    <IndustrialIcon icon="factory" size="xl" className="text-industrial-accent" />
                  </div>
                </motion.div>
                
                <IndustrialHeader level={1} className="mb-4">
                  Industrial Design System Showcase
                </IndustrialHeader>
                
                <p className="text-industrial-muted-foreground max-w-2xl mx-auto">
                  Experience the complete industrial design system with enhanced accessibility, 
                  responsive grids, and comprehensive theming built for manufacturing environments.
                </p>
              </motion.div>

              {/* Theme Controls */}
              <motion.div variants={showcaseItemVariants}>
                <ShowcaseThemeControls />
              </motion.div>

              {/* Accessibility Demo */}
              <motion.div variants={showcaseItemVariants}>
                <ShowcaseAccessibilityDemo />
              </motion.div>

              {/* Dashboard Grid Demo */}
              <motion.div variants={showcaseItemVariants}>
                <IndustrialCard variant="industrial">
                  <IndustrialCardHeader>
                    <IndustrialCardTitle className="flex items-center gap-2">
                      <IndustrialIcon icon="cog" size="sm" className="text-industrial-accent" />
                      Dashboard Grid System
                    </IndustrialCardTitle>
                    <IndustrialCardDescription>
                      Responsive industrial dashboard layout with enhanced grid system
                    </IndustrialCardDescription>
                  </IndustrialCardHeader>
                  <IndustrialCardContent>
                    <IndustrialDashboardGrid
                      layout="default"
                      gap={designTokens.spacing['4']}
                      className="mb-6"
                    >
                      {demoStats.map((stat, index) => (
                        <motion.div
                          key={stat.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <IndustrialCard variant="industrial" className="relative overflow-hidden border-l-4 border-l-industrial-accent">
                            <IndustrialCardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-industrial-muted-foreground">
                                    {stat.title}
                                  </p>
                                  <p className="text-2xl font-bold text-industrial-foreground mt-1">
                                    {stat.value}
                                  </p>
                                  <p className="text-xs text-industrial-muted-foreground mt-1">
                                    {stat.description}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <IndustrialIcon
                                    icon={stat.icon as any}
                                    size="lg"
                                    className="text-industrial-accent mb-2"
                                  />
                                  <Badge variant="industrial-secondary" className="text-xs">
                                    {stat.change}
                                  </Badge>
                                </div>
                              </div>
                            </IndustrialCardContent>
                          </IndustrialCard>
                        </motion.div>
                      ))}
                    </IndustrialDashboardGrid>
                  </IndustrialCardContent>
                </IndustrialCard>
              </motion.div>

              {/* Design Tokens Demo */}
              <motion.div variants={showcaseItemVariants}>
                <IndustrialCard variant="industrial">
                  <IndustrialCardHeader>
                    <IndustrialCardTitle className="flex items-center gap-2">
                      <IndustrialIcon icon="gear" size="sm" className="text-industrial-accent" />
                      Design Tokens
                    </IndustrialCardTitle>
                    <IndustrialCardDescription>
                      Centralized design system tokens and values
                    </IndustrialCardDescription>
                  </IndustrialCardHeader>
                  <IndustrialCardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Colors */}
                      <div>
                        <h4 className="font-semibold text-industrial-foreground mb-3">Colors</h4>
                        <div className="space-y-2">
                          {Object.entries(designTokens.colors.gunmetal).slice(0, 4).map(([shade, value]) => (
                            <div key={shade} className="flex items-center gap-3">
                              <div
                                className="w-6 h-6 rounded border border-industrial-border"
                                style={{ backgroundColor: value as string }}
                              />
                              <span className="text-sm text-industrial-muted-foreground">
                                gunmetal-{shade}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Typography */}
                      <div>
                        <h4 className="font-semibold text-industrial-foreground mb-3">Typography</h4>
                        <div className="space-y-2">
                          <div className="text-xs text-industrial-muted-foreground">Extra Small</div>
                          <div className="text-sm text-industrial-muted-foreground">Small</div>
                          <div className="text-base text-industrial-foreground">Base</div>
                          <div className="text-lg text-industrial-foreground font-semibold">Large</div>
                        </div>
                      </div>

                      {/* Spacing */}
                      <div>
                        <h4 className="font-semibold text-industrial-foreground mb-3">Spacing</h4>
                        <div className="space-y-2">
                          {Object.entries(designTokens.spacing).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-3">
                              <div
                                className="bg-industrial-accent/20 border border-industrial-accent/30"
                                style={{ width: value as string, height: '8px' }}
                              />
                              <span className="text-sm text-industrial-muted-foreground">
                                {key}: {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </IndustrialCardContent>
                </IndustrialCard>
              </motion.div>

              {/* Enhanced Input Demo */}
              <motion.div variants={showcaseItemVariants}>
                <IndustrialCard variant="industrial">
                  <IndustrialCardHeader>
                    <IndustrialCardTitle className="flex items-center gap-2">
                      <IndustrialIcon icon="hardhat" size="sm" className="text-industrial-safety-500" />
                      Enhanced Inputs
                    </IndustrialCardTitle>
                    <IndustrialCardDescription>
                      Industrial-grade input components with enhanced accessibility
                    </IndustrialCardDescription>
                  </IndustrialCardHeader>
                  <IndustrialCardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <IndustrialInput
                        placeholder="Machine ID"
                        className="industrial-focus"
                      />
                      <IndustrialInput
                        placeholder="Operator Name"
                        className="industrial-focus"
                      />
                      <IndustrialInput
                        placeholder="Safety Code"
                        className="industrial-focus"
                      />
                    </div>
                    <p className="text-sm text-industrial-muted-foreground mt-4">
                      Tab through the inputs above to experience enhanced focus management with industrial-grade visibility.
                    </p>
                  </IndustrialCardContent>
                </IndustrialCard>
              </motion.div>
            </motion.div>
          </IndustrialContainer>
        </IndustrialLayout>
      </IndustrialAccessibilityProvider>
    </IndustrialThemeProvider>
  );
};

export default IndustrialDesignShowcase;
