import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Check } from 'lucide-react';

const logoImg = `${import.meta.env.BASE_URL}hyz-logo.jpeg`;

const today = new Date();
const dates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() + i);
  return d;
});
const dayNames = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const monthNames = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

const times = ['٨:٠٠ ص','٩:٠٠ ص','١٠:٠٠ ص','١١:٠٠ ص','١٢:٠٠ م','١:٠٠ م','٢:٠٠ م','٣:٠٠ م','٤:٠٠ م','٥:٠٠ م'];
const unavailable = [1, 5, 8];

const upcomingBookings = [
  { date: 'الخميس، ١٧ يوليو', time: '٤:٠٠ م', guests: 2, ref: '#H-4412', status: 'مؤكد' },
];

export function ScreenReservations() {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    if (selectedTime === null) return;
    setShowSuccess(true);
    setTimeout(() => { setShowSuccess(false); setConfirmed(true); setSelectedTime(null); }, 2800);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none pb-24" style={{ background: '#FAF7F3' }}>

      {/* ── Dark premium header ─────────────────────────────────── */}
      <div className="relative overflow-hidden shrink-0"
        style={{ background: 'linear-gradient(170deg,#080002 0%,#200407 40%,#3D0809 70%,#0D0205 100%)' }}>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 90%,rgba(201,149,106,0.15) 0%,transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '10px 10px' }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(201,149,106,0.4),transparent)' }} />

        <div className="relative z-10 flex flex-col items-center pt-6 pb-5 px-5">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mb-3"
          >
            <div className="absolute inset-0 rounded-[18px] blur-xl"
              style={{ background: 'rgba(201,149,106,0.3)', transform: 'scale(1.3)' }} />
            <img src={logoImg} alt="حيز"
              className="relative w-14 h-14 rounded-[18px] object-cover"
              style={{ border: '2px solid rgba(201,149,106,0.45)', boxShadow: '0 0 0 1px rgba(201,149,106,0.12), 0 8px 28px rgba(0,0,0,0.5)' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-center">
            <p className="text-[9px] font-black tracking-[0.32em] text-[#C9956A] mb-1"
              style={{ fontFamily: 'ui-monospace,monospace' }}>HYZ CAFÉ · ABHA</p>
            <h1 className="text-[24px] font-black text-white leading-none tracking-tight">احجز طاولتك</h1>
            <p className="text-white/30 text-[10px] mt-1.5 font-light">شارع لبنان · من ٦ص حتى ٦:٣٠م</p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex items-center gap-5 mt-4 pt-4 w-full justify-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { v: '٧', l: 'أيام متاحة' },
              { v: '١٠', l: 'أوقات يومياً' },
              { v: 'فوري', l: 'تأكيد واتساب' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-white text-[13px] font-black font-inter leading-none">{s.v}</p>
                <p className="text-white/30 text-[8px] mt-0.5">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-4 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom,transparent,#FAF7F3)' }} />
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-5 mb-3 bg-[#1C1C1E] text-white rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-[#30D158] rounded-full flex items-center justify-center shrink-0">
              <Check size={16} className="text-white" strokeWidth={3} />
            </div>
            <div>
              <p className="text-[13px] font-semibold">تم الحجز بنجاح! 🎉</p>
              <p className="text-[11px] text-white/60 font-light">سيصلك تأكيد على واتساب</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upcoming bookings */}
      {upcomingBookings.length > 0 && (
        <div className="px-5 mb-4">
          <p className="text-[11px] text-[#AAA] font-medium tracking-wider mb-2">حجوزاتك القادمة</p>
          {upcomingBookings.map((b, i) => (
            <div key={i} className="bg-[#7B1618]/8 border border-[#7B1618]/20 rounded-2xl p-3.5 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold text-[#111]">{b.date} · {b.time}</p>
                <p className="text-[11px] text-[#888] font-light mt-0.5">{b.guests} أشخاص · {b.ref}</p>
              </div>
              <span className="text-[10px] font-semibold text-[#30D158] bg-[#30D158]/10 px-2.5 py-1 rounded-full">{b.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* Date selector */}
      <div className="px-5 mb-4">
        <p className="text-[12px] font-semibold text-[#111] mb-3">اختر التاريخ</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {dates.map((d, i) => {
            const isActive = selectedDate === i;
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.94 }}
                onClick={() => { setSelectedDate(i); setSelectedTime(null); }}
                className={`shrink-0 flex flex-col items-center py-2.5 px-3.5 rounded-2xl transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#7B1618] border-[#7B1618] text-white shadow-[0_4px_16px_rgba(123,22,24,0.3)]'
                    : 'bg-white border-[rgba(196,181,159,0.2)] text-[#111]'
                }`}
              >
                <span className={`text-[10px] font-medium mb-1 ${isActive ? 'text-white/70' : 'text-[#888]'}`}>
                  {i === 0 ? 'اليوم' : dayNames[d.getDay()].slice(0, 3)}
                </span>
                <span className={`text-[18px] font-bold leading-tight ${isActive ? 'text-white' : 'text-[#111]'}`}>
                  {d.getDate()}
                </span>
                <span className={`text-[9px] mt-0.5 ${isActive ? 'text-white/60' : 'text-[#AAA]'}`}>
                  {monthNames[d.getMonth()].slice(0, 3)}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <div className="px-5 mb-4">
        <p className="text-[12px] font-semibold text-[#111] mb-3">اختر الوقت</p>
        <div className="grid grid-cols-4 gap-2">
          {times.map((t, i) => {
            const isUnavail = unavailable.includes(i);
            const isSelected = selectedTime === i;
            return (
              <motion.button
                key={i}
                whileTap={isUnavail ? {} : { scale: 0.92 }}
                onClick={() => !isUnavail && setSelectedTime(i)}
                className={`py-2 rounded-xl text-[11px] font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#7B1618] border-[#7B1618] text-white shadow-[0_4px_12px_rgba(123,22,24,0.25)]'
                    : isUnavail
                    ? 'bg-[#F0EBE4] border-transparent text-[#CCC] cursor-not-allowed line-through'
                    : 'bg-white border-[rgba(196,181,159,0.2)] text-[#111] hover:border-[#C4B59F]'
                }`}
              >
                {t}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Guests selector */}
      <div className="px-5 mb-4">
        <p className="text-[12px] font-semibold text-[#111] mb-3">عدد الأشخاص</p>
        <div className="flex gap-2">
          {[1,2,3,4,5,6].map(n => (
            <motion.button
              key={n}
              whileTap={{ scale: 0.88 }}
              onClick={() => setGuests(n)}
              className={`w-11 h-11 rounded-xl text-[13px] font-bold transition-all duration-200 border ${
                guests === n
                  ? 'bg-[#111] border-[#111] text-white'
                  : 'bg-white border-[rgba(196,181,159,0.25)] text-[#111]'
              }`}
            >
              {n}
            </motion.button>
          ))}
          <div className="flex-1 flex items-center gap-1 text-[#888] text-[11px]">
            <Users size={14} />
            <span>{guests > 1 ? 'أشخاص' : 'شخص'}</span>
          </div>
        </div>
      </div>

      {/* Special note */}
      <div className="px-5 mb-5">
        <p className="text-[12px] font-semibold text-[#111] mb-2">ملاحظة خاصة</p>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="مثال: أحتاج كرسي أطفال، أو أحتفل بمناسبة..."
          rows={2}
          className="w-full bg-white border border-[rgba(196,181,159,0.25)] rounded-2xl p-3 text-[12px] text-[#111] placeholder:text-[#CCC] font-light resize-none outline-none focus:border-[#C4B59F] transition-colors"
        />
      </div>

      {/* Confirm button */}
      <div className="px-5">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleConfirm}
          disabled={selectedTime === null}
          className={`w-full py-4 rounded-2xl text-[15px] font-semibold transition-all duration-300 ${
            selectedTime !== null
              ? 'bg-[#7B1618] text-white shadow-[0_8px_24px_rgba(123,22,24,0.3)]'
              : 'bg-[#E5DDD4] text-[#AAA] cursor-not-allowed'
          }`}
        >
          {selectedTime !== null
            ? `تأكيد الحجز — ${times[selectedTime]}`
            : 'اختر الوقت أولاً'}
        </motion.button>
        <p className="text-center text-[11px] text-[#AAA] mt-2.5 font-light">
          لا يُشترط الحجز لشخص واحد · تيك آواي بدون حجز
        </p>
      </div>
    </div>
  );
}
