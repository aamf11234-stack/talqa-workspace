import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Flame, Snowflake, Check, ChevronLeft } from 'lucide-react';
import { CategoryIconMap, IOriginPin, IVase, ILeaf, ICoffeeBean, IEspresso } from './HaizIcons';
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
  liveLabel?: boolean;
  note?: string;
  allergyNote?: boolean;
  items: MenuItem[];
}

const menu: MenuCategory[] = [
  {
    id: 'hot', name: 'المشروبات الحارة', nameEn: 'HOT DRINKS', color: '#A0522D',
    items: [
      { name: 'قهوة اليوم',      desc: 'بلند يومي مختار بعناية', price: 9,  badge: 'اليوم', badgeColor: '#A0522D', liveLabel: true } as any,
      { name: 'اسبريسو',                                           price: 10 },
      { name: 'امريكانو',                                          price: 12 },
      { name: 'ميكاتو',                                            price: 12 },
      { name: 'بلاك كوفي',                                         price: 12 },
      { name: 'كورنادو',                                           price: 14 },
      { name: 'فلات وايت',                                         price: 16 },
      { name: 'كابتشينو',                                          price: 16 },
      { name: 'لاتيه',                                             price: 17, featured: true, img: `${import.meta.env.BASE_URL}bd-affogato.jpg` },
      { name: 'اسبانيش لاتيه',                                     price: 17 },
      { name: 'بستاشيو لاتيه',                                     price: 20 },
      { name: 'كراميل لاتيه',                                      price: 20 },
      { name: 'ماتشا لاتيه',                                       price: 20 },
    ],
  },
  {
    id: 'cold', name: 'المشروبات الباردة', nameEn: 'COLD DRINKS', color: '#3D7A6A',
    items: [
      { name: 'قهوة اليوم بارده صغير',  price: 9  },
      { name: 'قهوة اليوم بارده كبير',  price: 10 },
      { name: 'ايس امريكانو',           price: 15 },
      { name: 'موهيتو روز يري',         price: 17, badge: 'الأشهر', badgeColor: '#3D7A6A', featured: true, img: `${import.meta.env.BASE_URL}bd-mohito.jpg` },
      { name: 'موهيتو يريز ليمون',      price: 17 },
      { name: 'موهيتو بلو اوشن',        price: 17 },
      { name: 'موهيتو مكس',             price: 17 },
      { name: 'موهيتو باشن فروت',       price: 18 },
      { name: 'كركديه',                 price: 18 },
      { name: 'ايس لاتيه',              price: 18 },
      { name: 'ايس ستفتشر براون',       desc: 'التوقيع الخاص بنا', price: 19, badge: 'براون', badgeColor: '#3D7A6A', featured: true, img: `${import.meta.env.BASE_URL}bd-ice-stretcher.jpg` },
      { name: 'اسبانيش لاتيه بارد',     price: 19 },
      { name: 'ايس كراميل',             price: 20 },
      { name: 'بستاشيو لاتيه بارد',     price: 20 },
      { name: 'اسبرسو خوذ',             price: 20 },
      { name: 'ايس يري',                price: 19 },
      { name: 'ماتشا',                  price: 20 },
      { name: 'افقاتو براون',           desc: 'إسبريسو فوق الآيس كريم', price: 25, badge: 'الأحلى', badgeColor: '#A0522D', featured: true, img: `${import.meta.env.BASE_URL}bd-affogato.jpg` },
    ],
  },
  {
    id: 'filter', name: 'قهوة مقطرة', nameEn: 'POUR OVER', color: '#7A3B28',
    note: 'تُحضَّر بالطلب · ١٠-١٥ دقيقة',
    items: [
      { name: 'أثيوبي هنيبلا',     origin: 'إثيوبيا', originFlag: '🇪🇹', priceHot: 17, priceCold: 17, featured: true, img: `${import.meta.env.BASE_URL}bd-filter.jpg` },
      { name: 'أثيوبي اوراقا فاخر', origin: 'إثيوبيا', originFlag: '🇪🇹', priceHot: 18, priceCold: 18, badge: 'فاخر', badgeColor: '#7A3B28' },
      { name: 'أثيوبي شلشلي فاخر', origin: 'إثيوبيا', originFlag: '🇪🇹', priceHot: 20, priceCold: 20, badge: 'فاخر', badgeColor: '#7A3B28' },
      { name: 'كولومبي الندو فاخر', origin: 'كولومبيا', originFlag: '🇨🇴', priceHot: 17, priceCold: 18, badge: 'فاخر', badgeColor: '#7A3B28' },
      { name: 'بن يمني',           origin: 'اليمن',    originFlag: '🇾🇪', price: 19 },
    ],
  },
];

