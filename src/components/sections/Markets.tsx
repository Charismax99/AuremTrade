'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MarketCard } from '@/components/ui/MarketCard';
import { MARKETS } from '@/lib/constants';

export function Markets() {
  return (
    <section id="markets" className="py-24 lg:py-32 bg-charcoal-950">
      <Container>
        <SectionHeading title={MARKETS.heading} subtitle={MARKETS.subheading} align="center" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {MARKETS.items.map((item, index) => (
            <MarketCard
              key={index}
              name={item.name}
              description={item.description}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
