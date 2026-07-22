import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, ChefHat, Bike, Star } from 'lucide-react';

const WHATSAPP_NUM = '966551378531';

/* ── Status tracker ─────────────────────────────────────────────── */
const ORDER_STEPS = [
  { id: 'confirmed', label: 'تم الاستلام', icon: Check,   color: '#30D158' },
  { id: 'preparing', label: 'يُحضَّر',     icon: ChefHat, color: '#C9956A' },
  { id: 'ready',     label: 'جاهز',        icon: Clock,   color: '#007AFF' },
  { id: 'delivered', label: 'تم التوصيل', icon: Bike,    color: '#7B1618' },
];

function OrderTracker({ step }: { step: number }) {
  return (
    <div className="flex items-center w-full">
      {ORDER_STEPS.map((s, i) => {
        const done    = i < step;
        const active  = i === step;
        const Icon    = s.icon;
        return (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-1 shrink-0">
              <motion.div
                animate={active ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: done || active
                    ? `linear-gradient(135deg,${s.color}CC,${s.color}88)`
                    : 'rgba(196,181,159,0.15)',
                  boxShadow: active ? `0 0 14px ${s.color}55` : 'none',
                }}
              >
                <Icon size={15} className={done || active ? 'text-white' : 'text-[#CCC]'} strokeWidth={2} />
              </motion.div>
              <p className="text-[8px] font-medium text-center leading-tight"
                style={{ color: done || active ? s.color : '#CCC', maxWidth: 44 }}>
                {s.label}
              </p>
            </div>
            {i < ORDER_STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-1 rounded-full relative overflow-hidden" style={{ background: 'rgba(196,181,159,0.15)' }}>
                {done && (
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: '100%' }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: `linear-gradient(90deg,${ORDER_STEPS[i].color},${ORDER_STEPS[i+1].color})` }}
                  />
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── Active Order card ──────────────────────────────────────────── */
function ActiveOrder() {
  const [step, setStep] = useState(1); // start at "يُحضَّر"

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(2), 6000),
      setTimeout(() => setStep(3), 13000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const eta = step === 1 ? '١٨ دقيقة' : step === 2 ? '٥ دقائق' : 'وصل!';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-5 rounded-[22px] overflow-hidden"
      style={{
        background: 'linear-gradient(150deg,#0C0002 0%,#230405 50%,#0D0205 100%)',
        border: '1px solid rgba(201,149,106,0.15)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
      }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 80% 0%,rgba(201,149,106,0.1) 0%,transparent 55%)' }} />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[9px] text-[#C9956A] font-bold tracking-widest mb-0.5">طلب نشط</p>
            <p className="text-white text-[15px] font-bold">طلب #٢٠٢٦-٠٤٧١</p>
          </div>
          <div className="text-center px-3 py-1.5 rounded-[12px]"
            style={{ background: step === 3 ? 'rgba(48,209,88,0.15)' : 'rgba(201,149,106,0.12)', border: `1px solid ${step === 3 ? 'rgba(48,209,88,0.3)' : 'rgba(201,149,106,0.25)'}` }}>
            <p className="text-[8px] font-medium" style={{ color: step === 3 ? '#30D158' : '#C9956A' }}>وقت الوصول</p>
            <p className="text-[15px] font-black font-inter" style={{ color: step === 3 ? '#30D158' : 'white' }}>{eta}</p>
          </div>
        </div>

        {/* Items */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {['برجر كلاسيك ×١', 'لاتيه ×١', 'كولسلو ×١'].map((item, i) => (
            <span key={i} className="text-[10px] font-medium px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)' }}>
              {item}
            </span>
          ))}
        </div>

        {/* Tracker */}
        <OrderTracker step={step} />

        {/* ETA footer */}
        {step < 3 && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 text-center"
          >
            <p className="text-white/20 text-[9px]">يتحدث تلقائياً · لا تحتاج تضغط شيء</p>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="mt-4 flex items-center justify-center gap-2 py-2 rounded-[12px]"
            style={{ background: 'rgba(48,209,88,0.12)', border: '1px solid rgba(48,209,88,0.25)' }}>
            <Check size={13} className="text-[#30D158]" strokeWidth={2.5} />
            <p className="text-[#30D158] text-[12px] font-bold">طلبك وصل — بالعافية!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Past Orders ────────────────────────────────────────────────── */
const pastOrders = [
  {
    id: '#٢٠٢٦-٠٤٦٨',
    date: 'أمس · ٨:٣٠ م',
    items: 'كبسة جمبري + لاتيه',
    total: '١٠٧ ر',
    pts: '+٢٥ نقطة',
    rating: 5,
  },
  {
    id: '#٢٠٢٦-٠٤٥١',
    date: 'السبت الماضي',
    items: 'برجر كلاسيك + كولسلو + بيبسي',
    total: '٦٨ ر',
    pts: '+١٥ نقطة',
    rating: 5,
  },
  {
    id: '#٢٠٢٦-٠٤٣٢',
    date: 'الأسبوع الماضي',
    items: 'سلطة سيزر + لاتيه فاخر',
    total: '٥٠ ر',
    pts: '+١٢ نقطة',
    rating: 4,
  },
];

/* ── Main Screen ────────────────────────────────────────────────── */
export function ScreenOrders() {
  const waMsg = encodeURIComponent('السلام عليكم، أريد الطلب 🛵');

  return (
    <div className="flex flex-col h-full bg-[#F5EDE2]">
      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">

        {/* Header */}
        <div className="px-5 pt-5 pb-4">
          <p className="text-[10px] text-[#7B1618] font-bold tracking-widest mb-0.5">الطلبات</p>
          <h1 className="text-[22px] font-bold text-[#111]">طلباتي</h1>
        </div>

        {/* WhatsApp CTA — hero */}
        <div className="mx-4 mb-5">
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUM}?text=${waMsg}`}
            target="_blank" rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-4 px-5 py-4 rounded-[22px] relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg,#128C7E,#075E54)',
              boxShadow: '0 8px 30px rgba(18,140,126,0.4)',
            }}
          >
            {/* Shimmer */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 90% 10%,rgba(255,255,255,0.12) 0%,transparent 60%)' }} />

            {/* WhatsApp icon */}
            <div className="w-14 h-14 rounded-[18px] flex items-center justify-center shrink-0"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>

            <div className="flex-1">
              <p className="text-[8px] text-white/55 font-medium tracking-widest mb-0.5">بدون تطبيق · بدون تسجيل</p>
              <p className="text-white text-[16px] font-bold leading-tight">اطلب الآن عبر واتساب</p>
              <p className="text-white/60 text-[10px] font-light mt-0.5">رسالة واحدة وطلبك في الطريق</p>
            </div>

            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white/40 shrink-0" strokeWidth={2}>
              <path d="M19 12H5M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>

        {/* Active Order */}
        <div className="px-5 mb-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
            <p className="text-[11px] font-bold text-[#111]">طلب الآن</p>
          </div>
        </div>
        <ActiveOrder />

        {/* Past Orders */}
        <div className="px-5">
          <p className="text-[11px] font-bold text-[#111] mb-3">الطلبات السابقة</p>
          <div className="space-y-3">
            {pastOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-[18px] p-4 border border-[rgba(196,181,159,0.15)] shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-[12px] font-bold text-[#111]">{order.id}</p>
                    <p className="text-[10px] text-[#AAA] font-light mt-0.5">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-black text-[#7B1618] font-inter">{order.total}</p>
                    <p className="text-[9px] text-[#30D158] font-bold mt-0.5">{order.pts}</p>
                  </div>
                </div>

                <p className="text-[11px] text-[#666] mb-3 leading-relaxed">{order.items}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={10} fill={j < order.rating ? '#C9956A' : 'transparent'}
                        className={j < order.rating ? 'text-[#C9956A]' : 'text-[#DDD]'} />
                    ))}
                  </div>
                  <motion.a
                    href={`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(`السلام عليكم، أريد إعادة طلب ${order.items} 🔄`)}`}
                    target="_blank" rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold"
                    style={{ background: 'rgba(18,140,126,0.08)', color: '#075E54' }}>
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    اطلب مرة ثانية
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Points nudge */}
        <div className="mx-4 mt-4 mb-2 px-4 py-3.5 rounded-[16px] flex items-center gap-3"
          style={{ background: 'rgba(201,149,106,0.1)', border: '1px solid rgba(201,149,106,0.2)' }}>
          <Star size={18} fill="#C9956A" className="text-[#C9956A] shrink-0" />
          <div>
            <p className="text-[12px] font-bold text-[#111]">٣ طلبات أخرى وتكسب وجبة مجانية</p>
            <p className="text-[10px] text-[#AAA] font-light mt-0.5">كل طلب = ٢٥ نقطة · رصيدك الآن ٤٨٠</p>
          </div>
        </div>
      </div>
    </div>
  );
}
