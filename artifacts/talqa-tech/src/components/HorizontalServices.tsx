import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone, CreditCard, Globe, Monitor, Bot, CalendarDays, Star,
  HeartPulse, Nfc, Zap, Palette, BarChart2, ArrowUpRight,
} from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=أبي%20أعرف%20أكثر%20عن%20خدماتكم';

/* ── SERVICES DATA ── */
const SERVICES = [
  {
    Icon: Smartphone, title: 'ابغى تطبيق جوال؟', sub: 'iOS & Android بـ ٤٩٩ ريال',
    desc: 'تطبيقك الجوال iOS وAndroid + Apple Wallet + لوحة تحكم بـ ٤٩٩ ريال دفعة واحدة — كود ملكك، تسليم في ٣ أسابيع.',
    tags: ['React Native', 'App Store & Play', '٤٩٩ ريال'],
    color: '#8B5CF6', size: 'hero',
    stat: '٤٩٩ ريال', statLabel: 'دفعة واحدة',
  },
  {
    Icon: CreditCard, title: 'Digital Wallet', sub: 'Apple & Google Wallet',
    desc: 'بطاقات ولاء، حجوزات، تذاكر وعضويات مباشرة في جيب عميلك — iPhone وAndroid، بدون تطبيق.',
    tags: ['Apple Wallet', 'Google Wallet', 'NFC', 'QR'],
    color: '#06B6D4', size: 'hero',
    stat: '١٠٠٪', statLabel: 'متوافق iOS & Android',
  },
  {
    Icon: Bot, title: 'مساعد واتساب', sub: 'AI Chatbot',
    desc: 'ذكاء اصطناعي يرد على عملائك بلهجة طبيعية ويحوّل الاستفسار إلى حجز أو بيع.',
    tags: ['WhatsApp API', 'GPT-4', 'Auto-reply'],
    color: '#25D366', size: 'medium',
    stat: '٢٤/٧', statLabel: 'رد تلقائي',
  },
  {
    Icon: CalendarDays, title: 'نظام حجوزات', sub: 'Booking System',
    desc: 'حجز، تذكير، وإلغاء تلقائي — مع إشعارات واتساب وتكامل تقويم.',
    tags: ['Calendar', 'WhatsApp', 'Reminders'],
    color: '#F59E0B', size: 'medium',
    stat: '٤٨ ساعة', statLabel: 'وقت التسليم',
  },
  {
    Icon: Globe, title: 'مواقع تسويقية', sub: 'Landing Pages',
    desc: 'مواقع سريعة وجذابة تحوّل الزوار إلى عملاء — محسّنة للموبايل وGoogle.',
    tags: ['SEO', 'Framer Motion', 'Core Web Vitals'],
    color: '#3B82F6', size: 'medium',
    stat: '٩٨٪', statLabel: 'Lighthouse Score',
  },
  {
    Icon: Monitor, title: 'لوحات تحكم', sub: 'Admin Dashboard',
    desc: 'رؤية كاملة على أعمالك — تقارير، مبيعات، عملاء في مكان واحد.',
    tags: ['Analytics', 'Real-time', 'Multi-user'],
    color: '#10B981', size: 'medium',
    stat: '٣٠+', statLabel: 'تقرير مدمج',
  },
  {
    Icon: Star, title: 'برامج ولاء', sub: 'Loyalty Programs',
    desc: 'نقاط، مستويات، ومكافآت تخلّي عميلك يرجع ويرجع.',
    tags: ['Points', 'Tiers', 'Rewards'],
    color: '#D97706', size: 'small',
    stat: '٤٨٪', statLabel: 'رفع الاحتفاظ',
  },
  {
    Icon: HeartPulse, title: 'إدارة عيادات', sub: 'Clinic System',
    desc: 'ملفات مرضى، وصفات، حجوزات، وتقارير طبية رقمية.',
    tags: ['EMR', 'Prescriptions', 'Reports'],
    color: '#EC4899', size: 'small',
    stat: '٣ أسابيع', statLabel: 'تسليم كامل',
  },
  {
    Icon: Nfc, title: 'بطاقات NFC', sub: 'NFC Business Cards',
    desc: 'ضع جوالك قريب وتنتقل المعلومات — بطاقات أعمال المستقبل.',
    tags: ['NFC', 'Digital Card', 'vCard'],
    color: '#A855F7', size: 'small',
    stat: '٠', statLabel: 'ريال طباعة شهرياً',
  },
  {
    Icon: Zap, title: 'أتمتة وربط', sub: 'API & Automation',
    desc: 'ربط أنظمتك ببعض — واتساب، بايمنت، ERP، أي API تبيه.',
    tags: ['REST API', 'Webhooks', 'Zapier'],
    color: '#FB923C', size: 'small',
    stat: '∞', statLabel: 'إمكانيات الربط',
  },
  {
    Icon: Palette, title: 'تصميم UI/UX', sub: 'Design System',
    desc: 'هوية بصرية متكاملة — من الشعار لكل شاشة في التطبيق.',
    tags: ['Figma', 'Brand Identity', 'UX Research'],
    color: '#F43F5E', size: 'small',
    stat: '١', statLabel: 'تجربة تذهل',
  },
  {
    Icon: BarChart2, title: 'تقارير وتحليل', sub: 'Analytics & BI',
    desc: 'بيانات حقيقية تساعدك تاخذ قرارات صح — مبيعات، عملاء، أداء.',
    tags: ['Power BI', 'Real-time', 'Custom Reports'],
    color: '#84CC16', size: 'small',
    stat: '١٠٠٪', statLabel: 'بيانات حقيقية',
  },
];

