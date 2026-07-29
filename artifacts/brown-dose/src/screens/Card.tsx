import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Percent, Coffee, Star, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';

/* ── Apple Wallet Pass — realistic premium design ── */
function WalletPass({ businessName, userName, points }: { businessName: string; userName: string; points: number }) {
  const initials = businessName.split(' ').map(w => w[0]).join('').slice(0, 2);
  const tier = points >= 500 ? 'Platinum' : points >= 300 ? 'Gold' : 'Silver';
  const tierColor = tier === 'Platinum' ? '#E8D5FF' : tier === 'Gold' ? '#FFD875' : '#C8D8E8';
  const tierBg = tier === 'Platinum' ? 'rgba(139,92,246,0.35)' : tier === 'Gold' ? 'rgba(245,158,11,0.35)' : 'rgba(148,163,184,0.25)';

  return (
    <div style={{
      width: '100%',
      aspectRatio: '1.586',
      borderRadius: 20,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)',
      fontFamily: '-apple-system, "SF Pro Display", "Noto Kufi Arabic", sans-serif',
    }}>
      {/* Background gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a30 40%, #0d1a2e 100%)',
      }} />

      {/* Shimmer overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
      }} />

      {/* Top glow */}
      <div style={{
        position: 'absolute', top: -60, right: -40,
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', bottom: -40, left: -30,
        width: 160, height: 160, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
      }} />

      {/* Noise texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay',
      }} />

      {/* Card content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '20px 22px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', direction: 'rtl' }}>

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* Logo + Business name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, #C4783A, #8B5E2A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em',
              boxShadow: '0 4px 12px rgba(196,120,58,0.4)',
              flexShrink: 0,
            }}>
              {initials}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                {businessName}
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', marginTop: 2 }}>
                LOYALTY CARD
              </div>
            </div>
          </div>

          {/* Tier badge */}
          <div style={{
            padding: '4px 10px', borderRadius: 99,
            background: tierBg,
            border: `1px solid ${tierColor}40`,
            fontSize: 10, fontWeight: 700, color: tierColor,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <Star size={8} fill={tierColor} color={tierColor} />
            {tier}
          </div>
        </div>

        {/* Points — center hero */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: 52, fontWeight: 900, color: '#fff',
            letterSpacing: '-0.05em', lineHeight: 1,
            textShadow: '0 0 40px rgba(139,92,246,0.5)',
          }}>
            {points.toLocaleString('ar-SA')}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, letterSpacing: '0.06em' }}>
            POINTS BALANCE
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', marginBottom: 3 }}>
              MEMBER NAME
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
              {userName}
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
              عضو منذ يناير ٢٠٢٥
            </div>
          </div>

          {/* Decorative QR */}
          <div style={{
            width: 44, height: 44,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="1" y="1" width="10" height="10" rx="2" fill="rgba(255,255,255,0.7)" />
              <rect x="3" y="3" width="6" height="6" rx="1" fill="rgba(0,0,0,0.6)" />
              <rect x="17" y="1" width="10" height="10" rx="2" fill="rgba(255,255,255,0.7)" />
              <rect x="19" y="3" width="6" height="6" rx="1" fill="rgba(0,0,0,0.6)" />
              <rect x="1" y="17" width="10" height="10" rx="2" fill="rgba(255,255,255,0.7)" />
              <rect x="3" y="19" width="6" height="6" rx="1" fill="rgba(0,0,0,0.6)" />
              <rect x="13" y="13" width="3" height="3" rx="0.5" fill="rgba(255,255,255,0.6)" />
              <rect x="18" y="13" width="3" height="3" rx="0.5" fill="rgba(255,255,255,0.6)" />
              <rect x="23" y="13" width="4" height="3" rx="0.5" fill="rgba(255,255,255,0.6)" />
              <rect x="13" y="18" width="3" height="3" rx="0.5" fill="rgba(255,255,255,0.6)" />
              <rect x="18" y="18" width="8" height="3" rx="0.5" fill="rgba(255,255,255,0.6)" />
              <rect x="13" y="23" width="8" height="4" rx="0.5" fill="rgba(255,255,255,0.6)" />
              <rect x="23" y="23" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.6)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom stripe accent */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, #C4783A, #8B5E2A, #C4956A)',
      }} />
    </div>
  );
}

