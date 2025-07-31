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

    // Blueprint-compliant corner strategy
    const cornerClasses = {
      primary: '', // Sharp corners for primary CTAs (partnership/business buttons)
      secondary: 'rounded-md', // Subtle rounded for secondary
      outline: 'rounded-md',
      ghost: 'rounded-md',
      link: '',
    };

    // Enhanced color variants with premium effects and accessibility
    const variantClasses = {
      primary: `bg-gradient-to-r from-primary-gold to-[#FFA500] text-primary-navy hover:from-primary-gold/95 hover:to-[#FFA500]/95 hover:shadow-[0_8px_32px_rgba(255,215,0,0.4)] hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 shadow-[0_4px_16px_rgba(255,215,0,0.3)] active:scale-[0.98] transition-all duration-300 ease-out ${cornerClasses.primary}`,
      secondary: `bg-gradient-to-r from-primary-navy to-[#2A4A6F] text-primary-white hover:from-primary-navy/95 hover:to-[#2A4A6F]/95 hover:shadow-[0_8px_24px_rgba(26,58,95,0.4)] hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-primary-navy focus-visible:ring-offset-2 shadow-[0_4px_12px_rgba(26,58,95,0.2)] active:scale-[0.98] transition-all duration-300 ease-out ${cornerClasses.secondary}`,
      outline: `border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-navy hover:shadow-[0_4px_16px_rgba(255,215,0,0.3)] hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 active:scale-[0.98] transition-all duration-300 ease-out ${cornerClasses.outline}`,
      ghost: `text-primary-charcoal hover:bg-primary-gold/10 hover:text-primary-navy hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 active:scale-[0.98] transition-all duration-300 ease-out ${cornerClasses.ghost}`,
      link: `text-primary-gold underline-offset-4 hover:underline hover:text-primary-gold/80 focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 font-medium transition-all duration-200 ease-out ${cornerClasses.link}`,
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
