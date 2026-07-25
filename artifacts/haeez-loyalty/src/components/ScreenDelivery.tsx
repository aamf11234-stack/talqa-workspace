import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ChevronLeft, Truck, Star, Coffee } from 'lucide-react';
import { useBrand } from '../BrandContext';
import { CheckoutModal } from './CheckoutFlow';
import type { CheckoutItem, CompletedOrderData } from './CheckoutFlow';
import { useOrders } from '../OrdersContext';

/* ── Delivery zone card ─────────────────────────────────────────── */
function ZoneCard({ name, time, active, onClick }: { name: string; time: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button whileTap={{ scale: 0.95 }} onClick={onClick}
      className="flex items-center gap-3 p-4 rounded-[18px] text-right transition-all"
      style={{
        background: active ? 'linear-gradient(135deg,#B06070,#8A3050)' : 'white',
        border: active ? 'none' : '1.5px solid rgba(196,181,159,0.25)',
        boxShadow: active ? '0 6px 20px rgba(176,96,112,0.35)' : '0 2px 10px rgba(0,0,0,0.04)',
      }}>
      <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
        style={{ background: active ? 'rgba(255,255,255,0.18)' : 'rgba(176,96,112,0.08)' }}>
        <MapPin size={17} style={{ color: active ? 'white' : '#B06070' }} />
      </div>
      <div className="flex-1 text-right">
        <p className="font-bold" style={{ color: active ? 'white' : '#111', fontSize: 14 }}>{name}</p>
        <p style={{ color: active ? 'rgba(255,255,255,0.65)' : '#AAA', fontSize: 10 }}>⏱ {time}</p>
      </div>
      {active && <div className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </div>}
    </motion.button>
  );
}

