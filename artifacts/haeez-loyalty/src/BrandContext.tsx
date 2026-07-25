import React, { createContext, useContext, useState } from 'react';

const BASE = import.meta.env.BASE_URL;

/* ── Brand config shape ─────────────────────────────────────────── */
export interface BrandConfig {
  type: 'restaurant' | 'cafe';
  name: string;
  tagline: string;
  logoImg: string;
  heroImg: string;
  quickOrderMsg: string;
  todaySpecial: {
    badge: string;
    name: string;
    desc: string;
    price: string;
    emoji: string;
    img: string;
    popImg: string;
    popName: string;
    popPrice: string;
  };
  moods: Array<{ id: string; emoji: string; label: string; items: [string, string]; prices: [string, string] }>;
  recentOrders: Array<{ item: string; time: string; pts: string; emoji: string; color: string }>;
  challenge: { title: string; desc: string; progress: number; total: number };
  stats: Array<{ val: string; label: string; icon: string }>;
  streak: { count: string; label: string };
  memberCard: { label: string; sub: string };
  accentColor: string;
}

/* ── Restaurant ─────────────────────────────────────────────────── */
export const RESTAURANT_BRAND: BrandConfig = {
  type: 'restaurant',
  name: 'براون دوز',
  tagline: 'تطبيق · واتساب · محفظة · تقارير',
  logoImg: `${BASE}restaurant-logo.png`,
  heroImg: `${BASE}rest-hero.jpg`,
  quickOrderMsg: 'أريد الطلب',
  todaySpecial: {
    badge: 'طبق اليوم',
    name: 'كبسة الجمبري',
    desc: 'أرز مع جمبري طازج بالبهارات الخليجية — طُبخت الآن',
    price: '٨٥',
    emoji: '🦐',
    img: `${BASE}food-kabsa.jpg`,
    popImg: `${BASE}food-burger.jpg`,
    popName: 'برجر كلاسيك',
    popPrice: '٣٥ر',
  },
  moods: [
    { id: 'grill', emoji: '🥩', label: 'مشويات', items: ['كبسة الجمبري', 'ريش مشوية'],  prices: ['٨٥ ر', '٧٥ ر'] },
    { id: 'salad', emoji: '🥗', label: 'صحي',    items: ['سلطة الجرجير', 'عصير طازج'], prices: ['٤٠ ر', '٢٥ ر'] },
    { id: 'sweet', emoji: '🍰', label: 'حلويات', items: ['تشيز كيك', 'بان كيك'],       prices: ['٣٥ ر', '٣٠ ر'] },
    { id: 'drink', emoji: '🥤', label: 'مشروب',  items: ['لاتيه', 'ماتشا'],            prices: ['٢٥ ر', '٢٨ ر'] },
    { id: 'fast',  emoji: '🍔', label: 'سريع',   items: ['برجر كلاسيك', 'بطاطا'],      prices: ['٣٥ ر', '٢٠ ر'] },
  ],
  recentOrders: [
    { item: 'كبسة الجمبري',        time: 'اليوم، ١١:٢٠ص', pts: '+٢٥', emoji: '🦐', color: '#7B1618' },
    { item: 'برجر كلاسيك + لاتيه', time: 'أمس، ٣:٠٠م',    pts: '+١٥', emoji: '🍔', color: '#7A3B18' },
    { item: 'تشيز كيك + قهوة',    time: 'الأحد، ١٠:٤٥ص', pts: '+١٢', emoji: '🎂', color: '#2D7D46' },
  ],
  challenge: { title: 'تحدي الأسبوع: ٥ طلبات', desc: '٤ من ٥ — طلب واحد فقط للفوز بوجبة مجانية', progress: 4, total: 5 },
  stats: [
    { val: '١٢', label: 'زيارة',       icon: '🏠' },
    { val: '٨',  label: 'هذا الشهر',  icon: '📅' },
    { val: '٦٥', label: 'ريال توفير', icon: '💰' },
  ],
  streak: { count: '٧', label: '٧ أيام متواصلة' },
  memberCard: { label: 'براون دوز', sub: 'عضوية كلاسيكية' },
  accentColor: '#7B1618',
};

