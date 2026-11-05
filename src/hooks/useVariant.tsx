import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Variant = 'neon' | 'clasica';

export const variantInfo: Record<Variant, { key: 'a' | 'b'; name: string; short: string }> = {
  neon: { key: 'a', name: 'Neón Lounge', short: 'A' },
  clasica: { key: 'b', name: 'Clásica premium', short: 'B' },
};

// La versión por defecto la fija la build (VITE_DEFAULT_VARIANT → <html data-variant>); ?v=a|b la cambia.
const buildDefault = (): Variant => (document.documentElement.dataset.variant === 'clasica' ? 'clasica' : 'neon');

const fromParam = (value: string | null): Variant => {
  if (value === 'a') return 'neon';
  if (value === 'b') return 'clasica';
  return buildDefault();
};

type VariantContextValue = { variant: Variant; setVariant: (variant: Variant) => void; isPresenting: boolean };

const VariantContext = createContext<VariantContextValue | null>(null);

export const VariantProvider = ({ children }: { children: ReactNode }) => {
  const params = new URLSearchParams(window.location.search);
  const [variant, setVariantState] = useState<Variant>(() => fromParam(params.get('v')));
  const isPresenting = params.get('present') === '1';

  useEffect(() => {
    document.documentElement.dataset.variant = variant;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', variant === 'neon' ? '#0A0A0D' : '#F2F0EB');
  }, [variant]);

  const setVariant = useCallback((next: Variant) => {
    setVariantState(next);
    const url = new URL(window.location.href);
    url.searchParams.set('v', variantInfo[next].key);
    window.history.replaceState(null, '', url);
  }, []);

  const value = useMemo(() => ({ variant, setVariant, isPresenting }), [variant, setVariant, isPresenting]);
  return <VariantContext.Provider value={value}>{children}</VariantContext.Provider>;
};

export const useVariant = (): VariantContextValue => {
  const context = useContext(VariantContext);
  if (!context) throw new Error('useVariant necesita <VariantProvider>');
  return context;
};
