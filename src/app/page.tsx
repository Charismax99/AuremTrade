import { Hero } from '@/components/sections/Hero';
import { LiveMarketWatch } from '@/components/sections/LiveMarketWatch';
import { About } from '@/components/sections/About';
import { LatestArticles } from '@/components/sections/LatestArticles';
import { Markets } from '@/components/sections/Markets';
import { MarketIntelligence } from '@/components/sections/MarketIntelligence';
import { Approach } from '@/components/sections/Approach';
import { CallToAction } from '@/components/sections/CallToAction';

export default function Home() {
  return (
    <>
      <Hero />
      <LiveMarketWatch />
      <About />
      <LatestArticles />
      <Markets />
      <MarketIntelligence />
      <Approach />
      <CallToAction />
    </>
  );
}
