import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, FlaskConical, Pill, Shield, Star, Bell, X } from 'lucide-react';

interface Props { theme?: 'dark' | 'light' }

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

export function ScreenNotifications({ theme = 'dark' }: Props) {
  const dark = theme === 'dark';
  const [notifs, setNotifs] = useState(initialNotifs);
  const newCount = notifs.filter(n => n.isNew).length;

  const bg         = dark ? '#0E1621' : '#F0F5FB';
  const headerBg   = dark ? 'linear-gradient(170deg,#0A1628,#0D2240)' : 'linear-gradient(170deg,#fff,#EBF4FF)';
  const headerFade = dark ? '#0E1621' : '#F0F5FB';
  const headerGlow = dark ? 'rgba(0,180,216,0.14)' : 'rgba(11,74,111,0.07)';
  const card       = dark ? 'rgba(255,255,255,0.05)' : '#fff';
  const cardBorder = dark ? 'rgba(255,255,255,0.09)' : 'rgba(11,74,111,0.09)';
  const cardBorderNew = dark ? 'rgba(255,255,255,0.1)' : 'rgba(11,74,111,0.12)';
  const cardShadow = dark ? 'none' : '0 2px 12px rgba(11,74,111,0.07)';
  const cardNew    = dark ? 'rgba(255,255,255,0.06)' : '#fff';
  const txt        = dark ? '#fff' : '#0A1628';
  const txtSub     = dark ? 'rgba(255,255,255,0.40)' : '#5B7A96';
  const txtMuted   = dark ? 'rgba(255,255,255,0.20)' : '#9DB5CC';
  const closeBg    = dark ? 'rgba(255,255,255,0.08)' : 'rgba(11,74,111,0.07)';
  const closeColor = dark ? 'rgba(255,255,255,0.40)' : '#9DB5CC';
  const emptyIcon  = dark ? 'rgba(255,255,255,0.05)' : 'rgba(11,74,111,0.06)';
  const emptyBdr   = dark ? 'rgba(255,255,255,0.08)' : 'rgba(11,74,111,0.09)';
  const emptyTxt   = dark ? 'rgba(255,255,255,0.30)' : '#9DB5CC';
  const emptyTxt2  = dark ? 'rgba(255,255,255,0.15)' : '#B8CDD8';

  return (
    <div className="flex flex-col h-full" style={{ background: bg, fontFamily: 'Tajawal,sans-serif' }}>

      {/* Header */}
      <div className="shrink-0 px-5 pt-3 pb-5 relative overflow-hidden" style={{ background: headerBg }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 30%, ${headerGlow} 0%, transparent 60%)` }}/>
        <div className="absolute bottom-0 inset-x-0 h-8 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${headerFade})` }}/>
        <div className="relative z-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] mb-1" style={{ color: txtSub }}>مركز الإشعارات</p>
            <p className="text-[20px] font-bold" style={{ color: txt }}>الإشعارات</p>
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
                  background: n.isNew ? cardNew : card,
                  border: `1px solid ${n.isNew ? cardBorderNew : cardBorder}`,
                  boxShadow: cardShadow,
                }}>
                {n.isNew && (
                  <div className="h-[2.5px]"
                    style={{ background: `linear-gradient(90deg,${n.color},transparent)` }}/>
                )}
                <div className="p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0"
                    style={{ background: n.bg, border: `1px solid ${n.border}` }}>
                    <Icon size={17} style={{ color: n.color }}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-[12px] font-bold leading-snug flex-1" style={{ color: txt }}>{n.title}</p>
                      <motion.button whileTap={{ scale:0.85 }}
                        onClick={() => setNotifs(p => p.filter(x => x.id !== n.id))}
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: closeBg }}>
                        <X size={9} style={{ color: closeColor }}/>
                      </motion.button>
                    </div>
                    <p className="text-[11px] leading-snug mb-2.5" style={{ color: txtSub }}>{n.body}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px]" style={{ color: txtMuted }}>{n.time}</span>
                      <motion.button whileTap={{ scale:0.93 }}
                        className="text-[9px] font-bold px-3 py-1.5 rounded-full"
                        style={{ background: n.bg, color: n.color, border: `1px solid ${n.border}` }}>
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
              style={{ background: emptyIcon, border: `1px solid ${emptyBdr}` }}>
              <Bell size={26} style={{ color: emptyTxt }}/>
            </div>
            <p className="text-[14px] font-bold" style={{ color: emptyTxt }}>لا توجد إشعارات</p>
            <p className="text-[11px] mt-1" style={{ color: emptyTxt2 }}>ستظهر تنبيهاتك هنا</p>
          </motion.div>
        )}
        <div style={{ height: 72 }}/>
      </div>
    </div>
  );
}
