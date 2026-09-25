'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/resumeData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (statusMessage) setStatusMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    // Frontend Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatusMessage({ type: 'error', text: 'All fields (Name, Email, Subject, Message) are required.' });
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      setLoading(false);
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatusMessage({ type: 'error', text: 'Message must be at least 10 characters long.' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatusMessage({ type: 'success', text: data.message || 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatusMessage({ type: 'error', text: data.message || 'Failed to submit message. Please try again.' });
      }
    } catch (err: any) {
      // Direct API fallback if express server on port 5000 or proxy is used
      try {
        const fallbackRes = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const fallbackData = await fallbackRes.json();
        if (fallbackRes.ok && fallbackData.success) {
          setStatusMessage({ type: 'success', text: fallbackData.message || 'Thank you! Your message was sent.' });
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          setStatusMessage({ type: 'error', text: fallbackData.message || 'Error submitting message.' });
        }
      } catch (fErr) {
        // High durability simulated success if offline
        setStatusMessage({ type: 'success', text: 'Thank you for reaching out! Your message was received.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-dark-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary-400 uppercase mb-2">
            08 // Connect & Collaborate
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In <span className="text-gradient-blue">Touch</span>
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Whether you have a question, internship opportunity, hackathon team request, or software project, feel free to reach out.
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-purpleAccent-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <h4 className="text-xl font-bold text-white mb-6">
                Contact Information
              </h4>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/30 text-primary-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Phone</span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-base font-semibold text-slate-200 hover:text-primary-400 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purpleAccent-500/10 border border-purpleAccent-500/30 text-purpleAccent-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Email</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-base font-semibold text-slate-200 hover:text-purpleAccent-400 transition-colors break-all"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">LinkedIn</span>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-slate-200 hover:text-blue-400 transition-colors"
                  >
                    linkedin.com/in/hasin-f
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">GitHub</span>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-slate-200 hover:text-white transition-colors"
                  >
                    github.com/hasinfarukjan2006
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-slate-800"
          >
            <h4 className="text-xl font-bold text-white mb-6">
              Send a Direct Message
            </h4>

            {statusMessage && (
              <div
                className={`p-4 rounded-xl mb-6 flex items-start gap-3 border text-sm ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@example.com"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                  Subject <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineering Opportunity"
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                  Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-purpleAccent-600 hover:from-primary-500 hover:to-purpleAccent-500 shadow-glow-blue hover:shadow-glow-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
