'use client'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Target, 
  ArrowRight, 
  CheckCircle,
  Handshake,
  Rocket,
  Globe,
  Star
} from 'lucide-react'
import PartnerInquiryForm from '@/components/forms/PartnerInquiryForm'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function PartnerWithUsPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Exponential Growth',
      description: 'Transform your local business into a national digital powerhouse with proven scaling strategies.'
    },
    {
      icon: Users,
      title: 'Collaborative Partnership',
      description: 'Work alongside our expert team to leverage your existing assets and our digital expertise.'
    },
    {
      icon: Shield,
      title: 'Risk Mitigation',
      description: 'Reduce expansion risks through our proven methodologies and shared investment model.'
    },
    {
      icon: Target,
      title: 'Targeted Results',
      description: 'Focus on measurable outcomes with clear KPIs and transparent progress tracking.'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Initial Assessment',
      description: 'We evaluate your business potential, market position, and growth opportunities.'
    },
    {
      step: '02',
      title: 'Strategic Planning',
      description: 'Develop a comprehensive digital transformation and expansion strategy.'
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Execute the plan with our team, building infrastructure and scaling operations.'
    },
    {
      step: '04',
      title: 'Growth & Optimization',
      description: 'Continuously optimize performance and expand market reach nationwide.'
    }
  ]

  const testimonials = [
    {
      quote: "Hawlton transformed our local retail business into a nationwide digital empire. Our revenue increased 400% in just 18 months.",
      author: "Ahmed Khan",
      company: "Khan Electronics",
      location: "Lahore → Nationwide"
    },
    {
      quote: "The partnership model allowed us to scale without massive upfront investment. Hawlton&apos;s expertise was game-changing.",
      author: "Fatima Sheikh",
      company: "Sheikh Textiles",
      location: "Faisalabad → National"
    }
  ]

  return (
    <div className="min-h-screen bg-primary-platinum">
      {/* Hero Section */}
      <section className="relative bg-gradient-navy text-primary-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-gold rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              className="text-center lg:text-left space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <motion.div
                  className="inline-flex items-center gap-2 bg-accent-primary/20 text-accent-primary px-4 py-2 rounded text-sm font-semibold"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Handshake className="w-4 h-4" />
                  Strategic Partnership Program
                </motion.div>
                
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
                  Partner With{' '}
                  <span className="text-gradient-gold">Hawlton</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-primary-silver leading-relaxed max-w-2xl">
                  Transform your business through strategic partnership. Scale operations, expand nationwide, and achieve exponential growth together.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="transform hover:scale-105"
                  onClick={() => document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Partnership Journey
                </Button>
                
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary-white text-primary-white hover:bg-primary-white hover:text-primary-navy"
                  >
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Stats */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                { number: '400%', label: 'Average Revenue Growth' },
                { number: '18', label: 'Months to National Scale' },
                { number: '50+', label: 'Cities Reached' },
                { number: '95%', label: 'Partner Satisfaction' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-primary-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-accent-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-primary-silver">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
              Why Partner With Hawlton?
            </h2>
            <p className="text-xl text-primary-charcoal max-w-3xl mx-auto">
              Join Pakistan&apos;s most successful digital transformation program and unlock unprecedented growth potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-primary-navy" />
                </div>
                <h3 className="text-xl font-semibold text-primary-navy mb-4">{benefit.title}</h3>
                <p className="text-primary-charcoal leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Partnership Process
            </h2>
            <p className="text-xl text-primary-silver max-w-3xl mx-auto">
              Our proven 4-step methodology ensures successful transformation and sustainable growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-primary-platinum rounded-xl p-8 h-full">
                  <div className="text-6xl font-bold text-accent-primary mb-4">{step.step}</div>
                  <h3 className="text-xl font-semibold text-primary-navy mb-4">{step.title}</h3>
                  <p className="text-primary-charcoal">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-primary-charcoal max-w-3xl mx-auto">
              Hear from partners who transformed their businesses with Hawlton.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-primary fill-current" />
                  ))}
                </div>
                
                <p className="text-primary-charcoal text-lg leading-relaxed mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-primary-navy">{testimonial.author}</div>
                    <div className="text-primary-charcoal">{testimonial.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-accent-primary font-semibold">{testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Form Section */}
      <section id="partner-form" className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-primary-charcoal max-w-3xl mx-auto">
              Complete the partnership inquiry form below and our team will contact you within 24-48 hours to discuss your growth opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PartnerInquiryForm />
          </motion.div>
        </div>
      </section>

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
              Questions About Partnership?
            </h2>
            <p className="text-xl text-primary-silver max-w-3xl mx-auto">
              Our partnership team is ready to answer your questions and help you understand how Hawlton can accelerate your business growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="transform hover:scale-105"
                >
                  Schedule Free Consultation
                </Button>
              </Link>
              
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-white text-primary-white hover:bg-primary-white hover:text-primary-navy"
                >
                  Learn More About Hawlton
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
