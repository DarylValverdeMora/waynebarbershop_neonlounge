import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './Icon';
import { cn } from './cn';

type CarouselProps = { label: string; children: ReactNode; className?: string };

// Carrusel con deslizar táctil y flechas. Nunca toma el scroll vertical de la página.
export const Carousel = ({ label, children, className }: CarouselProps) => {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const element = track.current;
    if (!element) return;
    setEdges({
      start: element.scrollLeft <= 4,
      end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges]);

  const move = (direction: 1 | -1) => {
    const element = track.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <div className={cn('relative', className)}>
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={updateEdges}
        data-lenis-prevent-horizontal
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth scroll-px-4 px-4 md:scroll-px-8 md:px-8"
      >
        {children}
      </div>
      <div className="container-wb mt-5 flex justify-end gap-2">
        {([-1, 1] as const).map((direction) => (
          <button
            key={direction}
            type="button"
            onClick={() => move(direction)}
            disabled={direction === -1 ? edges.start : edges.end}
            aria-label={direction === -1 ? 'Foto anterior' : 'Foto siguiente'}
            className="grid size-12 place-items-center rounded-pill border border-line transition-[border-color,color,opacity] hover:border-glow hover:text-glow disabled:pointer-events-none disabled:opacity-30"
          >
            <Icon name="arrow" className={cn('size-5', direction === -1 && 'rotate-180')} />
          </button>
        ))}
      </div>
    </div>
  );
};
