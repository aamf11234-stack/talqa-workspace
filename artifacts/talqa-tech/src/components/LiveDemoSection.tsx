import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpLeft, MapPin, Store, RotateCcw } from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=' + encodeURIComponent('السلام عليكم، شفت الديمو وأبي نظام ولاء لنشاطي');

const CITIES = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة', 'أبها', 'تبوك', 'خميس مشيط'];

function buildDemoUrl(biz: string, user: string, city: string) {
  const base = `${window.location.origin}/brown-dose/`;
  const p = new URLSearchParams({ mode: 'app', biz: biz || 'نشاطك', user: user || 'عميل', city: city || 'الرياض' });
  return `${base}?${p.toString()}`;
}

export default function LiveDemoSection() {
  const [biz,     setBiz]     = useState('');
  const [city,    setCity]    = useState('الرياض');
  const [demoUrl, setDemoUrl] = useState(() => buildDemoUrl('', '', 'الرياض'));
  const [applied, setApplied] = useState(false);
  const [key,     setKey]     = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const apply = () => {
    setDemoUrl(buildDemoUrl(biz, '', city));
    setKey(k => k + 1);
    setApplied(true);
  };

  const reset = () => {
    setBiz(''); setCity('الرياض');
    setDemoUrl(buildDemoUrl('', '', 'الرياض'));
    setKey(k => k + 1);
    setApplied(false);
  };

  return (
    <section style={{
      padding: 'clamp(80px,10vw,130px) clamp(20px,5vw,80px)',
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, rgba(99,102,241,0.04) 0%, transparent 100%)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(99,102,241,0.08) 0%,transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, border: '1px solid rgba(129,140,248,0.3)', background: 'rgba(129,140,248,0.08)', fontSize: 12, fontWeight: 700, color: '#818CF8', marginBottom: 24, letterSpacing: 1 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#818CF8', boxShadow: '0 0 8px #818CF8' }} />
            ✦ ديمو حي وتفاعلي — جرّبه الآن
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}
            style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem,4vw,3.4rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 18 }}>
            شوف تطبيقك قبل ما تطلبه
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
            style={{ fontFamily: 'Cairo,sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 480, margin: '0 auto' }}>
            حط اسم نشاطك ومدينتك — التطبيق يتحدث أمامك لحظياً بهويتك
          </motion.p>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 64, alignItems: 'center' }}>

          {/* LEFT — controls */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

            {/* Inputs card */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(129,140,248,0.18)', borderRadius: 28, padding: '32px', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
                <div style={{ width: 36, height: 36, borderRadius: 11, background: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={17} color="#818CF8" />
                </div>
                <div>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 15, color: '#fff' }}>خصّص الديمو</div>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>شوف تطبيقك بهويتك قبل ما تطلبه</div>
                </div>
              </div>

              {/* Business name */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontFamily: 'Cairo,sans-serif', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Store size={12} />
                  اسم نشاطك التجاري
                </label>
                <input value={biz} onChange={e => setBiz(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && biz.trim() && apply()}
                  placeholder="مثال: كافيه النخبة"
                  style={{ width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 14, color: '#fff', fontSize: 15, fontFamily: 'Cairo,sans-serif', outline: 'none', direction: 'rtl', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(129,140,248,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.10)'}
                />
              </div>

              {/* City */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontFamily: 'Cairo,sans-serif', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <MapPin size={12} />
                  المدينة
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {CITIES.map(c => (
                    <button key={c} onClick={() => setCity(c)}
                      style={{ padding: '7px 16px', borderRadius: 99, border: `1px solid ${city === c ? 'rgba(129,140,248,0.6)' : 'rgba(255,255,255,0.08)'}`, background: city === c ? 'rgba(129,140,248,0.15)' : 'transparent', color: city === c ? '#818CF8' : 'rgba(255,255,255,0.45)', fontFamily: 'Cairo,sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.18s' }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply button */}
              <motion.button onClick={apply} disabled={!biz.trim()}
                whileHover={biz.trim() ? { scale: 1.02, boxShadow: '0 16px 40px rgba(99,102,241,0.40)' } : undefined}
                whileTap={biz.trim() ? { scale: 0.98 } : undefined}
                style={{ width: '100%', padding: '15px', background: biz.trim() ? 'linear-gradient(135deg,#818CF8,#6366F1)' : 'rgba(129,140,248,0.12)', border: biz.trim() ? 'none' : '1px solid rgba(129,140,248,0.18)', borderRadius: 16, color: biz.trim() ? '#fff' : 'rgba(255,255,255,0.3)', fontFamily: 'Cairo,sans-serif', fontSize: 16, fontWeight: 900, cursor: biz.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: biz.trim() ? '0 8px 28px rgba(99,102,241,0.30)' : 'none', transition: 'all 0.2s' }}>
                <Sparkles size={17} />
                {biz.trim() ? `شوف تطبيق ${biz}` : 'أدخل اسم نشاطك أولاً'}
              </motion.button>

              <AnimatePresence>
                {applied && (
                  <motion.button key="reset" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    onClick={reset}
                    style={{ width: '100%', marginTop: 10, padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'Cairo,sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <RotateCcw size={13} />
                    جرّب اسماً آخر
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* What's inside chips */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.3)', marginBottom: 12, letterSpacing: 1.5, textTransform: 'uppercase' }}>ما تشوفه في الديمو</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['💳 Apple Wallet', '🎯 نقاط ولاء', '📱 قائمة QR', '🛵 طلب توصيل', '📊 إحصائيات'].map(t => (
                  <div key={t} style={{ padding: '6px 14px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontFamily: 'Cairo,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>{t}</div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 20px 50px rgba(99,102,241,0.40)' }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,#818CF8,#6366F1)', color: '#fff', padding: '14px 28px', borderRadius: 14, fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 28px rgba(99,102,241,0.25)' }}>
              أطلب تطبيقك الآن
              <ArrowUpLeft size={16} strokeWidth={2.5} />
            </motion.a>
          </motion.div>

          {/* RIGHT — phone frame with live iframe */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ position: 'relative' }}>

            {/* Phone glow */}
            <div style={{ position: 'absolute', inset: -80, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(99,102,241,0.20) 0%,transparent 65%)', pointerEvents: 'none' }} />

            {/* Floating label — top */}
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', top: 40, left: -72, zIndex: 10, background: 'rgba(8,8,24,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(129,140,248,0.25)', borderRadius: 14, padding: '10px 16px', boxShadow: '0 16px 40px rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 11, fontWeight: 800, color: '#fff' }}>تطبيق حي ✦</div>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 9, color: 'rgba(129,140,248,0.8)', marginTop: 2 }}>قابل للتفاعل</div>
            </motion.div>

            {/* Floating label — bottom */}
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ position: 'absolute', bottom: 80, left: -80, zIndex: 10, background: 'rgba(8,8,24,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 14, padding: '10px 14px', boxShadow: '0 16px 40px rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 10, fontWeight: 800, color: '#10B981' }}>+٣٥٪ عودة عملاء</div>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>متوسط نتائجنا</div>
            </motion.div>

            {/* Phone shell */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 310, height: 620, borderRadius: 52, background: 'linear-gradient(160deg,#12102a 0%,#080618 100%)', border: '1.5px solid rgba(129,140,248,0.22)', boxShadow: ['0 60px 140px rgba(0,0,0,0.75)', '0 0 100px rgba(99,102,241,0.18)', 'inset 0 1px 0 rgba(255,255,255,0.06)'].join(', '), position: 'relative', overflow: 'hidden', padding: '16px 12px' }}>

              {/* Sheen */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(180deg,rgba(129,140,248,0.07) 0%,transparent 100%)', pointerEvents: 'none', zIndex: 3 }} />

              {/* Notch */}
              <div style={{ width: 90, height: 26, borderRadius: 13, background: '#000', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, position: 'relative', zIndex: 4 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333' }} />
                <div style={{ width: 36, height: 5, borderRadius: 3, background: '#111' }} />
              </div>

              {/* iframe container */}
              <div style={{ height: 528, borderRadius: 36, overflow: 'hidden', position: 'relative', background: '#0d0518' }}>
                <AnimatePresence mode="wait">
                  <motion.iframe
                    key={key}
                    ref={iframeRef}
                    src={demoUrl}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                    title="Live Demo"
                  />
                </AnimatePresence>
              </div>

              {/* Home bar */}
              <div style={{ width: 90, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.13)', margin: '10px auto 0', position: 'relative', zIndex: 4 }} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
