import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ShieldCheck, Zap, Activity, AlertOctagon, Trophy } from 'lucide-react';

interface StreamPoint {
  id: number;
  x: number;
  val: number; // Normalized -1 to 1
  isAnomaly: boolean;
  intercepted: boolean;
  missed: boolean;
}

export const AnomalyHunter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [pipelineHealth, setPipelineHealth] = useState<number>(100);
  const [autoFilter, setAutoFilter] = useState<boolean>(false);
  const [sensitivity, setSensitivity] = useState<number>(2.2); // Sigma threshold
  const [anomaliesCaught, setAnomaliesCaught] = useState<number>(0);
  const [streamSpeed, setStreamSpeed] = useState<number>(1.0);

  const pointsRef = useRef<StreamPoint[]>([]);
  const nextIdRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize stream points
  useEffect(() => {
    const initialPoints: StreamPoint[] = [];
    for (let i = 0; i < 45; i++) {
      const isAnomaly = Math.random() < 0.12;
      const val = isAnomaly 
        ? (Math.random() > 0.5 ? 0.75 + Math.random() * 0.2 : -0.75 - Math.random() * 0.2)
        : (Math.sin(i * 0.4) * 0.35 + (Math.random() - 0.5) * 0.15);

      initialPoints.push({
        id: nextIdRef.current++,
        x: i * 14,
        val,
        isAnomaly,
        intercepted: false,
        missed: false,
      });
    }
    pointsRef.current = initialPoints;
  }, []);

  // Main Game / Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;
      const isDark = document.documentElement.classList.contains('dark');

      if (isPlaying) {
        // Move points to the right
        const pts = pointsRef.current;
        for (let i = 0; i < pts.length; i++) {
          pts[i].x += streamSpeed * 60 * dt;

          // Check if Auto-Filter is enabled
          if (autoFilter && pts[i].isAnomaly && !pts[i].intercepted && pts[i].x > 150) {
            const zScore = Math.abs(pts[i].val) * 3;
            if (zScore >= sensitivity) {
              pts[i].intercepted = true;
              setScore((s) => s + 5);
              setAnomaliesCaught((c) => c + 1);
            }
          }

          // Check if anomaly was missed and hit the pipeline threshold (right edge)
          if (pts[i].isAnomaly && !pts[i].intercepted && !pts[i].missed && pts[i].x >= width - 30) {
            pts[i].missed = true;
            setStreak(0);
            setPipelineHealth((h) => Math.max(10, h - 8));
          }
        }

        // Remove off-screen points and spawn new ones on left
        const filtered = pts.filter((p) => p.x < width + 20);
        
        // Spawn on the left edge if space permits
        const leftmost = filtered.reduce((min, p) => (p.x < min ? p.x : min), width);
        if (leftmost > 14) {
          const isAnomaly = Math.random() < 0.16;
          const val = isAnomaly
            ? (Math.random() > 0.5 ? 0.75 + Math.random() * 0.22 : -0.75 - Math.random() * 0.22)
            : (Math.sin(Date.now() * 0.003) * 0.38 + (Math.random() - 0.5) * 0.16);

          filtered.push({
            id: nextIdRef.current++,
            x: 0,
            val,
            isAnomaly,
            intercepted: false,
            missed: false,
          });
        }
        pointsRef.current = filtered;
      }

      // RENDER CANVAS
      ctx.clearRect(0, 0, width, height);

      // Grid background lines
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Safe Baseline Zone (±1.5σ band)
      const thresholdY = (sensitivity / 3) * (height * 0.42);
      ctx.fillStyle = isDark ? 'rgba(201, 237, 185, 0.03)' : 'rgba(150, 210, 128, 0.05)';
      ctx.fillRect(0, centerY - thresholdY, width, thresholdY * 2);

      // Threshold Boundary Lines
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, centerY - thresholdY);
      ctx.lineTo(width, centerY - thresholdY);
      ctx.moveTo(0, centerY + thresholdY);
      ctx.lineTo(width, centerY + thresholdY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Center Baseline
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Model Ingestion Target Gate on the right
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(width - 45, 0, 45, height);
      ctx.strokeStyle = isDark ? 'rgba(201, 237, 185, 0.3)' : 'rgba(150, 210, 128, 0.4)';
      ctx.strokeRect(width - 45, 0, 45, height);

      // Draw waveform connections
      const pts = pointsRef.current;
      if (pts.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = isDark ? 'rgba(201, 237, 185, 0.45)' : 'rgba(90, 160, 70, 0.45)';
        ctx.lineWidth = 1.8;

        for (let i = 0; i < pts.length; i++) {
          const py = centerY + pts[i].val * (height * 0.42);
          if (i === 0) ctx.moveTo(pts[i].x, py);
          else ctx.lineTo(pts[i].x, py);
        }
        ctx.stroke();
      }

      // Draw individual telemetry nodes
      pts.forEach((pt) => {
        const py = centerY + pt.val * (height * 0.42);

        ctx.beginPath();
        if (pt.isAnomaly) {
          if (pt.intercepted) {
            // Cleaned anomaly
            ctx.arc(pt.x, py, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#10B981'; // Green cleared
            ctx.fill();
            ctx.strokeStyle = isDark ? '#141414' : '#FFFFFF';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          } else if (pt.missed) {
            // Missed anomaly
            ctx.arc(pt.x, py, 7, 0, Math.PI * 2);
            ctx.fillStyle = '#EF4444'; // Red missed
            ctx.fill();
          } else {
            // Active target anomaly!
            ctx.arc(pt.x, py, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#F59E0B'; // Amber alert
            ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        } else {
          // Regular stream point
          ctx.arc(pt.x, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#C9EDB9' : '#4B7B3C';
          ctx.fill();
        }
      });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, autoFilter, sensitivity, streamSpeed]);

  // Click on canvas to manual-clean an anomaly
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;
    const centerY = canvas.height / 2;

    let hit = false;
    const pts = pointsRef.current;

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (p.isAnomaly && !p.intercepted && !p.missed) {
        const py = centerY + p.val * (canvas.height * 0.42);
        const dist = Math.hypot(clickX - p.x, clickY - py);

        // Click radius tolerance
        if (dist < 26) {
          p.intercepted = true;
          hit = true;
          setScore((s) => s + 10 * (streak + 1));
          setStreak((st) => st + 1);
          setAnomaliesCaught((c) => c + 1);
          setPipelineHealth((h) => Math.min(100, h + 3));
          break;
        }
      }
    }

    if (!hit) {
      // Missed click
      setStreak(0);
    }
  };

  const handleReset = () => {
    setScore(0);
    setStreak(0);
    setPipelineHealth(100);
    setAnomaliesCaught(0);
    const pts = pointsRef.current;
    for (let i = 0; i < pts.length; i++) {
      pts[i].intercepted = false;
      pts[i].missed = false;
    }
  };

  return (
    <section id="anomaly-hunter" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            04 / Interactive Mini-Game
          </span>
          <div className="h-[1px] flex-1 bg-black/[0.06] dark:bg-white/[0.06]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-[#F5F3EE]">
              DataStream Anomaly Hunter
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-3 font-sans">
              Test your reflexes or deploy an automated &sigma;-filter! Click and neutralize amber outlier spikes before they enter the downstream model ingestion pipeline.
            </p>

            {/* How to play guide */}
            <div className="mt-4 flex items-start gap-2.5 text-xs font-mono text-neutral-600 dark:text-neutral-300 bg-neutral-100/80 dark:bg-white/[0.03] p-3 rounded-xl border border-black/5 dark:border-white/5">
              <span className="text-amber-500 font-semibold flex-shrink-0">How to play:</span>
              <span>Click on the amber outlier nodes as they travel across the oscilloscope before reaching the right-side ML sink. Intercept anomalies consecutively to build multiplier streaks and protect pipeline integrity. Toggle Auto &sigma;-Filter to test automated detection.</span>
            </div>
          </div>

          {/* Quote Bubble & Score */}
          <div className="flex flex-col items-start md:items-end gap-2.5 self-start md:self-auto">
            {/* Quote Bubble */}
            <div className="relative px-3.5 py-1.5 rounded-2xl bg-neutral-900 dark:bg-[#1A1A1A] border border-white/10 text-neutral-200 text-xs font-serif italic shadow-md">
              <span className="block leading-tight text-neutral-300">"Catch the accuracy,</span>
              <span className="block text-accent font-sans not-italic text-[11px] font-medium leading-tight">filter the noise."</span>
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-neutral-900 dark:bg-[#1A1A1A] border-r border-b border-white/10 rotate-45" />
            </div>

            {/* Score & Multiplier Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-emerald-700 dark:text-accent font-mono text-xs shadow-sm">
                <Trophy className="w-3.5 h-3.5" />
                <span>Score: {score}</span>
              </div>
              {streak > 1 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs animate-bounce">
                  <Zap className="w-3 h-3" />
                  <span>{streak}x Combo</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Game Oscilloscope Board */}
        <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#121212] p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Top Telemetry Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.06] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/10 text-accent">
                <Activity className="w-4 h-4 text-neutral-900 dark:text-accent" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400">Pipeline Integrity</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-24 sm:w-36 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        pipelineHealth > 60 ? 'bg-emerald-500' : pipelineHealth > 30 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${pipelineHealth}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs text-neutral-800 dark:text-neutral-200">{pipelineHealth}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 font-mono text-xs text-neutral-500 dark:text-neutral-400">
              <div>
                <span className="block text-[10px] uppercase">Anomalies Cleaned</span>
                <span className="font-semibold text-neutral-900 dark:text-white">{anomaliesCaught}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase">Throughput</span>
                <span className="font-semibold text-neutral-900 dark:text-white">{(streamSpeed * 40).toFixed(0)} evt/s</span>
              </div>
            </div>
          </div>

          {/* Oscilloscope Canvas */}
          <div className="relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-neutral-950 shadow-inner">
            <canvas
              ref={canvasRef}
              width={780}
              height={320}
              onClick={handleCanvasClick}
              className="w-full h-[260px] sm:h-[320px] cursor-pointer block"
            />

            {/* Target Lane Label on right */}
            <div className="absolute top-3 right-3 pointer-events-none px-2.5 py-1 rounded bg-black/70 border border-white/10 font-mono text-[10px] text-accent">
              ML Pipeline Sink &rarr;
            </div>

            <div className="absolute bottom-3 left-3 pointer-events-none px-2.5 py-1 rounded bg-black/70 border border-white/10 font-mono text-[10px] text-neutral-400">
              Click amber anomalies to intercept!
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2">
            
            {/* Speed & Sensitivity Controls */}
            <div className="md:col-span-8 flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent hover:bg-accent-hover text-black font-semibold text-xs tracking-tight transition-all shadow-sm"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause' : 'Resume'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 rounded-xl bg-neutral-100 dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                  title="Reset score and health"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Speed Toggle */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono text-neutral-400 mr-1">Speed:</span>
                {[1.0, 2.0, 3.2].map((s, idx) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStreamSpeed(s)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                      streamSpeed === s
                        ? 'bg-neutral-800 dark:bg-white/15 text-white font-semibold'
                        : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-500'
                    }`}
                  >
                    {idx === 0 ? '1x' : idx === 1 ? '2x' : '3x'}
                  </button>
                ))}
              </div>

              {/* Auto Filter Toggle */}
              <button
                type="button"
                onClick={() => setAutoFilter(!autoFilter)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                  autoFilter
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-accent font-semibold'
                    : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-500 border-transparent hover:border-black/10'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Auto &sigma;-Filter: {autoFilter ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Sensitivity Slider */}
            <div className="md:col-span-4 flex items-center gap-2.5 justify-end">
              <span className="text-[11px] font-mono text-neutral-500 whitespace-nowrap">Threshold: {sensitivity}&sigma;</span>
              <input
                type="range"
                min="1.6"
                max="2.8"
                step="0.2"
                value={sensitivity}
                onChange={(e) => setSensitivity(+e.target.value)}
                className="w-28 accent-accent cursor-pointer"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Thin Horizontal Separator */}
      <div className="w-full h-[1px] bg-black/[0.06] dark:bg-white/[0.06] mt-24" />
    </section>
  );
};
