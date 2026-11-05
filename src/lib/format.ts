const colonFormatter = new Intl.NumberFormat('es-CR', { maximumFractionDigits: 0, useGrouping: true });

// es-CR agrupa con espacio; el negocio escribe ₡6.450, así que usamos punto.
export const formatColones = (amount: number): string =>
  `₡${colonFormatter.format(amount).replace(/\s| | /g, '.')}`;
