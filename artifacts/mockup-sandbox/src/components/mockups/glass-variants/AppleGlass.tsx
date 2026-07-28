export function AppleGlass() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1a1a2e 0%, #0f0f1a 35%, #0d1f2d 70%, #0a0a14 100%)',
      fontFamily: "'Cairo', -apple-system, BlinkMacSystemFont, sans-serif",
      direction: 'rtl', padding: '36px 40px',
      display: 'flex', flexDirection: 'column', gap: 16,
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Apple-style background — subtle, not neon */}
      <div style={{
        position: 'absolute', top: -200, right: -200, width: 700, height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.28) 0%, rgba(79,70,229,0.10) 40%, transparent 65%)',
        pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', bottom: -150, left: -100, width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0.06) 45%, transparent 68%)',
        pointerEvents: 'none',
      }}/>
      {/* Apple-style noise/texture layer */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
      }}/>

      {/* Navbar — apple-style pill */}
      <div style={{
        backdropFilter: 'blur(40px) saturate(180%) brightness(1.1)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(1.1)',
        background: 'rgba(28, 28, 35, 0.72)',
        border: '0.5px solid rgba(255,255,255,0.14)',
        borderRadius: 18, padding: '12px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 2px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.10)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(145deg, #6366f1, #4f46e5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(99,102,241,0.5)',
          }}>
            <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: -0.3 }}>تلقا تك</span>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {['التطبيقات','المواقع','الأسعار','تواصل'].map(t => (
            <span key={t} style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 600, cursor: 'pointer' }}>{t}</span>
          ))}
        </div>
        <div style={{
          padding: '7px 16px', borderRadius: 10,
          background: 'rgba(255,255,255,0.10)',
          border: '0.5px solid rgba(255,255,255,0.20)',
          fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)',
        }}>ابدأ</div>
      </div>

      {/* Hero section */}
      <div style={{
        backdropFilter: 'blur(60px) saturate(200%) brightness(1.05)',
        WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.05)',
        background: 'rgba(28, 28, 40, 0.65)',
        border: '0.5px solid rgba(255,255,255,0.15)',
        borderRadius: 24, padding: '30px 28px',
        boxShadow: '0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.2)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle inner gradient top edge — Apple "specular" highlight */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.20) 30%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.20) 70%, transparent 95%)',
        }}/>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ flex: 1 }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 10px', borderRadius: 20,
              background: 'rgba(99,102,241,0.16)',
              border: '0.5px solid rgba(99,102,241,0.35)',
              marginBottom: 14,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#6ee7b7', boxShadow: '0 0 6px #6ee7b7' }}/>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(167,139,250,0.9)', letterSpacing: 0.3 }}>متاح للمشاريع الجديدة</span>
            </div>

            <div style={{ fontSize: 30, fontWeight: 800, color: 'rgba(255,255,255,0.95)', lineHeight: 1.25, letterSpacing: -0.8, marginBottom: 10 }}>
              نحوّل أفكارك<br/>
              <span style={{
                background: 'linear-gradient(90deg, rgba(167,139,250,1) 0%, rgba(129,140,248,1) 40%, rgba(34,211,238,0.9) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>إلى منتجات رقمية</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.40)', lineHeight: 1.75, maxWidth: 340 }}>
              تطبيقات ولاء · مواقع احترافية · Apple Wallet · حجوزات ذكية
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button style={{
                padding: '10px 22px', borderRadius: 12,
                background: 'rgba(99,102,241,0.85)',
                border: '0.5px solid rgba(129,140,248,0.5)',
                color: '#fff', fontSize: 13, fontWeight: 700,
                fontFamily: "'Cairo',sans-serif", cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
              }}>ابدأ مشروعك</button>
              <button style={{
                padding: '10px 18px', borderRadius: 12,
                background: 'rgba(255,255,255,0.08)',
                border: '0.5px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: 600,
                fontFamily: "'Cairo',sans-serif", cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              }}>شاهد الأعمال</button>
            </div>
          </div>

          {/* Stats block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
            {[
              { n: '٣٢+', l: 'مشروع منجز', c: 'rgba(167,139,250,0.9)' },
              { n: '١٨', l: 'عميل راضٍ', c: 'rgba(34,211,238,0.9)' },
              { n: '٤٩ي', l: 'متوسط التسليم', c: 'rgba(110,231,183,0.9)' },
            ].map((s, i) => (
              <div key={i} style={{
                backdropFilter: 'blur(30px) saturate(160%)',
                WebkitBackdropFilter: 'blur(30px) saturate(160%)',
                background: 'rgba(255,255,255,0.06)',
                border: '0.5px solid rgba(255,255,255,0.12)',
                borderRadius: 14, padding: '10px 14px',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.c, letterSpacing: -1, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', marginTop: 3, fontWeight: 600 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { icon: '📱', title: 'تطبيقات الولاء', sub: '١٢+ عميل', accent: 'rgba(167,139,250,0.18)', border: 'rgba(167,139,250,0.22)' },
          { icon: '🌐', title: 'المواقع', sub: '٢٠+ موقع', accent: 'rgba(34,211,238,0.12)', border: 'rgba(34,211,238,0.20)' },
          { icon: '💳', title: 'Apple Wallet', sub: 'Face ID', accent: 'rgba(110,231,183,0.12)', border: 'rgba(110,231,183,0.20)' },
          { icon: '📅', title: 'الحجوزات', sub: 'ذكي', accent: 'rgba(251,191,36,0.10)', border: 'rgba(251,191,36,0.18)' },
        ].map((s, i) => (
          <div key={i} style={{
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            background: `linear-gradient(145deg, ${s.accent} 0%, rgba(28,28,40,0.55) 100%)`,
            border: `0.5px solid ${s.border}`,
            borderRadius: 18, padding: '18px 14px',
            textAlign: 'center',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.10)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            }}/>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.88)', marginBottom: 3 }}>{s.title}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
        {/* Featured project card */}
        <div style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          background: 'rgba(28,28,40,0.62)',
          border: '0.5px solid rgba(255,255,255,0.13)',
          borderRadius: 20, padding: '20px 22px',
          boxShadow: '0 6px 36px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.10)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.18) 50%, transparent 95%)' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: 2, marginBottom: 4 }}>آخر المشاريع</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'rgba(255,255,255,0.92)' }}>Brown Dose — تطبيق الولاء</div>
            </div>
            <div style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(110,231,183,0.14)', border: '0.5px solid rgba(110,231,183,0.3)',
              fontSize: 9, fontWeight: 700, color: 'rgba(110,231,183,0.9)' }}>مُنجز ✓</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['React Native','Node.js','Apple Wallet','Push'].map(t => (
              <div key={t} style={{ padding: '4px 10px', borderRadius: 8,
                background: 'rgba(255,255,255,0.07)', border: '0.5px solid rgba(255,255,255,0.12)',
                fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>{t}</div>
            ))}
          </div>
        </div>

        {/* CTA card */}
        <div style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          background: 'linear-gradient(145deg, rgba(99,102,241,0.22) 0%, rgba(28,28,40,0.65) 100%)',
          border: '0.5px solid rgba(129,140,248,0.28)',
          borderRadius: 20, padding: '20px 22px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          boxShadow: '0 6px 36px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.12)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.4), transparent)' }}/>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(167,139,250,0.7)', letterSpacing: 2, marginBottom: 6 }}>تواصل معنا</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,0.92)', lineHeight: 1.3 }}>
              ابدأ مشروعك اليوم
            </div>
          </div>
          <button style={{
            padding: '10px 16px', borderRadius: 12, marginTop: 14,
            background: 'rgba(99,102,241,0.80)',
            border: '0.5px solid rgba(129,140,248,0.45)',
            color: '#fff', fontSize: 12, fontWeight: 700,
            fontFamily: "'Cairo',sans-serif", cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}>واتساب 💬</button>
        </div>
      </div>
    </div>
  );
}
