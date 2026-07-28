export function FrostGlass() {
  return (
    <div style={{
      minHeight: '100vh', background: '#07070f', fontFamily: 'Cairo, sans-serif',
      direction: 'rtl', padding: 40, display: 'flex', flexDirection: 'column', gap: 24,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Label */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: 3, textTransform: 'uppercase' }}>
          STYLE A — FROST GLASS
        </span>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginTop: 4 }}>زجاجي خفيف ومريح للعين</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>blur خفيف • حدود شفافة • خلفية باردة</div>
      </div>

      {/* Hero card */}
      <div style={{
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 24, padding: '32px 28px',
        boxShadow: '0 4px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(124,58,237,0.35)',
          }}>
            <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="1.75" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>منصة تلقا</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>حلول رقمية متكاملة</div>
          </div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1.3, marginBottom: 8 }}>
          نحوّل أفكارك إلى<br/>
          <span style={{ background: 'linear-gradient(90deg,#7C3AED,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            منتجات رقمية
          </span>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
          تطبيقات ولاء · مواقع احترافية · Apple Wallet · حجوزات ذكية
        </div>
      </div>

      {/* 3 service cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {[
          { icon: '📱', title: 'تطبيقات الولاء', sub: '١٢+ عميل', color: '#7C3AED' },
          { icon: '🌐', title: 'المواقع', sub: '٢٠+ موقع', color: '#06B6D4' },
          { icon: '💳', title: 'Apple Wallet', sub: 'Face ID', color: '#10B981' },
        ].map((s, i) => (
          <div key={i} style={{
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            background: 'rgba(255,255,255,0.035)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 18, padding: '20px 16px',
            boxShadow: '0 2px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div style={{
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 18, padding: '20px 28px',
        display: 'flex', justifyContent: 'space-around',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      }}>
        {[['٣٢+','مشروع منجز'],['١٨','عميل راضٍ'],['٤٩','يوماً متوسط التسليم']].map(([n, l], i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -2 }}>{n}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 4 }}>
        <button style={{
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
          border: 'none', borderRadius: 14, padding: '14px 32px',
          color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', boxShadow: '0 8px 32px rgba(124,58,237,0.4)',
        }}>ابدأ مشروعك</button>
        <button style={{
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 14, padding: '14px 28px',
          color: 'rgba(255,255,255,0.8)', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 600,
          cursor: 'pointer',
        }}>شاهد الأعمال</button>
      </div>
    </div>
  );
}
