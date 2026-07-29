import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpLeft, CheckCircle2, MoveRight, Smartphone, BarChart3,
  Bell, Star, CalendarDays, Truck, CreditCard, Bot, ChartBar,
  UtensilsCrossed, PartyPopper, ShoppingBag, LayoutDashboard, Layers,
} from 'lucide-react';
import PageLayout from '../PageLayout';
import { useIsMobile } from '../../hooks/useIsMobile';
import heroBg from '../../assets/restaurant-hero.jpg';

/* ── Brand tokens ── */
const R = {
  red:    '#DC2626',
  orange: '#F97316',
  amber:  '#F59E0B',
  grad:   'linear-gradient(135deg,#DC2626,#F97316)',
  gradSoft:'linear-gradient(135deg,rgba(220,38,38,0.15),rgba(249,115,22,0.08))',
  glow:   'rgba(220,38,38,0.28)',
  border: 'rgba(220,38,38,0.20)',
  dim:    'rgba(255,255,255,0.55)',
  dimmer: 'rgba(255,255,255,0.30)',
  bg:     '#0a0501',
  bg2:    '#0f0701',
};
const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أبي%20نظام%20ذكي%20لمطعمي';

const WA_SVG = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

/* ── Showcase tabs data ── */
const TABS = [
  {
    id: 'app',
    Icon: UtensilsCrossed,
    label: 'تطبيق العميل',
    color: '#DC2626',
    tagline: 'تجربة عميلك من لحظة الدخول حتى الدفع',
    points: [
      'قائمة طعام تفاعلية بالصور والأسعار',
      'طلب من الطاولة بـ QR بدون نادل',
      'تتبع حالة الطلب داخل المطعم لحظياً',
      'بطاقة ولاء Apple & Google Wallet',
      'سجل طلبات سابقة وإعادة الطلب بنقرة',
      'تقييم التجربة بعد كل زيارة',
    ],
    screen: 'app',
  },
  {
    id: 'booking',
    Icon: CalendarDays,
    label: 'الحجوزات',
    color: '#F97316',
    tagline: 'حجوزات بدون مكالمات — تأكيد فوري ٢٤/٧',
    points: [
      'حجز من الموقع أو واتساب أو التطبيق',
      'تأكيد تلقائي بدون موظف استقبال',
      'إدارة طاولات بصرية لإدارة المطعم',
      'تذكير تلقائي للعميل قبل الموعد بساعة',
      'قائمة انتظار ذكية أوقات الازدحام',
      'إلغاء وإعادة جدولة بدون اتصال',
    ],
    screen: 'booking',
  },
  {
    id: 'orders',
    Icon: ShoppingBag,
    label: 'الطلبات والتوصيل',
    color: '#F59E0B',
    tagline: 'من المطبخ لباب العميل — كل شيء مرئي',
    points: [
      'طلبات توصيل مع خريطة تتبع مباشر',
      'طلبات سيارة (Drive-Thru) بدون تأخير',
      'طلبات كيرينج وجمع من المطعم',
      'إشعار واتساب تلقائي عند جاهزية الطلب',
      'تكامل مع Hungerstation وJahez',
      'لوحة المطبخ الرقمية KDS بدل الطابعة',
    ],
    screen: 'orders',
  },
  {
    id: 'events',
    Icon: PartyPopper,
    label: 'إدارة الفعاليات',
    color: '#8B5CF6',
    tagline: 'ليالي رمضان، حفلات أعياد الميلاد، جلسات VIP',
    points: [
      'صفحة فعالية مخصصة لكل مناسبة',
      'حجز مسبق للفعاليات الخاصة',
      'باقات جلسة VIP مع قوائم خاصة',
      'دعوة رقمية تُرسل للمدعوين على واتساب',
      'إدارة التوافد والتحقق من الحضور',
      'تقرير إيرادات كل فعالية بعد انتهائها',
    ],
    screen: 'events',
  },
  {
    id: 'dashboard',
    Icon: LayoutDashboard,
    label: 'لوحة التحكم',
    color: '#10B981',
    tagline: 'إدارة كاملة من شاشة واحدة في أي مكان',
    points: [
      'إيرادات اليوم والشهر مقارنة بالسابق',
      'أفضل الأطباق مبيعاً وأوقات الذروة',
      'إدارة القائمة وتحديث الأسعار فوراً',
      'إدارة الموظفين والوردات',
      'تقارير أسبوعية على البريد تلقائياً',
      'تنبيهات مخزون المواد الأولية',
    ],
    screen: 'dashboard',
  },
];

