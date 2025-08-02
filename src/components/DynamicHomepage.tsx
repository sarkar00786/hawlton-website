'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Building } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ClientSuccess from '@/components/ClientSuccess'
import { client, queries, toPlainText } from '@/lib/sanity'
import { iconMap } from '@/utils/iconMap'

interface HomepageData {
  heroSection: {
    mainHeadline: string
    subheadline: string
    primaryCtaText: string
    primaryCtaLink: string
    secondaryCtaText: string
    secondaryCtaLink: string
  }
  valueProposition: {
    headline: string
    description: Array<{_type: string; children: Array<{text: string}>}>
    valueItems: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  approachSection: {
    headline: string
    description: Array<{_type: string; children: Array<{text: string}>}>
    processSteps: Array<{
      step: string
      title: string
      description: string
    }>
  }
  impactSection: {
    headline: string
    impactItems: Array<{
      title: string
      description: string
      metric: string
    }>
  }
  ctaSection: {
    headline: string
    description: string
    primaryCtaText: string
    primaryCtaLink: string
    secondaryCtaText: string
    secondaryCtaLink: string
  }
}

export default function DynamicHomepage() {
  const [data, setData] = useState<HomepageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homepageData = await client.fetch(queries.homepage)
        setData(homepageData)
      } catch (error) {
        console.error('Error fetching homepage data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-gold"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-navy mb-4">Content Not Found</h2>
          <p className="text-primary-charcoal">Please check your Sanity CMS configuration.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary-navy text-primary-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              className="space-y-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <motion.div
                  className="inline-flex items-center gap-2 bg-accent-primary/20 text-accent-primary px-4 py-2 rounded-full text-sm font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Building className="w-4 h-4" />
                  Digital Transformation Partner
                </motion.div>
                
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
                  {data.heroSection?.mainHeadline || "Empowering Pakistan's Digital Future"}
                </h1>
                
                <p className="text-xl md:text-2xl text-primary-silver leading-relaxed max-w-3xl mx-auto">
                  {data.heroSection?.subheadline || "We transform ambitious Pakistani businesses into national digital leaders through strategic partnerships and innovative digital solutions."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href={data.heroSection?.primaryCtaLink || "/partner"}>
                    <Button
                      variant="primary"
                      size="lg"
                      icon={ArrowRight}
                      iconPosition="right"
                      className="transform hover:scale-105"
                    >
                      {data.heroSection?.primaryCtaText || "Start Your Digital Growth Journey"}
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href={data.heroSection?.secondaryCtaLink || "/contact"}>
                    <Button
                      variant="outline"
                      size="lg"
                      icon={ArrowRight}
                      iconPosition="right"
                      className="border-primary-white text-primary-white hover:bg-primary-white hover:text-primary-navy"
                    >
                      {data.heroSection?.secondaryCtaText || "Get In Touch"}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Value Proposition Section */}
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
              {data.valueProposition?.headline || "Driving Digital Growth Through Strategic Partnerships"}
            </h2>
            <div className="max-w-4xl mx-auto text-lg text-primary-charcoal leading-relaxed">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {toPlainText(data.valueProposition?.description) || "Hawlton bridges the gap between traditional businesses and digital excellence, creating sustainable partnerships that benefit all stakeholders in Pakistan's growing economy."}
              </motion.p>
            </div>
          </motion.div>
          
          {/* Dynamic Value Items */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {data.valueProposition?.valueItems?.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Building
              return (
                <motion.div 
                  key={index} 
                  className="text-center bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="w-16 h-16 bg-primary-gold rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-primary-navy" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-navy mb-2">{item.title}</h3>
                  <p className="text-primary-charcoal">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-white mb-6">
              {data.approachSection?.headline || "Strategic Partnerships & Digital Innovation for Accelerated Growth."}
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-primary-silver leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {toPlainText(data.approachSection?.description) || "Hawlton collaborates closely with partners, leveraging existing assets and our deep digital expertise to co-create and scale online ventures."}
              </motion.p>
            </div>
          </motion.div>
          
          {/* Dynamic Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.approachSection?.processSteps?.map((item, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div 
                  className="bg-primary-platinum p-8 h-full rounded-xl"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-5xl font-bold text-accent-primary mb-4">{item.step}</div>
                  <h3 className="text-2xl font-semibold text-primary-navy mb-4">{item.title}</h3>
                  <p className="text-primary-charcoal leading-relaxed">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
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
              {data.impactSection?.headline || "Driving Exponential Growth: Our Collective Journey."}
            </h2>
          </motion.div>
          
          {/* Dynamic Impact Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.impactSection?.impactItems?.map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-primary-gold rounded-xl flex items-center justify-center mb-6">
                    <Building className="w-6 h-6 text-primary-navy" />
                  </div>
                  <span className="text-sm font-semibold text-primary-gold uppercase tracking-wider">
                    {item.metric}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-primary-navy mb-3">{item.title}</h3>
                <p className="text-primary-charcoal leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ClientSuccess />

      {/* CTA Section */}
      <section className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-white mb-6">
              {data.ctaSection?.headline || "Ready to Transform Your Business with Pakistan's Digital Future?"}
            </h2>
            <p className="text-xl text-primary-silver mb-12 max-w-3xl mx-auto">
              {data.ctaSection?.description || "Connect with our team to explore how Hawlton can empower your national expansion through strategic partnerships."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={data.ctaSection?.primaryCtaLink || "/partner"}>
                  <Button
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="transform hover:scale-105"
                  >
                    {data.ctaSection?.primaryCtaText || "Start Your Growth Journey"}
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={data.ctaSection?.secondaryCtaLink || "/about"}>
                  <Button
                    variant="outline"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="border-primary-white text-primary-white hover:bg-primary-white hover:text-primary-navy"
                  >
                    {data.ctaSection?.secondaryCtaText || "Discover Hawlton"}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
