import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=أريد%20بطاقة%20Apple%20Wallet%20لمشروعي';

/* ─────────────────────────────────────────────────────────────
   SHARED PRIMITIVES
───────────────────────────────────────────────────────────── */

function QR({ size = 54, color = 'white', opacity = 0.9 }: { size?: number; color?: string; opacity?: number }) {
  // 7×7 QR-like matrix
  const pattern = [
    [1,1,1,1,1,1,1, 0, 1,0,1,1,0, 0, 1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1, 0, 0,1,0,0,1, 0, 1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1, 0, 1,0,1,0,0, 0, 1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1, 0, 0,0,0,1,1, 0, 1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1, 0, 1,1,0,0,1, 0, 1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1, 0, 0,1,0,1,0, 0, 1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1, 0, 1,0,1,0,1, 0, 1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0, 0, 0,1,0,1,0, 0, 0,0,0,0,0,0,0],
    [1,1,0,1,0,1,1, 1, 0,0,1,1,0, 1, 1,0,1,0,1,0,1],
    [0,1,0,0,1,0,0, 0, 1,0,0,1,0, 0, 0,1,0,0,1,0,0],
    [1,0,1,1,0,0,1, 1, 0,1,0,0,1, 1, 1,0,1,1,0,0,1],
    [0,1,0,0,1,1,0, 0, 1,1,0,1,0, 0, 0,1,0,0,1,1,0],
    [1,1,0,1,0,1,0, 1, 0,0,1,0,1, 0, 1,1,0,1,0,1,0],
    [0,0,0,0,0,0,0, 0, 1,0,0,1,0, 0, 0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1, 0, 0,1,0,0,1, 1, 1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1, 0, 1,0,1,0,0, 0, 0,0,0,0,1,0,0],
    [1,0,1,1,1,0,1, 1, 0,0,0,1,1, 1, 1,0,1,0,0,1,0],
    [1,0,0,0,0,0,1, 0, 1,1,0,0,1, 0, 0,1,0,0,0,1,1],
    [1,1,1,1,1,1,1, 0, 0,0,1,0,0, 1, 0,0,1,1,0,0,1],
  ];
  const cell = size / pattern.length;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ opacity }}>
      {pattern.map((row, r) =>
        row.map((v, c) =>
          v ? <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill={color} rx={cell * 0.1} /> : null
        )
      )}
    </svg>
  );
}

function Barcode({ width = 160, height = 44, color = 'white', opacity = 0.88 }: { width?: number; height?: number; color?: string; opacity?: number }) {
  const bars = [2,1,3,1,2,3,1,2,1,3,2,1,2,1,3,1,2,2,1,3,1,2,1,3,2,1,1,2,3,1,2];
  let x = 0;
  const cells: JSX.Element[] = [];
  bars.forEach((w, i) => {
    if (i % 2 === 0) cells.push(<rect key={i} x={x} y={0} width={w * (width / bars.reduce((a,b)=>a+b,0)) * 2.2} height={height} fill={color} />);
    x += w * (width / bars.reduce((a,b)=>a+b,0)) * 2.2;
  });
  return <svg width={width} height={height} style={{ opacity }}>{cells}</svg>;
}

