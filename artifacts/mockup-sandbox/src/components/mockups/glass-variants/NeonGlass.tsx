export function NeonGlass() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #08031e 0%, #040408 50%, #03101a 100%)',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      padding: 40, display: 'flex', flexDirection: 'column', gap: 20,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Plasma orbs */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.45) 0%, rgba(99,102,241,0.2) 30%, transparent 60%)',
        filter: 'blur(2px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -50, left: -50, width: 520, height: 520, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.35) 0%, rgba(6,182,212,0.12) 35%, transparent 60%)',
        filter: 'blur(2px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '38%', width: 340, height: 340, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(244,63,94,0.18) 0%, transparent 55%)',
        filter: 'blur(1px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
        backgroundSize: '52px 52px' }} />

      {/* Label */}
      <div style={{ textAlign: 'center', marginBottom: 4, position: 'relative' }}>
        <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.15))',
          border: '1px solid rgba(124,58,237,0.4)',
          fontSize: 10, fontWeight: 700, letterSpacing: 3,
          background2: 'none',
          color: 'transparent',
          WebkitBackgroundClip: 'unset',
        }}>
          <span style={{ background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700, fontSize: 10, letterSpacing: 3 }}>STYLE C — NEON GLASS</span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginTop: 8 }}>زجاجي نيون متوهج</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>حدود Gradient · توهج بلازما · جرئ</div>
      </div>

      {/* Hero — gradient border */}
      <div style={{ padding: 1.5, borderRadius: 23.5,
        background: 'linear-gradient(135deg, rgba(124,58,237,0.75) 0%, rgba(6,182,212,0.55) 50%, rgba(244,63,94,0.35) 100%)',
        boxShadow: '0 0 48px rgba(124,58,237,0.22), 0 0 90px rgba(6,182,212,0.12)',
      }}>
        <div style={{
          backdropFilter: 'blur(48px) saturate(220%)', WebkitBackdropFilter: 'blur(48px) saturate(220%)',
          background: 'linear-gradient(135deg, rgba(12,5,32,0.88) 0%, rgba(4,4,20,0.92) 100%)',
          borderRadius: 22, padding: '28px 26px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, position: 'relative' }}>
            <div style={{ padding: 1.5, borderRadius: 14.5,
              background: 'linear-gradient(135deg, rgba(124,58,237,0.9), rgba(6,182,212,0.6))',
              boxShadow: '0 0 24px rgba(124,58,237,0.55)' }}>
              <div style={{ width: 41, height: 41, borderRadius: 13, background: 'rgba(10,4,28,0.85)',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" fill="none" strokeWidth="1.75" viewBox="0 0 24 24">
                  <defs><linearGradient id="ng1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient></defs>
                  <path stroke="url(#ng1)" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#fff' }}>منصة تلقا</div>
              <span style={{ fontSize: 11, background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                حلول رقمية متكاملة
              </span>
            </div>
            <div style={{ marginRight: 'auto', padding: '4px 12px', borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.18))',
              border: '1px solid rgba(124,58,237,0.45)',
              fontSize: 10, fontWeight: 700,
            }}>
              <span style={{ background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🟢 متاح الآن</span>
            </div>
          </div>

          <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', lineHeight: 1.35, marginBottom: 8, position: 'relative' }}>
            نحوّل أفكارك إلى<br/>
            <span style={{ background: 'linear-gradient(90deg,#a78bfa,#22d3ee,#f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              منتجات رقمية ✦
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', lineHeight: 1.8, position: 'relative' }}>
            تطبيقات ولاء · مواقع احترافية · Apple Wallet · حجوزات ذكية
          </div>
        </div>
      </div>

      {/* 3 cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {[
          { emoji: '📱', title: 'تطبيقات', sub: '١٢+ عميل', from: '#7C3AED', to: '#4F46E5' },
          { emoji: '🌐', title: 'المواقع', sub: '٢٠+ موقع', from: '#06B6D4', to: '#0284C7' },
          { emoji: '💳', title: 'Apple Wallet', sub: 'Face ID', from: '#10B981', to: '#059669' },
        ].map((s, i) => (
          <div key={i} style={{ padding: 1.5, borderRadius: 19.5,
            background: `linear-gradient(135deg, ${s.from}88, ${s.to}44)`,
            boxShadow: `0 0 36px ${s.from}22` }}>
            <div style={{
              backdropFilter: 'blur(48px) saturate(200%)', WebkitBackdropFilter: 'blur(48px) saturate(200%)',
              background: 'rgba(4,4,20,0.88)',
              borderRadius: 18, padding: '18px 14px', textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)',
                width: 70, height: 70, borderRadius: '50%',
                background: `radial-gradient(circle, ${s.from}30, transparent 65%)`, pointerEvents: 'none' }} />
              <div style={{ fontSize: 26, marginBottom: 6, position: 'relative' }}>{s.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', marginBottom: 3, position: 'relative' }}>{s.title}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', position: 'relative' }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ padding: 1.5, borderRadius: 19.5,
        background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(6,182,212,0.35))',
        boxShadow: '0 0 55px rgba(124,58,237,0.12)' }}>
        <div style={{
          backdropFilter: 'blur(48px) saturate(200%)', WebkitBackdropFilter: 'blur(48px) saturate(200%)',
          background: 'rgba(4,4,20,0.88)',
          borderRadius: 18, padding: '18px 24px',
          display: 'flex', justifyContent: 'space-around',
        }}>
          {[['٣٢+','مشروع'],['١٨','عميل راضٍ'],['٤٩ي','توصيل']].map(([n, l], i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: -1.5,
                background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <div style={{ padding: 1.5, borderRadius: 15.5,
          background: 'linear-gradient(135deg, #7C3AED, #22d3ee)',
          boxShadow: '0 8px 48px rgba(124,58,237,0.55), 0 0 100px rgba(6,182,212,0.2)' }}>
          <button style={{
            background: 'linear-gradient(135deg,#7C3AED,#5b21b6)',
            border: 'none', borderRadius: 14, padding: '13px 30px',
            color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>ابدأ مشروعك</button>
        </div>
        <div style={{ padding: 1.5, borderRadius: 15.5,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))' }}>
          <button style={{
            backdropFilter: 'blur(48px)', WebkitBackdropFilter: 'blur(48px)',
            background: 'rgba(4,4,20,0.75)', border: 'none',
            borderRadius: 14, padding: '13px 26px',
            color: 'rgba(255,255,255,0.78)', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>شاهد الأعمال</button>
        </div>
      </div>
    </div>
  );
}
