import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/dashboard');
  const session = (await cookies()).get('admin_session');

  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
    //return NextResponse.json({success: false})
}

  return NextResponse.next();
  //return NextResponse.json({success: true})
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
