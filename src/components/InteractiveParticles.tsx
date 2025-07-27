'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

const InteractiveParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const colors = ['#FFD700', '#1A3A5F', '#A0B0C0', '#FFFFFF']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 200 + 100
    })

    // Initialize particles
    for (let i = 0; i < 80; i++) {
      particlesRef.current.push(createParticle())
    }

    const updateParticles = () => {
      particlesRef.current = particlesRef.current.map(particle => {
        const newParticle = { ...particle }
        
        // Update position
        newParticle.x += newParticle.vx
        newParticle.y += newParticle.vy
        
        // Mouse interaction
        const dx = mousePos.x - newParticle.x
        const dy = mousePos.y - newParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150 && isHovered) {
          const force = (150 - distance) / 150
          newParticle.vx += (dx / distance) * force * 0.01
          newParticle.vy += (dy / distance) * force * 0.01
          newParticle.size = Math.min(newParticle.size * 1.05, 8)
        } else {
          newParticle.size = Math.max(newParticle.size * 0.98, 1)
        }
        
        // Boundaries
        if (newParticle.x < 0 || newParticle.x > canvas.width) newParticle.vx *= -1
        if (newParticle.y < 0 || newParticle.y > canvas.height) newParticle.vy *= -1
        
        // Life cycle
        newParticle.life++
        if (newParticle.life > newParticle.maxLife) {
          return createParticle()
        }
        
        return newParticle
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach(particle => {
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add glow effect
        ctx.shadowBlur = 20
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.restore()
      })

      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            ctx.save()
            ctx.globalAlpha = (120 - distance) / 120 * 0.1
            ctx.strokeStyle = '#FFD700'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseenter', handleMouseEnter)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Start animation
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ zIndex: 1 }}
    />
  )
}

export default InteractiveParticles
