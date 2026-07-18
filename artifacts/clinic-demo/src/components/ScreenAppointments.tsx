import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Clock, CheckCircle, X } from 'lucide-react';

const upcoming = [
  { dr:'د. سارة المطيري',  spec:'طب عام',     day:'الجمعة',   date:'٢٠ يوليو', time:'١٠:٣٠ ص', status:'confirmed', av:'س', color:'#0B4A6F' },
  { dr:'د. فهد الحربي',    spec:'قلب وأوعية', day:'الأحد',    date:'٢٢ يوليو', time:'٢:٠٠ م',  status:'confirmed', av:'ف', color:'#00B4D8' },
  { dr:'د. منى القحطاني',  spec:'جلدية',       day:'الأربعاء', date:'٢٥ يوليو', time:'١١:٠٠ ص', status:'pending',   av:'م', color:'#10B981' },
];
const past = [
  { dr:'د. سارة المطيري',  spec:'طب عام', day:'الأحد',   date:'١٢ يوليو', time:'٩:٠٠ ص', status:'done', av:'س', color:'#0B4A6F' },
  { dr:'د. خالد العتيبي',  spec:'عيون',   day:'الإثنين', date:'٢٩ يونيو', time:'٣:٠٠ م', status:'done', av:'خ', color:'#F59E0B' },
];

const specialties = ['طب عام','قلب وأوعية','عيون','عظام','جلدية','أطفال','نساء وولادة','أسنان'];
const times       = ['٩:٠٠ ص','٩:٣٠ ص','١٠:٠٠ ص','١١:٠٠ ص','٢:٠٠ م','٢:٣٠ م','٣:٠٠ م','٤:٠٠ م'];

const statusCfg = {
  confirmed: { label:'مؤكد ✓',      bg:'#ECFDF5', color:'#10B981' },
  pending:   { label:'قيد المراجعة', bg:'#FFFBEB', color:'#F59E0B' },
  done:      { label:'مكتمل',        bg:'#F2F6FB', color:'#BBB' },
};

