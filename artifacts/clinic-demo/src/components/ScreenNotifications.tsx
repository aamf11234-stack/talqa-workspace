import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, FlaskConical, Pill, Shield, Star, Bell, X } from 'lucide-react';

const initialNotifs = [
  { id:1, icon:Calendar,     color:'#00B4D8', bg:'rgba(0,180,216,0.12)',    border:'rgba(0,180,216,0.2)',
    title:'تذكير بموعدك غداً',       body:'د. سارة المطيري · الجمعة ٢٠ يوليو · ١٠:٣٠ ص', time:'منذ ٢٠ دقيقة', isNew:true,  action:'عرض التفاصيل' },
  { id:2, icon:FlaskConical, color:'#34C759', bg:'rgba(52,199,89,0.12)',    border:'rgba(52,199,89,0.2)',
    title:'نتيجة التحليل جاهزة',      body:'تحليل الدم الشامل متاح الآن للمراجعة',              time:'منذ ساعة',      isNew:true,  action:'مراجعة النتيجة' },
  { id:3, icon:Pill,         color:'#F59E0B', bg:'rgba(245,158,11,0.12)',   border:'rgba(245,158,11,0.2)',
    title:'تذكير الدواء — ٨:٠٠ م',   body:'حان وقت جرعة ميتفورمين ٥٠٠mg مع العشاء',          time:'منذ ٣ ساعات',   isNew:false, action:'تم ✓' },
  { id:4, icon:Shield,       color:'#00B4D8', bg:'rgba(0,180,216,0.08)',    border:'rgba(0,180,216,0.15)',
    title:'فحصك السنوي الدوري',       body:'حان موعد إجراء الفحص الشامل — احجز الآن',          time:'أمس',           isNew:false, action:'حجز موعد' },
  { id:5, icon:Star,         color:'#F59E0B', bg:'rgba(245,158,11,0.08)',   border:'rgba(245,158,11,0.15)',
    title:'قيّم زيارتك الأخيرة',      body:'كيف كانت تجربتك مع د. سارة المطيري؟',               time:'منذ يومين',     isNew:false, action:'تقييم الآن' },
];

export function ScreenNotifications() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const newCount = notifs.filter(n => n.isNew).length;

  return (
    <div className="flex flex-col h-full" style={{ background:'#0E1621', fontFamily:'Tajawal,sans-serif' }}>

      {/* Header */}
      <div className="shrink-0 px-5 pt-3 pb-5 relative overflow-hidden"
        style={{ background:'linear-gradient(170deg,#0A1628 0%,#0D2240 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse at 70% 30%,rgba(0,180,216,0.14) 0%,transparent 60%)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-8 pointer-events-none"
          style={{ background:'linear-gradient(to bottom,transparent,#0E1621)' }}/>
        <div className="relative z-10 flex items-end justify-between">
          <div>
            <p className="text-white/30 text-[10px] mb-1">مركز الإشعارات</p>
            <p className="text-white text-[20px] font-bold">الإشعارات</p>
          </div>
          {newCount > 0 && (
            <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', damping:18 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-0.5"
              style={{ background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.2)' }}>
              <motion.div className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]"
                animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.4, repeat:Infinity }}/>
              <span className="text-[#FF6B6B] text-[10px] font-bold">{newCount} جديد</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 space-y-2.5">
        <AnimatePresence>
          {notifs.map((n, i) => {
            const Icon = n.icon;
            return (
              <motion.div key={n.id}
                layout
                initial={{ opacity:0, x:20 }}
                animate={{ opacity:1, x:0 }}
                exit={{ opacity:0, x:-60, height:0, marginBottom:0 }}
                transition={{ delay:i*0.05, duration:0.22, layout:{ duration:0.2 } }}
                className="rounded-[20px] overflow-hidden"
                style={{
                  background: n.isNew ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                  border:`1px solid ${n.isNew ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
                }}>

                {/* New indicator */}
                {n.isNew && (
                  <div className="h-[2px]"
                    style={{ background:`linear-gradient(90deg,${n.color},transparent)` }}/>
                )}

                <div className="p-4 flex items-start gap-3">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0"
                    style={{ background:n.bg, border:`1px solid ${n.border}` }}>
                    <Icon size={17} style={{ color:n.color }}/>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-white text-[12px] font-bold leading-snug flex-1">{n.title}</p>
                      <motion.button whileTap={{ scale:0.85 }}
                        onClick={() => setNotifs(p => p.filter(x => x.id !== n.id))}
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background:'rgba(255,255,255,0.08)' }}>
                        <X size={9} className="text-white/40"/>
                      </motion.button>
                    </div>
                    <p className="text-white/40 text-[11px] leading-snug mb-2.5">{n.body}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/20 text-[9px]">{n.time}</span>
                      <motion.button whileTap={{ scale:0.93 }}
                        className="text-[9px] font-bold px-3 py-1.5 rounded-full"
                        style={{ background:n.bg, color:n.color, border:`1px solid ${n.border}` }}>
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
          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-4"
              style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
              <Bell size={26} className="text-white/20"/>
            </div>
            <p className="text-white/30 text-[14px] font-bold">لا توجد إشعارات</p>
            <p className="text-white/15 text-[11px] mt-1">ستظهر تنبيهاتك هنا</p>
          </motion.div>
        )}

        <div style={{ height:72 }}/>
      </div>
    </div>
  );
}
