import { motion } from 'framer-motion';
import {
  Smartphone, CreditCard, Globe, Monitor, Bot, CalendarDays, Star,
  HeartPulse, Nfc, Zap, Palette, BarChart2, type LucideIcon,
} from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=أبي%20أعرف%20أكثر%20عن%20خدماتكم';

/* ── Mini decorative elements ── */
function PhoneMini({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 14, left: 16, opacity: 0.22 }}>
      <div style={{ width: 36, height: 64, borderRadius: 10, border: `2px solid ${color}`, position: 'relative' }}>
        <div style={{ width: 12, height: 2, borderRadius: 99, background: color, margin: '5px auto 0' }} />
        <div style={{ width: 24, height: 24, borderRadius: 6, background: color, margin: '6px auto 0', opacity: 0.5 }} />
        <div style={{ width: 24, height: 4, borderRadius: 4, background: color, margin: '4px auto 0', opacity: 0.3 }} />
        <div style={{ width: 24, height: 4, borderRadius: 4, background: color, margin: '3px auto 0', opacity: 0.2 }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', border: `2px solid ${color}`, margin: '4px auto 0', opacity: 0.6 }} />
      </div>
    </div>
  );
}

function WalletMini({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 12, left: 14, opacity: 0.22 }}>
      <div style={{ width: 64, height: 40, borderRadius: 8, border: `2px solid ${color}`, position: 'relative', marginBottom: 4 }}>
        <div style={{ width: 16, height: 6, borderRadius: 3, background: color, position: 'absolute', top: 6, left: 8, opacity: 0.8 }} />
        <div style={{ width: 24, height: 3, borderRadius: 99, background: color, position: 'absolute', bottom: 8, left: 8, opacity: 0.4 }} />
      </div>
      <div style={{ width: 64, height: 40, borderRadius: 8, border: `2px solid ${color}`, opacity: 0.5, marginTop: -28, marginLeft: 8 }} />
    </div>
  );
}

function ChatMini({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 12, left: 12, opacity: 0.2 }}>
      {[{ w: 56, r: '12px 12px 12px 2px', mt: 0 }, { w: 40, r: '12px 12px 2px 12px', mt: 6, ml: 16 }, { w: 50, r: '12px 12px 12px 2px', mt: 6 }].map((b, i) => (
        <div key={i} style={{ width: b.w, height: 14, borderRadius: b.r, background: color, marginTop: b.mt, marginLeft: (b as any).ml || 0 }} />
      ))}
    </div>
  );
}

