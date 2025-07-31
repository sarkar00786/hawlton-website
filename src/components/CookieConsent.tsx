'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Shield, Settings } from 'lucide-react'
import Link from 'next/link'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: true,
    marketing: false,
    functional: true
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const consentData = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consentData))
    setShowBanner(false)
    
    // Enable analytics if accepted
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      })
    }
  }

  const handleRejectAll = () => {
    const consentData = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consentData))
    setShowBanner(false)
    
    // Deny analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      })
    }
  }

  const handleSavePreferences = () => {
    const consentData = {
      ...preferences,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consentData))
    setShowBanner(false)
    setShowPreferences(false)
    
    // Update analytics consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied'
      })
    }
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary-navy text-primary-white p-4 shadow-2xl z-50 border-t-4 border-primary-gold">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-6 h-6 text-primary-gold mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">We Value Your Privacy</h3>
                <p className="text-primary-silver text-sm leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By continuing to use our site, you consent to our use of cookies in accordance with our{' '}
                  <Link href="/privacy" className="text-primary-gold hover:underline">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <button
                onClick={() => setShowPreferences(true)}
                className="flex items-center gap-2 px-4 py-2 border border-primary-silver text-primary-silver hover:bg-primary-silver hover:text-primary-navy transition-colors duration-300 font-medium text-sm"
              >
                <Settings className="w-4 h-4" />
                Customize
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 border border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-navy transition-colors duration-300 font-medium text-sm"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-primary-gold text-primary-navy hover:bg-primary-gold/90 transition-colors duration-300 font-semibold text-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary-gold" />
                  <h2 className="text-2xl font-bold text-primary-navy">Cookie Preferences</h2>
                </div>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-primary-silver hover:text-primary-navy transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <p className="text-primary-charcoal mb-6 leading-relaxed">
                Customize your cookie preferences below. You can change these settings at any time, 
                but disabling some cookies may affect your website experience.
              </p>
              
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="p-4 border border-primary-silver/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-primary-navy">Necessary Cookies</h3>
                    <div className="bg-primary-silver/20 px-3 py-1 rounded-full text-sm text-primary-charcoal">
                      Always Active
                    </div>
                  </div>
                  <p className="text-sm text-primary-charcoal">
                    Essential for website functionality, security, and basic features. Cannot be disabled.
                  </p>
                </div>
                
                {/* Analytics Cookies */}
                <div className="p-4 border border-primary-silver/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-primary-navy">Analytics Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-gold"></div>
                    </label>
                  </div>
                  <p className="text-sm text-primary-charcoal">
                    Help us understand how visitors interact with our website to improve user experience.
                  </p>
                </div>
                
                {/* Marketing Cookies */}
                <div className="p-4 border border-primary-silver/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-primary-navy">Marketing Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-gold"></div>
                    </label>
                  </div>
                  <p className="text-sm text-primary-charcoal">
                    Used to track visitors across websites to display relevant advertisements.
                  </p>
                </div>
                
                {/* Functional Cookies */}
                <div className="p-4 border border-primary-silver/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-primary-navy">Functional Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={(e) => setPreferences(prev => ({ ...prev, functional: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-gold"></div>
                    </label>
                  </div>
                  <p className="text-sm text-primary-charcoal">
                    Enable enhanced functionality like live chat, user preferences, and personalization.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-primary-silver/30">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-6 py-3 border border-primary-silver text-primary-charcoal hover:bg-primary-silver/10 transition-colors duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-3 bg-primary-gold text-primary-navy hover:bg-primary-gold/90 transition-colors duration-300 font-semibold flex-1 sm:flex-none"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
