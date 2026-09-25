'use client';

import { motion } from 'framer-motion';
import { CERTIFICATIONS_DATA } from '@/lib/resumeData';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary-400 uppercase mb-2">
            05 // Credentials & Credentials
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical <span className="text-gradient-blue">Certifications</span>
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Verified course certifications and skill achievements in Artificial Intelligence, HCI, Cloud, and Full Stack Development.
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-purpleAccent-500 mx-auto rounded-full" />
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/30 text-primary-400">
                    <Award className="w-6 h-6" />
                  </div>
                  {cert.grade && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30">
                      {cert.grade} ({cert.score})
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                  {cert.title}
                </h4>

                <p className="text-sm font-semibold text-slate-400 flex items-center gap-1.5 mb-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {cert.issuer}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="inline-flex items-center gap-1 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-400" />
                  Verified Completion
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
