import React from 'react';
import { motion } from 'framer-motion';
import { Home, CalendarDays, CreditCard, Brain, Bell, Video } from 'lucide-react';

export type ClinicTab = 'home' | 'appointments' | 'card' | 'ai' | 'telemedicine' | 'notifications';

const tabs: { id: ClinicTab; icon: React.ElementType; label: string }[] = [
  { id: 'home',          icon: Home,         label: 'الرئيسية' },
  { id: 'appointments',  icon: CalendarDays,  label: 'مواعيد'   },
  { id: 'card',          icon: CreditCard,   label: 'بطاقتي'  },
  { id: 'ai',            icon: Brain,        label: 'AI طبي'  },
  { id: 'telemedicine',  icon: Video,        label: 'فيديو'   },
  { id: 'notifications', icon: Bell,         label: 'إشعارات' },
];

interface Props { activeTab: ClinicTab; onChangeTab: (t: ClinicTab) => void; notifCount?: number; }

export function BottomNav({ activeTab, onChangeTab, notifCount = 2 }: Props) {
  return (
    <div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-around px-1"
      style={{
        width: 'calc(100% - 16px)',
        height: 54,
        background: 'rgba(255,255,255,0.92)',
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
        const isAI = tab.id === 'ai';
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className="relative flex flex-col items-center justify-center rounded-full transition-all duration-200 active:scale-90"
            style={{ width: '15%', height: 40 }}
          >
            {isActive && (
              <motion.div
                layoutId="clinic-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: isAI ? 'linear-gradient(135deg,#8B5CF6,#6D28D9)' : 'linear-gradient(135deg,#0B4A6F,#007FAF)' }}
                transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
              />
            )}
            <Icon
              size={16}
              className="relative z-10 transition-colors duration-200"
              style={{ color: isActive ? '#fff' : '#BBBBBB' }}
            />
            {tab.id === 'notifications' && notifCount > 0 && !isActive && (
              <span className="absolute top-0 right-0.5 w-3.5 h-3.5 bg-[#EF4444] rounded-full text-white text-[7px] font-bold flex items-center justify-center z-20">
                {notifCount}
              </span>
            )}
            {isAI && !isActive && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-violet-500 rounded-full border border-white z-20" />
            )}
          </button>
        );
      })}
    </div>
  );
}
