import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_KEY = 'schoolhax_admin_auth';
const PUBLIC_PATHS = ['/admin-login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths and Next.js internals
  if (
    PUBLIC_PATHS.some(p => pathname.startsWith(p)) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(AUTH_KEY);

  if (!authCookie?.value) {
    const loginUrl = new URL('/admin-login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets).*)'],
};
