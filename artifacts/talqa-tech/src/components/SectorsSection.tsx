import { motion } from 'framer-motion';
import { Link } from 'wouter';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20عندي%20مشروع%20وأبي%20أعرف%20كيف%20تقدرون%20تساعدوني';

const SECTORS = [
  { icon:'☕',  name:'كافيهات',         color:'#D97706', bg:'rgba(217,119,6,0.12)',   slug:'cafes'       },
  { icon:'🍽️', name:'مطاعم',           color:'#DC2626', bg:'rgba(220,38,38,0.1)',    slug:'restaurants' },
  { icon:'🏥',  name:'عيادات',          color:'#059669', bg:'rgba(5,150,105,0.1)',    slug:'clinics'     },
  { icon:'💇',  name:'صالونات تجميل',   color:'#EC4899', bg:'rgba(236,72,153,0.1)',  slug:'beauty'      },
  { icon:'💪',  name:'صالات رياضية',    color:'#F59E0B', bg:'rgba(245,158,11,0.1)',  slug:'gyms'        },
  { icon:'🏨',  name:'فنادق',           color:'#8B5CF6', bg:'rgba(139,92,246,0.1)',  slug:'hotels'      },
  { icon:'💊',  name:'صيدليات',         color:'#06B6D4', bg:'rgba(6,182,212,0.1)',   slug:'pharmacies'  },
  { icon:'📚',  name:'مراكز تعليمية',   color:'#3B82F6', bg:'rgba(59,130,246,0.1)', slug:'education'   },
  { icon:'🛍️', name:'متاجر',           color:'#10B981', bg:'rgba(16,185,129,0.1)',  slug:'stores'      },
  { icon:'🚗',  name:'خدمات سيارات',    color:'#6366F1', bg:'rgba(99,102,241,0.1)', slug:'cars'        },
  { icon:'🧴',  name:'عناية شخصية',     color:'#F472B6', bg:'rgba(244,114,182,0.1)',slug:'care'        },
  { icon:'🏋️', name:'تدريب شخصي',     color:'#EF4444', bg:'rgba(239,68,68,0.1)',   slug:'training'    },
  { icon:'🌿',  name:'صحة وعافية',      color:'#84CC16', bg:'rgba(132,204,22,0.1)', slug:'wellness'    },
  { icon:'🎨',  name:'استوديوهات',      color:'#A855F7', bg:'rgba(168,85,247,0.1)', slug:'studios'     },
  { icon:'⚖️', name:'مكاتب مهنية',     color:'#64748B', bg:'rgba(100,116,139,0.1)',slug:'offices'     },
  { icon:'🐾',  name:'خدمات الحيوانات', color:'#F97316', bg:'rgba(249,115,22,0.1)', slug:'pets'        },
];

const ROW1 = [...SECTORS.slice(0,8),  ...SECTORS.slice(0,8)];
const ROW2 = [...SECTORS.slice(8,16), ...SECTORS.slice(8,16)];

