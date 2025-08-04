import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const errorData = await request.json()
    
    // Log the error (in production, you might want to send this to a logging service)
    console.error('Client-side error:', {
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      url: request.headers.get('referer'),
      ...errorData
    })
    
    return NextResponse.json({ success: true, message: 'Error logged successfully' })
  } catch (error) {
    console.error('Error in log-error API:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to log error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Error logging endpoint - POST only' },
    { status: 405 }
  )
}
