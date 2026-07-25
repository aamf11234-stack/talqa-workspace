import React, { ReactNode } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <>
      {/* ── Mobile: full-screen, no frame ─────────────────────────── */}
      <div className="md:hidden w-full min-h-[100dvh] flex flex-col bg-[#0D0807] overflow-hidden">
        {children}
      </div>

      {/* ── Desktop: centered phone frame ─────────────────────────── */}
      <div className="hidden md:flex min-h-[100dvh] w-full items-center justify-center bg-[#080504]"
        style={{ background: 'radial-gradient(ellipse at center, #110A08 0%, #080504 70%)' }}>
        
        <div className="relative flex flex-col" style={{ width: 390, height: 844 }}>
          {/* Phone shell */}
          <div
            className="absolute inset-0 rounded-[54px] ring-[8px] ring-[#1C1C1E] shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden bg-[#0D0807]"
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

        {/* Tagline below phone */}
        <div className="absolute bottom-6 left-0 right-0 text-center text-[#6B5550] text-xs tracking-[0.3em] font-light">
          BROWN DOSE COFFEE
        </div>
      </div>
    </>
  );
}
