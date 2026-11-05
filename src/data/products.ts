import { images } from './images';

export type ProductOption = {
  label: string;
  detail?: string;
  price: number | null; // null = precio sin confirmar → "Consultá el precio"
  image?: string; // si la opción cambia la foto (ej. concentraciones)
};

export type ProductCategory = 'barba' | 'cabello' | 'accesorios';

export type Product = {
  id: string;
  name: string;
  brand?: string;
  category: ProductCategory;
  description: string;
  usage?: string;
  optionLabel?: string; // "Tamaño" por defecto
  healthNotice?: boolean;
  options: readonly [ProductOption, ...ProductOption[]];
  image: string;
  featured?: boolean;
};

export const categoryLabels: Record<ProductCategory, string> = {
  barba: 'Barba',
  cabello: 'Cabello',
  accesorios: 'Accesorios',
};

export const healthNoticeText =
  'Producto de uso tópico. Consultá con un profesional de salud antes de usarlo.';

// Copy tomado del catálogo de WhatsApp, sin promesas de resultados.
export const products: readonly Product[] = [
  {
    id: 'aceite-nishman',
    name: 'Aceite para barba Nishman',
    brand: 'Nishman',
    category: 'barba',
    description: 'Mezcla de aceites de argán, jojoba, almendra, girasol y oliva. Hidrata y da brillo.',
    options: [
      { label: '75 ml', detail: 'Uso profesional', price: 9950 },
      { label: '30 ml', detail: 'Para llevar', price: 6450 },
    ],
    image: images.aceiteNishman,
    featured: true,
  },
  {
    id: 'balsamo-coco',
    name: 'Bálsamo para barba Coco',
    brand: 'Tec.co',
    category: 'barba',
    description: 'Hidratación y fijación para la barba, con aroma a coco.',
    options: [
      { label: '100 ml', price: 9950 },
      { label: '50 ml', price: 6450 },
    ],
    image: images.balsamoCoco,
  },
  {
    // [PLACEHOLDER] confirmar si sigue a la venta (aparece en el catálogo, no en la lista del dueño)
    id: 'balsamo-sport',
    name: 'Bálsamo para barba Sport',
    brand: 'Tec.co',
    category: 'barba',
    description: 'Hidrata, fija y deja una fragancia masculina. Para el día a día, el gimnasio o el clima cálido.',
    options: [
      { label: '100 ml', price: 9950 },
      { label: '50 ml', price: 6450 },
    ],
    image: images.balsamoSport,
  },
  {
    id: 'aceite-tecco',
    name: 'Aceite para barba Tec.co',
    brand: 'Tec.co',
    category: 'barba',
    description: 'Aceite nutritivo para barba. Suaviza, hidrata y da brillo natural, con aroma fresco.',
    options: [
      // [PLACEHOLDER] precios por tamaño sin confirmar
      { label: '50 ml', detail: 'Spray', price: null },
      { label: '30 ml', detail: 'Gotero', price: null },
    ],
    image: images.aceiteTecco,
  },
  {
    // [PLACEHOLDER] confirmar si sigue a la venta y su tamaño
    id: 'aceite-menta',
    name: 'Aceite para barba Menta',
    category: 'barba',
    description: 'Hidratación con aroma fresco a menta. Suaviza y da brillo.',
    options: [{ label: 'Única', price: 9950 }],
    image: images.aceiteMenta,
  },
  {
    id: 'tonico-minoxidil',
    name: 'Tónico con minoxidil',
    category: 'cabello',
    description: 'Fórmula ligera para uso diario, con hamamelis, ortiga y keratina.',
    healthNotice: true,
    options: [{ label: 'Única', price: 9950 }],
    image: images.tonicoMinoxidil,
  },
  {
    // [PLACEHOLDER] confirmar si siguen a la venta y si el dueño quiere mostrarlos
    id: 'minoxidil',
    name: 'Minoxidil solución tópica',
    category: 'cabello',
    description: 'Disponible en tres concentraciones.',
    optionLabel: 'Concentración',
    healthNotice: true,
    options: [
      { label: '5 %', price: 9950, image: images.minoxidil5 },
      { label: '10 %', price: 18950, image: images.minoxidil10 },
      { label: '15 %', price: 18950, image: images.minoxidil15 },
    ],
    image: images.minoxidil5,
  },
  {
    id: 'dermaroller',
    name: 'Dermaroller',
    category: 'accesorios',
    description: 'Rodillo para tu rutina de cuidado.',
    usage: 'Usalo 2 o 3 veces por semana, con limpieza y cuidado.',
    options: [{ label: 'Única', price: 4950 }],
    image: images.dermaroller,
  },
];
