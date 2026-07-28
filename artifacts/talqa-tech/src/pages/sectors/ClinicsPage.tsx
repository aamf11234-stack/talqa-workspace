import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpLeft, CheckCircle2, MoveRight, Smartphone,
  CalendarDays, FileText, CreditCard, Bot, Pill, BarChart3,
  Star, PlayCircle, Crown, Stethoscope, ClipboardList,
} from 'lucide-react';
import PageLayout from '../PageLayout';
import { useIsMobile } from '../../hooks/useIsMobile';

const G = {
  green:  '#059669',
  teal:   '#10B981',
  grad:   'linear-gradient(135deg,#059669,#10B981)',
  gradSoft:'linear-gradient(135deg,rgba(5,150,105,0.15),rgba(16,185,129,0.07))',
  glow:   'rgba(16,185,129,0.25)',
  border: 'rgba(16,185,129,0.20)',
  dim:    'rgba(255,255,255,0.55)',
  dimmer: 'rgba(255,255,255,0.30)',
  bg:     '#010a06',
  bg2:    '#020d08',
};
const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أبي%20نظام%20ذكي%20لعيادتي';

const WA_SVG = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

const STATS = [
  { n: '+٣٠٠', label: 'عيادة ومستشفى' },
  { n: '٩٠٪', label: 'تحسن نسبة الحضور' },
  { n: 'صفر', label: 'تضارب في المواعيد' },
  { n: '٣×', label: 'سرعة في الإجراءات' },
];

const FEATURES = [
  { Icon: CalendarDays, color: '#059669', title: 'حجوزات بدون تضارب', sub: 'Smart Scheduling', desc: 'نظام ذكي يمنع تعارض المواعيد ويقسّم الوقت حسب تخصص كل طبيب تلقائياً.', size: 'large' },
  { Icon: FileText,     color: '#10B981', title: 'سجل طبي رقمي شامل', sub: 'Digital Records', desc: 'تاريخ المريض الكامل، الوصفات، التحاليل — في ثوانٍ أمام الطبيب.', size: 'large' },
  { Icon: CreditCard,   color: '#F59E0B', title: 'Apple & Google Wallet', sub: 'Appointment Pass', desc: 'تُرسل للمريض فور الحجز — تذكير تلقائي قبل ٢٤ ساعة وقبل ساعة.', size: 'medium' },
  { Icon: Bot,          color: '#8B5CF6', title: 'AI للتذكير والمتابعة', sub: 'Smart AI',         desc: 'واتساب تلقائي: تذكير موعد، نتيجة تحليل، موعد المتابعة القادم.', size: 'medium' },
  { Icon: Pill,         color: '#06B6D4', title: 'وصفات رقمية', sub: 'e-Prescription',   desc: 'وصفة رقمية موقّعة، متابعة الدواء، إشعار للصيدلية مباشرة.', size: 'medium' },
  { Icon: BarChart3,    color: '#EC4899', title: 'لوحة تحكم الأداء', sub: 'Live Analytics',  desc: 'إيراد اليوم، نسبة الحضور، أكثر التخصصات طلباً — كل شيء بلمسة.', size: 'medium' },
];

const ROLES = [
  { role: 'المالك', Icon: Crown,         color: '#F59E0B', url: '/clinic-demo/owner',     desc: 'إيرادات، أداء المركز، قرارات استراتيجية', features: ['إيرادات اليوم والشهر', 'نسبة إشغال الأطباء', 'تقارير المرضى الجدد', 'مقارنة الأداء بالشهر السابق'] },
  { role: 'الطبيب', Icon: Stethoscope,   color: '#10B981', url: '/clinic-demo/doctor',    desc: 'مرضى اليوم، وصفات، سجلات طبية',            features: ['جدول مواعيد اليوم', 'ملف المريض الكامل', 'إصدار الوصفات رقمياً', 'AI مساعد للتشخيص'] },
  { role: 'الاستقبال', Icon: ClipboardList, color: G.green, url: '/clinic-demo/reception', desc: 'حجوزات، تسجيل الوصول، إدارة الانتظار',       features: ['تسجيل وصول المريض', 'إدارة قائمة الانتظار', 'تأكيد الحجوزات', 'إشعارات تلقائية للمريض'] },
];

