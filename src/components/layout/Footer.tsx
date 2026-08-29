import Image from 'next/image';
import { BriefcaseBusiness, MessageCircle } from 'lucide-react';
import { CTA, NAV_LINKS, FOOTER, SITE_NAME } from '@/lib/constants';
import { Container } from '@/components/ui/Container';

const SOCIAL_ICONS = {
  Linkedin: BriefcaseBusiness,
  Twitter: MessageCircle,
};

export default function Footer() {
  return (
    <footer role='contentinfo' id='footer' className="bg-charcoal-700 border-t border-charcoal-600">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          <div>
            <Image
              src='/images/aurem-logo.png'
              alt={SITE_NAME || 'Aurem Capital'}
              width={932}
              height={515}
              className='h-16 lg:h-20 w-auto object-contain'
              style={{ width: 'auto' }}
            />
            <p className="text-sm text-text-secondary mt-5 max-w-xs">
              {FOOTER.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <nav aria-label='Footer navigation'>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex gap-4">
              {FOOTER.socialLinks.map((link) => {
                const Icon = SOCIAL_ICONS[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    target='_blank'
                    rel='noopener noreferrer'
                    className="text-text-secondary hover:text-gold-500 transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
            <a
              href={`mailto:${CTA.contactEmail}`}
              className="mt-5 inline-flex min-h-11 items-center text-sm text-text-secondary transition-colors hover:text-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-700"
            >
              {CTA.contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-12 overflow-visible pt-5">
          <div className="footer-credit-line" aria-hidden="true" />
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-xs text-text-muted md:text-left">
              <span>{FOOTER.copyright}</span>
              <span className="footer-credit-dot" aria-hidden="true" />
              <a
                href="https://wa.me/201002455834"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-credit-link rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4 focus-visible:ring-offset-charcoal-700"
              >
                Don Charisma :)
              </a>
            </p>
            <p className="max-w-lg text-center text-xs text-text-muted md:text-right">
              {FOOTER.disclaimer}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
