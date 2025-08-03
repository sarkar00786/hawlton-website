'use client'

import { ReactNode } from 'react'

interface SessionProviderProps {
  children: ReactNode
}

// Simple wrapper component since we're using Firebase directly
export default function SessionProvider({ children }: SessionProviderProps) {
  return <>{children}</>
}
