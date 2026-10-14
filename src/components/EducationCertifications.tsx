import React from 'react';
import { EDUCATION, CERTIFICATIONS } from '../data/portfolioData';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

export const EducationCertifications: React.FC = () => {
  return (
    <section id="education" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            08 / Credentials
          </span>
          <div className="h-[1px] flex-1 bg-black/[0.06] dark:bg-white/[0.06]" />
        </div>

        <div className="max-w-2xl mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-[#F5F3EE]">
            Education & Certifications
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-3 font-sans">
            Academic grounding in Computer Science (Artificial Intelligence & Machine Learning) alongside industry credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Education Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-accent" />
              <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-900 dark:text-white">
                Formal Education
              </h3>
            </div>

            <div className="space-y-6">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#121212]/70 p-6 backdrop-blur-sm space-y-3 hover:border-black/15 dark:hover:border-white/15 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="font-serif text-lg font-medium text-neutral-900 dark:text-white">
                      {edu.institution}
                    </h4>
                    <span className="text-xs font-mono text-emerald-700 dark:text-accent font-semibold">
                      {edu.grade}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {edu.degree}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 dark:text-neutral-500 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {edu.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-accent" />
              <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-900 dark:text-white">
                Industry Certifications
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#121212]/70 p-5 backdrop-blur-sm space-y-1.5 hover:border-black/15 dark:hover:border-white/15 transition-all"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {cert.title}
                    </h4>
                    <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 whitespace-nowrap">
                      {cert.date}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-emerald-700 dark:text-accent">
                    {cert.issuer}
                  </p>

                  {cert.details && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 pt-0.5">
                      {cert.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Thin Horizontal Separator */}
      <div className="w-full h-[1px] bg-black/[0.06] dark:bg-white/[0.06] mt-24" />
    </section>
  );
};
