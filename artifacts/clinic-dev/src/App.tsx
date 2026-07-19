import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── helpers ─────────────────────────────────────────────── */
function useCounter(target: number, dur = 1600) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / (dur / 16)));
    const id = setInterval(() => {
      cur = Math.min(cur + step, target);
      setV(cur);
      if (cur >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, target, dur]);
  return { v, ref };
}

function Reveal({
  children, delay = 0, className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Ticker ──────────────────────────────────────────────── */
const TICKS = ['تطبيق iOS','تطبيق Android','موقع احترافي','نظام إدارة','HIPAA','Apple Health','Apple Wallet','Google Wallet','سجل طبي','واتساب آلي','AES-256','ISO 27001','HL7 FHIR','Apple Watch','تذكير أدوية'];
function Ticker() {
  const all = [...TICKS, ...TICKS];
  return (
    <div className="overflow-hidden border-y border-neutral-100 py-4 bg-white">
      <motion.div className="flex gap-10 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}>
        {all.map((t, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="text-[12px] font-semibold text-neutral-400 whitespace-nowrap">{t}</span>
            <span className="w-1 h-1 rounded-full bg-sky-400 shrink-0" />
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
      <p className="font-black leading-none mb-1 text-sky-600" style={{ fontSize: 'clamp(36px,5vw,60px)' }}>
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
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid #F3F4F6' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 16px rgba(0,0,0,0.06)' : 'none',
      }}>
      <div className="flex items-center gap-2">
        <span className="text-xl">🏥</span>
        <span className="text-[17px] font-black text-neutral-900">
          تلقا<span className="text-sky-500"> للعيادات</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {['المنظومة', 'المميزات', 'الأمان', 'الأسعار'].map(l => (
          <a key={l} href={`#${l}`}
            className="text-[13px] font-medium text-neutral-400 hover:text-neutral-800 transition-colors">{l}</a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
          className="hidden sm:inline-block text-[13px] font-bold px-5 py-2.5 rounded-[10px] border border-sky-200 text-sky-600 hover:bg-sky-50 transition-colors">
          شاهد الديمو
        </a>
        <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
          className="text-[13px] font-bold px-5 py-2.5 rounded-[10px] bg-sky-500 text-white hover:bg-sky-600 transition-colors">
          تواصل
        </a>
      </div>
    </nav>
  );
}

/* ─── App ─────────────────────────────────────────────────── */
export default function App() {
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
      <section className="pt-36 pb-24 px-6 text-center max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[12px] font-bold bg-sky-50 border border-sky-100 text-sky-600">
            <motion.span className="w-1.5 h-1.5 rounded-full bg-sky-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }} />
            متخصصون حصراً في العيادات والمراكز الطبية
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="font-black leading-[1.04] tracking-tight text-neutral-900 mb-6"
          style={{ fontSize: 'clamp(42px,8vw,96px)' }}>
          عيادتك تستحق<br />
          <span className="text-sky-500">أفضل تجربة رقمية.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.65 }}
          className="text-[18px] font-light text-neutral-500 max-w-xl mx-auto mb-10 leading-relaxed">
          تطبيق بهويتك + موقع يفوز على جوجل + نظام إدارة متكامل + أمان HIPAA — كل شيء في ٦٠ يوم.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
            className="font-bold text-[15px] px-9 py-4 rounded-[14px] bg-sky-500 text-white hover:bg-sky-600 transition-colors active:scale-95 shadow-sm shadow-sky-200">
            ابدأ مشروع عيادتك
          </a>
          <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
            className="font-bold text-[15px] px-9 py-4 rounded-[14px] border-2 border-sky-200 text-sky-600 hover:bg-sky-50 transition-colors active:scale-95 flex items-center gap-2">
            <span>شاهد الديمو</span>
            <span>←</span>
          </a>
        </motion.div>

        {/* mini stats */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58 }}
          className="flex flex-wrap items-center justify-center gap-10">
          {[['٦٠ يوم', 'التسليم المضمون'], ['+٥٠', 'عيادة عميلة'], ['١٠٠٪', 'تشفير البيانات'], ['٢٤/٧', 'دعم مستمر']].map(([v, l]) => (
            <div key={l} className="text-center">
              <p className="text-[22px] font-black text-sky-500 leading-none">{v}</p>
              <p className="text-[11px] text-neutral-400 mt-1 font-medium">{l}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <Ticker />

      {/* ── DEMO CTA BANNER ───────────────────────────────── */}
      <section className="py-10 px-8 bg-sky-50 border-y border-sky-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[17px] font-black text-neutral-900 mb-1">جرّب الديمو الحي — مجاناً</p>
            <p className="text-[13px] text-neutral-500">تطبيق المريض الكامل + داشبورد المالك — بدون تسجيل</p>
          </div>
          <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
            className="shrink-0 font-black text-[15px] px-8 py-4 rounded-[14px] bg-sky-500 text-white hover:bg-sky-600 transition-colors active:scale-95 flex items-center gap-3">
            <span>افتح الديمو الآن</span>
            <span className="text-xl">📱</span>
          </a>
        </div>
      </section>

      {/* ── PROBLEMS ──────────────────────────────────────── */}
      <section className="py-28 px-8 max-w-6xl mx-auto">
        <Reveal className="mb-14">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">لماذا تحتاجنا؟</p>
          <h2 className="font-black text-neutral-900" style={{ fontSize: 'clamp(28px,5vw,56px)' }}>
            هذه مشاكل تعاني منها<br />معظم العيادات.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '📞', problem: 'المرضى يتصلون للحجز وأحياناً لا يجدون أحداً', fix: 'تطبيق حجز ٢٤/٧ — بدون مكالمات' },
            { icon: '💬', problem: 'نتائج التحاليل ترسل على واتساب بدون سرية', fix: 'بوابة نتائج مشفرة مباشرة في التطبيق' },
            { icon: '📋', problem: 'لا يوجد سجل طبي موحد للمريض عبر الزيارات', fix: 'سجل رقمي كامل مرتبط بكل مريض' },
            { icon: '🔍', problem: 'المنافسون يظهرون على جوجل وأنت لا تظهر', fix: 'موقع محسّن SEO يجذب مرضى جدد يومياً' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="p-6 rounded-2xl border border-neutral-100 bg-white hover:border-sky-100 hover:shadow-sm transition-all duration-200">
                <div className="flex items-start gap-4">
                  <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-[14px] text-neutral-500 mb-3 flex items-start gap-2">
                      <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                      {item.problem}
                    </p>
                    <p className="text-[14px] font-bold text-sky-600 flex items-center gap-2">
                      <span className="text-sky-500">✓</span>
                      {item.fix}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ──────────────────────────────────────── */}
      <section id="المنظومة" className="py-24 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">المنظومة الكاملة</p>
            <h2 className="font-black text-neutral-900" style={{ fontSize: 'clamp(26px,5vw,54px)' }}>
              ثلاثة منتجات. منظومة واحدة.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              {
                num: '01', icon: '📱', title: 'تطبيق المريض',
                sub: 'iOS + Android بهوية عيادتك',
                accent: '#0EA5E9', bg: '#F0F9FF', border: '#BAE6FD',
                features: ['بطاقة مريض رقمية QR','حجز مواعيد ٢٤/٧','نتائج التحاليل مشفرة','تذكيرات الأدوية','Apple Health','Apple & Google Wallet','إدارة التابعين','Apple Watch'],
              },
              {
                num: '02', icon: '🌐', title: 'الموقع الإلكتروني',
                sub: 'SEO · سريع · متجاوب',
                accent: '#8B5CF6', bg: '#F5F3FF', border: '#DDD6FE',
                features: ['صفحة لكل طبيب','حجز عبر الموقع','عرض الخدمات والأسعار','مدونة طبية','تحسين جوجل ١٠٠٪','نموذج واتساب','شهادات المرضى','نتائج بحث جوجل'],
              },
              {
                num: '03', icon: '📊', title: 'لوحة الإدارة',
                sub: 'المالك · الفريق · التقارير',
                accent: '#10B981', bg: '#ECFDF5', border: '#A7F3D0',
                features: ['إيرادات يومية','طابور المرضى لحظياً','جداول الأطباء','تقارير شهرية','إدارة الفريق الطبي','فواتير التأمين','مركز الأمان','إشعارات تلقائية'],
              },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="p-7 rounded-2xl bg-white border border-neutral-100 h-full flex flex-col hover:shadow-sm transition-shadow duration-200">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{p.icon}</span>
                    <div>
                      <p className="text-[11px] font-bold text-neutral-300">{p.num}</p>
                    </div>
                  </div>
                  <p className="text-[21px] font-black text-neutral-900 mb-1">{p.title}</p>
                  <p className="text-[11px] font-bold tracking-widest uppercase mb-6" style={{ color: p.accent }}>{p.sub}</p>
                  <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {p.features.map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.accent }} />
                        <p className="text-[12px] text-neutral-500">{f}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-5 border-t border-neutral-100">
                    <span className="text-[12px] font-bold" style={{ color: p.accent }}>مشمول في الباقة ✓</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* demo CTA inside products */}
          <Reveal delay={0.15} className="mt-8">
            <div className="p-6 rounded-2xl bg-white border-2 border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <p className="font-black text-[18px] text-neutral-900 mb-1">شاهد المنظومة تعمل بشكل حي</p>
                <p className="text-[13px] text-neutral-400">ديمو تفاعلي كامل — تطبيق المريض + داشبورد المالك</p>
              </div>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                className="shrink-0 font-black text-[15px] px-8 py-4 rounded-[14px] bg-sky-500 text-white hover:bg-sky-600 transition-colors active:scale-95">
                افتح الديمو ←
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="py-20 px-8 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <Stat target={50}  suffix="+"    label="عيادة عميلة" />
          <Stat target={60}  suffix=" يوم" label="متوسط التسليم" />
          <Stat target={100} suffix="٪"    label="تشفير البيانات" />
          <Stat target={0}   suffix=""     label="اختراق مسجّل" prefix="٠" />
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section id="المميزات" className="py-24 px-8 max-w-6xl mx-auto">
        <Reveal className="mb-12">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">المميزات</p>
          <h2 className="font-black text-neutral-900" style={{ fontSize: 'clamp(26px,5vw,52px)' }}>
            ١٥+ ميزة من اليوم الأول.
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            ['🪪','بطاقة رقمية','QR فوري'],
            ['📅','حجز مواعيد','فوري ٢٤/٧'],
            ['🧪','نتائج','مباشرة للهاتف'],
            ['💊','تذكير أدوية','إشعارات ذكية'],
            ['❤️','Apple Health','مزامنة تلقائية'],
            ['⌚','Apple Watch','مؤشرات حيوية'],
            ['👨‍👩‍👧','التابعون','صحة العائلة'],
            ['🎫','Wallet','تذكرة رقمية'],
            ['📋','السجل الطبي','تاريخ موحد'],
            ['🩺','أمراض مزمنة','سكر · ضغط'],
            ['📊','لوحة المالك','تقارير فورية'],
            ['🌐','موقع','جوجل ١٠٠٪'],
            ['💬','واتساب','آلي ومنتظم'],
            ['🔒','أمان HIPAA','تشفير كامل'],
            ['🔗','تكامل HIS','أنظمة موجودة'],
          ].map(([icon, title, sub], i) => (
            <Reveal key={i} delay={i * 0.02}>
              <div className="p-5 text-center rounded-2xl border border-neutral-100 bg-white hover:border-sky-100 hover:shadow-sm transition-all duration-150 cursor-default">
                <span className="text-2xl mb-3 block">{icon}</span>
                <p className="text-[12px] font-bold text-neutral-800 mb-0.5">{title}</p>
                <p className="text-[10px] text-neutral-400">{sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SECURITY ──────────────────────────────────────── */}
      <section id="الأمان" className="py-24 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">الأمان</p>
            <h2 className="font-black text-neutral-900 mb-4" style={{ fontSize: 'clamp(26px,5vw,52px)' }}>
              بيانات مرضاك — محمية بالكامل.
            </h2>
            <p className="text-[15px] text-neutral-500 max-w-lg">
              أمان عسكري المستوى للقطاع الصحي. بنية تقنية — ليست وعوداً.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex flex-wrap gap-3 mb-10">
              {['HIPAA','ISO 27001','AES-256','NDMO','SOC 2','PDPL'].map(b => (
                <div key={b} className="px-4 py-2 rounded-full text-[12px] font-bold bg-white border border-neutral-200 text-neutral-600">
                  ✓ {b}
                </div>
              ))}
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🔐', title: 'تشفير AES-256 كامل', desc: 'نفس معيار وزارات الدفاع. لا أحد يقرأ بيانات مرضاك إلا المخوّلون.' },
              { icon: '🧠', title: 'Zero-Knowledge', desc: 'مفتاح التشفير ملكك — حتى فريق تلقا لا يستطيع رؤية بياناتك.' },
              { icon: '🛡️', title: 'مصادقة ثلاثية', desc: 'Face ID + بصمة + رمز تحقق. لا وصول بدون إذنك.' },
              { icon: '💾', title: 'نسخ كل ٦ ساعات', desc: 'مراكز بيانات موزعة، مشفرة، محمية من الكوارث.' },
              { icon: '👁️', title: 'مراقبة بالذكاء الاصطناعي', desc: 'يكتشف أي نشاط غير اعتيادي ويوقفه فوراً.' },
              { icon: '📜', title: 'PDPL سعودي', desc: 'مطابق لنظام حماية البيانات الشخصية السعودي.' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="p-6 rounded-2xl bg-white border border-neutral-100 hover:border-sky-100 hover:shadow-sm transition-all duration-150 cursor-default h-full">
                  <span className="text-2xl mb-4 block">{s.icon}</span>
                  <p className="text-[14px] font-bold text-neutral-800 mb-1.5">{s.title}</p>
                  <p className="text-[12px] text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-5">
            <div className="p-6 rounded-2xl bg-white border border-neutral-100 flex flex-col sm:flex-row items-center gap-6">
              <span className="text-4xl">🔒</span>
              <div className="flex-1 text-center sm:text-right">
                <p className="font-black text-neutral-900 text-[17px] mb-1">بياناتك ملكك — نحن لا نراها.</p>
                <p className="text-[13px] text-neutral-400">لم يُسجَّل أي اختراق منذ التأسيس. ليس حظاً — هندسة.</p>
              </div>
              <div className="flex gap-8 shrink-0">
                {[['٠','اختراقات'],['١٠٠٪','تشفير'],['٢٤/٧','مراقبة']].map(([v,l]) => (
                  <div key={l} className="text-center">
                    <p className="text-[24px] font-black text-sky-600 leading-none">{v}</p>
                    <p className="text-[10px] text-neutral-400 mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <Reveal className="mb-12">
          <h2 className="font-black text-neutral-900" style={{ fontSize: 'clamp(26px,5vw,52px)' }}>قالوا عنّا.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'عيادة الشفاء', city: 'الرياض', av: 'ع', color: '#0EA5E9',
              quote: 'الحجوزات الإلكترونية قلّصت الانتظار ٦٠٪ في أول أسبوع. المرضى سعداء والفريق أكثر تنظيماً.' },
            { name: 'مجمع النور الطبي', city: 'جدة', av: 'م', color: '#8B5CF6',
              quote: 'مرضاي يطلبون تطبيقنا قبل ما يسألون عن الأطباء. صرنا بمستوى المستشفيات الكبيرة.' },
            { name: 'مستشفى الرعاية', city: 'أبها', av: 'ر', color: '#10B981',
              quote: 'الأمان كان أولويتنا. المواصفات التقنية فاقت توقعاتنا — لا أختار غير تلقا.' },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="p-7 rounded-2xl border border-neutral-100 bg-white h-full flex flex-col hover:shadow-sm transition-shadow duration-200">
                <p className="text-[14px] mb-4" style={{ color: t.color }}>★★★★★</p>
                <p className="text-[14px] text-neutral-600 leading-relaxed flex-1 mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-black text-white shrink-0"
                    style={{ background: t.color }}>{t.av}</div>
                  <div>
                    <p className="text-[13px] font-bold text-neutral-800">{t.name}</p>
                    <p className="text-[11px] text-neutral-400">{t.city}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────── */}
      <section id="الأسعار" className="py-24 px-8 bg-neutral-50">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">السعر</p>
            <h2 className="font-black text-neutral-900 mb-12" style={{ fontSize: 'clamp(26px,5vw,52px)' }}>
              سعر ثابت. كل شيء مشمول.
            </h2>
            <div className="p-10 rounded-2xl bg-white border border-sky-100 shadow-sm">
              <p className="font-black text-neutral-900 leading-none mb-2" style={{ fontSize: 'clamp(52px,10vw,88px)' }}>
                25,000
              </p>
              <p className="text-[17px] text-neutral-400 mb-1">ريال سعودي</p>
              <p className="text-[12px] text-neutral-300 mb-10">تطبيق iOS + Android · موقع · نظام إدارة · أمان كامل</p>
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-10 text-right">
                {['تطبيق iOS + Android','موقع احترافي','نظام إدارة كامل','تسليم ٦٠ يوم','نشر المتجرين','سنة دعم مجاني','تدريب الفريق','هوية عيادتك'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-[12px] text-neutral-500">
                    <span className="text-sky-500">✓</span> {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                  className="font-black text-[15px] px-9 py-4 rounded-[14px] bg-sky-500 text-white hover:bg-sky-600 transition-colors active:scale-95">
                  ابدأ مشروعك
                </a>
                <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                  className="font-bold text-[15px] px-8 py-4 rounded-[14px] border-2 border-sky-200 text-sky-600 hover:bg-sky-50 transition-colors">
                  شاهد الديمو أولاً ←
                </a>
              </div>
              <p className="text-[11px] text-neutral-300 mt-4">استشارة مجانية عبر واتساب</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="py-32 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <h2 className="font-black text-neutral-900 mb-4" style={{ fontSize: 'clamp(36px,7vw,80px)' }}>
              جاهز تبدأ؟
            </h2>
            <p className="text-[17px] text-neutral-400 mb-10">
              استشارة مجانية — بدون التزام — خلال ٢٤ ساعة.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                className="font-black text-[16px] px-12 py-5 rounded-[16px] bg-sky-500 text-white hover:bg-sky-600 transition-colors active:scale-95">
                تواصل عبر واتساب
              </a>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                className="font-bold text-[15px] px-10 py-5 rounded-[16px] border-2 border-neutral-200 text-neutral-600 hover:border-sky-200 hover:text-sky-600 transition-colors">
                شاهد الديمو ←
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <div className="py-8 px-8 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏥</span>
            <span className="font-black text-[15px] text-sky-500">تلقا للعيادات</span>
          </div>
          <p className="text-[11px] text-neutral-400">متخصصون في المنظومات الرقمية للقطاع الطبي · ٢٠٢٥</p>
          <div className="flex items-center gap-4">
            <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
              className="text-[12px] font-bold text-sky-600 hover:underline">الديمو</a>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              className="text-[12px] font-medium px-4 py-2 rounded-full border border-neutral-200 text-neutral-400 hover:border-sky-200 hover:text-sky-500 transition-colors">
              واتساب ←
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
