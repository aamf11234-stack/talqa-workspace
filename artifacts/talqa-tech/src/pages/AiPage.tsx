import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from './PageLayout';
import AiChat from '../components/AiChat';

const WA = 'https://wa.me/966551378531?text=أبي%20ذكاء%20اصطناعي%20لمشروعي';

const AI_FEATURES = [
  { icon:'🤖', title:'بوت واتساب ذكي',       color:'#10B981', desc:'يرد على عملاؤك ٢٤/٧، يحجز مواعيد، يجيب على الأسئلة الشائعة — بلهجة مخصصة لعلامتك.' },
  { icon:'🧠', title:'توصيات مخصصة',          color:'#8B5CF6', desc:'يحلل عادات عميلك ويقترح الخدمة أو المنتج المناسب في اللحظة المناسبة.' },
  { icon:'📊', title:'تحليل البيانات',         color:'#0EA5E9', desc:'يحوّل بيانات مشروعك إلى رؤى قابلة للتنفيذ — بدون خبرة تقنية.' },
  { icon:'✍️', title:'توليد محتوى تلقائي',    color:'#EC4899', desc:'يكتب عروض ترويجية، ردود على التقييمات، ووصف المنتجات — بنبرتك أنت.' },
  { icon:'🔍', title:'بحث وتلخيص',           color:'#F59E0B', desc:'يلخص التقارير الطويلة، يجيب على أسئلة البيانات، ويوفّر ساعات من العمل.' },
  { icon:'🌐', title:'دعم متعدد اللغات',      color:'#D97706', desc:'عربي، إنجليزي، وأي لغة يحتاجها عملاؤك — تلقائياً بدون إعداد إضافي.' },
];

const USE_CASES = [
  { icon:'☕', sector:'كافيهات',       use:'يرد على استفسارات القهوة، يذكّر بالنقاط، يروّج للعروض اليومية.' },
  { icon:'🏥', sector:'عيادات',        use:'يجيب المريض قبل الموعد، يرسل تعليمات ما بعد الزيارة، يقلّل مكالمات الاستقبال ٦٠٪.' },
  { icon:'🛍️', sector:'متاجر',         use:'يرد على أسئلة المنتج، يتبع الطلب، يقترح منتجات مكملة.' },
  { icon:'🏋️', sector:'نوادي رياضية', use:'يرسل برنامج التمرين، يتابع التقدم، يحفّز المشترك على العودة.' },
];

const DEMO_MESSAGES = [
  { role:'user', text:'كم نقطة عندي؟' },
  { role:'bot',  text:'أهلاً أحمد! 👋 عندك حالياً **٢٤٧ نقطة**. تقدر تستبدلها بـ قهوة مجانية عند ٣٠٠ نقطة — ما تبقّى إلا ٥٣ نقطة! ☕', typing:true },
  { role:'user', text:'وش عندكم اليوم؟' },
  { role:'bot',  text:'اليوم عندنا:\n🌟 **لاتيه الفستق** بعرض ١٥٪\n🍰 **تارت الليمون** طازج من الساعة ٢ العصر\n\nتبي أحجز لك طاولة؟', typing:true },
  { role:'user', text:'أي ساعة تقفلون؟' },
  { role:'bot',  text:'نقفل الساعة **١١ مساءً** كل الأيام 🕚\nوالجمعة والسبت لـ **١٢ منتصف الليل**! 🎉', typing:true },
];

