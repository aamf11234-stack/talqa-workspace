import React, { createContext, useContext, useState } from 'react';

export interface CompletedOrder {
  id: string;
  itemName: string;
  itemEmoji: string;
  totalPrice: number;   // with 15% VAT
  basePrice: number;
  orderType: 'dine' | 'delivery';
  payMethod: 'apple' | 'stc' | 'card';
  pts: number;
  timestamp: Date;
}

interface OrdersCtx {
  orders: CompletedOrder[];
  addOrder: (o: Omit<CompletedOrder, 'id'>) => void;
}

const Ctx = createContext<OrdersCtx>({ orders: [], addOrder: () => {} });

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<CompletedOrder[]>([]);
  function addOrder(o: Omit<CompletedOrder, 'id'>) {
    const id = `INV-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrders(prev => [{ ...o, id }, ...prev]);
  }
  return <Ctx.Provider value={{ orders, addOrder }}>{children}</Ctx.Provider>;
}

export const useOrders = () => useContext(Ctx);
