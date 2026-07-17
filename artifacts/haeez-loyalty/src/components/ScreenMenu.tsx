import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

const logoImg = `${import.meta.env.BASE_URL}hyz-logo.jpeg`;

/* ─────────────────────────────────────────── Menu Data ── */
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
}
interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  liveLabel?: boolean;
  note?: string;
  allergyNote?: boolean;
  items: MenuItem[];
}

const menu: MenuCategory[] = [
  {
    id: 'espresso',
    name: 'اسبريسو',
    emoji: '☕',
    color: '#7B1618',
    items: [
      { name: 'إسبريسو أثيوبي',   desc: 'تفاح مجفف · برتقال · كرز · ورد', origin: 'إثيوبيا',  originFlag: '🇪🇹', price: 12, badge: 'تجفيف مطول', badgeColor: '#7B1618' },
      { name: 'إسبريسو يمني',     desc: 'بطيخ · توت · برتقال',             origin: 'اليمن',     originFlag: '🇾🇪', price: 15 },
      { name: 'إسبريسو كولومبي',  desc: 'جوز الهند · برتقال · شوكولاتة · أزهار', origin: 'كولومبيا', originFlag: '🇨🇴', price: 17 },
      { name: 'إسبريسو الجمعة',   desc: 'فواكه استوائية · توت · لوز · أزهار', origin: 'السعودية', originFlag: '🇸🇦', price: 14, badge: 'الجمعة فقط', badgeColor: '#C9956A' },
    ],
  },
  {
    id: 'filter',
    name: 'قهوة اليوم',
    emoji: '⚗️',
    color: '#2D7D46',
    liveLabel: true,
    items: [
      { name: 'نيكاراغوا',  desc: 'محصول يومي مميز',  origin: 'نيكاراغوا', originFlag: '🇳🇮', priceHot: 10, priceCold: 11 },
      { name: 'إثيوبيا',    desc: 'محصول يومي مميز',  origin: 'إثيوبيا',  originFlag: '🇪🇹', priceHot: 11, priceCold: 12 },
      { name: 'الصين',      desc: 'محصول يومي مميز',  origin: 'الصين',    originFlag: '🇨🇳', priceHot: 13, priceCold: 14 },
    ],
  },
  {
    id: 'milk',
    name: 'بالحليب',
    emoji: '🥛',
    color: '#B5651D',
    note: 'خيارات تكهة للأنواع الباردة: كراميل · موكا · بستاشيو',
    items: [
      { name: 'بيكولو',       price: 14 },
      { name: 'كورتادو',      priceHot: 14, priceCold: 15 },
      { name: 'فلات وايت',   priceHot: 15, priceCold: 17 },
      { name: 'لاتيه',       priceHot: 17, priceCold: 19 },
      { name: 'قهوة حيز',    desc: 'خلطة حيز الحصرية', priceHot: 19, priceCold: 21, badge: 'الأشهر', badgeColor: '#7B1618' },
    ],
  },
  {
    id: 'pour',
    name: 'مقطرة',
    emoji: '💧',
    color: '#1A5276',
    note: 'حجم كوب أكبر بريالين إضافية',
    items: [
      { name: 'مقطرة يمني في ٦٠',    desc: 'معالجة عميقة · ٦٠ دقيقة', origin: 'اليمن',    originFlag: '🇾🇪', priceHot: 18, priceCold: 19 },
      { name: 'مقطرة كولومبي في ٦٠', desc: 'معالجة عميقة · ٦٠ دقيقة', origin: 'كولومبيا', originFlag: '🇨🇴', priceHot: 20, priceCold: 21 },
    ],
  },
  {
    id: 'cold',
    name: 'مشروبات باردة',
    emoji: '🧊',
    color: '#1A6B8A',
    items: [
      { name: 'كوكدية حبحب',            price: 18 },
      { name: 'ماتشا حلوه',             price: 18 },
      { name: 'باشن فروت بالشاي المثلج', price: 16 },
      { name: 'عصير برتقال',            price: 15 },
    ],
  },
  {
    id: 'winter',
    name: 'مشروبات الشتاء',
    emoji: '❄️',
    color: '#5D6D7E',
    items: [
      { name: 'شوكولاتة ساخنة',         desc: 'سعة كوب واحد',  price: 22 },
      { name: 'شوكولاتة ساخنة مشتركة',  desc: 'سعة كوبين',    price: 39 },
    ],
  },
  {
    id: 'other',
    name: 'أخرى',
    emoji: '🫖',
    color: '#6C3483',
    items: [
      { name: 'شاي أنجليزي',     price: 5  },
      { name: 'أفوقاتو',         price: 17 },
      { name: 'تصبيرة سعودية',   desc: 'تمر وقشطة', price: 7 },
    ],
  },
  {
    id: 'croissant',
    name: 'كرواسون',
    emoji: '🥐',
    color: '#C9956A',
    allergyNote: true,
    items: [
      { name: 'سينابون',               price: 15 },
      { name: 'لوز بالشوكولاتة الداكن', price: 12 },
      { name: 'كاسترد فراولة',          price: 10 },
      { name: 'فيونكة التشيز توت',       price: 15 },
    ],
  },
  {
    id: 'danish',
    name: 'دانيش',
    emoji: '🍞',
    color: '#D4AC0D',
    allergyNote: true,
    items: [
      { name: 'موز مكرمل',           price: 14 },
      { name: 'لافندر وتوت أزرق',    price: 15 },
      { name: 'حلوي بحشوة البيتزا',  price: 15 },
    ],
  },
  {
    id: 'cake',
    name: 'كيك',
    emoji: '🎂',
    color: '#922B21',
    allergyNote: true,
    items: [
      { name: 'كيكة حيز بالشوكولاتة', price: 23 },
      { name: 'كيكة حيز بالبيكان',    price: 25, badge: 'الأشهر', badgeColor: '#C9956A' },
      { name: 'تيراميسو براونيز',      price: 16 },
      { name: 'حلى الأسبوع',          desc: 'اسأل الكاشير', price: 14, badge: 'متغير', badgeColor: '#30D158' },
    ],
  },
  {
    id: 'breakfast',
    name: 'الفطور',
    emoji: '🍽️',
    color: '#117A65',
    items: [
      { name: 'بوراتا زعتر',  desc: 'مع خبز الفوكاتشيا الإيطالي', price: 22 },
      { name: 'حلوي ترافل',  price: 19 },
      { name: 'ساوردو',       desc: 'خبز خمر طبيعي بقشرة مقرمشة', price: 22 },
    ],
  },
];

