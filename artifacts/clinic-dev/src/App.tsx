import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── animated counter ─────────────────────────────────────────── */
function useCounter(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const t = setInterval(() => { v = Math.min(v + step, target); setVal(v); if (v >= target) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return { val, ref };
}

const W = 'max-w-6xl mx-auto px-6';

/* ── section fade ────────────────────────────────────────────── */
function Fade({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── stat card ───────────────────────────────────────────────── */
function Stat({ target, suffix, label, prefix = '' }: { target: number; suffix: string; label: string; prefix?: string }) {
  const { val, ref } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <p className="text-[36px] md:text-[44px] font-black text-[#0B2D4E] leading-none">
        {prefix}{val.toLocaleString('ar')}{suffix}
      </p>
      <p className="text-[13px] text-[#888] font-light mt-1.5 leading-snug">{label}</p>
    </div>
  );
}

/* ── feature card ────────────────────────────────────────────── */
function FCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-[22px] p-5 border border-[rgba(11,45,78,0.07)] shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-200">
      <span className="text-2xl mb-3 block">{icon}</span>
      <p className="text-[13px] font-bold text-[#111] mb-1 leading-snug">{title}</p>
      <p className="text-[11px] text-[#999] font-light leading-relaxed">{desc}</p>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.dir  = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.style.fontFamily = "'Tajawal', sans-serif";
  }, []);

  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(180deg,#F0F6FF 0%,#E8F3FF 100%)', fontFamily: "'Tajawal',sans-serif" }} dir="rtl">

      {/* ══════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[rgba(11,45,78,0.08)] shadow-[0_1px_12px_rgba(0,0,0,0.04)]">
        <div className={`${W} py-3.5 flex items-center justify-between`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center shadow-[0_4px_14px_rgba(0,180,216,0.3)]"
              style={{ background: 'linear-gradient(135deg,#0B2D4E,#00B4D8)' }}>
              <span className="text-white text-[13px] font-black">ت</span>
            </div>
            <div>
              <span className="text-[16px] font-black text-[#0B2D4E]">تلقا</span>
              <span className="text-[13px] text-[#AAA] font-light"> للعيادات</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#666]">
            <a href="#products" className="hover:text-[#0B2D4E] transition-colors">خدماتنا</a>
            <a href="#security" className="hover:text-[#0B2D4E] transition-colors">الأمان</a>
            <a href="#pricing"  className="hover:text-[#0B2D4E] transition-colors">الأسعار</a>
            <a href="/clinic-demo/" className="hover:text-[#00B4D8] text-[#00B4D8] font-semibold transition-colors">شاهد الديمو</a>
          </div>
          <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 font-bold text-[13px] text-white px-4 py-2 rounded-[12px] shadow-[0_4px_18px_rgba(0,180,216,0.3)] transition-all duration-150 hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg,#0B2D4E,#00B4D8)' }}>
            تواصل معنا
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <div className={`${W} pt-16 pb-12 text-center`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          <span className="inline-flex items-center gap-2 text-white text-[11px] font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest shadow-[0_4px_20px_rgba(0,180,216,0.3)]"
            style={{ background: 'linear-gradient(135deg,#0B2D4E,#007FAF)' }}>
            <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse shrink-0" />
            +٥٠ عيادة ومركز طبي يثقون بتلقا تك
          </span>

          <h1 className="text-[38px] md:text-[56px] font-black text-[#0B2D4E] leading-[1.15] mb-5 tracking-tight">
            موقعك وتطبيقك الطبي<br />
            <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(135deg,#007FAF,#00B4D8)' }}>
              يشتغلان في ٦٠ يوم
            </span>
          </h1>

          <p className="text-[18px] md:text-[22px] text-[#666] font-light mb-4 leading-relaxed max-w-2xl mx-auto">
            منظومة رقمية كاملة — تطبيق للمرضى · موقع احترافي · نظام إدارة · أعلى أمان في القطاع الصحي
          </p>
          <p className="text-[13px] text-[#AAA] mb-8 max-w-lg mx-auto leading-relaxed">
            مرضاك يحجزون · يستلمون نتائجهم · يذكّرون بأدويتهم — كل شيء رقمياً بهوية عيادتك
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-bold text-[15px] text-white px-8 py-4 rounded-[16px] shadow-[0_8px_32px_rgba(0,180,216,0.35)] transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#0B2D4E,#00B4D8)' }}>
              ابدأ مشروع عيادتك الآن 🚀
            </a>
            <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold text-[14px] text-[#0B2D4E] px-6 py-3.5 rounded-[16px] bg-white border border-[rgba(11,45,78,0.15)] shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:bg-[#F0F6FF] transition-colors">
              شاهد الديمو التفاعلي
              <span className="text-[16px]">→</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Trust numbers ───────────────────────────────────────── */}
      <div className={`${W} mb-14`}>
        <div className="bg-white rounded-[28px] py-8 px-6 shadow-[0_4px_32px_rgba(0,0,0,0.06)] border border-[rgba(11,45,78,0.06)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-x-reverse divide-[rgba(11,45,78,0.06)]">
            <Stat target={50}   suffix="+"  label="عيادة ومركز طبي عميل" />
            <Stat target={60}   suffix=" يوم" label="متوسط وقت التسليم" />
            <Stat target={100}  suffix="٪"  label="تشفير بيانات المرضى" />
            <Stat target={4}    suffix=".٩" label="تقييم متوسط من المرضى" prefix="⭐" />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          PROBLEM → SOLUTION
      ══════════════════════════════════════════════════ */}
      <div className={`${W} mb-16`}>
        <Fade className="text-center mb-8">
          <p className="text-[11px] text-[#AAA] font-bold tracking-widest uppercase mb-2">لماذا تلقا؟</p>
          <h2 className="text-[28px] md:text-[36px] font-black text-[#0B2D4E] leading-tight">ماذا تخسر عيادتك<br />بدون منظومة رقمية؟</h2>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Problems */}
          <Fade delay={0.05}>
            <div className="rounded-[26px] p-7 h-full" style={{ background: 'linear-gradient(145deg,#1A0A0A,#2D1010)' }}>
              <p className="text-[#FF6B6B] text-[11px] font-bold tracking-widest uppercase mb-4">بدون تلقا</p>
              <div className="space-y-3.5">
                {[
                  'طوابير استقبال طويلة تُنفّر المرضى',
                  'نتائج التحاليل تتأخر وتضيع بين الأوراق',
                  'لا يوجد تذكير بالأدوية — المريض ينسى',
                  'لا تاريخ طبي موحد — كل زيارة من الصفر',
                  'مرضى يتركون العيادة لمنافس عنده تطبيق',
                  'لا بيانات — لا تقارير — لا قرارات ذكية',
                ].map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#FF6B6B] text-[18px] shrink-0 leading-none mt-0.5">✗</span>
                    <p className="text-white/60 text-[13px] font-light leading-snug">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
          {/* Solutions */}
          <Fade delay={0.12}>
            <div className="rounded-[26px] p-7 h-full" style={{ background: 'linear-gradient(145deg,#021A10,#043020)' }}>
              <p className="text-[#10B981] text-[11px] font-bold tracking-widest uppercase mb-4">مع تلقا</p>
              <div className="space-y-3.5">
                {[
                  'حجز إلكتروني ٢٤/٧ — بدون انتظار وبدون مكالمات',
                  'نتائج التحاليل تصل للمريض مباشرة على هاتفه',
                  'إشعارات أدوية ذكية تحسّن الالتزام ٧٠٪',
                  'سجل طبي رقمي موحد لكل مريض إلى الأبد',
                  'تطبيقك بهويتك — مرضاك يفخرون بعيادتك',
                  'تقارير يومية فورية — قرارات مبنية على بيانات',
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#10B981] text-[18px] shrink-0 leading-none mt-0.5">✓</span>
                    <p className="text-white/60 text-[13px] font-light leading-snug">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          PRODUCTS
      ══════════════════════════════════════════════════ */}
      <div id="products" className={`${W} mb-16`}>
        <Fade className="text-center mb-8">
          <p className="text-[11px] text-[#AAA] font-bold tracking-widest uppercase mb-2">ماذا تحصل</p>
          <h2 className="text-[28px] md:text-[36px] font-black text-[#0B2D4E]">منظومة ثلاثية متكاملة</h2>
          <p className="text-[14px] text-[#AAA] font-light mt-2 max-w-md mx-auto">كل المكونات تعمل معاً بتكامل كامل — ليس مجرد تطبيق منفصل</p>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              num: '٠١', icon: '📱',
              title: 'تطبيق المريض',
              sub: 'iOS + Android',
              color: '#0B2D4E',
              glow: 'rgba(11,45,78,0.2)',
              features: ['بطاقة مريض رقمية بـ QR', 'حجز مواعيد لحظي', 'نتائج التحاليل مباشرة', 'تذكيرات الأدوية الذكية', 'مزامنة Apple Health', 'Apple & Google Wallet'],
              desc: 'يُنزّله مريضك من المتجر ويحمل عيادتك في جيبه طوال اليوم.',
              bg: 'linear-gradient(145deg,#050E1A,#0B3A5A,#050E1A)',
            },
            {
              num: '٠٢', icon: '🌐',
              title: 'موقع إلكتروني',
              sub: 'متجاوب · سريع · SEO',
              color: '#065f46',
              glow: 'rgba(16,185,129,0.15)',
              features: ['صفحة كل طبيب مع سيرته', 'حجز مواعيد عبر الموقع', 'معرض الخدمات والأسعار', 'مدونة طبية وأخبار', 'محسّن لجوجل ١٠٠٪', 'نموذج تواصل واتساب'],
              desc: 'موقع احترافي يظهر في نتائج جوجل ويحوّل الزوار لمرضى.',
              bg: 'linear-gradient(145deg,#040D08,#0D2814,#040D08)',
            },
            {
              num: '٠٣', icon: '📊',
              title: 'نظام إدارة',
              sub: 'المالك · الموظفون · التقارير',
              color: '#6d28d9',
              glow: 'rgba(109,40,217,0.15)',
              features: ['لوحة إيرادات يومية', 'إدارة طابور المرضى', 'جدول الأطباء والمواعيد', 'تقارير شهرية تفصيلية', 'إدارة الفريق الطبي', 'فواتير وتأمين صحي'],
              desc: 'لوحة تحكم كاملة للمالك والموظفين — كل شيء في متناول يدك.',
              bg: 'linear-gradient(145deg,#080012,#1A0030,#080012)',
            },
          ].map((p, i) => (
            <Fade key={i} delay={i * 0.08}>
              <div className="rounded-[28px] p-7 relative overflow-hidden h-full flex flex-col" style={{ background: p.bg }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 80% 0%,${p.glow} 0%,transparent 60%)` }} />
                <div className="absolute top-0 left-0 w-32 h-32 opacity-[0.03]"
                  style={{ backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '12px 12px' }} />
                <div className="relative z-10 flex-1">
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-3xl">{p.icon}</span>
                    <span className="text-white/20 text-[28px] font-black leading-none">{p.num}</span>
                  </div>
                  <p className="text-white text-[20px] font-black mb-0.5">{p.title}</p>
                  <p className="text-white/30 text-[11px] mb-4">{p.sub}</p>
                  <p className="text-white/45 text-[12px] font-light leading-relaxed mb-5">{p.desc}</p>
                  <div className="space-y-2">
                    {p.features.map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                        <p className="text-white/55 text-[11px] font-light">{f}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════════════════════ */}
      <div className={`${W} mb-16`}>
        <Fade className="text-center mb-8">
          <p className="text-[11px] text-[#AAA] font-bold tracking-widest uppercase mb-2">كل ما تحتاجه</p>
          <h2 className="text-[28px] md:text-[34px] font-black text-[#0B2D4E]">١٥+ ميزة جاهزة من اليوم الأول</h2>
        </Fade>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { icon: '🪪', title: 'بطاقة مريض رقمية',     desc: 'QR فوري بدون ورق' },
            { icon: '📅', title: 'حجز مواعيد لحظي',      desc: 'تأكيد فوري + تقويم' },
            { icon: '🧪', title: 'نتائج التحاليل',        desc: 'مباشرة من المختبر' },
            { icon: '💊', title: 'تذكيرات الأدوية',       desc: 'إشعارات ذكية يومياً' },
            { icon: '❤️', title: 'Apple Health',          desc: 'مزامنة تلقائية' },
            { icon: '⌚', title: 'Apple Watch',           desc: 'مؤشرات حيوية فورية' },
            { icon: '👨‍👩‍👧', title: 'إدارة التابعين',      desc: 'صحة عائلتك معاً' },
            { icon: '🎫', title: 'Apple & Google Wallet', desc: 'بطاقة موعدك رقمياً' },
            { icon: '📋', title: 'السجل الطبي',           desc: 'تاريخ كامل موحد' },
            { icon: '🩺', title: 'متابعة الأمراض المزمنة',desc: 'سكر · ضغط · قلب' },
            { icon: '📊', title: 'لوحة إدارة المالك',     desc: 'تقارير وإيرادات' },
            { icon: '🌐', title: 'موقع إلكتروني',         desc: 'محسّن لجوجل ١٠٠٪' },
            { icon: '💬', title: 'واتساب آلي',            desc: 'تأكيد + تذكير + نتائج' },
            { icon: '🔒', title: 'أمان HIPAA',            desc: 'تشفير كامل للبيانات' },
            { icon: '🔗', title: 'تكامل HIS/LIS',         desc: 'ربط بالأنظمة الموجودة' },
          ].map((f, i) => (
            <Fade key={i} delay={i * 0.03}>
              <FCard icon={f.icon} title={f.title} desc={f.desc} />
            </Fade>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          DEMO TEASER
      ══════════════════════════════════════════════════ */}
      <div className={`${W} mb-16`}>
        <Fade>
          <div className="rounded-[28px] overflow-hidden relative" style={{ background: 'linear-gradient(145deg,#050E1A,#0B3A5A,#050E1A)' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%,rgba(0,180,216,0.12) 0%,transparent 55%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-7 md:p-10">
              <div className="flex-1">
                <p className="text-[#00B4D8] text-[11px] font-bold tracking-widest uppercase mb-3">نموذج تفاعلي حقيقي</p>
                <h3 className="text-white text-[24px] md:text-[30px] font-black mb-3 leading-tight">
                  شوف كيف يبدو<br />
                  <span style={{ color: '#00B4D8' }}>تطبيق عيادتك فعلاً</span>
                </h3>
                <p className="text-white/40 text-[13px] font-light mb-6 max-w-sm leading-relaxed">
                  ديمو تفاعلي كامل — تنقّل بين شاشات تطبيق المريض، حجز المواعيد، بطاقة المريض الرقمية، ونتائج التحاليل.
                </p>
                <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-[14px] text-[#0B2D4E] bg-white px-6 py-3.5 rounded-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:bg-[#F0F6FF] transition-colors">
                  افتح الديمو التفاعلي
                  <span className="text-[16px]">→</span>
                </a>
              </div>
              <div className="shrink-0 hidden md:flex flex-col gap-2 w-52">
                {[
                  { label: 'تطبيق المريض',   icon: '📱', active: true  },
                  { label: 'حجز المواعيد',   icon: '📅', active: false },
                  { label: 'بطاقة رقمية',    icon: '🪪', active: false },
                  { label: 'نتائج فورية',    icon: '🧪', active: false },
                  { label: 'لوحة المالك',    icon: '📊', active: false },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-[12px]"
                    style={{ background: s.active ? 'rgba(0,180,216,0.15)' : 'rgba(255,255,255,0.05)', border: s.active ? '1px solid rgba(0,180,216,0.3)' : '1px solid transparent' }}>
                    <span className="text-[16px] shrink-0">{s.icon}</span>
                    <p className="text-[12px] font-semibold" style={{ color: s.active ? '#00B4D8' : 'rgba(255,255,255,0.4)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fade>
      </div>

      {/* ══════════════════════════════════════════════════
          SECURITY — HERO SECTION
      ══════════════════════════════════════════════════ */}
      <div id="security" className={`${W} mb-16`}>
        <div className="rounded-[32px] overflow-hidden relative" style={{ background: 'linear-gradient(160deg,#020B14 0%,#061828 45%,#020B14 100%)' }}>

          {/* glows */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% -10%,rgba(16,185,129,0.18) 0%,transparent 55%)' }} />
          <div className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.025]"
            style={{ backgroundImage: 'radial-gradient(circle,#10B981 1px,transparent 1px)', backgroundSize: '18px 18px' }} />

          <div className="relative z-10 px-7 md:px-14 py-12 md:py-16">

            {/* Header */}
            <Fade className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/25 text-[#10B981] text-[11px] font-bold px-4 py-1.5 rounded-full mb-5 tracking-wider">
                <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
                الأمان — الأولوية الأولى دائماً
              </div>
              <h2 className="text-white text-[30px] md:text-[42px] font-black leading-tight mb-4">
                الأكثر أماناً في<br />
                <span style={{ color: '#10B981' }}>قطاع الرعاية الصحية</span>
              </h2>
              <p className="text-white/40 text-[14px] font-light max-w-2xl mx-auto leading-relaxed">
                بيانات مرضاك أثمن ما تملكه. نحن نحمي كل بيت من بياناتهم بتشفير لا يُكسر — مبني على نفس المعايير التي تستخدمها وزارات الدفاع والبنوك الكبرى.
              </p>
            </Fade>

            {/* Compliance badges */}
            <Fade delay={0.1}>
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {[
                  { label: 'HIPAA Compliant',  sub: 'خصوصية البيانات الصحية' },
                  { label: 'ISO 27001',         sub: 'أمن المعلومات الدولي' },
                  { label: 'NDMO Saudi',        sub: 'هيئة الحكومة الرقمية' },
                  { label: 'AES-256',           sub: 'تشفير عسكري المستوى' },
                  { label: 'PDPL',              sub: 'حماية البيانات السعودية' },
                ].map(b => (
                  <div key={b.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-[14px]"
                    style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <span className="text-[#10B981] text-[12px] font-black">✓</span>
                    <div>
                      <p className="text-[#10B981] text-[11px] font-bold leading-none">{b.label}</p>
                      <p className="text-white/25 text-[9px] mt-0.5">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Fade>

            {/* Security pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {[
                { icon: '🔐', title: 'تشفير AES-256 من الطرف للطرف', accent: '#10B981',
                  desc: 'كل بيانات مريض — من الاسم إلى التشخيص — مشفرة بنفس المعيار المستخدم في وزارات الدفاع والأسرار الحكومية. لا أحد يقرأها إلا المخوّلون.' },
                { icon: '🧠', title: 'معمارية Zero-Knowledge', accent: '#00B4D8',
                  desc: 'مفتاح التشفير ملكك وحدك. حتى فريق تلقا لا يستطيع الاطلاع على بيانات مرضاك — ليس سياسة فقط، بل بنية تقنية لا تُتجاوز.' },
                { icon: '🛡️', title: 'مصادقة متعددة العوامل', accent: '#8B5CF6',
                  desc: 'Face ID + بصمة الإصبع + رمز تحقق لكل دخول. لا يصل أحد لبياناتك حتى لو سرق كلمة المرور — حماية ثلاثية الطبقات.' },
                { icon: '💾', title: 'نسخ احتياطي مشفر ٣ مرات يومياً', accent: '#F59E0B',
                  desc: 'بياناتك محفوظة في مراكز بيانات موزعة جغرافياً — مشفرة كلها، محمية من الكوارث والاختراقات والحرائق وانقطاع الكهرباء.' },
                { icon: '👁️', title: 'ذكاء اصطناعي يراقب ٢٤/٧', accent: '#EF4444',
                  desc: 'نظام AI يرصد كل دخول وكل عملية وصول. يكتشف الأنماط الغريبة ويوقفها قبل أن تصبح تهديداً — ويبلّغك فوراً.' },
                { icon: '📜', title: 'متوافق مع نظام PDPL السعودي', accent: '#10B981',
                  desc: 'عيادتك محمية قانونياً — متوافقون بالكامل مع نظام حماية البيانات الشخصية السعودي ولوائح هيئة الحكومة الرقمية.' },
              ].map((s, i) => (
                <Fade key={i} delay={i * 0.06}>
                  <div className="rounded-[22px] p-6 relative overflow-hidden h-full"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-[80px] opacity-[0.06]" style={{ background: s.accent }} />
                    <span className="text-3xl mb-4 block">{s.icon}</span>
                    <p className="text-white text-[14px] font-bold mb-2 leading-snug">{s.title}</p>
                    <p className="text-white/35 text-[12px] font-light leading-relaxed">{s.desc}</p>
                  </div>
                </Fade>
              ))}
            </div>

            {/* Bottom stats bar */}
            <Fade delay={0.15}>
              <div className="rounded-[22px] p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-8"
                style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)' }}>
                <div className="text-[44px] shrink-0">🔒</div>
                <div className="flex-1 text-center sm:text-right">
                  <p className="text-[#10B981] text-[18px] font-black mb-1">بياناتك ملكك وحدك — نحن لا نراها.</p>
                  <p className="text-white/35 text-[13px] font-light">لم يُسجَّل أي اختراق منذ تأسيس المنظومة. هذا ليس حظاً — هذا هندسة.</p>
                </div>
                <div className="flex gap-8 shrink-0">
                  {[['٠', 'اختراقات'], ['١٠٠٪', 'تشفير'], ['٢٤/٧', 'مراقبة']].map(([v, l]) => (
                    <div key={l} className="text-center">
                      <p className="text-[#10B981] text-[24px] font-black leading-none">{v}</p>
                      <p className="text-white/30 text-[10px] mt-1">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <div className={`${W} mb-16`}>
        <Fade className="text-center mb-8">
          <p className="text-[11px] text-[#AAA] font-bold tracking-widest uppercase mb-2">قالوا عنّا</p>
          <h2 className="text-[28px] md:text-[34px] font-black text-[#0B2D4E]">عيادات تثق بتلقا تك</h2>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'عيادة الشفاء الطبية',   city: 'الرياض', initials: 'ع', color: '#0B2D4E',
              quote: 'الحجوزات الإلكترونية قلّصت الانتظار ٦٠٪ في أول أسبوع من التشغيل. المرضى سعداء والفريق أكثر تنظيماً.' },
            { name: 'مجمع النور الطبي',      city: 'جدة',    initials: 'م', color: '#065f46',
              quote: 'مرضاي يطلبون تطبيقنا قبل ما يسألون عن الأطباء. صارت العيادة بمستوى المستشفيات الكبيرة بعيون الناس.' },
            { name: 'مستشفى الرعاية الأهلي', city: 'أبها',   initials: 'ر', color: '#6d28d9',
              quote: 'الأمان كان أولويتنا كمستشفى — قرأنا عن تشفير AES-256 ومعايير HIPAA وكانت النتيجة أفضل من توقعاتنا.' },
          ].map((t, i) => (
            <Fade key={i} delay={i * 0.08}>
              <div className="bg-white rounded-[24px] p-6 border border-[rgba(11,45,78,0.07)] shadow-[0_4px_24px_rgba(0,0,0,0.06)] h-full flex flex-col">
                <p className="text-[#F59E0B] text-[14px] mb-3">⭐⭐⭐⭐⭐</p>
                <p className="text-[13px] text-[#555] font-light leading-relaxed flex-1 mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#F5F7FA]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[14px] font-black shrink-0"
                    style={{ background: `linear-gradient(135deg,${t.color},#00B4D8)` }}>{t.initials}</div>
                  <div>
                    <p className="text-[13px] font-bold text-[#111]">{t.name}</p>
                    <p className="text-[11px] text-[#BBB]">{t.city}</p>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          PRICING CTA
      ══════════════════════════════════════════════════ */}
      <div id="pricing" className={`${W} mb-16`}>
        <Fade>
          <div className="rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(145deg,#050E1A 0%,#0B3A5A 45%,#050E1A 100%)' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(0,180,216,0.16) 0%,transparent 60%)' }} />
            <div className="absolute bottom-0 left-0 w-40 h-40 opacity-[0.03]"
              style={{ backgroundImage: 'radial-gradient(circle,#00B4D8 1.5px,transparent 1.5px)', backgroundSize: '10px 10px' }} />
            <div className="relative z-10">
              <p className="text-[#00B4D8] text-[11px] font-bold tracking-widest uppercase mb-3">سعر إطلاق خاص</p>
              <p className="text-white text-[56px] font-black leading-none mb-1">25,000</p>
              <p className="text-[#00B4D8] text-[20px] font-light mb-1.5">ريال سعودي</p>
              <p className="text-white/25 text-[12px] mb-8 font-light">تطبيق iOS + Android · موقع · نظام إدارة · نتائج رقمية · حجوزات · سجل طبي</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 max-w-md mx-auto mb-8">
                {['تسليم خلال ٦٠ يوم','نشر على المتجرين','سنة دعم مجاني','تدريب الفريق','تكامل مع HIS الحالي','تصميم بهوية عيادتك'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-white/45 text-[11px]">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#00B4D8' }} />
                    {item}
                  </div>
                ))}
              </div>
              <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                className="inline-block font-black text-[16px] text-[#0B2D4E] bg-white px-10 py-4 rounded-[18px] shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:bg-[#F0F8FF] active:scale-95 transition-all duration-150">
                ابدأ مشروع عيادتك مع تلقا تك 🚀
              </a>
              <p className="text-white/20 text-[11px] mt-4 font-light">تواصل عبر واتساب للاستفسار المجاني</p>
            </div>
          </div>
        </Fade>
      </div>

      {/* ══════════════════════════════════════════════════
          DEVELOPER SECTION — "القوة التقنية"
      ══════════════════════════════════════════════════ */}
      <div className={`${W} mb-14`}>
        <Fade>
          <div className="rounded-[28px] overflow-hidden border border-[rgba(0,180,216,0.15)]"
            style={{ background: '#050E1A' }}>
            <div className="px-7 md:px-10 py-8">
              <div className="flex flex-col md:flex-row items-start gap-8">

                {/* Left: technical cred */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#00B4D8]" />
                    <p className="text-[#00B4D8] text-[10px] font-bold tracking-widest uppercase">للمطورين والشركاء التقنيين</p>
                  </div>
                  <h3 className="text-white text-[22px] font-black mb-2">بنية تقنية من أعلى مستوى</h3>
                  <p className="text-white/35 text-[13px] font-light leading-relaxed mb-5 max-w-md">
                    تلقا مبنية على أحدث تقنيات React Native · Node.js · PostgreSQL مع REST API كامل وWebhooks — جاهزة للتكامل مع أي نظام HIS أو LIS موجود.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      ['REST API', 'FHIR · HL7 جاهز'],
                      ['Webhooks', 'تحديثات فورية'],
                      ['SDK', 'iOS · Android · Node.js'],
                      ['Sandbox', 'بيئة اختبار كاملة'],
                    ].map(([t, s]) => (
                      <div key={t} className="flex items-center gap-2.5 px-3 py-2.5 rounded-[12px]"
                        style={{ background: 'rgba(0,180,216,0.07)', border: '1px solid rgba(0,180,216,0.12)' }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] shrink-0" />
                        <div>
                          <p className="text-[#00B4D8] text-[11px] font-bold leading-none">{t}</p>
                          <p className="text-white/25 text-[9px] mt-0.5">{s}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: code terminal */}
                <div className="flex-1 w-full">
                  <div className="rounded-[16px] overflow-hidden border border-white/8" style={{ background: '#0a0a0a' }}>
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
                      </div>
                      <span className="text-white/20 text-[10px] font-mono mr-auto">telqa-api.ts</span>
                    </div>
                    <div className="p-4 font-mono text-[11px] leading-relaxed" dir="ltr">
                      <p><span style={{ color: '#7C3AED' }}>import</span> <span style={{ color: '#F59E0B' }}>{'{ TelqaClient }'}</span> <span style={{ color: '#7C3AED' }}>from</span> <span style={{ color: '#10B981' }}>'@telqa/sdk'</span>;</p>
                      <p className="mt-2"><span style={{ color: '#7C3AED' }}>const</span> <span style={{ color: '#00B4D8' }}>telqa</span> = <span style={{ color: '#7C3AED' }}>new</span> <span style={{ color: '#F59E0B' }}>TelqaClient</span>({'{'}</p>
                      <p className="ml-4"><span style={{ color: '#AAA' }}>apiKey</span>: process.env.<span style={{ color: '#00B4D8' }}>TELQA_KEY</span>,</p>
                      <p className="ml-4"><span style={{ color: '#AAA' }}>encryption</span>: <span style={{ color: '#10B981' }}>'AES-256'</span>,</p>
                      <p>{'}'});</p>
                      <p className="mt-2 text-white/25">// حجز موعد مشفر بالكامل</p>
                      <p><span style={{ color: '#7C3AED' }}>const</span> <span style={{ color: '#AAA' }}>appt</span> = <span style={{ color: '#7C3AED' }}>await</span> telqa.<span style={{ color: '#00B4D8' }}>appointments</span>.</p>
                      <p className="ml-4"><span style={{ color: '#00B4D8' }}>create</span>({'{'} patientId, doctorId, slot {'}'});</p>
                      <p className="mt-2 text-white/25">// → <span style={{ color: '#10B981' }}>"status": "confirmed"</span></p>
                    </div>
                  </div>

                  {/* API endpoints */}
                  <div className="mt-3 space-y-1.5">
                    {[
                      { method: 'GET',   color: '#10B981', path: '/v1/patients/:id' },
                      { method: 'POST',  color: '#00B4D8', path: '/v1/appointments' },
                      { method: 'PATCH', color: '#F59E0B', path: '/v1/prescriptions/:id' },
                      { method: 'WSS',   color: '#8B5CF6', path: '/v1/realtime' },
                    ].map(e => (
                      <div key={e.path} className="flex items-center gap-3 px-3 py-2 rounded-[10px] font-mono text-[10px]"
                        style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <span className="font-bold w-10 shrink-0" style={{ color: e.color }}>{e.method}</span>
                        <span className="text-white/40">{e.path}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom strip */}
            <div className="px-7 md:px-10 py-4 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3"
              style={{ background: 'rgba(0,180,216,0.05)' }}>
              <p className="text-white/30 text-[12px]">
                مبنية على معايير <span className="text-[#00B4D8]">FHIR R4 · HL7 · DICOM</span> — متوافقة مع أي نظام طبي موجود
              </p>
              <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                className="text-[#00B4D8] text-[12px] font-bold hover:text-white transition-colors whitespace-nowrap">
                اسأل عن التكامل ←
              </a>
            </div>
          </div>
        </Fade>
      </div>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <div className="border-t border-[rgba(11,45,78,0.08)] bg-white/60 py-10 px-6">
        <div className={`${W} flex flex-col md:flex-row items-center justify-between gap-4`}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[8px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#0B2D4E,#00B4D8)' }}>
              <span className="text-white text-[11px] font-black">ت</span>
            </div>
            <span className="text-[14px] font-black text-[#0B2D4E]">تلقا تك</span>
          </div>
          <p className="text-[11px] text-[#CCC] font-light text-center">
            وكالة تصميم تطبيقات ومواقع احترافية للقطاع الطبي · جميع الحقوق محفوظة ٢٠٢٥
          </p>
          <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
            className="text-[12px] font-bold text-[#0B2D4E] border border-[rgba(11,45,78,0.2)] px-4 py-2 rounded-full hover:bg-[#0B2D4E]/5 transition-colors">
            واتساب ←
          </a>
        </div>
      </div>

    </div>
  );
}
