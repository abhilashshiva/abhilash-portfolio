import { ArrowRight, Download, Mail, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HeroConsole } from './HeroConsole';

export const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 sm:pt-32 sm:pb-24 overflow-hidden"
    >
      {/* Atmospheric Background Ambient Radial Gradients */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] bg-gradient-to-b from-accent/10 via-accent/[0.02] to-transparent blur-3xl -z-10"
      />
      
      <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full">
        {/* Availability Badge */}
        <div className="flex items-center gap-2 mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs tracking-wide uppercase font-medium bg-neutral-900/60 dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>{PERSONAL_INFO.availability}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7">
            {/* Name and Professional Subtitle */}
            <div className="mb-4">
              <p className="text-xs sm:text-sm font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
                {PERSONAL_INFO.name} <span className="mx-2 text-neutral-400 dark:text-neutral-600">/</span> {PERSONAL_INFO.headline}
              </p>
            </div>

            {/* Oversized Editorial Serif Headline */}
            <div className="max-w-4xl mb-8">
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] tracking-tight leading-[1.14] font-light text-neutral-900 dark:text-[#F5F3EE]">
                Engineering intelligent systems <br className="hidden sm:inline" />
                <span className="text-neutral-500 dark:text-neutral-400">from complex </span>
                <span className="text-emerald-700 dark:text-accent font-normal italic">data</span>{' '}
                <span className="text-neutral-500 dark:text-neutral-400">to </span>
                <span className="text-emerald-700 dark:text-accent font-normal italic">production AI & automation.</span>
              </h1>
            </div>

            {/* Short Grounded Introduction */}
            <div className="max-w-2xl mb-10">
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                {PERSONAL_INFO.shortBio}
              </p>
            </div>

            {/* Call to Actions & Social Links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Primary CTA */}
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-black font-semibold text-sm tracking-tight transition-all duration-200 shadow-sm hover:shadow-[0_4px_20px_rgba(201,237,185,0.3)] hover:-translate-y-0.5"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              {/* Secondary CTA */}
              <a
                href={PERSONAL_INFO.resumePath}
                download="Abhilash_Bollepalli_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.09] border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                <span>Download Resume</span>
              </a>

              {/* Subtle Social Links */}
              <div className="flex items-center gap-3 sm:ml-2 pt-2 sm:pt-0">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-full text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white border border-transparent hover:border-black/10 dark:hover:border-white/10 transition-colors"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-full text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white border border-transparent hover:border-black/10 dark:hover:border-white/10 transition-colors"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.email}
                  aria-label="Direct Email"
                  className="p-2.5 rounded-full text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white border border-transparent hover:border-black/10 dark:hover:border-white/10 transition-colors"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Systems Terminal Console */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center pt-6 lg:pt-0">
            <HeroConsole />
          </div>
        </div>

        {/* Atmospheric Hero Technical Blueprint Visual */}
        <div className="relative w-full rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#121212] overflow-hidden p-6 sm:p-8 shadow-sm">
          {/* Subtle grid pattern background */}
          <div 
            aria-hidden="true" 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[radial-gradient(#C9EDB9_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Visual Header / Terminal Pill */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Engineering Stack & Systems Architecture
                </span>
              </div>
              <p className="font-serif text-lg sm:text-xl text-neutral-800 dark:text-neutral-200">
                Data Investigation &bull; Predictive Modeling &bull; Autonomous Workflows
              </p>
            </div>

            {/* Live Indicator Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10 pt-4 md:pt-0 md:pl-8">
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Location</p>
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Hyderabad, TG</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Focus Area</p>
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">AI / ML & Data</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Status</p>
                <p className="text-sm font-medium text-emerald-600 dark:text-accent flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Active Build
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Thin Horizontal Separator */}
      <div className="w-full h-[1px] bg-black/[0.06] dark:bg-white/[0.06] mt-20" />
    </section>
  );
};
