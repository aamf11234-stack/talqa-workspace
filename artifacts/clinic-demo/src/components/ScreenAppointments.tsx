import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Clock, CheckCircle, X, ChevronLeft } from 'lucide-react';

interface Props { theme?: 'dark' | 'light' }

const upcoming = [
  { dr:'د. سارة المطيري',  spec:'طب عام',     day:'الجمعة',   date:'٢٠ يوليو', time:'١٠:٣٠ ص', status:'confirmed', av:'س', color:'#00B4D8' },
  { dr:'د. فهد الحربي',    spec:'قلب وأوعية', day:'الأحد',    date:'٢٢ يوليو', time:'٢:٠٠ م',  status:'confirmed', av:'ف', color:'#A78BFA' },
  { dr:'د. منى القحطاني',  spec:'جلدية',       day:'الأربعاء', date:'٢٥ يوليو', time:'١١:٠٠ ص', status:'pending',   av:'م', color:'#34C759' },
];
const past = [
  { dr:'د. سارة المطيري',  spec:'طب عام', day:'الأحد',   date:'١٢ يوليو', time:'٩:٠٠ ص', status:'done', av:'س', color:'#00B4D8' },
  { dr:'د. خالد العتيبي',  spec:'عيون',   day:'الإثنين', date:'٢٩ يونيو', time:'٣:٠٠ م', status:'done', av:'خ', color:'#F59E0B' },
];

const specialties = ['طب عام','قلب وأوعية','عيون','عظام','جلدية','أطفال','نساء وولادة','أسنان'];
const times = ['٩:٠٠ ص','٩:٣٠ ص','١٠:٠٠ ص','١١:٠٠ ص','٢:٠٠ م','٢:٣٠ م','٣:٠٠ م','٤:٠٠ م'];

const statusCfg = {
  confirmed: { label:'مؤكد ✓',       bg:'rgba(52,199,89,0.15)',  color:'#34C759',  border:'rgba(52,199,89,0.25)' },
  pending:   { label:'قيد المراجعة',  bg:'rgba(245,158,11,0.12)', color:'#F59E0B',  border:'rgba(245,158,11,0.2)' },
  done:      { label:'مكتمل',         bg:'',                       color:'',         border:'' },
};

