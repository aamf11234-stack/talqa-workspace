import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, ShoppingBag, QrCode, Wallet, Upload, RotateCcw,
  MessageCircle, Flame, Percent, Gift, Plus, Check,
  Coffee, Store, Ticket
} from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=أريد%20تطبيق%20ولاء%20مثل%20الديمو';

/* ─────────────── Types ─────────────── */
type PhoneTab = 'home' | 'menu' | 'card';

interface BrandColor {
  label: string; hex: string;
  bg: string; card: string; border: string;
}
interface Offer { emoji: string; title: string; sub: string; tag: string; timer: string; }
interface Product { emoji: string; name: string; price: number; orig: number | null; }

/* ─────────────── Presets ─────────────── */
const COLORS: BrandColor[] = [
  { label: 'بني قهوة', hex: '#C4783A', bg: '#0D0500', card: '#1A0C04', border: '#C4783A' },
  { label: 'بنفسجي',  hex: '#8B5CF6', bg: '#07040F', card: '#110820', border: '#8B5CF6' },
  { label: 'أزرق',    hex: '#3B82F6', bg: '#030C1A', card: '#071428', border: '#3B82F6' },
  { label: 'أخضر',    hex: '#10B981', bg: '#021208', card: '#041E10', border: '#10B981' },
  { label: 'وردي',    hex: '#EC4899', bg: '#0F0208', card: '#1E0414', border: '#EC4899' },
  { label: 'أحمر',    hex: '#EF4444', bg: '#0F0202', card: '#1E0404', border: '#EF4444' },
  { label: 'ذهبي',    hex: '#F59E0B', bg: '#0D0800', card: '#1A1000', border: '#F59E0B' },
  { label: 'رمادي',   hex: '#6B7280', bg: '#080A0C', card: '#101318', border: '#6B7280' },
];

const BUSINESSES = [
  {
    id: 'cafe', label: '☕ مقهى',
    offers: [
      { emoji: '☕', title: 'قهوتان للسعر الواحد',     sub: 'للأعضاء فقط · حتى ١٢م',      tag: 'عضوية',  timer: '٢:١٨:٤٥' },
      { emoji: '🍰', title: 'حلى مجاناً مع أي طلب',   sub: 'لأعياد الميلاد هذا الشهر',    tag: 'مناسبة', timer: '' },
    ] as Offer[],
    products: [
      { emoji: '☕', name: 'قهوة تخصص', price: 22, orig: 28 },
      { emoji: '🥤', name: 'كومبو المساء', price: 38, orig: 52 },
      { emoji: '🍰', name: 'كيك شوكولاتة', price: 12, orig: null },
      { emoji: '🧋', name: 'ماتشا لاتيه', price: 18, orig: 23 },
    ] as Product[],
  },
  {
    id: 'restaurant', label: '🍔 مطعم',
    offers: [
      { emoji: '🍔', title: 'وجبة مجانية عند ١٠ زيارات', sub: 'للأعضاء الذهبيين',             tag: 'ولاء',  timer: '' },
      { emoji: '🥤', title: 'مشروب مجاني مع أي وجبة',   sub: 'ينتهي الليلة الساعة ١٢',       tag: 'عرض',  timer: '٤:٣٠:٠٠' },
    ] as Offer[],
    products: [
      { emoji: '🍔', name: 'برجر كلاسيك',    price: 35, orig: 45 },
      { emoji: '🍕', name: 'بيتزا مارغريتا', price: 55, orig: null },
      { emoji: '🌯', name: 'شاورما دجاج',    price: 28, orig: 35 },
      { emoji: '🥗', name: 'سلطة سيزر',      price: 22, orig: null },
    ] as Product[],
  },
  {
    id: 'gym', label: '💪 صالة',
    offers: [
      { emoji: '💪', title: 'شهر مجاني مع الاشتراك السنوي', sub: 'العرض ينتهي نهاية الشهر', tag: 'سنوي',   timer: '6:00:00' },
      { emoji: '🧘', title: 'حصة يوغا مجانية',              sub: 'مع كل تجديد اشتراك',      tag: 'عضوية',  timer: '' },
    ] as Offer[],
    products: [
      { emoji: '📅', name: 'اشتراك شهري',       price: 250, orig: 300 },
      { emoji: '🏆', name: 'اشتراك سنوي',       price: 2000, orig: 3000 },
      { emoji: '🏋️', name: 'تمرين مع مدرب',    price: 150, orig: null },
      { emoji: '👩', name: 'قسم النساء',         price: 200, orig: 250 },
    ] as Product[],
  },
  {
    id: 'clinic', label: '🏥 عيادة',
    offers: [
      { emoji: '🏥', title: 'كشف مجاني للأعضاء الجدد', sub: 'صالح لأول زيارة فقط',  tag: 'جديد',   timer: '' },
      { emoji: '💊', title: 'خصم ٢٠٪ على الخدمات',      sub: 'طوال شهر رمضان',       tag: 'موسمي', timer: '' },
    ] as Offer[],
    products: [
      { emoji: '🩺', name: 'كشف عام',          price: 150, orig: 200 },
      { emoji: '🥗', name: 'استشارة تغذية',    price: 200, orig: null },
      { emoji: '💆', name: 'جلسة علاج طبيعي', price: 120, orig: 150 },
      { emoji: '🔬', name: 'فحوصات شاملة',    price: 350, orig: 500 },
    ] as Product[],
  },
];

