import { motion } from 'framer-motion';
import { Smartphone, Globe, Wallet, Bot, BarChart3, Zap } from 'lucide-react';

const SERVICES = [
  {
    icon: Smartphone,
    title: 'تطبيقات الجوال',
    desc: 'iOS وAndroid بتجربة مستخدم تنافس كبرى التطبيقات العالمية.',
    tags: ['React Native', 'Swift', 'Kotlin'],
  },
  {
    icon: Globe,
    title: 'المواقع والمتاجر',
    desc: 'مواقع سريعة ومتاجر إلكترونية مربوطة بالدفع السعودي ومدى وVisa.',
    tags: ['Next.js', 'SEO', 'دفع إلكتروني'],
  },
  {
    icon: Wallet,
    title: 'Apple Wallet',
    desc: 'بطاقات ولاء تُضاف لمحفظة آبل وتُرسل Push Notifications مباشرة.',
    tags: ['PassKit', 'Push', 'QR Code'],
  },
  {
    icon: BarChart3,
    title: 'لوحات التحكم',
    desc: 'داشبورد يُظهر مبيعاتك وعملاءك وأداءك في الوقت الفعلي.',
    tags: ['Real-time', 'Analytics', 'تقارير'],
  },
  {
    icon: Bot,
    title: 'الأتمتة والـ AI',
    desc: 'ربط الأنظمة وأتمتة العمليات اليدوية عبر واتساب والـ API.',
    tags: ['WhatsApp API', 'OpenAI', 'Zapier'],
  },
  {
    icon: Zap,
    title: 'الأنظمة المتكاملة',
    desc: 'حلول ERP مخصصة لإدارة المخازن والموظفين والفواتير.',
    tags: ['ERP', 'HR', 'محاسبة'],
  },
];

const fade = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

export default function HorizontalServices() {
  return (
    <section id="services" style={{ padding: 'clamp(72px,10vw,120px) 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div className="section-label">خدماتنا</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.9rem,3.5vw,3rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
            كل ما تحتاجه<br /><span className="text-blue">تحت سقف واحد.</span>
          </h2>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,320px), 1fr))', gap: 1, border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {SERVICES.map(({ icon: Icon, title, desc, tags }, i) => (
            <motion.div key={title}
              custom={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ padding: 'clamp(24px,3vw,32px)', borderBottom: '1px solid var(--border)', borderLeft: '1px solid var(--border)', background: 'var(--bg)', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg)'}>

              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--blue-dim)', border: '1px solid rgba(79,142,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <Icon size={18} color="var(--blue)" />
              </div>

              <h3 style={{ fontSize: 'clamp(15px,1.5vw,17px)', fontWeight: 800, color: '#fff', marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, marginBottom: 16 }}>{desc}</p>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {tags.map(t => (
                  <span key={t} style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 6, border: '1px solid var(--border)', color: 'var(--text3)' }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
