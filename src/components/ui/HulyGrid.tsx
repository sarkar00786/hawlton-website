'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface HulyGridProps {
  className?: string
  intensity?: 'low' | 'medium' | 'high'
  interactive?: boolean
}

const HulyGrid = ({ 
  className = '', 
  intensity = 'medium',
  interactive = true 
}: HulyGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Grid configuration based on intensity
  const config = {
    low: { cellSize: 80, opacity: 0.02, hoverOpacity: 0.08 },
    medium: { cellSize: 60, opacity: 0.03, hoverOpacity: 0.12 },
    high: { cellSize: 40, opacity: 0.04, hoverOpacity: 0.16 }
  }

  const { cellSize, opacity, hoverOpacity } = config[intensity]

  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

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

  // Generate grid cells
  const generateGridCells = () => {
    if (typeof window === 'undefined') return []
    
    const cells = []
    const cols = Math.ceil(window.innerWidth / cellSize)
    const rows = Math.ceil(window.innerHeight / cellSize)

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellSize
        const y = row * cellSize
        
        // Calculate distance from mouse for hover effect
        const distanceFromMouse = Math.sqrt(
          Math.pow(mousePos.x - (x + cellSize / 2), 2) + 
          Math.pow(mousePos.y - (y + cellSize / 2), 2)
        )
        
        const isNearMouse = distanceFromMouse < 120
        const shouldShowOutline = isHovering && isNearMouse

        cells.push(
          <motion.div
            key={`${row}-${col}`}
            className="absolute border border-accent-primary/10"
            style={{
              left: x,
              top: y,
              width: cellSize,
              height: cellSize,
            }}
            animate={{
              opacity: shouldShowOutline ? hoverOpacity : opacity,
              borderColor: shouldShowOutline 
                ? 'rgba(255, 215, 0, 0.2)' 
                : 'rgba(255, 215, 0, 0.05)',
              scale: shouldShowOutline ? 1.02 : 1,
            }}
            transition={{
              duration: 0.2,
              ease: 'easeOut'
            }}
          />
        )
      }
    }
    return cells
  }

  // Social media post outline effect
  const PostOutlines = () => {
    if (!isHovering) return null

    const outlines = []
    const numOutlines = 3

    for (let i = 0; i < numOutlines; i++) {
      const offsetX = (Math.random() - 0.5) * 200
      const offsetY = (Math.random() - 0.5) * 200
      
      outlines.push(
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: mousePos.x + offsetX - 150,
            top: mousePos.y + offsetY - 100,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          {/* Social media post-like outline */}
          <div className="w-72 h-48 border border-accent-primary/20 rounded-lg bg-gradient-to-br from-accent-primary/5 to-transparent backdrop-blur-sm">
            {/* Header */}
            <div className="p-3 border-b border-accent-primary/10">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-accent-primary/20"></div>
                <div className="w-16 h-2 bg-accent-primary/15 rounded"></div>
              </div>
            </div>
            {/* Content area */}
            <div className="p-3 space-y-2">
              <div className="w-full h-2 bg-accent-primary/10 rounded"></div>
              <div className="w-3/4 h-2 bg-accent-primary/10 rounded"></div>
              <div className="w-1/2 h-2 bg-accent-primary/10 rounded"></div>
            </div>
            {/* Footer */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between">
              <div className="flex space-x-4">
                <div className="w-4 h-4 bg-accent-primary/15 rounded"></div>
                <div className="w-4 h-4 bg-accent-primary/15 rounded"></div>
                <div className="w-4 h-4 bg-accent-primary/15 rounded"></div>
              </div>
              <div className="w-4 h-4 bg-accent-primary/15 rounded"></div>
            </div>
          </div>
        </motion.div>
      )
    }

    return <>{outlines}</>
  }

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Base grid */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 215, 0, ${opacity}) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 215, 0, ${opacity}) 1px, transparent 1px)
            `,
            backgroundSize: `${cellSize}px ${cellSize}px`
          }}
        />
      </div>

      {/* Interactive grid cells */}
      {interactive && (
        <div className="absolute inset-0">
          {generateGridCells()}
        </div>
      )}

      {/* Social media post outlines */}
      <PostOutlines />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/5 via-transparent to-primary-navy/5 pointer-events-none" />
    </div>
  )
}

export default HulyGrid
