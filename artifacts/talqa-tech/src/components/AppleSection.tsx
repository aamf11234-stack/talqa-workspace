import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Bell, Watch, RefreshCw } from 'lucide-react';
import { SiApple } from 'react-icons/si';

const feats = [
  { Icon: Wallet,    title: 'بطاقة ولاء رقمية',      desc: 'تُضاف مباشرةً لمحفظة Apple Wallet. لا تطبيق، لا حساب، بلمسة واحدة.' },
  { Icon: Bell,      title: 'Push Notifications مجانية', desc: 'أرسل عروضاً مخصصة على شاشة العميل — بدون فتح أي تطبيق.' },
  { Icon: Watch,     title: 'تكامل Apple Watch',     desc: 'رصيد النقاط وكود QR متاحان على معصم العميل في ثانية.' },
  { Icon: RefreshCw, title: 'تحديث لحظي تلقائي',    desc: 'النقاط ومستوى العضوية تتحدثان بعد كل زيارة. صفر تدخل يدوي.' },
];

/* 3-D tilt card */
function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shine: { x: 50, y: 50 } });
  const [hovered, setHovered] = useState(false);

  function onMove(e: React.MouseEvent) {
    const el = cardRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width  - 0.5;   // -0.5 to 0.5
    const ny = (e.clientY - r.top)  / r.height - 0.5;
    setTilt({ x: ny * -16, y: nx * 16, shine: { x: (nx + 0.5) * 100, y: (ny + 0.5) * 100 } });
  }
  function onLeave() { setTilt({ x: 0, y: 0, shine: { x: 50, y: 50 } }); setHovered(false); }

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={e => { setHovered(true); onMove(e); }}
        onMouseLeave={onLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        style={{
          width: 290, borderRadius: 28, padding: '28px 24px',
          background: 'linear-gradient(145deg, #111118, #1A1A24)',
          border: '1px solid rgba(79,142,255,0.18)',
          boxShadow: hovered
            ? '0 40px 80px rgba(0,0,0,0.5), 0 0 80px rgba(79,142,255,0.12)'
            : '0 24px 60px rgba(0,0,0,0.4)',
          position: 'relative', overflow: 'hidden',
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Shine layer */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 28, pointerEvents: 'none', zIndex: 10,
          background: `radial-gradient(circle at ${tilt.shine.x}% ${tilt.shine.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        }} />

        {/* Card content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 6 }}>MEMBERSHIP CARD</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>منشأتك هنا</div>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SiApple size={16} color="rgba(255,255,255,0.5)" />
            </div>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 8, marginBottom: 24, background: 'rgba(79,142,255,0.1)', border: '1px solid rgba(79,142,255,0.25)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F8EFF', boxShadow: '0 0 8px #4F8EFF' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4F8EFF' }}>Gold Member</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginBottom: 4 }}>رصيد النقاط</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>٢٬٤٥٠</div>
              <div style={{ fontSize: 11, color: '#4F8EFF', marginTop: 4, fontWeight: 600 }}>نقطة متاحة</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, width: 52, height: 52, padding: 6, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {[...Array(16)].map((_,j)=>(
                <div key={j} style={{ borderRadius: 1, background: [0,1,4,5,2,7,8,13,15,10,11,14].includes(j) ? 'rgba(255,255,255,0.5)' : 'transparent' }} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, height: 3, borderRadius: '0 0 28px 28px', background: 'linear-gradient(to left, #4F8EFF, #3B78FF)' }} />
      </motion.div>
    </div>
  );
}

export default function AppleSection() {
  return (
    <section id="apple" style={{ padding: '120px 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', top: '50%', right: '-5%', transform: 'translateY(-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,255,0.07) 0%, transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="apple-grid">

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 8, marginBottom: 28, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <SiApple size={13} color="rgba(255,255,255,0.6)" />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Apple Ecosystem</span>
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.9rem,3.5vw,2.9rem)', letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: 20 }}>
              تجربة عميل<br /><span className="text-blue">من مستوى آخر.</span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.42)', marginBottom: 48, fontWeight: 500 }}>
              نوظّف أحدث تقنيات Apple لتمنح عملاءك تجربة انسيابية تجعلهم يتذكرون براندك في كل لحظة — بدون احتكاك، بدون تعقيد.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              {feats.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(79,142,255,0.1)', color: '#4F8EFF', border: '1px solid rgba(79,142,255,0.15)' }}>
                    <f.Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{f.title}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.38)' }}>{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D Card */}
          <motion.div initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', padding: '60px 0' }}>
            {[380, 300, 220].map((size, i) => (
              <div key={i} style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', border: `1px solid rgba(79,142,255,${0.07 - i * 0.02})`, pointerEvents: 'none' }} />
            ))}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <TiltCard />
              {/* Floating notification */}
              <motion.div animate={{ y: [0,-8,0], x: [0,4,0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                style={{ position: 'absolute', top: -16, left: -40, padding: '12px 14px', borderRadius: 14, background: '#0E0E14', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 28px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', gap: 10, zIndex: 5 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(79,142,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bell size={13} color="#4F8EFF" /></div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 2 }}>عرض خاص 🎉</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', fontWeight: 500 }}>خصم ٢٠٪ لعملاء Gold</div>
                </div>
              </motion.div>
              {/* Update badge */}
              <motion.div animate={{ y: [0,6,0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                style={{ position: 'absolute', bottom: -12, right: -32, padding: '9px 14px', borderRadius: 10, background: '#0E0E14', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 6px 20px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: 8, zIndex: 5 }}>
                <RefreshCw size={11} color="#4F8EFF" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>+٥٠ نقطة</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>تحديث آني</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:1023px){.apple-grid{grid-template-columns:1fr!important;gap:60px!important}}`}</style>
    </section>
  );
}
