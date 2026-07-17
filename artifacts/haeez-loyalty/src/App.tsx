import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomNav } from './components/BottomNav';
import type { Tab } from './components/BottomNav';
import { ScreenMembership }    from './components/ScreenMembership';
import { ScreenPerks }         from './components/ScreenPerks';
import { ScreenNotifications } from './components/ScreenNotifications';
import { ScreenHome }          from './components/ScreenHome';
import { ScreenReservations }  from './components/ScreenReservations';
import { ScreenCommunity }     from './components/ScreenCommunity';
import { ScreenMenu }          from './components/ScreenMenu';
import { AppleWatchHyz }       from './components/AppleWatch';
import { OwnerDashboard, MobileOwnerSummary } from './components/OwnerDashboard';

const cafeImg1 = `${import.meta.env.BASE_URL}cafe-1.jpeg`;

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
  { icon: '📱', title: 'تطبيق موبايل',      sub: 'iOS + Android',       desc: 'تجربة عضوية كاملة في جيب ضيفك',      bg: 'linear-gradient(145deg,#0D0205,#3D0809,#0D0205)' },
  { icon: '🌐', title: 'موقع إلكتروني',     sub: 'متجاوب · سريع',      desc: 'منيو + حجوزات + ولاء عبر الويب',      bg: 'linear-gradient(145deg,#0A0A0A,#1E1E1E,#0A0A0A)' },
  { icon: '💳', title: 'Apple & Google Wallet', sub: 'بطاقة رقمية دائمة', desc: 'تعمل بلا إنترنت · تحديث آني',       bg: 'linear-gradient(145deg,#0A0800,#2E2000,#0A0800)' },
  { icon: '👥', title: 'مجتمع وتحديات',    sub: '١,٥٠٠+ عضو',         desc: 'منصة اجتماعية داخل التطبيق',          bg: 'linear-gradient(145deg,#040D08,#0D2814,#040D08)' },
];

const allFeatures = [
  { icon: '🪪', title: 'بطاقة عضوية رقمية',    desc: 'QR فوري بدون بطاقة ورقية'         },
  { icon: '🏆', title: 'نظام نقاط ومستويات',   desc: 'كلاسيك · فضي · ذهبي'             },
  { icon: '🔔', title: 'إشعارات فورية ذكية',   desc: 'عروض وهدايا وتذكيرات شخصية'      },
  { icon: '📅', title: 'حجز طاولات مباشر',     desc: 'تأكيد فوري + واتساب'             },
  { icon: '🎁', title: 'إهداء أصدقاء',         desc: 'أرسل كوب أو نقاط لصديق'          },
  { icon: '⌚', title: 'Apple Watch',           desc: 'نقاطك ومستواك على معصمك'          },
  { icon: '💳', title: 'Apple & Google Wallet', desc: 'بلا إنترنت · تحديث آني'         },
  { icon: '📊', title: 'لوحة تحليلات للإدارة', desc: 'أعضاء · زيارات · إيرادات'       },
  { icon: '🌐', title: 'موقع إلكتروني كامل',   desc: 'منيو + حجوزات + ولاء'           },
  { icon: '📱', title: 'تطبيق iOS + Android',  desc: 'نشر على المتجرين الرسميين'        },
  { icon: '🎁', title: 'عروض وأكواد حصرية',   desc: 'جدولة تلقائية + قياس الأثر'     },
  { icon: '☕', title: 'منيو رقمي تفاعلي',     desc: 'يُحدَّث لحظياً · أسعار دقيقة'   },
];

/* ── App Screenshots strip ───────────────────────────────────────── */
const screens: { tab: Tab; label: string; color: string }[] = [
  { tab: 'home',      label: 'الرئيسية', color: '#7B1618' },
  { tab: 'menu',      label: 'المنيو',   color: '#2D7D46' },
  { tab: 'card',      label: 'بطاقتي',  color: '#C9956A' },
  { tab: 'book',      label: 'احجز',    color: '#1A5276' },
  { tab: 'community', label: 'مجتمع',   color: '#6C3483' },
];

