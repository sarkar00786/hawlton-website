'use client'

import React, { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  success?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
  isLoading?: boolean
  showPasswordToggle?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    label,
    error,
    success,
    hint,
    leftIcon,
    rightIcon,
    size = 'md',
    variant = 'default',
    isLoading = false,
    showPasswordToggle = false,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const inputType = showPasswordToggle && showPassword ? 'text' : type

    const inputClasses = cn(
      // Professional base styles - Windows & Mobile optimized
      'form-input', // Use our professional form-input class
      'peer',
      
      // Size variants - WCAG AA compliant
      {
        'text-sm': size === 'sm',
        'text-base': size === 'md',
        'text-lg': size === 'lg',
      },
      
      // Override padding for different sizes while maintaining touch targets
      {
        'px-3 py-2 text-sm': size === 'sm',
        'px-3 py-2.5 text-sm': size === 'md',
        'px-4 py-3 text-base': size === 'lg',
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
      
      // Icon spacing
      {
        'pl-10': leftIcon && size === 'sm',
        'pl-11': leftIcon && size === 'md',
        'pl-12': leftIcon && size === 'lg',
        'pr-10': (rightIcon || showPasswordToggle) && size === 'sm',
        'pr-11': (rightIcon || showPasswordToggle) && size === 'md',
        'pr-12': (rightIcon || showPasswordToggle) && size === 'lg',
      },
      
      className
    )

    const containerClasses = cn(
      'relative',
      {
        'opacity-50 animate-pulse': isLoading,
      }
    )

    const iconClasses = cn(
      'absolute top-1/2 transform -translate-y-1/2 text-text-muted transition-colors duration-200',
      {
        'w-4 h-4': size === 'sm',
        'w-5 h-5': size === 'md',
        'w-6 h-6': size === 'lg',
      }
    )

    const leftIconClasses = cn(iconClasses, {
      'left-3 left-sm': size === 'sm',
      'left-3 left-md': size === 'md',
      'left-4 left-lg': size === 'lg',
    })

    const rightIconClasses = cn(iconClasses, {
      'right-3 right-sm': size === 'sm',
      'right-3 right-md': size === 'md',
      'right-4 right-lg': size === 'lg',
    })

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
          {leftIcon && (
            <div className={leftIconClasses}>
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={inputClasses}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          {/* Right icon or password toggle */}
          {(rightIcon || showPasswordToggle) && (
            <div className={rightIconClasses}>
              {showPasswordToggle ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-accent-primary focus:text-accent-primary focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              ) : (
                rightIcon
              )}
            </div>
          )}
          
          {/* Status indicators */}
          {error && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
          
          {success && !rightIcon && !showPasswordToggle && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Check className="w-5 h-5 text-green-500" />
            </div>
          )}
          
          {/* Focus indicator */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                className="absolute inset-0 bg-accent-primary/5 -z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              />
            )}
          </AnimatePresence>
        </div>
        
        {/* Helper text */}
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
              <AlertCircle className="w-4 h-4" />
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
              <Check className="w-4 h-4" />
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
    )
  }
)

Input.displayName = 'Input'

export default Input
