import React from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, ArrowUp, ArrowDown, Cpu, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

export const Projects = () => {
  const { data, isAdmin, reorderItem } = usePortfolio();

  const sortedProjects = [...data.projects].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="projects" className="relative py-20 bg-[#faf9f6] text-slate-800 border-t border-slate-200">
      <SectionEditOverlay sectionTab="projects" label="Edit Applied Systems & Projects" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Section Header */}
        <div className="mb-14 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-sans mb-2">
            <Cpu size={14} className="text-academic-blue" />
            <span>Applied Systems & Technological Prototypes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Applied Systems & Case Studies
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Practical computing systems, sustainability analytics web architectures, and digital supply chain optimization frameworks.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {sortedProjects.map((proj, index) => (
            <motion.div
              key={proj.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs hover:border-slate-400 transition-all duration-200 flex flex-col justify-between"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-academic-blue border border-blue-200">
                      {proj.role}
                    </span>
                    {proj.featured && (
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                        Featured Framework
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 leading-snug">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {proj.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-academic-blue hover:underline"
                      >
                        <span>Live Architecture Deployment</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => reorderItem('projects', proj.id, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        onClick={() => reorderItem('projects', proj.id, 'down')}
                        disabled={index === sortedProjects.length - 1}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowDown size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
