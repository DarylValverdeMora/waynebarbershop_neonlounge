import { useEffect } from 'react';
import { useVariant, variantInfo, type Variant } from '../hooks/useVariant';
import { cn } from '../components/ui/cn';

const order: readonly Variant[] = ['neon', 'clasica'];

// Solo existe con ?present=1. Teclas 1 y 2 cambian de versión.
export const PresentPanel = () => {
  const { variant, setVariant, isPresenting } = useVariant();

  useEffect(() => {
    if (!isPresenting) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      const next = order[Number(event.key) - 1];
      if (next) setVariant(next);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPresenting, setVariant]);

  if (!isPresenting) return null;

  return (
    <aside
      aria-label="Versión del diseño"
      className="fixed bottom-4 left-4 z-50 flex md:top-24 md:right-6 md:bottom-auto md:left-auto items-center gap-1 rounded-full border border-white/15 bg-[#0a0a0d]/90 p-1 font-[Manrope_Variable,system-ui] text-white shadow-2xl backdrop-blur-md md:bottom-6"
    >
      <span className="hidden px-3 text-[11px] font-bold tracking-widest text-white/60 uppercase sm:inline">Versión</span>
      {order.map((option, index) => (
        <button
          key={option}
          type="button"
          aria-pressed={variant === option}
          onClick={() => setVariant(option)}
          className={cn(
            'min-h-10 rounded-full px-4 text-sm font-bold transition-colors',
            variant === option ? 'bg-[#1432ee] text-white' : 'text-white/70 hover:text-white',
          )}
          title={`Tecla ${index + 1}`}
        >
          {variantInfo[option].short}
          <span className="hidden sm:inline"> · {variantInfo[option].name}</span>
        </button>
      ))}
    </aside>
  );
};
