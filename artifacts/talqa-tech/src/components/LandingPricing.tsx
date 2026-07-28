import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const WA = 'https://wa.me/966551378531';

const PLANS = [
  {
    name: 'الأساسية',
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      'موقع واحد',
      '5 صفحات',
      'SSL مجاني',
      'دعم واتساب',
    ],
    cta: 'ابدأ الآن',
    featured: false,
  },
  {
    name: 'الأعمال',
    monthlyPrice: 249,
    yearlyPrice: 2490,
    features: [
      'كل القطاعات',
      'تطبيق جوال',
      'AI Builder',
      'دومين مجاني',
    ],
    cta: 'ابدأ الآن',
    featured: true,
    badge: 'الأكثر طلباً',
  },
  {
    name: 'المتقدمة',
    monthlyPrice: 499,
    yearlyPrice: 4990,
    features: [
      'مواقع غير محدودة',
      'API مخصص',
      'مدير حساب',
    ],
    cta: 'تواصل معنا',
    featured: false,
  },
];

export default function LandingPricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section style={{
      background: '#FAF8F5',
      paddingTop: 112,
      paddingBottom: 112,
      paddingInline: 24,
      direction: 'rtl'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
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
            }}>
              تسعير شفاف بلا مفاجآت
            </p>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3.2rem)', 
              fontWeight: 700, 
              color: '#1A1208',
              lineHeight: 1.2,
              marginBottom: 40,
            }}>
              خطط تبدأ من يومك الأول
            </h2>

            {/* Toggle */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: 6,
              background: '#EAE3D2',
              borderRadius: 9999,
              position: 'relative'
            }}>
              <button
                onClick={() => setYearly(false)}
                style={{
                  padding: '10px 28px',
                  borderRadius: 9999,
                  border: 'none',
                  background: !yearly ? '#FFFFFF' : 'transparent',
                  color: !yearly ? '#1A1208' : '#5C524E',
                  fontFamily: 'Tajawal, sans-serif',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: !yearly ? '0 2px 8px rgba(44,34,30,0.05)' : 'none',
                }}
                data-testid="toggle-monthly">
                شهري
              </button>
              <button
                onClick={() => setYearly(true)}
                style={{
                  padding: '10px 28px',
                  borderRadius: 9999,
                  border: 'none',
                  background: yearly ? '#FFFFFF' : 'transparent',
                  color: yearly ? '#1A1208' : '#5C524E',
                  fontFamily: 'Tajawal, sans-serif',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: yearly ? '0 2px 8px rgba(44,34,30,0.05)' : 'none',
                  display: 'flex', alignItems: 'center', gap: 8
                }}
                data-testid="toggle-yearly">
                سنوي
                <span style={{
                  background: '#2C221E', color: '#FAF8F5', fontSize: 11, padding: '2px 8px', borderRadius: 99
                }}>وفّر ٢٠٪</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Pricing cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          alignItems: 'stretch',
        }}>
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: '#FFFFFF',
                borderRadius: 24,
                padding: 40,
                border: plan.featured ? '2px solid #2C221E' : '1px solid #EAE3D2',
                boxShadow: plan.featured ? '0 24px 64px rgba(44,34,30,0.12)' : '0 8px 32px rgba(44,34,30,0.04)',
                position: 'relative',
                display: 'flex', flexDirection: 'column',
              }}
              data-testid={`card-pricing-${i}`}>
              
              {/* Badge */}
              {plan.badge && (
                <div style={{
                  position: 'absolute',
                  top: -14,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '6px 16px',
                  background: '#2C221E',
                  color: '#FAF8F5',
                  fontSize: 12,
                  fontWeight: 700,
                  borderRadius: 9999,
                  whiteSpace: 'nowrap',
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <h3 style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#1A1208',
                marginBottom: 16,
              }}>
                {plan.name}
              </h3>

              {/* Price */}
              <div style={{ marginBottom: 32 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 6,
                }}>
                  <span style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: '#1A1208',
                    letterSpacing: '-0.03em',
                  }}>
                    {yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#5C524E',
                  }}>
                    ريال / {yearly ? 'سنة' : 'شهر'}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 40px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                flex: 1,
              }}>
                {plan.features.map(feature => (
                  <li key={feature} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Check size={18} color="#2C221E" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 400, color: '#5C524E' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 24px',
                  borderRadius: 9999,
                  fontSize: 16,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  background: plan.featured ? '#2C221E' : 'transparent',
                  color: plan.featured ? '#FAF8F5' : '#2C221E',
                  border: plan.featured ? 'none' : '2px solid #2C221E',
                }}
                onMouseEnter={e => {
                  if (plan.featured) {
                    (e.currentTarget as HTMLElement).style.background = '#3D2E28';
                  } else {
                    (e.currentTarget as HTMLElement).style.background = '#F0EBE3';
                  }
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                }}
                onMouseLeave={e => {
                  if (plan.featured) {
                    (e.currentTarget as HTMLElement).style.background = '#2C221E';
                  } else {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }}
                data-testid={`button-cta-${plan.name}`}>
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}