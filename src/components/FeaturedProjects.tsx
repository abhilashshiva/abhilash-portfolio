import React from 'react';
import { ProjectCard } from './ProjectCard';
import { PROJECTS } from '../data/portfolioData';

export const FeaturedProjects: React.FC = () => {
  return (
    <section id="work" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            02 / Selected Works
          </span>
          <div className="h-[1px] flex-1 bg-black/[0.06] dark:bg-white/[0.06]" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-[#F5F3EE]">
              Featured Projects
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 font-sans">
              Shipped applications, institutional platforms, and operational tools built with practical AI and robust full-stack architecture.
            </p>
          </div>
          <span className="font-mono text-xs text-neutral-400">
            3 Production Deployments
          </span>
        </div>

        {/* 3-Column Decreased Size Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

      </div>

      {/* Thin Horizontal Separator */}
      <div className="w-full h-[1px] bg-black/[0.06] dark:bg-white/[0.06] mt-20" />
    </section>
  );
};
