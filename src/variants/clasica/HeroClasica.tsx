import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { business } from '../../data/business';
import { images } from '../../data/images';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import { BookingButton } from '../../components/ui/BookingButton';
import { Button } from '../../components/ui/Button';
import { StatusPill } from '../../components/sections/StatusPill';

export const HeroClasica = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } });
      timeline
        .from('[data-hero-line]', { yPercent: 105, duration: 1, stagger: 0.1 })
        .from('[data-hero-photo]', { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', duration: 1.3, ease: 'power3.inOut' }, 0.1)
        .from('[data-razor]', { scaleY: 0, duration: 0.9, ease: 'power2.inOut' }, 0.5)
        .from('[data-hero-fade]', { y: 14, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.25);
    },
    { scope },
  );

  return (
    <section ref={scope} id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pt-24 md:pt-28">
      <div className="container-wb">
        <div
          className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-y border-ink py-2 text-[11px] font-bold tracking-[0.25em] uppercase"
          data-hero-fade
        >
          <span>{business.city}, Costa Rica</span>
          <span>{business.yearsOpen} años</span>
          <span className="hidden sm:inline">Abrimos todos los días</span>
        </div>
      </div>

      <div className="container-wb grid items-end gap-8 pt-8 pb-14 md:grid-cols-[1.15fr_1fr] md:gap-0 md:pb-20">
        <div className="relative z-10">
          <h1 id="hero-title" className="font-display leading-[0.86] uppercase">
            <span className="block overflow-hidden">
              <span className="block text-[clamp(5rem,27vw,15rem)]" data-hero-line>
                Elige
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block text-[clamp(3.6rem,19vw,10.5rem)] md:-mr-24" data-hero-line>
                calidad<span className="text-accent">.</span>
              </span>
            </span>
          </h1>
          <p className="mt-5 font-accent text-3xl italic md:text-4xl">
            La barbería de Turrialba, hace {business.yearsOpen} años.
          </p>
          <p className="mt-4 max-w-md text-base text-muted">
            Corte con lavado, cejas y peinado incluidos. Navaja para el contorno y la barba. Y un lounge para esperar tu
            turno con calma.
          </p>
          <div className="mt-7" data-hero-fade>
            <StatusPill />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row" data-hero-fade>
            <BookingButton />
            <Button href="#servicios" tone="ghost" icon="arrow">
              Ver servicios
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            className="duotone aspect-[4/5] overflow-hidden [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]"
            data-hero-photo
          >
            <img
              src={images.localSillas}
              alt="Sillas de barbero de cuero negro alineadas en el local"
              width={601}
              height={861}
              className="size-full object-cover"
              fetchPriority="high"
            />
          </div>
          {/* Filo de navaja: la diagonal del recorte, en azul. */}
          <span aria-hidden="true" className="absolute top-0 left-[18%] h-full w-[3px] origin-top skew-x-[-8.2deg]">
            <span className="block size-full origin-top bg-accent" data-razor />
          </span>
        </div>
      </div>
    </section>
  );
};