/* ── Phone screen content per tab ── */
function PhoneScreen({ screen, color }: { screen: string; color: string }) {

  /* ── shared micro-helpers ── */
  const F = 'Cairo,sans-serif';
  const pill = (label: string, c: string, active = false) => (
    <div style={{ padding: '4px 11px', borderRadius: 99, background: active ? c : 'rgba(255,255,255,0.07)', border: `1px solid ${active ? c : 'rgba(255,255,255,0.10)'}`, fontSize: 8.5, color: active ? '#fff' : 'rgba(255,255,255,0.55)', fontFamily: F, fontWeight: 700, flexShrink: 0 }}>{label}</div>
  );

  /* ── bar chart mini ── */
  const bars = [55, 78, 62, 90, 74, 88, 100];
  const BarMini = ({ c }: { c: string }) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 28 }}>
      {bars.map((h, i) => (
        <div key={i} style={{ flex: 1, borderRadius: 3, background: i === 6 ? c : `${c}40`, height: `${h}%`, transition: 'height .3s' }} />
      ))}
    </div>
  );

  const screens: Record<string, JSX.Element> = {

    /* ══════════════════════════════════════════
       SCREEN 1 — تطبيق العميل  (Deliveroo-tier)
    ══════════════════════════════════════════ */
    app: (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 0, background: 'transparent' }}>

        {/* Hero banner */}
        <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${color} 0%,#7C1010 100%)`, padding: '14px 16px 18px', marginBottom: 10, position: 'relative', overflow: 'hidden' }}>
          {/* decorative circles */}
          <div style={{ position: 'absolute', top: -18, right: -18, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -22, right: 10, width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.65)', fontFamily: F, marginBottom: 4, letterSpacing: 1 }}>رصيد نقاطك الآن</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', fontFamily: F, lineHeight: 1, marginBottom: 6 }}>٢٤٠ نقطة</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ flex: 1, height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.20)', overflow: 'hidden' }}>
              <div style={{ width: '80%', height: '100%', background: '#fff', borderRadius: 99 }} />
            </div>
            <span style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.75)', fontFamily: F, fontWeight: 700 }}>٦٠↑ للجائزة</span>
          </div>
        </div>

        {/* Category row */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 10, overflowX: 'auto' }}>
          {['🔥 الأكثر طلبا', '🥩 المشويات', '🥗 المقبلات', '🍹 مشروبات'].map((c, i) => pill(c, color, i === 0))}
        </div>

        {/* Menu items */}
        {[
          { name: 'كبسة لحم ملكية', sub: 'أرز بسمتي • لحم عجل • زعفران', price: '٥٥', tag: '🔥 الأكثر طلباً', rating: '٤.٩' },
          { name: 'مشاوي مشكلة فاخرة', sub: 'دجاج • لحم • كباب • خضار', price: '٨٩', tag: 'جديد', rating: '٤.٧' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 12px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 7 }}>
            {/* Food image placeholder */}
            <div style={{ width: 46, height: 46, borderRadius: 12, background: `linear-gradient(135deg,${color}40,${color}18)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
              {i === 0 ? '🍖' : '🥩'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 900, color: '#fff', fontFamily: F, lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ fontSize: 11, fontWeight: 900, color: color, fontFamily: F, flexShrink: 0 }}>{item.price}<span style={{ fontSize: 7 }}> ر</span></div>
              </div>
              <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.38)', fontFamily: F, marginTop: 2, marginBottom: 5 }}>{item.sub}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ padding: '2px 8px', borderRadius: 99, background: `${color}25`, fontSize: 7, fontWeight: 800, color: color, fontFamily: F }}>{item.tag}</span>
                <span style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.45)', fontFamily: F }}>⭐ {item.rating}</span>
              </div>
            </div>
          </div>
        ))}

        {/* QR table button */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: 7 }}>
          <div style={{ flex: 1, padding: '11px 0', borderRadius: 13, background: `linear-gradient(135deg,${color},#9A1515)`, textAlign: 'center', fontSize: 10, fontWeight: 900, color: '#fff', fontFamily: F, boxShadow: `0 6px 24px ${color}55` }}>
            اطلب من طاولتك 🛎️
          </div>
          <div style={{ width: 42, borderRadius: 13, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
            📷
          </div>
        </div>
      </div>
    ),

    /* ══════════════════════════════════════════
       SCREEN 2 — الحجوزات  (OpenTable-tier)
    ══════════════════════════════════════════ */
    booking: (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 9 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 900, color: '#fff', fontFamily: F }}>احجز طاولتك</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.40)', fontFamily: F }}>تأكيد فوري ٢٤/٧</div>
          </div>
          <div style={{ padding: '5px 10px', borderRadius: 99, background: `${color}22`, border: `1px solid ${color}44`, fontSize: 8, fontWeight: 800, color: color, fontFamily: F }}>٣ طاولات متاحة</div>
        </div>

        {/* Date carousel */}
        <div style={{ display: 'flex', gap: 5 }}>
          {[['ثلاثاء','٢٩'],['أربعاء','٣٠'],['خميس','٣١'],['جمعة','١'],['سبت','٢']].map(([day, num], i) => (
            <div key={i} style={{ flex: 1, padding: '8px 4px', borderRadius: 13, background: i === 2 ? `linear-gradient(135deg,${color},#9A1515)` : 'rgba(255,255,255,0.05)', border: `1px solid ${i === 2 ? 'transparent' : 'rgba(255,255,255,0.08)'}`, textAlign: 'center', boxShadow: i === 2 ? `0 4px 16px ${color}44` : 'none' }}>
              <div style={{ fontSize: 7, fontWeight: 600, color: i === 2 ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)', fontFamily: F }}>{day}</div>
              <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', fontFamily: F, lineHeight: 1.4 }}>{num}</div>
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div>
          <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.40)', fontFamily: F, marginBottom: 6, fontWeight: 700 }}>الأوقات المتاحة — ٣١ يوليو</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 5 }}>
            {[['٧:٠٠ م',false],['٧:٣٠ م',true],['٨:٠٠ م',false],['٨:٣٠ م',false],['٩:٠٠ م',false],['٩:٣٠ م',false]].map(([t, active], i) => (
              <div key={i} style={{ padding: '9px 4px', borderRadius: 11, background: active ? `linear-gradient(135deg,${color},#9A1515)` : 'rgba(255,255,255,0.04)', border: `1px solid ${active ? 'transparent' : 'rgba(255,255,255,0.08)'}`, textAlign: 'center', fontSize: 9.5, fontWeight: 800, color: active ? '#fff' : 'rgba(255,255,255,0.60)', fontFamily: F, boxShadow: active ? `0 3px 12px ${color}44` : 'none' }}>{t as string}</div>
            ))}
          </div>
        </div>

        {/* Guests + section */}
        <div style={{ display: 'flex', gap: 7 }}>
          <div style={{ flex: 1, padding: '10px 12px', borderRadius: 13, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>👥</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.38)', fontFamily: F }}>أشخاص</div>
              <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', fontFamily: F }}>٤</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ width: 18, height: 18, borderRadius: 6, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 900 }}>+</div>
              <div style={{ width: 18, height: 18, borderRadius: 6, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 900 }}>−</div>
            </div>
          </div>
          <div style={{ flex: 1, padding: '10px 12px', borderRadius: 13, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
            <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.38)', fontFamily: F, marginBottom: 4 }}>القسم</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['داخلي','خارجي'].map((s,i) => (
                <div key={i} style={{ flex: 1, padding: '5px 0', borderRadius: 8, background: i === 0 ? `${color}33` : 'transparent', border: `1px solid ${i === 0 ? color : 'rgba(255,255,255,0.08)'}`, textAlign: 'center', fontSize: 8, fontWeight: 800, color: i === 0 ? color : 'rgba(255,255,255,0.40)', fontFamily: F }}>{s}</div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto', padding: '12px', borderRadius: 14, background: `linear-gradient(135deg,${color},#9A1515)`, textAlign: 'center', fontSize: 10.5, fontWeight: 900, color: '#fff', fontFamily: F, boxShadow: `0 6px 24px ${color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span>تأكيد الحجز</span>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>✓</div>
        </div>
      </div>
    ),

    /* ══════════════════════════════════════════
       SCREEN 3 — الطلبات والتوصيل  (Uber Eats-tier)
    ══════════════════════════════════════════ */
    orders: (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 9 }}>

        {/* Live ETA card */}
        <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${color}22,${color}08)`, border: `1px solid ${color}35`, padding: '14px 16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${color},transparent)` }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.45)', fontFamily: F, marginBottom: 2 }}>وقت الوصول المتوقع</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: F, lineHeight: 1 }}>٨ دقائق</div>
              <div style={{ fontSize: 8, color: color, fontFamily: F, fontWeight: 700, marginTop: 3 }}>السائق على بعد ١.٢ كم</div>
            </div>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${color}20`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🛵</div>
          </div>
          {/* Progress stepper */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {['تم','يُحضَّر','الطريق','وصل'].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? 1 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: i <= 2 ? color : 'rgba(255,255,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 900, boxShadow: i === 2 ? `0 0 10px ${color}` : 'none' }}>
                    {i <= 2 ? '✓' : ''}
                  </div>
                  <div style={{ fontSize: 6.5, color: i <= 2 ? 'rgba(255,255,255,0.70)' : 'rgba(255,255,255,0.25)', fontFamily: F, fontWeight: 700, whiteSpace: 'nowrap' }}>{s}</div>
                </div>
                {i < 3 && <div style={{ flex: 1, height: 2, background: i < 2 ? color : 'rgba(255,255,255,0.12)', marginBottom: 12, marginRight: 2, marginLeft: 2, borderRadius: 1 }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Order list */}
        <div style={{ borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          {[
            { name: 'كبسة لحم ملكية', qty: '×١', price: '٥٥', emoji: '🍖' },
            { name: 'مياه معدنية صغيرة', qty: '×٢', price: '١٠', emoji: '💧' },
            { name: 'حلى أم علي فاخر', qty: '×١', price: '٢٨', emoji: '🍮' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{item.emoji}</div>
              <div style={{ flex: 1, fontSize: 9.5, fontWeight: 700, color: '#fff', fontFamily: F }}>{item.name}</div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', fontFamily: F }}>{item.qty}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: color, fontFamily: F }}>{item.price}</div>
            </div>
          ))}
        </div>

        {/* Total row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.65)', fontFamily: F }}>إجمالي الطلب</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: '#fff', fontFamily: F }}>٩٣ <span style={{ fontSize: 9, color: color }}>ر</span></span>
        </div>

        {/* WhatsApp live notif */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', borderRadius: 12, background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.22)' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#25D36622', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>💬</div>
          <div>
            <div style={{ fontSize: 8.5, color: '#25D366', fontFamily: F, fontWeight: 800 }}>إشعار واتساب تلقائي</div>
            <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.35)', fontFamily: F }}>ستصلك رسالة عند جاهزية الطلب</div>
          </div>
        </div>
      </div>
    ),

    /* ══════════════════════════════════════════
       SCREEN 4 — إدارة الفعاليات  (Resy-tier)
    ══════════════════════════════════════════ */
    events: (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 900, color: '#fff', fontFamily: F }}>الفعاليات القادمة</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.38)', fontFamily: F }}>مارس ٢٠٢٥</div>
          </div>
          <div style={{ padding: '5px 10px', borderRadius: 99, background: 'rgba(139,92,246,0.20)', border: '1px solid rgba(139,92,246,0.40)', fontSize: 8, fontWeight: 800, color: '#A78BFA', fontFamily: F }}>٣ فعاليات</div>
        </div>

        {/* Event cards */}
        {[
          { title: 'ليلة رمضان الكريم', date: 'جمعة ١٥ مارس • ٨ م', badge: 'VIP', bc: '#8B5CF6', emoji: '🌙', seats: '٨ مقاعد متبقية', seatPct: '75%' },
          { title: 'حفلة عيد الأم الفاخرة', date: 'أحد ٢٣ مارس • ٧ م', badge: 'عائلي', bc: '#EC4899', emoji: '💐', seats: '١٢ مقعد', seatPct: '55%' },
          { title: 'بوفيه ملكي أسبوعي', date: 'كل جمعة • ٦ م', badge: 'أسبوعي', bc: '#F59E0B', emoji: '👑', seats: 'مفتوح', seatPct: '30%' },
        ].map((ev, i) => (
          <div key={i} style={{ padding: '12px 14px', borderRadius: 15, background: `${ev.bc}12`, border: `1px solid ${ev.bc}28`, position: 'relative', overflow: 'hidden' }}>
            {/* top accent */}
            <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: 2.5, background: `linear-gradient(90deg,${ev.bc},${ev.bc}44,transparent)` }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: `${ev.bc}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{ev.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
                  <div style={{ fontSize: 10, fontWeight: 900, color: '#fff', fontFamily: F }}>{ev.title}</div>
                  <div style={{ padding: '2px 8px', borderRadius: 99, background: ev.bc, fontSize: 7, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{ev.badge}</div>
                </div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.40)', fontFamily: F, marginBottom: 6 }}>{ev.date}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ flex: 1, height: 3.5, borderRadius: 99, background: 'rgba(255,255,255,0.10)', overflow: 'hidden' }}>
                    <div style={{ width: ev.seatPct, height: '100%', background: ev.bc, borderRadius: 99 }} />
                  </div>
                  <span style={{ fontSize: 7.5, color: ev.bc, fontFamily: F, fontWeight: 800, flexShrink: 0 }}>{ev.seats}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* CTA */}
        <div style={{ marginTop: 'auto', padding: '11px', borderRadius: 14, background: 'linear-gradient(135deg,#8B5CF6,#5B21B6)', textAlign: 'center', fontSize: 10.5, fontWeight: 900, color: '#fff', fontFamily: F, boxShadow: '0 6px 24px rgba(139,92,246,0.45)' }}>
          احجز مقعدك الآن ✨
        </div>
      </div>
    ),

    /* ══════════════════════════════════════════
       SCREEN 5 — لوحة التحكم  (Stripe Dashboard-tier)
    ══════════════════════════════════════════ */
    dashboard: (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 900, color: '#fff', fontFamily: F }}>لوحة التحكم</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.40)', fontFamily: F }}>الثلاثاء ٢٩ يوليو ٢٠٢٥</div>
          </div>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${color}22`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🔔</div>
        </div>

        {/* Revenue hero card */}
        <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${color} 0%,#7C1010 100%)`, padding: '14px 16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: -25, left: 10, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.65)', fontFamily: F, marginBottom: 3 }}>إيرادات اليوم</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', fontFamily: F, lineHeight: 1, marginBottom: 6 }}>٨,٤٣٠ ر</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ padding: '3px 9px', borderRadius: 99, background: 'rgba(255,255,255,0.20)', fontSize: 8, fontWeight: 800, color: '#fff', fontFamily: F }}>↑ ٢٤٪</div>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.60)', fontFamily: F }}>مقارنة بالأمس</span>
            <div style={{ marginRight: 'auto' }}><BarMini c="#ffffff" /></div>
          </div>
        </div>

        {/* Stats 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[
            { label: 'الطلبات', val: '٦٢', icon: '📦', c: color, sub: '+٨ من أمس' },
            { label: 'الحجوزات', val: '١٨', icon: '🗓️', c: '#F97316', sub: 'مكتمل ١٢' },
            { label: 'التوصيل', val: '٣١', icon: '🛵', c: '#F59E0B', sub: 'جارٍ ٥' },
            { label: 'التقييم', val: '٤.٩', icon: '⭐', c: '#10B981', sub: '١٤٢ تقييم' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '11px 12px', borderRadius: 13, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 30, height: 30, borderRadius: '0 13px 0 30px', background: `${s.c}14` }} />
              <div style={{ fontSize: 15, marginBottom: 5 }}>{s.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: s.c, fontFamily: F, lineHeight: 1.1 }}>{s.val}</div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', fontFamily: F, marginTop: 2 }}>{s.label}</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.25)', fontFamily: F, marginTop: 1 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Top dish */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px', borderRadius: 13, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🏆</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: '#fff', fontFamily: F }}>الأكثر طلباً اليوم</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.38)', fontFamily: F }}>كبسة لحم ملكية — ٣٢ طلب</div>
          </div>
          <div style={{ padding: '4px 9px', borderRadius: 99, background: 'rgba(16,185,129,0.15)', fontSize: 9, fontWeight: 800, color: '#10B981', fontFamily: F }}>+١٢٪</div>
        </div>
      </div>
    ),
  };

  return screens[screen] ?? screens['app'];
}

