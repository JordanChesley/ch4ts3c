import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '@/lib/prisma'
import { username } from 'better-auth/plugins'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    // 
  ],
  advanced: {
    defaultCookieAttributes: {
      httpOnly: false,
      secure: false,
    }
  },
  plugins: [
    username(),
  ]
})