import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone, Star, Gift, CalendarDays, ShoppingBag,
  Bell, BarChart3, ArrowUpRight, Check, Crown,
  Users, TrendingUp, Zap, Shield,
} from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أبي%20تطبيق%20جوال%20احترافي';
const WA_ICON = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L.054 23.077a.75.75 0 00.917.944l5.453-1.426A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 01-4.978-1.371l-.357-.212-3.698.967.984-3.593-.232-.369A9.718 9.718 0 012.25 12C2.25 6.61 6.61 2.25 12 2.25S21.75 6.61 21.75 12 17.39 21.75 12 21.75z"/>
  </svg>
);

/* ══════════════════════════════════
   APP SCREENS
══════════════════════════════════ */
interface AppScreen {
  id: string; label: string; Icon: typeof Star;
  color: string;
  screen: React.FC<{ color: string }>;
  features: string[];
}

function LoyaltyScreen({ color }: { color: string }) {
  return (
    <div style={{ direction: 'rtl' }}>
      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px', marginBottom: 12 }}>
        <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>9:41</span>
        <div style={{ display: 'flex', gap: 3 }}>
          {[1,2,3].map(i => <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }}/>)}
        </div>
      </div>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg,${color},${color}88)`,
          margin: '0 auto 7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>☕</div>
        <div style={{ fontSize: 12, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>كافيهك</div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'Cairo,sans-serif' }}>مرحباً، أحمد 👋</div>
      </div>
      {/* Points card */}
      <div style={{ padding: '12px', borderRadius: 14, background: `linear-gradient(135deg,${color}22,${color}0d)`,
        border: `1px solid ${color}35`, marginBottom: 10 }}>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontFamily: 'Cairo,sans-serif', marginBottom: 3 }}>رصيد النقاط</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: color, letterSpacing: -2, lineHeight: 1 }}>٢٤٧</div>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', marginTop: 2, fontFamily: 'Cairo,sans-serif' }}>تحتاج ٥٣ نقطة للجائزة التالية</div>
        <div style={{ marginTop: 8, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)' }}>
          <div style={{ width: '82%', height: '100%', borderRadius: 2, background: color }}/>
        </div>
      </div>
      {/* Level badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px',
        borderRadius: 11, background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.25)' }}>
        <Crown size={14} color="#FFC107" strokeWidth={2}/>
        <div>
          <div style={{ fontSize: 10, fontWeight: 900, color: '#FFC107', fontFamily: 'Cairo,sans-serif' }}>عضو ذهبي 🏆</div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', fontFamily: 'Cairo,sans-serif' }}>خصم ١٥٪ على كل طلباتك</div>
        </div>
      </div>
    </div>
  );
}

function BookingsScreen({ color }: { color: string }) {
  const slots = [
    { t: '٩:٠٠', s: 'محجوز' }, { t: '٩:٣٠', s: 'متاح' },
    { t: '١٠:٠٠', s: 'محجوز' }, { t: '١٠:٣٠', s: 'متاح' },
    { t: '١١:٠٠', s: 'متاح' },
  ];
  return (
    <div style={{ direction: 'rtl' }}>
      <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 3, fontFamily: 'Cairo,sans-serif' }}>9:41</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>حجز موعد</span>
        <span style={{ fontSize: 9, color: color, fontWeight: 700, fontFamily: 'Cairo,sans-serif' }}>الأحد ٢٠ يوليو</span>
      </div>
      {/* Service selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {['قهوة', 'جلسة VIP', 'إفطار'].map((s, i) => (
          <div key={s} style={{ flex: 1, padding: '6px 0', borderRadius: 9, textAlign: 'center',
            background: i === 0 ? `${color}22` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${i === 0 ? color + '50' : 'rgba(255,255,255,0.07)'}`,
            fontSize: 8.5, fontWeight: 700, color: i === 0 ? color : 'rgba(255,255,255,0.35)',
            fontFamily: 'Cairo,sans-serif', cursor: 'pointer' }}>{s}</div>
        ))}
      </div>
      {slots.map((sl, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
          borderRadius: 10, marginBottom: 5,
          background: sl.s === 'محجوز' ? `${color}10` : 'rgba(255,255,255,0.03)',
          border: `1px solid ${sl.s === 'محجوز' ? color + '30' : 'rgba(255,255,255,0.06)'}` }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: color, fontFamily: 'monospace', width: 30 }}>{sl.t}</span>
          <div style={{ flex: 1, height: 7, borderRadius: 3.5, background: sl.s === 'محجوز' ? `${color}55` : 'rgba(255,255,255,0.07)' }}/>
          <span style={{ fontSize: 8.5, fontWeight: 700, color: sl.s === 'محجوز' ? color : 'rgba(255,255,255,0.25)',
            fontFamily: 'Cairo,sans-serif' }}>{sl.s}</span>
        </div>
      ))}
    </div>
  );
}