const fade = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-20px' },
  transition: { duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

function HeroCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const [hov, setHov] = useState(false);
  const { Icon, title, sub, desc, tags, color, stat, statLabel } = s;

  return (
    <motion.div {...fade(i)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: '100%', cursor: 'default' }}>

      {/* Animated border gradient */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 24, padding: 1,
        background: hov
          ? `linear-gradient(135deg, ${color}, ${color}44, ${color}11, ${color}88)`
          : `linear-gradient(135deg, ${color}22, transparent, ${color}11)`,
        transition: 'background 0.4s',
        zIndex: 0,
      }}>
        <div style={{ borderRadius: 23, height: '100%', background: `linear-gradient(145deg,#0d0d1a,#0a0a14)` }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Glow orb */}
        <div style={{
          position: 'absolute', top: -60, right: -40, width: 220, height: 220,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}${hov ? '28' : '14'} 0%, transparent 70%)`,
          transition: 'background 0.4s', pointerEvents: 'none',
        }} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 15,
            background: `${color}18`, border: `1px solid ${color}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: hov ? `0 0 24px ${color}40` : 'none',
            transition: 'box-shadow 0.3s',
          }}>
            <Icon size={24} strokeWidth={1.6} color={color} />
          </div>
          <span style={{
            padding: '4px 12px', borderRadius: 99,
            background: `${color}14`, border: `1px solid ${color}30`,
            fontSize: 10, fontWeight: 800, color, letterSpacing: '0.05em',
          }}>
            {sub}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            {title}
          </h3>
        </div>

        {/* Desc */}
        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, margin: 0, flex: 1, fontFamily: 'Cairo, sans-serif' }}>
          {desc}
        </p>

        {/* Stat */}
        <div style={{
          padding: '14px 18px', borderRadius: 14,
          background: `${color}0a`, border: `1px solid ${color}1a`,
          display: 'flex', alignItems: 'baseline', gap: 8,
        }}>
          <span style={{ fontSize: 28, fontWeight: 900, color, fontFamily: 'Cairo, sans-serif' }}>{stat}</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{statLabel}</span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tags.map(t => (
            <span key={t} style={{
              fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 7,
              background: `${color}0e`, border: `1px solid ${color}25`, color,
            }}>{t}</span>
          ))}
        </div>

        {/* Hover arrow */}
        <motion.div animate={{ x: hov ? 0 : 6, opacity: hov ? 1 : 0 }} transition={{ duration: 0.2 }}
          style={{ position: 'absolute', bottom: 28, left: 28, color, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 800 }}>
          استكشف <ArrowUpRight size={14} />
        </motion.div>
      </div>

      {/* Bottom line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: hov ? 0.7 : 0.25, transition: 'opacity 0.3s',
      }} />
    </motion.div>
  );
}

function MediumCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const [hov, setHov] = useState(false);
  const { Icon, title, sub, desc, tags, color, stat, statLabel } = s;

  return (
    <motion.div {...fade(i)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', height: '100%', cursor: 'default' }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 20, padding: 1,
        background: hov ? `linear-gradient(135deg,${color},${color}22,transparent,${color}55)` : `linear-gradient(135deg,${color}18,transparent)`,
        transition: 'background 0.4s', zIndex: 0,
      }}>
        <div style={{ borderRadius: 19, height: '100%', background: 'linear-gradient(145deg,#0c0c18,#080812)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ position: 'absolute', top: -40, right: -30, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle,${color}${hov?'20':'0d'} 0%,transparent 70%)`, transition: 'background 0.3s', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: hov ? `0 0 18px ${color}38` : 'none', transition: 'box-shadow 0.3s' }}>
            <Icon size={20} strokeWidth={1.6} color={color} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 18, fontWeight: 900, color, fontFamily: 'Cairo, sans-serif' }}>{stat}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700 }}>{statLabel}</div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.025em', lineHeight: 1.2 }}>{title}</h3>
          <span style={{ fontSize: 9.5, fontWeight: 700, color, opacity: 0.85 }}>{sub}</span>
        </div>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, margin: 0, flex: 1, fontFamily: 'Cairo, sans-serif' }}>{desc}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {tags.map(t => (
            <span key={t} style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: `${color}0e`, border: `1px solid ${color}22`, color }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${color},transparent)`, opacity: hov ? 0.65 : 0.2, transition: 'opacity 0.3s' }} />
    </motion.div>
  );
}

function SmallCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const [hov, setHov] = useState(false);
  const { Icon, title, sub, color, stat, statLabel } = s;

  return (
    <motion.div {...fade(i)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: '100%', cursor: 'default' }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 16, padding: 1,
        background: hov ? `linear-gradient(135deg,${color},transparent,${color}44)` : `linear-gradient(135deg,${color}14,transparent)`,
        transition: 'background 0.35s', zIndex: 0,
      }}>
        <div style={{ borderRadius: 15, height: '100%', background: 'linear-gradient(145deg,#0b0b16,#070710)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 8, height: '100%', boxSizing: 'border-box' as const }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}16`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'box-shadow 0.3s', boxShadow: hov ? `0 0 14px ${color}35` : 'none' }}>
            <Icon size={17} strokeWidth={1.7} color={color} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 900, color, fontFamily: 'Cairo, sans-serif' }}>{stat}</div>
        </div>

        <div>
          <div style={{ fontSize: 13.5, fontWeight: 900, color: '#fff', lineHeight: 1.25 }}>{title}</div>
          <div style={{ fontSize: 9, fontWeight: 700, color, opacity: 0.75, marginTop: 2 }}>{sub}</div>
        </div>

        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{statLabel}</div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg,transparent,${color},transparent)`, opacity: hov ? 0.6 : 0.18, transition: 'opacity 0.3s' }} />
    </motion.div>
  );
}

export default function HorizontalServices() {
  const heroes  = SERVICES.filter(s => s.size === 'hero');
  const mediums = SERVICES.filter(s => s.size === 'medium');
  const smalls  = SERVICES.filter(s => s.size === 'small');

  return (
    <section id="services" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient radials */}
      <div style={{ position: 'absolute', top: '15%', left: '8%', width: 550, height: 550, background: 'radial-gradient(ellipse,rgba(139,92,246,0.055) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 450, height: 450, background: 'radial-gradient(ellipse,rgba(6,182,212,0.055) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 64 }}>
          <div>
            <div className="section-label">
              ١٢ خدمة متكاملة
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(2.2rem,4.5vw,3.6rem)', letterSpacing: '-0.03em', lineHeight: 1.15, margin: 0 }}>
              كل ما تحتاجه{' '}
              <span className="grad">
                تحت سقف واحد
              </span>
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 16, marginTop: 16, maxWidth: 500, lineHeight: 1.8 }}>
              من الفكرة إلى الإطلاق — تطبيقات ذكية، مواقع مبهرة، بطاقات ولاء، وأتمتة تربط كل أنظمتك ببعضها.
            </p>
          </div>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 14, flexShrink: 0 }}
          >
            استشارة مجانية <ArrowUpRight size={16} />
          </a>
        </motion.div>

        {/* Row 1: 2 hero cards */}
        <div className="svc-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          {heroes.map((s, i) => (
            <div key={s.title} style={{ height: 320 }}>
              <HeroCard s={s} i={i} />
            </div>
          ))}
        </div>

        {/* Row 2: 4 medium cards */}
        <div className="svc-medium" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 16 }}>
          {mediums.map((s, i) => (
            <div key={s.title} style={{ height: 240 }}>
              <MediumCard s={s} i={i + 2} />
            </div>
          ))}
        </div>

        {/* Row 3: 6 small cards */}
        <div className="svc-small" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 16 }}>
          {smalls.map((s, i) => (
            <div key={s.title} style={{ height: 170 }}>
              <SmallCard s={s} i={i + 6} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{
            marginTop: 40, padding: '28px 32px', borderRadius: 20,
            background: 'linear-gradient(135deg,rgba(139,92,246,0.08),rgba(6,182,212,0.08))',
            border: '1px solid rgba(139,92,246,0.18)',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20,
          }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginBottom: 5 }}>ما لقيت خدمتك؟ 🤔</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>أي فكرة عندك — نقدر نبنيها. تواصل معنا وخلّنا نشوف الحل المناسب.</div>
          </div>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-purple"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            تواصل على واتساب <ArrowUpRight size={14} />
          </a>
        </motion.div>

      </div>

      <div style={{ textAlign: 'center', marginTop: 44 }}>
        <a href="/talqa-tech/services"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.65)', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='#fff'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.20)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.65)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.10)'; }}>
          اكتشف كل الخدمات ←
        </a>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .svc-medium { grid-template-columns: repeat(2,1fr) !important; }
          .svc-small  { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 680px) {
          .svc-hero   { grid-template-columns: 1fr !important; }
          .svc-medium { grid-template-columns: 1fr !important; }
          .svc-small  { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
