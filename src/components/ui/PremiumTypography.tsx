'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface PremiumTypographyProps {
  children: React.ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'lead' | 'body'
  gradient?: boolean
  animated?: boolean
  staggerWords?: boolean
  highlightWords?: string[]
  glowOnHover?: boolean
  className?: string
  id?: string
}

const PremiumTypography = ({
  children,
  variant = 'body',
  gradient = false,
  animated = true,
  staggerWords = false,
  highlightWords = [],
  glowOnHover = false,
  className = '',
  id
}: PremiumTypographyProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)

  // Convert text to words array for stagger animation
  const getWords = (text: string | React.ReactNode): string[] => {
    if (typeof text === 'string') {
      return text.split(' ')
    }
    return []
  }

  // Render content with highlighted words
  const renderContent = () => {
    if (typeof children !== 'string') {
      return children
    }

    const words = children.split(' ')
    
    return words.map((word, index) => {
      const isHighlighted = highlightWords.some(hw => 
        word.toLowerCase().includes(hw.toLowerCase())
      )
      
      if (staggerWords && animated) {
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: 'easeOut'
            }}
            className={`inline-block mr-1 ${
              isHighlighted
                ? 'text-primary-gold font-semibold bg-gradient-to-r from-primary-gold to-metallic-gold bg-clip-text text-transparent'
                : ''
            }`}
          >
            {word}
          </motion.span>
        )
      }

      return (
        <span
          key={index}
          className={`${
            isHighlighted
              ? 'text-primary-gold font-semibold bg-gradient-to-r from-primary-gold to-metallic-gold bg-clip-text text-transparent'
              : ''
          }`}
        >
          {word}{' '}
        </span>
      )
    })
  }

  // Typography variants with responsive classes
  const variantClasses = {
    h1: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight',
    h2: 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight',
    h3: 'text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight tracking-tight',
    h4: 'text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold leading-normal',
    h5: 'text-base md:text-lg lg:text-xl xl:text-2xl font-medium leading-normal',
    h6: 'text-sm md:text-base lg:text-lg xl:text-xl font-medium leading-normal',
    lead: 'text-base md:text-lg lg:text-xl font-normal leading-relaxed',
    body: 'text-sm md:text-base font-normal leading-relaxed'
  }

  // Gradient classes
  const gradientClass = gradient
    ? 'bg-gradient-to-r from-primary-gold via-metallic-gold to-primary-gold bg-clip-text text-transparent'
    : ''

  // Glow effect classes
  const glowClass = glowOnHover && isHovered
    ? 'drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-all duration-300'
    : 'transition-all duration-300'

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerWords ? 0.1 : 0,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as any }
    }
  }

  // Element to render
  const Element = variant as keyof React.JSX.IntrinsicElements

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  if (!animated) {
    const TagName = variant as any
    return (
      <TagName
        ref={ref}
        id={id}
        className={`${variantClasses[variant]} ${gradientClass} ${glowClass} ${className}`}
        onMouseEnter={glowOnHover ? handleMouseEnter : undefined}
        onMouseLeave={glowOnHover ? handleMouseLeave : undefined}
      >
        {typeof children === 'string' ? renderContent() : children}
      </TagName>
    )
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={glowOnHover ? handleMouseEnter : undefined}
      onMouseLeave={glowOnHover ? handleMouseLeave : undefined}
    >
      <div
        id={id}
        className={`${variantClasses[variant]} ${gradientClass} ${glowClass} ${className}`}
      >
        {staggerWords && typeof children === 'string' ? renderContent() : (
          <motion.span variants={itemVariants}>
            {typeof children === 'string' ? renderContent() : children}
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}

export default PremiumTypography
