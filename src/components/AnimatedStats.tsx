'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useAnimation, useMotionValue, useTransform } from 'framer-motion'

interface StatItem {
  value: string
  label: string
  prefix?: string
  suffix?: string
  animatedValue?: number
  icon?: React.ReactNode
  color?: string
  progressWidth?: number
  category?: 'opportunity' | 'gap' | 'growth' | 'market'
}

interface AnimatedStatsProps {
  stats: StatItem[]
  className?: string
}

const AnimatedCounter = ({ from = 0, to, duration = 2, delay = 0, prefix = '', suffix = '' }: {
  from?: number
  to: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
}) => {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => {
    if (to >= 1000000) {
      return `${prefix}${(latest / 1000000).toFixed(0)}M${suffix}`
    } else if (to >= 1000) {
      return `${prefix}${(latest / 1000).toFixed(0)}K${suffix}`
    } else if (to >= 10) {
      return `${prefix}${Math.round(latest)}${suffix}`
    } else {
      return `${prefix}${latest.toFixed(1)}${suffix}`
    }
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      count.set(to)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [count, to, delay])

  return <motion.span>{rounded}</motion.span>
}

const AnimatedStats = ({ stats, className = '' }: AnimatedStatsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 20,
        mass: 1
      }
    }
  }

  const getProgressWidth = (stat: StatItem) => {
    if (stat.value.includes('%')) {
      return parseInt(stat.value.replace('%', ''))
    }
    if (stat.value.includes('$10B')) return 85
    if (stat.value.includes('75M')) return 75
    if (stat.value.includes('40%')) return 40
    if (stat.value.includes('95%')) return 95
    return 60
  }

  const getStatColor = (stat: StatItem, index: number) => {
    const colors = [
      { bg: 'from-blue-500/10 to-blue-600/5', border: 'border-blue-200/50', accent: 'text-blue-600', progress: 'from-blue-500 to-blue-600' },
      { bg: 'from-emerald-500/10 to-emerald-600/5', border: 'border-emerald-200/50', accent: 'text-emerald-600', progress: 'from-emerald-500 to-emerald-600' },
      { bg: 'from-amber-500/10 to-amber-600/5', border: 'border-amber-200/50', accent: 'text-amber-600', progress: 'from-amber-500 to-amber-600' },
      { bg: 'from-purple-500/10 to-purple-600/5', border: 'border-purple-200/50', accent: 'text-purple-600', progress: 'from-purple-500 to-purple-600' },
    ]
    return colors[index % colors.length]
  }

  const parseNumericValue = (value: string) => {
    if (value.includes('$10B')) return 10
    if (value.includes('75M')) return 75
    if (value.includes('95%')) return 95
    if (value.includes('40%')) return 40
    return parseInt(value.replace(/[^0-9]/g, '')) || 0
  }

  return (
    <motion.div
      ref={containerRef}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {stats.map((stat, index) => {
        const colors = getStatColor(stat, index)
        const progressWidth = getProgressWidth(stat)
        const numericValue = parseNumericValue(stat.value)
        
        return (
          <motion.div
            key={index}
            className={`relative group overflow-hidden bg-gradient-to-br ${colors.bg} backdrop-blur-sm rounded-2xl p-8 border ${colors.border} hover:border-opacity-80 transition-all duration-500`}
            variants={itemVariants}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-2xl" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Header with animated value */}
              <div className="mb-6">
                <motion.div 
                  className={`text-4xl md:text-5xl font-black tracking-tight ${colors.accent} mb-2`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: "easeOut" }}
                >
                  {stat.value.includes('$') && (
                    <span className="text-2xl md:text-3xl">$</span>
                  )}
                  {isInView && (
                    <AnimatedCounter 
                      to={numericValue} 
                      duration={2} 
                      delay={index * 0.2 + 0.5}
                      suffix={stat.value.includes('B') ? 'B' : stat.value.includes('M') ? 'M' : stat.value.includes('%') ? '%' : ''}
                    />
                  )}
                </motion.div>
                
                <motion.h3 
                  className="text-gray-700 font-semibold text-lg leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {stat.label}
                </motion.h3>
              </div>

              {/* Modern Progress Indicator */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Market Potential</span>
                  <motion.span 
                    className={`font-bold ${colors.accent}`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: index * 0.2 + 0.8 }}
                  >
                    {progressWidth}%
                  </motion.span>
                </div>
                
                {/* Progress Track */}
                <div className="relative h-2 bg-gray-200/50 rounded-full overflow-hidden">
                  {/* Animated Progress Bar */}
                  <motion.div
                    className={`absolute left-0 top-0 h-full bg-gradient-to-r ${colors.progress} rounded-full relative overflow-hidden`}
                    initial={{ width: '0%', opacity: 0.7 }}
                    animate={isInView ? { width: `${progressWidth}%`, opacity: 1 } : { width: '0%', opacity: 0.7 }}
                    transition={{
                      width: { duration: 1.5, ease: "easeOut", delay: index * 0.2 + 0.6 },
                      opacity: { duration: 0.3, delay: index * 0.2 + 0.6 }
                    }}
                  >
                    {/* Animated Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "linear",
                        delay: index * 0.3 + 1
                      }}
                    />
                  </motion.div>
                  
                  {/* Progress Glow Effect */}
                  <motion.div
                    className={`absolute left-0 top-0 h-full bg-gradient-to-r ${colors.progress} rounded-full blur-sm opacity-50`}
                    initial={{ width: '0%' }}
                    animate={isInView ? { width: `${progressWidth}%` } : { width: '0%' }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                      delay: index * 0.2 + 0.6
                    }}
                  />
                </div>
              </div>

              {/* Subtle indicator dots */}
              <motion.div 
                className="flex space-x-1 mt-4 justify-end"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.1 + 1 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${colors.progress.includes('blue') ? 'bg-blue-400' : colors.progress.includes('emerald') ? 'bg-emerald-400' : colors.progress.includes('amber') ? 'bg-amber-400' : 'bg-purple-400'}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.6 }}
                    transition={{ delay: index * 0.1 + 1.2 + i * 0.1 }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Hover Glow Effect */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${colors.progress} opacity-0 rounded-2xl blur-xl`}
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default AnimatedStats
