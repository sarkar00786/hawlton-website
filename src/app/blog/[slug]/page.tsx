'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, User, Tag, ArrowRight, Heart, Eye } from 'lucide-react'
import { blogService, BlogPost } from '@/lib/services/blog'

interface RelatedPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featuredImage?: string
  category: string
  author: {
    name: string
    email: string
  }
  publishedAt?: string
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string>('')
  const [liked, setLiked] = useState(false)

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
        // Fetch the blog post
        const result = await blogService.getPostBySlug(slug)
        if (result) {
          setPost(result)
          
          // Increment views
          await blogService.incrementViews(result.id)
          
          // Fetch related posts from the same category
          if (result.category) {
            const categoryPosts = await blogService.getPostsByCategory(result.category)
            const related = categoryPosts
              .filter(p => p.id !== result.id)
              .slice(0, 3)
              .map(p => ({
                id: p.id,
                title: p.title,
                slug: p.slug,
                excerpt: p.excerpt,
                featuredImage: p.featuredImage,
                category: p.category,
                author: p.author,
                publishedAt: p.publishedAt
              }))
            setRelatedPosts(related)
          }
        }
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

  const handleLike = async () => {
    if (!post) return
    try {
      await blogService.toggleLike(post.id, !liked)
      setLiked(!liked)
      setPost(prev => prev ? {
        ...prev,
        likes: (prev.likes || 0) + (liked ? -1 : 1)
      } : null)
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <div className="min-h-screen bg-primary-platinum">
      {/* Hero Section */}
      <section className="relative bg-primary-navy text-primary-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.featuredImage && (
            <div className="relative h-80 rounded-lg overflow-hidden mb-8">
              <Image
                src={post.featuredImage}
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
                {formatDate(post.publishedAt || post.createdAt)}
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
            {/* Blog Content */}
            <div 
              className="prose prose-lg max-w-none text-primary-charcoal leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Stats and Actions */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-primary-silver">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2 text-primary-charcoal">
                  <Eye className="w-4 h-4" />
                  {post.views || 0} views
                </span>
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 transition-colors ${
                    liked ? 'text-red-500' : 'text-primary-charcoal hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  {post.likes || 0} likes
                </button>
              </div>
              
              {post.category && (
                <span className="px-3 py-1 bg-primary-gold/10 text-primary-gold text-sm rounded-full">
                  {post.category}
                </span>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-navy/10 text-primary-navy text-sm rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
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
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  className="bg-primary-platinum rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}>
                  {relatedPost.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {relatedPost.category && (
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold bg-primary-gold text-primary-navy">
                          {relatedPost.category}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-primary-charcoal mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {formatDate(relatedPost.publishedAt || '')}
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

                    <Link
                      href={`/blog/${relatedPost.slug}`}
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
    </div>
  )
}

