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

    // Starfield count: cleanly increased per user request ("add just a few more stars")
    let stars: Star[] = [];
    const initStars = () => {
      stars = [];
      const count = Math.max(90, Math.floor((width * height) / 14000));
      for (let i = 0; i < count; i++) {
        const baseAlpha = 0.28 + Math.random() * 0.55;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.88 ? 0.8 + Math.random() * 0.6 : 1.7 + Math.random() * 0.5,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: 0.008 + Math.random() * 0.02,
          phase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
        });
      }
    };
    initStars();

    // Shooting star manager
    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      len: 90,
      speed: 15,
      angle: Math.PI / 4,
      opacity: 0,
      active: false,
    };

    let nextShootingStarTime = Date.now() + 5000 + Math.random() * 8000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isDark) {
        const now = Date.now();
        const mouse = mouseRef.current;

        // 1. Constellation Connections (Subtle & clean)
        for (let i = 0; i < stars.length; i++) {
          const s1 = stars[i];

          // Faint natural constellation pairs (short distance)
          for (let j = i + 1; j < stars.length; j++) {
            const s2 = stars[j];
            const dx = s1.x - s2.x;
            const dy = s1.y - s2.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 55) {
              const lineAlpha = (1 - dist / 55) * 0.04 * Math.min(s1.alpha, s2.alpha);
              ctx.strokeStyle = `rgba(245, 243, 238, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(s1.x, s1.y);
              ctx.lineTo(s2.x, s2.y);
              ctx.stroke();
            }
          }

          // Interactive connection: Star connects gently to mouse cursor when nearby
          if (mouse.active) {
            const mdx = s1.x - mouse.x;
            const mdy = s1.y - mouse.y;
            const mdist = Math.hypot(mdx, mdy);

            if (mdist < 130) {
              const mouseLineAlpha = (1 - mdist / 130) * 0.22;
              ctx.strokeStyle = `rgba(254, 240, 138, ${mouseLineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(s1.x, s1.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();

              // Subtle highlight on near star
              ctx.beginPath();
              ctx.arc(s1.x, s1.y, s1.size * 1.8, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(254, 240, 138, ${mouseLineAlpha * 0.5})`;
              ctx.fill();
            }
          }
        }

        // 2. Render Stars (Dots)
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.phase += s.twinkleSpeed;
          s.alpha = s.baseAlpha + Math.sin(s.phase) * (s.baseAlpha * 0.35);

          // Drift
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0) s.x = width;
          if (s.x > width) s.x = 0;
          if (s.y < 0) s.y = height;
          if (s.y > height) s.y = 0;

          // Star Core (crisp ivory/white)
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.18, Math.min(1, s.alpha))})`;
          ctx.fill();

          // Subtle warm glow for brighter stars
          if (s.size > 1.5) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(254, 240, 138, ${s.alpha * 0.2})`;
            ctx.fill();
          }
        }

        // 3. Render Shooting Star / Meteor
        if (now > nextShootingStarTime && !shootingStar.active) {
          shootingStar = {
            x: Math.random() * (width * 0.75),
            y: Math.random() * (height * 0.35),
            len: 85 + Math.random() * 60,
            speed: 14 + Math.random() * 6,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
            opacity: 0.85,
            active: true,
          };
          nextShootingStarTime = now + 14000 + Math.random() * 14000;
        }

        if (shootingStar.active) {
          const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.len;
          const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.len;

          const grad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(0.7, `rgba(254, 240, 138, ${shootingStar.opacity * 0.7})`);
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

      {/* Atmospheric Space Elements (Strictly Cosmic Black, White-Gold, Warm Ivory - NO BLUE) */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Soft Cosmic Nebula Dust Cloud (Upper-Right) */}
        <div 
          className="absolute -top-32 right-[-5%] w-[750px] h-[600px] rounded-full blur-[110px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(254, 240, 138, 0.035) 0%, rgba(245, 243, 238, 0.02) 40%, transparent 70%)',
          }}
        />

        {/* Faint Nebula Filament (Mid-Left) */}
        <div 
          className="absolute top-[32%] -left-32 w-[650px] h-[500px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(245, 243, 238, 0.025) 0%, rgba(254, 240, 138, 0.015) 45%, transparent 70%)',
          }}
        />

        {/* --- COMPACT CRESCENT PLANET IN LOWER-LEFT CORNER --- */}
        <div 
          className="absolute -bottom-14 -left-14 sm:-bottom-18 sm:-left-18 w-[160px] h-[160px] sm:w-[210px] sm:h-[210px] pointer-events-none"
        >
          <div 
            className="relative w-full h-full rounded-full overflow-hidden shadow-xl"
            style={{
              background: 'radial-gradient(circle at 75% 25%, #181920 0%, #0E0F14 45%, #050508 85%)',
              boxShadow: 'inset -8px -8px 24px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 0, 0, 0.9)',
            }}
          >
            {/* Luminous Atmospheric Crescent Rim Glow */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: 'inset 3px 4px 12px rgba(255, 255, 255, 0.75), inset 8px 12px 28px rgba(254, 240, 138, 0.22), 0 0 25px rgba(255, 255, 255, 0.12)',
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};
