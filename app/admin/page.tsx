'use client';

import { useState, useEffect } from 'react';
import { PROJECTS_DATA, CERTIFICATIONS_DATA, ACHIEVEMENTS_DATA, EXPERIENCE_DATA, ProjectItem, CertificationItem, AchievementItem, ExperienceItem } from '@/lib/resumeData';
import { Lock, LogOut, Plus, Trash2, Edit, Star, Shield, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'projects' | 'certifications' | 'achievements' | 'experience' | 'contact'>('projects');

  // Local state initialized with resume data for live CRUD management
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(PROJECTS_DATA);
  const [certificationsList, setCertificationsList] = useState<CertificationItem[]>(CERTIFICATIONS_DATA);
  const [achievementsList, setAchievementsList] = useState<AchievementItem[]>(ACHIEVEMENTS_DATA);
  const [experienceList, setExperienceList] = useState<ExperienceItem[]>(EXPERIENCE_DATA);
  const [messagesList, setMessagesList] = useState<any[]>([]);

  // Form modals state
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectYear, setNewProjectYear] = useState('2026');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');

  const [newAchTitle, setNewAchTitle] = useState('');
  const [newAchDetail, setNewAchDetail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('hasin_admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('hasin_admin_token', 'sample_admin_token_2026');
      setIsAuthenticated(true);
    } else {
      setLoginError('Invalid username or password. Default admin: admin / admin123');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('hasin_admin_token');
    setIsAuthenticated(false);
  };

  const toggleFeaturedProject = (id: string) => {
    setProjectsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjectsList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;

    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      slug: newProjectTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newProjectTitle,
      year: newProjectYear,
      description: newProjectDesc,
      overview: newProjectDesc,
      problem: 'Identified efficiency gap.',
      solution: 'Developed modular solution.',
      techStack: ['React.js', 'Node.js', 'TypeScript'],
      features: ['Interactive Workflow'],
      featured: true,
    };

    setProjectsList([newProj, ...projectsList]);
    setNewProjectTitle('');
    setNewProjectDesc('');
  };

  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertTitle.trim() || !newCertIssuer.trim()) return;

    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: newCertTitle,
      issuer: newCertIssuer,
    };

    setCertificationsList([...certificationsList, newCert]);
    setNewCertTitle('');
    setNewCertIssuer('');
  };

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAchTitle.trim() || !newAchDetail.trim()) return;

    const newAch: AchievementItem = {
      id: `ach-${Date.now()}`,
      title: newAchTitle,
      detail: newAchDetail,
      type: 'Competition',
    };

    setAchievementsList([...achievementsList, newAch]);
    setNewAchTitle('');
    setNewAchDetail('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-50 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-slate-800 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary-600/20 border border-primary-500/40 text-primary-400 flex items-center justify-center mx-auto mb-3 shadow-glow-blue">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Admin Authentication</h1>
            <p className="text-xs text-slate-400 mt-1">HASIN F Portfolio Management Portal</p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-primary-600 hover:bg-primary-500 shadow-glow-blue transition-colors mt-2"
            >
              Sign In to Admin Portal
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <Link href="/" className="text-xs font-mono text-slate-400 hover:text-white transition-colors">
              ← Return to Main Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-50 text-slate-100 flex flex-col">
      {/* Admin Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">HASIN F - Admin Dashboard</h1>
            <p className="text-[11px] text-slate-400 font-mono">Portfolio Content & Data Management</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-mono text-slate-300 hover:text-white">
            View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="glass-card rounded-xl p-3 border border-slate-800 space-y-1">
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                activeTab === 'projects' ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Projects ({projectsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certifications')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                activeTab === 'certifications' ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Certifications ({certificationsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('achievements')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                activeTab === 'achievements' ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Achievements ({achievementsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                activeTab === 'experience' ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Experience ({experienceList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                activeTab === 'contact' ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Contact Messages</span>
            </button>
          </div>
        </aside>

        {/* Main Content Tab Panel */}
        <main className="lg:col-span-9 space-y-6">
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Add Project Form */}
              <div className="glass-card rounded-2xl p-6 border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary-400" /> Add New Project
                </h3>
                <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Project Title"
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Year"
                    value={newProjectYear}
                    onChange={(e) => setNewProjectYear(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    placeholder="Description"
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="md:col-span-2 py-2.5 rounded-xl font-semibold text-sm text-white bg-primary-600 hover:bg-primary-500 shadow-glow-blue transition-colors"
                  >
                    Save Project to Database
                  </button>
                </form>
              </div>

              {/* Projects Table */}
              <div className="glass-card rounded-2xl p-6 border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4">Manage Projects</h3>
                <div className="space-y-3">
                  {projectsList.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-base font-bold text-white">{proj.title} ({proj.year})</h4>
                        <p className="text-xs text-slate-400 line-clamp-1">{proj.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => toggleFeaturedProject(proj.id)}
                          className={`p-2 rounded-lg border text-xs font-semibold ${
                            proj.featured
                              ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                        <button
                          onClick={() => deleteProject(proj.id)}
                          className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary-400" /> Add Certification
                </h3>
                <form onSubmit={handleAddCertification} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Certification Title"
                    value={newCertTitle}
                    onChange={(e) => setNewCertTitle(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Issuer Organization"
                    value={newCertIssuer}
                    onChange={(e) => setNewCertIssuer(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                  <button
                    type="submit"
                    className="md:col-span-2 py-2.5 rounded-xl font-semibold text-sm text-white bg-primary-600 hover:bg-primary-500"
                  >
                    Add Certification
                  </button>
                </form>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white mb-4">Certifications List</h3>
                {certificationsList.map((cert) => (
                  <div key={cert.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                      <p className="text-xs text-slate-400">{cert.issuer}</p>
                    </div>
                    <button
                      onClick={() => setCertificationsList(certificationsList.filter((c) => c.id !== cert.id))}
                      className="p-1.5 text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4">Add Achievement</h3>
                <form onSubmit={handleAddAchievement} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Achievement Title"
                    value={newAchTitle}
                    onChange={(e) => setNewAchTitle(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Details / Rank"
                    value={newAchDetail}
                    onChange={(e) => setNewAchDetail(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                  <button
                    type="submit"
                    className="md:col-span-2 py-2.5 rounded-xl font-semibold text-sm text-white bg-primary-600 hover:bg-primary-500"
                  >
                    Add Achievement
                  </button>
                </form>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white mb-4">Achievements List</h3>
                {achievementsList.map((ach) => (
                  <div key={ach.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                      <p className="text-xs text-slate-400">{ach.detail}</p>
                    </div>
                    <button
                      onClick={() => setAchievementsList(achievementsList.filter((a) => a.id !== ach.id))}
                      className="p-1.5 text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Internship Experience</h3>
              {experienceList.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="text-base font-bold text-white">{exp.role} @ {exp.company}</h4>
                  <p className="text-xs font-mono text-primary-400 mb-2">{exp.duration} • {exp.location}</p>
                  <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="glass-card rounded-2xl p-6 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary-400" /> Received Contact Messages
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Submissions from the portfolio contact form.
              </p>

              {messagesList.length === 0 ? (
                <div className="p-8 text-center bg-slate-900/50 rounded-xl border border-slate-800 text-slate-400 text-sm">
                  No contact messages received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {messagesList.map((msg, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex justify-between items-center text-xs font-mono text-primary-400">
                        <span>{msg.name} ({msg.email})</span>
                        <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h5 className="text-sm font-bold text-white">{msg.subject}</h5>
                      <p className="text-xs text-slate-300">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
