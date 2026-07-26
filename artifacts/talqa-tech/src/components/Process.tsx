import { motion } from 'framer-motion';

const steps = [
  { n: '01', title: 'استشارة مجانية',      desc: 'نجلس معك، نفهم فكرتك ومتطلباتك والجدول الزمني. لا التزام، لا دفع.' },
  { n: '02', title: 'عرض سعر مفصّل',       desc: 'خلال ٢٤ ساعة تصلك ميزانية واضحة وخطة تسليم. لا أسعار مفاجئة.' },
  { n: '03', title: 'بناء وتحديثات',        desc: 'نبني مع تحديثات أسبوعية منتظمة حتى تكون دائماً على دراية بكل خطوة.' },
  { n: '04', title: 'تسليم ودعم مستمر',    desc: 'تسليم مع تدريب كامل، ودعم تقني ما بعد الإطلاق بلا انقطاع.' },
];

export default function Process() {
  return (
    <section id="process" style={{
      padding: '120px 0', position: 'relative',
      background: 'var(--bg-2)',
    }}>
      <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, height: 1, background: 'rgba(255,255,255,0.07)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 64 }}>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#D4A843', marginBottom: 16 }}
            >طريقة عملنا</motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}
            >
              من الفكرة إلى الإطلاق<br />
              <span className="text-gold">في أربع خطوات.</span>
            </motion.h2>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '36px 28px',
                borderRight: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                position: 'relative',
              }}
            >
              {/* Connector dot */}
              {i > 0 && (
                <div style={{
                  position: 'absolute', top: 44, right: -5, width: 9, height: 9,
                  borderRadius: '50%', background: 'rgba(212,168,67,0.3)',
                  border: '2px solid rgba(212,168,67,0.5)',
                }} />
              )}

              <div style={{
                fontSize: 11, fontWeight: 800, letterSpacing: '0.1em',
                color: 'rgba(212,168,67,0.5)', marginBottom: 20,
                fontVariantNumeric: 'tabular-nums',
              }}>STEP {s.n}</div>

              <div style={{
                fontSize: 32, fontWeight: 900, color: 'rgba(255,255,255,0.06)',
                lineHeight: 1, marginBottom: -8, letterSpacing: '-0.04em',
                userSelect: 'none',
              }}>{s.n}</div>

              <h3 style={{
                fontSize: 18, fontWeight: 900, color: '#fff',
                letterSpacing: '-0.02em', marginBottom: 12, marginTop: 4,
              }}>{s.title}</h3>

              <p style={{
                fontSize: 13.5, lineHeight: 1.9,
                color: 'rgba(255,255,255,0.4)',
              }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
