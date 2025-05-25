import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    environment: {
      hasGoogleId: !!process.env.GOOGLE_ID,
      googleId: process.env.GOOGLE_ID,
      hasGoogleSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      nodeEnv: process.env.NODE_ENV
    }
  });
} 