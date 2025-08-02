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
  progressWidth?: number
  category?: 'opportunity' | 'gap' | 'growth' | 'market'
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
      controls.start("visible")
    }
  }, [isInView, controls])

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

  const progressVariants = {
    hidden: { width: '0%', opacity: 0 },
    visible: (width: number) => ({
      width: `${width}%`,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut"
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

  const getProgressWidth = (stat: StatItem) => {
    // For percentages, use the percentage directly
    if (stat.value.includes('%')) {
      return parseInt(stat.value.replace('%', ''))
    }
    // For $10B, show as 75% (representing significant market opportunity)
    if (stat.value.includes('$10B')) {
      return 75
    }
    // For 75M, show as 60% (representing user base)
    if (stat.value.includes('75M')) {
      return 60
    }
    // Default fallback
    return 50
  }

  const getBarColor = (stat: StatItem) => {
    // Color coding based on what the statistic represents
    return 'bg-primary-gold' // Use gold for all bars to match theme
  }

  return (
    <motion.div
      ref={containerRef}
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      whileHover={{ scale: 1.02 }}
    >
      {animatedStats.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-platinum hover:border-primary-gold/30"
          variants={itemVariants}
          whileHover={{ y: -4 }}
        >
          {/* Stat Value and Label */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-bold text-primary-navy">{stat.value}</span>
            <span className="text-sm text-primary-charcoal font-medium text-right max-w-[60%]">{stat.label}</span>
          </div>
          
          {/* Progress Bar Background */}
          <div className="w-full bg-primary-platinum rounded-full h-5 mb-3 shadow-inner overflow-hidden">
            {/* Animated Progress Bar */}
            <motion.div
              className="h-5 rounded-full shadow-lg bg-gradient-to-r from-primary-gold to-metallic-gold relative overflow-hidden"
              initial={{ width: '0%' }}
              animate={isInView ? { width: `${getProgressWidth(stat)}%` } : { width: '0%' }}
              transition={{
                duration: 1.8,
                ease: "easeOut",
                delay: index * 0.3
              }}
              whileHover={{
                scaleY: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>
          
          {/* Progress Percentage */}
          <motion.div
            className="text-right text-xs text-primary-silver font-medium"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {getProgressWidth(stat)}% of potential
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default AnimatedStats
