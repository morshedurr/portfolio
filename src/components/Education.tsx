import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle, ArrowUp, ArrowDown, ExternalLink, ShieldCheck, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

export const Education = () => {
  const { data, isAdmin, reorderItem } = usePortfolio();

  const sortedEdu = [...data.education].sort((a, b) => (a.order || 0) - (b.order || 0));
  const sortedCerts = [...data.certifications].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="education" className="relative py-20 bg-white text-slate-800 border-t border-slate-200">
      <SectionEditOverlay sectionTab="education" label="Edit Education & Credentials" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Section Header */}
        <div className="mb-14 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-sans mb-2">
            <GraduationCap size={14} className="text-academic-blue" />
            <span>Academic Credentials & Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Education & Certifications
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Formal higher education degrees in Information Technology & Management, European credit mobility in Sweden, and accredited industry credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: University Degrees */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2 mb-4">
              <GraduationCap className="text-academic-blue" size={20} />
              <span>Higher Education & Degrees</span>
            </h3>

            {sortedEdu.map((edu, index) => (
              <motion.div
                key={edu.id}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs hover:border-slate-400 transition-all duration-200"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-lg font-serif font-bold text-slate-900 leading-snug">
                      {edu.degree}
                    </h4>
                    <div className="text-sm font-semibold text-academic-blue mt-0.5">
                      {edu.institution}
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 sm:text-right flex-shrink-0 space-y-0.5">
                    <div className="flex items-center sm:justify-end gap-1 font-mono font-medium text-slate-700">
                      <Calendar size={12} />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1">
                      <MapPin size={12} />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>

                {/* Academic Metrics Pills */}
                <div className="flex flex-wrap gap-2 my-3">
                  {edu.cgpa && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200">
                      CGPA: {edu.cgpa}
                    </span>
                  )}
                  {edu.rank && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-academic-blue border border-blue-200">
                      {edu.rank}
                    </span>
                  )}
                  {edu.badge && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                      {edu.badge}
                    </span>
                  )}
                  {edu.eqfLevel && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono text-slate-600 bg-slate-100">
                      {edu.eqfLevel}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                  {edu.description}
                </p>

                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="space-y-1.5 pt-3 border-t border-slate-100">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="text-xs text-slate-600 flex items-start gap-2">
                        <CheckCircle size={13} className="text-academic-blue mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Admin Reorder Controls */}
                {isAdmin && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Rank Order: #{edu.order || index + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => reorderItem('education', edu.id, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move Up"
                      >
                        <ArrowUp size={13} />
                      </button>
                      <button
                        onClick={() => reorderItem('education', edu.id, 'down')}
                        disabled={index === sortedEdu.length - 1}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move Down"
                      >
                        <ArrowDown size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Column: Professional & Research Certifications */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2 mb-4">
              <ShieldCheck className="text-academic-blue" size={20} />
              <span>Accreditations & Certifications</span>
            </h3>

            <div className="space-y-3.5">
              {sortedCerts.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all duration-200"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h4 className="text-sm sm:text-base font-serif font-bold text-slate-900 leading-snug">
                        {cert.name}
                      </h4>
                      <div className="text-xs text-academic-blue font-medium">
                        {cert.issuer}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 flex-shrink-0">
                      {cert.issueDate}
                    </span>
                  </div>

                  {cert.description && (
                    <p className="text-xs text-slate-600 leading-relaxed mt-2 mb-2">
                      {cert.description}
                    </p>
                  )}

                  {cert.badge && (
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                      {cert.badge}
                    </span>
                  )}

                  {isAdmin && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>Order: #{cert.order || index + 1}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => reorderItem('certifications', cert.id, 'up')}
                          disabled={index === 0}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          onClick={() => reorderItem('certifications', cert.id, 'down')}
                          disabled={index === sortedCerts.length - 1}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ArrowDown size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};