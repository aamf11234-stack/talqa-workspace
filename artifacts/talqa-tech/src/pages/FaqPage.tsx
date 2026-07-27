import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from './PageLayout';

const WA = 'https://wa.me/966551378531?text=عندي%20سؤال%20عن%20خدماتكم';

const CATEGORIES = [
  {
    label:'التسليم والجودة',
    icon:'⚡',
    color:'#F59E0B',
    faqs:[
      { q:'كم يستغرق تسليم المشروع؟', a:'معظم المشاريع تُسلَّم خلال ١ إلى ٣ أسابيع. نتفق على الجدول قبل البدء ونلتزم به مع تحديثات يومية.' },
      { q:'كيف أتابع سير العمل؟', a:'نفتح لك لوحة مشروع على Notion تشوف فيها كل مهمة وحالتها — بالإضافة لتحديث يومي على واتساب.' },
      { q:'ماذا لو لم أكن راضياً عن النتيجة؟', a:'نعدّل حتى تصبح راضياً تماماً — هذا ضمن عقدنا. لم نُسلَّم مشروعاً واحداً لم يرضَ عنه صاحبه.' },
      { q:'هل تبنون من الصفر أم قوالب؟', a:'من الصفر دائماً — كل مشروع كود أصلي مكتوب خصيصاً لمتطلباتك، بدون قوالب جاهزة.' },
    ],
  },
  {
    label:'التسعير والدفع',
    icon:'💰',
    color:'#8B5CF6',
    faqs:[
      { q:'هل هناك رسوم شهرية مخفية؟', a:'لا — تدفع مرة واحدة للتطوير. الاستضافة والخوادم تُحسب منفصلة وبأسعار واضحة من البداية.' },
      { q:'هل يمكن التقسيط؟', a:'نعم — ٥٠٪ عند بدء العمل و٥٠٪ عند التسليم. للمشاريع الكبيرة نرتب جداول دفع مرنة تناسبك.' },
      { q:'هل أملك الكود بعد التسليم؟', a:'نعم بالكامل — الكود ملكك، تقدر توديه لأي مطوّر في أي وقت بدون قيود.' },
      { q:'ما هي طرق الدفع المقبولة؟', a:'تحويل بنكي، Apple Pay، STC Pay، أو Visa/Mastercard.' },
    ],
  },
  {
    label:'Apple Wallet',
    icon:'💳',
    color:'#10B981',
    faqs:[
      { q:'هل Apple Wallet يشتغل على أي iPhone؟', a:'نعم — يشتغل على أي iPhone يعمل بـ iOS 12 وما فوق، وهذا يشمل +٩٥٪ من المستخدمين.' },
      { q:'كيف يضيف العميل البطاقة لجواله؟', a:'يضغط على رابط أو QR code — ثلاث لمسات وتُضاف البطاقة تلقائياً بدون App Store.' },
      { q:'هل تحتاج إلى اشتراك شهري مع Apple؟', a:'نحن نهتم بكل متطلبات Apple Developer. دفعة واحدة وأنت جاهز.' },
      { q:'هل يمكن تحديث بيانات البطاقة بعد التسليم؟', a:'نعم — OTA Updates تتيح تحديث الرصيد والبيانات دون أي إجراء من العميل.' },
    ],
  },
  {
    label:'الدعم الفني',
    icon:'🛡️',
    color:'#0EA5E9',
    faqs:[
      { q:'ماذا يشمل الدعم المجاني ٣ أشهر؟', a:'إصلاح أي خلل، تحديثات الأمان، وتعديلات بسيطة. أي ميزة جديدة تُضاف بعرض سعر منفصل.' },
      { q:'كيف أتواصل معكم في حالة طوارئ؟', a:'واتساب مباشر — نرد خلال ساعتين في أوقات العمل وخلال ٤ ساعات في عطلات نهاية الأسبوع.' },
      { q:'هل تدعمون المشاريع القديمة التي بنيتموها؟', a:'نعم — لدينا عملاء معنا منذ ٢٠٢١ مازلنا ندعمهم ونطوّر معهم.' },
    ],
  },
];

