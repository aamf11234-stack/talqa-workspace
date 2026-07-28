import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays, Smartphone, Users, CreditCard, Bot, BarChart2,
  FolderOpen, MessageSquare, Wallet, UserCircle, Check, Layers,
  type LucideIcon,
} from 'lucide-react';

function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return m;
}

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const TABS: { id: string; Icon: LucideIcon; label: string }[] = [
  { id:'bookings',  Icon: CalendarDays,   label:'الحجوزات الذكية' },
  { id:'app',       Icon: Smartphone,     label:'التطبيق والولاء'  },
  { id:'hr',        Icon: Users,          label:'إدارة الفريق'     },
  { id:'wallet',    Icon: CreditCard,     label:'Digital Wallet'   },
  { id:'ai',        Icon: Bot,            label:'الذكاء الاصطناعي'},
  { id:'reports',   Icon: BarChart2,      label:'التقارير'         },
  { id:'files',     Icon: FolderOpen,     label:'إدارة الملفات'    },
  { id:'comms',     Icon: MessageSquare,  label:'التواصل التلقائي' },
  { id:'payments',  Icon: Wallet,         label:'المدفوعات'        },
  { id:'crm',       Icon: UserCircle,     label:'إدارة العملاء'   },
];

const FEATURES: Record<string, {
  color: string;
  gradient: string;
  title: string;
  subtitle: string;
  bullets: { text: string }[];
  Visual: () => JSX.Element;
}> = {

  bookings: {
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg,#001820,#003844)',
    title: 'نظام حجوزات لا يُقارن',
    subtitle: 'كل موعد في مكانه — بدون تداخل ولا فوضى',
    bullets: [
      { text:'تقويم ذكي يمنع الحجوزات المتضاربة تلقائياً' },
      { text:'حجز أونلاين ٢٤/٧ — العميل يختار الوقت بنفسه' },
      { text:'تذكير واتساب وSMS قبل الموعد بـ ٢٤ ساعة وساعة' },
      { text:'نظام Anti-No-Show: رسوم إلغاء + قائمة انتظار تلقائية' },
      { text:'تخصيص الحجز بالموظف أو الخدمة أو الفرع' },
      { text:'قائمة انتظار ذكية تملأ الفراغات تلقائياً' },
      { text:'حجوزات متعددة الفروع من نافذة واحدة' },
      { text:'حجوزات متكررة للعملاء المنتظمين' },
    ],
    Visual: BookingMockup,
  },

  app: {
    color: '#A78BFA',
    gradient: 'linear-gradient(135deg,#0d0020,#1e0040)',
    title: 'تطبيق العلامة التجارية + ولاء العملاء',
    subtitle: 'تطبيق بهويتك — يجمع العميل ويجعله يعود',
    bullets: [
      { text:'نقاط ولاء على كل عملية — تُضاف تلقائياً' },
      { text:'مستويات VIP: عادي، فضي، ذهبي، بلاتيني' },
      { text:'مكافآت قابلة للاستبدال — هدايا، خصومات، خدمات مجانية' },
      { text:'تطبيق iOS & Android بشعارك وألوانك' },
      { text:'إشعارات Push مستهدفة — يصل العرض للعميل الصح' },
      { text:'عروض تلقائية لأعياد الميلاد والمناسبات' },
      { text:'برنامج إحالة — العميل يجيب أصدقاءه ويكسب' },
      { text:'متجر داخل التطبيق لبيع المنتجات والباقات' },
    ],
    Visual: AppMockup,
  },

  hr: {
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg,#1a1000,#2d1e00)',
    title: 'إدارة الفريق والموظفين',
    subtitle: 'ملفات، صلاحيات، متابعة — كل شيء رقمي',
    bullets: [
      { text:'ملف رقمي لكل موظف: بياناته، عقده، شهاداته' },
      { text:'هيكل تنظيمي تفاعلي — كل قسم وتسلسله الوظيفي' },
      { text:'إدارة الملفات: رفع، تنظيم، إصدارات، تتبع لحظي' },
      { text:'دورة الاعتماد: الموظف يرفع، المدير يعتمد أو يرفض' },
      { text:'الحضور والانصراف عبر QR أو بصمة رقمية' },
      { text:'تقارير الأداء الشهرية لكل موظف' },
      { text:'صلاحيات دقيقة — كل شخص يرى ما يخصه فقط' },
      { text:'الموظف يتابع مهامه وطلباته من تطبيق الجوال' },
    ],
    Visual: HRMockup,
  },

  wallet: {
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg,#0d0020,#1a003d)',
    title: 'Apple & Google Wallet',
    subtitle: 'بطاقتك في جيب كل عميل — iPhone وAndroid',
    bullets: [
      { text:'Apple Wallet — تُضاف لـ iPhone بلمسة واحدة' },
      { text:'Google Wallet — تعمل على كل أجهزة Android' },
      { text:'تصميم بهوية علامتك — ألوان، شعار، خطوط' },
      { text:'تحديث لحظي للرصيد والبيانات بدون تدخل العميل' },
      { text:'إشعار على شاشة الجوال عند الاقتراب من المكان' },
      { text:'تعمل بدون إنترنت — QR وNFC' },
      { text:'٨ أنواع: ولاء، موعد، فندق، طيران، تذاكر، عضوية...' },
      { text:'موقّعة رسمياً — لا يمكن تزويرها أو تكرارها' },
    ],
    Visual: WalletMockup,
  },

  ai: {
    color: '#10B981',
    gradient: 'linear-gradient(135deg,#001a0e,#002d18)',
    title: 'الذكاء الاصطناعي المدمج',
    subtitle: 'مساعد يعمل ٢٤/٧ — يرد، يحجز، يبيع',
    bullets: [
      { text:'بوت واتساب يرد على العملاء بالعربي فوراً' },
      { text:'يكمّل الحجز كاملاً بدون تدخل بشري' },
      { text:'يتعلم من سلوك العملاء ويقترح أفضل الأوقات' },
      { text:'حملات تسويقية ذكية — يرسل للعميل الصح في الوقت الصح' },
      { text:'تحليل نمط المبيعات والتنبؤ بالطلب' },
      { text:'تحليل رضا العملاء من التقييمات والردود' },
      { text:'يُكمّل السلل المتروكة — يذكّر العميل ويحوّله' },
      { text:'يحول للموظف البشري عند الحاجة بسلاسة' },
    ],
    Visual: AIMockup,
  },

  reports: {
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg,#000c20,#0f2557)',
    title: 'تقارير وتحليلات في الوقت الفعلي',
    subtitle: 'كل قرار مبني على بيانات — لا تخمين',
    bullets: [
      { text:'المبيعات اليومية والشهرية والسنوية لحظياً' },
      { text:'مقارنة الأداء بالفترة السابقة — نمو أو تراجع' },
      { text:'أفضل المنتجات والخدمات والموظفين مبيعاً' },
      { text:'خريطة العملاء — من أين يأتون ومتى' },
      { text:'معدل عودة العملاء ومعدل الاحتفاظ' },
      { text:'تحليل الغياب والإلغاءات وأسبابها' },
      { text:'تقارير قابلة للتصدير — PDF وExcel' },
      { text:'تنبيهات تلقائية عند انخفاض الأداء عن الهدف' },
    ],
    Visual: ReportsMockup,
  },

  files: {
    color: '#EC4899',
    gradient: 'linear-gradient(135deg,#1a0010,#2d001c)',
    title: 'إدارة الملفات والمستندات',
    subtitle: 'كل ورقة رقمية — مرتبة، متتبعة، محمية',
    bullets: [
      { text:'رفع وتنظيم الملفات في مجلدات ذكية' },
      { text:'بحث فوري في محتوى الملفات — لا تضيع وثيقة' },
      { text:'توقيع رقمي على العقود والاتفاقيات' },
      { text:'تتبع إصدارات الملف — من عدّل وماذا ومتى' },
      { text:'دورة اعتماد: إرسال → مراجعة → اعتماد → حفظ' },
      { text:'تنبيه عند انتهاء صلاحية العقد أو التراخيص' },
      { text:'صلاحيات الوصول — من يرى ومن يعدّل' },
      { text:'نسخ احتياطي تلقائي — لا تُفقد وثيقة أبداً' },
    ],
    Visual: FilesMockup,
  },

  comms: {
    color: '#34D399',
    gradient: 'linear-gradient(135deg,#001810,#002d1c)',
    title: 'التواصل التلقائي المتكامل',
    subtitle: 'رسالتك تصل — في الوقت الصح، على القناة الصح',
    bullets: [
      { text:'واتساب أوتوماتيكي — تذكير، تأكيد، متابعة' },
      { text:'إيميل احترافي بتصميم علامتك التجارية' },
      { text:'Push Notification لأعضاء التطبيق' },
      { text:'إرسال مجمّع مستهدف — شريحة العملاء الصح' },
      { text:'حملات تلقائية: ترحيب، إعادة تفعيل، احتفال' },
      { text:'معدل الفتح والنقر لكل رسالة' },
      { text:'رسائل بالعربي والإنجليزي حسب تفضيل العميل' },
      { text:'قائمة opt-out — حماية من إزعاج العميل' },
    ],
    Visual: CommsMockup,
  },

  payments: {
    color: '#F97316',
    gradient: 'linear-gradient(135deg,#1a0800,#2d1200)',
    title: 'المدفوعات والفواتير الرقمية',
    subtitle: 'استلم أموالك بكل طريقة — أونلاين وبالمحل',
    bullets: [
      { text:'بطاقات بنكية، Apple Pay، STC Pay، مدى' },
      { text:'فاتورة رقمية تُرسل فور الدفع' },
      { text:'اشتراكات شهرية تُجدَّد تلقائياً' },
      { text:'دفع مسبق — العميل يودع ويسحب رصيداً' },
      { text:'باقات متعددة بأسعار مختلفة' },
      { text:'تقارير المبيعات اليومية والتسوية' },
      { text:'بوابة دفع آمنة — PCI DSS' },
      { text:'استرداد المبالغ بسهولة من لوحة التحكم' },
    ],
    Visual: PaymentsMockup,
  },

  crm: {
    color: '#6366F1',
    gradient: 'linear-gradient(135deg,#06001a,#0f0033)',
    title: 'إدارة علاقات العملاء CRM',
    subtitle: 'كل عميل بتاريخه الكامل — في ثوانٍ',
    bullets: [
      { text:'ملف شامل لكل عميل: زياراته، مشترياته، تفضيلاته' },
      { text:'تصنيف العملاء: جديد، منتظم، VIP، معرّض للتوقف' },
      { text:'سجل التواصل الكامل — واتساب، مكالمات، إيميل' },
      { text:'شرائح ذكية — استهدف بالعروض من يستحقها' },
      { text:'نظام التقييمات والمراجعات مع الرد التلقائي' },
      { text:'تنبؤ بالعملاء المعرّضين للانقطاع وتفعيلهم' },
      { text:'قيمة العميل مدى الحياة — LTV تلقائي' },
      { text:'جدولة متابعة — لا تنسى عميلاً مهماً' },
    ],
    Visual: CRMMockup,
  },
};

