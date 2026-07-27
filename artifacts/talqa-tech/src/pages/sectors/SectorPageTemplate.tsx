import { motion } from 'framer-motion';
import { Link } from 'wouter';
import PageLayout from '../PageLayout';

export interface SectorData {
  slug: string; icon: string; name: string; tagline: string;
  headline: [string, string]; description: string;
  accent: string; accent2: string; floatingEmojis: string[];
  problems: { icon: string; title: string; desc: string }[];
  features: { icon: string; title: string; desc: string }[];
  stats: { n: string; label: string }[];
  walletTitle: string; walletDesc: string; walletCardLabel: string; walletFeatures: string[];
  howItWorks: { step: string; title: string; desc: string }[];
  testimonial?: { text: string; name: string; role: string };
  packages: { name: string; price: string; features: string[]; highlight?: boolean }[];
  ctaLabel: string; waMsg: string;
}

function rgb(h: string) {
  const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);
  return isNaN(r)?'139,92,246':`${r},${g},${b}`;
}

function StatBar({ d }: { d: SectorData }) {
  const c = rgb(d.accent), c2 = rgb(d.accent2);
  return (
    <section style={{padding:'56px 24px',
      background:`linear-gradient(135deg,rgba(${c},0.08),rgba(${c2},0.05))`,
      borderTop:`1px solid rgba(${c},0.15)`,borderBottom:`1px solid rgba(${c},0.15)`}}>
      <div style={{maxWidth:960,margin:'0 auto',display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
        {d.stats.map((s,i)=>(
          <motion.div key={i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{delay:i*0.12}}
            style={{flex:'1 1 140px',textAlign:'center',padding:'18px 20px',
              borderRight:i<d.stats.length-1?'1px solid rgba(255,255,255,0.07)':'none'}}>
            <div style={{fontSize:36,fontWeight:900,color:d.accent,letterSpacing:-1,lineHeight:1}}>{s.n}</div>
            <div style={{fontSize:12,color:'var(--text2)',marginTop:5}}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function SectorPage({ d }: { d: SectorData }) {
  const WA = `https://wa.me/966551378531?text=${encodeURIComponent(d.waMsg)}`;
  const c = rgb(d.accent), c2 = rgb(d.accent2);

  return (
    <PageLayout accent={d.accent}>

      {/* ══ HERO ══ */}
      <section style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',
        position:'relative',overflow:'hidden',padding:'100px 24px 60px'}}>
        <div style={{position:'absolute',left:'4%',top:'8%',width:500,height:500,borderRadius:'50%',
          background:d.accent,filter:'blur(180px)',opacity:0.1,pointerEvents:'none'}}/>
        <div style={{position:'absolute',right:'4%',bottom:'10%',width:350,height:350,borderRadius:'50%',
          background:d.accent2,filter:'blur(150px)',opacity:0.09,pointerEvents:'none'}}/>
        <div style={{position:'absolute',inset:0,pointerEvents:'none',
          backgroundImage:`linear-gradient(rgba(${c},0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(${c},0.055) 1px,transparent 1px)`,
          backgroundSize:'64px 64px'}}/>
        {d.floatingEmojis.map((em,i)=>(
          <motion.div key={i} animate={{y:[0,-16-i*4,0],rotate:[0,i%2?7:-7,0]}}
            transition={{duration:6+i*1.2,repeat:Infinity,delay:i*0.8,ease:'easeInOut'}}
            style={{position:'absolute',fontSize:44+(i%3)*14,left:`${8+(i*14)%82}%`,top:`${10+(i*11)%78}%`,
              opacity:0.06+(i%3)*0.02,pointerEvents:'none',userSelect:'none'}}>{em}</motion.div>
        ))}

        <div style={{position:'relative',zIndex:2,maxWidth:820,textAlign:'center'}}>
          <motion.div initial={{opacity:0,scale:0.7}} animate={{opacity:1,scale:1}}
            transition={{type:'spring',stiffness:220,delay:0.05}}
            style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:28,padding:'10px 22px',
              borderRadius:28,background:`rgba(${c},0.1)`,border:`1px solid rgba(${c},0.3)`}}>
            <span style={{fontSize:22}}>{d.icon}</span>
            <span style={{fontSize:13,fontWeight:800,color:d.accent,letterSpacing:0.3}}>{d.tagline}</span>
          </motion.div>

          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.7}}
            style={{fontWeight:900,fontSize:'clamp(3rem,8vw,6rem)',letterSpacing:'-0.045em',lineHeight:1.0,marginBottom:24}}>
            <span style={{color:'#fff',display:'block'}}>{d.headline[0]}</span>
            <span style={{background:`linear-gradient(135deg,${d.accent},${d.accent2})`,
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',display:'block'}}>
              {d.headline[1]}</span>
          </motion.h1>

          <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.6}}
            style={{fontSize:18,color:'var(--text2)',lineHeight:1.8,marginBottom:40,maxWidth:560,margin:'0 auto 40px'}}>
            {d.description}</motion.p>

          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
            style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{scale:1.04,boxShadow:`0 20px 50px rgba(${c},0.45)`}} whileTap={{scale:0.97}}
              style={{display:'inline-flex',alignItems:'center',gap:10,padding:'16px 38px',borderRadius:14,
                background:`linear-gradient(135deg,${d.accent},${d.accent2})`,color:'#fff',
                fontFamily:'Cairo,sans-serif',fontSize:16,fontWeight:900,textDecoration:'none',
                boxShadow:`0 12px 36px rgba(${c},0.35)`}}>{d.ctaLabel} ←</motion.a>
            <Link href="/projects" style={{display:'inline-flex',alignItems:'center',padding:'16px 28px',borderRadius:14,
              background:'rgba(255,255,255,0.05)',border:'1px solid var(--border)',
              color:'var(--text2)',fontFamily:'Cairo,sans-serif',fontSize:15,fontWeight:700,textDecoration:'none'}}>
              شوف مشاريعنا</Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
            style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap',marginTop:36}}>
            {['تسليم خلال ٢ أسبوع','دعم ٣ أشهر مجاناً','بدون عقود','سعودي ١٠٠٪'].map((t,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:5,fontSize:12,color:'rgba(255,255,255,0.35)'}}>
                <span style={{color:d.accent}}>✓</span>{t}
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div animate={{y:[0,10,0]}} transition={{duration:2.2,repeat:Infinity}}
          style={{position:'absolute',bottom:32,fontSize:22,opacity:0.25}}>↓</motion.div>
      </section>

      {/* ══ STATS ══ */}
      <StatBar d={d}/>

      {/* ══ PROBLEMS ══ */}
      <section style={{padding:'clamp(80px,10vw,120px) 24px',background:'var(--bg2)'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            style={{textAlign:'center',marginBottom:56}}>
            <div className="section-label" style={{color:d.accent,borderColor:`rgba(${c},0.3)`,background:`rgba(${c},0.08)`,marginBottom:16}}>
              🎯 التحدي الحقيقي</div>
            <h2 style={{fontWeight:900,fontSize:'clamp(1.8rem,4vw,3rem)',color:'#fff',marginBottom:10}}>
              مشاكل <span style={{color:d.accent}}>{d.name}</span> التي نحلّها</h2>
            <p style={{color:'var(--text2)',fontSize:15,maxWidth:480,margin:'0 auto'}}>
              شغلنا مع عشرات الأعمال في السعودية — نفهم وجعك قبل ما تشرحه.</p>
          </motion.div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))',gap:16}}>
            {d.problems.map((p,i)=>(
              <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.09,duration:0.5}}
                style={{padding:'26px 22px',borderRadius:18,position:'relative',overflow:'hidden',
                  background:`linear-gradient(145deg,rgba(${c},0.07) 0%,rgba(255,255,255,0.02) 100%)`,
                  border:`1px solid rgba(${c},0.15)`}}>
                <div style={{position:'absolute',top:0,left:0,width:'100%',height:2,
                  background:`linear-gradient(90deg,${d.accent},${d.accent2})`,opacity:0.5}}/>
                <div style={{fontSize:30,marginBottom:12}}>{p.icon}</div>
                <div style={{fontSize:15,fontWeight:800,color:'#fff',marginBottom:7}}>{p.title}</div>
                <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.7}}>{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section style={{padding:'clamp(80px,10vw,120px) 24px'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            style={{textAlign:'center',marginBottom:52}}>
            <div className="section-label" style={{color:d.accent,borderColor:`rgba(${c},0.3)`,background:`rgba(${c},0.08)`,marginBottom:16}}>
              ✨ ما الذي نقدمه</div>
            <h2 style={{fontWeight:900,fontSize:'clamp(1.8rem,4vw,3rem)',color:'#fff'}}>منظومة متكاملة لـ{d.name}</h2>
          </motion.div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))',gap:14}}>
            {d.features.map((f,i)=>(
              <motion.div key={i} initial={{opacity:0,scale:0.94}} whileInView={{opacity:1,scale:1}}
                viewport={{once:true}} transition={{delay:i*0.07,duration:0.4}}
                whileHover={{y:-6,boxShadow:`0 24px 56px rgba(${c},0.18)`}}
                style={{padding:'24px 20px',borderRadius:18,cursor:'default',
                  background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',
                  transition:'box-shadow 0.25s,transform 0.25s'}}>
                <div style={{fontSize:28,marginBottom:12}}>{f.icon}</div>
                <div style={{fontSize:14.5,fontWeight:800,color:'#fff',marginBottom:7}}>{f.title}</div>
                <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.7}}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ APPLE WALLET ══ */}
      <section style={{padding:'clamp(80px,10vw,130px) 24px',overflow:'hidden',background:'var(--bg2)'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:60,alignItems:'center'}}>
          <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
            <div className="section-label" style={{color:d.accent,borderColor:`rgba(${c},0.3)`,background:`rgba(${c},0.08)`,marginBottom:20,display:'inline-flex'}}>
              💳 Apple & Google Wallet</div>
            <h2 style={{fontWeight:900,fontSize:'clamp(1.6rem,3.5vw,2.6rem)',color:'#fff',marginBottom:16,lineHeight:1.2}}>{d.walletTitle}</h2>
            <p style={{fontSize:15.5,color:'var(--text2)',lineHeight:1.8,marginBottom:26}}>{d.walletDesc}</p>
            <ul style={{listStyle:'none',padding:0,margin:'0 0 28px',display:'flex',flexDirection:'column',gap:9}}>
              {d.walletFeatures.map((f,i)=>(
                <li key={i} style={{display:'flex',alignItems:'flex-start',gap:9,fontSize:13.5,color:'var(--text2)'}}>
                  <span style={{color:d.accent,flexShrink:0,marginTop:1}}>✓</span>{f}
                </li>
              ))}
            </ul>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 26px',borderRadius:12,
                background:`rgba(${c},0.12)`,border:`1px solid rgba(${c},0.3)`,
                color:d.accent,fontFamily:'Cairo,sans-serif',fontSize:14,fontWeight:700,textDecoration:'none'}}>
              اطلب بطاقتك الآن ←</a>
          </motion.div>
          <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}
            style={{display:'flex',justifyContent:'center'}}>
            <div style={{position:'relative',width:290}}>
              <div style={{position:'absolute',inset:-40,background:`radial-gradient(circle,rgba(${c},0.22) 0%,transparent 70%)`,pointerEvents:'none'}}/>
              <motion.div animate={{y:[0,-10,0],rotateY:[0,5,0]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}}
                style={{width:290,height:175,borderRadius:20,
                  background:`linear-gradient(135deg,${d.accent}ee,${d.accent2}dd)`,
                  boxShadow:`0 32px 72px rgba(${c},0.5)`,padding:'22px 24px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:-50,left:-50,width:150,height:150,borderRadius:'50%',background:'rgba(255,255,255,0.1)',pointerEvents:'none'}}/>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:24}}>
                  <span style={{fontSize:28}}>{d.icon}</span>
                  <div style={{fontSize:8.5,fontWeight:800,color:'rgba(255,255,255,0.65)',letterSpacing:1,
                    background:'rgba(0,0,0,0.2)',padding:'3px 8px',borderRadius:4}}>APPLE WALLET</div>
                </div>
                <div style={{fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.6)',marginBottom:3}}>{d.walletCardLabel}</div>
                <div style={{fontSize:17,fontWeight:900,color:'#fff',letterSpacing:-0.5}}>تلقا تك · {d.name}</div>
              </motion.div>
              <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.5}}
                style={{marginTop:16,padding:'10px 16px',borderRadius:10,
                  background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',
                  display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:16}}>📱</span>
                <div>
                  <div style={{fontSize:10,fontWeight:800,color:'#fff'}}>تضاف لـ iPhone مباشرة</div>
                  <div style={{fontSize:9,color:'var(--text3)'}}>بدون App Store — مع NFC</div>
                </div>
                <div style={{marginRight:'auto',fontSize:10,fontWeight:700,color:d.accent,
                  background:`rgba(${c},0.1)`,padding:'2px 8px',borderRadius:8}}>NFC ✓</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section style={{padding:'clamp(80px,10vw,120px) 24px'}}>
        <div style={{maxWidth:860,margin:'0 auto'}}>
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            style={{textAlign:'center',marginBottom:52}}>
            <div className="section-label" style={{color:d.accent,borderColor:`rgba(${c},0.3)`,background:`rgba(${c},0.08)`,marginBottom:16}}>
              🚀 كيف نبدأ معك</div>
            <h2 style={{fontWeight:900,fontSize:'clamp(1.8rem,4vw,3rem)',color:'#fff'}}>من واتساب إلى المنتج الحي</h2>
          </motion.div>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {d.howItWorks.map((s,i)=>(
              <motion.div key={i} initial={{opacity:0,x:i%2===0?-24:24}} whileInView={{opacity:1,x:0}}
                viewport={{once:true}} transition={{delay:i*0.13,duration:0.5}}
                style={{display:'flex',alignItems:'center',gap:16,flexDirection:i%2===0?'row':'row-reverse'}}>
                <div style={{flex:1,padding:'22px 26px',borderRadius:16,
                  background:`rgba(${c},0.05)`,border:`1px solid rgba(${c},0.12)`}}>
                  <div style={{fontSize:11,fontWeight:700,color:d.accent,marginBottom:5,letterSpacing:0.5}}>{s.step}</div>
                  <div style={{fontSize:15,fontWeight:900,color:'#fff',marginBottom:5}}>{s.title}</div>
                  <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.7}}>{s.desc}</div>
                </div>
                <div style={{width:48,height:48,borderRadius:'50%',flexShrink:0,
                  background:`linear-gradient(135deg,${d.accent},${d.accent2})`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:18,fontWeight:900,color:'#fff',boxShadow:`0 8px 24px rgba(${c},0.4)`}}>{i+1}</div>
                <div style={{flex:1}}/>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PACKAGES ══ */}
      <section style={{padding:'clamp(80px,10vw,120px) 24px',background:'var(--bg2)'}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            style={{textAlign:'center',marginBottom:52}}>
            <div className="section-label" style={{color:d.accent,borderColor:`rgba(${c},0.3)`,background:`rgba(${c},0.08)`,marginBottom:16}}>
              💰 الباقات</div>
            <h2 style={{fontWeight:900,fontSize:'clamp(1.8rem,4vw,3rem)',color:'#fff'}}>اختر الباقة المناسبة</h2>
            <p style={{color:'var(--text2)',fontSize:15,marginTop:12}}>لا عقود ملزمة — ادفع مرة واحدة وابدأ</p>
          </motion.div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16}}>
            {d.packages.map((pkg,i)=>(
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.1}}
                style={{padding:'32px 26px',borderRadius:20,position:'relative',overflow:'hidden',
                  background: pkg.highlight?`linear-gradient(145deg,rgba(${c},0.15),rgba(${c2},0.08))`:'rgba(255,255,255,0.03)',
                  border:`1.5px solid ${pkg.highlight?d.accent:'rgba(255,255,255,0.08)'}`,
                  boxShadow:pkg.highlight?`0 0 40px rgba(${c},0.2)`:undefined}}>
                {pkg.highlight&&<div style={{position:'absolute',top:14,left:'50%',transform:'translateX(-50%)',
                  padding:'3px 12px',borderRadius:20,background:d.accent,fontSize:10,fontWeight:800,color:'#fff',letterSpacing:0.5,whiteSpace:'nowrap'}}>
                  الأكثر طلباً</div>}
                <div style={{marginTop:pkg.highlight?20:0,marginBottom:8,fontSize:14,fontWeight:800,color:'#fff'}}>{pkg.name}</div>
                <div style={{fontSize:32,fontWeight:900,color:pkg.highlight?d.accent:'#fff',letterSpacing:-1,marginBottom:20}}>
                  {pkg.price}<span style={{fontSize:12,fontWeight:400,color:'var(--text3)',marginRight:4}}>ريال</span>
                </div>
                <ul style={{listStyle:'none',padding:0,margin:'0 0 24px',display:'flex',flexDirection:'column',gap:8}}>
                  {pkg.features.map((f,j)=>(
                    <li key={j} style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:13,color:'var(--text2)'}}>
                      <span style={{color:d.accent,flexShrink:0}}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  style={{display:'block',textAlign:'center',padding:'12px',borderRadius:12,
                    background:pkg.highlight?`linear-gradient(135deg,${d.accent},${d.accent2})`:'rgba(255,255,255,0.06)',
                    border:pkg.highlight?'none':'1px solid rgba(255,255,255,0.1)',
                    color:'#fff',fontFamily:'Cairo,sans-serif',fontSize:14,fontWeight:700,textDecoration:'none'}}>
                  ابدأ الآن</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIAL ══ */}
      {d.testimonial&&(
        <section style={{padding:'56px 24px'}}>
          <div style={{maxWidth:660,margin:'0 auto',textAlign:'center'}}>
            <motion.div initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
              style={{padding:'36px 32px',borderRadius:22,
                background:`linear-gradient(145deg,rgba(${c},0.08),rgba(${c2},0.04))`,
                border:`1px solid rgba(${c},0.2)`}}>
              <div style={{fontSize:32,marginBottom:14,color:d.accent}}>"</div>
              <p style={{fontSize:16.5,color:'#fff',lineHeight:1.85,marginBottom:22,fontWeight:600}}>{d.testimonial.text}</p>
              <div style={{fontSize:13,fontWeight:800,color:d.accent}}>{d.testimonial.name}</div>
              <div style={{fontSize:11,color:'var(--text3)',marginTop:3}}>{d.testimonial.role}</div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ══ FINAL CTA ══ */}
      <section style={{padding:'clamp(80px,10vw,120px) 24px',
        background:`radial-gradient(ellipse 70% 60% at 50% 50%,rgba(${c},0.1) 0%,transparent 70%)`,
        textAlign:'center'}}>
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <div style={{fontSize:52,marginBottom:20}}>{d.icon}</div>
          <h2 style={{fontWeight:900,fontSize:'clamp(1.8rem,4vw,3.2rem)',color:'#fff',marginBottom:12}}>
            مستعد تطوّر {d.name}ك؟</h2>
          <p style={{fontSize:16,color:'var(--text2)',marginBottom:36,maxWidth:420,margin:'0 auto 36px'}}>
            تواصل معنا — نرد خلال ساعات ونبدأ بتحليل مشروعك مجاناً.</p>
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{scale:1.05}} whileTap={{scale:0.97}}
              style={{display:'inline-flex',alignItems:'center',gap:10,padding:'17px 44px',borderRadius:16,
                background:`linear-gradient(135deg,${d.accent},${d.accent2})`,color:'#fff',
                fontFamily:'Cairo,sans-serif',fontSize:17,fontWeight:900,textDecoration:'none',
                boxShadow:`0 16px 48px rgba(${c},0.45)`}}>ابدأ الآن على واتساب ←</motion.a>
            <Link href="/" style={{display:'inline-flex',alignItems:'center',padding:'17px 32px',borderRadius:16,
              background:'rgba(255,255,255,0.05)',border:'1px solid var(--border)',
              color:'var(--text2)',fontFamily:'Cairo,sans-serif',fontSize:15,fontWeight:700,textDecoration:'none'}}>
              الرئيسية</Link>
          </div>
        </motion.div>
      </section>
    </PageLayout>
  );
}
