import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, ChevronLeft, Heart, Droplets, Activity, CalendarCheck, FileText, Pill, Phone } from 'lucide-react';

interface Props { theme?: 'dark' | 'light' }

function useCounter(target: number, duration = 1200) {
 const [val, setVal] = useState(0);
 useEffect(() => {
 let v = 0;
 const step = Math.max(1, Math.ceil(target / (duration / 16)));
 const t = setInterval(() => { v = Math.min(v + step, target); setVal(v); if (v >= target) clearInterval(t); }, 16);
 return () => clearInterval(t);
 }, [target]);
 return val;
}

function HealthRing({ score, dark }: { score: number; dark: boolean }) {
 const r = 52, circ = 2 * Math.PI * r;
 return (
 <div className="relative flex items-center justify-center" style={{ width: 130, height: 130 }}>
 <svg width="130" height="130" viewBox="0 0 130 130" className="absolute">
 <defs>
 <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="#00B4D8" />
 <stop offset="100%" stopColor="#34C759" />
 </linearGradient>
 <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 </defs>
 <circle cx="65" cy="65" r={r} fill="none"
 stroke={dark ? 'rgba(255,255,255,0.07)' : 'rgba(11,74,111,0.08)'} strokeWidth="9"/>
 <motion.circle cx="65" cy="65" r={r} fill="none" strokeWidth="9" strokeLinecap="round"
 stroke="url(#hg)" filter="url(#glow)"
 strokeDasharray={circ} strokeDashoffset={circ}
 animate={{ strokeDashoffset: circ * (1 - score / 100) }}
 transition={{ duration: 1.6, ease: [0.4,0,0.2,1], delay: 0.3 }}
 transform="rotate(-90 65 65)" />
 </svg>
 <div className="flex flex-col items-center z-10">
 <span className="text-[28px] font-black leading-none" style={{ color: dark ? '#fff' : '#0A1628' }}>{score}</span>
 <span className="text-[9px] mt-0.5" style={{ color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(11,74,111,0.45)' }}>صحتك</span>
 </div>
 </div>
 );
}

const quickActions = [
 { icon: CalendarCheck, label: 'احجز موعد', color: '#00B4D8' },
 { icon: FileText, label: 'نتائجي', color: '#34C759' },
 { icon: Pill, label: 'وصفاتي', color: '#F59E0B' },
 { icon: Phone, label: 'تواصل', color: '#FF6B6B' },
];

const vitals = [
 { icon: Heart, label: 'ضغط الدم', value: '120/80', unit: 'mmHg', color: '#FF6B6B' },
 { icon: Droplets, label: 'السكر', value: '95', unit: 'mg/dL', color: '#00B4D8' },
 { icon: Activity, label: 'النبض', value: '72', unit: 'bpm', color: '#34C759' },
];

const meds = [
 { name: 'ميتفورمين ٥٠٠mg', time: '٨:٠٠ ص', taken: true },
 { name: 'فيتامين د', time: '١:٠٠ م', taken: false },
 { name: 'أوميبرازول', time: '٨:٠٠ م', taken: false },
];

export function ScreenHome({ theme = 'dark' }: Props) {
 const dark = theme === 'dark';
 const visits = useCounter(24);

 /* ── theme tokens ── */
 const bg = dark ? '#0E1621' : '#F0F5FB';
 const headerBg = dark ? 'linear-gradient(170deg,#0A1628 0%,#0D2240 100%)' : 'linear-gradient(170deg,#fff 0%,#EBF4FF 100%)';
 const headerGlow = dark ? 'rgba(0,180,216,0.18)' : 'rgba(11,74,111,0.07)';
 const headerFade = dark ? '#0E1621' : '#F0F5FB';
 const card = dark ? 'rgba(255,255,255,0.04)' : '#fff';
 const cardBorder = dark ? 'rgba(255,255,255,0.07)' : 'rgba(11,74,111,0.09)';
 const cardShadow = dark ? 'none' : '0 2px 12px rgba(11,74,111,0.07)';
 const txt = dark ? '#fff' : '#0A1628';
 const txtSub = dark ? 'rgba(255,255,255,0.40)' : '#5B7A96';
 const txtMuted = dark ? 'rgba(255,255,255,0.20)' : '#9DB5CC';
 const divider = dark ? 'rgba(255,255,255,0.05)' : 'rgba(11,74,111,0.07)';
 const tagBg = dark ? 'rgba(255,255,255,0.08)' : 'rgba(11,74,111,0.06)';
 const notifBtnBg = dark ? 'rgba(255,255,255,0.07)' : 'rgba(11,74,111,0.06)';
 const avatarBorder= dark ? 'rgba(255,255,255,0.12)' : 'rgba(11,74,111,0.15)';

 return (
 <div className="flex flex-col h-full overflow-y-auto scrollbar-none"
 style={{ background: bg, fontFamily: 'Tajawal,sans-serif' }}>

 {/* ── Header ── */}
 <div className="relative shrink-0 px-5 pt-3 pb-8" style={{ background: headerBg }}>
 <div className="absolute inset-0 pointer-events-none"
 style={{ background: `radial-gradient(ellipse at 70% 40%, ${headerGlow} 0%, transparent 60%)` }}/>
 <div className="absolute bottom-0 inset-x-0 h-12 pointer-events-none"
 style={{ background: `linear-gradient(to bottom, transparent, ${headerFade})` }}/>

 <div className="relative z-10 flex items-center justify-between mb-5">
 <div>
 <p className="text-[10px] font-light mb-0.5" style={{ color: txtSub }}>الاثنين، ٢٠ يوليو</p>
 <p className="text-[18px] font-bold" style={{ color: txt }}>مرحباً، أحمد </p>
 </div>
 <div className="flex items-center gap-2">
 <motion.button whileTap={{ scale: 0.88 }}
 className="relative w-9 h-9 rounded-full flex items-center justify-center"
 style={{ background: notifBtnBg, border: `1px solid ${cardBorder}` }}>
 <Bell size={14} style={{ color: txtSub }} />
 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6B6B] rounded-full" style={{ border: `1.5px solid ${bg}` }}/>
 </motion.button>
 <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)', border: `2px solid ${avatarBorder}` }}>أ</div>
 </div>
 </div>

 <div className="relative z-10 flex items-center gap-5">
 <HealthRing score={82} dark={dark} />
 <div className="flex flex-col gap-3.5">
 {[
 { v: visits, l: 'زيارة طبية', icon: '' },
 { v: 3, l: 'دواء نشط', icon: '' },
 { v: 7, l: 'تحليل مكتمل', icon: '' },
 ].map((s, i) => (
 <motion.div key={i}
 initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.15 + i * 0.08, type: 'spring', damping: 22 }}
 className="flex items-center gap-2">
 <span className="text-[13px]">{s.icon}</span>
 <div>
 <p className="text-[16px] font-black leading-none" style={{ color: txt }}>{s.v}</p>
 <p className="text-[9px] leading-none mt-0.5" style={{ color: txtSub }}>{s.l}</p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </div>

 {/* ── System Status (Zero Errors) ── */}
 <div className="px-4 mt-4 mb-2">
 <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
 className="rounded-[14px] px-3.5 py-2.5 flex items-center gap-2.5"
 style={{
 background: dark ? 'rgba(52,199,89,0.07)' : 'rgba(52,199,89,0.06)',
 border: dark ? '1px solid rgba(52,199,89,0.18)' : '1px solid rgba(52,199,89,0.2)',
 }}>
 <div className="flex items-center gap-1.5 shrink-0">
 <motion.span className="w-2 h-2 rounded-full bg-[#34C759]"
 animate={{ scale:[1,1.4,1], opacity:[1,0.6,1] }} transition={{ duration:2, repeat:Infinity }} />
 <span className="text-[#34C759] text-[10px] font-bold">جميع الأنظمة تعمل</span>
 </div>
 <div className="h-3 w-px shrink-0" style={{ background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(11,74,111,0.12)' }}/>
 <div className="flex items-center gap-3 flex-1 min-w-0">
 {[['API',''],['الأمان',''],['الخوادم','']].map(([l,v]) => (
 <div key={l} className="flex items-center gap-1 shrink-0">
 <span className="text-[9px] font-bold text-[#34C759]">{v}</span>
 <span className="text-[9px]" style={{ color: dark ? 'rgba(255,255,255,0.3)' : '#9DB5CC' }}>{l}</span>
 </div>
 ))}
 </div>
 <div className="shrink-0 px-2 py-0.5 rounded-full"
 style={{ background: dark ? 'rgba(52,199,89,0.12)' : 'rgba(52,199,89,0.1)', border:'1px solid rgba(52,199,89,0.2)' }}>
 <span className="text-[#34C759] text-[9px] font-black">٠ أخطاء</span>
 </div>
 </motion.div>
 </div>

 {/* ── Apple Health Banner ── */}
 <div className="px-4 mt-2 mb-3">
 <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
 className="rounded-[16px] px-4 py-3 flex items-center gap-3"
 style={{
 background: dark ? 'linear-gradient(135deg,rgba(255,45,85,0.18),rgba(255,107,107,0.12))' : 'linear-gradient(135deg,rgba(255,45,85,0.08),rgba(255,107,107,0.05))',
 border: dark ? '1px solid rgba(255,45,85,0.2)' : '1px solid rgba(255,45,85,0.15)',
 }}>
 <span className="text-[22px]"></span>
 <div className="flex-1">
 <p className="text-[12px] font-bold leading-none mb-0.5" style={{ color: txt }}>Apple Health</p>
 <p className="text-[10px]" style={{ color: txtSub }}>آخر مزامنة منذ ٥ دقائق</p>
 </div>
 <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
 style={{ background: 'rgba(52,199,89,0.15)', border: '1px solid rgba(52,199,89,0.25)' }}>
 <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]"/>
 <span className="text-[#34C759] text-[9px] font-bold">نشط</span>
 </div>
 </motion.div>
 </div>

 {/* ── Next Appointment ── */}
 <div className="px-4 mb-4">
 <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.15, type: 'spring', damping: 22 }}
 className="rounded-[20px] overflow-hidden"
 style={{ background: card, border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}>
 <div className="px-4 py-2.5 flex items-center justify-between"
 style={{
 background: dark ? 'linear-gradient(135deg,rgba(11,74,111,0.6),rgba(0,180,216,0.3))' : 'linear-gradient(135deg,rgba(11,74,111,0.08),rgba(0,180,216,0.06))',
 borderBottom: `1px solid ${cardBorder}`,
 }}>
 <p className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: txtSub }}>موعدك القادم</p>
 <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
 style={{ background: 'rgba(52,199,89,0.15)', color: '#34C759', border: '1px solid rgba(52,199,89,0.25)' }}>مؤكد </span>
 </div>
 <div className="px-4 py-3.5 flex items-center gap-3">
 <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-[15px] shrink-0"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>س</div>
 <div className="flex-1 min-w-0">
 <p className="text-[13px] font-bold leading-none mb-1" style={{ color: txt }}>د. سارة المطيري</p>
 <p className="text-[10px]" style={{ color: txtSub }}>طب عام · الجمعة ٢٠ يوليو · ١٠:٣٠ ص</p>
 </div>
 <ChevronLeft size={14} style={{ color: txtMuted }} className="shrink-0" />
 </div>
 <div className="px-4 pb-3">
 <div className="inline-flex items-center gap-1.5 rounded-[10px] px-3 py-1.5"
 style={{ background: dark ? '#000' : '#1C1C1E', border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)'}` }}>
 <span className="text-[11px]"></span>
 <span className="text-white text-[10px] font-semibold">محفوظ في Apple Wallet</span>
 </div>
 </div>
 </motion.div>
 </div>

 {/* ── Quick Actions ── */}
 <div className="px-4 mb-4">
 <div className="grid grid-cols-4 gap-2">
 {quickActions.map((a, i) => (
 <motion.button key={i}
 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 + i * 0.06, type: 'spring', damping: 20 }}
 whileTap={{ scale: 0.88 }}
 className="flex flex-col items-center gap-2 py-3.5 rounded-[18px]"
 style={{ background: card, border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}>
 <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
 style={{ background: `${a.color}18` }}>
 <a.icon size={17} style={{ color: a.color }} />
 </div>
 <p className="text-[9px] font-semibold leading-none text-center" style={{ color: txtSub }}>{a.label}</p>
 </motion.button>
 ))}
 </div>
 </div>

 {/* ── Vitals ── */}
 <div className="px-4 mb-4">
 <p className="text-[11px] font-bold uppercase tracking-widest mb-2.5" style={{ color: txtSub }}>المؤشرات الحيوية</p>
 <div className="grid grid-cols-3 gap-2">
 {vitals.map((v, i) => (
 <motion.div key={i}
 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 0.25 + i * 0.07, type: 'spring', damping: 20 }}
 className="rounded-[18px] p-3.5"
 style={{ background: card, border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}>
 <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2.5"
 style={{ background: `${v.color}18` }}>
 <v.icon size={14} style={{ color: v.color }} />
 </div>
 <p className="text-[8px] mb-0.5 leading-none" style={{ color: txtSub }}>{v.label}</p>
 <p className="text-[15px] font-black leading-none" style={{ color: txt }}>{v.value}</p>
 <p className="text-[8px] mt-0.5" style={{ color: txtMuted }}>{v.unit}</p>
 </motion.div>
 ))}
 </div>
 </div>

 {/* ── Medications ── */}
 <div className="px-4 mb-6">
 <div className="flex items-center justify-between mb-2.5">
 <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: txtSub }}>أدويتي اليوم</p>
 <span className="text-[10px] font-semibold" style={{ color: '#00B4D8' }}>عرض الكل</span>
 </div>
 <div className="rounded-[20px] overflow-hidden"
 style={{ background: card, border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}>
 {meds.map((m, i) => (
 <div key={i} className="flex items-center gap-3 px-4 py-3.5"
 style={{ borderBottom: i < meds.length - 1 ? `1px solid ${divider}` : 'none' }}>
 <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
 style={{ background: m.taken ? 'rgba(52,199,89,0.15)' : 'rgba(245,158,11,0.12)' }}>
 <span className="text-[14px]"></span>
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-[12px] font-semibold leading-none mb-0.5" style={{ color: txt }}>{m.name}</p>
 <p className="text-[10px]" style={{ color: txtSub }}>{m.time}</p>
 </div>
 {m.taken
 ? <span className="text-[9px] font-bold px-2.5 py-1 rounded-full text-[#34C759]"
 style={{ background: 'rgba(52,199,89,0.15)' }}>تم </span>
 : <span className="text-[9px] font-bold px-2.5 py-1 rounded-full text-[#F59E0B]"
 style={{ background: 'rgba(245,158,11,0.12)' }}>لاحقاً</span>
 }
 </div>
 ))}
 </div>
 </div>

 <div style={{ height: 72 }} />
 </div>
 );
}