/* ══════════════════════════════════════════
   MINI MOCKUPS
══════════════════════════════════════════ */

function MockupShell({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div style={{
      width: '100%', maxWidth: 360,
      background: 'rgba(0,0,0,0.4)',
      borderRadius: 20,
      border: `1px solid ${color}30`,
      overflow: 'hidden',
      boxShadow: `0 24px 60px ${color}22`,
    }}>
      {/* Fake window bar */}
      <div style={{ padding:'10px 14px', borderBottom:`1px solid rgba(255,255,255,0.05)`,
        display:'flex', alignItems:'center', gap:6 }}>
        {['#FF5F57','#FEBC2E','#28C840'].map(c=>(
          <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }}/>
        ))}
        <div style={{ flex:1, height:18, borderRadius:6, background:'rgba(255,255,255,0.06)', marginRight:8 }}/>
      </div>
      <div style={{ padding:16 }}>{children}</div>
    </div>
  );
}

function Row({ label, value, color, pill }: { label:string; value:string; color:string; pill?:string }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'9px 12px', borderRadius:10, background:'rgba(255,255,255,0.04)',
      border:'1px solid rgba(255,255,255,0.06)', marginBottom:6 }}>
      <span style={{ fontSize:11, color:'rgba(255,255,255,0.55)', fontFamily:'Cairo,sans-serif' }}>{label}</span>
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        {pill && <span style={{ fontSize:9, fontWeight:800, padding:'2px 8px', borderRadius:10,
          background:`${color}22`, color }}>{pill}</span>}
        <span style={{ fontSize:12, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{value}</span>
      </div>
    </div>
  );
}

