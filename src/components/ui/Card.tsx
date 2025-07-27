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
    const baseClasses = cn(
      // Professional card base - responsive and consistent
      'card', // Use our professional card class
      'relative',
      // Consistent rounded corners for cards (hybrid approach)
      'rounded-xl',
      
      // Professional responsive padding system
      {
        'p-0': padding === 'none',
        'card-padding': padding === 'sm' || padding === 'md', // Responsive padding
        'p-6 md:p-8 lg:p-10': padding === 'lg', // 24px->32px->40px
        'p-8 md:p-10 lg:p-12': padding === 'xl', // 32px->40px->48px
      },
      
      // Default responsive padding if no specific padding set
      padding === 'md' && 'card-padding',
      
      // Variant styles
      {
        // Default - Soft Platinum Gray background
        'bg-secondary-50 shadow-soft': variant === 'default',
        
        // Elevated - Premium white with elevated shadow
        'bg-white shadow-elevated': variant === 'elevated',
        
        // Premium - Enhanced styling with gold accents
        'bg-white shadow-premium border-accent-primary/20': variant === 'premium',
        'before:absolute before:inset-0 before:bg-gradient-gold before:opacity-5': variant === 'premium',
        
        // Glass - Glassmorphism effect
        'bg-white/80 backdrop-blur-sm border-white/20 shadow-soft': variant === 'glass',
        
        // Navy - Deep navy background for dark sections
        'bg-primary-navy border-primary-700 shadow-navy text-text-light': variant === 'navy',
      },
      
      // Interactive states
      {
        'hover:shadow-elevated hover:-translate-y-1': hover && variant !== 'navy',
        'hover:shadow-glow-gold hover:-translate-y-1': hover && variant === 'navy',
        'cursor-pointer': clickable,
        'hover:scale-[1.02]': clickable,
      },
      
      className
    )

    const cardVariants = {
      hidden: { 
        opacity: 0, 
        y: 20,
        scale: 0.95
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.04, 0.62, 0.23, 0.98] as const
        }
      },
      hover: {
        y: hover ? -4 : 0,
        scale: clickable ? 1.02 : 1,
        transition: {
          duration: 0.2,
          ease: 'easeOut' as const
        }
      }
    }

    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-50px" }}
        {...props}
      >
        {/* Premium variant gradient overlay */}
        {variant === 'premium' && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Subtle inner glow for navy variant */}
        {variant === 'navy' && (
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent pointer-events-none" />
        )}
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
