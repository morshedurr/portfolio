import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, GraduationCap, ChevronDown, ChevronUp, Lightbulb, FileText, Users2 } from 'lucide-react';
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

export const Teaching: React.FC = () => {
  const { data } = usePortfolio();
  const courses = data.teachingCourses || [];
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const toggleCourse = (id: string) => {
    setExpandedCourse((prev) => (prev === id ? null : id));
  };

  return (
    <section id="teaching" className="relative py-24 bg-white border-t border-slate-200">
      <SectionEditOverlay sectionTab="experience" label="Edit Teaching Details" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={14} className="text-[#B45309]" />
            <p className="text-xs font-bold tracking-widest uppercase text-[#B45309] font-sans">
              Academic Instruction
            </p>
          </div>
          <h2 className="section-header text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Teaching
          </h2>
        </motion.div>

        {/* Teaching Award Banner */}
        <motion.div
          className="mb-12 p-6 rounded-xl border border-amber-200/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          style={{ background: 'linear-gradient(135deg, #fffbeb, #fefce8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-amber-100 text-amber-800 border border-amber-200 flex-shrink-0">
              <Award size={24} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 font-sans mb-1">
                Faculty Honour · Summer 2026
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Award for Innovative Teaching Practices & Creative Initiatives
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Awarded by Daffodil International University in recognition of pioneering student-centred instructional models, creative curriculum delivery, and impactful departmental advancement.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 flex-shrink-0">
            Institutional Distinction
          </span>
        </motion.div>

        {/* Courses Grid */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap size={20} className="text-[#1E3A8A]" />
            <h3 className="text-xl font-serif font-bold text-slate-900">
              Current Undergraduate Courses
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, idx) => {
              const isExpanded = expandedCourse === course.id;
              return (
                <motion.div
                  key={course.id || idx}
                  className="rounded-xl bg-white border border-slate-200 overflow-hidden hover:border-[#1E3A8A]/30 transition-all duration-200"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={idx}
                >
                  <div className="p-6">
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {course.code && (
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#1E3A8A]/10 text-[#1E3A8A] border border-[#1E3A8A]/20">
                          {course.code}
                        </span>
                      )}
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {course.level}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h4 className="text-lg font-serif font-bold text-slate-900 mb-2 leading-snug">
                      {course.title}
                    </h4>

                    <div className="text-xs text-[#1E3A8A] font-medium mb-3">
                      {course.department} · {course.institution}
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Expandable topics */}
                  {course.topics && course.topics.length > 0 && (
                    <>
                      <button
                        onClick={() => toggleCourse(course.id)}
                        className="w-full px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-[#1E3A8A] hover:bg-slate-50 transition-colors"
                      >
                        <span>Key Topics ({course.topics.length})</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {isExpanded && (
                        <div className="px-6 pb-5 pt-2 bg-slate-50/60">
                          <div className="flex flex-wrap gap-1.5">
                            {course.topics.map((topic, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-1 rounded-full text-xs bg-white text-slate-700 border border-slate-200"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pedagogical Philosophy */}
        <motion.div
          className="mt-14 p-8 rounded-xl bg-slate-50 border border-slate-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={3}
        >
          <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">
            Pedagogical Philosophy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <Lightbulb size={18} />,
                title: 'Active-Learning Method',
                desc: 'Utilizing live case studies, collaborative team debates, and interactive problem solving rather than purely lecture-based instruction.',
              },
              {
                icon: <FileText size={18} />,
                title: 'Applied MIS Frameworks',
                desc: 'Exposing students to ERP architectures, database schemas, cloud infrastructure, and business analytics used by modern global enterprises.',
              },
              {
                icon: <Users2 size={18} />,
                title: 'Student Mentorship',
                desc: 'Guiding undergraduate cohorts in academic research, presentation scriptwriting, competition preparation, and university summit organization.',
              },
            ].map((p, i) => (
              <div key={i} className="bg-white p-5 rounded-lg border border-slate-200">
                <div className="p-2.5 w-fit rounded-lg bg-blue-50 text-[#1E3A8A] mb-3">
                  {p.icon}
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-base mb-1.5">{p.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
