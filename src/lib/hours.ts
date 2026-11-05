import { schedule, type DayIndex, type DaySchedule } from '../data/schedule';

const TIME_ZONE = 'America/Costa_Rica';
const WEEKDAYS: Record<string, DayIndex> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export type LocalTime = { day: DayIndex; minutes: number };

export const costaRicaTime = (now: Date = new Date()): LocalTime => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  return { day: WEEKDAYS[get('weekday')] ?? 1, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
};

const toMinutes = (hhmm: string): number => {
  const [hours = 0, minutes = 0] = hhmm.split(':').map(Number);
  return hours * 60 + minutes;
};

export const formatHour = (hhmm: string): string => {
  const total = toMinutes(hhmm);
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  const suffix = hours >= 12 ? 'p.m.' : 'a.m.';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return minutes === 0 ? `${hour12}:00 ${suffix}` : `${hour12}:${String(minutes).padStart(2, '0')} ${suffix}`;
};

export const scheduleFor = (day: DayIndex): DaySchedule => {
  const found = schedule.find((entry) => entry.day === day);
  if (!found) throw new Error(`Falta el horario del día ${day}`);
  return found;
};

export type OpenStatus =
  | { kind: 'open'; today: DaySchedule; closesAt: string }
  | { kind: 'before-open'; today: DaySchedule; opensAt: string }
  | { kind: 'closed'; next: DaySchedule };

export const openStatus = (time: LocalTime = costaRicaTime()): OpenStatus => {
  const today = scheduleFor(time.day);
  if (time.minutes < toMinutes(today.opensAt)) return { kind: 'before-open', today, opensAt: today.opensAt };
  if (time.minutes < toMinutes(today.closesAt)) return { kind: 'open', today, closesAt: today.closesAt };
  const nextDay = ((time.day + 1) % 7) as DayIndex;
  return { kind: 'closed', next: scheduleFor(nextDay) };
};

export const describeStatus = (status: OpenStatus): string => {
  switch (status.kind) {
    case 'open':
      return `Abierto ahora · cerramos a las ${formatHour(status.closesAt)}`;
    case 'before-open':
      return `Hoy abrimos a las ${formatHour(status.opensAt)}`;
    case 'closed':
      return `Cerrado · ${status.next.name.toLowerCase()} abrimos a las ${formatHour(status.next.opensAt)}`;
  }
};
