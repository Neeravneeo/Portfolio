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
import { useRouter } from './hooks/useRouter';
import { AdminRouteBoundary } from './components/admin/AdminRouteBoundary';

// Project Experiences
import { AlzoExperience } from './components/work/experiences/AlzoExperience';
import { PeerClubExperience } from './components/work/experiences/PeerClubExperience';
import { GitDriveExperience } from './components/work/experiences/GitDriveExperience';
import { EmailAgentExperience } from './components/work/experiences/EmailAgentExperience';
import { InnerOSExperience } from './components/work/experiences/InnerOSExperience';
import { GoBuilderExperience } from './components/work/experiences/GoBuilderExperience';
import { trackEvent } from './lib/telemetry';

export const AppContent: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>(router.currentRoute);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Sync route changes to active section and track page view
  useEffect(() => {
    if (!router.isAdmin) {
      setActiveSection(router.currentRoute);
      trackEvent('page_view', { route: router.currentRoute });
    }
  }, [router.currentRoute, router.isAdmin]);

  // Track project experience opening
  useEffect(() => {
    if (router.activeExperienceId) {
      trackEvent('project_open', { projectId: router.activeExperienceId });
    }
  }, [router.activeExperienceId]);

  // Monitor active scroll section in public view
  useEffect(() => {
    if (router.isAdmin || router.activeExperienceId) return;

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router.isAdmin, router.activeExperienceId]);

  // If on admin route, render lazy admin shell
  if (router.isAdmin) {
    return <AdminRouteBoundary onBackToPublic={() => router.navigate('home')} />;
  }

  const activeProject = router.activeExperienceId
    ? projectsData.find((p) => p.id === router.activeExperienceId)
    : null;

  return (
    <div className="relative min-h-screen selection:bg-[#8052ff]/30 selection:text-white bg-black text-white font-sans">
      {/* Background Interactive Cosmic Canvas */}
      <CosmicBackground />

      {/* Global OS Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={(section) => router.navigate(section)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="relative z-10">
        {router.activeExperienceId && activeProject ? (
          // Dedicated Project Experience View
          <div>
            {router.activeExperienceId === 'alzo' && (
              <AlzoExperience project={activeProject} onBack={router.closeExperience} />
            )}
            {router.activeExperienceId === 'peerclub' && (
              <PeerClubExperience project={activeProject} onBack={router.closeExperience} />
            )}
            {router.activeExperienceId === 'gitdrive' && (
              <GitDriveExperience project={activeProject} onBack={router.closeExperience} />
            )}
            {router.activeExperienceId === 'ai-email-agent' && (
              <EmailAgentExperience project={activeProject} onBack={router.closeExperience} />
            )}
            {router.activeExperienceId === 'inneros' && (
              <InnerOSExperience project={activeProject} onBack={router.closeExperience} />
            )}
            {router.activeExperienceId === 'gobuilder' && (
              <GoBuilderExperience project={activeProject} onBack={router.closeExperience} />
            )}
          </div>
        ) : (
          // Spatial Portfolio Universe
          <>
            <HeroSection
              onExploreWork={() => router.navigate('work')}
              onOpenResume={() => setResumeModalOpen(true)}
              onSelectProject={router.openExperience}
            />

            <WorkSection onOpenExperience={router.openExperience} />

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
