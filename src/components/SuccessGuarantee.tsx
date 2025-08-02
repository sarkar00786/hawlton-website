'use client'

import { motion } from 'framer-motion'
import { CheckCircle, TrendingUp, Star, Shield, Award, Globe, ArrowRight } from 'lucide-react'
import { Card } from './ui/Card'

interface SuccessGuaranteeProps {
  className?: string
  variant?: 'default' | 'compact'
  showCTA?: boolean
}

const SuccessGuarantee = ({ 
  className = '', 
  variant = 'default',
  showCTA = true 
}: SuccessGuaranteeProps) => {
  const guaranteeFeatures = [
    {
      icon: CheckCircle,
      title: "No Risk",
      description: "Zero upfront investment required",
      detail: "Start your digital transformation journey without any financial risk to your business"
    },
    {
      icon: TrendingUp,
      title: "Shared Growth",
      description: "We grow when your business grows",
      detail: "Our success is directly tied to your success through our profit-sharing partnership model"
    },
    {
      icon: Star,
      title: "Full Support",
      description: "Complete digital ecosystem provided",
      detail: "From strategy to execution, we provide end-to-end digital solutions and ongoing support"
    }
  ]

  const trustBadges = [
    {
      icon: Award,
      title: "SECP Registration",
      description: "Securities & Exchange Commission of Pakistan",
      color: "text-primary-gold"
    },
    {
      icon: Shield,
      title: "SSL Secured",
      description: "Enterprise Security Standard",
      color: "text-green-600"
    },
    {
      icon: CheckCircle,
      title: "GDPR Compliant",
      description: "Data Protection Certified",
      color: "text-blue-600"
    },
    {
      icon: Globe,
      title: "International Standards",
      description: "ISO 27001 Compliant",
      color: "text-purple-600"
    }
  ]

  if (variant === 'compact') {
    return (
      <section className={`py-12 bg-primary-navy ${className}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary-white mb-4">
                Our Success Guarantee
              </h3>
              <p className="text-primary-white/90 max-w-2xl mx-auto mb-8">
                Unlike traditional agencies that get paid regardless of results, we only succeed when you succeed.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {guaranteeFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary-navy" />
                    </div>
                    <h4 className="text-lg font-bold text-primary-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-primary-white/90 font-medium mb-2">{feature.description}</p>
                    <p className="text-xs text-primary-white/70 leading-relaxed px-2">{feature.detail}</p>
                  </div>
                )
              })}
            </div>

            {/* Trust Badges - Compact */}
            <div className="flex flex-wrap justify-center items-center gap-4 pt-6 border-t border-primary-white/20">
              {trustBadges.map((badge, index) => {
                const IconComponent = badge.icon
                return (
                  <div key={index} className="flex items-center space-x-2 text-primary-white/70">
                    <IconComponent className={`w-4 h-4 ${badge.color}`} />
                    <span className="text-sm font-medium">{badge.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-16 bg-primary-platinum ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-6">
              Our Success Guarantee
            </h2>
            <p className="text-lg text-primary-charcoal/90 max-w-3xl mx-auto leading-relaxed">
              Unlike traditional agencies that get paid regardless of results, we only succeed when you succeed. 
              Our profit-sharing model ensures we're fully invested in your growth.
            </p>
          </motion.div>

          {/* Guarantee Features */}
          <div className="grid md:grid-cols-3 gap-8">
            {guaranteeFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300 group h-full flex flex-col" padding="lg" variant="elevated">
                    <div className="w-16 h-16 bg-primary-gold/20 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-primary-navy" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-navy mb-3">{feature.title}</h3>
                    <p className="text-primary-charcoal/90 font-medium mb-4 text-base">{feature.description}</p>
                    <p className="text-primary-charcoal/70 text-sm leading-relaxed flex-grow">{feature.detail}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

export default SuccessGuarantee
