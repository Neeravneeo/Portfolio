import React, { useState, useEffect } from 'react';
import { PerspectiveProvider } from './context/PerspectiveContext';
import { CosmicBackground } from './components/common/CosmicBackground';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/home/HeroSection';
import { WorkSection } from './components/work/WorkSection';
import { JourneySection } from './components/journey/JourneySection';
import { LabSection } from './components/lab/LabSection';
import { AboutSection } from './components/about/AboutSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/common/Footer';
import { ResumeModal } from './components/common/ResumeModal';
import { projectsData } from './data/projectsData';

// Project Experiences
import { AlzoExperience } from './components/work/experiences/AlzoExperience';
import { PeerClubExperience } from './components/work/experiences/PeerClubExperience';
import { GitDriveExperience } from './components/work/experiences/GitDriveExperience';
import { EmailAgentExperience } from './components/work/experiences/EmailAgentExperience';
import { InnerOSExperience } from './components/work/experiences/InnerOSExperience';
import { GoBuilderExperience } from './components/work/experiences/GoBuilderExperience';

export const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeExperienceId, setActiveExperienceId] = useState<string | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Monitor active scroll section
  useEffect(() => {
    if (activeExperienceId) return;

    const handleScroll = () => {
      const sections = ['home', 'work', 'journey', 'lab', 'about', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeExperienceId]);

  const handleNavigate = (sectionId: string) => {
    setActiveExperienceId(null);
    setActiveSection(sectionId);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleOpenExperience = (projectId: string) => {
    setActiveExperienceId(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToUniverse = () => {
    setActiveExperienceId(null);
    setTimeout(() => {
      const el = document.getElementById('work');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const activeProject = activeExperienceId
    ? projectsData.find((p) => p.id === activeExperienceId)
    : null;

  return (
    <div className="relative min-h-screen selection:bg-violet-500/30 selection:text-white bg-[#05070d]">
      {/* Background Interactive Cosmic Canvas */}
      <CosmicBackground />

      {/* Global OS Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="relative z-10">
        {activeExperienceId && activeProject ? (
          // Dedicated Project Experience View
          <div>
            {activeExperienceId === 'alzo' && (
              <AlzoExperience project={activeProject} onBack={handleBackToUniverse} />
            )}
            {activeExperienceId === 'peerclub' && (
              <PeerClubExperience project={activeProject} onBack={handleBackToUniverse} />
            )}
            {activeExperienceId === 'gitdrive' && (
              <GitDriveExperience project={activeProject} onBack={handleBackToUniverse} />
            )}
            {activeExperienceId === 'ai-email-agent' && (
              <EmailAgentExperience project={activeProject} onBack={handleBackToUniverse} />
            )}
            {activeExperienceId === 'inneros' && (
              <InnerOSExperience project={activeProject} onBack={handleBackToUniverse} />
            )}
            {activeExperienceId === 'gobuilder' && (
              <GoBuilderExperience project={activeProject} onBack={handleBackToUniverse} />
            )}
          </div>
        ) : (
          // Spatial Portfolio Universe
          <>
            <HeroSection
              onExploreWork={() => handleNavigate('work')}
              onOpenResume={() => setResumeModalOpen(true)}
              onSelectProject={handleOpenExperience}
            />

            <WorkSection onOpenExperience={handleOpenExperience} />

            <JourneySection />

            <LabSection />

            <AboutSection onOpenResume={() => setResumeModalOpen(true)} />

            <ContactSection onOpenResume={() => setResumeModalOpen(true)} />
          </>
        )}
      </main>

      {/* OS Telemetry Footer */}
      <Footer />

      {/* In-Portfolio Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PerspectiveProvider>
      <AppContent />
    </PerspectiveProvider>
  );
};

export default App;
