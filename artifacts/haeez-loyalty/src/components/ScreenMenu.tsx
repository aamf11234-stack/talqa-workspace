import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, Flame, Snowflake } from 'lucide-react';

const logoImg = `${import.meta.env.BASE_URL}hyz-logo.jpeg`;

/* ══════════════════════════════════════════════════════ DATA ══ */
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
  flavors?: { label: string; color: string }[];
  featured?: boolean;
}
interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bg: string;           // section bg gradient
  liveLabel?: boolean;
  note?: string;
  allergyNote?: boolean;
  items: MenuItem[];
}

const menu: MenuCategory[] = [
  {
    id: 'espresso', name: 'إسبريسو', emoji: '☕', color: '#7B1618',
    bg: 'linear-gradient(160deg,#0D0205,#3D0809)',
    items: [
      { name: 'إسبريسو أثيوبي', desc: 'تفاح مجفف · برتقال · كرز · ورد', origin: 'إثيوبيا', originFlag: '🇪🇹', price: 12, badge: 'تجفيف مطول', badgeColor: '#7B1618', featured: true,
        flavors: [{ label: 'فاكهي', color: '#E67E22' }, { label: 'زهري', color: '#E91E8C' }, { label: 'حامضي خفيف', color: '#F1C40F' }] },
      { name: 'إسبريسو يمني', desc: 'بطيخ · توت · برتقال', origin: 'اليمن', originFlag: '🇾🇪', price: 15,
        flavors: [{ label: 'ناعم', color: '#9B59B6' }, { label: 'توت', color: '#C0392B' }] },
      { name: 'إسبريسو كولومبي', desc: 'جوز الهند · برتقال · شوكولاتة · أزهار', origin: 'كولومبيا', originFlag: '🇨🇴', price: 17,
        flavors: [{ label: 'شوكولاتة', color: '#6D4C41' }, { label: 'استوائي', color: '#27AE60' }] },
      { name: 'إسبريسو الجمعة', desc: 'فواكه استوائية · توت · لوز · أزهار', origin: 'السعودية', originFlag: '🇸🇦', price: 14, badge: 'الجمعة فقط', badgeColor: '#C9956A',
        flavors: [{ label: 'لوز', color: '#B5651D' }, { label: 'زهري', color: '#FF69B4' }] },
    ],
  },
  {
    id: 'filter', name: 'قهوة اليوم', emoji: '⚗️', color: '#2D7D46',
    bg: 'linear-gradient(160deg,#04130A,#0D2D18)',
    liveLabel: true,
    items: [
      { name: 'نيكاراغوا', desc: 'محصول يومي مميز', origin: 'نيكاراغوا', originFlag: '🇳🇮', priceHot: 10, priceCold: 11,
        flavors: [{ label: 'كراميل', color: '#D4AC0D' }, { label: 'مكسر', color: '#8D6E63' }] },
      { name: 'إثيوبيا يرقاشيفي', desc: 'حموضة ناعمة ورائحة زهرية', origin: 'إثيوبيا', originFlag: '🇪🇹', priceHot: 11, priceCold: 12, featured: true,
        flavors: [{ label: 'زهري', color: '#E91E8C' }, { label: 'توت', color: '#C0392B' }, { label: 'برتقال', color: '#E67E22' }] },
      { name: 'الصين', desc: 'محصول يومي مميز', origin: 'الصين', originFlag: '🇨🇳', priceHot: 13, priceCold: 14,
        flavors: [{ label: 'أرضي', color: '#795548' }, { label: 'جوز', color: '#8D6E63' }] },
    ],
  },
  {
    id: 'milk', name: 'بالحليب', emoji: '🥛', color: '#B5651D',
    bg: 'linear-gradient(160deg,#0A0600,#2A1400)',
    note: 'خيارات تكهة للأنواع الباردة: كراميل · موكا · بستاشيو',
    items: [
      { name: 'بيكولو', price: 14, flavors: [{ label: 'مركّز', color: '#7B1618' }] },
      { name: 'كورتادو', priceHot: 14, priceCold: 15, flavors: [{ label: 'متوازن', color: '#B5651D' }] },
      { name: 'فلات وايت', priceHot: 15, priceCold: 17, flavors: [{ label: 'كريمي', color: '#C9956A' }] },
      { name: 'لاتيه', priceHot: 17, priceCold: 19, flavors: [{ label: 'ناعم', color: '#9B59B6' }, { label: 'حليبي', color: '#C9956A' }] },
      { name: 'قهوة حيز', desc: 'خلطة حيز الحصرية', priceHot: 19, priceCold: 21, badge: 'الأشهر', badgeColor: '#7B1618', featured: true,
        flavors: [{ label: 'حصري', color: '#7B1618' }, { label: 'غني', color: '#C9956A' }, { label: 'كراميل', color: '#D4AC0D' }] },
    ],
  },
  {
    id: 'pour', name: 'مقطرة', emoji: '💧', color: '#1A5276',
    bg: 'linear-gradient(160deg,#020810,#051828)',
    note: 'حجم كوب أكبر بريالين إضافية',
    items: [
      { name: 'مقطرة يمني في ٦٠', desc: 'معالجة عميقة · ٦٠ دقيقة', origin: 'اليمن', originFlag: '🇾🇪', priceHot: 18, priceCold: 19,
        flavors: [{ label: 'عميق', color: '#1A5276' }, { label: 'شوكولاتة', color: '#6D4C41' }] },
      { name: 'مقطرة كولومبي في ٦٠', desc: 'معالجة عميقة · ٦٠ دقيقة', origin: 'كولومبيا', originFlag: '🇨🇴', priceHot: 20, priceCold: 21, featured: true,
        flavors: [{ label: 'فاكهي', color: '#E67E22' }, { label: 'نظيف', color: '#27AE60' }, { label: 'طويل', color: '#1A5276' }] },
    ],
  },
  {
    id: 'cold', name: 'مشروبات باردة', emoji: '🧊', color: '#0E6B8A',
    bg: 'linear-gradient(160deg,#020C12,#041E2A)',
    items: [
      { name: 'كوكدية حبحب', price: 18, flavors: [{ label: 'منعش', color: '#27AE60' }, { label: 'صيفي', color: '#E74C3C' }] },
      { name: 'ماتشا حلوه', price: 18, featured: true, flavors: [{ label: 'أخضر', color: '#2D7D46' }, { label: 'ياباني', color: '#27AE60' }] },
      { name: 'باشن فروت بالشاي المثلج', price: 16, flavors: [{ label: 'استوائي', color: '#F39C12' }, { label: 'حامضي', color: '#E67E22' }] },
      { name: 'عصير برتقال', price: 15, flavors: [{ label: 'طازج', color: '#E67E22' }] },
    ],
  },
  {
    id: 'winter', name: 'مشروبات الشتاء', emoji: '❄️', color: '#5D6D7E',
    bg: 'linear-gradient(160deg,#060A0C,#101820)',
    items: [
      { name: 'شوكولاتة ساخنة', desc: 'سعة كوب واحد', price: 22, flavors: [{ label: 'دافئ', color: '#6D4C41' }, { label: 'كريمي', color: '#C9956A' }] },
      { name: 'شوكولاتة ساخنة مشتركة', desc: 'سعة كوبين — للشاركة', price: 39, featured: true,
        flavors: [{ label: 'شاركي', color: '#E91E8C' }, { label: 'فاخر', color: '#9B59B6' }] },
    ],
  },
  {
    id: 'other', name: 'أخرى', emoji: '🫖', color: '#6C3483',
    bg: 'linear-gradient(160deg,#080010,#14002A)',
    items: [
      { name: 'شاي أنجليزي', price: 5 },
      { name: 'أفوقاتو', price: 17, flavors: [{ label: 'إيطالي', color: '#E74C3C' }, { label: 'ايسكريم', color: '#F5F5F5' }] },
      { name: 'تصبيرة سعودية', desc: 'تمر وقشطة', price: 7, flavors: [{ label: 'سعودي', color: '#27AE60' }, { label: 'تراثي', color: '#D4AC0D' }] },
    ],
  },
  {
    id: 'croissant', name: 'كرواسون', emoji: '🥐', color: '#C9956A',
    bg: 'linear-gradient(160deg,#100A02,#2A1A00)',
    allergyNote: true,
    items: [
      { name: 'سينابون', price: 15, flavors: [{ label: 'قرفة', color: '#B5651D' }, { label: 'سكري', color: '#F1C40F' }] },
      { name: 'لوز بالشوكولاتة الداكن', price: 12, featured: true, flavors: [{ label: 'لوز', color: '#8D6E63' }, { label: 'مر', color: '#3E2723' }] },
      { name: 'كاسترد فراولة', price: 10, flavors: [{ label: 'كريمي', color: '#FF8A65' }, { label: 'فراولة', color: '#E91E8C' }] },
      { name: 'فيونكة التشيز توت', price: 15, flavors: [{ label: 'جبن', color: '#FFF176' }, { label: 'توت', color: '#9C27B0' }] },
    ],
  },
  {
    id: 'danish', name: 'دانيش', emoji: '🍞', color: '#D4AC0D',
    bg: 'linear-gradient(160deg,#0C0A00,#1E1800)',
    allergyNote: true,
    items: [
      { name: 'موز مكرمل', price: 14, flavors: [{ label: 'موز', color: '#F1C40F' }, { label: 'كراميل', color: '#D4AC0D' }] },
      { name: 'لافندر وتوت أزرق', price: 15, featured: true, flavors: [{ label: 'لافندر', color: '#9B59B6' }, { label: 'توت أزرق', color: '#1A237E' }] },
      { name: 'حلوي بحشوة البيتزا', price: 15, flavors: [{ label: 'مالح حلو', color: '#E74C3C' }] },
    ],
  },
  {
    id: 'cake', name: 'كيك', emoji: '🎂', color: '#922B21',
    bg: 'linear-gradient(160deg,#0A0200,#220800)',
    allergyNote: true,
    items: [
      { name: 'كيكة حيز بالشوكولاتة', price: 23, flavors: [{ label: 'شوكولاتة', color: '#4E342E' }, { label: 'ناعم', color: '#8D6E63' }] },
      { name: 'كيكة حيز بالبيكان', price: 25, badge: 'الأشهر', badgeColor: '#C9956A', featured: true,
        flavors: [{ label: 'بيكان', color: '#6D4C41' }, { label: 'حلو', color: '#D4AC0D' }, { label: 'مقرمش', color: '#B5651D' }] },
      { name: 'تيراميسو براونيز', price: 16, flavors: [{ label: 'إيطالي', color: '#4E342E' }, { label: 'قهوة', color: '#7B1618' }] },
      { name: 'حلى الأسبوع', desc: 'اسأل الكاشير', price: 14, badge: 'متغير', badgeColor: '#30D158',
        flavors: [{ label: 'مفاجأة', color: '#30D158' }] },
    ],
  },
  {
    id: 'breakfast', name: 'الفطور', emoji: '🍽️', color: '#117A65',
    bg: 'linear-gradient(160deg,#021008,#062018)',
    items: [
      { name: 'بوراتا زعتر', desc: 'مع خبز الفوكاتشيا الإيطالي', price: 22, featured: true,
        flavors: [{ label: 'إيطالي', color: '#27AE60' }, { label: 'طازج', color: '#117A65' }, { label: 'زيت زيتون', color: '#D4AC0D' }] },
      { name: 'حلوي ترافل', price: 19 },
      { name: 'ساوردو', desc: 'خبز خمر طبيعي بقشرة مقرمشة', price: 22,
        flavors: [{ label: 'مقرمش', color: '#B5651D' }, { label: 'طبيعي', color: '#8D6E63' }] },
    ],
  },
];

