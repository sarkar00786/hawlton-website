'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'

// Animation hook for scroll-triggered animations
export const useScrollAnimation = (threshold: number = 0.1, triggerOnce: boolean = true) => {
  const { ref, inView, entry } = useInView({
    threshold,
    triggerOnce,
  })

  return {
    ref,
    inView,
    entry,
    variants: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.04, 0.62, 0.23, 0.98]
        }
      }
    }
  }
}

// Stagger animation hook
export const useStaggerAnimation = (delay: number = 0.1) => {
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: delay,
          delayChildren: 0.1
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.04, 0.62, 0.23, 0.98] as const
        }
      }
    }
  }
}

// Mouse tracking hook for interactive elements
export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return mousePosition
}

// Scroll progress hook
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return scrollProgress
}

// Local storage hook with type safety
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}

// Debounced value hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Previous value hook
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// Window size hook
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial size
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

// Media query hook
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

// Intersection observer hook for lazy loading
export const useLazyLoad = (options?: IntersectionObserverInit) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
        }
      },
      { threshold: 0.1, ...options }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [hasLoaded, options])

  return { ref: elementRef, isVisible, hasLoaded }
}

// Click outside hook
export const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handler])

  return ref
}

// Form submission hook
export const useFormSubmission = <T>(
  submitFn: (data: T) => Promise<unknown>,
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const submit = useCallback(async (data: T) => {
    setIsSubmitting(true)
    setError(null)
    setIsSuccess(false)

    try {
      await submitFn(data)
      setIsSuccess(true)
      onSuccess?.()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      onError?.(err)
    } finally {
      setIsSubmitting(false)
    }
  }, [submitFn, onSuccess, onError])

  const reset = useCallback(() => {
    setIsSubmitting(false)
    setError(null)
    setIsSuccess(false)
  }, [])

  return {
    submit,
    isSubmitting,
    error,
    isSuccess,
    reset
  }
}

// Scroll lock hook for modals
export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [isLocked])
}

// Page visibility hook
export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(!document.hidden)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return isVisible
}
