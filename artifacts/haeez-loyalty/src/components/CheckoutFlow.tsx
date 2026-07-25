import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronLeft, MapPin, Navigation, Star, Shield } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

/* ── Types ─────────────────────────────────────────────────────── */
export interface CheckoutItem {
  name: string;
  price: string;
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

type Phase   = 'type' | 'branch' | 'address' | 'payment' | 'paying' | 'invoice';
type PayMethod = 'apple' | 'stc' | 'card';
type OrderType = 'dine' | 'delivery';

/* ── Branches ───────────────────────────────────────────────────── */
export const BRANCHES = [
  {
    id: 'sabya',
    name: 'فرع صبيا',
    address: 'شارع الملك خالد بن عبدالعزيز، الفيصلية',
    city: 'صبيا',
    emoji: '🏙️',
    mapsUrl: 'https://maps.app.goo.gl/MvchtqHNJozs6S4s7',
    coords: [17.1508, 42.6275] as [number, number],
    wait: '٧–١٢ دقيقة',
    status: 'open',
  },
  {
    id: 'jizan',
    name: 'فرع جيزان',
    address: 'حي الشاطئ، جيزان',
    city: 'جيزان',
    emoji: '🌊',
    mapsUrl: 'https://maps.app.goo.gl/gRZAJDC14nVesFPv9',
    coords: [16.8892, 42.5611] as [number, number],
    wait: '١٠–١٨ دقيقة',
    status: 'busy',
  },
  {
    id: 'damad',
    name: 'فرع ضمد',
    address: 'طريق أبو بكر الصديق',
    city: 'ضمد',
    emoji: '🌿',
    mapsUrl: 'https://maps.app.goo.gl/zPngEw4JbwYu2ViP9',
    coords: [17.3163, 42.8635] as [number, number],
    wait: '٥–٨ دقائق',
    status: 'open',
  },
];

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
const toAr = (n: number) => n.toLocaleString('ar-EG');

/* ── Map icons ──────────────────────────────────────────────────── */
const pinkIcon = L.divIcon({
  className: '',
  html: `<div style="width:36px;height:44px;filter:drop-shadow(0 4px 12px rgba(196,120,58,0.55))">
    <svg viewBox="0 0 36 44" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 0C8.059 0 0 8.059 0 18c0 13.5 18 26 18 26S36 31.5 36 18C36 8.059 27.941 0 18 0z" fill="#6B3210"/>
      <circle cx="18" cy="18" r="8" fill="white" opacity="0.9"/>
      <circle cx="18" cy="18" r="4" fill="#6B3210"/>
    </svg>
  </div>`,
  iconSize: [36, 44], iconAnchor: [18, 44],
});
const gpsIcon = L.divIcon({
  className: '',
  html: `<div style="width:16px;height:16px;background:#007AFF;border:3px solid white;border-radius:50%;box-shadow:0 2px 10px rgba(0,122,255,0.55)"></div>`,
  iconSize: [16, 16], iconAnchor: [8, 8],
});

function MapClickHandler({ onMove }: { onMove: (lat: number, lng: number) => void }) {
  useMapEvents({ click(e) { onMove(e.latlng.lat, e.latlng.lng); } });
  return null;
}
function FlyToTarget({ target }: { target: [number, number] | null }) {
  const map = useMap();
  useEffect(() => { if (target) map.flyTo(target, 16, { duration: 1.2 }); }, [target]); // eslint-disable-line
  return null;
}

/* ══════════════════════════════════════════════════════════════════
   STEP INDICATOR
════════════════════════════════════════════════════════════════════ */
const STEPS: { phase: Phase; label: string }[] = [
  { phase: 'type',    label: 'الاختيار' },
  { phase: 'branch',  label: 'الفرع'  },
  { phase: 'payment', label: 'الدفع'  },
  { phase: 'invoice', label: 'تم ✓'  },
];
const DELIVERY_STEPS: { phase: Phase; label: string }[] = [
  { phase: 'type',    label: 'الاختيار' },
  { phase: 'address', label: 'الموقع'  },
  { phase: 'payment', label: 'الدفع'   },
  { phase: 'invoice', label: 'تم ✓'   },
];

function StepIndicator({ phase, orderType }: { phase: Phase; orderType: OrderType }) {
  const steps = orderType === 'delivery' ? DELIVERY_STEPS : STEPS;
  const currentIdx = steps.findIndex(s => s.phase === phase);
  const effectiveIdx = phase === 'paying' ? 2 : currentIdx;

  return (
    <div className="flex items-center justify-center gap-0 px-6 pt-3 pb-2">
      {steps.map((s, i) => {
        const done   = i < effectiveIdx;
        const active = i === effectiveIdx;
        return (
          <React.Fragment key={s.phase}>
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  background: done ? '#30D158' : active ? '#6B3210' : 'rgba(196,181,159,0.2)',
                  scale: active ? 1.15 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-6 h-6 rounded-full flex items-center justify-center"
              >
                {done
                  ? <Check size={11} strokeWidth={3} color="white" />
                  : <span style={{ fontSize: 9, fontWeight: 700, color: active ? 'white' : 'rgba(160,130,100,0.6)' }}>{i+1}</span>
                }
              </motion.div>
              <span style={{
                fontSize: 7.5, marginTop: 2, fontWeight: active ? 700 : 400,
                color: active ? '#6B3210' : done ? '#30D158' : 'rgba(160,130,100,0.5)',
              }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <motion.div
                className="flex-1 h-px mx-1 mb-4"
                animate={{ background: done ? '#30D158' : 'rgba(196,181,159,0.2)' }}
                transition={{ duration: 0.4 }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ORDER TYPE SHEET — dramatic full cards
════════════════════════════════════════════════════════════════════ */
function OrderTypeSheet({ brandType, item, onSelect, onClose }: {
  brandType: 'restaurant' | 'cafe';
  item: CheckoutItem;
  onSelect: (t: OrderType) => void;
  onClose: () => void;
}) {
  const opts = brandType === 'cafe'
    ? [
        {
          type: 'dine' as OrderType,
          emoji: '🧳',
          label: 'استلام',
          sub: 'خذها معك بعد دقيقتين',
          color: '#6B3210',
          gradient: 'linear-gradient(145deg,#0C0002,#2A0A00,#0C0002)',
          features: ['بدون انتظار', 'جاهز بـ٢ دقيقة', 'ادفع وخذ'],
          wait: '٢–٥ دقائق',
        },
        {
          type: 'delivery' as OrderType,
          emoji: '🛵',
          label: 'توصيل',
          sub: 'لحين موقعك — مجاناً',
          color: '#2D7D46',
          gradient: 'linear-gradient(145deg,#020C04,#062A10,#020C04)',
          features: ['توصيل مجاني', 'تتبع حي', 'حتى ضمد وصبيا'],
          wait: '٣٠–٤٥ دقيقة',
        },
      ]
    : [
        {
          type: 'dine' as OrderType,
          emoji: '🪑',
          label: 'جلسة داخلية',
          sub: 'اختر طاولتك واستمتع',
          color: '#6B3210',
          gradient: 'linear-gradient(145deg,#0C0002,#2A0A00,#0C0002)',
          features: ['طاولة فورية', 'خدمة كاملة', 'أجواء براون دوز'],
          wait: '٥–١٠ دقائق',
        },
        {
          type: 'delivery' as OrderType,
          emoji: '🛵',
          label: 'توصيل',
          sub: 'لحين موقعك — مجاناً',
          color: '#2D7D46',
          gradient: 'linear-gradient(145deg,#020C04,#062A10,#020C04)',
          features: ['توصيل مجاني', 'تتبع حي', 'حتى ضمد وصبيا'],
          wait: '٣٠–٤٥ دقيقة',
        },
      ];

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '110%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      className="absolute inset-x-0 bottom-0 z-10"
      style={{ background: '#FDFBF7', borderRadius: '30px 30px 0 0', maxHeight: '88%' }}
    >
      {/* Handle */}
      <div className="w-10 h-1 bg-[#D8CFC4] rounded-full mx-auto mt-3 mb-1" />

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[20px]">{item.emoji}</span>
            <p className="text-[15px] font-black text-[#111] leading-tight">{item.name}</p>
          </div>
          <p className="text-[11px] text-[#AAA] font-light">كيف تحب تستلم طلبك؟</p>
        </div>
        <motion.button whileTap={{ scale: 0.88 }} onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(196,181,159,0.15)' }}>
          <X size={14} className="text-[#888]" />
        </motion.button>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 px-5 pb-8 pt-1">
        {opts.map((o, i) => (
          <motion.button
            key={o.type}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 380, damping: 26 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(o.type)}
            className="relative overflow-hidden rounded-[22px] p-5 text-right"
            style={{ background: o.gradient, border: `1px solid ${o.color}25` }}
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 20% 50%,${o.color}22 0%,transparent 65%)` }} />

            <div className="relative z-10 flex items-start gap-4">
              {/* Big emoji */}
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 + i }}
                className="text-[40px] leading-none mt-1"
              >{o.emoji}</motion.div>

              <div className="flex-1 text-right">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                    style={{ background: `${o.color}22`, border: `1px solid ${o.color}40` }}>
                    <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: o.color }} />
                    <span className="text-[9px] font-bold" style={{ color: o.color }}>{o.wait}</span>
                  </div>
                  <p className="text-white text-[20px] font-black leading-none">{o.label}</p>
                </div>
                <p className="text-white/50 text-[11px] font-light mb-3">{o.sub}</p>

                {/* Features */}
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {o.features.map(f => (
                    <span key={f} className="text-[9px] font-semibold px-2 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)' }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <ChevronLeft size={18} style={{ color: `${o.color}`, opacity: 0.6 }} />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   BRANCH PICKER — with status + wait time
════════════════════════════════════════════════════════════════════ */
function BranchPickerSheet({ onSelect, onBack }: {
  onSelect: (branch: typeof BRANCHES[0]) => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      className="absolute inset-0 z-10 overflow-y-auto scrollbar-none"
      style={{ background: '#FDFBF7' }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-4 sticky top-0 z-10"
        style={{ background: 'rgba(253,251,247,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(196,181,159,0.15)' }}>
        <motion.button whileTap={{ scale: 0.88 }} onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'rgba(196,120,58,0.09)', border: '1px solid rgba(196,120,58,0.18)' }}>
          <ChevronLeft size={16} style={{ color: '#6B3210' }} />
        </motion.button>
        <div>
          <p className="text-[15px] font-black text-[#111]">اختر فرعك</p>
          <p className="text-[10px] text-[#AAA] font-light">٣ فروع · صبيا · جيزان · ضمد</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4 pb-10">
        {BRANCHES.map((b, i) => {
          const isBusy = b.status === 'busy';
          return (
            <motion.button
              key={b.id}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 360, damping: 26 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(b)}
              className="text-right rounded-[20px] p-4 relative overflow-hidden"
              style={{
                background: 'white',
                border: '1px solid rgba(196,181,159,0.2)',
                boxShadow: '0 2px 14px rgba(0,0,0,0.05)',
              }}
            >
              <div className="flex items-center gap-3">
                {/* Emoji avatar */}
                <div className="w-12 h-12 rounded-[15px] flex items-center justify-center text-[24px] shrink-0"
                  style={{ background: 'rgba(160,82,45,0.06)', border: '1px solid rgba(196,120,58,0.12)' }}>
                  {b.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    {/* Status badge */}
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full"
                        style={{ background: isBusy ? '#FF9F0A' : '#30D158', boxShadow: `0 0 4px ${isBusy ? '#FF9F0A' : '#30D158'}` }} />
                      <span className="text-[9px] font-bold" style={{ color: isBusy ? '#FF9F0A' : '#30D158' }}>
                        {isBusy ? 'مزدحم' : 'هادي'}
                      </span>
                    </div>
                    <p className="text-[15px] font-black text-[#111]">{b.name}</p>
                  </div>
                  <p className="text-[10px] text-[#AAA] font-light mb-2 text-right">{b.address}</p>

                  {/* Wait + map row */}
                  <div className="flex items-center justify-between">
                    <a href={b.mapsUrl} target="_blank" rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 text-[9px] font-semibold text-[#007AFF]"
                    >
                      <MapPin size={9} />
                      <span>الموقع</span>
                    </a>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full"
                      style={{ background: 'rgba(196,120,58,0.06)', border: '1px solid rgba(196,120,58,0.1)' }}>
                      <span className="text-[9px] text-[#6B3210]">⏱</span>
                      <span className="text-[9px] font-bold text-[#6B3210]">{b.wait}</span>
                    </div>
                  </div>
                </div>

                <ChevronLeft size={16} style={{ color: 'rgba(196,181,159,0.6)', flexShrink: 0 }} />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAP PICKER SHEET
════════════════════════════════════════════════════════════════════ */
const SABYA_CENTER: [number, number] = [17.1508, 42.6275];

function MapPickerSheet({ onConfirm, onBack }: { onConfirm: (addr: string) => void; onBack: () => void }) {
  const [pin,        setPin]        = useState<[number, number] | null>(null);
  const [userLoc,    setUserLoc]    = useState<[number, number] | null>(null);
  const [flyTo,      setFlyTo]      = useState<[number, number] | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError,   setGpsError]   = useState('');
  const [notes,      setNotes]      = useState('');

  useEffect(() => { requestGPS(); }, []); // eslint-disable-line

  function requestGPS() {
    if (!navigator.geolocation) { setGpsError('الجهاز لا يدعم GPS'); return; }
    setGpsLoading(true); setGpsError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLoc(loc); setPin(loc); setFlyTo(loc); setGpsLoading(false);
      },
      (err) => {
        setGpsLoading(false);
        setGpsError(err.code === 1 ? 'ادفع الإذن لتحديد موقعك' : 'تعذّر تحديد الموقع');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      className="absolute inset-0 z-10 flex flex-col"
      style={{ background: '#FDFBF7' }}
    >
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(196,181,159,0.2)' }}>
        <motion.button whileTap={{ scale: 0.88 }} onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'rgba(196,120,58,0.09)', border: '1px solid rgba(196,120,58,0.18)' }}>
          <ChevronLeft size={16} style={{ color: '#6B3210' }} />
        </motion.button>
        <div className="flex-1">
          <p className="text-[14px] font-bold text-[#111] leading-tight">حدد موقعك</p>
          <p className="text-[10px] text-[#AAA]">
            {gpsLoading ? 'جاري تحديد موقعك…' : gpsError || (pin ? 'يمكنك تعديل الموقع بالضغط' : 'اضغط على الخريطة')}
          </p>
        </div>
        <motion.button whileTap={{ scale: 0.88 }} onClick={requestGPS}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: gpsLoading ? 'rgba(0,122,255,0.1)' : '#007AFF', boxShadow: gpsLoading ? 'none' : '0 3px 12px rgba(0,122,255,0.35)' }}>
          {gpsLoading
            ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 rounded-full border-2 border-[rgba(0,122,255,0.3)] border-t-[#007AFF]" />
            : <Navigation size={15} color="white" />}
        </motion.button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <MapContainer center={userLoc ?? SABYA_CENTER} zoom={userLoc ? 16 : 13}
          style={{ width: '100%', height: '100%' }} zoomControl={false} attributionControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler onMove={(lat, lng) => { setPin([lat, lng]); setFlyTo([lat, lng]); }} />
          <FlyToTarget target={flyTo} />
          {userLoc && <Marker position={userLoc} icon={gpsIcon} />}
          {pin && <Marker position={pin} icon={pinkIcon} />}
        </MapContainer>
        {!pin && !gpsLoading && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="absolute top-3 left-1/2 -translate-x-1/2 z-[500] px-4 py-2 rounded-full flex items-center gap-2"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
            <MapPin size={11} color="#fff" />
            <span className="text-white text-[11px]">اضغط لتعديل الموقع</span>
          </motion.div>
        )}
        {pin && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="absolute top-3 left-1/2 -translate-x-1/2 z-[500] px-4 py-2 rounded-full flex items-center gap-2"
            style={{ background: '#111', boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}>
            <Check size={11} color="#30D158" strokeWidth={2.5} />
            <span className="text-white text-[11px] font-medium">تم تثبيت الموقع</span>
          </motion.div>
        )}
      </div>

      <div className="shrink-0 px-4 pt-3 pb-6"
        style={{ background: 'white', borderTop: '1px solid rgba(196,181,159,0.2)', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}>
        <div className="flex gap-2 mb-3">
          {[
            { icon: '🛵', v: 'مجاني', l: 'التوصيل' },
            { icon: '⏱',  v: '٣٠ د', l: 'وقت الوصول' },
            { icon: '📍', v: 'صبيا · ضمد', l: 'النطاق' },
          ].map((s, i) => (
            <div key={i} className="flex-1 rounded-[12px] p-2 text-center"
              style={{ background: 'rgba(196,120,58,0.06)', border: '1px solid rgba(196,120,58,0.12)' }}>
              <p className="text-[12px] mb-0.5">{s.icon}</p>
              <p className="text-[10px] font-bold text-[#111]">{s.v}</p>
              <p className="text-[8px] text-[#AAA]">{s.l}</p>
            </div>
          ))}
        </div>
        <input value={notes} onChange={e => setNotes(e.target.value)}
          placeholder="ملاحظة للمندوب (اختياري)"
          className="w-full px-3 py-2.5 rounded-[12px] text-[12px] text-[#111] placeholder-[#CCC] outline-none border mb-3"
          style={{ background: '#FDFBF7', border: '1.5px solid rgba(196,181,159,0.3)', direction: 'rtl' }}
          onFocus={e => (e.target.style.borderColor = '#6B3210')}
          onBlur={e => (e.target.style.borderColor = 'rgba(196,181,159,0.3)')} />
        <motion.button whileTap={{ scale: 0.97 }}
          onClick={() => pin && onConfirm(`${pin[0].toFixed(5)},${pin[1].toFixed(5)}${notes ? ' · ' + notes : ''}`)}
          className="w-full py-3.5 rounded-[16px] font-bold text-[14px] flex items-center justify-center gap-2"
          style={{
            background: pin ? 'linear-gradient(135deg,#6B3210,#7A3B18)' : 'rgba(196,181,159,0.3)',
            color: pin ? 'white' : '#AAA',
            boxShadow: pin ? '0 6px 20px rgba(196,120,58,0.35)' : 'none',
          }}>
          {pin ? <><Check size={16} strokeWidth={2.5} />تأكيد الموقع</> : 'حدد موقعك على الخريطة أولاً'}
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAYMENT SHEET — premium dark + Face ID CTA
════════════════════════════════════════════════════════════════════ */
function PaymentSheet({ item, orderType, onPay }: {
  item: CheckoutItem;
  orderType: OrderType;
  onPay: (method: PayMethod) => void;
}) {
  const [method, setMethod] = useState<PayMethod>('apple');
  const [card, setCard]     = useState({ num: '', exp: '', cvv: '' });
  const base  = toInt(item.price);
  const vat   = Math.round(base * 0.15);
  const total = base + vat;
  const orderLabel = orderType === 'dine' ? 'استلام' : 'توصيل مجاني';

  function handleCard(field: keyof typeof card, val: string) {
    if (field === 'num') val = val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    if (field === 'exp') {
      val = val.replace(/\D/g, '').slice(0, 4);
      if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
    }
    if (field === 'cvv') val = val.replace(/\D/g, '').slice(0, 3);
    setCard(p => ({ ...p, [field]: val }));
  }

  const payBg = method === 'apple'
    ? 'linear-gradient(135deg,#1C1C1E,#3A3A3C)'
    : method === 'stc'
    ? 'linear-gradient(135deg,#004B2D,#00813D)'
    : 'linear-gradient(135deg,#6B3210,#8B4515)';

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      className="absolute inset-0 overflow-y-auto scrollbar-none z-10"
      style={{ background: '#FDFBF7' }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4 sticky top-0 z-10"
        style={{ background: 'rgba(253,251,247,0.94)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(196,181,159,0.15)' }}>
        <p className="text-[18px] font-black text-[#111]">تفاصيل الطلب</p>
        <p className="text-[11px] text-[#AAA] font-light">{orderLabel} · حساب براون دوز</p>
      </div>

      <div className="px-5 pt-4 pb-8">
        {/* Item card — floating with shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="relative overflow-hidden rounded-[20px] p-4 mb-4 flex items-center gap-3"
          style={{
            background: 'linear-gradient(145deg,#0C0002,#220505,#0C0002)',
            border: '1px solid rgba(196,120,58,0.22)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          {/* Shimmer sweep */}
          <div className="absolute inset-y-0 w-[60%] pointer-events-none"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(196,120,58,0.06),transparent)', animation: 'card-shimmer 3.5s ease-in-out infinite' }} />
          <div className="w-13 h-13 rounded-[14px] flex items-center justify-center text-[28px] shrink-0"
            style={{ background: 'rgba(196,120,58,0.1)', border: '1px solid rgba(196,120,58,0.18)' }}>
            {item.emoji}
          </div>
          <div className="flex-1">
            <p className="text-white text-[14px] font-bold">{item.name}</p>
            <p className="text-white/35 text-[10px]">× ١ — براون دوز</p>
          </div>
          <p className="text-[#C4783A] text-[18px] font-black font-inter shrink-0">{item.price} <span className="text-[11px]">ر</span></p>
        </motion.div>

        {/* Price breakdown */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-[18px] p-4 mb-4 border border-[rgba(196,181,159,0.18)] space-y-2.5"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#AAA]">المجموع الجزئي</span>
            <span className="text-[12px] font-semibold text-[#111] font-inter">{item.price} ر</span>
          </div>
          {orderType === 'delivery' && (
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#AAA]">رسوم التوصيل</span>
              <span className="text-[12px] font-bold text-[#30D158]">مجاناً 🎁</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#AAA]">ضريبة القيمة المضافة ١٥٪</span>
            <span className="text-[12px] font-semibold text-[#111] font-inter">{toAr(vat)} ر</span>
          </div>
          <div className="h-px bg-[rgba(196,181,159,0.18)]" />
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-[#111]">الإجمالي</span>
            <span className="text-[20px] font-black text-[#6B3210] font-inter">{toAr(total)} ر</span>
          </div>
        </motion.div>

        {/* Payment method selector */}
        <p className="text-[11px] font-bold text-[#666] mb-2.5 tracking-wide">طريقة الدفع</p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="flex gap-2 mb-4">
          {([
            { id: 'apple' as PayMethod, label: ' Pay', icon: (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            )},
            { id: 'stc' as PayMethod, label: 'STC Pay', icon: <span className="text-[11px] font-black">STC</span> },
            { id: 'card' as PayMethod, label: 'بطاقة', icon: (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth={2}>
                <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            )},
          ]).map(m => {
            const sel = method === m.id;
            return (
              <motion.button key={m.id} whileTap={{ scale: 0.91 }} onClick={() => setMethod(m.id)}
                className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[16px] transition-all"
                style={{
                  background: sel ? '#0C0002' : 'white',
                  border: `1.5px solid ${sel ? '#7A3B18' : 'rgba(196,181,159,0.2)'}`,
                  color: sel ? '#C4783A' : '#999',
                  boxShadow: sel ? '0 4px 16px rgba(107,50,16,0.25)' : '0 2px 8px rgba(0,0,0,0.03)',
                }}>
                {m.icon}
                <span className="text-[9.5px] font-bold">{m.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Card fields */}
        <AnimatePresence>
          {method === 'card' && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden mb-4">
              <div className="space-y-2.5">
                {[
                  { label: 'رقم البطاقة', field: 'num', placeholder: '0000 0000 0000 0000', inputMode: 'numeric' as const },
                  { label: 'تاريخ الانتهاء', field: 'exp', placeholder: 'MM/YY', inputMode: 'numeric' as const },
                  { label: 'رمز CVV', field: 'cvv', placeholder: '•••', inputMode: 'numeric' as const },
                ].map(f => (
                  <div key={f.field}>
                    <label className="text-[10px] font-bold text-[#888] mb-1.5 block">{f.label}</label>
                    <input
                      value={card[f.field as keyof typeof card]}
                      onChange={e => handleCard(f.field as keyof typeof card, e.target.value)}
                      placeholder={f.placeholder} inputMode={f.inputMode}
                      className="w-full px-4 py-3 rounded-[14px] text-[13px] font-medium text-[#111] placeholder-[#CCC] outline-none border"
                      style={{ background: 'white', border: '1.5px solid rgba(196,181,159,0.3)', direction: 'ltr' }}
                      onFocus={e => (e.target.style.borderColor = '#7A3B18')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(196,181,159,0.3)')}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pay CTA */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onPay(method)}
          className="w-full py-4 rounded-[20px] flex items-center justify-center gap-2.5 text-white font-bold text-[15px] relative overflow-hidden"
          style={{ background: payBg, boxShadow: '0 8px 28px rgba(0,0,0,0.22)' }}
        >
          {/* Shimmer on button */}
          <div className="absolute inset-y-0 w-[40%] pointer-events-none"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)', animation: 'card-shimmer 2.5s ease-in-out infinite' }} />

          {method === 'apple' && (
            <>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Pay — {toAr(total)} ريال</span>
              {/* Face ID icon */}
              <div className="flex flex-col gap-[2px] shrink-0" style={{ width: 18 }}>
                {[[0,0,1,0],[0,1,0,0],[0,0,0,1],[1,0,0,1]].map((row,ri) => (
                  <div key={ri} className="flex gap-[2px]">
                    {row.map((dot, di) => (
                      <div key={di} className="w-[3px] h-[3px] rounded-sm"
                        style={{ background: dot ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)' }} />
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
          {method === 'stc' && (
            <><span className="text-[18px] font-black">STC</span><span>Pay — {toAr(total)} ريال</span></>
          )}
          {method === 'card' && (
            <>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white shrink-0" strokeWidth={2}>
                <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              <span>ادفع {toAr(total)} ريال</span>
            </>
          )}
        </motion.button>

        <div className="flex items-center justify-center gap-1.5 mt-3">
          <Shield size={10} style={{ color: 'rgba(160,130,100,0.5)' }} />
          <p className="text-center text-[9px] text-[#CCC] font-light">معاملاتك مشفّرة · SSL · PCI DSS</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAYING SHEET — cinematic Face ID → processing → done
════════════════════════════════════════════════════════════════════ */
function PayingSheet({ payMethod }: { payMethod: PayMethod }) {
  const [stage, setStage] = useState(0);
  // stages: 0=authenticating, 1=processing, 2=confirming, 3=approved
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1200),
      setTimeout(() => setStage(3), 1700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const stages = [
    { label: 'جاري المصادقة…',   icon: '🔐', color: '#007AFF' },
    { label: 'جاري المعالجة…',   icon: '⚙️', color: '#FF9F0A' },
    { label: 'جاري التأكيد…',    icon: '📡', color: '#AF52DE' },
    { label: 'تمت المعالجة',     icon: '✅', color: '#30D158' },
  ];

  const curr = stages[stage];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-20"
      style={{ background: 'linear-gradient(175deg,#060001,#120105,#040001)' }}
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute w-48 h-48 rounded-full blur-[60px] pointer-events-none"
        style={{ background: curr.color, opacity: 0.4 }}
      />

      {/* Face ID grid — cinematic */}
      {payMethod === 'apple' && stage < 3 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-8"
        >
          {/* Face ID frame */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* Corner markers */}
            {[
              { top: 0, left: 0, borderTop: '3px solid', borderLeft: '3px solid' },
              { top: 0, right: 0, borderTop: '3px solid', borderRight: '3px solid' },
              { bottom: 0, left: 0, borderBottom: '3px solid', borderLeft: '3px solid' },
              { bottom: 0, right: 0, borderBottom: '3px solid', borderRight: '3px solid' },
            ].map((corner, i) => (
              <div key={i} className="absolute w-4 h-4"
                style={{ ...corner, borderColor: curr.color, borderRadius: 2 }} />
            ))}

            {/* Scanning line */}
            <motion.div
              animate={{ top: ['20%', '75%', '20%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-2 right-2 h-px"
              style={{ background: `linear-gradient(90deg,transparent,${curr.color},transparent)`, boxShadow: `0 0 8px ${curr.color}` }}
            />

            {/* Face dots */}
            <div className="flex flex-col gap-1.5 items-center">
              <div className="flex gap-2">
                {[1,1].map((_, i) => (
                  <motion.div key={i}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: curr.color }}
                  />
                ))}
              </div>
              <motion.div
                animate={{ scaleX: [1, 1.2, 0.9, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-5 h-0.5 rounded-full"
                style={{ background: curr.color }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Stage 3 — big checkmark */}
      {stage === 3 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 18, stiffness: 280 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
          style={{ background: 'linear-gradient(135deg,#30D158,#25A349)', boxShadow: '0 12px 40px rgba(48,209,88,0.4)' }}
        >
          <Check size={36} strokeWidth={3} color="white" />
        </motion.div>
      )}

      {/* Status text */}
      <AnimatePresence mode="wait">
        <motion.div key={stage}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="text-center"
        >
          <p className="text-white text-[18px] font-bold mb-1">{curr.label}</p>
          <p className="text-white/35 text-[11px] font-light">
            {stage === 0 ? 'تحقق من هويتك' : stage === 1 ? 'جارٍ الاتصال بالمصرف' : stage === 2 ? 'تأكيد العملية' : 'تمت العملية بنجاح'}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {stages.map((_, i) => (
          <motion.div key={i}
            animate={{
              width: i === stage ? 24 : 6,
              background: i <= stage ? curr.color : 'rgba(255,255,255,0.15)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="h-1.5 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   INVOICE — epic success with points explosion
════════════════════════════════════════════════════════════════════ */
function useCounter(target: number, duration = 1000, delay = 200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return value;
}

/* Confetti particles */
const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  x: Math.random() * 100,
  color: ['#C4783A','#30D158','#FFD60A','#007AFF','#AF52DE','#FF3B30'][i % 6],
  delay: Math.random() * 0.4,
  dur: 0.8 + Math.random() * 0.6,
  size: 4 + Math.random() * 6,
}));

function InvoiceSheet({ item, orderType, payMethod, brandName, logoImg, onClose }: {
  item: CheckoutItem; orderType: OrderType; payMethod: PayMethod;
  brandName: string; logoImg: string; onClose: () => void;
}) {
  const inv  = React.useMemo(() => invNum(), []);
  const now  = React.useMemo(() => nowAr(), []);
  const base = toInt(item.price);
  const vat  = Math.round(base * 0.15);
  const total = base + vat;
  const pts   = Math.round(total / 4);
  const ptsCounter = useCounter(pts, 1200, 600);
  const methodLabel = payMethod === 'apple' ? 'Apple Pay' : payMethod === 'stc' ? 'STC Pay' : 'بطاقة بنكية';
  const typeLabel   = orderType === 'dine' ? 'استلام من الفرع' : 'توصيل';

  return (
    <motion.div
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
      transition={{ type: 'spring', damping: 26, stiffness: 280 }}
      className="absolute inset-0 overflow-y-auto scrollbar-none z-20"
      style={{ background: '#FDFBF7' }}
    >
      {/* ── Epic success header ── */}
      <div className="relative overflow-hidden text-center py-10 px-5"
        style={{ background: 'linear-gradient(160deg,#040010,#0A0020,#020008)' }}>

        {/* Confetti burst */}
        {CONFETTI.map((c, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, x: `${c.x}vw`, opacity: 1, scale: 1 }}
            animate={{ y: -120, opacity: 0, scale: 0.5, rotate: Math.random() * 360 }}
            transition={{ duration: c.dur, delay: c.delay, ease: 'easeOut' }}
            className="absolute bottom-0 rounded-sm pointer-events-none"
            style={{ width: c.size, height: c.size, background: c.color, left: `${c.x}%` }}
          />
        ))}

        {/* Success ring */}
        <div className="relative w-20 h-20 mx-auto mb-5">
          {/* Pulse rings */}
          {[0, 1, 2].map(i => (
            <motion.div key={i}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.5 + i * 0.5, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.1 + i * 0.2, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: '#30D158' }}
            />
          ))}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 260, delay: 0.05 }}
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#30D158,#25A349)', boxShadow: '0 12px 40px rgba(48,209,88,0.5)' }}
          >
            <Check size={32} strokeWidth={3} className="text-white" />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-white text-[24px] font-black mb-1">تم الدفع بنجاح! 🎉
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          className="text-white/40 text-[11px] font-light">{now}
        </motion.p>

        {/* Points explosion badge */}
        <motion.div
          initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 18, stiffness: 300, delay: 0.5 }}
          className="inline-flex items-center gap-2 mt-5 px-5 py-3 rounded-[20px]"
          style={{
            background: 'linear-gradient(135deg,rgba(196,120,58,0.25),rgba(196,120,58,0.1))',
            border: '1px solid rgba(196,120,58,0.4)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Star size={16} fill="#C4783A" color="#C4783A" />
          <span className="text-white text-[13px] font-light">ربحت</span>
          <span className="text-[#C4783A] text-[24px] font-black font-inter leading-none">+{ptsCounter}</span>
          <span className="text-white/60 text-[12px]">نقطة</span>
        </motion.div>
      </div>

      {/* ── Invoice card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, type: 'spring', stiffness: 340, damping: 28 }}
        className="mx-4 -mt-5 rounded-[24px] overflow-hidden"
        style={{ background: 'white', border: '1px solid rgba(196,181,159,0.2)', boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
      >
        {/* Brand row */}
        <div className="flex items-center gap-3 p-5 border-b border-[rgba(196,181,159,0.12)]">
          <img src={logoImg} alt={brandName}
            className="w-12 h-12 rounded-[14px] object-cover border border-[rgba(196,181,159,0.2)] shrink-0" />
          <div className="flex-1">
            <p className="text-[15px] font-black text-[#111]">{brandName}</p>
            <p className="text-[10px] text-[#AAA] font-light">فاتورة ضريبية رسمية · ZATCA</p>
          </div>
          <div className="text-left">
            <p className="text-[9px] font-black text-[#7A3B18]" style={{ fontFamily: 'ui-monospace' }}>{inv}</p>
            <p className="text-[8px] text-[#CCC] font-light">رقم الفاتورة</p>
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-0 border-b border-[rgba(196,181,159,0.12)]">
          {[
            { label: 'طريقة الاستلام', val: typeLabel },
            { label: 'طريقة الدفع',   val: methodLabel },
            { label: 'التاريخ والوقت', val: now },
            { label: 'حالة الطلب',    val: 'مؤكّد ✓', color: '#30D158' },
          ].map((r, i) => (
            <div key={i} className={`px-4 py-3 ${i % 2 === 0 ? 'border-l border-[rgba(196,181,159,0.1)]' : ''}`}>
              <p className="text-[8.5px] text-[#AAA] font-light mb-0.5">{r.label}</p>
              <p className="text-[11px] font-bold" style={{ color: r.color || '#111' }}>{r.val}</p>
            </div>
          ))}
        </div>

        {/* Item */}
        <div className="px-5 py-4 border-b border-[rgba(196,181,159,0.12)]">
          <p className="text-[8.5px] font-black text-[#AAA] tracking-widest mb-3" style={{ fontFamily: 'ui-monospace' }}>الأصناف المطلوبة</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-[20px] shrink-0"
              style={{ background: 'rgba(160,82,45,0.06)' }}>{item.emoji}</div>
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
            <span className="text-[#AAA]">المجموع الجزئي</span>
            <span className="font-semibold text-[#111] font-inter">{item.price} ر</span>
          </div>
          {orderType === 'delivery' && (
            <div className="flex justify-between text-[11px]">
              <span className="text-[#AAA]">رسوم التوصيل</span>
              <span className="font-semibold text-[#30D158]">مجاناً</span>
            </div>
          )}
          <div className="flex justify-between text-[11px]">
            <span className="text-[#AAA]">ضريبة القيمة المضافة ١٥٪</span>
            <span className="font-semibold text-[#111] font-inter">{toAr(vat)} ر</span>
          </div>
          <div className="h-px bg-[rgba(196,181,159,0.18)]" />
          <div className="flex justify-between">
            <span className="text-[14px] font-bold text-[#111]">الإجمالي</span>
            <span className="text-[20px] font-black text-[#6B3210] font-inter">{toAr(total)} ر</span>
          </div>
        </div>

        {/* Barcode */}
        <div className="px-5 pb-5">
          <div className="rounded-[12px] overflow-hidden p-3 flex flex-col items-center gap-1.5"
            style={{ background: 'rgba(196,181,159,0.06)', border: '1px solid rgba(196,181,159,0.15)' }}>
            <div className="flex gap-[1.5px] h-8">
              {Array.from({ length: 52 }).map((_, i) => (
                <div key={i} style={{
                  width: i % 3 === 0 ? 3 : i % 5 === 0 ? 2 : 1,
                  background: '#111',
                  opacity: 0.12 + Math.sin(i * 1.3) * 0.12 + 0.15,
                  borderRadius: 0.5,
                }} />
              ))}
            </div>
            <p className="text-[7.5px] font-mono text-[#AAA] tracking-widest">{inv}</p>
          </div>
        </div>
      </motion.div>

      {/* CTAs */}
      <div className="px-4 pt-4 pb-8 flex gap-3">
        <motion.button
          whileTap={{ scale: 0.96 }} onClick={onClose}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex-1 py-4 rounded-[18px] font-bold text-[14px] text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#0C0002,#280408)', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}
        >
          <span className="relative z-10">تمام، شكراً ☕</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.94 }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="w-14 rounded-[18px] flex items-center justify-center shrink-0"
          style={{ background: 'white', border: '1.5px solid rgba(196,181,159,0.25)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-[#6B3210]" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN CHECKOUT MODAL
════════════════════════════════════════════════════════════════════ */
export function CheckoutModal({ item, brandName, brandType, logoImg, onClose, onOrderComplete }: Props) {
  const [phase,      setPhase]      = useState<Phase>('type');
  const [orderType,  setOrderType]  = useState<OrderType>('dine');
  const [payMethod,  setPayMethod]  = useState<PayMethod>('apple');

  function handleTypeSelect(t: OrderType) {
    setOrderType(t);
    setPhase(t === 'delivery' ? 'address' : 'branch');
  }
  function handleBranchSelect(_b: typeof BRANCHES[0]) { setPhase('payment'); }
  function handleAddressConfirm(_addr: string) { setPhase('payment'); }
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
      onOrderComplete({ itemName: item.name, itemEmoji: item.emoji, totalPrice: total, basePrice: base, orderType, payMethod, pts: Math.round(total / 4), timestamp: new Date() });
    }
    onClose();
  }

  const showStep = !['paying','invoice','address'].includes(phase);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={phase === 'type' ? onClose : undefined}
        className="absolute inset-0 z-10"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      />

      {/* Step indicator */}
      {showStep && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[420px] left-4 right-4 z-[15] rounded-[18px] py-2"
          style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
        >
          <StepIndicator phase={phase} orderType={orderType} />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {phase === 'type' && (
          <OrderTypeSheet key="type" brandType={brandType} item={item} onSelect={handleTypeSelect} onClose={onClose} />
        )}
        {phase === 'branch' && (
          <BranchPickerSheet key="branch" onSelect={handleBranchSelect} onBack={() => setPhase('type')} />
        )}
        {phase === 'address' && (
          <MapPickerSheet key="address" onConfirm={handleAddressConfirm} onBack={() => setPhase('type')} />
        )}
        {phase === 'payment' && (
          <PaymentSheet key="payment" item={item} orderType={orderType} onPay={handlePay} />
        )}
        {phase === 'paying' && <PayingSheet key="paying" payMethod={payMethod} />}
        {phase === 'invoice' && (
          <InvoiceSheet key="invoice" item={item} orderType={orderType} payMethod={payMethod}
            brandName={brandName} logoImg={logoImg} onClose={handleInvoiceClose} />
        )}
      </AnimatePresence>
    </>
  );
}
