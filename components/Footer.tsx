'use client';

import { ArrowUp, Github, Linkedin, Mail, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/resumeData';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-100 border-t border-slate-800/80 pt-12 pb-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left space-y-1">
            <h4 className="text-lg font-bold font-mono text-white tracking-wider">
              HASIN <span className="text-primary-500 font-extrabold">F</span>
            </h4>
            <p className="text-xs text-slate-400 max-w-md">
              Computer Science & Engineering Student | Software Developer | AI/ML Enthusiast
            </p>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-primary-500 transition-colors"
              title="GitHub"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-blue-500 transition-colors"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-purpleAccent-400 hover:border-purpleAccent-500 transition-colors"
              title="Email"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-primary-600/90 text-white hover:bg-primary-500 transition-colors shadow-glow-blue ml-2"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} HASIN F. Built with Next.js, React, TypeScript & Tailwind CSS.</p>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 hover:text-primary-400 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
