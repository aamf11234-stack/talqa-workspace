import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Zap, X } from 'lucide-react';

interface Props { theme?: 'dark' | 'light' }

/* ── Data ── */
const categories = [
 { id: 'all', label: 'الكل' },
 { id: 'laser', label: ' ليزر' },
 { id: 'dental', label: ' أسنان' },
 { id: 'physio', label: ' علاج' },
 { id: 'beauty', label: ' تجميل' },
];

const packages = [
 {
 id: 1, cat: 'laser',
 icon: '', color: '#8B5CF6', lightColor: '#7C3AED',
 name: 'ليزر إزالة الشعر',
 sub: 'ألكساندرايت 755nm',
 price: 800, unit: 'جلسة',
 total: 6, done: 4,
 badge: 'الأكثر طلباً',
 badgeColor: '#8B5CF6',
 features: ['ليزر ألكساندرايت المعتمد', 'جلسة ٤٥ دقيقة كاملة', 'كريم تخدير مجاناً', 'متابعة ما بعد الجلسة'],
 savings: 'وفّرت ٨٠٠ ر.س' },
 {
 id: 2, cat: 'dental',
 icon: '', color: '#00B4D8', lightColor: '#0284C7',
 name: 'تبييض الأسنان',
 sub: 'تقنية Zoom المتقدمة',
 price: 950, unit: 'جلسة',
 total: 3, done: 1,
 badge: 'نتائج فورية',
 badgeColor: '#00B4D8',
 features: ['تقنية Zoom الأمريكية', 'تبييض ١٢ درجة في جلسة', 'فحص شامل مسبق', 'ضمان النتيجة ٦ أشهر'],
 savings: '' },
 {
 id: 3, cat: 'physio',
 icon: '', color: '#34C759', lightColor: '#16A34A',
 name: 'علاج طبيعي متكامل',
 sub: 'إعادة تأهيل شاملة',
 price: 380, unit: 'جلسة',
 total: 12, done: 7,
 badge: 'موصى به',
 badgeColor: '#34C759',
 features: ['جلسة ٦٠ دقيقة مع معالج معتمد', 'تمارين منزلية مصممة', 'متابعة إلكترونية أسبوعية', 'تقرير تقدّم مفصّل'],
 savings: 'وفّرت ٤٠٠ ر.س' },
 {
 id: 4, cat: 'beauty',
 icon: '', color: '#F59E0B', lightColor: '#D97706',
 name: 'حقن البوتوكس',
 sub: 'Botox Allergan الأصلي',
 price: 1400, unit: 'جلسة',
 total: 2, done: 0,
 badge: 'مميز',
 badgeColor: '#F59E0B',
 features: ['بوتوكس أليرغان الأصلي ١٠٠%', 'طبيب متخصص معتمد', 'نتائج تدوم ٦ أشهر', 'جلسة مراجعة مجانية'],
 savings: '' },
 {
 id: 5, cat: 'dental',
 icon: '', color: '#0B4A6F', lightColor: '#1E40AF',
 name: 'تقويم الأسنان الشفاف',
 sub: 'Invisalign — بدون تقويم معدني',
 price: 1800, unit: 'شهر',
 total: 18, done: 6,
 badge: 'باقة VIP',
 badgeColor: '#0B4A6F',
 features: ['أطباق Invisalign المعتمدة', 'متابعة شهرية مع دكتور', 'صور ثلاثية الأبعاد للنتيجة', 'ريتينر مجاني بعد الانتهاء'],
 savings: 'وفّرت ١٨٠٠ ر.س' },
 {
 id: 6, cat: 'laser',
 icon: '', color: '#EF4444', lightColor: '#DC2626',
 name: 'ليزر تكسير الدهون',
 sub: 'SculpSure تقنية حرارية',
 price: 2200, unit: 'جلسة',
 total: 4, done: 1,
 badge: 'حديث',
 badgeColor: '#EF4444',
 features: ['تقنية SculpSure الأمريكية', 'تكسير دهون بلا جراحة', 'جلسة ٢٥ دقيقة بلا ألم', 'نتائج ظاهرة في ٦ أسابيع'],
 savings: '' },
];

