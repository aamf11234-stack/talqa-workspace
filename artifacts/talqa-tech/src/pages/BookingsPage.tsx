import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from './PageLayout';
import BookingsSection from '../components/BookingsSection';
import BookingBuilder from '../components/BookingBuilder';
import BookingsWebDemo from '../components/BookingsWebDemo';

const WA = 'https://wa.me/966551378531?text=أبي%20نظام%20حجوزات%20لمشروعي';

const SECTORS_SUPPORTED = [
  { icon:'🏥', name:'عيادات', color:'#059669', stat:'↓٩٠٪ غياب' },
  { icon:'💇', name:'صالونات', color:'#EC4899', stat:'↑٦٠٪ إشغال' },
  { icon:'🏋️', name:'نوادي رياضية', color:'#F59E0B', stat:'↑٨٠٪ تجديد' },
  { icon:'🍽️', name:'مطاعم', color:'#DC2626', stat:'↑٧٠٪ حجوزات' },
  { icon:'🏨', name:'فنادق', color:'#8B5CF6', stat:'↓٤٠٪ إلغاء' },
  { icon:'📚', name:'مراكز تعليمية', color:'#3B82F6', stat:'↑٥٠٪ التزام' },
];

const FEATURES = [
  { icon:'📅', title:'بدون تضارب', desc:'الكالندر الذكي يمنع الحجوزات المتداخلة تلقائياً — صفر مواعيد مزدوجة للأبد.' },
  { icon:'📱', title:'واتساب + Apple Watch', desc:'تأكيد الحجز على واتساب وتنبيه على Apple Watch قبل الموعد — العميل لا ينسى.' },
  { icon:'⚡', title:'لحظي بالكامل', desc:'العميل يحجز، أنت تتلقى إشعاراً في ثوانٍ — لوحة تحكم مباشرة.' },
  { icon:'🔄', title:'إلغاء وإعادة جدولة', desc:'العميل يعدّل موعده بنفسه بدون اتصال — يوفّر وقت فريقك ويرفع رضاه.' },
  { icon:'💳', title:'دفع مسبق اختياري', desc:'استقبل الدفع عند الحجز عبر Apple Pay أو STC Pay — قلّل الإلغاءات المجانية.' },
  { icon:'📊', title:'تحليلات الإشغال', desc:'أوقات الذروة والساعات الفارغة بالرسوم — خطط جدولك بدلاً من التخمين.' },
  { icon:'🌍', title:'متعدد الفروع', desc:'فرع واحد أو عشرة — نظام واحد يدير كل المواعيد مع تقارير لكل فرع.' },
  { icon:'🤖', title:'تذكير ذكي بالـ AI', desc:'يتعلم عادات عملائك ويرسل التذكير في اللحظة الأنسب — بدون إزعاج.' },
];

const LIVE_BOOKINGS = [
  { name:'أحمد المطيري',    service:'فحص أسنان',        time:'الآن',    color:'#059669' },
  { name:'سارة الأحمدي',   service:'تنظيف بشرة',       time:'٣ د',     color:'#EC4899' },
  { name:'محمد الشمري',    service:'حصة تدريبية',      time:'٧ د',     color:'#F59E0B' },
  { name:'نورة السويلم',   service:'قص شعر',           time:'١٢ د',    color:'#8B5CF6' },
  { name:'فهد الدوسري',    service:'فحص بصري',         time:'١٨ د',    color:'#0EA5E9' },
  { name:'ريم الغامدي',    service:'جلسة تدليك',       time:'٢٤ د',    color:'#10B981' },
];

const RESULTS = [
  { n:'↓٩٠٪', label:'انخفاض الغياب', icon:'📉' },
  { n:'↑٧٠٪', label:'زيادة الحجوزات', icon:'📈' },
  { n:'٣×',   label:'توفير في وقت الفريق', icon:'⏱️' },
  { n:'+٤.٨',  label:'متوسط تقييم العملاء', icon:'⭐' },
];

