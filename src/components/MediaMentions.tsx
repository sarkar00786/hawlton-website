'use client'

import { motion } from 'framer-motion'
import { Award, Shield, CheckCircle, Globe } from 'lucide-react'

interface MediaMentionsProps {
  className?: string
  variant?: 'default' | 'compact'
}

const MediaMentions = ({ className = '', variant = 'default' }: MediaMentionsProps) => {
  const certifications = [
    {
      title: "SECP Registration",
      description: "Securities & Exchange Commission of Pakistan",
      icon: Award,
      type: "certification"
    },
    {
      title: "SSL Secured",
      description: "Enterprise Security Standard",
      icon: Shield,
      type: "security"
    },
    {
      title: "GDPR Compliant",
      description: "Data Protection Certified",
      icon: CheckCircle,
      type: "compliance"
    },
    {
      title: "International Standards",
      description: "ISO 27001 Compliant",
      icon: Globe,
      type: "standard"
    }
  ]

  const mediaLogos = [
    "Business Recorder",
    "Dawn News",
    "The News International",
    "Express Tribune",
    "Pakistan Today",
    "Geo News"
  ]

  if (variant === 'compact') {
    return (
      <section className={`py-12 bg-primary-platinum ${className}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary-navy mb-4">
              Trusted & Recognized
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <IconComponent className="w-5 h-5 text-primary-gold" />
                    <span className="text-sm font-medium text-primary-charcoal">
                      {cert.title}
                    </span>
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-navy mb-8">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-primary-charcoal max-w-3xl mx-auto">
              Our commitment to excellence has earned recognition from leading Pakistani 
              business organizations and international certification bodies.
            </p>
          </div>

          {/* Media Mentions */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary-navy text-center mb-8">
              As Featured In
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {mediaLogos.map((media, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-primary-platinum p-6 rounded-lg hover:shadow-md transition-shadow">
                    <div className="text-lg font-bold text-primary-navy">
                      {media}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-primary-navy text-center mb-8">
              Certifications & Compliance
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-6 bg-primary-platinum rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary-navy" />
                    </div>
                    <h4 className="text-lg font-bold text-primary-navy mb-2">
                      {cert.title}
                    </h4>
                    <p className="text-primary-charcoal text-sm">
                      {cert.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Enhanced Market Insights Section */}
          <div className="mt-20 bg-primary-navy text-primary-white rounded-2xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-primary-white mb-8">
                Pakistan's Digital Economy Opportunity
              </h3>
              <p className="text-xl text-primary-white/90 max-w-4xl mx-auto mb-8">
                Pakistan's digital economy is experiencing unprecedented growth, creating 
                massive opportunities for businesses ready to embrace digital transformation. 
                The time to act is now.
              </p>
              <div className="bg-primary-gold/20 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-primary-gold font-semibold">
                  "Pakistan is positioned to become a $50B digital economy by 2030" 
                  - World Bank Digital Economy Report
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-gold mb-2">$12B+</div>
                <div className="text-primary-white/80">Digital Economy Size</div>
                <div className="text-sm text-primary-white/60 mt-1">Growing 25% annually</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-gold mb-2">80M+</div>
                <div className="text-primary-white/80">Internet Users</div>
                <div className="text-sm text-primary-white/60 mt-1">40% penetration rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-gold mb-2">$3B+</div>
                <div className="text-primary-white/80">E-commerce Market</div>
                <div className="text-sm text-primary-white/60 mt-1">35% annual growth</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-gold mb-2">65%</div>
                <div className="text-primary-white/80">Mobile Commerce</div>
                <div className="text-sm text-primary-white/60 mt-1">Of all online sales</div>
              </div>
            </div>

            {/* Key Growth Drivers */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-primary-white/10 rounded-lg p-6 text-center">
                <h4 className="text-lg font-bold text-primary-gold mb-2">Digital Payments</h4>
                <p className="text-primary-white/80 text-sm">300% growth in digital transactions</p>
              </div>
              <div className="bg-primary-white/10 rounded-lg p-6 text-center">
                <h4 className="text-lg font-bold text-primary-gold mb-2">Youth Demographics</h4>
                <p className="text-primary-white/80 text-sm">64% population under 30 years</p>
              </div>
              <div className="bg-primary-white/10 rounded-lg p-6 text-center">
                <h4 className="text-lg font-bold text-primary-gold mb-2">SME Growth</h4>
                <p className="text-primary-white/80 text-sm">90% of businesses ready for digital</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MediaMentions
