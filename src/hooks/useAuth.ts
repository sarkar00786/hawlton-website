'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase'

// Simple auth hook for Firebase
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (provider?: string, options?: Record<string, unknown>) => {
    try {
      if (provider === 'credentials' && options?.email && options?.password) {
        const result = await signInWithEmailAndPassword(auth, options.email as string, options.password as string)
        return { user: result.user }
      }
      return { error: 'Invalid provider or credentials' }
    } catch (error: any) {
      console.error('Sign in failed:', error)
      return { error: error.message || 'Authentication failed. Please try again.' }
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  return {
    user,
    loading,
    signIn,
    signOut
  }
}
