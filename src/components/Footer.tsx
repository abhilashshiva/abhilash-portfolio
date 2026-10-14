import React, { useState } from 'react';
import { ArrowUp, Mail, ShieldCheck, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const [privacyExpanded, setPrivacyExpanded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black/[0.08] dark:border-white/[0.08] bg-white/40 dark:bg-[#0D0D0D] py-16 transition-colors">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-black/[0.06] dark:border-white/[0.06]">
          
          {/* Identity */}
          <div className="space-y-1">
            <p className="font-serif text-xl font-medium text-neutral-900 dark:text-white">
              {PERSONAL_INFO.name}
            </p>
            <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              {PERSONAL_INFO.headline} &bull; {PERSONAL_INFO.location}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-neutral-600 dark:text-neutral-400">
            <a href="#home" className="hover:text-black dark:hover:text-white transition-colors">Home</a>
            <a href="#work" className="hover:text-black dark:hover:text-white transition-colors">Work</a>
            <a href="#interactive-lab" className="hover:text-black dark:hover:text-white transition-colors">Lab</a>
            <a href="#about" className="hover:text-black dark:hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-black dark:hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
            <a 
              href={PERSONAL_INFO.resumePath} 
              download="Abhilash_Bollepalli_Resume.pdf"
              className="hover:text-emerald-600 dark:hover:text-accent font-semibold transition-colors"
            >
              Resume (PDF)
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-full hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.email}
              aria-label="Email"
              className="p-2 rounded-full hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Dedicated Privacy Policy & Security Constraints Section */}
        <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-neutral-50/60 dark:bg-white/[0.02] p-5 sm:p-6 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-200 font-semibold">
                Privacy Notice & Security Architecture
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setPrivacyExpanded(!privacyExpanded)}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <span>{privacyExpanded ? 'Collapse Notice' : 'View Policy & Controls'}</span>
              {privacyExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            This portfolio adheres to rigorous data privacy principles. Any personal information submitted via the contact form (name, email address, and message content) is gathered strictly for direct professional correspondence and legitimate business inquiries.
          </p>

          {privacyExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] text-xs font-sans text-neutral-600 dark:text-neutral-400">
              <div className="space-y-1">
                <p className="font-mono text-[11px] text-neutral-900 dark:text-neutral-200 font-semibold flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-accent" />
                  1. Zero Third-Party Monetization
                </p>
                <p className="text-[11px] leading-relaxed">
                  Your submitted details will never be sold, rented, monetized, or shared with third-party tracking or advertising networks.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-mono text-[11px] text-neutral-900 dark:text-neutral-200 font-semibold flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-accent" />
                  2. Transport Encryption & Sanitization
                </p>
                <p className="text-[11px] leading-relaxed">
                  All communication is transmitted via modern TLS 1.3 / HTTPS encryption. Client inputs are validated and sanitized to prevent XSS and injection.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-mono text-[11px] text-neutral-900 dark:text-neutral-200 font-semibold flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-accent" />
                  3. Retention & Right to Erasure
                </p>
                <p className="text-[11px] leading-relaxed">
                  Data is retained only as long as necessary to reply. You may request immediate deletion of your submitted messages by writing to <span className="text-accent underline font-mono">abhilashshiva.b@gmail.com</span>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-500 font-mono">
          <p>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
