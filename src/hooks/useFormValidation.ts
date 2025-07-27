'use client'

import { useState, useCallback } from 'react'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

export interface ValidationRules {
  [key: string]: ValidationRule
}

export interface ValidationErrors {
  [key: string]: string
}

export interface FormState {
  [key: string]: string
}

export const useFormValidation = (initialValues: FormState, rules: ValidationRules) => {
  const [values, setValues] = useState<FormState>(initialValues)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = useCallback((name: string, value: string): string => {
    const rule = rules[name]
    if (!rule) return ''

    // Required validation
    if (rule.required && (!value || value.trim() === '')) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') return ''

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rule.minLength} characters`
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must not exceed ${rule.maxLength} characters`
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} format is invalid`
    }

    // Custom validation
    if (rule.custom) {
      const customError = rule.custom(value)
      if (customError) return customError
    }

    return ''
  }, [rules])

  const validateAll = useCallback((): boolean => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName] || '')
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [values, rules, validateField])

  const handleChange = useCallback((name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [touched, validateField])

  const handleBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, values[name] || '')
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [values, validateField])

  const handleSubmit = useCallback(async (onSubmit: (values: FormState) => Promise<void>) => {
    setIsSubmitting(true)
    
    // Mark all fields as touched
    const allTouched = Object.keys(rules).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(allTouched)

    if (validateAll()) {
      try {
        await onSubmit(values)
      } catch (error) {
        console.error('Form submission error:', error)
      }
    }
    
    setIsSubmitting(false)
  }, [values, rules, validateAll])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    validateAll,
    reset
  }
}
