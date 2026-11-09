import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUp, ArrowDown, Star } from 'lucide-react';
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

export const Projects = () => {
  const { data, isAdmin, reorderItem } = usePortfolio();

  const sortedProjects = [...data.projects].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="projects" className="relative py-24 bg-[#FAFAF8] border-t border-slate-200">
      <SectionEditOverlay sectionTab="projects" label="Edit Projects" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#1E3A8A] font-sans mb-3">
            Applied Systems
          </p>
          <h2 className="section-header text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Projects
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((proj, index) => (
            <motion.div
              key={proj.id}
              className="relative rounded-xl overflow-hidden bg-white border border-slate-200 flex flex-col group hover:-translate-y-0.5 transition-all duration-200"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={index}
            >
              {/* Featured banner */}
              {proj.featured && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#B45309] text-white shadow-sm">
                    <Star size={10} />
                    Featured
                  </span>
                </div>
              )}

              {/* Image or gradient placeholder */}
              {proj.imageUrl ? (
                <div className="h-44 overflow-hidden bg-slate-100">
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div
                  className="h-44 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${
                      index % 3 === 0 ? '#1E3A8A15, #1E3A8A30' :
                      index % 3 === 1 ? '#B4530915, #B4530930' :
                      '#05966915, #05966930'
                    })`,
                  }}
                >
                  <span className="text-4xl font-serif font-bold opacity-20 text-slate-700">
                    {proj.title.charAt(0)}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Role badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#1E3A8A] border border-blue-200">
                    {proj.role}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-slate-900 mb-2 leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                  {proj.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:underline"
                    >
                      <ExternalLink size={12} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:underline"
                    >
                      <Github size={12} />
                      <span>Source</span>
                    </a>
                  )}

                  {isAdmin && (
                    <div className="ml-auto flex items-center gap-1">
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
