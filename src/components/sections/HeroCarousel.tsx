'use client'

import React from 'react'
import AdvancedCarousel from '@/components/AdvancedCarousel'
import Button from '@/components/ui/Button'
import { ArrowRight, TrendingUp, Users, Shield } from 'lucide-react'

const HeroCarousel = () => {
  const heroSlides = [
    {
      id: 'digital-transformation',
      title: 'Digital Transformation Excellence',
      description: 'Transform your traditional business into a national digital powerhouse with our proven strategies and expert partnerships.',
      image: '/images/backgrounds/hero-digital.jpg',
      category: 'Digital Growth',
      link: '/solutions',
      content: (
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button 
            variant="primary" 
            size="lg" 
            icon={ArrowRight} 
            iconPosition="right"
            className="transform hover:scale-105"
          >
            Start Your Journey
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary-white text-primary-white hover:bg-primary-white hover:text-primary-navy"
          >
            View Success Stories
          </Button>
        </div>
      )
    },
    {
      id: 'partnership-growth',
      title: 'Strategic Partnership Program',
      description: 'Join Pakistan\'s most successful digital growth program. Scale operations, expand nationwide, and achieve exponential growth together.',
      image: '/images/backgrounds/hero-partnership.jpg',
      category: 'Partnership',
      link: '/partner',
      content: (
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-gold">75%</div>
            <div className="text-sm text-primary-silver">Revenue Share</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-gold">24/7</div>
            <div className="text-sm text-primary-silver">Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-gold">100+</div>
            <div className="text-sm text-primary-silver">Partners</div>
          </div>
        </div>
      )
    },
    {
      id: 'success-metrics',
      title: 'Proven Results & National Impact',
      description: 'Our partners achieve remarkable growth through our comprehensive digital transformation and strategic partnership approach.',
      image: '/images/backgrounds/hero-success.jpg',
      category: 'Success Stories',
      link: '/solutions#success-stories',
      content: (
        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary-gold" />
            <span className="text-primary-silver">National Growth</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary-gold" />
            <span className="text-primary-silver">Strategic Partners</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary-gold" />
            <span className="text-primary-silver">Secure Operations</span>
          </div>
        </div>
      )
    },
    {
      id: 'video-showcase',
      title: 'Empowering Pakistan\'s Digital Future',
      description: 'Watch how Hawlton transforms ambitious Pakistani businesses into national digital leaders through innovation and partnership.',
      video: '/videos/hawlton-showcase.mp4',
      category: 'Our Vision',
      link: '/about',
      content: (
        <div className="mt-6">
          <Button 
            variant="primary" 
            size="lg" 
            icon={ArrowRight} 
            iconPosition="right"
            className="transform hover:scale-105 shadow-glow-gold"
          >
            Discover Our Story
          </Button>
        </div>
      )
    }
  ]

  return (
    <AdvancedCarousel 
      slides={heroSlides}
      autoplay={true}
      autoplayInterval={7000}  // 7 seconds per slide
      showDots={true}
      showArrows={true}
      pauseOnHover={true}
      className="h-screen max-h-[800px] min-h-[600px]"
      slideClassName="hero-slide"
    />
  )
}

export default HeroCarousel
