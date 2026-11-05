import { business } from '../data/business';

export const whatsappLink = (message: string = business.messages.general): string =>
  `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
