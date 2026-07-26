import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, MessageCircle, Lock, Play } from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=أريد%20تطبيق%20مثل%20الديمو';

const DEMOS = [
  {
    id: 'brown',
    label: 'تطبيق الولاء',
    sub: 'نقاط · بطاقة رقمية · Apple Wallet',
    color: '#C4783A',
    url: '/brown-dose/?mode=app',
    description: 'يشوف عميلك نقاطه ويحصل على مكافآت مباشرة من جواله — بدون تطبيق خارجي.',
    features: ['بطاقة Apple Wallet', 'نقاط وزيارات', 'عروض تلقائية', 'Push Notifications'],
  },
  {
    id: 'haiz',
    label: 'تطبيق العضوية',
    sub: 'اشتراكات · بطاقة عضوية · رصيد',
    color: '#8B5CF6',
    url: '/haeez-loyalty/?mode=app',
    description: 'بطاقة عضوية رقمية — الرصيد والزيارات والمستوى في مكان واحد.',
    features: ['بطاقة عضوية NFC', 'رصيد قابل للشحن', 'مستويات العضوية', 'سجل المعاملات'],
  },
];

/* ── Realistic iPhone frame ── */
function PhoneFrame({ url, color }: { url: string; color: string }) {
  const [unlocked, setUnlocked] = useState(false);

  /* iPhone 14 Pro ratio ≈ 390 × 844  →  scale down to 340 × 736 */
  const W = 340;
  const H = 736;
  const R = 50;
  const BORDER = 8;
  const innerR = R - BORDER + 2;

  return (
    <div style={{ position: 'relative', width: W, flexShrink: 0 }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: W + 40, height: H * 0.7,
        background: `radial-gradient(ellipse, ${color}30 0%, transparent 70%)`,
        filter: 'blur(48px)', pointerEvents: 'none', transition: 'background 0.5s',
      }} />

      {/* Outer shell */}
      <div style={{
        position: 'relative', width: W, height: H,
        borderRadius: R,
        background: 'linear-gradient(160deg, #2a2a2a 0%, #111 60%, #1e1e1e 100%)',
        boxShadow: [
          '0 60px 120px rgba(0,0,0,0.75)',
          'inset 0 1px 0 rgba(255,255,255,0.18)',
          'inset 0 -1px 0 rgba(255,255,255,0.06)',
          '0 0 0 1px rgba(255,255,255,0.06)',
        ].join(', '),
        padding: BORDER,
        boxSizing: 'border-box',
      }}>

        {/* Screen area */}
        <div style={{
          width: '100%', height: '100%',
          borderRadius: innerR,
          overflow: 'hidden',
          position: 'relative',
          background: '#000',
        }}>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute', top: 12, left: '50%',
            transform: 'translateX(-50%)',
            width: 108, height: 30,
            background: '#000', borderRadius: 20,
            zIndex: 20, boxShadow: '0 0 0 2px rgba(255,255,255,0.08)',
          }} />

          {/* Status bar overlay */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 52,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
            zIndex: 15, pointerEvents: 'none',
          }} />

          {/* App iframe — only rendered after unlock */}
          {unlocked && (
            <iframe
              src={url}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              title="demo app"
              loading="eager"
            />
          )}

          {/* Copyright gate overlay */}
          <AnimatePresence>
            {!unlocked && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute', inset: 0, zIndex: 30,
                  background: 'linear-gradient(160deg, #0e0e18 0%, #07070f 100%)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 0, padding: '32px 24px',
                  textAlign: 'center',
                }}>

                {/* Logo mark */}
                <div style={{
                  width: 56, height: 56, borderRadius: 16, marginBottom: 20,
                  background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                  border: `1px solid ${color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Lock size={22} color={color} />
                </div>

                {/* Copyright text */}
                <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                  جميع الحقوق محفوظة
                </div>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginBottom: 6 }}>
                  تلقا تك · TLQA TECH
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 28, lineHeight: 1.6 }}>
                  هذا التطبيق من تصميم وتطوير تلقا تك.
                  <br />يُمنع النسخ أو التقليد بدون إذن.
                </div>

                {/* Unlock button */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setUnlocked(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '13px 26px', borderRadius: 14, border: 'none',
                    background: `linear-gradient(135deg, ${color}, ${color}99)`,
                    color: '#fff', fontFamily: 'Cairo, sans-serif',
                    fontSize: 14, fontWeight: 800, cursor: 'pointer',
                    boxShadow: `0 8px 28px ${color}45`,
                  }}>
                  <Play size={14} fill="#fff" />
                  جرّب الديمو
                </motion.button>

                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', marginTop: 16 }}>
                  بالضغط توافق على شروط الاستخدام
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Home indicator */}
          <div style={{
            position: 'absolute', bottom: 10, left: '50%',
            transform: 'translateX(-50%)',
            width: 112, height: 4, borderRadius: 99,
            background: 'rgba(255,255,255,0.3)',
            zIndex: 25, pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Side buttons */}
      <div style={{ position: 'absolute', top: 130, left: -4, width: 4, height: 34, borderRadius: '3px 0 0 3px', background: 'rgba(255,255,255,0.13)' }} />
      <div style={{ position: 'absolute', top: 174, left: -4, width: 4, height: 34, borderRadius: '3px 0 0 3px', background: 'rgba(255,255,255,0.13)' }} />
      <div style={{ position: 'absolute', top: 160, right: -4, width: 4, height: 64, borderRadius: '0 3px 3px 0', background: 'rgba(255,255,255,0.13)' }} />
    </div>
  );
}

/* ── Main Section ── */
export default function LiveDemo() {
  const [active, setActive] = useState(0);
  const demo = DEMOS[active];

  return (
    <section id="live-demo" style={{
      padding: 'clamp(80px,10vw,130px) 0',
      background: 'var(--bg)', position: 'relative', overflow: 'hidden',
    }}>
      {/* Orbs */}
      <div className="orb" style={{ width: 500, height: 500, top: '10%', right: '-5%', background: `${demo.color}09`, animationDelay: '-2s', transition: 'background 0.5s' }} />
      <div className="orb" style={{ width: 400, height: 400, bottom: '5%', left: '-5%', background: `${demo.color}07`, animationDelay: '-6s', transition: 'background 0.5s' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-label">ديمو تفاعلي حقيقي</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            شوف التطبيق الحقيقي{' '}
            <span className="grad">قبل ما تبدأ</span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 16, marginTop: 14, maxWidth: 460, margin: '14px auto 0' }}>
            هذا مو موكاب — هذا التطبيق الفعلي الذي يستخدمه عملاؤنا الآن.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-flex',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            borderRadius: 14, padding: 5, gap: 4,
          }}>
            {DEMOS.map((d, i) => (
              <button key={d.id} onClick={() => setActive(i)}
                style={{
                  padding: '10px 28px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14,
                  transition: 'all 0.25s',
                  background: active === i
                    ? `linear-gradient(135deg, ${d.color}ee, ${d.color}88)`
                    : 'transparent',
                  color: active === i ? '#fff' : 'var(--text2)',
                  boxShadow: active === i ? `0 4px 20px ${d.color}40` : 'none',
                }}>
                {d.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Body: phone + info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 56, alignItems: 'center',
        }}>

          {/* Phone */}
          <AnimatePresence mode="wait">
            <motion.div key={demo.id}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <PhoneFrame url={demo.url} color={demo.color} />
            </motion.div>
          </AnimatePresence>

          {/* Info */}
          <AnimatePresence mode="wait">
            <motion.div key={demo.id + '-info'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35 }}>

              {/* Sub label */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 14px', borderRadius: 99, marginBottom: 20,
                background: `${demo.color}15`, border: `1px solid ${demo.color}35`,
                fontSize: 11, fontWeight: 800, color: demo.color,
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: demo.color, animation: 'pulse 1.5s ease-in-out infinite', display: 'inline-block' }} />
                {demo.sub}
              </div>

              <h3 style={{
                fontWeight: 900, fontSize: 'clamp(1.8rem,2.8vw,2.6rem)',
                letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 16,
              }}>
                {demo.label}
              </h3>

              <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.85, marginBottom: 28 }}>
                {demo.description}
              </p>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {demo.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                      background: `${demo.color}18`, border: `1px solid ${demo.color}35`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 11, color: demo.color, fontWeight: 900 }}>✓</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Real badge */}
              <div style={{
                padding: '16px 20px', borderRadius: 16, marginBottom: 24,
                background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)',
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 800, color: '#10B981', marginBottom: 5,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                  تطبيق حقيقي وشغّال الآن
                </div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
                  هذا التطبيق يستخدمه عملاؤنا الحاليون — نبدّل الاسم والشعار والألوان بالكامل ليطابق هويتك.
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 28 }}>
                {[
                  { val: '٣-٤', unit: 'أسابيع', c: demo.color },
                  { val: '١٠٠٪', unit: 'مخصص', c: '#10B981' },
                  { val: '٣', unit: 'أشهر دعم', c: '#F59E0B' },
                ].map(({ val, unit, c }) => (
                  <div key={unit} style={{
                    padding: '12px', borderRadius: 13, textAlign: 'center',
                    background: `${c}0e`, border: `1px solid ${c}22`,
                  }}>
                    <div style={{ fontSize: 17, fontWeight: 900, color: c }}>{val}</div>
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 3 }}>{unit}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-purple"
                  style={{ display: 'flex', alignItems: 'center', gap: 7, background: `linear-gradient(135deg, ${demo.color}, ${demo.color}88)`, boxShadow: `0 8px 28px ${demo.color}35` }}>
                  <MessageCircle size={15} /> ابني تطبيقي ←
                </a>
                <a href={demo.url} target="_blank" rel="noopener noreferrer" className="btn-ghost"
                  style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13 }}>
                  <ExternalLink size={13} /> افتح كاملاً
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          #live-demo > div > div:last-child {
            grid-template-columns: 1fr !important;
            justify-items: center;
          }
          #live-demo > div > div:last-child > div:first-child { order: 1; }
          #live-demo > div > div:last-child > div:last-child  { order: 2; }
        }
      `}</style>
    </section>
  );
}
