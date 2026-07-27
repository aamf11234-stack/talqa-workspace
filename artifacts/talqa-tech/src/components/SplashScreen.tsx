import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// ── tiny inline style tag so the body doesn't scroll under splash ──
const LOCK_STYLE = `body{overflow:hidden !important}`;

const WORDS = ['مواقع', 'تطبيقات', 'Apple Wallet', 'حجوزات', 'ذكاء اصطناعي'];

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [wordIdx,  setWordIdx]  = useState(0);
  const [exit,     setExit]     = useState(false);

  // Progress bar — reaches ~95% in 1.8 s, jumps to 100 then exits
  useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += (100 - v) * 0.055;
      setProgress(Math.min(v, 96));
      if (v >= 96) clearInterval(t);
    }, 32);
    // Full dismiss at 2.1 s
    const done = setTimeout(() => {
      setProgress(100);
      setTimeout(() => { setExit(true); setTimeout(onDone, 650); }, 120);
    }, 2100);
    return () => { clearInterval(t); clearTimeout(done); };
  }, [onDone]);

  // Cycle through service words
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 380);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      {!exit ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#07070f',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 0, overflow: 'hidden',
          }}
        >
          <style>{LOCK_STYLE}</style>

          {/* ── background particles ── */}
          {[...Array(18)].map((_, i) => (
            <motion.div key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0], y: [0, -60], x: [(i % 3 - 1) * 20, (i % 3 - 1) * 40] }}
              transition={{ duration: 2 + (i % 4) * 0.4, delay: i * 0.09, repeat: Infinity, repeatDelay: 1 }}
              style={{
                position: 'absolute',
                left: `${5 + (i * 5.5) % 90}%`,
                top: `${60 + (i * 7) % 35}%`,
                width: 3 + (i % 3), height: 3 + (i % 3),
                borderRadius: '50%',
                background: i % 3 === 0 ? '#7C3AED' : i % 3 === 1 ? '#06B6D4' : '#A78BFA',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* ── radial glow ── */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(124,58,237,0.18) 0%,transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* ── logo mark ── */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.05 }}
            style={{ marginBottom: 22 }}
          >
            <TlqaLogo size={72} splash />
          </motion.div>

          {/* ── brand name ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              fontSize: 28, fontWeight: 900, color: '#fff',
              fontFamily: 'Cairo,sans-serif', letterSpacing: '-0.03em',
              marginBottom: 10,
            }}
          >
            تلقا تك
          </motion.div>

          {/* ── cycling service word ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              height: 28, overflow: 'hidden', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginBottom: 36,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{
                  fontSize: 14, fontWeight: 700, color: '#A78BFA',
                  fontFamily: 'Cairo,sans-serif',
                }}
              >
                {WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* ── progress bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ width: 200, position: 'relative' }}
          >
            {/* track */}
            <div style={{
              height: 2, borderRadius: 2,
              background: 'rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <motion.div
                style={{
                  height: '100%', borderRadius: 2, originX: 0,
                  background: 'linear-gradient(90deg,#7C3AED,#06B6D4)',
                }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.15 }}
              />
            </div>

            {/* percent */}
            <div style={{
              marginTop: 10, textAlign: 'center',
              fontSize: 11, color: 'rgba(255,255,255,0.3)',
              fontWeight: 700, fontFamily: 'monospace', letterSpacing: 1,
            }}>
              {Math.round(progress)}٪
            </div>
          </motion.div>

          {/* ── tagline ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              marginTop: 28,
              fontSize: 12, color: 'rgba(255,255,255,0.2)',
              fontFamily: 'Cairo,sans-serif', fontWeight: 600,
              letterSpacing: 0.3,
            }}
          >
            نحوّل أفكارك التجارية إلى حلول رقمية
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
