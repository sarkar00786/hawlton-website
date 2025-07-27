'use client'

import { useEffect, useState } from 'react'
import type { Session } from 'next-auth'

// Safe auth hook that doesn't break the site if NextAuth fails
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading')

  useEffect(() => {
    let mounted = true

    const loadAuth = async () => {
      try {
        // Dynamically import to avoid build errors
        const { getSession } = await import('next-auth/react')
        const sessionData = await getSession()
        
        if (mounted) {
          setSession(sessionData)
          setStatus(sessionData ? 'authenticated' : 'unauthenticated')
        }
      } catch (error) {
        console.warn('NextAuth failed to load, continuing without authentication:', error)
        if (mounted) {
          setSession(null)
          setStatus('unauthenticated')
        }
      }
    }

    loadAuth()

    return () => {
      mounted = false
    }
  }, [])

  const signIn = async (provider?: string, options?: Record<string, unknown>) => {
    try {
      const { signIn: nextAuthSignIn } = await import('next-auth/react')
      return await nextAuthSignIn(provider, options)
    } catch (error) {
      console.error('Sign in failed:', error)
      return { error: 'Authentication service unavailable' }
    }
  }

  const signOut = async (options?: Record<string, unknown>) => {
    try {
      const { signOut: nextAuthSignOut } = await import('next-auth/react')
      return await nextAuthSignOut(options)
    } catch (error) {
      console.error('Sign out failed:', error)
      // Fallback: just clear local state
      setSession(null)
      setStatus('unauthenticated')
    }
  }

  return {
    data: session,
    status,
    signIn,
    signOut
  }
}
