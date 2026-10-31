import React, { useState } from 'react';
import { ArrowUp, Mail, ShieldCheck, X, Lock } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="border-t border-black/[0.08] dark:border-white/[0.08] bg-white/40 dark:bg-[#08090C] py-14 transition-colors">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10">
          
          {/* Main Footer Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-black/[0.06] dark:border-white/[0.06]">
            
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
                className="hover:text-emerald-600 dark:text-accent font-semibold transition-colors"
              >
                Resume (PDF)
              </a>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors underline font-mono text-[11px]"
              >
                Privacy Notice
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-full hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-full hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.email}
                aria-label="Direct Email"
                className="p-2 rounded-full hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
            <p>
              &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Designed &amp; engineered for production.
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

      {/* Professional Privacy Policy Modal */}
      {privacyModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#121319] border border-black/10 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-5 text-neutral-800 dark:text-neutral-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <h3 className="font-serif text-lg font-medium text-neutral-900 dark:text-white">
                  Privacy Policy &amp; Data Notice
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <p>
                This portfolio website is a personal showcase of software engineering and machine learning work. I prioritize visitor privacy and adhere to standard data protection principles (including India’s DPDP Act and GDPR).
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white font-mono text-xs uppercase tracking-wide">
                    1. Information Collected
                  </h4>
                  <p className="mt-1">
                    When you use the contact form, only the information you voluntarily submit (your name, email address, and message) is received via secure HTTPS to facilitate direct correspondence.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white font-mono text-xs uppercase tracking-wide">
                    2. Use of Information
                  </h4>
                  <p className="mt-1">
                    Your details are used strictly to respond to hiring, technical, or project inquiries. Your information is never sold, leased, or distributed to third-party marketing or data brokerage networks.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white font-mono text-xs uppercase tracking-wide">
                    3. Data Retention &amp; Removal
                  </h4>
                  <p className="mt-1">
                    Inquiries are retained only as long as necessary to complete correspondence. If you would like your messages or contact record permanently deleted, email <a href="mailto:abhilashshiva.b@gmail.com" className="text-emerald-700 dark:text-accent underline font-mono">abhilashshiva.b@gmail.com</a>.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-medium bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity"
              >
                Close Notice
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
