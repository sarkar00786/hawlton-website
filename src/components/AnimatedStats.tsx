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
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}
    >
      {stats.map((stat, index) => {
        const progressWidth = getProgressWidth(stat)
        
        return (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Stat Value */}
            <div className="mb-6">
              <div className="text-5xl font-bold text-gray-900 mb-3">
                {stat.value}
              </div>
              <h3 className="text-lg font-semibold text-gray-700 leading-tight">
                {stat.label}
              </h3>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Market Potential</span>
                <span className="font-bold text-gray-900">
                  {progressWidth}%
                </span>
              </div>
              
              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gray-900 rounded-full"
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
