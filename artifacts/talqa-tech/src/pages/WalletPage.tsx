import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from './PageLayout';
import WalletShowcase from '../components/WalletShowcase';

const WA = 'https://wa.me/966551378531?text=أبي%20Digital%20Wallet%20لمشروعي';

const CARD_TYPES = [
  { icon:'☕', name:'ولاء الكافيهات',  color:'#D97706', bg:'linear-gradient(135deg,#1a1000,#2d1a00)', example:'نقاط يجمعها العميل ويستبدلها', badge:'الأكثر طلباً' },
  { icon:'🏥', name:'مواعيد العيادات', color:'#059669', bg:'linear-gradient(135deg,#001a0e,#002d18)', example:'بطاقة موعد طبي بـ QR code' },
  { icon:'🏨', name:'تسجيل الفنادق',  color:'#8B5CF6', bg:'linear-gradient(135deg,#0d0019,#1a0033)', example:'Check-in من الجوال مباشرةً' },
  { icon:'✈️', name:'بطاقات الطيران', color:'#0EA5E9', bg:'linear-gradient(135deg,#00101a,#001f2e)', example:'Boarding Pass رقمي متكامل' },
  { icon:'🎫', name:'تذاكر الفعاليات',color:'#EC4899', bg:'linear-gradient(135deg,#1a0010,#2d001c)', example:'QR للدخول مع تحقق لحظي' },
  { icon:'🏋️', name:'عضوية النوادي', color:'#F59E0B', bg:'linear-gradient(135deg,#1a1000,#2d1e00)', example:'باركود الاشتراك + رصيد الجلسات' },
  { icon:'🛍️', name:'بطاقات الخصم',  color:'#10B981', bg:'linear-gradient(135deg,#001a0e,#002818)', example:'رمز خصم دائم جاهز للمسح' },
  { icon:'🎓', name:'هويات الطلاب',  color:'#6366F1', bg:'linear-gradient(135deg,#06001a,#0f0033)', example:'ID رقمي للمقرات والتحقق' },
];

const STEPS = [
  { n:'01', icon:'🎨', title:'نصمم البطاقة',       desc:'تصميم واحد يعمل على Apple Wallet وGoogle Wallet — بهويتك وألوانك وشعارك.' },
  { n:'02', icon:'🔐', title:'نوقّعها رسمياً',     desc:'نتولى التوقيع مع Apple Developer وGoogle Pay API بالنيابة عنك — بدون تعقيدات.' },
  { n:'03', icon:'📲', title:'ترسلها لعملائك',     desc:'رابط أو QR — iPhone يفتح Apple Wallet، Android يفتح Google Wallet، تلقائياً.' },
  { n:'04', icon:'🔄', title:'تحديث لحظي للجميع', desc:'تبدّل الرصيد أو المعلومات من لوحتك — تتحدث البطاقة على كلا المنصتين فوراً.' },
];

const STATS = [
  { n:'١٠٠٪', label:'تغطية iPhone وAndroid معاً' },
  { n:'٣×',   label:'معدل تذكر العلامة التجارية' },
  { n:'صفر',  label:'تطبيق يحتاج للتحميل' },
  { n:'+٤٢٪', label:'عودة العملاء بعد الإضافة' },
];

const TESTIMONIALS = [
  { name:'كافيهك', result:'↑٤٢٪ عودة العملاء', text:'قبل الـ Digital Wallet كنا نرسل رسائل SMS ما أحد يفتحها. بعده صار العميل — iPhone وAndroid — يشوف نقاطه ويجي وحده.', color:'#D97706' },
  { name:'عيادة الأمل', result:'↓٩٠٪ نسبة الغياب', text:'البطاقة تذكّر المريض بموعده تلقائياً — قلّت الغيابات من ٣٠٪ إلى ٣٪ في شهر واحد.', color:'#059669' },
  { name:'نادٍ رياضي', result:'↑٨٠٪ تجديد الاشتراك', text:'الاشتراك ينتهي والإشعار يوصل بدون ما أسوي شيء — معدل التجديد ضاعف تقريباً.', color:'#F59E0B' },
];

// Apple Wallet SVG icon
function AppleIcon({ size=12, opacity=0.32 }: { size?:number; opacity?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={`rgba(255,255,255,${opacity})`}>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.39c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.39-1.32 2.76-2.54 4zm-3.1-17.26c-2.98.27-5.19 3.15-4.71 5.84 2.74.2 5.22-2.74 4.71-5.84z"/>
    </svg>
  );
}

