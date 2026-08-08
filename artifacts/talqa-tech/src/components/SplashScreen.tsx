import { useCallback, useEffect, useRef, useState } from 'react';
import TlqaLogo from './TlqaLogo';

const SEEN_KEY = 'tlqa_splash_seen';

export function useSplash() {
  const [visible, setVisible] = useState(() => {
    try { return !sessionStorage.getItem(SEEN_KEY); }
    catch { return false; }
  });
  const dismiss = useCallback(() => {
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch {}
    setVisible(false);
  }, []);
  return { visible, dismiss };
}

// 12 random particles — fixed positions for determinism
const PARTICLES = [
  { x: 12, y: 18, s: 2.5, d: 0 },
  { x: 85, y: 12, s: 1.8, d: 0.4 },
  { x: 72, y: 78, s: 3.0, d: 0.8 },
  { x: 25, y: 82, s: 2.0, d: 1.2 },
  { x: 90, y: 45, s: 1.5, d: 0.6 },
  { x: 8,  y: 55, s: 2.2, d: 1.0 },
  { x: 55, y: 6,  s: 1.7, d: 0.2 },
  { x: 60, y: 92, s: 2.8, d: 1.5 },
  { x: 40, y: 15, s: 1.4, d: 0.9 },
  { x: 78, y: 30, s: 2.1, d: 0.3 },
  { x: 18, y: 65, s: 1.6, d: 1.1 },
  { x: 48, y: 88, s: 2.4, d: 0.7 },
];

