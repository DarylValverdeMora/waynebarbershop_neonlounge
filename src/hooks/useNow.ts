import { useEffect, useState } from 'react';
import { costaRicaTime, type LocalTime } from '../lib/hours';

// Hora de Costa Rica, refrescada cada minuto.
export const useNow = (): LocalTime => {
  const [time, setTime] = useState(costaRicaTime);
  useEffect(() => {
    const id = window.setInterval(() => setTime(costaRicaTime()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
};
