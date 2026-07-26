import { motion } from 'framer-motion';
import { Wallet, Smartphone, LayoutDashboard, Zap } from 'lucide-react';
import { useMouseSpotlight } from '../hooks/useMouseSpotlight';

const S = [
  {
    Icon: Wallet,          en: 'Apple Wallet',      ar: 'تكامل Apple Wallet',
    desc: 'بطاقات ولاء رقمية تُضاف مباشرةً لمحفظة Apple Wallet — تحديث آني للنقاط، QR Code، وإشعارات Push بدون تطبيق.',
    tag: 'الأكثر طلباً',
    feats: ['بطاقة عضوية رقمية', 'Push Notifications', 'تحديث نقاط آني'],
    accent: '#4F8EFF',
  },
  {
    Icon: Smartphone,      en: 'Mobile Apps',       ar: 'تطبيقات الجوال',
    desc: 'تطبيقات iOS & Android بتصميم Native فاخر وتجربة مستخدم سلسة تعكس هوية علامتك التجارية.',
    tag: null,
    feats: ['iOS & Android', 'UI/UX مخصص', 'لوحة تحكم مرفقة'],
    accent: '#A78BFA',
  },
  {
    Icon: LayoutDashboard, en: 'Web Platforms',     ar: 'المواقع ولوحات التحكم',
    desc: 'مواقع تسويقية فائقة السرعة ولوحات تحكم سحابية تمنحك رؤية كاملة على بياناتك وعملياتك.',
    tag: null,
    feats: ['أداء فائق', 'تحليلات لحظية', 'صلاحيات متعددة'],
    accent: '#34D399',
  },
  {
    Icon: Zap,             en: 'Automation & API',  ar: 'أتمتة وحلول مخصصة',
    desc: 'حلول برمجية تربط أنظمتك ببعضها — تكامل واتساب، ربط API خارجي، وأتمتة العمليات اليومية بالكامل.',
    tag: null,
    feats: ['تكامل واتساب', 'ربط API', 'أتمتة كاملة'],
    accent: '#FB923C',
  },
];

function SpotlightCard({ s, i }: { s: typeof S[0]; i: number }) {
  const { ref, onMouseMove, onMouseLeave } = useMouseSpotlight();
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="spotlight-card"
      style={{
        background: 'var(--surface)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20, padding: '32px 28px',
        cursor: 'default', position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.35s, box-shadow 0.35s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${s.accent}35`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${s.accent}18, 0 28px 60px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        onMouseLeave();
      }}
    >
      {/* Tag */}
      {s.tag && (
        <div style={{
          position: 'absolute', top: 20, left: 20, fontSize: 10, fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px',
          borderRadius: 6, background: `${s.accent}18`, color: s.accent, border: `1px solid ${s.accent}35`,
          zIndex: 2,
        }}>{s.tag}</div>
      )}

      {/* Number watermark */}
      <div style={{
        position: 'absolute', top: 18, right: 22, fontSize: 52, fontWeight: 900,
        color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none', zIndex: 0,
      }}>{String(i + 1).padStart(2, '0')}</div>

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 14, marginBottom: 28, position: 'relative', zIndex: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${s.accent}14`, color: s.accent, border: `1px solid ${s.accent}22`,
      }}>
        <s.Icon size={23} strokeWidth={1.5} />
      </div>

      {/* Label */}
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: 8, position: 'relative', zIndex: 2 }}>{s.en}</div>

      {/* Title */}
      <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 14, position: 'relative', zIndex: 2 }}>{s.ar}</h3>

      {/* Desc */}
      <p style={{ fontSize: 13.5, lineHeight: 1.9, color: 'rgba(255,255,255,0.42)', marginBottom: 28, position: 'relative', zIndex: 2 }}>{s.desc}</p>

      {/* Features */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, position: 'relative', zIndex: 2 }}>
        {s.feats.map(f => (
          <span key={f} style={{
            fontSize: 11, fontWeight: 600, padding: '5px 11px', borderRadius: 7,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)',
            color: 'rgba(255,255,255,0.42)',
          }}>{f}</span>
        ))}
      </div>

      {/* Bottom accent line — animates on hover via parent */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, right: 0, left: 0, height: 2,
          background: `linear-gradient(to left, ${s.accent}, transparent)`,
          borderRadius: '0 0 20px 20px', scaleX: 0, transformOrigin: 'right', zIndex: 2,
        }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" style={{ padding: '120px 0', background: 'var(--bg)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>

        <div style={{ marginBottom: 72 }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4F8EFF', marginBottom: 18 }}>
            ما نبنيه لك
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
            style={{ fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.08, color: '#fff', fontSize: 'clamp(2rem,4vw,3.2rem)', maxWidth: 540 }}>
            أربع خدمات جوهرية.<br />
            <span className="text-blue">منظومة واحدة متكاملة.</span>
          </motion.h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {S.map((s, i) => <SpotlightCard key={i} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
