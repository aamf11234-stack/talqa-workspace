import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/* ─── helpers ─────────────────────────────────────────────── */
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

function Reveal({ children, delay = 0, className = '', y = 28 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Phone screens ───────────────────────────────────────── */
const SCREENS = [
  {
    gradient: 'linear-gradient(150deg,#0EA5E9 0%,#0369A1 100%)',
    title: 'تطبيق المريض',
    content: (
      <div className="h-full flex flex-col p-5 pt-8 text-white">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] opacity-50 mb-0.5">مرحباً 👋</p>
            <p className="text-[15px] font-black">خالد العمري</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-black text-[13px]">خ</div>
        </div>
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-white/20">
          <p className="text-[9px] opacity-60 mb-1">موعدك القادم</p>
          <p className="text-[13px] font-black">د. سارة المطيري</p>
          <p className="text-[9px] opacity-60 mb-3">غداً · ١٠:٣٠ صباحاً</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-white rounded-lg py-2 text-center text-[9px] font-black text-sky-600">تأكيد</div>
            <div className="flex-1 bg-white/15 rounded-lg py-2 text-center text-[9px]">إعادة جدولة</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[['📅','حجز'],['💊','أدوية'],['🧪','نتائج']].map(([ic,lb])=>(
            <div key={lb} className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <div className="text-[16px] mb-1">{ic}</div>
              <p className="text-[8px] opacity-80 font-semibold">{lb}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3 border border-white/10">
          <span className="text-[18px]">💊</span>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-bold truncate">ميتفورمين ٥٠٠ملغ</p>
            <p className="text-[8px] opacity-50">مع الإفطار يومياً</p>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
        </div>
      </div>
    ),
  },
  {
    gradient: 'linear-gradient(150deg,#7C3AED 0%,#5B21B6 100%)',
    title: 'السجل الطبي',
    content: (
      <div className="h-full flex flex-col p-5 pt-8 text-white">
        <p className="text-[15px] font-black mb-1">السجل الطبي</p>
        <p className="text-[9px] opacity-50 mb-4">٤ وثائق مشفرة</p>
        {[['🩸','تحليل الدم','أمس','مشفّر'],['📋','وصفة طبية','٣ أيام','PDF'],['📊','تقرير السكر','أسبوع','مشاركة'],['🫀','تخطيط القلب','شهر','مشفّر']].map(([ic,tt,dt,tag])=>(
          <div key={tt} className="flex items-center gap-3 bg-white/10 rounded-xl p-3 mb-2 border border-white/10">
            <span className="text-[18px]">{ic}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold">{tt}</p>
              <p className="text-[8px] opacity-50">{dt}</p>
            </div>
            <span className="text-[7px] bg-white/20 px-2 py-0.5 rounded-full shrink-0">{tag}</span>
          </div>
        ))}
        <div className="mt-auto bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-3 text-center">
          <p className="text-[9px] text-emerald-300 font-bold">🔒 جميع بياناتك مشفرة بـ AES-256</p>
        </div>
      </div>
    ),
  },
  {
    gradient: 'linear-gradient(150deg,#0F172A 0%,#1E293B 100%)',
    title: 'لوحة المالك',
    content: (
      <div className="h-full flex flex-col p-5 pt-8 text-white">
        <p className="text-[15px] font-black mb-0.5">لوحة الإدارة</p>
        <p className="text-[9px] opacity-40 mb-4">الأربعاء · ١٩ يوليو</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[['١٢','مريض اليوم','#38BDF8'],['٨٥٠٠','ريال اليوم','#34D399'],['٣','مواعيد','#FBBF24'],['٩٨٪','رضا','#A78BFA']].map(([v,l,c])=>(
            <div key={l} className="rounded-xl p-3 border border-white/10" style={{background:`${c}18`}}>
              <p className="text-[15px] font-black" style={{color:c}}>{v}</p>
              <p className="text-[8px] opacity-50">{l}</p>
            </div>
          ))}
        </div>
        <p className="text-[9px] opacity-40 mb-2">طابور الانتظار</p>
        {[['أحمد السالم','د. خالد','٩:٠٠'],['نورا العتيبي','د. سارة','٩:٣٠'],['محمد قحطان','د. خالد','١٠:٠٠']].map(([n,d,t])=>(
          <div key={n} className="flex items-center gap-2.5 bg-white/5 rounded-xl p-2.5 mb-1.5 border border-white/5">
            <div className="w-6 h-6 rounded-full bg-sky-500/40 flex items-center justify-center text-[8px] font-black shrink-0">{n[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold truncate">{n}</p>
              <p className="text-[8px] opacity-40">{d}</p>
            </div>
            <span className="text-[8px] opacity-40 shrink-0 font-mono">{t}</span>
          </div>
        ))}
      </div>
    ),
  },
];

function PhoneMockup({ className = '' }: { className?: string }) {
  const [screen, setScreen] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setScreen(s => (s + 1) % SCREENS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* ambient glow */}
      <motion.div className="absolute rounded-full blur-[80px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ width: 300, height: 300, background: SCREENS[screen].gradient }} />

      {/* phone */}
      <div className="relative z-10" style={{ filter: 'drop-shadow(0 40px 60px rgba(14,165,233,0.25))' }}>
        <div className="relative w-[230px] h-[460px] rounded-[44px] overflow-hidden"
          style={{ border: '10px solid #0A0F1C', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1), 0 0 0 1px #0A0F1C' }}>
          {/* dynamic island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
            <div className="w-3 h-3 rounded-full bg-neutral-800" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={screen} className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: SCREENS[screen].gradient, paddingTop: 34 }}>
              {SCREENS[screen].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* screen dots */}
      <div className="absolute -bottom-8 flex gap-2">
        {SCREENS.map((_, i) => (
          <button key={i} onClick={() => setScreen(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: i === screen ? 24 : 7, height: 7, background: i === screen ? '#0EA5E9' : '#CBD5E1' }} />
        ))}
      </div>

      {/* floating cards */}
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-10 top-12 bg-white rounded-2xl px-4 py-3 flex items-center gap-3 z-20"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}>
        <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-lg">📅</div>
        <div>
          <p className="text-[11px] font-black text-neutral-800">حجز جديد</p>
          <p className="text-[9px] text-neutral-400">قبل ثانيتين</p>
        </div>
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -left-12 bottom-28 bg-white rounded-2xl px-4 py-3 z-20"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}>
        <p className="text-[10px] font-black text-emerald-600 flex items-center gap-1.5"><span>🔒</span> HIPAA Compliant</p>
        <p className="text-[9px] text-neutral-400">تشفير ١٠٠٪</p>
      </motion.div>

      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute -left-8 top-1/3 bg-white rounded-xl px-3 py-2 z-20"
        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
        <p className="text-[9px] font-black text-neutral-700">+٥٠ عيادة ⭐</p>
      </motion.div>
    </div>
  );
}

/* ─── Ticker ──────────────────────────────────────────────── */
const TICKS = ['تطبيق iOS','تطبيق Android','موقع احترافي','نظام إدارة','HIPAA','Apple Health','Apple Wallet','Google Wallet','سجل طبي','واتساب آلي','AES-256','ISO 27001','HL7 FHIR','Apple Watch','NDMO','SOC 2','PDPL'];
function Ticker() {
  const all = [...TICKS, ...TICKS];
  return (
    <div className="overflow-hidden py-4" style={{ background: '#F8FBFF', borderTop: '1px solid #E0F2FE', borderBottom: '1px solid #E0F2FE' }}>
      <motion.div className="flex gap-10 w-max"
        animate={{ x: ['0%', '-50%'] }} transition={{ duration: 35, ease: 'linear', repeat: Infinity }}>
        {all.map((t, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="text-[12px] font-semibold whitespace-nowrap" style={{ color: '#94A3B8' }}>{t}</span>
            <span className="w-1 h-1 rounded-full shrink-0" style={{ background: '#BAE6FD' }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Stat ────────────────────────────────────────────────── */
function Stat({ target, suffix, label, prefix = '' }: { target: number; suffix: string; label: string; prefix?: string }) {
  const { v, ref } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <p className="font-black leading-none mb-2 text-sky-500" style={{ fontSize: 'clamp(42px,6vw,72px)' }}>
        {prefix}{v.toLocaleString('ar-SA')}{suffix}
      </p>
      <p className="text-[13px] text-neutral-400 font-medium">{label}</p>
    </div>
  );
}

/* ─── Nav ─────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4 flex items-center justify-between transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: `1px solid ${scrolled ? '#E0F2FE' : 'transparent'}`,
        boxShadow: scrolled ? '0 2px 24px rgba(14,165,233,0.08)' : 'none',
      }}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-[16px] shadow-sm"
          style={{ background: 'linear-gradient(135deg,#0EA5E9,#0284C7)' }}>🏥</div>
        <div>
          <p className="text-[16px] font-black leading-tight text-neutral-900">
            تلقا<span className="text-sky-500"> للعيادات</span>
          </p>
          <p className="text-[9px] text-neutral-400 font-medium leading-none">متخصصون في القطاع الطبي</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-8">
        {[['المنظومة','#المنظومة'],['كيف نعمل','#process'],['الأمان','#الأمان'],['الأسعار','#الأسعار']].map(([l,h]) => (
          <a key={l} href={h} className="text-[13px] font-semibold text-neutral-400 hover:text-sky-500 transition-colors">{l}</a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 text-[13px] font-bold px-5 py-2.5 rounded-xl text-sky-600 transition-all"
          style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#DBEAFE'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EFF6FF'; }}>
          <span>📱</span> شاهد الديمو
        </a>
        <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
          className="text-[13px] font-black px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg,#0EA5E9,#0284C7)', boxShadow: '0 4px 12px rgba(14,165,233,0.3)' }}>
          تواصل
        </a>
      </div>
    </motion.nav>
  );
}

/* ─── BENTO CARD ──────────────────────────────────────────── */
function BentoCard({ children, className = '', accent = '#0EA5E9', glow = false, style = {} }:
  { children: React.ReactNode; className?: string; accent?: string; glow?: boolean; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `1px solid ${hovered ? `${accent}40` : '#F1F5F9'}`,
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px ${accent}20, 0 4px 12px ${accent}15`
          : '0 2px 12px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        ...style,
      }}>
      {glow && (
        <div className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at 30% 30%, ${accent}20 0%, transparent 60%)`, opacity: hovered ? 0.5 : 0.15 }} />
      )}
      {children}
    </div>
  );
}

/* ─── App ─────────────────────────────────────────────────── */
export default function App() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.style.background = '#fff';
    document.body.style.fontFamily = "'Tajawal',sans-serif";
    document.body.style.margin = '0';
    document.body.style.overflowX = 'hidden';
  }, []);

  return (
    <div dir="rtl" style={{ background: '#fff', fontFamily: "'Tajawal',sans-serif", overflowX: 'hidden', color: '#111' }}>
      <Nav />

      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center px-6 lg:px-12 pt-20 pb-10 relative overflow-hidden">
        {/* bg grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle,#E0F2FE 1px,transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }} />
        {/* top right blob */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,#F0F9FF 0%,transparent 70%)', transform: 'translate(-30%,-30%)' }} />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 text-[12px] font-bold"
                style={{ background: '#F0F9FF', border: '1.5px solid #BAE6FD', color: '#0284C7' }}>
                <motion.span className="w-2 h-2 rounded-full bg-sky-500"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }} />
                متخصصون حصراً في العيادات والمراكز الطبية
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <h1 className="font-black leading-[1.02] text-neutral-900 mb-6"
                style={{ fontSize: 'clamp(44px,6.5vw,84px)', letterSpacing: '-0.02em' }}>
                عيادتك تستحق<br />
                <span style={{
                  background: 'linear-gradient(135deg,#0EA5E9 0%,#0284C7 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  أفضل تجربة<br />رقمية.
                </span>
              </h1>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="text-[18px] font-light leading-relaxed mb-10 max-w-md"
              style={{ color: '#64748B' }}>
              تطبيق بهويتك على iOS وAndroid + موقع يفوز على جوجل + نظام إدارة متكامل + أمان HIPAA — كل شيء في
              {' '}<span className="font-black text-neutral-900">٦٠ يوم.</span>
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="flex flex-wrap gap-3 mb-12">
              <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                className="font-black text-[15px] px-8 py-4 rounded-2xl text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg,#0EA5E9,#0284C7)', boxShadow: '0 8px 24px rgba(14,165,233,0.35)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(14,165,233,0.45)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(14,165,233,0.35)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                ابدأ مشروع عيادتك
              </a>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                className="font-bold text-[15px] px-8 py-4 rounded-2xl text-sky-600 transition-all active:scale-95 flex items-center gap-2"
                style={{ background: '#F0F9FF', border: '2px solid #BAE6FD' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#E0F2FE'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F0F9FF'; }}>
                <span className="text-[18px]">📱</span> شاهد الديمو الحي
              </a>
            </motion.div>

            {/* Social proof bar */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap items-center gap-6 p-5 rounded-2xl"
              style={{ background: '#FAFAFA', border: '1px solid #F1F5F9' }}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 space-x-reverse">
                  {['#0EA5E9','#8B5CF6','#10B981','#F59E0B','#EF4444'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white"
                      style={{ background: c }}>
                      {['ع','م','ن','خ','ر'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[13px] font-black text-neutral-800">+٥٠ عيادة عميلة</p>
                  <div className="flex items-center gap-1">
                    {'★★★★★'.split('').map((s,i) => <span key={i} className="text-amber-400 text-[11px]">{s}</span>)}
                    <span className="text-[10px] text-neutral-400 mr-1">تثق بتلقا</span>
                  </div>
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200 hidden sm:block" />
              <div className="flex gap-4 flex-wrap">
                {[['✓','HIPAA'],['✓','ISO 27001'],['✓','PDPL']].map(([ic,b]) => (
                  <span key={b} className="text-[11px] font-bold text-neutral-500">{ic} {b}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Phone */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 flex justify-center pb-12 lg:pb-0">
            <PhoneMockup />
          </motion.div>
        </div>
      </section>

      <Ticker />

      {/* ═══════════════════════════════════════════════════
          DEMO BANNER
      ═══════════════════════════════════════════════════ */}
      <section className="px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-5"
              style={{ background: 'linear-gradient(135deg,#0EA5E9 0%,#0284C7 100%)', boxShadow: '0 16px 48px rgba(14,165,233,0.3)' }}>
              <div className="flex items-center gap-4 text-white">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl border border-white/30">📱</div>
                <div>
                  <p className="text-[18px] font-black">جرّب الديمو الحي — الآن</p>
                  <p className="text-[13px] opacity-70">تطبيق المريض الكامل + داشبورد المالك · بدون تسجيل</p>
                </div>
              </div>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                className="shrink-0 font-black text-[15px] px-8 py-4 rounded-2xl transition-all active:scale-95"
                style={{ background: '#fff', color: '#0284C7', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                افتح الديمو ←
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PROBLEMS → SOLUTIONS
      ═══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-sky-500 mb-5">لماذا تحتاجنا؟</p>
            <h2 className="font-black text-neutral-900 leading-tight" style={{ fontSize: 'clamp(32px,5.5vw,64px)', letterSpacing: '-0.02em' }}>
              مشاكل حقيقية.<br /><span className="text-neutral-300">حلول تقنية.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon:'📞', n:'01', problem:'المرضى يتصلون للحجز — وأحياناً لا يجدون أحداً', fix:'تطبيق حجز ذكي ٢٤/٧ بدون أي مكالمات', accent:'#0EA5E9' },
              { icon:'💬', n:'02', problem:'نتائج التحاليل ترسل على واتساب بدون سرية', fix:'بوابة نتائج مشفرة مباشرة في تطبيقك', accent:'#8B5CF6' },
              { icon:'📋', n:'03', problem:'لا يوجد سجل طبي موحد للمريض عبر الزيارات', fix:'سجل رقمي كامل مرتبط بكل مريض تلقائياً', accent:'#10B981' },
              { icon:'🔍', n:'04', problem:'المنافسون يظهرون في جوجل وأنت غائب تماماً', fix:'موقع محسّن SEO يجذب مرضى جدد يومياً', accent:'#F59E0B' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <BentoCard accent={item.accent} glow>
                  <div className="p-1.5">
                    {/* problem */}
                    <div className="rounded-2xl p-5 mb-1.5" style={{ background: '#FEF2F2' }}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shrink-0 shadow-sm">{item.icon}</div>
                        <div className="flex-1">
                          <p className="text-[10px] font-black text-red-400 mb-1 flex items-center gap-1.5">
                            <span>✕</span> المشكلة
                          </p>
                          <p className="text-[14px] text-red-700 leading-snug">{item.problem}</p>
                        </div>
                        <span className="text-[10px] font-black text-neutral-200">{item.n}</span>
                      </div>
                    </div>
                    {/* solution */}
                    <div className="rounded-2xl p-5" style={{ background: `${item.accent}0D` }}>
                      <p className="text-[10px] font-black mb-1 flex items-center gap-1.5" style={{ color: item.accent }}>
                        <span>✓</span> الحل
                      </p>
                      <p className="text-[14px] font-bold" style={{ color: item.accent }}>{item.fix}</p>
                    </div>
                  </div>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRODUCTS — BENTO GRID
      ═══════════════════════════════════════════════════ */}
      <section id="المنظومة" className="py-24 px-6 lg:px-12" style={{ background: '#F8FBFF' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-14">
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-sky-500 mb-5">المنظومة</p>
            <h2 className="font-black text-neutral-900 leading-tight" style={{ fontSize: 'clamp(30px,5vw,60px)', letterSpacing: '-0.02em' }}>
              ثلاثة منتجات.<br /><span className="text-neutral-300">منظومة واحدة متكاملة.</span>
            </h2>
          </Reveal>

          {/* Bento grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Big card — App */}
            <Reveal delay={0} className="lg:col-span-1 lg:row-span-2">
              <BentoCard accent="#0EA5E9" glow className="h-full">
                <div className="p-7 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md"
                      style={{ background: 'linear-gradient(135deg,#0EA5E9,#0284C7)' }}>📱</div>
                    <div>
                      <p className="text-[9px] font-black text-sky-400 tracking-widest">01</p>
                      <p className="text-[20px] font-black text-neutral-900 leading-tight">تطبيق المريض</p>
                    </div>
                  </div>
                  <p className="text-[11px] font-black tracking-widest uppercase text-sky-500 mb-6">iOS + Android بهوية عيادتك</p>
                  
                  {/* mini phone preview */}
                  <div className="flex-1 flex items-center justify-center py-4">
                    <div className="w-[130px] h-[240px] rounded-[28px] overflow-hidden shadow-2xl"
                      style={{ border: '6px solid #0A0F1C', background: 'linear-gradient(150deg,#0EA5E9,#0284C7)' }}>
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-full z-10" />
                      <div className="p-3 pt-5 text-white text-[7px]">
                        <p className="font-black text-[9px] mb-2">خالد العمري</p>
                        <div className="bg-white/20 rounded-xl p-2 mb-2">
                          <p className="opacity-60 mb-0.5">الموعد القادم</p>
                          <p className="font-black">د. سارة · ١٠:٣٠</p>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          {['📅','💊','🧪'].map(ic => (
                            <div key={ic} className="bg-white/10 rounded-lg p-1.5 text-center text-[10px]">{ic}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 mt-4">
                    {[['🪪','بطاقة مريض QR'],['📅','حجز مواعيد ٢٤/٧'],['❤️','Apple Health'],['🎫','Apple & Google Wallet'],['👨‍👩‍👧','إدارة التابعين'],['⌚','Apple Watch']].map(([ic,f]) => (
                      <div key={f} className="flex items-center gap-3">
                        <span className="text-[14px]">{ic}</span>
                        <p className="text-[13px] text-neutral-600">{f}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-5 border-t border-neutral-100">
                    <span className="text-[12px] font-black text-sky-500">مشمول في الباقة ✓</span>
                  </div>
                </div>
              </BentoCard>
            </Reveal>

            {/* Website card */}
            <Reveal delay={0.08} className="lg:col-span-2">
              <BentoCard accent="#8B5CF6" glow>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md"
                      style={{ background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)' }}>🌐</div>
                    <div>
                      <p className="text-[9px] font-black tracking-widest" style={{ color: '#8B5CF6' }}>02</p>
                      <p className="text-[20px] font-black text-neutral-900 leading-tight">الموقع الإلكتروني</p>
                    </div>
                    <div className="mr-auto px-3 py-1.5 rounded-full text-[10px] font-black" style={{ background: '#F5F3FF', color: '#7C3AED' }}>SEO متخصص طبي</div>
                  </div>
                  
                  {/* fake browser mockup */}
                  <div className="rounded-2xl overflow-hidden mb-5 border border-neutral-100" style={{ background: '#FAFAFA' }}>
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-100">
                      <div className="flex gap-1.5">
                        {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
                      </div>
                      <div className="flex-1 bg-white rounded-lg px-3 py-1 text-[10px] text-neutral-400 border border-neutral-100 mx-2">
                        🔒 clinic.sa/dr-khalid
                      </div>
                    </div>
                    <div className="p-4 flex gap-3">
                      <div className="flex-1">
                        <div className="h-3 bg-violet-100 rounded mb-2 w-3/4" />
                        <div className="h-2 bg-neutral-100 rounded mb-1.5 w-full" />
                        <div className="h-2 bg-neutral-100 rounded mb-1.5 w-5/6" />
                        <div className="flex gap-2 mt-3">
                          <div className="h-7 bg-violet-500 rounded-lg flex-1" />
                          <div className="h-7 bg-violet-50 border border-violet-200 rounded-lg flex-1" />
                        </div>
                      </div>
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-violet-100 to-violet-50 flex items-center justify-center text-2xl">👨‍⚕️</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[['🔍','SEO طبي'],['👨‍⚕️','صفحة طبيب'],['📆','حجز أونلاين'],['⭐','تقييمات'],['📰','مدونة طبية'],['💬','واتساب'],['📍','الموقع'],['📊','تحليلات']].map(([ic,f]) => (
                      <div key={f} className="flex items-center gap-2 text-[12px] text-neutral-600 bg-neutral-50 rounded-xl px-3 py-2.5 border border-neutral-100">
                        <span>{ic}</span><span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </BentoCard>
            </Reveal>

            {/* Dashboard card */}
            <Reveal delay={0.14} className="lg:col-span-2">
              <BentoCard accent="#10B981" glow>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md"
                      style={{ background: 'linear-gradient(135deg,#10B981,#059669)' }}>📊</div>
                    <div>
                      <p className="text-[9px] font-black tracking-widest text-emerald-500">03</p>
                      <p className="text-[20px] font-black text-neutral-900 leading-tight">لوحة الإدارة</p>
                    </div>
                    <div className="mr-auto px-3 py-1.5 rounded-full text-[10px] font-black" style={{ background: '#ECFDF5', color: '#059669' }}>المالك · الفريق · التقارير</div>
                  </div>

                  {/* mini dashboard */}
                  <div className="rounded-2xl p-4 mb-5 border border-emerald-50" style={{ background: '#0F172A' }}>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[['١٢','مريض','#38BDF8'],['٨٥٠٠','ريال','#34D399'],['٩٨٪','رضا','#A78BFA'],['٣','تأخير','#FBBF24']].map(([v,l,c]) => (
                        <div key={l} className="rounded-xl p-2.5 text-center" style={{ background: `${c}15`, border: `1px solid ${c}20` }}>
                          <p className="text-[13px] font-black" style={{ color: c }}>{v}</p>
                          <p className="text-[8px] text-neutral-500">{l}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {[40,65,45,80,55,90,70].map((h,i) => (
                        <div key={i} className="flex-1 rounded-t-sm" style={{ height: h * 0.6, background: `rgba(16,185,129,${0.3 + h/200})` }} />
                      ))}
                    </div>
                    <p className="text-[8px] text-emerald-400 mt-2">↑ ١٢٪ من الأسبوع الماضي</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[['💰','إيرادات يومية'],['👥','طابور لحظي'],['🗓️','جداول أطباء'],['📈','تقارير'],['👔','إدارة الفريق'],['🏦','فواتير تأمين'],['🔔','إشعارات'],['🔒','مركز الأمان']].map(([ic,f]) => (
                      <div key={f} className="flex items-center gap-2 text-[12px] text-neutral-600 bg-neutral-50 rounded-xl px-3 py-2.5 border border-neutral-100">
                        <span>{ic}</span><span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </BentoCard>
            </Reveal>
          </div>

          {/* Demo CTA card */}
          <Reveal delay={0.2} className="mt-5">
            <div className="p-7 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-5"
              style={{ background: 'linear-gradient(135deg,#F0F9FF,#E0F2FE)', border: '2px solid #BAE6FD' }}>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: '#fff', boxShadow: '0 4px 16px rgba(14,165,233,0.15)' }}>🎬</div>
                <div>
                  <p className="font-black text-[20px] text-neutral-900 mb-1">شاهد المنظومة تعمل فعلاً</p>
                  <p className="text-[14px] text-neutral-400">ديمو تفاعلي حي — تطبيق المريض كاملاً + داشبورد المالك + ٥ شاشات</p>
                </div>
              </div>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                className="shrink-0 font-black text-[15px] px-10 py-4 rounded-2xl text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg,#0EA5E9,#0284C7)', boxShadow: '0 8px 24px rgba(14,165,233,0.3)' }}>
                افتح الديمو الآن ←
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <Stat target={50}  suffix="+"    label="عيادة عميلة" />
          <Stat target={60}  suffix=" يوم" label="متوسط التسليم" />
          <Stat target={100} suffix="٪"    label="تشفير البيانات" />
          <Stat target={0}   suffix=""     label="اختراق مسجّل" prefix="٠" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HOW WE WORK
      ═══════════════════════════════════════════════════ */}
      <section id="process" className="py-28 px-6 lg:px-12" style={{ background: '#F8FBFF' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-sky-500 mb-5">كيف نعمل</p>
            <h2 className="font-black text-neutral-900 leading-tight" style={{ fontSize: 'clamp(30px,5vw,60px)', letterSpacing: '-0.02em' }}>
              من الفكرة للإطلاق<br /><span className="text-neutral-300">في ٦٠ يوم مضمونة.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num:'١', icon:'💬', label:'الاستشارة', days:'يوم ١–٣', desc:'نفهم عيادتك وأهدافك ونضع خطة تفصيلية مخصصة لك.', accent:'#0EA5E9' },
              { num:'٢', icon:'🎨', label:'التصميم', days:'يوم ٤–١٤', desc:'نصمم الهوية والشاشات — تراها وتوافق عليها قبل البرمجة.', accent:'#8B5CF6' },
              { num:'٣', icon:'⚡', label:'البرمجة', days:'يوم ١٥–٥٠', desc:'نبني التطبيق والموقع والنظام بأعلى معايير الجودة.', accent:'#F59E0B' },
              { num:'٤', icon:'🚀', label:'الإطلاق', days:'يوم ٥١–٦٠', desc:'نشر في المتجرين + تدريب الفريق + دعم مستمر.', accent:'#10B981' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.09}>
                <BentoCard accent={s.accent} className="h-full">
                  <div className="p-7 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[26px] shadow-md"
                        style={{ background: `${s.accent}15`, border: `1.5px solid ${s.accent}30` }}>
                        {s.icon}
                      </div>
                      <span className="font-black text-[40px] leading-none" style={{ color: `${s.accent}20` }}>{s.num}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black mb-4"
                      style={{ background: `${s.accent}12`, color: s.accent }}>
                      {s.days}
                    </div>
                    <p className="text-[18px] font-black text-neutral-900 mb-3">{s.label}</p>
                    <p className="text-[13px] text-neutral-500 leading-relaxed flex-1">{s.desc}</p>
                  </div>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURES
      ═══════════════════════════════════════════════════ */}
      <section id="المميزات" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-14">
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-sky-500 mb-5">المميزات</p>
            <h2 className="font-black text-neutral-900 leading-tight" style={{ fontSize: 'clamp(28px,5vw,58px)', letterSpacing: '-0.02em' }}>
              ١٥+ ميزة.<br /><span className="text-neutral-300">من اليوم الأول.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              ['🪪','بطاقة رقمية','QR فوري','#0EA5E9'],
              ['📅','حجز مواعيد','٢٤/٧ بدون مكالمات','#0EA5E9'],
              ['🧪','نتائج التحاليل','للهاتف مباشرة','#8B5CF6'],
              ['💊','تذكير أدوية','إشعارات ذكية','#8B5CF6'],
              ['❤️','Apple Health','مزامنة تلقائية','#EF4444'],
              ['⌚','Apple Watch','مؤشرات حيوية','#374151'],
              ['👨‍👩‍👧','التابعون','صحة العائلة','#F59E0B'],
              ['🎫','Wallet','تذكرة رقمية','#10B981'],
              ['📋','السجل الطبي','تاريخ موحد','#0EA5E9'],
              ['🩺','أمراض مزمنة','سكر · ضغط · قلب','#EF4444'],
              ['📊','لوحة المالك','تقارير فورية','#10B981'],
              ['🌐','موقع طبي','SEO متخصص','#8B5CF6'],
              ['💬','واتساب آلي','تذكير وتأكيد','#10B981'],
              ['🔒','أمان HIPAA','تشفير عسكري','#F59E0B'],
              ['🔗','تكامل HIS','أنظمة موجودة','#374151'],
            ].map(([icon, title, sub, accent], i) => (
              <Reveal key={i} delay={i * 0.025}>
                <BentoCard accent={accent} className="h-full cursor-default">
                  <div className="p-5 text-center">
                    <span className="text-[28px] mb-3 block">{icon}</span>
                    <p className="text-[12px] font-black text-neutral-800 mb-1">{title}</p>
                    <p className="text-[10px] text-neutral-400">{sub}</p>
                  </div>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECURITY
      ═══════════════════════════════════════════════════ */}
      <section id="الأمان" className="py-28 px-6 lg:px-12" style={{ background: '#F8FBFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <Reveal>
              <p className="text-[11px] font-black tracking-[0.3em] uppercase text-sky-500 mb-5">الأمان</p>
              <h2 className="font-black text-neutral-900 leading-tight mb-5" style={{ fontSize: 'clamp(30px,5vw,60px)', letterSpacing: '-0.02em' }}>
                بيانات مرضاك<br />محمية بالكامل.
              </h2>
              <p className="text-[16px] text-neutral-500 leading-relaxed mb-8">
                أمان عسكري المستوى مصمّم خصيصاً للقطاع الصحي. بنية تقنية حقيقية — ليست وعوداً على ورق.
              </p>
              <div className="flex flex-wrap gap-3">
                {['HIPAA','ISO 27001','AES-256','NDMO','SOC 2','PDPL'].map(b => (
                  <div key={b} className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold bg-white border border-neutral-200 text-neutral-600 cursor-default"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <span className="text-sky-500">✓</span> {b}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="p-6 rounded-3xl"
                style={{ background: '#0F172A', boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 mr-auto">security-audit.log</span>
                </div>
                <div className="space-y-2 font-mono text-[11px]">
                  {[
                    ['[INFO]', '#38BDF8', 'AES-256 encryption: ACTIVE'],
                    ['[OK]', '#34D399', 'Zero-knowledge architecture: VERIFIED'],
                    ['[OK]', '#34D399', 'HIPAA compliance: PASSED'],
                    ['[OK]', '#34D399', 'ISO 27001 audit: PASSED'],
                    ['[OK]', '#34D399', 'PDPL compliance: VERIFIED'],
                    ['[SCAN]', '#A78BFA', 'Threat detection: RUNNING'],
                    ['[OK]', '#34D399', 'Last backup: 3h ago'],
                    ['[ALERT]', '#FBBF24', 'Zero breaches recorded: ✓'],
                  ].map(([tag, c, msg], i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.12 }}
                      className="flex items-center gap-3">
                      <span className="shrink-0 font-bold" style={{ color: c }}>{tag}</span>
                      <span className="text-neutral-400 text-[10px]" dir="ltr">{msg}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon:'🔐', title:'تشفير AES-256 كامل', desc:'نفس معيار وزارات الدفاع. لا أحد يقرأ بيانات مرضاك إلا المخوّلون.', accent:'#0EA5E9' },
              { icon:'🧠', title:'Zero-Knowledge', desc:'مفتاح التشفير ملكك — حتى فريق تلقا لا يستطيع تقنياً رؤية بياناتك.', accent:'#8B5CF6' },
              { icon:'🛡️', title:'مصادقة ثلاثية', desc:'Face ID + بصمة + رمز تحقق. لا وصول بدون إذنك المباشر.', accent:'#10B981' },
              { icon:'💾', title:'نسخ كل ٦ ساعات', desc:'مراكز بيانات موزعة جغرافياً، مشفرة كلها، محمية من الكوارث.', accent:'#F59E0B' },
              { icon:'👁️', title:'مراقبة بالذكاء الاصطناعي', desc:'يرصد أي نشاط غير اعتيادي ويوقفه فوراً قبل أن يصبح تهديداً.', accent:'#EF4444' },
              { icon:'📜', title:'PDPL سعودي', desc:'مطابق لنظام حماية البيانات الشخصية ولوائح الحكومة الرقمية.', accent:'#0EA5E9' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <BentoCard accent={s.accent} glow className="h-full cursor-default">
                  <div className="p-6">
                    <span className="text-[28px] mb-4 block">{s.icon}</span>
                    <p className="text-[15px] font-black text-neutral-800 mb-2">{s.title}</p>
                    <p className="text-[12px] text-neutral-500 leading-relaxed">{s.desc}</p>
                  </div>
                </BentoCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-5">
            <div className="p-7 rounded-3xl flex flex-col sm:flex-row items-center gap-6 bg-white border border-sky-100"
              style={{ boxShadow: '0 4px 24px rgba(14,165,233,0.08)' }}>
              <div className="text-5xl">🔒</div>
              <div className="flex-1 text-center sm:text-right">
                <p className="font-black text-neutral-900 text-[20px] mb-1">بياناتك ملكك — نحن لا نراها.</p>
                <p className="text-[14px] text-neutral-400">لم يُسجَّل أي اختراق منذ التأسيس. ليس حظاً — هندسة تقنية.</p>
              </div>
              <div className="flex gap-8 shrink-0">
                {[['٠','اختراقات'],['١٠٠٪','تشفير'],['٢٤/٧','مراقبة']].map(([v,l]) => (
                  <div key={l} className="text-center">
                    <p className="font-black text-sky-500 leading-none" style={{ fontSize: 'clamp(24px,3vw,36px)' }}>{v}</p>
                    <p className="text-[10px] text-neutral-400 mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="font-black text-neutral-900 leading-tight" style={{ fontSize: 'clamp(30px,5vw,60px)', letterSpacing: '-0.02em' }}>
              قالوا عنّا.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name:'عيادة الشفاء', city:'الرياض', av:'ع', accent:'#0EA5E9',
                quote:'الحجوزات الإلكترونية قلّصت الانتظار ٦٠٪ في أول أسبوع. المرضى سعداء وفريقنا أكثر تنظيماً.' },
              { name:'مجمع النور الطبي', city:'جدة', av:'م', accent:'#8B5CF6',
                quote:'مرضاي يطلبون تطبيقنا قبل ما يسألون عن الأطباء. صرنا بمستوى المستشفيات الكبيرة.' },
              { name:'مستشفى الرعاية', city:'أبها', av:'ر', accent:'#10B981',
                quote:'الأمان كان أولويتنا كمستشفى. المواصفات التقنية فاقت توقعاتنا — لا أختار غير تلقا.' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <BentoCard accent={t.accent} glow className="h-full">
                  <div className="p-7 h-full flex flex-col">
                    <div className="text-[40px] font-black leading-none mb-4 opacity-20" style={{ color: t.accent, fontFamily: 'serif' }}>"</div>
                    <div className="flex mb-4">
                      {[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-[15px]">★</span>)}
                    </div>
                    <p className="text-[16px] text-neutral-700 leading-relaxed flex-1 mb-6">{t.quote}</p>
                    <div className="flex items-center gap-3 pt-5 border-t border-neutral-100">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-black text-white shrink-0 shadow-md"
                        style={{ background: `linear-gradient(135deg,${t.accent},${t.accent}CC)` }}>{t.av}</div>
                      <div>
                        <p className="text-[14px] font-black text-neutral-800">{t.name}</p>
                        <p className="text-[12px] text-neutral-400">{t.city}</p>
                      </div>
                    </div>
                  </div>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRICING
      ═══════════════════════════════════════════════════ */}
      <section id="الأسعار" className="py-28 px-6 lg:px-12" style={{ background: '#F8FBFF' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-sky-500 mb-5">السعر</p>
            <h2 className="font-black text-neutral-900 mb-14 leading-tight" style={{ fontSize: 'clamp(28px,5vw,56px)', letterSpacing: '-0.02em' }}>
              سعر ثابت.<br /><span className="text-neutral-300">كل شيء مشمول.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative p-10 rounded-3xl bg-white text-center overflow-hidden"
              style={{ border: '2px solid #BAE6FD', boxShadow: '0 32px 80px rgba(14,165,233,0.12)' }}>
              {/* subtle dot pattern */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{ backgroundImage: 'radial-gradient(circle,#0EA5E9 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
              {/* top gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                style={{ background: 'linear-gradient(90deg,#0EA5E9,#8B5CF6,#0EA5E9)' }} />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-4 py-2 text-[12px] font-black text-sky-600 mb-6">
                  🏷️ سعر الإطلاق — محدود
                </div>
                <p className="font-black text-neutral-900 leading-none mb-2" style={{ fontSize: 'clamp(60px,12vw,100px)', letterSpacing: '-0.03em' }}>
                  25,000
                </p>
                <p className="text-[18px] text-neutral-400 font-medium mb-1">ريال سعودي</p>
                <p className="text-[12px] text-neutral-300 mb-10">دفعة واحدة · لا رسوم شهرية خفية</p>

                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-10">
                  {[['📱','تطبيق iOS + Android'],['🌐','موقع احترافي'],['📊','نظام إدارة كامل'],['⏰','تسليم ٦٠ يوم'],['🏪','نشر في المتجرين'],['🛡️','سنة دعم مجاني'],['👩‍💻','تدريب الفريق'],['🎨','هوية عيادتك']].map(([ic,item]) => (
                    <div key={item} className="flex items-center gap-2 text-[13px] text-neutral-600 text-right">
                      <span>{ic}</span> {item}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                    className="font-black text-[15px] px-10 py-4 rounded-2xl text-white transition-all active:scale-95"
                    style={{ background: 'linear-gradient(135deg,#0EA5E9,#0284C7)', boxShadow: '0 8px 24px rgba(14,165,233,0.35)' }}>
                    ابدأ مشروعك الآن
                  </a>
                  <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                    className="font-bold text-[15px] px-8 py-4 rounded-2xl text-sky-600 transition-all flex items-center gap-2"
                    style={{ background: '#F0F9FF', border: '2px solid #BAE6FD' }}>
                    <span>📱</span> شاهد الديمو أولاً
                  </a>
                </div>
                <p className="text-[11px] text-neutral-300 mt-4">استشارة مجانية عبر واتساب · لا يلزمك أي شيء</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="font-black text-neutral-900 leading-tight" style={{ fontSize: 'clamp(26px,4vw,50px)', letterSpacing: '-0.02em' }}>
              أسئلة شائعة.
            </h2>
          </Reveal>
          <div className="space-y-3">
            {[
              { q:'هل التطبيق يكون باسم عيادتي أو باسم تلقا؟', a:'التطبيق يُنشر باسم عيادتك وشعارك كاملاً على AppStore وGoogle Play. تلقا لا تظهر بأي شكل للمرضى.' },
              { q:'كيف تضمنون التسليم في ٦٠ يوم؟', a:'لدينا عملية مجربة مع +٥٠ عيادة. نبدأ بتصميم موافق عليه، ثم برمجة منظمة بمراحل واضحة.' },
              { q:'ماذا يحدث بعد السنة الأولى من الدعم؟', a:'بعد السنة الأولى المجانية، الدعم متاح بخطط شهرية مرنة. أو تعتمد على فريقك بعد التدريب.' },
              { q:'هل يتكامل مع نظام HIS الموجود؟', a:'نعم، نوفر API كاملة للتكامل مع أغلب أنظمة HIS الشائعة في السوق السعودي.' },
              { q:'هل يعمل التطبيق في حال ضعف الإنترنت؟', a:'نعم، التطبيق مصمم للعمل جزئياً أوف لاين مع مزامنة تلقائية عند عودة الاتصال.' },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="rounded-2xl border bg-white overflow-hidden transition-all duration-200"
                  style={{ borderColor: faqOpen === i ? '#BAE6FD' : '#F1F5F9', boxShadow: faqOpen === i ? '0 4px 20px rgba(14,165,233,0.08)' : 'none' }}>
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-right hover:bg-neutral-50 transition-colors">
                    <span className="text-[15px] font-black text-neutral-800">{faq.q}</span>
                    <motion.div animate={{ rotate: faqOpen === i ? 45 : 0 }} transition={{ duration: 0.25 }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-lg font-black shrink-0 mr-3 transition-colors"
                      style={{ background: faqOpen === i ? '#0EA5E9' : '#F1F5F9', color: faqOpen === i ? '#fff' : '#94A3B8' }}>
                      +
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="px-5 pb-5 text-[14px] text-neutral-500 leading-relaxed border-t border-sky-50 pt-4">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════ */}
      <section className="py-32 px-6 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#fff 0%,#F0F9FF 50%,#E0F2FE 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle,#BAE6FD 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <Reveal>
            <motion.div className="text-6xl mb-8 inline-block"
              animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              🏥
            </motion.div>
            <h2 className="font-black text-neutral-900 mb-5 leading-tight" style={{ fontSize: 'clamp(40px,8vw,90px)', letterSpacing: '-0.03em' }}>
              جاهز تبدأ؟
            </h2>
            <p className="text-[18px] text-neutral-500 mb-12 leading-relaxed">
              استشارة مجانية · بدون التزام · رد خلال ٢٤ ساعة
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                className="font-black text-[16px] px-14 py-5 rounded-2xl text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg,#0EA5E9,#0284C7)', boxShadow: '0 12px 40px rgba(14,165,233,0.35)' }}>
                تواصل عبر واتساب
              </a>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                className="font-bold text-[15px] px-10 py-5 rounded-2xl text-sky-600 transition-all flex items-center gap-2"
                style={{ background: '#fff', border: '2px solid #BAE6FD', boxShadow: '0 4px 16px rgba(14,165,233,0.1)' }}>
                <span>📱</span> شاهد الديمو
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════ */}
      <footer className="py-10 px-6 lg:px-12 border-t border-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-[18px] shadow-md"
                style={{ background: 'linear-gradient(135deg,#0EA5E9,#0284C7)' }}>🏥</div>
              <div>
                <p className="font-black text-[16px] text-neutral-900">تلقا<span className="text-sky-500"> للعيادات</span></p>
                <p className="text-[9px] text-neutral-400 font-medium">متخصصون في القطاع الطبي</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[['المنظومة','#المنظومة'],['كيف نعمل','#process'],['الأمان','#الأمان'],['الأسعار','#الأسعار'],['الديمو','/clinic-demo/']].map(([l,h]) => (
                <a key={l} href={h} target={h.startsWith('/') ? '_blank' : undefined}
                  className="text-[13px] text-neutral-400 hover:text-sky-500 transition-colors font-semibold">{l}</a>
              ))}
            </div>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              className="font-bold text-[13px] px-5 py-2.5 rounded-xl text-sky-600 transition-all"
              style={{ background: '#F0F9FF', border: '1.5px solid #BAE6FD' }}>
              واتساب ←
            </a>
          </div>
          <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-neutral-400">متخصصون في المنظومات الرقمية للقطاع الطبي · ٢٠٢٥</p>
            <div className="flex gap-4">
              {['✓ HIPAA','✓ ISO 27001','✓ PDPL'].map(b => <span key={b} className="text-[11px] text-sky-400 font-bold">{b}</span>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
