import { motion } from 'framer-motion';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20عندي%20مشروع%20وأبي%20أعرف%20كيف%20تقدرون%20تساعدوني';

const SECTORS = [
  { icon: '☕', name: 'كافيهات',         color: '#92400E', bg: 'rgba(146,64,14,0.12)' },
  { icon: '🍽️', name: 'مطاعم',           color: '#DC2626', bg: 'rgba(220,38,38,0.1)'  },
  { icon: '🏥', name: 'عيادات',          color: '#059669', bg: 'rgba(5,150,105,0.1)'  },
  { icon: '💇', name: 'صالونات تجميل',   color: '#EC4899', bg: 'rgba(236,72,153,0.1)' },
  { icon: '💪', name: 'صالات رياضية',    color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  { icon: '🏨', name: 'فنادق',           color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
  { icon: '💊', name: 'صيدليات',         color: '#06B6D4', bg: 'rgba(6,182,212,0.1)'  },
  { icon: '📚', name: 'مراكز تعليمية',   color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  { icon: '🛍️', name: 'متاجر',           color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  { icon: '🚗', name: 'خدمات سيارات',    color: '#6366F1', bg: 'rgba(99,102,241,0.1)' },
  { icon: '🧴', name: 'عناية شخصية',     color: '#F472B6', bg: 'rgba(244,114,182,0.1)'},
  { icon: '🏋️', name: 'تدريب شخصي',     color: '#EF4444', bg: 'rgba(239,68,68,0.1)'  },
  { icon: '🌿', name: 'صحة وعافية',      color: '#84CC16', bg: 'rgba(132,204,22,0.1)' },
  { icon: '🎨', name: 'استوديوهات',      color: '#A855F7', bg: 'rgba(168,85,247,0.1)' },
  { icon: '⚖️', name: 'مكاتب مهنية',    color: '#64748B', bg: 'rgba(100,116,139,0.1)'},
  { icon: '🐾', name: 'خدمات الحيوانات', color: '#F97316', bg: 'rgba(249,115,22,0.1)' },
];

/* duplicate for seamless loop */
const ROW1 = [...SECTORS.slice(0, 8),  ...SECTORS.slice(0, 8)];
const ROW2 = [...SECTORS.slice(8, 16), ...SECTORS.slice(8, 16)];

function MarqueeRow({ items, reverse = false }: { items: typeof SECTORS; reverse?: boolean }) {
  return (
    <div style={{ overflow: 'hidden', width: '100%', maskImage: 'linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)' }}>
      <motion.div
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        style={{ display: 'flex', gap: 14, width: 'max-content' }}
      >
        {items.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 22px', borderRadius: 16,
            background: s.bg,
            border: `1px solid ${s.color}30`,
            flexShrink: 0,
            transition: 'all 0.2s',
          }}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'Cairo,sans-serif', whiteSpace: 'nowrap' }}>{s.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function SectorsSection() {
  return (
    <section style={{
      padding: 'clamp(80px,10vw,130px) 0',
      background: 'linear-gradient(180deg, var(--bg2) 0%, #050510 50%, var(--bg2) 100%)',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* bg grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}>

          <div className="section-label" style={{ color: '#8B5CF6', borderColor: 'rgba(139,92,246,0.4)', background: 'rgba(139,92,246,0.1)' }}>
            القطاعات
          </div>

          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 18 }}>
            مهما كان مشروعك<br />
            <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#06B6D4,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              عندنا حل
            </span>
          </h2>

          <p style={{ fontSize: 17, color: 'var(--text2)', maxWidth: 520, margin: '0 auto' }}>
            من الكافيه الصغير إلى المستشفى — نبني لك تجربة رقمية تناسب طبيعة عملك بالضبط.
          </p>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <MarqueeRow items={ROW1} />
        <MarqueeRow items={ROW2} reverse />
      </motion.div>

      {/* Bottom statement */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          style={{
            marginTop: 52,
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16,
          }}>
          {[
            { icon: '🎨', title: 'هوية بصرية كاملة', body: 'الألوان والاسم والشعار — كلها إلك أنت' },
            { icon: '⚡', title: '٢٤ ساعة للإطلاق', body: 'من التوقيع للنشر في يوم واحد' },
            { icon: '🔧', title: 'مخصص بالكامل', body: 'ما في حل جاهز — كل مشروع يُبنى من الصفر' },
            { icon: '🌍', title: '+١٦ قطاع', body: 'جرّبنا معاهم جميعاً وعارفين احتياجاتهم' },
          ].map((c, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.07 }}
              className="glass" style={{ padding: '20px 20px', borderRadius: 18, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#fff', marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{c.body}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: 40 }}>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 36px', borderRadius: 14,
              background: 'linear-gradient(135deg,#8B5CF6,#06B6D4)',
              color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 16, fontWeight: 900,
              textDecoration: 'none', boxShadow: '0 14px 40px rgba(139,92,246,0.35)',
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            تحدث معنا عن مشروعك
          </a>
        </motion.div>
      </div>
    </section>
  );
}
