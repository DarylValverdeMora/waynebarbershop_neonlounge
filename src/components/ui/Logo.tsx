import { images } from '../../data/images';
import { business } from '../../data/business';
import { useVariant } from '../../hooks/useVariant';
import { cn } from './cn';

export const Logo = ({ className, onDark }: { className?: string; onDark?: boolean }) => {
  const { variant } = useVariant();
  const useLight = onDark || variant === 'neon';
  return (
    <img
      src={useLight ? images.logoClaro : images.logoOscuro}
      alt={business.name}
      width={400}
      height={170}
      className={cn('h-auto select-none', className)}
      draggable={false}
    />
  );
};
