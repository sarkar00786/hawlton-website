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

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {guaranteeFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-primary-navy" />
                    </div>
                    <h4 className="text-base font-bold text-primary-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-primary-white/80">{feature.description}</p>
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
    <section className={`py-20 bg-primary-white ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Success Guarantee Section */}
          <Card variant="navy" padding="none" className="mb-12">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-navy to-primary-navy/90 px-8 py-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary-white mb-4">
                  Our Success Guarantee
                </h2>
                <p className="text-xl text-primary-white/90 max-w-3xl mx-auto leading-relaxed">
                  Unlike traditional agencies that get paid regardless of results, we only succeed when you succeed. 
                  Our profit-sharing model ensures we're fully invested in your growth.
                </p>
              </motion.div>
            </div>

            {/* Guarantee Features */}
            <div className="px-8 py-12 bg-primary-navy">
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
                      className="text-center group"
                    >
                      <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-primary-navy" />
                      </div>
                      <h3 className="text-xl font-bold text-primary-white mb-3">{feature.title}</h3>
                      <p className="text-primary-white/90 mb-3 font-medium">{feature.description}</p>
                      <p className="text-primary-white/70 text-sm leading-relaxed">{feature.detail}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Call to Action */}
            {showCTA && (
              <div className="bg-primary-gold px-8 py-8 text-center">
                <h3 className="text-xl font-bold text-primary-navy mb-3">
                  Ready to Experience Risk-Free Growth?
                </h3>
                <p className="text-primary-navy/80 mb-6 max-w-2xl mx-auto">
                  Join successful Pakistani businesses who chose partnership over traditional agency services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/partnership"
                    className="inline-flex items-center bg-primary-navy text-primary-white px-8 py-3 font-semibold hover:bg-primary-navy/90 transition-colors group"
                  >
                    Start Your Partnership Journey
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="/case-studies"
                    className="inline-flex items-center border-2 border-primary-navy text-primary-navy px-8 py-3 font-semibold hover:bg-primary-navy hover:text-primary-white transition-colors"
                  >
                    View Success Stories
                  </a>
                </div>
              </div>
            )}
          </Card>

        </div>
      </div>
    </section>
  )
}

export default SuccessGuarantee
