import React, { useState, useEffect } from 'react';
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

function QRCodeDark() {
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
    <svg width="80" height="80" viewBox="0 0 17 17">
      {pattern.map(([x,y],i) => <rect key={i} x={x} y={y} width="0.85" height="0.85" fill="#1C1C1E" rx="0.12"/>)}
    </svg>
  );
}

const infoRows = [
  { icon: '👩‍⚕️', label: 'الطبيب المعالج',   value: 'د. سارة المطيري · طب عام' },
  { icon: '💊',   label: 'الأدوية النشطة',   value: 'ميتفورمين · أوميبرازول · فيتامين د' },
  { icon: '⚠️',   label: 'الحساسية',         value: 'بنسلين — لا حساسية أخرى معروفة' },
  { icon: '📞',   label: 'جهة اتصال طوارئ',  value: 'محمد الشمري · 0500000000' },
];

/* ── Expiry countdown: 7 days from "today" ─────────────────── */
function getExpiryDate() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d;
}

function useDaysLeft() {
  const expiry = getExpiryDate();
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.floor((expiry.getTime() - Date.now()) / 1000))
  );
  useEffect(() => {
    const id = setInterval(() => {
      const left = Math.max(0, Math.floor((expiry.getTime() - Date.now()) / 1000));
      setSecondsLeft(left);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const days    = Math.floor(secondsLeft / 86400);
  const hours   = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const secs    = secondsLeft % 60;
  return { days, hours, minutes, secs, secondsLeft };
}

/* ── Apple Wallet Pass ─────────────────────────────────────── */
function WalletPass({ onClose }: { onClose: () => void }) {
  const { days, hours, minutes, secs } = useDaysLeft();
  const [added,   setAdded]   = useState(false);
  const [loading, setLoading] = useState(false);
  const expiryDate = getExpiryDate();
  const expiryStr = expiryDate.toLocaleDateString('ar-SA', { day:'numeric', month:'long', year:'numeric' });

  const handleAdd = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/wallet/pass', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: 'أحمد ناصر الشمري',
          patientId:   'PT-0842',
          clinicName:  'عيادة الشفاء الطبية',
          bloodType:   'O+',
          insurance:   'بوبا ٢٠٢٦',
          daysValid:   7,
        }),
      });
      if (res.ok) {
        /* Real .pkpass — iOS Safari intercepts this and shows "Add to Wallet" */
        const blob = await res.blob();
        const url  = URL.createObjectURL(blob);
        window.location.href = url;
      }
    } catch { /* network / CORS → fall through to demo mode */ }
    /* Show success animation regardless (real or demo) */
    setLoading(false);
    setAdded(true);
    setTimeout(onClose, 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        onClick={e => e.stopPropagation()}
        className="rounded-t-[28px] overflow-hidden"
        style={{ background: '#F2F2F7', boxShadow: '0 -8px 40px rgba(0,0,0,0.25)' }}
      >
        {/* iOS sheet handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-black/15" />
        </div>

        {/* Header */}
        <div className="px-5 pb-3 flex items-center justify-between">
          <button onClick={onClose} className="text-[#007AFF] text-[15px] font-medium">إلغاء</button>
          <p className="text-[15px] font-semibold text-[#1C1C1E]">إضافة إلى Wallet</p>
          <div style={{ width: 40 }} />
        </div>

        {/* Pass Card — Apple Wallet coupon style */}
        <div className="mx-4 mb-4 rounded-[20px] overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
          {/* Card header strip */}
          <div className="px-5 pt-5 pb-4 relative"
            style={{ background: 'linear-gradient(135deg,#06101E 0%,#0B3A5A 60%,#0B4A8A 100%)' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 20%,rgba(0,180,216,0.25) 0%,transparent 60%)' }} />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: 'rgba(0,180,216,0.25)' }}>
                    <Shield size={10} style={{ color: '#00B4D8' }} />
                  </div>
                  <p className="text-white/60 text-[10px] font-semibold tracking-wider">عيادة الشفاء الطبية</p>
                </div>
                <p className="text-white text-[22px] font-bold leading-none">بطاقة مريض</p>
                <p className="text-white/40 text-[10px] mt-1">DIGITAL HEALTH CARD</p>
              </div>
              {/* Countdown pill */}
              <div className="flex flex-col items-end gap-1.5">
                <div className="px-3 py-1.5 rounded-full" style={{ background: days <= 2 ? 'rgba(239,68,68,0.2)' : 'rgba(0,180,216,0.18)', border: `1px solid ${days <= 2 ? 'rgba(239,68,68,0.4)' : 'rgba(0,180,216,0.35)'}` }}>
                  <p className="text-[10px] font-black" style={{ color: days <= 2 ? '#FCA5A5' : '#00B4D8' }}>
                    صالح {days} أيام
                  </p>
                </div>
                <p className="text-white/30 text-[8px] font-mono">
                  {String(hours).padStart(2,'0')}:{String(minutes).padStart(2,'0')}:{String(secs).padStart(2,'0')}
                </p>
              </div>
            </div>
          </div>

          {/* Card body - white */}
          <div className="bg-white px-5 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[9px] text-[#8E8E93] tracking-widest mb-0.5 uppercase">Patient</p>
                <p className="text-[17px] font-bold text-[#1C1C1E]">أحمد ناصر الشمري</p>
              </div>
              <div className="text-left">
                <p className="text-[9px] text-[#8E8E93] tracking-widest mb-0.5 uppercase">Blood</p>
                <p className="text-[17px] font-bold text-[#1C1C1E]">O+</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                ['#PT-0842', 'Patient ID'],
                ['بوبا ٢٠٢٦', 'Insurance'],
                [expiryStr.split(' ').slice(0,2).join(' '), 'Expires'],
              ].map(([v,l]) => (
                <div key={l} className="bg-[#F2F2F7] rounded-[10px] px-2.5 py-2">
                  <p className="text-[8px] text-[#8E8E93] tracking-wider mb-0.5 uppercase">{l}</p>
                  <p className="text-[11px] font-semibold text-[#1C1C1E] leading-tight">{v}</p>
                </div>
              ))}
            </div>

            {/* Expiry bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-[9px] text-[#8E8E93]">مدة الصلاحية</p>
                <p className="text-[9px] font-bold" style={{ color: days <= 2 ? '#EF4444' : '#34C759' }}>
                  {days} من أصل 7 أيام
                </p>
              </div>
              <div className="h-1.5 rounded-full bg-[#F2F2F7] overflow-hidden">
                <motion.div className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(days / 7) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ background: days <= 2 ? '#EF4444' : 'linear-gradient(90deg,#34C759,#00B4D8)' }} />
              </div>
            </div>

            {/* QR */}
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-[12px] bg-[#F2F2F7]">
                <QRCodeDark />
              </div>
              <div className="flex-1 mr-3">
                <p className="text-[9px] text-[#8E8E93] mb-1">رمز الاستقبال الفوري</p>
                <p className="text-[10px] font-mono text-[#1C1C1E] font-bold">PT-2024-0842</p>
                <p className="text-[8px] text-[#8E8E93] mt-1 leading-relaxed">
                  أرِ هذه البطاقة لموظف الاستقبال أو المسح الضوئي عند دخول العيادة
                </p>
              </div>
            </div>
          </div>

          {/* Footer strip */}
          <div className="px-5 py-3 flex items-center justify-between"
            style={{ background: '#F9F9F9', borderTop: '1px solid #E5E5EA' }}>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: days <= 2 ? '#EF4444' : '#34C759' }} />
              <p className="text-[10px] text-[#8E8E93]">
                {days <= 2 ? '⚠️ تنتهي قريباً — جدد موعدك' : 'نشطة · تنتهي ' + expiryStr}
              </p>
            </div>
            <p className="text-[9px] text-[#C7C7CC] font-mono">عيادة الشفاء</p>
          </div>
        </div>

        {/* Add button */}
        <AnimatePresence mode="wait">
          {!added ? (
            <motion.div key="btn" className="px-4 pb-6" exit={{ opacity: 0, scale: 0.9 }}>
              <motion.button
                whileTap={{ scale: loading ? 1 : 0.96 }}
                onClick={loading ? undefined : handleAdd}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-[16px] transition-opacity"
                style={{ background: '#000', boxShadow: '0 4px 20px rgba(0,0,0,0.25)', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <>
                    <motion.div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                    <span className="text-white font-semibold text-[16px]">جارٍ التحميل…</span>
                  </>
                ) : (
                  <>
                    <svg width="17" height="20" viewBox="0 0 17 20" fill="white">
                      <path d="M14.1 10.64c-.02-2.04 1.67-3.02 1.74-3.06-0.95-1.39-2.43-1.58-2.95-1.60-1.26-.13-2.46.74-3.10.74-.64 0-1.63-.72-2.68-.70C5.55 6.04 4.05 6.97 3.22 8.36 1.54 11.17 2.80 15.35 4.42 17.65c.80 1.15 1.77 2.45 3.04 2.40 1.22-.05 1.68-.78 3.16-.78 1.47 0 1.89.78 3.18.76 1.31-.02 2.15-1.18 2.94-2.34.93-1.34 1.32-2.64 1.34-2.71-.03-.01-2.57-.99-2.98-3.34zM11.96 3.83c.67-.81 1.12-1.93 1.00-3.06-.96.04-2.13.64-2.82 1.45-.62.71-1.16 1.86-1.01 2.96 1.07.08 2.16-.54 2.83-1.35z"/>
                    </svg>
                    <span className="text-white font-semibold text-[16px]">أضف إلى Apple Wallet</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="px-4 pb-6">
              <div className="w-full flex items-center justify-center gap-2.5 py-4 rounded-[16px]"
                style={{ background: '#34C759' }}>
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="text-white text-[20px]">✓</motion.span>
                <span className="text-white font-semibold text-[16px]">تمت الإضافة إلى Wallet</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ── ScreenCard ────────────────────────────────────────────── */
export function ScreenCard() {
  const [showQR, setShowQR] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const { days } = useDaysLeft();

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
      <div className="px-4 -mt-3 mb-4 relative z-10">
        <motion.div initial={{ opacity:0, y:16, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
          transition={{ type:'spring', damping:22, delay:0.1 }}
          className="rounded-[28px] overflow-hidden relative"
          style={{ background:'linear-gradient(145deg,#06101E,#0B3A5A,#06101E)', border:'1px solid rgba(0,180,216,0.18)', boxShadow:'0 16px 48px rgba(11,74,111,0.32)' }}>

          <div className="absolute inset-0 pointer-events-none"
            style={{ background:'radial-gradient(ellipse at 80% 10%,rgba(0,180,216,0.14) 0%,transparent 55%)' }} />
          <div className="absolute bottom-0 left-0 w-36 h-36 opacity-[0.05]"
            style={{ backgroundImage:'radial-gradient(circle,#00B4D8 1px,transparent 1px)', backgroundSize:'9px 9px' }} />
          <motion.div className="absolute inset-y-0 w-[40%] pointer-events-none"
            style={{ background:'linear-gradient(90deg,transparent,rgba(0,180,216,0.06),transparent)', skewX:'-15deg' }}
            animate={{ x:[-200, 400] }} transition={{ duration:3, repeat:Infinity, repeatDelay:4, ease:'linear' }} />

          <div className="relative z-10 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background:'rgba(0,180,216,0.18)' }}>
                  <Shield size={13} style={{ color:'#00B4D8' }} />
                </div>
                <div>
                  <p style={{ color:'#00B4D8' }} className="text-[12px] font-bold leading-none">عيادتك</p>
                  <p className="text-white/20 text-[8px] tracking-widest mt-0.5">DIGITAL HEALTH CARD</p>
                </div>
              </div>
              {/* Expiry badge on card */}
              <div className="flex flex-col items-end gap-1">
                <div className="px-2.5 py-1 rounded-full" style={{ background: days <= 2 ? 'rgba(239,68,68,0.2)' : 'rgba(52,199,89,0.15)', border: `1px solid ${days <= 2 ? 'rgba(239,68,68,0.4)' : 'rgba(52,199,89,0.35)'}` }}>
                  <p className="text-[9px] font-black" style={{ color: days <= 2 ? '#FCA5A5' : '#34C759' }}>
                    {days} أيام متبقية
                  </p>
                </div>
                <svg width="20" height="16" viewBox="0 0 22 18" fill="none">
                  <path d="M7 9 Q9 4 9 9 Q9 14 7 9" stroke="rgba(0,180,216,0.35)" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M11.5 9 Q14.5 2 14.5 9 Q14.5 16 11.5 9" stroke="rgba(0,180,216,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M16.5 9 Q20.5 0 20.5 9 Q20.5 18 16.5 9" stroke="rgba(0,180,216,0.85)" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-white/25 text-[8px] tracking-widest mb-1">PATIENT NAME</p>
              <p className="text-white text-[20px] font-bold leading-tight">أحمد ناصر الشمري</p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[['PATIENT ID','#PT-0842','#00B4D8'],['BLOOD TYPE','O+','#fff'],['INSURANCE','بوبا ٢٠٢٦','rgba(255,255,255,0.7)']].map(([l,v,c],i) => (
                <div key={i} className="bg-white/5 rounded-[14px] px-2.5 py-2" style={{ border:'1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-white/25 text-[7px] tracking-widest mb-1">{l}</p>
                  <p className="text-[10px] font-bold" style={{ color: c as string }}>{v}</p>
                </div>
              ))}
            </div>

            <motion.button whileTap={{ scale:0.96 }} onClick={() => setShowQR(true)}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-[14px] text-white font-bold text-[12px]"
              style={{ background:'rgba(0,180,216,0.14)', border:'1px solid rgba(0,180,216,0.28)' }}>
              <span className="text-[14px]">⬛</span>
              عرض رمز QR للاستقبال
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Apple Wallet Button */}
      <div className="px-4 mb-4">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowWallet(true)}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-[18px]"
          style={{ background: '#000', boxShadow: '0 4px 18px rgba(0,0,0,0.22)' }}
        >
          <svg width="15" height="18" viewBox="0 0 17 20" fill="white">
            <path d="M14.1 10.64c-.02-2.04 1.67-3.02 1.74-3.06-0.95-1.39-2.43-1.58-2.95-1.60-1.26-.13-2.46.74-3.10.74-.64 0-1.63-.72-2.68-.70C5.55 6.04 4.05 6.97 3.22 8.36 1.54 11.17 2.80 15.35 4.42 17.65c.80 1.15 1.77 2.45 3.04 2.40 1.22-.05 1.68-.78 3.16-.78 1.47 0 1.89.78 3.18.76 1.31-.02 2.15-1.18 2.94-2.34.93-1.34 1.32-2.64 1.34-2.71-.03-.01-2.57-.99-2.98-3.34zM11.96 3.83c.67-.81 1.12-1.93 1.00-3.06-.96.04-2.13.64-2.82 1.45-.62.71-1.16 1.86-1.01 2.96 1.07.08 2.16-.54 2.83-1.35z"/>
          </svg>
          <span className="text-white font-semibold text-[14px]">أضف إلى Apple Wallet</span>
          <span className="text-white/40 text-[11px]">· {days} أيام</span>
        </motion.button>
        <p className="text-center text-[9px] text-[#AAA] mt-1.5">البطاقة تنتهي خلال {days} أيام — جدد موعدك قبل</p>
      </div>

      {/* Info rows */}
      <div className="px-4 mb-5">
        <p className="text-[13px] font-bold text-[#111] mb-3">ملفي الطبي</p>
        <div className="rounded-[22px] overflow-hidden" style={{ background:'#fff', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
          {infoRows.map((r, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: i < infoRows.length-1 ? '1px solid #F5F7FA' : 'none' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background:'#F2F6FB' }}>
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
              <div className="px-6 pt-6 pb-4" style={{ background:'linear-gradient(135deg,#06101E,#0B3A5A)' }}>
                <p className="text-white text-[16px] font-bold mb-0.5">رمز الاستقبال</p>
                <p className="text-white/40 text-[10px]">أرِه لموظف الاستقبال مباشرة</p>
              </div>
              <div className="px-6 pt-5 pb-4 flex flex-col items-center">
                <div className="p-4 rounded-[20px] mb-3" style={{ background:'linear-gradient(145deg,#06101E,#0B3A5A)' }}>
                  <QRCode />
                </div>
                <p className="text-[11px] text-[#CCC] font-mono mb-3">PT-2024-0842</p>
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

      {/* Apple Wallet Pass Modal */}
      <AnimatePresence>
        {showWallet && <WalletPass onClose={() => setShowWallet(false)} />}
      </AnimatePresence>
    </div>
  );
}
