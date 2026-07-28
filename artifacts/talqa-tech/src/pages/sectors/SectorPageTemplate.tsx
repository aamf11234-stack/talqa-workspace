import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  ArrowUpLeft, CheckCircle2, MoveRight, Wallet,
  Smartphone, BarChart3, Bell, Star, PlayCircle,
} from 'lucide-react';
import PageLayout from '../PageLayout';
import { useIsMobile } from '../../hooks/useIsMobile';

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

/* ─── Design tokens ─── */
const C = {
  ink:       '#818CF8',   // indigo-400
  ink2:      '#6366F1',   // indigo-500
  inkSoft:   'rgba(129,140,248,0.10)',
  inkBorder: 'rgba(129,140,248,0.18)',
  inkGlow:   '0 0 80px rgba(99,102,241,0.25)',
  white:     '#FFFFFF',
  dim:       'rgba(255,255,255,0.50)',
  dimmer:    'rgba(255,255,255,0.25)',
  dimmest:   'rgba(255,255,255,0.10)',
  surface:   'rgba(255,255,255,0.035)',
  border:    'rgba(255,255,255,0.07)',
  bg:        '#07071a',
  bg2:       '#0b0b22',
};

const WA_BASE = 'https://wa.me/966551378531?text=';

const WA_SVG = (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L.054 23.077a.75.75 0 00.917.944l5.453-1.426A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 01-4.978-1.371l-.357-.212-3.698.967.984-3.593-.232-.369A9.718 9.718 0 012.25 12C2.25 6.61 6.61 2.25 12 2.25S21.75 6.61 21.75 12 17.39 21.75 12 21.75z"/>
  </svg>
);

