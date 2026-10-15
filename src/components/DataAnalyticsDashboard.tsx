import React, { useState } from 'react';
import { BarChart3, TrendingUp, CheckCircle, RefreshCw, Filter, Layers, Database, ShieldCheck } from 'lucide-react';

type DashboardView = 'throughput' | 'quality' | 'distribution';

export const DataAnalyticsDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<DashboardView>('throughput');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshCount, setRefreshCount] = useState(1);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshCount(prev => prev + 1);
    }, 800);
  };

  // Dynamic sample data points based on refresh count
  const streamData = [
    { label: '08:00', value: 38 + (refreshCount % 5) * 4, height: '48%' },
    { label: '10:00', value: 52 + (refreshCount % 3) * 6, height: '62%' },
    { label: '12:00', value: 78 + (refreshCount % 4) * 5, height: '84%' },
    { label: '14:00', value: 64 + (refreshCount % 2) * 8, height: '70%' },
    { label: '16:00', value: 89 + (refreshCount % 3) * 3, height: '94%' },
    { label: '18:00', value: 72 + (refreshCount % 5) * 4, height: '78%' },
    { label: '20:00', value: 94 + (refreshCount % 2) * 5, height: '98%' },
  ];

  const totalRecords = (1.42 + refreshCount * 0.05).toFixed(2);

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white/85 dark:bg-[#0c0d12]/90 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 select-none">
      
      {/* Dashboard Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-accent/20 border border-accent/30 text-emerald-700 dark:text-accent">
            <BarChart3 className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
              Data Analytics &amp; Pipeline Telemetry
            </h2>
            <p className="text-[10px] font-mono text-neutral-500">Live Ingestion &bull; Quality Auditing</p>
          </div>
        </div>

        {/* Live Status Pulse */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-accent font-medium">
            Active Stream
          </span>
        </div>
      </div>

      {/* Top Metric Highlight Cards */}
      <div className="grid grid-cols-3 gap-2 p-3 sm:p-4 border-b border-black/5 dark:border-white/5 bg-neutral-50/50 dark:bg-black/20">
        <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between text-neutral-400 text-[10px] font-mono">
            <span>VOLUME</span>
            <Database className="w-3 h-3 text-neutral-400" />
          </div>
          <p className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white mt-1">
            {totalRecords}M <span className="text-[10px] text-neutral-400 font-normal">rows</span>
          </p>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-accent font-medium mt-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% velocity</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between text-neutral-400 text-[10px] font-mono">
            <span>CLEANLINESS</span>
            <ShieldCheck className="w-3 h-3 text-accent" />
          </div>
          <p className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-accent mt-1">
            99.8%
          </p>
          <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
            0 schema drifts
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between text-neutral-400 text-[10px] font-mono">
            <span>LATENCY</span>
            <span className="text-[10px] text-emerald-500 font-mono">p99</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white mt-1">
            14ms
          </p>
          <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
            Real-time ETL
          </p>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center justify-between px-3 sm:px-4 pt-2.5 pb-2 border-b border-black/5 dark:border-white/5 bg-neutral-100/40 dark:bg-white/[0.01]">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveView('throughput')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
              activeView === 'throughput'
                ? 'bg-neutral-900 text-white dark:bg-accent dark:text-black font-semibold shadow-sm'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Throughput Trend
          </button>

          <button
            type="button"
            onClick={() => setActiveView('quality')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
              activeView === 'quality'
                ? 'bg-neutral-900 text-white dark:bg-accent dark:text-black font-semibold shadow-sm'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Quality Audit
          </button>

          <button
            type="button"
            onClick={() => setActiveView('distribution')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
              activeView === 'distribution'
                ? 'bg-neutral-900 text-white dark:bg-accent dark:text-black font-semibold shadow-sm'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Distribution
          </button>
        </div>

        {/* Live Refresh Simulator */}
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 border border-black/10 dark:border-white/10 transition-all active:scale-95 disabled:opacity-50"
          title="Refresh stream calculation"
        >
          <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-accent' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Main Visual Display Body */}
      <div className="p-4 sm:p-5 min-h-[175px] flex flex-col justify-center">
        {/* 1. Throughput Trend Chart View */}
        {activeView === 'throughput' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Ingested Data Rate (k-records / hour)</span>
              <span className="text-emerald-700 dark:text-accent font-medium">Peak: 98k/h</span>
            </div>

            {/* Visual Bar Chart with Glow & Hover States */}
            <div className="h-28 flex items-end justify-between gap-2 pt-3 pb-1 border-b border-black/10 dark:border-white/10">
              {streamData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[9px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.value}k
                  </span>
                  <div 
                    className="w-full max-w-[32px] rounded-t-md bg-gradient-to-t from-emerald-600/40 via-accent/70 to-accent transition-all duration-500 group-hover:brightness-125"
                    style={{ height: d.height }}
                  />
                  <span className="text-[10px] font-mono text-neutral-500 mt-1">
                    {d.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Quality Audit Breakdown View */}
        {activeView === 'quality' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-1">
              <span>Automated Data Cleaning Checks</span>
              <span className="text-emerald-700 dark:text-accent font-medium">Status: Passed</span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    Null &amp; Missing Value Imputation
                  </span>
                  <span className="text-emerald-600 dark:text-accent font-semibold">100.0%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    Outlier &amp; Anomaly Filtration (Isolation Forest)
                  </span>
                  <span className="text-emerald-600 dark:text-accent font-semibold">99.4%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[99.4%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    Schema Type Coercion &amp; Validation
                  </span>
                  <span className="text-emerald-600 dark:text-accent font-semibold">100.0%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-full" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Feature Distribution View */}
        {activeView === 'distribution' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Statistical Feature Correlation Matrix</span>
              <span className="text-accent font-mono">r = 0.88</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                <span className="text-neutral-400 text-[10px]">PRIMARY PREDICTOR</span>
                <p className="font-semibold text-neutral-800 dark:text-neutral-200 mt-1">Variance: High (94.2%)</p>
                <p className="text-[10px] text-emerald-600 dark:text-accent mt-0.5">Normal Gaussian</p>
              </div>

              <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                <span className="text-neutral-400 text-[10px]">DRIFT METRIC</span>
                <p className="font-semibold text-neutral-800 dark:text-neutral-200 mt-1">PSI Score: 0.012</p>
                <p className="text-[10px] text-emerald-600 dark:text-accent mt-0.5">Stable Distribution</p>
              </div>
            </div>

            <p className="text-[11px] font-mono text-neutral-400 text-center">
              Evaluated across 42 dimensional feature vectors
            </p>
          </div>
        )}
      </div>

      {/* Footer Stack Tags */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-t border-black/10 dark:border-white/10 bg-neutral-100/60 dark:bg-white/[0.02] text-[10px] font-mono text-neutral-500 overflow-x-auto">
        <span className="text-neutral-400">STACK:</span>
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5">BigQuery</span>
          <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5">Pandas</span>
          <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5">SQL</span>
          <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5">Scikit-Learn</span>
          <span className="px-1.5 py-0.5 rounded bg-accent/15 text-emerald-700 dark:text-accent">Data Cleaning</span>
        </div>
      </div>

    </div>
  );
};
