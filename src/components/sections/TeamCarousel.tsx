'use client'

import React from 'react'
import AdvancedCarousel from '@/components/AdvancedCarousel'
import { Linkedin, Twitter, Mail } from 'lucide-react'

const TeamCarousel = () => {
  const teamSlides = [
    {
      id: 'leadership-vision',
      title: 'Visionary Leadership',
      description: 'Meet our leadership team driving Pakistan\'s digital transformation with years of expertise in technology, business, and strategic partnerships.',
      image: '/images/team/leadership-team.jpg',
      category: 'Leadership',
      content: (
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-primary-gold">15+</div>
            <div className="text-sm text-primary-silver">Years Experience</div>
          </div>
          <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-primary-gold">500+</div>
            <div className="text-sm text-primary-silver">Projects Delivered</div>
          </div>
        </div>
      )
    },
    {
      id: 'tech-experts',
      title: 'Technical Excellence Team',
      description: 'Our world-class developers, designers, and digital strategists bring cutting-edge solutions to transform traditional businesses.',
      image: '/images/team/tech-team.jpg',
      category: 'Technology',
      content: (
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-primary-gold">50+</div>
            <div className="text-xs text-primary-silver">Tech Experts</div>
          </div>
          <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-primary-gold">100%</div>
            <div className="text-xs text-primary-silver">Success Rate</div>
          </div>
          <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-primary-gold">24/7</div>
            <div className="text-xs text-primary-silver">Support</div>
          </div>
        </div>
      )
    },
    {
      id: 'partnership-specialists',
      title: 'Partnership Success Specialists',
      description: 'Dedicated partnership managers and business development experts ensuring every collaboration achieves maximum growth potential.',
      image: '/images/team/partnership-team.jpg',
      category: 'Partnerships',
      content: (
        <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-4 mt-6 max-w-md">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-primary-gold">200+</div>
              <div className="text-xs text-primary-silver">Active Partners</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary-gold">95%</div>
              <div className="text-xs text-primary-silver">Satisfaction</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary-gold">300%</div>
              <div className="text-xs text-primary-silver">Avg Growth</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'company-culture',
      title: 'Our Culture & Values',
      description: 'Experience our collaborative, innovation-driven workplace where every team member contributes to Pakistan\'s digital future.',
      video: '/videos/company-culture.mp4',
      category: 'Culture',
      content: (
        <div className="flex items-center gap-4 mt-6">
          <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-primary-gold">Innovation</div>
            <div className="text-xs text-primary-silver">Core Value</div>
          </div>
          <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-primary-gold">Collaboration</div>
            <div className="text-xs text-primary-silver">Work Style</div>
          </div>
          <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-primary-gold">Growth</div>
            <div className="text-xs text-primary-silver">Mindset</div>
          </div>
        </div>
      )
    },
    {
      id: 'join-team',
      title: 'Join Our Mission',
      description: 'Be part of Pakistan\'s most impactful digital transformation company. We\'re always looking for talented individuals to join our growing team.',
      image: '/images/team/hiring-team.jpg',
      category: 'Careers',
      link: '/careers',
      content: (
        <div className="mt-6">
          <div className="bg-primary-navy/20 backdrop-blur-sm rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary-gold">Remote</div>
                <div className="text-xs text-primary-silver">Work Options</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary-gold">Growth</div>
                <div className="text-xs text-primary-silver">Opportunities</div>
              </div>
            </div>
          </div>
          <a
            href="/careers"
            className="inline-flex items-center px-6 py-3 bg-primary-gold hover:bg-primary-gold/90 text-primary-navy font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            View Open Positions
          </a>
        </div>
      )
    }
  ]

  return (
    <AdvancedCarousel 
      slides={teamSlides}
      autoplay={true}
      autoplayInterval={6000}  // 6 seconds per slide
      showDots={true}
      showArrows={true}
      pauseOnHover={true}
      className="h-[500px] rounded-xl"
      slideClassName="team-slide"
    />
  )
}

export default TeamCarousel
