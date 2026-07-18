import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, Clock, CheckCircle, X } from 'lucide-react';

const upcoming = [
  { dr: 'د. سارة المطيري',  spec: 'طب عام',      day: 'الجمعة',   date: '٢٠ يوليو', time: '١٠:٣٠ ص', status: 'confirmed', avatar: 'س', color: '#0B4A6F' },
  { dr: 'د. فهد الحربي',    spec: 'قلب وأوعية',  day: 'الأحد',    date: '٢٢ يوليو', time: '٢:٠٠ م',  status: 'confirmed', avatar: 'ف', color: '#00B4D8' },
  { dr: 'د. منى القحطاني',  spec: 'جلدية',        day: 'الأربعاء', date: '٢٥ يوليو', time: '١١:٠٠ ص', status: 'pending',   avatar: 'م', color: '#22C55E' },
];

const past = [
  { dr: 'د. سارة المطيري',  spec: 'طب عام',  day: 'الأحد',   date: '١٢ يوليو', time: '٩:٠٠ ص', status: 'done', avatar: 'س', color: '#0B4A6F' },
  { dr: 'د. خالد العتيبي',  spec: 'عيون',    day: 'الإثنين', date: '٢٩ يونيو', time: '٣:٠٠ م', status: 'done', avatar: 'خ', color: '#F59E0B' },
];

const specialties = ['طب عام','قلب وأوعية','عيون','عظام','جلدية','أطفال','نساء وولادة','أسنان'];

const statusCfg = {
  confirmed: { label: 'مؤكد ✓',        bg: '#22C55E10', color: '#22C55E' },
  pending:   { label: 'قيد المراجعة',   bg: '#F59E0B10', color: '#F59E0B' },
  done:      { label: 'مكتمل',          bg: '#AAAAAA18', color: '#AAAAAA' },
};

const listVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', damping: 22, stiffness: 180 } },
};

