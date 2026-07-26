import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Brown Dose',
    sub: 'تطبيق ولاء + Apple Wallet',
    desc: 'منظومة ولاء رقمية لكافيه Brown Dose تشمل بطاقة Apple Wallet، نقاط، وإشعارات Push.',
    tags: ['React Native', 'Apple Wallet', 'iOS / Android'],
    color: '#C8996C',
    emoji: '☕',
    link: '/brown-dose/',
    linkLabel: 'شاهد الديمو',
  },
  {
    title: 'عيادات تلقا',
    sub: 'نظام إدارة عيادات',
    desc: 'نظام متكامل لإدارة المواعيد والملفات الطبية والوصفات يعمل على الويب والجوال.',
    tags: ['React', 'Node.js', 'تطبيق جوال'],
    color: '#4F8EFF',
    emoji: '🏥',
    link: '/clinic-demo/',
    linkLabel: 'شاهد الديمو',
  },
  {
    title: 'حيز',
    sub: 'منصة عضوية',
    desc: 'منصة عضوية رقمية لحيز تشمل الاشتراكات والولاء والتواصل مع الأعضاء.',
    tags: ['Next.js', 'Membership', 'API'],
    color: '#A78BFA',
    emoji: '💎',
    link: '/haeez-loyalty/',
    linkLabel: 'شاهد الديمو',
  },
];

const fade = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }),
};

export default function ProjectsGallery() {
  return (
    <section id="projects" style={{ padding: 'clamp(72px,10vw,120px) 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="section-label">مشاريعنا</div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.9rem,3.5vw,3rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
              أعمال حقيقية<br /><span className="text-blue">تعمل الآن.</span>
            </h2>
          </div>
          <a href="https://wa.me/966551378531?text=أريد%20مشروعاً%20مثل%20هذه%20الأعمال" target="_blank" rel="noopener noreferrer"
            className="btn-ghost" style={{ fontSize: 13, padding: '10px 20px' }}>
            ابنِ مشروعك ←
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,320px), 1fr))', gap: 1, border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {PROJECTS.map(({ title, sub, desc, tags, color, emoji, link, linkLabel }, i) => (
            <motion.div key={title}
              custom={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ padding: 'clamp(24px,3vw,32px)', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg)', transition: 'background 0.2s', display: 'flex', flexDirection: 'column', gap: 16 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg)'}>

              {/* Icon + title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}12`, border: `1px solid ${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{emoji}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>{title}</div>
                  <div style={{ fontSize: 11, color: color, fontWeight: 700, marginTop: 2 }}>{sub}</div>
                </div>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, flex: 1 }}>{desc}</p>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {tags.map(t => (
                  <span key={t} style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 6, border: '1px solid var(--border)', color: 'var(--text3)' }}>{t}</span>
                ))}
              </div>

              <a href={link} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: color, textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.7'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}>
                <ExternalLink size={12} /> {linkLabel}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
