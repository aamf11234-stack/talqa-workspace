import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { TalqaShield } from '../components/TalqaShield';
import { TrustSection } from '../components/TrustSection';
import { PhoneFrame } from '../components/PhoneFrame';
import { BottomNav } from '../components/BottomNav';
import type { ClinicTab } from '../components/BottomNav';
import { ScreenHome } from '../components/ScreenHome';
import { ScreenAppointments } from '../components/ScreenAppointments';
import { ScreenCard } from '../components/ScreenCard';
import { ScreenNotifications } from '../components/ScreenNotifications';
import { ScreenPackages } from '../components/ScreenPackages';
import { ScreenAI } from '../components/ScreenAI';
import { AppModal } from '../components/AppModal';

/* ── Apple Wallet Button (landing page) ───────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WalletBtn({ label, sub, gradient, border, endpoint, filename, body }: {
 label: string; sub: string; gradient: string; border: string;
 endpoint: string; filename: string; body: any;
}) {
 const [loading, setLoading] = React.useState(false);
 const [done, setDone] = React.useState(false);
 const handle = async () => {
 if (loading || done) return;
 setLoading(true);
 try {
 const res = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
 if (res.ok) {
 const url = URL.createObjectURL(await res.blob());
 const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
 URL.revokeObjectURL(url);
 setDone(true); setTimeout(() => setDone(false), 3000);
 }
 } catch(_) {}
 setLoading(false);
 };
 return (
 <motion.button whileTap={{ scale:0.97 }} onClick={handle}
 className="flex items-center gap-3 px-5 py-3 rounded-[16px] w-full sm:w-auto"
 style={{ background: done ? 'rgba(52,199,89,0.15)' : gradient, border:`1px solid ${done ? 'rgba(52,199,89,0.4)' : border}`, opacity: loading ? 0.7 : 1 }}>
 {loading ? (
 <motion.div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white shrink-0" animate={{ rotate:360 }} transition={{ duration:0.8, repeat:Infinity, ease:'linear' }}/>
 ) : done ? (
 <span className="text-[#34C759] text-lg shrink-0"></span>
 ) : (
 <svg width="13" height="16" viewBox="0 0 17 20" fill="white" className="shrink-0"><path d="M14.1 10.64c-.02-2.04 1.67-3.02 1.74-3.06-0.95-1.39-2.43-1.58-2.95-1.60-1.26-.13-2.46.74-3.10.74-.64 0-1.63-.72-2.68-.70C5.55 6.04 4.05 6.97 3.22 8.36 1.54 11.17 2.80 15.35 4.42 17.65c.80 1.15 1.77 2.45 3.04 2.40 1.22-.05 1.68-.78 3.16-.78 1.47 0 1.89.78 3.18.76 1.31-.02 2.15-1.18 2.94-2.34.93-1.34 1.32-2.64 1.34-2.71-.03-.01-2.57-.99-2.98-3.34zM11.96 3.83c.67-.81 1.12-1.93 1.00-3.06-.96.04-2.13.64-2.82 1.45-.62.71-1.16 1.86-1.01 2.96 1.07.08 2.16-.54 2.83-1.35z"/></svg>
 )}
 <div className="text-right">
 <p className={`font-bold text-[13px] leading-none ${done ? 'text-[#34C759]' : 'text-white'}`}>
 {done ? 'تمت الإضافة ' : loading ? 'جارٍ التحميل…' : label}
 </p>
 <p className="text-white/35 text-[10px] mt-0.5">{sub}</p>
 </div>
 </motion.button>
 );
}

/* ── Face ID Lock Screen ──────────────────────────────────────── */
function FaceIDScreen({ onUnlock }: { onUnlock: () => void }) {
 const [phase, setPhase] = useState<'idle'|'scanning'|'done'>('idle');

 const scan = () => {
 setPhase('scanning');
 setTimeout(() => { setPhase('done'); setTimeout(onUnlock, 900); }, 2200);
 };

 const ringColor = phase === 'done' ? '#34C759' : phase === 'scanning' ? '#00B4D8' : 'rgba(255,255,255,0.22)';

 return (
 <motion.div
 className="absolute inset-0 z-50 flex flex-col"
 style={{ background: '#000', fontFamily: 'Tajawal,sans-serif' }}
 exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

 {/* Subtle bg glow */}
 <div className="absolute inset-0 pointer-events-none"
 style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(0,100,160,0.18) 0%, transparent 65%)' }} />

 {/* ── Time & Date ── */}
 <div className="flex flex-col items-center pt-16 pb-4">
 <p className="text-white font-thin leading-none mb-1" style={{ fontSize: 72, letterSpacing: -2 }}>٩:٤١</p>
 <p className="text-white/50 text-[15px] font-light">الاثنين، ٢٠ يوليو</p>
 </div>

 {/* ── Notification preview ── */}
 <div className="px-5 mb-6">
 <motion.div
 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
 className="rounded-[18px] px-4 py-3 flex items-center gap-3"
 style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
 <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>
 <span className="text-white text-[11px] font-black">ع</span>
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-white text-[12px] font-semibold leading-none mb-0.5">عيادة الشفاء</p>
 <p className="text-white/50 text-[11px] truncate">تذكير: موعدك غداً مع د. سارة ١٠:٣٠ ص</p>
 </div>
 <p className="text-white/30 text-[10px] shrink-0">الآن</p>
 </motion.div>
 </div>

 {/* ── Face ID Area ── */}
 <div className="flex-1 flex flex-col items-center justify-center">
 <div className="relative flex items-center justify-center mb-7">

 {/* Pulse rings when scanning */}
 {phase === 'scanning' && [1,2,3].map(n => (
 <motion.div key={n}
 className="absolute rounded-full border"
 style={{ width: 112 + n*28, height: 112 + n*28, borderColor: `rgba(0,180,216,${0.22 / n})` }}
 animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.1, 0.6] }}
 transition={{ duration: 1.8, repeat: Infinity, delay: n * 0.25, ease: 'easeInOut' }} />
 ))}

 {/* Done glow */}
 {phase === 'done' && (
 <motion.div
 className="absolute rounded-full"
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 style={{ width: 140, height: 140, background: 'radial-gradient(circle, rgba(52,199,89,0.25), transparent 70%)' }} />
 )}

 {/* Face oval */}
 <motion.div
 className="relative flex items-center justify-center"
 style={{ width: 112, height: 112 }}
 animate={phase === 'scanning' ? { scale: [1, 1.02, 1] } : {}}
 transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>

 {/* Oval border */}
 <svg width="112" height="112" viewBox="0 0 112 112" className="absolute inset-0">
 <motion.ellipse cx="56" cy="56" rx="50" ry="50"
 fill="none" strokeWidth="2" stroke={ringColor}
 strokeDasharray="314"
 animate={phase === 'scanning' ? { strokeDashoffset: [0, -314] } : { strokeDashoffset: 0 }}
 transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
 style={{ transition: 'stroke 0.4s' }} />
 </svg>

 {/* Face illustration */}
 <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
 {/* Head */}
 <ellipse cx="32" cy="30" rx="20" ry="22"
 fill="none" stroke={phase === 'done' ? '#34C759' : 'rgba(255,255,255,0.35)'} strokeWidth="1.5" />
 {/* Eyes */}
 <motion.ellipse cx="24" cy="27" rx="2.5" ry="2.5"
 fill={phase === 'scanning' ? '#00B4D8' : phase === 'done' ? '#34C759' : 'rgba(255,255,255,0.4)'}
 animate={phase === 'scanning' ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
 transition={{ duration: 0.8, repeat: Infinity }} />
 <motion.ellipse cx="40" cy="27" rx="2.5" ry="2.5"
 fill={phase === 'scanning' ? '#00B4D8' : phase === 'done' ? '#34C759' : 'rgba(255,255,255,0.4)'}
 animate={phase === 'scanning' ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
 transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }} />
 {/* Nose */}
 <path d="M30 32 Q32 35 34 32" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
 {/* Mouth */}
 <motion.path
 d={phase === 'done' ? "M26 38 Q32 43 38 38" : "M26 38 Q32 40 38 38"}
 stroke={phase === 'done' ? '#34C759' : 'rgba(255,255,255,0.3)'}
 strokeWidth="1.5" strokeLinecap="round" fill="none"
 animate={phase === 'scanning' ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }}
 transition={{ duration: 1, repeat: Infinity }} />
 {/* Scan line */}
 {phase === 'scanning' && (
 <motion.line x1="12" y1="0" x2="52" y2="0" stroke="rgba(0,180,216,0.7)" strokeWidth="1.5"
 animate={{ y1: [8, 54, 8], y2: [8, 54, 8] }}
 transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }} />
 )}
 </svg>
 </motion.div>
 </div>

 {/* Status text */}
 <AnimatePresence mode="wait">
 {phase === 'idle' && (
 <motion.div key="idle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
 className="flex flex-col items-center gap-5">
 <div className="text-center">
 <p className="text-white text-[17px] font-semibold mb-1">مرحباً، أحمد</p>
 <p className="text-white/40 text-[13px] font-light">انظر للشاشة لفتح التطبيق</p>
 </div>
 <div className="relative">
 {[1,2].map(n => (
 <motion.div key={n} className="absolute inset-0 rounded-full pointer-events-none"
 style={{ border: '1.5px solid rgba(255,255,255,0.25)' }}
 animate={{ scale: [1, 1.5 + n*0.3], opacity: [0.5, 0] }}
 transition={{ duration: 1.6, repeat: Infinity, delay: n * 0.5, ease: 'easeOut' }} />
 ))}
 <motion.button onClick={scan} whileTap={{ scale: 0.95 }}
 className="relative flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white text-[13px] font-semibold"
 style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)' }}>
 <svg width="14" height="16" viewBox="0 0 14 18" fill="white" opacity="0.8">
 <path d="M7 0C4.8 0 3 1.8 3 4v1H1C.4 5 0 5.4 0 6v11c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1h-2V4C11 1.8 9.2 0 7 0zm0 2c1.1 0 2 .9 2 2v1H5V4c0-1.1.9-2 2-2zm0 7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
 </svg>
 فتح بـ Face ID
 </motion.button>
 </div>
 <motion.div
 initial={{ opacity: 0, y: 4 }} animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, 4] }}
 transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.6, times: [0, 0.15, 0.85, 1] }}
 className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full"
 style={{ background: 'rgba(0,180,216,0.18)', border: '1px solid rgba(0,180,216,0.35)' }}>
 <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.9, repeat: Infinity }}
 className="w-2 h-2 rounded-full bg-[#00B4D8]" />
 <span className="text-[#00B4D8] text-[12px] font-semibold">اضغط هنا</span>
 </motion.div>
 </motion.div>
 )}
 {phase === 'scanning' && (
 <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
 <p className="text-[#00B4D8] text-[15px] font-semibold mb-1">جارٍ التعرّف…</p>
 <p className="text-white/30 text-[12px] font-light">ابقَ ناظراً للشاشة</p>
 </motion.div>
 )}
 {phase === 'done' && (
 <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
 <p className="text-[#34C759] text-[15px] font-semibold mb-1">تم التعرف </p>
 <p className="text-white/30 text-[12px] font-light">يفتح التطبيق…</p>
 </motion.div>
 )}
 </AnimatePresence>
 </div>

 {/* ── Bottom ── */}
 <div className="flex flex-col items-center pb-10 gap-4">
 <div className="w-32 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />
 <button onClick={onUnlock} className="text-white/25 text-[12px] font-light">دخول بكلمة المرور</button>
 </div>
 </motion.div>
 );
}

