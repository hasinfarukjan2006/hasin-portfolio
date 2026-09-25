'use client';

import { useState, useEffect } from 'react';
import { PROJECTS_DATA, CERTIFICATIONS_DATA, ACHIEVEMENTS_DATA, EXPERIENCE_DATA, ProjectItem, CertificationItem, AchievementItem, ExperienceItem } from '@/lib/resumeData';
import {
  Lock, LogOut, Plus, Trash2, Edit, Star, Shield, Mail, CheckCircle2, AlertCircle,
  RefreshCw, Search, Reply, ExternalLink, MailOpen, Calendar, User, Clock, Inbox, Filter
} from 'lucide-react';
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
  
  // Mail Inbox state
  const [messagesList, setMessagesList] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'unread' | 'starred'>('all');
  const [replyText, setReplyText] = useState('');

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

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.data)) {
        setMessagesList(data.data);
        if (data.data.length > 0 && !selectedMessageId) {
          setSelectedMessageId(data.data[0].id || data.data[0]._id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch contact messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

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

  // Mail Operations
  const markAsRead = async (msgId: string, currentReadStatus: boolean) => {
    const newRead = !currentReadStatus;
    setMessagesList((prev) =>
      prev.map((m) => ((m.id === msgId || m._id === msgId) ? { ...m, read: newRead } : m))
    );
    try {
      await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: msgId, read: newRead }),
      });
    } catch (err) {
      console.error('Failed to update message status:', err);
    }
  };

  const toggleStar = async (msgId: string, currentStarredStatus: boolean) => {
    const newStarred = !currentStarredStatus;
    setMessagesList((prev) =>
      prev.map((m) => ((m.id === msgId || m._id === msgId) ? { ...m, starred: newStarred } : m))
    );
    try {
      await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: msgId, starred: newStarred }),
      });
    } catch (err) {
      console.error('Failed to update star status:', err);
    }
  };

  const deleteMessage = async (msgId: string) => {
    setMessagesList((prev) => prev.filter((m) => (m.id !== msgId && m._id !== msgId)));
    if (selectedMessageId === msgId) {
      const remaining = messagesList.filter((m) => (m.id !== msgId && m._id !== msgId));
      setSelectedMessageId(remaining.length > 0 ? (remaining[0].id || remaining[0]._id) : null);
    }
    try {
      await fetch(`/api/contact?id=${msgId}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  const selectMessage = (msg: any) => {
    const msgId = msg.id || msg._id;
    setSelectedMessageId(msgId);
    if (!msg.read) {
      markAsRead(msgId, false);
    }
  };

  // Filtered messages list
  const filteredMessages = messagesList.filter((msg) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      msg.name?.toLowerCase().includes(query) ||
      msg.email?.toLowerCase().includes(query) ||
      msg.subject?.toLowerCase().includes(query) ||
      msg.message?.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    if (filterTab === 'unread') return !msg.read;
    if (filterTab === 'starred') return !!msg.starred;
    return true;
  });

  const selectedMsg = messagesList.find((m) => (m.id === selectedMessageId || m._id === selectedMessageId));
  const unreadCount = messagesList.filter((m) => !m.read).length;
  const starredCount = messagesList.filter((m) => m.starred).length;

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
            <p className="text-[11px] text-slate-400 font-mono">Portfolio Content & Mail Management</p>
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
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Mail Inbox</span>
              </span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary-500 text-white animate-pulse">
                  {unreadCount}
                </span>
              )}
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

          {/* Contact Mail Inbox Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              {/* Top Header & Search Bar */}
              <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary-400" /> Mail Inbox
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {messagesList.length} Messages
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Contact form submissions are delivered directly to your Gmail inbox (<code className="text-primary-400 font-mono">hasinfarukjan@gmail.com</code>) and synced here.
                  </p>
                </div>

                <button
                  onClick={fetchMessages}
                  disabled={loadingMessages}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingMessages ? 'animate-spin' : ''}`} />
                  <span>Refresh Inbox</span>
                </button>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Search Box */}
                <div className="md:col-span-6 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by sender, email, or subject..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-all"
                  />
                </div>

                {/* Filter Tabs */}
                <div className="md:col-span-6 flex items-center gap-2 justify-start md:justify-end">
                  <button
                    onClick={() => setFilterTab('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      filterTab === 'all'
                        ? 'bg-primary-600 text-white font-semibold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    All ({messagesList.length})
                  </button>
                  <button
                    onClick={() => setFilterTab('unread')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      filterTab === 'unread'
                        ? 'bg-primary-600 text-white font-semibold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>Unread</span>
                    {unreadCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-primary-400 text-dark-100 text-[10px] font-bold flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setFilterTab('starred')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      filterTab === 'starred'
                        ? 'bg-amber-600 text-white font-semibold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Star className="w-3 h-3 fill-current text-amber-400" />
                    <span>Starred ({starredCount})</span>
                  </button>
                </div>
              </div>

              {/* Split View Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[520px]">
                {/* Left Panel: Inbox List */}
                <div className="lg:col-span-5 glass-card rounded-2xl p-3 border border-slate-800 flex flex-col h-[520px] overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>INBOX LIST</span>
                    <span>{filteredMessages.length} Messages</span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2 p-1 mt-2 pr-1 custom-scrollbar">
                    {filteredMessages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                        <Inbox className="w-10 h-10 text-slate-600 mb-2" />
                        <p className="text-xs">No emails match your filter.</p>
                      </div>
                    ) : (
                      filteredMessages.map((msg) => {
                        const msgId = msg.id || msg._id;
                        const isSelected = selectedMessageId === msgId;
                        const initial = msg.name ? msg.name.charAt(0).toUpperCase() : 'M';
                        const timeString = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const dateString = new Date(msg.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' });

                        return (
                          <div
                            key={msgId}
                            onClick={() => selectMessage(msg)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                              isSelected
                                ? 'bg-primary-600/15 border-primary-500/60 shadow-glow-blue'
                                : msg.read
                                ? 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60'
                                : 'bg-slate-900 border-primary-500/30 hover:bg-slate-800/80'
                            }`}
                          >
                            {!msg.read && (
                              <div className="absolute top-3.5 right-3 w-2 h-2 rounded-full bg-primary-400 ring-4 ring-primary-500/20" />
                            )}

                            <div className="flex items-start gap-3">
                              {/* Avatar */}
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-purpleAccent-600 text-white font-bold flex items-center justify-center shrink-0 shadow-md text-sm">
                                {initial}
                              </div>

                              <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                  <h4 className={`text-xs truncate ${!msg.read ? 'font-extrabold text-white' : 'font-semibold text-slate-200'}`}>
                                    {msg.name}
                                  </h4>
                                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                    {dateString}
                                  </span>
                                </div>

                                <h5 className={`text-xs truncate mb-1 ${!msg.read ? 'font-bold text-primary-300' : 'text-slate-300'}`}>
                                  {msg.subject}
                                </h5>

                                <p className="text-[11px] text-slate-400 line-clamp-1">
                                  {msg.message}
                                </p>
                              </div>

                              {/* Star button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStar(msgId, !!msg.starred);
                                }}
                                className="text-slate-500 hover:text-amber-400 transition-colors p-1"
                              >
                                <Star className={`w-3.5 h-3.5 ${msg.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right Panel: Email Detail Reader */}
                <div className="lg:col-span-7 glass-card rounded-2xl p-6 border border-slate-800 flex flex-col h-[520px]">
                  {selectedMsg ? (
                    <div className="flex flex-col h-full overflow-hidden">
                      {/* Reader Action Toolbar */}
                      <div className="pb-4 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleStar(selectedMsg.id || selectedMsg._id, !!selectedMsg.starred)}
                            className={`p-2 rounded-lg border text-xs font-semibold transition-colors ${
                              selectedMsg.starred
                                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                            }`}
                            title="Star Email"
                          >
                            <Star className={`w-4 h-4 ${selectedMsg.starred ? 'fill-current' : ''}`} />
                          </button>

                          <button
                            onClick={() => markAsRead(selectedMsg.id || selectedMsg._id, !!selectedMsg.read)}
                            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
                            title={selectedMsg.read ? 'Mark as Unread' : 'Mark as Read'}
                          >
                            <MailOpen className="w-4 h-4" />
                            <span className="hidden sm:inline text-xs">{selectedMsg.read ? 'Mark Unread' : 'Mark Read'}</span>
                          </button>

                          <button
                            onClick={() => deleteMessage(selectedMsg.id || selectedMsg._id)}
                            className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs flex items-center gap-1.5 transition-colors"
                            title="Delete Email"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <a
                          href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject)}&body=${encodeURIComponent('\n\n--- Original Message ---\nFrom: ' + selectedMsg.name + ' <' + selectedMsg.email + '>\n' + selectedMsg.message)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-primary-600 hover:bg-primary-500 shadow-glow-blue transition-colors shrink-0"
                        >
                          <Reply className="w-3.5 h-3.5" />
                          <span>Reply via Email Client</span>
                        </a>
                      </div>

                      {/* Message Detail Content (Scrollable) */}
                      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 custom-scrollbar">
                        {/* Subject Title */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-primary-500/10 border border-primary-500/30 text-primary-400 font-bold uppercase">
                              Portfolio Contact
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              {new Date(selectedMsg.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <h2 className="text-xl font-extrabold text-white tracking-tight">
                            {selectedMsg.subject}
                          </h2>
                        </div>

                        {/* Sender Card */}
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purpleAccent-600 text-white font-bold flex items-center justify-center shrink-0 shadow-lg text-base">
                              {selectedMsg.name ? selectedMsg.name.charAt(0).toUpperCase() : 'M'}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                {selectedMsg.name}
                                <span className="text-xs font-normal text-slate-400 font-mono">
                                  &lt;{selectedMsg.email}&gt;
                                </span>
                              </h4>
                              <p className="text-xs text-slate-400">
                                To: <span className="text-slate-200">HASIN F</span> &lt;hasinfarukjan@gmail.com&gt;
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Message Body Box */}
                        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans min-h-[140px] shadow-inner border-l-4 border-l-primary-500">
                          {selectedMsg.message}
                        </div>

                        {/* Quick Reply Form */}
                        <div className="pt-2 border-t border-slate-800/80">
                          <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium flex items-center gap-1.5">
                            <Reply className="w-3.5 h-3.5 text-primary-400" />
                            <span>Quick Reply Note</span>
                          </label>
                          <textarea
                            rows={3}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Type your reply to ${selectedMsg.name}...`}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-all resize-y"
                          />
                          <div className="mt-2 flex justify-end">
                            <a
                              href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject)}&body=${encodeURIComponent(replyText + '\n\n--- Original Message ---\nFrom: ' + selectedMsg.name + '\n' + selectedMsg.message)}`}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-purpleAccent-600 hover:bg-purpleAccent-500 transition-colors shadow-glow-purple"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Send Reply to {selectedMsg.name}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                      <Inbox className="w-14 h-14 text-slate-700 mb-3 animate-pulse" />
                      <h4 className="text-base font-bold text-slate-300">No Email Selected</h4>
                      <p className="text-xs text-slate-500 max-w-xs mt-1">
                        Select a contact message from the inbox list on the left to read its full contents and reply.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
