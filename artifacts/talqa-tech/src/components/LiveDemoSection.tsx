import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpLeft, RotateCcw, Store, UtensilsCrossed } from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=' + encodeURIComponent('السلام عليكم، شفت الديمو وأبي نظام ولاء لنشاطي');

function buildUrl(biz: string, type: 'cafe' | 'restaurant') {
  const origin = window.location.origin;
  const p = new URLSearchParams({ mode: 'app', biz: biz || 'نشاطك', type });
  return `${origin}/haeez-loyalty/?${p.toString()}`;
}

export default function LiveDemoSection() {
  const [biz,     setBiz]     = useState('');
  const [type,    setType]    = useState<'cafe' | 'restaurant'>('cafe');
  const [demoUrl, setDemoUrl] = useState(() => buildUrl('', 'cafe'));
  const [iframeKey, setKey]   = useState(0);
  const [applied, setApplied] = useState(false);

  const apply = () => {
    setDemoUrl(buildUrl(biz, type));
    setKey(k => k + 1);
    setApplied(true);
  };

  const reset = () => {
    setBiz(''); setType('cafe');
    setDemoUrl(buildUrl('', 'cafe'));
    setKey(k => k + 1);
    setApplied(false);
  };

  return (
    <section style={{
      padding: 'clamp(72px,10vw,120px) clamp(20px,6vw,80px)',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg,rgba(99,102,241,0.05) 0%,transparent 100%)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* ambient */}
      <div style={{ position:'absolute', top:'10%', left:'50%', transform:'translateX(-50%)', width:900, height:700, borderRadius:'50%', background:'radial-gradient(ellipse,rgba(99,102,241,0.09) 0%,transparent 65%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:2 }}>

        {/* ─── header ─── */}
        <div style={{ textAlign:'center', marginBottom:'clamp(40px,6vw,72px)' }}>
          <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 18px', borderRadius:99, border:'1px solid rgba(129,140,248,0.3)', background:'rgba(129,140,248,0.08)', fontSize:12, fontWeight:700, color:'#818CF8', marginBottom:22, letterSpacing:1 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#818CF8', boxShadow:'0 0 8px #818CF8' }} />
            ✦ ديمو حي وتفاعلي — جرّبه الآن
          </motion.div>

          <motion.h2 initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.06}}
            style={{ fontFamily:'Cairo,sans-serif', fontWeight:900, fontSize:'clamp(2rem,4vw,3.2rem)', color:'#fff', letterSpacing:'-0.04em', lineHeight:1.1, marginBottom:16 }}>
            شوف تطبيقك قبل ما تطلبه
          </motion.h2>

          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.12}}
            style={{ fontFamily:'Cairo,sans-serif', fontSize:16, color:'rgba(255,255,255,0.5)', lineHeight:1.8, maxWidth:460, margin:'0 auto' }}>
            حط اسم نشاطك — التطبيق يتحدث أمامك فوراً بهويتك
          </motion.p>
        </div>

        {/* ─── body: stacks on mobile, side-by-side on desktop ─── */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'minmax(0,1fr)',
          gap:40,
        }}
          className="demo-grid"
        >
          {/* controls */}
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}}>

            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(129,140,248,0.18)', borderRadius:28, padding:'clamp(20px,4vw,32px)', marginBottom:20 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:26 }}>
                <div style={{ width:36, height:36, borderRadius:11, background:'rgba(129,140,248,0.12)', border:'1px solid rgba(129,140,248,0.22)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Sparkles size={17} color="#818CF8" />
                </div>
                <div>
                  <div style={{ fontFamily:'Cairo,sans-serif', fontWeight:800, fontSize:15, color:'#fff' }}>خصّص الديمو</div>
                  <div style={{ fontFamily:'Cairo,sans-serif', fontSize:12, color:'rgba(255,255,255,0.4)' }}>شوف تطبيقك بهويتك قبل ما تطلبه</div>
                </div>
              </div>

              {/* type toggle */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontFamily:'Cairo,sans-serif', fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.4)', marginBottom:10 }}>نوع نشاطك</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {([
                    { v:'cafe',       label:'كافيه / مقهى',  Icon: Sparkles },
                    { v:'restaurant', label:'مطعم',           Icon: UtensilsCrossed },
                  ] as const).map(({ v, label, Icon }) => (
                    <button key={v} onClick={() => setType(v)}
                      style={{ padding:'11px 14px', border:`1.5px solid ${type===v ? 'rgba(129,140,248,0.6)' : 'rgba(255,255,255,0.08)'}`, borderRadius:14, background: type===v ? 'rgba(129,140,248,0.13)' : 'transparent', color: type===v ? '#c7d2fe' : 'rgba(255,255,255,0.4)', fontFamily:'Cairo,sans-serif', fontSize:14, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'all 0.18s' }}>
                      <Icon size={14} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* name input */}
              <div style={{ marginBottom:20 }}>
                <div style={{ fontFamily:'Cairo,sans-serif', fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.4)', marginBottom:10, display:'flex', alignItems:'center', gap:5 }}>
                  <Store size={12} />
                  اسم نشاطك التجاري
                </div>
                <input value={biz} onChange={e => setBiz(e.target.value)}
                  onKeyDown={e => e.key==='Enter' && biz.trim() && apply()}
                  placeholder={type==='cafe' ? 'مثال: كافيه النخبة' : 'مثال: مطعم البيت'}
                  style={{ width:'100%', padding:'13px 16px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.10)', borderRadius:14, color:'#fff', fontSize:15, fontFamily:'Cairo,sans-serif', outline:'none', direction:'rtl', boxSizing:'border-box' }}
                  onFocus={e => (e.target.style.borderColor='rgba(129,140,248,0.5)')}
                  onBlur={e => (e.target.style.borderColor='rgba(255,255,255,0.10)')}
                />
              </div>

              {/* apply */}
              <motion.button onClick={apply} disabled={!biz.trim()}
                whileHover={biz.trim() ? { scale:1.02, boxShadow:'0 16px 40px rgba(99,102,241,0.40)' } : undefined}
                whileTap={biz.trim() ? { scale:0.98 } : undefined}
                style={{ width:'100%', padding:'14px', background: biz.trim() ? 'linear-gradient(135deg,#818CF8,#6366F1)' : 'rgba(129,140,248,0.10)', border: biz.trim() ? 'none' : '1px solid rgba(129,140,248,0.18)', borderRadius:16, color: biz.trim() ? '#fff' : 'rgba(255,255,255,0.3)', fontFamily:'Cairo,sans-serif', fontSize:16, fontWeight:900, cursor: biz.trim() ? 'pointer' : 'not-allowed', display:'flex', alignItems:'center', justifyContent:'center', gap:10, boxShadow: biz.trim() ? '0 8px 28px rgba(99,102,241,0.28)' : 'none', transition:'all 0.2s' }}>
                <Sparkles size={17} />
                {biz.trim() ? `شوف تطبيق ${biz}` : 'أدخل اسم نشاطك أولاً'}
              </motion.button>

              <AnimatePresence>
                {applied && (
                  <motion.button key="reset" initial={{opacity:0,height:0,marginTop:0}} animate={{opacity:1,height:'auto',marginTop:10}} exit={{opacity:0,height:0,marginTop:0}}
                    onClick={reset}
                    style={{ width:'100%', padding:'10px', background:'transparent', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, color:'rgba(255,255,255,0.33)', fontFamily:'Cairo,sans-serif', fontSize:13, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                    <RotateCcw size={12} />
                    جرّب اسماً آخر
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* feature chips */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
              {['💳 Apple Wallet','🎯 نقاط ولاء','📱 قائمة QR','🤝 تحديات','📊 لوحة تحكم'].map(t => (
                <div key={t} style={{ padding:'6px 14px', borderRadius:99, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', fontFamily:'Cairo,sans-serif', fontSize:13, color:'rgba(255,255,255,0.5)', fontWeight:600 }}>{t}</div>
              ))}
            </div>

            {/* CTA */}
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.03, boxShadow:'0 20px 50px rgba(99,102,241,0.40)' }} whileTap={{ scale:0.97 }}
              style={{ display:'inline-flex', alignItems:'center', gap:10, background:'linear-gradient(135deg,#818CF8,#6366F1)', color:'#fff', padding:'14px 28px', borderRadius:14, fontFamily:'Cairo,sans-serif', fontWeight:900, fontSize:15, textDecoration:'none', boxShadow:'0 8px 28px rgba(99,102,241,0.25)' }}>
              أطلب تطبيقك الآن
              <ArrowUpLeft size={16} strokeWidth={2.5} />
            </motion.a>
          </motion.div>

          {/* phone frame */}
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.65, delay:0.08}}
            style={{ display:'flex', justifyContent:'center', position:'relative' }}>

            {/* glow behind phone */}
            <div style={{ position:'absolute', inset:-60, borderRadius:'50%', background:'radial-gradient(ellipse,rgba(99,102,241,0.18) 0%,transparent 65%)', pointerEvents:'none' }} />

            {/* floating badge — points */}
            <motion.div animate={{ y:[0,-7,0] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'absolute', top:36, right:'calc(50% + 130px)', zIndex:10, background:'rgba(8,8,20,0.92)', backdropFilter:'blur(20px)', border:'1px solid rgba(129,140,248,0.22)', borderRadius:16, padding:'10px 16px', boxShadow:'0 14px 36px rgba(0,0,0,0.55)', whiteSpace:'nowrap', display:'flex', flexDirection:'column', gap:3 }}>
              <div style={{ fontFamily:'Cairo,sans-serif', fontSize:11, fontWeight:800, color:'#fff' }}>تطبيق حي ✦</div>
              <div style={{ fontFamily:'Cairo,sans-serif', fontSize:10, color:'#818CF8' }}>قابل للتفاعل الكامل</div>
            </motion.div>

            {/* floating badge — retention */}
            <motion.div animate={{ y:[0,7,0] }} transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut', delay:0.6 }}
              style={{ position:'absolute', bottom:100, right:'calc(50% + 128px)', zIndex:10, background:'rgba(8,8,20,0.92)', backdropFilter:'blur(20px)', border:'1px solid rgba(16,185,129,0.22)', borderRadius:16, padding:'10px 14px', boxShadow:'0 14px 36px rgba(0,0,0,0.55)', whiteSpace:'nowrap', display:'flex', flexDirection:'column', gap:3 }}>
              <div style={{ fontFamily:'Cairo,sans-serif', fontSize:11, fontWeight:800, color:'#10B981' }}>+٣٥٪ عودة عملاء</div>
              <div style={{ fontFamily:'Cairo,sans-serif', fontSize:10, color:'rgba(255,255,255,0.4)' }}>متوسط نتائجنا</div>
            </motion.div>

            {/* phone shell */}
            <motion.div animate={{ y:[0,-7,0] }} transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }}
              style={{ width:290, height:590, borderRadius:50, background:'linear-gradient(160deg,#12102a 0%,#070516 100%)', border:'1.5px solid rgba(129,140,248,0.20)', boxShadow:'0 60px 140px rgba(0,0,0,0.75), 0 0 80px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.05)', position:'relative', overflow:'hidden', padding:'14px 10px 12px' }}>

              {/* top sheen */}
              <div style={{ position:'absolute', top:0, insetInline:0, height:160, background:'linear-gradient(180deg,rgba(129,140,248,0.06) 0%,transparent 100%)', pointerEvents:'none', zIndex:3 }} />

              {/* notch */}
              <div style={{ width:86, height:24, borderRadius:12, background:'#000', margin:'0 auto 8px', display:'flex', alignItems:'center', justifyContent:'center', gap:6, position:'relative', zIndex:4 }}>
                <div style={{ width:9, height:9, borderRadius:'50%', background:'#1a1a1a', border:'1px solid #2a2a2a' }} />
                <div style={{ width:34, height:4, borderRadius:3, background:'#111' }} />
              </div>

              {/* iframe */}
              <div style={{ height:508, borderRadius:36, overflow:'hidden', background:'#F8F6F2', position:'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.iframe
                    key={iframeKey}
                    src={demoUrl}
                    initial={{ opacity:0 }}
                    animate={{ opacity:1 }}
                    exit={{ opacity:0 }}
                    transition={{ duration:0.35 }}
                    style={{ width:'100%', height:'100%', border:'none', display:'block' }}
                    title="Live Demo — حيز"
                  />
                </AnimatePresence>
              </div>

              {/* home bar */}
              <div style={{ width:86, height:4, borderRadius:2, background:'rgba(255,255,255,0.12)', margin:'8px auto 0', position:'relative', zIndex:4 }} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* responsive CSS injected inline */}
      <style>{`
        @media (min-width: 900px) {
          .demo-grid {
            grid-template-columns: minmax(0,1fr) auto !important;
            gap: 56px !important;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
