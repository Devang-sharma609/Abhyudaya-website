import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/cloudinary-folder')) {
    console.log('Cloudinary API route called:', request.nextUrl.toString());
  }
  return NextResponse.next();
} 