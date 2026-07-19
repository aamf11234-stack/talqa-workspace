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
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Ticker ──────────────────────────────────────────────── */
const TICKER_ITEMS = ['موقع احترافي','تطبيق iOS','تطبيق Android','HIPAA','نظام إدارة','Apple Health','واتساب آلي','ISO 27001','سجل رقمي','٦٠ يوم تسليم','AES-256','Google Wallet','HL7 FHIR'];
function Ticker() {
  const all = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden py-4 border-y border-neutral-100">
      <motion.div className="flex gap-10 w-max"
        animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, ease: 'linear', repeat: Infinity }}>
        {all.map((item, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="text-[12px] font-semibold whitespace-nowrap text-neutral-400">{item}</span>
            <span className="w-1 h-1 rounded-full shrink-0 bg-sky-300" />
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

/* ─── Industry data ───────────────────────────────────────── */
type Industry = {
  id: string;
  icon: string;
  label: string;
  color: string;
  bg: string;
  border: string;
  headline: string;
  sub: string;
  problems: string[];
  solutions: { icon: string; title: string; desc: string }[];
  features: string[];
  price: string;
  demo?: string;
};

const INDUSTRIES: Industry[] = [
  {
    id: 'clinic',
    icon: '🏥',
    label: 'عيادة طبية',
    color: '#0EA5E9',
    bg: '#F0F9FF',
    border: '#BAE6FD',
    headline: 'عيادتك في جيب كل مريض',
    sub: 'تطبيق بهويتك + موقع + نظام إدارة + أمان HIPAA — من اليوم الأول.',
    problems: [
      'المرضى ينسون المواعيد ويتصلون على العيادة كل مرة',
      'نتائج التحاليل ترسل على واتساب بدون سرية',
      'لا يوجد سجل طبي موحد للمريض',
      'الحجوزات عن طريق أحد الموظفين فقط',
    ],
    solutions: [
      { icon: '📅', title: 'حجز ذكي ٢٤/٧', desc: 'المريض يحجز ويعدّل ويلغي وحده — بدون مكالمات.' },
      { icon: '🔒', title: 'نتائج مشفرة', desc: 'التحاليل والتقارير ترسل مباشرة للتطبيق بتشفير كامل.' },
      { icon: '📋', title: 'سجل طبي موحد', desc: 'كل زيارة ووصفة ونتيجة في مكان واحد آمن.' },
      { icon: '💊', title: 'تذكير الأدوية', desc: 'إشعارات ذكية تضمن التزام المريض بالعلاج.' },
    ],
    features: ['بطاقة مريض QR','Apple Health','Google Wallet','إدارة التابعين','Apple Watch','تكامل HIS','داشبورد المالك','واتساب آلي'],
    price: '25,000',
    demo: '/clinic-demo/',
  },
  {
    id: 'salon',
    icon: '💇',
    label: 'صالون',
    color: '#EC4899',
    bg: '#FDF2F8',
    border: '#FBCFE8',
    headline: 'صالونك الأجمل — رقمياً',
    sub: 'تطبيق حجوزات + برنامج ولاء + موقع يجذب عملاء جدد كل يوم.',
    problems: [
      'الحجوزات عشوائية والتداخل يسبب ضغطاً على الموظفين',
      'العميلة المميزة لا تعرف عروضك الجديدة إلا بالصدفة',
      'لا يوجد برنامج ولاء يجعل العميلة ترجع',
      'المنافسون على جوجل أفضل منك رغم خدمتك أحسن',
    ],
    solutions: [
      { icon: '📅', title: 'حجوزات منظمة', desc: 'كل حلاقة في وقتها — لا تداخل ولا فوضى.' },
      { icon: '⭐', title: 'برنامج ولاء', desc: 'نقاط وجوائز تجعل العميلة تفضّل صالونك دائماً.' },
      { icon: '📢', title: 'عروض تلقائية', desc: 'أرسل العروض للعميلات المناسبة في الوقت المناسب.' },
      { icon: '🌐', title: 'موقع + جوجل', desc: 'صفحة احترافية تظهر في بحث جوجل عند كل عميلة جديدة.' },
    ],
    features: ['حجز أونلاين','برنامج نقاط','إشعارات عروض','صفحة الفريق','معرض أعمال','تقييمات Google','داشبورد المالك','تقارير إيرادات'],
    price: '18,000',
  },
  {
    id: 'restaurant',
    icon: '🍽️',
    label: 'مطعم',
    color: '#F59E0B',
    bg: '#FFFBEB',
    border: '#FDE68A',
    headline: 'مطعمك في كل هاتف',
    sub: 'تطبيق طلبات + قائمة رقمية + برنامج ولاء + متابعة الطلبات لحظة بلحظة.',
    problems: [
      'الطلبات عبر الهاتف تسبب أخطاء وإهدار وقت',
      'العميل يطلب من منصات خارجية تأخذ عمولة ٣٠٪',
      'لا توجد بيانات عن أكثر الأصناف طلباً',
      'العميل الدائم لا يحس بأي تقدير خاص',
    ],
    solutions: [
      { icon: '📱', title: 'تطبيق طلباتك', desc: 'طلبات مباشرة بدون عمولة لأحد — الربح لك كاملاً.' },
      { icon: '📊', title: 'تحليلات المبيعات', desc: 'اعرف أكثر الأوقات ازدحاماً وأكثر الأصناف مبيعاً.' },
      { icon: '⭐', title: 'ولاء العملاء', desc: 'نقاط وعروض حصرية للعملاء الدائمين.' },
      { icon: '🔔', title: 'تتبع الطلب', desc: 'العميل يتابع طلبه من المطبخ للطاولة على هاتفه.' },
    ],
    features: ['قائمة رقمية','طلب من الطاولة','طلب توصيل','برنامج نقاط','عروض محددة الوقت','تقارير مبيعات','إدارة المطبخ','تكامل الكاشير'],
    price: '20,000',
  },
  {
    id: 'cafe',
    icon: '☕',
    label: 'كافيه',
    color: '#92400E',
    bg: '#FFFBF7',
    border: '#DEB887',
    headline: 'كافيهك — تجربة لا تُنسى',
    sub: 'تطبيق طلبات قبل الوصول + بطاقة مشتريات + موقع يحكي قصة كافيهك.',
    problems: [
      'طابور الطلبات يزعج الزبائن في أوقات الذروة',
      'الزبون الدائم لا يحس بأي امتياز خاص',
      'لا يوجد موقع يعبّر عن جو الكافيه لجذب زبائن جدد',
      'العروض اليومية لا تصل للزبائن إلا إذا كانوا موجودين',
    ],
    solutions: [
      { icon: '⏱️', title: 'طلب مسبق', desc: 'الزبون يطلب قبل وصوله — قهوته جاهزة باستقباله.' },
      { icon: '☕', title: 'بطاقة المشتريات', desc: 'اشترِ ٩ احصل على ١٠ مجاناً — رقمياً بدون بطاقة ورقية.' },
      { icon: '📸', title: 'موقع يحكي القصة', desc: 'صفحة تعكس جو الكافيه وتجذب زوار جدد من جوجل.' },
      { icon: '📢', title: 'عروض لحظية', desc: 'أرسل عرض اليوم لكل الزبائن بضغطة واحدة.' },
    ],
    features: ['طلب مسبق','بطاقة قهوة رقمية','قائمة موسمية','عروض لحظية','موقع الكافيه','تقييمات Google','داشبورد الإيرادات','تحليل الأوقات'],
    price: '15,000',
  },
  {
    id: 'law',
    icon: '⚖️',
    label: 'شركة محاماة',
    color: '#1E3A5F',
    bg: '#F0F4F8',
    border: '#CBD5E1',
    headline: 'مكتبك القانوني — مؤسسة رقمية',
    sub: 'موقع احترافي يبني الثقة + بوابة عملاء آمنة + إدارة القضايا بسرية تامة.',
    problems: [
      'العميل الجديد لا يجد معلومات كافية عن المكتب على الإنترنت',
      'تبادل الوثائق السرية عبر الإيميل يخاطر بالخصوصية',
      'متابعة القضايا تستلزم مكالمات متكررة مع العملاء',
      'لا يوجد نظام موحد لإدارة المواعيد والمهام',
    ],
    solutions: [
      { icon: '🌐', title: 'موقع يبني الثقة', desc: 'صفحة لكل محامٍ · التخصصات · الأحكام المحققة · شهادات العملاء.' },
      { icon: '🔐', title: 'بوابة وثائق مشفرة', desc: 'العميل يرفع ويستلم الوثائق بسرية تامة بدون إيميل.' },
      { icon: '📊', title: 'متابعة القضايا', desc: 'العميل يتابع سير قضيته من هاتفه دون الحاجة للاتصال.' },
      { icon: '📅', title: 'جدولة المواعيد', desc: 'حجز الاستشارات أونلاين وتذكيرات تلقائية للجميع.' },
    ],
    features: ['موقع المكتب','صفحة كل محامٍ','بوابة وثائق مشفرة','متابعة القضايا','حجز استشارات','تقارير للعملاء','تشفير AES-256','NDMO متوافق'],
    price: '22,000',
  },
  {
    id: 'other',
    icon: '✨',
    label: 'غيرها',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    headline: 'أي قطاع — نصنع له منظومته',
    sub: 'تلقا تك تبني منظومات رقمية مخصصة لأي قطاع — من الفكرة للإطلاق.',
    problems: [
      'الحلول الجاهزة لا تناسب طبيعة عملك تماماً',
      'التقنية المتاحة لا تعكس هوية مؤسستك',
      'التكاملات مع أنظمتك الحالية معقدة',
      'التسليم بطيء والتكلفة مرتفعة',
    ],
    solutions: [
      { icon: '🎨', title: 'هوية كاملة', desc: 'كل شيء بألوانك وشعارك واسمك — لا قوالب جاهزة.' },
      { icon: '🔗', title: 'تكامل مرن', desc: 'نربط حلنا بأي نظام تستخدمه حالياً.' },
      { icon: '⚡', title: 'تسليم ٦٠ يوم', desc: 'من التوقيع للإطلاق خلال شهرين كاملين.' },
      { icon: '🛡️', title: 'أمان بلا تنازل', desc: 'نفس معايير الأمان بغض النظر عن القطاع.' },
    ],
    features: ['تطبيق مخصص','موقع احترافي','نظام إدارة','تكامل API','تدريب الفريق','سنة دعم','أمان عالي','تسليم مضمون'],
    price: 'على حسب المشروع',
  },
];

/* ─── Industry Card ───────────────────────────────────────── */
function IndustryCard({ ind, selected, onClick }: { ind: Industry; selected: boolean; onClick: () => void }) {
  return (
    <motion.button onClick={onClick} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}
      className="flex flex-col items-center gap-3 p-6 rounded-2xl text-center transition-all duration-200 w-full cursor-pointer"
      style={{
        background: selected ? ind.bg : '#fff',
        border: `2px solid ${selected ? ind.color : '#E5E7EB'}`,
        boxShadow: selected ? `0 0 0 4px ${ind.color}18` : '0 1px 4px rgba(0,0,0,0.06)',
      }}>
      <span className="text-3xl">{ind.icon}</span>
      <span className="text-[14px] font-bold" style={{ color: selected ? ind.color : '#374151' }}>{ind.label}</span>
    </motion.button>
  );
}

/* ─── Industry Landing ────────────────────────────────────── */
function IndustryLanding({ ind }: { ind: Industry }) {
  return (
    <motion.div key={ind.id}
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>

      {/* headline */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-[12px] font-bold"
          style={{ background: ind.bg, border: `1px solid ${ind.border}`, color: ind.color }}>
          {ind.icon} {ind.label}
        </div>
        <h3 className="font-black text-neutral-900 mb-4" style={{ fontSize: 'clamp(30px,5vw,58px)' }}>
          {ind.headline}
        </h3>
        <p className="text-[17px] text-neutral-500 font-light max-w-xl mx-auto">{ind.sub}</p>
      </div>

      {/* problems */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-5" style={{ color: ind.color }}>
            التحديات الشائعة
          </p>
          <div className="space-y-3">
            {ind.problems.map((p, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50">
                <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                <p className="text-[14px] text-neutral-600">{p}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-5" style={{ color: ind.color }}>
            كيف تحلها تلقا
          </p>
          <div className="space-y-3">
            {ind.solutions.map((s, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: ind.bg, border: `1px solid ${ind.border}` }}>
                <span className="text-2xl shrink-0">{s.icon}</span>
                <div>
                  <p className="text-[14px] font-bold text-neutral-800 mb-0.5">{s.title}</p>
                  <p className="text-[12px] text-neutral-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* features */}
      <div className="mb-16">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-5 text-center" style={{ color: ind.color }}>
          المميزات المشمولة
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {ind.features.map(f => (
            <div key={f} className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold"
              style={{ background: ind.bg, border: `1px solid ${ind.border}`, color: ind.color }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ind.color }} />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* price + CTA */}
      <div className="text-center p-10 rounded-2xl" style={{ background: ind.bg, border: `1px solid ${ind.border}` }}>
        <p className="text-[12px] font-bold tracking-widest uppercase mb-2" style={{ color: ind.color }}>
          السعر التقريبي
        </p>
        <p className="font-black mb-1 text-neutral-900" style={{ fontSize: 'clamp(40px,7vw,72px)' }}>
          {ind.price}
        </p>
        {ind.price !== 'على حسب المشروع' && (
          <p className="text-neutral-400 text-[14px] mb-8">ريال سعودي — يشمل كل شيء</p>
        )}
        {ind.price === 'على حسب المشروع' && (
          <p className="text-neutral-400 text-[14px] mb-8">استشارة مجانية لتقييم مشروعك</p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
            className="font-bold text-[15px] px-8 py-4 rounded-[14px] text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: ind.color }}>
            ابدأ مشروعك الآن
          </a>
          {ind.demo && (
            <a href={ind.demo} target="_blank" rel="noopener noreferrer"
              className="font-medium text-[14px] px-7 py-4 rounded-[14px] bg-white transition-all hover:bg-neutral-50"
              style={{ border: `1px solid ${ind.border}`, color: ind.color }}>
              شاهد الديمو ←
            </a>
          )}
        </div>
      </div>
    </motion.div>
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
        background: scrolled ? 'rgba(255,255,255,0.95)' : '#fff',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid #F3F4F6' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.06)' : 'none',
      }}>
      <span className="text-[18px] font-black text-neutral-900">
        تلقا<span className="text-sky-500"> تك</span>
      </span>
      <div className="hidden md:flex items-center gap-8">
        {['خدماتنا', 'الأمان', 'الأسعار'].map(l => (
          <a key={l} href="#" className="text-[13px] font-medium text-neutral-400 hover:text-neutral-800 transition-colors">{l}</a>
        ))}
      </div>
      <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
        className="text-[13px] font-bold px-5 py-2.5 rounded-[10px] bg-sky-500 text-white hover:bg-sky-600 transition-colors">
        تواصل
      </a>
    </nav>
  );
}

/* ─── App ─────────────────────────────────────────────────── */
export default function App() {
  const [selectedId, setSelectedId] = useState<string>('clinic');
  const landingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.style.background = '#fff';
    document.body.style.fontFamily = "'Tajawal',sans-serif";
    document.body.style.margin = '0';
  }, []);

  function selectIndustry(id: string) {
    setSelectedId(id);
    setTimeout(() => {
      landingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  const selected = INDUSTRIES.find(i => i.id === selectedId)!;

  return (
    <div dir="rtl" style={{ background: '#fff', color: '#111', fontFamily: "'Tajawal',sans-serif", overflowX: 'hidden' }}>
      <Nav />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 text-center max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[12px] font-bold bg-sky-50 border border-sky-100 text-sky-600">
            <motion.span className="w-1.5 h-1.5 rounded-full bg-sky-500"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
            +٥٠ عيادة ومركز طبي يثقون بتلقا
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-black leading-[1.05] tracking-tight mb-6 text-neutral-900"
          style={{ fontSize: 'clamp(44px,8vw,96px)' }}>
          نصنع المستقبل<br />
          <span className="text-sky-500">الرقمي لعملك.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.7 }}
          className="text-[18px] font-light text-neutral-500 max-w-lg mx-auto mb-10 leading-relaxed">
          من العيادات للكافيهات — تطبيق بهويتك، موقع احترافي، ونظام إدارة متكامل في ٦٠ يوم.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
            className="font-bold text-[15px] px-8 py-4 rounded-[14px] bg-sky-500 text-white hover:bg-sky-600 transition-colors active:scale-95">
            ابدأ مشروعك اليوم
          </a>
          <button onClick={() => document.getElementById('sectors')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-medium text-[14px] px-7 py-4 rounded-[14px] border border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 transition-all">
            اختر قطاعك ↓
          </button>
        </motion.div>

        {/* hero stats row */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8">
          {[['٦٠ يوم', 'متوسط التسليم'], ['١٠٠٪', 'تشفير البيانات'], ['+٥٠', 'عميل نشط'], ['٢٤/٧', 'دعم مستمر']].map(([v, l]) => (
            <div key={l} className="text-center">
              <p className="text-[22px] font-black text-sky-500 leading-none">{v}</p>
              <p className="text-[11px] text-neutral-400 mt-1 font-medium">{l}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── TICKER ────────────────────────────────────────── */}
      <Ticker />

      {/* ── SECTOR SELECTOR ───────────────────────────────── */}
      <section id="sectors" className="py-24 px-8 max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">اختر قطاعك</p>
          <h2 className="font-black text-neutral-900" style={{ fontSize: 'clamp(26px,5vw,52px)' }}>
            من أنت؟
          </h2>
          <p className="text-[15px] text-neutral-400 mt-3 max-w-md mx-auto">اختر قطاعك وشاهد كيف تبني تلقا منظومته الرقمية الكاملة</p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
          {INDUSTRIES.map(ind => (
            <IndustryCard key={ind.id} ind={ind} selected={selectedId === ind.id} onClick={() => selectIndustry(ind.id)} />
          ))}
        </div>

        {/* dynamic landing */}
        <div ref={landingRef} className="scroll-mt-24">
          <AnimatePresence mode="wait">
            <IndustryLanding key={selectedId} ind={selected} />
          </AnimatePresence>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="py-20 px-8 border-y border-neutral-100 bg-neutral-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <Stat target={50}  suffix="+"    label="عيادة عميلة" />
          <Stat target={60}  suffix=" يوم" label="متوسط التسليم" />
          <Stat target={100} suffix="٪"    label="تشفير البيانات" />
          <Stat target={0}   suffix=""     label="اختراق مسجّل" prefix="٠" />
        </div>
      </section>

      {/* ── WHY TELQA ─────────────────────────────────────── */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <Reveal className="mb-12">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">لماذا تلقا؟</p>
          <h2 className="font-black text-neutral-900" style={{ fontSize: 'clamp(26px,5vw,52px)' }}>
            منظومة واحدة — كل شيء فيها.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📱', title: 'تطبيق بهويتك', desc: 'اسمك وشعارك على AppStore وGoogle Play. مرضاك يحملونه ويفخرون به.' },
            { icon: '🌐', title: 'موقع يفوز على جوجل', desc: 'محسّن لكلمات البحث — عملاء جدد يجدونك قبل أي منافس في مدينتك.' },
            { icon: '🔐', title: 'أمان لا يُتجاوز', desc: 'AES-256 · HIPAA · ISO 27001 · PDPL — بنية أمنية لا خطط وعود.' },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="p-8 rounded-2xl border border-neutral-100 bg-white hover:border-sky-100 hover:shadow-sm transition-all duration-200 cursor-default h-full">
                <div className="text-3xl mb-5">{c.icon}</div>
                <p className="text-[18px] font-black text-neutral-900 mb-2">{c.title}</p>
                <p className="text-[13px] text-neutral-500 leading-relaxed">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SECURITY ──────────────────────────────────────── */}
      <section className="py-24 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">الأمان</p>
            <h2 className="font-black text-neutral-900" style={{ fontSize: 'clamp(24px,4vw,48px)' }}>
              الأكثر أماناً في القطاع.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex flex-wrap gap-3 mb-10">
              {['HIPAA', 'ISO 27001', 'AES-256', 'NDMO', 'SOC 2', 'PDPL'].map(b => (
                <div key={b} className="px-4 py-2 rounded-full text-[12px] font-bold bg-white border border-neutral-200 text-neutral-600">
                  ✓ {b}
                </div>
              ))}
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🔐', title: 'تشفير AES-256', desc: 'نفس معيار وزارات الدفاع. لا أحد يقرأ بيانات عملائك.' },
              { icon: '🧠', title: 'Zero-Knowledge', desc: 'مفتاح التشفير ملكك — حتى فريق تلقا لا يراه.' },
              { icon: '🛡️', title: 'مصادقة ثلاثية', desc: 'Face ID + بصمة + رمز تحقق.' },
              { icon: '💾', title: 'نسخ كل ٦ ساعات', desc: 'مراكز بيانات موزعة مشفرة ومحمية من الكوارث.' },
              { icon: '👁️', title: 'مراقبة AI', desc: 'يكتشف أي نشاط غريب ويوقفه فوراً.' },
              { icon: '📜', title: 'PDPL سعودي', desc: 'مطابق لنظام حماية البيانات ولوائح الحكومة الرقمية.' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="p-6 rounded-2xl bg-white border border-neutral-100 hover:border-sky-100 hover:shadow-sm transition-all duration-150 cursor-default h-full">
                  <span className="text-2xl mb-4 block">{s.icon}</span>
                  <p className="text-[14px] font-bold text-neutral-800 mb-1">{s.title}</p>
                  <p className="text-[12px] text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <Reveal className="mb-12">
          <h2 className="font-black text-neutral-900" style={{ fontSize: 'clamp(24px,4vw,48px)' }}>قالوا عنّا.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'عيادة الشفاء', city: 'الرياض', av: 'ع', color: '#0EA5E9', quote: 'الحجوزات الإلكترونية قلّصت الانتظار ٦٠٪ في أول أسبوع.' },
            { name: 'مجمع النور الطبي', city: 'جدة', av: 'م', color: '#8B5CF6', quote: 'مرضاي يطلبون تطبيقنا قبل ما يسألون عن الأطباء.' },
            { name: 'مستشفى الرعاية', city: 'أبها', av: 'ر', color: '#10B981', quote: 'الأمان كان أولويتنا — المواصفات فاقت توقعاتنا بكثير.' },
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

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="py-32 px-8 text-center bg-neutral-50">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <h2 className="font-black text-neutral-900 mb-4" style={{ fontSize: 'clamp(36px,7vw,80px)' }}>
              جاهز تبدأ؟
            </h2>
            <p className="text-[17px] text-neutral-400 mb-10">استشارة مجانية — بدون التزام — خلال ٢٤ ساعة.</p>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              className="inline-block font-black text-[16px] px-12 py-5 rounded-[16px] bg-sky-500 text-white hover:bg-sky-600 transition-colors active:scale-95">
              تواصل معنا عبر واتساب
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <div className="py-8 px-8 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-black text-[15px] text-sky-500">تلقا تك</span>
          <p className="text-[11px] text-neutral-400">وكالة تصميم منظومات رقمية · ٢٠٢٥</p>
          <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
            className="text-[12px] font-medium px-4 py-2 rounded-full border border-neutral-200 text-neutral-400 hover:border-sky-200 hover:text-sky-500 transition-colors">
            واتساب ←
          </a>
        </div>
      </div>
    </div>
  );
}
