'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, Mail, Phone, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { cn } from '@/lib/utils'

// Simplified validation schema - only 4 essential fields
const quickPartnerSchema = z.object({
  fullName: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  businessType: z.string().min(2, 'Business type required')
})

type QuickPartnerFormData = z.infer<typeof quickPartnerSchema>

interface QuickPartnerFormProps {
  onSuccess?: () => void
  className?: string
}

const QuickPartnerForm: React.FC<QuickPartnerFormProps> = ({
  onSuccess,
  className
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<QuickPartnerFormData>({
    resolver: zodResolver(quickPartnerSchema),
    mode: 'onChange'
  })

  const onSubmit = async (data: QuickPartnerFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
      onSuccess?.()
      
      // Track form submission
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'Lead Generation',
          event_label: 'Quick Partner Form',
          value: 1
        })
      }
      
      // Reset after 3 seconds
      setTimeout(() => {
        reset()
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        className={cn('max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg', className)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center space-y-4">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          <h3 className="text-xl font-bold text-primary-navy">
            We'll Call You Back!
          </h3>
          <p className="text-primary-charcoal">
            Our team will contact you within 24 hours to discuss your partnership potential.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.form
      className={cn('max-w-md mx-auto space-y-4 p-6 bg-white rounded-xl shadow-lg', className)}
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary-navy mb-2">
          Quick Partnership Check
        </h3>
        <p className="text-primary-charcoal text-sm">
          Takes 30 seconds. We'll call you back within 24 hours.
        </p>
      </div>

      {/* Name Field */}
      <div>
        <Input
          {...register('fullName')}
          placeholder="Your Full Name"
          className="w-full text-base py-3"
          error={errors.fullName?.message}
          leftIcon={<User className="w-5 h-5" />}
        />
      </div>

      {/* Email Field */}
      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder="your@email.com"
          className="w-full text-base py-3"
          error={errors.email?.message}
          leftIcon={<Mail className="w-5 h-5" />}
        />
      </div>

      {/* Phone Field */}
      <div>
        <Input
          {...register('phone')}
          type="tel"
          placeholder="Your Phone Number"
          className="w-full text-base py-3"
          error={errors.phone?.message}
          leftIcon={<Phone className="w-5 h-5" />}
        />
      </div>

      {/* Business Type Field */}
      <div>
        <Input
          {...register('businessType')}
          placeholder="What do you sell? (e.g., jewelry, clothing, food)"
          className="w-full text-base py-3"
          error={errors.businessType?.message}
        />
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="text-red-500 text-sm text-center">
          {submitError}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-gold text-primary-navy hover:bg-primary-gold/90 py-3 text-lg font-semibold"
        icon={isSubmitting ? Loader2 : ArrowRight}
        iconPosition="right"
      >
        {isSubmitting ? 'Submitting...' : 'Get Partnership Details'}
      </Button>

      <p className="text-xs text-primary-charcoal/60 text-center">
        No spam. No upfront costs. Just a quick call to see if we're a good fit.
      </p>
    </motion.form>
  )
}

export default QuickPartnerForm
