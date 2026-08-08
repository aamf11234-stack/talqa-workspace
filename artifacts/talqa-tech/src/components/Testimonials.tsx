import { motion } from 'framer-motion';

const REVIEWS = [
  { name: 'أحمد القحطاني', role: 'صاحب Brown Dose', text: 'من أول يوم والتطبيق شغّال — عملاؤنا يضيفون البطاقة بأنفسهم ونشوف زيادة في الزيارات المتكررة.', stars: 5, color: '#F59E0B' },
  { name: 'د. سارة الزهراني', role: 'عيادة صحة', text: 'وفّر علينا ساعات يومياً في إدارة المواعيد. النظام سهل جداً والدعم متوفر دائماً.', stars: 5, color: '#3B82F6' },
  { name: 'خالد العمري', role: 'مدير تسويق', text: 'فريق تلقا تك يفهم الفكرة من أول جلسة ويترجمها بشكل أفضل مما تخيّلته.', stars: 5, color: '#8B5CF6' },
];

export default function Testimonials() {
  return (
    <section style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 600, height: 600, top: '10%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(139,92,246,0.05)', animationDelay: '-2s' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label">آراء العملاء</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2.2rem,4.5vw,3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            ماذا يقول{' '}
            <span className="grad">عملاؤنا</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))', gap: 24 }}>
          {REVIEWS.map(({ name, role, text, stars, color }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -6 }}
              style={{
                padding: 36, borderRadius: 24,
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid rgba(255,255,255,0.06)`,
                display: 'flex', flexDirection: 'column', gap: 20,
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${color}15`;
                (e.currentTarget as HTMLElement).style.borderColor = `${color}30`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
              }}
            >
              <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `${color}10`, filter: 'blur(30px)', pointerEvents: 'none' }} />

              <div style={{ display: 'flex', gap: 4 }}>
                {Array.from({ length: stars }).map((_, j) => (
                  <span key={j} style={{ color: '#F59E0B', fontSize: 16 }}>★</span>
                ))}
              </div>

              <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.85, flex: 1 }}>"{text}"</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 20, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color, flexShrink: 0 }}>
                  {name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 600 }}>{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
