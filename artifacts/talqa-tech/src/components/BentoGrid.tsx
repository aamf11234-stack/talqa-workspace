import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Smartphone, LayoutDashboard, Zap, Bell, Star, Clock3, Gift, Tag, Gem } from 'lucide-react';

/* ─── Animated gradient border card ─── */
function GlowCard({ children, style, accent = '#4F8EFF', delay = 0, className = '' }: any) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.65, delay, ease: [0.22,1,0.36,1] }}
      className={className}
      style={{ position: 'relative', borderRadius: 22, padding: 1, ...style }}
    >
      {/* Rotating gradient border */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 22, zIndex: 0,
        background: `conic-gradient(from var(--rotation, 0deg), transparent 0deg, ${accent}55 60deg, transparent 120deg)`,
        animation: 'spin-border 4s linear infinite',
        opacity: 0.7,
      }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: 22, background: 'rgba(14,14,20,0.6)', zIndex: 0 }} />
      <div ref={ref} style={{ position: 'relative', zIndex: 1, borderRadius: 21, background: 'var(--surface)', height: '100%', overflow: 'hidden' }}
        onMouseMove={e => {
          const el = e.currentTarget;
          const r = el.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width  - 0.5) * 2;
          const y = ((e.clientY - r.top)  / r.height - 0.5) * 2;
          el.style.boxShadow = `inset 0 0 60px rgba(${accent === '#4F8EFF' ? '79,142,255' : '167,139,250'},${Math.abs(x) * 0.12})`;
          el.querySelector('.inner-glow')?.setAttribute('style', `opacity:1;transform:translate(${(x+1)*50-30}%,${(y+1)*50-30}%)`);
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '';
          e.currentTarget.querySelector('.inner-glow')?.setAttribute('style', 'opacity:0');
        }}>
        {/* Inner spotlight */}
        <div className="inner-glow" style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle, ${accent}14, transparent 70%)`, pointerEvents: 'none', opacity: 0, transition: 'opacity 0.3s', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '28px', height: '100%' }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Wallet Live Demo Card ─── */
function WalletCard() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, padding: '5px 12px', borderRadius: 8, background: 'rgba(79,142,255,0.1)', border: '1px solid rgba(79,142,255,0.2)' }}>
          <Wallet size={13} color="#4F8EFF" />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#4F8EFF', letterSpacing: '0.1em' }}>APPLE WALLET</span>
        </div>
        <h3 style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.15 }}>
          بطاقة ولاء رقمية<br />تعيش في محفظة عميلك
        </h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.9, color: 'rgba(255,255,255,0.38)', marginBottom: 24 }}>
          بلمسة واحدة تُضاف للمحفظة — Push Notifications، QR Code، تحديث النقاط آنياً. بلا تطبيق، بلا احتكاك.
        </p>
      </div>
      {/* Mini wallet mockup */}
      <div style={{ background: 'linear-gradient(145deg,#111118,#1C1C28)', borderRadius: 18, padding: '20px', border: '1px solid rgba(79,142,255,0.14)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, #4F8EFF, #6BA3FF)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', fontWeight: 700, letterSpacing: '0.16em', marginBottom: 4 }}>MEMBERSHIP</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>منشأتك</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 6, background: 'rgba(79,142,255,0.1)', border: '1px solid rgba(79,142,255,0.2)' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4F8EFF', animation: 'puls 2s infinite' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#4F8EFF' }}>Gold</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', marginBottom: 3 }}>النقاط</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>٢٬٤٥٠</div>
          </div>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(79,142,255,0.08)', border: '1px solid rgba(79,142,255,0.18)', fontSize: 11, fontWeight: 700, color: '#4F8EFF' }}>
            +٥٠ نقطة ✓
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes puls{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );
}

/* ─── Stats card ─── */
function StatsCard() {
  const bars = [
    { label: 'تطبيقات جوال', pct: 85, color: '#4F8EFF' },
    { label: 'Apple Wallet', pct: 70, color: '#A78BFA' },
    { label: 'مواقع ولوحات', pct: 60, color: '#34D399' },
    { label: 'أتمتة وAPI',  pct: 45, color: '#FB923C' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 10 }}>توزيع المشاريع</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>+١٥ مشروع</div>
      </div>
      {bars.map((b, i) => (
        <div key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>{b.label}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: b.color }}>{b.pct}٪</span>
          </div>
          <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }} whileInView={{ width: `${b.pct}%` }}
              viewport={{ once: true }} transition={{ duration: 1.1, delay: i * 0.12, ease: [0.22,1,0.36,1] }}
              style={{ height: '100%', borderRadius: 99, background: b.color, boxShadow: `0 0 8px ${b.color}55` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Notification card ─── */
function NotifCard() {
  const notifs = [
    { Icon: Gift, title: 'عرض خاص!', sub: 'خصم ٢٠٪ لعملاء Gold', time: 'الآن', color: '#4F8EFF' },
    { Icon: Star, title: 'تهنئة!',   sub: 'وصلت لمستوى Platinum', time: '٢م',   color: '#A78BFA' },
    { Icon: Gem,  title: '+٥٠ نقطة', sub: 'شكراً على زيارتك',    time: 'أمس',  color: '#34D399' },
  ];
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>Push Notifications</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {notifs.map((n, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 13px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${n.color}12`, border: `1px solid ${n.color}22` }}>
              <n.Icon size={14} strokeWidth={1.75} color={n.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{n.title}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)' }}>{n.sub}</div>
            </div>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontWeight: 600 }}>{n.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const SERVICES = [
  { Icon: Smartphone,      title: 'تطبيقات الجوال',    sub: 'iOS & Android',      accent: '#A78BFA', desc: 'تجربة Native فاخرة' },
  { Icon: LayoutDashboard, title: 'مواقع ولوحات تحكم', sub: 'Web Platforms',      accent: '#34D399', desc: 'سرعة + سحابة' },
  { Icon: Zap,             title: 'أتمتة وAPI',         sub: 'Automation',         accent: '#FB923C', desc: 'ربط كامل للأنظمة' },
];

export default function BentoGrid() {
  return (
    <section id="services" style={{ padding: '120px 0', background: 'var(--bg)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>

        <div style={{ marginBottom: 60 }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4F8EFF', marginBottom: 16 }}>ما نبنيه لك</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
            style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.08 }}>
            منظومة متكاملة.<br /><span className="text-blue">خدمة واحدة تشمل الكل.</span>
          </motion.h2>
        </div>

        {/* Bento layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: 14 }} className="bento-grid">

          {/* Wallet — large */}
          <GlowCard delay={0} accent="#4F8EFF" style={{ gridColumn: 'span 2', minHeight: 380 }}>
            <WalletCard />
          </GlowCard>

          {/* Stats */}
          <GlowCard delay={0.08} accent="#A78BFA">
            <StatsCard />
          </GlowCard>

          {/* Service cards */}
          {SERVICES.map((s, i) => (
            <GlowCard key={i} delay={0.14 + i * 0.08} accent={s.accent}>
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 180 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${s.accent}12`, color: s.accent, border: `1px solid ${s.accent}22`, marginBottom: 16 }}>
                  <s.Icon size={19} strokeWidth={1.5} />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)', fontWeight: 700, marginBottom: 6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.sub}</div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#fff', marginBottom: 6, letterSpacing: '-0.02em' }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{s.desc}</div>
                </div>
              </div>
            </GlowCard>
          ))}

          {/* Notifications */}
          <GlowCard delay={0.3} accent="#4F8EFF">
            <NotifCard />
          </GlowCard>

          {/* Trust card */}
          <GlowCard delay={0.36} accent="#34D399" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
              {[
                { Icon: Star,   v: '١٠٠٪', l: 'رضا العملاء', c: '#4F8EFF' },
                { Icon: Clock3, v: '٢٤/٧',  l: 'دعم فني',    c: '#A78BFA' },
                { Icon: Zap,    v: '< ٢٤ ساعة', l: 'وقت الرد', c: '#34D399' },
                { Icon: Bell,   v: 'آني',   l: 'تحديث البيانات', c: '#FB923C' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.5 }}
                  style={{ textAlign: 'center', flex: 1, minWidth: 100 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${item.c}12`, color: item.c, border: `1px solid ${item.c}22` }}>
                    <item.Icon size={17} strokeWidth={1.5} />
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 4 }}>{item.v}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{item.l}</div>
                </motion.div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>

      <style>{`
        @keyframes spin-border { to { --rotation: 360deg } }
        @property --rotation { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        @media(max-width:900px) { .bento-grid { grid-template-columns:1fr!important } .bento-grid > * { grid-column: span 1!important } }
        @media(min-width:901px) and (max-width:1100px) { .bento-grid { grid-template-columns:1fr 1fr!important } }
      `}</style>
    </section>
  );
}
