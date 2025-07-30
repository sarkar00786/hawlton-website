'use client'

/**
 * Hawlton Hybrid Theme Button Component
 * 
 * Design Philosophy:
 * - Sharp corners for primary CTAs (partnership/business buttons) - conveys authority & trust
 * - Rounded corners for cards and secondary elements - provides approachability 
 * 
 * This creates a balanced user experience that builds trust for business decisions
 * while maintaining approachability for general interactions.
 */

import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon: Icon,
    iconPosition = 'left',
    fullWidth = false,
    className,
    children,
    ...props
  }, ref) => {
    // Enhanced sizing with 8-point grid system and WCAG AA compliance
    const sizeClasses = {
      sm: 'px-4 py-2 text-button-sm min-h-[40px] gap-2',
      md: 'px-5 py-3 text-button-md min-h-[44px] gap-2',
      lg: 'px-6 py-3 text-button-lg min-h-[48px] gap-2.5',
      xl: 'px-8 py-4 text-button-xl min-h-[56px] gap-3',
    };

    // Refined color variants with enhanced hover states and premium effects
    const variantClasses = {
      primary: 'bg-primary-gold text-primary-navy hover:bg-primary-gold/90 hover:shadow-glow-gold focus-visible:ring-primary-gold shadow-gold',
      secondary: 'bg-primary-navy text-primary-white hover:bg-primary-navy/90 hover:shadow-navy focus-visible:ring-primary-navy shadow-soft',
      outline: 'border-2 border-primary-silver text-primary-silver hover:bg-primary-silver hover:text-primary-white focus-visible:ring-primary-silver',
      ghost: 'text-primary-charcoal hover:bg-primary-silver/10 focus-visible:ring-primary-silver',
      link: 'text-primary-gold underline-offset-4 hover:underline focus-visible:ring-primary-gold font-medium',
    };

    const baseClasses = cn(
      'inline-flex items-center justify-center font-semibold tracking-[0.02em] transition-all duration-200 ease-in-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      sizeClasses[size],
      variantClasses[variant],
      fullWidth && 'w-full',
      className
    );

    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
        ) : (
          <>
            {Icon && iconPosition === 'left' && <Icon className="mr-2 h-5 w-5" />}
            {children}
            {Icon && iconPosition === 'right' && <Icon className="ml-2 h-5 w-5" />}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
