import NextAuth from "next-auth";
import { type NextAuthConfig } from "next-auth";
import { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import connectDB from '@/lib/db';
import User from '@/models/User';

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

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        await connectDB();
        
        const user = await User.findOne({ email: credentials.email });
        
        if (!user) {
          throw new Error('No user found with this email');
        }

        const isValid = await user.comparePassword(credentials.password);
        
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string | null;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST }; 