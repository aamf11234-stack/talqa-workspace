import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─── helpers ─────────────────────────────────────────────── */
function useCounter(target: number, dur = 1600) {
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

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Ticker ──────────────────────────────────────────────── */
const TICKS = ['تطبيق iOS','تطبيق Android','موقع احترافي','نظام إدارة','HIPAA','Apple Health','Apple Wallet','Google Wallet','سجل طبي','واتساب آلي','AES-256','ISO 27001','HL7 FHIR','Apple Watch','تذكير أدوية','NDMO','SOC 2'];
function Ticker() {
  const all = [...TICKS, ...TICKS];
  return (
    <div className="overflow-hidden border-y border-sky-100 py-3.5 bg-sky-50/60">
      <motion.div className="flex gap-10 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 35, ease: 'linear', repeat: Infinity }}>
        {all.map((t, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="text-[12px] font-semibold text-sky-500/70 whitespace-nowrap">{t}</span>
            <span className="w-1 h-1 rounded-full bg-sky-300 shrink-0" />
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
      <p className="font-black leading-none mb-1.5 text-sky-600" style={{ fontSize: 'clamp(38px,5vw,64px)' }}>
        {prefix}{v.toLocaleString('ar-SA')}{suffix}
      </p>
      <p className="text-[13px] text-neutral-400 font-medium">{label}</p>
    </div>
  );
}

/* ─── Phone mockup ────────────────────────────────────────── */
function PhoneMockup() {
  const [screen, setScreen] = useState(0);
  const screens = [
    {
      bg: 'linear-gradient(160deg,#0EA5E9 0%,#0284C7 100%)',
      content: (
        <div className="h-full flex flex-col p-4 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] opacity-60">مرحباً</p>
              <p className="text-[14px] font-black">خالد العمري</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[12px]">خ</div>
          </div>
          <div className="bg-white/15 rounded-2xl p-3 mb-3">
            <p className="text-[9px] opacity-70 mb-1">موعدك القادم</p>
            <p className="text-[12px] font-black">د. سارة المطيري</p>
            <p className="text-[9px] opacity-70">غداً · ١٠:٣٠ ص</p>
            <div className="mt-2 flex gap-2">
              <div className="flex-1 bg-white/20 rounded-lg py-1.5 text-center text-[8px] font-bold">تأكيد</div>
              <div className="flex-1 bg-white/10 rounded-lg py-1.5 text-center text-[8px]">إعادة جدولة</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[['📅','حجز'],['💊','أدوية'],['🧪','نتائج']].map(([ic,lb]) => (
              <div key={lb} className="bg-white/10 rounded-xl p-2 text-center">
                <div className="text-[14px] mb-0.5">{ic}</div>
                <p className="text-[8px] opacity-80">{lb}</p>
              </div>
            ))}
          </div>
          <div className="bg-white/10 rounded-xl p-3 flex items-center gap-2">
            <span className="text-[14px]">💊</span>
            <div className="flex-1">
              <p className="text-[9px] font-bold">ميتفورمين ٥٠٠ملغ</p>
              <p className="text-[8px] opacity-60">مع الإفطار · يومياً</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-400" />
          </div>
        </div>
      ),
    },
    {
      bg: 'linear-gradient(160deg,#7C3AED 0%,#6D28D9 100%)',
      content: (
        <div className="h-full flex flex-col p-4 text-white">
          <p className="text-[11px] opacity-60 mb-1">نتائجك</p>
          <p className="text-[14px] font-black mb-4">السجل الطبي</p>
          {[['🩸','تحليل الدم','أمس','مشفّر'],['📋','وصفة طبية','٣ أيام','PDF'],['📊','تقرير السكر','أسبوع','مشاركة']].map(([ic,tt,dt,tag]) => (
            <div key={tt} className="flex items-center gap-3 bg-white/10 rounded-xl p-3 mb-2">
              <span className="text-[18px]">{ic}</span>
              <div className="flex-1">
                <p className="text-[10px] font-bold">{tt}</p>
                <p className="text-[8px] opacity-60">{dt}</p>
              </div>
              <span className="text-[8px] bg-white/20 px-2 py-0.5 rounded-full">{tag}</span>
            </div>
          ))}
          <div className="mt-auto bg-green-400/20 border border-green-400/30 rounded-xl p-3 text-center">
            <p className="text-[10px] text-green-300 font-bold">🔒 جميع بياناتك مشفرة</p>
          </div>
        </div>
      ),
    },
    {
      bg: 'linear-gradient(160deg,#0F172A 0%,#1E293B 100%)',
      content: (
        <div className="h-full flex flex-col p-4 text-white">
          <p className="text-[10px] opacity-50 mb-0.5">لوحة الإدارة</p>
          <p className="text-[13px] font-black mb-4">اليوم</p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[['١٢','مريض اليوم','sky'],['٨,٥٠٠','الإيرادات ريال','green'],['٣','مواعيد تأخير','amber'],['٩٨٪','رضا المرضى','purple']].map(([v,l,c]) => (
              <div key={l} className={`rounded-xl p-2.5 bg-${c}-500/20 border border-${c}-500/20`}>
                <p className="text-[14px] font-black" style={{color: c==='sky'?'#38BDF8':c==='green'?'#34D399':c==='amber'?'#FBBF24':'#A78BFA'}}>{v}</p>
                <p className="text-[8px] opacity-50">{l}</p>
              </div>
            ))}
          </div>
          <p className="text-[9px] opacity-40 mb-2">طابور الانتظار</p>
          {[['أحمد السالم','د. خالد','٩:٠٠'],['نورا العتيبي','د. سارة','٩:٣٠']].map(([n,d,t]) => (
            <div key={n} className="flex items-center gap-2 bg-white/5 rounded-xl p-2.5 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-sky-500/30 flex items-center justify-center text-[8px] font-bold">{n[0]}</div>
              <div className="flex-1">
                <p className="text-[9px] font-bold">{n}</p>
                <p className="text-[8px] opacity-40">{d}</p>
              </div>
              <span className="text-[8px] opacity-50">{t}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setScreen(s => (s + 1) % screens.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* glow */}
      <div className="absolute w-64 h-64 rounded-full blur-3xl opacity-20 bg-sky-400" />
      
      {/* phone */}
      <div className="relative w-[200px] h-[400px] rounded-[36px] shadow-2xl shadow-sky-200 overflow-hidden"
        style={{ border: '8px solid #0F172A', background: '#0F172A' }}>
        {/* notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-10" />
        
        <AnimatePresence mode="wait">
          <motion.div key={screen} className="absolute inset-0"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: screens[screen].bg, paddingTop: 28 }}>
            {screens[screen].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dots */}
      <div className="absolute -bottom-6 flex gap-2">
        {screens.map((_, i) => (
          <button key={i} onClick={() => setScreen(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: i === screen ? 20 : 6, height: 6, background: i === screen ? '#0EA5E9' : '#CBD5E1' }} />
        ))}
      </div>

      {/* floating badges */}
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-6 top-16 bg-white rounded-2xl shadow-lg shadow-neutral-200 px-3 py-2 flex items-center gap-2 border border-neutral-100">
        <span className="text-lg">📅</span>
        <div>
          <p className="text-[10px] font-black text-neutral-800">حجز جديد</p>
          <p className="text-[9px] text-neutral-400">الآن</p>
        </div>
      </motion.div>

      <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -left-8 bottom-24 bg-white rounded-2xl shadow-lg shadow-neutral-200 px-3 py-2 border border-neutral-100">
        <p className="text-[10px] font-black text-green-600">🔒 HIPAA</p>
        <p className="text-[9px] text-neutral-400">بيانات آمنة ١٠٠٪</p>
      </motion.div>
    </div>
  );
}

/* ─── Nav ─────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 py-4 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid #E0F2FE' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 20px rgba(14,165,233,0.08)' : 'none',
      }}>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white text-[15px]">🏥</div>
        <span className="text-[17px] font-black text-neutral-900">
          تلقا<span className="text-sky-500"> للعيادات</span>
        </span>
      </div>
      <div className="hidden lg:flex items-center gap-8">
        {[['المنظومة','#المنظومة'],['كيف نعمل','#process'],['المميزات','#المميزات'],['الأمان','#الأمان'],['الأسعار','#الأسعار']].map(([l,h]) => (
          <a key={l} href={h} className="text-[13px] font-semibold text-neutral-400 hover:text-sky-600 transition-colors">{l}</a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 text-[13px] font-bold px-4 py-2.5 rounded-xl border-2 border-sky-200 text-sky-600 hover:bg-sky-50 transition-colors">
          <span className="text-[15px]">📱</span> شاهد الديمو
        </a>
        <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
          className="text-[13px] font-bold px-5 py-2.5 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition-colors shadow-sm shadow-sky-200">
          تواصل
        </a>
      </div>
    </nav>
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
  }, []);

  return (
    <div dir="rtl" style={{ background: '#fff', fontFamily: "'Tajawal',sans-serif", overflowX: 'hidden' }}>
      <Nav />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="pt-28 pb-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* text */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 text-[12px] font-bold bg-sky-50 border border-sky-100 text-sky-600">
                <motion.span className="w-1.5 h-1.5 rounded-full bg-sky-500"
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
                متخصصون حصراً في العيادات والمراكز الطبية
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[1.05] text-neutral-900 mb-5"
              style={{ fontSize: 'clamp(38px,6vw,76px)' }}>
              عيادتك تستحق<br />
              <span className="text-sky-500">أفضل تجربة<br />رقمية.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[17px] font-light text-neutral-500 mb-8 leading-relaxed max-w-md">
              تطبيق بهويتك على iOS وAndroid + موقع يفوز على جوجل + نظام إدارة متكامل + أمان HIPAA — في <strong className="text-neutral-700 font-black">٦٠ يوم</strong>.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                className="font-black text-[15px] px-8 py-4 rounded-2xl bg-sky-500 text-white hover:bg-sky-600 transition-all active:scale-95 shadow-md shadow-sky-200 text-center">
                ابدأ مشروع عيادتك
              </a>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                className="font-bold text-[15px] px-8 py-4 rounded-2xl border-2 border-sky-100 text-sky-600 hover:bg-sky-50 hover:border-sky-200 transition-all flex items-center justify-center gap-2">
                <span className="text-[18px]">📱</span>
                <span>شاهد الديمو الحي</span>
              </a>
            </motion.div>

            {/* social proof */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
              className="flex flex-wrap items-center gap-6">
              <div className="flex -space-x-2 space-x-reverse">
                {['#0EA5E9','#8B5CF6','#10B981','#F59E0B','#EF4444'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white"
                    style={{ background: c }}>
                    {['ع','م','ن','خ','ر'][i]}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[13px] font-bold text-neutral-700">+٥٠ عيادة</p>
                <div className="flex items-center gap-1">
                  <span className="text-[12px] text-amber-400">★★★★★</span>
                  <span className="text-[11px] text-neutral-400">تثق بتلقا</span>
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200" />
              <div className="flex gap-4">
                {[['HIPAA','✓'],['ISO 27001','✓'],['PDPL','✓']].map(([b,ic]) => (
                  <span key={b} className="text-[11px] font-bold text-neutral-400">{ic} {b}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* phone */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end pt-10 lg:pt-0">
            <PhoneMockup />
          </motion.div>
        </div>
      </section>

      <Ticker />

      {/* ── DEMO BANNER ───────────────────────────────────── */}
      <section className="py-8 px-6 lg:px-12" style={{ background: 'linear-gradient(135deg,#F0F9FF 0%,#E0F2FE 100%)', borderTop:'1px solid #BAE6FD', borderBottom:'1px solid #BAE6FD' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl border border-sky-100">📱</div>
            <div>
              <p className="text-[17px] font-black text-neutral-900">جرّب الديمو الحي — مجاناً</p>
              <p className="text-[13px] text-neutral-500">تطبيق المريض الكامل + داشبورد المالك — بدون تسجيل</p>
            </div>
          </div>
          <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
            className="shrink-0 font-black text-[15px] px-8 py-4 rounded-2xl bg-sky-500 text-white hover:bg-sky-600 transition-all active:scale-95 shadow-sm shadow-sky-200 flex items-center gap-2">
            افتح الديمو الآن ←
          </a>
        </div>
      </section>

      {/* ── PROBLEMS ──────────────────────────────────────── */}
      <section className="py-28 px-6 lg:px-12 max-w-6xl mx-auto">
        <Reveal className="mb-14">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">لماذا تحتاجنا؟</p>
          <h2 className="font-black text-neutral-900 leading-tight" style={{ fontSize: 'clamp(28px,5vw,56px)' }}>
            مشاكل تعاني منها<br />معظم العيادات اليوم.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '📞', problem: 'المرضى يتصلون للحجز — وأحياناً لا يجد أحد', fix: 'تطبيق حجز ذكي ٢٤/٧ بدون أي مكالمات' },
            { icon: '💬', problem: 'نتائج التحاليل ترسل على واتساب بدون سرية', fix: 'بوابة نتائج مشفرة مباشرة في تطبيقك' },
            { icon: '📋', problem: 'لا يوجد سجل طبي موحد للمريض عبر الزيارات', fix: 'سجل رقمي كامل مرتبط بكل مريض تلقائياً' },
            { icon: '🔍', problem: 'المنافسون يظهرون في جوجل وأنت غائب', fix: 'موقع محسّن SEO يجذب مرضى جدد يومياً' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-md transition-all duration-200">
                <div className="p-5 bg-red-50 border-b border-red-100 flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-[14px] text-red-700 leading-snug"><span className="font-bold">✕</span> {item.problem}</p>
                </div>
                <div className="p-5 bg-white flex items-start gap-3">
                  <span className="text-sky-500 text-[18px] font-black mt-0.5">✓</span>
                  <p className="text-[14px] font-bold text-sky-700 leading-snug">{item.fix}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ──────────────────────────────────────── */}
      <section id="المنظومة" className="py-24 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">المنظومة الكاملة</p>
            <h2 className="font-black text-neutral-900 leading-tight" style={{ fontSize: 'clamp(26px,5vw,54px)' }}>
              ثلاثة منتجات. منظومة واحدة.<br />
              <span className="text-neutral-400 font-medium text-[0.6em]">كل شيء يعمل معاً من اليوم الأول.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              { num:'01', icon:'📱', title:'تطبيق المريض', sub:'iOS + Android بهوية عيادتك',
                accent:'#0EA5E9', bg:'#F0F9FF', border:'#BAE6FD',
                features:[['🪪','بطاقة مريض QR'],['📅','حجز مواعيد ٢٤/٧'],['🧪','نتائج مشفرة'],['💊','تذكيرات أدوية'],['❤️','Apple Health'],['⌚','Apple Watch'],['🎫','Apple & Google Wallet'],['👨‍👩‍👧','إدارة التابعين']] },
              { num:'02', icon:'🌐', title:'الموقع الإلكتروني', sub:'SEO · سريع · متجاوب',
                accent:'#8B5CF6', bg:'#F5F3FF', border:'#DDD6FE',
                features:[['🔍','SEO متخصص طبي'],['👨‍⚕️','صفحة لكل طبيب'],['📆','حجز عبر الموقع'],['💰','عرض الخدمات والأسعار'],['📰','مدونة طبية'],['💬','نموذج واتساب'],['⭐','شهادات المرضى'],['📍','خريطة وموقع العيادة']] },
              { num:'03', icon:'📊', title:'لوحة الإدارة', sub:'المالك · الفريق · التقارير',
                accent:'#10B981', bg:'#ECFDF5', border:'#A7F3D0',
                features:[['💰','إيرادات يومية وشهرية'],['👥','طابور المرضى لحظياً'],['🗓️','جداول الأطباء'],['📈','تقارير تحليلية'],['👔','إدارة الفريق الطبي'],['🏦','فواتير التأمين'],['🔔','إشعارات تلقائية'],['🔒','مركز الأمان']] },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl bg-white border border-neutral-100 h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <div className="p-2" style={{ background: p.bg, borderBottom: `1px solid ${p.border}` }}>
                    <div className="flex items-center gap-3 p-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl bg-white shadow-sm border"
                        style={{ borderColor: p.border }}>{p.icon}</div>
                      <div>
                        <p className="text-[9px] font-bold" style={{ color: p.accent }}>{p.num}</p>
                        <p className="text-[17px] font-black text-neutral-900 leading-tight">{p.title}</p>
                      </div>
                    </div>
                    <div className="px-5 pb-4">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{ background: `${p.accent}18`, color: p.accent }}>{p.sub}</span>
                    </div>
                  </div>
                  <div className="flex-1 p-5 grid grid-cols-1 gap-2.5">
                    {p.features.map(([icon, f]) => (
                      <div key={f} className="flex items-center gap-3">
                        <span className="text-[15px]">{icon}</span>
                        <p className="text-[13px] text-neutral-600">{f}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-5 pt-0">
                    <div className="pt-4 border-t border-neutral-100">
                      <span className="text-[12px] font-bold" style={{ color: p.accent }}>مشمول في الباقة ✓</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-6">
            <div className="p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5"
              style={{ background: 'linear-gradient(135deg,#F0F9FF,#E0F2FE)', border: '2px solid #BAE6FD' }}>
              <div className="flex items-center gap-4">
                <span className="text-3xl">🎬</span>
                <div>
                  <p className="font-black text-[17px] text-neutral-900 mb-1">شاهد المنظومة تعمل فعلاً</p>
                  <p className="text-[13px] text-neutral-500">ديمو تفاعلي حي — تطبيق المريض كاملاً + داشبورد المالك</p>
                </div>
              </div>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                className="shrink-0 font-black text-[15px] px-8 py-4 rounded-2xl bg-sky-500 text-white hover:bg-sky-600 transition-all active:scale-95 shadow-sm">
                افتح الديمو ←
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="py-20 px-6 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <Stat target={50}  suffix="+"    label="عيادة عميلة" />
          <Stat target={60}  suffix=" يوم" label="متوسط التسليم" />
          <Stat target={100} suffix="٪"    label="تشفير البيانات" />
          <Stat target={0}   suffix=""     label="اختراق مسجّل" prefix="٠" />
        </div>
      </section>

      {/* ── HOW WE WORK ───────────────────────────────────── */}
      <section id="process" className="py-28 px-6 lg:px-12 max-w-6xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">كيف نعمل</p>
          <h2 className="font-black text-neutral-900" style={{ fontSize: 'clamp(26px,5vw,54px)' }}>
            من الفكرة للإطلاق<br />في ٦٠ يوم.
          </h2>
        </Reveal>
        <div className="relative">
          {/* line */}
          <div className="hidden lg:block absolute top-8 right-[8.33%] left-[8.33%] h-0.5 bg-gradient-to-l from-sky-100 via-sky-300 to-sky-100" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {[
              { num:'١', icon:'💬', title:'الاستشارة', days:'يوم ١–٣', desc:'نفهم عيادتك وأهدافك ونضع خطة تفصيلية مخصصة.' },
              { num:'٢', icon:'🎨', title:'التصميم', days:'يوم ٤–١٤', desc:'نصمم الهوية والواجهات وتحصل على موافقتك قبل البرمجة.' },
              { num:'٣', icon:'⚡', title:'البرمجة', days:'يوم ١٥–٥٠', desc:'نبني التطبيق والموقع والنظام بأعلى معايير الجودة.' },
              { num:'٤', icon:'🚀', title:'الإطلاق', days:'يوم ٥١–٦٠', desc:'نشر في AppStore وPlay Store + تدريب الفريق + دعم كامل.' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center lg:relative">
                  <div className="w-16 h-16 rounded-2xl bg-sky-500 flex items-center justify-center text-2xl mb-4 shadow-md shadow-sky-200 relative z-10">
                    {s.icon}
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-sky-50 border border-sky-100 rounded-full px-3 py-1 mb-3">
                    <span className="text-[10px] font-black text-sky-600">{s.num}</span>
                    <span className="text-[10px] text-sky-400">·</span>
                    <span className="text-[10px] text-sky-500">{s.days}</span>
                  </div>
                  <p className="text-[17px] font-black text-neutral-900 mb-2">{s.title}</p>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ─────────────────────────────────── */}
      <section id="المميزات" className="py-24 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">المميزات</p>
            <h2 className="font-black text-neutral-900" style={{ fontSize: 'clamp(26px,5vw,52px)' }}>
              ١٥+ ميزة. من اليوم الأول.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              ['🪪','بطاقة رقمية','QR فوري'],
              ['📅','حجز مواعيد','٢٤/٧ بدون مكالمات'],
              ['🧪','نتائج التحاليل','للهاتف مباشرة'],
              ['💊','تذكير أدوية','إشعارات ذكية'],
              ['❤️','Apple Health','مزامنة تلقائية'],
              ['⌚','Apple Watch','مؤشرات حيوية'],
              ['👨‍👩‍👧','التابعون','صحة العائلة'],
              ['🎫','Wallet','تذكرة رقمية'],
              ['📋','السجل الطبي','تاريخ موحد'],
              ['🩺','أمراض مزمنة','سكر · ضغط · قلب'],
              ['📊','لوحة المالك','تقارير فورية'],
              ['🌐','موقع طبي','SEO متخصص'],
              ['💬','واتساب آلي','تذكير وتأكيد'],
              ['🔒','أمان HIPAA','تشفير عسكري'],
              ['🔗','تكامل HIS','أنظمة موجودة'],
            ].map(([icon, title, sub], i) => (
              <Reveal key={i} delay={i * 0.02}>
                <div className="p-5 text-center rounded-2xl border border-neutral-100 bg-white hover:border-sky-200 hover:shadow-md transition-all duration-200 cursor-default group">
                  <span className="text-[26px] mb-3 block group-hover:scale-110 transition-transform duration-200">{icon}</span>
                  <p className="text-[12px] font-bold text-neutral-800 mb-0.5">{title}</p>
                  <p className="text-[10px] text-neutral-400">{sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY ──────────────────────────────────────── */}
      <section id="الأمان" className="py-28 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">الأمان</p>
            <h2 className="font-black text-neutral-900 mb-4" style={{ fontSize: 'clamp(26px,5vw,54px)' }}>
              بيانات مرضاك —<br />محمية بالكامل.
            </h2>
            <p className="text-[16px] text-neutral-500 max-w-lg">أمان عسكري المستوى مُصمَّم خصيصاً للقطاع الصحي. بنية تقنية حقيقية — ليست وعوداً.</p>
          </Reveal>

          <Reveal delay={0.05} className="mb-10">
            <div className="flex flex-wrap gap-3">
              {['HIPAA','ISO 27001','AES-256','NDMO','SOC 2','PDPL'].map(b => (
                <div key={b} className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold bg-neutral-50 border border-neutral-200 text-neutral-600 hover:border-sky-200 hover:text-sky-600 transition-colors cursor-default">
                  <span className="text-sky-500">✓</span> {b}
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon:'🔐', title:'تشفير AES-256 كامل', desc:'نفس معيار وزارات الدفاع. لا أحد يقرأ بيانات مرضاك إلا المخوّلون فقط.' },
              { icon:'🧠', title:'Zero-Knowledge Architecture', desc:'مفتاح التشفير ملكك وحدك — حتى فريق تلقا لا يستطيع تقنياً رؤية بياناتك.' },
              { icon:'🛡️', title:'مصادقة ثلاثية الطبقات', desc:'Face ID + بصمة + رمز تحقق. لا وصول بدون إذنك حتى لو سُرقت كلمة المرور.' },
              { icon:'💾', title:'نسخ احتياطي كل ٦ ساعات', desc:'مراكز بيانات موزعة جغرافياً، مشفرة كلها، محمية من الكوارث وانقطاع الطاقة.' },
              { icon:'👁️', title:'مراقبة بالذكاء الاصطناعي', desc:'يرصد أي نشاط غير اعتيادي ويوقفه فوراً — قبل أن يصبح تهديداً حقيقياً.' },
              { icon:'📜', title:'متوافق مع PDPL السعودي', desc:'مطابق لنظام حماية البيانات الشخصية ولوائح هيئة الحكومة الرقمية.' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="p-6 rounded-2xl bg-white border border-neutral-100 hover:border-sky-100 hover:shadow-md transition-all duration-150 cursor-default h-full group">
                  <span className="text-[28px] mb-4 block group-hover:scale-110 transition-transform duration-200">{s.icon}</span>
                  <p className="text-[14px] font-bold text-neutral-800 mb-2">{s.title}</p>
                  <p className="text-[12px] text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12} className="mt-5">
            <div className="p-7 rounded-2xl border border-sky-100 flex flex-col sm:flex-row items-center gap-6"
              style={{ background: 'linear-gradient(135deg,#F0F9FF,#fff)' }}>
              <div className="text-5xl">🔒</div>
              <div className="flex-1 text-center sm:text-right">
                <p className="font-black text-neutral-900 text-[18px] mb-1">بياناتك ملكك — نحن لا نراها.</p>
                <p className="text-[13px] text-neutral-400">لم يُسجَّل أي اختراق منذ التأسيس. ليس حظاً — هندسة تقنية متكاملة.</p>
              </div>
              <div className="flex gap-8 shrink-0">
                {[['٠','اختراقات'],['١٠٠٪','تشفير'],['٢٤/٧','مراقبة']].map(([v,l]) => (
                  <div key={l} className="text-center">
                    <p className="text-[26px] font-black text-sky-600 leading-none">{v}</p>
                    <p className="text-[10px] text-neutral-400 mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="font-black text-neutral-900" style={{ fontSize: 'clamp(26px,5vw,52px)' }}>قالوا عنّا.</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name:'عيادة الشفاء', city:'الرياض', av:'ع', color:'#0EA5E9', stars:5,
                quote:'الحجوزات الإلكترونية قلّصت الانتظار ٦٠٪ في أول أسبوع. المرضى سعداء وفريقنا أكثر تنظيماً.' },
              { name:'مجمع النور الطبي', city:'جدة', av:'م', color:'#8B5CF6', stars:5,
                quote:'مرضاي يطلبون تطبيقنا قبل ما يسألون عن الأطباء. صرنا بمستوى المستشفيات الكبيرة.' },
              { name:'مستشفى الرعاية', city:'أبها', av:'ر', color:'#10B981', stars:5,
                quote:'الأمان كان أولويتنا. المواصفات التقنية فاقت توقعاتنا بكثير — لا أختار غير تلقا.' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="p-7 rounded-2xl border border-neutral-100 bg-white h-full flex flex-col hover:shadow-md transition-shadow duration-200">
                  <div className="flex gap-0.5 mb-4">
                    {Array(t.stars).fill(0).map((_, j) => <span key={j} className="text-amber-400 text-[15px]">★</span>)}
                  </div>
                  <p className="text-[15px] text-neutral-600 leading-relaxed flex-1 mb-5">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-neutral-100">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-black text-white shrink-0"
                      style={{ background: t.color }}>{t.av}</div>
                    <div>
                      <p className="text-[14px] font-bold text-neutral-800">{t.name}</p>
                      <p className="text-[12px] text-neutral-400">{t.city}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────── */}
      <section id="الأسعار" className="py-28 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">السعر</p>
            <h2 className="font-black text-neutral-900 mb-14" style={{ fontSize: 'clamp(26px,5vw,54px)' }}>
              سعر ثابت. كل شيء مشمول.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="p-10 rounded-3xl bg-white border-2 border-sky-100 shadow-xl shadow-sky-50 relative overflow-hidden">
              {/* subtle pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage:'radial-gradient(circle,#0EA5E9 1px,transparent 1px)', backgroundSize:'24px 24px' }} />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-4 py-1.5 text-[12px] font-bold text-sky-600 mb-6">
                  🏷️ سعر الإطلاق — محدود
                </div>
                <p className="font-black text-neutral-900 leading-none mb-2" style={{ fontSize: 'clamp(52px,10vw,90px)' }}>
                  25,000
                </p>
                <p className="text-[18px] text-neutral-400 mb-1 font-medium">ريال سعودي</p>
                <p className="text-[12px] text-neutral-300 mb-10">دفعة واحدة · لا رسوم شهرية خفية</p>

                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-10 text-right">
                  {[
                    ['📱','تطبيق iOS + Android'],
                    ['🌐','موقع احترافي'],
                    ['📊','نظام إدارة كامل'],
                    ['⏰','تسليم ٦٠ يوم'],
                    ['🏪','نشر في المتجرين'],
                    ['🛡️','سنة دعم مجاني'],
                    ['👩‍💻','تدريب الفريق'],
                    ['🎨','هوية عيادتك الكاملة'],
                  ].map(([ic, item]) => (
                    <div key={item} className="flex items-center gap-2 text-[13px] text-neutral-600">
                      <span>{ic}</span> {item}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                    className="font-black text-[15px] px-10 py-4 rounded-2xl bg-sky-500 text-white hover:bg-sky-600 transition-all active:scale-95 shadow-md shadow-sky-200">
                    ابدأ مشروعك الآن
                  </a>
                  <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                    className="font-bold text-[15px] px-8 py-4 rounded-2xl border-2 border-sky-200 text-sky-600 hover:bg-sky-50 transition-all flex items-center gap-2">
                    <span>📱</span> شاهد الديمو أولاً
                  </a>
                </div>
                <p className="text-[11px] text-neutral-300 mt-4">استشارة مجانية عبر واتساب · لا يلزمك أي شيء</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="font-black text-neutral-900" style={{ fontSize: 'clamp(24px,4vw,48px)' }}>
              أسئلة شائعة.
            </h2>
          </Reveal>
          <div className="space-y-3">
            {[
              { q:'هل التطبيق يكون باسم عيادتي أو باسم تلقا؟', a:'التطبيق يُنشر باسم عيادتك وشعارك كاملاً على AppStore وGoogle Play. تلقا لا تظهر بأي شكل للمرضى.' },
              { q:'كيف تضمنون التسليم في ٦٠ يوم؟', a:'لدينا عملية مجربة مع +٥٠ عيادة. نبدأ بتصميم موافق عليه منك، ثم برمجة منظمة بمراحل واضحة. التأخير الوحيد الممكن هو إذا تأخرت في الموافقات من طرفك.' },
              { q:'ماذا يحدث بعد السنة الأولى من الدعم؟', a:'بعد السنة الأولى المجانية، الدعم المستمر متاح بخطط شهرية مرنة. أو يمكنك الاعتماد على الفريق الداخلي بعد التدريب.' },
              { q:'هل يتكامل مع نظام HIS الموجود لدينا؟', a:'نعم، نوفر API كاملة للتكامل مع أغلب أنظمة HIS الشائعة في السوق السعودي. نفحص النظام الحالي في مرحلة الاستشارة.' },
              { q:'هل يعمل التطبيق في حال ضعف الإنترنت؟', a:'نعم، التطبيق مصمم للعمل بشكل جزئي أوف لاين مع مزامنة تلقائية عند عودة الإنترنت.' },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="rounded-2xl border border-neutral-100 bg-white overflow-hidden">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-right hover:bg-neutral-50 transition-colors">
                    <span className="text-[15px] font-bold text-neutral-800">{faq.q}</span>
                    <motion.span animate={{ rotate: faqOpen === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                      className="text-2xl text-sky-400 shrink-0 mr-3">+</motion.span>
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                        className="overflow-hidden">
                        <p className="px-5 pb-5 text-[14px] text-neutral-500 leading-relaxed border-t border-neutral-100 pt-4">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="py-32 px-6 text-center" style={{ background:'linear-gradient(180deg,#fff 0%,#F0F9FF 100%)' }}>
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="text-5xl mb-6">🏥</div>
            <h2 className="font-black text-neutral-900 mb-4" style={{ fontSize: 'clamp(36px,7vw,80px)' }}>
              جاهز تبدأ؟
            </h2>
            <p className="text-[17px] text-neutral-400 mb-10 leading-relaxed">
              استشارة مجانية · بدون التزام · خلال ٢٤ ساعة
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                className="font-black text-[16px] px-12 py-5 rounded-2xl bg-sky-500 text-white hover:bg-sky-600 transition-all active:scale-95 shadow-lg shadow-sky-200">
                تواصل عبر واتساب
              </a>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                className="font-bold text-[15px] px-10 py-5 rounded-2xl border-2 border-sky-200 text-sky-600 hover:bg-sky-50 transition-all flex items-center gap-2">
                <span>📱</span> شاهد الديمو
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="py-10 px-6 lg:px-12 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white text-[14px]">🏥</div>
              <span className="font-black text-[16px] text-neutral-900">تلقا<span className="text-sky-500"> للعيادات</span></span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-[13px]">
              {[['المنظومة','#المنظومة'],['كيف نعمل','#process'],['الأمان','#الأمان'],['الأسعار','#الأسعار'],['الديمو','/clinic-demo/']].map(([l,h]) => (
                <a key={l} href={h} target={h.startsWith('/') ? '_blank' : undefined}
                  className="text-neutral-400 hover:text-sky-600 transition-colors font-medium">{l}</a>
              ))}
            </div>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              className="text-[13px] font-bold px-5 py-2.5 rounded-xl border border-sky-200 text-sky-600 hover:bg-sky-50 transition-colors">
              واتساب ←
            </a>
          </div>
          <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-300">
            <p>متخصصون في المنظومات الرقمية للقطاع الطبي · ٢٠٢٥</p>
            <div className="flex gap-4">
              {['HIPAA','ISO 27001','PDPL'].map(b => <span key={b} className="text-sky-300">✓ {b}</span>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