// Google Wallet "G" icon
function GoogleIcon({ size=12, opacity=0.32 }: { size?:number; opacity?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill={`rgba(66,133,244,${opacity*2})`}/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill={`rgba(52,168,83,${opacity*2})`}/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill={`rgba(251,188,5,${opacity*2})`}/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill={`rgba(234,67,53,${opacity*2})`}/>
    </svg>
  );
}

// Shared shimmer + dual platform badge
function CardShell({ color, bg, children, wide=false, platform='apple' }:
  { color:string; bg:string; children:React.ReactNode; wide?:boolean; platform?:'apple'|'google' }) {
  return (
    <motion.div whileHover={{ rotateY:6, rotateX:-3, scale:1.03 }}
      transition={{ type:'spring', stiffness:300, damping:20 }}
      style={{ width: wide ? 380 : 340, height: wide ? 176 : 216, borderRadius:22, position:'relative', overflow:'hidden',
        background:bg, border:`1.5px solid ${color}35`, cursor:'default',
        boxShadow:`0 28px 70px ${color}35, 0 8px 24px rgba(0,0,0,0.6)`,
        transformStyle:'preserve-3d', transformOrigin:'center', flexShrink:0 }}>
      {/* Shimmer */}
      <motion.div animate={{ x:['-80%','180%'] }} transition={{ duration:4.5, repeat:Infinity, ease:'linear', repeatDelay:2.5 }}
        style={{ position:'absolute', inset:0, zIndex:10, pointerEvents:'none',
          background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.13) 50%,transparent 70%)' }}/>
      {/* Platform badge */}
      <div style={{ position:'absolute', top:11, left:14, zIndex:11, display:'flex', alignItems:'center', gap:5 }}>
        {platform === 'apple' ? (
          <>
            <AppleIcon size={12} opacity={0.32}/>
            <span style={{ fontSize:8.5, color:'rgba(255,255,255,0.35)', fontWeight:600, letterSpacing:0.5 }}>Apple Wallet</span>
          </>
        ) : (
          <>
            <GoogleIcon size={12} opacity={0.5}/>
            <span style={{ fontSize:8.5, color:'rgba(255,255,255,0.35)', fontWeight:600, letterSpacing:0.5 }}>Google Wallet</span>
          </>
        )}
      </div>
      {children}
    </motion.div>
  );
}

// QR code SVG
function QR({ size=44, fill='rgba(255,255,255,0.75)' }: { size?:number; fill?:string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10">
      {([[0,0,3,3],[0,7,3,3],[7,0,3,3],[1,1,1,1],[1,8,1,1],[8,1,1,1],[4,4,1,1],[6,4,1,1],[4,6,1,1],[6,6,1,1],[5,2,1,1],[2,5,1,1],[8,3,1,1],[3,8,1,1],[5,5,2,1],[7,7,2,2]] as number[][]).map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={fill}/>
      ))}
    </svg>
  );
}

// Barcode SVG
function Barcode({ color='rgba(255,255,255,0.7)' }: { color?:string }) {
  const bars = [3,1,2,1,3,2,1,1,2,3,1,2,1,1,3,1,2,2,1,3,1,1,2,1];
  let x = 0;
  return (
    <svg width="120" height="36" viewBox={`0 0 ${bars.reduce((a,b)=>a+b+1,0)} 36`}>
      {bars.map((w,i) => {
        const el = <rect key={i} x={x} y={0} width={w} height={36} fill={i%2===0 ? color : 'transparent'}/>;
        x += w + 1;
        return el;
      })}
    </svg>
  );
}

