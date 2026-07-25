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
    id: 'hot', name: 'المشروبات الحارة', nameEn: 'HOT DRINKS', color: '#8B3252',
    items: [
      { name: 'قهوة اليوم',      desc: 'بلند يومي مختار بعناية', price: 9,  badge: 'اليوم', badgeColor: '#8B3252', liveLabel: true } as any,
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
    id: 'cold', name: 'المشروبات الباردة', nameEn: 'COLD DRINKS', color: '#3A6EA8',
    items: [
      { name: 'قهوة اليوم بارده صغير',  price: 9  },
      { name: 'قهوة اليوم بارده كبير',  price: 10 },
      { name: 'ايس امريكانو',           price: 15 },
      { name: 'موهيتو روز يري',         price: 17, badge: 'الأشهر', badgeColor: '#8B3252', featured: true, img: `${import.meta.env.BASE_URL}bd-mohito.jpg` },
      { name: 'موهيتو يريز ليمون',      price: 17 },
      { name: 'موهيتو بلو اوشن',        price: 17 },
      { name: 'موهيتو مكس',             price: 17 },
      { name: 'موهيتو باشن فروت',       price: 18 },
      { name: 'كركديه',                 price: 18 },
      { name: 'ايس لاتيه',              price: 18 },
      { name: 'ايس ستفتشر براون',       desc: 'التوقيع الخاص بنا', price: 19, badge: 'براون', badgeColor: '#7A3B28', featured: true, img: `${import.meta.env.BASE_URL}bd-ice-stretcher.jpg` },
      { name: 'اسبانيش لاتيه بارد',     price: 19 },
      { name: 'ايس كراميل',             price: 20 },
      { name: 'بستاشيو لاتيه بارد',     price: 20 },
      { name: 'اسبرسو خوذ',             price: 20 },
      { name: 'ايس يري',                price: 19 },
      { name: 'ماتشا',                  price: 20 },
      { name: 'افقاتو براون',           desc: 'إسبريسو فوق الآيس كريم', price: 25, badge: 'الأحلى', badgeColor: '#8B3252', featured: true, img: `${import.meta.env.BASE_URL}bd-affogato.jpg` },
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
      <span className="text-[15px] font-black font-inter tabular-nums" style={{ color: '#8B3252' }}>{item.price}</span>
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
            <p className="text-[11px] text-[#B06070] font-bold font-inter">{target.basePrice} ر</p>
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
            style={{ background:`linear-gradient(135deg,${target.catColor},#7A3050)`, boxShadow:`0 6px 20px ${target.catColor}45` }}>
            <Check size={16} strokeWidth={2.5} />
            أضف للسلة — {total} ريال
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

/* ══════════════════════════════════════════ SECTION ══ */
function Section({ cat, index, onOrder, onCustomize }: {
  cat: MenuCategory;
  index: number;
  onOrder?: (item: CheckoutItem) => void;
  onCustomize?: (target: CustomizeTarget) => void;
}) {
  return (
    <motion.div
      id={`cat-${cat.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
    >
      {/* Category header */}
      <div className="px-5 pt-6 pb-3 flex items-end justify-between">
        <div>
          {/* English label */}
          <p className="text-[9px] font-black tracking-[0.22em] mb-1"
            style={{ color: cat.color, fontFamily: 'ui-monospace, monospace' }}>
            {cat.nameEn}
          </p>
          {/* Arabic name */}
          <div className="flex items-center gap-2.5 mt-0.5">
            {(() => { const Icon = CategoryIconMap[cat.id]; return Icon ? <Icon size={22} color={cat.color} sw={1.4} /> : null; })()}
            <h2 className="text-[22px] font-black text-[#111] leading-none tracking-tight">{cat.name}</h2>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 pb-0.5">
          {cat.liveLabel && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{ background: '#2D7D4612', border: '1px solid #2D7D4625' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-pulse" />
              <span className="text-[8px] font-bold text-[#2D7D46]">يتغير يومياً</span>
            </div>
          )}
          <span className="text-[10px] text-[#C4B5A8]">{cat.items.length} أصناف</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px" style={{ background: `linear-gradient(90deg, ${cat.color}40, ${cat.color}10, transparent)` }} />

      {/* Items */}
      <div className="px-5">
        {cat.items.map((item, i) => item.featured && item.img ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 + i * 0.04, duration: 0.28 }}
              className="my-2 rounded-[18px] overflow-hidden relative"
              style={{
                borderBottom: i < cat.items.length - 1 ? '1px solid rgba(196,181,159,0.1)' : 'none',
                background: `${cat.color}08`,
                border: `1px solid ${cat.color}20`,
              }}
            >
              {/* Photo */}
              <div className="relative h-[110px]">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
                {item.badge && (
                  <div className="absolute top-2.5 right-3 px-2 py-0.5 rounded-full text-[8px] font-black text-white"
                    style={{ background: item.badgeColor ?? cat.color, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                    {item.badge}
                  </div>
                )}
                <div className="absolute bottom-2.5 right-3 left-3 flex items-end justify-between">
                  <div>
                    <p className="text-white text-[14px] font-black leading-snug drop-shadow-sm">{item.name}</p>
                    {item.desc && <p className="text-white/70 text-[10px] font-light">{item.desc}</p>}
                    {item.origin && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <IOriginPin size={9} color="#fff" sw={1.5} />
                        <span className="text-white/60 text-[9px]">{item.origin}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div>
                      {item.priceHot !== undefined ? (
                        <div className="flex flex-col items-end gap-0.5">
                          <span className="text-white text-[13px] font-black font-inter drop-shadow-sm">{item.priceHot}<span className="text-[9px] opacity-70"> ر</span></span>
                        </div>
                      ) : (
                        <span className="text-white text-[15px] font-black font-inter drop-shadow-sm">{item.price}<span className="text-[9px] opacity-70"> ر</span></span>
                      )}
                    </div>
                    {(onOrder || onCustomize) && (
                      <motion.button whileTap={{ scale: 0.88 }}
                        onClick={() => onCustomize
                          ? onCustomize({ name: item.name, basePrice: item.price ?? item.priceHot ?? 0, emoji: '☕', catColor: cat.color })
                          : onOrder?.({ name: item.name, price: String(item.price ?? item.priceHot ?? 0), emoji: '☕' })
                        }
                        className="text-[9px] font-black px-3 py-1.5 rounded-full text-white"
                        style={{ background: cat.color, boxShadow: `0 3px 10px ${cat.color}66` }}>
                        اطلب
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 + i * 0.04, duration: 0.25 }}
            className="flex items-start gap-3 py-3.5"
            style={{ borderBottom: i < cat.items.length - 1 ? '1px solid rgba(196,181,159,0.18)' : 'none' }}
          >
            {/* Featured star */}
            {item.featured && (
              <div className="mt-[2px] shrink-0" style={{ color: cat.color }}>
                <svg width="7" height="7" viewBox="0 0 7 7" fill="currentColor">
                  <polygon points="3.5,0 4.3,2.5 7,2.5 4.9,4 5.7,6.5 3.5,5 1.3,6.5 2.1,4 0,2.5 2.7,2.5" />
                </svg>
              </div>
            )}
            {!item.featured && <div className="w-[7px] shrink-0 mt-[4px]">
              <div className="w-1 h-1 rounded-full" style={{ background: `${cat.color}50` }} />
            </div>}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                <span className="text-[13px] font-bold text-[#111] leading-snug">{item.name}</span>
                {item.badge && (
                  <span className="text-[7px] font-black text-white px-1.5 py-[2px] rounded-full"
                    style={{ background: item.badgeColor ?? cat.color }}>
                    {item.badge}
                  </span>
                )}
              </div>
              {(item.desc || item.origin) && (
                <div className="flex flex-wrap items-center gap-2">
                  {item.desc && (
                    <p className="text-[10px] text-[#AAA] font-light leading-snug">{item.desc}</p>
                  )}
                  {item.origin && (
                    <div className="flex items-center gap-1">
                      <IOriginPin size={10} color={cat.color} sw={1.5} />
                      <span className="text-[9px] font-medium" style={{ color: `${cat.color}90` }}>{item.origin}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Price + Order */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <Price item={item} />
              {(onOrder || onCustomize) && (
                <motion.button whileTap={{ scale: 0.88 }}
                  onClick={() => onCustomize
                    ? onCustomize({ name: item.name, basePrice: item.price ?? item.priceHot ?? 0, emoji: '☕', catColor: cat.color })
                    : onOrder?.({ name: item.name, price: String(item.price ?? item.priceHot ?? 0), emoji: '☕' })
                  }
                  className="text-[9px] font-black px-2.5 py-1 rounded-full text-white"
                  style={{ background: cat.color, boxShadow: `0 3px 10px ${cat.color}55` }}>
                  اطلب
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Note footer */}
      {(cat.note || cat.allergyNote) && (
        <div className="mx-5 mt-1 mb-2 px-3 py-2 rounded-[10px]"
          style={{ background: `${cat.color}08`, border: `1px solid ${cat.color}12` }}>
          {cat.note && <p className="text-[9px] text-[#AAA] leading-snug">ℹ {cat.note}</p>}
          {cat.allergyNote && <p className="text-[9px] text-[#C4B5A8] leading-snug mt-0.5">⚠ قد تحتوي على مسببات حساسية</p>}
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
    color: '#B06070',
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
      <div className="mb-4 opacity-30"><IEspresso size={52} color="#B06070" sw={1.2} /></div>
      <p className="text-[14px] font-bold text-[#888]">لا نتائج لـ "{query}"</p>
      <p className="text-[11px] text-[#CCC] mt-1.5">جرّب اسماً آخر</p>
      <button onClick={onClear} className="mt-4 text-[11px] font-bold" style={{ color: '#B06070' }}>تصفح الكل</button>
    </div>
  );

  return (
    <div className="px-5 pt-3">
      <p className="text-[10px] text-[#AAA] mb-4">
        {results.length} نتيجة لـ "<span className="font-bold" style={{ color: '#B06070' }}>{query}</span>"
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
  const [heroScrolled, setHeroScrolled] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<CheckoutItem | null>(null);
  const [customizeTarget, setCustomizeTarget] = useState<CustomizeTarget | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

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
  }

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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setHeroScrolled(e.currentTarget.scrollTop > 60);
  };

  const handleCat = (id: string | null) => {
    setActiveId(id);
    setSearchQuery('');
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalItems = menu.reduce((a, c) => a + c.items.length, 0);

  return (
    <div className="flex flex-col h-full overflow-hidden relative" style={{ background: '#FAF7F3' }}>
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
      <AnimatePresence>
        {customizeTarget && (
          <CustomizeSheet
            target={customizeTarget}
            onConfirm={(item) => { setPendingOrder(item); }}
            onClose={() => setCustomizeTarget(null)}
          />
        )}
      </AnimatePresence>

      {/* ══ HERO HEADER ══ */}
      <div className="shrink-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(170deg,#080002 0%,#200407 40%,#3D0809 70%,#0D0205 100%)' }}>

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 80%,rgba(201,149,106,0.18) 0%,transparent 65%)' }} />

        {/* Dot texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '10px 10px' }} />

        {/* Horizontal rule top */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(201,149,106,0.4),transparent)' }} />

        {/* Main brand block */}
        <div className="relative z-10 flex flex-col items-center pt-6 pb-5 px-5">

          {/* Logo — large centered */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mb-3"
          >
            {/* Glow ring behind logo */}
            <div className="absolute inset-0 rounded-[22px] blur-xl"
              style={{ background: 'rgba(201,149,106,0.35)', transform: 'scale(1.3)' }} />
            <img
              src={brand.logoImg}
              alt={brand.name}
              className="relative w-16 h-16 rounded-[22px] object-cover"
              style={{
                border: '2px solid rgba(201,149,106,0.5)',
                boxShadow: '0 0 0 1px rgba(201,149,106,0.15), 0 8px 32px rgba(0,0,0,0.5)',
              }}
            />
            {/* Live dot */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0D0205] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#30D158] animate-pulse" />
            </div>
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-center"
          >
            <p className="text-[9px] font-black tracking-[0.35em] text-[#C9956A] mb-1"
              style={{ fontFamily: 'ui-monospace, monospace' }}>{brand.name}</p>
            <h1 className="text-[28px] font-black text-white leading-none tracking-tight">قائمتنا</h1>
            <p className="text-white/25 text-[10px] mt-1.5 font-light">
              {totalItems} صنف · مفتوح من ٦ص حتى ٦:٣٠م
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 mt-4 pt-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', width: '100%', justifyContent: 'center' }}
          >
            {[
              { v: '٦', l: 'مشروبات' },
              { v: '٤', l: 'حلويات' },
              { v: '١', l: 'فطور' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-white text-[14px] font-black font-inter leading-none">{s.v}</p>
                <p className="text-white/30 text-[8px] mt-0.5">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Search bar */}
        <div className="relative z-10 px-4 pb-4">
          <motion.div
            animate={{ borderColor: searchFocused ? 'rgba(201,149,106,0.55)' : 'rgba(255,255,255,0.07)' }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: searchFocused ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.055)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14, padding: '10px 14px',
            }}
          >
            <Search size={13} className="text-white/30 shrink-0" />
            <input
              ref={searchRef}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="ابحث في القائمة..."
              className="flex-1 bg-transparent text-white text-[12px] outline-none placeholder:text-white/20"
              dir="rtl"
            />
            {searchQuery ? (
              <button onClick={() => { setSearchQuery(''); searchRef.current?.blur(); }}
                className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <X size={9} className="text-white/60" />
              </button>
            ) : (
              <span className="text-white/15 text-[8px] font-inter shrink-0">{totalItems} صنف</span>
            )}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-4 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #FAF7F3)' }} />
      </div>

      {/* ══ CATEGORY PILLS ══ */}
      <div className="shrink-0 bg-[#FAF7F3] border-b border-[rgba(196,181,159,0.2)]">
        <div className="flex gap-2 overflow-x-auto scrollbar-none px-4 py-2.5">
          <motion.button whileTap={{ scale: 0.91 }} onClick={() => handleCat(null)}
            className="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black transition-all duration-200"
            style={activeId === null
              ? { background: 'linear-gradient(135deg,#3D0809,#B06070)', color: '#fff', boxShadow: '0 3px 12px rgba(123,22,24,0.3)' }
              : { background: 'rgba(196,181,159,0.15)', color: '#999' }
            }>
            الكل
          </motion.button>
          {menu.map(cat => (
            <motion.button key={cat.id} whileTap={{ scale: 0.91 }} onClick={() => handleCat(cat.id)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black whitespace-nowrap transition-all duration-200"
              style={activeId === cat.id
                ? { background: cat.color, color: '#fff', boxShadow: `0 3px 12px ${cat.color}45` }
                : { background: 'rgba(196,181,159,0.12)', color: '#888' }
              }>
              {(() => { const I = CategoryIconMap[cat.id]; return I ? <I size={12} color={activeId === cat.id ? '#fff' : '#888'} sw={1.5} /> : null; })()}
              {cat.name}
              {cat.liveLabel && <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div ref={scrollRef} onScroll={handleScroll}
        className="flex-1 overflow-y-auto scrollbar-none pb-24">
        <AnimatePresence mode="wait" initial={false}>

          {/* Search */}
          {searchQuery && searchResults !== null ? (
            <motion.div key="search"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SearchResults
                results={searchResults}
                query={searchQuery}
                onClear={() => setSearchQuery('')}
              />
            </motion.div>
          ) : (
            <motion.div key={activeId ?? 'all'}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {activeId === null && <Shelf />}
              {displayed.map((cat, i) => (
                <Section key={cat.id} cat={cat} index={i} onCustomize={setCustomizeTarget} />
              ))}
            </motion.div>
          )}

        </AnimatePresence>

        {/* Footer note */}
        <p className="text-center text-[8px] text-[#D4C9BE] px-8 pb-3 pt-1">
          يحتاج البالغون تقريباً ألفي سعرة حرارية يومياً
        </p>
      </div>
    </div>
  );
}
