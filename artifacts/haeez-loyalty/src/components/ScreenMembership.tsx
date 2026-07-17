import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Check, Gift, Send, Star, ChevronLeft, X, Sparkles } from 'lucide-react';
import { QRCodeSVG } from './QRCodeSVG';
import { BookingModal } from './BookingModal';

const logoImg = `${import.meta.env.BASE_URL}hyz-logo.jpeg`;

/* ══════════════════════════════════════════════════════════════════
   Membership Card — Apple Wallet Style
══════════════════════════════════════════════════════════════════ */
function MembershipCard() {
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
      {/* ── Card shell ── */}
      <div className="relative w-full rounded-[24px] overflow-hidden"
        style={{
          aspectRatio: '1.586/1',
          background: 'linear-gradient(155deg,#0C0002 0%,#2A0407 30%,#4D0C10 55%,#1C0406 78%,#060001 100%)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 8px 20px rgba(123,22,24,0.3)',
        }}>

        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 10%,rgba(201,149,106,0.18) 0%,transparent 52%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 0% 100%,rgba(123,22,24,0.55) 0%,transparent 48%)' }} />

        {/* Dot grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '12px 12px' }} />

        {/* Geometric circle art (top right) */}
        <div className="absolute pointer-events-none" style={{ right: '-10%', top: '-25%', width: '58%', aspectRatio: '1/1' }}>
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full opacity-[0.06]">
            <circle cx="100" cy="100" r="90" stroke="#C9956A" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="72" stroke="#C9956A" strokeWidth="0.6" />
            <circle cx="100" cy="100" r="54" stroke="#C9956A" strokeWidth="0.5" />
            {Array.from({ length: 20 }).map((_, i) => {
              const a = (i / 20) * 360, r = (a * Math.PI) / 180;
              return <line key={i} x1={100+Math.cos(r)*55} y1={100+Math.sin(r)*55}
                x2={100+Math.cos(r)*88} y2={100+Math.sin(r)*88}
                stroke="#C9956A" strokeWidth="0.35" />;
            })}
            <defs>
              <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9956A" /><stop offset="100%" stopColor="#fff" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Shimmer */}
        <div className="absolute top-0 bottom-0 w-[50%] pointer-events-none z-10"
          style={{
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.035),rgba(201,149,106,0.06),rgba(255,255,255,0.025),transparent)',
            transform: 'skewX(-18deg)',
            animation: 'card-shimmer 5s ease-in-out infinite',
          }} />

        {/* Gold border */}
        <div className="absolute inset-0 rounded-[24px] pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(201,149,106,0.22)' }} />

        {/* ── Content ── */}
        <div className="absolute inset-0 flex flex-col justify-between z-20" style={{ padding: '18px 20px 16px' }}>

          {/* TOP ROW: Apple icon left + حيز branding right */}
          <div className="flex items-start justify-between">

            {/* Apple Wallet mark */}
            <div className="flex flex-col items-start gap-0.5">
              <svg viewBox="0 0 24 24" className="w-6 h-6" style={{ fill: 'rgba(255,255,255,0.55)' }}>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <p className="text-white/18 text-[6px] font-inter tracking-[0.18em] uppercase">Wallet</p>
            </div>

            {/* Haiz branding */}
            <div className="text-right flex flex-col gap-0.5">
              <p className="text-[#C9956A] font-black leading-none tracking-tight" style={{ fontSize: 22 }}>حيز</p>
              <p className="text-white/22 font-inter tracking-[0.2em]" style={{ fontSize: 7 }}>HYZ CAFÉ · ABHA</p>
            </div>
          </div>

          {/* MIDDLE: thin divider + CARDHOLDER block */}
          <div>
            <div className="mb-3" style={{ height: 1, background: 'linear-gradient(90deg,rgba(201,149,106,0.08),rgba(201,149,106,0.22),rgba(201,149,106,0.08))' }} />
            <p className="text-white/22 font-inter tracking-[0.22em] mb-1" style={{ fontSize: 7 }}>CARDHOLDER</p>
            <p className="text-white font-bold tracking-wide leading-none" style={{ fontSize: 16 }}>عبدالإله علي</p>
          </div>

          {/* BOTTOM: points left, level right, ID below */}
          <div>
            <div className="flex items-end justify-between">
              {/* Points */}
              <div>
                <p className="text-white/22 font-inter tracking-[0.22em] mb-1" style={{ fontSize: 7 }}>POINTS</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-white font-black font-inter leading-none" style={{ fontSize: 26 }}>480</span>
                  <span className="text-white/35 font-inter mb-0.5" style={{ fontSize: 9 }}>PTS</span>
                </div>
                {/* 7-bar progress */}
                <div className="flex items-center gap-[3px] mt-1.5">
                  {[0,1,2,3,4,5,6].map(i => (
                    <div key={i} style={{
                      width: 13, height: 2.5, borderRadius: 99,
                      background: i < 4
                        ? 'linear-gradient(90deg,#C9956A,#E8C48A)'
                        : 'rgba(255,255,255,0.1)',
                    }} />
                  ))}
                </div>
                <p className="text-white/18 font-inter mt-1" style={{ fontSize: 7 }}>٤ من ٧ للمستوى الفضي</p>
              </div>

              {/* Level + ID */}
              <div className="text-right flex flex-col items-end gap-1">
                <div>
                  <p className="text-white/22 font-inter tracking-[0.22em] mb-1" style={{ fontSize: 7 }}>LEVEL</p>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(201,149,106,0.12)', border: '1px solid rgba(201,149,106,0.25)' }}>
                    <Sparkles size={8} className="text-[#C9956A]" />
                    <span className="text-[#C9956A] font-bold" style={{ fontSize: 10 }}>كلاسيك</span>
                  </div>
                </div>
                <p className="text-white/12 font-inter tracking-widest" style={{ fontSize: 7 }}>#HC-2024-8821</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom edge glow */}
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
            style={{ background: 'linear-gradient(90deg,transparent,#7B1618,#C9956A,#7B1618,transparent)', boxShadow: '0 0 8px rgba(123,22,24,0.7)' }}
            initial={{ top: '16px' }}
            animate={{ top: ['16px', 'calc(100% - 16px)', '16px'] }}
            transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.8 }}
          />
        </div>
        <p className="text-[11px] text-[#AAA] mt-4 font-inter tracking-widest">#HC-2024-8821</p>
        <div className="flex-1" />
        <button onClick={onClose} className="w-full py-4 rounded-[16px] bg-[#111] text-white font-semibold text-[14px] active:scale-95 transition-transform">إغلاق</button>
      </motion.div>
    </>
  );
}

/* ── Wallet toast ────────────────────────────────────────────────── */
function WalletToast({ type, onDone }: { type: 'apple' | 'google'; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 0, y: -28, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.9 }}
      transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      className="absolute top-3 left-5 right-5 bg-[#1C1C1E] text-white rounded-2xl p-3.5 flex items-center gap-3 z-50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="w-8 h-8 bg-[#30D158] rounded-full flex items-center justify-center shrink-0">
        <Check size={14} strokeWidth={3} className="text-white" />
      </div>
      <div>
        <p className="text-[12px] font-semibold">{type === 'apple' ? 'تمت الإضافة إلى Apple Wallet' : 'تمت الإضافة إلى Google Wallet'}</p>
        <p className="text-[10px] text-white/50 font-light mt-0.5">بطاقتك متاحة حتى بدون إنترنت</p>
      </div>
    </motion.div>
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
        style={{ background: 'linear-gradient(135deg,#C9956A,#8A5A28)' }}>
        <Gift size={14} strokeWidth={2.5} className="text-white" />
      </div>
      <div>
        <p className="text-[12px] font-semibold">{msg}</p>
        <p className="text-[10px] text-white/50 font-light mt-0.5">سيصله إشعار فوري من حيز 🎁</p>
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
            <Star size={10} className="text-[#C9956A]" fill="#C9956A" />
            <span className="text-[#C9956A] text-[11px] font-bold font-inter">{gift.pts}</span>
          </div>
        </div>
        <p className="text-[11px] font-semibold text-[#888] mb-2.5 tracking-wide">اختر صديقاً من مجتمع حيز</p>
        <div className="space-y-2 mb-4 overflow-y-auto">
          {friends.map(f => (
            <button key={f} onClick={() => setSelected(f)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-[14px] transition-all"
              style={{ background: selected === f ? 'rgba(123,22,24,0.07)' : 'rgba(196,181,159,0.08)', border: selected === f ? '1.5px solid rgba(123,22,24,0.25)' : '1.5px solid transparent' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[14px]"
                style={{ background: 'linear-gradient(135deg,#F2EAE0,#E8DDD0)' }}>{f[0]}</div>
              <span className="text-[13px] font-medium text-[#111]">{f}</span>
              {selected === f && <Check size={14} className="text-[#7B1618] mr-auto" />}
            </button>
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={selected ? handleSend : undefined}
          className="w-full py-3.5 rounded-[16px] font-semibold text-[14px] transition-all"
          style={{ background: selected ? 'linear-gradient(135deg,#7B1618,#4A0D0F)' : 'rgba(196,181,159,0.2)', color: selected ? '#fff' : '#AAA' }}>
          {selected ? `أرسل الهدية إلى ${selected} 🎁` : 'اختر صديقاً أولاً'}
        </motion.button>
      </motion.div>
    </>
  );
}

/* ── Gifts Section ───────────────────────────────────────────────── */
const giftOptions = [
  { id: 'coffee',    icon: '☕', title: 'كوب قهوة',    sub: 'قهوة اليوم مجاناً',   pts: 80,  color: '#7B1618' },
  { id: 'croissant', icon: '🥐', title: 'كرواسون',     sub: 'من مخبوزات حيز',      pts: 60,  color: '#C9956A' },
  { id: 'points',    icon: '⭐', title: 'نقاط',        sub: 'أرسل ١٠٠ نقطة',      pts: 100, color: '#D4AC0D' },
  { id: 'latte',     icon: '🥛', title: 'لاتيه حيز',   sub: 'الخلطة الحصرية',      pts: 120, color: '#B5651D' },
];

function GiftsSection({ onGiftSent }: { onGiftSent: (msg: string) => void }) {
  const [activeGift, setActiveGift] = useState<typeof giftOptions[0] | null>(null);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[7px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#C9956A22,#C9956A15)' }}>
            <Gift size={13} className="text-[#C9956A]" />
          </div>
          <h2 className="text-[13px] font-bold text-[#111]">أهدِ أصدقاءك</h2>
        </div>
        <span className="text-[10px] text-[#C4B59F]">رصيدك: ٤٨٠ نقطة</span>
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
          <Send size={15} className="text-[#C9956A]" />
        </div>
        <div className="text-right flex-1">
          <p className="text-[12px] font-bold text-[#111]">أرسل نقاطك لصديق</p>
          <p className="text-[10px] text-[#AAA] font-light">حوّل نقاطك لأصدقائك في حيز</p>
        </div>
        <ChevronLeft size={14} className="text-[#CCC]" />
      </motion.button>
      <AnimatePresence>
        {activeGift && (
          <GiftModal gift={activeGift} onClose={() => setActiveGift(null)}
            onSend={() => { setActiveGift(null); onGiftSent(`تم إرسال ${activeGift.title} بنجاح`); }} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Main Screen
══════════════════════════════════════════════════════════════════ */
export function ScreenMembership() {
  const [showQR, setShowQR] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [walletToast, setWalletToast] = useState<'apple' | 'google' | null>(null);
  const [giftToast, setGiftToast] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full relative">
      <AnimatePresence>{walletToast && <WalletToast type={walletToast} onDone={() => setWalletToast(null)} />}</AnimatePresence>
      <AnimatePresence>{giftToast && <GiftToast msg={giftToast} onDone={() => setGiftToast(null)} />}</AnimatePresence>
      <AnimatePresence>{showQR && <QRModal onClose={() => setShowQR(false)} />}</AnimatePresence>

      <div className="flex-1 overflow-y-auto scrollbar-none px-5 pt-4 pb-28">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <img src={logoImg} alt="حيز" className="w-12 h-12 rounded-[16px] object-cover shadow-[0_4px_18px_rgba(123,22,24,0.3)]" />
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
            <Sparkles size={10} className="text-[#C9956A]" />
            <span className="text-[#C9956A] text-[10px] font-bold">٤٨٠ نقطة</span>
          </div>
        </div>

        {/* ── Premium Card ── */}
        <MembershipCard />

        {/* QR button */}
        <motion.button whileTap={{ scale: 0.96 }} onClick={() => setShowQR(true)}
          className="w-full mt-4 py-3.5 rounded-2xl border border-[rgba(123,22,24,0.2)] flex items-center justify-center gap-2.5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <svg viewBox="0 0 20 20" className="w-4 h-4 fill-[#7B1618]">
            <path d="M2 2h6v6H2V2zm1.5 1.5v3h3v-3h-3zm8.5-1.5h6v6h-6V2zm1.5 1.5v3h3v-3h-3zM2 12h6v6H2v-6zm1.5 1.5v3h3v-3h-3zm8-1h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-4-4h2v2h-2v-2zm4-2h2v2h-2v-2z" />
          </svg>
          <span className="text-[13px] font-semibold text-[#7B1618]">عرض رمز QR للمسح</span>
        </motion.button>

        {/* Wallet Buttons */}
        <div className="flex gap-3 mt-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setWalletToast('apple')}
            className="flex-1 flex items-center justify-center gap-2 bg-[#111] text-white rounded-2xl py-3.5 shadow-[0_4px_18px_rgba(0,0,0,0.25)]">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="leading-tight text-right">
              <p className="text-[8px] text-white/40">أضف إلى</p>
              <p className="text-[12px] font-semibold">Apple Wallet</p>
            </div>
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setWalletToast('google')}
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

        {/* Gifts Section */}
        <GiftsSection onGiftSent={(msg) => setGiftToast(msg)} />

        {/* Progress Section */}
        <div className="mt-4 bg-white rounded-[18px] p-4 border border-[rgba(196,181,159,0.15)] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-1.5">
            <h2 className="text-[13px] font-semibold text-[#111]">تقدمك نحو الفضي</h2>
            <span className="text-[11px] font-bold text-[#C9956A]">٤ / ٧</span>
          </div>
          <p className="text-[10px] text-[#AAA] mb-3 font-light">٣ أكواب أخرى وتنتقل للمستوى الفضي 🎯</p>
          <div className="flex items-center gap-1.5 w-full">
            {Array.from({ length: 7 }).map((_, i) => {
              const filled = i < 4;
              return (
                <React.Fragment key={i}>
                  <motion.div
                    animate={{ scale: filled ? [1, 1.15, 1] : 1 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className={`relative flex items-center justify-center rounded-full transition-all ${filled ? 'w-7 h-7' : 'w-6 h-6'}`}
                    style={{ background: filled ? 'linear-gradient(135deg,#7B1618,#4A0D0F)' : 'rgba(196,181,159,0.15)' }}>
                    <svg viewBox="0 0 24 24" className={`${filled ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} fill="none"
                      stroke={filled ? 'rgba(201,149,106,0.8)' : 'rgba(196,181,159,0.35)'} strokeWidth={1.5} strokeLinecap="round">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z M6 1v3M10 1v3M14 1v3" />
                    </svg>
                  </motion.div>
                  {i < 6 && <div className={`flex-1 h-0.5 rounded-full ${i < 3 ? 'bg-gradient-to-r from-[#7B1618] to-[#C9956A]' : 'bg-[rgba(196,181,159,0.2)]'}`} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Book CTA */}
      <div className="absolute bottom-[72px] left-5 right-5">
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowBooking(true)}
          className="w-full rounded-2xl py-4 flex items-center justify-center gap-3 text-white font-semibold text-[14px] shadow-[0_8px_28px_rgba(123,22,24,0.4)]"
          style={{ background: 'linear-gradient(135deg,#7B1618,#4A0D0F)' }}>
          <span>طاولتك بانتظارك</span>
          <Calendar size={16} className="opacity-80" />
        </motion.button>
      </div>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
}
