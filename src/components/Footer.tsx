import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Download, FileText, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Faculty Masthead' },
    { id: 'about', label: 'About & Bio' },
    { id: 'teaching', label: 'Teaching & Pedagogy' },
    { id: 'research', label: 'Research & Inquiries' },
    { id: 'education', label: 'Education & Degrees' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'awards', label: 'Awards & Honours' },
    { id: 'projects', label: 'Projects' },
    { id: 'references', label: 'References' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-[#0b172a] text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">

          {/* Col 1: Identity + Bio */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-serif font-bold text-sm shadow-sm">
                MRK
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-white leading-tight">
                  {profile.name}
                </h3>
                <p className="text-xs text-slate-400">
                  Lecturer in Information Technology & Management
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Faculty member at Daffodil International University and Erasmus+ KA171 Fellow (Sweden). Dedicated to active-learning pedagogy, MIS enterprise architecture, and empirical business analytics research.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-[#1E3A8A] text-slate-300 hover:text-white transition-all duration-200"
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg bg-white/10 hover:bg-[#1E3A8A] text-slate-300 hover:text-white transition-all duration-200"
                title="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href={profile.resumeUrl}
                download
                className="p-2 rounded-lg bg-white/10 hover:bg-[#B45309] text-slate-300 hover:text-white transition-all duration-200"
                title="Download CV"
              >
                <Download size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
              Site Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <ChevronRight size={11} className="text-slate-600" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
              Contact & Office
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-slate-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-slate-500 flex-shrink-0" />
                <a
                  href={`mailto:${profile.email}`}
                  className="text-slate-300 hover:text-white hover:underline font-mono transition-colors"
                >
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-slate-500 flex-shrink-0" />
                <span className="font-mono text-slate-300">{profile.phone}</span>
              </div>
              <div className="pt-2">
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-1.5 text-xs text-[#B45309] hover:text-[#D97706] transition-colors hover:underline"
                >
                  <FileText size={12} />
                  <span>Download Complete CV (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            © {new Date().getFullYear()} Morshedur Rahman Khan. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Faculty of Science & IT · Daffodil International University</span>
            <span className="text-slate-700">·</span>
            <a
              href="#admin"
              className="text-slate-600 hover:text-slate-400 transition-colors"
              title="Faculty Administration Console"
            >
              Faculty Portal
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
