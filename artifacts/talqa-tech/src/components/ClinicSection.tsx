import { motion } from 'framer-motion';
import { ExternalLink, Calendar, FileText, Pill, BarChart3, Smartphone, Wifi } from 'lucide-react';

const DEMO_URL = '/clinic-demo/';
const WA = 'https://wa.me/966551378531?text=أريد%20أعرف%20أكثر%20عن%20نظام%20إدارة%20العيادات';

const FEATURES = [
  { icon: Calendar,   color: '#3B82F6', label: 'إدارة المواعيد',   desc: 'جدول يومي وأسبوعي مع تذكيرات واتساب تلقائية للمرضى' },
  { icon: FileText,   color: '#8B5CF6', label: 'ملفات المرضى',     desc: 'سجل طبي كامل — تاريخ الزيارات، التشخيصات، الصور' },
  { icon: Pill,       color: '#10B981', label: 'الوصفات الطبية',   desc: 'وصفات رقمية تُرسل للمريض مباشرةً على هاتفه' },
  { icon: BarChart3,  color: '#F59E0B', label: 'تقارير وإحصائيات', desc: 'أرباح يومية وشهرية، أكثر المرضى حضوراً، نسبة الإلغاءات' },
  { icon: Smartphone, color: '#EC4899', label: 'تطبيق iOS وAndroid', desc: 'الطبيب يرى مواعيده ويضيف ملاحظات من أي مكان' },
  { icon: Wifi,       color: '#06B6D4', label: 'يعمل بدون إنترنت',  desc: 'البيانات تُحفظ محلياً وتتزامن عند الاتصال' },
];

const APPTS = [
  { name: 'سارة الأحمدي',  time: '٩:٠٠ ص',  type: 'فحص عام',      status: 'قادم',     color: '#3B82F6' },
  { name: 'محمد القحطاني', time: '١٠:٣٠ ص', type: 'متابعة',        status: 'مكتمل',    color: '#10B981' },
  { name: 'نورة السعيد',   time: '١١:٠٠ ص', type: 'استشارة',      status: 'قادم',     color: '#3B82F6' },
  { name: 'فهد العتيبي',   time: '٢:٠٠ م',  type: 'أشعة',         status: 'ملغي',     color: '#EF4444' },
  { name: 'ريم الحربي',    time: '٣:٣٠ م',  type: 'متابعة علاج',  status: 'قادم',     color: '#3B82F6' },
];

function ClinicMockup() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 500, margin: '0 auto' }}>
      <div style={{ position: 'absolute', inset: '-40px', background: 'radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        style={{ borderRadius: 20, border: '1px solid rgba(59,130,246,0.2)', background: 'linear-gradient(145deg,#08111f,#050c18)', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>

        {/* Header */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(59,130,246,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>🏥</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>عيادة الرعاية</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} className="pulse-dot" /> متصل
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ val: '٦', label: 'مواعيد', c: '#3B82F6' }, { val: '٢', label: 'قادمة', c: '#F59E0B' }].map(({ val, label, c }) => (
              <div key={label} style={{ textAlign: 'center', padding: '4px 10px', borderRadius: 8, background: `${c}15`, border: `1px solid ${c}30` }}>
                <div style={{ fontSize: 14, fontWeight: 900, color: c }}>{val}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments */}
        <div style={{ padding: '14px 20px 20px' }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: 10, textTransform: 'uppercase' }}>مواعيد اليوم</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {APPTS.map(({ name, time, type, status, color }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', transition: 'background 0.2s' }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color, flexShrink: 0 }}>{name[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{type}</div>
                </div>
                <div style={{ textAlign: 'left', flexShrink: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>{time}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color, background: `${color}15`, padding: '2px 6px', borderRadius: 4, marginTop: 2 }}>{status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue bar */}
        <div style={{ margin: '0 20px 20px', padding: '12px 16px', borderRadius: 12, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>إيرادات اليوم</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#10B981' }}>١٢٠٠ ر.س</div>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>نسبة الرضا</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#F59E0B' }}>٩٧٪</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ClinicSection() {
  return (
    <section id="clinic" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 600, height: 600, top: '20%', left: '-10%', background: 'rgba(59,130,246,0.08)', animationDelay: '-4s' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ color: '#3B82F6', borderColor: 'rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.08)' }}>للعيادات والمراكز</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            نظام إدارة عيادات{' '}
            <span style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>متكامل</span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 16, marginTop: 14, maxWidth: 480, margin: '14px auto 0' }}>
            مواعيد، ملفات، وصفات، وتقارير — كل شيء في مكان واحد للطبيب والمريض.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52, alignItems: 'center' }}>
          {/* Left: mockup */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <ClinicMockup />
          </motion.div>

          {/* Right: features */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 32 }}>
              {FEATURES.map(({ icon: Icon, color, label, desc }) => (
                <div key={label} style={{ padding: '16px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}25`, display: 'flex', flexDirection: 'column', gap: 10, transition: 'box-shadow 0.25s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${color}18`}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={color} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.65 }}>{desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 12, background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 0 28px rgba(59,130,246,0.35)', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'none'}>
                <ExternalLink size={14} /> شاهد الديمو الحي
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: 14 }}>
                احصل على عرض ←
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px) {
          #clinic > div > div:last-child { grid-template-columns: 1fr !important; }
          #clinic > div > div:last-child > div:first-child { order: 1; }
        }
      `}</style>
    </section>
  );
}
