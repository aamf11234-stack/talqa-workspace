import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WA_WALLET = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أبي%20أضيف%20Apple%20Wallet%20لمشروعي';

/* ─── Palette presets ─── */
const PALETTES = [
  { label: 'بنفسجي · تيل',  bg: ['#1a0a35','#0f1a40'],  accent: '#8B5CF6', label2: '#06B6D4' },
  { label: 'ذهبي · بني',    bg: ['#1a0800','#2a1200'],  accent: '#F59E0B', label2: '#C47A3A' },
  { label: 'أزرق · سماوي',  bg: ['#020d1f','#0a1a38'],  accent: '#3B82F6', label2: '#38BDF8' },
  { label: 'أخضر · زمردي',  bg: ['#011a0e','#022b18'],  accent: '#10B981', label2: '#34D399' },
  { label: 'وردي · بنفسجي', bg: ['#20021a','#350a2a'],  accent: '#EC4899', label2: '#C084FC' },
  { label: 'أسود · فضي',    bg: ['#0a0a0a','#1a1a1a'],  accent: '#A1A1AA', label2: '#E4E4E7' },
];

const CARD_TYPES = [
  { id: 'loyalty',     label: 'ولاء',       icon: '⭐' },
  { id: 'membership',  label: 'عضوية',      icon: '💳' },
  { id: 'appointment', label: 'موعد',        icon: '📅' },
  { id: 'coupon',      label: 'كوبون',       icon: '🎁' },
];

/* ─── QR SVG ─── */
function QR({ size = 52, color = 'white', opacity = 0.9 }: { size?: number; color?: string; opacity?: number }) {
  const p = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
  const c = size / 7;
  return (
    <svg width={size} height={size} style={{ opacity }}>
      {p.map((row, r) => row.map((v, cc) => v
        ? <rect key={`${r}-${cc}`} x={cc * c} y={r * c} width={c - 0.5} height={c - 0.5} fill={color} rx={c * 0.15} />
        : null))}
      {[[4,4],[5,5],[4,5],[5,4],[3,3]].map(([r,c2],i) => (
        <rect key={`d${i}`} x={3.5*c + c2*c*0.4} y={3.5*c + r*c*0.4} width={c*0.4} height={c*0.4} fill={color} rx={1} />
      ))}
    </svg>
  );
}

