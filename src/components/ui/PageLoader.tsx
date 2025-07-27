'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PageLoaderProps {
  isLoading: boolean
  loadingText?: string
  showProgress?: boolean
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  isLoading, 
  loadingText = "Loading...", 
  showProgress = true 
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev
          return prev + Math.random() * 15
        })
      }, 200)

      return () => clearInterval(interval)
    } else {
      setProgress(100)
      setTimeout(() => setProgress(0), 500)
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Full screen overlay */}
          <motion.div
            className="fixed inset-0 bg-primary-navy/90 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              {/* Animated Logo/Spinner */}
              <motion.div
                className="relative mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="w-16 h-16 mx-auto relative">
                  {/* Outer ring */}
                  <motion.div
                    className="absolute inset-0 border-4 border-primary-gold/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Inner spinning element */}
                  <motion.div
                    className="absolute inset-2 border-4 border-transparent border-t-primary-gold rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Center dot */}
                  <div className="absolute inset-6 bg-primary-gold rounded-full" />
                </div>
              </motion.div>

              {/* Loading text */}
              <motion.h2 
                className="text-2xl font-bold text-primary-white mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {loadingText}
              </motion.h2>

              {/* Progress bar */}
              {showProgress && (
                <motion.div
                  className="w-64 mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="bg-primary-silver/20 rounded-full h-2 mb-2">
                    <motion.div
                      className="bg-primary-gold h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-primary-silver text-sm">
                    {Math.round(progress)}%
                  </p>
                </motion.div>
              )}

              {/* Animated dots */}
              <motion.div 
                className="flex justify-center space-x-1 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-primary-gold rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Top progress bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-primary-gold/20 z-[60]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            style={{ transformOrigin: '0%' }}
          >
            <motion.div
              className="h-full bg-primary-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              style={{ transformOrigin: '0%' }}
              transition={{ ease: "easeOut" }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Mini loader for smaller components
interface MiniLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export const MiniLoader: React.FC<MiniLoaderProps> = ({ 
  size = 'md', 
  color = 'text-primary-gold' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} relative`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className={`absolute inset-0 border-2 border-transparent border-t-current rounded-full ${color}`} />
    </motion.div>
  )
}

export default PageLoader
