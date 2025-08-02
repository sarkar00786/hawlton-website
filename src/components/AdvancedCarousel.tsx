'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

interface CarouselSlide {
  id: string
  title: string
  description: string
  image?: string
  video?: string
  content?: React.ReactNode
  link?: string
  category?: string
}

interface AdvancedCarouselProps {
  slides: CarouselSlide[]
  autoplay?: boolean
  autoplayInterval?: number
  showDots?: boolean
  showArrows?: boolean
  pauseOnHover?: boolean
  swipeThreshold?: number
  className?: string
  slideClassName?: string
}

const AdvancedCarousel: React.FC<AdvancedCarouselProps> = ({
  slides,
  autoplay = true,
  autoplayInterval = 5000,
  showDots = true,
  showArrows = true,
  pauseOnHover = true,
  swipeThreshold = 50,
  className = '',
  slideClassName = ''
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [dragStart, setDragStart] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-progression logic
  useEffect(() => {
    if (isPlaying && slides.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, autoplayInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, slides.length, autoplayInterval])

  // Pause on hover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPlaying(false)
    }
  }, [pauseOnHover])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && autoplay) {
      setIsPlaying(true)
    }
  }, [pauseOnHover, autoplay])

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    
    // Track navigation
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'carousel_navigation', {
        event_category: 'Content Engagement',
        event_label: 'Previous Slide',
        slide_index: currentSlide
      })
    }
  }, [slides.length, currentSlide])

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    
    // Track navigation
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'carousel_navigation', {
        event_category: 'Content Engagement',
        event_label: 'Next Slide',
        slide_index: currentSlide
      })
    }
  }, [slides.length, currentSlide])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    
    // Track direct navigation
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'carousel_dot_click', {
        event_category: 'Content Engagement',
        event_label: `Slide ${index + 1}`,
        slide_index: index
      })
    }
  }, [])

  // Touch/Swipe handling
  const handleDragStart = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragStart(info.point.x)
    setIsDragging(true)
  }, [])

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const dragDistance = info.point.x - dragStart
    
    if (Math.abs(dragDistance) > swipeThreshold) {
      if (dragDistance > 0) {
        goToPrevious()
      } else {
        goToNext()
      }
    }
  }, [dragStart, swipeThreshold, goToPrevious, goToNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious()
      } else if (event.key === 'ArrowRight') {
        goToNext()
      } else if (event.key === ' ') {
        event.preventDefault()
        setIsPlaying(!isPlaying)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext, isPlaying])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div 
      ref={carouselRef}
      className={`relative w-full overflow-hidden rounded-xl shadow-2xl bg-primary-navy/10 backdrop-blur-sm ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Carousel Container */}
      <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
        <AnimatePresence mode="wait" custom={currentSlide}>
          <motion.div
            key={currentSlide}
            custom={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ 
              duration: 0.5, 
              ease: "easeInOut",
              type: "tween"
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={`absolute inset-0 cursor-grab active:cursor-grabbing ${slideClassName}`}
          >
            <div className="relative w-full h-full">
              {/* Slide Background */}
              {slides[currentSlide]?.image && (
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ 
                    backgroundImage: `url(${slides[currentSlide].image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-primary-navy/80" />
                </div>
              )}

              {/* Video Background */}
              {slides[currentSlide]?.video && (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={slides[currentSlide].video} type="video/mp4" />
                </video>
              )}

              {/* Slide Content */}
              <div className="relative z-10 h-full flex items-center justify-start p-8 md:p-12 lg:p-16">
                <div className="max-w-2xl text-left">
                  {slides[currentSlide]?.category && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block px-4 py-2 bg-primary-gold/20 text-primary-gold text-sm font-semibold rounded-full mb-4 backdrop-blur-sm"
                    >
                      {slides[currentSlide].category}
                    </motion.div>
                  )}
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-white mb-6 leading-tight"
                  >
                    {slides[currentSlide]?.title}
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-primary-silver mb-8 leading-relaxed max-w-xl"
                  >
                    {slides[currentSlide]?.description}
                  </motion.p>

                  {slides[currentSlide]?.link && (
                    <motion.a
                      href={slides[currentSlide].link}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="inline-flex items-center px-6 py-3 bg-primary-gold hover:bg-primary-gold/90 text-primary-navy font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Learn More
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  )}

                  {/* Custom Content */}
                  {slides[currentSlide]?.content && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {slides[currentSlide].content}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary-navy/80 hover:bg-primary-navy text-primary-gold hover:text-primary-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary-navy/80 hover:bg-primary-navy text-primary-gold hover:text-primary-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Play/Pause Button */}
      {autoplay && slides.length > 1 && (
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 w-10 h-10 bg-primary-navy/80 hover:bg-primary-navy text-primary-gold hover:text-primary-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm z-20"
          aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      )}

      {/* Dots Indicator */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary-gold scale-125 shadow-lg'
                  : 'bg-primary-silver/50 hover:bg-primary-silver'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoplay && isPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-silver/20 z-20">
          <motion.div
            className="h-full bg-primary-gold"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: autoplayInterval / 1000,
              ease: "linear",
              repeat: Infinity
            }}
            key={currentSlide}
          />
        </div>
      )}
    </div>
  )
}

export default AdvancedCarousel