/* ─── The live card ─── */
function WalletCard({
  brandName, holderName, points, palette, cardType, tilt = false,
}: {
  brandName: string; holderName: string; points: string;
  palette: typeof PALETTES[0]; cardType: string; tilt?: boolean;
}) {
  const typeData: Record<string,{header:string;value:string;label1:string;val1:string;label2:string;val2:string}> = {
    loyalty:     { header:'POINTS', value: points||'٣٢٠', label1:'المستوى', val1:'فضي', label2:'التالي', val2:'١٨٠ نقطة' },
    membership:  { header:'MEMBER', value:'VIP', label1:'الصلاحية', val1:'٢٠٢٥', label2:'النوع', val2:'سنوي' },
    appointment: { header:'موعد', value:'١١:٠٠ ص', label1:'التاريخ', val1:'الثلاثاء', label2:'الغرفة', val2:'٣' },
    coupon:      { header:'خصم', value:'١٥٪', label1:'الصالح حتى', val1:'٣١/١٢', label2:'الكود', val2:'VIP99' },
  };
  const d = typeData[cardType] || typeData.loyalty;

  return (
    <motion.div
      animate={tilt ? { rotateY: [0, 4, -4, 0], rotateX: [0, -2, 2, 0] } : {}}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: 320, height: 190,
        borderRadius: 18,
        background: `linear-gradient(135deg, ${palette.bg[0]} 0%, ${palette.bg[1]} 100%)`,
        boxShadow: `0 32px 72px ${palette.accent}40, 0 0 0 1px ${palette.accent}25`,
        padding: '18px 20px',
        position: 'relative', overflow: 'hidden',
        fontFamily: '-apple-system, Helvetica, Arial, sans-serif',
        color: '#fff',
        direction: 'rtl',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow */}
      <div style={{ position:'absolute', top:-40, right:-40, width:180, height:180, borderRadius:'50%', background:`radial-gradient(circle, ${palette.accent}30 0%, transparent 70%)`, pointerEvents:'none' }} />

      {/* Top stripe */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${palette.accent},${palette.label2})` }} />

      {/* Header row */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <div style={{ width:28, height:28, borderRadius:7, background:`linear-gradient(135deg,${palette.accent},${palette.label2})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:900 }}>
            {brandName ? brandName[0] : 'ب'}
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:800, letterSpacing:.3 }}>{brandName||'اسم المشروع'}</div>
            <div style={{ fontSize:8, color:palette.label2, letterSpacing:1.5, textTransform:'uppercase', opacity:.9 }}>WALLET PASS</div>
          </div>
        </div>
        <div style={{ textAlign:'left' }}>
          <div style={{ fontSize:8, color:'rgba(255,255,255,0.4)', letterSpacing:1, textTransform:'uppercase' }}>{d.header}</div>
          <div style={{ fontSize:18, fontWeight:900, color:palette.accent, letterSpacing:-.5 }}>{d.value}</div>
        </div>
      </div>

      {/* Holder */}
      <div style={{ marginBottom:10 }}>
        <div style={{ fontSize:8, color:palette.label2, letterSpacing:1.5, marginBottom:3, textTransform:'uppercase', opacity:.8 }}>CARDHOLDER</div>
        <div style={{ fontSize:17, fontWeight:700, letterSpacing:-.2 }}>{holderName||'اسم حاملة البطاقة'}</div>
      </div>

      {/* Fields */}
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize:7, color:'rgba(255,255,255,.4)', letterSpacing:1, textTransform:'uppercase' }}>{d.label1}</div>
          <div style={{ fontSize:11, fontWeight:700 }}>{d.val1}</div>
        </div>
        <div>
          <div style={{ fontSize:7, color:'rgba(255,255,255,.4)', letterSpacing:1, textTransform:'uppercase' }}>{d.label2}</div>
          <div style={{ fontSize:11, fontWeight:700 }}>{d.val2}</div>
        </div>
        <QR size={46} color="white" opacity={0.7} />
      </div>
    </motion.div>
  );
}

