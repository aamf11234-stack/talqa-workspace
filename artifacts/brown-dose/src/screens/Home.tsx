import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowLeft, Ticket, Store } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';
import specialtyImage from '@assets/generated_images/brown_dose_special.jpg';

export function HomeScreen() {
  const { points, setActiveTab } = useAppContext();
  const [animatedPoints, setAnimatedPoints] = useState(0);

  useEffect(() => {
    const controls = setTimeout(() => {
      setAnimatedPoints(points);
    }, 300);
    return () => clearTimeout(controls);
  }, [points]);

  const maxPoints = 500;
  const progress = Math.min((animatedPoints / maxPoints) * 100, 100);
  const circumference = 2 * Math.PI * 45; // r=45

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex-1 overflow-y-auto hide-scrollbar pt-12 pb-32 px-5"
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-xl text-muted-foreground font-light mb-1">مرحباً،</h1>
          <h2 className="text-2xl font-bold">سلطان 👋</h2>
        </div>
        <div className="flex items-center gap-1.5 bg-card/60 px-3 py-1.5 rounded-full border border-card-border">
          <Flame size={16} className="text-secondary" />
          <span className="text-xs font-medium text-secondary">١٢ يوم متواصل</span>
        </div>
      </div>

      {/* Loyalty Ring */}
      <div className="relative flex justify-center items-center py-6 mb-8">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke="hsl(var(--card))"
            strokeWidth="6"
          />
          <motion.circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold font-sans tracking-tighter">{animatedPoints}</span>
          <span className="text-xs text-muted-foreground mt-1">نقطة</span>
        </div>
        <div className="absolute -bottom-4 text-xs text-muted-foreground">
          باقي {maxPoints - points} نقطة للمكافأة القادمة
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('menu')}
          className="col-span-1 bg-primary text-primary-foreground rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-lg shadow-primary/20"
        >
          <ArrowLeft size={20} className="rotate-[135deg]" />
          <span className="text-sm font-medium">اطلب الآن</span>
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="col-span-1 bg-card rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-card-border"
        >
          <Ticket size={20} className="text-secondary" />
          <span className="text-sm font-medium">عروضي</span>
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="col-span-1 bg-card rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-card-border"
        >
          <Store size={20} className="text-muted-foreground" />
          <span className="text-sm font-medium">المتاجر</span>
        </motion.button>
      </div>

      {/* Featured Item */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">جديدنا</h3>
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="relative h-48 rounded-3xl overflow-hidden shadow-xl"
        >
          <img 
            src={specialtyImage} 
            alt="Specialty Coffee" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 right-4 left-4 flex justify-between items-end">
            <div>
              <div className="text-secondary text-xs font-medium mb-1">حصري</div>
              <h4 className="text-white font-bold text-lg">افقاتو براون ✦</h4>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveTab('menu'); }}
              className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white border border-white/20"
            >
              اطلبه الآن
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
