export const business = {
  name: "Wayne's Barbershop",
  shortName: "Wayne's",
  slogan: 'Elige calidad',
  city: 'Turrialba',
  yearsOpen: 12,
  // [PLACEHOLDER] año de apertura por confirmar con el dueño
  foundedYear: null as number | null,
  tagline: 'Somos la mejor barbería de Turrialba. ¡Abrimos todos los días!',
  // [PLACEHOLDER] confirmar número (coincide con el link de la bio de Instagram)
  whatsappNumber: '50686694021',
  whatsappDisplay: '+506 8669 4021',
  instagram: {
    handle: '@waynesbarbershop_',
    url: 'https://www.instagram.com/waynesbarbershop_/',
    reviewsHighlightUrl: 'https://www.instagram.com/waynesbarbershop_/',
  },
  location: {
    lat: 9.903290245590462,
    lng: -83.68498597480604,
    mapsUrl: 'https://maps.app.goo.gl/NxNd3vT6FSmvLSSU8',
    // [PLACEHOLDER] dirección con señas
    address: '[PLACEHOLDER] Dirección con señas, Turrialba, Cartago',
  },
  messages: {
    general: "Hola Wayne's, quiero agendar una cita. ¿Qué espacios tienen disponibles?",
  },
} as const;
