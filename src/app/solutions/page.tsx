import { client, queries } from '@/lib/sanity';
import { Metadata } from 'next';
import { 
  ShoppingCart, 
  Megaphone, 
  Truck, 
  Brain, 
  TrendingUp, 
  Globe, 
  Shield,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Solutions - Hawlton | Digital Growth Partnerships',
  description: 'Discover Hawlton&apos;s comprehensive digital transformation solutions for Pakistani businesses. From e-commerce to logistics optimization.',
};

// Icon mapping for solutions - commented out as it's not currently used
// const iconMap: { [key: string]: React.ComponentType } = {
//   'ShoppingCart': ShoppingCart,
//   'Megaphone': Megaphone,
//   'Truck': Truck,
//   'Brain': Brain,
//   'TrendingUp': TrendingUp,
//   'Globe': Globe,
//   'Shield': Shield,
//   'Zap': Zap,
// };

// Fetch solutions from Sanity
async function getSolutions() {
  try {
    if (!client) {
      console.warn('Sanity client not configured, using fallback data');
      throw new Error('Sanity not configured');
    }
    return await client.fetch(queries.solutions);
  } catch (error) {
    console.error('Error fetching solutions:', error);
    // Return fallback data if Sanity is not available
    return [
      {
        _id: '1',
        title: 'E-commerce Platform Development & Management',
        description: [{ _type: 'block', children: [{ text: 'Crafting robust, user-friendly online stores and managing their continuous optimization for peak performance.' }] }],
        icon: 'ShoppingCart',
        benefits: ['Nationwide reach', 'Mobile-optimized', '24/7 operations', 'Secure payments'],
        order: 1,
        featured: true
      },
      {
        _id: '2',
        title: 'Digital Marketing & Customer Acquisition',
        description: [{ _type: 'block', children: [{ text: 'Implementing data-driven strategies to reach, engage, and convert your target audience across various digital channels.' }] }],
        icon: 'Megaphone',
        benefits: ['Targeted campaigns', 'Social media marketing', 'SEO optimization', 'Performance tracking'],
        order: 2,
        featured: true
      },
      {
        _id: '3',
        title: 'Logistics & Fulfillment Optimization',
        description: [{ _type: 'block', children: [{ text: 'Streamlining your supply chain and delivery processes for efficient, nationwide order fulfillment.' }] }],
        icon: 'Truck',
        benefits: ['Fast delivery', 'Inventory management', 'Order tracking', 'Cost optimization'],
        order: 3,
        featured: true
      },
      {
        _id: '4',
        title: 'Strategic Business Development',
        description: [{ _type: 'block', children: [{ text: 'Identifying new market opportunities, refining business models, and ensuring long-term competitive advantage in the digital sphere.' }] }],
        icon: 'Brain',
        benefits: ['Market analysis', 'Growth strategies', 'Competitive positioning', 'Revenue optimization'],
        order: 4,
        featured: true
      }
    ];
  }
}

