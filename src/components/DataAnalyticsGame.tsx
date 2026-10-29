import React, { useState, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  ShieldCheck, 
  Trophy, 
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';

interface DataCell {
  id: string;
  field: string;
  value: string;
  isCorrupt: boolean;
  corruptType?: 'outlier' | 'null' | 'type' | 'vector';
  cleanValue: string;
  fixDescription: string;
}

interface DataAnalyticsGameProps {
  isEmbedded?: boolean;
}

// Extensive pool of data fields for procedural generation
const FIELD_TEMPLATES = [
  {
    field: 'Latency_ms',
    cleanGen: () => `${Math.floor(Math.random() * 30 + 8)}ms`,
    corruptGen: () => ({ value: `${Math.floor(Math.random() * 50000 + 40000)}ms`, type: 'outlier' as const, fix: 'Clipped latency to p99 threshold (45ms)' })
  },
  {
    field: 'User_Age',
    cleanGen: () => `${Math.floor(Math.random() * 45 + 18)}`,
    corruptGen: () => ({ value: `-${Math.floor(Math.random() * 50 + 10)}`, type: 'outlier' as const, fix: 'Imputed non-negative age using population median (28)' })
  },
  {
    field: 'Revenue_USD',
    cleanGen: () => `$${(Math.random() * 800 + 50).toFixed(2)}`,
    corruptGen: () => ({ value: `-$${(Math.random() * 4000 + 500).toFixed(2)}`, type: 'outlier' as const, fix: 'Purged inverted accounting ledger anomaly' })
  },
  {
    field: 'User_Email',
    cleanGen: () => `user_${Math.floor(Math.random() * 900 + 100)}@telemetry.io`,
    corruptGen: () => ({ value: 'NULL_POINTER', type: 'null' as const, fix: 'Imputed missing identifier with anonymous guest token' })
  },
  {
    field: 'Vector_Norm',
    cleanGen: () => '1.0000',
    corruptGen: () => ({ value: 'NaN', type: 'type' as const, fix: 'L2 Normalized embedding vector back to unit sphere' })
  },
  {
    field: 'Batch_Loss',
    cleanGen: () => `${(Math.random() * 0.3 + 0.05).toFixed(4)}`,
    corruptGen: () => ({ value: 'Infinity', type: 'type' as const, fix: 'Gradient clipped explosion and restored checkpoint' })
  },
  {
    field: 'Status',
    cleanGen: () => 'Active',
    corruptGen: () => ({ value: '[UNDEFINED]', type: 'null' as const, fix: 'Re-queried upstream service registry for state status' })
  },
  {
    field: 'Accuracy_P99',
    cleanGen: () => `${(Math.random() * 5 + 94).toFixed(1)}%`,
    corruptGen: () => ({ value: '9999.9%', type: 'outlier' as const, fix: 'Normalized probability distribution scale to [0, 100%]' })
  },
  {
    field: 'Session_Sec',
    cleanGen: () => `${Math.floor(Math.random() * 300 + 45)}s`,
    corruptGen: () => ({ value: 'NoneType', type: 'null' as const, fix: 'Backfilled session duration from access logs' })
  },
  {
    field: 'Country_Code',
    cleanGen: () => ['IN', 'US', 'DE', 'SG', 'GB'][Math.floor(Math.random() * 5)],
    corruptGen: () => ({ value: '0xDEADBEEF', type: 'type' as const, fix: 'Sanitized memory dump noise; resolved ISO geo IP' })
  },
  {
    field: 'Discount_Rate',
    cleanGen: () => `${Math.floor(Math.random() * 25 + 5)}%`,
    corruptGen: () => ({ value: '4500%', type: 'outlier' as const, fix: 'Enforced promo ceiling cap at 30%' })
  },
  {
    field: 'Embedding_Dim',
    cleanGen: () => '1536-d',
    corruptGen: () => ({ value: '0-d', type: 'vector' as const, fix: 'Re-projected text chunk through embedding model' })
  },
  {
    field: 'Cache_Hit_Rate',
    cleanGen: () => `${(Math.random() * 8 + 91).toFixed(1)}%`,
    corruptGen: () => ({ value: 'NULL', type: 'null' as const, fix: 'Recomputed cache telemetry from Redis cluster' })
  },
  {
    field: 'Token_Throughput',
    cleanGen: () => `${Math.floor(Math.random() * 800 + 400)} tok/s`,
    corruptGen: () => ({ value: '-120 tok/s', type: 'outlier' as const, fix: 'Corrected negative delta in streaming token counter' })
  }
];

export const DataAnalyticsGame: React.FC<DataAnalyticsGameProps> = () => {
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [cells, setCells] = useState<DataCell[]>([]);
  const [lastFix, setLastFix] = useState<string | null>(null);
  const [justCleanedId, setJustCleanedId] = useState<string | null>(null);
  const [roundsCompleted, setRoundsCompleted] = useState<number>(0);

  // Procedurally generate a brand-new randomized batch
  const generateNewBatch = useCallback((targetLevel: number = 1) => {
    // Determine how many corrupt items for this level (3 to 6)
    const corruptCount = Math.min(3 + targetLevel, 6);
    
    // Pick 12 random distinct templates
    const shuffledTemplates = [...FIELD_TEMPLATES].sort(() => Math.random() - 0.5).slice(0, 12);
    
    // Pick unique indices to corrupt
    const corruptIndices = new Set<number>();
    while (corruptIndices.size < corruptCount) {
      corruptIndices.add(Math.floor(Math.random() * 12));
    }

    const newCells: DataCell[] = shuffledTemplates.map((template, idx) => {
      const isCorrupt = corruptIndices.has(idx);
      const cleanVal = template.cleanGen();
      const id = `cell-${Date.now()}-${idx}-${Math.random()}`;

      if (isCorrupt) {
        const corruptObj = template.corruptGen();
        return {
          id,
          field: template.field,
          value: corruptObj.value,
          isCorrupt: true,
          corruptType: corruptObj.type,
          cleanValue: cleanVal,
          fixDescription: corruptObj.fix,
        };
      }

      return {
        id,
        field: template.field,
        value: cleanVal,
        isCorrupt: false,
        cleanValue: cleanVal,
        fixDescription: 'Already Validated',
      };
    });

    setCells(newCells);
    setJustCleanedId(null);
    setLastFix(null);
  }, []);

  // Initialize on first render
  useEffect(() => {
    generateNewBatch(1);
  }, [generateNewBatch]);

  // Clean a corrupt cell
  const handleCleanCell = (cell: DataCell) => {
    if (!cell.isCorrupt) return;

    const streakMultiplier = 1 + Math.min(streak * 0.25, 2.0);
    const addedPoints = Math.round(50 * streakMultiplier);

    setCells((prev) =>
      prev.map((c) =>
        c.id === cell.id
          ? { ...c, isCorrupt: false, value: c.cleanValue }
          : c
      )
    );

    setJustCleanedId(cell.id);
    setTimeout(() => setJustCleanedId(null), 700);

    setScore((s) => s + addedPoints);
    setStreak((st) => st + 1);
    setLastFix(`✓ ${cell.field}: ${cell.fixDescription} (+${addedPoints} pts)`);

    // Check if that was the last corrupt cell in the batch
    const remainingAfterThis = cells.filter((c) => c.isCorrupt && c.id !== cell.id).length;
    if (remainingAfterThis === 0) {
      setRoundsCompleted((r) => r + 1);
      setScore((s) => s + 150); // Batch bonus!
      setLastFix(`🎉 Batch 100% Validated! Level Bonus: +150 pts`);
    }
  };

  // Instant Auto-Clean sweep
  const handleAutoClean = () => {
    const corruptRemaining = cells.filter((c) => c.isCorrupt);
    if (corruptRemaining.length === 0) return;

    setCells((prev) =>
      prev.map((c) =>
        c.isCorrupt
          ? { ...c, isCorrupt: false, value: c.cleanValue }
          : c
      )
    );

    setScore((s) => s + corruptRemaining.length * 30);
    setStreak(0);
    setRoundsCompleted((r) => r + 1);
    setLastFix(`⚡ Auto-Clean Engine processed ${corruptRemaining.length} records.`);
  };

  // Next Round / Level Up
  const handleNextBatch = () => {
    const nextLevel = level >= 4 ? 1 : level + 1;
    setLevel(nextLevel);
    generateNewBatch(nextLevel);
  };

  // Reset entire game
  const handleReset = () => {
    setLevel(1);
    setScore(0);
    setStreak(0);
    setRoundsCompleted(0);
    generateNewBatch(1);
  };

  const corruptCount = cells.filter((c) => c.isCorrupt).length;
  const cleanliness = cells.length > 0 
    ? Math.round(((cells.length - corruptCount) / cells.length) * 100) 
    : 100;

  const levelTitles: Record<number, string> = {
    1: 'Raw Lakehouse Ingestion',
    2: 'Feature Store Cleaning',
    3: 'Vector Embedding Hygiene',
    4: 'Production Inference Pipeline',
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0c0d12]/95 backdrop-blur-xl shadow-2xl overflow-hidden select-none transition-all">
      
      {/* Top Header & Gamified HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-800 dark:text-accent">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                Data Quality & Anomaly Sorter
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-emerald-800 dark:text-accent font-mono font-medium">
                Level {level}: {levelTitles[level]}
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 font-mono hidden sm:block">
              Click red anomalous cells to execute targeted data imputation & hygiene
            </p>
          </div>
        </div>

        {/* Live Metrics & Combo Multipliers */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">Integrity:</span>
            <span className="font-semibold text-emerald-600 dark:text-accent">{cleanliness}%</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full border border-black/5 dark:border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-neutral-900 dark:text-white font-bold">{score} pts</span>
          </div>

          {streak > 1 && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 text-[10px] font-bold animate-pulse">
              <Flame className="w-3 h-3 fill-current" />
              <span>{streak}x Combo</span>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Diagnostics Log Bar */}
      {lastFix && (
        <div className="px-5 py-2 bg-emerald-500/[0.08] dark:bg-accent/[0.08] border-b border-emerald-500/15 dark:border-accent/15 text-xs font-mono text-emerald-800 dark:text-accent flex items-center justify-between animate-fade-in">
          <span>{lastFix}</span>
          <span className="text-[10px] text-neutral-400">Telemetry Logged</span>
        </div>
      )}

      {/* Procedurally Generated 12-Card Grid */}
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {cells.map((cell) => {
            const isJustCleaned = justCleanedId === cell.id;

            return (
              <button
                key={cell.id}
                type="button"
                onClick={() => handleCleanCell(cell)}
                disabled={!cell.isCorrupt}
                className={`flex flex-col justify-between p-3 rounded-xl border text-left transition-all duration-300 relative overflow-hidden ${
                  cell.isCorrupt
                    ? 'bg-rose-500/10 border-rose-500/40 hover:border-rose-500 hover:bg-rose-500/20 cursor-pointer shadow-sm hover:scale-[1.02]'
                    : isJustCleaned
                    ? 'bg-accent/25 border-accent scale-105 shadow-md'
                    : 'bg-black/5 dark:bg-white/[0.03] border-black/5 dark:border-white/5 cursor-default'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-mono text-neutral-500 truncate max-w-[80px]">
                    {cell.field}
                  </span>
                  {cell.isCorrupt ? (
                    <span className="flex items-center gap-1">
                      <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-rose-500/20 text-rose-500 font-bold">
                        {cell.corruptType}
                      </span>
                      <AlertCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 animate-bounce" />
                    </span>
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-accent flex-shrink-0" />
                  )}
                </div>

                <div className="font-mono text-xs sm:text-sm font-semibold truncate my-1">
                  {cell.isCorrupt ? (
                    <span className="text-rose-500 font-bold">{cell.value}</span>
                  ) : (
                    <span className="text-neutral-800 dark:text-neutral-200">{cell.value}</span>
                  )}
                </div>

                {cell.isCorrupt ? (
                  <span className="text-[9px] font-mono uppercase text-rose-400 mt-0.5 tracking-wider font-semibold">
                    Click to Clean
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-emerald-600/70 dark:text-accent/70 mt-0.5">
                    Valid Record
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-black/10 dark:border-white/10 bg-neutral-100/50 dark:bg-white/[0.01]">
        <div className="flex items-center gap-3 text-xs font-mono">
          {corruptCount > 0 ? (
            <span className="text-rose-500 font-medium flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              {corruptCount} anomaly record(s) remaining
            </span>
          ) : (
            <span className="text-emerald-600 dark:text-accent font-medium flex items-center gap-1.5">
              <Award className="w-4 h-4 text-accent" />
              Batch Cleansed! Ready for ML Pipeline
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {corruptCount === 0 ? (
            <button
              type="button"
              onClick={handleNextBatch}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-accent hover:bg-accent-hover text-black shadow-sm transition-all active:scale-95 animate-pulse"
            >
              <span>Next Batch (Level {level < 4 ? level + 1 : 1})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAutoClean}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-accent/20 hover:bg-accent/30 text-emerald-800 dark:text-accent border border-accent/30 transition-all active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Auto-Clean All</span>
                <span className="sm:hidden">Clean All</span>
              </button>

              <button
                type="button"
                onClick={() => generateNewBatch(level)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 transition-all active:scale-95"
                title="Generate completely new randomized batch"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Random Batch</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 transition-all active:scale-95"
            title="Reset Game"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

    </div>
  );
};
