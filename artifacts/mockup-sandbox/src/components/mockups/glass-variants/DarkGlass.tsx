export function DarkGlass() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0520 0%, #050509 45%, #040e18 100%)',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      padding: 40, display: 'flex', flexDirection: 'column', gap: 20,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Rich plasma background */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 580, height: 580, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.40) 0%, rgba(79,70,229,0.18) 35%, transparent 65%)',
        pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 480, height: 480, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.28) 0%, rgba(6,182,212,0.09) 40%, transparent 65%)',
        pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '38%', left: '42%', width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(244,63,94,0.12) 0%, transparent 60%)',
        pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px' }} />

      {/* Label */}
      <div style={{ textAlign: 'center', marginBottom: 4, position: 'relative' }}>
        <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 20,
          background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.35)',
          fontSize: 10, fontWeight: 700, color: 'rgba(167,139,250,0.8)', letterSpacing: 3 }}>
          STYLE B — DARK GLASS
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginTop: 8 }}>زجاجي داكن وعميق</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>blur قوي ٤٠px · حدود ملونة · ظلال عميقة</div>
      </div>

      {/* Hero card */}
      <div style={{
        backdropFilter: 'blur(40px) saturate(200%)', WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.14) 0%, rgba(5,5,20,0.6) 100%)',
        border: '1px solid rgba(124,58,237,0.28)',
        borderRadius: 22, padding: '28px 26px',
        boxShadow: '0 12px 60px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(124,58,237,0.15) inset',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* shimmer top */}
        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.7), transparent)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14,
            background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(124,58,237,0.45)' }}>
            <svg width="20" height="20" fill="none" stroke="#a78bfa" strokeWidth="1.75" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 900, color: '#fff' }}>منصة تلقا</div>
            <div style={{ fontSize: 11, color: 'rgba(167,139,250,0.65)' }}>حلول رقمية متكاملة</div>
          </div>
          <div style={{ marginRight: 'auto', padding: '4px 12px', borderRadius: 20,
            background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)',
            fontSize: 10, color: '#a78bfa', fontWeight: 700 }}>🟢 متاح الآن</div>
        </div>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', lineHeight: 1.35, marginBottom: 8 }}>
          نحوّل أفكارك إلى<br/>
          <span style={{ background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            منتجات رقمية ✦
          </span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', lineHeight: 1.8 }}>
          تطبيقات ولاء · مواقع احترافية · Apple Wallet · حجوزات ذكية
        </div>
      </div>

      {/* 3 cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {[
          { emoji: '📱', title: 'تطبيقات', sub: '١٢+ عميل', border: 'rgba(124,58,237,0.32)', bg: 'rgba(124,58,237,0.10)', shimmer: 'rgba(124,58,237,0.6)' },
          { emoji: '🌐', title: 'المواقع', sub: '٢٠+ موقع', border: 'rgba(6,182,212,0.28)', bg: 'rgba(6,182,212,0.08)', shimmer: 'rgba(6,182,212,0.5)' },
          { emoji: '💳', title: 'Apple Wallet', sub: 'Face ID', border: 'rgba(16,185,129,0.28)', bg: 'rgba(16,185,129,0.08)', shimmer: 'rgba(16,185,129,0.5)' },
        ].map((s, i) => (
          <div key={i} style={{
            backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            background: `linear-gradient(135deg, ${s.bg} 0%, rgba(5,5,20,0.5) 100%)`,
            border: `1px solid ${s.border}`,
            borderRadius: 18, padding: '18px 14px', textAlign: 'center',
            boxShadow: `0 4px 32px rgba(0,0,0,0.45)`,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
              background: `linear-gradient(90deg, transparent, ${s.shimmer}, transparent)` }} />
            <div style={{ fontSize: 26, marginBottom: 6 }}>{s.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', marginBottom: 3 }}>{s.title}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{
        backdropFilter: 'blur(40px) saturate(200%)', WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        background: 'linear-gradient(135deg, rgba(6,182,212,0.09) 0%, rgba(5,5,20,0.55) 100%)',
        border: '1px solid rgba(6,182,212,0.22)',
        borderRadius: 18, padding: '18px 24px',
        display: 'flex', justifyContent: 'space-around',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 6px 40px rgba(0,0,0,0.45)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.55), transparent)' }} />
        {[['٣٢+','مشروع'],['١٨','عميل راضٍ'],['٤٩ي','توصيل']].map(([n, l], i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: -1.5 }}>{n}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button style={{
          background: 'linear-gradient(135deg,#7C3AED,#4F46E5)', border: '1px solid rgba(124,58,237,0.5)',
          borderRadius: 14, padding: '13px 30px',
          color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(124,58,237,0.5), inset 0 1px 0 rgba(167,139,250,0.25)',
        }}>ابدأ مشروعك</button>
        <button style={{
          backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 14, padding: '13px 26px',
          color: 'rgba(255,255,255,0.75)', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>شاهد الأعمال</button>
      </div>
    </div>
  );
}
