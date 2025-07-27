'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, Globe, Bell, User, ChevronDown, Award, Users, Target, TrendingUp, Building2, FileText, Phone, MapPin } from 'lucide-react'
import LiquidNav from './LiquidNav'
import EnhancedNavigation from './EnhancedNavigation'
import { motion, AnimatePresence } from 'framer-motion'
import ErrorBoundary from './ui/ErrorBoundary'

// For now, just show auth links without checking session state
// This makes the header work without requiring SessionProvider

// Simple fallback navigation component
const SimpleNavigation = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/')
  
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Partner', href: '/partner' },
    { label: 'Invest', href: '/invest' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <nav className="hidden lg:flex items-center space-x-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
            isActive(item.href)
              ? 'bg-primary-gold/10 text-primary-gold font-semibold'
              : 'text-primary-silver hover:text-primary-gold hover:bg-primary-gold/5'
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

  // Hide header on portal pages for focused app experience
  const isPortalPage = pathname.startsWith('/investor-portal') || pathname.startsWith('/partner-portal')
  
  // Don't render header at all on portal pages
  if (isPortalPage) {
    return null
  }

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
        <div className="flex justify-between items-center h-14">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-primary-gold">
                Hawlton
              </Link>
            </div>

            {/* Desktop Navigation - Enhanced Navigation */}
            <ErrorBoundary fallback={<SimpleNavigation />}>
              <EnhancedNavigation />
            </ErrorBoundary>
          </div>

          {/* CTA Buttons Section - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/partner"
              className={`btn btn-sm btn-outline ${
                isActive('/partner') 
                  ? 'bg-primary-gold text-primary-navy shadow-md' 
                  : ''
              }`}
            >
              Partner
            </Link>
            <Link
              href="/invest"
              className={`btn btn-sm btn-outline ${
                isActive('/invest') 
                  ? 'bg-primary-gold text-primary-navy shadow-md' 
                  : ''
              }`}
            >
              Invest
            </Link>
            <Link
              href="/auth/signup"
              className="btn btn-sm btn-primary"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-primary-silver hover:text-primary-white transition-colors duration-200 focus:outline-none focus:ring-0"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-primary-navy">
              <Link
                href="/"
                className={`block px-3 py-2 hover:text-primary-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                  isActive('/') ? 'text-primary-gold font-semibold' : 'text-primary-silver'
                }`}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 hover:text-primary-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                  isActive('/about') ? 'text-primary-gold font-semibold' : 'text-primary-silver'
                }`}
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <Link
                href="/solutions"
                className={`block px-3 py-2 hover:text-primary-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                  isActive('/solutions') ? 'text-primary-gold font-semibold' : 'text-primary-silver'
                }`}
                onClick={toggleMenu}
              >
                Our Solutions
              </Link>
              <Link
                href="/careers"
                className={`block px-3 py-2 hover:text-primary-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                  isActive('/careers') ? 'text-primary-gold font-semibold' : 'text-primary-silver'
                }`}
                onClick={toggleMenu}
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 hover:text-primary-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                  isActive('/contact') ? 'text-primary-gold font-semibold' : 'text-primary-silver'
                }`}
                onClick={toggleMenu}
              >
                Contact
              </Link>
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-3 border-t border-primary-silver/20">
                <Link
                  href="/partner"
                  className={`block w-full border border-primary-gold px-4 py-2.5 font-semibold text-center transition-all duration-200 ${
                    isActive('/partner') 
                      ? 'bg-primary-gold text-primary-navy shadow-lg' 
                      : 'bg-transparent text-primary-gold hover:bg-primary-gold hover:text-primary-navy'
                  }`}
                  onClick={toggleMenu}
                >
                  Partner With Us
                </Link>
                <Link
                  href="/invest"
                  className={`block w-full border border-primary-gold px-4 py-2.5 font-semibold text-center transition-all duration-200 ${
                    isActive('/invest') 
                      ? 'bg-primary-gold text-primary-navy shadow-lg' 
                      : 'bg-transparent text-primary-gold hover:bg-primary-gold hover:text-primary-navy'
                  }`}
                  onClick={toggleMenu}
                >
                  Invest With Us
                </Link>
                <Link
                  href="/auth/signup"
className="block w-full bg-primary-gold hover:bg-primary-gold/90 text-primary-navy px-4 py-3 font-semibold text-center transition-all duration-200 transform hover:scale-105 shadow-lg"
                  onClick={toggleMenu}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
