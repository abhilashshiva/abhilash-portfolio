import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers, ExternalLink, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#121212] overflow-hidden transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(201,237,185,0.03)] hover:-translate-y-1">
      
      {/* Visual Composition Top - Decreased, Sleek Height */}
      <div className="relative h-44 sm:h-48 w-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-[#171717] overflow-hidden flex items-center justify-center p-4 border-b border-black/[0.06] dark:border-white/[0.06]">
        
        {/* Subtle grid texture */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[radial-gradient(#C9EDB9_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"
        />

        {/* Dynamic Project Graphic Frame */}
        <div className="relative w-full h-full rounded-xl bg-white/80 dark:bg-black/50 border border-black/10 dark:border-white/10 p-3.5 flex flex-col justify-between shadow-sm group-hover:scale-[1.02] transition-transform duration-300 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>
            <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">
              {project.statusBadge}
            </span>
          </div>

          {/* Center Graphic */}
          <div className="flex items-center justify-center gap-2.5 py-2">
            <div className="w-9 h-9 rounded-xl bg-accent/10 dark:bg-accent/[0.08] border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
              <Layers className="w-4 h-4 text-neutral-800 dark:text-accent" />
            </div>
            <div className="text-left">
              <p className="font-serif text-base font-medium text-neutral-900 dark:text-white leading-tight">
                {project.title}
              </p>
              <p className="text-[10px] font-mono text-neutral-400 mt-0.5 truncate max-w-[170px]">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Tech Badges Footer */}
          <div className="flex flex-wrap items-center gap-1 pt-1.5 border-t border-black/[0.06] dark:border-white/[0.06]">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-400 border border-black/5 dark:border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Floating Number Badge */}
        <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-neutral-400 dark:text-neutral-500">
          // {project.number}
        </div>
      </div>

      {/* Content Area - Compact and Proportionate */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
        
        <div className="space-y-2">
          {/* Title & Status */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-medium text-neutral-900 dark:text-[#F5F3EE] tracking-tight group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-accent/10 border border-emerald-200 dark:border-accent/20 text-emerald-700 dark:text-accent flex-shrink-0">
              <Sparkles className="w-2.5 h-2.5" />
              {project.period}
            </span>
          </div>

          {/* Problem-oriented Description (compact) */}
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-300 border border-black/5 dark:border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between gap-2">
          <Link
            to={`/project/${project.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-accent group/link transition-colors"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>

          <div className="flex items-center gap-2">
            {project.links.live && project.links.live !== '#' && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-neutral-400 hover:text-black dark:hover:text-white flex items-center gap-1"
              >
                <span>Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.links.github && project.links.github !== '#' && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-neutral-400 hover:text-black dark:hover:text-white flex items-center gap-1"
              >
                <span>Code</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

      </div>

    </article>
  );
};
