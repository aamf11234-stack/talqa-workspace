import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, Coffee, HeartPulse, Gem } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Brown Dose',
    sub: 'تطبيق ولاء + Apple Wallet',
    desc: 'منظومة ولاء رقمية لكافيه Brown Dose — بطاقة Apple Wallet، نقاط، وإشعارات Push تلقائية.',
    tags: ['React Native', 'Apple Wallet', 'iOS / Android'],
    color: '#C8996C',
    grad: 'linear-gradient(135deg, #3D1F0A, #1a0e05)',
    Icon: Coffee,
    link: '/brown-dose/',
  },
  {
    title: 'عيادات تلقا',
    sub: 'نظام إدارة عيادات',
    desc: 'نظام متكامل لإدارة المواعيد والملفات الطبية والوصفات — ويب وجوال بتجربة واحدة.',
    tags: ['React', 'Node.js', 'تطبيق جوال'],
    color: '#3B82F6',
    grad: 'linear-gradient(135deg, #071835, #030d1a)',
    Icon: HeartPulse,
    link: '/clinic-demo/',
  },
  {
    title: 'حيز',
    sub: 'منصة عضوية رقمية',
    desc: 'منصة عضوية متكاملة لحيز — اشتراكات، ولاء، بطاقة رقمية، وتواصل مع الأعضاء.',
    tags: ['Next.js', 'Membership', 'NFC'],
    color: '#A78BFA',
    grad: 'linear-gradient(135deg, #150830, #0a0318)',
    Icon: Gem,
    link: '/haeez-loyalty/',
  },
];

export default function ProjectsGallery() {
  return (
    <section id="projects" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 600, height: 400, top: '40%', right: '-10%', background: 'rgba(59,130,246,0.07)', animationDelay: '-5s' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="section-label">مشاريعنا</div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              أعمال حقيقية{' '}
              <span className="grad">تعمل الآن</span>
            </h2>
          </div>
          <a href="https://wa.me/966551378531?text=أريد%20مشروعاً%20مثل%20هذه%20الأعمال" target="_blank" rel="noopener noreferrer"
            className="btn-ghost" style={{ fontSize: 14 }}>
            ابنِ مشروعك <ArrowLeft size={14} />
          </a>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 20 }}>
          {PROJECTS.map(({ title, sub, desc, tags, color, grad, Icon, link }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -5 }}
              style={{ borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: `1px solid ${color}25`, transition: 'box-shadow 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 48px ${color}20`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
            >
              {/* Card header */}
              <div style={{ padding: '28px 28px 24px', background: grad, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: `${color}15` }} />
                <div style={{ position: 'absolute', bottom: -20, left: 20, width: 80, height: 80, borderRadius: '50%', background: `${color}10` }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 15, background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <Icon size={26} strokeWidth={1.5} color={color} />
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{sub}</div>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '22px 28px 28px', background: 'rgba(255,255,255,0.03)', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, flex: 1 }}>{desc}</p>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {tags.map(t => (
                    <span key={t} style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99, background: `${color}15`, border: `1px solid ${color}30`, color }}>{t}</span>
                  ))}
                </div>

                <a href={link} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 800, color, textDecoration: 'none', transition: 'gap 0.2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.gap = '12px')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.gap = '7px')}>
                  شاهد الديمو <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="/talqa-tech/projects"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.transform='none'; }}>
            شاهد كل الأعمال ←
          </a>
        </div>
      </div>
    </section>
  );
}
