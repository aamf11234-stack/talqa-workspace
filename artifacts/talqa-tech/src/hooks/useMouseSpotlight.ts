import { useRef, useCallback } from 'react';

export function useMouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
    el.style.setProperty('--op', '1');
  }, []);

  const onMouseLeave = useCallback(() => {
    ref.current?.style.setProperty('--op', '0');
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
