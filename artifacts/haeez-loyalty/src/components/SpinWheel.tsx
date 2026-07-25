import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';

/* ── Prize data ──────────────────────────────────────────────────── */
const PRIZES = [
  { label: 'خصم ١٠٪',      emoji: '🏷️', color1: '#6B1215', color2: '#6B3A1F', highlight: false },
  { label: 'مشروب مجاني',  emoji: '🥤', color1: '#B8860B', color2: '#8B6914', highlight: true  },
  { label: 'نقاط مضاعفة', emoji: '⭐', color1: '#1A6B3A', color2: '#0F4828', highlight: false },
  { label: 'حاول ثانية',   emoji: '🔄', color1: '#2A2A2A', color2: '#1A1A1A', highlight: false },
  { label: 'وجبة مجانية', emoji: '🍽️', color1: '#C4783A', color2: '#520E10', highlight: true  },
  { label: 'خصم ١٥٪',      emoji: '💰', color1: '#7D3C15', color2: '#5C2C0F', highlight: false },
  { label: 'كوبون ٢٥ ريال',emoji: '🎟️', color1: '#1B4F72', color2: '#123558', highlight: false },
  { label: 'هدية مفاجأة',  emoji: '🎁', color1: '#6B2D8B', color2: '#4A2060', highlight: true  },
];

const N = PRIZES.length;
const SEG = 360 / N;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/* ── Confetti burst ──────────────────────────────────────────────── */
const CONFETTI_COLORS = ['#F0D060','#C9956A','#C4783A','#30D158','#007AFF','#FF3B30','#FF9500','#AF52DE'];
function Confetti() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    angle: (i / 50) * 360 + Math.random() * 20,
    distance: 120 + Math.random() * 100,
    size: 6 + Math.random() * 8,
    rotate: Math.random() * 360,
    isRect: Math.random() > 0.5,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden rounded-[48px]">
      {particles.map((p) => {
        const tx = Math.cos((p.angle * Math.PI) / 180) * p.distance;
        const ty = Math.sin((p.angle * Math.PI) / 180) * p.distance;
        return (
          <motion.div key={p.id}
            className="absolute"
            style={{ width: p.size, height: p.isRect ? p.size / 2 : p.size, background: p.color, borderRadius: p.isRect ? 2 : '50%', top: '50%', left: '50%' }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{ x: tx, y: ty, opacity: 0, rotate: p.rotate, scale: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: Math.random() * 0.15 }}
          />
        );
      })}
    </div>
  );
}

/* ── SVG Wheel ───────────────────────────────────────────────────── */
function WheelSVG() {
  const cx = 150, cy = 150, r = 132;
  return (
    <svg width="300" height="300" viewBox="0 0 300 300" className="w-full h-full select-none">
      <defs>
        {PRIZES.map((p, i) => (
          <radialGradient key={i} id={`sg${i}`} cx="35%" cy="25%" r="75%">
            <stop offset="0%" stopColor={p.color1} />
            <stop offset="100%" stopColor={p.color2} />
          </radialGradient>
        ))}
        <radialGradient id="hub" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#F5E0B0" />
          <stop offset="100%" stopColor="#8A5A28" />
        </radialGradient>
        <filter id="segShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.4)" />
        </filter>
      </defs>

      {/* Outer glow ring */}
      <circle cx={cx} cy={cy} r={r + 12} fill="none" stroke="rgba(201,149,106,0.25)" strokeWidth="10" />

      {/* Gold border ring */}
      <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke="url(#goldRing)" strokeWidth="5" />
      <defs>
        <linearGradient id="goldRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5E080" />
          <stop offset="30%" stopColor="#C9956A" />
          <stop offset="60%" stopColor="#F0D080" />
          <stop offset="100%" stopColor="#A07830" />
        </linearGradient>
      </defs>

      {/* Segments */}
      {PRIZES.map((prize, i) => {
        const a1 = i * SEG - 90;
        const a2 = a1 + SEG;
        const s = polar(cx, cy, r, a1);
        const e = polar(cx, cy, r, a2);
        const mid = a1 + SEG / 2;
        const ep = polar(cx, cy, r * 0.62, mid);
        const tp = polar(cx, cy, r * 0.84, mid);
        const rMid = mid + 90;

        return (
          <g key={i} filter="url(#segShadow)">
            <path
              d={`M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 0 1 ${e.x} ${e.y} Z`}
              fill={`url(#sg${i})`}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
            {/* Highlight on prize segments */}
            {prize.highlight && (
              <path
                d={`M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 0 1 ${e.x} ${e.y} Z`}
                fill="rgba(255,255,255,0.06)"
              />
            )}
            {/* Emoji */}
            <text x={ep.x} y={ep.y} fontSize="16" textAnchor="middle" dominantBaseline="middle"
              transform={`rotate(${rMid},${ep.x},${ep.y})`}>{prize.emoji}</text>
            {/* Label */}
            <text x={tp.x} y={tp.y} fill="rgba(255,255,255,0.92)" fontSize="8.5" fontWeight="700"
              textAnchor="middle" dominantBaseline="middle"
              fontFamily="system-ui,sans-serif"
              transform={`rotate(${rMid},${tp.x},${tp.y})`}>{prize.label}</text>
          </g>
        );
      })}

      {/* Rim dots */}
      {Array.from({ length: 24 }).map((_, i) => {
        const p = polar(cx, cy, r + 3, i * (360 / 24) - 90);
        return <circle key={i} cx={p.x} cy={p.y} r={i % 3 === 0 ? 3 : 1.5}
          fill={i % 3 === 0 ? '#F0D060' : 'rgba(201,149,106,0.5)'} />;
      })}

      {/* Center hub */}
      <circle cx={cx} cy={cy} r={26} fill="url(#hub)" />
      <circle cx={cx} cy={cy} r={26} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <text x={cx} y={cy} fontSize="18" textAnchor="middle" dominantBaseline="middle">🎰</text>

      {/* Inner separator lines from center */}
      {PRIZES.map((_, i) => {
        const a = i * SEG - 90;
        const p = polar(cx, cy, r, a);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y}
          stroke="rgba(255,255,255,0.07)" strokeWidth="1" />;
      })}
    </svg>
  );
}

