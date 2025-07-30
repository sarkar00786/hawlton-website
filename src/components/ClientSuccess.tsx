'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Target, Globe, Building2, ArrowRight, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

const ClientSuccess = () => {
  return (
    <section className="bg-primary-navy on-dark-bg">
      <div className="page-container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="h2">Client Success Testimonials</h2>
          <p className="lead mt-4">Our partnerships are built on trust, transparency, and a shared vision for success. Here's what our partners have to say about their journey with Hawlton.</p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <Card key={i} variant="navy" hover>
              <CardContent>
                <p className="text-primary-silver mb-4">Working with Hawlton has been a game-changer for our business. Their expertise in digital strategy and execution is unmatched.</p>
                <p className="text-primary-white font-semibold">Ayesha Khan</p>
                <p className="text-primary-silver text-sm">CEO, National Retail Brand</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientSuccess
