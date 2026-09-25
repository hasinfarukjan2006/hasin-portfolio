'use client';

import { motion } from 'framer-motion';
import { EXPERIENCE_DATA } from '@/lib/resumeData';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative bg-dark-100/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary-400 uppercase mb-2">
            03 // Career & Industry
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Internship <span className="text-gradient-blue">Experience</span>
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Hands-on software development internships building responsive web interfaces, utilities, and application pages.
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-purpleAccent-500 mx-auto rounded-full" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 pl-6 md:pl-10 space-y-12">
          {EXPERIENCE_DATA.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-primary-500 flex items-center justify-center group-hover:scale-125 group-hover:border-purpleAccent-500 transition-all">
                <div className="w-2 h-2 rounded-full bg-primary-400" />
              </div>

              {/* Date badge on left for desktop */}
              <div className="hidden md:block absolute -left-[200px] top-1 text-right w-[140px]">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-primary-400 font-semibold">
                  {exp.duration}
                </span>
              </div>

              {/* Card Container */}
              <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                      {exp.role}
                    </h4>
                    <h5 className="text-base font-semibold text-purpleAccent-500 flex items-center gap-2 mt-1">
                      <Briefcase className="w-4 h-4 text-purpleAccent-500" />
                      {exp.company}
                    </h5>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="md:hidden inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-primary-400 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="mt-4 space-y-2.5">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
