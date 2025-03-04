import React from 'react';
import { cn } from '@/lib/utils';

interface ScoreInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const ScoreInput = React.forwardRef<HTMLInputElement, ScoreInputProps>(
  ({ className, error, helperText, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);

    return (
      <div className="relative">
        <input
          type="number"
          min="0"
          max="20"
          step="0.25"
          ref={ref}
          {...props}
          className={cn(
            "w-20 px-3 py-2 text-center rounded-md border transition-all duration-200",
            "text-sm font-medium",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-400/20"
              : "border-gray-300 focus:border-primary focus:ring-primary/20",
            focused 
              ? "bg-white dark:bg-gray-800" 
              : "bg-gray-50 dark:bg-gray-900",
            "dark:border-gray-600 dark:text-gray-100",
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {helperText && (
          <p className={cn(
            "absolute left-0 text-xs mt-1",
            error ? "text-red-500" : "text-gray-500"
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

ScoreInput.displayName = 'ScoreInput';

export default ScoreInput;