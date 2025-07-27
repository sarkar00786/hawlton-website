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
  DollarSign, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle,
  Loader2,
  TrendingUp,
  PieChart
} from 'lucide-react'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { cn } from '@/lib/utils'

// Validation schema
const investorInquirySchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  organization: z.string().min(2, 'Organization name is required'),
  investorType: z.enum(['individual', 'institutional', 'family-office', 'fund', 'other'], {
    required_error: 'Please select your investor type'
  }),
  investmentRange: z.enum(['100k-500k', '500k-1m', '1m-5m', '5m-10m', 'over-10m'], {
    required_error: 'Please select your investment range'
  }),
  investmentTimeframe: z.enum(['immediate', '3-months', '6-months', '12-months', 'flexible'], {
    required_error: 'Please select your investment timeframe'
  }),
  investmentFocus: z.array(z.string()).min(1, 'Please select at least one investment focus area'),
  riskTolerance: z.enum(['conservative', 'moderate', 'aggressive', 'very-aggressive'], {
    required_error: 'Please select your risk tolerance'
  }),
  investmentGoals: z.string().min(50, 'Please provide more details about your investment goals (minimum 50 characters)'),
  additionalInfo: z.string().optional(),
  accreditationStatus: z.enum(['accredited', 'qualified', 'institutional', 'other'], {
    required_error: 'Please specify your accreditation status'
  })
})

type InvestorInquiryFormData = z.infer<typeof investorInquirySchema>

interface InvestorInquiryFormProps {
  onSuccess?: () => void
  className?: string
}

