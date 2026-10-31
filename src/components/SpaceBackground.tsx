import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const SpaceBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500"
    >
      {/* Base Subtle Architectural Grid */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDark 
            ? 'opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]' 
            : 'opacity-[0.04] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)]'
        } [background-size:48px_48px]` }
      />

      {/* Subtle Dot Array Texture */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDark ? 'opacity-[0.06]' : 'opacity-[0.04]'
        } bg-[radial-gradient(#C9EDB9_1px,transparent_1px)] [background-size:24px_24px]`}
      />

      {/* Top Ambient Glow (Soft Emerald/Ivory highlight) */}
      <div 
        className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
          isDark 
            ? 'bg-gradient-to-b from-accent/10 via-emerald-950/20 to-transparent' 
            : 'bg-gradient-to-b from-accent/20 via-emerald-100/30 to-transparent'
        }`}
      />

      {/* Center Subtle Spatial Mesh */}
      <div 
        className={`absolute top-1/3 -right-60 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ${
          isDark ? 'bg-accent/[0.03]' : 'bg-accent/[0.06]'
        }`}
      />

      {/* Bottom Subtle Spatial Mesh */}
      <div 
        className={`absolute -bottom-40 -left-40 w-[600px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ${
          isDark ? 'bg-accent/[0.02]' : 'bg-accent/[0.04]'
        }`}
      />

      {/* Vignette Edge Shading for Depth */}
      <div 
        className={`absolute inset-0 pointer-events-none ${
          isDark 
            ? 'bg-[radial-gradient(circle_at_center,transparent_30%,#050508_95%)]' 
            : 'bg-[radial-gradient(circle_at_center,transparent_40%,#F3F0E9_95%)]'
        }`}
      />
    </div>
  );
};
