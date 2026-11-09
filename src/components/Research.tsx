import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, BarChart3, Globe2, Cpu, FileCheck } from 'lucide-react';
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

const researchInterests = [
  {
    title: 'Management Information Systems (MIS)',
    description: 'Enterprise systems adoption, IT-business strategic alignment, ERP/CRM architecture, and organizational technology governance.',
    icon: <BookOpen size={20} className="text-[#1E3A8A]" />,
  },
  {
    title: 'Business Analytics & Empirical Modeling',
    description: 'Structural Equation Modeling (PLS-SEM), statistical data validation, survey research methodology, and executive decision dashboards.',
    icon: <BarChart3 size={20} className="text-[#1E3A8A]" />,
  },
  {
    title: 'Digital Transformation & E-Commerce Operations',
    description: 'Multi-platform e-commerce dynamics (Amazon, Shopify, POS), consumer trust factors, and digital supply chain integration.',
    icon: <Globe2 size={20} className="text-[#1E3A8A]" />,
  },
  {
    title: 'Sustainable Systems & Agro-Tech Optimization',
    description: 'Carbon footprint tracking architectures and digital intermediary frameworks connecting rural farmers directly to retail markets.',
    icon: <Cpu size={20} className="text-[#1E3A8A]" />,
  },
];

export const Research: React.FC = () => {
  const { data } = usePortfolio();
  const researchItems = data.research || [];

  return (
    <section id="research" className="relative py-24 bg-[#FAFAF8] border-t border-slate-200">
      <SectionEditOverlay sectionTab="projects" label="Edit Research & Interests" />

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
            Scholarly Inquiry
          </p>
          <h2 className="section-header text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Research
          </h2>
        </motion.div>

        {/* Research Interest Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {researchInterests.map((interest, idx) => (
            <motion.div
              key={idx}
              className="rounded-xl p-6 bg-white border-l-4 border-[#B45309] border border-slate-200 hover:shadow-md transition-all duration-200"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={idx}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50/80 border border-blue-100 flex-shrink-0">
                  {interest.icon}
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-slate-900 mb-2 leading-snug">
                    {interest.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {interest.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research Appointments */}
        {researchItems.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <FileCheck size={20} className="text-[#1E3A8A]" />
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Research Appointments & Institutional Inquiries
              </h3>
            </div>

            <div className="space-y-5">
              {researchItems.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  className="rounded-xl p-6 bg-white border-l-4 border-[#1E3A8A] border border-slate-200"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={idx}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <h4 className="text-lg font-serif font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h4>
                    <span className="text-xs font-mono text-slate-500 flex-shrink-0">
                      {item.period}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#1E3A8A] mb-3">
                    {item.institution}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
