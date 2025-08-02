'use client'

import { motion } from 'framer-motion'
import { BookOpen, Download } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const ResourceLibrary = () => {
  const resources = [
    {
      title: 'Digital Readiness Guide',
      description: 'Assess your digital capabilities and readiness for transformation.',
      link: '/documents/digital-readiness-guide.pdf',
    },
    {
      title: 'Marketing Strategy Whitepaper',
      description: 'Insights into building an effective marketing strategy.',
      link: '/documents/marketing-strategy-whitepaper.pdf',
    },
    {
      title: 'Partnership Success Stories',
      description: 'Discover our partners’ success with Hawlton.',
      link: '/documents/partnership-success-stories.pdf',
    },
  ]

  return (
    <section className="py-20 bg-primary-navy text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Resource Library
          </h2>
          <p className="text-xl mb-8 text-primary-silver">
            Explore valuable resources to enhance your digital transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {resources.map((resource, index) => (
            <Card 
              key={index} 
              className="p-6 hover:bg-primary-platinum transition-colors"
            >
              <div className="flex items-center mb-4">
                <BookOpen className="w-8 h-8 text-primary-gold mr-2" />
                <h3 className="text-xl font-semibold">
                  {resource.title}
                </h3>
              </div>
              <p className="text-primary-silver text-sm mb-4">
                {resource.description}
              </p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                <Button 
                  size="sm"
                  icon={Download}
                >
                  Download
                </Button>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResourceLibrary

