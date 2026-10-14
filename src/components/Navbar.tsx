import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  Home, 
  Briefcase, 
  User, 
  Layers, 
  Mail, 
  Sun, 
  Moon, 
  FileDown, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Work', href: '#work', icon: Briefcase },
  { name: 'Lab', href: '#interactive-lab', icon: Sparkles },
  { name: 'About', href: '#about', icon: User },
  { name: 'Experience', href: '#experience', icon: Layers },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (!isHomePage) return;

      const sections = ['home', 'work', 'interactive-lab', 'about', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (!isHomePage) {
      navigate('/' + href);
      return;
    }

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 sm:px-8 py-3 sm:py-5 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Top Left: Stylish AB Monogram Logo */}
          <div className="pointer-events-auto">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group flex items-center gap-2.5 transition-all"
              title="Abhilash Bollepalli — Home"
              aria-label="Abhilash Bollepalli Home"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-white/20 dark:border-white/15 flex items-center justify-center shadow-lg group-hover:border-accent/60 group-hover:shadow-[0_0_20px_rgba(201,237,185,0.25)] transition-all">
                <span className="font-serif font-black text-sm sm:text-base tracking-tighter text-neutral-100 group-hover:text-accent transition-colors">
                  AB
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-neutral-950 shadow-sm" />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-serif font-bold text-xs tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-accent transition-colors">
                  ABHILASH
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  Data &amp; AI
                </span>
              </div>
            </a>
          </div>

          {/* Center: Floating Pill Navigation Bar */}
          <nav 
            aria-label="Main Navigation"
            className={`pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-full transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-[#141414]/90 border border-white/10 text-neutral-300 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-md'
                : 'bg-[#FFFFFF]/95 border border-black/10 text-neutral-700 shadow-[0_12px_36px_rgba(0,0,0,0.08)] backdrop-blur-md'
            } ${scrolled ? 'scale-[0.98]' : ''}`}
          >
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = isHomePage && activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-neutral-800/90 text-white shadow-sm'
                          : 'bg-neutral-100 text-black shadow-sm font-semibold'
                        : theme === 'dark'
                          ? 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                          : 'text-neutral-600 hover:text-black hover:bg-neutral-100/70'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-accent dark:text-accent' : 'opacity-70'}`} />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Resume Quick Action */}
            <a
              href="/resume.pdf"
              download="Abhilash_Bollepalli_Resume.pdf"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-neutral-800/60 hover:bg-neutral-700/80 text-neutral-300 hover:text-white'
                  : 'bg-neutral-100 hover:bg-neutral-200/90 text-neutral-800'
              }`}
              title="Download Verified Resume (PDF)"
            >
              <FileDown className="w-3.5 h-3.5 text-accent" />
              <span className="hidden lg:inline">Resume</span>
            </a>

            {/* Mobile Menu Toggle Button inside pill */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className={`p-1.5 md:hidden rounded-full transition-all duration-200 ${
                theme === 'dark'
                  ? 'text-neutral-300 hover:bg-neutral-800'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </nav>

          {/* Top Right: Name in Super Good Editorial Format + Theme Switcher */}
          <div className="pointer-events-auto flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#141414]/80 border border-black/10 dark:border-white/10 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-serif text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                Abhilash Bollepalli
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 pl-1.5 border-l border-black/10 dark:border-white/10">
                Data &amp; AI
              </span>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className={`p-2 rounded-full transition-all duration-200 border ${
                theme === 'dark'
                  ? 'bg-[#141414]/90 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800 shadow-md'
                  : 'bg-white/95 border-black/10 text-neutral-600 hover:text-black hover:bg-neutral-100 shadow-sm'
              } backdrop-blur-md`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-200" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div 
            className={`pointer-events-auto md:hidden mt-3 max-w-sm mx-auto p-3.5 rounded-2xl transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-[#141414]/95 border border-white/10 text-neutral-200 shadow-2xl backdrop-blur-xl'
                : 'bg-white/95 border border-black/10 text-neutral-800 shadow-xl backdrop-blur-xl'
            }`}
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = isHomePage && activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-neutral-800 text-white font-medium'
                          : 'bg-neutral-100 text-black font-semibold'
                        : theme === 'dark'
                          ? 'text-neutral-400 hover:bg-neutral-800/40 hover:text-white'
                          : 'text-neutral-600 hover:bg-neutral-100/70 hover:text-black'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'opacity-60'}`} />
                    <span>{item.name}</span>
                  </a>
                );
              })}
              
              <div className={`h-[1px] my-1 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />

              <a
                href="/resume.pdf"
                download="Abhilash_Bollepalli_Resume.pdf"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                  theme === 'dark'
                    ? 'text-accent hover:bg-neutral-800/50'
                    : 'text-emerald-700 hover:bg-neutral-100'
                }`}
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
