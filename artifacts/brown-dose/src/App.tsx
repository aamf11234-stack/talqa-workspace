import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppProvider';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomNav } from './components/BottomNav';
import { OrderFlow } from './components/OrderFlow';
import { HomeScreen } from './screens/Home';
import { MenuScreen } from './screens/Menu';
import { OrdersScreen } from './screens/Orders';
import { CardScreen } from './screens/Card';
import { AdminScreen } from './screens/Admin';
import { AnimatePresence, motion } from 'framer-motion';
import { BookingButton, BookingModal } from './components/BookingModal';
import {
  Coffee, CreditCard, Bell, BarChart3,
  CheckCircle2, Sparkles, ShoppingBag, Wallet,
} from 'lucide-react';

/* ─── Brand ─── */
const BROWN = '#6B3210';
const BROWN_LIGHT = '#7A3B18';
const CREAM = '#FDFBF7';

/* ─── Inner app (phone frame) ─── */
function MainApp() {
  const { activeTab } = useAppContext();
  return (
    <PhoneFrame>
      <AnimatePresence mode="wait">
        {activeTab === 'home'   && <HomeScreen   key="home" />}
        {activeTab === 'menu'   && <MenuScreen   key="menu" />}
        {activeTab === 'orders' && <OrdersScreen key="orders" />}
        {activeTab === 'card'   && <CardScreen   key="card" />}
      </AnimatePresence>
      <BottomNav />
      <OrderFlow />
    </PhoneFrame>
  );
}

/* ─── App mode ─── */
function AppModeInner() {
  const { activeTab } = useAppContext();
  return (
    <>
      <AnimatePresence mode="wait">
        {activeTab === 'home'   && <HomeScreen   key="home" />}
        {activeTab === 'menu'   && <MenuScreen   key="menu" />}
        {activeTab === 'orders' && <OrdersScreen key="orders" />}
        {activeTab === 'card'   && <CardScreen   key="card" />}
      </AnimatePresence>
      <BottomNav />
      <OrderFlow />
    </>
  );
}

/* ─── Pillar card ─── */
const PILLARS = [
  {
    num: '٠١', icon: Coffee,
    title: 'تطبيقك بهويتك',
    sub: 'ألوانك، اسمك، منيوك',
    desc: 'مش قالب جاهز — تطبيق خاص بك تماماً',
    grad: 'linear-gradient(145deg,#1C0900,#3D1A00)',
    accent: '#C4783A',
  },
  {
    num: '٠٢', icon: ShoppingBag,
    title: 'طلب وتوصيل',
    sub: 'استلام أو توصيل',
    desc: 'الزبون يطلب من التطبيق مباشرة',
    grad: 'linear-gradient(145deg,#0A1A0A,#1A3010)',
    accent: '#4CAF50',
  },
  {
    num: '٠٣', icon: Wallet,
    title: 'Apple & Google Wallet',
    sub: 'بطاقة رقمية دائمة',
    desc: 'تظهر على شاشة القفل تلقائياً',
    grad: 'linear-gradient(145deg,#0A0A1A,#101030)',
    accent: '#5B8DEF',
  },
  {
    num: '٠٤', icon: BarChart3,
    title: 'نقاط الولاء',
    sub: 'كل طلب = نقاط',
    desc: 'زبائن راجعين وعروض مخصصة',
    grad: 'linear-gradient(145deg,#040D08,#0D2814)',
    accent: '#2ECC71',
  },
];

const FEATURES = [
  'منيو رقمي تفاعلي يُحدَّث فوراً',
  'طلب توصيل واستلام',
  'Apple Pay & STC Pay',
  'نقاط ولاء تلقائية',
  'Apple & Google Wallet',
  'إشعارات وعروض مخصصة',
  'لوحة تحكم + إحصائيات',
  'هوية بصرية كاملة بالألوان واللوغو',
  'دعم مباشر ٦ أشهر',
  'إطلاق في ٦٠ يوم مضمون',
];

