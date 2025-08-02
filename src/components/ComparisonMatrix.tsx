'use client'

import { CheckCircle, X, Star, TrendingUp, Crown, Shield, Zap, Award, Globe } from 'lucide-react'
import { Card } from './ui/Card'
import { motion } from 'framer-motion'

interface ComparisonMatrixProps {
  className?: string
}

const ComparisonMatrix = ({ className = '' }: ComparisonMatrixProps) => {
  const comparisonData = [
    {
      feature: "Investment Required",
      hawlton: "Zero upfront cost",
      traditional: "High upfront investment",
      hawltonBetter: true
    },
    {
      feature: "Revenue Model",
      hawlton: "Profit sharing partnership",
      traditional: "Fixed project fees",
      hawltonBetter: true
    },
    {
      feature: "Long-term Support",
      hawlton: "Ongoing strategic partnership",
      traditional: "Limited post-project support",
      hawltonBetter: true
    },
    {
      feature: "Risk Distribution",
      hawlton: "Shared risk and reward",
      traditional: "Client bears all risk",
      hawltonBetter: true
    },
    {
      feature: "Digital Infrastructure",
      hawlton: "Complete ecosystem provided",
      traditional: "Build from scratch each time",
      hawltonBetter: true
    },
    {
      feature: "Market Expertise",
      hawlton: "Pakistan-focused specialists",
      traditional: "Generic digital services",
      hawltonBetter: true
    },
    {
      feature: "Success Alignment",
      hawlton: "We succeed when you succeed",
      traditional: "Paid regardless of results",
      hawltonBetter: true
    },
    {
      feature: "Nationwide Reach",
      hawlton: "Built-in national logistics",
      traditional: "Client must arrange separately",
      hawltonBetter: true
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

  return (
    <section className={`py-20 bg-primary-white ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-navy mb-8">
              Why Choose Partnership Over Traditional Agencies?
            </h2>
            <p className="text-xl text-primary-charcoal max-w-3xl mx-auto">
              Compare our innovative partnership model with traditional digital agencies. 
              See why forward-thinking businesses choose Hawlton for sustainable growth.
            </p>
          </div>

    <Card className="overflow-hidden" padding="none">
        <div className="bg-primary-navy py-4 px-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center flex items-center justify-center py-2">
              <h3 className="text-xl font-bold text-primary-white tracking-wide">FEATURE</h3>
            </div>
            <div className="text-center bg-primary-gold/20 rounded-lg py-3 px-4 border-2 border-primary-gold/30">
              <div className="flex items-center justify-center mb-1">
                <Star className="w-6 h-6 text-primary-gold mr-2" />
                <h3 className="text-xl font-bold text-primary-gold tracking-wide">HAWLTON PARTNERSHIP</h3>
              </div>
              <p className="text-sm font-medium text-primary-white/90">Strategic Growth Partner</p>
            </div>
            <div className="text-center flex flex-col items-center justify-center py-2">
              <h3 className="text-xl font-bold text-primary-white mb-1 tracking-wide">TRADITIONAL AGENCIES</h3>
              <p className="text-sm font-medium text-primary-white/70">Service Providers</p>
            </div>
          </div>
        </div>

            <div className="divide-y divide-primary-silver/20">
              {comparisonData.map((item, index) => (
                <div key={index} className="py-4 px-6 hover:bg-primary-platinum/50 transition-colors">
                  <div className="grid grid-cols-3 gap-6 items-center">
                    <div>
                      <h4 className="text-sm font-semibold text-primary-navy uppercase tracking-wide">{item.feature}</h4>
                    </div>
                    <div className="bg-primary-gold/10 rounded-lg py-3 px-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-primary-navy font-medium">{item.hawlton}</span>
                      </div>
                    </div>
                    <div className="py-3 px-4">
                      <div className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-primary-charcoal">{item.traditional}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges Section at Bottom */}
            <div className="bg-primary-platinum px-6 py-8 border-t border-primary-silver/30">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-primary-navy mb-2">Trusted & Certified</h3>
                <p className="text-primary-charcoal text-sm">Your partnership is backed by industry-leading certifications and standards</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trustBadges.map((badge, index) => {
                  const IconComponent = badge.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center group p-4 bg-white rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 bg-primary-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md group-hover:shadow-lg transition-shadow">
                        <IconComponent className={`w-6 h-6 ${badge.color}`} />
                      </div>
                      <h4 className="text-sm font-bold text-primary-navy mb-1">{badge.title}</h4>
                      <p className="text-primary-charcoal text-xs leading-relaxed">{badge.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

          </Card>

        </div>
      </div>
    </section>
  )
}

export default ComparisonMatrix
