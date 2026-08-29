'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { INTELLIGENCE } from '@/lib/constants';
import { BookOpen, LineChart, Globe } from 'lucide-react';

const icons = {
  BookOpen,
  LineChart,
  Globe
};

export function MarketIntelligence() {
  return (
    <section id="intelligence" className="py-24 lg:py-32 bg-charcoal-900">
      <Container>
        <SectionHeading title={INTELLIGENCE.heading} subtitle={INTELLIGENCE.subheading} align="center" />
        
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-16">
            <div className="lg:col-span-3 bg-charcoal-800 rounded-xl border border-charcoal-600/50 p-8 lg:p-10 relative overflow-hidden group">
              <h3 className="font-serif text-2xl font-bold text-text-primary relative z-10">{INTELLIGENCE.mainPanel.title}</h3>
              <p className="text-text-secondary mt-4 leading-relaxed relative z-10">{INTELLIGENCE.mainPanel.description}</p>
              
              <div className="absolute bottom-0 right-0 w-3/4 h-3/4 pointer-events-none">
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes drawLine {
                    from { stroke-dashoffset: 500; }
                    to { stroke-dashoffset: 0; }
                  }
                  .animate-draw {
                    stroke-dasharray: 500;
                    animation: drawLine 1.5s ease-out forwards;
                  }
                `}} />
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M0,150 C50,140 100,160 150,120 C200,80 250,100 300,50 C350,0 400,20 450,10" stroke="currentColor" className="text-gold-500 opacity-[0.08] animate-draw" strokeWidth="1" fill="none" style={{ animationDelay: '0.2s' }} />
                  <path d="M0,170 C60,160 110,180 160,130 C210,80 260,110 320,60 C370,10 420,30 480,20" stroke="currentColor" className="text-gold-500 opacity-[0.08] animate-draw" strokeWidth="1" fill="none" style={{ animationDelay: '0.4s' }} />
                  <path d="M0,190 C70,180 120,200 170,140 C220,80 270,120 340,70 C390,20 440,40 510,30" stroke="currentColor" className="text-gold-500 opacity-[0.08] animate-draw" strokeWidth="1" fill="none" style={{ animationDelay: '0.6s' }} />
                </svg>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="bg-charcoal-800 rounded-xl border border-charcoal-600/50 p-6 lg:p-8 flex-1 relative overflow-hidden">
                <h4 className="font-semibold text-text-primary text-sm uppercase tracking-wider mb-6">Data-Driven Insight</h4>
                <div className="space-y-3 relative z-10">
                  <div className="w-[85%] h-[2px] bg-gold-500 rounded-full opacity-[0.25] relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold-500 opacity-50" /></div>
                  <div className="w-[45%] h-[2px] bg-gold-500 rounded-full opacity-[0.15]" />
                  <div className="w-[70%] h-[2px] bg-gold-500 rounded-full opacity-[0.20] relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold-500 opacity-40" /></div>
                  <div className="w-[30%] h-[2px] bg-gold-500 rounded-full opacity-[0.10]" />
                  <div className="w-[60%] h-[2px] bg-gold-500 rounded-full opacity-[0.18]" />
                  <div className="w-[90%] h-[2px] bg-gold-500 rounded-full opacity-[0.08] relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold-500 opacity-30" /></div>
                </div>
              </div>
              
              <div className="bg-charcoal-800 rounded-xl border border-charcoal-600/50 p-6 lg:p-8 flex-1 relative overflow-hidden">
                <h4 className="font-semibold text-text-primary">{INTELLIGENCE.sidePanel.title}</h4>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">{INTELLIGENCE.sidePanel.description}</p>
                <div className="absolute bottom-4 right-4 opacity-15 text-gold-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {INTELLIGENCE.pillars.map((pillar, index) => {
              const Icon = icons[pillar.icon as keyof typeof icons] || BookOpen;
              return (
                <div key={index} className="bg-charcoal-800/60 border border-charcoal-600/30 rounded-xl p-5 text-center flex flex-col items-center justify-center">
                  <Icon className="w-5 h-5 text-gold-500" />
                  <span className="text-sm font-medium text-text-primary mt-2">{pillar.label}</span>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
