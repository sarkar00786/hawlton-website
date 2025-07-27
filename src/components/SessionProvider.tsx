'use client'

import { ReactNode } from 'react'
import dynamic from 'next/dynamic'

interface SessionProviderProps {
  children: ReactNode
}

// Dynamically import NextAuth SessionProvider to avoid SSR issues
const NextAuthSessionProvider = dynamic(
  () => import('next-auth/react').then((mod) => mod.SessionProvider),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
)

export default function SessionProvider({ children }: SessionProviderProps) {
  // Wrap in try-catch to ensure the site works even if auth fails
  try {
    return (
      <NextAuthSessionProvider>
        {children}
      </NextAuthSessionProvider>
    )
  } catch (error) {
    console.warn('Authentication provider failed to load:', error)
    // Return children without auth wrapper if there's an error
    return <>{children}</>
  }
}
