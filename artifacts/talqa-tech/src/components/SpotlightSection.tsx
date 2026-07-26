import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const REASONS = [
  { n: '01', title: 'شركاء لا مجرد مزودين',    desc: 'نفهم أهدافك التجارية أولاً ونبني الحل الذي يحقق النتيجة، لا مجرد المتطلبات.', color: '#4F8EFF' },
  { n: '02', title: 'خبرة في السوق المحلي',     desc: 'جذورنا في جازان وفهمنا للعميل السعودي يُترجم إلى منتجات تُصيب القلب مباشرة.', color: '#A78BFA' },
  { n: '03', title: 'تسليم يليق بك',             desc: 'مواعيد، شفافية، وتحديثات أسبوعية. لا مفاجآت في الفواتير ولا في المواعيد.', color: '#34D399' },
  { n: '04', title: 'Apple Wallet الأول محلياً', desc: 'من أوائل شركات المنطقة المتخصصة في حلول Apple Wallet بمستوى إنتاج حقيقي.', color: '#FB923C' },
];

/* ── Mobile version: fully visible cards ── */
function MobileSpotlight() {
  return (
    <section style={{ padding: '72px 0', background: '#050508', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 18px' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4F8EFF', marginBottom: 16 }}>لماذا تلقا تك؟</div>
          <h2 style={{ fontWeight: 900, fontSize: '1.8rem', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
            أربعة أسباب<br /><span className="text-blue">لا تُنسى.</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {REASONS.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              style={{ padding: '24px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 2, background: `linear-gradient(to right, ${r.color}, transparent)`, borderRadius: '16px 16px 0 0' }} />
              <div style={{ fontSize: 40, fontWeight: 900, color: `${r.color}12`, lineHeight: 1, marginBottom: -4, letterSpacing: '-0.04em', userSelect: 'none' }}>{r.n}</div>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>{r.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: 'rgba(255,255,255,0.4)' }}>{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Desktop version: spotlight cursor effect ── */
function DesktopSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', () => setEntered(true));
    el.addEventListener('mouseleave', () => { setEntered(false); setPos({ x: -9999, y: -9999 }); });
    return () => { el.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '140px 0', background: '#020204', position: 'relative', overflow: 'hidden', cursor: 'none' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: `radial-gradient(circle 280px at ${pos.x}px ${pos.y}px, transparent 0%, rgba(2,2,4,0.96) 100%)`,
        transition: entered ? 'none' : 'background 1s',
      }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(79,142,255,0.4)', marginBottom: 20 }}>حرّك الماوس واكتشف</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.4rem)', letterSpacing: '-0.03em', color: 'rgba(255,255,255,0.12)', lineHeight: 1.1, userSelect: 'none' }}>
            لماذا تلقا تك؟<br />
            <span style={{ background: 'linear-gradient(135deg, rgba(107,163,255,0.25), rgba(79,142,255,0.15))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>أربعة أسباب لا تُنسى.</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
          {REASONS.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              style={{ padding: '52px 48px', position: 'relative', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.04)' : 'none', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div style={{ fontSize: 60, fontWeight: 900, color: 'rgba(79,142,255,0.06)', letterSpacing: '-0.06em', lineHeight: 1, marginBottom: -10, userSelect: 'none' }}>{r.n}</div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.025em', marginBottom: 14, lineHeight: 1.2 }}>{r.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.32)' }}>{r.desc}</p>
            </motion.div>
          ))}
        </div>
        {!entered && (
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <motion.span animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }}
              style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
              ↑ حرّك الماوس لتكتشف ↑
            </motion.span>
          </div>
        )}
      </div>
    </section>
  );
}

export default function SpotlightSection() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileSpotlight /> : <DesktopSpotlight />;
}
