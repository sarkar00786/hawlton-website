'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { authService } from '@/lib/services/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<User>
  signInWithGoogle: () => Promise<User>
  createUser: (email: string, password: string) => Promise<User>
  signOut: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener')
    const unsubscribe = authService.onAuthStateChange((user) => {
      console.log('AuthProvider: Auth state changed', user ? user.email : 'No user')
      setUser(user)
      setLoading(false)
    })

    return () => {
      console.log('AuthProvider: Cleaning up auth state listener')
      unsubscribe()
    }
  }, [])

  const signInWithEmail = async (email: string, password: string): Promise<User> => {
    try {
      const user = await authService.signInWithEmail(email, password)
      return user
    } catch (error) {
      console.error('AuthProvider: Email sign-in failed', error)
      throw error
    }
  }

  const signInWithGoogle = async (): Promise<User> => {
    try {
      console.log('AuthProvider: Starting Google sign-in')
      const user = await authService.signInWithGoogle()
      console.log('AuthProvider: Google sign-in successful')
      return user
    } catch (error) {
      console.error('AuthProvider: Google sign-in failed', error)
      throw error
    }
  }

  const createUser = async (email: string, password: string): Promise<User> => {
    try {
      const user = await authService.createUser(email, password)
      return user
    } catch (error) {
      console.error('AuthProvider: User creation failed', error)
      throw error
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      await authService.signOut()
    } catch (error) {
      console.error('AuthProvider: Sign-out failed', error)
      throw error
    }
  }

  const sendPasswordReset = async (email: string): Promise<void> => {
    try {
      await authService.sendPasswordReset(email)
    } catch (error) {
      console.error('AuthProvider: Password reset failed', error)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    signInWithEmail,
    signInWithGoogle,
    createUser,
    signOut,
    sendPasswordReset
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
