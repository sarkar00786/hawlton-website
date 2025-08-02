'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  User, 
  Building2, 
  Target,
  MessageSquare 
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { Card } from '@/components/ui/Card'

interface FormStep {
  id: string
  title: string
  description: string
  fields: FormField[]
}

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

const ProgressiveForm = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps: FormStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      fields: [
        {
          name: 'fullName',
          label: 'Full Name',
          type: 'text',
          required: true,
          placeholder: 'John Doe'
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true,
          placeholder: 'john@company.com'
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          required: true,
          placeholder: '+92 300 1234567'
        }
      ]
    },
    {
      id: 'business',
      title: 'Business Information',
      description: 'Help us understand your business',
      fields: [
        {
          name: 'company',
          label: 'Company Name',
          type: 'text',
          required: true,
          placeholder: 'Your Company Ltd.'
        },
        {
          name: 'businessType',
          label: 'Business Type',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select business type' },
            { value: 'retail', label: 'Retail' },
            { value: 'wholesale', label: 'Wholesale' },
            { value: 'manufacturing', label: 'Manufacturing' },
            { value: 'services', label: 'Services' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          name: 'revenue',
          label: 'Annual Revenue',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select revenue range' },
            { value: 'under-10m', label: 'Under PKR 10M' },
            { value: '10m-50m', label: 'PKR 10M - 50M' },
            { value: '50m-100m', label: 'PKR 50M - 100M' },
            { value: '100m-500m', label: 'PKR 100M - 500M' },
            { value: 'over-500m', label: 'Over PKR 500M' }
          ]
        }
      ]
    },
    {
      id: 'goals',
      title: 'Partnership Goals',
      description: 'What do you want to achieve?',
      fields: [
        {
          name: 'goals',
          label: 'Describe your partnership goals',
          type: 'textarea',
          required: true,
          placeholder: 'Tell us about your business goals, expansion plans, and what you hope to achieve through partnership with Hawlton...'
        },
        {
          name: 'additionalInfo',
          label: 'Additional Information (Optional)',
          type: 'textarea',
          placeholder: 'Any additional details you\'d like to share...'
        }
      ]
    }
  ]

  const validateStep = (stepIndex: number): boolean => {
    const step = steps[stepIndex]
    const stepErrors: Record<string, string> = {}
    let isValid = true

    step.fields.forEach(field => {
      if (field.required && !formData[field.name]?.trim()) {
        stepErrors[field.name] = `${field.label} is required`
        isValid = false
      } else if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[field.name])) {
          stepErrors[field.name] = 'Please enter a valid email address'
          isValid = false
        }
      }
    })

    setErrors(stepErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
    setErrors({})
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      try {
        // Submit form data
        console.log('Form submitted:', formData)
        // Handle success
      } catch (error) {
        console.error('Form submission error:', error)
      }
    }
  }

  const getStepIcon = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: return User
      case 1: return Building2
      case 2: return Target
      default: return CheckCircle
    }
  }

  const renderField = (field: FormField) => {
    const commonProps = {
      value: formData[field.name] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
        handleInputChange(field.name, e.target.value),
      error: errors[field.name]
    }

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            rows={field.name === 'goals' ? 6 : 4}
            {...commonProps}
          />
        )
      
      case 'select':
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-semibold text-primary-navy">
              {field.label} {field.required && '*'}
            </label>
            <select
              className="w-full px-4 py-3 border border-primary-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold/20 focus:border-primary-gold transition-all duration-200"
              {...commonProps}
            >
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[field.name] && (
              <p className="text-sm text-red-600">{errors[field.name]}</p>
            )}
          </div>
        )
      
      default:
        return (
          <Input
            key={field.name}
            label={field.label + (field.required ? ' *' : '')}
            type={field.type}
            placeholder={field.placeholder}
            {...commonProps}
          />
        )
    }
  }

  return (
    <section className="py-20 bg-primary-platinum">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-navy mb-8">
              Partnership Application
            </h2>
            <p className="text-xl text-primary-charcoal">
              Complete your partnership application in simple steps
            </p>
          </div>

          <Card className="p-8">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => {
                  const StepIcon = getStepIcon(index)
                  const isActive = index === currentStep
                  const isCompleted = index < currentStep
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                        ${isActive ? 'bg-primary-gold border-primary-gold' : 
                          isCompleted ? 'bg-green-500 border-green-500' : 
                          'bg-white border-primary-silver'}
                      `}>
                        <StepIcon className={`w-6 h-6 ${
                          isActive ? 'text-primary-navy' : 
                          isCompleted ? 'text-white' : 
                          'text-primary-silver'
                        }`} />
                      </div>
                      
                      {index < steps.length - 1 && (
                        <div className={`
                          w-20 h-1 mx-4 transition-all duration-300
                          ${index < currentStep ? 'bg-green-500' : 'bg-primary-silver'}
                        `} />
                      )}
                    </div>
                  )
                })}
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-primary-navy mb-2">
                  {steps[currentStep].title}
                </h3>
                <p className="text-primary-charcoal">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {steps[currentStep].fields.map(field => renderField(field))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-primary-silver">
              <div>
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    icon={ArrowLeft}
                    iconPosition="left"
                  >
                    Previous
                  </Button>
                )}
              </div>

              <div className="text-sm text-primary-charcoal">
                Step {currentStep + 1} of {steps.length}
              </div>

              <div>
                {currentStep < steps.length - 1 ? (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    icon={CheckCircle}
                    iconPosition="right"
                  >
                    Submit Application
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ProgressiveForm
