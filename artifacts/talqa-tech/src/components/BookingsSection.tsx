import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music2, Globe2, Award, Users, TrendingUp, Ticket,
  Wifi, Clock, Check, Star, ArrowUpRight, Zap,
  ScanLine, BarChart3, Bell, ShieldCheck, CalendarDays,
  Sparkles, DoorOpen,
  type LucideIcon,
} from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أبي%20نظام%20حجوزات%20لفعاليتي';
const WA_ICON = (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="white" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L.054 23.077a.75.75 0 00.917.944l5.453-1.426A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 01-4.978-1.371l-.357-.212-3.698.967.984-3.593-.232-.369A9.718 9.718 0 012.25 12C2.25 6.61 6.61 2.25 12 2.25S21.75 6.61 21.75 12 17.39 21.75 12 21.75z"/>
  </svg>
);

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
interface EventDef {
  id: string; label: string; sub: string; Icon: LucideIcon;
  capacity: number; sold: number; vip: number;
  revenueToday: number; revenueLabel: string;
  venue: string; venueEn: string; city: string;
  date: string; time: string;
  color: string; glow: string;
  gradient: string; bgGrad: string; headerGrad: string;
  features: string[]; seatMap: 'arena' | 'theatre' | 'banquet' | 'festival' | 'entry';
  ticketTier: string; ticketPrice: string;
  names: string[]; seats: string[];
}

