/**
 * HaizIcons — أيقونات SVG بهوية حيز
 * جميع الأيقونات: stroke-based، خط ناعم، متسقة بصرياً
 */
import React from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  sw?: number;  // stroke width
  opacity?: number;
}

const S = (size: number, color: string, sw: number) => ({
  width: size, height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color,
  strokeWidth: sw,
  strokeLinecap: 'round'  as const,
  strokeLinejoin: 'round' as const,
});

/* ══════════════════════════════ COFFEE & DRINKS ══ */

/** إسبريسو — كوب مع صحن وبخار */
export const IEspresso = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <path d="M7.5 10h9l-1.5 8h-6L7.5 10z" />
    <path d="M16.5 12.5c3 0 3 5 0 5" />
    <path d="M5 19h14" />
    <path d="M10 8c0-1.5 1-1 1-2.5" strokeOpacity=".4" />
    <path d="M13 8c0-1.5 1-1 1-2.5" strokeOpacity=".4" />
  </svg>
);

/** فلتر / شيميكس — قهوة اليوم */
export const IFilter = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <rect x="9" y="3" width="6" height="2.5" rx="1" />
    <path d="M9 5.5L5.5 18h13L15 5.5" />
    <line x1="12" y1="5.5" x2="12" y2="18" strokeOpacity=".35" />
    <path d="M10.5 18v2M13.5 18v2" strokeOpacity=".5" />
    <path d="M9.5 20h5" />
  </svg>
);

/** حليب / لاتيه */
export const IMilk = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <path d="M8 5h8l-1 14H9L8 5z" />
    <path d="M8.5 12.5c1.5-2 5-2 7 0" strokeOpacity=".5" />
    <line x1="14.5" y1="4.5" x2="13.5" y2="19.5" strokeOpacity=".25" />
  </svg>
);

/** مقطّرة V60 */
export const IPourOver = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <path d="M6 5h12L13.5 18h-3L6 5z" />
    <line x1="12" y1="5" x2="12" y2="18" strokeOpacity=".3" />
    <path d="M8 9h8" strokeOpacity=".3" />
    <path d="M9.5 18v2.5M14.5 18v2.5" strokeOpacity=".5" />
    <path d="M8.5 20.5h7" />
  </svg>
);

/** مشروب بارد — كوب طويل مع قشّة وثلج */
export const ICold = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <path d="M7.5 6h9l-1 14h-7L7.5 6z" />
    <line x1="15" y1="3.5" x2="13" y2="20.5" strokeOpacity=".6" />
    <path d="M9 11l2.5 2.5"  strokeOpacity=".45" />
    <path d="M11.5 9l2.5 2.5" strokeOpacity=".45" />
    <path d="M9 15l2 2"      strokeOpacity=".3" />
  </svg>
);

/** مشروب ساخن — ماغ مع بخار */
export const IHotMug = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <rect x="4" y="9" width="13" height="10" rx="2" />
    <path d="M17 11.5c2.5 0 2.5 5 0 5" />
    <path d="M8 7c0-1.5 1-1.5 1-3" strokeOpacity=".4" />
    <path d="M12 7c0-1.5 1-1.5 1-3" strokeOpacity=".4" />
  </svg>
);

/** إبريق شاي */
export const ITeapot = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <path d="M9 8h6l1 9H8L9 8z" />
    <path d="M9 8c0-2 6-2 6 0" />
    <path d="M15 10.5c2.5-.5 4-2.5 3-4.5" />
    <path d="M7 20h10" />
    <line x1="12" y1="17" x2="12" y2="20" strokeOpacity=".35" />
  </svg>
);

/* ══════════════════════════════ PASTRIES ══ */

/** كرواسون */
export const ICroissant = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <path d="M4 14C3 8 8 3 14 4l2 2-2 1C9 7 6 11 7 16l-1 2-2-4z" />
    <path d="M20 14c1-6-4-11-10-10L8 6l2 1c5 0 8 4 7 9l1 2 2-4z" />
    <path d="M7 16c1-3 4-5 5-5s4 2 5 5" strokeOpacity=".45" />
  </svg>
);

