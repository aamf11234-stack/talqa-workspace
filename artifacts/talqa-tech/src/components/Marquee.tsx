const ITEMS = [
  { text: 'React Native', color: '#61DAFB' },
  { text: 'Apple Wallet', color: '#A78BFA' },
  { text: 'iOS & Android', color: '#8B5CF6' },
  { text: 'واتساب API', color: '#25D366' },
  { text: 'Node.js', color: '#4CAF50' },
  { text: 'TypeScript', color: '#3B82F6' },
  { text: 'نظام حجوزات', color: '#F59E0B' },
  { text: 'PassKit', color: '#06B6D4' },
  { text: 'Push Notifications', color: '#EC4899' },
  { text: 'لوحات تحكم', color: '#10B981' },
  { text: 'NFC', color: '#A78BFA' },
  { text: 'تطبيقات جوال', color: '#8B5CF6' },
  { text: 'PostgreSQL', color: '#3B82F6' },
  { text: 'أتمتة كاملة', color: '#F59E0B' },
  { text: 'API Integration', color: '#EC4899' },
];

function Row({ reversed = false }: { reversed?: boolean }) {
  const items = reversed ? [...ITEMS].reverse() : ITEMS;
  const speed = reversed ? 38 : 30;
  return (
    <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <div style={{
        display: 'flex', width: 'max-content', gap: 0,
        animation: `${reversed ? 'marquee-r' : 'marquee-f'} ${speed}s linear infinite`,
      }}>
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0 28px', fontSize: 13, fontWeight: 700,
            color: 'rgba(255,255,255,0.22)',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            whiteSpace: 'nowrap',
            transition: 'color 0.2s',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: item.color, flexShrink: 0, opacity: 0.7 }} />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div style={{
      padding: '32px 0',
      background: 'var(--bg2)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Side glows */}
      <div style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', width: 120, height: '100%', background: 'linear-gradient(to left, var(--bg2), transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', width: 120, height: '100%', background: 'linear-gradient(to right, var(--bg2), transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Row />
        <Row reversed />
      </div>
    </div>
  );
}
