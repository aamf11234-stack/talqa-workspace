import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TermIcon } from 'lucide-react';

const LINES = [
  { type: 'cmd',  text: 'npx create-tlga-app my-loyalty-program',     delay: 0 },
  { type: 'info', text: '✓ Creating project structure...',              delay: 800 },
  { type: 'info', text: '✓ Installing Apple Wallet SDK...',             delay: 1400 },
  { type: 'info', text: '✓ Setting up Push Notification service...',   delay: 2000 },
  { type: 'info', text: '✓ Configuring loyalty engine...',             delay: 2600 },
  { type: 'info', text: '✓ Building dashboard interface...',           delay: 3100 },
  { type: 'success',text:'✓ Project ready! Starting dev server...',    delay: 3700 },
  { type: 'blank', text: '',                                            delay: 4200 },
  { type: 'cmd',  text: 'tlga deploy --production',                    delay: 4400 },
  { type: 'info', text: '→ Building optimized bundle...',              delay: 5000 },
  { type: 'info', text: '→ Deploying to Saudi Arabia CDN...',          delay: 5600 },
  { type: 'info', text: '→ Provisioning Apple Pass certificates...',   delay: 6200 },
  { type: 'success',text:'✓ Live at your-brand.tlga.app',              delay: 6800 },
  { type: 'blank', text: '',                                            delay: 7200 },
  { type: 'result',text:'🚀 Your loyalty program is now live.',         delay: 7400 },
  { type: 'result',text:'   First customer joined via Apple Wallet ✓', delay: 8000 },
];

type LineType = { type: string; text: string; delay: number };

function TypedLine({ line, started }: { line: LineType; started: boolean }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!started) return;
    const t1 = setTimeout(() => {
      setVisible(true);
      if (!line.text) { setDone(true); return; }
      let i = 0;
      const speed = line.type === 'cmd' ? 28 : 8;
      const id = setInterval(() => {
        i++;
        setDisplayed(line.text.slice(0, i));
        if (i >= line.text.length) { clearInterval(id); setDone(true); }
      }, speed);
      return () => clearInterval(id);
    }, line.delay);
    return () => clearTimeout(t1);
  }, [started, line]);

  if (!visible) return null;

  const color =
    line.type === 'cmd'     ? '#fff' :
    line.type === 'success' ? '#34D399' :
    line.type === 'result'  ? '#4F8EFF' :
    'rgba(255,255,255,0.45)';
  const prefix =
    line.type === 'cmd' ? <span style={{ color: '#4F8EFF', marginLeft: 8 }}>$</span> : null;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 2, lineHeight: 1.8, color, fontFamily: '"JetBrains Mono", "Fira Code", monospace', fontSize: 12, direction: 'ltr' }}>
      {prefix}
      <span>{displayed}</span>
      {!done && line.text && <span style={{ display: 'inline-block', width: 7, height: 14, background: color, animation: 'blink-cur 0.9s infinite', verticalAlign: 'middle', marginRight: 2 }} />}
    </div>
  );
}

export default function Terminal() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding: '120px 0', background: 'var(--bg)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="terminal-grid">

          {/* Copy */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4F8EFF', marginBottom: 20 }}>البناء الاحترافي</div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.9rem,3.2vw,2.8rem)', letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: 20 }}>
              نبني بأحدث<br /><span className="text-blue">معايير الصناعة.</span>
            </h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.9, color: 'rgba(255,255,255,0.38)', marginBottom: 40, fontWeight: 500 }}>
              كل مشروع مبني على بنية تحتية متينة قابلة للتوسع — CDN سعودي الموقع، تشفير SSL، API RESTful، وأنظمة مصادقة من الجيل التالي.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { dot: '#4F8EFF', text: 'Cloud-native architecture قابل للتوسع' },
                { dot: '#34D399', text: 'Apple PassKit & Wallet API certified' },
                { dot: '#A78BFA', text: 'CI/CD pipeline وتحديثات تلقائية' },
                { dot: '#FB923C', text: 'Monitoring وتنبيهات لحظية على مدار الساعة' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: item.dot, boxShadow: `0 0 8px ${item.dot}` }} />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Terminal window */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }}>
            <div style={{ borderRadius: 18, overflow: 'hidden', background: '#0A0A0F', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 80px rgba(79,142,255,0.06)' }}>
              {/* Titlebar */}
              <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12, background: '#0E0E14' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#FF5F56','#FFBD2E','#27C93F'].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.8 }} />)}
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>
                  <TermIcon size={11} />
                  tlga-tech — terminal
                </div>
              </div>
              {/* Body */}
              <div style={{ padding: '24px 22px', minHeight: 360, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {LINES.map((line, i) => (
                  <TypedLine key={i} line={line} started={started} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @keyframes blink-cur { 0%,49%{opacity:1}50%,100%{opacity:0} }
        @media(max-width:900px){.terminal-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