export function ScreenAppointments() {
  const [tab,      setTab]      = useState<'upcoming'|'past'>('upcoming');
  const [booking,  setBooking]  = useState(false);
  const [step,     setStep]     = useState(0);
  const [selSpec,  setSelSpec]  = useState<string|null>(null);
  const [selTime,  setSelTime]  = useState<string|null>(null);
  const [done,     setDone]     = useState(false);

  const list = tab === 'upcoming' ? upcoming : past;

  const times = ['٩:٠٠ ص','٩:٣٠ ص','١٠:٠٠ ص','١١:٠٠ ص','٢:٠٠ م','٢:٣٠ م','٣:٠٠ م','٤:٠٠ م'];

  function openBooking() { setStep(0); setSelSpec(null); setSelTime(null); setDone(false); setBooking(true); }
  function confirm() {
    if (!selSpec || !selTime) return;
    setDone(true);
    setTimeout(() => { setBooking(false); }, 2200);
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F0F8FF' }}>

      {/* Header */}
      <div className="shrink-0 px-5 pt-5 pb-3" style={{ background: 'linear-gradient(160deg,#050E1A,#0B3A5A)' }}>
        <p className="text-white/35 text-[10px] mb-0.5">الخميس ١٨ يوليو</p>
        <p className="text-white text-[18px] font-bold mb-3">مواعيدي</p>
        <div className="flex gap-2">
          {(['upcoming','past'] as const).map(t => (
            <motion.button key={t} onClick={() => setTab(t)} whileTap={{ scale: 0.93 }}
              className="px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all"
              style={{ background: tab===t ? '#00B4D8' : 'rgba(255,255,255,0.07)', color: tab===t ? '#fff' : 'rgba(255,255,255,0.35)' }}>
              {t === 'upcoming' ? 'القادمة' : 'السابقة'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 pb-28">
        <AnimatePresence mode="wait">
          <motion.div key={tab} variants={listVariants} initial="hidden" animate="show">
            {list.map((a, i) => {
              const cfg = statusCfg[a.status as keyof typeof statusCfg];
              return (
                <motion.div key={i} variants={cardVariant}
                  className="bg-white rounded-[20px] mb-3 border border-[rgba(11,74,111,0.08)] shadow-[0_2px_14px_rgba(0,0,0,0.05)] overflow-hidden">
                  {/* Accent top bar */}
                  <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg,${a.color}60,transparent)` }} />
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-[15px] shrink-0"
                      style={{ background: `linear-gradient(135deg,${a.color},${a.color}99)` }}>{a.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <p className="text-[13px] font-bold text-[#111]">{a.dr}</p>
                          <p className="text-[10px] text-[#AAA] mb-1.5">{a.spec}</p>
                          <div className="flex items-center gap-1" style={{ color: a.color }}>
                            <Clock size={10} />
                            <span className="text-[10px] font-medium">{a.day} {a.date} · {a.time}</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5"
                          style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                      </div>
                    </div>
                    <ChevronLeft size={13} className="text-[#DDD] shrink-0" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FAB */}
      {tab === 'upcoming' && (
        <motion.button onClick={openBooking} whileTap={{ scale: 0.93 }}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: 'spring' }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white font-bold text-[13px] px-5 py-3 rounded-full shadow-[0_6px_24px_rgba(11,74,111,0.40)] z-30"
          style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>
          <Plus size={15} /> احجز موعداً جديداً
        </motion.button>
      )}

      {/* Booking modal */}
      <AnimatePresence>
        {booking && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="absolute inset-0 bg-black/50 z-50 flex items-end">
            <motion.div
              initial={{ y: 400 }} animate={{ y: 0 }} exit={{ y: 400 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-full bg-white rounded-t-[28px] overflow-hidden">

              {done ? (
                <div className="flex flex-col items-center py-10 px-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 14, delay: 0.05 }}>
                    <CheckCircle size={56} className="text-[#22C55E] mb-3" />
                  </motion.div>
                  <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25 }}>
                    <p className="text-[18px] font-bold text-[#111] text-center mb-1">تم تسجيل موعدك!</p>
                    <p className="text-[12px] text-[#888] text-center leading-snug">
                      {selSpec} · {selTime}<br/>ستصلك رسالة تأكيد على الواتساب
                    </p>
                  </motion.div>
                </div>
              ) : (
                <>
                  {/* Modal header */}
                  <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#F5F5F5]">
                    <div>
                      <div className="flex gap-1 mb-1">
                        {[0,1].map(s => (
                          <div key={s} className="h-1 rounded-full transition-all duration-300"
                            style={{ width: step >= s ? 32 : 20, background: step >= s ? '#0B4A6F' : '#E5E5E5' }} />
                        ))}
                      </div>
                      <p className="text-[13px] font-bold text-[#111]">
                        {step === 0 ? 'اختر التخصص' : 'اختر الوقت'}
                      </p>
                    </div>
                    <button onClick={() => setBooking(false)} className="w-7 h-7 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                      <X size={13} className="text-[#888]" />
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 0 ? (
                      <motion.div key="step0"
                        initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                        transition={{ duration:0.2 }}
                        className="px-5 pt-4 pb-6">
                        <div className="grid grid-cols-2 gap-2 mb-5">
                          {specialties.map(s => (
                            <motion.button key={s} whileTap={{ scale:0.94 }}
                              onClick={() => setSelSpec(s)}
                              className="py-2.5 px-3 rounded-[12px] text-[12px] font-semibold text-right transition-all"
                              style={selSpec===s
                                ? { background:'linear-gradient(135deg,#0B4A6F,#007FAF)', color:'#fff', boxShadow:'0 3px 12px rgba(11,74,111,0.28)' }
                                : { background:'#F0F8FF', color:'#555' }}>
                              {s}
                            </motion.button>
                          ))}
                        </div>
                        <button onClick={() => selSpec && setStep(1)} disabled={!selSpec}
                          className="w-full py-3.5 rounded-[16px] text-white font-bold text-[14px] transition-all active:scale-95"
                          style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', opacity: selSpec ? 1 : 0.4 }}>
                          التالي ←
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div key="step1"
                        initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                        transition={{ duration:0.2 }}
                        className="px-5 pt-4 pb-6">
                        <div className="grid grid-cols-4 gap-2 mb-5">
                          {times.map(t => (
                            <motion.button key={t} whileTap={{ scale:0.93 }}
                              onClick={() => setSelTime(t)}
                              className="py-2 rounded-[10px] text-[10px] font-semibold transition-all"
                              style={selTime===t
                                ? { background:'linear-gradient(135deg,#0B4A6F,#007FAF)', color:'#fff' }
                                : { background:'#F0F8FF', color:'#555' }}>
                              {t}
                            </motion.button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setStep(0)} className="flex-1 py-3.5 rounded-[16px] bg-[#F0F8FF] text-[#555] font-bold text-[13px]">
                            → رجوع
                          </button>
                          <button onClick={confirm} disabled={!selTime}
                            className="flex-[2] py-3.5 rounded-[16px] text-white font-bold text-[13px] transition-all active:scale-95"
                            style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', opacity: selTime ? 1 : 0.4 }}>
                            تأكيد الحجز
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
