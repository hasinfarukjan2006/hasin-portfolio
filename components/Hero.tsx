'use client';

import { motion } from 'framer-motion';
import { ArrowRight, FileDown, Github, Linkedin, Sparkles, Terminal, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/resumeData';

export default function Hero() {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[250px] bg-purpleAccent-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs sm:text-sm font-mono text-primary-400 mb-8 shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Terminal className="w-3.5 h-3.5 text-primary-400" />
          <span>Open to Software Engineering & AI/ML Opportunities</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
        >
          {PERSONAL_INFO.name}
        </motion.h1>

        {/* Subtitle 1 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-gradient-blue mb-3"
        >
          {PERSONAL_INFO.title}
        </motion.p>

        {/* Subtitle 2 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg sm:text-xl font-mono text-slate-400 mb-6 tracking-wide flex items-center justify-center gap-2"
        >
          <Cpu className="w-5 h-5 text-cyan-400 inline-block" />
          <span>{PERSONAL_INFO.headline}</span>
        </motion.p>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed mb-10"
        >
          "{PERSONAL_INFO.shortBio}"
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary Button: View Projects */}
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-600 via-primary-500 to-purpleAccent-600 hover:from-primary-500 hover:to-purpleAccent-500 shadow-glow-blue hover:shadow-glow-purple transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Secondary Button: Download Resume */}
          <a
            href="/api/resume"
            download="HASIN_F_Resume.pdf"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/90 border border-slate-700/80 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all duration-300 shadow-glass"
          >
            <FileDown className="w-4.5 h-4.5 text-primary-400" />
            <span>Download Resume</span>
          </a>

          {/* Additional Button: GitHub */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-3.5 rounded-xl text-slate-300 bg-slate-900/90 border border-slate-700/80 hover:bg-slate-800 hover:text-white hover:border-primary-500/50 transition-all duration-300"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>

          {/* Additional Button: LinkedIn */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-3.5 rounded-xl text-slate-300 bg-slate-900/90 border border-slate-700/80 hover:bg-slate-800 hover:text-white hover:border-primary-500/50 transition-all duration-300"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5 text-blue-400" />
          </a>
        </motion.div>

        {/* Technical Highlights Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-3xl mx-auto"
        >
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <span className="block text-xl font-bold font-mono text-primary-400">7.77</span>
            <span className="text-xs text-slate-400 font-sans">B.E. CGPA</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <span className="block text-xl font-bold font-mono text-purpleAccent-500">24+ Pages</span>
            <span className="text-xs text-slate-400 font-sans">Full App Modules</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <span className="block text-xl font-bold font-mono text-cyan-400">Edge AI</span>
            <span className="text-xs text-slate-400 font-sans">TensorFlow Lite / CNN</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <span className="block text-xl font-bold font-mono text-emerald-400">Rank 10,944</span>
            <span className="text-xs text-slate-400 font-sans">TCS CodeVita S13</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
