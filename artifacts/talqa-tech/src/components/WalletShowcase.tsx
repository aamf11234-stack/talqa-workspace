import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WA_WALLET = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أبي%20أضيف%20Apple%20Wallet%20لمشروعي';

const PALETTES = [
  { id: 'violet', swatch: ['#6D28D9','#8B5CF6'], card: ['#18003f','#2e0068'], accent: '#A78BFA', accent2: '#C4B5FD' },
  { id: 'gold',   swatch: ['#B45309','#D97706'], card: ['#1c0a00','#3a1800'], accent: '#FBBF24', accent2: '#FCD34D' },
  { id: 'ocean',  swatch: ['#1D4ED8','#3B82F6'], card: ['#001535','#002a5e'], accent: '#60A5FA', accent2: '#93C5FD' },
  { id: 'emerald',swatch: ['#047857','#10B981'], card: ['#001f10','#003d20'], accent: '#34D399', accent2: '#6EE7B7' },
  { id: 'rose',   swatch: ['#BE185D','#EC4899'], card: ['#28001f','#44003d'], accent: '#F472B6', accent2: '#FBCFE8' },
  { id: 'slate',  swatch: ['#334155','#64748B'], card: ['#0f0f14','#1a1a24'], accent: '#94A3B8', accent2: '#CBD5E1' },
];

const CARD_TYPES = [
  { id: 'loyalty',     label: 'ولاء',   icon: '⭐', header:'POINTS', value:'٣٢٠',   s1:'المستوى', v1:'ذهبي',    s2:'التالي',  v2:'٨٠ نقطة' },
  { id: 'membership',  label: 'عضوية',  icon: '💎', header:'VIP',    value:'Pro',   s1:'الصلاحية',v1:'٢٠٢٦',   s2:'النوع',   v2:'سنوي'    },
  { id: 'appointment', label: 'موعد',   icon: '📅', header:'APPT',   value:'١١:٠٠', s1:'التاريخ', v1:'الثلاثاء',s2:'الغرفة',  v2:'٣'       },
  { id: 'coupon',      label: 'كوبون',  icon: '🎁', header:'OFFER',  value:'١٥٪',   s1:'ينتهي',   v1:'٣١/١٢',  s2:'الكود',   v2:'VIP99'   },
];

function QR({ size = 44 }: { size?: number }) {
  const rows = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
  const cs = size / 7;
  return (
    <svg width={size} height={size} style={{ opacity: 0.7 }}>
      {rows.map((row, r) => row.map((v, c) => v
        ? <rect key={`${r}-${c}`} x={c*cs} y={r*cs} width={cs-0.8} height={cs-0.8} fill="white" rx={cs*0.18} />
        : null))}
      {[[4,4],[4,5],[5,4],[5,5]].map(([r,c],i) => (
        <rect key={`d${i}`} x={3.5*cs+c*cs*0.38} y={3.5*cs+r*cs*0.38} width={cs*0.38} height={cs*0.38} fill="white" rx={1} />
      ))}
    </svg>
  );
}

