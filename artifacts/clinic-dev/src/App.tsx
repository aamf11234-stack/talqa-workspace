import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── helpers ───────────────────────────────────────────────── */
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
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Ticker ─────────────────────────────────────────────────── */
const ITEMS = ['موقع احترافي','تطبيق iOS','تطبيق Android','HIPAA','نظام إدارة','Apple Health','واتساب آلي','ISO 27001','سجل طبي رقمي','٦٠ يوم تسليم','أمان AES-256'];
function Ticker() {
  const all = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden py-4" style={{ borderTop:'1px solid #1C1C1C', borderBottom:'1px solid #1C1C1C' }}>
      <motion.div className="flex gap-12 w-max"
        animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, ease: 'linear', repeat: Infinity }}>
        {all.map((item, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="text-[13px] font-medium whitespace-nowrap" style={{ color: '#555' }}>{item}</span>
            <span className="w-1 h-1 rounded-full shrink-0" style={{ background: '#333' }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Stat ───────────────────────────────────────────────────── */
function Stat({ target, suffix, label, prefix = '' }: { target: number; suffix: string; label: string; prefix?: string }) {
  const { v, ref } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <p className="font-black leading-none mb-2" style={{ fontSize: 'clamp(40px,5vw,68px)', color: '#fff' }}>
        {prefix}{v.toLocaleString('ar-SA')}{suffix}
      </p>
      <p className="text-[13px] font-light" style={{ color: '#555' }}>{label}</p>
    </div>
  );
}

/* ─── main ───────────────────────────────────────────────────── */
export default function App() {
  useEffect(() => {
    document.documentElement.dir  = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.style.background = '#0A0A0A';
    document.body.style.fontFamily = "'Tajawal',sans-serif";
    document.body.style.margin     = '0';
  }, []);

  return (
    <div dir="rtl" style={{ background: '#0A0A0A', color: '#fff', fontFamily: "'Tajawal',sans-serif", overflowX: 'hidden' }}>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav style={{ borderBottom: '1px solid #1C1C1C' }} className="sticky top-0 z-50 px-8 py-4 flex items-center justify-between" style2={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div style={{ position:'sticky', top:0, zIndex:50, background:'rgba(10,10,10,0.95)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderBottom:'1px solid #1C1C1C' }} />
        <span className="text-[18px] font-black tracking-tight" style={{ color: '#fff' }}>تلقا<span style={{ color: '#444' }}> للعيادات</span></span>
        <div className="hidden md:flex items-center gap-8">
          {['خدماتنا','الأمان','الأسعار','الديمو'].map(l => (
            <a key={l} href={`#${l === 'الديمو' ? '/clinic-demo/' : l}`}
              className="text-[13px] font-medium transition-colors hover:text-white" style={{ color: '#555' }}>{l}</a>
          ))}
        </div>
        <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
          className="text-[13px] font-bold px-5 py-2.5 rounded-[10px] transition-all hover:bg-white hover:text-black"
          style={{ border: '1px solid #333', color: '#fff' }}>
          تواصل
        </a>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
        {/* subtle grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1A1A1A 1px,transparent 1px),linear-gradient(90deg,#1A1A1A 1px,transparent 1px)', backgroundSize: '80px 80px', opacity: 0.35 }} />
        {/* center glow */}
        <div className="absolute pointer-events-none" style={{ top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:600, background:'radial-gradient(circle,rgba(255,255,255,0.04) 0%,transparent 70%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[12px] font-semibold"
              style={{ border:'1px solid #2A2A2A', color:'#888' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              +٥٠ عيادة ومركز طبي
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="font-black leading-[1.05] tracking-tight mb-8" style={{ fontSize:'clamp(48px,9vw,110px)', color:'#fff' }}>
              موقعك وتطبيقك<br />
              <span style={{ color:'#444' }}>في ٦٠ يوم.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-[18px] font-light max-w-xl mx-auto mb-12 leading-relaxed" style={{ color:'#555' }}>
              تطبيق للمرضى · موقع احترافي · نظام إدارة · أمان عسكري المستوى — كل شيء بهوية عيادتك.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
                className="font-bold text-[15px] px-8 py-4 rounded-[14px] transition-all hover:bg-gray-100 active:scale-95"
                style={{ background:'#fff', color:'#0A0A0A' }}>
                ابدأ مشروع عيادتك
              </a>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                className="font-medium text-[14px] px-7 py-4 rounded-[14px] transition-all hover:border-white/40 hover:text-white"
                style={{ border:'1px solid #2A2A2A', color:'#888' }}>
                شاهد الديمو ←
              </a>
            </div>
          </Reveal>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity }}>
            <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5" style={{ borderColor:'#2A2A2A' }}>
              <div className="w-0.5 h-2 rounded-full bg-white/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────────────────── */}
      <Ticker />

      {/* ── STATEMENT ───────────────────────────────────────── */}
      <section className="py-32 px-8 max-w-6xl mx-auto">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-8" style={{ color:'#444' }}>لماذا تلقا؟</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-black leading-[1.08] mb-16" style={{ fontSize:'clamp(32px,6vw,76px)', color:'#fff' }}>
            نقدر نسوي أي شي<br />
            <span style={{ color:'#3A3A3A' }}>تتخيله لعيادتك.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background:'#1C1C1C' }}>
          {[
            { num:'01', title:'تطبيق بهويتك', desc:'اسمك وشعارك على AppStore وGoogle Play. مرضاك يحملونه ويفخرون بعيادتك.' },
            { num:'02', title:'موقع يفوز على جوجل', desc:'محسّن لكلمات البحث الطبية — مرضى جدد يجدونك قبل أي منافس في مدينتك.' },
            { num:'03', title:'أمان لا يُتجاوز', desc:'AES-256 · HIPAA · ISO 27001 — نفس المعايير التي تستخدمها وزارات الدفاع لحماية بيانات مرضاك.' },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="p-8 group cursor-default transition-colors duration-200" style={{ background:'#0A0A0A' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#111')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0A0A0A')}>
                <span className="text-[11px] font-bold tracking-widest mb-6 block" style={{ color:'#333' }}>{c.num}</span>
                <p className="text-[20px] font-black mb-3" style={{ color:'#fff' }}>{c.title}</p>
                <p className="text-[13px] font-light leading-relaxed" style={{ color:'#555' }}>{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ────────────────────────────────────────── */}
      <section id="products" className="py-24 px-8 max-w-6xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color:'#444' }}>المنظومة الكاملة</p>
          <h2 className="font-black" style={{ fontSize:'clamp(28px,5vw,60px)', color:'#fff' }}>ثلاثة منتجات. منظومة واحدة.</h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { num:'01', title:'تطبيق المريض', sub:'iOS + Android',
              features:['بطاقة مريض رقمية QR','حجز مواعيد ٢٤/٧','نتائج التحاليل فورياً','تذكيرات الأدوية الذكية','مزامنة Apple Health','Apple & Google Wallet','إدارة التابعين'] },
            { num:'02', title:'الموقع الإلكتروني', sub:'SEO · سريع · متجاوب',
              features:['صفحة كل طبيب','حجز عبر الموقع','خدمات وأسعار','مدونة طبية','تحسين جوجل ١٠٠٪','نموذج واتساب','شهادات المرضى'] },
            { num:'03', title:'نظام الإدارة', sub:'المالك · الفريق · التقارير',
              features:['لوحة إيرادات يومية','طابور المرضى لحظياً','جداول الأطباء','تقارير شهرية','إدارة الفريق','فواتير التأمين','مركز أمان كامل'] },
          ].map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="p-8 rounded-[20px] h-full flex flex-col"
                style={{ background:'#111', border:'1px solid #1C1C1C' }}>
                <div className="flex items-start justify-between mb-8">
                  <p className="text-[13px] font-bold" style={{ color:'#333' }}>{p.num}</p>
                </div>
                <p className="text-[22px] font-black mb-1" style={{ color:'#fff' }}>{p.title}</p>
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-8" style={{ color:'#444' }}>{p.sub}</p>
                <div className="flex-1 space-y-3">
                  {p.features.map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full shrink-0 bg-white/25" />
                      <p className="text-[13px] font-light" style={{ color:'#666' }}>{f}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6" style={{ borderTop:'1px solid #1C1C1C' }}>
                  <p className="text-[12px] font-semibold" style={{ color:'#444' }}>مشمول في الباقة ✓</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <Reveal className="mb-12">
          <h2 className="font-black" style={{ fontSize:'clamp(26px,4vw,52px)', color:'#fff' }}>١٥+ ميزة من اليوم الأول.</h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px" style={{ background:'#1C1C1C' }}>
          {[
            ['🪪','بطاقة رقمية','QR فوري'],['📅','حجز مواعيد','فوري ٢٤/٧'],['🧪','نتائج','مباشرة للهاتف'],
            ['💊','تذكير أدوية','إشعارات ذكية'],['❤️','Apple Health','مزامنة تلقائية'],
            ['⌚','Apple Watch','مؤشرات حيوية'],['👨‍👩‍👧','التابعون','صحة العائلة'],
            ['🎫','Wallet','تذكرة رقمية'],['📋','السجل الطبي','تاريخ موحد'],
            ['🩺','أمراض مزمنة','سكر · ضغط'],['📊','لوحة المالك','تقارير فورية'],
            ['🌐','موقع','جوجل ١٠٠٪'],['💬','واتساب','آلي ومنتظم'],
            ['🔒','أمان HIPAA','تشفير كامل'],['🔗','تكامل HIS','أنظمة موجودة'],
          ].map(([icon, title, sub], i) => (
            <Reveal key={i} delay={i * 0.02}>
              <div className="p-5 text-center cursor-default transition-colors duration-150"
                style={{ background:'#0A0A0A' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#111')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0A0A0A')}>
                <span className="text-2xl mb-3 block">{icon}</span>
                <p className="text-[12px] font-bold mb-0.5" style={{ color:'#fff' }}>{title}</p>
                <p className="text-[10px] font-light" style={{ color:'#444' }}>{sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────── */}
      <section className="py-24 px-8" style={{ borderTop:'1px solid #1C1C1C', borderBottom:'1px solid #1C1C1C' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <Stat target={50}  suffix="+"    label="عيادة عميلة" />
          <Stat target={60}  suffix=" يوم" label="متوسط التسليم" />
          <Stat target={100} suffix="٪"    label="تشفير البيانات" />
          <Stat target={0}   suffix=""     label="اختراق مسجّل" prefix="٠" />
        </div>
      </section>

      {/* ── SECURITY ────────────────────────────────────────── */}
      <section id="security" className="py-32 px-8 max-w-6xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color:'#444' }}>الأمان</p>
          <h2 className="font-black leading-tight mb-4" style={{ fontSize:'clamp(28px,5vw,64px)', color:'#fff' }}>
            الأكثر أماناً<br />في القطاع الصحي.
          </h2>
          <p className="text-[15px] font-light max-w-lg" style={{ color:'#555' }}>
            بيانات مرضاك تُعامَل بنفس مستوى حماية الأسرار الحكومية — بنية تقنية، ليست وعوداً.
          </p>
        </Reveal>

        {/* badges */}
        <Reveal delay={0.05}>
          <div className="flex flex-wrap gap-3 mb-14">
            {['HIPAA','ISO 27001','AES-256','NDMO','SOC 2','PDPL'].map(b => (
              <div key={b} className="px-4 py-2 rounded-full text-[12px] font-bold"
                style={{ border:'1px solid #2A2A2A', color:'#888' }}>✓ {b}</div>
            ))}
          </div>
        </Reveal>

        {/* pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background:'#1C1C1C' }}>
          {[
            { icon:'🔐', title:'تشفير AES-256 كامل',         desc:'نفس معيار التشفير المستخدم في وزارات الدفاع. لا أحد يقرأ بيانات مرضاك إلا المخوّلون.' },
            { icon:'🧠', title:'Zero-Knowledge Architecture', desc:'مفتاح التشفير ملكك. حتى فريق تلقا غير قادر تقنياً على رؤية بيانات مرضاك.' },
            { icon:'🛡️', title:'مصادقة ثلاثية الطبقات',       desc:'Face ID + بصمة + رمز تحقق. لا وصول بدون إذنك حتى لو سُرقت كلمة المرور.' },
            { icon:'💾', title:'نسخ احتياطي كل ٦ ساعات',     desc:'مراكز بيانات موزعة، مشفرة كلها، محمية من الكوارث وانقطاع الطاقة.' },
            { icon:'👁️', title:'مراقبة بالذكاء الاصطناعي',    desc:'يكتشف أي نشاط غير اعتيادي ويوقفه فورياً — قبل أن يصبح تهديداً.' },
            { icon:'📜', title:'متوافق مع PDPL السعودي',       desc:'مطابق لنظام حماية البيانات الشخصية ولوائح هيئة الحكومة الرقمية.' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="p-7 cursor-default transition-colors duration-150" style={{ background:'#0A0A0A' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#111')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0A0A0A')}>
                <span className="text-2xl mb-4 block">{s.icon}</span>
                <p className="text-[15px] font-bold mb-2" style={{ color:'#fff' }}>{s.title}</p>
                <p className="text-[12px] font-light leading-relaxed" style={{ color:'#555' }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-4 p-7 flex flex-col sm:flex-row items-center gap-6"
            style={{ background:'#111', border:'1px solid #1C1C1C' }}>
            <div className="text-4xl">🔒</div>
            <div className="flex-1 text-center sm:text-right">
              <p className="text-[17px] font-black mb-1 text-white">بياناتك ملكك — نحن لا نراها.</p>
              <p className="text-[13px] font-light" style={{ color:'#555' }}>لم يُسجَّل أي اختراق منذ التأسيس. ليس حظاً — هندسة.</p>
            </div>
            <div className="flex gap-8 shrink-0">
              {[['٠','اختراقات'],['١٠٠٪','تشفير'],['٢٤/٧','مراقبة']].map(([v,l]) => (
                <div key={l} className="text-center">
                  <p className="text-[24px] font-black text-white leading-none">{v}</p>
                  <p className="text-[10px] mt-1" style={{ color:'#444' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────── */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <Reveal className="mb-12">
          <h2 className="font-black" style={{ fontSize:'clamp(26px,4vw,52px)', color:'#fff' }}>قالوا عنّا.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name:'عيادة الشفاء',      city:'الرياض', av:'ع',
              quote:'الحجوزات الإلكترونية قلّصت الانتظار ٦٠٪ في أول أسبوع. المرضى سعداء والفريق أكثر تنظيماً.' },
            { name:'مجمع النور الطبي',   city:'جدة',    av:'م',
              quote:'مرضاي يطلبون تطبيقنا قبل ما يسألون عن الأطباء. صرنا بمستوى المستشفيات الكبيرة.' },
            { name:'مستشفى الرعاية',     city:'أبها',   av:'ر',
              quote:'الأمان كان أولويتنا كمستشفى. المواصفات التقنية فاقت توقعاتنا بكثير.' },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="p-7 rounded-[18px] h-full flex flex-col" style={{ background:'#111', border:'1px solid #1C1C1C' }}>
                <p className="text-[14px] mb-4" style={{ color:'#666' }}>★★★★★</p>
                <p className="text-[14px] font-light leading-relaxed flex-1 mb-6 italic" style={{ color:'#888' }}>"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop:'1px solid #1C1C1C' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-black bg-white text-black shrink-0">{t.av}</div>
                  <div>
                    <p className="text-[13px] font-bold text-white">{t.name}</p>
                    <p className="text-[11px]" style={{ color:'#444' }}>{t.city}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-8 max-w-2xl mx-auto text-center">
        <Reveal>
          <div className="p-12 rounded-[24px]" style={{ background:'#111', border:'1px solid #1C1C1C' }}>
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-6" style={{ color:'#444' }}>سعر الإطلاق</p>
            <p className="font-black leading-none mb-2" style={{ fontSize:'clamp(56px,10vw,96px)', color:'#fff' }}>25,000</p>
            <p className="text-[18px] font-light mb-1" style={{ color:'#888' }}>ريال سعودي</p>
            <p className="text-[12px] font-light mb-10" style={{ color:'#444' }}>تطبيق iOS + Android · موقع · نظام إدارة · أمان كامل</p>
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-10">
              {['تسليم ٦٠ يوم','نشر المتجرين','سنة دعم','تدريب الفريق','تكامل HIS','هوية عيادتك'].map(item => (
                <div key={item} className="flex items-center gap-2 text-[12px]" style={{ color:'#555' }}>
                  <span style={{ color:'#888' }}>✓</span> {item}
                </div>
              ))}
            </div>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              className="inline-block font-black text-[15px] px-10 py-4 rounded-[14px] transition-all hover:bg-gray-100 active:scale-95"
              style={{ background:'#fff', color:'#0A0A0A' }}>
              ابدأ مشروعك مع تلقا
            </a>
            <p className="text-[11px] mt-4" style={{ color:'#333' }}>استشارة مجانية عبر واتساب</p>
          </div>
        </Reveal>
      </section>

      {/* ── DEV SECTION ─────────────────────────────────────── */}
      <section className="py-16 px-8 max-w-5xl mx-auto">
        <Reveal>
          <div className="rounded-[20px] overflow-hidden" style={{ background:'#0D0D0D', border:'1px solid #1C1C1C' }}>
            <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom:'1px solid #1C1C1C' }}>
              <div className="flex gap-1.5">
                {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background:c }} />)}
              </div>
              <span className="text-[11px] font-mono mr-auto" style={{ color:'#333' }}>للمطورين — بنية تقنية من أعلى مستوى</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-7" style={{ borderLeft:'1px solid #1C1C1C' }}>
                <p className="text-[11px] font-bold tracking-widest uppercase mb-5" style={{ color:'#444' }}>REST API + Webhooks</p>
                <div className="space-y-2 font-mono text-[11px] mb-6">
                  {[['GET','#4ADE80','/v1/patients/:id'],['POST','#60A5FA','/v1/appointments'],['PATCH','#FBBF24','/v1/prescriptions/:id'],['WSS','#A78BFA','/v1/realtime']].map(([m,c,p]) => (
                    <div key={p} className="flex items-center gap-3 px-3 py-2 rounded-[8px]" style={{ background:'#0A0A0A' }}>
                      <span className="font-bold w-10 shrink-0" style={{ color:c }}>{m}</span>
                      <span style={{ color:'#444' }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['FHIR R4','HL7','DICOM'].map(b => (
                    <span key={b} className="text-[10px] font-bold px-2.5 py-1 rounded font-mono" style={{ background:'#111', color:'#444', border:'1px solid #222' }}>{b}</span>
                  ))}
                </div>
              </div>
              <div className="p-7 font-mono text-[11px] leading-loose" dir="ltr">
                <p><span style={{color:'#A78BFA'}}>import</span> <span style={{color:'#FBBF24'}}>{'{ TelqaClient }'}</span> <span style={{color:'#A78BFA'}}>from</span> <span style={{color:'#4ADE80'}}>'@telqa/sdk'</span>;</p>
                <br />
                <p><span style={{color:'#A78BFA'}}>const</span> <span style={{color:'#60A5FA'}}>client</span> = <span style={{color:'#A78BFA'}}>new</span> <span style={{color:'#FBBF24'}}>TelqaClient</span>({'{'}</p>
                <p className="ml-4"><span style={{color:'#666'}}>encryption</span>: <span style={{color:'#4ADE80'}}>'AES-256'</span>,</p>
                <p>{'}'});</p>
                <br />
                <p style={{color:'#333'}}>{'// حجز موعد مشفر'}</p>
                <p><span style={{color:'#A78BFA'}}>const</span> appt = <span style={{color:'#A78BFA'}}>await</span> client</p>
                <p className="ml-4">.<span style={{color:'#60A5FA'}}>appointments</span>.<span style={{color:'#60A5FA'}}>create</span>({'(...)'})</p>
                <br />
                <p style={{color:'#4ADE80'}}>{'// → "status": "confirmed" ✓'}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <section className="py-40 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'linear-gradient(#1A1A1A 1px,transparent 1px),linear-gradient(90deg,#1A1A1A 1px,transparent 1px)', backgroundSize:'80px 80px', opacity:0.3 }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-black leading-[1.05] mb-6" style={{ fontSize:'clamp(40px,8vw,96px)', color:'#fff' }}>
              جاهز تبدأ؟
            </h2>
            <p className="text-[17px] font-light mb-12" style={{ color:'#444' }}>استشارة مجانية — بدون التزام — خلال ٢٤ ساعة.</p>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              className="inline-block font-black text-[16px] px-12 py-5 rounded-[16px] transition-all hover:bg-gray-100 active:scale-95"
              style={{ background:'#fff', color:'#0A0A0A' }}>
              تواصل معنا عبر واتساب
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <div className="py-8 px-8" style={{ borderTop:'1px solid #1C1C1C' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-black text-[15px]" style={{ color:'#fff' }}>تلقا تك</span>
          <p className="text-[11px] font-light" style={{ color:'#333' }}>وكالة تصميم منظومات رقمية للقطاع الطبي · ٢٠٢٥</p>
          <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
            className="text-[12px] font-medium px-4 py-2 rounded-full transition-colors hover:border-white/20"
            style={{ border:'1px solid #222', color:'#555' }}>واتساب ←</a>
        </div>
      </div>

    </div>
  );
}
