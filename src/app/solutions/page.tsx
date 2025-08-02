import { Metadata } from "next";
import { Suspense } from "react";
import HeroSectionWithProps from "@/components/HeroSectionWithProps";
import PageLoader from "@/components/ui/PageLoader";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import ResourceLibrary from "@/components/ResourceLibrary";
import { 
  ShoppingCart, 
  Megaphone, 
  Truck, 
  Brain, 
  TrendingUp, 
  Globe, 
  Shield,
  Zap,
  Users,
  Target,
  RefreshCw,
  Cloud,
  BarChart3,
  Bolt,
  Lock
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Our Solutions - Your Digital Transformation Starts Here | Hawlton",
  description: "Comprehensive digital transformation solutions for Pakistani businesses. Professional e-commerce platforms, hyper-targeted marketing, optimized logistics, and strategic growth through partnership models.",
  keywords: "digital transformation Pakistan, e-commerce platform Pakistan, digital marketing Pakistan, business growth solutions Pakistan, strategic partnerships Pakistan, logistics optimization Pakistan, nationwide digital solutions",
  openGraph: {
    title: "Our Solutions - Your Digital Transformation Starts Here | Hawlton",
    description: "We provide the infrastructure, expertise, and support you need to thrive online.",
    images: ["/images/backgrounds/solutions-hero.jpg"],
  },
};


