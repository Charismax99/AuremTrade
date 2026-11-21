import type { PortableTextBlock } from '@portabletext/react';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { draftMode } from 'next/headers';
import { createClient } from 'next-sanity';
import { cache } from 'react';
import { apiVersion, dataset, projectId } from './config';

export type Cover = {
  asset: { _ref: string };
  alt?: string;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; height: number; width: number };
};

type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  cover?: Cover;
  updatedAt: string;
};

type Article = ArticleSummary & {
  authorName?: string | null;
  firstPublishedAt?: string | null;
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};

export const publicBlogClient = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: 'published',
  useCdn: false,
});

const imageBuilder = createImageUrlBuilder({ projectId, dataset });
const articleFilter = '_type == "blogPost" && defined(slug.current)';
const summaryFields = '"slug": slug.current, title, excerpt, cover, "updatedAt": _updatedAt';
const publishedCache = { next: { revalidate: 60 } };

export function coverUrl(cover: Cover, width: number, height: number) {
  return imageBuilder.image(cover satisfies SanityImageSource).width(width).height(height).fit('crop').url();
}

export function getPublishedArticles() {
  return publicBlogClient.fetch<ArticleSummary[]>(
    `*[${articleFilter}] | order(_updatedAt desc, _id asc) {${summaryFields}}`,
    {},
    publishedCache,
  );
}

export function getLatestPublishedArticles() {
  return publicBlogClient.fetch<ArticleSummary[]>(
    `*[${articleFilter}] | order(coalesce(firstPublishedAt, _createdAt) desc, _updatedAt desc, _id asc)[0...3] {${summaryFields}}`,
    {},
    publishedCache,
  );
}

export function getPublishedArticleLinks() {
  return publicBlogClient.fetch<Pick<ArticleSummary, 'slug' | 'updatedAt'>[]>(
    `*[${articleFilter}] {"slug": slug.current, "updatedAt": _updatedAt}`,
    {},
    publishedCache,
  );
}

export const getArticle = cache(async (slug: string) => {
  const token = process.env.SANITY_API_READ_TOKEN;
  const isPreview = (await draftMode()).isEnabled && Boolean(token);
  const client = isPreview
    ? publicBlogClient.withConfig({ perspective: 'drafts', token })
    : publicBlogClient;

  const article = await client.fetch<Article | null>(
    `*[${articleFilter} && slug.current == $slug][0] {
      ${summaryFields}, authorName, firstPublishedAt, body, seoTitle, seoDescription
    }`,
    { slug },
    // A prior miss must not leave a new article returning 404 once its link appears.
    { cache: 'no-store' },
  );

  if (!article) return { article, isPreview };

  const date = article.firstPublishedAt;
  return {
    article: {
      ...article,
      authorName: article.authorName?.trim() || undefined,
      firstPublishedAt: date && /^\d{4}-\d{2}-\d{2}T/.test(date) && Number.isFinite(Date.parse(date))
        ? date
        : undefined,
    },
    isPreview,
  };
});
