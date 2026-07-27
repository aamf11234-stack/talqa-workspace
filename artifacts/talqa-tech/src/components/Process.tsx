import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Figma, Code2, Rocket,
  CheckCircle2, ChevronDown, type LucideIcon,
} from 'lucide-react';

/* ── STEPS DATA ── */
interface Step {
  n: string;
  Icon: LucideIcon;
  color: string;
  glow: string;
  title: string;
  subtitle: string;
  desc: string;
  deliverables: string[];
  duration: string;
}

const STEPS: Step[] = [
  {
    n: '01', Icon: MessageCircle,
    color: '#A78BFA', glow: 'rgba(167,139,250,0.25)',
    title: 'جلسة الفهم',
    subtitle: 'نفهم قبل ما نبني',
    desc: 'نجلس معك ونحلل فكرتك بالكامل — جمهورك، منافسيك، وأهدافك. بدون عجلة وبدون التزام.',
    deliverables: ['وثيقة متطلبات مفصّلة', 'تحليل المنافسين', 'تعريف المستخدم المستهدف', 'اقتراح أولي للحل'],
    duration: '١–٢ يوم',
  },
  {
    n: '02', Icon: Figma,
    color: '#60A5FA', glow: 'rgba(96,165,250,0.25)',
    title: 'التصميم والخطة',
    subtitle: 'ترى كل شيء قبل البناء',
    desc: 'نصمم كل شاشة ونعرض عليك Prototype تفاعلي — تشوف المنتج قبل كتابة سطر كود واحد.',
    deliverables: ['Wireframes كاملة', 'Prototype تفاعلي', 'خطة العمل والجدول', 'عرض السعر النهائي'],
    duration: '٣–٥ أيام',
  },
  {
    n: '03', Icon: Code2,
    color: '#34D399', glow: 'rgba(52,211,153,0.25)',
    title: 'البناء والتطوير',
    subtitle: 'شفافية كاملة طوال الرحلة',
    desc: 'نبني بمعايير عالية مع تقارير أسبوعية وصلاحية وصول مباشر لرؤية التقدم في أي وقت.',
    deliverables: ['Sprint أسبوعي + تقرير', 'Demo حي كل أسبوعين', 'كود موثّق ومرتّب', 'اختبار مستمر (QA)'],
    duration: 'حسب المشروع',
  },
  {
    n: '04', Icon: Rocket,
    color: '#FB923C', glow: 'rgba(251,146,60,0.25)',
    title: 'التسليم والدعم',
    subtitle: 'ما نتركك بعد الإطلاق',
    desc: 'نطلق المشروع معك، نتابع الأداء، ونصلح أي شيء فوراً — ٣ أشهر دعم مجاناً.',
    deliverables: ['إطلاق على Store / Live', 'توثيق كامل للنظام', '٣ أشهر دعم مجاني', 'تدريب فريقك'],
    duration: '١ أسبوع + ٣ أشهر',
  },
];

/* ── connector line width per step ── */
const LINE_PCT = ['0%', '33.3%', '66.6%', '100%'];

