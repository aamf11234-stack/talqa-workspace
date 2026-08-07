import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane, Star, Hotel, Ticket, Train, Crown, HeartPulse, Tag,
  MapPin, Bell, Nfc, Zap, ShieldCheck, WifiOff,
  CreditCard, type LucideIcon,
} from 'lucide-react';

const WA_WALLET = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أبي%20أضيف%20Apple%20Wallet%20لمشروعي';

/* ══════════════════════════════════════════════════════════
   PASS CARD DESIGNS — each mimics a real Apple Wallet pass
══════════════════════════════════════════════════════════ */

/* ── All SVG pass-art components are memoised — they never need to re-render ── */

const QR = React.memo(function QR({ size = 44, color = '#fff', opacity = 0.8 }: { size?: number; color?: string; opacity?: number }) {
  const rows = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
  const cs = size / 7;
  return (
    <svg width={size} height={size} style={{ opacity }}>
      {rows.map((row, r) => row.map((v, c) => v ? <rect key={`${r}-${c}`} x={c*cs} y={r*cs} width={cs-.8} height={cs-.8} fill={color} rx={cs*.18} /> : null))}
      {[[4,4],[4,5],[5,4],[5,5],[3,5]].map(([r,c],i) => <rect key={`d${i}`} x={3.5*cs+c*cs*.38} y={3.5*cs+r*cs*.38} width={cs*.38} height={cs*.38} fill={color} rx={1} />)}
    </svg>
  );
});

const Barcode = React.memo(function Barcode({ width = 120, height = 32, color = 'rgba(255,255,255,0.8)' }: { width?: number; height?: number; color?: string }) {
  const bars = [3,1,2,1,4,1,2,3,1,2,1,3,1,2,4,1,1,2,3,1,2,1,2,3,1,4,1,2,1,3];
  let x = 0;
  const totalW = bars.reduce((a, b) => a + b, 0);
  const scale = width / totalW;
  return (
    <svg width={width} height={height}>
      {bars.map((w, i) => i % 2 === 0 ? <rect key={i} x={x * scale} y={0} width={w * scale - 0.5} height={height} fill={color} /> : null).filter(Boolean)}
      {bars.map((w) => { x += w; return null; })}
    </svg>
  );
});

/* ── PDF417 — pre-computed path string (single <path> instead of 228 <rect>s) ── */
const PDF417 = React.memo(function PDF417({ width=240, height=44 }: { width?: number; height?: number }) {
  const rows = 6; const cols = 38;
  const cw = width / cols; const ch = height / rows;
  const cell = (r: number, c: number) => ((r * 7 + c * 13 + r * c * 3) % 5 !== 0);
  // Build one SVG path for all filled cells
  let d = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (cell(r,c)) {
        const x = c * cw; const y = r * ch + 1;
        const w = cw - 0.4; const h = ch - 1.5;
        d += `M${x},${y+0.5}h${w}v${h}h-${w}Z `;
      }
    }
  }
  return (
    <svg width={width} height={height} style={{ display:'block' }}>
      <path d={d} fill="rgba(255,255,255,0.82)" />
    </svg>
  );
});