/* ── Cafe (generic) ─────────────────────────────────────────────── */
export const CAFE_BRAND: BrandConfig = {
  type: 'cafe',
  name: 'كوفيك',
  tagline: 'تطبيق · واتساب · محفظة · تقارير',
  logoImg: `${BASE}hyz-logo.jpeg`,
  heroImg: `${BASE}cafe-1.jpeg`,
  quickOrderMsg: 'أريد قهوة',
  todaySpecial: {
    badge: 'قهوة اليوم',
    name: 'لاتيه الكراميل المثلج',
    desc: 'إسبريسو مع الكراميل والحليب المثلج — خاص الصبح',
    price: '٢٨',
    emoji: '☕',
    img: `${BASE}food-latte.jpg`,
    popImg: `${BASE}food-cheesecake.jpg`,
    popName: 'تشيز كيك',
    popPrice: '٣٥ر',
  },
  moods: [
    { id: 'hot',    emoji: '☕', label: 'هادي',   items: ['لاتيه', 'أمريكانو'],         prices: ['٢٥ ر', '٢٠ ر'] },
    { id: 'cold',   emoji: '🧊', label: 'بارد',   items: ['فرابتشينو', 'ماتشا لاتيه'],  prices: ['٣٠ ر', '٢٨ ر'] },
    { id: 'sweet',  emoji: '🍰', label: 'حلى',    items: ['تشيز كيك', 'كرواسون'],       prices: ['٣٥ ر', '٢٠ ر'] },
    { id: 'light',  emoji: '🥗', label: 'خفيف',   items: ['توست بالزبدة', 'عصير طازج'], prices: ['١٨ ر', '٢٠ ر'] },
    { id: 'quick',  emoji: '⚡', label: 'سريع',   items: ['إسبريسو', 'قهوة تركي'],      prices: ['١٥ ر', '١٢ ر'] },
  ],
  recentOrders: [
    { item: 'لاتيه الكراميل + كرواسون', time: 'اليوم، ٨:٣٠ص', pts: '+١٥', emoji: '☕', color: '#7B1618' },
    { item: 'ماتشا لاتيه',              time: 'أمس، ٤:٠٠م',    pts: '+١٠', emoji: '🍵', color: '#2D7D46' },
    { item: 'تشيز كيك + قهوة',         time: 'الأحد، ١٠:٠٠ص', pts: '+١٢', emoji: '🎂', color: '#B5651D' },
  ],
  challenge: { title: 'تحدي الأسبوع: ٧ كوبات', desc: '٥ من ٧ — كوبان للفوز بقهوة مجانية', progress: 5, total: 7 },
  stats: [
    { val: '٣٤', label: 'كوب',         icon: '☕' },
    { val: '١٢', label: 'هذا الشهر',  icon: '📅' },
    { val: '٨٠', label: 'ريال توفير', icon: '💰' },
  ],
  streak: { count: '١٢', label: '١٢ يوماً متواصلاً' },
  memberCard: { label: 'كوفيك', sub: 'عضوية كلاسيكية' },
  accentColor: '#7B1618',
};

/* ── Brown Dose ─────────────────────────────────────────────────── */
export const BROWNDOSE_BRAND: BrandConfig = {
  type: 'cafe',
  name: 'Brown Dose',
  tagline: 'قهوة مختصة · جيزان',
  logoImg: `${BASE}bd-logo.svg`,
  heroImg: `${BASE}cafe-1.jpeg`,
  quickOrderMsg: 'أريد طلب',
  todaySpecial: {
    badge: 'الأشهر اليوم',
    name: 'أفقاتو براون',
    desc: 'شوت إسبريسو فوق الآيس كريم — الطعم اللي يميزنا',
    price: '٢٥',
    emoji: '🍫',
    img: `${BASE}bd-affogato.jpg`,
    popImg: `${BASE}bd-ice-stretcher.jpg`,
    popName: 'ايس ستفتشر براون',
    popPrice: '١٩ر',
  },
  moods: [
    { id: 'hot',    emoji: '☕', label: 'حار',    items: ['لاتيه', 'كراميل لاتيه'],       prices: ['١٧ ر', '٢٠ ر'] },
    { id: 'cold',   emoji: '🧊', label: 'بارد',   items: ['ايس لاتيه', 'موهيتو روز'],     prices: ['١٨ ر', '١٧ ر'] },
    { id: 'brown',  emoji: '🍫', label: 'براون',  items: ['أفقاتو براون', 'ستفتشر براون'], prices: ['٢٥ ر', '١٩ ر'] },
    { id: 'filter', emoji: '🫘', label: 'مقطرة',  items: ['أثيوبي هنيبلا', 'بن يمني'],    prices: ['١٧ ر', '١٩ ر'] },
    { id: 'quick',  emoji: '⚡', label: 'سريع',   items: ['اسبريسو', 'امريكانو'],          prices: ['١٠ ر', '١٢ ر'] },
  ],
  recentOrders: [
    { item: 'أفقاتو براون',       time: 'اليوم، ٩:١٥ص',  pts: '+١٥', emoji: '🍫', color: '#6B3210' },
    { item: 'كراميل لاتيه بارد',  time: 'أمس، ٥:٣٠م',    pts: '+١٢', emoji: '☕', color: '#7A3B28' },
    { item: 'موهيتو روز يري',     time: 'السبت، ٣:٠٠م',  pts: '+١٠', emoji: '🌹', color: '#A0495C' },
  ],
  challenge: { title: 'تحدي الأسبوع: ٧ كوبات', desc: '٥ من ٧ — كوبان للفوز بقهوة مجانية', progress: 5, total: 7 },
  stats: [
    { val: '٢٨', label: 'كوب',        icon: '☕' },
    { val: '١١', label: 'هذا الشهر', icon: '📅' },
    { val: '٧٠', label: 'ريال توفير', icon: '💰' },
  ],
  streak: { count: '٩', label: '٩ أيام متواصلة' },
  memberCard: { label: 'Brown Dose', sub: 'عضوية براون' },
  accentColor: '#6B3210',
};

/* ── Context ────────────────────────────────────────────────────── */
interface BrandCtx {
  brand: BrandConfig;
  setBrand: (b: BrandConfig) => void;
}

const Ctx = createContext<BrandCtx>({ brand: RESTAURANT_BRAND, setBrand: () => {} });

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState<BrandConfig>(BROWNDOSE_BRAND);
  return <Ctx.Provider value={{ brand, setBrand }}>{children}</Ctx.Provider>;
}

export const useBrand = () => useContext(Ctx);