function CalendarMini({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 12, left: 12, opacity: 0.2 }}>
      <div style={{ width: 58, height: 56, borderRadius: 10, border: `2px solid ${color}`, overflow: 'hidden' }}>
        <div style={{ height: 14, background: color, opacity: 0.8 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, padding: 4 }}>
          {[1,1,0,1,0,1,1,0,1,1,0,1].map((v,i) => (
            <div key={i} style={{ height: 6, borderRadius: 2, background: color, opacity: v ? 0.7 : 0.2 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StarMini({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 12, left: 12, opacity: 0.2 }}>
      <div style={{ fontSize: 44, color, lineHeight: 1 }}>★</div>
      <div style={{ fontSize: 28, color, lineHeight: 1, marginTop: -10, marginLeft: 20, opacity: 0.5 }}>★</div>
    </div>
  );
}

function GlobeMini({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 10, left: 10, opacity: 0.18 }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', border: `2px solid ${color}`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: '100%', height: 2, background: color, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', width: 2, height: '100%', background: color, left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }} />
        <div style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${color}`, opacity: 0.5 }} />
      </div>
    </div>
  );
}

function DashboardMini({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 12, left: 12, opacity: 0.2 }}>
      <div style={{ width: 68, height: 50, borderRadius: 8, border: `2px solid ${color}` }}>
        <div style={{ display: 'flex', gap: 3, padding: '5px 5px 0' }}>
          {[40, 60, 30, 70, 50].map((h, i) => (
            <div key={i} style={{ flex: 1, height: h / 5, borderRadius: '2px 2px 0 0', background: color, alignSelf: 'flex-end', opacity: 0.7 }} />
          ))}
        </div>
        <div style={{ height: 2, background: color, opacity: 0.3, margin: '0 5px' }} />
        <div style={{ display: 'flex', gap: 3, padding: '3px 5px' }}>
          {[1,0,1,1,0,1].map((v,i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: color, opacity: v ? 0.4 : 0.1 }} />)}
        </div>
      </div>
    </div>
  );
}

function NfcMini({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 14, left: 14, opacity: 0.2 }}>
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <path d="M26 6 Q44 6 44 26 Q44 46 26 46" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M26 14 Q36 14 36 26 Q36 38 26 38" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M26 22 Q28 22 28 26 Q28 30 26 30" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <circle cx="26" cy="26" r="4" fill={color}/>
      </svg>
    </div>
  );
}

function ZapMini({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 10, left: 10, opacity: 0.18 }}>
      <svg width="52" height="52" viewBox="0 0 24 24" fill={color}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    </div>
  );
}

function HospitalMini({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 12, left: 12, opacity: 0.2 }}>
      <div style={{ width: 52, height: 52, borderRadius: 10, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 24, height: 24 }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 6, borderRadius: 2, background: color, transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 6, borderRadius: 2, background: color, transform: 'translateX(-50%)' }} />
        </div>
      </div>
    </div>
  );
}

function DesignMini({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 12, left: 12, opacity: 0.2 }}>
      <div style={{ display: 'flex', gap: 5 }}>
        {['#FF6B6B','#4ECDC4','#45B7D1'].map((c, i) => (
          <div key={i} style={{ width: 16, height: 16, borderRadius: '50%', background: c, marginTop: i === 1 ? 8 : 0 }} />
        ))}
      </div>
      <div style={{ width: 48, height: 28, borderRadius: 6, border: `2px solid ${color}`, marginTop: 4 }}>
        <div style={{ width: '60%', height: 3, borderRadius: 99, background: color, margin: '6px auto 3px', opacity: 0.7 }} />
        <div style={{ width: '40%', height: 3, borderRadius: 99, background: color, margin: '0 auto', opacity: 0.4 }} />
      </div>
    </div>
  );
}

function AnalyticsMini({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 12, left: 12, opacity: 0.2 }}>
      <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
        <polyline points="4,36 16,20 28,28 40,12 52,4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {[4,16,28,40,52].map((x,i) => {
          const ys = [36,20,28,12,4];
          return <circle key={i} cx={x} cy={ys[i]} r="3" fill={color}/>;
        })}
      </svg>
    </div>
  );
}

/* ── SERVICES DATA ── */
const SERVICES: {
  Icon: LucideIcon; title: string; sub: string; desc: string;
  tags: string[]; color: string; bg: string; size: string;
  Visual: (p: { color: string }) => JSX.Element;
}[] = [
  {
    Icon: Smartphone, title: 'تطبيقات جوال', sub: 'iOS & Android',
    desc:  'تطبيقات احترافية تعمل على جميع الأجهزة بتصميم Native فاخر وتجربة مستخدم لا تُنسى.',
    tags:  ['React Native', 'Push Notifications', 'App Store & Play'],
    color: '#8B5CF6', bg: 'linear-gradient(135deg,#1a0a35 0%,#2d1260 100%)',
    size:  'large', Visual: PhoneMini,
  },
  {
    Icon: CreditCard, title: 'Digital Wallet', sub: 'Apple & Google Wallet',
    desc:  'بطاقات ولاء، حجوزات، تذاكر وعضويات مباشرة في جيب عميلك — iPhone وAndroid، بدون تطبيق.',
    tags:  ['Apple Wallet', 'Google Wallet', 'NFC', 'QR Code'],
    color: '#06B6D4', bg: 'linear-gradient(135deg,#001020 0%,#0C4A6E 100%)',
    size:  'large', Visual: WalletMini,
  },
  {
    Icon: Globe, title: 'مواقع تسويقية', sub: 'Landing Pages',
    desc:  'مواقع سريعة وجذابة تحوّل الزوار إلى عملاء — محسّنة للموبايل وGoogle.',
    tags:  ['SEO', 'Framer Motion', 'Core Web Vitals'],
    color: '#3B82F6', bg: 'linear-gradient(135deg,#000C20 0%,#0F2557 100%)',
    size:  'medium', Visual: GlobeMini,
  },
  {
    Icon: Monitor, title: 'لوحات تحكم', sub: 'Admin Dashboard',
    desc:  'رؤية كاملة على أعمالك — تقارير، مبيعات، عملاء، كل شيء في مكان واحد.',
    tags:  ['Analytics', 'Real-time', 'Multi-user'],
    color: '#10B981', bg: 'linear-gradient(135deg,#001A12 0%,#064E3B 100%)',
    size:  'medium', Visual: DashboardMini,
  },
  {
    Icon: Bot, title: 'مساعد واتساب', sub: 'AI Chatbot',
    desc:  'ذكاء اصطناعي يرد على عملائك بلهجة طبيعية ويحوّل الاستفسار لحجز أو بيع.',
    tags:  ['WhatsApp API', 'AI', 'Auto-reply'],
    color: '#25D366', bg: 'linear-gradient(135deg,#001A0A 0%,#064E20 100%)',
    size:  'medium', Visual: ChatMini,
  },
  {
    Icon: CalendarDays, title: 'نظام حجوزات', sub: 'Booking System',
    desc:  'حجز، تذكير، وإلغاء تلقائي — مع إشعارات واتساب وساعة Apple.',
    tags:  ['Calendar', 'WhatsApp', 'Apple Watch'],
    color: '#F59E0B', bg: 'linear-gradient(135deg,#1A0A00 0%,#4A2800 100%)',
    size:  'medium', Visual: CalendarMini,
  },
  {
    Icon: Star, title: 'برامج ولاء', sub: 'Loyalty Programs',
    desc:  'نقاط، مستويات، ومكافآت — يخلي عميلك يرجع ويرجع.',
    tags:  ['Points', 'Tiers', 'Rewards'],
    color: '#D97706', bg: 'linear-gradient(135deg,#1A0800 0%,#4A2000 100%)',
    size:  'small', Visual: StarMini,
  },
  {
    Icon: HeartPulse, title: 'إدارة عيادات', sub: 'Clinic System',
    desc:  'ملفات مرضى، وصفات، حجوزات، وتقارير طبية — كل شيء رقمي.',
    tags:  ['EMR', 'Prescriptions', 'Reports'],
    color: '#EC4899', bg: 'linear-gradient(135deg,#1A0015 0%,#4A0040 100%)',
    size:  'small', Visual: HospitalMini,
  },
  {
    Icon: Nfc, title: 'بطاقات NFC', sub: 'NFC Business Cards',
    desc:  'ضع جوالك قريب وتنتقل المعلومات — بطاقات أعمال المستقبل.',
    tags:  ['NFC', 'Digital Card', 'vCard'],
    color: '#A855F7', bg: 'linear-gradient(135deg,#100020 0%,#2D0060 100%)',
    size:  'small', Visual: NfcMini,
  },
  {
    Icon: Zap, title: 'أتمتة وربط', sub: 'API & Automation',
    desc:  'ربط أنظمتك ببعض — واتساب، بايمنت، ERP، أي API تبيه.',
    tags:  ['REST API', 'Webhooks', 'Zapier'],
    color: '#FB923C', bg: 'linear-gradient(135deg,#1A0800 0%,#5A2500 100%)',
    size:  'small', Visual: ZapMini,
  },
  {
    Icon: Palette, title: 'تصميم UI/UX', sub: 'Design System',
    desc:  'هوية بصرية متكاملة — من الشعار لكل شاشة في التطبيق.',
    tags:  ['Figma', 'Brand Identity', 'UX Research'],
    color: '#F43F5E', bg: 'linear-gradient(135deg,#200010 0%,#600030 100%)',
    size:  'small', Visual: DesignMini,
  },
  {
    Icon: BarChart2, title: 'تقارير وتحليل', sub: 'Analytics & BI',
    desc:  'بيانات حقيقية تساعدك تاخذ قرارات صح — مبيعات، عملاء، أداء.',
    tags:  ['Power BI', 'Real-time', 'Custom Reports'],
    color: '#84CC16', bg: 'linear-gradient(135deg,#0A1400 0%,#284200 100%)',
    size:  'small', Visual: AnalyticsMini,
  },
];

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
});

function ServiceCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const { Icon, title, sub, desc, tags, color, bg, Visual } = s;
  return (
    <motion.div {...fadeUp(i)}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden',
        background: bg, border: `1px solid ${color}20`,
        boxShadow: `0 0 0 1px ${color}10`,
        padding: '22px 20px 22px',
        display: 'flex', flexDirection: 'column', gap: 10,
        cursor: 'default', height: '100%',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}45`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${color}20, 0 20px 50px rgba(0,0,0,0.5)`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}20`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${color}10`;
      }}
    >
      {/* Glow */}
      <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle,${color}18 0%,transparent 70%)`, pointerEvents: 'none' }} />

      {/* Mini visual (decorative, bottom-left) */}
      <Visual color={color} />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, position: 'relative', zIndex: 2 }}>
        <div style={{ width: 40, height: 40, borderRadius: 11, background: `${color}18`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color }}>
          <Icon size={20} strokeWidth={1.75} />
        </div>
        <div style={{ padding: '3px 9px', borderRadius: 99, background: `${color}15`, border: `1px solid ${color}30`, fontSize: 9, fontWeight: 800, color, whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
          {sub}
        </div>
      </div>

      {/* Title */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h3 style={{ fontSize: 16, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{title}</h3>
      </div>

      {/* Description */}
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.48)', lineHeight: 1.7, margin: 0, position: 'relative', zIndex: 2, fontFamily: 'Cairo,sans-serif', flex: 1 }}>
        {desc}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, position: 'relative', zIndex: 2 }}>
        {tags.map(t => (
          <span key={t} style={{ fontSize: 9.5, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: `${color}10`, border: `1px solid ${color}22`, color: `${color}` }}>
            {t}
          </span>
        ))}
      </div>

      {/* Bottom accent */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${color},transparent)`, opacity: 0.35 }} />
    </motion.div>
  );
}

export default function HorizontalServices() {
  const large  = SERVICES.filter(s => s.size === 'large');
  const medium = SERVICES.filter(s => s.size === 'medium');
  const small  = SERVICES.filter(s => s.size === 'small');

  return (
    <section id="services" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      {/* Background radials */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 500, height: 500, background: 'radial-gradient(ellipse,rgba(139,92,246,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 400, height: 400, background: 'radial-gradient(ellipse,rgba(6,182,212,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 56 }}>
          <div>
            <div className="section-label" style={{ color: '#8B5CF6', borderColor: 'rgba(139,92,246,0.4)', background: 'rgba(139,92,246,0.1)', marginBottom: 16 }}>
              ١٢ خدمة متكاملة
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              كل ما تحتاجه{' '}
              <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                تحت سقف واحد
              </span>
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 15, marginTop: 12, maxWidth: 480, lineHeight: 1.7 }}>
              من الفكرة إلى الإطلاق — تطبيقات، مواقع، بطاقات، أتمتة، وكل شيء بينهم.
            </p>
          </div>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 13, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.35)', color: '#C4B5FD', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
            استشارة مجانية ←
          </a>
        </motion.div>

        {/* ── Row 1: 2 large cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          {large.map((s, i) => (
            <div key={s.title} style={{ height: 240 }}>
              <ServiceCard s={s} i={i} />
            </div>
          ))}
        </div>

        {/* ── Row 2: 4 medium cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 14 }}>
          {medium.map((s, i) => (
            <div key={s.title} style={{ height: 210 }}>
              <ServiceCard s={s} i={i + 2} />
            </div>
          ))}
        </div>

        {/* ── Row 3: 6 small cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 14 }}>
          {small.map((s, i) => (
            <div key={s.title} style={{ height: 190 }}>
              <ServiceCard s={s} i={i + 6} />
            </div>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginTop: 48, padding: '28px 32px', borderRadius: 20, background: 'linear-gradient(135deg,rgba(139,92,246,0.1) 0%,rgba(6,182,212,0.1) 100%)', border: '1px solid rgba(139,92,246,0.2)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginBottom: 5 }}>
              ما لقيت خدمتك؟ 🤔
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
              أي فكرة عندك — نقدر نبنيها. تواصل معنا وخلّنا نشوف الحل المناسب.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-purple"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Smartphone size={14} strokeWidth={1.75} /> تواصل على واتساب
            </a>
          </div>
        </motion.div>

      </div>

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <a href="/talqa-tech/services"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.transform='none'; }}>
          اكتشف كل الخدمات ←
        </a>
      </div>

      {/* Responsive grid fixes */}
      <style>{`
        @media (max-width: 1024px) {
          #services .grid-medium { grid-template-columns: repeat(2,1fr) !important; }
          #services .grid-small  { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 680px) {
          #services .grid-large  { grid-template-columns: 1fr !important; }
          #services .grid-medium { grid-template-columns: 1fr !important; }
          #services .grid-small  { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
