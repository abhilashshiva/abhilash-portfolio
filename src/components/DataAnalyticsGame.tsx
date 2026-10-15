import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RotateCcw, ShieldCheck, Zap, BarChart2, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

interface DataPoint {
  id: number;
  x: number;
  y: number;
  type: 'clean' | 'outlier' | 'null';
  cleaned?: boolean;
  pulsing?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

interface DataAnalyticsGameProps {
  isEmbedded?: boolean;
}

export const DataAnalyticsGame: React.FC<DataAnalyticsGameProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState<number>(0);
  const [cleanliness, setCleanliness] = useState<number>(78);
  const [rSquared, setRSquared] = useState<number>(0.68);
  const [cleanedCount, setCleanedCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [analystRank, setAnalystRank] = useState<string>('Junior Data Analyst');
  const [autoCleanCooldown, setAutoCleanCooldown] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('Click red outliers to purge or yellow null gaps to impute valid values.');

  const pointsRef = useRef<DataPoint[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Generate initial dataset with authentic correlation + dirty outliers & nulls
  const initData = () => {
    const pts: DataPoint[] = [];
    const count = 38;

    for (let i = 0; i < count; i++) {
      const x = 0.08 + (i / count) * 0.84 + (Math.random() - 0.5) * 0.04;
      // Underlying trend: y = 0.2 + 0.6 * x + noise
      const cleanY = 0.22 + 0.58 * x + (Math.random() - 0.5) * 0.12;

      const rand = Math.random();
      if (rand < 0.2) {
        // Outlier: wildly off the regression line
        const outlierY = cleanY > 0.5 ? cleanY - 0.38 - Math.random() * 0.2 : cleanY + 0.38 + Math.random() * 0.2;
        pts.push({
          id: i,
          x,
          y: Math.max(0.08, Math.min(0.92, outlierY)),
          type: 'outlier',
        });
      } else if (rand < 0.32) {
        // Missing / Null gap
        pts.push({
          id: i,
          x,
          y: cleanY,
          type: 'null',
        });
      } else {
        // Clean valid point
        pts.push({
          id: i,
          x,
          y: Math.max(0.08, Math.min(0.92, cleanY)),
          type: 'clean',
        });
      }
    }

    pointsRef.current = pts;
    recalculateMetrics(pts);
  };

  useEffect(() => {
    initData();
  }, []);

  // Update analyst rank based on score
  useEffect(() => {
    if (score >= 450) {
      setAnalystRank('Principal AI & Data Architect');
    } else if (score >= 200) {
      setAnalystRank('Senior Analytics Engineer');
    } else {
      setAnalystRank('Junior Data Analyst');
    }
  }, [score]);

  // Cooldown timer for Auto-Clean power-up
  useEffect(() => {
    if (autoCleanCooldown <= 0) return;
    const timer = setInterval(() => {
      setAutoCleanCooldown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [autoCleanCooldown]);

  // Calculate real statistical correlation and cleanliness score
  const recalculateMetrics = (pts: DataPoint[]) => {
    const active = pts.filter((p) => p.type === 'clean' || p.cleaned);
    const total = pts.length;
    const cleanRatio = (active.length / total) * 100;
    setCleanliness(Math.min(99.8, Math.round(cleanRatio * 10) / 10));

    // Simple R-squared estimation
    const dirtyCount = pts.filter((p) => !p.cleaned && (p.type === 'outlier' || p.type === 'null')).length;
    const estimatedR2 = Math.min(0.98, Math.max(0.55, 0.98 - dirtyCount * 0.05));
    setRSquared(Math.round(estimatedR2 * 100) / 100);
  };

  // Particle explosion effect
  const spawnParticles = (x: number, y: number, color: string) => {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
      });
    }
  };

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let pulsePhase = 0;

    const render = () => {
      pulsePhase += 0.05;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSteps = 6;
      for (let i = 1; i < gridSteps; i++) {
        const x = (width / gridSteps) * i;
        const y = (height / gridSteps) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Linear Regression / Trend Line across clean points
      const cleanPts = pointsRef.current.filter((p) => p.type === 'clean' || p.cleaned);
      if (cleanPts.length > 2) {
        ctx.beginPath();
        ctx.moveTo(width * 0.06, height * (1 - 0.22));
        ctx.lineTo(width * 0.94, height * (1 - 0.78));
        ctx.strokeStyle = 'rgba(201, 237, 185, 0.4)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Trend Confidence Band
        ctx.beginPath();
        ctx.moveTo(width * 0.06, height * (1 - 0.28));
        ctx.lineTo(width * 0.94, height * (1 - 0.84));
        ctx.lineTo(width * 0.94, height * (1 - 0.72));
        ctx.lineTo(width * 0.06, height * (1 - 0.16));
        ctx.closePath();
        ctx.fillStyle = 'rgba(201, 237, 185, 0.04)';
        ctx.fill();
      }

      // Render Data Points
      const pts = pointsRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const px = p.x * width;
        const py = (1 - p.y) * height; // Invert for cartesian visual

        if (p.cleaned || p.type === 'clean') {
          // Clean point: Crisp emerald-accent dot
          ctx.beginPath();
          ctx.arc(px, py, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#C9EDB9';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(201, 237, 185, 0.15)';
          ctx.fill();
        } else if (p.type === 'outlier') {
          // Outlier: Pulsing red target
          const pulse = Math.sin(pulsePhase + i) * 3;
          ctx.beginPath();
          ctx.arc(px, py, 6 + pulse, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(244, 63, 94, 0.3)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#F43F5E';
          ctx.fill();

          // Outlier Warning Ring
          ctx.beginPath();
          ctx.arc(px, py, 9 + pulse, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.8)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else if (p.type === 'null') {
          // Missing Value: Blinking amber dashed ring
          const blink = (Math.sin(pulsePhase * 1.5 + i) + 1) / 2;
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(251, 191, 36, ${0.4 + blink * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 2]);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = `rgba(251, 191, 36, ${0.1 + blink * 0.25})`;
          ctx.fill();
        }
      }

      // Render Particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const pr = particles[i];
        pr.x += pr.vx;
        pr.y += pr.vy;
        pr.alpha -= 0.035;

        if (pr.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(pr.x, pr.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = pr.color;
        ctx.globalAlpha = pr.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Handle canvas click to clean or impute
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;

    const width = canvas.width;
    const height = canvas.height;

    let hit = false;
    const pts = [...pointsRef.current];

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (p.cleaned || p.type === 'clean') continue;

      const px = p.x * width;
      const py = (1 - p.y) * height;
      const dist = Math.hypot(clickX - px, clickY - py);

      if (dist < 22) {
        hit = true;
        p.cleaned = true;

        if (p.type === 'outlier') {
          // Snap outlier back to regression line
          p.y = 0.22 + 0.58 * p.x + (Math.random() - 0.5) * 0.08;
          setScore((s) => s + 35 + streak * 5);
          setStreak((st) => st + 1);
          setCleanedCount((c) => c + 1);
          setFeedback('Outlier purged! Variance stabilized & R² improved.');
          spawnParticles(px, py, '#F43F5E');
        } else if (p.type === 'null') {
          // Impute value
          setScore((s) => s + 25 + streak * 5);
          setStreak((st) => st + 1);
          setCleanedCount((c) => c + 1);
          setFeedback('Null gap imputed using KNN estimation. Completeness restored.');
          spawnParticles(px, py, '#FBBF24');
        }

        break;
      }
    }

    if (!hit) {
      setStreak(0);
      setFeedback('Clicked empty space. Target the blinking red outliers or yellow missing gaps!');
    }

    pointsRef.current = pts;
    recalculateMetrics(pts);
  };

  // Power-up: Auto-Clean Algorithmic Sweep (Isolation Forest)
  const triggerAutoClean = () => {
    if (autoCleanCooldown > 0) return;
    const pts = [...pointsRef.current];
    let cleanedBatch = 0;

    for (let i = 0; i < pts.length; i++) {
      if (!pts[i].cleaned && (pts[i].type === 'outlier' || pts[i].type === 'null')) {
        pts[i].cleaned = true;
        if (pts[i].type === 'outlier') {
          pts[i].y = 0.22 + 0.58 * pts[i].x + (Math.random() - 0.5) * 0.08;
        }
        cleanedBatch++;
      }
    }

    setScore((s) => s + cleanedBatch * 20);
    setCleanedCount((c) => c + cleanedBatch);
    setAutoCleanCooldown(12);
    setFeedback(`Isolation Forest batch executed! Cleaned ${cleanedBatch} data anomalies automatically.`);
    pointsRef.current = pts;
    recalculateMetrics(pts);
  };

  return (
    <div className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#0E0F14]/90 backdrop-blur-xl shadow-xl overflow-hidden select-none">
      
      {/* Top Telemetry & Score Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-black/10 dark:border-white/10 bg-neutral-100/60 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-accent/20 border border-accent/30 text-emerald-700 dark:text-accent">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
              <span>Data Cleaning Inspector</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-emerald-800 dark:text-accent font-mono font-medium">
                {analystRank}
              </span>
            </h3>
          </div>
        </div>

        {/* Live Score & Metrics */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">Quality:</span>
            <span className="font-semibold text-emerald-600 dark:text-accent">{cleanliness}%</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">R² Fit:</span>
            <span className="font-semibold text-sky-500 dark:text-sky-400">{rSquared}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full border border-black/5 dark:border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-neutral-900 dark:text-white font-bold">{score} pts</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Coordinate Canvas */}
      <div className="relative p-3 sm:p-4 bg-neutral-50/50 dark:bg-black/30">
        <canvas
          ref={canvasRef}
          width={720}
          height={320}
          onClick={handleCanvasClick}
          className="w-full h-[260px] sm:h-[300px] rounded-xl bg-white dark:bg-[#090A0D] border border-black/5 dark:border-white/5 cursor-crosshair shadow-inner"
        />

        {/* Live Feedback Banner */}
        <div className="mt-3 flex items-center justify-between text-xs font-mono text-neutral-600 dark:text-neutral-400 px-1">
          <p className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            <span>{feedback}</span>
          </p>

          <span className="hidden sm:inline text-neutral-400 text-[11px]">
            Cleaned: <strong className="text-neutral-800 dark:text-neutral-200">{cleanedCount}</strong>
          </span>
        </div>
      </div>

      {/* Bottom Action Controls & Power-Ups */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t border-black/10 dark:border-white/10 bg-neutral-100/50 dark:bg-white/[0.01]">
        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" /> Clean Valid
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" /> Outlier (Click)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-amber-400" /> Null Gap (Click)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={triggerAutoClean}
            disabled={autoCleanCooldown > 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-accent/20 hover:bg-accent/30 text-emerald-800 dark:text-accent border border-accent/30 transition-all active:scale-95 disabled:opacity-40"
            title="Algorithmically purge all current anomalies"
          >
            <Zap className="w-3.5 h-3.5 text-accent fill-current" />
            <span>
              {autoCleanCooldown > 0 ? `Algorithm (${autoCleanCooldown}s)` : 'Isolation Forest Sweep'}
            </span>
          </button>

          <button
            type="button"
            onClick={initData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 border border-black/10 dark:border-white/10 transition-all active:scale-95"
            title="Generate a new dirty dataset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Dataset</span>
          </button>
        </div>
      </div>

    </div>
  );
};
