import React, { useState } from 'react';
import { Brain, Activity, Sparkles, Layers } from 'lucide-react';
import { NeuralPlayground } from './NeuralPlayground';
import { AnomalyHunter } from './AnomalyHunter';

type ActiveGame = 'neural' | 'anomaly';

export const InteractivePlayground: React.FC = () => {
  const [activeGame, setActiveGame] = useState<ActiveGame>('neural');

  return (
    <section id="interactive-lab" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            03 / Interactive Lab
          </span>
          <div className="h-[1px] flex-1 bg-black/[0.06] dark:bg-white/[0.06]" />
        </div>

        {/* Section Intro & Option Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-[#F5F3EE]">
              Let's Play with Data &amp; Accuracy
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-3 font-sans">
              Hands-on machine learning &amp; streaming engineering simulations. Switch between interactive experiments below to train neural decision boundaries or test real-time anomaly filtering.
            </p>
          </div>

          {/* Unified Game Option Switcher */}
          <div className="self-start lg:self-auto flex items-center p-1.5 rounded-2xl bg-neutral-100 dark:bg-[#141414] border border-black/10 dark:border-white/10 shadow-sm backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveGame('neural')}
              className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeGame === 'neural'
                  ? 'bg-white dark:bg-[#202020] text-neutral-900 dark:text-white shadow-sm border border-black/5 dark:border-white/10 font-semibold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Brain className={`w-4 h-4 transition-colors ${activeGame === 'neural' ? 'text-accent' : ''}`} />
              <span>Accuracy Sandbox</span>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-emerald-700 dark:text-accent font-mono font-normal">
                ML Model
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveGame('anomaly')}
              className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeGame === 'anomaly'
                  ? 'bg-white dark:bg-[#202020] text-neutral-900 dark:text-white shadow-sm border border-black/5 dark:border-white/10 font-semibold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Activity className={`w-4 h-4 transition-colors ${activeGame === 'anomaly' ? 'text-amber-500' : ''}`} />
              <span>DataStream Hunter</span>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 font-mono font-normal">
                Streaming
              </span>
            </button>
          </div>
        </div>

        {/* Active Game Canvas Container with Smooth Transition */}
        <div className="relative transition-all duration-300">
          {activeGame === 'neural' ? (
            <div className="animate-fade-in">
              <NeuralPlayground isEmbedded={true} />
            </div>
          ) : (
            <div className="animate-fade-in">
              <AnomalyHunter isEmbedded={true} />
            </div>
          )}
        </div>

      </div>

      {/* Thin Horizontal Separator */}
      <div className="w-full h-[1px] bg-black/[0.06] dark:bg-white/[0.06] mt-24" />
    </section>
  );
};
