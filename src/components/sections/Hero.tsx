import { useVariant } from '../../hooks/useVariant';
import { HeroClasica } from '../../variants/clasica/HeroClasica';
import { HeroNeon } from '../../variants/neon/HeroNeon';

export const Hero = () => (useVariant().variant === 'clasica' ? <HeroClasica /> : <HeroNeon />);