/* ══════════════════════════════════════════════════ STEAM SVG ══ */
function Steam({ color = 'rgba(255,255,255,0.15)' }: { color?: string }) {
  return (
    <svg viewBox="0 0 60 40" className="absolute" style={{ width: 60, height: 40 }}>
      {[0, 1, 2].map(i => (
        <motion.path
          key={i}
          d={`M${12 + i * 18} 38 C${10 + i * 18} 28 ${18 + i * 18} 22 ${14 + i * 18} 12`}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 0.7, 0], y: [0, -6] }}
          transition={{ duration: 2.2, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════ PRICE TAG ══ */
function PriceTag({ item, color }: { item: MenuItem; color: string }) {
  if (item.priceHot !== undefined && item.priceCold !== undefined) {
    return (
      <div className="flex flex-col gap-1 items-end shrink-0">
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(255,80,40,0.12)' }}>
          <Flame size={8} style={{ color: '#FF5028' }} />
          <span className="text-[12px] font-black font-inter tabular-nums" style={{ color }}>{item.priceHot}</span>
          <span className="text-[8px] text-white/30">ر</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(30,180,255,0.12)' }}>
          <Snowflake size={8} style={{ color: '#1EB4FF' }} />
          <span className="text-[12px] font-black font-inter tabular-nums" style={{ color }}>{item.priceCold}</span>
          <span className="text-[8px] text-white/30">ر</span>
        </div>
      </div>
    );
  }
  return (
    <div className="shrink-0 flex flex-col items-end">
      <div className="px-2.5 py-1 rounded-[10px]"
        style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
        <span className="text-[14px] font-black font-inter tabular-nums" style={{ color }}>{item.price}</span>
        <span className="text-[8px] text-white/30 mr-0.5">ر</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════ ITEM ROW ══ */
function ItemRow({ item, color, index, isLast }: { item: MenuItem; color: string; index: number; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
    >
      <motion.button
        className="w-full text-right"
        onClick={() => setExpanded(e => !e)}
        whileTap={{ scale: 0.985 }}
      >
        <div className={`flex items-start gap-3 px-4 py-3.5 ${!isLast ? 'border-b border-white/[0.06]' : ''}`}>
          {/* Featured star */}
          {item.featured && (
            <div className="absolute right-4 -mt-1.5">
              <span className="text-[8px]" style={{ color }}>✦</span>
            </div>
          )}

          {/* Left: color accent line */}
          <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
            <div className="w-1 h-1 rounded-full" style={{ background: color, opacity: 0.7 }} />
            {!isLast && <div className="w-px flex-1 min-h-[12px]" style={{ background: `${color}20` }} />}
          </div>

          {/* Center: info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
              <span className="text-[13px] font-bold text-white leading-snug">{item.name}</span>
              {item.badge && (
                <span className="text-[7px] font-black text-white px-1.5 py-0.5 rounded-full tracking-wide"
                  style={{ background: item.badgeColor ?? color }}>
                  {item.badge}
                </span>
              )}
            </div>
            {item.originFlag && (
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[10px]">{item.originFlag}</span>
                <span className="text-[8px] text-white/25 font-inter tracking-wide">{item.origin}</span>
              </div>
            )}
            {item.desc && (
              <p className="text-[10px] text-white/35 leading-snug font-light">{item.desc}</p>
            )}
            {/* Flavor pills */}
            {item.flavors && item.flavors.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {item.flavors.map((f, fi) => (
                  <span key={fi} className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ background: `${f.color}20`, color: f.color, border: `1px solid ${f.color}30` }}>
                    {f.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: price */}
          <PriceTag item={item} color={color} />
        </div>
      </motion.button>
    </motion.div>
  );
}

/* ══════════════════════════════════════════ CATEGORY SECTION ══ */
function CategorySection({ category, index }: { category: MenuCategory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="mx-3 mb-4 rounded-[22px] overflow-hidden"
      style={{ boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px ${category.color}20` }}
    >
      {/* Dark gradient header */}
      <div className="relative overflow-hidden" style={{ background: category.bg }}>
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 80% 50%,${category.color}30 0%,transparent 65%)` }} />

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '10px 10px' }} />

        <div className="relative flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            {/* Emoji in glowing circle */}
            <div className="relative w-11 h-11 rounded-[14px] flex items-center justify-center text-[22px]"
              style={{
                background: `linear-gradient(145deg,${category.color}30,${category.color}15)`,
                border: `1px solid ${category.color}40`,
                boxShadow: `0 0 16px ${category.color}30`,
              }}>
              {category.emoji}
              {/* Steam for coffee categories */}
              {['espresso', 'filter', 'milk', 'pour'].includes(category.id) && (
                <div className="absolute -top-5 left-0">
                  <Steam color={`${category.color}50`} />
                </div>
              )}
            </div>

            <div>
              <h2 className="text-white text-[15px] font-black tracking-tight leading-tight">{category.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-white/25 text-[9px] font-inter">{category.items.length} أصناف</span>
                {category.liveLabel && (
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full"
                    style={{ background: 'rgba(48,209,88,0.15)', border: '1px solid rgba(48,209,88,0.3)' }}>
                    <div className="w-1 h-1 bg-[#30D158] rounded-full animate-pulse" />
                    <span className="text-[7px] text-[#30D158] font-bold">يتغير يومياً</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Color accent right */}
          <div className="w-8 h-8 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle,${category.color},transparent)` }} />
        </div>

        {/* Bottom fade to items area */}
        <div className="h-px" style={{ background: `linear-gradient(90deg,${category.color}40,transparent,${category.color}20)` }} />
      </div>

      {/* Items — dark glass surface */}
      <div className="relative" style={{ background: 'rgba(10,5,8,0.92)', backdropFilter: 'blur(20px)' }}>
        {category.items.map((item, i) => (
          <ItemRow
            key={i}
            item={item}
            color={category.color}
            index={i}
            isLast={i === category.items.length - 1}
          />
        ))}

        {/* Notes footer */}
        {(category.note || category.allergyNote) && (
          <div className="px-4 py-2.5 border-t border-white/[0.05]"
            style={{ background: `${category.color}08` }}>
            {category.note && (
              <p className="text-[9px] text-white/25 leading-snug mb-0.5">ℹ {category.note}</p>
            )}
            {category.allergyNote && (
              <p className="text-[9px] text-white/20 leading-snug">⚠ قد تحتوي بعض المنتجات على مسببات الحساسية</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════ SHELF ══ */
function ShelfSection() {
  const items = [
    { icon: '🏺', title: 'أكواب الفخار', desc: 'كوب فخار مصنوع ومرسوم يدوياً بنسخة لك فقط', color: '#C9956A', sub: 'حصري لكل عضو' },
    { icon: '🌿', title: 'هدايا حيز',   desc: 'حوض فخار يدوي بهوية حيز مع نبتة البوتس',    color: '#2D7D46', sub: 'هدية مثالية'  },
    { icon: '☕', title: 'محاصيل الرف', desc: 'اقتنِ محاصيلنا المميزة من الرف الحصري',       color: '#7B1618', sub: 'كميات محدودة' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mx-3 mb-6"
    >
      {/* Section header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="w-7 h-7 rounded-[9px] flex items-center justify-center text-[15px]"
          style={{ background: 'rgba(201,149,106,0.15)', border: '1px solid rgba(201,149,106,0.2)' }}>🏺</div>
        <h2 className="text-[13px] font-bold text-[#111]">مبيعات الرف</h2>
        <div className="flex-1 h-px bg-gradient-to-l from-[#C9956A]/20 to-transparent" />
        <span className="text-[9px] text-[#CCC]">✦ ✦ ✦</span>
      </div>

      {/* Dark product cards */}
      <div className="rounded-[20px] overflow-hidden"
        style={{ background: 'linear-gradient(145deg,#0D0205,#1A0408)', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
        {items.map((s, i) => (
          <div key={i}
            className={`flex items-center gap-3.5 px-4 py-4 ${i < items.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
          >
            <div className="w-11 h-11 rounded-[14px] flex items-center justify-center text-[20px] shrink-0"
              style={{ background: `${s.color}18`, border: `1px solid ${s.color}25` }}>
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[12px] font-bold">{s.title}</p>
              <p className="text-white/35 text-[10px] font-light leading-snug mt-0.5">{s.desc}</p>
            </div>
            <span className="text-[8px] font-bold px-2 py-1 rounded-full shrink-0"
              style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}25` }}>
              {s.sub}
            </span>
          </div>
        ))}
        <div className="px-4 py-2.5 border-t border-white/[0.04] text-center">
          <p className="text-white/20 text-[9px]">اسأل الفريق للمزيد ✦</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════ SEARCH RESULTS ══ */
function SearchResults({ results, query, onClear }: {
  results: { category: MenuCategory; item: MenuItem }[];
  query: string;
  onClear: () => void;
}) {
  if (results.length === 0) return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-8">
      <div className="text-5xl mb-4">☕</div>
      <p className="text-[14px] font-bold text-[#888]">لا نتائج لـ "{query}"</p>
      <p className="text-[11px] text-[#CCC] mt-1.5 font-light">جرّب اسماً آخر أو تصفح الكل</p>
      <button onClick={onClear} className="mt-4 text-[11px] text-[#7B1618] font-semibold">تصفح الكل</button>
    </div>
  );

  return (
    <div className="mx-3 mb-4">
      <p className="text-[10px] text-[#AAA] mb-3 px-1">
        {results.length} نتيجة لـ "<span className="text-[#7B1618] font-semibold">{query}</span>"
      </p>
      <div className="rounded-[20px] overflow-hidden"
        style={{ background: 'linear-gradient(145deg,#0D0205,#1A0408)', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
        {results.map(({ category, item }, i) => (
          <div key={i}
            className={`flex items-start gap-3 px-4 py-3.5 ${i < results.length - 1 ? 'border-b border-white/[0.06]' : ''}`}>
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-[14px] shrink-0 mt-0.5"
              style={{ background: `${category.color}20` }}>
              {category.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <p className="text-white text-[12px] font-bold leading-snug">{item.name}</p>
                {item.badge && (
                  <span className="text-[7px] font-bold text-white px-1.5 py-0.5 rounded-full"
                    style={{ background: item.badgeColor ?? category.color }}>{item.badge}</span>
                )}
              </div>
              <p className="text-[9px] font-semibold" style={{ color: category.color }}>{category.name}</p>
              {item.flavors && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.flavors.map((f, fi) => (
                    <span key={fi} className="text-[7px] font-semibold px-1 py-0.5 rounded-full"
                      style={{ background: `${f.color}20`, color: f.color }}>{f.label}</span>
                  ))}
                </div>
              )}
            </div>
            <PriceTag item={item} color={category.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════ MAIN ══ */
export function ScreenMenu() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.trim().toLowerCase();
    const results: { category: MenuCategory; item: MenuItem }[] = [];
    menu.forEach(cat => {
      cat.items.forEach(item => {
        if (
          item.name.includes(q) ||
          (item.desc && item.desc.includes(q)) ||
          cat.name.includes(q) ||
          (item.origin && item.origin.includes(q)) ||
          (item.flavors && item.flavors.some(f => f.label.includes(q)))
        ) results.push({ category: cat, item });
      });
    });
    return results;
  }, [searchQuery]);

  const displayed = activeId ? menu.filter(c => c.id === activeId) : menu;

  const handleCat = (id: string | null) => {
    setActiveId(id);
    setSearchQuery('');
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSearch = () => { setSearchQuery(''); searchRef.current?.blur(); };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F0E9E0' }}>

      {/* ── Dark header ── */}
      <div className="shrink-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#080002 0%,#280006 35%,#3D0809 60%,#0A0002 100%)' }}>
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 65% 40%,rgba(123,22,24,0.55) 0%,transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle,#C9956A 1px,transparent 1px)', backgroundSize: '12px 12px' }} />

        {/* Logo + title + status */}
        <div className="relative z-10 flex items-center gap-3 px-4 pt-4 pb-3">
          <div className="relative">
            <img src={logoImg} alt="حيز" className="w-9 h-9 rounded-[11px] object-cover"
              style={{ border: '1px solid rgba(201,149,106,0.3)', boxShadow: '0 0 12px rgba(201,149,106,0.2)' }} />
            {/* Steam above logo */}
            <div className="absolute -top-6 -right-1 opacity-60">
              <Steam color="rgba(201,149,106,0.4)" />
            </div>
          </div>
          <div>
            <p className="text-[#C9956A] text-[8px] font-bold tracking-[0.18em] uppercase leading-tight">HYZ CAFÉ · ABHA</p>
            <p className="text-white text-[17px] font-black leading-tight tracking-tight">قائمة حيز</p>
          </div>
          <div className="mr-auto text-right">
            <div className="flex items-center justify-end gap-1 mb-0.5">
              <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
              <p className="text-[#30D158] text-[9px] font-semibold">مفتوح الآن</p>
            </div>
            <p className="text-white/20 text-[8px] font-inter">٦ص – ٦:٣٠م</p>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative z-10 px-4 pb-4">
          <motion.div
            animate={{ borderColor: searchFocused ? 'rgba(201,149,106,0.5)' : 'rgba(255,255,255,0.08)' }}
            className="flex items-center gap-2.5 rounded-[14px] px-3.5 py-2.5"
            style={{
              background: searchFocused ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Search size={13} className="text-white/30 shrink-0" />
            <input
              ref={searchRef}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="ابحث عن صنف أو نكهة..."
              className="flex-1 bg-transparent text-white text-[12px] outline-none placeholder:text-white/20 font-light"
              dir="rtl"
            />
            {searchQuery ? (
              <button onClick={clearSearch}
                className="shrink-0 w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
                <X size={9} className="text-white/60" />
              </button>
            ) : (
              <span className="text-white/12 text-[8px] font-inter shrink-0">
                {menu.reduce((a, c) => a + c.items.length, 0)} صنف
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Category pills ── */}
      <div className="shrink-0 py-2.5 border-b border-[rgba(196,181,159,0.2)]"
        style={{ background: 'rgba(253,251,247,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="flex gap-2 overflow-x-auto scrollbar-none px-3">
          {/* All pill */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => handleCat(null)}
            className="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-200"
            style={activeId === null
              ? { background: 'linear-gradient(135deg,#7B1618,#4A0D0F)', color: '#fff', boxShadow: '0 3px 12px rgba(123,22,24,0.35)' }
              : { background: 'rgba(196,181,159,0.15)', color: '#888' }
            }
          >
            الكل
          </motion.button>

          {menu.map(cat => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleCat(cat.id)}
              className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-200 whitespace-nowrap"
              style={activeId === cat.id
                ? { background: `linear-gradient(135deg,${cat.color},${cat.color}BB)`, color: '#fff', boxShadow: `0 3px 12px ${cat.color}45` }
                : { background: 'rgba(196,181,159,0.12)', color: '#888' }
              }
            >
              <span className="text-[10px]">{cat.emoji}</span>
              {cat.name}
              {cat.liveLabel && <span className="w-1 h-1 bg-[#30D158] rounded-full" />}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-none pt-4 pb-24">
        <AnimatePresence mode="wait" initial={false}>

          {/* Search results */}
          {searchQuery && searchResults !== null ? (
            <motion.div key="search"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}>
              <SearchResults results={searchResults} query={searchQuery} onClear={clearSearch} />
            </motion.div>
          ) : (
            <motion.div
              key={activeId ?? 'all'}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}>
              {displayed.map((cat, i) => (
                <CategorySection key={cat.id} category={cat} index={i} />
              ))}
              {activeId === null && <ShelfSection />}
            </motion.div>
          )}

        </AnimatePresence>

        {/* Footer */}
        <div className="mx-3 mb-2 py-3 text-center">
          <p className="text-[8px] text-[#CCC]">يحتاج البالغون تقريباً ألفي سعرة حرارية يومياً</p>
        </div>
      </div>
    </div>
  );
}
