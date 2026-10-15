import React, { useState } from 'react';
import { Sparkles, RotateCcw, CheckCircle2, AlertCircle, Zap, ShieldCheck } from 'lucide-react';

interface DataCell {
  id: number;
  field: string;
  value: string;
  isCorrupt: boolean;
  corruptType?: 'outlier' | 'null' | 'type';
}

interface DataAnalyticsGameProps {
  isEmbedded?: boolean;
}

export const DataAnalyticsGame: React.FC<DataAnalyticsGameProps> = () => {
  const initialData: DataCell[] = [
    { id: 1, field: 'User_Age', value: '28', isCorrupt: false },
    { id: 2, field: 'Price_USD', value: '-$950.00', isCorrupt: true, corruptType: 'outlier' },
    { id: 3, field: 'Status', value: 'Active', isCorrupt: false },
    { id: 4, field: 'Latency_ms', value: '18ms', isCorrupt: false },
    { id: 5, field: 'User_Email', value: 'NULL', isCorrupt: true, corruptType: 'null' },
    { id: 6, field: 'Sessions', value: '142', isCorrupt: false },
    { id: 7, field: 'Revenue', value: '$4,280.00', isCorrupt: false },
    { id: 8, field: 'Timestamp', value: 'NaN', isCorrupt: true, corruptType: 'type' },
    { id: 9, field: 'Country', value: 'IN', isCorrupt: false },
    { id: 10, field: 'Retention', value: '94.2%', isCorrupt: false },
    { id: 11, field: 'Discount', value: '9999%', isCorrupt: true, corruptType: 'outlier' },
    { id: 12, field: 'Score', value: '0.96', isCorrupt: false },
  ];

  const [cells, setCells] = useState<DataCell[]>(initialData);
  const [score, setScore] = useState<number>(0);
  const [cleanedCount, setCleanedCount] = useState<number>(0);
  const [justCleanedId, setJustCleanedId] = useState<number | null>(null);

  const cleanValues: Record<string, string> = {
    'Price_USD': '$45.00',
    'User_Email': 'user@domain.com',
    'Timestamp': '2026-10-15',
    'Discount': '15.0%',
  };

  // Click on a corrupt cell to clean it
  const handleCleanCell = (cell: DataCell) => {
    if (!cell.isCorrupt) return;

    setCells((prev) =>
      prev.map((c) =>
        c.id === cell.id
          ? { ...c, isCorrupt: false, value: cleanValues[c.field] || 'Clean' }
          : c
      )
    );

    setJustCleanedId(cell.id);
    setTimeout(() => setJustCleanedId(null), 600);

    setScore((s) => s + 50);
    setCleanedCount((c) => c + 1);
  };

  // Instant Auto-Clean sweep
  const handleAutoClean = () => {
    setCells((prev) =>
      prev.map((c) =>
        c.isCorrupt
          ? { ...c, isCorrupt: false, value: cleanValues[c.field] || 'Clean' }
          : c
      )
    );
    const corruptRemaining = cells.filter((c) => c.isCorrupt).length;
    setScore((s) => s + corruptRemaining * 40);
    setCleanedCount((c) => c + corruptRemaining);
  };

  // Reset back to initial dirty dataset
  const handleReset = () => {
    setCells(initialData);
    setJustCleanedId(null);
  };

  const corruptCount = cells.filter((c) => c.isCorrupt).length;
  const cleanliness = Math.round(((cells.length - corruptCount) / cells.length) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#0E0F14]/90 backdrop-blur-xl shadow-xl overflow-hidden select-none">
      
      {/* Top Header & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-black/10 dark:border-white/10 bg-neutral-100/60 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-accent" />
          <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
            Data Quality Inspector
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-emerald-800 dark:text-accent font-mono font-medium">
            Click red cards to clean
          </span>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">Quality:</span>
            <span className="font-semibold text-emerald-600 dark:text-accent">{cleanliness}%</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full border border-black/5 dark:border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-neutral-900 dark:text-white font-bold">{score} pts</span>
          </div>
        </div>
      </div>

      {/* Interactive 12-Card Data Grid */}
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
                className={`flex flex-col justify-between p-3 rounded-xl border text-left transition-all duration-300 ${
                  cell.isCorrupt
                    ? 'bg-rose-500/10 border-rose-500/30 hover:border-rose-500 hover:bg-rose-500/20 cursor-pointer animate-pulse'
                    : isJustCleaned
                    ? 'bg-accent/25 border-accent scale-105'
                    : 'bg-black/5 dark:bg-white/[0.03] border-black/5 dark:border-white/5 cursor-default'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-mono text-neutral-500">{cell.field}</span>
                  {cell.isCorrupt ? (
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-accent flex-shrink-0" />
                  )}
                </div>

                <div className="font-mono text-xs sm:text-sm font-semibold truncate">
                  {cell.isCorrupt ? (
                    <span className="text-rose-500">{cell.value}</span>
                  ) : (
                    <span className="text-neutral-800 dark:text-neutral-200">{cell.value}</span>
                  )}
                </div>

                {cell.isCorrupt && (
                  <span className="text-[9px] font-mono uppercase text-rose-400 mt-1">
                    Click to fix
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-black/10 dark:border-white/10 bg-neutral-100/50 dark:bg-white/[0.01]">
        <span className="text-xs font-mono text-neutral-500">
          {corruptCount > 0 ? (
            <span className="text-rose-500 font-medium">{corruptCount} corrupt record(s) remaining</span>
          ) : (
            <span className="text-emerald-600 dark:text-accent font-medium">✓ Dataset 100% clean &amp; validated</span>
          )}
        </span>

        <div className="flex items-center gap-2">
          {corruptCount > 0 && (
            <button
              type="button"
              onClick={handleAutoClean}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-accent/20 hover:bg-accent/30 text-emerald-800 dark:text-accent border border-accent/30 transition-all active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Auto-Clean All</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

    </div>
  );
};
