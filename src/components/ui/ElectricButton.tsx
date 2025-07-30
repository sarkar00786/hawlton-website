'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface ElectricButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: React.ComponentType<any>
  iconPosition?: 'left' | 'right'
  className?: string
  onClick?: () => void
  href?: string
  intensity?: 'low' | 'medium' | 'high'
}

const ElectricButton = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  onClick,
  href,
  intensity = 'medium'
}: ElectricButtonProps) => {
  const buttonRef = useRef<any>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Electric glow intensities
  const glowIntensity = {
    low: { blur: 10, spread: 2, opacity: 0.4 },
    medium: { blur: 20, spread: 4, opacity: 0.6 },
    high: { blur: 30, spread: 6, opacity: 0.8 }
  }

  const currentGlow = glowIntensity[intensity]

  // Size configurations
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-6 text-xl'
  }

  // Variant styles
  const variantStyles = {
    primary: {
      base: 'bg-primary-gold text-primary-navy border-2 border-primary-gold',
      hover: 'bg-primary-gold/90 border-primary-gold/90',
      active: 'bg-primary-gold/80 border-primary-gold/80'
    },
    secondary: {
      base: 'bg-transparent text-primary-gold border-2 border-primary-gold',
      hover: 'bg-primary-gold/10 border-primary-gold/90',
      active: 'bg-primary-gold/20 border-primary-gold/80'
    },
    outline: {
      base: 'bg-transparent text-primary-white border-2 border-primary-silver',
      hover: 'bg-primary-silver/10 border-primary-white text-primary-white',
      active: 'bg-primary-silver/20 border-primary-white/80'
    }
  }

  const currentVariant = variantStyles[variant]

  // Electric animation variants
  const electricVariants = {
    idle: {
      scale: 1,
      boxShadow: `0 0 0 0 rgba(255, 215, 0, 0)`,
      filter: 'brightness(1)'
    },
    hover: {
      scale: 1.05,
      boxShadow: [
        `0 0 ${currentGlow.blur}px ${currentGlow.spread}px rgba(255, 215, 0, ${currentGlow.opacity})`,
        `0 0 ${currentGlow.blur * 2}px ${currentGlow.spread * 2}px rgba(255, 215, 0, ${currentGlow.opacity * 0.5})`,
        `0 0 ${currentGlow.blur * 3}px ${currentGlow.spread * 3}px rgba(255, 215, 0, ${currentGlow.opacity * 0.2})`
      ],
      filter: 'brightness(1.1)',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as any
      }
    },
    pressed: {
      scale: 0.98,
      boxShadow: [
        `0 0 ${currentGlow.blur * 1.5}px ${currentGlow.spread * 2}px rgba(255, 215, 0, ${currentGlow.opacity * 1.2})`,
        `0 0 ${currentGlow.blur * 3}px ${currentGlow.spread * 4}px rgba(255, 215, 0, ${currentGlow.opacity * 0.8})`
      ],
      filter: 'brightness(1.2)',
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 0.2, 1] as any
      }
    }
  }

  // Electric spark effect
  const sparkVariants = {
    idle: { 
      opacity: 0,
      scale: 0,
      rotate: 0
    },
    active: {
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as any,
        times: [0, 0.3, 1]
      }
    }
  }

  // Handle mouse movement for magnetic effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    setMousePosition({
      x: (e.clientX - centerX) / 10, // Subtle magnetic pull
      y: (e.clientY - centerY) / 10
    })
  }

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  // Create electric spark elements
  const ElectricSparks = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary-gold rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          variants={sparkVariants}
          animate={isHovered ? 'active' : 'idle'}
          transition={{
            delay: i * 0.1,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 1
          }}
        />
      ))}
    </div>
  )

  // Render content with icon
  const renderContent = () => (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className={`${size === 'xl' ? 'w-6 h-6' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} mr-2`} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className={`${size === 'xl' ? 'w-6 h-6' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} ml-2`} />
      )}
    </>
  )

  const buttonProps = {
    ref: buttonRef,
    className: `
      relative inline-flex items-center justify-center font-semibold rounded-full
      transition-all duration-300 ease-out cursor-pointer select-none overflow-hidden
      ${sizeClasses[size]}
      ${currentVariant.base}
      ${className}
    `,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onClick,
    style: {
      transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
      transition: 'transform 0.2s ease-out'
    }
  }

  const MotionComponent = motion[href ? 'a' : 'button']

  return (
    <MotionComponent
      {...buttonProps}
      {...(href && { href })}
      variants={electricVariants}
      animate={
        isPressed ? 'pressed' : isHovered ? 'hover' : 'idle'
      }
      whileHover="hover"
      whileTap="pressed"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-gold/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Electric sparks */}
      <ElectricSparks />
      
      {/* Button content */}
      <span className="relative z-10 flex items-center">
        {renderContent()}
      </span>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className={`
          absolute inset-0 rounded-full transform scale-0 transition-transform duration-500
          ${isPressed ? 'scale-150' : 'scale-0'}
          ${variant === 'primary' ? 'bg-primary-navy/20' : 'bg-primary-gold/20'}
        `} />
      </div>
    </MotionComponent>
  )
}

export default ElectricButton
