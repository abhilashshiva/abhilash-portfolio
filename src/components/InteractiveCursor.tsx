import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const InteractiveCursor: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Real mouse coordinates
  const mouseRef = useRef({ x: -100, y: -100 });
  // Rendered cursor coordinates with inertia
  const cursorDotRef = useRef({ x: -100, y: -100 });
  const cursorRingRef = useRef({ x: -100, y: -100 });

  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Detect clickable elements for hover expansion
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable = !!target.closest(
        'a, button, input, textarea, select, [role="button"], canvas, .cursor-pointer'
      );
      setIsHoveringClickable(isClickable);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth physics loop
    let animationId: number;

    const render = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      // Interpolate dot (instant response)
      cursorDotRef.current.x += (targetX - cursorDotRef.current.x) * 0.75;
      cursorDotRef.current.y += (targetY - cursorDotRef.current.y) * 0.75;

      // Interpolate ring (smooth trailing inertia)
      cursorRingRef.current.x += (targetX - cursorRingRef.current.x) * 0.22;
      cursorRingRef.current.y += (targetY - cursorRingRef.current.y) * 0.22;

      // Direct GPU transform for fluid 60-120fps
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cursorDotRef.current.x}px, ${cursorDotRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${cursorRingRef.current.x}px, ${cursorRingRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div 
      aria-hidden="true" 
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none transition-transform duration-75 ${
          isDark 
            ? 'bg-accent shadow-[0_0_6px_rgba(201,237,185,0.7)]' 
            : 'bg-emerald-600 shadow-[0_0_6px_rgba(5,150,105,0.4)]'
        }`}
      />

      {/* Fluid Trailing Orbital Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-all duration-200 border ${
          isHoveringClickable
            ? 'w-10 h-10 border-accent/70 bg-accent/10 dark:bg-accent/15 scale-110 shadow-[0_0_15px_rgba(201,237,185,0.2)]'
            : 'w-6 h-6 border-black/25 dark:border-white/30 bg-transparent'
        }`}
      />
    </div>
  );
};
