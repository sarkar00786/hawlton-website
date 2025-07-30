'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface GridProps {
  className?: string
  intensity?: 'low' | 'medium' | 'high'
  pattern?: 'corporate' | 'social' | 'basic'
  animated?: boolean
}

const DynamicGrid = ({ 
  className = '', 
  intensity = 'medium',
  pattern = 'corporate',
  animated = true 
}: GridProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Grid configuration based on pattern
  const patterns = {
    corporate: {
      size: '80px 80px',
      lines: 'linear-gradient(rgba(255,215,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.03) 1px, transparent 1px)',
      hoverSize: '80px 80px',
      hoverIntensity: 0.15
    },
    social: {
      size: '60px 60px',
      lines: 'linear-gradient(rgba(255,215,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.04) 1px, transparent 1px)',
      hoverSize: '60px 60px',
      hoverIntensity: 0.2
    },
    basic: {
      size: '40px 40px',
      lines: 'linear-gradient(rgba(255,215,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.02) 1px, transparent 1px)',
      hoverSize: '40px 40px',
      hoverIntensity: 0.1
    }
  }

  const currentPattern = patterns[pattern]

  // Intensity configurations
  const intensityConfig = {
    low: { opacity: 0.3, glowRadius: 100 },
    medium: { opacity: 0.5, glowRadius: 150 },
    high: { opacity: 0.7, glowRadius: 200 }
  }

  const config = intensityConfig[intensity]

  // Handle mouse movement for proximity effects
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    })
  }

  // Energy flow animation variants
  const energyVariants = {
    idle: {
      opacity: config.opacity * 0.5,
      scale: 1,
      transition: { duration: 2, ease: [0.4, 0, 0.2, 1] as any }
    },
    active: {
      opacity: [config.opacity * 0.5, config.opacity, config.opacity * 0.5],
      scale: [1, 1.02, 1],
      transition: { 
        duration: 4, 
        ease: [0.4, 0, 0.2, 1] as any,
        repeat: Infinity,
        repeatType: 'reverse' as any
      }
    },
    hover: {
      opacity: config.opacity * 1.2,
      scale: 1.01,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as any }
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={energyVariants}
      animate={animated ? (isHovered ? 'hover' : 'active') : 'idle'}
      style={{
        backgroundImage: currentPattern.lines,
        backgroundSize: currentPattern.size,
      }}
    >
      {/* Energy flow lines */}
      {animated && (
        <>
          {/* Horizontal energy flows */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.1) 50%, transparent 100%)`,
              height: '2px',
              top: `${mousePosition.y}%`,
              opacity: isHovered ? 0.6 : 0.2
            }}
            animate={{
              x: [-1000, typeof window !== 'undefined' ? window.innerWidth + 1000 : 2000],
              opacity: isHovered ? [0, 0.6, 0] : [0, 0.2, 0]
            }}
            transition={{
              duration: 3,
              ease: 'linear',
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
          
          {/* Vertical energy flows */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(0deg, transparent 0%, rgba(255,215,0,0.1) 50%, transparent 100%)`,
              width: '2px',
              left: `${mousePosition.x}%`,
              opacity: isHovered ? 0.6 : 0.2
            }}
            animate={{
              y: [-1000, typeof window !== 'undefined' ? window.innerHeight + 1000 : 2000],
              opacity: isHovered ? [0, 0.6, 0] : [0, 0.2, 0]
            }}
            transition={{
              duration: 3,
              ease: 'linear',
              repeat: Infinity,
              repeatDelay: 2,
              delay: 1.5
            }}
          />
        </>
      )}

      {/* Proximity glow effect */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            width: `${config.glowRadius}px`,
            height: `${config.glowRadius}px`,
            background: `radial-gradient(circle, rgba(255,215,0,${currentPattern.hoverIntensity}) 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}

      {/* Grid intersection points */}
      {animated && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-gold rounded-full"
              style={{
                left: `${(i % 5) * 25 + 10}%`,
                top: `${Math.floor(i / 5) * 25 + 10}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default DynamicGrid
