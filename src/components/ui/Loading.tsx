'use client'

import { motion } from 'framer-motion'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullscreen?: boolean
  className?: string
}

export default function Loading({ 
  size = 'md', 
  text = 'Loading...', 
  fullscreen = false,
  className = ''
}: LoadingProps) {
  const sizeConfig = {
    sm: { 
      spinner: 'w-6 h-6', 
      text: 'text-sm',
      container: 'p-4'
    },
    md: { 
      spinner: 'w-8 h-8', 
      text: 'text-base',
      container: 'p-6'
    },
    lg: { 
      spinner: 'w-12 h-12', 
      text: 'text-lg',
      container: 'p-8'
    }
  }

  const config = sizeConfig[size]

  const containerClass = fullscreen 
    ? 'fixed inset-0 bg-primary-platinum/80 backdrop-blur-sm flex items-center justify-center z-50'
    : `flex flex-col items-center justify-center ${config.container} ${className}`

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center space-y-4">
        {/* Hawlton Logo Spinner */}
        <motion.div
          className={`relative ${config.spinner}`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 border-4 border-primary-gold/20 rounded-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          {/* Inner rotating element */}
          <motion.div
            className="absolute inset-2 border-4 border-t-primary-gold border-r-transparent border-b-transparent border-l-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Center dot */}
          <motion.div
            className="absolute inset-0 m-auto w-2 h-2 bg-primary-navy rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.div
          className={`${config.text} font-semibold text-primary-navy text-center`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.div>

        {/* Loading dots */}
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-primary-gold rounded-full"
              animate={{
                y: [-4, 4, -4],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Brand subtitle for fullscreen */}
        {fullscreen && (
          <motion.p
            className="text-primary-silver text-sm mt-4 max-w-xs text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Empowering Pakistan&apos;s Digital Future
          </motion.p>
        )}
      </div>
    </div>
  )
}

// Skeleton loading component for content
export function ContentSkeleton({ 
  lines = 3, 
  className = '' 
}: { 
  lines?: number
  className?: string 
}) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-primary-silver/20 rounded ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  )
}

// Card skeleton for loading cards
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white p-6 rounded-xl shadow-sm ${className}`}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-primary-silver/20 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-primary-silver/20 rounded w-3/4" />
          <div className="h-3 bg-primary-silver/20 rounded w-1/2" />
        </div>
      </div>
      <ContentSkeleton lines={2} />
    </div>
  )
}