/* ── Prize modal ─────────────────────────────────────────────────── */
function PrizeModal({ prize, onClose, onSpin }: { prize: typeof PRIZES[0]; onClose: () => void; onSpin: () => void }) {
  const isRetry = prize.label === 'حاول ثانية';
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl z-20 rounded-[48px]"
        onClick={onClose} />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-8"
      >
        <div className="w-full bg-[#111] rounded-[28px] p-7 flex flex-col items-center gap-4 shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10 pointer-events-auto">
          {/* Emoji burst */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="text-[72px] leading-none"
          >{prize.emoji}</motion.div>

          <div className="text-center">
            {isRetry ? (
              <>
                <p className="text-white/50 text-[13px] mb-1">آسفين!</p>
                <p className="text-white text-[24px] font-black">حاول مرة ثانية</p>
              </>
            ) : (
              <>
                <p className="text-[#C9956A] text-[11px] font-bold tracking-widest mb-1.5">🎉 مبروك!</p>
                <p className="text-white text-[26px] font-black leading-tight">{prize.label}</p>
                <p className="text-white/35 text-[11px] mt-2 font-light">
                  سيصلك الكوبون عبر واتساب خلال دقيقتين
                </p>
              </>
            )}
          </div>

          {/* Separator */}
          <div className="w-full h-px bg-white/8" />

          <div className="flex gap-3 w-full">
            {isRetry ? (
              <motion.button whileTap={{ scale: 0.95 }} onClick={onSpin}
                className="flex-1 py-3.5 rounded-[14px] text-white font-bold text-[14px] flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg,#C4783A,#6B3A1F)' }}>
                <RotateCcw size={15} /> دوّر مرة ثانية
              </motion.button>
            ) : (
              <>
                <motion.a whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/966551378531?text=حصلت على ${prize.label} من عجلة الجوائز 🎉`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-3.5 rounded-[14px] text-white font-bold text-[13px] flex items-center justify-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg,#128C7E,#075E54)' }}>
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  استلم الجائزة
                </motion.a>
                <motion.button whileTap={{ scale: 0.95 }} onClick={onClose}
                  className="px-4 py-3.5 rounded-[14px] bg-white/8 text-white/60 text-[13px] font-medium">
                  لاحقاً
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Main SpinWheel component — renders as a full-screen overlay
══════════════════════════════════════════════════════════════════ */
export function SpinWheelOverlay({ onClose }: { onClose: () => void }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState<typeof PRIZES[0] | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(1);

  function spin() {
    if (spinning || spinsLeft <= 0) return;
    const prizeIndex = Math.floor(Math.random() * N);
    // finalRotation brings the chosen segment to the pointer at top
    const alignAngle = (360 - prizeIndex * SEG - SEG / 2 + 360) % 360;
    const newRotation = rotation + 5 * 360 + alignAngle - (rotation % 360);

    setPrize(null);
    setShowConfetti(false);
    setSpinning(true);
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      const won = PRIZES[prizeIndex];
      setPrize(won);
      if (won.label !== 'حاول ثانية') {
        setShowConfetti(true);
        setSpinsLeft(0);
        setTimeout(() => setShowConfetti(false), 1500);
      }
    }, 4200);
  }

  function handleRetry() {
    setPrize(null);
    setSpinsLeft(1);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col bg-[#080002] rounded-[48px] overflow-hidden"
    >
      {/* Ambient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%,rgba(160,82,45,0.5) 0%,transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 80%,rgba(201,149,106,0.12) 0%,transparent 60%)' }} />
        {/* Stars */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white"
            style={{ width: Math.random() > 0.7 ? 2 : 1, height: Math.random() > 0.7 ? 2 : 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 60}%`, opacity: 0.3 + Math.random() * 0.4 }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 relative z-10">
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center border border-white/8">
          <X size={16} className="text-white/60" />
        </button>
        <div className="text-center">
          <p className="text-[8px] font-black tracking-[0.3em] text-[#C9956A]/60" style={{ fontFamily: 'ui-monospace,monospace' }}>LUCKY DRAW</p>
          <p className="text-white text-[16px] font-black mt-0.5">دوّر واربح</p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-white/8 border border-white/8">
          <span className="text-white/60 text-[10px] font-bold">{spinsLeft} دورة</span>
        </div>
      </div>

      {/* Wheel container */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 relative px-6">

        {/* Pointer */}
        <div className="relative z-10 mb-1">
          <svg width="24" height="28" viewBox="0 0 24 28">
            <defs>
              <linearGradient id="ptr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F0D060" />
                <stop offset="100%" stopColor="#C9956A" />
              </linearGradient>
            </defs>
            <polygon points="12,26 0,2 24,2" fill="url(#ptr)" />
            <circle cx="12" cy="4" r="3" fill="#F5E080" />
          </svg>
        </div>

        {/* The wheel */}
        <div className="relative" style={{ width: 280, height: 280 }}>
          {/* Glow under wheel */}
          <div className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: spinning ? '0 0 60px rgba(201,149,106,0.35), 0 0 120px rgba(160,82,45,0.25)' : '0 0 30px rgba(201,149,106,0.15)', transition: 'box-shadow 0.5s' }} />

          <motion.div style={{ width: '100%', height: '100%' }}
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.2, 0.85, 0.4, 1.0] }}>
            <WheelSVG />
          </motion.div>

          {/* Confetti from center */}
          <AnimatePresence>{showConfetti && <Confetti />}</AnimatePresence>
        </div>

        {/* Prize overlay */}
        <AnimatePresence>
          {prize && (
            <PrizeModal prize={prize} onClose={onClose}
              onSpin={() => { handleRetry(); setPrize(null); }} />
          )}
        </AnimatePresence>

        {/* Spin button */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <motion.button
            whileTap={{ scale: spinning || spinsLeft <= 0 ? 1 : 0.94 }}
            onClick={spin}
            disabled={spinning || spinsLeft <= 0}
            className="relative px-10 py-4 rounded-[18px] font-black text-[17px] overflow-hidden"
            style={{
              background: spinning || spinsLeft <= 0
                ? 'rgba(255,255,255,0.06)'
                : 'linear-gradient(135deg,#C9956A 0%,#8A5A28 40%,#F0D090 55%,#8A5A28 100%)',
              color: spinning || spinsLeft <= 0 ? 'rgba(255,255,255,0.3)' : '#0D0205',
              boxShadow: spinning || spinsLeft <= 0 ? 'none' : '0 8px 30px rgba(201,149,106,0.45)',
            }}
          >
            {spinning ? (
              <span className="flex items-center gap-2">
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}>🎰</motion.span>
                جاري الدوران...
              </span>
            ) : spinsLeft <= 0 ? '✓ انتهت دوراتك اليوم' : '🎰 دوّر الآن!'}
            {/* Shimmer */}
            {!spinning && spinsLeft > 0 && (
              <motion.div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.35) 50%,transparent 100%)' }}
                initial={{ x: '-100%' }} animate={{ x: '200%' }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }} />
            )}
          </motion.button>
          <p className="text-white/20 text-[10px] font-light">دورة واحدة مجانية كل يوم</p>
        </div>
      </div>
    </motion.div>
  );
}
