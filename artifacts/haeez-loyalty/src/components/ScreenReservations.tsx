import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Check, ChevronLeft, ChevronRight, Sparkles, Camera, Music, Cake, Gift } from 'lucide-react';

const logoImg = `${import.meta.env.BASE_URL}bd-logo.svg`;

/* ── Date helpers ─────────────────────────────────────────────── */
const today     = new Date();
const dates     = Array.from({ length: 7 }, (_, i) => { const d = new Date(today); d.setDate(today.getDate() + i); return d; });
const dayNames  = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const monthNames= ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

const times = ['٨:٠٠ ص','٩:٠٠ ص','١٠:٠٠ ص','١١:٠٠ ص','١٢:٠٠ م','١:٠٠ م','٢:٠٠ م','٣:٠٠ م','٤:٠٠ م','٥:٠٠ م','٦:٠٠ م'];
const unavailable = [1, 5, 8];

/* ── Celebration types ────────────────────────────────────────── */
const celebTypes = [
  { id: 'bday',   emoji: '🎂', label: 'عيد ميلاد'   },
  { id: 'grad',   emoji: '🎓', label: 'تخرج'         },
  { id: 'engage', emoji: '💍', label: 'خطوبة'         },
  { id: 'baby',   emoji: '👶', label: 'بيبي شاور'    },
  { id: 'work',   emoji: '💼', label: 'مناسبة عمل'   },
  { id: 'other',  emoji: '🎉', label: 'مناسبة أخرى'  },
];

/* ── Packages ─────────────────────────────────────────────────── */
const packages = [
  {
    id: 'bronze',
    name: 'باقة النجمة',
    nameEn: 'STAR',
    price: 99,
    color: '#B87333',
    gradient: 'linear-gradient(135deg,#3D2000,#7A4500)',
    emoji: '⭐',
    perks: [
      { icon: '🎀', text: 'تزيين طاولة بسيط' },
      { icon: '🎂', text: 'كيكة صغيرة مخصصة' },
      { icon: '☕', text: 'مشروب مجاني لكل شخص' },
      { icon: '🪄', text: 'بالون ترحيبي' },
    ],
    guests: 'مناسبة لـ ٢-٦ أشخاص',
  },
  {
    id: 'silver',
    name: 'باقة الفضية',
    nameEn: 'SILVER',
    price: 150,
    color: '#9E9E9E',
    gradient: 'linear-gradient(135deg,#1A1A2E,#2D2D44)',
    emoji: '🥈',
    badge: 'الأشهر',
    perks: [
      { icon: '🎊', text: 'تزيين طاولة كامل بالورد' },
      { icon: '🎂', text: 'كيكة متوسطة مزخرفة' },
      { icon: '☕', text: 'مشروبات لكل الضيوف' },
      { icon: '🍰', text: 'طبق حلويات مشكّلة' },
      { icon: '📸', text: 'تصوير ٣٠ دقيقة' },
    ],
    guests: 'مناسبة لـ ٤-١٠ أشخاص',
  },
  {
    id: 'gold',
    name: 'باقة الذهبية',
    nameEn: 'GOLD VIP',
    price: 200,
    color: '#D4AF37',
    gradient: 'linear-gradient(135deg,#1C0800,#4A1C08)',
    emoji: '🥇',
    perks: [
      { icon: '✨', text: 'تزيين VIP كامل + باقة ورد' },
      { icon: '🎂', text: 'كيكة كبيرة + قدح احتفالي' },
      { icon: '☕', text: 'مشروبات + حلويات + تمر' },
      { icon: '📸', text: 'تصوير احترافي ساعة كاملة' },
      { icon: '🎵', text: 'موسيقى خلفية خاصة' },
      { icon: '🎁', text: 'هدية مفاجأة من براون دوز' },
    ],
    guests: 'مناسبة لـ ٦-٢٠ شخص',
  },
];

