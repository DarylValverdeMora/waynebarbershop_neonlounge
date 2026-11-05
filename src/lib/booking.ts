// Única puerta para "agendar". Cuando exista el sistema de citas propio,
// se agrega el caso 'internal' acá y ninguna sección cambia.
import { business } from '../data/business';
import { services } from '../data/services';
import { formatColones } from './format';
import { costaRicaTime, formatHour, openStatus, scheduleFor, type LocalTime } from './hours';
import { whatsappLink } from './whatsapp';

export type BookingAction =
  | { kind: 'whatsapp'; href: string; label: string }
  | { kind: 'walk-in'; href: string; label: string; note: string }
  | { kind: 'internal'; href: string; label: string };

type BookingMode = 'whatsapp' | 'internal';

const bookingMode = (): BookingMode => (import.meta.env.VITE_BOOKING_MODE === 'internal' ? 'internal' : 'whatsapp');

const bookingMessage = (serviceId?: string): string => {
  const service = services.find((entry) => entry.id === serviceId);
  if (!service) return business.messages.general;
  return `Hola Wayne's, quiero agendar: ${service.name} (${formatColones(service.price)}). ¿Qué espacios tienen disponibles?`;
};

export const getBookingAction = ({
  serviceId,
  time = costaRicaTime(),
}: { serviceId?: string; time?: LocalTime } = {}): BookingAction => {
  const today = scheduleFor(time.day);
  const status = openStatus(time);
  const isWalkInDay = !today.acceptsAppointments && status.kind !== 'closed';

  if (isWalkInDay) {
    return {
      kind: 'walk-in',
      href: '#ubicacion',
      label: 'Hoy: por orden de llegada',
      note: `Los ${today.name.toLowerCase()}s atendemos por orden de llegada, de ${formatHour(today.opensAt)} a ${formatHour(today.closesAt)}. No se reservan citas.`,
    };
  }

  if (bookingMode() === 'internal') {
    // [PLACEHOLDER] ruta del sistema de citas propio
    return { kind: 'internal', href: `#agendar${serviceId ? `?servicio=${serviceId}` : ''}`, label: 'Agendar cita' };
  }

  return { kind: 'whatsapp', href: whatsappLink(bookingMessage(serviceId)), label: 'Agendar por WhatsApp' };
};
