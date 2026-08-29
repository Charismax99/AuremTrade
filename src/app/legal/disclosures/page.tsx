import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { CTA } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Risk & Disclosure',
  description:
    'General risk and disclosure information covering website content, trading and investment risk, market data, educational materials, and third-party services.',
  alternates: {
    canonical: '/legal/disclosures',
  },
};

const LAST_UPDATED = 'August 29, 2026';
const LAST_UPDATED_ISO = '2026-08-29';

const DISCLOSURE_SECTIONS = [
  {
    title: 'General Disclaimer',
    content:
      'The content on this website is provided as general informational and educational material. It is not tailored to any individual and does not constitute personalized financial, investment, legal, or tax advice, an offer, or a recommendation to buy, sell, or hold any financial instrument.',
  },
  {
    title: 'Trading & Investment Risk',
    content:
      'Trading and investing in financial markets involves substantial risk. Losses can occur, including the potential loss of invested capital. Leveraged products, where applicable, can magnify both gains and losses. Visitors should carefully consider the risks involved and should not commit capital they cannot afford to lose.',
  },
  {
    title: 'No Guaranteed Returns',
    content:
      'Past performance does not guarantee future results. No return, profit, level of performance, or other outcome is promised or guaranteed, and market conditions can change without notice.',
  },
  {
    title: 'Market Data',
    content:
      'Market prices, charts, quotes, ticker information, and related data displayed on this website are provided for general informational purposes. They may be delayed, indicative, or supplied by third parties and should not automatically be treated as executable trading prices.',
  },
  {
    title: 'Educational Content',
    content:
      'Articles, videos, research, commentary, and other educational materials are intended to improve general market understanding. They do not account for an individual visitor’s objectives or circumstances and are not personalized recommendations.',
  },
  {
    title: 'Past Performance and Examples',
    content:
      'Historical performance, hypothetical examples, scenarios, and illustrations may rely on assumptions or simplified conditions. They are provided for explanatory purposes and do not guarantee or predict future performance.',
  },
  {
    title: 'Individual Circumstances',
    content:
      'Financial goals, market experience, risk tolerance, financial position, and personal circumstances differ between individuals. Visitors should independently assess whether any product, service, or activity is suitable for them and seek qualified professional advice where appropriate.',
  },
  {
    title: 'Third-Party Services and Links',
    content:
      'References or links to external platforms, brokers, websites, services, and tools may be provided for convenience. Third parties operate under their own terms, risks, practices, and privacy policies, which visitors should review directly before using those services.',
  },
  {
    title: 'Regulatory / Jurisdiction Notice',
    content:
      'Financial services, products, and activities may be subject to different laws and regulatory requirements depending on the jurisdiction. Visitors are responsible for understanding the rules applicable to them. AUREM CAPITAL does not make any representation on this page regarding regulatory status unless expressly stated elsewhere on the website.',
  },
] as const;

export default function DisclosuresPage() {
  return (
    <main className="relative isolate overflow-hidden bg-charcoal-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_72%_2%,rgba(198,153,62,0.12),transparent_44%)]"
      />

      <section aria-labelledby="disclosure-heading" className="pb-24 pt-36 sm:pb-28 sm:pt-40 lg:pb-32 lg:pt-44">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="border-b border-gold-500/20 pb-10 sm:pb-12">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-gold-400">
                Legal
              </p>
              <h1
                id="disclosure-heading"
                className="font-serif text-4xl leading-tight text-text-primary sm:text-5xl lg:text-6xl"
              >
                Risk &amp; Disclosure
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
                The information provided on this website is intended for general informational and educational purposes only. It should not be interpreted as personalized financial, investment, legal, or tax advice.
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-text-muted">
                Last Updated:{' '}
                <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>
              </p>
            </div>

            <ol className="divide-y divide-charcoal-600/80">
              {DISCLOSURE_SECTIONS.map((section, index) => (
                <li
                  key={section.title}
                  className="grid gap-4 py-9 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-7 sm:py-10"
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-sm tracking-[0.16em] text-gold-500"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl text-text-primary sm:text-[1.75rem]">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
                      {section.content}
                    </p>
                  </div>
                </li>
              ))}

              <li className="grid gap-4 py-9 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-7 sm:py-10">
                <span
                  aria-hidden="true"
                  className="font-serif text-sm tracking-[0.16em] text-gold-500"
                >
                  10
                </span>
                <div>
                  <h2 className="font-serif text-2xl text-text-primary sm:text-[1.75rem]">
                    Contact
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
                    For questions about this disclosure page, contact us at{' '}
                    <a
                      href={`mailto:${CTA.contactEmail}`}
                      className="rounded-sm text-gold-300 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4 focus-visible:ring-offset-charcoal-900"
                    >
                      {CTA.contactEmail}
                    </a>
                    .
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </Container>
      </section>
    </main>
  );
}
