import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return m;
}

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

type Appt = {
  id: number; day: number; hour: number; span: number;
  name: string; service: string; color: string; bg: string;
  status: 'confirmed' | 'pending' | 'done'; avatar: string; price: string;
};

const APPOINTMENTS: Appt[] = [
  { id:1, day:0, hour:9,  span:1, name:'أحمد المطيري',  service:'فحص أسنان',    color:'#059669', bg:'rgba(5,150,105,0.18)',  status:'done',      avatar:'أ', price:'٢٥٠ ر' },
  { id:2, day:0, hour:11, span:2, name:'سارة الأحمدي',  service:'تنظيف بشرة',   color:'#EC4899', bg:'rgba(236,72,153,0.18)', status:'done',      avatar:'س', price:'٣٨٠ ر' },
  { id:3, day:1, hour:9,  span:1, name:'محمد الشمري',   service:'استشارة طبية', color:'#8B5CF6', bg:'rgba(139,92,246,0.18)', status:'confirmed', avatar:'م', price:'١٥٠ ر' },
  { id:4, day:1, hour:11, span:1, name:'نورة السويلم',  service:'تدليك علاجي',  color:'#F59E0B', bg:'rgba(245,158,11,0.18)', status:'confirmed', avatar:'ن', price:'٤٥٠ ر' },
  { id:5, day:1, hour:14, span:2, name:'فهد الدوسري',   service:'علاج طبيعي',   color:'#0EA5E9', bg:'rgba(14,165,233,0.18)', status:'pending',   avatar:'ف', price:'٥٥٠ ر' },
  { id:6, day:2, hour:10, span:1, name:'ريم الغامدي',   service:'فحص نظر',      color:'#10B981', bg:'rgba(16,185,129,0.18)', status:'confirmed', avatar:'ر', price:'٢٠٠ ر' },
  { id:7, day:2, hour:13, span:1, name:'خالد العتيبي',  service:'تصوير أشعة',   color:'#6366F1', bg:'rgba(99,102,241,0.18)', status:'confirmed', avatar:'خ', price:'٣٠٠ ر' },
  { id:8, day:3, hour:9,  span:3, name:'منى القحطاني',  service:'جلسة تجميل',   color:'#EC4899', bg:'rgba(236,72,153,0.18)', status:'confirmed', avatar:'م', price:'٨٠٠ ر' },
  { id:9, day:3, hour:15, span:1, name:'عمر الزهراني',  service:'فحص أسنان',    color:'#059669', bg:'rgba(5,150,105,0.18)',  status:'pending',   avatar:'ع', price:'٢٥٠ ر' },
  { id:10,day:4, hour:10, span:1, name:'هدى المالكي',   service:'استشارة تغذية',color:'#F97316', bg:'rgba(249,115,22,0.18)', status:'confirmed', avatar:'ه', price:'٢٢٠ ر' },
  { id:11,day:4, hour:14, span:2, name:'بندر الحربي',   service:'علاج طبيعي',   color:'#0EA5E9', bg:'rgba(14,165,233,0.18)', status:'confirmed', avatar:'ب', price:'٥٥٠ ر' },
];

const SERVICES = [
  { icon:'🦷', name:'فحص أسنان',      price:'٢٥٠ ر', duration:'٣٠ د', color:'#059669' },
  { icon:'💆', name:'تدليك علاجي',    price:'٤٥٠ ر', duration:'٦٠ د', color:'#8B5CF6' },
  { icon:'👁',  name:'فحص نظر',       price:'٢٠٠ ر', duration:'٣٠ د', color:'#10B981' },
  { icon:'💉', name:'استشارة طبية',   price:'١٥٠ ر', duration:'٢٠ د', color:'#F59E0B' },
  { icon:'🧖', name:'جلسة تجميل',    price:'٨٠٠ ر', duration:'٩٠ د', color:'#EC4899' },
  { icon:'🏃', name:'علاج طبيعي',    price:'٥٥٠ ر', duration:'٦٠ د', color:'#0EA5E9' },
];

const NAV = ['📊 الرئيسية', '📅 التقويم', '👥 العملاء', '📈 التقارير', '⚙️ الإعدادات'];

const SLOT_H = 56; // px per hour

/* ═══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */
function hourLabel(h: number) {
  return h === 12 ? '١٢ ظ' : h > 12 ? `${arabicNum(h-12)} م` : `${arabicNum(h)} ص`;
}
function arabicNum(n: number): string {
  return n.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);
}

function StatusBadge({ s }: { s: Appt['status'] }) {
  const map = { confirmed:['#10B981','مؤكد'], pending:['#F59E0B','انتظار'], done:['#6366F1','منتهي'] };
  const [color, label] = map[s];
  return (
    <span style={{ fontSize:9, fontWeight:800, padding:'2px 8px', borderRadius:8,
      background:`${color}20`, color, fontFamily:'Cairo,sans-serif' }}>{label}</span>
  );
}

