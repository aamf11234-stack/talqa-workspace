import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Star, Zap, Coffee } from 'lucide-react';

const tiers = [
  {
    id: 'classic',
    name: 'كلاسيك',
    nameEn: 'CLASSIC',
    current: true,
    cupsRequired: 0,
    cupsHave: 4,
    bg: 'linear-gradient(145deg,#080003 0%,#3D0809 40%,#0D0003 70%,#1A0405 100%)',
    accent: '#C9956A',
    glow: 'rgba(123,22,24,0.5)',
    shimmer: 'rgba(201,149,106,0.1)',
    badge: '🏅',
    benefits: [
      'خصم ٥٪ على كل الطلبات',
      'حجز طاولة من التطبيق',
      'Apple & Google Wallet',
      'إشعارات العروض الخاصة',
      'QR عند الصندوق',
    ],
  },
  {
    id: 'silver',
    name: 'فضي',
    nameEn: 'SILVER',
    current: false,
    cupsRequired: 7,
    cupsHave: 4,
    bg: 'linear-gradient(145deg,#080C16 0%,#1E2A42 40%,#0A1020 70%,#080C16 100%)',
    accent: '#A8C0DA',
    glow: 'rgba(100,148,200,0.35)',
    shimmer: 'rgba(168,192,218,0.08)',
    badge: '🥈',
    benefits: [
      'كل مزايا كلاسيك +',
      'خصم ١٠٪ على الطلبات',
      'أولوية في الحجز والطلبات',
      'ضيف مجاني كل شهر',
      'وصول مبكر للمحصولات الجديدة',
    ],
  },
  {
    id: 'gold',
    name: 'ذهبي',
    nameEn: 'GOLD',
    current: false,
    cupsRequired: 20,
    cupsHave: 4,
    bg: 'linear-gradient(145deg,#0A0800 0%,#3A2A00 40%,#100D00 70%,#0A0800 100%)',
    accent: '#F4C842',
    glow: 'rgba(244,200,66,0.3)',
    shimmer: 'rgba(244,200,66,0.1)',
    badge: '👑',
    benefits: [
      'كل مزايا الفضي +',
      'خصم ٢٠٪ على الطلبات',
      'مشروب مجاني أسبوعياً',
      'مقعد ثابت بإشعار واحد',
      'دعوات حصرية للفعاليات',
      'شحن مجاني للتيك آواي',
    ],
  },
];

const weeklyOffers = [
  { emoji: '☕', title: 'لاتيه إثيوبي', sub: 'خصم ١٥٪ اليوم فقط', badge: '١٥٪', badgeColor: '#7B1618' },
  { emoji: '🥐', title: 'كرواسون + مشروب', sub: 'تحدي الاثنين — ٢٠ ر', badge: 'جديد', badgeColor: '#30D158' },
  { emoji: '🫖', title: 'محصول كينيا AA', sub: 'وصل حديثاً — كمية محدودة', badge: 'محدود', badgeColor: '#C9956A' },
];

