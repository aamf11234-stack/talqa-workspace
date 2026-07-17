import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 6800), // Exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div 
        className="absolute inset-0 bg-[var(--primary-deep)]"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}cafe-1.jpeg`} 
          alt="Cafe Vibe" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-[var(--bg-dark)]/80"></div>
      </motion.div>

      <div className="relative z-10 text-center w-full max-w-5xl px-8">
        <motion.div
          initial={{ scale: 1.5, opacity: 0, filter: 'blur(20px)' }}
          animate={phase >= 1 ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : { scale: 1.5, opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[8rem] md:text-[12rem] font-bold text-gradient-gold tabular-nums leading-none mb-6 tracking-tighter drop-shadow-2xl"
        >
          ١٥٠٠+
        </motion.div>
        
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={phase >= 2 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-display text-white drop-shadow-lg"
        >
          عضو في مجتمع حيز
        </motion.h2>

        {/* Floating avatars representing community */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 rounded-full border border-[var(--gold-dark)]/40 backdrop-blur-md bg-white/5 overflow-hidden"
              initial={{ 
                x: (Math.random() - 0.5) * 1000, 
                y: (Math.random() - 0.5) * 600,
                opacity: 0,
                scale: 0
              }}
              animate={phase >= 2 ? { 
                opacity: [0, 0.6, 0.2],
                scale: [0, 1, 0.8],
                y: [(Math.random() - 0.5) * 600, (Math.random() - 0.5) * 600 - 150]
              } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 4 + Math.random() * 3, 
                delay: 1 + Math.random() * 2,
                ease: "easeOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-[var(--gold-light)]/20 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}