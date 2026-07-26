import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أريد%20أستفسر%20عن%20خدماتكم';

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 2000);
    const t2 = setTimeout(() => { if (!dismissed) setOpen(true); }, 4500);
    const t3 = setTimeout(() => setOpen(false), 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [dismissed]);

  const dismiss = () => { setOpen(false); setDismissed(true); };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{ position: 'fixed', bottom: 28, left: 28, zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>

          {/* Chat bubble */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{
                  background: 'rgba(15,15,28,0.95)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 18,
                  padding: '16px 18px',
                  maxWidth: 220,
                  boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(24px)',
                  position: 'relative',
                }}>
                <button onClick={dismiss} style={{ position: 'absolute', top: 8, left: 8, width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)' }}>
                  <X size={11} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>👋</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>فريق تلقا تك</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#10B981' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                      متاحون الآن
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 12 }}>
                  السلام عليكم! 🌟<br />جاهزين نساعدك تبدأ مشروعك. تحدث معنا الآن.
                </p>

                <a href={WA} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 14px', borderRadius: 10, background: '#25D366', color: '#fff', textDecoration: 'none', fontSize: 12, fontWeight: 700, width: '100%', boxSizing: 'border-box' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  ابدأ المحادثة
                </a>

                {/* Bubble tail */}
                <div style={{ position: 'absolute', bottom: -7, right: 24, width: 14, height: 14, background: 'rgba(15,15,28,0.95)', border: '1px solid rgba(255,255,255,0.12)', borderTop: 'none', borderLeft: 'none', transform: 'rotate(45deg)', borderRadius: '0 0 3px 0' }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp button */}
          <div style={{ position: 'relative' }}>
            {/* Pulse rings */}
            <motion.div
              animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#25D366', zIndex: -1 }}
            />
            <motion.div
              animate={{ scale: [1, 1.9], opacity: [0.2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
              style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#25D366', zIndex: -1 }}
            />

            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(false)}
              style={{
                width: 58, height: 58, borderRadius: '50%',
                background: 'linear-gradient(135deg, #25D366, #1da851)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(37,211,102,0.45)',
                position: 'relative', zIndex: 1,
              }}>
              <svg width="27" height="27" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
