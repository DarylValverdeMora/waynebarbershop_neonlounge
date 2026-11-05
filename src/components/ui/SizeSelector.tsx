import type { ProductOption } from '../../data/products';
import { cn } from './cn';

type SizeSelectorProps = {
  name: string;
  legend: string;
  options: readonly ProductOption[];
  selected: number;
  onSelect: (index: number) => void;
};

export const SizeSelector = ({ name, legend, options, selected, onSelect }: SizeSelectorProps) => (
  <fieldset>
    <legend className="mb-2 text-xs font-bold tracking-widest text-muted uppercase">{legend}</legend>
    <div className="flex flex-wrap gap-2">
      {options.map((option, index) => (
        <label
          key={option.label}
          className={cn(
            'relative cursor-pointer rounded-pill border px-3 py-2 text-sm transition-colors duration-200 has-focus-visible:outline-2 has-focus-visible:outline-glow',
            index === selected ? 'border-glow bg-glow/10 text-ink' : 'border-line text-muted hover:border-glow/60',
          )}
        >
          <input
            type="radio"
            name={name}
            value={index}
            checked={index === selected}
            onChange={() => onSelect(index)}
            className="sr-only"
          />
          <span className="font-bold">{option.label}</span>
          {option.detail && <span className="ml-1 text-xs opacity-80">· {option.detail}</span>}
        </label>
      ))}
    </div>
  </fieldset>
);
