'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { APPROACH } from '@/lib/constants';
import { motion } from 'framer-motion';

export function Approach() {
  return (
    <section id="approach" className="py-24 lg:py-32 bg-charcoal-950">
      <Container>
        <SectionHeading title={APPROACH.heading} subtitle={APPROACH.subheading} align="center" />
        
        <AnimatedSection>
          <div className="flex flex-col items-center mt-16">
            <div className="hidden lg:grid lg:grid-cols-4 gap-0 relative w-full">
              <div className="absolute top-[24px] left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-gold-500/20 via-gold-500/40 to-gold-500/20" />
              
              {APPROACH.steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative text-center px-6"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-gold-500 flex items-center justify-center mx-auto relative z-10 bg-charcoal-950">
                    <span className="font-serif text-lg font-bold text-gold-500">{index + 1}</span>
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-text-primary mt-4">{step.title}</h4>
                  <p className="text-sm text-text-secondary mt-2 leading-relaxed max-w-[220px] mx-auto">{step.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="lg:hidden flex flex-col w-full px-4 mt-8">
              {APPROACH.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-6 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-gold-500 flex items-center justify-center relative z-10 bg-charcoal-950">
                      <span className="font-serif text-lg font-bold text-gold-500">{index + 1}</span>
                    </div>
                    {index < APPROACH.steps.length - 1 && (
                      <div className="w-[1px] h-full bg-gold-500/20 absolute top-12 left-6" />
                    )}
                  </div>
                  <div className="flex-1 pb-12">
                    <h4 className="font-serif text-xl font-semibold text-text-primary mt-1">{step.title}</h4>
                    <p className="text-sm text-text-secondary mt-2 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
