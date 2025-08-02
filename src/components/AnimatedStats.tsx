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
    if (stat.label.includes('Lack') || stat.label.includes('Gap')) {
      return 'bg-red-500' // Red for gaps/problems
    }
    if (stat.label.includes('Growth') || stat.label.includes('Market')) {
      return 'bg-green-500' // Green for growth/opportunities
    }
    if (stat.label.includes('Users') || stat.label.includes('Ready')) {
      return 'bg-blue-500' // Blue for user metrics
    }
    return 'bg-primary-gold' // Default gold
  }

  return (
    <motion.div
      ref={containerRef}
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {animatedStats.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
          variants={itemVariants}
        >
          {/* Stat Value and Label */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-bold text-primary-navy">{stat.value}</span>
            <span className="text-sm text-primary-charcoal font-medium text-right max-w-[60%]">{stat.label}</span>
          </div>
          
          {/* Progress Bar Background */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            {/* Animated Progress Bar */}
            <motion.div
              className={`h-3 rounded-full ${getBarColor(stat)}`}
              initial={{ width: '0%' }}
              animate={isInView ? { width: `${getProgressWidth(stat)}%` } : { width: '0%' }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                delay: index * 0.2
              }}
            />
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