export default function BookingsPage() {
  const [liveTick, setLiveTick] = useState(0);
  const [counter, setCounter] = useState(2847);
  useEffect(() => {
    const t1 = setInterval(() => setLiveTick(t => (t+1) % LIVE_BOOKINGS.length), 3000);
    const t2 = setInterval(() => setCounter(c => c + Math.floor(Math.random()*3+1)), 8000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <PageLayout accent="#059669">
      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', overflow:'hidden', padding:'100px 24px 60px' }}>
        <div style={{ position:'absolute', left:'4%', top:'8%', width:500, height:500, borderRadius:'50%',
          background:'#059669', filter:'blur(200px)', opacity:0.1, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', right:'4%', bottom:'10%', width:350, height:350, borderRadius:'50%',
          background:'#065F46', filter:'blur(160px)', opacity:0.12, pointerEvents:'none' }}/>

        <div style={{ position:'relative', zIndex:2, maxWidth:1100, width:'100%', display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:60, alignItems:'center' }}>

          {/* Text */}
          <div>
            <motion.div initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
              transition={{ type:'spring', stiffness:220 }}
              style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:28, padding:'10px 22px',
                borderRadius:28, background:'rgba(5,150,105,0.1)', border:'1px solid rgba(5,150,105,0.3)' }}>
              <span style={{ fontSize:22 }}>📅</span>
              <span style={{ fontSize:13, fontWeight:800, color:'#34D399', letterSpacing:0.3 }}>نظام الحجوزات الذكي</span>
            </motion.div>

            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
              style={{ fontWeight:900, fontSize:'clamp(2.6rem,6vw,5rem)', letterSpacing:'-0.045em', lineHeight:1.0, marginBottom:20 }}>
              <span style={{ color:'#fff', display:'block' }}>حجوزات بلا</span>
              <span style={{ background:'linear-gradient(135deg,#34D399,#06B6D4)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display:'block' }}>
                فوضى ولا غياب</span>
            </motion.h1>

            <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
              style={{ fontSize:16, color:'var(--text2)', lineHeight:1.8, marginBottom:32, maxWidth:460 }}>
              العميل يحجز من جواله، يتلقى تأكيداً على واتساب وتنبيهاً على Apple Watch — والغياب يختفي من قاموسك.
            </motion.p>

            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
              style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:36 }}>
              <motion.a href={WA} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.04, boxShadow:'0 20px 50px rgba(5,150,105,0.45)' }} whileTap={{ scale:0.97 }}
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'16px 36px', borderRadius:14,
                  background:'linear-gradient(135deg,#059669,#065F46)', color:'#fff',
                  fontFamily:'Cairo,sans-serif', fontSize:15, fontWeight:900, textDecoration:'none',
                  boxShadow:'0 12px 36px rgba(5,150,105,0.4)' }}>ابدأ الآن ←</motion.a>
            </motion.div>

            {/* Results */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8 }}>
              {RESULTS.map((r,i) => (
                <motion.div key={i} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4+i*0.08 }}
                  style={{ padding:'12px 14px', borderRadius:12, background:'rgba(5,150,105,0.08)',
                    border:'1px solid rgba(5,150,105,0.2)', display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:18 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize:18, fontWeight:900, color:'#34D399', letterSpacing:-0.5 }}>{r.n}</div>
                    <div style={{ fontSize:10, color:'var(--text2)', lineHeight:1.3 }}>{r.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Live feed */}
          <div>
            {/* Counter */}
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.4 }}
              style={{ marginBottom:20, padding:'20px 24px', borderRadius:18,
                background:'rgba(5,150,105,0.08)', border:'1px solid rgba(5,150,105,0.2)', textAlign:'center' }}>
              <div style={{ fontSize:11, color:'#34D399', fontWeight:700, letterSpacing:1, marginBottom:6 }}>إجمالي الحجوزات عبر نظامنا</div>
              <div style={{ fontSize:42, fontWeight:900, color:'#fff', letterSpacing:-2 }}>{counter.toLocaleString('ar-SA')}</div>
              <div style={{ fontSize:11, color:'var(--text3)', marginTop:4 }}>حجز مؤكّد حتى الآن</div>
            </motion.div>

            {/* Live booking feed */}
            <div style={{ padding:'20px', borderRadius:18, background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.07)', overflow:'hidden' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                <span style={{ fontSize:12, fontWeight:800, color:'#fff' }}>حجوزات لحظية</span>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:'#10B981',
                    boxShadow:'0 0 8px #10B981', animation:'pulse 2s infinite' }}/>
                  <span style={{ fontSize:10, color:'#10B981', fontWeight:700 }}>مباشر</span>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {LIVE_BOOKINGS.map((b,i) => (
                  <motion.div key={i}
                    animate={{ opacity: i===liveTick?1:0.4, x: i===liveTick?0:4 }}
                    transition={{ duration:0.3 }}
                    style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px',
                      borderRadius:10, background: i===liveTick?`${b.color}10`:'transparent',
                      border: `1px solid ${i===liveTick?b.color+'30':'rgba(255,255,255,0.05)'}`,
                      transition:'background 0.3s,border 0.3s' }}>
                    <div style={{ width:32, height:32, borderRadius:'50%', background:`${b.color}20`,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, flexShrink:0, fontWeight:700, color:b.color }}>
                      {b.name[0]}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, fontWeight:700, color:'#fff' }}>{b.name}</div>
                      <div style={{ fontSize:10, color:'var(--text3)' }}>{b.service}</div>
                    </div>
                    <AnimatePresence>
                      {i===liveTick&&(
                        <motion.div initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}
                          style={{ padding:'3px 8px', borderRadius:6, background:`${b.color}20`,
                            fontSize:10, fontWeight:700, color:b.color, whiteSpace:'nowrap' }}>
                          {b.time === 'الآن' ? '✓ الآن' : `منذ ${b.time}`}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.2, repeat:Infinity }}
          style={{ position:'absolute', bottom:32, fontSize:22, opacity:0.25 }}>↓</motion.div>
      </section>

      <BookingsWebDemo />

      {/* ── SECTORS ── */}
      <section style={{ padding:'clamp(60px,8vw,100px) 24px', background:'var(--bg2)' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:48 }}>
            <div className="section-label" style={{ color:'#34D399', borderColor:'rgba(52,211,153,0.3)',
              background:'rgba(52,211,153,0.08)', marginBottom:16 }}>🏢 القطاعات</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>يعمل في كل القطاعات</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:12 }}>
            {SECTORS_SUPPORTED.map((s,i) => (
              <motion.div key={i} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.08 }}
                whileHover={{ y:-5 }}
                style={{ padding:'18px 14px', borderRadius:14, textAlign:'center',
                  background:`${s.color}08`, border:`1px solid ${s.color}20`,
                  transition:'transform 0.2s' }}>
                <div style={{ fontSize:26, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontSize:12, fontWeight:800, color:'#fff', marginBottom:4 }}>{s.name}</div>
                <div style={{ fontSize:10.5, fontWeight:700, color:s.color }}>{s.stat}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:52 }}>
            <div className="section-label" style={{ color:'#34D399', borderColor:'rgba(52,211,153,0.3)',
              background:'rgba(52,211,153,0.08)', marginBottom:16 }}>✨ المزايا</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>كل ما تحتاجه من أول يوم</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:14 }}>
            {FEATURES.map((f,i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.07 }}
                whileHover={{ y:-5 }}
                style={{ padding:'22px', borderRadius:16, background:'rgba(255,255,255,0.03)',
                  border:'1px solid rgba(255,255,255,0.07)', transition:'transform 0.2s' }}>
                <div style={{ fontSize:26, marginBottom:10 }}>{f.icon}</div>
                <div style={{ fontSize:13.5, fontWeight:800, color:'#fff', marginBottom:6 }}>{f.title}</div>
                <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.7 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BookingBuilder />

      <BookingsSection />

      {/* ── CTA ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', textAlign:'center',
        background:'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(5,150,105,0.12) 0%,transparent 70%)' }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div style={{ fontSize:52, marginBottom:20 }}>📅</div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff', marginBottom:14 }}>
            وصّفر الغياب من يومها</h2>
          <p style={{ fontSize:16, color:'var(--text2)', marginBottom:36, maxWidth:420, margin:'0 auto 36px' }}>
            تواصل معنا — نشوف وضع مشروعك ونقترح الحل الأنسب.</p>
          <motion.a href={WA} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05, boxShadow:'0 20px 50px rgba(5,150,105,0.45)' }} whileTap={{ scale:0.97 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'17px 44px', borderRadius:16,
              background:'linear-gradient(135deg,#059669,#065F46)', color:'#fff',
              fontFamily:'Cairo,sans-serif', fontSize:17, fontWeight:900, textDecoration:'none',
              boxShadow:'0 16px 48px rgba(5,150,105,0.45)' }}>ابدأ الآن على واتساب ←</motion.a>
        </motion.div>
      </section>
    </PageLayout>
  );
}
