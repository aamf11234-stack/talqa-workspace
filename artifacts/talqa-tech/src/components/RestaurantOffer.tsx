import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import heroBg from '../assets/restaurant-hero.jpg';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أبي%20أعرف%20أكثر%20عن%20عرض%20التطبيق%20بـ%20٤٩٩%20ريال';

/* ── Countdown ── */
function useCountdown() {
  const target = () => {
    const t = new Date();
    t.setDate(t.getDate() + (7 - t.getDay()));
    t.setHours(23, 59, 59, 0);
    return t.getTime();
  };
  const calc = () => {
    const d = target() - Date.now();
    if (d <= 0) return { h: 0, m: 0, s: 0 };
    return { h: Math.floor(d / 3600000), m: Math.floor((d % 3600000) / 60000), s: Math.floor((d % 60000) / 1000) };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  return t;
}

function CountdownDigit({ val, label }: { val: number; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        minWidth: 58, height: 58,
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(245,158,11,0.35)',
        borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, fontWeight: 900, color: '#FCD34D',
        fontFamily: 'Cairo,sans-serif',
        boxShadow: '0 0 20px rgba(245,158,11,0.2)',
      }}>
        {String(val).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 5, fontWeight: 700 }}>{label}</div>
    </div>
  );
}

const FEATURES = [
  { icon: '📱', text: 'تطبيق ويب باسمك وألوانك',     sub: 'PWA — iOS & Android' },
  { icon: '⭐', text: 'نظام نقاط ومكافآت',           sub: 'Loyalty Engine' },
  { icon: '💳', text: 'بطاقة Apple Wallet رقمية',    sub: 'Instant Pass' },
  { icon: '🤖', text: 'مساعد واتساب بالذكاء الاصطناعي', sub: 'GPT-4 Powered' },
  { icon: '📊', text: 'لوحة تحكم وتقارير فورية',     sub: 'Real-time Dashboard' },
  { icon: '🔔', text: 'إشعارات مباشرة لزبائنك',      sub: 'Push Notifications' },
  { icon: '🌐', text: 'استضافة كاملة مجاناً',          sub: '99.9% Uptime' },
  { icon: '🛠', text: 'دعم فني واتساب ٧/٧',           sub: 'Priority Support' },
];

const NOPE = ['بدون تأسيس', 'بدون رسوم خفية', 'بدون عقد', 'بدون عمولات'];

/* ── Animated price counter ── */
function AnimatedPrice() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = 499;
    const duration = 1400;
    const step = (end / duration) * 16;
    const interval = setInterval(() => {
      start = Math.min(start + step, end);
      setDisplayed(Math.round(start));
      if (start >= end) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [inView]);

  return <span ref={ref}>{displayed.toLocaleString('ar-SA')}</span>;
}

