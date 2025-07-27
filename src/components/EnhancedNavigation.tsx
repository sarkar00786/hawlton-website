'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Award, Users, Target, TrendingUp, Building2, FileText, Phone, MapPin, Search, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const EnhancedNavigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [language, setLanguage] = useState('EN')
  const timeoutRef = useRef<NodeJS.Timeout>()
  const pathname = usePathname()

  const navigationItems = [
    {
      label: 'About Us',
      href: '/about',
      submenu: [
        { label: 'Overview', href: '/about', icon: Building2, description: 'Learn about Hawlton\'s mission and vision' },
        { label: 'Our Team', href: '/about/team', icon: Users, description: 'Meet our expert leadership team' },
        { label: 'Our Vision', href: '/about/vision', icon: Target, description: 'Our roadmap for Pakistan\'s digital future' },
        { label: 'Awards & Recognition', href: '/about/awards', icon: Award, description: 'Industry recognition and achievements' }
      ]
    },
    {
      label: 'Solutions',
      href: '/solutions',
      submenu: [
        { label: 'Digital Transformation', href: '/solutions/digital-transformation', icon: TrendingUp, description: 'Enterprise modernization solutions' },
        { label: 'Partnership Programs', href: '/solutions/partnerships', icon: Users, description: 'Strategic collaboration opportunities' },
        { label: 'Investment Services', href: '/solutions/investment', icon: Building2, description: 'Professional investment management' },
        { label: 'Success Stories', href: '/solutions/success-stories', icon: Award, description: 'Client transformation case studies' }
      ]
    },
    {
      label: 'Partner',
      href: '/partner',
      submenu: [
        { label: 'Partnership Types', href: '/partner/types', icon: Building2, description: 'Explore partnership opportunities' },
        { label: 'Application Process', href: '/partner/apply', icon: FileText, description: 'Step-by-step application guide' },
        { label: 'Partner Portal', href: '/partner/portal', icon: Users, description: 'Access partner resources' },
        { label: 'Resources', href: '/partner/resources', icon: Target, description: 'Tools and documentation' }
      ]
    },
    {
      label: 'Invest',
      href: '/invest',
      submenu: [
        { label: 'Investment Opportunities', href: '/invest/opportunities', icon: TrendingUp, description: 'Current investment options' },
        { label: 'Portfolio', href: '/invest/portfolio', icon: Building2, description: 'Our investment portfolio' },
        { label: 'Investor Relations', href: '/invest/relations', icon: Users, description: 'Connect with our investor team' },
        { label: 'Documentation', href: '/invest/docs', icon: FileText, description: 'Legal and compliance documents' }
      ]
    },
    {
      label: 'Contact',
      href: '/contact',
      submenu: [
        { label: 'Get in Touch', href: '/contact', icon: Phone, description: 'Contact our team directly' },
        { label: 'Office Locations', href: '/contact/locations', icon: MapPin, description: 'Find our offices across Pakistan' },
        { label: 'Careers', href: '/careers', icon: Users, description: 'Join our growing team' }
      ]
    }
  ]

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  }

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {/* Smart Search Integration */}
      <div className="relative mr-6">
        <div className="flex items-center bg-primary-navy/50 rounded-lg px-3 py-2 border border-primary-gold/20 focus-within:border-primary-gold transition-colors">
          <Search className="w-4 h-4 text-primary-silver mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-primary-white placeholder-primary-silver text-sm w-32 focus:w-48 transition-all focus:outline-none"
          />
        </div>
      </div>

      {/* Language Switcher */}
      <div className="relative mr-6">
        <button
          onClick={() => setLanguage(language === 'EN' ? 'UR' : 'EN')}
          className="flex items-center space-x-1 text-primary-silver hover:text-primary-gold transition-colors px-2 py-1 rounded"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{language}</span>
        </button>
      </div>

      {/* Main Navigation Items */}
      {navigationItems.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={item.href}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive(item.href)
                ? 'bg-primary-gold/10 text-primary-gold font-semibold'
                : 'text-primary-silver hover:text-primary-gold hover:bg-primary-gold/5'
            }`}
          >
            <span>{item.label}</span>
            {item.submenu && (
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === item.label ? 'rotate-180' : ''
                }`} 
              />
            )}
          </Link>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {activeDropdown === item.label && item.submenu && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-full left-0 mt-2 w-80 bg-primary-navy/95 backdrop-blur-md border border-primary-gold/20 rounded-xl shadow-2xl z-50"
              >
                <div className="p-4">
                  <div className="grid gap-3">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-primary-gold/10 transition-colors group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-gold/20 rounded-lg flex items-center justify-center group-hover:bg-primary-gold/30 transition-colors">
                          <subItem.icon className="w-4 h-4 text-primary-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-primary-white group-hover:text-primary-gold transition-colors">
                            {subItem.label}
                          </div>
                          <div className="text-sm text-primary-silver mt-1 leading-relaxed">
                            {subItem.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  )
}

export default EnhancedNavigation
