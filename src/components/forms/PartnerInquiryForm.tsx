'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Globe, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle,
  Loader2
} from 'lucide-react'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { cn } from '@/lib/utils'

// Validation schema
const partnerInquirySchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name is required'),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  businessType: z.enum(['retail', 'wholesale', 'manufacturing', 'services', 'other'], {
    required_error: 'Please select your business type'
  }),
  currentRevenue: z.enum(['under-100k', '100k-500k', '500k-1m', '1m-5m', 'over-5m'], {
    required_error: 'Please select your current revenue range'
  }),
  partnershipGoals: z.string().min(50, 'Please provide more details about your partnership goals (minimum 50 characters)'),
  additionalInfo: z.string().optional()
})

type PartnerInquiryFormData = z.infer<typeof partnerInquirySchema>

interface PartnerInquiryFormProps {
  onSuccess?: () => void
  className?: string
}

const PartnerInquiryForm: React.FC<PartnerInquiryFormProps> = ({
  onSuccess,
  className
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset
  } = useForm<PartnerInquiryFormData>({
    resolver: zodResolver(partnerInquirySchema),
    mode: 'onChange'
  })

  const watchedValues = watch()

  const onSubmit = async (data: PartnerInquiryFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Create form data for Netlify Forms
      const formData = new FormData()
      formData.append('form-name', 'partner-inquiry')
      
      // Append all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value)
        }
      })

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString()
      })

      if (response.ok) {
        setIsSubmitted(true)
        onSuccess?.()
        
        // Track form submission with Google Analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submit', {
            event_category: 'Partnership',
            event_label: 'Partner Inquiry Form',
            value: 1
          })
        }
        
        // Reset form after 3 seconds
        setTimeout(() => {
          reset()
          setIsSubmitted(false)
        }, 3000)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      setSubmitError('Failed to submit form. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        className={cn(
          'max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-premium border border-accent-primary/20',
          className
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </motion.div>
          
          <motion.h3
            className="text-2xl font-bold text-primary-navy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Partnership Inquiry Submitted!
          </motion.h3>
          
          <motion.p
            className="text-text-muted max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Thank you for your interest in partnering with Hawlton. Our team will review your submission and contact you within 24-48 hours to discuss potential collaboration opportunities.
          </motion.p>
          
          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-text-muted">
              Expected response time: <span className="font-semibold text-accent-primary">24-48 hours</span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.form
      className={cn(
        'max-w-2xl mx-auto space-y-6 p-8 bg-white rounded-xl shadow-premium border border-secondary-200',
        className
      )}
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      // Netlify Forms detection
      name="partner-inquiry"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      {/* Hidden field for Netlify Forms */}
      <input type="hidden" name="form-name" value="partner-inquiry" />
      
      {/* Honeypot field for spam protection */}
      <div style={{ display: 'none' }}>
        <input name="bot-field" />
      </div>

      {/* Form Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-primary-navy">
          Partner With Hawlton
        </h2>
        <p className="text-text-muted max-w-lg mx-auto">
          Ready to transform your business and expand nationwide? Tell us about your vision and let&apos;s explore how we can grow together.
        </p>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary-navy border-b border-secondary-200 pb-2">
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name *"
            leftIcon={<User className="w-5 h-5" />}
            placeholder="John Doe"
            error={errors.fullName?.message}
            {...register('fullName')}
          />
          
          <Input
            label="Email Address *"
            type="email"
            leftIcon={<Mail className="w-5 h-5" />}
            placeholder="john@company.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        
        <Input
          label="Phone Number *"
          type="tel"
          leftIcon={<Phone className="w-5 h-5" />}
          placeholder="+92 300 1234567"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      {/* Business Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary-navy border-b border-secondary-200 pb-2">
          Business Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company Name *"
            leftIcon={<Building2 className="w-5 h-5" />}
            placeholder="Your Company Ltd."
            error={errors.company?.message}
            {...register('company')}
          />
          
          <Input
            label="Website (Optional)"
            type="url"
            leftIcon={<Globe className="w-5 h-5" />}
            placeholder="https://yourcompany.com"
            error={errors.website?.message}
            {...register('website')}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Business Type Select */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-text-secondary">
              Business Type *
            </label>
            <select
              className={cn(
                'w-full px-4 py-3 border border-secondary-400 rounded-md',
                'bg-white text-text-secondary font-medium',
                'focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary',
                'transition-all duration-200',
                errors.businessType && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              )}
              {...register('businessType')}
            >
              <option value="">Select business type</option>
              <option value="retail">Retail</option>
              <option value="wholesale">Wholesale</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="services">Services</option>
              <option value="other">Other</option>
            </select>
            {errors.businessType && (
              <p className="text-sm text-red-600">{errors.businessType.message}</p>
            )}
          </div>
          
          {/* Current Revenue Select */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-text-secondary">
              Current Annual Revenue *
            </label>
            <select
              className={cn(
                'w-full px-4 py-3 border border-secondary-400 rounded-md',
                'bg-white text-text-secondary font-medium',
                'focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary',
                'transition-all duration-200',
                errors.currentRevenue && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              )}
              {...register('currentRevenue')}
            >
              <option value="">Select revenue range</option>
              <option value="under-100k">Under PKR 10M</option>
              <option value="100k-500k">PKR 10M - 50M</option>
              <option value="500k-1m">PKR 50M - 100M</option>
              <option value="1m-5m">PKR 100M - 500M</option>
              <option value="over-5m">Over PKR 500M</option>
            </select>
            {errors.currentRevenue && (
              <p className="text-sm text-red-600">{errors.currentRevenue.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Partnership Goals */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary-navy border-b border-secondary-200 pb-2">
          Partnership Goals
        </h3>
        
        <Textarea
          label="What are your partnership goals and how do you envision working with Hawlton? *"
          placeholder="Describe your business goals, expansion plans, current challenges, and what you hope to achieve through partnership with Hawlton. Be specific about your vision for growth and digital transformation."
          rows={6}
          maxLength={1000}
          showCharCount
          error={errors.partnershipGoals?.message}
          {...register('partnershipGoals')}
        />
        
        <Textarea
          label="Additional Information (Optional)"
          placeholder="Any additional details about your business, specific requirements, timeline, or questions you'd like to discuss."
          rows={4}
          maxLength={500}
          showCharCount
          {...register('additionalInfo')}
        />
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {submitError && (
          <motion.div
            className="p-4 bg-red-50 border border-red-200 rounded-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-red-600 text-sm">{submitError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <div className="pt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
          icon={isSubmitting ? Loader2 : ArrowRight}
          iconPosition="right"
          className="transform hover:scale-[1.02] transition-all duration-300"
        >
          {isSubmitting ? 'Submitting Partnership Inquiry...' : 'Submit Partnership Inquiry'}
        </Button>
        
        <p className="text-sm text-text-muted text-center mt-4">
          Our partnership team will review your submission and respond within 24-48 hours.
        </p>
      </div>
    </motion.form>
  )
}

export default PartnerInquiryForm
