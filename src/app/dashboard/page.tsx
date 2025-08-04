'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return // Still loading
    if (!user) {
      console.log('No user found, redirecting to signin')
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                Hawlton
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.displayName || user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to your Dashboard!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                You have successfully signed in to Hawlton.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Session Information</h2>
                <div className="text-left space-y-2">
                  <p><strong>Name:</strong> {user.displayName || 'Not provided'}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>User ID:</strong> {user.uid}</p>
                  <p><strong>Provider:</strong> {user.providerData[0]?.providerId || 'firebase'}</p>
                  <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
                  <p><strong>Created:</strong> {user.metadata.creationTime}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                  href="/solutions"
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Explore Solutions</h3>
                  <p className="text-gray-600">Discover our digital transformation services</p>
                </Link>
                
                <Link 
                  href="/partnership"
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Partnership Opportunities</h3>
                  <p className="text-gray-600">Join our network of strategic partners</p>
                </Link>
                
              </div>
              
              <div className="mt-8">
                <Link 
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