/* ── Apple Wallet Add Button ── */
function WalletButton() {
  return (
    <div style={{
      width: '100%',
      background: '#000',
      border: '1px solid rgba(255,255,255,0.14)',
      borderRadius: 16,
      padding: '14px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      cursor: 'pointer',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    }}>
      {/* Apple logo SVG */}
      <svg width="17" height="20" viewBox="0 0 17 20" fill="white">
        <path d="M13.79 10.68c-.02-2.27 1.86-3.37 1.94-3.43-1.06-1.54-2.7-1.75-3.28-1.77-1.4-.14-2.73.82-3.44.82-.71 0-1.81-.8-2.97-.78C4.46 5.54 2.9 6.6 2.04 8.17c-1.74 3.02-.45 7.5 1.25 9.95.83 1.2 1.82 2.54 3.12 2.49 1.25-.05 1.73-.81 3.24-.81 1.51 0 1.94.81 3.27.79 1.35-.02 2.2-1.22 3.02-2.42.95-1.38 1.34-2.72 1.37-2.79-.03-.02-2.63-1.01-2.66-3.7zM11.55 3.5C12.23 2.68 12.69 1.56 12.56.42c-.96.04-2.13.64-2.82 1.45-.62.72-1.16 1.87-1.01 2.97 1.06.08 2.15-.54 2.82-1.34z" />
      </svg>
      <span style={{ color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: '-apple-system, sans-serif' }}>
        Add to Apple Wallet
      </span>
    </div>
  );
}

export function CardScreen() {
  const { points, businessName, userName } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-background pt-12 px-5 pb-32 overflow-y-auto hide-scrollbar"
    >
      <h1 className="text-2xl font-bold mb-6">بطاقتي</h1>

      {/* Apple Wallet Pass */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4"
      >
        <WalletPass businessName={businessName} userName={userName} points={points} />
      </motion.div>

      {/* Add to Wallet button */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.45 }}
        className="mb-8"
      >
        <WalletButton />
      </motion.div>

      {/* Progress to next reward */}
      <div className="bg-card rounded-2xl p-4 mb-6 border border-card-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium flex items-center gap-1.5">
            <Zap size={14} className="text-secondary" />
            التقدم نحو المكافأة القادمة
          </span>
          <span className="text-xs text-muted-foreground">{points}/500</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((points / 500) * 100, 100)}%` }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          باقي {Math.max(0, 500 - points)} نقطة للمكافأة الذهبية ✦
        </p>
      </div>

      {/* Rewards */}
      <h3 className="text-lg font-bold mb-4">المكافآت المتاحة</h3>
      <div className="flex flex-col gap-3">
        <div className="bg-card rounded-2xl p-4 flex items-center gap-4 border border-card-border opacity-50 grayscale">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <Coffee size={20} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm">مشروب مجاني</div>
            <div className="text-xs text-muted-foreground">استُخدم • ٢٠٠ نقطة</div>
          </div>
          <button disabled className="text-xs bg-muted text-muted-foreground px-4 py-2 rounded-full font-medium">مستخدم</button>
        </div>

        <div className="bg-card rounded-2xl p-4 flex items-center gap-4 border border-card-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 bg-secondary h-full" />
          <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
            <Percent size={20} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm text-secondary">خصم ٣٠٪</div>
            <div className="text-xs text-muted-foreground">متاح الآن • ٤٠٠ نقطة</div>
          </div>
          <button className="text-xs bg-secondary text-background px-4 py-2 rounded-full font-bold">استبدال</button>
        </div>

        <div className="bg-card rounded-2xl p-4 flex items-center gap-4 border border-card-border">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <Gift size={20} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm">هدية مميزة</div>
            <div className="text-xs text-muted-foreground">مقفل • ٥٠٠ نقطة</div>
          </div>
          <div className="w-[60px]">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min((points / 500) * 100, 100)}%` }} />
            </div>
            <div className="text-[9px] text-muted-foreground mt-1 text-center">{Math.round((points / 500) * 100)}٪</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
