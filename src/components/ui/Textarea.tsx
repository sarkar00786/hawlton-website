'use client'

import React, { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AlertCircle, Check } from 'lucide-react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  success?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
  isLoading?: boolean
  showCharCount?: boolean
  maxLength?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    label,
    error,
    success,
    hint,
    size = 'md',
    variant = 'default',
    isLoading = false,
    showCharCount = false,
    maxLength,
    resize = 'vertical',
    rows = 4,
    value,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const currentLength = typeof value === 'string' ? value.length : 0

    const textareaClasses = cn(
      // Base styles
      'w-full transition-all duration-200 ease-in-out',
      'font-medium placeholder:text-text-muted',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      
      // Resize options
      {
        'resize-none': resize === 'none',
        'resize-y': resize === 'vertical',
        'resize-x': resize === 'horizontal',
        'resize': resize === 'both',
      },
      
      // Size variants
      {
        'px-3 py-2 text-sm': size === 'sm',
        'px-4 py-3 text-base': size === 'md',
        'px-5 py-4 text-lg': size === 'lg',
      },
      
      // Variant styles
      {
        // Default
        'border border-secondary-400 bg-white text-text-secondary': variant === 'default',
        'hover:border-accent-primary focus:border-accent-primary': variant === 'default' && !error,
        'focus:ring-accent-primary/20': variant === 'default' && !error,
        
        // Outline
        'border-2 border-secondary-300 bg-transparent text-text-secondary': variant === 'outline',
        'hover:border-accent-primary focus:border-accent-primary focus:ring-accent-primary/20': variant === 'outline' && !error,
        
        // Ghost
        'border-transparent bg-secondary-50 text-text-secondary': variant === 'ghost',
        'hover:bg-secondary-100 focus:bg-white focus:border-accent-primary': variant === 'ghost' && !error,
        'focus:ring-accent-primary/20 focus-ghost': variant === 'ghost' && !error,
      },
      
      // State variants
      {
        'border-red-500 focus:border-red-500 focus:ring-red-500/20': error,
        'border-green-500 focus:border-green-500 focus:ring-green-500/20': success,
      },
      
      className
    )

    const containerClasses = cn(
      'relative',
      {
        'opacity-50 animate-pulse': isLoading,
      }
    )

    return (
      <div className="space-y-2">
        {label && (
          <motion.label
            className={cn(
              'block text-sm font-semibold transition-colors duration-200',
              error ? 'text-red-600' : success ? 'text-green-600' : 'text-text-secondary'
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}
        
        <div className={containerClasses}>
          <textarea
            ref={ref}
            rows={rows}
            maxLength={maxLength}
            className={textareaClasses}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            {...props}
          />
          
          {/* Status indicators */}
          {error && (
            <div className="absolute right-3 top-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
          
          {success && !error && (
            <div className="absolute right-3 top-3">
              <Check className="w-5 h-5 text-green-500" />
            </div>
          )}
          
          {/* Focus indicator */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                className="absolute inset-0 bg-accent-primary/5 -z-10"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
              />
            )}
          </AnimatePresence>
        </div>
        
        {/* Character count and helper text */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  key="error"
                  className="text-sm text-red-600 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.p>
              )}
              
              {success && !error && (
                <motion.p
                  key="success"
                  className="text-sm text-green-600 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="w-4 h-4 flex-shrink-0" />
                  {success}
                </motion.p>
              )}
              
              {hint && !error && !success && (
                <motion.p
                  key="hint"
                  className="text-sm text-text-muted"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {hint}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          {/* Character count */}
          {showCharCount && maxLength && (
            <motion.div
              className={cn(
                'text-xs font-medium ml-4 flex-shrink-0',
                currentLength > maxLength * 0.9 
                  ? currentLength >= maxLength 
                    ? 'text-red-600' 
                    : 'text-amber-600'
                  : 'text-text-muted'
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {currentLength}/{maxLength}
            </motion.div>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
