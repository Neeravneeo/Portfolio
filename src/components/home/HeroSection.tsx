import React from 'react';
import { usePerspective } from '../../context/PerspectiveContext';
import { CosmicObject } from '../3d/CosmicObject';
import { Button } from '../common/Button';
import { ArrowRight, FileText, Sparkles, Terminal, Compass, Layers } from 'lucide-react';

interface HeroSectionProps {
  onExploreWork: () => void;
  onOpenResume?: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onOpenResume,
  onSelectProject,
}) => {
  const { isDesigner } = usePerspective();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden bg-black"
    >
      {/* Subtle void ambient glow */}
      <div
        className={`absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full filter blur-[160px] pointer-events-none transition-colors duration-700 opacity-20 ${
          isDesigner ? 'bg-[#8052ff]' : 'bg-[#15846e]'
        }`}
      />
      <div className="absolute top-1/2 right-1/4 w-[420px] h-[420px] rounded-full filter blur-[160px] pointer-events-none opacity-10 bg-[#ffb829]" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center z-10">
        {/* Left Column: Monolithic Sculptural Typography & Identity */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          {/* Identity Pill with Saffron Spark */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ffb829] shadow-[0_0_8px_#ffb829] animate-pulse" />
            <span className="text-white font-medium">NEERAV.OS v2.6</span>
            <span className="text-[#9a9a9a]">•</span>
            <span className={isDesigner ? 'text-[#8052ff] font-medium' : 'text-[#15846e] font-medium'}>
              {isDesigner ? 'DESIGNER PERSPECTIVE' : 'ENGINEER PERSPECTIVE'}
            </span>
          </div>

          {/* Sculptural Display Headline (Monolithic weight 400 with negative tracking) */}
          <div className="space-y-2">
            <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#9a9a9a]">
              PORTFOLIO OF NEERAV
            </h2>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[88px] font-normal tracking-[-0.04em] text-white leading-[1.02]">
              I DESIGN FUTURES.
              <br />
              <span className={isDesigner ? 'text-[#8052ff]' : 'text-[#15846e]'}>
                I BUILD SYSTEMS.
              </span>
            </h1>
          </div>

          {/* Subtitle / Philosophy (Weight 200/300 with Silver Mist) */}
          <p className="text-lg sm:text-xl md:text-[20px] text-[#bdbdbd] font-extralight leading-[1.65] max-w-2xl">
            <span className="font-normal text-white">Designer at heart. Engineer by craft.</span>{' '}
            Translating complex human friction into scalable, high-performance digital ecosystems
            across AI agents, healthcare systems, and spatial interfaces.
          </p>

          {/* Core Discipline Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {['Product Design', 'Systems Architecture', 'AI & Autonomous Agents', 'React 19 / TS'].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bdbdbd] bg-white/[0.03] border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Core Actions: Electric Iris Pill CTA & Glass View Resume */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button
              variant="pill"
              size="lg"
              onClick={onExploreWork}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Explore Work
            </Button>

            {onOpenResume && (
              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenResume}
                icon={<FileText className="w-4 h-4 text-[#9a9a9a]" />}
              >
                View Resume
              </Button>
            )}
          </div>

          {/* Flagship Featured Project Card: ALZO */}
          <div className="pt-6 w-full max-w-lg">
            <div
              role="button"
              tabIndex={0}
              onClick={() => onSelectProject && onSelectProject('alzo')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectProject && onSelectProject('alzo');
                }
              }}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#8052ff]/50 transition-all duration-300 group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#8052ff]/10 border border-[#8052ff]/25 flex items-center justify-center text-[#8052ff] group-hover:scale-105 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#ffb829] font-medium">
                      FLAGSHIP CASE STUDY
                    </span>
                    <span className="text-[#9a9a9a] text-[10px]">•</span>
                    <span className="text-[10px] font-mono text-[#9a9a9a]">
                      3-ROLE ECOSYSTEM
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white flex items-center gap-2 mt-0.5">
                    ALZO
                    <span className="text-xs font-extralight text-[#bdbdbd]">
                      — AI-Assisted Healthcare
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#9a9a9a] group-hover:text-white transition-colors">
                <span>LAUNCH</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#8052ff]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Constellation Object */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-full flex items-center justify-center">
            <CosmicObject />
          </div>

          {/* Interactive hints and telemetry tags */}
          <div className="mt-4 flex items-center gap-6 text-[11px] font-mono text-[#9a9a9a]">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#ffb829]" />
              <span>SPATIAL CONSTELLATION</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#8052ff]" />
              <span>60 FPS KERNEL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
