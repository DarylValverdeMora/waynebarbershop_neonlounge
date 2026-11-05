import { useState } from 'react';
import { healthNoticeText, type Product } from '../../data/products';
import { formatColones } from '../../lib/format';
import { whatsappLink } from '../../lib/whatsapp';
import { Button } from '../ui/Button';
import { SizeSelector } from '../ui/SizeSelector';
import { cn } from '../ui/cn';

const productMessage = (product: Product, optionIndex: number): string => {
  const option = product.options[optionIndex] ?? product.options[0];
  const single = product.options.length === 1;
  const detail = single ? '' : ` de ${option.label}${option.detail ? ` (${option.detail.toLowerCase()})` : ''}`;
  const price = option.price === null ? '' : ` por ${formatColones(option.price)}`;
  return `Hola Wayne's, me interesa el ${product.name}${detail}${price}. ¿Lo tienen disponible?`;
};

export const ProductCard = ({ product, className }: { product: Product; className?: string }) => {
  const [selected, setSelected] = useState(0);
  const option = product.options[selected] ?? product.options[0];
  const hasChoice = product.options.length > 1;

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-glow/60 hover:shadow-[0_0_40px_-12px_var(--wb-glow)]',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <img
          src={option.image ?? product.image}
          alt={`${product.name}${hasChoice ? ` ${option.label}` : ''}`}
          width={440}
          height={330}
          loading="lazy"
          className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {product.brand && (
          <span className="absolute top-3 left-3 rounded-pill bg-bg/80 px-3 py-1 text-[11px] font-bold tracking-widest uppercase backdrop-blur">
            {product.brand}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div>
          <h3 className="font-display text-2xl leading-tight uppercase md:text-3xl">{product.name}</h3>
          <p className="mt-2 text-sm text-muted">{product.description}</p>
          {product.usage && <p className="mt-2 text-sm text-muted">{product.usage}</p>}
        </div>
        {hasChoice && (
          <SizeSelector
            name={`opcion-${product.id}`}
            legend={product.optionLabel ?? 'Tamaño'}
            options={product.options}
            selected={selected}
            onSelect={setSelected}
          />
        )}
        <div className="mt-auto flex flex-col gap-4">
          <p className="font-display text-3xl tabular" aria-live="polite">
            {option.price === null ? <span className="text-xl text-muted">Consultá el precio</span> : formatColones(option.price)}
          </p>
          {product.healthNotice && <p className="text-xs text-muted">{healthNoticeText}</p>}
          <Button href={whatsappLink(productMessage(product, selected))} icon="whatsapp" external tone="ghost" className="w-full" ariaLabel={`Consultar por WhatsApp: ${product.name}`}>
            Consultar por WhatsApp
          </Button>
        </div>
      </div>
    </article>
  );
};
