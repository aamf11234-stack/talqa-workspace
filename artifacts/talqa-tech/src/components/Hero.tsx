import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أريد%20أبدأ%20مشروعي';

/* ── Stat ── */
function Stat({ end, label, suffix = '' }: { end: number; label: string; suffix?: string }) {
  const { count, ref } = useCountUp(end, 1600);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 'clamp(1.7rem,2.5vw,2.2rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff' }}>
        {count.toLocaleString('ar-SA')}{suffix}
        <span style={{ color: 'var(--blue)' }}>+</span>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', marginTop: 5 }}>{label}</div>
    </div>
  );
}

/* ── Word-by-word reveal ── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const word = {
  hidden:  { opacity: 0, y: 22 },
  show:    { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function Words({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span variants={container} initial="hidden" animate="show"
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.3em' }}>
      {text.split(' ').map((w, i) => (
        <motion.span key={i} variants={word} className={className} style={{ display: 'inline-block' }}>{w}</motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100dvh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      paddingTop: 72,
      background: 'var(--bg)',
      overflow: 'hidden',
    }}>
      {/* Single subtle radial glow — no canvas, no particles */}
      <div style={{
        position: 'absolute', top: '35%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 'min(900px, 130vw)', height: 'min(700px, 100vw)',
        background: 'radial-gradient(ellipse, rgba(79,142,255,0.09) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 800, margin: '0 auto',
        padding: '0 24px', textAlign: 'center',
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 0,
      }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 32 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '6px 16px', borderRadius: 99,
            border: '1px solid rgba(79,142,255,0.2)',
            background: 'rgba(79,142,255,0.06)',
            fontSize: 11, fontWeight: 700,
            color: 'rgba(130,175,255,0.8)', letterSpacing: '0.07em',
          }}>
            <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }} />
            تلقا تك · جازان، المملكة العربية السعودية
          </span>
        </motion.div>

        {/* Headline */}
        <h1 style={{
          fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1,
          fontSize: 'clamp(2.6rem, 7vw, 5.6rem)',
          marginBottom: 20, display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.06em',
        }}>
          <Words text="نحوّل أفكارك التجارية" />
          <Words text="إلى حلول رقمية." className="text-blue" />
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontSize: 'clamp(14px, 1.7vw, 17px)',
            fontWeight: 500, color: 'var(--text2)',
            lineHeight: 1.8, maxWidth: 480,
            margin: '0 auto', marginBottom: 40,
          }}>
          تطبيقات جوال · Apple Wallet · مواقع · أتمتة كاملة
          <br />نبني معك ما يجعل عميلك يعود دائماً.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 52 }}>
          <a href="#calculator" className="btn-blue" style={{ fontSize: 'clamp(13px,1.5vw,15px)' }}>
            <span className="holo-shimmer" />
            احسب تكلفة مشروعك ←
          </a>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: 'clamp(13px,1.5vw,15px)' }}>
            تحدث معنا الآن
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.72, duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['١٤+ مشروع', ''], ['٩٥٪+ رضا', ''], ['٢٤/٧ دعم', '']].map(([v], i) => (
            <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)' }}>{v}</span>
              {i < 2 && <span style={{ width: 1, height: 12, background: 'var(--border)' }} />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stats bar */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', borderTop: '1px solid var(--border)' }}>
        <div style={{
          maxWidth: 720, margin: '0 auto', padding: '0 24px',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        }}>
          {[
            { end: 14, label: 'مشروع مُنجز' },
            { end: 3,  label: 'قطاعات مخدومة' },
            { end: 95, label: 'رضا العملاء', suffix: '٪' },
            { end: 24, label: 'دعم فني', suffix: '/٧' },
          ].map(s => (
            <div key={s.label} style={{ padding: '22px 8px', textAlign: 'center', borderRight: '1px solid var(--border)' }}
              className="stat-cell">
              <Stat end={s.end} label={s.label} suffix={s.suffix ?? ''} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stat-cell:last-child { border-right: none; }
        @media(max-width:520px) {
          .stat-cell { border-right: none !important; padding: 16px 4px; }
        }
      `}</style>
    </section>
  );
}
