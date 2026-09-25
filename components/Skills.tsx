'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS_DATA } from '@/lib/resumeData';
import { Code2, Globe, Cpu, Database, Wrench, BookOpen, Search } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Programming Languages': <Code2 className="w-5 h-5 text-primary-400" />,
  'Web': <Globe className="w-5 h-5 text-cyan-400" />,
  'AI / ML': <Cpu className="w-5 h-5 text-purpleAccent-500" />,
  'Databases': <Database className="w-5 h-5 text-emerald-400" />,
  'Tools': <Wrench className="w-5 h-5 text-amber-400" />,
  'Core CS': <BookOpen className="w-5 h-5 text-indigo-400" />,
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...SKILLS_DATA.map((s) => s.category)];

  const filteredCategories = SKILLS_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary-400 uppercase mb-2">
            02 // Stack & Competencies
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical <span className="text-gradient-blue">Skills</span>
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Core technologies, frameworks, and Computer Science fundamentals from hands-on projects & academic coursework.
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-purpleAccent-500 mx-auto rounded-full" />
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white shadow-glow-blue font-semibold'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: groupIdx * 0.1 }}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    {CATEGORY_ICONS[group.category] || <Code2 className="w-5 h-5 text-primary-400" />}
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-wide">
                    {group.category}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-200 bg-slate-800/80 border border-slate-700/60 hover:border-primary-500/50 hover:bg-slate-800 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
