import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Download, Settings, Landmark, FileText, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer = () => {
  const { data, setIsAdminOpen } = usePortfolio();
  const { profile } = data;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b172a] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Col 1: Faculty Affiliation & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#1e3a8a] text-white flex items-center justify-center font-serif font-bold text-sm">
                MK
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-white tracking-tight leading-snug">
                  {profile.name}
                </h3>
                <p className="text-xs text-slate-400">
                  Lecturer in Information Technology & Management
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Faculty member at Daffodil International University and Erasmus+ KA171 Fellow (Sweden). Dedicated to active-learning pedagogy, MIS enterprise architecture, and empirical business analytics research.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-xs text-amber-300 transition-colors"
              >
                <Settings size={12} />
                <span>Admin Content Panel</span>
              </button>
            </div>
          </div>

          {/* Col 2: Academic Sections Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
              Faculty Sections
            </h4>
            <ul className="space-y-1.5 text-xs">
              {[
                { id: 'home', label: 'Faculty Masthead' },
                { id: 'about', label: 'Academic Biography' },
                { id: 'teaching', label: 'Teaching & Pedagogy' },
                { id: 'research', label: 'Research & Inquiries' },
                { id: 'education', label: 'Education & Degrees' },
                { id: 'experience', label: 'Academic Appointments' },
                { id: 'awards', label: 'Honours & Fellowships' },
                { id: 'projects', label: 'Applied Systems' },
                { id: 'references', label: 'Academic References' },
                { id: 'contact', label: 'Office & Contact' },
              ].map((item) => (
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

          {/* Col 3: Department Address & Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
              Departmental Address
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <Landmark size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 font-semibold">Department of IT & Management, DIU</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-slate-500 flex-shrink-0 mt-0.5" />
                <span>{profile.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-slate-500 flex-shrink-0" />
                <a href={`mailto:${profile.email}`} className="text-slate-300 hover:underline font-mono">
                  {profile.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-slate-500 flex-shrink-0" />
                <span className="font-mono">{profile.phone}</span>
              </p>
              <div className="pt-2">
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:underline"
                >
                  <FileText size={12} />
                  <span>Download Complete Curriculum Vitae (PDF)</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            © {new Date().getFullYear()} Morshedur Rahman Khan. All rights reserved.
          </div>
          <div>
            Faculty of Science & Information Technology • Daffodil International University
          </div>
        </div>

      </div>
    </footer>
  );
};
