import { useState } from 'react';
import { motion } from 'framer-motion';

/* ─── Real Apple Wallet pass URL ─── */
const API_BASE = '/api/wallet/tlqa';

/* ─── Official "Add to Apple Wallet" badge SVG ─── */
function AppleWalletBadge() {
  return (
    <svg width="210" height="62" viewBox="0 0 210 62" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="208" height="60" rx="11" ry="11" fill="#000" stroke="#a6a6a6" strokeWidth="1"/>
      {/* Apple logo */}
      <path d="M36.4 31.3c0-4.7 3.8-6.9 4-7.1-2.2-3.2-5.6-3.6-6.8-3.7-2.9-.3-5.6 1.7-7.1 1.7-1.5 0-3.7-1.7-6.1-1.6-3.1.04-6 1.8-7.6 4.6-3.3 5.7-.85 14 2.3 18.6 1.6 2.3 3.4 4.8 5.8 4.7 2.3-.1 3.2-1.5 6-1.5 2.8 0 3.6 1.5 6 1.4 2.5 0 4.1-2.3 5.6-4.6 1.8-2.6 2.5-5.1 2.5-5.3-.05-.02-4.6-1.75-4.6-7z" fill="#fff"/>
      <path d="M31.9 17.9c1.3-1.6 2.1-3.7 1.9-5.9-1.8.08-4 1.2-5.3 2.8-1.2 1.3-2.2 3.5-1.9 5.6 2 .15 4-1 5.3-2.5z" fill="#fff"/>
      {/* Text */}
      <text x="64" y="23" fontFamily="-apple-system,Helvetica,Arial,sans-serif" fontSize="12" fill="#fff" opacity="0.8">Add to</text>
      <text x="64" y="47" fontFamily="-apple-system,Helvetica,Arial,sans-serif" fontSize="26" fontWeight="600" fill="#fff" letterSpacing="-0.5">Apple Wallet</text>
    </svg>
  );
}

