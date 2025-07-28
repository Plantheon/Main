export interface Booking {
  id: string;
  garden: string;
  type: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  cost: number;
  image: string;
  paymentType: 'subscription' | 'one-time'; // Added field
}

export interface PaymentMethod {
  id: string;
  type: string;
  details: string;
  isDefault: boolean;
}

export interface PaymentHistoryItem {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: string;
  receipt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  image?: string;
  phone?: string;
  address?: string;
}

export interface UserData {
  bookings: Booking[];
  paymentMethods: PaymentMethod[];
  paymentHistory: PaymentHistoryItem[];
  profile: UserProfile;
}

const getUserKey = (email: string) => `userData:${email}`;

export function loadUserData(email: string): UserData | null {
  const raw = localStorage.getItem(getUserKey(email));
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveUserData(email: string, data: UserData) {
  localStorage.setItem(getUserKey(email), JSON.stringify(data));
}

export function clearUserData(email: string) {
  localStorage.removeItem(getUserKey(email));
} 