import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userSession = request.cookies.get('user_session');
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPath = request.nextUrl.pathname === '/login';
  
  // ذخیره pathname در هدرها
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);
  
  if (isAdminPath && !userSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (isAdminPath && userSession) {
    try {
      const user = JSON.parse(userSession.value);
      if (!user.is_admin) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  if (isLoginPath && userSession) {
    try {
      const user = JSON.parse(userSession.value);
      if (user.is_admin) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    } catch (e) {}
  }
  
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|uploads).*)']
};