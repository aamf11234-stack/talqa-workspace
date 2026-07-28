import React, { useState, useEffect, useRef } from 'react';
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
import {
  Coffee, Smartphone, CreditCard, Store, Bell, BarChart3,
  ShieldCheck, CheckCircle2, MessageCircle, ArrowDown, Sparkles, Pencil
} from 'lucide-react';

/* ─── Inner app shell ─── */
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

/* ─── Personalization input card ─── */
function PersonalizeCard({
  businessName, setBusinessName,
  userName, setUserName,
  onApply,
}: {
  businessName: string; setBusinessName: (v: string) => void;
  userName: string; setUserName: (v: string) => void;
  onApply: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 24, padding: '28px 28px 24px',
        width: '100%', maxWidth: 360,
        direction: 'rtl',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: 'linear-gradient(135deg,#8B5CF6,#3B82F6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Pencil size={15} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>خصّص الديمو باسمك</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>شوف تطبيقك قبل ما تطلبه</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 6, display: 'block', fontWeight: 600 }}>
            اسم نشاطك التجاري
          </label>
          <input
            value={businessName}
            onChange={e => setBusinessName(e.target.value)}
            placeholder="مثال: كافيه النخبة"
            style={{
              width: '100%', padding: '11px 14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12, color: '#fff',
              fontSize: 14, fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif',
              outline: 'none', direction: 'rtl',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 6, display: 'block', fontWeight: 600 }}>
            اسمك
          </label>
          <input
            value={userName}
            onChange={e => setUserName(e.target.value)}
            placeholder="مثال: سلطان الغامدي"
            style={{
              width: '100%', padding: '11px 14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12, color: '#fff',
              fontSize: 14, fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif',
              outline: 'none', direction: 'rtl',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      <button
        onClick={onApply}
        style={{
          width: '100%', padding: '13px',
          background: 'linear-gradient(135deg,#8B5CF6,#3B82F6)',
          border: 'none', borderRadius: 12,
          color: '#fff', fontSize: 14, fontWeight: 800,
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 8,
          fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif',
          boxShadow: '0 8px 24px rgba(139,92,246,0.35)',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        <Sparkles size={16} />
        طبّق على الديمو
      </button>
    </motion.div>
  );
}

/* ─── Landing Page ─── */
function LandingPage() {
  const demoRef = useRef<HTMLDivElement>(null);

  /* Demo state — lifted here so PersonalizeCard and AppProvider stay in sync */
  const [businessName, setBusinessName] = useState('كافيه النخبة');
  const [userName,     setUserName]     = useState('سلطان الغامدي');
  const [appliedBiz,   setAppliedBiz]   = useState('كافيه النخبة');
  const [appliedUser,  setAppliedUser]  = useState('سلطان الغامدي');
  const [flashKey,     setFlashKey]     = useState(0);

  const applyPersonalization = () => {
    setAppliedBiz(businessName   || 'كافيه النخبة');
    setAppliedUser(userName      || 'سلطان الغامدي');
    setFlashKey(k => k + 1);
    demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const FEATURES = [
    { icon: Coffee,      title: 'قائمة QR تفاعلية',       desc: 'منيو رقمي يُحدَّث فوراً بدون طباعة' },
    { icon: CreditCard,  title: 'Apple & Google Wallet',  desc: 'بطاقة ولاء رقمية بلمسة واحدة' },
    { icon: CheckCircle2,title: 'نقاط ولاء تلقائية',      desc: 'كل طلب يكسب نقاطاً قابلة للاستبدال' },
    { icon: Smartphone,  title: 'تطبيق بهويتك',           desc: 'ألوانك، اسمك، منيوك — لا تطبيق خارجي' },
    { icon: Store,       title: 'إدارة الفروع',            desc: 'كل فروعك في لوحة تحكم واحدة' },
    { icon: Bell,        title: 'إشعارات مباشرة',         desc: 'خصومات وعروض بزر واحد لكل عملائك' },
    { icon: BarChart3,   title: 'إحصائيات مبيعات',        desc: 'اعرف أكثر صنف وأكثر وقت طلب' },
    { icon: ShieldCheck, title: 'أمان وخصوصية',           desc: 'بيانات عملائك محمية بأعلى المعايير' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0d0518', color: '#fff', direction: 'rtl', overflowX: 'hidden', fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif' }}>

      {/* ── Header ── */}
      <header style={{
        position: 'fixed', top: 0, insetInline: 0, zIndex: 50,
        background: 'rgba(13,5,24,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(139,92,246,0.15)',
        height: 68, display: 'flex', alignItems: 'center',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg,#8B5CF6,#3B82F6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 900, color: '#fff',
            }}>ت</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>تلقا البرمجية</div>
              <div style={{ fontSize: 10, color: 'rgba(167,139,250,0.8)', letterSpacing: '0.04em' }}>نظام الولاء الرقمي</div>
            </div>
          </div>

          <a href="https://wa.me/966551378531?text=ابغى%20نظام%20ولاء%20لنشاطي"
            target="_blank" rel="noopener noreferrer"
            style={{
              background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)',
              color: '#C4B5FD', padding: '8px 18px', borderRadius: 99,
              fontSize: 13, fontWeight: 700, textDecoration: 'none',
              transition: 'background 0.2s',
            }}>
            تواصل معنا
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative', paddingTop: 140, paddingBottom: 80,
        overflow: 'hidden', background: 'linear-gradient(180deg, #160824 0%, #0d0518 100%)',
      }}>
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.18),transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80,  width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.12),transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.1)', fontSize: 12, fontWeight: 700, color: 'rgba(196,181,253,0.9)', marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8B5CF6', flexShrink: 0, animation: 'pulse 2s infinite' }} />
            نظام ولاء رقمي للأعمال السعودية
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontSize: 'clamp(2.4rem,7vw,5rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
            عملاؤك يستحقون
            <br />
            <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#3B82F6,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              تجربة تعيّدهم
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.6 }}
            style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 36px' }}>
            تطبيق بهوية نشاطك · Apple & Google Wallet · نقاط ولاء · طلب توصيل واستلام
            <br />كل شيء في منصة واحدة تُسلَّم في ٦٠ يوم.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            <a href="#personalize"
              style={{
                background: 'linear-gradient(135deg,#8B5CF6,#3B82F6)', color: '#fff',
                padding: '14px 32px', borderRadius: 14, fontWeight: 800, fontSize: 16,
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 8px 32px rgba(139,92,246,0.4)',
              }}>
              <Sparkles size={18} />
              جرّب الديمو بإسمك
            </a>
            <a href="https://wa.me/966551378531?text=ابغى%20نظام%20ولاء%20لنشاطي"
              target="_blank" rel="noopener noreferrer"
              style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', padding: '14px 28px', borderRadius: 14,
                fontWeight: 700, fontSize: 15, textDecoration: 'none',
              }}>
              تحدث معنا على واتساب
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 28 }}>
            {['✓ تسليم في ٦٠ يوم', '✓ بدون رسوم شهرية', '✓ دعم واتساب مباشر'].map(t => (
              <span key={t} style={{ padding: '5px 14px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)' }}>{t}</span>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 48, color: 'rgba(255,255,255,0.2)' }}>
          <ArrowDown size={20} />
        </motion.div>
      </section>

      {/* ── Features Grid ── */}
      <section style={{ padding: '80px 24px', background: '#0f061e', borderTop: '1px solid rgba(139,92,246,0.1)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>
              كل شيء يحتاجه نشاطك
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16 }}>
              ميزات صُممت للأعمال السعودية
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 16 }}>
            {FEATURES.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '22px 20px' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <f.icon size={20} color="#A78BFA" />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personalize + Live Demo ── */}
      <section id="personalize" style={{ padding: '80px 24px', background: '#0d0518', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.07),transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 16px', borderRadius: 99, border: '1px solid rgba(139,92,246,0.25)', background: 'rgba(139,92,246,0.08)', fontSize: 12, fontWeight: 700, color: 'rgba(196,181,253,0.9)', marginBottom: 16 }}>
              ✦ ديمو حي وتفاعلي
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>
              شوف تطبيقك قبل ما تطلبه
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, maxWidth: 440, margin: '0 auto' }}>
              حط اسم نشاطك واسمك — البطاقة والتطبيق تتحدث أمامك لحظياً
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', gap: 40 }}>
            {/* Personalize Card */}
            <div>
              <PersonalizeCard
                businessName={businessName} setBusinessName={setBusinessName}
                userName={userName}         setUserName={setUserName}
                onApply={applyPersonalization}
              />

              {/* How it works */}
              <div style={{ marginTop: 24, maxWidth: 360 }}>
                {[
                  { n: '١', t: 'حط اسمك', d: 'اسم نشاطك واسمك الشخصي' },
                  { n: '٢', t: 'شاهد التطبيق', d: 'بطاقة Wallet وشاشة الرئيسية بهويتك' },
                  { n: '٣', t: 'تواصل معنا', d: 'نبني نسختك الحقيقية في ٦٠ يوم' },
                ].map(s => (
                  <div key={s.n} style={{ display: 'flex', gap: 14, marginBottom: 16, direction: 'rtl' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#A78BFA', flexShrink: 0 }}>{s.n}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{s.t}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Demo Phone */}
            <motion.div key={flashKey} ref={demoRef}
              initial={{ opacity: 0.7, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <AppProvider businessName={appliedBiz} userName={appliedUser}>
                <MainApp />
              </AppProvider>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={{ padding: '80px 24px', background: '#0f061e', borderTop: '1px solid rgba(139,92,246,0.1)' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            style={{ background: 'linear-gradient(135deg,rgba(139,92,246,0.12),rgba(59,130,246,0.08))', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 32, padding: '44px 36px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(139,92,246,0.1)', filter: 'blur(50px)', pointerEvents: 'none' }} />

            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#8B5CF6,#3B82F6)', color: '#fff', padding: '5px 16px', borderRadius: 99, fontSize: 12, fontWeight: 800, marginBottom: 20 }}>
              باقة كاملة — دفعة واحدة
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 64, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>٢,٠٠٠</span>
              <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>ريال</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 32, fontSize: 14 }}>لا رسوم شهرية · ملكيتك الكاملة</p>

            <div style={{ textAlign: 'right', marginBottom: 32 }}>
              {[
                'تطبيق ويب كامل بهوية نشاطك',
                'نظام نقاط ولاء تلقائي',
                'Apple & Google Wallet',
                'طلب توصيل واستلام',
                'لوحة تحكم + إحصائيات',
                'دعم واتساب ٦ أشهر',
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, direction: 'rtl' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={12} color="#A78BFA" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>

            <a href="https://wa.me/966551378531?text=ابغى%20نظام%20ولاء%20لنشاطي"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'linear-gradient(135deg,#8B5CF6,#3B82F6)', color: '#fff',
                padding: '15px 24px', borderRadius: 14, fontWeight: 800, fontSize: 16,
                textDecoration: 'none', boxShadow: '0 8px 28px rgba(139,92,246,0.35)',
              }}>
              <MessageCircle size={18} />
              احجز مشروعك الآن
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ padding: '28px 24px', background: '#080313', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, fontWeight: 600 }}>
          تلقا البرمجية · نظام الولاء الرقمي · ٢٠٢٥
        </p>
        <button onClick={() => (window as any).__bdAdmin?.()}
          className="mt-3 text-white/10 hover:text-white/25 text-xs transition-colors select-none">⚙</button>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.25); }
        input:focus { border-color: rgba(139,92,246,0.5) !important; box-shadow: 0 0 0 3px rgba(139,92,246,0.12); }
      `}</style>
    </div>
  );
}

/* ─── App mode (full-screen, no landing) ─── */
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

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const isAppMode = new URLSearchParams(window.location.search).get('mode') === 'app';

  useEffect(() => {
    (window as any).__bdAdmin = () => setShowAdmin(true);
    return () => { delete (window as any).__bdAdmin; };
  }, []);

  if (isAppMode) {
    return (
      <div dir="rtl" style={{ width: '100%', height: '100dvh', background: 'hsl(var(--background))', overflow: 'hidden' }}>
        <AppProvider>
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
