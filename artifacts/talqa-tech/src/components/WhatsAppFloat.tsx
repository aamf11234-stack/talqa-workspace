import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أريد%20أستفسر%20عن%20خدماتكم';

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [tip, setTip] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 2000);
    const t2 = setTimeout(() => setTip(true),  4000);
    const t3 = setTimeout(() => setTip(false), 9000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{ position: 'fixed', bottom: 28, left: 28, zIndex: 9000, display: 'flex', alignItems: 'center', gap: 12 }}>

          <AnimatePresence>
            {tip && (
              <motion.div
                initial={{ opacity: 0, x: -12, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -8, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                style={{ padding: '11px 16px', borderRadius: 12, background: '#111118', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', maxWidth: 180 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 3 }}>تحدث معنا الآن 👋</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>رد خلال دقائق</div>
                <div style={{ position: 'absolute', top: '50%', right: -6, transform: 'translateY(-50%)', width: 10, height: 10, background: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderLeft: 'none', borderBottom: 'none', rotate: '45deg' }} />
              </motion.div>
            )}
          </AnimatePresence>

          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="wa-pulse"
            style={{ width: 58, height: 58, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', boxShadow: '0 6px 24px rgba(37,211,102,0.4)', flexShrink: 0, transition: 'transform 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={e => (e.currentTarget.style.transform = '')}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
