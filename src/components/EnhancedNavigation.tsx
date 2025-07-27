'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, Award, Users, Target, TrendingUp, Building2, FileText, Phone, MapPin, Search, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { handleNavigation } from '@/utils/scrollTo'

const EnhancedNavigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()

  // Navigation items with internationalization
  const navigationItems = [
    {
      label: t('nav.about'),
      href: '/about',
      submenu: [
        { label: t('nav.about.overview'), href: '/about', icon: Building2, description: t('nav.about.overview.desc') },
        { label: t('nav.about.team'), href: '/about/team', icon: Users, description: t('nav.about.team.desc') },
        { label: t('nav.about.vision'), href: '/about/vision', icon: Target, description: t('nav.about.vision.desc') },
        { label: t('nav.about.awards'), href: '/about/awards', icon: Award, description: t('nav.about.awards.desc') }
      ]
    },
    {
      label: t('nav.solutions'),
      href: '/solutions',
      submenu: [
        { label: t('nav.solutions.digital'), href: '/solutions/digital-transformation', icon: TrendingUp, description: t('nav.solutions.digital.desc') },
        { label: t('nav.solutions.partnerships'), href: '/solutions/partnerships', icon: Users, description: t('nav.solutions.partnerships.desc') },
        { label: t('nav.solutions.investment'), href: '/solutions/investment', icon: Building2, description: t('nav.solutions.investment.desc') },
        { label: t('nav.solutions.success'), href: '/solutions/success-stories', icon: Award, description: t('nav.solutions.success.desc') }
      ]
    },
    {
      label: t('nav.partner'),
      href: '/partner',
      submenu: [
        { label: t('nav.partner.types'), href: '/partner/types', icon: Building2, description: t('nav.partner.types.desc') },
        { label: t('nav.partner.apply'), href: '/partner/apply', icon: FileText, description: t('nav.partner.apply.desc') },
        { label: t('nav.partner.portal'), href: '/partner/portal', icon: Users, description: t('nav.partner.portal.desc') },
        { label: t('nav.partner.resources'), href: '/partner/resources', icon: Target, description: t('nav.partner.resources.desc') }
      ]
    },
    {
      label: t('nav.invest'),
      href: '/invest',
      submenu: [
        { label: t('nav.invest.opportunities'), href: '/invest/opportunities', icon: TrendingUp, description: t('nav.invest.opportunities.desc') },
        { label: t('nav.invest.portfolio'), href: '/invest/portfolio', icon: Building2, description: t('nav.invest.portfolio.desc') },
        { label: t('nav.invest.relations'), href: '/invest/relations', icon: Users, description: t('nav.invest.relations.desc') },
        { label: t('nav.invest.docs'), href: '/invest/docs', icon: FileText, description: t('nav.invest.docs.desc') }
      ]
    },
    {
      label: t('nav.contact'),
      href: '/contact',
      submenu: [
        { label: t('nav.contact.touch'), href: '/contact', icon: Phone, description: t('nav.contact.touch.desc') },
        { label: t('nav.contact.locations'), href: '/contact/locations', icon: MapPin, description: t('nav.contact.locations.desc') },
        { label: t('nav.careers'), href: '/careers', icon: Users, description: t('nav.contact.careers.desc') }
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
      {/* Smart Search Integration */}
      <div className="relative mr-6">
        <div className="flex items-center bg-primary-navy/50 rounded-lg px-3 py-2 border border-primary-gold/20 focus-within:border-primary-gold transition-colors">
          <Search className="w-4 h-4 text-primary-silver mr-2" />
          <input
            type="text"
            placeholder={t('common.search')}
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
                      <a
                        key={subItem.href}
                        href={subItem.href}
                        onClick={(e) => handleNavClick(e, subItem.href)}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-primary-gold/10 transition-colors group cursor-pointer"
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
                      </a>
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
