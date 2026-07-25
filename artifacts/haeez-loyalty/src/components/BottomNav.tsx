import React from 'react';
import { Home, CreditCard, BookOpen, ShoppingBag, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'home' | 'menu' | 'card' | 'orders' | 'reservations';

interface BottomNavProps {
  activeTab: Tab;
  onChangeTab: (tab: Tab) => void;
  notifCount?: number;
}

const tabs: { id: Tab; icon: React.ElementType; label: string; color: string }[] = [
  { id: 'home',         icon: Home,        label: 'الرئيسية', color: '#6B3210' },
  { id: 'menu',         icon: BookOpen,    label: 'المنيو',   color: '#2D7D46' },
  { id: 'reservations', icon: CalendarDays,label: 'احجز',     color: '#0076FF' },
  { id: 'card',         icon: CreditCard,  label: 'بطاقتي',  color: '#7A3B18' },
  { id: 'orders',       icon: ShoppingBag, label: 'طلباتي',  color: '#128C7E' },
];

export function BottomNav({ activeTab, onChangeTab, notifCount = 1 }: BottomNavProps) {
  return (
    <div
      className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] h-[62px] flex items-center justify-around px-1 z-40"
      style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderRadius: '22px',
        border: '1px solid rgba(196,181,159,0.22)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.7) inset',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <motion.button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            whileTap={{ scale: 0.82 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="relative flex flex-col items-center justify-center w-[18%] h-full gap-0.5"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {/* Active background pill */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute inset-x-0.5 inset-y-1.5 rounded-[14px]"
                  style={{
                    background: `linear-gradient(145deg,${tab.color}22,${tab.color}12)`,
                    border: `1px solid ${tab.color}30`,
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                />
              )}
            </AnimatePresence>

            {/* Glow behind icon when active */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute w-6 h-6 rounded-full pointer-events-none"
                style={{
                  background: tab.color,
                  filter: 'blur(10px)',
                  opacity: 0.25,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -64%)',
                }}
              />
            )}

            {/* Icon */}
            <motion.div
              animate={isActive ? { y: -1 } : { y: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="relative z-10"
            >
              <Icon
                size={isActive ? 18 : 17}
                style={{
                  color: isActive ? tab.color : 'rgba(0,0,0,0.28)',
                  filter: isActive ? `drop-shadow(0 0 6px ${tab.color}88)` : 'none',
                  transition: 'all 0.2s ease',
                }}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
            </motion.div>

            {/* Label — always visible */}
            <motion.span
              animate={{ opacity: isActive ? 1 : 0.45 }}
              className="relative z-10 leading-none select-none"
              style={{
                fontSize: 8.5,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? tab.color : 'rgba(0,0,0,0.35)',
                letterSpacing: isActive ? '-0.01em' : '0',
              }}
            >
              {tab.label}
            </motion.span>

            {/* Notification badge */}
            {tab.id === 'orders' && notifCount > 0 && !isActive && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-1 w-4 h-4 rounded-full text-white flex items-center justify-center"
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  background: 'linear-gradient(135deg,#30D158,#25A349)',
                  boxShadow: '0 2px 6px rgba(48,209,88,0.5)',
                  zIndex: 20,
                }}
              >
                {notifCount}
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

export type { Tab };
