import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  Calendar, Clock, CheckCircle2, Bell, MessageSquare,
  BarChart3, ChevronRight, ArrowRight, Users, TrendingUp, Heart,
} from 'lucide-react';

const WA     = 'https://wa.me/966551378531?text=أريد%20نظام%20حجوزات%20لمشروعي';
const PURPLE = '#8B5CF6';

/* ─────────────────────────────── Data ─── */
const DAYS = [
  { label: 'الأحد', date: '١٨' },
  { label: 'الاثنين', date: '١٩' },
  { label: 'الثلاثاء', date: '٢٠' },
  { label: 'الأربعاء', date: '٢١' },
  { label: 'الخميس', date: '٢٢' },
];

const SLOTS = [
  { time: '٩:٠٠ ص',  taken: true  },
  { time: '١٠:٠٠ ص', taken: false },
  { time: '١١:٠٠ ص', taken: false },
  { time: '١٢:٠٠ م', taken: true  },
  { time: '١:٠٠ م',  taken: false },
  { time: '٢:٠٠ م',  taken: false },
  { time: '٣:٠٠ م',  taken: true  },
  { time: '٤:٠٠ م',  taken: false },
  { time: '٥:٠٠ م',  taken: false },
];

/* ══════════════════════════════════════════════════════════
   Booking App (inside iPhone)
══════════════════════════════════════════════════════════ */
function BookingApp({ onConfirm }: { onConfirm: (day: string, time: string, name: string) => void }) {
  const [step, setStep] = useState<0|1|2|3>(0);
  const [selDay,  setSelDay]  = useState<number|null>(null);
  const [selTime, setSelTime] = useState<number|null>(null);
  const [name,    setName]    = useState('');
  const [autoRan, setAutoRan] = useState(false);

  useEffect(() => {
    if (autoRan) return;
    const t1 = setTimeout(() => { setSelDay(2);  setStep(1); }, 1000);
    const t2 = setTimeout(() => { setSelTime(1); setStep(2); }, 2100);
    const t3 = setTimeout(() => setAutoRan(true), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [autoRan]);

  const confirm = () => {
    if (!name.trim()) return;
    setStep(3);
    onConfirm(
      selDay !== null ? DAYS[selDay].label : 'الثلاثاء',
      selTime !== null ? SLOTS[selTime].time : '١٠:٠٠ ص',
      name,
    );
  };

  const reset = () => {
    setStep(0); setSelDay(null); setSelTime(null); setName(''); setAutoRan(true);
  };

  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a14', fontFamily: 'Cairo,sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden', color: '#fff' }}>
      {/* Header */}
      <div style={{ padding: '52px 18px 14px', background: `linear-gradient(180deg,${PURPLE}22 0%,transparent 100%)`, flexShrink: 0 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>مايو ٢٠٢٦</div>
        <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 10 }}>احجز موعدك</div>
        {/* Steps */}
        <div style={{ display: 'flex', gap: 5 }}>
          {['اليوم','الوقت','البيانات'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{ height: 3, borderRadius: 99, width: step === 3 ? 26 : i <= step ? 26 : 14, background: step === 3 ? '#10B981' : i <= step ? PURPLE : 'rgba(255,255,255,0.15)', transition: 'all 0.4s' }} />
              <span style={{ fontSize: 8, color: i <= step ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.2)', fontWeight: 700 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="wait">

          {/* Step 0 – Day */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity:0,x:30 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-30 }}
              style={{ padding:'16px 18px', height:'100%', display:'flex', flexDirection:'column', gap:12 }}>
              <div style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.5)' }}>اختر يوم</div>
              <div style={{ display:'flex', gap:7, overflowX:'auto', paddingBottom:2 }}>
                {DAYS.map((d,i) => (
                  <motion.button key={d.date} whileTap={{ scale:0.93 }}
                    onClick={() => { setSelDay(i); setStep(1); setAutoRan(true); }}
                    style={{ flexShrink:0, width:52, padding:'8px 0', borderRadius:12, border:'none', cursor:'pointer', fontFamily:'Cairo,sans-serif', background: selDay===i ? PURPLE : 'rgba(255,255,255,0.07)', color: selDay===i ? '#fff' : 'rgba(255,255,255,0.55)', boxShadow: selDay===i ? `0 4px 16px ${PURPLE}60` : 'none', transition:'all 0.2s' }}>
                    <div style={{ fontSize:16, fontWeight:900 }}>{d.date}</div>
                    <div style={{ fontSize:8, fontWeight:700, opacity:0.7 }}>{d.label}</div>
                  </motion.button>
                ))}
              </div>
              <div style={{ flex:1, display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3 }}>
                {['ح','ن','ث','ر','خ','ج','س'].map(d => (
                  <div key={d} style={{ textAlign:'center', fontSize:8, color:'rgba(255,255,255,0.28)', fontWeight:700, paddingBottom:3 }}>{d}</div>
                ))}
                {Array.from({length:31},(_,i)=>i+1).map(n => (
                  <div key={n} style={{ textAlign:'center', fontSize:10, fontWeight:700, padding:'4px 0', borderRadius:7, background:[18,19,20,21,22].includes(n)?`${PURPLE}28`:'transparent', color:[18,19,20,21,22].includes(n)?PURPLE:'rgba(255,255,255,0.35)' }}>{n}</div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 1 – Time */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity:0,x:30 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-30 }}
              style={{ padding:'16px 18px', height:'100%', display:'flex', flexDirection:'column', gap:8, overflowY:'auto' }}>
              <div style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.5)', flexShrink:0 }}>
                {selDay !== null ? DAYS[selDay].label : ''} · اختر الوقت
              </div>
              {SLOTS.map((s,i) => (
                <motion.button key={s.time} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.04 }}
                  disabled={s.taken} onClick={() => { if(!s.taken){ setSelTime(i); setStep(2); } }}
                  style={{ width:'100%', padding:'11px 14px', borderRadius:12, cursor: s.taken?'default':'pointer', fontFamily:'Cairo,sans-serif', background: s.taken?'rgba(255,255,255,0.03)': selTime===i?`${PURPLE}25`:'rgba(255,255,255,0.06)', border:`1px solid ${s.taken?'rgba(255,255,255,0.05)':selTime===i?`${PURPLE}55`:'rgba(255,255,255,0.09)'}`, display:'flex', alignItems:'center', justifyContent:'space-between', opacity: s.taken?0.38:1, transition:'all 0.15s' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <Clock size={13} color={s.taken?'rgba(255,255,255,0.25)':PURPLE} />
                    <span style={{ fontSize:13, fontWeight:800, color: s.taken?'rgba(255,255,255,0.25)':'#fff' }}>{s.time}</span>
                  </div>
                  {s.taken
                    ? <span style={{ fontSize:9, color:'rgba(255,255,255,0.25)', fontWeight:700 }}>محجوز</span>
                    : <ChevronRight size={13} color={PURPLE} style={{ transform:'scaleX(-1)' }} />}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Step 2 – Details */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity:0,x:30 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-30 }}
              style={{ padding:'16px 18px', display:'flex', flexDirection:'column', gap:12, height:'100%' }}>
              <div style={{ padding:'12px 14px', borderRadius:14, background:`${PURPLE}16`, border:`1px solid ${PURPLE}30` }}>
                <div style={{ display:'flex', gap:12 }}>
                  <div><div style={{ fontSize:8, color:'rgba(255,255,255,0.4)', fontWeight:700 }}>اليوم</div><div style={{ fontSize:12, fontWeight:800 }}>{selDay!==null?DAYS[selDay].label:''}</div></div>
                  <div style={{ width:1, background:'rgba(255,255,255,0.1)' }} />
                  <div><div style={{ fontSize:8, color:'rgba(255,255,255,0.4)', fontWeight:700 }}>الوقت</div><div style={{ fontSize:12, fontWeight:800 }}>{selTime!==null?SLOTS[selTime].time:''}</div></div>
                </div>
              </div>
              <div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.45)', fontWeight:700, marginBottom:5 }}>الاسم</div>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="محمد العمري"
                  style={{ width:'100%', padding:'11px 12px', borderRadius:11, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.06)', color:'#fff', fontFamily:'Cairo,sans-serif', fontSize:13, outline:'none', boxSizing:'border-box', direction:'rtl' }} />
              </div>
              <div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.45)', fontWeight:700, marginBottom:5 }}>رقم الجوال</div>
                <input placeholder="05xxxxxxxx"
                  style={{ width:'100%', padding:'11px 12px', borderRadius:11, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.06)', color:'#fff', fontFamily:'Cairo,sans-serif', fontSize:13, outline:'none', boxSizing:'border-box', direction:'ltr' }} />
              </div>
              <motion.button whileTap={{ scale:0.97 }} onClick={confirm}
                style={{ width:'100%', padding:'13px', borderRadius:13, border:'none', background: name.trim()?`linear-gradient(135deg,${PURPLE},#6D28D9)`:'rgba(255,255,255,0.08)', color:'#fff', fontFamily:'Cairo,sans-serif', fontSize:14, fontWeight:800, cursor:'pointer', boxShadow: name.trim()?`0 8px 22px ${PURPLE}50`:'none', transition:'all 0.3s' }}>
                تأكيد الحجز ←
              </motion.button>
              <button onClick={()=>setStep(1)} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.3)', fontFamily:'Cairo,sans-serif', fontSize:11, cursor:'pointer' }}>← تغيير الوقت</button>
            </motion.div>
          )}

          {/* Step 3 – Done */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity:0,scale:0.96 }} animate={{ opacity:1,scale:1 }}
              style={{ padding:'20px 18px', display:'flex', flexDirection:'column', alignItems:'center', gap:14, height:'100%' }}>
              <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.2, type:'spring', stiffness:280 }}
                style={{ width:58, height:58, borderRadius:'50%', background:'rgba(16,185,129,0.18)', border:'2px solid #10B981', display:'flex', alignItems:'center', justifyContent:'center', marginTop:20 }}>
                <CheckCircle2 size={28} color="#10B981" />
              </motion.div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:17, fontWeight:900, color:'#10B981', marginBottom:5 }}>تم الحجز 🎉</div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', lineHeight:1.7 }}>
                  {selDay!==null?DAYS[selDay].label:''} — {selTime!==null?SLOTS[selTime].time:''}
                  <br/>راح يوصلك تأكيد على واتساب
                </div>
              </div>
              <button onClick={reset} style={{ marginTop:'auto', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:11, padding:'9px 22px', color:'rgba(255,255,255,0.5)', fontFamily:'Cairo,sans-serif', fontSize:11, cursor:'pointer' }}>
                حجز جديد
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div style={{ height:22, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <div style={{ width:76, height:3, borderRadius:99, background:'rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  );
}

/* ── iPhone shell ── */
function PhoneShell({ children }: { children: React.ReactNode }) {
  const W=290, H=630, R=44, B=7;
  return (
    <div style={{ position:'relative', width:W, margin:'0 auto', flexShrink:0 }}>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:W+60, height:H*0.7, background:`radial-gradient(ellipse,${PURPLE}20 0%,transparent 70%)`, filter:'blur(36px)', pointerEvents:'none' }} />
      <div style={{ width:W, height:H, borderRadius:R, background:'linear-gradient(160deg,#2a2a2a 0%,#111 60%,#1e1e1e 100%)', boxShadow:['0 50px 100px rgba(0,0,0,0.7)','inset 0 1px 0 rgba(255,255,255,0.17)','0 0 0 1px rgba(255,255,255,0.06)'].join(','), padding:B, boxSizing:'border-box' }}>
        <div style={{ width:'100%', height:'100%', borderRadius:R-B+2, overflow:'hidden', background:'#0a0a14', position:'relative' }}>
          <div style={{ position:'absolute', top:9, left:'50%', transform:'translateX(-50%)', width:86, height:25, background:'#000', borderRadius:17, zIndex:20, boxShadow:'0 0 0 1.5px rgba(255,255,255,0.07)' }} />
          {children}
        </div>
      </div>
      <div style={{ position:'absolute', top:106, left:-3, width:3, height:26, borderRadius:'3px 0 0 3px', background:'rgba(255,255,255,0.12)' }} />
      <div style={{ position:'absolute', top:142, left:-3, width:3, height:26, borderRadius:'3px 0 0 3px', background:'rgba(255,255,255,0.12)' }} />
      <div style={{ position:'absolute', top:130, right:-3, width:3, height:50, borderRadius:'0 3px 3px 0', background:'rgba(255,255,255,0.12)' }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Apple Watch
══════════════════════════════════════════════════════════ */
function AppleWatch({ bookingDay, bookingTime, pulse }: { bookingDay: string; bookingTime: string; pulse: boolean }) {
  const [screen, setScreen] = useState<'clock'|'booking'|'notif'>('clock');
  const bpm = 72;

  /* cycle through screens */
  useEffect(() => {
    const t1 = setTimeout(()=>setScreen('booking'), 2800);
    const t2 = setTimeout(()=>setScreen('notif'),   5600);
    const t3 = setTimeout(()=>setScreen('clock'),   8400);
    return ()=>{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  /* trigger when booking confirmed */
  useEffect(() => {
    if (pulse) { setScreen('notif'); }
  }, [pulse]);

  const W=148, H=175, R=38;
  const accent = pulse ? '#10B981' : PURPLE;

  return (
    <div style={{ position:'relative', width:W, margin:'0 auto' }}>
      {/* Glow */}
      <motion.div animate={{ opacity:[0.4,0.8,0.4] }} transition={{ duration:2, repeat:Infinity }}
        style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:W+30, height:H+30, background:`radial-gradient(ellipse,${accent}30 0%,transparent 70%)`, filter:'blur(20px)', pointerEvents:'none', borderRadius:50, transition:'background 0.6s' }} />

      {/* Body */}
      <div style={{ position:'relative', width:W, height:H, borderRadius:R, background:'linear-gradient(160deg,#363638 0%,#1c1c1e 60%,#2a2a2c 100%)', boxShadow:['0 24px 60px rgba(0,0,0,0.7)','inset 0 1px 0 rgba(255,255,255,0.14)','inset 0 -1px 0 rgba(0,0,0,0.4)','0 0 0 1px rgba(255,255,255,0.07)'].join(','), padding:5, boxSizing:'border-box' }}>

        {/* Screen */}
        <div style={{ width:'100%', height:'100%', borderRadius:R-4, background:'#000', overflow:'hidden', position:'relative' }}>
          <AnimatePresence mode="wait">

            {/* Clock face */}
            {screen === 'clock' && (
              <motion.div key="clock" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                style={{ width:'100%', height:'100%', background:'radial-gradient(ellipse at 50% 30%,#1a0a30 0%,#0a0010 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, padding:'0 12px' }}>
                {/* Time */}
                <div style={{ fontSize:36, fontWeight:900, color:'#fff', letterSpacing:'-0.04em', lineHeight:1, fontFamily:'ui-monospace,monospace' }}>٩:٤١</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.45)', fontWeight:600 }}>الثلاثاء ٢٠ مايو</div>
                {/* Complications */}
                <div style={{ display:'flex', gap:8, marginTop:6 }}>
                  <div style={{ padding:'4px 8px', borderRadius:8, background:`${PURPLE}25`, border:`1px solid ${PURPLE}40`, fontSize:8, fontWeight:700, color:PURPLE }}>
                    📅 حجز ١١:٠٠
                  </div>
                  <div style={{ padding:'4px 8px', borderRadius:8, background:'rgba(255,59,48,0.18)', border:'1px solid rgba(255,59,48,0.3)', fontSize:8, fontWeight:700, color:'#FF3B30', display:'flex', alignItems:'center', gap:3 }}>
                    <Heart size={8} fill="#FF3B30" color="#FF3B30" /> {bpm}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Booking screen */}
            {screen === 'booking' && (
              <motion.div key="booking" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
                style={{ width:'100%', height:'100%', background:'#0a0018', display:'flex', flexDirection:'column', padding:'14px 12px', gap:6 }}>
                <div style={{ fontSize:8, color:'rgba(255,255,255,0.4)', fontWeight:700 }}>الحجز القادم</div>
                <div style={{ fontSize:22, fontWeight:900, color:PURPLE, letterSpacing:'-0.03em', lineHeight:1 }}>{bookingTime || '١١:٠٠ ص'}</div>
                <div style={{ fontSize:10, fontWeight:700, color:'#fff' }}>{bookingDay || 'الثلاثاء'}</div>
                <div style={{ flex:1 }} />
                {/* Ring progress */}
                <div style={{ display:'flex', gap:5, alignItems:'center' }}>
                  <svg width="32" height="32" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="4"/>
                    <circle cx="18" cy="18" r="14" fill="none" stroke={PURPLE} strokeWidth="4"
                      strokeDasharray={`${0.72*88} ${88}`} strokeDashoffset="22" strokeLinecap="round" transform="rotate(-90 18 18)"/>
                  </svg>
                  <div>
                    <div style={{ fontSize:9, fontWeight:800, color:'#fff' }}>٧٢٪ مكتملة</div>
                    <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', fontWeight:600 }}>الجلسات هذا الأسبوع</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notification */}
            {screen === 'notif' && (
              <motion.div key="notif" initial={{ opacity:0, scale:0.94 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                style={{ width:'100%', height:'100%', background:'#000', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'12px', gap:8 }}>
                <motion.div animate={{ scale:[1,1.15,1], rotate:[0,8,-8,0] }} transition={{ duration:0.5, delay:0.2 }}
                  style={{ width:36, height:36, borderRadius:10, background: pulse?'rgba(16,185,129,0.25)':`${PURPLE}25`, border: `2px solid ${pulse?'#10B981':PURPLE}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                  {pulse ? '✅' : '📅'}
                </motion.div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:10, fontWeight:900, color:'#fff', marginBottom:3 }}>
                    {pulse ? 'تم الحجز!' : 'تذكير'}
                  </div>
                  <div style={{ fontSize:8, color:'rgba(255,255,255,0.5)', lineHeight:1.5, fontFamily:'Cairo,sans-serif' }}>
                    {pulse ? `موعدك ${bookingDay} — ${bookingTime}` : `موعدك غداً الساعة ${bookingTime||'١١:٠٠ ص'}`}
                  </div>
                </div>
                {/* Haptic dots */}
                <div style={{ display:'flex', gap:4 }}>
                  {[0,1,2].map(i=>(
                    <motion.div key={i} animate={{ scale:[1,1.4,1], opacity:[0.4,1,0.4] }} transition={{ duration:0.6, delay:i*0.15, repeat:2 }}
                      style={{ width:5, height:5, borderRadius:'50%', background: pulse?'#10B981':PURPLE }} />
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Digital Crown */}
      <div style={{ position:'absolute', top:'30%', right:-5, width:5, height:28, borderRadius:3, background:'linear-gradient(to right,#555,#3a3a3a)', boxShadow:'0 1px 4px rgba(0,0,0,0.6)' }} />
      {/* Side button */}
      <div style={{ position:'absolute', top:'52%', right:-5, width:5, height:16, borderRadius:3, background:'linear-gradient(to right,#555,#3a3a3a)', boxShadow:'0 1px 4px rgba(0,0,0,0.6)' }} />

      {/* Band top */}
      <div style={{ position:'absolute', top:-38, left:'50%', transform:'translateX(-50%)', width:110, height:42, background:'linear-gradient(to bottom,#1a1a1a,#2a2a2a)', borderRadius:'14px 14px 0 0', zIndex:-1, boxShadow:'inset 0 1px 0 rgba(255,255,255,0.06)' }} />
      {/* Band bottom */}
      <div style={{ position:'absolute', bottom:-38, left:'50%', transform:'translateX(-50%)', width:110, height:42, background:'linear-gradient(to top,#1a1a1a,#2a2a2a)', borderRadius:'0 0 14px 14px', zIndex:-1, boxShadow:'inset 0 -1px 0 rgba(255,255,255,0.04)' }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Notification Cards (stacked like iOS notification center)
══════════════════════════════════════════════════════════ */
function NotificationsPanel({ bookingDay, bookingTime, name, confirmed }: {
  bookingDay: string; bookingTime: string; name: string; confirmed: boolean;
}) {
  const NOTIFS = [
    {
      id: 'confirm',
      show: confirmed,
      icon: '✅',
      iconBg: 'rgba(16,185,129,0.25)',
      iconBorder: '#10B981',
      app: 'الحجوزات',
      time: 'الآن',
      title: `تم تأكيد حجزك يا ${name || 'محمد'}`,
      body: `${bookingDay || 'الثلاثاء'} — ${bookingTime || '١١:٠٠ ص'} ✓`,
    },
    {
      id: 'whatsapp',
      show: true,
      icon: (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      iconBg: 'rgba(37,211,102,0.25)',
      iconBorder: '#25D366',
      app: 'واتساب',
      time: 'قبل ساعة',
      title: 'تذكير بموعدك غداً',
      body: `"موعدك الساعة ${bookingTime||'١١:٠٠ ص'} — نتطلع لرؤيتك 🤍"`,
    },
    {
      id: 'watch',
      show: true,
      icon: '⌚',
      iconBg: `${PURPLE}25`,
      iconBorder: PURPLE,
      app: 'Apple Watch',
      time: 'قبل ٣ دقائق',
      title: 'نبضة تذكير',
      body: 'موعدك اليوم الساعة ٣:٠٠ م — اضغط للتفاصيل',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', marginBottom: 4 }}>
        الإشعارات
      </div>
      {NOTIFS.map((n, idx) => (
        <AnimatePresence key={n.id}>
          {n.show && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: n.id === 'confirm' ? 0.3 : idx * 0.1, type: 'spring', stiffness: 300, damping: 28 }}
              style={{
                padding: '12px 14px',
                borderRadius: 16,
                background: 'rgba(255,255,255,0.06)',
                border: `1px solid ${n.id==='confirm' && confirmed ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.1)'}`,
                backdropFilter: 'blur(20px)',
                boxShadow: n.id==='confirm' && confirmed ? '0 8px 24px rgba(16,185,129,0.15)' : '0 4px 16px rgba(0,0,0,0.3)',
                display: 'flex', gap: 12, alignItems: 'flex-start',
                transition: 'border 0.4s, box-shadow 0.4s',
              }}>
              {/* Icon */}
              <div style={{ width: 36, height: 36, borderRadius: 10, background: n.iconBg, border: `1.5px solid ${n.iconBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 17 }}>
                {n.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.55)' }}>{n.app}</span>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{n.time}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 2, fontFamily: 'Cairo,sans-serif' }}>{n.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, fontFamily: 'Cairo,sans-serif' }}>{n.body}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Main Section
══════════════════════════════════════════════════════════ */
export default function BookingsSection() {
  const [bookingDay,  setBookingDay]  = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [confirmed,   setConfirmed]   = useState(false);

  const handleConfirm = (day: string, time: string, name: string) => {
    setBookingDay(day); setBookingTime(time); setBookingName(name);
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 6000);
  };

  return (
    <section id="bookings" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width:500,height:500,top:'15%',right:'-8%',background:`${PURPLE}07`,animationDelay:'-1s' }} />
      <div className="orb" style={{ width:400,height:400,bottom:'5%',left:'-8%',background:'rgba(245,158,11,0.05)',animationDelay:'-5s' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <motion.div initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
          style={{ textAlign:'center', marginBottom:64 }}>
          <div className="section-label" style={{ color:PURPLE, borderColor:`${PURPLE}40`, background:`${PURPLE}10` }}>
            نظام الحجوزات
          </div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(2rem,4vw,3.2rem)', letterSpacing:'-0.03em', lineHeight:1.1 }}>
            حجوزات{' '}
            <span style={{ background:`linear-gradient(135deg,${PURPLE},#06B6D4)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              تشتغل وحدها
            </span>
          </h2>
          <p style={{ color:'var(--text2)', fontSize:16, marginTop:14, maxWidth:500, margin:'14px auto 0' }}>
            احجز من الجوال، واستقبل تأكيداً على الواتساب وساعة Apple — كل شيء تلقائي.
          </p>
        </motion.div>

        {/* ── Three-column layout ── */}
        <div className="bookings-3col">

          {/* Col 1 — iPhone */}
          <motion.div initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
            <PhoneShell>
              <BookingApp onConfirm={handleConfirm} />
            </PhoneShell>
            <div style={{ textAlign:'center', marginTop:12, fontSize:11, color:'var(--text3)', fontWeight:600 }}>
              📱 جرّب الحجز — تفاعلي
            </div>
          </motion.div>

          {/* Col 2 — Watch + Notifications */}
          <motion.div initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.12 }}
            style={{ display:'flex', flexDirection:'column', gap:28, alignItems:'center', justifyContent:'center' }}>
            <div>
              <AppleWatch bookingDay={bookingDay} bookingTime={bookingTime} pulse={confirmed} />
              <div style={{ textAlign:'center', marginTop:10, fontSize:11, color:'var(--text3)', fontWeight:600 }}>
                ⌚ Apple Watch — نبضة تذكير
              </div>
            </div>
            <NotificationsPanel bookingDay={bookingDay} bookingTime={bookingTime} name={bookingName} confirmed={confirmed} />
          </motion.div>

          {/* Col 3 — Features + stats */}
          <motion.div initial={{ opacity:0,x:30 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}
            style={{ display:'flex', flexDirection:'column', gap:14, justifyContent:'center' }}>

            {/* Feature cards */}
            {[
              { icon: Bell,          color:'#F59E0B', title:'تذكيرات تلقائية',  desc:'واتساب + ساعة Apple قبل الموعد' },
              { icon: MessageSquare, color:'#25D366', title:'تأكيد واتساب',     desc:'فوري بعد كل حجز' },
              { icon: BarChart3,     color:PURPLE,    title:'لوحة تحكم',         desc:'كل الحجوزات في مكان واحد' },
              { icon: Users,         color:'#3B82F6', title:'إدارة العملاء',     desc:'تاريخ وتفضيلات كل عميل' },
            ].map(({ icon:Icon, color, title, desc }) => (
              <div key={title} className="glass" style={{ padding:'14px 16px', display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ width:34,height:34,borderRadius:10,background:`${color}15`,border:`1px solid ${color}30`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                  <Icon size={16} color={color} />
                </div>
                <div>
                  <div style={{ fontWeight:800, fontSize:13, marginBottom:2 }}>{title}</div>
                  <div style={{ fontSize:11, color:'var(--text2)', lineHeight:1.5 }}>{desc}</div>
                </div>
              </div>
            ))}

            {/* Stats */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
              {[
                { val:'٩٥٪', label:'نسبة الحضور', color:'#10B981', icon:TrendingUp },
                { val:'٦٠ث', label:'وقت الحجز',   color:PURPLE,    icon:Clock },
                { val:'٢٤/٧', label:'متاح دائماً', color:'#F59E0B', icon:Bell },
              ].map(({ val,label,color,icon:Icon }) => (
                <div key={label} style={{ padding:'12px 10px', borderRadius:12, background:`${color}10`, border:`1px solid ${color}25`, textAlign:'center' }}>
                  <Icon size={12} color={color} style={{ margin:'0 auto 4px' }} />
                  <div style={{ fontSize:16,fontWeight:900,color,lineHeight:1 }}>{val}</div>
                  <div style={{ fontSize:8,color:'var(--text3)',fontWeight:700,marginTop:3 }}>{label}</div>
                </div>
              ))}
            </div>

            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-purple"
              style={{ justifyContent:'center', textAlign:'center', display:'flex', alignItems:'center', gap:8 }}>
              ابني نظام حجوزاتي
              <ArrowRight size={15} style={{ transform:'scaleX(-1)' }} />
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        .bookings-3col {
          display: grid;
          grid-template-columns: auto auto 1fr;
          gap: 40px;
          align-items: center;
        }
        @media (max-width: 1024px) {
          .bookings-3col {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
          .bookings-3col > *:last-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 680px) {
          .bookings-3col {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .bookings-3col > *:last-child {
            grid-column: auto;
          }
        }
      `}</style>
    </section>
  );
}
