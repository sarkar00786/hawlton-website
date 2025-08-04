'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bold, Italic, Underline, Save, Eye, X, Upload, Trash2, Plus
} from 'lucide-react'
import Image from 'next/image'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { blogService } from '@/lib/services/blog'

interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  images: string[]
  category: string
  tags: string[]
  status: 'draft' | 'published'
  publishedAt?: string
  author: {
    name: string
    email: string
  }
}

interface SimpleBlogEditorProps {
  initialPost?: Partial<BlogPost>
  onSave: (post: BlogPost) => Promise<void>
  onCancel: () => void
  authorEmail: string
  authorName: string
}

const CATEGORIES = [
  'Digital Transformation',
  'Business Growth', 
  'Partnership Success',
  'E-commerce Trends',
  'Technology Updates',
  'Market Analysis',
  'Case Studies',
  'Industry News'
]

export default function SimpleBlogEditor({ 
  initialPost, 
  onSave, 
  onCancel, 
  authorEmail, 
  authorName 
}: SimpleBlogEditorProps) {
  const [post, setPost] = useState<BlogPost>({
    title: initialPost?.title || '',
    slug: initialPost?.slug || '',
    excerpt: initialPost?.excerpt || '',
    content: initialPost?.content || '',
    featuredImage: initialPost?.featuredImage || '',
    images: initialPost?.images || [],
    category: initialPost?.category || '',
    tags: initialPost?.tags || [],
    status: initialPost?.status || 'draft',
    author: {
      name: authorName,
      email: authorEmail
    }
  })

  const [isPreview, setIsPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [newTag, setNewTag] = useState('')

  // Auto-generate slug from title
  const updateTitle = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    setPost(prev => ({ 
      ...prev, 
      title,
      slug: initialPost?.slug || slug
    }))
  }

  // Auto-generate excerpt from content
  const updateContent = (content: string) => {
    const textContent = content.replace(/<[^>]*>/g, '')
    const excerpt = textContent.slice(0, 200) + (textContent.length > 200 ? '...' : '')
    
    setPost(prev => ({ 
      ...prev, 
      content,
      excerpt: initialPost?.excerpt || excerpt
    }))
  }

  const handleSave = useCallback(async (status: 'draft' | 'published') => {
    if (!post.title.trim()) {
      alert('Please enter a title.')
      return
    }
    
    if (!post.content.trim()) {
      alert('Please enter some content.')
      return
    }
    
    setIsLoading(true)
    try {
      const postToSave = {
        ...post,
        status,
        publishedAt: status === 'published' ? new Date().toISOString() : undefined
      }

      await onSave(postToSave)
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save post. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [post, onSave])

  const handleImageUpload = async (file: File, isFeatured = false) => {
    setUploadingImage(true)
    try {
      let imageUrl: string
      
      try {
        // Try Firebase Storage first
        imageUrl = await blogService.uploadImage(file, 'blog-images')
      } catch (firebaseError) {
        console.warn('Firebase Storage failed, using base64 fallback:', firebaseError)
        
        // Fallback to base64 encoding
        const reader = new FileReader()
        imageUrl = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      }

      if (isFeatured) {
        setPost(prev => ({ ...prev, featuredImage: imageUrl }))
      } else {
        setPost(prev => ({ 
          ...prev, 
          images: [...prev.images, imageUrl] 
        }))
        
        // Insert image markdown into content
        const imageMarkdown = `\n![Blog image](${imageUrl})\n`
        const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement
        if (textarea) {
          const start = textarea.selectionStart
          const end = textarea.selectionEnd
          const newContent = post.content.substring(0, start) + imageMarkdown + post.content.substring(end)
          updateContent(newContent)
          
          // Set cursor position after image
          setTimeout(() => {
            textarea.focus()
            textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length)
          }, 100)
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploadingImage(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !post.tags.includes(newTag.trim())) {
      setPost(prev => ({ 
        ...prev, 
        tags: [...prev.tags, newTag.trim()] 
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setPost(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(tag => tag !== tagToRemove) 
    }))
  }

  // Simple markdown to HTML converter for preview
  const markdownToHtml = (markdown: string) => {
    return markdown
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; margin: 16px 0;" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className="min-h-screen bg-primary-platinum pt-24">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary-navy">
              {initialPost?.id ? 'Edit Post' : 'Create New Post'}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsPreview(!isPreview)}
              className="bg-primary-silver text-primary-white hover:bg-primary-charcoal"
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
            
            <Button
              onClick={() => handleSave('draft')}
              disabled={isLoading || uploadingImage}
              className="bg-primary-gold text-primary-navy hover:bg-primary-gold/90"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            
            <Button
              onClick={() => handleSave('published')}
              disabled={isLoading || uploadingImage}
              className="bg-primary-navy text-primary-white hover:bg-primary-navy/90"
            >
              <Upload className="w-4 h-4 mr-2" />
              Publish
            </Button>
            
            <Button
              onClick={onCancel}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Card padding="lg">
              {!isPreview ? (
                <>
                  {/* Title */}
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Enter post title..."
                      value={post.title}
                      onChange={(e) => updateTitle(e.target.value)}
                      className="w-full text-3xl font-bold text-primary-navy bg-transparent border-none outline-none placeholder:text-primary-silver"
                    />
                  </div>

                  {/* Slug */}
                  <div className="mb-6">
                    <label className="text-sm text-primary-charcoal mb-2 block">URL Slug:</label>
                    <input
                      type="text"
                      value={post.slug}
                      onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-2 border border-primary-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
                    />
                  </div>

                  {/* Simple formatting help */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                    <strong>Formatting:</strong> **bold**, *italic*, [link text](url), ![alt text](image-url)
                  </div>

                  {/* Content Editor - Simple Textarea */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <label className="text-sm text-primary-charcoal">Content:</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleImageUpload(file, false)
                          e.target.value = ''
                        }}
                        className="hidden"
                        id="image-upload"
                      />
                      <button
                        onClick={() => document.getElementById('image-upload')?.click()}
                        disabled={uploadingImage}
                        className="text-xs px-2 py-1 bg-primary-gold text-primary-navy rounded hover:bg-primary-gold/90 disabled:opacity-50"
                      >
                        {uploadingImage ? 'Uploading...' : 'Add Image'}
                      </button>
                    </div>
                    <textarea
                      id="content-textarea"
                      value={post.content}
                      onChange={(e) => updateContent(e.target.value)}
                      placeholder="Write your blog post content here..."
                      rows={20}
                      className="w-full px-4 py-3 border border-primary-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold resize-none font-mono text-sm"
                    />
                  </div>
                </>
              ) : (
                /* Preview Mode */
                <div className="prose prose-lg max-w-none">
                  <h1 className="text-4xl font-bold text-primary-navy mb-4">{post.title}</h1>
                  {post.featuredImage && (
                    <div className="mb-6">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        width={800}
                        height={400}
                        className="rounded-lg object-cover w-full"
                      />
                    </div>
                  )}
                  <div 
                    className="text-primary-charcoal"
                    dangerouslySetInnerHTML={{ __html: `<p>${markdownToHtml(post.content)}</p>` }}
                  />
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <Card padding="md">
              <h3 className="text-lg font-semibold text-primary-navy mb-4">Post Settings</h3>
              
              {/* Category */}
              <div className="mb-4">
                <label className="text-sm text-primary-charcoal mb-2 block">Category</label>
                <select
                  value={post.category}
                  onChange={(e) => setPost(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-primary-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
                >
                  <option value="">Select category...</option>
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <label className="text-sm text-primary-charcoal mb-2 block">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add tag..."
                    className="flex-1 px-3 py-2 border border-primary-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
                  />
                  <Button onClick={addTag} className="bg-primary-gold text-primary-navy px-3">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary-gold/20 text-primary-navy text-sm rounded-full"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="text-sm text-primary-charcoal mb-2 block">Status</label>
                <select
                  value={post.status}
                  onChange={(e) => setPost(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                  className="w-full px-3 py-2 border border-primary-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </Card>

            {/* Featured Image */}
            <Card padding="md">
              <h3 className="text-lg font-semibold text-primary-navy mb-4">Featured Image</h3>
              {post.featuredImage ? (
                <div className="space-y-3">
                  <div className="relative aspect-video">
                    <Image
                      src={post.featuredImage}
                      alt="Featured image"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file, true)
                        e.target.value = ''
                      }}
                      className="hidden"
                      id="featured-image-upload"
                    />
                    <Button
                      onClick={() => document.getElementById('featured-image-upload')?.click()}
                      className="flex-1 bg-primary-gold text-primary-navy"
                    >
                      Change
                    </Button>
                    <Button
                      onClick={() => setPost(prev => ({ ...prev, featuredImage: '' }))}
                      className="bg-red-600 text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => document.getElementById('featured-image-upload')?.click()}
                  className="w-full bg-primary-gold text-primary-navy"
                  disabled={uploadingImage}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadingImage ? 'Uploading...' : 'Upload Featured Image'}
                </Button>
              )}
            </Card>

            {/* Excerpt */}
            <Card padding="md">
              <h3 className="text-lg font-semibold text-primary-navy mb-4">Excerpt</h3>
              <textarea
                value={post.excerpt}
                onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of the post..."
                rows={4}
                className="w-full px-3 py-2 border border-primary-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold resize-none"
              />
              <p className="text-xs text-primary-charcoal mt-2">
                {post.excerpt.length}/200 characters
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
