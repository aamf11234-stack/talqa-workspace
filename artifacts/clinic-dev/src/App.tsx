import React, { useEffect, useRef, useState } from 'react';
import { Smartphone, Globe, LayoutDashboard, Play, GitBranch, Layers, Plug2, BarChart3, ShieldCheck, UserCheck, Lock, KeyRound, Fingerprint, HardDrive, ScanEye, FileCheck2, Zap, Bell, Heart, CreditCard, MessageCircle, Cloud, PhoneMissed, FileX2, UserX, Palette, LayoutTemplate, Sparkles, Store, CircleCheck, QrCode, CalendarCheck, FileText, Pill, Watch, Users, Wallet, FolderOpen, Activity, Shield, Puzzle, Search, Link2, TrendingUp, Star, CheckCircle, ArrowLeft, Phone, Mail } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TalqaShield } from './components/TalqaShield';

/* ═══ DESIGN TOKENS ══════════════════════════════════════════ */
const W  = '#FFFFFF';
const BG = '#F4F8FD';
const BG2= '#EDF3FB';
const DARK='#0A1F3D';
const BLUE='#0062CC';
const BLUE_L='rgba(0,98,204,0.08)';
const BLUE_M='rgba(0,98,204,0.15)';
const TEAL='#00A8C8';
const TEXT='#0A1628';
const SUB ='#2C4A6E';
const MUTED='#6B7FA0';
const DIM ='#94A3B8';
const BORD='#DDE6F3';
const CARD_S='0 1px 3px rgba(10,31,61,0.06),0 4px 20px rgba(10,31,61,0.05)';
const CARD_SH='0 2px 8px rgba(10,31,61,0.1),0 8px 32px rgba(10,31,61,0.08)';

/* ═══ ICON MAP ════════════════════════════════════════════════ */
type LC = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
const ICONS: Record<string,LC> = {
  smartphone:Smartphone,globe:Globe,dashboard:LayoutDashboard,play:Play,
  gitbranch:GitBranch,layers:Layers,plug:Plug2,barchart:BarChart3,
  shieldcheck:ShieldCheck,usercheck:UserCheck,lock:Lock,key:KeyRound,
  fingerprint:Fingerprint,hdd:HardDrive,eye:ScanEye,filecheck:FileCheck2,
  zap:Zap,bell:Bell,heart:Heart,creditcard:CreditCard,message:MessageCircle,
  cloud:Cloud,phonemissed:PhoneMissed,filex:FileX2,userx:UserX,
  palette:Palette,layout:LayoutTemplate,sparkles:Sparkles,store:Store,
  check:CircleCheck,qr:QrCode,calendar:CalendarCheck,results:FileText,
  pill:Pill,applewatch:Watch,users:Users,wallet:Wallet,folder:FolderOpen,
  activity:Activity,shield:Shield,puzzle:Puzzle,search:Search,link:Link2,
  trending:TrendingUp,star:Star,
};
function Ic({ n, size=20, color=TEXT }: { n:string; size?:number; color?:string }) {
  const C = ICONS[n]; return C ? <C size={size} color={color} strokeWidth={1.7}/> : null;
}

/* ═══ UTILITIES ══════════════════════════════════════════════ */
function useOfferCountdown() {
  const END = new Date('2026-07-31T23:59:59').getTime();
  const calc = () => { const d=Math.max(0,END-Date.now()); return { days:Math.floor(d/86400000), hours:Math.floor((d%86400000)/3600000), mins:Math.floor((d%3600000)/60000), secs:Math.floor((d%60000)/1000), active:d>0 }; };
  const [t,setT] = useState(calc);
  useEffect(() => { const id=setInterval(()=>setT(calc()),1000); return ()=>clearInterval(id); },[]);
  return t;
}

function useCounter(target:number,dur=1600) {
  const [v,setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref,{once:true});
  useEffect(() => {
    if (!inView) return;
    let cur=0; const step=Math.max(1,Math.ceil(target/(dur/16)));
    const id=setInterval(()=>{ cur=Math.min(cur+step,target); setV(cur); if(cur>=target)clearInterval(id); },16);
    return ()=>clearInterval(id);
  },[inView,target,dur]);
  return {v,ref};
}

function Reveal({children,delay=0,className='',y=20}:{children:React.ReactNode;delay?:number;className?:string;y?:number}) {
  const ref=useRef<HTMLDivElement>(null);
  const inView=useInView(ref,{once:true,margin:'-40px'});
  return (
    <motion.div ref={ref} className={className}
      initial={{opacity:0,y}} animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:0.65,delay,ease:[0.22,1,0.36,1]}}>
      {children}
    </motion.div>
  );
}

