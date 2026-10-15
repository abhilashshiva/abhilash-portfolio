import React, { useState } from 'react';
import { BarChart2, Activity } from 'lucide-react';
import { DataAnalyticsGame } from './DataAnalyticsGame';
import { AnomalyHunter } from './AnomalyHunter';

type ActiveGame = 'analytics' | 'streaming';

export const InteractivePlayground: React.FC = () => {
  const [activeGame, setActiveGame] = useState<ActiveGame>('analytics');

  return (
    <section id="interactive-lab" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            03 / Interactive Lab
          </span>
          <div className="h-[1px] flex-1 bg-black/[0.06] dark:bg-white/[0.06]" />
        </div>

        {/* Section Intro & Option Switcher (Concise, Reorganized & Streamlined) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 dark:text-[#F5F3EE]">
              Data &amp; Analytics Playground
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 font-sans">
              Interactive simulations exploring automated data cleaning, anomaly detection, and real-time streaming pipeline diagnostics.
            </p>
          </div>

          {/* Unified Game Option Switcher */}
          <div className="self-start sm:self-auto flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-[#141414] border border-black/10 dark:border-white/10 shadow-sm backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveGame('analytics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeGame === 'analytics'
                  ? 'bg-white dark:bg-[#202020] text-neutral-900 dark:text-white shadow-sm border border-black/5 dark:border-white/10 font-semibold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <BarChart2 className={`w-3.5 h-3.5 transition-colors ${activeGame === 'analytics' ? 'text-accent' : ''}`} />
              <span>Data Cleaner</span>
              <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 rounded-full bg-accent/15 text-emerald-700 dark:text-accent font-mono font-normal">
                Analytics
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveGame('streaming')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeGame === 'streaming'
                  ? 'bg-white dark:bg-[#202020] text-neutral-900 dark:text-white shadow-sm border border-black/5 dark:border-white/10 font-semibold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Activity className={`w-3.5 h-3.5 transition-colors ${activeGame === 'streaming' ? 'text-amber-500' : ''}`} />
              <span>DataStream Hunter</span>
              <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/15 text-amber-500 font-mono font-normal">
                Streaming
              </span>
            </button>
          </div>
        </div>

        {/* Active Game Canvas Container */}
        <div className="relative transition-all duration-300">
          {activeGame === 'analytics' ? (
            <div className="animate-fade-in">
              <DataAnalyticsGame isEmbedded={true} />
            </div>
          ) : (
            <div className="animate-fade-in">
              <AnomalyHunter isEmbedded={true} />
            </div>
          )}
        </div>

      </div>

      {/* Thin Horizontal Separator */}
      <div className="w-full h-[1px] bg-black/[0.06] dark:bg-white/[0.06] mt-20" />
    </section>
  );
};
