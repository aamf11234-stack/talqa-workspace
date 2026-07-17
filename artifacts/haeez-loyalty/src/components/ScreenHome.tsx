import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Coffee, ChevronLeft, Calendar, Users, Tag, Zap, Flame, Star, ArrowLeft } from 'lucide-react';

const logoImg = `${import.meta.env.BASE_URL}hyz-logo.jpeg`;

/* ── helpers ─────────────────────────────────────────────────────── */
function useCounter(target: number, duration = 1400, delay = 200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        setValue(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return value;
}

/* ── Multi-ring progress ─────────────────────────────────────────── */
function ProgressRings({ progress = 4 / 7 }: { progress?: number }) {
  const size = 140;
  const cx = size / 2;
  const cy = size / 2;

  const rings = [
    { r: 58, sw: 4.5, progress, id: 'gold', c1: '#C9956A', c2: '#F0D4A8', glow: 'rgba(201,149,106,0.5)' },
    { r: 46, sw: 3,   progress: 0.82, id: 'red',  c1: '#7B1618', c2: '#C44',    glow: 'rgba(123,22,24,0.4)' },
    { r: 35, sw: 2.5, progress: 0.55, id: 'dim',  c1: 'rgba(255,255,255,0.2)', c2: 'rgba(255,255,255,0.05)', glow: 'transparent' },
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
      <defs>
        {rings.map(ring => (
          <React.Fragment key={ring.id}>
            <linearGradient id={`grad-${ring.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={ring.c1} />
              <stop offset="100%" stopColor={ring.c2} />
            </linearGradient>
            <filter id={`glow-${ring.id}`}>
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </React.Fragment>
        ))}
      </defs>

      {rings.map(ring => (
        <React.Fragment key={ring.id}>
          {/* Track */}
          <circle cx={cx} cy={cy} r={ring.r} stroke="rgba(255,255,255,0.05)" strokeWidth={ring.sw} fill="none" />
          {/* Arc */}
          <motion.circle
            cx={cx} cy={cy} r={ring.r}
            stroke={`url(#grad-${ring.id})`}
            strokeWidth={ring.sw}
            strokeLinecap="round"
            fill="none"
            filter={`url(#glow-${ring.id})`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: ring.progress }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ rotate: -90, transformOrigin: `${cx}px ${cy}px` }}
          />
        </React.Fragment>
      ))}

      {/* Center glow dot */}
      <circle cx={cx} cy={cy} r={22} fill="rgba(201,149,106,0.06)" />
    </svg>
  );
}

/* ── Streak Badge ─────────────────────────────────────────────────── */
function StreakBadge({ days }: { days: number }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -15 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.2, type: 'spring', bounce: 0.5 }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-400/30"
      style={{ background: 'rgba(255,140,0,0.12)' }}
    >
      <Flame size={11} className="text-orange-400" fill="rgba(255,140,0,0.7)" />
      <span className="text-orange-300 text-[10px] font-bold font-inter">{days} يوم متواصل</span>
    </motion.div>
  );
}

/* ── Live offer countdown ─────────────────────────────────────────── */
function useCountdown(endHour = 18) {
  const [left, setLeft] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(); end.setHours(endHour, 0, 0, 0);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setLeft(`${h}س ${m}د`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [endHour]);
  return left;
}

