import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, ChefHat, Bike, Star, ShoppingBag, RotateCcw, Truck, Package, MapPin, X, FileText, ChevronLeft, Download } from 'lucide-react';
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
            <p className="text-[9px] text-[#7A3B18] font-bold mb-0.5">طلب نشط</p>
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

/* ── Date helpers ───────────────────────────────────────────────── */
function fmtDate(d: Date): string {
  return d.toLocaleDateString('ar-SA-u-ca-islamic', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}
function fmtTime(d: Date): string {
  return d.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', hour12: true });
}
function relLabel(d: Date): string {
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 2)  return 'للتو';
  if (mins < 60) return `منذ ${mins} دقيقة`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `منذ ${hrs} ساعة`;
  if (hrs < 48)  return 'أمس';
  return fmtDate(d);
}
function invNum(id: string) { return id.replace('#',''); }

/* ── Past order card ────────────────────────────────────────────── */
interface PastOrder {
  id: string;
  date: string;                // label
  dateObj?: Date;
  items: string;
  total: string;
  basePrice: number;
  vat?: number;
  pts: string;
  rating: number;
  emoji: string;
  payMethod?: string;
  orderType?: string;
}

const staticPastOrders: PastOrder[] = [
  { id: 'INV-04683', date: 'أمس · ٨:٣٠ م',       dateObj: new Date(Date.now()-86400000),     items: 'افقاتو براون + كرواسون لوز',  total: '٥٢ ر', basePrice: 45, vat: 7,  pts: '+١٢ نقطة', rating: 5, emoji: '☕', payMethod: 'apple',  orderType: 'dine' },
  { id: 'INV-04512', date: 'السبت الماضي',         dateObj: new Date(Date.now()-7*86400000),    items: 'لاتيه بستاشيو + كيك تشيز',   total: '٤٥ ر', basePrice: 39, vat: 6,  pts: '+١٠ نقطة', rating: 5, emoji: '🍰', payMethod: 'stc',    orderType: 'delivery' },
  { id: 'INV-04321', date: 'الأسبوع الماضي',      dateObj: new Date(Date.now()-14*86400000),   items: 'ايس امريكانو + بسكويت لوز',  total: '٢٨ ر', basePrice: 24, vat: 4,  pts: '+٧ نقطة',  rating: 4, emoji: '🧊', payMethod: 'card',   orderType: 'dine' },
  { id: 'INV-04108', date: 'الشهر الماضي',         dateObj: new Date(Date.now()-30*86400000),   items: 'كومبو المساء الخاص',          total: '٣٨ ر', basePrice: 33, vat: 5,  pts: '+٩ نقطة',  rating: 5, emoji: '🥤', payMethod: 'apple',  orderType: 'delivery' },
];

/* ── Invoice Detail Sheet ───────────────────────────────────────── */
const PAY_LABELS: Record<string, string> = { apple: 'Apple Pay', stc: 'STC Pay', card: 'بطاقة بنكية' };
const TYPE_LABELS: Record<string, string> = { dine: 'جلسة داخلية', delivery: 'توصيل', pickup: 'استلام' };

