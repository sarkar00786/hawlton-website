import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z.string().max(20).optional(),
  subject: z.enum(['Partnership Inquiry', 'Investment Opportunity', 'General Question', 'Technical Support'], {
    required_error: 'Please select a subject'
  }),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000)
})

// Rate limiting store (in production, use Redis or database)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const limit = 10 // 10 requests per hour for general contact
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

async function sendNotificationEmail(data: z.infer<typeof contactSchema>) {
  // Implement your email service here (SendGrid, AWS SES, etc.)
  console.log('Contact form submission received:', {
    from: data.email,
    subject: data.subject,
    timestamp: new Date().toISOString()
  })
  
  // Example: Send to your support team
  // await emailService.send({
  //   to: 'info@hawlton.com',
  //   subject: `New Contact: ${data.subject}`,
  //   template: 'contact-form',
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
    const validatedData = contactSchema.parse(body)

    // Sanitize inputs
    const sanitizedData = {
      ...validatedData,
      name: sanitizeInput(validatedData.name),
      message: sanitizeInput(validatedData.message),
      phone: validatedData.phone ? sanitizeInput(validatedData.phone) : undefined
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

    const textToCheck = `${sanitizedData.name} ${sanitizedData.message}`
    
    if (suspiciousPatterns.some(pattern => pattern.test(textToCheck))) {
      return NextResponse.json(
        { error: 'Invalid input detected. Please remove any special characters or scripts.' },
        { status: 400 }
      )
    }

    // Send notification email
    await sendNotificationEmail(sanitizedData)

    // Log successful submission (implement proper logging in production)
    console.log('Contact form submitted successfully:', {
      ip: clientIP,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully. We will respond within 24-48 hours.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)

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
