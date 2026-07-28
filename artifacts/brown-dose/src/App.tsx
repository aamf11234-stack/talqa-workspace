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
  const [businessName, setBusinessName] = useState('');
  const [userName,     setUserName]     = useState('');
  const [appliedBiz,   setAppliedBiz]   = useState('');
  const [appliedUser,  setAppliedUser]  = useState('');
  const [flashKey,     setFlashKey]     = useState(0);
  const [applied,      setApplied]      = useState(false);

  const applyPersonalization = () => {
    if (!businessName.trim()) return;
    setAppliedBiz(businessName.trim());
    setAppliedUser(userName.trim() || 'عميل مميز');
    setFlashKey(k => k + 1);
    setApplied(true);
  };

  const FEATURES = [
    { icon: Coffee,       title: 'قائمة QR تفاعلية',      desc: 'منيو رقمي يُحدَّث فوراً بدون طباعة' },
    { icon: CreditCard,   title: 'Apple & Google Wallet', desc: 'بطاقة ولاء رقمية بلمسة واحدة' },
    { icon: CheckCircle2, title: 'نقاط ولاء تلقائية',     desc: 'كل طلب يكسب نقاطاً قابلة للاستبدال' },
    { icon: Smartphone,   title: 'تطبيق بهويتك',          desc: 'ألوانك، اسمك، منيوك — لا تطبيق خارجي' },
    { icon: Bell,         title: 'إشعارات مباشرة',        desc: 'خصومات وعروض بزر واحد لكل عملائك' },
    { icon: BarChart3,    title: 'إحصائيات مبيعات',       desc: 'اعرف أكثر صنف وأكثر وقت طلب' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0d0518', color: '#fff', direction: 'rtl', overflowX: 'hidden', fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif' }}>

      {/* ── Header ── */}
      <header style={{
        position: 'fixed', top: 0, insetInline: 0, zIndex: 50,
        background: 'rgba(13,5,24,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(139,92,246,0.15)',
        height: 64, display: 'flex', alignItems: 'center',
      }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#8B5CF6,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>☕</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>كافي تلقا</div>
              <div style={{ fontSize: 10, color: 'rgba(167,139,250,0.8)', letterSpacing: '0.04em' }}>نظام الولاء الرقمي</div>
            </div>
          </div>
          <a href="https://wa.me/966551378531?text=ابغى%20نظام%20ولاء%20لنشاطي" target="_blank" rel="noopener noreferrer"
            style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#C4B5FD', padding: '8px 18px', borderRadius: 99, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
            تواصل معنا
          </a>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          HERO — نص يسار + ديمو حي يمين
      ══════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) auto',
        gap: 0,
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 60,
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #160824 0%, #0d0518 100%)',
        maxWidth: 1240,
        margin: '0 auto',
        padding: '80px 24px 60px',
      }}>
        {/* Ambient blobs */}
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.18),transparent 65%)', filter: 'blur(0px)' }} />
          <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.12),transparent 65%)' }} />
        </div>

        {/* ── RIGHT column — text + personalize ── */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
          style={{ paddingLeft: 40, maxWidth: 520 }}>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.1)', fontSize: 12, fontWeight: 700, color: 'rgba(196,181,253,0.9)', marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8B5CF6', flexShrink: 0 }} />
            ✦ ديمو حي — خصّصه بإسمك الآن
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: 'clamp(2.6rem,5vw,4.2rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.04em', marginBottom: 20 }}>
            عملاؤك يستحقون
            <br />
            <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#3B82F6,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              تجربة تعيّدهم
            </span>
          </h1>

          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.52)', lineHeight: 1.8, marginBottom: 36 }}>
            تطبيق بهوية نشاطك · Apple & Google Wallet · نقاط ولاء · طلب وتوصيل.
            <br />كل شيء في منصة واحدة تُسلَّم في ٦٠ يوم.
          </p>

          {/* Personalize inputs */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 20, padding: '22px 22px 18px', marginBottom: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(196,181,253,0.8)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Pencil size={13} />
              خصّص الديمو — شوف تطبيقك قبل ما تطلبه
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
              <input value={businessName} onChange={e => setBusinessName(e.target.value)}
                placeholder="اسم نشاطك (مثال: كافيه النخبة)"
                style={{ padding: '11px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontSize: 14, fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif', outline: 'none', direction: 'rtl', width: '100%', boxSizing: 'border-box' }} />
              <input value={userName} onChange={e => setUserName(e.target.value)}
                placeholder="اسمك (مثال: سلطان الغامدي)"
                style={{ padding: '11px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontSize: 14, fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif', outline: 'none', direction: 'rtl', width: '100%', boxSizing: 'border-box' }} />
            </div>
            <button onClick={applyPersonalization}
              disabled={!businessName.trim()}
              style={{ width: '100%', padding: '12px', background: businessName.trim() ? 'linear-gradient(135deg,#8B5CF6,#3B82F6)' : 'rgba(139,92,246,0.2)', border: businessName.trim() ? 'none' : '1px solid rgba(139,92,246,0.2)', borderRadius: 12, color: businessName.trim() ? '#fff' : 'rgba(255,255,255,0.3)', fontSize: 14, fontWeight: 800, cursor: businessName.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif', boxShadow: businessName.trim() ? '0 6px 20px rgba(139,92,246,0.3)' : 'none', transition: 'all 0.2s' }}>
              <Sparkles size={15} />
              {businessName.trim() ? 'طبّق على الديمو' : 'أدخل اسم نشاطك أولاً'}
            </button>
          </div>

          {/* CTA */}
          <a href="https://wa.me/966551378531?text=ابغى%20نظام%20ولاء%20لنشاطي" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.7)', padding: '13px 24px', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none', marginBottom: 24 }}>
            <MessageCircle size={16} />
            تحدث معنا على واتساب
          </a>

          {/* Trust chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['✓ تسليم في ٦٠ يوم', '✓ بدون رسوم شهرية', '✓ دعم واتساب'].map(t => (
              <span key={t} style={{ padding: '5px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>{t}</span>
            ))}
          </div>
        </motion.div>

        {/* ── LEFT column — live phone demo ── */}
        <motion.div key={flashKey}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22,1,0.36,1] }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: 20 }}>
          {applied ? (
            <AppProvider businessName={appliedBiz} userName={appliedUser}>
              <MainApp />
            </AppProvider>
          ) : (
            /* placeholder phone — before any input */
            <div style={{ position: 'relative', width: 300 }}>
              {/* ambient glow */}
              <div style={{ position: 'absolute', inset: -60, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.18) 0%,transparent 65%)', pointerEvents: 'none' }} />
              {/* phone shell */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 300, height: 560, borderRadius: 48, background: 'linear-gradient(160deg,#1a0d2e 0%,#0a0518 100%)', border: '1.5px solid rgba(139,92,246,0.20)', boxShadow: ['0 60px 130px rgba(0,0,0,0.7)', '0 0 100px rgba(139,92,246,0.12)', 'inset 0 1px 0 rgba(255,255,255,0.06)'].join(', '), overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, position: 'relative' }}>
                {/* notch */}
                <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', width: 80, height: 24, borderRadius: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333' }} />
                  <div style={{ width: 34, height: 5, borderRadius: 3, background: '#111' }} />
                </div>
                {/* content */}
                <div style={{ textAlign: 'center', padding: '0 32px' }}>
                  <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ fontSize: 52, marginBottom: 20 }}>☕</motion.div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,0.9)', marginBottom: 10, fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif' }}>اسم نشاطك هنا</div>
                  <div style={{ fontSize: 12, color: 'rgba(139,92,246,0.8)', lineHeight: 1.7, fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif' }}>أدخل اسم نشاطك على اليمين<br />وشوف تطبيقك لحظياً</div>
                  {/* fake dots */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 28 }}>
                    {[0,1,2].map(i => (
                      <motion.div key={i} animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3 }}
                        style={{ width: 7, height: 7, borderRadius: '50%', background: '#8B5CF6' }} />
                    ))}
                  </div>
                </div>
                {/* home bar */}
                <div style={{ position: 'absolute', bottom: 14, width: 80, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }} />
              </motion.div>
            </div>
          )}
        </motion.div>
      </section>

      {/* ── Features Grid ── */}
      <section style={{ padding: '72px 24px', background: '#0f061e', borderTop: '1px solid rgba(139,92,246,0.1)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 10 }}>
              كل شيء يحتاجه نشاطك
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15 }}>ميزات صُممت للأعمال السعودية</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
            {FEATURES.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '22px 20px' }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <f.icon size={19} color="#A78BFA" />
                </div>
                <h3 style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={{ padding: '72px 24px', background: '#0d0518', borderTop: '1px solid rgba(139,92,246,0.08)' }}>
        <div style={{ maxWidth: 460, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
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
              {['تطبيق ويب كامل بهوية نشاطك','نظام نقاط ولاء تلقائي','Apple & Google Wallet','طلب توصيل واستلام','لوحة تحكم + إحصائيات','دعم واتساب ٦ أشهر'].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, direction: 'rtl' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={12} color="#A78BFA" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="https://wa.me/966551378531?text=ابغى%20نظام%20ولاء%20لنشاطي" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'linear-gradient(135deg,#8B5CF6,#3B82F6)', color: '#fff', padding: '15px 24px', borderRadius: 14, fontWeight: 800, fontSize: 16, textDecoration: 'none', boxShadow: '0 8px 28px rgba(139,92,246,0.35)' }}>
              <MessageCircle size={18} />
              احجز مشروعك الآن
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ padding: '24px', background: '#080313', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, fontWeight: 600 }}>
          كافي تلقا · نظام الولاء الرقمي · ٢٠٢٥
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
