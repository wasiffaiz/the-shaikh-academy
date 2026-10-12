
import { useEffect, useRef } from 'react';

export default function TennisCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!cursor || !media.matches || reducedMotion.matches) return;

    let x = -100;
    let y = -100;
    let targetX = -100;
    let targetY = -100;
    let frame;
    let hovering = false;
    let pressed = false;

    const move = e => {
      targetX = e.clientX;
      targetY = e.clientY;
      cursor.style.opacity = '1';
    };

    const updateHover = e => {
      hovering = Boolean(e.target.closest('a, button, input, select, textarea, [role="button"]'));
    };

    const down = () => { pressed = true; };
    const up = () => { pressed = false; };
    const hide = () => { cursor.style.opacity = '0'; };

    const animate = () => {
      x += (targetX - x) * 0.28;
      y += (targetY - y) * 0.28;

      const scale = pressed ? 0.75 : hovering ? 1.35 : 1;

      cursor.style.transform =
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;

      frame = requestAnimationFrame(animate);
    };

    document.addEventListener('pointermove', move);
    document.addEventListener('pointerover', updateHover);
    document.addEventListener('pointerdown', down);
    document.addEventListener('pointerup', up);
    document.addEventListener('pointercancel', up);
    document.addEventListener('pointerleave', hide);

    animate();

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', updateHover);
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('pointerup', up);
      document.removeEventListener('pointercancel', up);
      document.removeEventListener('pointerleave', hide);
    };
  }, []);

  return (
    <div ref={cursorRef} className="tennisCursor" aria-hidden="true">
      <svg viewBox="0 0 48 48" width="36" height="36">
        <circle cx="24" cy="24" r="21" fill="#D6F146"/>
        <path
          d="M12 7 C28 14 28 34 12 41 M36 7 C20 14 20 34 36 41"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.7"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
