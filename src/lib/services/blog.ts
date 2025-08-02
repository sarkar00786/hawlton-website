import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  images: string[]
  category: string
  tags: string[]
  status: 'draft' | 'published'
  author: {
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
  publishedAt?: string
  views?: number
  likes?: number
}

export interface BlogCategory {
  id: string
  title: string
  slug: string
  description: string
  color: string
  postCount: number
}

const POSTS_COLLECTION = 'blog_posts'
const CATEGORIES_COLLECTION = 'blog_categories'

class BlogService {
  // Create a new blog post
  async createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = new Date().toISOString()
      const post = {
        ...postData,
        createdAt: now,
        updatedAt: now,
        views: 0,
        likes: 0
      }

      const docRef = await addDoc(collection(db, POSTS_COLLECTION), post)
      return docRef.id
    } catch (error) {
      console.error('Error creating post:', error)
      throw new Error('Failed to create post')
    }
  }

  // Update an existing blog post
  async updatePost(postId: string, postData: Partial<BlogPost>): Promise<void> {
    try {
      const postRef = doc(db, POSTS_COLLECTION, postId)
      const updateData = {
        ...postData,
        updatedAt: new Date().toISOString()
      }

      await updateDoc(postRef, updateData)
    } catch (error) {
      console.error('Error updating post:', error)
      throw new Error('Failed to update post')
    }
  }

  // Delete a blog post
  async deletePost(postId: string): Promise<void> {
    try {
      const postRef = doc(db, POSTS_COLLECTION, postId)
      
      // Get post data to delete associated images
      const postDoc = await getDoc(postRef)
      if (postDoc.exists()) {
        const postData = postDoc.data() as BlogPost
        
        // Delete featured image if exists
        if (postData.featuredImage) {
          await this.deleteImage(postData.featuredImage)
        }
        
        // Delete content images
        if (postData.images && postData.images.length > 0) {
          await Promise.all(
            postData.images.map(imageUrl => this.deleteImage(imageUrl))
          )
        }
      }
      
      await deleteDoc(postRef)
    } catch (error) {
      console.error('Error deleting post:', error)
      throw new Error('Failed to delete post')
    }
  }

  // Get all blog posts
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, POSTS_COLLECTION),
        orderBy('updatedAt', 'desc')
      )
      
      const querySnapshot = await getDocs(q)
      const posts: BlogPost[] = []
      
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() } as BlogPost)
      })
      
      return posts
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw new Error('Failed to fetch posts')
    }
  }

  // Get published blog posts
  async getPublishedPosts(limitCount?: number): Promise<BlogPost[]> {
    try {
      let q = query(
        collection(db, POSTS_COLLECTION),
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc')
      )
      
      if (limitCount) {
        q = query(q, limit(limitCount))
      }
      
      const querySnapshot = await getDocs(q)
      const posts: BlogPost[] = []
      
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() } as BlogPost)
      })
      
      return posts
    } catch (error) {
      console.error('Error fetching published posts:', error)
      throw new Error('Failed to fetch published posts')
    }
  }

  // Get a single blog post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const q = query(
        collection(db, POSTS_COLLECTION),
        where('slug', '==', slug),
        limit(1)
      )
      
      const querySnapshot = await getDocs(q)
      
      if (querySnapshot.empty) {
        return null
      }
      
      const doc = querySnapshot.docs[0]
      return { id: doc.id, ...doc.data() } as BlogPost
    } catch (error) {
      console.error('Error fetching post by slug:', error)
      throw new Error('Failed to fetch post')
    }
  }

  // Get posts by category
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, POSTS_COLLECTION),
        where('category', '==', category),
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc')
      )
      
      const querySnapshot = await getDocs(q)
      const posts: BlogPost[] = []
      
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() } as BlogPost)
      })
      
      return posts
    } catch (error) {
      console.error('Error fetching posts by category:', error)
      throw new Error('Failed to fetch posts by category')
    }
  }

  // Search posts
  async searchPosts(searchTerm: string): Promise<BlogPost[]> {
    try {
      // Firebase doesn't support full-text search natively
      // This is a simple implementation - for production, consider using Algolia or similar
      const posts = await this.getPublishedPosts()
      
      const searchTermLower = searchTerm.toLowerCase()
      
      return posts.filter(post => 
        post.title.toLowerCase().includes(searchTermLower) ||
        post.excerpt.toLowerCase().includes(searchTermLower) ||
        post.content.toLowerCase().includes(searchTermLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTermLower))
      )
    } catch (error) {
      console.error('Error searching posts:', error)
      throw new Error('Failed to search posts')
    }
  }

  // Upload image to Firebase Storage
  async uploadImage(file: File, path: string = 'blog-images'): Promise<string> {
    try {
      const timestamp = Date.now()
      const fileName = `${timestamp}-${file.name}`
      const imageRef = ref(storage, `${path}/${fileName}`)
      
      const snapshot = await uploadBytes(imageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      
      return downloadURL
    } catch (error) {
      console.error('Error uploading image:', error)
      throw new Error('Failed to upload image')
    }
  }

  // Delete image from Firebase Storage
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extract the path from the Firebase Storage URL
      const urlParts = imageUrl.split('/')
      const fileName = urlParts[urlParts.length - 1].split('?')[0]
      const pathIndex = imageUrl.indexOf('/o/') + 3
      const pathEnd = imageUrl.indexOf('?')
      const fullPath = decodeURIComponent(imageUrl.substring(pathIndex, pathEnd))
      
      const imageRef = ref(storage, fullPath)
      await deleteObject(imageRef)
    } catch (error) {
      console.error('Error deleting image:', error)
      // Don't throw error as this shouldn't block post deletion
    }
  }

  // Increment post views
  async incrementViews(postId: string): Promise<void> {
    try {
      const postRef = doc(db, POSTS_COLLECTION, postId)
      const postDoc = await getDoc(postRef)
      
      if (postDoc.exists()) {
        const currentViews = postDoc.data().views || 0
        await updateDoc(postRef, { views: currentViews + 1 })
      }
    } catch (error) {
      console.error('Error incrementing views:', error)
      // Don't throw error as this shouldn't block post loading
    }
  }

  // Toggle post like
  async toggleLike(postId: string, increment: boolean): Promise<void> {
    try {
      const postRef = doc(db, POSTS_COLLECTION, postId)
      const postDoc = await getDoc(postRef)
      
      if (postDoc.exists()) {
        const currentLikes = postDoc.data().likes || 0
        const newLikes = increment ? currentLikes + 1 : Math.max(0, currentLikes - 1)
        await updateDoc(postRef, { likes: newLikes })
      }
    } catch (error) {
      console.error('Error toggling like:', error)
      throw new Error('Failed to update like')
    }
  }

  // Get blog categories
  async getCategories(): Promise<BlogCategory[]> {
    try {
      const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION))
      const categories: BlogCategory[] = []
      
      querySnapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() } as BlogCategory)
      })
      
      return categories
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw new Error('Failed to fetch categories')
    }
  }

  // Create or update category
  async createCategory(categoryData: Omit<BlogCategory, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), categoryData)
      return docRef.id
    } catch (error) {
      console.error('Error creating category:', error)
      throw new Error('Failed to create category')
    }
  }

  // Update category post count
  async updateCategoryPostCount(category: string): Promise<void> {
    try {
      const posts = await this.getPostsByCategory(category)
      const categoryQuery = query(
        collection(db, CATEGORIES_COLLECTION),
        where('title', '==', category),
        limit(1)
      )
      
      const categorySnapshot = await getDocs(categoryQuery)
      
      if (!categorySnapshot.empty) {
        const categoryDoc = categorySnapshot.docs[0]
        await updateDoc(categoryDoc.ref, { postCount: posts.length })
      }
    } catch (error) {
      console.error('Error updating category post count:', error)
      // Don't throw error as this shouldn't block other operations
    }
  }

  // Get featured posts
  async getFeaturedPosts(limitCount: number = 3): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, POSTS_COLLECTION),
        where('status', '==', 'published'),
        orderBy('views', 'desc'),
        limit(limitCount)
      )
      
      const querySnapshot = await getDocs(q)
      const posts: BlogPost[] = []
      
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() } as BlogPost)
      })
      
      return posts
    } catch (error) {
      console.error('Error fetching featured posts:', error)
      throw new Error('Failed to fetch featured posts')
    }
  }

  // Get recent posts
  async getRecentPosts(limitCount: number = 5): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, POSTS_COLLECTION),
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc'),
        limit(limitCount)
      )
      
      const querySnapshot = await getDocs(q)
      const posts: BlogPost[] = []
      
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() } as BlogPost)
      })
      
      return posts
    } catch (error) {
      console.error('Error fetching recent posts:', error)
      throw new Error('Failed to fetch recent posts')
    }
  }

  // Validate slug uniqueness
  async isSlugUnique(slug: string, excludePostId?: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, POSTS_COLLECTION),
        where('slug', '==', slug)
      )
      
      const querySnapshot = await getDocs(q)
      
      if (querySnapshot.empty) {
        return true
      }
      
      // If we're updating an existing post, exclude it from the check
      if (excludePostId) {
        const existingPost = querySnapshot.docs[0]
        return existingPost.id === excludePostId
      }
      
      return false
    } catch (error) {
      console.error('Error checking slug uniqueness:', error)
      return false
    }
  }
}

export const blogService = new BlogService()
export default blogService