/* ═══ OFFER BAR ══════════════════════════════════════════════ */
function OfferBar({lang}:{lang:'ar'|'en'}) {
  const {days,hours,mins,secs,active}=useOfferCountdown();
  const [visible,setVisible]=useState(true);
  if (!active||!visible) return null;
  const pad=(n:number)=>String(n).padStart(2,'0');
  return (
    <div className="relative z-50 overflow-hidden" style={{background:'linear-gradient(90deg,#0A1F3D,#0062CC,#0A1F3D)'}}>
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)'}}
        animate={{x:['-100%','100%']}} transition={{duration:3,repeat:Infinity,ease:'linear'}}/>
      <div className="relative flex items-center justify-center gap-3 px-4 py-2 text-white flex-wrap">
        <motion.span className="w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" animate={{opacity:[1,0.3,1]}} transition={{duration:1.2,repeat:Infinity}}/>
        <span className="text-[11px] font-bold whitespace-nowrap">{lang==='ar'?'عرض خاص — أسعار إطلاق محدودة':'Special launch pricing'}</span>
        <div className="flex items-center gap-1 shrink-0" dir="ltr">
          {[{v:days,l:lang==='ar'?'يوم':'d'},{v:hours,l:lang==='ar'?'س':'h'},{v:mins,l:lang==='ar'?'د':'m'},{v:secs,l:lang==='ar'?'ث':'s'}].map(({v,l},i)=>(
            <React.Fragment key={l}>
              {i>0&&<span className="text-white/30 mx-0.5">:</span>}
              <div className="min-w-[26px] text-center px-1.5 py-0.5 rounded" style={{background:'rgba(255,255,255,0.12)'}}>
                <AnimatePresence mode="popLayout">
                  <motion.span key={v} initial={{y:-8,opacity:0}} animate={{y:0,opacity:1}} exit={{y:8,opacity:0}} transition={{duration:0.18}} className="text-[11px] font-black tabular-nums block">{pad(v)}</motion.span>
                </AnimatePresence>
                <span className="text-[7px] text-white/40">{l}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <a href="#تواصل" className="text-[11px] font-black px-3 py-1 rounded-full transition-all" style={{background:'rgba(255,255,255,0.18)',border:'1px solid rgba(255,255,255,0.25)'}}>
          {lang==='ar'?'احجز مكانك ←':'Book now →'}
        </a>
        <button onClick={()=>setVisible(false)} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center opacity-40 hover:opacity-80" style={{background:'rgba(255,255,255,0.1)'}}>
          <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 1l6 6M7 1L1 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ═══ NAV ════════════════════════════════════════════════════ */
function Nav({lang,onLang}:{lang:'ar'|'en';onLang:()=>void}) {
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>50);window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h);},[]);
  return (
    <motion.div initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5}} className="fixed top-0 left-0 right-0 z-50">
      <nav className="px-6 lg:px-12 py-3.5 flex items-center justify-between transition-all duration-400"
        style={{background:scrolled?'rgba(255,255,255,0.97)':W,backdropFilter:'blur(20px)',borderBottom:`1px solid ${scrolled?BORD:'transparent'}`,boxShadow:scrolled?'0 1px 16px rgba(10,31,61,0.08)':'none'}}>
        <div className="flex items-center gap-2.5">
          <TalqaShield size={34}/>
          <div>
            <p className="text-[15px] font-black leading-tight" style={{color:TEXT}}>تلقا<span style={{color:BLUE}}> للعيادات</span></p>
            <p className="text-[9px] font-medium" style={{color:MUTED}}>متخصصون في القطاع الطبي</p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-7">
          {[['المنظومة','#المنظومة'],['كيف نعمل','#process'],['المميزات','#المميزات'],['تواصل','#تواصل']].map(([l,h])=>(
            <a key={l} href={h} className="text-[13px] font-semibold transition-colors" style={{color:MUTED}}
              onMouseEnter={e=>(e.currentTarget.style.color=BLUE)} onMouseLeave={e=>(e.currentTarget.style.color=MUTED)}>{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={onLang} className="hidden sm:flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all" style={{borderColor:BORD,color:MUTED}}>
            <span style={{color:lang==='ar'?BLUE:MUTED}}>عر</span><span style={{color:DIM}}>|</span><span style={{color:lang==='en'?BLUE:MUTED}}>EN</span>
          </button>
          <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
            className="hidden sm:block text-[13px] font-bold px-4 py-2 rounded-xl border transition-all" style={{borderColor:BORD,color:BLUE,background:BLUE_L}}>
            {lang==='ar'?'الديمو':'Demo'}
          </a>
          <a href="https://wa.me/966551378531" target="_blank" rel="noopener noreferrer"
            className="text-[13px] font-black px-5 py-2 rounded-xl text-white transition-all active:scale-95"
            style={{background:`linear-gradient(135deg,${BLUE},#0050A8)`,boxShadow:`0 4px 14px ${BLUE}40`}}>
            {lang==='ar'?'تواصل':'Contact'}
          </a>
        </div>
      </nav>
    </motion.div>
  );
}

/* ═══ PHONE SCREENS ══════════════════════════════════════════ */
const SCREENS=[
  {
    gradient:'linear-gradient(150deg,#0062CC 0%,#0050A8 100%)',
    content:(
      <div className="h-full flex flex-col p-4 pt-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <div><p className="text-[9px] opacity-50 mb-0.5">مرحباً</p><p className="text-[14px] font-black">خالد العمري</p></div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-[12px]">خ</div>
        </div>
        <div className="bg-white/12 rounded-2xl p-3.5 mb-3 border border-white/15">
          <p className="text-[8px] opacity-50 mb-0.5">موعدك القادم</p>
          <p className="text-[12px] font-black">د. سارة المطيري</p>
          <p className="text-[8px] opacity-50 mb-2.5">غداً · ١٠:٣٠ صباحاً</p>
          <div className="flex gap-1.5">
            <div className="flex-1 bg-white rounded-lg py-1.5 text-center text-[8px] font-black text-blue-600">تأكيد</div>
            <div className="flex-1 bg-white/15 rounded-lg py-1.5 text-center text-[8px]">إعادة جدولة</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {[['','حجز'],['','أدوية'],['','نتائج']].map(([ic,lb])=>(
            <div key={lb} className="bg-white/10 rounded-xl p-2.5 text-center border border-white/8">
              <div className="text-[14px] mb-0.5">{ic}</div><p className="text-[7px] opacity-70 font-semibold">{lb}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/10 rounded-xl p-2.5 flex items-center gap-2 border border-white/8">
          <span className="text-[15px]"></span>
          <div className="flex-1"><p className="text-[8px] font-bold">ميتفورمين ٥٠٠ملغ</p><p className="text-[7px] opacity-40">يومياً</p></div>
          <div className="w-2 h-2 rounded-full bg-emerald-400"/>
        </div>
      </div>
    )
  },
  {
    gradient:'linear-gradient(150deg,#6D28D9 0%,#5B21B6 100%)',
    content:(
      <div className="h-full flex flex-col p-4 pt-8 text-white">
        <p className="text-[14px] font-black mb-0.5">السجل الطبي</p>
        <p className="text-[8px] opacity-40 mb-3">٤ وثائق مشفرة</p>
        {[['','تحليل الدم','أمس'],['','وصفة طبية','٣ أيام'],['','تقرير السكر','أسبوع'],['','تخطيط القلب','شهر']].map(([ic,tt,dt])=>(
          <div key={tt} className="flex items-center gap-2.5 bg-white/10 rounded-xl p-2.5 mb-1.5 border border-white/8">
            <span className="text-[15px]">{ic}</span>
            <div className="flex-1"><p className="text-[9px] font-bold">{tt}</p><p className="text-[7px] opacity-40">{dt}</p></div>
            <span className="text-[6px] bg-white/15 px-1.5 py-0.5 rounded-full">مشفّر</span>
          </div>
        ))}
        <div className="mt-auto bg-emerald-500/15 border border-emerald-400/25 rounded-xl p-2.5 text-center">
          <p className="text-[8px] text-emerald-300 font-bold"> AES-256</p>
        </div>
      </div>
    )
  },
  {
    gradient:'linear-gradient(150deg,#0F172A 0%,#1E293B 100%)',
    content:(
      <div className="h-full flex flex-col p-4 pt-8 text-white">
        <p className="text-[14px] font-black mb-0.5">لوحة الإدارة</p>
        <p className="text-[8px] opacity-30 mb-3">اليوم</p>
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {[['١٢','مريض اليوم','#38BDF8'],['٨٥٠٠','إيرادات','#34D399'],['٩٨٪','رضا','#A78BFA'],['٣','تأخير','#FBBF24']].map(([v,l,c])=>(
            <div key={l} className="rounded-xl p-2.5 border" style={{background:`${c}15`,borderColor:`${c}20`}}>
              <p className="text-[14px] font-black" style={{color:c}}>{v}</p>
              <p className="text-[7px] opacity-50">{l}</p>
            </div>
          ))}
        </div>
        {[['أحمد السالم','د. خالد','٩:٠٠'],['نورا العتيبي','د. سارة','٩:٣٠']].map(([n,d,t])=>(
          <div key={n} className="flex items-center gap-2 bg-white/5 rounded-xl p-2 mb-1.5 border border-white/5">
            <div className="w-5 h-5 rounded-full bg-blue-500/40 flex items-center justify-center text-[7px] font-black shrink-0">{n[0]}</div>
            <div className="flex-1"><p className="text-[8px] font-bold">{n}</p><p className="text-[7px] opacity-30">{d}</p></div>
            <span className="text-[7px] opacity-30 font-mono">{t}</span>
          </div>
        ))}
      </div>
    )
  },
];

function PhoneMockup({className=''}:{className?:string}) {
  const [screen,setScreen]=useState(0);
  useEffect(()=>{const id=setInterval(()=>setScreen(s=>(s+1)%SCREENS.length),4000);return()=>clearInterval(id);},[]);
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* glow */}
      <motion.div className="absolute rounded-full blur-[70px] pointer-events-none"
        animate={{scale:[1,1.2,1],opacity:[0.15,0.28,0.15]}} transition={{duration:4,repeat:Infinity}}
        style={{width:300,height:300,background:`radial-gradient(circle,${BLUE}99 0%,transparent 70%)`}}/>
      <div className="relative z-10" style={{filter:'drop-shadow(0 32px 60px rgba(0,98,204,0.25))'}}>
        <div className="relative w-[220px] h-[440px] rounded-[42px] overflow-hidden"
          style={{border:'9px solid #1A2F50',boxShadow:'inset 0 0 0 1px rgba(255,255,255,0.05),0 0 0 1px rgba(0,0,0,0.35)'}}>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black/80 rounded-full z-20"/>
          <AnimatePresence mode="wait">
            <motion.div key={screen} className="absolute inset-0"
              initial={{opacity:0,scale:1.03}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.97}}
              transition={{duration:0.45,ease:[0.22,1,0.36,1]}}
              style={{background:SCREENS[screen].gradient,paddingTop:30}}>
              {SCREENS[screen].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* dots */}
      <div className="absolute -bottom-7 flex gap-1.5">
        {SCREENS.map((_,i)=>(
          <button key={i} onClick={()=>setScreen(i)} className="rounded-full transition-all duration-300"
            style={{width:i===screen?20:6,height:6,background:i===screen?BLUE:BORD}}/>
        ))}
      </div>
      {/* floating badge 1 */}
      <motion.div animate={{y:[0,-7,0]}} transition={{duration:3.5,repeat:Infinity,ease:'easeInOut'}}
        className="absolute -right-14 top-16 z-20 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl"
        style={{background:W,border:`1px solid ${BORD}`,boxShadow:CARD_SH}}>
        <div className="w-7 h-7 rounded-xl flex items-center justify-center text-base shrink-0" style={{background:BLUE_L,color:BLUE}}></div>
        <div><p className="text-[11px] font-black" style={{color:TEXT}}>حجز جديد</p><p className="text-[9px]" style={{color:MUTED}}>قبل ثانيتين</p></div>
      </motion.div>
      {/* floating badge 2 */}
      <motion.div animate={{y:[0,7,0]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut',delay:1.5}}
        className="absolute -left-14 bottom-28 z-20 px-3 py-2 rounded-xl"
        style={{background:W,border:'1px solid rgba(52,199,89,0.3)',boxShadow:CARD_SH}}>
        <p className="text-[10px] font-black text-emerald-600 flex items-center gap-1"><CheckCircle size={10}/> HIPAA</p>
        <p className="text-[9px]" style={{color:MUTED}}>تشفير ١٠٠٪</p>
      </motion.div>
    </div>
  );
}

/* ═══ TICKER ═════════════════════════════════════════════════ */
const TICKS=['تطبيق iOS','تطبيق Android','موقع احترافي','نظام إدارة','Apple Health','Apple Wallet','Google Wallet','سجل طبي','واتساب آلي','حجز مواعيد','Apple Watch','تذكير أدوية','داشبورد إدارة','نتائج مختبر','ملف مريض رقمي'];
function Ticker() {
  const all=[...TICKS,...TICKS];
  return (
    <div className="overflow-hidden py-3.5 border-y" style={{borderColor:BORD,background:BG2}}>
      <motion.div className="flex gap-8 w-max" animate={{x:['0%','-50%']}} transition={{duration:32,ease:'linear',repeat:Infinity}}>
        {all.map((t,i)=>(
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span className="text-[12px] font-semibold whitespace-nowrap" style={{color:MUTED}}>{t}</span>
            <span className="w-1 h-1 rounded-full shrink-0" style={{background:BLUE,opacity:0.4}}/>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══ ACTIVITIES + WALLET ════════════════════════════════════ */
const ACTIVITIES=[
  {icon:'ع',name:'عيادة الشفاء',city:'الرياض',action:'وقّعت عقد المشروع',ago:'منذ ٢ ساعة'},
  {icon:'م',name:'د. محمد الأحمدي',city:'جدة',action:'شاهد الديمو الآن',ago:'الآن'},
  {icon:'ن',name:'مجمع النور الطبي',city:'مكة',action:'طلب عرض سعر',ago:'منذ ٤ ساعات'},
  {icon:'ر',name:'عيادة الرعاية',city:'أبها',action:'في مرحلة التصميم',ago:'منذ ٣ أيام'},
  {icon:'س',name:'مستشفى السلام',city:'الدمام',action:'يتصفح الموقع الآن',ago:'الآن'},
  {icon:'د',name:'عيادات دار الشفاء',city:'الرياض',action:'جاري بناء التطبيق',ago:'منذ يومين'},
];

function WalletBtn({label,sub,gradient,border,getEndpoint}:{label:string;sub:string;gradient:string;border:string;getEndpoint:string;}) {
  const [done,setDone]=React.useState(false);
  const handle=()=>{if(done)return;window.location.href=getEndpoint;setDone(true);setTimeout(()=>setDone(false),3200);};
  return (
    <motion.button whileTap={{scale:0.97}} onClick={handle}
      className="flex items-center gap-3 px-4 py-3 rounded-[14px] w-full cursor-pointer"
      style={{background:done?'rgba(52,199,89,0.12)':gradient,border:`1px solid ${done?'rgba(52,199,89,0.35)':border}`}}>
      {done?<span className="text-emerald-500 text-lg shrink-0">✓</span>:
        <svg width="12" height="15" viewBox="0 0 17 20" fill="white" className="shrink-0"><path d="M14.1 10.64c-.02-2.04 1.67-3.02 1.74-3.06-0.95-1.39-2.43-1.58-2.95-1.60-1.26-.13-2.46.74-3.10.74-.64 0-1.63-.72-2.68-.70C5.55 6.04 4.05 6.97 3.22 8.36 1.54 11.17 2.80 15.35 4.42 17.65c.80 1.15 1.77 2.45 3.04 2.40 1.22-.05 1.68-.78 3.16-.78 1.47 0 1.89.78 3.18.76 1.31-.02 2.15-1.18 2.94-2.34.93-1.34 1.32-2.64 1.34-2.71-.03-.01-2.57-.99-2.98-3.34zM11.96 3.83c.67-.81 1.12-1.93 1.00-3.06-.96.04-2.13.64-2.82 1.45-.62.71-1.16 1.86-1.01 2.96 1.07.08 2.16-.54 2.83-1.35z"/></svg>}
      <div className="text-right">
        <p className={`font-bold text-[12px] leading-none ${done?'text-emerald-500':'text-white'}`}>{done?'تمت الإضافة ✓':label}</p>
        <p className="text-white/35 text-[9px] mt-0.5">{sub}</p>
      </div>
    </motion.button>
  );
}

/* ═══ SECTION LABEL ══════════════════════════════════════════ */
function SLabel({children}:{children:React.ReactNode}) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 text-[11px] font-black"
      style={{background:BLUE_L,color:BLUE,border:`1px solid ${BLUE_M}`}}>
      <span className="w-1.5 h-1.5 rounded-full" style={{background:BLUE}}/>
      {children}
    </div>
  );
}

/* ═══ CARD ════════════════════════════════════════════════════ */
function Card({children,className='',style={},hover=true}:{children:React.ReactNode;className?:string;style?:React.CSSProperties;hover?:boolean}) {
  const [h,setH]=useState(false);
  return (
    <div className={`rounded-2xl transition-all duration-300 ${className}`}
      onMouseEnter={()=>hover&&setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:W,border:`1px solid ${h?`${BLUE}30`:BORD}`,boxShadow:h?CARD_SH:CARD_S,transform:h?'translateY(-2px)':'none',...style}}>
      {children}
    </div>
  );
}

/* ═══ STAT ════════════════════════════════════════════════════ */
function Stat({target,suffix,label,prefix=''}:{target:number;suffix:string;label:string;prefix?:string}) {
  const {v,ref}=useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <p className="font-black leading-none mb-1.5" style={{fontSize:'clamp(36px,5vw,60px)',color:BLUE}}>{prefix}{v.toLocaleString('ar-SA')}{suffix}</p>
      <p className="text-[13px] font-medium" style={{color:MUTED}}>{label}</p>
    </div>
  );
}

/* ═══ APP ════════════════════════════════════════════════════ */
export default function App() {
  const [lang,setLang]=useState<'ar'|'en'>('ar');
  const [faqOpen,setFaqOpen]=useState<number|null>(null);
  const [roiPatients,setRoiPatients]=useState(80);
  const [roiPrice,setRoiPrice]=useState(200);
  const [formName,setFormName]=useState('');
  const [formClinic,setFormClinic]=useState('');
  const [formPhone,setFormPhone]=useState('');
  const [activityIdx,setActivityIdx]=useState(0);
  const [showActivity,setShowActivity]=useState(false);
  const [formSent,setFormSent]=useState<'idle'|'sending'|'done'>('idle');

  useEffect(()=>{
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.documentElement.lang=lang;
    document.body.style.background=BG;
    document.body.style.fontFamily="'Tajawal',sans-serif";
    document.body.style.margin='0';
    document.body.style.overflowX='hidden';
  },[lang]);

  useEffect(()=>{
    const t1=setTimeout(()=>setShowActivity(true),4000);
    const id=setInterval(()=>{setShowActivity(false);setTimeout(()=>{setActivityIdx(i=>(i+1)%ACTIVITIES.length);setShowActivity(true);},600);},7000);
    return()=>{clearTimeout(t1);clearInterval(id);};
  },[]);

  const roiMonthly=roiPatients*roiPrice;
  const roiExtra=Math.round(roiMonthly*12*0.18);
  const roiLost=Math.round(roiPatients*0.22);

  const handleFormSubmit=async()=>{
    if(!formName||!formPhone||formSent==='sending')return;
    setFormSent('sending');
    try {
      const base=(import.meta.env.BASE_URL||'/').replace(/\/+$/,'');
      await fetch(`${base}/api/leads`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:formName,clinic:formClinic,phone:formPhone})});
      setFormSent('done');
    } catch {
      const msg=`مرحباً تلقا تك \n\nأنا ${formName}${formClinic?` من ${formClinic}`:''} .\nأرغب في معرفة تفاصيل منظومة تلقا للعيادات.\n\nرقمي: ${formPhone}`;
      window.open(`https://wa.me/966551378531?text=${encodeURIComponent(msg)}`,'_blank');
      setFormSent('done');
    }
  };

  const ar=lang==='ar';

  return (
    <div dir={ar?'rtl':'ltr'} style={{background:BG,fontFamily:"'Tajawal',sans-serif",overflowX:'hidden',color:TEXT}}>
      <OfferBar lang={lang}/>
      <Nav lang={lang} onLang={()=>setLang(l=>l==='ar'?'en':'ar')}/>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center px-6 lg:px-12 pt-24 pb-12" style={{background:`linear-gradient(180deg,${W} 0%,${BG} 100%)`}}>
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
              <SLabel>{ar?'متخصصون حصراً في العيادات والمراكز الطبية':'Built exclusively for clinics'}</SLabel>
            </motion.div>

            <motion.h1 initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:0.18,duration:0.7,ease:[0.22,1,0.36,1]}}
              className="font-black leading-[1.1] mb-5" style={{fontSize:'clamp(38px,5.5vw,72px)',color:TEXT}}>
              {ar?<>عيادتك تستحق<br/><span style={{color:BLUE}}>أفضل تجربة<br/>رقمية.</span></>
                :<>Your clinic deserves<br/><span style={{color:BLUE}}>the best digital<br/>experience.</span></>}
            </motion.h1>

            <motion.p initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.28}}
              className="text-[17px] leading-relaxed mb-8 max-w-md" style={{color:SUB}}>
              {ar?<>تطبيق بهويتك + موقع يفوز على جوجل + نظام إدارة — في{' '}<strong style={{color:TEXT}}>٦٠ يوم مضمونة.</strong></>
                :<>Your-branded app + top-ranking website + management system — in <strong style={{color:TEXT}}>60 days, guaranteed.</strong></>}
            </motion.p>

            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.36}} className="flex flex-wrap gap-3 mb-10">
              <a href="https://wa.me/966551378531" target="_blank" rel="noopener noreferrer"
                className="font-black text-[15px] px-7 py-3.5 rounded-2xl text-white transition-all active:scale-95"
                style={{background:`linear-gradient(135deg,${BLUE},#004EA0)`,boxShadow:`0 6px 24px ${BLUE}45`}}>
                {ar?'ابدأ مشروع عيادتك':'Start your project'}
              </a>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                className="font-bold text-[15px] px-7 py-3.5 rounded-2xl border-2 transition-all"
                style={{borderColor:BORD,color:BLUE,background:W}}>
                {ar?'شاهد الديمو الحي':'Live Demo'}
              </a>
            </motion.div>

            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.46}}
              className="flex flex-wrap items-center gap-5 p-4 rounded-2xl border" style={{borderColor:BORD,background:W,boxShadow:CARD_S}}>
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2 space-x-reverse">
                  {['#0062CC','#6D28D9','#059669','#D97706','#DC2626'].map((c,i)=>(
                    <div key={i} className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[9px] font-black text-white" style={{background:c,borderColor:W}}>
                      {['ع','م','ن','خ','ر'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[12px] font-black" style={{color:TEXT}}>+٢٠٠ عيادة</p>
                  <div className="flex items-center gap-0.5">{[1,2,3,4,5].map(i=><Star key={i} size={9} fill="#F59E0B" color="#F59E0B"/>)}<span className="text-[9px] mr-1" style={{color:MUTED}}>تثق بنا</span></div>
                </div>
              </div>
              <div className="w-px h-6 hidden sm:block" style={{background:BORD}}/>
              <div className="flex gap-3 flex-wrap">
                {['iOS + Android','Apple Wallet','HIPAA'].map(b=>(
                  <span key={b} className="flex items-center gap-1 text-[10px] font-bold" style={{color:MUTED}}>
                    <CheckCircle size={10} color="#059669"/> {b}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:0.28,duration:0.8,ease:[0.22,1,0.36,1]}} className="flex justify-center pb-10 lg:pb-0">
            <PhoneMockup/>
          </motion.div>
        </div>
      </section>

      <Ticker/>

      {/* ══════════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════════ */}
      <div className="px-6 lg:px-12 py-4 border-b" style={{borderColor:BORD,background:W}}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-4 lg:gap-8">
          {[
            {dot:'#059669',label:ar?'HTTPS · SSL مفعّل':'HTTPS · SSL Active'},
            {dot:'#059669',label:ar?'خوادم داخل المملكة':'Servers in KSA'},
            {dot:'#059669',label:ar?'AES-256 مشفّر':'AES-256 Encrypted'},
            {dot:'#059669',label:ar?'٠ اختراقات':'0 Breaches'},
            {dot:'#6D28D9',label:'PDPL · HIPAA · ISO 27001'},
          ].map((s,i)=>(
            <div key={i} className="flex items-center gap-2 shrink-0">
              <motion.span className="w-2 h-2 rounded-full shrink-0" style={{background:s.dot}}
                animate={{opacity:[1,0.4,1]}} transition={{duration:2.5,repeat:Infinity,delay:i*0.3}}/>
              <span className="text-[11px] font-semibold" style={{color:MUTED}}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12" style={{background:W}}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {target:200,suffix:'+',label:ar?'عيادة عميلة':'Clinics served'},
            {target:60,suffix:'',label:ar?'يوم متوسط التسليم':'Day delivery avg',prefix:''},
            {target:100,suffix:'٪',label:ar?'تشفير البيانات':'Data encrypted'},
            {target:0,suffix:'',label:ar?'اختراق مسجّل':'Breach recorded'},
          ].map((s,i)=>(
            <Reveal key={i} delay={i*0.08}>
              <Stat target={s.target} suffix={s.suffix} label={s.label} prefix={s.prefix}/>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PROBLEMS → SOLUTIONS
      ══════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12" style={{background:BG}}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <SLabel>{ar?'لماذا تحتاجنا؟':'Why you need us'}</SLabel>
            <h2 className="font-black" style={{fontSize:'clamp(28px,4.5vw,52px)',color:TEXT}}>
              {ar?<>مشاكل حقيقية.<br/><span style={{color:MUTED}}>حلول تقنية.</span></>:<>Real problems.<br/><span style={{color:MUTED}}>Tech solutions.</span></>}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {problem:ar?'المرضى يتصلون للحجز وأحياناً لا يجدون أحداً':'Patients call for booking but can\'t reach anyone',fix:ar?'تطبيق حجز ذكي ٢٤/٧ بدون مكالمات':'24/7 smart booking without calls',accent:'#0062CC'},
              {problem:ar?'نتائج التحاليل ترسل على واتساب بدون سرية':'Lab results sent on WhatsApp without privacy',fix:ar?'بوابة نتائج مشفرة مباشرة في تطبيقك':'Encrypted results portal in your app',accent:'#6D28D9'},
              {problem:ar?'لا يوجد سجل طبي موحد للمريض عبر الزيارات':'No unified medical record across visits',fix:ar?'سجل رقمي كامل مرتبط بكل مريض':'Complete digital record per patient',accent:'#059669'},
              {problem:ar?'المنافسون يظهرون في جوجل وأنت غائب تماماً':'Competitors rank on Google while you\'re invisible',fix:ar?'موقع محسّن SEO يجذب مرضى جدد يومياً':'SEO website attracting new patients daily',accent:'#D97706'},
            ].map((item,i)=>(
              <Reveal key={i} delay={i*0.07}>
                <Card className="overflow-hidden">
                  <div className="p-4 border-b" style={{borderColor:'rgba(239,68,68,0.12)',background:'rgba(254,242,242,0.7)'}}>
                    <p className="text-[10px] font-black text-red-400 mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400"/> {ar?'المشكلة':'Problem'}
                    </p>
                    <p className="text-[14px] leading-snug text-red-700">{item.problem}</p>
                  </div>
                  <div className="p-4" style={{background:`${item.accent}06`}}>
                    <p className="text-[10px] font-black mb-1.5 flex items-center gap-1.5" style={{color:item.accent}}>
                      <CheckCircle size={11} color={item.accent}/> {ar?'الحل':'Solution'}
                    </p>
                    <p className="text-[14px] font-bold" style={{color:item.accent}}>{item.fix}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PRODUCTS
      ══════════════════════════════════════════════ */}
      <section id="المنظومة" className="py-20 px-6 lg:px-12" style={{background:W}}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <SLabel>{ar?'المنظومة':'The System'}</SLabel>
            <h2 className="font-black" style={{fontSize:'clamp(28px,4.5vw,52px)',color:TEXT}}>
              {ar?<>ثلاثة منتجات.<br/><span style={{color:MUTED}}>منظومة واحدة.</span></>:<>Three products.<br/><span style={{color:MUTED}}>One system.</span></>}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              {
                icon:'smartphone',color:BLUE,iconBg:BLUE_L,
                title:ar?'تطبيق المريض':'Patient App',
                sub:ar?'iOS + Android':'iOS + Android',
                desc:ar?'تطبيق بهوية عيادتك الكاملة — حجز مواعيد، سجل طبي، نتائج، Apple Wallet، واتساب آلي.':'Full-branded patient app with appointments, medical records, results, Apple Wallet, and automated WhatsApp.',
                items:ar?['بطاقة مريض رقمية','Apple Wallet','حجز مواعيد','سجل طبي كامل','نتائج مختبر']:['Digital patient card','Apple Wallet','Appointments','Full medical record','Lab results'],
              },
              {
                icon:'dashboard',color:'#6D28D9',iconBg:'rgba(109,40,217,0.08)',
                title:ar?'داشبورد الإدارة':'Management Dashboard',
                sub:ar?'ويب + جوال':'Web + Mobile',
                desc:ar?'لوحة تحكم كاملة لمالك العيادة — إيرادات، مواعيد، أطباء، تقارير مالية، ومراقبة لحظية.':'Complete clinic owner dashboard with revenue, appointments, doctors, financial reports, and live monitoring.',
                items:ar?['تقارير مالية يومية','إدارة الأطباء','جدول المواعيد','تنبيهات فورية','تصدير بيانات']:['Daily financial reports','Doctor management','Appointment schedule','Real-time alerts','Data export'],
              },
              {
                icon:'layers',color:'#059669',iconBg:'rgba(5,150,105,0.08)',
                title:ar?'نظام الاستقبال':'Reception System',
                sub:ar?'تسجيل دخول آلي':'Auto check-in',
                desc:ar?'نظام استقبال ذكي — QR كود، طابور انتظار رقمي، تسجيل دخول بدون أوراق.':'Smart reception system with QR code, digital waiting queue, and paperless check-in.',
                items:ar?['QR كود فوري','طابور رقمي','بدون أوراق','تنبيه الطبيب','إحصائيات يومية']:['Instant QR code','Digital queue','Paperless','Doctor notification','Daily stats'],
              },
            ].map((p,i)=>(
              <Reveal key={i} delay={i*0.1}>
                <Card className="h-full p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{background:p.iconBg}}>
                      <Ic n={p.icon} size={20} color={p.color}/>
                    </div>
                    <div>
                      <p className="text-[16px] font-black" style={{color:TEXT}}>{p.title}</p>
                      <p className="text-[11px] font-medium" style={{color:MUTED}}>{p.sub}</p>
                    </div>
                  </div>
                  <p className="text-[13px] leading-relaxed mb-5" style={{color:SUB}}>{p.desc}</p>
                  <div className="space-y-2">
                    {p.items.map(item=>(
                      <div key={item} className="flex items-center gap-2.5">
                        <CheckCircle size={13} color={p.color}/>
                        <span className="text-[12px] font-semibold" style={{color:TEXT}}>{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DEMO BANNER
      ══════════════════════════════════════════════ */}
      <section className="px-6 lg:px-12 py-8" style={{background:BG}}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5"
              style={{background:`linear-gradient(135deg,${BLUE},#004EA0)`,boxShadow:`0 12px 48px ${BLUE}35`}}>
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border" style={{background:'rgba(255,255,255,0.12)',borderColor:'rgba(255,255,255,0.18)'}}>
                  <motion.div className="w-3.5 h-3.5 rounded-full bg-white" animate={{scale:[1,1.3,1],opacity:[1,0.5,1]}} transition={{duration:1.8,repeat:Infinity}}/>
                </div>
                <div>
                  <p className="text-[17px] font-black">{ar?'جرّب الديمو الحي — الآن':'Try the live demo — now'}</p>
                  <p className="text-[12px] opacity-70">{ar?'تطبيق مريض كامل + داشبورد مالك · بدون تسجيل':'Full patient app + owner dashboard · no signup'}</p>
                </div>
              </div>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                className="shrink-0 font-black text-[14px] px-7 py-3.5 rounded-2xl text-blue-700 transition-all active:scale-95"
                style={{background:W,boxShadow:'0 4px 16px rgba(0,0,0,0.15)'}}>
                {ar?'افتح الديمو ←':'Open Demo →'}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════ */}
      <section id="process" className="py-20 px-6 lg:px-12" style={{background:W}}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <SLabel>{ar?'كيف نعمل':'How it works'}</SLabel>
            <h2 className="font-black" style={{fontSize:'clamp(28px,4.5vw,52px)',color:TEXT}}>
              {ar?<>من الفكرة للإطلاق<br/><span style={{color:MUTED}}>في ٦٠ يوم مضمونة.</span></>:<>From idea to launch<br/><span style={{color:MUTED}}>in 60 days, guaranteed.</span></>}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {num:'١',week:'أسبوع ١-٢',title:ar?'التصميم والتخصيص':'Design & Customization',desc:ar?'نصمّم هوية التطبيق والموقع بألوانك وشعارك — جولة مراجعة يومية معك حتى الموافقة.':'Design the app and website with your brand. Daily review rounds until your approval.',color:BLUE},
              {num:'٢',week:'أسبوع ٣-٦',title:ar?'البناء والتطوير':'Build & Development',desc:ar?'نبني التطبيق والموقع ونظام الإدارة. اختبار كامل على iOS وAndroid قبل التسليم.':'We build the app, website, and management system. Full testing on iOS and Android.',color:'#6D28D9'},
              {num:'٣',week:'أسبوع ٧-٨',title:ar?'الإطلاق والتدريب':'Launch & Training',desc:ar?'إطلاق على App Store وGoogle Play. تدريب الفريق الطبي والاستقبال. دعم مكثّف لمدة شهر.':'Launch on App Store and Google Play. Train your medical team and reception. One month intensive support.',color:'#059669'},
            ].map((s,i)=>(
              <Reveal key={i} delay={i*0.1}>
                <Card className="p-6 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-[16px] shrink-0" style={{background:s.color}}>{s.num}</div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{background:`${s.color}12`,color:s.color}}>{s.week}</span>
                  </div>
                  <p className="text-[15px] font-black mb-2" style={{color:TEXT}}>{s.title}</p>
                  <p className="text-[13px] leading-relaxed" style={{color:SUB}}>{s.desc}</p>
                  {i<2&&<div className="hidden md:block absolute top-10 -left-3 w-6 h-6 text-center" style={{color:DIM,fontSize:20}}>←</div>}
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════ */}
      <section id="المميزات" className="py-20 px-6 lg:px-12" style={{background:BG}}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <SLabel>{ar?'المميزات':'Features'}</SLabel>
            <h2 className="font-black" style={{fontSize:'clamp(28px,4.5vw,52px)',color:TEXT}}>
              {ar?<>+٢٠ ميزة.<br/><span style={{color:MUTED}}>من اليوم الأول.</span></>:<>20+ features.<br/><span style={{color:MUTED}}>From day one.</span></>}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              {icon:'calendar',title:ar?'حجز مواعيد ذكي':'Smart Booking',color:BLUE},
              {icon:'wallet',title:ar?'Apple Wallet':'Apple Wallet',color:'#1C1C1E'},
              {icon:'qr',title:ar?'QR كود للاستقبال':'QR Check-in',color:TEAL},
              {icon:'results',title:ar?'نتائج مختبر':'Lab Results',color:'#6D28D9'},
              {icon:'pill',title:ar?'تذكير أدوية':'Medication Reminders',color:'#059669'},
              {icon:'message',title:ar?'واتساب آلي':'Auto WhatsApp',color:'#25D366'},
              {icon:'barchart',title:ar?'تقارير مالية':'Financial Reports',color:'#D97706'},
              {icon:'shieldcheck',title:ar?'أمان HIPAA':'HIPAA Security',color:'#DC2626'},
              {icon:'applewatch',title:ar?'Apple Watch':'Apple Watch',color:'#1C1C1E'},
              {icon:'heart',title:ar?'Apple Health':'Apple Health',color:'#FF2D55'},
              {icon:'usercheck',title:ar?'ملف مريض رقمي':'Digital Patient File',color:BLUE},
              {icon:'globe',title:ar?'موقع SEO':'SEO Website',color:'#0284C7'},
              {icon:'zap',title:ar?'إشعارات فورية':'Push Notifications',color:'#D97706'},
              {icon:'cloud',title:ar?'نسخ احتياطي تلقائي':'Auto Backup',color:TEAL},
              {icon:'plug',title:ar?'تكامل HIS':'HIS Integration',color:'#6D28D9'},
              {icon:'trending',title:ar?'تحليلات متقدمة':'Advanced Analytics',color:'#059669'},
            ].map((f,i)=>(
              <Reveal key={i} delay={(i%4)*0.05}>
                <Card className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{background:`${f.color}12`}}>
                    <Ic n={f.icon} size={17} color={f.color}/>
                  </div>
                  <span className="text-[12px] font-bold" style={{color:TEXT}}>{f.title}</span>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECURITY
      ══════════════════════════════════════════════ */}
      <section id="الأمان" className="py-20 px-6 lg:px-12" style={{background:W}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <SLabel>{ar?'الأمان':'Security'}</SLabel>
              <h2 className="font-black mb-5" style={{fontSize:'clamp(26px,4vw,48px)',color:TEXT}}>
                {ar?<>بيانات مرضاك<br/><span style={{color:MUTED}}>محمية بالكامل.</span></>:<>Patient data<br/><span style={{color:MUTED}}>fully protected.</span></>}
              </h2>
              <p className="text-[15px] leading-relaxed mb-7" style={{color:SUB}}>
                {ar?'المنظومة تعمل على خوادم داخل المملكة، مشفرة AES-256، ومتوافقة مع PDPL وهيئة الحكومة الرقمية. بياناتك لا تخرج ولا نراها أبداً.'
                  :'Our system runs on KSA servers, AES-256 encrypted, and compliant with PDPL and Digital Government Authority. Your data never leaves and we never see it.'}
              </p>
              <div className="space-y-3">
                {[
                  {icon:'lock',title:ar?'تشفير AES-256':'AES-256 Encryption',desc:ar?'أعلى معايير التشفير العالمية':'Highest global encryption standards',color:BLUE},
                  {icon:'hdd',title:ar?'خوادم داخل المملكة':'KSA Servers',desc:ar?'بياناتك لا تغادر المملكة أبداً':'Your data never leaves KSA',color:'#059669'},
                  {icon:'filecheck',title:ar?'PDPL · HIPAA · ISO 27001':'PDPL · HIPAA · ISO 27001',desc:ar?'متوافق مع جميع اللوائح':'Compliant with all regulations',color:'#6D28D9'},
                  {icon:'eye',title:ar?'مراقبة ٢٤/٧':'24/7 Monitoring',desc:ar?'فحص أمني كل ساعتين':'Security scan every 2 hours',color:TEAL},
                ].map((s,i)=>(
                  <Reveal key={i} delay={i*0.07}>
                    <div className="flex items-center gap-4 p-4 rounded-2xl border" style={{borderColor:BORD,background:BG}}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{background:`${s.color}10`}}>
                        <Ic n={s.icon} size={18} color={s.color}/>
                      </div>
                      <div>
                        <p className="text-[13px] font-black" style={{color:TEXT}}>{s.title}</p>
                        <p className="text-[11px]" style={{color:MUTED}}>{s.desc}</p>
                      </div>
                      <CheckCircle size={16} color="#059669" className="mr-auto shrink-0"/>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="p-8 rounded-3xl" style={{background:`linear-gradient(135deg,${DARK},#0A2F5C)`,boxShadow:'0 20px 60px rgba(10,31,61,0.25)'}}>
                <p className="text-white font-black text-[18px] mb-2">{ar?'بياناتك ملكك وحدك.':'Your data belongs only to you.'}</p>
                <p className="text-white/40 text-[13px] mb-8">{ar?'لم يُسجَّل أي اختراق منذ التأسيس.':'Zero breaches recorded since founding.'}</p>
                <div className="grid grid-cols-3 gap-4">
                  {[['٠','اختراقات'],['١٠٠٪','تشفير'],['٢٤/٧','مراقبة']].map(([v,l])=>(
                    <div key={l} className="text-center">
                      <p className="text-[28px] font-black" style={{color:TEAL}}>{v}</p>
                      <p className="text-white/35 text-[10px]">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ROI CALCULATOR
      ══════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12" style={{background:BG}}>
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <SLabel>{ar?'احسب العائد':'ROI Calculator'}</SLabel>
            <h2 className="font-black" style={{fontSize:'clamp(26px,4vw,46px)',color:TEXT}}>
              {ar?'كم تخسر بدون تلقا؟':'How much are you losing without Talqa?'}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="p-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-7">
                {[
                  {label:ar?'عدد المرضى شهرياً':'Monthly patients',min:20,max:500,val:roiPatients,set:setRoiPatients},
                  {label:ar?'متوسط سعر الجلسة (ريال)':'Avg session price (SAR)',min:50,max:800,val:roiPrice,set:setRoiPrice},
                ].map(f=>(
                  <div key={f.label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-[13px] font-bold" style={{color:TEXT}}>{f.label}</span>
                      <span className="text-[15px] font-black" style={{color:BLUE}}>{f.val.toLocaleString('ar-SA')}</span>
                    </div>
                    <input type="range" min={f.min} max={f.max} value={f.val} onChange={e=>f.set(+e.target.value)}
                      className="w-full h-1.5 rounded-full outline-none cursor-pointer"
                      style={{accentColor:BLUE,background:`linear-gradient(90deg,${BLUE} ${((f.val-f.min)/(f.max-f.min))*100}%,${BORD} 0%)`}}/>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {label:ar?'إيراداتك الشهرية':'Monthly revenue',value:`${roiMonthly.toLocaleString('ar-SA')} ر.س`,color:TEXT},
                  {label:ar?'مرضى تفقدهم بدون نظام':'Patients lost without system',value:roiLost.toLocaleString('ar-SA'),color:'#DC2626'},
                  {label:ar?'إيراد إضافي محتمل سنوياً':'Potential extra revenue/year',value:`${roiExtra.toLocaleString('ar-SA')} ر.س`,color:'#059669'},
                ].map(s=>(
                  <div key={s.label} className="p-4 rounded-2xl text-center border" style={{borderColor:BORD,background:BG}}>
                    <p className="text-[22px] font-black mb-1" style={{color:s.color}}>{s.value}</p>
                    <p className="text-[11px]" style={{color:MUTED}}>{s.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CLIENTS
      ══════════════════════════════════════════════ */}
      <section className="py-12 px-6 lg:px-12 border-y" style={{borderColor:BORD,background:W}}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase mb-5" style={{color:DIM}}>
            {ar?'يثقون بتلقا للعيادات':'Trusted by leading clinics'}
          </p>
          <div className="overflow-hidden">
            <motion.div className="flex gap-6 w-max items-center" animate={{x:['0%','-50%']}} transition={{duration:26,ease:'linear',repeat:Infinity}}>
              {[...Array(2)].flatMap(()=>['مجمع الدكتور سليمان الحبيب','عيادات الشفاء الطبية','مستشفى الحمادي','مجمع النور الطبي','عيادات دار الشفاء','مجمع الرعاية الصحية','عيادات رؤيا الطبية','مستشفى الموسى التخصصي','مجمع الصحة المتكاملة','عيادات المدينة الطبية']).map((name,i)=>(
                <div key={i} className="flex items-center gap-2.5 shrink-0 px-5 py-2.5 rounded-xl border" style={{borderColor:BORD,background:BG}}>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[11px] font-black shrink-0" style={{background:`linear-gradient(135deg,${BLUE},#004EA0)`}}>{name[0]}</div>
                  <span className="text-[12px] font-semibold whitespace-nowrap" style={{color:MUTED}}>{name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12" style={{background:BG}}>
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <SLabel>{ar?'التسعير':'Pricing'}</SLabel>
            <h2 className="font-black" style={{fontSize:'clamp(26px,4vw,48px)',color:TEXT}}>
              {ar?<>السعر يتحدد<br/><span style={{color:MUTED}}>حسب عيادتك.</span></>:<>Pricing is<br/><span style={{color:MUTED}}>tailored to you.</span></>}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl overflow-hidden" style={{boxShadow:'0 24px 80px rgba(10,31,61,0.18)'}}>
              {/* top dark section */}
              <div className="p-8 text-center" style={{background:`linear-gradient(145deg,${DARK},#0A2F5C)`}}>
                <p className="text-[11px] font-black uppercase mb-3" style={{color:TEAL}}>{ar?'سعر إطلاق خاص':'Special launch pricing'}</p>
                <p className="text-white font-black mb-1" style={{fontSize:'clamp(48px,8vw,80px)',lineHeight:1}}>٩٬٢٠٠</p>
                <p className="text-[18px] font-light mb-1" style={{color:TEAL}}>{ar?'ريال سعودي':'Saudi Riyal'}</p>
                <p className="text-white/30 text-[12px]">{ar?'iOS + Android · موقع · AI Doctor · تليميديسن · دعم كامل':'iOS + Android · Website · AI Doctor · Telemedicine · Full support'}</p>
              </div>
              {/* payment options */}
              <div className="p-6 border-b" style={{background:W,borderColor:BORD}}>
                <p className="text-[11px] font-black mb-4" style={{color:MUTED}}>{ar?'اختر طريقة الدفع':'Choose payment method'}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {title:ar?'كامل مقدماً':'Full upfront',amount:'٩٬٢٠٠',sub:ar?'قبل بدء المشروع':'before start',badge:ar?'أسرع تسليم':'Fastest',bc:'#059669',highlight:false},
                    {title:ar?'نصف ونصف':'50 / 50',amount:'٤٬٦٠٠+٤٬٦٠٠',sub:ar?'الآن · عند التسليم':'now · on delivery',badge:ar?'الأكثر طلباً':'Most popular',bc:BLUE,highlight:true},
                    {title:ar?'تقسيط':'Installments',amount:'٤٬٦٠٠ ثم ٧٦٧×٦',sub:ar?'الآن · ٦ أشهر':'now · 6 months',badge:ar?'تابي · تمارا':'Tabby · Tamara',bc:'#6D28D9',highlight:false},
                  ].map((opt,i)=>(
                    <div key={i} className="rounded-2xl p-4 border transition-all" style={{background:opt.highlight?BLUE_L:BG,border:`${opt.highlight?2:1}px solid ${opt.highlight?`${BLUE}50`:BORD}`}}>
                      <p className="font-black text-[14px] mb-1" style={{color:TEXT}}>{opt.title}</p>
                      <p className="font-black text-[12px] mb-2" style={{color:opt.highlight?BLUE:SUB}}>{opt.amount} {ar?'ر.س':''}</p>
                      <p className="text-[10px] mb-2.5" style={{color:MUTED}}>{opt.sub}</p>
                      {i===2?(
                        <div className="flex items-center gap-1.5">
                          <img src="/tabby.webp" alt="Tabby" className="h-5 object-contain rounded" style={{background:'#3DFFA0',padding:'1px 4px',borderRadius:5}}/>
                          <img src="/tamara.jpeg" alt="تمارا" className="h-5 object-contain rounded"/>
                        </div>
                      ):(
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{background:`${opt.bc}12`,color:opt.bc,border:`1px solid ${opt.bc}30`}}>{opt.badge}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* inclusions */}
              <div className="p-6" style={{background:W}}>
                <p className="text-[11px] font-black mb-4" style={{color:MUTED}}>{ar?'ما يشمله العرض — بالتفصيل':'What\'s included — in detail'}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {(ar?['تطبيق iOS وAndroid بهويتك','موقع ويب احترافي محسّن SEO','نظام إدارة عيادة كامل','AI Doctor مدمج','تيلي-ميديسن','Apple Wallet + Google Wallet','Apple Health + Watch','سنة دعم وصيانة']:
                    ['iOS & Android app in your brand','SEO-optimized professional website','Complete clinic management system','Built-in AI Doctor','Telemedicine','Apple Wallet + Google Wallet','Apple Health + Watch','1 year support & maintenance']).map(item=>(
                    <div key={item} className="flex items-center gap-2 text-[12px]" style={{color:SUB}}>
                      <CheckCircle size={13} color={BLUE}/>{item}
                    </div>
                  ))}
                </div>
                <a href="https://wa.me/966551378531" target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center font-black text-[15px] py-4 rounded-2xl text-white transition-all active:scale-95"
                  style={{background:`linear-gradient(135deg,${BLUE},#004EA0)`,boxShadow:`0 6px 24px ${BLUE}40`}}>
                  {ar?'ابدأ مشروع عيادتك مع تلقا ←':'Start your clinic project →'}
                </a>
                <p className="text-center text-[11px] mt-3" style={{color:DIM}}>{ar?'استشارة مجانية · بدون التزام · نرد خلال ٢٤ ساعة':'Free consultation · No commitment · 24h response'}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT FORM
      ══════════════════════════════════════════════ */}
      <section id="تواصل" className="py-20 px-6 lg:px-12" style={{background:W}}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <SLabel>{ar?'تواصل معنا':'Contact us'}</SLabel>
            <h2 className="font-black mb-4" style={{fontSize:'clamp(26px,4vw,46px)',color:TEXT}}>
              {ar?'ابدأ مشروعك اليوم.':'Start your project today.'}
            </h2>
            <p className="text-[15px] leading-relaxed mb-7" style={{color:SUB}}>
              {ar?'أرسل بياناتك ونتواصل معك خلال ٢٤ ساعة بعرض مخصص لعيادتك.':'Send your details and we\'ll reach out within 24 hours with a custom offer.'}
            </p>
            <div className="space-y-4">
              {[
                {icon:'phone',text:'0551378531',label:ar?'واتساب':'WhatsApp'},
                {icon:'mail',text:'info@talqatech.com',label:ar?'إيميل':'Email'},
                {icon:'shield',text:ar?'مؤسسة تلقا — سجل تجاري: 7054835322':'Talqa Est. — CR: 7054835322',label:ar?'السجل التجاري':'Commercial Reg.'},
              ].map((c,i)=>(
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl border" style={{borderColor:BORD,background:BG}}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{background:BLUE_L}}>
                    {c.icon==='phone'?<Phone size={16} color={BLUE}/>:c.icon==='mail'?<Mail size={16} color={BLUE}/>:<Shield size={16} color={BLUE}/>}
                  </div>
                  <div>
                    <p className="text-[10px]" style={{color:MUTED}}>{c.label}</p>
                    <p className="text-[13px] font-bold" style={{color:TEXT}}>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="p-7">
              <p className="text-[17px] font-black mb-5" style={{color:TEXT}}>{ar?'احجز استشارتك المجانية':'Book your free consultation'}</p>
              <div className="space-y-3.5 mb-5">
                {[
                  {placeholder:ar?'اسمك الكريم':'Your name',value:formName,set:setFormName},
                  {placeholder:ar?'اسم العيادة أو المركز الطبي':'Clinic / medical center name',value:formClinic,set:setFormClinic},
                  {placeholder:ar?'رقم الجوال (واتساب)':'Mobile number (WhatsApp)',value:formPhone,set:setFormPhone},
                ].map(f=>(
                  <input key={f.placeholder} type="text" placeholder={f.placeholder} value={f.value} onChange={e=>f.set(e.target.value)}
                    dir={ar?'rtl':'ltr'} className="w-full py-3.5 px-4 rounded-2xl text-[14px] font-medium outline-none transition-all border"
                    style={{background:BG,borderColor:BORD,color:TEXT,fontFamily:"'Tajawal',sans-serif"}}
                    onFocus={e=>{e.currentTarget.style.borderColor=BLUE;e.currentTarget.style.boxShadow=`0 0 0 3px ${BLUE}18`;}}
                    onBlur={e=>{e.currentTarget.style.borderColor=BORD;e.currentTarget.style.boxShadow='none';}}/>
                ))}
              </div>
              <motion.button whileHover={{scale:formName&&formPhone?1.01:1}} whileTap={{scale:formName&&formPhone?0.97:1}}
                onClick={handleFormSubmit}
                className="w-full py-4 rounded-2xl font-black text-[15px] transition-all"
                style={{
                  background:formSent==='done'?'rgba(5,150,105,0.1)':formName&&formPhone?`linear-gradient(135deg,${BLUE},#004EA0)`:'#F1F5F9',
                  boxShadow:formName&&formPhone&&formSent!=='done'?`0 6px 24px ${BLUE}40`:'none',
                  color:formSent==='done'?'#059669':formName&&formPhone?W:DIM,
                  cursor:formName&&formPhone?'pointer':'default',
                }}>
                {formSent==='done'?(ar?'تم الإرسال — سنتواصل معك قريباً ✓':'Sent — we\'ll be in touch ✓')
                  :formSent==='sending'?(ar?'جاري الإرسال...':'Sending...')
                  :(ar?'أرسل طلبك — وسنتواصل خلال ٢٤ ساعة':'Send request — reply in 24 hours')}
              </motion.button>
              <p className="text-[11px] text-center mt-3" style={{color:DIM}}>
                {ar?'استشارة مجانية · بدون أي التزام':'Free consultation · No commitment'}
              </p>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12" style={{background:BG}}>
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-10">
            <SLabel>{ar?'أسئلة شائعة':'FAQ'}</SLabel>
            <h2 className="font-black" style={{fontSize:'clamp(24px,3.5vw,42px)',color:TEXT}}>
              {ar?'كل ما يدور في بالك':'Everything you want to know'}
            </h2>
          </Reveal>
          <div className="space-y-2.5">
            {[
              {q:ar?'كم يستغرق التسليم الكامل؟':'How long does delivery take?',a:ar?'٦٠ يوم من توقيع العقد — تطبيق iOS وAndroid + موقع + نظام إدارة + تدريب الفريق. مع ضمان تشغيل فعلي قبل الإطلاق.':'60 days from signing — iOS and Android app + website + management system + team training. With guaranteed functionality before launch.'},
              {q:ar?'هل يعمل مع نظام HIS الحالي؟':'Does it work with our current HIS?',a:ar?'نعم — عندنا تكامل مع أشهر أنظمة HIS وLIS في السوق السعودي. نرسل لك تقرير التوافق قبل التعاقد.':'Yes — we integrate with the most popular HIS and LIS systems in the Saudi market. We send you a compatibility report before signing.'},
              {q:ar?'وش يصير لو احتجنا تعديل بعد التسليم؟':'What if we need changes after delivery?',a:ar?'سنة دعم وصيانة مجانية تشمل التعديلات والتحديثات. بعدها باقات دعم بأسعار تفضيلية.':'One year of free support and maintenance including changes and updates. Then preferential support packages.'},
              {q:ar?'هل بيانات مرضانا محفوظة وآمنة؟':'Is our patient data safe?',a:ar?'المنظومة تعمل على خوادم داخل المملكة، مشفرة AES-256، ومتوافقة مع نظام PDPL وهيئة الحكومة الرقمية.':'The system runs on KSA servers, AES-256 encrypted, and compliant with PDPL and the Digital Government Authority.'},
              {q:ar?'وش السعر النهائي؟':'What\'s the final price?',a:ar?'السعر يعتمد على حجم العيادة وعدد الأطباء والخصائص المطلوبة. تواصل معنا للحصول على عرض مفصّل ومجاني خلال ٢٤ ساعة.':'The price depends on clinic size, number of doctors, and required features. Contact us for a detailed free quote within 24 hours.'},
            ].map((item,i)=>(
              <Reveal key={i} delay={i*0.05}>
                <Card className="overflow-hidden" hover={false}>
                  <button onClick={()=>setFaqOpen(faqOpen===i?null:i)} className="w-full p-5 flex items-center justify-between gap-3 text-right">
                    <span className="text-[14px] font-bold" style={{color:TEXT}}>{item.q}</span>
                    <motion.span animate={{rotate:faqOpen===i?45:0}} transition={{duration:0.2}}
                      className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-black text-[16px]"
                      style={{background:faqOpen===i?BLUE_L:BG,color:faqOpen===i?BLUE:MUTED}}>+</motion.span>
                  </button>
                  <AnimatePresence>
                    {faqOpen===i&&(
                      <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25}}>
                        <div className="px-5 pb-5 border-t" style={{borderColor:BORD}}>
                          <p className="text-[13px] leading-relaxed pt-4" style={{color:SUB}}>{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12" style={{background:W}}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="rounded-3xl p-10 text-center relative overflow-hidden"
              style={{background:`linear-gradient(145deg,${DARK},#0A2F5C)`,boxShadow:'0 24px 80px rgba(10,31,61,0.25)'}}>
              <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at 50% 0%,rgba(0,164,200,0.12) 0%,transparent 60%)'}}/>
              <div className="relative">
                <p className="text-[11px] font-black uppercase mb-3" style={{color:TEAL}}>{ar?'ابدأ اليوم':'Start today'}</p>
                <h2 className="text-white font-black mb-3" style={{fontSize:'clamp(26px,4vw,46px)',lineHeight:1.15}}>
                  {ar?'عيادتك تستحق أفضل تجربة رقمية.':'Your clinic deserves the best digital experience.'}
                </h2>
                <p className="text-white/40 text-[13px] mb-8">{ar?'استشارة مجانية · ردّ خلال ٢٤ ساعة · أو نجيك للعيادة':'Free consultation · Reply in 24h · Or we visit your clinic'}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="https://wa.me/966551378531" target="_blank" rel="noopener noreferrer"
                    className="font-black text-[15px] px-8 py-4 rounded-2xl transition-all active:scale-95"
                    style={{background:`linear-gradient(135deg,${TEAL},#0088A8)`,color:W,boxShadow:`0 6px 24px ${TEAL}50`}}>
                    {ar?'ابدأ مشروع عيادتك الآن ←':'Start your clinic project →'}
                  </a>
                  <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                    className="font-bold text-[15px] px-8 py-4 rounded-2xl border transition-all"
                    style={{borderColor:'rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.8)'}}>
                    {ar?'شاهد الديمو':'View Demo'}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer className="py-10 px-6 lg:px-12 border-t" style={{borderColor:BORD,background:BG}}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <TalqaShield size={38}/>
              <div>
                <p className="font-black text-[15px]" style={{color:TEXT}}>تلقا<span style={{color:BLUE}}> للعيادات</span></p>
                <p className="text-[9px]" style={{color:MUTED}}>متخصصون في القطاع الطبي</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5">
              {[['المنظومة','#المنظومة'],['كيف نعمل','#process'],['المميزات','#المميزات'],['الأمان','#الأمان'],['تواصل','#تواصل'],['الديمو','/clinic-demo/']].map(([l,h])=>(
                <a key={l} href={h} target={h.startsWith('/')?'_blank':undefined}
                  className="text-[12px] font-semibold transition-colors" style={{color:MUTED}}
                  onMouseEnter={e=>(e.currentTarget.style.color=BLUE)} onMouseLeave={e=>(e.currentTarget.style.color=MUTED)}>{l}</a>
              ))}
            </div>
            <a href="https://wa.me/966551378531" target="_blank" rel="noopener noreferrer"
              className="font-bold text-[13px] px-5 py-2.5 rounded-xl border transition-all" style={{borderColor:BORD,color:BLUE,background:BLUE_L}}>
              واتساب ←
            </a>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t" style={{borderColor:BORD}}>
            <div className="flex flex-col gap-1 text-center sm:text-right">
              <p className="text-[11px]" style={{color:DIM}}>متخصصون في المنظومات الرقمية للقطاع الطبي · ٢٠٢٦</p>
              <p className="text-[10px]" style={{color:DIM}}>مؤسسة تلقا · السجل التجاري: 7054835322 · تاريخ الإصدار: 21/07/2026 · الحالة: نشط</p>
            </div>
            <div className="flex gap-3">
              {['HIPAA','ISO 27001','PDPL'].map(b=>(
                <span key={b} className="text-[10px] font-bold px-2.5 py-1 rounded-lg" style={{background:BLUE_L,color:BLUE}}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
