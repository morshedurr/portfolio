import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Database, Cpu, Users, Globe, Languages, ShieldCheck, BarChart3, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

export const Skills = () => {
  const { data } = usePortfolio();
  const { skillCategories, languages } = data;

  const academicCategories = [
    {
      title: "Academic Pedagogy & Faculty Instruction",
      description: "University lecturing, active-learning course delivery, student mentorship, and academic governance.",
      icon: <BookOpen size={18} className="text-academic-blue" />,
      competencies: [
        "Student-Centred Active Learning",
        "Harvard/Industry Case Study Analysis",
        "Curriculum Design & Syllabi Delivery",
        "Undergraduate Research Mentorship",
        "Academic Presentation & Scriptwriting",
        "Departmental Administration & Promotion"
      ]
    },
    {
      title: "Management Information Systems & Enterprise IT",
      description: "Enterprise system architectures, digital transformation, and business-IT strategic alignment.",
      icon: <Layers size={18} className="text-academic-blue" />,
      competencies: [
        "Management Information Systems (MIS)",
        "Enterprise Resource Planning (ERP)",
        "Customer Relationship Management (CRM)",
        "Business Process Reengineering",
        "E-Commerce Multi-Platform Strategy",
        "IT Vendor & POS Infrastructure"
      ]
    },
    {
      title: "Data Analytics & Empirical Methodologies",
      description: "Quantitative modeling, structural equation analysis, survey design, and executive analytics.",
      icon: <BarChart3 size={18} className="text-academic-blue" />,
      competencies: [
        "SmartPLS (PLS-SEM Modeling)",
        "Quantitative Field Survey Design",
        "Power BI & Executive Dashboards",
        "Advanced Excel Financial & Decision Models",
        "Empirical Data Collection Protocols",
        "Market Analytics & Business Intelligence"
      ]
    },
    {
      title: "Cloud Infrastructure & Applied Computing",
      description: "Distributed cloud systems, relational data querying, programming, and cybersecurity concepts.",
      icon: <Cpu size={18} className="text-academic-blue" />,
      competencies: [
        "AWS Cloud Solutions Architecture (Associate)",
        "Python & Object-Oriented Programming (OOP)",
        "Relational Databases & SQL Querying",
        "Data Structures & Algorithmic Analysis",
        "Internet of Things (IoT) Frameworks",
        "Data Communications & Network Security"
      ]
    }
  ];

  return (
    <section id="skills" className="relative py-20 bg-white text-slate-800 border-t border-slate-200">
      <SectionEditOverlay sectionTab="skills" label="Edit Competencies & Languages" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Section Header */}
        <div className="mb-14 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-sans mb-2">
            <Layers size={14} className="text-academic-blue" />
            <span>Subject Matter & Methodological Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Academic Competencies & Methodologies
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Classified domain knowledge spanning university pedagogy, management information systems, empirical quantitative research, and cloud infrastructure.
          </p>
        </div>

        {/* Categorized Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {academicCategories.map((category, idx) => (
            <motion.div
              key={idx}
              className="bg-[#faf9f6] rounded-xl p-6 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                    {category.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 mb-4 pl-1">
                  {category.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/80">
                  {category.competencies.map((comp, cIdx) => (
                    <div 
                      key={cIdx} 
                      className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200/60 text-xs text-slate-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-academic-blue flex-shrink-0"></span>
                      <span className="leading-snug">{comp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages & International Communication Box */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-4">
            <Languages size={20} className="text-academic-blue" />
            <h3 className="text-lg font-serif font-bold text-slate-900">
              Language Proficiencies & International Communication
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {languages.map((lang, lIdx) => (
              <div key={lIdx} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base font-serif font-bold text-slate-900">{lang.name}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-academic-blue border border-blue-200">
                    {lang.level}
                  </span>
                </div>
                {lang.proficiencyNote && (
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    {lang.proficiencyNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};