/* ─────────────────────────────────────────── Price ── */
function PriceTag({ item }: { item: MenuItem }) {
  if (item.priceHot !== undefined && item.priceCold !== undefined) {
    return (
      <div className="flex flex-col gap-0.5 items-end shrink-0">
        <div className="flex items-center gap-1">
          <span className="text-[9px]">🔥</span>
          <span className="text-[14px] font-bold text-[#111] font-inter tabular-nums">{item.priceHot}</span>
          <span className="text-[9px] text-[#BBB]">ر</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[9px]">🧊</span>
          <span className="text-[14px] font-bold text-[#111] font-inter tabular-nums">{item.priceCold}</span>
          <span className="text-[9px] text-[#BBB]">ر</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-baseline gap-0.5 shrink-0">
      <span className="text-[17px] font-bold font-inter tabular-nums" style={{ color: '#7B1618' }}>{item.price}</span>
      <span className="text-[10px] text-[#BBB]">ر</span>
    </div>
  );
}

/* ─────────────────────────────────────────── Category Card ── */
function CategorySection({ category, index }: { category: MenuCategory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="mx-4 mb-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-2.5 px-1">
        <div
          className="w-7 h-7 rounded-[9px] flex items-center justify-center text-[15px] shrink-0"
          style={{ background: `${category.color}18` }}
        >
          {category.emoji}
        </div>
        <div className="flex items-center gap-2 flex-1">
          <h2 className="text-[13px] font-bold text-[#111]">{category.name}</h2>
          {category.liveLabel && (
            <div className="flex items-center gap-1 bg-[#30D158]/12 px-2 py-0.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
              <span className="text-[8px] text-[#2D7D46] font-bold">يتغير يومياً</span>
            </div>
          )}
        </div>
        <div className="h-px flex-1 opacity-20" style={{ background: category.color }} />
      </div>

      {/* Items card */}
      <div
        className="rounded-[18px] overflow-hidden"
        style={{
          background: '#fff',
          boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
          border: `1px solid ${category.color}18`,
        }}
      >
        {/* colored top accent bar */}
        <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${category.color}, transparent)` }} />

        {category.items.map((item, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 px-4 py-3.5 ${
              i < category.items.length - 1 ? 'border-b border-[#F0EBE3]' : ''
            }`}
          >
            {/* Left dot accent */}
            <div
              className="w-1.5 h-1.5 rounded-full mt-[5px] shrink-0"
              style={{ background: category.color, opacity: 0.5 }}
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                <p className="text-[13px] font-semibold text-[#111] leading-snug">{item.name}</p>
                {item.badge && (
                  <span
                    className="text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full"
                    style={{ background: item.badgeColor ?? '#7B1618' }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              {item.desc && (
                <p className="text-[10px] text-[#AAA] leading-snug mb-0.5">{item.desc}</p>
              )}
              {item.originFlag && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[11px]">{item.originFlag}</span>
                  <span className="text-[9px] text-[#CCC] font-inter">{item.origin}</span>
                </div>
              )}
            </div>

            {/* Price */}
            <PriceTag item={item} />
          </div>
        ))}

        {/* Notes inside card */}
        {(category.note || category.allergyNote) && (
          <div className="px-4 py-2.5 border-t border-[#F5EDE2]" style={{ background: `${category.color}06` }}>
            {category.note && (
              <p className="text-[9.5px] text-[#AAA] leading-snug mb-0.5">
                ℹ︎ {category.note}
              </p>
            )}
            {category.allergyNote && (
              <p className="text-[9.5px] text-[#BBB] leading-snug">
                ⚠ قد تحتوي بعض المنتجات على مسببات الحساسية
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────── Shelf ── */
function ShelfSection() {
  const items = [
    { icon: '🏺', title: 'أكواب الفخار',   desc: 'كوب فخار مصنوع ومرسوم يدوياً بنسخة لك فقط — يُكتب اسمك على الرف مع مميزات حيز الحصرية', color: '#C9956A' },
    { icon: '🌿', title: 'هدايا حيز',       desc: 'حوض فخار مصنوع يدوياً بهوية حيز مع نبتة البوتس — هدية تذكارية مثالية', color: '#2D7D46' },
    { icon: '☕', title: 'محاصيل الرف',    desc: 'اقتنِ محاصيلنا المميزة وتجربها بنفسك من الرف الحصري', color: '#7B1618' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.28 }}
      className="mx-4 mb-6"
    >
      <div className="flex items-center gap-2.5 mb-2.5 px-1">
        <div className="w-7 h-7 rounded-[9px] flex items-center justify-center text-[15px] shrink-0 bg-[#C9956A]/12">
          🏺
        </div>
        <h2 className="text-[13px] font-bold text-[#111]">مبيعات الرف</h2>
        <div className="h-px flex-1 bg-[#C9956A]/20" />
      </div>

      <div className="space-y-2">
        {items.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.52 + i * 0.05 }}
            className="rounded-[16px] px-4 py-3.5 flex items-start gap-3"
            style={{
              background: '#fff',
              border: `1px solid ${s.color}18`,
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            }}
          >
            <div
              className="w-8 h-8 rounded-[10px] flex items-center justify-center text-[15px] shrink-0"
              style={{ background: `${s.color}15` }}
            >
              {s.icon}
            </div>
            <div>
              <p className="text-[12px] font-bold text-[#111] mb-0.5">{s.title}</p>
              <p className="text-[10px] text-[#AAA] leading-snug">{s.desc}</p>
            </div>
          </motion.div>
        ))}
        <p className="text-center text-[9px] text-[#CCC] pt-1.5">✦ ✦ ✦ اسأل الفريق للمزيد</p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────── Main ── */
export function ScreenMenu() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Search filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.trim().toLowerCase();
    const results: { category: MenuCategory; item: MenuItem }[] = [];
    menu.forEach(cat => {
      cat.items.forEach(item => {
        if (
          item.name.toLowerCase().includes(q) ||
          (item.desc && item.desc.toLowerCase().includes(q)) ||
          cat.name.toLowerCase().includes(q) ||
          (item.origin && item.origin.toLowerCase().includes(q))
        ) {
          results.push({ category: cat, item });
        }
      });
    });
    return results;
  }, [searchQuery]);

  const displayed = searchQuery ? null : (activeId ? menu.filter(c => c.id === activeId) : menu);
  const activeCategory = menu.find(c => c.id === activeId);

  const handleCat = (id: string | null) => {
    setActiveId(id);
    setSearchQuery('');
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSearch = () => {
    setSearchQuery('');
    searchRef.current?.blur();
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5EFE8' }}>

      {/* ── Header ── */}
      <div
        className="shrink-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg,#0D0205 0%,#3D0809 42%,#0D0205 75%,#1A0406 100%)' }}
      >
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%,rgba(123,22,24,0.5) 0%,transparent 65%)' }} />
        {/* subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle,#C9956A 1px,transparent 1px)', backgroundSize: '14px 14px' }}
        />
        <div className="relative z-10 flex items-center gap-3 px-4 pt-4 pb-3">
          <img src={logoImg} alt="حيز" className="w-9 h-9 rounded-[11px] object-cover border border-[rgba(201,149,106,0.25)]" />
          <div>
            <p className="text-[#C9956A] text-[9px] font-semibold tracking-[0.12em] uppercase leading-tight">HYZ CAFÉ · ABHA</p>
            <p className="text-white text-[16px] font-bold leading-tight tracking-tight">قائمة حيز</p>
          </div>
          <div className="mr-auto text-right">
            <div className="flex items-center justify-end gap-1 mb-0.5">
              <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
              <p className="text-[#30D158] text-[9px] font-medium">مفتوح الآن</p>
            </div>
            <p className="text-white/25 text-[9px]">٦ص – ٦:٣٠م</p>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative z-10 px-4 pb-3">
          <div
            className="flex items-center gap-2.5 rounded-[14px] px-3.5 py-2.5 transition-all duration-200"
            style={{
              background: searchFocused ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)',
              border: searchFocused ? '1px solid rgba(201,149,106,0.4)' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Search size={14} className="text-white/40 shrink-0" />
            <input
              ref={searchRef}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="ابحث في القائمة..."
              className="flex-1 bg-transparent text-white text-[12px] outline-none placeholder:text-white/25 font-light"
              dir="rtl"
            />
            {searchQuery ? (
              <button onClick={clearSearch} className="shrink-0 w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
                <X size={10} className="text-white/60" />
              </button>
            ) : (
              <span className="text-white/15 text-[9px] font-inter">{menu.reduce((a, c) => a + c.items.length, 0)} صنف</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Category Pills ── */}
      <div className="shrink-0 bg-[#FDFBF7] border-b border-[rgba(196,181,159,0.15)]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div ref={pillsRef} className="flex gap-2 overflow-x-auto scrollbar-none px-4 py-2.5">
          <button
            onClick={() => handleCat(null)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200"
            style={
              activeId === null
                ? { background: 'linear-gradient(135deg,#7B1618,#4A0D0F)', color: '#fff', boxShadow: '0 3px 10px rgba(123,22,24,0.35)' }
                : { background: 'rgba(196,181,159,0.12)', color: '#888' }
            }
          >
            الكل
          </button>
          {menu.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCat(cat.id)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 whitespace-nowrap"
              style={
                activeId === cat.id
                  ? { background: `linear-gradient(135deg,${cat.color},${cat.color}CC)`, color: '#fff', boxShadow: `0 3px 10px ${cat.color}50` }
                  : { background: 'rgba(196,181,159,0.12)', color: '#777' }
              }
            >
              <span className="text-[11px]">{cat.emoji}</span>
              {cat.name}
              {cat.liveLabel && <span className="w-1.5 h-1.5 bg-[#30D158] rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      {/* ── Active category flavor bar ── */}
      <AnimatePresence>
        {activeId && activeCategory && (
          <motion.div
            key={activeId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 overflow-hidden"
          >
            <div
              className="flex items-center gap-2 px-4 py-2"
              style={{ background: `${activeCategory.color}10` }}
            >
              <div
                className="w-5 h-5 rounded-[6px] flex items-center justify-center text-[11px]"
                style={{ background: `${activeCategory.color}20` }}
              >
                {activeCategory.emoji}
              </div>
              <span className="text-[11px] font-semibold" style={{ color: activeCategory.color }}>
                {activeCategory.name}
              </span>
              <span className="text-[10px] text-[#BBB]">· {activeCategory.items.length} أصناف</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Body ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-none pt-4 pb-24">
        <AnimatePresence mode="wait" initial={false}>

          {/* ── Search results ── */}
          {searchQuery && searchResults !== null ? (
            <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {searchResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-8">
                  <div className="text-4xl mb-3">☕</div>
                  <p className="text-[14px] font-semibold text-[#888]">لا نتائج لـ "{searchQuery}"</p>
                  <p className="text-[11px] text-[#CCC] mt-1.5 font-light">جرّب اسماً آخر أو تصفح الكل</p>
                </div>
              ) : (
                <div className="mx-4 mb-4">
                  <p className="text-[11px] text-[#AAA] mb-3 px-1">
                    {searchResults.length} نتيجة لـ "<span className="text-[#7B1618] font-semibold">{searchQuery}</span>"
                  </p>
                  <div className="rounded-[18px] overflow-hidden bg-white border border-[rgba(196,181,159,0.15)]"
                    style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                    <div className="h-[3px]" style={{ background: 'linear-gradient(90deg,#7B1618,#C9956A,transparent)' }} />
                    {searchResults.map(({ category, item }, i) => (
                      <div key={i} className={`flex items-start gap-3 px-4 py-3.5 ${i < searchResults.length - 1 ? 'border-b border-[#F0EBE3]' : ''}`}>
                        <div className="w-6 h-6 rounded-[7px] flex items-center justify-center text-[13px] shrink-0 mt-0.5"
                          style={{ background: `${category.color}15` }}>
                          {category.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                            <p className="text-[13px] font-semibold text-[#111] leading-snug">{item.name}</p>
                            {item.badge && (
                              <span className="text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full"
                                style={{ background: item.badgeColor ?? '#7B1618' }}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[9px] text-[#BBB]" style={{ color: category.color }}>{category.name}</p>
                          {item.desc && <p className="text-[10px] text-[#AAA] mt-0.5 font-light">{item.desc}</p>}
                        </div>
                        <PriceTag item={item} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            /* ── Normal view ── */
            <motion.div
              key={activeId ?? 'all'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {(displayed ?? []).map((cat, i) => (
                <CategorySection key={cat.id} category={cat} index={i} />
              ))}
            </motion.div>
          )}

        </AnimatePresence>

        {/* Shelf */}
        {!searchQuery && activeId === null && <ShelfSection />}

        {/* Footer */}
        <div className="mx-4 mb-2 py-3 rounded-[14px] text-center" style={{ background: 'rgba(255,255,255,0.5)' }}>
          <p className="text-[9px] text-[#CCC]">يحتاج البالغون تقريباً ألفي سعرة حرارية يومياً</p>
        </div>
      </div>
    </div>
  );
}
