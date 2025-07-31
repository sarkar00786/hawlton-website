'use client'

import React from 'react'
import AdvancedCarousel from '@/components/AdvancedCarousel'
import { Star, TrendingUp, MapPin, Calendar } from 'lucide-react'

const SuccessStoriesCarousel = () => {
  const successSlides = [
    {
      id: 'textile-empire',
      title: 'From Local Textile Shop to National E-commerce Empire',
      description: 'Karachi-based textile business achieved 300% revenue growth and nationwide reach through our strategic partnership program.',
      image: '/images/success/textile-transformation.jpg',
      category: 'Textile Industry',
      content: (
        <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-6 mt-6 max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-gold" />
              <span className="text-primary-silver text-sm">Karachi → Nationwide</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-gold" />
              <span className="text-primary-silver text-sm">18 Months</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-gold">300%</div>
              <div className="text-xs text-primary-silver">Revenue Growth</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-gold">50K+</div>
              <div className="text-xs text-primary-silver">Monthly Orders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-gold">15</div>
              <div className="text-xs text-primary-silver">Cities Reached</div>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-primary-gold text-primary-gold" />
            ))}
            <span className="ml-2 text-primary-silver text-sm">Partner Satisfaction</span>
          </div>
        </div>
      )
    },
    {
      id: 'food-delivery',
      title: 'Traditional Restaurant Chain Goes Digital',
      description: 'Lahore\'s beloved restaurant expanded from 3 locations to nationwide delivery, increasing revenue by 250% in 12 months.',
      image: '/images/success/restaurant-digital.jpg',
      category: 'Food & Beverage',
      content: (
        <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-6 mt-6 max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-gold" />
              <span className="text-primary-silver text-sm">Lahore → 25 Cities</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-gold" />
              <span className="text-primary-silver text-sm">12 Months</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-gold">250%</div>
              <div className="text-xs text-primary-silver">Revenue Increase</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-gold">10K+</div>
              <div className="text-xs text-primary-silver">Daily Orders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-gold">95%</div>
              <div className="text-xs text-primary-silver">Customer Retention</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'electronics-boom',
      title: 'Electronics Store Becomes Tech Powerhouse',
      description: 'Small Islamabad electronics shop transformed into Pakistan\'s leading online tech retailer with 500% growth.',
      image: '/images/success/electronics-growth.jpg',
      category: 'Electronics & Tech',
      content: (
        <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-6 mt-6 max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-gold" />
              <span className="text-primary-silver text-sm">Islamabad → National</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-gold" />
              <span className="text-primary-silver text-sm">24 Months</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-gold">500%</div>
              <div className="text-xs text-primary-silver">Growth Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-gold">100K+</div>
              <div className="text-xs text-primary-silver">Products Listed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-gold">#1</div>
              <div className="text-xs text-primary-silver">Market Position</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'fashion-revolution',
      title: 'Fashion Brand\'s Digital Revolution',
      description: 'Traditional fashion house from Faisalabad achieved international recognition and 400% sales growth through digital transformation.',
      video: '/videos/fashion-success-story.mp4',
      category: 'Fashion & Lifestyle',
      content: (
        <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-6 mt-6 max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-gold" />
              <span className="text-primary-silver text-sm">Faisalabad → International</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-gold" />
              <span className="text-primary-silver text-sm">20 Months</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-gold">400%</div>
              <div className="text-xs text-primary-silver">Sales Growth</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-gold">25K+</div>
              <div className="text-xs text-primary-silver">International Orders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-gold">8</div>
              <div className="text-xs text-primary-silver">Countries</div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="bg-primary-platinum py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-6">
            Real Success Stories: Our Partners' Transformations
          </h2>
          <p className="text-xl text-primary-charcoal max-w-3xl mx-auto">
            Discover how Pakistani businesses achieved extraordinary growth through strategic partnerships with Hawlton.
          </p>
        </div>
        
        <AdvancedCarousel 
          slides={successSlides}
          autoplay={true}
          autoplayInterval={8000}  // 8 seconds per slide
          showDots={true}
          showArrows={true}
          pauseOnHover={true}
          className="h-[600px] rounded-2xl shadow-2xl"
          slideClassName="success-story-slide"
        />
      </div>
    </div>
  )
}

export default SuccessStoriesCarousel
