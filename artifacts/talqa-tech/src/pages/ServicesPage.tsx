import { motion } from 'framer-motion';
import PageLayout from './PageLayout';
import HorizontalServices from '../components/HorizontalServices';
import WhyUs from '../components/WhyUs';
import Process from '../components/Process';

const WA = 'https://wa.me/966551378531?text=أبي%20عرض%20سعر%20لمشروعي';

const SERVICES = [
  { icon:'📱', title:'تطبيقات الجوال',       sub:'iOS & Android',      color:'#6D28D9', desc:'تطبيقات أصلية وهجينة بأعلى معايير UX — تصوير على App Store وPlay Store.' },
  { icon:'🌐', title:'مواقع الويب',          sub:'React & Next.js',    color:'#0EA5E9', desc:'مواقع فائقة السرعة بـ Core Web Vitals ممتازة — تسويقية أو متاجر.' },
  { icon:'💳', title:'Digital Wallet',        sub:'Apple & Google Wallet',color:'#8B5CF6', desc:'بطاقات رقمية موقّعة رسمياً لـ iPhone وAndroid — ولاء، فنادق، عيادات، طيران، وأكثر من ٨ أنواع.' },
  { icon:'🤖', title:'الذكاء الاصطناعي',     sub:'GPT-4o & Custom AI', color:'#10B981', desc:'بوت واتساب ذكي، تحليل بيانات، توصيات مخصصة — مبني على بيانات عملك.' },
  { icon:'📅', title:'أنظمة الحجوزات',       sub:'Real-time Booking',  color:'#F59E0B', desc:'حجز طبي وفندقي وصالون — مع تأكيد واتساب، Apple Watch، وتقويم.' },
  { icon:'🔄', title:'الأتمتة والتكاملات',   sub:'Zapier & Webhooks',  color:'#EC4899', desc:'ربط أنظمتك ببعضها — CRM، محاسبة، مخازن، ولوجستيات — بلا أكواد.' },
  { icon:'💰', title:'المتاجر الإلكترونية',  sub:'Shopify & Custom',   color:'#06B6D4', desc:'متاجر سريعة مع Apple Pay، STC Pay، وتتبع توصيل لحظي.' },
  { icon:'📊', title:'لوحات التحكم',         sub:'Real-time Dashboards',color:'#A855F7', desc:'لوحات تحليل مخصصة تجمع بيانات كل أنظمتك في شاشة واحدة.' },
  { icon:'🔐', title:'الأمان والامتثال',     sub:'SOC2 & PDPL',        color:'#64748B', desc:'بنية أمنية متوافقة مع هيئة حماية البيانات الشخصية السعودية.' },
];

const TECH = [
  ['React','Next.js','TypeScript','Vite'],
  ['Node.js','Fastify','Prisma','PostgreSQL'],
  ['Swift','Kotlin','Expo','React Native'],
  ['OpenAI','Anthropic','Langchain','Pinecone'],
  ['AWS','Vercel','Cloudflare','Docker'],
  ['Apple PassKit','NFC','WhatsApp API','Stripe'],
];

const WHY = [
  { n:'٢ أسبوع', label:'متوسط وقت التسليم', icon:'⚡' },
  { n:'+٥٠',     label:'مشروع مُسلَّم',      icon:'🏆' },
  { n:'٩٩٪',    label:'رضا العملاء',         icon:'⭐' },
  { n:'٣ أشهر', label:'دعم مجاني بعد التسليم',icon:'🛡️' },
];

