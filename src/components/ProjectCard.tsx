import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Sparkles, Scan, Database, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Render project-specific authentic UI preview
  const renderProjectVisual = () => {
    if (project.id === 'food-detecto') {
      return (
        <div className="relative w-full h-full rounded-xl bg-neutral-900 border border-emerald-500/20 p-3.5 flex flex-col justify-between overflow-hidden shadow-inner group-hover:border-accent/40 transition-all">
          {/* Subtle camera scanline effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#C9EDB9_1px,transparent_1px)] [background-size:12px_12px] opacity-10 pointer-events-none" />
          
          <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/10 pb-2 relative z-10">
            <span className="flex items-center gap-1.5 text-accent font-medium">
              <Scan className="w-3.5 h-3.5 animate-pulse" />
              <span>VISION_AI_CAM</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-accent border border-emerald-500/20 text-[9px]">
              YOLOv8 Engine
            </span>
          </div>

          {/* AI Bounding Box & Classification Overlay */}
          <div className="my-2 p-2 rounded-lg bg-black/60 border border-accent/40 relative z-10 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-white font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                Detected: Salad Bowl
              </span>
              <span className="text-accent font-bold">96.4%</span>
            </div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-neutral-400">
              <span className="text-neutral-300">380 kcal</span>
              <span>&bull;</span>
              <span>18g Protein</span>
              <span>&bull;</span>
              <span>45g Carbs</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 border-t border-white/10 pt-1.5 relative z-10">
            <span>Latency: 12ms</span>
            <span className="text-accent">FastAPI + Cloud Run</span>
          </div>
        </div>
      );
    }

    if (project.id === 'edmit') {
      return (
        <div className="relative w-full h-full rounded-xl bg-neutral-900 border border-black/10 dark:border-white/10 p-3.5 flex flex-col justify-between overflow-hidden shadow-inner group-hover:border-accent/40 transition-all">
          <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/10 pb-2">
            <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
              <Database className="w-3.5 h-3.5 text-accent" />
              <span>MLRIT_FEE_LEDGER</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[9px] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-accent" />
              <span>RLS Active</span>
            </span>
          </div>

          {/* Simulated ERP Ledger Record */}
          <div className="my-2 p-2 rounded-lg bg-black/50 border border-white/5 space-y-1.5 text-[10px] font-mono">
            <div className="flex items-center justify-between text-neutral-400">
              <span>ROLL: MLR22AIML042</span>
              <span className="text-emerald-400 dark:text-accent font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Cleared
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-500 text-[9px]">
              <span>Dept: CSE-AIML</span>
              <span>Reconciled: Supabase</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 border-t border-white/10 pt-1.5">
            <span>Audit Trail: Verified</span>
            <span className="text-neutral-300">PostgreSQL + RBAC</span>
          </div>
        </div>
      );
    }

    // studport
    return (
      <div className="relative w-full h-full rounded-xl bg-neutral-900 border border-black/10 dark:border-white/10 p-3.5 flex flex-col justify-between overflow-hidden shadow-inner group-hover:border-accent/40 transition-all">
        <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/10 pb-2">
          <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
            <Users className="w-3.5 h-3.5 text-accent" />
            <span>RECRUITER_SEARCH</span>
          </span>
          <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[9px]">
            Campus Drive 2026
          </span>
        </div>

        {/* Candidate Directory Filter Preview */}
        <div className="my-2 p-2 rounded-lg bg-black/50 border border-white/5 space-y-1.5 text-[10px] font-mono">
          <div className="flex items-center justify-between text-neutral-300">
            <span className="truncate">Tags: [Python, React, SQL]</span>
            <span className="text-accent font-semibold">142 Matches</span>
          </div>
          <div className="flex items-center justify-between text-neutral-500 text-[9px]">
            <span>Filter: CGPA &gt; 8.0</span>
            <span className="text-neutral-400">Resume.pdf Parsed</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 border-t border-white/10 pt-1.5">
          <span>Relational Schema</span>
          <span className="text-neutral-300">PHP 8.x + MySQL</span>
        </div>
      </div>
    );
  };

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#121212] overflow-hidden transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(201,237,185,0.03)] hover:-translate-y-1">
      
      {/* Visual Composition Top - Project-Specific Rich Interactive Preview */}
      <div className="relative h-48 sm:h-52 w-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-[#171717] overflow-hidden flex items-center justify-center p-3 sm:p-4 border-b border-black/[0.06] dark:border-white/[0.06]">
        
        {/* Subtle grid texture */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[radial-gradient(#C9EDB9_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"
        />

        {/* Render customized domain mockup */}
        {renderProjectVisual()}

        {/* Floating Number Badge */}
        <div className="absolute top-2.5 left-2.5 font-mono text-[9px] tracking-widest text-neutral-400 dark:text-neutral-500 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-md">
          // {project.number}
        </div>
      </div>

      {/* Content Area */}
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

          {/* Problem-oriented Description */}
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

        {/* Action Button & Working Links */}
        <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between gap-2">
          <Link
            to={`/project/${project.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-accent group/link transition-colors"
          >
            <span>Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>

          <div className="flex items-center gap-2">
            {project.links.github && project.links.github !== '#' && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white flex items-center gap-1 hover:underline"
                title="View GitHub Repository"
              >
                <span>Code</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.links.live && project.links.live !== '#' && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white flex items-center gap-1 hover:underline"
                title="Live Application Demo"
              >
                <span>Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

      </div>

    </article>
  );
};
