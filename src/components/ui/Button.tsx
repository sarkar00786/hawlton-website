'use client'

/**
 * Hawlton Hybrid Theme Button Component
 * 
 * Design Philosophy:
 * - Sharp corners for primary CTAs (investment/partnership buttons) - conveys authority & trust
 * - Rounded corners for cards and secondary elements - provides approachability 
 * 
 * This creates a balanced user experience that builds trust for financial decisions
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
  const baseClasses = cn(
      // Professional base styling - Windows & Mobile optimized
      'btn', // Use our professional btn class
      'relative inline-flex items-center justify-center font-heading font-semibold',
      'select-none text-center',
      
      // Hybrid approach: Sharp corners for primary CTAs, subtle rounding for secondary buttons
      {
        // Sharp corners for primary CTAs (conveys authority & trust for investment/partnership buttons)
        'rounded-none': variant === 'primary',
        // Subtle rounding for secondary buttons (more approachable for navigation/utility buttons)
        'rounded-md': variant === 'secondary',
        'rounded-sm': variant === 'outline' || variant === 'ghost' || variant === 'link',
      },
      
      // Professional size variants - WCAG AA compliant
      {
        'btn-sm': size === 'sm',
        'btn-md': size === 'md',  
        'btn-lg': size === 'lg' || size === 'xl',
      },
      
      // Additional XL sizing
      size === 'xl' && 'px-8 py-4 text-xl gap-3 min-h-[3.5rem]',
      
      // Variant styles
      {
        // Primary - Vibrant Classic Gold
        'bg-gradient-gold text-primary-navy shadow-gold': variant === 'primary',
        'hover:shadow-glow-gold hover:scale-105': variant === 'primary',
        'focus:ring-accent-primary-primary': variant === 'primary',
        
        // Secondary - Metallic Gold
        'bg-accent-secondary text-primary-navy shadow-navy': variant === 'secondary',
        'hover:bg-accent-hover hover:shadow-elevated': variant === 'secondary',
        'focus:ring-accent-secondary': variant === 'secondary',
        
        // Outline
        'border-2 border-accent-primary text-accent-primary bg-transparent': variant === 'outline',
        'hover:bg-accent-primary hover:text-primary-navy': variant === 'outline',
        'focus:ring-accent-primary-outline': variant === 'outline',
        
        // Ghost
        'text-accent-primary bg-transparent': variant === 'ghost',
        'hover:bg-accent-primary/10': variant === 'ghost',
        'focus:ring-accent-primary-ghost': variant === 'ghost',
        
        // Link
        'text-accent-primary bg-transparent underline-offset-4': variant === 'link',
        'hover:underline': variant === 'link',
        'focus:ring-accent-primary-link': variant === 'link',
      },
      
      // Full width
      fullWidth && 'w-full',
      
      className
    )

    const iconClasses = cn(
      'transition-all duration-300 ease-out',
      'group-hover:scale-110 filter drop-shadow-sm',
      {
        'w-4 h-4': size === 'sm',
        'w-5 h-5': size === 'md',
        'w-6 h-6': size === 'lg',
        'w-7 h-7': size === 'xl',
      },
      // Right icon specific hover effects
      iconPosition === 'right' && 'group-hover:translate-x-1'
    )

    const shimmerClasses = cn(
      'absolute inset-0 -translate-x-full',
      'bg-gradient-to-r from-transparent via-white/20 to-transparent',
      'group-hover:translate-x-full transition-transform duration-1000 ease-out'
    )

    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        whileHover={{ scale: variant === 'primary' ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        {/* Shimmer effect */}
        <div className={shimmerClasses} />
        
        {/* Content */}
        <div className="relative flex items-center justify-center gap-3">
          {loading ? (
            <div className={cn(iconClasses, 'animate-spin')}>
              <svg viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="32"
                  strokeDashoffset="32"
                  className="animate-spin"
                />
              </svg>
            </div>
          ) : (
            <>
              {Icon && iconPosition === 'left' && (
                <Icon className={iconClasses} />
              )}
              <span className="relative z-10">{children}</span>
              {Icon && iconPosition === 'right' && (
                <Icon className={iconClasses} />
              )}
            </>
          )}
        </div>
        
        {/* Pulse effect for primary variant */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-accent-primary opacity-0"
            animate={loading ? { opacity: [0, 0.3, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
