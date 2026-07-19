import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ═══ TOKENS ═════════════════════════════════════════════════ */
const BG   = '#050D1A';
const GLASS = 'rgba(255,255,255,0.055)';
const GLASSBORDER = 'rgba(255,255,255,0.10)';
const BLUE  = '#0EA5E9';
const BLUEDIM = 'rgba(14,165,233,0.18)';
const TEXT  = '#fff';
const MUTED = 'rgba(255,255,255,0.45)';
const DIM   = 'rgba(255,255,255,0.18)';

/* ═══ HELPERS ════════════════════════════════════════════════ */
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
        ...style,
      }}>
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
          <div><p className="text-[10px] opacity-50 mb-0.5">مرحباً 👋</p><p className="text-[15px] font-black">خالد العمري</p></div>
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
          {[['📅','حجز'],['💊','أدوية'],['🧪','نتائج']].map(([ic,lb]) => (
            <div key={lb} className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <div className="text-[16px] mb-1">{ic}</div>
              <p className="text-[8px] opacity-80 font-semibold">{lb}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3 border border-white/10">
          <span className="text-[18px]">💊</span>
          <div className="flex-1 min-w-0"><p className="text-[9px] font-bold truncate">ميتفورمين ٥٠٠ملغ</p><p className="text-[8px] opacity-50">مع الإفطار يومياً</p></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
        </div>
      </div>
    ),
  },
  {
    gradient: 'linear-gradient(150deg,rgba(124,58,237,0.9) 0%,rgba(91,33,182,0.95) 100%)',
    content: (
      <div className="h-full flex flex-col p-5 pt-8 text-white">
        <p className="text-[15px] font-black mb-1">السجل الطبي</p>
        <p className="text-[9px] opacity-50 mb-4">٤ وثائق مشفرة</p>
        {[['🩸','تحليل الدم','أمس','مشفّر'],['📋','وصفة طبية','٣ أيام','PDF'],['📊','تقرير السكر','أسبوع','مشاركة'],['🫀','تخطيط القلب','شهر','مشفّر']].map(([ic,tt,dt,tag]) => (
          <div key={tt} className="flex items-center gap-3 bg-white/10 rounded-xl p-3 mb-2 border border-white/10">
            <span className="text-[18px]">{ic}</span>
            <div className="flex-1 min-w-0"><p className="text-[10px] font-bold">{tt}</p><p className="text-[8px] opacity-50">{dt}</p></div>
            <span className="text-[7px] bg-white/20 px-2 py-0.5 rounded-full shrink-0">{tag}</span>
          </div>
        ))}
        <div className="mt-auto bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-3 text-center">
          <p className="text-[9px] text-emerald-300 font-bold">🔒 بياناتك مشفرة بـ AES-256</p>
        </div>
      </div>
    ),
  },
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
    ),
  },
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
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg" style={{ background:BLUEDIM }}>📅</div>
        <div><p className="text-[11px] font-black text-white">حجز جديد</p><p className="text-[9px]" style={{ color:MUTED }}>قبل ثانيتين</p></div>
      </motion.div>
      <motion.div animate={{ y:[0,8,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut', delay:1.5 }}
        className="absolute -left-12 bottom-28 z-20 rounded-2xl px-4 py-3"
        style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(16,185,129,0.3)', backdropFilter:'blur(20px)', boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
        <p className="text-[10px] font-black text-emerald-400 flex items-center gap-1.5"><span>🔒</span> HIPAA</p>
        <p className="text-[9px]" style={{ color:MUTED }}>تشفير ١٠٠٪</p>
      </motion.div>
    </div>
  );
}

/* ═══ TICKER ═════════════════════════════════════════════════ */
const TICKS = ['تطبيق iOS','تطبيق Android','موقع احترافي','نظام إدارة','HIPAA','Apple Health','Apple Wallet','Google Wallet','سجل طبي','واتساب آلي','AES-256','ISO 27001','HL7 FHIR','Apple Watch','NDMO','SOC 2','PDPL'];
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
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  return (
    <motion.nav initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4 flex items-center justify-between transition-all duration-500"
      style={{ background: scrolled ? 'rgba(5,13,26,0.85)' : 'rgba(5,13,26,0.5)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)', borderBottom:`1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'transparent'}` }}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-[16px]" style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 4px 16px ${BLUE}40` }}>🏥</div>
        <div>
          <p className="text-[16px] font-black leading-tight text-white">تلقا<span style={{ color:BLUE }}> للعيادات</span></p>
          <p className="text-[9px] font-medium leading-none" style={{ color:DIM }}>متخصصون في القطاع الطبي</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-8">
        {[['المنظومة','#المنظومة'],['كيف نعمل','#process'],['الأمان','#الأمان'],['الأسعار','#الأسعار']].map(([l,h]) => (
          <a key={l} href={h} className="text-[13px] font-semibold transition-colors" style={{ color:MUTED }}
            onMouseEnter={e => (e.currentTarget.style.color=TEXT)} onMouseLeave={e => (e.currentTarget.style.color=MUTED)}>{l}</a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all"
          style={{ background:BLUEDIM, border:`1px solid rgba(14,165,233,0.3)`, color:BLUE }}>
          <span>📱</span> شاهد الديمو
        </a>
        <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
          className="text-[13px] font-black px-5 py-2.5 rounded-xl text-white transition-all"
          style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 4px 16px ${BLUE}40` }}>
          تواصل
        </a>
      </div>
    </motion.nav>
  );
}

/* ═══ APP ════════════════════════════════════════════════════ */
export default function App() {
  const [faqOpen, setFaqOpen] = useState<number|null>(null);
  useEffect(() => {
    document.documentElement.dir = 'rtl'; document.documentElement.lang = 'ar';
    document.body.style.background = BG; document.body.style.fontFamily = "'Tajawal',sans-serif"; document.body.style.margin = '0'; document.body.style.overflowX = 'hidden';
  }, []);

  return (
    <div dir="rtl" style={{ background:BG, fontFamily:"'Tajawal',sans-serif", overflowX:'hidden', color:TEXT, position:'relative' }}>
      <Background />
      <div style={{ position:'relative', zIndex:1 }}>
        <Nav />

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
                className="font-black leading-[1.03] mb-6" style={{ fontSize:'clamp(44px,6.5vw,84px)', letterSpacing:'-0.02em', color:TEXT }}>
                عيادتك تستحق<br />
                <span style={{ background:`linear-gradient(135deg,${BLUE} 0%,#38BDF8 50%,#7DD3FC 100%)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  أفضل تجربة<br />رقمية.
                </span>
              </motion.h1>

              <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.32 }}
                className="text-[18px] font-light leading-relaxed mb-10 max-w-md" style={{ color:MUTED }}>
                تطبيق بهويتك + موقع يفوز على جوجل + نظام إدارة + أمان HIPAA — في{' '}
                <span className="font-black" style={{ color:TEXT }}>٦٠ يوم.</span>
              </motion.p>

              <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.42 }}
                className="flex flex-wrap gap-3 mb-12">
                <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                  className="font-black text-[15px] px-8 py-4 rounded-2xl text-white transition-all active:scale-95"
                  style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 8px 32px ${BLUE}40` }}>
                  ابدأ مشروع عيادتك
                </a>
                <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                  className="font-bold text-[15px] px-8 py-4 rounded-2xl flex items-center gap-2 transition-all"
                  style={{ background:BLUEDIM, border:`2px solid rgba(14,165,233,0.3)`, color:BLUE, backdropFilter:'blur(10px)' }}>
                  <span className="text-[18px]">📱</span> شاهد الديمو الحي
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
                    <p className="text-[13px] font-black" style={{ color:TEXT }}>+٥٠ عيادة عميلة</p>
                    <div className="flex items-center gap-1">
                      {'★★★★★'.split('').map((s,i) => <span key={i} className="text-amber-400 text-[11px]">{s}</span>)}
                      <span className="text-[10px] mr-1" style={{ color:MUTED }}>تثق بتلقا</span>
                    </div>
                  </div>
                </div>
                <div className="h-8 w-px hidden sm:block" style={{ background:GLASSBORDER }} />
                <div className="flex gap-4 flex-wrap">
                  {['✓ HIPAA','✓ ISO 27001','✓ PDPL'].map(b => <span key={b} className="text-[11px] font-bold" style={{ color:DIM }}>{b}</span>)}
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

        {/* ════ DEMO BANNER ════════════════════════════════ */}
        <section className="px-6 lg:px-12 py-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-5"
                style={{ background:`linear-gradient(135deg,${BLUE}CC,#0284C7CC)`, backdropFilter:'blur(20px)', border:`1px solid ${BLUE}50`, boxShadow:`0 16px 60px ${BLUE}30` }}>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border" style={{ background:'rgba(255,255,255,0.15)', borderColor:'rgba(255,255,255,0.2)' }}>📱</div>
                  <div>
                    <p className="text-[18px] font-black">جرّب الديمو الحي — الآن</p>
                    <p className="text-[13px] opacity-70">تطبيق المريض الكامل + داشبورد المالك · بدون تسجيل</p>
                  </div>
                </div>
                <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                  className="shrink-0 font-black text-[15px] px-8 py-4 rounded-2xl transition-all active:scale-95"
                  style={{ background:TEXT, color:BLUE, boxShadow:'0 4px 20px rgba(0,0,0,0.2)' }}>
                  افتح الديمو ←
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════ PROBLEMS ═══════════════════════════════════ */}
        <section className="py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-16">
              <p className="text-[11px] font-black tracking-[0.3em] uppercase mb-5" style={{ color:BLUE }}>لماذا تحتاجنا؟</p>
              <h2 className="font-black leading-tight" style={{ fontSize:'clamp(32px,5.5vw,64px)', letterSpacing:'-0.02em', color:TEXT }}>
                مشاكل حقيقية.<br /><span style={{ color:DIM }}>حلول تقنية.</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { icon:'📞', n:'01', problem:'المرضى يتصلون للحجز — وأحياناً لا يجدون أحداً', fix:'تطبيق حجز ذكي ٢٤/٧ بدون أي مكالمات', accent:BLUE },
                { icon:'💬', n:'02', problem:'نتائج التحاليل ترسل على واتساب بدون سرية', fix:'بوابة نتائج مشفرة مباشرة في تطبيقك', accent:'#8B5CF6' },
                { icon:'📋', n:'03', problem:'لا يوجد سجل طبي موحد للمريض عبر الزيارات', fix:'سجل رقمي كامل مرتبط بكل مريض تلقائياً', accent:'#10B981' },
                { icon:'🔍', n:'04', problem:'المنافسون يظهرون في جوجل وأنت غائب تماماً', fix:'موقع محسّن SEO يجذب مرضى جدد يومياً', accent:'#F59E0B' },
              ].map((item,i) => (
                <Reveal key={i} delay={i*0.07}>
                  <Glass accent={item.accent} className="h-full">
                    <div className="p-1.5">
                      <div className="rounded-2xl p-5 mb-1.5" style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.15)' }}>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background:GLASS, border:`1px solid ${GLASSBORDER}` }}>{item.icon}</div>
                          <div className="flex-1">
                            <p className="text-[10px] font-black mb-1 flex items-center gap-1.5" style={{ color:'#F87171' }}>✕ المشكلة</p>
                            <p className="text-[14px] leading-snug" style={{ color:'rgba(252,165,165,0.9)' }}>{item.problem}</p>
                          </div>
                          <span className="text-[10px] font-black" style={{ color:DIM }}>{item.n}</span>
                        </div>
                      </div>
                      <div className="rounded-2xl p-5" style={{ background:`${item.accent}12`, border:`1px solid ${item.accent}25` }}>
                        <p className="text-[10px] font-black mb-1 flex items-center gap-1.5" style={{ color:item.accent }}>✓ الحل</p>
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
              <p className="text-[11px] font-black tracking-[0.3em] uppercase mb-5" style={{ color:BLUE }}>المنظومة</p>
              <h2 className="font-black leading-tight" style={{ fontSize:'clamp(30px,5vw,60px)', letterSpacing:'-0.02em', color:TEXT }}>
                ثلاثة منتجات.<br /><span style={{ color:DIM }}>منظومة واحدة.</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* App */}
              <Reveal delay={0} className="lg:col-span-1">
                <Glass accent={BLUE} className="h-full">
                  <div className="p-7 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 8px 24px ${BLUE}40` }}>📱</div>
                      <div><p className="text-[9px] font-black tracking-widest" style={{ color:BLUE }}>01</p><p className="text-[20px] font-black" style={{ color:TEXT }}>تطبيق المريض</p></div>
                    </div>
                    <div className="inline-flex px-3 py-1.5 rounded-full text-[10px] font-black mb-6 w-fit" style={{ background:`${BLUE}20`, color:BLUE, border:`1px solid ${BLUE}30` }}>iOS + Android بهوية عيادتك</div>
                    <div className="space-y-3 flex-1">
                      {[['🪪','بطاقة مريض QR'],['📅','حجز مواعيد ٢٤/٧'],['🧪','نتائج مشفرة'],['💊','تذكيرات أدوية'],['❤️','Apple Health'],['⌚','Apple Watch'],['🎫','Apple & Google Wallet'],['👨‍👩‍👧','إدارة التابعين']].map(([ic,f]) => (
                        <div key={f} className="flex items-center gap-3">
                          <span className="text-[14px]">{ic}</span>
                          <p className="text-[13px]" style={{ color:MUTED }}>{f}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-5" style={{ borderTop:`1px solid ${GLASSBORDER}` }}>
                      <span className="text-[12px] font-black" style={{ color:BLUE }}>مشمول في الباقة ✓</span>
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
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background:'linear-gradient(135deg,#8B5CF6,#7C3AED)', boxShadow:'0 8px 24px rgba(139,92,246,0.4)' }}>🌐</div>
                        <div><p className="text-[9px] font-black tracking-widest" style={{ color:'#A78BFA' }}>02</p><p className="text-[20px] font-black" style={{ color:TEXT }}>الموقع الإلكتروني</p></div>
                        <div className="mr-auto px-3 py-1.5 rounded-full text-[10px] font-black" style={{ background:'rgba(139,92,246,0.15)', color:'#A78BFA', border:'1px solid rgba(139,92,246,0.25)' }}>SEO متخصص طبي</div>
                      </div>
                      {/* mini browser */}
                      <div className="rounded-2xl overflow-hidden mb-5" style={{ border:`1px solid ${GLASSBORDER}`, background:'rgba(255,255,255,0.03)' }}>
                        <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom:`1px solid ${GLASSBORDER}` }}>
                          <div className="flex gap-1.5">{['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background:c }} />)}</div>
                          <div className="flex-1 rounded-lg px-3 py-1 text-[10px] mx-2" style={{ background:'rgba(255,255,255,0.05)', color:MUTED, border:`1px solid ${GLASSBORDER}` }}>🔒 clinic.sa/dr-khalid</div>
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
                          <div className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl" style={{ background:'rgba(139,92,246,0.15)' }}>👨‍⚕️</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[['🔍','SEO طبي'],['👨‍⚕️','صفحة طبيب'],['📆','حجز أونلاين'],['⭐','تقييمات'],['📰','مدونة طبية'],['💬','واتساب'],['📍','الموقع'],['📊','تحليلات']].map(([ic,f]) => (
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
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background:'linear-gradient(135deg,#10B981,#059669)', boxShadow:'0 8px 24px rgba(16,185,129,0.4)' }}>📊</div>
                        <div><p className="text-[9px] font-black tracking-widest text-emerald-400">03</p><p className="text-[20px] font-black" style={{ color:TEXT }}>لوحة الإدارة</p></div>
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
                        {[['💰','إيرادات'],['👥','طابور'],['🗓️','جداول'],['📈','تقارير'],['👔','فريق'],['🏦','تأمين'],['🔔','إشعارات'],['🔒','أمان']].map(([ic,f]) => (
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
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background:`${BLUE}20`, border:`1px solid ${BLUE}30` }}>🎬</div>
                    <div>
                      <p className="font-black text-[20px] mb-1" style={{ color:TEXT }}>شاهد المنظومة تعمل فعلاً</p>
                      <p className="text-[14px]" style={{ color:MUTED }}>ديمو تفاعلي حي — تطبيق المريض + داشبورد المالك</p>
                    </div>
                  </div>
                  <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                    className="shrink-0 font-black text-[15px] px-10 py-4 rounded-2xl text-white transition-all active:scale-95"
                    style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 8px 28px ${BLUE}40` }}>
                    افتح الديمو ←
                  </a>
                </div>
              </Glass>
            </Reveal>
          </div>
        </section>

        {/* ════ STATS ══════════════════════════════════════ */}
        <section className="py-20 px-6" style={{ borderTop:`1px solid ${GLASSBORDER}`, borderBottom:`1px solid ${GLASSBORDER}` }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            <Stat target={50}  suffix="+"    label="عيادة عميلة" />
            <Stat target={60}  suffix=" يوم" label="متوسط التسليم" />
            <Stat target={100} suffix="٪"    label="تشفير البيانات" />
            <Stat target={0}   suffix=""     label="اختراق مسجّل" prefix="٠" />
          </div>
        </section>

        {/* ════ HOW WE WORK ════════════════════════════════ */}
        <section id="process" className="py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-16">
              <p className="text-[11px] font-black tracking-[0.3em] uppercase mb-5" style={{ color:BLUE }}>كيف نعمل</p>
              <h2 className="font-black leading-tight" style={{ fontSize:'clamp(30px,5vw,60px)', letterSpacing:'-0.02em', color:TEXT }}>
                من الفكرة للإطلاق<br /><span style={{ color:DIM }}>في ٦٠ يوم مضمونة.</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { num:'١', icon:'💬', label:'الاستشارة', days:'يوم ١–٣', desc:'نفهم عيادتك وأهدافك ونضع خطة تفصيلية مخصصة.', accent:BLUE },
                { num:'٢', icon:'🎨', label:'التصميم', days:'يوم ٤–١٤', desc:'نصمم الهوية والشاشات وتوافق قبل البرمجة.', accent:'#8B5CF6' },
                { num:'٣', icon:'⚡', label:'البرمجة', days:'يوم ١٥–٥٠', desc:'نبني التطبيق والموقع والنظام بأعلى معايير.', accent:'#F59E0B' },
                { num:'٤', icon:'🚀', label:'الإطلاق', days:'يوم ٥١–٦٠', desc:'نشر في المتجرين + تدريب الفريق + دعم كامل.', accent:'#10B981' },
              ].map((s,i) => (
                <Reveal key={i} delay={i*0.09}>
                  <Glass accent={s.accent} className="h-full">
                    <div className="p-7 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[26px]" style={{ background:`${s.accent}18`, border:`1.5px solid ${s.accent}35` }}>{s.icon}</div>
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
              <p className="text-[11px] font-black tracking-[0.3em] uppercase mb-5" style={{ color:BLUE }}>المميزات</p>
              <h2 className="font-black leading-tight" style={{ fontSize:'clamp(28px,5vw,58px)', letterSpacing:'-0.02em', color:TEXT }}>
                ١٥+ ميزة.<br /><span style={{ color:DIM }}>من اليوم الأول.</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                ['🪪','بطاقة رقمية','QR فوري',BLUE],
                ['📅','حجز مواعيد','٢٤/٧',BLUE],
                ['🧪','نتائج','للهاتف مباشرة','#8B5CF6'],
                ['💊','تذكير أدوية','إشعارات','#8B5CF6'],
                ['❤️','Apple Health','مزامنة','#EF4444'],
                ['⌚','Apple Watch','مؤشرات','#374151'],
                ['👨‍👩‍👧','التابعون','العائلة','#F59E0B'],
                ['🎫','Wallet','رقمية','#10B981'],
                ['📋','السجل الطبي','موحد',BLUE],
                ['🩺','أمراض مزمنة','سكر · ضغط','#EF4444'],
                ['📊','لوحة المالك','تقارير','#10B981'],
                ['🌐','موقع طبي','SEO','#8B5CF6'],
                ['💬','واتساب آلي','تذكير','#10B981'],
                ['🔒','أمان HIPAA','عسكري','#F59E0B'],
                ['🔗','تكامل HIS','أنظمة','#374151'],
              ].map(([icon,title,sub,accent],i) => (
                <Reveal key={i} delay={i*0.02}>
                  <Glass accent={accent} className="cursor-default">
                    <div className="p-5 text-center">
                      <span className="text-[26px] mb-3 block">{icon}</span>
                      <p className="text-[12px] font-black mb-0.5" style={{ color:TEXT }}>{title}</p>
                      <p className="text-[10px]" style={{ color:MUTED }}>{sub}</p>
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
                <p className="text-[11px] font-black tracking-[0.3em] uppercase mb-5" style={{ color:BLUE }}>الأمان</p>
                <h2 className="font-black leading-tight mb-5" style={{ fontSize:'clamp(30px,5vw,60px)', letterSpacing:'-0.02em', color:TEXT }}>
                  بيانات مرضاك<br />محمية بالكامل.
                </h2>
                <p className="text-[16px] leading-relaxed mb-8" style={{ color:MUTED }}>أمان عسكري المستوى مصمّم للقطاع الصحي. بنية تقنية — ليست وعوداً.</p>
                <div className="flex flex-wrap gap-3">
                  {['HIPAA','ISO 27001','AES-256','NDMO','SOC 2','PDPL'].map(b => (
                    <div key={b} className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold cursor-default"
                      style={{ background:GLASS, border:`1px solid ${GLASSBORDER}`, color:MUTED, backdropFilter:'blur(10px)' }}>
                      <span style={{ color:BLUE }}>✓</span> {b}
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
                      ['[ALERT]','#FBBF24','Zero breaches recorded: ✓'],
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
                { icon:'🔐', title:'تشفير AES-256 كامل', desc:'نفس معيار وزارات الدفاع. لا أحد يقرأ بيانات مرضاك إلا المخوّلون.', accent:BLUE },
                { icon:'🧠', title:'Zero-Knowledge', desc:'مفتاح التشفير ملكك — حتى فريق تلقا لا يستطيع رؤية بياناتك.', accent:'#8B5CF6' },
                { icon:'🛡️', title:'مصادقة ثلاثية', desc:'Face ID + بصمة + رمز تحقق. لا وصول بدون إذنك.', accent:'#10B981' },
                { icon:'💾', title:'نسخ كل ٦ ساعات', desc:'مراكز بيانات موزعة مشفرة محمية من الكوارث.', accent:'#F59E0B' },
                { icon:'👁️', title:'مراقبة بالذكاء الاصطناعي', desc:'يرصد أي نشاط غريب ويوقفه فوراً.', accent:'#EF4444' },
                { icon:'📜', title:'PDPL سعودي', desc:'مطابق لنظام حماية البيانات ولوائح الحكومة الرقمية.', accent:BLUE },
              ].map((s,i) => (
                <Reveal key={i} delay={i*0.05}>
                  <Glass accent={s.accent} className="h-full cursor-default">
                    <div className="p-6">
                      <span className="text-[28px] mb-4 block">{s.icon}</span>
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
                  <div className="text-5xl">🔒</div>
                  <div className="flex-1 text-center sm:text-right">
                    <p className="font-black text-[20px] mb-1" style={{ color:TEXT }}>بياناتك ملكك — نحن لا نراها.</p>
                    <p className="text-[14px]" style={{ color:MUTED }}>لم يُسجَّل أي اختراق منذ التأسيس. هندسة تقنية متكاملة.</p>
                  </div>
                  <div className="flex gap-8 shrink-0">
                    {[['٠','اختراقات'],['١٠٠٪','تشفير'],['٢٤/٧','مراقبة']].map(([v,l]) => (
                      <div key={l} className="text-center">
                        <p className="font-black leading-none" style={{ fontSize:'clamp(24px,3vw,36px)', color:BLUE }}>{v}</p>
                        <p className="text-[10px] mt-1" style={{ color:MUTED }}>{l}</p>
                      </div>
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
              <h2 className="font-black leading-tight" style={{ fontSize:'clamp(30px,5vw,60px)', letterSpacing:'-0.02em', color:TEXT }}>قالوا عنّا.</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name:'عيادة الشفاء', city:'الرياض', av:'ع', accent:BLUE, quote:'الحجوزات الإلكترونية قلّصت الانتظار ٦٠٪ في أول أسبوع. المرضى سعداء وفريقنا أكثر تنظيماً.' },
                { name:'مجمع النور الطبي', city:'جدة', av:'م', accent:'#8B5CF6', quote:'مرضاي يطلبون تطبيقنا قبل ما يسألون عن الأطباء. صرنا بمستوى المستشفيات الكبيرة.' },
                { name:'مستشفى الرعاية', city:'أبها', av:'ر', accent:'#10B981', quote:'الأمان كان أولويتنا. المواصفات التقنية فاقت توقعاتنا — لا أختار غير تلقا.' },
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

        {/* ════ PRICING ════════════════════════════════════ */}
        <section id="الأسعار" className="py-28 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="text-[11px] font-black tracking-[0.3em] uppercase mb-5" style={{ color:BLUE }}>السعر</p>
              <h2 className="font-black mb-14 leading-tight" style={{ fontSize:'clamp(28px,5vw,56px)', letterSpacing:'-0.02em', color:TEXT }}>
                سعر ثابت.<br /><span style={{ color:DIM }}>كل شيء مشمول.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Glass accent={BLUE} style={{ borderRadius:32 }}>
                <div className="p-10 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:`radial-gradient(circle,${BLUE}08 1px,transparent 1px)`, backgroundSize:'20px 20px' }} />
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background:`linear-gradient(90deg,${BLUE},#8B5CF6,${BLUE})` }} />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-black mb-6" style={{ background:BLUEDIM, border:`1px solid ${BLUE}30`, color:BLUE }}>🏷️ سعر الإطلاق — محدود</div>
                    <p className="font-black leading-none mb-2" style={{ fontSize:'clamp(60px,12vw,100px)', letterSpacing:'-0.03em', color:TEXT }}>25,000</p>
                    <p className="text-[18px] font-medium mb-1" style={{ color:MUTED }}>ريال سعودي</p>
                    <p className="text-[12px] mb-10" style={{ color:DIM }}>دفعة واحدة · لا رسوم شهرية خفية</p>
                    <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-10">
                      {[['📱','تطبيق iOS + Android'],['🌐','موقع احترافي'],['📊','نظام إدارة كامل'],['⏰','تسليم ٦٠ يوم'],['🏪','نشر في المتجرين'],['🛡️','سنة دعم مجاني'],['👩‍💻','تدريب الفريق'],['🎨','هوية عيادتك']].map(([ic,item]) => (
                        <div key={item} className="flex items-center gap-2 text-[13px] text-right" style={{ color:MUTED }}><span>{ic}</span>{item}</div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                        className="font-black text-[15px] px-10 py-4 rounded-2xl text-white transition-all active:scale-95"
                        style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 8px 28px ${BLUE}40` }}>
                        ابدأ مشروعك الآن
                      </a>
                      <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                        className="font-bold text-[15px] px-8 py-4 rounded-2xl flex items-center gap-2 transition-all"
                        style={{ background:BLUEDIM, border:`2px solid ${BLUE}35`, color:BLUE }}>
                        <span>📱</span> شاهد الديمو
                      </a>
                    </div>
                    <p className="text-[11px] mt-4" style={{ color:DIM }}>استشارة مجانية · لا يلزمك أي شيء</p>
                  </div>
                </div>
              </Glass>
            </Reveal>
          </div>
        </section>

        {/* ════ FAQ ════════════════════════════════════════ */}
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <Reveal className="mb-12">
              <h2 className="font-black leading-tight" style={{ fontSize:'clamp(26px,4vw,50px)', letterSpacing:'-0.02em', color:TEXT }}>أسئلة شائعة.</h2>
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
              <motion.div className="text-6xl mb-8 inline-block"
                animate={{ rotate:[0,-5,5,0] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}>🏥</motion.div>
              <h2 className="font-black mb-5 leading-tight" style={{ fontSize:'clamp(40px,8vw,90px)', letterSpacing:'-0.03em', color:TEXT }}>جاهز تبدأ؟</h2>
              <p className="text-[18px] mb-12" style={{ color:MUTED }}>استشارة مجانية · بدون التزام · رد خلال ٢٤ ساعة</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                  className="font-black text-[16px] px-14 py-5 rounded-2xl text-white transition-all active:scale-95"
                  style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 16px 48px ${BLUE}40` }}>
                  تواصل عبر واتساب
                </a>
                <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                  className="font-bold text-[15px] px-10 py-5 rounded-2xl flex items-center gap-2 transition-all"
                  style={{ background:GLASS, border:`2px solid ${BLUE}35`, color:BLUE, backdropFilter:'blur(20px)' }}>
                  <span>📱</span> شاهد الديمو
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
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-[18px]" style={{ background:`linear-gradient(135deg,${BLUE},#0284C7)`, boxShadow:`0 4px 16px ${BLUE}40` }}>🏥</div>
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
              <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                className="font-bold text-[13px] px-5 py-2.5 rounded-xl transition-all" style={{ background:BLUEDIM, border:`1.5px solid ${BLUE}30`, color:BLUE }}>
                واتساب ←
              </a>
            </div>
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop:`1px solid ${GLASSBORDER}` }}>
              <p className="text-[11px]" style={{ color:DIM }}>متخصصون في المنظومات الرقمية للقطاع الطبي · ٢٠٢٥</p>
              <div className="flex gap-4">
                {['✓ HIPAA','✓ ISO 27001','✓ PDPL'].map(b => <span key={b} className="text-[11px] font-bold" style={{ color:`${BLUE}80` }}>{b}</span>)}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
