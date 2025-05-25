import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  // Public paths that don't require authentication
  const publicPaths = [
    '/auth/signin',
    '/auth/signup',
    '/',
    '/about',
  ];

  const isPublicPath = publicPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  );

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && (req.nextUrl.pathname.startsWith('/auth/'))) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirect unauthenticated users to signin page
  if (!isAuthenticated && !isPublicPath) {
    const signInUrl = new URL('/auth/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Configure paths that require authentication
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/problems/:path*',
    '/physics/:path*',
    '/chemistry/:path*',
    '/maths/:path*',
    '/mock-tests/:path*',
    '/analytics/:path*',
    '/profile/:path*',
    '/auth/:path*'
  ]
}; 