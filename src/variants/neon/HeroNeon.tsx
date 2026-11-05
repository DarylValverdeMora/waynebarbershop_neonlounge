import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { business } from '../../data/business';
import { images } from '../../data/images';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import { BookingButton } from '../../components/ui/BookingButton';
import { Button } from '../../components/ui/Button';
import { StatusPill } from '../../components/sections/StatusPill';

export const HeroNeon = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .from('[data-hero-photo]', { scale: 1.12, opacity: 0, duration: 1.6 })
        .from('[data-hero-line]', { yPercent: 110, duration: 0.9, stagger: 0.12 }, 0.2)
        // Arranque de un tubo de neón: parpadea antes de quedar fijo.
        .fromTo(
          '[data-neon]',
          { opacity: 0.08 },
          { opacity: 1, duration: 0.9, ease: 'rough({ strength: 2, points: 12, template: none, taper: none, randomize: true, clamp: true })' },
          0.55,
        )
        .from('[data-hero-fade]', { y: 14, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.25)
        .from('[data-hero-led]', { scaleX: 0, duration: 1.2, ease: 'power2.inOut' }, 0.4);
    },
    { scope },
  );

  return (
    <section ref={scope} id="inicio" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0 -z-10 lg:left-auto lg:w-[58%]" data-hero-photo>
        <img
          src={images.localNeon}
          alt=""
          width={547}
          height={845}
          className="size-full object-cover object-[60%_30%] md:object-[50%_25%]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/20 md:bg-gradient-to-r md:from-bg md:via-bg/70 md:to-bg/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgb(20_50_238/0.35),transparent_60%)]" />
      </div>

      <div className="container-wb pt-28 pb-14 md:pb-24">
        <div data-hero-fade>
          <StatusPill />
        </div>
        <p className="mt-6 text-xs font-bold tracking-[0.35em] text-glow uppercase" data-hero-fade>
          {business.city} · {business.yearsOpen} años
        </p>
        <h1 id="hero-title" className="mt-3 font-display leading-[0.82] font-black uppercase">
          <span className="block overflow-hidden">
            <span className="block text-[clamp(4.5rem,24vw,13rem)]" data-hero-line>
              Elige
            </span>
          </span>
          <span className="block pb-2">
            <span className="block text-[clamp(4.5rem,24vw,13rem)]" data-hero-line>
              <span className="neon-text" data-neon>
                calidad
              </span>
            </span>
          </span>
        </h1>
        <p className="mt-6 max-w-md text-base text-muted md:text-lg">
          {business.yearsOpen} años cortando en Turrialba. Lavado, cejas y peinado incluidos con tu corte, y un lounge con
          consola y futbolín mientras esperás.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-hero-fade>
          <BookingButton />
          <Button href="#servicios" tone="ghost" icon="arrow">
            Ver servicios
          </Button>
        </div>
      </div>
      <span aria-hidden="true" className="led-bar absolute inset-x-0 bottom-0 h-[2px] origin-left" data-hero-led />
    </section>
  );
};
