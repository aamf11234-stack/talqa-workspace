import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronLeft, X } from 'lucide-react';

interface Props { theme?: 'dark' | 'light' }

function QRCodeSvg({ light }: { light?: boolean }) {
  const p = [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[0,1],[6,1],[0,2],[2,2],[3,2],[4,2],[6,2],[0,3],[2,3],[4,3],[6,3],[0,4],[2,4],[3,4],[4,4],[6,4],[0,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[8,0],[9,0],[10,0],[8,2],[10,2],[8,3],[9,3],[10,4],[8,6],[12,0],[14,0],[12,2],[13,2],[14,2],[12,4],[13,4],[14,4],[14,6],[8,8],[9,8],[10,8],[11,8],[12,8],[8,10],[10,10],[12,10],[9,12],[11,12],[12,12],[14,12],[8,14],[9,14],[11,14],[14,14]];
  return (
    <svg width="88" height="88" viewBox="0 0 17 17">
      {p.map(([x,y],i) => <rect key={i} x={x} y={y} width="0.82" height="0.82" fill={light ? '#fff' : '#1C1C1E'} rx="0.1"/>)}
    </svg>
  );
}

function useDaysLeft() {
  const expiry = new Date(); expiry.setDate(expiry.getDate() + 7);
  const [secs, setSecs] = useState(() => Math.max(0, Math.floor((expiry.getTime() - Date.now()) / 1000)));
  useEffect(() => { const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000); return () => clearInterval(id); }, []);
  return { days: Math.floor(secs / 86400), hours: Math.floor((secs % 86400) / 3600), mins: Math.floor((secs % 3600) / 60), secs: secs % 60, expiry };
}

const infoRows = [
  { icon:'👩‍⚕️', label:'الطبيب المعالج',    value:'د. سارة المطيري · طب عام' },
  { icon:'💊',   label:'الأدوية النشطة',    value:'ميتفورمين · أوميبرازول · فيتامين د' },
  { icon:'⚠️',   label:'الحساسية',          value:'بنسلين — لا حساسية أخرى' },
  { icon:'📞',   label:'جهة اتصال الطوارئ', value:'محمد الشمري · 0500000000' },
];

