import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronLeft } from 'lucide-react';

/* ── Types ─────────────────────────────────────────────────────── */
export interface CheckoutItem {
  name: string;
  price: string;   // Arabic numeral e.g. "٨٥"
  emoji: string;
}

export interface CompletedOrderData {
  itemName: string;
  itemEmoji: string;
  totalPrice: number;
  basePrice: number;
  orderType: 'dine' | 'delivery';
  payMethod: 'apple' | 'stc' | 'card';
  pts: number;
  timestamp: Date;
}

interface Props {
  item: CheckoutItem;
  brandName: string;
  brandType: 'restaurant' | 'cafe';
  logoImg: string;
  onClose: () => void;
  onOrderComplete?: (data: CompletedOrderData) => void;
}

type Phase   = 'type' | 'payment' | 'paying' | 'invoice';
type PayMethod = 'apple' | 'stc' | 'card';
type OrderType = 'dine' | 'delivery';

/* ── Helpers ────────────────────────────────────────────────────── */
function pad(n: number) { return n.toString().padStart(2, '0'); }
function nowAr() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())} · ${d.toLocaleDateString('ar-SA')}`;
}
function invNum() {
  return `INV-${Math.floor(10000 + Math.random() * 90000)}`;
}
const toInt = (ar: string) =>
  parseInt(ar.replace(/[٠١٢٣٤٥٦٧٨٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString()), 10);
const toAr = (n: number) =>
  n.toLocaleString('ar-EG');

/* ── Order Type Sheet ───────────────────────────────────────────── */
function OrderTypeSheet({ brandType, onSelect }: { brandType: 'restaurant' | 'cafe'; onSelect: (t: OrderType) => void }) {
  const opts = brandType === 'cafe'
    ? [
        { type: 'dine',     label: 'استلام',       sub: 'خذها معك بعد دقيقتين', icon: '🧳' },
        { type: 'delivery', label: 'توصيل',         sub: 'لحين موقعك خلال ٤٠ دقيقة', icon: '🛵' },
      ]
    : [
        { type: 'dine',     label: 'جلسة داخلية',  sub: 'اختر طاولتك واستمتع', icon: '🪑' },
        { type: 'delivery', label: 'توصيل',         sub: 'لحين موقعك خلال ٤٠ دقيقة', icon: '🛵' },
      ];

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 320 }}
      className="absolute inset-x-0 bottom-0 rounded-t-[32px] overflow-hidden z-10"
      style={{ background: '#FDFBF7' }}
    >
      <div className="w-10 h-1 bg-[#D8CFC4] rounded-full mx-auto mt-3 mb-5" />
      <p className="text-center text-[17px] font-black text-[#111] mb-1 px-6">كيف تحب تستلم طلبك؟</p>
      <p className="text-center text-[11px] text-[#AAA] font-light mb-6 px-6">اختر طريقة الاستلام المناسبة</p>

      <div className="flex flex-col gap-3 px-5 pb-8">
        {opts.map(o => (
          <motion.button key={o.type} whileTap={{ scale: 0.96 }} onClick={() => onSelect(o.type as OrderType)}
            className="flex items-center gap-4 p-4 rounded-[20px] text-right border transition-colors"
            style={{ background: '#fff', border: '1.5px solid rgba(196,181,159,0.25)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[24px] shrink-0"
              style={{ background: 'rgba(123,22,24,0.06)' }}>{o.icon}</div>
            <div className="flex-1">
              <p className="text-[15px] font-bold text-[#111]">{o.label}</p>
              <p className="text-[11px] text-[#AAA] font-light mt-0.5">{o.sub}</p>
            </div>
            <div className="w-8 h-8 rounded-full border border-[rgba(196,181,159,0.3)] flex items-center justify-center shrink-0">
              <ChevronLeft size={14} className="text-[#C4B59F]" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Payment Sheet ──────────────────────────────────────────────── */
function PaymentSheet({
  item, orderType, onPay
}: {
  item: CheckoutItem;
  orderType: OrderType;
  onPay: (method: PayMethod) => void;
}) {
  const [method, setMethod] = useState<PayMethod>('apple');
  const [card, setCard] = useState({ num: '', exp: '', cvv: '' });
  const base = toInt(item.price);
  const vat  = Math.round(base * 0.15);
  const total = base + vat;

  function handleCard(field: keyof typeof card, val: string) {
    if (field === 'num') val = val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    if (field === 'exp') {
      val = val.replace(/\D/g, '').slice(0, 4);
      if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
    }
    if (field === 'cvv') val = val.replace(/\D/g, '').slice(0, 3);
    setCard(p => ({ ...p, [field]: val }));
  }

  const orderTypeLabel = orderType === 'dine' ? 'جلسة داخلية' : 'توصيل';

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 320 }}
      className="absolute inset-0 overflow-y-auto scrollbar-none z-10"
      style={{ background: '#FDFBF7' }}
    >
      <div className="px-5 pt-5 pb-8">
        {/* Handle + title */}
        <div className="w-10 h-1 bg-[#D8CFC4] rounded-full mx-auto mb-5" />
        <p className="text-[18px] font-black text-[#111] mb-1">تفاصيل الطلب</p>
        <p className="text-[11px] text-[#AAA] font-light mb-5">{orderTypeLabel} · تسليم سريع</p>

        {/* Item card */}
        <div className="flex items-center gap-3 bg-white rounded-[18px] p-4 mb-5 border border-[rgba(196,181,159,0.2)]"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div className="w-12 h-12 rounded-[13px] flex items-center justify-center text-[26px] shrink-0"
            style={{ background: 'rgba(123,22,24,0.06)' }}>{item.emoji}</div>
          <div className="flex-1">
            <p className="text-[14px] font-bold text-[#111]">{item.name}</p>
            <p className="text-[11px] text-[#C4B59F] font-light">× ١</p>
          </div>
          <p className="text-[16px] font-black text-[#111] font-inter">{item.price} ر</p>
        </div>

        {/* Price breakdown */}
        <div className="bg-white rounded-[18px] p-4 mb-5 border border-[rgba(196,181,159,0.2)] space-y-2.5"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#888]">المجموع الجزئي</span>
            <span className="text-[13px] font-semibold text-[#111] font-inter">{item.price} ر</span>
          </div>
          {orderType === 'delivery' && (
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#888]">رسوم التوصيل</span>
              <span className="text-[13px] font-semibold text-[#30D158]">مجاناً</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#888]">ضريبة القيمة المضافة ١٥٪</span>
            <span className="text-[13px] font-semibold text-[#111] font-inter">{toAr(vat)} ر</span>
          </div>
          <div className="h-px bg-[rgba(196,181,159,0.2)] my-1" />
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-[#111]">الإجمالي</span>
            <span className="text-[18px] font-black text-[#7B1618] font-inter">{toAr(total)} ر</span>
          </div>
        </div>

        {/* Payment methods */}
        <p className="text-[12px] font-bold text-[#111] mb-3">طريقة الدفع</p>
        <div className="flex gap-2.5 mb-4">
          {([
            { id: 'apple', label: ' Pay',  icon: (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            )},
            { id: 'stc',   label: 'STC Pay', icon: <span className="text-[12px] font-black leading-none">STC</span> },
            { id: 'card',  label: 'بطاقة',   icon: (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current shrink-0" strokeWidth={2}>
                <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            )},
          ] as { id: PayMethod; label: string; icon: React.ReactNode }[]).map(m => {
            const sel = method === m.id;
            return (
              <motion.button key={m.id} whileTap={{ scale: 0.92 }} onClick={() => setMethod(m.id)}
                className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[16px] transition-all"
                style={{
                  background: sel ? '#0C0002' : 'white',
                  border: `1.5px solid ${sel ? '#C9956A' : 'rgba(196,181,159,0.25)'}`,
                  color: sel ? '#C9956A' : '#888',
                  boxShadow: sel ? '0 4px 16px rgba(123,22,24,0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                {m.icon}
                <span className="text-[10px] font-bold">{m.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Card form */}
        <AnimatePresence>
          {method === 'card' && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden mb-4">
              <div className="space-y-2.5">
                {[
                  { label: 'رقم البطاقة', field: 'num', placeholder: '0000 0000 0000 0000', type: 'text', inputMode: 'numeric' },
                  { label: 'تاريخ الانتهاء', field: 'exp', placeholder: 'MM/YY', type: 'text', inputMode: 'numeric' },
                  { label: 'رمز CVV', field: 'cvv', placeholder: '•••', type: 'password', inputMode: 'numeric' },
                ].map(f => (
                  <div key={f.field}>
                    <label className="text-[10px] font-bold text-[#888] mb-1.5 block">{f.label}</label>
                    <input
                      value={card[f.field as keyof typeof card]}
                      onChange={e => handleCard(f.field as keyof typeof card, e.target.value)}
                      placeholder={f.placeholder}
                      type={f.type}
                      inputMode={f.inputMode as 'numeric' | 'text' | 'none' | 'tel' | 'decimal' | 'email' | 'url' | 'search'}
                      className="w-full px-4 py-3 rounded-[14px] text-[13px] font-medium text-[#111] placeholder-[#CCC] outline-none border transition-colors"
                      style={{ background: 'white', border: '1.5px solid rgba(196,181,159,0.3)', direction: 'ltr' }}
                      onFocus={e => (e.target.style.borderColor = '#C9956A')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(196,181,159,0.3)')}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pay button */}
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => onPay(method)}
          className="w-full py-4 rounded-[18px] flex items-center justify-center gap-2 text-white font-bold text-[15px]"
          style={{
            background: method === 'apple'
              ? 'linear-gradient(135deg,#1C1C1E,#3A3A3C)'
              : method === 'stc'
              ? 'linear-gradient(135deg,#006239,#00813D)'
              : 'linear-gradient(135deg,#7B1618,#4A0D0F)',
            boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
          }}>
          {method === 'apple' && (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          )}
          {method === 'stc'   && <span className="text-[16px] font-black">STC</span>}
          {method === 'card'  && (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white" strokeWidth={2}>
              <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
          )}
          ادفع {toAr(total)} ريال الآن
        </motion.button>

        <p className="text-center text-[9px] text-[#CCC] mt-3 font-light">
          معاملاتك مشفّرة بالكامل · محمي بـ SSL
        </p>
      </div>
    </motion.div>
  );
}

/* ── Paying Spinner ─────────────────────────────────────────────── */
function PayingSheet() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-20"
      style={{ background: '#FDFBF7' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-14 h-14 rounded-full border-4 border-[rgba(123,22,24,0.12)] border-t-[#7B1618] mb-5"
      />
      <p className="text-[16px] font-bold text-[#111]">جاري المعالجة...</p>
      <p className="text-[11px] text-[#AAA] font-light mt-1">لا تغلق الشاشة</p>
    </motion.div>
  );
}

/* ── Invoice Sheet ──────────────────────────────────────────────── */
function InvoiceSheet({
  item, orderType, payMethod, brandName, logoImg, onClose
}: {
  item: CheckoutItem;
  orderType: OrderType;
  payMethod: PayMethod;
  brandName: string;
  logoImg: string;
  onClose: () => void;
}) {
  const inv = React.useMemo(() => invNum(), []);
  const now  = React.useMemo(() => nowAr(),  []);
  const base = toInt(item.price);
  const vat  = Math.round(base * 0.15);
  const total = base + vat;
  const methodLabel = payMethod === 'apple' ? 'Apple Pay' : payMethod === 'stc' ? 'STC Pay' : 'بطاقة بنكية';
  const typeLabel   = orderType === 'dine' ? (brandName.includes('كوفي') ? 'استلام' : 'جلسة داخلية') : 'توصيل';

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 320 }}
      className="absolute inset-0 overflow-y-auto scrollbar-none z-20"
      style={{ background: '#FDFBF7' }}>

      {/* Success header */}
      <div className="relative overflow-hidden text-center py-8 px-5"
        style={{ background: 'linear-gradient(160deg,#0C0002,#280507,#0D0205)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(201,149,106,0.2) 0%,transparent 60%)' }} />
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.1 }}
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'linear-gradient(135deg,#30D158,#25A349)', boxShadow: '0 8px 28px rgba(48,209,88,0.3)' }}>
          <Check size={28} strokeWidth={3} className="text-white" />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="text-white text-[22px] font-black mb-1">تم الدفع بنجاح</motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-white/40 text-[11px] font-light">{now}</motion.p>
      </div>

      {/* Invoice card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="mx-4 -mt-4 rounded-[24px] overflow-hidden"
        style={{ background: 'white', border: '1px solid rgba(196,181,159,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>

        {/* Invoice header */}
        <div className="flex items-center gap-3 p-5 border-b border-[rgba(196,181,159,0.15)]">
          <img src={logoImg} alt={brandName}
            className="w-12 h-12 rounded-[14px] object-cover border border-[rgba(196,181,159,0.2)] shrink-0" />
          <div className="flex-1">
            <p className="text-[15px] font-black text-[#111]">{brandName}</p>
            <p className="text-[10px] text-[#AAA] font-light">فاتورة ضريبية رسمية</p>
          </div>
          <div className="text-left">
            <p className="text-[9px] font-black text-[#C9956A] font-mono">{inv}</p>
            <p className="text-[9px] text-[#CCC] font-light">رقم الفاتورة</p>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-0 border-b border-[rgba(196,181,159,0.15)]">
          {[
            { label: 'طريقة الاستلام', val: typeLabel },
            { label: 'طريقة الدفع',   val: methodLabel },
            { label: 'التاريخ والوقت', val: now },
            { label: 'حالة الطلب',    val: 'مؤكّد', color: '#30D158' },
          ].map((r, i) => (
            <div key={i} className={`px-5 py-3.5 ${i % 2 === 0 ? 'border-l border-[rgba(196,181,159,0.12)]' : ''}`}>
              <p className="text-[9px] text-[#AAA] font-light mb-0.5">{r.label}</p>
              <p className="text-[11px] font-bold" style={{ color: r.color || '#111' }}>{r.val}</p>
            </div>
          ))}
        </div>

        {/* Items */}
        <div className="px-5 py-4 border-b border-[rgba(196,181,159,0.15)]">
          <p className="text-[9px] font-black text-[#AAA] tracking-widest mb-3"
            style={{ fontFamily: 'ui-monospace,monospace' }}>الأصناف المطلوبة</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-[20px] shrink-0"
              style={{ background: 'rgba(123,22,24,0.06)' }}>{item.emoji}</div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-[#111]">{item.name}</p>
              <p className="text-[10px] text-[#AAA]">× ١</p>
            </div>
            <p className="text-[14px] font-bold text-[#111] font-inter">{item.price} ر</p>
          </div>
        </div>

        {/* Totals */}
        <div className="px-5 py-4 space-y-2">
          <div className="flex justify-between text-[11px]">
            <span className="text-[#888]">المجموع الجزئي</span>
            <span className="font-semibold text-[#111] font-inter">{item.price} ر</span>
          </div>
          {orderType === 'delivery' && (
            <div className="flex justify-between text-[11px]">
              <span className="text-[#888]">رسوم التوصيل</span>
              <span className="font-semibold text-[#30D158]">مجاناً</span>
            </div>
          )}
          <div className="flex justify-between text-[11px]">
            <span className="text-[#888]">ضريبة القيمة المضافة ١٥٪</span>
            <span className="font-semibold text-[#111] font-inter">{toAr(vat)} ر</span>
          </div>
          <div className="h-px bg-[rgba(196,181,159,0.2)] my-1" />
          <div className="flex justify-between">
            <span className="text-[14px] font-bold text-[#111]">الإجمالي</span>
            <span className="text-[18px] font-black text-[#7B1618] font-inter">{toAr(total)} ر</span>
          </div>
        </div>

        {/* Barcode strip */}
        <div className="px-5 pb-5">
          <div className="rounded-[14px] overflow-hidden p-3 flex flex-col items-center gap-2"
            style={{ background: 'rgba(196,181,159,0.08)', border: '1px solid rgba(196,181,159,0.18)' }}>
            <div className="flex gap-[1.5px] h-10">
              {Array.from({ length: 52 }).map((_, i) => (
                <div key={i} style={{
                  width: i % 3 === 0 ? 3 : i % 5 === 0 ? 2 : 1,
                  background: '#111',
                  opacity: 0.15 + Math.sin(i * 1.3) * 0.15 + 0.2,
                  borderRadius: 0.5,
                }} />
              ))}
            </div>
            <p className="text-[8px] font-mono text-[#AAA] tracking-widest">{inv}</p>
          </div>
        </div>
      </motion.div>

      {/* Points earned */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="mx-4 mt-3 rounded-[18px] p-4 flex items-center gap-3"
        style={{ background: '#111', border: '1px solid rgba(201,149,106,0.15)' }}>
        <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-[20px] shrink-0"
          style={{ background: 'rgba(201,149,106,0.1)' }}>⭐</div>
        <div className="flex-1">
          <p className="text-white text-[13px] font-bold">ربحت نقاط</p>
          <p className="text-white/35 text-[10px] font-light">أضيفت تلقائياً لرصيدك</p>
        </div>
        <p className="text-[#C9956A] text-[20px] font-black font-inter">+{Math.round(total / 4)}</p>
      </motion.div>

      {/* Share invoice */}
      <div className="px-4 pt-4 pb-8 flex gap-3">
        <motion.button whileTap={{ scale: 0.95 }} onClick={onClose}
          className="flex-1 py-4 rounded-[18px] font-bold text-[14px]"
          style={{ background: '#0C0002', color: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
          تمام، شكراً
        </motion.button>
        <motion.button whileTap={{ scale: 0.95 }}
          className="w-14 rounded-[18px] flex items-center justify-center shrink-0"
          style={{ background: 'white', border: '1.5px solid rgba(196,181,159,0.25)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-[#7B1618]" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Main Checkout Modal (phone-frame overlay)
══════════════════════════════════════════════════════════════════ */
export function CheckoutModal({ item, brandName, brandType, logoImg, onClose, onOrderComplete }: Props) {
  const [phase, setPhase]         = useState<Phase>('type');
  const [orderType, setOrderType] = useState<OrderType>('dine');
  const [payMethod, setPayMethod] = useState<PayMethod>('apple');

  function handleTypeSelect(t: OrderType) {
    setOrderType(t);
    setPhase('payment');
  }

  function handlePay(m: PayMethod) {
    setPayMethod(m);
    setPhase('paying');
    setTimeout(() => setPhase('invoice'), 1800);
  }

  function handleInvoiceClose() {
    if (onOrderComplete) {
      const base  = toInt(item.price);
      const vat   = Math.round(base * 0.15);
      const total = base + vat;
      onOrderComplete({
        itemName: item.name,
        itemEmoji: item.emoji,
        totalPrice: total,
        basePrice: base,
        orderType,
        payMethod,
        pts: Math.round(total / 4),
        timestamp: new Date(),
      });
    }
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={phase === 'type' ? onClose : undefined}
        className="absolute inset-0 z-10"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} />

      <AnimatePresence mode="wait">
        {phase === 'type' && (
          <OrderTypeSheet key="type" brandType={brandType} onSelect={handleTypeSelect} />
        )}
        {phase === 'payment' && (
          <PaymentSheet key="payment" item={item} orderType={orderType} onPay={handlePay} />
        )}
        {phase === 'paying' && <PayingSheet key="paying" />}
        {phase === 'invoice' && (
          <InvoiceSheet key="invoice" item={item} orderType={orderType} payMethod={payMethod}
            brandName={brandName} logoImg={logoImg} onClose={handleInvoiceClose} />
        )}
      </AnimatePresence>
    </>
  );
}
