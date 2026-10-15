import React, { useState } from 'react';
import { Terminal, Database, Cpu, CheckCircle2, Play, Sparkles, Layers } from 'lucide-react';

type TabType = 'pipeline' | 'inference' | 'architecture';

export const HeroConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('pipeline');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionCount, setExecutionCount] = useState<number>(1);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setExecutionCount(prev => prev + 1);
    }, 900);
  };

  const tabs: { id: TabType; name: string; icon: React.ReactNode }[] = [
    { id: 'pipeline', name: 'data_pipeline.py', icon: <Database className="w-3.5 h-3.5 text-accent" /> },
    { id: 'inference', name: 'model_inference.py', icon: <Cpu className="w-3.5 h-3.5 text-accent" /> },
    { id: 'architecture', name: 'system_spec.json', icon: <Layers className="w-3.5 h-3.5 text-accent" /> },
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#0c0d12]/90 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 select-none">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10 bg-neutral-100/80 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
            abhilash@ai-systems:~
          </span>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-accent font-medium">
            Telemetry: Optimal
          </span>
        </div>
      </div>

      {/* Code Editor Tab Navigation */}
      <div className="flex items-center justify-between px-2 pt-2 border-b border-black/5 dark:border-white/5 bg-neutral-50 dark:bg-[#0a0a0f]">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg font-mono text-xs transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#0c0d12] text-neutral-900 dark:text-[#F5F3EE] border-t border-x border-black/10 dark:border-white/10 font-medium'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Run / Simulate Execution Button */}
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-2.5 py-1 mb-1 mr-1 rounded-md text-[11px] font-mono bg-accent/15 hover:bg-accent/25 text-emerald-800 dark:text-accent border border-accent/20 transition-all active:scale-95 disabled:opacity-50"
          title="Simulate pipeline execution"
        >
          <Play className={`w-3 h-3 fill-current ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Running...' : 'Run'}</span>
        </button>
      </div>

      {/* Terminal Code Body */}
      <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto min-h-[220px] bg-white/50 dark:bg-[#0c0d12]/60">
        {activeTab === 'pipeline' && (
          <div className="space-y-1.5 text-neutral-700 dark:text-neutral-300">
            <p className="text-neutral-400 dark:text-neutral-500 italic"># High-throughput data preprocessing & feature pipeline</p>
            <p>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">from</span> enterprise_data{' '}
              <span className="text-purple-600 dark:text-purple-400 font-semibold">import</span> StreamEngine, Deduplicator
            </p>
            <p className="pt-1">
              <span className="text-blue-600 dark:text-sky-400">stream</span> = StreamEngine(batch_size=
              <span className="text-amber-600 dark:text-amber-400">10000</span>)
            </p>
            <p>
              <span className="text-blue-600 dark:text-sky-400">clean_data</span> = stream.apply_transformations(
            </p>
            <p className="pl-4">
              null_policy=<span className="text-emerald-700 dark:text-accent">"impute_knn"</span>,
            </p>
            <p className="pl-4">
              schema_validation=<span className="text-emerald-700 dark:text-accent">"strict"</span>,
            </p>
            <p className="pl-4">
              anomaly_filter=<span className="text-emerald-700 dark:text-accent">"isolation_forest"</span>
            </p>
            <p>)</p>
            <p className="pt-1 text-emerald-600 dark:text-accent flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 inline" />
              <span>Processed {1.2 * executionCount}M records with 0 schema violations.</span>
            </p>
          </div>
        )}

        {activeTab === 'inference' && (
          <div className="space-y-1.5 text-neutral-700 dark:text-neutral-300">
            <p className="text-neutral-400 dark:text-neutral-500 italic"># Autonomous model inference & deterministic verification</p>
            <p>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">import</span> torch, guardrails
            </p>
            <p className="pt-1">
              <span className="text-blue-600 dark:text-sky-400">model</span> = load_tuned_model(
              <span className="text-emerald-700 dark:text-accent">"abhilash/prod-v2"</span>)
            </p>
            <p>
              <span className="text-blue-600 dark:text-sky-400">prediction</span> = model.predict(
            </p>
            <p className="pl-4">
              context_vectors=<span className="text-blue-600 dark:text-sky-400">indexed_embeddings</span>,
            </p>
            <p className="pl-4">
              temperature=<span className="text-amber-600 dark:text-amber-400">0.2</span>,
            </p>
            <p className="pl-4">
              guardrails=<span className="text-purple-600 dark:text-purple-400">True</span>
            </p>
            <p>)</p>
            <p className="pt-1 text-emerald-600 dark:text-accent flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 inline" />
              <span>Inference latency: 22ms &bull; Confidence: 98.4%</span>
            </p>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-1 text-neutral-700 dark:text-neutral-300 font-mono text-[11px]">
            <p className="text-neutral-400 dark:text-neutral-500">{"{"}</p>
            <p className="pl-4">
              <span className="text-blue-600 dark:text-sky-400">"role"</span>: <span className="text-emerald-700 dark:text-accent">"Data & AI Systems Engineer"</span>,
            </p>
            <p className="pl-4">
              <span className="text-blue-600 dark:text-sky-400">"core_stack"</span>: [
              <span className="text-emerald-700 dark:text-accent">"Python"</span>,{' '}
              <span className="text-emerald-700 dark:text-accent">"PyTorch"</span>,{' '}
              <span className="text-emerald-700 dark:text-accent">"Google Cloud"</span>,{' '}
              <span className="text-emerald-700 dark:text-accent">"Docker"</span>,{' '}
              <span className="text-emerald-700 dark:text-accent">"FastAPI"</span>],
            </p>
            <p className="pl-4">
              <span className="text-blue-600 dark:text-sky-400">"capabilities"</span>: [
              <span className="text-emerald-700 dark:text-accent">"Data Cleaning"</span>,{' '}
              <span className="text-emerald-700 dark:text-accent">"ML Pipelines"</span>,{' '}
              <span className="text-emerald-700 dark:text-accent">"LLM Workflows"</span>],
            </p>
            <p className="pl-4">
              <span className="text-blue-600 dark:text-sky-400">"production_uptime"</span>: <span className="text-amber-600 dark:text-amber-400">"99.98%"</span>
            </p>
            <p className="text-neutral-400 dark:text-neutral-500">{"}"}</p>
          </div>
        )}
      </div>

      {/* Live System Metrics Footer */}
      <div className="grid grid-cols-3 divide-x divide-black/10 dark:divide-white/10 border-t border-black/10 dark:border-white/10 bg-neutral-100/60 dark:bg-white/[0.02] text-center py-2.5 px-2">
        <div>
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Scale</p>
          <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">1.2M+ Rows</p>
        </div>
        <div>
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Latency</p>
          <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-accent">22ms avg</p>
        </div>
        <div>
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Status</p>
          <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">Production</p>
        </div>
      </div>
    </div>
  );
};
