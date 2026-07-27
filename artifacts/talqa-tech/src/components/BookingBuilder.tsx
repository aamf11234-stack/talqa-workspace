import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WA_BASE = 'https://wa.me/966551378531?text=';

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const SECTORS = [
  { icon:'🏥', name:'عيادة',          services:['فحص عام','أسنان','جلدية','عظام','نفسية'] },
  { icon:'💇', name:'صالون',          services:['قص شعر','صبغة','كيراتين','مكياج','جلسة بشرة'] },
  { icon:'🏋️', name:'نادي رياضي',   services:['تدريب شخصي','يوغا','كروسفيت','سباحة','بيلاتس'] },
  { icon:'☕', name:'كافيه',          services:['قهوة ضيافة','طاولة VIP','حفلة خاصة','كورس تحضير','جلسة work'] },
  { icon:'🏨', name:'فندق',           services:['غرفة عادية','جناح','قاعة اجتماع','سبا','إفطار'] },
  { icon:'📚', name:'مركز تعليمي',   services:['محاضرة خاصة','كورس جماعي','امتحان','استشارة','ورشة'] },
  { icon:'🐾', name:'عيادة حيوانات', services:['فحص دوري','تطعيم','تجميل','عملية','إقامة'] },
  { icon:'🎨', name:'استوديو',       services:['تصوير فردي','تصوير عائلي','فيديو','تصميم','طباعة'] },
];

const COLORS = [
  { name:'أزرق بنفسجي', hex:'#7C3AED' },
  { name:'أخضر زمردي',  hex:'#059669' },
  { name:'بني ذهبي',    hex:'#D97706' },
  { name:'وردي',        hex:'#DB2777' },
  { name:'سماوي',       hex:'#0891B2' },
  { name:'برتقالي',     hex:'#EA580C' },
];