const PROBLEMS = [
  { icon: '📅', title: 'التضارب في المواعيد', desc: 'موعدان في نفس الوقت، مريض ينتظر ساعة — صورة لا تليق بالعيادة.' },
  { icon: '📋', title: 'الملفات الورقية كارثة', desc: 'ملف ضاع، معلومة ناقصة، طبيب ما يعرف تاريخ المريض في الزيارة الجديدة.' },
  { icon: '🔕', title: 'المريض ينسى موعده', desc: '٢٥٪ من المواعيد لا يحضرها المريض — خسارة مباشرة في الإيراد.' },
  { icon: '💰', title: 'متابعة الفواتير يدوياً', desc: 'فاتورة لم تُدفع، تأمين لم يُطالَب به — المال يضيع بدون نظام.' },
];

const PACKAGES = [
  { name: 'عيادة',     price: '٢٩٩٩', features: ['نظام مواعيد', 'Apple & Google Wallet', 'سجل رقمي بسيط', 'واتساب تلقائي', 'لوحة طبيب'], highlight: false },
  { name: 'مركز طبي', price: '٥٩٩٩', features: ['كل العيادة', 'سجل شامل', 'وصفات رقمية', 'تعدد الأطباء', 'فواتير التأمين', 'AI مساعد'], highlight: true },
  { name: 'مستشفى',   price: '١٢٠٠٠', features: ['كل شيء', 'API خارجي', 'تكامل HIS', 'مدير حساب مخصص', 'SLA طبي', 'تدريب كامل'], highlight: false },
];

function FeatureCard({ f, i }: { f: typeof FEATURES[0]; i: number }) {
  const [hov, setHov] = useState(false);
  const { Icon, color, title, sub, desc, size } = f;
  const lg = size === 'large';
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', height: '100%', cursor: 'default' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 22, padding: 1, background: hov ? `linear-gradient(135deg,${color},${color}55,transparent,${color}88)` : `linear-gradient(135deg,${color}22,transparent,${color}11)`, transition: 'background 0.4s', zIndex: 0 }}>
        <div style={{ borderRadius: 21, height: '100%', background: 'linear-gradient(145deg,#020e07,#010a05)' }} />
      </div>
      <div style={{ position: 'absolute', top: -50, right: -30, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle,${color}${hov?'20':'0e'} 0%,transparent 70%)`, pointerEvents: 'none', zIndex: 0, transition: 'background 0.4s' }} />
      <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: lg ? '32px 28px' : '24px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <motion.div animate={{ boxShadow: hov ? `0 0 22px ${color}50` : `0 0 0 transparent` }} transition={{ duration: 0.3 }}
            style={{ width: lg ? 52 : 44, height: lg ? 52 : 44, borderRadius: lg ? 15 : 13, background: `${color}18`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={lg ? 24 : 20} strokeWidth={1.6} color={color} />
          </motion.div>
          <span style={{ padding: '4px 10px', borderRadius: 99, background: `${color}14`, border: `1px solid ${color}28`, fontSize: 9, fontWeight: 800, color, letterSpacing: '0.06em' }}>{sub}</span>
        </div>
        <h3 style={{ fontSize: lg ? 20 : 16, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.025em', lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontSize: lg ? 13.5 : 12.5, color: 'rgba(255,255,255,0.46)', lineHeight: 1.75, margin: 0, flex: 1, fontFamily: 'Cairo,sans-serif' }}>{desc}</p>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${color},transparent)`, opacity: hov ? 0.7 : 0.2, transition: 'opacity 0.3s' }} />
    </motion.div>
  );
}

