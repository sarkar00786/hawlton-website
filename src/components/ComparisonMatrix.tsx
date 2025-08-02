'use client'

import { CheckCircle, X, Star, TrendingUp } from 'lucide-react'
import { Card } from './ui/Card'

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
            <div className="bg-primary-navy p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center flex items-center justify-center p-4">
                  <h3 className="text-xl font-bold text-primary-white">Feature</h3>
                </div>
                <div className="text-center bg-primary-gold/20 rounded-lg p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-6 h-6 text-primary-gold mr-2" />
                    <h3 className="text-xl font-bold text-primary-gold">Hawlton Partnership</h3>
                  </div>
                  <p className="text-sm text-primary-white/80">Strategic Growth Partner</p>
                </div>
                <div className="text-center flex flex-col items-center justify-center p-4">
                  <h3 className="text-xl font-bold text-primary-white mb-2">Traditional Agencies</h3>
                  <p className="text-sm text-primary-white/60">Service Providers</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-primary-silver/20">
              {comparisonData.map((item, index) => (
                <div key={index} className="p-6 hover:bg-primary-platinum/50 transition-colors">
                  <div className="grid grid-cols-3 gap-6 items-center">
                    <div>
                      h4 className="text-sm font-semibold text-primary-navy"{item.feature}/h4
                    </div>
                    <div className="bg-primary-gold/10 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-primary-navy font-medium">{item.hawlton}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center">
                        <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                        <span className="text-primary-charcoal">{item.traditional}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary-gold p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary-navy mb-4">
                  Ready to Experience the Hawlton Advantage?
                </h3>
                <p className="text-primary-navy/80 mb-6">
                  Join successful Pakistani businesses who chose partnership over traditional agency services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/partnership"
                    className="inline-flex items-center bg-primary-navy text-primary-white px-8 py-3 font-semibold hover:bg-primary-navy/90 transition-colors"
                  >
                    Start Your Partnership Journey
                    <TrendingUp className="ml-2 w-5 h-5" />
                  </a>
                  <a
                    href="/solutions"
                    className="inline-flex items-center border-2 border-primary-navy text-primary-navy px-8 py-3 font-semibold hover:bg-primary-navy hover:text-primary-white transition-colors"
                  >
                    Explore Our Solutions
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Success Guarantee Section */}
          <div className="mt-16 text-center">
            <div className="bg-primary-navy rounded-2xl p-12">
              <h3 className="text-3xl font-bold text-primary-white mb-6">
                Our Success Guarantee
              </h3>
              <p className="text-xl text-primary-white/90 max-w-3xl mx-auto mb-8">
                Unlike traditional agencies that get paid regardless of results, we only succeed when you succeed. 
                Our profit-sharing model ensures we're fully invested in your growth.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-primary-navy" />
                  </div>
                  <h4 className="text-xl font-bold text-primary-white mb-2">No Risk</h4>
                  <p className="text-primary-white/80">Zero upfront investment required</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-10 h-10 text-primary-navy" />
                  </div>
                  <h4 className="text-xl font-bold text-primary-white mb-2">Shared Growth</h4>
                  <p className="text-primary-white/80">We grow when your business grows</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-10 h-10 text-primary-navy" />
                  </div>
                  <h4 className="text-xl font-bold text-primary-white mb-2">Full Support</h4>
                  <p className="text-primary-white/80">Complete digital ecosystem provided</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComparisonMatrix
