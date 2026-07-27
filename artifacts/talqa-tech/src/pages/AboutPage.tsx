import { motion } from 'framer-motion';
import { Link } from 'wouter';
import PageLayout from './PageLayout';
import WhyUs from '../components/WhyUs';
import Process from '../components/Process';

const WA = 'https://wa.me/966551378531';

const MILESTONES = [
  { year:'٢٠٢١', event:'تأسيس تلقا البرمجية في الرياض', icon:'🚀' },
  { year:'٢٠٢٢', event:'أول ١٠ مشاريع مُسلَّمة — كافيهات وعيادات', icon:'🏆' },
  { year:'٢٠٢٣', event:'إطلاق منظومة Apple Wallet الأولى في السعودية', icon:'💳' },
  { year:'٢٠٢٤', event:'تجاوز +٥٠ عميل في ١٤ قطاعاً مختلفاً', icon:'📊' },
  { year:'٢٠٢٥', event:'منتجات حائزة على تقييم ٩٩٪ رضا عملاء', icon:'⭐' },
];

const VALUES = [
  { icon:'🇸🇦', title:'سعوديون ١٠٠٪',    desc:'نفهم السوق المحلي ومتطلباته قبل ما تشرح.' },
  { icon:'⚡',  title:'تسليم سريع',        desc:'معظم المشاريع خلال أسبوعين — لا وعود فارغة.' },
  { icon:'🔧',  title:'دعم حقيقي',         desc:'معك بعد الإطلاق لا قبله فقط — ٣ أشهر مجاناً.' },
  { icon:'🎯',  title:'مخصص لمشروعك',      desc:'لا قوالب جاهزة — كل شيء يُبنى لك أنت.' },
  { icon:'📊',  title:'قرارات بالبيانات',  desc:'كل توصية مبنية على تحليل حقيقي لمشروعك.' },
  { icon:'🤝',  title:'شراكة لا مجرد عقد', desc:'نجاحك هو نجاحنا — نستثمر في نتائجك.' },
];

const STATS = [
  { n:'+٥٠', label:'مشروع منجز' },
  { n:'+٢٠', label:'عميل نشط' },
  { n:'١٤', label:'قطاع مخدوم' },
  { n:'٩٩٪', label:'رضا العملاء' },
];