/* ── 1. BOARDING PASS — portrait / tall format (Apple Wallet PKPassStyleBoardingPass) ── */
function BoardingPass({ active }: { active: boolean }) {
  return (
    <motion.div animate={active ? { y:[0,-5,0] } : {}} transition={{ duration:4.5, repeat:Infinity, ease:'easeInOut' }}
      style={{
        width:290, borderRadius:22,
        background:'linear-gradient(175deg,#06122e 0%,#0b1f4a 55%,#071530 100%)',
        boxShadow:'0 32px 80px rgba(0,50,130,0.55)',
        position:'relative', overflow:'hidden',
        fontFamily:'-apple-system,sans-serif', color:'#fff', direction:'ltr', flexShrink:0,
      }}>

      {/* Sky shimmer at top */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:130,
        background:'radial-gradient(ellipse 80% 120% at 50% -10%,rgba(56,145,255,0.22) 0%,transparent 70%)' }} />

      {/* ── Header ── */}
      <div style={{ padding:'18px 20px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:30, height:30, borderRadius:8, background:'linear-gradient(135deg,#1D4ED8,#3B82F6)',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0011 2a1.5 1.5 0 00-1.5 1.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z"/></svg>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:.5 }}>SAUDI SKIES</div>
            <div style={{ fontSize:7, color:'rgba(255,255,255,0.38)', letterSpacing:2, textTransform:'uppercase' }}>Boarding Pass</div>
          </div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', letterSpacing:1.5 }}>FLIGHT</div>
          <div style={{ fontSize:16, fontWeight:900, color:'#60A5FA', letterSpacing:1 }}>SV 287</div>
        </div>
      </div>

      {/* ── Route ── */}
      <div style={{ padding:'10px 20px 18px', display:'flex', alignItems:'center', gap:0 }}>
        <div>
          <div style={{ fontSize:42, fontWeight:900, letterSpacing:-2, lineHeight:1, color:'#fff' }}>RUH</div>
          <div style={{ fontSize:9.5, color:'rgba(255,255,255,0.4)', marginTop:3 }}>الرياض · King Khalid</div>
        </div>
        <div style={{ flex:1, padding:'0 12px', display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
          <div style={{ fontSize:8.5, color:'rgba(255,255,255,0.28)', letterSpacing:1 }}>2H 45M</div>
          <div style={{ width:'100%', position:'relative', display:'flex', alignItems:'center' }}>
            <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.2)' }} />
            <div style={{ margin:'0 4px' }}>
              <svg width="18" height="10" viewBox="0 0 24 12" fill="rgba(255,255,255,0.55)">
                <path d="M21 6v-.5A1.5 1.5 0 0019.5 4H16L12 0H9l2 4H7L5 2H2l1 4-1 4h3l2-2h4l-2 4h3l4-4h3.5A1.5 1.5 0 0021 6.5V6z"/>
              </svg>
            </div>
            <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.2)' }} />
          </div>
          <div style={{ fontSize:7.5, color:'rgba(255,255,255,0.25)' }}>Direct</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:42, fontWeight:900, letterSpacing:-2, lineHeight:1, color:'#60A5FA' }}>DXB</div>
          <div style={{ fontSize:9.5, color:'rgba(255,255,255,0.4)', marginTop:3 }}>دبي · Al Maktoum</div>
        </div>
      </div>

      {/* ── Passenger info grid ── */}
      <div style={{ padding:'0 20px 16px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
        {[
          ['PASSENGER','عبدالله المطيري'],
          ['DATE','Mon 24 JUL'],
          ['CLASS','Economy'],
        ].map(([l,v],i) => (
          <div key={i}>
            <div style={{ fontSize:6.5, color:'rgba(255,255,255,0.3)', letterSpacing:1.2, textTransform:'uppercase', marginBottom:3 }}>{l}</div>
            <div style={{ fontSize:10, fontWeight:700, lineHeight:1.3 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:'0 20px 18px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
        {[
          ['BOARDING','15:20'],
          ['GATE','B22'],
          ['SEAT','14A'],
        ].map(([l,v],i) => (
          <div key={i}>
            <div style={{ fontSize:6.5, color:'rgba(255,255,255,0.3)', letterSpacing:1.2, textTransform:'uppercase', marginBottom:3 }}>{l}</div>
            <div style={{ fontSize:13, fontWeight:900, color: i===1 ? '#60A5FA' : '#fff' }}>{v}</div>
          </div>
        ))}
      </div>

      {/* ── Tear perforation ── */}
      <div style={{ position:'relative', height:18, display:'flex', alignItems:'center', margin:'0 -1px' }}>
        <div style={{ flex:1, height:1.5, borderTop:'1.5px dashed rgba(255,255,255,0.12)' }} />
        {[-14,14].map((side,i) => (
          <div key={i} style={{ position:'absolute', [i===0?'left':'right']:-8, width:16, height:16, borderRadius:'50%',
            background:'var(--bg2)', border:'1px solid rgba(255,255,255,0.06)' }} />
        ))}
      </div>

      {/* ── Barcode stub ── */}
      <div style={{ padding:'14px 20px 20px', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
        <PDF417 width={248} height={50} />
        <div style={{ fontSize:8, color:'rgba(255,255,255,0.22)', letterSpacing:3, fontFamily:'monospace' }}>
          SV287 RUH→DXB 24JUL
        </div>
      </div>
    </motion.div>
  );
}

/* ── 2. LOYALTY CARD ── */
function LoyaltyCard({ active }: { active: boolean }) {
  const [pts, setPts] = useState(480);
  useEffect(() => {
    if (!active) { setPts(480); return; }
    const t = setInterval(() => setPts(p => p < 1200 ? p + 12 : 480), 160);
    return () => clearInterval(t);
  }, [active]);

  return (
    <motion.div animate={active ? { y:[0,-4,0] } : {}} transition={{ duration:4.5, repeat:Infinity, ease:'easeInOut' }}
      style={{ width:300, height:178, borderRadius:20, background:'linear-gradient(145deg,#1a0a00,#2d1200)',
        boxShadow:'0 24px 60px rgba(180,83,9,0.45)', position:'relative', overflow:'hidden',
        fontFamily:'-apple-system,sans-serif', color:'#fff', direction:'rtl', flexShrink:0 }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2.5, background:'linear-gradient(90deg,#F59E0B,#FCD34D,#F59E0B)' }} />
      <div style={{ position:'absolute', top:-50, right:-40, width:180, height:180, borderRadius:'50%', background:'radial-gradient(circle,rgba(245,158,11,0.2) 0%,transparent 65%)' }} />
      <div style={{ padding:'16px 18px', height:'100%', boxSizing:'border-box', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:7 }}>
            <div style={{ width:28, height:28, borderRadius:7, background:'linear-gradient(135deg,#F59E0B,#D97706)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:900 }}>☕</div>
            <div>
              <div style={{ fontSize:11.5, fontWeight:700 }}>كافيهك</div>
              <div style={{ fontSize:7.5, color:'#FCD34D', letterSpacing:1.5, textTransform:'uppercase', opacity:.8 }}>LOYALTY</div>
            </div>
          </div>
          <div style={{ textAlign:'left' }}>
            <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', letterSpacing:1.5 }}>POINTS</div>
            <div style={{ fontSize:22, fontWeight:900, letterSpacing:-1, color:'#F59E0B' }}>{pts}</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize:7.5, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:1.5, marginBottom:2 }}>CARDHOLDER</div>
          <div style={{ fontSize:15, fontWeight:700 }}>عبدالإله علي</div>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div style={{ display:'flex', gap:14 }}>
            <div><div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>المستوى</div><div style={{ fontSize:11, fontWeight:700 }}>ذهبي</div></div>
            <div><div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>الفروع</div><div style={{ fontSize:11, fontWeight:700 }}>الرياض</div></div>
          </div>
          <QR size={42} color="white" opacity={0.7} />
        </div>
      </div>
    </motion.div>
  );
}

/* ── 3. HOTEL KEY CARD ── */
function HotelCard({ active }: { active: boolean }) {
  return (
    <motion.div animate={active ? { y:[0,-4,0] } : {}} transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
      style={{ width:300, height:178, borderRadius:20, background:'linear-gradient(145deg,#0f1318,#1a2030)',
        boxShadow:'0 24px 60px rgba(30,64,175,0.4)', position:'relative', overflow:'hidden',
        fontFamily:'-apple-system,sans-serif', color:'#fff', direction:'ltr', flexShrink:0 }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2.5, background:'linear-gradient(90deg,#C4B5FD,#818CF8,#C4B5FD)' }} />
      <div style={{ position:'absolute', bottom:-30, right:-30, width:140, height:140, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 65%)' }} />
      {/* NFC icon */}
      <div style={{ position:'absolute', top:14, right:14 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeDasharray="2 2"/>
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4"/>
          <circle cx="12" cy="12" r="1.5" fill="rgba(255,255,255,0.6)"/>
        </svg>
      </div>
      <div style={{ padding:'14px 16px', height:'100%', boxSizing:'border-box', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:28, height:28, borderRadius:7, background:'linear-gradient(135deg,#6366F1,#818CF8)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🏨</div>
          <div>
            <div style={{ fontSize:11.5, fontWeight:700 }}>GRAND PALACE</div>
            <div style={{ fontSize:7.5, color:'#A5B4FC', letterSpacing:1.5, textTransform:'uppercase' }}>HOTEL KEY</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize:8, color:'rgba(255,255,255,0.35)', letterSpacing:1.5, textTransform:'uppercase', marginBottom:2 }}>GUEST</div>
          <div style={{ fontSize:16, fontWeight:700 }}>Sultan Al-Qahtani</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
          {[['ROOM','1204'],['FLOOR','12'],['CHECK-IN','24 JUL'],['CHECK-OUT','28 JUL']].map(([l,v],i)=>(
            <div key={i}>
              <div style={{ fontSize:6.5, color:'rgba(255,255,255,0.35)', letterSpacing:.8, textTransform:'uppercase' }}>{l}</div>
              <div style={{ fontSize:9.5, fontWeight:700 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:3 }}>
          {[...Array(18)].map((_,i) => <div key={i} style={{ flex:1, height:16, borderRadius:1.5, background:i < 12 ? '#6366F1' : 'rgba(255,255,255,0.1)' }} />)}
        </div>
      </div>
    </motion.div>
  );
}

/* ── 4. EVENT TICKET — with header strip image (Apple Wallet PKPassStyleEventTicket) ── */
function EventTicket({ active }: { active: boolean }) {
  return (
    <motion.div animate={active ? { y:[0,-5,0] } : {}} transition={{ duration:4.2, repeat:Infinity, ease:'easeInOut' }}
      style={{
        width:300, borderRadius:22,
        background:'#0e0014',
        boxShadow:'0 32px 80px rgba(168,85,247,0.5)',
        position:'relative', overflow:'hidden',
        fontFamily:'-apple-system,sans-serif', color:'#fff', direction:'ltr', flexShrink:0,
      }}>

      {/* ══ STRIP IMAGE (header artwork — مميز Apple Wallet) ══ */}
      <div style={{
        width:'100%', height:136,
        background:'linear-gradient(160deg,#1a0030 0%,#3b0066 35%,#1e0040 60%,#0a0020 100%)',
        position:'relative', overflow:'hidden',
      }}>
        {/* Spotlight beams */}
        {[30, 110, 190, 260].map((x,i) => (
          <div key={i} style={{
            position:'absolute', top:0, left:x,
            width:40, height:136,
            background:`linear-gradient(180deg,rgba(${i%2?'236,72,153':'168,85,247'},0.28) 0%,transparent 100%)`,
            transform:'skewX(-8deg)',
          }}/>
        ))}
        {/* Glitter dots */}
        {[[20,30],[80,18],[155,50],[230,22],[270,45],[50,70],[190,80],[120,95]].map(([x,y],i)=>(
          <div key={i} style={{
            position:'absolute', left:x, top:y,
            width:i%3===0?4:2.5, height:i%3===0?4:2.5,
            borderRadius:'50%', background:'rgba(255,255,255,0.6)',
            boxShadow:'0 0 6px rgba(255,255,255,0.8)',
          }}/>
        ))}
        {/* Stage floor glow */}
        <div style={{
          position:'absolute', bottom:0, left:0, right:0, height:40,
          background:'linear-gradient(0deg,rgba(168,85,247,0.3) 0%,transparent 100%)',
        }}/>
        {/* Event title overlay */}
        <div style={{ position:'absolute', bottom:12, left:14, right:14 }}>
          <div style={{ fontSize:7, color:'rgba(255,192,255,0.7)', letterSpacing:3, textTransform:'uppercase', marginBottom:3 }}>LIVE EVENT</div>
          <div style={{ fontSize:22, fontWeight:900, letterSpacing:-0.5, lineHeight:1,
            background:'linear-gradient(135deg,#fff,#E879F9)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            NOOR RIYADH
          </div>
        </div>
        {/* Logo badge top-right */}
        <div style={{
          position:'absolute', top:12, right:12,
          width:32, height:32, borderRadius:8,
          background:'linear-gradient(135deg,#A855F7,#EC4899)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        </div>
      </div>

      {/* ══ PASS BODY ══ */}
      <div style={{ padding:'14px 16px 0' }}>
        {/* Venue */}
        <div style={{ fontSize:10, color:'rgba(255,255,255,0.42)', marginBottom:14 }}>
          King Abdullah Park · الرياض
        </div>

        {/* Fields row */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8, marginBottom:16 }}>
          {[['DATE','٢٨ سبت'],['TIME','٨:٠٠ م'],['DOOR','7'],['ZONE','A']].map(([l,v],i)=>(
            <div key={i}>
              <div style={{ fontSize:6.5, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:1, marginBottom:3 }}>{l}</div>
              <div style={{ fontSize:12, fontWeight:800, color: i===3 ? '#E879F9' : '#fff' }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Name */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:6.5, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:1, marginBottom:3 }}>TICKET HOLDER</div>
          <div style={{ fontSize:13, fontWeight:700 }}>محمد العنزي</div>
        </div>
      </div>

      {/* ══ TEAR PERFORATION ══ */}
      <div style={{ position:'relative', height:18, display:'flex', alignItems:'center', margin:'0 -1px' }}>
        <div style={{ flex:1, borderTop:'1.5px dashed rgba(255,255,255,0.1)' }}/>
        {[0,1].map(i=>(
          <div key={i} style={{ position:'absolute', [i===0?'left':'right']:-8, width:16, height:16,
            borderRadius:'50%', background:'var(--bg2)', border:'1px solid rgba(255,255,255,0.06)' }}/>
        ))}
      </div>

      {/* ══ STUB — QR + SEAT ══ */}
      <div style={{ padding:'14px 16px 18px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontSize:6.5, color:'rgba(255,255,255,0.3)', letterSpacing:1, textTransform:'uppercase', marginBottom:4 }}>SEAT</div>
          <div style={{ fontSize:26, fontWeight:900, color:'#E879F9', letterSpacing:-1, lineHeight:1 }}>A14</div>
          <div style={{ fontSize:8, color:'rgba(255,255,255,0.25)', marginTop:4 }}>Row 3 · Front</div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
          <QR size={62} color="white" opacity={0.75}/>
          <div style={{ fontSize:7, color:'rgba(255,255,255,0.2)', letterSpacing:2, fontFamily:'monospace' }}>NR2024-A14</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── 5. TRANSIT / METRO PASS ── */
function TransitCard({ active }: { active: boolean }) {
  return (
    <motion.div animate={active ? { y:[0,-4,0] } : {}} transition={{ duration:4.8, repeat:Infinity, ease:'easeInOut' }}
      style={{ width:300, height:178, borderRadius:20, background:'linear-gradient(145deg,#001a0f,#003320)',
        boxShadow:'0 24px 60px rgba(16,185,129,0.4)', position:'relative', overflow:'hidden',
        fontFamily:'-apple-system,sans-serif', color:'#fff', direction:'rtl', flexShrink:0 }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2.5, background:'linear-gradient(90deg,#10B981,#34D399,#10B981)' }} />
      <div style={{ padding:'14px 18px', height:'100%', boxSizing:'border-box', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:7 }}>
            <div style={{ width:28, height:28, borderRadius:7, background:'linear-gradient(135deg,#059669,#10B981)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>🚇</div>
            <div>
              <div style={{ fontSize:11.5, fontWeight:700 }}>مترو الرياض</div>
              <div style={{ fontSize:7.5, color:'#34D399', letterSpacing:1.5, textTransform:'uppercase', opacity:.8 }}>TRANSIT PASS</div>
            </div>
          </div>
          <div style={{ textAlign:'left' }}>
            <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', letterSpacing:1.5 }}>BALANCE</div>
            <div style={{ fontSize:18, fontWeight:900, color:'#34D399' }}>٤٨ ر</div>
          </div>
        </div>
        {/* Metro line visualization */}
        <div style={{ display:'flex', alignItems:'center', gap:0 }}>
          {['كينج عبدلله','المركز المالي','المنفوحة','الحمراء','الجامعة'].map((s,i,arr) => (
            <div key={i} style={{ display:'flex', alignItems:'center', flex: i < arr.length-1 ? 1 : 0 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background: i===2 ? '#34D399' : 'rgba(255,255,255,0.3)',
                border: i===2 ? '2px solid #10B981' : '1px solid rgba(255,255,255,0.15)',
                boxShadow: i===2 ? '0 0 8px #10B981' : 'none', flexShrink:0 }} />
              {i < arr.length-1 && <div style={{ flex:1, height:1.5, background: i<2 ? '#10B981' : 'rgba(255,255,255,0.15)' }} />}
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize:7, color:'rgba(255,255,255,0.3)', letterSpacing:.5, marginBottom:3 }}>المسار الأزرق ← المنفوحة</div>
          <div style={{ display:'flex', gap:14 }}>
            <div><div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>المالك</div><div style={{ fontSize:11, fontWeight:700 }}>سلطان القحطاني</div></div>
            <div><div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>النوع</div><div style={{ fontSize:11, fontWeight:700 }}>شهري</div></div>
          </div>
        </div>
        <Barcode width={200} height={22} color="rgba(52,211,153,0.6)" />
      </div>
    </motion.div>
  );
}

/* ── 6. VIP MEMBERSHIP ── */
function MembershipCard({ active }: { active: boolean }) {
  return (
    <motion.div animate={active ? { y:[0,-4,0] } : {}} transition={{ duration:5.5, repeat:Infinity, ease:'easeInOut' }}
      style={{ width:300, height:178, borderRadius:20, background:'linear-gradient(145deg,#0f0a00,#1e1400)',
        boxShadow:'0 24px 60px rgba(161,110,14,0.4)', position:'relative', overflow:'hidden',
        fontFamily:'-apple-system,sans-serif', color:'#fff', direction:'ltr', flexShrink:0 }}>
      {/* Gold shimmer lines */}
      {[40,80,120].map((y,i) => (
        <div key={i} style={{ position:'absolute', top:y, left:0, right:0, height:.5,
          background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.15),transparent)' }} />
      ))}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2.5, background:'linear-gradient(90deg,#92400E,#D4AF37,#92400E)' }} />
      <div style={{ padding:'14px 16px', height:'100%', boxSizing:'border-box', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontSize:7.5, color:'rgba(212,175,55,0.7)', letterSpacing:3, textTransform:'uppercase', marginBottom:2 }}>PLATINUM MEMBER</div>
            <div style={{ fontSize:13, fontWeight:800, letterSpacing:.5 }}>ROYAL CLUB</div>
          </div>
          <div style={{ fontSize:22 }}>👑</div>
        </div>
        <div>
          <div style={{ fontSize:14, fontWeight:300, letterSpacing:3, color:'rgba(212,175,55,0.9)' }}>
            •••• •••• •••• 4721
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <div style={{ fontSize:6.5, color:'rgba(255,255,255,0.35)', letterSpacing:1 }}>MEMBER NAME</div>
            <div style={{ fontSize:11, fontWeight:700 }}>SARAH AL-OTAIBI</div>
          </div>
          <div>
            <div style={{ fontSize:6.5, color:'rgba(255,255,255,0.35)', letterSpacing:1 }}>TIER</div>
            <div style={{ fontSize:11, fontWeight:700, color:'#D4AF37' }}>PLATINUM</div>
          </div>
          <div>
            <div style={{ fontSize:6.5, color:'rgba(255,255,255,0.35)', letterSpacing:1 }}>VALID</div>
            <div style={{ fontSize:11, fontWeight:700 }}>12/27</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── 7. MEDICAL APPOINTMENT ── */
function MedicalCard({ active }: { active: boolean }) {
  return (
    <motion.div animate={active ? { y:[0,-4,0] } : {}} transition={{ duration:4.3, repeat:Infinity, ease:'easeInOut' }}
      style={{ width:300, height:178, borderRadius:20, background:'linear-gradient(145deg,#001828,#002a42)',
        boxShadow:'0 24px 60px rgba(14,165,233,0.4)', position:'relative', overflow:'hidden',
        fontFamily:'-apple-system,sans-serif', color:'#fff', direction:'rtl', flexShrink:0 }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2.5, background:'linear-gradient(90deg,#0EA5E9,#38BDF8,#0EA5E9)' }} />
      <div style={{ padding:'14px 18px', height:'100%', boxSizing:'border-box', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:7 }}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#0284C7,#0EA5E9)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>🏥</div>
            <div>
              <div style={{ fontSize:11, fontWeight:700 }}>مركز تلقا الطبي</div>
              <div style={{ fontSize:7.5, color:'#38BDF8', letterSpacing:1.5, textTransform:'uppercase', opacity:.8 }}>APPOINTMENT</div>
            </div>
          </div>
          <div style={{ textAlign:'left', fontSize:20, color:'#38BDF8' }}>+</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          <div>
            <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:2 }}>المريض</div>
            <div style={{ fontSize:12, fontWeight:700 }}>نورة السيف</div>
          </div>
          <div>
            <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:2 }}>الطبيب</div>
            <div style={{ fontSize:12, fontWeight:700 }}>د. خالد العمري</div>
          </div>
          <div>
            <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:2 }}>التاريخ</div>
            <div style={{ fontSize:12, fontWeight:700, color:'#38BDF8' }}>الثلاثاء ٢٩ يوليو</div>
          </div>
          <div>
            <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:2 }}>الوقت</div>
            <div style={{ fontSize:12, fontWeight:700, color:'#38BDF8' }}>١٠:٣٠ ص</div>
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:2 }}>التخصص</div>
            <div style={{ fontSize:11, fontWeight:700 }}>باطنية · عيادة ٣</div>
          </div>
          <QR size={40} color="white" opacity={0.65} />
        </div>
      </div>
    </motion.div>
  );
}

/* ── 8. COUPON / OFFER ── */
function CouponCard({ active }: { active: boolean }) {
  return (
    <motion.div animate={active ? { y:[0,-4,0] } : {}} transition={{ duration:3.8, repeat:Infinity, ease:'easeInOut' }}
      style={{ width:300, height:178, borderRadius:20, background:'linear-gradient(145deg,#1e0010,#320020)',
        boxShadow:'0 24px 60px rgba(236,72,153,0.4)', position:'relative', overflow:'hidden',
        fontFamily:'-apple-system,sans-serif', color:'#fff', direction:'rtl', flexShrink:0 }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2.5, background:'linear-gradient(90deg,#EC4899,#F472B6,#EC4899)' }} />
      {/* Confetti dots */}
      {[[20,30,'#EC4899'],[240,20,'#F472B6'],[150,60,'#C026D3'],[60,80,'#A21CAF'],[280,70,'#EC4899']].map(([x,y,c],i) => (
        <div key={i} style={{ position:'absolute', left:x as number, top:y as number, width:5, height:5, borderRadius:'50%', background:c as string, opacity:.3 }} />
      ))}
      <div style={{ position:'absolute', right:105, top:0, bottom:0, borderLeft:'1.5px dashed rgba(255,255,255,0.12)' }} />
      <div style={{ padding:'14px 16px', height:'100%', boxSizing:'border-box', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize:7.5, color:'#F472B6', letterSpacing:2, textTransform:'uppercase' }}>EXCLUSIVE OFFER</div>
          <div style={{ display:'flex', alignItems:'baseline', gap:5, marginTop:4 }}>
            <div style={{ fontSize:44, fontWeight:900, lineHeight:1, color:'#EC4899', letterSpacing:-2 }}>٣٠</div>
            <div style={{ fontSize:18, fontWeight:700, color:'rgba(255,255,255,0.7)' }}>٪ خصم</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.7)' }}>مشروبات الصيف</div>
          <div style={{ fontSize:8, color:'rgba(255,255,255,0.35)', marginTop:2 }}>صالح حتى ٣١ / ٨ / ٢٠٢٥</div>
        </div>
      </div>
      {/* Right stub */}
      <div style={{ position:'absolute', top:0, right:0, width:100, height:'100%', padding:'12px 10px', boxSizing:'border-box',
        display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:7, color:'rgba(255,255,255,0.3)' }}>CODE</div>
          <div style={{ fontSize:11, fontWeight:900, color:'#F472B6', letterSpacing:1 }}>TLGA30</div>
        </div>
        <QR size={48} color="white" opacity={0.65} />
        <div style={{ fontSize:6.5, color:'rgba(255,255,255,0.2)' }}>مرة واحدة</div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   ALL PASSES DATA
══════════════════════════════════════════════════════════ */
const PASSES: {
  id: string; label: string; Icon: LucideIcon;
  appleType: string; industry: string;
  component: (p: { active: boolean }) => React.ReactElement;
}[] = [
  { id:'boarding',   label:'تذكرة طيران',  Icon: Plane,      appleType:'Boarding Pass', industry:'شركات الطيران',       component: BoardingPass   },
  { id:'loyalty',    label:'ولاء ونقاط',   Icon: Star,       appleType:'Store Card',    industry:'المطاعم والكافيهات',  component: LoyaltyCard    },
  { id:'hotel',      label:'مفتاح فندق',   Icon: Hotel,      appleType:'Generic Pass',  industry:'الفنادق',              component: HotelCard      },
  { id:'event',      label:'تذكرة فعالية', Icon: Ticket,     appleType:'Event Ticket',  industry:'الفعاليات والحفلات',  component: EventTicket    },
  { id:'transit',    label:'تصريح مترو',   Icon: Train,      appleType:'Transit Pass',  industry:'النقل العام',          component: TransitCard    },
  { id:'membership', label:'عضوية VIP',    Icon: Crown,      appleType:'Store Card',    industry:'النوادي والصالات',    component: MembershipCard },
  { id:'medical',    label:'موعد طبي',     Icon: HeartPulse, appleType:'Generic Pass',  industry:'العيادات والمستشفيات',component: MedicalCard    },
  { id:'coupon',     label:'كوبون خصم',    Icon: Tag,        appleType:'Coupon',        industry:'التجارة الإلكترونية', component: CouponCard     },
];

const TECH_FEATURES: { Icon: LucideIcon; color: string; title: string; desc: string }[] = [
  { Icon: MapPin,     color:'#34D399', title:'Location Awareness',    desc:'تنبيه الزبون تلقائياً لما يقرب الفرع' },
  { Icon: Bell,       color:'#60A5FA', title:'Push Notifications',    desc:'إشعار مباشر لكل حاملي البطاقة' },
  { Icon: Nfc,        color:'#A78BFA', title:'NFC & Contactless',     desc:'لمس لفتح الباب أو إتمام الدفع' },
  { Icon: Zap,        color:'#FCD34D', title:'OTA Updates',           desc:'تحديث البيانات من بُعد بدون إجراء' },
  { Icon: ShieldCheck,color:'#F9A8D4', title:'Apple Signed & Secure', desc:'توقيع رسمي بشهادة Apple Developer' },
  { Icon: WifiOff,    color:'#FB923C', title:'No App Required',       desc:'يشتغل مباشرة من iOS بدون App Store' },
];

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════ */
export default function WalletShowcase() {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(() => setActive(a => (a + 1) % PASSES.length), 3200);
    return () => clearInterval(t);
  }, [autoPlay]);

  const ActivePass = PASSES[active]!.component;

  return (
    <section id="wallet" style={{ padding:'clamp(80px,9vw,130px) 0', background:'var(--bg2)', position:'relative', overflow:'hidden' }}>
      <div className="orb" style={{ width:600, height:600, top:'0%', right:'-10%', background:'rgba(139,92,246,0.06)', animationDelay:'-2s' }} />
      <div className="orb" style={{ width:500, height:500, bottom:'0%', left:'-8%', background:'rgba(6,182,212,0.05)', animationDelay:'-9s' }} />

      <div style={{ maxWidth:1160, margin:'0 auto', padding:'0 24px', position:'relative' }}>

        {/* ── Header ── */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:.7 }} style={{ textAlign:'center', marginBottom:52 }}>
          <div className="section-label" style={{ color:'#8B5CF6', borderColor:'rgba(139,92,246,0.3)', background:'rgba(139,92,246,0.08)', marginBottom:16,
            display:'inline-flex', alignItems:'center', gap:7 }}>
            <CreditCard size={13} strokeWidth={2} /> Apple & Google Wallet
          </div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(2rem,4.5vw,3.4rem)', letterSpacing:'-0.035em', lineHeight:1.1, marginBottom:16 }}>
            من الطيران إلى العيادات —{' '}
            <span style={{ background:'linear-gradient(135deg,#8B5CF6,#06B6D4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              كل قطاع ببطاقة
            </span>
          </h2>
          <p style={{ fontSize:16.5, color:'var(--text2)', maxWidth:520, margin:'0 auto', lineHeight:1.7 }}>
            Apple Wallet لـ iPhone و Google Wallet لـ Android — بطاقة رقمية واحدة تصل لكل عملائك، مهما كان جوالهم. نبنيها لك.
          </p>
        </motion.div>

        {/* ── Pass type selector ── */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:44, overflowX:'auto', paddingBottom:4 }}>
          <div style={{ display:'flex', gap:5, padding:5, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, flexShrink:0 }}>
            {PASSES.map((p, i) => (
              <button key={p.id} onClick={() => { setActive(i); setAutoPlay(false); }}
                style={{ display:'flex', alignItems:'center', gap:5, padding:'8px 14px', borderRadius:9, border:'none', cursor:'pointer',
                  fontFamily:'Cairo,sans-serif', fontWeight:700, fontSize:12, transition:'all 0.18s', whiteSpace:'nowrap',
                  background: active===i ? 'rgba(139,92,246,0.85)' : 'transparent',
                  color: active===i ? '#fff' : 'rgba(255,255,255,0.38)',
                  boxShadow: active===i ? '0 2px 14px rgba(139,92,246,0.3)' : 'none',
                }}>
                 <p.Icon size={13} strokeWidth={1.75} style={{ flexShrink:0 }} />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main: featured pass + side grid ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'flex-start', marginBottom:56 }}>

          {/* Left: active pass hero */}
          <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            transition={{ duration:.7 }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20 }}>

            {/* Industry badge */}
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}
                transition={{ duration:.25 }}
                style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'6px 14px', borderRadius:20,
                  background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
                  fontSize:11.5, fontWeight:700, color:'rgba(255,255,255,0.6)', direction:'rtl' }}>
                {(() => { const P = PASSES[active]!; return <P.Icon size={13} strokeWidth={1.75} />; })()}
                {PASSES[active]!.industry}
                <span style={{ fontSize:9, fontWeight:600, color:'rgba(255,255,255,0.3)', padding:'2px 7px',
                  borderRadius:8, background:'rgba(255,255,255,0.07)', marginRight:2 }}>
                  {PASSES[active]!.appleType}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Pass card */}
            <div style={{ position:'relative' }}>
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={{ opacity:0, y:16, scale:.96 }}
                  animate={{ opacity:1, y:0, scale:1 }}
                  exit={{ opacity:0, y:-12, scale:.96 }}
                  transition={{ duration:.35, ease:[.22,1,.36,1] }}>
                  <ActivePass active={true} />
                </motion.div>
              </AnimatePresence>
              {/* Glow */}
              <div style={{ position:'absolute', inset:-20, zIndex:-1, borderRadius:40,
                background:`radial-gradient(ellipse at center,rgba(139,92,246,0.2) 0%,transparent 65%)`, filter:'blur(16px)' }} />
            </div>

            {/* Auto-play dots */}
            <div style={{ display:'flex', gap:5 }}>
              {PASSES.map((_, i) => (
                <button key={i} onClick={() => { setActive(i); setAutoPlay(false); }}
                  style={{ width: active===i ? 18 : 6, height:6, borderRadius:3, border:'none', cursor:'pointer', padding:0,
                    background: active===i ? '#8B5CF6' : 'rgba(255,255,255,0.18)', transition:'all 0.25s' }} />
              ))}
            </div>
          </motion.div>

          {/* Right: all passes mini grid */}
          <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            transition={{ duration:.7, delay:.1 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.3)', letterSpacing:1.5, textTransform:'uppercase', marginBottom:16, direction:'rtl' }}>
              جميع أنواع البطاقات
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {PASSES.map((p, i) => (
                <motion.button key={p.id} onClick={() => { setActive(i); setAutoPlay(false); }}
                  whileHover={{ y:-2 }} whileTap={{ scale:.97 }}
                  style={{ padding:'14px 16px', borderRadius:12, border:`1px solid ${active===i ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.07)'}`,
                    background: active===i ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)',
                    cursor:'pointer', textAlign:'right', direction:'rtl', transition:'all 0.18s',
                    boxShadow: active===i ? '0 0 0 1px rgba(139,92,246,0.25)' : 'none',
                  }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
                    <div style={{ width:28, height:28, borderRadius:8, background:'rgba(139,92,246,0.15)',
                      border:'1px solid rgba(139,92,246,0.25)', display:'flex', alignItems:'center', justifyContent:'center',
                      color: active===i ? '#A78BFA' : 'rgba(255,255,255,0.4)', flexShrink:0 }}>
                      <p.Icon size={14} strokeWidth={1.75} />
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, fontWeight:800, color: active===i ? '#fff' : 'rgba(255,255,255,0.7)' }}>{p.label}</div>
                      <div style={{ fontSize:9, color:'rgba(255,255,255,0.28)', marginTop:1 }}>{p.appleType}</div>
                    </div>
                  </div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)', lineHeight:1.4 }}>{p.industry}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Tech features ── */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:.6 }}>
          <div style={{ textAlign:'center', marginBottom:24 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.3)', letterSpacing:2, textTransform:'uppercase' }}>
              التقنيات المدمجة
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:10, marginBottom:44 }}>
            {TECH_FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:.06*i }}
                className="glass" style={{ padding:'16px 18px', borderRadius:12, direction:'rtl' }}>
                <div style={{ marginBottom:10 }}>
                  <f.Icon size={20} strokeWidth={1.75} style={{ color:f.color }} />
                </div>
                <div style={{ fontSize:11.5, fontWeight:800, color:'#fff', marginBottom:4 }}>{f.title}</div>
                <div style={{ fontSize:11, color:'var(--text2)', lineHeight:1.5 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ textAlign:'center' }}>
          <div style={{ marginBottom:16 }}>
            <a href={`${typeof window!=='undefined' ? window.location.origin : ''}/api/wallet/tlqa`}
              download="talqa-tech.pkpass"
              style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 36px', borderRadius:14,
                background:'#000', color:'#fff', fontFamily:'-apple-system,Cairo,sans-serif', fontSize:15, fontWeight:700,
                textDecoration:'none', boxShadow:'0 8px 28px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
                transition:'transform 0.18s, box-shadow 0.18s', marginLeft:12,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform='none'; }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 13l4 4 4-4"/></svg>
              جرّب بطاقة تلقا تك
            </a>
            <a href={WA_WALLET} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 36px', borderRadius:14,
                background:'linear-gradient(135deg,#7C3AED,#5B21B6)', color:'#fff',
                fontFamily:'Cairo,sans-serif', fontSize:15, fontWeight:900, textDecoration:'none',
                boxShadow:'0 12px 36px rgba(109,40,217,0.35)', transition:'transform 0.18s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform='none'; }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              أضف Wallet لمشروعك
            </a>
          </div>
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:18, flexWrap:'wrap' }}>
            {['موقّع رسمياً من Apple','٨ أنواع بطاقات','تسليم خلال ٢٤ ساعة'].map((t,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'rgba(255,255,255,0.28)' }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t}
              </div>
            ))}
          </div>
        </motion.div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="/talqa-tech/wallet"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.transform='none'; }}>
            تعرف على Apple Wallet ←
          </a>
        </div>

      </div>
    </section>
  );
}
