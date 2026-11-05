export type Service = {
  id: string;
  name: string;
  price: number;
  description: string;
  includes?: readonly string[];
  featured?: boolean;
  // [PLACEHOLDER] duración en minutos, para el sistema de citas futuro
  durationMin?: number;
};

export const services: readonly Service[] = [
  {
    id: 'corte',
    name: 'Corte',
    price: 6450,
    description: 'Corte de cabello a tu gusto.',
    includes: ['Lavado de cabello', 'Delineado de cejas', 'Peinado con producto al gusto'],
    featured: true,
  },
  {
    id: 'contorno-barba',
    name: 'Contorno y barba',
    price: 4950,
    description: 'Marcado del contorno del corte con navaja y arreglo de barba.',
  },
  {
    id: 'solo-contorno',
    name: 'Solo contorno',
    price: 3950,
    description: 'Delineado con navaja del contorno. Ideal para refrescar el corte sin recortarlo todo.',
  },
  {
    id: 'solo-barba',
    name: 'Solo barba',
    price: 3950,
    description: 'Arreglo y delineado de barba.',
  },
  {
    id: 'solo-cejas',
    name: 'Solo cejas',
    price: 2450,
    description: 'Delineado con navaja, para damas y caballeros. En corte y corte con barba van incluidas.',
  },
];
