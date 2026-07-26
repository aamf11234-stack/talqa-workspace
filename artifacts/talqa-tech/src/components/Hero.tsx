import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أريد%20أبدأ%20مشروعي';
const CHARS = 'أبتثجحخدذرزسشصضطظعغفقكلمنهويء٠١٢٣';

/* ── Text Scramble ── */
function useScramble(final: string, delay = 0) {
  const [text, setText] = useState(() =>
    Array.from(final).map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
  );
  useEffect(() => {
    let frame = 0; const iters = 18; const chars = Array.from(final);
    const id = setTimeout(() => {
      const go = () => {
        setText(chars.map((c, i) => {
          if (c === ' ') return ' ';
          return frame > i * (iters / chars.length) + Math.random() * 3
            ? c : CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join(''));
        frame++;
        if (frame < iters + chars.length) requestAnimationFrame(go);
        else setText(final);
      };
      requestAnimationFrame(go);
    }, delay);
    return () => clearTimeout(id);
  }, [final, delay]);
  return text;
}

/* ── Aurora Blob Canvas ── */
function AuroraCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let raf: number; let t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener('resize', resize);

    const blobs = [
      { cx: 0.35, cy: 0.42, rx: 0.38, ry: 0.32, r: '60,100,255', sx: 0.00038, sy: 0.00031, ax: 0.07, ay: 0.06 },
      { cx: 0.65, cy: 0.35, rx: 0.30, ry: 0.28, r: '100,60,255', sx: 0.00031, sy: 0.00042, ax: 0.06, ay: 0.07 },
      { cx: 0.50, cy: 0.60, rx: 0.42, ry: 0.24, r: '0,160,255',  sx: 0.00025, sy: 0.00055, ax: 0.05, ay: 0.05 },
      { cx: 0.20, cy: 0.55, rx: 0.22, ry: 0.22, r: '80,140,255', sx: 0.00045, sy: 0.00028, ax: 0.04, ay: 0.06 },
    ];

    const draw = () => {
      t++;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      blobs.forEach(b => {
        const x = (b.cx + Math.sin(t * b.sx * 1000) * b.ax) * w;
        const y = (b.cy + Math.cos(t * b.sy * 1000) * b.ay) * h;
        const rw = b.rx * w; const rh = b.ry * h;
        ctx.save();
        ctx.filter = 'blur(60px)';
        const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rw, rh));
        g.addColorStop(0, `rgba(${b.r},0.22)`);
        g.addColorStop(0.5, `rgba(${b.r},0.10)`);
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

/* ── Particle constellation ── */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let raf: number;
    const mouse = { x: -9999, y: -9999 };
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    const pts = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.3 + 0.4,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) { const f = (110 - d) / 110 * 0.45; p.vx += dx / d * f; p.vy += dy / d * f; }
        p.vx *= 0.97; p.vy *= 0.97;
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp > 1.8) { p.vx = p.vx / sp * 1.8; p.vy = p.vy / sp * 1.8; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100,150,255,0.55)'; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const d = Math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2);
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(79,142,255,${(1-d/120)*0.15})`; ctx.lineWidth = 0.6; ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

/* ── 3D Perspective grid ── */
function PerspectiveGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rx = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const ry = useSpring(mouseY, { stiffness: 60, damping: 30 });
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouseX.set((e.clientY / window.innerHeight - 0.5) * 6);
      mouseY.set((e.clientX / window.innerWidth - 0.5) * -6);
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);
  return (
    <div style={{ position: 'absolute', bottom: 0, inset: '60% 0 0', overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 600, height: '100%' }}>
        <div style={{
          position: 'absolute', inset: '-20% -10% 0',
          backgroundImage: `linear-gradient(rgba(79,142,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,255,0.12) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(55deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 70%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 70%)',
        }} />
      </motion.div>
    </div>
  );
}

/* ── Floating glass card ── */
function GlassCard({ children, style, delay = 0, floatY = 10 }: any) {
  const cardStyle = {
    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 16, padding: '14px 18px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
    ...style,
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        style={cardStyle}
        animate={{ y: [0, -floatY, 0] }}
        transition={{ delay: delay + 0.9, duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ── Stat ── */
function Stat({ end, label, suffix = '' }: { end: number; label: string; suffix?: string }) {
  const { count, ref } = useCountUp(end, 1800);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '28px 16px' }}>
      <div style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 7 }}>
        <span className="text-blue">+{count.toLocaleString('ar-SA')}</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.5em' }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.28)' }}>{label}</div>
    </div>
  );
}

