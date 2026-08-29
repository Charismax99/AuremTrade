'use client';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { LeadForm } from '@/components/ui/LeadForm';
import { CTA } from '@/lib/constants';

export function CallToAction() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-charcoal-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,149,59,0.03)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="relative z-10 text-center">
        <Container>
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
              {CTA.heading}
            </h2>
            <p className="text-text-secondary text-lg mt-6 max-w-xl mx-auto">
              {CTA.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
              <Button href={CTA.primaryCta.href} variant="primary" size="lg">
                {CTA.primaryCta.label}
              </Button>
              <a href={`mailto:${CTA.contactEmail}`} className="text-text-muted hover:text-gold-500 transition-colors text-sm ml-0 sm:ml-4">
                {CTA.contactEmail}
              </a>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15} className="mx-auto mt-16 max-w-4xl">
            <LeadForm />
          </AnimatedSection>
        </Container>
      </div>
    </section>
  );
}