/* ─────────────── Phone App UI ─────────────── */

function AppHeader({ name, logoUrl, color, points }: { name: string; logoUrl: string | null; color: BrandColor; points: number; }) {
  const initial = name ? name[0] : '؟';
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          background: logoUrl ? 'transparent' : `${color.hex}22`,
          border: `1.5px solid ${color.hex}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', flexShrink: 0,
        }}>
          {logoUrl
            ? <img src={logoUrl} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: 14, fontWeight: 800, color: color.hex }}>{initial}</span>
          }
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{name || 'اسم المتجر'}</div>
          <div style={{ fontSize: 9, color: `${color.hex}99`, fontWeight: 600 }}>تطبيق الولاء</div>
        </div>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        background: `${color.hex}18`, border: `1px solid ${color.hex}30`,
        padding: '4px 10px', borderRadius: 99,
      }}>
        <Flame size={11} color={color.hex} />
        <span style={{ fontSize: 10, fontWeight: 700, color: color.hex }}>١٢ يوم</span>
      </div>
    </div>
  );
}

function HomeTab({ name, logoUrl, color, offers }: { name: string; logoUrl: string | null; color: BrandColor; offers: Offer[] }) {
  const points = 247;
  const maxPts = 500;
  const r = 48; const circ = 2 * Math.PI * r;
  const progress = (points / maxPts) * circ;

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px', scrollbarWidth: 'none' }}>
      {/* Greeting */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>مرحباً،</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>سلطان 👋</div>
      </div>

      {/* Points Ring */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0 18px', position: 'relative' }}>
        <svg width={120} height={120} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={60} cy={60} r={r} fill="none" stroke={`${color.hex}18`} strokeWidth={6} />
          <motion.circle
            cx={60} cy={60} r={r} fill="none" stroke={color.hex} strokeWidth={6} strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - progress }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div style={{ position: 'absolute', top: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 120 }}>
          <span style={{ fontSize: 26, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{points}</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>نقطة</span>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
          باقي {maxPts - points} نقطة للمكافأة القادمة
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 18 }}>
        {[
          { Icon: ShoppingBag, label: 'اطلب الآن', primary: true },
          { Icon: Ticket,      label: 'عروضي',     primary: false },
          { Icon: Store,       label: 'الفروع',    primary: false },
        ].map(({ Icon, label, primary }) => (
          <div key={label} style={{
            borderRadius: 14, padding: '12px 8px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            background: primary ? color.hex : 'rgba(255,255,255,0.06)',
            border: primary ? 'none' : '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
          }}>
            <Icon size={18} color={primary ? '#fff' : 'rgba(255,255,255,0.5)'} />
            <span style={{ fontSize: 10, fontWeight: 600, color: primary ? '#fff' : 'rgba(255,255,255,0.5)' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Offer Cards */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 10 }}>العروض</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {offers.map((o, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{
                padding: '12px 14px', borderRadius: 14,
                background: `linear-gradient(135deg, ${color.bg}, ${color.card})`,
                border: `1px solid ${color.hex}25`,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{o.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{o.title}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{o.sub}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0, gap: 3 }}>
                <span style={{
                  fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 99,
                  background: `${color.hex}25`, color: color.hex,
                }}>{o.tag}</span>
                {o.timer && <span style={{ fontSize: 9, color: `${color.hex}cc`, fontWeight: 700 }}>⏱ {o.timer}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MenuTab({ color, products }: { color: BrandColor; products: Product[] }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px', scrollbarWidth: 'none' }}>
      <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 14 }}>المنتجات</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {products.map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            style={{
              padding: '12px 14px', borderRadius: 14,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10, flexShrink: 0,
              background: `${color.hex}15`, border: `1px solid ${color.hex}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>{p.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{p.name}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{p.orig ? `وفّر ${p.orig - p.price} ر.س` : 'منتج مميز'}</div>
            </div>
            <div style={{ textAlign: 'left', flexShrink: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 900, color: color.hex }}>{p.price} ر</div>
              {p.orig && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textDecoration: 'line-through' }}>{p.orig} ر</div>}
            </div>
            <div style={{
              width: 26, height: 26, borderRadius: 8, flexShrink: 0,
              background: `${color.hex}20`, border: `1px solid ${color.hex}35`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <Plus size={13} color={color.hex} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CardTab({ name, logoUrl, color }: { name: string; logoUrl: string | null; color: BrandColor }) {
  const initial = name ? name[0] : '؟';
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px', scrollbarWidth: 'none' }}>
      <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 14 }}>بطاقتي</div>

      {/* Card */}
      <div style={{
        width: '100%', aspectRatio: '1.6 / 1', borderRadius: 18,
        background: `linear-gradient(135deg, ${color.card}, ${color.bg})`,
        border: `1px solid ${color.hex}30`,
        padding: '16px', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', marginBottom: 12,
        boxShadow: `0 16px 40px ${color.hex}20`, position: 'relative', overflow: 'hidden',
      }}>
        {/* Watermark */}
        <div style={{ position: 'absolute', bottom: -20, left: -20, fontSize: 90, opacity: 0.04, transform: 'rotate(-15deg)', pointerEvents: 'none', lineHeight: 1 }}>
          {logoUrl ? null : initial}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {logoUrl
              ? <img src={logoUrl} alt="logo" style={{ width: 28, height: 28, borderRadius: 7, objectFit: 'cover' }} />
              : <div style={{ width: 28, height: 28, borderRadius: 7, background: `${color.hex}25`, border: `1px solid ${color.hex}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: color.hex }}>{initial}</div>
            }
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#fff', letterSpacing: '0.05em' }}>{name || 'اسم المتجر'}</div>
              <div style={{ fontSize: 8, color: `${color.hex}99`, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Loyalty Card</div>
            </div>
          </div>
          <div style={{ padding: '3px 8px', borderRadius: 99, background: `${color.hex}25`, border: `1px solid ${color.hex}40`, fontSize: 9, fontWeight: 800, color: color.hex }}>
            Gold Member
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginBottom: 2 }}>الاسم</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>سلطان الغامدي</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>عضو منذ يناير ٢٠٢٥</div>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 9, color: color.hex, marginBottom: 2 }}>الرصيد</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', lineHeight: 1 }}>247</div>
          </div>
        </div>
      </div>

      {/* Apple Wallet button */}
      <button style={{
        width: '100%', padding: '13px', borderRadius: 14,
        background: '#000', border: '1px solid rgba(255,255,255,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', marginBottom: 14,
      }}>
        <Wallet size={16} /> إضافة لـ Apple Wallet
      </button>

      {/* Rewards */}
      <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 10 }}>المكافآت</div>
      {[
        { Icon: Coffee,  label: 'مشروب مجاني',  pts: 200, available: false, pct: 100 },
        { Icon: Percent, label: `خصم ٣٠٪`,       pts: 400, available: true,  pct: 62  },
        { Icon: Gift,    label: 'هدية مميزة',   pts: 500, available: false, pct: 49  },
      ].map(({ Icon, label, pts, available, pct }) => (
        <div key={label} style={{
          padding: '12px', borderRadius: 14, marginBottom: 8,
          background: 'rgba(255,255,255,0.04)', border: `1px solid ${available ? `${color.hex}35` : 'rgba(255,255,255,0.08)'}`,
          display: 'flex', alignItems: 'center', gap: 10,
          opacity: available || pct === 100 ? 1 : 0.7,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color.hex}18`, border: `1px solid ${color.hex}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon size={16} color={color.hex} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: available ? color.hex : '#fff' }}>{label}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{pts} نقطة</div>
          </div>
          {available
            ? <button style={{ padding: '5px 12px', borderRadius: 99, background: color.hex, border: 'none', color: '#fff', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>استبدال</button>
            : <div style={{ width: 48, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: color.hex, borderRadius: 99 }} />
              </div>
          }
        </div>
      ))}
    </div>
  );
}

function BottomNav({ tab, setTab, color }: { tab: PhoneTab; setTab: (t: PhoneTab) => void; color: BrandColor }) {
  const TABS: { id: PhoneTab; label: string; Icon: typeof Home }[] = [
    { id: 'home', label: 'الرئيسية', Icon: Home },
    { id: 'menu', label: 'المنتجات', Icon: ShoppingBag },
    { id: 'card', label: 'بطاقتي',   Icon: QrCode },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 76,
      background: 'rgba(10,5,2,0.92)', backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '0 8px 12px', zIndex: 40,
    }}>
      {TABS.map(({ id, label, Icon }) => {
        const active = tab === id;
        return (
          <button key={id} onClick={() => setTab(id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            background: 'none', border: 'none', cursor: 'pointer', padding: '6px 16px',
            color: active ? color.hex : 'rgba(255,255,255,0.3)',
            position: 'relative',
          }}>
            {active && <motion.div layoutId="nav-indicator" style={{ position: 'absolute', top: -2, width: 20, height: 2, borderRadius: 99, background: color.hex }} transition={{ type: 'spring', stiffness: 300, damping: 28 }} />}
            <Icon size={22} strokeWidth={active ? 2.5 : 2} />
            <span style={{ fontSize: 9, fontWeight: active ? 700 : 500 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────── Phone Frame ─────────────── */
function PhoneFrame({ children, color }: { children: React.ReactNode; color: BrandColor }) {
  return (
    <div style={{ position: 'relative', width: 280, flexShrink: 0 }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 260, height: 500, borderRadius: '50%',
        background: `radial-gradient(ellipse, ${color.hex}28 0%, transparent 70%)`,
        filter: 'blur(40px)', pointerEvents: 'none', transition: 'background 0.5s',
      }} />
      {/* Shell */}
      <div style={{
        position: 'relative', width: 280, height: 580,
        background: color.bg, borderRadius: 44,
        border: `6px solid rgba(255,255,255,0.10)`,
        boxShadow: `0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(255,255,255,0.04)`,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 90, height: 24, background: '#000',
          borderRadius: '0 0 16px 16px', zIndex: 50,
        }} />
        {/* Status bar */}
        <div style={{ height: 36, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 18px 4px', flexShrink: 0, zIndex: 20 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>٩:٤١</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div style={{ width: 14, height: 7, borderRadius: 2, border: '1px solid rgba(255,255,255,0.4)', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 1, left: 1, right: 3, background: 'rgba(255,255,255,0.7)', borderRadius: 1 }} />
            </div>
          </div>
        </div>
        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>
        {/* Home indicator */}
        <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 80, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.22)', zIndex: 50 }} />
      </div>
      {/* Side buttons */}
      <div style={{ position: 'absolute', top: 90, right: -5, width: 4, height: 32, background: 'rgba(255,255,255,0.12)', borderRadius: '0 3px 3px 0' }} />
      <div style={{ position: 'absolute', top: 100, left: -5, width: 4, height: 24, background: 'rgba(255,255,255,0.10)', borderRadius: '3px 0 0 3px' }} />
      <div style={{ position: 'absolute', top: 132, left: -5, width: 4, height: 48, background: 'rgba(255,255,255,0.10)', borderRadius: '3px 0 0 3px' }} />
    </div>
  );
}

/* ─────────────── Customizer Panel ─────────────── */
function Customizer({
  name, setName, logoUrl, setLogoUrl, color, setColor, bizIdx, setBizIdx,
}: {
  name: string; setName: (v: string) => void;
  logoUrl: string | null; setLogoUrl: (v: string | null) => void;
  color: BrandColor; setColor: (c: BrandColor) => void;
  bizIdx: number; setBizIdx: (i: number) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setLogoUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, [setLogoUrl]);

  const inp: React.CSSProperties = {
    width: '100%', padding: '9px 12px', borderRadius: 10,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontSize: 13, fontWeight: 600, outline: 'none',
    fontFamily: 'Cairo, sans-serif', direction: 'rtl', boxSizing: 'border-box',
  };
  const label: React.CSSProperties = {
    fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, display: 'block',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* Business name */}
      <div>
        <span style={label}>اسم المتجر / الشركة</span>
        <input
          value={name} onChange={e => setName(e.target.value)}
          placeholder="مثال: مقهى النخبة"
          style={inp}
        />
      </div>

      {/* Logo upload */}
      <div>
        <span style={label}>الشعار</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{
            width: 50, height: 50, borderRadius: 12,
            background: logoUrl ? 'transparent' : 'rgba(255,255,255,0.05)',
            border: `1.5px dashed ${logoUrl ? color.hex + '60' : 'rgba(255,255,255,0.15)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0,
          }}>
            {logoUrl
              ? <img src={logoUrl} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.3)' }}>{name ? name[0] : '؟'}</span>
            }
          </div>
          <button onClick={() => fileRef.current?.click()} style={{
            flex: 1, padding: '10px', borderRadius: 10, cursor: 'pointer',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            fontFamily: 'Cairo, sans-serif',
          }}>
            <Upload size={13} /> ارفع شعارك
          </button>
          {logoUrl && (
            <button onClick={() => setLogoUrl(null)} style={{
              width: 36, height: 36, borderRadius: 9, cursor: 'pointer',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <RotateCcw size={12} />
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />
        </div>
      </div>

      {/* Brand color */}
      <div>
        <span style={label}>اللون الرئيسي</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COLORS.map(c => (
            <button key={c.hex} onClick={() => setColor(c)}
              title={c.label}
              style={{
                width: 30, height: 30, borderRadius: '50%', cursor: 'pointer',
                background: c.hex, border: `2.5px solid ${color.hex === c.hex ? '#fff' : 'transparent'}`,
                outline: color.hex === c.hex ? `2px solid ${c.hex}` : 'none',
                outlineOffset: 2,
                transform: color.hex === c.hex ? 'scale(1.18)' : 'scale(1)',
                transition: 'all 0.2s', flexShrink: 0,
                boxShadow: color.hex === c.hex ? `0 0 12px ${c.hex}80` : 'none',
              }} />
          ))}
        </div>
      </div>

      {/* Business type */}
      <div>
        <span style={label}>نوع النشاط</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {BUSINESSES.map((b, i) => (
            <button key={b.id} onClick={() => setBizIdx(i)} style={{
              padding: '8px 10px', borderRadius: 10, cursor: 'pointer',
              background: bizIdx === i ? `${color.hex}18` : 'rgba(255,255,255,0.03)',
              border: `1.5px solid ${bizIdx === i ? color.hex + '50' : 'rgba(255,255,255,0.08)'}`,
              color: bizIdx === i ? '#fff' : 'rgba(255,255,255,0.5)',
              fontSize: 11, fontWeight: 700, fontFamily: 'Cairo, sans-serif',
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            }}>
              {bizIdx === i && <Check size={10} color={color.hex} />}
              {b.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ─────────────── Main Section ─────────────── */
export default function LiveDemo() {
  const [name,    setName]    = useState('مقهى النخبة');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [color,   setColor]   = useState<BrandColor>(COLORS[0]);
  const [bizIdx,  setBizIdx]  = useState(0);
  const [tab,     setTab]     = useState<PhoneTab>('home');

  const biz = BUSINESSES[bizIdx];

  return (
    <section id="live-demo" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Orbs */}
      <div className="orb" style={{ width: 500, height: 500, top: '10%', right: '-5%', background: `${color.hex}08`, animationDelay: '-2s', transition: 'background 0.5s' }} />
      <div className="orb" style={{ width: 400, height: 400, bottom: '5%', left: '-5%', background: `${color.hex}06`, animationDelay: '-6s', transition: 'background 0.5s' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label">ديمو تفاعلي حقيقي</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            شوف تطبيقك{' '}
            <span className="grad">قبل ما تبدأ</span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 16, marginTop: 14, maxWidth: 480, margin: '14px auto 0' }}>
            غيّر الاسم والشعار والألوان — التطبيق يتحدث لحظة بلحظة.
          </p>
        </motion.div>

        {/* Layout: customizer | phone */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>

          {/* Left: customizer */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div style={{
              padding: '28px', borderRadius: 24,
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${color.hex}20`,
              boxShadow: `0 0 60px ${color.hex}08`,
              transition: 'border-color 0.4s, box-shadow 0.4s',
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: color.hex, display: 'inline-block' }} />
                خصّص تطبيقك
              </div>
              <Customizer
                name={name} setName={setName}
                logoUrl={logoUrl} setLogoUrl={setLogoUrl}
                color={color} setColor={setColor}
                bizIdx={bizIdx} setBizIdx={setBizIdx}
              />
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                    padding: '12px', borderRadius: 12, textDecoration: 'none',
                    background: `linear-gradient(135deg, ${color.hex}, ${color.hex}99)`,
                    color: '#fff', fontSize: 13, fontWeight: 800,
                    boxShadow: `0 8px 28px ${color.hex}35`,
                    fontFamily: 'Cairo, sans-serif', minWidth: 0,
                  }}>
                  <MessageCircle size={15} /> ابني تطبيقي ←
                </a>
              </div>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 14 }}>
              {[
                { val: '٣-٤', sub: 'أسابيع تسليم' },
                { val: '١٠٠٪', sub: 'مخصص لك' },
                { val: '٢٤/٧', sub: 'دعم مجاني' },
              ].map(({ val, sub }) => (
                <div key={sub} style={{ padding: '10px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: color.hex, transition: 'color 0.3s' }}>{val}</div>
                  <div style={{ fontSize: 9, color: 'var(--text3)', marginTop: 2 }}>{sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Phone */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <PhoneFrame color={color}>
              <AppHeader name={name} logoUrl={logoUrl} color={color} points={247} />
              <AnimatePresence mode="wait">
                <motion.div key={tab + bizIdx} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  {tab === 'home' && <HomeTab name={name} logoUrl={logoUrl} color={color} offers={biz.offers} />}
                  {tab === 'menu' && <MenuTab color={color} products={biz.products} />}
                  {tab === 'card' && <CardTab name={name} logoUrl={logoUrl} color={color} />}
                </motion.div>
              </AnimatePresence>
              <BottomNav tab={tab} setTab={setTab} color={color} />
            </PhoneFrame>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media(max-width:860px){
          #live-demo > div > div:last-child {
            grid-template-columns: 1fr !important;
            justify-items: center;
          }
          #live-demo > div > div:last-child > div:first-child { order: 2; width: 100%; }
          #live-demo > div > div:last-child > div:last-child  { order: 1; }
        }
      `}</style>
    </section>
  );
}