/* ═══════════════════════════════════════════════
   APPOINTMENT BLOCK
═══════════════════════════════════════════════ */
function ApptBlock({ a, onClick, active }: { a:Appt; onClick:()=>void; active:boolean }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale:1.02, zIndex:20 }}
      whileTap={{ scale:0.98 }}
      style={{
        position:'absolute',
        top: (a.hour - 9) * SLOT_H + 2,
        height: a.span * SLOT_H - 4,
        right: 2, left: 2,
        borderRadius: 10,
        background: active ? `${a.color}35` : a.bg,
        border: `1.5px solid ${a.color}${active?'90':'45'}`,
        cursor: 'pointer',
        padding: '6px 8px',
        overflow: 'hidden',
        zIndex: active ? 10 : 2,
        boxShadow: active ? `0 0 0 2px ${a.color}60, 0 8px 24px ${a.color}30` : 'none',
        transition: 'all 0.2s',
      }}>
      {/* Shimmer on active */}
      {active && (
        <motion.div animate={{ x:['-100%','200%'] }} transition={{ duration:2, repeat:Infinity, repeatDelay:1 }}
          style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.12) 50%,transparent 65%)', pointerEvents:'none' }}/>
      )}
      <div style={{ display:'flex', alignItems:'center', gap:5 }}>
        <div style={{ width:16, height:16, borderRadius:5, background:`${a.color}40`,
          border:`1px solid ${a.color}60`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:9, fontWeight:900, color:a.color, flexShrink:0 }}>{a.avatar}</div>
        <span style={{ fontSize:10, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif',
          whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{a.name}</span>
      </div>
      {a.span > 1 && (
        <div style={{ fontSize:9, color:`${a.color}cc`, marginTop:3, fontFamily:'Cairo,sans-serif' }}>{a.service}</div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   EMPTY SLOT (clickable to book)
═══════════════════════════════════════════════ */
function EmptySlot({ day, hour, onClick }: { day:number; hour:number; onClick:()=>void }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        position:'absolute',
        top: (hour - 9) * SLOT_H + 1,
        height: SLOT_H - 2,
        right: 2, left: 2,
        borderRadius: 8,
        background: hover ? 'rgba(5,150,105,0.07)' : 'transparent',
        border: hover ? '1.5px dashed rgba(5,150,105,0.4)' : '1px dashed transparent',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.15s',
        zIndex: 1,
      }}>
      {hover && (
        <span style={{ fontSize:10, color:'rgba(5,150,105,0.7)', fontWeight:800, fontFamily:'Cairo,sans-serif' }}>
          + حجز جديد {hourLabel(hour)}
        </span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   RIGHT PANEL — details or new booking
═══════════════════════════════════════════════ */
function RightPanel({ selected, onClose, newSlot, onBook }:
  { selected:Appt|null; onClose:()=>void; newSlot:{day:number;hour:number}|null; onBook:(svc:typeof SERVICES[0])=>void }) {

  const [step, setStep] = useState(0);
  const [chosenSvc, setChosenSvc] = useState<typeof SERVICES[0]|null>(null);
  const [name, setName] = useState('');
  const [booked, setBooked] = useState(false);

  useEffect(() => { setStep(0); setChosenSvc(null); setName(''); setBooked(false); }, [newSlot]);

  if (!selected && !newSlot) {
    // Default panel — upcoming
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ fontSize:11, fontWeight:900, color:'rgba(255,255,255,0.5)',
          letterSpacing:1.5, textTransform:'uppercase', marginBottom:4 }}>مواعيد قادمة</div>
        {APPOINTMENTS.filter(a => a.status !== 'done').slice(0,5).map(a => (
          <div key={a.id} style={{ padding:'10px 12px', borderRadius:12,
            background:'rgba(255,255,255,0.04)', border:`1px solid ${a.color}25` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ fontSize:11, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{a.name}</div>
                <div style={{ fontSize:9.5, color:`${a.color}cc`, fontFamily:'Cairo,sans-serif', marginTop:2 }}>{a.service}</div>
              </div>
              <StatusBadge s={a.status}/>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:7 }}>
              <span style={{ fontSize:9, color:'rgba(255,255,255,0.35)', fontFamily:'Cairo,sans-serif' }}>
                {DAYS[a.day]} {hourLabel(a.hour)}
              </span>
              <span style={{ fontSize:10, fontWeight:800, color:a.color }}>{a.price}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (selected) {
    return (
      <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div style={{ fontSize:12, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>تفاصيل الموعد</div>
          <button onClick={onClose} style={{ background:'rgba(255,255,255,0.07)', border:'none', borderRadius:7,
            width:24, height:24, cursor:'pointer', color:'rgba(255,255,255,0.6)', fontSize:13 }}>×</button>
        </div>
        {/* Avatar + name */}
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'14px', borderRadius:14,
          background:`${selected.color}12`, border:`1.5px solid ${selected.color}35`, marginBottom:14 }}>
          <div style={{ width:44, height:44, borderRadius:12, background:`${selected.color}30`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:18, fontWeight:900, color:selected.color }}>{selected.avatar}</div>
          <div>
            <div style={{ fontSize:14, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{selected.name}</div>
            <div style={{ fontSize:10, color:`${selected.color}cc`, fontFamily:'Cairo,sans-serif', marginTop:2 }}>{selected.service}</div>
          </div>
          <StatusBadge s={selected.status}/>
        </div>
        {[['📅 الوقت', `${DAYS[selected.day]}  ${hourLabel(selected.hour)}`],
          ['⏱ المدة', `${selected.span * 30} دقيقة`],
          ['💰 السعر', selected.price],
        ].map(([lbl,val]) => (
          <div key={lbl} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'9px 12px', borderRadius:10, background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.06)', marginBottom:7 }}>
            <span style={{ fontSize:10.5, color:'rgba(255,255,255,0.5)', fontFamily:'Cairo,sans-serif' }}>{lbl}</span>
            <span style={{ fontSize:11, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{val}</span>
          </div>
        ))}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:14 }}>
          <button style={{ padding:'10px', borderRadius:10, background:'rgba(239,68,68,0.12)',
            border:'1px solid rgba(239,68,68,0.3)', color:'#EF4444',
            fontFamily:'Cairo,sans-serif', fontSize:11, fontWeight:800, cursor:'pointer' }}>إلغاء</button>
          <button style={{ padding:'10px', borderRadius:10, background:'rgba(5,150,105,0.2)',
            border:'1px solid rgba(5,150,105,0.4)', color:'#10B981',
            fontFamily:'Cairo,sans-serif', fontSize:11, fontWeight:800, cursor:'pointer' }}>إعادة جدولة</button>
        </div>
      </motion.div>
    );
  }

  // New booking flow
  if (booked && chosenSvc) {
    return (
      <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }}
        style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          height:'100%', textAlign:'center', padding:'20px 0' }}>
        <motion.div animate={{ scale:[1,1.15,1] }} transition={{ duration:0.5 }}
          style={{ width:64, height:64, borderRadius:20, background:'rgba(5,150,105,0.2)',
            border:'2px solid #059669', display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:28, marginBottom:16 }}>✅</motion.div>
        <div style={{ fontSize:15, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif', marginBottom:8 }}>تم تأكيد الموعد!</div>
        <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', lineHeight:1.7, fontFamily:'Cairo,sans-serif' }}>
          رسالة واتساب تذهب لـ {name || 'العميل'}<br/>
          {DAYS[newSlot!.day]} — {hourLabel(newSlot!.hour)}<br/>
          {chosenSvc.name} · {chosenSvc.price}
        </div>
        <div style={{ marginTop:16, padding:'10px 20px', borderRadius:12,
          background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.3)' }}>
          <div style={{ fontSize:9, color:'#25D366', fontWeight:800 }}>💬 واتساب أُرسل تلقائياً</div>
        </div>
        <button onClick={() => { setBooked(false); onClose(); }}
          style={{ marginTop:16, padding:'9px 24px', borderRadius:10, background:'rgba(255,255,255,0.07)',
            border:'1px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.6)',
            fontFamily:'Cairo,sans-serif', fontSize:11, cursor:'pointer' }}>
          إغلاق
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
        <div style={{ fontSize:12, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>
          حجز جديد — {DAYS[newSlot!.day]} {hourLabel(newSlot!.hour)}
        </div>
        <button onClick={onClose} style={{ background:'rgba(255,255,255,0.07)', border:'none',
          borderRadius:7, width:24, height:24, cursor:'pointer', color:'rgba(255,255,255,0.6)', fontSize:13 }}>×</button>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', marginBottom:10, fontFamily:'Cairo,sans-serif' }}>اختر الخدمة</div>
            <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
              {SERVICES.map(s => (
                <motion.button key={s.name} whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                  onClick={() => { setChosenSvc(s); setStep(1); }}
                  style={{ padding:'10px 12px', borderRadius:11, background:`${s.color}10`,
                    border:`1px solid ${s.color}30`, cursor:'pointer', display:'flex',
                    alignItems:'center', gap:10, textAlign:'right' }}>
                  <span style={{ fontSize:18 }}>{s.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:11, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{s.name}</div>
                    <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)', fontFamily:'Cairo,sans-serif' }}>{s.duration}</div>
                  </div>
                  <span style={{ fontSize:11, fontWeight:900, color:s.color }}>{s.price}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <div style={{ padding:'10px 12px', borderRadius:10, background:`${chosenSvc!.color}12`,
              border:`1px solid ${chosenSvc!.color}30`, marginBottom:14,
              display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:18 }}>{chosenSvc!.icon}</span>
              <div>
                <div style={{ fontSize:11, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{chosenSvc!.name}</div>
                <div style={{ fontSize:9, color:`${chosenSvc!.color}cc` }}>{chosenSvc!.price} · {chosenSvc!.duration}</div>
              </div>
            </div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', marginBottom:10, fontFamily:'Cairo,sans-serif' }}>اسم العميل</div>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="مثال: سارة الأحمدي"
              style={{ width:'100%', padding:'10px 12px', borderRadius:10, background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.12)', color:'#fff',
                fontFamily:'Cairo,sans-serif', fontSize:12, outline:'none', boxSizing:'border-box',
                direction:'rtl' }}
            />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:12 }}>
              <button onClick={() => setStep(0)}
                style={{ padding:'10px', borderRadius:10, background:'rgba(255,255,255,0.05)',
                  border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.5)',
                  fontFamily:'Cairo,sans-serif', fontSize:11, cursor:'pointer' }}>رجوع</button>
              <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                onClick={() => { onBook(chosenSvc!); setBooked(true); }}
                style={{ padding:'10px', borderRadius:10,
                  background:'linear-gradient(135deg,#059669,#047857)',
                  border:'none', color:'#fff',
                  fontFamily:'Cairo,sans-serif', fontSize:11, fontWeight:900, cursor:'pointer',
                  boxShadow:'0 8px 24px rgba(5,150,105,0.35)' }}>
                تأكيد الحجز ←
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════
   MOBILE VERSION
═══════════════════════════════════════════════ */
function MobileDemo() {
  const [revenue, setRevenue] = useState(12480);
  const [apptCount, setApptCount] = useState(18);
  const [selectedAppt, setSelectedAppt] = useState<Appt | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [chosenSvc, setChosenSvc] = useState<typeof SERVICES[0] | null>(null);
  const [bookingName, setBookingName] = useState('');
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setRevenue(r => r + Math.floor(Math.random() * 120 + 40));
      setApptCount(c => c + (Math.random() > 0.7 ? 1 : 0));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      borderRadius: 24,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.1)',
      background: '#0a0a16',
      boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(5,150,105,0.1)',
    }}>
      {/* Phone status bar */}
      <div style={{ background:'#0d0d1f', padding:'10px 16px 8px',
        display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:24, height:24, borderRadius:7, background:'linear-gradient(135deg,#059669,#047857)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>📅</div>
          <div>
            <div style={{ fontSize:11, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>تلقا حجوزات</div>
            <div style={{ fontSize:8, color:'rgba(255,255,255,0.35)', fontFamily:'Cairo,sans-serif' }}>لوحة التحكم</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:5,
          padding:'5px 10px', borderRadius:20,
          background:'rgba(5,150,105,0.15)', border:'1px solid rgba(5,150,105,0.3)' }}>
          <div style={{ width:5, height:5, borderRadius:'50%', background:'#10B981' }}/>
          <span style={{ fontSize:9, color:'#34D399', fontWeight:800, fontFamily:'Cairo,sans-serif' }}>مباشر</span>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1,
        borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        {[
          { label:'إيرادات اليوم', val:`${arabicNum(revenue)} ر`, icon:'💰', color:'#34D399', sub:'↑١٨٪ عن أمس' },
          { label:'مواعيد اليوم',  val:arabicNum(apptCount),       icon:'📅', color:'#60A5FA', sub:`${arabicNum(Math.floor(apptCount*0.6))} مؤكد` },
        ].map(k => (
          <div key={k.label} style={{ padding:'14px 16px', background:'rgba(255,255,255,0.02)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)', fontFamily:'Cairo,sans-serif', marginBottom:4 }}>{k.label}</div>
                <motion.div key={k.val} initial={{ opacity:0.5 }} animate={{ opacity:1 }}
                  style={{ fontSize:22, fontWeight:900, color:k.color, letterSpacing:-0.5 }}>{k.val}</motion.div>
                <div style={{ fontSize:9, color:k.color, fontWeight:700, marginTop:2 }}>{k.sub}</div>
              </div>
              <span style={{ fontSize:20 }}>{k.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Appointments list */}
      <div style={{ padding:'14px 16px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <span style={{ fontSize:12, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>مواعيد اليوم</span>
          <motion.button whileTap={{ scale:0.95 }} onClick={() => { setShowBooking(true); setBooked(false); setChosenSvc(null); setBookingName(''); }}
            style={{ padding:'6px 14px', borderRadius:9,
              background:'linear-gradient(135deg,#059669,#047857)',
              border:'none', color:'#fff', fontFamily:'Cairo,sans-serif',
              fontSize:10, fontWeight:800, cursor:'pointer',
              boxShadow:'0 4px 16px rgba(5,150,105,0.4)' }}>
            + حجز جديد
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {showBooking ? (
            <motion.div key="booking" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              {booked && chosenSvc ? (
                <div style={{ textAlign:'center', padding:'24px 0' }}>
                  <motion.div animate={{ scale:[1,1.2,1] }} transition={{ duration:0.5 }}
                    style={{ fontSize:48, marginBottom:12 }}>✅</motion.div>
                  <div style={{ fontSize:15, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif', marginBottom:6 }}>تم تأكيد الموعد!</div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', lineHeight:1.7, fontFamily:'Cairo,sans-serif' }}>
                    {bookingName || 'العميل'} · {chosenSvc.name}<br/>الأربعاء — ١٢:٠٠ ظ
                  </div>
                  <div style={{ margin:'14px 0', padding:'10px', borderRadius:12,
                    background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.3)' }}>
                    <div style={{ fontSize:10, color:'#25D366', fontWeight:800 }}>💬 واتساب أُرسل تلقائياً</div>
                  </div>
                  <button onClick={() => setShowBooking(false)}
                    style={{ padding:'8px 20px', borderRadius:10, background:'rgba(255,255,255,0.07)',
                      border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)',
                      fontFamily:'Cairo,sans-serif', fontSize:11, cursor:'pointer' }}>
                    رجوع للمواعيد
                  </button>
                </div>
              ) : !chosenSvc ? (
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                    <span style={{ fontSize:11, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>اختر الخدمة</span>
                    <button onClick={() => setShowBooking(false)} style={{ background:'none', border:'none',
                      color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:14 }}>×</button>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {SERVICES.map(s => (
                      <motion.button key={s.name} whileTap={{ scale:0.97 }} onClick={() => setChosenSvc(s)}
                        style={{ padding:'12px 14px', borderRadius:12, background:`${s.color}10`,
                          border:`1px solid ${s.color}30`, cursor:'pointer',
                          display:'flex', alignItems:'center', gap:12, textAlign:'right' }}>
                        <span style={{ fontSize:20 }}>{s.icon}</span>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:12, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{s.name}</div>
                          <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)', fontFamily:'Cairo,sans-serif' }}>{s.duration}</div>
                        </div>
                        <span style={{ fontSize:12, fontWeight:900, color:s.color }}>{s.price}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                    <span style={{ fontSize:11, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>بيانات العميل</span>
                    <button onClick={() => setChosenSvc(null)} style={{ background:'none', border:'none',
                      color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:12, fontFamily:'Cairo,sans-serif' }}>رجوع</button>
                  </div>
                  <div style={{ padding:'10px 12px', borderRadius:10, background:`${chosenSvc.color}12`,
                    border:`1px solid ${chosenSvc.color}30`, marginBottom:12,
                    display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:18 }}>{chosenSvc.icon}</span>
                    <div>
                      <div style={{ fontSize:11, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{chosenSvc.name}</div>
                      <div style={{ fontSize:9, color:`${chosenSvc.color}cc` }}>{chosenSvc.price} · {chosenSvc.duration}</div>
                    </div>
                  </div>
                  <input value={bookingName} onChange={e => setBookingName(e.target.value)}
                    placeholder="اسم العميل"
                    style={{ width:'100%', padding:'12px 14px', borderRadius:12, boxSizing:'border-box',
                      background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
                      color:'#fff', fontFamily:'Cairo,sans-serif', fontSize:13, outline:'none',
                      direction:'rtl', marginBottom:12 }}/>
                  <motion.button whileTap={{ scale:0.97 }}
                    onClick={() => setBooked(true)}
                    style={{ width:'100%', padding:'14px', borderRadius:12,
                      background:'linear-gradient(135deg,#059669,#047857)',
                      border:'none', color:'#fff', fontFamily:'Cairo,sans-serif',
                      fontSize:14, fontWeight:900, cursor:'pointer',
                      boxShadow:'0 8px 24px rgba(5,150,105,0.4)' }}>
                    تأكيد الحجز ←
                  </motion.button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity:0 }} animate={{ opacity:1 }}>
              {APPOINTMENTS.slice(0, 7).map((a, i) => (
                <motion.div key={a.id}
                  onClick={() => setSelectedAppt(selectedAppt?.id === a.id ? null : a)}
                  initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{ padding:'11px 14px', borderRadius:14, marginBottom:8, cursor:'pointer',
                    background: selectedAppt?.id === a.id ? `${a.color}15` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${selectedAppt?.id === a.id ? a.color+'50' : 'rgba(255,255,255,0.07)'}`,
                    transition:'all 0.2s' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:34, height:34, borderRadius:10, background:`${a.color}20`,
                      border:`1.5px solid ${a.color}50`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:14, fontWeight:900, color:a.color, flexShrink:0 }}>{a.avatar}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{a.name}</div>
                      <div style={{ fontSize:10, color:`${a.color}bb`, fontFamily:'Cairo,sans-serif' }}>{a.service}</div>
                    </div>
                    <div style={{ textAlign:'left', flexShrink:0 }}>
                      <StatusBadge s={a.status}/>
                      <div style={{ fontSize:9, color:'rgba(255,255,255,0.35)', fontFamily:'Cairo,sans-serif',
                        marginTop:3, textAlign:'center' }}>{DAYS[a.day]} {hourLabel(a.hour)}</div>
                    </div>
                  </div>
                  {selectedAppt?.id === a.id && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
                      style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${a.color}25`,
                        display:'flex', justifyContent:'space-between' }}>
                      <span style={{ fontSize:11, fontWeight:900, color:a.color }}>{a.price}</span>
                      <div style={{ display:'flex', gap:6 }}>
                        <button style={{ padding:'4px 10px', borderRadius:7, background:'rgba(239,68,68,0.12)',
                          border:'1px solid rgba(239,68,68,0.25)', color:'#EF4444',
                          fontFamily:'Cairo,sans-serif', fontSize:9, fontWeight:800, cursor:'pointer' }}>إلغاء</button>
                        <button style={{ padding:'4px 10px', borderRadius:7, background:'rgba(5,150,105,0.15)',
                          border:'1px solid rgba(5,150,105,0.3)', color:'#34D399',
                          fontFamily:'Cairo,sans-serif', fontSize:9, fontWeight:800, cursor:'pointer' }}>جدولة</button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div style={{ padding:'10px 16px', background:'#0d0d1f',
        borderTop:'1px solid rgba(255,255,255,0.05)',
        display:'flex', justifyContent:'space-around' }}>
        {[['📅','التقويم'], ['📊','التقارير'], ['👥','العملاء'], ['⚙️','الإعدادات']].map(([icon, lbl]) => (
          <div key={lbl} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
            <span style={{ fontSize:16 }}>{icon}</span>
            <span style={{ fontSize:8, color:'rgba(255,255,255,0.35)', fontFamily:'Cairo,sans-serif' }}>{lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BookingsWebDemo() {
  const isMobile = useIsMobile();
  const [activeAppt, setActiveAppt] = useState<Appt | null>(null);
  const [newSlot, setNewSlot] = useState<{ day: number; hour: number } | null>(null);
  const [activeNav, setActiveNav] = useState(1);
  const [revenue, setRevenue] = useState(12480);
  const [apptCount, setApptCount] = useState(18);

  useEffect(() => {
    const t = setInterval(() => {
      setRevenue(r => r + Math.floor(Math.random() * 150 + 50));
      setApptCount(c => c + (Math.random() > 0.7 ? 1 : 0));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const handleSlotClick = (day: number, hour: number) => {
    const existing = APPOINTMENTS.find(a => a.day === day && a.hour === hour);
    if (existing) { setActiveAppt(existing); setNewSlot(null); }
    else { setNewSlot({ day, hour }); setActiveAppt(null); }
  };

  const closePanel = () => { setActiveAppt(null); setNewSlot(null); };

  // Find empty slots for the visible grid
  const occupiedSlots = new Set(
    APPOINTMENTS.flatMap(a => Array.from({ length: a.span }, (_, i) => `${a.day}-${a.hour + i}`))
  );

  return (
    <section style={{ padding: 'clamp(80px,10vw,120px) 0' }}>
      <div style={{ maxWidth: isMobile ? 480 : 1240, margin: '0 auto', padding: '0 16px' }}>

        {/* ── Section header ── */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ textAlign:'center', marginBottom: isMobile ? 32 : 52 }}>
          <div className="section-label" style={{ color:'#059669', borderColor:'rgba(5,150,105,0.3)',
            background:'rgba(5,150,105,0.08)', marginBottom:16 }}>📅 نظام الحجوزات</div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(2rem,4.5vw,3.5rem)', color:'#fff',
            letterSpacing:'-0.04em', lineHeight:1.1, marginBottom:14 }}>
            نظام حجوزات يعمل
            <span style={{ background:'linear-gradient(135deg,#059669,#34D399)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              backgroundClip:'text' }}> بدون تدخل منك</span>
          </h2>
          <p style={{ fontSize:16, color:'var(--text2)', maxWidth:560, margin:'0 auto', lineHeight:1.8 }}>
            لوحة تحكم كاملة، تقويم ذكي، وتأكيد واتساب فوري — جربها الآن
          </p>
        </motion.div>

        {/* ══════════════ RESPONSIVE FRAME ══════════════ */}
        {isMobile ? (
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5 }}>
            <MobileDemo />
            <p style={{ textAlign:'center', marginTop:16, fontSize:11,
              color:'rgba(255,255,255,0.25)', fontFamily:'Cairo,sans-serif' }}>
              💡 اضغط على موعد لرؤية التفاصيل · جرّب الحجز الجديد
            </p>
          </motion.div>
        ) : (
        <motion.div
          initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 60px 150px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(5,150,105,0.12)',
          }}>

          {/* Browser chrome */}
          <div style={{ background:'#1a1a2e', padding:'10px 16px',
            borderBottom:'1px solid rgba(255,255,255,0.07)',
            display:'flex', alignItems:'center', gap:12 }}>
            {/* Traffic lights */}
            <div style={{ display:'flex', gap:6 }}>
              {['#FF5F57','#FEBC2E','#28C840'].map((c,i) => (
                <div key={i} style={{ width:12, height:12, borderRadius:'50%', background:c }}/>
              ))}
            </div>
            {/* Tabs */}
            <div style={{ display:'flex', gap:1 }}>
              <div style={{ padding:'5px 16px', borderRadius:'8px 8px 0 0',
                background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)',
                borderBottom:'1px solid #0f0f1e',
                display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:12, height:12, borderRadius:3, background:'linear-gradient(135deg,#059669,#34D399)',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:7 }}>📅</div>
                <span style={{ fontSize:11, color:'rgba(255,255,255,0.7)', fontFamily:'Cairo,sans-serif' }}>لوحة تحكم الحجوزات</span>
              </div>
            </div>
            {/* Address bar */}
            <div style={{ flex:1, background:'rgba(255,255,255,0.05)', borderRadius:8,
              padding:'5px 12px', display:'flex', alignItems:'center', gap:7, maxWidth:320 }}>
              <span style={{ fontSize:10 }}>🔒</span>
              <span style={{ fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'monospace' }}>
                app.tlqa.tech/bookings
              </span>
            </div>
          </div>

          {/* App content */}
          <div style={{ display:'flex', height: 580, background:'#0a0a16' }}>

            {/* ── Sidebar ── */}
            <div style={{ width:200, borderLeft:'1px solid rgba(255,255,255,0.06)',
              background:'#0d0d1f', display:'flex', flexDirection:'column', flexShrink:0 }}>

              {/* Logo */}
              <div style={{ padding:'16px', borderBottom:'1px solid rgba(255,255,255,0.05)',
                display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#059669,#047857)',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>📅</div>
                <div>
                  <div style={{ fontSize:11, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>تلقا حجوزات</div>
                  <div style={{ fontSize:8, color:'rgba(255,255,255,0.35)', fontFamily:'Cairo,sans-serif' }}>لوحة التحكم</div>
                </div>
              </div>

              {/* Nav items */}
              <nav style={{ padding:'10px 8px', flex:1 }}>
                {NAV.map((item, i) => (
                  <button key={i} onClick={() => setActiveNav(i)}
                    style={{ width:'100%', padding:'9px 12px', borderRadius:10, marginBottom:4,
                      background: activeNav===i ? 'rgba(5,150,105,0.15)' : 'transparent',
                      border: activeNav===i ? '1px solid rgba(5,150,105,0.35)' : '1px solid transparent',
                      color: activeNav===i ? '#34D399' : 'rgba(255,255,255,0.45)',
                      fontFamily:'Cairo,sans-serif', fontSize:11, fontWeight:activeNav===i?800:500,
                      cursor:'pointer', textAlign:'right', transition:'all 0.15s' }}>
                    {item}
                  </button>
                ))}
              </nav>

              {/* Bottom stats */}
              <div style={{ padding:'12px', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ padding:'10px', borderRadius:10, background:'rgba(5,150,105,0.08)',
                  border:'1px solid rgba(5,150,105,0.2)' }}>
                  <div style={{ fontSize:8, color:'rgba(255,255,255,0.4)', fontFamily:'Cairo,sans-serif', marginBottom:4 }}>إيرادات اليوم</div>
                  <motion.div key={revenue}
                    initial={{ opacity:0.5, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                    style={{ fontSize:16, fontWeight:900, color:'#34D399', letterSpacing:-0.5 }}>
                    {arabicNum(revenue)} ر
                  </motion.div>
                  <div style={{ fontSize:8, color:'#10B981', marginTop:2, fontWeight:700 }}>↑ ١٨٪ عن أمس</div>
                </div>
              </div>
            </div>

            {/* ── Main calendar ── */}
            <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>

              {/* Top bar */}
              <div style={{ padding:'10px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)',
                display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ fontSize:13, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>
                    الأسبوع الحالي — يوليو ٢٠٢٦
                  </span>
                  <div style={{ display:'flex', gap:4 }}>
                    {['أسبوع','يوم','شهر'].map((v,i) => (
                      <button key={v} style={{ padding:'4px 10px', borderRadius:7,
                        background: i===0?'rgba(5,150,105,0.2)':'rgba(255,255,255,0.05)',
                        border: i===0?'1px solid rgba(5,150,105,0.4)':'1px solid rgba(255,255,255,0.08)',
                        color: i===0?'#34D399':'rgba(255,255,255,0.4)',
                        fontFamily:'Cairo,sans-serif', fontSize:9.5, cursor:'pointer' }}>{v}</button>
                    ))}
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 10px',
                    borderRadius:8, background:'rgba(5,150,105,0.12)', border:'1px solid rgba(5,150,105,0.3)' }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:'#10B981',
                      boxShadow:'0 0 0 2px rgba(16,185,129,0.3)' }}/>
                    <span style={{ fontSize:9.5, color:'#34D399', fontWeight:800, fontFamily:'Cairo,sans-serif' }}>
                      {arabicNum(apptCount)} موعد اليوم
                    </span>
                  </div>
                  <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                    onClick={() => { setNewSlot({day:2, hour:12}); setActiveAppt(null); }}
                    style={{ padding:'6px 14px', borderRadius:9,
                      background:'linear-gradient(135deg,#059669,#047857)',
                      border:'none', color:'#fff', fontFamily:'Cairo,sans-serif',
                      fontSize:10, fontWeight:800, cursor:'pointer',
                      boxShadow:'0 4px 16px rgba(5,150,105,0.35)' }}>
                    + حجز جديد
                  </motion.button>
                </div>
              </div>

              {/* Calendar grid */}
              <div style={{ flex:1, overflow:'auto', scrollbarWidth:'thin' }}>
                <div style={{ display:'grid', gridTemplateColumns:`60px repeat(${DAYS.length},1fr)`,
                  minWidth:600 }}>

                  {/* Header row */}
                  <div style={{ background:'rgba(0,0,0,0.3)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}/>
                  {DAYS.map((d, di) => (
                    <div key={d} style={{ padding:'8px 4px', textAlign:'center',
                      background:'rgba(0,0,0,0.3)', borderBottom:'1px solid rgba(255,255,255,0.06)',
                      borderRight:'1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ fontSize:10, fontWeight:800, color:'rgba(255,255,255,0.5)',
                        fontFamily:'Cairo,sans-serif' }}>{d}</div>
                      <div style={{ fontSize:16, fontWeight:900, color: di===2?'#34D399':'rgba(255,255,255,0.8)',
                        marginTop:2 }}>{arabicNum(20+di)}</div>
                      {di===2 && <div style={{ width:4, height:4, borderRadius:'50%', background:'#059669', margin:'2px auto 0' }}/>}
                    </div>
                  ))}

                  {/* Time + slots — one row per hour */}
                  {HOURS.map(hour => [
                    /* Hour label cell */
                    <div key={`h${hour}`} style={{ height:SLOT_H, borderBottom:'1px solid rgba(255,255,255,0.04)',
                      display:'flex', alignItems:'flex-start', justifyContent:'flex-end',
                      padding:'4px 8px 0 0' }}>
                      <span style={{ fontSize:9, color:'rgba(255,255,255,0.25)', fontFamily:'monospace' }}>
                        {hourLabel(hour)}
                      </span>
                    </div>,

                    /* Day column cells */
                    ...DAYS.map((_, di) => {
                      const appt = APPOINTMENTS.find(a => a.day===di && a.hour===hour);
                      const isOccupied = occupiedSlots.has(`${di}-${hour}`);
                      return (
                        <div key={`${di}-${hour}`}
                          style={{ height:SLOT_H, position:'relative',
                            borderBottom:'1px solid rgba(255,255,255,0.04)',
                            borderRight:'1px solid rgba(255,255,255,0.04)',
                            background: di===2 ? 'rgba(5,150,105,0.03)' : 'transparent' }}>
                          {appt && appt.hour===hour && (
                            <ApptBlock a={appt} active={activeAppt?.id===appt.id}
                              onClick={() => handleSlotClick(di, hour)}/>
                          )}
                          {!isOccupied && (
                            <EmptySlot day={di} hour={hour}
                              onClick={() => handleSlotClick(di, hour)}/>
                          )}
                        </div>
                      );
                    }),
                  ])}
                </div>
              </div>
            </div>

            {/* ── Right panel ── */}
            <div style={{ width:240, borderRight:'1px solid rgba(255,255,255,0.06)',
              background:'#0d0d1f', padding:'14px', overflowY:'auto',
              scrollbarWidth:'thin', display:'flex', flexDirection:'column' }}>
              <AnimatePresence mode="wait">
                <RightPanel key={activeAppt?.id ?? newSlot ? `${newSlot!.day}-${newSlot!.hour}` : 'default'}
                  selected={activeAppt} onClose={closePanel}
                  newSlot={newSlot}
                  onBook={(svc) => { /* booking confirmed */ }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom status bar */}
          <div style={{ background:'#1a1a2e', padding:'6px 16px',
            borderTop:'1px solid rgba(255,255,255,0.05)',
            display:'flex', alignItems:'center', gap:16 }}>
            {[['🟢','متصل','#10B981'], ['📅', `${arabicNum(apptCount)} موعد`, '#34D399'],
              ['💰', `${arabicNum(revenue)} ر اليوم`, '#F59E0B'],
              ['💬', 'واتساب يعمل', '#25D366'],
            ].map(([icon,txt,color]) => (
              <div key={txt} style={{ display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ fontSize:10 }}>{icon}</span>
                <span style={{ fontSize:9.5, color, fontFamily:'Cairo,sans-serif', fontWeight:700 }}>{txt}</span>
              </div>
            ))}
            <div style={{ flex:1, textAlign:'left', fontSize:9, color:'rgba(255,255,255,0.2)', fontFamily:'monospace' }}>
              v3.2.1 · SSL · نسخة احتياطية: الآن
            </div>
          </div>
        </motion.div>
        )}

        {!isMobile && (
          <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            transition={{ delay:0.4 }}
            style={{ textAlign:'center', marginTop:20, fontSize:12,
              color:'rgba(255,255,255,0.25)', fontFamily:'Cairo,sans-serif' }}>
            💡 اضغط على أي خانة فارغة لتجرب الحجز · اضغط على موعد موجود لترى تفاصيله
          </motion.p>
        )}
      </div>
    </section>
  );
}
