'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client, queries, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import { CalendarDays, User, Tag, ArrowRight } from 'lucide-react'
import { PortableText } from '@portabletext/react'
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
    description?: string
    color: string
  }
  author?: {
    name: string
    title: string
    bio?: string
    image?: SanityImageSource
  }
  publishedAt: string
  content: any
  tags?: string[]
  relatedPosts?: BlogPost[]
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (!slug) return
    
    const fetchPost = async () => {
      try {
        const result = await client.fetch(queries.blogPostBySlug, { slug })
        setPost(result)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-navy">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-gold"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-navy">
        <p className="text-primary-white text-xl">Post not found.</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-primary-platinum">
      {/* Hero Section */}
      <section className="relative bg-primary-navy text-primary-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.featuredImage && (
            <div className="relative h-80 rounded-lg overflow-hidden mb-8">
              <Image
                src={urlFor(post.featuredImage)?.width(800)?.height(400)?.url() || ''}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-primary-silver leading-relaxed">
              {post.excerpt}
            </p>

            {/* Post Details */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-primary-charcoal mt-6">
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
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <PortableText value={post.content} />

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-gold text-primary-white text-xs rounded-full"
                  >
                    <Tag className="w-3 h-3 inline-block mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="py-16 bg-primary-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-2xl font-bold text-primary-navy mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Related Articles
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {post.relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost._id}
                  className="bg-primary-platinum rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}>
                  {relatedPost.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlFor(relatedPost.featuredImage)?.width(600)?.height(300)?.url() || ''}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {relatedPost.category && (
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold bg-${relatedPost.category.color} text-primary-white`}>
                          {relatedPost.category.title}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-primary-charcoal mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {formatDate(relatedPost.publishedAt)}
                      </span>
                      {relatedPost.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {relatedPost.author.name}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-gold transition-colors">
                      {relatedPost.title}
                    </h3>

                    <p className="text-primary-charcoal mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>

                    <a
                      href={`/blog/${relatedPost.slug.current}`}
                      className="inline-flex items-center gap-2 text-primary-gold font-semibold hover:gap-3 transition-all"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

