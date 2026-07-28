import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpLeft, RotateCcw, Store } from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=' + encodeURIComponent('السلام عليكم، شفت الديمو وأبي نظام ولاء لكافيهي');

function buildUrl(biz: string) {
  const origin = window.location.origin;
  const p = new URLSearchParams({ mode: 'app', biz: biz || 'كافيهك', type: 'cafe' });
  return `${origin}/haeez-loyalty/?${p.toString()}`;
}

/* ─── iPhone 17 Frame ─────────────────────────────────────────── */
function IPhone17({ src, iframeKey }: { src: string; iframeKey: number }) {
  // iPhone 17: ~393×852px device → scaled ×0.82 → 322×699
  const W = 322;
  const H = 699;
  // Titanium band: 10px each side, screen fills the rest
  const BAND = 10;
  const R_OUT = 52;   // outer corner radius
  const R_IN  = 44;   // inner screen radius

  // Screen area dimensions
  const SW = W - BAND * 2;   // 302
  const SH = H - BAND * 2;   // 679

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'relative', width: W, flexShrink: 0 }}
    >
      {/* Ambient glow beneath phone */}
      <div style={{ position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)', width: 260, height: 80, borderRadius: '50%', background: 'rgba(99,102,241,0.35)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* — Side buttons — exact iPhone 17 placement */}
      {/* Action button — left top */}
      <div style={{ position: 'absolute', left: -3, top: 98, width: 3, height: 32,  borderRadius: '2px 0 0 2px', background: 'linear-gradient(180deg,#9a9a9f,#636366,#9a9a9f)', zIndex: 20 }} />
      {/* Volume up — left */}
      <div style={{ position: 'absolute', left: -3, top: 148, width: 3, height: 56, borderRadius: '2px 0 0 2px', background: 'linear-gradient(180deg,#9a9a9f,#636366,#9a9a9f)', zIndex: 20 }} />
      {/* Volume down — left */}
      <div style={{ position: 'absolute', left: -3, top: 214, width: 3, height: 56, borderRadius: '2px 0 0 2px', background: 'linear-gradient(180deg,#9a9a9f,#636366,#9a9a9f)', zIndex: 20 }} />
      {/* Power — right */}
      <div style={{ position: 'absolute', right: -3, top: 160, width: 3, height: 72, borderRadius: '0 2px 2px 0', background: 'linear-gradient(180deg,#9a9a9f,#636366,#9a9a9f)', zIndex: 20 }} />

      {/* — Outer titanium frame — */}
      <div style={{
        width: W, height: H,
        borderRadius: R_OUT,
        position: 'relative', zIndex: 1,
        background: [
          'linear-gradient(145deg,',
          '#d1d1d6 0%,',
          '#aeaeb2 8%,',
          '#8e8e93 22%,',
          '#636366 45%,',
          '#48484a 60%,',
          '#636366 78%,',
          '#8e8e93 90%,',
          '#aeaeb2 100%)',
        ].join(''),
        boxShadow: [
          '0 0 0 0.5px rgba(255,255,255,0.55)',       // top highlight
          '0 50px 130px rgba(0,0,0,0.90)',
          '0 20px 60px rgba(0,0,0,0.70)',
          '0 0 80px rgba(99,102,241,0.22)',
          'inset 0 1px 0 rgba(255,255,255,0.65)',
          'inset 0 -1px 0 rgba(0,0,0,0.35)',
        ].join(','),
        padding: `${BAND}px`,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>

        {/* — Glass screen surface — */}
        <div style={{
          width: SW, height: SH,
          borderRadius: R_IN,
          overflow: 'hidden',
          position: 'relative',
          background: '#000',
          boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.8)',
        }}>

          {/* Screen glass reflection — top */}
          <div style={{ position: 'absolute', top: 0, insetInline: 0, height: '35%', background: 'linear-gradient(180deg,rgba(255,255,255,0.07) 0%,transparent 100%)', zIndex: 10, pointerEvents: 'none', borderRadius: `${R_IN}px ${R_IN}px 0 0` }} />

          {/* Status bar area */}
          <div style={{ height: 52, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 8 }}>
            {/* Dynamic Island — pill */}
            <div style={{
              width: 124, height: 34,
              borderRadius: 17,
              background: '#000',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,1)',
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%,#1a2836,#060d14)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 6px rgba(0,80,180,0.4)' }} />
              <div style={{ width: 48, height: 7, borderRadius: 4, background: '#0a0a0a' }} />
            </div>
          </div>

          {/* iframe — the live app */}
          <div style={{ height: SH - 52, overflow: 'hidden', position: 'relative', zIndex: 2 }}>
            <AnimatePresence mode="wait">
              <motion.iframe
                key={iframeKey}
                src={src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                title="Live Demo — حيز"
              />
            </AnimatePresence>
          </div>

          {/* Home indicator */}
          <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 120, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.22)', zIndex: 9 }} />
        </div>

        {/* Frame edge specular highlight */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: R_OUT, pointerEvents: 'none', background: 'linear-gradient(135deg,rgba(255,255,255,0.25) 0%,transparent 40%,rgba(0,0,0,0.12) 100%)' }} />
      </div>
    </motion.div>
  );
}