function MiniBar({ pct, color, label }: { pct:number; color:string; label:string }) {
  return (
    <div style={{ marginBottom:8 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ fontSize:10, color:'rgba(255,255,255,0.45)', fontFamily:'Cairo,sans-serif' }}>{label}</span>
        <span style={{ fontSize:10, fontWeight:800, color }}>{pct}٪</span>
      </div>
      <div style={{ height:5, borderRadius:3, background:'rgba(255,255,255,0.08)' }}>
        <motion.div initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ duration:1, ease:'easeOut' }}
          style={{ height:'100%', borderRadius:3, background:`linear-gradient(90deg,${color},${color}88)` }}/>
      </div>
    </div>
  );
}

function BookingMockup() {
  const slots = ['٩:٠٠','٩:٣٠','١٠:٠٠','١٠:٣٠','١١:٠٠','١١:٣٠'];
  const states = ['محجوز','متاح','محجوز','متاح','متاح','محجوز'];
  return (
    <MockupShell color="#06B6D4">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <span style={{ fontSize:12, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>مواعيد اليوم</span>
        <span style={{ fontSize:10, color:'#06B6D4', fontWeight:700 }}>الأحد ٢٠ يوليو</span>
      </div>
      {slots.map((s,i)=>(
        <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px',
          borderRadius:10, marginBottom:5,
          background: states[i]==='محجوز' ? 'rgba(6,182,212,0.1)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${states[i]==='محجوز'?'rgba(6,182,212,0.3)':'rgba(255,255,255,0.06)'}` }}>
          <span style={{ fontSize:10, fontWeight:800, color:'#06B6D4', fontFamily:'monospace', width:36 }}>{s}</span>
          <div style={{ flex:1, height:8, borderRadius:4,
            background: states[i]==='محجوز' ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.08)' }}/>
          <span style={{ fontSize:9, fontWeight:700,
            color: states[i]==='محجوز'?'#06B6D4':'rgba(255,255,255,0.3)',
            fontFamily:'Cairo,sans-serif' }}>{states[i]}</span>
        </div>
      ))}
      <div style={{ marginTop:10, padding:'10px', borderRadius:10, background:'rgba(6,182,212,0.08)',
        border:'1px solid rgba(6,182,212,0.2)', textAlign:'center' }}>
        <span style={{ fontSize:11, color:'#06B6D4', fontWeight:800, fontFamily:'Cairo,sans-serif' }}>
          ٤ حجوزات مؤكدة · ٢ فراغ متاح
        </span>
      </div>
    </MockupShell>
  );
}

function AppMockup() {
  return (
    <MockupShell color="#A78BFA">
      {/* Phone frame */}
      <div style={{ width:160, margin:'0 auto', background:'#0d0020', borderRadius:28,
        border:'2px solid rgba(167,139,250,0.3)', padding:'12px 10px', overflow:'hidden' }}>
        <div style={{ textAlign:'center', marginBottom:10 }}>
          <div style={{ width:32, height:32, borderRadius:10, background:'linear-gradient(135deg,#7C3AED,#A78BFA)',
            margin:'0 auto 4px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>☕</div>
          <div style={{ fontSize:9, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>كافيهك</div>
        </div>
        <div style={{ padding:'8px', borderRadius:12, background:'rgba(167,139,250,0.1)',
          border:'1px solid rgba(167,139,250,0.2)', marginBottom:8 }}>
          <div style={{ fontSize:8, color:'rgba(255,255,255,0.5)', marginBottom:3, fontFamily:'Cairo,sans-serif' }}>نقاطك</div>
          <div style={{ fontSize:22, fontWeight:900, color:'#A78BFA', letterSpacing:-1 }}>٢٤٧</div>
          <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', fontFamily:'Cairo,sans-serif' }}>نقطة · تحتاج ٥٣ للجائزة</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:5 }}>
          {['🎁 مكافآت','📅 حجز','🏆 مستوى','📊 سجل'].map(item=>(
            <div key={item} style={{ padding:'6px 4px', borderRadius:8, background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.07)', textAlign:'center',
              fontSize:8, color:'rgba(255,255,255,0.6)', fontFamily:'Cairo,sans-serif' }}>{item}</div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

function HRMockup() {
  const employees = [
    { name:'سارة الزهراني', role:'مديرة التشغيل', level:0, color:'#F59E0B' },
    { name:'محمد العتيبي',  role:'مشرف الفرع',    level:1, color:'#F59E0B' },
    { name:'نورة السبيعي',  role:'موظفة خدمة',    level:2, color:'#FCD34D' },
    { name:'فهد الشمري',    role:'موظف خدمة',     level:2, color:'#FCD34D' },
  ];
  return (
    <MockupShell color="#F59E0B">
      <div style={{ fontSize:11, fontWeight:900, color:'#fff', marginBottom:10, fontFamily:'Cairo,sans-serif' }}>
        الهيكل التنظيمي
      </div>
      {employees.map((e,i)=>(
        <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6,
          paddingRight: e.level*16, transition:'all 0.2s' }}>
          {e.level>0 && <div style={{ width:e.level*8, height:1, background:'rgba(245,158,11,0.3)', flexShrink:0 }}/>}
          <div style={{ width:28, height:28, borderRadius:8, background:`${e.color}22`,
            border:`1.5px solid ${e.color}55`,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>
            {['👩‍💼','👨‍💼','👩','👨'][i]}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{e.name}</div>
            <div style={{ fontSize:8, color:'rgba(255,255,255,0.4)', fontFamily:'Cairo,sans-serif' }}>{e.role}</div>
          </div>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'#10B981', flexShrink:0 }}/>
        </div>
      ))}
      <div style={{ marginTop:8, padding:'8px 10px', borderRadius:10, background:'rgba(245,158,11,0.08)',
        border:'1px solid rgba(245,158,11,0.2)' }}>
        <div style={{ fontSize:9, color:'rgba(255,255,255,0.5)', marginBottom:4, fontFamily:'Cairo,sans-serif' }}>طلبات معلّقة</div>
        {['إجازة — محمد العتيبي','وثيقة — نورة السبيعي'].map(t=>(
          <div key={t} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:3 }}>
            <span style={{ fontSize:9, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{t}</span>
            <span style={{ fontSize:8, color:'#F59E0B', fontWeight:800 }}>مراجعة</span>
          </div>
        ))}
      </div>
    </MockupShell>
  );
}

function WalletMockup() {
  return (
    <MockupShell color="#8B5CF6">
      <div style={{ width:200, margin:'0 auto', height:120, borderRadius:16,
        background:'linear-gradient(135deg,#1a0a35,#2d1260)',
        border:'1.5px solid rgba(139,92,246,0.4)', position:'relative', overflow:'hidden' }}>
        <motion.div animate={{ x:['-80%','180%'] }} transition={{ duration:4, repeat:Infinity, ease:'linear', repeatDelay:2 }}
          style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.1) 50%,transparent 70%)' }}/>
        <div style={{ position:'absolute', top:10, left:12, display:'flex', alignItems:'center', gap:5 }}>
          <span style={{ fontSize:7, fontWeight:800, color:'rgba(255,255,255,0.7)', padding:'1px 5px', borderRadius:4, background:'rgba(255,255,255,0.12)' }}>Apple</span>
          <span style={{ fontSize:7, fontWeight:800, color:'rgba(255,255,255,0.7)', padding:'1px 5px', borderRadius:4, background:'rgba(255,255,255,0.12)' }}>Google</span>
          <span style={{ fontSize:7, color:'rgba(255,255,255,0.35)', fontWeight:600 }}>Wallet</span>
        </div>
        <div style={{ position:'absolute', bottom:10, left:12, right:12 }}>
          <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)', marginBottom:2, fontFamily:'Cairo,sans-serif' }}>كافيهك — نقاط الولاء</div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
            <div style={{ fontSize:22, fontWeight:900, color:'#A78BFA' }}>٢٤٧ pts</div>
            <div style={{ display:'flex', gap:2 }}>
              {[1,2,3,4,5].map(n=>(
                <div key={n} style={{ width:14, height:14, borderRadius:'50%',
                  background: n<=3?'#8B5CF6':'rgba(255,255,255,0.1)',
                  border:'1px solid rgba(255,255,255,0.2)' }}/>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:12 }}>
        {[['iPhone','Apple Wallet'],['Android','Google Wallet']].map(([icon,lbl])=>(
          <div key={lbl} style={{ padding:'8px', borderRadius:10, background:'rgba(139,92,246,0.08)',
            border:'1px solid rgba(139,92,246,0.2)', textAlign:'center' }}>
            <div style={{ fontSize:9, color:'rgba(255,255,255,0.6)', fontWeight:700 }}>{icon}</div>
            <div style={{ fontSize:8, color:'#A78BFA', fontWeight:800, fontFamily:'Cairo,sans-serif', marginTop:2 }}>{lbl}</div>
          </div>
        ))}
      </div>
    </MockupShell>
  );
}

function AIMockup() {
  const msgs = [
    { from:'user', text:'وش المواعيد المتاحة بكرا؟' },
    { from:'bot',  text:'عندي ٣ مواعيد متاحة: ١٠ ص، ٢ م، ٤ م. أيهم يناسبك؟' },
    { from:'user', text:'حجزلي ٢ الظهر' },
    { from:'bot',  text:'✅ تم تأكيد موعدك — راح يوصلك تذكير على واتساب' },
  ];
  return (
    <MockupShell color="#10B981">
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12,
        padding:'8px 10px', borderRadius:10, background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.2)' }}>
        <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#059669,#10B981)',
          display:'flex', alignItems:'center', justifyContent:'center' }}><Bot size={14} strokeWidth={1.75} style={{ color:'#fff' }} /></div>
        <div>
          <div style={{ fontSize:10, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>مساعد تلقا</div>
          <div style={{ display:'flex', alignItems:'center', gap:4 }}>
            <div style={{ width:5, height:5, borderRadius:'50%', background:'#10B981' }}/>
            <span style={{ fontSize:8, color:'#10B981' }}>متصل الآن</span>
          </div>
        </div>
      </div>
      {msgs.map((m,i)=>(
        <div key={i} style={{ display:'flex', justifyContent: m.from==='user'?'flex-end':'flex-start', marginBottom:6 }}>
          <div style={{ maxWidth:'75%', padding:'7px 10px', borderRadius:12,
            background: m.from==='bot'?'rgba(16,185,129,0.12)':'rgba(255,255,255,0.07)',
            border: `1px solid ${m.from==='bot'?'rgba(16,185,129,0.25)':'rgba(255,255,255,0.08)'}` }}>
            <span style={{ fontSize:10, color:'#fff', fontFamily:'Cairo,sans-serif', lineHeight:1.5 }}>{m.text}</span>
          </div>
        </div>
      ))}
    </MockupShell>
  );
}

function ReportsMockup() {
  const bars = [62, 45, 78, 55, 88, 70, 92];
  const days = ['ن','ث','ث','ر','خ','ج','س'];
  return (
    <MockupShell color="#3B82F6">
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:12 }}>
        {[['💰 المبيعات','٢٤,٥٠٠ ر','↑١٢٪','#3B82F6'],['🧑 عملاء','١٤٧ زيارة','↑٨٪','#8B5CF6']].map(([icon,val,chg,c])=>(
          <div key={String(val)} style={{ padding:'10px', borderRadius:12, background:`${c}12`,
            border:`1px solid ${c}25` }}>
            <div style={{ fontSize:10, marginBottom:4 }}>{icon}</div>
            <div style={{ fontSize:13, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{val}</div>
            <div style={{ fontSize:9, color:'#10B981', fontWeight:700 }}>{chg} هذا الأسبوع</div>
          </div>
        ))}
      </div>
      <div style={{ padding:'10px', borderRadius:12, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)', marginBottom:8, fontFamily:'Cairo,sans-serif' }}>المبيعات — الأسبوع الحالي</div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:5, height:50 }}>
          {bars.map((h,i)=>(
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <motion.div initial={{ height:0 }} animate={{ height:`${h*0.5}px` }} transition={{ delay:i*0.07, duration:0.8 }}
                style={{ width:'100%', borderRadius:3, background:`linear-gradient(180deg,#3B82F6,#1D4ED8)` }}/>
              <span style={{ fontSize:7, color:'rgba(255,255,255,0.35)' }}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

function FilesMockup() {
  const files = [
    { name:'عقد الإيجار.pdf',       status:'معتمد',       color:'#10B981' },
    { name:'السجل التجاري.pdf',      status:'معتمد',       color:'#10B981' },
    { name:'شهادة الموظف.pdf',       status:'قيد المراجعة',color:'#F59E0B' },
    { name:'بوليصة التأمين.pdf',     status:'منتهي',       color:'#EF4444' },
  ];
  return (
    <MockupShell color="#EC4899">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <span style={{ fontSize:11, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>المستندات</span>
        <span style={{ fontSize:9, color:'#EC4899', fontWeight:800 }}>+ رفع ملف</span>
      </div>
      {files.map((f,i)=>(
        <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px',
          borderRadius:10, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)', marginBottom:5 }}>
          <div style={{ width:28, height:28, borderRadius:7, background:`${f.color}18`, border:`1px solid ${f.color}30`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <FolderOpen size={13} strokeWidth={2} style={{ color:f.color }} />
          </div>
          <div style={{ flex:1, overflow:'hidden' }}>
            <div style={{ fontSize:9.5, fontWeight:700, color:'#fff', fontFamily:'Cairo,sans-serif',
              whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{f.name}</div>
          </div>
          <span style={{ fontSize:8, fontWeight:800, padding:'2px 7px', borderRadius:8,
            background:`${f.color}18`, color:f.color, flexShrink:0 }}>{f.status}</span>
        </div>
      ))}
      <MiniBar pct={75} color="#EC4899" label="اكتمال ملفات الشركة"/>
    </MockupShell>
  );
}

function CommsMockup() {
  return (
    <MockupShell color="#34D399">
      <div style={{ fontSize:11, fontWeight:900, color:'#fff', marginBottom:10, fontFamily:'Cairo,sans-serif' }}>
        حملة إعادة تفعيل
      </div>
      {[
        { ch:'💬 واتساب', sent:'١٢٥', open:'٩٨٪', color:'#25D366' },
        { ch:'📲 Push',   sent:'٢٤٠', open:'٦٢٪', color:'#34D399' },
        { ch:'📧 إيميل',  sent:'٩٠',  open:'٣٤٪', color:'#60A5FA' },
      ].map(r=>(
        <div key={r.ch} style={{ padding:'8px 10px', borderRadius:10, background:'rgba(255,255,255,0.04)',
          border:'1px solid rgba(255,255,255,0.07)', marginBottom:6 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
            <span style={{ fontSize:10, fontWeight:800, color:'#fff', fontFamily:'Cairo,sans-serif' }}>{r.ch}</span>
            <span style={{ fontSize:9, color:'rgba(255,255,255,0.4)', fontFamily:'Cairo,sans-serif' }}>أُرسلت لـ {r.sent}</span>
          </div>
          <MiniBar pct={parseInt(r.open)} color={r.color} label={`معدل الفتح ${r.open}`}/>
        </div>
      ))}
    </MockupShell>
  );
}

function PaymentsMockup() {
  return (
    <MockupShell color="#F97316">
      <div style={{ padding:'12px', borderRadius:14, background:'linear-gradient(135deg,#1a0800,#3d1500)',
        border:'1px solid rgba(249,115,22,0.3)', marginBottom:10 }}>
        <div style={{ fontSize:9, color:'rgba(255,255,255,0.5)', marginBottom:4, fontFamily:'Cairo,sans-serif' }}>إجمالي اليوم</div>
        <div style={{ fontSize:26, fontWeight:900, color:'#F97316', letterSpacing:-1 }}>٥,٢٤٠ <span style={{ fontSize:12, color:'rgba(255,255,255,0.4)' }}>ر.س</span></div>
        <div style={{ fontSize:9, color:'#10B981', marginTop:2 }}>↑ ١٨٪ عن أمس</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6, marginBottom:10 }}>
        {[['💳','بطاقة','٦٢٪'],['📱','Apple Pay','٢٨٪'],['🏦','مدى','١٠٪']].map(([icon,lbl,pct])=>(
          <div key={lbl} style={{ padding:'8px 5px', borderRadius:10, background:'rgba(249,115,22,0.08)',
            border:'1px solid rgba(249,115,22,0.2)', textAlign:'center' }}>
            <div style={{ fontSize:13 }}>{icon}</div>
            <div style={{ fontSize:7.5, color:'rgba(255,255,255,0.6)', fontFamily:'Cairo,sans-serif' }}>{lbl}</div>
            <div style={{ fontSize:10, fontWeight:900, color:'#F97316' }}>{pct}</div>
          </div>
        ))}
      </div>
      <Row label="آخر دفعة" value="٢٥٠ ر" color="#F97316" pill="ناجح"/>
      <Row label="اشتراك تلقائي" value="سارة — ٣١ يوليو" color="#F97316"/>
    </MockupShell>
  );
}

function CRMMockup() {
  return (
    <MockupShell color="#6366F1">
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px', borderRadius:12,
        background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.25)', marginBottom:10 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:'rgba(99,102,241,0.2)',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>👤</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, fontWeight:900, color:'#fff', fontFamily:'Cairo,sans-serif' }}>أحمد المطيري</div>
          <div style={{ display:'flex', gap:5, marginTop:2 }}>
            <span style={{ fontSize:8, padding:'1px 7px', borderRadius:8, background:'rgba(251,191,36,0.2)', color:'#FBB324', fontWeight:800 }}>🏆 VIP</span>
            <span style={{ fontSize:8, color:'rgba(255,255,255,0.4)', fontFamily:'Cairo,sans-serif' }}>عميل منذ ٢٠٢٢</span>
          </div>
        </div>
      </div>
      <MiniBar pct={87} color="#6366F1" label="احتمالية العودة"/>
      <MiniBar pct={62} color="#8B5CF6" label="استخدام الولاء"/>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6, marginTop:4 }}>
        {[['١٤٢','زيارة'],['٨,٤٠٠','إنفاق ر'],['٢٤٧','نقطة']].map(([v,l])=>(
          <div key={l} style={{ padding:'8px 5px', borderRadius:10, background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.07)', textAlign:'center' }}>
            <div style={{ fontSize:14, fontWeight:900, color:'#A78BFA' }}>{v}</div>
            <div style={{ fontSize:8, color:'rgba(255,255,255,0.4)', fontFamily:'Cairo,sans-serif' }}>{l}</div>
          </div>
        ))}
      </div>
    </MockupShell>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function PlatformShowcase() {
  const [active, setActive] = useState('bookings');
  const isMobile = useIsMobile();
  const feat = FEATURES[active];

  return (
    <section style={{ padding:'clamp(80px,10vw,120px) 0', overflow:'hidden' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>

        {/* ── Header ── */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ textAlign:'center', marginBottom:52 }}>
          <div className="section-label" style={{ color:'#A78BFA', borderColor:'rgba(167,139,250,0.3)',
            background:'rgba(167,139,250,0.08)', marginBottom:16 }}>
            <Layers size={13} strokeWidth={2} style={{ verticalAlign:'middle', marginLeft:5 }} /> منصة متكاملة
          </div>
          <h2 style={{ fontWeight:900, fontSize:'clamp(2rem,4.5vw,3.5rem)', color:'#fff', marginBottom:14, letterSpacing:'-0.04em' }}>
            كل ما تحتاجه في مكان واحد
          </h2>
          <p style={{ fontSize:16, color:'var(--text2)', maxWidth:580, margin:'0 auto', lineHeight:1.8 }}>
            لا تشتري أدوات متفرقة — تلقا تك تبني لك منصة موحدة تشمل كل شيء
          </p>
        </motion.div>

        {/* ── Tab bar ── */}
        <div style={{ overflowX:'auto', paddingBottom:4, marginBottom:40,
          scrollbarWidth:'none', msOverflowStyle:'none' }}>
          <div style={{ display:'flex', gap:8, width:'max-content', margin:'0 auto' }}>
            {TABS.map(t => {
              const isActive = active === t.id;
              const f = FEATURES[t.id];
              return (
                <motion.button key={t.id} onClick={() => setActive(t.id)}
                  whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                  style={{ padding:'10px 18px', borderRadius:14, border:'none', cursor:'pointer',
                    display:'flex', alignItems:'center', gap:7,
                    background: isActive ? `${f.color}20` : 'rgba(255,255,255,0.04)',
                    outline: isActive ? `1.5px solid ${f.color}60` : '1.5px solid rgba(255,255,255,0.08)',
                    transition:'all 0.2s', flexShrink:0 }}>
                  <t.Icon size={15} strokeWidth={2} style={{ color: isActive ? f.color : 'rgba(255,255,255,0.4)', flexShrink:0 }} />
                  <span style={{ fontSize:12, fontWeight:800, fontFamily:'Cairo,sans-serif',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }}>
                    {t.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Feature panel ── */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
            transition={{ duration:0.28, ease:'easeOut' }}
            style={{ display:'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? 24 : 48,
              alignItems:'center',
              padding: isMobile ? '22px 18px' : '44px',
              borderRadius:28,
              background: feat.gradient,
              border:`1px solid ${feat.color}25`,
              boxShadow:`0 40px 100px ${feat.color}15` }}>

            {/* Text block */}
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:16,
                padding:'7px 16px', borderRadius:20, background:`${feat.color}18`, border:`1px solid ${feat.color}35` }}>
                <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11, fontWeight:800, color:feat.color, fontFamily:'Cairo,sans-serif' }}>
                  {(() => { const T = TABS.find(t=>t.id===active); return T ? <T.Icon size={12} strokeWidth={2} /> : null; })()}
                  {TABS.find(t=>t.id===active)?.label}
                </span>
              </div>
              <h3 style={{ fontWeight:900,
                fontSize: isMobile ? 'clamp(1.3rem,5vw,1.8rem)' : 'clamp(1.6rem,3vw,2.4rem)',
                color:'#fff', letterSpacing:'-0.04em', lineHeight:1.2, marginBottom:8 }}>
                {feat.title}
              </h3>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.5)', marginBottom:20, lineHeight:1.7 }}>
                {feat.subtitle}
              </p>
              <div style={{ display:'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap:8 }}>
                {feat.bullets.map((b,i) => (
                  <motion.div key={i}
                    initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
                    transition={{ delay:i*0.04 }}
                    style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'10px 12px',
                      borderRadius:12, background:'rgba(255,255,255,0.04)',
                      border:'1px solid rgba(255,255,255,0.06)' }}>
                    <Check size={13} strokeWidth={2.5} style={{ flexShrink:0, marginTop:2, color:feat.color }} />
                    <span style={{ fontSize:12, color:'rgba(255,255,255,0.8)',
                      lineHeight:1.55, fontFamily:'Cairo,sans-serif' }}>{b.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mockup — hidden on very small screens via visibility, always rendered */}
            <div style={{ display:'flex', justifyContent:'center',
              order: isMobile ? -1 : 0 }}>
              <feat.Visual />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom stats ── */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16, marginTop:40 }}>
          {[
            { n:'١٠',      label:'أنظمة متكاملة',           I: Layers,       c:'#A78BFA' },
            { n:'+٨٠',     label:'ميزة جاهزة فور التسليم',  I: Check,        c:'#34D399' },
            { n:'أسبوعان', label:'متوسط وقت التسليم',        I: CalendarDays, c:'#60A5FA' },
            { n:'٢٤/٧',    label:'دعم فني بعد الإطلاق',     I: MessageSquare,c:'#F59E0B' },
          ].map(s => (
            <div key={s.label} style={{ padding:'20px', borderRadius:18, textAlign:'center',
              background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display:'flex', justifyContent:'center', marginBottom:8 }}>
                <s.I size={22} strokeWidth={1.75} style={{ color:s.c }} />
              </div>
              <div style={{ fontSize:26, fontWeight:900, color:'#fff', letterSpacing:-1, lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:12, color:'var(--text2)', marginTop:6, fontFamily:'Cairo,sans-serif' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <a href="/talqa-tech/services"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.transform='none'; }}>
          شاهد المنصة كاملة ←
        </a>
      </div>
    </section>
  );
}
