import { motion } from 'framer-motion';
import { Wallet, Bell, Watch, RefreshCw } from 'lucide-react';
import { SiApple } from 'react-icons/si';

const feats = [
  { Icon: Wallet,    title: 'بطاقة ولاء رقمية',    desc: 'تُضاف مباشرةً لمحفظة Apple Wallet. لا تطبيق، لا حساب، بلمسة واحدة.' },
  { Icon: Bell,      title: 'Push Notifications مجانية', desc: 'أرسل عروضاً وتنبيهات مخصصة على شاشة العميل بدون فتح أي تطبيق.' },
  { Icon: Watch,     title: 'تكامل Apple Watch',    desc: 'رصيد النقاط وكود QR متاحان على معصم العميل في ثانية واحدة.' },
  { Icon: RefreshCw, title: 'تحديث لحظي تلقائي',   desc: 'النقاط ومستوى العضوية تتحدثان بعد كل زيارة. صفر تدخل يدوي.' },
];

export default function AppleSection() {
  return (
    <section id="apple" style={{ padding: '120px 0', background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, height: 1, background: 'rgba(255,255,255,0.07)' }} />

      {/* Gold ambient */}
      <div style={{
        position: 'absolute', top: '50%', right: '-10%', transform: 'translateY(-50%)',
        width: 600, height: 600, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(212,168,67,0.07) 0%, transparent 65%)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}
          className="block lg:grid" >

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 14px', borderRadius: 8, marginBottom: 28,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <SiApple size={13} color="rgba(255,255,255,0.7)" />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                Apple Ecosystem
              </span>
            </div>

            <h2 style={{
              fontWeight: 900, fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)',
              letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: 20,
            }}>
              تجربة عميل<br />
              <span className="text-gold">من مستوى آخر.</span>
            </h2>

            <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', marginBottom: 48, fontWeight: 500 }}>
              نوظّف أحدث تقنيات Apple لتمنح عملاءك تجربة انسيابية تجعلهم يتذكرون براندك في كل لحظة — بدون احتكاك، بدون تعقيد.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {feats.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(212,168,67,0.1)', color: '#D4A843',
                    border: '1px solid rgba(212,168,67,0.15)',
                  }}>
                    <f.Icon size={18} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{f.title}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.4)' }}>{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', padding: '60px 0' }}>

            {/* Rings */}
            {[380, 300, 220].map((size, i) => (
              <div key={i} style={{
                position: 'absolute', width: size, height: size, borderRadius: '50%',
                border: `1px solid rgba(212,168,67,${0.08 - i * 0.025})`,
                pointerEvents: 'none',
              }} />
            ))}

            {/* Card */}
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                width: 280, borderRadius: 28, padding: '24px',
                background: 'linear-gradient(145deg, #161616, #1F1E19)',
                border: '1px solid rgba(212,168,67,0.18)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 80px rgba(212,168,67,0.06), 0 0 0 1px rgba(255,255,255,0.04)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Shimmer */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 28,
                  background: 'linear-gradient(135deg, rgba(212,168,67,0.05) 0%, transparent 50%)',
                  pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, position: 'relative', zIndex: 1 }}>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 6 }}>MEMBERSHIP CARD</div>
                    <div style={{ fontSize: 17, fontWeight: 900, color: '#fff' }}>منشأتك هنا</div>
                  </div>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.05)',
                  }}>
                    <SiApple size={16} color="rgba(255,255,255,0.5)" />
                  </div>
                </div>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '5px 12px', borderRadius: 8, marginBottom: 24,
                  background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.22)',
                  position: 'relative', zIndex: 1,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4A843', boxShadow: '0 0 6px #D4A843' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#D4A843' }}>Gold Member</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginBottom: 4 }}>رصيد النقاط</div>
                    <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>٢٬٤٥٠</div>
                    <div style={{ fontSize: 11, color: '#D4A843', marginTop: 4, fontWeight: 600 }}>نقطة متاحة</div>
                  </div>
                  {/* QR */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 10,
                    display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2,
                    padding: 6, background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    {[...Array(16)].map((_, j) => (
                      <div key={j} style={{
                        borderRadius: 2,
                        background: [0,1,4,5,2,7,8,13,15,10,11,14].includes(j) ? 'rgba(255,255,255,0.5)' : 'transparent',
                      }} />
                    ))}
                  </div>
                </div>

                <div style={{
                  position: 'absolute', bottom: 0, right: 0, left: 0, height: 3, borderRadius: '0 0 28px 28px',
                  background: 'linear-gradient(to left, #D4A843, #C49730)',
                }} />
              </div>
            </motion.div>

            {/* Floating notification */}
            <motion.div animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              style={{
                position: 'absolute', top: 40, left: -20, zIndex: 3,
                padding: '12px 14px', borderRadius: 14,
                background: '#161616', border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(212,168,67,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={14} color="#D4A843" />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 2 }}>عرض خاص! 🎉</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>خصم ٢٠٪ لعملاء Gold</div>
              </div>
            </motion.div>

            {/* Update badge */}
            <motion.div animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              style={{
                position: 'absolute', bottom: 40, right: -16, zIndex: 3,
                padding: '9px 14px', borderRadius: 10,
                background: '#161616', border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
              <RefreshCw size={12} color="#D4A843" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>+٥٠ نقطة</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>تحديث آني</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:1023px){
          .block.lg\\:grid { display:flex; flex-direction:column; gap:60px; }
        }
      `}</style>
    </section>
  );
}