export default function AiPage() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let i = 0;
    const next = () => {
      if (i >= DEMO_MESSAGES.length) return;
      const msg = DEMO_MESSAGES[i];
      if (msg.role === 'bot') { setIsTyping(true); setTimeout(() => { setIsTyping(false); setVisibleMessages(i+1); i++; setTimeout(next, 1800); }, 1400); }
      else { setVisibleMessages(i+1); i++; setTimeout(next, 1000); }
    };
    setTimeout(next, 800);
  }, []);

  useEffect(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior:'smooth' }); }, [visibleMessages, isTyping]);

  return (
    <PageLayout accent="#10B981">
      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', overflow:'hidden', padding:'100px 24px 60px' }}>
        {/* Neural network bg */}
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.05, pointerEvents:'none' }}>
          {Array.from({length:20}).map((_,i) => (
            <motion.circle key={i} cx={`${8+i*4.5}%`} cy={`${20+((i*37)%60)}%`} r="2" fill="#10B981"
              animate={{ opacity:[0.3,1,0.3], scale:[0.8,1.4,0.8] }}
              transition={{ duration:3+i%4, repeat:Infinity, delay:i*0.3 }}/>
          ))}
          {Array.from({length:15}).map((_,i) => (
            <motion.line key={`l${i}`} x1={`${8+i*5}%`} y1={`${20+((i*37)%60)}%`}
              x2={`${8+(i+1)*5}%`} y2={`${20+((i+1)*37+20)%60}%`} stroke="#10B981" strokeWidth="0.5"
              animate={{ opacity:[0,0.5,0] }} transition={{ duration:2.5, repeat:Infinity, delay:i*0.4 }}/>
          ))}
        </svg>

        <div style={{ position:'absolute', right:'5%', top:'10%', width:600, height:600, borderRadius:'50%',
          background:'#059669', filter:'blur(220px)', opacity:0.1, pointerEvents:'none' }}/>

        <div style={{ position:'relative', zIndex:2, maxWidth:1100, width:'100%', display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:60, alignItems:'center' }}>

          {/* Text */}
          <div>
            <motion.div initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
              transition={{ type:'spring', stiffness:220 }}
              style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:28, padding:'10px 22px',
                borderRadius:28, background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.3)' }}>
              <span style={{ fontSize:22 }}>🤖</span>
              <span style={{ fontSize:13, fontWeight:800, color:'#34D399', letterSpacing:0.3 }}>الذكاء الاصطناعي</span>
            </motion.div>

            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
              style={{ fontWeight:900, fontSize:'clamp(2.6rem,6vw,5rem)', letterSpacing:'-0.045em', lineHeight:1.0, marginBottom:20 }}>
              <span style={{ color:'#fff', display:'block' }}>موظف ذكي</span>
              <span style={{ background:'linear-gradient(135deg,#34D399,#818CF8)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display:'block' }}>
                لا ينام ولا يتعب</span>
            </motion.h1>

            <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
              style={{ fontSize:16, color:'var(--text2)', lineHeight:1.8, marginBottom:32, maxWidth:440 }}>
              بوت واتساب يرد على عملاؤك بشكل إنساني ٢٤/٧، يحجز المواعيد، يوصي بالمنتجات — مدرَّب على بيانات مشروعك.
            </motion.p>

            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
              style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:32 }}>
              <motion.a href={WA} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.04, boxShadow:'0 20px 50px rgba(16,185,129,0.45)' }} whileTap={{ scale:0.97 }}
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'16px 36px', borderRadius:14,
                  background:'linear-gradient(135deg,#059669,#047857)', color:'#fff',
                  fontFamily:'Cairo,sans-serif', fontSize:15, fontWeight:900, textDecoration:'none',
                  boxShadow:'0 12px 36px rgba(5,150,105,0.4)' }}>فعّله لمشروعك ←</motion.a>
            </motion.div>

            {/* Stats */}
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              {[['٢٤/٧','متاح دائماً'],['<٢ث','سرعة الرد'],['GPT-4o','مدعوم بـ'],['عربي','أولاً']].map(([n,l],i) => (
                <motion.div key={i} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4+i*0.08 }}
                  style={{ padding:'10px 14px', borderRadius:10, background:'rgba(16,185,129,0.07)', border:'1px solid rgba(16,185,129,0.2)' }}>
                  <div style={{ fontSize:16, fontWeight:900, color:'#34D399' }}>{n}</div>
                  <div style={{ fontSize:10, color:'var(--text2)', marginTop:2 }}>{l}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Demo chat */}
          <div style={{ position:'relative' }}>
            <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.7 }}
              style={{ borderRadius:24, overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)',
                boxShadow:'0 32px 80px rgba(0,0,0,0.5)' }}>

              {/* Header */}
              <div style={{ padding:'14px 18px', background:'#111827', borderBottom:'1px solid rgba(255,255,255,0.07)',
                display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:38, height:38, borderRadius:'50%', background:'linear-gradient(135deg,#059669,#047857)',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🤖</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>مساعد كافيهك</div>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:'#10B981', boxShadow:'0 0 6px #10B981' }}/>
                    <span style={{ fontSize:10, color:'#10B981', fontWeight:600 }}>متصل الآن</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div ref={chatRef} style={{ height:320, overflowY:'auto', padding:'16px',
                background:'#0D1117', display:'flex', flexDirection:'column', gap:10,
                scrollbarWidth:'none' }}>
                <AnimatePresence>
                  {DEMO_MESSAGES.slice(0, visibleMessages).map((msg,i) => (
                    <motion.div key={i} initial={{ opacity:0, y:10, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }}
                      style={{ display:'flex', justifyContent:msg.role==='user'?'flex-start':'flex-end' }}>
                      <div style={{ maxWidth:'80%', padding:'10px 14px', borderRadius:14, fontSize:13, lineHeight:1.6,
                        background: msg.role==='user'?'rgba(255,255,255,0.06)':'rgba(16,185,129,0.12)',
                        border: `1px solid ${msg.role==='user'?'rgba(255,255,255,0.08)':'rgba(16,185,129,0.25)'}`,
                        color:msg.role==='user'?'var(--text2)':'#e2e8f0',
                        whiteSpace:'pre-line', fontFamily:'Cairo,sans-serif',
                        borderBottomRightRadius: msg.role==='user'?4:14,
                        borderBottomLeftRadius: msg.role==='bot'?4:14 }}>
                        {msg.text.replace(/\*\*(.*?)\*\*/g, '$1')}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div key="typing" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                      style={{ display:'flex', justifyContent:'flex-end' }}>
                      <div style={{ padding:'10px 14px', borderRadius:14, background:'rgba(16,185,129,0.12)',
                        border:'1px solid rgba(16,185,129,0.25)', display:'flex', gap:5, alignItems:'center' }}>
                        {[0,1,2].map(j => (
                          <motion.div key={j} animate={{ y:[0,-5,0] }} transition={{ duration:0.6, repeat:Infinity, delay:j*0.15 }}
                            style={{ width:7, height:7, borderRadius:'50%', background:'#34D399' }}/>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input bar */}
              <div style={{ padding:'12px 16px', background:'#111827', borderTop:'1px solid rgba(255,255,255,0.06)',
                display:'flex', gap:10, alignItems:'center' }}>
                <div style={{ flex:1, padding:'10px 14px', borderRadius:12, background:'rgba(255,255,255,0.05)',
                  border:'1px solid rgba(255,255,255,0.08)', fontSize:12, color:'rgba(255,255,255,0.25)',
                  fontFamily:'Cairo,sans-serif' }}>اكتب رسالتك...</div>
                <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#059669,#047857)',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>←</div>
              </div>
            </motion.div>

            {/* WA label */}
            <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:1 }}
              style={{ position:'absolute', top:-14, left:-14, padding:'7px 14px', borderRadius:12,
                background:'rgba(37,211,102,0.12)', border:'1px solid rgba(37,211,102,0.3)',
                fontSize:11, fontWeight:700, color:'#34D399', display:'flex', alignItems:'center', gap:6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#34D399"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp مدعوم بـ
            </motion.div>
          </div>
        </div>
        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.2, repeat:Infinity }}
          style={{ position:'absolute', bottom:32, fontSize:22, opacity:0.25 }}>↓</motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', background:'var(--bg2)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:52 }}>
            <div className="section-label" style={{ color:'#34D399', borderColor:'rgba(52,211,153,0.3)',
              background:'rgba(52,211,153,0.08)', marginBottom:16 }}>✨ الإمكانيات</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>ما يستطيع الذكاء الاصطناعي</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:14 }}>
            {AI_FEATURES.map((f,i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.08 }}
                whileHover={{ y:-6, boxShadow:`0 20px 48px ${f.color}22` }}
                style={{ padding:'24px 22px', borderRadius:16, background:'rgba(255,255,255,0.03)',
                  border:`1px solid ${f.color}20`, transition:'box-shadow 0.25s,transform 0.25s' }}>
                <div style={{ width:40, height:40, borderRadius:10, background:`${f.color}18`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginBottom:12 }}>{f.icon}</div>
                <div style={{ fontSize:14, fontWeight:800, color:'#fff', marginBottom:7 }}>{f.title}</div>
                <div style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.7 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section style={{ padding:'clamp(60px,8vw,100px) 24px' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:48 }}>
            <div className="section-label" style={{ color:'#34D399', borderColor:'rgba(52,211,153,0.3)',
              background:'rgba(52,211,153,0.08)', marginBottom:16 }}>🏢 تطبيقات فعلية</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>كيف يساعد كل قطاع</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12 }}>
            {USE_CASES.map((u,i) => (
              <motion.div key={i} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}
                style={{ padding:'20px', borderRadius:14, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{u.icon}</div>
                <div style={{ fontSize:13, fontWeight:800, color:'#fff', marginBottom:8 }}>{u.sector}</div>
                <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.7 }}>{u.use}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AiChat />

      {/* ── CTA ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', textAlign:'center',
        background:'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(16,185,129,0.12) 0%,transparent 70%)' }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div style={{ fontSize:52, marginBottom:20 }}>🤖</div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff', marginBottom:14 }}>
            وظّف الذكاء الاصطناعي في مشروعك</h2>
          <p style={{ fontSize:16, color:'var(--text2)', marginBottom:36, maxWidth:420, margin:'0 auto 36px' }}>
            تواصل معنا — نبني بوتًا مخصصاً لمشروعك ويعمل خلال أسبوع.</p>
          <motion.a href={WA} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05, boxShadow:'0 20px 50px rgba(16,185,129,0.45)' }} whileTap={{ scale:0.97 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'17px 44px', borderRadius:16,
              background:'linear-gradient(135deg,#059669,#047857)', color:'#fff',
              fontFamily:'Cairo,sans-serif', fontSize:17, fontWeight:900, textDecoration:'none',
              boxShadow:'0 16px 48px rgba(5,150,105,0.45)' }}>فعّل الذكاء الاصطناعي ←</motion.a>
        </motion.div>
      </section>
    </PageLayout>
  );
}
