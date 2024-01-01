import { Auth, AuthConfig } from "@auth/core"
import GoogleProvider from "@auth/core/providers/google"
import CredentialsProvider from "@auth/core/providers/credentials"
import prisma from "../../prisma"
import bcrypt from "bcrypt"
import { PrismaAdapter } from "@auth/prisma-adapter"
import cookiesConfig from "../../lib/cookieConfig"
import { Context } from "elysia"
export async function GET(ctx: Context<any>) {
  const auth = await Auth(ctx.request, authConfig)
  return auth
}
export async function POST(ctx: Context<any>) {
  // @ts-ignore
  const headers = new Headers(ctx.headers)
  headers.set("Content-Type", "application/json")
  var request = { ...ctx.request, json: async () => ctx.body, body: ctx.body, method: ctx.request.method, url: ctx.request.url, headers }
  const auth = await Auth(request, authConfig)
  return auth
}

export const authConfig: AuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET!,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: {
          label: "email",
          type: "email",
          name: "email",
          placeholder: "Email anda",
        },
        password: { label: "Password", type: "password", name: "password" }
      },
      authorize: async (credentials: any, req: any) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              credentialAccount: true,
              emailVerified: true,
              email: true,
              isActive: true,
              role: true,
              // userRole: { include: { permissions: true } },
            } 
          })
          if (!user?.credentialAccount?.password) {
            throw new Error("Masuk Dengan Google dan set Credensial Password Terlebih dahulu!")
          } else if (bcrypt.compareSync(credentials.password, user?.credentialAccount?.password)) {
            return {
              id: user.id,
              email: user.email,
              isVerified: Boolean(user.emailVerified),
              role: user.role,
              // permissions: user.userRole.permissions.map(item => item.name),
            }
          } else {
            throw new Error("Password Salah")
          }
        } catch (err) {
          throw new Error("Kesalahan Tidak diketahui")
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30 * 3
  },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token = {
          // ...token,
          // image: user.image,
          id: user.id,
          role: user.role,
          isVerified: account.provider !== 'credentials' ? true : Boolean(user.emailVerified)
        }
      }
      return token
    },
    // @ts-ignore
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = {
        // ...session.user,
        // image: token.image,
        id: token.id,
        role: token.role,
        isVerified: token?.isVerified,
      }
      
      return session
    }
  },
  cookies: cookiesConfig,
  // logger: {
  //   warn: console.warn,
  //   error: console.error,
  //   debug: console.debug,
  // },
}