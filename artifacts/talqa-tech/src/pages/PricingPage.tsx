import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageLayout from './PageLayout';
import Calculator from '../components/Calculator';

const WA = 'https://wa.me/966551378531?text=أبي%20عرض%20سعر%20لمشروعي';

const PACKAGES = [
  {
    name:'Starter',
    nameAr:'البداية',
    price:'١٩٩٩',
    period:'مرة واحدة',
    color:'#0EA5E9',
    desc:'لرواد الأعمال الذين يبدأون رقمياً',
    features:['موقع احترافي أو تطبيق بسيط','Apple Wallet بطاقة واحدة','لوحة تحكم أساسية','واتساب تلقائي','دعم شهر بعد التسليم'],
    notIncluded:['AI مخصص','تطبيق iOS وAndroid'],
  },
  {
    name:'Pro',
    nameAr:'المحترف',
    price:'٤٩٩٩',
    period:'مرة واحدة',
    color:'#8B5CF6',
    desc:'للأعمال التي تريد منظومة متكاملة',
    features:['تطبيق موبايل iOS وAndroid','Apple Wallet كاملة','AI تسويق وبوت واتساب','نظام حجوزات متقدم','لوحة تحكم شاملة','دعم ٣ أشهر مجاناً','تدريب الفريق'],
    highlight:true,
  },
  {
    name:'Scale',
    nameAr:'التوسع',
    price:'٩٩٩٩',
    period:'مرة واحدة',
    color:'#D97706',
    desc:'للشركات التي تريد الريادة في قطاعها',
    features:['كل شيء في المحترف','تعدد الفروع وAPI خارجي','AI مخصص ومدرّب','نظام ERP/CRM متكامل','مدير حساب مخصص','دعم ٦ أشهر + SLA','تقارير تحليلية متقدمة'],
  },
];

const FAQS = [
  { q:'هل هناك اشتراك شهري؟', a:'لا — تدفع مرة واحدة وتملك المنتج كاملاً. الاستضافة والخوادم تُحسب منفصلة حسب الاستخدام.' },
  { q:'ماذا يشمل الدعم المجاني؟', a:'إصلاح أي خلل، تحديثات الأمان، وتعديلات بسيطة — لمدة ٣ أشهر بعد التسليم.' },
  { q:'هل يمكن التقسيط؟', a:'نعم — ٥٠٪ عند بدء العمل و٥٠٪ عند التسليم. للمشاريع الكبيرة نرتب جداول دفع مرنة.' },
  { q:'كم يستغرق التسليم؟', a:'من ١ إلى ٣ أسابيع حسب المشروع. نتفق على الجدول قبل البدء ونلتزم به.' },
  { q:'هل أملك الكود بعد التسليم؟', a:'نعم — الكود ملكك بالكامل، تقدر توديه لأي مطوّر في المستقبل.' },
];

