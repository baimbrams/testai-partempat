export type BookingStep = 
  | 'greeting'
  | 'info' // general questioning
  | 'collect_name'
  | 'collect_pet'
  | 'collect_service'
  | 'collect_date'
  | 'collect_time'
  | 'confirm_ready'
  | 'done';

export interface BookingData {
  ownerName: string;
  petNameAndType: string;
  service: string;
  date: string;
  timeSlot: string; // Pagi (Morning) / Sore (Afternoon)
}

export const INITIAL_BOOKING_DATA: BookingData = {
  ownerName: '',
  petNameAndType: '',
  service: '',
  date: '',
  timeSlot: ''
};
