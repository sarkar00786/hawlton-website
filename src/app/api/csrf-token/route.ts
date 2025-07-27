import { NextRequest, NextResponse } from 'next/server'
import { getCSRFToken } from '@/lib/csrf'

export async function GET(request: NextRequest) {
  try {
    const token = getCSRFToken()
    
    return NextResponse.json(
      { token },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    )
  } catch (error) {
    console.error('Error generating CSRF token:', error)
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