const EVENTS: EventDef[] = [
  {
    id: 'concert', label: 'حفلات موسيقية', sub: 'Arena Concerts',
    Icon: Music2,
    capacity: 25000, sold: 23760, vip: 284,
    revenueToday: 1270000, revenueLabel: '١.٢٧م',
    venue: 'ملعب كبير', venueEn: 'Riyadh Arena', city: 'الرياض',
    date: 'الجمعة ٢٩ أغسطس', time: '٨:٣٠ م',
    color: '#F59E0B', glow: 'rgba(245,158,11,0.3)',
    gradient: 'linear-gradient(145deg,#120800,#2d1500)',
    bgGrad: 'radial-gradient(ellipse 90% 70% at 50% -5%,rgba(245,158,11,0.13) 0%,transparent 65%)',
    headerGrad: 'linear-gradient(135deg,#7c3c00,#c46c00)',
    features: ['خريطة مقاعد تفاعلية','تذاكر Apple & Google Wallet','بوابات NFC فورية','VIP Lounge مستقل'],
    seatMap: 'arena', ticketTier: 'GOLDEN VIP', ticketPrice: '٩٥٠ ريال',
    names: ['عبدالله القحطاني','سارة الدوسري','محمد العتيبي','نورة السبيعي','فيصل الشمري','منى المالكي'],
    seats: ['A12','B7','VIP-4','C19','D3','VIP-11'],
  },
  {
    id: 'conference', label: 'مؤتمرات دولية', sub: 'Global Summits',
    Icon: Globe2,
    capacity: 8000, sold: 7381, vip: 980,
    revenueToday: 3480000, revenueLabel: '٣.٤٨م',
    venue: 'مركز المؤتمرات الدولي', venueEn: 'ICC Riyadh', city: 'الرياض',
    date: 'الإثنين ١٥ سبتمبر', time: '٩:٠٠ ص',
    color: '#60A5FA', glow: 'rgba(96,165,250,0.3)',
    gradient: 'linear-gradient(145deg,#010d22,#061838)',
    bgGrad: 'radial-gradient(ellipse 90% 70% at 50% -5%,rgba(59,130,246,0.15) 0%,transparent 65%)',
    headerGrad: 'linear-gradient(135deg,#0c2a5e,#1a4aa0)',
    features: ['تسجيل المندوبين رقمياً','بادجات NFC ذكية','جدول الجلسات المتزامنة','بث مباشر HD مدمج'],
    seatMap: 'theatre', ticketTier: 'DELEGATE PASS', ticketPrice: '١٨٠٠ ريال',
    names: ['Dr. Ahmed Al-Rashid','Sarah Mitchell','محمد الزهراني','Wei Chen','Fatima Al-Qahtani','James Harrison'],
    seats: ['Hall-A','VIP-2','B14','Hall-C','VIP-7','A22'],
  },
  {
    id: 'gala', label: 'حفلات توزيع الجوائز', sub: 'Luxury Galas',
    Icon: Award,
    capacity: 1200, sold: 1147, vip: 220,
    revenueToday: 820000, revenueLabel: '٨٢٠ ألف',
    venue: 'فندق فاخر', venueEn: 'Grand Ballroom', city: 'جدة',
    date: 'السبت ٦ ديسمبر', time: '٧:٠٠ م',
    color: '#C084FC', glow: 'rgba(192,132,252,0.3)',
    gradient: 'linear-gradient(145deg,#0a0218,#160535)',
    bgGrad: 'radial-gradient(ellipse 90% 70% at 50% -5%,rgba(139,92,246,0.16) 0%,transparent 65%)',
    headerGrad: 'linear-gradient(135deg,#3b1060,#6b1fa0)',
    features: ['طاولات VIP مع بطاقات ضيافة','بروتوكول رسمي وحضور رسمي','تذاكر بورق فاخر + رقمية','إدارة قائمة الشرف'],
    seatMap: 'banquet', ticketTier: 'PLATINUM TABLE', ticketPrice: '٤٥٠٠ ريال',
    names: ['الأميرة نورة','د. خالد العمري','سارة الجهني','عبدالعزيز الفيصل','لمى البسام','طارق الحربي'],
    seats: ['T-VIP1','T-A3','T-B7','T-VIP2','T-C2','T-A9'],
  },
  {
    id: 'festival', label: 'الفعاليات والمهرجانات', sub: 'Festivals & Outdoor Events',
    Icon: Sparkles,
    capacity: 50000, sold: 47350, vip: 1400,
    revenueToday: 4500000, revenueLabel: '٤.٥م',
    venue: 'ميدان الفعاليات المفتوح', venueEn: 'Festival Grounds', city: 'الرياض',
    date: 'الخميس ٢٣ أكتوبر', time: '٦:٠٠ م',
    color: '#F97316', glow: 'rgba(249,115,22,0.3)',
    gradient: 'linear-gradient(145deg,#150500,#2e1000)',
    bgGrad: 'radial-gradient(ellipse 90% 70% at 50% -5%,rgba(249,115,22,0.14) 0%,transparent 65%)',
    headerGrad: 'linear-gradient(135deg,#6e2500,#b84000)',
    features: ['مناطق مخصصة A · B · C · VIP','تذاكر يومية وموسمية','خريطة تفاعلية للأجنحة','إحصائيات حضور لحظية'],
    seatMap: 'festival', ticketTier: 'PREMIUM ZONE', ticketPrice: '١٢٠ ريال',
    names: ['خالد السبيعي','ريم العمري','ماجد الجعفري','دانة الملحم','سلطان الشمري','هند القحطاني'],
    seats: ['Zone-A','Zone-VIP','Zone-B','Zone-A','Zone-C','Zone-VIP'],
  },
  {
    id: 'entry', label: 'الدخوليات', sub: 'Timed Entry Passes',
    Icon: DoorOpen,
    capacity: 15000, sold: 13680, vip: 520,
    revenueToday: 820000, revenueLabel: '٨٢٠ ألف',
    venue: 'مرفق ترفيهي', venueEn: 'Entertainment Venue', city: 'جدة',
    date: 'يومي', time: '٩:٠٠ ص — ١٠:٠٠ م',
    color: '#22D3EE', glow: 'rgba(34,211,238,0.3)',
    gradient: 'linear-gradient(145deg,#010f18,#021e30)',
    bgGrad: 'radial-gradient(ellipse 90% 70% at 50% -5%,rgba(6,182,212,0.15) 0%,transparent 65%)',
    headerGrad: 'linear-gradient(135deg,#044f60,#0a8ea8)',
    features: ['حجز وقت دخول محدد','توزيع ذكي يمنع التكدس','تذاكر عائلية وطلابية وأفراد','تحكم آني بالطاقة الاستيعابية'],
    seatMap: 'entry', ticketTier: 'FAMILY PASS', ticketPrice: '٢٢٠ ريال',
    names: ['عائلة الحربي','أحمد البقمي','ليلى الأنصاري','عائلة الدوسري','يوسف المطيري','منى العسيري'],
    seats: ['10:00 AM','11:00 AM','2:00 PM','10:30 AM','3:00 PM','4:00 PM'],
  },
];

/* ══════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════ */
function AnimCount({ to, dur = 1600 }: { to: number; dur?: number }) {
  const [v, setV] = useState(0);
  const done = useRef(false);
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    if (el.current) obs.observe(el.current);
    return () => obs.disconnect();
  }, [to, dur]);
  return <span ref={el}>{v.toLocaleString('ar-SA')}</span>;
}

/* ══════════════════════════════════════════════════════
   SPARKLINE (revenue chart)
══════════════════════════════════════════════════════ */
function Sparkline({ color, peak }: { color: string; peak: number }) {
  const points = [0.1,0.2,0.15,0.35,0.28,0.5,0.42,0.65,0.6,0.78,0.72,0.88,0.82,0.95,0.92,1.0];
  const W = 200; const H = 44;
  const pts = points.map((y, x) => `${(x / (points.length - 1)) * W},${H - y * (H - 4) - 2}`).join(' ');
  const areaPath = `M0,${H} L${pts.split(' ').join(' L')} L${W},${H} Z`;
  return (
    <svg width={W} height={H} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#sg-${color.replace('#', '')})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* last dot */}
      <circle cx={(points.length - 1) / (points.length - 1) * W} cy={H - 1.0 * (H - 4) - 2} r="3.5" fill={color} />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   SEAT MAPS
══════════════════════════════════════════════════════ */
const SeatMap = React.memo(function SeatMap({ pattern, color, fill }: {
  pattern: EventDef['seatMap']; color: string; fill: number; 
}) {
  if (pattern === 'arena') return (
    <svg viewBox="0 0 420 260" style={{ width: '100%', height: 200 }}>
      <rect x={150} y={8} width={120} height={30} rx={6} fill={color} opacity={0.9}/>
      <text x={210} y={28} textAnchor="middle" fontSize={10} fill="#000" fontWeight="900" fontFamily="sans-serif">S T A G E</text>
      {Array.from({ length: 11 }, (_, row) => {
        const r = 52 + row * 16; const n = Math.round(9 + row * 2.4);
        const a0 = -162 * Math.PI / 180; const a1 = -18 * Math.PI / 180;
        const isVip = row < 2;
        return Array.from({ length: n }, (_, s) => {
          const a = a0 + (s / (n - 1)) * (a1 - a0);
          const cx = 210 + r * Math.cos(a); const cy = 80 + r * Math.sin(a) * 0.65;
          const sold = (s * 0.6 + row * 1.8) / (n * 11) < fill * 1.04;
          return <rect key={`${row}-${s}`} x={cx-3} y={cy-2.5} width={6} height={5} rx={1.5}
            fill={sold ? (isVip ? color : `${color}aa`) : 'rgba(255,255,255,0.08)'} />;
        });
      })}
      {Array.from({ length: 3 }, (_, row) => {
        const n = 52 + row * 6;
        return Array.from({ length: n }, (_, s) => {
          const sold = (s + row * 2) / n < fill;
          return <rect key={`back-${row}-${s}`} x={8 + s * (404 / n)} y={198 + row * 17}
            width={404 / n - 1.2} height={13} rx={2}
            fill={sold ? `${color}55` : 'rgba(255,255,255,0.05)'} />;
        });
      })}
      <text x={210} y={80} textAnchor="middle" fontSize={7} fill={color} fontWeight="700" fontFamily="sans-serif" opacity={0.65}>VIP</text>
    </svg>
  );

  if (pattern === 'theatre') return (
    <svg viewBox="0 0 420 240" style={{ width: '100%', height: 190 }}>
      <ellipse cx={210} cy={22} rx={110} ry={16} fill={color} opacity={0.85}/>
      <text x={210} y={27} textAnchor="middle" fontSize={10} fill="#000" fontWeight="900" fontFamily="sans-serif">S T A G E</text>
      {Array.from({ length: 11 }, (_, row) => {
        const cols = row < 4 ? 16 : 20; const sw = 360 / cols; const x0 = (420 - 360) / 2;
        const isVip = row < 3;
        return Array.from({ length: cols }, (_, s) => {
          const sold = (s * 0.65 + row * 1.5) / (cols * 11) < fill * 1.03;
          return <rect key={`${row}-${s}`} x={x0 + s * sw + 1} y={46 + row * 18}
            width={sw - 2} height={13} rx={3}
            fill={sold ? (isVip ? color : `${color}88`) : 'rgba(255,255,255,0.07)'} />;
        });
      })}
      <text x={38} y={70} fontSize={8} fill={color} fontWeight="700" fontFamily="sans-serif" opacity={0.6}>VIP</text>
    </svg>
  );

  // Banquet tables
  if (pattern === 'banquet') {
  const tables = [
    {x:210,y:60,vip:true},{x:100,y:130},{x:210,y:130},{x:320,y:130},
    {x:70,y:205},{x:160,y:205},{x:250,y:205},{x:340,y:205},
    {x:120,y:270},{x:210,y:270},{x:300,y:270},
  ];
  return (
    <svg viewBox="0 0 420 320" style={{ width: '100%', height: 210 }}>
      <rect x={110} y={10} width={200} height={26} rx={8} fill={color} opacity={0.85}/>
      <text x={210} y={28} textAnchor="middle" fontSize={10} fill="#000" fontWeight="900" fontFamily="sans-serif">S T A G E</text>
      {tables.map(({ x, y, vip }, i) => {
        const booked = i / tables.length < fill;
        const c = booked ? (vip ? color : `${color}99`) : 'rgba(255,255,255,0.09)';
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={22} fill={c} opacity={0.55}/>
            <circle cx={x} cy={y} r={13} fill={c}/>
            {[0,60,120,180,240,300].map((deg, j) => (
              <circle key={j} cx={x + 22 * Math.cos(deg*Math.PI/180)} cy={y + 22 * Math.sin(deg*Math.PI/180)} r={4.5} fill={c} opacity={0.9}/>
            ))}
            {vip && <text x={x} y={y+4} textAnchor="middle" fontSize={6} fill="#000" fontWeight="900" fontFamily="sans-serif">VIP</text>}
          </g>
        );
      })}
    </svg>
  );
  }

  if (pattern === 'festival') {
    // Outdoor festival zones — top-down view
    const zones = [
      { label: 'VIP',    x: 155, y: 18,  w: 110, h: 44,  isVip: true  },
      { label: 'Zone A', x: 30,  y: 80,  w: 155, h: 52,  isVip: false },
      { label: 'Zone B', x: 235, y: 80,  w: 155, h: 52,  isVip: false },
      { label: 'Zone C', x: 30,  y: 148, w: 155, h: 52,  isVip: false },
      { label: 'Zone D', x: 235, y: 148, w: 155, h: 52,  isVip: false },
      { label: 'Zone E', x: 55,  y: 216, w: 310, h: 44,  isVip: false },
    ];
    const dotGridW = (zone: typeof zones[0]) => Math.floor((zone.w - 12) / 10);
    const dotGridH = (zone: typeof zones[0]) => Math.floor((zone.h - 12) / 10);
    return (
      <svg viewBox="0 0 420 270" style={{ width: '100%', height: 210 }}>
        {/* Stage */}
        <rect x={140} y={2} width={140} height={10} rx={4} fill={color} opacity={0.9}/>
        <text x={210} y={10} textAnchor="middle" fontSize={7} fill="#000" fontWeight="900" fontFamily="sans-serif">MAIN STAGE</text>

        {zones.map((z, zi) => {
          const gw = dotGridW(z); const gh = dotGridH(z);
          const total = gw * gh;
          const filled = Math.round(total * fill * (z.isVip ? 1.05 : 1));
          const c = z.isVip ? color : `${color}${zi < 3 ? 'bb' : '77'}`;
          return (
            <g key={zi}>
              <rect x={z.x} y={z.y} width={z.w} height={z.h} rx={7}
                fill={`${color}${z.isVip ? '18' : '0d'}`}
                stroke={`${color}${z.isVip ? '55' : '28'}`} strokeWidth={1}/>
              <text x={z.x + z.w / 2} y={z.y + 9} textAnchor="middle"
                fontSize={6.5} fill={z.isVip ? color : `${color}aa`}
                fontWeight="800" fontFamily="sans-serif">{z.label}</text>
              {Array.from({ length: gh }, (_, row) =>
                Array.from({ length: gw }, (_, col) => {
                  const idx = row * gw + col;
                  const sold = idx < filled;
                  return <rect key={`${zi}-${row}-${col}`}
                    x={z.x + 6 + col * 10} y={z.y + 13 + row * 10}
                    width={7} height={7} rx={2}
                    fill={sold ? c : 'rgba(255,255,255,0.07)'}/>;
                })
              )}
            </g>
          );
        })}
      </svg>
    );
  }

  // Entry passes — turnstile gates view
  const timeSlots = [
    { time: '09:00', cap: 1800, booked: Math.round(1800 * Math.min(fill * 1.1, 1)) },
    { time: '10:00', cap: 2200, booked: Math.round(2200 * Math.min(fill * 1.05, 1)) },
    { time: '11:00', cap: 2000, booked: Math.round(2000 * fill) },
    { time: '12:00', cap: 1600, booked: Math.round(1600 * fill) },
    { time: '14:00', cap: 2400, booked: Math.round(2400 * fill * 0.9) },
    { time: '16:00', cap: 2000, booked: Math.round(2000 * fill * 0.75) },
    { time: '18:00', cap: 3000, booked: Math.round(3000 * fill * 0.5) },
  ];
  return (
    <svg viewBox="0 0 420 220" style={{ width: '100%', height: 190 }}>
      {/* Header */}
      <rect x={10} y={5} width={400} height={22} rx={6} fill={`${color}15`} stroke={`${color}30`} strokeWidth={1}/>
      <text x={210} y={20} textAnchor="middle" fontSize={9} fill={color} fontWeight="800" fontFamily="sans-serif">TIME-SLOT ENTRY MANAGEMENT</text>

      {timeSlots.map((slot, i) => {
        const barW = 290;
        const filledW = Math.round((slot.booked / slot.cap) * barW);
        const pct = Math.round((slot.booked / slot.cap) * 100);
        const isHot = pct > 85;
        const y = 40 + i * 25;
        return (
          <g key={i}>
            {/* Time label */}
            <text x={42} y={y + 11} textAnchor="end" fontSize={9} fill="rgba(255,255,255,0.55)"
              fontWeight="700" fontFamily="sans-serif">{slot.time}</text>
            {/* Track */}
            <rect x={48} y={y + 2} width={barW} height={16} rx={4} fill="rgba(255,255,255,0.05)"/>
            {/* Fill */}
            <rect x={48} y={y + 2} width={filledW} height={16} rx={4}
              fill={isHot ? `${color}` : `${color}88`} opacity={isHot ? 0.9 : 0.7}/>
            {/* Count */}
            <text x={48 + barW + 6} y={y + 13} fontSize={8.5} fill={isHot ? color : 'rgba(255,255,255,0.4)'}
              fontWeight="800" fontFamily="sans-serif">{pct}٪</text>
            {/* FULL badge */}
            {pct >= 98 && (
              <rect x={48 + barW - 22} y={y + 4} width={18} height={10} rx={3} fill={color}/>
            )}
            {pct >= 98 && (
              <text x={48 + barW - 13} y={y + 12} textAnchor="middle" fontSize={6.5} fill="#000"
                fontWeight="900" fontFamily="sans-serif">FULL</text>
            )}
          </g>
        );
      })}

      {/* Gate icons */}
      <text x={210} y={216} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.2)"
        fontFamily="sans-serif">▲ GATE 1 &nbsp;&nbsp;&nbsp; ▲ GATE 2 &nbsp;&nbsp;&nbsp; ▲ GATE 3 &nbsp;&nbsp;&nbsp; ▲ GATE 4</text>
    </svg>
  );
});

/* ══════════════════════════════════════════════════════
   TICKET CARD (Apple Wallet style)
══════════════════════════════════════════════════════ */
function TicketCard({ ev }: { ev: EventDef }) {
  return (
    <motion.div
      key={ev.id}
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: 20, overflow: 'hidden', flexShrink: 0,
        boxShadow: `0 24px 60px ${ev.glow}, 0 0 0 1px rgba(255,255,255,0.06)`,
        background: ev.gradient, direction: 'ltr', fontFamily: 'sans-serif',
      }}>

      {/* Header strip */}
      <div style={{
        background: ev.headerGrad,
        padding: '16px 20px 14px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110,
          borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }}/>
        <div style={{ position: 'absolute', bottom: -20, left: 20, width: 70, height: 70,
          borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
          <div>
            <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.55)', letterSpacing: 2.5,
              textTransform: 'uppercase', marginBottom: 4 }}>{ev.sub}</div>
            <div style={{ fontSize: 17, fontWeight: 900, color: '#fff', letterSpacing: -0.3, lineHeight: 1.2 }}>
              {ev.label}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>
              {ev.venue}
            </div>
          </div>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ev.Icon size={18} color="rgba(255,255,255,0.9)" strokeWidth={1.75}/>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div style={{ padding: '14px 20px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[['DATE', ev.date], ['TIME', ev.time], ['CITY', ev.city]].map(([l, v]) => (
          <div key={l}>
            <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.3)', letterSpacing: 1.5, marginBottom: 3 }}>{l}</div>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 20px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[['TIER', ev.ticketTier], ['PRICE', ev.ticketPrice]].map(([l, v]) => (
          <div key={l}>
            <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.3)', letterSpacing: 1.5, marginBottom: 3 }}>{l}</div>
            <div style={{ fontSize: 11, fontWeight: 900, color: ev.color, letterSpacing: 0.3 }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Tear line */}
      <div style={{ position: 'relative', margin: '0 -1px', height: 16, display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1, borderTop: '1.5px dashed rgba(255,255,255,0.1)' }}/>
        {[0, 1].map(i => (
          <div key={i} style={{
            position: 'absolute', [i === 0 ? 'left' : 'right']: -7,
            width: 14, height: 14, borderRadius: '50%',
            background: '#05050b', border: '1px solid rgba(255,255,255,0.06)',
          }}/>
        ))}
      </div>

      {/* Barcode stub */}
      <div style={{ padding: '12px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.25)', letterSpacing: 1.5, marginBottom: 4 }}>TICKET NO.</div>
          <div style={{ fontFamily: 'monospace', fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
            {ev.id.toUpperCase()}-2025-{Math.floor(Math.random() * 9000 + 1000)}
          </div>
        </div>
        {/* QR stub */}
        <svg width={44} height={44} style={{ opacity: 0.65 }}>
          {[[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]].map((row, r) =>
            row.map((v, c) => v ? <rect key={`${r}-${c}`} x={c*6.28} y={r*6.28} width={5.5} height={5.5} fill="#fff" rx={1}/> : null)
          )}
        </svg>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   LIVE BOOKING FEED
══════════════════════════════════════════════════════ */
interface BookingEntry { id: number; name: string; seat: string; tier: string; age: number }
let _id = 0;

function LiveFeed({ ev }: { ev: EventDef }) {
  const [entries, setEntries] = useState<BookingEntry[]>(() =>
    ev.names.slice(0, 4).map((name, i) => ({
      id: _id++, name, seat: ev.seats[i] ?? 'A1', tier: i < 2 ? 'VIP' : 'Regular', age: (i + 1) * 14,
    }))
  );

  useEffect(() => {
    setEntries(ev.names.slice(0, 4).map((name, i) => ({
      id: _id++, name, seat: ev.seats[i] ?? 'A1', tier: i < 2 ? 'VIP' : 'Regular', age: (i + 1) * 14,
    })));
    const t = setInterval(() => {
      const name = ev.names[Math.floor(Math.random() * ev.names.length)];
      const seat = ev.seats[Math.floor(Math.random() * ev.seats.length)];
      const isVip = seat.includes('VIP') || seat.includes('T-VIP');
      setEntries(prev => [{ id: _id++, name, seat, tier: isVip ? 'VIP' : 'Regular', age: 0 }, ...prev].slice(0, 5));
    }, 2600);
    return () => clearInterval(t);
  }, [ev]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 11.5, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, textTransform: 'uppercase' }}>
          آخر الحجوزات
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 5px #EF4444' }} className="pulse-dot"/>
          <span style={{ fontFamily: 'sans-serif', fontSize: 9.5, color: 'rgba(239,68,68,0.8)', fontWeight: 700, letterSpacing: 1 }}>LIVE</span>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {entries.map(e => (
          <motion.div key={e.id}
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}>
            <div style={{
              padding: '9px 12px', borderRadius: 10,
              background: e.age < 5 ? `${ev.color}14` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${e.age < 5 ? ev.color + '33' : 'rgba(255,255,255,0.06)'}`,
              display: 'flex', alignItems: 'center', gap: 10,
              transition: 'background 1.5s, border-color 1.5s',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                background: e.tier === 'VIP' ? `${ev.color}22` : 'rgba(255,255,255,0.06)',
                border: `1px solid ${e.tier === 'VIP' ? ev.color + '44' : 'rgba(255,255,255,0.08)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12,
              }}>
                {e.tier === 'VIP' ? '⭐' : '🎫'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 12, color: '#fff',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {e.name}
                </div>
                <div style={{ fontFamily: 'sans-serif', fontWeight: 600, fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>
                  Seat {e.seat} · {e.tier}
                </div>
              </div>
              <div style={{
                fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 10,
                color: e.age < 5 ? ev.color : 'rgba(255,255,255,0.25)',
                whiteSpace: 'nowrap',
              }}>
                {e.age < 5 ? 'الآن' : `منذ ${e.age}د`}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   LIVE DASHBOARD (left panel)
══════════════════════════════════════════════════════ */
function LiveDashboard({ ev }: { ev: EventDef }) {
  const [count, setCount] = useState(ev.sold - 60);
  const [rev, setRev]     = useState(ev.revenueToday - 40000);
  useEffect(() => {
    setCount(ev.sold - 60);
    setRev(ev.revenueToday - 40000);
    const t1 = setInterval(() => setCount(c => c < ev.sold ? c + 1 : c), 180);
    const t2 = setInterval(() => setRev(r => r < ev.revenueToday ? r + Math.round(ev.revenueToday * 0.002) : r), 200);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [ev.sold, ev.revenueToday]);
  const pct = Math.round((count / ev.capacity) * 100);

  return (
    <motion.div
      key={ev.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: 22, overflow: 'hidden',
        background: ev.gradient,
        border: `1px solid ${ev.color}22`,
        boxShadow: `0 28px 72px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)`,
      }}>

      {/* Top bar */}
      <div style={{ padding: '18px 22px 16px', borderBottom: `1px solid ${ev.color}14`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10,
            background: `${ev.color}1a`, border: `1px solid ${ev.color}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ev.Icon size={16} color={ev.color} strokeWidth={1.75}/>
          </div>
          <div>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 14, color: '#fff' }}>{ev.label}</div>
            <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 1.5, textTransform: 'uppercase' }}>
              {ev.venueEn}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px',
          borderRadius: 99, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#EF4444',
            boxShadow: '0 0 5px #EF4444' }} className="pulse-dot"/>
          <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 10, color: '#EF4444' }}>مباشر</span>
        </div>
      </div>

      {/* Seat map */}
      <div style={{ padding: '10px 22px 0' }}>
        <SeatMap pattern={ev.seatMap} color={ev.color} fill={count / ev.capacity} />
      </div>

      {/* Legend */}
      <div style={{ padding: '4px 22px 10px', display: 'flex', gap: 14 }}>
        {[['محجوز', ev.color + 'aa'], ['VIP', ev.color], ['متاح', 'rgba(255,255,255,0.12)']].map(([l, c]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c }}/>
            <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
        borderTop: `1px solid ${ev.color}10`, borderBottom: `1px solid ${ev.color}10` }}>
        {[
          { l: 'المحجوز', v: count.toLocaleString('ar-SA'), s: `/ ${ev.capacity.toLocaleString('ar-SA')}` },
          { l: 'VIP', v: ev.vip.toString(), s: 'مقعد' },
          { l: 'الإيرادات', v: ev.revenueLabel, s: 'ريال' },
        ].map((s, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ background: `${ev.color}10` }}/>}
            <div style={{ padding: '14px 0', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 19, color: ev.color, letterSpacing: -0.3 }}>{s.v}</div>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{s.l}</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 8.5, color: 'rgba(255,255,255,0.18)', marginTop: 1 }}>{s.s}</div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Progress */}
      <div style={{ padding: '12px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>نسبة الإشغال</span>
          <span style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 13, color: ev.color }}>{pct}٪</span>
        </div>
        <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.06)' }}>
          <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 1, ease: 'easeOut' }}
            style={{ height: '100%', borderRadius: 3, background: `linear-gradient(90deg,${ev.color}88,${ev.color})` }}/>
        </div>
      </div>

      {/* Revenue chart */}
      <div style={{ padding: '0 22px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <BarChart3 size={12} color={ev.color} strokeWidth={2}/>
            <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>إيرادات اليوم</span>
          </div>
          <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 13, color: ev.color }}>
            {rev.toLocaleString('ar-SA')} ر
          </span>
        </div>
        <Sparkline color={ev.color} peak={ev.revenueToday}/>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   PROCESS STEPS
══════════════════════════════════════════════════════ */
const STEPS = [
  { n: '١', Icon: CalendarDays, title: 'أنشئ فعاليتك',    body: 'أدخل التفاصيل، الطاقة الاستيعابية، ومستويات التذاكر خلال دقائق.' },
  { n: '٢', Icon: Ticket,       title: 'انشر رابط الحجز', body: 'رابط مخصص لفعاليتك — شاركه على وسائل التواصل أو موقعك.' },
  { n: '٣', Icon: ScanLine,     title: 'أدِر يوم الفعالية', body: 'بوابات NFC، لوحة تحكم حية، وتقارير فورية طوال الفعالية.' },
];

const TRUST = [
  { Icon: ShieldCheck, text: 'سيرفر سعودي مرخّص' },
  { Icon: Bell,        text: 'إشعارات واتساب فورية' },
  { Icon: Zap,         text: 'الإعداد خلال ٤٨ ساعة' },
  { Icon: Star,        text: '٩٩٪ رضا المنظّمين' },
];

const STATS_BAR = [
  { to: 2400000, suf: '+', label: 'حاضر تمت إدارته' },
  { to: 340,     suf: '+', label: 'فعالية ضخمة' },
  { to: 99,      suf: '٪', label: 'رضا المنظّمين' },
  { to: 48,      suf: 'س', label: 'وقت الإعداد' },
];

/* ══════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════ */
export default function BookingsSection() {
  const [activeId, setActiveId] = useState('concert');
  const ev = EVENTS.find(e => e.id === activeId)!;

  return (
    <section id="bookings" style={{
      padding: 'clamp(90px,10vw,140px) 0',
      background: '#04040a',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Cinematic BG */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <AnimatePresence>
          <motion.div key={activeId}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            style={{ position: 'absolute', inset: 0, background: ev.bgGrad }}/>
        </AnimatePresence>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}/>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 220,
          background: 'linear-gradient(0deg,#04040a,transparent)' }}/>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>

          <div className="section-label" style={{
            color: ev.color, borderColor: `${ev.color}40`, background: `${ev.color}10`,
            marginBottom: 20, transition: 'all 0.5s',
            display: 'inline-flex', alignItems: 'center', gap: 7,
          }}>
            <ev.Icon size={12} strokeWidth={2}/>
            إدارة الفعاليات الضخمة
          </div>

          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2.2rem,4.8vw,3.8rem)',
            letterSpacing: '-0.045em', lineHeight: 1.08, marginBottom: 18, color: '#fff' }}>
            من حفلات الاستاد
            <br/>
            <span style={{
              background: `linear-gradient(135deg,${ev.color},${ev.color}bb)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              transition: 'all 0.5s',
            }}>
              إلى القمم الدولية
            </span>
          </h2>

          <p style={{ fontSize: 16.5, color: 'rgba(255,255,255,0.42)', maxWidth: 520,
            margin: '0 auto', lineHeight: 1.8, fontFamily: 'Cairo,sans-serif' }}>
            نظام تذاكر واجهة دخول يرتقي لمستوى أضخم الفعاليات — مصمّم للمنظّم الذي لا يقبل أقل من الكمال.
          </p>
        </motion.div>

        {/* ── EVENT TABS ── */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 52, flexWrap: 'wrap' }}>
          {EVENTS.map(e => {
            const on = activeId === e.id;
            return (
              <motion.button key={e.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => setActiveId(e.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '11px 20px', borderRadius: 13, cursor: 'pointer',
                  background: on ? `${e.color}18` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${on ? e.color + '50' : 'rgba(255,255,255,0.08)'}`,
                  fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 13.5,
                  color: on ? e.color : 'rgba(255,255,255,0.38)',
                  boxShadow: on ? `0 4px 22px ${e.glow}` : 'none',
                  transition: 'all 0.22s',
                }}>
                <e.Icon size={15} strokeWidth={1.75}/>
                {e.label}
                {on && <div style={{ width: 5, height: 5, borderRadius: '50%', background: e.color, boxShadow: `0 0 7px ${e.color}` }}/>}
              </motion.button>
            );
          })}
        </div>

        {/* ── 3-COLUMN MAIN ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.95fr 0.95fr', gap: 24, marginBottom: 72 }}>

          {/* COL 1: Live Dashboard */}
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <AnimatePresence mode="wait">
              <LiveDashboard key={`dash-${activeId}`} ev={ev}/>
            </AnimatePresence>
          </motion.div>

          {/* COL 2: Ticket + Features */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            <AnimatePresence mode="wait">
              <TicketCard key={`ticket-${activeId}`} ev={ev}/>
            </AnimatePresence>

            {/* Features chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ev.features.map((f, i) => (
                <motion.div key={`${activeId}-${i}`}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                    borderRadius: 11, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                    background: `${ev.color}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={11} strokeWidth={3} color={ev.color}/>
                  </div>
                  <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 12.5, color: 'rgba(255,255,255,0.65)' }}>{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* COL 3: Live feed + CTA */}
          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Live feed card */}
            <div style={{ borderRadius: 18, background: ev.gradient,
              border: `1px solid ${ev.color}18`, padding: '18px 16px',
              boxShadow: `0 16px 48px rgba(0,0,0,0.5)` }}>
              <AnimatePresence mode="wait">
                <motion.div key={`feed-${activeId}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}>
                  <LiveFeed ev={ev}/>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {TRUST.map(({ Icon, text }, i) => (
                <div key={i} style={{ padding: '12px 14px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon size={13} strokeWidth={1.75} color={ev.color}/>
                  <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 11,
                    color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href={WA} target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                padding: '15px 20px', borderRadius: 14, textDecoration: 'none',
                background: 'linear-gradient(135deg,#25D366,#128C7E)',
                fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 14, color: '#fff',
                boxShadow: '0 8px 28px rgba(37,211,102,0.3)',
                transition: 'transform 0.18s, box-shadow 0.18s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 36px rgba(37,211,102,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(37,211,102,0.3)'; }}>
              {WA_ICON}
              ابدأ تنظيم فعاليتك
            </a>
          </motion.div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 22, color: '#fff', letterSpacing: '-0.03em' }}>
              كيف يعمل النظام؟
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 0 }}>
                {/* Connector */}
                {i < STEPS.length - 1 && (
                  <div style={{
                    position: 'absolute', top: 28, left: '50%', width: '50%', height: 1.5,
                    background: `linear-gradient(90deg,${ev.color}50,transparent)`,
                    zIndex: 0,
                  }}/>
                )}
                <div style={{ padding: '0 16px', flex: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16, margin: '0 auto 16px',
                    background: `${ev.color}15`, border: `1.5px solid ${ev.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', transition: 'all 0.4s',
                  }}>
                    <s.Icon size={22} strokeWidth={1.75} color={ev.color}/>
                    <div style={{
                      position: 'absolute', top: -8, right: -8, width: 22, height: 22,
                      borderRadius: '50%', background: ev.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 10, color: '#000',
                    }}>{s.n}</div>
                  </div>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 15,
                    color: '#fff', marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 12.5,
                    color: 'rgba(255,255,255,0.38)', lineHeight: 1.7 }}>{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── STATS BAR ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{
            borderRadius: 22, overflow: 'hidden', marginBottom: 56,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          }}>
          {STATS_BAR.map(({ to, suf, label }, i) => (
            <div key={i} style={{ padding: '30px 20px', textAlign: 'center',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 34,
                color: '#fff', letterSpacing: -1, lineHeight: 1 }}>
                <AnimCount to={to}/>{suf}
              </div>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 12.5,
                color: 'rgba(255,255,255,0.28)', marginTop: 8 }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── BOTTOM CTA ── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 13,
            color: 'rgba(255,255,255,0.22)', marginBottom: 20 }}>
            يبدأ من ٥٠ ريال/شهر · للمشاريع الصغيرة والكبيرة · جاهز خلال ٤٨ ساعة
          </div>
          <a href={WA} target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '14px 36px', borderRadius: 99, textDecoration: 'none',
              background: 'linear-gradient(135deg,#25D366,#128C7E)',
              fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 15, color: '#fff',
              boxShadow: '0 8px 30px rgba(37,211,102,0.28)',
            }}>
            {WA_ICON}
            تواصل معنا الآن
          </a>
        </motion.div>

      </div>
    </section>
  );
}
