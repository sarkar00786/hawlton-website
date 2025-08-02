'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react'

const Footer = () => {
  const pathname = usePathname()
  

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <footer className="bg-primary-navy text-primary-platinum">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold text-primary-white mb-3 sm:mb-4">Hawlton</h3>
            <p className="text-primary-silver mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Empowering Pakistan&apos;s Digital Future through Strategic Partnerships and Digital Innovation. 
              Catalyzing National Digital Transformation for sustainable growth and prosperity.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span className="text-primary-silver text-sm">info@hawlton.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-primary-gold flex-shrink-0 mt-0.5" />
                <div className="text-primary-silver text-sm">
                  <div>+92 (330) 2577116</div>
                  <div>+92 (370) 7874867</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span className="text-primary-silver text-sm">Karachi, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 sm:mt-0">
            <h4 className="text-base sm:text-lg font-semibold text-primary-white mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/our-vision" className={`${isActive('/our-vision') ? 'text-primary-gold font-semibold' : 'text-primary-silver'} hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0 text-sm sm:text-base`}>
                  Our Vision
                </Link>
              </li>
              <li>
                <Link href="/solutions" className={`${isActive('/solutions') ? 'text-primary-gold font-semibold' : 'text-primary-silver'} hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0 text-sm sm:text-base`}>
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/partnership" className={`${isActive('/partnership') ? 'text-primary-gold font-semibold' : 'text-primary-silver'} hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0 text-sm sm:text-base`}>
                  Partnership
                </Link>
              </li>
              <li>
                <Link href="/contact" className={`${isActive('/contact') ? 'text-primary-gold font-semibold' : 'text-primary-silver'} hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0 text-sm sm:text-base`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Careers & Legal */}
          <div className="mt-6 sm:mt-0">
            <h4 className="text-base sm:text-lg font-semibold text-primary-white mb-3 sm:mb-4">Careers & Legal</h4>
            <ul className="space-y-2 mb-4 sm:mb-6">
              <li>
                <Link href="/careers" className={`${isActive('/careers') ? 'text-primary-gold font-semibold' : 'text-primary-silver'} hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0 text-sm sm:text-base`}>
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-primary-silver hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0 text-sm sm:text-base">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-primary-silver hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0 text-sm sm:text-base">
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
                  className="text-primary-silver hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0 p-1 rounded"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-primary-silver hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0 p-1 rounded"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-primary-silver hover:text-primary-gold transition-colors duration-200 focus:outline-none focus:ring-0 p-1 rounded"
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
