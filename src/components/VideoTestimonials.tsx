'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Quote, 
  Star,
  Building2,
  MapPin,
  TrendingUp,
  Users,
  Pause,
  Volume2
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface VideoTestimonial {
  id: string
  name: string
  title: string
  company: string
  location: string
  industry: string
  videoUrl: string
  thumbnailUrl: string
  quote: string
  results: {
    growth: string
    timeframe: string
    metric: string
  }
  rating: number
}

const VideoTestimonials = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const testimonials: VideoTestimonial[] = [
    {
      id: 'ayesha-khan',
      name: 'Ayesha Khan',
      title: 'CEO',
      company: 'National Retail Solutions',
      location: 'Karachi → Nationwide',
      industry: 'Retail',
      videoUrl: '/videos/testimonials/ayesha-khan.mp4',
      thumbnailUrl: '/images/testimonials/ayesha-khan-thumb.jpg',
      quote: 'Partnering with Hawlton has been a game-changer for our business. They transformed our local retail presence into a nationwide digital powerhouse.',
      results: {
        growth: '400%',
        timeframe: '18 months',
        metric: 'Revenue Growth'
      },
      rating: 5
    },
    {
      id: 'hassan-malik',
      name: 'Hassan Malik',
      title: 'CTO',
      company: 'Digital Innovators Inc',
      location: 'Lahore → International',
      industry: 'Technology',
      videoUrl: '/videos/testimonials/hassan-malik.mp4',
      thumbnailUrl: '/images/testimonials/hassan-malik-thumb.jpg',
      quote: 'The partnership model is brilliant. Instead of paying huge upfront costs, we share the success. It\'s a true partnership in every sense.',
      results: {
        growth: '350%',
        timeframe: '24 months',
        metric: 'Market Expansion'
      },
      rating: 5
    },
    {
      id: 'sara-ali',
      name: 'Sara Ali',
      title: 'Marketing Director',
      company: 'AgriTech Ventures',
      location: 'Multan → Regional',
      industry: 'Agriculture',
      videoUrl: '/videos/testimonials/sara-ali.mp4',
      thumbnailUrl: '/images/testimonials/sara-ali-thumb.jpg',
      quote: 'Hawlton understood our vision and helped us scale smart farming solutions across Pakistan. A strategic ally in every sense.',
      results: {
        growth: '275%',
        timeframe: '20 months',
        metric: 'Customer Base'
      },
      rating: 5
    }
  ]

  const handleVideoPlay = (testimonialId: string) => {
    setActiveVideo(testimonialId)
    setIsPlaying(true)
  }

  const handleVideoClose = () => {
    setActiveVideo(null)
    setIsPlaying(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-20 bg-primary-navy text-primary-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-primary-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Success Stories from Our Partners
            </motion.h2>
            <motion.p 
              className="text-xl text-primary-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hear directly from business leaders who have transformed their companies through 
              strategic partnership with Hawlton.
            </motion.p>
          </div>

          {/* Video Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card padding="md" className="bg-primary-white/10 backdrop-blur-sm border-primary-white/20 hover:bg-primary-white/15 transition-all duration-300">
                  {/* Video Thumbnail */}
                  <div className="relative mb-6 group cursor-pointer" onClick={() => handleVideoPlay(testimonial.id)}>
                    <div className="aspect-video bg-primary-charcoal rounded-lg overflow-hidden">
                      {/* Video Thumbnail Image - Placeholder for now */}
                      <div className="w-full h-full bg-primary-gold/20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3">
                            <Play className="w-8 h-8 text-primary-navy ml-1" />
                          </div>
                          <p className="text-primary-white font-medium">Play Video</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-20 h-20 bg-primary-gold/90 rounded-full flex items-center justify-center">
                        <Play className="w-10 h-10 text-primary-navy ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="space-y-4">
                    {/* Rating */}
                    <div className="flex items-center">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Quote */}
                    <div className="relative">
                      <Quote className="w-6 h-6 text-primary-gold/60 mb-2" />
                      <p className="text-primary-white/90 italic leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Results */}
                    <div className="bg-primary-gold/10 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-gold mb-1">
                          {testimonial.results.growth}
                        </div>
                        <div className="text-sm text-primary-white/80">
                          {testimonial.results.metric}
                        </div>
                        <div className="text-xs text-primary-white/60 mt-1">
                          in {testimonial.results.timeframe}
                        </div>
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="pt-4 border-t border-primary-white/20">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-primary-white mb-1">
                            {testimonial.name}
                          </h4>
                          <p className="text-primary-gold text-sm mb-1">
                            {testimonial.title}
                          </p>
                          <p className="text-primary-white/80 text-sm">
                            {testimonial.company}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-primary-white/60 text-xs mb-1">
                            <Building2 className="w-3 h-3 mr-1" />
                            {testimonial.industry}
                          </div>
                          <div className="flex items-center text-primary-white/60 text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Statistics */}
          <motion.div 
            className="bg-primary-white/10 rounded-2xl p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary-white mb-4">
                Partnership Success Metrics
              </h3>
              <p className="text-primary-white/80">
                Real results from our strategic partnerships across Pakistan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-gold mb-2">95%</div>
                <div className="text-primary-white/80 text-sm">Partner Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-gold mb-2">18</div>
                <div className="text-primary-white/80 text-sm">Avg. Months to Scale</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-gold mb-2">340%</div>
                <div className="text-primary-white/80 text-sm">Avg. Growth Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-gold mb-2">100%</div>
                <div className="text-primary-white/80 text-sm">Partnership Renewal</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-primary-white mb-6">
              Ready to Write Your Success Story?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/partnership">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-primary-gold text-primary-navy hover:bg-primary-gold/90"
                >
                  Start Your Partnership Journey
                </Button>
              </a>
              <a href="/contact">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary-white text-primary-white hover:bg-primary-white hover:text-primary-navy"
                >
                  Schedule a Consultation
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleVideoClose}
          >
            <motion.div
              className="relative max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player Placeholder */}
              <div className="w-full h-full bg-primary-charcoal flex items-center justify-center">
                <div className="text-center text-primary-white">
                  <Volume2 className="w-16 h-16 mx-auto mb-4 opacity-60" />
                  <p className="text-xl font-medium mb-2">Video Player</p>
                  <p className="text-primary-white/60">
                    Video testimonial would play here
                  </p>
                  <div className="mt-6">
                    <Button 
                      variant="outline" 
                      onClick={handleVideoClose}
                      className="border-primary-white text-primary-white hover:bg-primary-white hover:text-primary-navy"
                    >
                      Close Video
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-primary-white hover:text-primary-gold transition-colors z-10"
                onClick={handleVideoClose}
              >
                <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                  ✕
                </div>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default VideoTestimonials
