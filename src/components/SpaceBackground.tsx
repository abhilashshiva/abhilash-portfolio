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
  vx: number;
  vy: number;
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

    // Initialize stars with crisp monochrome & subtle gold starlight (NO BLUE)
    let stars: Star[] = [];
    const initStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 10000); // ~110-160 stars
      for (let i = 0; i < count; i++) {
        const baseAlpha = 0.2 + Math.random() * 0.65;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.88 ? 0.7 + Math.random() * 0.9 : 1.8 + Math.random() * 1.0,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: 0.006 + Math.random() * 0.018,
          phase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.04,
          vy: (Math.random() - 0.5) * 0.04,
        });
      }
    };
    initStars();

    // Shooting star manager
    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      len: 90,
      speed: 14,
      angle: Math.PI / 4,
      opacity: 0,
      active: false,
    };

    let nextShootingStarTime = Date.now() + 5000 + Math.random() * 8000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isDark) {
        const now = Date.now();

        // 1. Constellation Lines: Connect close neighboring stars (Reference Image 2)
        // Strictly monochrome white/neutral, very faint opacity (0.04 - 0.08)
        ctx.lineWidth = 0.6;
        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const dist = Math.hypot(dx, dy);

            // Connect if close enough to form subtle geometric constellation web
            if (dist < 90) {
              const lineAlpha = (1 - dist / 90) * 0.08 * Math.min(stars[i].alpha, stars[j].alpha);
              ctx.strokeStyle = `rgba(245, 243, 238, ${lineAlpha})`;
              ctx.beginPath();
              ctx.moveTo(stars[i].x, stars[i].y);
              ctx.lineTo(stars[j].x, stars[j].y);
              ctx.stroke();
            }
          }
        }

        // 2. Render Pin-Sharp Stars
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.phase += s.twinkleSpeed;
          s.alpha = s.baseAlpha + Math.sin(s.phase) * (s.baseAlpha * 0.35);

          // Subtle drift
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0) s.x = width;
          if (s.x > width) s.x = 0;
          if (s.y < 0) s.y = height;
          if (s.y > height) s.y = 0;

          // Pure white/warm ivory star (zero blue)
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(0.95, s.alpha))})`;
          ctx.fill();

          // Delicate warm golden diffraction bloom for prominent stars
          if (s.size > 1.6) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(254, 240, 138, ${s.alpha * 0.15})`;
            ctx.fill();
          }
        }

        // 3. Render Shooting Star
        if (now > nextShootingStarTime && !shootingStar.active) {
          shootingStar = {
            x: Math.random() * (width * 0.75),
            y: Math.random() * (height * 0.4),
            len: 80 + Math.random() * 70,
            speed: 12 + Math.random() * 6,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
            opacity: 0.8,
            active: true,
          };
          nextShootingStarTime = now + 16000 + Math.random() * 14000;
        }

        if (shootingStar.active) {
          const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.len;
          const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.len;

          const grad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(1, `rgba(255, 255, 255, ${shootingStar.opacity})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(shootingStar.x, shootingStar.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
          shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
          shootingStar.opacity -= 0.014;

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
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none transition-opacity duration-700 bg-[#050508]"
    >
      {/* Dynamic Starfield & Constellation Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />

      {/* Atmospheric Space Elements (Dark Mode Only, Strictly Pure Black & Neutral White-Gold, NO BLUE) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Subtle Warm Starlight Dust Cloud (Upper-Right) */}
        <div 
          className="absolute -top-40 right-[-10%] w-[700px] h-[550px] rounded-full blur-[120px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(254, 240, 138, 0.02) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 70%)',
          }}
        />

        {/* Faint Nebula Filament (Mid-Center) */}
        <div 
          className="absolute top-[40%] left-[-15%] w-[650px] h-[500px] rounded-full blur-[130px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.018) 0%, rgba(201, 237, 185, 0.012) 45%, transparent 70%)',
          }}
        />

        {/* --- REALISTIC PLANET HORIZON IN LOWER-LEFT CORNER (Exact Reference Images 2 & 3) --- */}
        {/* Large spherical planetary body emerging from darkness with sharp luminous crescent rim */}
        <div 
          className="absolute -bottom-36 -left-36 sm:-bottom-48 sm:-left-48 w-[420px] h-[420px] sm:w-[540px] sm:h-[540px] pointer-events-none"
        >
          {/* Planet Body */}
          <div 
            className="relative w-full h-full rounded-full overflow-hidden shadow-2xl"
            style={{
              background: 'radial-gradient(circle at 72% 28%, #1A1C22 0%, #0E1015 45%, #050608 85%)',
              boxShadow: 'inset -8px -8px 24px rgba(0, 0, 0, 0.98), 0 0 60px rgba(0, 0, 0, 0.9)',
            }}
          >
            {/* Realistic Atmosphere Limb Crescent (Sharp White Starlight Glow along upper-right rim) */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: 'inset 4px 6px 14px rgba(255, 255, 255, 0.55), inset 12px 16px 36px rgba(254, 240, 138, 0.18), 0 0 35px rgba(255, 255, 255, 0.12)',
              }}
            />

            {/* Subtle Surface Continent / Terrain Shading */}
            <div 
              className="absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage: 'radial-gradient(circle at 65% 35%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 45% 60%, rgba(255,255,255,0.2) 0%, transparent 50%)',
              }}
            />
          </div>

          {/* Exterior Atmospheric Haze Falloff */}
          <div 
            className="absolute -inset-4 rounded-full blur-xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.08) 0%, rgba(254, 240, 138, 0.03) 30%, transparent 60%)',
            }}
          />
        </div>

        {/* Small Distant Planet (Upper-Center Ambient Space) */}
        <div 
          className="absolute top-[18%] right-[22%] w-6 h-6 rounded-full pointer-events-none opacity-30 select-none"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #3B4252 0%, #15171C 60%, #050608 100%)',
            boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(255,255,255,0.1)',
          }}
        />

      </div>
    </div>
  );
};
