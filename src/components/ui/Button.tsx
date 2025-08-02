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
import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

    // Sharp corners for all button variants - corporate/professional look
    const cornerClasses = {
      primary: '', // Sharp corners for primary CTAs
      secondary: '', // Sharp corners for secondary
      outline: '',  // Sharp corners for outline
      ghost: '',    // Sharp corners for ghost
      link: '',     // Sharp corners for link
    };

    // Sharp, solid button variants - no shadows, animations, or effects
    const variantClasses = {
      primary: `bg-primary-gold text-primary-navy ${cornerClasses.primary}`,
      secondary: `bg-primary-navy text-primary-white ${cornerClasses.secondary}`,
      outline: `border-2 border-primary-gold text-primary-gold ${cornerClasses.outline}`,
      ghost: `text-primary-charcoal ${cornerClasses.ghost}`,
      link: `text-primary-gold underline-offset-4 font-medium ${cornerClasses.link}`,
    };

    const baseClasses = cn(
      'inline-flex items-center justify-center font-semibold tracking-[0.02em]',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      sizeClasses[size],
      variantClasses[variant],
      fullWidth && 'w-full',
      className
    );

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        onMouseDown={(e) => {
          // Remove focus after click to prevent focus ring from showing
          setTimeout(() => {
            if (e.target instanceof HTMLElement) {
              e.target.blur();
            }
          }, 100);
          props.onMouseDown?.(e);
        }}
        onBlur={(e) => {
          // Ensure focus is completely removed
          if (e.target instanceof HTMLElement) {
            e.target.style.outline = 'none';
            e.target.style.boxShadow = 'none';
          }
          props.onBlur?.(e);
        }}
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
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
