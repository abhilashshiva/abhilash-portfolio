import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code2, BarChart2, Brain, Wrench, Globe } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Programming Languages": Code2,
  "Data & Analytics": BarChart2,
  "AI & Machine Learning": Brain,
  "AI Tools & LLMs": Wrench,
  "Web & Cloud Infrastructure": Globe,
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            07 / Capabilities
          </span>
          <div className="h-[1px] flex-1 bg-black/[0.06] dark:bg-white/[0.06]" />
        </div>

        <div className="max-w-2xl mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-[#F5F3EE]">
            Technical Competencies
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-3 font-sans">
            Verified technical toolsets, programming languages, and intelligent platforms utilized across machine learning pipelines and production deployments.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.category] || Code2;
            return (
              <div
                key={category.category}
                className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#121212]/70 p-6 backdrop-blur-sm space-y-4 hover:border-black/15 dark:hover:border-white/15 transition-all"
              >
                <div className="flex items-center gap-2.5 border-b border-black/[0.06] dark:border-white/[0.06] pb-3">
                  <div className="p-2 rounded-xl bg-accent/10 dark:bg-accent/[0.08] text-neutral-800 dark:text-accent">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-neutral-900 dark:text-white">
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 border border-black/5 dark:border-white/5 hover:border-accent/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Thin Horizontal Separator */}
      <div className="w-full h-[1px] bg-black/[0.06] dark:bg-white/[0.06] mt-24" />
    </section>
  );
};
