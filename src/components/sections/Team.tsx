import { team } from '../../data/team';
import { SectionHeading } from '../ui/SectionHeading';
import { Icon } from '../ui/Icon';
import { PlaceholderTag } from '../ui/Placeholder';

export const Team = () => (
  <section id="equipo" aria-labelledby="equipo-title" className="py-20 md:py-32">
    <div className="container-wb">
      <SectionHeading id="equipo-title" index="04" eyebrow="Equipo" title="Los barberos" intro={<PlaceholderTag>Nombres, fotos y especialidades</PlaceholderTag>} />
      <ul className="grid grid-cols-3 gap-3 md:gap-4">
        {team.map((barber) => (
          <li key={barber.id} className="overflow-hidden rounded-card border border-dashed border-line bg-surface" data-reveal>
            <div className="grid aspect-square place-items-center bg-surface-2 text-muted md:aspect-[4/3]">
              {barber.photo ? (
                <img src={barber.photo} alt={barber.name} loading="lazy" className="size-full object-cover" />
              ) : (
                <Icon name="scissors" className="size-8 opacity-40 md:size-14" />
              )}
            </div>
            <div className="p-3 md:p-5">
              <h3 className="font-display text-base leading-tight uppercase md:text-2xl">{barber.name}</h3>
              <p className="mt-1 text-xs text-muted md:text-sm">{barber.specialty}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
