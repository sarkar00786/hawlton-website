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
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 }) // Percentage position
  const [lastExitSide, setLastExitSide] = useState('right') // Track exit side

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

  // Handle mouse movement for magnetic effect and cursor tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Magnetic pull effect
    setMousePosition({
      x: (e.clientX - centerX) / 10,
      y: (e.clientY - centerY) / 10
    })
    
    // Track cursor position as percentage for electric effect
    const relativeX = ((e.clientX - rect.left) / rect.width) * 100
    const relativeY = ((e.clientY - rect.top) / rect.height) * 100
    
    setCursorPosition({
      x: Math.max(0, Math.min(100, relativeX)),
      y: Math.max(0, Math.min(100, relativeY))
    })
  }

  // Handle mouse enter to track entry side
  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const relativeX = ((e.clientX - rect.left) / rect.width) * 100
    
    // Determine entry side
    if (relativeX < 25) {
      setLastExitSide('left')
    } else if (relativeX > 75) {
      setLastExitSide('right')
    } else {
      setLastExitSide(relativeX < 50 ? 'left' : 'right')
    }
    
    setCursorPosition({ x: relativeX, y: 50 })
    setIsHovered(true)
  }

  // Reset position when mouse leaves and maintain exit position
  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const relativeX = ((e.clientX - rect.left) / rect.width) * 100
    
    // Determine exit side and maintain position
    if (relativeX <= 0) {
      setLastExitSide('left')
      setCursorPosition({ x: 5, y: 50 })
    } else if (relativeX >= 100) {
      setLastExitSide('right')
      setCursorPosition({ x: 95, y: 50 })
    } else {
      setLastExitSide(relativeX < 50 ? 'left' : 'right')
      setCursorPosition({ 
        x: relativeX < 50 ? 5 : 95, 
        y: 50 
      })
    }
    
    setMousePosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  // Electric trail effect that follows cursor
  const ElectricTrail = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
      {/* Main electric glow at cursor position */}
      <motion.div
        className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${cursorPosition.x}%`,
          top: `${cursorPosition.y}%`,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full bg-primary-gold/80 rounded-full shadow-glow-gold animate-pulse" />
        <div className="absolute inset-0 w-full h-full bg-primary-gold/40 rounded-full animate-ping" />
      </motion.div>
      
      {/* Electric sparks radiating from cursor */}
      {isHovered && [...Array(4)].map((_, i) => {
        const angle = (i * 90) + (Date.now() / 10) % 360
        const radius = 15 + Math.sin(Date.now() / 500 + i) * 5
        const sparkX = cursorPosition.x + Math.cos(angle * Math.PI / 180) * radius
        const sparkY = cursorPosition.y + Math.sin(angle * Math.PI / 180) * radius
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-gold rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${Math.max(0, Math.min(100, sparkX))}%`,
              top: `${Math.max(0, Math.min(100, sparkY))}%`,
            }}
            animate={{
              opacity: [0.8, 0.2, 0.8],
              scale: [1, 0.5, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        )
      })}
    </div>
  )

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
    onMouseEnter: handleMouseEnter,
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
      
      {/* Electric trail that follows cursor */}
      <ElectricTrail />
      
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
