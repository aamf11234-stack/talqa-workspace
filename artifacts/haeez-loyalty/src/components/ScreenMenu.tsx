import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Flame, Snowflake, Check, Star } from 'lucide-react';
import { useBrand } from '../BrandContext';
import { CheckoutModal } from './CheckoutFlow';
import type { CheckoutItem, CompletedOrderData } from './CheckoutFlow';
import { useOrders } from '../OrdersContext';

/* ══════════════════════════════════════════ DATA ══ */
interface MenuItem {
  name: string;
  desc?: string;
  origin?: string;
  originFlag?: string;
  price?: number;
  priceHot?: number;
  priceCold?: number;
  badge?: string;
  badgeColor?: string;
  featured?: boolean;
  img?: string;
}
interface MenuCategory {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  note?: string;
  items: MenuItem[];
}

const B = import.meta.env.BASE_URL;

const menu: MenuCategory[] = [
  {
    id: 'hot', name: 'المشروبات الحارة', nameEn: 'HOT DRINKS', color: '#7A3B18',
    items: [
      { name: 'قهوة اليوم',       desc: 'بلند يومي مختار من أجود المصادر',            price: 9,  badge: 'اليوم',  badgeColor: '#7A3B18' },
      { name: 'اسبريسو',          desc: 'شوت مركّز بكريما ذهبية وعطر حاد',            price: 10 },
      { name: 'امريكانو',          desc: 'إسبريسو ممدود بالماء الساخن — نظيف وقوي',   price: 12 },
      { name: 'ميكاتو',            desc: 'إسبريسو بلمسة حليب ناعمة ومخملية',          price: 12 },
      { name: 'بلاك كوفي',         desc: 'قهوة سوداء مطبوخة بالطريقة التقليدية',      price: 12 },
      { name: 'كورنادو',           desc: 'إسبريسو مع حليب مكثف — حلو ومركّز',         price: 14 },
      { name: 'فلات وايت',         desc: 'دبل إسبريسو مع حليب مخملي ناعم',            price: 16 },
      { name: 'كابتشينو',          desc: 'إسبريسو وحليب وفوم بنسب مثالية',            price: 16 },
      { name: 'لاتيه',             desc: 'حليب مبخّر ناعم مع إسبريسو براون',          price: 17, featured: true, img: `${B}bd-affogato.jpg` },
      { name: 'اسبانيش لاتيه',     desc: 'لاتيه مع حليب مكثف — كثيف وحلو',           price: 17 },
      { name: 'بستاشيو لاتيه',     desc: 'فستق حلبي كريمي مع إسبريسو براون',          price: 20 },
      { name: 'كراميل لاتيه',      desc: 'كراميل محلي الصنع مع حليب مبخّر',           price: 20 },
      { name: 'ماتشا لاتيه',       desc: 'شاي أخضر ياباني فاخر مع حليب ناعم',        price: 20 },
    ],
  },
  {
    id: 'cold', name: 'المشروبات الباردة', nameEn: 'COLD DRINKS', color: '#3D7A6A',
    items: [
      { name: 'قهوة اليوم بارده صغير', desc: 'بلند اليوم مثلج صغير منعش',             price: 9  },
      { name: 'قهوة اليوم بارده كبير', desc: 'بلند اليوم مثلج كبير لمزيد من الاستمتاع', price: 10 },
      { name: 'ايس امريكانو',          desc: 'إسبريسو بارد على ثلج محطم',              price: 15 },
      { name: 'موهيتو روز يري',        desc: 'موهيتو وردي بنعناع وتوت طازج',           price: 17, badge: 'الأشهر', badgeColor: '#3D7A6A', featured: true, img: `${B}bd-mohito.jpg` },
      { name: 'موهيتو يريز ليمون',     desc: 'يري وليمون طازج — توازن منعش مثالي',     price: 17 },
      { name: 'موهيتو بلو اوشن',       desc: 'أزرق مثلج بنكهة البحر المنعشة',          price: 17 },
      { name: 'موهيتو مكس',            desc: 'مزيج خاص من ثلاث نكهات منعشة',           price: 17 },
      { name: 'موهيتو باشن فروت',      desc: 'باشن فروت استوائي بلمسة حارة',           price: 18 },
      { name: 'كركديه',                desc: 'كركديه بارد مثلج — مشروب صحي وغني',      price: 18 },
      { name: 'ايس لاتيه',             desc: 'لاتيه براون بارد على ثلج ناعم',           price: 18 },
      { name: 'ايس ستفتشر براون',      desc: 'توقيعنا الخاص — لا يوجد إلا في براون',   price: 19, badge: 'توقيع', badgeColor: '#3D7A6A', featured: true, img: `${B}bd-ice-stretcher.jpg` },
      { name: 'اسبانيش لاتيه بارد',    desc: 'لاتيه اسبانيش بارد مع حليب مكثف',        price: 19 },
      { name: 'ايس كراميل',            desc: 'كراميل لاتيه بارد مع كريمة وثلج',         price: 20 },
      { name: 'بستاشيو لاتيه بارد',    desc: 'فستق حلبي مع حليب بارد وثلج ناعم',       price: 20 },
      { name: 'اسبرسو خوذ',            desc: 'إسبريسو بارد مباشر على ثلج ناعم',         price: 20 },
      { name: 'ايس يري',               desc: 'يري بارد بنكهة التوت المميزة',             price: 19 },
      { name: 'ماتشا',                 desc: 'ماتشا يابانية فاخرة مع حليب بارد',         price: 20 },
      { name: 'افقاتو براون',          desc: 'إسبريسو ساخن فوق آيس كريم فانيليا بارد', price: 25, badge: 'الأحلى', badgeColor: '#7A3B18', featured: true, img: `${B}bd-affogato.jpg` },
    ],
  },
  {
    id: 'filter', name: 'قهوة مقطرة', nameEn: 'POUR OVER', color: '#7A3B28',
    note: 'تُحضَّر بالطلب · ١٠-١٥ دقيقة',
    items: [
      { name: 'أثيوبي هنيبلا',      desc: 'تعقيد إثيوبي بنكهات التوت والشوكولا الخفيفة', origin: 'إثيوبيا', originFlag: '🇪🇹', priceHot: 17, priceCold: 17, featured: true, img: `${B}bd-filter.jpg` },
      { name: 'أثيوبي اوراقا فاخر', desc: 'حموضة نظيفة مع نكهة زهرية ووردية رقيقة',      origin: 'إثيوبيا', originFlag: '🇪🇹', priceHot: 18, priceCold: 18, badge: 'فاخر', badgeColor: '#7A3B28' },
      { name: 'أثيوبي شلشلي فاخر', desc: 'معالجة طبيعية بنكهة استوائية وإجاص',           origin: 'إثيوبيا', originFlag: '🇪🇹', priceHot: 20, priceCold: 20, badge: 'فاخر', badgeColor: '#7A3B28' },
      { name: 'كولومبي الندو فاخر', desc: 'ناعم بنكهة البندق والتفاح الأخضر',             origin: 'كولومبيا', originFlag: '🇨🇴', priceHot: 17, priceCold: 18, badge: 'فاخر', badgeColor: '#7A3B28' },
      { name: 'بن يمني',             desc: 'تراثي أصيل بنكهة التوابل الدافئة',             origin: 'اليمن',    originFlag: '🇾🇪', price: 19 },
    ],
  },
  {
    id: 'sweets', name: 'الحلويات', nameEn: 'SWEETS', color: '#6B3210',
    items: [
      { name: 'كوكيز كلاسك',              desc: 'طري من الداخل مقرمش من الخارج بشيبس شوكولا', price: 12 },
      { name: 'كوكيز شوكلت',              desc: 'شوكولا داكنة غنية تذوب في الفم',               price: 18 },
      { name: 'كوكيز شوكلت مع ايسكريم',   desc: 'كوكيز ساخن مع آيس كريم فانيليا بارد',          price: 20, badge: '🔥', badgeColor: '#6B3210' },
      { name: 'تراميسو',                   desc: 'إيطالي أصيل بالإسبريسو والماسكاربوني',          price: 22 },
      { name: 'تشيز كنافة',                desc: 'تشيز كيك بنكهة الكنافة الشرقية مع خيوط مقرمشة', price: 22 },
      { name: 'كيكة جزر',                  desc: 'رطبة ومحشوة بكريمة الجبن الناعمة',              price: 23 },
      { name: 'تشيز لندن',                 desc: 'تشيز كيك لندني بقاعدة بسكويت مقرمشة',           price: 23 },
      { name: 'كيكة توفي',                 desc: 'توفي ناعم مع صوص الكراميل الداكن والكريمة',     price: 24 },
      { name: 'براون كيك',                  desc: 'توقيع البيت — شوكولا بلجيكي داكن',              price: 24, badge: '✦', badgeColor: '#6B3210' },
      { name: 'تراميسو شوكلت',             desc: 'تيراميسو بشوكولا داكنة غنية وطبقة كاكاو',       price: 25 },
      { name: 'فاج شوكلت',                 desc: 'فاج شوكولا داكن كثيف ولذيذ',                    price: 28 },
    ],
  },
  {
    id: 'boxes', name: 'بوكسات القهوة', nameEn: 'COFFEE BOXES', color: '#5C2A0E',
    note: 'للمناسبات والهدايا والاحتفالات',
    items: [
      { name: 'بوكس قهوة ١٠ عبوات', desc: 'عشر عبوات مميزة من قهوة براون بتغليف احترافي — مثالي للهدايا',   price: 135 },
      { name: 'بوكس قهوة ٩ عبوات',  desc: 'تسع عبوات جاهزة للهدية مع تغليف أنيق ومريح للحمل',             price: 115 },
      { name: 'جك قهوة ٢ لتر',       desc: 'قهوة براون الساخنة جاهزة بحجم لترين — كافية لعشرة أشخاص',     price: 45  },
    ],
  },
];

