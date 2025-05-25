import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    // Test database connection
    const userCount = await prisma.user.count();

    // Check environment variables
    const envVars = {
      hasGoogleId: !!process.env.GOOGLE_ID,
      hasGoogleSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      databaseUrl: process.env.DATABASE_URL,
    };

    return NextResponse.json({
      status: "ok",
      database: {
        connected: true,
        userCount
      },
      environment: envVars
    });
  } catch (error) {
    console.error("Debug endpoint error:", error);
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
      error: error
    }, { status: 500 });
  }
} 