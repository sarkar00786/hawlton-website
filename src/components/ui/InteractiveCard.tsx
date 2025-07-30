'use client'

import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  id?: string
  magnetic?: boolean
  particles?: boolean
  depth3D?: boolean
  glowEffect?: boolean
  intensity?: 'low' | 'medium' | 'high'
  onHover?: () => void
  onClick?: () => void
}

interface ParticleProps {
  x: number
  y: number
  delay: number
}

const InteractiveCard = ({
  children,
  className = '',
  id,
  magnetic = true,
  particles = true,
  depth3D = true,
  glowEffect = true,
  intensity = 'medium',
  onHover,
  onClick
}: InteractiveCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Spring values for magnetic effect
  const springConfig = { damping: 25, stiffness: 300 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  // Transform values for 3D effect
  const rotateX = useTransform(y, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(x, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  // Intensity configurations
  const intensityConfig = {
    low: {
      magneticStrength: 0.3,
      particleCount: 8,
      glowIntensity: 0.3,
      shadowIntensity: 0.15
    },
    medium: {
      magneticStrength: 0.5,
      particleCount: 12,
      glowIntensity: 0.5,
      shadowIntensity: 0.25
    },
    high: {
      magneticStrength: 0.8,
      particleCount: 16,
      glowIntensity: 0.7,
      shadowIntensity: 0.35
    }
  }

  const config = intensityConfig[intensity]

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const centerX = width / 2
    const centerY = height / 2
    
    const normalizedX = (mouseX - centerX) / centerX
    const normalizedY = (mouseY - centerY) / centerY

    setMousePosition({ x: normalizedX, y: normalizedY })

    if (magnetic) {
      x.set(normalizedX * config.magneticStrength)
      y.set(normalizedY * config.magneticStrength)
    }

    if (depth3D) {
      // 3D rotation values are handled by useTransform above
    }
  }

  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover?.()
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
    setMousePosition({ x: 0, y: 0 })
  }

  // Particle component
  const Particle = ({ x: particleX, y: particleY, delay }: ParticleProps) => (
    <motion.div
      className="absolute w-1 h-1 bg-primary-gold rounded-full pointer-events-none"
      style={{
        left: `${particleX}%`,
        top: `${particleY}%`,
      }}
      animate={isHovered ? {
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        y: [0, -20, -40],
      } : {
        opacity: 0,
        scale: 0,
        y: 0
      }}
      transition={{
        duration: 2,
        delay: delay,
        ease: 'easeOut',
        repeat: isHovered ? Infinity : 0,
        repeatDelay: 1
      }}
    />
  )

  // Generate particles
  const generateParticles = () => {
    const particles = []
    for (let i = 0; i < config.particleCount; i++) {
      particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 0.1
      })
    }
    return particles
  }

  const particleList = generateParticles()

  // Card animation variants
  const cardVariants = {
    idle: {
      scale: 1,
      boxShadow: `0 4px 20px rgba(0, 0, 0, 0.1)`,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as any }
    },
    hover: {
      scale: 1.05,
      boxShadow: glowEffect 
        ? `0 8px 30px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 215, 0, ${config.glowIntensity}), 0 0 40px rgba(255, 215, 0, ${config.glowIntensity * 0.5})`
        : `0 8px 30px rgba(0, 0, 0, 0.15)`,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as any }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] as any }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      id={id}
      className={`relative overflow-hidden rounded-xl bg-white border border-gray-100 cursor-pointer ${className}`}
      style={{
        x: magnetic ? x : 0,
        y: magnetic ? y : 0,
        rotateX: depth3D ? rotateX : 0,
        rotateY: depth3D ? rotateY : 0,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000
      }}
      variants={cardVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Hover glow overlay */}
      {glowEffect && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, rgba(255, 215, 0, 0.1) 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Particles */}
      {particles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particleList.map((particle, index) => (
            <Particle
              key={index}
              x={particle.x}
              y={particle.y}
              delay={particle.delay}
            />
          ))}
        </div>
      )}

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent)',
          transform: 'translateX(-100%)',
        }}
        animate={isHovered ? {
          transform: 'translateX(100%)',
        } : {
          transform: 'translateX(-100%)'
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 2
        }}
      />

      {/* Border glow */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-primary-gold pointer-events-none"
          style={{
            opacity: config.glowIntensity * 0.6,
            boxShadow: `0 0 20px rgba(255, 215, 0, ${config.glowIntensity})`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: config.glowIntensity * 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}

export default InteractiveCard
