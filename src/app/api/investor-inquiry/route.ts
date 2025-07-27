import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema matching the form component
const investorInquirySchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z.string().min(10, 'Please enter a valid phone number').max(20),
  organization: z.string().min(2, 'Organization name is required').max(200),
  investorType: z.enum(['individual', 'institutional', 'family-office', 'fund', 'other'], {
    required_error: 'Please select your investor type'
  }),
  investmentRange: z.enum(['100k-500k', '500k-1m', '1m-5m', '5m-10m', 'over-10m'], {
    required_error: 'Please select your investment range'
  }),
  investmentTimeframe: z.enum(['immediate', '3-months', '6-months', '12-months', 'flexible'], {
    required_error: 'Please select your investment timeframe'
  }),
  investmentFocus: z.array(z.string()).min(1, 'Please select at least one investment focus area'),
  riskTolerance: z.enum(['conservative', 'moderate', 'aggressive', 'very-aggressive'], {
    required_error: 'Please select your risk tolerance'
  }),
  investmentGoals: z.string().min(50, 'Please provide more details about your investment goals (minimum 50 characters)').max(2000),
  additionalInfo: z.string().max(1000).optional(),
  accreditationStatus: z.enum(['accredited', 'qualified', 'institutional', 'other'], {
    required_error: 'Please specify your accreditation status'
  })
})

// Rate limiting store (in production, use Redis or database)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const limit = 3 // 3 requests per hour for investor inquiries (more sensitive)
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
  return input.trim().replace(/[<>"']/g, '')
}

async function sendNotificationEmail(data: z.infer<typeof investorInquirySchema>) {
  // Implement your email service here (SendGrid, AWS SES, etc.)
  console.log('Investor inquiry received:', {
    from: data.email,
    organization: data.organization,
    investmentRange: data.investmentRange,
    timestamp: new Date().toISOString()
  })
  
  // Example: Send to your investment team
  // await emailService.send({
  //   to: 'investments@hawlton.com',
  //   subject: `New Investment Inquiry from ${data.organization}`,
  //   template: 'investor-inquiry',
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
    const validatedData = investorInquirySchema.parse(body)

    // Sanitize inputs
    const sanitizedData = {
      ...validatedData,
      fullName: sanitizeInput(validatedData.fullName),
      organization: sanitizeInput(validatedData.organization),
      investmentGoals: sanitizeInput(validatedData.investmentGoals),
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

    const textToCheck = `${sanitizedData.fullName} ${sanitizedData.organization} ${sanitizedData.investmentGoals} ${sanitizedData.additionalInfo || ''}`
    
    if (suspiciousPatterns.some(pattern => pattern.test(textToCheck))) {
      return NextResponse.json(
        { error: 'Invalid input detected. Please remove any special characters or scripts.' },
        { status: 400 }
      )
    }

    // Send notification email
    await sendNotificationEmail(sanitizedData)

    // Log successful submission (implement proper logging in production)
    console.log('Investor inquiry submitted successfully:', {
      ip: clientIP,
      email: sanitizedData.email,
      organization: sanitizedData.organization,
      investmentRange: sanitizedData.investmentRange,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Investment inquiry submitted successfully. Our team will contact you within 24-48 hours.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Investor inquiry error:', error)

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
