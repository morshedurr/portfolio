import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Send, Download, Globe, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
};

export const Contact = () => {
  const { data, showToast } = usePortfolio();
  const { profile } = data;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    purpose: 'Academic Collaboration',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      showToast('Please complete all required fields.');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been transmitted successfully.');
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', purpose: 'Academic Collaboration', message: '' });
    }, 4000);
  };

  const contactItems = [
    {
      icon: <Mail size={18} className="text-[#1E3A8A]" />,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: <Phone size={18} className="text-[#1E3A8A]" />,
      label: 'Phone / WhatsApp',
      value: profile.phone,
      href: undefined,
    },
    {
      icon: <MapPin size={18} className="text-[#1E3A8A]" />,
      label: 'Location',
      value: profile.location,
      href: undefined,
    },
    {
      icon: <Linkedin size={18} className="text-[#1E3A8A]" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/morshedur-rahman',
      href: profile.linkedin,
    },
    {
      icon: <Globe size={18} className="text-[#1E3A8A]" />,
      label: 'Website',
      value: profile.website || 'Faculty Profile',
      href: profile.website,
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-[#FAFAF8] border-t border-slate-200">
      <SectionEditOverlay sectionTab="profile" label="Edit Contact Information" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#B45309] font-sans mb-3">
            Get In Touch
          </p>
          <h2 className="section-header text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Contact
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: Contact Info Cards */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              I am always open to discussing academic initiatives, student mentorship, and technological consulting. Reach out directly or via the form.
            </p>

            {contactItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100 flex-shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-sans mb-0.5">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="text-sm font-medium text-slate-800 hover:text-[#1E3A8A] transition-colors truncate block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-slate-800 truncate block">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* CV download */}
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-lg bg-[#1E3A8A] text-white text-sm font-semibold hover:bg-[#1E40AF] transition-all duration-200 shadow-sm"
            >
              <Download size={15} />
              <span>Download CV (PDF)</span>
            </a>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
          >
            <div
              className="rounded-2xl p-8 bg-white border border-slate-200"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-xl mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-sm text-slate-500 max-w-xs">
                    Thank you for reaching out. Your inquiry has been received and will be addressed promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 outline-none text-slate-900 text-sm transition-all bg-slate-50/50 placeholder:text-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="john@university.edu"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 outline-none text-slate-900 text-sm transition-all bg-slate-50/50 placeholder:text-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Purpose of Inquiry
                    </label>
                    <select
                      value={formState.purpose}
                      onChange={(e) => setFormState({ ...formState, purpose: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 outline-none text-slate-900 text-sm transition-all bg-slate-50/50 cursor-pointer"
                    >
                      <option value="Academic Collaboration">Academic & Research Collaboration</option>
                      <option value="Student Advising">Student Advising & Mentorship</option>
                      <option value="Speaking / Guest Lecture">Guest Lecture / Conference Invitation</option>
                      <option value="Consulting">Technology & MIS Consulting</option>
                      <option value="General Inquiry">General Correspondence</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hello Morshedur, I would like to discuss..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 outline-none text-slate-900 text-sm transition-all resize-none bg-slate-50/50 placeholder:text-slate-300"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-[#1E3A8A] text-white text-sm font-bold tracking-wide hover:bg-[#1E40AF] transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <span>Send Message</span>
                    <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
