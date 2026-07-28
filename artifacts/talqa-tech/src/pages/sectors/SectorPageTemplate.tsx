import { motion } from 'framer-motion';
import { Link } from 'wouter';
import PageLayout from '../PageLayout';

export interface SectorData {
  slug: string; icon: string; name: string; tagline: string;
  headline: [string, string]; description: string;
  accent: string; accent2: string; floatingEmojis: string[];
  problems: { icon: string; title: string; desc: string }[];
  features: { icon: string; title: string; desc: string }[];
  stats: { n: string; label: string }[];
  walletTitle: string; walletDesc: string; walletCardLabel: string; walletFeatures: string[];
  howItWorks: { step: string; title: string; desc: string }[];
  testimonial?: { text: string; name: string; role: string };
  packages: { name: string; price: string; features: string[]; highlight?: boolean }[];
  ctaLabel: string; waMsg: string;
}

function rgb(h: string) {
  const r = parseInt(h.slice(1,3),16), g = parseInt(h.slice(3,5),16), b = parseInt(h.slice(5,7),16);
  return isNaN(r) ? '139,92,246' : `${r},${g},${b}`;
}

const WA_BASE = 'https://wa.me/966551378531?text=';

/* ─── Phone Mockup ─── */
function PhoneMockup({ d }: { d: SectorData }) {
  const c = rgb(d.accent);
  return (
    <div style={{ position: 'relative', width: 220, margin: '0 auto' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', inset: -40,
        background: `radial-gradient(circle, rgba(${c},0.30) 0%, transparent 70%)`,
        pointerEvents: 'none', borderRadius: '50%' }} />
      {/* Phone shell */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 220, height: 420, borderRadius: 38,
          background: 'linear-gradient(160deg, #1a1a2e 0%, #0d0d1a 100%)',
          border: '2px solid rgba(255,255,255,0.10)',
          boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), 0 0 60px rgba(${c},0.20)`,
          position: 'relative', overflow: 'hidden', padding: '14px 12px',
        }}>
        {/* Notch */}
        <div style={{ width: 70, height: 22, borderRadius: 11,
          background: '#000', margin: '0 auto 10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333' }} />
          <div style={{ width: 30, height: 5, borderRadius: 3, background: '#111' }} />
        </div>
        {/* App content */}
        <div style={{ height: 340, borderRadius: 24,
          background: `linear-gradient(160deg, rgba(${c},0.15) 0%, rgba(10,10,25,0.95) 100%)`,
          border: `1px solid rgba(${c},0.18)`, overflow: 'hidden', padding: 14 }}>
          {/* App header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10,
              background: `linear-gradient(135deg, ${d.accent}, ${d.accent2})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
              {d.icon}
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>{d.name}</div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontFamily: 'Cairo,sans-serif' }}>تلقا تك</div>
            </div>
            <div style={{ marginRight: 'auto', width: 6, height: 6, borderRadius: '50%',
              background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
          </div>
          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 12 }}>
            {[d.stats[0], d.stats[1]].map((s, i) => (
              <div key={i} style={{ padding: '8px 10px', borderRadius: 10,
                background: `rgba(${c},0.12)`, border: `1px solid rgba(${c},0.20)` }}>
                <div style={{ fontSize: 14, fontWeight: 900, color: d.accent, letterSpacing: -0.5 }}>{s.n}</div>
                <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.45)', fontFamily: 'Cairo,sans-serif', marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* Features mini-list */}
          {d.features.slice(0, 4).map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8,
              padding: '7px 9px', borderRadius: 9,
              background: i === 0 ? `rgba(${c},0.10)` : 'rgba(255,255,255,0.03)',
              border: i === 0 ? `1px solid rgba(${c},0.20)` : '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: 12 }}>{f.icon}</span>
              <span style={{ fontSize: 8.5, fontWeight: 700, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)',
                fontFamily: 'Cairo,sans-serif', flex: 1 }}>{f.title}</span>
              {i === 0 && <div style={{ width: 5, height: 5, borderRadius: '50%',
                background: d.accent, boxShadow: `0 0 5px ${d.accent}` }} />}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({ f, accent, accent2, index }: { f: SectorData['features'][0]; accent: string; accent2: string; index: number }) {
  const c = rgb(accent);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: `0 20px 48px rgba(${c},0.18)` }}
      style={{
        padding: '22px 20px', borderRadius: 18, cursor: 'default',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(${c},0.12)`,
        transition: 'box-shadow 0.25s, transform 0.25s',
        position: 'relative', overflow: 'hidden',
      }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${accent}, ${accent2})`, opacity: 0.6 }} />
      <div style={{ width: 44, height: 44, borderRadius: 14, marginBottom: 14,
        background: `rgba(${c},0.12)`, border: `1px solid rgba(${c},0.20)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
        {f.icon}
      </div>
      <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 7 }}>{f.title}</div>
      <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.7 }}>{f.desc}</div>
    </motion.div>
  );
}

export default function SectorPage({ d }: { d: SectorData }) {
  const WA = `${WA_BASE}${encodeURIComponent(d.waMsg)}`;
  const c = rgb(d.accent), c2 = rgb(d.accent2);

  return (
    <PageLayout accent={d.accent}>

      {/* ══ HERO ══ */}
      <section style={{
        minHeight: '100vh', display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 48, alignItems: 'center',
        padding: 'clamp(100px,12vw,140px) clamp(20px,5vw,80px) 80px',
        maxWidth: 1200, margin: '0 auto',
        position: 'relative',
      }}>
        {/* Background */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%',
            background: d.accent, filter: 'blur(200px)', opacity: 0.08 }} />
          <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 500, height: 500, borderRadius: '50%',
            background: d.accent2, filter: 'blur(180px)', opacity: 0.07 }} />
        </div>

        {/* Left — text */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          {/* Tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px',
            borderRadius: 24, background: `rgba(${c},0.10)`, border: `1px solid rgba(${c},0.28)`, marginBottom: 24 }}>
            <span style={{ fontSize: 18 }}>{d.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: d.accent }}>{d.tagline}</span>
          </div>

          <h1 style={{ fontWeight: 900, fontSize: 'clamp(2.4rem,5vw,4rem)',
            letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 20 }}>
            <span style={{ color: '#fff', display: 'block' }}>{d.headline[0]}</span>
            <span style={{ background: `linear-gradient(135deg,${d.accent},${d.accent2})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block' }}>
              {d.headline[1]}
            </span>
          </h1>

          <p style={{ fontSize: 15.5, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 28, maxWidth: 480 }}>
            {d.description}
          </p>

          {/* Quick feature tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {d.features.slice(0, 4).map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 12px', borderRadius: 10,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
                <span style={{ color: d.accent }}>✓</span> {f.title}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px',
                borderRadius: 14, background: `linear-gradient(135deg,${d.accent},${d.accent2})`,
                color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 15, fontWeight: 900,
                textDecoration: 'none', boxShadow: `0 12px 36px rgba(${c},0.38)` }}>
              {d.ctaLabel} ←
            </motion.a>
            <Link href="/projects" style={{ display: 'inline-flex', alignItems: 'center',
              padding: '14px 24px', borderRadius: 14,
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
              color: 'var(--text2)', fontFamily: 'Cairo,sans-serif', fontSize: 14,
              fontWeight: 700, textDecoration: 'none' }}>
              شوف أعمالنا
            </Link>
          </div>

          {/* Trust */}
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 28 }}>
            {['تسليم ٢ أسبوع', 'دعم ٣ أشهر مجاناً', 'بدون عقود', 'سعودي ١٠٠٪'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 11.5, color: 'rgba(255,255,255,0.32)', fontWeight: 600 }}>
                <span style={{ color: d.accent }}>✓</span>{t}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — phone */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <PhoneMockup d={d} />
        </motion.div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ padding: '48px 24px',
        background: `linear-gradient(135deg,rgba(${c},0.07),rgba(${c2},0.04))`,
        borderTop: `1px solid rgba(${c},0.12)`, borderBottom: `1px solid rgba(${c},0.12)` }}>
        <div style={{ maxWidth: 960, margin: '0 auto',
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {d.stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.10 }}
              style={{ flex: '1 1 140px', textAlign: 'center', padding: '16px 20px',
                borderRight: i < d.stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: d.accent, letterSpacing: -1, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 5 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ التطبيق — ما الذي نبنيه لك ══ */}
      <section style={{ padding: 'clamp(70px,9vw,110px) 24px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-label" style={{ color: d.accent,
              borderColor: `rgba(${c},0.3)`, background: `rgba(${c},0.08)`, marginBottom: 16 }}>
              📱 التطبيق الذي نبنيه لك
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#fff', marginBottom: 12 }}>
              منظومة رقمية متكاملة لـ{d.name}
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
              مش مجرد تطبيق — نظام يشتغل وأنت نايم ويرجّع العميل تلقائياً.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {d.features.map((f, i) => (
              <FeatureCard key={i} f={f} accent={d.accent} accent2={d.accent2} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ المشاكل التي نحلّها ══ */}
      <section style={{ padding: 'clamp(70px,9vw,110px) 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ color: d.accent,
              borderColor: `rgba(${c},0.3)`, background: `rgba(${c},0.08)`, marginBottom: 16 }}>
              🎯 التحديات التي نحلّها
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#fff', marginBottom: 10 }}>
              نفهم <span style={{ color: d.accent }}>{d.name}</span> قبل ما تشرح
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            {d.problems.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ padding: '22px 20px', borderRadius: 18,
                  background: `linear-gradient(145deg,rgba(${c},0.06),rgba(255,255,255,0.02))`,
                  border: `1px solid rgba(${c},0.12)`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg,${d.accent},${d.accent2})`, opacity: 0.45 }} />
                <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 7 }}>{p.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.7 }}>{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ كيف يدعم قطاعك ══ */}
      <section style={{ padding: 'clamp(70px,9vw,110px) 24px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-label" style={{ color: d.accent,
              borderColor: `rgba(${c},0.3)`, background: `rgba(${c},0.08)`, marginBottom: 16 }}>
              🚀 كيف يدعم قطاعك
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#fff', marginBottom: 10 }}>
              من واتساب إلى المنتج الحي
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 15 }}>
              ٣ خطوات وعملك يشتغل رقمياً بالكامل
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {d.howItWorks.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                style={{ display: 'flex', gap: 20, alignItems: 'center',
                  padding: '24px 28px', borderRadius: 18,
                  background: `rgba(${c},0.05)`, border: `1px solid rgba(${c},0.12)` }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg,${d.accent},${d.accent2})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 900, color: '#fff',
                  boxShadow: `0 8px 24px rgba(${c},0.40)` }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: d.accent, marginBottom: 4,
                    letterSpacing: 0.5 }}>{s.step}</div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginBottom: 5 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ APPLE WALLET ══ */}
      <section style={{ padding: 'clamp(70px,9vw,110px) 24px', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: 56, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="section-label" style={{ color: d.accent,
              borderColor: `rgba(${c},0.3)`, background: `rgba(${c},0.08)`,
              marginBottom: 20, display: 'inline-flex' }}>
              💳 Apple & Google Wallet
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem,3.5vw,2.5rem)',
              color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>{d.walletTitle}</h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 24 }}>{d.walletDesc}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px',
              display: 'flex', flexDirection: 'column', gap: 9 }}>
              {d.walletFeatures.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9,
                  fontSize: 13.5, color: 'var(--text2)' }}>
                  <span style={{ color: d.accent, flexShrink: 0, marginTop: 1 }}>✓</span>{f}
                </li>
              ))}
            </ul>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px',
                borderRadius: 12, background: `rgba(${c},0.12)`, border: `1px solid rgba(${c},0.30)`,
                color: d.accent, fontFamily: 'Cairo,sans-serif', fontSize: 14,
                fontWeight: 700, textDecoration: 'none' }}>
              اطلب بطاقتك الآن ←
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 290 }}>
              <div style={{ position: 'absolute', inset: -40,
                background: `radial-gradient(circle,rgba(${c},0.22) 0%,transparent 70%)`,
                pointerEvents: 'none' }} />
              <motion.div animate={{ y: [0, -10, 0], rotateY: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 290, height: 175, borderRadius: 20,
                  background: `linear-gradient(135deg,${d.accent}ee,${d.accent2}dd)`,
                  boxShadow: `0 32px 72px rgba(${c},0.50)`,
                  padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -50, left: -50, width: 150, height: 150,
                  borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', marginBottom: 24 }}>
                  <span style={{ fontSize: 28 }}>{d.icon}</span>
                  <div style={{ fontSize: 8.5, fontWeight: 800, color: 'rgba(255,255,255,0.65)',
                    letterSpacing: 1, background: 'rgba(0,0,0,0.2)', padding: '3px 8px', borderRadius: 4 }}>
                    APPLE WALLET
                  </div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 3 }}>
                  {d.walletCardLabel}
                </div>
                <div style={{ fontSize: 17, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>
                  تلقا تك · {d.name}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.5 }}
                style={{ marginTop: 14, padding: '10px 16px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16 }}>📱</span>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: '#fff' }}>تضاف لـ iPhone مباشرة</div>
                  <div style={{ fontSize: 9, color: 'var(--text3)' }}>بدون App Store — مع NFC</div>
                </div>
                <div style={{ marginRight: 'auto', fontSize: 10, fontWeight: 700, color: d.accent,
                  background: `rgba(${c},0.10)`, padding: '2px 8px', borderRadius: 8 }}>NFC ✓</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ TESTIMONIAL ══ */}
      {d.testimonial && (
        <section style={{ padding: '48px 24px', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ padding: '36px 32px', borderRadius: 22,
                background: `linear-gradient(145deg,rgba(${c},0.08),rgba(${c2},0.04))`,
                border: `1px solid rgba(${c},0.20)` }}>
              <div style={{ fontSize: 32, marginBottom: 14, color: d.accent }}>"</div>
              <p style={{ fontSize: 16, color: '#fff', lineHeight: 1.85,
                marginBottom: 22, fontWeight: 600 }}>{d.testimonial.text}</p>
              <div style={{ fontSize: 13, fontWeight: 800, color: d.accent }}>{d.testimonial.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{d.testimonial.role}</div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ══ FINAL CTA ══ */}
      <section style={{
        padding: 'clamp(80px,10vw,120px) 24px',
        background: `radial-gradient(ellipse 70% 60% at 50% 50%,rgba(${c},0.10) 0%,transparent 70%)`,
        textAlign: 'center',
      }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ fontSize: 52, marginBottom: 20 }}>{d.icon}</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#fff', marginBottom: 12 }}>
            مستعد تطوّر {d.name}ك؟
          </h2>
          <p style={{ fontSize: 15.5, color: 'var(--text2)', marginBottom: 36, maxWidth: 400, margin: '0 auto 36px' }}>
            تواصل معنا — نرد خلال ساعات ونبدأ بتحليل مشروعك مجاناً.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 42px',
                borderRadius: 16, background: `linear-gradient(135deg,${d.accent},${d.accent2})`,
                color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 16, fontWeight: 900,
                textDecoration: 'none', boxShadow: `0 16px 48px rgba(${c},0.40)` }}>
              ابدأ الآن على واتساب ←
            </motion.a>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center',
              padding: '16px 32px', borderRadius: 16,
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
              color: 'var(--text2)', fontFamily: 'Cairo,sans-serif', fontSize: 14,
              fontWeight: 700, textDecoration: 'none' }}>
              الرئيسية
            </Link>
          </div>
        </motion.div>
      </section>
    </PageLayout>
  );
}
