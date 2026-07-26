import { motion } from 'framer-motion';
import { ShieldCheck, Clock, HeartHandshake, Award } from 'lucide-react';

const ITEMS = [
  { icon: ShieldCheck,    label: 'كود مصدري كامل', desc: 'تملك كل سطر في مشروعك.' },
  { icon: Clock,          label: 'تسليم في الموعد', desc: 'نلتزم بالجدول الزمني المتفق عليه.' },
  { icon: HeartHandshake, label: 'دعم بعد التسليم', desc: '٣ أشهر دعم مجاني مع كل مشروع.' },
  { icon: Award,          label: 'جودة عالمية', desc: 'معايير تقنية تنافس أكبر الشركات.' },
];

export default function TrustBar() {
  return (
    <section style={{ padding: 'clamp(56px,8vw,96px) 0', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,220px), 1fr))', gap: 1, border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {ITEMS.map(({ icon: Icon, label, desc }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.45 }}
              style={{ padding: 'clamp(22px,3vw,30px)', borderRight: '1px solid var(--border)', background: 'var(--bg2)', display: 'flex', flexDirection: 'column', gap: 10, transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg2)'}>
              <Icon size={20} color="var(--blue)" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
