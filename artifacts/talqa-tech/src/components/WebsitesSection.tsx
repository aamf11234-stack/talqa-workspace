import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Zap, Smartphone, Search, ArrowUpRight, Check,
  ShoppingBag, HeartPulse, Utensils, Building2, Rocket,
  CreditCard, Wallet,
} from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أبي%20موقع%20احترافي%20بـ99%20ريال';
const WA_ICON = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L.054 23.077a.75.75 0 00.917.944l5.453-1.426A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 01-4.978-1.371l-.357-.212-3.698.967.984-3.593-.232-.369A9.718 9.718 0 012.25 12C2.25 6.61 6.61 2.25 12 2.25S21.75 6.61 21.75 12 17.39 21.75 12 21.75z"/>
  </svg>
);

/* ══════════════════════════════════
   PAYMENT METHODS
══════════════════════════════════ */
const PAYMENT_METHODS = [
  {
    label: 'Mada',
    bg: '#1a6b3c',
    logo: (
      <svg viewBox="0 0 48 20" width="38" height="16">
        <text x="0" y="15" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="16" fill="white">mada</text>
      </svg>
    ),
  },
  {
    label: 'Apple Pay',
    bg: '#000',
    logo: (
      <svg viewBox="0 0 50 20" width="44" height="18">
        <text x="0" y="15" fontFamily="-apple-system,sans-serif" fontWeight="600" fontSize="13" fill="white"> Pay</text>
      </svg>
    ),
  },
  {
    label: 'STC Pay',
    bg: '#6e1885',
    logo: (
      <svg viewBox="0 0 60 20" width="44" height="16">
        <text x="0" y="14" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="13" fill="white">STC Pay</text>
      </svg>
    ),
  },
  {
    label: 'Visa',
    bg: '#1a1f71',
    logo: (
      <svg viewBox="0 0 48 16" width="38" height="14">
        <text x="0" y="13" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="16" fill="white" letterSpacing="-1">VISA</text>
      </svg>
    ),
  },
  {
    label: 'Mastercard',
    bg: '#252525',
    logo: (
      <svg viewBox="0 0 36 24" width="30" height="20">
        <circle cx="12" cy="12" r="11" fill="#EB001B"/>
        <circle cx="24" cy="12" r="11" fill="#F79E1B"/>
        <path d="M18 4.93A11 11 0 0 1 18 19.07 11 11 0 0 1 18 4.93z" fill="#FF5F00"/>
      </svg>
    ),
  },
];

/* ══════════════════════════════════
   WEBSITE TYPES
══════════════════════════════════ */
interface SiteType {
  id: string; label: string; Icon: typeof Globe;
  color: string; urlBar: string;
  nav: string[]; hero: string; heroSub: string;
  cta: string; accent: string; bg: string;
  sectionTitle: string; items: string[];
}

const SITES: SiteType[] = [
  {
    id: 'restaurant', label: 'مطعم وكافيه', Icon: Utensils,
    color: '#F97316', urlBar: 'mymestaurant.sa',
    nav: ['القائمة', 'حجز طاولة', 'عروض', 'تواصل'],
    hero: 'طعم لا يُنسى', heroSub: 'مطبخ أصيل · تجربة راقية',
    cta: 'احجز طاولة الآن', accent: '#F97316', bg: '#0d0500',
    sectionTitle: 'أبرز الأطباق',
    items: ['برجر الفاخر ٨٥ ر', 'ريزوتو فطر ٧٥ ر', 'سيزر سالاد ٤٥ ر', 'كيك الشوكلاتة ٣٥ ر'],
  },
  {
    id: 'clinic', label: 'عيادة طبية', Icon: HeartPulse,
    color: '#EC4899', urlBar: 'myclinic.sa',
    nav: ['الخدمات', 'الأطباء', 'احجز موعد', 'اتصل بنا'],
    hero: 'رعاية صحية بمعايير عالمية', heroSub: 'فريق طبي متخصص · تقنية متقدمة',
    cta: 'احجز موعدك', accent: '#EC4899', bg: '#0d0008',
    sectionTitle: 'تخصصاتنا',
    items: ['طب الأسرة', 'طب الأسنان', 'النساء والتوليد', 'الأطفال'],
  },
  {
    id: 'store', label: 'متجر إلكتروني', Icon: ShoppingBag,
    color: '#8B5CF6', urlBar: 'mystore.sa',
    nav: ['المنتجات', 'العروض', 'سلة المشتريات', 'حسابي'],
    hero: 'تسوّق بلا حدود', heroSub: 'شحن سريع · ضمان الجودة',
    cta: 'تسوّق الآن', accent: '#8B5CF6', bg: '#07000f',
    sectionTitle: 'الأكثر مبيعاً',
    items: ['عطر الليل ٢٢٠ ر', 'حقيبة جلد ٣٨٠ ر', 'ساعة ذكية ٦٥٠ ر', 'نظارة فاخرة ٤٥٠ ر'],
  },
  {
    id: 'corporate', label: 'شركة وأعمال', Icon: Building2,
    color: '#3B82F6', urlBar: 'mycompany.sa',
    nav: ['من نحن', 'الخدمات', 'مشاريعنا', 'تواصل'],
    hero: 'نبني مستقبل أعمالك', heroSub: 'خبرة ١٥ سنة · ٥٠٠+ مشروع',
    cta: 'اطلب استشارة', accent: '#3B82F6', bg: '#00050f',
    sectionTitle: 'خدماتنا',
    items: ['استشارات استراتيجية', 'إدارة المشاريع', 'التحول الرقمي', 'التدريب المؤسسي'],
  },
  {
    id: 'landing', label: 'لاندنج بيج', Icon: Rocket,
    color: '#10B981', urlBar: 'myproduct.sa',
    nav: ['المزايا', 'الأسعار', 'آراء العملاء', 'ابدأ الآن'],
    hero: 'المنتج الذي كنت تبحث عنه', heroSub: 'أكثر من ٢٠,٠٠٠ عميل سعيد',
    cta: 'جرّبه مجاناً ١٤ يوماً', accent: '#10B981', bg: '#00100a',
    sectionTitle: 'لماذا نحن؟',
    items: ['توفير ٤٠٪ من وقتك', 'دعم فني ٢٤/٧', 'تكامل مع ٥٠+ أداة', 'ضمان الاسترداد'],
  },
];