/* ─── iOS Wallet stack mockup ─── */
function WalletStack({ palette, brandName }: { palette: typeof PALETTES[0]; brandName: string }) {
  const cards = [
    { bg: ['#1C1C1E','#2C2C2E'], accent: '#FFD60A', offset: 28, scale: 0.91, z: 0 },
    { bg: ['#1a1a2e','#16213e'], accent: '#0EA5E9', offset: 14, scale: 0.95, z: 1 },
    { bg: palette.bg, accent: palette.accent, offset: 0, scale: 1, z: 2 },
  ];

  return (
    <div style={{ position: 'relative', width: 320, height: 290 }}>
      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ y: c.offset + 20, opacity: 0 }}
          whileInView={{ y: c.offset, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22,1,0.36,1] }}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: 320, height: 190,
            borderRadius: 18,
            background: `linear-gradient(135deg, ${c.bg[0]}, ${c.bg[1]})`,
            border: `1px solid ${c.accent}25`,
            boxShadow: `0 ${8 + i*10}px ${20 + i*20}px rgba(0,0,0,0.5)`,
            transform: `translateY(${c.offset}px) scale(${c.scale})`,
            transformOrigin: 'top center',
            zIndex: c.z,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {i === 2 && (
            <div style={{ padding:'18px 20px', width:'100%', height:'100%', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${palette.accent},${palette.label2})` }} />
              <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:10 }}>
                <div style={{ width:26, height:26, borderRadius:7, background:`linear-gradient(135deg,${palette.accent},${palette.label2})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:900 }}>
                  {brandName?.[0] || 'ب'}
                </div>
                <div>
                  <div style={{ fontSize:11, fontWeight:800 }}>{brandName || 'مشروعك'}</div>
                  <div style={{ fontSize:7.5, color:palette.label2, letterSpacing:1.2, textTransform:'uppercase' }}>LOYALTY CARD</div>
                </div>
              </div>
              <div style={{ fontSize:7.5, color:'rgba(255,255,255,.4)', letterSpacing:1.2, marginBottom:3, textTransform:'uppercase' }}>CARDHOLDER</div>
              <div style={{ fontSize:15, fontWeight:700 }}>اسم الزبون</div>
            </div>
          )}
          {i < 2 && (
            <div style={{ width:'80%', height:4, borderRadius:2, background:`${c.accent}30` }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Main
══════════════════════════════════════════════════════════ */
export default function WalletShowcase() {
  const [palette, setPalette]     = useState(0);
  const [cardType, setCardType]   = useState('loyalty');
  const [brandName, setBrandName] = useState('');
  const [holder, setHolder]       = useState('');
  const [points, setPoints]       = useState('٣٢٠');
  const [tab, setTab]             = useState<'customize'|'stack'>('customize');

  const pal = PALETTES[palette];

  const features = [
    { icon: '📲', t: 'في جوال زبونك دائماً', d: 'تظهر تلقائياً عند الاقتراب من موقعك' },
    { icon: '🔔', t: 'إشعارات لحظية', d: 'وصّل عروضك وتذكير المواعيد مباشرة' },
    { icon: '🎨', t: 'تصميم بهويتك', d: 'ألوانك وشعارك واسمك — مش تصميم جاهز' },
    { icon: '🔄', t: 'تحديث فوري', d: 'النقاط والبيانات تتحدث بدون تنزيل' },
    { icon: '📍', t: 'تنبيه بالموقع', d: 'iOS يُنبّه الزبون لما يقرب فرعك' },
    { icon: '🌐', t: 'بدون تطبيق', d: 'يشتغل مباشرة من iPhone بدون App Store' },
  ];

  return (
    <section style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width:600, height:600, top:'10%', right:'-10%', background:`rgba(139,92,246,0.07)`, animationDelay:'-2s' }} />
      <div className="orb" style={{ width:500, height:500, bottom:'0%', left:'-8%', background:'rgba(6,182,212,0.05)', animationDelay:'-8s' }} />

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* ── Header ── */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ textAlign:'center', marginBottom:52 }}>
          <div className="section-label" style={{ color:'#8B5CF6', borderColor:'rgba(139,92,246,0.35)', background:'rgba(139,92,246,0.1)' }}>
            💳 Apple Wallet
          </div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(2rem,4.5vw,3.4rem)', letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:16 }}>
            بطاقتك في جيب كل زبون{' '}
            <span style={{ background:'linear-gradient(135deg,#8B5CF6,#06B6D4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              تلقائياً
            </span>
          </h2>
          <p style={{ fontSize:17, color:'var(--text2)', maxWidth:480, margin:'0 auto' }}>
            بطاقة ولاء أو عضوية أو موعد — تضاف مباشرة لـ Apple Wallet بدون تطبيق، وتتحدث من بُعد.
          </p>
        </motion.div>

        {/* ── Tab switcher ── */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:40 }}>
          <div style={{ display:'flex', gap:4, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:4 }}>
            {([['customize','🎨 خصّص بطاقتك'],['stack','📱 شوفها في Wallet']] as const).map(([id,label]) => (
              <button key={id} onClick={() => setTab(id)}
                style={{ padding:'9px 20px', borderRadius:9, border:'none', cursor:'pointer', fontFamily:'Cairo,sans-serif', fontWeight:700, fontSize:13, transition:'all 0.2s',
                  background: tab===id ? `linear-gradient(135deg,#8B5CF6,#6D28D9)` : 'transparent',
                  color: tab===id ? '#fff' : 'rgba(255,255,255,0.5)',
                  boxShadow: tab===id ? '0 4px 16px rgba(139,92,246,0.35)' : 'none',
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main content ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:48, alignItems:'start', marginBottom:52 }}>

          {/* Left — customizer */}
          <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>

            <AnimatePresence mode="wait">
              {tab === 'customize' ? (
                <motion.div key="cust" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}>

                  {/* Card type */}
                  <div style={{ marginBottom:20 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.45)', marginBottom:10, letterSpacing:1 }}>نوع البطاقة</div>
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                      {CARD_TYPES.map(ct => (
                        <button key={ct.id} onClick={() => setCardType(ct.id)}
                          style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:10, border:`1px solid ${cardType===ct.id ? '#8B5CF6' : 'rgba(255,255,255,0.1)'}`, background: cardType===ct.id ? 'rgba(139,92,246,0.15)' : 'transparent', color: cardType===ct.id ? '#fff' : 'rgba(255,255,255,0.5)', fontFamily:'Cairo,sans-serif', fontWeight:700, fontSize:12, cursor:'pointer', transition:'all 0.15s' }}>
                          {ct.icon} {ct.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div style={{ marginBottom:20 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.45)', marginBottom:10, letterSpacing:1 }}>نظام الألوان</div>
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                      {PALETTES.map((p, i) => (
                        <button key={i} onClick={() => setPalette(i)}
                          style={{ width:32, height:32, borderRadius:8, border:`2px solid ${palette===i ? p.accent : 'transparent'}`, cursor:'pointer', padding:0, background:`linear-gradient(135deg,${p.bg[0]},${p.bg[1]})`, boxShadow: palette===i ? `0 0 12px ${p.accent}60` : 'none', transition:'all 0.15s', position:'relative' }}>
                          {palette===i && <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:6, height:6, borderRadius:'50%', background:p.accent }} />}
                        </button>
                      ))}
                    </div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginTop:6 }}>{pal.label}</div>
                  </div>

                  {/* Inputs */}
                  {[
                    { label:'اسم المشروع', val:brandName, set:setBrandName, ph:'مثال: براون دوز', max:30 },
                    { label:'اسم حاملة البطاقة', val:holder, set:setHolder, ph:'مثال: أحمد العتيبي', max:30 },
                    { label:'النقاط / القيمة', val:points, set:setPoints, ph:'٣٢٠', max:10 },
                  ].map(f => (
                    <div key={f.label} style={{ marginBottom:14 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.45)', marginBottom:7, letterSpacing:.5 }}>{f.label}</div>
                      <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} maxLength={f.max}
                        style={{ width:'100%', padding:'11px 14px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:'#fff', fontFamily:'Cairo,sans-serif', fontSize:13, outline:'none', boxSizing:'border-box', direction:'rtl', transition:'border 0.2s' }}
                        onFocus={e => (e.target.style.borderColor = `${pal.accent}80`)}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="stack" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
                  style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  <WalletStack palette={pal} brandName={brandName} />
                  <div className="glass" style={{ padding:'14px 16px', borderRadius:14, fontSize:12, color:'var(--text2)', lineHeight:1.7 }}>
                    📍 البطاقة تظهر تلقائياً على شاشة الأقفال لما يقرب الزبون من فرعك<br/>
                    🔔 تقدر ترسل إشعار لكل حاملي البطاقة بلمسة واحدة<br/>
                    🔄 النقاط والبيانات تتحدث فوراً بدون أي إجراء من الزبون
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right — live card */}
          <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6, delay:.1 }}
            style={{ display:'flex', flexDirection:'column', gap:20, alignItems:'center' }}>

            {/* iOS notch frame */}
            <div style={{ position:'relative', width:360, background:'#000', borderRadius:44, padding:'48px 20px 24px', boxShadow:'0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.08)' }}>
              {/* Dynamic Island */}
              <div style={{ position:'absolute', top:10, left:'50%', transform:'translateX(-50%)', width:120, height:34, background:'#000', borderRadius:20, border:'1px solid rgba(255,255,255,0.08)' }} />

              {/* Status bar */}
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14, padding:'0 4px' }}>
                <div style={{ fontSize:13, fontWeight:700, color:'rgba(255,255,255,0.7)', fontFamily:'-apple-system,sans-serif' }}>9:41</div>
                <div style={{ display:'flex', gap:5, alignItems:'center' }}>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.7)' }}>●●●</div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.7)' }}>🔋</div>
                </div>
              </div>

              {/* Wallet header */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
                <div style={{ fontSize:26, fontWeight:800, color:'#fff', fontFamily:'-apple-system,sans-serif', letterSpacing:-.5 }}>Wallet</div>
                <div style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>+</div>
              </div>

              {/* Card in frame */}
              <AnimatePresence mode="wait">
                <motion.div key={`${palette}-${cardType}`}
                  initial={{ opacity:0, y:12, scale:.97 }}
                  animate={{ opacity:1, y:0, scale:1 }}
                  exit={{ opacity:0, y:-8, scale:.97 }}
                  transition={{ duration:.35, ease:[.22,1,.36,1] }}
                  style={{ transformOrigin:'top center' }}>
                  <WalletCard
                    palette={pal} cardType={cardType}
                    brandName={brandName} holderName={holder} points={points}
                    tilt={true}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Other cards hint */}
              <div style={{ display:'flex', gap:8, marginTop:14, padding:'0 2px' }}>
                {[['#FFD60A','#1C1C1E'],['#0EA5E9','#1a1a2e']].map(([acc,bg],i) => (
                  <div key={i} style={{ flex:1, height:44, borderRadius:12, background:`linear-gradient(135deg,${bg},${bg}dd)`, border:`1px solid ${acc}25`, display:'flex', alignItems:'center', padding:'0 12px' }}>
                    <div style={{ width:24, height:4, borderRadius:2, background:`${acc}60` }} />
                  </div>
                ))}
              </div>

              <div style={{ textAlign:'center', marginTop:14, fontSize:11, color:'rgba(255,255,255,0.3)', fontFamily:'-apple-system,sans-serif' }}>
                swipe to see all cards
              </div>
            </div>

            <div style={{ fontSize:11, color:'var(--text3)', textAlign:'center' }}>
              ↑ معاينة تفاعلية — غيّر الإعدادات على اليسار
            </div>
          </motion.div>
        </div>

        {/* ── Features grid ── */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.1 }}
          style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12, marginBottom:36 }}>
          {features.map((f,i) => (
            <motion.div key={i} initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.12+i*.05 }}
              className="glass" style={{ padding:'16px 18px', borderRadius:14, display:'flex', gap:12, alignItems:'flex-start', direction:'rtl' }}>
              <span style={{ fontSize:22, flexShrink:0 }}>{f.icon}</span>
              <div>
                <div style={{ fontSize:12, fontWeight:800, color:'#fff', marginBottom:3 }}>{f.t}</div>
                <div style={{ fontSize:11, color:'var(--text2)', lineHeight:1.5 }}>{f.d}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ textAlign:'center' }}>

          <div style={{ display:'inline-flex', flexDirection:'column', alignItems:'center', gap:14 }}>
            <a href={WA_WALLET} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'16px 40px', borderRadius:16, background:'linear-gradient(135deg,#8B5CF6,#6D28D9)', color:'#fff', fontFamily:'Cairo,sans-serif', fontSize:17, fontWeight:900, textDecoration:'none', boxShadow:'0 16px 48px rgba(139,92,246,0.4)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              أضف Wallet لمشروعك الآن
            </a>

            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12, color:'rgba(255,255,255,0.35)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                مشفّر ومؤمَّن بمعايير Apple
              </div>
              <div style={{ width:1, height:12, background:'rgba(255,255,255,0.15)' }} />
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.35)' }}>يشتغل بدون تطبيق</div>
              <div style={{ width:1, height:12, background:'rgba(255,255,255,0.15)' }} />
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.35)' }}>تسليم خلال ٢٤ ساعة</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
