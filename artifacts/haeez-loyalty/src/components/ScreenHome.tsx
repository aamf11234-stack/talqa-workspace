import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronLeft, Calendar, ShoppingBag, Tag, Zap, Flame, ArrowLeft, Sparkles, Truck, Check } from 'lucide-react';
import { EventIconMap, ICalendarIcon, IGift } from './HaizIcons';
import { SpinWheelOverlay } from './SpinWheel';
import { ShakeHintBar } from './ShakeReveal';
import { useBrand } from '../BrandContext';
import type { BrandConfig } from '../BrandContext';
import { CheckoutModal } from './CheckoutFlow';
import type { CheckoutItem, CompletedOrderData } from './CheckoutFlow';
import { useOrders } from '../OrdersContext';

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

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
}

/* ── Progress rings ───────────────────────────────────────────────── */
function ProgressRings({ progress = 4 / 7 }: { progress?: number }) {
  const size = 140; const cx = size / 2; const cy = size / 2;
  const rings = [
    { r: 58, sw: 4.5, progress, id: 'gold', c1: '#7A3B18', c2: '#F0D4A8' },
    { r: 46, sw: 3,   progress: 0.82, id: 'red',  c1: '#6B3210', c2: '#E090A8' },
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
   Mood AI Picker
══════════════════════════════════════════════════════════════════ */
function MoodPicker({ onOrder }: { onOrder: (item: CheckoutItem) => void }) {
  const { brand } = useBrand();
  const [selected, setSelected] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState<BrandConfig['moods'][0] | null>(null);

  // Reset when brand changes
  useEffect(() => { setSelected(null); setResult(null); setThinking(false); }, [brand.type]);

  function pick(mood: BrandConfig['moods'][0]) {
    if (thinking) return;
    setSelected(mood.id);
    setResult(null);
    setThinking(true);
    setTimeout(() => { setThinking(false); setResult(mood); }, 1200);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22 }}
      className="mx-4 mb-5 rounded-[22px] overflow-hidden"
      style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
    >
      <div className="flex items-center gap-2.5 px-4 pt-4 pb-3">
        <div className="w-7 h-7 rounded-[10px] flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg,rgba(175,82,222,0.2),rgba(175,82,222,0.08))' }}>
          <Sparkles size={14} className="text-[#AF52DE]" />
        </div>
        <div>
          <p className="text-white text-[13px] font-bold leading-tight">شو مزاجك اليوم؟</p>
          <p className="text-white/30 text-[10px] font-light mt-0.5">الذكاء الاصطناعي يرشّح لك</p>
        </div>
        <div className="mr-auto px-2 py-0.5 rounded-full text-[7px] font-black tracking-widest text-[#AF52DE]"
          style={{ background: 'rgba(175,82,222,0.1)', border: '1px solid rgba(175,82,222,0.2)', fontFamily: 'ui-monospace,monospace' }}>AI</div>
      </div>

      <div className="flex gap-2 px-4 pb-4 overflow-x-auto scrollbar-none">
        {brand.moods.map((m) => {
          const isSel = selected === m.id;
          return (
            <motion.button key={m.id} whileTap={{ scale: 0.88 }} onClick={() => pick(m)}
              className="flex flex-col items-center gap-1.5 shrink-0 px-3.5 py-2.5 rounded-[16px] transition-all"
              style={{
                background: isSel ? 'rgba(175,82,222,0.15)' : 'rgba(255,255,255,0.05)',
                border: isSel ? '1.5px solid rgba(175,82,222,0.4)' : '1.5px solid rgba(255,255,255,0.06)',
                boxShadow: isSel ? '0 0 14px rgba(175,82,222,0.2)' : 'none',
              }}>
              <span className="text-[22px] leading-none">{m.emoji}</span>
              <span className="text-[9px] font-bold" style={{ color: isSel ? '#AF52DE' : 'rgba(255,255,255,0.4)' }}>{m.label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {(thinking || result) && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="mx-4 mb-4 rounded-[16px] p-3.5"
              style={{ background: 'rgba(175,82,222,0.08)', border: '1px solid rgba(175,82,222,0.15)' }}>
              {thinking ? (
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#AF52DE]"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                  <p className="text-[#AF52DE] text-[11px] font-medium">جاري تحليل مزاجك...</p>
                </div>
              ) : result ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-[8px] font-black tracking-widest text-[#AF52DE] mb-2"
                    style={{ fontFamily: 'ui-monospace,monospace' }}>AI RECOMMENDS · بناءً على مزاجك وزياراتك</p>
                  <div className="flex gap-2">
                    {result.items.map((item, i) => (
                      <motion.button key={i}
                        onClick={() => onOrder({ name: item, price: result.prices[i].replace(' ر', ''), emoji: result.emoji })}
                        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.12 }}
                        whileTap={{ scale: 0.94 }}
                        className="flex-1 rounded-[12px] p-2.5 flex flex-col gap-1 text-right"
                        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(175,82,222,0.2)' }}>
                        <span className="text-[18px] leading-none">{result.emoji}</span>
                        <p className="text-white text-[10px] font-semibold leading-snug">{item}</p>
                        <p className="text-[#7A3B18] text-[9px] font-bold">{result.prices[i]}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="w-3 h-3 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: 'linear-gradient(135deg,#6B3210,#6B3A1F)' }}>
                            <span className="text-white text-[5px] font-black">✓</span>
                          </div>
                          <span className="text-[#7A3B18] text-[8px] font-bold">اطلب</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Today's Special — brand-aware
══════════════════════════════════════════════════════════════════ */
function TodaySpecial({ onOrder }: { onOrder: (item: CheckoutItem) => void }) {
  const { brand } = useBrand();
  const t = brand.todaySpecial;
  const [liked, setLiked] = useState(false);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => { setLiked(false); setOrdered(false); }, [brand.type]);

  function handleOrder() {
    setOrdered(true);
    onOrder({ name: t.name, price: t.price, emoji: t.emoji });
    setTimeout(() => setOrdered(false), 3000);
  }

  return (
    <motion.div
      key={brand.type}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28 }}
      className="mx-4 mb-5 rounded-[26px] overflow-hidden relative"
      style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.35)' }}
    >
      {/* Full-bleed hero image */}
      <div className="relative" style={{ height: 180 }}>
        <img src={t.img} alt={t.name} className="w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }} />
        {/* Dark gradient layers */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.55) 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right,rgba(26,8,4,0.6) 0%,transparent 55%)' }} />

        {/* Badge + title on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(230,126,34,0.9)', backdropFilter: 'blur(8px)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-white text-[7px] font-bold tracking-wider">جارٍ الآن</span>
              </div>
              <span className="text-white/40 text-[7px] font-inter tracking-widest">{t.badge}</span>
            </div>
            <p className="text-white text-[20px] font-black leading-tight"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>{t.name}</p>
            <p className="text-white/55 text-[10px] font-light mt-0.5">{t.desc}</p>
          </div>
          {/* Like button */}
          <motion.button whileTap={{ scale: 0.82 }} onClick={() => setLiked(!liked)}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: liked ? 'rgba(255,59,48,0.25)' : 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              border: liked ? '1px solid rgba(255,59,48,0.4)' : '1px solid rgba(255,255,255,0.15)',
            }}>
            <motion.span animate={{ scale: liked ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.3 }}
              className="text-[16px]">{liked ? '❤️' : '🤍'}</motion.span>
          </motion.button>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="flex items-center justify-between px-4 py-3.5"
        style={{ background: 'linear-gradient(135deg,#130204,#200407)' }}>
        <div className="flex items-baseline gap-1.5">
          <span className="text-white font-black text-[24px] font-inter leading-none">{t.price}</span>
          <span className="text-[#7A3B18] text-[11px] font-bold">ريال</span>
          {/* Points earned */}
          <div className="flex items-center gap-0.5 mr-1 px-1.5 py-0.5 rounded-full"
            style={{ background: 'rgba(201,149,106,0.12)' }}>
            <span className="text-[#C4783A] text-[8px] font-bold">+١٥ نقطة</span>
          </div>
        </div>

        <motion.button
          onClick={handleOrder}
          whileTap={{ scale: 0.93 }}
          animate={ordered ? { scale: [1, 1.04, 1] } : {}}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-white text-[13px] font-bold relative overflow-hidden"
          style={{
            background: ordered
              ? 'linear-gradient(135deg,#30D158,#27A844)'
              : 'linear-gradient(135deg,#6B3210,#8A4A20)',
            boxShadow: ordered
              ? '0 4px 18px rgba(48,209,88,0.4)'
              : '0 4px 18px rgba(107,50,16,0.4)',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
          }}>
          {/* Shine overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(160deg,rgba(255,255,255,0.12) 0%,transparent 50%)' }} />
          {ordered ? (
            <><Check size={14} strokeWidth={2.5} /><span>تم الإضافة!</span></>
          ) : (
            <><svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-white shrink-0" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg><span>اطلب الآن</span></>
          )}
        </motion.button>
      </div>

      {/* Popular pick strip */}
      <div className="flex items-center gap-3 px-4 py-2.5"
        style={{ background: '#0D0205', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
        <img src={t.popImg} alt={t.popName} className="w-8 h-8 rounded-[8px] object-cover shrink-0"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }} />
        <div className="flex-1 min-w-0">
          <p className="text-white/60 text-[10px] font-semibold truncate">{t.popName}</p>
          <p className="text-[#7A3B18] text-[9px] font-bold">{t.popPrice}</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full shrink-0"
          style={{ background: 'rgba(201,149,106,0.08)', border: '0.5px solid rgba(201,149,106,0.15)' }}>
          <span className="text-white/30 text-[8px]">🔥</span>
          <span className="text-white/30 text-[8px]">الأشهر اليوم</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   تقويم العروض (same for both brands)
══════════════════════════════════════════════════════════════════ */
interface HaizEvent {
  id: string; title: string; subtitle: string; date: string;
  color: string; benefit: string; badge?: string; isNow?: boolean;
}
const haizEvents: HaizEvent[] = [
  { id: 'summer',   title: 'الإجازة الصيفية',  subtitle: 'نهايتها ٧ سبتمبر',      date: '2026-09-07', color: '#E67E22', benefit: 'خصم ١٠٪ على المشروبات الباردة طول الصيف', badge: 'جارٍ الآن', isNow: true },
  { id: 'national', title: 'اليوم الوطني ٩٦',  subtitle: '٢٣ سبتمبر ٢٠٢٦',        date: '2026-09-23', color: '#1A6B3A', benefit: 'منيو وطني خاص + ضعف النقاط يوم ٢٣' },
  { id: 'school',   title: 'بداية الدراسة',    subtitle: '٧ سبتمبر ٢٠٢٦',          date: '2026-09-07', color: '#2980B9', benefit: 'وجبة ترحيبية بعد أول يوم دراسة' },
  { id: 'winter',   title: 'إجازة الشتاء',     subtitle: 'ديسمبر ٢٠٢٦',            date: '2026-12-19', color: '#5D6D7E', benefit: 'منيو شتوي حصري + حساء مجاني' },
  { id: 'midyear',  title: 'إجازة النصف',      subtitle: 'يناير ٢٠٢٧',              date: '2027-01-15', color: '#8E44AD', benefit: 'خصم ٢٠٪ على الوجبات الجماعية' },
  { id: 'founding', title: 'يوم التأسيس',      subtitle: '٢٢ فبراير ٢٠٢٧',         date: '2027-02-22', color: '#6B3210', benefit: 'وجبة مجانية للأعضاء' },
  { id: 'eid',      title: 'عيد الفطر',         subtitle: 'مارس ٢٠٢٧ (تقريباً)',    date: '2027-03-20', color: '#7A3B18', benefit: 'هدية عيد خاصة + مضاعفة النقاط' },
];

function useTodayDates() {
  const now = new Date();
  const fmtHijri = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', opts).format(now);
  const fmtGreg = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('ar-SA', opts).format(now);
  return {
    hijriDay:     fmtHijri({ day: 'numeric' }),
    hijriMonth:   fmtHijri({ month: 'long' }),
    hijriYear:    fmtHijri({ year: 'numeric' }),
    hijriWeekday: fmtHijri({ weekday: 'long' }),
    gregDay:      fmtGreg({ day: 'numeric' }),
    gregMonth:    fmtGreg({ month: 'long' }),
    gregYear:     fmtGreg({ year: 'numeric' }),
  };
}

function HaizCalendar() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const dt = useTodayDates();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="mx-4 mb-6 rounded-[24px] overflow-hidden relative"
      style={{
        background: 'linear-gradient(170deg,#080002 0%,#200407 45%,#3D0809 75%,#0D0205 100%)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[24px]"
        style={{ background: 'radial-gradient(ellipse at 70% 20%,rgba(201,149,106,0.12) 0%,transparent 60%)' }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '10px 10px' }} />

      {/* Date section */}
      <div className="relative overflow-hidden select-none"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', minHeight: 172 }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 10% 100%,rgba(196,120,58,0.5) 0%,transparent 55%)' }} />
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none" style={{ paddingRight: 8 }}>
          <span style={{ fontSize: 128, fontWeight: 900, color: '#fff', opacity: 0.035, letterSpacing: '-0.03em', lineHeight: 1, whiteSpace: 'nowrap', transform: 'translateY(8px)' }}>
            {dt.hijriMonth}
          </span>
        </div>
        <div className="relative px-5 pt-4 pb-5 flex flex-col gap-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.2)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#30D158]" style={{ boxShadow: '0 0 5px #30D158' }} />
              <span className="text-[#30D158] text-[9px] font-bold">{dt.hijriWeekday}</span>
            </div>
            <span className="text-[6px] font-black tracking-[0.32em] text-[#7A3B18]/35"
              style={{ fontFamily: 'ui-monospace,monospace' }}>OFFERS CALENDAR</span>
          </div>
          <div className="flex items-end gap-0">
            <span style={{
              fontSize: 96, fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 0.85,
              background: 'linear-gradient(175deg,#FAECD0 0%,#7A3B18 45%,#7B4A1A 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 24px rgba(201,149,106,0.45))', marginLeft: -4,
            }}>{dt.hijriDay}</span>
            <div className="flex flex-col justify-end pb-2 mr-1" style={{ gap: 2 }}>
              <span style={{ fontSize: 34, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>{dt.hijriMonth}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(201,149,106,0.55)', letterSpacing: '0.15em', fontFamily: 'ui-monospace,monospace' }}>{dt.hijriYear} هـ</span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div style={{ width: 28, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,149,106,0.5))', transform: 'skewX(-25deg)' }} />
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#7A3B18', boxShadow: '0 0 6px rgba(201,149,106,0.7)' }} />
            <div className="flex items-baseline gap-2">
              <span style={{ fontSize: 22, fontWeight: 900, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.03em', lineHeight: 1 }}>{dt.gregDay}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '-0.01em' }}>{dt.gregMonth}</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.18)', fontFamily: 'ui-monospace,monospace' }}>{dt.gregYear} م</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative px-5 pt-4 pb-3 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <p className="text-[8px] font-black tracking-[0.28em] text-[#7A3B18] mb-1"
            style={{ fontFamily: 'ui-monospace,monospace' }}>OFFERS CALENDAR</p>
          <div className="flex items-center gap-2">
            <ICalendarIcon size={18} color="#7A3B18" sw={1.4} />
            <h3 className="text-[17px] font-black text-white leading-none">تقويم العروض</h3>
          </div>
        </div>
        <div className="text-left">
          <p className="text-white/20 text-[8px] font-light">المناسبات والعروض</p>
          <p className="text-white/15 text-[8px] mt-0.5 font-inter">{haizEvents.length} مناسبة</p>
        </div>
      </div>

      {/* Events */}
      <div className="relative divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        {haizEvents.map((ev, i) => {
          const days = daysUntil(ev.date);
          const isOpen = expanded === ev.id;
          return (
            <motion.div key={ev.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.055 }}>
              <motion.button className="w-full text-right" whileTap={{ scale: 0.985 }} onClick={() => setExpanded(isOpen ? null : ev.id)}>
                <div className="flex items-center gap-3.5 px-5 py-3.5">
                  {(() => { const EvIcon = EventIconMap[ev.id]; return (
                    <div className="w-10 h-10 rounded-[13px] flex items-center justify-center shrink-0"
                      style={{ background: `${ev.color}20`, border: `1px solid ${ev.color}35`, boxShadow: ev.isNow ? `0 0 14px ${ev.color}35` : 'none' }}>
                      {EvIcon && <EvIcon size={20} color={ev.color} sw={1.4} />}
                    </div>
                  ); })()}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[12px] font-bold text-white leading-snug">{ev.title}</p>
                      {ev.isNow && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full shrink-0"
                          style={{ background: `${ev.color}25`, border: `1px solid ${ev.color}40` }}>
                          <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: ev.color }} />
                          <span className="text-[7px] font-black" style={{ color: ev.color }}>الآن</span>
                        </div>
                      )}
                    </div>
                    <p className="text-white/30 text-[9px] font-light">{ev.subtitle}</p>
                  </div>
                  <div className="shrink-0 text-left flex flex-col items-end">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-[20px] font-black font-inter leading-none"
                        style={{ color: ev.isNow ? ev.color : 'rgba(255,255,255,0.7)' }}>{days}</span>
                      <span className="text-[8px] text-white/25 mb-0.5">يوم</span>
                    </div>
                    <span className="text-[7px] font-inter" style={{ color: isOpen ? ev.color : 'rgba(255,255,255,0.18)' }}>
                      {isOpen ? '▲ إخفاء' : '▼ العرض'}
                    </span>
                  </div>
                </div>
              </motion.button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                    <div className="mx-5 mb-3.5 px-4 py-3 rounded-[14px] flex items-start gap-2.5"
                      style={{ background: `${ev.color}12`, border: `1px solid ${ev.color}25` }}>
                      <div className="shrink-0 mt-0.5"><IGift size={16} color={ev.color} sw={1.4} /></div>
                      <div>
                        <p className="text-[7.5px] font-black tracking-widest mb-1"
                          style={{ color: ev.color, fontFamily: 'ui-monospace,monospace' }}>عرض المحل الحصري</p>
                        <p className="text-white/70 text-[11px] leading-relaxed">{ev.benefit}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      <div className="px-5 py-3 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-white/15 text-[8px]">اضغط على أي مناسبة لتشوف العرض ✦</p>
      </div>
    </motion.div>
  );
}

