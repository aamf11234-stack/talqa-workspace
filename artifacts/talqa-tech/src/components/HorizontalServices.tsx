import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Wallet, Smartphone, LayoutDashboard, Zap, Globe, Bot } from 'lucide-react';

const CARDS = [
  {
    Icon: Wallet, en: 'Apple Wallet', ar: 'بطاقات الولاء الرقمية',
    desc: 'تُضاف لمحفظة Apple Wallet بلمسة واحدة — Push Notifications، QR Code، وتحديث النقاط آنياً. بلا تطبيق، بلا احتكاك.',
    accent: '#4F8EFF', tag: 'الأكثر طلباً',
    feats: ['Apple PassKit', 'Push Notifications', 'QR Code', 'تحديث آني'],
    num: '01',
  },
  {
    Icon: Smartphone, en: 'Mobile Apps', ar: 'تطبيقات iOS & Android',
    desc: 'تطبيقات Native بتصميم Apple-grade وتجربة مستخدم سلسة تعكس هوية علامتك وتبقي عميلك يعود.',
    accent: '#A78BFA', tag: null,
    feats: ['iOS & Android', 'UI/UX مخصص', 'لوحة تحكم', 'تحديثات مستمرة'],
    num: '02',
  },
  {
    Icon: Globe, en: 'Web Platforms', ar: 'المواقع ولوحات التحكم',
    desc: 'مواقع تسويقية فائقة الأداء ولوحات إدارة سحابية تمنحك رؤية كاملة وتحكماً حقيقياً في بياناتك.',
    accent: '#34D399', tag: null,
    feats: ['Core Web Vitals ممتاز', 'تحليلات لحظية', 'صلاحيات متعددة', 'CDN سعودي'],
    num: '03',
  },
  {
    Icon: Zap, en: 'Automation', ar: 'الأتمتة وتكامل API',
    desc: 'ربط أنظمتك ببعضها — تكامل واتساب Business، API خارجي، وأتمتة العمليات اليومية بالكامل.',
    accent: '#FB923C', tag: null,
    feats: ['واتساب Business API', 'ربط ERP', 'أتمتة المهام', 'Webhooks'],
    num: '04',
  },
  {
    Icon: Bot, en: 'AI Solutions', ar: 'حلول الذكاء الاصطناعي',
    desc: 'دمج قدرات الذكاء الاصطناعي في تطبيقاتك — من الترشيحات الذكية إلى Chatbots وتحليل البيانات.',
    accent: '#F472B6', tag: 'جديد',
    feats: ['AI Recommendations', 'Chatbot ذكي', 'تحليل صور', 'NLP عربي'],
    num: '05',
  },
  {
    Icon: LayoutDashboard, en: 'Loyalty Systems', ar: 'أنظمة الولاء المتكاملة',
    desc: 'منظومة ولاء شاملة تربط التطبيق بـ Apple Wallet بلوحة التحكم — محطة واحدة لكل شيء.',
    accent: '#60A5FA', tag: null,
    feats: ['نقاط متعددة', 'مستويات العضوية', 'تقارير تفصيلية', 'تكامل كامل'],
    num: '06',
  },
];

export default function HorizontalServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(CARDS.length - 1) * 100 / CARDS.length * 0.85}%`]);

  return (
    <section id="services" style={{ position: 'relative' }}>
      {/* Sticky wrapper */}
      <div ref={containerRef} style={{ height: `${CARDS.length * 80}vh`, position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
          <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />

          {/* Header */}
          <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', zIndex: 2, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '36px 52px 0', pointerEvents: 'none' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4F8EFF', marginBottom: 10 }}>ما نبنيه لك</div>
              <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.08 }}>
                ستة حلول.<br /><span className="text-blue">منظومة واحدة.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', align: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
              <motion.div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4F8EFF', alignSelf: 'center' }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>مرّر للأسفل</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>↓</span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ position: 'absolute', bottom: 0, inset: 'auto 52px 32px', zIndex: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
            {CARDS.map((_, i) => (
              <motion.div key={i} style={{ height: 2, borderRadius: 99, flex: 1, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <motion.div style={{
                  height: '100%', background: '#4F8EFF', borderRadius: 99,
                  scaleX: useTransform(scrollYProgress, [i / CARDS.length, (i + 1) / CARDS.length], [0, 1]),
                  transformOrigin: 'right',
                }} />
              </motion.div>
            ))}
          </div>

          {/* Cards track */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '100px 52px 80px' }}>
            <motion.div style={{ display: 'flex', gap: 20, x, willChange: 'transform' }}>
              {CARDS.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  style={{
                    flexShrink: 0, width: 340, height: '65vh', maxHeight: 560,
                    background: 'var(--surface)',
                    border: `1px solid rgba(255,255,255,0.07)`,
                    borderRadius: 24, padding: '36px 32px',
                    display: 'flex', flexDirection: 'column',
                    position: 'relative', overflow: 'hidden',
                    transition: 'border-color 0.4s, box-shadow 0.4s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${card.accent}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${card.accent}20, 0 32px 80px rgba(0,0,0,0.5)`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {/* BG number */}
                  <div style={{ position: 'absolute', bottom: -10, right: 24, fontSize: 120, fontWeight: 900, color: 'rgba(255,255,255,0.025)', letterSpacing: '-0.06em', lineHeight: 1, userSelect: 'none' }}>{card.num}</div>

                  {/* Tag */}
                  {card.tag && (
                    <div style={{ position: 'absolute', top: 28, left: 28, fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6, background: `${card.accent}18`, color: card.accent, border: `1px solid ${card.accent}35` }}>
                      {card.tag}
                    </div>
                  )}

                  {/* Icon */}
                  <div style={{ width: 52, height: 52, borderRadius: 14, marginBottom: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${card.accent}12`, color: card.accent, border: `1px solid ${card.accent}22`, flexShrink: 0 }}>
                    <card.Icon size={22} strokeWidth={1.5} />
                  </div>

                  <div style={{ marginTop: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 8 }}>{card.en}</div>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '-0.025em', marginBottom: 14, lineHeight: 1.2 }}>{card.ar}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.9, color: 'rgba(255,255,255,0.4)', marginBottom: 'auto' }}>{card.desc}</p>
                  </div>

                  {/* Features */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
                    {card.feats.map(f => (
                      <span key={f} style={{ fontSize: 10, fontWeight: 600, padding: '4px 9px', borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.38)' }}>{f}</span>
                    ))}
                  </div>

                  {/* Bottom gradient accent */}
                  <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', height: 2, background: `linear-gradient(to right, ${card.accent}, transparent)` }} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