function TearLine({ color = 'rgba(255,255,255,0.18)' }: { color?: string }) {
  return (
    <div style={{ position: 'relative', margin: '0 -18px', height: 1 }}>
      <div style={{ position: 'absolute', top: -7, left: -6, width: 14, height: 14, borderRadius: '50%', background: '#1C1C1E' }} />
      <div style={{ position: 'absolute', top: -7, right: -6, width: 14, height: 14, borderRadius: '50%', background: '#1C1C1E' }} />
      <svg width="100%" height="1" style={{ overflow: 'visible' }}>
        <line x1="8" y1="0.5" x2="calc(100% - 8px)" y2="0.5" stroke={color} strokeWidth="1.5" strokeDasharray="5 4" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   1. بطاقة ولاء  (Loyalty)
───────────────────────────────────────────────────────────── */
function LoyaltyPass() {
  const pct = 247 / 500;
  return (
    <div style={{ width: '100%', background: 'linear-gradient(150deg,#7C3500 0%,#B85C1A 45%,#7C3500 100%)', borderRadius: 20, overflow: 'hidden', fontFamily: 'Cairo,sans-serif', position: 'relative' }}>
      {/* Noise texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")', opacity: 0.6, pointerEvents: 'none' }} />
      {/* Glow orb */}
      <div style={{ position: 'absolute', top: -30, right: -20, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,180,80,0.25) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ padding: '16px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(255,200,100,0.22)', border: '1.5px solid rgba(255,200,100,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>☕</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#fff', letterSpacing: 0 }}>تلقا البرمجية</div>
            <div style={{ fontSize: 8.5, color: 'rgba(255,200,100,0.7)', fontWeight: 700, letterSpacing: '0.06em' }}>TLQA LOYALTY</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {'★★★★'.split('').map((s, i) => <span key={i} style={{ fontSize: 10, color: i < 3 ? '#FFD060' : 'rgba(255,255,255,0.25)' }}>{s}</span>)}
        </div>
      </div>

      {/* Primary */}
      <div style={{ padding: '6px 18px 10px' }}>
        <div style={{ fontSize: 9, color: 'rgba(255,200,100,0.65)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>النقاط</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>٢٤٧</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>/ ٥٠٠</div>
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: 10, height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct * 100}%` }} transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg,#FFD060,#FF9020)' }} />
        </div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 5, fontWeight: 600 }}>٢٥٣ نقطة للمستوى الذهبي</div>
      </div>

      {/* Secondary fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, padding: '4px 18px 14px' }}>
        {[{ l: 'المستوى', v: 'فضي ✦' }, { l: 'الاسم', v: 'محمد' }, { l: 'منذ', v: '٢٠٢٤' }].map(f => (
          <div key={f.l}>
            <div style={{ fontSize: 8, color: 'rgba(255,200,100,0.55)', fontWeight: 700, letterSpacing: '0.07em' }}>{f.l}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginTop: 1 }}>{f.v}</div>
          </div>
        ))}
      </div>

      <TearLine color="rgba(255,200,100,0.2)" />

      {/* Barcode zone */}
      <div style={{ padding: '14px 18px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <QR size={62} color="rgba(255,220,140,0.9)" opacity={1} />
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em', fontWeight: 700 }}>TLQA-LOY-MHM-2024</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. بطاقة عضوية (Membership)
───────────────────────────────────────────────────────────── */
function MembershipPass() {
  return (
    <div style={{ width: '100%', background: 'linear-gradient(150deg,#120830 0%,#2D1260 50%,#120830 100%)', borderRadius: 20, overflow: 'hidden', fontFamily: 'Cairo,sans-serif', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* Gold top strip */}
      <div style={{ height: 3, background: 'linear-gradient(90deg,transparent,#F59E0B,#FDE68A,#F59E0B,transparent)' }} />

      {/* Header */}
      <div style={{ padding: '14px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#F59E0B,#D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, boxShadow: '0 4px 12px rgba(245,158,11,0.5)' }}>ت</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#fff' }}>تلقا البرمجية</div>
            <div style={{ fontSize: 8.5, color: 'rgba(253,230,138,0.7)', fontWeight: 700, letterSpacing: '0.06em' }}>TLQA MEMBERSHIP</div>
          </div>
        </div>
        <div style={{ padding: '4px 10px', borderRadius: 99, background: 'linear-gradient(135deg,#F59E0B22,#D9770622)', border: '1px solid #F59E0B60', fontSize: 9, fontWeight: 900, color: '#FDE68A' }}>GOLD</div>
      </div>

      {/* Member card visual */}
      <div style={{ margin: '0 18px 12px', padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(245,158,11,0.2)' }}>
        <div style={{ fontSize: 9, color: 'rgba(253,230,138,0.55)', fontWeight: 700, marginBottom: 4 }}>العضو</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>سلطان الغامدي</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 3, fontWeight: 600 }}>رقم العضوية: MBR-٢٠٢٤-٠٠١٢</div>
      </div>

      {/* Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '0 18px 14px' }}>
        {[{ l: 'الرصيد', v: '١٢٠ ر.س' }, { l: 'الزيارات', v: '٢٣' }, { l: 'صالح حتى', v: '١٢/٢٦' }].map(f => (
          <div key={f.l} style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: 7.5, color: 'rgba(196,181,253,0.6)', fontWeight: 700 }}>{f.l}</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#C4B5FD', marginTop: 2 }}>{f.v}</div>
          </div>
        ))}
      </div>

      <TearLine color="rgba(139,92,246,0.25)" />

      <div style={{ padding: '14px 18px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', fontWeight: 700, marginBottom: 2 }}>امسح للدخول</div>
          <Barcode width={130} height={38} color="rgba(196,181,253,0.85)" opacity={1} />
          <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', marginTop: 5 }}>TLQA-MBR-2024-0012</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#F59E0B,#D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 4px 14px rgba(245,158,11,0.5)' }}>👑</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. بطاقة هدية (Gift Card)
───────────────────────────────────────────────────────────── */
function GiftPass() {
  return (
    <div style={{ width: '100%', background: 'linear-gradient(150deg,#4A0820 0%,#9D1C40 50%,#4A0820 100%)', borderRadius: 20, overflow: 'hidden', fontFamily: 'Cairo,sans-serif', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(251,113,133,0.25) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ padding: '16px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ fontSize: 28 }}>🎁</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#fff' }}>تلقا البرمجية</div>
            <div style={{ fontSize: 8.5, color: 'rgba(251,113,133,0.7)', fontWeight: 700, letterSpacing: '0.06em' }}>GIFT CARD</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>للمرسَل إليه</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>نورة 🤍</div>
        </div>
      </div>

      {/* Balance — BIG */}
      <div style={{ padding: '8px 18px 8px', textAlign: 'center' }}>
        <div style={{ fontSize: 10, color: 'rgba(251,113,133,0.65)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>الرصيد</div>
        <div style={{ fontSize: 58, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 0 40px rgba(251,113,133,0.4)' }}>٢٠٠</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>ريال سعودي</div>
      </div>

      {/* Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '8px 18px 14px' }}>
        {[{ l: 'الكود', v: 'GIFT-4821' }, { l: 'صالح حتى', v: 'ديسمبر ٢٠٢٦' }].map(f => (
          <div key={f.l} style={{ padding: '9px 12px', borderRadius: 11, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(251,113,133,0.2)' }}>
            <div style={{ fontSize: 8, color: 'rgba(251,113,133,0.55)', fontWeight: 700 }}>{f.l}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginTop: 2 }}>{f.v}</div>
          </div>
        ))}
      </div>

      <TearLine color="rgba(251,113,133,0.22)" />

      <div style={{ padding: '14px 18px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <QR size={58} color="rgba(255,180,195,0.9)" opacity={1} />
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.18em', fontWeight: 700 }}>TLQA-GIFT-4821</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. تذكرة فعالية (Event Ticket) — boarding-pass split
───────────────────────────────────────────────────────────── */
function EventPass() {
  return (
    <div style={{ width: '100%', background: 'linear-gradient(150deg,#1A003A 0%,#4C0080 50%,#1A003A 100%)', borderRadius: 20, overflow: 'hidden', fontFamily: 'Cairo,sans-serif', position: 'relative' }}>
      {/* Confetti dots */}
      {[['10%','15%','#EC4899'],['85%','20%','#F59E0B'],['20%','45%','#06B6D4'],['75%','55%','#10B981']].map(([l,t,c],i)=>(
        <div key={i} style={{ position:'absolute', left:l as string, top:t as string, width:6, height:6, borderRadius:'50%', background:c as string, opacity:0.6, pointerEvents:'none' }} />
      ))}
      <div style={{ position: 'absolute', top: -50, left: '30%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(236,72,153,0.2) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ padding: '16px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(236,72,153,0.25)', border: '1.5px solid rgba(236,72,153,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎟</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#fff' }}>تلقا البرمجية</div>
            <div style={{ fontSize: 8.5, color: 'rgba(236,72,153,0.7)', fontWeight: 700, letterSpacing: '0.06em' }}>EVENT TICKET</div>
          </div>
        </div>
        <div style={{ padding: '4px 10px', borderRadius: 99, background: 'rgba(236,72,153,0.18)', border: '1px solid rgba(236,72,153,0.4)', fontSize: 9, fontWeight: 800, color: '#F9A8D4' }}>LIVE</div>
      </div>

      {/* Event name */}
      <div style={{ padding: '6px 18px 14px' }}>
        <div style={{ fontSize: 9, color: 'rgba(249,168,212,0.55)', fontWeight: 700, marginBottom: 3 }}>الفعالية</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1.15 }}>Tech Summit Riyadh 2026</div>
      </div>

      {/* Split row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 0, margin: '0 18px 14px', padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(236,72,153,0.2)' }}>
        <div>
          <div style={{ fontSize: 8, color: 'rgba(249,168,212,0.55)', fontWeight: 700 }}>التاريخ</div>
          <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginTop: 2 }}>الخميس</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>٢٢ مايو</div>
        </div>
        <div style={{ width: 1, background: 'rgba(236,72,153,0.3)', margin: '0 14px' }} />
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 8, color: 'rgba(249,168,212,0.55)', fontWeight: 700 }}>المقعد</div>
          <div style={{ fontSize: 15, fontWeight: 900, color: '#EC4899', marginTop: 2 }}>A-٢١</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>٧:٠٠ م</div>
        </div>
      </div>

      <div style={{ padding: '0 18px 14px', display: 'flex', gap: 8 }}>
        {[{ l:'القاعة', v:'الرياض B' }, { l:'الدخول', v:'رقم A' }].map(f=>(
          <div key={f.l} style={{ flex: 1, padding: '8px 10px', borderRadius: 10, background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)' }}>
            <div style={{ fontSize: 8, color: 'rgba(249,168,212,0.5)', fontWeight: 700 }}>{f.l}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginTop: 1 }}>{f.v}</div>
          </div>
        ))}
      </div>

      <TearLine color="rgba(236,72,153,0.22)" />

      <div style={{ padding: '14px 18px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <QR size={58} color="rgba(249,168,212,0.9)" opacity={1} />
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em', fontWeight: 700 }}>TLQA-EVT-A21-2026</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   5. تأكيد حجز (Appointment)
───────────────────────────────────────────────────────────── */
function AppointmentPass() {
  return (
    <div style={{ width: '100%', background: 'linear-gradient(150deg,#001A12 0%,#064E3B 50%,#001A12 100%)', borderRadius: 20, overflow: 'hidden', fontFamily: 'Cairo,sans-serif', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -30, right: -20, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(16,185,129,0.22) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ padding: '16px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(16,185,129,0.2)', border: '1.5px solid rgba(16,185,129,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📅</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#fff' }}>تلقا للعيادات</div>
            <div style={{ fontSize: 8.5, color: 'rgba(16,185,129,0.7)', fontWeight: 700, letterSpacing: '0.06em' }}>APPOINTMENT</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
          <span style={{ fontSize: 10, fontWeight: 800, color: '#10B981' }}>مؤكد</span>
        </div>
      </div>

      {/* Primary: time */}
      <div style={{ padding: '4px 18px 10px' }}>
        <div style={{ fontSize: 9, color: 'rgba(52,211,153,0.6)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 2 }}>الموعد</div>
        <div style={{ fontSize: 44, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>٣:٠٠ م</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontWeight: 700, marginTop: 4 }}>الأربعاء ٢١ مايو ٢٠٢٦</div>
      </div>

      {/* Doctor card */}
      <div style={{ margin: '6px 18px 12px', padding: '12px 14px', borderRadius: 14, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#10B981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>👨‍⚕️</div>
        <div>
          <div style={{ fontSize: 9, color: 'rgba(52,211,153,0.55)', fontWeight: 700 }}>الطبيب</div>
          <div style={{ fontSize: 14, fontWeight: 900, color: '#fff' }}>د. أحمد الشمري</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>طب عام — عيادة الرياض</div>
        </div>
      </div>

      <div style={{ padding: '0 18px 14px', display: 'flex', gap: 8 }}>
        {[{ l: 'المريض', v: 'خالد السالم' }, { l: 'المدة', v: '٣٠ دقيقة' }].map(f => (
          <div key={f.l} style={{ flex: 1, padding: '8px 10px', borderRadius: 10, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)' }}>
            <div style={{ fontSize: 8, color: 'rgba(52,211,153,0.5)', fontWeight: 700 }}>{f.l}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginTop: 1 }}>{f.v}</div>
          </div>
        ))}
      </div>

      <TearLine color="rgba(16,185,129,0.22)" />

      <div style={{ padding: '14px 18px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <QR size={58} color="rgba(110,231,183,0.9)" opacity={1} />
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em', fontWeight: 700 }}>TLQA-APT-KHL-2026</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   6. بطاقة NFC (Business)
───────────────────────────────────────────────────────────── */
function NFCPass() {
  return (
    <div style={{ width: '100%', background: 'linear-gradient(150deg,#000814 0%,#0C2340 50%,#000814 100%)', borderRadius: 20, overflow: 'hidden', fontFamily: 'Cairo,sans-serif', position: 'relative' }}>
      {/* Holographic shimmer lines */}
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(65deg,transparent 0px,transparent 6px,rgba(6,182,212,0.03) 6px,rgba(6,182,212,0.03) 7px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(6,182,212,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* NFC wave icon top-right */}
      <div style={{ position: 'absolute', top: 16, right: 18 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 4 Q22 4 22 14 Q22 24 14 24" stroke="rgba(6,182,212,0.35)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M14 8 Q19 8 19 14 Q19 20 14 20" stroke="rgba(6,182,212,0.55)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M14 12 Q16 12 16 14 Q16 16 14 16" stroke="rgba(6,182,212,0.85)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="14" cy="14" r="2" fill="#06B6D4" />
        </svg>
      </div>

      {/* Header */}
      <div style={{ padding: '16px 18px 12px', display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#06B6D4,#0284C7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, boxShadow: '0 4px 12px rgba(6,182,212,0.5)' }}>ت</div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 900, color: '#fff' }}>تلقا البرمجية</div>
          <div style={{ fontSize: 8.5, color: 'rgba(6,182,212,0.7)', fontWeight: 700, letterSpacing: '0.06em' }}>NFC BUSINESS CARD</div>
        </div>
      </div>

      {/* Name — big */}
      <div style={{ padding: '8px 18px 12px' }}>
        <div style={{ fontSize: 9, color: 'rgba(103,232,249,0.55)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 3 }}>الحامل</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>عبدالله القحطاني</div>
        <div style={{ fontSize: 12, color: 'rgba(6,182,212,0.8)', fontWeight: 700, marginTop: 6 }}>مدير تنفيذي — تقنية المعلومات</div>
      </div>

      {/* Contact chips */}
      <div style={{ padding: '0 18px 12px', display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {[{ icon: '📱', val: '0551234567' }, { icon: '🌐', val: 'tlqa.tech' }, { icon: '📍', val: 'الرياض' }].map(c => (
          <div key={c.val} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 99, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)', fontSize: 10, color: '#67E8F9', fontWeight: 700 }}>
            <span>{c.icon}</span>{c.val}
          </div>
        ))}
      </div>

      <div style={{ padding: '0 18px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[{ l: 'رقم NFC', v: '•••• 4521' }, { l: 'تاريخ الإصدار', v: 'يناير ٢٠٢٦' }].map(f => (
          <div key={f.l} style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.15)' }}>
            <div style={{ fontSize: 8, color: 'rgba(103,232,249,0.45)', fontWeight: 700 }}>{f.l}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginTop: 1 }}>{f.v}</div>
          </div>
        ))}
      </div>

      <TearLine color="rgba(6,182,212,0.2)" />

      <div style={{ padding: '14px 18px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Barcode width={120} height={36} color="rgba(103,232,249,0.8)" opacity={1} />
          <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.16em', marginTop: 5 }}>TLQA-NFC-4521</div>
        </div>
        <QR size={52} color="rgba(103,232,249,0.85)" opacity={1} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   7. كوبون خصم (Coupon)
───────────────────────────────────────────────────────────── */
function CouponPass() {
  return (
    <div style={{ width: '100%', background: 'linear-gradient(150deg,#0A1400 0%,#1E3A00 50%,#0A1400 100%)', borderRadius: 20, overflow: 'hidden', fontFamily: 'Cairo,sans-serif', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -30, left: '30%', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(132,204,22,0.2) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* Zigzag top */}
      <div style={{ height: 4, background: 'repeating-linear-gradient(90deg,#84CC16 0px,#84CC16 8px,transparent 8px,transparent 16px)' }} />

      {/* Header */}
      <div style={{ padding: '14px 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ fontSize: 26 }}>🏷</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#fff' }}>تلقا البرمجية</div>
            <div style={{ fontSize: 8.5, color: 'rgba(132,204,22,0.7)', fontWeight: 700, letterSpacing: '0.06em' }}>DISCOUNT COUPON</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 8, color: 'rgba(163,230,53,0.5)', fontWeight: 700 }}>الكود</div>
          <div style={{ fontSize: 14, fontWeight: 900, color: '#A3E635', letterSpacing: '0.08em' }}>TLQA30</div>
        </div>
      </div>

      {/* Big % */}
      <div style={{ textAlign: 'center', padding: '4px 18px 8px' }}>
        <div style={{ fontSize: 10, color: 'rgba(163,230,53,0.6)', fontWeight: 700, marginBottom: 4 }}>خصم استثنائي</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', lineHeight: 1 }}>
          <span style={{ fontSize: 68, fontWeight: 900, color: '#A3E635', letterSpacing: '-0.05em', textShadow: '0 0 40px rgba(132,204,22,0.5)' }}>٣٠</span>
          <span style={{ fontSize: 30, fontWeight: 900, color: '#84CC16', marginTop: 10 }}>٪</span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 700 }}>على جميع خدمات تلقا</div>
      </div>

      {/* Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '6px 18px 14px' }}>
        {[{ l: 'صالح حتى', v: '٣١ يوليو ٢٠٢٦' }, { l: 'الاستخدام', v: 'مرة واحدة' }].map(f => (
          <div key={f.l} style={{ padding: '9px 11px', borderRadius: 11, background: 'rgba(132,204,22,0.1)', border: '1px solid rgba(132,204,22,0.22)' }}>
            <div style={{ fontSize: 8, color: 'rgba(163,230,53,0.5)', fontWeight: 700 }}>{f.l}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginTop: 2 }}>{f.v}</div>
          </div>
        ))}
      </div>

      <TearLine color="rgba(132,204,22,0.2)" />

      <div style={{ padding: '14px 18px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Barcode width={160} height={44} color="rgba(163,230,53,0.88)" opacity={1} />
        <div style={{ fontSize: 12, color: 'rgba(163,230,53,0.7)', letterSpacing: '0.25em', fontWeight: 900 }}>TLQA30</div>
        <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', fontWeight: 700 }}>امسح أو اذكر الكود</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   8. تذكرة سفر (Boarding Pass)
───────────────────────────────────────────────────────────── */
function BoardingPass() {
  return (
    <div style={{ width: '100%', background: 'linear-gradient(150deg,#000C20 0%,#0F2557 50%,#000C20 100%)', borderRadius: 20, overflow: 'hidden', fontFamily: 'Cairo,sans-serif', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -30, right: -20, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.2) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* Airline stripe */}
      <div style={{ height: 3, background: 'linear-gradient(90deg,#3B82F6,#60A5FA,#93C5FD,#60A5FA,#3B82F6)' }} />

      {/* Header */}
      <div style={{ padding: '14px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ fontSize: 24 }}>✈️</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#fff' }}>تلقا للسفر</div>
            <div style={{ fontSize: 8.5, color: 'rgba(96,165,250,0.7)', fontWeight: 700, letterSpacing: '0.06em' }}>BOARDING PASS</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 8, color: 'rgba(147,197,253,0.5)', fontWeight: 700 }}>الرحلة</div>
          <div style={{ fontSize: 13, fontWeight: 900, color: '#93C5FD' }}>TL-٢٠٤</div>
        </div>
      </div>

      {/* From → To */}
      <div style={{ padding: '6px 18px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: 'rgba(147,197,253,0.55)', fontWeight: 700 }}>من</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>RUH</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 700 }}>الرياض</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 0 }}>
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
            <line x1="0" y1="10" x2="55" y2="10" stroke="rgba(147,197,253,0.4)" strokeWidth="1.5" strokeDasharray="4 3"/>
            <path d="M50 10 L44 6 L44 14 L50 10Z" fill="rgba(147,197,253,0.6)"/>
          </svg>
          <div style={{ fontSize: 8, color: 'rgba(147,197,253,0.5)', fontWeight: 700, whiteSpace: 'nowrap' }}>ساعتان</div>
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{ fontSize: 9, color: 'rgba(147,197,253,0.55)', fontWeight: 700 }}>إلى</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>JED</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 700 }}>جدة</div>
        </div>
      </div>

      {/* Details grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, margin: '0 18px 14px', padding: '12px 14px', borderRadius: 14, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
        {[{ l: 'البوابة', v: 'B12' }, { l: 'المقعد', v: '14A' }, { l: 'الإقلاع', v: '٩:٣٠ ص' }, { l: 'الصعود', v: '٩:٠٠ ص' }].map(f => (
          <div key={f.l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 7.5, color: 'rgba(147,197,253,0.5)', fontWeight: 700 }}>{f.l}</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', marginTop: 2 }}>{f.v}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 18px 14px' }}>
        <div style={{ padding: '8px 12px', borderRadius: 10, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.18)', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 8, color: 'rgba(147,197,253,0.5)', fontWeight: 700 }}>الراكب</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>فهد العتيبي</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 8, color: 'rgba(147,197,253,0.5)', fontWeight: 700 }}>الدرجة</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#93C5FD' }}>اقتصادية</div>
          </div>
        </div>
      </div>

      <TearLine color="rgba(59,130,246,0.22)" />

      <div style={{ padding: '14px 18px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Barcode width={110} height={36} color="rgba(147,197,253,0.8)" opacity={1} />
          <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.14em', marginTop: 4 }}>TLQA-TL204-14A</div>
        </div>
        <QR size={50} color="rgba(147,197,253,0.88)" opacity={1} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PASS REGISTRY
───────────────────────────────────────────────────────────── */
const PASSES = [
  { id: 'loyalty',     label: 'بطاقة ولاء',    emoji: '☕', accent: '#D97706', accentLight: '#FDE68A', component: LoyaltyPass },
  { id: 'membership',  label: 'عضوية',          emoji: '👑', accent: '#8B5CF6', accentLight: '#C4B5FD', component: MembershipPass },
  { id: 'gift',        label: 'هدية',           emoji: '🎁', accent: '#F43F5E', accentLight: '#FDA4AF', component: GiftPass },
  { id: 'event',       label: 'تذكرة فعالية',   emoji: '🎟', accent: '#A855F7', accentLight: '#D8B4FE', component: EventPass },
  { id: 'appointment', label: 'حجز طبي',        emoji: '📅', accent: '#10B981', accentLight: '#6EE7B7', component: AppointmentPass },
  { id: 'nfc',         label: 'NFC أعمال',      emoji: '📡', accent: '#06B6D4', accentLight: '#67E8F9', component: NFCPass },
  { id: 'coupon',      label: 'كوبون خصم',      emoji: '🏷', accent: '#84CC16', accentLight: '#D9F99D', component: CouponPass },
  { id: 'boarding',    label: 'تذكرة سفر',      emoji: '✈️', accent: '#3B82F6', accentLight: '#93C5FD', component: BoardingPass },
];

/* ─────────────────────────────────────────────────────────────
   iPhone + Wallet UI shell
───────────────────────────────────────────────────────────── */
function WalletPhone({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  const W = 310, H = 670, R = 46, B = 7;
  const pass = PASSES[active];

  return (
    <div style={{ position: 'relative', width: W, margin: '0 auto', flexShrink: 0 }}>
      {/* Ambient glow */}
      <motion.div
        animate={{ background: `radial-gradient(ellipse,${pass.accent}28 0%,transparent 70%)` }}
        transition={{ duration: 0.5 }}
        style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: W + 100, height: H * 0.6, filter: 'blur(50px)', pointerEvents: 'none', borderRadius: '50%' }}
      />
      {/* Phone body */}
      <div style={{ width: W, height: H, borderRadius: R, background: 'linear-gradient(160deg,#2e2e2e 0%,#141414 60%,#1e1e1e 100%)', boxShadow: '0 60px 120px rgba(0,0,0,0.8),inset 0 1px 0 rgba(255,255,255,0.16),0 0 0 1px rgba(255,255,255,0.05)', padding: B, boxSizing: 'border-box' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: R - B + 2, overflow: 'hidden', background: '#1C1C1E', display: 'flex', flexDirection: 'column' }}>

          {/* Dynamic Island */}
          <div style={{ position: 'absolute', top: B + 10, left: '50%', transform: 'translateX(-50%)', width: 96, height: 27, background: '#000', borderRadius: 20, zIndex: 30, boxShadow: '0 0 0 1.5px rgba(255,255,255,0.07)' }} />

          {/* Status bar */}
          <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 22px 6px', zIndex: 20 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'ui-monospace,monospace' }}>9:41</span>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <svg viewBox="0 0 17 12" width="17" height="12" fill="#fff"><rect x="0" y="8" width="3" height="4" rx="0.5"/><rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5"/><rect x="9" y="2.5" width="3" height="9.5" rx="0.5"/><rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.4"/></svg>
              <svg viewBox="0 0 25 12" width="25" height="12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="rgba(255,255,255,0.4)"/><rect x="1.5" y="1.5" width="17" height="9" rx="2.5" fill="white"/><path d="M23 4v4a2 2 0 000-4z" fill="rgba(255,255,255,0.4)"/></svg>
            </div>
          </div>

          {/* Wallet header */}
          <div style={{ padding: '0 20px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', fontFamily: 'Cairo,sans-serif' }}>Wallet</div>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>+</div>
          </div>

          {/* Pass list area */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: '6px 12px 12px' }}>
            {/* Stacked mini-passes behind */}
            {PASSES.map((p, i) => {
              if (i === active) return null;
              const offset = i < active ? i - active : i - active;
              const isAbove = i < active;
              if (Math.abs(offset) > 3) return null;
              return (
                <motion.div key={p.id}
                  onClick={() => setActive(i)}
                  animate={{ top: isAbove ? 8 + Math.abs(offset) * 18 : '100%', opacity: isAbove ? 1 : 0, scale: 1 - Math.abs(offset) * 0.02 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                  style={{ position: 'absolute', left: 12, right: 12, cursor: 'pointer', zIndex: active - Math.abs(offset) }}>
                  <div style={{ height: 36, background: i % 3 === 0 ? '#2a1a08' : i % 3 === 1 ? '#1a0830' : '#001a10', borderRadius: 14, border: `1px solid ${p.accent}30`, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
                    <span style={{ fontSize: 14 }}>{p.emoji}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.7)' }}>{p.label}</span>
                    <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: p.accent }} />
                  </div>
                </motion.div>
              );
            })}

            {/* Active pass — main */}
            <AnimatePresence mode="wait">
              <motion.div key={pass.id}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: active > 0 ? 80 : 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ position: 'absolute', left: 12, right: 12, top: active > 0 ? 0 : 6, zIndex: 20 }}>
                <pass.component />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots nav */}
          <div style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, flexShrink: 0 }}>
            {PASSES.map((_, i) => (
              <motion.div key={i} onClick={() => setActive(i)}
                animate={{ width: i === active ? 18 : 6, background: i === active ? PASSES[active].accent : 'rgba(255,255,255,0.2)' }}
                style={{ height: 6, borderRadius: 99, cursor: 'pointer' }} />
            ))}
          </div>

          {/* Home bar */}
          <div style={{ height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: 80, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.25)' }} />
          </div>
        </div>
      </div>
      {/* Side buttons */}
      <div style={{ position: 'absolute', top: 112, left: -3, width: 3, height: 28, borderRadius: '3px 0 0 3px', background: 'rgba(255,255,255,0.12)' }} />
      <div style={{ position: 'absolute', top: 150, left: -3, width: 3, height: 28, borderRadius: '3px 0 0 3px', background: 'rgba(255,255,255,0.12)' }} />
      <div style={{ position: 'absolute', top: 138, right: -3, width: 3, height: 54, borderRadius: '0 3px 3px 0', background: 'rgba(255,255,255,0.12)' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────────── */
export default function WalletCustomizer() {
  const [active, setActive] = useState(0);
  const pass = PASSES[active];

  return (
    <section id="wallet" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 700, height: 700, top: '-15%', right: '-20%', background: `${pass.accent}08`, animationDelay: '-3s', transition: 'background 0.6s' }} />
      <div className="orb" style={{ width: 500, height: 500, bottom: '0%', left: '-10%', background: `${pass.accent}06`, animationDelay: '-8s', transition: 'background 0.6s' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}>
          <motion.div animate={{ color: pass.accent, borderColor: `${pass.accent}40`, background: `${pass.accent}12` }} transition={{ duration: 0.4 }}
            className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 16 }}>{pass.emoji}</span> Apple Wallet
          </motion.div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            بطاقات{' '}
            <AnimatePresence mode="wait">
              <motion.span key={pass.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                style={{ display: 'inline-block', background: `linear-gradient(135deg,${pass.accent},${pass.accentLight})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {pass.label}
              </motion.span>
            </AnimatePresence>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 16, marginTop: 14, maxWidth: 480, margin: '14px auto 0' }}>
            ٨ أنواع بطاقات مختلفة — تُصمَّم لمشروعك وتُضاف لمحفظة عميلك في لحظة.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="wallet-grid">

          {/* Pass type selector — LEFT on desktop */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', marginBottom: 6 }}>نوع البطاقة</div>
            {PASSES.map((p, i) => (
              <motion.button key={p.id} onClick={() => setActive(i)} whileTap={{ scale: 0.97 }}
                animate={{ background: active === i ? `${p.accent}18` : 'rgba(255,255,255,0.04)', borderColor: active === i ? `${p.accent}55` : 'rgba(255,255,255,0.08)' }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, border: '1px solid', cursor: 'pointer', fontFamily: 'Cairo,sans-serif', textAlign: 'right', transition: 'all 0.2s' }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{p.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: active === i ? '#fff' : 'rgba(255,255,255,0.55)' }}>{p.label}</span>
                {active === i && <motion.div layoutId="dot" style={{ width: 7, height: 7, borderRadius: '50%', background: p.accent, marginRight: 'auto', flexShrink: 0 }} />}
              </motion.button>
            ))}
          </motion.div>

          {/* iPhone — CENTER */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <WalletPhone active={active} setActive={setActive} />
          </motion.div>

          {/* Info + CTA — RIGHT */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>

            {/* Card info */}
            <AnimatePresence mode="wait">
              <motion.div key={pass.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <div className="glass" style={{ padding: 20, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 13, background: `${pass.accent}18`, border: `1.5px solid ${pass.accent}45`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                      {pass.emoji}
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>{pass.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 600, marginTop: 1 }}>بطاقة Apple Wallet مخصصة لمشروعك</div>
                    </div>
                  </div>

                  {/* Features of this pass type */}
                  {[
                    ['تصميم فريد', 'ألوان وشعار مشروعك كاملاً'],
                    ['QR / باركود', 'يُمسح في نقطة البيع'],
                    ['تحديث لحظي', 'الرصيد والنقاط تتغير تلقائياً'],
                    ['إشعارات', 'تذكيرات مباشرة على قفل الشاشة'],
                  ].map(([t, d]) => (
                    <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: `${pass.accent}20`, border: `1px solid ${pass.accent}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, flexShrink: 0, marginTop: 1 }}>✓</div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>{t}</div>
                        <div style={{ fontSize: 10, color: 'var(--text2)', lineHeight: 1.5 }}>{d}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation buttons */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  <motion.button whileTap={{ scale: 0.94 }} onClick={() => setActive((active - 1 + PASSES.length) % PASSES.length)}
                    style={{ flex: 1, padding: '10px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    <ChevronRight size={18} />
                  </motion.button>
                  <div style={{ flex: 3, padding: '10px', borderRadius: 12, background: `${pass.accent}12`, border: `1px solid ${pass.accent}30`, textAlign: 'center', fontSize: 12, fontWeight: 800, color: pass.accent, fontFamily: 'Cairo,sans-serif', transition: 'all 0.3s' }}>
                    {active + 1} / {PASSES.length} — {pass.label}
                  </div>
                  <motion.button whileTap={{ scale: 0.94 }} onClick={() => setActive((active + 1) % PASSES.length)}
                    style={{ flex: 1, padding: '10px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    <ChevronLeft size={18} />
                  </motion.button>
                </div>

                <a href={WA} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 20px', borderRadius: 14, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
                  <MessageCircle size={16} />
                  أبي بطاقة {pass.label} لمشروعي ←
                </a>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        .wallet-grid {
          display: grid;
          grid-template-columns: 200px auto 1fr;
          gap: 40px;
          align-items: center;
        }
        @media (max-width: 1000px) {
          .wallet-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
