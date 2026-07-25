import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomNav } from './components/BottomNav';
import type { Tab } from './components/BottomNav';
import { ScreenMembership }    from './components/ScreenMembership';
import { ScreenPerks }         from './components/ScreenPerks';
import { ScreenNotifications } from './components/ScreenNotifications';
import { ScreenHome }          from './components/ScreenHome';
import { ScreenOrders }        from './components/ScreenOrders';
import { ScreenMenu }          from './components/ScreenMenu';
import { ScreenReservations }  from './components/ScreenReservations';
import { AppleWatchHyz }       from './components/AppleWatch';
import { OwnerDashboard, MobileOwnerSummary } from './components/OwnerDashboard';
import { useShakeDetect, FlashDealModal } from './components/ShakeReveal';
import { BrandProvider, useBrand, RESTAURANT_BRAND, BROWNDOSE_BRAND } from './BrandContext';
import { OrdersProvider } from './OrdersContext';

/* ══════════════════════════════════════════════════════════════════
   Aurora Background — animated gradient orbs
════════════════════════════════════════════════════════════════════ */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Orb 1 — warm amber top-right */}
      <div className="absolute animate-aurora-1"
        style={{ top: '-8%', right: '-5%', width: 520, height: 520, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(180,90,20,0.38) 0%,rgba(140,60,10,0.12) 45%,transparent 70%)',
          filter: 'blur(60px)' }} />
      {/* Orb 2 — deep crimson bottom-left */}
      <div className="absolute animate-aurora-2"
        style={{ bottom: '10%', left: '-8%', width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(100,12,20,0.55) 0%,rgba(60,5,10,0.18) 50%,transparent 70%)',
          filter: 'blur(55px)' }} />
      {/* Orb 3 — golden accent center */}
      <div className="absolute animate-aurora-3"
        style={{ top: '30%', left: '40%', width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(196,149,60,0.22) 0%,rgba(160,100,30,0.06) 55%,transparent 75%)',
          filter: 'blur(45px)' }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Coffee Particles — floating coffee beans/drops
════════════════════════════════════════════════════════════════════ */
const PARTICLE_DATA = [
  { emoji:'☕', x:12, delay:0,    dur:5.5, size:16 },
  { emoji:'✦',  x:28, delay:1.2,  dur:7,   size:10 },
  { emoji:'☕', x:55, delay:2.1,  dur:6.2, size:13 },
  { emoji:'·',  x:70, delay:0.5,  dur:4.8, size:18 },
  { emoji:'✦',  x:82, delay:3.3,  dur:6.8, size:9  },
  { emoji:'☕', x:40, delay:4,    dur:5.2, size:11 },
  { emoji:'·',  x:93, delay:1.8,  dur:7.4, size:20 },
  { emoji:'✦',  x:7,  delay:2.7,  dur:6,   size:8  },
];

function CoffeeParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {PARTICLE_DATA.map((p, i) => (
        <div
          key={i}
          className="absolute bottom-0 select-none"
          style={{
            left: `${p.x}%`,
            fontSize: p.size,
            opacity: 0.45,
            animation: `coffee-rise ${p.dur}s ease-in ${p.delay}s infinite`,
            color: p.emoji === '☕' ? 'rgba(180,100,30,0.7)' : 'rgba(200,150,80,0.5)',
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}

/* ── Word-by-word headline reveal ─────────────────────────────── */
function RevealHeadline({ children, className, style }: { children: string; className?: string; style?: React.CSSProperties }) {
  const words = children.split(' ');
  return (
    <span className={className} style={{ ...style, unicodeBidi: 'embed' }} dir="rtl" aria-label={children}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 22, skewY: 3 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block" style={{ width: '0.3em' }} />}
        </React.Fragment>
      ))}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Phone Screens — instant strip slide (no remount, CSS only)
════════════════════════════════════════════════════════════════════ */
const TAB_ORDER = ['home', 'menu', 'card', 'orders', 'reservations'] as const;
type TabKey = typeof TAB_ORDER[number];

function PhoneScreens({ activeTab, onShakeTrigger }: { activeTab: TabKey; onShakeTrigger: () => void }) {
  const idx = TAB_ORDER.indexOf(activeTab);

  return (
    <div className="flex-1 relative overflow-hidden h-full">
      {/* Horizontal strip — all 5 screens side by side, slide the strip */}
      <div
        style={{
          display: 'flex',
          width: `${TAB_ORDER.length * 100}%`,
          height: '100%',
          transform: `translateX(-${(idx / TAB_ORDER.length) * 100}%)`,
          transition: 'transform 260ms cubic-bezier(0.4,0,0.2,1)',
          willChange: 'transform',
        }}
      >
        {TAB_ORDER.map(tab => (
          <div
            key={tab}
            style={{ width: `${100 / TAB_ORDER.length}%`, height: '100%', flexShrink: 0, overflowY: 'auto' }}
            className="scrollbar-none"
          >
            {tab === 'home'         && <ScreenHome onShakeTrigger={onShakeTrigger} />}
            {tab === 'menu'         && <ScreenMenu />}
            {tab === 'card'         && <ScreenMembership />}
            {tab === 'orders'       && <ScreenOrders />}
            {tab === 'reservations' && <ScreenReservations />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Brand toggle (inside BrandProvider) ──────────────────────── */
function BrandToggle() {
  const { brand, setBrand } = useBrand();
  const isRest = brand.type === 'restaurant';

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex items-center justify-center mb-6"
    >
      <div className="relative flex items-center p-1 rounded-full gap-0"
        style={{
          background: 'rgba(255,255,255,0.55)',
          border: '1px solid rgba(196,181,159,0.35)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}>

        {/* Sliding indicator */}
        <motion.div
          className="absolute top-1 bottom-1 rounded-full"
          style={{
            background: 'linear-gradient(135deg,#0C0002,#280407)',
            boxShadow: '0 2px 12px rgba(160,82,45,0.35)',
          }}
          animate={{ right: isRest ? '4px' : '50%', left: isRest ? '50%' : '4px' }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        />

        {/* Restaurant */}
        <button
          onClick={() => setBrand(RESTAURANT_BRAND)}
          className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold transition-colors"
          style={{ color: isRest ? '#7A3B18' : '#999' }}
        >
          <span className="text-[15px] leading-none">🍽️</span>
          مطعم
        </button>

        {/* Cafe — Brown Dose */}
        <button
          onClick={() => setBrand(BROWNDOSE_BRAND)}
          className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold transition-colors"
          style={{ color: !isRest ? '#5C2A0E' : '#999' }}
        >
          <span className="text-[15px] leading-none">☕</span>
          Brown Dose
        </button>
      </div>
    </motion.div>
  );
}

const cafeImg1      = `${import.meta.env.BASE_URL}bd-hero.jpg`;
const imgExterior   = `${import.meta.env.BASE_URL}rest-exterior.jpg`;
const imgAffogato   = `${import.meta.env.BASE_URL}bd-affogato.jpg`;
const imgIceStr     = `${import.meta.env.BASE_URL}bd-ice-stretcher.jpg`;
const imgFilter     = `${import.meta.env.BASE_URL}bd-filter.jpg`;
const imgMohito     = `${import.meta.env.BASE_URL}bd-mohito.jpg`;
const imgPistachio  = `${import.meta.env.BASE_URL}bd-pistachio.jpg`;
const imgLoyalty    = `${import.meta.env.BASE_URL}loyalty-card.jpg`;

/* ── App Store badges ─────────────────────────────────────────────── */
function AppleBadge() {
  return (
    <a href="#" className="flex items-center gap-2.5 bg-[#111] text-white rounded-[14px] px-4 py-3 hover:bg-[#222] active:scale-95 transition-all duration-150 border border-white/8 shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white shrink-0">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="leading-tight text-right">
        <p className="text-[9px] text-white/40 font-light">تحميل على</p>
        <p className="text-[14px] font-semibold tracking-tight">App Store</p>
      </div>
    </a>
  );
}

function PlayBadge() {
  return (
    <a href="#" className="flex items-center gap-2.5 bg-[#111] text-white rounded-[14px] px-4 py-3 hover:bg-[#222] active:scale-95 transition-all duration-150 border border-white/8 shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
      <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      <div className="leading-tight text-right">
        <p className="text-[9px] text-white/40 font-light">تحميل على</p>
        <p className="text-[14px] font-semibold tracking-tight">Google Play</p>
      </div>
    </a>
  );
}

/* ── Pillars ──────────────────────────────────────────────────────── */
const pillars = [
  { icon: '☕', title: 'منيو براون دوز',       sub: 'حار · بارد · مقطرة',   desc: 'كل الأصناف بالأسعار الحقيقية',          bg: 'linear-gradient(145deg,#0D0205,#3D0809,#0D0205)', img: `${import.meta.env.BASE_URL}bd-affogato.jpg` },
  { icon: '🛵', title: 'توصيل واستلام',        sub: 'صبيا وضمد',            desc: 'الزبون يختار كيف يستلم طلبه',           bg: 'linear-gradient(145deg,#0A0A0A,#1A2E1A,#0A0A0A)', img: `${import.meta.env.BASE_URL}bd-mohito.jpg` },
  { icon: '💳', title: 'Apple & Google Wallet', sub: 'بطاقة رقمية دائمة',  desc: 'تظهر على شاشة القفل تلقائياً',          bg: 'linear-gradient(145deg,#0A0800,#2E2000,#0A0800)', img: `${import.meta.env.BASE_URL}bd-pistachio.jpg` },
  { icon: '🏆', title: 'نقاط الولاء',          sub: 'كل طلب = نقاط',       desc: 'زبائن راجعين وعروض مخصصة',              bg: 'linear-gradient(145deg,#040D08,#0D2814,#040D08)', img: `${import.meta.env.BASE_URL}bd-filter.jpg` },
];

const allFeatures = [
  { title: 'منيو براون دوز الحقيقي',  desc: 'حار وبارد ومقطرة — بالأسعار الفعلية'  },
  { title: 'طلب توصيل',               desc: 'لحين موقعك — صبيا وضمد'               },
  { title: 'طلب استلام',              desc: 'خذها معك بعد دقيقتين'                 },
  { title: 'Apple Pay & STC Pay',     desc: 'دفع في ثانية — بدون كاش'              },
  { title: 'نقاط الولاء',             desc: 'كل طلب يكسب نقاطاً قابلة للاستبدال'   },
  { title: 'Apple & Google Wallet',   desc: 'بطاقة العضوية على شاشة القفل تلقائياً' },
  { title: 'فرعان',                   desc: 'صبيا وضمد في نظام واحد متكامل'         },
  { title: 'إشعارات وعروض',           desc: 'خصومات وعروض براون دوز بزر واحد'       },
  { title: 'إحصائيات المبيعات',      desc: 'أكثر صنف وأكثر وقت وأرباحك اليومية'    },
  { title: 'هوية براون دوز كاملة',    desc: 'ألوانك واسمك ومنيوك — مش قالب جاهز'   },
  { title: 'دعم مباشر على واتساب',    desc: 'رد فوري بالعربي — طوال أيام الأسبوع'   },
  { title: 'إطلاق في ٧ أيام مضمون',  desc: 'أو ترجع فلوسك كاملة بدون شروط'        },
];

/* ── ROI Calculator ───────────────────────────────────────────────── */
function RoiSection({ inline = false }: { inline?: boolean }) {
  const [customers, setCustomers] = React.useState(80);
  const [spend, setSpend] = React.useState(45);
  const retention = 0.15;
  const monthly = Math.round(customers * spend * 30 * retention);
  const weeks = Math.round((3000 / monthly) * 4.3);

  const inner = (
    <>
      {/* Header — hidden in inline mode */}
      {!inline && (
        <div className="px-7 pt-7 pb-5 border-b border-[rgba(160,82,45,0.08)]">
          <div className="inline-flex items-center gap-2 bg-[#6B3210]/8 border border-[rgba(160,82,45,0.15)] px-3.5 py-1.5 rounded-full mb-3">
            <span className="text-[10px] font-black tracking-[0.2em] text-[#6B3210]">حاسبة العائد على الاستثمار</span>
          </div>
          <h2 className="text-[24px] font-bold text-[#111] leading-tight mb-2">
            الـ ٣,٠٠٠ ريال تسترجعها <span className="text-[#6B3210]">في أسابيع</span>
          </h2>
          <p className="text-[13px] text-[#555] leading-relaxed mb-4">
            المنظومة تخلي زبائنك يرجعون أكثر — حتى لو بنسبة <strong>١٥٪ فقط</strong> زيادة في الزيارات، الأرقام تتكلم وحدها.
          </p>
          <div className="flex gap-2.5">
            {[
              { n: '١', text: 'غيّر أرقام الكافي' },
              { n: '٢', text: 'شوف الإيراد الإضافي' },
              { n: '٣', text: 'احسب متى يرجع الاستثمار' },
            ].map(s => (
              <div key={s.n} className="flex-1 flex items-center gap-2 bg-[rgba(160,82,45,0.05)] rounded-[12px] px-3 py-2.5">
                <div className="w-5 h-5 rounded-full bg-[#6B3210] flex items-center justify-center shrink-0">
                  <span className="text-white text-[9px] font-black">{s.n}</span>
                </div>
                <span className="text-[10px] font-semibold text-[#444] leading-tight">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inline mini header */}
      {inline && (
        <div className="px-5 pt-4 pb-2">
          <p className="text-white/50 text-[10px] font-semibold tracking-widest mb-1">حاسبة العائد — غيّر أرقام الكافي</p>
        </div>
      )}

      {/* Sliders */}
      <div className={`${inline ? 'px-5 py-3' : 'px-7 py-6'} grid grid-cols-2 gap-4`}>
        <div>
          <div className="flex justify-between mb-2">
            <span className={`${inline ? 'text-[11px] text-white/60' : 'text-[13px] text-[#333]'} font-semibold`}>زوار اليوم</span>
            <span className={`${inline ? 'text-[16px] text-[#7A3B18]' : 'text-[18px] text-[#6B3210]'} font-black font-inter`}>{customers}</span>
          </div>
          <input type="range" min={20} max={300} step={10} value={customers}
            onChange={e => setCustomers(Number(e.target.value))}
            className="w-full h-1.5 rounded-full" style={{ accentColor: inline ? '#7A3B18' : '#6B3210' }} />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className={`${inline ? 'text-[11px] text-white/60' : 'text-[13px] text-[#333]'} font-semibold`}>الفاتورة</span>
            <span className={`${inline ? 'text-[16px] text-[#7A3B18]' : 'text-[18px] text-[#6B3210]'} font-black font-inter`}>{spend}ر</span>
          </div>
          <input type="range" min={20} max={150} step={5} value={spend}
            onChange={e => setSpend(Number(e.target.value))}
            className="w-full h-1.5 rounded-full" style={{ accentColor: inline ? '#7A3B18' : '#6B3210' }} />
        </div>
      </div>

      {/* Result */}
      <div className={`${inline ? 'mx-5 mb-4' : 'mx-7 mb-7'} rounded-[16px] p-4 relative overflow-hidden`}
        style={{ background: inline ? 'rgba(0,0,0,0.3)' : 'linear-gradient(145deg,#0D0205,#3D0809,#0D0205)', border: inline ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 20%,rgba(201,149,106,0.14) 0%,transparent 55%)' }} />
        <div className="relative z-10 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-white/30 text-[8px] font-semibold tracking-widest mb-1">إيراد إضافي/شهر</p>
            <p className="text-[#7A3B18] text-[18px] font-black font-inter leading-none">{monthly.toLocaleString('ar')}</p>
            <p className="text-white/25 text-[8px] mt-0.5">ريال</p>
          </div>
          <div className="border-x border-white/[0.07]">
            <p className="text-white/30 text-[8px] font-semibold tracking-widest mb-1">يرجع الاستثمار</p>
            <p className="text-[#30D158] text-[18px] font-black font-inter leading-none">{weeks}</p>
            <p className="text-white/25 text-[8px] mt-0.5">أسبوع فقط</p>
          </div>
          <div>
            <p className="text-white/30 text-[8px] font-semibold tracking-widest mb-1">نمو العودة</p>
            <p className="text-white text-[18px] font-black font-inter leading-none">١٥٪</p>
            <p className="text-white/25 text-[8px] mt-0.5">الحد الأدنى</p>
          </div>
        </div>
      </div>
    </>
  );

  if (inline) return <>{inner}</>;

  return (
    <div className="max-w-5xl mx-auto px-6 mb-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-[28px] overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#FDFAF6 0%,#F5EDE0 100%)', border: '1.5px solid rgba(160,82,45,0.1)', boxShadow: '0 8px 40px rgba(160,82,45,0.08)' }}
      >
        {inner}
      </motion.div>
    </div>
  );
}

/* ── Notifications Showcase ──────────────────────────────────────── */
const notifs = [
  {
    id: 1,
    app: 'مطعمك',
    icon: '🎂',
    iconBg: 'linear-gradient(135deg,#6B3210,#7A3B18)',
    time: 'الآن',
    title: 'عيد ميلادك اليوم! 🎉',
    body: 'وجبة مجانية في انتظارك — هدية من مطعمك في يومك الخاص',
    accent: '#7A3B18',
  },
  {
    id: 2,
    app: 'مطعمك',
    icon: '⚡',
    iconBg: 'linear-gradient(135deg,#1A5276,#2980B9)',
    time: 'منذ دقيقة',
    title: 'طلبك في الطريق! 🛵',
    body: 'سيصل خلال ١٥ دقيقة — تتبع طلبك الآن من التطبيق',
    accent: '#2980B9',
  },
  {
    id: 3,
    app: 'مطعمك',
    icon: '⭐',
    iconBg: 'linear-gradient(135deg,#7A3B18,#E8C4A0)',
    time: 'منذ ٣ دقائق',
    title: '+٢٥ نقطة أُضيفت لرصيدك',
    body: 'زيارتك الرابعة هذا الأسبوع — وجبة مجانية بعد ٣ زيارات فقط',
    accent: '#7A3B18',
  },
  {
    id: 4,
    app: 'مطعمك',
    icon: '🏆',
    iconBg: 'linear-gradient(135deg,#117A65,#2D7D46)',
    time: 'منذ ١٠ دقائق',
    title: 'وصلت المستوى الذهبي! 🥇',
    body: 'مبروك — خصم ١٥٪ دائم وأولوية الحجز من الآن',
    accent: '#2D7D46',
  },
  {
    id: 5,
    app: 'مطعمك',
    icon: '🍽️',
    iconBg: 'linear-gradient(135deg,#3D0809,#6B3210)',
    time: 'منذ ٢٠ دقيقة',
    title: 'طبق اليوم: كبسة الجمبري 🦐',
    body: 'طُبخت للتو — احجز طاولة قبل ما تنتهي',
    accent: '#6B3210',
  },
  {
    id: 6,
    app: 'مطعمك',
    icon: '📍',
    iconBg: 'linear-gradient(135deg,#6C3483,#9B59B6)',
    time: 'منذ ساعة',
    title: 'اقتربت من مطعمك 📍',
    body: 'أنت على بُعد ٥ دقائق — طاولتك المفضلة متاحة الآن',
    accent: '#9B59B6',
  },
];

function NotificationsShowcase() {
  const [visible, setVisible] = React.useState<number[]>([]);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    const el = document.getElementById('notif-showcase');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  React.useEffect(() => {
    if (!started) return;
    notifs.forEach((n, i) => {
      setTimeout(() => setVisible(v => [...v, n.id]), i * 380);
    });
  }, [started]);

  return (
    <div id="notif-showcase" className="max-w-5xl mx-auto px-6 mb-10">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[11px] text-[#AAA] font-semibold tracking-widest uppercase mb-1.5">إشعارات ذكية</p>
        <h2 className="text-[24px] font-bold text-[#111]">تطبيقك يعرف متى يتكلم</h2>
        <p className="text-[13px] text-[#AAA] font-light mt-2">إشعارات تصل في اللحظة الصح — مش مجرد رسائل عشوائية</p>
      </div>

      {/* iPhone lock screen frame */}
      <div className="relative rounded-[36px] overflow-hidden mx-auto max-w-[400px]"
        style={{
          background: 'linear-gradient(160deg,#0a0a1a 0%,#0d0d20 40%,#0a0a18 100%)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
          minHeight: 580,
        }}>

        {/* Wallpaper glow blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-48 h-48 rounded-full blur-[60px]" style={{ background: 'rgba(160,82,45,0.35)', transform: 'translate(-30%,-30%)' }} />
          <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full blur-[60px]" style={{ background: 'rgba(201,149,106,0.2)', transform: 'translate(30%,30%)' }} />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full blur-[50px]" style={{ background: 'rgba(41,128,185,0.15)', transform: 'translate(-50%,-50%)' }} />
        </div>

        {/* Status bar */}
        <div className="relative z-10 flex items-center justify-between px-7 pt-5 pb-3">
          <span className="text-white text-[15px] font-semibold">٩:٤١</span>
          <div className="absolute left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full" />
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 17 12" className="w-4 h-3 fill-white"><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4.5" y="2" width="3" height="10" rx="1"/><rect x="9" y="0.5" width="3" height="11.5" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1" opacity=".35"/></svg>
            <svg viewBox="0 0 16 12" className="w-4 h-3 fill-white"><path d="M8 2.4C5.6 2.4 3.4 3.4 1.8 5L0 3.2C2.1 1.2 4.9 0 8 0s5.9 1.2 8 3.2L14.2 5C12.6 3.4 10.4 2.4 8 2.4z"/><path d="M8 5.6c-1.5 0-2.9.6-3.9 1.6L2.3 5.4C3.7 4 5.7 3.2 8 3.2s4.3.8 5.7 2.2l-1.8 1.8C10.9 6.2 9.5 5.6 8 5.6z"/><circle cx="8" cy="10" r="2"/></svg>
            <div className="flex items-center gap-0.5">
              <div className="w-6 h-3 rounded-[3px] border border-white/40 p-[2px] flex items-center">
                <div className="h-full w-[70%] bg-white rounded-[1.5px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Lock screen time + date */}
        <div className="relative z-10 text-center mb-5">
          <p className="text-white text-[58px] font-thin tracking-tight leading-none">٩:٤١</p>
          <p className="text-white/60 text-[14px] font-light mt-1">السبت، ١٨ يوليو</p>
        </div>

        {/* Notifications list */}
        <div className="relative z-10 px-4 space-y-2.5 pb-8">
          <AnimatePresence>
            {notifs.map((n) =>
              visible.includes(n.id) ? (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: -24, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                  className="rounded-[18px] px-4 py-3 flex items-start gap-3"
                  style={{
                    background: 'rgba(28,28,30,0.82)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.04)`,
                  }}
                >
                  {/* App icon */}
                  <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[18px] shrink-0 mt-0.5"
                    style={{ background: n.iconBg }}>
                    {n.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-white/50 text-[10px] font-semibold tracking-wide">{n.app}</span>
                      <span className="text-white/30 text-[10px] font-inter">{n.time}</span>
                    </div>
                    <p className="text-white text-[13px] font-semibold leading-snug mb-0.5">{n.title}</p>
                    <p className="text-white/55 text-[11px] font-light leading-snug">{n.body}</p>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/25 rounded-full" />
      </div>

      {/* Caption */}
      <p className="text-center text-[11px] text-[#BBB] font-light mt-5">
        كل إشعار له سبب ← يوم الميلاد · طلبك · نقاطك · قربك من مطعمك
      </p>
    </div>
  );
}

/* ── App Screenshots strip ───────────────────────────────────────── */
const screens: { tab: Tab; label: string; color: string; bg: string; preview: React.ReactNode }[] = [
  {
    tab: 'home', label: 'الرئيسية', color: '#7A3B18',
    bg: 'linear-gradient(160deg,#050002 0%,#3D0809 55%,#0D0205 100%)',
    preview: (
      <div className="absolute inset-0 flex flex-col px-2 pt-3 gap-1.5">
        <div className="flex justify-between items-center mb-0.5">
          <div className="w-8 h-1.5 bg-white/20 rounded-full" />
          <div className="w-4 h-4 rounded-full bg-[#7A3B18]/30 border border-[#7A3B18]/40" />
        </div>
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#7A3B18]/50 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border border-[#6B3210]/60" />
          </div>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-3/5 bg-[#7A3B18]/60 rounded-full" />
        </div>
        <div className="flex gap-1 mt-0.5">
          {[1,2,3].map(i=><div key={i} className="flex-1 h-5 bg-white/8 rounded-[5px]"/>)}
        </div>
        <div className="w-full h-12 rounded-[7px] bg-white/5 border border-white/8 mt-0.5" />
      </div>
    ),
  },
  {
    tab: 'menu', label: 'المنيو', color: '#2D7D46',
    bg: 'linear-gradient(160deg,#080002 0%,#3D0809 60%,#0D0205 100%)',
    preview: (
      <div className="absolute inset-0 flex flex-col px-2 pt-3 gap-1.5">
        <div className="flex justify-center mb-1">
          <div className="w-8 h-8 rounded-[8px] bg-[#7A3B18]/30 border border-[#7A3B18]/40" />
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full" />
        <div className="flex gap-1">
          {['#6B3210','#2D7D46','#B5651D'].map(c=><div key={c} className="h-4 flex-1 rounded-full" style={{background:`${c}50`}}/>)}
        </div>
        {[0.9,0.7,0.85].map((o,i)=>(
          <div key={i} className="flex items-center gap-1.5 py-1 border-b border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7A3B18]/60 shrink-0" />
            <div className="flex-1 h-1.5 rounded-full bg-white/15" style={{opacity:o}} />
            <div className="w-4 h-1.5 rounded-full bg-[#6B3210]/60" />
          </div>
        ))}
      </div>
    ),
  },
  {
    tab: 'card', label: 'بطاقتي', color: '#7A3B18',
    bg: 'linear-gradient(145deg,#0D0205,#3D0809,#0D0205)',
    preview: (
      <div className="absolute inset-0 flex flex-col items-center px-2 pt-3 gap-2">
        <div className="w-full rounded-[8px] p-2 flex-1 max-h-[55px] relative overflow-hidden"
          style={{background:'linear-gradient(135deg,#1a0406,#3D0809,#0D0205)',border:'1px solid rgba(201,149,106,0.3)'}}>
          <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 70% 20%,rgba(201,149,106,0.2) 0%,transparent 60%)'}} />
          <div className="flex justify-between items-start">
            <div className="w-6 h-1.5 bg-[#7A3B18]/60 rounded-full" />
            <div className="w-3 h-3 rounded-full bg-white/15" />
          </div>
          <div className="mt-1 w-8 h-2 bg-white/40 rounded-full" />
          <div className="flex justify-between mt-1">
            <div className="w-5 h-1 bg-[#7A3B18]/40 rounded-full" />
            <div className="w-5 h-1 bg-white/25 rounded-full" />
          </div>
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center">
          <div className="w-4 h-4 rounded-sm bg-white/20" />
        </div>
        <div className="w-full h-1 bg-white/8 rounded-full overflow-hidden">
          <div className="h-full w-2/5 bg-[#7A3B18]/60 rounded-full" />
        </div>
      </div>
    ),
  },
  {
    tab: 'orders', label: 'طلباتي', color: '#128C7E',
    bg: '#F0FAF8',
    preview: (
      <div className="absolute inset-0 flex flex-col px-2 pt-3 gap-1.5">
        {/* WhatsApp CTA */}
        <div className="w-full h-8 rounded-[7px] flex items-center gap-1.5 px-2"
          style={{background:'linear-gradient(135deg,#128C7E,#075E54)'}}>
          <div className="w-3.5 h-3.5 rounded-full bg-white/30 shrink-0" />
          <div className="flex-1 h-1.5 bg-white/40 rounded-full" />
        </div>
        {/* Active order */}
        <div className="w-full rounded-[6px] p-1.5" style={{background:'linear-gradient(135deg,#0C0002,#280506)'}}>
          <div className="flex gap-1 justify-between mb-1">
            {['#30D158','#7A3B18','#007AFF','rgba(255,255,255,0.2)'].map((c,i)=>(
              <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
                <div className="w-4 h-4 rounded-full" style={{background:`${c}30`,border:`1px solid ${c}60`}} />
                <div className="w-3 h-0.5 rounded-full" style={{background:c}} />
              </div>
            ))}
          </div>
        </div>
        {/* Past orders */}
        {[1,0.7,0.85].map((o,i)=>(
          <div key={i} className="w-full rounded-[5px] bg-white shadow-sm p-1.5 flex gap-1" style={{opacity:o}}>
            <div className="w-4 h-4 rounded-full bg-[#128C7E]/20 shrink-0" />
            <div className="flex-1 flex flex-col gap-0.5 justify-center">
              <div className="w-10 h-1 bg-[#111]/20 rounded-full" />
              <div className="w-7 h-0.5 bg-[#111]/10 rounded-full" />
            </div>
            <div className="w-5 h-1 bg-[#30D158]/50 rounded-full self-center" />
          </div>
        ))}
      </div>
    ),
  },
];

function AppScreensStrip({ onTabSelect }: { onTabSelect: (t: Tab) => void }) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-none px-6 pb-2">
      {screens.map((s, i) => (
        <motion.button
          key={s.tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 * i }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabSelect(s.tab)}
          className="shrink-0 flex flex-col items-center gap-2"
        >
          {/* Mini phone mockup */}
          <div
            className="w-[72px] h-[128px] rounded-[18px] relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
            style={{ background: s.bg, border: `1.5px solid ${s.color}30` }}
          >
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-7 h-1 bg-black/20 rounded-full z-10" />
            {/* Screen content */}
            {s.preview}
            {/* Bottom home indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-black/20 rounded-full" />
          </div>
          <span className="text-[10px] font-semibold text-[#666]">{s.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

/* ── Main App ─────────────────────────────────────────────────────── */
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showShakeDeal, setShowShakeDeal] = useState(false);
  const handleShake = useCallback(() => {
    if (!showShakeDeal) setShowShakeDeal(true);
  }, [showShakeDeal]);
  useShakeDetect(handleShake);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  return (
    <OrdersProvider>
    <BrandProvider>
    <div className="min-h-screen w-full relative" style={{ background: '#FDFBF7', fontFamily: "'Readex Pro', 'SF Pro Display', sans-serif", color: '#2C2825' }} dir="rtl">

      {/* ── Global aurora (subtle, behind everything) ──────── */}
      <AuroraBackground />

      {/* ── Agency top bar ─────────────────────────────────── */}
      <div className="sticky top-0 z-50" style={{ background: 'rgba(253,251,247,0.85)', backdropFilter: 'blur(20px) saturate(160%)', borderBottom: '1px solid rgba(220,215,205,0.5)' }}>
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shadow-[0_2px_8px_rgba(107,50,16,0.35)]"
              style={{ background: 'linear-gradient(135deg,#6B3210,#8B4515)' }}>
              <span className="text-white text-[10px] font-bold">ت</span>
            </div>
            <span className="text-[14px] font-bold" style={{ color: '#2C2825' }}>تلقا تك</span>
          </motion.div>
          <span className="text-[11px] font-light hidden sm:block" style={{ color: '#9A948C' }}>Brown Dose · نظام الولاء والطلب · جيزان</span>
          <motion.a
            href="https://wa.me/966" target="_blank" rel="noopener noreferrer"
            className="text-[11px] font-semibold text-[#6B3210] px-3.5 py-1.5 rounded-full transition-all duration-150"
            style={{ border: '1px solid rgba(196,120,58,0.3)', background: 'rgba(107,50,16,0.04)' }}
            whileHover={{ scale: 1.03, background: 'rgba(107,50,16,0.08)' }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            تواصل الآن
          </motion.a>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────── */}
      <div className="relative max-w-5xl mx-auto px-6 pt-14 pb-8 text-center overflow-hidden">
        {/* Coffee particles floating up in hero */}
        <CoffeeParticles />

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
          className="relative z-10 inline-flex items-center gap-2.5 mb-7"
          style={{
            background: 'rgba(107,50,16,0.07)',
            border: '1px solid rgba(196,120,58,0.3)',
            borderRadius: 999, padding: '6px 18px',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Pulsing dot with glow ring */}
          <span className="relative flex items-center justify-center w-3 h-3">
            <span className="absolute inset-0 rounded-full bg-[#6B3210] animate-glow-ring" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-[#6B3210] animate-pulse" />
          </span>
          <span className="text-[#6B3210] text-[11px] font-bold tracking-[0.14em]">عرض حصري · براون دوز · جيزان</span>
        </motion.div>

        {/* Cinematic headline */}
        <div className="relative z-10 mb-5">
          <h1 className="text-[38px] md:text-[56px] font-extrabold leading-[1.12] tracking-tight" style={{ color: '#1A1210' }}>

            {/* "Brown Dose" — Latin, animate as one unit with gradient shimmer */}
            <motion.span
              className="block"
              dir="ltr"
              initial={{ opacity: 0, y: 24, skewY: 2 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'linear-gradient(135deg,#3D1508 0%,#8B3A10 35%,#C47830 60%,#8B3A10 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'text-shimmer 4s ease-in-out infinite',
              }}
            >
              Brown Dose
            </motion.span>

            {/* Arabic words — RTL, word by word */}
            <span className="block mt-1" dir="rtl">
              {['يستحق','تجربة','رقمية','مختلفة'].map((word, i) => (
                <React.Fragment key={word}>
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, y: 20, skewY: 2 }}
                    animate={{ opacity: 1, y: 0, skewY: 0 }}
                    transition={{ duration: 0.55, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    style={{ color: '#1A1210' }}
                  >{word}</motion.span>
                  {i < 3 && <span className="inline-block" style={{ width: '0.28em' }} />}
                </React.Fragment>
              ))}
            </span>
          </h1>
        </div>

        <motion.p
          className="relative z-10 text-[15px] md:text-[17px] font-light max-w-md mx-auto leading-relaxed mb-2"
          style={{ color: '#6B6560' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 }}
        >
          تطبيق ويب بهوية براون دوز — زبائنك يطلبون، يدفعون، ويكسبون نقاطاً تلقائياً
        </motion.p>

        <motion.p
          className="relative z-10 mt-6 text-[11px]"
          style={{ color: '#B0A89C', letterSpacing: '0.06em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          طلب وتوصيل · نقاط الولاء · Apple Pay · صبيا وضمد
        </motion.p>
      </div>

      {/* ── Pillars ────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09, ease: [0.22,1,0.36,1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-[20px] relative overflow-hidden group cursor-pointer"
              style={{ minHeight: 190, boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
            >
              {/* Background photo */}
              <img src={p.img} alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                style={{ transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)' }} />
              {/* Dark overlay */}
              <div className="absolute inset-0 transition-opacity duration-500"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)' }} />
              {/* Tint */}
              <div className="absolute inset-0" style={{ background: p.bg, opacity: 0.45, mixBlendMode: 'multiply' }} />
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at 50% 100%,rgba(196,120,58,0.18) 0%,transparent 70%)' }} />
              {/* Top border shimmer */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(200,140,60,0.6),transparent)' }} />
              {/* Content */}
              <div className="relative z-10 p-5 flex flex-col justify-end h-full" style={{ minHeight: 190 }}>
                <p className="text-white/35 text-[9px] font-semibold tracking-[0.22em] mb-2"
                  style={{ fontFamily: 'ui-monospace,monospace' }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="text-white text-[15px] font-bold mb-0.5 leading-snug"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{p.title}</p>
                <p className="text-white/55 text-[11px] font-light leading-snug">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Brand toggle hidden — Brown Dose only */}

      {/* ── Phone mockup + Watch ───────────────────────────── */}
      <div className="flex flex-col items-center px-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-end justify-center gap-6"
        >
          {/* Apple Watch */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hidden md:flex flex-col items-center pb-8"
          >
            <AppleWatchHyz />
            <p className="text-[10px] text-[#AAA] mt-3 font-light text-center">Apple Watch<br />نقاطك على معصمك</p>
          </motion.div>

          {/* Phone */}
          <div style={{ width: 390 }}>
            <PhoneFrame>
              {/* Flash deal overlay — sits above everything inside the phone */}
              <AnimatePresence>
                {showShakeDeal && (
                  <div className="absolute inset-0 z-[100] rounded-[48px] overflow-hidden pointer-events-auto">
                    <FlashDealModal onClose={() => setShowShakeDeal(false)} />
                  </div>
                )}
              </AnimatePresence>

              <PhoneScreens activeTab={activeTab} onShakeTrigger={() => setShowShakeDeal(true)} />
              <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} notifCount={1} />
            </PhoneFrame>
          </div>

          {/* Decorative side info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="hidden md:flex flex-col gap-3 pb-8 w-[130px]"
          >
            {[
              { label: '١,٥٠٠+', sub: 'عضو نشط', color: '#6B3210' },
              { label: '٤.٩ ★', sub: 'تقييم المتجر', color: '#7A3B18' },
              { label: '٦٠ يوم', sub: 'وقت التسليم', color: '#2D7D46' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 + i * 0.08 }}
                className="rounded-[16px] px-3.5 py-3 text-right"
              style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(220,215,205,0.5)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', backdropFilter: 'blur(10px)' }}>
                <p className="text-[16px] font-bold leading-tight" style={{ color: s.color }}>{s.label}</p>
                <p className="text-[9px] font-light" style={{ color: '#9A948C' }}>{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Download badges */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="flex flex-col items-center gap-3 mt-6">
          <div className="flex gap-3">
            <AppleBadge />
            <PlayBadge />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-black text-white px-3 py-1.5 rounded-full text-[11px] font-medium border border-white/8">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple Wallet
            </div>
            <div className="flex items-center gap-1.5 bg-white text-[#111] px-3 py-1.5 rounded-full text-[11px] font-medium border border-[rgba(196,181,159,0.3)]">
              ⌚ Apple Watch
            </div>
          </div>
          <p className="text-[11px] text-[#BBB] text-center">البطاقة في محفظتك والنقاط على ساعتك — بلا إنترنت</p>
        </motion.div>
      </div>

      {/* ── Product Gallery ───────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="text-center mb-5">
          <p className="text-[11px] text-[#6B3210] font-bold tracking-[0.22em] uppercase mb-1.5">منيو براون دوز</p>
          <h2 className="text-[26px] font-bold leading-tight" style={{ color: '#2C2825' }}>كل كوب له حكايته</h2>
          <p className="text-[13px] font-light mt-1.5" style={{ color: '#9A948C' }}>الأصناف الحقيقية — بالصور والأسعار</p>
        </div>
        <div className="grid grid-cols-3 gap-2.5 md:grid-cols-6">
          {[
            { img: imgAffogato,  name: 'أفقاتو براون',      price: '٢٥', tag: 'الأشهر'   },
            { img: imgPistachio, name: 'لاتيه بستاشيو',     price: '٢٠', tag: null        },
            { img: imgMohito,    name: 'موهيتو روز يري',    price: '١٧', tag: 'جديد'      },
            { img: imgIceStr,    name: 'ستفتشر براون',      price: '١٩', tag: 'التوقيع'   },
            { img: imgFilter,    name: 'قهوة مقطرة',        price: '١٧', tag: null        },
            { img: cafeImg1,     name: 'تجربة براون دوز',   price: null,  tag: 'صبيا'     },
          ].map((item, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              className="relative rounded-[18px] overflow-hidden group"
              style={{ aspectRatio: '3/4' }}
            >
              <img src={item.img} alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)' }} />
              {item.tag && (
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[7px] font-bold text-white"
                  style={{ background: 'rgba(196,120,58,0.85)', backdropFilter: 'blur(8px)' }}>
                  {item.tag}
                </div>
              )}
              <div className="absolute bottom-0 right-0 left-0 p-2.5">
                <p className="text-white text-[10px] font-bold leading-tight mb-0.5">{item.name}</p>
                {item.price && <p className="text-[#7A3B18] text-[11px] font-black font-inter">{item.price} <span className="text-[8px] opacity-60">ر</span></p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── App Screens Strip ─────────────────────────────── */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="text-center mb-4 px-6">
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: '#9A948C' }}>شاشات التطبيق</p>
          <h2 className="text-[22px] font-bold" style={{ color: '#2C2825' }}>٥ شاشات مصممة بالكامل</h2>
        </div>
        <AppScreensStrip onTabSelect={(t) => { setActiveTab(t); document.querySelector('[data-phone]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} />
      </div>

      {/* ── Café photo hero ──────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-[28px] overflow-hidden"
          style={{ height: 320 }}
        >
          {/* Background photo */}
          <img
            src={cafeImg1}
            alt="مطعم وكافيه"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(8,0,3,0.92) 0%,rgba(8,0,3,0.55) 45%,rgba(8,0,3,0.15) 100%)' }} />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <p className="text-[#7A3B18] text-[10px] font-semibold tracking-widest uppercase mb-2">BROWN DOSE · جيزان · صبيا وضمد</p>
            <h3 className="text-white text-[26px] font-bold mb-2 leading-tight">
              براون دوز يستحق<br />هوية رقمية حقيقية
            </h3>
            <p className="text-white/50 text-[13px] font-light mb-4 max-w-sm">
              من أول طلب يكسب زبونك نقاطاً، وبكل كوب يقترب من مكافأته القادمة
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
                <span className="text-white text-[10px] font-medium">إطلاق في ٧ أيام مضمون</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full">
                <span className="text-white text-[10px] font-medium">سعر ثابت للأبد</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Video Section ────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="text-center mb-5">
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: '#9A948C' }}>مثال حي</p>
          <h2 className="text-[22px] font-bold" style={{ color: '#2C2825' }}>تطبيق براون دوز — كيف يبدو للزبون</h2>
          <p className="text-[12px] font-light mt-1" style={{ color: '#9A948C' }}>منيو رقمي · نقاط ولاء · توصيل واستلام · كل شيء في مكان واحد</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="relative rounded-[24px] overflow-hidden shadow-2xl mx-auto"
          style={{ maxWidth: 400, aspectRatio: '9/16', background: '#080002' }}
        >
          <div className="absolute inset-0 flex flex-col">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 text-center">
              <p className="text-[#7A3B18] text-[10px] font-semibold tracking-widest mb-1">منيو رقمي تفاعلي</p>
              <p className="text-white text-[16px] font-bold">يتغير بضغطة — بدون مبرمج</p>
            </div>
            {/* Food grid */}
            <div className="grid grid-cols-2 gap-2 px-5 pb-5 flex-1">
              {[
                { img: imgAffogato,  name: 'أفقاتو براون',      price: '٢٥', badge: 'الأشهر'    },
                { img: imgPistachio, name: 'لاتيه بستاشيو',     price: '٢٢', badge: null        },
                { img: imgMohito,    name: 'موهيتو روز',         price: '١٧', badge: null        },
                { img: imgIceStr,    name: 'ايس ستفتشر براون',  price: '١٩', badge: 'التوقيع'  },
              ].map((item, idx) => (
                <div key={idx} className="relative rounded-[16px] overflow-hidden flex flex-col" style={{background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <div className="relative h-[100px]">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)'}} />
                    {item.badge && (
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[7px] font-bold text-white" style={{background:'rgba(160,82,45,0.85)'}}>
                        {item.badge}
                      </div>
                    )}
                  </div>
                  <div className="px-2.5 py-2 flex items-center justify-between">
                    <p className="text-white text-[11px] font-semibold leading-tight">{item.name}</p>
                    <p className="text-[#7A3B18] text-[12px] font-black shrink-0">{item.price}<span className="text-[8px]">ر</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Apple Watch showcase ──────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div
          className="rounded-[28px] p-7 md:p-9 relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#0a0a0a 0%,#1a1a1a 50%,#0a0a0a 100%)' }}
        >
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%,rgba(160,82,45,0.25) 0%,transparent 60%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 50%,rgba(201,149,106,0.08) 0%,transparent 55%)' }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Watch */}
            <div className="flex flex-col items-center">
              <AppleWatchHyz />
            </div>

            {/* Copy */}
            <div className="flex-1 text-right">
              <p className="text-[#7A3B18] text-[10px] font-semibold tracking-widest uppercase mb-2">Apple Watch · مطعمك</p>
              <h3 className="text-white text-[22px] md:text-[26px] font-bold mb-3 leading-tight">
                نقاطك ومستواك<br /><span className="text-[#7A3B18]">على معصمك دائماً</span>
              </h3>
              <p className="text-white/45 text-[13px] font-light leading-relaxed mb-5 max-w-xs mr-auto ml-0 md:mr-0 md:ml-auto text-right">
                تطبيقك على Apple Watch يعرض نقاط زبونك ومستواه ومدى اقترابه من الوجبة المجانية — بدون فتح التطبيق.
              </p>
              <div className="space-y-2.5">
                {[
                  'نقاطك الحالية دائماً على الشاشة',
                  'تنبيه لحظي عند الوصول للكوب المجاني',
                  'تذكير ذكي عند اقتراب الزبون من مطعمك',
                  'مشاركة لحظية مع تطبيق الجوال',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/55 text-[12px]">
                    <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Owner Dashboard — Premium Device Section ─────── */}
      <section className="relative overflow-hidden py-20 mb-2" style={{ background: 'linear-gradient(180deg,#06030A 0%,#0D0205 60%,#06030A 100%)' }}>

        {/* Ambient glow blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] rounded-full blur-[130px]"
            style={{ background: 'radial-gradient(ellipse,rgba(160,82,45,0.38) 0%,rgba(201,149,106,0.08) 55%,transparent 75%)' }} />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[200px] rounded-full blur-[100px]"
            style={{ background: 'rgba(201,149,106,0.07)' }} />
          {/* Dot grid overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dgrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dgrid)" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-6">

          {/* Section header */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="text-center mb-12">
            <div className="inline-flex items-center gap-2 border border-[rgba(201,149,106,0.3)] bg-[rgba(201,149,106,0.06)] backdrop-blur-sm px-4 py-2 rounded-full mb-5">
              <div className="w-1.5 h-1.5 bg-[#7A3B18] rounded-full animate-pulse" />
              <span className="text-[#7A3B18] text-[10px] font-bold tracking-[0.18em] uppercase">Owner Dashboard</span>
            </div>
            <h2 className="text-[36px] font-extrabold text-white leading-tight mb-3">
              كل شيء في <span style={{ background: 'linear-gradient(90deg,#7A3B18,#E8C4A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>متناول يدك</span>
            </h2>
            <p className="text-[14px] text-white/40 font-light max-w-sm mx-auto leading-relaxed">
              راقب الإيرادات والأعضاء والتحديات لحظة بلحظة — من الويب أو جوالك في أي مكان
            </p>
          </motion.div>

          {/* ── Devices ── */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
            className="relative flex items-end justify-center">

            {/* ── MacBook Pro ── */}
            <div className="relative w-full max-w-[820px]" style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.7))' }}>

              {/* Screen lid */}
              <div className="relative rounded-[16px_16px_0_0] overflow-visible"
                style={{
                  background: 'linear-gradient(160deg,#3a3a3a 0%,#2a2a2a 40%,#222 100%)',
                  padding: '2px',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.08) inset, 0 -2px 0 0 rgba(255,255,255,0.04) inset',
                }}>

                {/* Inner bezel */}
                <div className="rounded-[14px_14px_0_0] overflow-hidden"
                  style={{ background: '#161616', padding: '10px 10px 0 10px' }}>

                  {/* Camera notch */}
                  <div className="flex justify-center mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#333]" />
                      <div className="w-2 h-2 rounded-full bg-[#2a2a2a] border border-[rgba(255,255,255,0.06)]" />
                    </div>
                  </div>

                  {/* Screen glass */}
                  <div className="relative rounded-[8px] overflow-hidden"
                    style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06) inset' }}>
                    {/* Glass sheen */}
                    <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
                      style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.04) 0%,transparent 100%)' }} />
                    {/* Browser chrome */}
                    <div className="flex items-center gap-0 px-3 py-2.5 border-b border-white/[0.05]"
                      style={{ background: '#1e1e1e' }}>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] shadow-[0_0_4px_rgba(255,95,87,0.5)]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] shadow-[0_0_4px_rgba(254,188,46,0.4)]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] shadow-[0_0_4px_rgba(40,200,64,0.4)]" />
                      </div>
                      {/* Tab bar */}
                      <div className="flex-1 flex justify-center">
                        <div className="flex items-center bg-[#2a2a2a] rounded-[7px] px-3 py-1.5 gap-2 mx-4 flex-1 max-w-xs">
                          <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-[#30D158] shrink-0"><path d="M6 1a5 5 0 100 10A5 5 0 006 1zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z"/></svg>
                          <span className="text-[8px] text-[#666] font-inter truncate">admin.matar3k.sa/dashboard</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="w-4 h-4 rounded flex items-center justify-center hover:bg-white/5">
                          <span className="text-[8px] text-[#444]">⟨</span>
                        </div>
                        <div className="w-4 h-4 rounded flex items-center justify-center hover:bg-white/5">
                          <span className="text-[8px] text-[#444]">⟩</span>
                        </div>
                      </div>
                    </div>
                    {/* Dashboard */}
                    <div style={{ height: 440 }}>
                      <OwnerDashboard />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hinge bar */}
              <div className="h-[5px] mx-[-1px]"
                style={{ background: 'linear-gradient(180deg,#3a3a3a 0%,#2e2e2e 100%)', boxShadow: '0 2px 0 rgba(0,0,0,0.4)' }} />

              {/* Keyboard body */}
              <div className="mx-[-3%] rounded-b-[6px] relative overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg,#d4d4d4 0%,#c8c8c8 35%,#bdbdbd 100%)',
                  height: '42px',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.6) inset, 0 -1px 0 rgba(0,0,0,0.15)',
                }}>
                {/* Keyboard texture hint */}
                <div className="absolute inset-0 opacity-[0.07]"
                  style={{ backgroundImage: 'repeating-linear-gradient(90deg,#000 0px,#000 1px,transparent 1px,transparent 14px)', backgroundSize: '14px 100%' }} />
                {/* Trackpad */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-[14px] rounded-[4px]"
                  style={{ background: 'rgba(0,0,0,0.1)', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.15) inset' }} />
                {/* Apple logo hint */}
                <div className="absolute top-2 right-4 w-5 h-5 opacity-20 flex items-center justify-center">
                  <svg viewBox="0 0 18 22" className="w-3.5 h-3.5 fill-[#666]"><path d="M15.769 10.204c-.012-1.895 1.55-2.815 1.621-2.862-1.763-2.58-2.516-2.619-2.516-2.619-1.088-.112-2.139.644-2.698.644-.559 0-1.408-.631-2.323-.611-.592.012-2.283.353-3.234 1.882C4.516 9.064 5.316 13.37 7.334 15.88c.96 1.336 2.107 2.84 3.61 2.787 1.448-.059 1.998-.932 3.752-.932 1.748 0 2.249.932 3.772.905 1.567-.025 2.562-1.351 3.52-2.695.686-.97 1.276-2.047 1.566-3.252-3.266-1.263-3.786-4.489-3.786-4.489zm-3.504-8.247c.791-.961 1.33-2.302 1.184-3.643-1.145.046-2.531.762-3.353 1.724-.736.844-1.378 2.19-1.206 3.476 1.279.1 2.582-.65 3.375-1.557z"/></svg>
                </div>
              </div>

              {/* Base foot */}
              <div className="mx-[-6%] h-[8px] rounded-b-[8px]"
                style={{ background: 'linear-gradient(180deg,#b8b8b8 0%,#a8a8a8 100%)', boxShadow: '0 8px 32px rgba(0,0,0,0.55)' }} />
            </div>

          </motion.div>

          {/* ── Feature highlights ── */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-12 grid grid-cols-4 gap-3">
            {[
              { n: '01', t: 'إيرادات لحظية',   d: 'تابع دخلك ثانية بثانية' },
              { n: '02', t: 'إدارة الأعضاء',    d: 'قائمة كاملة مع المستويات' },
              { n: '03', t: 'التحديات',          d: 'أطلق وتابع تحديات المجتمع' },
              { n: '04', t: 'إشعارات جماعية',   d: 'أرسل لجميع الأعضاء فوراً' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 + i * 0.06 }}
                className="rounded-[16px] p-4 border border-white/[0.06]"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="text-[#7A3B18]/50 text-[9px] font-bold mb-2.5" style={{ fontFamily: 'ui-monospace,monospace' }}>{f.n}</p>
                <p className="text-white text-[11px] font-semibold mb-1">{f.t}</p>
                <p className="text-white/30 text-[9px] leading-snug">{f.d}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── Full Features Grid ────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="text-center mb-6">
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#9A948C' }}>كل ما يحصل عليه براون دوز</p>
          <h2 className="text-[24px] font-bold" style={{ color: '#2C2825' }}>مزايا النظام في منظومة واحدة</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {allFeatures.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i }}
              className="rounded-[20px] px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(220,215,205,0.5)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', backdropFilter: 'blur(10px)' }}>
              <p className="text-[9px] font-bold text-[#6B3210] tracking-[0.18em] mb-1.5" style={{ fontFamily: 'ui-monospace,monospace' }}>
                {String(i + 1).padStart(2,'0')}
              </p>
              <p className="text-[12px] font-semibold mb-0.5 leading-snug" style={{ color: '#2C2825' }}>{f.title}</p>
              <p className="text-[10px] font-light leading-relaxed" style={{ color: '#9A948C' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Notifications Showcase ───────────────────────── */}
      <NotificationsShowcase />

      {/* ── Wallet showcase ──────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="rounded-[28px] p-7 md:p-9 relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#0D0205 0%,#3D0809 45%,#0D0205 80%,#1A0406 100%)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 85% 20%,rgba(201,149,106,0.12) 0%,transparent 55%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 10% 80%,rgba(160,82,45,0.35) 0%,transparent 50%)' }} />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-7">
            <div className="flex-1">
              <p className="text-[#7A3B18] text-[10px] font-semibold tracking-widest uppercase mb-2">Apple Wallet · Google Wallet</p>
              <h3 className="text-white text-[24px] font-bold mb-2.5 leading-tight">
                بطاقة زبونك في جيبه<br /><span className="text-[#7A3B18]">حتى بدون إنترنت</span>
              </h3>
              <p className="text-white/45 text-[13px] font-light leading-relaxed mb-5 max-w-xs">
                يضيف الأعضاء بطاقة العضوية لمحافظهم الرقمية بضغطة واحدة. تُحدَّث تلقائياً عند الترقية.
              </p>
              <div className="space-y-2">
                {['تحديث فوري عند الترقية للمستوى التالي','تعمل بلا إنترنت عند الدفع','إشعار تلقائي عند اقتراب الزبون من مطعمك'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/55 text-[12px]">
                    <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-[260px] rounded-[22px] p-5 relative overflow-hidden shrink-0"
              style={{ background: 'linear-gradient(145deg,#080003,#3D0809,#0D0003)', border: '1px solid rgba(201,149,106,0.18)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 0%,rgba(201,149,106,0.12) 0%,transparent 55%)' }} />
              <div className="absolute top-0 bottom-0 w-[40%] pointer-events-none"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(201,149,106,0.06),transparent)', transform: 'skewX(-20deg)', animation: 'card-shimmer 4s ease-in-out infinite' }} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[#7A3B18] font-bold text-[16px] leading-tight">Brown Dose</p>
                    <p className="text-white/25 text-[8px] font-inter tracking-wider">BROWN DOSE · KSA</p>
                  </div>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/15">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <p className="text-white/25 text-[8px] mb-0.5">CARDHOLDER</p>
                <p className="text-white text-[13px] font-semibold mb-4">عبدالإله علي</p>
                <div className="flex justify-between">
                  <div>
                    <p className="text-white/25 text-[8px]">LEVEL</p>
                    <p className="text-[#7A3B18] text-[12px] font-bold">كلاسيك</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/25 text-[8px]">POINTS</p>
                    <p className="text-white text-[14px] font-bold font-inter">480</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── روح مطعمك — Editorial ──────────────────────────── */}
      <div className="relative overflow-hidden mb-10" style={{ background: 'linear-gradient(180deg,#080002 0%,#0D0205 40%,#1A0406 80%,#080002 100%)' }}>

        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%,rgba(201,149,106,0.09) 0%,transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 80%,rgba(160,82,45,0.3) 0%,transparent 50%)' }} />

        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-20">

          {/* Top label */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-10 justify-center">
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(201,149,106,0.4))' }} />
            <span className="text-[#7A3B18]/50 text-[8px] font-black tracking-[0.32em]" style={{ fontFamily: 'ui-monospace,monospace' }}>روح المكان</span>
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg,rgba(201,149,106,0.4),transparent)' }} />
          </motion.div>

          {/* Main editorial text */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            className="text-center mb-14">
            <p className="text-white/20 text-[12px] font-light mb-5 tracking-widest">يقول أحد زبائن مطعم يستخدم المنظومة</p>
            <blockquote className="text-white text-[26px] md:text-[32px] font-bold leading-relaxed mb-6 tracking-tight">
              "ما أروح مطعم ثاني<br />
              <span style={{ background: 'linear-gradient(90deg,#7A3B18,#E8C4A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                النقاط صنعت الإخلاص
              </span>"
            </blockquote>
            <p className="text-white/25 text-[11px] font-light">عضو ذهبي · زبون دائم</p>
          </motion.div>

          {/* Three moments */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px"
            style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, overflow: 'hidden' }}>
            {[
              {
                time: '٦:٣٠ ص',
                label: 'الفجر والفلتر',
                text: 'أول طلب في اليوم وزبونك يكسب نقاطه — اللحظة اللي تبدأ بيها علاقتكم',
                icon: '☕',
                color: '#7A3B18',
              },
              {
                time: '١٢:٠٠ م',
                label: 'ساعة هدوء',
                text: 'جلسة عمل بعيداً عن الضجيج، كرواسون اللوز والشوكولاتة والكمبيوتر المفتوح',
                icon: '💻',
                color: '#6B3210',
              },
              {
                time: '٦:٠٠ م',
                label: 'نهاية اليوم',
                text: 'شوكولاتة ساخنة مشتركة مع صاحبك — النوع الذي يصنعون منه الذكريات',
                icon: '🍫',
                color: '#4A8C5C',
              },
            ].map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                className="px-7 py-8 relative"
                style={{ background: i === 1 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)' }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${m.color}25,transparent)` }} />
                <p className="text-[9px] font-black tracking-[0.28em] mb-3" style={{ color: `${m.color}70`, fontFamily: 'ui-monospace,monospace' }}>{m.time}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[20px]">{m.icon}</span>
                  <p className="text-white text-[15px] font-bold">{m.label}</p>
                </div>
                <p className="text-white/35 text-[12px] font-light leading-relaxed">{m.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom tagline */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-center text-white/20 text-[11px] font-light mt-10 tracking-widest">
            التطبيق يحفظ هذه اللحظات ويجعلها جزءاً من قصة كل عضو
          </motion.p>

        </div>
      </div>

      {/* ── Community ────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="bg-white/75 rounded-[28px] p-6 border border-[rgba(160,82,45,0.07)] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[10px] text-[#6B3210] font-semibold tracking-widest uppercase mb-1">مجتمع مطعمك</p>
              <h3 className="text-[22px] font-bold text-[#111]">١,٥٠٠+ عضو نشط</h3>
              <p className="text-[12px] text-[#888] font-light mt-1">منصة اجتماعية داخل التطبيق</p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#30D158] font-medium bg-[#30D158]/8 px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
              ٢٣ متصل الآن
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: '📍', title: 'تسجيل وصول',   desc: 'يشارك الأعضاء زياراتهم' },
              { icon: '🏆', title: 'تحديات أسبوعية', desc: 'منافسات بين الأعضاء'   },
              { icon: '💬', title: 'نصائح المجتمع', desc: 'توصيات حقيقية من أعضاء' },
              { icon: '⭐', title: 'تقييمات حية',   desc: 'تغذية راجعة فورية'      },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-3.5 text-center" style={{ background: 'rgba(242,234,224,0.7)' }}>
                <span className="text-xl mb-2 block">{item.icon}</span>
                <p className="text-[12px] font-semibold text-[#111] mb-0.5">{item.title}</p>
                <p className="text-[10px] text-[#888] font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROI Calculator ───────────────────────────────── */}
      <RoiSection />

      {/* ── CTA ──────────────────────────────────────────── */}
      <div className="max-w-lg mx-auto px-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-[28px] p-8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#080003 0%,#3D0809 45%,#0D0003 75%,#1A0406 100%)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(201,149,106,0.18) 0%,transparent 60%)' }} />
          <div className="absolute bottom-0 left-0 w-36 h-36 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle,#7A3B18 1.5px,transparent 1.5px)', backgroundSize: '10px 10px' }} />
          <div className="relative z-10">

            {/* Exclusive badge */}
            <div className="inline-flex items-center gap-2 border border-[rgba(201,149,106,0.3)] bg-[rgba(201,149,106,0.08)] px-4 py-1.5 rounded-full mb-4">
              <div className="w-1.5 h-1.5 bg-[#7A3B18] rounded-full animate-pulse" />
              <span className="text-[#7A3B18] text-[10px] font-black tracking-[0.2em]">عرض الإطلاق الحصري · محدود</span>
            </div>

            <p className="text-[#7A3B18] text-[11px] font-semibold tracking-widest uppercase mb-3">عرض الإطلاق الحصري</p>
            {/* Price */}
            <div className="flex items-end justify-center gap-2 mb-1">
              <span className="text-white text-[52px] font-bold leading-none font-inter">2,000</span>
              <span className="text-white/40 text-[18px] mb-2">ريال</span>
            </div>
            <p className="text-[#7A3B18] text-[14px] font-light mb-3">تأسيس · الموقع مجاناً</p>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-white/70 text-[28px] font-bold font-inter">499</span>
              <div className="text-right leading-tight">
                <p className="text-white/40 text-[10px]">ريال / شهرياً</p>
                <p className="text-[#7A3B18] text-[10px] font-semibold">استضافة · حماية · دعم فني</p>
              </div>
            </div>
            <p className="text-white/30 text-[12px] font-light mt-2 mb-6">
              طلب توصيل واستلام · Apple Pay · نقاط ولاء · منيو رقمي · فروع صبيا وضمد
            </p>
            <div className="grid grid-cols-2 gap-2.5 mb-7 text-right">
              {['تسليم خلال ٧ أيام','هوية براون دوز الكاملة','دعم مباشر على واتساب','فرعَي صبيا وضمد'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/55 text-[11px]">
                  <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/966551378531?text=السلام عليكم، أريد الاستفسار عن نظام براون دوز الرقمي" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-[16px] active:scale-95 transition-all duration-200 shadow-[0_8px_28px_rgba(0,0,0,0.3)] mb-3"
              style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-white font-bold text-[16px]">تواصل الآن عبر واتساب</span>
            </a>

            <p className="text-white/25 text-[10px] font-light">استشارة مجانية · بدون التزام</p>
          </div>
        </motion.div>
      </div>

      {/* ── Footer ────────────────────────────────────────── */}
      <div className="text-center pb-8 px-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6B3210,#6B3A1F)' }}>
            <span className="text-white text-[9px] font-bold">ت</span>
          </div>
          <span className="text-[13px] font-bold text-[#111]">تلقا تك</span>
        </div>
        <p className="text-[11px] text-[#CCC] font-light">تصميم وتطوير احترافي · جميع الحقوق محفوظة ٢٠٢٦</p>

        {/* Commercial Registration Badge */}
        <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full border border-[#F5E6E6] bg-[#FFF8F8]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B3210" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span className="text-[11px] text-[#6B3210] font-semibold">مؤسسة تلقا · سجل تجاري: 7054835322</span>
        </div>
      </div>
    </div>
    </BrandProvider>
    </OrdersProvider>
  );
}
