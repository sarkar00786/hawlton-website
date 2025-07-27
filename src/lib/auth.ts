import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { UserRole } from '@/types/next-auth'

// Mock user database for development (replace with real database in production)
const users = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@hawlton.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj5w5wJksmBq', // 'password123'
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    // Simple Email/Password Provider
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        // Find user in mock database
        const user = users.find((u) => u.email === credentials.email)
        
        if (!user) {
          throw new Error('No user found with this email')
        }

        // For demo purposes, just check if password is 'password123'
        if (credentials.password !== 'password123') {
          throw new Error('Invalid password')
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'USER' as UserRole,
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = user.role || 'USER'
      }
      if (account) {
        token.provider = account.provider
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
        session.user.provider = token.provider as string
      }
      return session
    },
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },

  debug: process.env.NODE_ENV === 'development',
}
