'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Industrial Skeleton Variants
const industrialSkeletonVariants = cva('animate-pulse rounded-md', {
  variants: {
    variant: {
      default: 'bg-muted',
      industrial:
        'bg-gradient-to-r from-industrial-gunmetal-100 via-industrial-gunmetal-200 to-industrial-gunmetal-100 bg-[length:200%_100%] animate-skeleton-shimmer',
      'industrial-dark':
        'bg-gradient-to-r from-industrial-gunmetal-800 via-industrial-gunmetal-700 to-industrial-gunmetal-800 bg-[length:200%_100%] animate-skeleton-shimmer',
      'industrial-accent':
        'bg-gradient-to-r from-industrial-navy-100 via-industrial-navy-200 to-industrial-navy-100 bg-[length:200%_100%] animate-skeleton-shimmer',
      steel:
        'bg-gradient-to-r from-industrial-gunmetal-50 via-industrial-gunmetal-150 to-industrial-gunmetal-50 bg-[length:200%_100%] animate-skeleton-shimmer border border-industrial-gunmetal-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface IndustrialSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof industrialSkeletonVariants> {}

const IndustrialSkeleton = React.forwardRef<
  HTMLDivElement,
  IndustrialSkeletonProps
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(industrialSkeletonVariants({ variant }), className)}
      {...props}
    />
  );
});
IndustrialSkeleton.displayName = 'IndustrialSkeleton';

// Pre-built skeleton components for common use cases
interface IndustrialSkeletonTextProps extends IndustrialSkeletonProps {
  lines?: number;
  width?: 'full' | 'half' | 'quarter' | 'three-quarters';
}

const IndustrialSkeletonText = React.forwardRef<
  HTMLDivElement,
  IndustrialSkeletonTextProps
>(
  (
    { lines = 1, width = 'full', variant = 'industrial', className, ...props },
    ref
  ) => {
    const widthClasses = {
      full: 'w-full',
      half: 'w-1/2',
      quarter: 'w-1/4',
      'three-quarters': 'w-3/4',
    };

    if (lines === 1) {
      return (
        <IndustrialSkeleton
          ref={ref}
          variant={variant}
          className={cn('h-4', widthClasses[width], className)}
          {...props}
        />
      );
    }

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }, (_, i) => (
          <IndustrialSkeleton
            key={i}
            variant={variant}
            className={cn(
              'h-4',
              i === lines - 1 ? widthClasses[width] : 'w-full'
            )}
          />
        ))}
      </div>
    );
  }
);
IndustrialSkeletonText.displayName = 'IndustrialSkeletonText';

interface IndustrialSkeletonCardProps extends IndustrialSkeletonProps {
  showHeader?: boolean;
  showFooter?: boolean;
  contentLines?: number;
}

const IndustrialSkeletonCard = React.forwardRef<
  HTMLDivElement,
  IndustrialSkeletonCardProps
>(
  (
    {
      showHeader = true,
      showFooter = true,
      contentLines = 3,
      variant = 'industrial',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'p-6 border border-industrial-gunmetal-200 rounded-lg bg-white shadow-industrial-sm',
          className
        )}
        {...props}
      >
        {showHeader && (
          <div className="space-y-2 mb-4">
            <IndustrialSkeleton variant={variant} className="h-6 w-3/4" />
            <IndustrialSkeleton variant={variant} className="h-4 w-1/2" />
          </div>
        )}

        <div className="space-y-2">
          {Array.from({ length: contentLines }, (_, i) => (
            <IndustrialSkeleton
              key={i}
              variant={variant}
              className={cn('h-4', i === contentLines - 1 ? 'w-2/3' : 'w-full')}
            />
          ))}
        </div>

        {showFooter && (
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-industrial-gunmetal-200">
            <IndustrialSkeleton variant={variant} className="h-8 w-20" />
            <IndustrialSkeleton variant={variant} className="h-8 w-16" />
          </div>
        )}
      </div>
    );
  }
);
IndustrialSkeletonCard.displayName = 'IndustrialSkeletonCard';

interface IndustrialSkeletonTableProps extends IndustrialSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

const IndustrialSkeletonTable = React.forwardRef<
  HTMLDivElement,
  IndustrialSkeletonTableProps
