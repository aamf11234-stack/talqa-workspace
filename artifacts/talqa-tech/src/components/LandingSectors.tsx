import { motion } from 'framer-motion';
import { UtensilsCrossed, Dumbbell, CalendarDays, ShoppingBag } from 'lucide-react';

const SECTORS = [
  {
    icon: UtensilsCrossed,
    title: 'المطاعم والكافيهات',
    description: 'قائمة QR، طلبات أونلاين، حجوزات، ونظام ولاء متكامل',
  },
  {
    icon: Dumbbell,
    title: 'النوادي الرياضية',
    description: 'اشتراكات، جداول حصص، بطاقات عضوية رقمية، وتتبع الأداء',
  },
  {
    icon: CalendarDays,
    title: 'الفعاليات',
    description: 'صفحات فعاليات، تسجيل حضور، تذاكر رقمية، وإدارة ضيوف',
  },
  {
    icon: ShoppingBag,
    title: 'المتاجر الإلكترونية',
    description: 'متجر كامل، لوحة تحكم، دفع إلكتروني، وتقارير مبيعات',
  },
];

export default function LandingSectors() {
  return (
    <section style={{
      background: '#F5F2EB',
      paddingTop: 112,
      paddingBottom: 112,
      paddingInline: 24,
      direction: 'rtl'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ 
              fontSize: 14, 
              fontWeight: 500, 
              color: '#9C8F85', 
              marginBottom: 16,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              لكل قطاع، حل مُصمَّم له
            </p>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3.2rem)', 
              fontWeight: 700, 
              color: '#1A1208',
              lineHeight: 1.2,
            }}>
              منصة واحدة تخدم كل الأعمال
            </h2>
          </motion.div>
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: 40, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: 1, background: '#EAE3D2', marginTop: 32 }}
          />
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
        }}>
          {SECTORS.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, borderColor: '#2C221E', boxShadow: '0 16px 48px rgba(44,34,30,0.10)' }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 24,
                  padding: 32,
                  border: '1px solid #EAE3D2',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
                data-testid={`card-sector-${i}`}>
                {/* Icon */}
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: '#F5F2EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}>
                  <Icon size={22} color="#2C221E" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#1A1208',
                  marginBottom: 12,
                }}>
                  {sector.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  color: '#5C524E',
                  lineHeight: 1.75,
                  flex: 1,
                  marginBottom: 24,
                }}>
                  {sector.description}
                </p>

                {/* Link */}
                <div style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#5C524E',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <span>استكشف الحل</span>
                  <span style={{ fontSize: 18 }}>←</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}