/* ── FAQ Item ──────────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
 const [open, setOpen] = React.useState(false);
 return (
 <div className="rounded-[18px] bg-white/80 border border-[rgba(11,74,111,0.08)] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
 <button onClick={() => setOpen(o => !o)}
 className="w-full flex items-center justify-between px-5 py-4 text-right gap-3">
 <span className="text-[14px] font-semibold text-[#111]">{q}</span>
 <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
 className="text-[#0B4A6F] text-[20px] font-light shrink-0">+</motion.span>
 </button>
 <AnimatePresence initial={false}>
 {open && (
 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
 exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
 <p className="px-5 pb-4 text-[13px] text-[#666] font-light leading-relaxed border-t border-[rgba(11,74,111,0.06)] pt-3">{a}</p>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
}

/* ── data ──────────────────────────────────────────────────────── */
const pillars = [
 { icon: '', title: 'تطبيق المريض', sub: 'iOS + Android', desc: 'بوابة صحية شاملة في جيب كل مريض', bg: 'linear-gradient(145deg,#050E1A,#0B3A5A,#050E1A)' },
 { icon: '', title: 'حجز المواعيد', sub: 'فوري · ٢٤/٧', desc: 'احجز موعدك مع أي طبيب في ثوانٍ', bg: 'linear-gradient(145deg,#060A06,#0D2814,#060A06)' },
 { icon: '', title: 'نتائج التحاليل', sub: 'فورية · آمنة', desc: 'نتائج المختبر مباشرة على هاتف المريض', bg: 'linear-gradient(145deg,#0A0800,#2E1800,#0A0800)' },
 { icon: '', title: 'إشعارات ذكية', sub: 'أدوية · مواعيد', desc: 'تذكيرات دقيقة تحسّن الالتزام الدوائي', bg: 'linear-gradient(145deg,#080012,#1A0030,#080012)' },
];

