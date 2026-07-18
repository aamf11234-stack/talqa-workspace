import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, FlaskConical, Pill, Shield, Star, Bell, X } from 'lucide-react';

const initialNotifs = [
  {
    id: 1, icon: Calendar, color: '#0B4A6F', bg: '#EBF5FF',
    title: 'تذكير بموعدك غداً',
    body: 'د. سارة المطيري · الجمعة ٢٠ يوليو · ١٠:٣٠ ص',
    time: 'منذ ٢٠ دقيقة', isNew: true, action: 'عرض التفاصيل',
  },
  {
    id: 2, icon: FlaskConical, color: '#10B981', bg: '#ECFDF5',
    title: 'نتيجة التحليل جاهزة',
    body: 'تحليل الدم الشامل متاح الآن للمراجعة',
    time: 'منذ ساعة', isNew: true, action: 'مراجعة النتيجة',
  },
  {
    id: 3, icon: Pill, color: '#F59E0B', bg: '#FFFBEB',
    title: 'تذكير الدواء — ٨:٠٠ م',
    body: 'حان وقت جرعة ميتفورمين ٥٠٠mg مع العشاء',
    time: 'منذ ٣ ساعات', isNew: false, action: 'تم ✓',
  },
  {
    id: 4, icon: Shield, color: '#00B4D8', bg: '#E0F9FF',
    title: 'فحصك السنوي الدوري',
    body: 'حان موعد إجراء الفحص الشامل — احجز الآن',
    time: 'أمس', isNew: false, action: 'حجز موعد',
  },
  {
    id: 5, icon: Star, color: '#EF4444', bg: '#FEF2F2',
    title: 'قيّم زيارتك الأخيرة',
    body: 'كيف كانت تجربتك مع د. سارة المطيري؟',
    time: 'منذ يومين', isNew: false, action: 'تقييم الآن',
  },
];

export function ScreenNotifications() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const newCount = notifs.filter(n => n.isNew).length;

  return (
    <div className="flex flex-col h-full" style={{ background:'#F2F6FB', fontFamily:'Tajawal,sans-serif' }}>

      {/* Header */}
      <div className="shrink-0 px-5 pt-5 pb-5 relative overflow-hidden"
        style={{ background:'linear-gradient(160deg,#06101E 0%,#0B3A5A 60%,#06101E 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse at 70% 30%,rgba(0,180,216,0.18) 0%,transparent 60%)' }} />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[10px] mb-1">مركز الإشعارات</p>
            <p className="text-white text-[20px] font-bold">الإشعارات</p>
          </div>
          {newCount > 0 && (
            <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', damping:18 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background:'rgba(239,68,68,0.15)', border:'1px solid rgba(239,68,68,0.2)' }}>
              <motion.div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"
                animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.4, repeat:Infinity }} />
              <span className="text-[#EF4444] text-[10px] font-bold">{newCount} جديد</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 pb-28 space-y-3">
        <AnimatePresence>
          {notifs.map((n, i) => {
            const Icon = n.icon;
            return (
              <motion.div key={n.id}
                layout
                initial={{ opacity:0, x:24 }}
                animate={{ opacity:1, x:0 }}
                exit={{ opacity:0, x:-60, height:0, marginBottom:0, paddingTop:0, paddingBottom:0 }}
                transition={{ delay:i*0.05, duration:0.25, layout:{ duration:0.22 } }}
                className="rounded-[20px] overflow-hidden"
                style={{ background:'#fff', boxShadow:n.isNew ? '0 4px 20px rgba(0,180,216,0.10)' : '0 2px 10px rgba(0,0,0,0.05)' }}>

                {/* New indicator bar */}
                {n.isNew && (
                  <div className="h-[2.5px] w-full"
                    style={{ background:'linear-gradient(90deg,#0B4A6F,#00B4D8)' }} />
                )}

                <div className="p-4 flex items-start gap-3">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background:n.bg }}>
                    <Icon size={18} style={{ color:n.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-[12px] font-bold text-[#111] leading-snug flex-1">{n.title}</p>
                      <motion.button whileTap={{ scale:0.85 }}
                        onClick={() => setNotifs(prev => prev.filter(x => x.id !== n.id))}
                        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background:'#F2F6FB' }}>
                        <X size={10} className="text-[#BBB]" />
                      </motion.button>
                    </div>
                    <p className="text-[11px] text-[#999] leading-snug mb-2.5">{n.body}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-[#CCC]">{n.time}</span>
                      <motion.button whileTap={{ scale:0.93 }}
                        className="text-[10px] font-bold px-3 py-1.5 rounded-full"
                        style={{ background:n.bg, color:n.color }}>
                        {n.action}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {notifs.length === 0 && (
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
            className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-4"
              style={{ background:'#F2F6FB' }}>
              <Bell size={28} className="text-[#DDD]" />
            </div>
            <p className="text-[14px] font-bold text-[#CCC]">لا توجد إشعارات</p>
            <p className="text-[11px] text-[#DDD] mt-1">ستظهر تنبيهاتك هنا</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
