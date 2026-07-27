import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أبي%20أعرف%20عن%20عرض%20التطبيق%20بـ%20٤٩٩%20ريال';

/* ─── Countdown timer ─── */
function useCountdown() {
  const getTarget = () => {
    const t = new Date();
    t.setDate(t.getDate() + (7 - t.getDay()));
    t.setHours(23, 59, 59, 0);
    return t.getTime();
  };
  const calc = () => {
    const diff = getTarget() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/* ─── Phone preview ─── */
function AppPreview() {
  const [tab, setTab] = useState(0);
  const tabs = ['🏠 الرئيسية', '🎁 المكافآت', '📋 الطلبات'];

  return (
    <div style={{ position: 'relative', width: 260, margin: '0 auto' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 320, height: 320, background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Phone shell */}
      <div style={{ width: 260, height: 520, borderRadius: 40, background: 'linear-gradient(160deg,#2a2a2a,#141414)', boxShadow: '0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15)', padding: 6, boxSizing: 'border-box' as const }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 35, overflow: 'hidden', background: '#0f0f0f', display: 'flex', flexDirection: 'column' }}>

          {/* Status bar */}
          <div style={{ background: '#1a0a00', padding: '14px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>9:41</span>
            <div style={{ width: 70, height: 18, background: '#000', borderRadius: 10 }} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>●●●</span>
          </div>

          {/* App header */}
          <div style={{ background: 'linear-gradient(135deg, #92400e, #78350f)', padding: '16px 16px 12px', direction: 'rtl' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>أهلاً،</div>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>أحمد العتيبي ☕</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '6px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#F59E0B' }}>٣٢٠</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)' }}>نقطة</div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)' }}>الفطور ← الفضي</span>
                <span style={{ fontSize: 8, color: '#F59E0B' }}>١٨٠ نقطة باقية</span>
              </div>
              <div style={{ height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 3 }}>
                <div style={{ width: '64%', height: '100%', background: 'linear-gradient(90deg,#F59E0B,#EF4444)', borderRadius: 3 }} />
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ display: 'flex', background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {tabs.map((t, i) => (
              <button key={i} onClick={() => setTab(i)} style={{ flex: 1, padding: '8px 2px', fontSize: 9, fontFamily: 'Cairo,sans-serif', background: 'none', border: 'none', color: tab === i ? '#F59E0B' : 'rgba(255,255,255,0.4)', cursor: 'pointer', borderBottom: tab === i ? '2px solid #F59E0B' : '2px solid transparent', fontWeight: tab === i ? 800 : 500 }}>
                {t}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: '12px 12px', direction: 'rtl', overflowY: 'hidden' as const }}>
            {tab === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* Offer card */}
                <div style={{ background: 'linear-gradient(135deg,#92400e,#7c2d12)', borderRadius: 12, padding: '10px 12px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', marginBottom: 3 }}>🔥 عرض اليوم</div>
                  <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>قهوة مجانية</div>
                  <div style={{ fontSize: 9, color: '#F59E0B', marginTop: 2 }}>مع كل طلب فوق ٣٠ ريال</div>
                  <div style={{ position: 'absolute', left: -10, top: -10, fontSize: 40, opacity: 0.15 }}>☕</div>
                </div>

                {/* Menu items */}
                {[
                  { name: 'لاتيه خاص', price: '٢٢', pts: '+٢٢' },
                  { name: 'كرواسون بالجبن', price: '١٨', pts: '+١٨' },
                  { name: 'كابتشينو', price: '١٩', pts: '+١٩' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '8px 10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>{item.name}</div>
                      <div style={{ fontSize: 9, color: '#F59E0B' }}>{item.pts} نقطة</div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 900, color: '#F59E0B' }}>{item.price} ر</div>
                  </div>
                ))}
              </div>
            )}

            {tab === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { reward: 'قهوة مجانية', pts: '٢٠٠', emoji: '☕', locked: false },
                  { reward: 'خصم ١٥٪', pts: '٣٥٠', emoji: '🏷️', locked: false },
                  { reward: 'وجبة مجانية', pts: '٥٠٠', emoji: '🍽️', locked: true },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: r.locked ? 'rgba(255,255,255,0.03)' : 'rgba(245,158,11,0.08)', borderRadius: 12, padding: '10px 12px', border: `1px solid ${r.locked ? 'rgba(255,255,255,0.06)' : 'rgba(245,158,11,0.2)'}` }}>
                    <div style={{ fontSize: 22, opacity: r.locked ? 0.4 : 1 }}>{r.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: r.locked ? 'rgba(255,255,255,0.4)' : '#fff', fontFamily: 'Cairo,sans-serif' }}>{r.reward}</div>
                      <div style={{ fontSize: 9, color: '#F59E0B' }}>{r.pts} نقطة</div>
                    </div>
                    {!r.locked && <div style={{ fontSize: 9, background: '#F59E0B', color: '#000', padding: '3px 8px', borderRadius: 6, fontWeight: 800 }}>استبدل</div>}
                    {r.locked && <div style={{ fontSize: 14, opacity: 0.3 }}>🔒</div>}
                  </div>
                ))}
              </div>
            )}

            {tab === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { item: 'لاتيه + كرواسون', date: 'اليوم ١١:٢٠', total: '٤٠', pts: '+٤٠' },
                  { item: 'كابتشينو × ٢', date: 'أمس ٩:١٥', total: '٣٨', pts: '+٣٨' },
                  { item: 'قهوة صب + كيك', date: 'السبت', total: '٣٥', pts: '+٣٥' },
                ].map((o, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>{o.item}</div>
                      <div style={{ fontSize: 11, fontWeight: 900, color: '#F59E0B' }}>{o.total} ر</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{o.date}</div>
                      <div style={{ fontSize: 9, color: '#10B981' }}>{o.pts} نقطة ✓</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom nav */}
          <div style={{ background: '#1a1a1a', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '8px 0', display: 'flex', justifyContent: 'space-around' }}>
            {['🏠', '☕', '💳', '👤'].map((icon, i) => (
              <div key={i} style={{ fontSize: i === 0 ? 18 : 15, opacity: i === 0 ? 1 : 0.4 }}>{icon}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Countdown box ─── */
function CountBox({ val, label }: { val: number; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900, color: '#F59E0B', fontFamily: 'Cairo,sans-serif' }}>
        {String(val).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 5, fontFamily: 'Cairo,sans-serif' }}>{label}</div>
    </div>
  );
}

/* ─── Main ─── */
export default function RestaurantOffer() {
  const { d, h, m, s } = useCountdown();

  const features = [
    { icon: '📱', title: 'تطبيق بالاسم والألوان', desc: 'هويتك الرقمية الخاصة — مو شركة ثانية' },
    { icon: '💳', title: 'Apple Wallet', desc: 'بطاقة ولاء في جوال الزبون مباشرة' },
    { icon: '⭐', title: 'نقاط ومكافآت', desc: 'زبونك يجمع ويستبدل تلقائياً' },
    { icon: '🤖', title: 'واتساب AI', desc: 'يرد على استفسارات زبائنك ٢٤/٧' },
    { icon: '📊', title: 'تقارير فورية', desc: 'شوف أكثر الأصناف مبيعاً والساعات الذهبية' },
    { icon: '🔔', title: 'إشعارات مخصصة', desc: 'وصّل عروضك لزبائنك مباشرة' },
  ];

  return (
    <section style={{ padding: 'clamp(80px,10vw,120px) 0', background: 'linear-gradient(180deg, var(--bg) 0%, #0a0500 50%, var(--bg) 100%)', position: 'relative', overflow: 'hidden' }}>

      {/* Warm orbs */}
      <div className="orb" style={{ width: 600, height: 600, top: '-10%', right: '-10%', background: 'rgba(245,158,11,0.07)', animationDelay: '-4s' }} />
      <div className="orb" style={{ width: 500, height: 500, bottom: '10%', left: '-10%', background: 'rgba(239,68,68,0.05)', animationDelay: '-9s' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* ── Badge ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 99, padding: '6px 18px', marginBottom: 24, fontSize: 13, fontWeight: 700, color: '#F59E0B' }}>
            🔥 عرض حصري للمطاعم والكافيهات
          </div>

          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.6rem)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
            تطبيق ولاء كامل<br />
            <span style={{ background: 'linear-gradient(135deg,#F59E0B,#EF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              بـ ٤٩٩ ريال / شهر
            </span>
          </h2>

          <p style={{ fontSize: 17, color: 'var(--text2)', maxWidth: 480, margin: '0 auto' }}>
            زبائنك يجمعون النقاط، يستردون المكافآت،<br />ويحملون بطاقتك في Apple Wallet — باسمك أنت.
          </p>
        </motion.div>

        {/* ── Countdown ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 64 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>⏳ العرض ينتهي خلال</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <CountBox val={d} label="يوم" />
            <div style={{ fontSize: 22, color: '#F59E0B', marginTop: 14, fontWeight: 900 }}>:</div>
            <CountBox val={h} label="ساعة" />
            <div style={{ fontSize: 22, color: '#F59E0B', marginTop: 14, fontWeight: 900 }}>:</div>
            <CountBox val={m} label="دقيقة" />
            <div style={{ fontSize: 22, color: '#F59E0B', marginTop: 14, fontWeight: 900 }}>:</div>
            <CountBox val={s} label="ثانية" />
          </div>
        </motion.div>

        {/* ── Main grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'center', marginBottom: 80 }}>

          {/* Phone */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <AppPreview />
            <div style={{ textAlign: 'center', marginTop: 14, fontSize: 11, color: 'var(--text3)', fontWeight: 600 }}>
              ▶ معاينة حقيقية — تطبيقك بألوانك وهويتك
            </div>
          </motion.div>

          {/* Features */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
              {features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="glass" style={{ padding: '14px 14px', borderRadius: 14 }}>
                  <div style={{ fontSize: 22, marginBottom: 7 }}>{f.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 900, color: '#fff', marginBottom: 4 }}>{f.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.5 }}>{f.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Price card */}
            <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(239,68,68,0.08) 100%)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 20, padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>رسوم التأسيس (لمرة وحدة)</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 28, fontWeight: 900, color: '#F59E0B' }}>٩٩٩</span>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>ريال</span>
                  </div>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>الاشتراك الشهري</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 28, fontWeight: 900, color: '#fff' }}>٤٩٩</span>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>ر/شهر</span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14, marginBottom: 16 }}>
                {['إعداد التطبيق بألوانك ولوقوك', 'الاستضافة مجاناً — كل شيء علينا', 'أول شهر مجاني بعد التأسيس', 'دعم فني على واتساب ٧ أيام'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, direction: 'rtl' }}>
                    <span style={{ color: '#10B981', fontSize: 14, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{item}</span>
                  </div>
                ))}
              </div>

              <a href={WA} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '15px 24px', borderRadius: 14, background: 'linear-gradient(135deg,#F59E0B,#EF4444)', color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 16, fontWeight: 900, textDecoration: 'none', boxShadow: '0 12px 32px rgba(245,158,11,0.4)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                احجز مقعدك الآن — المقاعد محدودة
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Social proof ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { num: '+٢٠٠', label: 'زبون راضي', sub: 'انضموا في أول أسبوع' },
            { num: '٣×', label: 'ارتفاع عودة الزبائن', sub: 'متوسط بعد ٣٠ يوم' },
            { num: '٢٤ ساعة', label: 'وقت الإطلاق', sub: 'من التوقيع للإطلاق' },
          ].map((s, i) => (
            <div key={i} className="glass" style={{ padding: '20px 24px', borderRadius: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#F59E0B', marginBottom: 4 }}>{s.num}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.sub}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
