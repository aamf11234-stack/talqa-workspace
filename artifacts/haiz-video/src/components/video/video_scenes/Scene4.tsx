import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const features = [
  { title: "تقويم حيز", desc: "أحداث وفعاليات حصرية", icon: "📅", color: "from-[var(--gold-light)] to-[var(--gold-dark)]" },
  { title: "إشعارات ذكية", desc: "عروض فورية عند القرب", icon: "✨", color: "from-[var(--green-success)] to-emerald-900" },
  { title: "حجز طاولات", desc: "بضغطة زر واحدة", icon: "🪑", color: "from-[var(--primary-red)] to-[var(--primary-deep)]" }
];

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 7800), // Exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-[5vw] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 1.2 }}
    >
      <motion.h2 
        className="font-display text-[6vw] text-white mb-[5vh] drop-shadow-xl"
        initial={{ opacity: 0, y: "-5vh" }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: "-5vh" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        ميزات <span className="text-gradient-gold">حصرية</span>
      </motion.h2>

      <div className="flex flex-row gap-[3vw] w-[90vw] justify-center z-10" style={{ perspective: "100vw" }}>
        {features.map((feat, idx) => {
          const isActive = phase > idx;
          return (
            <motion.div
              key={idx}
              className="relative flex-1 rounded-[2vw] overflow-hidden glass-card p-[3vw] border border-[var(--gold-dark)]/30 shadow-2xl bg-black/50 backdrop-blur-xl"
              initial={{ rotateX: 90, y: "10vh", opacity: 0 }}
              animate={isActive ? { rotateX: 0, y: 0, opacity: 1 } : { rotateX: 90, y: "10vh", opacity: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.3, delay: idx * 0.2 }}
              style={{ transformOrigin: "bottom center" }}
            >
              <div className={`absolute top-0 right-0 w-[10vw] h-[10vw] bg-gradient-to-bl ${feat.color} opacity-20 blur-[3vw] rounded-full`}></div>
              
              <div className="text-[5vw] mb-[2vh] filter drop-shadow-lg">{feat.icon}</div>
              <h3 className="font-display text-[2.5vw] text-white mb-[1vh] leading-tight">{feat.title}</h3>
              <p className="text-[var(--gold-med)] text-[1.5vw] font-light leading-relaxed">{feat.desc}</p>
              
              {/* Dynamic lines */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-transparent via-[var(--gold-light)] to-transparent w-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.5 + idx * 0.2, repeat: Infinity, repeatType: 'reverse' }}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}