import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, CheckCircle2, GraduationCap, Users2, Lightbulb, Compass, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

export const Teaching: React.FC = () => {
  const { data } = usePortfolio();
  const courses = data.teachingCourses || [];

  return (
    <section id="teaching" className="relative py-20 bg-white text-slate-800 border-t border-slate-200/70">
      <SectionEditOverlay sectionTab="experience" label="Edit Teaching Details" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Section Header */}
        <div className="mb-14 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-sans mb-2">
            <BookOpen size={14} className="text-academic-blue" />
            <span>Academic Instruction & Pedagogy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Teaching & Course Instruction
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Faculty appointments at the Department of Information Technology & Management (ITM), Daffodil International University. Integrating student-centred active learning, case analyses, and practical information systems architecture.
          </p>
        </div>

        {/* Teaching Recognition / Award Banner */}
        <div className="mb-12 p-6 rounded-xl bg-[#faf9f6] border border-amber-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-amber-100 text-amber-800 border border-amber-200 flex-shrink-0">
              <Award size={24} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 font-sans">
                Faculty Honour • Summer 2026
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-900 mt-0.5">
                Award for Innovative Teaching Practices & Creative Initiatives
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Awarded by Daffodil International University in recognition of pioneering student-centred instructional models, creative curriculum delivery, and impactful departmental advancement.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300">
              Institutional Distinction
            </span>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="mb-16">
          <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-2.5">
            <GraduationCap size={20} className="text-academic-blue" />
            <span>Current Undergraduate Courses Instructed</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id || idx}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:border-slate-400 transition-all duration-200 flex flex-col justify-between"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      {course.code}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {course.level}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h4 className="text-lg font-serif font-bold text-slate-900 mb-2 leading-snug">
                    {course.title}
                  </h4>

                  <div className="text-xs text-academic-blue font-medium mb-3">
                    {course.department} • {course.institution}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {course.description}
                  </p>
                </div>

                {/* Topics / Core Modules */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Topics Covered:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {course.topics.map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-xs bg-slate-50 text-slate-700 border border-slate-200/80"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pedagogical Methodology & Philosophy */}
        <div className="p-8 rounded-xl bg-slate-50/80 border border-slate-200">
          <div className="max-w-3xl mb-8">
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Compass size={20} className="text-academic-blue" />
              <span>Pedagogical Philosophy & Classroom Engagement</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              My educational philosophy centers on active-learning paradigms where students transition from passive listeners to analytical problem-solvers capable of bridging enterprise needs with technological capability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-xs">
              <div className="p-2.5 w-fit rounded-lg bg-blue-50 text-academic-blue mb-3">
                <Lightbulb size={18} />
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-base mb-1.5">Active-Learning Method</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Utilizing live case studies, collaborative team debates, and interactive problem solving rather than purely lecture-based instruction.
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-xs">
              <div className="p-2.5 w-fit rounded-lg bg-blue-50 text-academic-blue mb-3">
                <FileText size={18} />
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-base mb-1.5">Applied MIS Frameworks</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exposing students to ERP architectures, database schemas, cloud infrastructure, and business analytics used by modern global enterprises.
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-xs">
              <div className="p-2.5 w-fit rounded-lg bg-blue-50 text-academic-blue mb-3">
                <Users2 size={18} />
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-base mb-1.5">Student Mentorship</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guiding undergraduate cohorts in academic research, presentation scriptwriting, competition preparation, and university summit organization.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
