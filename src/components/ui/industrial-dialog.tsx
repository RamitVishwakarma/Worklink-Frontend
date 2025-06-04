'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { IndustrialIcon } from './industrial-icon';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

const IndustrialDialog = DialogPrimitive.Root;

const IndustrialDialogTrigger = DialogPrimitive.Trigger;

const IndustrialDialogPortal = DialogPrimitive.Portal;

const IndustrialDialogClose = DialogPrimitive.Close;

const IndustrialDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-industrial-gunmetal-900/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
IndustrialDialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const industrialDialogVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-industrial-border p-6 shadow-industrial-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
  {
    variants: {
      variant: {
        default: 'bg-white text-industrial-gunmetal-800',
        steel:
          'bg-industrial-gunmetal-100 text-industrial-gunmetal-800 metal-texture',
        dark: 'bg-industrial-gunmetal-900 text-white border-industrial-gunmetal-600',
        accent:
          'bg-industrial-safety-50 text-industrial-gunmetal-900 border-industrial-safety-300',
      },
      size: {
        default: 'max-w-lg',
        sm: 'max-w-sm',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw] max-h-[95vh]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface IndustrialDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof industrialDialogVariants> {
  showCloseButton?: boolean;
}

const IndustrialDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  IndustrialDialogContentProps
>(
  (
    { className, variant, size, showCloseButton = true, children, ...props },
    ref
  ) => (
    <IndustrialDialogPortal>
      <IndustrialDialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(industrialDialogVariants({ variant, size }), className)}
        {...props}
      >
        {children}{' '}
        {showCloseButton && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-industrial-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X size={16} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </IndustrialDialogPortal>
  )
);
IndustrialDialogContent.displayName = DialogPrimitive.Content.displayName;

const IndustrialDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
IndustrialDialogHeader.displayName = 'IndustrialDialogHeader';

const IndustrialDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
IndustrialDialogFooter.displayName = 'IndustrialDialogFooter';

const IndustrialDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
    icon?:
      | 'gear'
      | 'factory'
      | 'wrench'
      | 'cog'
      | 'hammer'
      | 'hardhat'
      | 'bolt'
      | 'circuit';
  }
>(({ className, icon, children, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight flex items-center gap-2',
      className
    )}
    {...props}
  >
    {icon && (
      <IndustrialIcon
        icon={icon}
        size="md"
        className="text-industrial-accent"
      />
    )}
    {children}
  </DialogPrimitive.Title>
));
IndustrialDialogTitle.displayName = DialogPrimitive.Title.displayName;

const IndustrialDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-industrial-muted-foreground', className)}
    {...props}
  />
));
IndustrialDialogDescription.displayName =
  DialogPrimitive.Description.displayName;

// Specialized Industrial Modal variants
export interface IndustrialConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'default' | 'danger' | 'warning';
  icon?:
    | 'gear'
    | 'factory'
    | 'wrench'
    | 'cog'
    | 'hammer'
    | 'hardhat'
    | 'bolt'
    | 'circuit';
  loading?: boolean;
}

const IndustrialConfirmDialog: React.FC<IndustrialConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
  icon,
  loading = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          confirmButtonClass: 'bg-red-600 hover:bg-red-700 text-white',
          iconClass: 'text-red-500',
          defaultIcon: 'hammer' as const,
        };
      case 'warning':
        return {
          confirmButtonClass:
            'bg-industrial-safety-300 hover:bg-industrial-safety-400 text-industrial-gunmetal-900',
          iconClass: 'text-industrial-safety-300',
          defaultIcon: 'bolt' as const,
        };
      default:
        return {
          confirmButtonClass:
            'bg-industrial-gunmetal-800 hover:bg-industrial-gunmetal-700 text-white',
          iconClass: 'text-industrial-accent',
          defaultIcon: 'gear' as const,
        };
    }
  };

  const styles = getVariantStyles();
  const displayIcon = icon || styles.defaultIcon;

  return (
    <IndustrialDialog open={open} onOpenChange={onOpenChange}>
      <IndustrialDialogContent variant="default" size="sm">
        <IndustrialDialogHeader>
          <IndustrialDialogTitle icon={displayIcon}>
            {title}
          </IndustrialDialogTitle>
          {description && (
            <IndustrialDialogDescription>
              {description}
            </IndustrialDialogDescription>
          )}
        </IndustrialDialogHeader>
        <IndustrialDialogFooter className="gap-2">
          <button
            type="button"
            onClick={() => {
              onCancel?.();
              onOpenChange(false);
            }}
            className="inline-flex items-center justify-center rounded-industrial border border-industrial-border bg-white px-4 py-2 text-sm font-medium text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-50 focus:outline-none focus:ring-2 focus:ring-industrial-ring transition-colors"
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              'inline-flex items-center justify-center rounded-industrial px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-industrial-ring transition-colors',
              styles.confirmButtonClass
            )}
            disabled={loading}
          >
            {' '}
            {loading && <Loader2 size={16} className="mr-2 animate-spin" />}
            {confirmText}
          </button>
        </IndustrialDialogFooter>
      </IndustrialDialogContent>
    </IndustrialDialog>
  );
};

export {
  IndustrialDialog,
  IndustrialDialogPortal,
  IndustrialDialogOverlay,
  IndustrialDialogClose,
  IndustrialDialogTrigger,
  IndustrialDialogContent,
  IndustrialDialogHeader,
  IndustrialDialogFooter,
  IndustrialDialogTitle,
  IndustrialDialogDescription,
  IndustrialConfirmDialog,
};
