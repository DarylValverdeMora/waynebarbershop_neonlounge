import { useRef } from 'react';
import { cutPhotos, localPhotos } from '../../data/gallery';
import { gsap, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import { useVariant } from '../../hooks/useVariant';
import { SectionHeading } from '../ui/SectionHeading';
import { cn } from '../ui/cn';

const amenities = ['Sillas de cuero', 'Sofás reclinables', 'TV con consola', 'Futbolín', 'Aire acondicionado'] as const;

const Amenities = () => (
  <ul className="flex flex-wrap gap-2" aria-label="Lo que hay en el local">
    {amenities.map((item) => (
      <li key={item} className="rounded-pill border border-line px-4 py-2 text-sm font-semibold" data-reveal>
        {item}
      </li>
    ))}
  </ul>
);

const Cuts = () => (
  <div className="mt-20 md:mt-28">
    <h3 className="font-display text-3xl uppercase md:text-4xl" data-reveal>
      Trabajos recientes
    </h3>
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {cutPhotos.map((photo) => (
        <figure key={photo.src} className="duotone overflow-hidden rounded-card" data-reveal>
          <img src={photo.src} alt={photo.alt} width={270} height={335} loading="lazy" className="aspect-[4/5] size-full object-cover" />
          <figcaption className="sr-only">{photo.caption}</figcaption>
        </figure>
      ))}
    </div>
  </div>
);

const NeonTrack = () => {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px)', () => {
        const track = scope.current?.querySelector<HTMLElement>('[data-track]');
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth + 64;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: { trigger: scope.current, start: 'top top', end: () => `+=${distance()}`, scrub: 0.6, pin: true, invalidateOnRefresh: true },
        });
      });
      return () => media.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="overflow-hidden lg:flex lg:h-screen lg:items-center motion-reduce:lg:h-auto motion-reduce:lg:overflow-x-auto">
      <div
        data-track
        role="region"
        aria-label="Fotos del local, deslizá para ver más"
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 lg:snap-none lg:overflow-visible lg:px-8">
        {localPhotos.map((photo, index) => (
          <figure key={photo.src} className="relative w-[80vw] shrink-0 snap-center overflow-hidden rounded-card border border-line sm:w-[52vw] lg:w-[34vw]">
            <img
              src={photo.src}
              alt={photo.alt}
              width={600}
              height={860}
              loading="lazy"
              className="aspect-[3/4] size-full object-cover lg:aspect-[4/5]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-bg/90 to-transparent p-5 pt-16">
              <span className="font-display text-2xl leading-tight uppercase">{photo.caption}</span>
              <span className="font-display text-glow tabular">0{index + 1}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

const ClasicaGrid = () => (
  <div className="container-wb grid gap-4 md:grid-cols-12 md:gap-6">
    {localPhotos.map((photo, index) => (
      <figure
        key={photo.src}
        data-reveal
        className={cn(
          index === 0 && 'md:col-span-7 md:row-span-2',
          index === 1 && 'md:col-span-5',
          index === 2 && 'md:col-span-5',
          index === 3 && 'md:col-span-12',
        )}
      >
        <div className="duotone overflow-hidden">
          <img
            src={photo.src}
            alt={photo.alt}
            width={600}
            height={860}
            loading="lazy"
            className={cn('w-full object-cover', index === 0 ? 'aspect-[4/5] md:aspect-square' : index === 3 ? 'aspect-[21/9]' : 'aspect-[4/3]')}
          />
        </div>
        <figcaption className="mt-2 flex gap-3 border-t border-ink pt-2 text-sm">
          <span className="font-display tabular">0{index + 1}</span>
          <span className="font-accent text-lg italic">{photo.caption}</span>
        </figcaption>
      </figure>
    ))}
  </div>
);

export const Local = () => {
  const { variant } = useVariant();
  return (
    <section id="local" aria-labelledby="local-title" className="py-20 md:py-32">
      <div className="container-wb">
        <SectionHeading
          id="local-title"
          index="03"
          eyebrow="El local"
          title="Esperar acá no se siente como esperar"
          intro="Luces azules, sillas de cuero y una sala con sofás, consola y futbolín para mientras llega tu turno."
        />
        <Amenities />
      </div>
      <div className="mt-12 md:mt-16">{variant === 'neon' ? <NeonTrack /> : <ClasicaGrid />}</div>
      <div className="container-wb">
        <Cuts />
      </div>
    </section>
  );
};
