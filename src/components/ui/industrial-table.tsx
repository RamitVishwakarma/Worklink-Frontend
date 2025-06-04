'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { IndustrialIcon } from './industrial-icon';

const industrialTableVariants = cva('w-full border-collapse', {
  variants: {
    variant: {
      default: 'bg-white',
      steel: 'bg-industrial-gunmetal-50 metal-texture',
      dark: 'bg-industrial-gunmetal-900 text-white',
      striped:
        'bg-white [&_tbody_tr:nth-child(even)]:bg-industrial-gunmetal-50',
    },
    size: {
      default: '[&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3',
      sm: '[&_th]:px-2 [&_th]:py-2 [&_td]:px-2 [&_td]:py-2',
      lg: '[&_th]:px-6 [&_th]:py-4 [&_td]:px-6 [&_td]:py-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface IndustrialTableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof industrialTableVariants> {
  containerClassName?: string;
}

const IndustrialTable = React.forwardRef<
  HTMLTableElement,
  IndustrialTableProps
>(({ className, variant, size, containerClassName, ...props }, ref) => {
  return (
    <div
      className={cn(
        'relative w-full overflow-auto border border-industrial-border rounded-industrial',
        containerClassName
      )}
    >
      <table
        ref={ref}
        className={cn(industrialTableVariants({ variant, size }), className)}
        {...props}
      />
    </div>
  );
});
IndustrialTable.displayName = 'IndustrialTable';

const IndustrialTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'border-b border-industrial-border bg-industrial-gunmetal-800 text-white',
      '[&_tr]:border-b',
      className
    )}
    {...props}
  />
));
IndustrialTableHeader.displayName = 'IndustrialTableHeader';

const IndustrialTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
IndustrialTableBody.displayName = 'IndustrialTableBody';

const IndustrialTableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t border-industrial-border bg-industrial-gunmetal-100 font-medium text-industrial-gunmetal-800',
      '[&_tr]:last:border-b-0',
      className
    )}
    {...props}
  />
));
IndustrialTableFooter.displayName = 'IndustrialTableFooter';

const IndustrialTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-industrial-border transition-colors hover:bg-industrial-muted/50 data-[state=selected]:bg-industrial-muted',
      className
    )}
    {...props}
  />
));
IndustrialTableRow.displayName = 'IndustrialTableRow';

const IndustrialTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
    onSort?: () => void;
  }
>(({ className, sortable, sortDirection, onSort, children, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'text-left align-middle font-bold text-white',
      sortable && 'cursor-pointer hover:bg-industrial-gunmetal-700 select-none',
      className
    )}
    onClick={sortable ? onSort : undefined}
    {...props}
  >
    <div className="flex items-center gap-2">
      {children}
      {sortable && (
        <IndustrialIcon
          icon={
            sortDirection === 'asc'
              ? 'chevron-up'
              : sortDirection === 'desc'
                ? 'chevron-down'
                : 'chevrons-up-down'
          }
          size="xs"
          className="text-industrial-safety-300"
        />
      )}
    </div>
  </th>
));
IndustrialTableHead.displayName = 'IndustrialTableHead';

const IndustrialTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'align-middle text-industrial-foreground [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
IndustrialTableCell.displayName = 'IndustrialTableCell';

const IndustrialTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-industrial-muted-foreground', className)}
    {...props}
  />
));
IndustrialTableCaption.displayName = 'IndustrialTableCaption';

// Utility component for empty states
const IndustrialTableEmpty = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    colSpan: number;
    icon?: string;
    message?: string;
  }
>(
  (
    {
      className,
      colSpan,
      icon = 'database',
      message = 'No data available',
      ...props
    },
    ref
  ) => (
    <IndustrialTableRow ref={ref} className={cn(className)} {...props}>
      <IndustrialTableCell colSpan={colSpan} className="h-32 text-center">
        <div className="flex flex-col items-center gap-2">
          <IndustrialIcon
            icon={icon}
            size="xl"
            className="text-industrial-muted-foreground"
          />
          <p className="text-sm text-industrial-muted-foreground">{message}</p>
        </div>
      </IndustrialTableCell>
    </IndustrialTableRow>
  )
);
IndustrialTableEmpty.displayName = 'IndustrialTableEmpty';

export {
  IndustrialTable,
  IndustrialTableHeader,
  IndustrialTableBody,
  IndustrialTableFooter,
  IndustrialTableHead,
  IndustrialTableRow,
  IndustrialTableCell,
  IndustrialTableCaption,
  IndustrialTableEmpty,
};
