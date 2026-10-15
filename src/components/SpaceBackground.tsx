import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Initialize stars
    let stars: Star[] = [];
    const initStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 12000); // ~90-130 stars
      for (let i = 0; i < count; i++) {
        const baseAlpha = 0.15 + Math.random() * 0.55;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.85 ? 0.8 + Math.random() * 0.8 : 1.8 + Math.random() * 0.8,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: 0.008 + Math.random() * 0.02,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    initStars();

    // Shooting star manager
    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      len: 80,
      speed: 12,
      angle: Math.PI / 4,
      opacity: 0,
      active: false,
    };

    let nextShootingStarTime = Date.now() + 4000 + Math.random() * 6000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isDark) {
        const now = Date.now();

        // Check if time to launch shooting star
        if (now > nextShootingStarTime && !shootingStar.active) {
          shootingStar = {
            x: Math.random() * (width * 0.7),
            y: Math.random() * (height * 0.35),
            len: 70 + Math.random() * 60,
            speed: 10 + Math.random() * 6,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
            opacity: 0.7,
            active: true,
          };
          nextShootingStarTime = now + 14000 + Math.random() * 12000;
        }

        // Render ambient stars
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.phase += s.twinkleSpeed;
          s.alpha = s.baseAlpha + Math.sin(s.phase) * (s.baseAlpha * 0.4);

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 243, 238, ${Math.max(0.08, Math.min(0.9, s.alpha))})`;
          ctx.fill();

          // Delicate stellar bloom on brighter stars
          if (s.size > 1.6) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(201, 237, 185, ${s.alpha * 0.12})`;
            ctx.fill();
          }
        }

        // Render shooting star if active
        if (shootingStar.active) {
          const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.len;
          const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.len;

          const grad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
          grad.addColorStop(0, 'rgba(201, 237, 185, 0)');
          grad.addColorStop(1, `rgba(255, 255, 255, ${shootingStar.opacity})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(shootingStar.x, shootingStar.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Move
          shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
          shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
          shootingStar.opacity -= 0.012;

          if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
            shootingStar.active = false;
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden transition-opacity duration-700"
    >
      {/* Dynamic Starfield Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />

      {/* Deep Space Cosmic Nebulae Clouds (Dark Mode Only, very light & non-distracting) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Distant Cosmic Dust / Spiral Galaxy Glow (Top Right) */}
        <div 
          className="absolute -top-32 right-[-5%] w-[680px] h-[520px] rounded-full blur-[110px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(120, 119, 198, 0.045) 0%, rgba(56, 189, 248, 0.02) 45%, transparent 70%)',
          }}
        />

        {/* Faint Galaxy Filament (Mid-Left) */}
        <div 
          className="absolute top-[42%] -left-36 w-[620px] h-[480px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.03) 0%, rgba(201, 237, 185, 0.02) 50%, transparent 75%)',
          }}
        />

        {/* Soft Aurora Dust (Bottom Center) */}
        <div 
          className="absolute -bottom-24 left-1/3 w-[750px] h-[450px] rounded-full blur-[130px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201, 237, 185, 0.025) 0%, rgba(120, 119, 198, 0.015) 50%, transparent 70%)',
          }}
        />

        {/* --- Small Distant Planet 1: Ringed Exoplanet (Upper Right Ambient Space) --- */}
        <div 
          className="absolute top-[14%] right-[10%] sm:right-[14%] pointer-events-none opacity-25 select-none"
          title="Exoplanet in distant orbit"
        >
          <div className="relative w-12 h-12 sm:w-14 sm:h-14">
            {/* Planetary Rings */}
            <div 
              className="absolute -inset-2.5 sm:-inset-3 border border-neutral-400/30 rounded-full"
              style={{
                transform: 'scaleY(0.32) rotate(-28deg)',
                boxShadow: '0 0 10px rgba(201, 237, 185, 0.15)',
              }}
            />
            <div 
              className="absolute -inset-4 sm:-inset-5 border border-neutral-500/15 rounded-full"
              style={{
                transform: 'scaleY(0.32) rotate(-28deg)',
              }}
            />
            {/* Planet Body */}
            <div 
              className="w-full h-full rounded-full shadow-inner"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #2A2D34 0%, #15171C 65%, #08090C 100%)',
                boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.8), 0 0 12px rgba(120, 119, 198, 0.1)',
              }}
            />
          </div>
        </div>

        {/* --- Small Distant Planet 2: Crescent Moonlet (Mid-Left Ambient Space) --- */}
        <div 
          className="absolute top-[64%] left-[6%] sm:left-[9%] pointer-events-none opacity-20 select-none"
          title="Distant terrestrial moon"
        >
          <div 
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #3B4252 0%, #1E222A 55%, #0D0F14 100%)',
              boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(201, 237, 185, 0.08)',
            }}
          />
        </div>

        {/* --- Subtle Spiral Galaxy Core Motif (Far Upper-Left Ambient Space) --- */}
        <div 
          className="absolute top-[8%] left-[12%] w-16 h-16 pointer-events-none opacity-[0.14] select-none"
          style={{
            transform: 'rotate(35deg)',
            background: 'radial-gradient(circle at center, rgba(245, 243, 238, 0.4) 0%, rgba(201, 237, 185, 0.15) 30%, transparent 70%)',
            filter: 'blur(1px)',
          }}
        />
      </div>
    </div>
  );
};