/* ─── تصميم البطاقة الحقيقية (معاينة) ─── */
function CardPreview({ name, role }: { name: string; role: string }) {
  return (
    <div style={{
      width: 340, height: 200,
      borderRadius: 20,
      background: 'linear-gradient(135deg, #1a0a35 0%, #0f1a40 40%, #0a1628 100%)',
      boxShadow: '0 40px 80px rgba(139,92,246,0.35), 0 0 0 1px rgba(139,92,246,0.2)',
      padding: '20px 24px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, Helvetica, Arial, sans-serif',
      color: '#fff',
      direction: 'rtl',
    }}>
      {/* Strip band */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 6,
        background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)',
      }} />

      {/* Glow */}
      <div style={{
        position: 'absolute', top: -60, right: -40,
        width: 200, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg,#8B5CF6,#06B6D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 900, color: '#fff',
          }}>ت</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.5 }}>تلقا تك</div>
            <div style={{ fontSize: 9, color: 'rgba(6,182,212,0.9)', letterSpacing: 1.5, textTransform: 'uppercase' }}>TLQA TECH</div>
          </div>
        </div>
        {/* Location */}
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>🇸🇦 الرياض</div>
      </div>

      {/* Name */}
      <div>
        <div style={{ fontSize: 9, color: 'rgba(6,182,212,0.8)', letterSpacing: 1.5, marginBottom: 4, textTransform: 'uppercase' }}>الاسم</div>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.3 }}>{name || 'اسمك هنا'}</div>
      </div>

      {/* Footer row */}
      <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 9, color: 'rgba(6,182,212,0.8)', letterSpacing: 1.5, marginBottom: 3, textTransform: 'uppercase' }}>الصفة</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{role || 'عميل محتمل'}</div>
        </div>
        {/* QR code mini */}
        <div style={{
          width: 44, height: 44,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" opacity={0.7}>
            {/* Finder patterns */}
            {[
              [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
              [1,0],[1,6],[2,0],[2,2],[2,3],[2,4],[2,6],
              [3,0],[3,2],[3,3],[3,4],[3,6],[4,0],[4,2],[4,3],[4,4],[4,6],
              [5,0],[5,6],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],
              // top-right
              [0,20],[0,21],[0,22],[0,23],[0,24],[0,25],[0,26],
              [1,20],[1,26],[2,20],[2,22],[2,23],[2,24],[2,26],
              [3,20],[3,22],[3,23],[3,24],[3,26],[4,20],[4,22],[4,23],[4,24],[4,26],
              [5,20],[5,26],[6,20],[6,21],[6,22],[6,23],[6,24],[6,25],[6,26],
              // bottom-left
              [20,0],[20,1],[20,2],[20,3],[20,4],[20,5],[20,6],
              [21,0],[21,6],[22,0],[22,2],[22,3],[22,4],[22,6],
              [23,0],[23,2],[23,3],[23,4],[23,6],[24,0],[24,2],[24,3],[24,4],[24,6],
              [25,0],[25,6],[26,0],[26,1],[26,2],[26,3],[26,4],[26,5],[26,6],
            ].map(([r,c]) => (
              <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="white"/>
            ))}
          </svg>
        </div>
      </div>

      {/* Services strip */}
      <div style={{
        position: 'absolute', bottom: 68, left: 24, right: 24,
        fontSize: 9, color: 'rgba(255,255,255,0.35)',
        letterSpacing: 1, textTransform: 'uppercase',
      }}>
        تطبيقات · مواقع · Apple Wallet · AI
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function WalletDownload() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const downloadUrl = `${API_BASE}?name=${encodeURIComponent(name || 'زائر تلقا')}&role=${encodeURIComponent(role || 'عميل محتمل')}`;

  return (
    <section style={{
      padding: 'clamp(60px,8vw,100px) 0',
      background: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Purple orb */}
      <div className="orb" style={{ width: 700, height: 700, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(139,92,246,0.05)', animationDelay: '-3s' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <div className="section-label" style={{ color: '#8B5CF6', borderColor: 'rgba(139,92,246,0.35)', background: 'rgba(139,92,246,0.1)' }}>
            💳 بطاقتك الرقمية
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            أضف تلقا إلى{' '}
            <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Apple Wallet
            </span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, marginTop: 12 }}>
            بطاقة رقمية بتفاصيلك — في جيبك دائماً، تشاركها بلمسة.
          </p>
        </motion.div>

        {/* Card + Form */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center', justifyContent: 'center' }}>

          {/* Card Preview */}
          <motion.div
            initial={{ opacity: 0, rotateY: -15, x: -30 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              whileHover={{ rotateY: 6, rotateX: -3, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <CardPreview name={name} role={role} />
            </motion.div>
            <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--text3)' }}>
              معاينة البطاقة — تتحدث بالاسم والصفة أعلاه
            </div>
          </motion.div>

          {/* Form + Download */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 280, maxWidth: 340 }}
          >
            {/* Name field */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(6,182,212,0.8)', display: 'block', marginBottom: 8, letterSpacing: 0.5 }}>
                اسمك (اختياري)
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="مثال: أحمد المطيري"
                maxLength={40}
                style={{
                  width: '100%', padding: '13px 16px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: 14,
                  fontFamily: 'Cairo, sans-serif',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                  direction: 'rtl',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>

            {/* Role field */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(6,182,212,0.8)', display: 'block', marginBottom: 8, letterSpacing: 0.5 }}>
                صفتك / منصبك (اختياري)
              </label>
              <input
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="مثال: مدير مطعم"
                maxLength={40}
                style={{
                  width: '100%', padding: '13px 16px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: 14,
                  fontFamily: 'Cairo, sans-serif',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                  direction: 'rtl',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>

            {/* Apple Wallet button */}
            <motion.a
              href={downloadUrl}
              download="talqa-tech.pkpass"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'block', marginTop: 8 }}
            >
              <AppleWalletBadge />
            </motion.a>

            {/* Note */}
            <div className="glass" style={{ padding: '12px 14px', borderRadius: 12, fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
              📱 يعمل على iPhone وiPad مباشرة<br/>
              🔗 تشارك البطاقة من داخل Wallet<br/>
              🔄 يُحدَّث تلقائياً عند أي تغيير
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
