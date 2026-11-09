import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, CheckCircle, ExternalLink, ArrowUp, ArrowDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08 },
  }),
};

export const Education = () => {
  const { data, isAdmin, reorderItem } = usePortfolio();

  const sortedEdu = [...data.education].sort((a, b) => (a.order || 0) - (b.order || 0));
  const sortedCerts = [...data.certifications].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="education" className="relative py-24 bg-white border-t border-slate-200">
      <SectionEditOverlay sectionTab="education" label="Edit Education & Credentials" />

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
            Academic Credentials
          </p>
          <h2 className="section-header text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Education
          </h2>
        </motion.div>

        {/* Timeline: Education */}
        <div className="relative mb-20">
          {/* Center line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />

          <div className="space-y-10">
            {sortedEdu.map((edu, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={edu.id}
                  className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={index}
                >
                  {/* Timeline dot (desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#1E3A8A] border-4 border-white shadow-md z-10" />

                  {/* Card */}
                  <div className={`w-full lg:w-[calc(50%-2rem)] ${isLeft ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div
                      className="rounded-xl p-6 bg-white border border-slate-200 hover:border-[#1E3A8A]/40 transition-all duration-200"
                      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}
                    >
                      {/* Header row */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-snug">
                            {edu.degree}
                          </h3>
                          <div className="text-sm font-semibold text-[#1E3A8A] mt-0.5">
                            {edu.institution}
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-1 text-xs text-slate-500 flex-shrink-0">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{edu.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={12} />
                            <span>{edu.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Metric pills */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {edu.cgpa && (
                          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200">
                            CGPA: {edu.cgpa}
                          </span>
                        )}
                        {edu.rank && (
                          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-[#1E3A8A] border border-blue-200">
                            {edu.rank}
                          </span>
                        )}
                        {edu.badge && (
                          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-50 text-[#B45309] border border-amber-200">
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
                            <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle size={13} className="text-[#1E3A8A] mt-0.5 flex-shrink-0" />
                              <span className="leading-snug">{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {isAdmin && (
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                          <span>Order: #{edu.order || index + 1}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => reorderItem('education', edu.id, 'up')}
                              disabled={index === 0}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ArrowUp size={12} />
                            </button>
                            <button
                              onClick={() => reorderItem('education', edu.id, 'down')}
                              disabled={index === sortedEdu.length - 1}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ArrowDown size={12} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden lg:block w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certifications Grid */}
        {sortedCerts.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-slate-200" />
              <h3 className="font-serif font-bold text-xl text-slate-900 whitespace-nowrap px-2">
                Certifications & Accreditations
              </h3>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedCerts.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  className="rounded-xl p-5 bg-white border border-slate-200 hover:border-[#B45309]/40 transition-all duration-200"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={index}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-serif font-bold text-slate-900 leading-snug">
                      {cert.name}
                    </h4>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 flex-shrink-0">
                      {cert.issueDate}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-[#1E3A8A] mb-2">
                    {cert.issuer}
                  </div>

                  {cert.description && (
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">{cert.description}</p>
                  )}

                  {cert.badge && (
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-[#B45309] border border-amber-200 mb-2">
                      {cert.badge}
                    </span>
                  )}

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E3A8A] hover:underline"
                    >
                      <span>View Credential</span>
                      <ExternalLink size={11} />
                    </a>
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
        )}

      </div>
    </section>
  );
};
