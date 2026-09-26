import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Globe2, BookOpen, Layers, Users, GraduationCap, Compass, Landmark } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

export const About = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <section id="about" className="relative py-20 bg-white text-slate-800 border-t border-slate-200">
      <SectionEditOverlay sectionTab="profile" label="Edit Academic Profile" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Section Header */}
        <div className="mb-14 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-sans mb-2">
            <BookOpen size={14} className="text-academic-blue" />
            <span>Academic Profile & Biographical Statement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            About & Academic Background
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Faculty member in Information Technology & Management at Daffodil International University, combining technical computing, empirical management research, and international scholarship in Sweden.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Scholarly Focus Areas & International Fellowship */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* International Fellowship Card */}
            <div className="p-6 rounded-xl bg-[#faf9f6] border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-blue-50 text-academic-blue rounded-lg border border-blue-200/80">
                  <Globe2 size={22} />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                    International Credit Mobility
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 text-base leading-snug">
                    Erasmus+ KA171 Fellow
                  </h3>
                  <div className="text-xs text-academic-blue font-medium">
                    Mälardalen University, Sweden
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Selected for the competitive European Commission Erasmus+ KA171 scholarship. Completed 18.5 ECTS credits in Object-Oriented Programming, Internet of Things, Data Communication & Security, and Machine Learning Concepts in Västerås, Sweden.
              </p>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span>Period: Autumn 2023 – Jan 2024</span>
                <span className="font-semibold text-slate-700">18.5 ECTS Credits</span>
              </div>
            </div>

            {/* Academic Standing & Honours */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                    Undergraduate Valedictorian Standing
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 text-base leading-snug">
                    CGPA 3.90 / 4.00 (Ranked 4th)
                  </h3>
                  <div className="text-xs text-slate-500">
                    BSc in ITM, Daffodil International University
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ranked 4th across the entire Information Technology & Management graduating cohort. Consistently placed on the Dean's Honour List across academic semesters.
              </p>
            </div>

          </div>

          {/* Right Column: Narrative Biography & Core Focus Areas */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-snug">
                Bridging Enterprise Management, Cloud Systems, and Academic Research
              </h3>

              <p>
                {profile.bio}
              </p>

              {profile.subBio && (
                <p className="text-slate-600 text-sm leading-relaxed">
                  {profile.subBio}
                </p>
              )}
            </div>

            {/* Core Competencies in Academic Format */}
            <div className="pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-sans flex items-center gap-2">
                <Layers size={14} className="text-academic-blue" />
                <span>Primary Scholarly & Professional Domains</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {profile.keyExpertise.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm text-slate-700 font-medium"
                  >
                    <CheckCircle2 size={15} className="text-academic-blue mt-0.5 flex-shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};