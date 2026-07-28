import { motion } from 'framer-motion';
import { UtensilsCrossed, Dumbbell, CalendarDays, ShoppingBag, Stethoscope, Building2 } from 'lucide-react';

const SECTORS = [
  {
    icon: UtensilsCrossed,
    title: 'المطاعم والكافيهات',
    description: 'قائمة QR، طلبات أونلاين، حجوزات، ونظام ولاء متكامل',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.15)',
  },
  {
    icon: Dumbbell,
    title: 'النوادي الرياضية',
    description: 'اشتراكات، جداول حصص، بطاقات عضوية رقمية، وتتبع الأداء',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.15)',
  },
  {
    icon: Stethoscope,
    title: 'العيادات والمراكز الطبية',
    description: 'حجز مواعيد، ملفات مرضى، تذكيرات تلقائية، وتليميديسن',
    color: '#06B6D4',
    glow: 'rgba(6,182,212,0.15)',
  },
  {
    icon: CalendarDays,
    title: 'الفعاليات',
    description: 'صفحات فعاليات، تسجيل حضور، تذاكر رقمية، وإدارة ضيوف',
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.15)',
  },
  {
    icon: ShoppingBag,
    title: 'المتاجر الإلكترونية',
    description: 'متجر كامل، لوحة تحكم، دفع إلكتروني، وتقارير مبيعات',
    color: '#EC4899',
    glow: 'rgba(236,72,153,0.15)',
  },
  {
    icon: Building2,
    title: 'الشركات والمؤسسات',
    description: 'مواقع احترافية، أنظمة CRM، بوابات موظفين، وتقارير تشغيلية',
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.15)',
  },
];

export default function LandingSectors() {
  return (
    <section style={{
      background: 'var(--bg)',
      paddingTop: 96,
      paddingBottom: 96,
      paddingInline: 24,
      direction: 'rtl',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 16px', borderRadius: 99,
              border: '1px solid rgba(139,92,246,0.25)',
              background: 'rgba(139,92,246,0.08)',
              fontSize: 12, fontWeight: 700,
              color: 'rgba(167,139,250,0.9)', letterSpacing: '0.05em',
              marginBottom: 20,
            }}>
              لكل قطاع، حل مُصمَّم له
            </span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
            }}>
              نبني لكل{' '}
              <span className="grad">قطاع</span>
              {' '}بلغته
            </h2>
            <p style={{
              fontSize: 16, fontWeight: 400,
              color: 'var(--text2)', marginTop: 16,
              maxWidth: 480, margin: '16px auto 0',
              lineHeight: 1.7,
            }}>
              من المطعم للعيادة للمتجر — نفهم احتياجك قبل أن نبني.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {SECTORS.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, borderColor: sector.color + '40' }}
                style={{
                  background: 'var(--bg2)',
                  borderRadius: 20,
                  padding: '28px 28px 24px',
                  border: '1px solid var(--border)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  position: 'relative',
                  overflow: 'hidden',
                }}>

                {/* Glow accent */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 120, height: 120,
                  borderRadius: '50%',
                  background: sector.glow,
                  filter: 'blur(40px)',
                  pointerEvents: 'none',
                }} />

                {/* Icon */}
                <div style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: sector.glow,
                  border: `1px solid ${sector.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  position: 'relative',
                }}>
                  <Icon size={20} color={sector.color} strokeWidth={2} />
                </div>

                <h3 style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 10,
                  position: 'relative',
                }}>
                  {sector.title}
                </h3>

                <p style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: 'var(--text2)',
                  lineHeight: 1.7,
                  position: 'relative',
                }}>
                  {sector.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
