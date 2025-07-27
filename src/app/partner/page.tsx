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
        <div className="absolute inset-0 opacity-10 -z-10">
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

      {/* Partnership Types Section */}
      <section id="partnership-types-section" className="bg-primary-platinum py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-8">
              Partnership Models Available
            </h2>
            <p className="text-xl text-primary-charcoal max-w-4xl mx-auto leading-relaxed">
              Choose the partnership structure that aligns with your business goals, investment capacity, and growth ambitions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Inventory Partnership Model */}
            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary-gold/20 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-3xl">📦</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-navy">Inventory Partnership</h3>
                  <p className="text-primary-charcoal">Partner with inventory contribution</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-primary-charcoal leading-relaxed">
                  You provide the inventory and products, we handle the digital transformation, marketing, and sales infrastructure. Perfect for businesses with strong product lines looking to expand digitally.
                </p>
                
                <div className="bg-primary-navy/5 rounded-lg p-4">
                  <h4 className="font-semibold text-primary-navy mb-2">Revenue Share Model:</h4>
                  <ul className="space-y-2 text-sm text-primary-charcoal">
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Partner: 60% of net revenue</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Hawlton: 40% of net revenue</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Minimum commitment: 12 months</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary-navy">What We Provide:</h4>
                  <ul className="space-y-1 text-sm text-primary-charcoal">
                    <li>• Digital platform development</li>
                    <li>• Marketing and customer acquisition</li>
                    <li>• Logistics and fulfillment</li>
                    <li>• Customer service and support</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Full Investment Partnership Model */}
            <motion.div
              className="bg-gradient-to-br from-primary-navy to-primary-navy/90 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-white relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute top-4 right-4 bg-primary-gold text-primary-navy px-3 py-1 rounded-full text-xs font-bold">
                PREMIUM
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary-gold/20 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-3xl">🤝</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-white">Full Investment Partnership</h3>
                  <p className="text-primary-silver">Inventory + Direct running expenses</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-primary-silver leading-relaxed">
                  You provide inventory AND cover direct running expenses (marketing, logistics, operations). Higher investment, significantly higher returns and control.
                </p>
                
                <div className="bg-primary-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <h4 className="font-semibold text-primary-gold mb-2">Enhanced Revenue Share:</h4>
                  <ul className="space-y-2 text-sm text-primary-silver">
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Partner: 75% of net revenue</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Hawlton: 25% of net revenue</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Priority support and features</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary-gold">Additional Benefits:</h4>
                  <ul className="space-y-1 text-sm text-primary-silver">
                    <li>• Dedicated account management</li>
                    <li>• Priority in new market expansion</li>
                    <li>• Advanced analytics and reporting</li>
                    <li>• Co-branded marketing opportunities</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-primary-charcoal mb-6">
                Not sure which model fits your business? Let's discuss your specific needs and find the perfect partnership structure.
              </p>
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Users}
                  iconPosition="right"
                  className="transform hover:scale-105"
                >
                  Schedule Partnership Consultation
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits-section" className="py-20">
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

      {/* Project Portal Section */}
      <section id="project-portal-section" className="bg-primary-platinum py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-8">
              Your Dedicated Project Portal
            </h2>
            <p className="text-xl text-primary-charcoal max-w-4xl mx-auto leading-relaxed">
              Access your specialized project management portal where you can track progress, view analytics, manage resources, and communicate with our team in real-time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Portal Features */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-gold/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-navy">Real-Time Analytics</h3>
                </div>
                <p className="text-primary-charcoal">Track sales, revenue, customer data, and performance metrics with live dashboards and detailed reports.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-gold/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📎</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-navy">Project Management</h3>
                </div>
                <p className="text-primary-charcoal">Monitor project milestones, timelines, and deliverables with our integrated project tracking system.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-gold/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-navy">Direct Communication</h3>
                </div>
                <p className="text-primary-charcoal">Instant messaging, video calls, and file sharing with your dedicated Hawlton team members.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-gold/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-navy">Mobile Access</h3>
                </div>
                <p className="text-primary-charcoal">Full mobile responsiveness allows you to manage your partnership from anywhere, anytime.</p>
              </div>
            </motion.div>

            {/* Portal Preview */}
            <motion.div
              className="bg-primary-navy rounded-xl p-8 relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-6">Portal Access Benefits</h3>
                
                <div className="space-y-4">
                  <div className="bg-primary-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-primary-gold mb-2">24/7</div>
                    <div className="text-sm text-primary-silver">Portal Availability</div>
                  </div>
                  
                  <div className="bg-primary-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-primary-gold mb-2">Real-Time</div>
                    <div className="text-sm text-primary-silver">Data Updates</div>
                  </div>
                  
                  <div className="bg-primary-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-primary-gold mb-2">Multi-Project</div>
                    <div className="text-sm text-primary-silver">Management</div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link href="/partner-portal">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-navy transform hover:scale-105 transition-all duration-300"
                    >
                      <span className="mr-2">🚀</span>
                      Experience Live Portal
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner Resources Section */}
      <section id="partner-resources-section" className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-white mb-8">
              Comprehensive Partner Resources
            </h2>
            <p className="text-xl text-primary-silver max-w-4xl mx-auto leading-relaxed">
              Access our extensive library of tools, training materials, and support resources designed to maximize your partnership success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Training Materials',
                description: 'Comprehensive guides, video tutorials, and webinars to help you maximize your digital presence.',
                icon: '📚',
                items: ['Digital marketing courses', 'Platform tutorials', 'Best practices guides', 'Industry insights']
              },
              {
                title: 'Marketing Assets',
                description: 'Professional marketing materials, templates, and creative assets for your campaigns.',
                icon: '🎨',
                items: ['Brand guidelines', 'Social media templates', 'Email campaigns', 'Promotional materials']
              },
              {
                title: 'Technical Support',
                description: '24/7 technical assistance and dedicated support team for all your operational needs.',
                icon: '🔧',
                items: ['Live chat support', 'Technical documentation', 'System maintenance', 'Troubleshooting guides']
              },
              {
                title: 'Analytics Tools',
                description: 'Advanced reporting and analytics tools to track performance and optimize your business.',
                icon: '📈',
                items: ['Performance dashboards', 'Revenue tracking', 'Customer analytics', 'Market insights']
              },
              {
                title: 'Community Network',
                description: 'Connect with other successful partners and share experiences, insights, and strategies.',
                icon: '🌐',
                items: ['Partner forums', 'Networking events', 'Mentorship programs', 'Success stories']
              },
              {
                title: 'Legal & Compliance',
                description: 'Legal templates, compliance guides, and regulatory support for your business operations.',
                icon: '⚖️',
                items: ['Contract templates', 'Compliance checklists', 'Legal consultation', 'Policy updates']
              }
            ].map((resource, index) => (
              <motion.div
                key={index}
                className="bg-primary-white/10 rounded-xl p-8 backdrop-blur-sm hover:bg-primary-white/15 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h3 className="text-xl font-bold text-primary-white mb-3">{resource.title}</h3>
                  <p className="text-primary-silver text-sm leading-relaxed">{resource.description}</p>
                </div>
                
                <div className="space-y-2">
                  {resource.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center text-sm text-primary-silver">
                      <span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-primary-silver mb-6">
                All resources are included in your partnership at no additional cost. Ready to access these tools?
              </p>
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="transform hover:scale-105"
                onClick={() => document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Your Partnership Today
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials-section" className="py-20">
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
