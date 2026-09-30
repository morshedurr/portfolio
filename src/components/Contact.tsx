import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, Download, Landmark, FileText, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

export const Contact = () => {
  const { data, showToast } = usePortfolio();
  const { profile } = data;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    affiliation: '',
    purpose: 'Academic Collaboration',
    message: ''
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
      setFormState({ name: '', email: '', affiliation: '', purpose: 'Academic Collaboration', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#fdfcfb] text-slate-800 border-t border-slate-200">
      <SectionEditOverlay sectionTab="profile" label="Edit Contact Information" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Big Headline & Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest font-sans">
                <Mail size={12} />
                <span>Academic Inquiries</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-serif font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                Let's discuss <br />
                <span className="text-academic-blue italic font-light">research & collaboration.</span>
              </h2>
              <p className="text-base text-slate-600 max-w-md leading-relaxed font-sans">
                I am always open to discussing academic initiatives, student mentorship, and technological consulting. Reach out directly or via the form.
              </p>
            </div>

            <div className="mt-12 space-y-8">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-sans">Email</span>
                <a href={`mailto:${profile.email}`} className="text-xl font-medium text-slate-900 hover:text-academic-blue transition-colors">
                  {profile.email}
                </a>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-sans">Phone / WhatsApp</span>
                <span className="text-xl font-medium text-slate-900">
                  {profile.phone}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-sans">Location</span>
                <span className="text-base font-medium text-slate-800 leading-snug max-w-sm">
                  {profile.location} <br />
                  <span className="text-slate-500 font-normal">Department of Information Technology & Management</span>
                </span>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-academic-blue hover:text-white transition-all duration-300"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={profile.resumeUrl}
                  download
                  className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-academic-blue hover:text-white transition-all duration-300"
                  title="Download CV"
                >
                  <Download size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Form */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-emerald-500" />
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-2xl mb-3">
                  Message Transmitted
                </h4>
                <p className="text-base text-slate-600 max-w-xs">
                  Thank you for reaching out. Your academic inquiry has been received and will be addressed promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 font-sans">
                
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                    What's your name?
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-1 py-3 bg-transparent border-b-2 border-slate-200 focus:border-academic-blue outline-none text-slate-900 text-lg transition-colors placeholder:text-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Your institutional email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@university.edu"
                    className="w-full px-1 py-3 bg-transparent border-b-2 border-slate-200 focus:border-academic-blue outline-none text-slate-900 text-lg transition-colors placeholder:text-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Purpose of Inquiry
                  </label>
                  <select
                    value={formState.purpose}
                    onChange={(e) => setFormState({ ...formState, purpose: e.target.value })}
                    className="w-full px-1 py-3 bg-transparent border-b-2 border-slate-200 focus:border-academic-blue outline-none text-slate-900 text-lg transition-colors cursor-pointer"
                  >
                    <option value="Academic Collaboration">Academic & Research Collaboration</option>
                    <option value="Student Advising">Student Advising & Mentorship</option>
                    <option value="Speaking / Guest Lecture">Guest Lecture / Conference Invitation</option>
                    <option value="Consulting">Technology & MIS Consulting</option>
                    <option value="General Inquiry">General Correspondence</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hello Morshedur, I would like to discuss..."
                    className="w-full px-1 py-3 bg-transparent border-b-2 border-slate-200 focus:border-academic-blue outline-none text-slate-900 text-lg transition-colors resize-none placeholder:text-slate-300"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-slate-900 text-white text-sm font-bold tracking-wide uppercase hover:bg-academic-blue transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-academic-blue/20"
                  >
                    <span>Send Message</span>
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};