/* ── Notifications Panel ─────────────────────────────────────────── */
const NOTIFS = [
  { id: 1, icon: '✓',  bg: '#30D158', color: '#30D158', title: 'طلبك جاهز للاستلام', sub: 'رقم #٢٠٢٦-٠٤٧١ — تفضل الآن', time: 'الآن' },
  { id: 2, icon: '⭐', bg: '#7A3B18', color: '#7A3B18', title: '+٢٥ نقطة أُضيفت لرصيدك', sub: 'من طلبك الأخير — رصيدك ٤٨٠ نقطة', time: 'قبل ١٥ دقيقة' },
  { id: 3, icon: '🔥', bg: '#FF3B30', color: '#FF3B30', title: 'خصم ٢٠٪ على طبق اليوم', sub: 'العرض ينتهي هذه الليلة فقط', time: 'قبل ساعة' },
  { id: 4, icon: '👋', bg: '#007AFF', color: '#007AFF', title: 'نفتقدك — وجبتك بتنتظر', sub: 'مر ٣ أيام على آخر زيارة لك', time: 'البارحة' },
];

function NotificationsPanel({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40 rounded-[48px]" />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="absolute top-16 left-4 right-4 z-50 rounded-[22px] overflow-hidden"
        style={{ background: '#1C1C1E', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
          <p className="text-white text-[13px] font-bold">الإشعارات</p>
          <div className="flex items-center gap-2">
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold text-white"
              style={{ background: '#FF3B30' }}>٤</span>
            <button onClick={onClose}
              className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-[11px]">×</button>
          </div>
        </div>
        <div className="py-1">
          {NOTIFS.map((n, i) => (
            <motion.div key={n.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 px-4 py-3 border-b border-white/5 last:border-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[13px]"
                style={{ background: `${n.bg}22` }}>
                {n.icon === '✓' ? (
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke={n.color} strokeWidth={3} strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <span>{n.icon}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[11px] font-semibold leading-snug">{n.title}</p>
                <p className="text-white/40 text-[9px] font-light mt-0.5 leading-snug">{n.sub}</p>
              </div>
              <p className="text-white/25 text-[8px] shrink-0 mt-0.5">{n.time}</p>
            </motion.div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-white/8">
          <button onClick={onClose} className="w-full text-center text-[11px] font-medium" style={{ color: '#007AFF' }}>
            تعيين الكل كمقروء
          </button>
        </div>
      </motion.div>
    </>
  );
}

/* ── Quick Book Sheet ────────────────────────────────────────────── */
const SLOTS = [
  { time: '١٢:٠٠ م', avail: true  },
  { time: '١٢:٣٠ م', avail: true  },
  { time: '١:٠٠ م',  avail: false },
  { time: '٧:٠٠ م',  avail: true  },
  { time: '٧:٣٠ م',  avail: true  },
  { time: '٨:٠٠ م',  avail: true  },
];

function QuickBookSheet({ onClose }: { onClose: () => void }) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [pax, setPax] = useState(2);
  const [done, setDone] = useState(false);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={!done ? onClose : undefined}
        className="absolute inset-0 bg-black/70 backdrop-blur-md z-40 rounded-[48px]" />

      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 z-50 rounded-t-[28px] overflow-hidden"
        style={{ background: '#0D0200' }}>

        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-9 h-1 rounded-full bg-white/10" />
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            /* ── Success state ── */
            <motion.div key="done"
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 px-6 pt-6 pb-10">

              {/* Ring + check */}
              <div className="relative w-20 h-20">
                {[0,1].map(i => (
                  <motion.div key={i}
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2.2 + i * 0.4, opacity: 0 }}
                    transition={{ duration: 1.1, delay: i * 0.18, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full border-2 border-[#30D158]" />
                ))}
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#30D158,#25A349)', boxShadow: '0 12px 36px rgba(48,209,88,0.45)' }}>
                  <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </motion.div>
              </div>

              <div className="text-center">
                <p className="text-white text-[20px] font-black mb-1">تم الحجز! 🎉</p>
                <p className="text-white/50 text-[12px] font-light">طاولة لـ{pax} أشخاص — {selectedSlot}</p>
              </div>

              {/* Booking card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="w-full rounded-[20px] p-4"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {[
                  { label: 'الموعد',       val: selectedSlot ?? '' },
                  { label: 'عدد الأشخاص', val: `${pax} أشخاص`    },
                  { label: 'الفرع',        val: 'براون دوز — صبيا' },
                  { label: 'الحالة',       val: 'مؤكّد ✓', color: '#30D158' },
                ].map((r, i) => (
                  <div key={i} className={`flex justify-between py-2.5 ${i < 3 ? 'border-b border-white/5' : ''}`}>
                    <span className="text-white/35 text-[11px]">{r.label}</span>
                    <span className="text-[11px] font-bold" style={{ color: r.color ?? 'white' }}>{r.val}</span>
                  </div>
                ))}
              </motion.div>

              <p className="text-white/20 text-[10px]">ستصلك رسالة تأكيد على جوالك</p>

              <motion.button whileTap={{ scale: 0.97 }} onClick={onClose}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                className="w-full py-4 rounded-[18px] font-bold text-[14px] text-white"
                style={{ background: 'linear-gradient(135deg,#6B3210,#7A3B18)', boxShadow: '0 8px 24px rgba(107,50,16,0.45)' }}>
                تمام ☕
              </motion.button>
            </motion.div>

          ) : (
            /* ── Booking form ── */
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pt-4 pb-8">

              <p className="text-[9px] font-black tracking-[0.28em] text-[#C4783A] mb-1"
                style={{ fontFamily: 'ui-monospace,monospace' }}>RESERVE · احجز طاولة</p>
              <p className="text-white text-[21px] font-black mb-5">اختر الموعد</p>

              {/* Pax selector */}
              <div className="flex items-center justify-between mb-4 px-4 py-3.5 rounded-[18px]"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-white/70 text-[13px] font-semibold">عدد الأشخاص</p>
                <div className="flex items-center gap-4">
                  <button onClick={() => setPax(p => Math.max(1, p - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(196,120,58,0.15)', border: '1px solid rgba(196,120,58,0.25)' }}>
                    <span className="text-[20px] font-bold text-[#C4783A] leading-none">−</span>
                  </button>
                  <motion.span key={pax} initial={{ scale: 1.3 }} animate={{ scale: 1 }}
                    className="text-white text-[18px] font-black w-5 text-center">{pax}</motion.span>
                  <button onClick={() => setPax(p => Math.min(10, p + 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(196,120,58,0.15)', border: '1px solid rgba(196,120,58,0.25)' }}>
                    <span className="text-[20px] font-bold text-[#C4783A] leading-none">+</span>
                  </button>
                </div>
              </div>

              {/* Slots */}
              <p className="text-white/30 text-[10px] font-bold tracking-widest mb-3">المواعيد المتاحة اليوم</p>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {SLOTS.map(s => {
                  const active = selectedSlot === s.time;
                  return (
                    <button key={s.time}
                      disabled={!s.avail}
                      onClick={() => setSelectedSlot(s.time)}
                      className="py-3 rounded-[14px] text-[12px] font-bold transition-all relative"
                      style={{
                        background: active
                          ? 'linear-gradient(135deg,#6B3210,#8B4515)'
                          : s.avail ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                        color: active ? 'white' : s.avail ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)',
                        border: active ? 'none' : `1px solid rgba(255,255,255,${s.avail ? '0.08' : '0.03'})`,
                        boxShadow: active ? '0 4px 16px rgba(107,50,16,0.5)' : 'none',
                      }}>
                      {s.time}
                      {!s.avail && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[6px] text-white/20">محجوز</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* CTA */}
              <motion.button whileTap={{ scale: 0.97 }}
                onClick={() => selectedSlot && setDone(true)}
                className="w-full py-4 rounded-[18px] font-bold text-[14px] transition-all"
                style={{
                  background: selectedSlot
                    ? 'linear-gradient(135deg,#6B3210,#7A3B18)'
                    : 'rgba(255,255,255,0.06)',
                  color: selectedSlot ? 'white' : 'rgba(255,255,255,0.25)',
                  boxShadow: selectedSlot ? '0 8px 24px rgba(107,50,16,0.5)' : 'none',
                }}>
                {selectedSlot ? `احجز لـ${pax} أشخاص — ${selectedSlot}` : 'اختر موعداً أولاً'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/* ── Offers Sheet ───────────────────────────────────────────────── */
const OFFERS = [
  { emoji: '☕', title: 'قهوتان للسعر الواحد',    sub: 'صالح للأعضاء فقط · حتى ١٢م',   color: '#7A3B18', grad: 'linear-gradient(135deg,#1A0804,#3A1408)', tag: 'عضوية',   timer: '٢:١٨:٤٥' },
  { emoji: '🍔', title: 'برجر + مشروب بـ٤٩ ريال', sub: 'وفر ٢٢٪ — ينتهي الليلة',        color: '#C4783A', grad: 'linear-gradient(135deg,#1A0E00,#3A2208)', tag: 'الأشهر',  timer: '٩:٤٢:٠٠' },
  { emoji: '🎂', title: 'حلى مجاناً مع أي طلب',   sub: 'لأعياد الميلاد هذا الشهر',      color: '#2D7D46', grad: 'linear-gradient(135deg,#001A0A,#023818)', tag: 'مناسبة',  timer: null },
];

function OffersSheet({ onClose }: { onClose: () => void }) {
  const [claimed, setClaimed] = useState<number | null>(null);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-md z-40 rounded-[48px]" />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 z-50 rounded-t-[28px] overflow-hidden"
        style={{ background: '#0D0200' }}>

        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-9 h-1 rounded-full bg-white/10" />
        </div>

        {/* Header */}
        <div className="px-5 pt-3 pb-5">
          <p className="text-[9px] font-black tracking-[0.28em] text-[#C4783A] mb-1"
            style={{ fontFamily: 'ui-monospace,monospace' }}>EXCLUSIVE · حصري للأعضاء</p>
          <p className="text-white text-[21px] font-black">عروضك الحالية</p>
        </div>

        {/* Offers */}
        <div className="flex flex-col gap-2.5 px-4 pb-6">
          {OFFERS.map((o, i) => (
            <motion.button key={i}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setClaimed(i)}
              className="relative overflow-hidden rounded-[20px] p-4 flex items-center gap-3.5 text-right w-full"
              style={{ background: claimed === i ? 'rgba(48,209,88,0.15)' : o.grad, border: `1px solid ${claimed === i ? '#30D158' : o.color}30` }}>

              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.04) 0%,transparent 55%)' }} />

              {/* Emoji */}
              <div className="w-[50px] h-[50px] rounded-[15px] flex items-center justify-center text-[24px] shrink-0"
                style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${o.color}35` }}>
                {claimed === i ? '✅' : o.emoji}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-white text-[13px] font-bold leading-tight">{o.title}</p>
                </div>
                <p className="text-white/40 text-[10px] font-light">{o.sub}</p>
                {o.timer && claimed !== i && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="text-[8px]">⏱</span>
                    <span className="text-[9px] font-black font-inter" style={{ color: o.color }}>{o.timer}</span>
                    <span className="text-white/30 text-[8px]">متبقي</span>
                  </div>
                )}
                {claimed === i && (
                  <p className="text-[#30D158] text-[10px] font-bold mt-1">✓ تم تفعيل العرض</p>
                )}
              </div>

              {/* Tag */}
              <span className="shrink-0 text-[8px] font-black px-2 py-1 rounded-full"
                style={{ background: `${o.color}25`, color: o.color, border: `1px solid ${o.color}35` }}>
                {claimed === i ? 'مفعّل' : o.tag}
              </span>
            </motion.button>
          ))}

          <motion.button whileTap={{ scale: 0.97 }} onClick={onClose}
            className="mt-1 w-full py-3.5 rounded-[18px] font-semibold text-[13px] text-white/40"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
            إغلاق
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Busy Meter
══════════════════════════════════════════════════════════════════ */
function BusyMeter() {
  const hour = new Date().getHours();
  const levels = [
    { range:[0,7],   label:'هادي',   sub:'لا انتظار الآن',             color:'#30D158', pct:15, eta:'٢ دقيقة'  },
    { range:[7,9],   label:'خفيف',   sub:'صباح هادي — أسرع وقت',       color:'#30D158', pct:28, eta:'٣ دقائق' },
    { range:[9,12],  label:'عادي',   sub:'إقبال متوسط',                color:'#FF9F0A', pct:52, eta:'٧ دقائق' },
    { range:[12,14], label:'مزدحم',  sub:'ذروة الغداء — انتظر شوي',    color:'#FF3B30', pct:88, eta:'١٥ دقيقة'},
    { range:[14,17], label:'عادي',   sub:'هدأ الوضع بعد الغداء',       color:'#FF9F0A', pct:45, eta:'٦ دقائق' },
    { range:[17,20], label:'مزدحم',  sub:'ذروة المساء ☕',              color:'#FF9F0A', pct:72, eta:'١٢ دقيقة'},
    { range:[20,24], label:'هادي',   sub:'قبيل الإغلاق — ارتاح',       color:'#30D158', pct:22, eta:'٤ دقائق' },
  ];
  const curr = levels.find(l => hour >= l.range[0] && hour < l.range[1]) ?? levels[0];
  /* 24-hr sparkline */
  const sparkPcts = [10,25,40,55,85,62,50,38,30,35,48,65,88,82,60,45,55,70,75,68,55,40,28,12];

  return (
    <motion.div
      initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
      transition={{ delay:0.24 }}
      className="mx-4 mb-5 rounded-[22px] overflow-hidden"
      style={{ background:'#fff', border:'1px solid rgba(196,181,159,0.18)', boxShadow:'0 4px 24px rgba(0,0,0,0.07)' }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
            style={{ background: `${curr.color}15` }}>
            <motion.div animate={{ scale:[1,1.25,1], opacity:[1,0.6,1] }}
              transition={{ duration:1.6, repeat:Infinity }}
              className="w-2 h-2 rounded-full"
              style={{ background:curr.color, boxShadow:`0 0 8px ${curr.color}` }} />
          </div>
          <div>
            <p className="text-[12px] font-bold text-[#111] leading-tight">مؤشر الازدحام الآن</p>
            <p className="text-[9px] text-[#BBB] font-light mt-0.5">{curr.sub}</p>
          </div>
        </div>
        <div className="text-left">
          <p className="text-[14px] font-black leading-none" style={{ color:curr.color }}>{curr.label}</p>
          <p className="text-[9px] text-[#CCC] mt-0.5 font-inter tracking-wide">⏱ {curr.eta}</p>
        </div>
      </div>

      {/* Progress arc bar */}
      <div className="px-4 mb-3">
        <div className="relative h-2 rounded-full overflow-hidden"
          style={{ background:'rgba(196,181,159,0.15)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${curr.pct}%` }}
            transition={{ duration: 1, ease: [0.4,0,0.2,1], delay: 0.3 }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: `linear-gradient(90deg,${curr.color}88,${curr.color})`,
              boxShadow: `0 0 8px ${curr.color}55`,
            }} />
          {/* Now indicator dot */}
          <motion.div
            initial={{ left: 0 }} animate={{ left: `calc(${curr.pct}% - 4px)` }}
            transition={{ duration: 1, ease: [0.4,0,0.2,1], delay: 0.3 }}
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
            style={{ boxShadow:`0 0 0 2px ${curr.color}` }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[7px] text-[#CCC]">هادي</span>
          <span className="text-[7px] text-[#CCC]">مزدحم</span>
        </div>
      </div>

      {/* 24-hr sparkline */}
      <div className="px-4 pb-4">
        <p className="text-[7px] text-[#CCC] font-inter mb-1.5">توقع الازدحام خلال اليوم</p>
        <div className="flex items-end gap-0.5" style={{ height: 28 }}>
          {sparkPcts.map((p, i) => {
            const isNow = i === hour;
            return (
              <motion.div key={i}
                initial={{ height: 2 }}
                animate={{ height: `${(p / 100) * 28}px` }}
                transition={{ duration: 0.6, delay: 0.05 + i * 0.02, ease: 'easeOut' }}
                className="flex-1 rounded-sm"
                style={{
                  background: isNow ? curr.color : `rgba(196,181,159,${p > 60 ? 0.4 : 0.2})`,
                  boxShadow: isNow ? `0 0 6px ${curr.color}` : 'none',
                }} />
            );
          })}
        </div>
        <div className="flex justify-between mt-0.5">
          <span className="text-[6px] text-[#DDD] font-inter">١٢ص</span>
          <span className="text-[6px] font-bold" style={{ color: curr.color }}>الآن</span>
          <span className="text-[6px] text-[#DDD] font-inter">١٢م</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Main Screen
══════════════════════════════════════════════════════════════════ */
export function ScreenHome({ onShakeTrigger }: { onShakeTrigger?: () => void }) {
  const { brand } = useBrand();
  const { addOrder } = useOrders();
  const points = useCounter(480, 1400, 200);
  const [showSpin, setShowSpin] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<CheckoutItem | null>(null);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showBookSheet, setShowBookSheet] = useState(false);
  const [showOffersSheet, setShowOffersSheet] = useState(false);

  function handleOrderComplete(data: CompletedOrderData) {
    addOrder({
      itemName: data.itemName,
      itemEmoji: data.itemEmoji,
      totalPrice: data.totalPrice,
      basePrice: data.basePrice,
      orderType: data.orderType,
      payMethod: data.payMethod,
      pts: data.pts,
      timestamp: data.timestamp,
    });
  }
  const hour = new Date().getHours();
  const greeting =
    hour < 5  ? 'ليلة طيبة 🌙' :
    hour < 12 ? 'صباح النور ☀️' :
    hour < 17 ? 'طاب نهارك 🌤️' :
                'مساء الخير 🌙';

  return (
    <div className="h-full relative overflow-hidden">
      {/* Overlays — clipped inside phone frame */}
      <AnimatePresence>
        {showSpin && <SpinWheelOverlay onClose={() => setShowSpin(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {pendingOrder && (
          <div className="absolute inset-0 z-50">
            <CheckoutModal
              item={pendingOrder}
              brandName={brand.name}
              brandType={brand.type}
              logoImg={brand.logoImg}
              onClose={() => setPendingOrder(null)}
              onOrderComplete={handleOrderComplete}
            />
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showNotifs && <NotificationsPanel onClose={() => setShowNotifs(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showBookSheet && <QuickBookSheet onClose={() => setShowBookSheet(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showOffersSheet && <OffersSheet onClose={() => setShowOffersSheet(false)} />}
      </AnimatePresence>

      {/* Scrollable content */}
      <div className="h-full overflow-y-auto scrollbar-none">

      {/* ── Dark hero ── */}
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(175deg,#060001 0%,#120105 25%,#220208 50%,#0E0103 75%,#040001 100%)',
        paddingBottom: '56px',
      }}>
        {/* Aurora orb 1 — amber */}
        <div className="absolute pointer-events-none animate-aurora-1"
          style={{ top:'-20%', right:'-10%', width:220, height:220, borderRadius:'50%',
            background:'radial-gradient(circle,rgba(200,100,20,0.55) 0%,rgba(160,60,10,0.2) 50%,transparent 70%)',
            filter:'blur(32px)' }} />
        {/* Aurora orb 2 — crimson */}
        <div className="absolute pointer-events-none animate-aurora-2"
          style={{ bottom:'-10%', left:'-5%', width:180, height:180, borderRadius:'50%',
            background:'radial-gradient(circle,rgba(120,15,25,0.7) 0%,rgba(80,5,15,0.3) 50%,transparent 70%)',
            filter:'blur(28px)' }} />
        {/* Aurora orb 3 — gold */}
        <div className="absolute pointer-events-none animate-aurora-3"
          style={{ top:'40%', left:'35%', width:140, height:140, borderRadius:'50%',
            background:'radial-gradient(circle,rgba(180,120,40,0.3) 0%,transparent 70%)',
            filter:'blur(20px)' }} />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.028]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />
        {/* Cool bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom,transparent,rgba(4,0,1,0.6))' }} />

        {/* Top row */}
        <div className="flex items-start justify-between px-5 pt-5 mb-6">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[11px] font-light tracking-wide"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >{greeting}</motion.p>
            <motion.p
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              className="text-[23px] font-extrabold mt-0.5 tracking-tight"
              style={{
                background: 'linear-gradient(135deg,#FFFFFF 30%,rgba(200,150,100,0.9) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 8px rgba(200,140,80,0.25))',
              }}
            >عبدالإله علي</motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.18, type: 'spring', stiffness: 400, damping: 25 }}
              key={brand.type}
              className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-400/25 w-fit"
              style={{ background: 'rgba(255,140,0,0.10)', backdropFilter: 'blur(8px)' }}
            >
              <Flame size={11} className="text-orange-400" fill="rgba(255,140,0,0.7)" />
              <span className="text-orange-300 text-[10px] font-bold font-inter">{brand.streak.label}</span>
            </motion.div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <motion.button
              whileTap={{ scale: 0.84 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              onClick={() => setShowNotifs(v => !v)}
              className="relative w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: showNotifs ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: showNotifs ? '0 0 12px rgba(255,255,255,0.1)' : 'none',
              }}
            >
              <Bell size={15} className={showNotifs ? 'text-white' : 'text-white/50'} />
              {!showNotifs && (
                <motion.span
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF3B30] rounded-full border border-[#0D0205]"
                  style={{ boxShadow: '0 0 6px rgba(255,59,48,0.8)' }}
                />
              )}
            </motion.button>
            <AnimatePresence mode="wait">
              <motion.div key={brand.logoImg}
                initial={{ scale: 0.75, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.75, opacity: 0, rotate: 5 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 380, damping: 22 }}
                className="relative"
              >
                <img src={brand.logoImg} alt="" className="w-10 h-10 rounded-[12px] object-cover"
                  style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.5), 0 0 0 1.5px rgba(255,255,255,0.1)' }} />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#30D158] rounded-full border-2 border-[#0D0205]"
                  style={{ boxShadow: '0 0 8px rgba(48,209,88,0.7)' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Points card — luxury glassmorphism */}
        <div className="px-5 mb-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
            className="rounded-[26px] overflow-hidden relative"
            style={{
              background: 'linear-gradient(145deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.03) 100%)',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.10)',
            }}>
            {/* Warm shimmer top-right */}
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 80% 20%,rgba(201,149,106,0.18) 0%,transparent 65%)' }} />
            {/* Horizontal gold line at top */}
            <div className="absolute top-0 left-8 right-8 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(201,149,106,0.4),transparent)' }} />

            <div className="relative p-5">
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[8px] font-black tracking-[0.3em] mb-2"
                    style={{ color: 'rgba(201,149,106,0.5)', fontFamily: 'ui-monospace,monospace' }}>LOYALTY · براون دوز</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-black leading-none tabular-nums"
                      style={{
                        fontSize: 52, letterSpacing: '-0.04em',
                        background: 'linear-gradient(175deg,#FAECD0 0%,#C4783A 45%,#7A3B18 100%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 2px 12px rgba(201,149,106,0.3))',
                      }}>{points}</span>
                    <span className="text-[13px] font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>نقطة</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 pt-1">
                  {/* Tier badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px]"
                    style={{ background: 'rgba(201,149,106,0.12)', border: '1px solid rgba(201,149,106,0.2)' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C4783A', boxShadow: '0 0 5px rgba(196,120,58,0.8)' }} />
                    <span className="text-[11px] font-bold" style={{ color: '#C4783A' }}>كلاسيك</span>
                  </div>
                  <p className="text-[9px] font-light" style={{ color: 'rgba(255,255,255,0.2)' }}>٣ طلبات للفضي</p>
                </div>
              </div>

              {/* Progress bar — luxury */}
              <div className="mb-1.5">
                <div className="rounded-full overflow-hidden relative" style={{ height: 4, background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: '57%' }}
                    transition={{ duration: 1.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ background: 'linear-gradient(90deg,#4A1C08,#C4783A,#F0D4A8)' }}>
                    {/* Shimmer sweep */}
                    <motion.div className="absolute inset-y-0 w-8"
                      initial={{ left: '-2rem' }} animate={{ left: '120%' }}
                      transition={{ duration: 1.2, delay: 1.2, ease: 'easeInOut' }}
                      style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)' }} />
                  </motion.div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[8px]" style={{ color: 'rgba(255,255,255,0.15)' }}>فضي</span>
                  <span className="text-[8px]" style={{ color: 'rgba(255,255,255,0.15)' }}>كلاسيك</span>
                </div>
              </div>
            </div>

            {/* Bottom strip */}
            <div className="flex items-center gap-4 px-5 py-3 relative"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
              {brand.stats.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <div className="w-px h-6 shrink-0" style={{ background: 'rgba(255,255,255,0.07)' }} />}
                  <div className="flex-1 text-center">
                    <p className="text-white text-[16px] font-bold leading-none font-inter">{s.val}</p>
                    <p className="text-[8px] font-light mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>{s.label}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Shake hint + Spin button */}
        <div className="flex items-center justify-center gap-3 pb-2">
          <ShakeHintBar onReveal={onShakeTrigger ?? (() => {})} />
          <motion.button whileTap={{ scale: 0.92 }} onClick={() => setShowSpin(true)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full"
            style={{ background: 'linear-gradient(135deg,rgba(201,149,106,0.18),rgba(201,149,106,0.08))', border: '1px solid rgba(201,149,106,0.3)' }}>
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-[15px] leading-none">🎰</motion.span>
            <span className="text-[#7A3B18] text-[11px] font-bold">دوّر واربح</span>
          </motion.button>
        </div>
      </div>

      {/* ── Cream content ── */}
      <div className="rounded-t-[32px] -mt-8 relative z-10 pt-5 pb-6"
        style={{ background: 'linear-gradient(180deg,#F5F2EC 0%,#FDFBF7 60%)' }}>

        {/* Quick actions — pill row */}
        <div className="flex gap-2.5 mb-5 px-4">
          {[
            { icon: ShoppingBag, label: 'اطلب',  onTap: () => setPendingOrder({ name: brand.todaySpecial.name, price: brand.todaySpecial.price, emoji: brand.todaySpecial.emoji }) },
            { icon: Calendar,    label: 'احجز',  onTap: () => setShowBookSheet(true) },
            { icon: Tag,         label: 'عروضي', onTap: () => setShowOffersSheet(true) },
          ].map((a, i) => (
            <motion.button key={a.label}
              whileTap={{ scale: 0.88 }}
              onClick={a.onTap}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="flex-1 flex flex-col items-center py-4 rounded-[22px] gap-2 relative overflow-hidden"
              style={{
                background: 'white',
                border: '1px solid rgba(196,181,159,0.18)',
                boxShadow: '0 4px 18px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.8) inset',
              }}>
              {/* Top shimmer */}
              <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent)' }} />
              <div className="w-10 h-10 rounded-[14px] flex items-center justify-center"
                style={{ background: 'linear-gradient(145deg,#F5EDE4,#EDE0D2)', boxShadow: '0 2px 8px rgba(107,50,16,0.12)' }}>
                <a.icon size={17} style={{ color: '#6B3210' }} />
              </div>
              <span className="text-[11px] font-bold" style={{ color: '#6B3210' }}>{a.label}</span>
            </motion.button>
          ))}
        </div>

        {/* مؤشر الازدحام */}
        <BusyMeter />

        {/* طبق/قهوة اليوم */}
        <TodaySpecial onOrder={setPendingOrder} />

        {/* Mood AI */}
        <MoodPicker onOrder={setPendingOrder} />

        {/* Challenge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
          className="mx-4 mb-5 rounded-[18px] p-4 flex items-center gap-3 relative overflow-hidden"
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 20% 50%,rgba(48,209,88,0.08) 0%,transparent 65%)' }} />
          <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
            style={{ background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.15)' }}>
            <Zap size={18} className="text-[#30D158]" fill="rgba(48,209,88,0.3)" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[13px] font-bold leading-tight">{brand.challenge.title}</p>
            <p className="text-white/35 text-[10px] mt-0.5">{brand.challenge.desc}</p>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: brand.challenge.total }).map((_, idx) => (
                <motion.div key={idx} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + idx * 0.07 }}
                  className="h-1.5 flex-1 rounded-full"
                  style={{ background: idx < brand.challenge.progress ? 'linear-gradient(90deg,#30D158,#25A349)' : 'rgba(255,255,255,0.1)', transformOrigin: 'left' }} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="w-2 h-2 bg-[#30D158] rounded-full animate-pulse" />
            <span className="text-[#30D158] text-[9px] font-bold">نشط</span>
          </div>
        </motion.div>

        {/* Recent orders */}
        <div className="px-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-bold text-[#111]">آخر الطلبات</p>
            <button className="text-[11px] text-[#C4B59F] flex items-center gap-0.5">
              عرض الكل <ChevronLeft size={11} />
            </button>
          </div>
          <div className="space-y-1.5">
            {brand.recentOrders.map((r, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.08 }}
                className="flex items-center gap-3 bg-white rounded-[16px] p-3.5 border border-[rgba(196,181,159,0.1)]"
                style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-[18px] shrink-0"
                  style={{ background: `${r.color}0F` }}>{r.emoji}</div>
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
        </div>

        {/* Spin Wheel CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.97 }} onClick={() => setShowSpin(true)}
          className="mx-4 mb-5 w-[calc(100%-32px)] rounded-[20px] overflow-hidden relative flex items-center gap-4 p-4"
          style={{ background: 'linear-gradient(135deg,#0C0002 0%,#280407 50%,#0D0205 100%)', border: '1px solid rgba(201,149,106,0.2)', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 80% 50%,rgba(201,149,106,0.12) 0%,transparent 60%)' }} />
          <div className="relative shrink-0" style={{ width: 56, height: 56 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-full h-full rounded-full"
              style={{ background: 'conic-gradient(#6B3210 0deg 45deg,#B8860B 45deg 90deg,#1A6B3A 90deg 135deg,#2D2D2D 135deg 180deg,#6B3210 180deg 225deg,#7D3C15 225deg 270deg,#1B4F72 270deg 315deg,#6B2D8B 315deg 360deg)', border: '2px solid rgba(201,149,106,0.4)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-[#0D0205] border border-[rgba(201,149,106,0.4)] flex items-center justify-center text-[10px]">🎰</div>
            </div>
          </div>
          <div className="flex-1 text-right">
            <p className="text-white text-[15px] font-black">دوّر واربح</p>
            <p className="text-white/40 text-[10px] font-light mt-0.5">وجبة مجانية · خصومات · نقاط مضاعفة</p>
          </div>
          <div className="shrink-0 flex flex-col items-center gap-1">
            <div className="px-3 py-1.5 rounded-full text-[10px] font-bold text-[#7A3B18]"
              style={{ background: 'rgba(201,149,106,0.12)', border: '1px solid rgba(201,149,106,0.25)' }}>مجاناً</div>
            <span className="text-white/20 text-[8px]">مرة / يوم</span>
          </div>
        </motion.button>

        {/* تقويم العروض */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-4 px-4">
            <p className="text-[13px] font-bold text-[#111]">تقويم العروض</p>
            <span className="text-[10px] text-[#C4B59F]">المناسبات والعروض</span>
          </div>
          <HaizCalendar />
        </div>
      </div>
      </div> {/* end scrollable */}
    </div>
  );
}
