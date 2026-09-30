import { CompletedOrder } from '../components/CheckoutModal';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  hostelAddress: string;
  createdAt: string;
  provider?: 'email' | 'google' | 'apple';
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  orders: CompletedOrder[];
  login: (emailOrPhone: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'createdAt'>, password: string) => Promise<boolean>;
  loginWithSocial: (provider: 'google' | 'apple', customData?: { name?: string; email?: string; phone?: string; hostelAddress?: string }) => Promise<User>;
  logout: () => void;
  addOrderToHistory: (order: CompletedOrder) => void;
}
