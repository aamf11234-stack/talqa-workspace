import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, LayoutDashboard, Smartphone, Bell, Star, QrCode, TrendingUp, Users } from 'lucide-react';

const SCREENS = [
  {
    id: 'wallet', label: 'Apple Wallet', icon: Wallet, color: '#4F8EFF',
    content: (
      <div style={{ height: '100%', background: 'linear-gradient(160deg, #0A0A14 0%, #111124 100%)', padding: '32px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
          <span>9:41</span><span>●●●</span>
        </div>
        {/* Wallet card */}
        <div style={{ borderRadius: 18, background: 'linear-gradient(135deg,#1a1a2e,#16213e)', border: '1px solid rgba(79,142,255,0.2)', padding: '20px 18px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 2, background: 'linear-gradient(to right, #4F8EFF, #6BA3FF)' }} />
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 6 }}>MEMBERSHIP</div>
          <div style={{ fontSize: 17, fontWeight: 900, color: '#fff', marginBottom: 14 }}>Coffee House</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 6, background: 'rgba(79,142,255,0.12)', border: '1px solid rgba(79,142,255,0.25)', marginBottom: 14 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4F8EFF', animation: 'ph-pulse 2s infinite' }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: '#4F8EFF' }}>Gold Member</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginBottom: 3 }}>النقاط</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>٢٬٤٥٠</div>
            </div>
            {/* QR mini */}
            <div style={{ width: 40, height: 40, background: '#fff', borderRadius: 6, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, padding: 3 }}>
              {[1,1,1,0,1,0,1,0,1,1,0,1,0,1,1,1].map((v,i) => <div key={i} style={{ background: v ? '#000' : '#fff', borderRadius: 1 }} />)}
            </div>
          </div>
        </div>
        {/* Recent activity */}
        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4 }}>النشاط الأخير</div>
        {[
          { icon: '☕', label: 'قهوة صباحية', pts: '+١٠', color: '#34D399' },
          { icon: '🎂', label: 'كيكة خاصة', pts: '+٢٥', color: '#4F8EFF' },
          { icon: '🎁', label: 'مكافأة ولاء', pts: '+٥٠', color: '#A78BFA' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{a.icon}</div>
            <div style={{ flex: 1, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)' }}>{a.label}</div>
            <div style={{ fontSize: 11, fontWeight: 900, color: a.color }}>{a.pts}</div>
          </div>
        ))}
        <style>{`@keyframes ph-pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
      </div>
    ),
  },
  {
    id: 'dash', label: 'لوحة التحكم', icon: LayoutDashboard, color: '#34D399',
    content: (
      <div style={{ height: '100%', background: '#0A0A0F', padding: '28px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>
          <span>9:41</span><span>Dashboard</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 900, color: '#fff', marginTop: 4 }}>مرحباً، أحمد 👋</div>
        {/* Mini stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { label: 'الأعضاء', val: '١٢٤', icon: Users, color: '#4F8EFF', delta: '+١٢٪' },
            { label: 'المبيعات', val: '٨٩٣', icon: TrendingUp, color: '#34D399', delta: '+٨٪' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '12px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <s.icon size={12} color={s.color} />
                <span style={{ fontSize: 9, fontWeight: 700, color: '#34D399' }}>{s.delta}</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>{s.val}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)' }}>{s.label}</div>
            </div>
          ))}
        </div>
        {/* Mini bar chart */}
        <div style={{ padding: '12px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>الزيارات - آخر ٧ أيام</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 50 }}>
            {[40,65,50,80,70,90,75].map((h, i) => (
              <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.7, ease: [0.22,1,0.36,1] }}
                style={{ flex: 1, borderRadius: '3px 3px 0 0', background: i === 5 ? '#4F8EFF' : 'rgba(79,142,255,0.25)' }} />
            ))}
          </div>
        </div>
        {/* Notifications */}
        {[{ icon: Bell, msg: 'عميل جديد انضم', col: '#A78BFA' }, { icon: Star, msg: 'وصل ٥ نجوم جديد', col: '#FB923C' }].map((n, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
            <n.icon size={12} color={n.col} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{n.msg}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'app', label: 'تطبيق الجوال', icon: Smartphone, color: '#A78BFA',
    content: (
      <div style={{ height: '100%', background: 'linear-gradient(160deg, #0E0814 0%, #110A1F 100%)', padding: '28px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>
          <span>9:41</span><span>●●●●</span>
        </div>
        {/* App header */}
        <div style={{ textAlign: 'center', marginTop: 4 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, margin: '0 auto 10px', background: 'linear-gradient(135deg,#A78BFA,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>☕</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>Coffee House</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>تطبيق الولاء الرسمي</div>
        </div>
        {/* Points circle */}
        <div style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: 16, padding: '18px', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>رصيد نقاطك</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>٢٬٤٥٠</div>
          <div style={{ fontSize: 10, color: '#A78BFA', marginTop: 4, fontWeight: 600 }}>≈ ٢٤.٥٠ ريال قيمة</div>
          <div style={{ marginTop: 12, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.07)' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: '73%' }} transition={{ delay: 0.5, duration: 1.2, ease: [0.22,1,0.36,1] }}
              style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(to right, #A78BFA, #7C3AED)' }} />
          </div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 6 }}>١٥٥٠ نقطة للوصول لـ Platinum</div>
        </div>
        {/* CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {['🎁 استبدال', '📲 مشاركة'].map((b, i) => (
            <div key={i} style={{ padding: '11px', borderRadius: 12, textAlign: 'center', fontSize: 11, fontWeight: 700, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)', background: i === 0 ? 'linear-gradient(135deg,#A78BFA,#7C3AED)' : 'rgba(255,255,255,0.04)', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>{b}</div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function PhoneShowcase() {
  const [active, setActive] = useState(0);
  const phoneRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = phoneRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const y = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    el.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${y * -8}deg)`;
  }
  function onLeave() { if (phoneRef.current) phoneRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)'; }

  const screen = SCREENS[active];

  return (
    <section style={{ padding: '120px 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${screen.color}0A, transparent 65%)`, filter: 'blur(60px)', pointerEvents: 'none', transition: 'background 0.8s ease' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="phone-grid">

          {/* Text side */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: screen.color, marginBottom: 20, transition: 'color 0.5s' }}>برامج حية وحقيقية</div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,2.9rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
              نبني تجارب رقمية<br /><span className="text-blue">تُشعَر قبل أن تُرى.</span>
            </h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.9, color: 'rgba(255,255,255,0.38)', marginBottom: 40 }}>
              كل برنامج نبنيه يُعاش يومياً — من نقرة المستخدم في الصباح حتى آخر إشعار في المساء. انقر على كل شاشة وشاهد البرنامج حياً.
            </p>

            {/* Tab switcher */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SCREENS.map((s, i) => (
                <motion.button key={s.id} onClick={() => setActive(i)}
                  whileHover={{ x: 4 }} transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 14, border: `1px solid ${active === i ? s.color + '35' : 'rgba(255,255,255,0.07)'}`, background: active === i ? `${s.color}0C` : 'rgba(255,255,255,0.02)', cursor: 'pointer', textAlign: 'right', transition: 'all 0.3s', boxShadow: active === i ? `0 0 0 1px ${s.color}18` : 'none' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: active === i ? `${s.color}18` : 'rgba(255,255,255,0.06)', color: active === i ? s.color : 'rgba(255,255,255,0.3)', flexShrink: 0, transition: 'all 0.3s' }}>
                    <s.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: active === i ? '#fff' : 'rgba(255,255,255,0.5)', transition: 'color 0.3s' }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>
                      {s.id === 'wallet' ? 'Apple Wallet Integration' : s.id === 'dash' ? 'Real-time Dashboard' : 'iOS & Android App'}
                    </div>
                  </div>
                  {active === i && <div style={{ marginRight: 'auto', marginLeft: 0, width: 6, height: 6, borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}` }} />}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Phone */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* Glow rings */}
            {[320, 260, 200].map((s, i) => (
              <div key={i} style={{ position: 'absolute', width: s, height: s, borderRadius: '50%', border: `1px solid ${screen.color}${15 - i * 4}`, transition: 'border-color 0.6s', pointerEvents: 'none' }} />
            ))}

            <motion.div ref={phoneRef} onMouseMove={onMove} onMouseLeave={onLeave}
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s cubic-bezier(.23,1,.32,1)', position: 'relative', zIndex: 2 }}>
              {/* Phone shell */}
              <div style={{ width: 240, borderRadius: 42, background: 'linear-gradient(145deg, #1a1a2e 0%, #0d0d18 100%)', border: '6px solid #2a2a3e', boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 60px ${screen.color}20`, overflow: 'hidden', position: 'relative', transition: 'box-shadow 0.6s' }}>
                {/* Notch */}
                <div style={{ height: 30, background: '#111120', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 70, height: 18, borderRadius: 20, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1a1a2e' }} />
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#333' }} />
                  </div>
                </div>
                {/* Screen content */}
                <div style={{ height: 480, overflowY: 'hidden', position: 'relative' }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={active} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
                      style={{ height: '100%' }}>
                      {screen.content}
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Home bar */}
                <div style={{ height: 24, background: screen.id === 'app' ? '#110A1F' : '#0A0A14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 80, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.15)' }} />
                </div>
              </div>

              {/* Side button */}
              <div style={{ position: 'absolute', top: 80, right: -9, width: 4, height: 40, borderRadius: '0 3px 3px 0', background: '#1a1a2e' }} />
              <div style={{ position: 'absolute', top: 60, left: -9, width: 4, height: 24, borderRadius: '3px 0 0 3px', background: '#1a1a2e' }} />
              <div style={{ position: 'absolute', top: 90, left: -9, width: 4, height: 24, borderRadius: '3px 0 0 3px', background: '#1a1a2e' }} />
            </motion.div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.phone-grid{grid-template-columns:1fr!important;gap:60px!important}}`}</style>
    </section>
  );
}