/** دانيش — معجنات */
export const IDanish = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <rect x="4" y="6" width="16" height="12" rx="3" />
    <path d="M8.5 12.5A3.5 3.5 0 0 1 12 9a3.5 3.5 0 0 1 3.5 3.5A3.5 3.5 0 0 1 12 16" strokeOpacity=".5" />
    <circle cx="12" cy="12" r="1.8" fill={color} stroke="none" />
  </svg>
);

/** كيك — قطعة كيك */
export const ICake = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <path d="M5 19V10.5L12 4l7 6.5V19H5z" />
    <line x1="5" y1="14" x2="19" y2="14" strokeOpacity=".4" />
    <line x1="5.5" y1="10.5" x2="18.5" y2="10.5" strokeOpacity=".25" />
    <line x1="12" y1="4" x2="12" y2="19" strokeOpacity=".15" />
    <circle cx="12" cy="4" r="1.2" fill={color} stroke="none" />
  </svg>
);

/** فطور — طبق وشوكة */
export const IBreakfast = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <circle cx="12" cy="13" r="7" />
    <circle cx="12" cy="13" r="4" strokeOpacity=".3" />
    <line x1="8"  y1="3" x2="8"  y2="9" />
    <path d="M6 3v5c0 1.5 4 1.5 4 0V3" strokeOpacity=".6" />
    <line x1="16" y1="3" x2="16" y2="9" />
  </svg>
);

/* ══════════════════════════════ SHELF ══ */

/** رف — جرّة فخار */
export const IVase = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <path d="M9 4h6v2c1 1 2 3 2 6s-1 5-2 6H9c-1-1-2-3-2-6s1-5 2-6V4z" />
    <line x1="9" y1="4" x2="15" y2="4" />
    <line x1="7.5" y1="11" x2="16.5" y2="11" strokeOpacity=".35" />
    <line x1="8"   y1="14" x2="16"   y2="14" strokeOpacity=".25" />
  </svg>
);

/** نبتة / ورقة */
export const ILeaf = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

/** حبة بن قهوة */
export const ICoffeeBean = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <ellipse cx="12" cy="12" rx="7" ry="4.5" transform="rotate(-35 12 12)" />
    <path d="M9 9.5C10 11 12 12 13 14.5" strokeOpacity=".45" />
  </svg>
);

/* ══════════════════════════════ CALENDAR EVENTS ══ */

/** شمس — الإجازة الصيفية */
export const ISun = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <circle cx="12" cy="12" r="4.5" />
    <line x1="12" y1="2"  x2="12" y2="5"  />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="2"  y1="12" x2="5"  y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="5.6"  y1="5.6"  x2="7.8"  y2="7.8"  />
    <line x1="16.2" y1="16.2" x2="18.4" y2="18.4" />
    <line x1="18.4" y1="5.6"  x2="16.2" y2="7.8"  />
    <line x1="7.8"  y1="16.2" x2="5.6"  y2="18.4" />
  </svg>
);

/** نجمة — اليوم الوطني */
export const IStar = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)} fill={color} fillOpacity=".15">
    <polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3" />
  </svg>
);

/** كتاب — بداية الدراسة */
export const IBook = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <path d="M4 4h7c1 0 1 1 1 1v15s-1-1-1-1H4V4z" />
    <path d="M20 4h-7c-1 0-1 1-1 1v15s1-1 1-1h7V4z" />
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="7"  y1="9"  x2="10" y2="9"  strokeOpacity=".4" />
    <line x1="7"  y1="12" x2="10" y2="12" strokeOpacity=".4" />
    <line x1="14" y1="9"  x2="17" y2="9"  strokeOpacity=".4" />
    <line x1="14" y1="12" x2="17" y2="12" strokeOpacity=".4" />
  </svg>
);

/** ندفة ثلج — إجازة الشتاء */
export const ISnowflake = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <line x1="12" y1="2"  x2="12" y2="22" />
    <line x1="2"  y1="12" x2="22" y2="12" />
    <line x1="4.9" y1="4.9"  x2="19.1" y2="19.1" />
    <line x1="19.1" y1="4.9" x2="4.9"  y2="19.1" />
    <path d="M12 2l-1.5 3M12 2l1.5 3" />
    <path d="M12 22l-1.5-3M12 22l1.5-3" />
    <path d="M2 12l3 1.5M2 12l3-1.5" />
    <path d="M22 12l-3 1.5M22 12l-3-1.5" />
  </svg>
);

