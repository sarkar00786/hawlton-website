import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  isAdmin: boolean
}

class AuthService {
  private googleProvider: GoogleAuthProvider

  constructor() {
    this.googleProvider = new GoogleAuthProvider()
    // Optional: Request additional scopes
    this.googleProvider.addScope('profile')
    this.googleProvider.addScope('email')
  }

  // Check if user is admin
  private isAdminUser(email: string | null): boolean {
    if (!email) return false
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || []
    return adminEmails.includes(email.trim())
  }

  // Convert Firebase User to AuthUser
  private mapFirebaseUser(user: User): AuthUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isAdmin: this.isAdminUser(user.email)
    }
  }

  // Email/Password Sign In
  async signInWithEmail(email: string, password: string): Promise<AuthUser> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const authUser = this.mapFirebaseUser(result.user)
      
      if (!authUser.isAdmin) {
        await this.signOut()
        throw new Error('Access denied. You are not authorized to access the admin panel.')
      }
      
      return authUser
    } catch (error: any) {
      console.error('Email sign-in error:', error)
      throw new Error(error.message || 'Failed to sign in with email')
    }
  }

  // Google OAuth Sign In
  async signInWithGoogle(): Promise<AuthUser> {
    try {
      const result = await signInWithPopup(auth, this.googleProvider)
      const authUser = this.mapFirebaseUser(result.user)
      
      if (!authUser.isAdmin) {
        await this.signOut()
        throw new Error('Access denied. You are not authorized to access the admin panel.')
      }
      
      return authUser
    } catch (error: any) {
      console.error('Google sign-in error:', error)
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in cancelled')
      }
      throw new Error(error.message || 'Failed to sign in with Google')
    }
  }

  // Create new user (email/password)
  async createUser(email: string, password: string): Promise<AuthUser> {
    try {
      if (!this.isAdminUser(email)) {
        throw new Error('Access denied. You are not authorized to create an admin account.')
      }
      
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return this.mapFirebaseUser(result.user)
    } catch (error: any) {
      console.error('User creation error:', error)
      throw new Error(error.message || 'Failed to create user')
    }
  }

  // Sign Out
  async signOut(): Promise<void> {
    try {
      await signOut(auth)
    } catch (error: any) {
      console.error('Sign-out error:', error)
      throw new Error('Failed to sign out')
    }
  }

  // Send password reset email
  async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
      console.error('Password reset error:', error)
      throw new Error(error.message || 'Failed to send password reset email')
    }
  }

  // Get current user
  getCurrentUser(): Promise<AuthUser | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe()
        if (user && this.isAdminUser(user.email)) {
          resolve(this.mapFirebaseUser(user))
        } else {
          resolve(null)
        }
      })
    })
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(auth, (user) => {
      if (user && this.isAdminUser(user.email)) {
        callback(this.mapFirebaseUser(user))
      } else {
        callback(null)
      }
    })
  }
}

export const authService = new AuthService()
export default authService
