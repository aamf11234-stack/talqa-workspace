import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const cx = useSpring(mx, { stiffness: 280, damping: 24, mass: 0.5 });
  const cy = useSpring(my, { stiffness: 280, damping: 24, mass: 0.5 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    document.body.style.cursor = 'none';

    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    const down = () => setClicked(true);
    const up   = () => setClicked(false);

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('a,button,[role=button],input,textarea')) setHovered(true);
    };
    const out = () => setHovered(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
    };
  }, [mx, my]);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999, pointerEvents: 'none',
          x: cx, y: cy,
          width: hovered ? 44 : 28,
          height: hovered ? 44 : 28,
          marginLeft: hovered ? -22 : -14,
          marginTop: hovered ? -22 : -14,
          borderRadius: '50%',
          border: `1.5px solid ${hovered ? 'rgba(139,92,246,0.6)' : 'rgba(139,92,246,0.35)'}`,
          background: hovered ? 'rgba(139,92,246,0.06)' : 'transparent',
          scale: clicked ? 0.8 : 1,
          transition: 'width 0.2s, height 0.2s, margin 0.2s, border-color 0.2s, background 0.2s, scale 0.1s',
        }}
      />
      {/* Dot */}
      <motion.div style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99999, pointerEvents: 'none',
        x: mx, y: my,
        width: 5, height: 5,
        marginLeft: -2.5, marginTop: -2.5,
        borderRadius: '50%',
        background: hovered ? 'var(--purple)' : 'rgba(255,255,255,0.9)',
        scale: clicked ? 0.6 : 1,
        transition: 'background 0.15s, scale 0.1s',
      }} />
    </>
  );
}
