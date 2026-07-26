import { motion } from 'framer-motion';

const STEPS = [
  { n: '01', title: 'جلسة الفهم',      desc: 'نجلس معك ونفهم فكرتك ومشروعك بالتفصيل — مجاناً وبدون التزام.' },
  { n: '02', title: 'التصميم والخطة',  desc: 'نصمم الواجهات ونرسل خطة العمل والجدول الزمني للاعتماد.' },
  { n: '03', title: 'البناء والتطوير', desc: 'نبني المشروع بمعاييرنا التقنية مع تقارير أسبوعية لك.' },
  { n: '04', title: 'التسليم والدعم',  desc: 'نطلق المشروع ونتابع معك ٣ أشهر دعم مجاناً بعد التسليم.' },
];

export default function Process() {
  return (
    <section id="process" style={{ padding: 'clamp(72px,10vw,120px) 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <div style={{ marginBottom: 52 }}>
          <div className="section-label">كيف نعمل</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.9rem,3.5vw,3rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
            من الفكرة<br /><span className="text-blue">إلى المنتج الحي.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,240px), 1fr))', gap: 1, border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {STEPS.map(({ n, title, desc }, i) => (
            <motion.div key={n}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{ padding: 'clamp(24px,3vw,32px)', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg)', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg)'}>
              <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--blue)', letterSpacing: '0.1em', marginBottom: 14, fontFamily: 'monospace' }}>{n}</div>
              <div style={{ fontSize: 'clamp(15px,1.5vw,17px)', fontWeight: 800, color: '#fff', marginBottom: 10 }}>{title}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75 }}>{desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
