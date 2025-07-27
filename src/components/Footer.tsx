'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react'

const Footer = () => {
  const pathname = usePathname()
  
  const isPortalPage = pathname.startsWith('/investor-portal') || pathname.startsWith('/partner-portal')
  if (isPortalPage) return null;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <footer className="bg-primary-navy text-primary-platinum">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-white mb-4">Hawlton</h3>
            <p className="text-primary-silver mb-6 leading-relaxed">
              Empowering Pakistan&apos;s Digital Future through Strategic Partnerships and Impactful Investment. 
              Catalyzing National Digital Transformation for sustainable growth and prosperity.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-gold" />
                <span className="text-primary-silver">info@hawlton.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-gold" />
                <span className="text-primary-silver">+92-XXX-XXXXXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-gold" />
                <span className="text-primary-silver">Karachi, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-primary-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className={`${isActive('/about') ? 'text-primary-gold font-semibold' : 'text-primary-silver'} hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/solutions" className={`${isActive('/solutions') ? 'text-primary-gold font-semibold' : 'text-primary-silver'} hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0`}>
                  Our Solutions
                </Link>
              </li>
              <li>
                <Link href="/partner" className={`${isActive('/partner') ? 'text-primary-gold font-semibold' : 'text-primary-silver'} hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0`}>
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link href="/invest" className={`${isActive('/invest') ? 'text-primary-gold font-semibold' : 'text-primary-silver'} hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0`}>
                  Invest With Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className={`${isActive('/careers') ? 'text-primary-gold font-semibold' : 'text-primary-silver'} hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0`}>
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className={`${isActive('/contact') ? 'text-primary-gold font-semibold' : 'text-primary-silver'} hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-lg font-semibold text-primary-white mb-4">Legal & Connect</h4>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/privacy" className="text-primary-silver hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-primary-silver hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            
            {/* Social Media Links */}
            <div>
              <h5 className="text-sm font-medium text-primary-white mb-3">Follow Us</h5>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-primary-silver hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-primary-silver hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-primary-silver hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-silver/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-silver text-sm">
              © {new Date().getFullYear()} Hawlton. All rights reserved.
            </p>
            <p className="text-primary-silver text-sm mt-2 md:mt-0">
              Built on Decades of Collective Digital Expertise
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
