import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    /* Outer titanium body */
    <div
      data-phone
      className="relative shrink-0"
      style={{ width: 390, height: 844 }}
    >
      {/* Ambient warm glow underneath */}
      <div className="absolute -inset-4 rounded-[70px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 85%, rgba(107,50,16,0.28) 0%, rgba(107,50,16,0.08) 45%, transparent 70%)',
          filter: 'blur(18px)',
        }} />

      {/* Main chassis */}
      <div
        className="relative w-full h-full rounded-[54px] overflow-hidden"
        style={{
          background: 'linear-gradient(160deg,#2A2A2C 0%,#1A1A1C 40%,#0F0F10 100%)',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.10)',          /* outer rim highlight */
            '0 0 0 2px rgba(0,0,0,0.85)',                 /* dark gap */
            '0 0 0 3.5px rgba(255,255,255,0.06)',          /* inner rim */
            '0 32px 80px rgba(0,0,0,0.55)',               /* deep shadow */
            '0 8px 24px rgba(0,0,0,0.45)',                /* close shadow */
            '0 -4px 20px rgba(255,255,255,0.03)',          /* top edge glow */
          ].join(','),
        }}
      >
        {/* Side reflection streak — left */}
        <div className="absolute top-[15%] left-0 w-[2px] h-[35%] pointer-events-none rounded-full"
          style={{ background: 'linear-gradient(to bottom,transparent,rgba(255,255,255,0.12),transparent)', opacity: 0.6 }} />
        {/* Side reflection streak — right */}
        <div className="absolute top-[20%] right-0 w-[2px] h-[30%] pointer-events-none rounded-full"
          style={{ background: 'linear-gradient(to bottom,transparent,rgba(255,255,255,0.07),transparent)', opacity: 0.5 }} />

        {/* Screen glass inset */}
        <div
          className="absolute inset-[5px] rounded-[49px] overflow-hidden flex flex-col"
          style={{
            background: '#F8F6F2',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.18)',
          }}
        >
          {/* Screen glass top sheen */}
          <div className="absolute top-0 left-0 right-0 h-[45%] pointer-events-none rounded-t-[49px]"
            style={{
              background: 'linear-gradient(175deg,rgba(255,255,255,0.08) 0%,transparent 100%)',
            }} />

          {/* Status bar */}
          <div className="relative h-[44px] w-full flex justify-between items-center px-7 shrink-0 z-50">
            <span className="text-[15px] font-semibold text-[#111] tracking-tight" style={{ fontFamily: 'ui-monospace,monospace', letterSpacing: '-0.02em' }}>9:41</span>
            {/* Right icons */}
            <div className="flex items-center gap-[5px]">
              {/* Signal */}
              <svg viewBox="0 0 17 12" width="17" height="12" fill="currentColor" className="text-[#111]">
                <rect x="0" y="8" width="3" height="4" rx="0.5" opacity="1"/>
                <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" opacity="1"/>
                <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" opacity="1"/>
                <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.35"/>
              </svg>
              {/* Wifi */}
              <svg viewBox="0 0 16 12" width="16" height="11" fill="none" className="text-[#111]">
                <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="currentColor"/>
                <path d="M4.2 6.8A5.3 5.3 0 0111.8 6.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M1.5 4A8.5 8.5 0 0114.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              {/* Battery */}
              <svg viewBox="0 0 25 12" width="25" height="12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#111" strokeOpacity="0.35"/>
                <rect x="1.5" y="1.5" width="17" height="9" rx="2.5" fill="#111"/>
                <path d="M23 4v4a2 2 0 000-4z" fill="#111" fillOpacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* Dynamic Island */}
          <div
            className="absolute top-[10px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-end px-2.5"
            style={{
              width: 124, height: 36,
              background: '#000',
              borderRadius: 20,
              boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 2px 8px rgba(0,0,0,0.6)',
            }}
          >
            {/* Camera ring */}
            <div className="w-[11px] h-[11px] rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 35%,#2A2A2C,#0A0A0A)',
                boxShadow: '0 0 0 1.5px rgba(255,255,255,0.07), inset 0 0 0 2px rgba(0,0,0,0.8)',
              }} />
          </div>

          {/* Screen Content */}
          <div className="flex-1 relative flex flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
