import { useRef } from 'react';

const ITEMS = [
  'React Native', 'iOS', 'Android', 'Apple Wallet', 'واتساب API',
  'Node.js', 'TypeScript', 'تطبيقات جوال', 'Apple PassKit',
  'Push Notifications', 'لوحات تحكم', 'API Integration', 'الرياض',
  'أتمتة كاملة', 'Supabase', 'PostgreSQL', 'Next.js',
];

function MarqueeRow({ reversed = false }) {
  const items = reversed ? [...ITEMS].reverse() : ITEMS;
  return (
    <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}>
      <div style={{
        display: 'flex', gap: 0,
        animation: `marquee-${reversed ? 'r' : 'f'} ${reversed ? 38 : 32}s linear infinite`,
        width: 'max-content',
      }}>
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '0 28px', fontSize: 13, fontWeight: 600,
            color: 'rgba(255,255,255,0.28)',
            borderRight: '1px solid rgba(255,255,255,0.07)',
            whiteSpace: 'nowrap',
          }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(79,142,255,0.5)', flexShrink: 0 }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div style={{ padding: '40px 0', background: 'var(--bg2)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <MarqueeRow />
        <MarqueeRow reversed />
      </div>
      <style>{`
        @keyframes marquee-f { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        @keyframes marquee-r { from{transform:translateX(-33.333%)} to{transform:translateX(0)} }
      `}</style>
    </div>
  );
}