export default function RestaurantOffer() {
  const { h, m, s } = useCountdown();

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>

      {/* ── Cinematic Background ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        transform: 'scale(1.04)',
      }} />

      {/* ── Multi-layer gradient overlay ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(180deg,
            rgba(4,2,10,0.92) 0%,
            rgba(10,5,0,0.75) 30%,
            rgba(10,5,0,0.82) 70%,
            rgba(4,2,10,0.97) 100%
          )
        `,
      }} />

      {/* ── Gold vignette edges ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 90% 60% at 50% 50%, transparent 50%, rgba(4,2,10,0.6) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Amber glow top-center ── */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(245,158,11,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── CONTENT ── */}
      <div style={{ position: 'relative', padding: 'clamp(80px,10vw,120px) 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(245,158,11,0.12)',
              border: '1px solid rgba(245,158,11,0.40)',
              color: '#FCD34D', borderRadius: 99, padding: '6px 20px',
              fontSize: 13, fontWeight: 800,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 0 24px rgba(245,158,11,0.15)',
            }}>
              🍽️ للمطاعم والكافيهات
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.05 }}
            style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{
              fontWeight: 900, fontSize: 'clamp(2.2rem,6vw,4.4rem)',
              letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: 18,
            }}>
              مطعمك يستاهل{' '}
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #EC4899 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                نظام يليق بطعمه
              </span>
            </h2>
            <p style={{
              fontSize: 17, color: 'rgba(255,255,255,0.55)',
              maxWidth: 520, margin: '0 auto',
              lineHeight: 1.75, fontFamily: 'Cairo, sans-serif',
            }}>
              زبائنك يجمعون النقاط ويستردون المكافآت — بطاقتك في Apple Wallet على جوالهم، بدون أي تكاليف إضافية.
            </p>
          </motion.div>

          {/* ── Two-column main block ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 52, alignItems: 'start' }}
            className="offer-grid">

            {/* Left: Glass price card */}
            <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7, ease: [0.22,1,0.36,1] }}>
              <div style={{
                position: 'relative',
                background: 'rgba(10, 5, 0, 0.60)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(245,158,11,0.25)',
                borderRadius: 28,
                padding: 'clamp(28px,4vw,48px)',
                overflow: 'hidden',
              }}>
                {/* Top gradient line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#F59E0B,#EF4444,#8B5CF6)' }} />

                {/* Glow orb inside card */}
                <div style={{ position: 'absolute', top: -60, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />

                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 10, fontWeight: 700 }}>
                  ادفع شهرياً — ألغِ وقت ما تبي
                </div>

                {/* Price display */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 32 }}>
                  <span style={{
                    fontSize: 'clamp(5rem,12vw,8rem)',
                    fontWeight: 900, lineHeight: 1,
                    background: 'linear-gradient(135deg,#FCD34D,#F59E0B)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    fontFamily: 'Cairo, sans-serif',
                    filter: 'drop-shadow(0 0 30px rgba(245,158,11,0.4))',
                  }}>
                    <AnimatedPrice />
                  </span>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'rgba(255,255,255,0.7)' }}>ريال</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>/ شهر</div>
                  </div>
                </div>

                {/* No-fee pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                  {NOPE.map(n => (
                    <span key={n} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: 'rgba(16,185,129,0.10)',
                      border: '1px solid rgba(16,185,129,0.28)',
                      borderRadius: 99, padding: '6px 14px',
                      fontSize: 12, fontWeight: 800, color: '#34D399',
                    }}>
                      <span>✓</span> {n}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a href={WA} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '17px 28px', borderRadius: 16,
                  background: 'linear-gradient(135deg,#F59E0B,#EF4444)',
                  color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 17, fontWeight: 900,
                  textDecoration: 'none', width: '100%', boxSizing: 'border-box' as const,
                  boxShadow: '0 12px 40px rgba(245,158,11,0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 20px 50px rgba(245,158,11,0.45)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='none'; (e.currentTarget as HTMLElement).style.boxShadow='0 12px 40px rgba(245,158,11,0.35)'; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  ابدأ الآن — ٤٩٩ ريال بس
                </a>

                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 12 }}>
                  🔒 بدون تأسيس · بدون عقد · بدون رسوم خفية
                </p>
              </div>
            </motion.div>

            {/* Right: Features grid */}
            <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.7, ease: [0.22,1,0.36,1] }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {FEATURES.map((f, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.18 + i * 0.06 }}
                    whileHover={{ x: -4, transition: { duration: 0.2 } }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      background: 'rgba(245,158,11,0.05)',
                      border: '1px solid rgba(245,158,11,0.14)',
                      borderRadius: 14, padding: '14px 18px',
                      backdropFilter: 'blur(6px)',
                      cursor: 'default',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.30)';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.09)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.14)';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.05)';
                    }}
                  >
                    <span style={{
                      width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                      background: 'rgba(245,158,11,0.12)',
                      border: '1px solid rgba(245,158,11,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18,
                    }}>{f.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{f.text}</div>
                      <div style={{ fontSize: 10, color: '#F59E0B', fontWeight: 700, marginTop: 2, letterSpacing: '0.04em' }}>{f.sub}</div>
                    </div>
                    <div style={{ fontSize: 16, color: 'rgba(245,158,11,0.4)' }}>✓</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ── Countdown ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.25 }}
            style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(245,158,11,0.20)',
              borderRadius: 20, padding: '20px 32px',
            }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 14, letterSpacing: '0.08em' }}>
                ⏳ السعر يرتفع بعد انتهاء هذا الأسبوع
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
                <CountdownDigit val={h} label="ساعة" />
                <span style={{ fontSize: 24, color: 'rgba(245,158,11,0.5)', fontWeight: 900 }}>:</span>
                <CountdownDigit val={m} label="دقيقة" />
                <span style={{ fontSize: 24, color: 'rgba(245,158,11,0.5)', fontWeight: 900 }}>:</span>
                <CountdownDigit val={s} label="ثانية" />
              </div>
            </div>
          </motion.div>

          {/* See more link */}
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <a href="/talqa-tech/sectors/restaurants"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 26px', borderRadius: 12,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'inherit', fontWeight: 700, fontSize: 13,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='#fff'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.20)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.6)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.10)'; }}
            >
              شاهد حل المطاعم كاملاً ←
            </a>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .offer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
