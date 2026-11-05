import { useEffect, useState } from 'react';
import { useBooking } from '../../hooks/useBooking';
import { Icon } from '../ui/Icon';
import { cn } from '../ui/cn';

// Aparece después del hero y se esconde cuando el CTA final está en pantalla.
export const FloatingWhatsApp = () => {
  const action = useBooking();
  const [pastHero, setPastHero] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('inicio');
    const cta = document.getElementById('agendar-final');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) setPastHero(!entry.isIntersecting);
        if (entry.target === cta) setCtaVisible(entry.isIntersecting);
      });
    });
    if (hero) observer.observe(hero);
    if (cta) observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !ctaVisible;
  const isWalkIn = action.kind === 'walk-in';

  return (
    <a
      href={action.href}
      {...(action.kind === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={isWalkIn ? action.note : 'Agendar por WhatsApp'}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        'fixed right-4 bottom-4 z-30 inline-flex min-h-14 items-center gap-2 rounded-full bg-accent px-4 text-on-accent shadow-[0_0_30px_-4px_var(--wb-accent)] transition-[opacity,transform] duration-300 md:right-6 md:bottom-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      )}
    >
      <Icon name={isWalkIn ? 'pin' : 'whatsapp'} className="size-6" />
      <span className="text-sm font-bold">{isWalkIn ? 'Por orden de llegada' : 'Agendar'}</span>
    </a>
  );
};
