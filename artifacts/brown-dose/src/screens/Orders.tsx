import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Package, Bike } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';

export function OrdersScreen() {
  const { orders, setActiveTab, clearCart, addToCart, setOrderFlowOpen } = useAppContext();

  const handleReorder = (order: any) => {
    clearCart();
    order.items.forEach((i: any) => {
      for(let k=0; k<i.quantity; k++) {
        addToCart(i.item);
      }
    });
    setOrderFlowOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-background pt-12 px-5 pb-32"
    >
      <h1 className="text-2xl font-bold mb-6">طلباتي</h1>
      
      <div className="flex flex-col gap-4">
        {orders.map((order, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={order.id}
            className="bg-card rounded-2xl p-5 border border-card-border"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  {order.type === 'delivery' ? <Bike size={18} /> : <Package size={18} />}
                </div>
                <div>
                  <div className="text-sm font-medium">طلب {order.id}</div>
                  <div className="text-xs text-muted-foreground mt-1">{order.date}</div>
                </div>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                order.status === 'تم التسليم' 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {order.status}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-muted-foreground mb-2">العناصر:</div>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm mb-1">
                  <span>{item.quantity}x {item.item.name}</span>
                  <span className="font-sans">{item.item.price * item.quantity} ر.س</span>
                </div>
              ))}
              <div className="border-t border-card-border mt-3 pt-3 flex justify-between font-bold">
                <span>الإجمالي</span>
                <span className="font-sans">{order.total} ر.س</span>
              </div>
            </div>

            <button
              onClick={() => handleReorder(order)}
              className="w-full py-3 rounded-xl bg-primary/10 text-primary font-medium flex items-center justify-center gap-2 text-sm"
            >
              <RefreshCw size={16} />
              إعادة الطلب
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
