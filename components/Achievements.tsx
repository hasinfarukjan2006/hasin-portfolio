'use client';

import { motion } from 'framer-motion';
import { ACHIEVEMENTS_DATA } from '@/lib/resumeData';
import { Trophy, Flame, Code, Sparkles, Terminal } from 'lucide-react';

const TYPE_BADGES: Record<string, { bg: string; text: string; border: string }> = {
  Contest: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  Hackathon: { bg: 'bg-purpleAccent-500/10', text: 'text-purpleAccent-400', border: 'border-purpleAccent-500/30' },
  Competition: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  Bootcamp: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 relative bg-dark-100/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary-400 uppercase mb-2">
            06 // Competitions & Activities
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Achievements & <span className="text-gradient-blue">Events</span>
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Global coding competition ranks, national hackathons, coding challenges, and technical bootcamps.
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-purpleAccent-500 mx-auto rounded-full" />
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS_DATA.map((ach, index) => {
            const isHighlight = ach.id === 'ach-1'; // Codevita Rank
            const style = TYPE_BADGES[ach.type] || TYPE_BADGES.Competition;

            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between border ${
                  isHighlight ? 'border-primary-500/50 shadow-glow-blue' : 'border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${style.bg} ${style.text} ${style.border}`}>
                      {ach.type}
                    </span>
                    {isHighlight && (
                      <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-400">
                        <Flame className="w-3.5 h-3.5" /> Featured Rank
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                    {ach.title}
                  </h4>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {ach.detail}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-primary-400" />
                  <span>Verified Participation</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
