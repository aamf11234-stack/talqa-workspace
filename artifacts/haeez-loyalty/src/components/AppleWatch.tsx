import React from 'react';
import { motion } from 'framer-motion';

const logoImg = `${import.meta.env.BASE_URL}restaurant-logo.png`;

/* Animated progress arc */
function WatchRing({ progress = 0.57 }: { progress?: number }) {
  const r = 30;
  const cx = 50;
  const cy = 50;
  const circumference = 2 * Math.PI * r;
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth="5" fill="none" />
      {/* Progress */}
      <motion.circle
        cx={cx} cy={cy} r={r}
        stroke="url(#watch-gold)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        style={{ rotate: -90, originX: `${cx}px`, originY: `${cy}px` }}
        initial={{ strokeDasharray: `0 ${circumference}` }}
        animate={{ strokeDasharray: `${progress * circumference} ${circumference}` }}
        transition={{ duration: 2, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />
      <defs>
        <linearGradient id="watch-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9956A" />
          <stop offset="100%" stopColor="#F0D4A8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AppleWatchHyz({ compact = false }: { compact?: boolean }) {
  const scale = compact ? 0.72 : 1;
  const W = Math.round(175 * scale);
  const H = Math.round(215 * scale);

  return (
    <div className="flex flex-col items-center" style={{ width: W }}>
      {/* Top band */}
      <div
        className="w-[44%] rounded-t-[6px]"
        style={{ height: Math.round(28 * scale), background: 'linear-gradient(180deg,#1a0205,#2a0508)' }}
      />

      {/* Watch body */}
      <div
        className="relative overflow-hidden"
        style={{
          width: W,
          height: H,
          borderRadius: Math.round(44 * scale),
          background: 'linear-gradient(145deg,#1a1a1a,#0a0a0a)',
          boxShadow: `0 0 0 ${Math.round(2.5 * scale)}px rgba(255,255,255,0.08), 0 ${Math.round(12 * scale)}px ${Math.round(40 * scale)}px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Screen glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%,rgba(123,22,24,0.35) 0%,transparent 70%)' }} />

        {/* Screen content */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-[14%] px-[10%]">

          {/* Time + date */}
          <div className="text-center w-full">
            <p className="text-white/40 font-inter" style={{ fontSize: Math.round(9 * scale) }}>الجمعة ١٧ يوليو</p>
            <p className="text-white font-bold font-inter tabular-nums" style={{ fontSize: Math.round(28 * scale), lineHeight: 1.1 }}>٩:٤١</p>
          </div>

          {/* Ring + center */}
          <div className="relative" style={{ width: Math.round(76 * scale), height: Math.round(76 * scale) }}>
            <WatchRing progress={0.57} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.p
                className="text-white font-bold font-inter tabular-nums"
                style={{ fontSize: Math.round(20 * scale), lineHeight: 1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                480
              </motion.p>
              <p className="text-white/35" style={{ fontSize: Math.round(7 * scale) }}>نقطة</p>
            </div>
          </div>

          {/* Bottom: logo + level */}
          <div className="flex flex-col items-center gap-[5%]">
            <div className="flex items-center gap-[8%]">
              <img
                src={logoImg}
                alt="مطعمك"
                style={{ width: Math.round(18 * scale), height: Math.round(18 * scale), borderRadius: Math.round(5 * scale), objectFit: 'cover', border: '1px solid rgba(201,149,106,0.3)' }}
              />
              <p className="text-[#C9956A] font-bold" style={{ fontSize: Math.round(11 * scale) }}>مطعمك</p>
            </div>
            <div
              className="flex items-center gap-[6%] px-[8%] py-[3%] rounded-full"
              style={{ background: 'rgba(201,149,106,0.12)', border: '0.5px solid rgba(201,149,106,0.2)' }}
            >
              <div className="w-[6px] h-[6px] rounded-full bg-[#30D158]" style={{ width: Math.round(5 * scale), height: Math.round(5 * scale) }} />
              <p className="text-white/60" style={{ fontSize: Math.round(8 * scale) }}>كلاسيك · ٤ من ٧</p>
            </div>
          </div>
        </div>

        {/* Crown button */}
        <div
          className="absolute"
          style={{
            right: -Math.round(3 * scale),
            top: '38%',
            width: Math.round(4 * scale),
            height: Math.round(20 * scale),
            borderRadius: Math.round(2 * scale),
            background: 'linear-gradient(180deg,#333,#222)',
            boxShadow: '1px 0 2px rgba(0,0,0,0.4)',
          }}
        />
      </div>

      {/* Bottom band */}
      <div
        className="w-[44%] rounded-b-[6px]"
        style={{ height: Math.round(28 * scale), background: 'linear-gradient(180deg,#2a0508,#1a0205)' }}
      />
    </div>
  );
}
