import React from 'react';
import { Home, CreditCard, BookOpen, CalendarDays, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Tab = 'home' | 'menu' | 'card' | 'book' | 'community';

interface BottomNavProps {
  activeTab: Tab;
  onChangeTab: (tab: Tab) => void;
  notifCount?: number;
}

const tabs: { id: Tab; icon: React.ElementType; label: string }[] = [
  { id: 'home',      icon: Home,         label: 'الرئيسية' },
  { id: 'menu',      icon: BookOpen,     label: 'المنيو'   },
  { id: 'card',      icon: CreditCard,   label: 'بطاقتي'  },
  { id: 'book',      icon: CalendarDays, label: 'احجز'    },
  { id: 'community', icon: Users,        label: 'مجتمع'   },
];

export function BottomNav({ activeTab, onChangeTab, notifCount = 3 }: BottomNavProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] h-[58px] bg-white/80 backdrop-blur-2xl rounded-full border border-[rgba(196,181,159,0.2)] flex items-center justify-around px-1 shadow-[0_8px_32px_rgba(0,0,0,0.10)] z-40">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className="relative flex flex-col items-center justify-center w-[18%] h-10 rounded-full transition-all duration-300 active:scale-90"
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-[#7B1618] rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <Icon
              size={18}
              className={cn(
                'relative z-10 transition-colors duration-200',
                isActive ? 'text-white' : 'text-[#AAA]'
              )}
            />
            {tab.id === 'community' && notifCount > 0 && !isActive && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#30D158] rounded-full text-white text-[8px] font-bold flex items-center justify-center font-inter z-20">
                {notifCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export type { Tab };