function MarqueeRow({ items, reverse=false }: { items: typeof SECTORS; reverse?: boolean }) {
  return (
    <div style={{ overflow:'hidden', width:'100%',
      maskImage:'linear-gradient(90deg,transparent 0%,#000 10%,#000 90%,transparent 100%)',
      WebkitMaskImage:'linear-gradient(90deg,transparent 0%,#000 10%,#000 90%,transparent 100%)' }}>
      <motion.div
        animate={{ x: reverse ? ['0%','50%'] : ['0%','-50%'] }}
        transition={{ duration:32, ease:'linear', repeat:Infinity }}
        style={{ display:'flex', gap:12, width:'max-content' }}>
        {items.map((s,i) => (
          <Link key={i} href={`/sectors/${s.slug}`}
            style={{ textDecoration:'none', display:'block', flexShrink:0 }}>
            <motion.div
              whileHover={{ y:-4, scale:1.05, boxShadow:`0 12px 32px ${s.color}40` }}
              whileTap={{ scale:0.96 }}
              style={{ display:'flex', alignItems:'center', gap:10,
                padding:'14px 22px', borderRadius:16, background:s.bg,
                border:`1px solid ${s.color}30`, cursor:'pointer', transition:'box-shadow 0.2s' }}>
              <span style={{ fontSize:22 }}>{s.icon}</span>
              <span style={{ fontSize:13.5, fontWeight:800, color:'#fff',
                fontFamily:'Cairo,sans-serif', whiteSpace:'nowrap' }}>{s.name}</span>
              <span style={{ fontSize:10, color:s.color, fontWeight:700 }}>←</span>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

export default function SectorsSection() {
  return (
    <section style={{ padding:'clamp(80px,10vw,130px) 0',
      background:'linear-gradient(180deg,var(--bg2) 0%,#050510 50%,var(--bg2) 100%)',
      position:'relative', overflow:'hidden' }}>

      <div style={{ maxWidth:1160, margin:'0 auto', padding:'0 24px', textAlign:'center', marginBottom:56 }}>
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div className="section-label" style={{ color:'#8B5CF6', borderColor:'rgba(139,92,246,0.3)',
            background:'rgba(139,92,246,0.08)', marginBottom:16 }}>
            🏢 القطاعات التي نخدمها
          </div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(2rem,4.5vw,3.4rem)',
            letterSpacing:'-0.035em', lineHeight:1.1, marginBottom:16 }}>
            مهما كان قطاعك —{' '}
            <span style={{ background:'linear-gradient(135deg,#8B5CF6,#06B6D4)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              عندنا حل
            </span>
          </h2>
          <p style={{ color:'var(--text2)', fontSize:16, maxWidth:520, margin:'0 auto' }}>
            اضغط على قطاعك لتشوف كيف نحوّله — كل صفحة تحكي قصة حل حقيقي.
          </p>
        </motion.div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <MarqueeRow items={ROW1} />
        <MarqueeRow items={ROW2} reverse />
      </div>

      {/* Sector grid below marquee */}
      <div style={{ maxWidth:1160, margin:'56px auto 0', padding:'0 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:10 }}>
          {SECTORS.map((s,i) => (
            <motion.div key={i} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.04 }}>
              <Link href={`/sectors/${s.slug}`} style={{ textDecoration:'none', display:'block' }}>
                <motion.div whileHover={{ y:-4, boxShadow:`0 16px 40px ${s.color}30` }}
                  style={{ padding:'16px', borderRadius:14, textAlign:'center',
                    background:'rgba(255,255,255,0.03)', border:`1px solid ${s.color}20`,
                    cursor:'pointer', transition:'box-shadow 0.2s' }}>
                  <div style={{ fontSize:26, marginBottom:8 }}>{s.icon}</div>
                  <div style={{ fontSize:11.5, fontWeight:800, color:'#fff', lineHeight:1.3 }}>{s.name}</div>
                  <div style={{ fontSize:10, color:s.color, fontWeight:700, marginTop:4 }}>اكتشف →</div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} style={{ textAlign:'center', marginTop:52, padding:'0 24px' }}>
        <p style={{ color:'var(--text2)', fontSize:14, marginBottom:20 }}>
          ما تجد قطاعك؟ تواصل معنا وسنبني لك الحل المناسب.
        </p>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
          <a href="/talqa-tech/sectors/restaurants"
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', borderRadius:12, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontFamily:'inherit', fontSize:14, fontWeight:700, textDecoration:'none', transition:'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.transform='none'; }}>
            استكشف كل القطاعات ←
          </a>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', borderRadius:12, background:'rgba(139,92,246,0.12)', border:'1px solid rgba(139,92,246,0.3)', color:'#A78BFA', fontFamily:'Cairo,sans-serif', fontSize:14, fontWeight:700, textDecoration:'none' }}>
            تحدث معنا عن مشروعك ←
          </a>
        </div>
      </motion.div>
    </section>
  );
}
