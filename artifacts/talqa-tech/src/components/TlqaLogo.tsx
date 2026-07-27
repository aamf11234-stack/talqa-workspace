/**
 * TlqaLogo — شعار تلقا تك
 *
 * الرمز: قوس إشارة مزدوج + نقطة مركزية داخل مربع مدور
 *        يعبّر عن "التلقي / الاتصال" المحور الأساسي للعلامة
 *
 * استخدام:
 *   <TlqaLogo size={36} />           — رمز فقط
 *   <TlqaLogo size={36} withText />  — رمز + اسم
 *   <TlqaLogo size={80} splash />    — نسخة كبيرة للـ splash
 */

interface Props {
  size?: number;
  withText?: boolean;
  splash?: boolean;
  className?: string;
}

export default function TlqaLogo({ size = 36, withText = false, splash = false, className }: Props) {
  const r = size * 0.26;   // corner radius
  const id = `lg-${size}`; // unique gradient id

  const mark = (
    <svg
      width={size} height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, display: 'block' }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4F8AFF" />
        </linearGradient>
        <filter id={`sh-${size}`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#7C3AED" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* Background tile */}
      <rect width="40" height="40" rx={r} fill={`url(#${id})`} filter={splash ? `url(#sh-${size})` : undefined} />

      {/* Outer arc */}
      <path
        d="M9 30 C9 14 15 9 20 9 C25 9 31 14 31 30"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Inner arc */}
      <path
        d="M13.5 30 C13.5 18.5 16.5 14 20 14 C23.5 14 26.5 18.5 26.5 30"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />

      {/* Center dot */}
      <circle cx="20" cy="30" r="3" fill="white" />
    </svg>
  );

  if (!withText && !splash) return mark;

  if (splash) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {mark}
      </div>
    );
  }

  // withText mode
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      {mark}
      <div>
        <div style={{
          fontSize: size * 0.41,
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontFamily: 'Cairo, sans-serif',
        }}>
          تلقا تك
        </div>
        <div style={{
          fontSize: size * 0.24,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.08em',
          fontFamily: 'system-ui, sans-serif',
        }}>
          TLGA TECH
        </div>
      </div>
    </div>
  );
}
