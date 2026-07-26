import { useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = [
  { label: 'ذهبي', val: '#C8996C', bg: '#1A120A' },
  { label: 'أزرق', val: '#4F8EFF', bg: '#0A0E1A' },
  { label: 'أخضر', val: '#34D399', bg: '#091A0F' },
  { label: 'وردي', val: '#F472B6', bg: '#1A0A12' },
  { label: 'بنفسجي', val: '#A78BFA', bg: '#120A1A' },
];

const ICONS = ['☕', '🏥', '💇', '🛒', '🏋️', '🍕', '✂️', '💊'];

export default function WalletCustomizer() {
  const [name,  setName]  = useState('مشروعك');
  const [color, setColor] = useState(COLORS[0]);
  const [icon,  setIcon]  = useState('☕');
  const [pts,   setPts]   = useState(1800);

  const wa = `https://wa.me/966551378531?text=أريد%20بطاقة%20Apple%20Wallet%20لمشروع%20${encodeURIComponent(name)}`;

  return (
    <section style={{ padding: 'clamp(72px,10vw,120px) 0', background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <div className="wallet-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,72px)', alignItems: 'start' }}>

          {/* Controls */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="section-label">Apple Wallet</div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.9rem,3.2vw,2.8rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>
              صمّم بطاقتك<br /><span className="text-blue">الآن، هنا.</span>
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 32 }}>
              عدّل الاسم واللون وشاهد بطاقتك تتغير مباشرة — ثم أرسلها لنا ونبنيها خلال أيام.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Name */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>اسم المشروع</label>
                <input value={name} onChange={e => setName(e.target.value || 'مشروعك')}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 9, border: '1px solid var(--border)', background: 'var(--surface)', color: '#fff', fontSize: 14, fontFamily: 'Cairo,sans-serif', fontWeight: 600, outline: 'none', direction: 'rtl', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(79,142,255,0.4)'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
                  placeholder="اكتب اسم مشروعك" maxLength={24} />
              </div>

              {/* Color */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>لون البطاقة</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {COLORS.map(c => (
                    <button key={c.val} onClick={() => setColor(c)}
                      style={{ width: 32, height: 32, borderRadius: '50%', background: c.val, border: color.val === c.val ? `2px solid #fff` : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s', transform: color.val === c.val ? 'scale(1.15)' : 'scale(1)' }} />
                  ))}
                </div>
              </div>

              {/* Icon */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>أيقونة القطاع</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {ICONS.map(ic => (
                    <button key={ic} onClick={() => setIcon(ic)}
                      style={{ width: 38, height: 38, borderRadius: 9, border: `1px solid ${icon === ic ? color.val + '50' : 'var(--border)'}`, background: icon === ic ? color.val + '14' : 'transparent', cursor: 'pointer', fontSize: 18, transition: 'all 0.2s' }}>
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Points slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', letterSpacing: '0.08em' }}>رصيد النقاط التجريبي</label>
                  <span style={{ fontSize: 11, fontWeight: 800, color: color.val }}>{pts.toLocaleString('ar-SA')} نقطة</span>
                </div>
                <input type="range" min="0" max="5000" step="50" value={pts} onChange={e => setPts(+e.target.value)}
                  style={{ width: '100%', accentColor: color.val, cursor: 'pointer' }} />
              </div>

              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-blue" style={{ marginTop: 4, justifyContent: 'center', fontSize: 14 }}>
                <span className="holo-shimmer" />
                ابنِ هذا لـ «{name}» ←
              </a>
            </div>
          </motion.div>

          {/* Live card preview */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 16 }}>
            <motion.div
              key={color.val}
              initial={{ scale: 0.97, opacity: 0.7 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              style={{ width: '100%', maxWidth: 340, borderRadius: 22, overflow: 'hidden', border: `1px solid ${color.val}25`, boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${color.val}10`, background: `linear-gradient(145deg, ${color.bg}, #050505)` }}>

              {/* Card top */}
              <div style={{ padding: '24px 24px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: `${color.val}80`, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>بطاقة الولاء</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: '-0.01em' }}>{name}</div>
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color.val}15`, border: `1px solid ${color.val}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{icon}</div>
                </div>

                <div style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: color.val, letterSpacing: '-0.04em', lineHeight: 1 }}>{pts.toLocaleString('ar-SA')}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>نقطة متاحة</div>
                </div>
              </div>

              {/* Progress */}
              <div style={{ padding: '0 24px 18px' }}>
                <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(pts / 50, 100)}%`, background: `linear-gradient(to left, ${color.val}, ${color.val}88)`, borderRadius: 99, transition: 'width 0.4s ease' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>
                  <span>Gold Member ✦</span>
                  <span>{Math.min(Math.round(pts / 50), 100)}٪</span>
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: '14px 24px', borderTop: `1px solid ${color.val}12`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 11, color: `${color.val}80`, fontWeight: 700 }}>Apple Wallet ▼</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>يُحدَّث تلقائياً</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.wallet-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
