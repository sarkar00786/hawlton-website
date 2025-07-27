'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  label: string
  description?: string
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', description: 'Digital transformation hub' },
  { href: '/about', label: 'About Us', description: 'Our story & vision' },
  { href: '/solutions', label: 'Our Solutions', description: 'Digital services' },
  { href: '/partner', label: 'Partner', description: 'Collaborate with us' },
  { href: '/invest', label: 'Invest', description: 'Investment opportunities' },
  { href: '/careers', label: 'Careers', description: 'Join our team' },
  { href: '/contact', label: 'Contact', description: 'Get in touch' },
]

const LiquidNav = () => {
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  // Ensure client-side hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <nav className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className="hover:text-primary-white transition-colors duration-200 font-medium text-primary-silver"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    )
  }

  return (
    <nav ref={navRef} className="hidden md:flex space-x-8">
      {navItems.map((item, index) => {
        const isCurrentlyActive = isActive(item.href)
        
        return (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`hover:text-primary-white transition-colors duration-200 font-medium focus:outline-none focus:ring-0 ${
              isCurrentlyActive ? 'text-primary-gold font-semibold' : 'text-primary-silver'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default LiquidNav
