import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

export type UserRole = 'USER' | 'ADMIN'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
      provider?: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: UserRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: UserRole
    id: string
    provider?: string
  }
}
