export function FrostGlass() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d0620 0%, #07070f 40%, #040e1a 100%)',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      padding: 40, display: 'flex', flexDirection: 'column', gap: 20,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Rich background so backdrop-filter has something to blur */}
      <div style={{ position: 'absolute', top: -120, right: -120, width: 560, height: 560, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(79,70,229,0.15) 40%, transparent 70%)',
        filter: 'blur(1px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 450, height: 450, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(6,182,212,0.08) 45%, transparent 70%)',
        filter: 'blur(1px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '45%', left: '35%', width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 65%)',
        pointerEvents: 'none' }} />
      {/* Grid texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '48px 48px' }} />

      {/* Label */}
      <div style={{ textAlign: 'center', marginBottom: 4, position: 'relative' }}>
        <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 20,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
          fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 3 }}>
          STYLE A — FROST GLASS
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginTop: 8 }}>زجاجي خفيف ومريح</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 3 }}>blur ناعم ٢٠px · حدود شفافة · هادئ</div>
      </div>

      {/* Hero card */}
      <div style={{
        backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        background: 'rgba(255,255,255,0.055)',
        border: '1px solid rgba(255,255,255,0.13)',
        borderRadius: 22, padding: '28px 26px',
        boxShadow: '0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14,
            background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(124,58,237,0.4)' }}>
            <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="1.75" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 900, color: '#fff' }}>منصة تلقا</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.42)' }}>حلول رقمية متكاملة</div>
          </div>
          <div style={{ marginRight: 'auto', padding: '4px 12px', borderRadius: 20,
            background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.3)',
            fontSize: 10, color: '#a78bfa', fontWeight: 700 }}>🟢 متاح الآن</div>
        </div>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', lineHeight: 1.35, marginBottom: 8 }}>
          نحوّل أفكارك إلى<br/>
          <span style={{ background: 'linear-gradient(90deg,#7C3AED,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            منتجات رقمية ✦
          </span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>
          تطبيقات ولاء · مواقع احترافية · Apple Wallet · حجوزات ذكية
        </div>
      </div>

      {/* 3 cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {[
          { emoji: '📱', title: 'تطبيقات', sub: '١٢+ عميل', accent: 'rgba(124,58,237,0.22)' },
          { emoji: '🌐', title: 'المواقع', sub: '٢٠+ موقع', accent: 'rgba(6,182,212,0.18)' },
          { emoji: '💳', title: 'Apple Wallet', sub: 'Face ID', accent: 'rgba(16,185,129,0.18)' },
        ].map((s, i) => (
          <div key={i} style={{
            backdropFilter: 'blur(20px) saturate(150%)', WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            background: `rgba(255,255,255,0.045)`,
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 18, padding: '18px 14px', textAlign: 'center',
            boxShadow: '0 4px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}>
            <div style={{ fontSize: 26, marginBottom: 6 }}>{s.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', marginBottom: 3 }}>{s.title}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{
        backdropFilter: 'blur(20px) saturate(150%)', WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 18, padding: '18px 24px',
        display: 'flex', justifyContent: 'space-around',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
      }}>
        {[['٣٢+','مشروع'],['١٨','عميل راضٍ'],['٤٩ي','توصيل']].map(([n, l], i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: -1.5 }}>{n}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button style={{
          background: 'linear-gradient(135deg,#7C3AED,#4F46E5)', border: 'none',
          borderRadius: 14, padding: '13px 30px',
          color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 8px 28px rgba(124,58,237,0.45)',
        }}>ابدأ مشروعك</button>
        <button style={{
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 14, padding: '13px 26px',
          color: 'rgba(255,255,255,0.82)', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>شاهد الأعمال</button>
      </div>
    </div>
  );
}
