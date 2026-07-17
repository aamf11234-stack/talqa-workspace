import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronLeft, Calendar, Users, Tag, Zap, Flame, Star, ArrowLeft, Check, X } from 'lucide-react';

const logoImg = `${import.meta.env.BASE_URL}hyz-logo.jpeg`;

/* ── Counter hook ─────────────────────────────────────────────────── */
function useCounter(target: number, duration = 1400, delay = 200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        setValue(Math.round((1 - Math.pow(1 - p, 4)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return value;
}

/* ── Live countdown (days) from today ────────────────────────────── */
function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
}

/* ── Triple progress rings ────────────────────────────────────────── */
function ProgressRings({ progress = 4 / 7 }: { progress?: number }) {
  const size = 140; const cx = size / 2; const cy = size / 2;
  const rings = [
    { r: 58, sw: 4.5, progress, id: 'gold', c1: '#C9956A', c2: '#F0D4A8' },
    { r: 46, sw: 3,   progress: 0.82, id: 'red',  c1: '#7B1618', c2: '#C44' },
    { r: 35, sw: 2.5, progress: 0.55, id: 'dim',  c1: 'rgba(255,255,255,0.2)', c2: 'rgba(255,255,255,0.05)' },
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
      <defs>
        {rings.map(r => (
          <React.Fragment key={r.id}>
            <linearGradient id={`rg-${r.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={r.c1} /><stop offset="100%" stopColor={r.c2} />
            </linearGradient>
            <filter id={`rf-${r.id}`}>
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </React.Fragment>
        ))}
      </defs>
      {rings.map(r => (
        <React.Fragment key={r.id}>
          <circle cx={cx} cy={cy} r={r.r} stroke="rgba(255,255,255,0.05)" strokeWidth={r.sw} fill="none" />
          <motion.circle cx={cx} cy={cy} r={r.r} stroke={`url(#rg-${r.id})`} strokeWidth={r.sw}
            strokeLinecap="round" fill="none" filter={`url(#rf-${r.id})`}
            initial={{ pathLength: 0 }} animate={{ pathLength: r.progress }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ rotate: -90, transformOrigin: `${cx}px ${cy}px` }} />
        </React.Fragment>
      ))}
      <circle cx={cx} cy={cy} r={22} fill="rgba(201,149,106,0.06)" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════
   تقويم حيز — Haiz Calendar
══════════════════════════════════════════════════════════════════ */
interface HaizEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;         // YYYY-MM-DD
  emoji: string;
  color: string;
  benefit: string;      // what Haiz offers during this event
  badge?: string;       // "جارٍ الآن" etc
  isNow?: boolean;
}

const haizEvents: HaizEvent[] = [
  {
    id: 'summer',
    title: 'الإجازة الصيفية',
    subtitle: 'نهايتها ٧ سبتمبر',
    date: '2026-09-07',
    emoji: '☀️',
    color: '#E67E22',
    benefit: 'خصم ١٠٪ على المشروبات الباردة طول الصيف',
    badge: 'جارٍ الآن',
    isNow: true,
  },
  {
    id: 'national',
    title: 'اليوم الوطني ٩٦',
    subtitle: '٢٣ سبتمبر ٢٠٢٦',
    date: '2026-09-23',
    emoji: '🇸🇦',
    color: '#1A6B3A',
    benefit: 'منيو وطني خاص + ضعف النقاط يوم ٢٣',
  },
  {
    id: 'school',
    title: 'بداية الدراسة',
    subtitle: '٧ سبتمبر ٢٠٢٦',
    date: '2026-09-07',
    emoji: '📚',
    color: '#2980B9',
    benefit: 'كوب قهوة ترحيبي بعد أول يوم دراسة',
  },
  {
    id: 'winter',
    title: 'إجازة الشتاء',
    subtitle: 'ديسمبر ٢٠٢٦',
    date: '2026-12-19',
    emoji: '❄️',
    color: '#5D6D7E',
    benefit: 'منيو شتوي حصري + شوكولاتة مجانية',
  },
  {
    id: 'midyear',
    title: 'إجازة النصف',
    subtitle: 'يناير ٢٠٢٧',
    date: '2027-01-15',
    emoji: '🎯',
    color: '#8E44AD',
    benefit: 'جلسات قراءة بخصم ٢٠٪ على المشروبات',
  },
  {
    id: 'founding',
    title: 'يوم التأسيس',
    subtitle: '٢٢ فبراير ٢٠٢٧',
    date: '2027-02-22',
    emoji: '🏛️',
    color: '#7B1618',
    benefit: 'مشروب مجاني لكل عضو حيز',
  },
  {
    id: 'eid',
    title: 'عيد الفطر',
    subtitle: 'مارس ٢٠٢٧ (تقريباً)',
    date: '2027-03-20',
    emoji: '🌙',
    color: '#C9956A',
    benefit: 'هدية عيد خاصة + مضاعفة النقاط',
  },
];

function HaizCalendar() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="mb-5"
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-3 px-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[7px] flex items-center justify-center"
            style={{ background: 'rgba(123,22,24,0.1)' }}>
            <Calendar size={13} className="text-[#7B1618]" />
          </div>
          <p className="text-[13px] font-bold text-[#111]">تقويم حيز</p>
        </div>
        <span className="text-[10px] text-[#C4B59F]">المناسبات والعروض</span>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto scrollbar-none px-4 pb-1">
        {haizEvents.map((ev, i) => {
          const days = daysUntil(ev.date);
          const isOpen = selected === ev.id;
          return (
            <motion.button
              key={ev.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38 + i * 0.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setSelected(isOpen ? null : ev.id)}
              className="relative shrink-0 rounded-[20px] overflow-hidden text-right transition-all duration-200"
              style={{
                width: isOpen ? 200 : 130,
                background: ev.isNow
                  ? `linear-gradient(145deg,${ev.color}22,${ev.color}10)`
                  : '#fff',
                border: isOpen
                  ? `1.5px solid ${ev.color}60`
                  : ev.isNow
                    ? `1.5px solid ${ev.color}40`
                    : '1.5px solid rgba(196,181,159,0.15)',
                boxShadow: isOpen
                  ? `0 4px 20px ${ev.color}25`
                  : '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              <div className="p-3.5">
                {/* Badge */}
                {ev.badge && (
                  <div className="mb-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
                    style={{ background: `${ev.color}18` }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ev.color }} />
                    <span className="text-[8px] font-bold" style={{ color: ev.color }}>{ev.badge}</span>
                  </div>
                )}

                <div className="text-[26px] mb-2">{ev.emoji}</div>
                <p className="text-[12px] font-bold text-[#111] leading-tight mb-0.5">{ev.title}</p>
                <p className="text-[9px] text-[#AAA] font-light">{ev.subtitle}</p>

                {/* Countdown */}
                <div className="mt-2.5 flex items-baseline gap-1">
                  {ev.isNow ? (
                    <>
                      <span className="text-[18px] font-black font-inter" style={{ color: ev.color }}>{days}</span>
                      <span className="text-[9px] font-medium" style={{ color: `${ev.color}90` }}>يوم متبقٍ</span>
                    </>
                  ) : days === 0 ? (
                    <span className="text-[11px] font-bold" style={{ color: ev.color }}>اليوم! 🎉</span>
                  ) : (
                    <>
                      <span className="text-[18px] font-black font-inter" style={{ color: ev.color }}>{days}</span>
                      <span className="text-[9px] text-[#BBB]">يوم</span>
                    </>
                  )}
                </div>

                {/* Expanded benefit */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t" style={{ borderColor: `${ev.color}20` }}>
                        <p className="text-[9px] text-[#888] mb-1 font-semibold tracking-wide">عرض حيز ✦</p>
                        <p className="text-[10px] leading-relaxed text-[#444] text-right">{ev.benefit}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right color stripe */}
              <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full"
                style={{ background: `linear-gradient(180deg,${ev.color},${ev.color}40)` }} />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   سؤال اليوم — Question of the Day
══════════════════════════════════════════════════════════════════ */
interface DailyQuestion {
  question: string;
  options: string[];
  correct: number;   // index
  points: number;
  hint?: string;
}

const todayQ: DailyQuestion = {
  question: 'ما هي طريقة تحضير القهوة التي تستغرق ٦٠ دقيقة في حيز؟',
  options: ['الإسبريسو', 'المقطرة في ٦٠', 'الفلتر العادي', 'الكورتادو'],
  correct: 1,
  points: 25,
  hint: 'تجدها في قائمة "مقطرة" في المنيو ☕',
};

function QuestionOfDay() {
  const [picked, setPicked] = useState<number | null>(null);
  const [showPoints, setShowPoints] = useState(false);
  const [done, setDone] = useState(false);
  const isCorrect = picked === todayQ.correct;

  const handlePick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === todayQ.correct) {
      setTimeout(() => setShowPoints(true), 500);
      setTimeout(() => setShowPoints(false), 2800);
    }
    setTimeout(() => setDone(true), 3200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.42 }}
      className="mb-5 mx-4 rounded-[22px] overflow-hidden relative"
      style={{ background: 'linear-gradient(145deg,#0D0205,#1A0306,#3D0809,#0D0205)' }}
    >
      {/* Animated glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 20%,rgba(201,149,106,0.12) 0%,transparent 55%)' }} />

      {/* Floating points toast */}
      <AnimatePresence>
        {showPoints && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(48,209,88,0.15)', border: '1px solid rgba(48,209,88,0.3)' }}
          >
            <Star size={11} className="text-[#30D158]" fill="rgba(48,209,88,0.5)" />
            <span className="text-[#30D158] text-[12px] font-black font-inter">+{todayQ.points}</span>
            <span className="text-[#30D158]/70 text-[9px]">نقطة</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative p-4 pb-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-[7px] flex items-center justify-center"
              style={{ background: 'rgba(201,149,106,0.15)', border: '1px solid rgba(201,149,106,0.2)' }}>
              <span className="text-[12px]">💡</span>
            </div>
            <span className="text-white text-[12px] font-bold">سؤال اليوم</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(201,149,106,0.12)', border: '1px solid rgba(201,149,106,0.2)' }}>
            <Star size={10} className="text-[#C9956A]" fill="#C9956A" />
            <span className="text-[#C9956A] text-[10px] font-bold">{todayQ.points} نقطة</span>
          </div>
        </div>

        {/* Question */}
        <p className="text-white text-[13px] font-semibold leading-snug mb-4 text-right">
          {todayQ.question}
        </p>

        {/* Options */}
        {!done ? (
          <div className="space-y-2">
            {todayQ.options.map((opt, i) => {
              const letters = ['أ', 'ب', 'ج', 'د'];
              const isSelected = picked === i;
              const correct = picked !== null && i === todayQ.correct;
              const wrong = isSelected && i !== todayQ.correct;

              return (
                <motion.button
                  key={i}
                  whileTap={picked === null ? { scale: 0.97 } : {}}
                  onClick={() => handlePick(i)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-[14px] text-right transition-all duration-300"
                  style={{
                    background: correct
                      ? 'rgba(48,209,88,0.18)'
                      : wrong
                        ? 'rgba(255,59,48,0.18)'
                        : isSelected
                          ? 'rgba(201,149,106,0.15)'
                          : 'rgba(255,255,255,0.06)',
                    border: correct
                      ? '1.5px solid rgba(48,209,88,0.4)'
                      : wrong
                        ? '1.5px solid rgba(255,59,48,0.4)'
                        : 'none',
                  }}
                >
                  <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                    style={{
                      background: correct
                        ? 'rgba(48,209,88,0.25)'
                        : wrong
                          ? 'rgba(255,59,48,0.25)'
                          : 'rgba(255,255,255,0.08)',
                    }}>
                    {correct ? (
                      <Check size={11} className="text-[#30D158]" strokeWidth={3} />
                    ) : wrong ? (
                      <X size={11} className="text-[#FF3B30]" strokeWidth={3} />
                    ) : (
                      <span className="text-white/50 text-[10px] font-bold">{letters[i]}</span>
                    )}
                  </div>
                  <span className={`text-[12px] font-medium flex-1 text-right ${
                    correct ? 'text-[#30D158]' : wrong ? 'text-[#FF3B30]' : 'text-white/80'
                  }`}>
                    {opt}
                  </span>
                </motion.button>
              );
            })}
          </div>
        ) : (
          /* Result state */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-4 gap-2"
          >
            <div className="text-3xl">{isCorrect ? '🎉' : '💪'}</div>
            <p className="text-white font-bold text-[14px]">
              {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة'}
            </p>
            {isCorrect ? (
              <p className="text-[#30D158] text-[11px]">+{todayQ.points} نقطة أُضيفت لرصيدك</p>
            ) : (
              <p className="text-white/40 text-[10px] text-center font-light">{todayQ.hint}</p>
            )}
            <p className="text-white/25 text-[9px] mt-1">يعود السؤال غداً 🌅</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Main Screen
══════════════════════════════════════════════════════════════════ */
export function ScreenHome() {
  const points = useCounter(480, 1400, 200);
  const hour = new Date().getHours();
  const greeting =
    hour < 5  ? 'ليلة طيبة 🌙' :
    hour < 12 ? 'صباح النور ☀️' :
    hour < 17 ? 'طاب نهارك 🌤️' :
                'مساء الخير 🌙';

  return (
    <div className="h-full overflow-y-auto scrollbar-none">

      {/* ── Premium Dark Hero ──────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(160deg,#050002 0%,#200005 30%,#3D0809 55%,#0D0205 80%,#000 100%)',
        paddingBottom: '52px',
      }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 75% 25%,rgba(123,22,24,0.7) 0%,transparent 55%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 15% 85%,rgba(201,149,106,0.12) 0%,transparent 50%)' }} />

        {/* Top row */}
        <div className="flex items-start justify-between px-5 pt-5 mb-6">
          <div>
            <p className="text-white/35 text-[11px] font-light tracking-wide">{greeting}</p>
            <p className="text-white text-[22px] font-bold mt-0.5 tracking-tight">عبدالإله علي</p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-400/30 w-fit"
              style={{ background: 'rgba(255,140,0,0.12)' }}>
              <Flame size={11} className="text-orange-400" fill="rgba(255,140,0,0.7)" />
              <span className="text-orange-300 text-[10px] font-bold font-inter">٧ أيام متواصلة</span>
            </motion.div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <motion.button whileTap={{ scale: 0.88 }}
              className="relative w-9 h-9 rounded-full flex items-center justify-center border border-white/8"
              style={{ background: 'rgba(255,255,255,0.06)' }}>
              <Bell size={15} className="text-white/50" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF3B30] rounded-full border border-[#0D0205]" />
            </motion.button>
            <div className="relative">
              <img src={logoImg} alt="" className="w-10 h-10 rounded-[13px] object-cover border border-[rgba(201,149,106,0.2)]"
                style={{ boxShadow: '0 4px 16px rgba(123,22,24,0.4)' }} />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#30D158] rounded-full border-2 border-[#0D0205]" />
            </div>
          </div>
        </div>

        {/* Triple-ring + points */}
        <div className="flex flex-col items-center mb-5">
          <div className="relative" style={{ width: 140, height: 140 }}>
            <ProgressRings progress={4 / 7} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white font-bold leading-none font-inter tracking-tight" style={{ fontSize: 34 }}>{points}</span>
              <span className="text-white/30 text-[10px] tracking-[0.2em] mt-1 font-light">نقطة</span>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="mt-4 flex items-center gap-2 bg-white/[0.07] border border-white/[0.08] rounded-full px-4 py-2">
            <div className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg,#C9956A,#F0D4A8)' }} />
            <span className="text-[#C9956A] text-[11px] font-bold tracking-wide">كلاسيك</span>
            <div className="w-px h-3 bg-white/15" />
            <span className="text-white/35 text-[11px] font-light">٣ أكواب للفضي</span>
            <ArrowLeft size={10} className="text-white/25" />
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="flex justify-center px-6 mb-2">
          {[
            { val: '١٢', label: 'زيارة',       icon: '🏠' },
            { val: '٨',  label: 'هذا الشهر',  icon: '📅' },
            { val: '٦٥', label: 'ريال توفير', icon: '💰' },
          ].map((s, i, arr) => (
            <React.Fragment key={s.label}>
              <motion.div className="flex-1 flex flex-col items-center gap-0.5"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.09 }}>
                <span className="text-[15px] mb-0.5">{s.icon}</span>
                <p className="text-white text-[22px] font-bold leading-none font-inter">{s.val}</p>
                <p className="text-white/30 text-[10px] mt-0.5 font-light">{s.label}</p>
              </motion.div>
              {i < arr.length - 1 && <div className="w-px self-stretch bg-white/[0.07] mx-1 my-2" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Cream content ──────────────────────────────────────────── */}
      <div className="bg-[#FDFBF7] rounded-t-[30px] -mt-7 relative z-10 pt-5 pb-6">

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-2.5 mb-5 px-4">
          {[
            { icon: Calendar, label: 'احجز',  color: '#7B1618', bg: '#7B161810' },
            { icon: Users,    label: 'مجتمع', color: '#1A6B3A', bg: '#2D7D4610' },
            { icon: Tag,      label: 'عروضي', color: '#B5651D', bg: '#C9956A12' },
          ].map((a, i) => (
            <motion.button key={a.label}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }} whileTap={{ scale: 0.88 }}
              className="flex flex-col items-center py-4 rounded-2xl gap-2 relative overflow-hidden"
              style={{ background: a.bg, border: `1px solid ${a.color}18` }}>
              <div className="w-9 h-9 rounded-[12px] flex items-center justify-center" style={{ background: `${a.color}14` }}>
                <a.icon size={17} style={{ color: a.color }} />
              </div>
              <span className="text-[11px] font-bold" style={{ color: a.color }}>{a.label}</span>
            </motion.button>
          ))}
        </div>

        {/* ── تقويم حيز ── */}
        <HaizCalendar />

        {/* ── سؤال اليوم ── */}
        <QuestionOfDay />

        {/* Active challenge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}
          className="mx-4 mb-5 rounded-[18px] p-4 flex items-center gap-3 relative overflow-hidden"
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 20% 50%,rgba(48,209,88,0.08) 0%,transparent 65%)' }} />
          <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
            style={{ background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.15)' }}>
            <Zap size={18} className="text-[#30D158]" fill="rgba(48,209,88,0.3)" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[13px] font-bold leading-tight">تحدي الأسبوع: ٥ أكواب</p>
            <p className="text-white/35 text-[10px] mt-0.5">٤ من ٥ — كوب واحد فقط للفوز</p>
            <div className="flex gap-1 mt-2">
              {[0,1,2,3,4].map(i => (
                <motion.div key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  className="h-1.5 flex-1 rounded-full"
                  style={{ background: i < 4 ? 'linear-gradient(90deg,#30D158,#25A349)' : 'rgba(255,255,255,0.1)', transformOrigin: 'left' }} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="w-2 h-2 bg-[#30D158] rounded-full animate-pulse" />
            <span className="text-[#30D158] text-[9px] font-bold">مشارك</span>
          </div>
        </motion.div>

        {/* Recent activity */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-bold text-[#111]">آخر النشاطات</p>
            <button className="text-[11px] text-[#C4B59F] flex items-center gap-0.5">
              عرض الكل <ChevronLeft size={11} />
            </button>
          </div>
          <div className="space-y-1.5">
            {[
              { item: 'لاتيه إثيوبي — فلتر',  time: 'اليوم، ١١:٢٠ص', pts: '+١٥', emoji: '☕', color: '#7B1618' },
              { item: 'كرواسون بالزبدة',       time: 'أمس، ٣:٠٠م',    pts: '+٨',  emoji: '🥐', color: '#C9956A' },
              { item: 'باريستا ستايل خاص',    time: 'الأحد، ١٠:٤٥ص', pts: '+١٢', emoji: '🌟', color: '#2D7D46' },
            ].map((r, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="flex items-center gap-3 bg-white rounded-[16px] p-3.5 border border-[rgba(196,181,159,0.1)]"
                style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
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

          {/* Recommendations */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }}
            className="mt-4 rounded-[18px] p-4"
            style={{ background: 'linear-gradient(135deg,#FDF9F4,#F8F0E8)', border: '1px solid rgba(201,149,106,0.15)' }}>
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
    </div>
  );
}
