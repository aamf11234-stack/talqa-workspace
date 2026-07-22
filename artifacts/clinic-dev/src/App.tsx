import React, { useEffect, useRef, useState } from 'react';
import { Smartphone, Globe, LayoutDashboard, Play, GitBranch, Layers, Plug2, BarChart3, ShieldCheck, UserCheck, Lock, KeyRound, Fingerprint, HardDrive, ScanEye, FileCheck2, Zap, Bell, Heart, CreditCard, MessageCircle, Cloud, PhoneMissed, FileX2, UserX, Palette, LayoutTemplate, Sparkles, Store, CircleCheck, QrCode, CalendarCheck, FileText, Pill, Watch, Users, Wallet, FolderOpen, Activity, Shield, Puzzle, Search, Link2, TrendingUp, Star } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TalqaShield, TalqaShieldSmall } from './components/TalqaShield';

/* ═══ TOKENS ═════════════════════════════════════════════════ */
const BG = '#050D1A';
const GLASS = 'rgba(255,255,255,0.055)';
const GLASSBORDER = 'rgba(255,255,255,0.10)';
const BLUE = '#0EA5E9';
const BLUEDIM = 'rgba(14,165,233,0.18)';
const TEXT = '#fff';
const MUTED = 'rgba(255,255,255,0.45)';
const DIM = 'rgba(255,255,255,0.18)';


/* ═══ ICON MAP ══════════════════════════════════════════════ */
type LucideComp = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
const ICONS: Record<string,LucideComp> = {
  smartphone:Smartphone, globe:Globe, dashboard:LayoutDashboard, play:Play,
  gitbranch:GitBranch, layers:Layers, plug:Plug2, barchart:BarChart3,
  shieldcheck:ShieldCheck, usercheck:UserCheck, lock:Lock, key:KeyRound,
  fingerprint:Fingerprint, hdd:HardDrive, eye:ScanEye, filecheck:FileCheck2,
  zap:Zap, bell:Bell, heart:Heart, creditcard:CreditCard, message:MessageCircle,
  cloud:Cloud, phonemissed:PhoneMissed, filex:FileX2, userx:UserX,
  palette:Palette, layout:LayoutTemplate, sparkles:Sparkles, store:Store,
  check:CircleCheck, qr:QrCode, calendar:CalendarCheck, results:FileText,
  pill:Pill, applewatch:Watch, users:Users, wallet:Wallet, folder:FolderOpen,
  activity:Activity, shield:Shield, puzzle:Puzzle, search:Search, link:Link2,
  trending:TrendingUp, star:Star,
};
function IconBox({ name, size=20, color='white' }: { name:string; size?:number; color?:string }) {
  const Ic = ICONS[name];
  return Ic ? <Ic size={size} color={color} strokeWidth={1.75} /> : null;
}

/* ═══ HELPERS ════════════════════════════════════════════════ */

function useOfferCountdown() {
 const END = new Date('2026-07-31T23:59:59').getTime();
 const calc = () => {
 const diff = Math.max(0, END - Date.now());
 return { days: Math.floor(diff/86400000), hours: Math.floor((diff%86400000)/3600000), mins: Math.floor((diff%3600000)/60000), secs: Math.floor((diff%60000)/1000), active: diff > 0 };
 };
 const [t, setT] = useState(calc);
 useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
 return t;
}

function OfferBar({ lang }: { lang: 'ar'|'en' }) {
 const { days, hours, mins, secs, active } = useOfferCountdown();
 const [visible, setVisible] = useState(true);
 if (!active || !visible) return null;
 const pad = (n: number) => String(n).padStart(2, '0');
 return (
 <div className="relative z-50 overflow-hidden" style={{ background: '#0B3A5A' }}>
 <motion.div className="absolute inset-0 pointer-events-none"
 style={{ background: 'linear-gradient(90deg,transparent 0%,rgba(14,165,233,0.18) 50%,transparent 100%)' }}
 animate={{ x: ['-100%', '100%'] }}
 transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }} />
 <div className="relative z-10 flex items-center justify-center gap-3 px-4 py-2 text-white flex-wrap">
 <motion.span className="w-1.5 h-1.5 rounded-full bg-yellow-300 shrink-0"
 animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />

 <span className="text-[11px] font-black whitespace-nowrap">
 {lang === 'ar' ? ' عرض خاص — متوفر لفترة محدودة' : ' Special offer — limited time'}
 </span>

 <div className="flex items-center gap-1 shrink-0" dir="ltr">
 {[
 { v: days, l: lang === 'ar' ? 'يوم' : 'd' },
 { v: hours, l: lang === 'ar' ? 'س' : 'h' },
 { v: mins, l: lang === 'ar' ? 'د' : 'm' },
 { v: secs, l: lang === 'ar' ? 'ث' : 's' },
 ].map(({ v, l }, i) => (
 <React.Fragment key={l}>
 {i > 0 && <span className="text-white/30 font-black mx-0.5">:</span>}
 <div className="flex flex-col items-center min-w-[28px]"
 style={{ background:'rgba(255,255,255,0.1)', borderRadius:6, padding:'2px 5px' }}>
 <AnimatePresence mode="popLayout">
 <motion.span key={v}
 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }}
 transition={{ duration: 0.2 }}
 className="text-[12px] font-black tabular-nums leading-none block">
 {pad(v)}
 </motion.span>
 </AnimatePresence>
 <span className="text-[7px] text-white/40 leading-none mt-0.5">{l}</span>
 </div>
 </React.Fragment>
 ))}
 </div>

 <a href="#تواصل"
 className="shrink-0 text-[10px] font-black px-3 py-1.5 rounded-full transition-all active:scale-95 whitespace-nowrap"
 style={{ background: BLUE, color: '#fff', boxShadow:`0 2px 10px ${BLUE}60` }}>
 {lang === 'ar' ? 'احجز مكانك ←' : 'Book now →'}
 </a>

 <button onClick={() => setVisible(false)}
 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity"
 style={{ background: 'rgba(255,255,255,0.12)' }}>
 <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 1l6 6M7 1L1 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
 </button>
 </div>
 </div>
 );
}

function useCounter(target: number, dur = 1800) {
 const [v, setV] = useState(0);
 const ref = useRef<HTMLDivElement>(null);
 const inView = useInView(ref, { once: true });
 useEffect(() => {
 if (!inView) return;
 let cur = 0;
 const step = Math.max(1, Math.ceil(target / (dur / 16)));
 const id = setInterval(() => { cur = Math.min(cur + step, target); setV(cur); if (cur >= target) clearInterval(id); }, 16);
 return () => clearInterval(id);
 }, [inView, target, dur]);
 return { v, ref };
}

function Reveal({ children, delay = 0, className = '', y = 24 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
 const ref = useRef<HTMLDivElement>(null);
 const inView = useInView(ref, { once: true, margin: '-40px' });
 return (
 <motion.div ref={ref} className={className}
 initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
 {children}
 </motion.div>
 );
}

/* ═══ GLASS CARD ═════════════════════════════════════════════ */
function Glass({ children, className = '', accent = BLUE, style = {}, onClick }:
 { children: React.ReactNode; className?: string; accent?: string; style?: React.CSSProperties; onClick?: () => void }) {
 const [h, setH] = useState(false);
 return (
 <div className={`relative overflow-hidden rounded-3xl transition-all duration-300 ${className}`}
 onClick={onClick}
 onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
 style={{
 background: h ? 'rgba(255,255,255,0.08)' : GLASS,
 border: `1px solid ${h ? `${accent}50` : GLASSBORDER}`,
 backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
 boxShadow: h
 ? `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${accent}30, inset 0 1px 0 rgba(255,255,255,0.12)`
 : '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)',
 transform: h ? 'translateY(-3px)' : 'none',
 ...style }}>
 {/* top shine */}
 <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
 style={{ background: `linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)` }} />
 {/* hover glow */}
 {h && <div className="absolute inset-0 pointer-events-none"
 style={{ background: `radial-gradient(circle at 30% 20%,${accent}08 0%,transparent 60%)` }} />}
 {children}
 </div>
 );
}

/* ═══ BACKGROUND ═════════════════════════════════════════════ */
function Background() {
 return (
 <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
 <div style={{ position:'absolute', inset:0, background: BG }} />
 {/* orbs */}
 <motion.div animate={{ scale:[1,1.15,1], opacity:[0.5,0.8,0.5] }} transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}
 style={{ position:'absolute', top:'-10%', right:'-5%', width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle,rgba(14,165,233,0.12) 0%,transparent 65%)' }} />
 <motion.div animate={{ scale:[1,1.2,1], opacity:[0.3,0.5,0.3] }} transition={{ duration:10, repeat:Infinity, ease:'easeInOut', delay:3 }}
 style={{ position:'absolute', bottom:'-15%', left:'-10%', width:800, height:800, borderRadius:'50%', background:'radial-gradient(circle,rgba(139,92,246,0.09) 0%,transparent 65%)' }} />
 <motion.div animate={{ scale:[1,1.1,1] }} transition={{ duration:12, repeat:Infinity, ease:'easeInOut', delay:6 }}
 style={{ position:'absolute', top:'40%', left:'30%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(14,165,233,0.06) 0%,transparent 70%)' }} />
 {/* dot grid */}
 <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'48px 48px' }} />
 {/* horizontal lines */}
 {[20,40,60,80].map(p => (
 <div key={p} style={{ position:'absolute', top:`${p}%`, left:0, right:0, height:1, background:'rgba(255,255,255,0.025)' }} />
 ))}
 </div>
 );
}

/* ═══ PHONE MOCKUP ═══════════════════════════════════════════ */
const SCREENS = [
 {
 gradient: 'linear-gradient(150deg,rgba(14,165,233,0.9) 0%,rgba(2,132,199,0.95) 100%)',
 content: (
 <div className="h-full flex flex-col p-5 pt-8 text-white">
 <div className="flex items-center justify-between mb-5">
 <div><p className="text-[10px] opacity-50 mb-0.5">مرحباً </p><p className="text-[15px] font-black">خالد العمري</p></div>
 <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-black text-[13px]">خ</div>
 </div>
 <div className="bg-white/15 rounded-2xl p-4 mb-4 border border-white/20">
 <p className="text-[9px] opacity-60 mb-1">موعدك القادم</p>
 <p className="text-[13px] font-black">د. سارة المطيري</p>
 <p className="text-[9px] opacity-60 mb-3">غداً · ١٠:٣٠ صباحاً</p>
 <div className="flex gap-2">
 <div className="flex-1 bg-white rounded-lg py-2 text-center text-[9px] font-black text-sky-600">تأكيد</div>
 <div className="flex-1 bg-white/15 rounded-lg py-2 text-center text-[9px]">إعادة جدولة</div>
 </div>
 </div>
 <div className="grid grid-cols-3 gap-2 mb-4">
 {[['','حجز'],['','أدوية'],['','نتائج']].map(([ic,lb]) => (
 <div key={lb} className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
 <div className="text-[16px] mb-1">{ic}</div>
 <p className="text-[8px] opacity-80 font-semibold">{lb}</p>
 </div>
 ))}
 </div>
 <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3 border border-white/10">
 <span className="text-[18px]"></span>
 <div className="flex-1 min-w-0"><p className="text-[9px] font-bold truncate">ميتفورمين ٥٠٠ملغ</p><p className="text-[8px] opacity-50">مع الإفطار يومياً</p></div>
 <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
 </div>
 </div>
 ) },
 {
 gradient: 'linear-gradient(150deg,rgba(124,58,237,0.9) 0%,rgba(91,33,182,0.95) 100%)',
 content: (
 <div className="h-full flex flex-col p-5 pt-8 text-white">
 <p className="text-[15px] font-black mb-1">السجل الطبي</p>
 <p className="text-[9px] opacity-50 mb-4">٤ وثائق مشفرة</p>
 {[['','تحليل الدم','أمس','مشفّر'],['','وصفة طبية','٣ أيام','PDF'],['','تقرير السكر','أسبوع','مشاركة'],['','تخطيط القلب','شهر','مشفّر']].map(([ic,tt,dt,tag]) => (
 <div key={tt} className="flex items-center gap-3 bg-white/10 rounded-xl p-3 mb-2 border border-white/10">
 <span className="text-[18px]">{ic}</span>
 <div className="flex-1 min-w-0"><p className="text-[10px] font-bold">{tt}</p><p className="text-[8px] opacity-50">{dt}</p></div>
 <span className="text-[7px] bg-white/20 px-2 py-0.5 rounded-full shrink-0">{tag}</span>
 </div>
 ))}
 <div className="mt-auto bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-3 text-center">
 <p className="text-[9px] text-emerald-300 font-bold"> بياناتك مشفرة بـ AES-256</p>
 </div>
 </div>
 ) },
 {
 gradient: 'linear-gradient(150deg,rgba(15,23,42,0.98) 0%,rgba(30,41,59,0.98) 100%)',
 content: (
 <div className="h-full flex flex-col p-5 pt-8 text-white">
 <p className="text-[15px] font-black mb-0.5">لوحة الإدارة</p>
 <p className="text-[9px] opacity-40 mb-4">الأربعاء · اليوم</p>
 <div className="grid grid-cols-2 gap-2 mb-4">
 {[['١٢','مريض اليوم','#38BDF8'],['٨٥٠٠','ريال اليوم','#34D399'],['٩٨٪','رضا','#A78BFA'],['٣','تأخير','#FBBF24']].map(([v,l,c]) => (
 <div key={l} className="rounded-xl p-2.5 border" style={{ background:`${c}18`, borderColor:`${c}25` }}>
 <p className="text-[15px] font-black" style={{ color:c }}>{v}</p>
 <p className="text-[8px] opacity-50">{l}</p>
 </div>
 ))}
 </div>
 <p className="text-[9px] opacity-40 mb-2">طابور الانتظار</p>
 {[['أحمد السالم','د. خالد','٩:٠٠'],['نورا العتيبي','د. سارة','٩:٣٠'],['محمد قحطان','د. خالد','١٠:٠٠']].map(([n,d,t]) => (
 <div key={n} className="flex items-center gap-2.5 bg-white/5 rounded-xl p-2.5 mb-1.5 border border-white/5">
 <div className="w-6 h-6 rounded-full bg-sky-500/40 flex items-center justify-center text-[8px] font-black shrink-0">{n[0]}</div>
 <div className="flex-1 min-w-0"><p className="text-[9px] font-bold truncate">{n}</p><p className="text-[8px] opacity-40">{d}</p></div>
 <span className="text-[8px] opacity-40 shrink-0 font-mono">{t}</span>
 </div>
 ))}
 </div>
 ) },
];

