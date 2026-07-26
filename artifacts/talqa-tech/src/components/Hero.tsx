import { motion } from 'framer-motion';

const WHATSAPP = "https://wa.me/966551378531?text=السلام%20عليكم%2C%20أريد%20أحسب%20تكلفة%20مشروعي";

const stats = [
  { n: '+١٥', l: 'مشروع مُنجز' },
  { n: '+٣',  l: 'قطاعات' },
  { n: '٢',   l: 'فرع في جازان' },
  { n: '٢٤/', l: 'دعم فني' },
];

const tags = ['تطبيقات iOS & Android', 'Apple Wallet', 'لوحات تحكم', 'أتمتة API'];

export default function Hero() {
  return (
    <section style={{
      position: 'relative', minHeight: '100dvh', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      paddingTop: 100, paddingBottom: 0, overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      {/* Grid */}
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6 }} />

      {/* Central glow */}
      <div style={{
        position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 700, height: 700, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 65%)',
        filter: 'blur(1px)',
      }} />
      {/* Top-right accent */}
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 400, height: 400,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 960, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 32, display: 'flex', justifyContent: 'center' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 16px', borderRadius: 99,
            border: '1px solid rgba(212,168,67,0.3)',
            background: 'rgba(212,168,67,0.07)',
            fontSize: 11, fontWeight: 700, color: '#D4A843',
            letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#D4A843',
              boxShadow: '0 0 8px #D4A843',
              animation: 'pulse 2s infinite',
            }} />
            منظومة تلقا التقنية
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em',
            fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
            marginBottom: 24,
          }}
        >
          <span style={{ color: '#fff', display: 'block' }}>نحوّل أفكارك التجارية</span>
          <span className="text-gold" style={{ display: 'block' }}>إلى حلول برمجية تدر الأرباح</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 500,
            color: 'rgba(255,255,255,0.48)', lineHeight: 1.85,
            maxWidth: 640, margin: '0 auto 40px',
          }}
        >
          تطبيقات جوال، بطاقات Apple Wallet، مواقع سريعة، وأنظمة مخصصة
          <br className="hidden sm:block" />
          تعزز قيمة براندك وتبقي عملاءك يعودون.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 52 }}
        >
          <a href="#calculator" className="btn-gold" style={{
            padding: '14px 32px', borderRadius: 12, fontSize: 15, fontWeight: 700,
            color: '#000', textDecoration: 'none', letterSpacing: '-0.01em',
          }}>
            احسب تكلفة مشروعك ←
          </a>
          <a href="#services" style={{
            padding: '14px 32px', borderRadius: 12, fontSize: 15, fontWeight: 700,
            color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
            transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
            }}
          >
            استكشف الخدمات
          </a>
        </motion.div>

        {/* Service tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 64 }}
        >
          {tags.map(t => (
            <span key={t} style={{
              padding: '6px 14px', borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              fontSize: 12, fontWeight: 600,
              color: 'rgba(255,255,255,0.4)',
            }}>{t}</span>
          ))}
        </motion.div>
      </div>

      {/* Stats bar — anchored bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        style={{
          position: 'relative', zIndex: 2, width: '100%',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: '28px 0',
                borderLeft: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 900,
                  color: '#D4A843', lineHeight: 1, marginBottom: 6, letterSpacing: '-0.03em',
                }}>{s.n}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.02em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; } 50% { opacity:0.4; }
        }
      `}</style>
    </section>
  );
}
