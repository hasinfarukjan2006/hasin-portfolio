'use client';

import { useParams } from 'next/navigation';
import { PROJECTS_DATA } from '@/lib/resumeData';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Calendar, Cpu, CheckCircle2, ShieldAlert, Layers, Activity, Code2, Server } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const routeParams = useParams();
  const targetSlug = params?.slug || (routeParams?.slug as string);
  const project = PROJECTS_DATA.find((p) => p.slug === targetSlug || p.id === targetSlug);

  if (!project) {
    return (
      <div className="min-h-screen bg-dark-50 text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-slate-400 mb-6">The project you are looking for does not exist or has been moved.</p>
        <Link
          href="/#projects"
          className="px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold shadow-glow-blue"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-50 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Navigation Back Link */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 mb-10 bg-gradient-to-br from-slate-900/90 to-dark-100"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/15 border border-primary-500/30 text-xs font-mono font-semibold text-primary-400">
              <Calendar className="w-3.5 h-3.5" />
              Year {project.year}
            </span>
            {project.categories && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purpleAccent-500/15 border border-purpleAccent-500/30 text-xs font-mono font-semibold text-purpleAccent-400">
                <Activity className="w-3.5 h-3.5" />
                Edge AI Sound Classification
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="text-lg sm:text-xl font-medium text-gradient-blue mb-6">
              {project.subtitle}
            </p>
          )}

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-3xl">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-800">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors shadow-md"
              >
                <Github className="w-4.5 h-4.5" />
                <span>View Source Code on GitHub</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-10">
          {/* Overview */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
            <h2 className="text-lg font-mono font-bold text-primary-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5" /> Executive System Overview
            </h2>
            <p className="text-slate-200 text-base leading-relaxed">
              {project.overview}
            </p>
          </section>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="glass-card rounded-2xl p-6 border border-slate-800 bg-rose-950/10">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> The Problem Statement
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </section>

            <section className="glass-card rounded-2xl p-6 border border-slate-800 bg-emerald-950/10">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <Cpu className="w-5 h-5" /> Technical Solution
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </section>
          </div>

          {/* Features */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
            <h2 className="text-lg font-mono font-bold text-primary-400 uppercase tracking-wider mb-6">
              System Capabilities & Feature Matrix
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <CheckCircle2 className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-200">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Visual Architecture Diagram (Interactive Graphic Component) */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-900/80">
            <h2 className="text-lg font-mono font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Server className="w-5 h-5" /> System Architecture & Data Pipeline
            </h2>

            <div className="p-6 rounded-xl bg-dark-50 border border-slate-800 font-mono text-xs text-slate-300 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-primary-400 font-bold">1. Input Stream</span>
                <span>{project.slug.includes('safecare') ? 'INMP441 MEMS Microphones (24-bit audio)' : 'Multi-source Environmental & Health APIs'}</span>
              </div>
              <div className="text-center text-slate-600">↓</div>
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-slate-900 border border-purpleAccent-800/50">
                <span className="text-purpleAccent-400 font-bold">2. Feature Extraction / Processing</span>
                <span>{project.slug.includes('safecare') ? 'Librosa Spectrogram & MFCC Matrix Tensors' : 'Flask REST Engine & Predictive ML Pipelines'}</span>
              </div>
              <div className="text-center text-slate-600">↓</div>
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-slate-900 border border-emerald-800/50">
                <span className="text-emerald-400 font-bold">3. Output & Alert Dispatch</span>
                <span>{project.slug.includes('safecare') ? 'Raspberry Pi Zero 2 W Directional Amplification' : 'PWA Live Risk Map & Alerting Interface'}</span>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
            <h2 className="text-lg font-mono font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-purpleAccent-400" /> Technologies & Tools Employed
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-slate-200 bg-slate-900 border border-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