export default function SolutionsPage() {
  return (
    <Suspense fallback={<PageLoader isLoading={true} />}>
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSectionWithProps
          title="Your Digital Transformation Starts Here."
          subtitle="We provide the infrastructure, expertise, and support you need to thrive online."
          primaryAction={{
            text: "Discover Our Partnership Models",
            href: "/partnership",
          }}
          secondaryAction={{
            text: "Ready to See What's Possible?",
            href: "#core-pillars",
          }}
          backgroundImage="/images/backgrounds/solutions-hero.jpg"
        />

        {/* Core Pillars Section */}
        <section className="py-20 bg-primary-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-primary-navy mb-8">
                  Our Core Pillars of Partnership
                </h2>
                <p className="text-xl text-primary-charcoal max-w-3xl mx-auto">
                  Four comprehensive pillars that form the foundation of your digital transformation journey.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Pillar 1 */}
                <Card padding="lg" className="hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-primary-gold rounded-lg flex items-center justify-center mr-6">
                      <ShoppingCart className="w-8 h-8 text-primary-navy" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-navy">E-commerce Platform Architecture</h3>
                  </div>
                  <p className="text-primary-charcoal leading-relaxed mb-4">
                    We don't just create a website; we architect a professional, conversion-optimized platform 
                    that is a true extension of your business.
                  </p>
                  <ul className="space-y-2 text-primary-charcoal">
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Professional design & user experience</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Mobile-optimized responsive platform</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Secure payment gateway integration</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Performance optimization & speed</li>
                  </ul>
                </Card>

                {/* Pillar 2 */}
                <Card padding="lg" className="hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-primary-gold rounded-lg flex items-center justify-center mr-6">
                      <Target className="w-8 h-8 text-primary-navy" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-navy">Hyper-Targeted Digital Marketing</h3>
                  </div>
                  <p className="text-primary-charcoal leading-relaxed mb-4">
                    We connect your products with the right audience across Pakistan, using data-driven 
                    strategies to maximize your reach and revenue.
                  </p>
                  <ul className="space-y-2 text-primary-charcoal">
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Strategic social media campaigns</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Search engine optimization (SEO)</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Paid advertising management</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Customer acquisition optimization</li>
                  </ul>
                </Card>

                {/* Pillar 3 */}
                <Card padding="lg" className="hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-primary-gold rounded-lg flex items-center justify-center mr-6">
                      <Truck className="w-8 h-8 text-primary-navy" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-navy">Optimized Logistics & Fulfillment</h3>
                  </div>
                  <p className="text-primary-charcoal leading-relaxed mb-4">
                    We handle the complexities of logistics, from secure warehousing to nationwide delivery, 
                    ensuring a seamless and trustworthy experience for your customers.
                  </p>
                  <ul className="space-y-2 text-primary-charcoal">
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Nationwide delivery network</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Inventory management systems</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Order tracking & notifications</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Customer service integration</li>
                  </ul>
                </Card>

                {/* Pillar 4 */}
                <Card padding="lg" className="hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-primary-gold rounded-lg flex items-center justify-center mr-6">
                      <TrendingUp className="w-8 h-8 text-primary-navy" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-navy">Strategic Growth & Continuous Optimization</h3>
                  </div>
                  <p className="text-primary-charcoal leading-relaxed mb-4">
                    We work with you to analyze data, identify new opportunities, and continuously refine 
                    our strategies to ensure sustained growth and market leadership.
                  </p>
                  <ul className="space-y-2 text-primary-charcoal">
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Performance analytics & insights</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Market opportunity identification</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Strategic planning & roadmapping</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Continuous improvement processes</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

      {/* Animated Moving Text Section */}
        <section className="bg-primary-gold py-12 overflow-hidden relative -z-10">
          <div className="relative">
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-5xl md:text-7xl font-extrabold text-primary-navy tracking-wider">
                Grow and Succeed with Us • Grow and Succeed with Us • Grow and Succeed with Us • Grow and Succeed with Us •
            </span>
          </div>
        </div>
      </section>

      {/* Digital Transformation Section */}
      <section id="digital-transformation-section" className="bg-primary-platinum py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-8">
              Complete Digital Transformation
            </h2>
            <p className="text-xl text-primary-charcoal max-w-4xl mx-auto leading-relaxed">
              We don't just digitize your business – we transform it entirely. From legacy systems to cutting-edge digital infrastructure, we ensure your business is future-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Legacy System Modernization',
                desc: 'Transform outdated processes into efficient, automated digital workflows that save time and reduce errors.',
                icon: RefreshCw
              },
              {
                title: 'Cloud Infrastructure Setup',
                desc: 'Migrate to scalable cloud solutions that grow with your business and ensure 99.9% uptime.',
                icon: Cloud
              },
              {
                title: 'Data Analytics & Insights',
                desc: 'Implement advanced analytics to turn your business data into actionable insights for growth.',
                icon: BarChart3
              },
              {
                title: 'Digital Customer Experience',
                desc: 'Create seamless, omnichannel customer experiences that increase satisfaction and loyalty.',
                icon: Users
              },
              {
                title: 'Process Automation',
                desc: 'Automate repetitive tasks and workflows to increase efficiency and reduce operational costs.',
                icon: Bolt
              },
              {
                title: 'Security & Compliance',
                desc: 'Implement enterprise-grade security measures and ensure compliance with industry standards.',
                icon: Lock
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100">
                <div className="w-12 h-12 bg-primary-gold/20 rounded-lg flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-primary-navy" />
                </div>
                <h3 className="text-lg font-bold text-primary-navy mb-3 leading-tight">{item.title}</h3>
                <p className="text-primary-charcoal text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Growth Partnerships */}
      <section id="digital-partnerships-section" className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-white mb-8">
              Strategic Partnership Models
            </h2>
            <p className="text-lg text-primary-silver max-w-4xl mx-auto leading-relaxed">
              Choose from our flexible partnership approaches designed to align with your business goals, 
              risk tolerance, and growth ambitions. Each model is crafted to maximize mutual success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-primary-white/10 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-primary-gold mb-6">Revenue Share Partnership</h3>
              <div className="space-y-4">
                <p className="text-primary-silver leading-relaxed">
                  We're developing comprehensive support for digital transformation through transparent partnership models. Designed for businesses ready to grow together with us.
                </p>
                <ul className="space-y-2 text-primary-silver">
                  <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Complete digital infrastructure vision</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Transparent revenue sharing model</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Committed long-term growth support</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Strategic partnership approach</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary-white/10 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-primary-gold mb-6">Consulting & Implementation</h3>
              <div className="space-y-4">
                <p className="text-primary-silver leading-relaxed">
                  Get expert guidance and implementation support while maintaining full ownership of your digital assets and revenue.
                </p>
                <ul className="space-y-2 text-primary-silver">
                  <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Strategic planning and roadmap</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Implementation oversight</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Training and knowledge transfer</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Ongoing support and optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Industry Insights Section */}
      <section id="industry-insights-section" className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-white mb-8">
              Pakistan's Digital Business Landscape
            </h2>
            <p className="text-xl text-primary-silver max-w-4xl mx-auto leading-relaxed">
              Understanding the sectors with the highest digital transformation potential in Pakistan's economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ // Real industry data and opportunities
              {
                sector: 'Textile & Fashion',
                marketSize: 'PKR 2.1T Industry',
                digitalPenetration: '3% Currently Digital',
                opportunity: '97% Untapped Market',
                potential: 'Export + Domestic Growth',
                insight: 'Pakistan\'s largest export industry with minimal digital presence offers massive partnership opportunities for fashion and textile businesses.',
                dataPoint: 'PKR 2.1T'
              },
              {
                sector: 'Agriculture & Food',
                marketSize: 'PKR 8.1T Sector Value',
                digitalPenetration: '1.5% Digital Adoption',
                opportunity: '98.5% Growth Potential',
                potential: 'Farm-to-Consumer Direct',
                insight: 'With 70% of population in agriculture, direct-to-consumer models can revolutionize food distribution and farmer incomes.',
                dataPoint: 'PKR 8.1T'
              },
              {
                sector: 'Manufacturing & SMEs',
                marketSize: '3.2M Small Businesses',
                digitalPenetration: '5% Have Online Presence',
                opportunity: '95% Ready for Digital',
                potential: 'B2B Marketplace Dominance',
                insight: 'Small manufacturers with quality products lack digital channels, creating partnership opportunities in B2B and export markets.',
                dataPoint: '3.2M SMEs'
              }
            ].map((industry, index) => (
              <div key={index} className="bg-primary-white/10 rounded-xl p-8 backdrop-blur-sm hover:bg-primary-white/15 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-primary-gold mb-2">{industry.dataPoint}</div>
                  <div className="text-sm text-primary-silver uppercase tracking-wider">{industry.sector}</div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-primary-gold font-medium">Market Size</div>
                      <div className="text-primary-white">{industry.marketSize}</div>
                    </div>
                    <div>
                      <div className="text-primary-gold font-medium">Digital Gap</div>
                      <div className="text-primary-white">{industry.opportunity}</div>
                    </div>
                  </div>
                  
                  <p className="text-primary-silver leading-relaxed text-sm">{industry.insight}</p>
                  
                  <div className="bg-primary-gold/20 rounded-lg p-3 text-center">
                    <div className="text-primary-gold font-medium text-sm">Partnership Potential</div>
                    <div className="text-primary-white text-xs">{industry.potential}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-primary-white/10 rounded-xl p-6 max-w-4xl mx-auto mb-8">
              <h3 className="text-xl font-bold text-primary-white mb-4">
                Ready to Lead Your Industry's Digital Revolution?
              </h3>
              <p className="text-primary-silver mb-6">
                These sectors represent billions in untapped digital commerce potential. 
                First-mover advantage goes to businesses that act now.
              </p>
            </div>
            <a 
              href="/partnership" 
              className="inline-flex items-center bg-primary-gold text-primary-navy px-6 py-3 font-semibold hover:bg-primary-gold/90 transition-colors"
            >
              Explore Partnership Opportunities
              <TrendingUp className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section id="impact-section" className="bg-primary-platinum py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-8">
              What You Can Expect: Tangible Results.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Access to a National Customer Base',
                desc: 'Break geographical barriers and connect with customers across all of Pakistan.',
                metric: 'National Reach'
              },
              {
                title: 'Increased Sales & Revenue',
                desc: 'Leverage optimized digital channels to drive significant growth in your bottom line.',
                metric: 'Revenue Growth'
              },
              {
                title: 'Reduced Operational Burden',
                desc: 'Let us handle the complexities of digital infrastructure, allowing you to focus on your core business.',
                metric: 'Efficiency'
              },
              {
                title: 'Professional Online Presence',
                desc: 'Establish a credible, attractive, and high-performing digital storefront that builds trust with your customers.',
                metric: 'Brand Trust'
              },
              {
                title: 'Data-Driven Insights',
                desc: 'Make informed decisions with comprehensive analytics and performance metrics.',
                metric: 'Analytics'
              },
              {
                title: '24/7 Digital Operations',
                desc: 'Your business never sleeps with automated systems and continuous online presence.',
                metric: 'Availability'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-3 h-3 bg-primary-gold rounded-full"></div>
                  <span className="text-xs font-semibold text-primary-gold uppercase tracking-wider">
                    {item.metric}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-primary-navy mb-3 leading-tight">{item.title}</h3>
                <p className="text-primary-charcoal text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Library Section */}
      <ResourceLibrary />

      {/* CTA Section */}
      <section id="cta-section" className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-primary-silver mb-12 max-w-3xl mx-auto">
            Let&apos;s discuss how our solutions can drive your business growth and expand your digital presence across Pakistan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/partnership"
              className="group bg-primary-gold hover:bg-primary-gold text-primary-navy px-6 py-3 font-semibold text-base transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Start Your Partnership Journey
              <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </section>
    </div>
    </Suspense>
  );
}
