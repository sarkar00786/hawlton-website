'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { authService, AuthUser } from '@/lib/services/auth'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<AuthUser>
  signInWithGoogle: () => Promise<AuthUser>
  signOut: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithEmail = async (email: string, password: string): Promise<AuthUser> => {
    setLoading(true)
    try {
      const user = await authService.signInWithEmail(email, password)
      return user
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async (): Promise<AuthUser> => {
    setLoading(true)
    try {
      const user = await authService.signInWithGoogle()
      return user
    } finally {
      setLoading(false)
    }
  }

  const signOut = async (): Promise<void> => {
    setLoading(true)
    try {
      await authService.signOut()
    } finally {
      setLoading(false)
    }
  }

  const sendPasswordReset = async (email: string): Promise<void> => {
    await authService.sendPasswordReset(email)
  }

  const value: AuthContextType = {
    user,
    loading,
    signInWithEmail,
    signInWithGoogle,
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