/* ══════════════════════════════════════════ CAT META ══ */
const catMeta: Record<string, { emoji: string; dot: string }> = {
  hot:    { emoji: '☕', dot: '#7A3B18' },
  cold:   { emoji: '🧊', dot: '#3D7A6A' },
  filter: { emoji: '🫗', dot: '#7A3B28' },
  sweets: { emoji: '🍰', dot: '#6B3210' },
  boxes:  { emoji: '📦', dot: '#5C2A0E' },
};

/* ══════════════════════════════════════════ BESTSELLERS ══ */
const HITS = [
  { catId: 'cold',   name: 'افقاتو براون',           price: 25, label: '🍨 الأحلى', img: `${B}bd-affogato.jpg`      },
  { catId: 'cold',   name: 'موهيتو روز يري',          price: 17, label: '🌸 الأشهر', img: `${B}bd-mohito.jpg`        },
  { catId: 'cold',   name: 'ايس ستفتشر براون',        price: 19, label: '✦ توقيع',  img: `${B}bd-ice-stretcher.jpg` },
  { catId: 'cold',   name: 'بستاشيو لاتيه بارد',      price: 20, label: '🍵 ترند',  img: `${B}bd-pistachio.jpg`     },
  { catId: 'sweets', name: 'كوكيز شوكلت مع ايسكريم',  price: 20, label: '🔥 مشهور', img: null                       },
  { catId: 'sweets', name: 'تشيز كنافة',               price: 22, label: '✨ محلي',  img: null                       },
  { catId: 'sweets', name: 'براون كيك',                price: 24, label: '✦ خاص',   img: null                       },
];

