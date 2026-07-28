import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, HeartHandshake, Code2, Clock, Trophy } from 'lucide-react';

const POINTS = [
  {
    Icon: Zap, color: '#F59E0B',
    title: 'تسليم خلال ٣ أسابيع',
    desc: 'تطبيق ولاء كامل في ٣ أسابيع. لوحة تحكم في أسبوعين. نسير بخطوات واضحة بلا تأخير.',
    stat: '٣', statLabel: 'أسابيع فقط',
    gradient: 'linear-gradient(135deg,#F59E0B22,#EF444408)',
  },
  {
    Icon: Code2, color: '#8B5CF6',
    title: 'كود نظيف قابل للتطوير',
    desc: 'نستخدم React Native وNode.js وأحدث المعايير — كودك يكبر معك.',
    stat: '١٠٠٪', statLabel: 'موثّق ومنظّم',
    gradient: 'linear-gradient(135deg,#8B5CF622,#6366F108)',
  },
  {
    Icon: HeartHandshake, color: '#10B981',
    title: 'شريك لا مورّد',
    desc: 'نجلس معك، نفهم فكرتك، ونقترح ما يناسبها — لا نبيع باقات جاهزة.',
    stat: '١', statLabel: 'جلسة تفهمنا كل شيء',
    gradient: 'linear-gradient(135deg,#10B98122,#059669 08)',
  },
  {
    Icon: Shield, color: '#3B82F6',
    title: 'ضمان ٣ أشهر كاملة',
    desc: 'بعد التسليم نبقى معك ٩٠ يوماً دعم مجاني — أي خطأ، أي سؤال، أي تعديل.',
    stat: '٩٠', statLabel: 'يوم دعم مجاني',
    gradient: 'linear-gradient(135deg,#3B82F622,#2563EB08)',
  },
  {
    Icon: Clock, color: '#06B6D4',
    title: 'رد فوري على واتساب',
    desc: 'تواصل مباشر مع الفريق — لا مركز اتصال، لا تذاكر، لا انتظار.',
    stat: '< ٢ ساعة', statLabel: 'متوسط وقت الرد',
    gradient: 'linear-gradient(135deg,#06B6D422,#0891B208)',
  },
  {
    Icon: Trophy, color: '#EC4899',
    title: 'خبرة في السوق المحلي',
    desc: 'نفهم العميل السعودي، السوق المحلي، ومتطلبات المدفوعات والجهات الحكومية.',
    stat: '٣+', statLabel: 'قطاعات مُنجزة',
    gradient: 'linear-gradient(135deg,#EC489922,#BE185D08)',
  },
];

function WhyCard({ p, i }: { p: typeof POINTS[0]; i: number }) {
  const [hov, setHov] = useState(false);
  const { Icon, color, title, desc, stat, statLabel, gradient } = p;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22,1,0.36,1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', cursor: 'default' }}
    >
      {/* Animated border */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 22, padding: 1,
        background: hov
          ? `linear-gradient(135deg,${color},${color}44,transparent,${color}66)`
          : `linear-gradient(135deg,${color}20,transparent,${color}10)`,
        transition: 'background 0.4s', zIndex: 0,
      }}>
        <div style={{ borderRadius: 21, height: '100%', background: gradient }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '28px 26px' }}>

        {/* Glow blob */}
        <div style={{
          position: 'absolute', top: -50, right: -30, width: 160, height: 160,
          borderRadius: '50%',
          background: `radial-gradient(circle,${color}${hov?'22':'0e'} 0%,transparent 70%)`,
          transition: 'background 0.4s', pointerEvents: 'none',
        }} />

        {/* Icon + stat row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <motion.div
            animate={{ boxShadow: hov ? `0 0 24px ${color}45` : `0 0 0px ${color}00` }}
            transition={{ duration: 0.3 }}
            style={{
              width: 52, height: 52, borderRadius: 15,
              background: `${color}18`, border: `1px solid ${color}35`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <Icon size={24} color={color} strokeWidth={1.6} />
          </motion.div>

          <div style={{ textAlign: 'left' }}>
            <div style={{
              fontSize: 28, fontWeight: 900, lineHeight: 1,
              background: `linear-gradient(135deg,${color},${color}aa)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontFamily: 'Cairo, sans-serif',
            }}>
              {stat}
            </div>
            <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.35)', fontWeight: 700, whiteSpace: 'nowrap', marginTop: 3 }}>
              {statLabel}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 17, fontWeight: 900, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.025em', lineHeight: 1.25 }}>
          {title}
        </h3>

        {/* Desc */}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.48)', lineHeight: 1.8, margin: 0, fontFamily: 'Cairo, sans-serif' }}>
          {desc}
        </p>

        {/* Bottom accent */}
        <div style={{
          position: 'absolute', bottom: 0, left: 24, right: 24, height: 1.5,
          background: `linear-gradient(90deg,transparent,${color}${hov?'60':'28'},transparent)`,
          transition: 'background 0.3s',
        }} />
      </div>
    </motion.div>
  );
}

/* ── Large animated stat number at top ── */
function TopStat({ val, label, color }: { val: string; label: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      style={{ textAlign: 'center', padding: '0 16px' }}>
      <div style={{
        fontSize: 'clamp(2.4rem,5vw,3.8rem)', fontWeight: 900, lineHeight: 1,
        background: `linear-gradient(135deg,${color},${color}77)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        fontFamily: 'Cairo, sans-serif',
      }}>
        {val}
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginTop: 6 }}>{label}</div>
    </motion.div>
  );
}

export default function WhyUs() {
  return (
    <section style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse,rgba(139,92,246,0.065) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label">لماذا تلقا تك</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.4rem)', letterSpacing: '-0.035em', lineHeight: 1.1 }}>
            ليس مجرد شركة برمجة —{' '}
            <span className="grad">شريكك الرقمي</span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 16, marginTop: 14, maxWidth: 460, margin: '14px auto 0' }}>
            نبني منتجات تشتغل، تُرضي العميل، وتكبر معك.
          </p>
        </motion.div>

        {/* Top stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{
            display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0,
            marginBottom: 56, padding: '28px 0',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
          }}>
          {/* Dividers */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.015)', borderRadius: 0 }} />
          <TopStat val="٢٠٠+" label="مشروع مُسلَّم" color="#8B5CF6" />
          <div style={{ width: 1, background: 'rgba(255,255,255,0.08)', margin: '0 8px' }} />
          <TopStat val="٣ أسابيع" label="متوسط التسليم" color="#F59E0B" />
          <div style={{ width: 1, background: 'rgba(255,255,255,0.08)', margin: '0 8px' }} />
          <TopStat val="٩٠ يوم" label="ضمان مجاني" color="#10B981" />
          <div style={{ width: 1, background: 'rgba(255,255,255,0.08)', margin: '0 8px' }} />
          <TopStat val="٤٨٪" label="زيادة الاحتفاظ بالعملاء" color="#06B6D4" />
          <div style={{ width: 1, background: 'rgba(255,255,255,0.08)', margin: '0 8px' }} />
          <TopStat val="٧/٧" label="دعم فني مستمر" color="#EC4899" />
        </motion.div>

        {/* Feature cards grid */}
        <div className="whyus-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {POINTS.map((p, i) => (
            <WhyCard key={p.title} p={p} i={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="/talqa-tech/about"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 28px', borderRadius: 12,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
              color: 'rgba(255,255,255,0.65)', fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
              textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='#fff'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.22)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.65)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.10)'; }}>
            تعرف على فريقنا ←
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .whyus-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 580px) { .whyus-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
