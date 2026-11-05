import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from './lib/gsap';
import { prefersReducedMotion } from './hooks/useReducedMotion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useVariant } from './hooks/useVariant';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Shop } from './components/sections/Shop';
import { Local } from './components/sections/Local';
import { Team } from './components/sections/Team';
import { Hours } from './components/sections/Hours';
import { Reviews } from './components/sections/Reviews';
import { Location } from './components/sections/Location';
import { FinalCta } from './components/sections/FinalCta';
import { Footer } from './components/sections/Footer';
import { FloatingWhatsApp } from './components/sections/FloatingWhatsApp';
import { LedLine } from './variants/neon/LedLine';
import { RazorDivider } from './variants/clasica/RazorDivider';
import { PresentPanel } from './present/PresentPanel';

const useScrollReveals = (scope: React.RefObject<HTMLElement | null>, variant: string) => {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.set('[data-reveal]', { opacity: 0 });
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.fromTo(batch, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, overwrite: true }),
      });
      gsap.utils.toArray<HTMLElement>('[data-led]').forEach((bar) =>
        gsap.from(bar, { scaleX: 0, duration: 1.1, ease: 'power2.inOut', scrollTrigger: { trigger: bar, start: 'top 90%', once: true } }),
      );
      gsap.utils.toArray<HTMLElement>('[data-razor-line]').forEach((line) =>
        gsap.from(line, { scaleX: 0, duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: line, start: 'top 92%', once: true } }),
      );
    },
    { scope, dependencies: [variant], revertOnUpdate: true },
  );
};

export const App = () => {
  const { variant } = useVariant();
  const scope = useRef<HTMLDivElement>(null);
  useSmoothScroll();
  useScrollReveals(scope, variant);
  const divider = variant === 'clasica' ? <RazorDivider /> : null;

  return (
    <div ref={scope} key={variant}>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent">
        Saltar al contenido
      </a>
      {variant === 'neon' && <LedLine />}
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
        <Shop />
        <Local />
        {divider}
        <Team />
        <Hours />
        <Reviews />
        {divider}
        <Location />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <PresentPanel />
    </div>
  );
};
