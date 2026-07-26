import { motion } from 'framer-motion';
import { ShieldCheck, Clock3, HeartHandshake, Star } from 'lucide-react';

const items = [
  { Icon: ShieldCheck,    title: 'جودة مضمونة',        desc: 'كل مشروع يخضع لاختبار شامل قبل التسليم.' },
  { Icon: Clock3,         title: 'الالتزام بالمواعيد', desc: 'نسلّم في الموعد ونُبلّغك بكل تحديث أسبوعي.' },
  { Icon: HeartHandshake, title: 'شراكة طويلة الأمد',  desc: 'نحن شريكك التقني قبل وبعد الإطلاق.' },
  { Icon: Star,           title: 'خبرة موثّقة',        desc: 'مشاريع في المطاعم، العيادات، الصالونات، والتجزئة.' },
];

export default function TrustBar() {
  return (
    <section style={{ padding: '80px 0', background: 'var(--bg)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 36 }}>
          {items.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22,1,0.36,1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(79,142,255,0.08)', color: '#4F8EFF', border: '1px solid rgba(79,142,255,0.13)' }}>
                <item.Icon size={20} strokeWidth={1.6} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.36)' }}>{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
