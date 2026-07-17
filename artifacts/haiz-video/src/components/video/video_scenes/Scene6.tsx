import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-[150vw] h-[150vw] bg-[var(--primary-red)] rounded-full mix-blend-overlay"
          initial={{ scale: 0, opacity: 0 }}
          animate={phase >= 1 ? { scale: 1, opacity: 0.2 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 relative"
        >
          <img 
            src={`${import.meta.env.BASE_URL}hyz-logo.jpeg`} 
            alt="HYZ" 
            className="w-40 h-40 md:w-56 md:h-56 rounded-full border-2 border-[var(--gold-light)] shadow-[0_0_80px_rgba(201,149,106,0.4)] object-cover" 
          />
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0, scale: 0.9 }}
          animate={phase >= 2 ? { y: 0, opacity: 1, scale: 1 } : { y: 30, opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-9xl font-display text-white mb-10 text-center tracking-tight text-gradient-gold"
        >
          حيز الرقمي
        </motion.h1>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={phase >= 3 ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.8, opacity: 0, y: 20 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="px-12 py-5 bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-light)] text-[var(--bg-dark)] text-3xl font-bold rounded-full font-body shadow-[0_10px_30px_rgba(201,149,106,0.3)] hover:scale-105 transition-transform"
        >
          ابدأ اليوم
        </motion.div>
      </div>
    </motion.div>
  );
}