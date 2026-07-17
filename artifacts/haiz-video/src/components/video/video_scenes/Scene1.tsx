import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 5000); // exit
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative w-[25vw] h-[25vw] rounded-full overflow-hidden gold-shadow"
        initial={{ scale: 0.8, filter: 'blur(20px)', opacity: 0 }}
        animate={phase >= 1 ? { scale: 1, filter: 'blur(0px)', opacity: 1 } : { scale: 0.8, filter: 'blur(20px)', opacity: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-black/40 z-10 mix-blend-overlay"></div>
        <img 
          src={`${import.meta.env.BASE_URL}hyz-logo.jpeg`} 
          alt="HYZ Logo" 
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 border border-[var(--gold-light)]/30 rounded-full z-20"></div>
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="font-display text-[6vw] tracking-widest text-[var(--gold-light)] leading-tight">
          HYZ CAFÉ
        </h1>
        <div className="w-[5vw] h-px bg-[var(--gold-dark)] mx-auto mt-[2vh] mb-[2vh]"></div>
        <p className="text-[var(--gold-med)] tracking-[0.3em] text-[1.5vw] font-light">
          ABHA · أبهــــا
        </p>
      </motion.div>
    </motion.div>
  );
}