export default function PricingPage() {
  const [spots, setSpots] = useState(5);
  useEffect(() => {
    const t = setInterval(() => setSpots(s => s>2 ? s-1 : 7), 10000);
    return () => clearInterval(t);
  }, []);
  const [openFaq, setOpenFaq] = useState<number|null>(null);

  return (
    <PageLayout accent="#8B5CF6">
      {/* ── HERO ── */}
      <section style={{ minHeight:'70vh', display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', overflow:'hidden', padding:'120px 24px 60px' }}>
        <div style={{ position:'absolute', left:'4%', top:'8%', width:500, height:500, borderRadius:'50%',
          background:'#8B5CF6', filter:'blur(180px)', opacity:0.1, pointerEvents:'none' }}/>

        <div style={{ position:'relative', zIndex:2, maxWidth:780, textAlign:'center' }}>
          <motion.div initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
            transition={{ type:'spring', stiffness:220 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:28, padding:'10px 22px',
              borderRadius:28, background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.3)' }}>
            <span style={{ fontSize:22 }}>💰</span>
            <span style={{ fontSize:13, fontWeight:800, color:'#A78BFA', letterSpacing:0.3 }}>الأسعار والباقات</span>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
            style={{ fontWeight:900, fontSize:'clamp(2.8rem,7vw,5.5rem)', letterSpacing:'-0.045em', lineHeight:1.05, marginBottom:24 }}>
            <span style={{ color:'#fff', display:'block' }}>أسعار واضحة</span>
            <span style={{ background:'linear-gradient(135deg,#A78BFA,#60A5FA)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display:'block' }}>
              بلا مفاجآت</span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
            style={{ fontSize:17, color:'var(--text2)', lineHeight:1.8, marginBottom:28, maxWidth:520, margin:'0 auto 28px' }}>
            لا عقود ملزمة، لا رسوم خفية — تدفع مرة واحدة وتملك المنتج كاملاً.
          </motion.p>

          {/* Urgency */}
          <motion.div animate={{ scale:[1,1.02,1] }} transition={{ duration:2, repeat:Infinity }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'12px 24px', borderRadius:14,
              background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.3)', marginBottom:36 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'#10B981', boxShadow:'0 0 10px #10B981' }}/>
            <span style={{ fontSize:13, fontWeight:700, color:'#C4B5FD' }}>
              تبقّى <strong style={{ color:'#fff', fontSize:16 }}>{spots}</strong> مقعد فقط هذا الشهر
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section style={{ padding:'clamp(60px,8vw,100px) 24px', background:'var(--bg2)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:18, alignItems:'stretch' }}>
            {PACKAGES.map((pkg,i) => (
              <motion.div key={i} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}
                style={{ padding:'36px 28px', borderRadius:22, position:'relative', overflow:'hidden',
                  background: pkg.highlight?`linear-gradient(145deg,rgba(139,92,246,0.12),rgba(79,70,229,0.06))`:'rgba(255,255,255,0.03)',
                  border:`1.5px solid ${pkg.highlight?'#8B5CF6':'rgba(255,255,255,0.08)'}`,
                  boxShadow:pkg.highlight?'0 0 60px rgba(139,92,246,0.2)':undefined,
                  display:'flex', flexDirection:'column' }}>
                {pkg.highlight&&(
                  <div style={{ position:'absolute', top:0, right:0, background:'linear-gradient(135deg,#7C3AED,#4F46E5)',
                    padding:'6px 18px 6px 28px', fontSize:10, fontWeight:900, color:'#fff',
                    borderBottomLeftRadius:14, letterSpacing:0.5 }}>الأكثر طلباً</div>
                )}

                <div style={{ marginTop:pkg.highlight?16:0, marginBottom:8 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:pkg.color, letterSpacing:1, textTransform:'uppercase', marginBottom:4 }}>{pkg.name}</div>
                  <div style={{ fontSize:20, fontWeight:900, color:'#fff', marginBottom:6 }}>{pkg.nameAr}</div>
                  <div style={{ fontSize:12, color:'var(--text3)' }}>{pkg.desc}</div>
                </div>

                <div style={{ margin:'20px 0', paddingBottom:20, borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
                    <span style={{ fontSize:40, fontWeight:900, color:pkg.highlight?'#A78BFA':'#fff', letterSpacing:-2 }}>{pkg.price}</span>
                    <span style={{ fontSize:12, color:'var(--text3)' }}>ريال / {pkg.period}</span>
                  </div>
                </div>

                <ul style={{ listStyle:'none', padding:0, margin:'0 0 24px', display:'flex', flexDirection:'column', gap:9, flex:1 }}>
                  {pkg.features.map((f,j) => (
                    <li key={j} style={{ display:'flex', alignItems:'flex-start', gap:8, fontSize:13, color:'var(--text2)' }}>
                      <span style={{ color:pkg.color, flexShrink:0, marginTop:1 }}>✓</span>{f}
                    </li>
                  ))}
                  {pkg.notIncluded?.map((f,j) => (
                    <li key={`n${j}`} style={{ display:'flex', alignItems:'flex-start', gap:8, fontSize:13, color:'rgba(255,255,255,0.2)' }}>
                      <span style={{ flexShrink:0, marginTop:1 }}>✗</span>{f}
                    </li>
                  ))}
                </ul>

                <a href={`${WA}&text=أبي%20باقة%20${encodeURIComponent(pkg.nameAr)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display:'block', textAlign:'center', padding:'14px', borderRadius:14,
                    background: pkg.highlight?`linear-gradient(135deg,#7C3AED,#4F46E5)`:'rgba(255,255,255,0.06)',
                    border: pkg.highlight?'none':'1px solid rgba(255,255,255,0.1)',
                    color:'#fff', fontFamily:'Cairo,sans-serif', fontSize:14, fontWeight:900,
                    textDecoration:'none', boxShadow:pkg.highlight?'0 10px 32px rgba(109,40,217,0.4)':undefined }}>
                  ابدأ بهذه الباقة ←
                </a>
              </motion.div>
            ))}
          </div>

          {/* Enterprise */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ marginTop:20, padding:'28px 32px', borderRadius:18, display:'flex',
              alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20,
              background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize:16, fontWeight:800, color:'#fff', marginBottom:6 }}>🏢 Enterprise — للمؤسسات الكبيرة</div>
              <div style={{ fontSize:13, color:'var(--text2)' }}>API مخصص، SLA ٩٩.٩٪، مدير حساب مخصص، تكامل مع أنظمة ERP/SAP. سعر حسب الاحتياج.</div>
            </div>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 24px', borderRadius:12,
                background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
                color:'#fff', fontFamily:'Cairo,sans-serif', fontSize:14, fontWeight:700, textDecoration:'none', whiteSpace:'nowrap' }}>
              تحدث مع المبيعات ←
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <Calculator />

      {/* ── FAQ ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', background:'var(--bg2)' }}>
        <div style={{ maxWidth:720, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:48 }}>
            <div className="section-label" style={{ color:'#A78BFA', borderColor:'rgba(167,139,250,0.3)',
              background:'rgba(167,139,250,0.08)', marginBottom:16 }}>❓ أسئلة شائعة عن الأسعار</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>أجوبة قبل أن تسأل</h2>
          </motion.div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {FAQS.map((faq,i) => (
              <motion.div key={i} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.07 }}
                style={{ borderRadius:14, overflow:'hidden', border:'1px solid rgba(255,255,255,0.07)',
                  background:'rgba(255,255,255,0.02)' }}>
                <button onClick={() => setOpenFaq(openFaq===i?null:i)}
                  style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'18px 22px', background:'transparent', border:'none', cursor:'pointer',
                    textAlign:'right', fontFamily:'Cairo,sans-serif' }}>
                  <span style={{ fontSize:14, fontWeight:700, color:'#fff' }}>{faq.q}</span>
                  <span style={{ fontSize:18, color:'#A78BFA', flexShrink:0, transition:'transform 0.2s',
                    transform:openFaq===i?'rotate(45deg)':undefined }}>+</span>
                </button>
                {openFaq===i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
                    exit={{ height:0, opacity:0 }}
                    style={{ padding:'0 22px 18px', fontSize:13.5, color:'var(--text2)', lineHeight:1.7 }}>
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', textAlign:'center',
        background:'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(139,92,246,0.1) 0%,transparent 70%)' }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div style={{ fontSize:52, marginBottom:20 }}>💎</div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff', marginBottom:14 }}>
            استثمار يرجع عليك من أول شهر</h2>
          <p style={{ fontSize:16, color:'var(--text2)', marginBottom:36, maxWidth:420, margin:'0 auto 36px' }}>
            متوسط عملاؤنا يسترجعون تكلفة المشروع خلال ٤ أشهر — ونحن نساعدهم في ذلك.</p>
          <motion.a href={WA} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05, boxShadow:'0 20px 50px rgba(139,92,246,0.45)' }} whileTap={{ scale:0.97 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'17px 44px', borderRadius:16,
              background:'linear-gradient(135deg,#7C3AED,#4F46E5)', color:'#fff',
              fontFamily:'Cairo,sans-serif', fontSize:17, fontWeight:900, textDecoration:'none',
              boxShadow:'0 16px 48px rgba(109,40,217,0.45)' }}>احصل على عرض سعر مجاني ←</motion.a>
        </motion.div>
      </section>
    </PageLayout>
  );
}
