'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  magneticStrength?: number
}

const MagneticButton = ({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  icon,
  magneticStrength = 0.3
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()
  const iconControls = useAnimation()

  const baseClasses = 'relative overflow-hidden transition-all duration-300 focus:outline-none focus:ring-0 group'
  
  const variantClasses = {
    primary: 'bg-primary-gold hover:bg-primary-gold/90 text-primary-navy shadow-lg hover:shadow-glow-gold',
    secondary: 'border-2 border-primary-white text-primary-white hover:bg-primary-white hover:text-primary-navy',
    outline: 'border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-navy'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * magneticStrength
    const deltaY = (e.clientY - centerY) * magneticStrength
    
    setMousePosition({ x: deltaX, y: deltaY })
    controls.start({
      x: deltaX,
      y: deltaY,
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400, damping: 30 }
    })

    // Icon animation
    if (icon) {
      iconControls.start({
        rotate: [0, -10, 10, 0],
        scale: [1, 1.2, 1],
        transition: { duration: 0.5, ease: "easeInOut" }
      })
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    controls.start({
      scale: 1.02,
      transition: { type: 'spring', stiffness: 400, damping: 30 }
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
    controls.start({
      x: 0,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 400, damping: 30 }
    })
  }

  const handleClick = () => {
    // Ripple effect animation
    controls.start({
      scale: [1, 0.95, 1.05, 1],
      transition: { duration: 0.3, ease: "easeInOut" }
    })
    
    if (onClick) onClick()
  }

  const buttonContent = (
    <>
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-gold/20 to-transparent opacity-0 group-hover:opacity-100"
        animate={{
          x: isHovered ? ['-100%', '100%'] : '-100%',
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 0.5
        }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-primary-gold/10 rounded-full filter blur-xl opacity-0 group-hover:opacity-100"
        animate={{
          scale: isHovered ? [1, 1.5, 1] : 1,
          opacity: isHovered ? [0, 0.5, 0] : 0,
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: isHovered ? Infinity : 0,
        }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-3 font-semibold">
        {icon && (
          <motion.span animate={iconControls}>
            {icon}
          </motion.span>
        )}
        {children}
      </span>
      
      {/* Particle burst on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-gold rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: Math.cos((i / 8) * Math.PI * 2) * 30,
                y: Math.sin((i / 8) * Math.PI * 2) * 30,
                opacity: [1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 2,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </>
  )

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <motion.a
          ref={buttonRef as React.RefObject<HTMLAnchorElement>}
          className={buttonClasses}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          animate={controls}
          whileTap={{ scale: 0.95 }}
        >
          {buttonContent}
        </motion.a>
      </Link>
    )
  }

  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={buttonClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={controls}
      whileTap={{ scale: 0.95 }}
    >
      {buttonContent}
    </motion.button>
  )
}

export default MagneticButton
