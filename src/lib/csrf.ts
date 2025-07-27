import { randomBytes, createHash, timingSafeEqual } from 'crypto'

export interface CSRFToken {
  token: string
  timestamp: number
  expires: number
}

class CSRFProtection {
  private secret: string
  private tokenExpiry: number // in milliseconds

  constructor(secret?: string, tokenExpiry = 24 * 60 * 60 * 1000) { // 24 hours default
    this.secret = secret || process.env.CSRF_SECRET || this.generateSecret()
    this.tokenExpiry = tokenExpiry
  }

  private generateSecret(): string {
    return randomBytes(32).toString('hex')
  }

  /**
   * Generate a CSRF token
   */
  generateToken(): CSRFToken {
    const timestamp = Date.now()
    const randomValue = randomBytes(16).toString('hex')
    const payload = `${timestamp}:${randomValue}`
    
    const hash = createHash('sha256')
      .update(payload)
      .update(this.secret)
      .digest('hex')
    
    const token = `${payload}:${hash}`
    
    return {
      token,
      timestamp,
      expires: timestamp + this.tokenExpiry
    }
  }

  /**
   * Verify a CSRF token
   */
  verifyToken(token: string): boolean {
    try {
      const parts = token.split(':')
      if (parts.length !== 3) {
        return false
      }

      const [timestampStr, randomValue, hash] = parts
      const timestamp = parseInt(timestampStr, 10)
      
      // Check if token has expired
      if (Date.now() > timestamp + this.tokenExpiry) {
        return false
      }

      // Recreate the hash
      const payload = `${timestampStr}:${randomValue}`
      const expectedHash = createHash('sha256')
        .update(payload)
        .update(this.secret)
        .digest('hex')

      // Use timing-safe comparison
      const tokenBuffer = Buffer.from(hash, 'hex')
      const expectedBuffer = Buffer.from(expectedHash, 'hex')
      
      if (tokenBuffer.length !== expectedBuffer.length) {
        return false
      }

      return timingSafeEqual(tokenBuffer, expectedBuffer)
    } catch (error) {
      console.error('CSRF token verification error:', error)
      return false
    }
  }

  /**
   * Generate token for client-side use
   */
  getClientToken(): string {
    return this.generateToken().token
  }
}

// Export singleton instance
export const csrfProtection = new CSRFProtection()

// Helper function for Next.js API routes
export function validateCSRF(token: string): boolean {
  return csrfProtection.verifyToken(token)
}

// Helper function to get CSRF token in API routes
export function getCSRFToken(): string {
  return csrfProtection.getClientToken()
}
