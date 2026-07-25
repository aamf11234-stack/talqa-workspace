import React from 'react';
import { Home, CreditCard, BookOpen, ShoppingBag, CalendarDays } from 'lucide-react';

type Tab = 'home' | 'menu' | 'card' | 'orders' | 'reservations';

interface BottomNavProps {
  activeTab: Tab;
  onChangeTab: (tab: Tab) => void;
  notifCount?: number;
}

const tabs: { id: Tab; icon: React.ElementType; label: string; color: string }[] = [
  { id: 'home',         icon: Home,         label: 'الرئيسية', color: '#6B3210' },
  { id: 'menu',         icon: BookOpen,     label: 'المنيو',   color: '#2D7D46' },
  { id: 'reservations', icon: CalendarDays, label: 'احجز',     color: '#0076FF' },
  { id: 'card',         icon: CreditCard,   label: 'بطاقتي',  color: '#7A3B18' },
  { id: 'orders',       icon: ShoppingBag,  label: 'طلباتي',  color: '#128C7E' },
];

export function BottomNav({ activeTab, onChangeTab, notifCount = 1 }: BottomNavProps) {
  return (
    <div
      className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] h-[62px] flex items-center justify-around px-1 z-40"
      style={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderRadius: '22px',
        border: '1px solid rgba(196,181,159,0.22)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.7) inset',
      }}
    >
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className="relative flex flex-col items-center justify-center w-[18%] h-full gap-0.5 select-none"
            style={{
              WebkitTapHighlightColor: 'transparent',
              outline: 'none',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              transform: 'translateZ(0)',  /* GPU layer */
            }}
          >
            {/* Active pill — CSS transition, no layout animation */}
            <span
              className="absolute inset-x-0.5 inset-y-1.5 rounded-[14px]"
              style={{
                background: active ? `${tab.color}1E` : 'transparent',
                border: active ? `1px solid ${tab.color}2A` : '1px solid transparent',
                transition: 'background 120ms ease, border-color 120ms ease',
              }}
            />

            {/* Icon */}
            <Icon
              size={18}
              style={{
                position: 'relative',
                zIndex: 1,
                color: active ? tab.color : 'rgba(0,0,0,0.28)',
                strokeWidth: active ? 2.2 : 1.8,
                filter: active ? `drop-shadow(0 0 5px ${tab.color}70)` : 'none',
                transition: 'color 120ms ease, filter 120ms ease',
              }}
            />

            {/* Label */}
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                fontSize: 8.5,
                fontWeight: active ? 700 : 500,
                color: active ? tab.color : 'rgba(0,0,0,0.3)',
                lineHeight: 1,
                transition: 'color 120ms ease, font-weight 120ms ease',
              }}
            >
              {tab.label}
            </span>

            {/* Notification badge */}
            {tab.id === 'orders' && notifCount > 0 && !active && (
              <span
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
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export type { Tab };
