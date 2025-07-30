'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
  color: string
}

interface ParticleSystemProps {
  count?: number
  speed?: 'slow' | 'medium' | 'fast'
  size?: 'small' | 'medium' | 'large'
  colors?: string[]
  interactive?: boolean
  density?: 'low' | 'medium' | 'high'
  className?: string
  pattern?: 'random' | 'flowing' | 'orbiting'
}

const ParticleSystem = ({
  count = 50,
  speed = 'medium',
  size = 'medium',
  colors = ['rgba(255, 215, 0, 0.6)', 'rgba(212, 175, 55, 0.4)', 'rgba(255, 165, 0, 0.3)'],
  interactive = true,
  density = 'medium',
  className = '',
  pattern = 'random'
}: ParticleSystemProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)

  // Configuration based on props
  const config = {
    speed: {
      slow: { min: 0.1, max: 0.5 },
      medium: { min: 0.3, max: 1.0 },
      fast: { min: 0.8, max: 2.0 }
    },
    size: {
      small: { min: 1, max: 3 },
      medium: { min: 2, max: 5 },
      large: { min: 4, max: 8 }
    },
    density: {
      low: 0.3,
      medium: 0.6,
      high: 1.0
    }
  }

  const speedConfig = config.speed[speed]
  const sizeConfig = config.size[size]
  const densityMultiplier = config.density[density]

  // Create a single particle
  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    const particle: Particle = {
      id: Math.random(),
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speedConfig.max,
      vy: (Math.random() - 0.5) * speedConfig.max,
      size: sizeConfig.min + Math.random() * (sizeConfig.max - sizeConfig.min),
      opacity: 0.3 + Math.random() * 0.7,
      life: 0,
      maxLife: 300 + Math.random() * 200,
      color: colors[Math.floor(Math.random() * colors.length)]
    }

    // Apply pattern-specific modifications
    switch (pattern) {
      case 'flowing':
        particle.vx = speedConfig.min + Math.random() * speedConfig.max
        particle.vy = (Math.random() - 0.5) * speedConfig.max * 0.3
        break
      case 'orbiting':
        const angle = Math.random() * Math.PI * 2
        const radius = 50 + Math.random() * 100
        particle.x = canvas.width / 2 + Math.cos(angle) * radius
        particle.y = canvas.height / 2 + Math.sin(angle) * radius
        particle.vx = -Math.sin(angle) * speedConfig.max * 0.5
        particle.vy = Math.cos(angle) * speedConfig.max * 0.5
        break
      default:
        // Random pattern - no modifications needed
        break
    }

    return particle
  }

  // Initialize particles
  const initParticles = (canvas: HTMLCanvasElement) => {
    const particleCount = Math.floor(count * densityMultiplier)
    particlesRef.current = []
    
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas))
    }
  }

  // Update particle positions and properties
  const updateParticles = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy
      particle.life++

      // Interactive mouse effect
      if (interactive) {
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += dx * force * 0.01
          particle.vy += dy * force * 0.01
        }
      }

      // Apply pattern-specific behaviors
      switch (pattern) {
        case 'orbiting':
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const angle = Math.atan2(particle.y - centerY, particle.x - centerX)
          const radius = Math.sqrt((particle.x - centerX) ** 2 + (particle.y - centerY) ** 2)
          
          // Apply orbital force
          particle.vx += -Math.sin(angle) * 0.02
          particle.vy += Math.cos(angle) * 0.02
          
          // Maintain distance from center
          if (radius > 200) {
            particle.vx += -(particle.x - centerX) * 0.001
            particle.vy += -(particle.y - centerY) * 0.001
          }
          break
      }

      // Boundary checks and wrapping
      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      if (particle.y > canvas.height) particle.y = 0

      // Fade out over time
      const lifeRatio = particle.life / particle.maxLife
      particle.opacity = Math.max(0, 1 - lifeRatio)

      // Reset particle when it dies
      if (particle.life >= particle.maxLife) {
        Object.assign(particle, createParticle(canvas))
      }

      // Apply velocity dampening
      particle.vx *= 0.99
      particle.vy *= 0.99
    })
  }

  // Draw particles
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach(particle => {
      ctx.save()
      
      // Set particle properties
      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = particle.color
      
      // Add glow effect
      ctx.shadowColor = particle.color
      ctx.shadowBlur = particle.size * 2
      
      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()
    })
  }

  // Draw connections between nearby particles
  const drawConnections = (ctx: CanvasRenderingContext2D) => {
    const maxDistance = 80
    
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const p1 = particlesRef.current[i]
        const p2 = particlesRef.current[j]
        
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < maxDistance) {
          const opacity = (maxDistance - distance) / maxDistance * 0.3
          
          ctx.save()
          ctx.globalAlpha = opacity
          ctx.strokeStyle = colors[0]
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
          ctx.restore()
        }
      }
    }
  }

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    
    if (!canvas || !ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Update and draw particles
    updateParticles(canvas, ctx)
    drawConnections(ctx)
    drawParticles(ctx)
    
    animationRef.current = requestAnimationFrame(animate)
  }

  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  // Handle visibility changes
  const handleVisibilityChange = () => {
    setIsVisible(!document.hidden)
  }

  // Setup and cleanup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    initParticles(canvas)

    // Event listeners
    window.addEventListener('resize', updateCanvasSize)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Start animation
    if (isVisible) {
      animate()
    }

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Handle visibility changes
  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    if (isVisible) {
      animate()
    }
  }, [isVisible])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{
        zIndex: 1,
        opacity: isVisible ? 0.8 : 0,
        transition: 'opacity 0.3s ease'
      }}
    />
  )
}

export default ParticleSystem
