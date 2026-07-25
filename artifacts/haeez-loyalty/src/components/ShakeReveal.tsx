import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════
   Shake-to-reveal secret flash deal
══════════════════════════════════════════════════════════════════ */

const DEAL = {
  title:    'خصم ٢٠٪ فلاش',
  subtitle: 'صالح لمدة ١٥ دقيقة فقط',
  code:     'SHAKE20',
  emoji:    '⚡',
  desc:     'على أي طلب الآن — استخدم الكود أو أظهره للكاشير',
};

/* Countdown timer */
function useCountdown(minutes: number) {
  const endRef = useRef(Date.now() + minutes * 60 * 1000);
  const [left, setLeft] = useState(minutes * 60);
  useEffect(() => {
    const iv = setInterval(() => {
      const s = Math.max(0, Math.round((endRef.current - Date.now()) / 1000));
      setLeft(s);
    }, 500);
    return () => clearInterval(iv);
  }, []);
  const m = String(Math.floor(left / 60)).padStart(2, '0');
  const s = String(left % 60).padStart(2, '0');
  return { m, s, expired: left === 0 };
}

function FlashDealModal({ onClose }: { onClose: () => void }) {
  const { m, s, expired } = useCountdown(15);
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(DEAL.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-xl z-50 rounded-[48px]" />

      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        className="absolute bottom-0 left-0 right-0 z-50 rounded-t-[36px] overflow-hidden"
      >
        {/* Gradient bg */}
        <div className="relative"
          style={{ background: 'linear-gradient(160deg,#050002 0%,#1A0406 30%,#3D0809 60%,#0D0205 100%)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(201,149,106,0.2) 0%,transparent 60%)' }} />

          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Close */}
          <button onClick={onClose} className="absolute top-4 left-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <X size={14} className="text-white/60" />
          </button>

          <div className="px-6 pb-8 pt-3 relative z-10 flex flex-col items-center gap-5">
            {/* Animated emoji */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.2 }}
              className="text-[64px] leading-none"
            >{DEAL.emoji}</motion.div>

            <div className="text-center">
              <p className="text-[#7A3B18] text-[11px] font-bold tracking-widest mb-2">عرض حصري · الآن فقط</p>
              <p className="text-white text-[30px] font-black leading-tight">{DEAL.title}</p>
              <p className="text-white/50 text-[13px] font-light mt-2">{DEAL.desc}</p>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-1 px-6 py-3 rounded-[18px]"
              style={{ background: expired ? 'rgba(255,59,48,0.12)' : 'rgba(201,149,106,0.1)', border: `1px solid ${expired ? 'rgba(255,59,48,0.3)' : 'rgba(201,149,106,0.25)'}` }}>
              <Zap size={14} style={{ color: expired ? '#FF3B30' : '#7A3B18' }} />
              {expired ? (
                <span className="text-[#FF3B30] text-[13px] font-bold">انتهى العرض</span>
              ) : (
                <>
                  <span className="font-black text-white text-[22px] font-inter">{m}:{s}</span>
                  <span className="text-white/40 text-[11px] mr-1">دقيقة متبقية</span>
                </>
              )}
            </div>

            {/* Code box */}
            <motion.button whileTap={{ scale: 0.96 }} onClick={copy}
              className="w-full py-4 rounded-[18px] flex items-center justify-center gap-3 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px dashed rgba(201,149,106,0.4)' }}>
              <div className="text-center flex-1">
                <p className="text-white/30 text-[9px] tracking-[0.3em] mb-1" style={{ fontFamily: 'ui-monospace,monospace' }}>كود الخصم</p>
                <p className="text-white text-[26px] font-black tracking-[0.15em]" style={{ fontFamily: 'ui-monospace,monospace' }}>{DEAL.code}</p>
              </div>
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div key="y" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="w-8 h-8 rounded-full bg-[#30D158] flex items-center justify-center shrink-0">
                    <span className="text-white text-[14px]">✓</span>
                  </motion.div>
                ) : (
                  <motion.div key="n" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold text-[#7A3B18]"
                    style={{ background: 'rgba(201,149,106,0.1)', border: '1px solid rgba(201,149,106,0.3)' }}>
                    انسخ
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/966551378531?text=أريد استخدام كود ${DEAL.code} للخصم ٢٠٪ ⚡`}
              target="_blank" rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 rounded-[16px] flex items-center justify-center gap-2.5 font-bold text-[14px] text-white"
              style={{ background: 'linear-gradient(135deg,#128C7E,#075E54)' }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              اطلب واستخدم الخصم الآن
            </motion.a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Shake hint bar — shown in ScreenHome hero
══════════════════════════════════════════════════════════════════ */
export function ShakeHintBar({ onReveal }: { onReveal: () => void }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 6000);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          whileTap={{ scale: 0.94 }}
          onClick={onReveal}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full"
          style={{ background: 'rgba(201,149,106,0.1)', border: '1px solid rgba(201,149,106,0.22)' }}>
          <motion.span
            animate={{ rotate: [0, -18, 18, -12, 12, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 1.8 }}
            className="text-[16px] leading-none">📱</motion.span>
          <span className="text-[#7A3B18] text-[11px] font-bold">هزّ جوالك للمفاجأة</span>
          <Zap size={11} className="text-[#7A3B18]" fill="rgba(201,149,106,0.4)" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════════════
   useShakeDetect hook
══════════════════════════════════════════════════════════════════ */
export function useShakeDetect(onShake: () => void) {
  const lastRef = useRef({ x: 0, y: 0, z: 0, t: 0 });
  const countRef = useRef(0);
  const firedRef = useRef(false);

  useEffect(() => {
    const THRESHOLD = 22;
    const RESET_MS = 1800;

    function handle(e: DeviceMotionEvent) {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const now = Date.now();
      const { x: px, y: py, z: pz, t: pt } = lastRef.current;
      const dx = Math.abs((a.x ?? 0) - px);
      const dy = Math.abs((a.y ?? 0) - py);
      const dz = Math.abs((a.z ?? 0) - pz);
      lastRef.current = { x: a.x ?? 0, y: a.y ?? 0, z: a.z ?? 0, t: now };

      if (now - pt < 80) return; // debounce
      if (dx + dy + dz > THRESHOLD) {
        countRef.current += 1;
        if (countRef.current >= 3 && !firedRef.current) {
          firedRef.current = true;
          onShake();
          setTimeout(() => { countRef.current = 0; firedRef.current = false; }, RESET_MS);
        }
      }
    }

    // Request permission on iOS 13+
    const dme = DeviceMotionEvent as any;
    if (typeof dme.requestPermission === 'function') {
      dme.requestPermission().then((state: string) => {
        if (state === 'granted') window.addEventListener('devicemotion', handle);
      }).catch(() => {});
    } else {
      window.addEventListener('devicemotion', handle);
    }

    return () => window.removeEventListener('devicemotion', handle);
  }, [onShake]);
}

/* ══════════════════════════════════════════════════════════════════
   Export the modal standalone (used in App.tsx)
══════════════════════════════════════════════════════════════════ */
export { FlashDealModal };
