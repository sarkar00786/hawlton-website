import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z.string().max(20).optional(),
  subject: z.enum(['Partnership Inquiry', 'Collaboration Opportunity', 'General Question', 'Technical Support'], {
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

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

async function sendNotificationEmail(data: z.infer<typeof contactSchema>) {
  // Log submission
  console.log('Contact form submission received:', {
    from: data.email,
    subject: data.subject,
    timestamp: new Date().toISOString()
  })
  
  // Send email using Resend if API key is configured
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your-resend-api-key') {
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@hawlton.com',
        to: ['info@hawlton.com'],
        subject: `New Contact Inquiry: ${data.subject}`,
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F5F8FA;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1A3A5F 0%, #2A4A6F 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #FFD700; font-size: 28px; font-weight: 800;">Hawlton</h1>
              <p style="margin: 10px 0 0 0; color: #A0A0A0; font-size: 16px;">New Contact Inquiry</p>
            </div>
            
            <!-- Content -->
            <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h2 style="color: #1A3A5F; margin: 0 0 30px 0; font-size: 24px; font-weight: 700;">Contact Details</h2>
              
              <div style="background-color: #F5F8FA; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
                <div style="margin-bottom: 15px;">
                  <strong style="color: #1A3A5F; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</strong>
                  <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px; font-weight: 500;">${data.name}</p>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #1A3A5F; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</strong>
                  <p style="margin: 5px 0 0 0;">
                    <a href="mailto:${data.email}" style="color: #FFD700; text-decoration: none; font-size: 16px; font-weight: 500;">${data.email}</a>
                  </p>
                </div>
                
                ${data.phone ? `
                  <div style="margin-bottom: 15px;">
                    <strong style="color: #1A3A5F; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</strong>
                    <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px; font-weight: 500;">${data.phone}</p>
                  </div>
                ` : ''}
                
                <div style="margin-bottom: 0;">
                  <strong style="color: #1A3A5F; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Inquiry Type</strong>
                  <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px; font-weight: 500;">${data.subject}</p>
                </div>
              </div>
              
              <div style="margin-bottom: 30px;">
                <strong style="color: #1A3A5F; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; display: block;">Message</strong>
                <div style="background-color: #F5F8FA; padding: 20px; border-left: 4px solid #FFD700; border-radius: 0 8px 8px 0; color: #333333; line-height: 1.6; font-size: 15px;">
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <!-- Call to Action -->
              <div style="text-align: center; padding: 25px 0; border-top: 1px solid #E5E7EB;">
                <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #1A3A5F; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3); transition: all 0.3s ease;">
                  Reply to Inquiry
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding: 20px; color: #A0A0A0; font-size: 12px;">
              <p style="margin: 0 0 5px 0;">This inquiry was submitted via the Hawlton.com contact form</p>
              <p style="margin: 0;">Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} PKT</p>
            </div>
          </div>
        `,
      })
      
      console.log('Email sent successfully via Resend')
    } catch (emailError) {
      console.error('Failed to send email via Resend:', emailError)
      // Don't throw error - contact form should still work even if email fails
    }
  } else {
    console.log('Resend not configured - email not sent (this is normal in development)')
  }
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
