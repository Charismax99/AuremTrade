import type { MetadataRoute } from 'next';
import { articlePath, blogPath } from '@/lib/blog/config';
import { getPublishedArticleLinks } from '@/lib/blog/content';
import { SITE_URL } from '@/lib/constants';

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticleLinks();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/legal/disclosures`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    { url: `${SITE_URL}${blogPath}` },
    ...articles.map(({ slug, updatedAt }) => ({
      url: `${SITE_URL}${articlePath(slug)}`,
      lastModified: updatedAt,
    })),
  ];
}