/* ─── Landing Page ─── */
function LandingPage() {
  const [bizName, setBizName] = useState('');
  const [applied, setApplied] = useState('');
  const [flashKey, setFlashKey] = useState(0);

  function applyDemo() {
    if (!bizName.trim()) return;
    setApplied(bizName.trim());
    setFlashKey(k => k + 1);
  }

  return (
    <div style={{ minHeight: '100vh', background: CREAM, direction: 'rtl', fontFamily: 'Tajawal, sans-serif', overflowX: 'hidden' }}>

      {/* ── Aurora background ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="animate-aurora-1" style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(180,90,20,0.18) 0%,rgba(140,60,10,0.06) 50%,transparent 70%)', filter: 'blur(50px)' }} />
        <div className="animate-aurora-2" style={{ position: 'absolute', bottom: '10%', left: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(107,50,16,0.12) 0%,transparent 70%)', filter: 'blur(45px)' }} />
      </div>

      {/* ═══ HEADER ═══ */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(253,251,247,0.88)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(107,50,16,0.08)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${BROWN},${BROWN_LIGHT})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>☕</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#111', lineHeight: 1.2 }}>كافي تلقا</div>
              <div style={{ fontSize: 10, color: BROWN, letterSpacing: '0.06em', fontWeight: 500 }}>نظام الولاء الرقمي</div>
            </div>
          </div>
          <BookingButton style={{ padding: '8px 20px', borderRadius: 99, fontSize: 13, background: BROWN, color: '#fff', border: 'none', boxShadow: 'none' }}>
            احجز مشروعك
          </BookingButton>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px' }}>

        {/* Badge */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid rgba(107,50,16,0.15)', borderRadius: 99, padding: '6px 18px', fontSize: 12, fontWeight: 700, color: BROWN, boxShadow: '0 2px 12px rgba(107,50,16,0.08)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: BROWN, flexShrink: 0 }} />
            ✦ ديمو حي — خصّصه بإسمك الآن
          </motion.div>
        </div>

        {/* Headline */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
            style={{ fontSize: 'clamp(2.8rem,6vw,5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#111', marginBottom: 16 }}
          >
            نشاطك يستحق
            <br />
            <span style={{ color: BROWN }}>تطبيقاً يعرّفه</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontSize: 17, color: '#666', lineHeight: 1.8, maxWidth: 500, margin: '0 auto' }}>
            تطبيق بهوية نشاطك · Apple & Google Wallet · نقاط ولاء · طلب وتوصيل
            <br />كل شيء في منصة واحدة
          </motion.p>
        </div>

        {/* Personalization box + phone — two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 48, alignItems: 'center' }}>

          {/* Left: inputs + CTA */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>

            {/* Input card */}
            <div style={{ background: '#fff', border: '1.5px solid rgba(107,50,16,0.12)', borderRadius: 24, padding: '24px', marginBottom: 20, boxShadow: '0 8px 32px rgba(107,50,16,0.07)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: BROWN, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                ✏️ خصّص الديمو — شوف تطبيقك قبل ما تطلبه
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  value={bizName}
                  onChange={e => setBizName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && applyDemo()}
                  placeholder="اسم نشاطك (مثال: كافيه النخبة)"
                  style={{
                    flex: 1, padding: '12px 16px',
                    background: '#FAFAF8', border: '1.5px solid rgba(107,50,16,0.15)',
                    borderRadius: 14, fontSize: 14, fontFamily: 'Tajawal, sans-serif',
                    color: '#111', outline: 'none', direction: 'rtl',
                  }}
                />
                <button onClick={applyDemo} disabled={!bizName.trim()} style={{
                  padding: '12px 20px',
                  background: bizName.trim() ? `linear-gradient(135deg,${BROWN},${BROWN_LIGHT})` : 'rgba(107,50,16,0.1)',
                  border: 'none', borderRadius: 14, color: bizName.trim() ? '#fff' : 'rgba(107,50,16,0.4)',
                  fontSize: 14, fontWeight: 700, cursor: bizName.trim() ? 'pointer' : 'not-allowed',
                  fontFamily: 'Tajawal, sans-serif', whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}>
                  طبّق ←
                </button>
              </div>
            </div>

            {/* Primary CTA */}
            <BookingButton style={{ width: '100%', padding: '16px', borderRadius: 16, fontSize: 16, display: 'flex', background: `linear-gradient(135deg,${BROWN},${BROWN_LIGHT})`, boxShadow: `0 12px 36px rgba(107,50,16,0.3)` }}>
              <Sparkles size={18} />
              احجز تطبيقك الآن
            </BookingButton>

            {/* Trust chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16, justifyContent: 'center' }}>
              {['✓ تسليم في ٦٠ يوم', '✓ بدون رسوم شهرية', '✓ دعم مباشر ٦ أشهر'].map(t => (
                <span key={t} style={{ padding: '5px 14px', borderRadius: 99, background: '#fff', border: '1px solid rgba(107,50,16,0.12)', fontSize: 11, fontWeight: 600, color: '#666' }}>{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Right: phone */}
          <motion.div
            key={flashKey}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
            className="animate-phone-float"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {applied ? (
              <AppProvider businessName={applied} userName="زبون مميز" cityName="الرياض">
                <MainApp />
              </AppProvider>
            ) : (
              /* placeholder phone */
              <div style={{ position: 'relative', width: 320, height: 640, borderRadius: 48, background: 'linear-gradient(160deg,#1C0C00,#0E0700)', border: '2px solid rgba(107,50,16,0.25)', boxShadow: '0 60px 120px rgba(0,0,0,0.2), 0 0 0 8px rgba(107,50,16,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, overflow: 'hidden' }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', width: 80, height: 24, borderRadius: 12, background: '#000' }} />
                {/* Content */}
                <motion.div animate={{ scale: [1,1.06,1], opacity: [0.7,1,0.7] }} transition={{ duration: 2.5, repeat: Infinity }}>
                  <div style={{ fontSize: 56, textAlign: 'center', marginBottom: 16 }}>☕</div>
                </motion.div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', textAlign: 'center', fontFamily: 'Tajawal', marginBottom: 8 }}>اسم نشاطك هنا</div>
                <div style={{ fontSize: 12, color: 'rgba(196,120,58,0.8)', textAlign: 'center', fontFamily: 'Tajawal', lineHeight: 1.7 }}>
                  أدخل اسمه على اليسار<br />وشوف التطبيق لحظياً
                </div>
                {/* dots */}
                <div style={{ display: 'flex', gap: 6, marginTop: 24 }}>
                  {[0,1,2].map(i => (
                    <motion.div key={i} animate={{ opacity: [0.2,0.8,0.2] }} transition={{ duration: 1.4, repeat: Infinity, delay: i*0.3 }}
                      style={{ width: 7, height: 7, borderRadius: '50%', background: '#C4783A' }} />
                  ))}
                </div>
                {/* Home bar */}
                <div style={{ position: 'absolute', bottom: 14, width: 80, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══ PILLAR CARDS ═══ */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ height: 1, flex: 1, background: 'rgba(107,50,16,0.1)' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: BROWN, letterSpacing: '0.08em', textTransform: 'uppercase' }}>ما يحصل عليه نشاطك</span>
            <div style={{ height: 1, flex: 1, background: 'rgba(107,50,16,0.1)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {PILLARS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22,1,0.36,1] }}
                style={{
                  borderRadius: 24, overflow: 'hidden', position: 'relative',
                  background: p.grad, minHeight: 220,
                  padding: '24px 20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                  cursor: 'default',
                }}>
                {/* Number */}
                <div style={{ position: 'absolute', top: 18, left: 18, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, monospace', letterSpacing: 1 }}>{p.num}</div>
                {/* Icon */}
                <div style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: 12, background: `${p.accent}22`, border: `1px solid ${p.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p.icon size={20} color={p.accent} />
                </div>
                {/* Text */}
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: p.accent, letterSpacing: '0.06em', marginBottom: 5, textTransform: 'uppercase' }}>{p.sub}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 6, lineHeight: 1.2 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>{p.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '1.5px solid rgba(107,50,16,0.1)', borderRadius: 28, padding: '44px 48px', boxShadow: '0 8px 40px rgba(107,50,16,0.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
              {/* Left: heading */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: BROWN, letterSpacing: '0.06em', marginBottom: 14 }}>المنظومة الكاملة</div>
                <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 900, color: '#111', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 }}>
                  كل شيء يحتاجه نشاطك
                  <br />
                  <span style={{ color: BROWN }}>في تطبيق واحد</span>
                </h2>
                <p style={{ fontSize: 14, color: '#777', lineHeight: 1.75, marginBottom: 28 }}>
                  مش مجرد تطبيق — منظومة كاملة تخلي عميلك يرجعك بدون ما تطلب منه.
                </p>
                <BookingButton style={{ padding: '13px 28px', borderRadius: 14, fontSize: 15 }}>
                  ابدأ مشروعك
                </BookingButton>
              </div>
              {/* Right: features list */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px' }}>
                {FEATURES.map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: `rgba(107,50,16,0.12)`, border: `1px solid rgba(107,50,16,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <CheckCircle2 size={10} color={BROWN} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 13, color: '#444', fontWeight: 500, lineHeight: 1.5 }}>{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            style={{ background: `linear-gradient(160deg,#1C0900,#2D1200)`, borderRadius: 32, padding: '48px 40px', position: 'relative', overflow: 'hidden', boxShadow: '0 40px 80px rgba(107,50,16,0.25)' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(196,120,58,0.15)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 44, marginBottom: 16 }}>☕</div>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 12, lineHeight: 1.2 }}>
                نشاطك يستحق<br />
                <span style={{ color: '#E8A060' }}>تطبيقه الخاص</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32, fontSize: 14, lineHeight: 1.7 }}>
                تواصل معنا وسنوضح لك كل التفاصيل
              </p>
              <BookingButton style={{ width: '100%', padding: '16px', borderRadius: 16, fontSize: 16 }}>
                <Sparkles size={18} />
                تواصل معنا الآن
              </BookingButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ position: 'relative', zIndex: 1, padding: '24px', background: 'rgba(107,50,16,0.04)', borderTop: '1px solid rgba(107,50,16,0.08)', textAlign: 'center' }}>
        <p style={{ color: '#AAA', fontSize: 13, fontWeight: 500 }}>
          كافي تلقا · نظام الولاء الرقمي · ٢٠٢٥
        </p>
        <button
          onClick={() => (window as any).__bdAdmin?.()}
          style={{ background: 'none', border: 'none', color: 'rgba(107,50,16,0.15)', fontSize: 11, cursor: 'pointer', marginTop: 8 }}>⚙</button>
      </footer>

    </div>
  );
}

/* ════════════════════════════════
   ROOT
════════════════════════════════ */
export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const isAppMode = params.get('mode') === 'app';
  const urlBiz    = params.get('biz')  || undefined;
  const urlUser   = params.get('user') || undefined;
  const urlCity   = params.get('city') || undefined;

  React.useEffect(() => {
    (window as any).__bdAdmin = () => setShowAdmin(true);
    return () => { delete (window as any).__bdAdmin; };
  }, []);

  if (isAppMode) {
    return (
      <div className="app-dark" dir="rtl" style={{ width: '100%', height: '100dvh', background: '#150900', overflow: 'hidden' }}>
        <AppProvider businessName={urlBiz} userName={urlUser} cityName={urlCity}>
          <AppModeInner />
        </AppProvider>
      </div>
    );
  }

  return (
    <div dir="rtl">
      {showAdmin
        ? <AdminScreen onClose={() => setShowAdmin(false)} />
        : <LandingPage />}
    </div>
  );
}
