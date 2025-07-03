'use client';

import React from 'react';
import { Button, ButtonProps } from './button';
import { IndustrialAnimatedElement } from './industrial-animation';
import { cn } from '@/lib/utils';
import { useIsClient } from '@/hooks/useClientUtils';

interface IndustrialButtonProps extends ButtonProps {
  animateOnHover?: boolean;
  animationType?: 'subtle' | 'moderate' | 'none';
}

/**
 * IndustrialButton Component
 *
 * Enhanced button component with consistent industrial animations
 * that complement the overall design language
 */
export const IndustrialButton = React.forwardRef<
  HTMLButtonElement,
  IndustrialButtonProps
>(
  (
    {
      className,
      variant,
      size,
      animateOnHover = true,
      animationType = 'subtle',
      children,
      ...props
    },
    ref
  ) => {
    // Use industrial variants as defaults
    const industrialVariant = variant?.startsWith('industrial-')
      ? variant
      : 'industrial-primary';

    // Check if we're on the client to avoid hydration issues
    const isClient = useIsClient();

    // Select appropriate animation based on type
    const getAnimation = () => {
      if (!animateOnHover || animationType === 'none' || !isClient)
        return children;

      return (
        <IndustrialAnimatedElement
          variant="button"
          animationType="hover"
          className="w-full h-full"
        >
          {children}
        </IndustrialAnimatedElement>
      );
    };

    return (
      <Button
        ref={ref}
        variant={industrialVariant as any}
        size={size}
        className={cn('overflow-hidden', className)}
        {...props}
      >
        {animateOnHover ? getAnimation() : children}
      </Button>
    );
  }
);

IndustrialButton.displayName = 'IndustrialButton';
