import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Sparkles, Brain, Award, Sliders, Info } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  label: 0 | 1; // 0 = Cluster A (Accent), 1 = Cluster B (Purple/Cyan)
}

interface NeuralPlaygroundProps {
  isEmbedded?: boolean;
}

export const NeuralPlayground: React.FC<NeuralPlaygroundProps> = ({ isEmbedded = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [modelType, setModelType] = useState<'linear' | 'mlp'>('mlp');
  const [learningRate, setLearningRate] = useState<number>(0.05);
  const [epochs, setEpochs] = useState<number>(100);
  const [accuracy, setAccuracy] = useState<number>(94.5);
  const [loss, setLoss] = useState<number>(0.08);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<0 | 1>(0);
  const [patternType, setPatternType] = useState<'clusters' | 'circles'>('clusters');
  const [gameScore, setGameScore] = useState<number>(0);
  const [testTarget, setTestTarget] = useState<{ x: number; y: number } | null>(null);
  const [feedback, setFeedback] = useState<string>('Click anywhere on the canvas to place sample training points or test the model.');

  // Generate initial datasets
  const generateData = (type: 'clusters' | 'circles'): Point[] => {
    const pts: Point[] = [];
    if (type === 'clusters') {
      // Cluster A: Top-left & center
      for (let i = 0; i < 24; i++) {
        pts.push({
          x: 0.25 + (Math.random() - 0.5) * 0.28,
          y: 0.35 + (Math.random() - 0.5) * 0.28,
          label: 0,
        });
      }
      // Cluster B: Bottom-right
      for (let i = 0; i < 24; i++) {
        pts.push({
          x: 0.72 + (Math.random() - 0.5) * 0.28,
          y: 0.65 + (Math.random() - 0.5) * 0.28,
          label: 1,
        });
      }
    } else {
      // Concentric circles
      for (let i = 0; i < 28; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = 0.18 + Math.random() * 0.1;
        pts.push({
          x: 0.5 + Math.cos(angle) * r,
          y: 0.5 + Math.sin(angle) * r,
          label: 0,
        });
      }
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = 0.38 + Math.random() * 0.12;
        pts.push({
          x: 0.5 + Math.cos(angle) * r,
          y: 0.5 + Math.sin(angle) * r,
          label: 1,
        });
      }
    }
    return pts;
  };

  const [points, setPoints] = useState<Point[]>(() => generateData('clusters'));

  // Draw decision boundary and points on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Decision Boundary approximation grid
    const step = 8;
    const isDark = document.documentElement.classList.contains('dark');

    for (let px = 0; px < width; px += step) {
      for (let py = 0; py < height; py += step) {
        const nx = px / width;
        const ny = py / height;

        let score = 0;
        if (patternType === 'circles') {
          const dist = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.5) ** 2);
          score = dist < 0.28 ? 0 : 1;
        } else {
          score = (nx + ny * 0.9) < 0.95 ? 0 : 1;
        }

        if (score === 0) {
          ctx.fillStyle = isDark ? 'rgba(201, 237, 185, 0.05)' : 'rgba(150, 210, 128, 0.08)';
        } else {
          ctx.fillStyle = isDark ? 'rgba(120, 140, 255, 0.04)' : 'rgba(90, 110, 240, 0.06)';
        }
        ctx.fillRect(px, py, step, step);
      }
    }

    // Grid Lines
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

    // Draw Data Points
    points.forEach((pt) => {
      const cx = pt.x * width;
      const cy = pt.y * height;

      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      if (pt.label === 0) {
        ctx.fillStyle = '#C9EDB9';
        ctx.shadowColor = 'rgba(201, 237, 185, 0.8)';
        ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = '#9B87F5';
        ctx.shadowColor = 'rgba(155, 135, 245, 0.8)';
        ctx.shadowBlur = 8;
      }
      ctx.fill();
      ctx.shadowBlur = 0; // reset
      ctx.strokeStyle = isDark ? '#141414' : '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Draw Target Test Point if present
    if (testTarget) {
      const tx = testTarget.x * width;
      const ty = testTarget.y * height;

      ctx.save();
      ctx.beginPath();
      ctx.arc(tx, ty, 9, 0, Math.PI * 2);
      ctx.strokeStyle = '#FBBF24';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(tx, ty, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FBBF24';
      ctx.fill();
      ctx.restore();
    }
  }, [points, patternType, testTarget]);

  // Click on canvas to add points or evaluate test point
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    if (testTarget) {
      // Evaluate test target classification
      let trueLabel: 0 | 1 = 0;
      if (patternType === 'circles') {
        const dist = Math.sqrt((testTarget.x - 0.5) ** 2 + (testTarget.y - 0.5) ** 2);
        trueLabel = dist < 0.28 ? 0 : 1;
      } else {
        trueLabel = (testTarget.x + testTarget.y * 0.9) < 0.95 ? 0 : 1;
      }

      if (selectedClass === trueLabel) {
        setGameScore((prev) => prev + 10);
        setFeedback(`Exact Match! You correctly identified Class ${trueLabel === 0 ? 'A (Accent)' : 'B (Neural)'}. +10 pts!`);
      } else {
        setFeedback(`Boundary Misclassification! Expected Class ${trueLabel === 0 ? 'A' : 'B'}.`);
      }
      setTestTarget(null);
      return;
    }

    // Add manual point
    setPoints((prev) => [...prev, { x: nx, y: ny, label: selectedClass }]);
    setFeedback(`Added manual data sample for Class ${selectedClass === 0 ? 'A' : 'B'}.`);
  };

  // Run Training Simulation
  const handleTrain = () => {
    setIsTraining(true);
    setFeedback('Simulating backpropagation across decision tensor epochs...');

    let currentEpoch = 0;
    const targetEpochs = epochs;
    const interval = setInterval(() => {
      currentEpoch += 20;
      if (currentEpoch >= targetEpochs) {
        clearInterval(interval);
        setIsTraining(false);
        const calcAcc = +(93 + Math.random() * 5.8).toFixed(1);
        const calcLoss = +(0.02 + Math.random() * 0.05).toFixed(3);
        setAccuracy(calcAcc);
        setLoss(calcLoss);
        setFeedback(`Convergence reached! Accuracy: ${calcAcc}%, Loss: ${calcLoss}.`);
      }
    }, 120);
  };

  // Spawn a test point for the mini-game
  const handleSpawnTest = () => {
    const randomX = 0.15 + Math.random() * 0.7;
    const randomY = 0.15 + Math.random() * 0.7;
    setTestTarget({ x: randomX, y: randomY });
    setFeedback('Target point spawned! Select the predicted Class (A or B) and click the target point to classify!');
  };

  const handleReset = (type: 'clusters' | 'circles') => {
    setPatternType(type);
    setPoints(generateData(type));
    setTestTarget(null);
    setFeedback(`Reset canvas to ${type === 'clusters' ? 'Bimodal Clusters' : 'Non-Linear Concentric Rings'}.`);
  };

  const content = (
    <div className={isEmbedded ? "w-full" : "max-w-6xl mx-auto px-6 sm:px-8"}>
      {!isEmbedded && (
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            03 / Interactive Lab
          </span>
          <div className="h-[1px] flex-1 bg-black/[0.06] dark:bg-white/[0.06]" />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          {!isEmbedded && (
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-[#F5F3EE]">
              Let's Play with Data &amp; Accuracy
            </h2>
          )}
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-emerald-700 dark:text-accent">
              Neural Accuracy Sandbox
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 font-sans">
              An interactive mini-lab modeling decision hyperplanes. Place custom observations, toggle model depth, train the weights, or play the classification game.
            </p>

            {/* How to play guide */}
            <div className="mt-4 flex items-start gap-2.5 text-xs font-mono text-neutral-600 dark:text-neutral-300 bg-neutral-100/80 dark:bg-white/[0.03] p-3 rounded-xl border border-black/5 dark:border-white/5">
              <span className="text-accent font-semibold flex-shrink-0">How to play:</span>
              <span>Click anywhere on the coordinate canvas to plot Class A (Lime) or Class B (Indigo) observations. Tune the learning rate and epochs, then click "Train Model" to watch decision hyperplanes converge in real-time. Hit "Test Game Point" to guess and classify test targets.</span>
            </div>
          </div>

          {/* Quote Bubble & Score */}
          <div className="flex flex-col items-start md:items-end gap-2.5 self-start md:self-auto">
            {/* Quote Bubble */}
            <div className="relative px-3.5 py-1.5 rounded-2xl bg-neutral-900 dark:bg-[#1A1A1A] border border-white/10 text-neutral-200 text-xs font-serif italic shadow-md">
              <span className="block leading-tight text-neutral-300">"Play with accuracy,</span>
              <span className="block text-accent font-sans not-italic text-[11px] font-medium leading-tight">tune with precision."</span>
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-neutral-900 dark:bg-[#1A1A1A] border-r border-b border-white/10 rotate-45" />
            </div>

            {/* Score Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-emerald-700 dark:text-accent font-mono text-xs shadow-sm">
              <Award className="w-3.5 h-3.5" />
              <span>Score: {gameScore} pts</span>
            </div>
          </div>
        </div>

        {/* Sandbox Canvas & Controls Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#121212] p-6 sm:p-8 shadow-xl">
          
          {/* Left Canvas Frame */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-neutral-950 shadow-inner">
              <canvas
                ref={canvasRef}
                width={560}
                height={400}
                onClick={handleCanvasClick}
                className="w-full h-[320px] sm:h-[380px] cursor-crosshair block"
              />
              
              {/* Overlay status tags */}
              <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono text-neutral-300 border border-white/10">
                  {points.length} Samples
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono text-accent border border-white/10">
                  Acc: {accuracy}%
                </span>
              </div>

              <div className="absolute bottom-3 right-3 pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-neutral-400 border border-white/10">
                  Click to place point
                </span>
              </div>
            </div>

            {/* Dynamic Status / Feedback ticker */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] text-xs font-mono text-neutral-600 dark:text-neutral-300">
              <Info className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="truncate">{feedback}</span>
            </div>
          </div>

          {/* Right Controls Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Pattern Presets */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                1. Dataset Geometry
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleReset('clusters')}
                  className={`px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
                    patternType === 'clusters'
                      ? 'bg-neutral-800 text-white border-accent/40 shadow-sm'
                      : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-400 border-transparent hover:border-black/10 dark:hover:border-white/10'
                  }`}
                >
                  Bimodal Clusters
                </button>
                <button
                  type="button"
                  onClick={() => handleReset('circles')}
                  className={`px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
                    patternType === 'circles'
                      ? 'bg-neutral-800 text-white border-accent/40 shadow-sm'
                      : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-400 border-transparent hover:border-black/10 dark:hover:border-white/10'
                  }`}
                >
                  Concentric Rings
                </button>
              </div>
            </div>

            {/* Point Placement Class Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                2. Active Class Brush
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedClass(0)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
                    selectedClass === 0
                      ? 'bg-accent/20 border-accent text-neutral-900 dark:text-white font-semibold'
                      : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 border-transparent'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span>Class A (Lime)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedClass(1)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
                    selectedClass === 1
                      ? 'bg-indigo-500/20 border-indigo-400 text-neutral-900 dark:text-white font-semibold'
                      : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 border-transparent'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9B87F5]" />
                  <span>Class B (Indigo)</span>
                </button>
              </div>
            </div>

            {/* Hyperparameters Sliders */}
            <div className="space-y-4 pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Model Structure</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setModelType('linear')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono ${
                      modelType === 'linear' ? 'bg-accent text-black font-semibold' : 'bg-neutral-100 dark:bg-white/[0.05] text-neutral-500'
                    }`}
                  >
                    Linear
                  </button>
                  <button
                    type="button"
                    onClick={() => setModelType('mlp')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono ${
                      modelType === 'mlp' ? 'bg-accent text-black font-semibold' : 'bg-neutral-100 dark:bg-white/[0.05] text-neutral-500'
                    }`}
                  >
                    Deep MLP
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-neutral-500 dark:text-neutral-400">
                  <span>Training Epochs</span>
                  <span className="text-neutral-900 dark:text-white">{epochs}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="25"
                  value={epochs}
                  onChange={(e) => setEpochs(+e.target.value)}
                  className="w-full accent-accent cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-neutral-500 dark:text-neutral-400">
                  <span>Learning Rate (&alpha;)</span>
                  <span className="text-neutral-900 dark:text-white">{learningRate}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.2"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(+e.target.value)}
                  className="w-full accent-accent cursor-pointer"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <button
                type="button"
                onClick={handleTrain}
                disabled={isTraining}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent hover:bg-accent-hover text-black font-semibold text-xs tracking-tight transition-all duration-200 disabled:opacity-50 shadow-sm"
              >
                {isTraining ? <Brain className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                <span>{isTraining ? 'Training...' : 'Train Model'}</span>
              </button>

              <button
                type="button"
                onClick={handleSpawnTest}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-neutral-800 dark:text-neutral-200 font-medium text-xs tracking-tight transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Test Game Point</span>
              </button>
            </div>

          </div>

        </div>

      </div>
  );

  if (isEmbedded) {
    return content;
  }

  return (
    <section id="interactive-lab" className="py-24 sm:py-32 relative">
      {content}
      <div className="w-full h-[1px] bg-black/[0.06] dark:bg-white/[0.06] mt-24" />
    </section>
  );
};
