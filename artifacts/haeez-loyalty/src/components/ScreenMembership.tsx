import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Check, Gift, Send, Star, ChevronLeft, X, Sparkles } from 'lucide-react';
import { QRCodeSVG } from './QRCodeSVG';
import { BookingModal } from './BookingModal';
import { useBrand } from '../BrandContext';

/* ══════════════════════════════════════════════════════════════════
   Membership Card — Apple Wallet Style
══════════════════════════════════════════════════════════════════ */
function MembershipCard() {
  const { brand } = useBrand();
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="relative w-full select-none"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.03}
    >
      <div className="relative w-full rounded-[24px] overflow-hidden"
        style={{
          aspectRatio: '1.586/1',
          background: 'linear-gradient(155deg,#0C0002 0%,#2A0407 30%,#4D0C10 55%,#1C0406 78%,#060001 100%)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 8px 20px rgba(160,82,45,0.3)',
        }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 10%,rgba(201,149,106,0.18) 0%,transparent 52%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 0% 100%,rgba(160,82,45,0.55) 0%,transparent 48%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '12px 12px' }} />
        <div className="absolute pointer-events-none" style={{ right: '-10%', top: '-25%', width: '58%', aspectRatio: '1/1' }}>
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full opacity-[0.06]">
            <circle cx="100" cy="100" r="90" stroke="#7A3B18" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="72" stroke="#7A3B18" strokeWidth="0.6" />
            <circle cx="100" cy="100" r="54" stroke="#7A3B18" strokeWidth="0.5" />
            {Array.from({ length: 20 }).map((_, i) => {
              const a = (i / 20) * 360, r = (a * Math.PI) / 180;
              return <line key={i} x1={100+Math.cos(r)*55} y1={100+Math.sin(r)*55}
                x2={100+Math.cos(r)*88} y2={100+Math.sin(r)*88}
                stroke="#7A3B18" strokeWidth="0.35" />;
            })}
          </svg>
        </div>
        <div className="absolute top-0 bottom-0 w-[50%] pointer-events-none z-10"
          style={{
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.035),rgba(201,149,106,0.06),rgba(255,255,255,0.025),transparent)',
            transform: 'skewX(-18deg)',
            animation: 'card-shimmer 5s ease-in-out infinite',
          }} />
        <div className="absolute inset-0 rounded-[24px] pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(201,149,106,0.22)' }} />

        <div className="absolute inset-0 flex flex-col justify-between z-20" style={{ padding: '18px 20px 16px' }}>
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start gap-0.5">
              <svg viewBox="0 0 24 24" className="w-6 h-6" style={{ fill: 'rgba(255,255,255,0.55)' }}>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <p className="text-white/18 text-[6px] font-inter tracking-[0.18em] uppercase">Wallet</p>
            </div>
            <div className="text-right flex flex-col gap-0.5">
              <p className="text-[#7A3B18] font-black leading-none tracking-tight" style={{ fontSize: 20 }}>{brand.memberCard.label}</p>
              <p className="text-white/22 font-inter tracking-[0.15em]" style={{ fontSize: 7 }}>{brand.type === 'cafe' ? 'YOUR CAFÉ · KSA' : 'YOUR RESTAURANT · KSA'}</p>
            </div>
          </div>
          <div>
            <div className="mb-3" style={{ height: 1, background: 'linear-gradient(90deg,rgba(201,149,106,0.08),rgba(201,149,106,0.22),rgba(201,149,106,0.08))' }} />
            <p className="text-white/22 font-inter tracking-[0.22em] mb-1" style={{ fontSize: 7 }}>CARDHOLDER</p>
            <p className="text-white font-bold tracking-wide leading-none" style={{ fontSize: 16 }}>عبدالإله علي</p>
          </div>
          <div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/22 font-inter tracking-[0.22em] mb-1" style={{ fontSize: 7 }}>POINTS</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-white font-black font-inter leading-none" style={{ fontSize: 26 }}>480</span>
                  <span className="text-white/35 font-inter mb-0.5" style={{ fontSize: 9 }}>PTS</span>
                </div>
                <div className="flex items-center gap-[3px] mt-1.5">
                  {[0,1,2,3,4,5,6].map(i => (
                    <div key={i} style={{
                      width: 13, height: 2.5, borderRadius: 99,
                      background: i < 4 ? 'linear-gradient(90deg,#7A3B18,#E8C48A)' : 'rgba(255,255,255,0.1)',
                    }} />
                  ))}
                </div>
                <p className="text-white/18 font-inter mt-1" style={{ fontSize: 7 }}>٤ من ٧ للمستوى الفضي</p>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <div>
                  <p className="text-white/22 font-inter tracking-[0.22em] mb-1" style={{ fontSize: 7 }}>LEVEL</p>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(201,149,106,0.12)', border: '1px solid rgba(201,149,106,0.25)' }}>
                    <Sparkles size={8} className="text-[#7A3B18]" />
                    <span className="text-[#7A3B18] font-bold" style={{ fontSize: 10 }}>كلاسيك</span>
                  </div>
                </div>
                <p className="text-white/12 font-inter tracking-widest" style={{ fontSize: 7 }}>#MR-2024-8821</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,149,106,0.28),transparent)' }} />
      </div>
    </motion.div>
  );
}

