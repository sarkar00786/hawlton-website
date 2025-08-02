'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, Quote, Code, Link2, Image as ImageIcon, Video, 
  Type, Palette, Save, Eye, X, Upload, Trash2, Plus, Hash, 
  Heading1, Heading2, Heading3, Undo, Redo, File
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

interface BlogEditorProps {
  initialPost?: Partial<BlogPost>
  onSave: (post: BlogPost) => Promise<void>
  onCancel: () => void
  authorEmail: string
  authorName: string
}

const TOOLBAR_GROUPS = [
  {
    name: 'formatting',
    tools: [
      { name: 'bold', icon: Bold, command: 'bold', tooltip: 'Bold (Ctrl+B)' },
      { name: 'italic', icon: Italic, command: 'italic', tooltip: 'Italic (Ctrl+I)' },
      { name: 'underline', icon: Underline, command: 'underline', tooltip: 'Underline (Ctrl+U)' },
      { name: 'strikethrough', icon: Strikethrough, command: 'strikeThrough', tooltip: 'Strikethrough' },
    ]
  },
  {
    name: 'headings',
    tools: [
      { name: 'h1', icon: Heading1, command: 'formatBlock', value: 'h1', tooltip: 'Heading 1' },
      { name: 'h2', icon: Heading2, command: 'formatBlock', value: 'h2', tooltip: 'Heading 2' },
      { name: 'h3', icon: Heading3, command: 'formatBlock', value: 'h3', tooltip: 'Heading 3' },
    ]
  },
  {
    name: 'alignment',
    tools: [
      { name: 'alignLeft', icon: AlignLeft, command: 'justifyLeft', tooltip: 'Align Left' },
      { name: 'alignCenter', icon: AlignCenter, command: 'justifyCenter', tooltip: 'Align Center' },
      { name: 'alignRight', icon: AlignRight, command: 'justifyRight', tooltip: 'Align Right' },
    ]
  },
  {
    name: 'lists',
    tools: [
      { name: 'unorderedList', icon: List, command: 'insertUnorderedList', tooltip: 'Bullet List' },
      { name: 'orderedList', icon: ListOrdered, command: 'insertOrderedList', tooltip: 'Numbered List' },
    ]
  },
  {
    name: 'blocks',
    tools: [
      { name: 'quote', icon: Quote, command: 'formatBlock', value: 'blockquote', tooltip: 'Quote' },
      { name: 'code', icon: Code, command: 'formatBlock', value: 'pre', tooltip: 'Code Block' },
    ]
  }
]

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