function WalletCard({ pal, type, brand, holder }: {
  pal: typeof PALETTES[0];
  type: typeof CARD_TYPES[0];
  brand: string; holder: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: 300, height: 180,
        borderRadius: 20,
        background: `linear-gradient(145deg, ${pal.card[0]}, ${pal.card[1]})`,
        boxShadow: `0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.07)`,
        position: 'relative', overflow: 'hidden',
        fontFamily: '-apple-system, Helvetica, sans-serif',
        color: '#fff', direction: 'rtl',
      }}
    >
      {/* Top color bar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
        background:`linear-gradient(90deg,${pal.accent},${pal.accent2})` }} />
      {/* Subtle radial */}
      <div style={{ position:'absolute', top:-50, right:-50, width:180, height:180, borderRadius:'50%',
        background:`radial-gradient(circle,${pal.accent}18 0%,transparent 70%)`, pointerEvents:'none' }} />

      <div style={{ padding:'16px 18px', height:'100%', boxSizing:'border-box',
        display:'flex', flexDirection:'column', justifyContent:'space-between' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:30, height:30, borderRadius:8,
              background:`linear-gradient(135deg,${pal.accent},${pal.accent2})`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:14, fontWeight:900 }}>
              {brand ? brand[0] : 'ت'}
            </div>
            <div>
              <div style={{ fontSize:12, fontWeight:700 }}>{brand || 'اسم مشروعك'}</div>
              <div style={{ fontSize:7.5, color:pal.accent2, letterSpacing:1.5, textTransform:'uppercase', opacity:0.8 }}>WALLET PASS</div>
            </div>
          </div>
          <div style={{ textAlign:'left' }}>
            <div style={{ fontSize:7, color:'rgba(255,255,255,0.4)', letterSpacing:1.5, textTransform:'uppercase', marginBottom:2 }}>{type.header}</div>
            <div style={{ fontSize:22, fontWeight:800, color:pal.accent, letterSpacing:-1 }}>{type.value}</div>
          </div>
        </div>

        {/* Holder */}
        <div>
          <div style={{ fontSize:7.5, color:'rgba(255,255,255,0.35)', letterSpacing:1.5, textTransform:'uppercase', marginBottom:2 }}>CARDHOLDER</div>
          <div style={{ fontSize:15, fontWeight:700 }}>{holder || 'اسم الزبون'}</div>
        </div>

        {/* Footer */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div style={{ display:'flex', gap:16 }}>
            <div>
              <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', letterSpacing:1, textTransform:'uppercase', marginBottom:2 }}>{type.s1}</div>
              <div style={{ fontSize:11, fontWeight:700 }}>{type.v1}</div>
            </div>
            <div>
              <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', letterSpacing:1, textTransform:'uppercase', marginBottom:2 }}>{type.s2}</div>
              <div style={{ fontSize:11, fontWeight:700 }}>{type.v2}</div>
            </div>
          </div>
          <QR size={42} />
        </div>
      </div>
    </motion.div>
  );
}

/* Simple iOS Wallet mockup */
function IPhoneFrame({ pal, type, brand, holder }: {
  pal: typeof PALETTES[0]; type: typeof CARD_TYPES[0];
  brand: string; holder: string;
}) {
  return (
    <div style={{
      width: 220,
      background: '#111',
      borderRadius: 42,
      padding: '14px 10px 18px',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.09), 0 32px 80px rgba(0,0,0,0.7)',
      flexShrink: 0,
    }}>
      {/* Dynamic Island */}
      <div style={{ width:88, height:26, background:'#000', borderRadius:13, margin:'0 auto 8px',
        border:'1px solid rgba(255,255,255,0.05)' }} />

      {/* Status */}
      <div style={{ display:'flex', justifyContent:'space-between', padding:'0 5px 8px',
        fontFamily:'-apple-system,sans-serif', fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.8)' }}>
        <span>9:41</span>
        <span style={{ opacity:0.7 }}>●●● 🔋</span>
      </div>

      {/* Wallet title */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 6px 10px' }}>
        <div style={{ fontSize:18, fontWeight:800, color:'#fff', fontFamily:'-apple-system,sans-serif', letterSpacing:-0.5 }}>Wallet</div>
        <div style={{ width:24, height:24, borderRadius:'50%', background:'rgba(255,255,255,0.1)',
          display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:14 }}>+</div>
      </div>

      {/* Card scaled */}
      <div style={{ padding:'0 4px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={`${pal.id}-${type.id}`}
            initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }}
            transition={{ duration:0.25 }}
            style={{ transform:'scale(0.66)', transformOrigin:'top center', height:118, marginBottom:-60 }}>
            <WalletCard pal={pal} type={type} brand={brand} holder={holder} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ghost cards */}
      {[['#FFD60A','#1c1c1e'],['#30D158','#0a1a10']].map(([acc,bg],i) => (
        <div key={i} style={{ margin:'0 6px 6px',height:34, borderRadius:10,
          background:`linear-gradient(135deg,${bg},${bg}ee)`,
          border:`1px solid ${acc}18`,
          display:'flex', alignItems:'center', padding:'0 10px', gap:7 }}>
          <div style={{ width:14,height:14,borderRadius:4,background:`${acc}25`,flexShrink:0 }} />
          <div style={{ width:44,height:4,borderRadius:2,background:'rgba(255,255,255,0.07)' }} />
        </div>
      ))}

      {/* Home bar */}
      <div style={{ width:70,height:4,borderRadius:2,background:'rgba(255,255,255,0.18)',margin:'10px auto 0' }} />
    </div>
  );
}

