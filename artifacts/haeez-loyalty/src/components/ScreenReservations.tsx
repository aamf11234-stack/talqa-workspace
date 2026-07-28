import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Check, ChevronLeft, ChevronRight, Sparkles, Calendar, Clock, X, Star, FileText } from 'lucide-react';
import { useBrand } from '../BrandContext';

const logoImg = `${import.meta.env.BASE_URL}bd-logo.svg`;

/* ── Date helpers ─────────────────────────────────────────────── */
const today     = new Date();
const dates     = Array.from({ length: 14 }, (_, i) => { const d = new Date(today); d.setDate(today.getDate() + i); return d; });
const dayNames  = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const monthNames= ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

function fmtDate(d: Date) {
  return `${d.getDate()} ${monthNames[d.getMonth()]}`;
}

const TABLE_TIMES  = ['١٢:٠٠ م','١٢:٣٠ م','١:٠٠ م','١:٣٠ م','٢:٠٠ م','٧:٠٠ م','٧:٣٠ م','٨:٠٠ م','٨:٣٠ م','٩:٠٠ م','٩:٣٠ م','١٠:٠٠ م'];
const TABLE_UNAVAIL = new Set([2, 5, 9]);

const CELEB_TIMES  = ['٦:٠٠ م','٧:٠٠ م','٨:٠٠ م','٩:٠٠ م'];
const CELEB_UNAVAIL = new Set([1]);

/* ── Celebration types ────────────────────────────────────────── */
const celebTypes = [
  { id: 'bday',   emoji: '🎂', label: 'عيد ميلاد' },
  { id: 'grad',   emoji: '🎓', label: 'تخرج'       },
  { id: 'engage', emoji: '💍', label: 'خطوبة'       },
  { id: 'baby',   emoji: '👶', label: 'بيبي شاور'  },
  { id: 'work',   emoji: '💼', label: 'مناسبة عمل' },
  { id: 'other',  emoji: '🎉', label: 'مناسبة أخرى'},
];

/* ── Packages ─────────────────────────────────────────────────── */
const packages = [
  {
    id: 'basic', name: 'باقة الأساسية', nameEn: 'BASIC', price: 99,
    color: '#B87333', gradient: 'linear-gradient(135deg,#3D2000,#7A4500)', emoji: '⭐',
    perks: [
      { icon: '🎀', text: 'تزيين طاولة بسيط' },
      { icon: '🎂', text: 'كيكة صغيرة مخصصة' },
      { icon: '☕', text: 'مشروب مجاني للشخص' },
      { icon: '🪄', text: 'بالون ترحيبي'       },
    ],
    guests: 'لـ ٢–٦ أشخاص',
  },
  {
    id: 'silver', name: 'باقة الفضية', nameEn: 'SILVER', price: 150,
    color: '#7B8FA1', gradient: 'linear-gradient(135deg,#1A1A2E,#2D2D44)', emoji: '🥈',
    badge: 'الأشهر',
    perks: [
      { icon: '🎊', text: 'تزيين طاولة بالورد'  },
      { icon: '🎂', text: 'كيكة مزخرفة'          },
      { icon: '☕', text: 'مشروبات للجميع'       },
      { icon: '🍰', text: 'طبق حلويات مشكّلة'   },
      { icon: '📸', text: 'تصوير ٣٠ دقيقة'      },
    ],
    guests: 'لـ ٤–١٠ أشخاص',
  },
  {
    id: 'gold', name: 'باقة الذهبية', nameEn: 'GOLD VIP', price: 200,
    color: '#D4AF37', gradient: 'linear-gradient(135deg,#1C0800,#4A1C08)', emoji: '🥇',
    perks: [
      { icon: '✨', text: 'تزيين VIP كامل'       },
      { icon: '🎂', text: 'كيكة كبيرة + قدح'    },
      { icon: '☕', text: 'مشروبات + حلويات'    },
      { icon: '📸', text: 'تصوير ساعة كاملة'    },
      { icon: '🎵', text: 'موسيقى خلفية خاصة'  },
      { icon: '🎁', text: 'هدية مفاجأة'          },
    ],
    guests: 'لـ ٦–٢٠ شخص',
  },
];

/* ── Booking record ───────────────────────────────────────────── */
interface Booking {
  id:        string;
  type:      'table' | 'celebration';
  date:      string;
  time:      string;
  guests:    number;
  note:      string;
  celebType?: string;
  pkgId?:    string;
  pkgPrice?: number;
  payMethod?: string;
  status:    'confirmed';
  createdAt: Date;
}

function genId() { return `BK-${Math.floor(10000 + Math.random() * 90000)}`; }

/* ── Deposit helpers ──────────────────────────────────────────── */
const DEPOSIT_AMOUNT = 25;
const DEPOSIT_LS_KEY = 'bd_table_deposit';

function saveDeposit(bookingId: string, bookingDate: string) {
  localStorage.setItem(DEPOSIT_LS_KEY, JSON.stringify({
    amount: DEPOSIT_AMOUNT, bookingId, bookingDate, usedAt: null,
  }));
}