function WalletSheet({ onClose, days, hours, mins, secs: s, expiry }: any) {
  const [added,   setAdded]   = useState(false);
  const [loading, setLoading] = useState(false);
  const expiryStr = expiry.toLocaleDateString('ar-SA', { day:'numeric', month:'long' });

  const handleAdd = async () => {
    setLoading(true);
    // Simulate pass generation (1.8s) then show success
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setAdded(true);
    setTimeout(onClose, 2200);
  };

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ background:'rgba(0,0,0,0.65)', backdropFilter:'blur(10px)' }}
      onClick={onClose}>
      <motion.div initial={{ y:'100%' }} animate={{ y:0 }} exit={{ y:'100%' }}
        transition={{ type:'spring', damping:30, stiffness:280 }}
        onClick={e => e.stopPropagation()}
        className="rounded-t-[28px] overflow-hidden"
        style={{ background:'#141E2E', border:'1px solid rgba(255,255,255,0.08)', borderBottom:'none' }}>
        <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full" style={{ background:'rgba(255,255,255,0.15)' }}/></div>
        <div className="px-5 pb-3 flex items-center justify-between">
          <button onClick={onClose} className="text-[#00B4D8] text-[14px] font-medium">إلغاء</button>
          <p className="text-white text-[14px] font-semibold">إضافة إلى Wallet</p>
          <div style={{width:40}}/>
        </div>
        <div className="mx-4 mb-4 rounded-[20px] overflow-hidden"
          style={{ boxShadow:'0 12px 40px rgba(0,0,0,0.4)', border:'1px solid rgba(0,180,216,0.2)' }}>
          <div className="px-5 pt-5 pb-4 relative" style={{ background:'linear-gradient(135deg,#060E1C,#0B3A5A,#0B4A8A)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at 80% 20%,rgba(0,180,216,0.22) 0%,transparent 60%)' }}/>
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-2"><Shield size={10} style={{ color:'#00B4D8' }}/><p className="text-white/50 text-[10px] font-semibold tracking-wider">عيادة الشفاء</p></div>
                <p className="text-white text-[20px] font-bold leading-none">بطاقة مريض</p>
                <p className="text-white/25 text-[9px] mt-0.5 tracking-widest">DIGITAL HEALTH CARD</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="px-2.5 py-1 rounded-full" style={{ background: days<=2 ? 'rgba(239,68,68,0.2)' : 'rgba(0,180,216,0.15)', border:`1px solid ${days<=2 ? 'rgba(239,68,68,0.35)' : 'rgba(0,180,216,0.3)'}` }}>
                  <p className="text-[9px] font-black" style={{ color: days<=2 ? '#FCA5A5' : '#00B4D8' }}>{days} أيام متبقية</p>
                </div>
                <p className="text-white/25 text-[8px] font-mono">{String(hours).padStart(2,'0')}:{String(mins).padStart(2,'0')}:{String(s).padStart(2,'0')}</p>
              </div>
            </div>
          </div>
          <div className="bg-white px-5 py-4">
            <div className="flex justify-between mb-4">
              <div><p className="text-[8px] text-[#8E8E93] tracking-widest mb-0.5">PATIENT</p><p className="text-[16px] font-bold text-[#1C1C1E]">أحمد الشمري</p></div>
              <div className="text-left"><p className="text-[8px] text-[#8E8E93] tracking-widest mb-0.5">BLOOD</p><p className="text-[16px] font-bold text-[#1C1C1E]">O+</p></div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[['#PT-0842','PATIENT ID'],['بوبا ٢٠٢٦','INSURANCE'],[expiryStr,'EXPIRES']].map(([v,l]) => (
                <div key={l} className="bg-[#F2F2F7] rounded-[10px] px-2.5 py-2">
                  <p className="text-[7px] text-[#8E8E93] tracking-wider mb-0.5">{l}</p>
                  <p className="text-[10px] font-semibold text-[#1C1C1E] leading-tight">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3"><QRCodeSvg/><div><p className="text-[8px] text-[#8E8E93] mb-1">رمز الاستقبال الفوري</p><p className="text-[10px] font-mono font-bold text-[#1C1C1E]">PT-2024-0842</p></div></div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {!added ? (
            <motion.div key="btn" className="px-4 pb-8" exit={{ opacity:0 }}>
              <motion.button whileTap={{ scale:0.97 }} onClick={loading ? undefined : handleAdd}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-[18px]"
                style={{ background:'#000', opacity:loading?0.7:1 }}>
                {loading
                  ? <><motion.div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" animate={{ rotate:360 }} transition={{ duration:0.8, repeat:Infinity, ease:'linear' }}/><span className="text-white font-semibold text-[14px]">جارٍ التحميل…</span></>
                  : <><svg width="14" height="17" viewBox="0 0 17 20" fill="white"><path d="M14.1 10.64c-.02-2.04 1.67-3.02 1.74-3.06-0.95-1.39-2.43-1.58-2.95-1.60-1.26-.13-2.46.74-3.10.74-.64 0-1.63-.72-2.68-.70C5.55 6.04 4.05 6.97 3.22 8.36 1.54 11.17 2.80 15.35 4.42 17.65c.80 1.15 1.77 2.45 3.04 2.40 1.22-.05 1.68-.78 3.16-.78 1.47 0 1.89.78 3.18.76 1.31-.02 2.15-1.18 2.94-2.34.93-1.34 1.32-2.64 1.34-2.71-.03-.01-2.57-.99-2.98-3.34zM11.96 3.83c.67-.81 1.12-1.93 1.00-3.06-.96.04-2.13.64-2.82 1.45-.62.71-1.16 1.86-1.01 2.96 1.07.08 2.16-.54 2.83-1.35z"/></svg><span className="text-white font-semibold text-[14px]">أضف إلى Apple Wallet</span></>
                }
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} className="px-4 pb-8">
              <div className="w-full flex items-center justify-center gap-2 py-4 rounded-[18px]"
                style={{ background:'rgba(52,199,89,0.15)', border:'1px solid rgba(52,199,89,0.3)' }}>
                <motion.span initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', damping:12 }} className="text-[#34C759] text-[18px]">✓</motion.span>
                <span className="text-[#34C759] font-semibold text-[14px]">تمت الإضافة إلى Wallet</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function QRModal({ onClose, dark }: { onClose:()=>void; dark:boolean }) {
  const modalBg  = dark ? '#141E2E' : '#fff';
  const modalBdr = dark ? 'rgba(255,255,255,0.1)' : 'rgba(11,74,111,0.1)';
  const txt      = dark ? '#fff' : '#0A1628';
  const txtSub   = dark ? 'rgba(255,255,255,0.35)' : '#5B7A96';
  const codeTxt  = dark ? 'rgba(255,255,255,0.30)' : '#9DB5CC';
  const closeBg  = dark ? 'rgba(255,255,255,0.1)' : 'rgba(11,74,111,0.07)';
  const closeColor= dark ? 'rgba(255,255,255,0.6)' : '#5B7A96';
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="absolute inset-0 z-50 flex items-center justify-center px-5"
      style={{ background:'rgba(0,0,0,0.65)', backdropFilter:'blur(12px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale:0.85, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.9, opacity:0 }}
        transition={{ type:'spring', damping:22 }}
        className="w-full rounded-[28px] overflow-hidden"
        style={{ background: modalBg, border: `1px solid ${modalBdr}`, boxShadow:'0 24px 60px rgba(0,0,0,0.4)' }}
        onClick={e => e.stopPropagation()}>
        <div className="px-6 pt-5 pb-4 relative overflow-hidden"
          style={{ background:'linear-gradient(135deg,#060E1C,#0B3A5A)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at 50% 0%,rgba(0,180,216,0.2) 0%,transparent 60%)' }}/>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-white text-[15px] font-bold">رمز الاستقبال</p>
              <p className="text-white/35 text-[10px]">أرِه لموظف الاستقبال مباشرة</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: closeBg }}>
              <X size={13} style={{ color: closeColor }}/>
            </button>
          </div>
        </div>
        <div className="px-6 pt-5 pb-6 flex flex-col items-center">
          <div className="p-5 rounded-[20px] mb-3" style={{ background:'linear-gradient(145deg,#060E1C,#0B3A5A)', border:'1px solid rgba(0,180,216,0.15)' }}>
            <QRCodeSvg light/>
          </div>
          <p className="text-[11px] font-mono mb-4" style={{ color: codeTxt }}>PT-2024-0842</p>
          <div className="relative w-28 h-0.5 rounded-full overflow-hidden mb-5" style={{ background:'rgba(0,180,216,0.1)' }}>
            <motion.div className="absolute top-0 h-full w-12 rounded-full"
              style={{ background:'linear-gradient(90deg,transparent,#00B4D8,transparent)' }}
              animate={{ x:[-48, 112] }} transition={{ duration:1.6, repeat:Infinity, ease:'linear' }}/>
          </div>
          <motion.button whileTap={{ scale:0.95 }} onClick={onClose}
            className="w-full py-3.5 rounded-[16px] text-white font-bold text-[13px]"
            style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>إغلاق</motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ScreenCard({ theme = 'dark' }: Props) {
  const dark = theme === 'dark';
  const [showQR,     setShowQR]     = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const { days, hours, mins, secs, expiry } = useDaysLeft();

  /* theme tokens */
  const bg         = dark ? '#0E1621' : '#F0F5FB';
  const headerBg   = dark ? 'linear-gradient(170deg,#0A1628,#0D2240)' : 'linear-gradient(170deg,#fff,#EBF4FF)';
  const headerFade = dark ? '#0E1621' : '#F0F5FB';
  const headerGlow = dark ? 'rgba(0,180,216,0.15)' : 'rgba(11,74,111,0.07)';
  const card       = dark ? 'rgba(255,255,255,0.04)' : '#fff';
  const cardBorder = dark ? 'rgba(255,255,255,0.07)' : 'rgba(11,74,111,0.09)';
  const cardShadow = dark ? 'none' : '0 2px 12px rgba(11,74,111,0.07)';
  const txt        = dark ? '#fff' : '#0A1628';
  const txtSub     = dark ? 'rgba(255,255,255,0.40)' : '#5B7A96';
  const txtMuted   = dark ? 'rgba(255,255,255,0.15)' : '#9DB5CC';
  const divider    = dark ? 'rgba(255,255,255,0.05)' : 'rgba(11,74,111,0.07)';
  const qrBg       = dark ? 'rgba(0,180,216,0.12)' : 'rgba(0,180,216,0.08)';
  const qrBdr      = dark ? 'rgba(0,180,216,0.22)' : 'rgba(0,180,216,0.18)';
  const qrColor    = '#00B4D8';
  const iconBg     = dark ? 'rgba(255,255,255,0.06)' : 'rgba(11,74,111,0.05)';
  const walletBdr  = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)';
  const erBg       = dark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.06)';
  const erBdr      = dark ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.12)';

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none"
      style={{ background: bg, fontFamily: 'Tajawal,sans-serif' }}>

      {/* Header */}
      <div className="shrink-0 px-5 pt-3 pb-5 relative overflow-hidden" style={{ background: headerBg }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background:`radial-gradient(ellipse at 70% 30%, ${headerGlow} 0%, transparent 60%)` }}/>
        <div className="absolute bottom-0 inset-x-0 h-8 pointer-events-none" style={{ background:`linear-gradient(to bottom, transparent, ${headerFade})` }}/>
        <div className="relative z-10">
          <p className="text-[10px] mb-1" style={{ color: txtSub }}>رقمية · آمنة · دائمة</p>
          <p className="text-[20px] font-bold" style={{ color: txt }}>بطاقة المريض</p>
        </div>
      </div>

      {/* Patient Card */}
      <div className="px-4 mt-3 mb-4">
        <motion.div initial={{ opacity:0, y:14, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
          transition={{ type:'spring', damping:22, delay:0.05 }}
          className="rounded-[24px] overflow-hidden relative"
          style={{ background:'linear-gradient(145deg,#060E1C,#0B3558,#0C4070)', border:'1px solid rgba(0,180,216,0.2)', boxShadow:'0 16px 48px rgba(0,0,0,0.3)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at 80% 10%,rgba(0,180,216,0.18) 0%,transparent 60%)' }}/>
          <motion.div className="absolute inset-y-0 w-1/3 pointer-events-none"
            style={{ background:'linear-gradient(90deg,transparent,rgba(0,180,216,0.06),transparent)', skewX:'-12deg' }}
            animate={{ x:[-200,500] }} transition={{ duration:3, repeat:Infinity, repeatDelay:5, ease:'linear' }}/>
          <div className="relative z-10 p-5">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:'rgba(0,180,216,0.15)', border:'1px solid rgba(0,180,216,0.2)' }}>
                  <Shield size={14} style={{ color:'#00B4D8' }}/>
                </div>
                <div>
                  <p style={{ color:'#00B4D8' }} className="text-[12px] font-bold leading-none">عيادتك</p>
                  <p className="text-white/20 text-[7px] tracking-widest mt-0.5">DIGITAL HEALTH</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <div className="px-2.5 py-1 rounded-full"
                  style={{ background: days<=2 ? 'rgba(239,68,68,0.18)' : 'rgba(52,199,89,0.12)', border:`1px solid ${days<=2 ? 'rgba(239,68,68,0.3)' : 'rgba(52,199,89,0.25)'}` }}>
                  <p className="text-[9px] font-black" style={{ color: days<=2 ? '#FCA5A5' : '#34C759' }}>{days} أيام متبقية</p>
                </div>
                <p className="text-white/20 text-[8px] font-mono">{String(hours).padStart(2,'0')}:{String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}</p>
              </div>
            </div>
            <div className="mb-5">
              <p className="text-white/20 text-[8px] tracking-widest mb-1">PATIENT NAME</p>
              <p className="text-white text-[19px] font-bold leading-tight">أحمد ناصر الشمري</p>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[['PATIENT ID','#PT-0842','#00B4D8'],['BLOOD TYPE','O+','#fff'],['INSURANCE','بوبا ٢٠٢٦','rgba(255,255,255,0.65)']].map(([l,v,c]) => (
                <div key={l} className="rounded-[14px] px-3 py-2.5" style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-white/25 text-[7px] tracking-widest mb-1">{l}</p>
                  <p className="text-[10px] font-bold leading-none" style={{ color:c }}>{v}</p>
                </div>
              ))}
            </div>
            <motion.button whileTap={{ scale:0.96 }} onClick={() => setShowQR(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[14px] text-[11px] font-bold"
              style={{ background: qrBg, border:`1px solid ${qrBdr}`, color: qrColor }}>
              <span className="text-[13px]">⬛</span> عرض رمز QR للاستقبال
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Apple Wallet */}
      <div className="px-4 mb-4">
        <motion.button whileTap={{ scale:0.97 }} onClick={() => setShowWallet(true)}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-[18px]"
          style={{ background:'#000', border:`1px solid ${walletBdr}`, boxShadow:'0 4px 20px rgba(0,0,0,0.25)' }}>
          <svg width="14" height="17" viewBox="0 0 17 20" fill="white"><path d="M14.1 10.64c-.02-2.04 1.67-3.02 1.74-3.06-0.95-1.39-2.43-1.58-2.95-1.60-1.26-.13-2.46.74-3.10.74-.64 0-1.63-.72-2.68-.70C5.55 6.04 4.05 6.97 3.22 8.36 1.54 11.17 2.80 15.35 4.42 17.65c.80 1.15 1.77 2.45 3.04 2.40 1.22-.05 1.68-.78 3.16-.78 1.47 0 1.89.78 3.18.76 1.31-.02 2.15-1.18 2.94-2.34.93-1.34 1.32-2.64 1.34-2.71-.03-.01-2.57-.99-2.98-3.34zM11.96 3.83c.67-.81 1.12-1.93 1.00-3.06-.96.04-2.13.64-2.82 1.45-.62.71-1.16 1.86-1.01 2.96 1.07.08 2.16-.54 2.83-1.35z"/></svg>
          <span className="text-white font-semibold text-[13px]">أضف إلى Apple Wallet</span>
          <span className="text-white/30 text-[10px]">· {days} أيام</span>
        </motion.button>
      </div>

      {/* Info rows */}
      <div className="px-4 mb-4">
        <p className="text-[11px] font-bold uppercase tracking-widest mb-2.5" style={{ color: txtSub }}>ملفي الطبي</p>
        <div className="rounded-[20px] overflow-hidden" style={{ background: card, border:`1px solid ${cardBorder}`, boxShadow: cardShadow }}>
          {infoRows.map((r, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: i < infoRows.length - 1 ? `1px solid ${divider}` : 'none' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: iconBg }}>
                <span className="text-[15px]">{r.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] mb-0.5" style={{ color: txtSub }}>{r.label}</p>
                <p className="text-[11px] font-semibold leading-snug" style={{ color: txt }}>{r.value}</p>
              </div>
              <ChevronLeft size={13} style={{ color: txtMuted }} className="shrink-0"/>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency */}
      <div className="px-4 mb-6">
        <div className="rounded-[18px] px-4 py-3.5 flex items-center gap-3"
          style={{ background: erBg, border:`1px solid ${erBdr}` }}>
          <span className="text-[22px]">🆘</span>
          <div>
            <p className="text-[12px] font-bold" style={{ color:'#FF6B6B' }}>بيانات الطوارئ</p>
            <p className="text-[10px]" style={{ color: txtSub }}>تظهر على شاشة القفل عند الطوارئ</p>
          </div>
        </div>
      </div>

      <div style={{ height: 72 }}/>

      <AnimatePresence>
        {showQR     && <QRModal    onClose={() => setShowQR(false)} dark={dark}/>}
        {showWallet && <WalletSheet onClose={() => setShowWallet(false)} days={days} hours={hours} mins={mins} secs={secs} expiry={expiry}/>}
      </AnimatePresence>
    </div>
  );
}