const allFeatures = [
 { icon: '', title: 'بطاقة مريض رقمية', desc: 'QR فوري بدون بطاقة ورقية' },
 { icon: '', title: 'حجز مواعيد لحظي', desc: 'تأكيد فوري + واتساب + تقويم' },
 { icon: '', title: 'نتائج التحاليل', desc: 'مباشرة من المختبر للمريض' },
 { icon: '', title: 'تذكيرات الأدوية', desc: 'جدول دوائي ذكي مع إشعارات' },
 { icon: '', title: 'Apple Health', desc: 'مزامنة تلقائية مع بيانات صحتك' },
 { icon: '⌚', title: 'Apple Watch', desc: 'مؤشرات حيوية على معصمك مباشرة' },
 { icon: '‍‍', title: 'إدارة التابعين', desc: 'صحة عائلتك في مكان واحد' },
 { icon: '', title: 'Apple Wallet', desc: 'تذكرة موعدك في المحفظة تلقائياً' },
 { icon: '', title: 'السجل الطبي الإلكتروني', desc: 'تاريخ طبي كامل في مكان واحد' },
 { icon: '', title: 'متابعة مزمنة ذكية', desc: 'مرضى السكر والضغط والقلب' },
 { icon: '', title: 'لوحة تحليلات الإدارة', desc: 'إحصاء المرضى والزيارات والإيرادات' },
 { icon: '', title: 'موقع إلكتروني', desc: 'خدمات + مواعيد + أطباء + أخبار' },
 { icon: '', title: 'رسائل واتساب آلية', desc: 'تأكيدات + تذكيرات + نتائج' },
 { icon: '', title: 'أمان HIPAA-Ready', desc: 'تشفير بيانات المرضى كاملاً' },
 { icon: '', title: 'تكامل أنظمة HIS/LIS', desc: 'ربط مع الأنظمة الموجودة بسهولة' },
 { icon: '', title: 'AI Doctor', desc: 'تحليل أعراض بالذكاء الاصطناعي' },
 { icon: '', title: 'استشارة فيديو', desc: 'تليميديسن مشفر ٢٤/٧' },
 { icon: '', title: 'باقات جلسات', desc: 'ليزر · علاج طبيعي · جمالي' },
];

const testimonials = [
 { name: 'د. فهد العتيبي', role: 'مدير عيادة الشفاء · الرياض', quote: 'الحجوزات الإلكترونية قلّصت وقت الانتظار ٦٢٪ في الأسبوع الأول. الآن مرضانا يمدحون التجربة قبل ما يدخلون عيادتنا.', initials: 'ف' },
 { name: 'أ. منى السبيعي', role: 'مديرة مجمع النور الطبي · جدة', quote: 'التطبيق رفع رضا المرضى بشكل ملحوظ. المرضى يطلبون تطبيقنا قبل ما يسألون عن الأطباء — هذا مستوى ولاء ما كنا نتوقعه.', initials: 'م' },
 { name: 'د. سارة الزهراني', role: 'رئيسة أطباء · مستشفى الرعاية · أبها', quote: 'نتائج التحاليل الرقمية أنهت الدوامة الورقية كلياً. الفريق الطبي الآن يركّز على المريض بدل الأوراق.', initials: 'س' },
];

const included = ['تسليم خلال ٦٠ يوم','نشر على المتجرين','سنة دعم مجاني','تدريب الفريق','تكامل مع HIS الحالي','تصميم بهوية عيادتك'];

