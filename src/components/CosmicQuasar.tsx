import React, { useEffect, useRef, useState } from 'react';
import { updateBlackHolePosition } from '../utils/blackHoleCoords';
import { Sparkles, Radio, Eye } from 'lucide-react';

type CosmicMode = 'blade' | 'quasar' | 'horizon';

export const CosmicQuasar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const [activeMode, setActiveMode] = useState<CosmicMode>('blade');
  const [proximity, setProximity] = useState<number>(0);

  // Singularity center coordinate tracking for real-time cursor gravitational bending
  useEffect(() => {
    const updateCoords = () => {
      const targetEl = coreRef.current || containerRef.current;
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      updateBlackHolePosition({
        x: centerX,
        y: centerY,
        radius: 380, // Strong relativistic gravity pull radius
        active: true,
        intensity: 1.4,
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
  }, [activeMode]);

  // Monitor mouse proximity to power interactive relativistic lensing & jet emissions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const targetEl = coreRef.current || containerRef.current;
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const maxRadius = 400;

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

  // Mode configuration directly referencing user's uploaded imagery
  const modeData = {
    blade: {
      image: '/cosmic-ref-4.png',
      title: 'Singularity Blade',
      subtitle: 'Diagonal Relativistic Accretion & Einstein Lensing Rings',
      corePos: { left: '49%', top: '50%' },
      auraColor: 'rgba(254, 240, 138, 0.12)',
      jetAngle: '-62deg',
    },
    quasar: {
      image: '/cosmic-ref-2.png',
      title: 'Active Quasar Jet',
      subtitle: 'Relativistic Astrophysical Particle Beam & Galactic Core',
      corePos: { left: '50%', top: '48%' },
      auraColor: 'rgba(245, 158, 11, 0.15)',
      jetAngle: '-48deg',
    },
    horizon: {
      image: '/cosmic-ref-1.png',
      title: 'Monochrome Horizon',
      subtitle: 'Pure Relativistic Gravitational Curvature & Photon Arc',
      corePos: { left: '50%', top: '46%' },
      auraColor: 'rgba(255, 255, 255, 0.14)',
      jetAngle: '0deg',
    },
  };

  const current = modeData[activeMode];

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center select-none w-full pointer-events-auto"
    >
      {/* Dynamic Deep Space Ambient Glow (White-Gold incandescent aura) */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute w-[500px] h-[500px] sm:w-[620px] sm:h-[620px] rounded-full blur-[100px] transition-all duration-700 -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${current.auraColor} 0%, rgba(201, 237, 185, ${0.03 + proximity * 0.08}) 35%, transparent 72%)`,
          transform: `scale(${1 + proximity * 0.2})`,
        }}
      />

      {/* Main Cosmic Singularity / Quasar Visualizer */}
      <div 
        className="relative w-full aspect-[4/5] sm:aspect-[1/1] max-w-[480px] lg:max-w-[560px] xl:max-w-[620px] overflow-hidden flex items-center justify-center"
        style={{
          // Deep radial and edge vignette mask: leaves 0 hard lines or card frames
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 35%, rgba(0,0,0,0.85) 55%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 35%, rgba(0,0,0,0.85) 55%, transparent 92%)',
        }}
      >
        {/* Authentic Reference Cosmic Artwork */}
        <img 
          key={activeMode}
          src={current.image} 
          alt={current.title}
          className="w-full h-full object-contain sm:object-cover object-center transform scale-[1.08] transition-all duration-700 animate-fade-in pointer-events-none"
          style={{
            filter: `brightness(${1.05 + proximity * 0.25}) contrast(${1.08 + proximity * 0.1}) drop-shadow(0 0 30px rgba(254, 240, 138, ${0.15 + proximity * 0.3}))`,
          }}
        />

        {/* Dynamic Concentric Gravitational Lensing Distortion Rings (Einstein Rings from Ref 4) */}
        {activeMode === 'blade' && (
          <div 
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            {/* Inner Einstein Ring */}
            <div 
              className="absolute rounded-full border border-yellow-200/40 transition-all duration-500"
              style={{
                width: `${120 + proximity * 40}px`,
                height: `${120 + proximity * 40}px`,
                boxShadow: `0 0 ${15 + proximity * 25}px rgba(254, 240, 138, ${0.2 + proximity * 0.4})`,
                opacity: 0.4 + proximity * 0.6,
                transform: `rotate(${proximity * 20}deg) scale(${1 + proximity * 0.1})`,
              }}
            />
            {/* Middle Lensing Arc Ring */}
            <div 
              className="absolute rounded-full border border-white/20 transition-all duration-700"
              style={{
                width: `${210 + proximity * 55}px`,
                height: `${210 + proximity * 55}px`,
                boxShadow: `0 0 20px rgba(255, 255, 255, ${0.1 + proximity * 0.25})`,
                opacity: 0.3 + proximity * 0.4,
              }}
            />
            {/* Outer Relativistic Warping Ring */}
            <div 
              className="absolute rounded-full border border-yellow-100/10 transition-all duration-700"
              style={{
                width: `${300 + proximity * 70}px`,
                height: `${300 + proximity * 70}px`,
                opacity: 0.2 + proximity * 0.3,
              }}
            />
          </div>
        )}

        {/* High-Energy Relativistic Jet Beam (Quasar Mode from Ref 2) */}
        {activeMode === 'quasar' && (
          <div 
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
          >
            {/* Diagonal Jet Beam Line */}
            <div 
              className="absolute w-[2px] h-[150%] bg-gradient-to-t from-transparent via-yellow-200 to-transparent blur-[1px] transition-all duration-500"
              style={{
                transform: `rotate(${current.jetAngle}) scaleY(${1 + proximity * 0.2})`,
                boxShadow: `0 0 ${20 + proximity * 30}px rgba(254, 240, 138, ${0.4 + proximity * 0.5})`,
                opacity: 0.6 + proximity * 0.4,
              }}
            />
            {/* Expanding core burst */}
            <div 
              className="absolute w-12 h-12 rounded-full bg-white blur-md transition-all duration-300"
              style={{
                opacity: 0.5 + proximity * 0.5,
                transform: `scale(${1 + proximity * 0.5})`,
              }}
            />
          </div>
        )}

        {/* Singularity Horizon Core Anchor (Invisible tracking beacon for cursor physics) */}
        <div 
          ref={coreRef}
          className="absolute w-16 h-16 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: current.corePos.left,
            top: current.corePos.top,
          }}
        >
          {/* Gravitational singularity pulse */}
          <div 
            className="w-full h-full rounded-full transition-all duration-300"
            style={{
              boxShadow: proximity > 0 
                ? `0 0 ${30 + proximity * 40}px rgba(254, 240, 138, ${0.4 + proximity * 0.5})` 
                : 'none',
            }}
          />
        </div>

        {/* Feathered Edge Blends (Ensures 100% borderless fade into #050508 background) */}
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#050508] to-transparent pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-[#050508] to-transparent pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#050508] to-transparent pointer-events-none" />
      </div>

      {/* Interactive Phenomenon Switcher (Explore all 4 user reference styles) */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-neutral-900/80 dark:bg-white/[0.04] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-lg">
          <button
            type="button"
            onClick={() => setActiveMode('blade')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
              activeMode === 'blade'
                ? 'bg-accent text-black font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Singularity Blade</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('quasar')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
              activeMode === 'quasar'
                ? 'bg-accent text-black font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Radio className="w-3 h-3" />
            <span>Quasar Jet</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('horizon')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
              activeMode === 'horizon'
                ? 'bg-accent text-black font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Monochrome Horizon</span>
          </button>
        </div>

        {/* Subtitle Telemetry Description */}
        <p className="text-[11px] font-mono text-neutral-400 tracking-wide text-center max-w-sm">
          {current.subtitle} &bull; <span className="text-accent/90">Gravity: {(1.2 + proximity * 0.8).toFixed(1)}x</span>
        </p>
      </div>
    </div>
  );
};