/* ── Component ───────────────────────────────────────────────────── */
export function ScreenHome() {
  const points = useCounter(480, 1400, 200);
  const countdown = useCountdown(18);
  const hour = new Date().getHours();
  const greeting =
    hour < 5  ? 'ليلة طيبة 🌙' :
    hour < 12 ? 'صباح النور ☀️' :
    hour < 17 ? 'طاب نهارك 🌤️' :
                'مساء الخير 🌙';

  const stats = [
    { val: '١٢', label: 'زيارة',       icon: '🏠' },
    { val: '٨',  label: 'هذا الشهر',  icon: '📅' },
    { val: '٦٥', label: 'ريال توفير', icon: '💰' },
  ];

  return (
    <div className="h-full overflow-y-auto scrollbar-none">

      {/* ── Premium Dark Hero ──────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(160deg,#050002 0%,#200005 30%,#3D0809 55%,#0D0205 80%,#000 100%)',
        paddingBottom: '52px',
      }}>
        {/* Layered ambient glows */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 75% 25%,rgba(123,22,24,0.7) 0%,transparent 55%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 15% 85%,rgba(201,149,106,0.12) 0%,transparent 50%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%,rgba(201,149,106,0.07) 0%,transparent 40%)' }} />

        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '150px' }} />

        {/* ── Top row ── */}
        <div className="flex items-start justify-between px-5 pt-5 mb-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="text-white/35 text-[11px] font-light tracking-wide"
            >
              {greeting}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-white text-[22px] font-bold mt-0.5 tracking-tight"
            >
              عبدالإله علي
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-2"
            >
              <StreakBadge days={7} />
            </motion.div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <motion.button
              whileTap={{ scale: 0.88 }}
              className="relative w-9 h-9 rounded-full flex items-center justify-center border border-white/8"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <Bell size={15} className="text-white/50" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF3B30] rounded-full border border-[#0D0205]" />
            </motion.button>
            <motion.div whileTap={{ scale: 0.9 }} className="relative">
              <img src={logoImg} alt="" className="w-10 h-10 rounded-[13px] object-cover border border-[rgba(201,149,106,0.2)]"
                style={{ boxShadow: '0 4px 16px rgba(123,22,24,0.4)' }} />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#30D158] rounded-full border-2 border-[#0D0205]" />
            </motion.div>
          </div>
        </div>

        {/* ── Triple-ring focal point ── */}
        <div className="flex flex-col items-center mb-5">
          <div className="relative" style={{ width: 140, height: 140 }}>
            <ProgressRings progress={4 / 7} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                key={points}
                className="text-white font-bold leading-none font-inter tracking-tight"
                style={{ fontSize: 34 }}
                initial={{ scale: 0.85 }} animate={{ scale: 1 }}
                transition={{ duration: 0.15 }}
              >
                {points}
              </motion.span>
              <span className="text-white/30 text-[10px] tracking-[0.2em] mt-1 font-light">نقطة</span>
            </div>
          </div>

          {/* Tier + next level */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-4 flex items-center gap-2 bg-white/[0.07] border border-white/[0.08] rounded-full px-4 py-2"
          >
            <div className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg,#C9956A,#F0D4A8)' }} />
            <span className="text-[#C9956A] text-[11px] font-bold tracking-wide">كلاسيك</span>
            <div className="w-px h-3 bg-white/15" />
            <span className="text-white/35 text-[11px] font-light">٣ أكواب للفضي</span>
            <ArrowLeft size={10} className="text-white/25" />
          </motion.div>
        </div>

        {/* ── Stats strip ── */}
        <div className="flex justify-center gap-0 px-6 mb-2">
          {stats.map((s, i) => (
            <React.Fragment key={s.label}>
              <motion.div
                className="flex-1 flex flex-col items-center gap-0.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.09 }}
              >
                <span className="text-[15px] mb-0.5">{s.icon}</span>
                <p className="text-white text-[22px] font-bold leading-none font-inter">{s.val}</p>
                <p className="text-white/30 text-[10px] mt-0.5 font-light">{s.label}</p>
              </motion.div>
              {i < stats.length - 1 && (
                <div className="w-px self-stretch bg-white/[0.07] mx-1 my-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Cream content ─────────────────────────────────────────── */}
      <div className="bg-[#FDFBF7] rounded-t-[30px] -mt-7 relative z-10 px-4 pt-5 pb-6">

        {/* ── Quick actions 2×3 grid ── */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {[
            { icon: Calendar, label: 'احجز',    color: '#7B1618', bg: '#7B161810', glow: 'rgba(123,22,24,0.15)' },
            { icon: Users,    label: 'مجتمع',   color: '#1A6B3A', bg: '#2D7D4610', glow: 'rgba(45,125,70,0.12)'  },
            { icon: Tag,      label: 'عروضي',   color: '#B5651D', bg: '#C9956A12', glow: 'rgba(201,149,106,0.15)'},
          ].map((a, i) => (
            <motion.button
              key={a.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              whileTap={{ scale: 0.88 }}
              className="flex flex-col items-center py-4 rounded-2xl gap-2 relative overflow-hidden"
              style={{ background: a.bg, border: `1px solid ${a.color}18` }}
            >
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: `inset 0 -8px 20px ${a.glow}` }} />
              <div className="w-9 h-9 rounded-[12px] flex items-center justify-center"
                style={{ background: `${a.color}14` }}>
                <a.icon size={17} style={{ color: a.color }} />
              </div>
              <span className="text-[11px] font-bold" style={{ color: a.color }}>{a.label}</span>
            </motion.button>
          ))}
        </div>

        {/* ── Live offer card ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="mb-4 rounded-[22px] overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg,#0D0205,#3D0809,#0D0205)' }}
        >
          {/* animated shimmer */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 80% 20%,rgba(201,149,106,0.15) 0%,transparent 60%)' }} />
          <div className="absolute top-0 bottom-0 w-[60%] pointer-events-none"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)', transform: 'skewX(-20deg)', animation: 'card-shimmer 4s ease-in-out infinite' }} />

          <div className="relative p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-[16px] flex items-center justify-center text-3xl shrink-0"
              style={{ background: 'rgba(201,149,106,0.1)', border: '1px solid rgba(201,149,106,0.15)' }}>
              ☕
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
                <span className="text-[10px] text-[#30D158] font-semibold tracking-wide">عرض اليوم</span>
              </div>
              <p className="text-white text-[14px] font-bold leading-snug mb-0.5">لاتيه إثيوبي بحليب الشوفان</p>
              <p className="text-white/40 text-[10px] font-light">خصم ١٥٪ لأعضاء حيز</p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <div className="bg-[#C9956A] text-[#0D0205] text-[13px] font-black px-2.5 py-0.5 rounded-lg">١٥٪</div>
              <div className="text-white/30 text-[9px] font-inter">{countdown}</div>
            </div>
          </div>

          {/* Bottom CTA strip */}
          <div className="border-t border-white/[0.06] px-4 py-2 flex items-center justify-between">
            <span className="text-[10px] text-white/25 font-light">حتى الساعة ٦م اليوم</span>
            <span className="text-[10px] text-[#C9956A] font-semibold flex items-center gap-1">
              احصل عليه <ChevronLeft size={11} />
            </span>
          </div>
        </motion.div>

        {/* ── Active challenge ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-5 rounded-[18px] p-4 flex items-center gap-3 relative overflow-hidden"
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 20% 50%,rgba(48,209,88,0.08) 0%,transparent 65%)' }} />
          <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
            style={{ background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.15)' }}>
            <Zap size={18} className="text-[#30D158]" fill="rgba(48,209,88,0.3)" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[13px] font-bold leading-tight">تحدي الأسبوع: ٥ أكواب</p>
            <p className="text-white/35 text-[10px] mt-0.5">٤ من ٥ — كوب واحد فقط للفوز</p>
            {/* mini progress */}
            <div className="flex gap-1 mt-2">
              {[0,1,2,3,4].map(i => (
                <motion.div key={i}
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ delay: 0.45 + i * 0.07 }}
                  className="h-1.5 flex-1 rounded-full"
                  style={{
                    background: i < 4
                      ? 'linear-gradient(90deg,#30D158,#25A349)'
                      : 'rgba(255,255,255,0.1)',
                    transformOrigin: 'left',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="w-2 h-2 bg-[#30D158] rounded-full animate-pulse" />
            <span className="text-[#30D158] text-[9px] font-bold">مشارك</span>
          </div>
        </motion.div>

        {/* ── Recent activity ── */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] font-bold text-[#111]">آخر النشاطات</p>
          <button className="text-[11px] text-[#C4B59F] flex items-center gap-0.5">
            عرض الكل <ChevronLeft size={11} />
          </button>
        </div>

        <div className="space-y-1">
          {[
            { item: 'لاتيه إثيوبي — فلتر',  time: 'اليوم، ١١:٢٠ص',   pts: '+١٥', emoji: '☕', color: '#7B1618' },
            { item: 'كرواسون بالزبدة',       time: 'أمس، ٣:٠٠م',       pts: '+٨',  emoji: '🥐', color: '#C9956A' },
            { item: 'باريستا ستايل خاص',     time: 'الأحد، ١٠:٤٥ص',   pts: '+١٢', emoji: '🌟', color: '#2D7D46' },
          ].map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.08, ease: [0.4,0,0.2,1] }}
              className="flex items-center gap-3 bg-white rounded-[16px] p-3.5 border border-[rgba(196,181,159,0.1)]"
              style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
            >
              <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-[18px] shrink-0"
                style={{ background: `${r.color}0F` }}>
                {r.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#111] truncate">{r.item}</p>
                <p className="text-[10px] text-[#BBB] font-inter mt-0.5">{r.time}</p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[13px] text-[#30D158] font-bold font-inter">{r.pts}</span>
                <span className="text-[9px] text-[#CCC]">نقطة</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Recommendations ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-4 rounded-[18px] p-4"
          style={{ background: 'linear-gradient(135deg,#FDF9F4,#F8F0E8)', border: '1px solid rgba(201,149,106,0.15)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Star size={13} className="text-[#C9956A]" fill="#C9956A" />
            <p className="text-[12px] font-bold text-[#111]">موصى لك</p>
          </div>
          <div className="flex gap-2">
            {[
              { name: 'قهوة حيز', price: '١٩ر', emoji: '☕', note: 'الأشهر لديك' },
              { name: 'كيك البيكان', price: '٢٥ر', emoji: '🎂', note: 'يُحبه أصدقاؤك' },
            ].map((rec, i) => (
              <div key={i} className="flex-1 bg-white rounded-[14px] p-3 border border-[rgba(196,181,159,0.12)]">
                <div className="text-2xl mb-1.5">{rec.emoji}</div>
                <p className="text-[11px] font-bold text-[#111] leading-tight">{rec.name}</p>
                <p className="text-[9px] text-[#C9956A] mt-0.5">{rec.note}</p>
                <p className="text-[12px] font-black text-[#7B1618] mt-1.5 font-inter">{rec.price}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
