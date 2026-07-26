import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

const WHATSAPP = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أريد%20أبدأ%20مشروعي';
const CHARS = 'أبتثجحخدذرزسشصضطظعغفقكلمنهويء01234';

/* ─── Text Scramble ─── */
function useScramble(finalText: string, delay = 0) {
  const [text, setText] = useState(() => Array.from(finalText).map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join(''));
  useEffect(() => {
    let frame = 0;
    const iterations = 14;
    const chars = Array.from(finalText);
    let id: ReturnType<typeof setTimeout>;
    id = setTimeout(() => {
      const raf = () => {
        setText(chars.map((c, i) => {
          if (c === ' ') return ' ';
          const settled = frame > i * (iterations / chars.length) + Math.random() * 4;
          return settled ? c : CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join(''));
        frame++;
        if (frame < iterations + chars.length) requestAnimationFrame(raf);
        else setText(finalText);
      };
      requestAnimationFrame(raf);
    }, delay);
    return () => clearTimeout(id);
  }, [finalText, delay]);
  return text;
}

/* ─── Particle Canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let raf: number;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });

    const COUNT = 70;
    const W = () => canvas.width;
    const H = () => canvas.height;

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());

      // Update & draw particles
      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        // Damping
        p.vx *= 0.97; p.vy *= 0.97;
        // Clamp speed
        const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
        if (speed > 2) { p.vx = p.vx/speed*2; p.vy = p.vy/speed*2; }

        p.x += p.vx; p.y += p.vy;
        // Wrap
        if (p.x < 0) p.x = W(); if (p.x > W()) p.x = 0;
        if (p.y < 0) p.y = H(); if (p.y > H()) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(79,142,255,0.6)';
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(79,142,255,${(1 - d / 130) * 0.18})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

/* ─── Magnetic Button ─── */
function MagBtn({ href, className, style, children, target, rel }: any) {
  const r = useRef<HTMLAnchorElement>(null);
  return (
    <a ref={r} href={href} target={target} rel={rel} className={className}
      style={{ ...style, transition: 'transform 0.4s cubic-bezier(.23,1,.32,1)' }}
      onMouseMove={e => {
        const el = r.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width  / 2)) * 0.3;
        const y = (e.clientY - (rect.top  + rect.height / 2)) * 0.3;
        el.style.transform = `translate(${x}px,${y}px)`;
      }}
      onMouseLeave={() => { if (r.current) r.current.style.transform = ''; }}>
      {children}
    </a>
  );
}

/* ─── Stat ─── */
function Stat({ end, label, suffix = '' }: { end: number; label: string; suffix?: string }) {
  const { count, ref } = useCountUp(end, 1800);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '28px 16px' }}>
      <div style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 7 }}>
        <span className="text-blue">+{count.toLocaleString('ar-SA')}</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.55em' }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.03em' }}>{label}</div>
    </div>
  );
}

export default function Hero() {
  const line1 = useScramble('نحوّل أفكارك التجارية', 400);
  const line2 = useScramble('إلى حلول برمجية تدر الأرباح', 900);

  return (
    <section style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 90, overflow: 'hidden', background: 'var(--bg)' }}>

      {/* Particles */}
      <ParticleCanvas />

      {/* Grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.45 }} />

      {/* Glow core */}
      <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(79,142,255,0.09) 0%, transparent 68%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', height: 220, background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 2 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, maxWidth: 1020, margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 36, display: 'flex', justifyContent: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 99, border: '1px solid rgba(79,142,255,0.28)', background: 'rgba(79,142,255,0.07)', fontSize: 11, fontWeight: 700, color: '#6BA3FF', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F8EFF', boxShadow: '0 0 10px #4F8EFF', animation: 'pulse-dot 2s infinite' }} />
            منظومة تلقا التقنية · جازان
          </span>
        </motion.div>

        {/* Scramble headline */}
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          style={{ fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.06, marginBottom: 28, fontSize: 'clamp(2.6rem,6vw,5.6rem)', fontFamily: 'Cairo, sans-serif' }}>
          <span style={{ color: '#fff', display: 'block' }}>{line1}</span>
          <span className="text-blue" style={{ display: 'block' }}>{line2}</span>
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }}
          style={{ fontSize: 'clamp(1rem,1.8vw,1.16rem)', fontWeight: 500, color: 'rgba(255,255,255,0.42)', lineHeight: 1.9, maxWidth: 600, margin: '0 auto 46px' }}>
          تطبيقات جوال · Apple Wallet · مواقع فائقة الأداء · أتمتة كاملة<br className="hidden sm:block" />
          نبني معك ما يجعل عميلك يعود — دائماً.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 0.6 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 56 }}>
          <MagBtn href="#calculator" className="btn-blue" style={{ padding: '15px 36px', borderRadius: 13, fontSize: 15, fontWeight: 700 }}>
            احسب تكلفة مشروعك ←
          </MagBtn>
          <MagBtn href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '15px 36px', borderRadius: 13, fontSize: 15, fontWeight: 700 }}>
            تحدث معنا الآن
          </MagBtn>
        </motion.div>

        {/* Tags */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.6 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {['تطبيقات iOS & Android', 'Apple Wallet', 'لوحات تحكم', 'أتمتة API', 'واتساب Business'].map(t => (
            <span key={t} className="chip">{t}</span>
          ))}
        </motion.div>
      </div>

      {/* Stats bar */}
      <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', zIndex: 4, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          <Stat end={15}  label="مشروع مُنجز" />
          <Stat end={3}   label="قطاعات مخدومة" />
          <Stat end={100} label="رضا العملاء" suffix="٪" />
          <Stat end={24}  label="دعم فني" suffix="/٧" />
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{box-shadow:0 0 0 0 rgba(79,142,255,0.6)}60%{box-shadow:0 0 0 8px rgba(79,142,255,0)} }
      `}</style>
    </section>
  );
}
