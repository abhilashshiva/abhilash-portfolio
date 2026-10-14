import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertTriangle, Layers, Calendar, User, Sparkles, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const projectIndex = PROJECTS.findIndex(p => p.id === id);
  const project = PROJECTS[projectIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl font-light mb-4 text-neutral-900 dark:text-white">
          Project Not Found
        </h1>
        <p className="text-sm text-neutral-500 mb-8 max-w-md">
          The requested project case study could not be located in the verified records.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-black font-semibold text-xs tracking-tight"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    );
  }

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <article className="min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-10">
          <button
            type="button"
            onClick={() => navigate('/#work')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Works</span>
          </button>
        </div>

        {/* Header Metadata */}
        <header className="space-y-6 pb-12 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              PROJECT // {project.number}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-accent/10 border border-emerald-200 dark:border-accent/20 text-emerald-700 dark:text-accent">
              <Sparkles className="w-3 h-3" />
              {project.statusBadge}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
            {project.subtitle}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] text-xs font-mono">
            <div>
              <p className="text-neutral-400 uppercase">Role</p>
              <p className="font-medium text-neutral-800 dark:text-neutral-200 mt-0.5">{project.role}</p>
            </div>
            <div>
              <p className="text-neutral-400 uppercase">Period</p>
              <p className="font-medium text-neutral-800 dark:text-neutral-200 mt-0.5">{project.period}</p>
            </div>
            <div className="col-span-2">
              <p className="text-neutral-400 uppercase">Technologies</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.technologies.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.05] text-[11px] text-neutral-700 dark:text-neutral-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Visual Showcase Banner */}
        <div className="my-12 rounded-3xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-[#141414] p-8 sm:p-12 text-center relative overflow-hidden">
          <div 
            aria-hidden="true" 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[radial-gradient(#C9EDB9_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"
          />
          <div className="relative z-10 max-w-lg mx-auto space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Layers className="w-7 h-7 text-neutral-800 dark:text-accent" />
            </div>
            <h3 className="font-serif text-2xl font-light text-neutral-900 dark:text-white">
              System Architecture & Interface
            </h3>
            <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              {project.imagePlaceholderText}
            </p>
            <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 italic">
              [Verified engineering schematics and production workflows documented below]
            </p>
          </div>
        </div>

        {/* Case Study Core Sections */}
        <div className="space-y-16">
          
          {/* Overview & Problem */}
          <section className="space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-900 dark:text-white">
              Context & Problem Statement
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              <p>{project.caseStudy.overview}</p>
              <div className="p-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-neutral-50/50 dark:bg-white/[0.02]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                  The Core Problem
                </h4>
                <p className="text-neutral-800 dark:text-neutral-200">
                  {project.caseStudy.problem}
                </p>
              </div>
            </div>
          </section>

          {/* Solution & Engineering Architecture */}
          <section className="space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-900 dark:text-white">
              Solution & Architecture
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              {project.caseStudy.solution}
            </p>

            <div className="p-6 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#121212]/70 space-y-4">
              <h4 className="font-serif text-lg font-medium text-neutral-900 dark:text-white">
                Architectural Breakdown
              </h4>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                {project.caseStudy.architecture.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                {project.caseStudy.architecture.stack.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <p className="text-xs font-mono text-accent uppercase font-medium">
                      {item.category}
                    </p>
                    <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1">
                      {item.items.map((i, iIdx) => (
                        <li key={iIdx}>&bull; {i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* My Contributions */}
          <section className="space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-900 dark:text-white">
              Key Contributions & Engineering Role
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {project.caseStudy.myContribution.map((contribution, cIdx) => (
                <div 
                  key={cIdx}
                  className="flex items-start gap-3 p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-white/50 dark:bg-[#121212]/50 text-sm sm:text-base text-neutral-700 dark:text-neutral-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{contribution}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Results and Limitations */}
          <section className="space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-900 dark:text-white">
              Results & Operational Limitations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Results */}
              <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] space-y-3">
                <h4 className="text-sm font-medium text-emerald-800 dark:text-accent flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Demonstrated Outcomes
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                  {project.caseStudy.resultsAndLimitations.results.map((res, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-accent">&bull;</span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] space-y-3">
                <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Known Constraints & Future Scope
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                  {project.caseStudy.resultsAndLimitations.limitations.map((lim, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2">
                      <span className="text-amber-500">&bull;</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </section>

        </div>

        {/* Footer Navigation to Next Case Study */}
        <div className="mt-20 pt-10 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to="/#work"
            className="text-xs font-mono text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            &larr; Return to All Projects
          </Link>

          <Link
            to={`/project/${nextProject.id}`}
            className="inline-flex items-center gap-3 text-sm font-serif text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-accent transition-colors group"
          >
            <span>Next Project: {nextProject.title}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
    </article>
  );
};
