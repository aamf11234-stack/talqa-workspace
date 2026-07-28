export function DarkGlass() {
  return (
    <div style={{
      minHeight: '100vh', background: '#050509', fontFamily: 'Cairo, sans-serif',
      direction: 'rtl', padding: 40, display: 'flex', flexDirection: 'column', gap: 24,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background mesh */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(124,58,237,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6,182,212,0.08) 0%, transparent 50%)',
        pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      {/* Label */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(124,58,237,0.6)', letterSpacing: 3, textTransform: 'uppercase' }}>
          STYLE B — DARK GLASS
        </span>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginTop: 4 }}>زجاجي داكن وعميق</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>blur قوي • ظلال عميقة • حدود ملونة</div>
      </div>

      {/* Hero card — strong glass */}
      <div style={{
        backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(0,0,0,0.4) 100%)',
        border: '1px solid rgba(124,58,237,0.25)',
        borderRadius: 24, padding: '32px 28px',
        boxShadow: '0 8px 64px rgba(0,0,0,0.5), 0 1px 0 rgba(124,58,237,0.2) inset',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* top shimmer line */}
        <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'linear-gradient(135deg, #7C3AED88, #4F46E555)',
            border: '1px solid rgba(124,58,237,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(124,58,237,0.4)',
          }}>
            <svg width="20" height="20" fill="none" stroke="#a78bfa" strokeWidth="1.75" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>منصة تلقا</div>
            <div style={{ fontSize: 11, color: 'rgba(167,139,250,0.6)' }}>حلول رقمية متكاملة</div>
          </div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1.3, marginBottom: 8 }}>
          نحوّل أفكارك إلى<br/>
          <span style={{ background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            منتجات رقمية
          </span>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
          تطبيقات ولاء · مواقع احترافية · Apple Wallet · حجوزات ذكية
        </div>
      </div>

      {/* 3 service cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {[
          { icon: '📱', title: 'تطبيقات الولاء', sub: '١٢+ عميل', border: 'rgba(124,58,237,0.3)', glow: 'rgba(124,58,237,0.15)' },
          { icon: '🌐', title: 'المواقع', sub: '٢٠+ موقع', border: 'rgba(6,182,212,0.3)', glow: 'rgba(6,182,212,0.1)' },
          { icon: '💳', title: 'Apple Wallet', sub: 'Face ID', border: 'rgba(16,185,129,0.3)', glow: 'rgba(16,185,129,0.1)' },
        ].map((s, i) => (
          <div key={i} style={{
            backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
            background: `linear-gradient(135deg, ${s.glow} 0%, rgba(0,0,0,0.35) 100%)`,
            border: `1px solid ${s.border}`,
            borderRadius: 18, padding: '20px 16px',
            boxShadow: `0 4px 32px rgba(0,0,0,0.4), 0 0 0 0.5px ${s.border} inset`,
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
              background: `linear-gradient(90deg, transparent, ${s.border}, transparent)` }} />
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{
        backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
        background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(0,0,0,0.4) 100%)',
        border: '1px solid rgba(6,182,212,0.2)',
        borderRadius: 18, padding: '20px 28px',
        display: 'flex', justifyContent: 'space-around',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)' }} />
        {[['٣٢+','مشروع منجز'],['١٨','عميل راضٍ'],['٤٩','يوماً متوسط التسليم']].map(([n, l], i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -2 }}>{n}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 4 }}>
        <button style={{
          background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
          border: '1px solid rgba(124,58,237,0.5)', borderRadius: 14, padding: '14px 32px',
          color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', boxShadow: '0 8px 32px rgba(124,58,237,0.45), 0 0 0 1px rgba(167,139,250,0.2) inset',
        }}>ابدأ مشروعك</button>
        <button style={{
          backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '14px 28px',
          color: 'rgba(255,255,255,0.7)', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 600,
          cursor: 'pointer',
        }}>شاهد الأعمال</button>
      </div>
    </div>
  );
}
