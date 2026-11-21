import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { articlePath, blogPath } from '@/lib/blog/config';
import { coverUrl, getPublishedArticles } from '@/lib/blog/content';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

const description = 'Market insights, research, and trading education from Aurem Capital.';
const canonical = `${SITE_URL}${blogPath}`;

export const metadata: Metadata = {
  title: 'Blog',
  description,
  alternates: { canonical },
  openGraph: { type: 'website', title: 'Blog', description, url: canonical, siteName: SITE_NAME },
  twitter: { card: 'summary', title: 'Blog', description },
};

export default async function BlogPage() {
  const articles = await getPublishedArticles();

  return (
    <Container className="pb-20 pt-32 lg:pb-28 lg:pt-40">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-serif text-5xl font-semibold text-gold-500 sm:text-6xl">Blog</h1>
        <p className="mt-4 text-lg text-text-secondary">{description}</p>
      </header>

      {articles.length === 0 ? (
        <p className="border-t border-charcoal-600 py-8 text-text-secondary">
          No articles have been published yet.
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map(({ slug, title, excerpt, cover }) => (
            <li key={slug} className="overflow-hidden rounded-lg border border-charcoal-600 bg-charcoal-800">
              <Link
                href={articlePath(slug)}
                className="group block h-full focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-500"
              >
                {cover?.asset && (
                  <Image
                    src={coverUrl(cover, 960, 540)}
                    alt={cover.alt || ''}
                    width={960}
                    height={540}
                    sizes="(min-width: 1280px) 390px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-video w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="font-serif text-2xl font-semibold group-hover:text-gold-400">{title}</h2>
                  <p className="mt-3 leading-relaxed text-text-secondary">{excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