// ─────────────────────────────────────────────────────────────
// PHONE BOOKING MOCKUP
// ─────────────────────────────────────────────────────────────
function PhoneMockup({ bizName, color, sector, activeService }:
  { bizName:string; color:string; sector:typeof SECTORS[0]; activeService:string }) {

  const [tab, setTab] = useState<'book'|'confirm'>('book');
  const [selected, setSelected] = useState<string|null>(null);
  const [timeSlot, setTimeSlot] = useState<string|null>(null);
  const slots = ['٩:٠٠','١٠:٠٠','١١:٠٠','٢:٠٠','٣:٠٠','٤:٠٠'];
  const takenSlots = ['١٠:٠٠','٣:٠٠'];

  useEffect(() => { setSelected(null); setTimeSlot(null); setTab('book'); }, [sector]);

  const hexToRgb = (h:string) => {
    const r = parseInt(h.slice(1,3),16), g=parseInt(h.slice(3,5),16), b=parseInt(h.slice(5,7),16);
    return `${r},${g},${b}`;
  };

  return (
    <div style={{ position:'relative', width:220, height:440, flexShrink:0 }}>
      {/* Phone shell */}
      <div style={{ position:'absolute', inset:0, borderRadius:36, background:'#0a0a12',
        border:'2px solid rgba(255,255,255,0.12)',
        boxShadow:`0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), inset 0 0 0 1px rgba(255,255,255,0.05)` }}>
        {/* Notch */}
        <div style={{ position:'absolute', top:10, left:'50%', transform:'translateX(-50%)',
          width:60, height:18, borderRadius:10, background:'#000', zIndex:20 }}/>
        {/* Screen */}
        <div style={{ position:'absolute', inset:4, borderRadius:32, overflow:'hidden', background:'#0f0f1a' }}>

          {/* Status bar */}
          <div style={{ height:36, background:`rgba(${hexToRgb(color)},0.15)`,
            display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 16px 6px',
            fontSize:9, color:'rgba(255,255,255,0.6)', fontWeight:600 }}>
            <span>٩:٤١</span>
            <span>●●●</span>
          </div>

          {/* Header */}
          <div style={{ padding:'10px 14px 8px', background:`rgba(${hexToRgb(color)},0.1)`,
            borderBottom:`1px solid rgba(${hexToRgb(color)},0.2)` }}>
            <div style={{ fontSize:10, color:`rgba(${hexToRgb(color)},0.8)`, fontWeight:700, marginBottom:2 }}>
              {sector.icon} {sector.name}
            </div>
            <div style={{ fontSize:14, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif',
              whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
              {bizName || 'اسم مشروعك'}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {tab === 'book' ? (
              <motion.div key="book" initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-10 }}
                style={{ padding:'10px 12px', overflowY:'auto', height:'calc(100% - 100px)' }}>

                {/* Service picker */}
                <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)', fontWeight:700, marginBottom:6 }}>اختر الخدمة</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:12 }}>
                  {sector.services.slice(0,4).map(s => (
                    <button key={s} onClick={() => setSelected(s)}
                      style={{ padding:'5px 9px', borderRadius:8, border:`1px solid ${selected===s?color:'rgba(255,255,255,0.12)'}`,
                        background:selected===s?`rgba(${hexToRgb(color)},0.2)`:'rgba(255,255,255,0.04)',
                        color:selected===s?'#fff':'rgba(255,255,255,0.5)', fontSize:9, cursor:'pointer',
                        fontFamily:'Cairo,sans-serif', fontWeight:700, transition:'all 0.15s' }}>
                      {s}
                    </button>
                  ))}
                </div>

                {/* Time slots */}
                <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)', fontWeight:700, marginBottom:6 }}>الأوقات المتاحة — الأحد ٢٣ يوليو</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:5 }}>
                  {slots.map(sl => {
                    const taken = takenSlots.includes(sl);
                    return (
                      <button key={sl} disabled={taken} onClick={() => setTimeSlot(sl)}
                        style={{ padding:'6px 4px', borderRadius:8, textAlign:'center',
                          border:`1px solid ${timeSlot===sl?color:taken?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.12)'}`,
                          background: taken?'rgba(255,255,255,0.02)': timeSlot===sl?`rgba(${hexToRgb(color)},0.22)`:'rgba(255,255,255,0.04)',
                          color: taken?'rgba(255,255,255,0.18)': timeSlot===sl?'#fff':'rgba(255,255,255,0.6)',
                          fontSize:10, fontWeight:800, cursor:taken?'default':'pointer',
                          textDecoration:taken?'line-through':undefined, fontFamily:'monospace',
                          transition:'all 0.15s' }}>
                        {sl}
                        {taken && <div style={{ fontSize:7, marginTop:1, color:'rgba(255,0,0,0.4)' }}>محجوز</div>}
                      </button>
                    );
                  })}
                </div>

                {/* Confirm button */}
                <AnimatePresence>
                  {selected && timeSlot && (
                    <motion.button initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}
                      onClick={() => setTab('confirm')}
                      style={{ width:'100%', marginTop:14, padding:'10px', borderRadius:12,
                        background:`linear-gradient(135deg,${color},${color}aa)`,
                        border:'none', color:'#fff', fontFamily:'Cairo,sans-serif',
                        fontSize:11, fontWeight:900, cursor:'pointer',
                        boxShadow:`0 6px 20px rgba(${hexToRgb(color)},0.4)` }}>
                      تأكيد الحجز ←
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div key="confirm" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                style={{ padding:'20px 14px', display:'flex', flexDirection:'column', alignItems:'center',
                  height:'calc(100% - 100px)', justifyContent:'center', gap:10 }}>
                <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', stiffness:300, delay:0.1 }}
                  style={{ width:52, height:52, borderRadius:'50%', background:`rgba(${hexToRgb(color)},0.2)`,
                    border:`2px solid ${color}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>✓</motion.div>
                <div style={{ fontSize:14, fontWeight:900, color:'#fff', textAlign:'center', fontFamily:'Cairo,sans-serif' }}>تم الحجز!</div>
                <div style={{ padding:'12px', borderRadius:12, background:`rgba(${hexToRgb(color)},0.08)`,
                  border:`1px solid rgba(${hexToRgb(color)},0.2)`, width:'100%' }}>
                  {[['الخدمة',selected||''],['الوقت',timeSlot||''],['التاريخ','الأحد ٢٣ يوليو'],['المكان',bizName||'مشروعك']].map(([l,v])=>(
                    <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'4px 0',
                      borderBottom:'1px solid rgba(255,255,255,0.05)', fontSize:9 }}>
                      <span style={{ color:'rgba(255,255,255,0.4)', fontWeight:600 }}>{l}</span>
                      <span style={{ color:'#fff', fontWeight:800, fontFamily:'Cairo,sans-serif' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize:9, color:`rgba(${hexToRgb(color)},0.8)`, textAlign:'center', fontWeight:700 }}>
                  📱 تم إرسال تأكيد على واتساب
                </div>
                <button onClick={() => { setTab('book'); setSelected(null); setTimeSlot(null); }}
                  style={{ marginTop:4, padding:'8px 18px', borderRadius:10, background:'rgba(255,255,255,0.06)',
                    border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)',
                    fontSize:9, cursor:'pointer', fontFamily:'Cairo,sans-serif', fontWeight:700 }}>
                  حجز جديد
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom nav */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:44,
            background:'rgba(0,0,0,0.8)', backdropFilter:'blur(10px)',
            borderTop:'1px solid rgba(255,255,255,0.07)',
            display:'flex', alignItems:'center', justifyContent:'space-around' }}>
            {[['📅','احجز'],['🕐','مواعيدي'],['👤','حسابي']].map(([ic,lb])=>(
              <div key={lb} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                <span style={{ fontSize:14 }}>{ic}</span>
                <span style={{ fontSize:7, color:'rgba(255,255,255,0.4)', fontWeight:600, fontFamily:'Cairo,sans-serif' }}>{lb}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD MOCKUP
// ─────────────────────────────────────────────────────────────
function DashboardMockup({ bizName, color, sector }:
  { bizName:string; color:string; sector:typeof SECTORS[0] }) {

  const hexToRgb = (h:string) => {
    const r = parseInt(h.slice(1,3),16), g=parseInt(h.slice(3,5),16), b=parseInt(h.slice(5,7),16);
    return `${r},${g},${b}`;
  };

  const todaySlots = [
    { time:'٩:٠٠', name:'أحمد المطيري',  svc:sector.services[0], done:true  },
    { time:'١٠:٠٠',name:'سارة العتيبي',  svc:sector.services[1]||sector.services[0], done:true  },
    { time:'١١:٠٠',name:'محمد الشمري',   svc:sector.services[2]||sector.services[0], done:false },
    { time:'٢:٠٠', name:'نورة السويلم',  svc:sector.services[0], done:false },
    { time:'٣:٠٠', name:'فهد الدوسري',   svc:sector.services[1]||sector.services[0], done:false },
  ];

  const bars = [60,80,45,90,70,55,85];
  const days = ['س','ح','ن','ث','ر','خ','ج'];

  return (
    <div style={{ flex:1, borderRadius:16, overflow:'hidden', background:'#0a0a14',
      border:'1px solid rgba(255,255,255,0.08)',
      boxShadow:`0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)` }}>

      {/* Titlebar */}
      <div style={{ height:32, background:'#111120', borderBottom:'1px solid rgba(255,255,255,0.06)',
        display:'flex', alignItems:'center', gap:7, padding:'0 14px' }}>
        {['#EF4444','#F59E0B','#10B981'].map((c,i) => (
          <div key={i} style={{ width:10, height:10, borderRadius:'50%', background:c }}/>
        ))}
        <div style={{ flex:1, textAlign:'center', fontSize:9.5, color:'rgba(255,255,255,0.25)', fontWeight:600 }}>
          {bizName || 'مشروعك'} · لوحة تحكم الحجوزات
        </div>
      </div>

      <div style={{ display:'flex', height:'calc(100% - 32px)', overflow:'hidden' }}>
        {/* Sidebar */}
        <div style={{ width:46, background:'#0d0d1c', borderLeft:'1px solid rgba(255,255,255,0.05)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:12, paddingTop:14 }}>
          {[['📊','إحصائيات'],['📅','الحجوزات'],['👥','العملاء'],['⚙️','الإعدادات']].map(([ic,lb],i) => (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3,
              padding:'8px 4px', borderRadius:8, width:38, cursor:'pointer',
              background:i===1?`rgba(${hexToRgb(color)},0.15)`:'transparent' }}>
              <span style={{ fontSize:14 }}>{ic}</span>
              <span style={{ fontSize:6.5, color:i===1?color:'rgba(255,255,255,0.3)', fontWeight:700,
                fontFamily:'Cairo,sans-serif', textAlign:'center', lineHeight:1.2 }}>{lb}</span>
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex:1, padding:'12px 10px', display:'flex', flexDirection:'column', gap:10, overflowY:'auto' }}>

          {/* KPI row */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:7 }}>
            {[
              { ic:'📅', n:'٢٤',   lb:'حجز اليوم',   trend:'+٣' },
              { ic:'✅', n:'١٨',   lb:'مكتمل',        trend:'+٢' },
              { ic:'⏳', n:'٦',    lb:'قادم',         trend:'' },
              { ic:'⭐', n:'٤.٨',  lb:'التقييم',      trend:'+٠.٢' },
            ].map((k,i) => (
              <div key={i} style={{ padding:'8px 7px', borderRadius:10, background:`rgba(${hexToRgb(color)},0.06)`,
                border:`1px solid rgba(${hexToRgb(color)},0.12)` }}>
                <div style={{ fontSize:13 }}>{k.ic}</div>
                <div style={{ fontSize:16, fontWeight:900, color:'#fff', letterSpacing:-0.5, lineHeight:1.1 }}>{k.n}</div>
                <div style={{ fontSize:7.5, color:'rgba(255,255,255,0.4)', marginTop:1, fontFamily:'Cairo,sans-serif' }}>{k.lb}</div>
                {k.trend && <div style={{ fontSize:8, color:color, fontWeight:700, marginTop:2 }}>{k.trend}</div>}
              </div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {/* Chart */}
            <div style={{ padding:'10px', borderRadius:10, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize:8, fontWeight:700, color:'rgba(255,255,255,0.5)', marginBottom:8, fontFamily:'Cairo,sans-serif' }}>الحجوزات — هذا الأسبوع</div>
              <div style={{ display:'flex', alignItems:'flex-end', gap:4, height:44 }}>
                {bars.map((h,i) => (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                    <motion.div initial={{ height:0 }} animate={{ height:`${h}%` }}
                      transition={{ delay:i*0.05, type:'spring', stiffness:200 }}
                      style={{ width:'100%', borderRadius:'3px 3px 0 0',
                        background:i===4?color:`rgba(${hexToRgb(color)},0.35)` }}/>
                    <div style={{ fontSize:6.5, color:'rgba(255,255,255,0.25)', fontWeight:600 }}>{days[i]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sector badge */}
            <div style={{ padding:'10px', borderRadius:10, background:`rgba(${hexToRgb(color)},0.06)`,
              border:`1px solid rgba(${hexToRgb(color)},0.15)`, display:'flex', flexDirection:'column', gap:5 }}>
              <div style={{ fontSize:8, fontWeight:700, color:'rgba(255,255,255,0.5)', fontFamily:'Cairo,sans-serif' }}>الخدمات النشطة</div>
              {sector.services.slice(0,3).map(s => (
                <div key={s} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:8, color:'rgba(255,255,255,0.6)', fontFamily:'Cairo,sans-serif' }}>{s}</span>
                  <span style={{ fontSize:8, color:color, fontWeight:700 }}>{Math.floor(Math.random()*8+2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's appointments */}
          <div>
            <div style={{ fontSize:8, fontWeight:700, color:'rgba(255,255,255,0.5)', marginBottom:6, fontFamily:'Cairo,sans-serif' }}>
              مواعيد اليوم
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              {todaySlots.slice(0,4).map((s,i) => (
                <motion.div key={i} initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.07 }}
                  style={{ display:'flex', alignItems:'center', gap:7, padding:'6px 9px', borderRadius:8,
                    background:s.done?'rgba(255,255,255,0.02)':i===2?`rgba(${hexToRgb(color)},0.1)`:'rgba(255,255,255,0.03)',
                    border:`1px solid ${i===2?`rgba(${hexToRgb(color)},0.25)`:'rgba(255,255,255,0.05)'}` }}>
                  <div style={{ fontSize:8.5, fontWeight:700, color:'rgba(255,255,255,0.35)',
                    fontFamily:'monospace', flexShrink:0, width:28 }}>{s.time}</div>
                  <div style={{ width:20, height:20, borderRadius:'50%',
                    background:`rgba(${hexToRgb(color)},${s.done?'0.12':'0.25'})`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:9, fontWeight:900, color:color, flexShrink:0 }}>
                    {s.name[0]}
                  </div>
                  <div style={{ flex:1, overflow:'hidden' }}>
                    <div style={{ fontSize:9, fontWeight:700, color:s.done?'rgba(255,255,255,0.3)':'#fff',
                      fontFamily:'Cairo,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
                      textDecoration:s.done?'line-through':undefined }}>{s.name}</div>
                    <div style={{ fontSize:7.5, color:'rgba(255,255,255,0.3)', fontFamily:'Cairo,sans-serif' }}>{s.svc}</div>
                  </div>
                  <div style={{ width:14, height:14, borderRadius:'50%', flexShrink:0,
                    background:s.done?'#10B981': i===2?color:'rgba(255,255,255,0.1)',
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:8 }}>
                    {s.done?'✓':i===2?'●':''}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN BUILDER
// ─────────────────────────────────────────────────────────────
export default function BookingBuilder() {
  const [step, setStep]         = useState<1|2|3>(1);
  const [bizName, setBizName]   = useState('');
  const [sectorIdx, setSectorIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [activeService, setActiveService] = useState('');
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sector = SECTORS[sectorIdx];
  const color  = COLORS[colorIdx].hex;

  const hexToRgb = (h:string) => {
    const r = parseInt(h.slice(1,3),16), g=parseInt(h.slice(3,5),16), b=parseInt(h.slice(5,7),16);
    return `${r},${g},${b}`;
  };

  const waMsg = encodeURIComponent(
    `السلام عليكم، أبي نظام حجز لمشروعي "${bizName||'مشروعي'}" في قطاع ${sector.name} باللون ${COLORS[colorIdx].name}`
  );

  return (
    <section style={{ padding:'clamp(80px,10vw,130px) 0', position:'relative', overflow:'hidden',
      background:'linear-gradient(180deg,#050510 0%,#07071a 60%,#050510 100%)' }}>

      {/* Ambient glow */}
      <div style={{ position:'absolute', left:'20%', top:'30%', width:500, height:500, borderRadius:'50%',
        background:color, filter:'blur(200px)', opacity:0.07, pointerEvents:'none', transition:'background 0.5s' }}/>
      <div style={{ position:'absolute', right:'10%', bottom:'20%', width:350, height:350, borderRadius:'50%',
        background:color, filter:'blur(160px)', opacity:0.05, pointerEvents:'none', transition:'background 0.5s' }}/>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>

        {/* ── HEADER ── */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ textAlign:'center', marginBottom:52 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:20, padding:'10px 22px',
            borderRadius:28, background:`rgba(${hexToRgb(color)},0.1)`, border:`1px solid rgba(${hexToRgb(color)},0.3)`,
            transition:'all 0.4s' }}>
            <span style={{ fontSize:20 }}>⚡</span>
            <span style={{ fontSize:13, fontWeight:800, color, letterSpacing:0.3, transition:'color 0.4s' }}>
              ابنِ نظامك الآن — مجاناً
            </span>
          </div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(2rem,5vw,3.8rem)', letterSpacing:'-0.04em', lineHeight:1.05, marginBottom:16 }}>
            <span style={{ color:'#fff' }}>شوف نظام الحجز</span>{' '}
            <span style={{ background:`linear-gradient(135deg,${color},${color}88)`,
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              transition:'all 0.4s' }}>بهويتك</span>
          </h2>
          <p style={{ fontSize:16, color:'var(--text2)', maxWidth:520, margin:'0 auto' }}>
            اختر قطاعك ولونك واكتب اسم مشروعك — شوف لوحة التحكم وتطبيق الحجز يتشكّل بهويتك لحظياً.
          </p>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div style={{ display:'grid', gridTemplateColumns:'350px 1fr', gap:24, alignItems:'start' }}>

          {/* ── LEFT: FORM ── */}
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            style={{ borderRadius:24, padding:'28px 24px', background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.08)', display:'flex', flexDirection:'column', gap:24 }}>

            {/* Step indicator */}
            <div style={{ display:'flex', gap:8 }}>
              {[1,2,3].map(s => (
                <div key={s} style={{ flex:1, height:3, borderRadius:2, transition:'background 0.3s',
                  background:s<=step?color:'rgba(255,255,255,0.1)' }}/>
              ))}
            </div>

            {/* Step 1: Name */}
            <div>
              <div style={{ fontSize:11, fontWeight:800, color:'rgba(255,255,255,0.5)', letterSpacing:1, marginBottom:10 }}>
                ١ — اسم مشروعك
              </div>
              <input ref={inputRef} value={bizName} onChange={e => { setBizName(e.target.value); if(step<2&&e.target.value) setStep(2); }}
                placeholder="مثال: عيادة الأمل · كافيه روز · نادي الفيحاء"
                style={{ width:'100%', padding:'13px 16px', borderRadius:14, background:'rgba(255,255,255,0.05)',
                  border:`1.5px solid ${bizName?color:'rgba(255,255,255,0.1)'}`,
                  color:'#fff', fontFamily:'Cairo,sans-serif', fontSize:14, fontWeight:700, outline:'none',
                  transition:'border 0.3s', boxSizing:'border-box', direction:'rtl' }}/>
            </div>

            {/* Step 2: Sector */}
            <AnimatePresence>
              {(step>=2||bizName) && (
                <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}>
                  <div style={{ fontSize:11, fontWeight:800, color:'rgba(255,255,255,0.5)', letterSpacing:1, marginBottom:10 }}>
                    ٢ — قطاع مشروعك
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:7 }}>
                    {SECTORS.map((s,i) => (
                      <motion.button key={i} whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                        onClick={() => { setSectorIdx(i); if(step<3) setStep(3); }}
                        style={{ padding:'10px 4px', borderRadius:12, textAlign:'center', cursor:'pointer',
                          border:`1.5px solid ${sectorIdx===i?color:'rgba(255,255,255,0.08)'}`,
                          background:sectorIdx===i?`rgba(${hexToRgb(color)},0.15)`:'rgba(255,255,255,0.03)',
                          transition:'all 0.2s', fontFamily:'Cairo,sans-serif' }}>
                        <div style={{ fontSize:18, marginBottom:4 }}>{s.icon}</div>
                        <div style={{ fontSize:8.5, fontWeight:800, color:sectorIdx===i?'#fff':'rgba(255,255,255,0.45)',
                          lineHeight:1.2 }}>{s.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Color */}
            <AnimatePresence>
              {step>=3 && (
                <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}>
                  <div style={{ fontSize:11, fontWeight:800, color:'rgba(255,255,255,0.5)', letterSpacing:1, marginBottom:12 }}>
                    ٣ — هوية اللون
                  </div>
                  <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                    {COLORS.map((c,i) => (
                      <motion.button key={i} whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                        onClick={() => setColorIdx(i)}
                        title={c.name}
                        style={{ width:36, height:36, borderRadius:'50%', background:c.hex, border:'none', cursor:'pointer',
                          outline:colorIdx===i?`3px solid ${c.hex}`:undefined,
                          outlineOffset:colorIdx===i?3:undefined,
                          boxShadow:colorIdx===i?`0 0 16px ${c.hex}88`:undefined,
                          transition:'all 0.2s' }}/>
                    ))}
                  </div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginTop:8, fontWeight:600 }}>
                    اخترت: {COLORS[colorIdx].name}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <AnimatePresence>
              {step>=3 && (
                <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}>
                  <div style={{ padding:'16px', borderRadius:16, marginBottom:14,
                    background:`rgba(${hexToRgb(color)},0.08)`, border:`1px solid rgba(${hexToRgb(color)},0.2)` }}>
                    <div style={{ fontSize:12, fontWeight:800, color:'#fff', marginBottom:4, fontFamily:'Cairo,sans-serif' }}>
                      ✅ نظامك جاهز للتطوير الحقيقي
                    </div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', lineHeight:1.6 }}>
                      ما تراه الآن مجرد معاينة — النظام الحقيقي يشمل تطبيق iOS &amp; Android، لوحة تحكم كاملة، ودعم ٣ أشهر.
                    </div>
                  </div>
                  <motion.a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale:1.03, boxShadow:`0 16px 40px rgba(${hexToRgb(color)},0.5)` }}
                    whileTap={{ scale:0.97 }}
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, padding:'16px',
                      borderRadius:16, background:`linear-gradient(135deg,${color},${color}cc)`,
                      color:'#fff', fontFamily:'Cairo,sans-serif', fontSize:15, fontWeight:900,
                      textDecoration:'none', boxShadow:`0 12px 32px rgba(${hexToRgb(color)},0.4)` }}>
                    ابنِ نظامك الحقيقي ←
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: LIVE PREVIEWS ── */}
          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* Label */}
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#10B981',
                boxShadow:'0 0 10px #10B981' }}/>
              <span style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.5)' }}>
                معاينة حية — تتغير مع كل اختيار
              </span>
            </div>

            {/* Dashboard + Phone side by side */}
            <div style={{ display:'flex', gap:16, alignItems:'flex-start' }}>
              <DashboardMockup bizName={bizName} color={color} sector={sector} />
              <PhoneMockup bizName={bizName} color={color} sector={sector} activeService={activeService} />
            </div>

            {/* Wallet card mini preview */}
            <motion.div layout
              style={{ padding:'16px 20px', borderRadius:16, background:'rgba(255,255,255,0.03)',
                border:`1px solid rgba(${hexToRgb(color)},0.2)`, display:'flex', alignItems:'center', gap:14 }}>
              {/* Mini card */}
              <div style={{ width:90, height:58, borderRadius:10, position:'relative', overflow:'hidden', flexShrink:0,
                background:`linear-gradient(135deg,${color}22,${color}08)`,
                border:`1px solid rgba(${hexToRgb(color)},0.3)`,
                boxShadow:`0 8px 24px rgba(${hexToRgb(color)},0.25)` }}>
                <motion.div animate={{ x:['-60%','160%'] }} transition={{ duration:4, repeat:Infinity, ease:'linear', repeatDelay:3 }}
                  style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.15) 50%,transparent 70%)', pointerEvents:'none' }}/>
                <div style={{ position:'absolute', inset:0, padding:'7px 9px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                  <div style={{ fontSize:7, color:`${color}cc`, fontWeight:700, letterSpacing:0.8 }}>LOYALTY</div>
                  <div style={{ fontSize:10, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif',
                    whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                    {bizName || 'مشروعك'}
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:12, fontWeight:900, color }}>٢٤٧</span>
                    <svg width="18" height="18" viewBox="0 0 10 10">
                      {[[0,0,3,3],[0,7,3,3],[7,0,3,3],[4,4,1,1],[6,6,1,1]].map(([x,y,w,h],i)=>(
                        <rect key={i} x={x} y={y} width={w} height={h} fill={`${color}88`}/>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:800, color:'#fff', marginBottom:4, fontFamily:'Cairo,sans-serif' }}>
                  Apple Wallet مضمّن
                </div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.45)', lineHeight:1.6 }}>
                  كل حجز يولّد بطاقة تُضاف لجوال العميل تلقائياً — مع تذكير قبل الموعد.
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
