'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Shield, Target, ArrowRight, CheckCircle, Building, Handshake, Globe, Star, Zap } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ClientSuccess from '@/components/ClientSuccess'
import MagneticButton from '@/components/MagneticButton'
import AnimatedStats from '@/components/AnimatedStats'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero-section" className="relative bg-primary-navy text-primary-white py-24 pt-32" style={{ isolation: 'isolate' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-[1]">
          <div className="text-center">
            {/* Main Content */}
            <motion.div
              className="space-y-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
                  Empowering{' '}
                  <span className="text-gradient-gold">Pakistan&apos;s</span>
                  {' '}Digital Future
                </h1>
                
                <p className="text-xl md:text-2xl text-primary-silver leading-relaxed max-w-3xl mx-auto">
                  We transform ambitious Pakistani businesses into national digital leaders through strategic partnerships and secure investment opportunities, delivering measurable growth and sustainable ROI across Pakistan&apos;s thriving digital economy.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/partner">
                    <Button
                      variant="primary"
                      size="lg"
                      icon={ArrowRight}
                      iconPosition="right"
                      className="transform hover:scale-105"
                    >
                      Start Your Digital Growth Journey
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/invest">
                    <Button
                      variant="outline"
                      size="lg"
                      icon={ArrowRight}
                      iconPosition="right"
                      className="border-primary-white text-primary-white hover:bg-primary-white hover:text-primary-navy"
                    >
                      Explore Investment Opportunities
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Value Proposition Section */}
      <section id="value-proposition" className="bg-primary-platinum py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
              Driving Digital Growth Through Strategic Partnerships
            </h2>
            <div className="max-w-4xl mx-auto text-lg text-primary-charcoal leading-relaxed">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Hawlton bridges the gap between traditional businesses and digital excellence, creating sustainable partnerships that benefit all stakeholders in Pakistan&apos;s growing economy.
              </motion.p>
            </div>
          </motion.div>
          
          {/* Key Value Icons */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Digital Growth', description: 'Transform local presence into national reach', icon: TrendingUp },
              { title: 'Partnership', description: 'Collaborative approach for shared success', icon: Handshake },
              { title: 'Security', description: 'Transparent and secure operations', icon: Shield },
              { title: 'Impact', description: 'Creating measurable economic value', icon: Target }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="text-center bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-gold flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary-navy" />
                </div>
                <h3 className="text-xl font-semibold text-primary-navy mb-2">{item.title}</h3>
                <p className="text-primary-charcoal">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="approach" className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-white mb-6">
              Strategic Partnerships & Impact Investment for Accelerated Growth.
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-primary-silver leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Hawlton collaborates closely with partners, leveraging existing assets and our deep digital expertise 
                to co-create and scale online ventures.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                We offer a transparent, secure platform for investors to participate directly in Pakistan&apos;s digital 
                economic boom, ensuring mutual success and sustainable expansion.
              </motion.p>
            </div>
          </motion.div>
          
          {/* Process Flow - Clean Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Partner', description: 'Collaborate with ambitious businesses ready for digital transformation' },
              { step: '02', title: 'Transform', description: 'Build robust digital infrastructure and scale operations nationwide' },
              { step: '03', title: 'Grow', description: 'Achieve sustainable growth through optimized digital channels' }
            ].map((item, index) => (
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

      {/* Our Impact Section */}
      <section id="impact" className="bg-primary-platinum py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
              Driving Exponential Growth: Our Collective Journey.
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Transforming Local Presence into National Reach',
                desc: 'Enabling businesses to connect with customers nationwide.',
                metric: 'National Scale',
                icon: Globe
              },
              {
                title: 'Unlocking Digital Potential',
                desc: 'Guiding traditional enterprises into the lucrative online marketplace.',
                metric: 'Digital Growth',
                icon: Zap
              },
              {
                title: 'Driving Exponential Growth for Partners',
                desc: 'Achieving significant revenue increases and market share expansion.',
                metric: 'Revenue Growth',
                icon: TrendingUp
              },
              {
                title: 'Optimizing Operations',
                desc: 'Streamlining logistics and customer acquisition through digital innovation.',
                metric: 'Efficiency Gains',
                icon: Target
              },
              {
                title: 'Creating High-Impact Investment Opportunities',
                desc: 'Delivering secure, substantial returns by fueling real economic growth.',
                metric: 'ROI Excellence',
                icon: Star
              },
              {
                title: 'Empowering Pakistan&apos;s Digital Economy',
                desc: 'Contributing to national economic development and job creation.',
                metric: 'Economic Impact',
                icon: Building
              }
            ].map((item, index) => (
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
                  <div className="w-12 h-12 bg-gradient-gold flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary-navy" />
                  </div>
                  <span className="text-sm font-semibold text-primary-gold uppercase tracking-wider">
                    {item.metric}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-primary-navy mb-3">{item.title}</h3>
                <p className="text-primary-charcoal leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <ClientSuccess />

      {/* CTA Section */}
      <section className="bg-gradient-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-white mb-6">
              Ready to Transform Your Business or Invest in Pakistan&apos;s Digital Future?
            </h2>
            <p className="text-xl text-primary-silver mb-12 max-w-3xl mx-auto">
              Connect with our team to explore how Hawlton can empower your national expansion or secure your impactful investment.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/partner">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="transform hover:scale-105 px-8 py-4"
                  >
                    Start Your Growth Journey
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="border-primary-white text-primary-white hover:bg-primary-white hover:text-primary-navy px-8 py-4"
                  >
                    Discover Hawlton
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
