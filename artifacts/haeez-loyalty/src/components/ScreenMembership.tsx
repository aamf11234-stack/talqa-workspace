import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Check, Gift, Send, Star, ChevronLeft, X, Sparkles, Download } from 'lucide-react';
import { QRCodeSVG } from './QRCodeSVG';
import { useBrand } from '../BrandContext';
import { downloadPkpass } from '../utils/generatePkpass';

/* ══════════════════════════════════════════════════════════════════
   Apple Wallet Pass — exact StoreCard spec
══════════════════════════════════════════════════════════════════ */
const BASE = import.meta.env.BASE_URL;
const stripImg  = `${BASE}bd-hero.jpg`;
const logoImg   = `${BASE}bd-logo.svg`;

/** Inline mini QR for the pass */
function PassQR({ size = 72, dark = '#1A0804', light = 'white' }: { size?: number; dark?: string; light?: string }) {
  const s = 21;
  const rng = (seed: number) => { const x = Math.sin(seed + 1) * 10000; return x - Math.floor(x); };
  const mod = (x: number, y: number) => {
    if (x < 7 && y < 7) return true;
    if (x > s - 8 && y < 7) return true;
    if (x < 7 && y > s - 8) return true;
    if (x === 6 || y === 6) return (x + y) % 2 === 0;
    return rng(x * 100 + y) > 0.48;
  };
  const finder = (cx: number, cy: number) => (
    <g key={`f${cx}${cy}`}>
      <rect x={cx} y={cy} width={7} height={7} fill={dark} />
      <rect x={cx+1} y={cy+1} width={5} height={5} fill={light} />
      <rect x={cx+2} y={cy+2} width={3} height={3} fill={dark} />
    </g>
  );
  const dots: React.ReactNode[] = [];
  for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) {
    const isFinder = (x<7&&y<7)||(x>s-8&&y<7)||(x<7&&y>s-8);
    if (!isFinder && mod(x,y)) dots.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={dark} />);
  }
  return (
    <svg width={size} height={size} viewBox="-1 -1 23 23" shapeRendering="crispEdges" style={{ background: light, borderRadius: 4 }}>
      {finder(0,0)}{finder(s-7,0)}{finder(0,s-7)}{dots}
    </svg>
  );
}

function MembershipCard() {
  return (
    <motion.div
      whileHover={{ rotateY: 2, scale: 1.012 }}
      whileTap={{ scale: 0.982 }}
      transition={{ type: 'spring', stiffness: 240, damping: 26 }}
      className="relative w-full select-none"
      style={{ perspective: 800 }}
    >
      {/* Glow beneath */}
      <div className="absolute -inset-3 rounded-[32px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 90%,rgba(160,82,45,0.35) 0%,transparent 70%)', filter: 'blur(14px)' }} />

      <div className="relative w-full rounded-[22px] overflow-hidden"
        style={{
          background: '#1A0804',
          boxShadow: '0 28px 70px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(201,149,106,0.25)',
        }}>

        {/* ── Strip image (top 38% of card) ── */}
        <div className="relative overflow-hidden" style={{ height: 110 }}>
          <img src={stripImg} alt="" className="w-full h-full object-cover"
            style={{ objectPosition: 'center 55%', filter: 'brightness(0.72) saturate(1.1)' }} />
          {/* Gradient fade down */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom,rgba(26,8,4,0) 0%,rgba(26,8,4,0.1) 60%,rgba(26,8,4,1) 100%)' }} />
          {/* Top-left logo row */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-3.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[8px] overflow-hidden bg-[#1A0804] flex items-center justify-center"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                <img src={logoImg} alt="BD" className="w-6 h-6 object-contain" />
              </div>
              <span className="text-white text-[11px] font-bold tracking-wide"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>Brown Dose</span>
            </div>
            {/* Points header field */}
            <div className="text-right">
              <p className="text-white/40 text-[7px] font-inter tracking-[0.22em] uppercase">POINTS</p>
              <p className="text-white font-black text-[18px] leading-none font-inter"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>480</p>
            </div>
          </div>
        </div>

        {/* ── Pass body ── */}
        <div className="px-4 pt-3 pb-4">
          {/* Thin gold divider */}
          <div className="mb-3" style={{ height: '0.5px', background: 'linear-gradient(90deg,transparent,rgba(201,149,106,0.4),transparent)' }} />

          {/* Primary + secondary fields */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-white/35 text-[7px] font-inter tracking-[0.24em] uppercase mb-0.5">Cardholder</p>
              <p className="text-white text-[15px] font-bold leading-none">عبدالإله علي</p>
            </div>
            <div className="text-right">
              <p className="text-white/35 text-[7px] font-inter tracking-[0.24em] uppercase mb-0.5">Level</p>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(201,149,106,0.15)', border: '0.5px solid rgba(201,149,106,0.3)' }}>
                <Sparkles size={7} className="text-[#C4783A]" />
                <span className="text-[#C4783A] text-[9px] font-bold">كلاسيك</span>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-1 mb-4">
            {[0,1,2,3,4,5,6].map(i => (
              <div key={i} style={{
                flex: 1, height: 3, borderRadius: 99,
                background: i < 4
                  ? 'linear-gradient(90deg,#7A3B18,#E8C48A)'
                  : 'rgba(255,255,255,0.08)',
              }} />
            ))}
          </div>

          {/* Barcode strip */}
          <div className="flex items-center justify-between rounded-[14px] overflow-hidden"
            style={{ background: 'white', padding: '10px 14px' }}>
            <div>
              <p className="text-[#1A0804] text-[8px] font-black tracking-[0.18em] uppercase mb-0.5">Brown Dose</p>
              <p className="text-[#888] text-[7px] font-inter">#BD-2024-8821</p>
              <p className="text-[#555] text-[7px] font-inter mt-0.5">صبيا · جيزان · ضمد</p>
            </div>
            <PassQR size={60} dark="#1A0804" light="white" />
          </div>
        </div>

        {/* Inset rim */}
        <div className="absolute inset-0 rounded-[22px] pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.08)' }} />
      </div>
    </motion.div>
  );
}

/* ── QR Modal ────────────────────────────────────────────────────── */
function QRModal({ onClose }: { onClose: () => void }) {
  const [tapped, setTapped] = useState(false);
  const [scanned, setScanned] = useState(false);

  function handleTap() {
    if (tapped) return;
    setTapped(true);
    setTimeout(() => setScanned(true), 1800);
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
        onClick={onClose} className="absolute inset-0 z-50 rounded-[49px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }} />

      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 320 }}
        className="absolute bottom-0 left-0 right-0 rounded-t-[32px] z-50 flex flex-col items-center px-6 pt-4 pb-8"
        style={{ background: '#0A0A0A', borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>

        <div className="w-10 h-1 bg-white/10 rounded-full mb-5" />

        {/* Header */}
        <AnimatePresence mode="wait">
          {!scanned ? (
            <motion.div key="scan" className="text-center mb-5">
              <h3 className="text-[18px] font-bold text-white mb-1">رمز عضويتك</h3>
              <p className="text-[12px] text-white/35 font-light">
                {tapped ? 'جاري المسح...' : 'اضغط رمز QR عند الصندوق'}
              </p>
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-5">
              <p className="text-[18px] font-bold text-[#30D158] mb-1">✓ تمت النقطة!</p>
              <p className="text-[12px] text-white/40 font-light">+١٥ نقطة أُضيفت لرصيدك</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* QR + NFC animation */}
        <motion.button
          onClick={handleTap}
          whileTap={{ scale: 0.97 }}
          className="relative flex items-center justify-center"
          style={{ width: 200, height: 200 }}>

          {/* NFC ripple waves when tapped */}
          <AnimatePresence>
            {tapped && !scanned && [0,1,2].map(i => (
              <motion.div key={i} className="absolute rounded-full border-2 pointer-events-none"
                style={{ borderColor: 'rgba(48,209,88,0.6)' }}
                initial={{ width: 80, height: 80, opacity: 0.8 }}
                animate={{ width: 200, height: 200, opacity: 0 }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.45, ease: 'easeOut' }} />
            ))}
          </AnimatePresence>

          {/* QR container */}
          <motion.div
            animate={tapped && !scanned ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 0.6, repeat: 3 }}
            className="relative rounded-[20px] overflow-hidden"
            style={{
              background: 'white',
              padding: 14,
              boxShadow: tapped
                ? '0 0 0 2px rgba(48,209,88,0.6), 0 12px 40px rgba(48,209,88,0.2)'
                : '0 12px 40px rgba(0,0,0,0.5)',
              transition: 'box-shadow 0.3s ease',
            }}>
            <QRCodeSVG />

            {/* Scan laser line */}
            {!scanned && (
              <motion.div
                className="absolute left-3 right-3 h-0.5 rounded-full pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg,transparent,#30D158,rgba(48,209,88,0.8),#30D158,transparent)',
                  boxShadow: '0 0 10px rgba(48,209,88,0.9)',
                }}
                initial={{ top: '12px' }}
                animate={{ top: ['12px', 'calc(100% - 12px)', '12px'] }}
                transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
              />
            )}

            {/* Success overlay */}
            <AnimatePresence>
              {scanned && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center rounded-[20px]"
                  style={{ background: 'rgba(48,209,88,0.15)' }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: '#30D158', boxShadow: '0 0 30px rgba(48,209,88,0.7)' }}>
                    <Check size={24} strokeWidth={3} className="text-white" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.button>

        {/* Member ID */}
        <p className="text-[11px] text-white/20 mt-4 font-inter tracking-[0.22em]">#BD-2024-8821</p>

        {/* Points per scan */}
        <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(48,209,88,0.08)', border: '1px solid rgba(48,209,88,0.15)' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
          <p className="text-[#30D158] text-[10px] font-medium">+١٥ نقطة لكل طلب</p>
        </div>

        {!tapped && (
          <p className="text-white/20 text-[10px] mt-3">اضغط الرمز لمحاكاة المسح</p>
        )}

        <motion.button onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.97 }}
          className="w-full mt-5 py-4 rounded-[16px] font-semibold text-[14px] text-white"
          style={{ background: 'rgba(255,255,255,0.1)', border: '0.5px solid rgba(255,255,255,0.12)' }}>
          إغلاق
        </motion.button>
      </motion.div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Apple Wallet Modal — pixel-perfect iOS "Add Pass" flow
