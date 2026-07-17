// Video Template

import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';

import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

const SCENE_DURATIONS = {
  0: 6000, // Logo reveal
  1: 8000, // Problem/hook
  2: 10000, // Apple wallet card
  3: 9000, // Features burst
  4: 8000, // Community
  5: 8000, // CTA
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{ backgroundColor: 'var(--bg-dark)' }}
    >
      {/* Persistent Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <video 
          src={`${import.meta.env.BASE_URL}smoke.mp4`} 
          autoPlay loop muted playsInline
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        />
        <video 
          src={`${import.meta.env.BASE_URL}gold_particles.mp4`} 
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
        />
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
      </div>

      <AnimatePresence mode="popLayout">
        {currentScene === 0 && <Scene1 key="scene0" />}
        {currentScene === 1 && <Scene2 key="scene1" />}
        {currentScene === 2 && <Scene3 key="scene2" />}
        {currentScene === 3 && <Scene4 key="scene3" />}
        {currentScene === 4 && <Scene5 key="scene4" />}
        {currentScene === 5 && <Scene6 key="scene5" />}
      </AnimatePresence>
    </div>
  );
}