function StoreScreen({ color }: { color: string }) {
  const products = [
    { name: 'قهوة ذهبية', price: '٢٥ ر', badge: 'الأكثر طلباً' },
    { name: 'كيك الفلفل', price: '٣٢ ر', badge: null },
    { name: 'عصير طازج', price: '١٨ ر', badge: 'خصم ٢٠٪' },
    { name: 'ساندويتش', price: '٢٨ ر', badge: null },
  ];
  return (
    <div style={{ direction: 'rtl' }}>
      <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 3, fontFamily: 'Cairo,sans-serif' }}>9:41</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>قائمتنا</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px',
          borderRadius: 99, background: `${color}18`, border: `1px solid ${color}35` }}>
          <ShoppingBag size={10} color={color} strokeWidth={2}/>
          <span style={{ fontSize: 9, fontWeight: 800, color, fontFamily: 'Cairo,sans-serif' }}>٢ منتجات</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        {products.map((p, i) => (
          <div key={i} style={{ borderRadius: 12, background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <div style={{ height: 44, background: `linear-gradient(135deg,${color}18,${color}08)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              {['☕','🍰','🥤','🥪'][i]}
            </div>
            <div style={{ padding: '7px 8px' }}>
              {p.badge && (
                <div style={{ fontSize: 6.5, fontWeight: 800, color, fontFamily: 'Cairo,sans-serif',
                  background: `${color}18`, borderRadius: 4, padding: '1px 4px', display: 'inline-block', marginBottom: 3 }}>
                  {p.badge}
                </div>
              )}
              <div style={{ fontSize: 9, fontWeight: 800, color: '#fff', fontFamily: 'Cairo,sans-serif', lineHeight: 1.3 }}>{p.name}</div>
              <div style={{ fontSize: 10, fontWeight: 900, color, fontFamily: 'Cairo,sans-serif', marginTop: 3 }}>{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsScreen({ color }: { color: string }) {
  const notifs = [
    { icon: '🎁', title: 'مكافأة خاصة!', body: 'ربحت قهوة مجانية لعيد ميلادك 🎂', time: 'الآن', hot: true },
    { icon: '📅', title: 'تذكير موعدك', body: 'موعدك غداً الساعة ١٠ صباحاً', time: 'منذ ٢ س', hot: false },
    { icon: '🏷️', title: 'عرض حصري', body: 'خصم ٣٠٪ على كل المشروبات اليوم فقط', time: 'منذ ٥ س', hot: false },
    { icon: '⭐', title: 'وصلت الذهبي!', body: 'ترقيت لمستوى ذهبي — استمتع بمزاياك', time: 'أمس', hot: false },
  ];
  return (
    <div style={{ direction: 'rtl' }}>
      <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 3, fontFamily: 'Cairo,sans-serif' }}>9:41</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>الإشعارات</span>
        <span style={{ fontSize: 8.5, fontWeight: 800, padding: '2px 8px', borderRadius: 99,
          background: `${color}22`, color, fontFamily: 'Cairo,sans-serif' }}>٤ جديد</span>
      </div>
      {notifs.map((n, i) => (
        <div key={i} style={{ display: 'flex', gap: 9, padding: '9px 10px', borderRadius: 11, marginBottom: 6,
          background: n.hot ? `${color}10` : 'rgba(255,255,255,0.03)',
          border: `1px solid ${n.hot ? color + '30' : 'rgba(255,255,255,0.06)'}` }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: n.hot ? `${color}20` : 'rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{n.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: n.hot ? color : '#fff',
              fontFamily: 'Cairo,sans-serif', marginBottom: 2 }}>{n.title}</div>
            <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.38)', lineHeight: 1.4,
              fontFamily: 'Cairo,sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.body}</div>
          </div>
          <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.25)', fontFamily: 'Cairo,sans-serif', flexShrink: 0 }}>{n.time}</div>
        </div>
      ))}
    </div>
  );
}

function AnalyticsScreen({ color }: { color: string }) {
  const bars = [45, 62, 38, 78, 55, 90, 70];
  const days = ['ن','ث','ث','ر','خ','ج','س'];
  return (
    <div style={{ direction: 'rtl' }}>
      <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 3, fontFamily: 'Cairo,sans-serif' }}>9:41</div>
      <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', marginBottom: 12, fontFamily: 'Cairo,sans-serif' }}>تقاريرك</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 12 }}>
        {[
          { icon: '💰', label: 'المبيعات', value: '٢٤,٥٠٠', change: '↑١٢٪' },
          { icon: '👥', label: 'عملاء جدد', value: '٤٧', change: '↑٨٪' },
        ].map(s => (
          <div key={s.label} style={{ padding: '10px', borderRadius: 12,
            background: `${color}0f`, border: `1px solid ${color}22` }}>
            <div style={{ fontSize: 14, marginBottom: 3 }}>{s.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', lineHeight: 1, fontFamily: 'Cairo,sans-serif' }}>{s.value}</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', fontFamily: 'Cairo,sans-serif', marginTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 8.5, color: '#10B981', fontWeight: 700, marginTop: 1 }}>{s.change}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontFamily: 'Cairo,sans-serif', marginBottom: 8 }}>مبيعات الأسبوع</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 40 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <motion.div initial={{ height: 0 }} animate={{ height: `${h * 0.4}px` }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                style={{ width: '100%', borderRadius: '2px 2px 0 0',
                  background: `linear-gradient(180deg,${color},${color}66)` }}/>
              <span style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.3)' }}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SCREENS: AppScreen[] = [
  {
    id: 'loyalty', label: 'برنامج الولاء', Icon: Star,
    color: '#A78BFA',
    screen: LoyaltyScreen,
    features: [
      'نقاط على كل عملية تُضاف تلقائياً',
      'مستويات VIP: فضي · ذهبي · بلاتيني',
      'مكافآت قابلة للاستبدال — هدايا وخصومات',
      'عروض أعياد ميلاد تلقائية',
      'برنامج إحالة — العميل يجيب أصدقاءه',
    ],
  },
  {
    id: 'bookings', label: 'الحجوزات', Icon: CalendarDays,
    color: '#06B6D4',
    screen: BookingsScreen,
    features: [
      'تقويم يمنع الحجوزات المتضاربة تلقائياً',
      'حجز أونلاين ٢٤/٧ — العميل يختار وقته',
      'تذكير واتساب قبل الموعد بـ ٢٤ ساعة',
      'قائمة انتظار ذكية تملأ الإلغاءات',
      'تخصيص الحجز بالموظف أو الخدمة',
    ],
  },
  {
    id: 'store', label: 'المتجر الداخلي', Icon: ShoppingBag,
    color: '#F97316',
    screen: StoreScreen,
    features: [
      'قائمة منتجات وخدمات بصور وأسعار',
      'طلب مباشر داخل التطبيق',
      'دفع بالبطاقة · Apple Pay · STC Pay',
      'تتبع الطلب لحظياً حتى التسليم',
      'كوبونات خصم قابلة للتخصيص',
    ],
  },
  {
    id: 'push', label: 'الإشعارات', Icon: Bell,
    color: '#10B981',
    screen: NotificationsScreen,
    features: [
      'Push Notifications مستهدفة بالسيجمنت',
      'حملات تلقائية: ترحيب · عيد ميلاد · إعادة تفعيل',
      'إشعار عند اقتراب انتهاء النقاط',
      'معدل الفتح والنقر لكل رسالة',
      'لا تُزعج — الإشعار الصح في الوقت الصح',
    ],
  },
  {
    id: 'analytics', label: 'التحليلات', Icon: BarChart3,
    color: '#3B82F6',
    screen: AnalyticsScreen,
    features: [
      'مبيعات يومية وشهرية وسنوية لحظياً',
      'أفضل المنتجات والأوقات مبيعاً',
      'معدل عودة العملاء والاحتفاظ',
      'خريطة العملاء — من أين يأتون',
      'تقارير PDF جاهزة للتحميل',
    ],
  },
];

/* ══════════════════════════════════
   PHONE MOCKUP
══════════════════════════════════ */
function PhoneMockup({ screen: Screen, color }: { screen: AppScreen['screen']; color: string }) {
  return (
    <motion.div
      key={color}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: 220, margin: '0 auto',
        background: '#0d0d12', borderRadius: 36,
        border: '2px solid rgba(255,255,255,0.1)',
        padding: '10px 10px 14px',
        boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px ${color}20`,
        position: 'relative', overflow: 'hidden',
      }}>
      {/* Notch */}
      <div style={{ width: 70, height: 20, borderRadius: 10, background: '#000',
        margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333' }}/>
        <div style={{ width: 36, height: 5, borderRadius: 3, background: '#1a1a1a' }}/>
      </div>
      {/* Screen content */}
      <div style={{ padding: '4px 6px', minHeight: 340 }}>
        <Screen color={color}/>
      </div>
      {/* Home bar */}
      <div style={{ width: 70, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.18)',
        margin: '10px auto 0' }}/>
      {/* Glow inside */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 80,
        background: `radial-gradient(ellipse 80% 60% at 50% 0%,${color}18 0%,transparent 100%)`,
        pointerEvents: 'none',
      }}/>
    </motion.div>
  );
}

/* ══════════════════════════════════
   STATS
══════════════════════════════════ */
const APP_STATS = [
  { Icon: Users,      value: '+٣٠٠',   label: 'تطبيق مُطلَق',       color: '#A78BFA' },
  { Icon: Star,       value: '٤.٩',    label: 'تقييم متوسط',        color: '#FBB324' },
  { Icon: TrendingUp, value: '+٤٥٪',   label: 'معدل عودة العملاء', color: '#10B981' },
  { Icon: Zap,        value: '٣ أسابيع', label: 'وقت التسليم',     color: '#60A5FA' },
];

/* ══════════════════════════════════
   MAIN SECTION
══════════════════════════════════ */
export default function AppsSection() {
  const [activeId, setActiveId] = useState('loyalty');
  const active = SCREENS.find(s => s.id === activeId)!;

  return (
    <section id="apps" style={{
      padding: 'clamp(90px,10vw,140px) 0',
      background: '#070710',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <AnimatePresence>
          <motion.div key={activeId}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse 80% 60% at 75% 50%,${active.color}10 0%,transparent 65%)`,
            }}/>
        </AnimatePresence>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',
          backgroundSize: '52px 52px',
        }}/>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>

          <div className="section-label" style={{
            color: '#A78BFA', borderColor: 'rgba(167,139,250,0.4)',
            background: 'rgba(167,139,250,0.1)', marginBottom: 20,
            display: 'inline-flex', alignItems: 'center', gap: 7,
          }}>
            <Smartphone size={12} strokeWidth={2}/>
            تطبيقات iOS & Android
          </div>

          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2.2rem,4.8vw,3.8rem)',
            letterSpacing: '-0.045em', lineHeight: 1.08, marginBottom: 18, color: '#fff' }}>
            تطبيق بهويتك
            <br/>
            <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#A78BFA)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              يجمع عميلك ويجعله يعود
            </span>
          </h2>

          <p style={{ fontSize: 16.5, color: 'rgba(255,255,255,0.42)', maxWidth: 540,
            margin: '0 auto', lineHeight: 1.8, fontFamily: 'Cairo,sans-serif' }}>
            تطبيق احترافي بشعارك وألوانك — يشمل الولاء، الحجوزات، المتجر، والإشعارات.
            جاهز على App Store و Google Play.
          </p>
        </motion.div>

        {/* ── SCREEN TABS ── */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 52, flexWrap: 'wrap' }}>
          {SCREENS.map(s => {
            const on = activeId === s.id;
            return (
              <motion.button key={s.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => setActiveId(s.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 18px', borderRadius: 12, cursor: 'pointer',
                  background: on ? `${s.color}18` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${on ? s.color + '50' : 'rgba(255,255,255,0.07)'}`,
                  fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 13,
                  color: on ? s.color : 'rgba(255,255,255,0.38)',
                  boxShadow: on ? `0 4px 20px ${s.color}22` : 'none',
                  transition: 'all 0.2s',
                }}>
                <s.Icon size={14} strokeWidth={1.75}/>
                {s.label}
              </motion.button>
            );
          })}
        </div>

        {/* ── 3-COL MAIN ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, alignItems: 'start', marginBottom: 64 }}>

          {/* COL 1: Features */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 20 }}>

            <AnimatePresence mode="wait">
              <motion.div key={activeId}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12,
                    background: `${active.color}18`, border: `1px solid ${active.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <active.Icon size={20} color={active.color} strokeWidth={1.75}/>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 16, color: '#fff' }}>{active.label}</div>
                    <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: `${active.color}99`, letterSpacing: 1 }}>APP FEATURE</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {active.features.map((f, i) => (
                    <motion.div key={f}
                      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '11px 14px',
                        borderRadius: 12, background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                        background: `${active.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={10} strokeWidth={3} color={active.color}/>
                      </div>
                      <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 12.5,
                        color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{f}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* COL 2: Phone */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}>
            <AnimatePresence mode="wait">
              <PhoneMockup key={activeId} screen={active.screen} color={active.color}/>
            </AnimatePresence>

            {/* App store badges */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 18 }}>
              {[
                { label: 'App Store', sub: 'iOS', icon: '' },
                { label: 'Google Play', sub: 'Android', icon: '' },
              ].map(b => (
                <div key={b.label} style={{
                  padding: '8px 16px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', gap: 7,
                }}>
                  <div style={{ fontSize: 18 }}>{b.label === 'App Store' ? '' : ''}</div>
                  <div>
                    <div style={{ fontFamily: 'sans-serif', fontSize: 8, color: 'rgba(255,255,255,0.35)',
                      letterSpacing: 0.5 }}>AVAILABLE ON</div>
                    <div style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: 11, color: '#fff' }}>{b.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* COL 3: CTA + Tech */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 20 }}>

            {/* Tech highlights */}
            {[
              { Icon: Shield,    c: '#10B981', t: 'React Native',       b: 'iOS و Android من كودبيس واحد — أسرع وأوفر.' },
              { Icon: Zap,       c: '#F59E0B', t: 'بهويتك الكاملة',     b: 'شعارك، ألوانك، اسمك — ليس قالباً جاهزاً.' },
              { Icon: Users,     c: '#60A5FA', t: 'لوحة تحكم ويب',      b: 'إدارة العملاء والطلبات والتقارير من أي جهاز.' },
              { Icon: TrendingUp,c: '#A78BFA', t: 'تحديثات مستمرة',     b: 'دعم ٣ أشهر بعد الإطلاق — مجاناً.' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '13px 15px',
                borderRadius: 13, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                  background: `${t.c}14`, border: `1px solid ${t.c}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <t.Icon size={15} strokeWidth={1.75} color={t.c}/>
                </div>
                <div>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 13,
                    color: '#fff', marginBottom: 3 }}>{t.t}</div>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 11.5,
                    color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{t.b}</div>
                </div>
              </div>
            ))}

            {/* CTAs */}
            <a href={WA} target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                padding: '14px 20px', borderRadius: 14, textDecoration: 'none',
                background: 'linear-gradient(135deg,#6D28D9,#8B5CF6)',
                fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 14, color: '#fff',
                boxShadow: '0 8px 28px rgba(139,92,246,0.3)',
                transition: 'transform 0.18s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}>
              ابدأ تطبيقك الآن
              <ArrowUpRight size={15} strokeWidth={2.5}/>
            </a>

            <a href={WA} target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                padding: '12px 20px', borderRadius: 14, textDecoration: 'none',
                background: 'linear-gradient(135deg,#25D366,#128C7E)',
                fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 14, color: '#fff',
                boxShadow: '0 6px 22px rgba(37,211,102,0.22)',
              }}>
              {WA_ICON}
              تواصل على واتساب
            </a>
          </motion.div>
        </div>

        {/* ── APP STATS ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          style={{ borderRadius: 22, overflow: 'hidden',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {APP_STATS.map(({ Icon: Ic, value, label, color }, i) => (
            <div key={i} style={{ padding: '28px 20px', textAlign: 'center',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ marginBottom: 8 }}>
                <Ic size={18} strokeWidth={1.75} color={color} style={{ margin: '0 auto' }}/>
              </div>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 28,
                color: '#fff', letterSpacing: -1, lineHeight: 1 }}>{value}</div>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 12,
                color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>{label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