// ── 1. LOYALTY (كافيهات وعضوية) ──────────────────────────────────────
function LoyaltyCard({ color, bg, icon, name, platform='apple' }: { color:string; bg:string; icon:string; name:string; platform?:'apple'|'google' }) {
  const stamps = [1,2,3,4,5,6,7,8,9,10];
  return (
    <CardShell color={color} bg={bg} platform={platform}>
      <div style={{ position:'absolute', inset:0, padding:'14px 18px', display:'flex', flexDirection:'column', zIndex:2 }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14 }}>
          <div>
            <div style={{ fontSize:10, color:`${color}bb`, fontWeight:700, letterSpacing:1.2, textTransform:'uppercase' }}>Loyalty Card</div>
            <div style={{ fontSize:15, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif', marginTop:2 }}>{name}</div>
          </div>
          <div style={{ fontSize:28 }}>{icon}</div>
        </div>
        {/* Stamp row */}
        <div style={{ marginTop:12 }}>
          <div style={{ fontSize:8.5, color:'rgba(255,255,255,0.35)', marginBottom:7, fontWeight:600 }}>اجمع ١٠ طوابع ← قهوة مجانية</div>
          <div style={{ display:'flex', gap:6 }}>
            {stamps.map(n => (
              <div key={n} style={{ width:22, height:22, borderRadius:'50%',
                background: n<=7 ? `${color}` : 'rgba(255,255,255,0.1)',
                border: `1.5px solid ${n<=7?color:'rgba(255,255,255,0.2)'}`,
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:10 }}>
                {n<=7 ? '✓' : ''}
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div style={{ flex:1 }}/>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <div style={{ fontSize:8, color:'rgba(255,255,255,0.35)', marginBottom:2 }}>النقاط</div>
            <div style={{ fontSize:26, fontWeight:900, color, letterSpacing:-1, lineHeight:1 }}>٢٤٧ <span style={{ fontSize:11, color:'rgba(255,255,255,0.4)', fontWeight:500 }}>pts</span></div>
          </div>
          <QR size={40} fill={`${color}cc`} />
        </div>
      </div>
    </CardShell>
  );
}

// ── 2. APPOINTMENT (عيادات) ──────────────────────────────────────────
function AppointmentCard({ color, bg, platform='apple' }: { color:string; bg:string; platform?:'apple'|'google' }) {
  return (
    <CardShell color={color} bg={bg} platform={platform}>
      <div style={{ position:'absolute', inset:0, padding:'14px 18px', display:'flex', flexDirection:'column', zIndex:2 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginTop:14 }}>
          <div>
            <div style={{ fontSize:10, color:`${color}bb`, fontWeight:700, letterSpacing:1.2, textTransform:'uppercase' }}>Appointment</div>
            <div style={{ fontSize:14, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif', marginTop:2 }}>عيادة الأمل</div>
          </div>
          <div style={{ fontSize:26 }}>🏥</div>
        </div>
        {/* Divider */}
        <div style={{ height:1, background:`${color}30`, margin:'10px 0' }}/>
        {/* Date / Doctor */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:8 }}>
          {[['التاريخ','الأحد ٢٣ يوليو'],['الوقت','٩:٣٠ ص'],['الطبيب','د. أحمد']].map(([lbl,val])=>(
            <div key={lbl}>
              <div style={{ fontSize:7.5, color:'rgba(255,255,255,0.35)', fontWeight:600, marginBottom:3 }}>{lbl}</div>
              <div style={{ fontSize:11, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{val}</div>
            </div>
          ))}
        </div>
        {/* Barcode */}
        <div style={{ flex:1 }}/>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
          <Barcode color={`${color}99`}/>
          <div style={{ fontSize:7.5, color:'rgba(255,255,255,0.25)', letterSpacing:2 }}>CLN-20240723-091</div>
        </div>
      </div>
    </CardShell>
  );
}

// ── 3. HOTEL KEY (فنادق) ─────────────────────────────────────────────
function HotelCard({ color, bg, platform='apple' }: { color:string; bg:string; platform?:'apple'|'google' }) {
  return (
    <CardShell color={color} bg={bg} platform={platform}>
      {/* Room number watermark */}
      <div style={{ position:'absolute', left:-10, top:-10, fontSize:120, fontWeight:900, color:`${color}08`,
        lineHeight:1, userSelect:'none', fontFamily:'monospace' }}>٤٠٢</div>
      <div style={{ position:'absolute', inset:0, padding:'14px 18px', display:'flex', flexDirection:'column', zIndex:2 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginTop:14 }}>
          <div>
            <div style={{ fontSize:10, color:`${color}bb`, fontWeight:700, letterSpacing:1.2, textTransform:'uppercase' }}>Hotel Key</div>
            <div style={{ fontSize:14, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif', marginTop:2 }}>فندق النخيل</div>
          </div>
          <div style={{ fontSize:26 }}>🏨</div>
        </div>
        <div style={{ height:1, background:`${color}30`, margin:'10px 0' }}/>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:6 }}>
          {[['الغرفة','٤٠٢ — دولاكس'],['الطابق','الرابع'],['Check-in','٢٣ يوليو'],['Check-out','٢٦ يوليو']].map(([lbl,val])=>(
            <div key={lbl}>
              <div style={{ fontSize:7.5, color:'rgba(255,255,255,0.35)', fontWeight:600, marginBottom:3 }}>{lbl}</div>
              <div style={{ fontSize:11, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ flex:1 }}/>
        {/* NFC chip */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:8.5, color:`${color}99`, fontWeight:700 }}>NFC · قرّب للباب</div>
          <div style={{ width:36, height:28, borderRadius:6, border:`1.5px solid ${color}50`,
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:20, height:14, borderRadius:3, border:`1.5px solid ${color}80`,
              position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', left:4, top:0, bottom:0, width:12, borderRadius:'50%',
                border:`1.5px solid ${color}90` }}/>
            </div>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

// ── 4. BOARDING PASS (طيران) ─────────────────────────────────────────
function BoardingPassCard({ color, bg, platform='apple' }: { color:string; bg:string; platform?:'apple'|'google' }) {
  return (
    <CardShell color={color} bg={bg} wide platform={platform}>
      <div style={{ position:'absolute', inset:0, padding:'12px 18px', display:'flex', flexDirection:'column', zIndex:2 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12 }}>
          <div style={{ fontSize:10, color:`${color}bb`, fontWeight:700, letterSpacing:1.2, textTransform:'uppercase' }}>Boarding Pass</div>
          <div style={{ fontSize:20 }}>✈️</div>
        </div>
        {/* Route */}
        <div style={{ display:'flex', alignItems:'center', gap:10, margin:'8px 0' }}>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:26, fontWeight:900, color:'#fff', letterSpacing:-1, lineHeight:1 }}>RUH</div>
            <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)' }}>الرياض</div>
          </div>
          <div style={{ flex:1, display:'flex', alignItems:'center', gap:4 }}>
            <div style={{ flex:1, height:1, background:`${color}40` }}/>
            <div style={{ fontSize:14, color:color }}>✈</div>
            <div style={{ flex:1, height:1, background:`${color}40` }}/>
          </div>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:26, fontWeight:900, color:'#fff', letterSpacing:-1, lineHeight:1 }}>DXB</div>
            <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)' }}>دبي</div>
          </div>
        </div>
        {/* Details */}
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          {[['الرحلة','SV٤٢١'],['البوابة','B٧'],['المقعد','٢٢A'],['الإقلاع','٠٩:٣٠']].map(([lbl,val])=>(
            <div key={lbl} style={{ textAlign:'center' }}>
              <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', fontWeight:600 }}>{lbl}</div>
              <div style={{ fontSize:11, fontWeight:800, color:'#fff', fontFamily:'monospace' }}>{val}</div>
            </div>
          ))}
        </div>
        {/* Tear line + barcode */}
        <div style={{ borderTop:`1px dashed ${color}40`, paddingTop:7, display:'flex', justifyContent:'center' }}>
          <Barcode color={`${color}88`}/>
        </div>
      </div>
    </CardShell>
  );
}

// ── 5. EVENT TICKET (فعاليات) ────────────────────────────────────────
function EventTicketCard({ color, bg, platform='apple' }: { color:string; bg:string; platform?:'apple'|'google' }) {
  return (
    <CardShell color={color} bg={bg} platform={platform}>
      {/* Colored stripe top */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:56, background:`${color}25`, zIndex:1 }}/>
      <div style={{ position:'absolute', inset:0, padding:'14px 18px', display:'flex', flexDirection:'column', zIndex:2 }}>
        {/* Event title in stripe */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginTop:14 }}>
          <div>
            <div style={{ fontSize:10, color:`${color}cc`, fontWeight:700, letterSpacing:1.2, textTransform:'uppercase' }}>Event Ticket</div>
            <div style={{ fontSize:14, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif', marginTop:1 }}>ليلة الفن والموسيقى</div>
          </div>
          <div style={{ fontSize:26 }}>🎫</div>
        </div>
        <div style={{ height:1, background:`${color}30`, margin:'9px 0 8px' }}/>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {[['التاريخ','٢٨ يوليو ٢٠٢٤'],['الوقت','٨:٠٠ م'],['المكان','قاعة الملك فهد'],['المقعد','قطاع B · ١٤']].map(([lbl,val])=>(
            <div key={lbl}>
              <div style={{ fontSize:7.5, color:'rgba(255,255,255,0.35)', fontWeight:600, marginBottom:2 }}>{lbl}</div>
              <div style={{ fontSize:10.5, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ flex:1 }}/>
        <div style={{ borderTop:`1px dashed ${color}40`, paddingTop:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:8.5, color:`${color}99` }}>اعرض للدخول</div>
          <QR size={38} fill={`${color}bb`}/>
        </div>
      </div>
    </CardShell>
  );
}

// ── 6. GYM MEMBERSHIP (نوادي رياضية) ────────────────────────────────
function GymCard({ color, bg, platform='apple' }: { color:string; bg:string; platform?:'apple'|'google' }) {
  return (
    <CardShell color={color} bg={bg} platform={platform}>
      <div style={{ position:'absolute', inset:0, padding:'14px 18px', display:'flex', flexDirection:'column', zIndex:2 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginTop:14 }}>
          <div>
            <div style={{ fontSize:10, color:`${color}bb`, fontWeight:700, letterSpacing:1.2, textTransform:'uppercase' }}>Membership</div>
            <div style={{ fontSize:14, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif', marginTop:2 }}>نادي حيز الرياضي</div>
          </div>
          <div style={{ fontSize:26 }}>🏋️</div>
        </div>
        <div style={{ height:1, background:`${color}30`, margin:'9px 0 8px' }}/>
        {/* Progress bar */}
        <div style={{ marginBottom:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
            <span style={{ fontSize:8.5, color:'rgba(255,255,255,0.4)', fontWeight:600 }}>جلسات الشهر</span>
            <span style={{ fontSize:8.5, color, fontWeight:700 }}>١٢ / ٢٠</span>
          </div>
          <div style={{ height:5, borderRadius:3, background:'rgba(255,255,255,0.1)' }}>
            <div style={{ height:'100%', width:'60%', borderRadius:3, background:`linear-gradient(90deg,${color},${color}88)` }}/>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {[['الباقة','Gold — شهري'],['ينتهي','٣١ أغسطس'],['الدخول','مفتوح ٢٤/٧'],['الفصل','الصالة + سباحة']].map(([lbl,val])=>(
            <div key={lbl}>
              <div style={{ fontSize:7.5, color:'rgba(255,255,255,0.35)', fontWeight:600, marginBottom:2 }}>{lbl}</div>
              <div style={{ fontSize:10, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ flex:1 }}/>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:8.5, color:`${color}99` }}>مسح الدخول</div>
          <Barcode color={`${color}80`}/>
        </div>
      </div>
    </CardShell>
  );
}

// ── 7. COUPON / STORE (خصم) ──────────────────────────────────────────
function CouponCard({ color, bg, platform='apple' }: { color:string; bg:string; platform?:'apple'|'google' }) {
  return (
    <CardShell color={color} bg={bg} platform={platform}>
      {/* Big % watermark */}
      <div style={{ position:'absolute', left:-8, top:-10, fontSize:130, fontWeight:900,
        color:`${color}10`, lineHeight:1, userSelect:'none', fontFamily:'monospace' }}>%</div>
      <div style={{ position:'absolute', inset:0, padding:'14px 18px', display:'flex', flexDirection:'column', zIndex:2 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginTop:14 }}>
          <div>
            <div style={{ fontSize:10, color:`${color}bb`, fontWeight:700, letterSpacing:1.2, textTransform:'uppercase' }}>Store Card</div>
            <div style={{ fontSize:14, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif', marginTop:2 }}>تخفيضات العيد</div>
          </div>
          <div style={{ fontSize:26 }}>🛍️</div>
        </div>
        {/* Big discount */}
        <div style={{ flex:1, display:'flex', alignItems:'center', gap:8 }}>
          <div>
            <div style={{ fontSize:54, fontWeight:900, color, letterSpacing:-3, lineHeight:1 }}>٣٠<span style={{ fontSize:26 }}>٪</span></div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginTop:2, fontFamily:'Cairo,sans-serif' }}>خصم على كل المنتجات</div>
          </div>
        </div>
        {/* Expiry + barcode */}
        <div style={{ borderTop:`1px dashed ${color}35`, paddingTop:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:7.5, color:'rgba(255,255,255,0.3)', fontWeight:600 }}>صالح حتى</div>
            <div style={{ fontSize:10, fontWeight:800, color:'#fff' }}>٣١ يوليو ٢٠٢٤</div>
          </div>
          <QR size={40} fill={`${color}aa`}/>
        </div>
      </div>
    </CardShell>
  );
}

// ── 8. STUDENT ID (هويات) ────────────────────────────────────────────
function StudentIdCard({ color, bg, platform='apple' }: { color:string; bg:string; platform?:'apple'|'google' }) {
  return (
    <CardShell color={color} bg={bg} platform={platform}>
      {/* Side stripe */}
      <div style={{ position:'absolute', right:0, top:0, bottom:0, width:4, background:color, zIndex:3 }}/>
      <div style={{ position:'absolute', inset:0, padding:'14px 18px', display:'flex', flexDirection:'column', zIndex:2 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginTop:14 }}>
          <div>
            <div style={{ fontSize:10, color:`${color}bb`, fontWeight:700, letterSpacing:1.2, textTransform:'uppercase' }}>Student ID</div>
            <div style={{ fontSize:13, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif', marginTop:2 }}>جامعة الملك سعود</div>
          </div>
          <div style={{ fontSize:26 }}>🎓</div>
        </div>
        <div style={{ height:1, background:`${color}30`, margin:'9px 0 8px' }}/>
        {/* Student info */}
        <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
          {/* Avatar */}
          <div style={{ width:44, height:54, borderRadius:8, background:`${color}20`,
            border:`1.5px solid ${color}40`, display:'flex', alignItems:'center',
            justifyContent:'center', fontSize:22, flexShrink:0 }}>👤</div>
          <div>
            <div style={{ fontSize:13, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif', marginBottom:4 }}>أحمد المطيري</div>
            {[['التخصص','هندسة حاسب'],['الرقم','٤٤٣١٢٠٠٥٦'],['المستوى','السادس']].map(([lbl,val])=>(
              <div key={lbl} style={{ display:'flex', gap:5, marginBottom:2 }}>
                <span style={{ fontSize:8, color:'rgba(255,255,255,0.35)', fontWeight:600, width:44, flexShrink:0 }}>{lbl}</span>
                <span style={{ fontSize:9.5, fontWeight:700, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex:1 }}/>
        <div style={{ display:'flex', justifyContent:'center' }}>
          <Barcode color={`${color}70`}/>
        </div>
      </div>
    </CardShell>
  );
}

// ── Dispatcher ───────────────────────────────────────────────────────
function WalletCardMock({ cardIndex, color, bg, icon, name, platform='apple' }:
  { cardIndex:number; color:string; bg:string; icon:string; name:string; platform?:'apple'|'google' }) {
  switch (cardIndex) {
    case 0: return <LoyaltyCard color={color} bg={bg} icon={icon} name={name} platform={platform}/>;
    case 1: return <AppointmentCard color={color} bg={bg} platform={platform}/>;
    case 2: return <HotelCard color={color} bg={bg} platform={platform}/>;
    case 3: return <BoardingPassCard color={color} bg={bg} platform={platform}/>;
    case 4: return <EventTicketCard color={color} bg={bg} platform={platform}/>;
    case 5: return <GymCard color={color} bg={bg} platform={platform}/>;
    case 6: return <CouponCard color={color} bg={bg} platform={platform}/>;
    case 7: return <StudentIdCard color={color} bg={bg} platform={platform}/>;
    default: return <LoyaltyCard color={color} bg={bg} icon={icon} name={name} platform={platform}/>;
  }
}

export default function WalletPage() {
  const [activeCard, setActiveCard] = useState(0);
  const [platform, setPlatform] = useState<'apple'|'google'>('apple');
  const card = CARD_TYPES[activeCard];

  return (
    <PageLayout accent="#8B5CF6">
      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', overflow:'hidden', padding:'100px 24px 60px' }}>
        {/* Ambient */}
        <div style={{ position:'absolute', right:'5%', top:'10%', width:600, height:600, borderRadius:'50%',
          background:'#7C3AED', filter:'blur(200px)', opacity:0.12, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', left:'8%', bottom:'15%', width:400, height:400, borderRadius:'50%',
          background:'#000', filter:'blur(150px)', opacity:0.9, pointerEvents:'none' }}/>

        <div style={{ position:'relative', zIndex:2, maxWidth:1100, width:'100%', display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:60, alignItems:'center' }}>

          {/* Left: Text */}
          <div>
            <motion.div initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
              transition={{ type:'spring', stiffness:220 }}
              style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:28, padding:'10px 22px',
                borderRadius:28, background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.3)' }}>
              <span style={{ fontSize:22 }}>💳</span>
              <span style={{ fontSize:13, fontWeight:800, color:'#A78BFA', letterSpacing:0.3 }}>Apple & Google Wallet</span>
            </motion.div>

            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
              style={{ fontWeight:900, fontSize:'clamp(2.6rem,6vw,5rem)', letterSpacing:'-0.045em', lineHeight:1.0, marginBottom:20 }}>
              <span style={{ color:'#fff', display:'block' }}>البطاقة الرقمية</span>
              <span style={{ background:'linear-gradient(135deg,#A78BFA,#60A5FA)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display:'block' }}>
                التي يحبها عملاؤك</span>
            </motion.h1>

            <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
              style={{ fontSize:16, color:'var(--text2)', lineHeight:1.8, marginBottom:32, maxWidth:460 }}>
              ثلاث لمسات على الجوال — iPhone يفتحها في Apple Wallet، Android في Google Wallet. بدون تطبيق ولا تسجيل. نقاط الولاء، مواعيد العيادة، عضوية النادي — كل شيء جاهز لجميع عملائك.
            </motion.p>

            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
              style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:40 }}>
              <motion.a href={WA} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.04, boxShadow:'0 20px 50px rgba(139,92,246,0.45)' }} whileTap={{ scale:0.97 }}
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'16px 36px', borderRadius:14,
                  background:'linear-gradient(135deg,#7C3AED,#4F46E5)', color:'#fff',
                  fontFamily:'Cairo,sans-serif', fontSize:15, fontWeight:900, textDecoration:'none',
                  boxShadow:'0 12px 36px rgba(109,40,217,0.4)' }}>ابدأ بطاقتك الآن ←</motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.45 }}
              style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
              {STATS.map((s,i) => (
                <div key={i} style={{ padding:'12px 16px', borderRadius:12,
                  background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize:22, fontWeight:900, color:'#A78BFA', letterSpacing:-1 }}>{s.n}</div>
                  <div style={{ fontSize:11, color:'var(--text2)', lineHeight:1.4, marginTop:3 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Interactive card */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:24 }}>

            {/* Platform toggle */}
            <div style={{ display:'flex', gap:0, borderRadius:12, overflow:'hidden',
              border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)' }}>
              {([['apple','🍎 iPhone'] , ['google','🤖 Android']] as const).map(([p, label]) => (
                <button key={p} onClick={() => setPlatform(p)}
                  style={{ padding:'9px 20px', border:'none', cursor:'pointer', fontFamily:'Cairo,sans-serif',
                    fontSize:12, fontWeight:800, transition:'all 0.2s',
                    background: platform===p ? (p==='apple'?'rgba(255,255,255,0.12)':'rgba(66,133,244,0.18)') : 'transparent',
                    color: platform===p ? '#fff' : 'rgba(255,255,255,0.35)',
                    borderLeft: p==='google' ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  {label}
                </button>
              ))}
            </div>

            <WalletCardMock cardIndex={activeCard} color={card.color} bg={card.bg} icon={card.icon} name={card.name} platform={platform} />

            {/* Card type selector */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, width:'100%', maxWidth:340 }}>
              {CARD_TYPES.slice(0,4).map((c,i) => (
                <motion.button key={i} onClick={() => setActiveCard(i)}
                  whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                  style={{ padding:'8px 4px', borderRadius:10, border:`1.5px solid ${activeCard===i?c.color:'rgba(255,255,255,0.07)'}`,
                    background:activeCard===i?`${c.color}15`:'rgba(255,255,255,0.03)', cursor:'pointer',
                    fontFamily:'Cairo,sans-serif', transition:'all 0.2s' }}>
                  <div style={{ fontSize:16 }}>{c.icon}</div>
                  <div style={{ fontSize:9, color:activeCard===i?c.color:'var(--text3)', fontWeight:700, marginTop:2 }}>{c.name.split(' ')[0]}</div>
                </motion.button>
              ))}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, width:'100%', maxWidth:340 }}>
              {CARD_TYPES.slice(4,8).map((c,i) => (
                <motion.button key={i} onClick={() => setActiveCard(i+4)}
                  whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                  style={{ padding:'8px 4px', borderRadius:10, border:`1.5px solid ${activeCard===i+4?c.color:'rgba(255,255,255,0.07)'}`,
                    background:activeCard===i+4?`${c.color}15`:'rgba(255,255,255,0.03)', cursor:'pointer',
                    fontFamily:'Cairo,sans-serif', transition:'all 0.2s' }}>
                  <div style={{ fontSize:16 }}>{c.icon}</div>
                  <div style={{ fontSize:9, color:activeCard===i+4?c.color:'var(--text3)', fontWeight:700, marginTop:2 }}>{c.name.split(' ')[0]}</div>
                </motion.button>
              ))}
            </div>
            <div style={{ textAlign:'center', fontSize:12, color:'var(--text2)', lineHeight:1.5 }}>
              <strong style={{ color:card.color }}>{card.name}</strong> — {card.example}
            </div>
          </div>
        </div>
        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.2, repeat:Infinity }}
          style={{ position:'absolute', bottom:32, fontSize:22, opacity:0.25 }}>↓</motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', background:'var(--bg2)' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:56 }}>
            <div className="section-label" style={{ color:'#A78BFA', borderColor:'rgba(167,139,250,0.3)',
              background:'rgba(167,139,250,0.08)', marginBottom:16 }}>⚡ كيف يعمل</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>٤ خطوات وأنت جاهز</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:20 }}>
            {STEPS.map((s,i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}
                style={{ padding:'28px 22px', borderRadius:18, background:'rgba(255,255,255,0.03)',
                  border:'1px solid rgba(255,255,255,0.07)', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:-12, right:-8, fontSize:64, fontWeight:900,
                  color:'rgba(139,92,246,0.06)', fontFamily:'monospace', userSelect:'none' }}>{s.n}</div>
                <div style={{ fontSize:28, marginBottom:12 }}>{s.icon}</div>
                <div style={{ fontSize:14.5, fontWeight:800, color:'#fff', marginBottom:8 }}>{s.title}</div>
                <div style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.7 }}>{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARD TYPES ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:52 }}>
            <div className="section-label" style={{ color:'#A78BFA', borderColor:'rgba(167,139,250,0.3)',
              background:'rgba(167,139,250,0.08)', marginBottom:16 }}>🎴 أنواع البطاقات</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>٨ أنواع لكل قطاع</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:14 }}>
            {CARD_TYPES.map((c,i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.07 }}
                whileHover={{ y:-6, boxShadow:`0 20px 48px ${c.color}22` }}
                style={{ padding:'22px', borderRadius:16, position:'relative', overflow:'hidden',
                  background:'rgba(255,255,255,0.03)', border:`1px solid ${c.color}20`,
                  transition:'box-shadow 0.25s,transform 0.25s' }}>
                {c.badge&&(
                  <div style={{ position:'absolute', top:12, left:12, padding:'3px 10px', borderRadius:10,
                    background:`${c.color}25`, fontSize:9.5, fontWeight:800, color:c.color }}>{c.badge}</div>
                )}
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10, marginTop:c.badge?16:0 }}>
                  <div style={{ width:36, height:36, borderRadius:9, background:`${c.color}18`,
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{c.icon}</div>
                  <div style={{ fontSize:14, fontWeight:800, color:'#fff' }}>{c.name}</div>
                </div>
                <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6 }}>{c.example}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WalletShowcase component ── */}
      <WalletShowcase />

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:52 }}>
            <div className="section-label" style={{ color:'#A78BFA', borderColor:'rgba(167,139,250,0.3)',
              background:'rgba(167,139,250,0.08)', marginBottom:16 }}>⭐ قصص نجاح</div>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff' }}>أرقام حقيقية من عملاء حقيقيين</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16 }}>
            {TESTIMONIALS.map((t,i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}
                style={{ padding:'28px 24px', borderRadius:18, background:'rgba(255,255,255,0.03)',
                  border:`1px solid ${t.color}20`, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
                  background:`linear-gradient(90deg,${t.color},transparent)` }}/>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                  <div style={{ fontSize:12.5, fontWeight:700, color:'#fff' }}>{t.name}</div>
                  <div style={{ padding:'4px 10px', borderRadius:10, background:`${t.color}20`,
                    fontSize:11, fontWeight:800, color:t.color }}>{t.result}</div>
                </div>
                <p style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7, fontStyle:'italic' }}>"{t.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 24px', textAlign:'center',
        background:'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(139,92,246,0.12) 0%,transparent 70%)' }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div style={{ fontSize:52, marginBottom:20 }}>💳</div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#fff', marginBottom:14 }}>
            أضف عملاءك لجيوبهم — حرفياً</h2>
          <p style={{ fontSize:16, color:'var(--text2)', marginBottom:36, maxWidth:420, margin:'0 auto 36px' }}>
            تواصل معنا وسنصمم نموذج بطاقتك خلال ٢٤ ساعة مجاناً.</p>
          <motion.a href={WA} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05, boxShadow:'0 20px 50px rgba(139,92,246,0.45)' }} whileTap={{ scale:0.97 }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'17px 44px', borderRadius:16,
              background:'linear-gradient(135deg,#7C3AED,#4F46E5)', color:'#fff',
              fontFamily:'Cairo,sans-serif', fontSize:17, fontWeight:900, textDecoration:'none',
              boxShadow:'0 16px 48px rgba(109,40,217,0.45)' }}>ابدأ بطاقتك الآن ←</motion.a>
        </motion.div>
      </section>
    </PageLayout>
  );
}
