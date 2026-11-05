export type Barber = { id: string; name: string; specialty: string; photo: string | null; instagram?: string };

// [PLACEHOLDER] nombres, especialidades y fotos del equipo. Sin datos reales todavía.
export const team: readonly Barber[] = [
  { id: 'barbero-1', name: 'Barbero 1', specialty: 'Especialidad', photo: null },
  { id: 'barbero-2', name: 'Barbero 2', specialty: 'Especialidad', photo: null },
  { id: 'barbero-3', name: 'Barbero 3', specialty: 'Especialidad', photo: null },
];
