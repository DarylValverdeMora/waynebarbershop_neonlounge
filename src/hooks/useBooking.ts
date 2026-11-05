import { getBookingAction, type BookingAction } from '../lib/booking';
import { useNow } from './useNow';

export const useBooking = (serviceId?: string): BookingAction => getBookingAction({ serviceId, time: useNow() });