export function ScreenAppointments({ theme = 'dark' }: Props) {
  const dark = theme === 'dark';
  const [tab,     setTab]     = useState<'upcoming'|'past'>('upcoming');
  const [booking, setBooking] = useState(false);
  const [step,    setStep]    = useState(0);
  const [selSpec, setSelSpec] = useState<string|null>(null);
  const [selTime, setSelTime] = useState<string|null>(null);
  const [done,    setDone]    = useState(false);

  const list = tab === 'upcoming' ? upcoming : past;

  /* theme tokens */
  const bg         = dark ? '#0E1621' : '#F0F5FB';
  const headerBg   = dark ? 'linear-gradient(170deg,#0A1628,#0D2240)' : 'linear-gradient(170deg,#fff,#EBF4FF)';
  const headerFade = dark ? '#0E1621' : '#F0F5FB';
  const headerGlow = dark ? 'rgba(0,180,216,0.15)' : 'rgba(11,74,111,0.07)';
  const card       = dark ? 'rgba(255,255,255,0.04)' : '#fff';
  const cardBorder = dark ? 'rgba(255,255,255,0.07)' : 'rgba(11,74,111,0.09)';
  const cardShadow = dark ? 'none' : '0 2px 12px rgba(11,74,111,0.07)';
  const txt        = dark ? '#fff'  : '#0A1628';
  const txtSub     = dark ? 'rgba(255,255,255,0.40)' : '#5B7A96';
  const tabBarBg   = dark ? 'rgba(255,255,255,0.06)' : 'rgba(11,74,111,0.06)';
  const tabBarBdr  = dark ? 'rgba(255,255,255,0.07)' : 'rgba(11,74,111,0.1)';
  const sheetBg    = dark ? '#141E2E' : '#fff';
  const sheetBdr   = dark ? 'rgba(255,255,255,0.08)' : 'rgba(11,74,111,0.1)';
  const overlayBg  = dark ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.45)';
  const chipOff    = dark ? 'rgba(255,255,255,0.06)' : 'rgba(11,74,111,0.06)';
  const chipBdrOff = dark ? 'rgba(255,255,255,0.07)' : 'rgba(11,74,111,0.08)';
  const chipTxtOff = dark ? 'rgba(255,255,255,0.5)' : '#5B7A96';
  const closeBg    = dark ? 'rgba(255,255,255,0.08)' : 'rgba(11,74,111,0.08)';
  const closeColor = dark ? 'rgba(255,255,255,0.5)' : '#5B7A96';
  const backBtn    = dark ? 'rgba(255,255,255,0.06)' : 'rgba(11,74,111,0.07)';
  const backTxt    = dark ? 'rgba(255,255,255,0.5)'  : '#5B7A96';
  const donedivider= dark ? 'rgba(255,255,255,0.12)' : 'rgba(11,74,111,0.1)';
  const doneCardBg = dark ? '#000' : '#1C1C1E';
  const doneCardBdr= dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)';

  function openBooking() { setStep(0); setSelSpec(null); setSelTime(null); setDone(false); setBooking(true); }
  function confirm()     { if (!selSpec || !selTime) return; setDone(true); setTimeout(() => setBooking(false), 3000); }

  const doneCfg = { bg: chipOff, color: txtSub, border: chipBdrOff };

  return (
    <div className="flex flex-col h-full" style={{ background: bg, fontFamily: 'Tajawal,sans-serif' }}>

      {/* Header */}
      <div className="shrink-0 px-5 pt-3 pb-5 relative overflow-hidden" style={{ background: headerBg }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 30%, ${headerGlow} 0%, transparent 60%)` }}/>
        <div className="absolute bottom-0 inset-x-0 h-8 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${headerFade})` }}/>
        <div className="relative z-10">
          <p className="text-[10px] mb-1" style={{ color: txtSub }}>إدارة جداولك</p>
          <p className="text-[20px] font-bold mb-4" style={{ color: txt }}>مواعيدي</p>
          <div className="flex gap-2 p-1 rounded-[14px] w-fit"
            style={{ background: tabBarBg, border: `1px solid ${tabBarBdr}` }}>
            {(['upcoming','past'] as const).map(t => (
              <motion.button key={t} onClick={() => setTab(t)} whileTap={{ scale: 0.94 }}
                className="relative px-5 py-1.5 rounded-[10px] text-[11px] font-bold transition-colors"
                style={{ color: tab === t ? '#fff' : chipTxtOff }}>
                {tab === t && (
                  <motion.div layoutId="apt-tab" className="absolute inset-0 rounded-[10px]"
                    style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}/>
                )}
                <span className="relative z-10">{t === 'upcoming' ? 'القادمة' : 'السابقة'}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 space-y-3">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            transition={{ duration:0.18 }} className="space-y-3">
            {list.map((a, i) => {
              const cfg = a.status === 'done' ? doneCfg : statusCfg[a.status as 'confirmed'|'pending'];
              return (
                <motion.div key={i}
                  initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:i*0.07, type:'spring', damping:22 }}
                  className="rounded-[20px] overflow-hidden"
                  style={{ background: card, border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}>
                  <div className="h-[2px]" style={{ background:`linear-gradient(90deg,${a.color},transparent)` }}/>
                  <div className="px-4 py-4 flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-[15px] shrink-0"
                      style={{ background:`linear-gradient(135deg,${a.color}60,${a.color}30)`, border:`1px solid ${a.color}40` }}>
                      {a.av}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1.5">
                        <div>
                          <p className="text-[13px] font-bold leading-none mb-1" style={{ color: txt }}>{a.dr}</p>
                          <p className="text-[10px]" style={{ color: txtSub }}>{a.spec}</p>
                        </div>
                        <span className="text-[9px] font-bold px-2.5 py-1 rounded-full shrink-0"
                          style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                          {a.status === 'done' ? 'مكتمل' : statusCfg[a.status as 'confirmed'|'pending'].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <Clock size={10} style={{ color: a.color }}/>
                        <span className="text-[10px] font-semibold" style={{ color: a.color }}>
                          {a.day} {a.date} · {a.time}
                        </span>
                      </div>
                      {a.status === 'confirmed' && (
                        <div className="mt-2.5">
                          <div className="inline-flex items-center gap-1.5 rounded-[8px] px-2.5 py-1.5"
                            style={{ background: dark ? '#000' : '#1C1C1E', border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.15)'}` }}>
                            <span className="text-[10px]">🎫</span>
                            <span className="text-white text-[9px] font-semibold">Apple Wallet</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <ChevronLeft size={13} style={{ color: txtSub }} className="shrink-0 mt-1 opacity-40"/>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
        <div style={{ height: 80 }} />
      </div>

      {/* FAB */}
      {tab === 'upcoming' && !booking && (
        <motion.button onClick={openBooking} whileTap={{ scale: 0.94 }}
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, type:'spring' }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white font-bold text-[12px] px-5 py-3 rounded-full z-30 whitespace-nowrap"
          style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', boxShadow:'0 8px 28px rgba(0,180,216,0.35)' }}>
          <Plus size={14}/> احجز موعداً جديداً
        </motion.button>
      )}

      {/* Booking sheet */}
      <AnimatePresence>
        {booking && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="absolute inset-0 z-50 flex items-end"
            style={{ background: overlayBg, backdropFilter:'blur(8px)' }}>
            <motion.div initial={{ y:500 }} animate={{ y:0 }} exit={{ y:500 }}
              transition={{ type:'spring', damping:30, stiffness:260 }}
              className="w-full rounded-t-[32px] overflow-hidden"
              style={{ background: sheetBg, border: `1px solid ${sheetBdr}`, borderBottom:'none', boxShadow:'0 -8px 40px rgba(0,0,0,0.25)' }}>

              {done ? (
                <div className="flex flex-col items-center py-10 px-6">
                  <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', damping:14 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background:'rgba(52,199,89,0.15)', border:'1px solid rgba(52,199,89,0.3)' }}>
                    <CheckCircle size={32} style={{ color:'#34C759' }}/>
                  </motion.div>
                  <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }} className="text-center">
                    <p className="text-[18px] font-bold mb-1.5" style={{ color: txt }}>تم تسجيل موعدك!</p>
                    <p className="text-[12px] leading-relaxed mb-6" style={{ color: txtSub }}>{selSpec} · {selTime}<br/>ستصلك رسالة تأكيد على الواتساب</p>
                    <div className="w-full flex justify-center mb-4">
                      <div className="w-32 h-[1px]" style={{ background: donedivider }}/>
                    </div>
                    <motion.button initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
                      whileTap={{ scale:0.95 }}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-[18px] text-white font-bold text-[13px]"
                      style={{ background: doneCardBg, border: `1px solid ${doneCardBdr}` }}>
                      <span>🎫</span> أضف إلى Apple Wallet
                    </motion.button>
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full" style={{ background: dark ? 'rgba(255,255,255,0.15)' : 'rgba(11,74,111,0.12)' }}/>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3"
                    style={{ borderBottom: `1px solid ${sheetBdr}` }}>
                    <div>
                      <div className="flex gap-1.5 mb-1.5">
                        {[0,1].map(s => (
                          <motion.div key={s} className="h-1 rounded-full"
                            animate={{ width: step >= s ? 28 : 18, background: step >= s ? '#00B4D8' : dark ? 'rgba(255,255,255,0.12)' : 'rgba(11,74,111,0.12)' }}
                            transition={{ duration:0.3 }}/>
                        ))}
                      </div>
                      <p className="text-[14px] font-bold" style={{ color: txt }}>{step === 0 ? 'اختر التخصص' : 'اختر الوقت'}</p>
                    </div>
                    <motion.button whileTap={{ scale:0.88 }} onClick={() => setBooking(false)}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: closeBg }}>
                      <X size={13} style={{ color: closeColor }}/>
                    </motion.button>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 0 ? (
                      <motion.div key="s0"
                        initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                        transition={{ duration:0.18 }} className="px-5 pt-4 pb-8">
                        <div className="grid grid-cols-2 gap-2 mb-5">
                          {specialties.map(s => (
                            <motion.button key={s} whileTap={{ scale:0.94 }} onClick={() => setSelSpec(s)}
                              className="py-2.5 px-3 rounded-[14px] text-[12px] font-bold text-right transition-all"
                              style={selSpec === s
                                ? { background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', color:'#fff', boxShadow:'0 4px 16px rgba(0,180,216,0.25)' }
                                : { background: chipOff, color: chipTxtOff, border: `1px solid ${chipBdrOff}` }}>
                              {s}
                            </motion.button>
                          ))}
                        </div>
                        <motion.button whileTap={{ scale:0.97 }} onClick={() => selSpec && setStep(1)} disabled={!selSpec}
                          className="w-full py-3.5 rounded-[16px] text-white font-bold text-[13px]"
                          style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', opacity: selSpec ? 1 : 0.3 }}>
                          التالي →
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div key="s1"
                        initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                        transition={{ duration:0.18 }} className="px-5 pt-4 pb-8">
                        <div className="grid grid-cols-4 gap-2 mb-5">
                          {times.map(t => (
                            <motion.button key={t} whileTap={{ scale:0.91 }} onClick={() => setSelTime(t)}
                              className="py-2 rounded-[12px] text-[10px] font-bold"
                              style={selTime === t
                                ? { background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', color:'#fff' }
                                : { background: chipOff, color: chipTxtOff, border: `1px solid ${chipBdrOff}` }}>
                              {t}
                            </motion.button>
                          ))}
                        </div>
                        <div className="flex gap-2.5">
                          <motion.button whileTap={{ scale:0.95 }} onClick={() => setStep(0)}
                            className="flex-1 py-3.5 rounded-[16px] font-bold text-[12px]"
                            style={{ background: backBtn, color: backTxt }}>
                            رجوع
                          </motion.button>
                          <motion.button whileTap={{ scale:0.97 }} onClick={confirm} disabled={!selTime}
                            className="flex-[2] py-3.5 rounded-[16px] text-white font-bold text-[13px]"
                            style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', opacity: selTime ? 1 : 0.3 }}>
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
