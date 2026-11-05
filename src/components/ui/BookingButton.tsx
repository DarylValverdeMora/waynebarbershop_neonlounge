import { useBooking } from '../../hooks/useBooking';
import { Button } from './Button';

type BookingButtonProps = { serviceId?: string; label?: string; ariaLabel?: string; className?: string; tone?: 'primary' | 'ghost' };

export const BookingButton = ({ serviceId, label, ariaLabel, className, tone = 'primary' }: BookingButtonProps) => {
  const action = useBooking(serviceId);
  switch (action.kind) {
    case 'whatsapp':
      return (
        <Button href={action.href} icon="whatsapp" external tone={tone} className={className} ariaLabel={ariaLabel}>
          {label ?? action.label}
        </Button>
      );
    case 'walk-in':
      return (
        <Button href={action.href} icon="pin" tone={tone} className={className} ariaLabel={action.note}>
          {action.label}
        </Button>
      );
    case 'internal':
      return (
        <Button href={action.href} icon="arrow" tone={tone} className={className} ariaLabel={ariaLabel}>
          {label ?? action.label}
        </Button>
      );
  }
};
