import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, ChefHat, Bike, Star, ShoppingBag, RotateCcw, Truck, Package, Phone, MapPin, X } from 'lucide-react';
import { CheckoutModal, BRANCHES } from './CheckoutFlow';
import type { CheckoutItem, CompletedOrderData } from './CheckoutFlow';
import { useOrders } from '../OrdersContext';
import { useBrand } from '../BrandContext';

/* ── Status tracker ─────────────────────────────────────────────── */
const ORDER_STEPS = [
  { id: 'confirmed', label: 'تم الاستلام', icon: Check,   color: '#30D158' },
  { id: 'preparing', label: 'يُحضَّر',     icon: ChefHat, color: '#7A3B18' },
  { id: 'ready',     label: 'جاهز',        icon: Clock,   color: '#007AFF' },
  { id: 'delivered', label: 'تم التوصيل', icon: Bike,    color: '#6B3210' },
];

function OrderTracker({ step }: { step: number }) {
  return (
    <div className="flex items-center w-full">
      {ORDER_STEPS.map((s, i) => {
        const done   = i < step;
        const active = i === step;
        const Icon   = s.icon;
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

/* ── Branch Sheet (in orders) ───────────────────────────────────── */
function BranchSheet({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40" />
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 320 }}
        className="absolute inset-x-0 bottom-0 z-50 rounded-t-[24px] bg-white overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#F2F2F2]">
          <div>
            <p className="text-[16px] font-black text-[#111]">فروع براون دوز</p>
            <p className="text-[10px] text-[#AAA] mt-0.5">٣ فروع · صبيا، جيزان، ضمد</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#F5F4F2] flex items-center justify-center">
            <X size={14} className="text-[#888]" />
          </button>
        </div>
        <div className="px-5 pt-4 pb-10 flex flex-col gap-3">
          {BRANCHES.map(b => (
            <a key={b.id} href={b.mapsUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-[16px] bg-white no-underline"
              style={{ border: '1px solid #EBEBEB' }}>
              <div className="w-11 h-11 rounded-[13px] bg-[#F5F4F2] flex items-center justify-center text-[22px] shrink-0">
                {b.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-[#111]">{b.name}</p>
                <p className="text-[10px] text-[#AAA] mt-0.5">{b.address}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#F0FBF3] flex items-center justify-center shrink-0">
                <MapPin size={14} className="text-[#16A34A]" />
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
}

/* ── Active Order card ──────────────────────────────────────────── */
function ActiveOrder({ items, orderId }: { items: string; orderId: string }) {
  const [step, setStep] = useState(1);
  const [showBranches, setShowBranches] = useState(false);
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(2), 7000),
      setTimeout(() => setStep(3), 15000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  const eta = step === 1 ? '١٨ دقيقة' : step === 2 ? '٥ دقائق' : 'وصل!';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-5 rounded-[22px] overflow-hidden relative"
      style={{
        background: 'linear-gradient(150deg,#0C0002 0%,#230405 50%,#0D0205 100%)',
        border: '1px solid rgba(201,149,106,0.15)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 0%,rgba(201,149,106,0.1) 0%,transparent 55%)' }} />
      <div className="relative p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[9px] text-[#7A3B18] font-bold tracking-widest mb-0.5">طلب نشط</p>
            <p className="text-white text-[15px] font-bold">{orderId}</p>
          </div>
          <div className="text-center px-3 py-1.5 rounded-[12px]"
            style={{ background: step === 3 ? 'rgba(48,209,88,0.15)' : 'rgba(201,149,106,0.12)', border: `1px solid ${step === 3 ? 'rgba(48,209,88,0.3)' : 'rgba(201,149,106,0.25)'}` }}>
            <p className="text-[8px] font-medium" style={{ color: step === 3 ? '#30D158' : '#7A3B18' }}>وقت الوصول</p>
            <p className="text-[15px] font-black font-inter" style={{ color: step === 3 ? '#30D158' : 'white' }}>{eta}</p>
          </div>
        </div>
        <div className="flex gap-2 mb-4 flex-wrap">
          {items.split(' + ').map((item, i) => (
            <span key={i} className="text-[10px] font-medium px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)' }}>
              {item}
            </span>
          ))}
        </div>
        <OrderTracker step={step} />

        {/* Branch sheet */}
        <AnimatePresence>
          {showBranches && <BranchSheet onClose={() => setShowBranches(false)} />}
        </AnimatePresence>

        {/* Call branch button */}
        <div className="flex gap-2 mt-4">
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowBranches(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[12px]"
            style={{ background: 'rgba(48,209,88,0.12)', border: '1px solid rgba(48,209,88,0.25)' }}>
            <MapPin size={13} className="text-[#30D158]" strokeWidth={2.5} />
            <span className="text-[#30D158] text-[11px] font-bold">الفروع على الخريطة</span>
          </motion.button>
          <motion.div animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[12px]"
            style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#7A3B18] animate-pulse" />
            <span className="text-white/30 text-[9px]">يتحدث تلقائياً</span>
          </motion.div>
        </div>

        {step === 3 && (
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 text-center">
            <p className="text-white/20 text-[9px]">يتحدث تلقائياً · لا تحتاج تضغط شيء</p>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="mt-3 flex items-center justify-center gap-2 py-2 rounded-[12px]"
            style={{ background: 'rgba(48,209,88,0.12)', border: '1px solid rgba(48,209,88,0.25)' }}>
            <Check size={13} className="text-[#30D158]" strokeWidth={2.5} />
            <p className="text-[#30D158] text-[12px] font-bold">طلبك وصل — بالعافية!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Past order card ────────────────────────────────────────────── */
interface PastOrder {
  id: string;
  date: string;
  items: string;
  total: string;
  basePrice: number;
  pts: string;
  rating: number;
  emoji: string;
}

const staticPastOrders: PastOrder[] = [
  { id: '#٢٠٢٦-٠٤٦٨', date: 'أمس · ٨:٣٠ م',       items: 'افقاتو براون + كرواسون لوز',        total: '٥٢ ر', basePrice: 45,  pts: '+١٢ نقطة', rating: 5, emoji: '☕' },
  { id: '#٢٠٢٦-٠٤٥١', date: 'السبت الماضي',         items: 'لاتيه بستاشيو + كيك تشيز',          total: '٤٥ ر', basePrice: 39,  pts: '+١٠ نقطة', rating: 5, emoji: '🍰' },
  { id: '#٢٠٢٦-٠٤٣٢', date: 'الأسبوع الماضي',      items: 'ايس امريكانو + بسكويت لوز',          total: '٢٨ ر', basePrice: 24,  pts: '+٧ نقطة',  rating: 4, emoji: '🧊' },
];

function PastOrderCard({ order, onReorder }: { order: PastOrder; onReorder: (item: CheckoutItem) => void }) {
  return (
    <div className="bg-white rounded-[18px] p-4 border border-[rgba(196,181,159,0.15)] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-[12px] font-bold text-[#111]">{order.id}</p>
          <p className="text-[10px] text-[#AAA] font-light mt-0.5">{order.date}</p>
        </div>
        <div className="text-right">
          <p className="text-[13px] font-black text-[#6B3210] font-inter">{order.total}</p>
          <p className="text-[9px] text-[#30D158] font-bold mt-0.5">{order.pts}</p>
        </div>
      </div>
      <p className="text-[11px] text-[#666] mb-3 leading-relaxed">{order.items}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} size={10} fill={j < order.rating ? '#7A3B18' : 'transparent'}
              className={j < order.rating ? 'text-[#7A3B18]' : 'text-[#DDD]'} />
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onReorder({ name: order.items, price: String(order.basePrice), emoji: order.emoji })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold"
          style={{ background: 'rgba(160,82,45,0.07)', color: '#6B3210' }}>
          <RotateCcw size={10} />
          اعد الطلب
        </motion.button>
      </div>
    </div>
  );
}

/* ── Main Screen ────────────────────────────────────────────────── */
export function ScreenOrders() {
  const { orders, addOrder } = useOrders();
  const { brand } = useBrand();
  const [pendingOrder, setPendingOrder] = useState<CheckoutItem | null>(null);
  const [newOrderTriggered, setNewOrderTriggered] = useState(false);

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
    setNewOrderTriggered(true);
    setTimeout(() => setNewOrderTriggered(false), 4000);
  }

  // Convert context orders to PastOrder format for display
  const contextOrders: PastOrder[] = orders.map(o => ({
    id: `#${o.id}`,
    date: 'للتو',
    items: o.itemName,
    total: `${o.totalPrice} ر`,
    basePrice: o.basePrice,
    pts: `+${o.pts} نقطة`,
    rating: 5,
    emoji: o.itemEmoji,
  }));

  const allPastOrders = [...contextOrders, ...staticPastOrders];

  // The active order uses the most recent context order if available
  const activeOrderItems = orders.length > 0
    ? orders[0].itemName
    : 'برجر كلاسيك ×١ + لاتيه ×١ + كولسلو ×١';
  const activeOrderId = orders.length > 0
    ? `#${orders[0].id}`
    : 'طلب #٢٠٢٦-٠٤٧١';

  return (
    <div className="flex flex-col h-full bg-[#F5EDE2] relative">
      {/* Checkout overlay */}
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

      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">

        {/* Header */}
        <div className="px-5 pt-5 pb-4">
          <p className="text-[10px] text-[#6B3210] font-bold tracking-widest mb-0.5">الطلبات</p>
          <h1 className="text-[22px] font-bold text-[#111]">طلباتي</h1>
        </div>

        {/* New order CTAs — استلام + توصيل */}
        <div className="mx-4 mb-5 flex gap-2.5">
          {/* استلام */}
          <motion.button
            onClick={() => setPendingOrder({ name: brand.todaySpecial.name, price: brand.todaySpecial.price, emoji: brand.todaySpecial.emoji })}
            whileTap={{ scale: 0.96 }}
            className="flex-1 flex flex-col items-center gap-2 py-4 rounded-[20px] relative overflow-hidden"
            style={{ background: 'linear-gradient(145deg,#0C0002,#280610)', border: '1px solid rgba(196,120,58,0.2)', boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}
          >
            <div className="w-10 h-10 rounded-[13px] flex items-center justify-center"
              style={{ background: 'rgba(196,120,58,0.15)' }}>
              <Package size={20} className="text-[#6B3210]" />
            </div>
            <div className="text-center">
              <p className="text-white text-[13px] font-bold">استلام</p>
              <p className="text-white/40 text-[9px] mt-0.5">خذها معك</p>
            </div>
          </motion.button>

          {/* توصيل */}
          <motion.button
            onClick={() => setPendingOrder({ name: brand.todaySpecial.name, price: brand.todaySpecial.price, emoji: brand.todaySpecial.emoji })}
            whileTap={{ scale: 0.96 }}
            className="flex-1 flex flex-col items-center gap-2 py-4 rounded-[20px] relative overflow-hidden"
            style={{ background: 'linear-gradient(145deg,#6B3210,#6B3A1F)', boxShadow: '0 6px 20px rgba(196,120,58,0.4)' }}
          >
            <div className="w-10 h-10 rounded-[13px] flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <Truck size={20} className="text-white" />
            </div>
            <div className="text-center">
              <p className="text-white text-[13px] font-bold">توصيل</p>
              <p className="text-white/65 text-[9px] mt-0.5">لحين موقعك</p>
            </div>
          </motion.button>
        </div>

        {/* Success nudge after new order */}
        <AnimatePresence>
          {newOrderTriggered && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="mx-4 mb-4 px-4 py-3 rounded-[16px] flex items-center gap-3"
              style={{ background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.25)' }}>
              <Check size={16} className="text-[#30D158] shrink-0" strokeWidth={2.5} />
              <p className="text-[12px] font-bold text-[#111]">تم استلام طلبك — يُحضَّر الآن</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Order */}
        <div className="px-5 mb-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
            <p className="text-[11px] font-bold text-[#111]">طلب الآن</p>
          </div>
        </div>
        <ActiveOrder items={activeOrderItems} orderId={activeOrderId} />

        {/* Past Orders */}
        <div className="px-5">
          <p className="text-[11px] font-bold text-[#111] mb-3">الطلبات السابقة</p>
          <div className="space-y-3">
            <AnimatePresence>
              {allPastOrders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <PastOrderCard order={order} onReorder={setPendingOrder} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Points nudge */}
        <div className="mx-4 mt-4 mb-2 px-4 py-3.5 rounded-[16px] flex items-center gap-3"
          style={{ background: 'rgba(201,149,106,0.1)', border: '1px solid rgba(201,149,106,0.2)' }}>
          <Star size={18} fill="#7A3B18" className="text-[#7A3B18] shrink-0" />
          <div>
            <p className="text-[12px] font-bold text-[#111]">٣ طلبات أخرى وتكسب وجبة مجانية</p>
            <p className="text-[10px] text-[#AAA] font-light mt-0.5">كل طلب = ٢٥ نقطة · رصيدك الآن ٤٨٠</p>
          </div>
        </div>
      </div>
    </div>
  );
}
