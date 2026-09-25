'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS_DATA, ProjectItem } from '@/lib/resumeData';
import { Github, ExternalLink, Calendar, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import ProjectModal from './ProjectModal';
import Link from 'next/link';

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-20 relative bg-dark-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary-400 uppercase mb-2">
            04 // Engineering Portfolio
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient-blue">Projects</span>
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Edge AI sound recognition, machine learning early warning systems, and modular web applications.
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-purpleAccent-500 mx-auto rounded-full" />
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PROJECTS_DATA.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group border border-slate-800/90 relative"
            >
              <div>
                {/* Year Pill & Feature Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-primary-400 font-semibold">
                    <Calendar className="w-3 h-3" />
                    {project.year}
                  </span>
                  {project.categories && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono text-purpleAccent-400 bg-purpleAccent-500/10 border border-purpleAccent-500/20">
                      Edge AI & Audio
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                  {project.title}
                </h4>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-3">
                  {project.description}
                </p>

                {/* Key Features Highlights */}
                <div className="mb-6">
                  <h5 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">Key Highlights</h5>
                  <ul className="space-y-1.5">
                    {project.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                    {project.features.length > 3 && (
                      <li className="text-[11px] font-mono text-slate-500 pl-5">
                        +{project.features.length - 3} more capabilities
                      </li>
                    )}
                  </ul>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 bg-slate-900/90 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 mt-auto">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-primary-600 hover:bg-primary-500 transition-colors shadow-glow-blue"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 hover:bg-slate-800 transition-colors"
                      title="GitHub Repository"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 hover:bg-slate-800 transition-colors"
                    title="Dedicated Project Page"
                    aria-label="Dedicated Project Page"
                  >
                    <ExternalLink className="w-4 h-4 text-cyan-400" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal View */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
