'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Target, Globe, Building2, ArrowRight, Users } from 'lucide-react'

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
            Our Partnership Approach
          </h2>
          <p className="text-xl text-primary-charcoal max-w-4xl mx-auto leading-relaxed">
            We believe in building meaningful, long-term partnerships that create sustainable growth 
            and mutual success for all stakeholders in Pakistan's digital economy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Users,
              title: "Strategic Partnerships",
              description: "We collaborate closely with ambitious businesses, combining our digital expertise with your market knowledge to create powerful synergies."
            },
            {
              icon: TrendingUp,
              title: "Growth-Focused Solutions",
              description: "Our approach centers on scalable digital strategies that transform local operations into national success stories."
            },
            {
              icon: Globe,
              title: "Market Expansion",
              description: "We help Pakistani businesses expand their reach across the country and beyond, leveraging digital channels and modern logistics."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-primary-gold flex items-center justify-center rounded-full">
                <item.icon className="w-8 h-8 text-primary-navy" />
              </div>
              <h3 className="text-xl font-bold text-primary-navy mb-4">{item.title}</h3>
              <p className="text-primary-charcoal leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="bg-primary-navy p-8 rounded-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-primary-white mb-6">
            Ready to Transform Your Business?
          </h3>
          <p className="text-primary-silver mb-8 max-w-2xl mx-auto">
            Join us in building Pakistan's digital future. Whether you're a business owner looking to scale 
            or a collaborator seeking partnership opportunities, we're here to create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/partner"
              className="inline-flex items-center px-6 py-3 bg-primary-gold text-primary-navy font-semibold rounded-lg hover:bg-primary-gold/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Building2 className="w-5 h-5 mr-2" />
              Partner With Us
            </motion.a>
            <motion.a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border-2 border-primary-white text-primary-white font-semibold rounded-lg hover:bg-primary-white hover:text-primary-navy transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ClientSuccess