/** هدف — إجازة النصف */
export const ICompass = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" strokeOpacity=".5" />
    <circle cx="12" cy="12" r="1.5" fill={color} stroke="none" />
    <line x1="12" y1="3"  x2="12" y2="7"  strokeOpacity=".35" />
    <line x1="12" y1="17" x2="12" y2="21" strokeOpacity=".35" />
    <line x1="3"  y1="12" x2="7"  y2="12" strokeOpacity=".35" />
    <line x1="17" y1="12" x2="21" y2="12" strokeOpacity=".35" />
  </svg>
);

/** عمد — يوم التأسيس */
export const IArch = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <line x1="2"  y1="21" x2="22" y2="21" />
    <line x1="5"  y1="8"  x2="5"  y2="21" />
    <line x1="19" y1="8"  x2="19" y2="21" />
    <path d="M5 8C5 3.5 19 3.5 19 8" />
    <line x1="9"  y1="8"  x2="9"  y2="21" strokeOpacity=".4" />
    <line x1="15" y1="8"  x2="15" y2="21" strokeOpacity=".4" />
    <line x1="3"  y1="8"  x2="21" y2="8"  strokeOpacity=".5" />
    <line x1="12" y1="3.5" x2="12" y2="8"  strokeOpacity=".3" />
  </svg>
);

/** هلال — عيد الفطر */
export const ICrescent = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)} fill={color} fillOpacity=".12">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    <circle cx="17.5" cy="5.5" r="1.2" fill={color} stroke="none" fillOpacity="1" />
  </svg>
);

/** هدية */
export const IGift = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <rect x="3" y="9" width="18" height="13" rx="1.5" />
    <path d="M3 13h18" />
    <line x1="12" y1="9" x2="12" y2="22" />
    <path d="M12 9C12 9 9 9 8 7.5 7.2 6.2 8 5 9 5c1.5 0 2.5 2 3 4z" />
    <path d="M12 9C12 9 15 9 16 7.5 16.8 6.2 16 5 15 5c-1.5 0-2.5 2-3 4z" />
  </svg>
);

/* ══════════════════════════════ UI UTILITY ══ */

/** تقويم */
export const ICalendarIcon = ({ size=20, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <line x1="3"  y1="10" x2="21" y2="10" />
    <line x1="8"  y1="3"  x2="8"  y2="7"  />
    <line x1="16" y1="3"  x2="16" y2="7"  />
    <circle cx="8"  cy="14" r=".9" fill={color} stroke="none" />
    <circle cx="12" cy="14" r=".9" fill={color} stroke="none" />
    <circle cx="16" cy="14" r=".9" fill={color} stroke="none" />
    <circle cx="8"  cy="17" r=".9" fill={color} stroke="none" />
    <circle cx="12" cy="17" r=".9" fill={color} stroke="none" />
  </svg>
);

/** موقع / أصل البن */
export const IOriginPin = ({ size=14, color='currentColor', sw=1.5 }: IconProps) => (
  <svg {...S(size, color, sw)}>
    <path d="M12 2C8.7 2 6 4.7 6 8c0 5 6 12 6 12s6-7 6-12c0-3.3-2.7-6-6-6z" />
    <circle cx="12" cy="8" r="2.2" />
  </svg>
);

/* ══════════════════════════════ ICON MAP ══ */
export const CategoryIconMap: Record<string, React.FC<IconProps>> = {
  espresso:  IEspresso,
  filter:    IFilter,
  milk:      IMilk,
  pour:      IPourOver,
  cold:      ICold,
  winter:    IHotMug,
  other:     ITeapot,
  croissant: ICroissant,
  danish:    IDanish,
  cake:      ICake,
  breakfast: IBreakfast,
};

export const EventIconMap: Record<string, React.FC<IconProps>> = {
  summer:   ISun,
  national: IStar,
  school:   IBook,
  winter:   ISnowflake,
  midyear:  ICompass,
  founding: IArch,
  eid:      ICrescent,
};

export const ShelfIconMap: Record<string, React.FC<IconProps>> = {
  vase:  IVase,
  leaf:  ILeaf,
  bean:  ICoffeeBean,
};
