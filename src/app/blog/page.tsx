'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, Clock, User, ArrowRight, Search, Filter } from 'lucide-react'
import { client, queries, urlFor } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  featuredImage?: SanityImageSource
  category?: {
    title: string
    slug: { current: string }
    color: string
  }
  author?: {
    name: string
    title: string
    image?: SanityImageSource
  }
  publishedAt: string
  tags?: string[]
  featured?: boolean
}

interface BlogCategory {
  _id: string
  title: string
  slug: { current: string }
  description: string
  color: string
  postCount: number
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogPosts, blogCategories, featured] = await Promise.all([
          client.fetch(queries.blogPosts),
          client.fetch(queries.blogCategories),
          client.fetch(queries.featuredBlogPosts)
        ])
        
        setPosts(blogPosts || [])
        setCategories(blogCategories || [])
        setFeaturedPosts(featured || [])
      } catch (error) {
        console.error('Error fetching blog data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category?.slug.current === selectedCategory
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-navy">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-platinum">
      {/* Hero Section */}
      <section className="bg-primary-navy text-primary-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              							<span className="text-primary-gold">
                Insights & Innovation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-silver mb-8 leading-relaxed">
              Discover the latest trends in digital transformation, e-commerce growth, and partnership success stories from Pakistan's evolving business landscape.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-charcoal w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-primary-charcoal text-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-primary-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-primary-navy mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Featured Articles
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  className="bg-primary-platinum rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {post.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlFor(post.featuredImage)?.width(600)?.height(300)?.url() || ''}
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
                    <div className="flex items-center gap-4 text-sm text-primary-charcoal mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </span>
                      {post.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author.name}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-gold transition-colors">
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
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8 bg-primary-platinum border-b border-primary-silver/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary-gold text-primary-navy'
                  : 'bg-primary-white text-primary-charcoal hover:bg-primary-gold hover:text-primary-navy'
              }`}
            >
              All Articles ({posts.length})
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category.slug.current)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category.slug.current
                    ? 'bg-primary-gold text-primary-navy'
                    : 'bg-primary-white text-primary-charcoal hover:bg-primary-gold hover:text-primary-navy'
                }`}
              >
                {category.title} ({category.postCount})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-primary-navy mb-4">No articles found</h3>
              <p className="text-primary-charcoal">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  className="bg-primary-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  {post.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlFor(post.featuredImage)?.width(600)?.height(300)?.url() || ''}
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
                    <div className="flex items-center gap-4 text-sm text-primary-charcoal mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </span>
                      {post.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author.name}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-gold transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-primary-charcoal mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-primary-gold/10 text-primary-gold text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
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
          )}
        </div>
      </section>
    </div>
  )
}
