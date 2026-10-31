import React from 'react';
import { Database, Cpu, Compass, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            05 / Background & Methodology
          </span>
          <div className="h-[1px] flex-1 bg-black/[0.06] dark:bg-white/[0.06]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait & Snapshot */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-neutral-900 shadow-xl group">
              <img
                src="/abhilash-profile.jpg"
                alt="Abhilash Bollepalli"
                className="w-full h-[480px] sm:h-[540px] object-cover object-center contrast-[1.05] group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="font-serif text-2xl font-medium tracking-tight">Abhilash Bollepalli</p>
                <p className="text-xs text-accent font-mono">Data & AI Developer &bull; Hyderabad, India</p>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="p-6 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-[#141414]/60 backdrop-blur-sm space-y-4">
              <div className="flex items-start gap-3">
                <Database className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Analytical Rigor</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Isolating structural anomalies through data scraping, cleaning, and hypothesis validation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Cpu className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Practical ML & AI</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Engineering targeted models, prompt pipelines, and autonomous workflow tooling.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Compass className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Full-Stack Execution</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Deploying production software from relational database models to high-response UI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Segregated Tenets */}
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

            {/* Segregated and Cleanly Sorted Engineering Tenets */}
            <div className="pt-8 border-t border-black/[0.08] dark:border-white/[0.08] space-y-6">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  Engineering Tenets & Principles
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 font-sans">
                  The core methodological guidelines governing every data pipeline and machine learning model I build.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    num: "01",
                    title: "Root-Cause First",
                    desc: "Rigorous empirical investigation to validate root causes before formulating code or models."
                  },
                  {
                    num: "02",
                    title: "Pragmatic Intelligence",
                    desc: "Favoring robust, maintainable ML architectures over unnecessary complexity or hype."
                  },
                  {
                    num: "03",
                    title: "Data Hygiene & Integrity",
                    desc: "Exhaustive scraping, cleaning, schema validation, and systematic feature distribution audits."
                  },
                  {
                    num: "04",
                    title: "Verifiable Outcomes",
                    desc: "Aligning technical metrics with concrete, transparent operational and business deliverables."
                  }
                ].map((tenet) => (
                  <div
                    key={tenet.num}
                    className="p-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-neutral-50/70 dark:bg-white/[0.02] hover:border-black/15 dark:hover:border-white/15 transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-accent font-semibold">{tenet.num} //</span>
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <h4 className="font-serif text-base font-medium text-neutral-900 dark:text-white group-hover:text-accent transition-colors">
                      {tenet.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                      {tenet.desc}
                    </p>
                  </div>
                ))}
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
