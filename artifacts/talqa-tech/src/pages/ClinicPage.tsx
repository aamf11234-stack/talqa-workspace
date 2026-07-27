import { motion } from 'framer-motion';
import PageLayout from './PageLayout';
import ClinicSection from '../components/ClinicSection';
import LiveDemo from '../components/LiveDemo';

const WA = 'https://wa.me/966551378531?text=أبي%20نظام%20عيادة%20لمشروعي';

const PAIN_POINTS = [
  { icon:'😤', problem:'المريض ينسى موعده',    color:'#EF4444', solution:'تذكير تلقائي على واتساب قبل ٢٤ ساعة و٢ ساعة' },
  { icon:'😩', problem:'ازدحام الاستقبال',     color:'#F59E0B', solution:'الحجز الذكي يوزع المواعيد ويمنع التكدّس' },
  { icon:'😰', problem:'ملفات المرضى المبعثرة', color:'#8B5CF6', solution:'سجل طبي رقمي مرتّب وسهل الوصول' },
  { icon:'😣', problem:'مواعيد متضاربة',       color:'#EC4899', solution:'كالندر ذكي يمنع التداخل تلقائياً — صفر تضارب' },
];

const FEATURES = [
  { icon:'📅', title:'حجز ذكي',              color:'#059669', desc:'المريض يحجز من جواله — الكالندر يتحدث فوراً، بدون مكالمات.' },
  { icon:'💳', title:'Apple Wallet موعد',    color:'#8B5CF6', desc:'بطاقة الموعد في Apple Wallet — بـ QR للتحقق من الوصول.' },
  { icon:'📱', title:'تذكيرات واتساب',        color:'#25D366', desc:'تذكير تلقائي قبل ٢٤ ساعة والتأكيد لحظي — الغياب يختفي.' },
  { icon:'🩺', title:'سجل طبي رقمي',         color:'#0EA5E9', desc:'تاريخ المريض، الوصفات، والتقارير — كلها في مكان واحد.' },
  { icon:'🤖', title:'AI استقبال ذكي',       color:'#10B981', desc:'بوت واتساب يرد على أسئلة المرضى ٢٤/٧ ويحجز المواعيد.' },
  { icon:'📊', title:'لوحة تحكم الطبيب',    color:'#F59E0B', desc:'جدول يومي، إحصائيات المرضى، ونسبة الغياب — كل شيء بنظرة.' },
  { icon:'🌐', title:'حجز من الموقع',        color:'#6366F1', desc:'زر الحجز على موقعك أو إنستغرام يربط مباشرةً بالنظام.' },
  { icon:'📞', title:'متابعة ما بعد الزيارة', color:'#EC4899', desc:'يرسل تعليمات ما بعد الكشف ويتابع حالة المريض تلقائياً.' },
];

const RESULTS = [
  { n:'↓٩٠٪', label:'انخفاض الغياب',         icon:'📉' },
  { n:'↑٦٠٪', label:'رضا المرضى',            icon:'⭐' },
  { n:'٣×',   label:'توفير وقت الاستقبال',   icon:'⏱️' },
  { n:'صفر',  label:'تضارب في المواعيد',     icon:'✅' },
];

const QUOTE = { name:'د. خالد العمري', title:'طبيب أسنان — الرياض', text:'قبل النظام كانت موظفة الاستقبال تمضي وقتها في مكالمات التذكير. الآن النظام يتكفل بكل شيء وهي تركّز على الترحيب بالمرضى — الغياب انخفض ٩٢٪.' };

// Timeline of patient journey
const JOURNEY = [
  { icon:'📱', step:'يحجز من جواله',       sub:'موقع أو واتساب' },
  { icon:'✅', step:'تأكيد فوري',           sub:'رسالة واتساب' },
  { icon:'💳', step:'بطاقة Apple Wallet',  sub:'بلمسة واحدة' },
  { icon:'🔔', step:'تذكير تلقائي',        sub:'قبل ٢٤ ساعة' },
  { icon:'🏥', step:'وصول وتسجيل',         sub:'QR code سريع' },
  { icon:'🩺', step:'الكشف',               sub:'سجل طبي رقمي' },
  { icon:'📋', step:'تعليمات ما بعد',      sub:'واتساب تلقائي' },
];

