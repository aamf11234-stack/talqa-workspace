import { motion } from 'framer-motion';

const steps = [
  { n: '01', title: 'استشارة مجانية',   desc: 'نجلس معك، نفهم فكرتك ومتطلباتك والجدول الزمني. لا التزام، لا دفع.', color: '#4F8EFF' },
  { n: '02', title: 'عرض سعر مفصّل',    desc: 'خلال ٢٤ ساعة تصلك ميزانية واضحة وخطة تسليم. لا أسعار مفاجئة.', color: '#A78BFA' },
  { n: '03', title: 'بناء وتحديثات',     desc: 'نبني مع تحديثات أسبوعية. أنت دائماً على دراية بكل خطوة.', color: '#34D399' },
  { n: '04', title: 'تسليم ودعم مستمر', desc: 'تسليم مع تدريب كامل، ودعم تقني ما بعد الإطلاق بلا انقطاع.', color: '#FB923C' },
];

export default function Process() {
  return (
    <section id="process" style={{ padding: 'clamp(72px,10vw,120px) 0', background: 'var(--bg2)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(79,142,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(40px,6vw,72px)' }}>
          <div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4F8EFF', marginBottom: 16 }}>طريقة عملنا</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
              style={{ fontWeight: 900, fontSize: 'clamp(1.7rem,3.5vw,2.8rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
              من الفكرة إلى الإطلاق<br />
              <span className="text-blue">في أربع خطوات.</span>
            </motion.h2>
          </div>
        </div>

        {/* Desktop: horizontal row */}
        <div className="process-desktop" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
          {steps.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
              style={{ padding: '36px 28px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none', position: 'relative' }}>
              {i > 0 && <div style={{ position: 'absolute', top: 44, right: -5, width: 9, height: 9, borderRadius: '50%', background: `${s.color}40`, border: `2px solid ${s.color}70` }} />}
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: `${s.color}80`, marginBottom: 18 }}>STEP {s.n}</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1, marginBottom: -6, letterSpacing: '-0.04em', userSelect: 'none' }}>{s.n}</div>
              <h3 style={{ fontSize: 17, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12, marginTop: 4 }}>{s.title}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.9, color: 'rgba(255,255,255,0.38)' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical list */}
        <div className="process-mobile" style={{ display: 'none', flexDirection: 'column', gap: 0, position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: 20, width: 1, background: 'rgba(255,255,255,0.06)', zIndex: 0 }} />
          {steps.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
              style={{ display: 'flex', gap: 18, paddingBottom: i < 3 ? 32 : 0, position: 'relative', zIndex: 1 }}>
              {/* Step indicator */}
              <div style={{ flex: 1, paddingTop: 4 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: `${s.color}80`, marginBottom: 8 }}>STEP {s.n}</div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.85, color: 'rgba(255,255,255,0.4)' }}>{s.desc}</p>
              </div>
              {/* Node */}
              <div style={{ width: 40, height: 40, borderRadius: 11, background: `${s.color}12`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13, fontWeight: 900, color: s.color }}>
                {s.n}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:680px){
          .process-desktop{display:none!important}
          .process-mobile{display:flex!important}
        }
      `}</style>
    </section>
  );
}
