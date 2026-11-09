import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Building, ArrowUp, ArrowDown } from 'lucide-react';
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

export const References = () => {
  const { data, isAdmin, reorderItem } = usePortfolio();

  const sortedRefs = [...data.references].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="references" className="relative py-24 bg-white border-t border-slate-200">
      <SectionEditOverlay sectionTab="references" label="Edit Academic Referees" />

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
            Academic Endorsements
          </p>
          <h2 className="section-header text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            References
          </h2>
          <p className="mt-4 text-base text-slate-500 max-w-2xl leading-relaxed">
            Formal references from university department leadership and senior faculty assessing academic standing, research acumen, and teaching effectiveness.
          </p>
        </motion.div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {sortedRefs.map((ref, index) => (
            <motion.div
              key={ref.id}
              className="rounded-xl p-7 bg-white border border-slate-200 hover:border-[#1E3A8A]/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={index}
            >
              <div>
                {/* Header */}
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-sans mb-1">
                    Academic Referee #{index + 1}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                    {ref.name}
                  </h3>
                  <div className="text-sm font-semibold text-[#1E3A8A] mt-0.5">
                    {ref.role}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <Building size={12} className="text-slate-400 flex-shrink-0" />
                    <span>{ref.department}, {ref.institution}</span>
                  </div>
                </div>

                {/* Relationship */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200/80 mb-5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-sans">
                    Relationship & Context
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{ref.relationship}"
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail size={13} className="text-[#1E3A8A] flex-shrink-0" />
                    <a
                      href={`mailto:${ref.email}`}
                      className="text-[#1E3A8A] hover:underline font-mono"
                    >
                      {ref.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone size={13} className="text-slate-400 flex-shrink-0" />
                    <span className="font-mono">{ref.phone}</span>
                  </div>
                </div>

                {isAdmin && (
                  <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Order: #{ref.order || index + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => reorderItem('references', ref.id, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        onClick={() => reorderItem('references', ref.id, 'down')}
                        disabled={index === sortedRefs.length - 1}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowDown size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
