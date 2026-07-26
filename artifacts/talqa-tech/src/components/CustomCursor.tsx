import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Only show on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.style.cursor = 'none';

    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let rScale = 1;
    let targetScale = 1;
    let raf: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!ring || !dot || !labelRef.current) return;
      if (el.closest('a, button, [role="button"], .cursor-pointer')) {
        targetScale = 1.8;
        ring.style.borderColor = '#4F8EFF';
        ring.style.mixBlendMode = 'normal';
        dot.style.opacity = '0';
      } else if (el.closest('h1, h2, h3')) {
        targetScale = 2.4;
        ring.style.mixBlendMode = 'difference';
        ring.style.background = '#fff';
        ring.style.borderColor = 'transparent';
        dot.style.opacity = '0';
      } else {
        targetScale = 1;
      }
    };

    const onLeave = () => {
      targetScale = 1;
      if (!ring || !dot) return;
      ring.style.borderColor = 'rgba(79,142,255,0.5)';
      ring.style.mixBlendMode = 'normal';
      ring.style.background = 'transparent';
      dot.style.opacity = '1';
    };

    const tick = () => {
      // Spring follow for ring
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      rScale += (targetScale - rScale) * 0.1;

      if (dot) {
        dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      }
      if (ring) {
        ring.style.transform = `translate(${rx - 22}px, ${ry - 22}px) scale(${rScale})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout',  onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout',  onLeave);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, right: 0, left: 'unset',
        width: 6, height: 6, borderRadius: '50%',
        background: '#4F8EFF',
        pointerEvents: 'none', zIndex: 99999,
        transition: 'opacity 0.2s',
        willChange: 'transform',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 44, height: 44, borderRadius: '50%',
        border: '1.5px solid rgba(79,142,255,0.5)',
        pointerEvents: 'none', zIndex: 99998,
        transition: 'border-color 0.3s, background 0.3s',
        willChange: 'transform',
      }}>
        <span ref={labelRef} style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9, fontWeight: 800, color: '#4F8EFF', opacity: 0, letterSpacing: '0.06em',
        }}>VIEW</span>
      </div>
    </>
  );
}
