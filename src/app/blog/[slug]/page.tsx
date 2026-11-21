import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { articlePath, blogPath } from '@/lib/blog/config';
import { coverUrl, getArticle } from '@/lib/blog/content';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

type ArticlePageProps = { params: Promise<{ slug: string }> };
const publicationDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' });

const bodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="my-5">{children}</p>,
    h2: ({ children }) => <h2 className="mb-4 mt-10 font-serif text-3xl text-text-primary">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-8 font-serif text-2xl text-text-primary">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-s-2 border-gold-500 ps-5 italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-5 list-disc space-y-2 ps-6">{children}</ul>,
    number: ({ children }) => <ol className="my-5 list-decimal space-y-2 ps-6">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href.trim() : '';

      return /^(https?:\/\/|mailto:)/i.test(href) ? (
        <a href={href} className="text-gold-400 underline underline-offset-4">{children}</a>
      ) : children;
    },
  },
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { article, isPreview } = await getArticle(slug);
  if (!article) notFound();
  if (isPreview) {
    return { title: 'Article preview', authors: null, robots: { index: false, follow: false } };
  }

  const title = article.seoTitle?.trim() || article.title;
  const description = article.seoDescription?.trim() || article.excerpt;
  const canonical = `${SITE_URL}${articlePath(article.slug)}`;
  const images = article.cover?.asset
    ? [{ url: coverUrl(article.cover, 1200, 630), width: 1200, height: 630, alt: article.cover.alt }]
    : [];

  return {
    title,
    description,
    authors: article.authorName ? [{ name: article.authorName }] : null,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      url: canonical,
      title,
      description,
      images,
      publishedTime: article.firstPublishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: { card: 'summary_large_image', title, description, images },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const { article, isPreview } = await getArticle(slug);
  if (!article) notFound();

  const canonical = `${SITE_URL}${articlePath(article.slug)}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    mainEntityOfPage: canonical,
    url: canonical,
    author: article.authorName ? { '@type': 'Person', name: article.authorName } : undefined,
    datePublished: article.firstPublishedAt,
    dateModified: article.updatedAt,
    image: article.cover?.asset ? coverUrl(article.cover, 1200, 630) : undefined,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };

  return (
    <Container className="pb-20 pt-32 lg:pb-28 lg:pt-40">
      {!isPreview && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
      <article className="mx-auto max-w-4xl">
        <header className="mb-8">
          <Link href={blogPath} className="text-sm font-medium text-gold-400 hover:underline">
            ← Back to Blog
          </Link>
          <h1 className="mt-6 break-words font-serif text-4xl font-semibold sm:text-5xl">
            {article.title || 'Untitled article'}
          </h1>
          {(article.authorName || article.firstPublishedAt) && (
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
              {article.authorName && <span>By <bdi>{article.authorName}</bdi></span>}
              {article.firstPublishedAt && (
                <time dateTime={article.firstPublishedAt}>
                  {publicationDate.format(new Date(article.firstPublishedAt))}
                </time>
              )}
            </div>
          )}
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-text-secondary">{article.excerpt}</p>
        </header>
        {article.cover?.asset && (
          <Image
            src={coverUrl(article.cover, 1440, 810)}
            alt={article.cover.alt || ''}
            width={1440}
            height={810}
            sizes="(min-width: 1024px) 896px, 100vw"
            className="mb-10 h-auto w-full rounded-lg"
          />
        )}
        {article.body && (
          <div className="mx-auto max-w-3xl break-words text-lg leading-relaxed text-text-secondary">
            <PortableText value={article.body} components={bodyComponents} />
          </div>
        )}
      </article>
    </Container>
  );
}
