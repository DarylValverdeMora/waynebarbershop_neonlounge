import { images } from './images';

export type GalleryItem = { src: string; alt: string; caption: string; kind: 'local' | 'corte' };

// Fotos de menores: Daryl confirmó que hay autorización de los padres (4 nov. 2026).
export const localPhotos: readonly GalleryItem[] = [
  { src: images.localSillas, alt: 'Fila de sillas de barbero de cuero negro bajo luces LED azules', caption: 'Sillas de cuero, navaja y buena luz', kind: 'local' },
  { src: images.localLounge, alt: 'Zona lounge con sofás reclinables, plantas y TV con consola', caption: 'Lounge con sofás reclinables y consola', kind: 'local' },
  { src: images.localFutbolin, alt: 'Futbolín iluminado con LED azul en la sala de espera', caption: 'Futbolín para la espera', kind: 'local' },
  { src: images.localNeon, alt: "Rótulo de neón con el logo de Wayne's Barber Shop sobre pared oscura", caption: 'El rótulo de la casa', kind: 'local' },
];

export const cutPhotos: readonly GalleryItem[] = [
  { src: images.corteDisenoNuca, alt: 'Corte con degradado y diseño a navaja en la nuca', caption: 'Diseño a navaja', kind: 'corte' },
  { src: images.corteCalidad, alt: 'Corte texturizado con degradado, frente al neón "Calidad"', caption: 'Degradado texturizado', kind: 'corte' },
  { src: images.corteRizos1, alt: 'Corte de rizos con degradado bajo, vista lateral', caption: 'Rizos con degradado', kind: 'corte' },
  { src: images.corteRizos2, alt: 'Corte de rizos con degradado y contorno marcado', caption: 'Contorno marcado', kind: 'corte' },
];
