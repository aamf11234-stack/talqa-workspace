import { motion } from 'framer-motion';

const REVIEWS = [
  { name: 'أحمد القحطاني', role: 'صاحب Brown Dose', text: 'من أول يوم والتطبيق شغّال — عملاؤنا يضيفون البطاقة بأنفسهم ونشوف زيادة في الزيارات المتكررة.', stars: 5 },
  { name: 'د. سارة الزهراني', role: 'عيادة صحة', text: 'وفّر علينا ساعات يومياً في إدارة المواعيد. النظام سهل جداً والدعم متوفر دائماً.', stars: 5 },
  { name: 'خالد العمري', role: 'مدير تسويق', text: 'فريق تلقا تك يفهم الفكرة من أول جلسة ويترجمها بشكل أفضل مما تخيّلته.', stars: 5 },
];

export default function Testimonials() {
  return (
    <section style={{ padding: 'clamp(72px,10vw,120px) 0', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>آراء العملاء</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.9rem,3.5vw,3rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
            ماذا يقول<br /><span className="text-blue">عملاؤنا.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,300px), 1fr))', gap: 1, border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {REVIEWS.map(({ name, role, text, stars }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ padding: 'clamp(24px,3vw,32px)', borderRight: '1px solid var(--border)', background: 'var(--bg2)', display: 'flex', flexDirection: 'column', gap: 16, transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg2)'}>

              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: stars }).map((_, i) => (
                  <span key={i} style={{ color: '#F59E0B', fontSize: 13 }}>★</span>
                ))}
              </div>

              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, flex: 1 }}>"{text}"</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--blue-dim)', border: '1px solid rgba(79,142,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: 'var(--blue)', flexShrink: 0 }}>
                  {name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