const InvestorInquiryForm: React.FC<InvestorInquiryFormProps> = ({
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
    setValue,
    reset
  } = useForm<InvestorInquiryFormData>({
    resolver: zodResolver(investorInquirySchema),
    mode: 'onChange',
    defaultValues: {
      investmentFocus: []
    }
  })

  const watchedValues = watch()
  const selectedFocusAreas = watch('investmentFocus') || []

  const onSubmit = async (data: InvestorInquiryFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Submit form data to API endpoint
      const response = await fetch('/api/investor-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setIsSubmitted(true)
        onSuccess?.()
        
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

  const focusAreas = [
    { id: 'ecommerce', label: 'E-commerce & Digital Retail' },
    { id: 'fintech', label: 'Financial Technology' },
    { id: 'logistics', label: 'Logistics & Supply Chain' },
    { id: 'healthcare', label: 'Digital Healthcare' },
    { id: 'education', label: 'EdTech & Digital Learning' },
    { id: 'manufacturing', label: 'Digital Manufacturing' },
    { id: 'agriculture', label: 'AgriTech & Food' },
    { id: 'energy', label: 'Clean Energy & Sustainability' }
  ]

  const handleFocusAreaChange = (areaId: string, checked: boolean) => {
    const currentAreas = selectedFocusAreas || []
    if (checked) {
      setValue('investmentFocus', [...currentAreas, areaId])
    } else {
      setValue('investmentFocus', currentAreas.filter(id => id !== areaId))
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        className={cn(
          'max-w-2xl mx-auto p-8 bg-white shadow-premium border border-accent-primary/20',
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
            Investment Inquiry Submitted!
          </motion.h3>
          
          <motion.p
            className="text-text-muted max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Thank you for your interest in investing with Hawlton. Our investment team will review your submission and contact you within 24-48 hours to discuss exclusive opportunities tailored to your investment profile.
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
        'max-w-2xl mx-auto space-y-6 p-8 bg-white shadow-premium border border-secondary-200',
        className
      )}
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      // Form submission handled via API
    >

      {/* Form Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-primary-navy">
          Invest With Hawlton
        </h2>
        <p className="text-text-muted max-w-lg mx-auto">
          Join exclusive investors in Pakistan&apos;s most promising digital transformation ventures. Share your investment criteria and discover high-impact opportunities.
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
            placeholder="john@investment.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number *"
            type="tel"
            leftIcon={<Phone className="w-5 h-5" />}
            placeholder="+92 300 1234567"
            error={errors.phone?.message}
            {...register('phone')}
          />
          
          <Input
            label="Organization *"
            leftIcon={<Building2 className="w-5 h-5" />}
            placeholder="Investment Firm / Company"
            error={errors.organization?.message}
            {...register('organization')}
          />
        </div>
      </div>

      {/* Investment Profile */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary-navy border-b border-secondary-200 pb-2">
          Investment Profile
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Investor Type Select */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-text-secondary">
              Investor Type *
            </label>
            <select
              className={cn(
                'form-select',
                errors.investorType && 'error'
              )}
              {...register('investorType')}
            >
              <option value="">Select investor type</option>
              <option value="individual">Individual Investor</option>
              <option value="institutional">Institutional Investor</option>
              <option value="family-office">Family Office</option>
              <option value="fund">Investment Fund</option>
              <option value="other">Other</option>
            </select>
            {errors.investorType && (
              <p className="text-sm text-red-600">{errors.investorType.message}</p>
            )}
          </div>
          
          {/* Investment Range Select */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-text-secondary">
              Investment Range (USD) *
            </label>
            <select
              className={cn(
                'form-select',
                errors.investmentRange && 'error'
              )}
              {...register('investmentRange')}
            >
              <option value="">Select investment range</option>
              <option value="100k-500k">$100K - $500K</option>
              <option value="500k-1m">$500K - $1M</option>
              <option value="1m-5m">$1M - $5M</option>
              <option value="5m-10m">$5M - $10M</option>
              <option value="over-10m">Over $10M</option>
            </select>
            {errors.investmentRange && (
              <p className="text-sm text-red-600">{errors.investmentRange.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Investment Timeframe Select */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-text-secondary">
              Investment Timeframe *
            </label>
            <select
              className={cn(
                'w-full px-4 py-3 border border-secondary-400',
                'bg-white text-text-secondary font-medium',
                'focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary',
                'transition-all duration-200',
                errors.investmentTimeframe && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              )}
              {...register('investmentTimeframe')}
            >
              <option value="">Select timeframe</option>
              <option value="immediate">Immediate</option>
              <option value="3-months">Within 3 months</option>
              <option value="6-months">Within 6 months</option>
              <option value="12-months">Within 12 months</option>
              <option value="flexible">Flexible</option>
            </select>
            {errors.investmentTimeframe && (
              <p className="text-sm text-red-600">{errors.investmentTimeframe.message}</p>
            )}
          </div>
          
          {/* Risk Tolerance Select */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-text-secondary">
              Risk Tolerance *
            </label>
            <select
              className={cn(
                'w-full px-4 py-3 border border-secondary-400',
                'bg-white text-text-secondary font-medium',
                'focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary',
                'transition-all duration-200',
                errors.riskTolerance && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              )}
              {...register('riskTolerance')}
            >
              <option value="">Select risk tolerance</option>
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
              <option value="very-aggressive">Very Aggressive</option>
            </select>
            {errors.riskTolerance && (
              <p className="text-sm text-red-600">{errors.riskTolerance.message}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-text-secondary">
            Accreditation Status *
          </label>
          <select
            className={cn(
              'w-full px-4 py-3 border border-secondary-400',
              'bg-white text-text-secondary font-medium',
              'focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary',
              'transition-all duration-200',
              errors.accreditationStatus && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            )}
            {...register('accreditationStatus')}
          >
            <option value="">Select accreditation status</option>
            <option value="accredited">Accredited Investor</option>
            <option value="qualified">Qualified Investor</option>
            <option value="institutional">Institutional Investor</option>
            <option value="other">Other</option>
          </select>
          {errors.accreditationStatus && (
            <p className="text-sm text-red-600">{errors.accreditationStatus.message}</p>
          )}
        </div>
      </div>

      {/* Investment Focus Areas */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary-navy border-b border-secondary-200 pb-2">
          Investment Focus Areas *
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {focusAreas.map((area) => (
            <label key={area.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFocusAreas.includes(area.id)}
                onChange={(e) => handleFocusAreaChange(area.id, e.target.checked)}
                className="w-4 h-4 text-accent-primary bg-white border-secondary-400 focus:ring-accent-primary/20 focus:ring-2"
              />
              <span className="text-sm font-medium text-text-secondary">{area.label}</span>
            </label>
          ))}
        </div>
        
        {errors.investmentFocus && (
          <p className="text-sm text-red-600">{errors.investmentFocus.message}</p>
        )}
      </div>

      {/* Investment Goals */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary-navy border-b border-secondary-200 pb-2">
          Investment Goals & Requirements
        </h3>
        
        <Textarea
          label="What are your investment goals and what type of opportunities are you seeking? *"
          placeholder="Describe your investment objectives, expected returns, investment criteria, due diligence requirements, and any specific sectors or business models you prefer. Be specific about what makes an investment opportunity attractive to you."
          rows={6}
          maxLength={1000}
          showCharCount
          error={errors.investmentGoals?.message}
          {...register('investmentGoals')}
        />
        
        <Textarea
          label="Additional Information (Optional)"
          placeholder="Any additional details about your investment preferences, restrictions, co-investment requirements, or questions you'd like to discuss."
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
            className="p-4 bg-red-50 border border-red-200"
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
          icon={isSubmitting ? Loader2 : TrendingUp}
          iconPosition="right"
          className="transform hover:scale-[1.02] transition-all duration-300"
        >
          {isSubmitting ? 'Submitting Investment Inquiry...' : 'Submit Investment Inquiry'}
        </Button>
        
        <p className="text-sm text-text-muted text-center mt-4">
          Our investment team will review your submission and respond with exclusive opportunities within 24-48 hours.
        </p>
      </div>
    </motion.form>
  )
}

export default InvestorInquiryForm
