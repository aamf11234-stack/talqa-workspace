import { motion } from 'framer-motion';
import { Wallet, Smartphone, LayoutDashboard, Zap } from 'lucide-react';

const S = [
  {
    Icon: Wallet, en: 'Apple Wallet',
    ar: 'تكامل Apple Wallet',
    desc: 'بطاقات ولاء رقمية تُضاف لمحفظة عميلك. تحديث آني للنقاط، QR Code للاسترداد، وإشعارات فورية — بدون تطبيق.',
    tag: 'الأكثر طلباً',
    feats: ['بطاقة عضوية رقمية', 'تحديث نقاط آني', 'Push Notifications'],
    accent: '#D4A843',
  },
  {
    Icon: Smartphone, en: 'Mobile Apps',
    ar: 'تطبيقات الجوال',
    desc: 'تطبيقات iOS & Android بتصميم Native فاخر وتجربة مستخدم سلسة تعكس هوية علامتك التجارية بالكامل.',
    tag: null,
    feats: ['iOS & Android', 'UI/UX مخصص', 'لوحة تحكم مرفقة'],
    accent: '#5E8BFF',
  },
  {
    Icon: LayoutDashboard, en: 'Web Platforms',
    ar: 'مواقع ولوحات التحكم',
    desc: 'مواقع تسويقية فائقة السرعة ولوحات تحكم سحابية تمنحك رؤية كاملة على بياناتك وعملياتك.',
    tag: null,
    feats: ['أداء فائق', 'تحليلات لحظية', 'صلاحيات متعددة'],
    accent: '#4CD890',
  },
  {
    Icon: Zap, en: 'Automation & API',
    ar: 'أتمتة وحلول مخصصة',
    desc: 'حلول برمجية تربط أنظمتك ببعضها — تكامل واتساب، ربط API خارجي، وأتمتة العمليات اليومية بالكامل.',
    tag: null,
    feats: ['تكامل واتساب', 'ربط API', 'أتمتة كاملة'],
    accent: '#FF6B6B',
  },
];

export default function Services() {
  return (
    <section id="services" style={{ padding: '120px 0', background: 'var(--bg)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: 1, background: 'rgba(255,255,255,0.07)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#D4A843', marginBottom: 18,
            }}
          >ما نبنيه لك</motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)', maxWidth: 520,
            }}
          >
            أربع خدمات جوهرية.<br />
            <span className="text-gold">منظومة واحدة متكاملة.</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {S.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.28 } }}
              style={{
                background: 'var(--surface)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20, padding: '32px 28px',
                cursor: 'default', position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${s.accent}40`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px ${s.accent}20`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Tag */}
              {s.tag && (
                <div style={{
                  position: 'absolute', top: 20, left: 20,
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '4px 10px', borderRadius: 6,
                  background: `${s.accent}18`, color: s.accent,
                  border: `1px solid ${s.accent}35`,
                }}>{s.tag}</div>
              )}

              {/* Index */}
              <div style={{
                position: 'absolute', top: 20, right: 24,
                fontSize: 48, fontWeight: 900, color: 'rgba(255,255,255,0.03)',
                lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
              }}>{String(i + 1).padStart(2, '0')}</div>

              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 14, marginBottom: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${s.accent}14`, color: s.accent,
                border: `1px solid ${s.accent}20`,
              }}>
                <s.Icon size={24} strokeWidth={1.5} />
              </div>

              {/* Label */}
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8,
              }}>{s.en}</div>

              {/* Title */}
              <h3 style={{
                fontSize: 20, fontWeight: 900, color: '#fff',
                lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: 14,
              }}>{s.ar}</h3>

              {/* Desc */}
              <p style={{
                fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)',
                marginBottom: 28,
              }}>{s.desc}</p>

              {/* Features */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {s.feats.map(f => (
                  <span key={f} style={{
                    fontSize: 11, fontWeight: 600, padding: '5px 10px', borderRadius: 6,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.45)',
                  }}>{f}</span>
                ))}
              </div>

              {/* Bottom accent */}
              <div style={{
                position: 'absolute', bottom: 0, right: 0, left: 0, height: 2,
                background: `linear-gradient(to left, ${s.accent}, transparent)`,
                transform: 'scaleX(0)', transformOrigin: 'right',
                transition: 'transform 0.45s ease',
              }} className="card-line" />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        div:hover > .card-line { transform: scaleX(1) !important; }
      `}</style>
    </section>
  );
}