/* ────────────────────────────────────
   PHONE MOCKUP — premium floating glass
──────────────────────────────────── */
function PhoneMockup({ d, isMobile = false }: { d: SectorData; isMobile?: boolean }) {
  return (
    <div style={{ position: 'relative', width: 260 }}>
      {/* Outer ambient glow */}
      <div style={{
        position: 'absolute', inset: -60,
        background: 'radial-gradient(circle, rgba(99,102,241,0.30) 0%, transparent 65%)',
        pointerEvents: 'none',
      }}/>

      {/* Floating stat pill — top right */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{
            position: 'absolute', top: 40, right: -54, zIndex: 10,
            background: 'rgba(10,10,30,0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(129,140,248,0.25)',
            borderRadius: 14, padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
          }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: C.inkSoft,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart3 size={14} strokeWidth={2} color={C.ink}/>
          </div>
          <div>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 15,
              color: '#fff', lineHeight: 1 }}>{d.stats[0].n}</div>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 9, color: C.dim, marginTop: 2 }}>{d.stats[0].label}</div>
          </div>
        </motion.div>
      )}

      {/* Floating notification pill — bottom left */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          style={{
            position: 'absolute', bottom: 80, left: -60, zIndex: 10,
            background: 'rgba(10,10,30,0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(129,140,248,0.22)',
            borderRadius: 14, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
            maxWidth: 180,
          }}>
          <div style={{ width: 28, height: 28, borderRadius: 8,
            background: 'rgba(16,185,129,0.15)', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={13} strokeWidth={2} color="#10B981"/>
          </div>
          <div>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 10,
              color: '#fff', lineHeight: 1.3 }}>إشعار جديد</div>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 8.5, color: '#10B981', marginTop: 2 }}>+٣٥ نقطة أُضيفت</div>
          </div>
        </motion.div>
      )}

      {/* Phone shell */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 260, height: 500, borderRadius: 44,
          background: 'linear-gradient(160deg, #16163a 0%, #0a0a1e 100%)',
          border: '1.5px solid rgba(129,140,248,0.20)',
          boxShadow: [
            '0 60px 120px rgba(0,0,0,0.70)',
            '0 0 0 1px rgba(255,255,255,0.04)',
            '0 0 100px rgba(99,102,241,0.22)',
            'inset 0 1px 0 rgba(255,255,255,0.06)',
          ].join(', '),
          position: 'relative', overflow: 'hidden', padding: '16px 14px',
        }}>
        {/* Internal glass sheen */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 200,
          background: 'linear-gradient(180deg, rgba(129,140,248,0.08) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}/>
        {/* Notch */}
        <div style={{ width: 80, height: 24, borderRadius: 12, background: '#000',
          margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#1c1c1c', border: '1px solid #333' }}/>
          <div style={{ width: 34, height: 5, borderRadius: 3, background: '#111' }}/>
        </div>

        {/* App content */}
        <div style={{ height: 400, borderRadius: 28, overflow: 'hidden',
          background: 'linear-gradient(160deg, rgba(129,140,248,0.12) 0%, rgba(8,8,28,0.98) 100%)',
          border: '1px solid rgba(129,140,248,0.16)', padding: 16 }}>

          {/* Status bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>9:41</span>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {[1,2,3].map(i => <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }}/>)}
            </div>
          </div>

          {/* App header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12,
              background: `linear-gradient(135deg, ${C.ink}, ${C.ink2})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
              boxShadow: `0 6px 20px rgba(99,102,241,0.40)` }}>
              {d.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>{d.name}</div>
              <div style={{ fontSize: 8, color: C.dim, fontFamily: 'Cairo,sans-serif' }}>مدعوم بتلقا تك</div>
            </div>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981',
              boxShadow: '0 0 8px rgba(16,185,129,0.8)' }}/>
          </div>

          {/* Big stat hero */}
          <div style={{ padding: '14px 14px', borderRadius: 16,
            background: `linear-gradient(135deg, rgba(129,140,248,0.15), rgba(99,102,241,0.08))`,
            border: '1px solid rgba(129,140,248,0.20)', marginBottom: 12 }}>
            <div style={{ fontSize: 8, color: C.dim, fontFamily: 'Cairo,sans-serif', marginBottom: 4 }}>الإيراد هذا الشهر</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: -1, lineHeight: 1, fontFamily: 'Cairo,sans-serif' }}>
              ٤٢,٣٠٠ ر
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '2px 7px', borderRadius: 99,
                background: 'rgba(16,185,129,0.15)' }}>
                <span style={{ fontSize: 8, color: '#10B981', fontWeight: 800 }}>↑٢٤٪</span>
              </div>
              <span style={{ fontSize: 8, color: C.dim, fontFamily: 'Cairo,sans-serif' }}>مقارنة بالشهر الماضي</span>
            </div>
          </div>

          {/* Feature rows */}
          {d.features.slice(0, 3).map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8,
              padding: '8px 10px', borderRadius: 11,
              background: i === 0 ? 'rgba(129,140,248,0.10)' : 'rgba(255,255,255,0.025)',
              border: `1px solid ${i === 0 ? 'rgba(129,140,248,0.20)' : 'rgba(255,255,255,0.05)'}`,
            }}>
              <span style={{ fontSize: 13, flexShrink: 0 }}>{f.icon}</span>
              <span style={{ fontSize: 9, fontWeight: 700,
                color: i === 0 ? '#fff' : 'rgba(255,255,255,0.45)',
                fontFamily: 'Cairo,sans-serif', flex: 1 }}>{f.title}</span>
              {i === 0 && (
                <div style={{ width: 16, height: 16, borderRadius: '50%',
                  background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={9} strokeWidth={2.5} color="#10B981"/>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Home bar */}
        <div style={{ width: 80, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.14)', margin: '12px auto 0' }}/>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────
   SECTION LABEL — brand-quality badge
──────────────────────────────────── */
function SectionBadge({ label }: { label: string }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.ink,
        boxShadow: '0 0 8px rgba(129,140,248,0.7)' }}/>
      <span style={{
        fontFamily: 'sans-serif', fontWeight: 700, fontSize: 11,
        color: C.ink, letterSpacing: 2.5, textTransform: 'uppercase',
      }}>{label}</span>
    </div>
  );
}

/* ────────────────────────────────────
   BENTO FEATURES
──────────────────────────────────── */
function BentoFeatures({ features, isMobile = false }: { features: SectorData['features']; isMobile?: boolean }) {
  const m = isMobile;
  // Layout: 1 large (span 2 cols) + 1 medium | then 3 equal
  return (
    <div>
      {/* Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1.7fr 1fr', gap: 12, marginBottom: 12 }}>
        {/* Large card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{
            padding: '36px 32px', borderRadius: 24,
            background: 'linear-gradient(135deg, rgba(129,140,248,0.12) 0%, rgba(6,6,20,0.95) 100%)',
            border: '1px solid rgba(129,140,248,0.20)',
            position: 'relative', overflow: 'hidden', minHeight: 220,
          }}>
          {/* Corner decoration */}
          <div style={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 70%)',
            pointerEvents: 'none' }}/>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.5), transparent)' }}/>

          <div style={{ width: 52, height: 52, borderRadius: 16, marginBottom: 20,
            background: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.20)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
            {features[0].icon}
          </div>
          <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 19,
            color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>
            {features[0].title}
          </div>
          <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 13.5,
            color: C.dim, lineHeight: 1.75 }}>{features[0].desc}</div>
        </motion.div>

        {/* Medium card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
          style={{
            padding: '32px 28px', borderRadius: 24,
            background: C.surface, border: `1px solid ${C.border}`,
            position: 'relative', overflow: 'hidden', minHeight: 220,
          }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 3, bottom: 0,
            background: `linear-gradient(180deg, ${C.ink}, transparent)`, opacity: 0.5 }}/>
          <div style={{ width: 46, height: 46, borderRadius: 14, marginBottom: 18,
            background: C.inkSoft, border: `1px solid ${C.inkBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            {features[1].icon}
          </div>
          <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 16,
            color: '#fff', marginBottom: 8 }}>{features[1].title}</div>
          <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 12.5,
            color: C.dim, lineHeight: 1.75 }}>{features[1].desc}</div>
        </motion.div>
      </div>

      {/* Row 2 — three equal */}
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
        {features.slice(2, 5).map((f, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
            style={{
              padding: '26px 24px', borderRadius: 20,
              background: C.surface, border: `1px solid ${C.border}`,
              position: 'relative', overflow: 'hidden',
            }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: `linear-gradient(90deg, transparent, rgba(129,140,248,0.35), transparent)` }}/>
            <div style={{ width: 42, height: 42, borderRadius: 13, marginBottom: 16,
              background: C.inkSoft, border: `1px solid ${C.inkBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              {f.icon}
            </div>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 14.5,
              color: '#fff', marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 12,
              color: C.dim, lineHeight: 1.7 }}>{f.desc}</div>
          </motion.div>
        ))}
      </div>

      {/* If 6th feature */}
      {features.length >= 6 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.2 }}
          style={{ marginTop: 12, padding: '24px 28px', borderRadius: 20,
            background: C.surface, border: `1px solid ${C.border}`,
            display: 'flex', gap: 20, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, rgba(129,140,248,0.30), transparent)` }}/>
          <div style={{ width: 46, height: 46, borderRadius: 14, flexShrink: 0,
            background: C.inkSoft, border: `1px solid ${C.inkBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            {features[5].icon}
          </div>
          <div>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 15,
              color: '#fff', marginBottom: 6 }}>{features[5].title}</div>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 13,
              color: C.dim, lineHeight: 1.6 }}>{features[5].desc}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ────────────────────────────────────
   DEMO BANNER — maps slug → live demo
──────────────────────────────────── */
const DEMO_MAP: Record<string, { url: string; label: string; hasInput?: boolean }> = {
  cafes:       { url: '/brown-dose/?mode=app', label: 'جرّب تطبيق الكافيه الآن', hasInput: true },
  restaurants: { url: '/brown-dose/?mode=app', label: 'جرّب تطبيق المطعم الآن', hasInput: true },
  clinics:     { url: '/clinic-demo/',         label: 'جرّب ديمو نظام العيادة' },
  hotels:      { url: '/clinic-demo/',         label: 'جرّب الديمو التجريبي' },
};

function DemoBanner({ slug, name, accent, accent2, isMobile }: {
  slug: string; name: string; accent: string; accent2: string; isMobile: boolean;
}) {
  const [bizName, setBizName] = useState('');
  const demo = DEMO_MAP[slug];
  if (!demo) return null;

  const finalUrl = demo.hasInput && bizName.trim()
    ? `${demo.url}&biz=${encodeURIComponent(bizName.trim())}`
    : demo.url;

  return (
    <section style={{
      margin: '0', padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)',
      background: `linear-gradient(135deg,${accent}12 0%,${C.bg2} 50%,${accent2}08 100%)`,
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, borderRadius: '50%', background: `radial-gradient(ellipse,${accent}18 0%,transparent 65%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'center' }}>

          {/* Text side */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 99, background: `${accent}18`, border: `1px solid ${accent}33`, marginBottom: 24 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: accent, animation: 'tmpl-pulse 2s infinite' }} />
              <span style={{ fontWeight: 800, fontSize: 11, color: accent, letterSpacing: 1.5 }}>ديمو حي — جرّب قبل ما تقرر</span>
            </div>

            <h2 style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 14 }}>
              شوف كيف سيبدو نظام <span style={{ background: `linear-gradient(135deg,${accent},${accent2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{name}</span>ك
            </h2>
            <p style={{ fontFamily: 'Cairo,sans-serif', fontSize: 15, color: C.dim, lineHeight: 1.8, marginBottom: 28 }}>
              ديمو تفاعلي حي — جرّب كل الميزات الآن بدون تسجيل أو بطاقة بنكية.
            </p>

            {/* Input if applicable */}
            {demo.hasInput && (
              <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
                <input
                  value={bizName}
                  onChange={e => setBizName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && bizName.trim()) window.open(finalUrl, '_blank'); }}
                  placeholder={`اسم ${name}ك… مثال: بيت الأصيل`}
                  style={{ flex: 1, minWidth: 180, padding: '14px 18px', borderRadius: 13, background: 'rgba(255,255,255,0.06)', border: `1px solid ${bizName ? accent+'55' : 'rgba(255,255,255,0.12)'}`, color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 600, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s', direction: 'rtl' }}
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={finalUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 32px', borderRadius: 14, background: `linear-gradient(135deg,${accent},${accent2})`, color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 15, fontWeight: 900, textDecoration: 'none', boxShadow: `0 10px 36px ${accent}40` }}>
                <PlayCircle size={18} strokeWidth={2} />
                {demo.label}
              </a>
            </div>

            <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
              {['بدون تسجيل', 'بدون بطاقة بنكية', 'مجاني تماماً'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={12} strokeWidth={2.5} color={accent} />
                  <span style={{ fontFamily: 'Cairo,sans-serif', fontSize: 12, fontWeight: 700, color: C.dimmer }}>{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual side */}
          {!isMobile && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center' }}>

              {/* Role cards for clinics */}
              {slug === 'clinics' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { role: 'المالك', icon: '👑', url: '/clinic-demo/owner', color: '#F59E0B', desc: 'إيرادات، أداء، قرارات' },
                    { role: 'الطبيب', icon: '🩺', url: '/clinic-demo/doctor', color: '#10B981', desc: 'مرضى، وصفات، مواعيد' },
                    { role: 'الاستقبال', icon: '💁', url: '/clinic-demo/reception', color: accent, desc: 'حجوزات، تسجيل، انتظار' },
                  ].map(r => (
                    <a key={r.role} href={r.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 16, background: `${r.color}12`, border: `1px solid ${r.color}28`, textDecoration: 'none', transition: 'all 0.2s', width: 280 }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background=`${r.color}20`; (e.currentTarget as HTMLElement).style.borderColor=`${r.color}50`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background=`${r.color}12`; (e.currentTarget as HTMLElement).style.borderColor=`${r.color}28`; }}>
                      <div style={{ width: 44, height: 44, borderRadius: 14, background: `${r.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{r.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 15, color: '#fff', marginBottom: 3 }}>دخول كـ {r.role}</div>
                        <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 11.5, color: C.dim }}>{r.desc}</div>
                      </div>
                      <ArrowUpLeft size={14} strokeWidth={2} color={r.color} />
                    </a>
                  ))}
                </div>
              ) : (
                /* Phone mockup for other demos */
                <motion.div animate={{ y: [0,-10,0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: 220, height: 440, borderRadius: 38, background: 'linear-gradient(160deg,#141428,#07071a)', border: `1.5px solid ${accent}30`, boxShadow: [`0 50px 100px rgba(0,0,0,0.7)`, `0 0 60px ${accent}18`].join(','), padding: '14px 12px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 150, background: `linear-gradient(180deg,${accent}14,transparent)`, pointerEvents: 'none' }} />
                  <div style={{ width: 68, height: 20, borderRadius: 10, background: '#000', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#1c1c1c', border: '1px solid #333' }} />
                    <div style={{ width: 28, height: 4, borderRadius: 2, background: '#111' }} />
                  </div>
                  <div style={{ height: 350, borderRadius: 24, background: `linear-gradient(160deg,${accent}15,rgba(7,7,26,0.98))`, border: `1px solid ${accent}18`, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg,${accent},${accent2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✨</div>
                      <div style={{ fontSize: 11, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>{bizName || `${name}ك`}</div>
                    </div>
                    <div style={{ borderRadius: 12, background: `${accent}20`, border: `1px solid ${accent}30`, padding: '12px' }}>
                      <div style={{ fontSize: 8, color: C.dim, fontFamily: 'Cairo,sans-serif', marginBottom: 4 }}>رصيد نقاطك</div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif', lineHeight: 1 }}>٢٤٠ نقطة</div>
                    </div>
                    {['خدمة ١', 'خدمة ٢', 'خدمة ٣'].map((s, i) => (
                      <div key={i} style={{ padding: '9px 11px', borderRadius: 11, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'Cairo,sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: accent, flexShrink: 0 }} />{s}
                      </div>
                    ))}
                    <div style={{ marginTop: 'auto', padding: '11px', borderRadius: 12, background: `linear-gradient(135deg,${accent},${accent2})`, textAlign: 'center', fontSize: 10, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>
                      {demo.label} ←
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
      <style>{`@keyframes tmpl-pulse { 0%,100%{opacity:1}50%{opacity:0.4} }`}</style>
    </section>
  );
}

/* ────────────────────────────────────
   MAIN EXPORT
──────────────────────────────────── */
export default function SectorPage({ d }: { d: SectorData }) {
  const m = useIsMobile();
  const WA = `${WA_BASE}${encodeURIComponent(d.waMsg)}`;

  return (
    <PageLayout accent={C.ink}>

      {/* ═══════════════════════════════════════════
          HERO — full-screen editorial split
      ═══════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr',
        gap: 0, alignItems: 'center',
        padding: m ? '100px 20px 60px' : 'clamp(100px,12vw,140px) clamp(24px,5vw,80px) 80px',
        maxWidth: 1280, margin: '0 auto',
        position: 'relative',
      }}>
        {/* Ambient blobs */}
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-15%', right: '-5%', width: 700, height: 700,
            borderRadius: '50%', background: C.ink, filter: 'blur(220px)', opacity: 0.06 }}/>
          <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 600, height: 600,
            borderRadius: '50%', background: C.ink2, filter: 'blur(200px)', opacity: 0.05 }}/>
        </div>

        {/* LEFT — text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingLeft: 0, paddingRight: m ? 0 : 48 }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: C.inkSoft,
              border: `1px solid ${C.inkBorder}`, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 17 }}>
              {d.icon}
            </div>
            <span style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 11,
              color: C.ink, letterSpacing: 2.5, textTransform: 'uppercase' }}>
              {d.tagline}
            </span>
          </div>

          {/* Giant headline */}
          <h1 style={{
            fontWeight: 900, fontSize: 'clamp(3rem,5.5vw,5rem)',
            letterSpacing: '-0.045em', lineHeight: 1.0, marginBottom: 28,
            fontFamily: 'Cairo,sans-serif',
          }}>
            <span style={{ display: 'block', color: '#fff' }}>{d.headline[0]}</span>
            <span style={{
              display: 'block',
              background: `linear-gradient(135deg, ${C.ink} 0%, #a5b4fc 50%, ${C.ink2} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{d.headline[1]}</span>
          </h1>

          <p style={{ fontSize: 16, color: C.dim, lineHeight: 1.85, marginBottom: 40,
            maxWidth: 460, fontFamily: 'Cairo,sans-serif', fontWeight: 500 }}>
            {d.description}
          </p>

          {/* Feature chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {d.features.slice(0, 4).map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                borderRadius: 99, background: C.surface, border: `1px solid ${C.border}`,
                fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 12,
                color: 'rgba(255,255,255,0.7)',
              }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.ink, flexShrink: 0 }}/>
                {f.title}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 20px 50px rgba(99,102,241,0.45)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '15px 32px', borderRadius: 14,
                background: `linear-gradient(135deg, ${C.ink}, ${C.ink2})`,
                color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 15, fontWeight: 900,
                textDecoration: 'none',
                boxShadow: '0 12px 36px rgba(99,102,241,0.35)',
                transition: 'box-shadow 0.2s',
              }}>
              {d.ctaLabel}
              <ArrowUpLeft size={16} strokeWidth={2.5}/>
            </motion.a>

            <a href={WA} target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '15px 24px', borderRadius: 14,
                background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.25)',
                color: '#25D366', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 800,
                textDecoration: 'none',
              }}>
              {WA_SVG}
              واتساب
            </a>
          </div>

          {/* Trust strip */}
          <div style={{ display: 'flex', gap: 0, paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {['تسليم أسبوعين', 'دعم ٣ أشهر', 'بدون عقود'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7,
                paddingRight: 24, marginRight: 24,
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <CheckCircle2 size={12} strokeWidth={2.5} color={C.ink}/>
                <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 12,
                  color: C.dimmer }}>{t}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — phone */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: m ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: 40 }}>
          <PhoneMockup d={d} isMobile={m}/>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS — editorial large numbers
      ═══════════════════════════════════════════ */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4, 1fr)' }}>
            {d.stats.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.10, duration: 0.5 }}
                style={{
                  padding: m ? '32px 20px' : '52px 32px',
                  borderRight: m
                    ? (i % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none')
                    : (i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none'),
                  borderBottom: m && i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  position: 'relative',
                }}>
                {/* Subtle top accent */}
                <div style={{ position: 'absolute', top: 0, left: 32, width: 28, height: 2,
                  background: C.ink, borderRadius: 1 }}/>
                <div style={{
                  fontFamily: 'Cairo,sans-serif', fontWeight: 900,
                  fontSize: 'clamp(2.8rem,3.5vw,4rem)',
                  color: '#fff', letterSpacing: -2, lineHeight: 1, marginBottom: 10,
                }}>{s.n}</div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 13,
                  color: C.dim }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES — bento grid
      ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <SectionBadge label="FEATURES"/>
              <h2 style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900,
                fontSize: 'clamp(2rem,3.5vw,3rem)', color: '#fff',
                letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                منظومة رقمية<br/>متكاملة لـ{d.name}
              </h2>
            </div>
            <p style={{ fontFamily: 'Cairo,sans-serif', fontSize: 15, color: C.dim,
              maxWidth: 360, lineHeight: 1.8, fontWeight: 500 }}>
              مش مجرد تطبيق — نظام يشتغل وأنت نايم ويرجّع العميل تلقائياً.
            </p>
          </div>

          <BentoFeatures features={d.features} isMobile={m}/>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROBLEMS — editorial numbered list
      ═══════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)',
        background: C.bg2,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 2fr', gap: m ? 32 : 80, alignItems: 'start' }}>
            {/* Left — heading */}
            <div style={{ position: m ? 'static' : 'sticky', top: 120 }}>
              <SectionBadge label="CHALLENGES"/>
              <h2 style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900,
                fontSize: 'clamp(2rem,3vw,2.8rem)', color: '#fff',
                letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 20 }}>
                نفهم {d.name}<br/>قبل ما تشرح
              </h2>
              <p style={{ fontFamily: 'Cairo,sans-serif', fontSize: 14, color: C.dim,
                lineHeight: 1.8, fontWeight: 500 }}>
                المشاكل اللي تواجهها كل يوم — نحلّها من جذورها.
              </p>
            </div>

            {/* Right — numbered problems */}
            <div>
              {d.problems.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  style={{
                    display: 'flex', gap: 32, alignItems: 'flex-start',
                    padding: '36px 0',
                    borderBottom: i < d.problems.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}>
                  {/* Number */}
                  <div style={{
                    fontFamily: 'sans-serif', fontWeight: 900,
                    fontSize: 'clamp(2rem,2.5vw,2.8rem)',
                    color: 'rgba(129,140,248,0.22)',
                    letterSpacing: -1, lineHeight: 1, flexShrink: 0, width: 64,
                  }}>0{i + 1}</div>
                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900,
                      fontSize: 18, color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>{p.title}</div>
                    <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 14, color: C.dim,
                      lineHeight: 1.8, fontWeight: 500 }}>{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — dramatic timeline
      ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <SectionBadge label="PROCESS"/>
            <h2 style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900,
              fontSize: 'clamp(2rem,3.5vw,3rem)', color: '#fff',
              letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              من اليوم الأول حتى الإطلاق
            </h2>
          </div>

          {/* Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: m ? 40 : 0, position: 'relative' }}>
            {/* Connector line — desktop only */}
            {!m && <div style={{ position: 'absolute', top: 38, left: '16.67%', right: '16.67%', height: 1,
              background: `linear-gradient(90deg, transparent, ${C.ink}55, ${C.ink}55, transparent)`,
              pointerEvents: 'none' }}/>}

            {d.howItWorks.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
                style={{ padding: '0 40px', textAlign: 'center', position: 'relative' }}>
                {/* Step circle */}
                <div style={{
                  width: 76, height: 76, borderRadius: '50%', margin: '0 auto 32px',
                  background: `linear-gradient(135deg, ${C.ink}, ${C.ink2})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'sans-serif', fontSize: 28, fontWeight: 900, color: '#fff',
                  boxShadow: `0 12px 36px rgba(99,102,241,0.40)`,
                  position: 'relative', zIndex: 1,
                }}>{i + 1}</div>

                <div style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 10,
                  color: C.ink, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 12 }}>
                  {s.step}
                </div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 18,
                  color: '#fff', marginBottom: 14, lineHeight: 1.3 }}>{s.title}</div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 13.5, color: C.dim,
                  lineHeight: 1.8, fontWeight: 500 }}>{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WALLET — premium split
      ═══════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)',
        background: C.bg2,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto',
          display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 40 : 80, alignItems: 'center' }}>

          {/* Left — text */}
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge label="WALLET"/>
            <h2 style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900,
              fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#fff',
              letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 20 }}>
              {d.walletTitle}
            </h2>
            <p style={{ fontFamily: 'Cairo,sans-serif', fontSize: 15, color: C.dim,
              lineHeight: 1.85, marginBottom: 32, fontWeight: 500 }}>{d.walletDesc}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {d.walletFeatures.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CheckCircle2 size={15} strokeWidth={2.5} color={C.ink} style={{ flexShrink: 0 }}/>
                  <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 14,
                    color: C.dim }}>{f}</span>
                </div>
              ))}
            </div>

            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 28px',
                borderRadius: 12, background: C.inkSoft, border: `1px solid ${C.inkBorder}`,
                color: C.ink, fontFamily: 'Cairo,sans-serif', fontSize: 14,
                fontWeight: 800, textDecoration: 'none' }}>
              اطلب بطاقتك الآن
              <MoveRight size={15} strokeWidth={2.5}/>
            </a>
          </motion.div>

          {/* Right — wallet card visual */}
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>

            <div style={{ position: 'relative', width: 320 }}>
              {/* Glow */}
              <div style={{ position: 'absolute', inset: -50,
                background: 'radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 65%)',
                pointerEvents: 'none' }}/>

              {/* Card */}
              <motion.div
                animate={{ y: [0, -12, 0], rotateZ: [0, 0.8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 320, height: 192, borderRadius: 24,
                  background: `linear-gradient(135deg, ${C.ink}f2, ${C.ink2}e8)`,
                  padding: '24px 28px', position: 'relative', overflow: 'hidden',
                  boxShadow: `0 40px 80px rgba(99,102,241,0.50), inset 0 1px 0 rgba(255,255,255,0.20)`,
                }}>
                {/* Decorative circles */}
                <div style={{ position: 'absolute', top: -60, left: -60, width: 180, height: 180,
                  borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }}/>
                <div style={{ position: 'absolute', bottom: -40, right: -40, width: 140, height: 140,
                  borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }}/>
                {/* Sheen */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
                  pointerEvents: 'none' }}/>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  marginBottom: 28, position: 'relative' }}>
                  <div style={{ fontSize: 32 }}>{d.icon}</div>
                  <div style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: 9,
                    color: 'rgba(255,255,255,0.70)', letterSpacing: 2,
                    background: 'rgba(0,0,0,0.20)', padding: '4px 10px', borderRadius: 5 }}>
                    WALLET
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ fontFamily: 'sans-serif', fontWeight: 600, fontSize: 10,
                    color: 'rgba(255,255,255,0.60)', letterSpacing: 1, marginBottom: 5 }}>
                    {d.walletCardLabel}
                  </div>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 18,
                    color: '#fff', letterSpacing: -0.5 }}>
                    تلقا تك · {d.name}
                  </div>
                </div>
              </motion.div>

              {/* Sub-card — NFC note */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.5 }}
                style={{
                  marginTop: 14, padding: '14px 20px', borderRadius: 16,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: C.inkSoft,
                  border: `1px solid ${C.inkBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Smartphone size={16} strokeWidth={1.75} color={C.ink}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 12, color: '#fff' }}>
                    تضاف لـ iPhone مباشرة
                  </div>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 10, color: C.dimmer, marginTop: 2 }}>
                    بدون App Store — مع NFC
                  </div>
                </div>
                <div style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: 10,
                  color: C.ink, background: C.inkSoft, border: `1px solid ${C.inkBorder}`,
                  padding: '3px 10px', borderRadius: 8 }}>NFC</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIAL — full-bleed quote
      ═══════════════════════════════════════════ */}
      {d.testimonial && (
        <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>

              {/* Stars */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={18} strokeWidth={0} fill="#F59E0B" color="#F59E0B"/>
                ))}
              </div>

              {/* Quote */}
              <blockquote style={{ margin: 0 }}>
                <p style={{
                  fontFamily: 'Cairo,sans-serif', fontWeight: 800,
                  fontSize: 'clamp(1.4rem,2.5vw,2rem)',
                  color: '#fff', lineHeight: 1.6, marginBottom: 32,
                  letterSpacing: '-0.02em',
                }}>
                  "{d.testimonial.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {/* Avatar placeholder */}
                  <div style={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                    background: `linear-gradient(135deg, ${C.ink}, ${C.ink2})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 16, color: '#fff' }}>
                    {d.testimonial.name[0]}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 15, color: '#fff' }}>
                      {d.testimonial.name}
                    </div>
                    <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 12, color: C.dim, marginTop: 2 }}>
                      {d.testimonial.role}
                    </div>
                  </div>
                </div>
              </blockquote>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          LIVE DEMO BANNER
      ═══════════════════════════════════════════ */}
      <DemoBanner slug={d.slug} name={d.name} accent={C.ink} accent2={C.ink2} isMobile={m} />

      {/* ═══════════════════════════════════════════
          CTA — full-bleed dramatic close
      ═══════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(100px,12vw,160px) clamp(24px,5vw,80px)',
        background: C.bg2,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)', width: 800, height: 500, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 65%)' }}/>
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr auto', gap: m ? 32 : 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 11,
                color: C.ink, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 20 }}>
                ابدأ اليوم
              </div>
              <h2 style={{
                fontFamily: 'Cairo,sans-serif', fontWeight: 900,
                fontSize: 'clamp(2.4rem,4.5vw,4rem)',
                color: '#fff', letterSpacing: '-0.045em', lineHeight: 1.05, marginBottom: 0,
              }}>
                مستعد تطوّر<br/>
                <span style={{ color: C.ink }}>{d.name}</span>ك؟
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              <motion.a href={WA} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                  padding: '18px 40px', borderRadius: 16,
                  background: `linear-gradient(135deg, ${C.ink}, ${C.ink2})`,
                  color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 16, fontWeight: 900,
                  textDecoration: 'none', whiteSpace: 'nowrap',
                  boxShadow: '0 16px 48px rgba(99,102,241,0.40)',
                }}>
                ابدأ على واتساب
                <ArrowUpLeft size={18} strokeWidth={2.5}/>
              </motion.a>

              <Link href="/" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 14,
                background: C.surface, border: `1px solid ${C.border}`,
                color: C.dim, fontFamily: 'Cairo,sans-serif', fontSize: 14,
                fontWeight: 700, textDecoration: 'none',
              }}>
                الرئيسية
              </Link>
            </div>
          </div>

          {/* Bottom meta */}
          <div style={{ marginTop: 56, paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 13, color: C.dimmer, fontWeight: 500 }}>
              تلقا تك · نحوّل الأفكار التجارية إلى حلول رقمية
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              {['تحليل مجاني', 'تسليم أسبوعين', 'دعم ٣ أشهر', 'بدون عقود'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={11} strokeWidth={2.5} color={C.ink}/>
                  <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 12, color: C.dimmer }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
}
