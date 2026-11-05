import type { ReactNode } from 'react';
import { cn } from './cn';
import { Icon } from './Icon';

type ButtonProps = {
  href: string;
  children: ReactNode;
  tone?: 'primary' | 'ghost' | 'whatsapp';
  icon?: 'whatsapp' | 'arrow' | 'pin' | 'instagram' | 'waze';
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

const tones = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover shadow-[0_0_24px_-6px_var(--wb-accent)]',
  whatsapp: 'bg-accent text-on-accent hover:bg-accent-hover shadow-[0_0_24px_-6px_var(--wb-accent)]',
  ghost: 'border border-line text-ink hover:border-glow hover:text-glow',
} as const;

export const Button = ({ href, children, tone = 'primary', icon, external, className, ariaLabel }: ButtonProps) => (
  <a
    href={href}
    aria-label={ariaLabel}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className={cn(
      'inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-6 py-3 text-sm font-bold tracking-wide uppercase transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]',
      tones[tone],
      className,
    )}
  >
    {icon && icon !== 'arrow' && <Icon name={icon} className="size-5 shrink-0" />}
    <span>{children}</span>
    {icon === 'arrow' && <Icon name="arrow" className="size-4 shrink-0" />}
  </a>
);
