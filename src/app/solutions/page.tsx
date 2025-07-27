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
      <section className="bg-primary-navy py-20">
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
      <section className="bg-primary-gold py-16 overflow-hidden">
        <div className="relative">
          <div className="animate-marquee whitespace-nowrap">
            <span className="text-6xl md:text-8xl font-black text-primary-navy tracking-wider">
              Grow and Succeed with Us • Grow and Succeed with Us • Grow and Succeed with Us • Grow and Succeed with Us • 
            </span>
          </div>
        </div>
      </section>

      {/* Digital Growth Partnerships */}
      <section className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-white mb-8">
              Empowering Your Business for the Digital Age.
            </h2>
            <p className="text-lg text-primary-silver max-w-4xl mx-auto leading-relaxed">
              Hawlton specializes in partnering with local businesses to seamlessly transition them 
              into the digital marketplace, expanding their reach from local communities to a national 
              customer base. We provide the expertise, infrastructure, and strategic guidance needed 
              for sustainable online growth.
            </p>
          </div>
        </div>
      </section>


      {/* Our Impact Section */}
      <section className="bg-primary-platinum py-20">
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
      <section className="bg-primary-navy py-20">
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
