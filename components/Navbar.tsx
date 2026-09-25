'use client';

import { useState, useEffect } from 'react';
import { Menu, X, FileDown, Code2 } from 'lucide-react';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-100/85 backdrop-blur-md border-b border-dark-border py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Brand */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 group text-xl font-bold font-mono text-slate-100 tracking-wider"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary-600 to-purpleAccent-500 flex items-center justify-center text-white shadow-glow-blue group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <span>HASIN <span className="text-primary-500 font-extrabold">F</span></span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-primary-500 bg-primary-500/10 font-semibold border border-primary-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* CTA Button: Download Resume */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/api/resume"
            download="HASIN_F_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-purpleAccent-600 hover:from-primary-500 hover:to-purpleAccent-500 shadow-glow-blue hover:shadow-glow-purple transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="/api/resume"
            download="HASIN_F_Resume.pdf"
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-200 bg-slate-800/80 border border-slate-700"
            title="Download Resume"
          >
            <FileDown className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-dark-100/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl transition-all duration-300 animate-in slide-in-from-top-4">
          <div className="px-4 pt-3 pb-6 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-primary-400 bg-primary-500/15 border border-primary-500/30 font-semibold'
                      : 'text-slate-200 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-4 border-t border-slate-800/80">
              <a
                href="/api/resume"
                download="HASIN_F_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-purpleAccent-600 shadow-glow-blue"
              >
                <FileDown className="w-5 h-5" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
