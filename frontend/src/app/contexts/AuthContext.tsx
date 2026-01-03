import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as apiLogin, register as apiRegister } from "../../services/api";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  courtId: string;
  courtName: string;
  date: string;
  time: string;
  price: number;
  status: "confirmed" | "cancelled";
  bookedAt: string;
}

interface AuthContextType {
  user: User | null;
  bookings: Booking[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addBooking: (booking: Omit<Booking, "id" | "status" | "bookedAt">) => void;
  cancelBooking: (bookingId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load user and bookings from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("courtbook_user");
    const storedBookings = localStorage.getItem("courtbook_bookings");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("courtbook_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("courtbook_user");
    }
  }, [user]);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem("courtbook_bookings", JSON.stringify(bookings));
    }
  }, [bookings]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiLogin(email, password);
      setUser(response.user);
      localStorage.setItem("token", response.token);
      // For now, keep bookings local, but later can fetch from backend
      setBookings([]);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response = await apiRegister(email, password, name);
      setUser(response.user);
      localStorage.setItem("token", response.token);
      setBookings([]);
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
    localStorage.removeItem("courtbook_user");
    localStorage.removeItem("courtbook_bookings");
    localStorage.removeItem("token");
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);

    // Update in users list
    const users = JSON.parse(localStorage.getItem("courtbook_users") || "[]");
    const updatedUsers = users.map((u: any) =>
      u.id === user.id ? { ...u, ...data } : u
    );
    localStorage.setItem("courtbook_users", JSON.stringify(updatedUsers));
  };

  const addBooking = (bookingData: Omit<Booking, "id" | "status" | "bookedAt">) => {
    if (!user) return;

    const newBooking: Booking = {
      ...bookingData,
      id: `${user.id}_${Date.now()}`,
      status: "confirmed",
      bookedAt: new Date().toISOString(),
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);

    // Save to all bookings
    const allBookings = JSON.parse(localStorage.getItem("courtbook_all_bookings") || "[]");
    allBookings.push(newBooking);
    localStorage.setItem("courtbook_all_bookings", JSON.stringify(allBookings));
  };

  const cancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "cancelled" as const } : b
    );
    setBookings(updatedBookings);

    // Update in all bookings
    const allBookings = JSON.parse(localStorage.getItem("courtbook_all_bookings") || "[]");
    const updatedAllBookings = allBookings.map((b: Booking) =>
      b.id === bookingId ? { ...b, status: "cancelled" } : b
    );
    localStorage.setItem("courtbook_all_bookings", JSON.stringify(updatedAllBookings));
  };

  return (
    <AuthContext.Provider
      value={{ user, bookings, login, signup, logout, updateProfile, addBooking, cancelBooking }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
