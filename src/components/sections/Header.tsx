import { useEffect, useState } from 'react';
import { BookingButton } from '../ui/BookingButton';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';
import { cn } from '../ui/cn';

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#shop', label: "Wayne's Shop" },
  { href: '#local', label: 'El local' },
  { href: '#horario', label: 'Horario' },
  { href: '#ubicacion', label: 'Ubicación' },
] as const;

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent',
      )}
    >
      <div className="container-wb flex h-16 items-center justify-between gap-4 md:h-20">
        <a href="#inicio" className="shrink-0" aria-label="Wayne's Barbershop, ir al inicio">
          <Logo className="w-28 md:w-36" />
        </a>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-semibold">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-muted transition-colors hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <BookingButton label="Agendar" className="min-h-10 px-4 py-2 text-xs md:min-h-12 md:px-6 md:text-sm" />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-pill border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-movil" aria-label="Menú" className="container-wb pb-6 lg:hidden">
          <ul className="grid gap-1 border-t border-line pt-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-between font-display text-3xl uppercase"
                >
                  {link.label}
                  <Icon name="arrow" className="size-5 text-glow" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
