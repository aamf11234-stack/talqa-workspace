import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أبي%20أعرف%20أكثر%20عن%20عرض%20التطبيق%20بـ%20٤٩٩%20ريال';

/* ─── Countdown ─── */
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
    return {
      h: Math.floor(d / 3600000),
      m: Math.floor((d % 3600000) / 60000),
      s: Math.floor((d % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  return t;
}

function Digit({ val, label }: { val: number; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        minWidth: 64, height: 64, background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(245,158,11,0.3)', borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28, fontWeight: 900, color: '#F59E0B', fontFamily: 'Cairo,sans-serif',
        letterSpacing: 2,
      }}>
        {String(val).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{label}</div>
    </div>
  );
}

export default function RestaurantOffer() {
  const { h, m, s } = useCountdown();

  const included = [
    { icon: '📱', text: 'تطبيق ويب باسمك وألوانك' },
    { icon: '⭐', text: 'نظام نقاط ومكافآت للزبائن' },
    { icon: '💳', text: 'بطاقة Apple Wallet رقمية' },
    { icon: '🤖', text: 'مساعد واتساب بالذكاء الاصطناعي' },
    { icon: '📊', text: 'لوحة تحكم وتقارير فورية' },
    { icon: '🔔', text: 'إشعارات مباشرة لزبائنك' },
    { icon: '🌐', text: 'استضافة كاملة — مجاناً' },
    { icon: '🛠', text: 'دعم فني على واتساب ٧/٧' },
  ];

  const nope = [
    'بدون تأسيس',
    'بدون رسوم خفية',
    'بدون عقد',
    'بدون عمولات',
  ];

  return (
    <section style={{
      padding: 'clamp(80px,10vw,130px) 0',
      background: 'linear-gradient(180deg, var(--bg2) 0%, #080400 60%, var(--bg2) 100%)',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* orbs */}
      <div className="orb" style={{ width: 700, height: 700, top: '20%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(245,158,11,0.06)', animationDelay: '-3s' }} />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px', position: 'relative', textAlign: 'center' }}>

        {/* badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)',
            color: '#F59E0B', borderRadius: 99, padding: '6px 20px',
            fontSize: 13, fontWeight: 800, marginBottom: 32,
          }}>
            🍽️ للمطاعم والكافيهات
          </span>
        </motion.div>

        {/* headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}
          style={{ fontWeight: 900, fontSize: 'clamp(1.9rem,5vw,3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}
        >
          تطبيق ولاء كامل لمطعمك
          <br />
          <span style={{ background: 'linear-gradient(135deg,#F59E0B,#EF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            بـ ٤٩٩ ريال الشهر
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontSize: 17, color: 'var(--text2)', marginBottom: 48, maxWidth: 520, margin: '0 auto 48px' }}
        >
          زبائنك يجمعون النقاط ويستردون المكافآت — وبطاقتك في Apple Wallet على جوالهم. كل هذا بدون أي تكاليف إضافية.
        </motion.p>

        {/* ─── NO fees pills ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 60 }}
        >
          {nope.map((n) => (
            <div key={n} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: 99, padding: '8px 18px',
              fontSize: 14, fontWeight: 800, color: '#10B981',
            }}>
              <span style={{ fontSize: 16 }}>✓</span> {n}
            </div>
          ))}
        </motion.div>

        {/* ─── Big price card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(239,68,68,0.06) 100%)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: 28, padding: 'clamp(32px,5vw,52px)',
            marginBottom: 48, position: 'relative', overflow: 'hidden',
          }}
        >
          {/* top glow line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#F59E0B,#EF4444,#8B5CF6)' }} />

          {/* price */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
              ادفع شهرياً — ألغِ وقت ما تبي
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
              <span style={{ fontSize: 'clamp(5rem,14vw,9rem)', fontWeight: 900, lineHeight: 1, color: '#F59E0B', fontFamily: 'Cairo,sans-serif' }}>٤٩٩</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>ريال</div>
                <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>/ شهر</div>
              </div>
            </div>
          </div>

          {/* included features */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 14, marginBottom: 36, textAlign: 'right',
          }}>
            {included.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.18 + i * 0.04 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <span style={{
                  width: 34, height: 34, borderRadius: 9,
                  background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, flexShrink: 0,
                }}>{f.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{f.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            padding: '18px 40px', borderRadius: 16,
            background: 'linear-gradient(135deg,#F59E0B,#EF4444)',
            color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 18, fontWeight: 900,
            textDecoration: 'none',
            boxShadow: '0 16px 48px rgba(245,158,11,0.35)',
            width: '100%', boxSizing: 'border-box' as const,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            ابدأ الآن — ٤٩٩ ريال بس
          </a>

          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 14 }}>
            🔒 بدون تأسيس · بدون عقد · بدون أي رسوم خفية
          </p>
        </motion.div>

        {/* ─── Countdown ─── */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
        >
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
            ⏳ السعر يرتفع بعد انتهاء هذا الأسبوع
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <Digit val={h} label="ساعة" />
            <div style={{ fontSize: 28, color: 'rgba(245,158,11,0.5)', marginTop: 16, fontWeight: 900 }}>:</div>
            <Digit val={m} label="دقيقة" />
            <div style={{ fontSize: 28, color: 'rgba(245,158,11,0.5)', marginTop: 16, fontWeight: 900 }}>:</div>
            <Digit val={s} label="ثانية" />
          </div>
        </motion.div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <a href="/talqa-tech/sectors/restaurants"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.transform='none'; }}>
            شاهد حل المطاعم كاملاً ←
          </a>
        </div>

      </div>
    </section>
  );
}
