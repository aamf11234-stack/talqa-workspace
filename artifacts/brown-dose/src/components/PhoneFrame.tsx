import React, { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <>
      {/* ── Mobile: full-screen, no frame ─────────────────────────── */}
      <div className="md:hidden w-full h-[750px] flex flex-col bg-background overflow-hidden relative">
        {children}
      </div>

      {/* ── Desktop: phone frame ─────────────────────────── */}
      <div className="hidden md:flex relative flex-col shrink-0" style={{ width: 390, height: 844 }}>
        {/* Phone shell */}
        <div
          className="absolute inset-0 rounded-[54px] ring-[8px] ring-[#3a162b] shadow-[0_60px_120px_rgba(0,0,0,0.9)] overflow-hidden bg-background"
          style={{ zIndex: 0 }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-0 inset-x-0 flex justify-center z-50 pointer-events-none">
            <div className="w-[120px] h-[34px] bg-black rounded-b-[24px]" />
          </div>

          {/* Screen content */}
          <div className="relative w-full h-full overflow-hidden flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
