import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';
import { menuItems, MenuItem } from '../data/menu';

export function MenuScreen() {
  const [activeCategory, setActiveCategory] = useState<'hot' | 'cold' | 'filter'>('hot');
  const { cart, addToCart, setOrderFlowOpen } = useAppContext();

  const categories = [
    { id: 'hot', label: '☕ حار' },
    { id: 'cold', label: '🧊 بارد' },
    { id: 'filter', label: '💧 مقطرة' },
  ] as const;

  const currentItems = menuItems.filter(item => item.category === activeCategory);
  
  const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-background"
    >
      <div className="pt-12 px-5 pb-4">
        <h1 className="text-2xl font-bold mb-6">المنيو</h1>
        
        {/* Category Tabs */}
        <div className="flex bg-card rounded-full p-1.5 border border-card-border relative">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-1 relative z-10 py-2.5 text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-muted-foreground'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="category-tab"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Item List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-32">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {currentItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-card/50 rounded-2xl p-4 flex justify-between items-center border border-card-border"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[15px]">{item.name}</h3>
                    {(item.isSignature || item.isFeatured) && (
                      <span className="text-secondary text-xs">✦</span>
                    )}
                  </div>
                  <div className="text-muted-foreground text-sm font-sans flex items-center gap-2">
                    <span>{item.price} ر.س</span>
                    {item.type && (
                      <span className="text-[10px] bg-card-border px-2 py-0.5 rounded-sm">
                        {item.type === 'hot' ? 'حار' : 'بارد'}
                      </span>
                    )}
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => addToCart(item)}
                  className="w-10 h-10 rounded-full bg-primary/10 text-primary flex justify-center items-center"
                >
                  <Plus size={20} />
                </motion.button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cartTotal > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-28 inset-x-5 z-40"
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setOrderFlowOpen(true)}
              className="w-full bg-primary text-primary-foreground p-4 rounded-2xl flex justify-between items-center shadow-xl shadow-primary/20"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {cartTotal}
                </div>
                <span className="font-bold">مراجعة الطلب</span>
              </div>
              <ShoppingBag size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