/* ══════════════════════════════════════════ PRICE ══ */
function Price({ item }: { item: MenuItem }) {
  if (item.priceHot !== undefined && item.priceCold !== undefined) {
    return (
      <div className="flex flex-col items-end gap-1 shrink-0">
        <div className="flex items-center gap-1">
          <Flame size={8} className="text-[#FF6B35] shrink-0" />
          <span className="text-[13px] font-black font-inter tabular-nums text-[#111]">{item.priceHot}</span>
          <span className="text-[9px] text-[#BBA890]">ر</span>
        </div>
        <div className="flex items-center gap-1">
          <Snowflake size={8} className="text-[#1EB4FF] shrink-0" />
          <span className="text-[13px] font-black font-inter tabular-nums text-[#111]">{item.priceCold}</span>
          <span className="text-[9px] text-[#BBA890]">ر</span>
        </div>
      </div>
    );
  }
  return (
    <div className="shrink-0 text-left">
      <span className="text-[15px] font-black font-inter tabular-nums" style={{ color: '#A0522D' }}>{item.price}</span>
      <span className="text-[9px] text-[#BBA890] mr-0.5">ر</span>
    </div>
  );
}

/* ══════════════════════════════════════════ CUSTOMIZE SHEET ══ */
interface CustomizeTarget { name: string; basePrice: number; emoji: string; catColor: string }

const sizes    = [{ id:'sm', label:'صغير', diff:0 }, { id:'lg', label:'كبير', diff:3 }];
const sweets   = [{ id:'none', label:'بدون حلاوة' }, { id:'light', label:'خفيف' }, { id:'med', label:'عادي' }, { id:'sweet', label:'حلو' }];
const milkOpts = [{ id:'full', label:'حليب كامل' }, { id:'skim', label:'خالي دسم' }, { id:'oat', label:'شوفان 🌱' }];