function InvoiceDetailSheet({ order, onClose }: { order: PastOrder; onClose: () => void }) {
  const d = order.dateObj ?? new Date();
  const base = order.basePrice;
  const vat  = order.vat ?? Math.round(base * 0.15);
  const total = base + vat;

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40" />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 z-50 rounded-t-[28px] overflow-hidden overflow-y-auto scrollbar-none"
        style={{ background: '#FDFBF7', maxHeight: '90%' }}>

        {/* Handle + close */}
        <div className="sticky top-0 z-10 bg-[#FDFBF7] pt-3 pb-2">
          <div className="w-9 h-1 rounded-full bg-[rgba(196,181,159,0.35)] mx-auto mb-3" />
          <div className="flex items-center justify-between px-5">
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(196,181,159,0.15)' }}>
              <X size={14} className="text-[#888]" />
            </button>
            <p className="text-[13px] font-black text-[#111]">تفاصيل الفاتورة</p>
            <motion.button whileTap={{ scale: 0.88 }}
              onClick={() => window.print()}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(107,50,16,0.08)' }}>
              <Download size={13} className="text-[#6B3210]" />
            </motion.button>
          </div>
        </div>

        {/* Invoice content */}
        <div className="px-5 pb-10">

          {/* Brand + invoice no */}
          <div className="flex items-center justify-between py-4 border-b border-[rgba(196,181,159,0.15)] mb-4">
            <div>
              <p className="text-[10px] font-black text-[#6B3210]"
                style={{ fontFamily: 'ui-monospace,monospace' }}>فاتورة ضريبية · <span className="tracking-widest">ZATCA</span></p>
              <p className="text-[20px] font-black text-[#111] mt-0.5">براون دوز</p>
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black text-[#AAA]" style={{ fontFamily: 'ui-monospace,monospace' }}>{order.id}</p>
              <p className="text-[8px] text-[#CCC] mt-0.5">رقم الفاتورة</p>
            </div>
          </div>

          {/* Date & meta */}
          <div className="rounded-[18px] p-4 mb-4 grid grid-cols-2 gap-3"
            style={{ background: 'rgba(196,181,159,0.08)', border: '1px solid rgba(196,181,159,0.15)' }}>
            {[
              { label: 'تاريخ الإصدار',   val: fmtDate(d) },
              { label: 'وقت الإصدار',     val: fmtTime(d) },
              { label: 'نوع الطلب',        val: TYPE_LABELS[order.orderType ?? 'dine'] },
              { label: 'طريقة الدفع',      val: PAY_LABELS[order.payMethod ?? 'apple'] },
            ].map((r, i) => (
              <div key={i}>
                <p className="text-[8.5px] text-[#AAA] font-light mb-0.5">{r.label}</p>
                <p className="text-[11px] font-bold text-[#111]">{r.val}</p>
              </div>
            ))}
          </div>

          {/* Items */}
          <div className="rounded-[18px] overflow-hidden mb-4"
            style={{ border: '1px solid rgba(196,181,159,0.15)' }}>
            <div className="px-4 py-3 border-b border-[rgba(196,181,159,0.1)]"
              style={{ background: 'rgba(196,181,159,0.06)' }}>
              <p className="text-[9px] font-black text-[#AAA]">الأصناف</p>
            </div>
            <div className="px-4 py-4 flex items-center gap-3 bg-white">
              <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-[20px] shrink-0"
                style={{ background: 'rgba(196,181,159,0.08)' }}>{order.emoji}</div>
              <div className="flex-1">
                <p className="text-[12px] font-semibold text-[#111]">{order.items}</p>
                <p className="text-[10px] text-[#AAA] mt-0.5">× ١</p>
              </div>
              <p className="text-[13px] font-bold text-[#111] font-inter">{base} ر</p>
            </div>
          </div>

          {/* Totals */}
          <div className="rounded-[18px] overflow-hidden mb-4"
            style={{ border: '1px solid rgba(196,181,159,0.15)' }}>
            {[
              { label: 'المجموع الجزئي', val: `${base} ر`, dim: true },
              { label: 'ضريبة القيمة المضافة (١٥٪)', val: `${vat} ر`, dim: true },
            ].map((r, i) => (
              <div key={i} className="flex justify-between px-4 py-3 bg-white border-b border-[rgba(196,181,159,0.08)]">
                <span className="text-[11px] text-[#AAA]">{r.label}</span>
                <span className="text-[11px] font-semibold text-[#666] font-inter">{r.val}</span>
              </div>
            ))}
            <div className="flex justify-between px-4 py-3.5"
              style={{ background: 'linear-gradient(135deg,rgba(107,50,16,0.04),rgba(196,120,58,0.04))' }}>
              <span className="text-[13px] font-black text-[#111]">الإجمالي</span>
              <span className="text-[15px] font-black text-[#6B3210] font-inter">{total} ر</span>
            </div>
          </div>

          {/* Points earned */}
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-[16px]"
            style={{ background: 'rgba(48,209,88,0.07)', border: '1px solid rgba(48,209,88,0.15)' }}>
            <Star size={16} fill="#30D158" className="text-[#30D158] shrink-0" />
            <div>
              <p className="text-[12px] font-bold text-[#111]">نقاط مكتسبة</p>
              <p className="text-[10px] text-[#AAA]">أُضيفت للرصيد فوراً</p>
            </div>
            <p className="text-[16px] font-black text-[#30D158] mr-auto font-inter">{order.pts}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function InvoiceRow({ order, onOpen, onReorder }: {
  order: PastOrder;
  onOpen: () => void;
  onReorder: (item: CheckoutItem) => void;
}) {
  const d = order.dateObj;
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className="w-full text-right rounded-[18px] p-4 flex items-center gap-3.5 relative overflow-hidden"
      style={{ background: 'white', border: '1px solid rgba(196,181,159,0.18)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>

      {/* Emoji */}
      <div className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center text-[22px] shrink-0"
        style={{ background: 'rgba(196,181,159,0.1)', border: '1px solid rgba(196,181,159,0.18)' }}>
        {order.emoji}
      </div>

      <div className="flex-1 min-w-0">
        {/* Invoice no + amount row */}
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-[14px] font-black text-[#6B3210] font-inter">{order.total}</p>
          <p className="text-[9px] font-black text-[#AAA]"
            style={{ fontFamily: 'ui-monospace,monospace' }}>{order.id}</p>
        </div>
        {/* Items */}
        <p className="text-[11px] text-[#555] leading-snug truncate">{order.items}</p>
        {/* Date + pts */}
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-[9px] text-[#BBB]">
            {d ? `${fmtDate(d)} · ${fmtTime(d)}` : order.date}
          </p>
          <span className="text-[9px] font-bold text-[#30D158]">{order.pts}</span>
        </div>
      </div>

      <ChevronLeft size={14} className="text-[rgba(196,181,159,0.6)] shrink-0" />
    </motion.button>
  );
}

/* ── Main Screen ────────────────────────────────────────────────── */
export function ScreenOrders() {
  const { orders, addOrder } = useOrders();
  const { brand } = useBrand();
  const [pendingOrder,      setPendingOrder]      = useState<CheckoutItem | null>(null);
  const [newOrderTriggered, setNewOrderTriggered] = useState(false);
  const [tab,               setTab]               = useState<'orders' | 'invoices'>('orders');
  const [openInvoice,       setOpenInvoice]        = useState<PastOrder | null>(null);

  function handleOrderComplete(data: CompletedOrderData) {
    addOrder({
      itemName: data.itemName, itemEmoji: data.itemEmoji,
      totalPrice: data.totalPrice, basePrice: data.basePrice,
      orderType: data.orderType, payMethod: data.payMethod,
      pts: data.pts, timestamp: data.timestamp,
    });
    setNewOrderTriggered(true);
    setTimeout(() => setNewOrderTriggered(false), 4000);
  }

  const contextOrders: PastOrder[] = orders.map(o => ({
    id: o.id,
    date: relLabel(new Date(o.timestamp)),
    dateObj: new Date(o.timestamp),
    items: o.itemName,
    total: `${o.totalPrice} ر`,
    basePrice: o.basePrice,
    vat: o.totalPrice - o.basePrice,
    pts: `+${o.pts} نقطة`,
    rating: 5,
    emoji: o.itemEmoji,
    payMethod: o.payMethod,
    orderType: o.orderType,
  }));

  const allOrders  = [...contextOrders, ...staticPastOrders];
  const activeItems = orders.length > 0 ? orders[0].itemName : 'برجر كلاسيك ×١ + لاتيه ×١ + كولسلو ×١';
  const activeId    = orders.length > 0 ? orders[0].id : 'طلب-٠٤٧١';

  return (
    <div className="flex flex-col h-full bg-[#F5EDE2] relative overflow-hidden">

      {/* Checkout overlay */}
      <AnimatePresence>
        {pendingOrder && (
          <div className="absolute inset-0 z-50 overflow-hidden">
            <CheckoutModal item={pendingOrder} brandName={brand.name} brandType={brand.type}
              logoImg={brand.logoImg} onClose={() => setPendingOrder(null)}
              onOrderComplete={handleOrderComplete} />
          </div>
        )}
      </AnimatePresence>

      {/* Invoice detail sheet */}
      <AnimatePresence>
        {openInvoice && (
          <InvoiceDetailSheet order={openInvoice} onClose={() => setOpenInvoice(null)} />
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">

        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <p className="text-[9px] font-black tracking-[0.22em] text-[#6B3210] mb-0.5">BROWN DOSE</p>
          <h1 className="text-[22px] font-bold text-[#111] mb-4">طلباتي وفواتيري</h1>

          {/* Tabs */}
          <div className="flex gap-2 p-1 rounded-[16px]" style={{ background: 'rgba(196,181,159,0.15)' }}>
            {([
              ['orders',   '📦 الطلبات'],
              ['invoices', '🧾 الفواتير'],
            ] as const).map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)}
                className="flex-1 py-2.5 rounded-[12px] text-[12px] font-bold transition-all"
                style={{
                  background: tab === key ? 'white' : 'transparent',
                  color:      tab === key ? '#6B3210' : '#AAA',
                  boxShadow:  tab === key ? '0 2px 10px rgba(0,0,0,0.08)' : 'none',
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ══ ORDERS TAB ══ */}
          {tab === 'orders' && (
            <motion.div key="orders"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}>

              {/* New order CTAs */}
              <div className="mx-4 mb-5 flex gap-2.5">
                <motion.button whileTap={{ scale: 0.96 }}
                  onClick={() => setPendingOrder({ name: brand.todaySpecial.name, price: brand.todaySpecial.price, emoji: brand.todaySpecial.emoji })}
                  className="flex-1 flex flex-col items-center gap-2 py-4 rounded-[20px]"
                  style={{ background: 'linear-gradient(145deg,#0C0002,#280610)', border: '1px solid rgba(196,120,58,0.2)', boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}>
                  <div className="w-10 h-10 rounded-[13px] flex items-center justify-center" style={{ background: 'rgba(196,120,58,0.15)' }}>
                    <Package size={20} className="text-[#C4783A]" />
                  </div>
                  <div className="text-center">
                    <p className="text-white text-[13px] font-bold">استلام</p>
                    <p className="text-white/40 text-[9px] mt-0.5">خذها معك</p>
                  </div>
                </motion.button>
                <motion.button whileTap={{ scale: 0.96 }}
                  onClick={() => setPendingOrder({ name: brand.todaySpecial.name, price: brand.todaySpecial.price, emoji: brand.todaySpecial.emoji })}
                  className="flex-1 flex flex-col items-center gap-2 py-4 rounded-[20px]"
                  style={{ background: 'linear-gradient(145deg,#6B3210,#6B3A1F)', boxShadow: '0 6px 20px rgba(196,120,58,0.4)' }}>
                  <div className="w-10 h-10 rounded-[13px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <Truck size={20} className="text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-white text-[13px] font-bold">توصيل</p>
                    <p className="text-white/65 text-[9px] mt-0.5">لحين موقعك</p>
                  </div>
                </motion.button>
              </div>

              {/* New order success nudge */}
              <AnimatePresence>
                {newOrderTriggered && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="mx-4 mb-4 px-4 py-3 rounded-[16px] flex items-center gap-3"
                    style={{ background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.25)' }}>
                    <Check size={16} className="text-[#30D158] shrink-0" strokeWidth={2.5} />
                    <p className="text-[12px] font-bold text-[#111]">تم استلام طلبك — يُحضَّر الآن</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active order */}
              <div className="px-5 mb-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
                  <p className="text-[11px] font-bold text-[#111]">طلب الآن</p>
                </div>
              </div>
              <ActiveOrder items={activeItems} orderId={activeId} />

              {/* Past orders list */}
              <div className="px-5 mt-2">
                <p className="text-[11px] font-bold text-[#111] mb-3">السابقة</p>
                <div className="space-y-3">
                  {allOrders.map((order, i) => (
                    <motion.div key={order.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}>
                      <InvoiceRow order={order} onOpen={() => setOpenInvoice(order)}
                        onReorder={setPendingOrder} />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mx-4 mt-4 mb-2 px-4 py-3.5 rounded-[16px] flex items-center gap-3"
                style={{ background: 'rgba(201,149,106,0.1)', border: '1px solid rgba(201,149,106,0.2)' }}>
                <Star size={18} fill="#7A3B18" className="text-[#7A3B18] shrink-0" />
                <div>
                  <p className="text-[12px] font-bold text-[#111]">٣ طلبات أخرى وتكسب وجبة مجانية</p>
                  <p className="text-[10px] text-[#AAA] font-light mt-0.5">كل طلب = ٢٥ نقطة · رصيدك الآن ٤٨٠</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══ INVOICES TAB ══ */}
          {tab === 'invoices' && (
            <motion.div key="invoices"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}
              className="px-4">

              {/* Summary bar */}
              <div className="flex gap-2 mb-4">
                {[
                  { label: 'إجمالي الفواتير', val: `${allOrders.length}`, unit: 'فاتورة' },
                  { label: 'المصروف الكلي',   val: allOrders.reduce((s,o) => s + o.basePrice + (o.vat ?? Math.round(o.basePrice * 0.15)), 0).toString(), unit: 'ريال' },
                ].map((s, i) => (
                  <div key={i} className="flex-1 rounded-[16px] p-3 text-center"
                    style={{ background: i === 0 ? 'rgba(107,50,16,0.07)' : 'rgba(48,209,88,0.07)', border: `1px solid ${i === 0 ? 'rgba(107,50,16,0.12)' : 'rgba(48,209,88,0.12)'}` }}>
                    <p className="text-[18px] font-black font-inter" style={{ color: i === 0 ? '#6B3210' : '#30D158' }}>
                      {s.val}
                    </p>
                    <p className="text-[8px] text-[#AAA] font-light">{s.unit}</p>
                    <p className="text-[8px] text-[#CCC] font-light">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* ZATCA notice */}
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[14px] mb-4"
                style={{ background: 'rgba(0,122,255,0.06)', border: '1px solid rgba(0,122,255,0.12)' }}>
                <FileText size={14} className="text-[#007AFF] shrink-0" />
                <p className="text-[10px] text-[#007AFF]">جميع الفواتير متوافقة مع هيئة الزكاة والضريبة (ZATCA)</p>
              </div>

              {/* Invoice list */}
              <div className="space-y-2.5 pb-4">
                {allOrders.map((order, i) => {
                  const d = order.dateObj;
                  const total = order.basePrice + (order.vat ?? Math.round(order.basePrice * 0.15));
                  return (
                    <motion.button key={order.id}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setOpenInvoice(order)}
                      className="w-full text-right rounded-[18px] overflow-hidden"
                      style={{ background: 'white', border: '1px solid rgba(196,181,159,0.18)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>

                      {/* Top band */}
                      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-[rgba(196,181,159,0.1)]">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#888]">{order.emoji}</span>
                          <span className="text-[9px] font-black text-[#AAA]"
                            style={{ fontFamily: 'ui-monospace,monospace' }}>{order.id}</span>
                        </div>
                        <span className="text-[14px] font-black text-[#6B3210] font-inter">{total} ر</span>
                      </div>

                      {/* Bottom row */}
                      <div className="flex items-center justify-between px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          {/* Pay badge */}
                          <span className="text-[8px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(107,50,16,0.07)', color: '#6B3210' }}>
                            {order.payMethod === 'apple' ? '🍎' : order.payMethod === 'stc' ? '📱' : '💳'} {PAY_LABELS[order.payMethod ?? 'apple']}
                          </span>
                          <span className="text-[8px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(196,181,159,0.1)', color: '#888' }}>
                            {TYPE_LABELS[order.orderType ?? 'dine']}
                          </span>
                        </div>
                        <div className="text-left">
                          <p className="text-[9px] text-[#BBB]">
                            {d ? fmtDate(d) : order.date}
                          </p>
                          {d && <p className="text-[8px] text-[#CCC]">{fmtTime(d)}</p>}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