export default function ClinicPage() {
  return (
    <PageLayout accent="#059669">
      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', overflow:'hidden', padding:'100px 24px 60px' }}>
        <div style={{ position:'absolute', right:'5%', top:'10%', width:600, height:600, borderRadius:'50%',
          background:'#059669', filter:'blur(220px)', opacity:0.1, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', left:'8%', bottom:'15%', width:400, height:400, borderRadius:'50%',
          background:'#0EA5E9', filter:'blur(160px)', opacity:0.07, pointerEvents:'none' }}/>
        {/* ECG line */}
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.05, pointerEvents:'none' }}>
          <motion.path d="M 0 60% L 30% 60% L 32% 30% L 34% 90% L 36% 60% L 100% 60%"
            fill="none" stroke="#059669" strokeWidth="2"
            animate={{ pathLength:[0,1] }} transition={{ duration:4, repeat:Infinity, ease:'linear' }}/>
        </svg>

        <div style={{ position:'relative', zIndex:2, maxWidth:1100, width:'100%', display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:60, alignItems:'center' }}>

          {/* Text */}
          <div>
            <motion.div initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
              transition={{ type:'spring', stiffness:220 }}
              style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:28, padding:'10px 22px',
                borderRadius:28, background:'rgba(5,150,105,0.1)', border:'1px solid rgba(5,150,105,0.3)' }}>
              <span style={{ fontSize:22 }}>🏥</span>
              <span style={{ fontSize:13, fontWeight:800, color:'#34D399', letterSpacing:0.3 }}>منظومة العيادات الذكية</span>
            </motion.div>

            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
              style={{ fontWeight:900, fontSize:'clamp(2.6rem,6vw,5rem)', letterSpacing:'-0.045em', lineHeight:1.0, marginBottom:20 }}>
              <span style={{ color:'#fff', display:'block' }}>عيادتك</span>
              <span style={{ background:'linear-gradient(135deg,#34D399,#60A5FA)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display:'block' }}>
                بدون فوضى</span>
            </motion.h1>

            <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
              style={{ fontSize:16, color:'var(--text2)', lineHeight:1.8, marginBottom:32, maxWidth:460 }}>
              نظام طبي متكامل — حجز ذكي، Apple Wallet لمواعيد المرضى، AI استقبال، وسجل طبي رقمي. كل شيء في منصة واحدة.
            </motion.p>

            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
              style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:32 }}>
              <motion.a href={WA} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.04, boxShadow:'0 20px 50px rgba(5,150,105,0.45)' }} whileTap={{ scale:0.97 }}
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'16px 36px', borderRadius:14,
                  background:'linear-gradient(135deg,#059669,#047857)', color:'#fff',
                  fontFamily:'Cairo,sans-serif', fontSize:15, fontWeight:900, textDecoration:'none',
                  boxShadow:'0 12px 36px rgba(5,150,105,0.4)' }}>ابدأ التحول الرقمي ←</motion.a>
            </motion.div>

            {/* Results grid */}
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

          {/* Pain points → solutions */}
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <div style={{ fontSize:12, fontWeight:700, color:'var(--text3)', marginBottom:4, letterSpacing:0.5 }}>المشاكل التي نحلّها</div>
            {PAIN_POINTS.map((p,i) => (
              <motion.div key={i} initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5+i*0.1 }}
                style={{ padding:'16px', borderRadius:14, background:`${p.color}08`,
                  border:`1px solid ${p.color}20`, display:'flex', flexDirection:'column', gap:7 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:18 }}>{p.icon}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:`${p.color}dd` }}>{p.problem}</span>
                </div>
                <div style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
                  <span style={{ color:'#34D399', fontSize:13, flexShrink:0, marginTop:1 }}>→</span>
                  <span style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6 }}>{p.solution}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.2, repeat:Infinity }}
          style={{ position:'absolute', bottom:32, fontSize:22, opacity:0.25 }}>↓</motion.div>
      </section>

      {/* ── PATIENT JOURNEY ── */}
      <section style={{ padding:'clamp(60px,8vw,100px) 24px', background:'var(--bg2)', overflowX:'hidden' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:44 }}>
            <div className="section-label" style={{ color:'#34D399', borderColor:'rgba(52,211,153,0.3)',
              background:'rgba(52,211,153,0.08)', marginBottom:16 }}>🗺️ رحلة المريض</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>من الحجز إلى ما بعد الزيارة</h2>
          </motion.div>
          <div style={{ display:'flex', overflowX:'auto', gap:0, paddingBottom:12, scrollbarWidth:'none' }}>
            {JOURNEY.map((j,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', flexShrink:0 }}>
                <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ delay:i*0.1 }}
                  style={{ padding:'18px 14px', borderRadius:14, textAlign:'center', minWidth:110,
                    background:'rgba(5,150,105,0.06)', border:'1px solid rgba(5,150,105,0.18)' }}>
                  <div style={{ fontSize:24, marginBottom:7 }}>{j.icon}</div>
                  <div style={{ fontSize:11.5, fontWeight:800, color:'#fff', marginBottom:4 }}>{j.step}</div>
                  <div style={{ fontSize:10, color:'var(--text3)' }}>{j.sub}</div>
                </motion.div>
                {i < JOURNEY.length-1 && (
                  <div style={{ width:24, textAlign:'center', color:'rgba(52,211,153,0.4)', fontSize:14, flexShrink:0 }}>→</div>
                )}
              </div>
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
              background:'rgba(52,211,153,0.08)', marginBottom:16 }}>✨ مزايا النظام</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>كل ما تحتاجه — جاهز من اليوم الأول</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:14 }}>
            {FEATURES.map((f,i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.07 }}
                whileHover={{ y:-6, boxShadow:`0 20px 48px ${f.color}20` }}
                style={{ padding:'22px', borderRadius:16, background:'rgba(255,255,255,0.03)',
                  border:`1px solid ${f.color}20`, transition:'box-shadow 0.25s,transform 0.25s' }}>
                <div style={{ width:38, height:38, borderRadius:9, background:`${f.color}18`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, marginBottom:10 }}>{f.icon}</div>
                <div style={{ fontSize:13.5, fontWeight:800, color:'#fff', marginBottom:6 }}>{f.title}</div>
                <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.7 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section style={{ padding:'clamp(60px,8vw,100px) 24px', background:'var(--bg2)' }}>
        <div style={{ maxWidth:780, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ padding:'40px', borderRadius:24, textAlign:'center',
              background:'linear-gradient(135deg,rgba(5,150,105,0.08),rgba(14,165,233,0.05))',
              border:'1px solid rgba(5,150,105,0.2)' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🩺</div>
            <p style={{ fontSize:16, color:'#e2e8f0', lineHeight:1.8, marginBottom:24, fontStyle:'italic' }}>
              "{QUOTE.text}"</p>
            <div style={{ fontSize:13.5, fontWeight:800, color:'#fff' }}>{QUOTE.name}</div>
            <div style={{ fontSize:11, color:'var(--text3)', marginTop:4 }}>{QUOTE.title}</div>
          </motion.div>
        </div>
      </section>

      <ClinicSection />
      <LiveDemo />

      {/* ── CTA ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', textAlign:'center',
        background:'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(5,150,105,0.12) 0%,transparent 70%)' }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div style={{ fontSize:52, marginBottom:20 }}>🏥</div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff', marginBottom:14 }}>
            حوّل عيادتك رقمياً هذا الأسبوع</h2>
          <p style={{ fontSize:16, color:'var(--text2)', marginBottom:36, maxWidth:420, margin:'0 auto 36px' }}>
            تواصل معنا — يومان للإعداد ثم عيادتك تعمل بلا فوضى.</p>
          <motion.a href={WA} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05, boxShadow:'0 20px 50px rgba(5,150,105,0.45)' }} whileTap={{ scale:0.97 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'17px 44px', borderRadius:16,
              background:'linear-gradient(135deg,#059669,#047857)', color:'#fff',
              fontFamily:'Cairo,sans-serif', fontSize:17, fontWeight:900, textDecoration:'none',
              boxShadow:'0 16px 48px rgba(5,150,105,0.45)' }}>ابدأ الآن على واتساب ←</motion.a>
        </motion.div>
      </section>
    </PageLayout>
  );
}