/* ── Session Progress Ring ── */
function SessionRing({ total, done, color }: { total:number; done:number; color:string }) {
 const r = 26, circ = 2 * Math.PI * r;
 const pct = done / total;
 return (
 <div className="relative flex items-center justify-center" style={{ width:62, height:62 }}>
 <svg width="62" height="62" viewBox="0 0 62 62">
 <circle cx="31" cy="31" r={r} fill="none" stroke={`${color}22`} strokeWidth="4.5"/>
 <motion.circle cx="31" cy="31" r={r} fill="none" strokeWidth="4.5" strokeLinecap="round"
 stroke={color} strokeDasharray={circ} strokeDashoffset={circ}
 animate={{ strokeDashoffset: circ * (1 - pct) }}
 transition={{ duration:1.2, ease:[0.4,0,0.2,1], delay:0.2 }}
 transform="rotate(-90 31 31)"/>
 </svg>
 <div className="absolute flex flex-col items-center">
 <span className="text-[13px] font-black leading-none" style={{ color }}>{total - done}</span>
 <span className="text-[7px] font-semibold leading-none mt-0.5" style={{ color:`${color}80` }}>باقي</span>
 </div>
 </div>
 );
}

/* ── Book Sheet ── */
function BookSheet({ pkg, onClose, dark }: { pkg:typeof packages[0]; onClose:()=>void; dark:boolean }) {
 const [booked, setBooked] = useState(false);
 const sheetBg = dark ? '#141E2E' : '#fff';
 const sheetBdr = dark ? 'rgba(255,255,255,0.08)' : 'rgba(11,74,111,0.1)';
 const divider = dark ? 'rgba(255,255,255,0.06)' : 'rgba(11,74,111,0.08)';
 const txt = dark ? '#fff' : '#0A1628';
 const txtSub = dark ? 'rgba(255,255,255,0.4)' : '#5B7A96';
 const rowBg = dark ? 'rgba(255,255,255,0.04)' : '#F8F9FC';
 const rowBdr = dark ? 'rgba(255,255,255,0.06)' : 'rgba(11,74,111,0.08)';

 return (
 <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
 className="absolute inset-0 z-50 flex items-end"
 style={{ background:'rgba(0,0,0,0.6)', backdropFilter:'blur(10px)' }}
 onClick={onClose}>
 <motion.div initial={{ y:'100%' }} animate={{ y:0 }} exit={{ y:'100%' }}
 transition={{ type:'spring', damping:28, stiffness:260 }}
 className="w-full rounded-t-[28px] overflow-hidden"
 style={{ background:sheetBg, border:`1px solid ${sheetBdr}`, borderBottom:'none', boxShadow:'0 -8px 40px rgba(0,0,0,0.3)' }}
 onClick={e => e.stopPropagation()}>

 <div className="flex justify-center pt-3 pb-1">
 <div className="w-10 h-1 rounded-full" style={{ background:dark?'rgba(255,255,255,0.15)':'rgba(11,74,111,0.12)' }}/>
 </div>

 {booked ? (
 <div className="flex flex-col items-center py-10 px-6">
 <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', damping:14 }}
 className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
 style={{ background:'rgba(52,199,89,0.15)', border:'1px solid rgba(52,199,89,0.3)' }}>
 <CheckCircle size={32} color="#34C759"/>
 </motion.div>
 <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }} className="text-center">
 <p className="text-[18px] font-bold mb-1" style={{ color:txt }}>تم حجز جلستك!</p>
 <p className="text-[12px] leading-relaxed mb-1" style={{ color:txtSub }}>{pkg.name}</p>
 <p className="text-[11px]" style={{ color:txtSub }}>ستصلك تفاصيل الموعد على الواتساب</p>
 </motion.div>
 </div>
 ) : (
 <>
 <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom:`1px solid ${divider}` }}>
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-[20px]"
 style={{ background:`${pkg.color}20` }}>{pkg.icon}</div>
 <div>
 <p className="text-[14px] font-bold" style={{ color:txt }}>{pkg.name}</p>
 <p className="text-[10px]" style={{ color:txtSub }}>{pkg.sub}</p>
 </div>
 </div>
 <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center"
 style={{ background:dark?'rgba(255,255,255,0.08)':'rgba(11,74,111,0.07)' }}>
 <X size={13} style={{ color:txtSub }}/>
 </button>
 </div>

 <div className="px-5 py-4 space-y-2.5">
 {[
 ['الجلسات المتبقية', `${pkg.total - pkg.done} من ${pkg.total}`],
 ['سعر الجلسة', `${pkg.price.toLocaleString('ar-SA')} ر.س`],
 ['المجموع المتبقي', `${((pkg.total - pkg.done) * pkg.price).toLocaleString('ar-SA')} ر.س`],
 ].map(([l, v]) => (
 <div key={l} className="flex items-center justify-between px-4 py-3 rounded-[14px]"
 style={{ background:rowBg, border:`1px solid ${rowBdr}` }}>
 <span className="text-[12px]" style={{ color:txtSub }}>{l}</span>
 <span className="text-[12px] font-bold" style={{ color:txt }}>{v}</span>
 </div>
 ))}
 </div>

  <div className="px-5 pb-2">
  <p className="text-[10px] font-bold mb-2 text-center" style={{ color:txtSub }}>ادفع بعدين بدون فوائد</p>
  <div className="flex gap-2">
  {[
    { src: '/clinic-demo/tabby.webp',  alt: 'Tabby'  },
    { src: '/clinic-demo/tamara.jpeg', alt: 'تمارا' },
  ].map(({ src, alt }) => (
    <button key={alt}
    className="flex-1 flex items-center justify-center py-2.5 rounded-[14px] transition-all active:scale-95"
    style={{ background: dark ? 'rgba(255,255,255,0.06)' : '#F8F9FC',
             border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(11,74,111,0.1)'}` }}>
    <img src={src} alt={alt} className="h-6 object-contain" />
    </button>
  ))}
  </div>
  </div>

  <div className="px-5 pb-8 pt-3">
  <motion.button whileTap={{ scale:0.97 }} onClick={() => { setBooked(true); setTimeout(onClose, 2500); }}
  className="w-full py-4 rounded-[18px] text-white font-black text-[14px]"
  style={{ background:`linear-gradient(135deg,${pkg.color},${pkg.color}CC)`, boxShadow:`0 8px 24px ${pkg.color}40` }}>
  احجز الجلسة القادمة ←
  </motion.button>
  </div>
 </>
 )}
 </motion.div>
 </motion.div>
 );
}

