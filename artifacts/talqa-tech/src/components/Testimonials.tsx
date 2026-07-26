import { motion } from 'framer-motion';

const REVIEWS = [
  { name: 'أحمد القحطاني', role: 'صاحب Brown Dose', text: 'من أول يوم والتطبيق شغّال — عملاؤنا يضيفون البطاقة بأنفسهم ونشوف زيادة في الزيارات المتكررة.', stars: 5, color: '#F59E0B', emoji: '☕' },
  { name: 'د. سارة الزهراني', role: 'عيادة صحة', text: 'وفّر علينا ساعات يومياً في إدارة المواعيد. النظام سهل جداً والدعم متوفر دائماً.', stars: 5, color: '#3B82F6', emoji: '🏥' },
  { name: 'خالد العمري', role: 'مدير تسويق', text: 'فريق تلقا تك يفهم الفكرة من أول جلسة ويترجمها بشكل أفضل مما تخيّلته.', stars: 5, color: '#8B5CF6', emoji: '🚀' },
];

export default function Testimonials() {
  return (
    <section style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 500, height: 500, top: '20%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(139,92,246,0.06)', animationDelay: '-2s' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label">آراء العملاء</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            ماذا يقول{' '}
            <span className="grad">عملاؤنا</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 20 }}>
          {REVIEWS.map(({ name, role, text, stars, color, emoji }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -4 }}
              style={{
                padding: 28, borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${color}25`,
                display: 'flex', flexDirection: 'column', gap: 16,
                position: 'relative', overflow: 'hidden',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${color}12`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
            >
              <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `${color}10`, filter: 'blur(20px)', pointerEvents: 'none' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {Array.from({ length: stars }).map((_, j) => (
                    <span key={j} style={{ color: '#F59E0B', fontSize: 14 }}>★</span>
                  ))}
                </div>
                <span style={{ fontSize: 24 }}>{emoji}</span>
              </div>

              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.85, flex: 1 }}>"{text}"</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: `1px solid ${color}20` }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${color}20`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 900, color, flexShrink: 0 }}>
                  {name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 600 }}>{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