function CustomizeSheet({ target, onConfirm, onClose }: {
  target: CustomizeTarget;
  onConfirm: (item: CheckoutItem) => void;
  onClose: () => void;
}) {
  const [size,  setSize]  = useState('sm');
  const [sweet, setSweet] = useState('med');
  const [milk,  setMilk]  = useState('full');
  const total = target.basePrice + (sizes.find(s => s.id === size)?.diff ?? 0);

  function confirm() {
    const sizeLabel  = sizes.find(s => s.id === size)?.label ?? '';
    const sweetLabel = sweets.find(s => s.id === sweet)?.label ?? '';
    const milkLabel  = milkOpts.find(m => m.id === milk)?.label ?? '';
    onConfirm({
      name: `${target.name} (${sizeLabel} · ${sweetLabel} · ${milkLabel})`,
      price: String(total),
      emoji: target.emoji,
    });
    onClose();
  }

  return (
    <>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40" />
      <motion.div
        initial={{ y:'100%' }} animate={{ y:0 }} exit={{ y:'100%' }}
        transition={{ type:'spring', damping:32, stiffness:340 }}
        className="absolute inset-x-0 bottom-0 z-50 rounded-t-[28px] overflow-hidden"
        style={{ background:'#FDFBF7' }}
      >
        <div className="w-10 h-1 bg-[#D8CFC4] rounded-full mx-auto mt-3 mb-4" />
        {/* Item title */}
        <div className="px-5 mb-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-[14px] flex items-center justify-center text-2xl shrink-0"
            style={{ background:`${target.catColor}12` }}>{target.emoji}</div>
          <div>
            <p className="text-[15px] font-bold text-[#111]">{target.name}</p>
            <p className="text-[11px] text-[#C4783A] font-bold font-inter">{target.basePrice} ر</p>
          </div>
        </div>

        {/* Size */}
        <div className="px-5 mb-4">
          <p className="text-[10px] font-black text-[#888] tracking-widest mb-2">الحجم</p>
          <div className="flex gap-2">
            {sizes.map(s => (
              <motion.button key={s.id} whileTap={{ scale:0.93 }} onClick={() => setSize(s.id)}
                className="flex-1 py-2.5 rounded-[14px] text-[12px] font-bold flex flex-col items-center gap-0.5 transition-all"
                style={{
                  background: size===s.id ? target.catColor : 'rgba(196,181,159,0.12)',
                  color: size===s.id ? '#fff' : '#666',
                  border: size===s.id ? `1.5px solid ${target.catColor}` : '1.5px solid transparent',
                }}>
                {s.label}
                {s.diff > 0 && <span className="text-[9px] opacity-70">+{s.diff} ر</span>}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sweetness */}
        <div className="px-5 mb-4">
          <p className="text-[10px] font-black text-[#888] tracking-widest mb-2">الحلاوة</p>
          <div className="flex gap-1.5">
            {sweets.map(s => (
              <motion.button key={s.id} whileTap={{ scale:0.93 }} onClick={() => setSweet(s.id)}
                className="flex-1 py-2 rounded-[12px] text-[10px] font-semibold transition-all"
                style={{
                  background: sweet===s.id ? `${target.catColor}18` : 'rgba(196,181,159,0.1)',
                  color: sweet===s.id ? target.catColor : '#888',
                  border: sweet===s.id ? `1px solid ${target.catColor}40` : '1px solid transparent',
                }}>
                {s.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Milk */}
        <div className="px-5 mb-5">
          <p className="text-[10px] font-black text-[#888] tracking-widest mb-2">نوع الحليب</p>
          <div className="flex gap-2">
            {milkOpts.map(m => (
              <motion.button key={m.id} whileTap={{ scale:0.93 }} onClick={() => setMilk(m.id)}
                className="flex-1 py-2.5 rounded-[14px] text-[11px] font-semibold transition-all"
                style={{
                  background: milk===m.id ? `${target.catColor}18` : 'rgba(196,181,159,0.1)',
                  color: milk===m.id ? target.catColor : '#777',
                  border: milk===m.id ? `1px solid ${target.catColor}35` : '1px solid transparent',
                }}>
                {m.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Confirm */}
        <div className="px-5 pb-8">
          <motion.button whileTap={{ scale:0.97 }} onClick={confirm}
            className="w-full py-4 rounded-[18px] font-bold text-[15px] text-white flex items-center justify-center gap-2"
            style={{ background:`linear-gradient(135deg,${target.catColor},#6B3A1F)`, boxShadow:`0 6px 20px ${target.catColor}45` }}>
            <Check size={16} strokeWidth={2.5} />
            أضف للسلة — {total} ريال
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

/* ══════════════════════════════════════════ CART TYPES ══ */
interface CartItem { name: string; price: number; qty: number; catColor: string; }

/* ══════════════════════════════════════════ CART BAR ══ */
function CartBar({ cart, onCheckout }: { cart: CartItem[]; onCheckout: () => void }) {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 340 }}
      className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-6"
      style={{ pointerEvents: 'none' }}
    >
      <motion.button whileTap={{ scale: 0.97 }} onClick={onCheckout}
        className="w-full rounded-[22px] overflow-hidden flex items-center"
        style={{
          background: '#1A1310',
          boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
          pointerEvents: 'auto',
        }}>
        {/* Count badge */}
        <div className="px-4 py-4 flex items-center gap-2 border-l border-white/10">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black"
            style={{ background: '#A0522D', color: '#fff' }}>{count}</div>
          <span className="text-white/50 text-[10px]">صنف</span>
        </div>
        {/* Label */}
        <div className="flex-1 text-center">
          <span className="text-white text-[14px] font-black tracking-wide">اطلب الآن</span>
        </div>
        {/* Price */}
        <div className="px-4 py-4 border-r border-white/10">
          <span className="text-[14px] font-black" style={{ color: '#C9956A' }}>{total}</span>
          <span className="text-white/40 text-[10px] mr-0.5">ر</span>
        </div>
      </motion.button>
    </motion.div>
  );
}

/* ══════════════════════════════════════════ FEATURED CARD ══ */
function FeaturedCard({ item, cat, qty, onCustomize, onRemove }: {
  item: MenuItem; cat: MenuCategory; qty: number;
  onCustomize: (t: CustomizeTarget) => void; onRemove: (n: string) => void;
}) {
  const price = item.price ?? item.priceHot ?? 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-3 rounded-[20px] overflow-hidden"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
      {/* Photo */}
      <div className="relative h-[155px]">
        <img src={item.img!} alt={item.name} className="w-full h-full object-cover" />
        {/* Top badge */}
        {item.badge && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-black text-white"
            style={{ background: item.badgeColor ?? cat.color, backdropFilter: 'blur(8px)' }}>
            {item.badge}
          </div>
        )}
        {/* Origin */}
        {item.origin && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}>
            <span className="text-[9px] text-white font-medium">{item.originFlag} {item.origin}</span>
          </div>
        )}
      </div>
      {/* Info row */}
      <div className="bg-white px-4 py-3.5 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-black text-[#1A1310] leading-snug">{item.name}</p>
          {item.desc && <p className="text-[10px] text-[#B0A598] mt-0.5 leading-snug">{item.desc}</p>}
          <p className="text-[15px] font-black mt-1.5" style={{ color: cat.color }}>
            {price} <span className="text-[10px] font-normal text-[#C4B5A8]">ر</span>
          </p>
        </div>
        {/* ± control */}
        <div className="flex items-center gap-2 shrink-0">
          {qty > 0 && (
            <>
              <motion.button whileTap={{ scale: 0.85 }} onClick={() => onRemove(item.name)}
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[16px]"
                style={{ background: `${cat.color}15`, color: cat.color }}>−</motion.button>
              <span className="text-[14px] font-black w-5 text-center" style={{ color: cat.color }}>{qty}</span>
            </>
          )}
          <motion.button whileTap={{ scale: 0.85 }}
            onClick={() => onCustomize({ name: item.name, basePrice: price, emoji: '☕', catColor: cat.color })}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-[20px]"
            style={{ background: cat.color, boxShadow: `0 4px 14px ${cat.color}55` }}>+</motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════ SECTION ══ */
function Section({ cat, index, cart = [], onAdd, onRemove, onCustomize }: {
  cat: MenuCategory;
  index: number;
  cart?: CartItem[];
  onAdd: (item: MenuItem) => void;
  onRemove: (name: string) => void;
  onCustomize: (target: CustomizeTarget) => void;
}) {
  const featured = cat.items.filter(i => i.featured && i.img);
  const regular  = cat.items.filter(i => !(i.featured && i.img));

  return (
    <motion.div id={`cat-${cat.id}`}
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.32 }}
      className="pt-6 pb-2">

      {/* ── Section header ── */}
      <div className="px-4 mb-4 flex items-end justify-between">
        <div>
          <p className="text-[8px] font-black tracking-[0.28em] mb-1.5"
            style={{ color: cat.color, fontFamily: 'ui-monospace,monospace' }}>{cat.nameEn}</p>
          <h2 className="text-[22px] font-black text-[#1A1310] leading-none tracking-tight">{cat.name}</h2>
        </div>
        <div className="flex flex-col items-end gap-1 pb-0.5">
          {cat.note && (
            <p className="text-[8px] text-[#C4B5A8] text-left leading-snug max-w-[90px]">{cat.note}</p>
          )}
          <span className="text-[10px]" style={{ color: `${cat.color}70` }}>{cat.items.length} صنف</span>
        </div>
      </div>

      {/* ── Featured cards with photo ── */}
      {featured.map((item, i) => (
        <FeaturedCard
          key={i} item={item} cat={cat}
          qty={cart.find(c => c.name === item.name)?.qty ?? 0}
          onCustomize={onCustomize} onRemove={onRemove}
        />
      ))}

      {/* ── Regular items list ── */}
      {regular.length > 0 && (
        <div className="mx-4 rounded-[18px] overflow-hidden"
          style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.04)' }}>
          {regular.map((item, i) => {
            const inCart = cart.find(c => c.name === item.name);
            const qty = inCart?.qty ?? 0;
            const priceVal = item.price ?? item.priceHot ?? 0;
            const isLast = i === regular.length - 1;
            return (
              <div key={i} className="flex items-center gap-3 px-4 py-4"
                style={{ borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.05)' }}>
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="text-[13.5px] font-semibold text-[#1A1310] leading-snug">{item.name}</p>
                    {item.badge && (
                      <span className="text-[7px] font-black text-white px-1.5 py-[2px] rounded-full"
                        style={{ background: item.badgeColor ?? cat.color }}>{item.badge}</span>
                    )}
                  </div>
                  {item.desc && (
                    <p className="text-[10px] text-[#B0A598] mt-0.5 leading-snug">{item.desc}</p>
                  )}
                  {item.origin && (
                    <p className="text-[9px] mt-0.5 font-medium" style={{ color: `${cat.color}80` }}>
                      {item.originFlag} {item.origin}
                    </p>
                  )}
                  <div className="mt-1.5 flex items-baseline gap-0.5">
                    {item.priceHot !== undefined && item.priceCold !== undefined ? (
                      <>
                        <span className="text-[13px] font-black" style={{ color: cat.color }}>{item.priceHot}</span>
                        <span className="text-[9px] text-[#C4B5A8]">ر</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[13px] font-black" style={{ color: cat.color }}>{item.price}</span>
                        <span className="text-[9px] text-[#C4B5A8]">ر</span>
                      </>
                    )}
                  </div>
                </div>

                {/* ± control */}
                <div className="shrink-0 flex items-center gap-1.5">
                  {qty > 0 && (
                    <>
                      <motion.button whileTap={{ scale: 0.82 }} onClick={() => onRemove(item.name)}
                        className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[16px] leading-none"
                        style={{ background: `${cat.color}15`, color: cat.color }}>−</motion.button>
                      <span className="text-[13px] font-black w-4 text-center" style={{ color: cat.color }}>{qty}</span>
                    </>
                  )}
                  <motion.button whileTap={{ scale: 0.82 }}
                    onClick={() => onCustomize({ name: item.name, basePrice: priceVal, emoji: '☕', catColor: cat.color })}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-[18px] leading-none"
                    style={{ background: cat.color, boxShadow: `0 3px 12px ${cat.color}45` }}>+</motion.button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════ SHELF ══ */
const shelfItems = [
  {
    IconComp: IVase,
    title: 'أكواب الفخار',
    desc: 'مصنوع ومرسوم يدوياً — نسخة لك فقط، اسمك على الرف',
    tag: 'حصري',
    color: '#C9956A',
  },
  {
    IconComp: ILeaf,
    title: 'هدايا المطعم',
    desc: 'حوض فخار بهوية مطعمك مع نبتة البوتس — هدية تذكارية مثالية',
    tag: 'هدية',
    color: '#2D7D46',
  },
  {
    IconComp: ICoffeeBean,
    title: 'محاصيل الرف',
    desc: 'اقتنِ محاصيلنا المميزة من الرف الحصري وجرّبها بنفسك',
    tag: 'محدود',
    color: '#C4783A',
  },
];

function Shelf() {
  return (
    <div className="mx-4 mt-5 mb-2">
      {/* Section label */}
      <div className="flex items-end justify-between mb-3 px-1">
        <div>
          <p className="text-[8px] font-black tracking-[0.28em] text-[#C9956A] mb-1"
            style={{ fontFamily: 'ui-monospace, monospace' }}>SHELF EXCLUSIVES</p>
          <div className="flex items-center gap-2 mt-0.5">
            <IVase size={20} color="#C9956A" sw={1.4} />
            <h2 className="text-[19px] font-black text-[#111] leading-none tracking-tight">مبيعات الرف</h2>
          </div>
        </div>
        <span className="text-[9px] text-[#C4B5A8] pb-0.5">اسأل الفريق ✦</span>
      </div>

      {/* Cards row */}
      <div className="flex flex-col gap-2.5">
        {shelfItems.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.07, duration: 0.3 }}
            className="relative overflow-hidden rounded-[18px] flex items-center gap-3 px-4 py-3.5"
            style={{
              background: `linear-gradient(135deg, ${s.color}14 0%, ${s.color}07 100%)`,
              border: `1px solid ${s.color}25`,
              boxShadow: `0 2px 16px ${s.color}10`,
            }}
          >
            {/* Glow blob */}
            <div className="absolute top-0 right-0 w-16 h-16 rounded-full pointer-events-none"
              style={{ background: `${s.color}15`, filter: 'blur(20px)', transform: 'translate(30%,-30%)' }} />

            {/* Icon */}
            <div className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0"
              style={{ background: `${s.color}18`, border: `1px solid ${s.color}28` }}>
              <s.IconComp size={22} color={s.color} sw={1.4} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-black text-[#111] leading-snug">{s.title}</p>
              <p className="text-[10px] text-[#AAA] font-light leading-snug mt-0.5">{s.desc}</p>
            </div>

            {/* Tag */}
            <span className="text-[7.5px] font-black shrink-0 px-2 py-1 rounded-full"
              style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}30` }}>
              {s.tag}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Divider before menu */}
      <div className="flex items-center gap-3 mt-6 mb-1 px-1">
        <div className="flex-1 h-px" style={{ background: 'rgba(196,181,159,0.3)' }} />
        <p className="text-[8px] font-black tracking-[0.22em] text-[#C4B5A8]"
          style={{ fontFamily: 'ui-monospace, monospace' }}>MENU</p>
        <div className="flex-1 h-px" style={{ background: 'rgba(196,181,159,0.3)' }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ SEARCH RESULTS ══ */
function SearchResults({ results, query, onClear }: {
  results: { cat: MenuCategory; item: MenuItem }[];
  query: string;
  onClear: () => void;
}) {
  if (results.length === 0) return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <div className="mb-4 opacity-30"><IEspresso size={52} color="#C4783A" sw={1.2} /></div>
      <p className="text-[14px] font-bold text-[#888]">لا نتائج لـ "{query}"</p>
      <p className="text-[11px] text-[#CCC] mt-1.5">جرّب اسماً آخر</p>
      <button onClick={onClear} className="mt-4 text-[11px] font-bold" style={{ color: '#C4783A' }}>تصفح الكل</button>
    </div>
  );

  return (
    <div className="px-5 pt-3">
      <p className="text-[10px] text-[#AAA] mb-4">
        {results.length} نتيجة لـ "<span className="font-bold" style={{ color: '#C4783A' }}>{query}</span>"
      </p>
      {results.map(({ cat, item }, i) => (
        <div key={i} className="flex items-start gap-3 py-3.5"
          style={{ borderBottom: i < results.length - 1 ? '1px solid rgba(196,181,159,0.18)' : 'none' }}>
          <div className="w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: `${cat.color}12` }}>
            {(() => { const I = CategoryIconMap[cat.id]; return I ? <I size={15} color={cat.color} sw={1.4} /> : null; })()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <p className="text-[13px] font-bold text-[#111]">{item.name}</p>
              {item.badge && (
                <span className="text-[7px] font-black text-white px-1.5 py-[2px] rounded-full"
                  style={{ background: item.badgeColor ?? cat.color }}>{item.badge}</span>
              )}
            </div>
            <p className="text-[9px] font-semibold" style={{ color: cat.color }}>{cat.name}</p>
            {item.desc && <p className="text-[10px] text-[#AAA] mt-0.5">{item.desc}</p>}
          </div>
          <Price item={item} />
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════ MAIN ══ */
export function ScreenMenu() {
  const { brand } = useBrand();
  const { addOrder } = useOrders();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customizeTarget, setCustomizeTarget] = useState<CustomizeTarget | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);

  function addToCart(item: CheckoutItem) {
    const price = Number(item.price) || 0;
    setCart(prev => {
      const ex = prev.find(c => c.name === item.name);
      if (ex) return prev.map(c => c.name === item.name ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { name: item.name, price, qty: 1, catColor: '#A0522D' }];
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
      if (item.name.includes(q) || (item.desc && item.desc.includes(q)) || cat.name.includes(q) || (item.origin && item.origin.includes(q)))
        out.push({ cat, item });
    }));
    return out;
  }, [searchQuery]);

  const displayed = activeId ? menu.filter(c => c.id === activeId) : menu;
  const totalItems = menu.reduce((a, c) => a + c.items.length, 0);

  const handleCat = (id: string | null) => {
    setActiveId(id);
    setSearchQuery('');
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden relative" style={{ background: '#FAF7F3' }}>

      {/* ── Checkout modal ── */}
      <AnimatePresence>
        {showCheckout && checkoutItem && (
          <div className="absolute inset-0 z-50">
            <CheckoutModal
              item={checkoutItem}
              brandName={brand.name}
              brandType={brand.type}
              logoImg={brand.logoImg}
              onClose={() => setShowCheckout(false)}
              onOrderComplete={(data: CompletedOrderData) => {
                addOrder({ itemName: data.itemName, itemEmoji: data.itemEmoji, totalPrice: data.totalPrice, basePrice: data.basePrice, orderType: data.orderType, payMethod: data.payMethod, pts: data.pts, timestamp: data.timestamp });
                setCart([]);
                setShowCheckout(false);
              }}
            />
          </div>
        )}
      </AnimatePresence>

      {/* ── Customize sheet ── */}
      <AnimatePresence>
        {customizeTarget && (
          <CustomizeSheet
            target={customizeTarget}
            onConfirm={(item) => { addToCart(item); setCustomizeTarget(null); }}
            onClose={() => setCustomizeTarget(null)}
          />
        )}
      </AnimatePresence>

      {/* ══ HERO HEADER ══ */}
      <div className="shrink-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(170deg,#0E0905 0%,#1C0F09 45%,#261409 80%,#110A05 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 75%,rgba(201,149,106,0.16) 0%,transparent 65%)' }} />

        <div className="relative z-10 flex flex-col items-center pt-5 pb-4 px-5">
          {/* Logo */}
          <motion.div initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mb-3">
            {/* Live dot */}
            <div className="absolute -top-1 -left-1 z-10 w-3 h-3 rounded-full bg-[#30D158] border-2 border-[#110A05]" />
            <img src={brand.logoImg} alt={brand.name}
              className="w-20 h-28 object-contain"
              style={{ filter: 'invert(1) brightness(0.95)', dropShadow: '0 4px 20px rgba(0,0,0,0.6)' }} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
            className="text-center">
            <h1 className="text-[26px] font-black text-white leading-none tracking-tight">قائمتنا</h1>
            <p className="text-white/30 text-[9px] mt-1 font-light">{totalItems} صنف · مفتوح من ٦ص حتى ٦:٣٠م</p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-6 mt-3.5 pt-3.5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', width: '100%', justifyContent: 'center' }}>
            {menu.map((cat, i) => (
              <div key={i} className="text-center">
                <p className="text-white text-[15px] font-black font-inter leading-none">{cat.items.length}</p>
                <p className="text-white/30 text-[8px] mt-0.5">{cat.name}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Search */}
        <div className="relative z-10 px-4 pb-4">
          <motion.div animate={{ borderColor: searchFocused ? 'rgba(201,149,106,0.55)' : 'rgba(255,255,255,0.07)' }}
            style={{ display:'flex', alignItems:'center', gap:10, background: searchFocused ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.055)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'10px 14px' }}>
            <Search size={13} className="text-white/30 shrink-0" />
            <input ref={searchRef} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
              placeholder="ابحث في القائمة..." className="flex-1 bg-transparent text-white text-[12px] outline-none placeholder:text-white/20" dir="rtl" />
            {searchQuery
              ? <button onClick={() => { setSearchQuery(''); searchRef.current?.blur(); }}
                  className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0"><X size={9} className="text-white/60" /></button>
              : <span className="text-white/15 text-[8px] font-inter shrink-0">{totalItems} صنف</span>
            }
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-4 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #FAF7F3)' }} />
      </div>

      {/* ══ CATEGORY PILLS ══ */}
      <div className="shrink-0 bg-[#FAF7F3] border-b border-[rgba(196,181,159,0.2)]">
        <div className="flex gap-2 overflow-x-auto scrollbar-none px-4 py-2.5">
          <motion.button whileTap={{ scale:0.91 }} onClick={() => handleCat(null)}
            className="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black transition-all"
            style={activeId===null ? { background:'#1C0F09', color:'#C9956A', boxShadow:'0 3px 12px rgba(0,0,0,0.18)', border:'1px solid rgba(201,149,106,0.25)' } : { background:'rgba(196,181,159,0.13)', color:'#9A8E85' }}>
            الكل
          </motion.button>
          {menu.map(cat => (
            <motion.button key={cat.id} whileTap={{ scale:0.91 }} onClick={() => handleCat(cat.id)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black whitespace-nowrap transition-all"
              style={activeId===cat.id ? { background:cat.color, color:'#fff', boxShadow:`0 3px 12px ${cat.color}45` } : { background:'rgba(196,181,159,0.12)', color:'#888' }}>
              {(() => { const I = CategoryIconMap[cat.id]; return I ? <I size={12} color={activeId===cat.id ? '#fff' : '#888'} sw={1.5} /> : null; })()}
              {cat.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-none pb-32">
        <AnimatePresence mode="wait" initial={false}>
          {searchQuery && searchResults !== null ? (
            <motion.div key="search" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
              <SearchResults results={searchResults} query={searchQuery} onClear={() => setSearchQuery('')} />
            </motion.div>
          ) : (
            <motion.div key={activeId ?? 'all'} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
              {activeId === null && <Shelf />}
              {displayed.map((cat, i) => (
                <Section
                  key={cat.id} cat={cat} index={i} cart={cart}
                  onAdd={(item) => addToCart({ name: item.name, price: String(item.price ?? item.priceHot ?? 0), emoji: '☕' })}
                  onRemove={removeFromCart}
                  onCustomize={setCustomizeTarget}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <p className="text-center text-[8px] text-[#D4C9BE] px-8 pb-3 pt-1">
          يحتاج البالغون تقريباً ألفي سعرة حرارية يومياً
        </p>
      </div>

      {/* ══ CART BAR ══ */}
      <AnimatePresence>
        {cartCount > 0 && (
          <CartBar cart={cart} onCheckout={() => setShowCheckout(true)} />
        )}
      </AnimatePresence>
    </div>
  );
}
