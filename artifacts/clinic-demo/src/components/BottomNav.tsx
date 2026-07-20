import React from 'react';
import { motion } from 'framer-motion';
import { Home, CalendarDays, CreditCard, Brain, Bell, Video } from 'lucide-react';

export type ClinicTab = 'home' | 'appointments' | 'card' | 'ai' | 'notifications';

const tabs: { id: ClinicTab; icon: React.ElementType; label: string }[] = [
  { id: 'home',          icon: Home,        label: 'الرئيسية' },
  { id: 'appointments',  icon: CalendarDays, label: 'مواعيد'   },
  { id: 'card',          icon: CreditCard,  label: 'بطاقتي'   },
  { id: 'ai',            icon: Brain,       label: 'AI'        },
  { id: 'notifications', icon: Bell,        label: 'تنبيهات'  },
];

interface Props { activeTab: ClinicTab; onChangeTab: (t: ClinicTab) => void; notifCount?: number; }

export function BottomNav({ activeTab, onChangeTab, notifCount = 2 }: Props) {
  return (
    <div
      className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center justify-around"
      style={{
        width: 'calc(100% - 24px)',
        height: 58,
        background: 'rgba(8,16,28,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: 32,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 -2px 24px rgba(0,0,0,0.25), 0 8px 32px rgba(0,0,0,0.3)',
        padding: '0 8px',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        const isAI = tab.id === 'ai';
        const activeColor = isAI ? '#A78BFA' : '#00B4D8';
        const activeBg   = isAI ? 'rgba(139,92,246,0.22)' : 'rgba(0,180,216,0.18)';

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className="relative flex flex-col items-center justify-center gap-0.5 transition-all duration-200 active:scale-90"
            style={{ width: '15%', height: 44 }}
          >
            {isActive && (
              <motion.div
                layoutId="nav-bg"
                className="absolute inset-0 rounded-[18px]"
                style={{ background: activeBg, border: `1px solid ${activeColor}30` }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}

            <div className="relative z-10 flex flex-col items-center gap-0.5">
              <Icon
                size={isActive ? 17 : 16}
                style={{ color: isActive ? activeColor : 'rgba(255,255,255,0.3)', transition: 'all 0.2s' }}
              />
              <span
                className="text-[8px] font-bold leading-none"
                style={{ color: isActive ? activeColor : 'rgba(255,255,255,0.25)', transition: 'color 0.2s' }}
              >
                {tab.label}
              </span>
            </div>

            {/* Notification badge */}
            {tab.id === 'notifications' && notifCount > 0 && !isActive && (
              <span className="absolute top-1 right-0.5 w-4 h-4 bg-[#EF4444] rounded-full text-white text-[8px] font-black flex items-center justify-center z-20 border border-[#08101C]">
                {notifCount}
              </span>
            )}
            {/* AI live dot */}
            {isAI && !isActive && (
              <motion.span
                className="absolute top-1.5 right-1 w-2 h-2 bg-violet-400 rounded-full z-20 border border-[#08101C]"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
