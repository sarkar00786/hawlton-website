import { NextRequest, NextResponse } from 'next/server'
import { validateCSRF } from '@/lib/csrf'
import { z } from 'zod'
import { Resend } from 'resend'

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

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

async function sendNotificationEmail(data: z.infer<typeof partnerInquirySchema>) {
  console.log('Partnership inquiry received:', {
    from: data.email,
    company: data.company,
    timestamp: new Date().toISOString()
  })

  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your-resend-api-key-here') {
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@hawlton.com',
        to: ['partnerships@hawlton.com'],
        subject: `New Partnership Inquiry from ${data.company}`,
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F5F8FA;">
            <div style="background: linear-gradient(135deg, #1A3A5F 0%, #2A4A6F 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #FFD700; font-size: 28px; font-weight: 800;">Hawlton</h1>
              <p style="margin: 10px 0 0 0; color: #A0A0A0; font-size: 16px;">New Partnership Inquiry</p>
            </div>
            <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h2 style="color: #1A3A5F; margin: 0 0 30px 0; font-size: 24px; font-weight: 700;">Inquiry Details</h2>
              <div style="background-color: #F5F8FA; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
                <div style="margin-bottom: 15px;">
                  <strong style="color: #1A3A5F; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</strong>
                  <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px; font-weight: 500;">${data.fullName}</p>
                </div>
                <div style="margin-bottom: 15px;">
                  <strong style="color: #1A3A5F; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</strong>
                  <p style="margin: 5px 0 0 0;">
                    <a href="mailto:${data.email}" style="color: #FFD700; text-decoration: none; font-size: 16px; font-weight: 500;">${data.email}</a>
                  </p>
                </div>
                <div style="margin-bottom: 15px;">
                  <strong style="color: #1A3A5F; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Company</strong>
                  <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px; font-weight: 500;">${data.company}</p>
                </div>
                <div style="margin-bottom: 15px;">
                  <strong style="color: #1A3A5F; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Business Type</strong>
                  <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px; font-weight: 500;">${data.businessType}</p>
                </div>
                <div style="margin-bottom: 0;">
                  <strong style="color: #1A3A5F; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Partnership Goals</strong>
                  <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px; font-weight: 500;">${data.partnershipGoals.replace(/\n/g, '<br>')}</p>
                </div>
              </div>
              <div style="text-align: center; padding: 25px 0; border-top: 1px solid #E5E7EB;">
                <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #1A3A5F; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3); transition: all 0.3s ease;">
                  Reply to Inquiry
                </a>
              </div>
            </div>
            <div style="text-align: center; padding: 20px; color: #A0A0A0; font-size: 12px;">
              <p style="margin: 0 0 5px 0;">This inquiry was submitted via the Hawlton.com partnership form</p>
              <p style="margin: 0;">Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} PKT</p>
            </div>
          </div>
        `,
      })

      console.log('Email sent successfully via Resend')
    } catch (emailError) {
      console.error('Failed to send email via Resend:', emailError)
    }
  } else {
    console.log('Resend not configured - email not sent (this is normal in development)')
  }
  
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
