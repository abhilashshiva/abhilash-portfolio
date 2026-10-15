import React, { useEffect, useRef, useState } from 'react';
import { updateBlackHolePosition } from '../utils/blackHoleCoords';
import { Orbit, Zap, Sparkles } from 'lucide-react';

export const BlackHole: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const horizonRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [proximity, setProximity] = useState<number>(0);
  const [isInsideHorizon, setIsInsideHorizon] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  // Track position and broadcast screen coordinates of the singularity center
  useEffect(() => {
    const updateCoords = () => {
      if (!horizonRef.current && !containerRef.current) return;
      // Target the singularity center (the event horizon circle on the left-center of the image)
      const targetEl = horizonRef.current || containerRef.current;
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      updateBlackHolePosition({
        x: centerX,
        y: centerY,
        radius: 280, // Gravitational influence zone in px
        active: true,
        intensity: 1.2,
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

  // Monitor mouse distance to drive real-time telemetry and relativistic acceleration
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!horizonRef.current && !containerRef.current) return;
      const targetEl = horizonRef.current || containerRef.current;
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const maxRadius = 300;

      if (dist < maxRadius) {
        const prox = Math.min(1, Math.max(0, (maxRadius - dist) / maxRadius));
        setProximity(prox);
        setIsInsideHorizon(dist < 55);
      } else {
        setProximity(0);
        setIsInsideHorizon(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle inflow canvas over the event horizon
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || 340);
    let height = (canvas.height = canvas.offsetHeight || 280);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 340;
      height = canvas.height = canvas.offsetHeight || 280;
    };
    window.addEventListener('resize', handleResize);

    // Singularity center point inside the canvas (matching the black circle of the image)
    const getOrigin = () => ({
      x: width * 0.28,
      y: height * 0.44,
    });

    // Photon particles orbiting the event horizon
    interface Photon {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      alpha: number;
      color: string;
    }

    const photons: Photon[] = [];
    // Realistic white-gold incandescent palette matching Image 1
    const colors = ['#FFFFFF', '#FFF7ED', '#FEF08A', '#FDE047', '#EAB308', '#F59E0B'];

    for (let i = 0; i < 45; i++) {
      photons.push({
        angle: Math.random() * Math.PI * 2,
        radius: 30 + Math.random() * 80,
        speed: 0.02 + Math.random() * 0.035,
        size: 0.8 + Math.random() * 1.8,
        alpha: 0.4 + Math.random() * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const origin = getOrigin();
      const speedMultiplier = 1 + proximity * 3.2;

      // Draw relativistic swirling photon ring
      for (let i = 0; i < photons.length; i++) {
        const p = photons[i];
        p.angle += p.speed * speedMultiplier;
        
        // Inflow towards singularity
        p.radius -= (0.06 + proximity * 0.18);
        if (p.radius < 26) {
          p.radius = 85 + Math.random() * 45;
          p.angle = Math.random() * Math.PI * 2;
        }

        // Elliptical tilted orbit aligned with accretion disk
        const px = origin.x + Math.cos(p.angle) * (p.radius * 1.3);
        const py = origin.y + Math.sin(p.angle) * (p.radius * 0.55);

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = '#FDE047';
        ctx.shadowBlur = p.size > 1.4 ? 6 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [proximity]);

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center select-none w-full max-w-[420px]"
    >
      {/* Outer ambient gravitational aura */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-3xl blur-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 30% 45%, rgba(254, 240, 138, ${0.08 + proximity * 0.18}) 0%, rgba(234, 179, 8, ${0.04 + proximity * 0.1}) 40%, transparent 70%)`
        }}
      />

      {/* Realistic Gargantua Singularity Card */}
      <div className="relative w-full aspect-[1.3/1] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
        
        {/* Realistic Interstellar Black Hole Photography Asset */}
        <img 
          src="/black-hole-realistic.jpg" 
          alt="Realistic White-Gold Singularity with Gravitational Lensing"
          className="w-full h-full object-cover object-left transform scale-[1.02] transition-transform duration-700 group-hover:scale-105"
          style={{
            filter: `brightness(${1 + proximity * 0.25}) contrast(${1.08 + proximity * 0.1})`,
          }}
        />

        {/* Seamless Vignette overlay (blends smoothly into page background) */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 45%, transparent 35%, rgba(5,5,8,0.4) 60%, rgba(5,5,8,0.95) 95%)',
          }}
        />

        {/* Physical Singularity Event Horizon Beacon (Anchor for Coordinates) */}
        <div 
          ref={horizonRef}
          className="absolute w-20 h-20 rounded-full pointer-events-none"
          style={{
            left: '18%',
            top: '24%',
          }}
        >
          {/* Gravitational Lensing Glow Ring (White-Gold incandescent) */}
          <div 
            className={`absolute inset-0 rounded-full border border-white/40 transition-all duration-300 ${
              proximity > 0 ? 'scale-125 border-yellow-200/80 shadow-[0_0_30px_rgba(254,240,138,0.6)] animate-pulse' : 'opacity-30'
            }`}
          />
        </div>

        {/* Interactive Photon Particles Canvas Overlay */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Cinematic Lens Flare Edge */}
        <div 
          aria-hidden="true"
          className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle at 35% 45%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 240, 138, 0.1) 25%, transparent 60%)'
          }}
        />

        {/* Live Status Overlay Tag inside the frame */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 border border-white/15 text-[11px] font-mono text-neutral-200 backdrop-blur-md">
            <Orbit className={`w-3.5 h-3.5 text-yellow-300 ${proximity > 0 ? 'animate-spin' : ''}`} />
            <span>
              {proximity > 0 
                ? `G-Pull: ${(proximity * 100).toFixed(0)}%` 
                : 'Singularity: Active'
              }
            </span>
            {isInsideHorizon && (
              <span className="flex items-center gap-1 text-yellow-300 font-semibold animate-pulse">
                <Zap className="w-3 h-3 text-yellow-300" />
                Horizon Trapped
              </span>
            )}
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-yellow-400/80" />
            <span>White-Gold Lensing</span>
          </div>
        </div>
      </div>

      {/* Caption & User Instruction */}
      <div className="mt-3 flex flex-col items-center text-center">
        <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-400 leading-snug">
          Move your cursor near the white-gold singularity to observe space-time curvature &amp; gravitational bending.
        </p>
      </div>
    </div>
  );
};