/* ── QR Modal ────────────────────────────────────────────────────── */
function QRModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
        onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-md z-50 rounded-[48px]" />
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 320 }}
        className="absolute bottom-0 left-0 right-0 h-[66%] bg-[#FDFBF7] rounded-t-[32px] z-50 flex flex-col items-center px-6 pt-4 pb-6">
        <div className="w-10 h-1 bg-[rgba(196,181,159,0.35)] rounded-full mb-5" />
        <h3 className="text-[18px] font-bold text-[#111] mb-1">رمز عضويتك</h3>
        <p className="text-[12px] text-[#888] font-light mb-5">اضغط رمز QR عند الصندوق · ١٥ نقطة لكل طلب</p>
        <div className="relative bg-white p-4 rounded-[20px] border border-[rgba(196,181,159,0.2)] shadow-[0_8px_32px_rgba(0,0,0,0.07)]">
          <QRCodeSVG />
          <motion.div
            className="absolute left-4 right-4 h-0.5 rounded-full pointer-events-none"
            style={{ background: 'linear-gradient(90deg,transparent,#6B3210,#7A3B18,#6B3210,transparent)', boxShadow: '0 0 8px rgba(160,82,45,0.7)' }}
            initial={{ top: '16px' }}
            animate={{ top: ['16px', 'calc(100% - 16px)', '16px'] }}
            transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.8 }}
          />
        </div>
        <p className="text-[11px] text-[#AAA] mt-4 font-inter tracking-widest">#MR-2024-8821</p>
        <div className="flex-1" />
        <button onClick={onClose} className="w-full py-4 rounded-[16px] bg-[#111] text-white font-semibold text-[14px] active:scale-95 transition-transform">إغلاق</button>
      </motion.div>
    </>
  );
}

