import React, { useState, useEffect } from 'react';
import { Database, Filter, Cpu, Rocket, Play, CheckCircle2, ArrowRight } from 'lucide-react';

interface PipelineStep {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  detail: string;
  metric: string;
}

export const DataAnalyticsDashboard: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [processedCount, setProcessedCount] = useState<number>(1420000);

  const steps: PipelineStep[] = [
    {
      id: 'ingest',
      name: '1. Ingest',
      category: 'Data Sources',
      icon: <Database className="w-4 h-4" />,
      detail: 'Aggregates raw telemetry, CSVs, and API events into BigQuery storage.',
      metric: 'Throughput: 45k events/sec',
    },
    {
      id: 'clean',
      name: '2. Clean',
      category: 'Quality Engine',
      icon: <Filter className="w-4 h-4" />,
      detail: 'Automatically removes nulls, deduplicates, and filters statistical anomalies.',
      metric: 'Data Quality: 99.8% Clean',
    },
    {
      id: 'model',
      name: '3. Model',
      category: 'Machine Learning',
      icon: <Cpu className="w-4 h-4" />,
      detail: 'Generates high-dimensional vector embeddings and trains predictive estimators.',
      metric: 'Inference Latency: 14ms',
    },
    {
      id: 'deploy',
      name: '4. Deploy',
      category: 'Production AI',
      icon: <Rocket className="w-4 h-4" />,
      detail: 'Serves real-time decision APIs and automated intelligence to client apps.',
      metric: 'Uptime: 99.98% Reliable',
    },
  ];

  // Auto-run simulation sequence when user hits "Run Pipeline"
  const handleRunPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    let current = 0;

    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setActiveStep(current);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setProcessedCount((prev) => prev + 50000);
      }
    }, 550);
  };

  const current = steps[activeStep];

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#0c0d12]/90 backdrop-blur-xl shadow-xl overflow-hidden select-none transition-all">
      
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/10 dark:border-white/10 bg-neutral-100/60 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            Interactive Data Pipeline
          </span>
        </div>

        <button
          type="button"
          onClick={handleRunPipeline}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-accent hover:bg-accent-hover text-black transition-all active:scale-95 disabled:opacity-50 shadow-sm"
        >
          <Play className={`w-3 h-3 fill-current ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Processing...' : 'Run Pipeline'}</span>
        </button>
      </div>

      {/* 4 Interactive Pipeline Stages */}
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex flex-col items-center gap-1.5 p-2 sm:p-2.5 rounded-xl border text-center transition-all ${
                  isActive
                    ? 'bg-accent/15 border-accent text-emerald-800 dark:text-accent shadow-sm scale-[1.02]'
                    : 'bg-black/5 dark:bg-white/[0.03] border-black/5 dark:border-white/5 text-neutral-500 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/[0.06]'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-accent text-black' : 'bg-black/5 dark:bg-white/5'}`}>
                  {step.icon}
                </div>
                <span className="text-[11px] font-semibold tracking-tight">{step.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-neutral-500 uppercase tracking-wider">{current.category}</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-accent font-semibold font-mono text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{current.metric}</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
            {current.detail}
          </p>
        </div>

        {/* Simple Live Metric Counter */}
        <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500">
          <span>Total Records Processed:</span>
          <span className="font-semibold text-neutral-900 dark:text-white">
            {processedCount.toLocaleString()} rows
          </span>
        </div>
      </div>

    </div>
  );
};
