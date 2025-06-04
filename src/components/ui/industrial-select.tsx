'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Industrial Select Variants
const industrialSelectTriggerVariants = cva(
  'flex h-12 w-full items-center justify-between whitespace-nowrap rounded-md border px-4 py-3 text-sm font-industrial-body shadow-industrial-sm ring-offset-background transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
  {
    variants: {
      variant: {
        default: 'border-input bg-background text-foreground focus:ring-ring',
        industrial:
          'border-industrial-gunmetal-300 bg-white text-industrial-gunmetal-800 hover:border-industrial-gunmetal-400 focus:ring-industrial-safety-300 focus:border-industrial-safety-300 data-[placeholder]:text-industrial-gunmetal-500',
        'industrial-dark':
          'border-industrial-gunmetal-600 bg-industrial-gunmetal-900 text-white hover:border-industrial-gunmetal-500 focus:ring-industrial-safety-300 focus:border-industrial-safety-300',
        'industrial-accent':
          'border-industrial-navy-300 bg-industrial-navy-50 text-industrial-navy-800 hover:border-industrial-navy-400 focus:ring-industrial-safety-300 focus:border-industrial-safety-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const industrialSelectContentVariants = cva(
  'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-industrial-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      variant: {
        default: 'bg-popover text-popover-foreground border-border',
        industrial:
          'bg-white border-industrial-gunmetal-300 text-industrial-gunmetal-800',
        'industrial-dark':
          'bg-industrial-gunmetal-900 border-industrial-gunmetal-600 text-white',
        'industrial-accent':
          'bg-industrial-navy-50 border-industrial-navy-300 text-industrial-navy-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const industrialSelectItemVariants = cva(
  'relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  {
    variants: {
      variant: {
        default: 'focus:bg-accent',
        industrial:
          'text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-50 focus:bg-industrial-gunmetal-50 data-[state=checked]:bg-industrial-safety-50 data-[state=checked]:text-industrial-gunmetal-900',
        'industrial-dark':
          'text-white hover:bg-industrial-gunmetal-800 focus:bg-industrial-gunmetal-800 data-[state=checked]:bg-industrial-safety-300 data-[state=checked]:text-industrial-gunmetal-900',
        'industrial-accent':
          'text-industrial-navy-800 hover:bg-industrial-navy-100 focus:bg-industrial-navy-100 data-[state=checked]:bg-industrial-safety-50 data-[state=checked]:text-industrial-navy-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Basic Select Components (unchanged)
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

// Industrial Select Components
interface IndustrialSelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof industrialSelectTriggerVariants> {}

const IndustrialSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  IndustrialSelectTriggerProps
>(({ className, children, variant, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(industrialSelectTriggerVariants({ variant }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
IndustrialSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

interface IndustrialSelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    VariantProps<typeof industrialSelectContentVariants> {
  position?: 'item-aligned' | 'popper';
}

const IndustrialSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  IndustrialSelectContentProps
>(({ className, children, position = 'popper', variant, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        industrialSelectContentVariants({ variant }),
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
IndustrialSelectContent.displayName = SelectPrimitive.Content.displayName;

const IndustrialSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'py-1.5 pl-8 pr-2 text-sm font-semibold text-industrial-gunmetal-700',
      className
    )}
    {...props}
  />
));
IndustrialSelectLabel.displayName = SelectPrimitive.Label.displayName;

interface IndustrialSelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
    VariantProps<typeof industrialSelectItemVariants> {}

const IndustrialSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  IndustrialSelectItemProps
>(({ className, children, variant, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(industrialSelectItemVariants({ variant }), className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
IndustrialSelectItem.displayName = SelectPrimitive.Item.displayName;

const IndustrialSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-industrial-gunmetal-200', className)}
    {...props}
  />
));
IndustrialSelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  IndustrialSelectTrigger,
  IndustrialSelectContent,
  IndustrialSelectLabel,
  IndustrialSelectItem,
  IndustrialSelectSeparator,
};