/* ── Full showcase component ── */
function ShowcaseSection({ isMobile }: { isMobile: boolean }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % TABS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const tab = TABS[active];

  return (
    <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: '#08040100' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#DC2626', boxShadow: '0 0 8px rgba(220,38,38,0.7)' }} />
            <span style={{ fontWeight: 700, fontSize: 11, color: '#F97316', letterSpacing: 2.5, textTransform: 'uppercase' }}>ماذا تحصل</span>
          </div>
          <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.4rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 14 }}>
            نظام متكامل — كل شيء في مكان واحد
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.50)', maxWidth: 480, margin: '0 auto', lineHeight: 1.8, fontFamily: 'Cairo, sans-serif' }}>
            من تطبيق العميل إلى لوحة تحكمك — استكشف ما يحصل عليه مطعمك.
          </p>
        </motion.div>

        {/* Tab pills */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 52 }}>
          {TABS.map((t, i) => {
            const isA = i === active;
            return (
              <button key={t.id} onClick={() => setActive(i)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 99, border: `1px solid ${isA ? t.color : 'rgba(255,255,255,0.09)'}`, background: isA ? `${t.color}22` : 'rgba(255,255,255,0.03)', color: isA ? '#fff' : 'rgba(255,255,255,0.50)', fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 13, cursor: 'pointer', transition: 'all 0.25s' }}>
                <t.Icon size={14} strokeWidth={2} color={isA ? t.color : 'rgba(255,255,255,0.35)'} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Main content */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 440px', gap: isMobile ? 40 : 64, alignItems: 'center' }}>

          {/* LEFT — description */}
          <AnimatePresence mode="wait">
            <motion.div key={tab.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}>

              {/* Icon + tagline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                <div style={{ width: 56, height: 56, borderRadius: 18, background: `${tab.color}20`, border: `1px solid ${tab.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 28px ${tab.color}30` }}>
                  <tab.Icon size={26} strokeWidth={1.6} color={tab.color} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 10, color: tab.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>{tab.label}</div>
                  <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 18, color: '#fff', lineHeight: 1.3 }}>{tab.tagline}</div>
                </div>
              </div>

              {/* Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {tab.points.map((p, i) => (
                  <motion.div key={p}
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 9, background: `${tab.color}18`, border: `1px solid ${tab.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <CheckCircle2 size={13} strokeWidth={2.5} color={tab.color} />
                    </div>
                    <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600, fontSize: 15, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6 }}>{p}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ marginTop: 36 }}>
                <a href={`https://wa.me/966551378531?text=أبي أعرف أكثر عن ${tab.label} في نظام المطاعم`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 26px', borderRadius: 12, background: `${tab.color}20`, border: `1px solid ${tab.color}40`, color: tab.color, fontFamily: 'Cairo, sans-serif', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
                  اسأل عن {tab.label} <MoveRight size={14} strokeWidth={2.5} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT — phone mockup */}
          <motion.div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            {/* Ambient glow */}
            <div style={{ position: 'absolute', inset: -80, background: `radial-gradient(circle,${tab.color}22 0%,transparent 65%)`, pointerEvents: 'none', transition: 'background 0.5s' }} />

            {/* Phone shell */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 260, height: 520, borderRadius: 44, background: 'linear-gradient(160deg,#1a0a05 0%,#0a0400 100%)', border: `1.5px solid ${tab.color}30`, boxShadow: [`0 60px 120px rgba(0,0,0,0.75)`, `0 0 80px ${tab.color}18`, `inset 0 1px 0 rgba(255,255,255,0.05)`].join(', '), position: 'relative', overflow: 'hidden', padding: '16px 14px', transition: 'border-color 0.4s, box-shadow 0.4s' }}>

              {/* Screen top glow */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 160, background: `linear-gradient(180deg,${tab.color}12 0%,transparent 100%)`, pointerEvents: 'none', transition: 'background 0.4s' }} />

              {/* Notch */}
              <div style={{ width: 80, height: 24, borderRadius: 12, background: '#000', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#1c1c1c', border: '1px solid #333' }} />
                <div style={{ width: 34, height: 5, borderRadius: 3, background: '#111' }} />
              </div>

              {/* Status bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, padding: '0 2px' }}>
                <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>9:41</span>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[1,2,3].map(i => <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }} />)}
                </div>
              </div>

              {/* Screen content */}
              <div style={{ height: 378, overflowY: 'auto' }}>
                <AnimatePresence mode="wait">
                  <motion.div key={tab.screen}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    style={{ height: '100%' }}>
                    <PhoneScreen screen={tab.screen} color={tab.color} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Home bar */}
              <div style={{ width: 80, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.14)', margin: '12px auto 0' }} />
            </motion.div>

            {/* Progress dots */}
            <div style={{ position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
              {TABS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  style={{ width: i === active ? 20 : 6, height: 6, borderRadius: 3, background: i === active ? tab.color : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { n: '+٢٠٠', label: 'مطعم يستخدم نظامنا' },
  { n: '٤٨٪', label: 'تحسّن في الحجوزات' },
  { n: '٣ دق', label: 'متوسط وقت الرد' },
  { n: '١٠٠٪', label: 'تتبع الطلبات' },
];

const FEATURES = [
  {
    Icon: CalendarDays, color: '#DC2626',
    title: 'حجوزات ذكية لحظية',
    sub: 'Smart Booking',
    desc: 'عميلك يحجز من الموقع أو واتساب — تأكيد فوري بدون تدخل بشري. تنبيهات تلقائية قبل الموعد بساعة.',
    size: 'large',
  },
  {
    Icon: Truck, color: '#F97316',
    title: 'تتبع التوصيل مباشر',
    sub: 'Live Tracking',
    desc: 'خريطة لحظية للسائق — العميل يشوف أين طلبيته بدون اتصال.',
    size: 'large',
  },
  {
    Icon: CreditCard, color: '#F59E0B',
    title: 'Apple & Google Wallet',
    sub: 'Loyalty Pass',
    desc: 'نقاط على كل وجبة — عروض خاصة لأعياد الميلاد والمناسبات تلقائياً.',
    size: 'medium',
  },
  {
    Icon: Bot, color: '#10B981',
    title: 'AI يبني قائمتك',
    sub: 'Smart Menu AI',
    desc: 'يحلل الأكثر طلباً ويقترح التسعير المثالي لكل موسم.',
    size: 'medium',
  },
  {
    Icon: ChartBar, color: '#8B5CF6',
    title: 'تقارير لحظية',
    sub: 'Real-time Analytics',
    desc: 'أفضل طبق، أسوأ وقت، أعلى قيمة طلب — كل شيء أمامك.',
    size: 'medium',
  },
  {
    Icon: Bell, color: '#06B6D4',
    title: 'تنبيه جاهزية الطلب',
    sub: 'Order Ready Alert',
    desc: 'رسالة واتساب تلقائية لما الطلب جاهز — بدون اتصال.',
    size: 'medium',
  },
];

const PROBLEMS = [
  { icon: '📞', title: 'الحجوزات على الهاتف كارثة', desc: 'موظف يرد، يُدوّن، ينسى — والعميل يجي يلقى ما فيه مكان.' },
  { icon: '🛵', title: 'التوصيل بدون تتبع', desc: 'العميل يسأل أين طلبيتي كل ٥ دقائق وأنت ما عندك جواب.' },
  { icon: '⭐', title: 'التقييمات تضر بدل ما تفيد', desc: 'تقييم سيئ واحد يمسح جهد شهر — وأنت ما تعرف من أين جاء.' },
  { icon: '📉', title: 'الأيام الهادئة مو مدروسة', desc: 'الثلاثاء خاوي والجمعة مزدحم — وما عندك خطة لموازنة الطلب.' },
];

const STEPS = [
  { step: 'يوم ١', title: 'جلسة تحليل المطعم', desc: 'نفهم قائمتك، ساعات العمل، وعدد الفروع.' },
  { step: 'الأسبوع الأول', title: 'نبني كل شيء من الصفر', desc: 'نظام حجز، بطاقة Wallet، تتبع توصيل، لوحة تحكم.' },
  { step: 'الإطلاق', title: 'معك يوم الإطلاق وبعده', desc: 'ندرّب الكاشير والمدير، ونتابع الأداء ٣ أشهر.' },
];

const PACKAGES = [
  {
    name: 'أساسي', price: '٢٤٩٩', period: 'ريال / شهر',
    features: ['نظام حجوزات ذكي', 'قائمة رقمية تفاعلية', 'Apple & Google Wallet', 'واتساب تلقائي', 'لوحة تحكم'],
    highlight: false,
  },
  {
    name: 'محترف', price: '٤٩٩٩', period: 'ريال / شهر',
    features: ['كل الأساسي', 'تتبع التوصيل', 'AI تسويق تلقائي', 'تعدد الفروع', 'تقارير مفصلة', 'إشعارات متقدمة'],
    highlight: true,
  },
  {
    name: 'سلسلة', price: '٩٩٩٩', period: 'ريال / شهر',
    features: ['كل المحترف', 'API كامل', 'تطبيق موبايل مخصص', 'مدير حساب مخصص', 'SLA ٢٤/٧', 'تكامل ERP'],
    highlight: false,
  },
];

/* ── Feature card ── */
function FeatureCard({ f, i }: { f: typeof FEATURES[0]; i: number }) {
  const [hov, setHov] = useState(false);
  const { Icon, color, title, sub, desc, size } = f;
  const isLarge = size === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22,1,0.36,1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', height: '100%', cursor: 'default' }}
    >
      {/* Animated border */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 22, padding: 1,
        background: hov
          ? `linear-gradient(135deg,${color},${color}55,transparent,${color}88)`
          : `linear-gradient(135deg,${color}22,transparent,${color}11)`,
        transition: 'background 0.4s', zIndex: 0,
      }}>
        <div style={{ borderRadius: 21, height: '100%', background: 'linear-gradient(145deg,#120801,#0d0501)' }} />
      </div>

      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: -50, right: -30, width: 180, height: 180, borderRadius: '50%',
        background: `radial-gradient(circle,${color}${hov?'22':'0e'} 0%,transparent 70%)`,
        transition: 'background 0.4s', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: isLarge ? '32px 28px' : '24px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <motion.div
            animate={{ boxShadow: hov ? `0 0 22px ${color}50` : `0 0 0 ${color}00` }}
            transition={{ duration: 0.3 }}
            style={{ width: isLarge ? 52 : 44, height: isLarge ? 52 : 44, borderRadius: isLarge ? 15 : 13, background: `${color}18`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={isLarge ? 24 : 20} strokeWidth={1.6} color={color} />
          </motion.div>
          <span style={{ padding: '4px 10px', borderRadius: 99, background: `${color}14`, border: `1px solid ${color}28`, fontSize: 9, fontWeight: 800, color, letterSpacing: '0.06em' }}>{sub}</span>
        </div>

        <h3 style={{ fontSize: isLarge ? 20 : 16, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.025em', lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontSize: isLarge ? 13.5 : 12.5, color: 'rgba(255,255,255,0.46)', lineHeight: 1.75, margin: 0, flex: 1, fontFamily: 'Cairo, sans-serif' }}>{desc}</p>
      </div>

      {/* Bottom line */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${color},transparent)`, opacity: hov ? 0.7 : 0.2, transition: 'opacity 0.3s' }} />
    </motion.div>
  );
}

/* ─────────────────────────────────────
   LIVE DEMO SECTION — try with your name
───────────────────────────────────── */
function RestaurantDemoSection({ isMobile }: { isMobile: boolean }) {
  const [bizName, setBizName] = useState('');
  const demoBase = '/brown-dose/';
  const demoUrl = bizName.trim()
    ? `${demoBase}?mode=app&biz=${encodeURIComponent(bizName.trim())}`
    : `${demoBase}?mode=app`;

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,80px)', background: R.bg2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>

      {/* Glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 600, borderRadius: '50%', background: `radial-gradient(ellipse,${R.glow} 0%,transparent 60%)`, opacity: 0.35 }} />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'center' }}>

          {/* LEFT — text + input */}
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 99, background: `${R.red}18`, border: `1px solid ${R.border}`, marginBottom: 28 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: R.red, boxShadow: `0 0 8px ${R.red}`, animation: 'pulse 2s infinite' }} />
              <span style={{ fontWeight: 800, fontSize: 11, color: R.orange, letterSpacing: 1.5 }}>ديمو حي — جاهز الآن</span>
            </div>

            <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 16 }}>
              شوف مطعمك<br />
              <span style={{ background: R.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                قبل ما تدفع ريال
              </span>
            </h2>

            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 16, color: R.dim, lineHeight: 1.8, marginBottom: 36 }}>
              اكتب اسم مطعمك وجرّب النظام بنفسك — تطبيق ولاء حقيقي، قائمة طعام، حجوزات، كل شيء.
            </p>

            {/* Input + button */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                <input
                  value={bizName}
                  onChange={e => setBizName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && bizName.trim()) window.open(demoUrl, '_blank'); }}
                  placeholder="اسم مطعمك… مثال: بيت الأصيل"
                  style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: `1px solid ${bizName ? R.border : 'rgba(255,255,255,0.12)'}`, color: '#fff', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 600, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s', direction: 'rtl' }}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderColor = R.orange; }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderColor = bizName ? R.border : 'rgba(255,255,255,0.12)'; }}
                />
              </div>
              <a href={demoUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 28px', borderRadius: 14, background: R.grad, color: '#fff', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 900, textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: `0 8px 32px ${R.glow}`, flexShrink: 0 }}>
                جرّب الآن ←
              </a>
            </div>

            {/* Trust note */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {['بدون تسجيل', 'بدون بطاقة بنكية', 'مجاني تماماً'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={13} strokeWidth={2.5} color={R.orange} />
                  <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 700, color: R.dimmer }}>{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — live haeez phone */}
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: isMobile ? 'none' : 'flex', justifyContent: 'center', position: 'relative' }}>

            {/* Ambient glow */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, background: 'radial-gradient(circle,rgba(196,120,58,0.22) 0%,transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', width: 280, height: 570 }}>

              {/* Phone shell */}
              <div style={{ width: '100%', height: '100%', borderRadius: 48, background: 'linear-gradient(160deg,#2a2a2a,#111)', boxShadow: '0 60px 120px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 0 1px rgba(255,255,255,0.06)', padding: 7, boxSizing: 'border-box' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: 42, overflow: 'hidden', background: '#150900', position: 'relative' }}>
                  {/* Dynamic Island */}
                  <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 88, height: 26, background: '#000', borderRadius: 18, zIndex: 20 }} />
                  <iframe
                    src={`/haeez-loyalty/?mode=app${bizName.trim() ? `&biz=${encodeURIComponent(bizName.trim())}` : ''}`}
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                    title="haeez loyalty demo"
                  />
                  {/* Home bar */}
                  <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 88, height: 3.5, borderRadius: 99, background: 'rgba(255,255,255,0.28)', zIndex: 25, pointerEvents: 'none' }} />
                </div>
              </div>

              {/* Side buttons */}
              <div style={{ position: 'absolute', top: 120, left: -3, width: 3, height: 30, borderRadius: '2px 0 0 2px', background: 'rgba(255,255,255,0.12)' }} />
              <div style={{ position: 'absolute', top: 160, left: -3, width: 3, height: 30, borderRadius: '2px 0 0 2px', background: 'rgba(255,255,255,0.12)' }} />
              <div style={{ position: 'absolute', top: 140, right: -3, width: 3, height: 56, borderRadius: '0 2px 2px 0', background: 'rgba(255,255,255,0.12)' }} />
            </motion.div>

            {/* Label below phone */}
            <div style={{ position: 'absolute', bottom: -36, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', padding: '5px 16px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', fontSize: 11, fontWeight: 700, color: R.dim }}>
              تطبيق حقيقي — جاهز الآن ✦
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 8px ${R.red}; }
          50% { box-shadow: 0 0 16px ${R.red}, 0 0 24px ${R.orange}; }
        }
      `}</style>
    </section>
  );
}

export default function RestaurantsPage() {
  const m = useIsMobile();

  return (
    <PageLayout accent={R.red}>

      {/* ══════════════════════════════════
          HERO — cinematic full-screen
      ══════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

        {/* Background photo */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center 35%', transform: 'scale(1.04)' }} />

        {/* Layered overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,rgba(5,2,0,0.97) 0%,rgba(5,2,0,0.85) 45%,rgba(5,2,0,0.40) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(5,2,0,0.5) 0%,transparent 40%,rgba(5,2,0,0.8) 100%)' }} />

        {/* Ambient top glow */}
        <div style={{ position: 'absolute', top: '-5%', left: '5%', width: 600, height: 600, background: 'radial-gradient(ellipse,rgba(220,38,38,0.10) 0%,transparent 65%)', pointerEvents: 'none' }} />

        {/* Fixed ambient blobs */}
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 700, height: 700, borderRadius: '50%', background: '#DC2626', filter: 'blur(220px)', opacity: 0.05 }} />
        </div>

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: m ? '120px 20px 80px' : 'clamp(120px,12vw,160px) clamp(24px,5vw,80px) 80px', width: '100%' }}>
          <div style={{ maxWidth: m ? '100%' : 620 }}>

            {/* Eyebrow */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
              <span style={{ fontSize: 20 }}>🍽️</span>
              <span style={{ fontWeight: 700, fontSize: 11, color: R.orange, letterSpacing: 2.5, textTransform: 'uppercase' }}>نظام المطعم الذكي</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
              style={{ fontWeight: 900, fontSize: 'clamp(3.2rem,6vw,5.4rem)', letterSpacing: '-0.045em', lineHeight: 1.0, marginBottom: 28, fontFamily: 'Cairo, sans-serif' }}>
              <span style={{ display: 'block', color: '#fff' }}>مطعمك يستاهل</span>
              <span style={{ display: 'block', background: R.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                نظام يليق بطعمه
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              style={{ fontSize: 17, color: R.dim, lineHeight: 1.85, marginBottom: 40, maxWidth: 480, fontFamily: 'Cairo, sans-serif', fontWeight: 500 }}>
              حجوزات لحظية، طلبات توصيل، Apple & Google Wallet، وذكاء اصطناعي يرسل الزبون للمطعم حتى وهو في البيت.
            </motion.p>

            {/* Feature chips */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.20 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
              {['• حجوزات ذكية لحظية', '• تتبع التوصيل مباشر', '• AI يبني قائمتك', '• Apple & Google Wallet'].map((t, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', padding: '7px 14px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.70)', fontFamily: 'Cairo, sans-serif' }}>
                  {t}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 32px', borderRadius: 14, background: R.grad, color: '#fff', fontFamily: 'Cairo, sans-serif', fontSize: 16, fontWeight: 900, textDecoration: 'none', boxShadow: `0 12px 40px ${R.glow}` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow=`0 20px 50px ${R.glow}`; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow=`0 12px 40px ${R.glow}`; (e.currentTarget as HTMLElement).style.transform='none'; }}>
                طوّر مطعمك اليوم
                <ArrowUpLeft size={16} strokeWidth={2.5} />
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '16px 24px', borderRadius: 14, background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366', fontFamily: 'Cairo, sans-serif', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
                {WA_SVG} واتساب
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              style={{ display: 'flex', gap: 0, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {['تسليم أسبوعين', 'دعم ٣ أشهر', 'بدون عقود'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, paddingRight: 24, marginRight: 24, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                  <CheckCircle2 size={12} strokeWidth={2.5} color={R.orange} />
                  <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 12, color: R.dimmer }}>{t}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating stat pills — desktop */}
        {!m && (
          <>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
              style={{ position: 'absolute', top: '28%', right: '8%', background: 'rgba(10,5,0,0.80)', backdropFilter: 'blur(20px)', border: `1px solid ${R.border}`, borderRadius: 16, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(220,38,38,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart3 size={16} strokeWidth={2} color={R.red} />
              </div>
              <div>
                <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 17, color: '#fff', lineHeight: 1 }}>+٢٠٠</div>
                <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 9.5, color: R.dim, marginTop: 3 }}>مطعم يستخدم نظامنا</div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}
              style={{ position: 'absolute', bottom: '28%', right: '8%', background: 'rgba(10,5,0,0.80)', backdropFilter: 'blur(20px)', border: '1px solid rgba(16,185,129,0.22)', borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={14} strokeWidth={2} color="#10B981" />
              </div>
              <div>
                <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 11, color: '#fff', lineHeight: 1.3 }}>حجز جديد تلقائي</div>
                <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 9, color: '#10B981', marginTop: 2 }}>٣ دقائق · تأكيد فوري</div>
              </div>
            </motion.div>
          </>
        )}
      </section>

      {/* ══════════════════════════════════
          STATS BAR
      ══════════════════════════════════ */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: R.bg2 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: `0 clamp(24px,5vw,80px)` }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)' }}>
            {STATS.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{
                  padding: m ? '32px 20px' : '52px 32px',
                  borderRight: m ? (i % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none') : (i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none'),
                  borderBottom: m && i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  position: 'relative',
                }}>
                <div style={{ position: 'absolute', top: 0, left: 32, width: 28, height: 2, background: R.grad, borderRadius: 1 }} />
                <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 'clamp(2.8rem,3.5vw,4rem)', letterSpacing: -2, lineHeight: 1, marginBottom: 10, background: R.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.n}</div>
                <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600, fontSize: 13, color: R.dim }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SHOWCASE — what you get
      ══════════════════════════════════ */}
      <ShowcaseSection isMobile={m} />

      {/* ══════════════════════════════════
          FEATURES — bento grid
      ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: R.bg }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: R.red, boxShadow: `0 0 8px ${R.glow}` }} />
                <span style={{ fontWeight: 700, fontSize: 11, color: R.orange, letterSpacing: 2.5, textTransform: 'uppercase' }}>FEATURES</span>
              </div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,3rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                منظومة رقمية متكاملة<br />لمطعمك
              </h2>
            </div>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 15, color: R.dim, maxWidth: 340, lineHeight: 1.8, fontWeight: 500 }}>
              مش مجرد تطبيق — نظام يشتغل وأنت نايم ويرجّع العميل تلقائياً.
            </p>
          </div>

          {/* Row 1: 2 large */}
          <div className="rest-feat-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            {FEATURES.filter(f => f.size === 'large').map((f, i) => (
              <div key={f.title} style={{ height: 260 }}><FeatureCard f={f} i={i} /></div>
            ))}
          </div>

          {/* Row 2: 4 medium */}
          <div className="rest-feat-med" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
            {FEATURES.filter(f => f.size === 'medium').map((f, i) => (
              <div key={f.title} style={{ height: 220 }}><FeatureCard f={f} i={i + 2} /></div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════
          PROBLEMS — numbered editorial
      ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: R.bg2, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 2fr', gap: m ? 32 : 80, alignItems: 'start' }}>

            <div style={{ position: m ? 'static' : 'sticky', top: 120 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: R.red, boxShadow: `0 0 8px ${R.glow}` }} />
                <span style={{ fontWeight: 700, fontSize: 11, color: R.orange, letterSpacing: 2.5, textTransform: 'uppercase' }}>CHALLENGES</span>
              </div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,3vw,2.8rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 16 }}>
                نفهم المطاعم<br />قبل ما تشرح
              </h2>
              <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: R.dim, lineHeight: 1.8, fontWeight: 500 }}>
                المشاكل اللي تواجهها كل يوم — نحلّها من جذورها.
              </p>
            </div>

            <div>
              {PROBLEMS.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ display: 'flex', gap: 32, alignItems: 'flex-start', padding: '36px 0', borderBottom: i < PROBLEMS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <div style={{ fontWeight: 900, fontSize: 'clamp(2rem,2.5vw,2.8rem)', color: `rgba(220,38,38,0.20)`, letterSpacing: -1, lineHeight: 1, flexShrink: 0, width: 64, fontFamily: 'sans-serif' }}>
                    0{i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 18, color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>{p.title}</div>
                    <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: R.dim, lineHeight: 1.8, fontWeight: 500 }}>{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: R.bg }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: R.red, boxShadow: `0 0 8px ${R.glow}` }} />
              <span style={{ fontWeight: 700, fontSize: 11, color: R.orange, letterSpacing: 2.5, textTransform: 'uppercase' }}>PROCESS</span>
            </div>
            <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,3rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              من اليوم الأول حتى الإطلاق
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: m ? 40 : 0, position: 'relative' }}>
            {!m && (
              <div style={{ position: 'absolute', top: 38, left: '16.67%', right: '16.67%', height: 1, background: `linear-gradient(90deg,transparent,${R.red}55,${R.orange}55,transparent)`, pointerEvents: 'none' }} />
            )}
            {STEPS.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
                style={{ padding: '0 40px', textAlign: 'center', position: 'relative' }}>
                <div style={{ width: 76, height: 76, borderRadius: '50%', margin: '0 auto 32px', background: R.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: 28, fontWeight: 900, color: '#fff', boxShadow: `0 12px 36px ${R.glow}`, position: 'relative', zIndex: 1 }}>
                  {i + 1}
                </div>
                <div style={{ fontWeight: 700, fontSize: 10, color: R.orange, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 12 }}>{s.step}</div>
                <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 18, color: '#fff', marginBottom: 14, lineHeight: 1.3 }}>{s.title}</div>
                <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13.5, color: R.dim, lineHeight: 1.8, fontWeight: 500 }}>{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          WALLET SECTION
      ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: R.bg2, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 40 : 80, alignItems: 'center' }}>

          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: R.red, boxShadow: `0 0 8px ${R.glow}` }} />
              <span style={{ fontWeight: 700, fontSize: 11, color: R.orange, letterSpacing: 2.5, textTransform: 'uppercase' }}>WALLET</span>
            </div>
            <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 20 }}>
              بطاقة ولاء مطعمك<br />مباشرة في iPhone العميل
            </h2>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 15, color: R.dim, lineHeight: 1.85, marginBottom: 32, fontWeight: 500 }}>
              عميلك يستلم بطاقته عند أول طلب — نقاط، عروض، وتذكير بأطباقه المفضلة كل أسبوع.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {['نقاط على كل وجبة', 'عرض عيد الميلاد تلقائي', 'كوبون خاص عند ٥٠ نقطة', 'تنبيه عروض رمضان وطازة', 'QR للاسترداد عند الكاشير'].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CheckCircle2 size={15} strokeWidth={2.5} color={R.orange} style={{ flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600, fontSize: 14, color: R.dim }}>{f}</span>
                </div>
              ))}
            </div>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 28px', borderRadius: 12, background: 'rgba(220,38,38,0.12)', border: `1px solid ${R.border}`, color: R.orange, fontFamily: 'Cairo, sans-serif', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
              اطلب بطاقتك الآن <MoveRight size={15} strokeWidth={2.5} />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative', width: 320 }}>
              <div style={{ position: 'absolute', inset: -50, background: `radial-gradient(circle,${R.glow} 0%,transparent 65%)`, pointerEvents: 'none' }} />
              <motion.div
                animate={{ y: [0, -12, 0], rotateZ: [0, 0.8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 320, height: 192, borderRadius: 24, background: `linear-gradient(135deg,${R.red}f0,${R.orange}e0)`, padding: '24px 28px', position: 'relative', overflow: 'hidden', boxShadow: `0 40px 80px ${R.glow}, inset 0 1px 0 rgba(255,255,255,0.20)` }}>
                <div style={{ position: 'absolute', top: -60, left: -60, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(180deg,rgba(255,255,255,0.08) 0%,transparent 100%)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, position: 'relative' }}>
                  <div style={{ fontSize: 32 }}>🍽️</div>
                  <div style={{ fontWeight: 800, fontSize: 9, color: 'rgba(255,255,255,0.70)', letterSpacing: 2, background: 'rgba(0,0,0,0.20)', padding: '4px 10px', borderRadius: 5 }}>DINING CARD</div>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ fontWeight: 600, fontSize: 10, color: 'rgba(255,255,255,0.60)', letterSpacing: 1, marginBottom: 5 }}>LOYALTY PROGRAM</div>
                  <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 18, color: '#fff', letterSpacing: -0.5 }}>تلقا تك · مطاعم</div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                style={{ marginTop: 14, padding: '14px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(220,38,38,0.12)', border: `1px solid ${R.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Smartphone size={16} strokeWidth={1.75} color={R.orange} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 12, color: '#fff' }}>تضاف لـ iPhone مباشرة</div>
                  <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 10, color: R.dimmer, marginTop: 2 }}>بدون App Store · مع NFC</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 10, color: R.orange, background: 'rgba(220,38,38,0.12)', border: `1px solid ${R.border}`, padding: '3px 10px', borderRadius: 8 }}>NFC</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          TESTIMONIAL
      ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: R.bg }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={18} strokeWidth={0} fill={R.amber} color={R.amber} />)}
            </div>
            <blockquote style={{ margin: 0 }}>
              <p style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: '#fff', lineHeight: 1.6, marginBottom: 32, letterSpacing: '-0.02em' }}>
                "كانت الحجوزات فوضى كاملة — بعد شهر واحد من نظام تلقا، الحجوزات ارتفعت ٦٠٪ والشكاوى صارت صفر."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0, background: R.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 16, color: '#fff' }}>م</div>
                <div>
                  <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 15, color: '#fff' }}>محمد الدوسري</div>
                  <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 12, color: R.dim, marginTop: 2 }}>مدير سلسلة مطاعم | جدة</div>
                </div>
              </div>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PRICING
      ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: R.bg2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: R.red, boxShadow: `0 0 8px ${R.glow}` }} />
              <span style={{ fontWeight: 700, fontSize: 11, color: R.orange, letterSpacing: 2.5, textTransform: 'uppercase' }}>PRICING</span>
            </div>
            <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,3rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              اختر باقتك — ابدأ اليوم
            </h2>
          </div>

          <div className="rest-packages" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {PACKAGES.map((pkg, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.10 }}
                style={{
                  position: 'relative', borderRadius: 24, padding: 'clamp(28px,4vw,40px)',
                  background: pkg.highlight ? R.gradSoft : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${pkg.highlight ? R.border : 'rgba(255,255,255,0.07)'}`,
                  overflow: 'hidden',
                }}>
                {pkg.highlight && (
                  <>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: R.grad }} />
                    <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', background: R.grad, color: '#fff', fontSize: 9, fontWeight: 900, padding: '4px 12px', borderRadius: 99, letterSpacing: '0.08em' }}>الأكثر طلباً</div>
                  </>
                )}

                <div style={{ marginBottom: 8, marginTop: pkg.highlight ? 20 : 0, fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 12, color: R.dim }}>{pkg.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 28 }}>
                  <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 'clamp(2.4rem,4vw,3.2rem)', lineHeight: 1, background: pkg.highlight ? R.grad : 'none', WebkitBackgroundClip: pkg.highlight ? 'text' : 'unset', WebkitTextFillColor: pkg.highlight ? 'transparent' : '#fff', backgroundClip: pkg.highlight ? 'text' : 'unset', color: pkg.highlight ? 'transparent' : '#fff' }}>{pkg.price}</span>
                  <span style={{ fontSize: 12, color: R.dim, fontFamily: 'Cairo, sans-serif' }}>{pkg.period}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                  {pkg.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={14} strokeWidth={2.5} color={pkg.highlight ? R.orange : 'rgba(255,255,255,0.35)'} style={{ flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: pkg.highlight ? 'rgba(255,255,255,0.80)' : R.dim }}>{f}</span>
                    </div>
                  ))}
                </div>

                <a href={WA} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', borderRadius: 13, background: pkg.highlight ? R.grad : 'rgba(255,255,255,0.06)', border: pkg.highlight ? 'none' : '1px solid rgba(255,255,255,0.10)', color: '#fff', fontFamily: 'Cairo, sans-serif', fontSize: 14, fontWeight: 900, textDecoration: 'none', boxShadow: pkg.highlight ? `0 8px 32px ${R.glow}` : 'none' }}>
                  {WA_SVG} ابدأ على واتساب
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          LIVE DEMO — try it now
      ══════════════════════════════════ */}
      <RestaurantDemoSection isMobile={m} />

      {/* ══════════════════════════════════
          FINAL CTA
      ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(100px,12vw,160px) clamp(24px,5vw,80px)', background: R.bg, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse,rgba(220,38,38,0.08) 0%,transparent 65%)` }} />
        </div>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr auto', gap: m ? 32 : 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 11, color: R.orange, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 20 }}>ابدأ اليوم</div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 900, fontSize: 'clamp(2.4rem,4.5vw,4rem)', color: '#fff', letterSpacing: '-0.045em', lineHeight: 1.05 }}>
                مستعد تطوّر<br />
                <span style={{ background: R.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>مطعمك؟</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              <motion.a href={WA} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '18px 40px', borderRadius: 16, background: R.grad, color: '#fff', fontFamily: 'Cairo, sans-serif', fontSize: 16, fontWeight: 900, textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: `0 16px 48px ${R.glow}` }}>
                ابدأ على واتساب <ArrowUpLeft size={18} strokeWidth={2.5} />
              </motion.a>
              <a href="/talqa-tech/"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 32px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: R.dim, fontFamily: 'Cairo, sans-serif', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                الرئيسية
              </a>
            </div>
          </div>

          <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, color: R.dimmer, fontWeight: 500 }}>تلقا تك · نحوّل الأفكار التجارية إلى حلول رقمية</div>
            <div style={{ display: 'flex', gap: 24 }}>
              {['تحليل مجاني', 'تسليم أسبوعين', 'دعم ٣ أشهر', 'بدون عقود'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={11} strokeWidth={2.5} color={R.orange} />
                  <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600, fontSize: 12, color: R.dimmer }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .rest-feat-hero { grid-template-columns: 1fr !important; }
          .rest-feat-med  { grid-template-columns: repeat(2,1fr) !important; }
          .rest-packages  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .rest-feat-med  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageLayout>
  );
}
