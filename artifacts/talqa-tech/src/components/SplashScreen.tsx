import { useEffect, useRef, useState } from 'react';
import TlqaLogo from './TlqaLogo';

// Only show once per browser session
const SEEN_KEY = 'tlqa_splash_seen';

export function useSplash() {
  const [visible, setVisible] = useState(() => {
    try { return !sessionStorage.getItem(SEEN_KEY); }
    catch { return false; }
  });

  const dismiss = () => {
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch {}
    setVisible(false);
  };

  return { visible, dismiss };
}

const LOCK_STYLE = `body{overflow:hidden !important}`;

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting]   = useState(false);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let v = 0;
    // Smooth progress bar — one lightweight interval
    const tick = setInterval(() => {
      v += (100 - v) * 0.06;
      setProgress(Math.min(v, 96));
      if (v >= 96) clearInterval(tick);
    }, 40);

    const done = setTimeout(() => {
      clearInterval(tick);
      setProgress(100);
      setTimeout(() => {
        setExiting(true);
        // CSS transition handles the exit — no framer needed
        const el = elRef.current;
        if (el) {
          el.style.transition = 'transform 0.5s cubic-bezier(0.76,0,0.24,1)';
          el.style.transform  = 'translateY(-100%)';
        }
        setTimeout(onDone, 520);
      }, 100);
    }, 1800);

    return () => { clearInterval(tick); clearTimeout(done); };
  }, [onDone]);

  if (exiting && progress === 100) return null;

  return (
    <div
      ref={elRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#07070f',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <style>{LOCK_STYLE}</style>

      {/* Static ambient glow — no animation */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 480, height: 480, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(124,58,237,0.14) 0%,transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Logo — CSS animation via keyframes, no framer */}
      <div style={{ marginBottom: 20, animation: 'splash-in 0.45s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <TlqaLogo size={68} splash />
      </div>

      {/* Brand name */}
      <div style={{
        fontSize: 27, fontWeight: 900, color: '#fff',
        fontFamily: 'Cairo,sans-serif', letterSpacing: '-0.03em',
        marginBottom: 8,
        animation: 'splash-fade 0.4s 0.2s ease both',
      }}>
        تلقا تك
      </div>

      {/* Subtitle — static */}
      <div style={{
        fontSize: 13, fontWeight: 600, color: 'rgba(167,139,250,0.75)',
        fontFamily: 'Cairo,sans-serif', marginBottom: 32,
        animation: 'splash-fade 0.4s 0.35s ease both',
      }}>
        تطبيقات · مواقع · Apple Wallet
      </div>

      {/* Progress bar */}
      <div style={{
        width: 196, animation: 'splash-fade 0.4s 0.3s ease both',
      }}>
        <div style={{
          height: 2, borderRadius: 2,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: 'linear-gradient(90deg,#7C3AED,#06B6D4)',
            width: `${progress}%`,
            transition: 'width 0.12s linear',
          }} />
        </div>
        <div style={{
          marginTop: 9, textAlign: 'center',
          fontSize: 11, color: 'rgba(255,255,255,0.28)',
          fontWeight: 700, fontFamily: 'monospace', letterSpacing: 1,
        }}>
          {Math.round(progress)}٪
        </div>
      </div>

      {/* Tagline */}
      <div style={{
        marginTop: 26,
        fontSize: 12, color: 'rgba(255,255,255,0.18)',
        fontFamily: 'Cairo,sans-serif', fontWeight: 600,
        animation: 'splash-fade 0.4s 0.5s ease both',
      }}>
        نحوّل أفكارك التجارية إلى حلول رقمية
      </div>

      <style>{`
        @keyframes splash-in {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes splash-fade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