export function ScreenPerks() {
  const [activeTier, setActiveTier] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToTier = (index: number) => {
    setActiveTier(index);
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none pb-24">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-[22px] font-bold text-[#111]">مستويات حيز</h1>
        <p className="text-[12px] text-[#888] font-light mt-0.5">تقدّم واحصل على مزايا لا تُقاوم</p>
      </div>

      {/* Tier selector pills */}
      <div className="flex gap-2 px-5 mb-4">
        {tiers.map((t, i) => (
          <motion.button
            key={t.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToTier(i)}
            className={`flex-1 py-2 rounded-full text-[11px] font-semibold transition-all duration-300 ${
              activeTier === i ? 'text-white shadow-lg' : 'bg-[rgba(196,181,159,0.12)] text-[#888]'
            }`}
            style={activeTier === i ? { background: tiers[i].bg, boxShadow: `0 4px 16px ${tiers[i].glow}` } : {}}
          >
            {t.badge} {t.name}
          </motion.button>
        ))}
      </div>

      {/* Tier Cards — horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none px-5 pb-2 snap-x snap-mandatory"
        onScroll={(e) => {
          const el = e.currentTarget;
          const idx = Math.round(el.scrollLeft / (el.scrollWidth / tiers.length));
          setActiveTier(Math.min(Math.max(idx, 0), tiers.length - 1));
        }}
      >
        {tiers.map((tier, i) => (
          <div
            key={tier.id}
            className="shrink-0 snap-center rounded-[24px] relative overflow-hidden"
            style={{ width: 'calc(100vw - 64px)', maxWidth: 340, minHeight: 280, background: tier.bg }}
          >
            {/* Shimmer */}
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 80% 20%,${tier.shimmer} 0%,transparent 60%)` }} />
            {/* Shimmer sweep */}
            <div
              className="absolute top-0 bottom-0 w-1/3 pointer-events-none"
              style={{
                background: `linear-gradient(90deg,transparent,${tier.shimmer},transparent)`,
                transform: 'skewX(-20deg)',
                animation: tier.current ? 'card-shimmer 3.5s ease-in-out infinite' : 'card-shimmer 5s ease-in-out infinite 2s',
              }}
            />
            {/* Inner border */}
            <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]" />

            <div className="relative z-10 p-6 flex flex-col h-full" style={{ minHeight: 280 }}>
              {/* Top */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[10px] font-inter tracking-widest mb-0.5" style={{ color: `${tier.accent}80` }}>
                    {tier.nameEn}
                  </p>
                  <p className="text-[28px] font-bold" style={{ color: tier.accent }}>{tier.name}</p>
                </div>
                <div className="text-4xl">{tier.badge}</div>
              </div>

              {/* Current badge */}
              {tier.current && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 18 }}
                  className="inline-flex items-center gap-1.5 self-start mb-4 px-3 py-1 rounded-full"
                  style={{ background: `${tier.accent}20`, border: `1px solid ${tier.accent}40` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: tier.accent }} />
                  <span className="text-[10px] font-semibold" style={{ color: tier.accent }}>مستواك الحالي</span>
                </motion.div>
              )}

              {/* Benefits */}
              <div className="flex-1 space-y-2.5">
                {tier.benefits.map((b, bi) => (
                  <motion.div
                    key={bi}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + bi * 0.06 }}
                    className="flex items-center gap-2.5"
                  >
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${tier.accent}20` }}>
                      <Check size={9} style={{ color: tier.accent }} strokeWidth={3} />
                    </div>
                    <span className="text-white/70 text-[12px] font-light">{b}</span>
                  </motion.div>
                ))}
              </div>

              {/* Requirement */}
              {!tier.current && (
                <div className="mt-4 pt-4 border-t border-white/8">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-white/40 text-[10px]">{tier.cupsHave} / {tier.cupsRequired} كوب</span>
                    <span style={{ color: tier.accent }} className="text-[10px] font-semibold">
                      باقي {tier.cupsRequired - tier.cupsHave} أكواب
                    </span>
                  </div>
                  <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(tier.cupsHave / tier.cupsRequired) * 100}%` }}
                      transition={{ duration: 1.0, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg,${tier.accent}80,${tier.accent})` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-3 mb-5">
        {tiers.map((t, i) => (
          <motion.div
            key={t.id}
            animate={{ width: activeTier === i ? 18 : 6, opacity: activeTier === i ? 1 : 0.3 }}
            className="h-1.5 rounded-full"
            style={{ background: tiers[activeTier].accent }}
          />
        ))}
      </div>

      {/* Weekly Offers */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[14px] font-bold text-[#111]">عروض الأسبوع</p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
            <span className="text-[10px] text-[#30D158] font-medium">حصرية لأعضاء حيز</span>
          </div>
        </div>
        <div className="space-y-3">
          {weeklyOffers.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-between bg-white rounded-[18px] px-4 py-3.5 border border-[rgba(196,181,159,0.15)] shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F5F0EA] rounded-[14px] flex items-center justify-center text-xl">
                  {o.emoji}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#111]">{o.title}</p>
                  <p className="text-[11px] text-[#888] font-light">{o.sub}</p>
                </div>
              </div>
              <span
                className="text-white text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: o.badgeColor }}
              >
                {o.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
