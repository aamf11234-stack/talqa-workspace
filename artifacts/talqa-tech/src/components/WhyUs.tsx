import { motion } from 'framer-motion';
import { Zap, Shield, HeartHandshake, Code2, Clock, Trophy } from 'lucide-react';

const POINTS = [
  {
    Icon: Zap, color: '#F59E0B',
    title: 'تسليم سريع',
    desc: 'تطبيق ولاء كامل في ٣ أسابيع. لوحة تحكم في أسبوعين. نسير بخطوات واضحة بلا تأخير.',
    stat: '٣', statLabel: 'أسابيع في المتوسط',
  },
  {
    Icon: Code2, color: '#8B5CF6',
    title: 'كود نظيف ومدار',
    desc: 'نستخدم React Native وNode.js وأحدث المعايير التقنية — كودك قابل للتطوير معك.',
    stat: '١٠٠٪', statLabel: 'كود موثّق',
  },
  {
    Icon: HeartHandshake, color: '#10B981',
    title: 'شريك لا مورّد',
    desc: 'نجلس معك، نفهم فكرتك، ونقترح ما يناسبها — لا نبيع باقات جاهزة.',
    stat: '١', statLabel: 'جلسة تفهمنا كل شيء',
  },
  {
    Icon: Shield, color: '#3B82F6',
    title: 'ضمان ٣ أشهر',
    desc: 'بعد التسليم نبقى معك ٣ أشهر دعم مجاني — أي خطأ، أي سؤال، أي تعديل.',
    stat: '٩٠', statLabel: 'يوم دعم مجاني',
  },
  {
    Icon: Clock, color: '#06B6D4',
    title: 'رد فوري',
    desc: 'واتساب مباشر مع الفريق — لا مركز اتصال، لا تذاكر، لا انتظار.',
    stat: '< ٢', statLabel: 'ساعة متوسط الرد',
  },
  {
    Icon: Trophy, color: '#EC4899',
    title: 'تجربة محلية',
    desc: 'نفهم السوق السعودي، العميل المحلي، ومتطلبات الجهات الحكومية والمدفوعات.',
    stat: '٣+', statLabel: 'قطاعات مخدومة',
  },
];

export default function WhyUs() {
  return (
    <section style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 600, height: 400, top: '30%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(139,92,246,0.06)', animationDelay: '-4s' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label">لماذا تلقا تك</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            ليس مجرد شركة برمجة —{' '}
            <span className="grad">شريكك الرقمي</span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 16, marginTop: 14, maxWidth: 480, margin: '14px auto 0' }}>
            نبني منتجات تشتغل، تُرضي العميل، وتكبر معك.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {POINTS.map(({ Icon, color, title, desc, stat, statLabel }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.55 }}
              whileHover={{ y: -4 }}
              style={{
                padding: '26px 26px', borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${color}25`,
                display: 'flex', gap: 18, alignItems: 'flex-start',
                position: 'relative', overflow: 'hidden',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${color}15`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
            >
              <div style={{ position: 'absolute', top: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: `${color}10`, filter: 'blur(20px)', pointerEvents: 'none' }} />

              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} color={color} />
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{title}</h3>
                  <div style={{ textAlign: 'left', flexShrink: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color, lineHeight: 1 }}>{stat}</div>
                    <div style={{ fontSize: 9, color: 'var(--text3)', fontWeight: 600, whiteSpace: 'nowrap' }}>{statLabel}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="/talqa-tech/about"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.transform='none'; }}>
            تعرف على فريقنا ←
          </a>
        </div>
      </div>
    </section>
  );
}
