'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Animation variants for industrial-themed elements
 */
export const industrialAnimationVariants = {
  // Hover animations
  hover: {
    icon: {
      rest: { scale: 1, rotate: 0 },
      hover: {
        scale: 1.1,
        rotate: 15,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
    },
    card: {
      rest: { scale: 1, y: 0 },
      hover: {
        scale: 1.02,
        y: -5,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
    },
    button: {
      rest: { scale: 1 },
      hover: { scale: 1.05, transition: { duration: 0.2, ease: 'easeOut' } },
    },
  },

  // Ambient animations (subtle, continuous)
  ambient: {
    gear: {
      // Very subtle gear rotation that doesn't distract
      animate: { rotate: [0, 3, 0, -3, 0] },
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: [0.45, 0.05, 0.55, 0.95], // Smooth industrial easing
      },
    },
    pulse: {
      animate: { opacity: [0.8, 1, 0.8] },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    indicator: {
      animate: { x: [0, 3, 0] },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },

  // Entry animations
  entry: {
    fadeUp: {
      initial: { opacity: 0, y: 15 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.4 },
    },
    stagger: {
      container: {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      },
      item: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
      },
    },
  },
};

interface IndustrialAnimatedElementProps {
  children: React.ReactNode;
  variant?:
    | 'gear'
    | 'pulse'
    | 'indicator'
    | 'fadeUp'
    | 'fadeIn'
    | 'card'
    | 'button'
    | 'icon'
    | 'staggerItem'
    | 'staggerContainer'
    | 'custom';
  animationType?: 'ambient' | 'hover' | 'entry' | 'none';
  hoverAnimation?: boolean;
  className?: string;
  containerProps?: Record<string, any>;
  custom?: {
    animate?: any;
    transition?: any;
    initial?: any;
    whileHover?: any;
    variants?: any;
  };
}

/**
 * IndustrialAnimatedElement Component
 *
 * A component that applies cohesive industrial-themed animations with:
 * - Consistent behavior patterns
 * - Animation types that complement each other
 * - Options for ambient, hover, and entry animations
 * - Reduced intensity for better UX
 */
export const IndustrialAnimatedElement = ({
  children,
  variant = 'fadeIn',
  animationType = 'entry',
  hoverAnimation = false,
  className,
  containerProps,
  custom,
}: IndustrialAnimatedElementProps) => {
  // For hover animations
  const [isHovered, setIsHovered] = useState(false);

  // Handle different animation variants
  let animationProps = {};

  if (variant === 'custom' && custom) {
    animationProps = custom;
  } else if (animationType === 'ambient') {
    // Ambient animations (subtle continuous)
    switch (variant) {
      case 'gear':
        animationProps = {
          animate: industrialAnimationVariants.ambient.gear.animate,
          transition: industrialAnimationVariants.ambient.gear.transition,
        };
        break;
      case 'pulse':
        animationProps = {
          animate: industrialAnimationVariants.ambient.pulse.animate,
          transition: industrialAnimationVariants.ambient.pulse.transition,
        };
        break;
      case 'indicator':
        animationProps = {
          animate: industrialAnimationVariants.ambient.indicator.animate,
          transition: industrialAnimationVariants.ambient.indicator.transition,
        };
        break;
      default:
        break;
    }
  } else if (animationType === 'entry') {
    // Entry animations
    switch (variant) {
      case 'fadeUp':
        animationProps = industrialAnimationVariants.entry.fadeUp;
        break;
      case 'fadeIn':
        animationProps = industrialAnimationVariants.entry.fadeIn;
        break;
      case 'staggerItem':
        animationProps = industrialAnimationVariants.entry.stagger.item;
        break;
      default:
        animationProps = industrialAnimationVariants.entry.fadeIn;
    }
  } else if (animationType === 'hover' || hoverAnimation) {
    // Hover animations
    switch (variant) {
      case 'icon':
        animationProps = {
          initial: 'rest',
          animate: isHovered ? 'hover' : 'rest',
          variants: industrialAnimationVariants.hover.icon,
        };
        break;
      case 'card':
        animationProps = {
          initial: 'rest',
          animate: isHovered ? 'hover' : 'rest',
          variants: industrialAnimationVariants.hover.card,
        };
        break;
      case 'button':
        animationProps = {
          initial: 'rest',
          animate: isHovered ? 'hover' : 'rest',
          variants: industrialAnimationVariants.hover.button,
        };
        break;
      default:
        break;
    }
  }

  // Container for staggered animations
  if (variant === 'staggerContainer') {
    return (
      <motion.div
        className={className}
        initial="initial"
        animate="animate"
        variants={industrialAnimationVariants.entry.stagger.container}
        {...containerProps}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      {...animationProps}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  );
};
