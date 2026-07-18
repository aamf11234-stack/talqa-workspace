import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Wifi, Shield, Phone, ChevronLeft } from 'lucide-react';

function QRSmall() {
  const cells: [number, number][] = [];
  const pattern = [
    [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],
    [0,1],[6,1],[0,2],[2,2],[3,2],[4,2],[6,2],
    [0,3],[2,3],[4,3],[6,3],[0,4],[2,4],[3,4],[4,4],[6,4],
    [0,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],
    [8,0],[9,0],[10,0],[8,2],[10,2],[8,3],[9,3],[10,4],[8,6],
    [12,0],[14,0],[12,2],[13,2],[14,2],[12,4],[13,4],[14,4],[14,6],
    [8,8],[9,8],[10,8],[11,8],[12,8],[8,10],[10,10],[12,10],
    [9,12],[11,12],[12,12],[14,12],[8,14],[9,14],[11,14],[14,14],
  ];
  return (
    <svg width="80" height="80" viewBox="0 0 17 17">
      {pattern.map(([x,y],i) => <rect key={i} x={x} y={y} width="0.85" height="0.85" fill="white" rx="0.1"/>)}
    </svg>
  );
}

export function ScreenCard() {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none" style={{ background: '#F0F8FF' }}>

      {/* Dark header */}
      <div className="shrink-0 px-5 pt-5 pb-4" style={{ background: 'linear-gradient(160deg,#050E1A,#0B3A5A)' }}>
        <p className="text-white/40 text-[10px] mb-0.5">رقمية · آمنة · دائمة</p>
        <p className="text-white text-[18px] font-bold">بطاقة المريض</p>
      </div>

      {/* Patient card */}
      <div className="px-4 -mt-2 mb-4 relative z-10">
        <div className="relative rounded-[24px] overflow-hidden p-5"
          style={{
            background: 'linear-gradient(145deg,#050E1A 0%,#0B3A5A 45%,#050E1A 80%)',
            border: '1px solid rgba(0,180,216,0.2)',
            boxShadow: '0 12px 40px rgba(11,74,111,0.3)',
          }}>
          {/* Shimmer */}
          <div className="absolute top-0 bottom-0 w-[30%] animate-shimmer pointer-events-none"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(0,180,216,0.07),transparent)', transform: 'skewX(-20deg)' }} />
          {/* Glow */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 10%,rgba(0,180,216,0.12) 0%,transparent 55%)' }} />
          {/* Dots */}
          <div className="absolute bottom-0 left-0 w-32 h-32 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle,#00B4D8 1px,transparent 1px)', backgroundSize: '8px 8px' }} />

          <div className="relative z-10">
            {/* Top row */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,180,216,0.2)' }}>
                    <Shield size={10} className="text-[#00B4D8]" />
                  </div>
                  <p className="text-[#00B4D8] text-[10px] font-bold tracking-widest">عيادتك</p>
                </div>
                <p className="text-white/20 text-[8px] font-inter tracking-wider">DIGITAL PATIENT CARD</p>
              </div>
              <div className="flex items-center gap-1.5">
                {/* NFC waves */}
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                  <path d="M6 8 Q8 4 8 8 Q8 12 6 8" stroke="rgba(0,180,216,0.4)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                  <path d="M10 8 Q13 2 13 8 Q13 14 10 8" stroke="rgba(0,180,216,0.6)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                  <path d="M14.5 8 Q18 0 18 8 Q18 16 14.5 8" stroke="rgba(0,180,216,0.8)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* Patient info */}
            <div className="mb-4">
              <p className="text-white/30 text-[8px] mb-0.5 font-inter">PATIENT NAME</p>
              <p className="text-white text-[18px] font-bold leading-tight">أحمد ناصر الشمري</p>
            </div>

            {/* ID row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div>
                <p className="text-white/25 text-[7px] font-inter mb-0.5">PATIENT ID</p>
                <p className="text-[#00B4D8] text-[11px] font-bold font-inter">#PT-2024-0842</p>
              </div>
              <div>
                <p className="text-white/25 text-[7px] font-inter mb-0.5">BLOOD TYPE</p>
                <p className="text-white text-[13px] font-bold">O+</p>
              </div>
              <div>
                <p className="text-white/25 text-[7px] font-inter mb-0.5">INSURANCE</p>
                <p className="text-white text-[10px] font-medium">بوبا ٢٠٢٦</p>
              </div>
            </div>

            {/* QR button */}
            <button onClick={() => setShowQR(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[12px] text-white font-semibold text-[12px] transition-all active:scale-95"
              style={{ background: 'rgba(0,180,216,0.15)', border: '1px solid rgba(0,180,216,0.25)' }}>
              <QrCode size={14} />
              عرض رمز QR
            </button>
          </div>
        </div>
      </div>

      {/* Quick info cards */}
      <div className="px-4 mb-4">
        <p className="text-[12px] font-bold text-[#0B4A6F] mb-2">معلومات سريعة</p>
        <div className="space-y-2.5">
          {[
            { label: 'الطبيب المعالج',    value: 'د. سارة المطيري · طب عام', icon: '👩‍⚕️' },
            { label: 'الأدوية النشطة',    value: 'مترفورمين · أوميبرازول · فيتامين د', icon: '💊' },
            { label: 'الحساسية',          value: 'بنسلين · لا معروف أخرى', icon: '⚠️' },
            { label: 'جهة اتصال طوارئ',  value: 'محمد الشمري · +٩٦٦٥٠٠٠٠٠٠٠٠', icon: '📞' },
          ].map((r, i) => (
            <div key={i} className="bg-white rounded-[14px] px-4 py-3 flex items-start gap-3 border border-[rgba(11,74,111,0.07)] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              <span className="text-base shrink-0 mt-0.5">{r.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#AAA]">{r.label}</p>
                <p className="text-[12px] font-semibold text-[#333] leading-snug">{r.value}</p>
              </div>
              <ChevronLeft size={13} className="text-[#DDD] shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* QR modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center"
            onClick={() => setShowQR(false)}>
            <motion.div initial={{ scale:0.85,opacity:0 }} animate={{ scale:1,opacity:1 }} exit={{ scale:0.85,opacity:0 }}
              className="bg-white rounded-[28px] p-6 mx-6 flex flex-col items-center"
              onClick={e => e.stopPropagation()}>
              <p className="text-[14px] font-bold text-[#111] mb-1">رمز QR الخاص بك</p>
              <p className="text-[11px] text-[#AAA] mb-4">أرِ هذا الرمز للموظف عند الاستقبال</p>
              <div className="p-4 rounded-[18px] mb-4" style={{ background: 'linear-gradient(145deg,#050E1A,#0B3A5A)' }}>
                <QRSmall />
              </div>
              <p className="text-[10px] text-[#CCC] font-inter mb-1">PT-2024-0842</p>
              {/* Scan line animation */}
              <div className="relative w-20 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0,180,216,0.1)' }}>
                <motion.div className="absolute top-0 h-full w-8 rounded-full"
                  style={{ background: 'linear-gradient(90deg,transparent,#00B4D8,transparent)' }}
                  animate={{ x: [-32, 80] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
              </div>
              <button onClick={() => setShowQR(false)}
                className="mt-4 px-6 py-2 rounded-full text-white text-[12px] font-semibold"
                style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>
                إغلاق
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