>(
  (
    {
      rows = 5,
      columns = 4,
      showHeader = true,
      variant = 'industrial',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'border border-industrial-gunmetal-200 rounded-lg overflow-hidden bg-white',
          className
        )}
        {...props}
      >
        {showHeader && (
          <div
            className="grid gap-4 p-4 border-b border-industrial-gunmetal-200 bg-industrial-gunmetal-50"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }, (_, i) => (
              <IndustrialSkeleton key={i} variant={variant} className="h-5" />
            ))}
          </div>
        )}

        <div className="divide-y divide-industrial-gunmetal-100">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-4 p-4"
              style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            >
              {Array.from({ length: columns }, (_, colIndex) => (
                <IndustrialSkeleton
                  key={colIndex}
                  variant={variant}
                  className="h-4"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
IndustrialSkeletonTable.displayName = 'IndustrialSkeletonTable';

interface IndustrialSkeletonListProps extends IndustrialSkeletonProps {
  items?: number;
  showAvatar?: boolean;
  showActions?: boolean;
}

const IndustrialSkeletonList = React.forwardRef<
  HTMLDivElement,
  IndustrialSkeletonListProps
>(
  (
    {
      items = 5,
      showAvatar = true,
      showActions = true,
      variant = 'industrial',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn('space-y-4', className)} {...props}>
        {Array.from({ length: items }, (_, i) => (
          <div key={i} className="flex items-center space-x-4">
            {showAvatar && (
              <IndustrialSkeleton
                variant={variant}
                className="h-10 w-10 rounded-full"
              />
            )}

            <div className="flex-1 space-y-2">
              <IndustrialSkeleton variant={variant} className="h-4 w-1/2" />
              <IndustrialSkeleton variant={variant} className="h-3 w-3/4" />
            </div>

            {showActions && (
              <div className="flex space-x-2">
                <IndustrialSkeleton variant={variant} className="h-8 w-16" />
                <IndustrialSkeleton variant={variant} className="h-8 w-16" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
);
IndustrialSkeletonList.displayName = 'IndustrialSkeletonList';

interface IndustrialSkeletonFormProps extends IndustrialSkeletonProps {
  fields?: number;
  showSubmitButton?: boolean;
}

const IndustrialSkeletonForm = React.forwardRef<
  HTMLDivElement,
  IndustrialSkeletonFormProps
>(
  (
    {
      fields = 4,
      showSubmitButton = true,
      variant = 'industrial',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn('space-y-6', className)} {...props}>
        {Array.from({ length: fields }, (_, i) => (
          <div key={i} className="space-y-2">
            <IndustrialSkeleton variant={variant} className="h-4 w-24" />
            <IndustrialSkeleton variant={variant} className="h-10 w-full" />
          </div>
        ))}

        {showSubmitButton && (
          <div className="pt-4">
            <IndustrialSkeleton variant={variant} className="h-10 w-32" />
          </div>
        )}
      </div>
    );
  }
);
IndustrialSkeletonForm.displayName = 'IndustrialSkeletonForm';

// Industrial Page Loading Skeleton
interface IndustrialSkeletonPageProps extends IndustrialSkeletonProps {
  showSidebar?: boolean;
  showHeader?: boolean;
}

const IndustrialSkeletonPage = React.forwardRef<
  HTMLDivElement,
  IndustrialSkeletonPageProps
>(
  (
    {
      showSidebar = true,
      showHeader = true,
      variant = 'industrial',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('min-h-screen bg-industrial-background', className)}
        {...props}
      >
        {showHeader && (
          <div className="border-b border-industrial-border p-4 bg-white">
            <div className="flex items-center justify-between">
              <IndustrialSkeleton variant={variant} className="h-8 w-48" />
              <div className="flex space-x-4">
                <IndustrialSkeleton
                  variant={variant}
                  className="h-8 w-8 rounded-full"
                />
                <IndustrialSkeleton variant={variant} className="h-8 w-24" />
              </div>
            </div>
          </div>
        )}

        <div className="flex">
          {showSidebar && (
            <div className="w-64 border-r border-industrial-border bg-white p-4">
              <div className="space-y-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <IndustrialSkeleton
                    key={i}
                    variant={variant}
                    className="h-8 w-full"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 p-6">
            <div className="space-y-6">
              <IndustrialSkeleton variant={variant} className="h-12 w-2/3" />
              <IndustrialSkeletonCard variant={variant} />
              <IndustrialSkeletonCard variant={variant} showFooter={false} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
IndustrialSkeletonPage.displayName = 'IndustrialSkeletonPage';

export {
  IndustrialSkeleton,
  IndustrialSkeletonText,
  IndustrialSkeletonCard,
  IndustrialSkeletonTable,
  IndustrialSkeletonList,
  IndustrialSkeletonForm,
  IndustrialSkeletonPage,
};
