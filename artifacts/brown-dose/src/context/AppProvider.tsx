import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '../data/menu';

export type TabType = 'home' | 'menu' | 'orders' | 'card';
export type OrderFlowStep = 'type' | 'cart' | 'payment' | 'success';
export type OrderType = 'pickup' | 'delivery';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface PastOrder {
  id: string;
  items: CartItem[];
  type: OrderType;
  date: string;
  status: 'تم التسليم' | 'قيد التحضير';
  total: number;
}

interface AppContextState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  orders: PastOrder[];
  addOrder: (order: PastOrder) => void;
  points: number;
  addPoints: (amount: number) => void;
  isOrderFlowOpen: boolean;
  setOrderFlowOpen: (isOpen: boolean) => void;
  orderFlowStep: OrderFlowStep;
  setOrderFlowStep: (step: OrderFlowStep) => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  businessName: string;
  setBusinessName: (name: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  cityName: string;
  setCityName: (name: string) => void;
}

const AppContext = createContext<AppContextState | undefined>(undefined);

export function AppProvider({
  children,
  businessName: initialBusiness = 'نشاطك',
  userName: initialUser = 'عميل مميز',
  cityName: initialCity = 'الرياض',
}: {
  children: ReactNode;
  businessName?: string;
  userName?: string;
  cityName?: string;
}) {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [points, setPoints] = useState(340);
  const [businessName, setBusinessName] = useState(initialBusiness);
  const [userName, setUserName] = useState(initialUser);
  const [cityName, setCityName] = useState(initialCity);

  const [isOrderFlowOpen, setOrderFlowOpen] = useState(false);
  const [orderFlowStep, setOrderFlowStep] = useState<OrderFlowStep>('type');
  const [orderType, setOrderType] = useState<OrderType>('pickup');

  const [orders, setOrders] = useState<PastOrder[]>([
    {
      id: 'ORD-8492',
      items: [{ item: { id: 'c8', name: 'ايس ستريتشر', price: 19, category: 'cold' }, quantity: 1 }],
      type: 'pickup',
      date: 'اليوم، ٠٩:٣٠ ص',
      status: 'تم التسليم',
      total: 19,
    },
    {
      id: 'ORD-7381',
      items: [
        { item: { id: 'h7', name: 'فلات وايت', price: 16, category: 'hot' }, quantity: 1 },
        { item: { id: 'h11', name: 'بستاشيو لاتيه', price: 20, category: 'hot' }, quantity: 1 },
      ],
      type: 'delivery',
      date: 'أمس، ٠٤:١٥ م',
      status: 'تم التسليم',
      total: 41,
    },
  ]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev.map(i => i.item.id === itemId ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
          .filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);
  const addOrder = (order: PastOrder) => setOrders(prev => [order, ...prev]);
  const addPoints = (amount: number) => setPoints(prev => prev + amount);

  return (
    <AppContext.Provider value={{
      activeTab, setActiveTab,
      cart, addToCart, updateQuantity, clearCart,
      orders, addOrder,
      points, addPoints,
      isOrderFlowOpen, setOrderFlowOpen,
      orderFlowStep, setOrderFlowStep,
      orderType, setOrderType,
      businessName, setBusinessName,
      userName, setUserName,
      cityName, setCityName,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};
