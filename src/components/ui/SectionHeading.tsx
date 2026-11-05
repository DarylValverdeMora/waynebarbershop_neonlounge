import type { ReactNode } from 'react';
import { useVariant } from '../../hooks/useVariant';
import { cn } from './cn';

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id: string;
  className?: string;
};

export const SectionHeading = ({ index, eyebrow, title, intro, id, className }: SectionHeadingProps) => {
  const { variant } = useVariant();
  return (
    <header className={cn('mb-10 md:mb-14', className)}>
      {variant === 'clasica' ? (
        <div className="mb-4 flex items-baseline gap-4 border-t border-ink pt-3" data-reveal>
          <span className="font-display text-sm tabular">{index}</span>
          <span className="text-xs font-bold tracking-[0.25em] uppercase">{eyebrow}</span>
        </div>
      ) : (
        <p className="mb-3 text-xs font-bold tracking-[0.3em] text-glow uppercase" data-reveal>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        data-reveal
        className={cn(
          'font-display leading-[0.9] uppercase',
          variant === 'clasica' ? 'text-5xl md:text-7xl lg:text-8xl' : 'text-5xl font-black md:text-7xl',
        )}
      >
        {title}
      </h2>
      {variant === 'neon' && <span className="led-bar mt-5 block h-[3px] w-24 origin-left rounded-full" data-led />}
      {intro && (
        <p className="mt-5 max-w-xl text-base text-muted md:text-lg" data-reveal>
          {intro}
        </p>
      )}
    </header>
  );
};
