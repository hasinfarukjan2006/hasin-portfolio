'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, CheckCircle2, Calendar, Layers, ShieldAlert, Activity } from 'lucide-react';
import { ProjectItem } from '@/lib/resumeData';
import Link from 'next/link';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl bg-dark-100/95 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="pr-12 mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/15 border border-primary-500/30 text-xs font-mono font-semibold text-primary-400">
                <Calendar className="w-3.5 h-3.5" />
                Year {project.year}
              </span>
              {project.categories && project.categories.length > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purpleAccent-500/15 border border-purpleAccent-500/30 text-xs font-mono font-semibold text-purpleAccent-400">
                  <Activity className="w-3.5 h-3.5" />
                  Classification Engine
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-base text-gradient-blue font-medium mb-4">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Body Content */}
          <div className="space-y-6 text-slate-300">
            {/* Overview */}
            <div>
              <h4 className="text-sm font-mono font-bold text-primary-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4" /> System Overview
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-slate-200">
                {project.overview}
              </p>
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <h5 className="text-sm font-bold text-rose-400 mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Identified Problem
                </h5>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <h5 className="text-sm font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> Engineering Solution
                </h5>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-sm font-mono font-bold text-primary-400 uppercase tracking-wider mb-3">
                Key System Capabilities & Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Classification Categories (If SafeCare) */}
            {project.categories && project.categories.length > 0 && (
              <div className="p-4 rounded-xl bg-purpleAccent-950/20 border border-purpleAccent-800/40">
                <h4 className="text-xs font-mono font-bold text-purpleAccent-400 uppercase tracking-wider mb-2">
                  Acoustic Event Classification Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((cat) => (
                    <span key={cat} className="px-3 py-1 rounded-md text-xs font-mono text-purpleAccent-300 bg-purpleAccent-900/40 border border-purpleAccent-700/50">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture Notes (If SafeCare) */}
            {project.architectureNotes && (
              <div>
                <h4 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">
                  Hardware & Signal Processing Pipeline
                </h4>
                <div className="space-y-2">
                  {project.architectureNotes.map((note, nIdx) => (
                    <div key={nIdx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
                      • {note}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div>
              <h4 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-slate-200 bg-slate-800 border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-primary-600 hover:bg-primary-500 shadow-glow-blue transition-all"
            >
              <span>Dedicated Project Page</span>
              <ExternalLink className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
