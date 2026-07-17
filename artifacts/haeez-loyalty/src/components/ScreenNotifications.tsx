import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const logoImg = `${import.meta.env.BASE_URL}hyz-logo.jpeg`;

interface Notification {
  id: number;
  title: string;
  body: string;
  time: string;
  dotColor: string;
  unread: boolean;
  actionLabel?: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: 'لك كوب مجاني! 🎉',
    body: 'وصلت لـ ٧ أكواب — استمتع بمشروبك المجاني في زيارتك القادمة',
    time: 'الآن',
    dotColor: '#34C759',
    unread: true,
    actionLabel: 'استخدم الآن',
  },
  {
    id: 2,
    title: 'دعوة حصرية: تذوق محصول إثيوبي',
    body: 'الجمعة ٤–٦م — أماكن محدودة لأعضاء حيز فقط. لا تفوّت التجربة!',
    time: 'منذ ساعة',
    dotColor: '#C4B59F',
    unread: true,
    actionLabel: 'احجز مكانك',
  },
  {
    id: 3,
    title: 'طاولتك بعد ٣٠ دقيقة ⏰',
    body: 'حجزك في حيز الساعة ٤:٠٠م — شارع لبنان، أبها',
    time: 'منذ ٣ ساعات',
    dotColor: '#5E9BF0',
    unread: true,
  },
  {
    id: 4,
    title: 'عيد ميلاد سعيد يا عبد الإله 🎂',
    body: 'هدية من حيز: مشروب مجاني ينتظرك اليوم فقط. نحتفل معك!',
    time: 'أمس',
    dotColor: '#FF6B81',
    unread: false,
  },
  {
    id: 5,
    title: 'محصول بن نادر وصل للتو ☕',
    body: 'بن يرقاشيفي إثيوبي بأعلى درجات التقييم — كميات محدودة جداً',
    time: 'أمس',
    dotColor: '#111111',
    unread: false,
  },
  {
    id: 6,
    title: 'خصم ١٥٪ على المخبوزات اليوم',
    body: 'عرض نهاية الأسبوع لأعضاء حيز — ينتهي الليلة الساعة ٦:٣٠م',
    time: 'منذ يومين',
    dotColor: '#C4B59F',
    unread: false,
  },
];

export function ScreenNotifications() {
  const [dismissed, setDismissed] = useState<number[]>([]);

  const visible = notifications.filter((n) => !dismissed.includes(n.id));
  const unreadCount = visible.filter((n) => n.unread).length;

  return (
    <div className="flex flex-col px-5 pt-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[22px] font-bold text-[#111]">الإشعارات</h1>
          {unreadCount > 0 && (
            <p className="text-[12px] text-[#777] mt-0.5 font-light">
              {unreadCount} إشعار غير مقروء
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <button className="text-[12px] text-[#C4B59F] font-medium px-3 py-1.5 rounded-full border border-[rgba(196,181,159,0.35)] active:scale-95 transition-transform">
            قراءة الكل
          </button>
        )}
      </div>

      {/* Notification List */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-28 -mx-5 px-5 space-y-3">
        <AnimatePresence initial={false}>
          {visible.map((notif, i) => (
            <motion.div
              key={notif.id}
              layout
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60, height: 0, marginBottom: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={`relative bg-white rounded-[18px] p-4 shadow-[0_2px_14px_rgba(0,0,0,0.06)] border overflow-hidden ${
                notif.unread
                  ? 'border-[rgba(196,181,159,0.3)]'
                  : 'border-[rgba(196,181,159,0.12)]'
              }`}
            >
              {/* Unread left stripe */}
              {notif.unread && (
                <div className="absolute right-0 top-4 bottom-4 w-[3px] rounded-l-full bg-[#111]" />
              )}

              <div className="flex items-start gap-3">
                {/* Logo circle */}
                <div className="relative shrink-0">
                  <img
                    src={logoImg}
                    alt="حيز"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {/* Color dot */}
                  <div
                    className="absolute -bottom-0.5 -left-0.5 w-3.5 h-3.5 rounded-full border-2 border-white"
                    style={{ backgroundColor: notif.dotColor }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`text-[13px] leading-snug font-semibold ${notif.unread ? 'text-[#111]' : 'text-[#444]'}`}>
                      {notif.title}
                    </p>
                    <span className="text-[10px] text-[#AAA] shrink-0 mt-0.5 font-inter">{notif.time}</span>
                  </div>
                  <p className="text-[12px] text-[#777] leading-relaxed font-light">
                    {notif.body}
                  </p>

                  {/* Action buttons row */}
                  {notif.actionLabel && (
                    <div className="flex gap-2 mt-3">
                      <button className="bg-[#111] text-white text-[11px] font-medium px-4 py-1.5 rounded-full active:scale-95 transition-transform">
                        {notif.actionLabel}
                      </button>
                      <button
                        onClick={() => setDismissed((d) => [...d, notif.id])}
                        className="bg-[#F5F0EA] text-[#777] text-[11px] font-medium px-4 py-1.5 rounded-full active:scale-95 transition-transform"
                      >
                        لاحقاً
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {visible.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-48 text-center"
          >
            <div className="w-14 h-14 bg-[#F5F0EA] rounded-full flex items-center justify-center mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="#C4B59F" strokeWidth={1.5} className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
            <p className="text-[14px] text-[#777] font-light">لا توجد إشعارات</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