function PhoneMockup({ className = '' }: { className?: string }) {
 const [screen, setScreen] = useState(0);
 useEffect(() => { const id = setInterval(() => setScreen(s => (s + 1) % SCREENS.length), 4000); return () => clearInterval(id); }, []);
 return (
 <div className={`relative flex items-center justify-center ${className}`}>
 <motion.div className="absolute rounded-full blur-[80px] pointer-events-none"
 animate={{ scale:[1,1.15,1], opacity:[0.2,0.35,0.2] }} transition={{ duration:4, repeat:Infinity }}
 style={{ width:320, height:320, background:'radial-gradient(circle,rgba(14,165,233,0.6) 0%,transparent 70%)' }} />
 <div className="relative z-10" style={{ filter:'drop-shadow(0 40px 70px rgba(14,165,233,0.3))' }}>
 <div className="relative w-[230px] h-[460px] rounded-[44px] overflow-hidden"
 style={{ border:'10px solid rgba(255,255,255,0.08)', boxShadow:'inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 0 1px rgba(0,0,0,0.4)', backdropFilter:'blur(4px)' }}>
 <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black/80 rounded-full z-20 flex items-center justify-center gap-1.5 border border-white/5">
 <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" /><div className="w-3 h-3 rounded-full bg-neutral-900" />
 </div>
 <AnimatePresence mode="wait">
 <motion.div key={screen} className="absolute inset-0"
 initial={{ opacity:0, scale:1.04 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.96 }}
 transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
 style={{ background:SCREENS[screen].gradient, paddingTop:34 }}>
 {SCREENS[screen].content}
 </motion.div>
 </AnimatePresence>
 </div>
 </div>
 <div className="absolute -bottom-8 flex gap-2">
 {SCREENS.map((_,i) => (
 <button key={i} onClick={() => setScreen(i)} className="rounded-full transition-all duration-300"
 style={{ width:i===screen?24:7, height:7, background:i===screen?BLUE:'rgba(255,255,255,0.2)' }} />
 ))}
 </div>
 {/* floating badges */}
 <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
 className="absolute -right-10 top-12 z-20 rounded-2xl px-4 py-3 flex items-center gap-3"
 style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', backdropFilter:'blur(20px)', boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
 <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg" style={{ background:BLUEDIM }}></div>
 <div><p className="text-[11px] font-black text-white">حجز جديد</p><p className="text-[9px]" style={{ color:MUTED }}>قبل ثانيتين</p></div>
 </motion.div>
 <motion.div animate={{ y:[0,8,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut', delay:1.5 }}
 className="absolute -left-12 bottom-28 z-20 rounded-2xl px-4 py-3"
 style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(16,185,129,0.3)', backdropFilter:'blur(20px)', boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
 <p className="text-[10px] font-black text-emerald-400 flex items-center gap-1.5">✓ HIPAA</p>
 <p className="text-[9px]" style={{ color:MUTED }}>تشفير ١٠٠٪</p>
 </motion.div>
 </div>
 );
}

/* ═══ TICKER ═════════════════════════════════════════════════ */
const TICKS = ['تطبيق iOS','تطبيق Android','موقع احترافي','نظام إدارة','Apple Health','Apple Wallet','Google Wallet','سجل طبي','واتساب آلي','حجز مواعيد','Apple Watch','تذكير أدوية','داشبورد إدارة','نتائج مختبر','ملف مريض رقمي'];
function Ticker() {
 const all = [...TICKS,...TICKS];
 return (
 <div className="overflow-hidden py-4" style={{ borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)' }}>
 <motion.div className="flex gap-10 w-max" animate={{ x:['0%','-50%'] }} transition={{ duration:35, ease:'linear', repeat:Infinity }}>
 {all.map((t,i) => (
 <div key={i} className="flex items-center gap-10 shrink-0">
 <span className="text-[12px] font-semibold whitespace-nowrap" style={{ color:'rgba(255,255,255,0.3)' }}>{t}</span>
 <span className="w-1 h-1 rounded-full shrink-0" style={{ background:BLUE, opacity:0.5 }} />
 </div>
 ))}
 </motion.div>
 </div>
 );
}

/* ═══ STAT ═══════════════════════════════════════════════════ */
function Stat({ target, suffix, label, prefix='' }: { target:number; suffix:string; label:string; prefix?:string }) {
 const { v, ref } = useCounter(target);
 return (
 <div ref={ref} className="text-center">
 <p className="font-black leading-none mb-2" style={{ fontSize:'clamp(42px,6vw,72px)', color:BLUE }}>{prefix}{v.toLocaleString('ar-SA')}{suffix}</p>
 <p className="text-[13px] font-medium" style={{ color:MUTED }}>{label}</p>
 </div>
 );
}

/* ═══ NAV ════════════════════════════════════════════════════ */
function Nav({ lang, onLang }: { lang: 'ar'|'en'; onLang: () => void }) {
 const [scrolled, setScrolled] = useState(false);
 useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
 return (
 <motion.div initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
 className="fixed top-0 left-0 right-0 z-50">
 <nav className="px-6 lg:px-12 py-4 flex items-center justify-between transition-all duration-500"
 style={{ background: scrolled ? 'rgba(5,13,26,0.92)' : 'rgba(5,13,26,0.6)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)', borderBottom:`1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'transparent'}` }}>
 <div className="flex items-center gap-3">
 <TalqaShield size={36} />
 <div>
 <p className="text-[16px] font-black leading-tight text-white">تلقا<span style={{ color:BLUE }}> للعيادات</span></p>
 <p className="text-[9px] font-medium leading-none" style={{ color:DIM }}>متخصصون في القطاع الطبي</p>
 </div>
 </div>
 <div className="hidden lg:flex items-center gap-8">
 {[['المنظومة','#المنظومة'],['كيف نعمل','#process'],['المميزات','#المميزات'],['تواصل','#تواصل']].map(([l,h]) => (
 <a key={l} href={h} className="text-[13px] font-semibold transition-colors" style={{ color:MUTED }}
 onMouseEnter={e => (e.currentTarget.style.color=TEXT)} onMouseLeave={e => (e.currentTarget.style.color=MUTED)}>{l}</a>
 ))}
 </div>
 <div className="flex items-center gap-3">
 <button onClick={onLang}
 className="hidden sm:flex items-center gap-1.5 text-[11px] font-black px-3 py-2 rounded-xl transition-all"
 style={{ background:GLASS, border:`1px solid ${GLASSBORDER}`, color:MUTED, backdropFilter:'blur(10px)' }}>
 <span style={{ color: lang === 'ar' ? BLUE : MUTED }}>عر</span>
 <span style={{ color:DIM }}>|</span>
 <span style={{ color: lang === 'en' ? BLUE : MUTED }}>EN</span>
 </button>
 <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
 className="hidden sm:flex items-center gap-2 text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all"
 style={{ background:BLUEDIM, border:`1px solid rgba(14,165,233,0.3)`, color:BLUE }}>
 {lang === 'ar' ? 'شاهد الديمو' : 'Live Demo'}
 </a>
 <a href="https://wa.me/966551378531" target="_blank" rel="noopener noreferrer"
 className="text-[13px] font-black px-5 py-2.5 rounded-xl text-white transition-all"
 style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 4px 16px ${BLUE}40` }}>
 {lang === 'ar' ? 'تواصل' : 'Contact'}
 </a>
 </div>
 </nav>
 </motion.div>
 );
}

/* ═══ APP ════════════════════════════════════════════════════ */
/* ── Activity feed data ─────────────────────────────────────── */
const ACTIVITIES = [
 { icon:'ع', name:'عيادة الشفاء', city:'الرياض', action:'وقّعت عقد المشروع', ago:'منذ ٢ ساعة' },
 { icon:'م', name:'د. محمد الأحمدي', city:'جدة', action:'شاهد الديمو الآن', ago:'الآن' },
 { icon:'ن', name:'مجمع النور الطبي', city:'مكة', action:'طلب عرض سعر', ago:'منذ ٤ ساعات' },
 { icon:'ر', name:'عيادة الرعاية', city:'أبها', action:'في مرحلة التصميم', ago:'منذ ٣ أيام' },
 { icon:'س', name:'مستشفى السلام', city:'الدمام','action':'يتصفح الموقع الآن', ago:'الآن' },
 { icon:'د', name:'عيادات دار الشفاء', city:'الرياض', action:'جاري بناء التطبيق', ago:'منذ يومين' },
];


/* ── Apple Wallet Button ───────────────────────────────────────── */
function WalletBtn({ label, sub, gradient, border, getEndpoint }: {
 label:string; sub:string; gradient:string; border:string;
 getEndpoint:string;
}) {
 const [done, setDone] = React.useState(false);
 const handle = () => {
  if (done) return;
  window.location.href = getEndpoint;
  setDone(true); setTimeout(() => setDone(false), 3200);
 };
 return (
  <motion.button whileTap={{ scale:0.97 }} onClick={handle}
   className="flex items-center gap-3 px-5 py-3.5 rounded-[16px] w-full cursor-pointer"
   style={{
    background: done ? 'rgba(52,199,89,0.15)' : gradient,
    border: `1px solid ${done ? 'rgba(52,199,89,0.4)' : border}`,
   }}>
   {done ? (
    <span className="text-[#34C759] text-lg shrink-0">✓</span>
   ) : (
    <svg width="13" height="16" viewBox="0 0 17 20" fill="white" className="shrink-0"><path d="M14.1 10.64c-.02-2.04 1.67-3.02 1.74-3.06-0.95-1.39-2.43-1.58-2.95-1.60-1.26-.13-2.46.74-3.10.74-.64 0-1.63-.72-2.68-.70C5.55 6.04 4.05 6.97 3.22 8.36 1.54 11.17 2.80 15.35 4.42 17.65c.80 1.15 1.77 2.45 3.04 2.40 1.22-.05 1.68-.78 3.16-.78 1.47 0 1.89.78 3.18.76 1.31-.02 2.15-1.18 2.94-2.34.93-1.34 1.32-2.64 1.34-2.71-.03-.01-2.57-.99-2.98-3.34zM11.96 3.83c.67-.81 1.12-1.93 1.00-3.06-.96.04-2.13.64-2.82 1.45-.62.71-1.16 1.86-1.01 2.96 1.07.08 2.16-.54 2.83-1.35z"/></svg>
   )}
   <div className="text-right">
    <p className={`font-bold text-[13px] leading-none ${done ? 'text-[#34C759]' : 'text-white'}`}>
     {done ? 'تمت الإضافة ✓' : label}
    </p>
    <p className="text-white/35 text-[10px] mt-0.5">{sub}</p>
   </div>
  </motion.button>
 );
}

export default function App() {
 const [faqOpen, setFaqOpen] = useState<number|null>(null);
 const [lang, setLang] = useState<'ar'|'en'>('ar');
 const [roiPatients, setRoiPatients] = useState(80);
 const [roiPrice, setRoiPrice] = useState(200);
 const [formName, setFormName] = useState('');
 const [formClinic,setFormClinic] = useState('');
 const [formPhone, setFormPhone] = useState('');
 const [activityIdx, setActivityIdx] = useState(0);
 const [showActivity, setShowActivity] = useState(false);
 const offerCd = useOfferCountdown();

 useEffect(() => {
 const dir = lang === 'ar' ? 'rtl' : 'ltr';
 document.documentElement.dir = dir;
 document.documentElement.lang = lang;
 document.body.style.background = BG; document.body.style.fontFamily = "'Tajawal',sans-serif"; document.body.style.margin = '0'; document.body.style.overflowX = 'hidden';
 }, [lang]);

 /* activity feed cycle */
 useEffect(() => {
 const t1 = setTimeout(() => setShowActivity(true), 4000);
 const id = setInterval(() => {
 setShowActivity(false);
 setTimeout(() => { setActivityIdx(i => (i+1) % ACTIVITIES.length); setShowActivity(true); }, 600);
 }, 7000);
 return () => { clearTimeout(t1); clearInterval(id); };
 }, []);

 /* ROI calc */
 const roiMonthly = roiPatients * roiPrice;
 const roiExtra = Math.round(roiMonthly * 12 * 0.18); // 18% retention improvement
 const roiLost = Math.round(roiPatients * 0.22); // ~22% missed without system

  const [formSent, setFormSent] = useState<'idle'|'sending'|'done'>('idle');

  const handleFormSubmit = async () => {
  if (!formName || !formPhone || formSent === 'sending') return;
  setFormSent('sending');
  try {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
    await fetch(`${base}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: formName, clinic: formClinic, phone: formPhone }),
    });
    setFormSent('done');
  } catch {
    const msg = `مرحباً تلقا تك \n\nأنا ${formName}${formClinic ? ` من ${formClinic}` : ''}.\nأرغب في معرفة تفاصيل منظومة تلقا للعيادات وعرض السعر المخصص لعيادتي.\n\nرقمي: ${formPhone}`;
    window.open(`https://wa.me/966551378531?text=${encodeURIComponent(msg)}`, '_blank');
    setFormSent('done');
  }
  };

 const t = {
 productsBadge: lang==='ar' ? 'المنظومة' : 'The System',
 productsHeading1: lang==='ar' ? 'ثلاثة منتجات.' : 'Three products.',
 productsHeading2: lang==='ar' ? 'منظومة واحدة.' : 'One system.',
 demoCta: lang==='ar' ? 'جرّب المنظومة بنفسك — الآن' : 'Try the system yourself — now',
 demoSub: lang==='ar' ? 'ديمو حي — تطبيق مريض كامل + داشبورد مالك + استقبال · بدون تسجيل' : 'Live demo — full patient app + owner dashboard + reception · no signup',
 openDemo: lang==='ar' ? 'افتح الديمو ←' : 'Open Demo ←',
 statLabel1: lang==='ar' ? 'عيادة عميلة' : 'Clinics served',
 statLabel2: lang==='ar' ? 'متوسط التسليم' : 'avg. delivery',
 statSuffix2: lang==='ar' ? ' يوم' : ' days',
 statLabel3: lang==='ar' ? 'تشفير البيانات' : 'data encrypted',
 statLabel4: lang==='ar' ? 'اختراق مسجّل' : 'breaches recorded',
 processBadge: lang==='ar' ? 'كيف نعمل' : 'How it works',
 processHeading1: lang==='ar' ? 'من الفكرة للإطلاق' : 'From idea to launch',
 processHeading2: lang==='ar' ? 'في ٦٠ يوم مضمونة.' : 'in 60 days, guaranteed.',
 featuresBadge: lang==='ar' ? 'المميزات' : 'Features',
 featuresHeading1: lang==='ar' ? '٢٠+ ميزة.' : '20+ features.',
 featuresHeading2: lang==='ar' ? 'من اليوم الأول.' : 'From day one.',
 securityBadge: lang==='ar' ? 'الأمان' : 'Security',
 securityHeading1: lang==='ar' ? 'بيانات مرضاك' : 'Your patient data',
 securityHeading2: lang==='ar' ? 'محمية بالكامل.' : 'fully protected.',
 priceBadge: lang==='ar' ? 'احجز استشارتك' : 'Book a consultation',
 priceHeading1: lang==='ar' ? 'السعر يتحدد' : 'Pricing is',
 priceHeading2: lang==='ar' ? 'حسب عيادتك.' : 'tailored to you.',
 ctaMain: lang==='ar' ? 'احصل على عرضك المخصص' : 'Get your custom offer',
 ctaDemo: lang==='ar' ? 'شاهد الديمو' : 'See Demo',
 finalHeading: lang==='ar' ? 'ابدأ اليوم.' : 'Start today.',
 finalSub: lang==='ar' ? 'استشارة مجانية · ردّ خلال ٢٤ ساعة · أو نجيك للعيادة' : 'Free consultation · Reply in 24h · Or we visit your clinic',
 whatsapp: lang==='ar' ? 'ابدأ مشروع عيادتك الآن' : 'Start your clinic project' };

 return (
 <div dir={lang==='ar'?'rtl':'ltr'} style={{ background:BG, fontFamily:"'Tajawal',sans-serif", overflowX:'hidden', color:TEXT, position:'relative' }}>
 <Background />
 <div style={{ position:'relative', zIndex:1 }}>
 <Nav lang={lang} onLang={() => setLang(l => l === 'ar' ? 'en' : 'ar')} />

 {/* ════ HERO ════════════════════════════════════════ */}
 <section className="min-h-screen flex items-center px-6 lg:px-12 pt-20 pb-10">
 <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
 <div>
 <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
 <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 text-[12px] font-bold"
 style={{ background:BLUEDIM, border:`1.5px solid rgba(14,165,233,0.3)`, color:BLUE }}>
 <motion.span className="w-2 h-2 rounded-full" style={{ background:BLUE }}
 animate={{ scale:[1,1.4,1], opacity:[1,0.5,1] }} transition={{ duration:2, repeat:Infinity }} />
 متخصصون حصراً في العيادات والمراكز الطبية
 </div>
 </motion.div>

 <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
 transition={{ delay:0.2, duration:0.8, ease:[0.22,1,0.36,1] }}
 className="font-black leading-[1.03] mb-6" style={{ fontSize:'clamp(44px,6.5vw,84px)', color:TEXT }}>
 {lang==='ar' ? <>عيادتك تستحق<br /></> : <>Your clinic deserves<br /></>}
 <span style={{ background:`linear-gradient(135deg,${BLUE} 0%,#38BDF8 50%,#7DD3FC 100%)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
 {lang==='ar' ? <>أفضل تجربة<br />رقمية.</> : <>the best digital<br />experience.</>}
 </span>
 </motion.h1>

 <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.32 }}
 className="text-[18px] font-light leading-relaxed mb-10 max-w-md" style={{ color:MUTED }}>
 {lang==='ar'
 ? <>تطبيق بهويتك + موقع يفوز على جوجل + نظام إدارة — في{' '}<span className="font-black" style={{ color:TEXT }}>٦٠ يوم.</span></>
 : <>Your-branded app + SEO-winning website + management system — in{' '}<span className="font-black" style={{ color:TEXT }}>60 days.</span></>
 }
 </motion.p>

 <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.42 }}
 className="flex flex-wrap gap-3 mb-12">
 <a href="https://wa.me/966551378531" target="_blank" rel="noopener noreferrer"
 className="font-black text-[15px] px-8 py-4 rounded-2xl text-white transition-all active:scale-95"
 style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 8px 32px ${BLUE}40` }}>
 ابدأ مشروع عيادتك
 </a>
 <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
 className="font-bold text-[15px] px-8 py-4 rounded-2xl flex items-center gap-2 transition-all"
 style={{ background:BLUEDIM, border:`2px solid rgba(14,165,233,0.3)`, color:BLUE, backdropFilter:'blur(10px)' }}>
 شاهد الديمو الحي
 </a>
 </motion.div>

 <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55 }}
 className="flex flex-wrap items-center gap-6 p-5 rounded-2xl"
 style={{ background:GLASS, border:`1px solid ${GLASSBORDER}`, backdropFilter:'blur(20px)' }}>
 <div className="flex items-center gap-3">
 <div className="flex -space-x-2 space-x-reverse">
 {['#0EA5E9','#8B5CF6','#10B981','#F59E0B','#EF4444'].map((c,i) => (
 <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-black text-white" style={{ background:c, borderColor:BG }}>
 {['ع','م','ن','خ','ر'][i]}
 </div>
 ))}
 </div>
 <div>
 <p className="text-[13px] font-black" style={{ color:TEXT }}>+٢٠٠ عيادة عميلة</p>
 <div className="flex items-center gap-1">
 {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400 text-[11px]">★</span>)}
 <span className="text-[10px] mr-1" style={{ color:MUTED }}>تثق بتلقا</span>
 </div>
 </div>
 </div>
 <div className="h-8 w-px hidden sm:block" style={{ background:GLASSBORDER }} />
 <div className="flex gap-4 flex-wrap">
 {['iOS + Android','Apple Wallet','Apple Health'].map(b => <span key={b} className="text-[11px] font-bold" style={{ color:DIM }}>{b}</span>)}
 </div>
 </motion.div>
 </div>

 <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }}
 transition={{ delay:0.3, duration:0.9, ease:[0.22,1,0.36,1] }}
 className="flex justify-center pb-12 lg:pb-0">
 <PhoneMockup />
 </motion.div>
 </div>
 </section>

 <Ticker />

 {/* ════ TRUST & SECURITY BAR ══════════════════════ */}
 <div className="px-6 lg:px-12 py-5" style={{ background:'rgba(255,255,255,0.02)', borderBottom:`1px solid ${GLASSBORDER}` }}>
 <div className="max-w-7xl mx-auto">
 <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6">
 {[
 { dot:'#34D399', label: lang==='ar'?'HTTPS · SSL مفعّل':'HTTPS · SSL Active' },
 { dot:'#34D399', label: lang==='ar'?'خوادم داخل المملكة':'Servers inside KSA' },
 { dot:'#34D399', label: lang==='ar'?'AES-256 مشفّر':'AES-256 Encrypted' },
 { dot:'#34D399', label: lang==='ar'?'٠ اختراقات مسجّلة':'0 Breaches Recorded' },
 { dot:'#A78BFA', label: lang==='ar'?'PDPL · HIPAA · ISO 27001':'PDPL · HIPAA · ISO 27001' },
 { dot:'#34D399', label: lang==='ar'?'آخر فحص أمني: منذ ٢ ساعة':'Last audit: 2h ago' },
 ].map((s,i) => (
 <div key={i} className="flex items-center gap-2 shrink-0">
 <motion.span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background:s.dot }}
 animate={{ opacity:[1,0.4,1] }} transition={{ duration:2.4, repeat:Infinity, delay:i*0.3 }} />
 <span className="text-[11px] font-semibold" style={{ color:MUTED }}>{s.label}</span>
 {i < 5 && <span className="hidden lg:block text-[10px]" style={{ color:DIM }}>·</span>}
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* ════ CLIENT LOGOS ═══════════════════════════════ */}
 <section className="py-10 px-6 lg:px-12" style={{ borderBottom:`1px solid ${GLASSBORDER}` }}>
 <div className="max-w-7xl mx-auto">
 <p className="text-center text-[10px] font-black uppercase mb-6" style={{ color:DIM }}>
 {lang==='ar' ? 'يثقون بتلقا للعيادات' : 'Trusted by leading clinics'}
 </p>
 <div className="overflow-hidden">
 <motion.div className="flex gap-8 w-max items-center"
 animate={{ x:['0%','-50%'] }} transition={{ duration:28, ease:'linear', repeat:Infinity }}>
 {[...['مجمع الدكتور سليمان الحبيب','عيادات الشفاء الطبية','مستشفى الحمادي','مجمع النور الطبي','عيادات دار الشفاء','مجمع الرعاية الصحية','عيادات رؤيا الطبية','مستشفى الموسى التخصصي','مجمع الصحة المتكاملة','عيادات المدينة الطبية',
 ...['مجمع الدكتور سليمان الحبيب','عيادات الشفاء الطبية','مستشفى الحمادي','مجمع النور الطبي','عيادات دار الشفاء','مجمع الرعاية الصحية','عيادات رؤيا الطبية','مستشفى الموسى التخصصي','مجمع الصحة المتكاملة','عيادات المدينة الطبية']]].map((name,i) => (
 <div key={i} className="flex items-center gap-2.5 shrink-0 px-6 py-3 rounded-2xl"
 style={{ background:GLASS, border:`1px solid ${GLASSBORDER}`, backdropFilter:'blur(12px)' }}>
 <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[12px] font-black shrink-0"
 style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)` }}>{name[0]}</div>
 <span className="text-[12px] font-semibold whitespace-nowrap" style={{ color:MUTED }}>{name}</span>
 </div>
 ))}
 </motion.div>
 </div>
 </div>
 </section>

 {/* ════ DEMO BANNER ════════════════════════════════ */}
 <section className="px-6 lg:px-12 py-6">
 <div className="max-w-7xl mx-auto">
 <Reveal>
 <div className="p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-5"
 style={{ background:`linear-gradient(135deg,${BLUE}CC,#0284C7CC)`, backdropFilter:'blur(20px)', border:`1px solid ${BLUE}50`, boxShadow:`0 16px 60px ${BLUE}30` }}>
 <div className="flex items-center gap-4 text-white">
 <div className="w-14 h-14 rounded-2xl flex items-center justify-center border" style={{ background:'rgba(255,255,255,0.15)', borderColor:'rgba(255,255,255,0.2)' }}><motion.span className="w-4 h-4 rounded-full bg-white" animate={{ scale:[1,1.3,1], opacity:[1,0.5,1] }} transition={{ duration:2, repeat:Infinity }} /></div>
 <div>
 <p className="text-[18px] font-black">{lang==='ar' ? 'جرّب الديمو الحي — الآن' : 'Try the live demo — now'}</p>
 <p className="text-[13px] opacity-70">{lang==='ar' ? 'تطبيق المريض الكامل + داشبورد المالك · بدون تسجيل' : 'Full patient app + owner dashboard · no signup'}</p>
 </div>
 </div>
 <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
 className="shrink-0 font-black text-[15px] px-8 py-4 rounded-2xl transition-all active:scale-95"
 style={{ background:TEXT, color:BLUE, boxShadow:'0 4px 20px rgba(0,0,0,0.2)' }}>
 {lang==='ar' ? 'افتح الديمو ←' : 'Open Demo →'}
 </a>
 </div>
 </Reveal>
 </div>
 </section>

 {/* ════ PROBLEMS ═══════════════════════════════════ */}
 <section className="py-28 px-6 lg:px-12">
 <div className="max-w-7xl mx-auto">
 <Reveal className="mb-16">
 <p className="text-[11px] font-black mb-5" style={{ color:BLUE }}>لماذا تحتاجنا؟</p>
 <h2 className="font-black leading-tight" style={{ fontSize:'clamp(32px,5.5vw,64px)', color:TEXT }}>
 مشاكل حقيقية.<br /><span style={{ color:DIM }}>حلول تقنية.</span>
 </h2>
 </Reveal>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
 {[
 { icon:'01', n:'01', problem:'المرضى يتصلون للحجز — وأحياناً لا يجدون أحداً', fix:'تطبيق حجز ذكي ٢٤/٧ بدون أي مكالمات', accent:BLUE },
 { icon:'02', n:'02', problem:'نتائج التحاليل ترسل على واتساب بدون سرية', fix:'بوابة نتائج مشفرة مباشرة في تطبيقك', accent:'#8B5CF6' },
 { icon:'03', n:'03', problem:'لا يوجد سجل طبي موحد للمريض عبر الزيارات', fix:'سجل رقمي كامل مرتبط بكل مريض تلقائياً', accent:'#10B981' },
 { icon:'04', n:'04', problem:'المنافسون يظهرون في جوجل وأنت غائب تماماً', fix:'موقع محسّن SEO يجذب مرضى جدد يومياً', accent:'#F59E0B' },
 ].map((item,i) => (
 <Reveal key={i} delay={i*0.07}>
 <Glass accent={item.accent} className="h-full">
 <div className="p-1.5">
 <div className="rounded-2xl p-5 mb-1.5" style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.15)' }}>
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background:GLASS, border:`1px solid ${GLASSBORDER}` }}>{item.icon}</div>
 <div className="flex-1">
 <p className="text-[10px] font-black mb-1 flex items-center gap-1.5" style={{ color:'#F87171' }}>المشكلة</p>
 <p className="text-[14px] leading-snug" style={{ color:'rgba(252,165,165,0.9)' }}>{item.problem}</p>
 </div>
 <span className="text-[10px] font-black" style={{ color:DIM }}>{item.n}</span>
 </div>
 </div>
 <div className="rounded-2xl p-5" style={{ background:`${item.accent}12`, border:`1px solid ${item.accent}25` }}>
 <p className="text-[10px] font-black mb-1 flex items-center gap-1.5" style={{ color:item.accent }}>الحل</p>
 <p className="text-[14px] font-bold" style={{ color:item.accent }}>{item.fix}</p>
 </div>
 </div>
 </Glass>
 </Reveal>
 ))}
 </div>
 </div>
 </section>

 {/* ════ PRODUCTS BENTO ═════════════════════════════ */}
 <section id="المنظومة" className="py-24 px-6 lg:px-12">
 <div className="max-w-7xl mx-auto">
 <Reveal className="mb-14">
 <p className="text-[11px] font-black mb-5" style={{ color:BLUE }}>المنظومة</p>
 <h2 className="font-black leading-tight" style={{ fontSize:'clamp(30px,5vw,60px)', color:TEXT }}>
 ثلاثة منتجات.<br /><span style={{ color:DIM }}>منظومة واحدة.</span>
 </h2>
 </Reveal>
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
 {/* App */}
 <Reveal delay={0} className="lg:col-span-1">
 <Glass accent={BLUE} className="h-full">
 <div className="p-7 h-full flex flex-col">
 <div className="flex items-center gap-3 mb-6">
 <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 8px 24px ${BLUE}40` }}><Smartphone size={22} color="white" strokeWidth={1.75} /></div>
 <div><p className="text-[9px] font-black" style={{ color:BLUE }}>01</p><p className="text-[20px] font-black" style={{ color:TEXT }}>تطبيق المريض</p></div>
 </div>
 <div className="inline-flex px-3 py-1.5 rounded-full text-[10px] font-black mb-6 w-fit" style={{ background:`${BLUE}20`, color:BLUE, border:`1px solid ${BLUE}30` }}>iOS + Android بهوية عيادتك</div>
 <div className="space-y-3 flex-1">
 {[['check','بطاقة مريض QR'],['check','حجز مواعيد ٢٤/٧'],['check','نتائج مشفرة'],['check','تذكيرات أدوية'],['check','Apple Health'],['check','Apple Watch'],['check','Apple & Google Wallet'],['check','إدارة التابعين']].map(([ic,f]) => (
 <div key={f} className="flex items-center gap-3">
 <span className="text-[14px]">{ic}</span>
 <p className="text-[13px]" style={{ color:MUTED }}>{f}</p>
 </div>
 ))}
 </div>
 <div className="mt-6 pt-5" style={{ borderTop:`1px solid ${GLASSBORDER}` }}>
 <span className="text-[12px] font-black" style={{ color:BLUE }}>مشمول في الباقة </span>
 </div>
 </div>
 </Glass>
 </Reveal>

 <div className="lg:col-span-2 flex flex-col gap-5">
 {/* Website */}
 <Reveal delay={0.08}>
 <Glass accent="#8B5CF6">
 <div className="p-7">
 <div className="flex items-center gap-3 mb-5">
 <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,#8B5CF6,#7C3AED)', boxShadow:'0 8px 24px rgba(139,92,246,0.4)' }}><Globe size={22} color="white" strokeWidth={1.75} /></div>
 <div><p className="text-[9px] font-black" style={{ color:'#A78BFA' }}>02</p><p className="text-[20px] font-black" style={{ color:TEXT }}>الموقع الإلكتروني</p></div>
 <div className="mr-auto px-3 py-1.5 rounded-full text-[10px] font-black" style={{ background:'rgba(139,92,246,0.15)', color:'#A78BFA', border:'1px solid rgba(139,92,246,0.25)' }}>SEO متخصص طبي</div>
 </div>
 {/* mini browser */}
 <div className="rounded-2xl overflow-hidden mb-5" style={{ border:`1px solid ${GLASSBORDER}`, background:'rgba(255,255,255,0.03)' }}>
 <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom:`1px solid ${GLASSBORDER}` }}>
 <div className="flex gap-1.5">{['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background:c }} />)}</div>
 <div className="flex-1 rounded-lg px-3 py-1 text-[10px] mx-2" style={{ background:'rgba(255,255,255,0.05)', color:MUTED, border:`1px solid ${GLASSBORDER}` }}>/clinic/dr-khalid</div>
 </div>
 <div className="p-4 flex gap-3">
 <div className="flex-1">
 <div className="h-3 rounded mb-2 w-3/4" style={{ background:'rgba(139,92,246,0.3)' }} />
 <div className="h-2 rounded mb-1.5" style={{ background:'rgba(255,255,255,0.06)' }} />
 <div className="h-2 rounded mb-1.5 w-5/6" style={{ background:'rgba(255,255,255,0.06)' }} />
 <div className="flex gap-2 mt-3">
 <div className="h-7 rounded-lg flex-1" style={{ background:'rgba(139,92,246,0.6)' }} />
 <div className="h-7 rounded-lg flex-1" style={{ background:'rgba(139,92,246,0.15)', border:'1px solid rgba(139,92,246,0.3)' }} />
 </div>
 </div>
 <div className="w-20 h-20 rounded-xl flex items-center justify-center font-black text-[22px]" style={{ background:'rgba(139,92,246,0.15)', color:'#A78BFA' }}>د.</div>
 </div>
 </div>
 <div className="grid grid-cols-4 gap-2">
 {[['search','SEO طبي'],['user','صفحة طبيب'],['calendar','حجز أونلاين'],['star','تقييمات'],['pen','مدونة طبية'],['msg','واتساب'],['link','الموقع'],['chart','تحليلات']].map(([ic,f]) => (
 <div key={f} className="flex items-center gap-1.5 text-[11px] rounded-xl px-2.5 py-2" style={{ background:'rgba(255,255,255,0.04)', border:`1px solid ${GLASSBORDER}`, color:MUTED }}>
 <span>{ic}</span><span>{f}</span>
 </div>
 ))}
 </div>
 </div>
 </Glass>
 </Reveal>

 {/* Dashboard */}
 <Reveal delay={0.14}>
 <Glass accent="#10B981">
 <div className="p-7">
 <div className="flex items-center gap-3 mb-5">
 <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,#10B981,#059669)', boxShadow:'0 8px 24px rgba(16,185,129,0.4)' }}><LayoutDashboard size={22} color="white" strokeWidth={1.75} /></div>
 <div><p className="text-[9px] font-black text-emerald-400">03</p><p className="text-[20px] font-black" style={{ color:TEXT }}>لوحة الإدارة</p></div>
 <div className="mr-auto px-3 py-1.5 rounded-full text-[10px] font-black" style={{ background:'rgba(16,185,129,0.12)', color:'#34D399', border:'1px solid rgba(16,185,129,0.25)' }}>المالك · الفريق · التقارير</div>
 </div>
 {/* mini dashboard */}
 <div className="rounded-2xl p-4 mb-5" style={{ background:'rgba(15,23,42,0.6)', border:`1px solid ${GLASSBORDER}` }}>
 <div className="grid grid-cols-4 gap-2 mb-3">
 {[['١٢','مريض','#38BDF8'],['٨٥٠٠','ريال','#34D399'],['٩٨٪','رضا','#A78BFA'],['٣','تأخير','#FBBF24']].map(([v,l,c]) => (
 <div key={l} className="rounded-xl p-2.5 text-center" style={{ background:`${c}15`, border:`1px solid ${c}20` }}>
 <p className="text-[13px] font-black" style={{ color:c }}>{v}</p>
 <p className="text-[8px] opacity-50 text-white">{l}</p>
 </div>
 ))}
 </div>
 <div className="flex items-end gap-1.5 h-12">
 {[40,65,45,80,55,90,70,85,60,75].map((h,i) => (
 <div key={i} className="flex-1 rounded-t" style={{ height:`${h}%`, background:`rgba(16,185,129,${0.2+h/200})` }} />
 ))}
 </div>
 </div>
 <div className="grid grid-cols-4 gap-2">
 {[['$','إيرادات'],['Q','طابور'],['T','جداول'],['R','تقارير'],['F','فريق'],['I','تأمين'],['N','إشعارات'],['S','أمان']].map(([ic,f]) => (
 <div key={f} className="flex items-center gap-1.5 text-[11px] rounded-xl px-2.5 py-2" style={{ background:'rgba(255,255,255,0.04)', border:`1px solid ${GLASSBORDER}`, color:MUTED }}>
 <span>{ic}</span><span>{f}</span>
 </div>
 ))}
 </div>
 </div>
 </Glass>
 </Reveal>
 </div>
 </div>

 {/* demo CTA */}
 <Reveal delay={0.2} className="mt-5">
 <Glass accent={BLUE}>
 <div className="p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
 <div className="flex items-center gap-5">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background:`${BLUE}20`, border:`1px solid ${BLUE}30` }}><Play size={26} color={BLUE} strokeWidth={1.75} /></div>
 <div>
 <p className="font-black text-[20px] mb-1" style={{ color:TEXT }}>{t.demoCta}</p>
 <p className="text-[14px]" style={{ color:MUTED }}>{t.demoSub}</p>
 </div>
 </div>
 <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
 className="shrink-0 font-black text-[15px] px-10 py-4 rounded-2xl text-white transition-all active:scale-95"
 style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 8px 28px ${BLUE}40` }}>
 {t.openDemo}
 </a>
 </div>
 </Glass>
 </Reveal>
 </div>
 </section>

 {/* ════ ENTERPRISE ═════════════════════════════════ */}
 <section className="py-28 px-6 lg:px-12">
 <div className="max-w-7xl mx-auto">
 <Reveal className="mb-14">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black mb-6"
 style={{ background:'rgba(139,92,246,0.12)', border:'1px solid rgba(139,92,246,0.25)', color:'#A78BFA' }}>
 {lang==='ar' ? 'للمجموعات الطبية الكبيرة' : 'Enterprise Healthcare'}
 </div>
 <h2 className="font-black leading-tight mb-5" style={{ fontSize:'clamp(30px,5vw,60px)', color:TEXT }}>
 {lang==='ar' ? <>١٠ عيادات؟ ١٠٠؟<br /><span style={{ color:DIM }}>لا فرق — نظام واحد.</span></> : <>10 clinics? 100?<br /><span style={{ color:DIM }}>One system scales all.</span></>}
 </h2>
 <p style={{ color:MUTED }} className="text-[16px] max-w-xl leading-relaxed">
 {lang==='ar' ? 'بنية enterprise مصممة للمجموعات الطبية الكبرى — إدارة موحدة لكل الفروع والأطباء والمرضى من لوحة واحدة.' : 'Enterprise-grade architecture built for large healthcare groups — unified management across all branches from a single dashboard.'}
 </p>
 </Reveal>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
 {[
 { icon:'gitbranch', title: lang==='ar' ? 'إدارة متعددة الفروع' : 'Multi-Branch Management', desc: lang==='ar' ? 'لوحة تحكم مركزية لجميع الفروع مع صلاحيات مخصصة لكل مستوى إداري' : 'Centralized dashboard across all branches with role-based permissions per management level', accent:'#8B5CF6' },
 { icon:'layers', title: lang==='ar' ? 'White-Label كامل' : 'Full White-Label', desc: lang==='ar' ? 'اسمك وشعارك ولونك فقط — تلقا غير مرئية للمرضى والموظفين' : 'Your brand only — Talqa is invisible to patients and staff', accent:BLUE },
 { icon:'plug', title: lang==='ar' ? 'API Enterprise' : 'Enterprise API', desc: lang==='ar' ? 'REST API كاملة + Webhooks لتكامل مع أي نظام HIS أو ERP موجود' : 'Full REST API + Webhooks for seamless integration with any existing HIS or ERP', accent:'#10B981' },
 { icon:'barchart', title: lang==='ar' ? 'تقارير مجموعات' : 'Group Analytics', desc: lang==='ar' ? 'مقارنة أداء الفروع والأطباء والإيرادات مع تقارير قابلة للتصدير' : 'Cross-branch performance, doctor KPIs, and revenue with exportable reports', accent:'#F59E0B' },
 { icon:'shieldcheck', title: lang==='ar' ? 'SLA مضمون ٩٩.٩٪' : '99.9% SLA Guarantee', desc: lang==='ar' ? 'اتفاقية مستوى خدمة مكتوبة مع تعويض تلقائي عند أي انقطاع' : 'Written SLA with automatic compensation for any downtime — enterprise grade uptime', accent:'#EF4444' },
 { icon:'usercheck', title: lang==='ar' ? 'مدير حساب مخصص' : 'Dedicated Account Manager', desc: lang==='ar' ? 'مدير حساب محترف متاح مباشرة — لا خطوط ساخنة ولا بوتات' : 'A dedicated professional account manager accessible directly — no hotlines, no bots', accent:'#8B5CF6' },
 ].map((s,i) => (
 <Reveal key={i} delay={i*0.06}>
 <Glass accent={s.accent} className="h-full cursor-default">
 <div className="p-6 h-full flex flex-col">
  <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[11px] font-black mb-4" style={{ background:`${s.accent}18`, border:`1px solid ${s.accent}35`, color:s.accent }}>{s.icon}</div>
 <p className="text-[15px] font-black mb-2" style={{ color:TEXT }}>{s.title}</p>
 <p className="text-[12px] leading-relaxed flex-1" style={{ color:MUTED }}>{s.desc}</p>
 </div>
 </Glass>
 </Reveal>
 ))}
 </div>
 <Reveal delay={0.1}>
 <Glass accent="#8B5CF6">
 <div className="p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
 <div>
 <p className="font-black text-[18px] mb-1" style={{ color:TEXT }}>
 {lang==='ar' ? 'هل تدير أكثر من ٣ عيادات؟' : 'Managing more than 3 clinics?'}
 </p>
 <p style={{ color:MUTED }} className="text-[13px]">
 {lang==='ar' ? 'تحدث مع فريق Enterprise لعرض مخصص' : 'Talk to our Enterprise team for a custom quote'}
 </p>
 </div>
 <a href="https://wa.me/966551378531" target="_blank" rel="noopener noreferrer"
 className="shrink-0 font-black text-[14px] px-8 py-4 rounded-2xl text-white transition-all active:scale-95"
 style={{ background:'linear-gradient(135deg,#8B5CF6,#6D28D9)', boxShadow:'0 8px 28px rgba(139,92,246,0.4)' }}>
 {lang==='ar' ? 'تواصل مع Enterprise ←' : 'Contact Enterprise ←'}
 </a>
 </div>
 </Glass>
 </Reveal>
 </div>
 </section>

 {/* ════ STATS ══════════════════════════════════════ */}
 <section className="py-20 px-6" style={{ borderTop:`1px solid ${GLASSBORDER}`, borderBottom:`1px solid ${GLASSBORDER}` }}>
 <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
 <Stat target={200} suffix="+" label={lang==='ar' ? 'عيادة ومركز طبي' : 'Clinics & medical centers'} />
 <Stat target={60} suffix={lang==='ar' ? ' يوم' : ' days'} label={lang==='ar' ? 'متوسط التسليم' : 'avg. delivery'} />
 <Stat target={97} suffix="٪" label={lang==='ar' ? 'رضا العملاء' : 'client satisfaction'} />
 <Stat target={24} suffix="/٧" label={lang==='ar' ? 'دعم فني متواصل' : 'support available'} />
 </div>
 </section>

 {/* ════ TECH STACK ═════════════════════════════════ */}
 <section className="py-28 px-6 lg:px-12">
 <div className="max-w-7xl mx-auto">
 <Reveal className="mb-14">
 <p className="text-[11px] font-black mb-5" style={{ color:BLUE }}>
 {lang==='ar' ? 'البنية التقنية' : 'Technology'}
 </p>
 <h2 className="font-black leading-tight" style={{ fontSize:'clamp(28px,5vw,58px)', color:TEXT }}>
 {lang==='ar' ? <>تقنية حديثة.<br /><span style={{ color:DIM }}>بنية موثوقة.</span></> : <>Modern technology.<br /><span style={{ color:DIM }}>Reliable architecture.</span></>}
 </h2>
 </Reveal>

 {/* Tech grid */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
 {[
 { label:'React Native', sub:lang==='ar'?'iOS + Android':'iOS + Android', icon:'smartphone', color:BLUE },
 { label:'WebSockets', sub:lang==='ar'?'تحديثات فورية':'Real-time updates', icon:'zap', color:'#EF4444' },
 { label:'REST APIs', sub:lang==='ar'?'تكامل سلس':'Seamless integration', icon:'plug', color:'#8B5CF6' },
 { label:'Push Notifications', sub:lang==='ar'?'إشعارات فورية':'Instant alerts', icon:'bell', color:'#F59E0B' },
 { label:'Apple Health', sub:lang==='ar'?'مزامنة صحية':'Health sync', icon:'heart', color:'#10B981' },
 { label:'Apple Wallet', sub:lang==='ar'?'بطاقة رقمية':'Digital card', icon:'creditcard', color:BLUE },
 { label:'WhatsApp API', sub:lang==='ar'?'تواصل مباشر':'Direct messaging', icon:'message', color:'#10B981' },
 { label:'Cloud Hosting', sub:lang==='ar'?'استضافة موثوقة':'Reliable hosting', icon:'cloud', color:'#A78BFA' },
 ].map((t,i) => (
 <Reveal key={i} delay={i*0.04}>
 <Glass accent={t.color} className="cursor-default">
 <div className="p-5 text-center">
  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3 mx-auto" style={{ background:`${t.color}18`, border:`1px solid ${t.color}35` }}><IconBox name={t.icon} size={20} color={t.color} /></div>
 <p className="text-[13px] font-black mb-1" style={{ color:t.color }}>{t.label}</p>
 <p className="text-[10px]" style={{ color:MUTED }}>{t.sub}</p>
 </div>
 </Glass>
 </Reveal>
 ))}
 </div>
 </div>
 </section>

 {/* ════ HOW WE WORK ════════════════════════════════ */}
 <section id="process" className="py-28 px-6 lg:px-12">
 <div className="max-w-7xl mx-auto">
 <Reveal className="mb-16">
 <p className="text-[11px] font-black mb-5" style={{ color:BLUE }}>{t.processBadge}</p>
 <h2 className="font-black leading-tight" style={{ fontSize:'clamp(30px,5vw,60px)', color:TEXT }}>
 {t.processHeading1}<br /><span style={{ color:DIM }}>{t.processHeading2}</span>
 </h2>
 </Reveal>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
 {[
 { num:'١', label: lang==='ar'?'الاستشارة':'Discovery', days: lang==='ar'?'يوم ١–٣':'Day 1–3', desc: lang==='ar'?'نفهم عيادتك وأهدافك ونضع خطة تفصيلية مخصصة.':'We understand your clinic and goals, then build a tailored plan.', accent:BLUE },
 { num:'٢', label: lang==='ar'?'التصميم':'Design', days: lang==='ar'?'يوم ٤–١٤':'Day 4–14', desc: lang==='ar'?'نصمم الهوية والشاشات وتوافق قبل البرمجة.':'We design identity, screens, and get your sign-off before coding.', accent:'#8B5CF6' },
 { num:'٣', label: lang==='ar'?'البرمجة':'Build', days: lang==='ar'?'يوم ١٥–٥٠':'Day 15–50', desc: lang==='ar'?'نبني التطبيق والموقع والنظام بأعلى معايير.':'We build the app, website and system to the highest standards.', accent:'#F59E0B' },
 { num:'٤', label: lang==='ar'?'الإطلاق':'Launch', days: lang==='ar'?'يوم ٥١–٦٠':'Day 51–60', desc: lang==='ar'?'نشر في المتجرين + تدريب الفريق + دعم كامل.':'Store publishing + team training + full support included.', accent:'#10B981' },
 ].map((s,i) => (
 <Reveal key={i} delay={i*0.09}>
 <Glass accent={s.accent} className="h-full">
 <div className="p-7 h-full flex flex-col">
 <div className="flex items-center justify-between mb-6">
 <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-[24px]" style={{ background:`${s.accent}18`, border:`1.5px solid ${s.accent}35`, color:s.accent }}>{s.num}</div>
 <span className="font-black text-[40px] leading-none" style={{ color:`${s.accent}18` }}>{s.num}</span>
 </div>
 <div className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black mb-4 w-fit" style={{ background:`${s.accent}15`, color:s.accent, border:`1px solid ${s.accent}25` }}>{s.days}</div>
 <p className="text-[18px] font-black mb-3" style={{ color:TEXT }}>{s.label}</p>
 <p className="text-[13px] leading-relaxed flex-1" style={{ color:MUTED }}>{s.desc}</p>
 </div>
 </Glass>
 </Reveal>
 ))}
 </div>
 </div>
 </section>

 {/* ════ FEATURES ═══════════════════════════════════ */}
 <section id="المميزات" className="py-24 px-6 lg:px-12">
 <div className="max-w-7xl mx-auto">
 <Reveal className="mb-14">
 <p className="text-[11px] font-black mb-5" style={{ color:BLUE }}>{t.featuresBadge}</p>
 <h2 className="font-black leading-tight" style={{ fontSize:'clamp(28px,5vw,58px)', color:TEXT }}>
 {t.featuresHeading1}<br /><span style={{ color:DIM }}>{t.featuresHeading2}</span>
 </h2>
 </Reveal>
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
 {[
 ['qr','بطاقة رقمية','QR فوري',BLUE],
 ['calendar','حجز مواعيد','٢٤/٧',BLUE],
 ['results','نتائج','للهاتف مباشرة','#8B5CF6'],
 ['pill','تذكير أدوية','إشعارات','#8B5CF6'],
 ['heart','Apple Health','مزامنة','#EF4444'],
 ['applewatch','Apple Watch','مؤشرات','#94A3B8'],
 ['users','التابعون','العائلة','#F59E0B'],
 ['wallet','Wallet','رقمية','#10B981'],
 ['folder','السجل الطبي','موحد',BLUE],
 ['activity','أمراض مزمنة','سكر · ضغط','#EF4444'],
 ['barchart','لوحة المالك','تقارير','#10B981'],
 ['globe','موقع طبي','SEO','#8B5CF6'],
 ['message','واتساب آلي','تذكير','#10B981'],
 ['shield','خصوصية تامة','بياناتك ملكك','#F59E0B'],
 ['puzzle','تكامل HIS','أنظمة','#94A3B8'],
 ].map(([icon,title,sub,accent],i) => (
 <Reveal key={i} delay={i*0.02}>
 <Glass accent={accent} className="cursor-default">
 <div className="p-5 text-center">
 <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3 mx-auto" style={{ background:`${accent}18`, border:`1px solid ${accent}30` }}><IconBox name={icon} size={20} color={accent} /></div>
 <p className="text-[12px] font-black mb-0.5" style={{ color:TEXT }}>{title}</p>
 <p className="text-[10px]" style={{ color:MUTED }}>{sub}</p>
 </div>
 </Glass>
 </Reveal>
 ))}
 </div>
 </div>
 </section>

 {/* ════ WHY DIGITAL ════════════════════════════════ */}
 <section className="py-28 px-6 lg:px-12">
 <div className="max-w-7xl mx-auto">
 <Reveal className="mb-14">
 <p className="text-[11px] font-black mb-5" style={{ color:BLUE }}>
 {lang==='ar' ? 'لماذا رقمي؟' : 'Why digital?'}
 </p>
 <h2 className="font-black leading-tight" style={{ fontSize:'clamp(30px,5vw,60px)', color:TEXT }}>
 {lang==='ar' ? <>عيادتك بدون نظام<br /><span style={{ color:DIM }}>= مرضى يذهبون للمنافس.</span></> : <>Without a system,<br /><span style={{ color:DIM }}>patients go to your competition.</span></>}
 </h2>
 </Reveal>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 {[
 { icon:'phonemissed', title: lang==='ar'?'لا ردّ = مريض راح':'No reply = lost patient', desc: lang==='ar'?'المريض يتصل ولا يحد يرد — يروح للمنافس. نظام الحجز الإلكتروني يستقبل ٢٤/٧ بدون موظف.':'Patient calls, no answer — goes to the competition. Online booking captures them 24/7.', accent:'#EF4444' },
 { icon:'filex', title: lang==='ar'?'ملف ورقي = وقت ضائع':'Paper files = wasted time', desc: lang==='ar'?'الدكتور يقضي ١٠ دقائق يدور على ملف المريض. رقمياً — يفتحه في ثانية.':'The doctor spends 10 minutes searching for a file. Digitally — it opens in a second.', accent:'#F59E0B' },
 { icon:'userx', title: lang==='ar'?'بلا متابعة = بلا عودة':'No follow-up = no return', desc: lang==='ar'?'٧٠٪ من المرضى لا يعودون لأنهم ينسون. تذكير واتساب تلقائي يجيبهم بدون جهد.':'70% of patients do not return because they forget. Auto WhatsApp reminders bring them back effortlessly.', accent:BLUE },
 ].map((s,i) => (
 <Reveal key={i} delay={i*0.07}>
 <Glass accent={s.accent} className="h-full cursor-default">
 <div className="p-6">
  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl font-black text-[15px] mb-4" style={{ background:`${s.accent}18`, border:`1px solid ${s.accent}35`, color:s.accent }}>{s.icon}</div>
 <p className="text-[15px] font-black mb-2" style={{ color:TEXT }}>{s.title}</p>
 <p className="text-[13px] leading-relaxed" style={{ color:MUTED }}>{s.desc}</p>
 </div>
 </Glass>
 </Reveal>
 ))}
 </div>
 </div>
 </section>

 {/* ════ SECURITY ═══════════════════════════════════ */}
 <section id="الأمان" className="py-28 px-6 lg:px-12">
 <div className="max-w-7xl mx-auto">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
 <Reveal>
 <p className="text-[11px] font-black mb-5" style={{ color:BLUE }}>{t.securityBadge}</p>
 <h2 className="font-black leading-tight mb-5" style={{ fontSize:'clamp(30px,5vw,60px)', color:TEXT }}>
 {t.securityHeading1}<br />{t.securityHeading2}
 </h2>
 <p className="text-[16px] leading-relaxed mb-8" style={{ color:MUTED }}>{lang==='ar' ? 'أمان عسكري المستوى مصمّم للقطاع الصحي. بنية تقنية — ليست وعوداً.' : 'Military-grade security engineered for healthcare. Real architecture — not promises.'}</p>
 <div className="flex flex-wrap gap-3">
 {['HIPAA','ISO 27001','AES-256','NDMO','SOC 2','PDPL'].map(b => (
 <div key={b} className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold cursor-default"
 style={{ background:GLASS, border:`1px solid ${GLASSBORDER}`, color:MUTED, backdropFilter:'blur(10px)' }}>
 <span style={{ color:BLUE }}></span> {b}
 </div>
 ))}
 </div>
 </Reveal>
 <Reveal delay={0.1}>
 <div className="p-6 rounded-3xl" style={{ background:'rgba(15,23,42,0.8)', border:`1px solid ${GLASSBORDER}`, backdropFilter:'blur(20px)', boxShadow:'0 32px 80px rgba(0,0,0,0.5)' }}>
 <div className="flex items-center gap-2 mb-5">
 <div className="flex gap-1.5">{['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background:c }} />)}</div>
 <span className="text-[10px] font-mono mr-auto" style={{ color:DIM }}>security-audit.log</span>
 </div>
 <div className="space-y-2 font-mono text-[11px]">
 {[
 ['[INFO]','#38BDF8','AES-256 encryption: ACTIVE'],
 ['[OK]','#34D399','Zero-knowledge architecture: VERIFIED'],
 ['[OK]','#34D399','HIPAA compliance: PASSED'],
 ['[OK]','#34D399','ISO 27001 audit: PASSED'],
 ['[OK]','#34D399','PDPL compliance: VERIFIED'],
 ['[SCAN]','#A78BFA','AI threat detection: RUNNING'],
 ['[OK]','#34D399','Last backup: 3h ago'],
 ['[ALERT]','#FBBF24','Zero breaches recorded: '],
 ].map(([tag,c,msg],i) => (
 <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
 transition={{ delay:0.8+i*0.1 }} className="flex items-center gap-3" dir="ltr">
 <span className="shrink-0 font-bold" style={{ color:c }}>{tag}</span>
 <span className="text-[10px]" style={{ color:'rgba(255,255,255,0.4)' }}>{msg}</span>
 </motion.div>
 ))}
 </div>
 </div>
 </Reveal>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {[
 { icon:'lock', title: lang==='ar'?'تشفير AES-256 كامل':'Full AES-256 Encryption', desc: lang==='ar'?'نفس معيار وزارات الدفاع. لا أحد يقرأ بيانات مرضاك إلا المخوّلون.':'Same standard as defense ministries. Only authorized personnel access patient data.', accent:BLUE },
 { icon:'key', title:'Zero-Knowledge', desc: lang==='ar'?'مفتاح التشفير ملكك — حتى فريق تلقا لا يستطيع رؤية بياناتك.':'Your encryption key is yours — even the Talqa team cannot read your data.', accent:'#8B5CF6' },
 { icon:'fingerprint', title: lang==='ar'?'مصادقة ثلاثية':'3-Factor Auth', desc: lang==='ar'?'Face ID + بصمة + رمز تحقق. لا وصول بدون إذنك.':'Face ID + fingerprint + OTP. No access without your permission.', accent:'#10B981' },
 { icon:'hdd', title: lang==='ar'?'نسخ كل ٦ ساعات':'Backup every 6 hours', desc: lang==='ar'?'مراكز بيانات موزعة مشفرة محمية من الكوارث.':'Distributed encrypted data centers protected against disasters.', accent:'#F59E0B' },
 { icon:'eye', title: lang==='ar'?'مراقبة بالذكاء الاصطناعي':'AI Threat Monitoring', desc: lang==='ar'?'يرصد أي نشاط غريب ويوقفه فوراً.':'Detects and blocks any unusual activity in real time.', accent:'#EF4444' },
 { icon:'filecheck', title: lang==='ar'?'PDPL سعودي':'Saudi PDPL', desc: lang==='ar'?'مطابق لنظام حماية البيانات ولوائح الحكومة الرقمية.':'Fully compliant with Saudi data protection regulations and Digital Government Authority.', accent:BLUE },
 ].map((s,i) => (
 <Reveal key={i} delay={i*0.05}>
 <Glass accent={s.accent} className="h-full cursor-default">
 <div className="p-6">
  <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[11px] font-black mb-4" style={{ background:`${s.accent}18`, border:`1px solid ${s.accent}35`, color:s.accent }}>{s.icon}</div>
 <p className="text-[15px] font-black mb-2" style={{ color:TEXT }}>{s.title}</p>
 <p className="text-[12px] leading-relaxed" style={{ color:MUTED }}>{s.desc}</p>
 </div>
 </Glass>
 </Reveal>
 ))}
 </div>

 <Reveal delay={0.1} className="mt-5">
 <Glass accent={BLUE}>
 <div className="p-7 flex flex-col sm:flex-row items-center gap-6">
 <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background:`${BLUE}15`, border:`1px solid ${BLUE}30` }}><ShieldCheck size={30} color={BLUE} strokeWidth={1.75} /></div>
 <div className="flex-1 text-center sm:text-right">
 <p className="font-black text-[20px] mb-1" style={{ color:TEXT }}>{lang==='ar'?'بياناتك ملكك — نحن لا نراها.':'Your data is yours — we cannot see it.'}</p>
 <p className="text-[14px]" style={{ color:MUTED }}>{lang==='ar'?'لم يُسجَّل أي اختراق منذ التأسيس. هندسة تقنية متكاملة.':'Zero breaches recorded since founding. Integrated technical architecture.'}</p>
 </div>
 <div className="flex gap-8 shrink-0">
 {(lang==='ar'?[['٠','اختراقات'],['١٠٠٪','تشفير'],['٢٤/٧','مراقبة']]:[['0','breaches'],['100%','encrypted'],['24/7','monitored']]).map(([v,l]) => (
 <div key={l} className="text-center">
 <p className="font-black leading-none" style={{ fontSize:'clamp(24px,3vw,36px)', color:BLUE }}>{v}</p>
 <p className="text-[10px] mt-1" style={{ color:MUTED }}>{l}</p>
 </div>
 ))}
 </div>
 </div>
 </Glass>
 </Reveal>

 <Reveal delay={0.15} className="mt-5">
 <Glass accent={BLUE}>
 <div className="p-7">
 <p className="font-black text-[14px] mb-6 text-center" style={{ color:MUTED }}>
 {lang==='ar' ? 'اعتمادات الامتثال العالمي' : 'Global Compliance Certifications'}
 </p>
 <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
 {[
 { badge:'HIPAA', sub:lang==='ar'?'حماية صحية أمريكية':'US Health Privacy', color:'#38BDF8' },
 { badge:'GDPR', sub:lang==='ar'?'خصوصية أوروبية':'EU Data Privacy', color:'#A78BFA' },
 { badge:'ISO 27001', sub:lang==='ar'?'أمن معلومات':'Information Security', color:'#34D399' },
 { badge:'SOC 2', sub:lang==='ar'?'أمن خدمات':'Service Security', color:'#FBBF24' },
 { badge:'NDMO', sub:lang==='ar'?'حكومة رقمية سعودية':'Saudi Digital Gov', color:'#38BDF8' },
 { badge:'PDPL', sub:lang==='ar'?'بيانات شخصية سعودية':'Saudi Data Protection', color:'#34D399' },
 ].map((c,i) => (
 <motion.div key={i} initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.05*i }}
 className="flex flex-col items-center gap-2 p-4 rounded-2xl cursor-default"
 style={{ background:`${c.color}10`, border:`1px solid ${c.color}25` }}>
 <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background:`${c.color}20` }}>
 <span className="text-[13px] font-black" style={{ color:c.color }}></span>
 </div>
 <p className="text-[11px] font-black text-center leading-tight" style={{ color:c.color }}>{c.badge}</p>
 <p className="text-[9px] text-center leading-snug" style={{ color:MUTED }}>{c.sub}</p>
 </motion.div>
 ))}
 </div>
 </div>
 </Glass>
 </Reveal>
 </div>
 </section>

 {/* ════ TESTIMONIALS ═══════════════════════════════ */}
 <section className="py-24 px-6 lg:px-12">
 <div className="max-w-7xl mx-auto">
 <Reveal className="mb-14">
 <h2 className="font-black leading-tight" style={{ fontSize:'clamp(30px,5vw,60px)', color:TEXT }}>عيادات تثق. نتائج تتكلم.</h2>
 </Reveal>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
 {[
 { name:'عيادة الشفاء', city:'الرياض', av:'ع', accent:BLUE, quote:'في أول أسبوع من الإطلاق، انخفضت مكالمات الحجز ٧٥٪. الموظفون كانوا في صدمة من الفرق.' },
 { name:'مجمع النور الطبي', city:'جدة', av:'م', accent:'#8B5CF6', quote:'المرضى يسألون: "عندكم تطبيق؟" قبل ما يسألون عن الأطباء. صرنا مرجع في المنطقة.' },
 { name:'مستشفى الرعاية', city:'أبها', av:'ر', accent:'#10B981', quote:'تعاملنا مع ثلاث شركات قبلهم. تلقا هم الوحيدون اللي أعطونا HIPAA حقيقي لا وعداً فارغاً.' },
 ].map((t,i) => (
 <Reveal key={i} delay={i*0.08}>
 <Glass accent={t.accent} className="h-full">
 <div className="p-7 h-full flex flex-col">
 <div className="text-[40px] font-black leading-none mb-4" style={{ color:t.accent, opacity:0.25, fontFamily:'serif' }}>"</div>
 <div className="flex mb-4">{[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-[15px]">★</span>)}</div>
 <p className="text-[16px] leading-relaxed flex-1 mb-6" style={{ color:MUTED }}>{t.quote}</p>
 <div className="flex items-center gap-3 pt-5" style={{ borderTop:`1px solid ${GLASSBORDER}` }}>
 <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-black text-white shrink-0"
 style={{ background:`linear-gradient(135deg,${t.accent},${t.accent}CC)`, boxShadow:`0 4px 16px ${t.accent}40` }}>{t.av}</div>
 <div>
 <p className="text-[14px] font-black" style={{ color:TEXT }}>{t.name}</p>
 <p className="text-[12px]" style={{ color:MUTED }}>{t.city}</p>
 </div>
 </div>
 </div>
 </Glass>
 </Reveal>
 ))}
 </div>
 </div>
 </section>

 {/* ════ APPLE WALLET ═══════════════════════════════ */}
 <section className="py-28 px-6 lg:px-12 overflow-hidden">
 <div className="max-w-7xl mx-auto">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 {/* Text side */}
 <Reveal>
 <p className="text-[11px] font-black mb-5" style={{ color:BLUE }}>
 {lang==='ar'?'Apple Wallet':'Apple Wallet'}
 </p>
 <h2 className="font-black leading-tight mb-6" style={{ fontSize:'clamp(32px,5vw,60px)', color:TEXT }}>
 {lang==='ar'?<>مريضك يحمل<br /><span style={{ color:BLUE }}>عيادتك في جيبه.</span></>:<>Your patient carries<br /><span style={{ color:BLUE }}>your clinic in their pocket.</span></>}
 </h2>
 <p className="text-[16px] leading-relaxed mb-8" style={{ color:MUTED }}>
 {lang==='ar'
 ?'بطاقة المريض الرقمية تُضاف مباشرة لـ Apple Wallet — مع عداد تنازلي يذكّره بموعده القادم ويحفّزه على الرجوع قبل انتهاء الصلاحية.'
 :'The digital patient card goes straight to Apple Wallet — with a countdown timer that reminds patients of their next visit and motivates them to return before expiry.'}
 </p>
 <div className="space-y-2.5 mb-10">
 {[
  { txt: lang==='ar'?'بضغطة واحدة — ينزل مباشرة في المحفظة':'One tap — downloads directly to Wallet' },
  { txt: lang==='ar'?'عداد تنازلي يحفّز المريض على العودة':'Countdown timer motivates return visits' },
  { txt: lang==='ar'?'إشعار تلقائي قبل انتهاء الصلاحية':'Auto-notification before expiry' },
  { txt: lang==='ar'?'بيانات المريض مشفّرة ومحمية':'Patient data encrypted and protected' },
  { txt: lang==='ar'?'Apple Watch — إشعار الموعد على الرسغ مباشرة':'Apple Watch — appointment alert on your wrist', badge: lang==='ar'?'قريباً':'Soon', green:true },
  { txt: lang==='ar'?'Google Wallet — لمستخدمي Android':'Google Wallet — for Android users', badge: lang==='ar'?'قريباً':'Soon' },
 ].map(({ txt, badge, green }) => (
  <div key={txt} className="flex items-center gap-3">
  <CircleCheck size={16} strokeWidth={2.5} className="shrink-0" style={{ color: green ? '#34C759' : BLUE }}/>
  <span className="text-[14px] font-semibold" style={{ color:TEXT }}>{txt}</span>
  {badge && <span className="text-[10px] font-black px-2 py-0.5 rounded-full shrink-0" style={{ background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.35)', border:'1px solid rgba(255,255,255,0.12)' }}>{badge}</span>}
  </div>
 ))}
 </div>
 <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
 className="inline-flex items-center gap-2 font-bold text-[14px] px-6 py-3.5 rounded-2xl transition-all"
 style={{ background:BLUEDIM, border:`1.5px solid ${BLUE}40`, color:BLUE }}>
 {lang==='ar'?'جرّب في الديمو ←':'Try it in Demo ←'}
 </a>
 </Reveal>

 {/* Wallet card visual */}
 <Reveal delay={0.15}>
 <div className="relative flex flex-col items-center">
 {/* Phone frame */}
 <div className="relative w-[280px] mx-auto">
 {/* Ambient glow */}
 <div className="absolute -inset-8 rounded-[60px] blur-[40px] pointer-events-none"
 style={{ background:`radial-gradient(circle,${BLUE}18 0%,transparent 70%)` }} />

 {/* iOS sheet mock */}
 <div className="relative rounded-[32px] overflow-hidden" style={{ background:'#1C1C1E', boxShadow:'0 32px 80px rgba(0,0,0,0.6)', border:'8px solid #2C2C2E' }}>
 {/* Status bar */}
 <div className="flex items-center justify-between px-4 pt-2 pb-1" style={{ background:'#1C1C1E' }}>
 <span className="text-white text-[10px] font-semibold">9:41</span>
 <div className="w-16 h-4 rounded-full" style={{ background:'#000', border:'2px solid #2C2C2E' }} />
 <div className="flex items-center gap-1">
 <div className="w-3 h-2 rounded-sm bg-white/60" />
 <div className="w-1 h-1.5 rounded-sm bg-white/40" />
 </div>
 </div>

 {/* Wallet header */}
 <div className="px-4 py-3 flex items-center justify-between" style={{ background:'#1C1C1E' }}>
 <span className="text-white/50 text-[13px]">إلغاء</span>
 <span className="text-white font-semibold text-[15px]">إضافة إلى Wallet</span>
 <div style={{ width:32 }} />
 </div>

 {/* Pass card */}
 <div className="mx-3 mb-3 rounded-[18px] overflow-hidden" style={{ boxShadow:'0 8px 24px rgba(0,0,0,0.4)' }}>
 {/* Card header */}
 <div className="px-4 pt-4 pb-3 relative" style={{ background:'linear-gradient(135deg,#06101E,#0B3A5A)' }}>
 <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at 80% 20%,rgba(0,180,216,0.25) 0%,transparent 60%)' }}/>
 <div className="relative z-10 flex items-start justify-between">
 <div>
  <div className="flex items-center gap-1.5 mb-1.5"><TalqaShieldSmall size={11} /><p className="text-white/50 text-[8px] font-bold">عيادة الشفاء الطبية</p></div>
 <p className="text-white text-[18px] font-black leading-none">بطاقة مريض</p>
 <p className="text-white/30 text-[7px] mt-0.5">DIGITAL HEALTH CARD</p>
 </div>
 <motion.div
 animate={{ opacity:[1,0.4,1] }}
 transition={{ duration:1, repeat:Infinity }}
 className="px-2.5 py-1 rounded-full"
 style={{ background:'rgba(239,68,68,0.2)', border:'1px solid rgba(239,68,68,0.4)' }}>
 <p className="text-[9px] font-black text-red-300">٣ أيام متبقية</p>
 </motion.div>
 </div>
 </div>
 {/* Card body */}
 <div className="bg-white px-4 py-3">
 <p className="text-[8px] text-[#8E8E93] mb-0.5 uppercase">Patient</p>
 <p className="text-[16px] font-black text-[#1C1C1E] mb-2">أحمد ناصر الشمري</p>
 <div className="grid grid-cols-3 gap-1.5 mb-3">
 {[['#PT-0842','Patient ID'],['O+','Blood'],['٣ أيام','Expires']].map(([v,l])=>(
 <div key={l} className="bg-[#F2F2F7] rounded-[8px] px-2 py-1.5">
 <p className="text-[6px] text-[#8E8E93] uppercase mb-0.5">{l}</p>
 <p className="text-[10px] font-bold text-[#1C1C1E]">{v}</p>
 </div>
 ))}
 </div>
 {/* Expiry bar */}
 <div className="h-1 rounded-full bg-[#F2F2F7] overflow-hidden mb-2">
 <motion.div className="h-full rounded-full bg-red-400"
 initial={{ width:'100%' }} animate={{ width:'43%' }} transition={{ duration:1.5, delay:0.5, ease:'easeOut' }} />
 </div>
 <p className="text-[8px] text-[#8E8E93]">ينتهي خلال ٣ أيام — جدد موعدك الآن</p>
 </div>
 {/* Card footer */}
 <div className="px-4 py-2 flex items-center gap-1.5" style={{ background:'#F9F9F9', borderTop:'1px solid #E5E5EA' }}>
 <div className="w-2 h-2 rounded-full bg-red-400" />
 <p className="text-[8px] text-[#8E8E93]">تنتهي الصلاحية قريباً</p>
 </div>
 </div>

 </div>
 </div>

 {/* Wallet buttons — outside phone so clicks register */}
 <div className="flex flex-col gap-2.5 w-full max-w-[280px] mt-5">
  <WalletBtn
   label="هويتي الطبية"
   sub="بطاقة المريض الرقمية"
   gradient="linear-gradient(135deg,#000,#1a1a1a)"
   border="rgba(255,255,255,0.15)"
   getEndpoint="/api/wallet/pass?patientName=%D8%A3%D8%AD%D9%85%D8%AF+%D9%86%D8%A7%D8%B5%D8%B1+%D8%A7%D9%84%D8%B4%D9%85%D8%B1%D9%8A&patientId=PT-0842&clinicName=%D8%B9%D9%8A%D8%A7%D8%AF%D8%A9+%D8%A7%D9%84%D8%B4%D9%81%D8%A7%D8%A1&bloodType=O%2B&insurance=%D8%A8%D9%88%D8%A8%D8%A7+%D9%A2%D9%A0%D9%A2%D9%A6&daysValid=30"
  />
  <WalletBtn
   label="موعدي القادم"
   sub="بطاقة الحجز الذكية"
   gradient="linear-gradient(135deg,#1a0533,#2d1060)"
   border="rgba(147,51,234,0.4)"
   getEndpoint="/api/wallet/appointment?patientName=%D8%A3%D8%AD%D9%85%D8%AF+%D9%86%D8%A7%D8%B5%D8%B1+%D8%A7%D9%84%D8%B4%D9%85%D8%B1%D9%8A&patientId=PT-0842&doctorName=%D8%AF.+%D8%B3%D8%A7%D8%B1%D8%A9+%D8%A7%D9%84%D9%85%D8%B7%D9%8A%D8%B1%D9%8A&specialty=%D8%B7%D8%A8+%D8%B9%D8%A7%D9%85&clinicName=%D8%B9%D9%8A%D8%A7%D8%AF%D8%A9+%D8%A7%D9%84%D8%B4%D9%81%D8%A7%D8%A1&apptDate=%D8%A7%D9%84%D8%A3%D8%B1%D8%A8%D8%B9%D8%A7%D8%A1%D8%8C+%D9%A2%D9%A3+%D9%8A%D9%88%D9%84%D9%8A%D9%88&apptTime=%D9%A1%D9%A0%3A%D9%A3%D9%A0+%D8%B5&roomNumber=%D8%BA%D8%B1%D9%81%D8%A9+%D9%A3&apptId=APT-1234"
  />
 </div>

 {/* Apple Watch mockup */}
 <div className="flex items-center justify-center gap-4 mt-5 px-2">
  <div className="relative shrink-0">
   <div className="absolute -inset-3 rounded-full blur-[16px] pointer-events-none" style={{ background:'rgba(52,199,89,0.18)' }}/>
   <div className="relative" style={{ width:62, height:76 }}>
    {/* Strap top */}
    <div className="absolute left-1/2 -translate-x-1/2 -top-2 rounded-t-sm" style={{ width:18, height:10, background:'#1c1c1c' }}/>
    {/* Watch body */}
    <div className="absolute inset-0 rounded-[16px]" style={{ background:'linear-gradient(160deg,#232323,#111)', border:'2.5px solid #2e2e2e', boxShadow:'0 10px 28px rgba(0,0,0,0.55)' }}>
     {/* Screen */}
     <div className="absolute inset-[3px] rounded-[12px] flex flex-col items-center justify-center gap-0.5 overflow-hidden" style={{ background:'#000' }}>
      <p className="text-white/35 leading-none" style={{ fontSize:5 }}>موعدك القادم</p>
      <p className="text-white font-black leading-none" style={{ fontSize:13 }}>١٠:٣٠</p>
      <div className="w-full mx-2 rounded-[4px] px-1.5 py-0.5 mt-0.5" style={{ background:'rgba(52,199,89,0.2)', border:'0.5px solid rgba(52,199,89,0.4)' }}>
       <p className="text-[#34C759] text-center font-bold leading-none" style={{ fontSize:5 }}>د. سارة المطيري</p>
      </div>
      <motion.div className="flex gap-0.5 mt-1" animate={{ opacity:[1,0.25,1] }} transition={{ duration:1.6, repeat:Infinity }}>
       {[1,0.5,0.25].map((o,k) => <div key={k} className="rounded-full" style={{ width:4, height:4, background:`rgba(52,199,89,${o})` }}/>)}
      </motion.div>
     </div>
     {/* Crown */}
     <div className="absolute top-1/2 -translate-y-1/2 -right-[4px] rounded-r-sm" style={{ width:3, height:14, background:'#2e2e2e' }}/>
    </div>
    {/* Strap bottom */}
    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 rounded-b-sm" style={{ width:18, height:10, background:'#1c1c1c' }}/>
   </div>
  </div>
  <div>
   <p className="font-black text-[13px]" style={{ color:'rgba(255,255,255,0.7)' }}>Apple Watch</p>
   <p className="text-[11px] leading-snug mt-0.5" style={{ color:'rgba(255,255,255,0.3)' }}>{lang==='ar'?'إشعار الموعد على رسغك مباشرة':'Appointment alert right on your wrist'}</p>
   <span className="inline-block mt-1.5 text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background:'rgba(52,199,89,0.1)', color:'#34C759', border:'1px solid rgba(52,199,89,0.22)' }}>{lang==='ar'?'قريباً':'Coming Soon'}</span>
  </div>
 </div>
  </div>
 </Reveal>
 </div>
 </div>
 </section>

 {/* ════ CUSTOMIZATION PITCH ════════════════════════ */}
 <section className="py-20 px-6 lg:px-12" style={{ borderTop:`1px solid ${GLASSBORDER}` }}>
 <div className="max-w-7xl mx-auto">
 <Reveal className="text-center mb-14">
 <p className="text-[11px] font-black mb-5" style={{ color:BLUE }}>
 {lang==='ar'?'تخصيص كامل':'Full Customization'}
 </p>
 <h2 className="font-black leading-tight" style={{ fontSize:'clamp(30px,5vw,60px)', color:TEXT }}>
 {lang==='ar'
 ?<>مو قالب.<br /><span style={{ color:BLUE }}>مشروعك يُبنى من الصفر.</span></>
 :<>Not a template.<br /><span style={{ color:BLUE }}>Built from scratch for you.</span></>}
 </h2>
 <p className="text-[16px] mt-5 max-w-2xl mx-auto" style={{ color:MUTED }}>
 {lang==='ar'
 ?'كل شيء تطلبه يصير. الألوان، الشاشات، المميزات، الاسم، الشعار — اطلب اللي يطري في بالك وحنا نبنيه.'
 :'Everything you ask for gets built. Colors, screens, features, name, logo — you imagine it, we build it.'}
 </p>
 </Reveal>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {(lang==='ar'
 ?[
 { icon:'palette', t:'اللون والهوية', d:'الألوان والخطوط وكل تفصيل بصري على هوية عيادتك' },
 { icon:'layout', t:'الشاشات والتدفق', d:'أضف شاشات، احذف أخرى، رتّب كل شيء على راحتك' },
 { icon:'sparkles', t:'أي ميزة تخطر', d:'AI، تيلميديسن، باقات، ولاء — كل شيء ممكن' },
 { icon:'store', t:'اسمك وشعارك', d:'التطبيق ينزل في المتجر باسم عيادتك بالكامل' },
 ]
 :[
 { icon:'palette', t:'Colors & Identity', d:'Every color, font, and visual detail matches your clinic brand' },
 { icon:'layout', t:'Screens & Flow', d:'Add screens, remove others, arrange everything your way' },
 { icon:'sparkles', t:'Any Feature', d:'AI, telemedicine, packages, loyalty — all possible' },
 { icon:'store', t:'Your Name & Logo', d:'The app launches on the Store under your clinic name' },
 ]
 ).map((c,i)=>(
 <Reveal key={i} delay={i*0.07}>
 <Glass accent={BLUE} className="h-full">
 <div className="p-6 h-full text-center flex flex-col items-center gap-3">
  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl font-black text-[20px] mb-2" style={{ background:`${BLUE}18`, border:`1px solid ${BLUE}35`, color:BLUE }}>{c.icon}</div>
 <p className="font-black text-[15px]" style={{ color:TEXT }}>{c.t}</p>
 <p className="text-[12px] leading-relaxed" style={{ color:MUTED }}>{c.d}</p>
 </div>
 </Glass>
 </Reveal>
 ))}
 </div>
 </div>
 </section>

 {/* ════ ROI CALCULATOR ═════════════════════════════ */}
 <section className="py-24 px-6 lg:px-12">
 <div className="max-w-3xl mx-auto">
 <Reveal className="text-center mb-10">
 <p className="text-[11px] font-black mb-5" style={{ color:BLUE }}>
 {lang==='ar'?'احسب عائدك':'ROI Calculator'}
 </p>
 <h2 className="font-black leading-tight" style={{ fontSize:'clamp(28px,4.5vw,52px)', color:TEXT }}>
 {lang==='ar'?<>كم تخسر الآن<br /><span style={{ color:DIM }}>بدون نظام رقمي؟</span></> : <>How much are you losing<br /><span style={{ color:DIM }}>without a digital system?</span></>}
 </h2>
 </Reveal>
 <Reveal delay={0.1}>
 <Glass accent={BLUE} style={{ borderRadius:28 }}>
 <div className="p-8 relative overflow-hidden">
 <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:`radial-gradient(circle,${BLUE}06 1px,transparent 1px)`, backgroundSize:'18px 18px' }} />
 <div className="relative z-10">
 {/* Inputs */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
 <div>
 <label className="block text-[12px] font-black mb-3" style={{ color:MUTED }}>
 {lang==='ar'?`عدد المرضى الشهريين: ${roiPatients}`:`Monthly patients: ${roiPatients}`}
 </label>
 <input type="range" min="20" max="500" step="10" value={roiPatients}
 onChange={e => setRoiPatients(+e.target.value)}
 className="w-full h-2 rounded-full appearance-none cursor-pointer"
 style={{ accentColor:BLUE, background:`linear-gradient(90deg,${BLUE} ${((roiPatients-20)/480)*100}%,rgba(255,255,255,0.1) 0%)` }} />
 <div className="flex justify-between text-[10px] mt-1" style={{ color:DIM }}>
 <span>20</span><span>500</span>
 </div>
 </div>
 <div>
 <label className="block text-[12px] font-black mb-3" style={{ color:MUTED }}>
 {lang==='ar'?`متوسط سعر الكشف: ${roiPrice} ريال`:`Avg. consultation fee: ${roiPrice} SAR`}
 </label>
 <input type="range" min="50" max="800" step="25" value={roiPrice}
 onChange={e => setRoiPrice(+e.target.value)}
 className="w-full h-2 rounded-full appearance-none cursor-pointer"
 style={{ accentColor:BLUE, background:`linear-gradient(90deg,${BLUE} ${((roiPrice-50)/750)*100}%,rgba(255,255,255,0.1) 0%)` }} />
 <div className="flex justify-between text-[10px] mt-1" style={{ color:DIM }}>
 <span>50</span><span>800</span>
 </div>
 </div>
 </div>
 {/* Results */}
 <div className="grid grid-cols-3 gap-4 mb-8">
 {[
 { label:lang==='ar'?'مرضى تضيعهم شهرياً':'Lost patients/month', value:roiLost, suffix:'', color:'#EF4444' },
 { label:lang==='ar'?'دخل إضافي سنوي متوقع':'Expected extra annual revenue', value:roiExtra.toLocaleString(), suffix:lang==='ar'?' ر':'SAR', color:'#10B981' },
 { label:lang==='ar'?'مدة الاسترداد':'Payback period', value:lang==='ar'?'< ٣':'< 3', suffix:lang==='ar'?' أشهر':' mo', color:BLUE },
 ].map(s=>(
 <div key={s.label} className="rounded-[18px] p-4 text-center"
 style={{ background:GLASS, border:`1px solid ${s.color}25` }}>
 <p className="text-[20px] font-black" style={{ color:s.color }}>{s.value}<span className="text-[12px]">{s.suffix}</span></p>
 <p className="text-[9px] leading-tight mt-1" style={{ color:MUTED }}>{s.label}</p>
 </div>
 ))}
 </div>
 <p className="text-[11px] text-center mb-4" style={{ color:DIM }}>
 {lang==='ar'?'* بناءً على متوسط تحسّن الاحتجاز ١٨٪ لدى عملائنا':'* Based on 18% avg. retention improvement across our clients'}
 </p>
 <motion.a whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }} href="#تواصل"
 className="block w-full text-center font-black text-[16px] py-4 rounded-2xl text-white transition-all"
 style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 8px 28px ${BLUE}40` }}>
 {lang==='ar'?'احجز استشارتك المجانية ←':'Book free consultation ←'}
 </motion.a>
 </div>
 </div>
 </Glass>
 </Reveal>
 </div>
 </section>

 {/* ════ PRICING + CONTACT FORM ═════════════════════ */}
 <section id="تواصل" className="py-24 px-6 lg:px-12" style={{ borderTop:`1px solid ${GLASSBORDER}` }}>
 <div className="max-w-3xl mx-auto">

 {/* ── Header ── */}
 <Reveal className="text-center mb-10">
 <p className="text-[11px] font-black mb-5" style={{ color:BLUE }}>
 {lang==='ar'?'عرض محدود · ينتهي قريباً':'Limited offer · ending soon'}
 </p>
 <h2 className="font-black leading-tight mb-3" style={{ fontSize:'clamp(32px,6vw,60px)', color:TEXT }}>
 {lang==='ar'
 ?<>ابدأ مشروعك الآن<br /><span style={{ background:'linear-gradient(90deg,#0EA5E9,#38BDF8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>بأقل من نصف السعر.</span></>
 :<>Start now<br /><span style={{ background:'linear-gradient(90deg,#0EA5E9,#38BDF8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>at less than half price.</span></>}
 </h2>
 <p className="text-[15px]" style={{ color:MUTED }}>
 {lang==='ar'?'عرض إطلاق حصري — بعد انتهائه يعود السعر الأصلي ٢٥٬٠٠٠ ريال.':'Exclusive launch price — returns to SAR 25,000 after offer ends.'}
 </p>
 </Reveal>

 {/* ── Countdown ── */}
 <Reveal delay={0.05} className="mb-8">
 {(() => {
 const pad = (n:number) => String(n).padStart(2,'0');
 return (
 <div className="flex items-center justify-center gap-2 flex-wrap">
 <div className="flex items-center gap-2 px-4 py-2 rounded-[14px]"
 style={{ background:'rgba(239,68,68,0.1)', border:'1.5px solid rgba(239,68,68,0.35)' }}>
 <motion.span className="w-2 h-2 rounded-full bg-red-400 shrink-0"
 animate={{ opacity:[1,0,1] }} transition={{ duration:1, repeat:Infinity }} />
 <span className="text-[12px] font-black" style={{ color:'#FCA5A5' }}>
 {lang==='ar'?'العرض ينتهي خلال':'Offer ends in'}
 </span>
 </div>
 {[
 { v: offerCd.days, l: lang==='ar'?'يوم':'d' },
 { v: offerCd.hours, l: lang==='ar'?'ساعة':'h' },
 { v: offerCd.mins, l: lang==='ar'?'دقيقة':'m'},
 { v: offerCd.secs, l: lang==='ar'?'ثانية':'s'},
 ].map((u,i) => (
 <div key={i} className="flex flex-col items-center px-3 py-2 rounded-[12px] min-w-[52px]"
 style={{ background:'rgba(255,255,255,0.06)', border:`1px solid ${GLASSBORDER}` }}>
 <span className="font-black text-[22px] leading-none tabular-nums" style={{ color:TEXT }}>{pad(u.v)}</span>
 <span className="text-[10px] font-semibold mt-0.5" style={{ color:MUTED }}>{u.l}</span>
 </div>
 ))}
 </div>
 );
 })()}
 </Reveal>

 {/* ── Main pricing card ── */}
 <Reveal delay={0.1} className="mb-5">
 <div className="rounded-[28px] overflow-hidden" style={{
 background:'linear-gradient(135deg,rgba(14,165,233,0.12),rgba(2,132,199,0.06))',
 border:'2px solid rgba(14,165,233,0.35)',
 boxShadow:'0 0 60px rgba(14,165,233,0.15)' }}>
 {/* Top ribbon */}
 <div className="flex items-center justify-between px-8 py-4"
 style={{ background:'linear-gradient(90deg,rgba(14,165,233,0.25),rgba(2,132,199,0.12))', borderBottom:'1px solid rgba(14,165,233,0.2)' }}>
 <div className="flex items-center gap-2">
 <motion.span className="w-2 h-2 rounded-full bg-[#22C55E]"
 animate={{ scale:[1,1.4,1] }} transition={{ duration:1.5, repeat:Infinity }} />
 <span className="text-[12px] font-black" style={{ color:'#86EFAC' }}>
 {lang==='ar'?'عرض إطلاق تلقا للعيادات':'Talqa Clinics Launch Offer'}
 </span>
 </div>
 <span className="text-[11px] font-black px-3 py-1 rounded-full"
 style={{ background:'rgba(239,68,68,0.2)', color:'#FCA5A5', border:'1px solid rgba(239,68,68,0.35)' }}>
 {lang==='ar'?'مكانان متبقيان فقط':'Only 2 spots left'}
 </span>
 </div>

 <div className="p-8">
 {/* Price */}
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8 pb-8"
 style={{ borderBottom:`1px solid rgba(255,255,255,0.08)` }}>
 <div>
 <div className="flex items-baseline gap-3 mb-2">
 <span className="font-black" style={{ fontSize:'clamp(48px,9vw,80px)', color:'#F0F9FF', lineHeight:1 }}>
 ٩٬٢٠٠
 </span>
 <span className="text-[22px] font-black" style={{ color:BLUE }}>ريال</span>
 </div>
 <div className="flex items-center gap-3">
 <span className="text-[16px] font-semibold line-through" style={{ color:'rgba(255,255,255,0.25)' }}>٢٥٬٠٠٠ ريال</span>
 <span className="text-[12px] font-black px-2.5 py-1 rounded-full"
 style={{ background:'rgba(34,197,94,0.2)', color:'#4ADE80', border:'1px solid rgba(34,197,94,0.4)' }}>
 {lang==='ar'?'توفّر ١٥٬٨٠٠ ريال':'Save SAR 15,800'}
 </span>
 </div>
 </div>
 <div className="flex flex-col gap-1 sm:text-left text-right">
 <span className="text-[11px] font-black" style={{ color:MUTED }}>
 {lang==='ar'?'منظومة متكاملة تشمل':'Complete system includes'}
 </span>
 {['تطبيق مريض','موقع طبي','لوحة إدارة'].map(it=>(
 <span key={it} className="text-[13px] font-bold" style={{ color:'#BAE6FD' }}> {it}</span>
 ))}
 </div>
 </div>

 {/* Payment options */}
 <p className="text-[11px] font-black mb-4" style={{ color:MUTED }}>
 {lang==='ar'?'اختر طريقة الدفع':'Choose payment method'}
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
 {[
 {
 icon:null,
 title: lang==='ar'?'كامل مقدماً':'Full upfront',
 amount: lang==='ar'?'٩٬٢٠٠ ريال':'SAR 9,200',
 sub: lang==='ar'?'قبل بدء المشروع':'before project starts',
 badge: lang==='ar'?'أسرع تسليم':'Fastest delivery',
 bc:'#22C55E', highlight: false },
 {
 icon:null,
 title: lang==='ar'?'نصف ونصف':'50 / 50',
 amount: lang==='ar'?'٤٬٦٠٠ + ٤٬٦٠٠':'4,600 + 4,600',
 sub: lang==='ar'?'الآن · عند التسليم':'now · on delivery',
 badge: lang==='ar'?'الأكثر طلباً':'Most popular',
 bc: BLUE, highlight: true },
 {
 icon:null,
 title: lang==='ar'?'تقسيط':'Installments',
 amount: lang==='ar'?'٤٬٦٠٠ ثم ٧٦٧ × ٦':'4,600 then 767×6',
 sub: lang==='ar'?'الآن · ٦ أشهر بتابي أو تمارا':'now · 6 mo via Tabby/Tamara',
 badge: lang==='ar'?'تابي · تمارا':'Tabby · Tamara',
 bc:'#A78BFA', highlight: false },
 ].map((opt,i) => (
 <div key={i} className="rounded-[18px] p-4 transition-all"
 style={{
 background: opt.highlight ? 'rgba(14,165,233,0.15)' : 'rgba(255,255,255,0.04)',
 border: opt.highlight ? `2px solid ${BLUE}` : `1.5px solid rgba(255,255,255,0.08)`,
 boxShadow: opt.highlight ? `0 0 24px rgba(14,165,233,0.2)` : 'none' }}>
 <p className="font-black text-[15px] mb-1" style={{ color:TEXT }}>{opt.title}</p>
 <p className="font-black text-[13px]" style={{ color: opt.highlight?BLUE:'#BAE6FD' }}>{opt.amount}</p>
 <p className="text-[11px] mb-3" style={{ color:MUTED }}>{opt.sub}</p>
 <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
 style={{ background:`${opt.bc}22`, color:opt.bc, border:`1px solid ${opt.bc}55` }}>
 {opt.badge}
 </span>
 </div>
 ))}
 </div>

 {/* Inclusions */}
 <p className="text-[11px] font-black mb-4" style={{ color:MUTED }}>
 {lang==='ar'?'ما يشمله العرض — بالتفصيل':"What's included — in detail"}
 </p>
 <div className="space-y-2.5">
 {[
 {
 color:'#38BDF8',
 label: lang==='ar'?'الموقع الطبي':'Medical website',
 tags: lang==='ar'?['استضافة مجانية','دومين مجاني ٤ سنوات']:['Free hosting','Free domain 4 yrs'],
 tagColor:'#22C55E' },
 {
 color:'#818CF8',
 label: lang==='ar'?'لوحة تحكم الملاك والاستقبال':'Owner & reception dashboard',
 tags: lang==='ar'?['استضافة مجانية','دومين مجاني']:['Free hosting','Free domain'],
 tagColor:'#22C55E' },
 {
 color:'#34D399',
 label: lang==='ar'?'تطبيق المريض — iOS + Android':'Patient app — iOS + Android',
 tags: lang==='ar'?['أول ٦ أشهر مجانية','٧٩٩ ريال / شهر بعدها']:['First 6 months free','SAR 799/mo after'],
 tagColor:'#A78BFA' },
 ].map((it,i) => (
 <div key={i} className="flex items-center gap-4 p-4 rounded-[16px]"
 style={{ background:'rgba(255,255,255,0.03)', border:`1px solid rgba(255,255,255,0.07)` }}>
 <div className="w-2 h-10 rounded-full shrink-0" style={{ background:it.color, opacity:0.7 }} />
 <div className="flex-1 min-w-0">
 <p className="font-black text-[14px] mb-1.5" style={{ color:TEXT }}>{it.label}</p>
 <div className="flex flex-wrap gap-2">
 {it.tags.map((tag,j) => (
 <span key={j} className="text-[11px] font-bold px-2 py-0.5 rounded-full"
 style={{ background:`${it.tagColor}18`, color:it.tagColor, border:`1px solid ${it.tagColor}33` }}>
 {tag}
 </span>
 ))}
 </div>
 </div>
 </div>
 ))}
 </div>

 {/* Value summary */}
 <div className="mt-6 p-4 rounded-[18px] text-center"
 style={{ background:'rgba(34,197,94,0.07)', border:'1.5px solid rgba(34,197,94,0.2)' }}>
 <p className="text-[13px] font-black" style={{ color:'#4ADE80' }}>
 {lang==='ar'
 ?'قيمة المنظومة الكاملة تتجاوز ٦٠٬٠٠٠ ريال — أنت تدفع ٩٬٢٠٠ فقط.'
 :'Full system value exceeds SAR 60,000 — you pay only SAR 9,200.'}
 </p>
 </div>

 </div>
 </div>
 </Reveal>

 {/* ─ Contact form ─ */}
 <Reveal delay={0.18}>
 <div className="text-center mb-5">
 <p className="text-[16px] font-black mb-1" style={{ color:TEXT }}>
 {lang==='ar'?'احجز مكانك الآن قبل انتهاء العرض':'Reserve your spot before the offer ends'}
 </p>
 <p className="text-[13px]" style={{ color:MUTED }}>
 {lang==='ar'?'أرسل بياناتك ونتواصل معك خلال ٢٤ ساعة بعقد رسمي.':'Send your details and we\'ll reach out within 24h with a formal contract.'}
 </p>
 </div>
 <Glass accent={BLUE} style={{ borderRadius:28 }}>
 <div className="p-8">
 <div className="space-y-4 mb-6">
 {[
 { placeholder:lang==='ar'?'اسمك الكريم':'Your name', value:formName, set:setFormName },
 { placeholder:lang==='ar'?'اسم العيادة أو المركز الطبي':'Clinic / medical center name', value:formClinic, set:setFormClinic },
 { placeholder:lang==='ar'?'رقم الجوال (واتساب)':'Mobile number (WhatsApp)', value:formPhone, set:setFormPhone },
 ].map(f=>(
 <div key={f.placeholder} className="relative">
 <input
 type="text"
 placeholder={f.placeholder}
 value={f.value}
 onChange={e => f.set(e.target.value)}
 dir={lang==='ar'?'rtl':'ltr'}
 className="w-full py-4 px-5 rounded-[16px] text-[15px] font-semibold outline-none transition-all"
 style={{ background:GLASS, border:`1.5px solid ${GLASSBORDER}`, color:TEXT, fontFamily:"'Tajawal',sans-serif" }}
 onFocus={e => e.currentTarget.style.borderColor = BLUE}
 onBlur={e => e.currentTarget.style.borderColor = GLASSBORDER}
 />
 </div>
 ))}
 </div>

 <motion.button
 whileHover={{ scale: formName && formPhone ? 1.02 : 1 }}
 whileTap={{ scale: formName && formPhone ? 0.97 : 1 }}
 onClick={handleFormSubmit}
 className="w-full py-5 rounded-[18px] text-white font-black text-[16px] transition-all"
 style={{
 background: formName && formPhone
 ? `linear-gradient(135deg,${BLUE},#0284C7)`
 : 'rgba(255,255,255,0.06)',
 boxShadow: formName && formPhone ? `0 8px 32px ${BLUE}40` : 'none',
 color: formName && formPhone ? '#fff' : MUTED,
 cursor: formName && formPhone ? 'pointer' : 'default' }}>
 {lang==='ar'?'أرسل طلبك — وسنتواصل خلال ٢٤ ساعة':'Send request — we reply within 24 hours'}
 </motion.button>

 <p className="text-[11px] text-center mt-4" style={{ color:DIM }}>
 {lang==='ar'?' استشارة مجانية · بدون أي التزام · نرد خلال ٢٤ ساعة':' Free consultation · No commitment · Reply in 24 hours'}
 </p>
 </div>
 </Glass>
 </Reveal>
 </div>
 </section>

 {/* ════ VISIT OFFER ════════════════════════════════ */}
 <section className="py-20 px-6 lg:px-12">
  <div className="max-w-3xl mx-auto">
   <Reveal>
    <div className="rounded-[32px] overflow-hidden" style={{ background:'rgba(255,255,255,0.035)', border:`1px solid ${GLASSBORDER}` }}>

     {/* top bar */}
     <div className="px-10 py-5 flex items-center justify-between"
      style={{ background:'rgba(255,255,255,0.04)', borderBottom:`1px solid ${GLASSBORDER}` }}>
      <div className="flex items-center gap-3">
       <motion.span className="w-2 h-2 rounded-full bg-[#22C55E]"
        animate={{ scale:[1,1.5,1] }} transition={{ duration:2, repeat:Infinity }} />
       <span className="text-[12px] font-black" style={{ color:'#86EFAC' }}>
        {lang==='ar'?'زيارة مجانية — بدون أي التزام':'Free visit — no obligation'}
       </span>
      </div>
      <span className="text-[11px] font-semibold px-3 py-1 rounded-full"
       style={{ background:'rgba(255,255,255,0.06)', color:MUTED, border:`1px solid ${GLASSBORDER}` }}>
       {lang==='ar'?'خلال ٢٤ ساعة':'Within 24 hours'}
      </span>
     </div>

     <div className="p-10 sm:p-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

       {/* left — text */}
       <div>
        <p className="text-[11px] font-black mb-5" style={{ color:BLUE }}>
         {lang==='ar'?'نجيك أنت — ما تجينا':'We come to you'}
        </p>
        <h2 className="font-black leading-[1.1] mb-6"
         style={{ fontSize:'clamp(26px,4.5vw,44px)', color:TEXT }}>
         {lang==='ar'
          ? <>اطلب زيارة فريقنا<br /><span style={{ color:BLUE }}>لعيادتك مباشرةً.</span></>
          : <>Request our team<br /><span style={{ color:BLUE }}>to visit your clinic.</span></>}
        </h2>
        <p className="text-[14px] leading-relaxed mb-8" style={{ color:MUTED }}>
         {lang==='ar'
          ? 'نحجز موعداً في وقتك، نجي للعيادة، نشرح المنظومة كاملة ونوريك الديمو على أجهزتك — بدون ما تتكلف شيء.'
          : 'We schedule at your convenience, visit the clinic, walk you through the full system and run a live demo on your devices — completely free.'}
        </p>

        <div className="space-y-4 mb-8">
         {(lang==='ar' ? [
          { n:'01', t:'تختار الوقت',         d:'أي يوم يناسبك — نحن نتكيّف معك.' },
          { n:'02', t:'نجي للعيادة',          d:'أحد متخصصي تلقا يزورك في مكانك.' },
          { n:'03', t:'ديمو حي على أجهزتك',   d:'تشوف المنظومة تشتغل في بيئتك الفعلية.' },
          { n:'04', t:'عرض مخصص لعيادتك',     d:'سعر وخطة مبنية على احتياجك — لا على قالب جاهز.' },
         ] : [
          { n:'01', t:'Pick your time',       d:'Any day that works for you — we adapt.' },
          { n:'02', t:'We visit your clinic', d:'A Talqa specialist comes to you.' },
          { n:'03', t:'Live demo on your devices', d:'See the system running in your actual clinic.' },
          { n:'04', t:'Tailored proposal',    d:'Pricing and plan built around your needs.' },
         ]).map((s,i) => (
          <motion.div key={i}
           initial={{ opacity:0, x: lang==='ar'?12:-12 }}
           whileInView={{ opacity:1, x:0 }}
           viewport={{ once:true }}
           transition={{ delay:i*0.08 }}
           className="flex gap-4 items-start">
           <span className="font-black text-[11px] shrink-0 mt-1 tabular-nums" style={{ color:`${BLUE}70` }}>{s.n}</span>
           <div>
            <p className="font-black text-[14px] mb-0.5" style={{ color:TEXT }}>{s.t}</p>
            <p className="text-[12px] leading-snug" style={{ color:MUTED }}>{s.d}</p>
           </div>
          </motion.div>
         ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
         <motion.a
          whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
          href={`https://wa.me/966551378531?text=${encodeURIComponent(lang==='ar'?'مرحباً، أرغب في حجز زيارة فريق تلقا لعيادتي.':'Hello, I\'d like to schedule a Talqa team visit to my clinic.')}`}
          target="_blank" rel="noopener noreferrer"
          className="flex-1 py-4 rounded-[16px] font-black text-[15px] text-white text-center"
          style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 6px 28px ${BLUE}40` }}>
          {lang==='ar'?'احجز الزيارة الآن':'Book the visit now'}
         </motion.a>
         <motion.a
          whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
          href="#تواصل"
          className="px-6 py-4 rounded-[16px] font-black text-[14px] text-center"
          style={{ background:'rgba(255,255,255,0.05)', border:`1px solid ${GLASSBORDER}`, color:MUTED }}>
          {lang==='ar'?'أفضّل الفورم':'Prefer the form'}
         </motion.a>
        </div>
       </div>

       {/* right — timeline */}
       <div className="flex flex-col gap-3">
        {(lang==='ar' ? [
         { time:'الآن',          label:'تطلب الزيارة',           color:'#0EA5E9' },
         { time:'خلال ساعة',     label:'نتصل لتأكيد الموعد',      color:'#38BDF8' },
         { time:'خلال ٢٤ ساعة',  label:'فريقنا في عيادتك',        color:'#22C55E' },
         { time:'نفس اليوم',      label:'عرض سعر مخصص جاهز',      color:'#86EFAC' },
        ] : [
         { time:'Now',      label:'You request the visit',       color:'#0EA5E9' },
         { time:'< 1 hr',   label:'We call to confirm',          color:'#38BDF8' },
         { time:'< 24 hrs', label:'Team at your clinic',         color:'#22C55E' },
         { time:'Same day', label:'Custom proposal ready',        color:'#86EFAC' },
        ]).map((row,i) => (
         <motion.div key={i}
          initial={{ opacity:0, y:8 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ delay:0.1+i*0.09 }}
          className="flex items-center gap-4 px-5 py-4 rounded-[16px]"
          style={{ background:'rgba(255,255,255,0.04)', border:`1px solid rgba(255,255,255,0.07)` }}>
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background:row.color }} />
          <span className="text-[12px] font-black w-24 shrink-0 tabular-nums" style={{ color:`${row.color}CC` }}>
           {row.time}
          </span>
          <span className="w-px h-4 shrink-0" style={{ background:'rgba(255,255,255,0.08)' }} />
          <span className="text-[13px] font-semibold" style={{ color:TEXT }}>{row.label}</span>
         </motion.div>
        ))}
        <div className="mt-1 p-4 rounded-[16px]"
         style={{ background:'rgba(34,197,94,0.06)', border:'1px solid rgba(34,197,94,0.15)' }}>
         <p className="text-[12px] font-black text-center" style={{ color:'#86EFAC' }}>
          {lang==='ar'?'الزيارة مجانية تماماً — لا يوجد أي التزام بعدها.':'The visit is completely free — no commitment required.'}
         </p>
        </div>
       </div>

      </div>
     </div>
    </div>
   </Reveal>
  </div>
 </section>

 {/* ════ BET / GUARANTEE ═══════════════════════════ */}
 <section className="py-20 px-6 lg:px-12">
 <div className="max-w-3xl mx-auto">
 <Reveal>
 <div className="relative rounded-[32px] overflow-hidden p-10 sm:p-14"
 style={{ background:'linear-gradient(135deg,rgba(14,165,233,0.1) 0%,rgba(2,132,199,0.04) 100%)', border:'2px solid rgba(14,165,233,0.25)', boxShadow:'0 0 80px rgba(14,165,233,0.08)' }}>

 {/* background word */}
 <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
 <span className="font-black text-[clamp(80px,18vw,180px)] opacity-[0.04] whitespace-nowrap"
 style={{ color:BLUE }}>
 {lang==='ar'?'رهان':'BET'}
 </span>
 </div>

 <div className="relative z-10">
 {/* eyebrow */}
 <p className="text-[11px] font-black mb-6" style={{ color:BLUE }}>
 {lang==='ar'?'ضمان تلقا':'Talqa Guarantee'}
 </p>

 {/* headline */}
 <h2 className="font-black leading-[1.1] mb-8"
 style={{ fontSize:'clamp(28px,5.5vw,52px)', color:TEXT }}>
 {lang==='ar'
 ? <>نراهن أن عيادتك<br /><span style={{ color:BLUE }}>ستلاحظ الفرق في ٣٠ يوماً.</span></>
 : <>We bet your clinic<br /><span style={{ color:BLUE }}>feels the difference in 30 days.</span></>}
 </h2>

 {/* bet items */}
 <div className="space-y-4 mb-10">
 {(lang==='ar' ? [
 { label:'إذا لم يُسلَّم مشروعك في الوقت المحدد', outcome:'نرجّع لك ١٠٪ من قيمة المشروع عن كل أسبوع تأخير.' },
 { label:'إذا لم تكن راضياً عن التصميم بعد أسبوعين', outcome:'نعيد التصميم بالكامل بدون أي تكلفة إضافية.' },
 { label:'إذا واجه تطبيقك عطلاً تقنياً بعد الإطلاق', outcome:'نصلح المشكلة خلال ٢٤ ساعة أو نردّ رسوم الشهر.' },
 ] : [
 { label:'If your project isn\'t delivered on time', outcome:'We refund 10% of the project value per delayed week.' },
 { label:'If you\'re not satisfied with the design in 2 weeks', outcome:'We redo it entirely at no extra charge.' },
 { label:'If your app has a technical outage post-launch', outcome:'We fix it within 24h or refund that month\'s fee.' },
 ]).map((item, i) => (
 <motion.div key={i}
 initial={{ opacity:0, x: lang==='ar'?16:-16 }}
 whileInView={{ opacity:1, x:0 }}
 viewport={{ once:true }}
 transition={{ delay: i*0.1, duration:0.4 }}
 className="flex gap-5 items-start">
 {/* index */}
 <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-black text-[13px]"
 style={{ background:'rgba(14,165,233,0.15)', border:'1.5px solid rgba(14,165,233,0.3)', color:BLUE }}>
 {i+1}
 </div>
 <div>
 <p className="font-black text-[15px] mb-1" style={{ color:TEXT }}>{item.label}</p>
 <p className="text-[13px] leading-relaxed" style={{ color:MUTED }}>{item.outcome}</p>
 </div>
 </motion.div>
 ))}
 </div>

 {/* bottom line */}
 <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-8"
 style={{ borderTop:'1px solid rgba(255,255,255,0.08)' }}>
 <p className="text-[13px] leading-relaxed flex-1" style={{ color:MUTED }}>
 {lang==='ar'
 ?'لأننا واثقون من جودة عملنا — نضع شروطنا في العقد الرسمي. لا وعود شفهية.'
 :'Because we\'re confident in our work — these terms go in the official contract. No verbal promises.'}
 </p>
 <motion.a whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
 href="#تواصل"
 className="shrink-0 px-7 py-3 rounded-[14px] font-black text-[14px] text-white"
 style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 6px 24px ${BLUE}40` }}>
 {lang==='ar'?'ابدأ معنا الآن':'Start with us now'}
 </motion.a>
 </div>

 </div>
 </div>
 </Reveal>
 </div>
 </section>

 {/* ════ FAQ ════════════════════════════════════════ */}
 <section className="py-24 px-6 lg:px-12">
 <div className="max-w-3xl mx-auto">
 <Reveal className="mb-12">
 <p className="text-[11px] font-black mb-5" style={{ color:BLUE }}>الأسئلة الشائعة</p>
            <h2 className="font-black leading-tight" style={{ fontSize:'clamp(26px,4vw,50px)', color:TEXT }}>كل سؤال في بالك<br /><span style={{ color:DIM }}>جاوبناه هنا.</span></h2>
 </Reveal>
 <div className="space-y-3">
 {[
 { q:'هل التطبيق يكون باسم عيادتي أو باسم تلقا؟', a:'التطبيق يُنشر باسم عيادتك وشعارك كاملاً على AppStore وGoogle Play. تلقا لا تظهر للمرضى بأي شكل.' },
 { q:'كيف تضمنون التسليم في ٦٠ يوم؟', a:'لدينا عملية مجربة مع +٥٠ عيادة. نبدأ بتصميم موافق عليه، ثم برمجة منظمة بمراحل واضحة.' },
 { q:'ماذا يحدث بعد السنة الأولى من الدعم؟', a:'بعد السنة الأولى المجانية، الدعم متاح بخطط شهرية مرنة.' },
 { q:'هل يتكامل مع نظام HIS الموجود؟', a:'نعم، نوفر API كاملة للتكامل مع أغلب أنظمة HIS في السوق السعودي.' },
 { q:'هل يعمل التطبيق في حال ضعف الإنترنت؟', a:'نعم، التطبيق يعمل جزئياً أوف لاين مع مزامنة تلقائية عند عودة الاتصال.' },
 ].map((faq,i) => (
 <Reveal key={i} delay={i*0.04}>
 <Glass accent={faqOpen===i?BLUE:GLASSBORDER} style={{ borderRadius:20, transition:'all 0.3s' }}>
 <button onClick={() => setFaqOpen(faqOpen===i?null:i)}
 className="w-full flex items-center justify-between p-5 text-right">
 <span className="text-[15px] font-black" style={{ color:TEXT }}>{faq.q}</span>
 <motion.div animate={{ rotate:faqOpen===i?45:0 }} transition={{ duration:0.25 }}
 className="w-7 h-7 rounded-full flex items-center justify-center text-lg font-black shrink-0 mr-3 transition-all"
 style={{ background:faqOpen===i?BLUE:GLASS, color:faqOpen===i?TEXT:MUTED, border:`1px solid ${faqOpen===i?BLUE:GLASSBORDER}` }}>
 +
 </motion.div>
 </button>
 <AnimatePresence>
 {faqOpen===i && (
 <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
 exit={{ height:0, opacity:0 }} transition={{ duration:0.3 }} className="overflow-hidden">
 <p className="px-5 pb-5 text-[14px] leading-relaxed" style={{ color:MUTED, borderTop:`1px solid ${GLASSBORDER}`, paddingTop:16 }}>{faq.a}</p>
 </motion.div>
 )}
 </AnimatePresence>
 </Glass>
 </Reveal>
 ))}
 </div>
 </div>
 </section>

 {/* ════ FINAL CTA ══════════════════════════════════ */}
 <section className="py-32 px-6 text-center relative overflow-hidden">
 <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:`radial-gradient(circle,${BLUE}06 1px,transparent 1px)`, backgroundSize:'32px 32px' }} />
 <motion.div className="absolute rounded-full blur-[100px] pointer-events-none"
 animate={{ scale:[1,1.2,1], opacity:[0.15,0.3,0.15] }} transition={{ duration:6, repeat:Infinity }}
 style={{ width:600, height:600, background:`radial-gradient(circle,${BLUE} 0%,transparent 70%)`, top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
 <div className="relative z-10 max-w-2xl mx-auto">
 <Reveal>
 <div className="mb-8 inline-block">
 <TalqaShield size={72} />
 </div>
 <h2 className="font-black mb-5 leading-tight" style={{ fontSize:'clamp(40px,8vw,90px)', color:TEXT }}>{t.finalHeading}</h2>
 <p className="text-[18px] mb-4 leading-relaxed" style={{ color:MUTED }}>{t.finalSub}</p>
  <p className="text-[13px] mb-12" style={{ color:DIM }}>{lang==='ar'?'زيارة مجانية خلال ٢٤ ساعة — لا التزام — نجيك للعيادة.':'Free visit within 24 hours — no commitment — we come to you.'}</p>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
 <a href="https://wa.me/966551378531" target="_blank" rel="noopener noreferrer"
 className="font-black text-[16px] px-14 py-5 rounded-2xl text-white transition-all active:scale-95"
 style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 16px 48px ${BLUE}40` }}>
 {t.whatsapp}
 </a>
 <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
 className="font-bold text-[15px] px-10 py-5 rounded-2xl flex items-center gap-2 transition-all"
 style={{ background:GLASS, border:`2px solid ${BLUE}35`, color:BLUE, backdropFilter:'blur(20px)' }}>
 {t.ctaDemo}
 </a>
 </div>
 </Reveal>
 </div>
 </section>

 {/* ════ FOOTER ═════════════════════════════════════ */}
 <footer className="py-10 px-6 lg:px-12" style={{ borderTop:`1px solid ${GLASSBORDER}` }}>
 <div className="max-w-7xl mx-auto">
 <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
 <div className="flex items-center gap-3">
 <TalqaShield size={40} />
 <div>
 <p className="font-black text-[16px]" style={{ color:TEXT }}>تلقا<span style={{ color:BLUE }}> للعيادات</span></p>
 <p className="text-[9px] font-medium" style={{ color:DIM }}>متخصصون في القطاع الطبي</p>
 </div>
 </div>
 <div className="flex flex-wrap items-center justify-center gap-6">
 {[['المنظومة','#المنظومة'],['كيف نعمل','#process'],['الأمان','#الأمان'],['الأسعار','#الأسعار'],['الديمو','/clinic-demo/']].map(([l,h]) => (
 <a key={l} href={h} target={h.startsWith('/')? '_blank':undefined}
 className="text-[13px] font-semibold transition-colors" style={{ color:MUTED }}
 onMouseEnter={e => (e.currentTarget.style.color=BLUE)} onMouseLeave={e => (e.currentTarget.style.color=MUTED)}>{l}</a>
 ))}
 </div>
 <a href="https://wa.me/966551378531" target="_blank" rel="noopener noreferrer"
 className="font-bold text-[13px] px-5 py-2.5 rounded-xl transition-all" style={{ background:BLUEDIM, border:`1.5px solid ${BLUE}30`, color:BLUE }}>
 واتساب ←
 </a>
 </div>
 <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop:`1px solid ${GLASSBORDER}` }}>
 <div className="flex flex-col gap-1 text-center sm:text-right">
 <p className="text-[11px]" style={{ color:DIM }}>متخصصون في المنظومات الرقمية للقطاع الطبي · ٢٠٢٦</p>
 <p className="text-[10px]" style={{ color:DIM }}>مؤسسة تلقا · السجل التجاري: ٧٠٥٤٨٣٥٣٢٢ · تاريخ الإصدار: ١٤٤٧/٠١/٢٤هـ</p>
 </div>
 <div className="flex gap-4">
 {['HIPAA','ISO 27001','PDPL'].map(b => <span key={b} className="text-[11px] font-bold" style={{ color:`${BLUE}80` }}>{b}</span>)}
 </div>
 </div>
 </div>
 </footer>
 </div>
 </div>
 );
}