export default function AboutPage() {
  return (
    <PageLayout accent="#8B5CF6">
      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', overflow:'hidden', padding:'100px 24px 60px' }}>
        <div style={{ position:'absolute', left:'4%', top:'8%', width:500, height:500, borderRadius:'50%',
          background:'#7C3AED', filter:'blur(180px)', opacity:0.1, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', right:'4%', bottom:'10%', width:350, height:350, borderRadius:'50%',
          background:'#4F46E5', filter:'blur(150px)', opacity:0.09, pointerEvents:'none' }}/>

        <div style={{ position:'relative', zIndex:2, maxWidth:820, textAlign:'center' }}>
          {/* Animated logo */}
          <motion.div initial={{ scale:0.5, opacity:0 }} animate={{ scale:1, opacity:1 }}
            transition={{ type:'spring', stiffness:200, delay:0.05 }}
            style={{ margin:'0 auto 28px', width:80, height:80, borderRadius:22,
              background:'linear-gradient(135deg,#7C3AED,#4F46E5)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:36, fontWeight:900, color:'#fff',
              boxShadow:'0 0 40px rgba(124,58,237,0.5)' }}>ت</motion.div>

          <motion.div initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
            transition={{ type:'spring', stiffness:220, delay:0.1 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:28, padding:'10px 22px',
              borderRadius:28, background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.3)' }}>
            <span style={{ fontSize:13, fontWeight:800, color:'#A78BFA', letterSpacing:0.3 }}>🏢 من نحن</span>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15, duration:0.7 }}
            style={{ fontWeight:900, fontSize:'clamp(3rem,8vw,6rem)', letterSpacing:'-0.045em', lineHeight:1.0, marginBottom:24 }}>
            <span style={{ color:'#fff', display:'block' }}>شركاء نجاحك</span>
            <span style={{ background:'linear-gradient(135deg,#A78BFA,#60A5FA)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display:'block' }}>
              لا مجرد مطوّرين</span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.6 }}
            style={{ fontSize:18, color:'var(--text2)', lineHeight:1.8, marginBottom:40, maxWidth:560, margin:'0 auto 40px' }}>
            تلقا البرمجية — شركة سعودية تأسست ٢٠٢١ في الرياض. مهمتنا تحويل أفكار رواد الأعمال إلى منتجات رقمية يعشقها عملاؤهم.
          </motion.p>

          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
            style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.04, boxShadow:'0 20px 50px rgba(139,92,246,0.45)' }} whileTap={{ scale:0.97 }}
              style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'16px 38px', borderRadius:14,
                background:'linear-gradient(135deg,#7C3AED,#4F46E5)', color:'#fff',
                fontFamily:'Cairo,sans-serif', fontSize:16, fontWeight:900, textDecoration:'none',
                boxShadow:'0 12px 36px rgba(109,40,217,0.35)' }}>تحدث معنا الآن ←</motion.a>
            <Link href="/projects" style={{ display:'inline-flex', alignItems:'center', padding:'16px 28px', borderRadius:14,
              background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)',
              color:'var(--text2)', fontFamily:'Cairo,sans-serif', fontSize:15, fontWeight:700, textDecoration:'none' }}>
              شوف مشاريعنا</Link>
          </motion.div>
        </div>
        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.2, repeat:Infinity }}
          style={{ position:'absolute', bottom:32, fontSize:22, opacity:0.25 }}>↓</motion.div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding:'56px 24px',
        background:'linear-gradient(135deg,rgba(139,92,246,0.08),rgba(79,70,229,0.05))',
        borderTop:'1px solid rgba(139,92,246,0.15)', borderBottom:'1px solid rgba(139,92,246,0.15)' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'flex', justifyContent:'center', flexWrap:'wrap' }}>
          {STATS.map((s,i) => (
            <motion.div key={i} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.12 }}
              style={{ flex:'1 1 160px', textAlign:'center', padding:'20px 24px',
                borderRight:i<STATS.length-1?'1px solid rgba(255,255,255,0.07)':undefined }}>
              <div style={{ fontSize:38, fontWeight:900, color:'#A78BFA', letterSpacing:-1, lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:12.5, color:'var(--text2)', marginTop:6 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:48, alignItems:'center' }}>
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <div className="section-label" style={{ color:'#A78BFA', borderColor:'rgba(167,139,250,0.3)',
              background:'rgba(167,139,250,0.08)', marginBottom:20, display:'inline-flex' }}>🎯 رسالتنا</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,3.5vw,2.8rem)', color:'#fff', marginBottom:16, lineHeight:1.2 }}>
              نجعل التقنية أداة نمو حقيقية</h2>
            <p style={{ fontSize:16, color:'var(--text2)', lineHeight:1.8, marginBottom:20 }}>
              كثير من الشركات تدفع لمطوّرين وتحصل على كود يعمل — لكنه لا يبيع ولا يبني علاقة مع العميل.
            </p>
            <p style={{ fontSize:16, color:'var(--text2)', lineHeight:1.8 }}>
              نحن نبني منتجات تُحسّن الإيراد، تُقلّل التكاليف التشغيلية، وتجعل العميل يعود — هذه هي الرسالة.
            </p>
          </motion.div>
          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <div style={{ padding:'32px', borderRadius:20, background:'rgba(139,92,246,0.06)', border:'1px solid rgba(139,92,246,0.2)' }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#A78BFA', marginBottom:16, letterSpacing:0.5 }}>من تلقا في أرقام</div>
              {[['١٤ قطاع','نخدمهم بحلول مخصصة'],['أسبوعين','متوسط التسليم'],['٣ أشهر','دعم مجاني بعد التسليم'],['٩٩٪','معدل رضا العملاء'],['سعوديون','فريق كامل من داخل المملكة']].map(([n,l],i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                  padding:'12px 0', borderBottom:i<4?'1px solid rgba(255,255,255,0.06)':undefined }}>
                  <span style={{ fontSize:14, fontWeight:900, color:'#A78BFA' }}>{n}</span>
                  <span style={{ fontSize:13, color:'var(--text2)' }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', background:'var(--bg2)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:52 }}>
            <div className="section-label" style={{ color:'#A78BFA', borderColor:'rgba(167,139,250,0.3)',
              background:'rgba(167,139,250,0.08)', marginBottom:16 }}>💡 قيمنا</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>ما الذي يميزنا</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:14 }}>
            {VALUES.map((v,i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.08 }}
                whileHover={{ y:-6 }}
                style={{ padding:'24px 22px', borderRadius:18, background:'rgba(255,255,255,0.03)',
                  border:'1px solid rgba(255,255,255,0.07)', transition:'transform 0.25s' }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{v.icon}</div>
                <div style={{ fontSize:14.5, fontWeight:800, color:'#fff', marginBottom:7 }}>{v.title}</div>
                <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7 }}>{v.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px' }}>
        <div style={{ maxWidth:700, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:52 }}>
            <div className="section-label" style={{ color:'#A78BFA', borderColor:'rgba(167,139,250,0.3)',
              background:'rgba(167,139,250,0.08)', marginBottom:16 }}>📅 رحلتنا</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>من البداية إلى اليوم</h2>
          </motion.div>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', right:'calc(50% - 1px)', top:0, bottom:0, width:2,
              background:'linear-gradient(180deg,rgba(139,92,246,0),rgba(139,92,246,0.5),rgba(139,92,246,0))',
              pointerEvents:'none' }}/>
            {MILESTONES.map((m,i) => (
              <motion.div key={i} initial={{ opacity:0, x:i%2===0?-24:24 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.5 }}
                style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24,
                  flexDirection:i%2===0?'row':'row-reverse' }}>
                <div style={{ flex:1, padding:'16px 20px', borderRadius:14,
                  background:'rgba(139,92,246,0.06)', border:'1px solid rgba(139,92,246,0.15)' }}>
                  <div style={{ fontSize:11, fontWeight:700, color:'#A78BFA', marginBottom:4 }}>{m.year}</div>
                  <div style={{ fontSize:13.5, fontWeight:700, color:'#fff' }}>{m.event}</div>
                </div>
                <div style={{ width:40, height:40, borderRadius:'50%', flexShrink:0, zIndex:1,
                  background:'linear-gradient(135deg,#7C3AED,#4F46E5)',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:18,
                  boxShadow:'0 6px 20px rgba(109,40,217,0.5)' }}>{m.icon}</div>
                <div style={{ flex:1 }}/>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />
      <WhyUs />
      <div className="section-divider" />
      <Process />

      {/* ── FINAL CTA ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', textAlign:'center',
        background:'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(139,92,246,0.1) 0%,transparent 70%)' }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div style={{ fontSize:52, marginBottom:20 }}>🤝</div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff', marginBottom:14 }}>
            هل أنت مستعد للشراكة؟</h2>
          <p style={{ fontSize:16, color:'var(--text2)', marginBottom:36, maxWidth:420, margin:'0 auto 36px' }}>
            نرد خلال ساعات وننظّم أول جلسة تحليل مجاناً — بدون التزام.</p>
          <motion.a href={WA} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05, boxShadow:'0 20px 50px rgba(139,92,246,0.45)' }} whileTap={{ scale:0.97 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'17px 44px', borderRadius:16,
              background:'linear-gradient(135deg,#7C3AED,#4F46E5)', color:'#fff',
              fontFamily:'Cairo,sans-serif', fontSize:17, fontWeight:900, textDecoration:'none',
              boxShadow:'0 16px 48px rgba(109,40,217,0.45)' }}>ابدأ الآن على واتساب ←</motion.a>
        </motion.div>
      </section>
    </PageLayout>
  );
}
