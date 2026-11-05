import { business } from '../../data/business';
import { scheduleGroups } from '../../data/schedule';
import { whatsappLink } from '../../lib/whatsapp';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';
import { PrivacyNotice } from './PrivacyNotice';

export const Footer = () => (
  <footer className="band border-t border-line bg-bg pt-14 pb-28 text-ink">
    <div className="container-wb grid gap-10 md:grid-cols-3">
      <div>
        <Logo onDark className="w-40" />
        <p className="mt-4 max-w-xs text-sm text-muted">{business.tagline}</p>
      </div>
      <div>
        <h2 className="text-xs font-bold tracking-[0.25em] text-glow uppercase">Horario</h2>
        <ul className="mt-3 grid gap-1 text-sm">
          {scheduleGroups.map((group) => (
            <li key={group.label}>
              <span className="text-muted">{group.label}:</span> {group.hours}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xs font-bold tracking-[0.25em] text-glow uppercase">Contacto</h2>
        <ul className="mt-3 grid gap-2 text-sm">
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-glow">
              <Icon name="whatsapp" /> {business.whatsappDisplay}
            </a>
          </li>
          <li>
            <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-glow">
              <Icon name="instagram" /> {business.instagram.handle}
            </a>
          </li>
          <li>
            <a href={business.location.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-glow">
              <Icon name="pin" /> Turrialba, Costa Rica
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="container-wb mt-12 grid gap-2 border-t border-line pt-6 text-xs text-muted">
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <p>© {new Date().getFullYear()} {business.name}. Todos los derechos reservados.</p>
        <p>{business.slogan}.</p>
      </div>
      <PrivacyNotice />
    </div>
  </footer>
);
