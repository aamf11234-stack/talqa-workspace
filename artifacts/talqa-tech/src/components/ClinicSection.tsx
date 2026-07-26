import { motion } from 'framer-motion';
import { ExternalLink, Calendar, FileText, Pill, BarChart3, Smartphone, Wifi } from 'lucide-react';

const DEMO_URL = '/clinic-demo/';
const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أريد%20أعرف%20أكثر%20عن%20نظام%20إدارة%20العيادات';

const FEATURES = [
  { icon: Calendar,  label: 'إدارة المواعيد',    desc: 'جدول يومي وأسبوعي مع تذكيرات واتساب تلقائية للمرضى' },
  { icon: FileText,  label: 'ملفات المرضى',      desc: 'سجل طبي كامل — تاريخ الزيارات، التشخيصات، الصور' },
  { icon: Pill,      label: 'الوصفات الطبية',    desc: 'وصفات رقمية تُرسل للمريض مباشرةً على هاتفه' },
  { icon: BarChart3, label: 'تقارير وإحصائيات', desc: 'أرباح يومية وشهرية، أكثر المرضى حضوراً، نسبة الإلغاءات' },
  { icon: Smartphone,label: 'تطبيق iOS وAndroid','desc': 'الطبيب يرى مواعيده ويضيف ملاحظات من أي مكان' },
  { icon: Wifi,      label: 'يعمل بدون إنترنت',  desc: 'البيانات تُحفظ محلياً وتتزامن عند الاتصال' },
];

/* ── Mini clinic screen mockup ── */
function ClinicMockup() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 480, margin: '0 auto' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', inset: '-40px', background: 'radial-gradient(ellipse, rgba(79,142,255,0.12) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

      {/* Main screen — appointments list */}
      <motion.div
        initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ borderRadius: 20, border: '1px solid rgba(79,142,255,0.2)', background: 'linear-gradient(145deg,#0C1020,#080C18)', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,142,255,0.08)' }}>

        {/* Header bar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(79,142,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(79,142,255,0.15)', border: '1px solid rgba(79,142,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏥</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>عيادة تلقا</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399', display: 'inline-block' }} />
                متصل
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(79,142,255,0.8)', background: 'rgba(79,142,255,0.1)', padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(79,142,255,0.2)' }}>
            الأحد، ٢٧ يوليو
          </div>
        </div>

        {/* Appointments */}
        <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', marginBottom: 4 }}>مواعيد اليوم — ٦ مرضى</div>

          {[
            { time: '9:00',  name: 'أحمد محمد الزهراني',   type: 'كشف',      status: 'حضر',   color: '#34D399' },
            { time: '10:30', name: 'سارة عبدالله العمري',  type: 'متابعة',    status: 'قادم',  color: '#4F8EFF' },
            { time: '11:15', name: 'خالد سعد الغامدي',     type: 'استشارة',   status: 'قادم',  color: '#4F8EFF' },
            { time: '12:00', name: 'نورة فيصل القحطاني',   type: 'كشف',      status: 'لم يحضر', color: '#F87171' },
            { time: '2:00',  name: 'عبدالرحمن علي الشهري', type: 'إجراء',     status: 'قادم',  color: '#4F8EFF' },
          ].map((a, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 11, background: i === 1 ? 'rgba(79,142,255,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${i === 1 ? 'rgba(79,142,255,0.2)' : 'rgba(255,255,255,0.05)'}` }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.5)', minWidth: 36, textAlign: 'center' }}>{a.time}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{a.type}</div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 5, background: `${a.color}14`, color: a.color, border: `1px solid ${a.color}25`, flexShrink: 0 }}>{a.status}</span>
            </motion.div>
          ))}
        </div>

        {/* Stats footer */}
        <div style={{ margin: '0 20px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0 }}>
          {[['١٢٤', 'مريض هذا الشهر'], ['٩٢٪', 'نسبة الحضور'], ['٢٤٠٠ر', 'إيرادات اليوم']].map(([v, l], i) => (
            <div key={i} style={{ textAlign: 'center', padding: '4px 0', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#4F8EFF', letterSpacing: '-0.02em' }}>{v}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', marginTop: 2, fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating patient card */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }} whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}
        animate={{ y: [0, -6, 0] }}
        // @ts-ignore
        transition2={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: -20, right: -20, width: 190, borderRadius: 14, border: '1px solid rgba(79,142,255,0.25)', background: 'rgba(10,14,32,0.92)', backdropFilter: 'blur(20px)', padding: '14px 16px', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(79,142,255,0.7)', marginBottom: 8, textTransform: 'uppercase' }}>ملف المريض</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#4F8EFF,#3B78FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>س</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>سارة العمري</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>٢٨ سنة · متابعة</div>
          </div>
        </div>
        {[['آخر زيارة:', 'الأسبوع الماضي'], ['الوصفة:', 'مُرسلة ✓'], ['الحالة:', 'مستقرة']].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,0.4)', padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>{k}</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ClinicSection() {
  return (
    <section id="clinic" style={{ padding: 'clamp(80px,10vw,130px) 0', background: '#060608', position: 'relative', overflow: 'hidden' }}>
      {/* Background accent */}
      <div style={{ position: 'absolute', top: '50%', right: '10%', transform: 'translateY(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(79,142,255,0.07) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <div className="clinic-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>

          {/* ── Left: Text ── */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>

            {/* Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(79,142,255,0.12)', border: '1px solid rgba(79,142,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🏥</div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4F8EFF', letterSpacing: '0.1em', textTransform: 'uppercase' }}>نظام إدارة العيادات</span>
            </div>

            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.9rem,3.8vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: 16 }}>
              عيادتك تستحق<br />
              <span className="text-blue">نظاماً يشتغل بدلاً عنك.</span>
            </h2>

            <p style={{ fontSize: 'clamp(14px,1.5vw,16px)', fontWeight: 500, color: 'rgba(255,255,255,0.42)', lineHeight: 1.85, maxWidth: 420, marginBottom: 36 }}>
              من حجز الموعد حتى إرسال الوصفة — كل شيء في نظام واحد. يعمل على الجوال والكمبيوتر، بدون تدريب، ويوفّر لك ساعات يومياً.
            </p>

            {/* Features grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 36 }}>
              {FEATURES.map(({ icon: Icon, label, desc }) => (
                <div key={label} style={{ padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,142,255,0.25)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'}>
                  <Icon size={15} color="#4F8EFF" style={{ marginBottom: 6 }} />
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)', lineHeight: 1.6 }}>{desc}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
                className="btn-blue"
                style={{ padding: '14px 28px', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none', position: 'relative', overflow: 'hidden', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                <span className="holo-shimmer" />
                <ExternalLink size={14} /> شاهد الديمو الآن ←
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="btn-ghost"
                style={{ padding: '14px 24px', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, position: 'relative', overflow: 'hidden' }}>
                <span className="holo-shimmer" />
                اطلب عرضاً لعيادتك
              </a>
            </div>

            {/* Live badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 8px #34D399', animation: 'clinic-pulse 2s infinite' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>الديمو يعمل الآن — شاهده على أي جهاز بدون تسجيل</span>
            </div>
          </motion.div>

          {/* ── Right: Mockup ── */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', paddingBottom: 28 }}>
            <ClinicMockup />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes clinic-pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
        @media(max-width:768px) {
          .clinic-grid { grid-template-columns: 1fr !important; }
          .clinic-grid > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}
