import React, { useState } from 'react';
import { BarChart2, Activity, Cpu } from 'lucide-react';
import { DataAnalyticsGame } from './DataAnalyticsGame';
import { AnomalyHunter } from './AnomalyHunter';
import { GenAILabGame } from './GenAILabGame';

type ActiveGame = 'analytics' | 'streaming' | 'genai';

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

        {/* Section Intro - Clean & Editorial */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 dark:text-[#F5F3EE]">
            Data &amp; AI Engineering Arena
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 font-sans leading-relaxed">
            Hands-on technical simulations evaluating automated data hygiene, real-time telemetry streaming, and enterprise GenAI guardrail evaluation.
          </p>
        </div>

        {/* Centered Game Option Switcher */}
        <div className="flex justify-center items-center mb-10">
          <div className="flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-neutral-100 dark:bg-[#121319] border border-black/10 dark:border-white/10 shadow-lg backdrop-blur-md gap-1">
            
            {/* 1. Data Cleaner */}
            <button
              type="button"
              onClick={() => setActiveGame('analytics')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeGame === 'analytics'
                  ? 'bg-white dark:bg-[#1e2029] text-neutral-900 dark:text-white shadow-md border border-black/5 dark:border-white/10 font-semibold scale-[1.02]'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <BarChart2 className={`w-3.5 h-3.5 transition-colors ${activeGame === 'analytics' ? 'text-emerald-500 dark:text-accent' : ''}`} />
              <span>Data Cleaner</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-accent/20 text-emerald-800 dark:text-accent font-mono font-medium">
                Analytics
              </span>
            </button>

            {/* 2. DataStream Hunter */}
            <button
              type="button"
              onClick={() => setActiveGame('streaming')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeGame === 'streaming'
                  ? 'bg-white dark:bg-[#1e2029] text-neutral-900 dark:text-white shadow-md border border-black/5 dark:border-white/10 font-semibold scale-[1.02]'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Activity className={`w-3.5 h-3.5 transition-colors ${activeGame === 'streaming' ? 'text-amber-500' : ''}`} />
              <span>DataStream Hunter</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/15 text-amber-500 font-mono font-medium">
                Streaming
              </span>
            </button>

            {/* 3. GenAI Guardrails */}
            <button
              type="button"
              onClick={() => setActiveGame('genai')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeGame === 'genai'
                  ? 'bg-white dark:bg-[#1e2029] text-neutral-900 dark:text-white shadow-md border border-black/5 dark:border-white/10 font-semibold scale-[1.02]'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Cpu className={`w-3.5 h-3.5 transition-colors ${activeGame === 'genai' ? 'text-purple-400' : ''}`} />
              <span>GenAI Guardrails</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 font-mono font-medium">
                LLM / AI
              </span>
            </button>

          </div>
        </div>

        {/* Active Game Canvas Container */}
        <div className="relative transition-all duration-300">
          {activeGame === 'analytics' && (
            <div className="animate-fade-in">
              <DataAnalyticsGame isEmbedded={true} />
            </div>
          )}

          {activeGame === 'streaming' && (
            <div className="animate-fade-in">
              <AnomalyHunter isEmbedded={true} />
            </div>
          )}

          {activeGame === 'genai' && (
            <div className="animate-fade-in">
              <GenAILabGame />
            </div>
          )}
        </div>

      </div>

      {/* Thin Horizontal Separator */}
      <div className="w-full h-[1px] bg-black/[0.06] dark:bg-white/[0.06] mt-20" />
    </section>
  );
};
