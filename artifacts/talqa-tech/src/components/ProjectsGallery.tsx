import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Wallet, Smartphone, LayoutDashboard, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 'brown-dose',
    title: 'Brown Dose',
    subtitle: 'تطبيق الولاء وApple Wallet',
    cat: 'Apple Wallet + App',
    desc: 'منظومة ولاء رقمية متكاملة لمحل قهوة — بطاقة Apple Wallet، لوحة تحكم، وإشعارات Push مخصصة.',
    color: '#C8996C',
    bg: 'linear-gradient(145deg, #1A120A, #0E0A06)',
    border: 'rgba(200,153,108,0.2)',
    icon: Wallet,
    tags: ['Apple PassKit', 'Push Notifications', 'Dashboard', 'QR Code'],
    screens: [
      { label: 'البطاقة', bg: 'linear-gradient(160deg,#1A120A,#2A1A0E)' },
      { label: 'النقاط',  bg: 'linear-gradient(160deg,#0E0A06,#1A120A)' },
    ],
    stat: { val: '٢٤٠٠+', label: 'عضو نشط' },
    link: '/brown-dose',
  },
  {
    id: 'clinic-demo',
    title: 'عيادات تلقا',
    subtitle: 'نظام إدارة طبي متكامل',
    cat: 'Web Platform + Mobile',
    desc: 'نظام عيادات شامل يغطي المواعيد، ملفات المرضى، وصفات الطبيب، وتحليلات تفصيلية للعيادة.',
    color: '#4F8EFF',
    bg: 'linear-gradient(145deg, #0A0E1A, #060A12)',
    border: 'rgba(79,142,255,0.2)',
    icon: LayoutDashboard,
    tags: ['React', 'Node.js', 'PostgreSQL', 'Mobile'],
    screens: [
      { label: 'المواعيد',  bg: 'linear-gradient(160deg,#0A0E1A,#0D1220)' },
      { label: 'المرضى',   bg: 'linear-gradient(160deg,#060A12,#0A0E1A)' },
    ],
    stat: { val: '١٥٠+', label: 'ميزة مدمجة' },
    link: '/clinic-demo',
  },
  {
    id: 'haeez',
    title: 'حيز',
    subtitle: 'تطبيق عضوية متعدد الفروع',
    cat: 'iOS & Android App',
    desc: 'تطبيق عضوية لسلسلة محلات — نظام نقاط متطور، مستويات عضوية، وإشعارات حية تُبقي العميل متفاعلاً.',
    color: '#A78BFA',
    bg: 'linear-gradient(145deg, #120A1A, #0A060E)',
    border: 'rgba(167,139,250,0.2)',
    icon: Smartphone,
    tags: ['React Native', 'iOS', 'Android', 'Loyalty System'],
    screens: [
      { label: 'الرئيسية', bg: 'linear-gradient(160deg,#120A1A,#1A0E24)' },
      { label: 'المكافآت', bg: 'linear-gradient(160deg,#0A060E,#120A1A)' },
    ],
    stat: { val: '٣', label: 'منصات' },
    link: '/haeez-loyalty',
  },
  {
    id: 'haiz-video',
    title: 'حيز — تعريفي',
    subtitle: 'فيديو تسويقي تفاعلي',
    cat: 'Motion Design',
    desc: 'فيديو تعريفي احترافي يشرح قيمة تطبيق حيز للعميل — مبني بـ React + Framer Motion بدون برامج خارجية.',
    color: '#34D399',
    bg: 'linear-gradient(145deg, #0A1A12, #060E0A)',
    border: 'rgba(52,211,153,0.2)',
    icon: Play,
    tags: ['Framer Motion', 'React', 'Motion Design', 'Export'],
    screens: [
      { label: 'الفيديو', bg: 'linear-gradient(160deg,#0A1A12,#0E2018)' },
      { label: 'الصادر', bg: 'linear-gradient(160deg,#060E0A,#0A1A12)' },
    ],
    stat: { val: '٦٠fps', label: 'جودة الإنتاج' },
    link: '/haiz-video',
  },
];

