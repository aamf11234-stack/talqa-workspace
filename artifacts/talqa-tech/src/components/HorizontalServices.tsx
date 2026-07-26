import { motion } from 'framer-motion';
import { Smartphone, Globe, Wallet, Bot, Calendar, Zap } from 'lucide-react';

const services = [
  {
    Icon: Smartphone, color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)',
    title: 'تطبيقات جوال', sub: 'iOS & Android',
    desc: 'تطبيقات احترافية تعمل على كل الأجهزة — سرعة، تصميم، وتجربة مستخدم لا تُنسى.',
    tags: ['React Native', 'Push Notifications', 'App Store'],
  },
  {
    Icon: Globe, color: '#3B82F6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.25)',
    title: 'مواقع ولوحات تحكم', sub: 'Web Platform',
    desc: 'مواقع سريعة وجذابة مع لوحات تحكم تُريحك من العمليات اليومية.',
    tags: ['React', 'Dashboard', 'Analytics'],
  },
  {
    Icon: Wallet, color: '#06B6D4', bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.25)',
    title: 'Apple Wallet', sub: 'بطاقات رقمية',
    desc: 'بطاقات ولاء وعضوية وحجوزات مباشرة في هاتف عميلك — بدون تطبيق.',
    tags: ['PassKit', 'NFC', 'Boarding Pass'],
  },
  {
    Icon: Bot, color: '#10B981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)',
    title: 'أتمتة واتساب', sub: 'WhatsApp API',
    desc: 'ردود فورية، إشعارات تلقائية، وتواصل مع عملائك على مدار الساعة.',
    tags: ['واتساب API', 'Chatbot', 'Auto-reply'],
  },
  {
    Icon: Calendar, color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)',
    title: 'نظام الحجوزات', sub: 'Booking System',
    desc: 'احجز، تذكير، وإلغاء — كل شيء تلقائي ومرتب ومريح للعميل والموظف.',
    tags: ['Calendar', 'Reminders', 'Reports'],
  },
  {
    Icon: Zap, color: '#EC4899', bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.25)',
    title: 'حلول مخصصة', sub: 'Custom Solutions',
    desc: 'API تكاملات، أنظمة بيانات، وأي فكرة عندك — نبنيها معك من الصفر.',
    tags: ['API Integration', 'Custom', 'Automation'],
  },
];

export default function HorizontalServices() {
  return (
    <section id="services" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      {/* bg gradient */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '80%', height: '60%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label">خدماتنا</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            كل ما تحتاجه{' '}
            <span className="grad">تحت سقف واحد</span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 16, marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
            من فكرة في ذهنك إلى منتج رقمي في يد عميلك — نبني كل شيء.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {services.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${s.border}`,
                borderRadius: 20, padding: 28,
                cursor: 'default', position: 'relative', overflow: 'hidden',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px ${s.bg}`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              {/* Corner glow */}
              <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: s.bg, filter: 'blur(40px)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative' }}>
                {/* Icon */}
                <div style={{ width: 52, height: 52, borderRadius: 14, background: s.bg, border: `1px solid ${s.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <s.Icon size={24} color={s.color} />
                </div>

                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: s.color, marginBottom: 8 }}>{s.sub}</div>
                <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 10, letterSpacing: '-0.02em' }}>{s.title}</h3>
                <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{s.desc}</p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.tags.map(t => (
                    <span key={t} style={{
                      padding: '3px 10px', borderRadius: 99,
                      background: s.bg, border: `1px solid ${s.border}`,
                      fontSize: 11, fontWeight: 700, color: s.color,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
