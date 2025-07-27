'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Shield, Settings, X, Check, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface CookieSettings {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

const GDPRCookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('hawlton-cookie-consent')
    if (!consent) {
      // Delay showing banner to not interfere with page load
      const timer = setTimeout(() => setShowBanner(true), 2000)
      return () => clearTimeout(timer)
    } else {
      // Load saved preferences
      try {
        const savedSettings = JSON.parse(consent)
        setCookieSettings(savedSettings)
        applyConsent(savedSettings)
      } catch (error) {
        console.error('Error loading cookie preferences:', error)
      }
    }
  }, [])

  const applyConsent = (settings: CookieSettings) => {
    // Google Analytics
    if (settings.analytics) {
      enableGoogleAnalytics()
    } else {
      disableGoogleAnalytics()
    }

    // Marketing cookies (Tawk.to, Facebook Pixel, etc.)
    if (settings.marketing) {
      enableMarketingCookies()
    } else {
      disableMarketingCookies()
    }

    // Preferences (theme, language, etc.)
    if (settings.preferences) {
      enablePreferenceCookies()
    }
  }

  const enableGoogleAnalytics = () => {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (gaId && gaId !== 'G-DEVELOPMENT' && typeof window !== 'undefined') {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted'
      })
    }
  }

  const disableGoogleAnalytics = () => {
    if (typeof window !== 'undefined') {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'denied'
      })
    }
  }

  const enableMarketingCookies = () => {
    if (typeof window !== 'undefined') {
      window.gtag?.('consent', 'update', {
        ad_storage: 'granted'
      })
    }
  }

  const disableMarketingCookies = () => {
    if (typeof window !== 'undefined') {
      window.gtag?.('consent', 'update', {
        ad_storage: 'denied'
      })
    }
  }

  const enablePreferenceCookies = () => {
    // Enable preference-related functionality
    localStorage.setItem('hawlton-preferences-enabled', 'true')
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    }
    setCookieSettings(allAccepted)
    localStorage.setItem('hawlton-cookie-consent', JSON.stringify(allAccepted))
    applyConsent(allAccepted)
    setShowBanner(false)
    setShowSettings(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    }
    setCookieSettings(onlyNecessary)
    localStorage.setItem('hawlton-cookie-consent', JSON.stringify(onlyNecessary))
    applyConsent(onlyNecessary)
    setShowBanner(false)
    setShowSettings(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('hawlton-cookie-consent', JSON.stringify(cookieSettings))
    applyConsent(cookieSettings)
    setShowBanner(false)
    setShowSettings(false)
  }

  const handleSettingChange = (setting: keyof CookieSettings) => {
    if (setting === 'necessary') return // Cannot disable necessary cookies
    
    setCookieSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const cookieTypes = [
    {
      key: 'necessary' as const,
      title: 'Necessary Cookies',
      description: 'These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
      required: true,
      examples: 'Session cookies, CSRF protection, security tokens'
    },
    {
      key: 'analytics' as const,
      title: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      required: false,
      examples: 'Google Analytics, page views, user behavior tracking'
    },
    {
      key: 'marketing' as const,
      title: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.',
      required: false,
      examples: 'Google Ads, Facebook Pixel, remarketing tags'
    },
    {
      key: 'preferences' as const,
      title: 'Preference Cookies',
      description: 'These cookies allow the website to remember choices you make and provide enhanced, more personal features.',
      required: false,
      examples: 'Language settings, theme preferences, form data'
    }
  ]

  if (!showBanner && !showSettings) return null

  return (
    <AnimatePresence>
      {(showBanner || showSettings) && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          />

          {/* Cookie Banner */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-primary-gold shadow-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="max-w-7xl mx-auto p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-primary-gold/10 rounded-lg">
                  <Cookie className="w-6 h-6 text-primary-gold" />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-navy mb-2">
                      We value your privacy
                    </h3>
                    <p className="text-primary-charcoal leading-relaxed">
                      We use cookies to enhance your browsing experience, provide personalized content, 
                      and analyze our traffic. By clicking &ldquo;Accept All&rdquo;, you consent to our use of cookies.
                      You can manage your preferences or learn more in our{' '}
                      <Link href="/privacy" className="text-primary-gold hover:underline font-medium">
                        Privacy Policy
                      </Link>.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="inline-flex items-center gap-2 bg-primary-gold hover:bg-primary-gold/90 text-primary-navy px-6 py-3 font-semibold rounded-lg transition-colors duration-200"
                    >
                      <Check className="w-4 h-4" />
                      Accept All
                    </button>
                    
                    <button
                      onClick={handleRejectAll}
                      className="inline-flex items-center gap-2 border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white px-6 py-3 font-semibold rounded-lg transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                      Reject All
                    </button>
                    
                    <button
                      onClick={() => setShowSettings(true)}
                      className="inline-flex items-center gap-2 text-primary-navy hover:bg-primary-platinum px-6 py-3 font-semibold rounded-lg transition-colors duration-200"
                    >
                      <Settings className="w-4 h-4" />
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Settings Modal */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                className="fixed inset-4 z-50 bg-white rounded-xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-primary-gold" />
                      <h2 className="text-2xl font-bold text-primary-navy">
                        Cookie Preferences
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                      <p className="text-primary-charcoal leading-relaxed">
                        We use different types of cookies to provide you with the best experience on our website. 
                        You can choose which cookies you want to allow below. Please note that blocking some 
                        types of cookies may impact your experience on our website.
                      </p>

                      {cookieTypes.map((type) => (
                        <div key={type.key} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-primary-navy mb-2">
                                {type.title}
                                {type.required && (
                                  <span className="ml-2 text-xs bg-primary-gold/20 text-primary-gold px-2 py-1 rounded-full">
                                    Required
                                  </span>
                                )}
                              </h3>
                              <p className="text-sm text-primary-charcoal leading-relaxed mb-2">
                                {type.description}
                              </p>
                              <p className="text-xs text-gray-500">
                                <strong>Examples:</strong> {type.examples}
                              </p>
                            </div>
                            <div className="ml-4">
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={cookieSettings[type.key]}
                                  onChange={() => handleSettingChange(type.key)}
                                  disabled={type.required}
                                  className="sr-only"
                                />
                                <div className={`
                                  w-12 h-6 rounded-full transition-colors duration-200 relative
                                  ${cookieSettings[type.key] ? 'bg-primary-gold' : 'bg-gray-300'}
                                  ${type.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                `}>
                                  <div className={`
                                    w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200
                                    ${cookieSettings[type.key] ? 'translate-x-6' : 'translate-x-0.5'}
                                  `} />
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="bg-primary-platinum p-4 rounded-lg">
                        <p className="text-sm text-primary-charcoal leading-relaxed">
                          <strong>Need more information?</strong> Read our{' '}
                          <Link href="/privacy" className="text-primary-gold hover:underline font-medium">
                            Privacy Policy
                          </Link>{' '}
                          or{' '}
                          <Link href="/contact" className="text-primary-gold hover:underline font-medium">
                            contact us
                          </Link>{' '}
                          if you have any questions about our cookie usage.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-200 p-6">
                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                      <button
                        onClick={handleRejectAll}
                        className="px-6 py-3 text-primary-navy hover:bg-primary-platinum font-semibold rounded-lg transition-colors duration-200"
                      >
                        Reject All
                      </button>
                      <button
                        onClick={handleSavePreferences}
                        className="bg-primary-gold hover:bg-primary-gold/90 text-primary-navy px-6 py-3 font-semibold rounded-lg transition-colors duration-200"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}

export default GDPRCookieConsent
