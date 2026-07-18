import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronLeft } from 'lucide-react';

function QRCode() {
  const pattern = [
    [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[0,1],[6,1],
    [0,2],[2,2],[3,2],[4,2],[6,2],[0,3],[2,3],[4,3],[6,3],
    [0,4],[2,4],[3,4],[4,4],[6,4],[0,5],[6,5],
    [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],
    [8,0],[9,0],[10,0],[8,2],[10,2],[8,3],[9,3],[10,4],[8,6],
    [12,0],[14,0],[12,2],[13,2],[14,2],[12,4],[13,4],[14,4],[14,6],
    [8,8],[9,8],[10,8],[11,8],[12,8],[8,10],[10,10],[12,10],
    [9,12],[11,12],[12,12],[14,12],[8,14],[9,14],[11,14],[14,14],
  ];
  return (
    <svg width="96" height="96" viewBox="0 0 17 17">
      {pattern.map(([x,y],i) => <rect key={i} x={x} y={y} width="0.85" height="0.85" fill="white" rx="0.12"/>)}
    </svg>
  );
}

const infoRows = [
  { icon: '👩‍⚕️', label: 'الطبيب المعالج',   value: 'د. سارة المطيري · طب عام' },
  { icon: '💊',   label: 'الأدوية النشطة',   value: 'ميتفورمين · أوميبرازول · فيتامين د' },
  { icon: '⚠️',   label: 'الحساسية',         value: 'بنسلين — لا حساسية أخرى معروفة' },
  { icon: '📞',   label: 'جهة اتصال طوارئ',  value: 'محمد الشمري · 0500000000' },
];

export function ScreenCard() {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none" style={{ background: '#F2F6FB', fontFamily: 'Tajawal,sans-serif' }}>

      {/* Header */}
      <div className="shrink-0 px-5 pt-5 pb-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#06101E 0%,#0B3A5A 60%,#06101E 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 30%,rgba(0,180,216,0.18) 0%,transparent 60%)' }} />
        <div className="relative z-10">
          <p className="text-white/40 text-[10px] mb-1">رقمية · آمنة · دائمة</p>
          <p className="text-white text-[20px] font-bold">بطاقة المريض</p>
        </div>
      </div>

      {/* Patient Card */}
      <div className="px-4 -mt-3 mb-5 relative z-10">
        <motion.div initial={{ opacity:0, y:16, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
          transition={{ type:'spring', damping:22, delay:0.1 }}
          className="rounded-[28px] overflow-hidden relative"
          style={{ background:'linear-gradient(145deg,#06101E,#0B3A5A,#06101E)', border:'1px solid rgba(0,180,216,0.18)', boxShadow:'0 16px 48px rgba(11,74,111,0.32)' }}>

          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background:'radial-gradient(ellipse at 80% 10%,rgba(0,180,216,0.14) 0%,transparent 55%)' }} />
          {/* Dot grid */}
          <div className="absolute bottom-0 left-0 w-36 h-36 opacity-[0.05]"
            style={{ backgroundImage:'radial-gradient(circle,#00B4D8 1px,transparent 1px)', backgroundSize:'9px 9px' }} />
          {/* Shimmer */}
          <motion.div className="absolute inset-y-0 w-[40%] pointer-events-none"
            style={{ background:'linear-gradient(90deg,transparent,rgba(0,180,216,0.06),transparent)', skewX:'-15deg' }}
            animate={{ x:[-200, 400] }} transition={{ duration:3, repeat:Infinity, repeatDelay:4, ease:'linear' }} />

          <div className="relative z-10 p-5">
            {/* Top row */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background:'rgba(0,180,216,0.18)' }}>
                  <Shield size={13} style={{ color:'#00B4D8' }} />
                </div>
                <div>
                  <p style={{ color:'#00B4D8' }} className="text-[12px] font-bold leading-none">عيادتك</p>
                  <p className="text-white/20 text-[8px] tracking-widest mt-0.5">DIGITAL HEALTH CARD</p>
                </div>
              </div>
              {/* NFC icon */}
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                <path d="M7 9 Q9 4 9 9 Q9 14 7 9" stroke="rgba(0,180,216,0.35)" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M11.5 9 Q14.5 2 14.5 9 Q14.5 16 11.5 9" stroke="rgba(0,180,216,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M16.5 9 Q20.5 0 20.5 9 Q20.5 18 16.5 9" stroke="rgba(0,180,216,0.85)" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Name */}
            <div className="mb-5">
              <p className="text-white/25 text-[8px] tracking-widest mb-1">PATIENT NAME</p>
              <p className="text-white text-[22px] font-bold leading-tight">أحمد ناصر الشمري</p>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[['PATIENT ID','#PT-0842','#00B4D8'],['BLOOD TYPE','O+','#fff'],['INSURANCE','بوبا ٢٠٢٦','rgba(255,255,255,0.7)']].map(([l,v,c],i) => (
                <div key={i} className="bg-white/5 rounded-[14px] px-3 py-2.5" style={{ border:'1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-white/25 text-[7px] tracking-widest mb-1">{l}</p>
                  <p className="text-[11px] font-bold" style={{ color: c as string }}>{v}</p>
                </div>
              ))}
            </div>

            {/* QR button */}
            <motion.button whileTap={{ scale:0.96 }} onClick={() => setShowQR(true)}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-[16px] text-white font-bold text-[13px]"
              style={{ background:'rgba(0,180,216,0.14)', border:'1px solid rgba(0,180,216,0.28)' }}>
              <span className="text-[16px]">⬛</span>
              عرض رمز QR للاستقبال
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Info rows */}
      <div className="px-4 mb-6">
        <p className="text-[13px] font-bold text-[#111] mb-3">ملفي الطبي</p>
        <div className="rounded-[22px] overflow-hidden" style={{ background:'#fff', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
          {infoRows.map((r, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: i < infoRows.length-1 ? '1px solid #F5F7FA' : 'none' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background:'#F2F6FB' }}>
                <span className="text-[16px]">{r.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#BBB] mb-0.5">{r.label}</p>
                <p className="text-[12px] font-semibold text-[#222] leading-snug">{r.value}</p>
              </div>
              <ChevronLeft size={14} className="text-[#DDD] shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Emergency strip */}
      <div className="px-4 mb-28">
        <div className="rounded-[18px] px-4 py-3.5 flex items-center gap-3"
          style={{ background:'linear-gradient(135deg,#FEF2F2,#FFF5F5)', border:'1px solid rgba(239,68,68,0.15)' }}>
          <span className="text-[22px]">🆘</span>
          <div>
            <p className="text-[12px] font-bold text-[#EF4444]">بيانات الطوارئ</p>
            <p className="text-[10px] text-[#999] font-light">تظهر تلقائياً على شاشة القفل عند الطوارئ</p>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ background:'rgba(0,0,0,0.65)', backdropFilter:'blur(8px)' }}
            onClick={() => setShowQR(false)}>
            <motion.div initial={{ scale:0.8, opacity:0, y:20 }} animate={{ scale:1, opacity:1, y:0 }}
              exit={{ scale:0.85, opacity:0 }} transition={{ type:'spring', damping:22 }}
              className="mx-5 rounded-[32px] overflow-hidden text-center"
              style={{ background:'#fff', boxShadow:'0 24px 64px rgba(0,0,0,0.3)' }}
              onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div className="px-6 pt-6 pb-4"
                style={{ background:'linear-gradient(135deg,#06101E,#0B3A5A)' }}>
                <p className="text-white text-[16px] font-bold mb-0.5">رمز الاستقبال</p>
                <p className="text-white/40 text-[10px]">أرِه لموظف الاستقبال مباشرة</p>
              </div>
              {/* QR */}
              <div className="px-6 pt-5 pb-4 flex flex-col items-center">
                <div className="p-4 rounded-[20px] mb-3" style={{ background:'linear-gradient(145deg,#06101E,#0B3A5A)' }}>
                  <QRCode />
                </div>
                <p className="text-[11px] text-[#CCC] font-mono mb-3">PT-2024-0842</p>
                {/* scan line */}
                <div className="relative w-24 h-0.5 rounded-full overflow-hidden mb-5" style={{ background:'rgba(0,180,216,0.12)' }}>
                  <motion.div className="absolute top-0 h-full w-10 rounded-full"
                    style={{ background:'linear-gradient(90deg,transparent,#00B4D8,transparent)' }}
                    animate={{ x:[-40, 96] }} transition={{ duration:1.6, repeat:Infinity, ease:'linear' }} />
                </div>
                <motion.button whileTap={{ scale:0.95 }} onClick={() => setShowQR(false)}
                  className="w-full py-3.5 rounded-[16px] text-white font-bold text-[14px]"
                  style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>
                  إغلاق
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