/* ══════════════════════════════════
   BROWSER MOCKUP
══════════════════════════════════ */
function BrowserMockup({ site }: { site: SiteType }) {
  return (
    <motion.div
      key={site.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: 18, overflow: 'hidden',
        boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)`,
        background: '#0a0a0f',
      }}>
      {/* Browser chrome */}
      <div style={{
        padding: '10px 16px', background: '#111118',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }}/>
          ))}
        </div>
        <div style={{
          flex: 1, height: 26, borderRadius: 6,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px',
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', flexShrink: 0 }}/>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>
            https://{site.urlBar}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ width: 20, height: 20, borderRadius: 4, background: 'rgba(255,255,255,0.04)' }}/>
          ))}
        </div>
      </div>

      {/* Website content */}
      <div style={{ background: site.bg, direction: 'rtl' }}>
        <div style={{
          padding: '10px 20px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', borderBottom: `1px solid ${site.accent}15`,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: `${site.accent}22`, border: `1px solid ${site.accent}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <site.Icon size={13} color={site.accent} strokeWidth={2}/>
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            {site.nav.map(n => (
              <span key={n} style={{ fontFamily: 'Cairo,sans-serif', fontSize: 9, fontWeight: 700,
                color: n === site.nav[2] ? site.accent : 'rgba(255,255,255,0.4)' }}>{n}</span>
            ))}
          </div>
        </div>

        <div style={{ padding: '24px 20px 20px', textAlign: 'center', position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 70% 60% at 50% 0%,${site.accent}18 0%,transparent 70%)`,
            pointerEvents: 'none',
          }}/>
          <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 18,
            color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 6, position: 'relative' }}>
            {site.hero}
          </div>
          <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)',
            marginBottom: 14, position: 'relative' }}>{site.heroSub}</div>
          <button style={{
            padding: '8px 20px', borderRadius: 99, border: 'none', cursor: 'pointer',
            background: `linear-gradient(135deg,${site.accent},${site.accent}cc)`,
            fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 10, color: '#fff',
            position: 'relative',
          }}>{site.cta}</button>
        </div>

        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 11,
            color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>{site.sectionTitle}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {site.items.map((item, i) => (
              <div key={i} style={{
                padding: '9px 11px', borderRadius: 9,
                background: `${site.accent}0d`, border: `1px solid ${site.accent}22`,
                fontFamily: 'Cairo,sans-serif', fontSize: 10, fontWeight: 700,
                color: 'rgba(255,255,255,0.7)',
              }}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════
   METRICS CARDS
══════════════════════════════════ */
const METRICS = [
  { label: 'PageSpeed Score', value: '98', unit: '/100', color: '#10B981' },
  { label: 'وقت التحميل',     value: '١.٢', unit: 'ثانية',  color: '#3B82F6' },
  { label: 'Mobile Score',    value: '100', unit: '%',      color: '#8B5CF6' },
];

/* ══════════════════════════════════
   FEATURES
══════════════════════════════════ */
const FEATURES = [
  { Icon: Zap,        title: 'سرعة خارقة',        body: 'Core Web Vitals ممتازة — يرضي Google ويُبهر الزوار.' },
  { Icon: Search,     title: 'تحسين SEO كامل',     body: 'بنية صح من اليوم الأول — ظهور أعلى في نتائج البحث.' },
  { Icon: Smartphone, title: 'تصميم Responsive',  body: 'يبدو مذهلاً على كل شاشة — جوال، تابلت، ديسكتوب.' },
  { Icon: Globe,      title: 'نطاق .sa + SSL',     body: 'حماية كاملة وعنوان سعودي موثوق لعملائك.' },
];

/* ══════════════════════════════════
   MAIN SECTION
══════════════════════════════════ */
export default function WebsitesSection() {
  const [activeId, setActiveId] = useState('restaurant');
  const active = SITES.find(s => s.id === activeId)!;

  return (
    <section id="websites" style={{
      padding: 'clamp(90px,10vw,140px) 0',
      background: '#06060e',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <AnimatePresence>
          <motion.div key={activeId}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse 80% 55% at 20% 50%,${active.color}10 0%,transparent 60%)`,
            }}/>
        </AnimatePresence>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',
          backgroundSize: '52px 52px',
        }}/>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 48 }}>

          <div className="section-label" style={{
            color: '#3B82F6', borderColor: 'rgba(59,130,246,0.4)',
            background: 'rgba(59,130,246,0.1)', marginBottom: 20,
            display: 'inline-flex', alignItems: 'center', gap: 7,
          }}>
            <Globe size={12} strokeWidth={2}/>
            مواقع تسويقية احترافية
          </div>

          <h2 style={{
            fontWeight: 900, fontSize: 'clamp(2.2rem,4.8vw,3.8rem)',
            letterSpacing: '-0.045em', lineHeight: 1.08, marginBottom: 18, color: '#fff',
          }}>
            أي موقع تحتاجه
            <br/>
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              بـ 99 ريال — شامل كل شيء
            </span>
          </h2>

          <p style={{ fontSize: 16.5, color: 'rgba(255,255,255,0.42)', maxWidth: 560,
            margin: '0 auto 32px', lineHeight: 1.8, fontFamily: 'Cairo,sans-serif' }}>
            متجر إلكتروني، موقع خدمي، صفحة تسويقية، موقع شركة — أي نوع، سريع، محسّن لـ SEO، وجاهز للبيع.
          </p>

          {/* ── PRICE + PAYMENT CARD ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center',
              padding: '20px 32px', borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.08))',
              border: '1px solid rgba(59,130,246,0.30)',
              boxShadow: '0 0 60px rgba(59,130,246,0.10)',
            }}>
            {/* Price */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700,
                color: 'rgba(255,255,255,0.45)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                السعر الثابت
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 52,
                  color: '#fff', letterSpacing: -2, lineHeight: 1 }}>99</span>
                <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 18,
                  color: '#60A5FA' }}>ريال</span>
              </div>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 12,
                color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>لأي نوع من المواقع</div>
            </div>

            <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }}/>

            {/* Included */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, textAlign: 'right' }}>
              {['تصميم فريد بهويتك الكاملة', 'نطاق .sa أو .com + SSL', 'SEO أساسي من اليوم الأول', 'دعم ٣ أشهر بعد الإطلاق'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: 'rgba(59,130,246,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={9} strokeWidth={3} color="#60A5FA"/>
                  </div>
                  <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 13,
                    color: 'rgba(255,255,255,0.7)' }}>{f}</span>
                </div>
              ))}
            </div>

            <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }}/>

            {/* Payment methods */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 11,
                color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
                وسائل الدفع المتاحة
              </div>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', justifyContent: 'center' }}>
                {PAYMENT_METHODS.map(pm => (
                  <div key={pm.label} title={pm.label} style={{
                    padding: '5px 10px', borderRadius: 8,
                    background: pm.bg,
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minWidth: 50, height: 30,
                  }}>
                    {pm.logo}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── SITE TYPE TABS ── */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 48, flexWrap: 'wrap' }}>
          {SITES.map(s => {
            const on = activeId === s.id;
            return (
              <motion.button key={s.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => setActiveId(s.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 18px', borderRadius: 12, cursor: 'pointer',
                  background: on ? `${s.color}18` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${on ? s.color + '50' : 'rgba(255,255,255,0.07)'}`,
                  fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 13,
                  color: on ? s.color : 'rgba(255,255,255,0.38)',
                  boxShadow: on ? `0 4px 20px ${s.color}22` : 'none',
                  transition: 'all 0.2s',
                }}>
                <s.Icon size={14} strokeWidth={1.75}/>
                {s.label}
              </motion.button>
            );
          })}
        </div>

        {/* ── 2-COL LAYOUT ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 40, alignItems: 'start', marginBottom: 64 }}>

          {/* LEFT: Browser */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <AnimatePresence mode="wait">
              <BrowserMockup key={activeId} site={active}/>
            </AnimatePresence>

            {/* Metrics strip below browser */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 14 }}>
              {METRICS.map(m => (
                <div key={m.label} style={{
                  padding: '14px 12px', borderRadius: 12, textAlign: 'center',
                  background: 'rgba(255,255,255,0.03)', border: `1px solid ${m.color}25`,
                }}>
                  <div style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 22,
                    color: m.color, lineHeight: 1, letterSpacing: -1 }}>
                    {m.value}<span style={{ fontSize: 11, color: `${m.color}99` }}>{m.unit}</span>
                  </div>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 10,
                    color: 'rgba(255,255,255,0.35)', marginTop: 5 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Features + CTA */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.08 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Active site headline */}
            <AnimatePresence mode="wait">
              <motion.div key={activeId}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 11,
                    background: `${active.color}18`, border: `1px solid ${active.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <active.Icon size={18} color={active.color} strokeWidth={1.75}/>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 17,
                      color: '#fff' }}>موقع {active.label}</div>
                    <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: `${active.color}99`,
                      letterSpacing: 1, textTransform: 'uppercase' }}>{active.urlBar}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FEATURES.map((f, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  style={{
                    padding: '15px 18px', borderRadius: 14,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', gap: 13, alignItems: 'flex-start',
                  }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <f.Icon size={16} strokeWidth={1.75} color="#3B82F6"/>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 14,
                      color: '#fff', marginBottom: 4 }}>{f.title}</div>
                    <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 12.5,
                      color: 'rgba(255,255,255,0.38)', lineHeight: 1.6 }}>{f.body}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Delivery time badge */}
            <div style={{
              padding: '14px 18px', borderRadius: 14,
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={16} strokeWidth={2} color="#10B981"/>
              </div>
              <div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 13, color: '#10B981' }}>
                  يُسلَّم خلال ٧–١٤ يوم عمل
                </div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 11,
                  color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                  تصميم + تطوير + رفع + دومين + SSL
                </div>
              </div>
            </div>

            {/* CTA */}
            <a href={WA} target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                padding: '15px 24px', borderRadius: 14, textDecoration: 'none',
                background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
                fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 15, color: '#fff',
                boxShadow: '0 8px 28px rgba(59,130,246,0.3)',
                transition: 'transform 0.18s, box-shadow 0.18s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}>
              اطلب موقعك بـ 99 ريال
              <ArrowUpRight size={16} strokeWidth={2.5}/>
            </a>

            <a href={WA} target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                padding: '13px 24px', borderRadius: 14, textDecoration: 'none',
                background: 'linear-gradient(135deg,#25D366,#128C7E)',
                fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 14, color: '#fff',
                boxShadow: '0 8px 24px rgba(37,211,102,0.22)',
              }}>
              {WA_ICON}
              تواصل على واتساب
            </a>
          </motion.div>
        </div>

        {/* ── WHAT'S INCLUDED ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          style={{
            padding: '28px 32px', borderRadius: 22,
            background: 'linear-gradient(135deg,rgba(59,130,246,0.07) 0%,rgba(139,92,246,0.07) 100%)',
            border: '1px solid rgba(59,130,246,0.18)',
          }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20,
            marginBottom: 24,
          }}>
            <div>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 18, color: '#fff', marginBottom: 6 }}>
                كل موقع يشمل بالكامل
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {['تصميم فريد','نطاق .sa أو .com','شهادة SSL','لوحة تحكم','SEO أساسي','نموذج تواصل','ربط جوجل Analytics','دعم ٣ أشهر'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Check size={11} strokeWidth={3} color="#10B981"/>
                    <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 12,
                      color: 'rgba(255,255,255,0.55)' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <a href={WA} target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 12, textDecoration: 'none',
                background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)',
                fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 14, color: '#60A5FA',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}>
              اطلب موقعك الآن
              <ArrowUpRight size={14} strokeWidth={2.5}/>
            </a>
          </div>

          {/* Payment methods bar */}
          <div style={{
            paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <CreditCard size={14} strokeWidth={1.75} color="rgba(255,255,255,0.4)"/>
              <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 12,
                color: 'rgba(255,255,255,0.35)' }}>وسائل الدفع:</span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {PAYMENT_METHODS.map(pm => (
                <div key={pm.label} title={pm.label} style={{
                  padding: '4px 10px', borderRadius: 7,
                  background: pm.bg,
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  minWidth: 46, height: 26,
                }}>
                  {pm.logo}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