/* ══════════════════════════════════════════ CART TYPES ══ */
interface CartItem { name: string; price: number; qty: number; }

/* ══════════════════════════════════════════ CUSTOMIZE SHEET ══ */
interface CustomizeTarget { name: string; basePrice: number; emoji: string; catId: string; }

const sizes    = [{ id: 'sm', label: 'صغير', diff: 0 }, { id: 'lg', label: 'كبير', diff: 3 }];
const sweets   = [{ id: 'none', label: 'بدون' }, { id: 'light', label: 'خفيف' }, { id: 'med', label: 'عادي' }, { id: 'sweet', label: 'حلو' }];
const milkOpts = [{ id: 'full', label: 'كامل' }, { id: 'skim', label: 'خالي دسم' }, { id: 'oat', label: 'شوفان 🌱' }];

function CustomizeSheet({ target, onConfirm, onClose }: {
  target: CustomizeTarget;
  onConfirm: (item: CheckoutItem) => void;
  onClose: () => void;
}) {
  const isDrink = target.catId === 'hot' || target.catId === 'cold' || target.catId === 'filter';
  const [size,   setSize]   = useState('sm');
  const [sweet,  setSweet]  = useState('med');
  const [milk,   setMilk]   = useState('full');
  const [qty,    setQty]    = useState(1);
  const total = (target.basePrice + (isDrink ? (sizes.find(s => s.id === size)?.diff ?? 0) : 0)) * qty;

  function confirm() {
    const suffix = isDrink
      ? ` (${sizes.find(s => s.id === size)?.label} · ${sweets.find(s => s.id === sweet)?.label} · حليب ${milkOpts.find(m => m.id === milk)?.label})`
      : qty > 1 ? ` ×${qty}` : '';
    onConfirm({ name: `${target.name}${suffix}`, price: String(total), emoji: target.emoji });
    onClose();
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-sm z-40" />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 340 }}
        className="absolute inset-x-0 bottom-0 z-50 rounded-t-[28px] overflow-hidden"
        style={{ background: '#FAFAF9' }}>

        {/* Drag handle */}
        <div className="w-8 h-1 bg-[#E0DDD9] rounded-full mx-auto mt-3 mb-5" />

        {/* Item header */}
        <div className="px-5 mb-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[24px] shrink-0"
            style={{ background: 'linear-gradient(145deg,#F5F4F2,#EDE9E4)' }}>
            {target.emoji}
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-bold text-[#111]">{target.name}</p>
            <p className="text-[12px] text-[#888]">{target.basePrice} ريال</p>
          </div>
        </div>

        {isDrink ? (
          <>
            {/* Size */}
            <div className="px-5 mb-4">
              <p className="text-[9px] font-black text-[#BBB] tracking-[0.22em] uppercase mb-2.5">الحجم</p>
              <div className="flex gap-2">
                {sizes.map(s => (
                  <motion.button key={s.id} whileTap={{ scale: 0.94 }} onClick={() => setSize(s.id)}
                    className="flex-1 py-3 rounded-[13px] text-[12px] font-semibold border transition-all"
                    style={{ background: size === s.id ? '#111' : 'white', color: size === s.id ? '#fff' : '#555', borderColor: size === s.id ? '#111' : '#E5E2DC' }}>
                    {s.label}{s.diff > 0 && <span className="text-[9px] opacity-50 mr-0.5">+{s.diff}</span>}
                  </motion.button>
                ))}
              </div>
            </div>
            {/* Sweetness */}
            <div className="px-5 mb-4">
              <p className="text-[9px] font-black text-[#BBB] tracking-[0.22em] uppercase mb-2.5">الحلاوة</p>
              <div className="flex gap-1.5">
                {sweets.map(s => (
                  <motion.button key={s.id} whileTap={{ scale: 0.94 }} onClick={() => setSweet(s.id)}
                    className="flex-1 py-2.5 rounded-[11px] text-[10px] font-semibold border transition-all"
                    style={{ background: sweet === s.id ? '#111' : 'white', color: sweet === s.id ? '#fff' : '#666', borderColor: sweet === s.id ? '#111' : '#E5E2DC' }}>
                    {s.label}
                  </motion.button>
                ))}
              </div>
            </div>
            {/* Milk */}
            <div className="px-5 mb-6">
              <p className="text-[9px] font-black text-[#BBB] tracking-[0.22em] uppercase mb-2.5">نوع الحليب</p>
              <div className="flex gap-2">
                {milkOpts.map(m => (
                  <motion.button key={m.id} whileTap={{ scale: 0.94 }} onClick={() => setMilk(m.id)}
                    className="flex-1 py-2.5 rounded-[13px] text-[11px] font-semibold border transition-all"
                    style={{ background: milk === m.id ? '#111' : 'white', color: milk === m.id ? '#fff' : '#666', borderColor: milk === m.id ? '#111' : '#E5E2DC' }}>
                    {m.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Quantity only for sweets/boxes */
          <div className="px-5 mb-6">
            <p className="text-[9px] font-black text-[#BBB] tracking-[0.22em] uppercase mb-3">الكمية</p>
            <div className="flex items-center justify-center gap-5">
              <motion.button whileTap={{ scale: 0.85 }} onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-11 h-11 rounded-full border-2 border-[#E5E2DC] flex items-center justify-center text-[20px] font-bold text-[#111]">−</motion.button>
              <span className="text-[28px] font-black text-[#111] w-10 text-center tabular-nums">{qty}</span>
              <motion.button whileTap={{ scale: 0.85 }} onClick={() => setQty(q => q + 1)}
                className="w-11 h-11 rounded-full bg-[#111] flex items-center justify-center text-[20px] font-bold text-white">+</motion.button>
            </div>
          </div>
        )}

        <div className="px-5 pb-10">
          <motion.button whileTap={{ scale: 0.97 }} onClick={confirm}
            className="w-full py-4 rounded-[16px] font-bold text-[14px] text-white flex items-center justify-center gap-2"
            style={{ background: '#111' }}>
            <Check size={15} strokeWidth={2.5} />
            أضف للسلة — {total} ريال
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

/* ══════════════════════════════════════════ CART BAR ══ */
function CartBar({ cart, onCheckout }: { cart: CartItem[]; onCheckout: () => void }) {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 320 }}
      className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-8 pt-4"
      style={{ background: 'linear-gradient(to top,#F8F7F5 70%,transparent)', pointerEvents: 'none' }}>
      <motion.button whileTap={{ scale: 0.97 }} onClick={onCheckout}
        className="w-full rounded-[20px] flex items-center overflow-hidden"
        style={{ background: '#111', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', pointerEvents: 'auto' }}>
        <div className="px-4 py-4 flex items-center gap-2 shrink-0">
          <motion.span key={count}
            initial={{ scale: 1.3 }} animate={{ scale: 1 }}
            className="w-7 h-7 rounded-full bg-[#6B3210] text-white text-[11px] font-black flex items-center justify-center">
            {count}
          </motion.span>
        </div>
        <div className="flex-1 text-center">
          <span className="text-white text-[15px] font-bold">اطلب الآن</span>
        </div>
        <div className="px-4 py-4 shrink-0">
          <motion.span key={total} initial={{ y: -4, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-white text-[15px] font-bold tabular-nums">{total} ر</motion.span>
        </div>
      </motion.button>
    </motion.div>
  );
}

/* ══════════════════════════════════════════ BESTSELLERS RAIL ══ */
function BestsellersRail({ cart, onCustomize }: {
  cart: CartItem[];
  onCustomize: (t: CustomizeTarget) => void;
}) {
  const catOf = (name: string) => menu.find(c => c.items.find(i => i.name === name))?.id ?? 'cold';
  return (
    <div className="pt-5 pb-2">
      <div className="flex items-baseline justify-between px-4 mb-3">
        <div>
          <p className="text-[8px] font-black text-[#BBB] tracking-[0.25em] uppercase mb-0.5">TOP PICKS</p>
          <h2 className="text-[18px] font-black text-[#111]">الأكثر طلباً</h2>
        </div>
        <div className="flex items-center gap-1">
          {[1,2,3].map(i => <Star key={i} size={9} className="text-[#6B3210] fill-[#6B3210]" />)}
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-none px-4 pb-1">
        {HITS.map((h, i) => {
          const qty = cart.find(c => c.name === h.name)?.qty ?? 0;
          return (
            <motion.div key={i}
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="shrink-0 w-[130px] rounded-[20px] overflow-hidden bg-white"
              style={{ border: '1px solid #EBEBEB', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              {/* Image or emoji */}
              <div className="h-[80px] relative overflow-hidden"
                style={{ background: h.img ? undefined : 'linear-gradient(145deg,#F5EEE8,#EDE0D4)' }}>
                {h.img
                  ? <img src={h.img} alt={h.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-[38px]">
                      {catMeta[h.catId]?.emoji}
                    </div>
                }
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[8px] font-bold text-white"
                  style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>{h.label}</div>
              </div>
              <div className="p-2.5">
                <p className="text-[10.5px] font-bold text-[#111] leading-snug mb-1 line-clamp-2">{h.name}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[13px] font-black text-[#111] tabular-nums">{h.price}<span className="text-[8px] font-normal text-[#BBB] mr-0.5">ر</span></span>
                  <motion.button whileTap={{ scale: 0.82 }}
                    onClick={() => onCustomize({ name: h.name, basePrice: h.price, emoji: catMeta[h.catId]?.emoji ?? '☕', catId: catOf(h.name) })}
                    className="w-7 h-7 rounded-full flex items-center justify-center font-black text-[16px]"
                    style={{ background: qty > 0 ? '#6B3210' : '#111', color: 'white' }}>
                    {qty > 0 ? qty : '+'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Divider */}
      <div className="flex items-center gap-3 mx-4 mt-5">
        <div className="flex-1 h-px bg-[#EBEBEB]" />
        <span className="text-[8px] text-[#DDD] tracking-[0.2em] font-bold">القائمة الكاملة</span>
        <div className="flex-1 h-px bg-[#EBEBEB]" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ FEATURED CARD ══ */
function FeaturedCard({ item, catId, qty, onCustomize, onRemove }: {
  item: MenuItem; catId: string; qty: number;
  onCustomize: (t: CustomizeTarget) => void; onRemove: (n: string) => void;
}) {
  const price = item.price ?? item.priceHot ?? 0;
  const meta  = catMeta[catId] ?? { emoji: '☕', dot: '#111' };
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-3 rounded-[22px] overflow-hidden bg-white"
      style={{ border: '1px solid #EBEBEB', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
      <div className="relative h-[150px]">
        <img src={item.img!} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 55%)' }} />
        {item.badge && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[8px] font-bold text-white"
            style={{ background: item.badgeColor ?? '#111' }}>{item.badge}</div>
        )}
        {item.origin && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-[8px] text-white"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}>
            {item.originFlag} {item.origin}
          </div>
        )}
      </div>
      <div className="px-4 py-3.5 flex items-end gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-[#111]">{item.name}</p>
          {item.desc && <p className="text-[10px] text-[#999] mt-0.5 leading-snug">{item.desc}</p>}
          {item.priceHot !== undefined && item.priceCold !== undefined ? (
            <div className="flex gap-3 mt-2">
              <span className="flex items-center gap-1 text-[12px] font-bold text-[#111]">
                <Flame size={9} className="text-[#FF6B35]" />{item.priceHot} ر
              </span>
              <span className="flex items-center gap-1 text-[12px] font-bold text-[#111]">
                <Snowflake size={9} className="text-[#1EB4FF]" />{item.priceCold} ر
              </span>
            </div>
          ) : (
            <p className="text-[17px] font-black text-[#111] mt-1.5 tabular-nums">{price} <span className="text-[10px] font-normal text-[#CCC]">ريال</span></p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {qty > 0 && (
            <>
              <motion.button whileTap={{ scale: 0.82 }} onClick={() => onRemove(item.name)}
                className="w-8 h-8 rounded-full border border-[#DDD] flex items-center justify-center text-[16px] font-bold text-[#111]">−</motion.button>
              <motion.span key={qty} initial={{ scale: 1.2 }} animate={{ scale: 1 }}
                className="text-[14px] font-black text-[#111] w-5 text-center">{qty}</motion.span>
            </>
          )}
          <motion.button whileTap={{ scale: 0.82 }}
            onClick={() => onCustomize({ name: item.name, basePrice: price, emoji: meta.emoji, catId })}
            className="w-9 h-9 rounded-full text-white flex items-center justify-center font-black text-[20px]"
            style={{ background: meta.dot }}>+</motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════ SWEETS GRID ══ */
const sweetEmoji: Record<string, string> = {
  'كوكيز كلاسك': '🍪', 'كوكيز شوكلت': '🍫', 'كوكيز شوكلت مع ايسكريم': '🍪🍨',
  'تراميسو': '🍮', 'تشيز كنافة': '🧁', 'كيكة جزر': '🥕🎂',
  'تشيز لندن': '🍰', 'كيكة توفي': '🎂', 'براون كيك': '🍫🎂',
  'تراميسو شوكلت': '🍮', 'فاج شوكلت': '🍫',
};

function SweetsGrid({ items, cart, onCustomize, onRemove }: {
  items: MenuItem[]; cart: CartItem[];
  onCustomize: (t: CustomizeTarget) => void; onRemove: (n: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 mx-4">
      {items.map((item, i) => {
        const qty   = cart.find(c => c.name === item.name)?.qty ?? 0;
        const price = item.price!;
        const emoji = sweetEmoji[item.name] ?? '🍰';
        return (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className="bg-white rounded-[20px] overflow-hidden"
            style={{ border: '1px solid #EBEBEB', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            {/* Emoji area */}
            <div className="h-[76px] flex items-center justify-center text-[38px] relative"
              style={{ background: 'linear-gradient(145deg,#FEF9F5,#F5EAE0)' }}>
              {emoji}
              {item.badge && (
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[9px] font-black text-white"
                  style={{ background: '#6B3210' }}>{item.badge}</div>
              )}
            </div>
            <div className="p-3">
              <p className="text-[11px] font-bold text-[#111] leading-snug mb-1">{item.name}</p>
              <p className="text-[9px] text-[#BBB] leading-snug mb-2.5" style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {item.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-black text-[#111] tabular-nums">{price}<span className="text-[8px] font-normal text-[#CCC] mr-0.5">ر</span></span>
                {qty > 0 ? (
                  <div className="flex items-center gap-1.5">
                    <motion.button whileTap={{ scale: 0.82 }} onClick={() => onRemove(item.name)}
                      className="w-6 h-6 rounded-full border border-[#DDD] flex items-center justify-center text-[13px] font-bold text-[#111]">−</motion.button>
                    <motion.span key={qty} initial={{ scale: 1.3 }} animate={{ scale: 1 }}
                      className="text-[12px] font-black text-[#111] w-4 text-center">{qty}</motion.span>
                    <motion.button whileTap={{ scale: 0.82 }}
                      onClick={() => onCustomize({ name: item.name, basePrice: price, emoji, catId: 'sweets' })}
                      className="w-6 h-6 rounded-full bg-[#6B3210] text-white flex items-center justify-center text-[13px] font-bold">+</motion.button>
                  </div>
                ) : (
                  <motion.button whileTap={{ scale: 0.82 }}
                    onClick={() => onCustomize({ name: item.name, basePrice: price, emoji, catId: 'sweets' })}
                    className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center text-[18px] font-bold">+</motion.button>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════ BOX CARDS ══ */
function BoxCards({ items, cart, onCustomize, onRemove }: {
  items: MenuItem[]; cart: CartItem[];
  onCustomize: (t: CustomizeTarget) => void; onRemove: (n: string) => void;
}) {
  const boxEmoji = ['📦', '🎁', '☕'];
  const boxGrad  = [
    'linear-gradient(135deg,#1C0800,#4A1C08)',
    'linear-gradient(135deg,#0E1C1A,#1A3D38)',
    'linear-gradient(135deg,#111,#333)',
  ];
  return (
    <div className="flex flex-col gap-3 mx-4">
      {items.map((item, i) => {
        const qty   = cart.find(c => c.name === item.name)?.qty ?? 0;
        const price = item.price!;
        return (
          <motion.div key={i}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-[22px] overflow-hidden"
            style={{ border: '1px solid #EBEBEB', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            {/* Header */}
            <div className="h-[72px] flex items-center justify-between px-5"
              style={{ background: boxGrad[i] }}>
              <div>
                <p className="text-white text-[16px] font-black">{item.name}</p>
                <p className="text-white/50 text-[10px] mt-0.5">للهدايا والمناسبات</p>
              </div>
              <span className="text-[36px]">{boxEmoji[i]}</span>
            </div>
            {/* Body */}
            <div className="px-4 py-3.5">
              <p className="text-[11px] text-[#888] leading-relaxed mb-3">{item.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-[22px] font-black text-[#111] tabular-nums">
                  {price}<span className="text-[11px] font-normal text-[#BBB] mr-0.5">ر</span>
                </span>
                {qty > 0 ? (
                  <div className="flex items-center gap-3">
                    <motion.button whileTap={{ scale: 0.88 }} onClick={() => onRemove(item.name)}
                      className="w-9 h-9 rounded-full border-2 border-[#DDD] flex items-center justify-center text-[16px] font-bold text-[#111]">−</motion.button>
                    <motion.span key={qty} initial={{ scale: 1.2 }} animate={{ scale: 1 }}
                      className="text-[18px] font-black text-[#111]">{qty}</motion.span>
                    <motion.button whileTap={{ scale: 0.88 }}
                      onClick={() => onCustomize({ name: item.name, basePrice: price, emoji: boxEmoji[i], catId: 'boxes' })}
                      className="w-9 h-9 rounded-full bg-[#111] text-white flex items-center justify-center text-[18px] font-bold">+</motion.button>
                  </div>
                ) : (
                  <motion.button whileTap={{ scale: 0.96 }}
                    onClick={() => onCustomize({ name: item.name, basePrice: price, emoji: boxEmoji[i], catId: 'boxes' })}
                    className="px-5 py-2.5 rounded-[13px] text-white text-[12px] font-bold flex items-center gap-2"
                    style={{ background: '#111' }}>
                    أضف +
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════ DRINK ROW ══ */
function DrinkRow({ item, catId, qty, onCustomize, onRemove, isLast }: {
  item: MenuItem; catId: string; qty: number; isLast: boolean;
  onCustomize: (t: CustomizeTarget) => void; onRemove: (n: string) => void;
}) {
  const price = item.price ?? item.priceHot ?? 0;
  const meta  = catMeta[catId] ?? { emoji: '☕', dot: '#111' };
  return (
    <div className="flex items-center gap-3 px-4 py-4"
      style={{ borderBottom: isLast ? 'none' : '1px solid #F5F3F1' }}>
      {/* Emoji circle */}
      <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-[18px] shrink-0"
        style={{ background: `${meta.dot}14` }}>{meta.emoji}</div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <p className="text-[13px] font-semibold text-[#111]">{item.name}</p>
          {item.badge && (
            <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full text-white"
              style={{ background: item.badgeColor ?? '#111' }}>{item.badge}</span>
          )}
        </div>
        {item.desc && <p className="text-[10px] text-[#BBB] mt-0.5 leading-snug">{item.desc}</p>}
        {item.origin && <p className="text-[9px] text-[#BBB] mt-0.5">{item.originFlag} {item.origin}</p>}
        {/* Price */}
        {item.priceHot !== undefined && item.priceCold !== undefined ? (
          <div className="flex gap-3 mt-1.5">
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-[#111]">
              <Flame size={8} className="text-[#FF6B35]" />{item.priceHot} ر
            </span>
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-[#111]">
              <Snowflake size={8} className="text-[#1EB4FF]" />{item.priceCold} ر
            </span>
          </div>
        ) : (
          <p className="text-[13px] font-black text-[#111] mt-1 tabular-nums">{price} <span className="text-[9px] font-normal text-[#CCC]">ر</span></p>
        )}
      </div>
      {/* Controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        {qty > 0 && (
          <>
            <motion.button whileTap={{ scale: 0.82 }} onClick={() => onRemove(item.name)}
              className="w-7 h-7 rounded-full border border-[#E0DDD9] flex items-center justify-center text-[14px] font-bold text-[#111]">−</motion.button>
            <motion.span key={qty} initial={{ scale: 1.25 }} animate={{ scale: 1 }}
              className="text-[13px] font-black text-[#111] w-4 text-center">{qty}</motion.span>
          </>
        )}
        <motion.button whileTap={{ scale: 0.82 }}
          onClick={() => onCustomize({ name: item.name, basePrice: price, emoji: meta.emoji, catId })}
          className="w-8 h-8 rounded-full text-white flex items-center justify-center font-black text-[18px]"
          style={{ background: qty > 0 ? meta.dot : '#111' }}>+</motion.button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ SECTION ══ */
function Section({ cat, index, cart, onRemove, onCustomize }: {
  cat: MenuCategory; index: number; cart: CartItem[];
  onAdd: (item: MenuItem) => void; onRemove: (name: string) => void;
  onCustomize: (target: CustomizeTarget) => void;
}) {
  const meta     = catMeta[cat.id] ?? { emoji: '☕', dot: '#111' };
  const featured = cat.items.filter(i => i.featured && i.img);
  const regular  = cat.items.filter(i => !(i.featured && i.img));
  const isSweets = cat.id === 'sweets';
  const isBoxes  = cat.id === 'boxes';

  return (
    <motion.div id={`cat-${cat.id}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay: index * 0.04 }}
      className="pt-7 pb-2">

      {/* Section header */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[11px] flex items-center justify-center text-[18px]"
              style={{ background: `${meta.dot}14` }}>{meta.emoji}</div>
            <div>
              <p className="text-[8px] font-black tracking-[0.25em] uppercase mb-0.5" style={{ color: meta.dot }}>{cat.nameEn}</p>
              <h2 className="text-[19px] font-black text-[#111] leading-none">{cat.name}</h2>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${meta.dot}12`, color: meta.dot }}>{cat.items.length} صنف</span>
            {cat.note && <span className="text-[8px] text-[#BBB] text-right">{cat.note}</span>}
          </div>
        </div>
        {/* Accent stripe */}
        <div className="mt-3 h-0.5 rounded-full w-full"
          style={{ background: `linear-gradient(to left, transparent, ${meta.dot}30, transparent)` }} />
      </div>

      {/* Featured photo cards */}
      {featured.length > 0 && featured.map((item, i) => (
        <FeaturedCard key={i} item={item} catId={cat.id}
          qty={cart.find(c => c.name === item.name)?.qty ?? 0}
          onCustomize={onCustomize} onRemove={onRemove} />
      ))}

      {/* Regular items — sweets grid, boxes cards, else list */}
      {regular.length > 0 && (
        isSweets ? (
          <SweetsGrid items={regular} cart={cart} onCustomize={onCustomize} onRemove={onRemove} />
        ) : isBoxes ? (
          <BoxCards items={regular} cart={cart} onCustomize={onCustomize} onRemove={onRemove} />
        ) : (
          <div className="mx-4 bg-white rounded-[20px] overflow-hidden"
            style={{ border: '1px solid #EBEBEB', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
            {regular.map((item, i) => (
              <DrinkRow key={i} item={item} catId={cat.id}
                qty={cart.find(c => c.name === item.name)?.qty ?? 0}
                onCustomize={onCustomize} onRemove={onRemove}
                isLast={i === regular.length - 1} />
            ))}
          </div>
        )
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════ SEARCH RESULTS ══ */
function SearchResults({ results, query, onClear, cart, onCustomize }: {
  results: { cat: MenuCategory; item: MenuItem }[];
  query: string;
  onClear: () => void;
  cart: CartItem[];
  onCustomize: (t: CustomizeTarget) => void;
}) {
  if (results.length === 0) return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-8">
      <p className="text-[44px] mb-3">☕</p>
      <p className="text-[14px] font-bold text-[#888]">لا نتائج لـ «{query}»</p>
      <button onClick={onClear} className="mt-4 text-[11px] font-bold text-[#111] underline underline-offset-2">تصفح الكل</button>
    </div>
  );
  return (
    <div className="px-4 pt-4">
      <p className="text-[10px] text-[#AAA] mb-3">
        {results.length} نتيجة لـ <span className="font-bold text-[#111]">«{query}»</span>
      </p>
      <div className="bg-white rounded-[20px] overflow-hidden" style={{ border: '1px solid #EBEBEB' }}>
        {results.map(({ cat, item }, i) => {
          const meta  = catMeta[cat.id] ?? { emoji: '☕', dot: '#111' };
          const price = item.price ?? item.priceHot ?? 0;
          const qty   = cart.find(c => c.name === item.name)?.qty ?? 0;
          return (
            <div key={i} className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: i < results.length - 1 ? '1px solid #F5F3F1' : 'none' }}>
              <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-[16px] shrink-0"
                style={{ background: `${meta.dot}14` }}>{meta.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#111]">{item.name}</p>
                <p className="text-[9px] text-[#BBB]">{cat.name} · {price} ر</p>
              </div>
              <motion.button whileTap={{ scale: 0.82 }}
                onClick={() => onCustomize({ name: item.name, basePrice: price, emoji: meta.emoji, catId: cat.id })}
                className="w-8 h-8 rounded-full text-white flex items-center justify-center font-black text-[18px] shrink-0"
                style={{ background: qty > 0 ? meta.dot : '#111' }}>
                {qty > 0 ? qty : '+'}
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ MAIN ══ */
export function ScreenMenu() {
  const { brand } = useBrand();
  const { addOrder } = useOrders();
  const [activeId,       setActiveId]       = useState<string | null>(null);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [searchFocused,  setSearchFocused]  = useState(false);
  const [cart,           setCart]           = useState<CartItem[]>([]);
  const [customizeTarget,setCustomizeTarget]= useState<CustomizeTarget | null>(null);
  const [showCheckout,   setShowCheckout]   = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const totalItems = menu.reduce((a, c) => a + c.items.length, 0);

  function addToCart(item: CheckoutItem) {
    const price = Number(item.price) || 0;
    setCart(prev => {
      const ex = prev.find(c => c.name === item.name);
      if (ex) return prev.map(c => c.name === item.name ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { name: item.name, price, qty: 1 }];
    });
  }
  function removeFromCart(name: string) {
    setCart(prev => {
      const ex = prev.find(c => c.name === name);
      if (!ex) return prev;
      if (ex.qty <= 1) return prev.filter(c => c.name !== name);
      return prev.map(c => c.name === name ? { ...c, qty: c.qty - 1 } : c);
    });
  }

  const checkoutItem: CheckoutItem | null = showCheckout && cart.length > 0
    ? { name: cart.map(c => `${c.qty > 1 ? c.qty + '× ' : ''}${c.name}`).join('، '), price: String(cartTotal), emoji: '☕' }
    : null;

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.trim().toLowerCase();
    const out: { cat: MenuCategory; item: MenuItem }[] = [];
    menu.forEach(cat => cat.items.forEach(item => {
      if (item.name.includes(q) || item.desc?.includes(q) || cat.name.includes(q))
        out.push({ cat, item });
    }));
    return out;
  }, [searchQuery]);

  const displayed = activeId ? menu.filter(c => c.id === activeId) : menu;

  const handleCat = (id: string | null) => {
    setActiveId(id);
    setSearchQuery('');
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const TABS = [
    { id: null,      label: 'الكل',              emoji: '✦' },
    { id: 'hot',     label: 'الحارة',             emoji: '☕' },
    { id: 'cold',    label: 'الباردة',             emoji: '🧊' },
    { id: 'filter',  label: 'قهوة مقطرة',         emoji: '🫗' },
    { id: 'sweets',  label: 'الحلويات',            emoji: '🍰' },
    { id: 'boxes',   label: 'بوكسات',             emoji: '📦' },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden relative" style={{ background: '#F8F7F5' }}>

      {/* ── Checkout modal ── */}
      <AnimatePresence>
        {showCheckout && checkoutItem && (
          <div className="absolute inset-0 z-50">
            <CheckoutModal item={checkoutItem} brandName={brand.name} brandType={brand.type} logoImg={brand.logoImg}
              onClose={() => setShowCheckout(false)}
              onOrderComplete={(data: CompletedOrderData) => {
                addOrder({ itemName: data.itemName, itemEmoji: data.itemEmoji, totalPrice: data.totalPrice, basePrice: data.basePrice, orderType: data.orderType, payMethod: data.payMethod, pts: data.pts, timestamp: data.timestamp });
                setCart([]); setShowCheckout(false);
              }} />
          </div>
        )}
      </AnimatePresence>

      {/* ── Customize sheet ── */}
      <AnimatePresence>
        {customizeTarget && (
          <CustomizeSheet target={customizeTarget}
            onConfirm={(item) => { addToCart(item); setCustomizeTarget(null); }}
            onClose={() => setCustomizeTarget(null)} />
        )}
      </AnimatePresence>

      {/* ══ HEADER ══ */}
      <div className="shrink-0 bg-white" style={{ borderBottom: '1px solid #EBEBEB' }}>
        <div className="flex items-center gap-3 px-4 pt-5 pb-3">
          <img src={brand.logoImg} alt={brand.name}
            className="w-11 h-11 rounded-[13px] object-cover shrink-0"
            style={{ border: '1px solid #EBEBEB' }} />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-[#BBB] font-medium">قهوة مختصة · جيزان</p>
            <h1 className="text-[20px] font-black text-[#111] leading-tight">قائمتنا</h1>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
            style={{ background: '#F0FBF3', border: '1px solid #C8EDD2' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[9px] font-bold text-[#16A34A]">مفتوح الآن</span>
          </div>
        </div>
        {/* Search */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[14px]"
            style={{ background: '#F5F4F2', border: searchFocused ? '1.5px solid #111' : '1.5px solid transparent' }}>
            <Search size={14} className="text-[#BBB] shrink-0" />
            <input ref={searchRef} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
              placeholder="ابحث في القائمة…" dir="rtl"
              className="flex-1 bg-transparent text-[12px] text-[#111] outline-none placeholder:text-[#BBB]" />
            {searchQuery
              ? <button onClick={() => { setSearchQuery(''); searchRef.current?.blur(); }}><X size={13} className="text-[#999]" /></button>
              : <span className="text-[9px] text-[#CCC] shrink-0">{totalItems} صنف</span>
            }
          </div>
        </div>
      </div>

      {/* ══ TABS ══ */}
      <div className="shrink-0 bg-white" style={{ borderBottom: '1px solid #EBEBEB' }}>
        <div className="flex gap-2 overflow-x-auto scrollbar-none px-4 py-2.5">
          {TABS.map(tab => {
            const active = tab.id === null ? activeId === null : activeId === tab.id;
            const dot    = tab.id ? catMeta[tab.id]?.dot : '#111';
            return (
              <motion.button key={tab.id ?? 'all'} whileTap={{ scale: 0.92 }}
                onClick={() => handleCat(tab.id)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all"
                style={active
                  ? { background: dot ?? '#111', color: '#fff', boxShadow: `0 3px 10px ${dot}40` }
                  : { background: 'transparent', color: '#888', border: '1px solid #E8E5E1' }}>
                <span className="text-[11px]">{tab.emoji}</span>
                {tab.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-none pb-36">
        <AnimatePresence mode="wait" initial={false}>
          {searchQuery && searchResults !== null ? (
            <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SearchResults results={searchResults} query={searchQuery} onClear={() => setSearchQuery('')}
                cart={cart} onCustomize={setCustomizeTarget} />
            </motion.div>
          ) : (
            <motion.div key={activeId ?? 'all'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {activeId === null && (
                <BestsellersRail cart={cart} onCustomize={setCustomizeTarget} />
              )}
              {displayed.map((cat, i) => (
                <Section key={cat.id} cat={cat} index={i} cart={cart}
                  onAdd={(item) => addToCart({ name: item.name, price: String(item.price ?? item.priceHot ?? 0), emoji: '☕' })}
                  onRemove={removeFromCart} onCustomize={setCustomizeTarget} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <p className="text-center text-[8px] text-[#DDD] px-8 pb-4 pt-2">
          يحتاج البالغون تقريباً ألفي سعرة حرارية يومياً
        </p>
      </div>

      {/* ══ CART BAR ══ */}
      <AnimatePresence>
        {cartCount > 0 && <CartBar cart={cart} onCheckout={() => setShowCheckout(true)} />}
      </AnimatePresence>
    </div>
  );
}
