import React, { useEffect, useRef, useState } from 'react';
import { updateBlackHolePosition } from '../utils/blackHoleCoords';
import { Orbit, Compass, Zap } from 'lucide-react';

export const BlackHole: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [proximity, setProximity] = useState<number>(0);
  const [isInsideHorizon, setIsInsideHorizon] = useState<boolean>(false);
  const rotationRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Track position and update global coordinates
  useEffect(() => {
    const updateCoords = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      updateBlackHolePosition({
        x: centerX,
        y: centerY,
        radius: 240, // Gravitational influence zone in px
        active: true,
        intensity: 1,
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

  // Monitor mouse distance to drive accretion disk speed and local telemetry
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const maxRadius = 260;

      if (dist < maxRadius) {
        const prox = Math.min(1, Math.max(0, (maxRadius - dist) / maxRadius));
        setProximity(prox);
        setIsInsideHorizon(dist < 45);
      } else {
        setProximity(0);
        setIsInsideHorizon(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas particle accretion animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 220);
    const height = (canvas.height = 220);
    const cx = width / 2;
    const cy = height / 2;

    // Photon particles orbiting the singularity
    interface Photon {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      alpha: number;
      color: string;
    }

    const photons: Photon[] = [];
    const colors = ['#C9EDB9', '#BAE6A7', '#6EE7B7', '#38BDF8', '#F5F3EE'];

    for (let i = 0; i < 40; i++) {
      photons.push({
        angle: Math.random() * Math.PI * 2,
        radius: 35 + Math.random() * 55,
        speed: 0.02 + Math.random() * 0.04,
        size: 0.8 + Math.random() * 1.6,
        alpha: 0.3 + Math.random() * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Current spin acceleration based on mouse proximity
      const speedMultiplier = 1 + proximity * 3.5;
      rotationRef.current += 0.015 * speedMultiplier;

      // 1. Outer Gravitational Lensing Halo (Einstein Ring)
      const lensGrad = ctx.createRadialGradient(cx, cy, 35, cx, cy, 95);
      lensGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      lensGrad.addColorStop(0.38, `rgba(201, 237, 185, ${0.15 + proximity * 0.35})`);
      lensGrad.addColorStop(0.55, `rgba(56, 189, 248, ${0.08 + proximity * 0.2})`);
      lensGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = lensGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 95, 0, Math.PI * 2);
      ctx.fill();

      // 2. Relativistic Doppler Accretion Disk (Tilted ellipse)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotationRef.current);
      ctx.scale(1, 0.35); // Elliptical projection

      const diskGrad = ctx.createLinearGradient(-80, 0, 80, 0);
      diskGrad.addColorStop(0, `rgba(201, 237, 185, ${0.8 + proximity * 0.2})`); // Doppler boosted approaching side
      diskGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.4)');
      diskGrad.addColorStop(1, 'rgba(120, 119, 198, 0.25)'); // Receding side

      ctx.beginPath();
      ctx.arc(0, 0, 68, 0, Math.PI * 2);
      ctx.lineWidth = 14 + proximity * 6;
      ctx.strokeStyle = diskGrad;
      ctx.shadowColor = '#C9EDB9';
      ctx.shadowBlur = 12 + proximity * 18;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // 3. Orbiting Photon Inflow Particles
      for (let i = 0; i < photons.length; i++) {
        const p = photons[i];
        p.angle += p.speed * speedMultiplier;
        
        // Gradual spiral inward towards event horizon
        p.radius -= (0.05 + proximity * 0.15);
        if (p.radius < 30) {
          p.radius = 85 + Math.random() * 15;
          p.angle = Math.random() * Math.PI * 2;
        }

        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle) * (p.radius * 0.45); // Elliptical orbit plane

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 4. Absolute Event Horizon (The black hole center)
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      // Photon sphere rim
      ctx.beginPath();
      ctx.arc(cx, cy, 32.5, 0, Math.PI * 2);
      ctx.strokeStyle = isInsideHorizon 
        ? '#FFFFFF' 
        : `rgba(201, 237, 185, ${0.6 + proximity * 0.4})`;
      ctx.lineWidth = isInsideHorizon ? 2.5 : 1.5;
      ctx.shadowColor = '#C9EDB9';
      ctx.shadowBlur = isInsideHorizon ? 20 : 6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [proximity, isInsideHorizon]);

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center select-none"
    >
      {/* Black Hole Singularity Visual Canvas */}
      <div className="relative w-[220px] h-[220px] flex items-center justify-center">
        {/* Pulsing Spacetime Curvature Waves */}
        <div 
          className={`absolute inset-0 rounded-full border border-accent/20 transition-all duration-300 pointer-events-none ${
            proximity > 0.05 ? 'scale-110 opacity-70 animate-ping' : 'opacity-20 scale-100'
          }`}
        />
        <div 
          className={`absolute -inset-4 rounded-full border border-sky-400/10 pointer-events-none transition-all duration-500 ${
            proximity > 0.3 ? 'scale-115 opacity-60' : 'opacity-10'
          }`}
        />

        <canvas 
          ref={canvasRef}
          className="relative z-10 w-[220px] h-[220px] cursor-none"
        />
      </div>

      {/* Telemetry Badge & Explanatory Tag */}
      <div className="mt-3 flex flex-col items-center text-center max-w-[240px]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[11px] font-mono backdrop-blur-md">
          <Orbit className={`w-3.5 h-3.5 transition-colors ${proximity > 0 ? 'text-accent animate-spin' : 'text-neutral-400'}`} />
          <span className="text-neutral-700 dark:text-neutral-300">
            {proximity > 0 
              ? `G-Pull: ${(proximity * 100).toFixed(0)}%`
              : 'Singularity: Dormant'
            }
          </span>
          {isInsideHorizon && (
            <span className="flex items-center gap-1 text-accent font-semibold">
              <Zap className="w-3 h-3 text-accent animate-pulse" />
              Trapped
            </span>
          )}
        </div>

        <p className="mt-1.5 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 leading-snug">
          Bring your cursor near the black hole to observe spacetime curvature & gravitational bending.
        </p>
      </div>
    </div>
  );
};
