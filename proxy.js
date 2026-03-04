import { NextResponse } from 'next/server';

export default function proxy(req) {
  const { pathname } = req.nextUrl;

  const token =
    req.cookies.get('authjs.session-token') ||
    req.cookies.get('__Secure-authjs.session-token');

  const isLoggedIn = !!token;

  // শুধু dashboard protect করবে, login না থাকলে
  if (pathname.startsWith('/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // বাকি সব পেজে যেতে দেবে
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};