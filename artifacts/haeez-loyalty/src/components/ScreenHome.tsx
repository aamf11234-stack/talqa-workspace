import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronLeft, Calendar, ShoppingBag, Tag, Zap, Flame, ArrowLeft, Sparkles } from 'lucide-react';
import { EventIconMap, ICalendarIcon, IGift } from './HaizIcons';
import { SpinWheelOverlay } from './SpinWheel';
import { ShakeHintBar } from './ShakeReveal';
import { useBrand } from '../BrandContext';
import type { BrandConfig } from '../BrandContext';
import { CheckoutModal } from './CheckoutFlow';
import type { CheckoutItem } from './CheckoutFlow';

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
                        <p className="text-[#C9956A] text-[9px] font-bold">{result.prices[i]}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="w-3 h-3 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: 'linear-gradient(135deg,#7B1618,#4A0D0F)' }}>
                            <span className="text-white text-[5px] font-black">✓</span>
                          </div>
                          <span className="text-[#C9956A] text-[8px] font-bold">اطلب</span>
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

  useEffect(() => setLiked(false), [brand.type]);

  return (
    <motion.div
      key={brand.type}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28 }}
      className="mx-4 mb-5 rounded-[22px] overflow-hidden relative"
      style={{ background: 'linear-gradient(150deg,#0C0002,#280506,#0D0205)', border: '1px solid rgba(201,149,106,0.12)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 90% 0%,rgba(201,149,106,0.14) 0%,transparent 55%)' }} />

      <div className="relative flex gap-4 p-4">
        <div className="relative shrink-0 rounded-[16px] overflow-hidden" style={{ width: 100, height: 100 }}>
          <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(0,0,0,0.15),transparent)' }} />
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[7px] font-bold text-white"
            style={{ background: 'rgba(230,126,34,0.9)' }}>جارٍ الآن</div>
        </div>
        <div className="flex-1 flex flex-col justify-between py-0.5">
          <div>
            <p className="text-[8px] font-bold tracking-widest text-[#C9956A] mb-1"
              style={{ fontFamily: 'ui-monospace,monospace' }}>{t.badge}</p>
            <p className="text-white text-[16px] font-bold leading-tight mb-1">{t.name}</p>
            <p className="text-white/35 text-[10px] font-light leading-snug">{t.desc}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-[22px] font-black text-white font-inter">{t.price}</span>
              <span className="text-[#C9956A] text-[11px] font-bold mr-1">ريال</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button whileTap={{ scale: 0.85 }} onClick={() => setLiked(!liked)}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: liked ? 'rgba(255,59,48,0.2)' : 'rgba(255,255,255,0.08)' }}>
                <span className="text-[14px]">{liked ? '❤️' : '🤍'}</span>
              </motion.button>
              <motion.button
                onClick={() => onOrder({ name: t.name, price: t.price, emoji: t.emoji })}
                whileTap={{ scale: 0.94 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#7B1618,#4A0D0F)' }}>
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-white shrink-0" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                اطلب الآن
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 flex gap-2">
        <div className="flex items-center gap-2 flex-1 rounded-[12px] px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <img src={t.popImg} alt={t.popName} className="w-8 h-8 rounded-[8px] object-cover shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-white text-[10px] font-semibold truncate">{t.popName}</p>
            <p className="text-[#C9956A] text-[9px] font-bold">{t.popPrice}</p>
          </div>
          <span className="text-[9px] text-white/25 shrink-0">الأشهر</span>
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
  { id: 'founding', title: 'يوم التأسيس',      subtitle: '٢٢ فبراير ٢٠٢٧',         date: '2027-02-22', color: '#7B1618', benefit: 'وجبة مجانية للأعضاء' },
  { id: 'eid',      title: 'عيد الفطر',         subtitle: 'مارس ٢٠٢٧ (تقريباً)',    date: '2027-03-20', color: '#C9956A', benefit: 'هدية عيد خاصة + مضاعفة النقاط' },
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
          style={{ background: 'radial-gradient(ellipse at 10% 100%,rgba(123,22,24,0.6) 0%,transparent 55%)' }} />
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
            <span className="text-[6px] font-black tracking-[0.32em] text-[#C9956A]/35"
              style={{ fontFamily: 'ui-monospace,monospace' }}>OFFERS CALENDAR</span>
          </div>
          <div className="flex items-end gap-0">
            <span style={{
              fontSize: 96, fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 0.85,
              background: 'linear-gradient(175deg,#FAECD0 0%,#C9956A 45%,#7B4A1A 100%)',
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
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#C9956A', boxShadow: '0 0 6px rgba(201,149,106,0.7)' }} />
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
          <p className="text-[8px] font-black tracking-[0.28em] text-[#C9956A] mb-1"
            style={{ fontFamily: 'ui-monospace,monospace' }}>OFFERS CALENDAR</p>
          <div className="flex items-center gap-2">
            <ICalendarIcon size={18} color="#C9956A" sw={1.4} />
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

/* ══════════════════════════════════════════════════════════════════
   Main Screen
══════════════════════════════════════════════════════════════════ */
export function ScreenHome({ onShakeTrigger }: { onShakeTrigger?: () => void }) {
  const { brand } = useBrand();
  const points = useCounter(480, 1400, 200);
  const [showSpin, setShowSpin] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<CheckoutItem | null>(null);
  const hour = new Date().getHours();
  const greeting =
    hour < 5  ? 'ليلة طيبة 🌙' :
    hour < 12 ? 'صباح النور ☀️' :
    hour < 17 ? 'طاب نهارك 🌤️' :
                'مساء الخير 🌙';

  return (
    <div className="h-full overflow-y-auto scrollbar-none relative">
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
            />
          </div>
        )}
      </AnimatePresence>

      {/* ── Dark hero ── */}
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
              key={brand.type}
              className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-400/30 w-fit"
              style={{ background: 'rgba(255,140,0,0.12)' }}>
              <Flame size={11} className="text-orange-400" fill="rgba(255,140,0,0.7)" />
              <span className="text-orange-300 text-[10px] font-bold font-inter">{brand.streak.label}</span>
            </motion.div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <motion.button whileTap={{ scale: 0.88 }}
              className="relative w-9 h-9 rounded-full flex items-center justify-center border border-white/8"
              style={{ background: 'rgba(255,255,255,0.06)' }}>
              <Bell size={15} className="text-white/50" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF3B30] rounded-full border border-[#0D0205]" />
            </motion.button>
            <AnimatePresence mode="wait">
              <motion.div key={brand.logoImg} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.25 }} className="relative">
                <img src={brand.logoImg} alt="" className="w-10 h-10 rounded-[13px] object-cover border border-[rgba(201,149,106,0.2)]"
                  style={{ boxShadow: '0 4px 16px rgba(123,22,24,0.4)' }} />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#30D158] rounded-full border-2 border-[#0D0205]" />
              </motion.div>
            </AnimatePresence>
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
            <span className="text-white/35 text-[11px] font-light">٣ طلبات للفضي</span>
            <ArrowLeft size={10} className="text-white/25" />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="flex justify-center px-6 mb-4">
          {brand.stats.map((s, i, arr) => (
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

        {/* Shake hint + Spin button */}
        <div className="flex items-center justify-center gap-3 pb-2">
          <ShakeHintBar onReveal={onShakeTrigger ?? (() => {})} />
          <motion.button whileTap={{ scale: 0.92 }} onClick={() => setShowSpin(true)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full"
            style={{ background: 'linear-gradient(135deg,rgba(201,149,106,0.18),rgba(201,149,106,0.08))', border: '1px solid rgba(201,149,106,0.3)' }}>
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-[15px] leading-none">🎰</motion.span>
            <span className="text-[#C9956A] text-[11px] font-bold">دوّر واربح</span>
          </motion.button>
        </div>
      </div>

      {/* ── Cream content ── */}
      <div className="bg-[#FDFBF7] rounded-t-[30px] -mt-7 relative z-10 pt-5 pb-6">

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-2.5 mb-5 px-4">
          {[
            { icon: ShoppingBag, label: 'اطلب',  color: '#7B1618', bg: '#7B161812', href: null, onTap: () => setPendingOrder({ name: brand.todaySpecial.name, price: brand.todaySpecial.price, emoji: brand.todaySpecial.emoji }) },
            { icon: Calendar,    label: 'احجز',  color: '#7B1618', bg: '#7B161812', href: null },
            { icon: Tag,         label: 'عروضي', color: '#B5651D', bg: '#C9956A12', href: null },
          ].map((a, i) => {
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="flex flex-col items-center py-4 rounded-2xl gap-2 relative overflow-hidden w-full"
                style={{ background: a.bg, border: `1px solid ${a.color}22` }}>
                <div className="w-9 h-9 rounded-[12px] flex items-center justify-center" style={{ background: `${a.color}18` }}>
                  <a.icon size={17} style={{ color: a.color }} />
                </div>
                <span className="text-[11px] font-bold" style={{ color: a.color }}>{a.label}</span>
              </motion.div>
            );
            return a.href ? (
              <motion.a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.88 }}>{inner}</motion.a>
            ) : (
              <motion.button key={a.label} whileTap={{ scale: 0.88 }} onClick={(a as typeof a & { onTap?: () => void }).onTap}>{inner}</motion.button>
            );
          })}
        </div>

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
              style={{ background: 'conic-gradient(#7B1618 0deg 45deg,#B8860B 45deg 90deg,#1A6B3A 90deg 135deg,#2D2D2D 135deg 180deg,#7B1618 180deg 225deg,#7D3C15 225deg 270deg,#1B4F72 270deg 315deg,#6B2D8B 315deg 360deg)', border: '2px solid rgba(201,149,106,0.4)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-[#0D0205] border border-[rgba(201,149,106,0.4)] flex items-center justify-center text-[10px]">🎰</div>
            </div>
          </div>
          <div className="flex-1 text-right">
            <p className="text-white text-[15px] font-black">دوّر واربح</p>
            <p className="text-white/40 text-[10px] font-light mt-0.5">وجبة مجانية · خصومات · نقاط مضاعفة</p>
          </div>
          <div className="shrink-0 flex flex-col items-center gap-1">
            <div className="px-3 py-1.5 rounded-full text-[10px] font-bold text-[#C9956A]"
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
    </div>
  );
}
