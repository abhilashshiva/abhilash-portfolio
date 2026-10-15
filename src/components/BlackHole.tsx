import React, { useEffect, useRef, useState } from 'react';
import { updateBlackHolePosition } from '../utils/blackHoleCoords';

export const BlackHole: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const horizonRef = useRef<HTMLDivElement | null>(null);
  const [proximity, setProximity] = useState<number>(0);

  // Track singularity coordinates in the viewport and feed into the global gravitational system
  useEffect(() => {
    const updateCoords = () => {
      const targetEl = horizonRef.current || containerRef.current;
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      updateBlackHolePosition({
        x: centerX,
        y: centerY,
        radius: 360, // Gravitational influence zone in px
        active: true,
        intensity: 1.35,
      });
    };

    updateCoords();
    window.addEventListener('resize', updateCoords);
    window.addEventListener('scroll', updateCoords, { passive: true });

    return () => {
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords);
      updateBlackHolePosition({ active: false });
    };
  }, []);

  // Monitor mouse distance to drive relativistic aura response
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const targetEl = horizonRef.current || containerRef.current;
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const maxRadius = 380;

      if (dist < maxRadius) {
        const prox = Math.min(1, Math.max(0, (maxRadius - dist) / maxRadius));
        setProximity(prox);
      } else {
        setProximity(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center select-none w-full pointer-events-auto"
    >
      {/* Ambient Gravitational Lensing Glow (Subtle White-Gold Incandescent Aura) */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute w-[480px] h-[480px] sm:w-[560px] sm:h-[560px] rounded-full blur-[90px] transition-opacity duration-700 -z-10"
        style={{
          background: `radial-gradient(circle at 35% 45%, rgba(254, 240, 138, ${0.07 + proximity * 0.16}) 0%, rgba(234, 179, 8, ${0.03 + proximity * 0.08}) 40%, transparent 72%)`,
          transform: `scale(${1 + proximity * 0.15})`,
        }}
      />

      {/* Cropped Seamless Black Hole (No borders, no cards, bleeding naturally into space) */}
      <div 
        className="relative w-full aspect-[16/11] max-w-[560px] lg:max-w-[660px] xl:max-w-[720px] overflow-hidden"
        style={{
          // Deep feathered vignette mask to blend all edges 100% seamlessly into #050508
          maskImage: 'radial-gradient(ellipse 72% 68% at 40% 48%, black 35%, rgba(0,0,0,0.85) 58%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(ellipse 72% 68% at 40% 48%, black 35%, rgba(0,0,0,0.85) 58%, transparent 92%)',
        }}
      >
        {/* Realistic High-Res White-Gold Gargantua Black Hole Asset */}
        <img 
          src="/black-hole-realistic.jpg" 
          alt="Singularity with White-Gold Gravitational Lensing"
          className="w-full h-full object-cover object-left sm:object-center transform scale-[1.04] transition-all duration-700 pointer-events-none"
          style={{
            filter: `brightness(${1.02 + proximity * 0.2}) contrast(${1.05 + proximity * 0.08})`,
          }}
        />

        {/* Left edge heavy feathering into #050508 so headline text on left is always completely legible */}
        <div 
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#050508] via-[#050508]/70 to-transparent pointer-events-none"
        />

        {/* Top edge smooth feathering */}
        <div 
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#050508] to-transparent pointer-events-none"
        />

        {/* Bottom edge smooth feathering */}
        <div 
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none"
        />

        {/* Right edge smooth feathering to blend with screen boundary */}
        <div 
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#050508]/80 to-transparent pointer-events-none"
        />

        {/* Singularity Center Anchor (Target coordinates for cursor gravity pull) */}
        <div 
          ref={horizonRef}
          className="absolute w-14 h-14 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: '30%',
            top: '44%',
          }}
        >
          {/* Subtle relativistic lensing ring glow that intensifies on hover */}
          <div 
            className="w-full h-full rounded-full transition-all duration-500"
            style={{
              boxShadow: proximity > 0 
                ? `0 0 ${25 + proximity * 35}px rgba(254, 240, 138, ${0.35 + proximity * 0.35})` 
                : 'none',
            }}
          />
        </div>
      </div>

      {/* Clean, discreet subtitle hint */}
      <p className="mt-2 text-[11px] font-mono text-neutral-400/80 tracking-wide text-center">
        Interactive Singularity &bull; Gravitational Lensing
      </p>
    </div>
  );
};
