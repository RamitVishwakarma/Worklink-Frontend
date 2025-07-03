'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IndustrialText } from './industrial-text';

interface IndustrialPageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * IndustrialPageHeader Component
 *
 * A consistent page header component with proper contrast
 * for industrial-themed pages
 */
export const IndustrialPageHeader = ({
  title,
  description,
  className,
  children,
}: IndustrialPageHeaderProps) => {
  return (
    <div className={cn('mb-8', className)}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-industrial-gunmetal-800 mb-2">
          <IndustrialText>{title}</IndustrialText>
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-industrial-gunmetal-600 max-w-3xl"
          >
            {description}
          </motion.p>
        )}
      </motion.div>

      {children && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};
