import React from 'react';
import { motion } from 'framer-motion';
import { Home, CalendarDays, CreditCard, Users, Bell } from 'lucide-react';

export type ClinicTab = 'home' | 'appointments' | 'card' | 'doctors' | 'notifications';

const tabs: { id: ClinicTab; icon: React.ElementType; label: string }[] = [
  { id: 'home',          icon: Home,         label: 'الرئيسية' },
  { id: 'appointments',  icon: CalendarDays,  label: 'مواعيد'   },
  { id: 'card',          icon: CreditCard,   label: 'بطاقتي'  },
  { id: 'doctors',       icon: Users,        label: 'أطباء'   },
  { id: 'notifications', icon: Bell,         label: 'إشعارات' },
];

interface Props { activeTab: ClinicTab; onChangeTab: (t: ClinicTab) => void; notifCount?: number; }

export function BottomNav({ activeTab, onChangeTab, notifCount = 2 }: Props) {
  return (
    <div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-around px-1"
      style={{
        width: 'calc(100% - 28px)',
        height: 58,
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 30,
        border: '1px solid rgba(11,74,111,0.10)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className="relative flex flex-col items-center justify-center rounded-full transition-all duration-200 active:scale-90"
            style={{ width: '18%', height: 42 }}
          >
            {isActive && (
              <motion.div
                layoutId="clinic-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: 'linear-gradient(135deg,#0B4A6F,#007FAF)' }}
                transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
              />
            )}
            <Icon
              size={18}
              className="relative z-10 transition-colors duration-200"
              style={{ color: isActive ? '#fff' : '#BBBBBB' }}
            />
            {tab.id === 'notifications' && notifCount > 0 && !isActive && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#EF4444] rounded-full text-white text-[8px] font-bold flex items-center justify-center font-inter z-20">
                {notifCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
