import React from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div 
      className="relative w-[390px] h-[844px] bg-[#111111] rounded-[54px] overflow-hidden shrink-0"
      style={{
        boxShadow: '0 40px 100px rgba(0,0,0,0.35), 0 0 0 1.5px rgba(196,181,159,0.3)'
      }}
    >
      {/* Inner Screen Background */}
      <div className="absolute inset-[6px] bg-[#FDFBF7] rounded-[48px] overflow-hidden flex flex-col">
        
        {/* Status Bar */}
        <div className="h-[44px] w-full flex justify-between items-center px-6 shrink-0 z-50">
          <div className="text-[15px] font-inter font-medium text-black">
            9:41
          </div>
          <div className="flex items-center gap-1.5 text-black">
            <Signal size={16} strokeWidth={2.5} />
            <Wifi size={16} strokeWidth={2.5} />
            <Battery size={20} strokeWidth={2.5} />
          </div>
        </div>

        {/* Dynamic Island */}
        <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50 flex items-center justify-end px-3">
          {/* subtle sensor dots */}
          <div className="w-[10px] h-[10px] rounded-full bg-[#1A1A1A] mr-2"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-[#141414]"></div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 relative flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
