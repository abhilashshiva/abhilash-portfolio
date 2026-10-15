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

    // Decreased star count: clean, serene deep space (few, tasteful pinpricks)
    let stars: Star[] = [];
    const initStars = () => {
      stars = [];
      const count = Math.max(40, Math.floor((width * height) / 28000));
      for (let i = 0; i < count; i++) {
        const baseAlpha = 0.25 + Math.random() * 0.55;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.9 ? 0.7 + Math.random() * 0.7 : 1.6 + Math.random() * 0.6,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: 0.006 + Math.random() * 0.018,
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

        // 1. Interactive Constellation Lines (Clean & minimal: only near mouse or very close stars)
        for (let i = 0; i < stars.length; i++) {
          const s1 = stars[i];

          // Faint natural constellation pairs (only if very close)
          for (let j = i + 1; j < stars.length; j++) {
            const s2 = stars[j];
            const dx = s1.x - s2.x;
            const dy = s1.y - s2.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 65) {
              const lineAlpha = (1 - dist / 65) * 0.05 * Math.min(s1.alpha, s2.alpha);
              ctx.strokeStyle = `rgba(245, 243, 238, ${lineAlpha})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(s1.x, s1.y);
              ctx.lineTo(s2.x, s2.y);
              ctx.stroke();
            }
          }

          // Interactive connection: Star connects to mouse cursor when nearby
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

        // 2. Render Stars
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
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.15, Math.min(1, s.alpha))})`;
          ctx.fill();

          // Subtle warm glow for the few larger stars
          if (s.size > 1.5) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(254, 240, 138, ${s.alpha * 0.18})`;
            ctx.fill();
          }
        }

        // 3. Render Shooting Star / Meteor
        if (now > nextShootingStarTime && !shootingStar.active) {
          shootingStar = {
            x: Math.random() * (width * 0.75),
            y: Math.random() * (height * 0.35),
            len: 80 + Math.random() * 60,
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

      {/* Atmospheric Space Elements (Strictly Pure Cosmic Black & White-Gold / Warm Ivory - NO BLUE) */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Visible Galaxy Nebula Dust Cloud (Upper-Right behind Hero Black Hole) */}
        <div 
          className="absolute -top-32 right-[-5%] w-[750px] h-[600px] rounded-full blur-[110px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(254, 240, 138, 0.035) 0%, rgba(245, 243, 238, 0.02) 40%, transparent 70%)',
          }}
        />

        {/* Faint Nebula Dust (Mid-Left behind Headline) */}
        <div 
          className="absolute top-[28%] -left-32 w-[650px] h-[500px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(245, 243, 238, 0.025) 0%, rgba(254, 240, 138, 0.015) 45%, transparent 70%)',
          }}
        />

        {/* --- DECREASED CRESCENT PLANET IN LOWER-LEFT CORNER (Subtle & Compact) --- */}
        <div 
          className="absolute -bottom-14 -left-14 sm:-bottom-18 sm:-left-18 w-[160px] h-[160px] sm:w-[210px] sm:h-[210px] pointer-events-none"
        >
          {/* Planet Spherical Body */}
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

            {/* Subtle Surface Texture */}
            <div 
              className="absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage: 'radial-gradient(circle at 65% 35%, rgba(255,255,255,0.4) 0%, transparent 40%)',
              }}
            />
          </div>

          {/* Exterior Atmospheric Haze */}
          <div 
            className="absolute -inset-3 rounded-full blur-md pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.08) 0%, transparent 55%)',
            }}
          />
        </div>

        {/* --- MINIATURE DEEP-SPACE GALAXIES (Authentic Small Cosmic Objects) --- */}
        
        {/* Galaxy 1: Grand Spiral Galaxy (Upper Left) */}
        <div 
          className="absolute top-[20%] left-[9%] pointer-events-none opacity-35 select-none"
          title="Distant Spiral Galaxy"
        >
          <svg viewBox="0 0 80 48" className="w-8 h-5 sm:w-9 sm:h-[22px] -rotate-25 filter blur-[0.3px]">
            <defs>
              <radialGradient id="gal1-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#FEF08A" stopOpacity="0.55" />
                <stop offset="70%" stopColor="#E2E8F0" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#050508" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="gal1-arms" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#FEF08A" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#050508" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Diffuse Galactic Disc */}
            <ellipse cx="40" cy="24" rx="36" ry="14" fill="url(#gal1-arms)" />
            {/* Spiral Arm 1 */}
            <path d="M 40 24 Q 56 16 66 22 Q 72 28 64 34 Q 52 35 40 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
            {/* Spiral Arm 2 */}
            <path d="M 40 24 Q 24 32 14 26 Q 8 20 16 14 Q 28 13 40 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
            {/* Luminous Core */}
            <ellipse cx="40" cy="24" rx="11" ry="7" fill="url(#gal1-core)" />
            <circle cx="40" cy="24" r="2.2" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Galaxy 2: Edge-on Needle Galaxy / Sombrero Style (Mid-Left) */}
        <div 
          className="absolute top-[64%] left-[20%] pointer-events-none opacity-30 select-none"
          title="Edge-on Lenticular Galaxy"
        >
          <svg viewBox="0 0 90 30" className="w-8 h-3 sm:w-10 sm:h-3.5 rotate-42 filter blur-[0.2px]">
            <defs>
              <linearGradient id="gal2-disk" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="75%" stopColor="#FEF08A" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Slender Tapering Galactic Disk */}
            <ellipse cx="45" cy="15" rx="42" ry="3.5" fill="url(#gal2-disk)" />
            {/* Spherical Bulging Core */}
            <ellipse cx="45" cy="15" rx="8" ry="7" fill="rgba(254, 240, 138, 0.65)" />
            <circle cx="45" cy="15" r="2.2" fill="#FFFFFF" />
            {/* Dark Equatorial Dust Lane */}
            <line x1="18" y1="15" x2="72" y2="15" stroke="rgba(5, 5, 8, 0.7)" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Galaxy 3: Distant Elliptical Galaxy (Top Center-Right) */}
        <div 
          className="absolute top-[14%] right-[28%] pointer-events-none opacity-35 select-none"
          title="Elliptical Galaxy"
        >
          <div 
            className="w-5 h-3.5 rounded-full rotate-18 blur-[0.5px]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.85) 0%, rgba(254, 240, 138, 0.4) 35%, rgba(245, 243, 238, 0.15) 65%, transparent 100%)',
            }}
          />
        </div>

        {/* Galaxy 4: Barred Spiral Galaxy (Lower-Right) */}
        <div 
          className="absolute bottom-[24%] right-[14%] pointer-events-none opacity-28 select-none"
          title="Barred Spiral Galaxy"
        >
          <svg viewBox="0 0 70 42" className="w-7 h-4 sm:w-8 sm:h-5 -rotate-50 filter blur-[0.3px]">
            <defs>
              <radialGradient id="gal4-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#FEF08A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#050508" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Outer halo */}
            <ellipse cx="35" cy="21" rx="30" ry="12" fill="rgba(255,255,255,0.08)" />
            {/* Central Bar */}
            <rect x="22" y="19" width="26" height="4" rx="2" fill="rgba(254, 240, 138, 0.5)" />
            {/* Curved Arm 1 */}
            <path d="M 48 21 Q 58 14 62 22 Q 60 28 50 30" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            {/* Curved Arm 2 */}
            <path d="M 22 21 Q 12 28 8 20 Q 10 14 20 12" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            {/* Nucleus */}
            <ellipse cx="35" cy="21" rx="7" ry="5" fill="url(#gal4-core)" />
            <circle cx="35" cy="21" r="1.8" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Galaxy 5: Miniature Dwarf Companion Galaxy (Far Left) */}
        <div 
          className="absolute top-[44%] left-[3%] pointer-events-none opacity-25 select-none"
          title="Dwarf Galaxy"
        >
          <div 
            className="w-3.5 h-2.5 rounded-full -rotate-12 blur-[0.4px]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.75) 0%, rgba(254, 240, 138, 0.3) 40%, transparent 100%)',
            }}
          />
        </div>

        {/* Distant Small Moonlet (Upper Right Ambient Space) */}
        <div 
          className="absolute top-[16%] right-[22%] w-4 h-4 rounded-full pointer-events-none opacity-35 select-none"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #4B5263 0%, #1A1D24 60%, #050608 100%)',
            boxShadow: 'inset -1px -1px 3px rgba(0,0,0,0.9), 0 0 5px rgba(255,255,255,0.18)',
          }}
        />

      </div>
    </div>
  );
};
