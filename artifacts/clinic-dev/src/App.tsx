import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

/* ─── helpers ────────────────────────────────────────────────── */
function useCounter(target: number, dur = 1800) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / (dur / 16)));
    const t = setInterval(() => { cur = Math.min(cur + step, target); setV(cur); if (cur >= target) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [inView, target, dur]);
  return { v, ref };
}

function Reveal({ children, delay = 0, y = 30, className = '' }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Orb (background glow) ──────────────────────────────────── */
function Orb({ x, y, color, size = 600 }: { x: string; y: string; color: string; size?: number }) {
  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, width: size, height: size,
      background: `radial-gradient(circle,${color} 0%,transparent 70%)`,
      transform: 'translate(-50%,-50%)', filter: 'blur(1px)' }} />
  );
}

/* ─── Glass card ─────────────────────────────────────────────── */
function Glass({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-[28px] border ${className}`} style={{
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderColor: 'rgba(255,255,255,0.09)',
      boxShadow: '0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── Marquee ticker ─────────────────────────────────────────── */
const TICKER_ITEMS = ['موقع احترافي','تطبيق iOS & Android','أمان AES-256','HIPAA متوافق','ذكاء اصطناعي','نظام إدارة','Apple Health','Google Wallet','واتساب آلي','ISO 27001','سجل طبي رقمي','٦٠ يوم تسليم'];

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden py-5 border-y" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
      <motion.div className="flex gap-10 w-max" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, ease: 'linear', repeat: Infinity }}>
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="text-[15px] font-semibold whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.35)' }}>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'rgba(0,212,255,0.5)' }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Animated stat ──────────────────────────────────────────── */
function Stat({ target, suffix, label, color = '#00D4FF', prefix = '' }: { target: number; suffix: string; label: string; color?: string; prefix?: string }) {
  const { v, ref } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <p className="font-black leading-none mb-2" style={{ fontSize: 'clamp(36px,5vw,64px)', color }}>
        {prefix}{v.toLocaleString('ar-SA')}{suffix}
      </p>
      <p className="text-[13px] font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY  = useTransform(scrollYProgress, [0,1], [0, 180]);
  const heroO  = useTransform(scrollYProgress, [0,0.6], [1, 0]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dir  = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.style.background = '#040C16';
    document.body.style.fontFamily = "'Tajawal',sans-serif";
    document.body.style.margin     = '0';
  }, []);

  return (
    <div dir="rtl" style={{ background: '#040C16', color: '#fff', fontFamily: "'Tajawal',sans-serif", overflowX: 'hidden' }}>

      {/* ══ NAVBAR ══════════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <Glass className="px-5 py-3 flex items-center justify-between" style={{ borderRadius: 20 }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#00D4FF,#7C3AED)', boxShadow: '0 0 20px rgba(0,212,255,0.4)' }}>
                <span className="text-white text-[13px] font-black">ت</span>
              </div>
              <span className="text-[16px] font-black text-white">تلقا<span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}> للعيادات</span></span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {[['خدماتنا','#products'],['الأمان','#security'],['الأسعار','#pricing'],['الديمو','/clinic-demo/']].map(([label, href]) => (
                <a key={label} href={href} target={href.startsWith('/') ? '_blank' : undefined}
                  className="text-[13px] font-medium transition-colors duration-150 hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</a>
              ))}
            </div>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              className="font-bold text-[13px] px-5 py-2.5 rounded-[12px] transition-all duration-150 hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#00D4FF,#0096B4)', color: '#020C16', boxShadow: '0 4px 20px rgba(0,212,255,0.35)' }}>
              تواصل معنا
            </a>
          </Glass>
        </div>
      </div>

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Background orbs */}
        <Orb x="20%" y="30%" color="rgba(124,58,237,0.18)" size={700} />
        <Orb x="80%" y="20%" color="rgba(0,212,255,0.14)" size={600} />
        <Orb x="50%" y="80%" color="rgba(16,185,129,0.10)" size={500} />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <motion.div style={{ y: heroY, opacity: heroO }} className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32 pb-16">

          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00D4FF' }} />
              <span className="text-[12px] font-bold tracking-widest" style={{ color: '#00D4FF' }}>تلقا تك — منظومة العيادات الرقمية</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-black leading-[1.05] mb-6 tracking-tight" style={{ fontSize: 'clamp(42px,8vw,96px)' }}>
              <span className="block" style={{ color: 'rgba(255,255,255,0.95)' }}>نصنع المستقبل</span>
              <span className="block" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(135deg,#00D4FF 0%,#7C3AED 50%,#10B981 100%)' }}>
                الصحي لعيادتك
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-[18px] md:text-[22px] font-light mb-3 leading-relaxed max-w-2xl mx-auto"
              style={{ color: 'rgba(255,255,255,0.45)' }}>
              تطبيق · موقع · نظام إدارة · أمان عسكري · ذكاء اصطناعي
            </p>
            <p className="text-[15px] font-light max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.25)' }}>
              كل شيء يشتغل في ٦٠ يوم — بهويتك، بأمانك، بمستواك
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 font-black text-[15px] px-8 py-4 rounded-[18px] transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg,#00D4FF,#0096B4)', color: '#020C16', boxShadow: '0 0 40px rgba(0,212,255,0.4), 0 8px 32px rgba(0,0,0,0.3)' }}>
                ابدأ مشروع عيادتك 🚀
              </a>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer">
                <Glass className="flex items-center gap-2 font-semibold text-[14px] px-6 py-4 cursor-pointer hover:bg-white/[0.07] transition-colors">
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>شاهد الديمو التفاعلي</span>
                  <span className="text-[16px]" style={{ color: '#00D4FF' }}>→</span>
                </Glass>
              </a>
            </div>
          </Reveal>

          {/* Floating glass stats */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              {[
                { v: '+٥٠', l: 'عيادة عميلة', c: '#00D4FF' },
                { v: '٦٠',  l: 'يوم تسليم',   c: '#7C3AED' },
                { v: '٩٩٪', l: 'رضا العملاء', c: '#10B981' },
                { v: '٠',   l: 'اختراق مسجّل', c: '#F59E0B' },
              ].map((s, i) => (
                <Glass key={i} className="px-5 py-3 text-center" style={{ borderRadius: 16 }}>
                  <p className="text-[20px] font-black" style={{ color: s.c }}>{s.v}</p>
                  <p className="text-[10px] font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.l}</p>
                </Glass>
              ))}
            </div>
          </Reveal>
        </motion.div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <div className="w-6 h-10 rounded-full border flex items-start justify-center pt-2"
            style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <div className="w-1 h-2 rounded-full" style={{ background: '#00D4FF' }} />
          </div>
        </motion.div>
      </div>

      {/* ══ TICKER ══════════════════════════════════════════════ */}
      <Ticker />

      {/* ══ STATEMENT ═══════════════════════════════════════════ */}
      <div className="relative py-28 px-6 overflow-hidden">
        <Orb x="60%" y="50%" color="rgba(124,58,237,0.12)" size={800} />
        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(0,212,255,0.6)' }}>
              لماذا تلقا تك؟
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-black leading-[1.1] mb-10" style={{ fontSize: 'clamp(32px,6vw,72px)', color: 'rgba(255,255,255,0.92)' }}>
              نقدر نسوي<br />
              <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(135deg,#00D4FF,#7C3AED)' }}>
                أي شي تتخيله
              </span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '📱', title: 'تطبيق طبي بهويتك',   desc: 'تطبيقك اسمك وشعارك على AppStore وGoogle Play. مرضاك يحملونه وهم يفخرون بعيادتك.', color: '#00D4FF' },
              { icon: '🌐', title: 'موقع يفوز على جوجل', desc: 'موقع مُحسَّن لكلمات البحث الطبية — مرضى جدد يجدونك قبل أي منافس.', color: '#7C3AED' },
              { icon: '🛡️', title: 'أمان لا يُتجاوز',     desc: 'تشفير AES-256، HIPAA، ISO 27001 — نفس المعايير التي تستخدمها وزارات الدفاع.', color: '#10B981' },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <Glass className="p-7 h-full group hover:bg-white/[0.07] transition-all duration-300 cursor-default">
                  <span className="text-4xl mb-5 block">{c.icon}</span>
                  <p className="text-[17px] font-bold mb-3" style={{ color: 'rgba(255,255,255,0.9)' }}>{c.title}</p>
                  <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>{c.desc}</p>
                  <div className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg,${c.color},transparent)` }} />
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══ PRODUCTS ════════════════════════════════════════════ */}
      <div id="products" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.8) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-14">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(0,212,255,0.6)' }}>المنظومة الكاملة</p>
            <h2 className="font-black" style={{ fontSize: 'clamp(28px,5vw,56px)', color: 'rgba(255,255,255,0.92)' }}>
              ثلاثة منتجات — منظومة واحدة
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              {
                num: '01', icon: '📱', title: 'تطبيق المريض', sub: 'iOS + Android',
                grad: 'linear-gradient(160deg,rgba(0,212,255,0.15) 0%,transparent 60%)',
                glow: 'rgba(0,212,255,0.3)',
                accent: '#00D4FF',
                features: ['بطاقة مريض رقمية QR','حجز مواعيد ٢٤/٧','نتائج التحاليل فورياً','تذكيرات الأدوية الذكية','مزامنة Apple Health','Apple & Google Wallet','إدارة التابعين'],
              },
              {
                num: '02', icon: '🌐', title: 'الموقع الإلكتروني', sub: 'SEO · سريع · متجاوب',
                grad: 'linear-gradient(160deg,rgba(124,58,237,0.15) 0%,transparent 60%)',
                glow: 'rgba(124,58,237,0.3)',
                accent: '#7C3AED',
                features: ['صفحة كل طبيب','حجز عبر الموقع','خدمات وأسعار','مدونة طبية','تحسين جوجل ١٠٠٪','نموذج واتساب','شهادات المرضى'],
              },
              {
                num: '03', icon: '📊', title: 'نظام الإدارة', sub: 'المالك · الفريق · التقارير',
                grad: 'linear-gradient(160deg,rgba(16,185,129,0.15) 0%,transparent 60%)',
                glow: 'rgba(16,185,129,0.3)',
                accent: '#10B981',
                features: ['لوحة إيرادات يومية','طابور المرضى لحظياً','جداول الأطباء','تقارير شهرية','إدارة الفريق','فواتير التأمين','مركز أمان كامل'],
              },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-[32px] relative overflow-hidden h-full group hover:-translate-y-1 transition-all duration-300"
                  style={{ background: '#080F1A', border: `1px solid rgba(255,255,255,0.08)`, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: p.grad }} />
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-[0.08]" style={{ background: p.accent }} />
                  <div className="relative z-10 p-8">
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-4xl">{p.icon}</span>
                      <span className="font-black text-[32px] leading-none" style={{ color: 'rgba(255,255,255,0.06)' }}>{p.num}</span>
                    </div>
                    <p className="text-[22px] font-black mb-1" style={{ color: 'rgba(255,255,255,0.92)' }}>{p.title}</p>
                    <p className="text-[11px] font-semibold tracking-widest uppercase mb-6" style={{ color: p.accent }}>{p.sub}</p>
                    <div className="space-y-2.5">
                      {p.features.map(f => (
                        <div key={f} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.accent, boxShadow: `0 0 6px ${p.accent}` }} />
                          <p className="text-[12px] font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>{f}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 h-px w-full" style={{ background: `linear-gradient(90deg,${p.accent}30,transparent)` }} />
                    <div className="mt-5">
                      <div className="inline-flex items-center gap-2 text-[12px] font-bold" style={{ color: p.accent }}>
                        <span>مشمول في الباقة</span>
                        <span>✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══ STATS ════════════════════════════════════════════════ */}
      <div className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#040C16 0%,#060F1C 50%,#040C16 100%)' }} />
        <Orb x="30%" y="50%" color="rgba(0,212,255,0.08)" size={900} />
        <Orb x="80%" y="50%" color="rgba(124,58,237,0.08)" size={700} />
        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <h2 className="font-black" style={{ fontSize: 'clamp(26px,4vw,48px)', color: 'rgba(255,255,255,0.9)' }}>
              أرقام تتكلم بدلنا
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat target={50}  suffix="+"   label="عيادة ومركز طبي عميل"  color="#00D4FF" />
            <Stat target={60}  suffix=" يوم" label="متوسط وقت التسليم"     color="#7C3AED" />
            <Stat target={100} suffix="٪"    label="تشفير بيانات المرضى"   color="#10B981" />
            <Stat target={0}   suffix=""     label="اختراق أمني مسجّل"     color="#F59E0B" prefix="٠" />
          </div>
        </div>
      </div>

      {/* ══ SECURITY ════════════════════════════════════════════ */}
      <div id="security" className="relative py-24 px-6 overflow-hidden">
        {/* Matrix rain effect */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#040C16,#020A0F,#040C16)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(16,185,129,0.5) 28px,rgba(16,185,129,0.5) 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(16,185,129,0.5) 28px,rgba(16,185,129,0.5) 29px)' }} />
        <Orb x="50%" y="30%" color="rgba(16,185,129,0.12)" size={800} />

        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }} />
              <span className="text-[12px] font-bold tracking-widest" style={{ color: '#10B981' }}>SECURITY FIRST — دائماً</span>
            </div>
            <h2 className="font-black mb-4" style={{ fontSize: 'clamp(28px,5vw,60px)', color: 'rgba(255,255,255,0.92)' }}>
              الأكثر أماناً في<br />
              <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(135deg,#10B981,#00D4FF)' }}>
                القطاع الصحي
              </span>
            </h2>
            <p className="text-[15px] font-light max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.35)' }}>
              بيانات مرضاك أثمن ما تملك — نحن نبنيها على نفس معايير وزارات الدفاع
            </p>
          </Reveal>

          {/* Compliance badges */}
          <Reveal delay={0.06}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['HIPAA','ISO 27001','AES-256','NDMO','SOC 2','PDPL'].map(b => (
                <div key={b} className="flex items-center gap-2 px-4 py-2.5 rounded-[14px]"
                  style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', backdropFilter: 'blur(12px)' }}>
                  <span className="text-[#10B981] text-[12px] font-black">✓</span>
                  <span className="text-[12px] font-bold" style={{ color: '#10B981' }}>{b}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Security pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {[
              { icon: '🔐', title: 'تشفير AES-256 من الطرف للطرف', desc: 'نفس معيار التشفير المستخدم في وزارات الدفاع والأسرار الحكومية — لا أحد يقرأ بيانات مرضاك إلا المخوّلون.', glow: '#10B981' },
              { icon: '🧠', title: 'Zero-Knowledge Architecture',   desc: 'مفتاح التشفير ملكك وحدك. حتى فريق تلقا غير قادر تقنياً على رؤية بيانات مرضاك — بنية، لا وعود.', glow: '#00D4FF' },
              { icon: '🛡️', title: 'مصادقة ثلاثية الطبقات',         desc: 'Face ID + بصمة إصبع + رمز تحقق. لا وصول بدون إذنك — حتى لو سُرقت كلمة المرور.', glow: '#7C3AED' },
              { icon: '💾', title: 'نسخ احتياطي مشفر كل ٦ ساعات',  desc: 'مراكز بيانات موزعة جغرافياً، مشفرة كلها، محمية من الكوارث والحرائق وانقطاع الطاقة.', glow: '#F59E0B' },
              { icon: '👁️', title: 'AI يراقب ٢٤/٧',                  desc: 'نظام ذكاء اصطناعي يكتشف أي نشاط غير اعتيادي ويوقفه فورياً — قبل أن يصبح تهديداً.', glow: '#EF4444' },
              { icon: '📜', title: 'متوافق مع PDPL السعودي',         desc: 'مطابق بالكامل لنظام حماية البيانات الشخصية ولوائح هيئة الحكومة الرقمية — حماية قانونية شاملة.', glow: '#10B981' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="rounded-[22px] p-6 relative overflow-hidden group hover:-translate-y-0.5 transition-all duration-300 h-full"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)' }}>
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ background: s.glow }} />
                  <span className="text-3xl mb-4 block">{s.icon}</span>
                  <p className="text-[14px] font-bold mb-2 leading-snug" style={{ color: 'rgba(255,255,255,0.88)' }}>{s.title}</p>
                  <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.32)' }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Security score bar */}
          <Reveal delay={0.2}>
            <Glass className="p-7 flex flex-col sm:flex-row items-center gap-6" style={{ borderColor: 'rgba(16,185,129,0.2)' }}>
              <div className="text-5xl shrink-0">🔒</div>
              <div className="flex-1 text-center sm:text-right">
                <p className="text-[18px] font-black mb-1" style={{ color: '#10B981' }}>بياناتك ملكك وحدك — نحن لا نراها</p>
                <p className="text-[13px] font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>لم يُسجَّل أي اختراق منذ التأسيس. هذا ليس حظاً — هذا هندسة.</p>
              </div>
              <div className="flex gap-8 shrink-0">
                {[['٠','اختراقات'],['١٠٠٪','تشفير'],['٢٤/٧','مراقبة']].map(([v,l]) => (
                  <div key={l} className="text-center">
                    <p className="text-[28px] font-black leading-none" style={{ color: '#10B981' }}>{v}</p>
                    <p className="text-[10px] font-light mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>{l}</p>
                  </div>
                ))}
              </div>
            </Glass>
          </Reveal>
        </div>
      </div>

      {/* ══ FEATURES GRID ═══════════════════════════════════════ */}
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(124,58,237,0.7)' }}>كل ما تحتاجه</p>
            <h2 className="font-black" style={{ fontSize: 'clamp(26px,4vw,50px)', color: 'rgba(255,255,255,0.9)' }}>١٥+ ميزة جاهزة من اليوم الأول</h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              ['🪪','بطاقة مريض رقمية','QR فوري'],
              ['📅','حجز مواعيد','فوري ٢٤/٧'],
              ['🧪','نتائج التحاليل','مباشرة للهاتف'],
              ['💊','تذكيرات الأدوية','إشعارات ذكية'],
              ['❤️','Apple Health','مزامنة تلقائية'],
              ['⌚','Apple Watch','مؤشرات حيوية'],
              ['👨‍👩‍👧','التابعون','صحة العائلة'],
              ['🎫','Wallet','تذكرة رقمية'],
              ['📋','السجل الطبي','تاريخ موحد'],
              ['🩺','الأمراض المزمنة','سكر · ضغط'],
              ['📊','لوحة المالك','تقارير فورية'],
              ['🌐','موقع إلكتروني','جوجل ١٠٠٪'],
              ['💬','واتساب آلي','تأكيد + نتائج'],
              ['🔒','أمان HIPAA','تشفير كامل'],
              ['🔗','تكامل HIS/LIS','أنظمة موجودة'],
            ].map(([icon, title, sub], i) => (
              <Reveal key={i} delay={i * 0.025}>
                <Glass className="p-4 text-center group hover:bg-white/[0.07] transition-all duration-200 cursor-default h-full"
                  style={{ borderRadius: 20 }}>
                  <span className="text-2xl mb-2 block">{icon}</span>
                  <p className="text-[12px] font-bold mb-0.5" style={{ color: 'rgba(255,255,255,0.8)' }}>{title}</p>
                  <p className="text-[10px] font-light" style={{ color: 'rgba(255,255,255,0.25)' }}>{sub}</p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══ TESTIMONIALS ════════════════════════════════════════ */}
      <div className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(0,212,255,0.6)' }}>قالوا عنّا</p>
            <h2 className="font-black" style={{ fontSize: 'clamp(26px,4vw,50px)', color: 'rgba(255,255,255,0.9)' }}>عيادات تثق بتلقا</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'عيادة الشفاء',      city: 'الرياض', av: 'ع', c: '#00D4FF',
                quote: 'الحجوزات الإلكترونية قلّصت الانتظار ٦٠٪ في أول أسبوع. الفريق أكثر تنظيماً والمرضى أكثر سعادة.' },
              { name: 'مجمع النور الطبي',   city: 'جدة',    av: 'م', c: '#7C3AED',
                quote: 'مرضاي يطلبون تطبيقنا قبل ما يسألون عن الأطباء. صار عندنا هوية رقمية تنافس المستشفيات الكبرى.' },
              { name: 'مستشفى الرعاية',     city: 'أبها',   av: 'ر', c: '#10B981',
                quote: 'الأمان كان أولويتنا كمستشفى. قرأنا المواصفات التقنية وكانت أفضل بكثير مما توقعنا.' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <Glass className="p-6 h-full flex flex-col">
                  <p className="text-[14px] mb-1" style={{ color: '#F59E0B' }}>⭐⭐⭐⭐⭐</p>
                  <p className="text-[13px] font-light leading-relaxed flex-1 mb-5 italic" style={{ color: 'rgba(255,255,255,0.45)' }}>"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[14px] font-black shrink-0"
                      style={{ background: `linear-gradient(135deg,${t.c}40,${t.c}80)`, border: `1px solid ${t.c}40` }}>
                      {t.av}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold" style={{ color: 'rgba(255,255,255,0.8)' }}>{t.name}</p>
                      <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{t.city}</p>
                    </div>
                  </div>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══ PRICING ═════════════════════════════════════════════ */}
      <div id="pricing" className="relative py-24 px-6 overflow-hidden">
        <Orb x="50%" y="50%" color="rgba(0,212,255,0.1)" size={1000} />
        <div className="max-w-2xl mx-auto relative z-10">
          <Reveal>
            <div className="rounded-[36px] relative overflow-hidden text-center"
              style={{ background: 'linear-gradient(145deg,#080F1E,#0B1628)', border: '1px solid rgba(0,212,255,0.15)', boxShadow: '0 0 80px rgba(0,212,255,0.08), 0 40px 80px rgba(0,0,0,0.5)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(0,212,255,0.1) 0%,transparent 55%)' }} />
              <div className="relative z-10 p-10 md:p-14">
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(0,212,255,0.6)' }}>سعر إطلاق</p>
                <p className="font-black leading-none mb-2" style={{ fontSize: 'clamp(52px,10vw,88px)', color: '#fff' }}>25,000</p>
                <p className="text-[20px] font-light mb-1.5" style={{ color: '#00D4FF' }}>ريال سعودي</p>
                <p className="text-[13px] font-light mb-10" style={{ color: 'rgba(255,255,255,0.2)' }}>تطبيق iOS + Android · موقع · نظام إدارة · أمان كامل</p>

                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-10">
                  {['تسليم ٦٠ يوم','نشر المتجرين','سنة دعم مجاني','تدريب الفريق','تكامل HIS','هوية عيادتك'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-[12px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#00D4FF', boxShadow: '0 0 6px #00D4FF' }} />
                      {item}
                    </div>
                  ))}
                </div>

                <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-black text-[16px] px-10 py-5 rounded-[20px] transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{ background: 'linear-gradient(135deg,#00D4FF,#0096B4)', color: '#020C16', boxShadow: '0 0 50px rgba(0,212,255,0.4), 0 10px 40px rgba(0,0,0,0.3)' }}>
                  ابدأ مشروعك مع تلقا 🚀
                </a>
                <p className="text-[11px] mt-4 font-light" style={{ color: 'rgba(255,255,255,0.15)' }}>استشارة مجانية عبر واتساب</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ══ DEV SECTION ═════════════════════════════════════════ */}
      <div className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="rounded-[28px] overflow-hidden" style={{ background: '#050E1A', border: '1px solid rgba(0,212,255,0.1)' }}>
              <div className="px-8 py-6 border-b flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <div className="flex gap-1.5">
                  {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
                </div>
                <span className="text-[11px] font-mono ml-auto" style={{ color: 'rgba(255,255,255,0.2)' }}>للمطورين والشركاء التقنيين — بنية من أعلى مستوى</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 border-b lg:border-b-0 lg:border-l" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <p className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: 'rgba(0,212,255,0.5)' }}>REST API + Webhooks</p>
                  <div className="space-y-2 font-mono text-[11px]">
                    {[['GET','#10B981','/v1/patients/:id'],['POST','#00D4FF','/v1/appointments'],['PATCH','#F59E0B','/v1/prescriptions/:id'],['WSS','#7C3AED','/v1/realtime']].map(([m,c,p]) => (
                      <div key={p} className="flex items-center gap-3 px-3 py-2 rounded-[10px]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <span className="font-bold w-10 shrink-0" style={{ color: c }}>{m}</span>
                        <span style={{ color: 'rgba(255,255,255,0.35)' }}>{p}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {['FHIR R4','HL7','DICOM','SNOMED CT'].map(b => (
                      <span key={b} className="text-[10px] font-bold px-2.5 py-1 rounded-full font-mono" style={{ background: 'rgba(0,212,255,0.07)', color: 'rgba(0,212,255,0.5)', border: '1px solid rgba(0,212,255,0.1)' }}>{b}</span>
                    ))}
                  </div>
                </div>
                <div className="p-8 font-mono text-[11px] leading-relaxed" dir="ltr">
                  <p><span style={{ color: '#7C3AED' }}>import</span> <span style={{ color: '#F59E0B' }}>{'{ TelqaClient }'}</span> <span style={{ color: '#7C3AED' }}>from</span> <span style={{ color: '#10B981' }}>'@telqa/sdk'</span>;</p>
                  <p className="mt-3"><span style={{ color: '#7C3AED' }}>const</span> <span style={{ color: '#00D4FF' }}>client</span> = <span style={{ color: '#7C3AED' }}>new</span> <span style={{ color: '#F59E0B' }}>TelqaClient</span>({'{'}</p>
                  <p className="ml-4"><span style={{ color: 'rgba(255,255,255,0.4)' }}>apiKey</span>: env.<span style={{ color: '#00D4FF' }}>TELQA_KEY</span>,</p>
                  <p className="ml-4"><span style={{ color: 'rgba(255,255,255,0.4)' }}>encryption</span>: <span style={{ color: '#10B981' }}>'AES-256'</span>,</p>
                  <p>{'}'});</p>
                  <p className="mt-3" style={{ color: 'rgba(255,255,255,0.2)' }}>// حجز موعد — مشفر بالكامل</p>
                  <p><span style={{ color: '#7C3AED' }}>const</span> appt = <span style={{ color: '#7C3AED' }}>await</span> client</p>
                  <p className="ml-4">.<span style={{ color: '#00D4FF' }}>appointments</span>.<span style={{ color: '#00D4FF' }}>create</span>({'{'}</p>
                  <p className="ml-8">patientId, doctorId, slot</p>
                  <p className="ml-4">{'}'});</p>
                  <p className="mt-3" style={{ color: '#10B981' }}>// → status: "confirmed" ✓</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ══ FINAL CTA ═══════════════════════════════════════════ */}
      <div className="relative py-32 px-6 overflow-hidden text-center">
        <Orb x="50%" y="50%" color="rgba(124,58,237,0.2)" size={1000} />
        <Orb x="20%" y="40%" color="rgba(0,212,255,0.12)" size={600} />
        <div className="max-w-3xl mx-auto relative z-10">
          <Reveal>
            <h2 className="font-black leading-[1.05] mb-6" style={{ fontSize: 'clamp(36px,7vw,80px)', color: 'rgba(255,255,255,0.95)' }}>
              جاهز تحوّل<br />
              <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(135deg,#00D4FF,#7C3AED,#10B981)' }}>
                عيادتك؟
              </span>
            </h2>
            <p className="text-[17px] font-light mb-10" style={{ color: 'rgba(255,255,255,0.3)' }}>
              استشارة مجانية — بدون التزام — خلال ٢٤ ساعة
            </p>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-black text-[18px] px-12 py-5 rounded-[22px] transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#00D4FF,#7C3AED)', color: '#fff', boxShadow: '0 0 80px rgba(0,212,255,0.3), 0 0 80px rgba(124,58,237,0.2), 0 20px 60px rgba(0,0,0,0.4)' }}>
              ابدأ الآن عبر واتساب 🚀
            </a>
          </Reveal>
        </div>
      </div>

      {/* ══ FOOTER ══════════════════════════════════════════════ */}
      <div className="py-8 px-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[8px] flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#00D4FF,#7C3AED)' }}>
              <span className="text-white text-[11px] font-black">ت</span>
            </div>
            <span className="font-black text-[14px]" style={{ color: 'rgba(255,255,255,0.7)' }}>تلقا تك</span>
          </div>
          <p className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.2)' }}>
            وكالة تصميم منظومات رقمية للقطاع الطبي · جميع الحقوق محفوظة ٢٠٢٥
          </p>
          <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
            className="text-[12px] font-semibold px-4 py-2 rounded-full transition-colors hover:bg-white/5"
            style={{ color: '#00D4FF', border: '1px solid rgba(0,212,255,0.2)' }}>
            واتساب ←
          </a>
        </div>
      </div>

    </div>
  );
}
