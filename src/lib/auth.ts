import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import type { UserRole } from '@/types/next-auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // Firebase Email/Password Provider
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

        try {
          // Use Firebase to authenticate the user
          const userCredential = await signInWithEmailAndPassword(
            auth, 
            credentials.email, 
            credentials.password
          )
          
          const user = userCredential.user
          
          return {
            id: user.uid,
            name: user.displayName || user.email?.split('@')[0] || 'User',
            email: user.email,
            role: 'USER' as UserRole,
          }
        } catch (error: any) {
          console.error('Firebase auth error:', error)
          if (error.code === 'auth/user-not-found') {
            throw new Error('No account found with this email address')
          } else if (error.code === 'auth/wrong-password') {
            throw new Error('Invalid password')
          } else if (error.code === 'auth/invalid-email') {
            throw new Error('Invalid email address')
          } else {
            throw new Error('Authentication failed. Please try again.')
          }
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
