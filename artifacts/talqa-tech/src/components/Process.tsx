import { motion } from 'framer-motion';
import { MessageCircle, Figma, Code2, Rocket } from 'lucide-react';

const STEPS = [
  { n: '01', Icon: MessageCircle, color: '#8B5CF6', title: 'جلسة الفهم',      desc: 'نجلس معك ونفهم فكرتك ومشروعك بالتفصيل — مجاناً وبدون التزام.' },
  { n: '02', Icon: Figma,        color: '#3B82F6', title: 'التصميم والخطة',  desc: 'نصمم الواجهات ونرسل خطة العمل والجدول الزمني للاعتماد.' },
  { n: '03', Icon: Code2,        color: '#06B6D4', title: 'البناء والتطوير', desc: 'نبني المشروع بمعاييرنا التقنية مع تقارير أسبوعية لك.' },
  { n: '04', Icon: Rocket,       color: '#10B981', title: 'التسليم والدعم',  desc: 'نطلق المشروع ونتابع معك ٣ أشهر دعم مجاناً بعد التسليم.' },
];

export default function Process() {
  return (
    <section id="process" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 400, height: 400, bottom: '-10%', right: '10%', background: 'rgba(16,185,129,0.07)', animationDelay: '-3s' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ color: '#10B981', borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)' }}>كيف نعمل</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            من الفكرة إلى{' '}
            <span style={{ background: 'linear-gradient(135deg, #10B981, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>المنتج الحي</span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 16, marginTop: 14, maxWidth: 440, margin: '14px auto 0' }}>
            ٤ خطوات واضحة — من اليوم الأول حتى الإطلاق ودعم ما بعده.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px,1fr))', gap: 20 }}>
          {STEPS.map(({ n, Icon, color, title, desc }, i) => (
            <motion.div key={n}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -4 }}
              style={{
                padding: 28, borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${color}30`,
                position: 'relative', overflow: 'hidden',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${color}15`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
            >
              <div style={{ position: 'absolute', top: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: `${color}10`, filter: 'blur(30px)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} color={color} />
                  </div>
                  <span style={{ fontFamily: 'monospace', fontSize: 28, fontWeight: 900, color: `${color}30`, letterSpacing: '-0.05em' }}>{n}</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 10 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75 }}>{desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
