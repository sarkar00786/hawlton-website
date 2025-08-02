'use client'

import { CheckCircle, X, Star, TrendingUp, Crown, Shield, Zap, Award, Globe, Sparkles, Target, HandHeart, Rocket, Building2 } from 'lucide-react'
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
      icon: Sparkles,
      hawltonBetter: true
    },
    {
      feature: "Revenue Model",
      hawlton: "Profit sharing partnership",
      traditional: "Fixed project fees",
      icon: HandHeart,
      hawltonBetter: true
    },
    {
      feature: "Long-term Support",
      hawlton: "Ongoing strategic partnership",
      traditional: "Limited post-project support",
      icon: Target,
      hawltonBetter: true
    },
    {
      feature: "Risk Distribution",
      hawlton: "Shared risk and reward",
      traditional: "Client bears all risk",
      icon: Shield,
      hawltonBetter: true
    },
    {
      feature: "Digital Infrastructure",
      hawlton: "Complete ecosystem provided",
      traditional: "Build from scratch each time",
      icon: Rocket,
      hawltonBetter: true
    },
    {
      feature: "Market Expertise",
      hawlton: "Pakistan-focused specialists",
      traditional: "Generic digital services",
      icon: Star,
      hawltonBetter: true
    },
    {
      feature: "Success Alignment",
      hawlton: "We succeed when you succeed",
      traditional: "Paid regardless of results",
      icon: TrendingUp,
      hawltonBetter: true
    },
    {
      feature: "Nationwide Reach",
      hawlton: "Built-in national logistics",
      traditional: "Client must arrange separately",
      icon: Globe,
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
            <p className="text-xl text-primary-charcoal max-w-3xl mx-auto mb-8">
              Compare our innovative partnership model with traditional digital agencies. 
              See why forward-thinking businesses choose Hawlton for sustainable growth.
            </p>
          </div>

          <Card className="overflow-hidden shadow-lg border border-primary-navy/10" padding="none">
            {/* Enhanced Header */}
            <div className="bg-gradient-to-r from-primary-navy to-primary-navy/90 py-6 px-8">
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <CheckCircle className="w-7 h-7 text-primary-gold mr-3" />
                    <h3 className="text-xl font-bold text-primary-white tracking-wide">KEY POINTS</h3>
                  </div>
                  <p className="text-sm font-medium text-primary-white/80">For Businesses</p>
                </div>
                <div className="text-center border-x border-primary-white/20">
                  <div className="flex items-center justify-center mb-3">
                    <Star className="w-7 h-7 text-primary-gold mr-3" />
                    <h3 className="text-xl font-bold text-primary-white tracking-wide">HAWLTON PARTNERSHIP</h3>
                  </div>
                  <p className="text-sm font-medium text-primary-white/80">Strategic Growth Partner</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Building2 className="w-7 h-7 text-primary-gold mr-3" />
                    <h3 className="text-xl font-bold text-primary-white tracking-wide">TRADITIONAL AGENCIES</h3>
                  </div>
                  <p className="text-sm font-medium text-primary-white/80">Service Providers</p>
                </div>
              </div>
            </div>

            {/* Enhanced Comparison Rows */}
            <div className="bg-white">
              {comparisonData.map((item, index) => (
                <div 
                  key={index} 
                  className={`py-5 px-8 border-b border-primary-silver/20 hover:bg-primary-platinum/30 transition-all duration-300 ${
                    index % 2 === 0 ? 'bg-primary-platinum/10' : 'bg-white'
                  }`}
                >
                  <div className="grid grid-cols-3 gap-8 items-center">
                    {/* Key Point */}
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary-navy rounded-full mr-4 flex-shrink-0"></div>
                      <h4 className="text-base font-bold text-primary-navy tracking-wide leading-tight">
                        {item.feature}
                      </h4>
                    </div>
                    
                    {/* Hawlton Partnership */}
                    <div className="py-3 px-4 border-x border-primary-silver/20">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-primary-navy font-semibold leading-relaxed">
                          {item.hawlton}
                        </span>
                      </div>
                    </div>
                    
                    {/* Traditional Agencies */}
                    <div className="py-3 px-4">
                      <div className="flex items-start">
                        <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-primary-charcoal font-medium leading-relaxed">
                          {item.traditional}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Trust Badges Section */}
            <div className="bg-gradient-to-r from-primary-platinum to-primary-platinum/80 px-8 py-10 border-t-2 border-primary-navy/10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-primary-navy mb-3">Trusted & Certified</h3>
                <p className="text-primary-charcoal font-medium">Your partnership is backed by industry-leading certifications and standards</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trustBadges.map((badge, index) => {
                  const IconComponent = badge.icon
                  return (
                    <div
                      key={index}
                      className="text-center p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-primary-navy/5"
                    >
                      <div className="w-14 h-14 bg-primary-navy/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className={`w-7 h-7 ${badge.color}`} />
                      </div>
                      <h4 className="text-sm font-bold text-primary-navy mb-2">{badge.title}</h4>
                      <p className="text-primary-charcoal text-xs leading-relaxed">{badge.description}</p>
                    </div>
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