══════════════════════════════════════════════════════════════════ */
function WalletPassPreview({ compact = false }: { compact?: boolean }) {
  const stripH = compact ? 72 : 100;
  const qrSize = compact ? 52 : 64;
  return (
    <div className="w-full rounded-[18px] overflow-hidden"
      style={{
        background: '#1A0804',
        boxShadow: compact
          ? '0 12px 40px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(201,149,106,0.3)'
          : '0 24px 60px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(201,149,106,0.3)',
      }}>
      {/* Strip */}
      <div className="relative overflow-hidden" style={{ height: stripH }}>
        <img src={`${BASE}bd-hero.jpg`} alt="" className="w-full h-full object-cover"
          style={{ objectPosition: 'center 55%', filter: 'brightness(0.65) saturate(1.1)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom,rgba(26,8,4,0) 0%,rgba(26,8,4,0.85) 100%)' }} />
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3.5 pt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-[6px] bg-[#1A0804]/80 flex items-center justify-center">
              <img src={`${BASE}bd-logo.svg`} alt="BD" className="w-5 h-5 object-contain" />
            </div>
            <span className="text-white text-[10px] font-bold" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>Brown Dose</span>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-[6px] font-inter tracking-widest">POINTS</p>
            <p className="text-white font-black text-[15px] leading-none font-inter">480</p>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="px-3.5 pt-2.5 pb-3">
        <div className="h-px mb-2.5" style={{ background: 'linear-gradient(90deg,transparent,rgba(201,149,106,0.35),transparent)' }} />
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-white/30 text-[6px] font-inter tracking-widest uppercase">Cardholder</p>
            <p className="text-white text-[12px] font-bold leading-tight">عبدالإله علي</p>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full"
            style={{ background: 'rgba(201,149,106,0.15)', border: '0.5px solid rgba(201,149,106,0.3)' }}>
            <span className="text-[#C4783A] text-[8px] font-bold">كلاسيك</span>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-[10px] overflow-hidden"
          style={{ background: 'white', padding: '8px 10px' }}>
          <div>
            <p className="text-[#1A0804] text-[7px] font-black tracking-wider">BROWN DOSE</p>
            <p className="text-[#888] text-[6px] font-inter">#BD-2024-8821</p>
          </div>
          <PassQR size={qrSize} dark="#1A0804" light="white" />
        </div>
      </div>
      <div className="absolute inset-0 rounded-[18px] pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.07)' }} />
    </div>
  );
}

function AppleWalletModal({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'preview' | 'adding' | 'done'>('preview');

  async function handleAdd() {
    setPhase('adding');
    // trigger real .pkpass download in parallel
    downloadPkpass(import.meta.env.BASE_URL).catch(() => {});
    setTimeout(() => setPhase('done'), 1600);
  }

  return (
    <>
      {/* Blurred dark overlay */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={phase === 'done' ? onClose : undefined}
        className="absolute inset-0 z-50 rounded-[49px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }} />

      {/* Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '110%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 z-50 rounded-t-[28px] overflow-hidden"
        style={{ background: '#1C1C1E' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="w-9 h-[4px] rounded-full bg-white/20" />
        </div>

        {/* iOS nav bar */}
        <div className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: '0.5px solid rgba(255,255,255,0.1)' }}>
          <button onClick={onClose}
            className="text-[15px] font-normal"
            style={{ color: '#007AFF' }}>إلغاء</button>
          <div className="flex items-center gap-1.5">
            {/* Apple logo */}
            <svg viewBox="0 0 24 24" className="w-4 h-4" style={{ fill: 'white' }}>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <p className="text-white text-[15px] font-semibold">Wallet</p>
          </div>
          <div className="w-10" />
        </div>

        <AnimatePresence mode="wait">
          {/* ── PREVIEW phase ── */}
          {phase === 'preview' && (
            <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="px-5 pt-5 pb-6 flex flex-col gap-4">
              <div className="text-center">
                <p className="text-white text-[17px] font-semibold">إضافة البطاقة؟</p>
                <p className="text-white/40 text-[12px] mt-1 font-light">Brown Dose · بطاقة الولاء</p>
              </div>

              {/* Card preview with 3D tilt animation */}
              <motion.div
                initial={{ scale: 0.88, rotateX: 8, opacity: 0 }}
                animate={{ scale: 1, rotateX: 0, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 180, damping: 20 }}
                style={{ perspective: 600 }}
              >
                <WalletPassPreview />
              </motion.div>

              {/* Info pills */}
              <div className="flex flex-col gap-2">
                {[
                  { icon: '🔒', text: 'تظهر على شاشة القفل عند اقترابك من الفرع' },
                  { icon: '📴', text: 'تعمل بدون إنترنت' },
                  { icon: '🔔', text: 'إشعارات فورية عند وصول العروض' },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.07 }}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-[12px]"
                    style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <span className="text-[14px]">{item.icon}</span>
                    <p className="text-white/55 text-[11px] font-light">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* iOS-style Add button */}
              <motion.button
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                className="w-full py-[15px] rounded-[14px] text-white text-[17px] font-semibold"
                style={{ background: '#007AFF' }}>
                إضافة
              </motion.button>
            </motion.div>
          )}

          {/* ── ADDING phase ── */}
          {phase === 'adding' && (
            <motion.div key="adding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-5 pt-5 pb-8 flex flex-col items-center gap-5">
              <WalletPassPreview compact />
              <div className="flex flex-col items-center gap-3 py-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 rounded-full border-2 border-white/15 border-t-white"
                />
                <p className="text-white/50 text-[13px] font-light">يُضاف إلى Apple Wallet...</p>
              </div>
            </motion.div>
          )}

          {/* ── DONE phase — lock screen preview ── */}
          {phase === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} className="px-4 pt-4 pb-6 flex flex-col items-center gap-4">

              {/* iOS Lock Screen mockup */}
              <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                className="w-full rounded-[20px] overflow-hidden relative"
                style={{ background: 'linear-gradient(160deg,#0B1B3A 0%,#162A52 50%,#0B1B3A 100%)', minHeight: 220 }}>

                {/* Wallpaper stars/blur */}
                <div className="absolute inset-0 pointer-events-none opacity-30"
                  style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.8) 1px,transparent 1px)', backgroundSize: '18px 18px' }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(120,160,255,0.25) 0%,transparent 60%)' }} />

                {/* Lock screen top */}
                <div className="relative z-10 flex flex-col items-center pt-5 pb-3">
                  <span className="text-white/50 text-[10px] font-inter mb-1">الجمعة ٢٥ يوليو</span>
                  <span className="text-white font-black text-[42px] leading-none font-inter tracking-[-3px]">9:41</span>
                </div>

                {/* Notification card */}
                <motion.div
                  initial={{ y: 20, opacity: 0, scale: 0.94 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, type: 'spring', stiffness: 260, damping: 24 }}
                  className="relative z-10 mx-3 rounded-[18px] overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', border: '1px solid rgba(255,255,255,0.25)' }}>
                  {/* Pass mini-preview header */}
                  <div className="flex items-center gap-2.5 px-3.5 py-3">
                    <div className="w-9 h-9 rounded-[10px] overflow-hidden shrink-0"
                      style={{ background: '#1A0804', border: '1px solid rgba(201,149,106,0.3)' }}>
                      <img src={`${BASE}bd-logo.svg`} alt="BD" className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[11px] font-semibold leading-tight">Brown Dose</p>
                      <p className="text-white/60 text-[10px] font-light">بطاقة الولاء · ٤٨٠ نقطة</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-[9px]">الآن</p>
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="mx-3 h-px" style={{ background: 'rgba(255,255,255,0.12)' }} />
                  {/* Pass strip */}
                  <div className="flex items-center gap-3 px-3.5 py-2.5">
                    <div className="flex-1">
                      <p className="text-white/40 text-[7px] font-inter tracking-widest">MEMBER</p>
                      <p className="text-white text-[12px] font-bold">عبدالإله علي</p>
                      <p className="text-[#C4783A] text-[9px] font-semibold mt-0.5">كلاسيك · براون دوز</p>
                    </div>
                    <PassQR size={44} dark="#1A0804" light="rgba(255,255,255,0.9)" />
                  </div>
                </motion.div>

                {/* Bottom hint */}
                <div className="relative z-10 flex justify-center py-3">
                  <p className="text-white/30 text-[9px]">← اسحب للفتح</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="text-center">
                <p className="text-white text-[17px] font-semibold">تمت الإضافة! 🎉</p>
                <p className="text-white/40 text-[11px] font-light mt-1.5 leading-relaxed">
                  هكذا ستبدو بطاقتك على شاشة القفل<br />تلقائياً عند اقترابك من الفرع بـ ٥٠٠م
                </p>
              </motion.div>

              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.97 }} onClick={onClose}
                className="w-full py-[15px] rounded-[14px] text-white text-[17px] font-semibold"
                style={{ background: '#007AFF' }}>
                رائع، تم
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/* ── Google Wallet Modal ─────────────────────────────────────────── */
function GoogleWalletModal({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'adding' | 'done'>('adding');
  useEffect(() => { const t = setTimeout(() => setPhase('done'), 2200); return () => clearTimeout(t); }, []);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={phase === 'done' ? onClose : undefined}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl z-50 rounded-[48px]" />
      <motion.div
        initial={{ y: '110%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-[36px] overflow-hidden"
        style={{ maxHeight: '90%' }}>
        {/* Google-style header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#E8E8E8]">
          <button onClick={onClose} className="text-[14px] text-[#1A73E8] font-medium">إغلاق</button>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <p className="text-[#111] text-[14px] font-semibold">Google Wallet</p>
          </div>
          <div className="w-10" />
        </div>
        <div className="px-5 pt-6 pb-8 flex flex-col items-center gap-5">
          {/* Card preview */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 22 }}
            className="w-full rounded-[20px] overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg,#1A73E8 0%,#0D47A1 100%)', boxShadow: '0 16px 40px rgba(26,115,232,0.3)', aspectRatio: '1.586/1' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 80%,rgba(255,255,255,0.1) 0%,transparent 50%)' }} />
            <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
              <div className="flex items-start justify-between">
                <svg viewBox="0 0 24 24" className="w-7 h-7">
                  <path fill="#EA4335" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5" fill="white"/>
                </svg>
                <p className="text-white/60 text-[8px] font-medium tracking-widest">LOYALTY CARD</p>
              </div>
              <div>
                <p className="text-white/50 text-[7px] tracking-widest mb-0.5">CARDHOLDER</p>
                <p className="text-white font-bold text-[14px]">عبدالإله علي</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-white font-black text-[24px] font-inter leading-none">480</p>
                  <p className="text-white/40 text-[8px]">PTS</p>
                </div>
              </div>
            </div>
          </motion.div>
          {/* NFC animation or success */}
          <AnimatePresence mode="wait">
            {phase === 'adding' ? (
              <motion.div key="adding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  {[0,1,2].map(i => (
                    <motion.div key={i} className="absolute rounded-full border-2 border-[#1A73E8]"
                      initial={{ width: 18, height: 18, opacity: 0.8 }}
                      animate={{ width: 52, height: 52, opacity: 0 }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.45, ease: 'easeOut' }} />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-[#1A73E8] flex items-center justify-center z-10">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                  </div>
                </div>
                <p className="text-[#555] text-[12px]">جاري الإضافة إلى Google Wallet...</p>
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-14 h-14 bg-[#34A853] rounded-full flex items-center justify-center shadow-[0_0_28px_rgba(52,168,83,0.4)]">
                  <Check size={22} strokeWidth={3} className="text-white" />
                </motion.div>
                <div className="text-center">
                  <p className="text-[#111] text-[15px] font-semibold">تمت الإضافة!</p>
                  <p className="text-[#888] text-[11px] font-light mt-1">بطاقتك متاحة حتى بدون إنترنت</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F5E9]">
                  <span className="text-[11px]">📲</span>
                  <p className="text-[#2E7D32] text-[10px]">تظهر تلقائياً عند اقترابك من المطعم</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {phase === 'done' && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={onClose}
              className="w-full py-4 rounded-[14px] font-semibold text-[14px] text-white active:scale-95 transition-transform"
              style={{ background: '#1A73E8' }}>
              تم
            </motion.button>
          )}
        </div>
      </motion.div>
    </>
  );
}

/* ── Gift toast ──────────────────────────────────────────────────── */
function GiftToast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2600); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 0, y: -28, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.9 }}
      transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      className="absolute top-3 left-5 right-5 bg-[#1C1C1E] text-white rounded-2xl p-3.5 flex items-center gap-3 z-50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ background: 'linear-gradient(135deg,#7A3B18,#8A5A28)' }}>
        <Gift size={14} strokeWidth={2.5} className="text-white" />
      </div>
      <div>
        <p className="text-[12px] font-semibold">{msg}</p>
        <p className="text-[10px] text-white/50 font-light mt-0.5">سيصله إشعار فوري من مطعمك 🎁</p>
      </div>
    </motion.div>
  );
}

