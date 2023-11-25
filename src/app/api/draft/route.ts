import { draftMode } from 'next/headers';

import { env } from '@/env.mjs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  draftMode().enable();

  return new Response('Draft mode is enabled');
}