/* ── Popular item card ──────────────────────────────────────────── */
function PopularCard({ emoji, name, price, badge, onOrder }: { emoji: string; name: string; price: string; badge?: string; onOrder: () => void }) {
  return (
    <motion.button whileTap={{ scale: 0.94 }} onClick={onOrder}
      className="flex flex-col rounded-[20px] overflow-hidden text-right"
      style={{ background: 'white', border: '1.5px solid rgba(196,181,159,0.18)', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
      <div className="w-full h-[90px] flex items-center justify-center text-[42px] relative"
        style={{ background: 'linear-gradient(135deg,rgba(176,96,112,0.08),rgba(201,149,106,0.08))' }}>
        {emoji}
        {badge && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[8px] font-black text-white"
            style={{ background: '#B06070' }}>{badge}</span>
        )}
      </div>
      <div className="px-3 py-2.5">
        <p className="text-[11px] font-bold text-[#111] leading-tight mb-0.5">{name}</p>
        <p className="text-[#B06070] text-[12px] font-black font-inter">{price} ر</p>
      </div>
    </motion.button>
  );
}

/* ── Live order tracker ─────────────────────────────────────────── */
function LiveTracker({ onDone }: { onDone: () => void }) {
  const [step, setStep] = React.useState(0);
  const steps = [
    { icon: '✅', label: 'تم استلام الطلب', sub: 'براون دوز استلم طلبك' },
    { icon: '☕', label: 'جاري التحضير', sub: 'الباريستا يحضّر طلبك الحين' },
    { icon: '🛵', label: 'في الطريق إليك', sub: 'المندوب انطلق من الفرع' },
    { icon: '📍', label: 'وصل طلبك!', sub: 'استمتع بكوبك ☕' },
  ];
  React.useEffect(() => {
    if (step >= steps.length - 1) return;
    const t = setTimeout(() => setStep(s => s + 1), 2200);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-5 rounded-[22px] overflow-hidden"
      style={{ background: 'linear-gradient(145deg,#0D0205,#280610,#0D0205)', border: '1px solid rgba(176,96,112,0.2)' }}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white text-[13px] font-bold">تتبع طلبك</p>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(48,209,88,0.12)', border: '1px solid rgba(48,209,88,0.2)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-pulse" />
            <span className="text-[#30D158] text-[9px] font-bold">مباشر</span>
          </div>
        </div>
        <div className="space-y-3">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0.3 }} animate={{ opacity: i <= step ? 1 : 0.3 }}
              className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[16px] shrink-0"
                style={{ background: i <= step ? 'rgba(176,96,112,0.15)' : 'rgba(255,255,255,0.04)' }}>
                {s.icon}
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold" style={{ color: i <= step ? 'white' : 'rgba(255,255,255,0.3)' }}>{s.label}</p>
                {i === step && <p className="text-[9px] text-[#B06070] mt-0.5">{s.sub}</p>}
              </div>
              {i < step && <div className="w-4 h-4 rounded-full bg-[#30D158] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </div>}
              {i === step && <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-4 h-4 rounded-full bg-[#B06070] shrink-0" />}
            </motion.div>
          ))}
        </div>
        {step === steps.length - 1 && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.96 }} onClick={onDone}
            className="mt-4 w-full py-3 rounded-[14px] text-white font-bold text-[12px]"
            style={{ background: 'linear-gradient(135deg,#B06070,#8A3050)' }}>
            تم! ⭐ قيّم تجربتك
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ScreenDelivery
══════════════════════════════════════════════════════════════════ */
export function ScreenDelivery() {
  const { brand } = useBrand();
  const { addOrder } = useOrders();
  const [zone, setZone] = useState<'sabya' | 'damad'>('sabya');
  const [pendingOrder, setPendingOrder] = useState<CheckoutItem | null>(null);
  const [tracking, setTracking] = useState(false);

  const popular: { emoji: string; name: string; price: string; badge?: string }[] = [
    { emoji: '🍫', name: 'أفقاتو براون', price: '٢٥', badge: '⭐ الأشهر' },
    { emoji: '☕', name: 'كراميل لاتيه', price: '٢٠' },
    { emoji: '🧊', name: 'ايس ستفتشر براون', price: '١٩', badge: '🔥 جديد' },
    { emoji: '🫘', name: 'أثيوبي هنيبلا', price: '١٧' },
  ];

  function handleOrderComplete(data: CompletedOrderData) {
    addOrder(data);
    setTracking(true);
  }

  return (
    <div className="min-h-full pb-24" style={{ background: '#FDFBF7' }}>
      {/* Header */}
      <div className="relative overflow-hidden px-5 pt-6 pb-8"
        style={{ background: 'linear-gradient(160deg,#0D0205 0%,#200810 35%,#3A1530 60%,#0D0205 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 30%,rgba(176,96,112,0.6) 0%,transparent 55%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 10% 80%,rgba(201,149,106,0.1) 0%,transparent 50%)' }} />
        <div className="relative">
          <div className="flex items-center justify-between mb-1">
            <p className="text-white/40 text-[10px] tracking-widest font-light">BROWN DOSE</p>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(48,209,88,0.12)', border: '1px solid rgba(48,209,88,0.2)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-pulse" />
              <span className="text-[#30D158] text-[9px] font-bold">متاح الآن</span>
            </div>
          </div>
          <h1 className="text-white text-[22px] font-bold leading-tight mb-1">طلب توصيل</h1>
          <p className="text-white/40 text-[11px] font-light">نوصّل لصبيا وضمد — خلال ٣٠-٤٥ دقيقة</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-4 relative z-10">

        {/* Tracking (if active) */}
        <AnimatePresence>
          {tracking && <LiveTracker onDone={() => setTracking(false)} />}
        </AnimatePresence>

        {/* Zones */}
        <div className="mb-5">
          <p className="text-[12px] font-bold text-[#111] mb-3">اختر فرع التوصيل</p>
          <div className="flex flex-col gap-2">
            <ZoneCard name="فرع صبيا" time="٣٠-٤٠ دقيقة" active={zone === 'sabya'} onClick={() => setZone('sabya')} />
            <ZoneCard name="فرع ضمد"  time="٣٥-٤٥ دقيقة" active={zone === 'damad'} onClick={() => setZone('damad')} />
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-2 mb-5">
          {[
            { icon: '🛵', val: 'مجاني', label: 'التوصيل' },
            { icon: '⏱', val: '٣٠ د', label: 'متوسط الوقت' },
            { icon: '⭐', val: '٤.٩', label: 'تقييم المندوبين' },
          ].map((s, i) => (
            <div key={i} className="flex-1 rounded-[16px] p-3 text-center"
              style={{ background: 'white', border: '1px solid rgba(196,181,159,0.2)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <p className="text-[16px] mb-0.5">{s.icon}</p>
              <p className="text-[13px] font-black text-[#111] font-inter">{s.val}</p>
              <p className="text-[9px] text-[#AAA]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Popular items */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-bold text-[#111]">الأكثر طلباً</p>
            <span className="text-[10px] text-[#B06070] font-semibold">مثالي للتوصيل</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {popular.map((p, i) => (
              <PopularCard key={i} {...p}
                onOrder={() => setPendingOrder({ name: p.name, price: p.price, emoji: p.emoji })} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-[20px] p-5 flex items-center gap-4 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#0D0205,#280610)', border: '1px solid rgba(176,96,112,0.2)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 80% 50%,rgba(176,96,112,0.15) 0%,transparent 60%)' }} />
          <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[26px] shrink-0"
            style={{ background: 'rgba(176,96,112,0.15)' }}>🛵</div>
          <div className="flex-1 relative">
            <p className="text-white text-[13px] font-bold">تصفّح المنيو الكامل</p>
            <p className="text-white/40 text-[10px] mt-0.5">حار · بارد · مقطرة · كيك براون</p>
          </div>
          <motion.button whileTap={{ scale: 0.92 }}
            onClick={() => setPendingOrder({ name: brand.todaySpecial.name, price: brand.todaySpecial.price, emoji: brand.todaySpecial.emoji })}
            className="px-4 py-2.5 rounded-[12px] text-white text-[11px] font-bold shrink-0 relative"
            style={{ background: 'linear-gradient(135deg,#B06070,#8A3050)' }}>
            اطلب
          </motion.button>
        </motion.div>
      </div>

      {/* Checkout modal */}
      <AnimatePresence>
        {pendingOrder && (
          <CheckoutModal
            item={pendingOrder}
            brandName={brand.name}
            brandType={brand.type}
            logoImg={brand.logoImg}
            onClose={() => setPendingOrder(null)}
            onOrderComplete={handleOrderComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
