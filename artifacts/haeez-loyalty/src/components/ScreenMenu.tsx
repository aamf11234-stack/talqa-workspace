import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Flame, Snowflake } from 'lucide-react';
import { CategoryIconMap, IOriginPin, IVase, ILeaf, ICoffeeBean, IEspresso } from './HaizIcons';

const logoImg = `${import.meta.env.BASE_URL}hyz-logo.jpeg`;

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
    id: 'espresso', name: 'إسبريسو', nameEn: 'ESPRESSO', color: '#7B1618',
    items: [
      { name: 'إسبريسو أثيوبي',   desc: 'تفاح مجفف · برتقال · كرز · ورد',         origin: 'إثيوبيا',  originFlag: '🇪🇹', price: 12, badge: 'تجفيف مطول', badgeColor: '#7B1618', featured: true },
      { name: 'إسبريسو يمني',     desc: 'بطيخ · توت · برتقال',                      origin: 'اليمن',    originFlag: '🇾🇪', price: 15 },
      { name: 'إسبريسو كولومبي',  desc: 'جوز الهند · برتقال · شوكولاتة · أزهار',  origin: 'كولومبيا', originFlag: '🇨🇴', price: 17 },
      { name: 'إسبريسو الجمعة',   desc: 'فواكه استوائية · توت · لوز · أزهار',      origin: 'السعودية', originFlag: '🇸🇦', price: 14, badge: 'الجمعة فقط', badgeColor: '#C9956A' },
    ],
  },
  {
    id: 'filter', name: 'قهوة اليوم', nameEn: 'FILTER', color: '#2D7D46', liveLabel: true,
    items: [
      { name: 'نيكاراغوا',           desc: 'كراميل ناعم · مكسرات',          origin: 'نيكاراغوا', originFlag: '🇳🇮', priceHot: 10, priceCold: 11 },
      { name: 'إثيوبيا يرقاشيفي',   desc: 'زهري · توت · برتقال', origin: 'إثيوبيا',   originFlag: '🇪🇹', priceHot: 11, priceCold: 12, featured: true },
      { name: 'الصين',               desc: 'أرضي · جوز',                    origin: 'الصين',     originFlag: '🇨🇳', priceHot: 13, priceCold: 14 },
    ],
  },
  {
    id: 'milk', name: 'بالحليب', nameEn: 'MILK BASED', color: '#B5651D',
    note: 'تكهة للبارد: كراميل · موكا · بستاشيو',
    items: [
      { name: 'بيكولو',     price: 14 },
      { name: 'كورتادو',    priceHot: 14, priceCold: 15 },
      { name: 'فلات وايت', priceHot: 15, priceCold: 17 },
      { name: 'لاتيه',     priceHot: 17, priceCold: 19 },
      { name: 'قهوة حيز',  desc: 'خلطة حيز الحصرية', priceHot: 19, priceCold: 21, badge: 'الأشهر', badgeColor: '#7B1618', featured: true },
    ],
  },
  {
    id: 'pour', name: 'مقطرة', nameEn: 'POUR OVER', color: '#1A5276',
    note: 'حجم كوب أكبر بريالين إضافية',
    items: [
      { name: 'مقطرة يمني في ٦٠',    desc: 'معالجة عميقة · ٦٠ دقيقة', origin: 'اليمن',    originFlag: '🇾🇪', priceHot: 18, priceCold: 19 },
      { name: 'مقطرة كولومبي في ٦٠', desc: 'معالجة عميقة · ٦٠ دقيقة', origin: 'كولومبيا', originFlag: '🇨🇴', priceHot: 20, priceCold: 21, featured: true },
    ],
  },
  {
    id: 'cold', name: 'مشروبات باردة', nameEn: 'COLD DRINKS', color: '#0E6B8A',
    items: [
      { name: 'كوكدية حبحب',            price: 18 },
      { name: 'ماتشا حلوه',             price: 18, featured: true },
      { name: 'باشن فروت بالشاي المثلج', price: 16 },
      { name: 'عصير برتقال',            price: 15 },
    ],
  },
  {
    id: 'winter', name: 'مشروبات الشتاء', nameEn: 'WINTER', color: '#4A6274',
    items: [
      { name: 'شوكولاتة ساخنة',        desc: 'سعة كوب واحد', price: 22 },
      { name: 'شوكولاتة ساخنة مشتركة', desc: 'سعة كوبين',    price: 39, featured: true },
    ],
  },
  {
    id: 'other', name: 'أخرى', nameEn: 'OTHERS', color: '#6C3483',
    items: [
      { name: 'شاي أنجليزي',   price: 5  },
      { name: 'أفوقاتو',        price: 17 },
      { name: 'تصبيرة سعودية', desc: 'تمر وقشطة', price: 7 },
    ],
  },
  {
    id: 'croissant', name: 'كرواسون', nameEn: 'CROISSANT', color: '#C9956A', allergyNote: true,
    items: [
      { name: 'سينابون',              price: 15, featured: true },
      { name: 'لوز بالشوكولاتة الداكن', price: 12 },
      { name: 'كاسترد فراولة',         price: 10 },
      { name: 'فيونكة التشيز توت',      price: 15 },
    ],
  },
  {
    id: 'danish', name: 'دانيش', nameEn: 'DANISH', color: '#C8930A', allergyNote: true,
    items: [
      { name: 'موز مكرمل',          price: 14 },
      { name: 'لافندر وتوت أزرق',   price: 15, featured: true },
      { name: 'حلوي بحشوة البيتزا', price: 15 },
    ],
  },
  {
    id: 'cake', name: 'كيك', nameEn: 'CAKE', color: '#922B21', allergyNote: true,
    items: [
      { name: 'كيكة حيز بالشوكولاتة', price: 23 },
      { name: 'كيكة حيز بالبيكان',    price: 25, badge: 'الأشهر', badgeColor: '#C9956A', featured: true },
      { name: 'تيراميسو براونيز',      price: 16 },
      { name: 'حلى الأسبوع',          desc: 'اسأل الكاشير', price: 14, badge: 'متغير', badgeColor: '#30D158' },
    ],
  },
  {
    id: 'breakfast', name: 'الفطور', nameEn: 'BREAKFAST', color: '#117A65',
    items: [
      { name: 'بوراتا زعتر', desc: 'مع خبز الفوكاتشيا الإيطالي', price: 22, featured: true },
      { name: 'حلوي ترافل',  price: 19 },
      { name: 'ساوردو',      desc: 'خبز خمر طبيعي بقشرة مقرمشة', price: 22 },
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
      <span className="text-[15px] font-black font-inter tabular-nums" style={{ color: '#7B1618' }}>{item.price}</span>
      <span className="text-[9px] text-[#BBA890] mr-0.5">ر</span>
    </div>
  );
}

