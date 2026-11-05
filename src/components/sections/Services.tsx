import { services, type Service } from '../../data/services';
import { formatColones } from '../../lib/format';
import { useVariant } from '../../hooks/useVariant';
import { useBooking } from '../../hooks/useBooking';
import { BookingButton } from '../ui/BookingButton';
import { SectionHeading } from '../ui/SectionHeading';
import { Icon } from '../ui/Icon';
import { cn } from '../ui/cn';

const ServiceCard = ({ service }: { service: Service }) => (
  <article
    data-reveal
    className={cn(
      'group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface p-6 transition-colors duration-300 hover:border-glow/50 md:p-8',
      service.featured && 'md:col-span-2 md:row-span-2 bg-gradient-to-br from-surface-2 to-bg-alt',
    )}
  >
    <div className="flex items-start justify-between gap-4">
      <h3 className={cn('font-display leading-none font-black uppercase', service.featured ? 'text-5xl md:text-7xl' : 'text-3xl')}>
        {service.name}
      </h3>
      <p className={cn('font-display font-bold tabular text-glow', service.featured ? 'text-4xl md:text-5xl' : 'text-2xl')}>
        {formatColones(service.price)}
      </p>
    </div>
    <p className="mt-3 text-muted">{service.description}</p>
    {service.includes && (
      <div className="mt-6">
        <p className="text-xs font-bold tracking-widest text-highlight uppercase">Incluido de cortesía</p>
        <ul className="mt-3 grid gap-2">
          {service.includes.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span aria-hidden="true" className="led-bar h-[2px] w-4 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    )}
    <div className="mt-auto pt-8">
      <BookingButton serviceId={service.id} label="Agendar" ariaLabel={`Agendar ${service.name} por WhatsApp`} tone={service.featured ? 'primary' : 'ghost'} className="w-full sm:w-auto" />
    </div>
    <span aria-hidden="true" className="led-bar absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
  </article>
);

const MenuRow = ({ service }: { service: Service }) => {
  const action = useBooking(service.id);
  return (
    <li data-reveal className={cn('border-b border-line py-6', service.featured && 'py-8')}>
      <div className="flex items-baseline gap-3">
        <h3 className={cn('font-display uppercase', service.featured ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl')}>
          {service.name}
        </h3>
        <span aria-hidden="true" className="mb-2 min-w-6 flex-1 border-b-2 border-dotted border-ink/40" />
        <p className={cn('font-display tabular', service.featured ? 'text-4xl md:text-5xl text-accent' : 'text-2xl md:text-3xl')}>
          {formatColones(service.price)}
        </p>
      </div>
      <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-muted">{service.description}</p>
          {service.includes && (
            <p className="mt-2 font-accent text-xl italic">Incluye de cortesía: {service.includes.join(', ').toLowerCase()}.</p>
          )}
        </div>
        <a
          href={action.href}
          {...(action.kind === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          aria-label={action.kind === 'walk-in' ? action.note : `Agendar ${service.name} por WhatsApp`}
          className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold tracking-wider text-accent uppercase underline-offset-4 hover:underline md:self-auto"
        >
          {action.kind === 'walk-in' ? action.label : 'Agendar'}
          <Icon name="arrow" className="size-4" />
        </a>
      </div>
    </li>
  );
};

export const Services = () => {
  const { variant } = useVariant();
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="py-20 md:py-32">
      <div className="container-wb">
        <SectionHeading
          id="servicios-title"
          index="01"
          eyebrow="Servicios"
          title="Lo que hacemos"
          intro="Precios en colones. Las cejas van incluidas en el corte y en corte con barba."
        />
        {variant === 'clasica' ? (
          <ul className="border-t-2 border-ink">
            {services.map((service) => (
              <MenuRow key={service.id} service={service} />
            ))}
          </ul>
        ) : (
          <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
