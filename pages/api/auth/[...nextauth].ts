import NextAuth from 'next-auth'

import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from "next-auth/providers/github"

const options: NextAuthOptions = {
  debug: true,
  session: {
    jwt: true,
    maxAge: 60 * 15,
  },
  jwt: {
    secret: process.env.AUTH_JWT_SECRET,
    singinkey: process.env.AUTH_JWT_SINGIN_KEY,
    encryption: true,
    encryptionkey: process.env.AUTH_JWT_ENCRYPTION_KEY,
  },
  secret: process.env.AUTH_PLATZI_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '****************',
        },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/platzi`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-type': 'application/json' },
        })

        const user = await res.json()

        if (res.ok && user) {
          return user
        }
        return null
      },
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    })
  ],
}

export default NextAuth(options)
