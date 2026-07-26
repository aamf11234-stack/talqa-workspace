import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const cx = useSpring(mx, { stiffness: 350, damping: 28, mass: 0.5 });
  const cy = useSpring(my, { stiffness: 350, damping: 28, mass: 0.5 });
  const scaleRef = useRef(1);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    document.body.style.cursor = 'none';

    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    const down = () => { scaleRef.current = 0.7; if (dotRef.current) dotRef.current.style.transform = 'scale(0.7)'; };
    const up   = () => { scaleRef.current = 1;   if (dotRef.current) dotRef.current.style.transform = 'scale(1)'; };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    // Scale up on interactive elements
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('a,button,[role=button]') && dotRef.current) {
        dotRef.current.style.transform = 'scale(1.6)';
        dotRef.current.style.opacity = '0.6';
      }
    };
    const out = () => {
      if (dotRef.current) { dotRef.current.style.transform = 'scale(1)'; dotRef.current.style.opacity = '1'; }
    };
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
      {/* Outer ring - follows with spring */}
      <motion.div style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99999, pointerEvents: 'none',
        x: cx, y: cy,
        width: 28, height: 28,
        marginLeft: -14, marginTop: -14,
        borderRadius: '50%',
        border: '1.5px solid rgba(79,142,255,0.5)',
        mixBlendMode: 'difference',
      }} />
      {/* Dot - follows directly */}
      <motion.div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99999, pointerEvents: 'none',
        x: mx, y: my,
        width: 5, height: 5,
        marginLeft: -2.5, marginTop: -2.5,
        borderRadius: '50%',
        background: '#fff',
        transition: 'transform 0.2s ease, opacity 0.2s ease',
      }} />
    </>
  );
}
