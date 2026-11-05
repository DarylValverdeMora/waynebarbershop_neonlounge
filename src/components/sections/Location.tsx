import { useState } from 'react';
import { business } from '../../data/business';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { SectionHeading } from '../ui/SectionHeading';
import { PlaceholderTag } from '../ui/Placeholder';

const { lat, lng } = business.location;
const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`;
const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

// El mapa de Google carga contenido y cookies de terceros, así que solo se carga si el visitante lo pide.
const MapConsent = ({ onLoad }: { onLoad: () => void }) => (
  <div className="relative grid size-full place-items-center overflow-hidden p-6 text-center">
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--wb-line)_1px,transparent_1px),linear-gradient(90deg,var(--wb-line)_1px,transparent_1px)] [background-size:32px_32px]"
    />
    <div className="relative flex max-w-xs flex-col items-center gap-4">
      <span className="grid size-14 place-items-center rounded-full bg-accent text-on-accent shadow-[0_0_30px_-6px_var(--wb-accent)]">
        <Icon name="pin" className="size-7" />
      </span>
      <p className="text-sm text-muted">El mapa interactivo lo muestra Google Maps, que puede guardar cookies en tu navegador.</p>
      <button
        type="button"
        onClick={onLoad}
        className="min-h-11 rounded-pill border border-line px-5 text-sm font-bold tracking-wide uppercase transition-colors hover:border-glow hover:text-glow"
      >
        Mostrar mapa
      </button>
    </div>
  </div>
);

export const Location = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <section id="ubicacion" aria-labelledby="ubicacion-title" className="bg-bg-alt py-20 md:py-32">
      <div className="container-wb grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <SectionHeading id="ubicacion-title" index="07" eyebrow="Ubicación" title="Cómo llegar" className="mb-6 md:mb-8" />
          <p className="text-lg">Turrialba, Cartago.</p>
          <div className="mt-3">
            <PlaceholderTag>Dirección con señas</PlaceholderTag>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href={business.location.mapsUrl} icon="pin" external>
              Abrir en Google Maps
            </Button>
            <Button href={wazeUrl} icon="waze" tone="ghost" external>
              Abrir en Waze
            </Button>
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-card border border-line bg-surface" data-reveal>
          {showMap ? (
            <iframe
              title="Mapa de Wayne's Barbershop en Turrialba"
              src={embedUrl}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="size-full border-0"
            />
          ) : (
            <MapConsent onLoad={() => setShowMap(true)} />
          )}
        </div>
      </div>
    </section>
  );
};
