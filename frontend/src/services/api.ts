const API = import.meta.env.VITE_API_URL;

export interface Slot {
  _id: string;
  time: string;
  courtId: string;
  date: string;
  isBooked: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

export const register = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

export const getSlots = async (courtId: string, date: string): Promise<Slot[]> => {
  const res = await fetch(`${API}/booking/slots?courtId=${courtId}&date=${date}`);
  if (!res.ok) throw new Error('Failed to fetch slots');
  return res.json();
};

export const bookSlot = async (slotId: string, token: string): Promise<any> => {
  const res = await fetch(`${API}/booking/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ slotId }),
  });
  if (!res.ok) throw new Error('Failed to book slot');
  return res.json();
};
