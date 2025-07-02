'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IndustrialCard } from './industrial-card';
import { IndustrialIcon } from './industrial-icon';
import { IndustrialInput } from './industrial-input';
import { IndustrialBadge } from './industrial-badge';
import { IndustrialCheckbox } from './industrial-checkbox';
import { IndustrialHeading, IndustrialText } from './industrial-typography';
import { Button } from './button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

interface IndustrialDesignShowcaseProps {
  className?: string;
}

export function IndustrialDesignShowcase({ className = '' }: IndustrialDesignShowcaseProps) {
  return (
    <motion.div
      className={`p-6 bg-gunmetal-50 min-h-screen ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <IndustrialHeading level={1} className="mb-2">
          Industrial Design System
        </IndustrialHeading>
        <IndustrialText variant="secondary" className="text-gunmetal-600">
          A comprehensive showcase of our industrial-themed UI components
        </IndustrialText>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Cards Section */}
        <motion.div variants={itemVariants}>
          <IndustrialCard className="h-full">
            <div className="p-4">
              <IndustrialHeading level={3} className="mb-4 flex items-center gap-2">
                <IndustrialIcon icon="factory" size="sm" />
                Industrial Cards
              </IndustrialHeading>
              <div className="space-y-3">
                <IndustrialCard variant="steel" size="sm">
                  <div className="p-3">
                    <IndustrialText size="sm">
                      Steel variant card
                    </IndustrialText>
                  </div>
                </IndustrialCard>
                <IndustrialCard variant="dark" size="sm">
                  <div className="p-3">
                    <IndustrialText size="sm" className="text-white">
                      Dark variant card
                    </IndustrialText>
                  </div>
                </IndustrialCard>
              </div>
            </div>
          </IndustrialCard>
        </motion.div>

        {/* Icons Section */}
        <motion.div variants={itemVariants}>
          <IndustrialCard className="h-full">
            <div className="p-4">
              <IndustrialHeading level={3} className="mb-4 flex items-center gap-2">
                <IndustrialIcon icon="cog" size="sm" />
                Industrial Icons
              </IndustrialHeading>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <IndustrialIcon icon="factory" size="lg" className="mb-2" />
                  <IndustrialText size="sm">Factory</IndustrialText>
                </div>
                <div className="text-center">
                  <IndustrialIcon icon="hardhat" size="lg" className="mb-2" />
                  <IndustrialText size="sm">Hard Hat</IndustrialText>
                </div>
                <div className="text-center">
                  <IndustrialIcon icon="wrench" size="lg" className="mb-2" />
                  <IndustrialText size="sm">Wrench</IndustrialText>
                </div>
              </div>
            </div>
          </IndustrialCard>
        </motion.div>

        {/* Inputs Section */}
        <motion.div variants={itemVariants}>
          <IndustrialCard className="h-full">
            <div className="p-4">
              <IndustrialHeading level={3} className="mb-4 flex items-center gap-2">
                <IndustrialIcon icon="gear" size="sm" />
                Industrial Inputs
              </IndustrialHeading>
              <div className="space-y-3">
                <IndustrialInput
                  placeholder="Standard input"
                  variant="default"
                />
                <IndustrialInput
                  placeholder="Steel input"
                  variant="steel"
                />
                <IndustrialInput
                  placeholder="Accent input"
                  variant="accent"
                />
              </div>
            </div>
          </IndustrialCard>
        </motion.div>

        {/* Badges Section */}
        <motion.div variants={itemVariants}>
          <IndustrialCard className="h-full">
            <div className="p-4">
              <IndustrialHeading level={3} className="mb-4 flex items-center gap-2">
                <IndustrialIcon icon="bolt" size="sm" />
                Industrial Badges
              </IndustrialHeading>
              <div className="flex flex-wrap gap-2">
                <IndustrialBadge variant="default">Default</IndustrialBadge>
                <IndustrialBadge variant="accent">Accent</IndustrialBadge>
                <IndustrialBadge variant="steel">Steel</IndustrialBadge>
                <IndustrialBadge variant="success">Success</IndustrialBadge>
              </div>
            </div>
          </IndustrialCard>
        </motion.div>

        {/* Buttons Section */}
        <motion.div variants={itemVariants}>
          <IndustrialCard className="h-full">
            <div className="p-4">
              <IndustrialHeading level={3} className="mb-4">
                Industrial Buttons
              </IndustrialHeading>
              <div className="space-y-2">
                <Button variant="industrial-primary" size="sm" className="w-full">
                  Primary Button
                </Button>
                <Button variant="industrial-accent" size="sm" className="w-full">
                  Accent Button
                </Button>
                <Button variant="industrial-outline" size="sm" className="w-full">
                  Outline Button
                </Button>
              </div>
            </div>
          </IndustrialCard>
        </motion.div>

        {/* Form Controls Section */}
        <motion.div variants={itemVariants}>
          <IndustrialCard className="h-full">
            <div className="p-4">
              <IndustrialHeading level={3} className="mb-4">
                Form Controls
              </IndustrialHeading>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <IndustrialCheckbox id="demo-checkbox" />
                  <IndustrialText size="sm">Industrial Checkbox</IndustrialText>
                </div>
                <IndustrialInput 
                  type="email" 
                  placeholder="Enter your email"
                  variant="default"
                />
              </div>
            </div>
          </IndustrialCard>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default IndustrialDesignShowcase;