/* ═══════════════════════════════════════════════════════════════ */
export function ScreenReservations() {
  type BookType = 'table' | 'celebration';
  const [bookType,     setBookType]     = useState<BookType>('table');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [guests,       setGuests]       = useState(2);
  const [note,         setNote]         = useState('');
  const [celebType,    setCelebType]    = useState<string | null>(null);
  const [selectedPkg,  setSelectedPkg]  = useState<string | null>(null);
  const [showSuccess,  setShowSuccess]  = useState(false);
  const [confirmed,    setConfirmed]    = useState(false);

  const canConfirm = selectedTime !== null && (bookType === 'table' || (celebType && selectedPkg));

  function handleConfirm() {
    if (!canConfirm) return;
    setShowSuccess(true);
    setTimeout(() => { setShowSuccess(false); setConfirmed(true); setSelectedTime(null); }, 2800);
  }

  const activePkg = packages.find(p => p.id === selectedPkg);

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none pb-28" style={{ background: '#F8F7F5' }}>

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden shrink-0"
        style={{ background: 'linear-gradient(170deg,#0A0002 0%,#1C0408 45%,#3D0810 70%,#0D0205 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 110%,rgba(107,50,16,0.4) 0%,transparent 65%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(201,149,106,0.5),transparent)' }} />
        <div className="relative z-10 flex flex-col items-center pt-6 pb-6 px-5">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="relative mb-3">
            <div className="absolute inset-0 rounded-[18px] blur-xl"
              style={{ background: 'rgba(201,149,106,0.35)', transform: 'scale(1.4)' }} />
            <img src={logoImg} alt="براون دوز"
              className="relative w-14 h-14 rounded-[18px] object-cover"
              style={{ border: '2px solid rgba(201,149,106,0.5)', boxShadow: '0 8px 28px rgba(0,0,0,0.5)' }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-center">
            <p className="text-[8px] font-black tracking-[0.35em] text-[#C4783A] mb-1.5 uppercase">براون دوز · جيزان</p>
            <h1 className="text-[24px] font-black text-white leading-none">احجز مكانك</h1>
            <p className="text-white/35 text-[10px] mt-1.5 font-light">الفروع: صبيا · جيزان · ضمد</p>
          </motion.div>
          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex items-center gap-5 mt-4 pt-4 w-full justify-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {[
              { v: '٧', l: 'أيام متاحة' },
              { v: '١١', l: 'وقت يومياً' },
              { v: 'فوري', l: 'تأكيد واتساب' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-white text-[14px] font-black leading-none">{s.v}</p>
                <p className="text-white/30 text-[8px] mt-0.5">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-5 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom,transparent,#F8F7F5)' }} />
      </div>

      {/* ── Success toast ────────────────────────────────────────── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mx-5 mb-3 bg-[#111] text-white rounded-2xl p-4 flex items-center gap-3"
            style={{ boxShadow: '0 8px 28px rgba(0,0,0,0.2)' }}>
            <div className="w-9 h-9 bg-[#30D158] rounded-full flex items-center justify-center shrink-0">
              <Check size={18} className="text-white" strokeWidth={3} />
            </div>
            <div>
              <p className="text-[13px] font-bold">
                {bookType === 'table' ? 'تم حجز طاولتك!' : `تم حجز الاحتفالية! 🎉`}
              </p>
              <p className="text-[10px] text-white/50 font-light mt-0.5">سيصلك تأكيد على واتساب قريباً</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Book type toggle ─────────────────────────────────────── */}
      <div className="px-5 pt-4 mb-5">
        <div className="flex bg-white rounded-[18px] p-1.5 gap-1.5"
          style={{ border: '1px solid #EBEBEB', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          {([
            { id: 'table',       emoji: '🪑', label: 'حجز طاولة'   },
            { id: 'celebration', emoji: '🎊', label: 'احتفالية'     },
          ] as { id: BookType; emoji: string; label: string }[]).map(opt => (
            <motion.button key={opt.id} whileTap={{ scale: 0.96 }}
              onClick={() => setBookType(opt.id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[14px] transition-all font-bold text-[13px]"
              style={bookType === opt.id
                ? { background: '#6B3210', color: '#fff', boxShadow: '0 4px 14px rgba(107,50,16,0.35)' }
                : { color: '#888' }}>
              <span className="text-[16px]">{opt.emoji}</span>
              {opt.label}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={bookType} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>

          {/* ══════════ CELEBRATION EXTRAS ══════════ */}
          {bookType === 'celebration' && (
            <>
              {/* Celebration type */}
              <div className="px-5 mb-5">
                <p className="text-[11px] font-black text-[#111] tracking-wide mb-3">نوع المناسبة</p>
                <div className="grid grid-cols-3 gap-2">
                  {celebTypes.map(ct => (
                    <motion.button key={ct.id} whileTap={{ scale: 0.93 }}
                      onClick={() => setCelebType(ct.id)}
                      className="flex flex-col items-center gap-1.5 py-3.5 rounded-[16px] border transition-all"
                      style={celebType === ct.id
                        ? { background: '#6B3210', borderColor: '#6B3210', boxShadow: '0 4px 14px rgba(107,50,16,0.3)' }
                        : { background: 'white', borderColor: '#EBEBEB' }}>
                      <span className="text-[24px]">{ct.emoji}</span>
                      <span className="text-[10px] font-bold" style={{ color: celebType === ct.id ? '#fff' : '#555' }}>
                        {ct.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Packages */}
              <div className="px-5 mb-5">
                <div className="flex items-baseline justify-between mb-3">
                  <p className="text-[11px] font-black text-[#111] tracking-wide">الباقات</p>
                  <span className="text-[9px] text-[#BBB]">اختر الباقة المناسبة</span>
                </div>
                <div className="flex flex-col gap-3">
                  {packages.map((pkg) => {
                    const isSelected = selectedPkg === pkg.id;
                    return (
                      <motion.button key={pkg.id} whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPkg(pkg.id)}
                        className="relative rounded-[22px] overflow-hidden text-right transition-all"
                        style={{
                          border: isSelected ? `2px solid ${pkg.color}` : '2px solid transparent',
                          boxShadow: isSelected ? `0 6px 24px rgba(0,0,0,0.2)` : '0 2px 10px rgba(0,0,0,0.07)',
                        }}>
                        {/* Header gradient */}
                        <div className="px-4 py-3.5 flex items-center justify-between"
                          style={{ background: pkg.gradient }}>
                          <div className="flex items-center gap-2">
                            <span className="text-[28px]">{pkg.emoji}</span>
                            <div>
                              <p className="text-[7px] font-black tracking-[0.3em] text-white/40 uppercase">{pkg.nameEn}</p>
                              <p className="text-[16px] font-black text-white leading-tight">{pkg.name}</p>
                            </div>
                          </div>
                          <div className="text-left">
                            {pkg.badge && (
                              <div className="text-[7px] font-black px-2 py-0.5 rounded-full mb-1 text-white"
                                style={{ background: 'rgba(255,255,255,0.15)' }}>{pkg.badge}</div>
                            )}
                            <p className="text-white text-[20px] font-black leading-none tabular-nums">{pkg.price}</p>
                            <p className="text-white/40 text-[9px]">ريال</p>
                          </div>
                        </div>
                        {/* Perks */}
                        <div className="bg-white px-4 py-3 flex flex-col gap-1.5">
                          <p className="text-[9px] text-[#BBB] mb-0.5">{pkg.guests}</p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {pkg.perks.map((perk, pi) => (
                              <div key={pi} className="flex items-center gap-1.5">
                                <span className="text-[12px] shrink-0">{perk.icon}</span>
                                <span className="text-[10px] text-[#555]">{perk.text}</span>
                              </div>
                            ))}
                          </div>
                          {/* Selection indicator */}
                          <div className="flex items-center justify-end mt-1.5">
                            {isSelected ? (
                              <div className="flex items-center gap-1.5 text-[#6B3210]">
                                <Check size={12} strokeWidth={2.5} />
                                <span className="text-[10px] font-bold">تم الاختيار</span>
                              </div>
                            ) : (
                              <span className="text-[10px] text-[#CCC]">اضغط للاختيار</span>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* ══════════ DATE ══════════ */}
          <div className="px-5 mb-4">
            <p className="text-[11px] font-black text-[#111] tracking-wide mb-3">اختر التاريخ</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {dates.map((d, i) => {
                const isActive = selectedDate === i;
                return (
                  <motion.button key={i} whileTap={{ scale: 0.94 }}
                    onClick={() => { setSelectedDate(i); setSelectedTime(null); }}
                    className="shrink-0 flex flex-col items-center py-2.5 px-3.5 rounded-[18px] transition-all border"
                    style={isActive
                      ? { background: '#6B3210', borderColor: '#6B3210', color: 'white', boxShadow: '0 4px 16px rgba(107,50,16,0.35)' }
                      : { background: 'white', borderColor: '#EBEBEB', color: '#111' }}>
                    <span className="text-[9px] font-medium mb-1" style={{ color: isActive ? 'rgba(255,255,255,0.65)' : '#AAA' }}>
                      {i === 0 ? 'اليوم' : dayNames[d.getDay()].slice(0, 3)}
                    </span>
                    <span className="text-[18px] font-bold leading-tight">{d.getDate()}</span>
                    <span className="text-[9px] mt-0.5" style={{ color: isActive ? 'rgba(255,255,255,0.55)' : '#CCC' }}>
                      {monthNames[d.getMonth()].slice(0, 3)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ══════════ TIME ══════════ */}
          <div className="px-5 mb-4">
            <p className="text-[11px] font-black text-[#111] tracking-wide mb-3">اختر الوقت</p>
            <div className="grid grid-cols-4 gap-2">
              {times.map((t, i) => {
                const isUnavail = unavailable.includes(i);
                const isSelected = selectedTime === i;
                return (
                  <motion.button key={i} whileTap={isUnavail ? {} : { scale: 0.92 }}
                    onClick={() => !isUnavail && setSelectedTime(i)}
                    className="py-2.5 rounded-[14px] text-[11px] font-semibold transition-all border"
                    style={isSelected
                      ? { background: '#6B3210', borderColor: '#6B3210', color: 'white', boxShadow: '0 4px 12px rgba(107,50,16,0.3)' }
                      : isUnavail
                      ? { background: '#F5F3F1', borderColor: 'transparent', color: '#CCC', textDecoration: 'line-through', cursor: 'not-allowed' }
                      : { background: 'white', borderColor: '#EBEBEB', color: '#111' }}>
                    {t}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ══════════ GUESTS ══════════ */}
          <div className="px-5 mb-4">
            <p className="text-[11px] font-black text-[#111] tracking-wide mb-3">عدد الأشخاص</p>
            <div className="flex gap-2 items-center">
              {[1,2,3,4,5,6,7,8].map(n => (
                <motion.button key={n} whileTap={{ scale: 0.88 }}
                  onClick={() => setGuests(n)}
                  className="w-10 h-10 rounded-[12px] text-[13px] font-bold transition-all border"
                  style={guests === n
                    ? { background: '#111', borderColor: '#111', color: 'white' }
                    : { background: 'white', borderColor: '#EBEBEB', color: '#555' }}>
                  {n}
                </motion.button>
              ))}
              <span className="text-[10px] text-[#BBB] shrink-0">+</span>
            </div>
            <p className="text-[9px] text-[#BBB] mt-1.5">
              {guests > 6 ? 'للمجموعات الكبيرة اتصل بنا مباشرة' : `${guests} ${guests === 1 ? 'شخص' : 'أشخاص'}`}
            </p>
          </div>

          {/* ══════════ NOTE ══════════ */}
          <div className="px-5 mb-5">
            <p className="text-[11px] font-black text-[#111] tracking-wide mb-2">ملاحظة خاصة</p>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder={bookType === 'table'
                ? 'مثال: طاولة هادئة، كرسي أطفال...'
                : 'مثال: اسم صاحب المناسبة، لون معين للتزيين...'}
              rows={2}
              className="w-full bg-white rounded-[16px] p-3.5 text-[12px] text-[#111] placeholder:text-[#CCC] font-light resize-none outline-none transition-colors"
              style={{ border: '1px solid #EBEBEB' }}
              onFocus={e => (e.target.style.borderColor = '#6B3210')}
              onBlur={e => (e.target.style.borderColor = '#EBEBEB')}
            />
          </div>

          {/* ══════════ SUMMARY CARD (celebration) ══════════ */}
          {bookType === 'celebration' && selectedPkg && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="mx-5 mb-4 rounded-[18px] overflow-hidden"
              style={{ border: '1px solid #EBEBEB', background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div className="px-4 py-3 flex items-center justify-between"
                style={{ background: 'linear-gradient(135deg,#1C0800,#4A1C08)', borderBottom: '1px solid #EBEBEB' }}>
                <p className="text-white text-[12px] font-bold">ملخص الحجز</p>
                <Sparkles size={14} className="text-[#C4783A]" />
              </div>
              <div className="px-4 py-3 space-y-2">
                {celebType && (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#888]">المناسبة</span>
                    <span className="font-semibold text-[#111]">
                      {celebTypes.find(c => c.id === celebType)?.emoji} {celebTypes.find(c => c.id === celebType)?.label}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#888]">الباقة</span>
                  <span className="font-semibold text-[#111]">{activePkg?.name}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#888]">الأشخاص</span>
                  <span className="font-semibold text-[#111]">{guests} شخص</span>
                </div>
                <div className="h-px bg-[#F5F3F1] my-1" />
                <div className="flex justify-between">
                  <span className="text-[12px] font-bold text-[#111]">الإجمالي</span>
                  <span className="text-[18px] font-black text-[#6B3210] tabular-nums">{activePkg?.price} <span className="text-[10px] font-normal text-[#BBB]">ريال</span></span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════ CONFIRM ══════════ */}
          <div className="px-5">
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleConfirm}
              disabled={!canConfirm}
              className="w-full py-4 rounded-[18px] text-[15px] font-bold transition-all flex items-center justify-center gap-2"
              style={canConfirm
                ? { background: '#6B3210', color: 'white', boxShadow: '0 8px 24px rgba(107,50,16,0.35)' }
                : { background: '#EBEBEB', color: '#BBB', cursor: 'not-allowed' }}>
              {canConfirm
                ? bookType === 'table'
                  ? `✓ تأكيد الحجز — ${times[selectedTime!]}`
                  : `✓ احجز الاحتفالية — ${activePkg?.price} ريال`
                : bookType === 'table'
                  ? 'اختر الوقت أولاً'
                  : !celebType ? 'اختر نوع المناسبة'
                  : !selectedPkg ? 'اختر الباقة'
                  : 'اختر الوقت'}
            </motion.button>
            <p className="text-center text-[9px] text-[#CCC] mt-2 font-light">
              {bookType === 'table'
                ? 'تيك آواي بدون حجز · الحجز للجلسات فقط'
                : 'يتواصل معك الفريق خلال ٣٠ دقيقة لتأكيد التفاصيل'}
            </p>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