function AppScreensStrip({ onTabSelect }: { onTabSelect: (t: Tab) => void }) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-none px-6 pb-2">
      {screens.map((s, i) => (
        <motion.button
          key={s.tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * i }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabSelect(s.tab)}
          className="shrink-0 flex flex-col items-center gap-2"
        >
          {/* Mini phone mockup */}
          <div
            className="w-[70px] h-[120px] rounded-[16px] relative overflow-hidden border border-white/10"
            style={{ background: 'linear-gradient(145deg,#1a0a0b,#2d0d0e)' }}
          >
            {/* Screen tint */}
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 60% 30%,${s.color}40 0%,transparent 70%)` }} />
            {/* Dots */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-1 bg-white/10 rounded-full" />
            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-8 h-8 rounded-[10px] flex items-center justify-center text-[18px]"
                style={{ background: `${s.color}25` }}
              >
                {s.tab === 'home' ? '🏠' : s.tab === 'menu' ? '☕' : s.tab === 'card' ? '💳' : s.tab === 'book' ? '📅' : '🔔'}
              </div>
            </div>
            {/* Bottom bar */}
            <div className="absolute bottom-2 left-2 right-2 h-0.5 rounded-full" style={{ background: `${s.color}60` }} />
          </div>
          <span className="text-[10px] font-semibold text-[#666]">{s.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

/* ── Main App ─────────────────────────────────────────────────────── */
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('card');

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  return (
    <div className="min-h-screen w-full font-sans" style={{ background: 'linear-gradient(180deg,#F2EAE0 0%,#EDE5DA 100%)' }} dir="rtl">

      {/* ── Agency top bar ─────────────────────────────────── */}
      <div className="sticky top-0 z-50 border-b border-[rgba(123,22,24,0.1)] bg-[#FDFBF7]/85 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#7B1618,#4A0D0F)' }}>
              <span className="text-white text-[10px] font-bold">ت</span>
            </div>
            <span className="text-[14px] font-bold text-[#111]">تلقا تك</span>
          </div>
          <span className="text-[11px] text-[#AAA] font-light hidden sm:block">تصميم تطبيقات ومواقع احترافية · أبها</span>
          <a href="https://wa.me/966" target="_blank" rel="noopener noreferrer"
            className="text-[11px] font-semibold text-[#7B1618] border border-[rgba(123,22,24,0.2)] px-3.5 py-1.5 rounded-full hover:bg-[#7B1618]/5 transition-colors">
            تواصل الآن
          </a>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-6 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 bg-[#7B1618] text-[#C9956A] text-[11px] font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest shadow-[0_4px_20px_rgba(123,22,24,0.35)]">
            <span className="w-1.5 h-1.5 bg-[#C9956A] rounded-full animate-pulse" />
            عرض حصري · حيز كافيه · أبها
          </span>
          <h1 className="text-[34px] md:text-[44px] font-bold text-[#111] leading-tight mb-3 tracking-tight">
            منصة <span className="text-[#7B1618]">حيز</span> الرقمية الكاملة
          </h1>
          <p className="text-[22px] md:text-[28px] font-light text-[#666] mb-4 leading-relaxed">
            تطبيق · موقع · محفظة · مجتمع · حجوزات
          </p>
          <p className="text-[13px] text-[#888] font-light max-w-sm mx-auto leading-relaxed">
            منظومة رقمية متكاملة تربط ضيوف حيز بمكانهم المفضل وتجعلهم يعودون دائماً
          </p>
        </motion.div>
      </div>

      {/* ── Pillars ────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pillars.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="rounded-[20px] p-5 relative overflow-hidden" style={{ background: p.bg }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 10%,rgba(201,149,106,0.1) 0%,transparent 60%)' }} />
              <span className="text-2xl mb-3 block">{p.icon}</span>
              <p className="text-white text-[14px] font-bold mb-0.5 relative">{p.title}</p>
              <p className="text-white/35 text-[10px] font-light mb-1.5 relative">{p.sub}</p>
              <p className="text-white/55 text-[11px] font-light relative leading-snug">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

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
            <p className="text-[10px] text-[#AAA] mt-3 font-light text-center">Apple Watch<br />حيز على معصمك</p>
          </motion.div>

          {/* Phone */}
          <div style={{ width: 390 }}>
            <PhoneFrame>
              <div className="flex-1 relative overflow-hidden h-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 overflow-y-auto scrollbar-none"
                  >
                    {activeTab === 'home'      && <ScreenHome />}
                    {activeTab === 'menu'      && <ScreenMenu />}
                    {activeTab === 'card'      && <ScreenMembership />}
                    {activeTab === 'book'      && <ScreenReservations />}
                    {activeTab === 'community' && <ScreenCommunity />}
                  </motion.div>
                </AnimatePresence>
              </div>
              <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} notifCount={3} />
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
              { label: '١,٥٠٠+', sub: 'عضو نشط', color: '#7B1618' },
              { label: '٤.٩ ★', sub: 'تقييم المتجر', color: '#C9956A' },
              { label: '٦٠ يوم', sub: 'وقت التسليم', color: '#2D7D46' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 + i * 0.08 }}
                className="bg-white/70 rounded-[16px] px-3.5 py-3 border border-[rgba(123,22,24,0.07)] text-right">
                <p className="text-[16px] font-bold leading-tight" style={{ color: s.color }}>{s.label}</p>
                <p className="text-[9px] text-[#999] font-light">{s.sub}</p>
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

      {/* ── App Screens Strip ─────────────────────────────── */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="text-center mb-4 px-6">
          <p className="text-[11px] text-[#AAA] font-semibold tracking-widest uppercase mb-1">شاشات التطبيق</p>
          <h2 className="text-[22px] font-bold text-[#111]">٥ شاشات مصممة بالكامل</h2>
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
            alt="حيز كافيه أبها"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(8,0,3,0.92) 0%,rgba(8,0,3,0.55) 45%,rgba(8,0,3,0.15) 100%)' }} />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <p className="text-[#C9956A] text-[10px] font-semibold tracking-widest uppercase mb-2">HYZ CAFÉ · ABHA · شارع لبنان</p>
            <h3 className="text-white text-[26px] font-bold mb-2 leading-tight">
              مكانك المفضل<br />يستحق أفضل تجربة رقمية
            </h3>
            <p className="text-white/50 text-[13px] font-light mb-4 max-w-sm">
              من أول زيارة تكسب نقاطاً، وبكل كوب تقترب من المستوى التالي
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
                <span className="text-white text-[10px] font-medium">١,٥٠٠+ عضو نشط</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full">
                <span className="text-white text-[10px] font-medium">⭐ ٤.٩ تقييم</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Video Section ────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="text-center mb-5">
          <p className="text-[11px] text-[#AAA] font-semibold tracking-widest uppercase mb-1">الفيديو التعريفي</p>
          <h2 className="text-[22px] font-bold text-[#111]">شاهد حيز في دقيقة</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="relative rounded-[24px] overflow-hidden shadow-2xl"
          style={{ aspectRatio: '16/9', background: '#080002' }}
        >
          <iframe
            src="/haiz-video/"
            className="absolute inset-0 w-full h-full border-0"
            allow="autoplay"
            title="حيز — فيديو تعريفي"
          />
        </motion.div>
      </div>

      {/* ── Apple Watch showcase ──────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div
          className="rounded-[28px] p-7 md:p-9 relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#0a0a0a 0%,#1a1a1a 50%,#0a0a0a 100%)' }}
        >
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%,rgba(123,22,24,0.25) 0%,transparent 60%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 50%,rgba(201,149,106,0.08) 0%,transparent 55%)' }} />
          <div className="absolute bottom-0 right-0 w-40 h-40 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle,#C9956A 1.5px,transparent 1.5px)', backgroundSize: '10px 10px' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Watch */}
            <div className="flex flex-col items-center">
              <AppleWatchHyz />
              <div className="flex gap-1.5 mt-4">
                {['#7B1618', '#C9956A', '#30D158'].map((c, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full opacity-60" style={{ background: c }} />
                ))}
              </div>
            </div>

            {/* Copy */}
            <div className="flex-1 text-right">
              <p className="text-[#C9956A] text-[10px] font-semibold tracking-widest uppercase mb-2">Apple Watch · حيز</p>
              <h3 className="text-white text-[22px] md:text-[26px] font-bold mb-3 leading-tight">
                نقاطك ومستواك<br /><span className="text-[#C9956A]">على معصمك دائماً</span>
              </h3>
              <p className="text-white/45 text-[13px] font-light leading-relaxed mb-5 max-w-xs mr-auto ml-0 md:mr-0 md:ml-auto text-right">
                واجهة حيز على Apple Watch تعرض نقاطك الحالية ومستواك ومدى اقترابك من الكوب التالي — بدون فتح التطبيق.
              </p>
              <div className="space-y-2.5">
                {[
                  'نقاطك الحالية دائماً على الشاشة',
                  'تنبيه لحظي عند الوصول للكوب المجاني',
                  'تذكير ذكي عند اقترابك من حيز',
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
            style={{ background: 'radial-gradient(ellipse,rgba(123,22,24,0.38) 0%,rgba(201,149,106,0.08) 55%,transparent 75%)' }} />
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
              <div className="w-1.5 h-1.5 bg-[#C9956A] rounded-full animate-pulse" />
              <span className="text-[#C9956A] text-[10px] font-bold tracking-[0.18em] uppercase">Owner Dashboard</span>
            </div>
            <h2 className="text-[36px] font-extrabold text-white leading-tight mb-3">
              كل شيء في <span style={{ background: 'linear-gradient(90deg,#C9956A,#E8C4A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>متناول يدك</span>
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
                          <span className="text-[8px] text-[#666] font-inter truncate">admin.hyz-cafe.sa/dashboard</span>
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
              { ic: '📊', t: 'إيرادات لحظية',   d: 'تابع دخلك ثانية بثانية' },
              { ic: '👥', t: 'إدارة الأعضاء',    d: 'قائمة كاملة مع المستويات' },
              { ic: '🏆', t: 'التحديات',          d: 'أطلق وتابع تحديات المجتمع' },
              { ic: '📣', t: 'إشعارات جماعية',   d: 'أرسل لجميع الأعضاء فوراً' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 + i * 0.06 }}
                className="rounded-[16px] p-4 border border-white/[0.07] backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-[16px] mb-3"
                  style={{ background: 'rgba(201,149,106,0.12)' }}>{f.ic}</div>
                <p className="text-white text-[11px] font-bold mb-1">{f.t}</p>
                <p className="text-white/35 text-[9px] leading-snug">{f.d}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── Full Features Grid ────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="text-center mb-6">
          <p className="text-[11px] text-[#AAA] font-semibold tracking-widest uppercase mb-1.5">كل ما يحصل عليه حيز</p>
          <h2 className="text-[24px] font-bold text-[#111]">١٢ مزايا في منظومة واحدة</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {allFeatures.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}
              className="bg-white/75 rounded-[18px] p-4 border border-[rgba(123,22,24,0.07)] shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:border-[rgba(123,22,24,0.18)] transition-all duration-200 hover:-translate-y-0.5">
              <span className="text-2xl mb-2 block">{f.icon}</span>
              <p className="text-[12px] font-semibold text-[#111] mb-0.5 leading-snug">{f.title}</p>
              <p className="text-[10px] text-[#999] font-light leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Wallet showcase ──────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="rounded-[28px] p-7 md:p-9 relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#0D0205 0%,#3D0809 45%,#0D0205 80%,#1A0406 100%)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 85% 20%,rgba(201,149,106,0.12) 0%,transparent 55%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 10% 80%,rgba(123,22,24,0.35) 0%,transparent 50%)' }} />
          <div className="absolute bottom-0 left-0 w-40 h-40 opacity-[0.05]"
            style={{ backgroundImage: 'radial-gradient(circle,#C9956A 1.5px,transparent 1.5px)', backgroundSize: '10px 10px' }} />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-7">
            <div className="flex-1">
              <p className="text-[#C9956A] text-[10px] font-semibold tracking-widest uppercase mb-2">Apple Wallet · Google Wallet</p>
              <h3 className="text-white text-[24px] font-bold mb-2.5 leading-tight">
                بطاقة حيز في جيبك<br /><span className="text-[#C9956A]">حتى بدون إنترنت</span>
              </h3>
              <p className="text-white/45 text-[13px] font-light leading-relaxed mb-5 max-w-xs">
                يضيف الأعضاء بطاقة العضوية لمحافظهم الرقمية بضغطة واحدة. تُحدَّث تلقائياً عند الترقية.
              </p>
              <div className="space-y-2">
                {['تحديث فوري عند الترقية للمستوى التالي','تعمل بلا إنترنت في الصندوق','إشعارات جغرافية عند دخول منطقة حيز'].map((item) => (
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
                    <p className="text-[#C9956A] font-bold text-[16px] leading-tight">حيز</p>
                    <p className="text-white/25 text-[8px] font-inter tracking-wider">HYZ CAFÉ · ABHA</p>
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
                    <p className="text-[#C9956A] text-[12px] font-bold">كلاسيك</p>
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

      {/* ── Community ────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="bg-white/75 rounded-[28px] p-6 border border-[rgba(123,22,24,0.07)] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[10px] text-[#7B1618] font-semibold tracking-widest uppercase mb-1">مجتمع حيز</p>
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

      {/* ── CTA ──────────────────────────────────────────── */}
      <div className="max-w-lg mx-auto px-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-[28px] p-8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#080003 0%,#3D0809 45%,#0D0003 75%,#1A0406 100%)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(201,149,106,0.18) 0%,transparent 60%)' }} />
          <div className="absolute bottom-0 left-0 w-36 h-36 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle,#C9956A 1.5px,transparent 1.5px)', backgroundSize: '10px 10px' }} />
          <div className="relative z-10">
            <p className="text-[#C9956A] text-[11px] font-semibold tracking-widest uppercase mb-3">الاستثمار الكلي</p>
            <div className="flex items-start justify-center gap-1 mb-1">
              <span className="text-white text-[52px] font-bold leading-none font-inter">18,000</span>
            </div>
            <p className="text-[#C9956A] text-[18px] font-light mb-1.5">ريال سعودي</p>
            <p className="text-white/30 text-[12px] font-light mb-6">
              iOS + Android · موقع · Wallet · Watch · مجتمع · حجوزات · دعم كامل
            </p>
            <div className="grid grid-cols-2 gap-2.5 mb-7">
              {['تسليم خلال ٦٠ يوم','نشر على المتجرين','سنة دعم مجاني','تدريب الفريق'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/50 text-[11px]">
                  <div className="w-1.5 h-1.5 bg-[#C9956A] rounded-full shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              className="block w-full bg-white text-[#7B1618] font-bold text-[15px] py-4 rounded-[16px] hover:bg-[#FDF9F4] active:scale-95 transition-all duration-200 shadow-[0_8px_28px_rgba(0,0,0,0.2)]">
              أبدأ مشروعي مع تلقا تك 🚀
            </a>
            <p className="text-white/25 text-[11px] mt-3 font-light">تواصل معنا على واتساب للاستفسار المجاني</p>
          </div>
        </motion.div>
      </div>

      {/* ── Footer ────────────────────────────────────────── */}
      <div className="text-center pb-8 px-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#7B1618,#4A0D0F)' }}>
            <span className="text-white text-[9px] font-bold">ت</span>
          </div>
          <span className="text-[13px] font-bold text-[#111]">تلقا تك</span>
        </div>
        <p className="text-[11px] text-[#CCC] font-light">تصميم وتطوير احترافي · جميع الحقوق محفوظة ٢٠٢٥</p>
      </div>
    </div>
  );
}
