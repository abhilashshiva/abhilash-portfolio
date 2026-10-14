import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setStatusMessage('');

    try {
      // Connect to Formspree endpoint or fallback to mailto
      // We will attempt a standard Formspree endpoint or create mailto fallback
      const response = await fetch('https://formspree.io/f/mqaebrql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Your message was received successfully. I will get back to you shortly.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Fallback or explicit notification
        throw new Error('Form service unavailable');
      }
    } catch (err) {
      // Graceful fallback with direct mailto option
      setStatus('error');
      setStatusMessage('Direct transmission failed. You can reach out directly via abhilashshiva.b@gmail.com.');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            09 / Communication
          </span>
          <div className="h-[1px] flex-1 bg-black/[0.06] dark:bg-white/[0.06]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Editorial Heading & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-neutral-900 dark:text-[#F5F3EE] leading-[1.1]">
                Let's discuss <br />
                <span className="italic text-neutral-500 dark:text-neutral-400">new initiatives.</span>
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                Available for engineering opportunities, practical AI consultations, or technical product collaborations. Feel free to send a message or contact me directly.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-4 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#121212]/70 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-[11px] font-mono text-neutral-400 uppercase">Email</p>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-accent transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#121212]/70 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-mono text-neutral-400 uppercase">Location</p>
                  <p className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#121212] p-8 sm:p-10 shadow-lg">
              
              <h3 className="font-serif text-2xl font-light text-neutral-900 dark:text-white mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#1A1A1A] border text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-accent transition-colors ${
                      formErrors.name ? 'border-red-500' : 'border-black/10 dark:border-white/10'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#1A1A1A] border text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-accent transition-colors ${
                      formErrors.email ? 'border-red-500' : 'border-black/10 dark:border-white/10'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your initiative or query..."
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#1A1A1A] border text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none ${
                      formErrors.message ? 'border-red-500' : 'border-black/10 dark:border-white/10'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Status Banners */}
                {status === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" />
                    <div className="space-y-1">
                      <p>{statusMessage}</p>
                      <a 
                        href={`mailto:${PERSONAL_INFO.email}?subject=Contact%20from%20Portfolio&body=${encodeURIComponent(formData.message)}`}
                        className="underline font-semibold hover:text-white inline-block mt-1"
                      >
                        Click to open in your mail app
                      </a>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-accent hover:bg-accent-hover text-black font-semibold text-sm tracking-tight transition-all duration-200 disabled:opacity-50 hover:-translate-y-0.5 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? 'Transmitting Message...' : 'Send Message'}</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
