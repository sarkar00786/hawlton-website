'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react'

// Password strength checker
export const usePasswordStrength = (password: string) => {
  const [strength, setStrength] = useState({
    score: 0,
    feedback: '',
    color: 'text-gray-400',
    bgColor: 'bg-gray-200'
  })

  useEffect(() => {
    if (!password) {
      setStrength({
        score: 0,
        feedback: '',
        color: 'text-gray-400',
        bgColor: 'bg-gray-200'
      })
      return
    }

    let score = 0
    let feedback = ''

    // Length check
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1

    // Character variety checks
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    // Determine feedback and colors
    if (score <= 2) {
      feedback = 'Weak password'
      setStrength({
        score,
        feedback,
        color: 'text-red-600',
        bgColor: 'bg-red-500'
      })
    } else if (score <= 4) {
      feedback = 'Good password'
      setStrength({
        score,
        feedback,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-500'
      })
    } else {
      feedback = 'Strong password'
      setStrength({
        score,
        feedback,
        color: 'text-green-600',
        bgColor: 'bg-green-500'
      })
    }
  }, [password])

  return strength
}

// Enhanced Password Input Component
interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  showStrength?: boolean
  showRequirements?: boolean
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  showStrength = true,
  showRequirements = true,
  value = '',
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const strength = usePasswordStrength(value as string)

  const requirements = [
    { text: 'At least 8 characters', met: (value as string).length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(value as string) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(value as string) },
    { text: 'Contains number', met: /[0-9]/.test(value as string) },
    { text: 'Contains special character', met: /[^A-Za-z0-9]/.test(value as string) }
  ]

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-primary-navy">
        {label}
      </label>
      
      <div className="relative">
        <input
          {...props}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 pr-12 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-gold/20 focus:border-primary-gold ${
            error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        />
        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Password Strength Indicator */}
      {showStrength && value && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${strength.color}`}>
              {strength.feedback}
            </span>
            <span className="text-xs text-gray-500">
              {strength.score}/6
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${strength.bgColor} transition-all duration-300`}
              initial={{ width: 0 }}
              animate={{ width: `${(strength.score / 6) * 100}%` }}
            />
          </div>
        </motion.div>
      )}

      {/* Password Requirements */}
      {showRequirements && isFocused && value && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-1 p-3 bg-gray-50 rounded-lg"
        >
          <p className="text-xs font-medium text-gray-700 mb-2">
            Password requirements:
          </p>
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center space-x-2">
              {req.met ? (
                <CheckCircle className="w-3 h-3 text-green-500" />
              ) : (
                <div className="w-3 h-3 rounded-full border border-gray-300" />
              )}
              <span className={`text-xs ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                {req.text}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center space-x-2 text-red-600"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Real-time Email Validation
interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  onValidationChange?: (isValid: boolean) => void
}

export const EmailInput: React.FC<EmailInputProps> = ({
  label,
  error,
  onValidationChange,
  value = '',
  onChange,
  ...props
}) => {
  const [isValidating, setIsValidating] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)

  useEffect(() => {
    if (!value) {
      setIsValid(null)
      onValidationChange?.(false)
      return
    }

    setIsValidating(true)
    
    // Debounced validation
    const timer = setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const valid = emailRegex.test(value as string)
      setIsValid(valid)
      setIsValidating(false)
      onValidationChange?.(valid)
    }, 500)

    return () => clearTimeout(timer)
  }, [value, onValidationChange])

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-primary-navy">
        {label}
      </label>
      
      <div className="relative">
        <input
          {...props}
          type="email"
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 pr-12 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-gold/20 focus:border-primary-gold ${
            error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
              : isValid === true
              ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isValidating ? (
            <div className="w-5 h-5 border-2 border-primary-gold border-t-transparent rounded-full animate-spin" />
          ) : isValid === true ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : isValid === false && value ? (
            <AlertCircle className="w-5 h-5 text-red-500" />
          ) : null}
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center space-x-2 text-red-600"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Form Progress Indicator
interface FormProgressProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export const FormProgress: React.FC<FormProgressProps> = ({
  currentStep,
  totalSteps,
  steps
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-primary-navy">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <motion.div
          className="h-2 bg-primary-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 ${
              index + 1 <= currentStep ? 'text-primary-gold' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                index + 1 < currentStep
                  ? 'bg-primary-gold text-primary-navy'
                  : index + 1 === currentStep
                  ? 'bg-primary-gold text-primary-navy'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1 < currentStep ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            <span className="text-xs font-medium hidden sm:block">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const FormValidationComponents = { PasswordInput, EmailInput, FormProgress, usePasswordStrength }
export default FormValidationComponents
