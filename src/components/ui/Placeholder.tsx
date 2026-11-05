import type { ReactNode } from 'react';

// Marca visible de dato pendiente en el prototipo.
export const PlaceholderTag = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-1 rounded-sm border border-dashed border-glow/60 px-2 py-0.5 font-mono text-[11px] tracking-wide text-glow uppercase">
    [PLACEHOLDER] {children}
  </span>
);
