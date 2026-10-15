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
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
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

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize rich starfield (180-260 stars for a dense, starry night)
    let stars: Star[] = [];
    const initStars = () => {
      stars = [];
      const count = Math.max(160, Math.floor((width * height) / 7500));
      for (let i = 0; i < count; i++) {
        const baseAlpha = 0.35 + Math.random() * 0.55;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.85 ? 0.9 + Math.random() * 0.9 : 2.0 + Math.random() * 1.2,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: 0.008 + Math.random() * 0.02,
          phase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
        });
      }
    };
    initStars();

    // Shooting star manager
    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      len: 110,
      speed: 15,
      angle: Math.PI / 4,
      opacity: 0,
      active: false,
    };

    let nextShootingStarTime = Date.now() + 3000 + Math.random() * 6000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isDark) {
        const now = Date.now();
        const mouse = mouseRef.current;

        // 1. Interactive Constellation Lines between Stars & toward Cursor
        ctx.lineWidth = 0.8;
        for (let i = 0; i < stars.length; i++) {
          const s1 = stars[i];

          // Connect stars to neighboring stars (subtle space web)
          for (let j = i + 1; j < stars.length; j++) {
            const s2 = stars[j];
            const dx = s1.x - s2.x;
            const dy = s1.y - s2.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 100) {
              const lineAlpha = (1 - dist / 100) * 0.12 * Math.min(s1.alpha, s2.alpha);
              ctx.strokeStyle = `rgba(245, 243, 238, ${lineAlpha})`;
              ctx.beginPath();
              ctx.moveTo(s1.x, s1.y);
              ctx.lineTo(s2.x, s2.y);
              ctx.stroke();
            }
          }

          // Interactive connection: Star connects to mouse cursor when nearby!
          if (mouse.active) {
            const mdx = s1.x - mouse.x;
            const mdy = s1.y - mouse.y;
            const mdist = Math.hypot(mdx, mdy);

            if (mdist < 140) {
              const mouseLineAlpha = (1 - mdist / 140) * 0.28;
              ctx.strokeStyle = `rgba(254, 240, 138, ${mouseLineAlpha})`;
              ctx.lineWidth = 1.0;
              ctx.beginPath();
              ctx.moveTo(s1.x, s1.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();

              // Highlight nearby star gently
              ctx.beginPath();
              ctx.arc(s1.x, s1.y, s1.size * 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(254, 240, 138, ${mouseLineAlpha * 0.6})`;
              ctx.fill();
            }
          }
        }

        // 2. Render Stars
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.phase += s.twinkleSpeed;
          s.alpha = s.baseAlpha + Math.sin(s.phase) * (s.baseAlpha * 0.4);

          // Subtle drift
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0) s.x = width;
          if (s.x > width) s.x = 0;
          if (s.y < 0) s.y = height;
          if (s.y > height) s.y = 0;

          // Star Core (crisp bright white/warm ivory)
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.2, Math.min(1, s.alpha))})`;
          ctx.fill();

          // Star Glow / Diffraction Bloom for brighter stars
          if (s.size > 1.8) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * 2.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(254, 240, 138, ${s.alpha * 0.25})`;
            ctx.fill();
          }
        }

        // 3. Render Shooting Star / Meteor
        if (now > nextShootingStarTime && !shootingStar.active) {
          shootingStar = {
            x: Math.random() * (width * 0.8),
            y: Math.random() * (height * 0.4),
            len: 90 + Math.random() * 80,
            speed: 14 + Math.random() * 7,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
            opacity: 0.9,
            active: true,
          };
          nextShootingStarTime = now + 12000 + Math.random() * 12000;
        }

        if (shootingStar.active) {
          const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.len;
          const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.len;

          const grad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(0.7, `rgba(254, 240, 138, ${shootingStar.opacity * 0.8})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${shootingStar.opacity})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(shootingStar.x, shootingStar.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
          shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
          shootingStar.opacity -= 0.015;

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
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <div 
      aria-hidden="true" 
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-opacity duration-700 ${
        isDark ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Dynamic Starfield & Interactive Constellation Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />

      {/* Atmospheric Space Elements (Strictly Pure Black & White-Gold / Ivory, NO BLUE) */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Visible Galaxy Nebula Dust Cloud (Upper-Right behind Hero Black Hole) */}
        <div 
          className="absolute -top-32 right-[-5%] w-[800px] h-[650px] rounded-full blur-[110px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(254, 240, 138, 0.045) 0%, rgba(245, 243, 238, 0.03) 35%, rgba(201, 237, 185, 0.02) 60%, transparent 75%)',
          }}
        />

        {/* Faint Nebula Filament (Mid-Left behind Headline) */}
        <div 
          className="absolute top-[28%] -left-32 w-[700px] h-[550px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(245, 243, 238, 0.035) 0%, rgba(254, 240, 138, 0.02) 40%, transparent 70%)',
          }}
        />

        {/* Lower Ambient Cosmic Glow (Bottom-Right) */}
        <div 
          className="absolute -bottom-24 right-1/4 w-[750px] h-[480px] rounded-full blur-[130px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201, 237, 185, 0.03) 0%, rgba(254, 240, 138, 0.018) 45%, transparent 70%)',
          }}
        />

        {/* --- REALISTIC CRESCENT PLANET IN LOWER-LEFT CORNER (Reference Images 2 & 3) --- */}
        <div 
          className="absolute -bottom-36 -left-36 sm:-bottom-44 sm:-left-44 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none"
        >
          {/* Planet Spherical Body */}
          <div 
            className="relative w-full h-full rounded-full overflow-hidden shadow-2xl"
            style={{
              background: 'radial-gradient(circle at 75% 25%, #181920 0%, #0E0F14 45%, #050508 85%)',
              boxShadow: 'inset -10px -10px 30px rgba(0, 0, 0, 0.95), 0 0 60px rgba(0, 0, 0, 0.9)',
            }}
          >
            {/* Luminous Atmospheric Crescent Rim Glow */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: 'inset 4px 6px 16px rgba(255, 255, 255, 0.7), inset 14px 18px 40px rgba(254, 240, 138, 0.25), 0 0 40px rgba(255, 255, 255, 0.15)',
              }}
            />

            {/* Subtle Surface Texture */}
            <div 
              className="absolute inset-0 opacity-30 mix-blend-overlay"
              style={{
                backgroundImage: 'radial-gradient(circle at 65% 35%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 45% 60%, rgba(255,255,255,0.2) 0%, transparent 50%)',
              }}
            />
          </div>

          {/* Exterior Atmospheric Haze */}
          <div 
            className="absolute -inset-4 rounded-full blur-xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.1) 0%, rgba(254, 240, 138, 0.04) 30%, transparent 60%)',
            }}
          />
        </div>

        {/* Distant Small Moonlet (Upper Right Ambient Space) */}
        <div 
          className="absolute top-[16%] right-[24%] w-5 h-5 rounded-full pointer-events-none opacity-40 select-none"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #4B5263 0%, #1A1D24 60%, #050608 100%)',
            boxShadow: 'inset -1px -1px 3px rgba(0,0,0,0.9), 0 0 6px rgba(255,255,255,0.2)',
          }}
        />

      </div>
    </div>
  );
};
