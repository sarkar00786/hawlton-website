import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  UserCredential,
  AuthError
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

class AuthService {
  private googleProvider: GoogleAuthProvider

  constructor() {
    this.googleProvider = new GoogleAuthProvider()
    // Request additional scopes for better user info
    this.googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile')
    this.googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email')
    
    // Set custom parameters
    this.googleProvider.setCustomParameters({
      prompt: 'select_account'
    })
  }

  // Email/Password Sign In
  async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log('Email sign-in successful:', result.user.uid)
      return result.user
    } catch (error: any) {
      console.error('Email sign-in error:', error)
      this.handleAuthError(error)
      throw error
    }
  }

  // Google OAuth Sign In
  async signInWithGoogle(): Promise<User> {
    try {
      console.log('Starting Google sign-in...')
      const result = await signInWithPopup(auth, this.googleProvider)
      console.log('Google sign-in successful:', {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName
      })
      return result.user
    } catch (error: any) {
      console.error('Google sign-in error:', error)
      this.handleAuthError(error)
      throw error
    }
  }

  // Create new user (email/password)
  async createUser(email: string, password: string): Promise<User> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      console.log('User creation successful:', result.user.uid)
      return result.user
    } catch (error: any) {
      console.error('User creation error:', error)
      this.handleAuthError(error)
      throw error
    }
  }

  // Sign Out
  async signOut(): Promise<void> {
    try {
      await signOut(auth)
      console.log('Sign-out successful')
    } catch (error: any) {
      console.error('Sign-out error:', error)
      throw new Error('Failed to sign out')
    }
  }

  // Send password reset email
  async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email)
      console.log('Password reset email sent to:', email)
    } catch (error: any) {
      console.error('Password reset error:', error)
      this.handleAuthError(error)
      throw error
    }
  }

  // Get current user
  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe()
        resolve(user)
      })
    })
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? `User: ${user.email}` : 'No user')
      callback(user)
    })
  }

  // Handle Firebase Auth errors
  private handleAuthError(error: AuthError): void {
    const errorMap: Record<string, string> = {
      'auth/user-not-found': 'No account found with this email address.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/popup-closed-by-user': 'Sign-in was cancelled.',
      'auth/popup-blocked': 'Pop-up was blocked by browser. Please allow pop-ups and try again.',
      'auth/cancelled-popup-request': 'Sign-in was cancelled.',
      'auth/account-exists-with-different-credential': 'An account already exists with this email but different credentials.',
      'auth/internal-error': 'An internal error occurred. Please try again.'
    }

    const message = errorMap[error.code] || error.message || 'An unexpected error occurred.'
    console.error(`Auth Error [${error.code}]:`, message)
  }
}

export const authService = new AuthService()
export default authService
