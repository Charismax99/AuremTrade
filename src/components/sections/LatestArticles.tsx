import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { articlePath, blogPath } from '@/lib/blog/config';
import { coverUrl, getLatestPublishedArticles } from '@/lib/blog/content';

export async function LatestArticles() {
  const articles = await getLatestPublishedArticles();
  if (articles.length === 0) return null;

  const hasThree = articles.length === 3;
  const imageSizes = hasThree
    ? '(min-width: 1280px) 390px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
    : '(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw';

  return (
    <section id="latest-articles" aria-label="Latest Articles" className="border-y border-charcoal-600/50 bg-charcoal-950 py-16 lg:py-24">
      <Container>
        <AnimatedSection className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 sm:mb-8 motion-reduce:opacity-100! motion-reduce:transform-none!">
          <SectionHeading title="Latest Articles" align="left" />
          <Link href={blogPath} className="rounded-sm text-sm font-medium text-gold-400 hover:text-gold-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400">
            View all articles <span aria-hidden="true">↗</span>
          </Link>
        </AnimatedSection>
        <ul className={`grid gap-6 md:grid-cols-2 ${hasThree ? 'lg:grid-cols-3' : ''}`}>
          {articles.map(({ slug, title, excerpt, cover }, index) => (
            <li key={slug}>
              <AnimatedSection
                delay={index * 0.08}
                className="h-full overflow-hidden rounded-xl border border-charcoal-600/70 bg-charcoal-800 motion-reduce:opacity-100! motion-reduce:transform-none!"
              >
                <Link href={articlePath(slug)} className="group block h-full focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-500">
                  {cover?.asset && (
                    <Image
                      src={coverUrl(cover, 960, 504)}
                      alt={cover.alt || ''}
                      width={960}
                      height={504}
                      sizes={imageSizes}
                      className="aspect-[40/21] w-full object-cover"
                    />
                  )}
                  <div className="p-5 sm:p-6">
                    <h3 className="font-serif text-2xl font-semibold text-text-primary group-hover:text-gold-400">
                      {title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-secondary sm:text-base">{excerpt}</p>
                  </div>
                </Link>
              </AnimatedSection>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
