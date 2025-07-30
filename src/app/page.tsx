'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Shield, Target, ArrowRight, CheckCircle, Building, Handshake, Globe, Star, Zap } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ClientSuccess from '@/components/ClientSuccess'
import MagneticButton from '@/components/MagneticButton'

export default function Home() {
  return (
    <div id="hp1" className="min-h-screen">
      {/* Hero Section with Enhanced Visual Appeal */}
      <section id="hero1" className="relative overflow-hidden bg-primary-navy py-32 text-white on-dark-bg">
        <div id="bg1" className="absolute inset-0 bg-gradient-to-br from-primary-navy via-primary-700 to-primary-800"></div>
        <div id="bg2" className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40"></div>
        <div id="cont1" className="page-container relative text-center">
          <motion.div id="anim1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <h1 id="h1" className="h1"><span id="span1" className="text-primary-gold">Empowering</span> Pakistan's Digital Future</h1>
            <p id="p1" className="lead mt-6 max-w-3xl mx-auto">We transform ambitious Pakistani businesses into national digital leaders through strategic partnerships and innovative digital solutions, delivering measurable growth and sustainable success.</p>
            <div id="btns1" className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link id="link1" href="/partner"><Button id="btn1" size="xl" icon={ArrowRight} iconPosition="right">Partner With Us</Button></Link>
              <Link id="link2" href="/about"><Button id="btn2" variant="outline" size="xl">Learn More</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Value Proposition Section */}
      <section id="sec1" className="bg-primary-platinum py-20">
        <div id="cont2" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            id="anim2"
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="h2" className="text-2xl md:text-3xl font-bold text-primary-navy mb-6">
              Driving Digital Growth Through Strategic Partnerships
            </h2>
            <div id="div1" className="max-w-4xl mx-auto text-lg text-primary-charcoal leading-relaxed">
              <motion.p 
                id="p2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Hawlton bridges the gap between traditional businesses and digital excellence, creating sustainable partnerships that benefit all stakeholders in Pakistan&apos;s growing economy.
              </motion.p>
            </div>
          </motion.div>
          
          {/* Key Value Icons with Enhanced Design */}
          <div id="grid1" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Digital Growth', description: 'Transform local presence into national reach', icon: TrendingUp },
              { title: 'Partnership', description: 'Collaborative approach for shared success', icon: Handshake },
              { title: 'Security', description: 'Transparent and secure operations', icon: Shield },
              { title: 'Impact', description: 'Creating measurable economic value', icon: Target }
            ].map((item, index) => (
              <motion.div 
                key={index}
                id={`card${index + 1}`}
                className="text-center bg-white p-6 shadow-soft hover:shadow-elevated transition-all duration-300 rounded-xl border border-gray-100 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <div id={`icon${index + 1}`} className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-accent-primary to-yellow-400 rounded-xl flex items-center justify-center shadow-gold group-hover:shadow-glow-gold transition-all duration-300">
                  <item.icon className="w-7 h-7 text-primary-navy" />
                </div>
                <h3 id={`h3_${index + 1}`} className="text-lg font-semibold text-primary-navy mb-3 group-hover:text-accent-primary transition-colors duration-300">{item.title}</h3>
                <p id={`p${index + 3}`} className="text-primary-charcoal leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="sec2" className="bg-primary-navy py-20">
        <div id="cont3" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            id="anim3"
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="h3" className="text-2xl md:text-3xl font-bold text-primary-white mb-6">
              Strategic Partnerships & Digital Innovation for Accelerated Growth.
            </h2>
            <div id="div2" className="max-w-4xl mx-auto space-y-6 text-lg text-primary-silver leading-relaxed">
              <motion.p
                id="p7"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Hawlton collaborates closely with partners, leveraging existing assets and our deep digital expertise 
                to co-create and scale online ventures.
              </motion.p>
            </div>
          </motion.div>
          
          {/* Process Flow - Clean Grid Layout */}
          <div id="grid2" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Partner', description: 'Collaborate with ambitious businesses ready for digital transformation' },
              { step: '02', title: 'Transform', description: 'Build robust digital infrastructure and scale operations nationwide' },
              { step: '03', title: 'Grow', description: 'Achieve sustainable growth through optimized digital channels' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                id={`step${index + 1}`}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div 
                  id={`box${index + 1}`}
                  className="bg-primary-platinum p-8 h-full rounded-xl"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div id={`num${index + 1}`} className="text-2xl font-bold text-accent-primary mb-4">{item.step}</div>
                  <h3 id={`h4_${index + 1}`} className="text-xl font-semibold text-primary-navy mb-3">{item.title}</h3>
                  <p id={`p${index + 8}`} className="text-primary-charcoal leading-relaxed text-sm">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section id="sec3" className="bg-primary-platinum py-20">
        <div id="cont4" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            id="anim4"
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="h4" className="text-2xl md:text-3xl font-bold text-primary-navy mb-6">
              Driving Exponential Growth: Our Collective Journey.
            </h2>
          </motion.div>
          
          <div id="grid3" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                title: 'Empowering Pakistan&apos;s Digital Economy',
                desc: 'Contributing to national economic development and job creation.',
                metric: 'Economic Impact',
                icon: Building
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                id={`impact${index + 1}`}
                className="bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div id={`row${index + 1}`} className="flex items-center justify-between mb-4">
                  <div id={`badge${index + 1}`} className="w-12 h-12 bg-gradient-gold flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary-navy" />
                  </div>
                  <span id={`metric${index + 1}`} className="text-sm font-semibold text-primary-gold uppercase tracking-wider">
                    {item.metric}
                  </span>
                </div>
                <h3 id={`h5_${index + 1}`} className="text-xl font-semibold text-primary-navy mb-3">{item.title}</h3>
                <p id={`p${index + 11}`} className="text-primary-charcoal leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <ClientSuccess />

      {/* CTA Section */}
      <section id="cta1" className="bg-gradient-navy py-20">
        <div id="cont5" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            id="anim5"
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="h5" className="text-2xl md:text-3xl font-bold text-primary-white mb-6">
              Ready to Transform Your Business with Pakistan's Digital Leader?
            </h2>
            <p id="p16" className="text-xl text-primary-silver mb-12 max-w-3xl mx-auto">
              Connect with our team to explore how Hawlton can empower your national expansion and digital transformation.
            </p>
            
            {/* CTA Buttons */}
            <div id="btns2" className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div
                id="wrap1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link id="link3" href="/partner">
                  <Button
                    id="btn3"
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
                id="wrap2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link id="link4" href="/about">
                  <Button
                    id="btn4"
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
