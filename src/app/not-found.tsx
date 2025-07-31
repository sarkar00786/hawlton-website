'use client'

import Link from 'next/link'
import { ArrowLeft, Home, Search, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary-platinum flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center"
          >
            h1 className="text-8xl md:text-9xl font-bold text-primary-gold opacity-10"
              404
            </h1>
            <div className="relative -mt-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
                Page Not Found
              </h2>
              <p className="text-xl text-primary-charcoal leading-relaxed max-w-lg mx-auto">
                We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or doesn&apos;t exist.
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-3 bg-primary-gold hover:bg-primary-gold text-primary-navy px-8 py-4 font-bold text-lg transition-all duration-300 hover:shadow-lg rounded-lg"
            >
              <Home className="w-5 h-5" />
              Back to Home
              <motion.div
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                →
              </motion.div>
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-primary-white px-8 py-4 font-bold text-lg transition-all duration-300 rounded-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Support
            </Link>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="border-t border-primary-silver/30 pt-8"
          >
            <p className="text-primary-charcoal mb-6">
              Or try one of these popular pages:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/solutions', label: 'Our Solutions' },
                { href: '/partner', label: 'Partner With Us' },
                { href: '/contact', label: 'Contact Us' }
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-105 text-primary-navy font-semibold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Brand Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center pt-8"
          >
            <p className="text-primary-silver">
              Still need help? We&apos;re here to empower your digital journey.
            </p>
            <Link
              href="/"
              className="inline-block text-primary-gold hover:text-primary-navy font-semibold mt-2 transition-colors duration-300"
            >
              Hawlton - Empowering Pakistan&apos;s Digital Future
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
