import React, { useEffect, useRef, useState } from 'react';
import { getBlackHolePosition } from '../utils/blackHoleCoords';
import { useTheme } from '../context/ThemeContext';

export const InteractiveCursor: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Real mouse coordinates
  const mouseRef = useRef({ x: -100, y: -100 });
  // Rendered cursor coordinates after gravitational bending and inertia
  const cursorDotRef = useRef({ x: -100, y: -100 });
  const cursorRingRef = useRef({ x: -100, y: -100 });

  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isBentByGravity, setIsBentByGravity] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
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

    // Physics Animation Loop
    let animationId: number;

    const render = () => {
      const bh = getBlackHolePosition();
      let targetX = mouseRef.current.x;
      let targetY = mouseRef.current.y;

      let currentlyBent = false;

      // Calculate Gravitational Bending from Black Hole
      if (bh.active) {
        const dx = bh.x - mouseRef.current.x;
        const dy = bh.y - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);

        if (dist < bh.radius && dist > 2) {
          currentlyBent = true;
          // Gravitational pull equation (stronger as you approach event horizon)
          const normDist = dist / bh.radius; // 0 to 1
          const pullIntensity = Math.min(0.88, Math.pow(1 - normDist, 1.4) * 0.95);

          // Displace coordinates toward black hole singularity
          targetX += dx * pullIntensity;
          targetY += dy * pullIntensity;
        }
      }

      setIsBentByGravity(currentlyBent);

      // Interpolate dot (fast response)
      cursorDotRef.current.x += (targetX - cursorDotRef.current.x) * 0.75;
      cursorDotRef.current.y += (targetY - cursorDotRef.current.y) * 0.75;

      // Interpolate ring (smooth inertia)
      cursorRingRef.current.x += (targetX - cursorRingRef.current.x) * 0.22;
      cursorRingRef.current.y += (targetY - cursorRingRef.current.y) * 0.22;

      // Apply transform directly to DOM for 60-120fps fluid performance
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
          isBentByGravity 
            ? 'bg-yellow-200 shadow-[0_0_14px_#FEF08A]' 
            : isDark 
              ? 'bg-accent shadow-[0_0_6px_rgba(201,237,185,0.7)]' 
              : 'bg-emerald-600 shadow-[0_0_6px_rgba(5,150,105,0.4)]'
        }`}
      />

      {/* Fluid Trailing Orbital Ring with Gravitational Warp */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-all duration-200 border ${
          isBentByGravity
            ? 'w-12 h-12 border-yellow-200/90 bg-yellow-300/15 shadow-[0_0_28px_rgba(254,240,138,0.65)] animate-pulse'
            : isHoveringClickable
              ? 'w-12 h-12 border-accent/70 bg-accent/10 backdrop-blur-[1px]'
              : isDark
                ? 'w-8 h-8 border-white/20 bg-white/[0.02]'
                : 'w-8 h-8 border-black/20 bg-black/[0.02]'
        }`}
      />
    </div>
  );
};
