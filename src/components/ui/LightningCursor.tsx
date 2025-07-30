'use client'

import { useEffect, useRef, useState } from 'react'

interface MousePosition {
  x: number
  y: number
}

interface LightningParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  intensity: number
}

interface LightningTrail {
  points: MousePosition[]
  timestamp: number
  intensity: number
}

const LightningCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })
  const prevMouseRef = useRef<MousePosition>({ x: 0, y: 0 })
  const particlesRef = useRef<LightningParticle[]>([])
  const trailsRef = useRef<LightningTrail[]>([])
  const animationRef = useRef<number>(0)
  const [isVisible, setIsVisible] = useState(false)

  // Lightning colors - Hawlton gold theme
  const colors = {
    primary: '#FFD700',
    secondary: '#D4AF37', 
    accent: '#FFA500',
    glow: 'rgba(255, 215, 0, 0.8)',
    trail: 'rgba(255, 215, 0, 0.4)'
  }

  // Create lightning particle
  const createParticle = (x: number, y: number, intensity: number): LightningParticle => {
    const angle = Math.random() * Math.PI * 2
    const speed = intensity * (2 + Math.random() * 3)
    
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 60,
      maxLife: 60,
      size: intensity * (1 + Math.random() * 2),
      intensity
    }
  }

  // Create lightning branch effect
  const createLightningBranch = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    intensity: number,
    generations: number = 0
  ) => {
    if (generations > 3) return

    const dx = endX - startX
    const dy = endY - startY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < 5) return

    // Main lightning bolt
    ctx.save()
    ctx.shadowColor = colors.glow
    ctx.shadowBlur = intensity * 15
    ctx.strokeStyle = `rgba(255, 215, 0, ${intensity})`
    ctx.lineWidth = intensity * 2
    ctx.lineCap = 'round'
    
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    
    // Add random jagged effect
    const segments = Math.floor(distance / 10)
    for (let i = 1; i <= segments; i++) {
      const progress = i / segments
      const x = startX + dx * progress + (Math.random() - 0.5) * intensity * 8
      const y = startY + dy * progress + (Math.random() - 0.5) * intensity * 8
      ctx.lineTo(x, y)
    }
    
    ctx.lineTo(endX, endY)
    ctx.stroke()
    ctx.restore()

    // Create branches
    if (Math.random() < 0.6 && generations < 2) {
      const midX = startX + dx * (0.3 + Math.random() * 0.4)
      const midY = startY + dy * (0.3 + Math.random() * 0.4)
      const branchLength = distance * (0.3 + Math.random() * 0.3)
      const branchAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * Math.PI * 0.8
      
      const branchEndX = midX + Math.cos(branchAngle) * branchLength
      const branchEndY = midY + Math.sin(branchAngle) * branchLength
      
      createLightningBranch(
        ctx,
        midX,
        midY,
        branchEndX,
        branchEndY,
        intensity * 0.6,
        generations + 1
      )
    }
  }

  // Update particles
  const updateParticles = () => {
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vx *= 0.98
      particle.vy *= 0.98
      particle.life--
      particle.size *= 0.99
      
      return particle.life > 0 && particle.size > 0.1
    })
  }

  // Draw particles
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach(particle => {
      const alpha = particle.life / particle.maxLife
      const size = particle.size * alpha
      
      ctx.save()
      ctx.shadowColor = colors.glow
      ctx.shadowBlur = size * 3
      ctx.fillStyle = `rgba(255, 215, 0, ${alpha * particle.intensity})`
      
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })
  }

  // Draw lightning trails
  const drawTrails = (ctx: CanvasRenderingContext2D) => {
    const currentTime = Date.now()
    
    trailsRef.current = trailsRef.current.filter(trail => {
      const age = currentTime - trail.timestamp
      const maxAge = 800
      
      if (age > maxAge) return false
      
      const alpha = Math.max(0, 1 - age / maxAge)
      const points = trail.points
      
      if (points.length < 2) return false
      
      for (let i = 1; i < points.length; i++) {
        const segmentAlpha = alpha * (i / points.length)
        const intensity = trail.intensity * segmentAlpha
        
        if (intensity > 0.1) {
          createLightningBranch(
            ctx,
            points[i - 1].x,
            points[i - 1].y,
            points[i].x,
            points[i].y,
            intensity,
            0
          )
        }
      }
      
      return true
    })
  }

  // Main animation loop
  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Update and draw effects
    updateParticles()
    drawTrails(ctx)
    drawParticles(ctx)
    
    animationRef.current = requestAnimationFrame(animate)
  }

  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    prevMouseRef.current = { ...mouseRef.current }
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }

    const dx = mouseRef.current.x - prevMouseRef.current.x
    const dy = mouseRef.current.y - prevMouseRef.current.y
    const speed = Math.sqrt(dx * dx + dy * dy)
    const intensity = Math.min(1, speed / 20)

    // Create particles based on mouse speed
    if (intensity > 0.1) {
      for (let i = 0; i < Math.floor(intensity * 3); i++) {
        particlesRef.current.push(
          createParticle(mouseRef.current.x, mouseRef.current.y, intensity)
        )
      }

      // Create lightning trail
      const trail: LightningTrail = {
        points: [prevMouseRef.current, mouseRef.current],
        timestamp: Date.now(),
        intensity: intensity
      }
      
      trailsRef.current.push(trail)
      
      // Limit trails
      if (trailsRef.current.length > 5) {
        trailsRef.current.shift()
      }
    }

    setIsVisible(true)
  }

  // Handle mouse enter/leave
  const handleMouseEnter = () => setIsVisible(true)
  const handleMouseLeave = () => {
    setIsVisible(false)
    // Clear effects
    particlesRef.current = []
    trailsRef.current = []
  }

  // Setup canvas and event listeners
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    
    // Event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', updateCanvasSize)
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', updateCanvasSize)
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    />
  )
}

export default LightningCursor
