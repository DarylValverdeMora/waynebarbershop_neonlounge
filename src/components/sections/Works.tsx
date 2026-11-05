import { cutPhotos, localPhotos } from '../../data/gallery';
import { useVariant } from '../../hooks/useVariant';
import { Carousel } from '../ui/Carousel';
import { SectionHeading } from '../ui/SectionHeading';
import { cn } from '../ui/cn';

const amenities = ['Sillas de cuero', 'Sofás reclinables', 'TV con consola', 'Futbolín', 'Aire acondicionado'] as const;

const Cuts = () => (
  <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
    {cutPhotos.map((photo) => (
      <figure key={photo.src} className="duotone overflow-hidden rounded-card" data-reveal>
        <img src={photo.src} alt={photo.alt} width={270} height={335} loading="lazy" className="aspect-[4/5] size-full object-cover" />
        <figcaption className="sr-only">{photo.caption}</figcaption>
      </figure>
    ))}
  </div>
);

const LocalIntro = () => (
  <div className="container-wb">
    <h3 className="font-display text-4xl leading-[0.95] uppercase md:text-6xl" data-reveal>
      Esperar acá no se siente como esperar
    </h3>
    <p className="mt-4 max-w-xl text-muted md:text-lg" data-reveal>
      Luces azules, sillas de cuero y una sala con sofás, consola y futbolín para mientras llega tu turno.
    </p>
    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Lo que hay en el local">
      {amenities.map((item) => (
        <li key={item} className="rounded-pill border border-line px-4 py-2 text-sm font-semibold" data-reveal>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const NeonLocal = () => (
  <Carousel label="Fotos del local" className="mt-10">
    {localPhotos.map((photo, index) => (
      <figure
        key={photo.src}
        className="relative w-[80vw] shrink-0 snap-start overflow-hidden rounded-card border border-line sm:w-[46vw] lg:w-[30vw]"
      >
        <img src={photo.src} alt={photo.alt} width={600} height={860} loading="lazy" className="aspect-[4/5] size-full object-cover" />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-bg/90 to-transparent p-5 pt-16">
          <span className="font-display text-2xl leading-tight uppercase">{photo.caption}</span>
          <span className="font-display text-glow tabular">0{index + 1}</span>
        </figcaption>
      </figure>
    ))}
  </Carousel>
);

const ClasicaLocal = () => (
  <div className="container-wb mt-10 grid gap-4 md:grid-cols-12 md:gap-6">
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

export const Works = () => {
  const { variant } = useVariant();
  return (
    <section id="trabajos" aria-labelledby="trabajos-title" className="bg-bg-alt py-20 md:py-32">
      <div className="container-wb">
        <SectionHeading
          id="trabajos-title"
          index="05"
          eyebrow="Trabajos"
          title="Cortes recientes"
          intro="Degradados, diseños a navaja y contornos marcados, hechos en la casa."
        />
        <Cuts />
      </div>
      <div className="mt-20 md:mt-28">
        <LocalIntro />
        {variant === 'neon' ? <NeonLocal /> : <ClasicaLocal />}
      </div>
    </section>
  );
};