/* ── component ─────────────────────────────────────────────────── */
export default function Home() {
 const [activeTab, setActiveTab] = useState<ClinicTab>('home');
 const [showFaceID, setShowFaceID] = useState(true);
 const [phoneTheme, setPhoneTheme] = useState<'dark'|'light'>('dark');
 const [, navigate] = useLocation();
 const [staffModal, setStaffModal] = useState<null|'owner'|'reception'|'doctor'>(null);
 const [tourStep, setTourStep] = useState(0); // 0=waiting, 1=nav, 2=card-tab, 3=wallet, 4=qr, 99=done

 useEffect(() => {
 document.documentElement.dir = 'rtl';
 document.documentElement.lang = 'ar';
 }, []);

 return (
 <div className="min-h-screen w-full" style={{ background: 'linear-gradient(180deg,#EBF5FF 0%,#E0EFFD 100%)', fontFamily: "'Tajawal', sans-serif" }} dir="rtl">

 {/* ── Navbar ─────────────────────────────────────────────── */}
 <div className="sticky top-0 z-50 border-b border-[rgba(11,74,111,0.1)] bg-white/88 backdrop-blur-xl">
 <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
 <div className="flex items-center gap-2">
 <TalqaShield size={28} />
 <span className="text-[14px] font-bold text-[#111]">تلقا تك</span>
 </div>
 <span className="text-[11px] text-[#AAA] font-light hidden sm:block">وكالة تصميم تطبيقات ومواقع احترافية</span>
 <a href="https://wa.me/966" target="_blank" rel="noopener noreferrer"
 className="text-[11px] font-semibold text-[#0B4A6F] border border-[rgba(11,74,111,0.2)] px-3.5 py-1.5 rounded-full hover:bg-[#0B4A6F]/5 transition-colors">
 تواصل الآن
 </a>
 </div>
 </div>

 {/* ── Hero ───────────────────────────────────────────────── */}
 <div className="max-w-5xl mx-auto px-6 pt-12 pb-8 text-center">
 <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
 <span className="inline-flex items-center gap-2 text-white text-[11px] font-semibold px-4 py-1.5 rounded-full mb-5 shadow-[0_4px_20px_rgba(0,180,216,0.25)]"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#0077A8)' }}>
 <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse shrink-0" />
 نظام المريض الرقمي · مخصص لعيادتك
 </span>
 <h1 className="text-[34px] md:text-[46px] font-bold text-[#111] leading-tight mb-4 tracking-tight">
 حوّل عيادتك إلى<br />
 <span style={{ color: '#0B4A6F' }}>تجربة صحية رقمية</span>
 </h1>
 <p className="text-[20px] md:text-[26px] font-light text-[#777] mb-5 leading-relaxed">
 تطبيق · مواعيد · نتائج · AI · تليميديسن
 </p>
 <p className="text-[13px] text-[#999] font-light max-w-md mx-auto leading-relaxed">
 منظومة رقمية متكاملة تربط مرضى عيادتك بفريقها الطبي —
 عيادات تستخدمها تقلّل وقت الانتظار <strong style={{color:'#0B4A6F'}}>٦٢٪</strong>، وترفع رضا المرضى <strong style={{color:'#0B4A6F'}}>٨٩٪</strong>.
 </p>
 </motion.div>
 </div>

 {/* ── Stats Strip ────────────────────────────────────────── */}
 <div className="max-w-5xl mx-auto px-6 mb-10">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {[
 { num: '٦٢٪', label: 'تقليل وقت الانتظار', sub: 'في أول شهر من التشغيل' },
 { num: '٨٩٪', label: 'رضا المرضى', sub: 'بعد تطبيق المنظومة' },
 { num: '٦٠ يوم', label: 'فقط للتسليم الكامل', sub: 'موقع + تطبيق + نظام' },
 { num: '+٢٠٠', label: 'عيادة تستخدم المنظومة', sub: 'في أنحاء المملكة' },
 ].map((s, i) => (
 <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
 className="rounded-[20px] p-5 text-center bg-white/80 border border-[rgba(11,74,111,0.08)] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
 <p className="text-[30px] font-bold leading-none mb-1" style={{ color: '#0B4A6F' }}>{s.num}</p>
 <p className="text-[12px] font-semibold text-[#111] mb-0.5">{s.label}</p>
 <p className="text-[10px] text-[#AAA] font-light">{s.sub}</p>
 </motion.div>
 ))}
 </div>
 </div>

 {/* ── 4 Pillars ──────────────────────────────────────────── */}
 <div className="max-w-5xl mx-auto px-6 mb-12">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {pillars.map((p, i) => (
 <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
 className="rounded-[20px] p-5 relative overflow-hidden" style={{ background: p.bg }}>
 <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 10%,rgba(0,180,216,0.12) 0%,transparent 60%)' }} />
 <span className="text-2xl mb-3 block">{p.icon}</span>
 <p className="text-white text-[14px] font-bold mb-0.5 relative">{p.title}</p>
 <p className="text-white/35 text-[10px] font-light mb-1.5 relative">{p.sub}</p>
 <p className="text-white/55 text-[11px] font-light relative leading-snug">{p.desc}</p>
 </motion.div>
 ))}
 </div>
 </div>

 {/* ── Phone Demo ─────────────────────────────────────────── */}
 <div className="flex flex-col items-center px-4 mb-10">
 <div className="text-center mb-5">
 <p className="text-[11px] text-[#AAA] font-semibold uppercase mb-1">نموذج توضيحي حقيقي</p>
 <h2 className="text-[22px] font-bold text-[#111]">شوف كيف يبدو تطبيق عيادتك</h2>
 <p className="text-[12px] text-[#AAA] mt-1 font-light">جرّب جميع الشاشات — بما فيها Face ID وAI Doctor </p>

 {/* Theme Toggle */}
 <div className="flex items-center justify-center mt-4">
 <div className="flex items-center p-1 rounded-full gap-1"
 style={{ background: '#E8EFF8', border: '1px solid rgba(11,74,111,0.12)' }}>
 <motion.button
 onClick={() => setPhoneTheme('light')}
 whileTap={{ scale: 0.93 }}
 className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold transition-all duration-250 relative"
 style={{ color: phoneTheme === 'light' ? '#fff' : '#888' }}>
 {phoneTheme === 'light' && (
 <motion.div layoutId="theme-pill" className="absolute inset-0 rounded-full"
 style={{ background: 'linear-gradient(135deg,#F59E0B,#FBBF24)' }}
 transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />
 )}
 <span className="relative z-10"></span>
 <span className="relative z-10">صباحي</span>
 </motion.button>

 <motion.button
 onClick={() => setPhoneTheme('dark')}
 whileTap={{ scale: 0.93 }}
 className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold transition-all duration-250 relative"
 style={{ color: phoneTheme === 'dark' ? '#fff' : '#888' }}>
 {phoneTheme === 'dark' && (
 <motion.div layoutId="theme-pill" className="absolute inset-0 rounded-full"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#1A2A4A)' }}
 transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />
 )}
 <span className="relative z-10"></span>
 <span className="relative z-10">ليلي</span>
 </motion.button>
 </div>
 </div>
 </div>

 <motion.div initial={{ opacity: 0, y: 28, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
 transition={{ duration: 0.65, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
 style={{ width: 390 }} className="relative">
 {/* top badge */}
 <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-white border border-[rgba(11,74,111,0.15)] text-[#0B4A6F] text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] whitespace-nowrap flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
 نموذج تفاعلي · مبني فعلياً
 </div>

 {/* zero-errors status strip — left side */}
 <motion.div
 initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.5, duration: 0.5 }}
 className="absolute -left-[156px] top-24 z-20 flex flex-col gap-2 hidden md:flex">
 {[
 { label:'API', ok:true },
 { label:'الخوادم', ok:true },
 { label:'الأمان', ok:true },
 { label:'Face ID', ok:true },
 { label:'AI', ok:true },
 ].map((s,i) => (
 <motion.div key={s.label}
 initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
 transition={{ delay: 0.6+i*0.07 }}
 className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] whitespace-nowrap"
 style={{ background:'rgba(255,255,255,0.9)', border:'1px solid rgba(11,74,111,0.1)', boxShadow:'0 2px 8px rgba(0,0,0,0.07)', backdropFilter:'blur(8px)' }}>
 <motion.span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0"
 animate={{ opacity:[1,0.4,1] }} transition={{ duration:2, repeat:Infinity, delay:i*0.2 }} />
 <span className="text-[10px] font-semibold text-[#0B4A6F]">{s.label}</span>
 <span className="text-[10px] font-bold text-[#22C55E]"></span>
 </motion.div>
 ))}
 <motion.div
 initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
 transition={{ delay:1.1, type:'spring' }}
 className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px]"
 style={{ background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.25)' }}>
 <span className="text-[11px] font-black text-[#16A34A]">٠ أخطاء</span>
 </motion.div>
 </motion.div>


 <PhoneFrame>
 <div className="flex-1 relative overflow-hidden h-full">
 {/* Face ID overlay */}
 <AnimatePresence>
 {showFaceID && (
 <FaceIDScreen onUnlock={() => setShowFaceID(false)} />
 )}
 </AnimatePresence>

 <AnimatePresence mode="wait" initial={false}>
 <motion.div key={activeTab}
 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
 transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
 className="absolute inset-0 overflow-y-auto scrollbar-none">
 {activeTab === 'home' && <ScreenHome theme={phoneTheme} />}
 {activeTab === 'appointments' && <ScreenAppointments theme={phoneTheme} />}
 {activeTab === 'card' && <ScreenCard theme={phoneTheme} walletHint={tourStep===3} qrHint={tourStep===4} onWalletTap={() => tourStep===3 && setTourStep(4)} onQrTap={() => tourStep===4 && setTourStep(99)} />}
 {activeTab === 'packages' && <ScreenPackages theme={phoneTheme} />}
 {activeTab === 'ai' && <ScreenAI theme={phoneTheme} />}
 {activeTab === 'notifications' && <ScreenNotifications theme={phoneTheme} />}
 </motion.div>
 </AnimatePresence>
 </div>
 <BottomNav activeTab={activeTab} onChangeTab={(t) => { setActiveTab(t); if (tourStep === 1) setTourStep(2); if (tourStep === 2 && t === 'card') setTourStep(3); }} notifCount={2} theme={phoneTheme} hintTab={tourStep === 2 ? 'card' : null} />
 </PhoneFrame>
 </motion.div>

 {/* ── Apple Watch card below phone ── */}
 <motion.div
  initial={{ opacity: 0, y: 16, scale: 0.96 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.55, delay: 0.3, ease: [0.34, 1.2, 0.64, 1] }}
  className="w-full max-w-[360px] rounded-[22px] overflow-hidden flex items-center gap-4 px-5 py-4 mt-3"
  style={{ background: 'linear-gradient(135deg, rgba(10,20,35,0.95) 0%, rgba(14,30,22,0.95) 100%)', border: '1px solid rgba(52,199,89,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)' }}>

  {/* watch illustration */}
  <div className="relative shrink-0" style={{ width: 52, height: 64 }}>
   <div className="absolute left-1/2 -translate-x-1/2 -top-[10px] rounded-t-[4px]"
    style={{ width: 16, height: 12, background: 'linear-gradient(180deg,#1e1e1e,#111)' }}/>
   <div className="absolute inset-0 rounded-[16px]"
    style={{ background: 'linear-gradient(145deg,#242424,#0d0d0d)', border: '2px solid rgba(52,199,89,0.25)', boxShadow: '0 0 20px rgba(52,199,89,0.15)' }}>
    <div className="absolute inset-[3px] rounded-[12px] overflow-hidden flex flex-col items-center justify-center gap-[3px]"
     style={{ background: '#000' }}>
     <p className="text-white/25 font-medium" style={{ fontSize: 5 }}>موعدك</p>
     <p className="text-white font-black" style={{ fontSize: 14, lineHeight: 1 }}>١٠:٣٠</p>
     <motion.div className="flex gap-[3px]"
      animate={{ opacity: [1, 0.15, 1] }}
      transition={{ duration: 1.8, repeat: Infinity }}>
      {[1, 0.5, 0.18].map((o, k) => (
       <div key={k} className="rounded-full" style={{ width: 4, height: 4, background: `rgba(52,199,89,${o})` }}/>
      ))}
     </motion.div>
    </div>
    <div className="absolute top-1/2 -translate-y-1/2 -right-[3.5px] rounded-r-[2px]"
     style={{ width: 3, height: 14, background: '#2a2a2a' }}/>
   </div>
   <div className="absolute left-1/2 -translate-x-1/2 -bottom-[10px] rounded-b-[4px]"
    style={{ width: 16, height: 12, background: 'linear-gradient(0deg,#1e1e1e,#111)' }}/>
  </div>

  {/* text */}
  <div className="flex-1 min-w-0">
   <div className="flex items-center gap-2 mb-1">
    <p className="text-white font-black text-[14px]">Apple Watch</p>
    <span className="text-[8px] font-black px-2 py-[3px] rounded-full shrink-0"
     style={{ background: 'rgba(52,199,89,0.12)', color: '#34C759', border: '1px solid rgba(52,199,89,0.25)' }}>قريباً</span>
   </div>
   <p className="text-[11px] leading-snug" style={{ color: 'rgba(255,255,255,0.35)' }}>إشعار موعدك مباشرة على رسغك</p>
  </div>

  {/* pulse ring */}
  <div className="relative shrink-0 w-8 h-8 flex items-center justify-center">
   <motion.div className="absolute inset-0 rounded-full"
    style={{ border: '1.5px solid rgba(52,199,89,0.4)' }}
    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
    transition={{ duration: 2, repeat: Infinity }}/>
   <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#34C759' }}/>
  </div>
 </motion.div>

  {/* ── Tour Bubble ─────────────────────────────────────────── */}
  <AnimatePresence mode="wait">
  {tourStep >= 1 && tourStep <= 4 && (
   <motion.div
    key={tourStep}
    initial={{ opacity:0, y:14, scale:0.95 }}
    animate={{ opacity:1, y:0, scale:1 }}
    exit={{ opacity:0, y:8, scale:0.97 }}
    transition={{ type:'spring', damping:22, stiffness:260 }}
    className="mt-5 w-full max-w-[380px] rounded-[22px] overflow-hidden"
    style={{ background:'linear-gradient(145deg,#050E1A,#0B3A5A)', border:'1px solid rgba(0,180,216,0.25)', boxShadow:'0 8px 32px rgba(0,0,0,0.22)' }}>
    <div className="px-5 pt-4 pb-4 relative">
     <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at 80% 20%,rgba(0,180,216,0.10) 0%,transparent 60%)' }}/>
     <div className="relative z-10 flex items-start gap-3">
      <div className="shrink-0 flex flex-col items-center gap-1.5 pt-1">
       {[1,2,3,4].map(s => (
        <motion.div key={s} className="rounded-full transition-all duration-300"
         style={{ width:s===tourStep?6:4, height:s===tourStep?6:4, background:s<=tourStep?'#00B4D8':'rgba(255,255,255,0.12)' }}/>
       ))}
      </div>
      <div className="flex-1 min-w-0">
       <div className="flex items-center gap-2 mb-1.5">
        <motion.div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
         style={{ background:'rgba(0,180,216,0.18)', border:'1px solid rgba(0,180,216,0.35)' }}
         animate={{ scale:[1,1.2,1] }} transition={{ duration:1.4, repeat:Infinity }}>
         <span className="text-[#00B4D8] text-[11px] font-black">
          {tourStep===1?'↓':tourStep===2?'←':tourStep===3?'⬛':'QR'}
         </span>
        </motion.div>
        <p className="text-white font-black text-[13px] leading-snug">
         {tourStep===1 && 'جرّب الشاشات من القائمة أسفل'}
         {tourStep===2 && 'اضغط "بطاقتي" لهوية المريض الرقمية'}
         {tourStep===3 && 'اضغط أضف لـ Apple Wallet'}
         {tourStep===4 && 'أو اعرض QR للاستقبال الفوري'}
        </p>
       </div>
       <p className="text-white/40 text-[11px] leading-snug font-light">
        {tourStep===1 && 'الرئيسية · مواعيد · بطاقتي · AI Doctor · تنبيهات'}
        {tourStep===2 && 'بطاقة رقمية تُضاف لـ Apple Wallet وتُعرَض بـ QR في الاستقبال'}
        {tourStep===3 && 'يحمّل ملف .pkpass مباشرة — يعمل بدون إنترنت في الاستقبال'}
        {tourStep===4 && 'رمز QR فوري للاستقبال بدون ورق ولا انتظار'}
       </p>
      </div>
      <button onClick={() => setTourStep(99)}
       className="shrink-0 text-white/22 text-[10px] font-semibold hover:text-white/50 transition-colors pt-0.5 whitespace-nowrap">
       تخطّ
      </button>
     </div>
    </div>
    <div className="h-[2px] w-full" style={{ background:'rgba(255,255,255,0.06)' }}>
     <motion.div className="h-full rounded-full"
      style={{ background:'linear-gradient(90deg,#0B4A6F,#00B4D8)' }}
      animate={{ width:`${(tourStep/4)*100}%` }}
      transition={{ duration:0.4 }}/>
    </div>
   </motion.div>
  )}
  </AnimatePresence>

 {/* ── Custom Design Note ─────────────────────────────────── */}
 <motion.div
 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
 className="mt-6 max-w-sm w-full mx-auto rounded-[22px] p-5 relative overflow-hidden"
 style={{ background: 'linear-gradient(145deg,#050E1A,#0B3A5A)', border: '1px solid rgba(0,180,216,0.2)' }}>
 <div className="absolute inset-0 pointer-events-none"
 style={{ background: 'radial-gradient(ellipse at 80% 0%,rgba(0,180,216,0.12) 0%,transparent 60%)' }}/>
 <div className="relative z-10">
 <div className="flex items-center gap-2 mb-3">
 <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
 style={{ background: 'rgba(0,180,216,0.15)', border: '1px solid rgba(0,180,216,0.3)' }}>
 <span className="text-[#00B4D8] text-[12px]"></span>
 </div>
 <p className="text-[#00B4D8] text-[11px] font-bold uppercase">هذا مو قالب جاهز</p>
 </div>
 <p className="text-white text-[15px] font-bold mb-2 leading-snug">
 تطبيقك بتصميم مخصص لك وحدك
 </p>
 <p className="text-white/45 text-[12px] font-light leading-relaxed mb-4">
 كل شاشة، كل لون، كل خاصية — تبنى من الصفر بهوية عيادتك. اسم عيادتك، شعارك، ألوانك. ما في حدود.
 </p>
 <div className="space-y-2 mb-4">
 {[
 'شعارك وألوانك في كل مكان',
 'شاشات مخصصة حسب تخصصك الطبي',
 'أي خاصية تتخيلها — ننفذها',
 'تصميم لا يشبه أحد غيرك',
 ].map(item => (
 <div key={item} className="flex items-center gap-2">
 <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#00B4D8' }}/>
 <p className="text-white/60 text-[12px] font-light">{item}</p>
 </div>
 ))}
 </div>
 <a href="https://wa.me/966" target="_blank" rel="noopener noreferrer"
 className="flex items-center justify-center gap-2 w-full py-3 rounded-[14px] font-bold text-[13px] transition-all active:scale-95"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)', color: '#fff' }}>
 <span>أرني تصميم عيادتي</span>
 <span>←</span>
 </a>
 </div>
 </motion.div>
 </div>

 {/* ── Patient Card showcase ───────────────────────────────── */}
 <div className="max-w-5xl mx-auto px-6 mb-12">
 <div className="rounded-[28px] p-7 md:p-9 relative overflow-hidden"
 style={{ background: 'linear-gradient(145deg,#050E1A 0%,#0B3A5A 45%,#050E1A 80%)' }}>
 <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 85% 20%,rgba(0,180,216,0.12) 0%,transparent 55%)' }} />
 <div className="absolute bottom-0 left-0 w-40 h-40 opacity-[0.05]"
 style={{ backgroundImage: 'radial-gradient(circle,#00B4D8 1.5px,transparent 1.5px)', backgroundSize: '10px 10px' }} />

 <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-7">
 <div className="flex-1">
 <p className="text-[#00B4D8] text-[10px] font-semibold uppercase mb-2">بطاقة المريض الرقمية</p>
 <h3 className="text-white text-[24px] font-bold mb-2.5 leading-tight">
 هوية المريض في جيبه<br />
 <span style={{ color: '#00B4D8' }}>بدون ورق · بدون انتظار</span>
 </h3>
 <p className="text-white/45 text-[13px] font-light leading-relaxed mb-5 max-w-xs">
 كل مريض يحمل بطاقة رقمية بمعلوماته الطبية الكاملة — QR للاستقبال، إسعاف للطوارئ، ملف صحي للتاريخ المرضي.
 </p>
 <div className="space-y-2">
 {['معلومات طبية كاملة وآمنة','QR فوري في الاستقبال دون إجراءات','ربط مباشر مع التأمين الصحي'].map(item => (
 <div key={item} className="flex items-center gap-2 text-white/55 text-[12px]">
 <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full shrink-0" />
 {item}
 </div>
 ))}
 </div>
 </div>
 <div className="w-full md:w-[260px] rounded-[22px] p-5 relative overflow-hidden shrink-0"
 style={{ background: 'linear-gradient(145deg,#030810,#0B3A5A,#030810)', border: '1px solid rgba(0,180,216,0.18)' }}>
 <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 0%,rgba(0,180,216,0.12) 0%,transparent 55%)' }} />
 <div className="relative z-10">
 <div className="flex items-center justify-between mb-4">
 <div>
 <p style={{ color: '#00B4D8' }} className="font-bold text-[15px]">عيادتك</p>
 <p className="text-white/20 text-[8px]">DIGITAL HEALTH CARD</p>
 </div>
 <span className="text-[14px]"></span>
 </div>
 <p className="text-white/25 text-[8px] mb-0.5">PATIENT NAME</p>
 <p className="text-white text-[13px] font-semibold mb-4">اسم المريض</p>
 <div className="grid grid-cols-3 gap-1">
 {[['ID','#PT-001','#00B4D8'],['BLOOD','O+','#fff'],['INS.','بوبا','rgba(255,255,255,0.6)']].map(([l,v,c]) => (
 <div key={l}>
 <p className="text-white/25 text-[7px] mb-0.5">{l}</p>
 <p className="text-[10px] font-bold" style={{ color: c }}>{v}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* زرّا Apple Wallet */}
 <div className="flex flex-col sm:flex-row gap-3 mt-6">
 <WalletBtn
 label="هويتي الطبية"
 sub="بطاقة المريض الرقمية"
 gradient="linear-gradient(135deg,#000,#1a1a1a)"
 border="rgba(255,255,255,0.15)"
 endpoint="/api/wallet/pass"
 filename="talqa-patient-card.pkpass"
 body={{ patientName:'اسم المريض', patientId:'PT-001', clinicName:'عيادتك', bloodType:'O+', insurance:'بوبا', daysValid:30 }}
 />
 <WalletBtn
 label="موعدي القادم"
 sub="بطاقة الحجز الذكية"
 gradient="linear-gradient(135deg,#1a0533,#2d1060)"
 border="rgba(147,51,234,0.4)"
 endpoint="/api/wallet/appointment"
 filename="talqa-appointment.pkpass"
 body={{ patientName:'اسم المريض', patientId:'PT-001', doctorName:'د. الطبيب', specialty:'طب عام', clinicName:'عيادتك', apptDate:'الأربعاء، ٢٣ يوليو', apptTime:'١٠:٣٠ ص', roomNumber:'غرفة ١', apptId:'APT-001' }}
 />
 </div>
 </div>
 </div>

 {/* ── Owner Dashboard CTA ────────────────────────────────── */}
 <div className="max-w-5xl mx-auto px-6 mb-10">
 <motion.div
 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
 className="rounded-[28px] overflow-hidden relative"
 style={{ background: 'linear-gradient(145deg,#050E1A 0%,#0B3A5A 45%,#050E1A 100%)' }}>
 <div className="absolute inset-0 pointer-events-none"
 style={{ background: 'radial-gradient(ellipse at 20% 50%,rgba(0,180,216,0.15) 0%,transparent 55%)' }} />
 <div className="relative z-10 p-7 md:p-9">
 {/* Header row */}
 <div className="flex flex-col md:flex-row md:items-center gap-4 mb-7">
 <div className="flex-1">
 <span className="inline-flex items-center gap-1.5 text-[#10B981] text-[10px] font-bold bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1 rounded-full mb-3">
 <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
 جديد · لوحة الإدارة الذكية
 </span>
 <h3 className="text-white text-[22px] md:text-[26px] font-bold mb-2 leading-tight">
 لوحة تحكم المالك<br />
 <span style={{ color: '#00B4D8' }}>والموظفين</span>
 </h3>
 <p className="text-white/45 text-[13px] font-light leading-relaxed max-w-sm">
 إيرادات اليوم · طابور المرضى · أداء الفريق الطبي · التقارير الشهرية — كل شيء في مكان واحد.
 </p>
 </div>
 </div>
 {/* Three role buttons */}
 <div className="grid grid-cols-3 gap-3">
 {([
 ['owner', '', 'المالك', true],
 ['reception', '', 'الاستقبال', false],
 ['doctor', '', 'الدكتور', false],
 ] as [string,string,string,boolean][]).map(([role,emoji,title,isNav]) => (
 <button key={role}
 onClick={() => navigate(role === 'owner' ? '/owner' : role === 'reception' ? '/reception' : '/doctor')}
 className="flex flex-col items-center gap-2 py-4 px-3 rounded-[18px] transition-all duration-200 hover:scale-105 active:scale-95"
 style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(0,180,216,0.2)' }}>
 <span className="text-2xl">{emoji}</span>
 <p className="text-white font-bold text-[13px]">{title}</p>
 <span className="text-[11px] font-semibold px-3 py-1 rounded-full"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)', color: '#fff' }}>
 شاهد اللوحة →
 </span>
 </button>
 ))}
 </div>
 </div>
 </motion.div>
 </div>

 {/* ── Features grid ──────────────────────────────────────── */}
 <div className="max-w-5xl mx-auto px-6 mb-12">
 <div className="text-center mb-6">
 <p className="text-[11px] text-[#AAA] font-semibold uppercase mb-1.5">كل ما تحصل عليه عيادتك</p>
 <h2 className="text-[24px] font-bold text-[#111]">١٨ مزايا في منظومة واحدة</h2>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
 {allFeatures.map((f, i) => (
 <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}
 className="bg-white/80 rounded-[18px] p-4 border border-[rgba(11,74,111,0.07)] shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:border-[rgba(11,74,111,0.18)] hover:-translate-y-0.5 transition-all duration-200">
 <span className="text-2xl mb-2 block">{f.icon}</span>
 <p className="text-[12px] font-semibold text-[#111] mb-0.5 leading-snug">{f.title}</p>
 <p className="text-[10px] text-[#999] font-light leading-relaxed">{f.desc}</p>
 </motion.div>
 ))}
 </div>
 </div>

 {/* ── Testimonials ────────────────────────────────────────── */}
 <div className="max-w-5xl mx-auto px-6 mb-12">
 <div className="text-center mb-6">
 <p className="text-[11px] text-[#AAA] font-semibold uppercase mb-1.5">قالوا عنّا</p>
 <h2 className="text-[24px] font-bold text-[#111]">عيادات ومستشفيات تثق بتلقا تك</h2>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 {testimonials.map((t, i) => (
 <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}
 className="bg-white/80 rounded-[22px] p-5 border border-[rgba(11,74,111,0.07)] shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
 <div className="flex gap-0.5 mb-3">
 {[1,2,3,4,5].map(s => <span key={s} className="text-[#F59E0B] text-[13px]"></span>)}
 </div>
 <p className="text-[13px] text-[#444] font-light leading-relaxed mb-4 italic">"{t.quote}"</p>
 <div className="flex items-center gap-2.5 pt-3 border-t border-[rgba(11,74,111,0.06)]">
 <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>{t.initials}</div>
 <div>
 <p className="text-[12px] font-semibold text-[#111]">{t.name}</p>
 <p className="text-[10px] text-[#AAA] font-light">{t.role}</p>
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </div>

 {/* ── Security Section ────────────────────────────────────── */}
 <div className="max-w-5xl mx-auto px-6 mb-12">
 <div className="rounded-[32px] overflow-hidden relative"
 style={{ background: 'linear-gradient(145deg,#020C18 0%,#031A2E 50%,#020C18 100%)' }}>
 <div className="absolute inset-0 pointer-events-none"
 style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(16,185,129,0.10) 0%,transparent 60%)' }} />
 <div className="absolute top-0 right-0 w-36 h-36 opacity-[0.04]"
 style={{ backgroundImage: 'radial-gradient(circle,#10B981 1.5px,transparent 1.5px)', backgroundSize: '10px 10px' }} />

 <div className="relative z-10 p-8 md:p-10">
 {/* Header */}
 <div className="text-center mb-8">
 <div className="inline-flex items-center gap-2 text-[#10B981] text-[11px] font-bold bg-[#10B981]/10 border border-[#10B981]/20 px-4 py-1.5 rounded-full mb-4">
 <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
 الأمان في مقدمة أولوياتنا — دائماً
 </div>
 <h2 className="text-white text-[28px] md:text-[38px] font-bold leading-tight mb-3">
 الأكثر أماناً في قطاع<br />
 <span style={{ color: '#10B981' }}>الرعاية الصحية</span>
 </h2>
 <p className="text-white/40 text-[14px] font-light max-w-xl mx-auto leading-relaxed">
 بيانات مرضاك هي أثمن شيء تملكه عيادتك. نحن نعاملها هكذا — بتشفير لا يُكسر، وأمان لا يُساوَم عليه.
 </p>
 </div>

 {/* Compliance badges */}
 <div className="flex flex-wrap justify-center gap-3 mb-8">
 {[
 { label: 'HIPAA Compliant', sub: 'معايير الخصوصية الصحية الأمريكية' },
 { label: 'ISO 27001', sub: 'أمن المعلومات الدولي' },
 { label: 'NDMO', sub: 'هيئة الحكومة الرقمية السعودية' },
 { label: 'SOC 2 Type II', sub: 'أمن الأنظمة والخدمات' },
 { label: 'AES-256', sub: 'تشفير عسكري المستوى' },
 ].map(b => (
 <div key={b.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-[14px]"
 style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)' }}>
 <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center shrink-0">
 <span className="text-[#10B981] text-[10px] font-bold"></span>
 </div>
 <div>
 <p className="text-[#10B981] text-[11px] font-bold leading-none">{b.label}</p>
 <p className="text-white/25 text-[9px] mt-0.5">{b.sub}</p>
 </div>
 </div>
 ))}
 </div>

 {/* 6 pillars */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
 {[
 { icon:'', title:'تشفير AES-256 من الطرف للطرف', desc:'كل بيانات مريض — من الاسم إلى التشخيص — مشفرة بنفس المعيار المستخدم في حماية الأسرار الحكومية.', accent:'#10B981' },
 { icon:'', title:'معمارية Zero-Knowledge', desc:'مفتاح التشفير ملكك وحدك. حتى فريق تلقا تك لا يستطيع الاطلاع على بيانات مرضاك — هذا بنية تقنية.', accent:'#00B4D8' },
 { icon:'', title:'مصادقة متعددة العوامل', desc:'Face ID + بصمة الإصبع + رمز تحقق لكل دخول. لا يصل لبياناتك أحد بدون إذنك الصريح.', accent:'#8B5CF6' },
 { icon:'', title:'نسخ احتياطي مشفر كل ٦ ساعات', desc:'بياناتك محفوظة في مراكز بيانات موزعة جغرافياً — مشفرة بالكامل، محمية من الكوارث والاختراقات.', accent:'#F59E0B' },
 { icon:'', title:'مراقبة بالذكاء الاصطناعي ٢٤/٧', desc:'نظام AI يرصد كل وصول ويكتشف أي نشاط غير اعتيادي ويوقفه قبل أن يصبح تهديداً.', accent:'#EF4444' },
 { icon:'', title:'متوافق مع PDPL السعودي', desc:'منظومتك متوافقة مع نظام حماية البيانات الشخصية ولوائح هيئة الحكومة الرقمية السعودية.', accent:'#10B981' },
 ].map((p, i) => (
 <motion.div key={i} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.07*i }}
 className="rounded-[22px] p-5 relative overflow-hidden"
 style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)' }}>
 <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.06] rounded-bl-[80px]" style={{ background:p.accent }} />
 <span className="text-3xl mb-3 block">{p.icon}</span>
 <p className="text-white text-[14px] font-bold mb-2 leading-snug">{p.title}</p>
 <p className="text-white/35 text-[12px] font-light leading-relaxed">{p.desc}</p>
 </motion.div>
 ))}
 </div>

 {/* Bottom bar */}
 <div className="rounded-[20px] p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
 style={{ background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.15)' }}>
 <div className="text-[38px] shrink-0"></div>
 <div className="flex-1 text-center sm:text-right">
 <p className="text-[#10B981] text-[16px] font-bold mb-1">بياناتك ملكك وحدك. نحن لا نراها.</p>
 <p className="text-white/35 text-[13px] font-light">لم يُسجَّل أي اختراق لبيانات منذ تأسيس المنظومة. هذا ليس حظاً — هذا هندسة.</p>
 </div>
 {[['٠','اختراقات مسجلة'],['١٠٠٪','تشفير البيانات'],['٢٤/٧','مراقبة أمنية']].map(([v,l]) => (
 <div key={l} className="shrink-0 text-center">
 <p className="text-[#10B981] text-[32px] font-bold leading-none">{v}</p>
 <p className="text-white/30 text-[11px]">{l}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* ── FAQ ─────────────────────────────────────────────────── */}
 <div className="max-w-2xl mx-auto px-6 mb-14">
 <div className="text-center mb-7">
 <p className="text-[11px] text-[#AAA] font-semibold uppercase mb-1.5">أسئلة شائعة</p>
 <h2 className="text-[24px] font-bold text-[#111]">كل ما يدور في بالك</h2>
 </div>
 <div className="space-y-3">
 {[
 { q: 'كم يستغرق التسليم الكامل؟', a: '٦٠ يوم من توقيع العقد — تطبيق iOS وAndroid + موقع إلكتروني + نظام إدارة + تدريب الفريق. مع ضمان تشغيل فعلي قبل الإطلاق.' },
 { q: 'هل يعمل مع نظام HIS الحالي في عيادتنا؟', a: 'نعم — عندنا تكامل مع أشهر أنظمة HIS وLIS في السوق السعودي. نرسل لك تقرير التوافق قبل التعاقد.' },
 { q: 'وش يصير لو احتجنا تعديل بعد التسليم؟', a: 'سنة دعم وصيانة مجانية تشمل التعديلات والتحديثات. بعدها نقدم باقات دعم بأسعار تفضيلية للعملاء القدامى.' },
 { q: 'هل بيانات مرضانا محفوظة وآمنة؟', a: 'المنظومة تعمل على خوادم داخل المملكة، مشفرة AES-256، ومتوافقة مع نظام PDPL وهيئة الحكومة الرقمية. بياناتك لا تخرج ولا نراها.' },
 { q: 'وش السعر النهائي؟', a: 'السعر يعتمد على حجم العيادة وعدد الأطباء والخصائص المطلوبة. تواصل معنا للحصول على عرض مفصّل ومجاني خلال ٢٤ ساعة.' },
 ].map((item, i) => (
 <FAQItem key={i} q={item.q} a={item.a} />
 ))}
 </div>
 </div>

 {/* ── CTA ─────────────────────────────────────────────────── */}
 <div className="max-w-lg mx-auto px-6 mb-12">
 <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
 className="rounded-[28px] p-8 text-center relative overflow-hidden"
 style={{ background: 'linear-gradient(145deg,#050E1A 0%,#0B3A5A 45%,#050E1A 100%)' }}>
 <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(0,180,216,0.18) 0%,transparent 60%)' }} />
 <div className="relative z-10">
 <p className="text-[#00B4D8] text-[11px] font-semibold uppercase mb-3">سعر إطلاق خاص</p>
 <p className="text-white text-[52px] font-bold leading-none mb-1">25,000</p>
 <p style={{ color: '#00B4D8' }} className="text-[18px] font-light mb-1.5">ريال سعودي</p>
 <p className="text-white/30 text-[12px] font-light mb-6 leading-relaxed">
 iOS + Android · موقع · AI Doctor · تليميديسن · دعم كامل
 </p>
 <div className="grid grid-cols-2 gap-2.5 mb-7">
 {included.map(item => (
 <div key={item} className="flex items-center gap-2 text-white/50 text-[11px]">
 <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#00B4D8' }} />
 {item}
 </div>
 ))}
 </div>
 <a href="https://wa.me/966551378531" target="_blank" rel="noopener noreferrer"
 className="block w-full bg-white font-bold text-[15px] py-4 rounded-[16px] hover:bg-[#F0F8FF] active:scale-95 transition-all duration-200 shadow-[0_8px_28px_rgba(0,0,0,0.2)]"
 style={{ color: '#0B4A6F' }}>
 ابدأ مشروع عيادتك مع تلقا تك 
 </a>
 <p className="text-white/25 text-[11px] mt-3 font-light">تواصل معنا على واتساب للاستفسار المجاني</p>
 </div>
 </motion.div>
 </div>

 {/* ── Footer ─────────────────────────────────────────────── */}
 <div className="text-center pb-10 px-6">
 <div className="flex items-center justify-center gap-2 mb-2">
 <TalqaShield size={24} />
 <span className="text-[13px] font-bold text-[#111]">تلقا تك</span>
 </div>
 <p className="text-[11px] text-[#CCC] font-light">وكالة تصميم تطبيقات ومواقع احترافية · جميع الحقوق محفوظة ٢٠٢٦</p>

 {/* Commercial Registration Badge */}
 <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full border border-[#E8F4F8] bg-[#F5FBFF]">
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B4A6F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
 <polyline points="22 4 12 14.01 9 11.01"/>
 </svg>
 <span className="text-[11px] text-[#0B4A6F] font-semibold">مؤسسة تلقا · سجل تجاري: 7054835322</span>
 </div>
 </div>

 {/* Staff dashboards modal */}
 {staffModal && (
 <AppModal
 open={!!staffModal}
 onClose={() => setStaffModal(null)}
 initialRole={staffModal}
 />
 )}
 </div>
 );
}
