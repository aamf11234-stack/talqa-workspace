import { motion } from 'framer-motion';
import PageLayout from './PageLayout';
import ProjectsGallery from '../components/ProjectsGallery';
import Testimonials from '../components/Testimonials';

const WA = 'https://wa.me/966551378531?text=أبي%20أشوف%20مشاريعكم%20وأستفسر';

const CASE_STUDIES = [
  { icon:'☕', name:'كافيهك',          sector:'كافيه — الرياض',        color:'#D97706', result:'↑٤٢٪ عودة العملاء',  tech:['Apple Wallet','AI تسويق','نقاط ولاء'],     desc:'نظام ولاء كامل مع Apple Wallet — العميل يضيف نقاطه من جواله ويستبدلها مباشرة.' },
  { icon:'🏥', name:'تلقا للعيادات',  sector:'عيادات — الرياض',        color:'#059669', result:'↓٩٠٪ نسبة الغياب',  tech:['حجوزات ذكية','Apple Wallet','AI تذكير'], desc:'منظومة حجز طبي متكاملة — التضارب صفر والمريض يتلقى بطاقة موعده تلقائياً.' },
  { icon:'🏋️', name:'حيز',           sector:'نادٍ رياضي — الرياض',    color:'#F59E0B', result:'↑٨٠٪ تجديد الاشتراك',tech:['اشتراكات ذكية','Apple Wallet','AI'],      desc:'نظام عضوية رقمي كامل — تذكير الاشتراك تلقائياً رفع التجديد من ٤٠٪ إلى ٨٠٪.' },
  { icon:'🍽️', name:'مطعم تجريبي',   sector:'مطاعم — جدة',            color:'#DC2626', result:'↑٦٠٪ الحجوزات',     tech:['حجوزات لحظية','قائمة رقمية','تتبع'],     desc:'نظام حجز وطلب متكامل — معدل الحجوزات ضاعف في ٣ أشهر بدون إعلانات.' },
];

const STATS = [
  { n:'+٥٠', label:'مشروع منجز' },
  { n:'+٢٠', label:'عميل نشط حالياً' },
  { n:'١٤',  label:'قطاع مختلف' },
  { n:'٣',   label:'سنوات خبرة' },
];

export default function ProjectsPage() {
  return (
    <PageLayout accent="#06B6D4">
      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', overflow:'hidden', padding:'100px 24px 60px' }}>
        <div style={{ position:'absolute', left:'4%', top:'8%', width:500, height:500, borderRadius:'50%',
          background:'#06B6D4', filter:'blur(180px)', opacity:0.1, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', right:'4%', bottom:'10%', width:350, height:350, borderRadius:'50%',
          background:'#818CF8', filter:'blur(150px)', opacity:0.08, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:'linear-gradient(rgba(6,182,212,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.055) 1px,transparent 1px)',
          backgroundSize:'64px 64px' }}/>

        <div style={{ position:'relative', zIndex:2, maxWidth:820, textAlign:'center' }}>
          <motion.div initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
            transition={{ type:'spring', stiffness:220 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:28, padding:'10px 22px',
              borderRadius:28, background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.3)' }}>
            <span style={{ fontSize:22 }}>🏆</span>
            <span style={{ fontSize:13, fontWeight:800, color:'#22D3EE', letterSpacing:0.3 }}>مشاريعنا ونتائجها</span>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
            style={{ fontWeight:900, fontSize:'clamp(3rem,8vw,6rem)', letterSpacing:'-0.045em', lineHeight:1.0, marginBottom:24 }}>
            <span style={{ color:'#fff', display:'block' }}>منتجات</span>
            <span style={{ background:'linear-gradient(135deg,#22D3EE,#818CF8)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display:'block' }}>
              يعشقها العملاء</span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.6 }}
            style={{ fontSize:18, color:'var(--text2)', lineHeight:1.8, marginBottom:40, maxWidth:560, margin:'0 auto 40px' }}>
            كل مشروع قصة نجاح قابلة للقياس — أرقام حقيقية، عملاء راضون، ونتائج في السوق.
          </motion.p>

          {/* Stats */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
            style={{ display:'flex', gap:0, justifyContent:'center', flexWrap:'wrap',
              padding:'24px 32px', borderRadius:20, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
            {STATS.map((s,i) => (
              <div key={i} style={{ flex:'1 1 120px', textAlign:'center', padding:'10px',
                borderRight:i<STATS.length-1?'1px solid rgba(255,255,255,0.07)':undefined }}>
                <div style={{ fontSize:30, fontWeight:900, color:'#22D3EE', letterSpacing:-1 }}>{s.n}</div>
                <div style={{ fontSize:11, color:'var(--text2)', marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.2, repeat:Infinity }}
          style={{ position:'absolute', bottom:32, fontSize:22, opacity:0.25 }}>↓</motion.div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', background:'var(--bg2)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:56 }}>
            <div className="section-label" style={{ color:'#22D3EE', borderColor:'rgba(34,211,238,0.3)',
              background:'rgba(34,211,238,0.08)', marginBottom:16 }}>📊 دراسات الحالة</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>أرقام حقيقية من مشاريع حقيقية</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:18 }}>
            {CASE_STUDIES.map((c,i) => (
              <motion.div key={i} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}
                whileHover={{ y:-6, boxShadow:`0 24px 56px ${c.color}22` }}
                style={{ padding:'28px 24px', borderRadius:20, position:'relative', overflow:'hidden',
                  background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)',
                  transition:'box-shadow 0.25s,transform 0.25s' }}>
                <div style={{ position:'absolute', top:0, left:0, width:'100%', height:2,
                  background:`linear-gradient(90deg,${c.color},transparent)`, opacity:0.7 }}/>

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:40, height:40, borderRadius:10, background:`${c.color}20`,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:800, color:'#fff' }}>{c.name}</div>
                      <div style={{ fontSize:10.5, color:'var(--text3)' }}>{c.sector}</div>
                    </div>
                  </div>
                  <div style={{ padding:'4px 10px', borderRadius:20, background:`${c.color}20`,
                    fontSize:11, fontWeight:800, color:c.color, whiteSpace:'nowrap' }}>{c.result}</div>
                </div>

                <p style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7, marginBottom:14 }}>{c.desc}</p>

                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {c.tech.map((t,j) => (
                    <span key={j} style={{ padding:'3px 10px', borderRadius:10, background:`${c.color}12`,
                      border:`1px solid ${c.color}25`, fontSize:10.5, fontWeight:700, color:c.color }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectsGallery />

      {/* ── CTA ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', textAlign:'center',
        background:'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(6,182,212,0.1) 0%,transparent 70%)' }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div style={{ fontSize:52, marginBottom:20 }}>🏆</div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff', marginBottom:14 }}>
            مشروعك يكون قصة النجاح التالية</h2>
          <p style={{ fontSize:16, color:'var(--text2)', marginBottom:36, maxWidth:420, margin:'0 auto 36px' }}>
            تواصل معنا — نبدأ بتحليل مجاني لمشروعك ونقترح أفضل حل.</p>
          <motion.a href={WA} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'17px 44px', borderRadius:16,
              background:'linear-gradient(135deg,#0891B2,#06B6D4)', color:'#fff',
              fontFamily:'Cairo,sans-serif', fontSize:17, fontWeight:900, textDecoration:'none',
              boxShadow:'0 16px 48px rgba(6,182,212,0.4)' }}>ابدأ مشروعك الآن ←</motion.a>
        </motion.div>
      </section>

      <div className="section-divider" />
      <Testimonials />
    </PageLayout>
  );
}
