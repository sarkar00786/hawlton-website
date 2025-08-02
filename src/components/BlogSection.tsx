'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, ArrowRight, BookOpen } from 'lucide-react'
import { client, queries, urlFor } from '@/lib/sanity'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  featuredImage?: any
  category?: {
    title: string
    slug: { current: string }
    color: string
  }
  publishedAt: string
}

export default function BlogSection() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const posts = await client.fetch(queries.recentBlogPosts)
        setRecentPosts(posts?.slice(0, 3) || [])
      } catch (error) {
        console.error('Error fetching recent blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentPosts()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading || recentPosts.length === 0) {
    return null // Don't show the section if no posts or still loading
  }

  return (
    <section className="py-20 bg-primary-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary-gold/10 text-primary-gold px-4 py-2 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <BookOpen className="w-4 h-4" />
            Latest Insights
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
            Insights & Innovation
          </h2>
          <p className="text-xl text-primary-charcoal max-w-3xl mx-auto leading-relaxed">
            Stay ahead of the curve with our latest thoughts on digital transformation, 
            e-commerce growth, and partnership success stories from Pakistan's evolving business landscape.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post, index) => (
            <motion.article
              key={post._id}
              className="bg-primary-platinum rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {post.featuredImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={urlFor(post.featuredImage).width(600).height(300).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.category && (
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold bg-${post.category.color} text-primary-white`}>
                      {post.category.title}
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-primary-charcoal mb-3">
                  <CalendarDays className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </div>
                
                <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-primary-charcoal mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.slug.current}`}
                  className="inline-flex items-center gap-2 text-primary-gold font-semibold hover:gap-3 transition-all"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA to Blog */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary-navy text-primary-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-navy/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            Explore All Insights
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
