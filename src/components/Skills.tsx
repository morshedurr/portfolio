import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06 },
  }),
};

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  delay: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, color, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{name}</span>
        <span className="text-xs font-semibold text-slate-400">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export const Skills = () => {
  const { data } = usePortfolio();
  const { technicalSkills, softSkills, skillCategories } = data;

  return (
    <section id="skills" className="relative py-24 bg-[#FAFAF8] border-t border-slate-200">
      <SectionEditOverlay sectionTab="skills" label="Edit Skills & Expertise" />

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
            Competencies
          </p>
          <h2 className="section-header text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Skills & Expertise
          </h2>
        </motion.div>

        {/* Two-column: Technical + Soft Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

          {/* Technical Skills */}
          <motion.div
            className="rounded-xl p-6 sm:p-8 bg-white border border-slate-200"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h3 className="font-serif font-bold text-lg text-slate-900 mb-6 pb-3 border-b border-slate-100">
              Technical Skills
            </h3>
            <div className="space-y-5">
              {technicalSkills.map((skill, idx) => (
                <SkillBar
                  key={idx}
                  name={skill.name}
                  level={skill.level}
                  color="#1E3A8A"
                  delay={idx * 0.08}
                />
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            className="rounded-xl p-6 sm:p-8 bg-white border border-slate-200"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <h3 className="font-serif font-bold text-lg text-slate-900 mb-6 pb-3 border-b border-slate-100">
              Soft Skills
            </h3>
            <div className="space-y-5">
              {softSkills.map((skill, idx) => (
                <SkillBar
                  key={idx}
                  name={skill.name}
                  level={skill.level}
                  color="#B45309"
                  delay={idx * 0.08}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skill Categories Tag Cloud */}
        {skillCategories && skillCategories.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
          >
            <h3 className="font-serif font-bold text-xl text-slate-900 mb-8 text-center">
              Skill Categories
            </h3>
            <div className="space-y-8">
              {skillCategories.map((category, cIdx) => (
                <div key={category.id || cIdx}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans mb-3">
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:border-[#1E3A8A]/40 hover:text-[#1E3A8A] transition-colors cursor-default"
                        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
