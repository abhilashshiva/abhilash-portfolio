import React, { useState } from 'react';
import { Database, Filter, Layers, Cpu, Play, CheckCircle2, ArrowRight } from 'lucide-react';

interface PipelineStep {
  id: string;
  number: string;
  title: string;
  sub: string;
  icon: React.ReactNode;
  detail: string;
  metric: string;
  metricLabel: string;
}

export const DataAnalyticsDashboard: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [processedCount, setProcessedCount] = useState<number>(1850000);

  const steps: PipelineStep[] = [
    {
      id: 'ingest',
      number: '01',
      title: 'Ingest',
      sub: 'Lakehouse',
      icon: <Database className="w-3.5 h-3.5" />,
      detail: 'Aggregates multi-source telemetry, raw event logs, and API streams into scalable columnar storage.',
      metric: '52,400 evt/s',
      metricLabel: 'Throughput',
    },
    {
      id: 'clean',
      number: '02',
      title: 'Cleanse',
      sub: 'Anomaly Filter',
      icon: <Filter className="w-3.5 h-3.5" />,
      detail: 'Automated statistical imputation, schema boundary verification, and outlier deduplication.',
      metric: '99.94% Clean',
      metricLabel: 'Data Integrity',
    },
    {
      id: 'vectorize',
      number: '03',
      title: 'Vectorize',
      sub: 'RAG & Embeddings',
      icon: <Layers className="w-3.5 h-3.5" />,
      detail: 'Extracts semantic tokens, builds high-dimensional dense embeddings, and indexes into vector stores.',
      metric: '8.4ms Search',
      metricLabel: 'Cosine Latency',
    },
    {
      id: 'inference',
      number: '04',
      title: 'Inference',
      sub: 'Production AI',
      icon: <Cpu className="w-3.5 h-3.5" />,
      detail: 'Orchestrates prompt guardrails, evaluates responses with LLM safety gates, and serves real-time insights.',
      metric: '1,850 tok/s',
      metricLabel: 'Serving Rate',
    },
  ];

  // Auto-run simulation sequence
  const handleRunPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    let stepIndex = 0;

    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setActiveStep(stepIndex);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setProcessedCount((prev) => prev + 75000);
      }
    }, 600);
  };

  const current = steps[activeStep];

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0c0d12]/95 backdrop-blur-xl shadow-xl overflow-hidden select-none transition-all">
      
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/10 dark:border-white/10 bg-neutral-100/60 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
            Data &amp; AI Pipeline Orchestrator
          </span>
        </div>

        <button
          type="button"
          onClick={handleRunPipeline}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium bg-accent hover:bg-accent-hover text-black transition-all active:scale-95 disabled:opacity-50 shadow-sm"
        >
          <Play className={`w-3 h-3 fill-current ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Executing...' : 'Run Pipeline'}</span>
        </button>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        
        {/* Streamlined Stepper Bar */}
        <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex flex-col items-center py-2 px-1 rounded-lg text-center transition-all ${
                  isActive
                    ? 'bg-white dark:bg-[#1c1e28] text-neutral-900 dark:text-white shadow-sm border border-black/5 dark:border-white/10 font-semibold scale-[1.02]'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <span className={`text-[9px] font-mono ${isActive ? 'text-emerald-600 dark:text-accent font-bold' : 'text-neutral-400'}`}>
                    {step.number}
                  </span>
                  <div className={`p-1 rounded ${isActive ? 'text-emerald-600 dark:text-accent' : ''}`}>
                    {step.icon}
                  </div>
                </div>
                <span className="text-[11px] font-medium tracking-tight truncate w-full">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
              {current.sub}
            </span>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-accent font-mono text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{current.metric}</span>
              <span className="text-[9px] text-neutral-400 font-normal font-sans">({current.metricLabel})</span>
            </div>
          </div>

          <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
            {current.detail}
          </p>
        </div>

        {/* Live Records Telemetry Counter */}
        <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500">
          <span>Processed Events:</span>
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            {processedCount.toLocaleString()} rows
          </span>
        </div>

      </div>

    </div>
  );
};
