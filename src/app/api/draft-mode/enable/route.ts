import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { blogPath } from '@/lib/blog/config';
import { publicBlogClient } from '@/lib/blog/content';

export async function GET(request: Request) {
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) {
    return new Response('Draft preview is not configured.', {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  const url = new URL(request.url);
  const { searchParams } = url;
  const destination = searchParams.get('sanity-preview-pathname');
  if (!searchParams.get('sanity-preview-secret')) {
    return new Response('Preview authorization required.', { status: 401 });
  }
  if (destination) {
    const target = URL.parse(destination, url.origin);
    if (
      !target ||
      target.origin !== url.origin ||
      (target.pathname !== blogPath && !target.pathname.startsWith(`${blogPath}/`)) ||
      !destination.startsWith('/')
    ) {
      return new Response('Invalid preview path.', { status: 400 });
    }
  }

  const { GET: enable } = defineEnableDraftMode({ client: publicBlogClient.withConfig({ token }) });
  return enable(request);
}