/* ── Magnetic button ── */
function MagBtn({ href, className, style, children, target, rel }: any) {
  const r = useRef<HTMLAnchorElement>(null);
  return (
    <a ref={r} href={href} target={target} rel={rel} className={className}
      style={{ ...style, transition: 'transform 0.4s cubic-bezier(.23,1,.32,1)', position: 'relative', overflow: 'hidden' }}
      onMouseMove={e => {
        const el = r.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
        const y = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
        el.style.transform = `translate(${x}px,${y}px)`;
      }}
      onMouseLeave={() => { if (r.current) r.current.style.transform = ''; }}>
      <span className="holo-shimmer" />
      {children}
    </a>
  );
}

export default function Hero() {
  const line1 = useScramble('نحوّل أفكارك التجارية', 500);
  const line2 = useScramble('إلى حلول برمجية تدر الأرباح', 1000);

  return (
    <section style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 90, overflow: 'hidden', background: 'var(--bg)' }}>

      {/* Layers */}
      <AuroraCanvas />
      <Particles />
      <PerspectiveGrid />

      {/* Grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4 }} />

      {/* Fade bottom */}
      <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', height: 260, background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 5 }} />

      {/* Floating glass cards */}
      <div className="hero-cards-wrap" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4 }}>
        {/* Left card */}
        <GlassCard delay={1.4} floatY={12} style={{ position: 'absolute', left: '5%', top: '30%', minWidth: 180 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(79,142,255,0.7)', marginBottom: 8 }}>مشاريع منجزة</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>+١٥</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>مشروع</span>
          </div>
          <div style={{ marginTop: 8, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '82%', borderRadius: 99, background: 'linear-gradient(to right, #4F8EFF, #6BA3FF)' }} />
          </div>
        </GlassCard>

        {/* Right card */}
        <GlassCard delay={1.6} floatY={8} style={{ position: 'absolute', right: '5%', top: '38%', minWidth: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 10px #34D399', animation: 'live-pulse 2s infinite' }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>رضا العملاء</span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>١٠٠٪</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>عبر جميع المشاريع</div>
        </GlassCard>

        {/* Bottom card */}
        <GlassCard delay={1.8} floatY={6} style={{ position: 'absolute', left: '8%', bottom: '18%', minWidth: 210 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(79,142,255,0.12)', border: '1px solid rgba(79,142,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>💳</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>Apple Wallet Live</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>+٥٠ نقطة تُضاف الآن</div>
            </div>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#34D399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 'auto', marginLeft: 0 }}>
              <span style={{ fontSize: 9, color: '#fff', fontWeight: 900 }}>✓</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 6, maxWidth: 1020, margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 36, display: 'flex', justifyContent: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 20px', borderRadius: 99, border: '1px solid rgba(79,142,255,0.3)', background: 'rgba(79,142,255,0.07)', fontSize: 11, fontWeight: 700, color: '#6BA3FF', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F8EFF', boxShadow: '0 0 12px #4F8EFF', animation: 'live-pulse 2s infinite' }} />
            منظومة تلقا التقنية · جازان
          </span>
        </motion.div>

        {/* Scramble headline */}
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          style={{ fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.06, marginBottom: 28, fontSize: 'clamp(2.6rem,6vw,5.6rem)' }}>
          <span style={{ color: '#fff', display: 'block' }}>{line1}</span>
          <span className="text-blue" style={{ display: 'block' }}>{line2}</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.7 }}
          style={{ fontSize: 'clamp(1rem,1.8vw,1.16rem)', fontWeight: 500, color: 'rgba(255,255,255,0.4)', lineHeight: 1.9, maxWidth: 600, margin: '0 auto 46px' }}>
          تطبيقات جوال · Apple Wallet · مواقع فائقة الأداء · أتمتة كاملة<br />
          نبني معك ما يجعل عميلك يعود — دائماً.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55, duration: 0.6 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 56 }}>
          <MagBtn href="#calculator" className="btn-blue" style={{ padding: '16px 38px', borderRadius: 13, fontSize: 15, fontWeight: 700 }}>
            احسب تكلفة مشروعك ←
          </MagBtn>
          <MagBtn href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '16px 38px', borderRadius: 13, fontSize: 15, fontWeight: 700 }}>
            تحدث معنا الآن
          </MagBtn>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {['تطبيقات iOS & Android', 'Apple Wallet', 'لوحات تحكم', 'أتمتة API', 'واتساب Business'].map(t => (
            <span key={t} className="chip">{t}</span>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', zIndex: 7, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          <Stat end={15} label="مشروع مُنجز" />
          <Stat end={3} label="قطاعات مخدومة" />
          <Stat end={100} label="رضا العملاء" suffix="٪" />
          <Stat end={24} label="دعم فني" suffix="/٧" />
        </div>
      </div>

      <style>{`
        @keyframes live-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(79,142,255,0.6)}60%{box-shadow:0 0 0 10px rgba(79,142,255,0)} }
        @media(max-width:900px){.hero-cards-wrap{display:none!important}}
      `}</style>
    </section>
  );
}