export default function BlogEditor({ 
  initialPost, 
  onSave, 
  onCancel, 
  authorEmail, 
  authorName 
}: BlogEditorProps) {
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
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#000000')

  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const featuredImageInputRef = useRef<HTMLInputElement>(null)

  // Auto-generate slug from title
  useEffect(() => {
    if (post.title && !initialPost?.slug) {
      const slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setPost(prev => ({ ...prev, slug }))
    }
  }, [post.title, initialPost?.slug])

  // Auto-generate excerpt from content
  useEffect(() => {
    if (post.content && !initialPost?.excerpt) {
      const textContent = post.content.replace(/<[^>]*>/g, '')
      const excerpt = textContent.slice(0, 200) + (textContent.length > 200 ? '...' : '')
      setPost(prev => ({ ...prev, excerpt }))
    }
  }, [post.content, initialPost?.excerpt])

  const executeCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }, [])

  const handleToolClick = useCallback((tool: any) => {
    if (tool.value) {
      executeCommand(tool.command, tool.value)
    } else {
      executeCommand(tool.command)
    }
  }, [executeCommand])

  const handleImageUpload = async (file: File, isFeatured = false) => {
    setUploadingImage(true)
    try {
      // Upload image using Firebase Storage via blog service
      const imageUrl = await blogService.uploadImage(file, 'blog-images')

      if (isFeatured) {
        setPost(prev => ({ ...prev, featuredImage: imageUrl }))
      } else {
        setPost(prev => ({ 
          ...prev, 
          images: [...prev.images, imageUrl] 
        }))
        
        // Insert image into content at cursor position
        const img = `<img src="${imageUrl}" alt="Blog image" style="max-width: 100%; height: auto; margin: 16px 0;" />`
        executeCommand('insertHTML', img)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, isFeatured = false) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file, isFeatured)
    }
    event.target.value = ''
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    const text = prompt('Enter link text:') || url
    if (url) {
      executeCommand('insertHTML', `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`)
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

  const handleSave = async (status: 'draft' | 'published') => {
    if (!post.title.trim() || !post.content.trim()) {
      alert('Please fill in both title and content.')
      return
    }
    
    setIsLoading(true)
    try {
      const postToSave = {
        ...post,
        status,
        publishedAt: status === 'published' ? new Date().toISOString() : undefined,
        content: editorRef.current?.innerHTML || post.content
      }
      await onSave(postToSave)
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save post. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const applyTextColor = (color: string) => {
    executeCommand('foreColor', color)
    setShowColorPicker(false)
  }

  return (
    <div className="min-h-screen bg-primary-platinum">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-primary-navy">
            {initialPost?.id ? 'Edit Post' : 'Create New Post'}
          </h1>
          
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
                      onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
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

                  {/* Toolbar */}
                  <div className="border-b border-primary-silver pb-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                      {TOOLBAR_GROUPS.map((group, groupIndex) => (
                        <div key={group.name} className="flex items-center gap-1">
                          {group.tools.map((tool) => (
                            <button
                              key={tool.name}
                              onClick={() => handleToolClick(tool)}
                              className="p-2 rounded-lg hover:bg-primary-gold/20 transition-colors"
                              title={tool.tooltip}
                            >
                              <tool.icon className="w-4 h-4 text-primary-charcoal" />
                            </button>
                          ))}
                          {groupIndex < TOOLBAR_GROUPS.length - 1 && (
                            <div className="w-px h-6 bg-primary-silver mx-2" />
                          )}
                        </div>
                      ))}
                      
                      {/* Additional Tools */}
                      <div className="w-px h-6 bg-primary-silver mx-2" />
                      
                      <button
                        onClick={insertLink}
                        className="p-2 rounded-lg hover:bg-primary-gold/20 transition-colors"
                        title="Insert Link"
                      >
                        <Link2 className="w-4 h-4 text-primary-charcoal" />
                      </button>
                      
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="p-2 rounded-lg hover:bg-primary-gold/20 transition-colors disabled:opacity-50"
                        title="Insert Image"
                      >
                        <ImageIcon className="w-4 h-4 text-primary-charcoal" />
                      </button>
                      
                      <div className="relative">
                        <button
                          onClick={() => setShowColorPicker(!showColorPicker)}
                          className="p-2 rounded-lg hover:bg-primary-gold/20 transition-colors"
                          title="Text Color"
                        >
                          <Palette className="w-4 h-4 text-primary-charcoal" />
                        </button>
                        
                        <AnimatePresence>
                          {showColorPicker && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-0 mt-2 p-3 bg-white rounded-lg shadow-lg border z-50"
                            >
                              <div className="grid grid-cols-6 gap-2">
                                {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080'].map((color) => (
                                  <button
                                    key={color}
                                    onClick={() => applyTextColor(color)}
                                    className="w-6 h-6 rounded border hover:scale-110 transition-transform"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Content Editor */}
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={(e) => setPost(prev => ({ 
                      ...prev, 
                      content: e.currentTarget.innerHTML 
                    }))}
                    className="min-h-96 p-4 border border-primary-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold prose prose-lg max-w-none"
                    style={{ 
                      lineHeight: '1.6',
                      fontFamily: 'inherit'
                    }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Hidden file inputs */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e)}
                    className="hidden"
                  />
                  
                  <input
                    ref={featuredImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, true)}
                    className="hidden"
                  />
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
                    dangerouslySetInnerHTML={{ __html: post.content }}
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
                    <Button
                      onClick={() => featuredImageInputRef.current?.click()}
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
                  onClick={() => featuredImageInputRef.current?.click()}
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
