import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Download, FileText, Award, GraduationCap, BookOpen, ExternalLink, ShieldCheck, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

export const Hero = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <section id="home" className="relative pt-32 pb-16 bg-[#fcfbf9] text-slate-800 border-b border-slate-200">
      <SectionEditOverlay sectionTab="profile" label="Edit Faculty Masthead" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Faculty Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Academic Portrait & Quick Institutional Info */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="relative w-60 sm:w-64 rounded-lg overflow-hidden bg-white border border-slate-300 p-1.5 shadow-sm">
              <div className="overflow-hidden rounded-md aspect-[4/5] bg-slate-100">
                <img
                  src={profile.profileImage || '/profile-placeholder.png'}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/profile-placeholder.png';
                  }}
                />
              </div>
              <div className="pt-3 pb-1 text-center">
                <div className="text-xs font-semibold text-slate-900">Morshedur Rahman Khan</div>
                <div className="text-[11px] text-slate-500">Lecturer, Dept. of ITM</div>
                <div className="text-[11px] text-slate-500">Daffodil International University</div>
              </div>
            </div>

            {/* Quick Contact & Office Box */}
            <div className="w-full max-w-sm mt-5 bg-white rounded-lg border border-slate-200 p-4 shadow-2xs text-xs space-y-2.5 font-sans">
              <div className="font-serif font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                <Landmark size={13} className="text-academic-blue" />
                <span>Departmental Office</span>
              </div>
              
              <div className="flex items-start gap-2 text-slate-600">
                <MapPin size={13} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <span className="leading-snug">{profile.location}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <Mail size={13} className="text-slate-400 flex-shrink-0" />
                <a href={`mailto:${profile.email}`} className="text-academic-blue hover:underline truncate">
                  {profile.email}
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <Phone size={13} className="text-slate-400 flex-shrink-0" />
                <span>{profile.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-600 pt-1 border-t border-slate-100">
                <Linkedin size={13} className="text-slate-400 flex-shrink-0" />
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

          {/* Right Column: Full Academic Faculty Presentation */}
          <div className="lg:col-span-8 space-y-6 text-left">
            
            {/* Academic Title Block */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-academic-blue text-xs font-semibold tracking-wide font-sans">
                <span>Faculty Profile • Information Technology & Management</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                {profile.name}
              </h1>

              <div className="text-base sm:text-lg text-slate-700 font-serif space-y-1">
                <p className="font-semibold text-slate-800">
                  Lecturer, Department of Information Technology & Management (ITM)
                </p>
                <p className="text-slate-600 text-sm sm:text-base">
                  Daffodil International University (DIU) • Dhaka, Bangladesh
                </p>
                <p className="text-slate-500 text-xs sm:text-sm">
                  Erasmus+ KA171 Fellow, Mälardalen University (Sweden) • AWS Certified Solutions Architect
                </p>
              </div>
            </div>

            {/* Academic Bio / Research Statement */}
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-3 font-sans">
              <p>
                {profile.bio}
              </p>
              {profile.subBio && (
                <p className="text-slate-600 text-sm">
                  {profile.subBio}
                </p>
              )}
            </div>

            {/* Academic Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#0f1e36] text-white text-xs sm:text-sm font-semibold hover:bg-[#1e3a8a] transition-colors shadow-xs"
              >
                <FileText size={15} />
                <span>Curriculum Vitae (PDF)</span>
                <Download size={13} className="opacity-70" />
              </a>

              <a
                href="#teaching"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-medium hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <BookOpen size={14} className="text-academic-blue" />
                <span>Courses & Teaching</span>
              </a>

              <a
                href="#research"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-medium hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <span>Research Inquiries</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-medium hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Mail size={14} className="text-slate-500" />
                <span>Contact Office</span>
              </a>
            </div>

            {/* Key Academic Credentials / Distinction Bar */}
            <div className="pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-academic-blue mb-1">
                    <GraduationCap size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">Undergraduate</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">CGPA 3.90 / 4.00</div>
                  <div className="text-[11px] text-slate-500">Ranked 4th • Dean's Honour List</div>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-amber-700 mb-1">
                    <Award size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">Fellowship</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">Erasmus+ KA171</div>
                  <div className="text-[11px] text-slate-500">Mälardalen University, Sweden</div>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-emerald-700 mb-1">
                    <BookOpen size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">Teaching</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">4 Core Courses</div>
                  <div className="text-[11px] text-slate-500">MIS, HRM, Mgmt, Operations</div>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-indigo-700 mb-1">
                    <ShieldCheck size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">Certification</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">AWS Certified</div>
                  <div className="text-[11px] text-slate-500">Solutions Architect – Associate</div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};