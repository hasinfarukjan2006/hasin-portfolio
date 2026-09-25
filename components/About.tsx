'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Code, Brain, Lightbulb, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/resumeData';

export default function About() {
  const highlightIcons = [
    <Code key="code" className="w-6 h-6 text-primary-400" />,
    <Brain key="brain" className="w-6 h-6 text-purpleAccent-500" />,
    <Lightbulb key="lightbulb" className="w-6 h-6 text-cyan-400" />
  ];

  return (
    <section id="about" className="py-20 relative bg-dark-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary-400 uppercase mb-2">
            01 // About & Profile
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional <span className="text-gradient-blue">Summary</span>
          </h3>
          <div className="mt-3 w-16 h-1 bg-gradient-to-r from-primary-500 to-purpleAccent-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Main Summary Text & Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                Engineering Background
              </h4>

              <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
                Computer Science and Engineering student with hands-on experience in software development,
                Artificial Intelligence, Machine Learning, and Edge AI. Experienced in creating responsive web applications,
                optimizing performance across 24+ production-ready pages, and implementing real-time Edge AI classification systems.
              </p>

              {/* Core Domains */}
              <div className="mb-6">
                <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">Core Areas of Focus</h5>
                <div className="flex flex-wrap gap-2">
                  {PERSONAL_INFO.domains.map((domain) => (
                    <span
                      key={domain}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800/90 border border-slate-700/80"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-400" />
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Education Cards */}
            <div className="pt-6 border-t border-slate-800/80 bg-slate-900/60 rounded-xl p-4 sm:p-5 mt-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/30 text-primary-400 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h5 className="text-base font-bold text-white">
                      {PERSONAL_INFO.education.degree}
                    </h5>
                    <span className="text-xs font-mono text-primary-400">{PERSONAL_INFO.education.period}</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    {PERSONAL_INFO.education.institution}
                  </p>
                  <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded bg-primary-500/15 border border-primary-500/30 text-xs font-mono font-semibold text-primary-300">
                    CGPA: {PERSONAL_INFO.education.cgpa}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {PERSONAL_INFO.education.schools?.map((school) => (
                  <div key={school.institution} className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="font-bold text-white block truncate">{school.institution}</span>
                    <span className="text-slate-400 block">{school.qualification}</span>
                    <span className="text-primary-400 font-mono font-semibold mt-1 inline-block">{school.score} ({school.year})</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3 Small Highlight Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-5">
            {PERSONAL_INFO.highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass-card glass-card-hover rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 shrink-0">
                  {highlightIcons[index]}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
