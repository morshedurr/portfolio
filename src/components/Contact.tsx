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
    <section id="contact" className="relative py-20 bg-[#faf9f6] text-slate-800 border-t border-slate-200">
      <SectionEditOverlay sectionTab="profile" label="Edit Contact Information" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Section Header */}
        <div className="mb-14 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-sans mb-2">
            <Mail size={14} className="text-academic-blue" />
            <span>Academic Inquiries & Correspondence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Contact & Office Hours
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            For academic inquiries, research collaborations, student consultation, or speaking invitations, please reach out via departmental channels or the direct correspondence portal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Office & Institutional Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Landmark size={18} className="text-academic-blue" />
                <h3 className="font-serif font-bold text-slate-900 text-lg">
                  Faculty Office & Information
                </h3>
              </div>

              {/* Institution */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-sans mb-0.5">
                  Institution & Department
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  Daffodil International University
                </div>
                <div className="text-xs text-slate-600">
                  Department of Information Technology & Management (ITM)
                </div>
              </div>

              {/* Office Address */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-sans mb-0.5">
                  Campus Location
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <MapPin size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">{profile.location}</span>
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-sans mb-0.5">
                  Academic / Direct Email
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Mail size={14} className="text-academic-blue flex-shrink-0" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-academic-blue hover:underline font-mono"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-sans mb-0.5">
                  Phone / WhatsApp
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-mono">
                  <Phone size={14} className="text-slate-400 flex-shrink-0" />
                  <span>{profile.phone}</span>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-sans mb-0.5">
                  Scholarly / Professional Profile
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Linkedin size={14} className="text-academic-blue flex-shrink-0" />
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-academic-blue hover:underline"
                  >
                    linkedin.com/in/morshedur-rahman
                  </a>
                </div>
              </div>
            </div>

            {/* Formal CV Download Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50 text-academic-blue border border-blue-200/80 flex-shrink-0">
                  <FileText size={22} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-base">
                    Curriculum Vitae (CV)
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Download the comprehensive academic curriculum vitae detailing degrees, publications, teaching dossier, and references.
                  </p>
                  <a
                    href={profile.resumeUrl}
                    download
                    className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#0f1e36] text-white text-xs font-semibold hover:bg-[#1e3a8a] transition-colors"
                  >
                    <Download size={13} />
                    <span>Download CV Document (PDF)</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Academic Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <h3 className="font-serif font-bold text-slate-900 text-xl mb-1">
                Official Correspondence Portal
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Transmit a formal message or consultation request directly to Morshedur Rahman Khan.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-[#faf9f6] rounded-lg border border-emerald-200">
                  <CheckCircle2 size={36} className="text-emerald-600 mx-auto mb-3" />
                  <h4 className="font-serif font-bold text-slate-900 text-lg mb-1">
                    Correspondence Transmitted
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Thank you for reaching out. Your academic inquiry will be addressed promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g., Prof. Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 focus:border-academic-blue focus:ring-1 focus:ring-academic-blue outline-none text-slate-800 text-xs sm:text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Institutional Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g., s.jenkins@university.edu"
                        className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 focus:border-academic-blue focus:ring-1 focus:ring-academic-blue outline-none text-slate-800 text-xs sm:text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Institution / Organization
                      </label>
                      <input
                        type="text"
                        value={formState.affiliation}
                        onChange={(e) => setFormState({ ...formState, affiliation: e.target.value })}
                        placeholder="e.g., Department of MIS, University"
                        className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 focus:border-academic-blue focus:ring-1 focus:ring-academic-blue outline-none text-slate-800 text-xs sm:text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Inquiry Purpose
                      </label>
                      <select
                        value={formState.purpose}
                        onChange={(e) => setFormState({ ...formState, purpose: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 focus:border-academic-blue focus:ring-1 focus:ring-academic-blue outline-none text-slate-800 text-xs sm:text-sm transition-all bg-white"
                      >
                        <option value="Academic Collaboration">Academic & Research Collaboration</option>
                        <option value="Student Advising">Student Advising & Mentorship</option>
                        <option value="Speaking / Guest Lecture">Guest Lecture / Conference Invitation</option>
                        <option value="Consulting">Technology & MIS Consulting</option>
                        <option value="General Inquiry">General Correspondence</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Message Content *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Please outline the nature of your inquiry, academic initiative, or collaboration proposal..."
                      className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 focus:border-academic-blue focus:ring-1 focus:ring-academic-blue outline-none text-slate-800 text-xs sm:text-sm transition-all"
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#0f1e36] text-white text-xs sm:text-sm font-semibold hover:bg-[#1e3a8a] transition-colors shadow-xs"
                    >
                      <Send size={13} />
                      <span>Transmit Correspondence</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};