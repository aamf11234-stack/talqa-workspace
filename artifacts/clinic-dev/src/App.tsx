import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ─── helpers ───────────────────────────────────────────────── */
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

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Ticker ─────────────────────────────────────────────────── */
const ITEMS = ['موقع احترافي', 'تطبيق iOS', 'تطبيق Android', 'HIPAA', 'نظام إدارة', 'Apple Health', 'واتساب آلي', 'ISO 27001', 'سجل طبي رقمي', '٦٠ يوم تسليم', 'أمان AES-256', 'Google Wallet', 'HL7 FHIR'];
function Ticker() {
  const all = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <motion.div className="flex gap-12 w-max"
        animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, ease: 'linear', repeat: Infinity }}>
        {all.map((item, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="text-[13px] font-semibold whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.35)' }}>{item}</span>
            <span className="w-1 h-1 rounded-full shrink-0" style={{ background: 'rgba(6,182,212,0.5)' }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Stat counter ───────────────────────────────────────────── */
function Stat({ target, suffix, label, prefix = '', color = '#06B6D4' }: { target: number; suffix: string; label: string; prefix?: string; color?: string }) {
  const { v, ref } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <p className="font-black leading-none mb-2" style={{ fontSize: 'clamp(38px,5vw,64px)', color }}>
        {prefix}{v.toLocaleString('ar-SA')}{suffix}
      </p>
      <p className="text-[13px] font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
    </div>
  );
}

/* ─── Glass card ─────────────────────────────────────────────── */
function GlassCard({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: 24,
      ...style
    }}>
      {children}
    </div>
  );
}

/* ─── Nav ────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-500" style={{
      background: scrolled ? 'rgba(4,12,22,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
    }}>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-[18px] font-black tracking-tight" style={{ color: '#fff' }}>
        تلقا<span style={{ background: 'linear-gradient(135deg,#06B6D4,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> تك</span>
      </motion.span>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="hidden md:flex items-center gap-8">
        {['خدماتنا', 'الأمان', 'الأسعار', 'الديمو'].map(l => (
          <a key={l} href="#" className="text-[13px] font-medium transition-colors"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
            {l}
          </a>
        ))}
      </motion.div>

      <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
        className="text-[13px] font-bold px-5 py-2.5 rounded-[10px] transition-all"
        style={{ background: 'linear-gradient(135deg,#06B6D4,#8B5CF6)', color: '#fff' }}>
        تواصل
      </motion.a>
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* orbs */}
      <div className="absolute pointer-events-none" style={{ top: '15%', right: '10%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(6,182,212,0.12) 0%,transparent 70%)', borderRadius: '50%' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '10%', left: '8%', width: 600, height: 600, background: 'radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 70%)', borderRadius: '50%' }} />
      <div className="absolute pointer-events-none" style={{ top: '40%', left: '20%', width: 300, height: 300, background: 'radial-gradient(circle,rgba(16,185,129,0.08) 0%,transparent 70%)', borderRadius: '50%' }} />

      {/* grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[12px] font-bold"
            style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)', color: '#06B6D4' }}>
            <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }}
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
            +٥٠ عيادة ومركز طبي يثقون بتلقا
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-black leading-[1.03] tracking-tight mb-8"
          style={{ fontSize: 'clamp(48px,9vw,110px)', color: '#fff' }}>
          نصنع المستقبل<br />
          <span style={{ background: 'linear-gradient(135deg,#06B6D4 0%,#8B5CF6 50%,#10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            الصحي لعيادتك.
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[18px] font-light max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.45)' }}>
          تطبيق للمرضى · موقع احترافي · نظام إدارة · أمان عسكري المستوى — كل شيء بهوية عيادتك في ٦٠ يوم.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
            className="font-bold text-[15px] px-8 py-4 rounded-[14px] transition-all hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg,#06B6D4,#8B5CF6)', color: '#fff', boxShadow: '0 0 40px rgba(6,182,212,0.3)' }}>
            ابدأ مشروع عيادتك
          </a>
          <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
            className="font-medium text-[14px] px-7 py-4 rounded-[14px] transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}>
            شاهد الديمو ←
          </a>
        </motion.div>
      </div>

      {/* floating stats */}
      <div className="absolute bottom-12 left-0 right-0 px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}
          className="max-w-2xl mx-auto grid grid-cols-3 gap-4">
          {[['٦٠', 'يوم تسليم'], ['١٠٠٪', 'تشفير البيانات'], ['٢٤/٧', 'دعم مستمر']].map(([v, l]) => (
            <GlassCard key={l} className="py-4 text-center">
              <p className="text-[22px] font-black" style={{ background: 'linear-gradient(135deg,#06B6D4,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</p>
              <p className="text-[11px] font-light mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{l}</p>
            </GlassCard>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <div className="w-0.5 h-2 rounded-full" style={{ background: 'rgba(6,182,212,0.6)' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── main ───────────────────────────────────────────────────── */
export default function App() {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.style.background = '#040C16';
    document.body.style.fontFamily = "'Tajawal',sans-serif";
    document.body.style.margin = '0';
  }, []);

  return (
    <div dir="rtl" style={{ background: '#040C16', color: '#fff', fontFamily: "'Tajawal',sans-serif", overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Ticker />

      {/* ── STATEMENT ─────────────────────────────────────────── */}
      <section className="py-32 px-8 max-w-6xl mx-auto">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-8" style={{ color: '#06B6D4' }}>لماذا تلقا؟</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-black leading-[1.08] mb-16" style={{ fontSize: 'clamp(32px,6vw,76px)', color: '#fff' }}>
            نقدر نسوي أي شي<br />
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>تتخيله لعيادتك.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📱', accent: '#06B6D4', title: 'تطبيق بهويتك', desc: 'اسمك وشعارك على AppStore وGoogle Play. مرضاك يحملونه ويفخرون بعيادتك.' },
            { icon: '🌐', accent: '#8B5CF6', title: 'موقع يفوز على جوجل', desc: 'محسّن لكلمات البحث الطبية — مرضى جدد يجدونك قبل أي منافس في مدينتك.' },
            { icon: '🔐', accent: '#10B981', title: 'أمان لا يُتجاوز', desc: 'AES-256 · HIPAA · ISO 27001 — نفس المعايير التي تستخدمها وزارات الدفاع.' },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <GlassCard className="p-8 h-full group cursor-default hover:bg-white/[0.07] transition-colors duration-200">
                <div className="text-3xl mb-5">{c.icon}</div>
                <p className="text-[20px] font-black mb-3" style={{ color: '#fff' }}>{c.title}</p>
                <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{c.desc}</p>
                <div className="mt-6 h-0.5 rounded-full w-12" style={{ background: `linear-gradient(90deg,${c.accent},transparent)` }} />
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ──────────────────────────────────────────── */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: '#8B5CF6' }}>المنظومة الكاملة</p>
          <h2 className="font-black" style={{ fontSize: 'clamp(28px,5vw,60px)', color: '#fff' }}>ثلاثة منتجات. منظومة واحدة.</h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { num: '01', accent: '#06B6D4', title: 'تطبيق المريض', sub: 'iOS + Android',
              features: ['بطاقة مريض رقمية QR', 'حجز مواعيد ٢٤/٧', 'نتائج التحاليل فورياً', 'تذكيرات الأدوية الذكية', 'مزامنة Apple Health', 'Apple & Google Wallet', 'إدارة التابعين'] },
            { num: '02', accent: '#8B5CF6', title: 'الموقع الإلكتروني', sub: 'SEO · سريع · متجاوب',
              features: ['صفحة كل طبيب', 'حجز عبر الموقع', 'خدمات وأسعار', 'مدونة طبية', 'تحسين جوجل ١٠٠٪', 'نموذج واتساب', 'شهادات المرضى'] },
            { num: '03', accent: '#10B981', title: 'نظام الإدارة', sub: 'المالك · الفريق · التقارير',
              features: ['لوحة إيرادات يومية', 'طابور المرضى لحظياً', 'جداول الأطباء', 'تقارير شهرية', 'إدارة الفريق', 'فواتير التأمين', 'مركز أمان كامل'] },
          ].map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <GlassCard className="p-8 h-full flex flex-col hover:bg-white/[0.07] transition-colors duration-200 cursor-default">
                <div className="flex items-center justify-between mb-8">
                  <p className="font-black text-[40px] leading-none" style={{ color: p.accent, opacity: 0.25 }}>{p.num}</p>
                </div>
                <p className="text-[22px] font-black mb-1" style={{ color: '#fff' }}>{p.title}</p>
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-8" style={{ color: p.accent }}>{p.sub}</p>
                <div className="flex-1 space-y-3">
                  {p.features.map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full shrink-0" style={{ background: p.accent }} />
                      <p className="text-[13px] font-light" style={{ color: 'rgba(255,255,255,0.5)' }}>{f}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-[12px] font-semibold" style={{ color: p.accent }}>مشمول في الباقة ✓</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="py-24 px-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <Stat target={50}  suffix="+"    label="عيادة عميلة"     color="#06B6D4" />
          <Stat target={60}  suffix=" يوم" label="متوسط التسليم"   color="#8B5CF6" />
          <Stat target={100} suffix="٪"    label="تشفير البيانات"  color="#10B981" />
          <Stat target={0}   suffix=""     label="اختراق مسجّل"    color="#F59E0B" prefix="٠" />
        </div>
      </section>

      {/* ── SECURITY ──────────────────────────────────────────── */}
      <section className="py-32 px-8 max-w-6xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: '#10B981' }}>الأمان</p>
          <h2 className="font-black leading-tight mb-4" style={{ fontSize: 'clamp(28px,5vw,64px)', color: '#fff' }}>
            الأكثر أماناً<br />في القطاع الصحي.
          </h2>
          <p className="text-[15px] font-light max-w-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>
            بيانات مرضاك تُعامَل بنفس مستوى حماية الأسرار الحكومية.
          </p>
        </Reveal>

        {/* matrix bg placeholder */}
        <Reveal delay={0.04}>
          <div className="flex flex-wrap gap-3 mb-12">
            {['HIPAA', 'ISO 27001', 'AES-256', 'NDMO', 'SOC 2', 'PDPL'].map(b => (
              <div key={b} className="px-4 py-2 rounded-full text-[12px] font-bold"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#10B981' }}>
                ✓ {b}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🔐', title: 'تشفير AES-256 كامل',          desc: 'نفس معيار التشفير المستخدم في وزارات الدفاع. لا أحد يقرأ بيانات مرضاك إلا المخوّلون.' },
            { icon: '🧠', title: 'Zero-Knowledge Architecture',  desc: 'مفتاح التشفير ملكك. حتى فريق تلقا غير قادر تقنياً على رؤية بيانات مرضاك.' },
            { icon: '🛡️', title: 'مصادقة ثلاثية الطبقات',        desc: 'Face ID + بصمة + رمز تحقق. لا وصول بدون إذنك حتى لو سُرقت كلمة المرور.' },
            { icon: '💾', title: 'نسخ احتياطي كل ٦ ساعات',      desc: 'مراكز بيانات موزعة، مشفرة كلها، محمية من الكوارث وانقطاع الطاقة.' },
            { icon: '👁️', title: 'مراقبة بالذكاء الاصطناعي',     desc: 'يكتشف أي نشاط غير اعتيادي ويوقفه فورياً — قبل أن يصبح تهديداً.' },
            { icon: '📜', title: 'متوافق مع PDPL السعودي',        desc: 'مطابق لنظام حماية البيانات الشخصية ولوائح هيئة الحكومة الرقمية.' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <GlassCard className="p-7 cursor-default hover:bg-white/[0.07] transition-colors duration-200 h-full">
                <span className="text-2xl mb-4 block">{s.icon}</span>
                <p className="text-[15px] font-bold mb-2" style={{ color: '#fff' }}>{s.title}</p>
                <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <GlassCard className="mt-4 p-7 flex flex-col sm:flex-row items-center gap-6" style={{ borderColor: 'rgba(16,185,129,0.2)' }}>
            <div className="text-4xl">🔒</div>
            <div className="flex-1 text-center sm:text-right">
              <p className="text-[17px] font-black mb-1 text-white">بياناتك ملكك — نحن لا نراها.</p>
              <p className="text-[13px] font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>لم يُسجَّل أي اختراق منذ التأسيس. ليس حظاً — هندسة.</p>
            </div>
            <div className="flex gap-8 shrink-0">
              {[['٠', 'اختراقات'], ['١٠٠٪', 'تشفير'], ['٢٤/٧', 'مراقبة']].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="text-[24px] font-black leading-none" style={{ color: '#10B981' }}>{v}</p>
                  <p className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{l}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <Reveal className="mb-12">
          <h2 className="font-black" style={{ fontSize: 'clamp(26px,4vw,52px)', color: '#fff' }}>١٥+ ميزة من اليوم الأول.</h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            ['🪪', 'بطاقة رقمية', 'QR فوري'], ['📅', 'حجز مواعيد', 'فوري ٢٤/٧'], ['🧪', 'نتائج', 'مباشرة للهاتف'],
            ['💊', 'تذكير أدوية', 'إشعارات ذكية'], ['❤️', 'Apple Health', 'مزامنة تلقائية'],
            ['⌚', 'Apple Watch', 'مؤشرات حيوية'], ['👨‍👩‍👧', 'التابعون', 'صحة العائلة'],
            ['🎫', 'Wallet', 'تذكرة رقمية'], ['📋', 'السجل الطبي', 'تاريخ موحد'],
            ['🩺', 'أمراض مزمنة', 'سكر · ضغط'], ['📊', 'لوحة المالك', 'تقارير فورية'],
            ['🌐', 'موقع', 'جوجل ١٠٠٪'], ['💬', 'واتساب', 'آلي ومنتظم'],
            ['🔒', 'أمان HIPAA', 'تشفير كامل'], ['🔗', 'تكامل HIS', 'أنظمة موجودة'],
          ].map(([icon, title, sub], i) => (
            <Reveal key={i} delay={i * 0.025}>
              <GlassCard className="p-5 text-center cursor-default hover:bg-white/[0.07] transition-colors duration-150" style={{ borderRadius: 16 }}>
                <span className="text-2xl mb-3 block">{icon}</span>
                <p className="text-[12px] font-bold mb-0.5" style={{ color: '#fff' }}>{title}</p>
                <p className="text-[10px] font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>{sub}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <Reveal className="mb-12">
          <h2 className="font-black" style={{ fontSize: 'clamp(26px,4vw,52px)', color: '#fff' }}>قالوا عنّا.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'عيادة الشفاء', city: 'الرياض', av: 'ع', accent: '#06B6D4',
              quote: 'الحجوزات الإلكترونية قلّصت الانتظار ٦٠٪ في أول أسبوع. المرضى سعداء والفريق أكثر تنظيماً.' },
            { name: 'مجمع النور الطبي', city: 'جدة', av: 'م', accent: '#8B5CF6',
              quote: 'مرضاي يطلبون تطبيقنا قبل ما يسألون عن الأطباء. صرنا بمستوى المستشفيات الكبيرة.' },
            { name: 'مستشفى الرعاية', city: 'أبها', av: 'ر', accent: '#10B981',
              quote: 'الأمان كان أولويتنا كمستشفى. المواصفات التقنية فاقت توقعاتنا بكثير.' },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <GlassCard className="p-7 h-full flex flex-col">
                <p className="text-[14px] mb-4" style={{ color: t.accent }}>★★★★★</p>
                <p className="text-[14px] font-light leading-relaxed flex-1 mb-6 italic" style={{ color: 'rgba(255,255,255,0.5)' }}>"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-black shrink-0"
                    style={{ background: `linear-gradient(135deg,${t.accent}33,${t.accent}11)`, border: `1px solid ${t.accent}40`, color: t.accent }}>
                    {t.av}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-white">{t.name}</p>
                    <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.city}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────── */}
      <section className="py-24 px-8 max-w-2xl mx-auto text-center">
        <Reveal>
          <GlassCard className="p-12" style={{ border: '1px solid rgba(6,182,212,0.2)' }}>
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-6" style={{ color: '#06B6D4' }}>سعر الإطلاق</p>
            <p className="font-black leading-none mb-2" style={{ fontSize: 'clamp(56px,10vw,96px)', background: 'linear-gradient(135deg,#06B6D4,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>25,000</p>
            <p className="text-[18px] font-light mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>ريال سعودي</p>
            <p className="text-[12px] font-light mb-10" style={{ color: 'rgba(255,255,255,0.25)' }}>تطبيق iOS + Android · موقع · نظام إدارة · أمان كامل</p>
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-10">
              {['تسليم ٦٠ يوم', 'نشر المتجرين', 'سنة دعم', 'تدريب الفريق', 'تكامل HIS', 'هوية عيادتك'].map(item => (
                <div key={item} className="flex items-center gap-2 text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  <span style={{ color: '#06B6D4' }}>✓</span> {item}
                </div>
              ))}
            </div>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              className="inline-block font-black text-[15px] px-10 py-4 rounded-[14px] transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#06B6D4,#8B5CF6)', color: '#fff', boxShadow: '0 0 40px rgba(6,182,212,0.25)' }}>
              ابدأ مشروعك مع تلقا
            </a>
            <p className="text-[11px] mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>استشارة مجانية عبر واتساب</p>
          </GlassCard>
        </Reveal>
      </section>

      {/* ── DEV SECTION ───────────────────────────────────────── */}
      <section className="py-16 px-8 max-w-5xl mx-auto">
        <Reveal>
          <GlassCard className="overflow-hidden" style={{ borderRadius: 20 }}>
            <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex gap-1.5">
                {['#FF5F57', '#FEBC2E', '#28C840'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
              </div>
              <span className="text-[11px] font-mono mr-auto" style={{ color: 'rgba(255,255,255,0.2)' }}>للمطورين — بنية تقنية من أعلى مستوى</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-7" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[11px] font-bold tracking-widest uppercase mb-5" style={{ color: '#06B6D4' }}>REST API + Webhooks</p>
                <div className="space-y-2 font-mono text-[11px] mb-6">
                  {[['GET', '#4ADE80', '/v1/patients/:id'], ['POST', '#60A5FA', '/v1/appointments'], ['PATCH', '#FBBF24', '/v1/prescriptions/:id'], ['WSS', '#A78BFA', '/v1/realtime']].map(([m, c, p]) => (
                    <div key={p} className="flex items-center gap-3 px-3 py-2 rounded-[8px]" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <span className="font-bold w-10 shrink-0" style={{ color: c }}>{m}</span>
                      <span style={{ color: 'rgba(255,255,255,0.35)' }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['FHIR R4', 'HL7', 'DICOM'].map(b => (
                    <span key={b} className="text-[10px] font-bold px-2.5 py-1 rounded font-mono"
                      style={{ background: 'rgba(6,182,212,0.1)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.2)' }}>{b}</span>
                  ))}
                </div>
              </div>
              <div className="p-7 font-mono text-[11px] leading-loose" dir="ltr">
                <p><span style={{ color: '#A78BFA' }}>import</span> <span style={{ color: '#FBBF24' }}>{'{ TelqaClient }'}</span> <span style={{ color: '#A78BFA' }}>from</span> <span style={{ color: '#4ADE80' }}>'@telqa/sdk'</span>;</p>
                <br />
                <p><span style={{ color: '#A78BFA' }}>const</span> <span style={{ color: '#60A5FA' }}>client</span> = <span style={{ color: '#A78BFA' }}>new</span> <span style={{ color: '#FBBF24' }}>TelqaClient</span>({'{'}</p>
                <p className="ml-4"><span style={{ color: 'rgba(255,255,255,0.4)' }}>encryption</span>: <span style={{ color: '#4ADE80' }}>'AES-256'</span>,</p>
                <p>{'}'});</p>
                <br />
                <p style={{ color: 'rgba(255,255,255,0.2)' }}>{'// حجز موعد مشفر'}</p>
                <p><span style={{ color: '#A78BFA' }}>const</span> appt = <span style={{ color: '#A78BFA' }}>await</span> client</p>
                <p className="ml-4">.<span style={{ color: '#60A5FA' }}>appointments</span>.<span style={{ color: '#60A5FA' }}>create</span>({'(...)'})</p>
                <br />
                <p style={{ color: '#4ADE80' }}>{'// → "status": "confirmed" ✓'}</p>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="py-40 px-8 text-center relative overflow-hidden">
        <div className="absolute pointer-events-none" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, background: 'radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 65%)' }} />
        <div className="absolute pointer-events-none" style={{ top: '30%', right: '15%', width: 400, height: 400, background: 'radial-gradient(circle,rgba(6,182,212,0.07) 0%,transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-black leading-[1.05] mb-6" style={{ fontSize: 'clamp(40px,8vw,96px)', color: '#fff' }}>
              جاهز تبدأ؟
            </h2>
            <p className="text-[17px] font-light mb-12" style={{ color: 'rgba(255,255,255,0.3)' }}>استشارة مجانية — بدون التزام — خلال ٢٤ ساعة.</p>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              className="inline-block font-black text-[16px] px-12 py-5 rounded-[16px] transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#06B6D4,#8B5CF6)', color: '#fff', boxShadow: '0 0 60px rgba(6,182,212,0.2)' }}>
              تواصل معنا عبر واتساب
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <div className="py-8 px-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-black text-[15px]" style={{ background: 'linear-gradient(135deg,#06B6D4,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>تلقا تك</span>
          <p className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.2)' }}>وكالة تصميم منظومات رقمية للقطاع الطبي · ٢٠٢٥</p>
          <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
            className="text-[12px] font-medium px-4 py-2 rounded-full transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.4)'; (e.currentTarget as HTMLElement).style.color = '#06B6D4'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}>
            واتساب ←
          </a>
        </div>
      </div>
    </div>
  );
}
