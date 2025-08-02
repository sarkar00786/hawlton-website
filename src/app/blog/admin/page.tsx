'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Edit, Trash2, Eye, Calendar, User, Tag, 
  Search, Filter, MoreVertical, Globe, Lock, Clock,
  CheckCircle, AlertCircle, RefreshCw, LogOut
} from 'lucide-react'
import Image from 'next/image'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import BlogEditor from '@/components/blog/BlogEditor'
import LoginForm from '@/components/auth/LoginForm'
import { blogService, BlogPost } from '@/lib/services/blog'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

function BlogAdminContent() {
  const { user, signOut } = useAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showEditor, setShowEditor] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')
  const router = useRouter()

  useEffect(() => {
    if (user) {
      loadPosts()
    }
  }, [user])

  useEffect(() => {
    const filtered = posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || post.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
    setFilteredPosts(filtered)
  }, [posts, searchQuery, statusFilter])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const blogPosts = await blogService.getAllPosts()
      setPosts(blogPosts)
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }


  const handleSavePost = async (postData: Omit<BlogPost, 'createdAt' | 'updatedAt' | 'id'>) => {
    try {
      if (editingPost?.id) {
        await blogService.updatePost(editingPost.id, postData)
      } else {
        await blogService.createPost({
          ...postData,
          author: {
            name: user?.displayName || user?.email || 'Admin',
            email: user?.email || ''
          }
        })
      }
      
      setShowEditor(false)
      setEditingPost(null)
      loadPosts()
    } catch (error) {
      console.error('Error saving post:', error)
      throw error
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    try {
      await blogService.deletePost(postId)
      loadPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post')
    }
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setShowEditor(true)
  }

  const handleCreateNew = () => {
    setEditingPost(null)
    setShowEditor(true)
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <Globe className="w-4 h-4 text-green-600" />
      case 'draft':
        return <Lock className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }


  if (showEditor) {
    return (
      <BlogEditor
        initialPost={editingPost || undefined}
        onSave={handleSavePost}
        onCancel={() => {
          setShowEditor(false)
          setEditingPost(null)
        }}
        authorEmail={user?.email || ''}
        authorName={user?.displayName || user?.email || ''}
      />
    )
  }

  return (
    <div className="min-h-screen bg-primary-platinum">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-navy mb-2">Blog Management</h1>
            <p className="text-primary-charcoal">
              Welcome back, <strong>{user?.displayName || user?.email}</strong>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleCreateNew}
              className="bg-primary-gold text-primary-navy hover:bg-primary-gold/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
            
            <Button
              onClick={handleLogout}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-charcoal">Total Posts</p>
                <p className="text-2xl font-bold text-primary-navy">{posts.length}</p>
              </div>
              <div className="p-3 bg-primary-gold/20 rounded-lg">
                <Globe className="w-6 h-6 text-primary-gold" />
              </div>
            </div>
          </Card>
          
          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-charcoal">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {posts.filter(p => p.status === 'published').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
          
          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-charcoal">Drafts</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {posts.filter(p => p.status === 'draft').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Lock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
          
          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-charcoal">This Month</p>
                <p className="text-2xl font-bold text-primary-navy">
                  {posts.filter(p => {
                    const postDate = new Date(p.publishedAt || p.updatedAt || '')
                    const thisMonth = new Date()
                    return postDate.getMonth() === thisMonth.getMonth() && 
                           postDate.getFullYear() === thisMonth.getFullYear()
                  }).length}
                </p>
              </div>
              <div className="p-3 bg-primary-navy/20 rounded-lg">
                <Calendar className="w-6 h-6 text-primary-navy" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card padding="md" className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-charcoal w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-primary-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-primary-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              
              <Button
                onClick={loadPosts}
                className="bg-primary-navy text-white hover:bg-primary-navy/90"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </Card>

        {/* Posts List */}
        <Card padding="none">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-primary-gold" />
              <span className="ml-2 text-primary-charcoal">Loading posts...</span>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="w-12 h-12 text-primary-silver mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary-navy mb-2">No posts found</h3>
              <p className="text-primary-charcoal mb-6">
                {posts.length === 0 
                  ? "Create your first blog post to get started."
                  : "Try adjusting your search or filter criteria."
                }
              </p>
              {posts.length === 0 && (
                <Button
                  onClick={handleCreateNew}
                  className="bg-primary-gold text-primary-navy hover:bg-primary-gold/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Post
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-platinum border-b border-primary-silver">
                  <tr>
                    <th className="text-left p-4 font-semibold text-primary-navy">Post</th>
                    <th className="text-left p-4 font-semibold text-primary-navy">Status</th>
                    <th className="text-left p-4 font-semibold text-primary-navy">Category</th>
                    <th className="text-left p-4 font-semibold text-primary-navy">Date</th>
                    <th className="text-left p-4 font-semibold text-primary-navy">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredPosts.map((post) => (
                      <motion.tr
                        key={post.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-primary-silver hover:bg-primary-platinum/50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-start gap-3">
                            {post.featuredImage && (
                              <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={post.featuredImage}
                                  alt={post.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-primary-navy truncate">
                                {post.title}
                              </h3>
                              <p className="text-sm text-primary-charcoal line-clamp-2 mt-1">
                                {post.excerpt}
                              </p>
                              {post.tags.length > 0 && (
                                <div className="flex gap-1 mt-2">
                                  {post.tags.slice(0, 3).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary-gold/20 text-primary-navy text-xs rounded-full"
                                    >
                                      <Tag className="w-3 h-3" />
                                      {tag}
                                    </span>
                                  ))}
                                  {post.tags.length > 3 && (
                                    <span className="text-xs text-primary-charcoal">
                                      +{post.tags.length - 3} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getStatusColor(post.status)}`}>
                            {getStatusIcon(post.status)}
                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-primary-charcoal">
                            {post.category || 'Uncategorized'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="text-primary-navy">
                              {formatDate(post.publishedAt || post.updatedAt || post.createdAt)}
                            </div>
                            <div className="text-primary-charcoal">
                              by {post.author.name}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => handleEditPost(post)}
                              className="bg-primary-gold text-primary-navy hover:bg-primary-gold/90 p-2"
                              title="Edit post"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            
                            {post.status === 'published' && (
                              <Button
                                onClick={() => router.push(`/blog/${post.slug}`)}
                                className="bg-primary-navy text-white hover:bg-primary-navy/90 p-2"
                                title="View post"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            )}
                            
                            <Button
                              onClick={() => handleDeletePost(post.id)}
                              className="bg-red-600 text-white hover:bg-red-700 p-2"
                              title="Delete post"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default function BlogAdminPage() {
  return (
    <AuthProvider>
      <BlogAdminAuth />
    </AuthProvider>
  )
}

function BlogAdminAuth() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-navy">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-gold"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <LoginForm onSuccess={() => {}} />
    )
  }

  return <BlogAdminContent />
}
