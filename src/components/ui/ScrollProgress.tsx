'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ScrollProgressProps {
  showReadingTime?: boolean
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ showReadingTime = false }) => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrolled = window.scrollY
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxHeight > 0 ? (scrolled / maxHeight) * 100 : 0
      setScrollProgress(progress)
    }

    // Throttle scroll events for better performance
    let timeoutId: NodeJS.Timeout
    const throttledUpdateScrollProgress = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateScrollProgress, 10)
    }

    window.addEventListener('scroll', throttledUpdateScrollProgress)
    updateScrollProgress() // Initial call

    return () => {
      window.removeEventListener('scroll', throttledUpdateScrollProgress)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50 pointer-events-none">
      <motion.div
        className="h-full bg-primary-gold shadow-sm"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      />
    </div>
  )
}

export default ScrollProgress
