'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Target, Globe, Building2, ArrowRight, CheckCircle } from 'lucide-react'

interface SuccessMetric {
  client: string
  industry: string
  challenge: string
  solution: string
  results: {
    revenueGrowth?: string
    marketReach?: string
    timeframe: string
    investment?: string
    onlineRevenue?: string
    internationalReach?: string
    costReduction?: string
  }
  confidential?: boolean
}

const successMetrics: SuccessMetric[] = [
  {
    client: "Leading Pakistani E-commerce Platform*",
    industry: "Retail & E-commerce",
    challenge: "Limited to Karachi market with ₨25M annual revenue ceiling",
    solution: "Nationwide digital expansion strategy with advanced logistics integration",
    results: {
      revenueGrowth: "300%",
      marketReach: "All major Pakistani cities + 15 tier-2 cities",
      timeframe: "18 months",
      investment: "₨25M → ₨100M valuation"
    },
    confidential: true
  },
  {
    client: "Traditional Manufacturing Enterprise*",
    industry: "Textiles & Manufacturing",
    challenge: "100% offline operations with declining local market share",
    solution: "Complete digital transformation with international B2B platform",
    results: {
      onlineRevenue: "₨15M annually",
      internationalReach: "12 countries",
      costReduction: "40% operational costs",
      timeframe: "12 months"
    },
    confidential: true
  },
  {
    client: "Regional Food & Beverage Chain*",
    industry: "Food Service",
    challenge: "Limited brand awareness beyond Punjab region",
    solution: "Integrated digital marketing + delivery platform + franchise model",
    results: {
      revenueGrowth: "250%",
      marketReach: "3 provinces + national delivery network",
      timeframe: "24 months",
      investment: "₨10M → ₨35M valuation"
    },
    confidential: true
  }
]

const ClientSuccess = () => {
  return (
    <section className="bg-primary-platinum py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
            Client Success Stories: Proven Results
          </h2>
          <p className="text-xl text-primary-charcoal max-w-4xl mx-auto leading-relaxed">
            Real transformations, measurable impact. See how we&apos;ve helped Pakistani businesses 
            achieve exponential growth through strategic digital partnerships.
          </p>
          <div className="flex items-center justify-center mt-6 text-sm text-primary-silver">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>*Client names confidential per partnership agreements</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {successMetrics.map((success, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary-navy mb-2">
                    {success.client}
                  </h3>
                  <div className="inline-flex items-center bg-primary-gold/10 text-primary-gold px-3 py-1 rounded-full text-sm font-medium">
                    <Building2 className="w-4 h-4 mr-1" />
                    {success.industry}
                  </div>
                </div>
              </div>

              {/* Challenge */}
              <div className="mb-6">
                <h4 className="font-semibold text-primary-navy mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-red-500" />
                  Challenge
                </h4>
                <p className="text-primary-charcoal text-sm leading-relaxed">
                  {success.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <h4 className="font-semibold text-primary-navy mb-2 flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                  Solution
                </h4>
                <p className="text-primary-charcoal text-sm leading-relaxed">
                  {success.solution}
                </p>
              </div>

              {/* Results */}
              <div className="border-t border-primary-gold/20 pt-6">
                <h4 className="font-semibold text-primary-navy mb-4 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                  Results ({success.results.timeframe})
                </h4>
                <div className="space-y-3">
                  {success.results.revenueGrowth && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-primary-charcoal">Revenue Growth:</span>
                      <span className="font-bold text-green-600">{success.results.revenueGrowth}</span>
                    </div>
                  )}
                  {success.results.marketReach && (
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-primary-charcoal">Market Reach:</span>
                      <span className="font-medium text-blue-600 text-right flex-1 ml-2 text-sm">
                        {success.results.marketReach}
                      </span>
                    </div>
                  )}
                  {success.results.investment && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-primary-charcoal">Valuation:</span>
                      <span className="font-bold text-primary-gold">{success.results.investment}</span>
                    </div>
                  )}
                  {success.results.onlineRevenue && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-primary-charcoal">Online Revenue:</span>
                      <span className="font-bold text-green-600">{success.results.onlineRevenue}</span>
                    </div>
                  )}
                  {success.results.internationalReach && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-primary-charcoal">Global Reach:</span>
                      <span className="font-medium text-blue-600">{success.results.internationalReach}</span>
                    </div>
                  )}
                  {success.results.costReduction && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-primary-charcoal">Cost Savings:</span>
                      <span className="font-bold text-green-600">{success.results.costReduction}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Metrics Summary */}
        <motion.div 
          className="bg-primary-navy p-8 rounded-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-primary-white mb-8">
            Collective Impact Across Portfolio
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-gold mb-2">₨2.5B+</div>
              <div className="text-sm text-primary-silver">Total Portfolio Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-gold mb-2">300%+</div>
              <div className="text-sm text-primary-silver">Average Growth Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-gold mb-2">50+</div>
              <div className="text-sm text-primary-silver">Successful Partnerships</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-gold mb-2">18mo</div>
              <div className="text-sm text-primary-silver">Average ROI Timeline</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ClientSuccess
