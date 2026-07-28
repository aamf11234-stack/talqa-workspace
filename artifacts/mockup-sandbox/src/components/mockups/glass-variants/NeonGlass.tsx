export function NeonGlass() {
  return (
    <div style={{
      minHeight: '100vh', background: '#040408', fontFamily: 'Cairo, sans-serif',
      direction: 'rtl', padding: 40, display: 'flex', flexDirection: 'column', gap: 24,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background plasma */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: 600, height: 600,
        borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 60%)',
        filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 500, height: 500,
        borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(6,182,212,0.15) 0%, transparent 60%)',
        filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '40%', width: 300, height: 300,
        borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(244,63,94,0.08) 0%, transparent 60%)',
        filter: 'blur(40px)', pointerEvents: 'none' }} />

      {/* Label */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700,
          background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: 3, textTransform: 'uppercase' }}>
          STYLE C — NEON GLASS
        </span>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginTop: 4 }}>زجاجي نيون متوهج</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>حدود متدرجة • توهج ألوان • تأثير بلازما</div>
      </div>

      {/* Hero — gradient border trick */}
      <div style={{ padding: 1.5, borderRadius: 25,
        background: 'linear-gradient(135deg, rgba(124,58,237,0.7) 0%, rgba(6,182,212,0.5) 50%, rgba(244,63,94,0.3) 100%)',
        boxShadow: '0 0 40px rgba(124,58,237,0.2), 0 0 80px rgba(6,182,212,0.1)',
      }}>
        <div style={{
          backdropFilter: 'blur(48px)', WebkitBackdropFilter: 'blur(48px)',
          background: 'linear-gradient(135deg, rgba(10,5,30,0.85) 0%, rgba(5,5,20,0.9) 100%)',
          borderRadius: 23.5, padding: '32px 28px', position: 'relative', overflow: 'hidden',
        }}>
          {/* inner glow */}
          <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, position: 'relative' }}>
            <div style={{ padding: 1.5, borderRadius: 14.5,
              background: 'linear-gradient(135deg, rgba(124,58,237,0.8), rgba(6,182,212,0.5))',
              boxShadow: '0 0 20px rgba(124,58,237,0.5)',
            }}>
              <div style={{
                width: 41, height: 41, borderRadius: 13,
                background: 'rgba(10,5,30,0.8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" fill="none" strokeWidth="1.75" viewBox="0 0 24 24"
                  style={{ stroke: 'url(#grad1)' }}>
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a78bfa"/>
                      <stop offset="100%" stopColor="#22d3ee"/>
                    </linearGradient>
                  </defs>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>منصة تلقا</div>
              <div style={{ fontSize: 11,
                background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                حلول رقمية متكاملة
              </div>
            </div>
          </div>

          <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1.3, marginBottom: 8, position: 'relative' }}>
            نحوّل أفكارك إلى<br/>
            <span style={{ background: 'linear-gradient(90deg,#a78bfa,#22d3ee,#f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              منتجات رقمية
            </span>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, position: 'relative' }}>
            تطبيقات ولاء · مواقع احترافية · Apple Wallet · حجوزات ذكية
          </div>
        </div>
      </div>

      {/* 3 service cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {[
          { icon: '📱', title: 'تطبيقات الولاء', sub: '١٢+ عميل', from: '#7C3AED', to: '#4F46E5' },
          { icon: '🌐', title: 'المواقع', sub: '٢٠+ موقع', from: '#06B6D4', to: '#0284C7' },
          { icon: '💳', title: 'Apple Wallet', sub: 'Face ID', from: '#10B981', to: '#059669' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: 1.5, borderRadius: 19,
            background: `linear-gradient(135deg, ${s.from}88, ${s.to}44)`,
            boxShadow: `0 0 30px ${s.from}22`,
          }}>
            <div style={{
              backdropFilter: 'blur(48px)', WebkitBackdropFilter: 'blur(48px)',
              background: 'rgba(5,5,20,0.85)',
              borderRadius: 17.5, padding: '20px 16px', textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
                width: 60, height: 60, borderRadius: '50%',
                background: `radial-gradient(circle, ${s.from}33, transparent 70%)`, pointerEvents: 'none' }} />
              <div style={{ fontSize: 28, marginBottom: 8, position: 'relative' }}>{s.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', marginBottom: 4, position: 'relative' }}>{s.title}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', position: 'relative' }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ padding: 1.5, borderRadius: 19,
        background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(6,182,212,0.3))',
        boxShadow: '0 0 50px rgba(124,58,237,0.1)',
      }}>
        <div style={{
          backdropFilter: 'blur(48px)', WebkitBackdropFilter: 'blur(48px)',
          background: 'rgba(5,5,20,0.85)',
          borderRadius: 17.5, padding: '20px 28px',
          display: 'flex', justifyContent: 'space-around',
        }}>
          {[['٣٢+','مشروع منجز'],['١٨','عميل راضٍ'],['٤٩','يوماً']].map(([n, l], i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 900,
                background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                letterSpacing: -2 }}>{n}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 4 }}>
        <div style={{ padding: 1.5, borderRadius: 15.5,
          background: 'linear-gradient(135deg, #7C3AED, #22d3ee)',
          boxShadow: '0 8px 40px rgba(124,58,237,0.5), 0 0 80px rgba(6,182,212,0.2)',
        }}>
          <button style={{
            background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
            border: 'none', borderRadius: 14, padding: '13px 31px',
            color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>ابدأ مشروعك</button>
        </div>
        <div style={{ padding: 1.5, borderRadius: 15.5,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
        }}>
          <button style={{
            backdropFilter: 'blur(48px)', WebkitBackdropFilter: 'blur(48px)',
            background: 'rgba(5,5,20,0.7)',
            border: 'none', borderRadius: 14, padding: '13px 27px',
            color: 'rgba(255,255,255,0.75)', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>شاهد الأعمال</button>
        </div>
      </div>
    </div>
  );
}
