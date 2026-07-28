import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';

const WA = 'https://wa.me/966551378531';

const PLANS = [
  {
    name: 'الانطلاق',
    monthlyPrice: 199,
    yearlyPrice: 1990,
    desc: 'للأعمال التي تبدأ رحلتها الرقمية',
    features: [
      'موقع احترافي كامل',
      'تطبيق iOS + Android',
      'نظام حجوزات',
      'دعم فني ٣ أشهر',
    ],
    cta: 'ابدأ الآن',
    featured: false,
    color: '#3B82F6',
  },
  {
    name: 'الأعمال',
    monthlyPrice: 349,
    yearlyPrice: 3490,
    desc: 'الأكثر طلباً من الأعمال المتنامية',
    features: [
      'كل مزايا الانطلاق',
      'Apple & Google Wallet',
      'AI مساعد ذكي',
      'لوحة إدارة متقدمة',
      'دعم فني ٦ أشهر',
    ],
    cta: 'ابدأ الآن',
    featured: true,
    badge: 'الأكثر طلباً',
    color: '#8B5CF6',
  },
  {
    name: 'المؤسسي',
    monthlyPrice: 0,
    yearlyPrice: 0,
    desc: 'حلول مخصصة للمؤسسات الكبرى',
    features: [
      'كل شيء في الأعمال',
      'تكاملات API مخصصة',
      'SLA مضمون',
      'مدير حساب مخصص',
    ],
    cta: 'تواصل معنا',
    featured: false,
    color: '#06B6D4',
  },
];

export default function LandingPricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section style={{
      background: 'var(--bg)',
      paddingTop: 96,
      paddingBottom: 96,
      paddingInline: 24,
      direction: 'rtl',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
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
              تسعير شفاف بلا مفاجآت
            </span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 900, color: '#fff',
              lineHeight: 1.2, letterSpacing: '-0.03em',
              marginBottom: 16,
            }}>
              استثمر في{' '}<span className="grad">نمو عملك</span>
            </h2>
            <p style={{
              fontSize: 16, color: 'var(--text2)',
              lineHeight: 1.7, maxWidth: 420, margin: '0 auto 36px',
            }}>
              ادفع مرة واحدة، وامتلك مشروعك كاملاً — بلا رسوم خفية.
            </p>

            {/* Toggle */}
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              padding: 4, background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: 9999,
            }}>
              <button onClick={() => setYearly(false)} style={{
                padding: '9px 24px', borderRadius: 9999,
                border: 'none', cursor: 'pointer',
                fontFamily: 'Cairo, sans-serif', fontSize: 14, fontWeight: 700,
                transition: 'all 0.2s ease',
                background: !yearly ? 'rgba(139,92,246,0.2)' : 'transparent',
                color: !yearly ? 'var(--purple2)' : 'var(--text3)',
              }}>
                شهري
              </button>
              <button onClick={() => setYearly(true)} style={{
                padding: '9px 24px', borderRadius: 9999,
                border: 'none', cursor: 'pointer',
                fontFamily: 'Cairo, sans-serif', fontSize: 14, fontWeight: 700,
                transition: 'all 0.2s ease',
                background: yearly ? 'rgba(139,92,246,0.2)' : 'transparent',
                color: yearly ? 'var(--purple2)' : 'var(--text3)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                سنوي
                <span style={{
                  background: 'linear-gradient(135deg,var(--purple),var(--blue))',
                  color: '#fff', fontSize: 10, padding: '2px 8px', borderRadius: 99,
                  fontWeight: 700,
                }}>وفّر ٢٠٪</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: 20, alignItems: 'stretch',
        }}>
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: plan.featured
                  ? 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.08))'
                  : 'var(--bg2)',
                borderRadius: 24,
                padding: '36px 32px',
                border: plan.featured
                  ? '1px solid rgba(139,92,246,0.4)'
                  : '1px solid var(--border)',
                boxShadow: plan.featured
                  ? '0 0 60px rgba(139,92,246,0.12), inset 0 1px 0 rgba(255,255,255,0.06)'
                  : 'none',
                position: 'relative',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
              }}>

              {/* Glow */}
              {plan.featured && (
                <div style={{
                  position: 'absolute', top: -40, right: -40,
                  width: 200, height: 200, borderRadius: '50%',
                  background: 'rgba(139,92,246,0.12)', filter: 'blur(60px)',
                  pointerEvents: 'none',
                }} />
              )}

              {/* Badge */}
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: -1, left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '5px 14px',
                  background: 'linear-gradient(135deg,var(--purple),var(--blue))',
                  fontSize: 11, fontWeight: 800, color: '#fff',
                  borderRadius: '0 0 12px 12px',
                }}>
                  <Zap size={11} fill="#fff" color="#fff" />
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div style={{ marginBottom: 20, paddingTop: plan.badge ? 24 : 0 }}>
                <h3 style={{
                  fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 8,
                }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.5 }}>
                  {plan.desc}
                </p>
              </div>

              {/* Price */}
              <div style={{ marginBottom: 28 }}>
                {plan.monthlyPrice === 0 ? (
                  <div style={{ fontSize: 28, fontWeight: 900, color: plan.color }}>
                    حسب المشروع
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{
                      fontSize: '2.8rem', fontWeight: 900, color: '#fff',
                      letterSpacing: '-0.04em', lineHeight: 1,
                    }}>
                      {yearly ? plan.yearlyPrice.toLocaleString('ar-SA') : plan.monthlyPrice}
                    </span>
                    <span style={{ fontSize: 14, color: 'var(--text3)', fontWeight: 500 }}>
                      ريال / {yearly ? 'سنة' : 'شهر'}
                    </span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

              {/* Features */}
              <ul style={{
                listStyle: 'none', padding: 0, margin: '0 0 32px 0',
                display: 'flex', flexDirection: 'column', gap: 14, flex: 1,
              }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      background: plan.color + '20',
                      border: `1px solid ${plan.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={11} color={plan.color} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 14, color: 'var(--text2)', fontWeight: 500 }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className={plan.featured ? 'btn-purple' : 'btn-ghost'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '13px 24px', borderRadius: 12,
                  fontSize: 15, fontWeight: 700, textDecoration: 'none',
                }}>
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <p style={{
          textAlign: 'center', marginTop: 32,
          fontSize: 13, color: 'var(--text3)', lineHeight: 1.6,
        }}>
          كل الباقات تشمل ضمان ٣ أشهر · دفع مرة واحدة بلا اشتراك شهري
        </p>
      </div>
    </section>
  );
}
