'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Industrial Textarea Variants
const industrialTextareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm font-industrial-body ring-offset-background transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
  {
    variants: {
      variant: {
        default: 'border-input bg-background focus-visible:ring-ring',
        industrial:
          'border-industrial-gunmetal-300 bg-white text-industrial-gunmetal-800 placeholder:text-industrial-gunmetal-500 hover:border-industrial-gunmetal-400 focus-visible:ring-industrial-safety-300 focus-visible:border-industrial-safety-300 shadow-industrial-sm',
        'industrial-dark':
          'border-industrial-gunmetal-600 bg-industrial-gunmetal-900 text-white placeholder:text-industrial-gunmetal-400 hover:border-industrial-gunmetal-500 focus-visible:ring-industrial-safety-300 focus-visible:border-industrial-safety-300 shadow-industrial-sm',
        'industrial-accent':
          'border-industrial-navy-300 bg-industrial-navy-50 text-industrial-navy-800 placeholder:text-industrial-navy-500 hover:border-industrial-navy-400 focus-visible:ring-industrial-safety-300 focus-visible:border-industrial-safety-300 shadow-industrial-sm',
        steel:
          'border-industrial-gunmetal-400 bg-gradient-to-br from-industrial-gunmetal-50 to-white text-industrial-gunmetal-800 placeholder:text-industrial-gunmetal-500 hover:border-industrial-gunmetal-500 focus-visible:ring-industrial-safety-300 focus-visible:border-industrial-safety-300 shadow-industrial-md',
        error:
          'border-red-400 bg-red-50 text-red-900 placeholder:text-red-500 hover:border-red-500 focus-visible:ring-red-300 focus-visible:border-red-400',
        success:
          'border-green-400 bg-green-50 text-green-900 placeholder:text-green-500 hover:border-green-500 focus-visible:ring-green-300 focus-visible:border-green-400',
      },
      size: {
        sm: 'min-h-[60px] px-2 py-1 text-xs',
        default: 'min-h-[80px] px-3 py-2 text-sm',
        lg: 'min-h-[120px] px-4 py-3 text-base',
        xl: 'min-h-[160px] px-4 py-3 text-base',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      resize: 'vertical',
    },
  }
);

interface IndustrialTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof industrialTextareaVariants> {
  label?: string;
  description?: string;
  error?: string;
  characterLimit?: number;
  showCharacterCount?: boolean;
}

const IndustrialTextarea = React.forwardRef<
  HTMLTextAreaElement,
  IndustrialTextareaProps
>(
  (
    {
      className,
      variant,
      size,
      resize,
      label,
      description,
      error,
      characterLimit,
      showCharacterCount = false,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [currentLength, setCurrentLength] = React.useState(0);
    const id = React.useId();

    React.useEffect(() => {
      if (typeof value === 'string') {
        setCurrentLength(value.length);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      // Enforce character limit if set
      if (characterLimit && newValue.length > characterLimit) {
        return;
      }

      setCurrentLength(newValue.length);
      onChange?.(e);
    };

    const isOverLimit = characterLimit && currentLength > characterLimit;
    const isNearLimit = characterLimit && currentLength > characterLimit * 0.9;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-industrial-gunmetal-800"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={id}
            className={cn(
              industrialTextareaVariants({
                variant: error ? 'error' : variant,
                size,
                resize,
              }),
              showCharacterCount && 'pb-6',
              className
            )}
            value={value}
            onChange={handleChange}
            aria-describedby={
              description || error || showCharacterCount
                ? `${id}-description`
                : undefined
            }
            aria-invalid={!!error}
            {...props}
          />

          {showCharacterCount && (
            <div className="absolute bottom-2 right-2 text-xs text-industrial-gunmetal-500">
              <span
                className={cn(
                  isOverLimit && 'text-red-500 font-medium',
                  isNearLimit && !isOverLimit && 'text-orange-500 font-medium'
                )}
              >
                {currentLength}
              </span>
              {characterLimit && (
                <span className="text-industrial-gunmetal-400">
                  /{characterLimit}
                </span>
              )}
            </div>
          )}
        </div>

        {description && !error && (
          <p
            id={`${id}-description`}
            className="text-xs text-industrial-gunmetal-600"
          >
            {description}
          </p>
        )}

        {error && (
          <p
            id={`${id}-description`}
            className="text-xs text-red-600 font-medium"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
IndustrialTextarea.displayName = 'IndustrialTextarea';

// Enhanced Textarea with additional features
interface IndustrialTextareaFieldProps extends IndustrialTextareaProps {
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

const IndustrialTextareaField = React.forwardRef<
  HTMLTextAreaElement,
  IndustrialTextareaFieldProps
>(({ icon, actions, className, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {props.label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-industrial-gunmetal-800 flex items-center gap-2">
            {icon && (
              <span className="text-industrial-gunmetal-600">{icon}</span>
            )}
            {props.label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      <IndustrialTextarea
        ref={ref}
        {...props}
        label={undefined} // Remove label since we're handling it above
        className={className}
      />
    </div>
  );
});
IndustrialTextareaField.displayName = 'IndustrialTextareaField';

// Auto-resize textarea
interface IndustrialAutoResizeTextareaProps extends IndustrialTextareaProps {
  minRows?: number;
  maxRows?: number;
}

const IndustrialAutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  IndustrialAutoResizeTextareaProps
>(({ minRows = 3, maxRows = 10, className, style, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const adjustHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';

    // Calculate the new height
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const minHeight = lineHeight * minRows;
    const maxHeight = lineHeight * maxRows;
    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, minHeight),
      maxHeight
    );

    textarea.style.height = `${newHeight}px`;
  }, [minRows, maxRows]);

  React.useEffect(() => {
    adjustHeight();
  }, [props.value, adjustHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange?.(e);
    setTimeout(adjustHeight, 0); // Adjust height after state update
  };

  return (
    <IndustrialTextarea
      ref={(node) => {
        textareaRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      {...props}
      resize="none"
      onChange={handleChange}
      className={cn('overflow-hidden', className)}
      style={{
        minHeight: `${minRows * 1.5}rem`,
        ...style,
      }}
    />
  );
});
IndustrialAutoResizeTextarea.displayName = 'IndustrialAutoResizeTextarea';

export {
  IndustrialTextarea,
  IndustrialTextareaField,
  IndustrialAutoResizeTextarea,
};
