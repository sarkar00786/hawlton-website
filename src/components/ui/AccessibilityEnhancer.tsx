'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Plus, Minus, RotateCcw } from 'lucide-react'

interface AccessibilitySettings {
  fontSize: number
  highContrast: boolean
  reduceMotion: boolean
}

const AccessibilityEnhancer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    highContrast: false,
    reduceMotion: false
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings')
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      setSettings(parsed)
      applySettings(parsed)
    }
  }, [])

  // Apply settings to the document
  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement
    
    // Font size
    root.style.fontSize = `${newSettings.fontSize}%`
    
    // High contrast
    if (newSettings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    // Reduced motion
    if (newSettings.reduceMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }
    
    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings))
  }

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean | number) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    applySettings(newSettings)
  }

  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 100,
      highContrast: false,
      reduceMotion: false
    }
    setSettings(defaultSettings)
    applySettings(defaultSettings)
  }

  const increaseFontSize = () => {
    const newSize = Math.min(settings.fontSize + 10, 150)
    updateSetting('fontSize', newSize)
  }

  const decreaseFontSize = () => {
    const newSize = Math.max(settings.fontSize - 10, 80)
    updateSetting('fontSize', newSize)
  }

  return (
    <>
      {/* Accessibility Button */}
      <motion.button
        className="fixed bottom-8 left-8 z-50 bg-primary-navy text-primary-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Accessibility options"
        title="Accessibility Options"
      >
        <Eye className="w-5 h-5" />
      </motion.button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed bottom-20 left-8 z-50 bg-white rounded-xl shadow-2xl p-6 w-80 max-w-[calc(100vw-2rem)]"
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-primary-navy">
                  Accessibility Options
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-primary-charcoal hover:text-primary-navy focus:outline-none focus:ring-2 focus:ring-primary-gold rounded"
                  aria-label="Close accessibility panel"
                >
                  <EyeOff className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Font Size Control */}
                <div>
                  <label className="block text-sm font-medium text-primary-navy mb-3">
                    Font Size: {settings.fontSize}%
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={decreaseFontSize}
                      className="flex items-center justify-center w-10 h-10 bg-primary-gold hover:bg-primary-gold/90 text-primary-navy rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2"
                      aria-label="Decrease font size"
                      disabled={settings.fontSize <= 80}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-gold h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((settings.fontSize - 80) / 70) * 100}%` }}
                      />
                    </div>
                    
                    <button
                      onClick={increaseFontSize}
                      className="flex items-center justify-center w-10 h-10 bg-primary-gold hover:bg-primary-gold/90 text-primary-navy rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2"
                      aria-label="Increase font size"
                      disabled={settings.fontSize >= 150}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* High Contrast Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-primary-navy">
                    High Contrast
                  </label>
                  <button
                    onClick={() => updateSetting('highContrast', !settings.highContrast)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 ${
                      settings.highContrast ? 'bg-primary-gold' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.highContrast}
                    aria-label="Toggle high contrast mode"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Reduce Motion Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-primary-navy">
                    Reduce Motion
                  </label>
                  <button
                    onClick={() => updateSetting('reduceMotion', !settings.reduceMotion)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 ${
                      settings.reduceMotion ? 'bg-primary-gold' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.reduceMotion}
                    aria-label="Toggle reduced motion"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.reduceMotion ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetSettings}
                  className="w-full flex items-center justify-center space-x-2 bg-primary-navy hover:bg-primary-navy/90 text-white py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Default</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-gold text-primary-navy px-4 py-2 rounded-lg font-medium z-50 focus:outline-none focus:ring-2 focus:ring-primary-navy focus:ring-offset-2"
      >
        Skip to main content
      </a>
    </>
  )
}

export default AccessibilityEnhancer