/* ─── Main Section ────────────────────────────────────────────── */
export default function LiveDemoSection() {
  const [biz,      setBiz]  = useState('');
  const [demoUrl,  setUrl]  = useState(() => buildUrl(''));
  const [iKey,     setKey]  = useState(0);
  const [applied,  setApp]  = useState(false);

  const apply = () => { setUrl(buildUrl(biz)); setKey(k => k + 1); setApp(true); };
  const reset = () => { setBiz(''); setUrl(buildUrl('')); setKey(k => k + 1); setApp(false); };

  return (
    <section style={{
      padding: 'clamp(80px,10vw,130px) clamp(20px,5vw,72px)',
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg,rgba(99,102,241,0.06) 0%,transparent 100%)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* ambient orb */}
      <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: 1000, height: 700, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(99,102,241,0.08) 0%,transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px,7vw,80px)' }}>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, border: '1px solid rgba(129,140,248,0.3)', background: 'rgba(129,140,248,0.08)', fontSize: 12, fontWeight: 700, color: '#818CF8', marginBottom: 24, letterSpacing: 1 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#818CF8', boxShadow: '0 0 8px #818CF8' }} />
            ✦ ديمو حي وتفاعلي — جرّبه الآن
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}
            style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 'clamp(2.1rem,4.2vw,3.6rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: 20 }}>
            لا نعطيك مثل هذا
            <br />
            <span style={{ background: 'linear-gradient(135deg,#818CF8,#6366F1,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              بل أفضل
            </span>
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.13 }}
            style={{ fontFamily: 'Cairo,sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.48)', lineHeight: 1.8, maxWidth: 460, margin: '0 auto' }}>
            حط اسم كافيهك وشوف تطبيقك قبل ما تطلبه — لحظياً وبهويتك
          </motion.p>
        </div>

        {/* ── Layout ── */}
        <div className="live-demo-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40, alignItems: 'center' }}>

          {/* controls */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>

            {/* card */}
            <div style={{ background: 'rgba(255,255,255,0.028)', border: '1px solid rgba(129,140,248,0.16)', borderRadius: 28, padding: 'clamp(20px,4vw,32px)', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 26 }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={17} color="#818CF8" />
                </div>
                <div>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 15, color: '#fff' }}>خصّص الديمو</div>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>شوف تطبيقك بهويتك قبل ما تطلبه</div>
                </div>
              </div>

              {/* input */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.38)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Store size={12} />
                  اسم كافيهك التجاري
                </div>
                <input
                  value={biz} onChange={e => setBiz(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && biz.trim() && apply()}
                  placeholder="مثال: كافيه النخبة"
                  style={{ width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 14, color: '#fff', fontSize: 15, fontFamily: 'Cairo,sans-serif', outline: 'none', direction: 'rtl', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(129,140,248,0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.10)')}
                />
              </div>

              {/* apply btn */}
              <motion.button onClick={apply} disabled={!biz.trim()}
                whileHover={biz.trim() ? { scale: 1.02, boxShadow: '0 16px 40px rgba(99,102,241,0.42)' } : undefined}
                whileTap={biz.trim() ? { scale: 0.97 } : undefined}
                style={{ width: '100%', padding: '14px', background: biz.trim() ? 'linear-gradient(135deg,#818CF8,#6366F1)' : 'rgba(129,140,248,0.09)', border: biz.trim() ? 'none' : '1px solid rgba(129,140,248,0.18)', borderRadius: 16, color: biz.trim() ? '#fff' : 'rgba(255,255,255,0.28)', fontFamily: 'Cairo,sans-serif', fontSize: 16, fontWeight: 900, cursor: biz.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: biz.trim() ? '0 8px 28px rgba(99,102,241,0.30)' : 'none', transition: 'all 0.2s' }}>
                <Sparkles size={17} />
                {biz.trim() ? `شوف تطبيق ${biz}` : 'أدخل اسم كافيهك أولاً'}
              </motion.button>

              <AnimatePresence>
                {applied && (
                  <motion.button key="r" initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 10 }} exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    onClick={reset}
                    style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'Cairo,sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <RotateCcw size={12} />
                    جرّب اسماً آخر
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {['💳 Apple Wallet', '🎯 نقاط ولاء', '📱 قائمة QR', '🤝 تحديات', '📊 لوحة تحكم'].map(t => (
                <div key={t} style={{ padding: '6px 14px', borderRadius: 99, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', fontFamily: 'Cairo,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.48)', fontWeight: 600 }}>{t}</div>
              ))}
            </div>

            {/* CTA */}
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 20px 52px rgba(99,102,241,0.42)' }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,#818CF8,#6366F1)', color: '#fff', padding: '14px 28px', borderRadius: 14, fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 28px rgba(99,102,241,0.27)' }}>
              أطلب تطبيقك الآن
              <ArrowUpLeft size={16} strokeWidth={2.5} />
            </motion.a>
          </motion.div>

          {/* phone */}
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

            {/* floating status chips */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'rgba(6,4,18,0.92)', backdropFilter: 'blur(20px)', border: '1px solid rgba(129,140,248,0.28)', borderRadius: 99, padding: '7px 16px', display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#818CF8', boxShadow: '0 0 8px #818CF8', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Cairo,sans-serif', fontSize: 12, fontWeight: 800, color: '#fff', whiteSpace: 'nowrap' }}>تطبيق حي — قابل للتفاعل</span>
              </motion.div>
              <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                style={{ background: 'rgba(6,4,18,0.92)', backdropFilter: 'blur(20px)', border: '1px solid rgba(16,185,129,0.28)', borderRadius: 99, padding: '7px 16px', display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Cairo,sans-serif', fontSize: 12, fontWeight: 800, color: '#10B981', whiteSpace: 'nowrap' }}>+٣٥٪ عودة عملاء</span>
              </motion.div>
            </div>

            <IPhone17 src={demoUrl} iframeKey={iKey} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .live-demo-grid {
            grid-template-columns: minmax(0,1fr) auto !important;
            gap: 64px !important;
            align-items: start !important;
          }
        }
      `}</style>
    </section>
  );
}
