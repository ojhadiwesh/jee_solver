import NextAuth from "next-auth";
import { type NextAuthConfig } from "next-auth";
import { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"]
  }
}

// Debug logging
console.log('Starting NextAuth configuration...');
console.log('Environment variables check:', {
  hasGoogleId: !!process.env.GOOGLE_ID,
  hasGoogleSecret: !!process.env.GOOGLE_CLIENT_SECRET,
  hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
  hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
  nextAuthUrl: process.env.NEXTAUTH_URL
});

if (!process.env.NEXTAUTH_SECRET) {
  console.error('Missing NEXTAUTH_SECRET environment variable');
  throw new Error('Missing NEXTAUTH_SECRET environment variable');
}

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log('Attempting credentials authorization...');
          
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            throw new Error('Please enter your email and password');
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            },
            select: {
              id: true,
              email: true,
              name: true,
              password: true
            }
          });

          console.log('User lookup result:', user ? 'Found' : 'Not found');

          if (!user || !user.password) {
            console.log('No user found or no password set');
            throw new Error('No user found with this email');
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password.toString(),
            user.password
          );

          console.log('Password match result:', passwordMatch);

          if (!passwordMatch) {
            console.log('Password does not match');
            throw new Error('Incorrect password');
          }

          console.log('Authorization successful');
          return {
            id: user.id,
            email: user.email,
            name: user.name
          };
        } catch (error) {
          console.error('Authorization error:', error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    signOut: "/auth/signin"
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('JWT Callback:', { hasUser: !!user, hasAccount: !!account });
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback:', { hasSession: !!session, hasToken: !!token });
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  debug: true
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 