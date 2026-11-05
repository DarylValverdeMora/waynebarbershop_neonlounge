import { useMemo, useState } from 'react';
import { categoryLabels, products, type ProductCategory } from '../../data/products';
import { useVariant } from '../../hooks/useVariant';
import { SectionHeading } from '../ui/SectionHeading';
import { cn } from '../ui/cn';
import { ProductCard } from './ProductCard';

type Filter = 'todo' | ProductCategory;

const filters: readonly Filter[] = ['todo', 'barba', 'cabello', 'accesorios'];

export const Shop = () => {
  const { variant } = useVariant();
  const [filter, setFilter] = useState<Filter>('todo');
  const visible = useMemo(
    () => (filter === 'todo' ? products : products.filter((product) => product.category === filter)),
    [filter],
  );

  return (
    <section
      id="shop"
      aria-labelledby="shop-title"
      className={cn(
        'band relative overflow-hidden bg-bg py-20 text-ink md:py-32',
        variant === 'clasica' && '[clip-path:polygon(0_3vw,100%_0,100%_calc(100%-3vw),0_100%)] py-28 md:py-40',
      )}
    >
      {variant === 'neon' && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgb(20_50_238/0.35),transparent_55%)]" />
      )}
      <div className="container-wb relative">
        <SectionHeading
          id="shop-title"
          index="02"
          eyebrow="Tienda"
          title={
            <>
              Wayne&apos;s <span className={variant === 'neon' ? 'neon-text' : 'text-script'}>Shop</span>
            </>
          }
          intro="Lo que usamos en la silla, para que lo tengás en casa. Elegí el tamaño y consultá disponibilidad por WhatsApp."
        />

        <div role="group" aria-label="Filtrar productos" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4">
          {filters.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={cn(
                'min-h-11 shrink-0 rounded-pill border px-5 text-sm font-bold tracking-wide uppercase transition-colors',
                filter === value ? 'border-glow bg-glow text-bg' : 'border-line text-muted hover:text-ink',
              )}
            >
              {value === 'todo' ? 'Todo' : categoryLabels[value]}
            </button>
          ))}
        </div>

        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} className="w-[82%] shrink-0 snap-start md:w-auto" />
          ))}
        </div>
        <p className="mt-6 text-sm text-muted md:hidden">Deslizá para ver más productos →</p>
      </div>
    </section>
  );
};
