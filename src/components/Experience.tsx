import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Calendar, MapPin, CheckCircle, Clock } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            06 / Career Timeline
          </span>
          <div className="h-[1px] flex-1 bg-black/[0.06] dark:bg-white/[0.06]" />
        </div>

        <div className="max-w-2xl mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-[#F5F3EE]">
            Professional Experience
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-3 font-sans">
            A track record of analyzing complex organizational data, engineering custom AI workflows, and delivering high-value technical initiatives.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-black/[0.08] dark:border-white/[0.08] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12 sm:space-y-16">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline Marker Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#0A0A0A] bg-neutral-400 group-hover:bg-accent group-hover:scale-125 transition-all duration-300" />

              <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-white/60 dark:bg-[#121212]/60 p-6 sm:p-8 backdrop-blur-sm space-y-4 hover:border-black/15 dark:hover:border-white/15 transition-all">
                
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/[0.06] dark:border-white/[0.06] pb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-light text-neutral-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-emerald-700 dark:text-accent mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium ${
                      exp.status === 'In Implementation'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-700 dark:text-accent border border-emerald-500/20'
                    }`}>
                      {exp.status === 'In Implementation' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      {exp.status}
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <ul className="space-y-3 pt-2">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 mt-2 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies Used */}
                {exp.technologies && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-3">
                    <span className="text-xs font-mono text-neutral-400 mr-1">Focus:</span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 border border-black/5 dark:border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Thin Horizontal Separator */}
      <div className="w-full h-[1px] bg-black/[0.06] dark:bg-white/[0.06] mt-24" />
    </section>
  );
};
