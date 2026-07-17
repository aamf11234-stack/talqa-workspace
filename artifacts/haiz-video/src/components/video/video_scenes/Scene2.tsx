import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3200),
      setTimeout(() => setPhase(4), 6800), // exit start
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center p-12 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.2 }}
    >
      {/* Background layer image for depth */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-10"
        initial={{ scale: 1.2, x: "2vw" }}
        animate={{ scale: 1.05, x: "-2vw" }}
        transition={{ duration: 10, ease: 'linear' }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}cafe-1.jpeg`} 
          alt="Cafe" 
          className="w-full h-full object-cover filter blur-[1vw]"
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center w-[80vw]">
        <div className="overflow-hidden mb-[2vh]">
          <motion.h2 
            className="font-display text-[8vw] text-white font-bold leading-tight text-center"
            initial={{ y: "100%", rotate: 5, opacity: 0 }}
            animate={phase >= 1 ? { y: 0, rotate: 0, opacity: 1 } : { y: "100%", rotate: 5, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            كيف تحوّل
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-[2vh] py-[1vh]">
          <motion.h2 
            className="font-display text-[8vw] text-[var(--gold-med)] font-bold leading-tight text-center text-gradient-gold drop-shadow-xl"
            initial={{ y: "100%", rotate: -2, opacity: 0 }}
            animate={phase >= 2 ? { y: 0, rotate: 0, opacity: 1 } : { y: "100%", rotate: -2, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            ضيوفك
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2 
            className="font-display text-[9vw] text-white font-bold leading-tight text-center"
            initial={{ y: "100%", opacity: 0, scale: 0.9 }}
            animate={phase >= 3 ? { y: 0, opacity: 1, scale: 1 } : { y: "100%", opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "spring", bounce: 0.2 }}
          >
            إلى مجتمع؟
          </motion.h2>
        </div>
      </div>
    </motion.div>
  );
}