/* ── Table Deposit Sheet ─────────────────────────────────────── */
type DepositPayMethod = 'apple' | 'stc' | 'card';

function TableDepositSheet({
  booking, onClose, onPaid,
}: {
  booking: Booking;
  onClose: () => void;
  onPaid: () => void;
}) {
  const [method, setMethod] = useState<DepositPayMethod | null>(null);
  const [phase, setPhase]   = useState<'pick' | 'paying' | 'done'>('pick');

  function pay() {
    if (!method) return;
    setPhase('paying');
    setTimeout(() => {
      setPhase('done');
      saveDeposit(booking.id, booking.date);
      setTimeout(onPaid, 900);
    }, 2000);
  }

  const PAY_OPTS: { id: DepositPayMethod; label: string; icon: string; bg: string; fg: string }[] = [
    { id: 'apple', label: 'Apple Pay',   icon: '', bg: '#000',    fg: '#fff' },
    { id: 'stc',   label: 'STC Pay',     icon: '', bg: '#6B21A8', fg: '#fff' },
    { id: 'card',  label: 'بطاقة بنكية', icon: '', bg: '#F5F3F0', fg: '#111' },
  ];

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={phase === 'pick' ? onClose : undefined}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm z-40 rounded-[48px]" />

      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="absolute bottom-0 left-0 right-0 z-50 rounded-t-[28px] overflow-hidden"
        style={{ background: '#0D0200' }}>

        <div className="w-9 h-1 rounded-full bg-white/10 mx-auto mt-3 mb-1" />

        <AnimatePresence mode="wait">
          {phase === 'paying' && (
            <motion.div key="paying" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-5 py-12 px-6">
              <motion.div animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-14 h-14 rounded-full border-4 border-transparent border-t-[#6B3210]" />
              <p className="text-white text-[16px] font-black">جاري تأكيد الحجز…</p>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-10 px-6">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="w-18 h-18 rounded-full flex items-center justify-center w-20 h-20"
                style={{ background: 'linear-gradient(135deg,#30D158,#25A349)', boxShadow: '0 12px 36px rgba(48,209,88,0.4)' }}>
                <Check size={34} className="text-white" strokeWidth={3} />
              </motion.div>
              <div className="text-center">
                <p className="text-white text-[20px] font-black">تم الدفع ✅</p>
                <p className="text-white/40 text-[11px] mt-1">رسوم الحجز تُطرح من فاتورتك</p>
              </div>
            </motion.div>
          )}

          {phase === 'pick' && (
            <motion.div key="pick" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="px-5 pt-4 pb-8">

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[9px] font-black text-[#C4783A]"
                    style={{ fontFamily: 'ui-monospace,monospace' }}>رسوم الحجز · TABLE BOOKING FEE</p>
                  <p className="text-white text-[20px] font-black mt-0.5">أكمل الحجز</p>
                </div>
                <button onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <X size={15} className="text-white/50" />
                </button>
              </div>

              {/* Deposit info card */}
              <div className="rounded-[18px] p-4 mb-5"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center justify-between mb-3 pb-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <p className="text-white text-[14px] font-bold">حجز طاولة</p>
                    <p className="text-white/40 text-[10px]">{booking.date} · {booking.time} · {booking.guests} أشخاص</p>
                  </div>
                  <span className="text-[9px] text-[#30D158] font-black bg-[#30D158]/10 px-2 py-0.5 rounded-full">{booking.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white/50 text-[10px]">رسوم حجز الطاولة</p>
                    <p className="text-white/30 text-[9px] mt-0.5">تُطرح كاملاً من فاتورتك عند الطلب</p>
                  </div>
                  <div className="text-left">
                    <span className="text-[28px] font-black text-[#C4783A] font-inter">{DEPOSIT_AMOUNT}</span>
                    <span className="text-[#C4783A] text-[13px] font-bold"> ر</span>
                  </div>
                </div>
              </div>

              {/* Payment methods */}
              <div className="flex flex-col gap-2.5 mb-5">
                {PAY_OPTS.map(opt => (
                  <motion.button key={opt.id} whileTap={{ scale: 0.97 }}
                    onClick={() => setMethod(opt.id)}
                    className="flex items-center gap-3.5 px-4 py-3.5 rounded-[18px] transition-all"
                    style={{
                      background: method === opt.id ? opt.bg : 'rgba(255,255,255,0.05)',
                      border: method === opt.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: method === opt.id ? '0 6px 20px rgba(0,0,0,0.4)' : 'none',
                    }}>
                    <span className="text-[22px]">{opt.icon}</span>
                    <span className="font-bold text-[14px]"
                      style={{ color: method === opt.id ? opt.fg : 'rgba(255,255,255,0.7)' }}>
                      {opt.label}
                    </span>
                    {method === opt.id && (
                      <div className="mr-auto w-5 h-5 rounded-full flex items-center justify-center bg-white/20">
                        <Check size={11} strokeWidth={3} style={{ color: opt.fg }} />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button whileTap={{ scale: 0.97 }} onClick={pay}
                className="w-full py-4 rounded-[18px] font-bold text-[15px] transition-all"
                style={{
                  background: method ? 'linear-gradient(135deg,#6B3210,#8B4515)' : 'rgba(255,255,255,0.06)',
                  color: method ? 'white' : 'rgba(255,255,255,0.25)',
                  boxShadow: method ? '0 8px 28px rgba(107,50,16,0.5)' : 'none',
                }}>
                {method ? `أكمل الحجز — ${DEPOSIT_AMOUNT} ريال` : 'اختر طريقة الدفع'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/* ── Payment Sheet ───────────────────────────────────────────── */
type PayMethod = 'apple' | 'stc' | 'card';

function PaymentSheet({
  pkg, date, time, guests, celebType, note, onClose, onPaid,
}: {
  pkg: typeof packages[0];
  date: string; time: string; guests: number;
  celebType: string; note: string;
  onClose: () => void;
  onPaid: (method: PayMethod) => void;
}) {
  const [method, setMethod]   = useState<PayMethod | null>(null);
  const [phase,  setPhase]    = useState<'pick' | 'paying' | 'done'>('pick');
  const vat   = Math.round(pkg.price * 0.15);
  const total = pkg.price + vat;

  function pay() {
    if (!method) return;
    setPhase('paying');
    setTimeout(() => { setPhase('done'); setTimeout(() => onPaid(method), 1000); }, 2200);
  }

  const PAY_OPTS: { id: PayMethod; label: string; icon: string; bg: string; fg: string }[] = [
    { id: 'apple', label: 'Apple Pay',   icon: '', bg: '#000',    fg: '#fff' },
    { id: 'stc',   label: 'STC Pay',     icon: '', bg: '#6B21A8', fg: '#fff' },
    { id: 'card',  label: 'بطاقة بنكية', icon: '', bg: '#F5F3F0', fg: '#111' },
  ];

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={phase === 'pick' ? onClose : undefined}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm z-40 rounded-[48px]" />

      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="absolute bottom-0 left-0 right-0 z-50 rounded-t-[28px] overflow-hidden"
        style={{ background: '#0D0200' }}>

        <div className="w-9 h-1 rounded-full bg-white/10 mx-auto mt-3 mb-1" />

        <AnimatePresence mode="wait">

          {/* ── Paying spinner ── */}
          {phase === 'paying' && (
            <motion.div key="paying"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-5 py-12 px-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-4 border-transparent border-t-[#6B3210]" />
              <div className="text-center">
                <p className="text-white text-[17px] font-black">جاري المعالجة…</p>
                <p className="text-white/35 text-[11px] mt-1">
                  {method === 'apple' ? 'Apple Pay' : method === 'stc' ? 'STC Pay' : 'بطاقة بنكية'}
                </p>
              </div>
            </motion.div>
          )}

          {/* ── Done ── */}
          {phase === 'done' && (
            <motion.div key="done"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-10 px-6">
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#30D158,#25A349)', boxShadow: '0 12px 36px rgba(48,209,88,0.4)' }}>
                <Check size={36} className="text-white" strokeWidth={3} />
              </motion.div>
              <p className="text-white text-[20px] font-black">تم الدفع 🎉</p>
            </motion.div>
          )}

          {/* ── Pick method ── */}
          {phase === 'pick' && (
            <motion.div key="pick" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pt-4 pb-8">

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[9px] font-black tracking-widest text-[#C4783A]"
                    style={{ fontFamily: 'ui-monospace,monospace' }}>PAYMENT · ادفع الآن</p>
                  <p className="text-white text-[20px] font-black mt-0.5">{pkg.name}</p>
                </div>
                <button onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <X size={15} className="text-white/50" />
                </button>
              </div>

              {/* Order summary */}
              <div className="rounded-[18px] p-4 mb-5"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-3 mb-3 pb-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-[28px]">{pkg.emoji}</span>
                  <div>
                    <p className="text-white text-[13px] font-bold">{pkg.name}</p>
                    <p className="text-white/35 text-[10px]">{date} · {time} · {guests} أشخاص</p>
                    <p className="text-white/25 text-[10px]">
                      {celebTypes.find(c => c.id === celebType)?.emoji} {celebTypes.find(c => c.id === celebType)?.label}
                    </p>
                  </div>
                </div>
                {[
                  { l: 'سعر الباقة',              v: `${pkg.price} ر` },
                  { l: 'ضريبة القيمة المضافة ١٥٪', v: `${vat} ر`      },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between mb-2">
                    <span className="text-white/35 text-[11px]">{r.l}</span>
                    <span className="text-white/60 text-[11px] font-inter">{r.v}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2.5 mt-1"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-white text-[13px] font-bold">الإجمالي</span>
                  <span className="text-[18px] font-black text-[#C4783A] font-inter">{total} ر</span>
                </div>
              </div>

              {/* Payment methods */}
              <p className="text-white/30 text-[9px] font-bold tracking-widest mb-3">طريقة الدفع</p>
              <div className="flex flex-col gap-2.5 mb-5">
                {PAY_OPTS.map(opt => (
                  <motion.button key={opt.id} whileTap={{ scale: 0.97 }}
                    onClick={() => setMethod(opt.id)}
                    className="flex items-center gap-3.5 px-4 py-3.5 rounded-[18px] transition-all"
                    style={{
                      background: method === opt.id ? opt.bg : 'rgba(255,255,255,0.05)',
                      border: method === opt.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: method === opt.id ? '0 6px 20px rgba(0,0,0,0.4)' : 'none',
                    }}>
                    <span className="text-[22px]">{opt.icon}</span>
                    <span className="font-bold text-[14px]"
                      style={{ color: method === opt.id ? opt.fg : 'rgba(255,255,255,0.7)' }}>
                      {opt.label}
                    </span>
                    {method === opt.id && (
                      <div className="mr-auto w-5 h-5 rounded-full flex items-center justify-center bg-white/20">
                        <Check size={11} strokeWidth={3} style={{ color: opt.fg }} />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Pay CTA */}
              <motion.button whileTap={{ scale: 0.97 }} onClick={pay}
                className="w-full py-4 rounded-[18px] font-bold text-[15px] text-white transition-all"
                style={{
                  background: method ? 'linear-gradient(135deg,#6B3210,#8B4515)' : 'rgba(255,255,255,0.06)',
                  color: method ? 'white' : 'rgba(255,255,255,0.25)',
                  boxShadow: method ? '0 8px 28px rgba(107,50,16,0.5)' : 'none',
                }}>
                {method ? `ادفع الآن — ${total} ريال` : 'اختر طريقة الدفع'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/* ── Booking Confirmation Card ───────────────────────────────── */
function BookingCard({ b, onClose }: { b: Booking; onClose: () => void }) {
  const { brand } = useBrand();
  const pkg = packages.find(p => p.id === b.pkgId);
  const ct  = celebTypes.find(c => c.id === b.celebType);
  const vat   = pkg ? Math.round(pkg.price * 0.15) : 0;
  const total = pkg ? pkg.price + vat : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col"
      style={{ background: 'linear-gradient(170deg,#060001,#120105,#040001)' }}>

      <div className="flex-1 overflow-y-auto scrollbar-none p-5 pb-10">

        {/* Success animation */}
        <div className="flex flex-col items-center pt-6 pb-8">
          <div className="relative w-24 h-24 mb-5">
            {[0, 1].map(i => (
              <motion.div key={i}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.5 + i * 0.5, opacity: 0 }}
                transition={{ duration: 1.4, delay: i * 0.2, ease: 'easeOut', repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 rounded-full border-2 border-[#30D158]" />
            ))}
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#30D158,#25A349)', boxShadow: '0 16px 48px rgba(48,209,88,0.45)' }}>
              <Check size={42} className="text-white" strokeWidth={3} />
            </motion.div>
          </div>

          <p className="text-white text-[24px] font-black mb-1">
            {b.type === 'table' ? 'تم الحجز ✓' : 'تم الحجز والدفع! 🎉'}
          </p>
          <p className="text-white/40 text-[12px] font-light">
            {b.type === 'table'
              ? 'طاولتك محجوزة — الرسوم تُخصم من طلبك'
              : `${pkg?.name} — ${b.date} · ${b.time}`}
          </p>
        </div>

        {/* Booking details */}
        <div className="rounded-[22px] overflow-hidden mb-4"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(107,50,16,0.2)' }}>
            <p className="text-white/70 text-[10px] font-black tracking-widest"
              style={{ fontFamily: 'ui-monospace,monospace' }}>{b.id}</p>
            <span className="text-[9px] font-black px-2.5 py-1 rounded-full bg-[#30D158]/15 text-[#30D158]">مؤكّد ✓</span>
          </div>

          {/* Rows */}
          <div className="px-4 py-4 space-y-3">
            {[
              { l: 'التاريخ',       v: b.date },
              { l: 'الوقت',         v: b.time },
              { l: 'عدد الأشخاص',  v: `${b.guests} شخص` },
              { l: 'الفرع',         v: brand.name },
              ...(b.type === 'celebration' && ct ? [{ l: 'المناسبة', v: `${ct.emoji} ${ct.label}` }] : []),
              ...(b.type === 'celebration' && pkg ? [{ l: 'الباقة', v: pkg.name }] : []),
              ...(b.pkgPrice ? [{ l: 'طريقة الدفع', v: b.payMethod === 'apple' ? 'Apple Pay' : b.payMethod === 'stc' ? 'STC Pay' : 'بطاقة بنكية' }] : []),
            ].map((r, i, arr) => (
              <div key={i} className={`flex justify-between pb-3 ${i < arr.length - 1 ? 'border-b border-white/5' : ''}`}>
                <span className="text-white/35 text-[11px]">{r.l}</span>
                <span className="text-white text-[11px] font-semibold">{r.v}</span>
              </div>
            ))}

            {b.type === 'celebration' && pkg && (
              <div className="rounded-[14px] p-3 mt-2"
                style={{ background: 'rgba(107,50,16,0.15)', border: '1px solid rgba(107,50,16,0.25)' }}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-white/35 text-[10px]">سعر الباقة</span>
                  <span className="text-white/60 text-[10px] font-inter">{pkg.price} ر</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/35 text-[10px]">ضريبة ١٥٪</span>
                  <span className="text-white/60 text-[10px] font-inter">{vat} ر</span>
                </div>
                <div className="flex justify-between pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-white font-bold text-[12px]">المدفوع</span>
                  <span className="text-[#C4783A] font-black text-[15px] font-inter">{total} ر</span>
                </div>
              </div>
            )}

            {b.note ? (
              <div className="pt-1">
                <span className="text-white/25 text-[10px]">ملاحظة: {b.note}</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Deposit badge for table bookings */}
        {b.type === 'table' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-[18px] p-4 mb-4 flex items-center gap-3"
            style={{ background: 'rgba(48,209,88,0.08)', border: '1px solid rgba(48,209,88,0.2)' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'rgba(48,209,88,0.15)' }}>
              <span className="text-[16px] font-black text-[#30D158]">٢٥</span>
            </div>
            <div className="flex-1">
              <p className="text-[#30D158] text-[12px] font-black">رسوم الحجز مدفوعة ✓</p>
              <p className="text-white/40 text-[10px] mt-0.5">
                <span className="font-bold text-white/60">{DEPOSIT_AMOUNT} ريال</span> تُخصم تلقائياً من فاتورة طلبك القادم
              </p>
            </div>
          </motion.div>
        )}

        <p className="text-white/20 text-[10px] text-center mb-6">
          الحجز محفوظ في التطبيق · يمكنك الاطلاع عليه في أي وقت
        </p>

        <motion.button whileTap={{ scale: 0.97 }} onClick={onClose}
          className="w-full py-4 rounded-[20px] font-bold text-[15px] text-white"
          style={{ background: 'linear-gradient(135deg,#6B3210,#8B4515)', boxShadow: '0 8px 28px rgba(107,50,16,0.5)' }}>
          تمام 👍
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ── My Bookings list ────────────────────────────────────────── */
function MyBookings({ bookings, onClose }: { bookings: Booking[]; onClose: () => void }) {
  const [open, setOpen] = useState<Booking | null>(null);
  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '110%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      className="absolute inset-0 z-40 overflow-y-auto scrollbar-none pb-8"
      style={{ background: '#F8F7F5' }}>

      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#F8F7F5] px-5 pt-5 pb-3 flex items-center gap-3"
        style={{ borderBottom: '1px solid rgba(196,181,159,0.2)' }}>
        <button onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(196,181,159,0.15)' }}>
          <ChevronRight size={18} className="text-[#6B3210]" />
        </button>
        <div>
          <p className="text-[18px] font-black text-[#111]">حجوزاتي</p>
          <p className="text-[10px] text-[#AAA]">{bookings.length} حجز مسجّل</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 pt-20 px-8 text-center">
          <span className="text-[48px]">📅</span>
          <p className="text-[16px] font-bold text-[#333]">لا يوجد حجوزات بعد</p>
          <p className="text-[12px] text-[#AAA]">احجز طاولة أو احتفالية وستظهر هنا</p>
          <button onClick={onClose}
            className="mt-2 px-5 py-2.5 rounded-[14px] font-bold text-[13px] text-white"
            style={{ background: '#6B3210' }}>
            احجز الآن
          </button>
        </div>
      ) : (
        <div className="px-4 pt-4 space-y-3">
          {bookings.map(b => {
            const pkg = packages.find(p => p.id === b.pkgId);
            const ct  = celebTypes.find(c => c.id === b.celebType);
            return (
              <motion.button key={b.id} whileTap={{ scale: 0.98 }} onClick={() => setOpen(b)}
                className="w-full text-right rounded-[20px] overflow-hidden"
                style={{ background: 'white', border: '1px solid rgba(196,181,159,0.18)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>

                <div className="flex items-center justify-between px-4 pt-3.5 pb-2"
                  style={{ borderBottom: '1px solid rgba(196,181,159,0.1)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px]">{b.type === 'celebration' ? (ct?.emoji ?? '🎊') : '🗓'}</span>
                    <span className="text-[12px] font-black text-[#111]">
                      {b.type === 'table' ? 'حجز طاولة' : (ct?.label ?? 'احتفالية')}
                    </span>
                  </div>
                  <span className="text-[9px] font-black text-[#30D158] bg-[#30D158]/10 px-2 py-0.5 rounded-full">مؤكّد</span>
                </div>

                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-[#555]">{b.date} · {b.time}</p>
                    <p className="text-[10px] text-[#AAA] mt-0.5">{b.guests} أشخاص{pkg ? ` · ${pkg.name}` : ''}</p>
                  </div>
                  <div className="text-left">
                    {b.pkgPrice
                      ? <p className="text-[14px] font-black text-[#6B3210] font-inter">{b.pkgPrice + Math.round(b.pkgPrice * 0.15)} ر</p>
                      : <p className="text-[10px] text-[#AAA]">مجاني</p>}
                    <p className="text-[9px] text-[#AAA] font-inter">{b.id}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Booking detail overlay */}
      <AnimatePresence>
        {open && <BookingCard b={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export function ScreenReservations() {
  const { brand } = useBrand();
  type BookType = 'table' | 'celebration';

  const [bookings,     setBookings]     = useState<Booking[]>([]);
  const [bookType,     setBookType]     = useState<BookType>('table');
  const [dateIdx,      setDateIdx]      = useState(0);
  const [timeIdx,      setTimeIdx]      = useState<number | null>(null);
  const [guests,       setGuests]       = useState(2);
  const [note,         setNote]         = useState('');
  const [celebType,    setCelebType]    = useState<string | null>(null);
  const [selectedPkg,  setSelectedPkg]  = useState<string | null>(null);
  const [showPayment,   setShowPayment]  = useState(false);
  const [showDeposit,   setShowDeposit]  = useState(false);
  const [pendingBook,   setPendingBook]  = useState<Booking | null>(null);
  const [showConfirm,   setShowConfirm]  = useState<Booking | null>(null);
  const [showMyBooks,   setShowMyBooks]  = useState(false);

  const times    = bookType === 'table' ? TABLE_TIMES   : CELEB_TIMES;
  const unavail  = bookType === 'table' ? TABLE_UNAVAIL : CELEB_UNAVAIL;
  const pkg      = packages.find(p => p.id === selectedPkg);

  const canConfirmTable = timeIdx !== null;
  const canConfirmCeleb = timeIdx !== null && !!celebType && !!selectedPkg;
  const canConfirm = bookType === 'table' ? canConfirmTable : canConfirmCeleb;

  function resetForm() {
    setTimeIdx(null); setNote(''); setCelebType(null); setSelectedPkg(null);
  }

  function handleTableConfirm() {
    if (!canConfirmTable) return;
    const b: Booking = {
      id: genId(), type: 'table',
      date: fmtDate(dates[dateIdx]),
      time: TABLE_TIMES[timeIdx!],
      guests, note, status: 'confirmed', createdAt: new Date(),
    };
    setPendingBook(b);
    setShowDeposit(true);
    resetForm();
  }

  function handleDepositPaid() {
    if (!pendingBook) return;
    setBookings(prev => [pendingBook, ...prev]);
    setShowDeposit(false);
    setShowConfirm(pendingBook);
    setPendingBook(null);
  }

  function handleCelebPaid(method: PayMethod) {
    if (!pkg) return;
    const b: Booking = {
      id: genId(), type: 'celebration',
      date: fmtDate(dates[dateIdx]),
      time: CELEB_TIMES[timeIdx!],
      guests, note, celebType: celebType!, pkgId: pkg.id,
      pkgPrice: pkg.price, payMethod: method,
      status: 'confirmed', createdAt: new Date(),
    };
    setBookings(prev => [b, ...prev]);
    setShowPayment(false);
    setShowConfirm(b);
    resetForm();
  }

  return (
    <div className="flex flex-col h-full overflow-hidden relative" style={{ background: '#F8F7F5' }}>

      {/* ── My Bookings slide-in ── */}
      <AnimatePresence>
        {showMyBooks && <MyBookings bookings={bookings} onClose={() => setShowMyBooks(false)} />}
      </AnimatePresence>

      {/* ── Booking Confirmation ── */}
      <AnimatePresence>
        {showConfirm && <BookingCard b={showConfirm} onClose={() => setShowConfirm(null)} />}
      </AnimatePresence>

      {/* ── Table Deposit Sheet ── */}
      <AnimatePresence>
        {showDeposit && pendingBook && (
          <TableDepositSheet
            booking={pendingBook}
            onClose={() => { setShowDeposit(false); setPendingBook(null); }}
            onPaid={handleDepositPaid}
          />
        )}
      </AnimatePresence>

      {/* ── Payment Sheet ── */}
      <AnimatePresence>
        {showPayment && pkg && (
          <PaymentSheet
            pkg={pkg}
            date={fmtDate(dates[dateIdx])}
            time={CELEB_TIMES[timeIdx!]}
            guests={guests}
            celebType={celebType!}
            note={note}
            onClose={() => setShowPayment(false)}
            onPaid={handleCelebPaid}
          />
        )}
      </AnimatePresence>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-28">

        {/* Header */}
        <div className="relative overflow-hidden shrink-0"
          style={{ background: 'linear-gradient(170deg,#0A0002 0%,#1C0408 45%,#3D0810 70%,#0D0205 100%)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 110%,rgba(107,50,16,0.4) 0%,transparent 65%)' }} />
          <div className="relative z-10 flex flex-col items-center pt-6 pb-6 px-5">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="relative mb-3">
              <div className="absolute inset-0 rounded-[18px] blur-xl"
                style={{ background: 'rgba(201,149,106,0.35)', transform: 'scale(1.4)' }} />
              <img src={logoImg} alt={brand.name}
                className="relative w-14 h-14 rounded-[18px] object-cover"
                style={{ border: '2px solid rgba(201,149,106,0.5)', boxShadow: '0 8px 28px rgba(0,0,0,0.5)' }} />
            </motion.div>
            <p className="text-[8px] font-black text-[#C4783A] mb-1.5">{brand.name} · نظام الولاء</p>
            <h1 className="text-[24px] font-black text-white leading-none mb-4">احجز مكانك</h1>

            {/* My bookings chip */}
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowMyBooks(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <Calendar size={13} className="text-[#C4783A]" />
              <span className="text-white/70 text-[11px] font-semibold">حجوزاتي</span>
              {bookings.length > 0 && (
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                  style={{ background: '#6B3210' }}>{bookings.length}</span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Book type toggle */}
        <div className="px-5 pt-4 mb-5">
          <div className="flex bg-white rounded-[18px] p-1.5 gap-1.5"
            style={{ border: '1px solid #EBEBEB', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            {([
              { id: 'table',       emoji: '🗓', label: 'حجز طاولة' },
              { id: 'celebration', emoji: '🎊', label: 'احتفالية'   },
            ] as { id: BookType; emoji: string; label: string }[]).map(opt => (
              <motion.button key={opt.id} whileTap={{ scale: 0.96 }}
                onClick={() => { setBookType(opt.id); setTimeIdx(null); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[14px] font-bold text-[13px]"
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
          <motion.div key={bookType} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>

            {/* ══ CELEBRATION EXTRAS ══ */}
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
                        <span className="text-[10px] font-bold"
                          style={{ color: celebType === ct.id ? '#fff' : '#555' }}>{ct.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Packages */}
                <div className="px-5 mb-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <p className="text-[11px] font-black text-[#111] tracking-wide">الباقات</p>
                    <span className="text-[9px] text-[#BBB]">الدفع فوري عند الحجز</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {packages.map(p => {
                      const isSel = selectedPkg === p.id;
                      const vat   = Math.round(p.price * 0.15);
                      return (
                        <motion.button key={p.id} whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedPkg(p.id)}
                          className="relative rounded-[22px] overflow-hidden text-right"
                          style={{
                            border: isSel ? `2px solid ${p.color}` : '2px solid transparent',
                            boxShadow: isSel ? `0 6px 24px rgba(0,0,0,0.18)` : '0 2px 10px rgba(0,0,0,0.06)',
                          }}>
                          {/* Header */}
                          <div className="px-4 py-3.5 flex items-center justify-between" style={{ background: p.gradient }}>
                            <div className="flex items-center gap-2.5">
                              <span className="text-[30px]">{p.emoji}</span>
                              <div>
                                <p className="text-[7px] font-black tracking-[0.3em] text-white/40 uppercase">{p.nameEn}</p>
                                <p className="text-[16px] font-black text-white leading-tight">{p.name}</p>
                                <p className="text-[9px] text-white/40 mt-0.5">{p.guests}</p>
                              </div>
                            </div>
                            <div className="text-left">
                              {p.badge && (
                                <div className="text-[7px] font-black px-2 py-0.5 rounded-full mb-1 text-white text-center"
                                  style={{ background: 'rgba(255,255,255,0.15)' }}>{p.badge}</div>
                              )}
                              <p className="text-white text-[22px] font-black leading-none tabular-nums">{p.price}</p>
                              <p className="text-white/40 text-[8px]">+ {vat} ض.ق.م</p>
                            </div>
                          </div>
                          {/* Perks */}
                          <div className="bg-white px-4 py-3 flex flex-col gap-1.5">
                            <div className="grid grid-cols-2 gap-1.5">
                              {p.perks.map((perk, pi) => (
                                <div key={pi} className="flex items-center gap-1.5">
                                  <span className="text-[12px] shrink-0">{perk.icon}</span>
                                  <span className="text-[10px] text-[#555]">{perk.text}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-2"
                              style={{ borderTop: '1px solid #F5F3F0' }}>
                              <span className="text-[10px] font-black text-[#6B3210] font-inter">
                                الإجمالي: {p.price + vat} ريال
                              </span>
                              {isSel
                                ? <span className="flex items-center gap-1 text-[10px] font-bold text-[#6B3210]"><Check size={11} strokeWidth={2.5} /> تم الاختيار</span>
                                : <span className="text-[10px] text-[#CCC]">اضغط للاختيار</span>}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* ══ DATE ══ */}
            <div className="px-5 mb-4">
              <p className="text-[11px] font-black text-[#111] tracking-wide mb-3">التاريخ</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                {dates.map((d, i) => (
                  <motion.button key={i} whileTap={{ scale: 0.94 }}
                    onClick={() => { setDateIdx(i); setTimeIdx(null); }}
                    className="shrink-0 flex flex-col items-center py-2.5 px-3.5 rounded-[18px] border transition-all"
                    style={dateIdx === i
                      ? { background: '#6B3210', borderColor: '#6B3210', color: 'white', boxShadow: '0 4px 16px rgba(107,50,16,0.35)' }
                      : { background: 'white', borderColor: '#EBEBEB', color: '#111' }}>
                    <span className="text-[9px] font-medium mb-1"
                      style={{ color: dateIdx === i ? 'rgba(255,255,255,0.65)' : '#AAA' }}>
                      {i === 0 ? 'اليوم' : dayNames[d.getDay()].slice(0, 3)}
                    </span>
                    <span className="text-[18px] font-bold leading-tight">{d.getDate()}</span>
                    <span className="text-[9px] mt-0.5"
                      style={{ color: dateIdx === i ? 'rgba(255,255,255,0.55)' : '#CCC' }}>
                      {monthNames[d.getMonth()].slice(0, 3)}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* ══ TIME ══ */}
            <div className="px-5 mb-4">
              <p className="text-[11px] font-black text-[#111] tracking-wide mb-3">الوقت</p>
              <div className="grid grid-cols-4 gap-2">
                {times.map((t, i) => {
                  const off = unavail.has(i);
                  const sel = timeIdx === i;
                  return (
                    <motion.button key={i} whileTap={off ? {} : { scale: 0.92 }}
                      onClick={() => !off && setTimeIdx(i)}
                      className="py-2.5 rounded-[14px] text-[11px] font-semibold border transition-all"
                      style={sel
                        ? { background: '#6B3210', borderColor: '#6B3210', color: 'white', boxShadow: '0 4px 12px rgba(107,50,16,0.3)' }
                        : off
                        ? { background: '#F5F3F1', borderColor: 'transparent', color: '#CCC', textDecoration: 'line-through', cursor: 'not-allowed' }
                        : { background: 'white', borderColor: '#EBEBEB', color: '#111' }}>
                      {t}
                      {off && <span className="block text-[6px] text-[#CCC] -mt-0.5">محجوز</span>}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* ══ GUESTS ══ */}
            <div className="px-5 mb-4">
              <p className="text-[11px] font-black text-[#111] tracking-wide mb-3">عدد الأشخاص</p>
              <div className="flex gap-2 flex-wrap">
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <motion.button key={n} whileTap={{ scale: 0.88 }}
                    onClick={() => setGuests(n)}
                    className="w-10 h-10 rounded-[12px] text-[13px] font-bold border transition-all"
                    style={guests === n
                      ? { background: '#111', borderColor: '#111', color: 'white' }
                      : { background: 'white', borderColor: '#EBEBEB', color: '#555' }}>
                    {n}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* ══ NOTE ══ */}
            <div className="px-5 mb-5">
              <p className="text-[11px] font-black text-[#111] tracking-wide mb-2">ملاحظة</p>
              <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
                placeholder={bookType === 'table'
                  ? 'مثال: طاولة هادئة، كرسي أطفال...'
                  : 'مثال: اسم صاحب المناسبة، لون التزيين...'}
                className="w-full bg-white rounded-[16px] p-3.5 text-[12px] text-[#111] placeholder:text-[#CCC] font-light resize-none outline-none"
                style={{ border: '1px solid #EBEBEB' }}
                onFocus={e => (e.target.style.borderColor = '#6B3210')}
                onBlur={e => (e.target.style.borderColor = '#EBEBEB')} />
            </div>

            {/* ══ CTA ══ */}
            <div className="px-5">
              {bookType === 'table' ? (
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleTableConfirm}
                  disabled={!canConfirmTable}
                  className="w-full py-4 rounded-[18px] text-[15px] font-bold flex items-center justify-center gap-2"
                  style={canConfirmTable
                    ? { background: '#6B3210', color: 'white', boxShadow: '0 8px 24px rgba(107,50,16,0.35)' }
                    : { background: '#EBEBEB', color: '#BBB', cursor: 'not-allowed' }}>
                  {canConfirmTable
                    ? `✓ تأكيد الحجز — ${TABLE_TIMES[timeIdx!]}`
                    : 'اختر الوقت أولاً'}
                </motion.button>
              ) : (
                <motion.button whileTap={{ scale: 0.97 }}
                  onClick={() => canConfirmCeleb && setShowPayment(true)}
                  disabled={!canConfirmCeleb}
                  className="w-full py-4 rounded-[18px] text-[15px] font-bold flex items-center justify-center gap-2"
                  style={canConfirmCeleb
                    ? { background: 'linear-gradient(135deg,#6B3210,#8B4515)', color: 'white', boxShadow: '0 8px 28px rgba(107,50,16,0.5)' }
                    : { background: '#EBEBEB', color: '#BBB', cursor: 'not-allowed' }}>
                  {canConfirmCeleb
                    ? `ادفع الآن — ${pkg ? pkg.price + Math.round(pkg.price * 0.15) : ''} ريال`
                    : !celebType ? 'اختر نوع المناسبة أولاً'
                    : !selectedPkg ? 'اختر الباقة أولاً'
                    : 'اختر الوقت أولاً'}
                </motion.button>
              )}
              <p className="text-center text-[9px] text-[#CCC] mt-2 font-light">
                {bookType === 'table'
                  ? 'الحجز محفوظ في التطبيق — لا حاجة لواتساب'
                  : 'الدفع آمن · فاتورة ضريبية فورية'}
              </p>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
