import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { SectionId } from './types/portfolio';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Teaching } from './components/Teaching';
import { Research } from './components/Research';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Projects } from './components/Projects';
import { Leadership } from './components/Leadership';
import { Skills } from './components/Skills';
import { References } from './components/References';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Admin & Alerts
import { AdminPanel } from './components/admin/AdminPanel';
import { AdminButton } from './components/admin/AdminButton';
import { Toast } from './components/common/Toast';

const PortfolioContent: React.FC = () => {
  const { data } = usePortfolio();

  const sectionRenderers: Record<SectionId, React.ReactNode> = {
    hero: <Hero key="hero" />,
    about: <About key="about" />,
    teaching: <Teaching key="teaching" />,
    research: <Research key="research" />,
    education: <Education key="education" />,
    experience: <Experience key="experience" />,
    awards: <Achievements key="awards" />,
    projects: <Projects key="projects" />,
    leadership: <Leadership key="leadership" />,
    skills: <Skills key="skills" />,
    certifications: null, // rendered inside Education section
    references: <References key="references" />,
    contact: <Contact key="contact" />
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-slate-800 relative selection:bg-slate-800 selection:text-white font-sans">
      {/* Sticky Top Institutional Navbar */}
      <Navbar />

      {/* Main Academic Sections Container */}
      <main>
        {data.sectionsOrder.map((sectionId) => {
          if (data.sectionVisibility[sectionId] === false) {
            return null;
          }
          return sectionRenderers[sectionId];
        })}
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Mode Trigger Button */}
      <AdminButton />

      {/* Content Management Panel */}
      <AdminPanel />

      {/* Toast Alert Banner */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}