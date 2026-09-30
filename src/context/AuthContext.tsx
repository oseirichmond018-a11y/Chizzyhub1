import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types/auth';
import { CompletedOrder } from '../components/CheckoutModal';
import { MENU_ITEMS } from '../data/restaurantData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'chizzy_hub_auth_user';
const ORDERS_STORAGE_KEY = 'chizzy_hub_user_orders';

// Realistic sample past order for immediate demonstration of re-ordering
const INITIAL_SAMPLE_ORDER: CompletedOrder = {
  orderId: 'CHZ-4819',
  items: [
    {
      id: 'sample-reorder-1',
      menuItem: MENU_ITEMS[2], // Shawarma with Fries & Cheese (GH₵ 50)
      quantity: 2,
      spiceLevel: 'Extra Hot (Ghana Pepper)',
      selectedAddons: ['Extra Cheese'],
      specialInstructions: 'Toast extra crispy on the grill please!',
    },
    {
      id: 'sample-reorder-2',
      menuItem: MENU_ITEMS[4], // Loaded Fries Medium (GH₵ 85)
      quantity: 1,
      spiceLevel: 'Medium',
      selectedAddons: ['Extra Protein'],
    },
  ],
  fulfillment: 'delivery',
  deliveryZone: 'MADINA',
  customerName: 'Kwesi Appiah',
  phone: '0535977463',
  email: 'kwesi.appiah@student.upsa.edu.gh',
  address: 'UPSA Hostel C, Room 314',
  timeSlot: '1:00 PM – 2:00 PM',
  notes: 'Call on arrival at Hostel C',
  subtotal: 185,
  deliveryFee: 10,
  total: 195,
  paymentMethod: 'momo',
  momoProvider: 'MTN MoMo',
  momoNumber: '0535977463',
  timestamp: 'Yesterday at 2:15 PM',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState<CompletedOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return [INITIAL_SAMPLE_ORDER];
    } catch {
      return [INITIAL_SAMPLE_ORDER];
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const login = async (emailOrPhone: string, _password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 350));

    let existingUsers: Record<string, User> = {};
    try {
      existingUsers = JSON.parse(localStorage.getItem('chizzy_hub_registered_users') || '{}');
    } catch {
      existingUsers = {};
    }

    const matched = Object.values(existingUsers).find(
      (u) => u.email.toLowerCase() === emailOrPhone.toLowerCase() || u.phone === emailOrPhone
    );

    if (matched) {
      setUser(matched);
      return true;
    }

    // Default friendly login
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: emailOrPhone.includes('kwesi') ? 'Kwesi Appiah' : emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Chizzy Lover',
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@student.upsa.edu.gh`,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : '0535977463',
      hostelAddress: 'UPSA Hostel C, Room 314',
      createdAt: new Date().toLocaleDateString(),
    };

    setUser(newUser);
    return true;
  };

  const signup = async (
    userData: Omit<User, 'id' | 'createdAt'>,
    _password: string
  ): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 350));

    const newUser: User = {
      ...userData,
      id: `usr_${Date.now()}`,
      createdAt: new Date().toLocaleDateString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('chizzy_hub_registered_users') || '{}');
      existing[newUser.id] = newUser;
      localStorage.setItem('chizzy_hub_registered_users', JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }

    setUser(newUser);
    return true;
  };

  const loginWithSocial = async (
    provider: 'google' | 'apple',
    customData?: { name?: string; email?: string; phone?: string; hostelAddress?: string }
  ): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const socialUser: User = {
      id: `${provider}_${Date.now()}`,
      name: customData?.name || (provider === 'google' ? 'Kwesi Mensah' : 'Ama Serwaa'),
      email: customData?.email || (provider === 'google' ? 'kwesi.mensah@gmail.com' : 'ama.serwaa@privaterelay.appleid.com'),
      phone: customData?.phone || '0535977463',
      hostelAddress: customData?.hostelAddress || 'UPSA Hostel C, Room 314',
      createdAt: new Date().toLocaleDateString(),
      provider,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('chizzy_hub_registered_users') || '{}');
      existing[socialUser.id] = socialUser;
      localStorage.setItem('chizzy_hub_registered_users', JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }

    setUser(socialUser);
    return socialUser;
  };

  const logout = () => {
    setUser(null);
  };

  const addOrderToHistory = (order: CompletedOrder) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        orders,
        login,
        signup,
        loginWithSocial,
        logout,
        addOrderToHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
