import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أريد%20أبدأ%20مشروعي';

/* ── Subtle Aurora (2 blobs, much lower opacity) ── */
function AuroraCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let raf: number; let t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const blobs = [
      { cx: 0.30, cy: 0.40, rx: 0.42, ry: 0.38, r: '50,100,255', sx: 0.00028, sy: 0.00022, ax: 0.06, ay: 0.05 },
      { cx: 0.70, cy: 0.50, rx: 0.35, ry: 0.32, r: '80,60,255',  sx: 0.00020, sy: 0.00030, ax: 0.05, ay: 0.06 },
    ];
    const draw = () => {
      t++;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      blobs.forEach(b => {
        const x = (b.cx + Math.sin(t * b.sx * 1000) * b.ax) * w;
        const y = (b.cy + Math.cos(t * b.sy * 1000) * b.ay) * h;
        const rw = b.rx * w * 0.9; const rh = b.ry * h * 0.9;
        ctx.save();
        ctx.filter = 'blur(80px)';
        const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rw, rh));
        g.addColorStop(0, `rgba(${b.r},0.13)`);
        g.addColorStop(0.5, `rgba(${b.r},0.055)`);
        g.addColorStop(1, `rgba(${b.r},0)`);
        ctx.scale(rw / Math.max(rw, rh), rh / Math.max(rw, rh));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x / (rw / Math.max(rw, rh)), y / (rh / Math.max(rw, rh)), Math.max(rw, rh), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', mixBlendMode: 'screen' }} />;
}

/* ── Stat counter ── */
function Stat({ end, label, suffix = '' }: { end: number; label: string; suffix?: string }) {
  const { count, ref } = useCountUp(end, 1800);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '22px 12px' }}>
      <div style={{ fontSize: 'clamp(1.6rem,2.8vw,2.4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6 }}>
        <span className="text-blue">+{count.toLocaleString('ar-SA')}</span>
        {suffix && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.55em', fontWeight: 700 }}>{suffix}</span>}
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.02em' }}>{label}</div>
    </div>
  );
}

/* ── Word-by-word stagger variant ── */
const wordVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const wordItem = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function AnimatedLine({ text, style }: { text: string; style?: React.CSSProperties }) {
  const words = text.split(' ');
  return (
    <motion.span variants={wordVariants} initial="hidden" animate="visible"
      style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.28em', ...style }}>
      {words.map((w, i) => (
        <motion.span key={i} variants={wordItem} style={{ display: 'inline-block' }}>{w}</motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  return (
    <section style={{
      position: 'relative', minHeight: '100dvh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      paddingTop: 80, paddingBottom: 80,
      overflow: 'hidden', background: 'var(--bg)',
    }}>
      {/* Background layers */}
      <AuroraCanvas />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.35 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 220, background: 'linear-gradient(to top, var(--bg), transparent)', pointerEvents: 'none', zIndex: 3 }} />

      {/* ── Main content ── */}
      <div style={{ position: 'relative', zIndex: 4, width: '100%', maxWidth: 860, margin: '0 auto', padding: '0 24px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 'clamp(24px,4vw,36px)' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 18px', borderRadius: 99,
            border: '1px solid rgba(79,142,255,0.25)',
            background: 'rgba(79,142,255,0.06)',
            fontSize: 11, fontWeight: 700, color: 'rgba(130,175,255,0.85)',
            letterSpacing: '0.08em',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F8EFF', boxShadow: '0 0 10px #4F8EFF', flexShrink: 0 }} />
            منظومة تلقا التقنية · جازان، المملكة العربية السعودية
          </span>
        </motion.div>

        {/* Headline — clean word reveal, no scramble */}
        <h1 style={{
          fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1,
          fontSize: 'clamp(2.4rem, 6.5vw, 5.2rem)',
          marginBottom: 'clamp(18px,3vw,26px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.08em',
        }}>
          <AnimatedLine text="نحوّل أفكارك التجارية" style={{ color: '#FFFFFF' }} />
          <AnimatedLine text="إلى حلول رقمية تدر الأرباح" style={{ color: undefined }} />
        </h1>

        {/* ← fix: second line uses gradient via wrapper */}
        <style>{`
          h1 > span:last-child span { background: linear-gradient(135deg,#7ABAFF,#4F8EFF,#3B78FF); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
          @keyframes hero-pulse { 0%,100%{opacity:1}50%{opacity:0.35} }
          @media(max-width:600px){ .hero-divider{display:none} }
        `}</style>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(14px,1.8vw,17px)', fontWeight: 500, color: 'rgba(255,255,255,0.4)', lineHeight: 1.85, maxWidth: 520, margin: '0 auto', marginBottom: 'clamp(32px,5vw,48px)' }}>
          تطبيقات جوال · Apple Wallet · مواقع فائقة الأداء · أتمتة كاملة<br />
          نبني معك ما يجعل عميلك يعود — دائماً.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 'clamp(28px,4vw,44px)' }}>
          <a href="#calculator" className="btn-blue" style={{ padding: 'clamp(13px,2vw,16px) clamp(24px,4vw,36px)', borderRadius: 12, fontSize: 'clamp(13px,1.5vw,15px)', fontWeight: 700, textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
            <span className="holo-shimmer" />
            احسب تكلفة مشروعك ←
          </a>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: 'clamp(13px,2vw,16px) clamp(24px,4vw,36px)', borderRadius: 12, fontSize: 'clamp(13px,1.5vw,15px)', fontWeight: 700, textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
            <span className="holo-shimmer" />
            تحدث معنا الآن
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.72, duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(16px,3vw,28px)' }}>
          {[
            { val: '١٤+',  label: 'مشروع مُنجز' },
            { val: '٩٥٪+', label: 'رضا العملاء' },
            { val: '٢٤/٧', label: 'دعم فني' },
          ].map((t, i) => (
            <div key={t.val} style={{ display: 'contents' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 'clamp(14px,1.6vw,16px)', fontWeight: 900, color: '#fff' }}>{t.val}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', fontWeight: 500 }}>{t.label}</span>
              </div>
              {i < 2 && <div className="hero-divider" style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.1)' }} />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ position: 'relative', zIndex: 4, width: '100%', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          <Stat end={14} label="مشروع مُنجز" />
          <Stat end={3}  label="قطاعات مخدومة" />
          <Stat end={95} label="رضا العملاء" suffix="٪" />
          <Stat end={24} label="دعم فني" suffix="/٧" />
        </div>
      </div>
    </section>
  );
}