const CSS = `
  @keyframes sp-logo {
    0%   { opacity: 0; transform: scale(0.4) rotate(-8deg); filter: blur(12px); }
    60%  { opacity: 1; transform: scale(1.08) rotate(2deg); filter: blur(0); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); filter: blur(0); }
  }
  @keyframes sp-fade-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes sp-ring-1 {
    0%   { transform: translate(-50%,-50%) scale(0.7) rotate(0deg);   opacity: 0; }
    20%  { opacity: 1; }
    100% { transform: translate(-50%,-50%) scale(1.5) rotate(180deg); opacity: 0; }
  }
  @keyframes sp-ring-2 {
    0%   { transform: translate(-50%,-50%) scale(0.5) rotate(0deg);   opacity: 0; }
    25%  { opacity: 0.7; }
    100% { transform: translate(-50%,-50%) scale(1.8) rotate(-120deg); opacity: 0; }
  }
  @keyframes sp-ring-3 {
    0%   { transform: translate(-50%,-50%) scale(0.3);  opacity: 0; }
    30%  { opacity: 0.5; }
    100% { transform: translate(-50%,-50%) scale(2.2);  opacity: 0; }
  }
  @keyframes sp-orbit {
    from { transform: translate(-50%,-50%) rotate(0deg) translateX(82px) rotate(0deg); }
    to   { transform: translate(-50%,-50%) rotate(360deg) translateX(82px) rotate(-360deg); }
  }
  @keyframes sp-orbit-rev {
    from { transform: translate(-50%,-50%) rotate(0deg) translateX(62px) rotate(0deg); }
    to   { transform: translate(-50%,-50%) rotate(-360deg) translateX(62px) rotate(360deg); }
  }
  @keyframes sp-float {
    0%, 100% { transform: translateY(0) scale(1);   opacity: 0.6; }
    50%       { transform: translateY(-8px) scale(1.3); opacity: 1; }
  }
  @keyframes sp-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes sp-bar-glow {
    0%, 100% { box-shadow: 0 0 8px rgba(124,58,237,0.6); }
    50%      { box-shadow: 0 0 20px rgba(212,175,55,0.8), 0 0 40px rgba(124,58,237,0.4); }
  }
  @keyframes sp-dot-pulse {
    0%, 100% { transform: scale(1);   opacity: 0.4; }
    50%      { transform: scale(1.6); opacity: 1; }
  }
  @keyframes sp-exit {
    0%   { opacity: 1; transform: scale(1);    filter: blur(0px); }
    100% { opacity: 0; transform: scale(1.06); filter: blur(10px); }
  }
`;

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState<'in' | 'hold' | 'out'>('in');
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let v = 0;
    const tick = setInterval(() => {
      v += (100 - v) * 0.055;
      setProgress(Math.min(v, 96));
      if (v >= 96) clearInterval(tick);
    }, 35);

    const done = setTimeout(() => {
      clearInterval(tick);
      setProgress(100);
      setPhase('hold');
      setTimeout(() => {
        setPhase('out');
        const el = wrapRef.current;
        if (el) {
          el.style.animation = 'sp-exit 0.65s cubic-bezier(0.4,0,1,1) forwards';
        }
        setTimeout(onDone, 660);
      }, 220);
    }, 1900);

    return () => { clearInterval(tick); clearTimeout(done); };
  }, [onDone]);

  // Circumference for circular progress
  const R  = 44;
  const C  = 2 * Math.PI * R;
  const offset = C - (progress / 100) * C;

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'radial-gradient(ellipse at 50% 40%, #0f0a1e 0%, #050508 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', fontFamily: 'Cairo, sans-serif',
      }}
    >
      <style>{CSS}</style>
      <style>{`body{overflow:hidden!important}`}</style>

      {/* ── Floating particles ─────────────────── */}
      {PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.s, height: p.s,
          borderRadius: '50%',
          background: i % 3 === 0
            ? 'rgba(212,175,55,0.85)'
            : i % 3 === 1
              ? 'rgba(167,139,250,0.7)'
              : 'rgba(255,255,255,0.5)',
          animation: `sp-float ${2.4 + p.d}s ${p.d}s ease-in-out infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── Ambient glow ───────────────────────── */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 520, height: 520, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(212,175,55,0.04) 50%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Logo + rings container ─────────────── */}
      <div style={{ position: 'relative', width: 180, height: 180, marginBottom: 36 }}>

        {/* Pulsing ring 1 — purple */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 150, height: 150, borderRadius: '50%',
          border: '1.5px solid rgba(124,58,237,0.55)',
          transform: 'translate(-50%,-50%)',
          animation: 'sp-ring-1 2.8s 0.2s ease-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Pulsing ring 2 — gold */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 140, height: 140, borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.5)',
          transform: 'translate(-50%,-50%)',
          animation: 'sp-ring-2 2.8s 0.9s ease-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Pulsing ring 3 — white */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 130, height: 130, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.15)',
          transform: 'translate(-50%,-50%)',
          animation: 'sp-ring-3 2.8s 1.5s ease-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Orbiting dot — gold */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 7, height: 7,
          animation: 'sp-orbit 3s linear infinite',
          pointerEvents: 'none',
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 8px #D4AF37' }} />
        </div>

        {/* Orbiting dot — purple — reverse */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 5, height: 5,
          animation: 'sp-orbit-rev 4s 0.5s linear infinite',
          pointerEvents: 'none',
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#A78BFA', boxShadow: '0 0 6px #A78BFA' }} />
        </div>

        {/* Circular progress ring */}
        <svg
          width={180} height={180}
          style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
        >
          {/* Track */}
          <circle cx={90} cy={90} r={R} fill="none"
            stroke="rgba(255,255,255,0.06)" strokeWidth={2} />
          {/* Fill */}
          <circle cx={90} cy={90} r={R} fill="none"
            stroke="url(#sp-grad)" strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
          <defs>
            <linearGradient id="sp-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Logo — center */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          animation: 'sp-logo 0.7s cubic-bezier(0.34,1.36,0.64,1) both',
        }}>
          <TlqaLogo size={72} splash />
        </div>
      </div>

      {/* ── Brand name — shimmer ─────────────── */}
      <div style={{
        fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em',
        background: 'linear-gradient(90deg, #fff 20%, #D4AF37 40%, #A78BFA 60%, #fff 80%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'sp-fade-up 0.45s 0.3s ease both, sp-shimmer 2.5s 0.8s linear infinite',
        marginBottom: 8,
      }}>
        تلقا تك
      </div>

      {/* ── Subtitle ────────────────────────── */}
      <div style={{
        fontSize: 13, fontWeight: 600, letterSpacing: '0.12em',
        color: 'rgba(212,175,55,0.7)',
        animation: 'sp-fade-up 0.45s 0.5s ease both',
        marginBottom: 32,
        textTransform: 'uppercase',
      }}>
        TLGA TECH · تطبيقات · مواقع · Apple Wallet
      </div>

      {/* ── Loading dots ─────────────────────── */}
      <div style={{
        display: 'flex', gap: 8, marginBottom: 18,
        animation: 'sp-fade-up 0.45s 0.65s ease both',
      }}>
        {[0, 0.2, 0.4].map((d, i) => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: '50%',
            background: i === 1 ? '#D4AF37' : 'rgba(167,139,250,0.7)',
            animation: `sp-dot-pulse 1.2s ${d}s ease-in-out infinite`,
          }} />
        ))}
      </div>

      {/* ── Progress % ──────────────────────── */}
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: 2,
        color: 'rgba(212,175,55,0.55)',
        fontFamily: 'monospace',
        animation: 'sp-fade-up 0.45s 0.7s ease both',
      }}>
        {Math.round(progress)}٪
      </div>

      {/* ── Tagline ─────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 40,
        fontSize: 12, color: 'rgba(255,255,255,0.15)',
        fontWeight: 600, letterSpacing: '0.05em',
        animation: 'sp-fade-up 0.5s 0.9s ease both',
      }}>
        نحوّل أفكارك التجارية إلى حلول رقمية
      </div>
    </div>
  );
}
