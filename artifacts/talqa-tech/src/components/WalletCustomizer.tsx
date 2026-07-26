import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Bell, RefreshCw, Check } from 'lucide-react';

const TIERS = [
  { id: 'bronze', label: 'Bronze', color: '#CD7F32', min: 0,    pts: '٠–٩٩٩' },
  { id: 'silver', label: 'Silver', color: '#9CA3AF', min: 1000, pts: '١٠٠٠–٢٤٩٩' },
  { id: 'gold',   label: 'Gold',   color: '#F59E0B', min: 2500, pts: '٢٥٠٠–٤٩٩٩' },
  { id: 'plat',   label: 'Platinum', color: '#818CF8', min: 5000, pts: '+٥٠٠٠' },
];

const EMOJIS = ['☕', '🍕', '💇', '🏋️', '🛒', '🎮', '👗', '💊', '🏪', '✈️'];

export default function WalletCustomizer() {
  const [name,    setName]    = useState('منشأتك');
  const [emoji,   setEmoji]   = useState('☕');
  const [tier,    setTier]    = useState('gold');
  const [pts,     setPts]     = useState(2450);
  const [notif,   setNotif]   = useState(false);

  const t = TIERS.find(x => x.id === tier) || TIERS[2];

  return (
    <section style={{ padding: '120px 0', background: 'var(--bg)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4F8EFF', marginBottom: 18 }}>جرّب الآن</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
            style={{ fontWeight: 900, fontSize: 'clamp(1.9rem,3.5vw,3rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>
            صمّم بطاقة Wallet مشروعك<br /><span className="text-blue">الآن — قبل أن نبدأ.</span>
          </motion.h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', maxWidth: 500, margin: '0 auto' }}>
            كتابة اسم مشروعك تكفي — ستراها حية على الفور.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }} className="wallet-cust-grid">

          {/* Controls */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Business name */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>اسم المشروع</label>
              <input value={name} onChange={e => setName(e.target.value || 'منشأتك')} maxLength={22}
                style={{ width: '100%', padding: '14px 18px', borderRadius: 12, background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'Cairo, sans-serif', outline: 'none', direction: 'rtl', transition: 'border-color 0.2s' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(79,142,255,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                placeholder="مثال: Coffee House" />
            </div>

            {/* Emoji */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>أيقونة المشروع</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {EMOJIS.map(e => (
                  <button key={e} onClick={() => setEmoji(e)}
                    style={{ width: 44, height: 44, borderRadius: 11, fontSize: 20, cursor: 'pointer', border: `1.5px solid ${emoji === e ? 'rgba(79,142,255,0.5)' : 'rgba(255,255,255,0.08)'}`, background: emoji === e ? 'rgba(79,142,255,0.1)' : 'rgba(255,255,255,0.03)', transition: 'all 0.18s' }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Points */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>رصيد النقاط</label>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#4F8EFF' }}>{pts.toLocaleString('ar-SA')} نقطة</span>
              </div>
              <input type="range" min={0} max={6000} step={50} value={pts} onChange={e => setPts(+e.target.value)}
                style={{ width: '100%', accentColor: '#4F8EFF', height: 4, cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>
                <span>٠</span><span>٣٠٠٠</span><span>٦٠٠٠</span>
              </div>
            </div>

            {/* Tier */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>مستوى العضوية</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 7 }}>
                {TIERS.map(t2 => (
                  <button key={t2.id} onClick={() => setTier(t2.id)}
                    style={{ padding: '9px 4px', borderRadius: 10, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1.5px solid ${tier === t2.id ? t2.color + '55' : 'rgba(255,255,255,0.08)'}`, background: tier === t2.id ? `${t2.color}12` : 'rgba(255,255,255,0.03)', color: tier === t2.id ? '#fff' : 'rgba(255,255,255,0.35)', transition: 'all 0.2s' }}>
                    {t2.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Bell size={15} color="rgba(255,255,255,0.4)" />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>إظهار Push Notification</span>
              </div>
              <button onClick={() => setNotif(v => !v)}
                style={{ width: 42, height: 24, borderRadius: 99, background: notif ? '#4F8EFF' : 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
                <div style={{ position: 'absolute', top: 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.3s', left: notif ? 21 : 3 }} />
              </button>
            </div>

            <a href="https://wa.me/966551378531?text=أريد%20بطاقة%20Apple%20Wallet%20لمشروعي" target="_blank" rel="noopener noreferrer"
              className="btn-blue" style={{ padding: '15px', borderRadius: 13, fontSize: 15, fontWeight: 700, justifyContent: 'center', textDecoration: 'none' }}>
              ابنِ هذه البطاقة لمشروعي ←
            </a>
          </motion.div>

          {/* Live Preview */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Card */}
            <div style={{ borderRadius: 26, background: 'linear-gradient(145deg, #111120, #0d0d1a)', border: `1px solid ${t.color}25`, padding: '28px 24px', boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 60px ${t.color}10`, position: 'relative', overflow: 'hidden', transition: 'border-color 0.5s, box-shadow 0.5s' }}>
              {/* Glow */}
              <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${t.color}20, transparent 60%)`, pointerEvents: 'none', transition: 'background 0.5s' }} />
              {/* Top bar */}
              <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 3, background: `linear-gradient(to right, ${t.color}, transparent)`, transition: 'background 0.5s', borderRadius: '26px 26px 0 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, position: 'relative', zIndex: 1 }}>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 7 }}>MEMBERSHIP CARD</div>
                  <motion.div key={name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
                    style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
                    {name}
                  </motion.div>
                </div>
                <motion.div key={emoji} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ width: 44, height: 44, borderRadius: 12, background: `${t.color}15`, border: `1px solid ${t.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                  {emoji}
                </motion.div>
              </div>

              <motion.div key={tier} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 8, background: `${t.color}14`, border: `1px solid ${t.color}30`, marginBottom: 22 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.color, boxShadow: `0 0 8px ${t.color}`, animation: 'ph-pulse 2s infinite' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: t.color }}>{t.label} Member</span>
              </motion.div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)', marginBottom: 4 }}>رصيد النقاط</div>
                  <motion.div key={pts} initial={{ scale: 0.85 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    style={{ fontSize: 36, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {pts.toLocaleString('ar-SA')}
                  </motion.div>
                  <div style={{ fontSize: 10, color: t.color, marginTop: 4, fontWeight: 600 }}>نقطة متاحة</div>
                </div>
                {/* QR */}
                <div style={{ width: 52, height: 52, background: '#fff', borderRadius: 10, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1.5, padding: 4 }}>
                  {[1,1,1,0,1,0,1,0,1,1,0,1,0,1,1,1].map((v,i) => <div key={i} style={{ background: v ? '#111' : '#fff', borderRadius: 1 }} />)}
                </div>
              </div>

              <div style={{ marginTop: 20, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <motion.div key={pts} initial={{ width: 0 }} animate={{ width: `${Math.min((pts / 6000) * 100, 100)}%` }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
                  style={{ height: '100%', borderRadius: 99, background: `linear-gradient(to right, ${t.color}, ${t.color}88)` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>
                <span>{t.pts}</span>
                <span>Wallet Ready ✓</span>
              </div>
            </div>

            {/* Notification preview */}
            <AnimatePresence>
              {notif && (
                <motion.div initial={{ opacity: 0, y: -14, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  style={{ background: 'rgba(20,20,30,0.95)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '16px 16px', display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: `${t.color}15`, border: `1px solid ${t.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 3 }}>{name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>🎉 عرض خاص لك! خصم ٢٠٪ اليوم فقط</div>
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>الآن</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Apple Wallet button mockup */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', background: '#000', borderRadius: 14, border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer' }}>
              <Wallet size={18} color="#fff" />
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', flex: 1 }}>إضافة إلى Apple Wallet</span>
              <Check size={14} color="#34D399" />
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              {[{ icon: RefreshCw, label: 'تحديث آني', color: '#4F8EFF' }, { icon: Bell, label: 'Push Notification', color: '#A78BFA' }, { icon: Wallet, label: 'Apple Watch', color: '#34D399' }].map((f, i) => (
                <div key={i} style={{ flex: 1, padding: '10px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
                  <f.icon size={14} color={f.color} style={{ margin: '0 auto 5px' }} />
                  <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>{f.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.wallet-cust-grid{grid-template-columns:1fr!important}}
        @keyframes ph-pulse{0%,100%{opacity:1}50%{opacity:0.3}}
      `}</style>
    </section>
  );
}
