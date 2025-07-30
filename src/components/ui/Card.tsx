'use client'

import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'elevated' | 'premium' | 'glass' | 'navy'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  clickable?: boolean
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'default',
    padding = 'md',
    hover = false,
    clickable = false,
    className,
    children,
    ...props
  }, ref) => {
    // Enhanced padding system following 8-point grid with generous white space
    const paddingClasses = {
      none: 'p-0',
      sm: 'p-4', // 16px
      md: 'p-6', // 24px - refined for better breathing room
      lg: 'p-8', // 32px
      xl: 'p-12', // 48px
    };

    // Refined variants with enhanced shadows and premium effects
    const variantClasses = {
      default: 'bg-white border border-primary-silver shadow-soft hover:shadow-elevated transition-all duration-300',
      elevated: 'bg-white border border-primary-silver shadow-elevated hover:shadow-premium transition-all duration-300',
      premium: 'bg-white border border-metallic-gold/30 shadow-glow-gold backdrop-blur-sm',
      glass: 'bg-white/10 backdrop-blur-md border border-primary-white/20 shadow-soft text-primary-white',
      navy: 'bg-primary-navy border border-primary-gold/20 text-primary-white shadow-navy',
    };

    const baseClasses = cn(
      'rounded-lg transition-all duration-300 ease-in-out',
      paddingClasses[padding],
      variantClasses[variant],
      hover && 'hover:shadow-xl hover:-translate-y-1',
      clickable && 'cursor-pointer',
      className
    );

    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

// Card Header component
const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-6', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardHeader.displayName = 'CardHeader'

// Card Title component
const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-2xl font-heading font-bold leading-none tracking-tight',
        'text-primary-navy group-[.navy]:text-text-primary',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = 'CardTitle'

// Card Description component
const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'text-base text-text-secondary leading-relaxed',
        'group-[.navy]:text-text-muted',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
)
CardDescription.displayName = 'CardDescription'

// Card Content component
const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('space-y-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardContent.displayName = 'CardContent'

// Card Footer component
const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-6', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
export default Card