export default function ClinicsPage() {
  const m = useIsMobile();

  return (
    <PageLayout accent={G.green}>

      {/* ══ HERO ══ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: G.bg }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 700, height: 700, borderRadius: '50%', background: G.green, filter: 'blur(220px)', opacity: 0.07 }} />
          <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: G.teal, filter: 'blur(200px)', opacity: 0.05 }} />
          {/* Grid pattern */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, ${G.green}18 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.4 }} />
        </div>
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 700, height: 700, borderRadius: '50%', background: G.green, filter: 'blur(220px)', opacity: 0.06 }} />
        </div>

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: m ? '120px 20px 80px' : 'clamp(120px,12vw,160px) clamp(24px,5vw,80px) 80px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 48 : 80, alignItems: 'center' }}>

            {/* Text */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
                <span style={{ fontSize: 22 }}>🏥</span>
                <span style={{ fontWeight: 700, fontSize: 11, color: G.teal, letterSpacing: 2.5, textTransform: 'uppercase' }}>نظام العيادة الذكي</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.7 }}
                style={{ fontWeight: 900, fontSize: 'clamp(3rem,5.5vw,5rem)', letterSpacing: '-0.045em', lineHeight: 1.0, marginBottom: 28, fontFamily: 'Cairo,sans-serif' }}>
                <span style={{ display: 'block', color: '#fff' }}>عيادتك تستاهل</span>
                <span style={{ display: 'block', background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>مستوى تقني أعلى</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                style={{ fontSize: 17, color: G.dim, lineHeight: 1.85, marginBottom: 40, maxWidth: 480, fontFamily: 'Cairo,sans-serif', fontWeight: 500 }}>
                نظام حجوزات طبية، سجلات مرضى رقمية، Apple & Google Wallet للمرضى، وتذكير تلقائي — كل شيء في منظومة واحدة.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.20 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
                {['• حجوزات بدون تضارب', '• سجل طبي رقمي', '• Apple Wallet للمرضى', '• AI تذكير تلقائي'].map((t, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', padding: '7px 14px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.70)', fontFamily: 'Cairo,sans-serif' }}>{t}</span>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
                <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 28px', borderRadius: 14, background: G.grad, color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 15, fontWeight: 900, textDecoration: 'none', boxShadow: `0 12px 40px ${G.glow}` }}>
                  <PlayCircle size={18} strokeWidth={2} />
                  جرّب الديمو الآن
                </a>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '16px 24px', borderRadius: 14, background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
                  {WA_SVG} واتساب
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                style={{ display: 'flex', gap: 0, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                {['تسليم أسبوعين', 'دعم ٣ أشهر', 'بدون عقود'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, paddingRight: 24, marginRight: 24, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                    <CheckCircle2 size={12} strokeWidth={2.5} color={G.teal} />
                    <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 12, color: G.dimmer }}>{t}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Demo roles — hero right side */}
            {!m && (
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: G.teal, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>ادخل كـ…</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {ROLES.map((r, i) => (
                    <motion.a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px', borderRadius: 18, background: `${r.color}10`, border: `1px solid ${r.color}28`, textDecoration: 'none', transition: 'all 0.25s' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `${r.color}20`; el.style.borderColor = `${r.color}50`; el.style.transform = 'translateX(-6px)'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = `${r.color}10`; el.style.borderColor = `${r.color}28`; el.style.transform = 'none'; }}>
                      <div style={{ width: 50, height: 50, borderRadius: 16, background: `${r.color}20`, border: `1px solid ${r.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <r.Icon size={24} strokeWidth={1.6} color={r.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 16, color: '#fff', marginBottom: 4 }}>دخول كـ {r.role}</div>
                        <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 12, color: G.dim }}>{r.desc}</div>
                      </div>
                      <ArrowUpLeft size={16} strokeWidth={2} color={r.color} />
                    </motion.a>
                  ))}
                </div>
                <div style={{ marginTop: 16, padding: '12px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', fontSize: 12, color: G.dimmer, fontFamily: 'Cairo,sans-serif', textAlign: 'center' }}>
                  كل دخول يُظهر واجهة مختلفة تماماً
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: G.bg2 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: `0 clamp(24px,5vw,80px)` }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)' }}>
            {STATS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ padding: m ? '32px 20px' : '52px 32px', borderRight: m ? (i%2===0?'1px solid rgba(255,255,255,0.06)':'none') : (i<3?'1px solid rgba(255,255,255,0.06)':'none'), borderBottom: m&&i<2?'1px solid rgba(255,255,255,0.06)':'none', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 32, width: 28, height: 2, background: G.grad, borderRadius: 1 }} />
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 'clamp(2.8rem,3.5vw,4rem)', letterSpacing: -2, lineHeight: 1, marginBottom: 10, background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.n}</div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 13, color: G.dim }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DEMO ROLES SECTION (mobile + desktop full) ══ */}
      <section style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,80px)', background: G.bg, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse,${G.glow} 0%,transparent 65%)`, opacity: 0.3, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: G.green, boxShadow: `0 0 8px ${G.glow}` }} />
              <span style={{ fontWeight: 700, fontSize: 11, color: G.teal, letterSpacing: 2.5, textTransform: 'uppercase' }}>LIVE DEMO</span>
            </div>
            <h2 style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 14 }}>
              ثلاث واجهات — واحدة لكل دور
            </h2>
            <p style={{ fontSize: 15, color: G.dim, maxWidth: 480, margin: '0 auto', lineHeight: 1.8, fontFamily: 'Cairo,sans-serif' }}>
              جرّب الديمو من زاوية المالك، الطبيب، أو الاستقبال — كل دخول تجربة مختلفة كاملة.
            </p>
          </motion.div>

          <div className="clinic-roles" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {ROLES.map((r, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
                style={{ position: 'relative', borderRadius: 24, overflow: 'hidden' }}>

                {/* Gradient border */}
                <div style={{ position: 'absolute', inset: 0, borderRadius: 24, padding: 1, background: `linear-gradient(135deg,${r.color}40,transparent,${r.color}20)`, zIndex: 0 }}>
                  <div style={{ borderRadius: 23, height: '100%', background: `linear-gradient(145deg,${r.color}0e,${G.bg2})` }} />
                </div>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${r.color},${r.color}44)`, zIndex: 1 }} />

                <div style={{ position: 'relative', zIndex: 1, padding: '32px 28px' }}>
                  <div style={{ width: 60, height: 60, borderRadius: 20, background: `${r.color}20`, border: `1px solid ${r.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: `0 8px 24px ${r.color}25` }}>
                    <r.Icon size={28} strokeWidth={1.5} color={r.color} />
                  </div>
                  <h3 style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 22, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>لوحة {r.role}</h3>
                  <p style={{ fontFamily: 'Cairo,sans-serif', fontSize: 13.5, color: G.dim, lineHeight: 1.75, marginBottom: 24 }}>{r.desc}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
                    {r.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <CheckCircle2 size={13} strokeWidth={2.5} color={r.color} style={{ flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Cairo,sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <a href={r.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', borderRadius: 14, background: `linear-gradient(135deg,${r.color},${r.color}bb)`, color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 900, textDecoration: 'none', boxShadow: `0 8px 28px ${r.color}35` }}>
                    <PlayCircle size={16} strokeWidth={2} />
                    ادخل كـ {r.role}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: G.bg2 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: G.green, boxShadow: `0 0 8px ${G.glow}` }} />
                <span style={{ fontWeight: 700, fontSize: 11, color: G.teal, letterSpacing: 2.5, textTransform: 'uppercase' }}>FEATURES</span>
              </div>
              <h2 style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,3rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                منظومة طبية متكاملة<br />لعيادتك
              </h2>
            </div>
            <p style={{ fontFamily: 'Cairo,sans-serif', fontSize: 15, color: G.dim, maxWidth: 340, lineHeight: 1.8, fontWeight: 500 }}>
              مش مجرد نظام مواعيد — منظومة كاملة من الحجز حتى المتابعة.
            </p>
          </div>
          <div className="clinic-feat-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            {FEATURES.filter(f => f.size === 'large').map((f, i) => (
              <div key={f.title} style={{ height: 250 }}><FeatureCard f={f} i={i} /></div>
            ))}
          </div>
          <div className="clinic-feat-med" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
            {FEATURES.filter(f => f.size === 'medium').map((f, i) => (
              <div key={f.title} style={{ height: 220 }}><FeatureCard f={f} i={i+2} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROBLEMS ══ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: G.bg, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 2fr', gap: m ? 32 : 80, alignItems: 'start' }}>
            <div style={{ position: m ? 'static' : 'sticky', top: 120 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: G.green, boxShadow: `0 0 8px ${G.glow}` }} />
                <span style={{ fontWeight: 700, fontSize: 11, color: G.teal, letterSpacing: 2.5, textTransform: 'uppercase' }}>CHALLENGES</span>
              </div>
              <h2 style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,3vw,2.8rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 16 }}>
                نفهم العيادات<br />قبل ما تشرح
              </h2>
              <p style={{ fontFamily: 'Cairo,sans-serif', fontSize: 14, color: G.dim, lineHeight: 1.8, fontWeight: 500 }}>
                المشاكل اللي تواجهها كل يوم — نحلّها من جذورها.
              </p>
            </div>
            <div>
              {PROBLEMS.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ display: 'flex', gap: 32, alignItems: 'flex-start', padding: '36px 0', borderBottom: i < PROBLEMS.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <div style={{ fontWeight: 900, fontSize: 'clamp(2rem,2.5vw,2.8rem)', color: 'rgba(5,150,105,0.20)', letterSpacing: -1, lineHeight: 1, flexShrink: 0, width: 64, fontFamily: 'sans-serif' }}>0{i+1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 18, color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>{p.title}</div>
                    <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 14, color: G.dim, lineHeight: 1.8, fontWeight: 500 }}>{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIAL ══ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: G.bg2 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={18} strokeWidth={0} fill="#F59E0B" color="#F59E0B" />)}
            </div>
            <p style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: '#fff', lineHeight: 1.6, marginBottom: 32, letterSpacing: '-0.02em' }}>
              "كان لدينا ٣٠٪ من المرضى لا يحضرون — بعد نظام تلقا صار ٥٪ فقط، وإيراد العيادة زاد ٤٥٪ في ٦ أشهر."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0, background: G.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 16, color: '#fff' }}>ن</div>
              <div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 15, color: '#fff' }}>د. نورة الزهراني</div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 12, color: G.dim, marginTop: 2 }}>طبيبة ومديرة مركز طبي | الرياض</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: G.bg, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: G.green, boxShadow: `0 0 8px ${G.glow}` }} />
              <span style={{ fontWeight: 700, fontSize: 11, color: G.teal, letterSpacing: 2.5, textTransform: 'uppercase' }}>PRICING</span>
            </div>
            <h2 style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,3rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1 }}>اختر الباقة المناسبة</h2>
          </div>
          <div className="clinic-packages" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {PACKAGES.map((pkg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.10 }}
                style={{ position: 'relative', borderRadius: 24, padding: 'clamp(28px,4vw,40px)', background: pkg.highlight ? G.gradSoft : 'rgba(255,255,255,0.03)', border: `1px solid ${pkg.highlight ? G.border : 'rgba(255,255,255,0.07)'}`, overflow: 'hidden' }}>
                {pkg.highlight && (
                  <>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: G.grad }} />
                    <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', background: G.grad, color: '#fff', fontSize: 9, fontWeight: 900, padding: '4px 12px', borderRadius: 99, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>الأكثر طلباً</div>
                  </>
                )}
                <div style={{ marginBottom: 8, marginTop: pkg.highlight ? 20 : 0, fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 12, color: G.dim }}>{pkg.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 28 }}>
                  <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 'clamp(2.4rem,4vw,3.2rem)', lineHeight: 1, background: pkg.highlight ? G.grad : 'none', WebkitBackgroundClip: pkg.highlight ? 'text' : 'unset', WebkitTextFillColor: pkg.highlight ? 'transparent' : '#fff', backgroundClip: pkg.highlight ? 'text' : 'unset', color: pkg.highlight ? 'transparent' : '#fff' }}>{pkg.price}</span>
                  <span style={{ fontSize: 12, color: G.dim, fontFamily: 'Cairo,sans-serif' }}>ريال / شهر</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                  {pkg.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={14} strokeWidth={2.5} color={pkg.highlight ? G.teal : 'rgba(255,255,255,0.35)'} style={{ flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Cairo,sans-serif', fontSize: 13, fontWeight: 600, color: pkg.highlight ? 'rgba(255,255,255,0.80)' : G.dim }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', borderRadius: 13, background: pkg.highlight ? G.grad : 'rgba(255,255,255,0.06)', border: pkg.highlight ? 'none' : '1px solid rgba(255,255,255,0.10)', color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 900, textDecoration: 'none', boxShadow: pkg.highlight ? `0 8px 32px ${G.glow}` : 'none' }}>
                  {WA_SVG} ابدأ على واتساب
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={{ padding: 'clamp(100px,12vw,160px) clamp(24px,5vw,80px)', background: G.bg2, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse,rgba(5,150,105,0.08) 0%,transparent 65%)` }} />
        </div>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr auto', gap: m ? 32 : 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 11, color: G.teal, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 20 }}>ابدأ اليوم</div>
              <h2 style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 'clamp(2.4rem,4.5vw,4rem)', color: '#fff', letterSpacing: '-0.045em', lineHeight: 1.05 }}>
                مستعد تطوّر<br />
                <span style={{ background: G.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>عيادتك؟</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              <a href="/clinic-demo/" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 36px', borderRadius: 16, background: G.grad, color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 16, fontWeight: 900, textDecoration: 'none', boxShadow: `0 16px 48px ${G.glow}` }}>
                <PlayCircle size={18} strokeWidth={2} /> جرّب الديمو أولاً
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 32px', borderRadius: 14, background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
                {WA_SVG} تواصل على واتساب
              </a>
            </div>
          </div>
          <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 13, color: G.dimmer, fontWeight: 500 }}>تلقا تك · نحوّل الأفكار التجارية إلى حلول رقمية</div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {['تحليل مجاني', 'تسليم أسبوعين', 'دعم ٣ أشهر', 'بدون عقود'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={11} strokeWidth={2.5} color={G.teal} />
                  <span style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 12, color: G.dimmer }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .clinic-roles       { grid-template-columns: 1fr !important; }
          .clinic-feat-hero   { grid-template-columns: 1fr !important; }
          .clinic-feat-med    { grid-template-columns: repeat(2,1fr) !important; }
          .clinic-packages    { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .clinic-feat-med    { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageLayout>
  );
}