/* ── Apple Wallet Pass modal ─────────────────────────────────────── */
function AppleWalletModal({ onClose }: { onClose: () => void }) {
  const { brand } = useBrand();
  const [phase, setPhase] = useState<'adding' | 'done'>('adding');

  useEffect(() => {
    const t = setTimeout(() => setPhase('done'), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={phase === 'done' ? onClose : undefined}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl z-50 rounded-[48px]" />

      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        exit={{ y: '110%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 z-50 bg-[#1C1C1E] rounded-t-[36px] overflow-hidden"
        style={{ maxHeight: '88%' }}
      >
        {/* iOS-style header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/8">
          <button onClick={onClose} className="text-[14px] text-[#007AFF] font-medium">إغلاق</button>
          <p className="text-white text-[14px] font-semibold">Apple Wallet</p>
          <div className="w-10" />
        </div>

        <div className="px-5 pt-6 pb-8 flex flex-col items-center gap-5">
          {/* Wallet pass preview */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 22 }}
            className="w-full rounded-[24px] overflow-hidden relative"
            style={{
              background: 'linear-gradient(150deg,#0C0002,#2A0407,#4D0C10,#1C0406)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,149,106,0.2)',
              aspectRatio: '1.586/1',
            }}
          >
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 10%,rgba(201,149,106,0.2) 0%,transparent 52%)' }} />
            <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ fill: 'rgba(255,255,255,0.6)' }}>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="text-white/30 text-[8px] font-inter tracking-[0.2em]">WALLET</span>
                </div>
                <p className="text-[#7A3B18] font-black text-[18px]">{brand.memberCard.label}</p>
              </div>
              {/* Bottom */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/25 text-[7px] font-inter tracking-widest">POINTS</p>
                  <p className="text-white font-black font-inter text-[28px] leading-none">480</p>
                  <div className="flex gap-[3px] mt-1.5">
                    {[0,1,2,3,4,5,6].map(i => (
                      <div key={i} className="h-[3px] rounded-full" style={{ width: 14, background: i < 4 ? 'linear-gradient(90deg,#7A3B18,#E8C48A)' : 'rgba(255,255,255,0.12)' }} />
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/25 text-[7px] font-inter tracking-widest">CARDHOLDER</p>
                  <p className="text-white font-bold text-[13px]">عبدالإله علي</p>
                  <div className="flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full justify-end" style={{ background: 'rgba(201,149,106,0.15)' }}>
                    <Sparkles size={8} className="text-[#7A3B18]" />
                    <span className="text-[#7A3B18] text-[9px] font-bold">كلاسيك</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Status */}
          <AnimatePresence mode="wait">
            {phase === 'adding' ? (
              <motion.div key="adding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white"
                  />
                  <p className="text-white/60 text-[13px]">جاري الإضافة إلى Apple Wallet...</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-14 h-14 bg-[#30D158] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(48,209,88,0.5)]">
                  <Check size={24} strokeWidth={3} className="text-white" />
                </motion.div>
                <div className="text-center">
                  <p className="text-white text-[16px] font-semibold">تمت الإضافة!</p>
                  <p className="text-white/40 text-[12px] font-light mt-1">بطاقتك متاحة على شاشة القفل حتى بدون إنترنت</p>
                </div>
                <div className="flex items-center gap-2 mt-1 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span className="text-[12px]">🔒</span>
                  <p className="text-white/50 text-[11px]">تظهر تلقائياً عند اقترابك من المطعم</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {phase === 'done' && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={onClose}
              className="w-full py-4 rounded-[16px] bg-[#007AFF] text-white font-semibold text-[15px] active:scale-95 transition-transform">
              تم
            </motion.button>
          )}
        </div>
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
   Main Screen
══════════════════════════════════════════════════════════════════ */
export function ScreenMembership() {
  const { brand } = useBrand();
  const [showQR, setShowQR] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showAppleWallet, setShowAppleWallet] = useState(false);
  const [showGWallet, setShowGWallet] = useState(false);
  const [giftToast, setGiftToast] = useState<string | null>(null);
  const [points, setPoints] = useState(480);

  return (
    <div className="flex flex-col h-full relative">
      <AnimatePresence>{showGWallet && <GoogleWalletModal onClose={() => setShowGWallet(false)} />}</AnimatePresence>
      <AnimatePresence>{giftToast && <GiftToast msg={giftToast} onDone={() => setGiftToast(null)} />}</AnimatePresence>
      <AnimatePresence>{showQR && <QRModal onClose={() => setShowQR(false)} />}</AnimatePresence>
      <AnimatePresence>{showAppleWallet && <AppleWalletModal onClose={() => setShowAppleWallet(false)} />}</AnimatePresence>

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
          {/* Apple Wallet — full experience */}
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowAppleWallet(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-[#111] text-white rounded-2xl py-3.5 shadow-[0_4px_18px_rgba(0,0,0,0.25)]">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="leading-tight text-right">
              <p className="text-[8px] text-white/40">أضف إلى</p>
              <p className="text-[12px] font-semibold">Apple Wallet</p>
            </div>
          </motion.button>

          {/* Google Wallet */}
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowGWallet(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-[rgba(196,181,159,0.3)] text-[#111] rounded-2xl py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <div className="leading-tight text-right">
              <p className="text-[8px] text-[#888]">أضف إلى</p>
              <p className="text-[12px] font-semibold text-[#111]">Google Wallet</p>
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

        {/* Progress */}
        <div className="mt-4 bg-white rounded-[18px] p-4 border border-[rgba(196,181,159,0.15)] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-1.5">
            <h2 className="text-[13px] font-semibold text-[#111]">تقدمك نحو الفضي</h2>
            <span className="text-[11px] font-bold text-[#7A3B18]">٤ / ٧</span>
          </div>
          <p className="text-[10px] text-[#AAA] mb-3 font-light">٣ طلبات أخرى وتنتقل للمستوى الفضي 🎯</p>
          <div className="flex items-center gap-1.5 w-full">
            {Array.from({ length: 7 }).map((_, i) => {
              const filled = i < 4;
              return (
                <React.Fragment key={i}>
                  <motion.div
                    animate={{ scale: filled ? [1, 1.15, 1] : 1 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className={`relative flex items-center justify-center rounded-full transition-all ${filled ? 'w-7 h-7' : 'w-6 h-6'}`}
                    style={{ background: filled ? 'linear-gradient(135deg,#6B3210,#6B3A1F)' : 'rgba(196,181,159,0.15)' }}>
                    <svg viewBox="0 0 24 24" className={`${filled ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} fill="none"
                      stroke={filled ? 'rgba(201,149,106,0.8)' : 'rgba(196,181,159,0.35)'} strokeWidth={1.5} strokeLinecap="round">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                    </svg>
                  </motion.div>
                  {i < 6 && <div className={`flex-1 h-0.5 rounded-full ${i < 3 ? 'bg-gradient-to-r from-[#6B3210] to-[#7A3B18]' : 'bg-[rgba(196,181,159,0.2)]'}`} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Book CTA */}
      <div className="absolute bottom-[72px] left-5 right-5">
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowBooking(true)}
          className="w-full rounded-2xl py-4 flex items-center justify-center gap-3 text-white font-semibold text-[14px] shadow-[0_8px_28px_rgba(160,82,45,0.4)]"
          style={{ background: 'linear-gradient(135deg,#6B3210,#6B3A1F)' }}>
          <span>طاولتك بانتظارك</span>
          <Calendar size={16} className="opacity-80" />
        </motion.button>
      </div>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
}