export default function Process() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="process"
      style={{
        padding: 'clamp(80px,10vw,140px) 0',
        background: 'var(--bg2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div className="orb" style={{ width:500, height:500, top:'5%',  left:'-10%', background:'rgba(167,139,250,0.05)', animationDelay:'-2s' }} />
      <div className="orb" style={{ width:400, height:400, bottom:'0%', right:'5%',  background:'rgba(52,211,153,0.05)',  animationDelay:'-6s' }} />

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ textAlign:'center', marginBottom:72 }}
        >
          <div
            className="section-label"
            style={{
              color:'#A78BFA', borderColor:'rgba(167,139,250,0.3)',
              background:'rgba(167,139,250,0.08)', marginBottom:20,
              display:'inline-flex', alignItems:'center', gap:7,
            }}
          >
            <MessageCircle size={13} strokeWidth={2} /> كيف نشتغل
          </div>
          <h2 style={{
            fontWeight:900,
            fontSize:'clamp(2rem,4.5vw,3.4rem)',
            letterSpacing:'-0.04em',
            lineHeight:1.1,
            color:'#fff',
          }}>
            من الفكرة إلى{' '}
            <span style={{
              background:'linear-gradient(135deg,#A78BFA,#60A5FA)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              backgroundClip:'text',
            }}>
              المنتج الحي
            </span>
          </h2>
          <p style={{ color:'var(--text2)', fontSize:16, marginTop:14, maxWidth:460, margin:'14px auto 0', lineHeight:1.8 }}>
            ٤ خطوات واضحة — تعرف في كل لحظة وين المشروع وإيش القادم.
          </p>
        </motion.div>

        {/* ── Timeline connector (desktop) ── */}
        <div style={{ position:'relative', marginBottom:48, display:'none' }} className="process-timeline-line" />

        {/* ── Steps grid ── */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',
          gap:20,
          position:'relative',
        }}>
          {/* Connector line behind cards */}
          <div style={{
            position:'absolute',
            top:52,
            left:'12.5%',
            right:'12.5%',
            height:2,
            background:'rgba(255,255,255,0.06)',
            borderRadius:2,
            pointerEvents:'none',
            zIndex:0,
          }}>
            <motion.div
              initial={{ width:'0%' }}
              whileInView={{ width:'100%' }}
              viewport={{ once:true }}
              transition={{ duration:1.4, ease:'easeOut', delay:0.3 }}
              style={{
                height:'100%',
                background:'linear-gradient(90deg,#A78BFA,#60A5FA,#34D399,#FB923C)',
                borderRadius:2,
              }}
            />
          </div>

          {STEPS.map((step, i) => {
            const isOpen = active === i;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity:0, y:32 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay: i * 0.12, duration:0.55 }}
                style={{ position:'relative', zIndex:1 }}
              >
                {/* Step node dot on the line */}
                <div style={{
                  width:20, height:20, borderRadius:'50%',
                  background:`linear-gradient(135deg,${step.color},${step.color}99)`,
                  border:`3px solid var(--bg2)`,
                  boxShadow:`0 0 0 2px ${step.color}60, 0 0 16px ${step.color}50`,
                  margin:'0 auto 28px',
                  position:'relative', zIndex:2,
                }} />

                {/* Card */}
                <motion.button
                  onClick={() => setActive(isOpen ? null : i)}
                  whileHover={{ y:-4 }}
                  whileTap={{ scale:0.98 }}
                  style={{
                    width:'100%',
                    padding:'28px 24px',
                    borderRadius:22,
                    background: isOpen
                      ? `linear-gradient(145deg,${step.color}12,${step.color}06)`
                      : 'rgba(255,255,255,0.03)',
                    border:`1.5px solid ${isOpen ? step.color+'50' : step.color+'20'}`,
                    boxShadow: isOpen ? `0 20px 60px ${step.glow}` : 'none',
                    cursor:'pointer',
                    textAlign:'right',
                    transition:'all 0.3s',
                  }}
                >
                  {/* Card header */}
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:16 }}>
                    <div style={{
                      width:50, height:50, borderRadius:15,
                      background:`${step.color}15`,
                      border:`1px solid ${step.color}35`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      flexShrink:0,
                    }}>
                      <step.Icon size={22} strokeWidth={1.75} style={{ color:step.color }} />
                    </div>

                    <div style={{ textAlign:'left', display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4 }}>
                      <span style={{
                        fontFamily:'monospace', fontSize:32, fontWeight:900,
                        color:`${step.color}25`,
                        letterSpacing:'-0.05em', lineHeight:1,
                      }}>
                        {step.n}
                      </span>
                      <span style={{
                        fontSize:9, fontWeight:700,
                        color: step.color,
                        padding:'3px 9px', borderRadius:20,
                        background:`${step.color}15`,
                        border:`1px solid ${step.color}30`,
                        fontFamily:'Cairo,sans-serif',
                        whiteSpace:'nowrap',
                      }}>
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize:17, fontWeight:900, color:'#fff', marginBottom:6, fontFamily:'Cairo,sans-serif' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize:11, color:step.color, fontWeight:700, marginBottom:10, fontFamily:'Cairo,sans-serif' }}>
                    {step.subtitle}
                  </div>
                  <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', lineHeight:1.75, fontFamily:'Cairo,sans-serif', marginBottom:14 }}>
                    {step.desc}
                  </div>

                  {/* Toggle button */}
                  <div style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    paddingTop:12, borderTop:`1px solid ${step.color}15`,
                  }}>
                    <span style={{ fontSize:11, color:`${step.color}cc`, fontWeight:700, fontFamily:'Cairo,sans-serif' }}>
                      {isOpen ? 'إغلاق' : 'المخرجات'}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration:0.25 }}
                    >
                      <ChevronDown size={15} style={{ color:step.color }} />
                    </motion.div>
                  </div>

                  {/* Deliverables (expandable) */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height:0, opacity:0 }}
                        animate={{ height:'auto', opacity:1 }}
                        exit={{ height:0, opacity:0 }}
                        transition={{ duration:0.3, ease:'easeOut' }}
                        style={{ overflow:'hidden' }}
                      >
                        <div style={{ paddingTop:14, display:'flex', flexDirection:'column', gap:8 }}>
                          {step.deliverables.map((d, j) => (
                            <motion.div
                              key={j}
                              initial={{ opacity:0, x:8 }}
                              animate={{ opacity:1, x:0 }}
                              transition={{ delay: j * 0.06 }}
                              style={{
                                display:'flex', alignItems:'center', gap:10,
                                padding:'9px 12px', borderRadius:12,
                                background:`${step.color}08`,
                                border:`1px solid ${step.color}20`,
                              }}
                            >
                              <CheckCircle2 size={13} strokeWidth={2.5} style={{ color:step.color, flexShrink:0 }} />
                              <span style={{ fontSize:12, color:'rgba(255,255,255,0.8)', fontFamily:'Cairo,sans-serif', lineHeight:1.4 }}>
                                {d}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.5, delay:0.4 }}
          style={{
            marginTop:56,
            padding:'28px 36px',
            borderRadius:22,
            background:'linear-gradient(135deg,rgba(167,139,250,0.08),rgba(52,211,153,0.06))',
            border:'1px solid rgba(167,139,250,0.2)',
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            gap:20,
            flexWrap:'wrap',
          }}
        >
          <div>
            <div style={{ fontSize:18, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif', marginBottom:5 }}>
              مستعد تبدأ؟
            </div>
            <div style={{ fontSize:13, color:'var(--text2)', fontFamily:'Cairo,sans-serif' }}>
              الخطوة الأولى مجانية — جلسة فهم بدون أي التزام.
            </div>
          </div>
          <motion.a
            href="https://wa.me/966551378531"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale:1.05, boxShadow:'0 16px 48px rgba(167,139,250,0.35)' }}
            whileTap={{ scale:0.97 }}
            style={{
              padding:'13px 28px',
              borderRadius:14,
              background:'linear-gradient(135deg,#7C3AED,#4F8AFF)',
              color:'#fff',
              fontFamily:'Cairo,sans-serif',
              fontSize:14,
              fontWeight:800,
              textDecoration:'none',
              display:'inline-flex',
              alignItems:'center',
              gap:8,
              flexShrink:0,
            }}
          >
            <MessageCircle size={15} strokeWidth={2} />
            ابدأ مشروعك الآن
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