/* ── Gift Modal ──────────────────────────────────────────────────── */
function GiftModal({ gift, onClose, onSend }: { gift: { title: string; pts: number; icon: string }; onClose: () => void; onSend: () => void }) {
  const friends = ['محمد العمري', 'سارة الغامدي', 'خالد الدوسري', 'نورة الزهراني'];
  const [selected, setSelected] = useState<string | null>(null);
  const handleSend = () => { onClose(); onSend(); };
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-md z-50 rounded-[48px]" />
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 320 }}
        className="absolute bottom-0 left-0 right-0 bg-[#FDFBF7] rounded-t-[32px] z-50 flex flex-col px-5 pt-4 pb-8"
        style={{ maxHeight: '75%' }}>
        <div className="w-10 h-1 bg-[rgba(196,181,159,0.35)] rounded-full mb-4 mx-auto" />
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-bold text-[#111]">أهدِ {gift.title}</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-[rgba(196,181,159,0.15)] flex items-center justify-center">
            <X size={14} className="text-[#888]" />
          </button>
        </div>
        <div className="rounded-[18px] p-4 mb-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg,#0D0205,#3D0809)' }}>
          <div className="text-3xl">{gift.icon}</div>
          <div className="flex-1">
            <p className="text-white text-[13px] font-bold">{gift.title}</p>
            <p className="text-white/40 text-[10px] font-light mt-0.5">مجاناً من نقاطك الحالية</p>
          </div>
          <div className="flex items-center gap-1 bg-[rgba(201,149,106,0.15)] px-2.5 py-1.5 rounded-full">
            <Star size={10} className="text-[#7A3B18]" fill="#7A3B18" />
            <span className="text-[#7A3B18] text-[11px] font-bold font-inter">{gift.pts}</span>
          </div>
        </div>
        <p className="text-[11px] font-semibold text-[#888] mb-2.5 tracking-wide">اختر صديقاً من الأعضاء</p>
        <div className="space-y-2 mb-4 overflow-y-auto">
          {friends.map(f => (
            <button key={f} onClick={() => setSelected(f)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-[14px] transition-all"
              style={{ background: selected === f ? 'rgba(160,82,45,0.07)' : 'rgba(196,181,159,0.08)', border: selected === f ? '1.5px solid rgba(160,82,45,0.25)' : '1.5px solid transparent' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[14px]"
                style={{ background: 'linear-gradient(135deg,#F2EAE0,#E8DDD0)' }}>{f[0]}</div>
              <span className="text-[13px] font-medium text-[#111]">{f}</span>
              {selected === f && <Check size={14} className="text-[#6B3210] mr-auto" />}
            </button>
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={selected ? handleSend : undefined}
          className="w-full py-3.5 rounded-[16px] font-semibold text-[14px] transition-all"
          style={{ background: selected ? 'linear-gradient(135deg,#6B3210,#6B3A1F)' : 'rgba(196,181,159,0.2)', color: selected ? '#fff' : '#AAA' }}>
          {selected ? `أرسل الهدية إلى ${selected} 🎁` : 'اختر صديقاً أولاً'}
        </motion.button>
      </motion.div>
    </>
  );
}

/* ── Gifts Section ───────────────────────────────────────────────── */
const giftOptions = [
  { id: 'meal',      icon: '🍽️', title: 'وجبة مجانية', sub: 'من قائمة مطعمك',    pts: 150, color: '#6B3210' },
  { id: 'drink',     icon: '🥤', title: 'مشروب',        sub: 'أي مشروب تختاره',  pts: 60,  color: '#7A3B18' },
  { id: 'points',    icon: '⭐', title: 'نقاط',         sub: 'أرسل ١٠٠ نقطة',   pts: 100, color: '#D4AC0D' },
  { id: 'dessert',   icon: '🎂', title: 'حلى',          sub: 'حلو اليوم مجاناً', pts: 80,  color: '#B5651D' },
];

function GiftsSection({ onGiftSent, currentPoints }: { onGiftSent: (msg: string, pts: number) => void; currentPoints: number }) {
  const [activeGift, setActiveGift] = useState<typeof giftOptions[0] | null>(null);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[7px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#7A3B1822,#7A3B1815)' }}>
            <Gift size={13} className="text-[#7A3B18]" />
          </div>
          <h2 className="text-[13px] font-bold text-[#111]">أهدِ أصدقاءك</h2>
        </div>
        <motion.span key={currentPoints} initial={{ scale: 1.15 }} animate={{ scale: 1 }}
          className="text-[10px] text-[#C4B59F]">
          رصيدك: {currentPoints} نقطة
        </motion.span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {giftOptions.map((g, i) => (
          <motion.button key={g.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 + i * 0.06 }} whileTap={{ scale: 0.94 }}
            onClick={() => setActiveGift(g)} className="rounded-[16px] p-3.5 text-right relative overflow-hidden"
            style={{ background: '#fff', border: `1px solid ${g.color}18`, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <div className="absolute top-0 left-0 w-12 h-12 rounded-full opacity-10 pointer-events-none"
              style={{ background: g.color, transform: 'translate(-30%,-30%)' }} />
            <div className="text-2xl mb-2">{g.icon}</div>
            <p className="text-[12px] font-bold text-[#111] mb-0.5">{g.title}</p>
            <p className="text-[9px] text-[#AAA] font-light mb-2">{g.sub}</p>
            <div className="flex items-center gap-1">
              <Star size={9} fill={g.color} style={{ color: g.color }} />
              <span className="text-[10px] font-bold font-inter" style={{ color: g.color }}>{g.pts} نقطة</span>
            </div>
          </motion.button>
        ))}
      </div>
      <motion.button initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.97 }} onClick={() => setActiveGift(giftOptions[2])}
        className="w-full mt-2.5 flex items-center gap-3 px-4 py-3.5 rounded-[16px] border border-[rgba(201,149,106,0.2)] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
        <div className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg,rgba(201,149,106,0.12),rgba(201,149,106,0.06))' }}>
          <Send size={15} className="text-[#7A3B18]" />
        </div>
        <div className="text-right flex-1">
          <p className="text-[12px] font-bold text-[#111]">أرسل نقاطك لصديق</p>
          <p className="text-[10px] text-[#AAA] font-light">حوّل نقاطك لأصدقائك</p>
        </div>
        <ChevronLeft size={14} className="text-[#CCC]" />
      </motion.button>
      <AnimatePresence>
        {activeGift && (
          <GiftModal gift={activeGift} onClose={() => setActiveGift(null)}
            onSend={() => { const g = activeGift!; setActiveGift(null); onGiftSent(`تم إرسال ${g.title} بنجاح`, g.pts); }} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   REDEEM INVOICE — receipt sheet after redemption
══════════════════════════════════════════════════════════════════ */
function pad(n: number) { return n.toString().padStart(2, '0'); }
function nowAr() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())} · ${d.toLocaleDateString('ar-SA')}`;
}
function invNum() { return `RWD-${Math.floor(10000 + Math.random() * 90000)}`; }
function useCounter(target: number, duration = 1000, delay = 200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return value;
}

const REWARD_CONFETTI = Array.from({ length: 20 }, (_, i) => ({
  x: Math.random() * 100,
  color: ['#C4783A','#30D158','#FFD60A','#AF52DE','#FF6B35','#00C9A7'][i % 6],
  delay: Math.random() * 0.5,
  dur: 0.9 + Math.random() * 0.7,
  size: 4 + Math.random() * 7,
}));

function RedeemInvoiceSheet({
  item, pointsSpent, remainingPoints, onClose,
}: {
  item: typeof REDEEMABLE[0];
  pointsSpent: number;
  remainingPoints: number;
  onClose: () => void;
}) {
  const inv      = React.useMemo(() => invNum(), []);
  const now      = React.useMemo(() => nowAr(), []);
  const ptsCtr   = useCounter(pointsSpent, 1000, 500);
  const remCtr   = useCounter(remainingPoints, 1000, 700);

  return (
    <motion.div
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
      transition={{ type: 'spring', damping: 26, stiffness: 280 }}
      className="absolute inset-0 overflow-y-auto scrollbar-none z-50"
      style={{ background: '#FDFBF7' }}
    >
      {/* ── Success header ── */}
      <div className="relative overflow-hidden text-center py-10 px-5"
        style={{ background: 'linear-gradient(160deg,#040010,#0A001A,#020008)' }}>

        {/* Confetti */}
        {REWARD_CONFETTI.map((c, i) => (
          <motion.div key={i}
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: -130, opacity: 0, scale: 0.4, rotate: Math.random() * 360 }}
            transition={{ duration: c.dur, delay: c.delay, ease: 'easeOut' }}
            className="absolute bottom-0 rounded-sm pointer-events-none"
            style={{ width: c.size, height: c.size, background: c.color, left: `${c.x}%` }}
          />
        ))}

        {/* Ring + checkmark */}
        <div className="relative w-20 h-20 mx-auto mb-5">
          {[0,1,2].map(i => (
            <motion.div key={i}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.5 + i * 0.5, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.1 + i * 0.2, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: '#C4783A' }}
            />
          ))}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 260, delay: 0.05 }}
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg,${item.color},${item.color}CC)`, boxShadow: `0 12px 40px ${item.color}60` }}
          >
            <span className="text-[34px]">{item.emoji}</span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-white text-[22px] font-black mb-1">تم الاستبدال! 🎉
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          className="text-white/40 text-[11px] font-light">{now}
        </motion.p>

        {/* Points spent badge */}
        <motion.div
          initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 18, stiffness: 300, delay: 0.5 }}
          className="inline-flex items-center gap-2 mt-5 px-5 py-3 rounded-[20px]"
          style={{ background: 'rgba(196,120,58,0.2)', border: '1px solid rgba(196,120,58,0.4)', backdropFilter: 'blur(10px)' }}>
          <Star size={14} fill="#C4783A" color="#C4783A" />
          <span className="text-white/60 text-[12px]">خُصم</span>
          <span className="text-[#C4783A] text-[24px] font-black font-inter leading-none">-{ptsCtr}</span>
          <span className="text-white/60 text-[12px]">نقطة</span>
        </motion.div>
      </div>

      {/* ── Invoice card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 340, damping: 28 }}
        className="mx-4 -mt-5 rounded-[24px] overflow-hidden"
        style={{ background: 'white', border: '1px solid rgba(196,181,159,0.2)', boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}>

        {/* Brand row */}
        <div className="flex items-center gap-3 p-5 border-b border-[rgba(196,181,159,0.12)]">
          <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[26px] shrink-0"
            style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}>
            {item.emoji}
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-black text-[#111]">براون دوز</p>
            <p className="text-[10px] text-[#AAA] font-light">إيصال استبدال نقاط · Loyalty</p>
          </div>
          <div className="text-left">
            <p className="text-[9px] font-black text-[#7A3B18]" style={{ fontFamily: 'ui-monospace' }}>{inv}</p>
            <p className="text-[8px] text-[#CCC] font-light">رقم الإيصال</p>
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-0 border-b border-[rgba(196,181,159,0.12)]">
          {[
            { label: 'المكافأة',      val: item.name },
            { label: 'التاريخ والوقت', val: now },
            { label: 'النقاط المُستخدمة', val: `${pointsSpent} نقطة`, color: '#E05A2B' },
            { label: 'الرصيد المتبقي',   val: `${remainingPoints} نقطة`, color: '#30D158' },
          ].map((r, i) => (
            <div key={i} className={`px-4 py-3 ${i % 2 === 0 ? 'border-l border-[rgba(196,181,159,0.1)]' : ''}`}>
              <p className="text-[8.5px] text-[#AAA] font-light mb-0.5">{r.label}</p>
              <p className="text-[11px] font-bold" style={{ color: r.color || '#111' }}>{r.val}</p>
            </div>
          ))}
        </div>

        {/* Item detail */}
        <div className="px-5 py-4 border-b border-[rgba(196,181,159,0.12)]">
          <p className="text-[8.5px] font-black text-[#AAA] tracking-widest mb-3" style={{ fontFamily: 'ui-monospace' }}>المكافأة المستبدلة</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-[20px] shrink-0"
              style={{ background: `${item.color}10` }}>{item.emoji}</div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-[#111]">{item.name}</p>
              <p className="text-[10px] text-[#AAA] font-light">{item.desc}</p>
            </div>
            <div className="text-left">
              <p className="text-[9px] text-[#AAA]">القيمة</p>
              <p className="text-[13px] font-black" style={{ color: item.color }}>{pointsSpent} نقطة</p>
            </div>
          </div>
        </div>

        {/* Remaining balance */}
        <div className="px-5 py-4 border-b border-[rgba(196,181,159,0.12)]">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-[#111]">رصيدك بعد الاستبدال</span>
            <div className="flex items-center gap-1.5">
              <Star size={13} fill="#30D158" color="#30D158" />
              <motion.span key={remCtr} className="text-[22px] font-black text-[#30D158] font-inter leading-none">
                {remCtr}
              </motion.span>
              <span className="text-[11px] text-[#30D158]">نقطة</span>
            </div>
          </div>
        </div>

        {/* Barcode */}
        <div className="px-5 pb-5 pt-4">
          <div className="rounded-[12px] overflow-hidden p-3 flex flex-col items-center gap-1.5"
            style={{ background: 'rgba(196,181,159,0.06)', border: '1px solid rgba(196,181,159,0.15)' }}>
            <div className="flex gap-[1.5px] h-8">
              {Array.from({ length: 52 }).map((_, i) => (
                <div key={i} style={{
                  width: i % 3 === 0 ? 3 : i % 5 === 0 ? 2 : 1,
                  background: '#111',
                  opacity: 0.12 + Math.sin(i * 1.3) * 0.12 + 0.15,
                  borderRadius: 0.5,
                }} />
              ))}
            </div>
            <p className="text-[7.5px] font-mono text-[#AAA] tracking-widest">{inv}</p>
          </div>
          <p className="text-center text-[9px] text-[#CCC] mt-2 font-light">أرِ هذا الإيصال للكاشير لاستلام مكافأتك</p>
        </div>
      </motion.div>

      {/* CTA */}
      <div className="px-4 pt-4 pb-8">
        <motion.button
          whileTap={{ scale: 0.96 }} onClick={onClose}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="w-full py-4 rounded-[18px] font-bold text-[15px] text-white"
          style={{ background: `linear-gradient(135deg,${item.color},${item.color}AA)`, boxShadow: `0 8px 24px ${item.color}35` }}>
          تمام، شكراً {item.emoji}
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   REWARDS — redeemable items with points
══════════════════════════════════════════════════════════════════ */
const REDEEMABLE = [
  { id: 1, emoji: '☕', name: 'قهوة صغيرة',   desc: 'أي إسبريسو أو فلتر مقاس صغير',      pts: 80,  color: '#7A3B18', grad: 'linear-gradient(135deg,#2A0E04,#4A1A08)' },
  { id: 2, emoji: '🧁', name: 'كيك براون دوز', desc: 'الكيكة الشهيرة بنكهة البن',          pts: 120, color: '#B87333', grad: 'linear-gradient(135deg,#1A0E00,#3A2208)' },
  { id: 3, emoji: '🥤', name: 'مشروب بارد',    desc: 'أي مشروب بارد من قائمتنا',           pts: 150, color: '#1A6B3A', grad: 'linear-gradient(135deg,#001A0A,#023818)' },
  { id: 4, emoji: '☕', name: 'قهوة وسط',      desc: 'أي قهوة مقاس وسط من اختيارك',       pts: 180, color: '#7A3B18', grad: 'linear-gradient(135deg,#2A0E04,#4A1A08)' },
  { id: 5, emoji: '🍰', name: 'تشيز كيك',      desc: 'تشيز كيك نيويورك كلاسيك',           pts: 250, color: '#C4783A', grad: 'linear-gradient(135deg,#1A0800,#3A1A04)' },
  { id: 6, emoji: '🛵', name: 'توصيل مجاني',   desc: 'طلب واحد بتوصيل مجاني لأي موقع',    pts: 350, color: '#1A5C8A', grad: 'linear-gradient(135deg,#001018,#012840)' },
  { id: 7, emoji: '🎁', name: 'طلب مجاني',     desc: 'أي طلب حتى ٥٠ ريال — هدية كاملة',   pts: 480, color: '#8B4513', grad: 'linear-gradient(135deg,#0D0200,#2A0A00)' },
  { id: 8, emoji: '👑', name: 'تجربة VIP',     desc: 'جلسة خاصة مع باريستا براون دوز لمدة ساعة', pts: 500, color: '#D4AC0D', grad: 'linear-gradient(135deg,#0A0800,#201800)' },
];

function RewardsTab({ points, onRedeem, onShowInvoice }: {
  points: number;
  onRedeem: (pts: number, name: string) => void;
  onShowInvoice: (item: typeof REDEEMABLE[0], remaining: number) => void;
}) {
  const [redeeming, setRedeeming] = useState<number | null>(null);

  function handleRedeem(item: typeof REDEEMABLE[0]) {
    if (points < item.pts || redeeming !== null) return;
    setRedeeming(item.id);
    setTimeout(() => {
      setRedeeming(null);
      const remaining = points - item.pts;
      onRedeem(item.pts, item.name);
      onShowInvoice(item, remaining);
    }, 1400);
  }

  const available = REDEEMABLE.filter(r => points >= r.pts);
  const locked    = REDEEMABLE.filter(r => points < r.pts);

  return (
    <div className="pb-6">

      {/* ── Section header ── */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,rgba(196,181,159,0.0),rgba(196,181,159,0.3))' }} />
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full"
          style={{ background: 'rgba(107,50,16,0.07)', border: '1px solid rgba(107,50,16,0.12)' }}>
          <Gift size={11} className="text-[#7A3B18]" />
          <span className="text-[11px] font-black text-[#7A3B18] tracking-wide">مكافآتك</span>
        </div>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,rgba(196,181,159,0.3),rgba(196,181,159,0.0))' }} />
      </div>

      {/* ── Available now — dark premium cards ── */}
      {available.length > 0 && (
        <div className="mb-5">
          <p className="text-[10px] font-bold text-[#30D158] tracking-widest mb-2.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] inline-block" />
            متاحة الآن · {available.length} مكافآت
          </p>
          <div className="flex flex-col gap-2.5">
            {available.map((item, i) => {
              const isRedeeming = redeeming === item.id;
              return (
                <motion.div key={item.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="relative overflow-hidden rounded-[20px] p-4 flex items-center gap-3.5"
                  style={{ background: item.grad, border: `1px solid ${item.color}30`, boxShadow: `0 6px 24px ${item.color}18` }}>

                  {/* Subtle shine */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.05) 0%,transparent 50%)' }} />

                  {/* Icon */}
                  <div className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center text-[26px] shrink-0"
                    style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${item.color}40` }}>
                    {item.emoji}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[14px] font-bold leading-tight">{item.name}</p>
                    <p className="text-white/40 text-[10px] font-light mt-0.5 leading-snug">{item.desc}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                        style={{ background: `${item.color}30`, border: `1px solid ${item.color}50` }}>
                        <Star size={8} fill={item.color} color={item.color} />
                        <span className="text-[9px] font-black font-inter" style={{ color: item.color }}>{item.pts}</span>
                        <span className="text-[9px]" style={{ color: item.color }}>نقطة</span>
                      </div>
                      <span className="text-[#30D158] text-[9px] font-bold mr-1">✓ لديك ما يكفي</span>
                    </div>
                  </div>

                  {/* Redeem CTA */}
                  <motion.button
                    whileTap={{ scale: 0.91 }}
                    onClick={() => handleRedeem(item)}
                    disabled={isRedeeming}
                    className="shrink-0 flex items-center justify-center rounded-[13px] font-bold text-[12px]"
                    style={{
                      background: `linear-gradient(135deg,${item.color},${item.color}BB)`,
                      color: 'white',
                      minWidth: 68,
                      height: 38,
                      boxShadow: `0 4px 12px ${item.color}40`,
                    }}>
                    <AnimatePresence mode="wait">
                      {isRedeeming ? (
                        <motion.div key="spin"
                          animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}>
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white" />
                        </motion.div>
                      ) : (
                        <motion.span key="idle">استبدل</motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Locked — light cards with progress bars ── */}
      {locked.length > 0 && (
        <div>
          <p className="text-[10px] font-bold text-[#AAA] tracking-widest mb-2.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCC] inline-block" />
            اجمع المزيد · {locked.length} مكافآت
          </p>
          <div className="flex flex-col gap-2">
            {locked.map((item, i) => {
              const pct     = Math.min((points / item.pts) * 100, 100);
              const missing = item.pts - points;
              return (
                <motion.div key={item.id}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-[18px] p-3.5 flex items-center gap-3"
                  style={{ background: 'rgba(0,0,0,0.025)', border: '1px solid rgba(196,181,159,0.13)' }}>

                  {/* Icon */}
                  <div className="w-[44px] h-[44px] rounded-[13px] flex items-center justify-center text-[20px] shrink-0"
                    style={{ background: 'rgba(196,181,159,0.08)', border: '1px solid rgba(196,181,159,0.12)', filter: 'grayscale(0.4)' }}>
                    {item.emoji}
                  </div>

                  {/* Text + progress */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-[12px] font-bold text-[#555]">{item.name}</p>
                      <span className="text-[9px] font-black font-inter text-[#AAA]">{item.pts} نقطة</span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-[5px] rounded-full overflow-hidden mb-1" style={{ background: 'rgba(196,181,159,0.15)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: i * 0.06, ease: [0.4,0,0.2,1] }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg,${item.color}80,${item.color})` }}
                      />
                    </div>
                    <p className="text-[9px] text-[#BBB]">
                      {points} / {item.pts} · <span style={{ color: '#F0A060' }}>تحتاج {missing} نقطة</span>
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Main Screen
══════════════════════════════════════════════════════════════════ */
export function ScreenMembership({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { brand } = useBrand();
  const [showQR, setShowQR] = useState(false);
  const [showAppleWallet, setShowAppleWallet] = useState(false);
  const [showGWallet, setShowGWallet] = useState(false);
  const [giftToast, setGiftToast] = useState<string | null>(null);
  const [points, setPoints] = useState(480);
  const [redeemInvoice, setRedeemInvoice] = useState<{ item: typeof REDEEMABLE[0]; remaining: number } | null>(null);

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      <AnimatePresence>{showGWallet && <GoogleWalletModal onClose={() => setShowGWallet(false)} />}</AnimatePresence>
      <AnimatePresence>{giftToast && <GiftToast msg={giftToast} onDone={() => setGiftToast(null)} />}</AnimatePresence>
      <AnimatePresence>{showQR && <QRModal onClose={() => setShowQR(false)} />}</AnimatePresence>
      <AnimatePresence>{showAppleWallet && <AppleWalletModal onClose={() => setShowAppleWallet(false)} />}</AnimatePresence>
      <AnimatePresence>
        {redeemInvoice && (
          <RedeemInvoiceSheet
            item={redeemInvoice.item}
            pointsSpent={redeemInvoice.item.pts}
            remainingPoints={redeemInvoice.remaining}
            onClose={() => setRedeemInvoice(null)}
          />
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto scrollbar-none px-5 pt-4 pb-28">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <img src={brand.logoImg} alt={brand.name} className="w-12 h-12 rounded-[16px] object-cover shadow-[0_4px_18px_rgba(160,82,45,0.3)]" />
            <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 bg-[#30D158] rounded-full border-2 border-[#FDFBF7] flex items-center justify-center">
              <Check size={10} strokeWidth={3} className="text-white" />
            </div>
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#111]">عبدالإله علي</p>
            <p className="text-[11px] text-[#C4B59F] font-light">عضوية كلاسيكية · عضو منذ ٢٠٢٤</p>
          </div>
          <div className="mr-auto flex items-center gap-1 px-2.5 py-1.5 rounded-full"
            style={{ background: 'rgba(201,149,106,0.1)', border: '1px solid rgba(201,149,106,0.2)' }}>
            <Sparkles size={10} className="text-[#7A3B18]" />
            <motion.span key={points} initial={{ scale: 1.2 }} animate={{ scale: 1 }}
              className="text-[#7A3B18] text-[10px] font-bold">{points} نقطة</motion.span>
          </div>
        </div>

        {/* Card */}
        <MembershipCard />

        {/* QR button */}
        <motion.button whileTap={{ scale: 0.96 }} onClick={() => setShowQR(true)}
          className="w-full mt-4 py-3.5 rounded-2xl border border-[rgba(160,82,45,0.2)] flex items-center justify-center gap-2.5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <svg viewBox="0 0 20 20" className="w-4 h-4 fill-[#6B3210]">
            <path d="M2 2h6v6H2V2zm1.5 1.5v3h3v-3h-3zm8.5-1.5h6v6h-6V2zm1.5 1.5v3h3v-3h-3zM2 12h6v6H2v-6zm1.5 1.5v3h3v-3h-3zm8-1h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-4-4h2v2h-2v-2zm4-2h2v2h-2v-2z" />
          </svg>
          <span className="text-[13px] font-semibold text-[#6B3210]">عرض رمز QR للمسح</span>
        </motion.button>

        {/* Wallet Buttons */}
        <div className="flex gap-3 mt-3">
          {/* Apple Wallet — official badge style */}
          <motion.button whileTap={{ scale: 0.94 }} onClick={() => setShowAppleWallet(true)}
            className="flex-1 relative overflow-hidden rounded-[14px] shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
            style={{ background: '#000', border: '0.5px solid rgba(255,255,255,0.15)' }}>
            {/* Shine overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(160deg,rgba(255,255,255,0.07) 0%,transparent 50%)' }} />
            <div className="flex items-center justify-center gap-2.5 py-3.5 px-4">
              {/* Official Apple logo */}
              <svg viewBox="0 0 814 1000" className="w-5 h-5 shrink-0" style={{ fill: 'white' }}>
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.8-155.5-108.4C46.6 790.4 1 665.1 1 541.2c0-195.2 127.4-298.1 252.9-298.1 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
              </svg>
              <div className="leading-none text-right">
                <p className="text-white/45 text-[8px] font-light tracking-wide">Add to</p>
                <p className="text-white text-[13px] font-semibold tracking-tight">Apple Wallet</p>
              </div>
            </div>
          </motion.button>

          {/* Google Wallet — Material badge style */}
          <motion.button whileTap={{ scale: 0.94 }} onClick={() => setShowGWallet(true)}
            className="flex-1 relative overflow-hidden rounded-[14px] shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
            style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
            <div className="flex items-center justify-center gap-2.5 py-3.5 px-4">
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <div className="leading-none text-right">
                <p className="text-[#444] text-[8px] font-light tracking-wide">Add to</p>
                <p className="text-[#111] text-[13px] font-semibold tracking-tight">Google Wallet</p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Lock screen note */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-3 flex items-center gap-2.5 px-4 py-3 rounded-[14px]"
          style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(196,181,159,0.15)' }}>
          <span className="text-[16px] shrink-0">🔒</span>
          <p className="text-[11px] text-[#888] font-light leading-snug">
            تظهر بطاقتك تلقائياً على شاشة القفل عند اقترابك من المطعم — بدون فتح التطبيق
          </p>
        </motion.div>

        {/* Gifts */}
        <GiftsSection currentPoints={points} onGiftSent={(msg, pts) => { setGiftToast(msg); setPoints(p => Math.max(0, p - pts)); }} />

        {/* Tier Roadmap */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="mt-4 rounded-[22px] overflow-hidden"
          style={{ background: 'linear-gradient(160deg,#0A0002,#1A0404,#120304)', border: '1px solid rgba(201,149,106,0.12)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-3"
            style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
            <div>
              <p className="text-[7px] font-black tracking-[0.28em] text-[#7A3B18] mb-0.5"
                style={{ fontFamily: 'ui-monospace,monospace' }}>LOYALTY JOURNEY</p>
              <p className="text-white text-[13px] font-bold">رحلة العضوية</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(201,149,106,0.1)', border: '1px solid rgba(201,149,106,0.2)' }}>
              <motion.span key={points} initial={{ scale: 1.2 }} animate={{ scale: 1 }}
                className="text-[#C4783A] text-[11px] font-black font-inter">{points}</motion.span>
              <span className="text-[#7A3B18] text-[8px]">نقطة</span>
            </div>
          </div>

          {/* Tiers */}
          <div className="p-4">
            {[
              { name: 'كلاسيك',  nameEn: 'CLASSIC',  icon: '☕', pts: 0,    color: '#C4783A', active: true,  done: true,  perks: ['نقطة لكل ريال','قهوة مجانية يوم الميلاد'] },
              { name: 'فضي',     nameEn: 'SILVER',   icon: '🥈', pts: 700,  color: '#8E9BAE', active: false, done: false, perks: ['٢ نقطة/ريال','أولوية الطلب','خصم ١٠٪'] },
              { name: 'ذهبي',    nameEn: 'GOLD',     icon: '⭐', pts: 1500, color: '#D4AC0D', active: false, done: false, perks: ['٣ نقاط/ريال','توصيل مجاني','هدايا حصرية'] },
              { name: 'بلاتيني', nameEn: 'PLATINUM', icon: '💎', pts: 3000, color: '#E8E8F0', active: false, done: false, perks: ['٥ نقاط/ريال','VIP مجلس خاص','باريستا شخصي'] },
            ].map((tier, i) => {
              const isActive = tier.active;
              const locked = !tier.done && !isActive;
              const progress = isActive ? (points / 700) * 100 : 0;
              return (
                <div key={tier.nameEn} className="relative">
                  {/* Connector line */}
                  {i < 3 && (
                    <div className="absolute right-[22px] top-[52px] w-0.5 h-6 pointer-events-none"
                      style={{ background: isActive && i === 0
                        ? `linear-gradient(to bottom,${tier.color},rgba(255,255,255,0.08))`
                        : 'rgba(255,255,255,0.06)' }} />
                  )}

                  <motion.div
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.09 }}
                    className={`relative flex items-start gap-3.5 p-3 rounded-[16px] mb-2 ${!locked ? 'cursor-default' : 'opacity-50'}`}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg,${tier.color}18,${tier.color}08)`
                        : 'rgba(255,255,255,0.03)',
                      border: isActive
                        ? `1px solid ${tier.color}35`
                        : '1px solid rgba(255,255,255,0.05)',
                    }}>
                    {/* Icon badge */}
                    <div className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 text-[20px]"
                      style={{
                        background: isActive ? `${tier.color}20` : 'rgba(255,255,255,0.04)',
                        border: isActive ? `1.5px solid ${tier.color}40` : '1px solid rgba(255,255,255,0.06)',
                        boxShadow: isActive ? `0 0 20px ${tier.color}25` : 'none',
                        filter: locked ? 'grayscale(1)' : 'none',
                      }}>
                      {locked ? '🔒' : tier.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <p className="text-white text-[13px] font-bold leading-none">{tier.name}</p>
                          {isActive && (
                            <span className="text-[6px] font-black px-1.5 py-0.5 rounded-full"
                              style={{ background: `${tier.color}25`, color: tier.color, letterSpacing: '0.15em' }}>
                              أنت هنا
                            </span>
                          )}
                        </div>
                        <p className="text-[8px] font-inter"
                          style={{ color: isActive ? tier.color : 'rgba(255,255,255,0.2)' }}>
                          {tier.pts === 0 ? 'مفعّل' : `${tier.pts.toLocaleString()} نقطة`}
                        </p>
                      </div>

                      {/* Perks */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {tier.perks.map((p, pi) => (
                          <span key={pi} className="text-[8px] px-1.5 py-0.5 rounded-full"
                            style={{
                              background: isActive ? `${tier.color}12` : 'rgba(255,255,255,0.04)',
                              color: isActive ? tier.color : 'rgba(255,255,255,0.2)',
                              border: `0.5px solid ${isActive ? tier.color + '25' : 'rgba(255,255,255,0.06)'}`,
                            }}>
                            {p}
                          </span>
                        ))}
                      </div>

                      {/* Progress bar (active tier only) */}
                      {isActive && (
                        <div>
                          <div className="h-1.5 rounded-full overflow-hidden"
                            style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <motion.div
                              initial={{ width: 0 }} animate={{ width: `${Math.min(progress, 100)}%` }}
                              transition={{ duration: 1.4, delay: 0.8, ease: [0.4,0,0.2,1] }}
                              className="h-full rounded-full relative overflow-hidden"
                              style={{ background: `linear-gradient(90deg,${tier.color}88,${tier.color})` }}>
                              <motion.div className="absolute inset-y-0 w-8"
                                initial={{ left: '-2rem' }} animate={{ left: '110%' }}
                                transition={{ duration: 1, delay: 1.5, ease: 'easeInOut' }}
                                style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)' }} />
                            </motion.div>
                          </div>
                          <p className="text-[7px] mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
                            {points} / 700 نقطة للفضي · {Math.max(0, 700 - points)} باقية
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Rewards */}
        <RewardsTab
          points={points}
          onRedeem={(pts, name) => {
            setPoints(p => Math.max(0, p - pts));
            setGiftToast(`تم استبدال ${name} 🎁`);
          }}
          onShowInvoice={(item, remaining) => setRedeemInvoice({ item, remaining })}
        />

      </div>

      {/* Book CTA */}
      <div className="absolute bottom-[72px] left-5 right-5">
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => onNavigate?.('reservations')}
          className="w-full rounded-2xl py-4 flex items-center justify-center gap-3 text-white font-semibold text-[14px] shadow-[0_8px_28px_rgba(160,82,45,0.4)]"
          style={{ background: 'linear-gradient(135deg,#6B3210,#6B3A1F)' }}>
          <span>طاولتك بانتظارك</span>
          <Calendar size={16} className="opacity-80" />
        </motion.button>
      </div>
    </div>
  );
}
