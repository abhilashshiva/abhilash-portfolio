import React from 'react';
import { Database, Cpu, Compass, CheckCircle2, Sparkles, MapPin, GraduationCap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            03 / Background &amp; Philosophy
          </span>
          <div className="h-[1px] flex-1 bg-black/[0.06] dark:bg-white/[0.06]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait & Quick Bio Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-neutral-900 shadow-xl group">
              <img
                src="/abhilash-profile.jpg"
                alt="Abhilash Bollepalli"
                className="w-full h-[480px] sm:h-[520px] object-cover object-center contrast-[1.05] group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="font-serif text-2xl font-medium tracking-tight">Abhilash Bollepalli</p>
                <p className="text-xs text-accent font-mono">Data &amp; AI Developer &bull; Hyderabad, India</p>
              </div>
            </div>

            {/* Quick Context Card */}
            <div className="p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-[#121319]/60 backdrop-blur-sm grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <p className="text-neutral-400">Degree</p>
                <p className="font-medium text-neutral-800 dark:text-neutral-200 mt-0.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-accent" />
                  B.Tech AIML (2026)
                </p>
              </div>
              <div>
                <p className="text-neutral-400">Location</p>
                <p className="font-medium text-neutral-800 dark:text-neutral-200 mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  Hyderabad, TG
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Unified Philosophy */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-[#F5F3EE] leading-[1.15]">
                Empirical data investigation meets practical AI engineering.
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                I believe effective AI starts with clean data. Rather than jumping straight to complex models or hype, I dig into the raw records, uncover where pipeline bottlenecks and anomalies live, and build reliable software that solves real problems.
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              <p>
                At <span className="font-semibold text-neutral-900 dark:text-neutral-200">Pulsus Healthtech</span>, I investigated multi-channel operational datasets to isolate core conversion drop-offs, extracting and structuring customer feedback and workflow metrics. That analysis directly informed custom automated reporting tools using Python, Claude, and Antigravity.
              </p>
              <p>
                During my internship at <span className="font-semibold text-neutral-900 dark:text-neutral-200">Bryte</span>, I built customized machine learning classification pipelines and data-cleansing scripts for client applications across healthcare and consumer products—consistently maintaining ~80% validation precision.
              </p>
              <p>
                At the <span className="font-semibold text-neutral-900 dark:text-neutral-200">MLRIT Centre for Innovation &amp; Entrepreneurship (CIE)</span>, I led student technical initiatives, hackathons, and regional innovation partnerships, bringing together student engineering teams and industry mentors to prototype applied software products.
              </p>
            </div>

            {/* Unified 3-Part Engineering Framework */}
            <div className="pt-8 border-t border-black/[0.08] dark:border-white/[0.08] space-y-5">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  Engineering Principles &amp; Standards
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-neutral-50/70 dark:bg-white/[0.02] space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <Database className="w-4 h-4" />
                    <span className="font-mono text-xs font-semibold">01. Hygiene</span>
                  </div>
                  <h4 className="font-serif text-sm font-medium text-neutral-900 dark:text-white">
                    Data First
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Exhaustive exploratory data analysis, outlier bounds, and schema validation before writing any model code.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-neutral-50/70 dark:bg-white/[0.02] space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <Cpu className="w-4 h-4" />
                    <span className="font-mono text-xs font-semibold">02. Pragmatism</span>
                  </div>
                  <h4 className="font-serif text-sm font-medium text-neutral-900 dark:text-white">
                    Measurable ML
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Choosing maintainable estimators and verifiable RAG pipelines over ungrounded complexity or hype.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-neutral-50/70 dark:bg-white/[0.02] space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <Compass className="w-4 h-4" />
                    <span className="font-mono text-xs font-semibold">03. Production</span>
                  </div>
                  <h4 className="font-serif text-sm font-medium text-neutral-900 dark:text-white">
                    End-to-End
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Deploying production-ready APIs, sub-second latency, and intuitive interfaces for actual users.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Thin Horizontal Separator */}
      <div className="w-full h-[1px] bg-black/[0.06] dark:bg-white/[0.06] mt-24" />
    </section>
  );
};
