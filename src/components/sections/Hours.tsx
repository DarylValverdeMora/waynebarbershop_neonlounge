import { scheduleGroups } from '../../data/schedule';
import { useNow } from '../../hooks/useNow';
import { useVariant } from '../../hooks/useVariant';
import { SectionHeading } from '../ui/SectionHeading';
import { cn } from '../ui/cn';
import { StatusPill } from './StatusPill';

export const Hours = () => {
  const { day } = useNow();
  const { variant } = useVariant();
  return (
    <section id="horario" aria-labelledby="horario-title" className="bg-bg-alt py-20 md:py-32">
      <div className="container-wb grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading id="horario-title" index="05" eyebrow="Horario" title="Abrimos todos los días" className="mb-6 md:mb-8" />
          <StatusPill />
        </div>
        <ul className="grid gap-4">
          {scheduleGroups.map((group) => {
            const isToday = (group.days as readonly number[]).includes(day);
            return (
              <li
                key={group.label}
                data-reveal
                className={cn(
                  'relative flex flex-col gap-1 border p-6 md:p-7',
                  variant === 'neon' ? 'rounded-[2rem]' : 'rounded-none border-x-0 border-t-0',
                  isToday ? 'border-glow bg-surface shadow-[0_0_32px_-12px_var(--wb-glow)]' : 'border-line',
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-extrabold tracking-[0.2em] text-script uppercase">{group.label}</h3>
                  {isToday && <span className="rounded-pill bg-glow px-3 py-1 text-[11px] font-bold tracking-widest text-bg uppercase">Hoy</span>}
                </div>
                <p className="font-display text-4xl tabular uppercase md:text-5xl">{group.hours}</p>
                {group.note && <p className="mt-1 text-sm text-muted">{group.note}</p>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
