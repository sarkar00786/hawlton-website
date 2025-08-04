'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, Globe, Bell, User, ChevronDown, Award, Users, Target, TrendingUp, Building2, FileText, Phone, MapPin, Smartphone, Monitor } from 'lucide-react'
import EnhancedNavigation from './EnhancedNavigation'
import { motion, AnimatePresence } from 'framer-motion'
import ErrorBoundary from './ui/ErrorBoundary'
import { HeaderIds } from '@/config/elementIds'
import AuthButtons, { MobileAuthButtons } from './AuthButtons'

// Simple fallback navigation component
const SimpleNavigation = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/')
  
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Our Vision', href: '/our-vision' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Partnership', href: '/partnership' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <nav className="hidden lg:flex items-center space-x-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-3 py-1.5 rounded-md transition-all duration-200 text-sm relative ${
            isActive(item.href)
              ? 'bg-primary-gold/10 text-primary-gold font-semibold shadow-sm border border-primary-gold/20'
              : 'text-primary-silver hover:text-primary-gold hover:bg-primary-gold/5 hover:shadow-sm'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)


  const isActive = (path: string) => pathname === path


  // Professional scroll behavior - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Header becomes sticky after 50px
      setIsScrolled(currentScrollY > 50)
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false) // Hide on scroll down
      } else {
        setIsVisible(true) // Show on scroll up
      }
      
      setLastScrollY(currentScrollY)
    }

    // Throttle scroll events for better performance
    let timeoutId: NodeJS.Timeout
    const throttledHandleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 10)
    }

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
      clearTimeout(timeoutId)
    }
  }, [lastScrollY])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 w-full z-[9999]
        ${isScrolled ? 'bg-primary-navy/95 backdrop-blur-md shadow-xl' : 'bg-primary-navy/95 backdrop-blur-md shadow-lg'} 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-1 sm:space-x-4 lg:space-x-8">
            <div className="flex items-center space-x-1 sm:space-x-3">
              
              <div id="logo-wrapper" className="flex-shrink-0">
                <Link href="/" id="logo-main" className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-gold">
                  Hawlton
                </Link>
              </div>
            </div>

            {/* Desktop Navigation - Enhanced Navigation */}
            <ErrorBoundary fallback={<SimpleNavigation />}>
              <EnhancedNavigation />
            </ErrorBoundary>
          </div>

          {/* Auth Buttons Section - Desktop */}
          <AuthButtons />

          {/* Mobile menu button */}
          <div id="mobile-menu-btn-wrapper" className="md:hidden">
            <button
              id="mobile-menu-btn"
              onClick={toggleMenu}
              className="text-primary-silver hover:text-primary-white transition-colors duration-200 focus:outline-none focus:ring-0"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden" ref={mobileMenuRef}>
            <div className="px-4 pt-4 pb-6 space-y-2 bg-primary-navy border-t border-primary-gold/20">
              <Link
                href="/"
                className={`block px-4 py-3 rounded-lg text-base font-medium hover:text-primary-white hover:bg-primary-gold/10 transition-all duration-200 focus:outline-none focus:ring-0 min-h-[44px] flex items-center ${
                  isActive('/') ? 'text-primary-gold font-semibold bg-primary-gold/10' : 'text-primary-silver'
                }`}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/our-vision"
                className={`block px-4 py-3 rounded-lg text-base font-medium hover:text-primary-white hover:bg-primary-gold/10 transition-all duration-200 focus:outline-none focus:ring-0 min-h-[44px] flex items-center ${
                  isActive('/our-vision') ? 'text-primary-gold font-semibold bg-primary-gold/10' : 'text-primary-silver'
                }`}
                onClick={toggleMenu}
              >
                Our Vision
              </Link>
              <Link
                href="/solutions"
                className={`block px-4 py-3 rounded-lg text-base font-medium hover:text-primary-white hover:bg-primary-gold/10 transition-all duration-200 focus:outline-none focus:ring-0 min-h-[44px] flex items-center ${
                  isActive('/solutions') ? 'text-primary-gold font-semibold bg-primary-gold/10' : 'text-primary-silver'
                }`}
                onClick={toggleMenu}
              >
                Solutions
              </Link>
              <Link
                href="/contact"
                className={`block px-4 py-3 rounded-lg text-base font-medium hover:text-primary-white hover:bg-primary-gold/10 transition-all duration-200 focus:outline-none focus:ring-0 min-h-[44px] flex items-center ${
                  isActive('/contact') ? 'text-primary-gold font-semibold bg-primary-gold/10' : 'text-primary-silver'
                }`}
                onClick={toggleMenu}
              >
                Contact
              </Link>
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-primary-gold/20">
                <MobileAuthButtons onMenuClick={toggleMenu} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