export default function ServicesPage() {
  return (
    <PageLayout accent="#6D28D9">
      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', overflow:'hidden', padding:'100px 24px 60px' }}>
        <div style={{ position:'absolute', left:'4%', top:'8%', width:500, height:500, borderRadius:'50%',
          background:'#7C3AED', filter:'blur(180px)', opacity:0.1, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', right:'4%', bottom:'10%', width:350, height:350, borderRadius:'50%',
          background:'#0EA5E9', filter:'blur:150px', opacity:0.08, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:'linear-gradient(rgba(109,40,217,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(109,40,217,0.055) 1px,transparent 1px)',
          backgroundSize:'64px 64px' }}/>

        {/* Floating service icons */}
        {SERVICES.slice(0,6).map((s,i) => (
          <motion.div key={i} animate={{ y:[0,-18-i*3,0], rotate:[0,i%2?6:-6,0] }}
            transition={{ duration:6+i*1.1, repeat:Infinity, delay:i*0.8, ease:'easeInOut' }}
            style={{ position:'absolute', fontSize:40+(i%3)*10,
              left:`${6+(i*15)%84}%`, top:`${12+(i*13)%76}%`,
              opacity:0.06, pointerEvents:'none', userSelect:'none' }}>{s.icon}</motion.div>
        ))}

        <div style={{ position:'relative', zIndex:2, maxWidth:840, textAlign:'center' }}>
          <motion.div initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
            transition={{ type:'spring', stiffness:220 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:28, padding:'10px 22px',
              borderRadius:28, background:'rgba(109,40,217,0.1)', border:'1px solid rgba(109,40,217,0.3)' }}>
            <span style={{ fontSize:22 }}>🛠️</span>
            <span style={{ fontSize:13, fontWeight:800, color:'#A78BFA', letterSpacing:0.3 }}>خدماتنا التقنية</span>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
            style={{ fontWeight:900, fontSize:'clamp(3rem,8vw,6rem)', letterSpacing:'-0.045em', lineHeight:1.0, marginBottom:24 }}>
            <span style={{ color:'#fff', display:'block' }}>نبني كل ما</span>
            <span style={{ background:'linear-gradient(135deg,#A78BFA,#60A5FA)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display:'block' }}>
              تحتاجه</span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.6 }}
            style={{ fontSize:18, color:'var(--text2)', lineHeight:1.8, marginBottom:40, maxWidth:560, margin:'0 auto 40px' }}>
            من الفكرة إلى المنتج الحي — تطبيقات، مواقع، Apple & Google Wallet، أنظمة حجز، وذكاء اصطناعي. كل شيء تحت سقف واحد.
          </motion.p>

          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
            style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.04, boxShadow:'0 20px 50px rgba(109,40,217,0.45)' }} whileTap={{ scale:0.97 }}
              style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'16px 38px', borderRadius:14,
                background:'linear-gradient(135deg,#7C3AED,#4F46E5)', color:'#fff',
                fontFamily:'Cairo,sans-serif', fontSize:16, fontWeight:900, textDecoration:'none',
                boxShadow:'0 12px 36px rgba(109,40,217,0.35)' }}>
              احصل على عرض سعر مجاني ←
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
            style={{ display:'flex', gap:0, justifyContent:'center', flexWrap:'wrap', marginTop:52,
              padding:'28px 32px', borderRadius:20, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
            {WHY.map((w,i) => (
              <div key={i} style={{ flex:'1 1 140px', textAlign:'center', padding:'12px',
                borderRight:i<WHY.length-1?'1px solid rgba(255,255,255,0.07)':undefined }}>
                <div style={{ fontSize:24, marginBottom:6 }}>{w.icon}</div>
                <div style={{ fontSize:28, fontWeight:900, color:'#A78BFA', letterSpacing:-1 }}>{w.n}</div>
                <div style={{ fontSize:11, color:'var(--text2)', marginTop:4 }}>{w.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.2, repeat:Infinity }}
          style={{ position:'absolute', bottom:32, fontSize:22, opacity:0.25 }}>↓</motion.div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', background:'var(--bg2)' }}>
        <div style={{ maxWidth:1160, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:56 }}>
            <div className="section-label" style={{ color:'#A78BFA', borderColor:'rgba(167,139,250,0.3)',
              background:'rgba(167,139,250,0.08)', marginBottom:16 }}>✨ ما الذي نبنيه</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>
              ٩ خدمات تقنية متكاملة</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:16 }}>
            {SERVICES.map((s,i) => (
              <motion.div key={i} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.07 }}
                whileHover={{ y:-6, boxShadow:`0 24px 56px ${s.color}22` }}
                style={{ padding:'26px 22px', borderRadius:18, position:'relative', overflow:'hidden',
                  background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)',
                  transition:'box-shadow 0.25s,transform 0.25s' }}>
                <div style={{ position:'absolute', top:0, left:0, width:'100%', height:2,
                  background:`linear-gradient(90deg,${s.color},transparent)`, opacity:0.6 }}/>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:`${s.color}20`,
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:800, color:'#fff' }}>{s.title}</div>
                    <div style={{ fontSize:10.5, color:s.color, fontWeight:600, letterSpacing:0.3 }}>{s.sub}</div>
                  </div>
                </div>
                <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7 }}>{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ padding:'clamp(60px,8vw,100px) 24px' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:44 }}>
            <div className="section-label" style={{ color:'#A78BFA', borderColor:'rgba(167,139,250,0.3)',
              background:'rgba(167,139,250,0.08)', marginBottom:16 }}>⚙️ التقنيات التي نستخدمها</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.6rem,3.5vw,2.6rem)', color:'#fff' }}>
              Stack عالمي — خبرة محلية</h2>
          </motion.div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {TECH.map((row,ri) => (
              <div key={ri} style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center' }}>
                {row.map((t,ti) => (
                  <motion.div key={ti} initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }}
                    viewport={{ once:true }} transition={{ delay:(ri*4+ti)*0.05 }}
                    whileHover={{ y:-3 }}
                    style={{ padding:'8px 18px', borderRadius:20, background:'rgba(255,255,255,0.04)',
                      border:'1px solid rgba(255,255,255,0.1)', fontSize:12.5, fontWeight:700, color:'var(--text2)',
                      cursor:'default', transition:'transform 0.2s' }}>{t}</motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />
      <HorizontalServices />
      <div className="section-divider" />
      <WhyUs />
      <div className="section-divider" />
      <Process />

      {/* ── FINAL CTA ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', textAlign:'center',
        background:'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(109,40,217,0.1) 0%,transparent 70%)' }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div style={{ fontSize:52, marginBottom:20 }}>🚀</div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff', marginBottom:14 }}>
            مستعد تبدأ مشروعك؟</h2>
          <p style={{ fontSize:16, color:'var(--text2)', marginBottom:36, maxWidth:420, margin:'0 auto 36px' }}>
            تواصل معنا على واتساب — نحلل مشروعك ونرسل عرض سعر مفصل خلال ٢٤ ساعة مجاناً.</p>
          <motion.a href={WA} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05, boxShadow:'0 20px 50px rgba(109,40,217,0.45)' }} whileTap={{ scale:0.97 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'17px 44px', borderRadius:16,
              background:'linear-gradient(135deg,#7C3AED,#4F46E5)', color:'#fff',
              fontFamily:'Cairo,sans-serif', fontSize:17, fontWeight:900, textDecoration:'none',
              boxShadow:'0 16px 48px rgba(109,40,217,0.4)' }}>
            ابدأ الآن على واتساب ←
          </motion.a>
        </motion.div>
      </section>
    </PageLayout>
  );
}
