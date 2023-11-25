import { NextResponse, type NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';

import { env } from '@/env.mjs';

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const secret = requestHeaders.get('x-vercel-reval-key');

  if (secret !== env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag('posts');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
