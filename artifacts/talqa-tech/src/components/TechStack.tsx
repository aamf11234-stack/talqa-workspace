import { motion } from 'framer-motion';

const STACK = [
  { name: 'React Native', cat: 'Mobile', color: '#61DAFB', emoji: '⚛️' },
  { name: 'iOS (Swift)', cat: 'Mobile', color: '#FF6B6B', emoji: '🍎' },
  { name: 'Android (Kotlin)', cat: 'Mobile', color: '#A4C639', emoji: '🤖' },
  { name: 'Apple PassKit', cat: 'Wallet', color: '#4F8EFF', emoji: '💳' },
  { name: 'Push Notifications', cat: 'Wallet', color: '#A78BFA', emoji: '🔔' },
  { name: 'Apple Watch', cat: 'Wallet', color: '#9CA3AF', emoji: '⌚' },
  { name: 'Node.js', cat: 'Backend', color: '#68A063', emoji: '🟢' },
  { name: 'PostgreSQL', cat: 'Backend', color: '#336791', emoji: '🐘' },
  { name: 'Supabase', cat: 'Backend', color: '#3ECF8E', emoji: '⚡' },
  { name: 'WhatsApp API', cat: 'Integration', color: '#25D366', emoji: '💬' },
  { name: 'Next.js', cat: 'Frontend', color: '#ffffff', emoji: '▲' },
  { name: 'TypeScript', cat: 'Frontend', color: '#3178C6', emoji: '📘' },
  { name: 'Framer Motion', cat: 'Frontend', color: '#FF0066', emoji: '🎬' },
  { name: 'REST API', cat: 'Integration', color: '#FB923C', emoji: '🔗' },
  { name: 'Firebase', cat: 'Backend', color: '#FFCA28', emoji: '🔥' },
  { name: 'AWS / Cloud', cat: 'DevOps', color: '#FF9900', emoji: '☁️' },
];

const CATS = ['الكل', 'Mobile', 'Wallet', 'Backend', 'Frontend', 'Integration', 'DevOps'];

export default function TechStack() {
  return (
    <section style={{ padding: '100px 0', background: 'var(--bg3)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', height: 1, background: 'rgba(255,255,255,0.07)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4F8EFF', marginBottom: 16 }}>التقنيات المستخدمة</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
              style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.6rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
              نبني بأفضل الأدوات.<br /><span className="text-blue">نتائج حقيقية، لا تجارب.</span>
            </motion.h2>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', fontWeight: 600, padding: '10px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)' }}>
            {STACK.length}+ تقنية محترفة
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))', gap: 10 }}>
          {STACK.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22,1,0.36,1] }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
              style={{ padding: '20px 18px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', cursor: 'default', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${s.color}30`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${s.color}15`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 2, background: s.color, borderRadius: '16px 16px 0 0', opacity: 0.5 }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 24 }}>{s.emoji}</span>
                <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 7px', borderRadius: 5, background: `${s.color}12`, color: s.color, letterSpacing: '0.08em' }}>{s.cat}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>{s.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