export function ScreenAppointments() {
  const [tab,     setTab]     = useState<'upcoming'|'past'>('upcoming');
  const [booking, setBooking] = useState(false);
  const [step,    setStep]    = useState(0);
  const [selSpec, setSelSpec] = useState<string|null>(null);
  const [selTime, setSelTime] = useState<string|null>(null);
  const [done,    setDone]    = useState(false);

  const list = tab === 'upcoming' ? upcoming : past;

  function openBooking() { setStep(0); setSelSpec(null); setSelTime(null); setDone(false); setBooking(true); }
  function confirm() { if (!selSpec || !selTime) return; setDone(true); setTimeout(() => setBooking(false), 3000); }

  return (
    <div className="flex flex-col h-full" style={{ background:'#F2F6FB', fontFamily:'Tajawal,sans-serif' }}>

      {/* Header */}
      <div className="shrink-0 px-5 pt-5 pb-4 relative overflow-hidden"
        style={{ background:'linear-gradient(160deg,#06101E 0%,#0B3A5A 60%,#06101E 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse at 70% 30%,rgba(0,180,216,0.18) 0%,transparent 60%)' }} />
        <div className="relative z-10">
          <p className="text-white/40 text-[10px] mb-1">الخميس ١٨ يوليو</p>
          <p className="text-white text-[20px] font-bold mb-3">مواعيدي</p>
          <div className="flex gap-2">
            {(['upcoming','past'] as const).map(t => (
              <motion.button key={t} whileTap={{ scale:0.93 }} onClick={() => setTab(t)}
                className="px-4 py-1.5 rounded-full text-[11px] font-bold transition-all"
                style={tab===t
                  ? { background:'#00B4D8', color:'#fff', boxShadow:'0 3px 12px rgba(0,180,216,0.35)' }
                  : { background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.4)' }}>
                {t==='upcoming' ? 'القادمة' : 'السابقة'}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 pb-28">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            transition={{ duration:0.2 }} className="space-y-3">
            {list.map((a, i) => {
              const cfg = statusCfg[a.status as keyof typeof statusCfg];
              return (
                <motion.div key={i}
                  initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:i*0.07, type:'spring', damping:22 }}
                  className="rounded-[22px] overflow-hidden"
                  style={{ background:'#fff', boxShadow:'0 3px 16px rgba(0,0,0,0.06)' }}>
                  <div className="h-[3px]" style={{ background:`linear-gradient(90deg,${a.color}90,${a.color}20,transparent)` }} />
                  <div className="px-4 py-3.5 flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-[17px] shrink-0"
                      style={{ background:`linear-gradient(135deg,${a.color},${a.color}BB)` }}>{a.av}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[13px] font-bold text-[#111]">{a.dr}</p>
                          <p className="text-[10px] text-[#BBB] mb-1.5">{a.spec}</p>
                          <div className="flex items-center gap-1.5">
                            <Clock size={10} style={{ color:a.color }} />
                            <span className="text-[10px] font-medium" style={{ color:a.color }}>{a.day} {a.date} · {a.time}</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold px-2.5 py-1 rounded-full shrink-0"
                          style={{ background:cfg.bg, color:cfg.color }}>{cfg.label}</span>
                      </div>
                    </div>
                  </div>
                  {/* Apple Wallet for confirmed */}
                  {a.status === 'confirmed' && (
                    <div className="px-4 pb-3.5">
                      <div className="inline-flex items-center gap-2 bg-black rounded-[10px] px-3 py-1.5">
                        <span className="text-[11px]">🎫</span>
                        <span className="text-white text-[10px] font-semibold">Apple Wallet</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FAB */}
      {tab === 'upcoming' && !booking && (
        <motion.button onClick={openBooking} whileTap={{ scale:0.93 }}
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, type:'spring' }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white font-bold text-[13px] px-5 py-3.5 rounded-full z-30"
          style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', boxShadow:'0 8px 28px rgba(11,74,111,0.40)' }}>
          <Plus size={16} /> احجز موعداً جديداً
        </motion.button>
      )}

      {/* Booking sheet */}
      <AnimatePresence>
        {booking && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="absolute inset-0 z-50 flex items-end"
            style={{ background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)' }}>
            <motion.div initial={{ y:440 }} animate={{ y:0 }} exit={{ y:440 }}
              transition={{ type:'spring', damping:28, stiffness:220 }}
              className="w-full rounded-t-[32px] overflow-hidden"
              style={{ background:'#fff', boxShadow:'0 -8px 40px rgba(0,0,0,0.15)' }}>

              {done ? (
                <div className="flex flex-col items-center py-10 px-6">
                  <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', damping:14 }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ background:'linear-gradient(135deg,#ECFDF5,#D1FAE5)' }}>
                      <CheckCircle size={36} style={{ color:'#10B981' }} />
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }} className="text-center">
                    <p className="text-[18px] font-bold text-[#111] mb-1">تم تسجيل موعدك!</p>
                    <p className="text-[12px] text-[#999] leading-relaxed mb-6">{selSpec} · {selTime}<br/>ستصلك رسالة تأكيد على الواتساب</p>
                    <motion.button initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.4 }}
                      whileTap={{ scale:0.95 }}
                      className="w-full flex items-center justify-center gap-2.5 bg-black py-4 rounded-[18px] text-white font-bold text-[14px]">
                      <span className="text-[18px]">🎫</span> أضف إلى Apple Wallet
                    </motion.button>
                  </motion.div>
                </div>
              ) : (
                <>
                  {/* Handle */}
                  <div className="flex justify-center pt-3 pb-2"><div className="w-8 h-1 rounded-full bg-[#E5E5E5]" /></div>
                  {/* Modal header */}
                  <div className="flex items-center justify-between px-5 pb-3 border-b border-[#F5F7FA]">
                    <div>
                      <div className="flex gap-1.5 mb-1.5">
                        {[0,1].map(s => (
                          <motion.div key={s} className="h-1 rounded-full"
                            animate={{ width: step>=s ? 32 : 20, background: step>=s ? '#0B4A6F' : '#E5E7EB' }}
                            transition={{ duration:0.3 }} />
                        ))}
                      </div>
                      <p className="text-[14px] font-bold text-[#111]">{step===0 ? 'اختر التخصص' : 'اختر الوقت'}</p>
                    </div>
                    <motion.button whileTap={{ scale:0.88 }} onClick={() => setBooking(false)}
                      className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background:'#F2F6FB' }}>
                      <X size={14} className="text-[#999]" />
                    </motion.button>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 0 ? (
                      <motion.div key="s0"
                        initial={{ opacity:0,x:24 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-24 }}
                        transition={{ duration:0.2 }} className="px-5 pt-4 pb-6">
                        <div className="grid grid-cols-2 gap-2 mb-5">
                          {specialties.map(s => (
                            <motion.button key={s} whileTap={{ scale:0.94 }} onClick={() => setSelSpec(s)}
                              className="py-2.5 px-3 rounded-[14px] text-[12px] font-bold text-right transition-all"
                              style={selSpec===s
                                ? { background:'linear-gradient(135deg,#0B4A6F,#007FAF)', color:'#fff', boxShadow:'0 4px 14px rgba(11,74,111,0.28)' }
                                : { background:'#F2F6FB', color:'#555' }}>
                              {s}
                            </motion.button>
                          ))}
                        </div>
                        <motion.button whileTap={{ scale:0.97 }} onClick={() => selSpec && setStep(1)} disabled={!selSpec}
                          className="w-full py-4 rounded-[18px] text-white font-bold text-[14px] transition-all"
                          style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', opacity:selSpec?1:0.35, boxShadow:selSpec?'0 8px 24px rgba(11,74,111,0.30)':'none' }}>
                          التالي →
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div key="s1"
                        initial={{ opacity:0,x:24 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-24 }}
                        transition={{ duration:0.2 }} className="px-5 pt-4 pb-6">
                        <div className="grid grid-cols-4 gap-2 mb-5">
                          {times.map(t => (
                            <motion.button key={t} whileTap={{ scale:0.91 }} onClick={() => setSelTime(t)}
                              className="py-2 rounded-[12px] text-[10px] font-bold transition-all"
                              style={selTime===t
                                ? { background:'linear-gradient(135deg,#0B4A6F,#007FAF)', color:'#fff' }
                                : { background:'#F2F6FB', color:'#666' }}>
                              {t}
                            </motion.button>
                          ))}
                        </div>
                        <div className="flex gap-2.5">
                          <motion.button whileTap={{ scale:0.95 }} onClick={() => setStep(0)}
                            className="flex-1 py-4 rounded-[18px] font-bold text-[13px]"
                            style={{ background:'#F2F6FB', color:'#666' }}>
                            → رجوع
                          </motion.button>
                          <motion.button whileTap={{ scale:0.97 }} onClick={confirm} disabled={!selTime}
                            className="flex-[2] py-4 rounded-[18px] text-white font-bold text-[13px] transition-all"
                            style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', opacity:selTime?1:0.35, boxShadow:selTime?'0 8px 24px rgba(11,74,111,0.30)':'none' }}>
                            تأكيد الحجز
                          </motion.button>
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