export default function WalletShowcase() {
  const [palIdx, setPalIdx] = useState(0);
  const [typeIdx, setTypeIdx] = useState(0);
  const [brand, setBrand] = useState('براون دوز');
  const [holder, setHolder] = useState('أحمد العتيبي');

  const pal  = PALETTES[palIdx];
  const type = CARD_TYPES[typeIdx];

  const features = [
    { icon:'📲', label:'في جيبه دائماً',  desc:'تظهر في شاشة الأقفال عند اقترابه من فرعك' },
    { icon:'🔔', label:'إشعارات مباشرة', desc:'وصّل عروضك وتذكير المواعيد بلمسة واحدة'   },
    { icon:'🎨', label:'هويتك البصرية',  desc:'ألوانك وشعارك — مش تصميم جاهز'              },
    { icon:'⚡', label:'تحديث فوري',      desc:'النقاط تتحدث بدون إجراء من الزبون'          },
    { icon:'📍', label:'تنبيه جغرافي',   desc:'iOS يُنبّه الزبون تلقائياً عند الاقتراب'   },
    { icon:'🚀', label:'بدون App Store',  desc:'يشتغل من iPhone مباشرة'                    },
  ];

  return (
    <section style={{ padding:'clamp(80px,9vw,120px) 0', background:'var(--bg2)', position:'relative', overflow:'hidden' }}>
      <div className="orb" style={{ width:500,height:500,top:'5%',right:'-8%',background:'rgba(139,92,246,0.05)',animationDelay:'-2s' }} />
      <div className="orb" style={{ width:400,height:400,bottom:0,left:'-6%',background:'rgba(6,182,212,0.04)',animationDelay:'-9s' }} />

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px', position:'relative' }}>

        {/* ── Header ── */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.6 }} style={{ textAlign:'center', marginBottom:48 }}>
          <div className="section-label" style={{ color:'#8B5CF6',borderColor:'rgba(139,92,246,0.3)',background:'rgba(139,92,246,0.08)',marginBottom:16 }}>
            💳 Apple Wallet
          </div>
          <h2 style={{ fontWeight:900,fontSize:'clamp(2rem,4.5vw,3.2rem)',letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:14 }}>
            بطاقتك في جيب{' '}
            <span style={{ background:'linear-gradient(135deg,#8B5CF6,#06B6D4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
              كل زبون
            </span>
          </h2>
          <p style={{ fontSize:16,color:'var(--text2)',maxWidth:440,margin:'0 auto',lineHeight:1.65 }}>
            بطاقة ولاء أو عضوية أو موعد — تضاف مباشرة لـ Apple Wallet بدون تطبيق، وتتحدث من بُعد.
          </p>
        </motion.div>

        {/* ── Card type tabs ── */}
        <div style={{ display:'flex',justifyContent:'center',marginBottom:44 }}>
          <div style={{ display:'flex',gap:4,padding:4,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12 }}>
            {CARD_TYPES.map((ct,i) => (
              <button key={ct.id} onClick={() => setTypeIdx(i)}
                style={{ display:'flex',alignItems:'center',gap:6,padding:'8px 16px',borderRadius:8,border:'none',cursor:'pointer',
                  fontFamily:'Cairo,sans-serif',fontWeight:700,fontSize:12.5,transition:'all 0.18s',
                  background:typeIdx===i ? 'rgba(139,92,246,0.85)' : 'transparent',
                  color:typeIdx===i ? '#fff' : 'rgba(255,255,255,0.4)',
                  boxShadow:typeIdx===i ? '0 2px 12px rgba(139,92,246,0.3)' : 'none',
                }}>
                <span>{ct.icon}</span>{ct.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main grid ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center', marginBottom:52 }}>

          {/* Left — iPhone + floating card */}
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            transition={{ duration:0.6 }}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:32, position:'relative' }}>

            {/* iPhone */}
            <IPhoneFrame pal={pal} type={type} brand={brand} holder={holder} />

            {/* Floating full card */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
              <AnimatePresence mode="wait">
                <motion.div key={`${pal.id}-${type.id}`}
                  initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                  exit={{ opacity:0, scale:0.95 }} transition={{ duration:0.3 }}>
                  <WalletCard pal={pal} type={type} brand={brand} holder={holder} />
                </motion.div>
              </AnimatePresence>
              <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.22)', letterSpacing:0.3 }}>معاينة تفاعلية</div>
            </div>
          </motion.div>

          {/* Right — controls */}
          <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.1 }}>

            {/* Palette picker */}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.35)', letterSpacing:1.2, textTransform:'uppercase', marginBottom:12 }}>
                نظام الألوان
              </div>
              <div style={{ display:'flex', gap:8 }}>
                {PALETTES.map((p,i) => (
                  <button key={p.id} onClick={() => setPalIdx(i)}
                    title={['بنفسجي','ذهبي','أزرق','زمردي','وردي','كروم'][i]}
                    style={{ width:36, height:36, borderRadius:10, border:'none', cursor:'pointer', padding:0,
                      background:`linear-gradient(145deg,${p.swatch[0]},${p.swatch[1]})`,
                      boxShadow:palIdx===i ? `0 0 0 2px #fff, 0 0 0 4px ${p.swatch[1]}` : '0 0 0 1px rgba(255,255,255,0.06)',
                      transition:'box-shadow 0.18s, transform 0.15s',
                      transform:palIdx===i ? 'scale(1.12)' : 'scale(1)',
                    }} />
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:24 }}>
              {[
                { label:'اسم المشروع', val:brand, set:setBrand, ph:'مثال: براون دوز', max:25 },
                { label:'اسم حاملة البطاقة', val:holder, set:setHolder, ph:'مثال: أحمد العتيبي', max:25 },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.35)', letterSpacing:0.8, marginBottom:7, textTransform:'uppercase' }}>{f.label}</div>
                  <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} maxLength={f.max}
                    style={{ width:'100%', padding:'11px 13px', borderRadius:10, boxSizing:'border-box',
                      border:'1px solid rgba(255,255,255,0.09)',
                      background:'rgba(255,255,255,0.04)', color:'#fff',
                      fontFamily:'Cairo,sans-serif', fontSize:14, outline:'none', direction:'rtl',
                      transition:'border-color 0.18s',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.6)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.09)')} />
                </div>
              ))}
            </div>

            {/* Key benefits list */}
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[
                'يظهر في شاشة الأقفال لما يقرب الزبون من فرعك',
                'ترسل إشعار لكل حاملي البطاقة بلمسة واحدة',
                'النقاط تتحدث فوراً — بدون إجراء من الزبون',
                'يشتغل مباشرة من iPhone بدون App Store',
              ].map((t,i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:9, direction:'rtl' }}>
                  <div style={{ width:16, height:16, borderRadius:'50%', background:'rgba(139,92,246,0.2)', border:'1px solid rgba(139,92,246,0.4)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize:13, color:'rgba(255,255,255,0.65)', lineHeight:1.5 }}>{t}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Features grid ── */}
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.5 }}
          style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(175px,1fr))', gap:10, marginBottom:40 }}>
          {features.map((f,i) => (
            <motion.div key={i} initial={{ opacity:0,y:8 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true }} transition={{ delay:0.06*i }}
              className="glass" style={{ padding:'15px 16px', borderRadius:12, direction:'rtl' }}>
              <span style={{ fontSize:20, display:'block', marginBottom:7 }}>{f.icon}</span>
              <div style={{ fontSize:12.5, fontWeight:800, color:'#fff', marginBottom:4 }}>{f.label}</div>
              <div style={{ fontSize:11.5, color:'var(--text2)', lineHeight:1.5 }}>{f.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ textAlign:'center' }}>
          <a href={WA_WALLET} target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:10,
              padding:'15px 40px', borderRadius:14,
              background:'linear-gradient(135deg,#7C3AED,#5B21B6)',
              color:'#fff', fontFamily:'Cairo,sans-serif', fontSize:16, fontWeight:900,
              textDecoration:'none', boxShadow:'0 12px 36px rgba(109,40,217,0.35)',
              transition:'transform 0.18s,box-shadow 0.18s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow='0 18px 48px rgba(109,40,217,0.45)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform='none'; (e.currentTarget as HTMLAnchorElement).style.boxShadow='0 12px 36px rgba(109,40,217,0.35)'; }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            أضف Wallet لمشروعك
          </a>

          <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:20, marginTop:14, flexWrap:'wrap' }}>
            {['مشفّر بمعايير Apple','يشتغل بدون تطبيق','تسليم خلال ٢٤ ساعة'].map((t,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'rgba(255,255,255,0.28)' }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