/* ── Main Screen ── */
export function ScreenPackages({ theme = 'dark' }: Props) {
 const dark = theme === 'dark';
 const [cat, setCat] = useState('all');
 const [booking, setBooking] = useState<typeof packages[0]|null>(null);

 /* theme tokens */
 const bg = dark ? '#0E1621' : '#F0F5FB';
 const headerBg = dark ? 'linear-gradient(170deg,#0A1628,#0D2240)' : 'linear-gradient(170deg,#fff,#EBF4FF)';
 const headerFade = dark ? '#0E1621' : '#F0F5FB';
 const headerGlow = dark ? 'rgba(0,180,216,0.14)' : 'rgba(11,74,111,0.07)';
 const card = dark ? 'rgba(255,255,255,0.04)' : '#fff';
 const cardBorder = dark ? 'rgba(255,255,255,0.08)' : 'rgba(11,74,111,0.09)';
 const cardShadow = dark ? 'none' : '0 2px 16px rgba(11,74,111,0.08)';
 const txt = dark ? '#fff' : '#0A1628';
 const txtSub = dark ? 'rgba(255,255,255,0.40)' : '#5B7A96';
 const divider = dark ? 'rgba(255,255,255,0.05)' : 'rgba(11,74,111,0.07)';
 const tabBarBg = dark ? 'rgba(255,255,255,0.05)' : 'rgba(11,74,111,0.05)';
 const tabTxtOff = dark ? 'rgba(255,255,255,0.4)' : '#8AAFC4';
 const checkColor = dark ? 'rgba(255,255,255,0.25)' : '#9DB5CC';

 const filtered = cat === 'all' ? packages : packages.filter(p => p.cat === cat);

 return (
 <div className="flex flex-col h-full" style={{ background:bg, fontFamily:'Tajawal,sans-serif' }}>

 {/* ── Header ── */}
 <div className="shrink-0 px-5 pt-3 pb-5 relative overflow-hidden" style={{ background:headerBg }}>
 <div className="absolute inset-0 pointer-events-none"
 style={{ background:`radial-gradient(ellipse at 70% 30%, ${headerGlow} 0%, transparent 60%)` }}/>
 <div className="absolute bottom-0 inset-x-0 h-8 pointer-events-none"
 style={{ background:`linear-gradient(to bottom, transparent, ${headerFade})` }}/>
 <div className="relative z-10">
 <div className="flex items-center justify-between mb-1">
 <p className="text-[10px]" style={{ color:txtSub }}>باقاتك العلاجية</p>
 <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
 style={{ background:'rgba(52,199,89,0.12)', border:'1px solid rgba(52,199,89,0.22)' }}>
 <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]"/>
 <span className="text-[#34C759] text-[9px] font-bold">{packages.filter(p=>p.done<p.total).length} باقة نشطة</span>
 </div>
 </div>
 <p className="text-[20px] font-bold mb-4" style={{ color:txt }}>جلساتي</p>

 {/* Category tabs */}
 <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
 {categories.map(c => (
 <motion.button key={c.id} onClick={() => setCat(c.id)} whileTap={{ scale:0.92 }}
 className="shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-bold transition-all relative whitespace-nowrap"
 style={{ color: cat===c.id ? '#fff' : tabTxtOff }}>
 {cat===c.id && (
 <motion.div layoutId="cat-pill" className="absolute inset-0 rounded-full"
 style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}
 transition={{ type:'spring', bounce:0.2, duration:0.35 }}/>
 )}
 {cat!==c.id && (
 <div className="absolute inset-0 rounded-full" style={{ background:tabBarBg }}/>
 )}
 <span className="relative z-10">{c.label}</span>
 </motion.button>
 ))}
 </div>
 </div>
 </div>

 {/* ── Package Cards ── */}
 <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 space-y-3">
 <AnimatePresence mode="wait">
 <motion.div key={cat} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
 transition={{ duration:0.16 }} className="space-y-3">
 {filtered.map((pkg, i) => {
 const remaining = pkg.total - pkg.done;
 const pct = Math.round((pkg.done / pkg.total) * 100);
 const accentColor = dark ? pkg.color : pkg.lightColor;
 return (
 <motion.div key={pkg.id}
 initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
 transition={{ delay:i*0.06, type:'spring', damping:22 }}
 className="rounded-[22px] overflow-hidden"
 style={{ background:card, border:`1px solid ${cardBorder}`, boxShadow:cardShadow }}>

 {/* Top accent bar */}
 <div className="h-[3px]"
 style={{ background:`linear-gradient(90deg, ${accentColor}, ${accentColor}44, transparent)` }}/>

 <div className="px-4 pt-4 pb-3">
 {/* Top row */}
 <div className="flex items-start gap-3 mb-3.5">
 {/* Session ring */}
 <SessionRing total={pkg.total} done={pkg.done} color={accentColor}/>

 {/* Info */}
 <div className="flex-1 min-w-0 pt-0.5">
 <div className="flex items-center gap-2 mb-1">
 <span className="text-[16px]">{pkg.icon}</span>
 <p className="text-[13px] font-black leading-none" style={{ color:txt }}>{pkg.name}</p>
 </div>
 <p className="text-[10px] mb-1.5" style={{ color:txtSub }}>{pkg.sub}</p>
 <div className="flex items-center gap-2 flex-wrap">
 <span className="text-[8px] font-black px-2 py-0.5 rounded-full"
 style={{ background:`${accentColor}18`, color:accentColor, border:`1px solid ${accentColor}30` }}>
 {pkg.badge}
 </span>
 {pkg.savings && (
 <span className="text-[8px] font-bold px-2 py-0.5 rounded-full"
 style={{ background:'rgba(52,199,89,0.12)', color:'#34C759', border:'1px solid rgba(52,199,89,0.22)' }}>
 {pkg.savings}
 </span>
 )}
 </div>
 </div>

 {/* Price */}
 <div className="shrink-0 text-left">
 <p className="text-[18px] font-black leading-none" style={{ color:accentColor }}>
 {pkg.price.toLocaleString('ar-SA')}
 </p>
 <p className="text-[8px]" style={{ color:txtSub }}>ر.س/{pkg.unit}</p>
 </div>
 </div>

 {/* Progress bar */}
 <div className="mb-3">
 <div className="flex items-center justify-between mb-1">
 <span className="text-[9px]" style={{ color:txtSub }}>التقدم — {pct}٪</span>
 <span className="text-[9px] font-bold" style={{ color:accentColor }}>{remaining} جلسة متبقية</span>
 </div>
 <div className="h-1.5 rounded-full overflow-hidden" style={{ background:`${accentColor}18` }}>
 <motion.div className="h-full rounded-full"
 style={{ background:`linear-gradient(90deg, ${accentColor}, ${accentColor}99)` }}
 initial={{ width:'0%' }}
 animate={{ width:`${pct}%` }}
 transition={{ duration:1, ease:[0.4,0,0.2,1], delay:0.15+i*0.06 }}/>
 </div>
 </div>

 {/* Features */}
 <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3.5"
 style={{ borderTop:`1px solid ${divider}`, paddingTop:12 }}>
 {pkg.features.map((f, fi) => (
 <div key={fi} className="flex items-center gap-1.5">
 <CheckCircle size={10} style={{ color:accentColor, flexShrink:0 }}/>
 <span className="text-[9px] leading-snug" style={{ color:dark ? 'rgba(255,255,255,0.55)' : '#6B8FAB' }}>{f}</span>
 </div>
 ))}
 </div>

 {/* CTA */}
 <motion.button whileTap={{ scale:0.96 }} onClick={() => setBooking(pkg)}
 className="w-full flex items-center justify-center gap-2 py-3 rounded-[14px] font-bold text-[12px] text-white"
 style={{ background:`linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`, boxShadow:`0 6px 20px ${accentColor}35` }}>
 <Zap size={13}/> احجز جلستك القادمة
 </motion.button>
 </div>
 </motion.div>
 );
 })}
 </motion.div>
 </AnimatePresence>

 {/* Add package CTA */}
 <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
 className="rounded-[20px] p-4 flex items-center gap-3"
 style={{ background:dark?'rgba(255,255,255,0.03)':'rgba(11,74,111,0.04)', border:`1px dashed ${dark?'rgba(255,255,255,0.1)':'rgba(11,74,111,0.15)'}` }}>
 <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-[20px] shrink-0"
 style={{ background:dark?'rgba(255,255,255,0.05)':'rgba(11,74,111,0.07)' }}></div>
 <div className="flex-1 min-w-0">
 <p className="text-[12px] font-bold" style={{ color:txt }}>أضف باقة جديدة</p>
 <p className="text-[10px]" style={{ color:txtSub }}>اكتشف باقاتنا وادخر أكثر</p>
 </div>
 <div className="text-[10px] font-bold px-3 py-1.5 rounded-full"
 style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', color:'#fff' }}>استعرض</div>
 </motion.div>

 <div style={{ height:72 }}/>
 </div>

 <AnimatePresence>
 {booking && <BookSheet pkg={booking} onClose={() => setBooking(null)} dark={dark}/>}
 </AnimatePresence>
 </div>
 );
}
