import { business } from '../../data/business';
import { useBooking } from '../../hooks/useBooking';
import { useVariant } from '../../hooks/useVariant';
import { BookingButton } from '../ui/BookingButton';
import { cn } from '../ui/cn';

export const FinalCta = () => {
  const { variant } = useVariant();
  const action = useBooking();
  return (
    <section
      id="agendar-final"
      aria-labelledby="cta-title"
      className={cn(
        'band relative overflow-hidden bg-bg py-24 text-center text-ink md:py-36',
        variant === 'clasica' && '[clip-path:polygon(0_3vw,100%_0,100%_100%,0_100%)]',
      )}
    >
      {variant === 'neon' && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgb(20_50_238/0.45),transparent_60%)]" />
      )}
      <div className="container-wb relative flex flex-col items-center">
        <p className="text-xs font-bold tracking-[0.35em] text-glow uppercase" data-reveal>
          {business.name}
        </p>
        <h2 id="cta-title" className="mt-4 font-display text-[clamp(3.5rem,16vw,10rem)] leading-[0.85] font-black uppercase" data-reveal>
          {variant === 'neon' ? (
            <>
              Elige <span className="neon-text">calidad</span>
            </>
          ) : (
            <>
              Elige calidad<span className="text-script">.</span>
            </>
          )}
        </h2>
        <p className="mt-6 max-w-md text-muted" data-reveal>
          {action.kind === 'walk-in' ? action.note : 'Escribinos por WhatsApp y te damos el espacio que mejor te quede.'}
        </p>
        <div className="mt-8" data-reveal>
          <BookingButton />
        </div>
      </div>
    </section>
  );
};
