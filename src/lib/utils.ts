import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Animation utility functions
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Form validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+92|0)?[0-9]{10}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Text utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Debounce utility
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Local storage utilities
export const setLocalStorage = (key: string, value: unknown): void => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }
}

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== 'undefined') {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return defaultValue
    }
  }
  return defaultValue
}

// Scroll utilities
export const scrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId)
  if (element) {
    const top = element.offsetTop - offset
    window.scrollTo({
      top,
      behavior: 'smooth'
    })
  }
}

// Format utilities
export const formatCurrency = (amount: number, currency: string = 'PKR'): string => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: currency === 'PKR' ? 'PKR' : 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// SEO utilities
export const generateMetaTags = (
  title: string,
  description: string,
  url?: string,
  image?: string
) => ({
  title: `${title} | Hawlton`,
  description,
  openGraph: {
    title: `${title} | Hawlton`,
    description,
    url: url || 'https://hawlton.com',
    images: [
      {
        url: image || 'https://hawlton.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    siteName: 'Hawlton',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | Hawlton`,
    description,
    images: [image || 'https://hawlton.com/og-image.jpg'],
  },
})

// Theme utilities for dynamic theming
export const getThemeColors = () => ({
  primary: {
    navy: '#1A3A5F',
    platinum: '#F5F8FA',
    white: '#FFFFFF',
    silver: '#A0B0C0',
    charcoal: '#333333',
    gold: '#FFD700',
    goldMetallic: '#FFD700',
  },
  gradients: {
    gold: 'linear-gradient(135deg, #FFD700 0%, #FFD700 100%)',
    navy: 'linear-gradient(135deg, #1A3A5F 0%, #2A4A6F 100%)',
    platinum: 'linear-gradient(135deg, #F5F8FA 0%, #E6EAED 100%)',
  }
})
