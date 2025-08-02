'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })

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

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {stats.map((stat, index) => {
        const progressWidth = getProgressWidth(stat)
        
        return (
          <div
            key={index}
            className="bg-white rounded-lg border border-primary-navy/10 p-6 shadow-sm hover:shadow-md hover:border-primary-navy/20 transition-all duration-300"
          >
            {/* Stat Value */}
            <div className="mb-4">
              <div className="text-3xl font-bold text-primary-navy mb-2">
                {stat.value}
              </div>
              <h3 className="text-sm font-semibold text-primary-charcoal leading-tight">
                {stat.label}
              </h3>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-primary-silver font-medium">Market Potential</span>
                <span className="font-bold text-primary-navy">
                  {progressWidth}%
                </span>
              </div>
              
              <div className="relative h-1.5 bg-primary-platinum rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-primary-navy rounded-full"
                  initial={{ width: '0%' }}
                  animate={isInView ? { width: `${progressWidth}%` } : { width: '0%' }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    delay: index * 0.15
                  }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AnimatedStats
