'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FileDown, Eye, X, ExternalLink, Download, Layout, FileCode2 } from 'lucide-react';
import { PERSONAL_INFO, SKILLS_DATA, EXPERIENCE_DATA, PROJECTS_DATA, CERTIFICATIONS_DATA, ACHIEVEMENTS_DATA } from '@/lib/resumeData';

export default function ResumeSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'document' | 'pdf'>('document');

  return (
    <section id="resume" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary-400 uppercase mb-2">
            07 // Curriculum Vitae
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Official <span className="text-gradient-blue">Resume</span>
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Detailed breakdown of academics, projects, technical skills, internship experiences, and achievements.
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-purpleAccent-500 mx-auto rounded-full" />
        </div>

        {/* Resume Banner Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto glass-card rounded-3xl p-8 sm:p-12 border border-slate-700/80 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-dark-100 to-slate-900/95"
        >
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            {/* Resume Info */}
            <div className="text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/15 border border-primary-500/30 text-xs font-mono font-semibold text-primary-400">
                <FileText className="w-3.5 h-3.5" />
                <span>Official PDF & Digital Format</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-white">
                {PERSONAL_INFO.name} - Resume
              </h4>
              <p className="text-slate-300 text-sm max-w-lg leading-relaxed">
                Computer Science & Engineering Student | Software Developer | AI/ML Enthusiast
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-100 bg-slate-800/90 hover:bg-slate-700 border border-slate-700/90 transition-all shadow-md"
              >
                <Eye className="w-4.5 h-4.5 text-cyan-400" />
                <span>View Resume</span>
              </button>

              <a
                href="/api/resume"
                download="HASIN_F_Resume.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary-600 to-purpleAccent-600 hover:from-primary-500 hover:to-purpleAccent-500 shadow-glow-blue hover:shadow-glow-purple transition-all"
              >
                <Download className="w-4.5 h-4.5" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Accessible Resume Viewer Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl h-[88vh] glass-card rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden bg-dark-100"
            >
              {/* Modal Top Bar */}
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm font-mono text-slate-200 font-bold">
                    <FileText className="w-4 h-4 text-primary-400" />
                    <span>HASIN_F_Resume</span>
                  </div>

                  {/* Mode Selector Tabs */}
                  <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700 text-xs font-mono">
                    <button
                      onClick={() => setViewMode('document')}
                      className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                        viewMode === 'document' ? 'bg-primary-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Layout className="w-3.5 h-3.5" />
                      <span>Document View</span>
                    </button>
                    <button
                      onClick={() => setViewMode('pdf')}
                      className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                        viewMode === 'pdf' ? 'bg-primary-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <FileCode2 className="w-3.5 h-3.5" />
                      <span>PDF View</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="/api/resume?inline=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 border border-slate-700"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in New Tab</span>
                  </a>
                  <a
                    href="/api/resume"
                    download="HASIN_F_Resume.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-primary-600 hover:bg-primary-500"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="flex-1 bg-slate-950 overflow-y-auto p-4 sm:p-8">
                {viewMode === 'document' ? (
                  /* High-Resolution Document Render */
                  <div className="max-w-3xl mx-auto bg-white text-slate-900 rounded-xl p-8 sm:p-12 shadow-2xl space-y-6 text-sm font-sans leading-normal border border-slate-200 selection:bg-blue-100">
                    {/* Document Header */}
                    <div className="text-center pb-6 border-b border-slate-300">
                      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">HASIN F</h1>
                      <p className="text-xs text-slate-700 font-medium space-x-3">
                        <span>+91 9344475074</span>
                        <span>•</span>
                        <a href="mailto:hasinfarukjan@gmail.com" className="text-blue-700 hover:underline">hasinfarukjan@gmail.com</a>
                        <span>•</span>
                        <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">linkedin.com/in/hasin-f</a>
                        <span>•</span>
                        <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">github.com/hasinfarukjan2006</a>
                      </p>
                    </div>

                    {/* Professional Summary */}
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-800 mb-2">
                        Professional Summary
                      </h2>
                      <p className="text-xs text-slate-800 leading-relaxed">
                        {PERSONAL_INFO.shortBio} Experienced in developing responsive web applications and AI-enabled systems through internships, academic projects, hackathons, and technical training. Seeking software engineering, full-stack development, AI/ML, or data-oriented roles to apply programming, problem-solving, and system-development skills.
                      </p>
                    </div>

                    {/* Education */}
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-800 mb-3">
                        Education
                      </h2>
                      <div className="space-y-3 text-xs">
                        <div>
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>{PERSONAL_INFO.education.institution}</span>
                            <span>{PERSONAL_INFO.education.period}</span>
                          </div>
                          <div className="flex justify-between text-slate-700 italic">
                            <span>{PERSONAL_INFO.education.degree}</span>
                            <span className="font-semibold text-slate-900 font-mono">CGPA: {PERSONAL_INFO.education.cgpa}</span>
                          </div>
                        </div>

                        {PERSONAL_INFO.education.schools?.map((sch) => (
                          <div key={sch.institution}>
                            <div className="flex justify-between font-bold text-slate-900">
                              <span>{sch.institution}</span>
                              <span>{sch.year}</span>
                            </div>
                            <div className="flex justify-between text-slate-700 italic">
                              <span>{sch.qualification}</span>
                              <span className="font-semibold text-slate-900 font-mono">{sch.score}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Skills */}
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-800 mb-3">
                        Technical Skills
                      </h2>
                      <div className="space-y-1.5 text-xs text-slate-800">
                        {SKILLS_DATA.map((cat) => (
                          <div key={cat.category} className="grid grid-cols-12">
                            <span className="col-span-3 font-bold text-slate-900">{cat.category}:</span>
                            <span className="col-span-9">{cat.skills.join(', ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Internship Experience */}
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-800 mb-3">
                        Internship Experience
                      </h2>
                      <div className="space-y-4 text-xs">
                        {EXPERIENCE_DATA.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between font-bold text-slate-900">
                              <span>{exp.company}</span>
                              <span>{exp.duration}</span>
                            </div>
                            <div className="flex justify-between text-slate-700 italic mb-1.5">
                              <span>{exp.role}</span>
                              <span>{exp.location}</span>
                            </div>
                            <ul className="list-disc list-outside pl-4 space-y-1 text-slate-800">
                              {exp.responsibilities.map((resp, rIdx) => (
                                <li key={rIdx}>{resp}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-800 mb-3">
                        Projects
                      </h2>
                      <div className="space-y-4 text-xs">
                        {PROJECTS_DATA.map((proj) => (
                          <div key={proj.id}>
                            <div className="flex justify-between font-bold text-slate-900">
                              <span>{proj.title} {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-blue-700 font-normal hover:underline">[GitHub]</a>}</span>
                              <span>{proj.year}</span>
                            </div>
                            <p className="font-semibold text-slate-800 mt-0.5">
                              Tech Stack: <span className="font-normal text-slate-700">{proj.techStack.join(', ')}</span>
                            </p>
                            <ul className="list-disc list-outside pl-4 space-y-1 text-slate-800 mt-1">
                              {proj.features.map((feat, fIdx) => (
                                <li key={fIdx}>{feat}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-800 mb-2">
                        Certifications
                      </h2>
                      <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-800">
                        {CERTIFICATIONS_DATA.map((cert) => (
                          <li key={cert.id}>
                            <span className="font-bold">{cert.title}</span> – {cert.issuer} {cert.grade && `(${cert.grade}, ${cert.score})`}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Achievements & Activities */}
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-800 mb-2">
                        Achievements & Activities
                      </h2>
                      <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-800">
                        {ACHIEVEMENTS_DATA.map((ach) => (
                          <li key={ach.id}>
                            <span className="font-bold">{ach.title}</span> – {ach.detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  /* Native PDF Embed View */
                  <div className="w-full h-full min-h-[70vh] bg-slate-900 rounded-xl overflow-hidden">
                    <iframe
                      src="/resume.pdf#toolbar=1"
                      className="w-full h-full border-none min-h-[70vh]"
                      title="HASIN F Resume Preview"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
