'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface EnhancedVisualBackgroundProps {
  className?: string
  intensity?: 'low' | 'medium' | 'high'
  interactive?: boolean
}

const EnhancedVisualBackground = ({ 
  className = '', 
  intensity = 'medium',
  interactive = true 
}: EnhancedVisualBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }) // Percentage
  const [isHovering, setIsHovering] = useState(false)

  // Intensity configurations
  const config = {
    low: { 
      maskSize: '15rem', 
      opacity: 0.6, 
      hoverOpacity: 0.8,
      transitionSpeed: 0.3
    },
    medium: { 
      maskSize: '25rem', 
      opacity: 0.4, 
      hoverOpacity: 1.0,
      transitionSpeed: 0.2
    },
    high: { 
      maskSize: '35rem', 
      opacity: 0.3, 
      hoverOpacity: 1.2,
      transitionSpeed: 0.1
    }
  }

  const { maskSize, opacity, hoverOpacity, transitionSpeed } = config[intensity]

  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    })
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => {
    setIsHovering(false)
    // Reset to center when not hovering
    setMousePos({ x: 50, y: 50 })
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container || !interactive) return

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [interactive])

  // CSS custom properties for mask positioning
  const maskStyles = {
    '--hero-mask-x': `${mousePos.x}%`,
    '--hero-mask-y': `${mousePos.y}%`,
    '--hero-mask-size': isHovering ? maskSize : '10rem',
    zIndex: 0,
    pointerEvents: interactive ? 'auto' : 'none'
  } as React.CSSProperties

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden ${className}`}
      style={maskStyles}
    >
      {/* Base Layer - Always visible with low opacity */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/10 via-transparent to-accent-primary/5" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 215, 0, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 215, 0, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Enhanced Visual Layers with Cursor Following Masks */}
      <motion.div 
        className="relative h-full mix-blend-overlay"
        style={{
          clipPath: `circle(var(--hero-mask-size) at var(--hero-mask-x) var(--hero-mask-y))`
        }}
        animate={{
          opacity: isHovering ? hoverOpacity : opacity
        }}
        transition={{ duration: transitionSpeed }}
      >
        {/* Layer 1: Business/Corporate Pattern */}
        <div 
          className="absolute w-full h-full"
          style={{
            maskImage: `radial-gradient(var(--hero-mask-size) at var(--hero-mask-x) var(--hero-mask-y), black 20%, transparent)`
          }}
        >
          <Image
            alt="Business visual layer"
            src="/assets/business-visual-layer-1.svg"
            width={1574}
            height={1474}
            className="absolute w-full h-full object-cover opacity-60"
            style={{ color: 'transparent' }}
          />
        </div>

        {/* Layer 2: Digital/Tech Pattern */}
        <div 
          className="absolute z-10 w-full h-full"
          style={{
            maskImage: `radial-gradient(var(--hero-mask-size) at var(--hero-mask-x) var(--hero-mask-y), black 20%, transparent)`
          }}
        >
          <Image
            alt="Digital transformation layer"
            src="/assets/digital-visual-layer-2.svg"
            width={1574}
            height={1474}
            className="absolute w-full h-full object-cover opacity-80"
            style={{ color: 'transparent' }}
          />
        </div>

        {/* Layer 3: Geometric Accent Pattern */}
        <div 
          className="absolute z-20 w-full h-full"
          style={{
            maskImage: `radial-gradient(calc(var(--hero-mask-size) * 0.7) at var(--hero-mask-x) var(--hero-mask-y), black 30%, transparent)`
          }}
        >
          <svg 
            className="absolute inset-0 w-full h-full opacity-90"
            viewBox="0 0 1574 1474"
            fill="none"
          >
            <defs>
              <pattern id="geometric-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <polygon 
                  points="60,20 100,60 60,100 20,60" 
                  fill="none" 
                  stroke="rgba(255, 215, 0, 0.25)" 
                  strokeWidth="1.5"
                />
                <circle cx="60" cy="60" r="8" fill="none" stroke="rgba(255, 215, 0, 0.3)" strokeWidth="1"/>
                <circle cx="60" cy="60" r="3" fill="rgba(255, 215, 0, 0.5)"/>
              </pattern>
              <radialGradient id="geometric-glow" cx="50%" cy="50%" r="40%">
                <stop offset="0%" stopColor="rgba(255, 215, 0, 0.6)" />
                <stop offset="70%" stopColor="rgba(255, 215, 0, 0.2)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
            <ellipse cx="50%" cy="50%" rx="30%" ry="25%" fill="url(#geometric-glow)" />
          </svg>
        </div>
      </motion.div>


      {/* Ambient glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)`,
          opacity: isHovering ? 1 : 0.3
        }}
      />
    </div>
  )
}

export default EnhancedVisualBackground
