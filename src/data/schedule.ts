// 0 = domingo … 6 = sábado (igual que Date.getDay()).
export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DaySchedule = {
  day: DayIndex;
  name: string;
  opensAt: string; // HH:mm, hora de Costa Rica
  closesAt: string;
  acceptsAppointments: boolean;
};

export const schedule: readonly DaySchedule[] = [
  { day: 1, name: 'Lunes', opensAt: '09:00', closesAt: '19:00', acceptsAppointments: true },
  { day: 2, name: 'Martes', opensAt: '09:00', closesAt: '19:00', acceptsAppointments: true },
  { day: 3, name: 'Miércoles', opensAt: '09:00', closesAt: '19:00', acceptsAppointments: true },
  { day: 4, name: 'Jueves', opensAt: '09:00', closesAt: '19:00', acceptsAppointments: true },
  { day: 5, name: 'Viernes', opensAt: '09:00', closesAt: '19:00', acceptsAppointments: true },
  { day: 6, name: 'Sábado', opensAt: '09:00', closesAt: '18:00', acceptsAppointments: true },
  { day: 0, name: 'Domingo', opensAt: '09:00', closesAt: '14:00', acceptsAppointments: false },
];

// Cómo se muestra agrupado, igual que el flyer del local.
export const scheduleGroups = [
  { label: 'Lunes a viernes', days: [1, 2, 3, 4, 5], hours: '9:00 a.m. – 7:00 p.m.', note: null },
  { label: 'Sábado', days: [6], hours: '9:00 a.m. – 6:00 p.m.', note: null },
  {
    label: 'Domingo',
    days: [0],
    hours: '9:00 a.m. – 2:00 p.m.',
    note: 'Por orden de llegada. Los domingos no se reservan citas.',
  },
] as const satisfies readonly { label: string; days: readonly DayIndex[]; hours: string; note: string | null }[];