export default async function SolutionsPage() {
  // Commented out as solutions data is not currently used in the component
  // const solutions = await getSolutions();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero-section" className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-white mb-6">
            Our Expertise, Your Advantage!
          </h1>
          <p className="text-xl text-primary-silver max-w-4xl mx-auto leading-relaxed">
            Comprehensive digital transformation solutions designed to empower your business 
            for the digital age and expand your reach across Pakistan.
          </p>
        </div>
      </section>

      {/* Animated Moving Text Section */}
      <section className="bg-primary-gold py-16 overflow-hidden relative -z-10">
        <div className="relative">
          <div className="animate-marquee whitespace-nowrap">
            <span className="text-6xl md:text-8xl font-black text-primary-navy tracking-wider">
              Grow and Succeed with Us • Grow and Succeed with Us • Grow and Succeed with Us • Grow and Succeed with Us • 
            </span>
          </div>
        </div>
      </section>

      {/* Digital Transformation Section */}
      <section id="digital-transformation-section" className="bg-primary-platinum py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-8">
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
                icon: '🔄'
              },
              {
                title: 'Cloud Infrastructure Setup',
                desc: 'Migrate to scalable cloud solutions that grow with your business and ensure 99.9% uptime.',
                icon: '☁️'
              },
              {
                title: 'Data Analytics & Insights',
                desc: 'Implement advanced analytics to turn your business data into actionable insights for growth.',
                icon: '📊'
              },
              {
                title: 'Digital Customer Experience',
                desc: 'Create seamless, omnichannel customer experiences that increase satisfaction and loyalty.',
                icon: '👥'
              },
              {
                title: 'Process Automation',
                desc: 'Automate repetitive tasks and workflows to increase efficiency and reduce operational costs.',
                icon: '⚡'
              },
              {
                title: 'Security & Compliance',
                desc: 'Implement enterprise-grade security measures and ensure compliance with industry standards.',
                icon: '🔒'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-primary-navy mb-4">{item.title}</h3>
                <p className="text-primary-charcoal leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Growth Partnerships */}
      <section id="digital-partnerships-section" className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-white mb-8">
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
                  We provide comprehensive support for your digital transformation with flexible partnership models. Perfect for businesses ready to scale rapidly.
                </p>
                <ul className="space-y-2 text-primary-silver">
                  <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Full digital infrastructure support</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Shared revenue model (60/40)</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Comprehensive growth support</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>Long-term strategic partnership</li>
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


      {/* Success Stories Section */}
      <section id="success-stories-section" className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-white mb-8">
              Real Transformation Stories
            </h2>
            <p className="text-xl text-primary-silver max-w-4xl mx-auto leading-relaxed">
              See how Pakistani businesses have achieved remarkable growth through our digital transformation solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ // Example success stories
              {
                company: 'Digital Innovators Inc.',
                industry: 'Tech Solutions',
                location: 'Islamabad → Global',
                growth: 'Rapid Growth in the Digital Market',
                timeframe: '24 Months',
                story: 'Innovated with cutting-edge technology to expand global market reach and accelerate growth exponentially.',
                metric: 'Innovative Solutions'
              },
              {
                company: 'AgriTech Ventures',
                industry: 'Agricultural Technology',
                location: 'Multan → International',
                growth: 'Advanced Agricultural Solutions',
                timeframe: '20 Months',
                story: 'Implemented smart farming technologies resulting in enhanced agricultural productivity and market expansion.',
                metric: 'Smart Farming Tech'
              },
              {
                company: 'Green Energy Corp.',
                industry: 'Renewable Energy',
                location: 'Karachi → Nationwide',
                growth: 'Expansion into Renewable Energy',
                timeframe: '22 Months',
                story: 'Exploited renewable energy solutions to support sustainable development across various sectors.',
                metric: 'Sustainable Energy'
              }
            ].map((story, index) => (
              <div key={index} className="bg-primary-white/10 rounded-xl p-8 backdrop-blur-sm hover:bg-primary-white/15 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary-gold mb-2">{story.metric}</div>
                  <div className="text-sm text-primary-silver uppercase tracking-wider">{story.growth}</div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary-white mb-1">{story.company}</h3>
                    <p className="text-primary-silver text-sm">{story.industry}</p>
                  </div>
                  
                  <p className="text-primary-silver leading-relaxed text-sm">{story.story}</p>
                  
                  <div className="flex justify-between text-xs text-primary-gold">
                    <span>{story.location}</span>
                    <span>{story.timeframe}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="/partner#testimonials" 
              className="inline-flex items-center bg-primary-gold text-primary-navy px-6 py-3 rounded-lg font-semibold hover:bg-primary-gold/90 transition-colors"
            >
              View More Success Stories
              <TrendingUp className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section id="impact-section" className="bg-primary-platinum py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-8">
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
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-3 h-3 bg-primary-gold rounded-full"></div>
                  <span className="text-sm font-semibold text-primary-gold uppercase tracking-wider">
                    {item.metric}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-primary-navy mb-3">{item.title}</h3>
                <p className="text-primary-charcoal leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta-section" className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-primary-silver mb-12 max-w-3xl mx-auto">
            Let&apos;s discuss how our solutions can drive your business growth and expand your digital presence across Pakistan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/partner"
              className="group bg-primary-gold hover:bg-primary-gold text-primary-navy px-6 py-3 font-semibold text-base transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Start Your Partnership Journey
              <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
