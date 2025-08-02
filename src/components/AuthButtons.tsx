'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, ChevronDown, Settings, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface AuthButtonsProps {
  onMenuClick?: () => void
}

export default function AuthButtons({ onMenuClick }: AuthButtonsProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { data: session, status, signOut } = useAuth()
  const userMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isUserMenuOpen])

  const handleSignOut = async () => {
    setIsUserMenuOpen(false)
    await signOut({ callbackUrl: '/' })
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="hidden md:flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary-gold/20 rounded-full animate-pulse"></div>
      </div>
    )
  }

  // Authenticated state
  if (session) {
    return (
      <div className="hidden md:flex items-center space-x-2" ref={userMenuRef}>
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium border border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-navy transition-all duration-200 rounded"
          >
            <User className="w-4 h-4" />
            <span className="max-w-24 truncate">
              {session.user.name || session.user.email}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                <div className="font-medium text-gray-900">{session.user.name || 'User'}</div>
                <div className="truncate">{session.user.email}</div>
              </div>
              
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setIsUserMenuOpen(false)
                  onMenuClick?.()
                }}
              >
                <LayoutDashboard className="w-4 h-4 mr-3" />
                Dashboard
              </Link>
              
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Unauthenticated state
  return (
    <div className="hidden md:flex items-center space-x-2">
      <Link
        href="/auth/signin"
        className={`px-3 py-1.5 text-sm font-medium border border-primary-gold text-primary-gold transition-all duration-200 hover:bg-primary-gold hover:text-primary-navy rounded ${
          isActive('/auth/signin')
            ? 'bg-primary-gold text-primary-navy shadow-md' 
            : ''
        }`}
      >
        Login
      </Link>
      <Link
        href="/partnership"
        className="px-3 py-1.5 text-sm font-medium bg-primary-gold text-primary-navy transition-all duration-200 hover:bg-primary-gold/90 shadow-sm rounded"
      >
        Start Your Digital Journey
      </Link>
    </div>
  )
}

// Mobile version of AuthButtons
export function MobileAuthButtons({ onMenuClick }: AuthButtonsProps) {
  const { data: session, status, signOut } = useAuth()
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  const handleSignOut = async () => {
    onMenuClick?.()
    await signOut({ callbackUrl: '/' })
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="pt-4 space-y-3 border-t border-primary-silver/20">
        <div className="w-full h-10 bg-primary-gold/20 rounded animate-pulse"></div>
      </div>
    )
  }

  // Authenticated state
  if (session) {
    return (
      <div className="pt-4 space-y-3 border-t border-primary-silver/20">
        <div className="px-4 py-2 text-primary-silver text-sm border-b border-primary-silver/20">
          <div className="font-medium text-primary-white">{session.user.name || 'User'}</div>
          <div className="truncate text-xs">{session.user.email}</div>
        </div>
        
        <Link
          href="/dashboard"
          className="flex items-center w-full px-4 py-2.5 text-primary-gold hover:bg-primary-gold/10 transition-all duration-200"
          onClick={onMenuClick}
        >
          <LayoutDashboard className="w-4 h-4 mr-3" />
          Dashboard
        </Link>
        
        <button
          onClick={handleSignOut}
          className="flex items-center w-full px-4 py-2.5 text-red-400 hover:bg-red-900/20 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </button>
      </div>
    )
  }

  // Unauthenticated state
  return (
    <div className="pt-4 space-y-3 border-t border-primary-silver/20">
      <Link
        href="/auth/signin"
        className={`block w-full border border-primary-gold px-4 py-2.5 font-semibold text-center transition-all duration-200 rounded ${
          isActive('/auth/signin') 
            ? 'bg-primary-gold text-primary-navy shadow-lg' 
            : 'bg-transparent text-primary-gold hover:bg-primary-gold hover:text-primary-navy'
        }`}
        onClick={onMenuClick}
      >
        Login
      </Link>
      <Link
        href="/partnership"
        className="block w-full bg-primary-gold hover:bg-primary-gold/90 text-primary-navy px-4 py-3 font-semibold text-center transition-all duration-200 transform hover:scale-105 shadow-lg rounded"
        onClick={onMenuClick}
      >
        Start Your Digital Journey
      </Link>
    </div>
  )
}