export default function FaqPage() {
  const [openItem, setOpenItem] = useState<string|null>(null);
  const toggle = (key: string) => setOpenItem(v => v===key?null:key);

  return (
    <PageLayout accent="#F59E0B">
      {/* ── HERO ── */}
      <section style={{ minHeight:'65vh', display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', overflow:'hidden', padding:'120px 24px 60px' }}>
        <div style={{ position:'absolute', left:'10%', top:'20%', width:400, height:400, borderRadius:'50%',
          background:'#F59E0B', filter:'blur(160px)', opacity:0.08, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', right:'10%', bottom:'15%', width:300, height:300, borderRadius:'50%',
          background:'#8B5CF6', filter:'blur(140px)', opacity:0.07, pointerEvents:'none' }}/>

        <div style={{ position:'relative', zIndex:2, maxWidth:700, textAlign:'center' }}>
          <motion.div initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
            transition={{ type:'spring', stiffness:220 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:28, padding:'10px 22px',
              borderRadius:28, background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.3)' }}>
            <span style={{ fontSize:22 }}>❓</span>
            <span style={{ fontSize:13, fontWeight:800, color:'#FCD34D', letterSpacing:0.3 }}>الأسئلة الشائعة</span>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
            style={{ fontWeight:900, fontSize:'clamp(2.8rem,7vw,5.5rem)', letterSpacing:'-0.045em', lineHeight:1.05, marginBottom:20 }}>
            <span style={{ color:'#fff', display:'block' }}>كل أسئلتك</span>
            <span style={{ background:'linear-gradient(135deg,#FBBF24,#F472B6)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display:'block' }}>
              لها جواب</span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
            style={{ fontSize:17, color:'var(--text2)', lineHeight:1.8, marginBottom:32, maxWidth:500, margin:'0 auto 32px' }}>
            ٢٠+ سؤال شائع مرتّب بالموضوع — وإذا ما لقيت جوابك، نحن على واتساب في دقائق.
          </motion.p>

          <motion.a href={WA} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 32px', borderRadius:14,
              background:'linear-gradient(135deg,#D97706,#F59E0B)', color:'#000',
              fontFamily:'Cairo,sans-serif', fontSize:15, fontWeight:900, textDecoration:'none',
              boxShadow:'0 10px 32px rgba(245,158,11,0.35)' }}>سؤال مباشر على واتساب ←</motion.a>
        </div>
      </section>

      {/* ── FAQ CATEGORIES ── */}
      <section style={{ padding:'clamp(60px,8vw,100px) 24px', background:'var(--bg2)' }}>
        <div style={{ maxWidth:860, margin:'0 auto', display:'flex', flexDirection:'column', gap:40 }}>
          {CATEGORIES.map((cat,ci) => (
            <motion.div key={ci} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:ci*0.1 }}>
              {/* Category header */}
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18,
                padding:'12px 16px', borderRadius:12,
                background:`rgba(${cat.color==='#F59E0B'?'245,158,11':cat.color==='#8B5CF6'?'139,92,246':cat.color==='#10B981'?'16,185,129':'14,165,233'},0.08)`,
                border:`1px solid rgba(${cat.color==='#F59E0B'?'245,158,11':cat.color==='#8B5CF6'?'139,92,246':cat.color==='#10B981'?'16,185,129':'14,165,233'},0.2)` }}>
                <span style={{ fontSize:22 }}>{cat.icon}</span>
                <span style={{ fontSize:15, fontWeight:800, color:'#fff' }}>{cat.label}</span>
                <span style={{ fontSize:11, color:'var(--text3)', marginRight:'auto' }}>{cat.faqs.length} أسئلة</span>
              </div>

              {/* FAQs */}
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {cat.faqs.map((faq,fi) => {
                  const key = `${ci}-${fi}`;
                  const isOpen = openItem===key;
                  return (
                    <div key={fi} style={{ borderRadius:14, overflow:'hidden',
                      background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)' }}>
                      <button onClick={() => toggle(key)}
                        style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                          padding:'18px 22px', background:'transparent', border:'none', cursor:'pointer',
                          textAlign:'right', fontFamily:'Cairo,sans-serif' }}>
                        <span style={{ fontSize:14, fontWeight:700, color:'#fff', textAlign:'right' }}>{faq.q}</span>
                        <motion.span animate={{ rotate: isOpen?45:0 }} transition={{ duration:0.2 }}
                          style={{ fontSize:20, color:cat.color, flexShrink:0, display:'inline-block' }}>+</motion.span>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
                            exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }}>
                            <div style={{ padding:'0 22px 18px', fontSize:13.5, color:'var(--text2)', lineHeight:1.8 }}>
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', textAlign:'center',
        background:'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(245,158,11,0.1) 0%,transparent 70%)' }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div style={{ fontSize:52, marginBottom:20 }}>💬</div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff', marginBottom:14 }}>
            لم تجد جوابك؟</h2>
          <p style={{ fontSize:16, color:'var(--text2)', marginBottom:36, maxWidth:400, margin:'0 auto 36px' }}>
            تواصل معنا مباشرة — نرد على أي سؤال خلال دقائق.</p>
          <motion.a href={WA} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05, boxShadow:'0 20px 50px rgba(245,158,11,0.4)' }} whileTap={{ scale:0.97 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'17px 44px', borderRadius:16,
              background:'linear-gradient(135deg,#D97706,#F59E0B)', color:'#000',
              fontFamily:'Cairo,sans-serif', fontSize:17, fontWeight:900, textDecoration:'none',
              boxShadow:'0 16px 48px rgba(245,158,11,0.4)' }}>تحدث معنا الآن ←</motion.a>
        </motion.div>
      </section>
    </PageLayout>
  );
}
