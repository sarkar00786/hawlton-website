import { NextRequest, NextResponse } from 'next/server'
import { validateCSRF } from '@/lib/csrf'
import { z } from 'zod'

// Validation schema
const partnerInquirySchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z.string().min(10, 'Please enter a valid phone number').max(20),
  company: z.string().min(2, 'Company name is required').max(200),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  businessType: z.enum(['retail', 'wholesale', 'manufacturing', 'services', 'other'], {
    required_error: 'Please select your business type'
  }),
  currentRevenue: z.enum(['under-100k', '100k-500k', '500k-1m', '1m-5m', 'over-5m'], {
    required_error: 'Please select your current revenue range'
  }),
  partnershipGoals: z.string().min(50, 'Please provide more details about your partnership goals (minimum 50 characters)').max(2000),
  additionalInfo: z.string().max(1000).optional(),
  csrfToken: z.string().min(1, 'CSRF token is required')
})

// Rate limiting store (in production, use Redis or database)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const limit = 5 // 5 requests per hour
  const windowMs = 60 * 60 * 1000 // 1 hour

  const now = Date.now()
  const userLimit = rateLimit.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (userLimit.count >= limit) {
    return false
  }

  userLimit.count++
  return true
}

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] || 
         request.headers.get('x-real-ip') || 
         'unknown'
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>\"']/g, '')
}

async function sendNotificationEmail(data: z.infer<typeof partnerInquirySchema>) {
  // Implement your email service here (SendGrid, AWS SES, etc.)
  console.log('Partnership inquiry received:', {
    from: data.email,
    company: data.company,
    timestamp: new Date().toISOString()
  })
  
  // Example: Send to your team
  // await emailService.send({
  //   to: 'partnerships@hawlton.com',
  //   subject: `New Partnership Inquiry from ${data.company}`,
  //   template: 'partnership-inquiry',
  //   data
  // })
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    const clientIP = getClientIP(request)
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = partnerInquirySchema.parse(body)

    // Verify CSRF token
    if (!validateCSRF(validatedData.csrfToken)) {
      return NextResponse.json(
        { error: 'Invalid security token. Please refresh the page and try again.' },
        { status: 403 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      ...validatedData,
      fullName: sanitizeInput(validatedData.fullName),
      company: sanitizeInput(validatedData.company),
      partnershipGoals: sanitizeInput(validatedData.partnershipGoals),
      additionalInfo: validatedData.additionalInfo ? sanitizeInput(validatedData.additionalInfo) : undefined
    }

    // Additional security checks
    const suspiciousPatterns = [
      /script/i,
      /javascript/i,
      /vbscript/i,
      /onload/i,
      /onerror/i,
      /<iframe/i,
      /<object/i,
      /<embed/i
    ]

    const textToCheck = `${sanitizedData.fullName} ${sanitizedData.company} ${sanitizedData.partnershipGoals} ${sanitizedData.additionalInfo || ''}`
    
    if (suspiciousPatterns.some(pattern => pattern.test(textToCheck))) {
      return NextResponse.json(
        { error: 'Invalid input detected. Please remove any special characters or scripts.' },
        { status: 400 }
      )
    }

    // Send notification email
    await sendNotificationEmail(sanitizedData)

    // Log successful submission (implement proper logging in production)
    console.log('Partnership inquiry submitted successfully:', {
      ip: clientIP,
      email: sanitizedData.email,
      company: sanitizedData.company,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Partnership inquiry submitted successfully. We will contact you within 24-48 hours.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Partnership inquiry error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
