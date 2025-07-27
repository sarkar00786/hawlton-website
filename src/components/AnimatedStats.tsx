'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface StatItem {
  value: string
  label: string
  prefix?: string
  suffix?: string
  animatedValue?: number
  icon?: React.ReactNode
  color?: string
}

interface AnimatedStatsProps {
  stats: StatItem[]
  className?: string
}

const AnimatedStats = ({ stats, className = '' }: AnimatedStatsProps) => {
  const [animatedStats, setAnimatedStats] = useState<StatItem[]>(stats)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      // Start counter animations
      const animationPromises = stats.map((stat, index) => {
        const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''))
        
        if (!isNaN(numericValue)) {
          return new Promise<void>((resolve) => {
            let currentValue = 0
            const increment = numericValue / 60 // 60 frames for smooth animation
            const timer = setInterval(() => {
              currentValue += increment
              if (currentValue >= numericValue) {
                currentValue = numericValue
                clearInterval(timer)
                resolve()
              }
              
              setAnimatedStats(prev => {
                const updated = [...prev]
                updated[index] = {
                  ...updated[index],
                  animatedValue: currentValue
                }
                return updated
              })
            }, 16) // ~60fps
          })
        }
        return Promise.resolve()
      })

      Promise.all(animationPromises)
      controls.start("visible")
    }
  }, [isInView, stats, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  const formatDisplayValue = (stat: StatItem, index: number) => {
    const animatedValue = animatedStats[index]?.animatedValue
    
    if (animatedValue !== undefined) {
      const formattedValue = Math.floor(animatedValue)
      return `${stat.prefix || ''}${formattedValue}${stat.suffix || ''}`
    }
    
    return stat.value
  }

  return (
    <motion.div
      ref={containerRef}
      className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {animatedStats.map((stat, index) => (
        <motion.div
          key={index}
          className="relative text-center group"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
        >
          {/* Background glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-gold/10 to-transparent rounded-xl filter blur-xl opacity-0 group-hover:opacity-100"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          
          {/* Card content */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary-gold/10 group-hover:border-primary-gold/30 transition-colors duration-300">
            {/* Icon */}
            {stat.icon && (
              <motion.div 
                className="flex justify-center mb-4"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color || 'bg-primary-gold'} text-primary-navy`}>
                  {stat.icon}
                </div>
              </motion.div>
            )}
            
            {/* Animated value */}
            <motion.div 
              className="text-3xl font-bold text-primary-navy mb-2"
              animate={{
                textShadow: isInView ? [
                  "0 0 0px rgba(255, 215, 0, 0)",
                  "0 0 10px rgba(255, 215, 0, 0.3)",
                  "0 0 0px rgba(255, 215, 0, 0)"
                ] : "0 0 0px rgba(255, 215, 0, 0)"
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: index * 0.5
              }}
            >
              {formatDisplayValue(stat, index)}
            </motion.div>
            
            {/* Label */}
            <div className="text-sm text-primary-charcoal font-medium">
              {stat.label}
            </div>
            
            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-primary-gold opacity-0"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                delay: index * 0.7,
              }}
            />
            
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary-gold rounded-full opacity-60"
                  animate={{
                    x: [0, Math.random() * 100 - 50, 0],
                    y: [0, Math.random() * 100 - 50, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default AnimatedStats
