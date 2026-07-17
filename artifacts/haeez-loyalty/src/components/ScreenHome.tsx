import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bell, Coffee, ChevronLeft, Calendar, Users, Tag, Zap } from 'lucide-react';

const logoImg = `${import.meta.env.BASE_URL}hyz-logo.jpeg`;

/* ── helpers ─────────────────────────────────────────────────────── */
function useCounter(target: number, duration = 1300, delay = 250) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return value;
}

function ProgressRing({ progress = 4 / 7 }: { progress?: number }) {
  const size = 126;
  const sw = 5;
  const r = (size - sw * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
      <defs>
        <linearGradient id="ring-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9956A" />
          <stop offset="100%" stopColor="#F0D4A8" />
        </linearGradient>
        <filter id="ring-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={sw} fill="none" />
      {/* Progress arc */}
      <motion.circle
        cx={cx} cy={cy} r={r}
        stroke="url(#ring-gold)"
        strokeWidth={sw}
        strokeLinecap="round"
        fill="none"
        filter="url(#ring-glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: progress }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ rotate: -90, originX: `${cx}px`, originY: `${cy}px` }}
        transformOrigin={`${cx}px ${cy}px`}
      />
    </svg>
  );
}

/* ── Component ───────────────────────────────────────────────────── */
export function ScreenHome() {
  const points = useCounter(480, 1300, 200);
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'صباح النور ☀️' :
    hour < 17 ? 'طاب نهارك 🌤️' :
                'مساء الخير 🌙';

  return (
    <div className="h-full overflow-y-auto scrollbar-none">

      {/* ── Dark hero ──────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden pb-10"
        style={{ background: 'linear-gradient(145deg,#0D0205 0%,#3D0809 42%,#0D0205 72%,#1A0406 100%)' }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 35%,rgba(123,22,24,0.65) 0%,transparent 60%)', animation: 'hero-glow 5s ease-in-out infinite' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 80%,rgba(201,149,106,0.09) 0%,transparent 55%)' }} />

        {/* Top row */}
        <div className="flex items-center justify-between px-5 pt-4 mb-5">
          <div>
            <p className="text-white/40 text-[11px] font-light">{greeting}</p>
            <p className="text-white text-[17px] font-bold mt-0.5">عبد الإله</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center border border-white/6">
              <Bell size={14} className="text-white/50" />
            </button>
            <img src={logoImg} alt="" className="w-9 h-9 rounded-[12px] object-cover border border-white/10" />
          </div>
        </div>

        {/* Points ring — hero focal point */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative" style={{ width: 126, height: 126 }}>
            <ProgressRing progress={4 / 7} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white text-[30px] font-bold leading-none font-inter tracking-tight">
                {points}
              </span>
              <span className="text-white/40 text-[10px] tracking-widest mt-0.5">نقطة</span>
            </div>
          </div>

          {/* Level + progress text */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-3 flex items-center gap-2.5 bg-white/6 border border-white/8 rounded-full px-3.5 py-1.5"
          >
            <span className="text-[#C9956A] text-[11px] font-semibold">كلاسيك</span>
            <div className="w-px h-3 bg-white/15" />
            <span className="text-white/40 text-[11px] font-light">٤ من ٧ أكواب للفضي</span>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="flex justify-center gap-10 px-6">
          {[
            { val: '١٢', label: 'زيارة' },
            { val: '٨',  label: 'هذا الشهر' },
            { val: '٦٥ر', label: 'توفير' },
          ].map((s, i) => (
            <motion.div key={s.label} className="text-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.08 }}>
              <p className="text-white text-[20px] font-bold leading-tight font-inter">{s.val}</p>
              <p className="text-white/35 text-[10px] mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Cream content overlay ─────────────────────────────── */}
      <div className="bg-[#FDFBF7] rounded-t-[28px] -mt-6 relative z-10 px-5 pt-5 pb-4">

        {/* Quick actions */}
        <div className="flex gap-3 mb-4">
          {[
            { icon: Calendar, label: 'احجز',   color: '#7B1618', bg: 'rgba(123,22,24,0.07)'  },
            { icon: Users,    label: 'مجتمع',  color: '#111',    bg: 'rgba(0,0,0,0.05)'      },
            { icon: Tag,      label: 'عروضي',  color: '#C9956A', bg: 'rgba(201,149,106,0.1)' },
          ].map((a, i) => (
            <motion.button
              key={a.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              whileTap={{ scale: 0.88 }}
              className="flex-1 flex flex-col items-center py-3.5 rounded-2xl gap-1.5"
              style={{ background: a.bg }}
            >
              <a.icon size={17} style={{ color: a.color }} />
              <span className="text-[11px] font-semibold" style={{ color: a.color }}>{a.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Today's special */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-3 rounded-2xl p-4 border border-[rgba(201,149,106,0.2)]"
          style={{ background: 'linear-gradient(135deg,#FDF9F4,#FAF3EA)' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
                <span className="text-[10px] text-[#30D158] font-semibold tracking-wide">عرض اليوم</span>
              </div>
              <p className="text-[14px] font-bold text-[#111] mb-0.5 leading-snug">لاتيه إثيوبي بحليب الشوفان</p>
              <p className="text-[11px] text-[#888] font-light">خصم ١٥٪ لأعضاء حيز · حتى الساعة ٦م</p>
            </div>
            <div className="bg-[#7B1618] text-[#C9956A] text-[12px] font-bold px-2.5 py-1 rounded-xl shrink-0">١٥٪</div>
          </div>
          <button className="mt-3 text-[11px] font-semibold text-[#7B1618] flex items-center gap-0.5">
            احصل عليه الآن <ChevronLeft size={12} />
          </button>
        </motion.div>

        {/* Community teaser */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48 }}
          className="mb-4 bg-[#111] rounded-2xl px-4 py-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Zap size={16} className="text-[#C9956A]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#30D158] rounded-full border-2 border-[#111]" />
            </div>
            <div>
              <p className="text-white text-[12px] font-semibold">تحدي الأسبوع: ٥ أكواب</p>
              <p className="text-white/40 text-[10px]">٦٧ مشارك · ٤ من ٥ أكواب</p>
            </div>
          </div>
          <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
        </motion.div>

        {/* Recent activity */}
        <p className="text-[12px] font-semibold text-[#111] mb-2.5 flex justify-between items-center">
          <span>آخر نشاطاتك</span>
          <span className="text-[#C4B59F] font-normal text-[11px]">عرض الكل</span>
        </p>
        {[
          { item: 'لاتيه إثيوبي — فلتر',  time: 'اليوم، ١١:٢٠ص',  pts: '+١٥' },
          { item: 'كرواسون بالزبدة',       time: 'أمس، ٣:٠٠م',      pts: '+٨'  },
          { item: 'باريستا ستايل',         time: 'الأحد، ١٠:٤٥ص',   pts: '+١٢' },
        ].map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.08 }}
            className="flex items-center justify-between py-3 border-b border-[rgba(196,181,159,0.1)] last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[rgba(123,22,24,0.07)] rounded-full flex items-center justify-center">
                <Coffee size={13} className="text-[#7B1618]" />
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#111]">{r.item}</p>
                <p className="text-[10px] text-[#AAA] font-inter">{r.time}</p>
              </div>
            </div>
            <span className="text-[11px] text-[#30D158] font-semibold font-inter">{r.pts}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
