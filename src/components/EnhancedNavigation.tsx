'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, Award, Users, Target, TrendingUp, Building2, FileText, Phone, MapPin, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { handleNavigation } from '@/utils/scrollTo'
import { NavDropdownIds, HeaderIds } from '@/config/elementIds'

const EnhancedNavigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()

  // Consolidated navigation - 6 core pages including blog
  const navigationItems = [
    {
      label: 'Home',
      href: '/',
      submenu: null
    },
    {
      label: 'Our Vision',
      href: '/our-vision',
      submenu: [
        { label: 'The Story', href: '/our-vision#story', icon: Building2, description: 'From idea to digital transformation leader', id: 'nav-vision-story' },
        { label: 'Leadership', href: '/our-vision#team', icon: Users, description: 'Meet our visionary team', id: 'nav-vision-team' },
        { label: 'Mission & Values', href: '/our-vision#mission', icon: Target, description: 'Our commitment to Pakistan\'s digital future', id: 'nav-vision-mission' }
      ]
    },
    {
      label: 'Solutions',
      href: '/solutions',
      submenu: [
        { label: 'Digital Transformation', href: '/solutions#digital-transformation', icon: TrendingUp, description: 'Complete business digitalization', id: 'nav-solutions-digital' },
        { label: 'Partnership Models', href: '/solutions#partnerships', icon: Users, description: 'Flexible collaboration approaches', id: 'nav-solutions-partnerships' },
        { label: 'Success Stories', href: '/solutions#success-stories', icon: Award, description: 'Real transformation results', id: 'nav-solutions-success' }
      ]
    },
    {
      label: 'Insights',
      href: '/blog',
      submenu: null
    },
    {
      label: 'Partnership',
      href: '/partnership',
      submenu: [
        { label: 'Partnership Benefits', href: '/partnership#benefits', icon: TrendingUp, description: 'Why partner with Hawlton', id: 'nav-partner-benefits' },
        { label: 'Application Process', href: '/partnership#partner-form', icon: Building2, description: 'Start your partnership journey', id: 'nav-partner-process' },
        { label: 'Partner Resources', href: '/partnership#partner-resources-section', icon: FileText, description: 'Tools and support for partners', id: 'nav-partner-resources' }
      ]
    },
    {
      label: 'Contact',
      href: '/contact',
      submenu: [
        { label: 'Get In Touch', href: '/contact#form', icon: Phone, description: 'Contact us for partnerships or inquiries', id: 'nav-contact-form' },
        { label: 'Careers', href: '/careers', icon: Users, description: 'Join our mission', id: 'nav-contact-careers' }
      ]
    }
  ]

  // Handle navigation click with scroll functionality
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setActiveDropdown(null) // Close dropdown
    
    // Use our enhanced navigation handler
    handleNavigation(href, pathname, router, () => {
      // Navigation complete callback
    })
  }

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 300) // Increased delay for better UX
  }

  const handleDropdownMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
    setActiveDropdown(label)
  }

  const handleDropdownMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 300)
  }

  // Handle click for mobile-like behavior on smaller screens
  const handleNavItemClick = (e: React.MouseEvent, item: any) => {
    if (item.submenu) {
      e.preventDefault()
      // Toggle dropdown on click for better mobile experience
      if (activeDropdown === item.label) {
        setActiveDropdown(null)
      } else {
        setActiveDropdown(item.label)
      }
    }
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (target && !target.closest('.relative.group')) {
        setActiveDropdown(null)
      }
    }

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.23, 1, 0.32, 1] as const
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: [0.76, 0, 0.24, 1] as const
      }
    }
  }

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {/* Language Switcher */}
      <div className="relative mr-4">
        <button
          onClick={() => setLanguage(language === 'EN' ? 'UR' : 'EN')}
          className="flex items-center space-x-1 text-primary-silver hover:text-primary-gold transition-colors px-1.5 py-1"
          onBlur={(e) => {
            setTimeout(() => {
              if (e.target instanceof HTMLElement) {
                e.target.blur();
                e.target.style.outline = 'none';
                e.target.style.boxShadow = 'none';
              }
            }, 100);
          }}
          onMouseDown={(e) => {
            setTimeout(() => {
              if (e.target instanceof HTMLElement) {
                e.target.blur();
              }
            }, 100);
          }}
        >
          <Globe className="w-3 h-3" />
          <span className="text-xs font-medium">{language}</span>
        </button>
      </div>

      {/* Main Navigation Items */}
      {navigationItems.map((item) => (
        <div
          key={item.label}
          className="relative group"
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          {item.submenu ? (
            <button
              onClick={(e) => handleNavItemClick(e, item)}
              className={`flex items-center space-x-1 px-3 py-1.5 transition-all duration-200 w-full text-left ${
                isActive(item.href)
                  ? 'bg-primary-gold/10 text-primary-gold font-semibold'
                  : 'text-primary-silver hover:text-primary-gold hover:bg-primary-gold/5'
              }`}
            >
              <span className="text-sm">{item.label}</span>
              <ChevronDown 
                className={`w-3 h-3 transition-transform duration-200 ${
                  activeDropdown === item.label ? 'rotate-180' : ''
                }`} 
              />
            </button>
          ) : (
            <Link
              href={item.href}
              className={`flex items-center space-x-1 px-3 py-1.5 transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-primary-gold/10 text-primary-gold font-semibold'
                  : 'text-primary-silver hover:text-primary-gold hover:bg-primary-gold/5'
              }`}
            >
              <span className="text-sm">{item.label}</span>
            </Link>
          )}

          {/* Dropdown Menu */}
          <AnimatePresence>
            {activeDropdown === item.label && item.submenu && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-full left-0 mt-2 min-w-[320px] max-w-sm bg-primary-navy border border-primary-gold/20 shadow-xl z-50 px-3 py-3"
                onMouseEnter={() => handleDropdownMouseEnter(item.label)}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <div className="space-y-1">
                  {item.submenu.map((subItem) => (
                    <a
                      key={subItem.href}
                      href={subItem.href}
                      onClick={(e) => handleNavClick(e, subItem.href)}
                      className="flex items-start gap-2 p-1.5 hover:bg-primary-gold/10 transition-colors duration-200 cursor-pointer group"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-primary-gold/20 flex items-center justify-center group-hover:bg-primary-gold/30 transition-colors">
                        <subItem.icon className="w-3.5 h-3.5 text-primary-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-primary-white group-hover:text-primary-gold transition-colors">
                          {subItem.label}
                        </div>
                        <div className="text-sm text-primary-silver mt-1 leading-relaxed">
                          {subItem.description}
                        </div>
                      </div>
                    </a>
                  ))}
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
