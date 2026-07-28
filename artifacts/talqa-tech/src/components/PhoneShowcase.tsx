import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Coins, Gift } from 'lucide-react';

const SCREENS = [
  {
    id: 'wallet',
    label: 'Apple Wallet',
    color: '#C8996C',
    preview: (
      <div style={{ padding: '20px 16px', height: '100%', background: 'linear-gradient(160deg,#1A120A,#0E0A05)' }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(200,153,108,0.6)', letterSpacing: '0.12em', marginBottom: 14, textTransform: 'uppercase' }}>WALLET PASS</div>
        <div style={{ background: 'linear-gradient(135deg,#2A1E10,#1A140A)', borderRadius: 14, padding: '16px', border: '1px solid rgba(200,153,108,0.2)', marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 8, color: 'rgba(200,153,108,0.5)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>بطاقة الولاء</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#fff' }}>Gold Member ✦</div>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(200,153,108,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Coffee size={15} strokeWidth={1.75} color="#C8996C"/></div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#C8996C', letterSpacing: '-0.04em', marginBottom: 4 }}>٢٬٤٥٠</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>نقطة متاحة للاستبدال</div>
        </div>
        <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(200,153,108,0.08)', border: '1px solid rgba(200,153,108,0.15)', fontSize: 10, color: 'rgba(200,153,108,0.8)', fontWeight: 700 }}>
          عرض خاص: -٢٠٪ على طلبك القادم
        </div>
      </div>
    ),
  },
  {
    id: 'dashboard',
    label: 'لوحة التحكم',
    color: '#4F8EFF',
    preview: (
      <div style={{ padding: '16px', height: '100%', background: 'linear-gradient(160deg,#0A0E1A,#07090F)' }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(79,142,255,0.6)', letterSpacing: '0.12em', marginBottom: 12, textTransform: 'uppercase' }}>DASHBOARD</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
          {[['١٢٤', 'عضو'], ['٨٩٣ر', 'مبيعات'], ['+١٢٪', 'نمو'], ['٣د', 'آخر زيارة']].map(([v, l]) => (
            <div key={l} style={{ padding: '10px', borderRadius: 9, background: 'rgba(79,142,255,0.07)', border: '1px solid rgba(79,142,255,0.15)' }}>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#4F8EFF', letterSpacing: '-0.02em' }}>{v}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 600, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
        {[70, 45, 85].map((w, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${w}%` }} viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(to left, #4F8EFF, #7ABAFF)' }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'app',
    label: 'تطبيق العميل',
    color: '#34D399',
    preview: (
      <div style={{ padding: '16px', height: '100%', background: 'linear-gradient(160deg,#091A0F,#050F08)' }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(52,211,153,0.6)', letterSpacing: '0.12em', marginBottom: 14, textTransform: 'uppercase' }}>CLIENT APP</div>
        <div style={{ background: 'rgba(52,211,153,0.06)', borderRadius: 12, padding: '12px', border: '1px solid rgba(52,211,153,0.15)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Coins size={15} strokeWidth={1.75} color="#34D399"/></div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>+٥٠ نقطة</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>أُضيفت بعد زيارتك</div>
          </div>
        </div>
        {['عرض: قهوة مجانية', 'مستوى: Gold ✦', 'الزيارة القادمة: غداً'].map(t => (
          <div key={t} style={{ padding: '9px 12px', borderRadius: 8, marginBottom: 5, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{t}</div>
        ))}
      </div>
    ),
  },
];

export default function PhoneShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ padding: 'clamp(72px,10vw,120px) 0', background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <div className="showcase-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>

          {/* Text side */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="section-label">تطبيقات الجوال</div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.9rem,3.2vw,2.8rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
              تطبيق واحد يجمع<br /><span className="text-blue">الولاء والتحكم والعميل.</span>
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 28, maxWidth: 400 }}>
              ثلاث واجهات في مشروع واحد: Apple Wallet للعميل، لوحة تحكم للمالك، وتطبيق متكامل — كل شيء متزامن فوراً.
            </p>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
              {SCREENS.map((s, i) => (
                <button key={s.id} onClick={() => setActive(i)}
                  style={{ padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Cairo,sans-serif', fontSize: 12, fontWeight: 700, border: '1px solid', transition: 'all 0.2s', borderColor: active === i ? s.color + '50' : 'var(--border)', background: active === i ? s.color + '12' : 'transparent', color: active === i ? s.color : 'var(--text2)' }}>
                  {s.label}
                </button>
              ))}
            </div>

            <a href="https://wa.me/966551378531?text=أريد%20تطبيق%20ولاء%20مثل%20هذا" target="_blank" rel="noopener noreferrer" className="btn-blue" style={{ fontSize: 14 }}>
              <span className="holo-shimmer" />
              ابنِ تطبيقك الآن ←
            </a>
          </motion.div>

          {/* Phone */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 220 }}>
              <div style={{ borderRadius: 36, background: '#0C0C14', border: '2px solid #1A1A24', overflow: 'hidden', boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), 0 0 60px ${SCREENS[active].color}14` }}>
                <div style={{ height: 26, background: '#080810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 52, height: 12, borderRadius: 8, background: '#000' }} />
                </div>
                <div style={{ height: 360, overflow: 'hidden' }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={active}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      style={{ height: '100%' }}>
                      {SCREENS[active].preview}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div style={{ height: 20, background: '#080810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 44, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.1)' }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.showcase-grid{grid-template-columns:1fr!important}.showcase-grid>div:last-child{display:none}}`}</style>
    </section>
  );
}
