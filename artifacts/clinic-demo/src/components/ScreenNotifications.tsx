import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, FlaskConical, Pill, Shield, Star, Bell, X } from 'lucide-react';

const initialNotifs = [
  {
    id: 1, icon: Calendar, color: '#0B4A6F', bg: '#0B4A6F15',
    title: 'تذكير بموعدك غداً',
    body: 'موعدك مع د. سارة المطيري الجمعة ٢٠ يوليو الساعة ١٠:٣٠ ص',
    time: 'منذ ٢٠ دقيقة', isNew: true, action: 'عرض التفاصيل',
  },
  {
    id: 2, icon: FlaskConical, color: '#22C55E', bg: '#22C55E15',
    title: 'نتيجة التحليل جاهزة',
    body: 'نتيجة تحليل الدم الشامل متاحة الآن للمراجعة',
    time: 'منذ ساعة', isNew: true, action: 'مراجعة النتيجة',
  },
  {
    id: 3, icon: Pill, color: '#F59E0B', bg: '#F59E0B15',
    title: 'تذكير الدواء — ٨:٠٠ م',
    body: 'حان وقت جرعة مترفورمين ٥٠٠mg مع العشاء',
    time: 'منذ ٣ ساعات', isNew: false, action: 'تم أخذه ✓',
  },
  {
    id: 4, icon: Shield, color: '#00B4D8', bg: '#00B4D815',
    title: 'تذكير: فحصك السنوي',
    body: 'حان موعد إجراء فحصك الدوري السنوي — احجز الآن',
    time: 'أمس', isNew: false, action: 'حجز موعد',
  },
  {
    id: 5, icon: Star, color: '#EF4444', bg: '#EF444415',
    title: 'قيّم زيارتك الأخيرة',
    body: 'كيف كانت تجربتك مع د. سارة المطيري؟ رأيك يهمنا',
    time: 'منذ يومين', isNew: false, action: 'تقييم الآن',
  },
];

export function ScreenNotifications() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const newCount = notifs.filter(n => n.isNew).length;

  function dismiss(id: number) {
    setNotifs(prev => prev.filter(n => n.id !== id));
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F0F8FF' }}>
      {/* Header */}
      <div className="shrink-0 px-5 pt-5 pb-4" style={{ background: 'linear-gradient(160deg,#050E1A,#0B3A5A)' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[10px] mb-0.5">مركز الإشعارات</p>
            <p className="text-white text-[18px] font-bold">الإشعارات</p>
          </div>
          {newCount > 0 && (
            <div className="flex items-center gap-1.5 bg-[#EF4444]/10 px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-[#EF4444] rounded-full animate-pulse" />
              <span className="text-[10px] text-[#EF4444] font-bold">{newCount} جديد</span>
            </div>
          )}
        </div>
      </div>

      {/* Notifications list */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 pb-28 space-y-3">
        <AnimatePresence>
          {notifs.map((n, i) => {
            const Icon = n.icon;
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80, height: 0, marginBottom: 0 }}
                transition={{ delay: i * 0.06, duration: 0.25 }}
                className={`bg-white rounded-[18px] p-4 border shadow-[0_2px_12px_rgba(0,0,0,0.04)] relative overflow-hidden ${n.isNew ? 'border-[rgba(0,180,216,0.2)]' : 'border-[rgba(11,74,111,0.07)]'}`}
              >
                {n.isNew && (
                  <div className="absolute top-0 right-0 w-full h-[2px]"
                    style={{ background: 'linear-gradient(90deg,transparent,#00B4D8,transparent)' }} />
                )}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: n.bg }}>
                    <Icon size={16} style={{ color: n.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1 mb-0.5">
                      <p className="text-[12px] font-bold text-[#111] leading-snug">{n.title}</p>
                      <button onClick={() => dismiss(n.id)} className="shrink-0 text-[#DDD] hover:text-[#AAA] transition-colors p-0.5">
                        <X size={12} />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#888] font-light leading-snug mb-2">{n.body}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-[#CCC]">{n.time}</span>
                      <button className="text-[10px] font-bold px-3 py-1 rounded-full transition-all active:scale-95"
                        style={{ background: n.bg, color: n.color }}>
                        {n.action}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {notifs.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Bell size={40} className="text-[#DDD] mx-auto mb-3" />
            <p className="text-[14px] font-bold text-[#AAA]">لا توجد إشعارات</p>
            <p className="text-[11px] text-[#CCC] mt-1">ستظهر إشعاراتك هنا</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