function PhoneMockup({ project }: { project: typeof PROJECTS[0] }) {
  const [screen, setScreen] = useState(0);
  const Icon = project.icon;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      {/* Phone */}
      <div style={{ width: 140, borderRadius: 28, background: '#111', border: '4px solid #1E1E28', boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 40px ${project.color}15`, overflow: 'hidden', position: 'relative' }}>
        {/* Notch */}
        <div style={{ height: 20, background: '#0A0A10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 44, height: 10, borderRadius: 10, background: '#000' }} />
        </div>
        {/* Screen */}
        <AnimatePresence mode="wait">
          <motion.div key={screen} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            style={{ height: 220, background: project.screens[screen].bg, padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{project.screens[screen].label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: `${project.color}15`, border: `1px solid ${project.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={12} color={project.color} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#fff' }}>{project.title}</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)' }}>{project.cat}</div>
              </div>
            </div>
            {/* Skeleton UI elements */}
            {[80, 60, 90, 50].map((w, i) => (
              <div key={i} style={{ height: i === 0 ? 30 : 10, borderRadius: 4, width: `${w}%`, background: i === 0 ? `${project.color}18` : 'rgba(255,255,255,0.06)', border: i === 0 ? `1px solid ${project.color}20` : 'none' }}>
                {i === 0 && <div style={{ height: '100%', display: 'flex', alignItems: 'center', padding: '0 8px' }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: project.color }}>{project.stat.val}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', marginRight: 6 }}>{project.stat.label}</div>
                </div>}
              </div>
            ))}
            {/* Mini chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 28, marginTop: 'auto' }}>
              {[40,65,50,80,70,90,75,60].map((h, i) => (
                <div key={i} style={{ flex: 1, borderRadius: '2px 2px 0 0', height: `${h}%`, background: i === 5 ? project.color : `${project.color}25` }} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Home bar */}
        <div style={{ height: 16, background: '#0A0A10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 40, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </div>
      {/* Screen toggle */}
      <div style={{ display: 'flex', gap: 5 }}>
        {project.screens.map((_, i) => (
          <button key={i} onClick={() => setScreen(i)}
            style={{ width: screen === i ? 18 : 6, height: 6, borderRadius: 99, border: 'none', cursor: 'pointer', background: screen === i ? project.color : 'rgba(255,255,255,0.15)', transition: 'all 0.3s' }} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsGallery() {
  const [active, setActive] = useState(0);
  const p = PROJECTS[active];

  return (
    <section style={{ padding: '120px 0', background: 'var(--bg3)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 400, borderRadius: '50%', background: `radial-gradient(ellipse, ${p.color}08, transparent 65%)`, filter: 'blur(60px)', pointerEvents: 'none', transition: 'background 0.8s' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4F8EFF', marginBottom: 16 }}>مشاريعنا الحقيقية</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,2.9rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1, marginBottom: 12 }}>
            برامج أطلقناها.<br /><span className="text-blue">عملاء يثقون بنا.</span>
          </motion.h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', maxWidth: 460, margin: '0 auto' }}>كل مشروع بُني من الصفر بمتطلبات حقيقية وأُطلق لمستخدمين حقيقيين.</p>
        </div>

        {/* Tab selector */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          {PROJECTS.map((proj, i) => (
            <button key={proj.id} onClick={() => setActive(i)}
              style={{ padding: '9px 18px', borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${active === i ? proj.color + '40' : 'rgba(255,255,255,0.08)'}`, background: active === i ? `${proj.color}10` : 'rgba(255,255,255,0.03)', color: active === i ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'all 0.25s' }}>
              {proj.title}
            </button>
          ))}
        </div>

        {/* Main card */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
            style={{ borderRadius: 24, border: `1px solid ${p.border}`, background: p.bg, overflow: 'hidden' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 0 }} className="proj-grid">
              {/* Content */}
              <div style={{ padding: 'clamp(28px,5vw,52px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ padding: '4px 12px', borderRadius: 6, background: `${p.color}14`, border: `1px solid ${p.color}30`, fontSize: 10, fontWeight: 700, color: p.color, letterSpacing: '0.1em' }}>{p.cat}</div>
                </div>
                <h3 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 10 }}>{p.title}</h3>
                <div style={{ fontSize: 15, color: `${p.color}88`, fontWeight: 600, marginBottom: 18 }}>{p.subtitle}</div>
                <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.42)', marginBottom: 32, maxWidth: 480, fontWeight: 500 }}>{p.desc}</p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 36 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 7, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>{t}</span>
                  ))}
                </div>

                {/* Stat */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                  <div style={{ padding: '16px 20px', borderRadius: 14, background: `${p.color}0A`, border: `1px solid ${p.color}20` }}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: p.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{p.stat.val}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4, fontWeight: 600 }}>{p.stat.label}</div>
                  </div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 11, background: `${p.color}14`, border: `1px solid ${p.color}30`, color: p.color, textDecoration: 'none', fontSize: 13, fontWeight: 700, transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${p.color}20`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${p.color}14`; }}>
                    <ExternalLink size={14} /> شاهد الديمو
                  </a>
                </div>
              </div>

              {/* Phone mockup */}
              <div style={{ padding: '40px 40px 40px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="proj-phone">
                <PhoneMockup project={p} />
              </div>
            </div>

            {/* Bottom nav */}
            <div style={{ borderTop: `1px solid ${p.border}`, padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => setActive((active - 1 + PROJECTS.length) % PROJECTS.length)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                <ChevronRight size={14} /> السابق
              </button>
              <div style={{ display: 'flex', gap: 6 }}>
                {PROJECTS.map((_, i) => (
                  <div key={i} style={{ width: active === i ? 20 : 6, height: 6, borderRadius: 99, background: active === i ? p.color : 'rgba(255,255,255,0.12)', transition: 'all 0.3s' }} />
                ))}
              </div>
              <button onClick={() => setActive((active + 1) % PROJECTS.length)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                التالي <ChevronLeft size={14} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media(max-width:768px){
          .proj-grid{grid-template-columns:1fr!important}
          .proj-phone{display:none!important}
        }
      `}</style>
    </section>
  );
}
