import React from 'react';

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto overflow-hidden flex flex-col"
      style={{
        width: 390,
        height: 844,
        background: '#F0F8FF',
        borderRadius: 52,
        border: '10px solid #1A2A3A',
        boxShadow: '0 0 0 1.5px #2A3A4A, 0 32px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      {/* Dynamic island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5"
        style={{ background: '#000', borderRadius: 20, width: 120, height: 34, justifyContent: 'center' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1A1A1A', border: '1.5px solid #333' }} />
      </div>

      {/* Status bar */}
      <div className="shrink-0 flex items-center justify-between px-8 pt-14 pb-2">
        <span className="text-[13px] font-semibold text-[#0B4A6F] font-inter">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0" y="3" width="3" height="9" rx="1" fill="#0B4A6F" opacity="0.3"/>
            <rect x="4.5" y="2" width="3" height="10" rx="1" fill="#0B4A6F" opacity="0.5"/>
            <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="#0B4A6F" opacity="0.7"/>
            <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#0B4A6F"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="#0B4A6F">
            <path d="M8 2.5C10.3 2.5 12.4 3.5 13.9 5L15.3 3.6C13.4 1.9 10.8 0.8 8 0.8C5.2 0.8 2.6 1.9 0.7 3.6L2.1 5C3.6 3.5 5.7 2.5 8 2.5Z" opacity="0.4"/>
            <path d="M8 5.5C9.5 5.5 10.9 6.1 11.9 7.1L13.3 5.7C11.9 4.4 10 3.7 8 3.7C6 3.7 4.1 4.4 2.7 5.7L4.1 7.1C5.1 6.1 6.5 5.5 8 5.5Z" opacity="0.7"/>
            <circle cx="8" cy="10" r="1.8"/>
          </svg>
          <div className="flex items-center gap-0.5">
            <div style={{ width: 22, height: 11, border: '1.5px solid #0B4A6F', borderRadius: 3, padding: '1px 1.5px', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '72%', height: '100%', background: '#22C55E', borderRadius: 2 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Screen content */}
      <div className="flex-1 relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}
