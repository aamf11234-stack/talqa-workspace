import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene3() {
  const [phase, setPhase] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000), // Card flip / points tick
      setTimeout(() => setPhase(3), 8500), // Exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (phase === 2) {
      let startTime: number;
      let animationFrame: number;
      const duration = 2000;
      
      const animatePoints = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        // Easing out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setPoints(Math.floor(easeProgress * 1450));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animatePoints);
        }
      };
      
      animationFrame = requestAnimationFrame(animatePoints);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [phase]);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center p-[5vw] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', y: "-5vh" }}
      transition={{ duration: 1.2 }}
    >
      <div className="flex flex-row items-center justify-center gap-[5vw] w-[80vw] z-10">
        
        <motion.div 
          className="flex-1 text-right"
          initial={{ x: "5vw", opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: "5vw", opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h3 
            className="text-[var(--gold-light)] font-display text-[5vw] mb-[3vh] text-gradient-gold drop-shadow-lg leading-tight"
            initial={{ opacity: 0, y: "3vh" }}
            animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            بطاقة العضوية
          </motion.h3>
          <motion.p 
            className="text-white/90 text-[2.5vw] font-light leading-relaxed font-body"
            initial={{ opacity: 0, y: "3vh" }}
            animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: "3vh" }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            أكثر من مجرد قهوة.<br/>
            انضم إلى النخبة وارتقِ في مستويات حيز.
          </motion.p>
          
          <motion.div 
            className="mt-[6vh] p-[3vw] glass-card rounded-[2vw] inline-block text-center border border-[var(--gold-dark)]/40 shadow-2xl bg-black/40 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="text-white/60 text-[1.5vw] mb-[1vh]">رصيد النقاط</div>
            <div className="text-[6vw] font-bold text-gradient-gold tabular-nums leading-none">
              {points.toLocaleString('ar-SA')}
            </div>
            <div className="text-[var(--gold-med)] mt-[2vh] text-[1.5vw]">المستوى الذهبي</div>
          </motion.div>
        </motion.div>

        {/* 3D Apple Wallet style card */}
        <div className="flex-1 flex justify-center items-center" style={{ perspective: "150vw" }}>
          <motion.div 
            className="w-[25vw] h-[40vw] rounded-[2vw] relative preserve-3d"
            initial={{ rotateY: -30, rotateX: 10, y: "10vh", opacity: 0 }}
            animate={phase >= 1 ? { 
              rotateY: phase >= 2 ? 15 : -15, 
              rotateX: phase >= 2 ? 5 : 15,
              y: 0, opacity: 1 
            } : { rotateY: -30, rotateX: 10, y: 100, opacity: 0 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of card */}
            <div 
              className="absolute inset-0 rounded-[2vw] overflow-hidden backface-hidden flex flex-col justify-between p-[2.5vw]"
              style={{
                background: 'linear-gradient(160deg, var(--card-darker) 0%, var(--bg-dark) 100%)',
                boxShadow: '0 4vw 8vw rgba(0,0,0,0.8), inset 0 0.2vw 0.5vw rgba(255,255,255,0.1), inset 0 0 0 1px rgba(250, 236, 208, 0.25)',
                transform: 'translateZ(1px)' // prevents clipping
              }}
            >
              <div className="flex justify-between items-start w-full">
                <img src={`${import.meta.env.BASE_URL}hyz-logo.jpeg`} alt="HYZ" className="w-[4vw] h-[4vw] rounded-full border border-[var(--gold-dark)]/50 mix-blend-screen object-cover" />
                <div className="text-left" dir="ltr">
                  <div className="text-white font-display text-[1.5vw] tracking-widest leading-none">HYZ CAFÉ</div>
                  <div className="text-[var(--gold-med)] text-[0.8vw] tracking-widest mt-[0.5vh]">GOLD MEMBER</div>
                </div>
              </div>
              
              <div className="text-center w-full my-auto">
                <motion.div 
                  className="w-full h-[10vw] rounded-[1vw] mt-[2vh] opacity-90 mix-blend-screen overflow-hidden relative border border-[var(--gold-dark)]/30"
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(201,149,106,0.15), transparent)',
                    backgroundSize: '200% 200%'
                  }}
                >
                  <img src={`${import.meta.env.BASE_URL}cafe-1.jpeg`} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] via-transparent to-transparent"></div>
                  <motion.div 
                    className="absolute inset-0 bg-[var(--gold-light)] mix-blend-overlay"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>

              <div className="flex justify-between items-end w-full mt-[2vh]" dir="ltr">
                <div className="text-white/50 font-mono text-[1.2vw] tracking-widest">
                  8924 1928 3918
                </div>
                <div className="w-[3vw] h-[2vw] rounded-[0.5vw] bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-dark)] opacity-90 shadow-[0_0_1.5vw_rgba(201,149,106,0.5)]"></div>
              </div>
            </div>
            
            {/* Edge lighting for 3D effect */}
            <motion.div 
              className="absolute inset-0 rounded-[2vw] pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(201,149,106,0.4) 100%)',
                transform: 'translateZ(2px)'
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}