/* ══════════════════════════════════════════ SECTION ══ */
function Section({ cat, index }: { cat: MenuCategory; index: number }) {
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
        {cat.items.map((item, i) => (
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

            {/* Price */}
            <Price item={item} />
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
    title: 'هدايا حيز',
    desc: 'حوض فخار بهوية حيز مع نبتة البوتس — هدية تذكارية مثالية',
    tag: 'هدية',
    color: '#2D7D46',
  },
  {
    IconComp: ICoffeeBean,
    title: 'محاصيل الرف',
    desc: 'اقتنِ محاصيلنا المميزة من الرف الحصري وجرّبها بنفسك',
    tag: 'محدود',
    color: '#7B1618',
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
      <div className="mb-4 opacity-30"><IEspresso size={52} color="#7B1618" sw={1.2} /></div>
      <p className="text-[14px] font-bold text-[#888]">لا نتائج لـ "{query}"</p>
      <p className="text-[11px] text-[#CCC] mt-1.5">جرّب اسماً آخر</p>
      <button onClick={onClear} className="mt-4 text-[11px] font-bold" style={{ color: '#7B1618' }}>تصفح الكل</button>
    </div>
  );

  return (
    <div className="px-5 pt-3">
      <p className="text-[10px] text-[#AAA] mb-4">
        {results.length} نتيجة لـ "<span className="font-bold" style={{ color: '#7B1618' }}>{query}</span>"
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
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [heroScrolled, setHeroScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

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
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#FAF7F3' }}>

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
              src={logoImg}
              alt="حيز"
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
              style={{ fontFamily: 'ui-monospace, monospace' }}>HYZ CAFÉ · ABHA</p>
            <h1 className="text-[28px] font-black text-white leading-none tracking-tight">قائمة حيز</h1>
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
              ? { background: 'linear-gradient(135deg,#3D0809,#7B1618)', color: '#fff', boxShadow: '0 3px 12px rgba(123,22,24,0.3)' }
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
                <Section key={cat.id} cat={cat} index={i} />
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
