import { cookies, draftMode } from 'next/headers';
import { blogPath } from '@/lib/blog/config';

export async function POST() {
  (await draftMode()).disable();
  const jar = await cookies();
  // next-sanity uses a partitioned bypass cookie in cross-site Studio iframes.
  if (jar.has('sanity-preview-partitioned')) {
    const options = { path: '/', maxAge: 0, httpOnly: true, secure: true, sameSite: 'none', partitioned: true } as const;
    jar.set('__prerender_bypass', '', options);
    jar.set('sanity-preview-partitioned', '', options);
  }

  return new Response(null, {
    status: 303,
    headers: { Location: blogPath, 'Cache-Control': 'no-store' },
  });
}
